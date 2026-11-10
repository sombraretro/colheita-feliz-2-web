package main

import (
	"crypto/sha256"
	"embed"
	"encoding/hex"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io"
	"io/fs"
	"log"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"sync"
	"time"
)

//go:embed web/*
var resources embed.FS

const maxSaveBytes = 1024 * 1024
const appVersion = "1.9.0"

func saveFolder() string {
	if p := os.Getenv("COLHEIRA_FELIZ_2_DATA_DIR"); p != "" {
		return p
	}
	if runtime.GOOS == "windows" {
		if p := os.Getenv("APPDATA"); p != "" {
			return filepath.Join(p, "ColheiraFeliz2")
		}
	}
	if p, err := os.UserConfigDir(); err == nil {
		return filepath.Join(p, "ColheiraFeliz2")
	}
	return ".colheirafeliz2"
}

type storage struct {
	mu     sync.Mutex
	folder string
}

func (s *storage) path() string { return filepath.Join(s.folder, "save.json") }
func (s *storage) load() ([]byte, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	b, e := os.ReadFile(s.path())
	if errors.Is(e, os.ErrNotExist) {
		return []byte(`null`), nil
	}
	return b, e
}
func (s *storage) store(b []byte) error {
	var d struct {
		Version int             `json:"version"`
		State   json.RawMessage `json:"state"`
	}
	if err := json.Unmarshal(b, &d); err != nil {
		return fmt.Errorf("JSON invalido: %w", err)
	}
	if d.Version != 1 || len(d.State) < 5 {
		return errors.New("formato de salvamento nao reconhecido")
	}
	var state map[string]json.RawMessage
	if err := json.Unmarshal(d.State, &state); err != nil {
		return err
	}
	for _, key := range []string{"coins", "plots", "inventory", "warehouse"} {
		if _, ok := state[key]; !ok {
			return fmt.Errorf("campo ausente: %s", key)
		}
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	if err := os.MkdirAll(s.folder, 0700); err != nil {
		return err
	}
	tmp, e := os.CreateTemp(s.folder, "save-*.tmp")
	if e != nil {
		return e
	}
	defer os.Remove(tmp.Name())
	if err := tmp.Chmod(0600); err != nil {
		tmp.Close()
		return err
	}
	if _, e = tmp.Write(b); e != nil {
		tmp.Close()
		return e
	}
	if e = tmp.Sync(); e != nil {
		tmp.Close()
		return e
	}
	if e = tmp.Close(); e != nil {
		return e
	}
	old, e := os.ReadFile(s.path())
	if e == nil && len(old) > 0 {
		_ = os.WriteFile(filepath.Join(s.folder, "save-anterior.json"), old, 0600)
	}
	// Windows Rename does not overwrite an existing destination.
	if runtime.GOOS == "windows" {
		_ = os.Remove(s.path())
	}
	return os.Rename(tmp.Name(), s.path())
}
func localOnly(r *http.Request) bool {
	ip, _, err := net.SplitHostPort(r.RemoteAddr)
	return err == nil && net.ParseIP(ip) != nil && net.ParseIP(ip).IsLoopback()
}
func openBrowser(url string) {
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "windows":
		cmd = exec.Command("rundll32", "url.dll,FileProtocolHandler", url)
	case "darwin":
		cmd = exec.Command("open", url)
	default:
		cmd = exec.Command("xdg-open", url)
	}
	if err := cmd.Start(); err != nil {
		fmt.Println("Abra manualmente:", url)
	}
}
func main() {
	noBrowser := flag.Bool("no-browser", false, "Start without opening a browser (QA)")
	listenPort := flag.Int("port", 47621, "Local HTTP port; 0 uses a random port")
	flag.Parse()
	dir := saveFolder()
	saver := &storage{folder: dir}
	sub, err := fs.Sub(resources, "web")
	if err != nil {
		log.Fatal(err)
	}
	mux := http.NewServeMux()
	mux.HandleFunc("/api/load", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "GET" || !localOnly(r) {
			http.Error(w, "Nao permitido", 405)
			return
		}
		data, err := saver.load()
		if err != nil {
			http.Error(w, "Nao foi possivel ler o salvamento", 500)
			return
		}
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.Header().Set("Cache-Control", "no-store")
		w.Write(data)
	})
	mux.HandleFunc("/api/save", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" || !localOnly(r) {
			http.Error(w, "Nao permitido", 405)
			return
		}
		if !strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
			http.Error(w, "Tipo incorreto", 415)
			return
		}
		body, err := io.ReadAll(io.LimitReader(r.Body, maxSaveBytes+1))
		if err != nil || len(body) > maxSaveBytes {
			http.Error(w, "Arquivo muito grande", 413)
			return
		}
		if err := saver.store(body); err != nil {
			log.Println("save:", err)
			http.Error(w, "Falha ao salvar", 400)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"ok":true}`))
	})
	mux.HandleFunc("/api/info", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "GET" || !localOnly(r) {
			http.Error(w, "Nao permitido", 405)
			return
		}
		v := sha256.Sum256([]byte(dir))
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"version": appVersion, "dataLocation": dir, "installationId": hex.EncodeToString(v[:6]), "mode": "offline"})
	})
	mux.Handle("/", http.FileServer(http.FS(sub)))
	server := &http.Server{Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !localOnly(r) {
			http.Error(w, "Acesso local apenas", 403)
			return
		}
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("X-Frame-Options", "DENY")
		w.Header().Set("Referrer-Policy", "no-referrer")
		w.Header().Set("Cross-Origin-Resource-Policy", "same-origin")
		w.Header().Set("Content-Security-Policy", "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self' https://cdn.jsdelivr.net; connect-src 'self' https://*.supabase.co wss://*.supabase.co; object-src 'none'; base-uri 'none'; form-action 'none'")
		mux.ServeHTTP(w, r)
	})}
	host := fmt.Sprintf("127.0.0.1:%d", *listenPort)
	ln, err := net.Listen("tcp", host)
	if err != nil && *listenPort != 0 {
		// Reuse the already running game instead of creating two writers for the same save.
		client := &http.Client{Timeout: 750 * time.Millisecond}
		if res, e := client.Get("http://" + host + "/api/info"); e == nil {
			var info map[string]string
			_ = json.NewDecoder(io.LimitReader(res.Body, 2048)).Decode(&info)
			res.Body.Close()
			if res.StatusCode == 200 && info["mode"] == "offline" && info["dataLocation"] == dir {
				if info["version"] != appVersion {
					fmt.Println("Uma versao anterior esta aberta com a mesma fazenda. Feche-a antes de iniciar a v1.9.0 para proteger o salvamento.")
					return
				}
				fmt.Println("Colheita Feliz 2 ja esta aberto:", "http://"+host+"/")
				if !*noBrowser {
					openBrowser("http://" + host + "/")
				}
				return
			}
		}
		ln, err = net.Listen("tcp", "127.0.0.1:0")
	}
	if err != nil {
		log.Fatal(err)
	}
	url := "http://" + ln.Addr().String() + "/"
	fmt.Println("Colheita Feliz 2 v1.9.0 - Sincronizacao Supabase, novos animais, areas e audio")
	fmt.Println("Abra no navegador:", url)
	fmt.Println("Dados locais:", dir)
	fmt.Println("Feche esta janela para encerrar o servidor local.")
	if !*noBrowser {
		go func() { time.Sleep(250 * time.Millisecond); openBrowser(url) }()
	}
	if err := server.Serve(ln); err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}
}
