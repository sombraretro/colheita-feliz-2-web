# Protocolo social offline — v1.8.0

A versão 1.8.0 introduz uma camada social local que permite troca manual entre instalações sem fingir que existe um serviço online.

## Arquivos suportados

Todos usam JSON com `app: "ColheitaFeliz2"`, `type: "cf2-social-exchange"` e `version: 1`.

- `kind: "friend"`: cartão exportado pelo fazendeiro, com ID, nome da fazenda, nível e popularidade.
- `kind: "message"`: mensagem com ID, remetente, destinatário, texto (até 500 caracteres) e data.
- `kind: "bouquet"`: presente com ID, tipo de buquê e remetente.

## Fluxo entre dois jogadores

1. Cada jogador exporta seu cartão em **Amigos** e troca o arquivo por um meio externo.
2. O destinatário importa o cartão em **Amigos**.
3. Para escrever, abra **Caixa de entrada → Escrever mensagem**, gere o arquivo e envie-o ao outro jogador.
4. Para presentear, abra **Casa de presentes → Preparar presente** e envie o arquivo criado. O buquê sai do estoque ao criar o pacote; o destinatário recebe o buquê e a popularidade correspondente ao importar.
5. O destinatário importa os arquivos em **Amigos** ou **Caixa de entrada**.

## Segurança e limites

- O importador rejeita arquivos acima de 256 KiB, formato desconhecido, mensagem vazia/longa e mensagens endereçadas a outra fazenda.
- IDs já recebidos são ignorados para evitar duplicação.
- Os dados do cartão são declarações do arquivo recebido, não identidade verificada.
- O formato não executa código e não acessa rede.
- Visitas, ajuda, pragas, pestes, roubos, ataques, defesas e sincronização em tempo real continuam indisponíveis sem backend online.
