# Colheita Feliz 2 — v1.9.0

Réplica offline para Windows do jogo social clássico Colheita Feliz.

## v1.9.0 — sistema social por troca manual

- Lista de amigos por cartões de fazendeiro exportados/importados.
- Caixa de entrada persistente para mensagens e presentes.
- Mensagens direcionadas exportadas em JSON e importadas pelo destinatário.
- Buquês podem ser enviados como pacotes de presente; o estoque é debitado ao criar o pacote e a popularidade é creditada ao receber.
- Importação idempotente e validação de arquivos.
- Não cria amigos fictícios nem afirma possuir conexão online.

**Limite importante:** a troca é manual, por arquivos JSON compartilhados entre jogadores. Não há sincronização automática, visitas remotas, ajuda em fazendas, roubo, ataque ou defesa entre jogadores. Consulte `docs/SOCIAL-OFFLINE-v1.9.0.md`.

## Etapas anteriores preservadas

- v1.7.0: 12 temas de fazenda, decorações vetoriais e temas temporários.
- v1.6.0: Livro de Tarefas, sete objetivos reconstruídos/adaptados, seis conquistas e recompensas persistentes.
- Recursos de cultivo, rega, enxada, pragas, pestes, animais, alimentação, produção, cachorro de guarda, pomar, lago, fábrica, churrasqueira, inventário, depósito e backup.

## Build e execução

- Windows x64: execute `ColheitaFeliz2.exe`.
- Para recompilar, execute `COMPILAR-WINDOWS.bat` com Go 1.23 ou superior e `CGO_ENABLED=0`.
- Extraia o ZIP inteiro para uma pasta antes de executar.

## QA

```bash
node --check web/app.js
go test ./...
python qa/test_180.py
python qa/test_server_180.py
```

Os testes de interface usam Playwright e Chromium. O executável Windows x64 é compilado neste ambiente, mas deve ser homologado no Windows real do usuário. Recomenda-se exportar um backup antes de testar.


## Edição online 1.9.0

A edição web pode ser publicada pela pasta `web/` e usa Supabase Auth para contas e `farm_saves` para sincronização de fazendas. Consulte `docs/ONLINE-SUPABASE-v1.9.0.md` e execute o SQL em `supabase/migrations/001_farm_saves.sql` antes de publicar.
