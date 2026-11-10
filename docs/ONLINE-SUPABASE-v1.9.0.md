# Colheita Feliz 2 · Edição 1.9.0

## Configurar o Supabase

1. Abra o projeto no Supabase.
2. Acesse **SQL Editor** e execute `supabase/migrations/001_farm_saves.sql`.
3. Em **Authentication → URL Configuration**, configure o domínio final do jogo em `Site URL` e inclua o domínio final e a origem local do executável em `Redirect URLs` (por exemplo, `http://127.0.0.1:47621/**`; se o servidor iniciar em outra porta, inclua a origem correspondente). O cadastro solicita retorno para a origem atual do jogo.
4. Confirme que o provedor de e-mail está habilitado. Se a confirmação de e-mail estiver ativa, o jogador precisa confirmar o endereço antes do primeiro login.
5. A edição web usa somente o Project URL e a chave publishable no navegador. Não coloque `service_role` ou secret keys no jogo.

A tabela `public.farm_saves` usa `user_id = auth.uid()` nas políticas RLS. Cada conta pode ler, criar e atualizar somente a própria fazenda. A coluna `revision` impede que uma gravação antiga sobrescreva silenciosamente uma versão atualizada por outro dispositivo.

## Publicar a edição web

O jogo web está na pasta `web/`.

- **Netlify:** conecte o repositório e use `web` como diretório de publicação (configuração incluída em `netlify.toml`).
- **Vercel:** importe o repositório e publique o diretório `web` (configuração incluída em `vercel.json`).

O executável Windows continua usando o servidor local em Go e mantém o salvamento em `%APPDATA%\\ColheiraFeliz2`. A edição hospedada usa `localStorage` como cópia local quando a API Go não está presente. Entrar na conta é opcional; sem login, a fazenda permanece local.

## Primeira sincronização

- Se a conta ainda não tiver uma fazenda na nuvem, a fazenda atual é enviada.
- Se já existir uma fazenda na nuvem e a cópia local for mais recente, o jogo pergunta qual versão deve prevalecer.
- Se a cópia da nuvem for mais recente, ela é carregada e também guardada localmente.
- A sincronização não apaga o salvamento local.

## Limites de segurança desta etapa

RLS protege os dados entre contas, mas um cliente de jogo não é uma autoridade segura para operações competitivas. Visitas, roubos, ataques, defesa, recompensas compartilhadas e outras ações entre jogadores deverão ser implementadas posteriormente com RPCs/Edge Functions validadas no servidor. A edição 1.9.0 sincroniza a fazenda e a conta; não habilita ainda essas interações online em tempo real.

## Testes recomendados

1. Abra a edição local e confirme que a fazenda carrega e salva normalmente.
2. Cadastre duas contas diferentes.
3. Entre com a primeira conta, faça uma alteração e aguarde o salvamento.
4. Entre com a segunda conta e confirme que ela não consegue ver nem alterar a primeira fazenda.
5. Entre com a primeira conta em outro navegador/dispositivo e confirme a sincronização.
6. Teste a escolha entre cópia local e cópia na nuvem.
7. Desconecte a internet: o jogo deve continuar abrindo e guardando alterações localmente.
