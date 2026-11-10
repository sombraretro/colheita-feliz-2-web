# Colheita Feliz 2 — v1.7.0

## Conteúdo visual e temas completos
- Adicionado catálogo com 12 temas completos: Clássico, Dia dos Namorados, Natal, Estação Ciência, Outono, cenário artístico inspirado em Van Gogh, Pelourinho, Grego, Verão, Montanha, Alemanha e Independência do Brasil.
- Cada tema possui arte vetorial própria: variações de paleta, motivos ambientais e ornamentos na paisagem; não são imagens de fundo capturadas do jogo original.
- Temas temporários têm duração de 30 dias, data de expiração persistida e retorno automático ao cenário clássico.
- Temas adquiridos podem ser reaplicados enquanto estiverem válidos; o tema clássico permanece gratuito e permanente.
- Adicionados objetos vetoriais independentes: arco-íris, bordo ornamental, balanço florido e bandeira do Brasil.
- Mantidas as cinco peças do evento Dia dos Namorados já existentes, agora complementadas por um tema de fazenda completo.

## Dados históricos e transparência
- Estação Ciência: 49.995 moedas amarelas, 480 XP e 30 dias.
- Van Gogh: 2.275.000 moedas amarelas, 915 XP e 30 dias.
- Pelourinho: conjunto de cinco partes, total de 59 moedas verdes e 2.280 XP.
- Tema Grego: pacote de 60 moedas verdes e duração de 30 dias.
- Decoração da Alemanha: 87 moedas verdes.
- Decoração de Independência: 46 moedas verdes.
- Natal: fonte histórica registra uma decoração gratuita ao entrar no jogo; a apresentação como tema temporário completo é adaptação visual offline.
- Preços não recuperados para Dia dos Namorados, Outono, Verão e Montanha são estimativas identificadas na interface.

## Compatibilidade e preservação
- Saves anteriores recebem `farmTheme: "classic"` e catálogo de expirações vazio.
- Nenhuma plantação, animal, expansão, decoração instalada, progresso ou moeda existente é removida.
- Os temas são cosméticos e não alteram produção, tempo, XP de cultivo ou economia.

## QA
- `node --check web/app.js`
- `go test ./...`
- `python qa/test_170.py`
- `python qa/test_server_170.py`
- Build Windows x64 com Go 1.23.2 e `CGO_ENABLED=0`.
