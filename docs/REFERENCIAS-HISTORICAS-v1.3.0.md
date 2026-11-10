# Referências históricas — Colheita Feliz 2 v1.3.0

## Fontes consultadas

1. [Colheita Feliz no Orkut: aprenda a jogar — Blog do Zemarcos (29/11/2009)](https://www.blogdozemarcos.com/2009/11/agora-sou-fazendeiro-virtual.html)
   - Confirma a fazenda com plantio e criação de animais, ovos, leite, lã e penas.
   - Descreve o menu inferior (seta, enxada, sacolinha, regador, removedor de pragas, pesticida e luva), loja, depósito, presentes e amigos.
   - Registra que a loja oferecia adubo e animais como galinha, pato e abelha.

2. [DownloadNow — IDs de Colheita Feliz (2010)](https://downloadnow2010.webnode.com.pt/colheita-feliz/)
   - Lista IDs antigos de animais, incluindo Pavão, Pombo e Pato.
   - Lista 17 itens de presentes: Cabaça, Onça Pintada, Boca de Leão, Açaí, Afochê, Berimbau, Cacau, Chocalho, Colares, Espuma, Maraca, Martelo, Máscara, Papagaio, Pau, Peruca e Serpentina.
   - Lista ferramentas/fertilizantes e nomes antigos de itens, mas nem todos os preços e parâmetros foram preservados.

3. [Super Colheita Feliz — Novidades e sementes avançadas](https://supercolheitafeliz.webnode.com.br/novidades/)
   - Registra fertilizantes de 2h30, 5h30, Luz do Sol Mágica de 8h, Fertilizante do Amor de 6h e Surf Líquido Concentrado de 20h para flores.
   - Registra a Árvore Romântica Chinesa, Cevada das Terras e Lírio Kafir, entre outras culturas e árvores especiais.
   - Registra a Árvore Borboleta como recompensa após cinco acessos consecutivos.
   - Registra a Árvore de Natal/Pinheiro e a mecânica social de decoração e troca de presentes entre amigos.

4. [UOL Start — Jogo social Colheita Feliz ganha nova interface (01/07/2010)](https://www.uol.com.br/start/ultimas-noticias/2010/07/01/jogo-social-colheita-feliz-ganha-nova-interface.htm)
   - Referência editorial contemporânea para a evolução do jogo social em 2010.

## Elementos implementados nesta versão

### Animais históricos

- Pato, Pombo, Pavão e Iaque foram adicionados como animais funcionais e ocupam quatro dos nove espaços de criação.
- Produções separadas: ovos de pato, penas de pombo e penas de pavão.
- Os nomes/IDs de Pato, Pombo e Pavão são históricos; preços, rações, ciclos, rendimentos e valores de venda são fictícios/estimados. O Iaque aparece em registro histórico por 55 moedas verdes; a duração não foi anunciada, e ração/crescimento/XP/valor de venda são estimados. A interface identifica essa condição.
- Novos sprites vetoriais próprios foram desenhados para os quatro animais; apenas os olhos piscam aleatoriamente. Não há deslocamento corporal.

### Fertilizantes e ferramentas

- Fertilizante 2h30: redução histórica; preço local estimado.
- Fertilizante 5h50: ID histórico 19_0; preço local estimado.
- Superfertilizante 5h30: redução histórica; preço local estimado.
- Luz do Sol Mágica 8h: item histórico de recompensa/presente diário.
- Fertilizante do Amor 6h: historicamente aplicado na fazenda de amigos; a aplicação na própria fazenda é adaptação offline identificada.
- Fertilizante 15h: nome/ID antigo; duração inferida e preço estimado.
- Surf Líquido Concentrado 20h: item histórico para flores; só pode ser usado em flores.
- Fertilizante rápido de 30% permanece como ferramenta legada da réplica.
- Os tempos fixos são multiplicados por 0,2. Assim, 2h30 reduz 30 min; 5h50 reduz 1h10; 5h30 reduz 1h06; 6h reduz 1h12; 8h reduz 1h36; 15h reduz 3h; 20h reduz 4h. O fertilizante nunca remove mais tempo do que resta no ciclo.

### Presentes e decorações

- A coleção contém os 17 nomes/IDs de presentes listados na fonte antiga. Os preços da coleção são fictícios, para permitir uso local offline.
- Envio e recebimento entre jogadores não são simulados; serão conectados ao futuro modo online.
- A Árvore Borboleta é entregue uma vez após cinco acessos diários consecutivos.
- A última colheita da semente Pinheiro de Natal, no campo ou no Pomar, concede um Pinheiro de Natal decorável.
- Decoração Dia das Crianças: 37 moedas verdes e 900 XP.
- Decoração Assuntos do Tibete: pacote histórico por 104 moedas verdes (XP não preservado). Série de Estação Ciência: 49.995 moedas amarelas, 30 dias e 480 XP.
- As decorações usam o sistema de validade local de 30 dias já existente.

### Novas culturas

- Árvore Romântica Chinesa: 34 h, 12 h de rebrota, 33 unidades, 234 MA/unidade, 125 XP total, nível 30 e 5 temporadas.
- Cevada das Terras: 43 h, 16 h de rebrota, 65 unidades, 200 MA/unidade, 150 XP total e 3 temporadas; preço da semente estimado em 9.000 MA.
- Lírio Kafir: 31 h, 12 h de rebrota, 27 unidades, 392 MA/unidade e 65 XP por temporada; nível 0 recuperado; preço interpretado como 1 moeda verde porque a moeda não está explícita no registro.

### Novas áreas físicas

- Pomar produtivo: expansão offline local com quatro espaços. Usa sementes arbóreas já existentes no inventário; as árvores amadurecem, produzem colheitas, rebrota e enviam produtos ao depósito.
- Lago da Fazenda: expansão visual offline local com água, margem, vegetação e pequeno píer. Não é apresentado como função histórica exata.
- Os preços e níveis de desbloqueio do Pomar e Lago são balanceamento local.

## Compatibilidade

- Preserva 36 canteiros, animais anteriores, casa, celeiro, perfil, nome, moedas, XP, depósito, flores, buquês, churrasqueira, tarefas e decorações instaladas.
- Migração de salvamentos v1.2.0 inicializa os novos campos sem reiniciar a fazenda.
- Diretório local preservado: `%APPDATA%\\ColheiraFeliz2\\save.json`.
