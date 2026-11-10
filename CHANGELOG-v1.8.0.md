# Colheita Feliz 2 — v1.8.0

## Sistema social offline por troca de arquivos
- Lista de amigos baseada em cartões de fazendeiro exportados por outros jogadores; não cria contatos fictícios.
- Caixa de entrada persistente para mensagens, presentes recebidos e avisos locais.
- Exportação/importação de mensagens em arquivos JSON com identificação do destinatário.
- Envio de buquês por pacote JSON: o buquê é consumido ao gerar o arquivo e é creditado ao destinatário na importação; o recebimento aumenta a popularidade conforme a tabela local de buquês.
- Importação idempotente por ID: o mesmo cartão/mensagem/presente não pode ser recebido duas vezes.
- Validação de formato, tamanho, conteúdo, destinatário e limites de lista; dados sociais antigos são migrados com coleções vazias.
- Histórico de envios e marcação de mensagens como lidas.

## Limites explícitos
- O jogo continua 100% offline. A troca exige que os jogadores compartilhem os arquivos manualmente.
- Não há servidor, login, sincronização automática, visita remota, rega/ajuda em fazendas de amigos, roubo, ataque ou defesa entre jogadores nesta versão.
- O cartão de amigo permite registrar nome, nível e popularidade informados pelo arquivo; não comprova identidade nem atualiza dados em tempo real.
- Presentes históricos de catálogo que não são buquês permanecem colecionáveis locais; não são transferíveis nesta etapa.

## Compatibilidade
- Salvamentos anteriores recebem `social.friends`, `social.inbox` e `social.sent` vazios.
- Nenhum saldo, cultivo, animal, decoração, tarefa, conquista ou tema existente é alterado pela migração.

## QA
- `node --check web/app.js`
- `go test ./...`
- `python qa/test_180.py`
- `python qa/test_server_180.py`
- Build Windows x64 com Go 1.23.2 e `CGO_ENABLED=0`.
