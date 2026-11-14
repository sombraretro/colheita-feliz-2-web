'use strict';
/* Build refresh: ajuda ilimitada em visitas, sementes ornamentais e colheita de Pomar/Mata (2026-11-14). */
/* Colheita Feliz 2 1.9.0: cloud save and visual revision, inbox, friend cards and gift packages. */
let inventorySortMode='default';
const NS='http://www.w3.org/2000/svg', HOUR=3600000, CROP_TIME_FACTOR=.2, PLOT_COLS=6, PLOT_COUNT=72, BASE_PLOT_COUNT=30, EXPANSION_PLOT_START=36, EXPANSION_PLOT_OFFSET_X=-1932;
const CROPS={
 pimentao_verde:{name:'Pimentão Verde',icon:'🫑',price:1650,hours:34,regrowHours:14,yield:42,unitPrice:68,xp:105,minLevel:12,seasons:3,flower:'#d9e9a5',fruit:'#4f9b45'},
 pimentao_vermelho:{name:'Pimentão Vermelho',icon:'🫑',iconAccent:'#d8433b',price:1850,hours:36,regrowHours:15,yield:40,unitPrice:78,xp:118,minLevel:15,seasons:3,flower:'#f1c1a8',fruit:'#d8433b'},
 pimentao_amarelo:{name:'Pimentão Amarelo',icon:'🫑',iconAccent:'#e8c33c',price:2050,hours:38,regrowHours:16,yield:39,unitPrice:88,xp:130,minLevel:18,seasons:3,flower:'#f5e6a4',fruit:'#e8c33c'},
 nabo:{name:'Nabo',icon:'🫜',price:300,hours:10,yield:36,unitPrice:13,xp:40,flower:'#a86ab5',fruit:'#eee1f4'},
 cebola:{name:'Cebola',icon:'🧅',price:220,hours:8,yield:34,unitPrice:18,xp:32,minLevel:2,seasons:1,flower:'#e8c5a8',fruit:'#c99a72'},
 alho:{name:'Alho',icon:'🧄',price:240,hours:9,yield:32,unitPrice:21,xp:34,minLevel:2,seasons:1,flower:'#eee5d2',fruit:'#d9ceb8'},
 cenoura:{name:'Cenoura',icon:'🥕',price:350,hours:15,yield:41,unitPrice:20,xp:40,flower:'#ff8a20',fruit:'#f47e25'},
 feijao:{name:'Feijão',icon:'🫘',price:400,hours:17,yield:42,unitPrice:24,xp:42,flower:'#8b9d54',fruit:'#9a7042'},
 arroz:{name:'Arroz',icon:'🍚',price:450,hours:18,yield:44,unitPrice:26,xp:44,flower:'#d9d2a0',fruit:'#d7c78b'},
 milho:{name:'Milho',icon:'🌽',price:500,hours:20,yield:42,unitPrice:28,xp:40,flower:'#f7d138',fruit:'#f5ca2e'},
 batata:{name:'Batata',icon:'🥔',price:650,hours:24,yield:48,unitPrice:31,xp:40,flower:'#d4a676',fruit:'#ad8561'},
 berinjela:{name:'Berinjela',icon:'🍆',price:800,hours:30,yield:54,unitPrice:34,xp:40,flower:'#8749ae',fruit:'#743a91'},
 tomate:{name:'Tomate',icon:'🍅',price:950,hours:26,yield:35,unitPrice:34,xp:90,seasons:2,regrowHours:10,minLevel:5,flower:'#df4938',fruit:'#da3e2e'},
 pimenta:{name:'Pimenta',icon:'🌶️',price:1100,hours:30,yield:39,unitPrice:35,xp:90,seasons:2,regrowHours:12,minLevel:5,flower:'#d8372e',fruit:'#db3f24'},
 abobora:{name:'Abóbora',icon:'🟠',iconAccent:'#e98b2c',price:1250,hours:34,yield:36,unitPrice:43,xp:90,seasons:2,regrowHours:12,minLevel:5,flower:'#eb9e27',fruit:'#ed9b2f'},
 ervilha:{name:'Ervilha',icon:'🫛',price:1400,hours:34,yield:43,unitPrice:40,xp:90,minLevel:5,flower:'#8bc857',fruit:'#82be4d'},
 morango:{name:'Morango',icon:'🍓',price:1550,hours:31,regrowHours:12,yield:31,unitPrice:42,xp:150,minLevel:10,seasons:3,flower:'#fff0dc',fruit:'#e9424d'},
 maca:{name:'Maçã',icon:'🍎',price:1800,hours:35,regrowHours:14,yield:28,unitPrice:55,xp:150,minLevel:10,seasons:3,flower:'#fff1d2',fruit:'#d94336'},
 melancia:{name:'Melancia',icon:'🍉',price:1975,hours:40,regrowHours:14,yield:30,unitPrice:55,xp:153,minLevel:11,seasons:3,flower:'#f6e7a0',fruit:'#3d9c4b'},
 banana:{name:'Banana',icon:'🍌',price:2150,hours:45,regrowHours:18,yield:33,unitPrice:56,xp:156,minLevel:12,seasons:3,flower:'#f8e7a1',fruit:'#f2cf3c'},
 pessego:{name:'Pêssego',icon:'🍑',price:3075,hours:60,regrowHours:22,yield:32,unitPrice:79,xp:159,minLevel:13,seasons:3,flower:'#f7d2a8',fruit:'#ed9b78'},
 laranja:{name:'Laranja',icon:'🍊',price:3350,hours:66,regrowHours:24,yield:34,unitPrice:80,xp:162,minLevel:14,seasons:3,flower:'#fff0bd',fruit:'#f28c25'},
 uva:{name:'Uva',icon:'🍇',price:4125,hours:66,regrowHours:24,yield:30,unitPrice:86,xp:220,minLevel:15,seasons:4,flower:'#e3c7ec',fruit:'#70459b'},
 roma:{name:'Romã',icon:'🫒',price:3875,hours:55,regrowHours:22,yield:29,unitPrice:84,xp:224,minLevel:16,seasons:4,flower:'#fff0d5',fruit:'#c9324b'},
 melao:{name:'Melão',icon:'🍈',price:4600,hours:40,regrowHours:16,yield:40,unitPrice:97,xp:150,minLevel:17,seasons:3,flower:'#fff2b5',fruit:'#9cbf53'},
 cana:{name:'Cana-de-açúcar',icon:'🎋',price:4600,hours:40,regrowHours:16,yield:40,unitPrice:97,xp:150,minLevel:17,seasons:3,flower:'#e8e2b0',fruit:'#75a94a'},
 lichia:{name:'Lichia',icon:'🔴',price:4750,hours:61,regrowHours:27,yield:42,unitPrice:98,xp:165,minLevel:19,seasons:3,flower:'#fff0df',fruit:'#d84d5b'},
 kiwi:{name:'Kiwi',icon:'🥝',price:5050,hours:40,regrowHours:16,yield:46,unitPrice:100,xp:195,minLevel:23,seasons:3,flower:'#fff3dc',fruit:'#8a633f'},
 abacaxi:{name:'Abacaxi',icon:'🍍',price:5200,hours:56,regrowHours:22,yield:48,unitPrice:101,xp:210,minLevel:26,seasons:3,flower:'#fff0b4',fruit:'#e6ad31'},
 cereja:{name:'Cereja',icon:'🍒',price:5500,hours:40,regrowHours:16,yield:52,unitPrice:103,xp:240,minLevel:28,seasons:3,flower:'#ffe7d6',fruit:'#b92742'},
 pitaya:{name:'Pitaya',icon:'🍉',price:6180,hours:50,regrowHours:18,yield:46,unitPrice:138,xp:240,minLevel:31,seasons:4,flower:'#fce4ed',fruit:'#e94c86'},
 manga:{name:'Manga',icon:'🥭',price:6850,hours:45,regrowHours:18,yield:46,unitPrice:169,xp:240,minLevel:36,seasons:4,flower:'#fff0c7',fruit:'#f4a63a'},
 cacau:{name:'Cacau',icon:'🌰',price:8500,hours:86,regrowHours:51,yield:78,unitPrice:255,xp:224,minLevel:40,seasons:4,flower:'#f3e1ca',fruit:'#8b5635'},
 caviar:{name:'Caviar',icon:'🖤',price:15000,hours:70,yield:20,unitPrice:1700,xp:120,minLevel:50,seasons:1,flower:'#5c4b3e',fruit:'#25211f',historical:true},
 goiaba:{name:'Goiaba',icon:'🍐',price:15000,hours:40,regrowHours:16,yield:40,unitPrice:280,xp:240,minLevel:50,seasons:4,flower:'#fff0d2',fruit:'#e58d8c',balance:'partial',estimateNote:'A experiência por temporada não foi preservada na tabela; foi estimada em 60 XP.'},
 coco:{name:'Coco',icon:'🥥',price:6,priceCurrency:'green',hours:35,regrowHours:14,yield:40,unitPrice:400,xp:280,minLevel:30,seasons:4,flower:'#f5e7c5',fruit:'#8c5731',balance:'partial',estimateNote:'A tabela registra preço de 6 moedas verdes, amadurecimento, rebrota e rendimento; temporadas e XP foram estimados.'},
 arvore_natal:{name:'Árvore de Natal',icon:'🎄',price:6,priceCurrency:'green',hours:72,yield:12,unitPrice:500,xp:50,minLevel:1,seasons:1,flower:'#e6d88a',fruit:'#d3b34d',historical:true},
 batata_doce:{name:'Batata-doce',icon:'🍠',price:300,hours:18,yield:47,unitPrice:45,xp:75,minLevel:25,seasons:1,flower:'#e8b1a3',fruit:'#c97855',vipAccess:true,balance:'access-adaptation',estimateNote:'Era exclusiva VIP; na edição offline, o acesso foi adaptado para nível 25.'},
 amendoim:{name:'Amendoim',icon:'🥜',price:2300,hours:25,yield:57,unitPrice:125,xp:80,minLevel:30,seasons:1,flower:'#e6d2a2',fruit:'#b98a52',vipAccess:true,balance:'access-adaptation',estimateNote:'Era exclusivo VIP; na edição offline, o acesso foi adaptado para nível 30.'},
 limao:{name:'Limão',icon:'🍋',price:4300,hours:40,regrowHours:16,yield:50,unitPrice:95,xp:225,minLevel:35,seasons:3,flower:'#fff2b8',fruit:'#cbd83f',vipAccess:true,balance:'access-adaptation',estimateNote:'Era exclusivo VIP; na edição offline, o acesso foi adaptado para nível 35.'},
 noz:{name:'Noz',icon:'🌰',price:15500,hours:92,regrowHours:54,yield:28,unitPrice:1058,xp:248,minLevel:40,seasons:4,flower:'#f1d7b1',fruit:'#8c5733',vipAccess:true,balance:'access-adaptation',estimateNote:'Era exclusiva VIP; na edição offline, o acesso foi adaptado para nível 40.'},
 cabaceira:{name:'Cabaça',icon:'🪇',price:4500,hours:42,regrowHours:16,yield:45,unitPrice:145,xp:140,minLevel:25,seasons:3,flower:'#f4d79d',fruit:'#a9a64d',balance:'estimated',estimateNote:'Parâmetros fictícios de plantio, estimados a partir de culturas históricas de 3 temporadas.'},
 cacau_pascoa:{name:'Cacau de Páscoa',icon:'🍫',price:6000,hours:48,regrowHours:18,yield:52,unitPrice:190,xp:150,minLevel:30,seasons:3,flower:'#f0d9bc',fruit:'#a65b3a',balance:'estimated',estimateNote:'Parâmetros fictícios de plantio, estimados a partir de cacau e culturas de 3 temporadas.'},
 pinheiro_natal:{name:'Pinheiro de Natal',icon:'🌲',price:5633,hours:27,regrowHours:11,yield:51,unitPrice:61,xp:120,minLevel:11,seasons:4,flower:'#d9e3a4',fruit:'#387f3c',historical:true},
 trigo:{name:'Trigo',icon:'🌾',price:7000,hours:35,regrowHours:14,yield:30,unitPrice:360,xp:120,minLevel:60,seasons:2,flower:'#e8d28a',fruit:'#d8b34e',historical:true},
 beterraba:{name:'Beterraba',icon:'🫜',price:5777,hours:34,yield:47,unitPrice:190,xp:88,minLevel:1,seasons:1,flower:'#e4a2c2',fruit:'#9d315b',historical:true},
 capim_limao:{name:'Capim-limão',icon:'🌿',price:3500,hours:40,yield:50,unitPrice:220,xp:65,minLevel:20,seasons:1,flower:'#e8dfa7',fruit:'#9da94b',balance:'partial',estimateNote:'O preço da semente não foi preservado; foi estimado em 3.500 moedas amarelas.'},
 semente_papai:{name:'Semente do Papai',icon:'🎅',price:4000,hours:35,yield:80,unitPrice:220,xp:150,minLevel:10,seasons:1,flower:'#fff0d4',fruit:'#d84b4b',balance:'partial',estimateNote:'O preço da semente não foi preservado; foi estimado em 4.000 moedas amarelas.'},
 arvore_jujuba:{name:'Árvore de Jujuba',icon:'🍬',price:3300,hours:33,regrowHours:14,yield:45,unitPrice:112,xp:114,minLevel:10,seasons:3,flower:'#f7c5df',fruit:'#e67eb7',historical:true},
 arvore_pirulito:{name:'Árvore de Pirulito',icon:'🍭',price:1,priceCurrency:'green',hours:40,yield:70,unitPrice:280,xp:140,minLevel:10,seasons:1,flower:'#f5c8d8',fruit:'#df4f87',historical:true},
 louro:{name:'Louro',icon:'🌿',price:8000,hours:34,regrowHours:14,yield:46,unitPrice:229,xp:165,minLevel:30,seasons:3,flower:'#e6d8a5',fruit:'#668d3c',balance:'partial',estimateNote:'Temporadas, rendimento, preço unitário, XP e nível foram recuperados; preço de compra e tempos foram estimados.'},
 uva_verde:{name:'Uva Verde',icon:'🍇',price:1,priceCurrency:'green',hours:36,regrowHours:14,yield:62,unitPrice:165,xp:130,minLevel:10,seasons:2,flower:'#e7e2bc',fruit:'#8dbd4d',balance:'partial',estimateNote:'Temporadas, rendimento, renda, XP e nível foram recuperados; preço e tempos foram estimados.'},
 begonia:{name:'Begônia',icon:'🌺',price:1,priceCurrency:'green',hours:35,regrowHours:13,yield:24,unitPrice:339,xp:60,minLevel:20,seasons:2,kind:'flower',flower:'#e95b8a',fruit:'#e95b8a',historical:true},
 bordo:{name:'Bordo',icon:'🍁',price:9600,hours:34,regrowHours:12,yield:45,unitPrice:203,xp:144,minLevel:50,seasons:4,flower:'#f4a04a',fruit:'#d34c31',historical:true},
 abacate_australiano:{name:'Abacate Australiano',icon:'🥑',price:1,priceCurrency:'green',hours:32,regrowHours:13,yield:30,unitPrice:305,xp:112,minLevel:15,seasons:4,flower:'#e8e2a6',fruit:'#6d9b46',historical:true},
 eucalipto:{name:'Eucalipto',icon:'🌿',price:8655,hours:34,regrowHours:14,yield:66,unitPrice:76,xp:60,minLevel:25,seasons:4,flower:'#dce7bd',fruit:'#7eae72',historical:true},
 arvore_serpentina:{name:'Árvore de Serpentina',icon:'🎊',price:8900,hours:33,regrowHours:12,yield:32,unitPrice:186,xp:51,minLevel:20,seasons:3,flower:'#f4d5e8',fruit:'#db75b1',historical:true},
 pinha:{name:'Pinha',icon:'🌲',price:1,priceCurrency:'green',hours:37,regrowHours:15,yield:39,unitPrice:387,xp:240,minLevel:15,seasons:3,flower:'#d4dfb1',fruit:'#a68a4d',balance:'partial',estimateNote:'Amadurecimento, rebrota, rendimento, preço unitário, XP e nível foram recuperados; temporadas estimadas em 3.'},
 lilas:{name:'Lilás',icon:'💜',price:3500,hours:34,yield:75,unitPrice:277,xp:65,minLevel:1,seasons:1,flower:'#c49bdd',fruit:'#9a6dbb',balance:'partial',estimateNote:'Tempo, rendimento e preço unitário foram recuperados; preço da semente e XP foram estimados.'},
 milho_canjica:{name:'Milho de Canjica',icon:'🌽',price:650,hours:30,yield:42,unitPrice:38,xp:72,minLevel:20,seasons:1,flower:'#f4d66a',fruit:'#f2d04d'},
 mandioca:{name:'Mandioca',icon:'🥔',price:700,hours:32,yield:48,unitPrice:52,xp:96,minLevel:5,seasons:4,advanced:true,flower:'#e5d4b4',fruit:'#c7a77b',balance:'estimated',estimateNote:'Parâmetros de cultivo balanceados para esta edição; exige terra vermelha.'},
 feijao_fradinho:{name:'Feijão-fradinho',icon:'🫘',price:580,hours:28,yield:44,unitPrice:58,xp:88,minLevel:10,seasons:4,advanced:true,flower:'#e9d7a7',fruit:'#d8c08b',balance:'estimated',estimateNote:'Parâmetros de cultivo balanceados para esta edição; exige terra vermelha.'},
 cominho:{name:'Cominho',icon:'🌿',price:4500,hours:37,regrowHours:16,yield:70,unitPrice:95,xp:144,minLevel:20,seasons:8,advanced:true,balance:'local-price-level',flower:'#f4e5a6',fruit:'#a3a64c'},
 bromelia:{name:'Bromélia',icon:'🌺',price:3500,hours:33,regrowHours:15,yield:60,unitPrice:126,xp:128,minLevel:20,seasons:8,advanced:true,balance:'local-price',flower:'#e85d71',fruit:'#cf4b62'},
 alpinia:{name:'Alpínia',icon:'🌸',price:7000,hours:49,regrowHours:20,yield:73,unitPrice:128,xp:176,minLevel:35,seasons:8,advanced:true,balance:'local-price',flower:'#ee8bb2',fruit:'#d95e8e'},
 arvore_garrafa:{name:'Árvore Garrafa',icon:'🌳',price:5500,hours:44,regrowHours:18,yield:64,unitPrice:120,xp:160,minLevel:25,seasons:8,advanced:true,balance:'estimated',estimateNote:'Todos os parâmetros de plantio são fictícios e foram estimados a partir de sementes avançadas de 8 temporadas.',flower:'#e9d59b',fruit:'#a77c49'},
 nepenthes:{name:'Carnívora Nepenthes',icon:'🪴',price:6800,hours:46,regrowHours:19,yield:62,unitPrice:138,xp:176,minLevel:30,seasons:8,advanced:true,balance:'estimated',estimateNote:'Todos os parâmetros de plantio são fictícios e foram estimados a partir de sementes avançadas de 8 temporadas.',flower:'#d4b3a2',fruit:'#8e5c4e'},
 lirio_aranha:{name:'Lírio Aranha Vermelha',icon:'🌺',price:6200,hours:39,regrowHours:17,yield:68,unitPrice:110,xp:152,minLevel:25,seasons:8,advanced:true,balance:'estimated',estimateNote:'Todos os parâmetros de plantio são fictícios e foram estimados a partir de sementes avançadas de 8 temporadas.',flower:'#d94e57',fruit:'#c63846'},
 lotus_neve:{name:'Lótus Neve',icon:'❄️',price:8500,hours:52,regrowHours:21,yield:58,unitPrice:150,xp:192,minLevel:35,seasons:8,advanced:true,balance:'estimated',estimateNote:'Todos os parâmetros de plantio são fictícios e foram estimados a partir de sementes avançadas de 8 temporadas.',flower:'#e5e7f4',fruit:'#b8c8dd'},
 neve:{name:'Neve',icon:'❄️',price:16000,hours:189,regrowHours:72,yield:45,unitPrice:250,xp:966,minLevel:40,seasons:8,advanced:true,balance:'partial',estimateNote:'O registro histórico preserva 189 horas e aproximadamente 5,11 XP por hora; rebrota, rendimento, preço e nível foram estimados.'},
 planta_fogo:{name:'Planta Fogo',icon:'🔥',price:12000,hours:50,regrowHours:18,yield:70,unitPrice:443,xp:220,minLevel:35,seasons:8,advanced:true,balance:'partial',estimateNote:'O registro histórico informa aproximadamente 620,62 moedas amarelas por hora; os demais parâmetros foram estimados para manter essa faixa.'},
 fenix:{name:'Fênix',icon:'🔥',price:9500,hours:42,regrowHours:18,yield:72,unitPrice:160,xp:208,minLevel:40,seasons:8,advanced:true,balance:'estimated',estimateNote:'Todos os parâmetros de plantio são fictícios e foram estimados a partir de sementes avançadas de 8 temporadas.'},
 camu_camu:{name:'Camu-camu',icon:'🫐',price:9200,hours:54,regrowHours:22,yield:52,unitPrice:310,xp:230,minLevel:38,seasons:8,advanced:true,flower:'#f6e5c7',fruit:'#a72d42',balance:'estimated',estimateNote:'Cultura avançada brasileira; parâmetros balanceados para esta edição.'},
 jabuticaba:{name:'Jabuticaba',icon:'🫐',price:10800,hours:58,regrowHours:24,yield:48,unitPrice:360,xp:255,minLevel:42,seasons:8,advanced:true,flower:'#f5e7d5',fruit:'#39213f',balance:'estimated',estimateNote:'Cultura avançada brasileira; parâmetros balanceados para esta edição.'},
 pilea_involucrata:{name:'Pilea Involucrata',icon:'🪴',kind:'flower',price:550,hours:22,yield:3,unitPrice:220,xp:70,minLevel:5,seasons:1,flower:'#b8a3d0',fruit:'#9a78b5'},
 rosa_amarela:{name:'Rosa Amarela',icon:'🌹',kind:'flower',price:1250,hours:32,yield:4,unitPrice:370,xp:120,minLevel:10,seasons:1,flower:'#f3d23d',fruit:'#e6bd25'},
 girassol:{name:'Girassol',icon:'🌻',kind:'flower',price:2800,hours:44,yield:5,unitPrice:650,xp:190,minLevel:20,seasons:1,flower:'#f5c52e',fruit:'#8b5a2b'},
 crisantemo:{name:'Crisântemo',icon:'🌼',kind:'flower',price:280,hours:8,yield:2,unitPrice:25,xp:35,flower:'#f4c542',fruit:'#f4c542'},
 peonia:{name:'Peônia',icon:'🌸',kind:'flower',price:650,hours:12,yield:4,unitPrice:42,xp:60,flower:'#e78cae',fruit:'#e78cae'},
 cravo:{name:'Cravo',icon:'🌺',kind:'flower',price:950,hours:16,yield:5,unitPrice:55,xp:80,flower:'#d84d63',fruit:'#d84d63'},
 rosa_vermelha:{name:'Rosa vermelha',icon:'🌹',kind:'flower',price:1400,hours:20,yield:6,unitPrice:75,xp:110,flower:'#c92743',fruit:'#c92743'},
 flor_tilia:{name:'Flor de Tília',icon:'🌼',kind:'flower',price:300,hours:12,yield:3,unitPrice:28,xp:35,flower:'#f2d86b',fruit:'#f2d86b',historical:true},
 flor_ouro:{name:'Flor de Ouro',icon:'🌻',kind:'flower',price:450,hours:14,yield:3,unitPrice:35,xp:40,flower:'#f4bd36',fruit:'#f4bd36',historical:true},
 copo_leite:{name:'Copo-de-leite',icon:'🤍',kind:'flower',price:420,hours:12,yield:3,unitPrice:32,xp:35,flower:'#fff6e5',fruit:'#fff6e5',historical:true},
 narciso:{name:'Narciso',icon:'🌼',kind:'flower',price:520,hours:14,yield:3,unitPrice:36,xp:40,flower:'#f6df72',fruit:'#f6df72',historical:true},
 flor_ameixa:{name:'Flor de Ameixa',icon:'🌸',kind:'flower',price:600,hours:16,yield:4,unitPrice:42,xp:45,flower:'#e9a8cf',fruit:'#e9a8cf',historical:true},
 gloria_manha:{name:'Glória da Manhã',icon:'🪻',kind:'flower',price:650,hours:16,yield:4,unitPrice:45,xp:48,flower:'#8d9ee9',fruit:'#8d9ee9',historical:true},
 tulipa:{name:'Tulipa',icon:'🌷',kind:'flower',price:750,hours:18,yield:4,unitPrice:52,xp:50,flower:'#e96d91',fruit:'#e96d91',historical:true},
 lirio:{name:'Lírio',icon:'💮',kind:'flower',price:800,hours:20,yield:5,unitPrice:60,xp:55,flower:'#f8e5c7',fruit:'#f8e5c7',historical:true},
 rosas_azuis:{name:'Rosas Azuis',icon:'💐',kind:'flower',price:1100,hours:22,yield:6,unitPrice:78,xp:65,flower:'#6f8cda',fruit:'#6f8cda',historical:true},
 flor_pessego:{name:'Flor de Pêssego',icon:'🌺',kind:'flower',price:700,hours:18,yield:4,unitPrice:48,xp:50,flower:'#f3a77d',fruit:'#f3a77d',historical:true},
 arvore_romantica_chinesa:{name:'Árvore Romântica Chinesa',icon:'🌸',price:8500,hours:34,regrowHours:12,yield:33,unitPrice:234,xp:125,minLevel:30,seasons:5,flower:'#f5d5e8',fruit:'#d96eaa',historical:true,tree:true},
 cevada_terras:{name:'Cevada das Terras',icon:'🌾',price:9000,hours:43,regrowHours:16,yield:65,unitPrice:200,xp:150,minLevel:18,seasons:3,flower:'#eadb9a',fruit:'#d5ad45',balance:'partial',estimateNote:'Amadurecimento, rebrota, rendimento, preço unitário, XP, nível e temporadas foram recuperados; preço da semente estimado em 9.000 moedas amarelas.'},
 lirio_kafir:{name:'Lírio Kafir',icon:'🌺',kind:'flower',price:1,priceCurrency:'green',hours:31,regrowHours:12,yield:27,unitPrice:392,xp:325,minLevel:0,seasons:5,flower:'#e2a7c5',fruit:'#c85d93',balance:'partial',estimateNote:'Amadurecimento, rebrota, rendimento, preço unitário, XP, nível 0 e temporadas recuperados; preço interpretado como 1 moeda verde.'},
 arvore_namorados:{name:'Árvore dos Namorados',icon:'💝',price:1,priceCurrency:'green',hours:38,regrowHours:16,yield:38,unitPrice:240,xp:150,minLevel:1,seasons:4,flower:'#f8c3d9',fruit:'#e75b91',tree:true,eventOnly:true,eventAvailable:true,historical:true,balance:'estimated',estimateNote:'A presença no evento de Dia dos Namorados de maio de 2010 e a compra com moedas verdes foram registradas; os parâmetros de cultivo e o preço exato foram estimados.'},
 carambola:{name:'Carambola',icon:'⭐',price:6200,hours:42,regrowHours:18,yield:54,unitPrice:205,xp:165,minLevel:51,seasons:4,flower:'#fff0a8',fruit:'#e8c63b',tree:true,eventOnly:true,historical:true,balance:'estimated',estimateNote:'Semente listada no evento de Dia dos Namorados de 2010 e retirada em atualização posterior; dados de cultivo reconstruídos.'},
 acerola:{name:'Acerola',icon:'🍒',price:4900,hours:36,regrowHours:15,yield:48,unitPrice:175,xp:145,minLevel:30,seasons:4,flower:'#fff0d6',fruit:'#c92d43',tree:true,eventOnly:true,historical:true,balance:'estimated',estimateNote:'Semente listada no evento de Dia dos Namorados de 2010 e retirada em atualização posterior; dados de cultivo reconstruídos.'},
 jaca:{name:'Jaca',icon:'🥭',price:7600,hours:54,regrowHours:24,yield:62,unitPrice:225,xp:190,minLevel:45,seasons:4,flower:'#e6e5a0',fruit:'#a6b43d',tree:true,eventOnly:true,historical:true,balance:'estimated',estimateNote:'Semente listada no evento de Dia dos Namorados de 2010 e retirada em atualização posterior; dados de cultivo reconstruídos.'},
 caju:{name:'Caju',icon:'🥭',price:5100,hours:39,regrowHours:17,yield:49,unitPrice:180,xp:150,minLevel:28,seasons:4,flower:'#f3d6a6',fruit:'#e98a38',tree:true,eventOnly:true,historical:true,balance:'estimated',estimateNote:'Semente listada no evento de Dia dos Namorados de 2010 e retirada em atualização posterior; dados de cultivo reconstruídos.'},
 pera:{name:'Pera',icon:'🍐',price:4600,hours:38,regrowHours:16,yield:46,unitPrice:170,xp:145,minLevel:25,seasons:4,flower:'#fff3d2',fruit:'#9ab34b',tree:true,eventOnly:true,historical:true,balance:'estimated',estimateNote:'Semente listada no evento de Dia dos Namorados de 2010 e retirada em atualização posterior; dados de cultivo reconstruídos.'},
 jabuticaba:{name:'Jabuticaba',icon:'🫐',price:5800,hours:46,regrowHours:20,yield:55,unitPrice:195,xp:170,minLevel:36,seasons:4,flower:'#f7f0e7',fruit:'#49304f',tree:true,eventOnly:true,historical:true,balance:'estimated',estimateNote:'Semente listada no evento de Dia dos Namorados de 2010 e retirada em atualização posterior; dados de cultivo reconstruídos.'},
 alface:{name:'Alface',icon:'🥬',price:1,priceCurrency:'green',hours:10,regrowHours:0,yield:32,unitPrice:24,xp:55,minLevel:1,seasons:1,flower:'#d9edaa',fruit:'#80b74b',eventOnly:true,eventAvailable:true,historical:true,balance:'estimated',estimateNote:'A permanência no catálogo após a atualização do evento e a compra com moedas verdes foram registradas; parâmetros e preço exato foram estimados.'},
 guarana:{name:'Guaraná',icon:'🔴',iconAccent:'#a82f3b',price:6800,hours:48,regrowHours:21,yield:51,unitPrice:215,xp:175,minLevel:40,seasons:4,flower:'#fff1d7',fruit:'#a82f3b',tree:true,eventOnly:true,historical:true,balance:'estimated',estimateNote:'Semente listada no evento de Dia dos Namorados de 2010 e retirada em atualização posterior; dados de cultivo reconstruídos.'},
 mamao:{name:'Mamão',icon:'🍑',iconAccent:'#e88d45',price:1,priceCurrency:'green',hours:34,regrowHours:14,yield:46,unitPrice:165,xp:140,minLevel:1,seasons:3,flower:'#fff0c8',fruit:'#e88d45',tree:true,eventOnly:true,eventAvailable:true,historical:true,balance:'estimated',estimateNote:'A permanência no catálogo após a atualização do evento e a compra com moedas verdes foram registradas; parâmetros e preço exato foram estimados.'},
 uvaia:{name:'Uvaia',icon:'🟡',price:0,hours:64,regrowHours:0,yield:18,unitPrice:145,xp:210,minLevel:1,seasons:1,forestOnly:true,flower:'#fff0c5',fruit:'#e8a52c',balance:'estimated',estimateNote:'Fruto nativo da Mata Atlântica; obtido somente ao colher a árvore Uvaia na Mata Brasileira.'},
 cambuca:{name:'Cambucá',icon:'🟠',price:0,hours:70,regrowHours:0,yield:20,unitPrice:175,xp:230,minLevel:1,seasons:1,forestOnly:true,flower:'#fff0d1',fruit:'#d87535',balance:'estimated',estimateNote:'Fruto nativo da Mata Atlântica; obtido somente ao colher a árvore Cambucá na Mata Brasileira.'}
};
const BOUQUETS={
 crisantemo:{name:'Buquê de Crisântemos',icon:'💐',recipe:{crisantemo:6},popularity:120,xp:30,description:'Arranjo clássico e acessível.'},
 peonia:{name:'Buquê de Peônias',icon:'💐',recipe:{peonia:16},popularity:320,xp:65,description:'Buquê volumoso de flores delicadas.'},
 cravo:{name:'Buquê de Cravos',icon:'💐',recipe:{cravo:20},popularity:400,xp:85,description:'Arranjo tradicional de cravos.'},
 rosa_vermelha:{name:'Buquê de Rosas Vermelhas',icon:'💐',recipe:{rosa_vermelha:26},popularity:520,xp:130,description:'Buquê especial de alto valor de popularidade.'}
};
const DECORATIONS={
 flowerbed:{name:'Canteiro florido',icon:'🌷',price:1800,xp:20},
 bench:{name:'Banco de madeira',icon:'🪑',price:2600,xp:30},
 scarecrow:{name:'Espantalho',icon:'🌾',price:3200,xp:40},
 apple_tree:{name:'Macieira ornamental',icon:'🍎',price:4200,xp:45},
 orange_tree:{name:'Laranjeira ornamental',icon:'🍊',price:4800,xp:50},
 windmill:{name:'Moinho de vento',icon:'🌬️',price:7500,xp:70},
 well:{name:'Poço de pedra',icon:'🪣',price:5200,xp:55},
 romantic_tree:{name:'Árvore Romântica Chinesa',icon:'🌸',price:8500,xp:65,historical:true},
 coconut_tree:{name:'Coqueiro ornamental',icon:'🥥',price:6200,xp:55},
 christmas_tree:{name:'Pinheiro de Natal decorável',icon:'🎄',price:0,xp:65,historical:true,obtainOnly:true,obtainNote:'Obtido ao colher a última temporada do Pinheiro de Natal.'},
 butterfly_tree:{name:'Árvore Borboleta',icon:'🦋',price:0,xp:80,historical:true,obtainOnly:true,obtainNote:'Recompensa por acessar a fazenda durante 5 dias consecutivos.'},
 children_theme:{name:'Decoração Dia das Crianças',icon:'🎈',price:37,currency:'greenCoins',xp:900,historical:true},
 tibet_theme:{name:'Decoração Assuntos do Tibete',icon:'🏔️',price:104,currency:'greenCoins',xp:null,historical:true},
 science_theme:{name:'Série de Estação Ciência',icon:'🔬',price:49995,currency:'coins',xp:480,historical:true},
 valentine_background:{name:'Fundo do Dia dos Namorados',icon:'💗',price:2800,xp:0,historical:true,event:'Dia dos Namorados 2010',priceEstimated:true},
 valentine_house:{name:'Casa do Dia dos Namorados',icon:'🏡',price:3500,xp:0,historical:true,event:'Dia dos Namorados 2010',priceEstimated:true},
 valentine_fence:{name:'Cerca do Dia dos Namorados',icon:'💞',price:1800,xp:0,historical:true,event:'Dia dos Namorados 2010',priceEstimated:true},
 valentine_kennel:{name:'Canil do Dia dos Namorados',icon:'🐕',price:1400,xp:0,historical:true,event:'Dia dos Namorados 2010',priceEstimated:true},
 valentine_garden:{name:'Jardim Romântico do Dia dos Namorados',icon:'🌹',price:2400,xp:0,historical:true,event:'Dia dos Namorados 2010',priceEstimated:true},
 snowman:{name:'Boneco de Neve',icon:'☃️',price:50000,xp:120,historical:true},
 rainbow_arch:{name:'Arco-íris',icon:'🌈',price:12000,xp:898,historical:true},
 autumn_maple:{name:'Bordo ornamental',icon:'🍁',price:9600,xp:60,historical:true},
 flower_swing:{name:'Balanço florido',icon:'🌼',price:6800,xp:55},
 brazil_flag:{name:'Bandeira do Brasil',icon:'🇧🇷',price:46,currency:'greenCoins',xp:0,historical:true,event:'Independência do Brasil',priceEstimated:false},
 harvest_crown:{name:'Coroa da Grande Colheita',icon:'🌾',price:0,xp:0,obtainOnly:true,obtainNote:'Recompensa exclusiva da conquista Colheita farta.'},
 deep_sea_trophy:{name:'Troféu das Profundezas',icon:'🐚',price:0,xp:0,obtainOnly:true,obtainNote:'Recompensa exclusiva da conquista Pescador das águas.'}
};
// Temas de fazenda: a existência de vários conjuntos é documentada em arquivos de 2010-2011.
// Valores não preservados são marcados como estimativas; os temas artísticos têm dados publicados.
const FARM_THEMES={
 classic:{name:'Fazenda Clássica',icon:'🌿',price:0,currency:'coins',days:0,xp:0,description:'Gramado verde, construções de madeira e cenário tradicional.',historical:true},
 valentine:{name:'Dia dos Namorados',icon:'💗',price:12000,greenPrice:12,currency:'coins',days:0,xp:0,estimated:true,seasonal:'valentine',description:'Corações, flores românticas e detalhes rosados.'},
 christmas:{name:'Natal',icon:'🎄',price:0,currency:'coins',days:0,xp:0,freeGift:true,seasonal:'christmas',description:'Terreno coberto de neve, copas nevadas e cenário natalino.'},
 science:{name:'Estação Ciência',icon:'🔬',price:49995,currency:'coins',days:0,xp:480,description:'Detalhes científicos e paleta azul metálica.',historical:true},
 autumn:{name:'Outono',icon:'🍂',price:18000,greenPrice:18,currency:'coins',days:0,xp:0,estimated:true,seasonal:'autumn',description:'Folhas douradas, tons quentes e clima de outono.'},
 van_gogh:{name:'Van Gogh',icon:'🎨',price:50000,currency:'coins',days:0,xp:915,description:'Paisagem com pinceladas curvas e cores expressivas.',historical:true},
 pelourinho:{name:'Pelourinho',icon:'🏘️',price:65000,greenPrice:59,currency:'coins',days:0,xp:2280,description:'Fachadas coloridas, bandeirolas e detalhes coloniais.',historical:true},
 greek:{name:'Tema Grego',icon:'🏛️',price:72000,greenPrice:60,currency:'coins',days:0,xp:0,description:'Colunas claras, mármore e detalhes azul-marinho.',historical:true},
 summer:{name:'Decoração de Verão',icon:'🌴',price:58000,greenPrice:46,currency:'coins',days:0,xp:0,estimated:true,seasonal:'summer',description:'Palmeiras, flores tropicais e cores ensolaradas.'},
 mountain:{name:'Decoração da Montanha',icon:'🏔️',price:62000,greenPrice:52,currency:'coins',days:0,xp:0,estimated:true,description:'Montanhas, pinheiros e clima fresco.'},
 germany:{name:'Decoração da Alemanha',icon:'🏡',price:90000,greenPrice:87,currency:'coins',days:0,xp:0,description:'Fachadas alpinas, madeira e flores campestres.',historical:true},
 independence:{name:'Independência do Brasil',icon:'🇧🇷',price:55000,greenPrice:46,currency:'coins',days:0,xp:0,description:'Bandeiras e detalhes em verde, amarelo e azul.',historical:true},
 japan:{name:'Primavera no Japão',icon:'🌸',price:85000,greenPrice:68,currency:'coins',days:0,xp:0,estimated:true,description:'Cerejeiras floridas, lanternas, ponte vermelha e jardim zen.'},
 future_city:{name:'Metrópole do Amanhã',icon:'🌃',price:110000,greenPrice:90,currency:'coins',days:0,xp:0,estimated:true,description:'Arranha-céus luminosos, neon, hologramas e arquitetura futurista.'},
 paris:{name:'Paris Romântica',icon:'🗼',price:95000,greenPrice:78,currency:'coins',days:0,xp:0,estimated:true,description:'Torre Eiffel, cafés parisienses, postes clássicos e flores.'},
  halloween:{name:'Halloween',icon:'🎃',price:58000,greenPrice:42,seasonal:'halloween',estimated:true,description:'Abóboras iluminadas, lanternas e folhas outonais.'},
  easter:{name:'Páscoa',icon:'🐣',price:52000,greenPrice:39,seasonal:'easter',estimated:true,description:'Ovos coloridos, coelhinhos e flores.'},
  football:{name:'Futebol',icon:'⚽',price:68000,greenPrice:49,estimated:true,description:'Gramado, marcações de campo e bandeirolas esportivas.'},
  cute:{name:'Fofo',icon:'🌸',price:62000,greenPrice:45,estimated:true,description:'Flores, estrelas e detalhes delicados para todos.'},
  technology:{name:'Tecnologia',icon:'💻',price:78000,greenPrice:55,estimated:true,description:'Painéis modernos, circuitos e iluminação azul.'},
  chinese_new_year:{name:'Ano Novo Chinês',icon:'🏮',price:72000,greenPrice:52,seasonal:'chinese_new_year',estimated:true,description:'Lanternas vermelhas, ornamentos dourados e flores de ameixeira.'}
};
const GIFT_ITEMS={
 cabaca:{name:'Cabaça',icon:'🎃',price:650},flores_namorados:{name:'Flores Dia dos Namorados',icon:'💐',price:950,event:'Dia dos Namorados 2010'},celebrando_namorados:{name:'Celebrando Dia dos Namorados',icon:'🎉',price:1200,event:'Dia dos Namorados 2010'},eu_amo_voce:{name:'Eu amo você',icon:'💌',price:1500,event:'Dia dos Namorados 2010'},urso_namorados:{name:'Urso Dia dos Namorados',icon:'🧸',price:1800,event:'Dia dos Namorados 2010'},onca:{name:'Onça Pintada',icon:'🐆',price:4200},boca_leao:{name:'Boca de Leão',icon:'🌺',price:950},acai:{name:'Açaí',icon:'🫐',price:1200},afoxe:{name:'Afochê',icon:'🪇',price:1800},berimbau:{name:'Berimbau',icon:'🎸',price:3200},cacau:{name:'Cacau',icon:'🍫',price:1500},chocalho:{name:'Chocalho',icon:'🪇',price:900},colares:{name:'Colares',icon:'📿',price:2400},espuma:{name:'Espuma',icon:'🫧',price:500},maraca:{name:'Maraca',icon:'🪇',price:1100},martelo:{name:'Martelo',icon:'🔨',price:1600},mascara:{name:'Máscara',icon:'🎭',price:2800},papagaio:{name:'Papagaio',icon:'🦜',price:3600},pau:{name:'Pau decorativo',icon:'🪵',price:450},peruca:{name:'Peruca',icon:'💇',price:2200},serpentina:{name:'Serpentina',icon:'🎊',price:750}
};

const MOODS=[{id:'happy',icon:'🙂',name:'Feliz'},{id:'love',icon:'😍',name:'Apaixonado'},{id:'cool',icon:'😎',name:'Confiante'},{id:'surprised',icon:'😮',name:'Surpreso'},{id:'sleepy',icon:'😴',name:'Cansado'},{id:'sad',icon:'😢',name:'Triste'},{id:'angry',icon:'😠',name:'Irritado'},{id:'silly',icon:'😜',name:'Brincalhão'}];
const GRILL_PARTS={iron:{name:'Peças de ferro',icon:'🔩'},screws:{name:'Parafusos',icon:'🪛'},paint:{name:'Baldes de tinta',icon:'🪣'}};
const GRILL_PARTS_REQUIRED=10;
// The original 2010 guide confirms the barbecue recipe book and dish names.
// Exact quantities/times were not legible in the surviving text reference, so these are clearly marked local balance values.
const GRILL_RECIPES={
 suco_camu_camu:{name:'Suco de Camu-camu',icon:'🧃',minutes:45,yield:2,salePrice:640,xp:42,kitchenOnly:true,ingredients:[['crop','camu_camu',2],['supply','honey',1]]},
 suco_uvaia:{name:'Suco de Uvaia',icon:'🧃',minutes:55,yield:2,salePrice:920,xp:58,kitchenOnly:true,ingredients:[['crop','uvaia',3],['supply','honey',1]]},
 geleia_cambuca:{name:'Geleia de Cambucá',icon:'🫙',minutes:70,yield:2,salePrice:1120,xp:66,kitchenOnly:true,ingredients:[['crop','cambuca',3],['supply','honey',1]]},
 geleia_jabuticaba:{name:'Geleia de Jabuticaba',icon:'🫙',minutes:60,yield:2,salePrice:780,xp:48,kitchenOnly:true,ingredients:[['crop','jabuticaba',2],['supply','seasoning',1]]},
 chicken_grilled:{name:'Frango grelhado',icon:'🍗',minutes:60,yield:2,salePrice:420,xp:24,ingredients:[['meat','chicken',1],['crop','pimenta',1],['supply','seasoning',1]]},
 beef_grilled:{name:'Carne grelhada',icon:'🥩',minutes:90,yield:2,salePrice:620,xp:30,ingredients:[['meat','beef',1],['crop','tomate',1],['supply','seasoning',1]]},
 pork_ribs:{name:'Costela de porco',icon:'🍖',minutes:120,yield:2,salePrice:590,xp:32,ingredients:[['meat','pork',1],['crop','batata',1],['supply','seasoning',1]]},
 kebab:{name:'Kebab',icon:'🍢',minutes:75,yield:3,salePrice:480,xp:28,ingredients:[['meat','beef',1],['crop','tomate',1],['crop','pimenta',1]]},
 chicken_honey:{name:'Frango grelhado ao mel',icon:'🍯',minutes:120,yield:2,salePrice:560,xp:34,ingredients:[['meat','chicken',1],['supply','honey',1],['crop','milho',1]]},
 spicy_meat:{name:'Carne picante',icon:'🌶️',minutes:90,yield:2,salePrice:640,xp:32,ingredients:[['meat','beef',1],['crop','pimenta',2],['supply','seasoning',1]]},
 lamb_chop:{name:'Costeleta de cordeiro',icon:'🍖',minutes:150,yield:2,salePrice:760,xp:38,ingredients:[['meat','lamb',1],['crop','batata',1],['supply','seasoning',1]]},
 bacon_toast:{name:'Bacon tostado',icon:'🥓',minutes:90,yield:3,salePrice:510,xp:30,ingredients:[['meat','pork',1],['crop','milho',1],['supply','seasoning',1]]},
 turkey_roast:{name:'Peru assado',icon:'🦃',minutes:180,yield:2,salePrice:850,xp:44,ingredients:[['meat','turkey',1],['crop','batata',1],['supply','honey',1]]},
 lamb_grilled:{name:'Carneiro grelhado',icon:'🍖',minutes:120,yield:2,salePrice:790,xp:40,ingredients:[['meat','lamb',1],['crop','tomate',1],['supply','seasoning',1]]},
 tilapia_grilled:{name:'Tilápia na Folha de Bananeira',icon:'🐟',minutes:45,yield:2,salePrice:390,xp:22,ingredients:[['fish','tilapia',1],['supply','seasoning',1]]},
 pacu_grilled:{name:'Pacu à Moda Pantaneira',icon:'🐠',minutes:60,yield:2,salePrice:560,xp:30,ingredients:[['fish','pacu',1],['crop','pimenta',1],['supply','seasoning',1]]},
 tambaqui_roast:{name:'Costelinha de Tambaqui Crocante',icon:'🐟',minutes:75,yield:2,salePrice:680,xp:34,ingredients:[['fish','tambaqui',1],['crop','tomate',1],['supply','seasoning',1]]},
 traira_grilled:{name:'Traíra Recheada da Beira do Lago',icon:'🐟',minutes:55,yield:2,salePrice:470,xp:26,ingredients:[['fish','traira',1],['crop','tomate',1],['supply','seasoning',1]]},
 tucuna_grilled:{name:'Filé de Tucunaré com Pimenta',icon:'🐠',minutes:80,yield:2,salePrice:760,xp:38,ingredients:[['fish','tucunaré',1],['crop','pimenta',1],['supply','seasoning',1]]},
 dourado_grilled:{name:'Dourado ao Molho Campestre',icon:'🐠',minutes:100,yield:2,salePrice:920,xp:46,ingredients:[['fish','dourado',1],['crop','tomate',1],['supply','seasoning',1]]},
 pirarucu_grilled:{name:'Pirarucu Amazônico na Brasa',icon:'🐟',minutes:130,yield:2,salePrice:1250,xp:60,ingredients:[['fish','pirarucu',1],['crop','pimenta',1],['supply','seasoning',1]]},
 lambari_frito:{name:'Lambari Crocante da Beira do Rio',icon:'🍤',minutes:30,yield:3,salePrice:180,xp:10,ingredients:[['fish','lambari',2],['crop','milho',1],['supply','seasoning',1]]},
 cara_moqueca:{name:'Moquequinha de Cará com Ervas',icon:'🍲',minutes:45,yield:2,salePrice:260,xp:14,ingredients:[['fish','cara',2],['crop','tomate',1],['crop','batata',1],['supply','seasoning',1]]},
 mandi_frito:{name:'Mandi Dourado com Crosta de Milho',icon:'🍽️',minutes:50,yield:2,salePrice:330,xp:18,ingredients:[['fish','mandi',1],['crop','milho',2],['supply','seasoning',1]]},
 piau_assado:{name:'Piau Assado com Tempero da Roça',icon:'🐟',minutes:55,yield:2,salePrice:370,xp:20,ingredients:[['fish','piau',1],['crop','tomate',1],['crop','pimenta',1],['supply','seasoning',1]]},
 curimbata_recheado:{name:'Curimbatá Recheado à Caipira',icon:'🍴',minutes:65,yield:2,salePrice:450,xp:24,ingredients:[['fish','curimbata',1],['crop','batata',1],['crop','batata',1],['supply','seasoning',1]]},
 pintado_ao_molho:{name:'Pintado ao Molho de Tomate Rústico',icon:'🍲',minutes:85,yield:2,salePrice:780,xp:38,ingredients:[['fish','pintado',1],['crop','tomate',2],['crop','pimenta',1],['supply','seasoning',1]]},
 surubim_na_folha:{name:'Surubim na Folha com Ervas Aromáticas',icon:'🌿',minutes:95,yield:2,salePrice:860,xp:42,ingredients:[['fish','surubim',1],['crop','batata',1],['crop','tomate',1],['supply','seasoning',1]]},
 jau_assado:{name:'Jaú Assado de Festa',icon:'🔥',minutes:115,yield:2,salePrice:1080,xp:52,ingredients:[['fish','jau',1],['crop','batata',2],['crop','pimenta',1],['supply','seasoning',1]]},
 pirarara_especial:{name:'Pirarara Especial do Pescador',icon:'🍛',minutes:125,yield:2,salePrice:1180,xp:56,ingredients:[['fish','pirarara',1],['crop','tomate',1],['crop','milho',1],['supply','honey',1]]},
 piranha_brasa:{name:'Piranha na Brasa com Ervas',icon:'🔥',minutes:70,yield:2,salePrice:520,xp:28,ingredients:[['fish','piranha',1],['crop','tomate',1],['supply','seasoning',1]]},
 matrinxa_assada:{name:'Matrinxã Assada Recheada',icon:'🐟',minutes:85,yield:2,salePrice:720,xp:36,ingredients:[['fish','matrinxa',1],['crop','cebola',1],['crop','mandioca',1],['supply','seasoning',1]]},
 piraputanga_grelhada:{name:'Piraputanga Grelhada Pantaneira',icon:'🐠',minutes:80,yield:2,salePrice:690,xp:34,ingredients:[['fish','piraputanga',1],['crop','tomate',1],['crop','pimenta',1]]},
 jundia_na_folha:{name:'Jundiá na Folha de Bananeira',icon:'🍃',minutes:65,yield:2,salePrice:470,xp:24,ingredients:[['fish','jundia',1],['supply','banana_leaf',1],['supply','seasoning',1]]},
 cachara_brasa:{name:'Cachara na Brasa com Alho',icon:'🐟',minutes:100,yield:2,salePrice:880,xp:43,ingredients:[['fish','cachara',1],['crop','alho',2],['crop','limao',1],['supply','seasoning',1]]},
 barbado_assado:{name:'Barbado Assado à Beira-Rio',icon:'🔥',minutes:105,yield:2,salePrice:940,xp:46,ingredients:[['fish','barbado',1],['crop','cebola',1],['crop','tomate',2],['supply','seasoning',1]]},
 aruana_grelhado:{name:'Aruanã Grelhado com Pimenta',icon:'🐠',minutes:90,yield:2,salePrice:790,xp:39,ingredients:[['fish','aruana',1],['crop','pimenta',1],['crop','alho',1],['supply','seasoning',1]]},
 apaiari_assado:{name:'Apaiari Assado Amazônico',icon:'🐟',minutes:75,yield:2,salePrice:560,xp:29,ingredients:[['fish','apaiari',1],['crop','tomate',1],['crop','cebola',1],['supply','seasoning',1]]},
 salmao_brasa:{name:'Salmão na Brasa com Ervas',icon:'🐟',minutes:115,yield:2,salePrice:1120,xp:54,ingredients:[['sea','salmao',1],['crop','alho',1],['crop','batata',1],['supply','seasoning',1]]},
 bacalhau_grelhado:{name:'Bacalhau Grelhado à Portuguesa',icon:'🐟',minutes:145,yield:2,salePrice:1480,xp:68,ingredients:[['sea','bacalhau',1],['crop','batata',2],['crop','cebola',1],['supply','dende_oil',1]]},
 tubarao_baleia_brasa:{name:'Tubarão-baleia na Brasa com Limão',icon:'🦈',minutes:190,yield:2,salePrice:2180,xp:94,ingredients:[['sea','tubarao_baleia',1],['crop','limao',2],['crop','alho',2],['supply','seasoning',1]]},
 peixe_remo_imperial_grelhado:{name:'Peixe-remo Imperial Grelhado',icon:'🐟',minutes:210,yield:3,salePrice:2460,xp:104,ingredients:[['sea','peixe_remo_imperial',1],['crop','cebola',2],['crop','tomate',2],['supply','dende_oil',1]]},
 pirarucu_dourado_brasa:{name:'Pirarucu Dourado na Brasa',icon:'🔥',minutes:195,yield:2,salePrice:2260,xp:98,ingredients:[['fish','pirarucu_dourado',1],['crop','limao',2],['crop','alho',2],['supply','seasoning',1]]},
 surubim_cristalino_brasa:{name:'Surubim Cristalino Grelhado com Ervas',icon:'🐟',minutes:215,yield:3,salePrice:2520,xp:108,ingredients:[['fish','surubim_cristalino',1],['crop','cebola',2],['crop','tomate',2],['supply','seasoning',1]]}
};
Object.assign(GRILL_RECIPES,{
 goat_grilled:{name:'Cabrito na Brasa com Ervas',icon:'🍖',minutes:105,yield:2,salePrice:780,xp:42,ingredients:[['meat','goat',1],['crop','pimenta',1],['supply','seasoning',1]]},
 kitchen_omelette:{name:'Omelete da Fazenda',icon:'🍳',minutes:18,yield:2,salePrice:180,xp:12,kitchenOnly:true,category:'savory',ingredients:[['animal','eggs',2],['crop','tomate',1],['supply','seasoning',1]]},
 kitchen_rice_chicken:{name:'Arroz Caipira com Frango',icon:'🍗',minutes:35,yield:3,salePrice:420,xp:25,kitchenOnly:true,category:'savory',ingredients:[['crop','arroz',2],['meat','chicken',1],['crop','milho',1]]},
 kitchen_beans_rice:{name:'Feijão com Arroz',icon:'🍛',minutes:28,yield:3,salePrice:320,xp:20,kitchenOnly:true,category:'savory',ingredients:[['crop','feijao',2],['crop','arroz',2],['supply','seasoning',1]]},
 kitchen_fish_stew:{name:'Ensopado de Peixe',icon:'🍲',minutes:32,yield:2,salePrice:390,xp:23,kitchenOnly:true,category:'savory',ingredients:[['fish','tilapia',1],['crop','tomate',2],['animal','milk',1]]},
 kitchen_beef_pie:{name:'Torta Salgada de Carne',icon:'🥧',minutes:45,yield:2,salePrice:560,xp:32,kitchenOnly:true,category:'savory',ingredients:[['meat','beef',1],['crop','milho',2],['animal','eggs',1]]},
 kitchen_potato_puree:{name:'Purê Cremoso',icon:'🥔',minutes:22,yield:2,salePrice:250,xp:16,kitchenOnly:true,category:'savory',ingredients:[['crop','batata',2],['animal','milk',1]]},
 kitchen_pancakes:{name:'Panquecas Doces',icon:'🥞',minutes:25,yield:3,salePrice:340,xp:21,kitchenOnly:true,category:'savory',ingredients:[['animal','eggs',2],['animal','milk',1],['crop','trigo',1]]},
 kitchen_strawberry_jam:{name:'Geleia de Morango',icon:'🍓',minutes:30,yield:2,salePrice:430,xp:26,kitchenOnly:true,category:'savory',ingredients:[['crop','morango',3],['crop','cana',1]]},
 kitchen_pumpkin_sweet:{name:'Doce de Abóbora',icon:'🎃',minutes:35,yield:3,salePrice:390,xp:24,kitchenOnly:true,category:'savory',ingredients:[['crop','abobora',2],['crop','cana',2]]},
 kitchen_banana_cake:{name:'Bolo de Banana',icon:'🍰',minutes:42,yield:2,salePrice:520,xp:31,kitchenOnly:true,category:'savory',ingredients:[['crop','banana',2],['animal','eggs',2],['animal','milk',1]]},
 kitchen_cocoa_candy:{name:'Bombom de Cacau',icon:'🍫',minutes:38,yield:4,salePrice:650,xp:36,kitchenOnly:true,category:'savory',ingredients:[['crop','cacau',2],['animal','milk',1],['supply','honey',1]]},
 kitchen_peach_compote:{name:'Compota de Pêssego',icon:'🍑',minutes:27,yield:2,salePrice:410,xp:25,kitchenOnly:true,category:'savory',ingredients:[['crop','pessego',2],['crop','cana',1]]},
 kitchen_fish_rice:{name:'Arroz de Peixe',icon:'🍚',minutes:34,yield:3,salePrice:480,xp:28,kitchenOnly:true,category:'savory',ingredients:[['crop','arroz',2],['fish','pacu',1],['crop','tomate',1]]},
 kitchen_piranha_calderada:{name:'Caldeirada de Piranha',icon:'🍲',minutes:78,yield:2,salePrice:680,xp:34,kitchenOnly:true,category:'savory',ingredients:[['fish','piranha',1],['crop','tomate',2],['crop','cebola',1],['crop','batata',1]]},
 kitchen_matrinxa_moqueca:{name:'Moqueca de Matrinxã',icon:'🍲',minutes:92,yield:2,salePrice:890,xp:44,kitchenOnly:true,category:'savory',ingredients:[['fish','matrinxa',1],['crop','tomate',2],['crop','cebola',1],['supply','dende_oil',1]]},
 kitchen_piraputanga_rice:{name:'Arroz Cremoso de Piraputanga',icon:'🍚',minutes:82,yield:3,salePrice:820,xp:40,kitchenOnly:true,category:'savory',ingredients:[['fish','piraputanga',1],['crop','arroz',2],['crop','tomate',1],['crop','alho',1]]},
 kitchen_jundia_stew:{name:'Ensopado Caipira de Jundiá',icon:'🥘',minutes:70,yield:2,salePrice:590,xp:30,kitchenOnly:true,category:'savory',ingredients:[['fish','jundia',1],['crop','batata',2],['crop','cebola',1],['crop','tomate',1]]},
 kitchen_cachara_pirao:{name:'Cachara ao Molho com Pirão',icon:'🍲',minutes:110,yield:2,salePrice:1080,xp:52,kitchenOnly:true,category:'savory',ingredients:[['fish','cachara',1],['crop','mandioca',2],['crop','tomate',2],['crop','cebola',1]]},
 kitchen_barbado_stew:{name:'Barbado Ensopado com Legumes',icon:'🥘',minutes:118,yield:2,salePrice:1160,xp:56,kitchenOnly:true,category:'savory',ingredients:[['fish','barbado',1],['crop','batata',2],['crop','cenoura',1],['crop','tomate',1]]},
 kitchen_aruana_coconut:{name:'Aruanã ao Leite de Coco',icon:'🍛',minutes:105,yield:2,salePrice:1020,xp:50,kitchenOnly:true,category:'savory',ingredients:[['fish','aruana',1],['crop','coco',1],['crop','tomate',1],['crop','cebola',1]]},
 kitchen_apaiari_stew:{name:'Apaiari ao Molho Amazônico',icon:'🍲',minutes:86,yield:2,salePrice:760,xp:38,kitchenOnly:true,category:'savory',ingredients:[['fish','apaiari',1],['crop','tomate',2],['crop','pimenta',1],['crop','cebola',1]]},
 kitchen_pirarucu_dourado:{name:'Pirarucu Dourado ao Creme de Ervas',icon:'🍲',minutes:165,yield:2,salePrice:1980,xp:88,kitchenOnly:true,category:'savory',ingredients:[['fish','pirarucu_dourado',1],['animal','milk',1],['crop','alho',2],['crop','cebola',1]]},
 kitchen_surubim_cristalino:{name:'Caldeirada de Surubim Cristalino',icon:'🥘',minutes:180,yield:3,salePrice:2240,xp:96,kitchenOnly:true,category:'savory',ingredients:[['fish','surubim_cristalino',1],['crop','tomate',2],['crop','batata',2],['crop','cebola',1]]},
 kitchen_tubarao_baleia:{name:'Tubarão-baleia ao Leite de Coco',icon:'🍛',minutes:205,yield:2,salePrice:2320,xp:102,kitchenOnly:true,category:'savory',ingredients:[['sea','tubarao_baleia',1],['crop','coco',2],['crop','tomate',1],['crop','cebola',1]]},
 kitchen_peixe_remo_imperial:{name:'Peixe-remo Imperial ao Molho de Ervas',icon:'🍲',minutes:220,yield:3,salePrice:2580,xp:112,kitchenOnly:true,category:'savory',ingredients:[['sea','peixe_remo_imperial',1],['crop','alho',2],['crop','cebola',1],['mix','tempero_aromatico',1]]},
 kitchen_salmao_creamy:{name:'Salmão Cremoso com Ervas',icon:'🍝',minutes:125,yield:2,salePrice:1320,xp:62,kitchenOnly:true,category:'savory',ingredients:[['sea','salmao',1],['animal','milk',1],['crop','alho',1],['crop','batata',1]]},
 kitchen_bacalhau_bras:{name:'Bacalhau à Brás',icon:'🍳',minutes:155,yield:3,salePrice:1680,xp:76,kitchenOnly:true,category:'savory',ingredients:[['sea','bacalhau',1],['crop','batata',2],['crop','cebola',1],['animal','eggs',2]]},
 kitchen_galinhada:{name:'Galinhada Caipira',icon:'🍗',minutes:58,yield:3,salePrice:760,xp:42,kitchenOnly:true,category:'savory',ingredients:[['meat','chicken',1],['crop','arroz',2],['crop','cebola',1],['crop','alho',1],['crop','tomate',1],['crop','milho',1],['mix','tempero_aromatico',1]]},
 kitchen_moqueca_peixe:{name:'Moqueca de Peixe',icon:'🍲',minutes:62,yield:2,salePrice:920,xp:50,kitchenOnly:true,category:'savory',ingredients:[['fish','tilapia',2],['crop','tomate',2],['crop','cebola',1],['crop','alho',1],['supply','dende_oil',1],['mix','tempero_verde_mata',1]]},
 kitchen_frango_ensopado:{name:'Frango Ensopado',icon:'🥘',minutes:46,yield:3,salePrice:690,xp:38,kitchenOnly:true,category:'savory',ingredients:[['meat','chicken',1],['crop','batata',2],['crop','tomate',1],['crop','cebola',1],['crop','alho',1],['mix','tempero_aromatico',1]]},
 grill_espetinho_frango:{name:'Espetinho de Frango Temperado',icon:'🍢',minutes:42,yield:3,salePrice:590,xp:32,ingredients:[['meat','chicken',1],['crop','cebola',1],['crop','alho',1],['crop','pimenta',1],['mix','tempero_pimenta_alecrim',1]]},
 grill_espetinho_alcatra:{name:'Espetinho de Alcatra',icon:'🥩',minutes:55,yield:2,salePrice:820,xp:44,ingredients:[['meat','beef',1],['crop','cebola',1],['crop','alho',1],['crop','tomate',1],['supply','seasoning',1]]},
 grill_costelinha_temperada:{name:'Costelinha Suína com Alho e Cebola',icon:'🍖',minutes:88,yield:2,salePrice:780,xp:42,ingredients:[['meat','pork',1],['crop','cebola',1],['crop','alho',2],['mix','tempero_verde_mata',1]]},
 kitchen_pirarucu_albino:{name:'Caldeirada de Pirarucu Albino',icon:'🍲',minutes:145,yield:2,salePrice:1850,xp:82,kitchenOnly:true,category:'savory',ingredients:[['fish','pirarucu_albino',1],['crop','tomate',2],['crop','cebola',1],['crop','mandioca',2],['supply','dende_oil',1]]},
 grill_pirarucu_albino:{name:'Pirarucu Albino na Brasa',icon:'🔥',minutes:165,yield:2,salePrice:1980,xp:88,ingredients:[['fish','pirarucu_albino',1],['crop','limao',1],['crop','alho',2],['supply','seasoning',1]]},
 kitchen_arraia_gigante:{name:'Moqueca de Arraia Gigante',icon:'🥘',minutes:155,yield:2,salePrice:1920,xp:86,kitchenOnly:true,category:'savory',ingredients:[['fish','arraia_gigante',1],['crop','tomate',2],['crop','cebola',2],['crop','coco',1],['supply','dende_oil',1]]},
 grill_arraia_gigante:{name:'Asas de Arraia na Grelha',icon:'🍽️',minutes:150,yield:2,salePrice:1880,xp:84,ingredients:[['fish','arraia_gigante',1],['crop','alho',2],['crop','pimenta',1],['supply','seasoning',1]]},
 kitchen_peixe_lua:{name:'Peixe-lua ao Creme de Coco',icon:'🍛',minutes:160,yield:2,salePrice:2050,xp:92,kitchenOnly:true,category:'savory',ingredients:[['sea','peixe_lua',1],['crop','coco',2],['crop','cebola',1],['crop','alho',1],['animal','milk',1]]},
 grill_peixe_lua:{name:'Peixe-lua Grelhado com Ervas',icon:'🐟',minutes:175,yield:2,salePrice:2180,xp:96,ingredients:[['sea','peixe_lua',1],['crop','limao',1],['crop','alho',2],['supply','seasoning',1]]},
 kitchen_celacanto:{name:'Ensopado de Celacanto das Profundezas',icon:'🍲',minutes:190,yield:2,salePrice:2350,xp:105,kitchenOnly:true,category:'savory',ingredients:[['sea','celacanto',1],['crop','batata',2],['crop','tomate',2],['crop','cebola',1],['animal','milk',1]]},
 grill_celacanto:{name:'Celacanto Assado do Mar Profundo',icon:'🔥',minutes:210,yield:2,salePrice:2480,xp:110,ingredients:[['sea','celacanto',1],['crop','alho',2],['crop','pimenta',1],['supply','seasoning',1]]}
});



Object.assign(GRILL_RECIPES,{
 kitchen_caviar_canape:{name:'Canapés de Caviar',icon:'🥪',minutes:28,yield:2,salePrice:980,xp:46,kitchenOnly:true,category:'savory',ingredients:[['crop','tomate',2],['crop','milho',1],['supply','caviar',10]]},
 kitchen_caviar_risotto:{name:'Risoto Cremoso de Caviar',icon:'🍚',minutes:68,yield:2,salePrice:1480,xp:72,kitchenOnly:true,category:'savory',ingredients:[['crop','arroz',3],['animal','milk',1],['supply','caviar',10]]},
 kitchen_caviar_omelette:{name:'Omelete de Caviar',icon:'🍳',minutes:42,yield:2,salePrice:1190,xp:58,kitchenOnly:true,category:'savory',ingredients:[['animal','eggs',2],['crop','batata',1],['supply','caviar',10]]}
});
const FOREST_TREES={
 ipe_amarelo:{name:'Ipê-amarelo',icon:'🌼',wood:'ipe',woodName:'Madeira de ipê',level:20,price:1200,hours:30,yield:12,xp:28,color:'#e8c83f'},
 ipe_roxo:{name:'Ipê-roxo',icon:'🌸',wood:'ipe',woodName:'Madeira de ipê',level:21,price:1450,hours:34,yield:12,xp:30,color:'#9870bd'},
 pau_brasil:{name:'Pau-brasil',icon:'🌳',wood:'pau_brasil',woodName:'Madeira de pau-brasil',level:22,price:1800,hours:38,yield:14,xp:32,color:'#398b54'},
 jatoba:{name:'Jatobá',icon:'🌳',wood:'jatoba',woodName:'Madeira de jatobá',level:23,price:2100,hours:42,yield:16,xp:34,color:'#b56a35'},
 jequitiba:{name:'Jequitibá-rosa',icon:'🌳',wood:'jequitiba',woodName:'Madeira de jequitibá',level:24,price:2400,hours:46,yield:18,xp:36,color:'#4c9b58'},
 peroba_rosa:{name:'Peroba-rosa',icon:'🌳',wood:'peroba',woodName:'Madeira de peroba',level:25,price:2700,hours:48,yield:16,xp:38,color:'#a86b57'},
 cedro:{name:'Cedro-rosa',icon:'🌲',wood:'cedro',woodName:'Madeira de cedro',level:26,price:3000,hours:52,yield:16,xp:40,color:'#bb8050'},
 mogno:{name:'Mogno-brasileiro',icon:'🌳',wood:'mogno',woodName:'Madeira de mogno',level:27,price:3400,hours:56,yield:18,xp:42,color:'#a34e42'},
 aroeira:{name:'Aroeira',icon:'🌳',wood:'aroeira',woodName:'Madeira de aroeira',level:28,price:3700,hours:58,yield:15,xp:44,color:'#9a754d',leafId:'folha_aroeira'},
 angico:{name:'Angico',icon:'🌳',wood:'angico',woodName:'Madeira de angico',level:29,price:4000,hours:60,yield:16,xp:46,color:'#bd8856'},
 embauba:{name:'Embaúba',icon:'🌿',wood:'embauba',woodName:'Madeira de embaúba',level:30,price:4300,hours:26,yield:10,xp:30,color:'#82ad65'},
 seringueira:{name:'Seringueira',icon:'🌳',wood:'seringueira',woodName:'Madeira de seringueira',level:31,price:4600,hours:62,yield:16,xp:48,color:'#6e9d5a'},
 castanheira:{name:'Castanheira-do-pará',icon:'🌰',wood:'castanheira',woodName:'Madeira de castanheira',level:32,price:5000,hours:68,yield:20,xp:52,color:'#568d4f'},
 guapuruvu:{name:'Guapuruvu',icon:'🌳',wood:'guapuruvu',woodName:'Madeira de guapuruvu',level:33,price:5300,hours:36,yield:12,xp:40,color:'#88a95a'},
 copaiba:{name:'Copaíba',icon:'🌳',wood:'copaiba',woodName:'Madeira de copaíba',level:34,price:5700,hours:66,yield:18,xp:54,color:'#5d8850'},
 pequizeiro:{name:'Pequizeiro',icon:'🌳',wood:'pequi',woodName:'Madeira de pequi',level:35,price:6000,hours:64,yield:16,xp:55,color:'#83a54c'},
 pitangueira:{name:'Pitangueira',icon:'🔴',wood:'pitanga',woodName:'Madeira de pitangueira',level:36,price:6400,hours:44,yield:12,xp:48,color:'#b84b45',leafId:'folha_pitangueira'},
 araucaria:{name:'Araucária',icon:'🌲',wood:'araucaria',woodName:'Madeira de araucária',level:37,price:6800,hours:72,yield:20,xp:60,color:'#477e50'},
 guabiroba:{name:'Guabirobeira',icon:'🌳',wood:'guabiroba',woodName:'Madeira de guabirobeira',level:38,price:7200,hours:50,yield:14,xp:52,color:'#9aaf58'},
 cambuci:{name:'Cambucizeiro',icon:'🌳',wood:'cambuci',woodName:'Madeira de cambuci',level:39,price:7600,hours:54,yield:14,xp:55,color:'#5b995d'},
 imbuia:{name:'Imbuia',icon:'🌳',wood:'imbuia',woodName:'Madeira de imbuia',level:40,price:8200,hours:76,yield:20,xp:64,color:'#7c644d'},
 guanandi:{name:'Guanandi',icon:'🌳',wood:'guanandi',woodName:'Madeira de guanandi',level:42,price:9000,hours:78,yield:20,xp:68,color:'#5c8c59'},
 arruda:{name:'Arruda',icon:'🌿',wood:null,woodName:'Folha de Arruda',level:20,price:1200,hours:24,yield:8,xp:8,color:'#6c9b4c',herbYield:'arruda'},
 guine:{name:'Guiné',icon:'🌿',wood:null,woodName:'Folha de Guiné',level:21,price:1350,hours:26,yield:8,xp:9,color:'#4f8a43',herbYield:'guine'},
 pata_vaca:{name:'Pata-de-Vaca',icon:'🍃',wood:null,woodName:'Folha de Pata-de-Vaca',level:22,price:1500,hours:28,yield:9,xp:9,color:'#76a85a',herbYield:'pata_vaca'},
 peregum_verde:{name:'Peregum Verde',icon:'🌱',wood:null,woodName:'Folha de Peregum Verde',level:23,price:1650,hours:28,yield:9,xp:9,color:'#3f8d4e',herbYield:'peregum_verde'},
 boldo:{name:'Boldo',icon:'🍃',wood:null,woodName:'Folha de Boldo',level:24,price:1800,hours:30,yield:10,xp:10,color:'#71975b',herbYield:'boldo'},
 manjericao:{name:'Manjericão',icon:'🌿',wood:null,woodName:'Folha de Manjericão',level:25,price:1950,hours:32,yield:10,xp:10,color:'#4d9a52',herbYield:'manjericao'},
 pega_pinto:{name:'Pega-Pinto',icon:'🌱',wood:null,woodName:'Folha de Pega-Pinto',level:26,price:2100,hours:32,yield:10,xp:10,color:'#8a9b4e',herbYield:'pega_pinto'},
 jureminha:{name:'Jureminha',icon:'🌿',wood:null,woodName:'Folha de Jureminha',level:27,price:2250,hours:34,yield:11,xp:11,color:'#5b965d',herbYield:'jureminha'},
 alecrim:{name:'Alecrim',icon:'🌿',wood:null,woodName:'Folha de Alecrim',level:28,price:2400,hours:34,yield:11,xp:11,color:'#729c59',herbYield:'alecrim'},
 pinheiro_natal:{name:'Pinheiro-de-Natal',icon:'🌲',wood:'pinheiro',woodName:'Madeira de pinheiro',level:29,price:3200,hours:48,yield:15,xp:42,color:'#397849'},
 eucalipto:{name:'Eucalipto',icon:'🌿',wood:'eucalipto',woodName:'Madeira de eucalipto',level:30,price:3600,hours:42,yield:18,xp:45,color:'#7eae72',leafId:'folha_eucalipto'},
 pinha:{name:'Pinha',icon:'🌲',wood:'araucaria',woodName:'Pinha',level:31,price:4200,hours:46,yield:14,xp:48,color:'#a68a4d'},
 arvore_garrafa:{name:'Árvore-garrafa',icon:'🌳',wood:'arvore_garrafa',woodName:'Madeira de árvore-garrafa',level:32,price:4800,hours:54,yield:16,xp:52,color:'#a77c49',retired:true},
 nepenthes:{name:'Nepenthes',icon:'🪴',wood:null,woodName:'Folhas de Nepenthes',level:33,price:5200,hours:58,yield:12,xp:55,color:'#8e5c4e',herbYield:'nepenthes',retired:true},
 uvaia:{name:'Uvaia',icon:'🌳',wood:null,woodName:'Frutos de Uvaia',level:34,price:8900,hours:64,yield:18,xp:62,color:'#c99a36',fruitCrop:'uvaia'},
 cambuca:{name:'Cambucá',icon:'🌳',wood:null,woodName:'Frutos de Cambucá',level:35,price:9800,hours:70,yield:20,xp:68,color:'#a96a38',fruitCrop:'cambuca'}
};
const FOREST_TREE_IDS=Object.keys(FOREST_TREES).filter(id=>!FOREST_TREES[id].retired),FOREST_TIME_FACTOR=.2,FOREST_PLOTS=36;
const FOREST_SLOT_POS=Array.from({length:36},(_,i)=>[3906+(i%12)*104,305+Math.floor(i/12)*120]);
const SEA_TYPES={
 robalo:{name:'Robalo',icon:'🐟',rarity:'Comum',xp:5,minNet:0,weight:26},sardinha:{name:'Sardinha',icon:'🐟',rarity:'Comum',xp:4,minNet:0,weight:30},tainha:{name:'Tainha',icon:'🐟',rarity:'Comum',xp:5,minNet:0,weight:24},corvina:{name:'Corvina',icon:'🐟',rarity:'Comum',xp:5,minNet:0,weight:22},camarao:{name:'Camarão',icon:'🦐',rarity:'Comum',xp:6,minNet:0,weight:20},
 pescada:{name:'Pescada-amarela',icon:'🐟',rarity:'Incomum',xp:8,minNet:1,weight:19},anchova:{name:'Anchova',icon:'🐟',rarity:'Incomum',xp:8,minNet:1,weight:18},lula:{name:'Lula',icon:'🦑',rarity:'Incomum',xp:9,minNet:1,weight:16},mexilhao:{name:'Mexilhão',icon:'🦪',rarity:'Incomum',xp:8,minNet:1,weight:15},cavala:{name:'Cavala',icon:'🐟',rarity:'Incomum',xp:9,minNet:1,weight:15},
 badejo:{name:'Badejo',icon:'🐟',rarity:'Raro',xp:12,minNet:2,weight:14},garoupa:{name:'Garoupa',icon:'🐟',rarity:'Raro',xp:13,minNet:2,weight:13},polvo:{name:'Polvo',icon:'🐙',rarity:'Raro',xp:14,minNet:2,weight:12},ostra:{name:'Ostra',icon:'🦪',rarity:'Raro',xp:13,minNet:2,weight:12},vieira:{name:'Vieira',icon:'🦪',rarity:'Raro',xp:14,minNet:2,weight:10},
 linguado:{name:'Linguado',icon:'🐟',rarity:'Muito raro',xp:17,minNet:3,weight:9},namorado:{name:'Namorado',icon:'🐟',rarity:'Muito raro',xp:18,minNet:3,weight:8},atum:{name:'Atum',icon:'🐟',rarity:'Muito raro',xp:19,minNet:3,weight:7},bonito:{name:'Bonito',icon:'🐟',rarity:'Muito raro',xp:18,minNet:3,weight:7},
 pargo:{name:'Pargo',icon:'🐠',rarity:'Lendário',xp:24,minNet:4,weight:5},cherne:{name:'Cherne',icon:'🐟',rarity:'Lendário',xp:25,minNet:4,weight:4},peixe_espada:{name:'Peixe-espada',icon:'🐟',rarity:'Lendário',xp:28,minNet:4,weight:3},dourado_mar:{name:'Dourado-do-mar',icon:'🐠',rarity:'Lendário',xp:27,minNet:4,weight:3},
 salmao:{name:'Salmão',icon:'🐟',rarity:'Muito raro',xp:19,minNet:3,weight:6},
 bacalhau:{name:'Bacalhau',icon:'🐟',rarity:'Lendário',xp:28,minNet:4,weight:3},
 caviar:{name:'Caviar',icon:'🖤',rarity:'Lendário',xp:52,minNet:4,weight:1.2},
 peixe_lua:{name:'Peixe-lua',icon:'🐟',rarity:'Extraordinário',xp:44,minNet:0,weight:0.75,extraordinaryOnly:true},
 celacanto:{name:'Celacanto',icon:'🐟',rarity:'Extraordinário',xp:50,minNet:0,weight:0.5,extraordinaryOnly:true},
 tubarao_baleia:{name:'Tubarão-baleia',icon:'🦈',rarity:'Extraordinário',xp:56,minNet:0,weight:0.55,extraordinaryOnly:true},
 peixe_remo_imperial:{name:'Peixe-remo Imperial',icon:'🐟',rarity:'Extraordinário',xp:60,minNet:0,weight:0.45,extraordinaryOnly:true}
};
const SEA_NETS={normal:{name:'Normal',level:1,coins:0,greenCoins:0,order:0},novato:{name:'Novato',level:8,coins:3800,greenCoins:2,order:1},junior:{name:'Junior',level:16,coins:12500,greenCoins:5,order:2},senior:{name:'Sênior',level:26,coins:36000,greenCoins:12,order:3},profissional:{name:'Profissional',level:38,coins:90000,greenCoins:25,order:4},lendaria:{name:'Lendária',level:22,coins:1200000,greenCoins:1200,order:5,extraordinaryOnly:true}};
const LAKE_FISH={lambari:{name:"Lambari",icon:"🐟",egg:180,price:260,hours:3},tilapia:{name:"Tilápia",icon:"🐠",egg:260,price:420,hours:4},carpa:{name:"Carpa",icon:"🐟",egg:420,price:680,hours:5},koi:{name:"Carpa Koi",icon:"🎏",egg:900,price:1500,hours:6},pacu:{name:"Pacu",icon:"🐟",egg:620,price:980,hours:5},tambaqui:{name:"Tambaqui",icon:"🐠",egg:780,price:1250,hours:6},pintado:{name:"Pintado",icon:"🐟",egg:1100,price:1850,hours:7},dourado:{name:"Dourado",icon:"🐠",egg:1250,price:2100,hours:7},pirarucu:{name:"Pirarucu",icon:"🐟",egg:1800,price:3200,hours:9},esturjao:{name:"Esturjão",icon:"🐟",egg:2400,price:4400,hours:10}};
const LAKE_FEED_PRICE=95,LAKE_TIME_FACTOR=.2;
const LAKE_DECOR_SLOTS=[[-170,-8],[-130,-118],[0,-154],[132,-112],[174,12],[130,118],[0,152],[-132,112]];
const WOODWORK_RECIPES={
 ponte_carvalho:{name:'Ponte curva de carvalho',icon:'🌉',wood:'jatoba',qty:8,color:'Carvalho natural',tone:'#b7834d',lakeBridge:true},ponte_azul:{name:'Ponte azul colonial',icon:'🌉',wood:'cedro',qty:8,color:'Azul oceano',tone:'#477da8',lakeBridge:true},ponte_verde:{name:'Ponte verde campestre',icon:'🌉',wood:'ipe',qty:8,color:'Verde musgo',tone:'#568b58',lakeBridge:true},ponte_rubra:{name:'Ponte avermelhada oriental',icon:'🌉',wood:'mogno',qty:8,color:'Mogno',tone:'#a34f43',lakeBridge:true},
 banco_azul:{name:'Banco de jardim azul',icon:'🪑',wood:'cedro',qty:3,color:'Azul',tone:'#477da8'},banco_verde:{name:'Banco de jardim verde',icon:'🪑',wood:'ipe',qty:3,color:'Verde',tone:'#568b58'},banco_mel:{name:'Banco de jardim cor de mel',icon:'🪑',wood:'jatoba',qty:3,color:'Mel',tone:'#bd8745'},
 mesa_natural:{name:'Mesa rústica natural',icon:'🪵',wood:'jequitiba',qty:5,color:'Natural',tone:'#c9a77a'},mesa_escura:{name:'Mesa rústica escura',icon:'🪵',wood:'imbuia',qty:5,color:'Ébano',tone:'#655044'},mesa_avermelhada:{name:'Mesa rústica avermelhada',icon:'🪵',wood:'mogno',qty:5,color:'Mogno',tone:'#a34f43'},
 cadeira_azul:{name:'Cadeira colonial azul',icon:'🪑',wood:'cedro',qty:2,color:'Azul',tone:'#477da8'},cadeira_creme:{name:'Cadeira colonial creme',icon:'🪑',wood:'araucaria',qty:2,color:'Creme',tone:'#e1d1a9'},cadeira_vermelha:{name:'Cadeira colonial vermelha',icon:'🪑',wood:'pau_brasil',qty:2,color:'Vermelho',tone:'#b94b43'},
 estante_mel:{name:'Estante cor de mel',icon:'🗄️',wood:'jatoba',qty:6,color:'Mel',tone:'#bd8745'},estante_escura:{name:'Estante escura',icon:'🗄️',wood:'imbuia',qty:6,color:'Ébano',tone:'#655044'},bau_natural:{name:'Baú de madeira natural',icon:'🧰',wood:'castanheira',qty:4,color:'Natural',tone:'#c9ad7d'},
 floreira_branca:{name:'Floreira branca',icon:'🪴',wood:'guapuruvu',qty:2,color:'Branco',tone:'#e8e0cd'},floreira_rosa:{name:'Floreira rosa',icon:'🪴',wood:'pitanga',qty:2,color:'Rosa',tone:'#d58b9a'},pergolado_verde:{name:'Mini pergolado verde',icon:'🏡',wood:'aroeira',qty:8,color:'Verde',tone:'#568b58'}
};

const FISH_TYPES={
 lambari:{name:'Lambari',rarity:'Comum',xp:3,icon:'🐟',minRod:0,weight:34},
 tilapia:{name:'Tilápia',rarity:'Comum',xp:3,icon:'🐟',minRod:0,weight:30},
 cara:{name:'Cará',rarity:'Comum',xp:4,icon:'🐠',minRod:0,weight:24},
 mandi:{name:'Mandi',rarity:'Incomum',xp:5,icon:'🐟',minRod:1,weight:20},
 traira:{name:'Traíra',rarity:'Incomum',xp:6,icon:'🐟',minRod:1,weight:18},
 piau:{name:'Piau',rarity:'Incomum',xp:6,icon:'🐟',minRod:1,weight:18},
 curimbata:{name:'Curimbatá',rarity:'Incomum',xp:7,icon:'🐟',minRod:1,weight:15},
 pacu:{name:'Pacu',rarity:'Raro',xp:9,icon:'🐠',minRod:2,weight:15},
 tambaqui:{name:'Tambaqui',rarity:'Raro',xp:10,icon:'🐟',minRod:2,weight:13},
 tucunaré:{name:'Tucunaré',rarity:'Raro',xp:11,icon:'🐠',minRod:2,weight:12},
 dourado:{name:'Dourado',rarity:'Muito raro',xp:14,icon:'🐠',minRod:3,weight:9},
 pintado:{name:'Pintado',rarity:'Muito raro',xp:15,icon:'🐟',minRod:3,weight:8},
 surubim:{name:'Surubim',rarity:'Muito raro',xp:16,icon:'🐟',minRod:3,weight:7},
 pirarucu:{name:'Pirarucu',rarity:'Lendário',xp:20,icon:'🐟',minRod:4,weight:5},
 jau:{name:'Jaú',rarity:'Lendário',xp:22,icon:'🐟',minRod:4,weight:4},
 pirarara:{name:'Pirarara',rarity:'Lendário',xp:24,icon:'🐠',minRod:4,weight:3},
 piranha:{name:'Piranha',rarity:'Incomum',xp:7,icon:'🐟',minRod:1,weight:14},
 matrinxa:{name:'Matrinxã',rarity:'Raro',xp:10,icon:'🐟',minRod:2,weight:11},
 piraputanga:{name:'Piraputanga',rarity:'Raro',xp:10,icon:'🐠',minRod:2,weight:10},
 jundia:{name:'Jundiá',rarity:'Incomum',xp:7,icon:'🐟',minRod:1,weight:14},
 cachara:{name:'Cachara',rarity:'Muito raro',xp:15,icon:'🐟',minRod:3,weight:7},
 barbado:{name:'Barbado',rarity:'Muito raro',xp:16,icon:'🐟',minRod:3,weight:6},
 aruana:{name:'Aruanã',rarity:'Raro',xp:12,icon:'🐠',minRod:2,weight:8},
 apaiari:{name:'Apaiari (acará-açu)',rarity:'Incomum',xp:8,icon:'🐠',minRod:1,weight:12},
 pirarucu_albino:{name:'Pirarucu Albino',rarity:'Extraordinário',xp:42,icon:'🐟',minRod:0,weight:0.8,extraordinaryOnly:true},
 arraia_gigante:{name:'Arraia Gigante de Água Doce',rarity:'Extraordinário',xp:46,icon:'🪽',minRod:0,weight:0.65,extraordinaryOnly:true},
 pirarucu_dourado:{name:'Pirarucu Dourado',rarity:'Extraordinário',xp:54,icon:'🐠',minRod:0,weight:0.55,extraordinaryOnly:true},
 surubim_cristalino:{name:'Surubim Cristalino',rarity:'Extraordinário',xp:58,icon:'🐟',minRod:0,weight:0.45,extraordinaryOnly:true}
};
const FISHING_RODS={
 normal:{name:'Normal',level:1,coins:0,greenCoins:0,order:0},
 novato:{name:'Novato',level:5,coins:2500,greenCoins:2,order:1},
 junior:{name:'Junior',level:12,coins:9000,greenCoins:5,order:2},
 senior:{name:'Sênior',level:22,coins:28000,greenCoins:12,order:3},
 profissional:{name:'Profissional',level:35,coins:75000,greenCoins:25,order:4},
 lendaria:{name:'Lendária',level:22,coins:1200000,greenCoins:1200,order:5,extraordinaryOnly:true}
};
const FISH_COOLDOWN=8000,SEA_FISH_COOLDOWN=12000;

const GRILL_SUPPLIES={honey:{name:'Mel',icon:'🍯',price:180},seasoning:{name:'Tempero',icon:'🧂',price:120},banana_leaf:{name:'Folha de bananeira',icon:'🍃',price:90},dende_oil:{name:'Azeite de dendê',icon:'🫗',price:220},lavender:{name:'Alfazema',icon:'🪻',price:180},cinnamon:{name:'Canela em pau',icon:'🪵',price:160},camomile:{name:'Camomila',icon:'🌼',price:150},fermento_quimico:{name:'Fermento químico',icon:'🧁',price:95,category:'seasoning'},caviar:{name:'Caviar',icon:'🖤',price:0,obtainOnly:true}};
const MEAT_PRODUCTS={chicken:{name:'Carne de frango',icon:'🍗',unitPrice:95},beef:{name:'Carne bovina',icon:'🥩',unitPrice:145},pork:{name:'Carne suína',icon:'🥓',unitPrice:125},lamb:{name:'Carne de cordeiro',icon:'🍖',unitPrice:160},turkey:{name:'Carne de peru',icon:'🦃',unitPrice:180},goat:{name:'Carne de cabra',icon:'🍖',unitPrice:155},duck:{name:'Carne de pato',icon:'🦆',unitPrice:170},yak:{name:'Carne de iaque',icon:'🥩',unitPrice:195},buffalo:{name:'Carne de búfala',icon:'🥩',unitPrice:185},rabbit:{name:'Carne de coelho',icon:'🍖',unitPrice:115}};
const ANIMAL_MEAT_SOURCE={galinha:{meat:'chicken',yield:2},vaca:{meat:'beef',yield:3},boi:{meat:'beef',yield:4},porco:{meat:'pork',yield:3},ovelha:{meat:'lamb',yield:2},peru:{meat:'turkey',yield:2},pato:{meat:'duck',yield:2},cabra:{meat:'goat',yield:2},iaque:{meat:'yak',yield:3},bufala:{meat:'buffalo',yield:3},coelho:{meat:'rabbit',yield:1}};
const DUAL_PURPOSE_ANIMALS=Object.keys(ANIMAL_MEAT_SOURCE);
const GRILL_TIME_FACTOR=1; // minutos reais de espera para assar
const KITCHEN_TIME_FACTOR=1; // minutos reais de espera para cozinhar
const ANIMAL_TIME_FACTOR=.2; // mantém o ritmo reduzido de 1/5 também para ciclos de produção/criação
const HORSE_ASSETS={horse:'https://raw.githubusercontent.com/dabb3/colheita-feliz-public/299dd2d05754a97bccbc0e7b0a86db3c5c8d4396/assets/classic/animals/cavalo/cavalo.png',robot:'https://raw.githubusercontent.com/dabb3/colheita-feliz-public/299dd2d05754a97bccbc0e7b0a86db3c5c8d4396/assets/classic/animals/cachorro-robo/cachorro-robo.png',peacock:'https://raw.githubusercontent.com/dabb3/colheita-feliz-public/299dd2d05754a97bccbc0e7b0a86db3c5c8d4396/assets/classic/animals/pavao/pavao-aberto.png',goat:'https://raw.githubusercontent.com/dabb3/colheita-feliz-public/299dd2d05754a97bccbc0e7b0a86db3c5c8d4396/assets/classic/animals/cabra/cabra.png',coin:'https://raw.githubusercontent.com/dabb3/colheita-feliz-public/299dd2d05754a97bccbc0e7b0a86db3c5c8d4396/assets/classic/icons/moeda-comum.png',green:'https://raw.githubusercontent.com/dabb3/colheita-feliz-public/299dd2d05754a97bccbc0e7b0a86db3c5c8d4396/assets/classic/icons/moeda-verde.png',day:'https://raw.githubusercontent.com/dabb3/colheita-feliz-public/299dd2d05754a97bccbc0e7b0a86db3c5c8d4396/assets/classic/background/background.png',night:'https://raw.githubusercontent.com/dabb3/colheita-feliz-public/299dd2d05754a97bccbc0e7b0a86db3c5c8d4396/assets/classic/background/background-night.png'};
const HORSE_BREEDS={horse_percheron:{name:'Percheron',price:12000,sellPrice:36000,coat:'Cinza, com crina e cauda brancas'},horse_quarto_milha:{name:'Quarto de Milha',price:15000,sellPrice:45000,coat:'Marrom, com crina e cauda pretas'},horse_puro_sangue:{name:'Puro Sangue',price:18000,sellPrice:54000,coat:'Marrom avermelhado, em tom terracota'},horse_frisio:{name:'Frísio',price:22000,sellPrice:66000,coat:'Pelagem inteiramente preta'},horse_andaluz:{name:'Andaluz',price:26000,sellPrice:78000,coat:'Pelagem inteiramente branca'}};
const ANIMALS={
 cachorro:{name:'Cachorro',icon:'🐕',role:'guard',feedKey:'feed_dog',feedName:'Alimento do cachorro',feedPrice:2000,guardHours:24,feedHistorical:false},
 galinha:{name:'Galinha',icon:'🐔',role:'producer',feedKey:'feed_chicken',feedName:'Alimento para galinha',feedPrice:40,feedHistorical:true,price:650,cycleHours:8,product:'eggs',productName:'Ovos',productIcon:'🥚',yield:2,unitPrice:55,xp:10},
 vaca:{name:'Vaca',icon:'🐄',role:'producer',feedKey:'feed_cow',feedName:'Alimento para gado',feedPrice:60,feedHistorical:true,price:1450,cycleHours:12,product:'milk',productName:'Leite',productIcon:'🥛',yield:2,unitPrice:85,xp:14},
 ovelha:{name:'Ovelha',icon:'🐑',role:'producer',feedKey:'feed_sheep',feedName:'Ração para ovelha',feedPrice:95,price:1200,cycleHours:12,product:'wool',productName:'Lã',productIcon:'🧶',yield:1,unitPrice:135,xp:14},
 porco:{name:'Porco',icon:'🐖',role:'producer',feedKey:'feed_pig',feedName:'Alimento para porco',feedPrice:60,feedHistorical:true,price:1050,growthHours:12,cycleHours:12,product:'truffles',productName:'Trufas',productIcon:'🍄',yield:1,unitPrice:145,xp:18},
 peru:{name:'Peru',icon:'🦃',role:'producer',feedKey:'feed_turkey',feedName:'Ração para peru',feedPrice:90,price:2200,growthHours:16,cycleHours:16,product:'turkey_feathers',productName:'Penas de peru',productIcon:'🪶',yield:2,unitPrice:95,sellPrice:6800,xp:28,balance:'estimated',estimateNote:'Produção, alimentação, crescimento, XP e valores são estimativas locais.'},
 burro:{name:'Burro',icon:'🫏',role:'grower',feedKey:'feed_donkey',feedName:'Ração para burro',feedPrice:105,price:1750,growthHours:14,sellPrice:5900,xp:22},
 pato:{name:'Pato',icon:'🦆',role:'producer',feedKey:'feed_duck',feedName:'Ração para pato',feedPrice:95,price:1800,cycleHours:9,product:'duck_eggs',productName:'Ovos de pato',productIcon:'🥚',yield:2,unitPrice:70,xp:12,balance:'estimated',estimateNote:'ID histórico confirmado; preço, ciclo, rendimento e produção foram estimados.'},
 pombo:{name:'Pombo',icon:'🕊️',role:'producer',feedKey:'feed_pigeon',feedName:'Ração para pombo',feedPrice:80,price:1250,cycleHours:8,product:'pigeon_feathers',productName:'Penas de pombo',productIcon:'🪶',yield:3,unitPrice:45,xp:9,balance:'estimated',estimateNote:'ID histórico confirmado; preço, ciclo, rendimento e produção foram estimados.'},
 pavao:{name:'Pavão',icon:'🦚',role:'producer',feedKey:'feed_peacock',feedName:'Ração para pavão',feedPrice:145,price:4800,cycleHours:14,product:'peacock_feathers',productName:'Penas de pavão',productIcon:'🪶',yield:2,unitPrice:125,xp:18,balance:'estimated',estimateNote:'ID histórico confirmado; preço, ciclo, rendimento e produção foram estimados.'},
 iaque:{name:'Iaque',icon:'🐂',role:'producer',feedKey:'feed_yak',feedName:'Ração para iaque',feedPrice:165,price:10000,growthHours:18,cycleHours:18,product:'yak_wool',productName:'Lã de iaque',productIcon:'🧶',yield:1,unitPrice:175,xp:45,balance:'estimated',estimateNote:'Produção, crescimento, XP e valores são estimativas locais.'},
 boi:{name:'Boi',icon:'🐂',role:'producer',feedKey:'feed_bull',feedName:'Ração para boi',feedPrice:150,price:6200,growthHours:22,cycleHours:22,product:'bullhide',productName:'Couro bovino',productIcon:'🦬',yield:1,unitPrice:125,xp:42,balance:'estimated',estimateNote:'Produção, crescimento, rendimento de carne e valores são estimativas locais.'},
 cabra:{name:'Cabra',icon:'🐐',role:'producer',feedKey:'feed_goat',feedName:'Ração para cabra',feedPrice:95,price:2800,growthHours:15,cycleHours:15,product:'goat_milk',productName:'Leite de cabra',productIcon:'🥛',yield:2,unitPrice:105,xp:27,balance:'estimated',estimateNote:'Produção, crescimento, rendimento de carne e valores são estimativas locais.'},
 bufala:{name:'Búfala',icon:'🐃',role:'producer',feedKey:'feed_buffalo',feedName:'Ração para búfala',feedPrice:125,price:3900,cycleHours:15,product:'buffalo_milk',productName:'Leite de búfala',productIcon:'🥛',yield:2,unitPrice:135,xp:20,balance:'estimated',estimateNote:'Produção, ciclo e valores estimados para esta edição.'},
 coelho:{name:'Coelho',icon:'🐇',role:'producer',feedKey:'feed_rabbit',feedName:'Ração para coelho',feedPrice:55,price:950,cycleHours:7,product:'rabbit_fur',productName:'Pelagem de coelho',productIcon:'🧶',yield:2,unitPrice:65,xp:9,balance:'estimated',estimateNote:'Produção, ciclo e valores estimados para esta edição.'},
 ...Object.fromEntries(Object.entries(HORSE_BREEDS).map(([id,b])=>[id,{name:b.name,icon:'🐎',role:'horse',breed:id,feedKey:'feed_horse',feedName:'Ração para cavalos',feedPrice:180,price:b.price,sellPrice:b.sellPrice,growthHours:18,xp:14}]))
};
const DOG_BREEDS={
 classico:{name:'Cachorro clássico',id:'21_0 / 22_0',asset:'animal-cachorro',price:0,ownedByDefault:true},
 papillon:{name:'Papillon',id:'50_0',asset:'dog-papillon',price:2500,ext:'png'},
 dalmata:{name:'Dálmata',id:'51_0',asset:'dog-dalmata',price:3200,ext:'png'},
 robo:{name:'Robô',id:'52_0',asset:'dog-robo',image:HORSE_ASSETS.robot,price:5200},
 husky:{name:'Husky',id:'53_0',asset:'dog-husky',price:4600,ext:'png'},
 poodle:{name:'Poodle',id:'54_0',asset:'dog-poodle',price:3900,ext:'png'},
 salsichinha:{name:'Salsichinha',id:'55_0',asset:'dog-salsichinha',price:2800,ext:'png'},
 shetland:{name:'Pastor de Shetland',id:'56_0',asset:'dog-shetland',price:4300,ext:'png'},
 sharpei:{name:'Shar-Pei',id:'57_0',asset:'dog-sharpei',price:4100,ext:'png'},
 mastiff:{name:'Mastiff',id:'58_0',asset:'dog-mastiff',price:5800,ext:'png'},
};
const RETIRED_DOG_BREED_IDS=['renas','apaixonado','namorados'];
const ANIMAL_RATIONS={
 galinha:{key:'ration_chicken',name:'Ração para Galinha',price:4,animal:'galinha',historical:true},
 vaca:{key:'ration_cow',name:'Ração para Vaca',price:10,animal:'vaca',historical:true},
 porco:{key:'ration_pig',name:'Ração para Porco',price:2,animal:'porco',historical:true}
};
const ANIMAL_PRODUCTS={eggs:{name:'Ovos',icon:'🥚',unitPrice:55},milk:{name:'Leite',icon:'🥛',unitPrice:85},wool:{name:'Lã',icon:'🧶',unitPrice:135},feathers:{name:'Penas',icon:'🪶',unitPrice:85},duck_eggs:{name:'Ovos de pato',icon:'🥚',unitPrice:70},pigeon_feathers:{name:'Penas de pombo',icon:'🪶',unitPrice:45},peacock_feathers:{name:'Penas de pavão',icon:'🪶',unitPrice:125},buffalo_milk:{name:'Leite de búfala',icon:'🥛',unitPrice:135},rabbit_fur:{name:'Pelagem de coelho',icon:'🧶',unitPrice:65},turkey_feathers:{name:'Penas de peru',icon:'🪶',unitPrice:95},truffles:{name:'Trufas',icon:'🍄',unitPrice:145},bullhide:{name:'Couro bovino',icon:'🦬',unitPrice:125},goat_milk:{name:'Leite de cabra',icon:'🥛',unitPrice:105},yak_wool:{name:'Lã de iaque',icon:'🧶',unitPrice:175}};
const FERTILIZERS={
 fertilizer_250:{name:'Fertilizante 2h30',icon:'🧪',hours:2.5,price:450,currency:'coins',balance:'partial',note:'A redução de 2h30 aparece em registros históricos; preço local estimado.'},
 fertilizer_550:{name:'Fertilizante 5h50',icon:'🧫',hours:5+50/60,price:850,currency:'coins',balance:'partial',note:'ID histórico 19_0 indica 5:50; preço local estimado.'},
 superFertilizer:{name:'Superfertilizante 5h30',icon:'⚗️',hours:5.5,price:1,currency:'greenCoins',balance:'partial',note:'Redução histórica de 5h30; preço local estimado em 1 moeda verde.'},
 sunlightFertilizer:{name:'Luz do Sol Mágica · 8h',icon:'☀️',hours:8,price:0,currency:'gift',balance:'historical',note:'Item histórico entregue como presente diário; não é vendido na loja.'},
 loveFertilizer:{name:'Fertilizante do Amor · 6h',icon:'💗',hours:6,price:1,currency:'greenCoins',balance:'adapted',note:'Historicamente fertilizava apenas fazendas de amigos; uso na própria fazenda é adaptação offline.'},
 fertilizer_15h:{name:'Fertilizante 15h',icon:'🧴',hours:15,price:2500,currency:'coins',balance:'estimated',note:'Nome/ID histórico preservado; duração de 15h inferida do nome e preço estimado.'},
 surfConcentrate:{name:'Surf Líquido Concentrado · 20h',icon:'🧼',hours:20,price:0,currency:'gift',flowerOnly:true,balance:'historical',note:'Presente diário ou de amigos; reduz 20h e só pode ser usado em flores.'}
};
const ANIMAL_SLOTS=[
 {x:1280,y:245,w:140,h:105},{x:1440,y:245,w:140,h:105},{x:1600,y:245,w:140,h:105},
 {x:1280,y:385,w:140,h:105},{x:1440,y:385,w:140,h:105},{x:1600,y:385,w:140,h:105},
 {x:1280,y:525,w:140,h:105},{x:1440,y:525,w:140,h:105},{x:1600,y:525,w:140,h:105}
 ];
const HORSE_SLOTS=[
  {x:-625,y:710,w:88,h:66},{x:-525,y:710,w:88,h:66},{x:-425,y:710,w:88,h:66},{x:-325,y:710,w:88,h:66},{x:-225,y:710,w:88,h:66},
  {x:-625,y:925,w:88,h:66},{x:-525,y:925,w:88,h:66},{x:-425,y:925,w:88,h:66},{x:-325,y:925,w:88,h:66},{x:-225,y:925,w:88,h:66}
 ];
const BIRD_TYPES=['galinha','pombo','pato','pavao','peru'];
const isBirdType=type=>BIRD_TYPES.includes(type);
const AVIARY_COLUMNS=6;
const ANIMAL_SCALE={pombo:.52,galinha:.68,pato:.68,pavao:.76,peru:.82,coelho:.55,porco:.82,cabra:.78,ovelha:.88,burro:.94,vaca:1.00,bufala:1.02,boi:1.02,iaque:.94};
const ORCHARD_CROP_IDS=['maca','manga','laranja','goiaba','limao','coco','arvore_jujuba','arvore_pirulito','arvore_romantica_chinesa','pinheiro_natal','arvore_namorados','carambola','acerola','jaca','caju','pera','jabuticaba','guarana','mamao'];
const ORCHARD_SLOTS=[[2185,365],[2470,385],[2760,365],[3050,390],[2330,525],[2615,545],[2905,525],[3190,545]];
const AREA_CONFIG={orchard:{name:'Pomar produtivo',icon:'🌳',price:18000,level:15},pond:{name:'Rio da fazenda',icon:'🌊',price:9000,level:12},haras:{name:'Haras',icon:'🐎',price:16000,greenPrice:25,level:20}};
function starterAnimals(){return [
 {id:'dog-1',type:'cachorro',name:'Cachorro',breed:'classico',slot:-1,status:'hungry',stage:1,readyAt:0,guardUntil:0},
 {id:'donkey-1',type:'burro',name:'Burro',slot:0,status:'hungry',stage:1,readyAt:0},
 {id:'sheep-1',type:'ovelha',name:'Ovelha',slot:1,status:'hungry',stage:1,readyAt:0},
 {id:'cow-1',type:'vaca',name:'Vaca',slot:2,status:'hungry',stage:1,readyAt:0},
 {id:'chicken-1',type:'galinha',name:'Galinha',slot:3,status:'hungry',stage:1,readyAt:0},
 {id:'pig-1',type:'porco',name:'Porco',slot:4,status:'hungry',stage:1,readyAt:0}
]}
const SHOP_EXCLUDED_CROP_IDS=['caviar','cacau_pascoa','semente_papai','arvore_jujuba','arvore_pirulito','arvore_serpentina','lilas','arvore_romantica_chinesa','arvore_natal','arvore_namorados','pinheiro_natal','eucalipto','pinha','arvore_garrafa','nepenthes'],CROP_IDS=Object.keys(CROPS),FLOWER_IDS=CROP_IDS.filter(id=>CROPS[id].kind==='flower'&&!SHOP_EXCLUDED_CROP_IDS.includes(id)),FIELD_CROP_IDS=CROP_IDS.filter(id=>CROPS[id].kind!=='flower'&&!CROPS[id].forestOnly&&!SHOP_EXCLUDED_CROP_IDS.includes(id)),ADVANCED_CROP_IDS=FIELD_CROP_IDS.filter(id=>CROPS[id].advanced&&!['arvore_garrafa','nepenthes'].includes(id)),EVENT_CROP_IDS=FIELD_CROP_IDS.filter(id=>CROPS[id].eventOnly&&!SHOP_EXCLUDED_CROP_IDS.includes(id)),BASIC_FIELD_CROP_IDS=FIELD_CROP_IDS.filter(id=>!CROPS[id].advanced&&!CROPS[id].eventOnly&&!SHOP_EXCLUDED_CROP_IDS.includes(id)),BOUQUET_IDS=Object.keys(BOUQUETS),$=id=>document.getElementById(id),fmt=n=>Math.floor(n).toLocaleString('pt-BR'),safe=s=>String(s).replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#039;'}[c]));
for(const [recipeId,recipe] of Object.entries(GRILL_RECIPES)){if((recipe.ingredients||[]).some(([type,id])=>type==='crop'&&SHOP_EXCLUDED_CROP_IDS.includes(id)))delete GRILL_RECIPES[recipeId]}for(const [bouquetId,bouquet] of Object.entries(BOUQUETS)){if(Object.keys(bouquet.recipe||{}).some(id=>SHOP_EXCLUDED_CROP_IDS.includes(id)))delete BOUQUETS[bouquetId]}
const WORLD={left:-3400,right:14000,top:-300,bottom:1400,w:17400,h:1700},SCENE_BOUNDS={farm:{label:'Fazenda',left:-1450,right:1800,top:-250,bottom:1400},river:{label:'Rio',left:-3000,right:250,top:-250,bottom:1400},nature:{label:'Pomar e Mata',left:1900,right:5700,top:-250,bottom:1400},sea:{label:'Mar',left:3000,right:14000,top:-700,bottom:1800}},view={zoom:.8,cx:950,cy:490},svg=$('world');let activeScene='farm',sceneAnimationFrame=0;let writeLocked=false,multiSelectMode=false,selectedPlotIndices=new Set();let state,tool='inspect',chosenCrop=null,chosenFertilizer='quick',currentModal='',saving=Promise.resolve(),dirty=false,saveTimer=null,toastTimer=null,lastSelected=-1,profilePhotoDraft='';
let audioCtx=null,musicTimer=null,musicIndex=0,musicPlaying=false,musicBus=null,sfxBus=null,musicTrackOrder=[],musicTrackPosition=0,lastMusicTrack=-1;
let musicVolume=100,sfxVolume=100,musicMode='random';
try{musicVolume=Math.max(0,Math.min(100,Number(localStorage.getItem('cf2.musicVolume')??100)));sfxVolume=Math.max(0,Math.min(100,Number(localStorage.getItem('cf2.sfxVolume')??100)));musicMode=localStorage.getItem('cf2.musicMode')==='sequential'?'sequential':'random'}catch{}
const SUPABASE_URL='https://osmoolsywhlorgqqybhk.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable__pNF0EfJMbM_a6Jdmpylvg_HY3nzRpo';
let supabaseClient=null,cloudUser=null,cloudRevision=0,cloudUpdatedAt=null,cloudSyncing=false,cloudDirty=false,cloudConflict=false,supabaseAuthSubscription=null,cloudSessionReadyUserId=null;
let cloudRetryTimer=null,cloudRetryCountdown=null,cloudRetryAttempt=0,cloudRetryAt=0,cloudRetryContext=null,cloudPermanentSaveError=null;
let cloudIntegrityReport=null,cloudIntegrityChecking=false;
let cloudSyncHistory=[];
function recordCloudSyncEvent(type,message,detail=''){
 cloudSyncHistory.unshift({type,message,detail,time:Date.now()});cloudSyncHistory=cloudSyncHistory.slice(0,30);
 if(currentModal==='account'){const host=$('cloud-sync-history');if(host)host.innerHTML=renderCloudSyncHistory()}
}
function renderCloudSyncHistory(){
 if(!cloudSyncHistory.length)return '<p class="historical-note">Nenhum evento registrado nesta sessão. Os próximos carregamentos, salvamentos e tentativas aparecerão aqui.</p>';
 const labels={success:'✓ Concluído',retry:'↻ Nova tentativa',warning:'⚠ Atenção',error:'✕ Falha'};
 return '<div class="queue-list">'+cloudSyncHistory.map(item=>'<div class="list-line"><span><b>'+safe(labels[item.type]||'• Evento')+' · '+safe(item.message)+'</b>'+(item.detail?'<br><small>'+safe(item.detail)+'</small>':'')+'<br><small>'+new Date(item.time).toLocaleString('pt-BR')+'</small></span></div>').join('')+'</div>';
}
function initSupabase(){
 if(!supabaseClient){
  if(!window.supabase||typeof window.supabase.createClient!=='function')return false;
  supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
 }
 if(!supabaseAuthSubscription){
  const listener=supabaseClient.auth.onAuthStateChange((event,session)=>{
   if(session&&['SIGNED_IN','INITIAL_SESSION'].includes(event)){
    window.setTimeout(()=>{if(state)handleAuthSession(session).catch(error=>console.error('Falha ao concluir autenticação:',error));},0);
   }else if(event==='SIGNED_OUT'){
    clearCloudRetry();cloudRetryAttempt=0;cloudRetryContext=null;cloudPermanentSaveError=null;clearCloudRetry();cloudRetryAttempt=0;cloudRetryContext=null;cloudPermanentSaveError=null;cloudUser=null;cloudSessionReadyUserId=null;cloudRevision=0;cloudUpdatedAt=null;cloudDirty=false;dirty=false;writeLocked=true;state=newGame();onlineFriends=[];onlineFriendRequests=[];onlineSearchResults=[];onlineSocialLoaded=false;onlineMessages=[];onlineNotifications=[];onlineGifts=[];onlineGiftsLoaded=false;onlinePlayerCode='';onlineCodeSearchResult=null;visitedFarm=null;farmVisitSettings={allow_visits:true,like_count:0};updateConnectionLabel();if(currentModal==='account')renderModal();refresh();
   }
  });
  supabaseAuthSubscription=listener?.data?.subscription||true;
 }
 return true;
}
async function processEmailConfirmationCallback(){
 if(!supabaseClient)return;
 const url=new URL(window.location.href),tokenHash=url.searchParams.get('token_hash'),type=url.searchParams.get('type');
 if(!tokenHash||!['signup','email'].includes(type||''))return;
 const {data,error}=await supabaseClient.auth.verifyOtp({token_hash:tokenHash,type});
 url.searchParams.delete('token_hash');url.searchParams.delete('type');
 window.history.replaceState({},document.title,url.pathname+url.search+url.hash);
 if(error){notify('Não foi possível confirmar este e-mail. O link pode ter expirado ou já ter sido utilizado. Solicite uma nova confirmação.');console.error('Confirmação de e-mail:',error);return;}
 if(data?.session)await handleAuthSession(data.session);
 else notify('E-mail confirmado com sucesso. Agora você já pode entrar com seu e-mail e senha.');
}

function updateConnectionLabel(){
 const label=$('connection-label'),dot=$('connection-dot');
 if(label)label.textContent=cloudUser?'NUVEM':'ENTRE NA CONTA';
 if(dot)dot.classList.toggle('online',!!cloudUser&&cloudSessionReadyUserId===cloudUser.id);
}
function readLegacyFarmSave(){
 try{
  const raw=localStorage.getItem('cf2.save');
  if(!raw)return null;
  const parsed=JSON.parse(raw);
  if(!parsed||parsed.version!==1||!parsed.state)throw new Error('O antigo salvamento local está em formato inválido.');
  const restored=normalizeFarmSnapshot(parsed.state);
  if(!restored)throw new Error('O antigo salvamento local não pôde ser recuperado.');
  return restored;
 }catch(error){if(error instanceof SyntaxError)throw new Error('O antigo salvamento local está corrompido.');throw error}
}
function clearLegacyFarmSave(){try{localStorage.removeItem('cf2.save')}catch(error){console.warn('Não foi possível limpar o antigo salvamento local:',error)}}

function cloudRevisionConflict(message='A fazenda na nuvem possui uma revisão mais recente. Carregue a versão atual antes de continuar.'){const error=new Error(message);error.code='CLOUD_REVISION_CONFLICT';return error}
function isPermanentCloudSaveError(error){
 if(error?.code==='CLOUD_REVISION_CONFLICT'||error?.code==='23505')return true;
 const status=Number(error?.status||error?.statusCode||error?.context?.status);
 if([400,401,403,404,422].includes(status))return true;
 const code=String(error?.code||'').toUpperCase();
 if(['42501','PGRST301','PGRST204','PGRST205','22P02'].includes(code))return true;
 const message=String(error?.message||'').toLowerCase();
 return message.includes('não passaram pela verificação')||message.includes('formato inválido')||message.includes('permission denied')||message.includes('invalid jwt')||message.includes('row-level security')||message.includes('violates row-level security');
}
function clearCloudRetry(){
 if(cloudRetryTimer){clearTimeout(cloudRetryTimer);cloudRetryTimer=null}
 if(cloudRetryCountdown){clearInterval(cloudRetryCountdown);cloudRetryCountdown=null}
 cloudRetryAt=0;
}
function scheduleCloudRetry(error){
 if(cloudConflict||cloudPermanentSaveError||!dirty)return;
 const delays=[2000,5000,10000,20000,30000,60000];
 const delay=delays[Math.min(cloudRetryAttempt,delays.length-1)];
 cloudRetryAttempt++;
 cloudRetryAt=Date.now()+delay;
 const updateStatus=()=>{
  const seconds=Math.max(0,Math.ceil((cloudRetryAt-Date.now())/1000));
  $('save-status').textContent='Falha temporária · nova tentativa em '+seconds+'s (tentativa '+cloudRetryAttempt+')';
  $('save-dot').className='savedot saving';
 };
 updateStatus();
 recordCloudSyncEvent('retry','Sincronização temporariamente indisponível','Tentativa '+cloudRetryAttempt+' agendada para daqui a '+Math.ceil(delay/1000)+' segundos.');
 if(cloudRetryCountdown)clearInterval(cloudRetryCountdown);
 cloudRetryCountdown=setInterval(updateStatus,1000);
 cloudRetryTimer=setTimeout(()=>{
  clearCloudRetry();
  if(dirty&&navigator.onLine&&farmWriteAllowed(false))save();
  else if(dirty){$('save-status').textContent='Alterações pendentes · aguardando conexão';$('save-dot').className='savedot error'}
 },delay);
 console.warn('Sincronização temporariamente indisponível; nova tentativa agendada:',error);
}
async function reconcileCloudRetry(){
 const context=cloudRetryContext;
 if(!context||context.userId!==cloudUser?.id)return false;
 const {data,error}=await supabaseClient.from('farm_saves').select('state,revision,updated_at').eq('user_id',cloudUser.id).maybeSingle();
 if(error)throw error;
 if(!data){
  if(context.baseRevision===0)return false;
  throw cloudRevisionConflict('O registro da fazenda mudou durante a tentativa de sincronização. A gravação foi pausada para proteger o progresso.');
 }
 const remoteRevision=Number(data.revision)||1;
 if(remoteRevision===context.baseRevision)return false;
 if(remoteRevision===context.baseRevision+1&&validateFarmSnapshot(data.state)&&JSON.stringify(stableIntegrityValue(data.state))===JSON.stringify(stableIntegrityValue(context.snapshot))){
  cloudRevision=remoteRevision;cloudUpdatedAt=data.updated_at||null;cloudDirty=dirty;
  return true;
 }
 throw cloudRevisionConflict();
}
async function saveCloud(snapshot=state){
 if(!supabaseClient||!cloudUser)throw new Error('Nenhuma conta conectada para salvar na nuvem.');
 if(!validateFarmSnapshot(snapshot))throw new Error('Os dados atuais da fazenda não passaram pela verificação de integridade. A gravação foi cancelada para proteger o progresso.');
 const userId=cloudUser.id,baseRevision=cloudRevision;
 const savedState=JSON.parse(JSON.stringify(snapshot));
 const nextRevision=baseRevision+1;
 const row={user_id:userId,farm_name:savedState.farmName||'Minha fazenda',state:savedState,revision:nextRevision,updated_at:new Date().toISOString()};
 cloudRetryContext={userId,baseRevision,snapshot:savedState};
 let result;
 if(baseRevision===0){
  result=await supabaseClient.from('farm_saves').insert(row).select('revision,updated_at').single();
 }else{
  const update={farm_name:row.farm_name,state:row.state,revision:nextRevision,updated_at:row.updated_at};
  result=await supabaseClient.from('farm_saves').update(update).eq('user_id',userId).eq('revision',baseRevision).select('revision,updated_at').maybeSingle();
 }
 if(result.error){if(result.error.code==='23505')throw cloudRevisionConflict('A fazenda foi criada em outra sessão. Carregue a versão atual da nuvem antes de continuar.');throw result.error;}
 if(!result.data)throw cloudRevisionConflict();
 cloudRevision=Number(result.data.revision)||nextRevision;cloudUpdatedAt=result.data.updated_at||row.updated_at;cloudDirty=dirty;cloudRetryContext=null;publishSocialProfile().catch(error=>console.error('Publicação do perfil social:',error));
}
async function handleAuthSession(session){
 if(!session?.user||!supabaseClient)return;
 if(cloudSessionReadyUserId===session.user.id||cloudSyncing)return;
 cloudSyncing=true;let syncSucceeded=false;writeLocked=true;
 if(cloudUser?.id!==session.user.id){clearCloudRetry();cloudRetryAttempt=0;cloudRetryContext=null;cloudPermanentSaveError=null;onlineFriends=[];onlineFriendRequests=[];onlineSearchResults=[];onlineSocialLoaded=false;onlineMessages=[];onlineNotifications=[];activeConversationId='';onlineInboxLoaded=false;onlineGifts=[];onlineGiftsLoaded=false;onlinePlayerCode='';onlineCodeSearchResult=null;visitedFarm=null}
 cloudUser=session.user;updateConnectionLabel();$('save-status').textContent='Carregando fazenda da nuvem...';
 try{
  const {data,error}=await supabaseClient.from('farm_saves').select('state,revision,updated_at').eq('user_id',cloudUser.id).maybeSingle();
  if(error)throw error;
  if(!data){
   const legacy=readLegacyFarmSave();
   state=legacy||newGame();dirty=false;cloudDirty=false;cloudRevision=0;cloudUpdatedAt=null;writeLocked=false;
   await saveCloud();clearLegacyFarmSave();
   $('save-status').textContent=legacy?'Fazenda antiga migrada para a nuvem':'Nova fazenda salva na nuvem';
   notify(legacy?'Seu antigo progresso foi migrado para a nuvem.':'Conta conectada. Sua nova fazenda foi criada na nuvem.');
  }else{
   const hasLegacyDogBreedEntries=(!!data.state?.temporaryDogBreeds&&typeof data.state.temporaryDogBreeds==='object'&&Object.keys(data.state.temporaryDogBreeds).length>0)||(Array.isArray(data.state?.dogBreedsOwned)&&data.state.dogBreedsOwned.some(id=>RETIRED_DOG_BREED_IDS.includes(id)))||(Array.isArray(data.state?.animals)&&data.state.animals.some(a=>a?.type==='cachorro'&&RETIRED_DOG_BREED_IDS.includes(a.breed)))||(Array.isArray(data.state?.catalog)&&data.state.catalog.some(x=>x?.category==='caes'&&RETIRED_DOG_BREED_IDS.includes(x.id)));
   const restored=normalizeFarmSnapshot(data.state);
   if(!restored)throw new Error('A fazenda da nuvem está em um formato inválido.');
   state=restored;cloudRevision=Number(data.revision)||1;cloudUpdatedAt=data.updated_at||null;dirty=false;cloudDirty=false;clearTimeout(saveTimer);saveTimer=null;writeLocked=hasLegacyDogBreedEntries;clearLegacyFarmSave();
   if(hasLegacyDogBreedEntries){
    await saveCloud();
    writeLocked=false;
    recordCloudSyncEvent('success','Migração das raças de cães concluída','Raças removidas foram excluídas das contas e cães equipados foram restaurados à raça clássica.');
   }
   $('save-status').textContent=hasLegacyDogBreedEntries?'Fazenda carregada · raças removidas':'Fazenda carregada da nuvem';recordCloudSyncEvent('success','Fazenda carregada da nuvem','Revisão '+cloudRevision+'.');
   notify(hasLegacyDogBreedEntries?'Fazenda carregada; raças descontinuadas removidas e cães restaurados à raça clássica.':'Fazenda carregada da nuvem com sucesso.');
  }
  refresh();$('save-dot').className='savedot';syncSucceeded=true;
 }catch(error){
  console.error('Supabase:',error);writeLocked=true;cloudDirty=false;$('save-status').textContent='Falha ao carregar a nuvem · jogo bloqueado';
  notify('Não foi possível carregar ou sincronizar sua fazenda na nuvem. O jogo ficará bloqueado para proteger seu progresso: '+(error.message||'verifique sua conexão.'));
 }finally{
  if(syncSucceeded)cloudSessionReadyUserId=session.user.id;
  cloudSyncing=false;updateConnectionLabel();if(cloudUser)publishSocialProfile().catch(error=>console.error('Perfil social:',error));if(currentModal==='account')renderModal();
 }
}
async function authenticate(mode){
 if(!initSupabase())return notify('A conexão de autenticação não carregou. Verifique sua internet e tente novamente.');
 const email=$('auth-email')?.value.trim()||'',password=$('auth-password')?.value||'';
 if(!email||!password)return notify('Informe e-mail e senha.');
 const result=mode==='signup'
  ?await supabaseClient.auth.signUp({email,password,options:{emailRedirectTo:new URL('/',window.location.origin).toString()}})
  :await supabaseClient.auth.signInWithPassword({email,password});
 if(result.error)return notify(result.error.message||'Não foi possível autenticar.');
 if(result.data.session){await handleAuthSession(result.data.session);if(currentModal==='account')renderModal();}
 else notify('Cadastro iniciado. Verifique seu e-mail para confirmar a conta antes de entrar.');
}
async function disconnectCloud(){
 if(!supabaseClient)return;
 if(dirty){await save();if(dirty||cloudDirty)return notify('Não foi possível concluir o salvamento na nuvem. A sessão foi mantida para proteger seu progresso.')}
 else if(cloudDirty){try{await saveCloud()}catch(error){return notify('Não foi possível sincronizar antes de sair: '+(error.message||'tente novamente.'))}}
 const {error}=await supabaseClient.auth.signOut();if(error)return notify(error.message||'Não foi possível sair da conta.');
 cloudUser=null;cloudSessionReadyUserId=null;cloudRevision=0;cloudUpdatedAt=null;cloudDirty=false;dirty=false;writeLocked=true;state=newGame();onlineFriends=[];onlineFriendRequests=[];onlineMessages=[];onlineNotifications=[];activeConversationId='';onlineSocialLoaded=false;onlineInboxLoaded=false;onlineGifts=[];onlineGiftsLoaded=false;onlinePlayerCode='';onlineCodeSearchResult=null;visitedFarm=null;farmVisitSettings={allow_visits:true,like_count:0};updateConnectionLabel();refresh();notify('Sessão encerrada. Entre novamente para carregar sua fazenda da nuvem.');renderModal();
}

let soundEnabled=true,musicEnabled=true;
try{soundEnabled=localStorage.getItem('cf2.sound')!=='off';musicEnabled=localStorage.getItem('cf2.music')!=='off'}catch{}
function applyAudioVolumes(){if(musicBus)musicBus.gain.setTargetAtTime((musicVolume/100)*2.15,audioCtx.currentTime,.04);if(sfxBus)sfxBus.gain.setTargetAtTime((sfxVolume/100)*1.8,audioCtx.currentTime,.025)}
function ensureAudio(){
 const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return null;
 if(!audioCtx){audioCtx=new Ctx();musicBus=audioCtx.createGain();sfxBus=audioCtx.createGain();musicBus.connect(audioCtx.destination);sfxBus.connect(audioCtx.destination);applyAudioVolumes()}
 if(audioCtx.state==='suspended')audioCtx.resume().catch(()=>{});
 return audioCtx;
}
function playTone(freq,duration=.12,wave='sine',volume=.045,slide=0){
 const ctx=ensureAudio();if(!ctx)return;
 const osc=ctx.createOscillator(),gain=ctx.createGain(),now=ctx.currentTime;
 osc.type=wave;osc.frequency.setValueAtTime(Math.max(40,freq),now);
 if(slide)osc.frequency.exponentialRampToValueAtTime(Math.max(40,freq+slide),now+duration);
 gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(volume,now+.012);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
 osc.connect(gain);gain.connect(sfxBus||ctx.destination);osc.start(now);osc.stop(now+duration+.02);
}
function playNoise(duration=.12,volume=.025,frequency=900){
 const ctx=ensureAudio();if(!ctx)return;
 const length=Math.max(1,Math.floor(ctx.sampleRate*duration)),buffer=ctx.createBuffer(1,length,ctx.sampleRate),data=buffer.getChannelData(0);
 for(let i=0;i<length;i++)data[i]=(Math.random()*2-1)*(1-i/length);
 const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain(),now=ctx.currentTime;
 source.buffer=buffer;filter.type='bandpass';filter.frequency.value=frequency;filter.Q.value=.7;
 gain.gain.setValueAtTime(volume,now);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
 source.connect(filter);filter.connect(gain);gain.connect(sfxBus||ctx.destination);source.start(now);source.stop(now+duration);
}
function playSfx(kind){
 if(!soundEnabled)return;ensureAudio();
 const patterns={
  plant:()=>{playTone(520,.09,'triangle',.035,100);setTimeout(()=>playTone(740,.12,'sine',.035,80),75)},
  water:()=>{playNoise(.22,.018,520);playTone(620,.18,'sine',.018,-110)},
  weed:()=>{playNoise(.09,.035,1200);playTone(880,.08,'triangle',.025,-260)},
  pest:()=>{playTone(980,.07,'square',.018,-350);setTimeout(()=>playTone(640,.1,'sine',.025,-170),70)},
  hoe:()=>{playNoise(.12,.035,260);playTone(155,.12,'triangle',.025,-45)},
  fertilizer:()=>{playTone(300,.24,'sine',.035,550);setTimeout(()=>playTone(780,.16,'sine',.025,160),100)},
  harvest:()=>{playTone(523,.15,'sine',.035);setTimeout(()=>playTone(659,.15,'sine',.035),95);setTimeout(()=>playTone(784,.24,'sine',.04),190)},
  levelup:()=>{playTone(523,.16,'triangle',.05,70);setTimeout(()=>playTone(659,.16,'triangle',.05,80),115);setTimeout(()=>playTone(784,.18,'triangle',.055,95),230);setTimeout(()=>playTone(1047,.34,'sine',.06,0),360)}
 };
 (patterns[kind]||(()=>{}))();
}
// Trilhas MP3: nove músicas gerais e temas próprios para as pescarias.
const GENERAL_MUSIC_FILES=Array.from({length:9},(_,i)=>'/song/general/NewFarmSong'+(i?i+1:'')+'.mp3');
const SPECIAL_MUSIC_FILES={river:'/song/river/PescaRio.mp3',sea:'/song/sea/PescaMar.mp3'};
let musicAudio=null,musicSpareAudio=null,musicContext='general',musicFadeLevel=1,musicOutFadeLevel=0,musicFadeTimer=null,musicTransitionId=0,musicGeneralPath='',musicGeneralTime=0;
function createMusicAudio(){
 const audio=new Audio();audio.preload='auto';audio.volume=0;
 audio.addEventListener('timeupdate',()=>{if(audio===musicAudio&&audio.dataset.musicContext==='general'&&!audio.paused)musicGeneralTime=audio.currentTime});
 audio.addEventListener('ended',()=>{if(audio!==musicAudio||!musicEnabled)return;musicPlaying=false;if(audio.dataset.musicContext==='general'){musicGeneralPath='';musicGeneralTime=0;playNextGeneralMusic()}});
 return audio;
}
function ensureMusicAudio(){if(!musicAudio&&!musicSpareAudio)musicSpareAudio=createMusicAudio();return musicAudio||musicSpareAudio}
function applyAudioVolumes(){
 if(musicBus)musicBus.gain.setTargetAtTime((musicVolume/100)*2.15,audioCtx.currentTime,.04);
 if(sfxBus)sfxBus.gain.setTargetAtTime((sfxVolume/100)*1.8,audioCtx.currentTime,.025);
 const base=musicVolume/100;if(musicAudio)musicAudio.volume=Math.max(0,Math.min(1,base*musicFadeLevel));if(musicSpareAudio)musicSpareAudio.volume=Math.max(0,Math.min(1,base*musicOutFadeLevel));
}
function fadeMusicTransition(outgoing,fromLevel){
 if(musicFadeTimer)clearInterval(musicFadeTimer);
 const started=Date.now(),duration=700;
 musicFadeTimer=setInterval(()=>{
  const progress=Math.min(1,(Date.now()-started)/duration);musicFadeLevel=progress;musicOutFadeLevel=fromLevel*(1-progress);applyAudioVolumes();
  if(progress>=1){clearInterval(musicFadeTimer);musicFadeTimer=null;if(outgoing)outgoing.pause();musicOutFadeLevel=0;applyAudioVolumes();musicPlaying=true}
 },35);
}
function nextGeneralMusicPath(){
 if(musicTrackPosition>=musicTrackOrder.length){
  musicTrackOrder=musicMode==='sequential'?GENERAL_MUSIC_FILES.map((_,i)=>i):GENERAL_MUSIC_FILES.map((_,i)=>i).sort(()=>Math.random()-.5);
  if(musicTrackOrder.length>1&&musicTrackOrder[0]===lastMusicTrack)[musicTrackOrder[0],musicTrackOrder[1]]=[musicTrackOrder[1],musicTrackOrder[0]];
  musicTrackPosition=0;
 }
 const id=musicTrackOrder[musicTrackPosition++];lastMusicTrack=id;return GENERAL_MUSIC_FILES[id];
}
function playMusicFile(path,context,resumeAt=0){
 if(!musicEnabled)return;
 if(musicFadeTimer){clearInterval(musicFadeTimer);musicFadeTimer=null}
 const outgoing=musicAudio;
 if(musicSpareAudio&&musicSpareAudio!==outgoing){musicSpareAudio.pause();musicOutFadeLevel=0}
 const incoming=musicSpareAudio||createMusicAudio(),transition=++musicTransitionId;
 incoming.pause();incoming.src=path;incoming.dataset.musicContext=context;incoming.loop=context!=='general';incoming.volume=0;
 try{incoming.currentTime=Math.max(0,resumeAt||0)}catch{}
 const activate=()=>{
  if(transition!==musicTransitionId){incoming.pause();return}
  if(outgoing&&outgoing.dataset.musicContext==='general'&&musicGeneralPath)musicGeneralTime=outgoing.currentTime;
  const oldLevel=outgoing&&!outgoing.paused?musicFadeLevel:0;
  musicAudio=incoming;musicSpareAudio=outgoing;musicFadeLevel=0;musicOutFadeLevel=oldLevel;applyAudioVolumes();
  fadeMusicTransition(outgoing,oldLevel);
 };
 const playing=incoming.play();
 if(playing&&typeof playing.then==='function')playing.then(activate).catch(()=>{if(transition===musicTransitionId)musicPlaying=!!(outgoing&&!outgoing.paused)});
 else activate();
}
function playNextGeneralMusic(){
 if(!musicEnabled||musicContext!=='general')return;
 const path=nextGeneralMusicPath();musicGeneralPath=path;musicGeneralTime=0;playMusicFile(path,'general',0);
}
function startCurrentMusic(){
 if(!musicEnabled)return;
 if(musicContext==='general'){if(musicGeneralPath)playMusicFile(musicGeneralPath,'general',musicGeneralTime);else playNextGeneralMusic()}
 else playMusicFile(SPECIAL_MUSIC_FILES[musicContext],musicContext,0);
}
function setMusicContext(context){
 const next=context==='river'||context==='sea'?context:'general';
 if(musicContext===next&&musicAudio&&musicAudio.dataset.musicContext===next&&!musicAudio.paused)return;
 musicContext=next;if(!musicEnabled)return;
 if(next==='general'&&musicGeneralPath)playMusicFile(musicGeneralPath,'general',musicGeneralTime);
 else if(next==='general')playNextGeneralMusic();
 else playMusicFile(SPECIAL_MUSIC_FILES[next],next,0);
}
function stopMusicPlayback(){
 if(musicFadeTimer)clearInterval(musicFadeTimer);musicFadeTimer=null;
 const active=musicAudio,spare=musicSpareAudio,transition=++musicTransitionId;
 if((!active||active.paused)&&(!spare||spare.paused)){musicPlaying=false;return}
 const activeFrom=musicFadeLevel,spareFrom=musicOutFadeLevel,started=Date.now(),duration=350;
 musicFadeTimer=setInterval(()=>{
  if(transition!==musicTransitionId){clearInterval(musicFadeTimer);musicFadeTimer=null;return}
  const progress=Math.min(1,(Date.now()-started)/duration);musicFadeLevel=activeFrom*(1-progress);musicOutFadeLevel=spareFrom*(1-progress);applyAudioVolumes();
  if(progress>=1){clearInterval(musicFadeTimer);musicFadeTimer=null;for(const audio of [active,spare])if(audio){if(audio.dataset.musicContext==='general'&&musicGeneralPath)musicGeneralTime=audio.currentTime;audio.pause()}musicFadeLevel=1;musicOutFadeLevel=0;applyAudioVolumes();musicPlaying=false}
 },35);
}
function setSoundEnabled(value){soundEnabled=!!value;try{localStorage.setItem('cf2.sound',soundEnabled?'on':'off')}catch{}if(soundEnabled)playTone(660,.1,'sine',.04)}
function setMusicEnabled(value){musicEnabled=!!value;try{localStorage.setItem('cf2.music',musicEnabled?'on':'off')}catch{}if(musicEnabled)startCurrentMusic();else stopMusicPlayback()}
function setMusicVolume(value){musicVolume=Math.max(0,Math.min(100,Number(value)||0));try{localStorage.setItem('cf2.musicVolume',String(musicVolume))}catch{}ensureAudio();applyAudioVolumes();const out=$('music-volume-value');if(out)out.textContent=musicVolume+'%'}
function setSfxVolume(value){sfxVolume=Math.max(0,Math.min(100,Number(value)||0));try{localStorage.setItem('cf2.sfxVolume',String(sfxVolume))}catch{}ensureAudio();applyAudioVolumes();const out=$('sfx-volume-value');if(out)out.textContent=sfxVolume+'%'}
function setMusicMode(value){musicMode=value==='sequential'?'sequential':'random';try{localStorage.setItem('cf2.musicMode',musicMode)}catch{}musicTrackOrder=[];musicTrackPosition=0}
let landscapeModeActive=false;
function syncLandscapeControls(active){
 const desktop=$('orientation-toggle'),mobile=$('orientation-toggle-mobile');
 if(desktop){desktop.setAttribute('aria-pressed',String(active));desktop.title=active?'Voltar ao modo retrato':'Girar para modo paisagem';desktop.setAttribute('aria-label',active?'Voltar ao modo retrato':'Ativar modo paisagem')}
 if(mobile){mobile.setAttribute('aria-pressed',String(active));mobile.setAttribute('aria-label',active?'Voltar ao modo retrato':'Ativar modo paisagem');mobile.title=active?'Voltar ao modo retrato':'Ativar modo paisagem';const label=mobile.querySelector('span');if(label)label.textContent=active?'Voltar ao modo retrato':'Modo paisagem'}
}
async function toggleLandscapeMode(){
 const root=document.documentElement;
 if(landscapeModeActive){
  landscapeModeActive=false;
  root.classList.remove('orientation-landscape-fallback');
  try{screen.orientation?.unlock?.()}catch{}
  syncLandscapeControls(false);
  requestAnimationFrame(updateView);
  notify('Modo paisagem desativado.');return;
 }
 let locked=false;
 try{if(screen.orientation?.lock){await screen.orientation.lock('landscape');locked=true}}catch{}
 landscapeModeActive=true;
 if(!locked)root.classList.add('orientation-landscape-fallback');
 syncLandscapeControls(true);
 requestAnimationFrame(updateView);
 notify(locked?'Modo paisagem ativado.':'Modo paisagem visual ativado. Se o aparelho não girar fisicamente, o jogo será ajustado para a horizontal.');
}
window.addEventListener('orientationchange',()=>requestAnimationFrame(updateView));
window.addEventListener('resize',()=>{if(landscapeModeActive)requestAnimationFrame(updateView)});
document.addEventListener('pointerdown',()=>{if(musicEnabled&&!musicPlaying)startCurrentMusic()},{once:true});

const seedNoise=n=>{const x=Math.sin(n*91.13+17.37)*29341.715;return x-Math.floor(x)};
function svgImage(name,x,y,w,h,extra=''){return `<image data-asset="${name}" href="/assets/${name}.png" x="${x}" y="${y}" width="${w}" height="${h}" pointer-events="none" ${extra}/>`}
function cropHours(id,regrowing=false){const c=CROPS[id];return Math.max(.01,(regrowing&&c.regrowHours?c.regrowHours:c.hours)*CROP_TIME_FACTOR)}
function cropCurrency(c){return c.priceCurrency==='green'?'greenCoins':'coins'}
function cropPriceLabel(c){return `${c.priceCurrency==='green'?'🟢':'🟡'} ${fmt(c.price)}`}
function vipActive(){return Number.isFinite(state?.vipUntil)&&state.vipUntil>Date.now()}
function cropLevelAllowed(c){return farmLevel()>=(c.minLevel??1)||(!!c.vipAccess&&vipActive())}
function cropAffordable(c){return !!c&&state[cropCurrency(c)]>=c.price&&cropLevelAllowed(c)}
function cropBalanceNote(c){if(c.balance==='estimated')return `<br/><b class="data-origin estimated">Dados fictícios · estimativa local</b><br/><small>${safe(c.estimateNote||'Parâmetros de plantio estimados para esta reconstrução.')}</small>`;if(c.balance==='partial')return `<br/><b class="data-origin estimated">Dados parcialmente recuperados</b><br/><small>${safe(c.estimateNote||'Campos ausentes foram estimados localmente.')}</small>`;if(c.balance==='access-adaptation')return `<br/><b class="data-origin adapted">${vipActive()?'Cartão VIP ativo':'Acesso VIP ou nível mínimo'}</b><br/><small>${safe(c.estimateNote||'')}</small>`;return c.historical?'<br/><b class="data-origin historic">Dados históricos recuperados</b>':''}
function formatHours(hours){const mins=Math.round(hours*60);return mins>=60?`${Math.floor(mins/60)}h ${mins%60}min`:`${mins}min`}
function todayKey(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function yesterdayKey(){const d=new Date();d.setDate(d.getDate()-1);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function flower(x,y,s=1,color='#ffe8c3'){let a='';for(let i=0;i<5;i++){const angle=i*Math.PI*2/5;a+=`<ellipse cx="${x+Math.cos(angle)*s*6}" cy="${y+Math.sin(angle)*s*6}" rx="${3.6*s}" ry="${5.6*s}" fill="${color}" transform="rotate(${i*72} ${x+Math.cos(angle)*s*6} ${y+Math.sin(angle)*s*6})"/>`};return `<g pointer-events="none">${a}<circle cx="${x}" cy="${y}" r="${3*s}" fill="#ffd642"/></g>`}
function grassClump(x,y,s=1){return `<g pointer-events="none" opacity=".67" transform="translate(${x} ${y}) scale(${s})"><path d="M0 0q-5-10-14-11M0 0q3-13-1-18M0 0q8-11 14-8M0 0q-8-6-11-4" fill="none" stroke="#2b8d1d" stroke-width="2.4" stroke-linecap="round"/></g>`}
function fencePath(points,section=''){let rails='';for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i];rails+=`<path d="M${a[0]} ${a[1]-29}L${b[0]} ${b[1]-29}M${a[0]} ${a[1]-9}L${b[0]} ${b[1]-9}" fill="none" stroke="#68452c" stroke-width="15" stroke-linecap="round"/><path d="M${a[0]} ${a[1]-30}L${b[0]} ${b[1]-30}M${a[0]} ${a[1]-10}L${b[0]} ${b[1]-10}" fill="none" stroke="#b77a43" stroke-width="9" stroke-linecap="round"/><path d="M${a[0]} ${a[1]-34}L${b[0]} ${b[1]-34}M${a[0]} ${a[1]-14}L${b[0]} ${b[1]-14}" fill="none" stroke="#e8bd79" stroke-width="2.5" stroke-linecap="round" opacity=".9"/>`}
let posts=points.map(([x,y])=>`<g><ellipse cx="${x+3}" cy="${y+9}" rx="14" ry="7" fill="#31551e" opacity=".28"/><path d="M${x-12} ${y-55}L${x-10} ${y-65}L${x+1} ${y-72}L${x+12} ${y-65}L${x+13} ${y+8}L${x-11} ${y+8}Z" fill="#85512f" stroke="#57391f" stroke-width="3.5"/><path d="M${x-10} ${y-55}L${x-8} ${y-64}L${x+1} ${y-69}L${x+10} ${y-63}L${x+10} ${y+3}L${x-8} ${y+3}Z" fill="#b87943"/><path d="M${x-8} ${y-55}L${x+1} ${y-63}L${x+9} ${y-55}" fill="none" stroke="#e8bd79" stroke-width="3.5" stroke-linecap="round"/><path d="M${x-4} ${y-43}V${y-2}" stroke="#d59a5b" stroke-width="3" opacity=".8"/><ellipse cx="${x+1}" cy="${y-29}" rx="3" ry="5" fill="#71452a" opacity=".7"/></g>`).join('');return `<g class="fence-section ${section}" data-fence-section="${section}" pointer-events="none"><path d="${points.map(([x,y],i)=>`${i?'L':'M'}${x} ${y+4}`).join(' ')}" fill="none" stroke="#6f5836" stroke-width="20" stroke-linecap="round" opacity=".14"/>${rails}${posts}</g>`}
const ROAD_POINTS=[[-1320,1020],[-1050,1030],[-700,1025],[-300,1035],[120,1040],[360,1020],[445,990],[490,950],[532,890],[700,920],[910,940],[1120,930],[1390,900],[1650,918],[2010,890],[2350,870],[2680,890],[3100,905],[3600,875],[4050,870],[4400,890]];
function roadOffsetPoints(side,spacing=118){
 const out=[];
 for(let i=1;i<ROAD_POINTS.length;i++){
  const a=ROAD_POINTS[i-1],b=ROAD_POINTS[i],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy)||1,nx=-dy/len*side*70,ny=dx/len*side*70,steps=Math.max(1,Math.ceil(len/spacing));
  for(let j=0;j<steps;j++){const t=j/steps;out.push([a[0]+dx*t+nx,a[1]+dy*t+ny])}
 }
 const a=ROAD_POINTS[ROAD_POINTS.length-2],b=ROAD_POINTS[ROAD_POINTS.length-1],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy)||1;
 out.push([b[0]-dy/len*side*70,b[1]+dx/len*side*70]);return out;
}
function roadFenceMarkup(side){
 const pts=roadOffsetPoints(side),isGate=p=>side<0&&p[0]>1135&&p[0]<1260;
 const segments=[];let current=[];
 for(const p of pts){if(isGate(p)){if(current.length>1)segments.push(current);current=[]}else current.push(p)}
 if(current.length>1)segments.push(current);
 const paths=segments.map(seg=>'M'+seg.map(p=>p.map(v=>v.toFixed(1)).join(' ')).join('L')).join(' ');
 const posts=pts.filter(p=>!isGate(p)).map(([x,y])=>'<path d="M'+x.toFixed(1)+' '+(y-17).toFixed(1)+'v34" stroke="#624a32" stroke-width="5" stroke-linecap="round"/><path d="M'+(x-1).toFixed(1)+' '+(y-15).toFixed(1)+'v30" stroke="#b18a5c" stroke-width="2" opacity=".75"/>').join('');
 return '<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="'+paths+'" stroke="#514c43" stroke-width="3.2" opacity=".95"/><path d="'+paths+'" stroke="#c5b69a" stroke-width="1" stroke-dasharray="2 10" opacity=".85"/></g><g>'+posts+'</g>';
}
function brickWalkwayMarkup(){
 const road='M'+ROAD_POINTS.map(p=>p.join(' ')).join('L');
 const layers=(w,c,o=1)=>'<path d="'+road+'" fill="none" stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round" opacity="'+o+'"/>';
 const gate='<g transform="translate(1195 850) rotate(-5)"><path d="M-59 -24V24M59 -24V24" stroke="#52371f" stroke-width="13" stroke-linecap="round"/><path d="M-59 -22V22M59 -22V22" stroke="#b77c45" stroke-width="8"/><path d="M-55 -15H55M-55 12H55" stroke="#704a2d" stroke-width="9" stroke-linecap="round"/><path d="M-49 -15L49 12" stroke="#e2b777" stroke-width="3.5" stroke-linecap="round"/><circle cx="-59" cy="-20" r="4" fill="#e4c18b"/><circle cx="59" cy="-20" r="4" fill="#e4c18b"/></g>';
 return '<g id="farm-road-network" pointer-events="none">'+layers(94,'#77512e',.10)+layers(82,'#9b7448',.28)+layers(72,'#9b7448')+layers(62,'url(#farmRoad)')+'<path d="'+road+'" fill="none" stroke="#f3e0b5" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="2 23" opacity=".30"/>'+roadFenceMarkup(-1)+roadFenceMarkup(1)+gate+'</g>';
}
function scheduleAnimalBlinking(){
 document.querySelectorAll('.animal-wrap').forEach(node=>{
  if(node.dataset.blinkScheduled==='1')return;
  node.dataset.blinkScheduled='1';
  const schedule=()=>setTimeout(()=>{
   if(!node.isConnected)return;
   node.classList.add('blinking');
   setTimeout(()=>node.classList.remove('blinking'),135+Math.random()*45);
   if(Math.random()<.16)setTimeout(()=>{if(node.isConnected){node.classList.add('blinking');setTimeout(()=>node.classList.remove('blinking'),115)}},260);
   schedule();
  },2300+Math.random()*5700);
  schedule();
 });
}
function initScene(){
const ground=`<defs>
<pattern id="grass" width="256" height="256" patternUnits="userSpaceOnUse"><image href="/assets/grama-textura.png" width="256" height="256"/></pattern>
<linearGradient id="gardenGreen" x1="0" y1="0" x2=".85" y2="1"><stop stop-color="#abdf69"/><stop offset=".32" stop-color="#5eb42f"/><stop offset=".75" stop-color="#368e23"/><stop offset="1" stop-color="#256b20"/></linearGradient>
<linearGradient id="soil" x1="0" y1="0" x2=".5" y2="1"><stop stop-color="#945b36"/><stop offset=".55" stop-color="#6d452b"/><stop offset="1" stop-color="#462b1a"/></linearGradient>
<linearGradient id="farmRoad" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ead7a7"/><stop offset=".46" stop-color="#c9a574"/><stop offset="1" stop-color="#a77d4d"/></linearGradient>
<pattern id="brickPattern" patternUnits="userSpaceOnUse" width="32" height="18"><rect width="32" height="18" fill="#b66b48"/><path d="M0 0H32M0 9H32M16 0V9M0 9V18M32 9V18" fill="none" stroke="#81442f" stroke-width="1.5"/><path d="M2 2H14M18 11H30" stroke="#e5a17b" stroke-width="1.4" opacity=".7"/></pattern>
<radialGradient id="blossom"><stop stop-color="#ffe7b4"/><stop offset="1" stop-color="#ee7cc4"/></radialGradient>
<radialGradient id="animalShadow"><stop stop-color="#18390e" stop-opacity=".32"/><stop offset="1" stop-color="#18390e" stop-opacity="0"/></radialGradient>
<filter id="shadow"><feGaussianBlur stdDeviation="5"/></filter>
</defs>
<!-- Cenário-base da Fazenda: arte panorâmica externa, sem interação. -->
<g id="farm-landscape" pointer-events="none">
 <image href="https://raw.githubusercontent.com/sombraretro/colheita-feliz-2-web/3ce64423590ea3ea6b630b9cf96d351a21ddb75a/Cenario/Area%20da%20Fazenda.jpg" x="-2100" y="-250" width="4200" height="2362" preserveAspectRatio="none" pointer-events="none"/>
</g>
<!-- Cenário panorâmico do Rio: a borda direita recebe uma mesclagem gradual com a Fazenda. -->
<g id="river-landscape" pointer-events="none">
 <defs>
  <linearGradient id="river-farm-seam-gradient" gradientUnits="userSpaceOnUse" x1="-1450" y1="0" x2="250" y2="0">
   <stop offset="0" stop-color="white" stop-opacity="1"/>
   <stop offset=".28" stop-color="white" stop-opacity=".96"/>
   <stop offset=".62" stop-color="white" stop-opacity=".62"/>
   <stop offset="1" stop-color="white" stop-opacity="0"/>
  </linearGradient>
  <mask id="river-farm-seam-mask" maskUnits="userSpaceOnUse" x="-3950" y="-250" width="4200" height="2362">
   <rect x="-3950" y="-250" width="4200" height="2362" fill="url(#river-farm-seam-gradient)"/>
  </mask>
 </defs>
 <image href="https://raw.githubusercontent.com/sombraretro/colheita-feliz-2-web/main/Cenario/Area%20do%20Rio.jpg" x="-3950" y="-250" width="4200" height="2362" preserveAspectRatio="none" pointer-events="none" mask="url(#river-farm-seam-mask)"/>
 <!-- Reflexos animados da correnteza: traços mais visíveis, restritos à superfície do rio. -->
 <g id="river-water-motion" class="river-water-motion" pointer-events="none" transform="translate(-3950 -250) scale(2.5485 2.502)">
  <g fill="none" stroke-linecap="round">
   <g class="river-current-flow river-current-flow-a" stroke="#d7f5ff" stroke-width="2.5" opacity=".52">
    <path d="M584 292Q611 286 638 296" stroke-dasharray="24 22"/>
    <path d="M555 337Q580 328 610 338" stroke-dasharray="28 25"/>
    <path d="M508 382Q540 370 570 378" stroke-dasharray="30 25"/>
    <path d="M455 435Q492 420 530 427" stroke-dasharray="29 24"/>
    <path d="M424 483Q470 466 520 474" stroke-dasharray="34 28"/>
    <path d="M452 528Q500 512 552 519" stroke-dasharray="30 25"/>
    <path d="M500 574Q548 557 600 565" stroke-dasharray="33 27"/>
    <path d="M560 620Q610 604 662 612" stroke-dasharray="32 26"/>
    <path d="M625 667Q678 650 728 659" stroke-dasharray="31 25"/>
    <path d="M694 712Q746 695 798 704" stroke-dasharray="30 24"/>
    <path d="M765 757Q817 740 870 748" stroke-dasharray="27 23"/>
    <path d="M835 797Q882 782 930 789" stroke-dasharray="25 21"/>
   </g>
   <g class="river-current-flow river-current-flow-b" stroke="#075fae" stroke-width="2.8" opacity=".34">
    <path d="M596 314Q619 307 642 315" stroke-dasharray="18 31"/>
    <path d="M530 397Q559 386 586 394" stroke-dasharray="21 32"/>
    <path d="M440 458Q477 444 510 451" stroke-dasharray="20 33"/>
    <path d="M474 548Q514 535 555 541" stroke-dasharray="22 34"/>
    <path d="M580 638Q620 625 662 632" stroke-dasharray="20 32"/>
    <path d="M704 730Q746 716 785 723" stroke-dasharray="20 32"/>
    <path d="M810 780Q850 767 890 774" stroke-dasharray="18 30"/>
   </g>
  </g>
 </g>
</g>
<!-- Cenário panorâmico do Pomar e Mata: continuação texturizada da Fazenda. -->
<g id="nature-landscape" pointer-events="none">
 <defs>
  <linearGradient id="nature-farm-seam-gradient" gradientUnits="userSpaceOnUse" x1="1300" y1="0" x2="2200" y2="0"><stop offset="0" stop-color="white" stop-opacity="0"/><stop offset=".22" stop-color="white" stop-opacity=".12"/><stop offset=".48" stop-color="white" stop-opacity=".42"/><stop offset=".76" stop-color="white" stop-opacity=".82"/><stop offset="1" stop-color="white" stop-opacity="1"/></linearGradient><mask id="nature-farm-seam-mask" maskUnits="userSpaceOnUse" x="1245" y="-250" width="4955" height="2475"><rect x="1300" y="-250" width="4900" height="2475" fill="url(#nature-farm-seam-gradient)"/><rect x="1245" y="175" width="550" height="630" fill="black"/></mask>
 </defs>
 <image href="https://raw.githubusercontent.com/sombraretro/colheita-feliz-2-web/main/Cenario/Area%20do%20Pomar%20e%20Mata.jpg" x="1300" y="-250" width="4900" height="2475" preserveAspectRatio="none" pointer-events="none" mask="url(#nature-farm-seam-mask)"/>
<!-- Estrada própria do Pomar e Mata, prolongada até a extremidade direita do cenário. -->
<g id="nature-road-network" pointer-events="none">
<path d="M4400 890L4750 900L5100 890L5450 900L5800 890L6200 900" fill="none" stroke="#77512e" stroke-width="94" stroke-linecap="round" stroke-linejoin="round" opacity=".10"/>
<path d="M4400 890L4750 900L5100 890L5450 900L5800 890L6200 900" fill="none" stroke="#9b7448" stroke-width="82" stroke-linecap="round" stroke-linejoin="round" opacity=".28"/>
<path d="M4400 890L4750 900L5100 890L5450 900L5800 890L6200 900" fill="none" stroke="#9b7448" stroke-width="72" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4400 890L4750 900L5100 890L5450 900L5800 890L6200 900" fill="none" stroke="url(#farmRoad)" stroke-width="62" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4400 890L4750 900L5100 890L5450 900L5800 890L6200 900" fill="none" stroke="#f3e0b5" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="2 23" opacity=".30"/>
${fencePath([[4400,820],[4750,830],[5100,820],[5450,830],[5800,820],[6200,830]],"nature-road-north")}
${fencePath([[4400,960],[4750,970],[5100,960],[5450,970],[5800,960],[6200,970]],"nature-road-south")}
</g>
</g>
<!-- Piso de terra batida do curral, limitado ao interior das cercas. -->
<g id="curral-dirt-floor" pointer-events="none">
 <path d="M1268 200H1772V772H1268Z" fill="#9a754f"/>
 <path d="M1272 204H1768V768H1272Z" fill="#a7835d" opacity=".48"/>
 <path d="M1280 300Q1370 270 1450 300T1610 294T1760 315L1760 390Q1660 365 1570 390T1390 385T1280 405Z" fill="#806044" opacity=".18"/>
 <path d="M1280 575Q1380 545 1470 570T1635 565T1760 580V690Q1650 665 1550 692T1370 680T1280 700Z" fill="#77563b" opacity=".16"/>
 <g fill="#6f5239" opacity=".28"><ellipse cx="1350" cy="335" rx="24" ry="7"/><ellipse cx="1585" cy="265" rx="18" ry="5"/><ellipse cx="1695" cy="470" rx="28" ry="7"/><ellipse cx="1420" cy="610" rx="22" ry="6"/><ellipse cx="1640" cy="725" rx="26" ry="7"/></g>
 <g fill="#d1b18a" opacity=".34"><circle cx="1310" cy="470" r="3"/><circle cx="1480" cy="430" r="2.5"/><circle cx="1540" cy="650" r="3"/><circle cx="1725" cy="625" r="2.5"/><circle cx="1660" cy="355" r="2"/></g>
 <path d="M1290 520Q1370 510 1435 520M1510 500Q1585 490 1660 500M1330 735Q1410 725 1485 735" fill="none" stroke="#c2a17a" stroke-width="2" opacity=".22" stroke-linecap="round"/>
</g>
`;
$('ground-layer').innerHTML=ground+brickWalkwayMarkup();/* A cena do Mar é montada na troca de cena, após o SVG base existir. */
updateSceneLandscapeVisibility();
let scenery='';
// Vegetação em áreas livres: sem invadir a plantação, construções, curral ou estrada.
const fieldOutline=[[532,350],[1132,620],[532,890],[-68,620]],expansionOutline=[[-1400,350],[-800,620],[-1400,890],[-2000,620]];
function insidePoly(x,y,poly){let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if(((a[1]>y)!==(b[1]>y))&&(x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]))c=!c}return c}
const roadLines=[ROAD_POINTS];
function nearRoad(x,y){for(const line of roadLines)for(let i=1;i<line.length;i++){const [ax,ay]=line[i-1],[bx,by]=line[i],dx=bx-ax,dy=by-ay,t=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy))),px=ax+t*dx,py=ay+t*dy;if(Math.hypot(x-px,y-py)<112)return true}return false}
function blocked(x,y){
 if(x>1250&&x<1790&&y>190&&y<790)return true;
 if(insidePoly(x,y,fieldOutline)||insidePoly(x,y,expansionOutline))return true;
 if(x>755&&x<1240&&y>20&&y<485)return true;
 if(x>680&&x<1150&&y>880&&y<1200)return true;
 if(x>-700&&x<-200&&y>665&&y<1080)return true;
 if(x>680&&x<1150&&y>880&&y<1200)return true;
 if(x>350&&x<535&&y>125&&y<290)return true;
 if(x>510&&x<730&&y>125&&y<300)return true;
 if(x>1240&&x<1800&&y>150&&y<785)return true;
 if(x>350&&x<535&&y>125&&y<290)return true;
 if(x>1810&&x<1990&&y>120&&y<330)return true;
 if(nearRoad(x,y))return true;
 if(x>2350&&x<3665&&y>-110&&y<590)return true;
  if(x>3700&&x<5350&&y>180&&y<680)return true;
 if(x>=-6300&&x<=-2100)return true;
 if(x>-660&&x<-100&&y>165&&y<500)return true;
 for(const [tx,ty,tw,th] of treePlacements)if(x>tx-35&&x<tx+tw+35&&y>ty-35&&y<ty+th+30)return true;
 return false;
}
const treePlacements=[
 [3870,165,255,270,'hue-rotate(-22deg) saturate(1.15)'],[4270,185,225,250,'hue-rotate(18deg)']
];
for(const [x,y,w,h,filter] of treePlacements)scenery+=svgImage('arvore',x,y,w,h,`style="filter:none"`);
for(let i=0;i<330;i++){
 const x=seedNoise(i*17+3)*6800-2600,y=seedNoise(i*31+8)*1160-140;
 // Vegetação decorativa somente no terreno; não desenhar tufos ou flores no céu.
 if(y<235||blocked(x,y))continue;
 if(x>=-1450&&x<=1800){if(i<230)scenery+=grassClump(x,y,.5+seedNoise(i)*.8)}
 else scenery+=i%6===0?flower(x,y,.4+seedNoise(i*13)*.5,['#fff5df','#f79cc4','#e4a3ef','#fff7ae'][i%4]):grassClump(x,y,.5+seedNoise(i)*.8);
}
const groundFlowerSpots=[
 [-1400,400,.75,'#fff2d2'],[-1380,470,.58,'#e9a9d1'],[-1370,540,.68,'#fff3bd'],

 [1660,570,.65,'#fff1cf'],[1740,610,.78,'#efa4ca'],[1690,690,.58,'#fff1cf']
];
for(const [x,y,s,color] of groundFlowerSpots)if(!blocked(x,y))scenery+=flower(x,y,s,color);
const groundStoneSpots=[
 [-1410,580,1],[-1390,650,.78],[-1045,250,.7],
 [-205,250,.72],[1580,650,.8],[1765,540,.7]
];
for(const [x,y,s] of groundStoneSpots)if(!blocked(x,y))scenery+=`<g pointer-events="none" opacity=".9" transform="translate(${x} ${y}) scale(${s})"><ellipse cx="2" cy="5" rx="15" ry="5" fill="#315a2a" opacity=".22"/><path d="M-13 1Q-12-8-3-10Q5-15 13-7Q18 0 10 5Q-2 10-13 1Z" fill="#b8b4a2" stroke="#8c897b" stroke-width="1.7"/><path d="M-6-5Q0-11 7-6" fill="none" stroke="#e2dfd0" stroke-width="2" stroke-linecap="round" opacity=".8"/></g>`;
for(let i=0;i<95;i++){
 const x=seedNoise(i*5+17)*6800-2600,y=seedNoise(i*9+71)*1160-140;
 if(y<235||blocked(x,y))continue;
 scenery+=`<circle cx="${x}" cy="${y}" r="${1+seedNoise(i*10)*2}" fill="#d3e571" opacity=".5"/>`;
}
// Bases orgânicas alinhadas ao ponto real de contato de cada construção.
// As manchas ficam no cenário, atrás dos prédios, e não alteram suas dimensões ou hitboxes.
scenery+=`<g pointer-events="none">
 <!-- Celeiro: base acompanha a parede frontal e a lateral com feno. -->
 <ellipse cx="-438" cy="354" rx="222" ry="18" fill="#294d20" opacity=".24"/>
 <path d="M-675 354Q-632 341-575 347T-470 344T-360 348T-215 356L-230 373Q-330 380-430 372T-575 375T-665 369Z" fill="#4d922d" opacity=".66"/>
 <path d="M-628 351Q-590 343-552 349T-475 346T-398 350T-320 352" fill="none" stroke="#76ad42" stroke-width="7" stroke-linecap="round" opacity=".55"/>
 <!-- Casa: acompanha a projeção da fachada, sem avançar sobre as paredes. -->
 <ellipse cx="1000" cy="390" rx="226" ry="17" fill="#294d20" opacity=".25"/>
 <path d="M770 391Q818 380 873 385T979 382T1085 386T1225 392L1212 410Q1120 416 1030 409T900 410T780 407Z" fill="#4f982e" opacity=".7"/>
 <path d="M806 390Q856 382 901 389T997 386T1096 390T1184 394" fill="none" stroke="#7db64a" stroke-width="7" stroke-linecap="round" opacity=".52"/>
 <!-- Viveiro: base ampla e baixa, alinhada aos quatro apoios da estrutura. -->
 <ellipse cx="25" cy="419" rx="220" ry="17" fill="#294d20" opacity=".25"/>
 <path d="M-205 420Q-157 408-105 414T-5 411T95 415T255 422L242 439Q145 445 57 438T-80 440T-195 435Z" fill="#4d942d" opacity=".68"/>
 <path d="M-166 418Q-120 411-77 417T12 414T103 418T207 423" fill="none" stroke="#79b348" stroke-width="7" stroke-linecap="round" opacity=".52"/>
 <!-- Base já existente do elemento decorativo à direita. -->
 <path d="M1815 615Q1870 606 1945 616L1935 640Q1870 645 1820 636Z" fill="#4d982d" opacity=".72"/>
</g>`;
for(const [gx,gy,gs] of [
 [-650,363,.72],[-600,370,.55],[-520,373,.68],[-430,374,.62],[-330,370,.72],[-245,365,.55],
 [785,402,.58],[830,407,.72],[900,409,.62],[1090,409,.68],[1170,404,.58],[1210,399,.5],
 [-180,431,.55],[-120,437,.65],[-45,440,.58],[65,439,.62],[145,434,.58],[220,430,.5],
 [1760,630,.55],[1935,632,.6]
])scenery+=grassClump(gx,gy,gs);
scenery+=`<g pointer-events="none">${svgImage('casa',780,35,440,430)}</g>`;
scenery+=`<g id="barn-building" pointer-events="none">${svgImage('celeiro',-650,55,430,350)}</g>`;
scenery+=`<g id="aviary-building" pointer-events="none" transform="translate(-180 15)">
 <ellipse cx="205" cy="405" rx="220" ry="22" fill="#244d1b" opacity=".22"/>
 <path d="M12 55L205 0L398 55V390H12Z" fill="#9bdcf0" fill-opacity=".12" stroke="#76563a" stroke-width="10"/>
 <path d="M0 58L205 -12L410 58" fill="none" stroke="#9b603e" stroke-width="15" stroke-linejoin="round"/>
 <path d="M25 68V382M385 68V382M12 145H398M12 270H398M12 390H398" fill="none" stroke="#76563a" stroke-width="8"/>
 <path d="M45 72V382M105 72V382M165 72V382M225 72V382M285 72V382M345 72V382" stroke="#d8c49f" stroke-width="3.5" opacity=".95"/>
 <path d="M12 205H398M12 330H398" stroke="#d8c49f" stroke-width="3" stroke-dasharray="6 5"/>
 <path d="M68 208H342M68 333H342" stroke="#704a2b" stroke-width="13" stroke-linecap="round"/>
 <path d="M68 201H342M68 326H342" stroke="#c28a50" stroke-width="6" stroke-linecap="round"/>
 <path d="M180 390V280Q205 250 230 280V390" fill="#704a2b" stroke="#563720" stroke-width="6"/>
 <path d="M12 390H398" stroke="#e6d5b6" stroke-width="8"/>
 </g>`;
scenery+=svgImage('casinha-cachorro',370,145,145,140);
scenery+=fencePath([[1260,200],[1780,200]],'rear')+fencePath([[1260,200],[1260,780]],'side')+fencePath([[1780,200],[1780,780]],'side');

$('scenery-layer').innerHTML=scenery;
$('animal-layer').innerHTML='';
let front='';
front+=fencePath([[1260,780],[1430,780]],'front');
front+=fencePath([[1560,780],[1780,780]],'front');
front+=`<g transform="translate(1430 780)"><path d="M0 -58V10M130 -58V10" stroke="#57391f" stroke-width="17" stroke-linecap="round"/><path d="M0 -58V8M130 -58V8" stroke="#a66b3b" stroke-width="11" stroke-linecap="round"/><path d="M0 -49L130 -49M0 -17L130 -17" stroke="#68452c" stroke-width="13" stroke-linecap="round"/><path d="M4 -51L126 -51M4 -19L126 -19" stroke="#d49a5c" stroke-width="7" stroke-linecap="round"/><path d="M9 -53L121 -21" stroke="#f0c47d" stroke-width="3.5" stroke-linecap="round"/><path d="M-18 -2H148" stroke="#8a6039" stroke-width="7" stroke-linecap="round" opacity=".85"/><path d="M-18 -5H148" stroke="#d9b27a" stroke-width="2.5" stroke-linecap="round"/><circle cx="14" cy="-35" r="4" fill="#5c3a21"/><circle cx="116" cy="-35" r="4" fill="#5c3a21"/></g>`;
front+=`<g data-farm-sign="true" tabindex="0" role="button" aria-label="Abrir e editar o nome da fazenda" style="cursor:pointer" transform="translate(900 770)"><ellipse cx="105" cy="91" rx="105" ry="13" fill="#294d22" opacity=".28"/><path d="M42 20V91M168 20V91" stroke="#52371f" stroke-width="13" stroke-linecap="round"/><path d="M42 20V89M168 20V89" stroke="#b77c45" stroke-width="8" stroke-linecap="round"/><path d="M-4 -42H214V37H-4Z" fill="#704728" stroke="#49301e" stroke-width="7" stroke-linejoin="round"/><path d="M5 -34H205V29H5Z" fill="#e4bd78" stroke="#bd8c4b" stroke-width="4"/><path d="M13 -27H197V22H13Z" fill="#f3dfb5" stroke="#8b5c32" stroke-width="2"/><text id="farm-sign-label" x="105" y="4" text-anchor="middle" font-size="18" font-weight="900" textLength="176" lengthAdjust="spacingAndGlyphs" fill="#60401f">Minha fazenda</text><path d="M-4 -42L105 -60L214 -42" fill="#9b6738" stroke="#49301e" stroke-width="6" stroke-linejoin="round"/><path d="M105 -54L105 -43" stroke="#e9c987" stroke-width="3"/></g>`;;

for(let i=0;i<38;i++){
 const x=i<19?-320+seedNoise(i*7)*250:1740+seedNoise(i*19)*240,y=i<19?520+seedNoise(i*27)*400:420+seedNoise(i*12)*250;
 if(blocked(x,y))continue;
 front+=flower(x,y,.42+seedNoise(i+3)*.42,i%2?'#fff0c2':'#f4a0d7');
}
$('foreground-layer').innerHTML=front;
}
// Projeção isométrica clássica: duas direções diagonais equilibradas,
// sem girar a grade inteira (o que deformava a perspectiva em 0.5.1).
function blinkMarkup(animal){
 const lids={
  cachorro:`<ellipse cx="1090" cy="315" rx="43" ry="59" fill="#272629"/><ellipse cx="1186" cy="285" rx="35" ry="52" fill="#272629"/><path d="M1050 315Q1090 354 1130 315M1153 285Q1186 319 1219 285" fill="none" stroke="#101012" stroke-width="17" stroke-linecap="round"/>`,
  burro:`<ellipse cx="1000" cy="400" rx="43" ry="59" fill="#f5e9d9"/><ellipse cx="1108" cy="360" rx="37" ry="54" fill="#f5e9d9"/><path d="M960 400Q1000 437 1040 400M1073 360Q1108 394 1143 360" fill="none" stroke="#78321c" stroke-width="16" stroke-linecap="round"/>`,
  ovelha:`<ellipse cx="260" cy="535" rx="25" ry="28" fill="#f2b6a5"/><ellipse cx="425" cy="550" rx="25" ry="28" fill="#f2b6a5"/><path d="M235 535Q260 557 285 535M400 550Q425 572 450 550" fill="none" stroke="#8b5147" stroke-width="9" stroke-linecap="round"/>`,
  vaca:`<ellipse cx="245" cy="350" rx="34" ry="52" fill="#f7f4ed"/><ellipse cx="395" cy="355" rx="35" ry="52" fill="#29292b"/><path d="M213 350Q245 389 277 350M362 355Q395 394 428 355" fill="none" stroke="#171719" stroke-width="14" stroke-linecap="round"/>`,
  galinha:`<ellipse cx="955" cy="365" rx="32" ry="45" fill="#f6f1e7"/><path d="M925 365Q955 395 985 365" fill="none" stroke="#302722" stroke-width="13" stroke-linecap="round"/>`,
  porco:`<ellipse cx="1015" cy="500" rx="30" ry="46" fill="#f3a0a6"/><ellipse cx="1145" cy="470" rx="29" ry="43" fill="#f3a0a6"/><path d="M987 500Q1015 532 1043 500M1118 470Q1145 500 1172 470" fill="none" stroke="#7c3b42" stroke-width="12" stroke-linecap="round"/>`,
  pato:`<ellipse cx="1040" cy="344" rx="42" ry="50" fill="#f4d36c"/><path d="M995 344Q1040 380 1085 344" fill="none" stroke="#a8732c" stroke-width="15" stroke-linecap="round"/>`,
  pombo:`<ellipse cx="1060" cy="260" rx="45" ry="48" fill="#d9dedc"/><path d="M1015 260Q1060 300 1105 260" fill="none" stroke="#66747b" stroke-width="14" stroke-linecap="round"/>`,
  pavao:`<ellipse cx="1040" cy="245" rx="42" ry="45" fill="#16899b"/><path d="M998 245Q1040 283 1082 245" fill="none" stroke="#12445e" stroke-width="14"/>`,
  iaque:`<ellipse cx="965" cy="418" rx="40" ry="48" fill="#c8b29b"/><path d="M925 418Q965 455 1005 418" fill="none" stroke="#6f5845" stroke-width="15" stroke-linecap="round"/>`
 };
 return lids[animal]||'';
}
function renderAnimals(scheduleBlink=true){
 if(!state||!Array.isArray(state.animals))return;
 let markup='';
 const animals=[...state.animals].sort((a,b)=>isBirdType(a.type)&&isBirdType(b.type)?(a.aviarySlot??99)-(b.aviarySlot??99):(a.slot??99)-(b.slot??99));
 for(const a of animals){
  const cfg=ANIMALS[a.type];if(!cfg)continue;
  let x,y,w,h;
  if(a.type==='cachorro'){x=500;y=155;w=150;h=112.5;}
  else if(cfg.role==='horse'){
   const pos=HORSE_SLOTS[Number.isInteger(a.slot)?a.slot:0];if(!pos)continue;
   x=pos.x;y=pos.y;w=pos.w;h=pos.h;
  }else if(isBirdType(a.type)){
   const birdSlot=Math.max(0,Number.isInteger(a.aviarySlot)?a.aviarySlot:0),col=birdSlot%AVIARY_COLUMNS,row=Math.floor(birdSlot/AVIARY_COLUMNS);
   w=42;h=32;x=-125+col*57;y=(row%2===0?120:250);
  }else{
   const pos=ANIMAL_SLOTS[Number.isInteger(a.slot)?a.slot:0];if(!pos)continue;
   const factor=ANIMAL_SCALE[a.type]||.9,baseW=pos.w,baseH=pos.h;
   w=baseW*factor;h=baseH*factor;x=pos.x+(baseW-w)/2;y=pos.y+(baseH-h);
  }
  const feetRatio={cachorro:1,burro:1068/1086,ovelha:1,vaca:1,bufala:1,boi:1,cabra:1,coelho:.92,galinha:1050/1086,porco:1070/1086,pombo:.92,pato:.92,pavao:.92};
  const baseY=y+h*(feetRatio[a.type]||1)-3,shadowRx=Math.max(18,w*.31),scaleX=w/1448,scaleY=h/1086;
  const sheepEyes=a.type==='ovelha'?'<g class="sheep-open-eyes"><ellipse cx="260" cy="535" rx="12" ry="18" fill="#33201d"/><ellipse cx="425" cy="550" rx="12" ry="18" fill="#33201d"/><circle cx="257" cy="528" r="4.2" fill="#fff8e9"/><circle cx="422" cy="543" r="4.2" fill="#fff8e9"/></g>':'';
  const breed=a.type==='cachorro'?(DOG_BREEDS[a.breed]||DOG_BREEDS.classico):null;
  const assetName=breed?.asset||('animal-'+a.type);
  const assetExt=breed?(breed.ext||(breed.asset==='animal-cachorro'?'png':'svg')):(['pato','pombo','iaque'].includes(a.type)?'svg':'png');
  const assetUrl=cfg.role==='horse'?HORSE_ASSETS.horse:(a.type==='cachorro'&&breed?.image?breed.image:a.type==='pavao'?HORSE_ASSETS.peacock:a.type==='cabra'?HORSE_ASSETS.goat:null);
  const animalGraphic=['peru','boi','bufala','coelho'].includes(a.type)?'<text x="724" y="850" text-anchor="middle" font-size="760">'+cfg.icon+'</text>':'<image class="animal-sprite" href="'+(assetUrl||('/assets/'+assetName+'.'+assetExt))+'" x="0" y="0" width="1448" height="1086" preserveAspectRatio="none"/>';
  markup+='<g class="animal-wrap animal-'+a.type+'" data-animal="'+a.type+'" data-animal-id="'+safe(a.id)+'"'+(cfg.role==='horse'?' data-horse-breed="'+a.type+'"':'')+' data-world-x="'+x+'" data-world-y="'+y+'" data-world-w="'+w+'" data-world-h="'+h+'" data-world-ground-y="'+baseY+'"><rect class="animal-hitbox" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="transparent" pointer-events="all"/><ellipse class="animal-shadow" cx="'+(x+w*.5)+'" cy="'+(baseY+2)+'" rx="'+(shadowRx*1.22)+'" ry="'+Math.max(12,w*.085)+'" fill="#18380f" opacity=".42"/><ellipse class="animal-shadow-core" cx="'+(x+w*.5)+'" cy="'+(baseY+1)+'" rx="'+(shadowRx*.7)+'" ry="'+Math.max(6,w*.04)+'" fill="#102b0d" opacity=".32"/><g transform="translate('+x+' '+y+') scale('+scaleX+' '+scaleY+')">'+animalGraphic+sheepEyes+'<g class="blink-overlay">'+blinkMarkup(a.type)+'</g></g></g>';
 }
 $('animal-layer').innerHTML=markup;
 if(scheduleBlink)scheduleAnimalBlinking();
}

const FIELD_OFFSET_X=-100;
function farmPoint(x,y){return [x,y]}
function tilePoint(r,c){return [FIELD_OFFSET_X+32+c*100+r*100,620-c*45+r*45]}
function plotTilePoint(r,c,i){const [x,y]=tilePoint(r,c);return [x+(i>=EXPANSION_PLOT_START?EXPANSION_PLOT_OFFSET_X:0),y]}
function diamondPoints(r,c,i=0){const [x,y]=plotTilePoint(r,c,i);return [[x,y],[x+100,y-45],[x+200,y],[x+100,y+45]]}
function poly(points){return points.map(p=>p.join(',')).join(' ')}
function plotGeometry(p,r,c,i){
 const pts=diamondPoints(r,c,i),s=poly(pts),[x,y]=plotTilePoint(r,c,i),shade=i%3,selected=i===lastSelected||selectedPlotIndices.has(i),red=p.soil==='red',requiredLevel=i>=EXPANSION_PLOT_START?50+(i-EXPANSION_PLOT_START):0,levelLocked=requiredLevel>0&&farmLevel()<requiredLevel,purchaseLocked=i>=24&&i<EXPANSION_PLOT_START&&p.status==='grass';
 let tile=`<g class="plot-item" data-plot-index="${i}"><polygon points="${pts.map(([a,b])=>`${a+2},${b+8}`).join(' ')}" fill="${red?'#71372e':'#1c6a1a'}" opacity=".54"/><polygon points="${s}" fill="${p.status==='spent'?(red?'#714039':'#785030'):(red?'#a9473f':'#60b62e')}" stroke="${red?'#78382f':(p.status==='spent'?'#5f3c28':'#3a7622')}" stroke-width="2.5"/>`;
 if(p.status==='spent'){
  for(let k=0;k<13;k++){const a=seedNoise(i*100+k*3)*125,b=seedNoise(i*9+k*21)*25;tile+=`<ellipse cx="${x+31+a}" cy="${y+6+b}" rx="${3+seedNoise(k+12)*8}" ry="2.3" fill="#a9764e" opacity=".5"/>`}
 }else{
  tile+=`<path d="M${x+12} ${y-2}Q${x+53} ${y-39} ${x+100} ${y-36}Q${x+153} ${y-24} ${x+188} ${y-2}Q${x+145} ${y-8} ${x+100} ${y+12}Q${x+55} ${y+22} ${x+12} ${y-2}Z" fill="${red?'#cf7665':'#c7ed9b'}" opacity="${red?'.88':'.83'}"/>`;
  tile+=`<path d="M${x+12} ${y+21}Q${x+58} ${y+4} ${x+100} ${y+37}Q${x+145} ${y+20} ${x+188} ${y+21}" fill="none" stroke="#2e8020" stroke-width="11" opacity=".35"/>`;
  for(let k=0;k<11;k++){
   let xx=x+24+seedNoise(i*14+k*3)*150,yy=y-12+seedNoise(i*27+k*5)*24;
   tile+=`<path d="M${xx} ${yy}l${-8+seedNoise(k)*5} -5m8 5l${4+seedNoise(k*3)*7} -4" stroke="${shade===0?'#f4f9c2':'#ebf8ad'}" stroke-width="2" opacity=".53" fill="none"/>`;
  }
 }
 if(red)tile+=`<g pointer-events="none"><circle cx="${x+174}" cy="${y-14}" r="10" fill="#8f302d" stroke="#f2c0a9" stroke-width="2"/><path d="M${x+170} ${y-14}q4-8 9-2q-1 7-9 2Z" fill="#f6d6b4"/></g>`;if(levelLocked||purchaseLocked)tile+=`<g pointer-events="none"><rect x="${x+87}" y="${y-7}" width="26" height="22" rx="4" fill="#59462e" stroke="#f2d58e" stroke-width="2"/><path d="M${x+93} ${y-7}v-8a7 7 0 0 1 14 0v8" fill="none" stroke="#f2d58e" stroke-width="4" stroke-linecap="round"/>${levelLocked?`<text x="${x+100}" y="${y+32}" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff5d4" stroke="#59462e" stroke-width="3" paint-order="stroke">NV. ${requiredLevel}</text>`:''}</g>`;if(selected)tile+=`<polygon class="plot-selection" points="${s}"/>`;
 tile+=`<polygon class="plot-hit" points="${s}" data-i="${i}" data-row="${r}" data-col="${c}" tabindex="0" role="button" aria-label="Terreno ${i+1}${levelLocked?' bloqueado até o nível '+requiredLevel:''}"/><title>Terreno ${i+1}${levelLocked?' · bloqueado até o nível '+requiredLevel:''}</title></g>`;
 let crop='';
 if(p.status==='growing'){
  const progress=Math.min(1,Math.max(0,(Date.now()-p.plantedAt)/(cropHours(p.crop,p.regrowing)*HOUR))),scale=.38+progress*.7;
  const [plantX,plantY]=farmPoint(x+100,y+5),[weedX,weedY]=farmPoint(x+140,y+25),[pestX,pestY]=farmPoint(x+77,y+5),[waterX,waterY]=farmPoint(x+153,y-8);
  const growthPhase=progress>=1?5:Math.min(4,Math.floor(progress*5)+1),phaseImage=cropPhaseImageMarkup(p.crop,growthPhase);
  crop+=`<g class="crop-object" data-crop-plot="${i}"><ellipse cx="${plantX}" cy="${plantY+10}" rx="27" ry="9" fill="${red?'#71382f':'#553520'}" opacity=".78"/><g transform="translate(${plantX} ${plantY}) scale(${scale})"><g class="sway" style="animation-delay:${i*.17}s">${phaseImage||cropArt(p.crop,progress)}</g></g>`;
  if(p.weed)crop+=`<g transform="translate(${weedX} ${weedY})"><path d="M0 0l-4-26m4 26l15-22m-15 22l-18-15" stroke="#1b7d2a" stroke-width="5" fill="none"/><path d="M-4-20q-17-6-8-15q12 0 8 15m4 7q12-20 23-15q0 19-23 15" fill="#1f9e24"/></g>`;
  if(p.pest)crop+=`<g transform="translate(${pestX} ${pestY})"><ellipse rx="10" ry="7" fill="#c34225"/><circle cx="-4" cy="-1" r="2.3" fill="#242424"/><circle cx="3" cy="-3" r="2.3" fill="#242424"/><path d="M-9-4l-9-8m10 14l-10 9m23-15l9-7m-8 14l9 9" stroke="#472c1e" stroke-width="2"/></g>`;
  if(p.wateredAt&&Date.now()-p.wateredAt>6*CROP_TIME_FACTOR*HOUR&&progress<1)crop+=`<text x="${waterX}" y="${waterY}" font-size="22">💧</text>`;
  crop+='</g>';
 }
 return {tile,crop};
}
function flowerBloomMarkup(type,x,y,size,color){
 let petals='';
 if(type==='crisantemo'){
  for(let i=0;i<16;i++){const a=i*Math.PI*2/16,px=x+Math.cos(a)*size*.58,py=y+Math.sin(a)*size*.58;petals+=`<ellipse cx="${px}" cy="${py}" rx="${size*.19}" ry="${size*.43}" fill="${color}" stroke="#9a6a32" stroke-opacity=".18" stroke-width="1" transform="rotate(${i*22.5} ${px} ${py})"/>`}
 }else if(type==='peonia'){
  for(let i=0;i<10;i++){const a=i*Math.PI*2/10,px=x+Math.cos(a)*size*.38,py=y+Math.sin(a)*size*.38;petals+=`<ellipse cx="${px}" cy="${py}" rx="${size*.34}" ry="${size*.47}" fill="${color}" stroke="#a94e77" stroke-opacity=".3" stroke-width="1.5" transform="rotate(${i*36} ${px} ${py})"/>`}
 }else if(type==='cravo'){
  for(let i=0;i<12;i++){const a=i*Math.PI*2/12,px=x+Math.cos(a)*size*.43,py=y+Math.sin(a)*size*.43;petals+=`<path d="M${x} ${y}Q${px-size*.15} ${py-size*.2} ${px} ${py-size*.2}Q${px+size*.18} ${py-size*.08} ${px} ${py+size*.22}Q${px-size*.12} ${py+size*.08} ${x} ${y}Z" fill="${color}" stroke="#9e3148" stroke-opacity=".25" stroke-width="1" transform="rotate(${i*30} ${x} ${y})"/>`}
 }else{
  petals=`<path d="M${x} ${y+size*.5}C${x-size*.85} ${y+size*.05} ${x-size*.55} ${y-size*.8} ${x} ${y-size*.48}C${x+size*.65} ${y-size*.85} ${x+size*.9} ${y+size*.05} ${x} ${y+size*.5}Z" fill="${color}" stroke="#8f1c34" stroke-width="2"/><path d="M${x} ${y+size*.3}C${x-size*.5} ${y} ${x-size*.3} ${y-size*.48} ${x} ${y-size*.25}C${x+size*.45} ${y-size*.5} ${x+size*.55} ${y} ${x} ${y+size*.3}Z" fill="#e95a6b" stroke="#9c1d39" stroke-width="1.5"/>`;
 }
 return `<g>${petals}<circle cx="${x}" cy="${y}" r="${size*.17}" fill="${type==='rosa_vermelha'?'#7b172a':'#f6d66b'}" stroke="#9b6b32" stroke-width="1"/></g>`;
}
function advancedFruitArt(type,color){
 const circle=(x,y,r,fill=color)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="#8b4b2e" stroke-width="2"/>`;
 switch(type){
  case 'cominho': return `<g><path d="M-25 12Q-34-20-20-54M0 12Q-2-24 5-64M24 12Q30-18 25-49" stroke="#4d8b35" stroke-width="6" fill="none"/><g fill="#b8a64d" stroke="#81742f" stroke-width="2">${[-20,5,25].map((x)=>`<ellipse cx="${x}" cy="-56" rx="9" ry="16"/>`).join('')}</g><path d="M-34 -36q-20-17-24-3m59-20q18-18 28-4m-5 17q18-10 26 2" stroke="#66a846" stroke-width="5" fill="none"/></g>`;
  case 'bromelia': return `<g><path d="M0 12Q-52-12-49-49Q-11-43 0 12Q-13-52 12-76Q38-36 0 12Q17-39 53-42Q52-4 0 12Z" fill="#398f42" stroke="#276b34" stroke-width="3"/><path d="M0 -23Q-30-42-22-64Q-4-65 0-23Q5-66 26-61Q28-39 0-23Q20-40 39-27Q28-8 0-23Z" fill="#e85d71" stroke="#a63a55" stroke-width="3"/><circle cy="-35" r="8" fill="#ffd06a"/></g>`;
  case 'alpinia': return `<g><path d="M0 14Q-55-18-45-70Q-5-52 0 14Q-10-65 18-86Q40-44 0 14Q24-46 57-47Q53-8 0 14Z" fill="#398f42" stroke="#276b34" stroke-width="3"/><path d="M-7 -25Q-36-43-28-61Q-9-64-7-25Q7-66 27-54Q27-33-7-25Q20-42 39-27Q26-9-7-25Z" fill="#ee8bb2" stroke="#a94d7c" stroke-width="3"/><circle cx="-5" cy="-33" r="7" fill="#ffe2a1"/></g>`;
  case 'morango': return `<g>${[-20,4,25].map((x,i)=>`<path d="M${x-12} -24Q${x-15} -42 ${x} -44Q${x+15} -42 ${x+12} -24L${x} 7Z" fill="#e9424d" stroke="#9d2634" stroke-width="2"/><path d="M${x-11} -27l-8 -10m19 10l8 -10m-19 3l-2 -11" stroke="#4a9a34" stroke-width="4"/>${Array.from({length:5},(_,j)=>`<ellipse cx="${x-6+(j%2)*9}" cy="${-24+Math.floor(j/2)*8}" rx="1.4" ry="2" fill="#ffe6a2"/>`).join('')}`).join('')}</g>`;
  case 'maca': return `<g>${circle(-22,-16,19,'#c93435')}${circle(15,-25,22,'#e54a36')}${circle(39,-4,15,'#c93435')}<path d="M-23 -34q8-15 20-9m15 -2q10-14 22-8" stroke="#528c2d" stroke-width="7" fill="none"/><path d="M-7 -44q15-16 26-4q-8 12-26 4Z" fill="#6eaa37"/></g>`;
  case 'melancia': return `<g><ellipse cx="0" cy="-12" rx="39" ry="25" fill="#4a9d4c" stroke="#246c38" stroke-width="3"/><path d="M-26 -28Q-12 -9 -25 8M-8 -36Q6 -12 -8 12M12 -36Q26 -11 12 12M30 -28Q42 -7 28 8" stroke="#b4d86b" stroke-width="5" fill="none"/><path d="M-30 -26Q0 -48 30 -26" stroke="#d7f0a1" stroke-width="3" fill="none"/></g>`;
  case 'banana': return `<g fill="#f4d13e" stroke="#b18b22" stroke-width="3"><path d="M-34 -24Q-14 19 25 13Q41 10 42 -2Q18 1 -2 -22Q-21 -42 -34 -24Z"/><path d="M-18 -35Q-1 2 33 -5Q44 -7 48 -18Q21 -12 5 -35Q-9 -51 -18 -35Z"/><path d="M-40 -27l-7 -6m85 26l7 -5" fill="none"/></g>`;
  case 'pessego': return `<g>${circle(-20,-12,20,'#ef9b7b')}${circle(18,-22,22,'#f3b080')}${circle(35,1,15,'#e98870')}<path d="M-19 -31q8 14 0 31m38 -42q-8 17 0 34" stroke="#f7c49a" stroke-width="3" fill="none"/><path d="M0 -44q13-16 26-7q-8 12-26 7Z" fill="#69a83a"/></g>`;
  case 'laranja': return `<g>${circle(-23,-12,18,'#ef8a24')}${circle(7,-29,21,'#f49b2c')}${circle(34,-5,17,'#e9791e')}<path d="M-24 -30q10-13 20-5m10 -17q12-13 22-4m8 36q12-12 21-4" stroke="#5e9d35" stroke-width="5" fill="none"/></g>`;
  case 'uva': return `<g>${[[-16,-36], [2,-45], [19,-34],[-25,-17],[-7,-20],[12,-17],[0,1],[-16,0],[18,0]].map(([x,y])=>circle(x,y,10,'#70459b')).join('')}<path d="M0 -47q-5-18 10-27m-7 12q-14-11-25-3" stroke="#548e32" stroke-width="5" fill="none"/></g>`;
  case 'roma': return `<g>${circle(-15,-13,20,'#c9324b')}${circle(20,-19,23,'#d9434d')}<path d="M-28 -32l-4 -10l10 4l8 -8l5 11m16 -10l-2 -11l10 7l10 -5l-1 13" fill="#a42a3b" stroke="#8e2534" stroke-width="2"/></g>`;
  case 'melao': return `<g><ellipse cx="0" cy="-14" rx="38" ry="26" fill="#a6c65c" stroke="#638c37" stroke-width="3"/><path d="M-30 -31Q-15 -10 -30 3M-15 -38Q0 -12 -15 12M0 -40Q15 -12 0 12M15 -38Q30 -10 15 10M30 -28Q42 -8 28 1" stroke="#d9e59a" stroke-width="2.5" fill="none"/></g>`;
  case 'cana': return `<g><path d="M-28 8L-19 -68M-4 8L1 -78M19 8L27 -62" stroke="#6e9f3d" stroke-width="12" stroke-linecap="round"/><path d="M-23 -18l9 2m-7 -28l9 2m4 24l9 2m-8 -31l9 2m5 29l9 2m-8 -28l9 2" stroke="#d4e38d" stroke-width="4"/><path d="M1 -77q-24-26-38-15m38 15q23-29 41-16" stroke="#3e8a37" stroke-width="7" fill="none"/></g>`;
  case 'lichia': return `<g>${circle(-21,-14,17,'#d84d5b')}${circle(8,-31,18,'#e75a64')}${circle(31,-9,16,'#cf4052')}${circle(-2,1,14,'#e65a62')}<g fill="none" stroke="#f5a0a0" stroke-width="2"><path d="M-31 -18l8 -6m17 3l8 -8m17 17l8 -6m-35 28l8 -7"/></g></g>`;
  case 'kiwi': return `<g>${[-22,8,31].map((x,i)=>`<ellipse cx="${x}" cy="${-17+(i%2)*10}" rx="15" ry="22" fill="#8a633f" stroke="#5e432f" stroke-width="3"/><ellipse cx="${x}" cy="${-17+(i%2)*10}" rx="9" ry="15" fill="#93b84c"/><circle cx="${x}" cy="${-17+(i%2)*10}" r="3" fill="#f4df9d"/>`).join('')}</g>`;
  case 'abacaxi': return `<g><path d="M0 -55Q-33 -33 -25 5Q-9 28 22 6Q34 -24 0 -55Z" fill="#e5ad32" stroke="#a67521" stroke-width="3"/><path d="M-15 -41l30 49m-38-28l47 19m-39-36l-8 33m25-40l-6 49" stroke="#f8d36a" stroke-width="3"/><path d="M0 -52q-22-35-32-28m32 28q-6-39 10-44m-10 44q18-33 33-27" stroke="#4f9a3a" stroke-width="7" fill="none"/></g>`;
  case 'cereja': return `<g><path d="M-16 -25Q-9 -57 7 -60M18 -25Q13 -56 7 -60" stroke="#5a8433" stroke-width="4" fill="none"/>${circle(-18,-11,17,'#b92742')}${circle(20,-10,18,'#cf3348')}<path d="M-27 -19q9-7 17 0m18-2q10-7 18 0" stroke="#f48a91" stroke-width="3" fill="none"/></g>`;
  case 'pitaya': return `<g><path d="M-26 -8Q-33 -47 0 -54Q35 -48 27 -8Q14 20 0 20Q-15 18-26 -8Z" fill="#e94c86" stroke="#a62d65" stroke-width="3"/><path d="M-25 -26l-17 -13l18 4m-8 24l-18 3l17 7m35-26l18-14l-8 20m1 16l19 3l-18 8" fill="#78a94a" stroke="#4c8134" stroke-width="3"/><path d="M-12 -27q12-12 24 0m-23 18q11-11 22 0" stroke="#ffb0cb" stroke-width="3" fill="none"/></g>`;
  case 'manga': return `<g><path d="M-27 -30Q-4 -55 30 -34Q41 -4 4 15Q-22 11 -27 -30Z" fill="#f4a63a" stroke="#a86b2b" stroke-width="3"/><path d="M-20 -24Q0 -47 23 -31" stroke="#ffda74" stroke-width="5" fill="none"/><path d="M5 -39q9-21 27-18q-5 18-27 18Z" fill="#5b9d35"/></g>`;
  case 'cacau': return `<g><path d="M-28 -38Q-45 -12 -22 12Q-4 24 5 2Q16 -26 -1 -43Q-16 -54 -28 -38Z" fill="#8b5635" stroke="#57331f" stroke-width="3"/><path d="M15 -45Q-2 -19 19 6Q38 18 45 -8Q47 -35 29 -48Q21 -54 15 -45Z" fill="#a56b42" stroke="#684126" stroke-width="3"/><path d="M-27 -34q15 22 4 42m39-49q14 21 9 40" stroke="#d19a64" stroke-width="3" fill="none"/></g>`;
  case 'arvore_garrafa': return `<g><path d="M-18 18Q-35-5-28-35Q-24-54-11-67L-9-91Q0-101 10-91L11-67Q28-48 30-24Q36 7 16 18Z" fill="#9b7446" stroke="#65462d" stroke-width="4"/><path d="M-9-68Q-43-87-55-62M10-71Q40-96 56-65M-4-91Q-18-117-28-111M7-91Q20-120 31-112" fill="none" stroke="#4b8f3c" stroke-width="10" stroke-linecap="round"/><path d="M-25-42Q0-60 25-42M-29-12Q0-28 29-12" stroke="#c49a63" stroke-width="4" fill="none"/></g>`;
  case 'nepenthes': return `<g><path d="M0 15Q-48-17-42-58Q-5-45 0 15Q10-44 43-53Q48-13 0 15" fill="#3f963d" stroke="#246a31" stroke-width="4"/><path d="M-23-17Q-36-54-26-75Q-12-86-3-68L-7-27Z" fill="#d98b49" stroke="#8c4e2c" stroke-width="4"/><path d="M12-17Q10-59 29-78Q48-79 48-58L28-25Z" fill="#b86b3e" stroke="#75412b" stroke-width="4"/><path d="M-28-74q14-11 27 1m17-5q13-10 25 0" stroke="#eac178" stroke-width="5" fill="none"/></g>`;
  case 'lirio_aranha': return `<g><path d="M0 15Q-8-31 0-61" stroke="#3f8b36" stroke-width="6" fill="none"/><g stroke="#b62e3d" stroke-width="5" fill="none" stroke-linecap="round"><path d="M0-58Q-54-91-52-118M0-58Q-28-106-19-127M0-58Q22-107 18-128M0-58Q55-90 53-116M0-58Q-5-99 0-132"/><path d="M0-58Q-63-66-78-91M0-58Q63-66 78-91"/></g><g fill="#e44c5d"><circle cx="-52" cy="-118" r="5"/><circle cx="-19" cy="-127" r="5"/><circle cx="18" cy="-128" r="5"/><circle cx="53" cy="-116" r="5"/><circle cy="-132" r="5"/></g></g>`;
  case 'lotus_neve': return `<g><path d="M0 15Q-45 6-54-17Q-20-27 0 15Q20-27 54-17Q45 6 0 15Z" fill="#4c9b48" stroke="#2e7135" stroke-width="3"/><g fill="#f5f5f1" stroke="#b8c5d5" stroke-width="2"><path d="M0-22Q-34-42-27-76Q-2-67 0-22Z"/><path d="M0-22Q34-42 27-76Q2-67 0-22Z"/><path d="M0-24Q-12-67 0-94Q14-66 0-24Z"/><path d="M-4-22Q-48-54-51-39Q-36-10-4-22Z"/><path d="M4-22Q48-54 51-39Q36-10 4-22Z"/></g><circle cy="-36" r="8" fill="#e7c65d"/></g>`;
  case 'neve': return `<g stroke="#9fd9ef" stroke-width="7" stroke-linecap="round" fill="none"><path d="M0-82V20M-48-55L48-7M-48-7L48-55M0-82l-11 15m11-15l11 15M0 20l-11-15m11 15l11-15M-48-55l18 1m-18-1l7 17M48-7l-18-1m18 1l-7-17M-48-7l18-1m-18 1l7-17M48-55l-18 1m18-1l-7 17"/></g><circle r="12" fill="#e5f8ff" stroke="#8fcde5" stroke-width="3"/>`;
  case 'planta_fogo': return `<g><path d="M0 18Q-37-8-18-43Q-12-60 0-79Q5-48 23-39Q49-12 0 18Z" fill="#e84c26" stroke="#9f321e" stroke-width="4"/><path d="M0 12Q-18-8-5-30Q1-42 4-58Q12-35 23-26Q34-5 0 12Z" fill="#ffb13b"/><path d="M-2 11Q-12-3-3-17Q3-25 6-37Q13-16 13-8Q12 5-2 11Z" fill="#ffe07a"/><path d="M-34 17Q-60-13-49-37M34 17Q60-13 49-37" stroke="#4d963d" stroke-width="7" fill="none"/></g>`;
  case 'fenix': return `<g><path d="M0 18Q-48-15-25-63Q-10-82 0-103Q10-79 28-61Q48-15 0 18Z" fill="#e84b2e" stroke="#9b3526" stroke-width="4"/><path d="M-3 10Q-18-19-2-47Q10-62 9-82Q31-47 25-20Q19 2-3 10Z" fill="#f5a53a"/><path d="M-10-7Q-65-21-68-66Q-37-59-19-34M10-7Q65-21 68-66Q37-59 19-34" fill="none" stroke="#d84b2f" stroke-width="10" stroke-linecap="round"/><path d="M-6 16L-18 43M6 16L18 43" stroke="#5a8e36" stroke-width="6" stroke-linecap="round"/></g>`;
  default: return [-21,8,25].map((x,i)=>circle(x,-12+(i%2)*9,17+(i===1?4:0),color)).join('');
 }
}
function cropArt(type,progress){const v=CROPS[type],hasFruit=progress>.68,bloom=progress>.45&&progress<.78,leaves=progress>.55?7:progress>.22?5:3,leaf=['#1b8d39','#38ab3f','#58bd43','#2b9d35','#74c84a','#90d362','#4ea83e'];
let a='';
if(v.kind==='flower'){
 if(type==='pilea_involucrata'){
  const count=progress>.72?8:progress>.4?6:progress>.16?4:2;
  for(let j=0;j<count;j++){const angle=j*2.399,rad=progress>.5?31:22,cx=Math.cos(angle)*rad,cy=-20+Math.sin(angle)*rad*.58;a+=`<path d="M0 0Q${cx*.35-9} ${cy-16} ${cx} ${cy}Q${cx*.5+9} ${cy+14} 0 0Z" fill="${['#638b62','#789c70','#547d59','#8ba87b'][j%4]}" stroke="#365f43" stroke-width="2"/><path d="M0 0L${cx} ${cy}" stroke="#d8d7b7" stroke-width="1.7"/><path d="M${cx*.4} ${cy*.4}l${cx*.16} -5m${-cx*.13} 10l${-cx*.15} -4" stroke="#b8c7a3" stroke-width="1.1" fill="none"/>`}
  a+=`<path d="M0 0Q-7-35 4-69M0-10Q22-39 29-50" stroke="#477b45" stroke-width="5" fill="none"/>`;return a;
 }
 const leafPairs=progress>.35?4:2;
 for(let j=0;j<leafPairs;j++){const side=j%2?-1:1,yy=-18-j*12,xx=side*(17+j*2);a+=`<path d="M0 ${yy}Q${xx*.45} ${yy-22} ${xx} ${yy-13}Q${xx*.55} ${yy+2} 0 ${yy+4}Z" fill="${leaf[j%leaf.length]}" stroke="#17682a" stroke-width="2"/><path d="M0 ${yy+2}L${xx} ${yy-13}" stroke="#a8d778" stroke-width="1.5"/>`}
 a+=`<path d="M0 0Q-7-36 4-73M0-12Q24-44 31-57" stroke="#37762c" stroke-width="5" fill="none"/>`;
 if(progress>.25)a+=`<path d="M-2-48q-13-20-24-15M3-54q15-20 25-13" stroke="#438d31" stroke-width="3" fill="none"/>`;
 if(progress>.35&&type==='girassol'){
  const cx=2,cy=-67,rr=progress>.72?20:14;
  for(let k=0;k<12;k++){const angle=k*Math.PI*2/12,px=cx+Math.cos(angle)*rr,py=cy+Math.sin(angle)*rr;a+=`<ellipse cx="${px}" cy="${py}" rx="6.5" ry="12" fill="#f5c52e" stroke="#c28b20" stroke-width="1.5" transform="rotate(${k*30} ${px} ${py})"/>`}
  a+=`<circle cx="${cx}" cy="${cy}" r="${progress>.72?12:9}" fill="#70441e" stroke="#4b2d17" stroke-width="3"/><g fill="#b98a35"><circle cx="${cx-4}" cy="${cy-2}" r="1.4"/><circle cx="${cx+3}" cy="${cy-5}" r="1.4"/><circle cx="${cx+5}" cy="${cy+3}" r="1.4"/></g>`;
 }else if(progress>.35&&type==='rosa_amarela'){
  const cx=2,cy=-66;a+=`<g fill="#f3cf36" stroke="#bd9223" stroke-width="2"><path d="M${cx} ${cy}c-17-23-29-5-15 7-14 16 3 25 15 9 12 16 29-2 15-12 14-12-4-29-15-4-12Z"/><path d="M${cx-7} ${cy+2}q-8-14 4-19q12 6 3 17q9 13-6 17q-13-6-1-15Z"/></g><path d="M-3-69q6-8 11-1" stroke="#fff0a2" stroke-width="2" fill="none"/>`;
 }
 return a;
}
// Many different leaf sizes and positions create an actual growing crop.
for(let j=0;j<leaves;j++){
 let angle=j*Math.PI*2/leaves,rad=progress>.45?37:30,ex=Math.cos(angle)*rad,ey=Math.sin(angle)*(progress>.45?20:17)-24;
 a+=`<path d="M0 0Q${ex*.47-18} ${ey-26} ${ex} ${ey}Q${ex*.7+13} ${ey+20} 0 0Z" fill="${leaf[j%leaf.length]}" stroke="#17682a" stroke-width="2"/><path d="M0 0L${ex} ${ey}" stroke="#8bc66b" stroke-width="1.6"/>`;
 if(progress>.38)a+=`<path d="M${ex*.45} ${ey*.45}Q${ex*.65} ${ey*.75} ${ex*.85} ${ey*.92}" stroke="#d8f0a5" stroke-width="1.1" fill="none" opacity=".65"/>`;
}
a+=`<path d="M0 0Q-7-36 4-73M0-12Q24-44 31-57" stroke="#37762c" stroke-width="5" fill="none"/>`;
if(bloom){for(const [bx,by,br,col] of [[-18,-30,7,v.flower],[16,-39,7,v.flower],[5,-16,6,'#ffe6a6']])a+=`<g><circle cx="${bx}" cy="${by}" r="${br}" fill="${col}"/><circle cx="${bx}" cy="${by}" r="${Math.max(2,br/3)}" fill="#ffe9c2"/></g>`;}
if(hasFruit){
 const fruitColor=v.fruit;
 if(type==='milho')a+=`<g transform="translate(-14 -52)"><path d="M4 36Q-19 6 0-8Q26-10 21 23Z" fill="#e8cc37" stroke="#8e7a1b" stroke-width="2"/><path d="M-5 27L8 11L23 26" fill="none" stroke="#a9a62e" stroke-width="7"/></g>`;
 else if(type==='cenoura')a+=`<path d="M-16-10q14-15 30 0l-15 43Z" fill="#f38d28" stroke="#b15b1d" stroke-width="2"/>`;
 else if(type==='nabo')a+=`<path d="M-27 -5Q-28 -33 0 -33Q28 -30 27 -7Q10 18 0 35Q-12 17 -27 -5Z" fill="#f6edf9" stroke="#ab75af" stroke-width="3"/><path d="M0-34q-4 21-15 25" stroke="#b789c7" stroke-width="5" fill="none"/>`;
 else if(type==='berinjela')a+=`<ellipse cx="4" cy="-13" rx="23" ry="30" fill="${fruitColor}" stroke="#48205c" stroke-width="3"/><path d="M-11-35q12 11 24 1" stroke="#87be42" stroke-width="9"/>`;
 else if(type==='pimenta')a+=`<path d="M0-27Q33-43 23-13Q16 17 32 17Q13 32 1 1Z" fill="#d52e20" stroke="#8b311f" stroke-width="2.4"/>`;
 else if(type==='ervilha')a+=`<path d="M-22 -17Q8-37 27-19Q30 10 0 12Q-24 8-22-17Z" fill="#83c34e" stroke="#38762a" stroke-width="3"/><circle cx="-8" cy="-10" r="6" fill="#b7e37c"/><circle cx="7" cy="-11" r="6" fill="#b7e37c"/>`;
 else if(type==='coco')a+=`<g><circle cx="-17" cy="-15" r="25" fill="#87502d" stroke="#56341e" stroke-width="4"/><circle cx="22" cy="-17" r="24" fill="#9b6337" stroke="#56341e" stroke-width="4"/><path d="M-29-31q14-8 25 4m13-10q14-7 24 5" stroke="#d3a46b" stroke-width="4" fill="none"/></g>`;
 else if(type==='limao')a+=`<g><ellipse cx="-20" cy="-12" rx="20" ry="29" fill="#d7df42" stroke="#8e9e2e" stroke-width="3" transform="rotate(-24 -20 -12)"/><ellipse cx="20" cy="-18" rx="20" ry="29" fill="#e5e94b" stroke="#9aa632" stroke-width="3" transform="rotate(22 20 -18)"/><path d="M-20-41q6-10 16-5m24 0q10-10 18-2" stroke="#558d37" stroke-width="5" fill="none"/></g>`;
 else if(type==='batata_doce')a+=`<g><path d="M-34-20Q-10-49 5-21Q19 4-7 23Q-38 30-34-20Z" fill="#b66c4c" stroke="#76402f" stroke-width="3"/><path d="M8-25Q34-47 43-18Q49 8 22 20Q-2 7 8-25Z" fill="#d08b5c" stroke="#8e563a" stroke-width="3"/><path d="M-23-14q12-7 18 3m23-7q10-6 14 4" stroke="#e8b08a" stroke-width="3" fill="none"/></g>`;
 else if(type==='amendoim')a+=`<g><path d="M-27-35Q-48-18-24 0Q-9 10-1 25Q17 35 29 15Q41-7 18-22Q7-41-9-40Q-20-47-27-35Z" fill="#c79b59" stroke="#8b633a" stroke-width="3"/><path d="M-22-27q13 6 11 19m7 10q12 3 17 15m-3-47q14 6 14 19" stroke="#e7c68b" stroke-width="3" fill="none"/></g>`;
 else if(type==='noz')a+=`<g><path d="M-34-20Q-25-49-2-42Q24-37 27-9Q24 19-3 22Q-31 15-34-20Z" fill="#986039" stroke="#5f3d27" stroke-width="4"/><path d="M-16-30Q-3-15-13 10m26-44Q1-10 16 9" stroke="#d0a06a" stroke-width="3" fill="none"/></g>`;
 else if(type==='trigo')a+=`<g stroke="#c5a33e" stroke-width="5" fill="none"><path d="M-18 20L-14-65M0 20L2-82M18 20L20-60"/><path d="M-14-45q-24-16-18-29q18 0 18 29m0 13q24-16 18-29q-18 0-18 29M2-57q-24-16-18-29q18 0 18 29m0 13q24-16 18-29q-18 0-18 29M20-35q-24-16-18-29q18 0 18 29" stroke="#e3c35a" stroke-width="8" stroke-linecap="round"/></g>`;
 else if(type==='beterraba')a+=`<g><path d="M-25-12Q-26-40 0-40Q28-38 25-12Q12 10 0 38Q-12 12-25-12Z" fill="#a52e5c" stroke="#672340" stroke-width="3"/><path d="M0-38q-4-24-23-25m23 25q12-24 31-22m-31 22q-2-25-3-34" stroke="#4c9a3d" stroke-width="7" fill="none"/></g>`;
 else if(type==='caviar')a+=`<g fill="#25211f" stroke="#78604d" stroke-width="1.5">${Array.from({length:13},(_,i)=>`<circle cx="${-28+(i%5)*14}" cy="${-32+Math.floor(i/5)*14}" r="7"/>`).join('')}</g>`;
 else if(type==='pinheiro_natal')a+=`<g><path d="M0-75L-34-27H-17L-43 5H43L17-27H34Z" fill="#2e7c3b" stroke="#1c5b2b" stroke-width="3"/><path d="M0-20V20" stroke="#80502e" stroke-width="9"/><circle cx="-12" cy="-25" r="5" fill="#e64d4d"/><circle cx="14" cy="-10" r="5" fill="#e9c64c"/><circle cx="2" cy="-48" r="5" fill="#f4d66d"/></g>`;
 else if(type==='goiaba')a+=`<g><circle cx="-17" cy="-15" r="22" fill="#d58b84" stroke="#9e5a53" stroke-width="3"/><circle cx="18" cy="-18" r="24" fill="#e7a49a" stroke="#9e5a53" stroke-width="3"/><circle cx="18" cy="-18" r="11" fill="#f5d5a5"/><circle cx="18" cy="-18" r="3" fill="#b78a4c"/></g>`;
 else if(type==='cabaceira')a+=`<g><path d="M-29-15Q-48-39-25-48Q-5-55 0-35Q6-55 27-48Q48-36 29-12Q18 8 0 20Q-20 7-29-15Z" fill="#d99b38" stroke="#96612b" stroke-width="3"/><path d="M0-35q-8-15-4-25m4 25q14-18 25-12" stroke="#558c36" stroke-width="6" fill="none"/></g>`;
 else if(type==='cacau_pascoa')a+=`<g><path d="M-28-35Q-43-7-20 17Q-3 27 6 3Q14-26-2-42Q-16-50-28-35Z" fill="#8b5635" stroke="#57331f" stroke-width="3"/><path d="M16-42Q-1-14 19 9Q38 20 45-6Q47-34 29-47Q21-52 16-42Z" fill="#a56b42" stroke="#684126" stroke-width="3"/><path d="M-28-32q15 22 4 42m39-49q14 21 9 40" stroke="#d19a64" stroke-width="3" fill="none"/></g>`;
 else if(CROPS[type].advanced)a+=advancedFruitArt(type,fruitColor);
 else for(const [dx,dy,r] of [[-21,-5,17],[8,-19,21],[25,1,15]])a+=`<circle cx="${dx}" cy="${dy}" r="${r}" fill="${fruitColor}" stroke="${type==='abobora'?'#b4772b':'#a0482c'}" stroke-width="2.5"/><path d="M${dx-8} ${dy-9}Q${dx} ${dy-14} ${dx+6} ${dy-8}" stroke="#ffd580" fill="none" stroke-width="2"/>`;
}
return a;
}

function cropPhaseImageMarkup(id,phase){const slug=CLASSIC_CROP_ASSET_SLUGS[id];if(!slug)return '';const safePhase=Math.max(1,Math.min(5,Math.floor(phase)||1));const src=CLASSIC_CROP_ASSET_BASE+'plants_phase_one_to_five/'+slug+'_'+safePhase+'.png';return '<image href="'+src+'" x="-66" y="-112" width="132" height="132" preserveAspectRatio="xMidYMid meet" style="opacity:1;mix-blend-mode:normal"/>';}
function renderPlots(){
 const perimeter='532,350 1132,620 532,890 -68,620';
 const base=(offset)=>`<g transform="translate(${offset} 0)"><polygon points="${perimeter}" transform="translate(0 18)" fill="#1d4f17" opacity=".28" filter="url(#shadow)" pointer-events="none"/><polygon points="-68,620 532,890 532,907 -68,637" fill="#2e6d20" opacity=".9" pointer-events="none"/><polygon points="532,890 1132,620 1132,637 532,907" fill="#245c19" opacity=".92" pointer-events="none"/></g>`;
 // A primeira plantação permanece na posição original da Fazenda.
 // Somente a segunda área (expansão, no Rio) recebe o deslocamento.
 let html=base(0)+`<g transform="translate(180 -240)">${base(EXPANSION_PLOT_OFFSET_X)}</g>`;
 let farmCrops='',riverCrops='';
 for(let group=0;group<2;group++)for(let r=0;r<6;r++)for(let c=PLOT_COLS-1;c>=0;c--){
  const i=group*36+r*PLOT_COLS+c,p=state.plots[i];if(!p)continue;
  const part=plotGeometry(p,r,c,i);
  if(group===0){html+=part.tile;farmCrops+=part.crop}
  else{html+=`<g transform="translate(180 -240)">${part.tile}</g>`;riverCrops+=part.crop}
 }
 $('garden-layer').innerHTML=html;
 $('crop-layer').innerHTML=farmCrops+`<g transform="translate(180 -240)">${riverCrops}</g>`
}
const TUTORIAL_TASKS=[
 {id:'harvest',title:'Faça sua primeira colheita',detail:'Use a mão para colher um dos nabos que recebeu de presente.',event:'harvest',goal:1,reward:350,xp:10,icon:'🌱'},
 {id:'plant',title:'Plante uma nova semente',detail:'Compre uma semente na loja e plante-a em um canteiro vazio.',event:'plant',goal:1,reward:450,xp:15,icon:'🧺'},
 {id:'water',title:'Cuide da plantação',detail:'Regue um canteiro que esteja precisando de água.',event:'water',goal:1,reward:300,xp:10,icon:'💧'},
 {id:'sell',title:'Venda sua produção',detail:'Venda ao menos um produto no depósito.',event:'sell',goal:1,reward:600,xp:20,icon:'🪙'},
 {id:'animal',title:'Amplie sua criação',detail:'Compre um animal para o curral.',event:'animal',goal:1,reward:700,xp:20,icon:'🐔'},
 {id:'feed',title:'Alimente um animal',detail:'Compre a ração necessária e alimente um animal.',event:'feed',goal:1,reward:350,xp:15,icon:'🌾'},
 {id:'produce',title:'Recolha uma produção animal',detail:'Quando o animal terminar, recolha sua produção.',event:'produce',goal:1,reward:900,xp:25,icon:'🥚'}
];
const ACHIEVEMENTS=[
 {id:'first_plant',title:'Mãos à terra',detail:'Plante sua primeira semente.',icon:'🌱',test:()=>state.progressCounters.plant>=1,reward:250,xp:10},
 {id:'first_harvest',title:'Primeira colheita',detail:'Colha sua primeira plantação.',icon:'🌾',test:()=>state.progressCounters.harvest>=1,reward:300,xp:10},
 {id:'ten_plants',title:'Fazendeiro dedicado',detail:'Plante 10 vezes.',icon:'🧑‍🌾',test:()=>state.progressCounters.plant>=10,reward:900,xp:30},
 {id:'ten_harvests',title:'Colheita farta',detail:'Colha 10 vezes.',icon:'🧺',test:()=>state.progressCounters.harvest>=10,reward:1200,xp:40,decorReward:'harvest_crown'},
 {id:'animal_care',title:'Amigo dos animais',detail:'Alimente um animal e recolha uma produção.',icon:'🐾',test:()=>state.progressCounters.feed>=1&&state.progressCounters.produce>=1,reward:1000,xp:35},
 {id:'level_five',title:'Fazendeiro experiente',detail:'Alcance o nível 5.',icon:'⭐',test:()=>farmLevel()>=5,reward:1800,xp:50},
 {id:'fish25',title:'Pescador das águas',detail:'Capture 25 peixes no rio ou no mar.',icon:'🎣',test:()=>state.progressCounters.fish>=25,reward:2200,xp:90,titleReward:'Pescador das Águas',decorReward:'deep_sea_trophy'},
 {id:'cook20',title:'Chef da fazenda',detail:'Inicie 20 preparos culinários.',icon:'🍲',test:()=>state.progressCounters.cook>=20,reward:2400,xp:100,titleReward:'Chef da Fazenda'},
 {id:'explore12',title:'Desbravador da mata',detail:'Explore 12 vezes a Mata Brasileira.',icon:'🌳',test:()=>state.progressCounters.explore>=12,reward:2600,xp:110,titleReward:'Desbravador da Mata'},
 {id:'catalog50',title:'Grande colecionador',detail:'Registre 50 descobertas diferentes.',icon:'🏆',test:()=>state.catalog.length>=50,reward:3000,xp:125,titleReward:'Grande Colecionador'}
];

// Conquistas permanentes em trilhas progressivas, no estilo de plataformas de jogos.
function addAchievementSeries(category,metric,icon,entries){
 const read=metric.read;
 ACHIEVEMENTS.push(...entries.map(([goal,title,detail,reward,xp])=>({
  id:metric.id+'_'+goal,title,detail,icon,category,goal,
  progress:()=>Math.min(goal,Math.max(0,Number(read())||0)),
  test:()=>Math.max(0,Number(read())||0)>=goal,reward,xp
 })));
}
const achievementMetrics={
 plant:{id:'plant',read:()=>state.progressCounters?.plant||0},harvest:{id:'harvest',read:()=>state.progressCounters?.harvest||0},
 fish:{id:'fish',read:()=>state.progressCounters?.fish||0},cook:{id:'cook',read:()=>state.progressCounters?.cook||0},
 explore:{id:'explore',read:()=>state.progressCounters?.explore||0},discover:{id:'discover',read:()=>state.catalog?.length||0},
 feed:{id:'feed',read:()=>state.progressCounters?.feed||0},produce:{id:'produce',read:()=>state.progressCounters?.produce||0},
 level:{id:'farm_level',read:()=>farmLevel()},chef:{id:'chef_level',read:()=>specialistLevelFromXP(state.specialistProgress?.chef?.xp||0)},
 fisher:{id:'fisher_level',read:()=>specialistLevelFromXP(state.specialistProgress?.fisher?.xp||0)},
 lumberjack:{id:'lumberjack_level',read:()=>specialistLevelFromXP(state.specialistProgress?.lumberjack?.xp||0)}
};
const achievementSeries=[
 ['Plantio e colheita','plant','🌱',[[50,'Mãos calejadas','Plante 50 sementes.',1200,35],[100,'Rotina de plantio','Plante 100 sementes.',1800,50],[250,'Especialista em sementes','Plante 250 sementes.',3200,85],[500,'Mestre do plantio','Plante 500 sementes.',5500,140],[1000,'Lenda dos canteiros','Plante 1.000 sementes.',10000,250]]],
 ['Plantio e colheita','harvest','🌾',[[50,'Safra constante','Colha 50 canteiros.',1400,40],[100,'Colheita profissional','Colha 100 canteiros.',2200,60],[250,'Celeiro abundante','Colha 250 canteiros.',4000,100],[500,'Rei da colheita','Colha 500 canteiros.',7000,175],[1000,'Colheita lendária','Colha 1.000 canteiros.',12000,300]]],
 ['Pesca','fish','🎣',[[1,'Primeiro peixe','Capture seu primeiro peixe.',250,10],[10,'Pescaria frequente','Capture 10 peixes.',900,25],[75,'Conhecedor das águas','Capture 75 peixes.',3000,80],[100,'Pescador veterano','Capture 100 peixes.',4200,110],[250,'Mestre pescador','Capture 250 peixes.',8000,200],[500,'Lenda dos rios e mares','Capture 500 peixes.',14000,350]]],
 ['Culinária','cook','🍲',[[1,'Primeiro preparo','Inicie seu primeiro preparo.',250,10],[10,'Cozinha ativa','Inicie 10 preparos.',900,25],[50,'Cozinheiro dedicado','Inicie 50 preparos.',2600,70],[100,'Chef profissional','Inicie 100 preparos.',4500,120],[250,'Mestre da gastronomia','Inicie 250 preparos.',8500,220],[500,'Lenda culinária','Inicie 500 preparos.',15000,380]]],
 ['Exploração','explore','🌳',[[10,'Trilha aberta','Plante ou colha 10 vezes na Mata.',1000,30],[25,'Explorador atento','Plante ou colha 25 vezes na Mata.',1800,50],[50,'Guardião da mata','Plante ou colha 50 vezes na Mata.',3500,90],[100,'Especialista da floresta','Plante ou colha 100 vezes na Mata.',6500,165],[200,'Lenda da Mata Brasileira','Plante ou colha 200 vezes na Mata.',12000,300]]],
 ['Coleção','discover','📚',[[10,'Curioso','Descubra 10 itens diferentes.',800,25],[30,'Coleção em expansão','Descubra 30 itens diferentes.',1600,45],[75,'Colecionador','Descubra 75 itens diferentes.',3000,80],[150,'Grande acervo','Descubra 150 itens diferentes.',5500,140],[300,'Enciclopédia viva','Descubra 300 itens diferentes.',10000,250],[500,'Coleção lendária','Descubra 500 itens diferentes.',16000,400]]],
 ['Criação de animais','feed','🐾',[[10,'Cuidador presente','Alimente 10 animais.',700,20],[50,'Mãos cuidadosas','Alimente 50 animais.',1800,50],[100,'Protetor do rebanho','Alimente 100 animais.',3200,85],[250,'Amigo de toda a fazenda','Alimente 250 animais.',6500,165]]],
 ['Criação de animais','produce','🥚',[[10,'Produção em andamento','Recolha 10 produções animais.',800,25],[50,'Coletor experiente','Recolha 50 produções animais.',2000,55],[100,'Fazenda produtiva','Recolha 100 produções animais.',3600,95],[250,'Mestre da criação','Recolha 250 produções animais.',7000,180]]],
 ['Progressão','level','⭐',[[10,'Fazenda em crescimento','Alcance o nível 10.',1800,50],[15,'Fazendeiro avançado','Alcance o nível 15.',3000,80],[20,'Fazendeiro especialista','Alcance o nível 20.',5000,130],[30,'Lenda da fazenda','Alcance o nível 30.',9000,230],[50,'Ícone rural','Alcance o nível 50.',18000,450]]],
 ['Especializações','chef','👨‍🍳',[[5,'Aprendiz de chef','Alcance o nível 5 de Chef.',1200,35],[10,'Chef renomado','Alcance o nível 10 de Chef.',3000,80],[20,'Grão-chef','Alcance o nível 20 de Chef.',7500,190]]],
 ['Especializações','fisher','🧭',[[5,'Pescador habilidoso','Alcance o nível 5 de Pescador.',1200,35],[10,'Mestre das pescarias','Alcance o nível 10 de Pescador.',3000,80],[20,'Lenda da pesca','Alcance o nível 20 de Pescador.',7500,190]]],
 ['Especializações','lumberjack','🪓',[[5,'Lenhador experiente','Alcance o nível 5 de Lenhador.',1200,35],[10,'Mestre lenhador','Alcance o nível 10 de Lenhador.',3000,80],[20,'Guardião das árvores','Alcance o nível 20 de Lenhador.',7500,190]]]
];
for(const [category,key,icon,entries] of achievementSeries)addAchievementSeries(category,achievementMetrics[key],icon,entries);
const legacyAchievementMeta={
 first_plant:['Plantio e colheita',1,()=>state.progressCounters?.plant||0],ten_plants:['Plantio e colheita',10,()=>state.progressCounters?.plant||0],
 first_harvest:['Plantio e colheita',1,()=>state.progressCounters?.harvest||0],ten_harvests:['Plantio e colheita',10,()=>state.progressCounters?.harvest||0],
 animal_care:['Criação de animais',1,()=>state.progressCounters?.feed&&state.progressCounters?.produce?1:0],
 level_five:['Progressão',5,()=>farmLevel()],fish25:['Pesca',25,()=>state.progressCounters?.fish||0],
 cook20:['Culinária',20,()=>state.progressCounters?.cook||0],explore12:['Exploração',12,()=>state.progressCounters?.explore||0],
 catalog50:['Coleção',50,()=>state.catalog?.length||0]
};
for(const a of ACHIEVEMENTS){const meta=legacyAchievementMeta[a.id];if(meta){a.category=meta[0];a.goal=meta[1];a.progress=()=>Math.min(a.goal,Math.max(0,Number(meta[2]())||0));}}

const DAILY_MISSIONS=[
{id:'harvest20',event:'harvest',title:'Colheita abundante',detail:'Colha 20 plantas.',goal:20,reward:500,xp:30,icon:'🌾'},
{id:'fish5',event:'fish',title:'Dia de pescaria',detail:'Capture 5 peixes no rio ou no mar.',goal:5,reward:550,xp:35,icon:'🎣'},
{id:'cook3',event:'cook',title:'Cozinha movimentada',detail:'Inicie 3 preparos culinários.',goal:3,reward:500,xp:30,icon:'🍲'},
{id:'plant10',event:'plant',title:'Mãos à terra',detail:'Plante 10 sementes.',goal:10,reward:400,xp:25,icon:'🌱'},
{id:'feed5',event:'feed',title:'Cuidado diário',detail:'Alimente 5 animais.',goal:5,reward:450,xp:25,icon:'🐾'},
{id:'discover3',event:'discover',title:'Novas descobertas',detail:'Descubra 3 itens diferentes.',goal:3,reward:600,xp:40,icon:'📚'}];
const WEEKLY_MISSIONS=[
{id:'harvest100',event:'harvest',title:'Safra da semana',detail:'Colha 100 plantas.',goal:100,reward:2600,xp:140,icon:'🚜'},
{id:'fish35',event:'fish',title:'Pescador incansável',detail:'Capture 35 peixes.',goal:35,reward:3000,xp:160,icon:'🌊'},
{id:'cook20',event:'cook',title:'Chef da fazenda',detail:'Inicie 20 preparos.',goal:20,reward:2800,xp:150,icon:'👨‍🍳'},
{id:'explore12',event:'explore',title:'Explorador brasileiro',detail:'Plante ou colha 12 espécies na Mata.',goal:12,reward:2400,xp:130,icon:'🌳'},
{id:'discover20',event:'discover',title:'Colecionador dedicado',detail:'Descubra 20 itens diferentes.',goal:20,reward:3200,xp:180,icon:'🏆'}];
function missionWeekKey(date=new Date()){const d=new Date(date.getFullYear(),date.getMonth(),date.getDate()),day=(d.getDay()+6)%7;d.setDate(d.getDate()-day);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function ensureMissionState(){if(!state)return;const day=todayKey(),week=missionWeekKey();if(state.missionDay!==day){state.missionDay=day;state.missionDailyProgress={};state.missionDailyClaims=[]}if(state.missionWeek!==week){state.missionWeek=week;state.missionWeeklyProgress={};state.missionWeeklyClaims=[]}state.missionDailyProgress=state.missionDailyProgress&&typeof state.missionDailyProgress==='object'?state.missionDailyProgress:{};state.missionWeeklyProgress=state.missionWeeklyProgress&&typeof state.missionWeeklyProgress==='object'?state.missionWeeklyProgress:{};state.missionDailyClaims=Array.isArray(state.missionDailyClaims)?state.missionDailyClaims:[];state.missionWeeklyClaims=Array.isArray(state.missionWeeklyClaims)?state.missionWeeklyClaims:[]}
function bumpMissionProgress(event,amount=1){if(!state||!event)return;ensureMissionState();const qty=Math.max(1,Math.floor(Number(amount)||1));for(const m of DAILY_MISSIONS)if(m.event===event)state.missionDailyProgress[m.id]=Math.min(m.goal,(state.missionDailyProgress[m.id]||0)+qty);for(const m of WEEKLY_MISSIONS)if(m.event===event)state.missionWeeklyProgress[m.id]=Math.min(m.goal,(state.missionWeeklyProgress[m.id]||0)+qty)}
function claimMission(period,id){if(!farmWriteAllowed())return;ensureMissionState();const list=period==='weekly'?WEEKLY_MISSIONS:DAILY_MISSIONS,progress=period==='weekly'?state.missionWeeklyProgress:state.missionDailyProgress,claims=period==='weekly'?state.missionWeeklyClaims:state.missionDailyClaims,m=list.find(x=>x.id===id);if(!m||claims.includes(id)||(progress[id]||0)<m.goal)return;claims.push(id);state.coins+=m.reward;awardXP(m.xp,'missão '+period);remember('Concluiu a missão '+m.title+'.');markDirty();refresh();notify('Missão concluída! +'+fmt(m.reward)+' moedas e '+m.xp+' XP.')}
function renderMissionCards(period,list){const progress=period==='weekly'?state.missionWeeklyProgress:state.missionDailyProgress,claims=period==='weekly'?state.missionWeeklyClaims:state.missionDailyClaims;return '<div class="mission-grid">'+list.map(m=>{const value=Math.min(m.goal,progress[m.id]||0),done=value>=m.goal,claimed=claims.includes(m.id),pct=Math.round(value/m.goal*100);return '<article class="mission-card '+(done?'mission-complete':'')+'"><div class="mission-icon">'+m.icon+'</div><div class="mission-content"><b>'+safe(m.title)+'</b><small>'+safe(m.detail)+'</small><div class="mission-progress"><i style="width:'+pct+'%"></i></div><small>'+fmt(value)+' / '+fmt(m.goal)+' · 🟡 '+fmt(m.reward)+' · '+m.xp+' XP</small></div><button class="modal-action" data-claim-mission="'+m.id+'" data-mission-period="'+period+'" '+(!done||claimed?'disabled':'')+'>'+(claimed?'Resgatada':done?'Resgatar':'Em andamento')+'</button></article>'}).join('')+'</div>'}

function newGame(){
 const plots=Array.from({length:PLOT_COUNT},(_,i)=>({status:Math.floor(i/6)<4?'dirt':'grass',soil:'normal',crop:null,plantedAt:null,wateredAt:null,weed:false,pest:false,harvestsRemaining:0}));
 for(const i of [8,9])plots[i]={status:'growing',soil:'normal',crop:'nabo',plantedAt:Date.now()-11*HOUR,wateredAt:Date.now()-11*HOUR,weed:false,pest:false,harvestsRemaining:1,initialGift:true};
 const inventory=Object.fromEntries(CROP_IDS.map(id=>[id,0]));Object.assign(inventory,{nabo:4,feijao:2,arroz:2,fertilizer:0,superFertilizer:0,fertilizer_250:0,fertilizer_550:0,sunlightFertilizer:0,loveFertilizer:0,fertilizer_15h:0,surfConcentrate:0,feed_dog:0,feed_chicken:0,feed_cow:0,feed_sheep:0,feed_pig:0,feed_donkey:0,feed_duck:0,feed_pigeon:0,feed_peacock:0,feed_yak:0,feed_bull:0,feed_goat:0,feed_buffalo:0,feed_rabbit:0,feed_horse:0,feed_growers:0,feed_producers:0,ration_chicken:0,ration_cow:0,ration_pig:0,honey:0,seasoning:0,redSoilWand:0,restoreSoilWand:0});
 const flowerWarehouse=Object.fromEntries(FLOWER_IDS.map(id=>[id,0])),flowerLocks=Object.fromEntries(FLOWER_IDS.map(id=>[id,true])),bouquets=Object.fromEntries(BOUQUET_IDS.map(id=>[id,0]));
 const warehouseLocks=Object.fromEntries(FIELD_CROP_IDS.map(id=>[id,false]));
 const decorInventory=Object.fromEntries(Object.keys(DECORATIONS).map(id=>[id,0]));
 const giftInventory=Object.fromEntries(Object.keys(GIFT_ITEMS).map(id=>[id,0]));
 return {farmName:'Minha fazenda',catalog:[],profilePhoto:'',coins:3500,greenCoins:5,vipUntil:0,dogBreedsOwned:['classico'],temporaryDogBreeds:{},redSoilApplications:0,xp:0,xpProgressionVersion:2,lastLevelRewarded:1,specialistProgress:{chef:{xp:0},grill:{xp:0},lumberjack:{xp:0},carpenter:{xp:0},alchemist:{xp:0},fisher:{xp:0},haras:{xp:0}},popularity:0,flowers:0,mood:'happy',moodDate:'',grill:{owned:false,assembled:false,parts:{iron:0,screws:0,paint:0},queue:[]},kitchen:{queue:[]},herbMix:{queue:[]},fishing:{rod:'normal',rods:['normal'],lastCastAt:0,pendingCatch:null},fishWarehouse:Object.fromEntries(Object.keys(FISH_TYPES).map(id=>[id,0])),seaFishing:{net:'normal',nets:['normal'],lastCastAt:0,pendingCatch:null},seaWarehouse:Object.fromEntries(Object.keys(SEA_TYPES).map(id=>[id,0])),forestPlots:Array.from({length:FOREST_PLOTS},()=>({type:null,status:'empty',plantedAt:0})),woodWarehouse:Object.fromEntries([...new Set(Object.values(FOREST_TREES).map(t=>t.wood))].map(id=>[id,0])),furnitureWarehouse:Object.fromEntries(Object.keys(WOODWORK_RECIPES).map(id=>[id,0])),carpentry:{queue:[]},meatWarehouse:{chicken:0,beef:0,pork:0,lamb:0,turkey:0,goat:0},meatLocks:{chicken:true,beef:true,pork:true,lamb:true,turkey:true,goat:true},processedWarehouse:{},processedLocks:{},warehouseLocks,decorInventory,placedDecorations:[],farmTheme:'classic',farmThemeExpiries:{},ownedFarmThemes:[],giftInventory,expansions:{orchard:false,pond:false,haras:false},lake:{fish:[],decorations:[],bridges:[]},orchardTrees:Array.from({length:8},()=>({type:null,status:'empty',plantedAt:0,harvestsRemaining:0})),butterflyTreeClaimed:false,flowerWarehouse,flowerLocks,bouquets,dailyRewardDate:'',dailyStreak:0,inventory,warehouse:{},animalWarehouse:{},animals:starterAnimals(),plots,history:[],tutorial:{acceptedId:null,completed:[],finished:false},taskProgress:{},mobileShortcuts:['shop','kitchen','animals','friends'],progressCounters:{harvest:0,plant:0,water:0,sell:0,animal:0,feed:0,produce:0,fish:0,cook:0,explore:0,discover:0},missionDay:todayKey(),missionWeek:missionWeekKey(),missionDailyProgress:{},missionWeeklyProgress:{},missionDailyClaims:[],missionWeeklyClaims:[],unlockedTitles:[],activeTitle:'',claimedAchievements:[],social:{friends:[],inbox:[],sent:[]},createdAt:Date.now(),updatedAt:Date.now()};
}
function cropIconMarkupOriginal(id){const crop=CROPS[id];if(!crop)return '';if(id==='pimentao_verde'||id==='pimentao_vermelho'||id==='pimentao_amarelo')return '<span class="crop-icon-mark crop-icon-art pepper-icon"><img alt="" src="assets/pimentao-'+id.replace('pimentao_','')+'.png"></span>';const art={
 pilea_involucrata:'<svg viewBox="0 0 48 48"><path d="M23 42Q21 23 25 7" stroke="#3f793c" stroke-width="3" fill="none"/><path d="M23 34Q5 34 6 21q15-6 17 13Zm2-8Q25 10 39 11q6 14-14 15Zm-2-7Q8 20 12 8q14-4 11 11Z" fill="#718e68" stroke="#3d6747" stroke-width="2"/><path d="M9 23l12 10m5-9 12-10M14 10l9 8" stroke="#d8d6bd" stroke-width="1.5" fill="none"/></svg>',
 rosa_amarela:'<svg viewBox="0 0 48 48"><path d="M24 44V19m0 13Q8 25 8 19q12-3 16 13m0-7q12-16 19-8-3 12-19 14" fill="#4d913e" stroke="#286d31" stroke-width="2"/><g fill="#f4cf37" stroke="#b58c22" stroke-width="1.5"><circle cx="24" cy="15" r="11"/><circle cx="18" cy="14" r="6"/><circle cx="29" cy="12" r="6"/><circle cx="24" cy="8" r="5"/></g><circle cx="24" cy="15" r="3" fill="#bd8b22"/></svg>',
 girassol:'<svg viewBox="0 0 48 48"><path d="M24 45V20m0 13Q9 28 7 20q12-3 17 13m0-8q13-15 19-7-4 11-19 14" fill="#4d913e" stroke="#286d31" stroke-width="2"/><g fill="#f6ca35" stroke="#c18b20" stroke-width="1.2"><ellipse cx="24" cy="5" rx="4" ry="8"/><ellipse cx="24" cy="5" rx="4" ry="8" transform="rotate(45 24 15)"/><ellipse cx="24" cy="5" rx="4" ry="8" transform="rotate(90 24 15)"/><ellipse cx="24" cy="5" rx="4" ry="8" transform="rotate(135 24 15)"/></g><circle cx="24" cy="15" r="8" fill="#68401f" stroke="#4b2e1a" stroke-width="2"/></svg>',
 pimentao_verde:'<svg viewBox="0 0 48 48"><path d="M22 9c-2 5-1 8 2 9-8-5-17 1-16 12 1 10 8 15 16 12 8 3 15-2 16-12 1-11-8-17-16-12 3-3 4-6 2-9Z" fill="#4f9b45" stroke="#286b32" stroke-width="2"/><path d="M23 13q-5-8-12-5 4 7 12 7m2-2q4-8 12-6-3 7-12 8" fill="#43863b" stroke="#28622c" stroke-width="1.5"/></svg>',
 pimentao_vermelho:'<svg viewBox="0 0 48 48"><path d="M22 9c-2 5-1 8 2 9-8-5-17 1-16 12 1 10 8 15 16 12 8 3 15-2 16-12 1-11-8-17-16-12 3-3 4-6 2-9Z" fill="#c93632" stroke="#842a25" stroke-width="2"/><path d="M23 13q-5-8-12-5 4 7 12 7m2-2q4-8 12-6-3 7-12 8" fill="#43863b" stroke="#28622c" stroke-width="1.5"/></svg>',
 pimentao_amarelo:'<svg viewBox="0 0 48 48"><path d="M22 9c-2 5-1 8 2 9-8-5-17 1-16 12 1 10 8 15 16 12 8 3 15-2 16-12 1-11-8-17-16-12 3-3 4-6 2-9Z" fill="#f2c52f" stroke="#a77c18" stroke-width="2"/><path d="M23 13q-5-8-12-5 4 7 12 7m2-2q4-8 12-6-3 7-12 8" fill="#43863b" stroke="#28622c" stroke-width="1.5"/></svg>',
 milho_canjica:'<svg viewBox="0 0 48 48"><path d="M16 12Q10 18 13 31q3 12 11 13 8-1 11-13 3-13-3-19-7-5-16 0Z" fill="#fff" stroke="#b9b9b0" stroke-width="1.8"/><path d="M18 16q-3 6-1 14m6-15q-2 9 0 19m6-19q2 9 0 19m5-16q3 8 0 15" fill="none" stroke="#e5e5df" stroke-width="1.5"/><path d="M17 13Q8 9 5 17q2 12 12 19-5-13 0-23Zm14 0q10-6 13 3-2 12-12 20 5-13-1-23Z" fill="#438b3d" stroke="#286b32" stroke-width="1.8"/><path d="M19 12q4-7 9-7 4 0 5 5-6-2-14 2Z" fill="#438b3d" stroke="#286b32" stroke-width="1.5"/></svg>',
 abobora:'<svg viewBox="0 0 48 48"><path d="M24 12c-5-5-15-1-17 10-2 12 6 19 17 16 11 3 19-4 17-16-2-11-12-15-17-10Z" fill="#e98b2c" stroke="#a65320" stroke-width="2"/><path d="M24 12v26M16 12q-7 14 0 25m16-25q7 14 0 25" fill="none" stroke="#f8bd62" stroke-width="2.4"/><path d="M23 12q-1-7 5-8" fill="none" stroke="#52783b" stroke-width="4" stroke-linecap="round"/></svg>',
 lichia:'<svg viewBox="0 0 48 48"><path d="M13 16q8-12 22-4l-5 6" fill="#4c923d"/><circle cx="16" cy="27" r="10" fill="#cf4850" stroke="#8e2634" stroke-width="2"/><circle cx="31" cy="25" r="10" fill="#e35c62" stroke="#9d2d3a" stroke-width="2"/><path d="m11 20 3-2m-2 13 4 2m12-14 4-2m-2 14 4 1" stroke="#f6a0a0" stroke-width="2"/></svg>',
 pitaya:'<svg viewBox="0 0 48 48"><path d="M24 7C12 7 8 18 12 31c3 10 21 10 24 0C40 18 36 7 24 7Z" fill="#ed4f91" stroke="#9e285c" stroke-width="2"/><path d="M17 12q-9-8-9 1 5 2 9 4m15-5q9-8 9 1-5 2-9 4M13 25q-9-3-8 5 5 2 10 0m20-5q9-3 8 5-5 2-10 0" fill="#4f9b49"/></svg>',
 goiaba:'<svg viewBox="0 0 48 48"><path d="M7 23Q8 8 24 10q16-2 17 13-1 15-17 16Q8 38 7 23Z" fill="#77a94b" stroke="#3f7138" stroke-width="2"/><path d="M27 23q2-10 11-8 7 11-1 19-8 5-10-11Z" fill="#f3c7b7" stroke="#b8786b" stroke-width="2"/><circle cx="33" cy="28" r="1" fill="#8c634b"/><circle cx="37" cy="29" r="1" fill="#8c634b"/></svg>',
 cacau:'<svg viewBox="0 0 48 48"><path d="M8 27Q9 9 24 7q15 2 16 20-2 14-16 15Q10 41 8 27Z" fill="#9b5b32" stroke="#63371f" stroke-width="2"/><path d="M16 12q-4 15 0 27m8-32q-3 18 0 36m8-31q5 16 0 28" fill="none" stroke="#d89a5e" stroke-width="3"/><path d="M22 8q-2-6 4-6" stroke="#4f813b" stroke-width="3" fill="none"/></svg>',
 cabaceira:'<svg viewBox="0 0 48 48"><path d="M24 7q-5 7-3 13-13-4-15 8-2 12 12 14 8 1 6-9 2 9 10 8 13-2 10-14-3-11-15-7 2-7-5-13Z" fill="#a9a34a" stroke="#696a2d" stroke-width="2"/><path d="M24 8q-3-6 3-6" stroke="#4f7c38" stroke-width="3" fill="none"/></svg>',
 pitangueira:'<svg viewBox="0 0 48 48"><path d="M24 9q-5 5-4 10-10-5-13 4-3 11 9 14 6 1 8-7 2 8 8 7 12-3 9-14-3-9-13-4 1-5-4-10Z" fill="#d9443f" stroke="#922d2b" stroke-width="2"/><path d="M24 9q-4-7 4-7" stroke="#3f873b" stroke-width="3" fill="none"/></svg>',
 jaca:'<svg viewBox="0 0 48 48"><path d="M9 25Q7 9 23 7q17 1 17 18-1 17-16 19Q10 42 9 25Z" fill="#7d9b38" stroke="#49652b" stroke-width="2"/><g fill="#b0c45a"><circle cx="15" cy="16" r="1.5"/><circle cx="25" cy="13" r="1.5"/><circle cx="34" cy="19" r="1.5"/><circle cx="17" cy="28" r="1.5"/><circle cx="28" cy="25" r="1.5"/><circle cx="34" cy="33" r="1.5"/></g></svg>',
 mamao:'<svg viewBox="0 0 48 48"><path d="M8 25Q8 9 24 7q16 2 16 18-2 17-16 18Q10 42 8 25Z" fill="#f19a35" stroke="#a95d27" stroke-width="2"/><path d="M28 24q0-11 10-11 8 11 0 22-10 3-10-11Z" fill="#f8b24c" stroke="#d47c29" stroke-width="2"/><g fill="#473328"><circle cx="34" cy="22" r="1"/><circle cx="37" cy="25" r="1"/><circle cx="34" cy="28" r="1"/></g></svg>',
 guarana:'<svg viewBox="0 0 48 48"><path d="M8 16q9-10 18-4 8-8 16 2" stroke="#4b8a3c" stroke-width="3" fill="none"/><circle cx="15" cy="25" r="8" fill="#b62e37"/><circle cx="28" cy="22" r="9" fill="#d43b43"/><circle cx="35" cy="32" r="8" fill="#b82d38"/><circle cx="28" cy="22" r="3.2" fill="#fff"/><circle cx="28" cy="22" r="1.5" fill="#171717"/></svg>',
 uvaia:'<svg viewBox="0 0 48 48"><path d="M24 9q-7-7-14-2 4 8 14 8m0-6q8-8 15-2-4 8-15 9" fill="#4b8a3c"/><path d="M11 27q0-13 13-14 13 1 13 14-1 13-13 14Q12 40 11 27Z" fill="#e9a82d" stroke="#a66b20" stroke-width="2"/></svg>',
 cambuca:'<svg viewBox="0 0 48 48"><path d="M24 8q-6-6-13-2 4 7 13 8m0-6q8-7 15-1-4 7-15 8" fill="#4c883a"/><path d="M10 25Q10 12 24 12q14 0 14 13-1 14-14 14Q11 39 10 25Z" fill="#d87937" stroke="#934522" stroke-width="2"/></svg>'
 };if(art[id])return '<span class="crop-icon-mark crop-icon-art">'+art[id]+'</span>';return '<span class="crop-icon-mark">'+crop.icon+'</span>'}
function forestIconMarkup(id){const tree=FOREST_TREES[id];if(!tree)return '';if(id==='pitangueira')return '<span class="crop-icon-mark crop-icon-art"><svg viewBox="0 0 48 48"><path d="M24 9q-5 5-4 10-10-5-13 4-3 11 9 14 6 1 8-7 2 8 8 7 12-3 9-14-3-9-13-4 1-5-4-10Z" fill="#d9443f" stroke="#922d2b" stroke-width="2"/></svg></span>';const peers=Object.entries(FOREST_TREES).filter(([key,item])=>!item.retired&&item.icon===tree.icon).length;if(peers<2)return tree.icon;let hash=0;for(const ch of String(id))hash=(hash*37+ch.charCodeAt(0))%360;return '<span class="forest-icon-mark" style="filter:hue-rotate('+hash+'deg) saturate(1.35)">'+tree.icon+'</span>'}

function discoverItem(category,id,name,icon='📌'){if(!state||!category||!id||!name)return;state.catalog=Array.isArray(state.catalog)?state.catalog:[];if(state.catalog.some(x=>x.category===category&&x.id===String(id)))return;state.catalog.push({category,id:String(id),name:String(name),icon:String(icon||'📌'),discoveredAt:Date.now()});state.progressCounters=state.progressCounters||{};state.progressCounters.discover=(state.progressCounters.discover||0)+1;bumpMissionProgress('discover',1)}
function catalogLegacySeed(data){const add=(category,id,name,icon)=>{if(!data.catalog.some(x=>x.category===category&&x.id===String(id)))data.catalog.push({category,id:String(id),name:String(name),icon:icon||'📌',discoveredAt:Date.now()})};for(const p of data.plots||[])if(p?.crop&&CROPS[p.crop])add('canteiros',p.crop,CROPS[p.crop].name,CROPS[p.crop].icon);for(const t of data.orchardTrees||[])if(t?.type&&CROPS[t.type])add('pomar',t.type,CROPS[t.type].name,CROPS[t.type].icon);for(const t of data.forestPlots||[])if(t?.type&&FOREST_TREES[t.type])add('mata',t.type,FOREST_TREES[t.type].name,'🌳');for(const x of data.animals||[])if(ANIMALS[x.type])add('animais',x.type,ANIMALS[x.type].name,ANIMALS[x.type].icon);for(const id of data.dogBreedsOwned||[])if(DOG_BREEDS[id])add('caes',id,DOG_BREEDS[id].name,'🐕');for(const [id,n] of Object.entries(data.fishWarehouse||{}))if(n>0&&FISH_TYPES[id])add('rio',id,FISH_TYPES[id].name,FISH_TYPES[id].icon);for(const [id,n] of Object.entries(data.seaWarehouse||{}))if(n>0&&SEA_TYPES[id])add('mar',id,SEA_TYPES[id].name,SEA_TYPES[id].icon);if((data.inventory?.caviar||0)>0&&SEA_TYPES.caviar)add('mar','caviar',SEA_TYPES.caviar.name,SEA_TYPES.caviar.icon);for(const [id,n] of Object.entries(data.processedWarehouse||{}))if(n>0&&GRILL_RECIPES[id])add(GRILL_RECIPES[id].kitchenOnly?'cozinha':'churrasqueira',id,GRILL_RECIPES[id].name,GRILL_RECIPES[id].icon);for(const [id,n] of Object.entries(data.inventory||{}))if(n>0&&id.startsWith('mix_')&&MIX_HERB_RECIPES[id.slice(4)]){const r=MIX_HERB_RECIPES[id.slice(4)];add('ervas',id.slice(4),r.name,r.icon)}for(const [id,n] of Object.entries(data.warehouse||{}))if(n>0&&CROPS[id])add(CROPS[id].forestOnly?'mata':'canteiros',id,CROPS[id].name,CROPS[id].icon);for(const [id,n] of Object.entries(data.furnitureWarehouse||{}))if(n>0&&WOODWORK_RECIPES[id])add('marcenaria',id,WOODWORK_RECIPES[id].name,'🪚');for(const [id,n] of Object.entries(data.bouquets||{}))if(n>0&&BOUQUETS[id])add('buques',id,BOUQUETS[id].name,BOUQUETS[id].icon);for(const [id,n] of Object.entries(data.decorInventory||{}))if(n>0&&DECORATIONS[id])add('colecoes',id,DECORATIONS[id].name,'🌷');for(const id of data.ownedFarmThemes||[])if(FARM_THEMES[id])add('colecoes','tema_'+id,FARM_THEMES[id].name,'🎨');for(const [id,n] of Object.entries(data.giftInventory||{}))if(n>0&&GIFT_ITEMS[id])add('colecoes','presente_'+id,GIFT_ITEMS[id].name,'🎁');for(const id of data.fishing?.rods||[])if(FISHING_RODS[id])add('equipamentos','vara_'+id,'Vara '+FISHING_RODS[id].name,'🪝');for(const id of data.seaFishing?.nets||[])if(SEA_NETS[id])add('equipamentos','rede_'+id,'Rede '+SEA_NETS[id].name,'🪢');}

const CLASSIC_CROP_ASSET_SLUGS={"abacaxi":"abacaxi","abobora":"abobora","amendoim":"amendoim","arroz":"arroz","banana":"banana","batata_doce":"batata-doce","batata":"batata","berinjela":"berinjela","cacau":"cacau","cana":"cana","cenoura":"cenoura","cereja":"cereja","coco":"coco","ervilha":"ervilha","goiaba":"goiaba","girassol":"girassol","kiwi":"kiwi","laranja":"laranja","lichia":"lichia","limao":"limao","maca":"maca","manga":"manga","melancia":"melancia","melao":"melao","milho":"milho","morango":"morango","nabo":"nabo","noz":"noz","pessego":"pessego","pimenta":"pimenta","pitaya":"pitaya","roma":"roma","tomate":"tomate","uva":"uva"};
const CLASSIC_CROP_ASSET_BASE='https://raw.githubusercontent.com/dabb3/colheita-feliz-public/codex/online-core-compartilhado/assets/classic/crops/';
function cropIconMarkup(id){return cropIconMarkupOriginal(id);}
function renderDiscoveryCatalog(){const groups=[['canteiros','🌱 Plantado nos canteiros',FIELD_CROP_IDS.length],['pomar','🍎 Pomar',8],['mata','🌳 Mata Brasileira',FOREST_TREE_IDS.length],['cozinha','🍲 Pratos da cozinha',Object.values(GRILL_RECIPES).filter(x=>x.kitchenOnly).length],['ervas','🌿 Temperos e banhos',Object.keys(MIX_HERB_RECIPES).length],['churrasqueira','🔥 Pratos da churrasqueira',Object.values(GRILL_RECIPES).filter(x=>!x.kitchenOnly).length],['animais','🐾 Animais e aves',Object.keys(ANIMALS).length],['caes','🐕 Raças de cães',Object.keys(DOG_BREEDS).length],['rio','🎣 Peixes de rio',Object.keys(FISH_TYPES).length],['mar','🌊 Capturas do mar',Object.keys(SEA_TYPES).length],['marcenaria','🪚 Marcenaria',Object.keys(WOODWORK_RECIPES).length],['buques','💐 Buquês e outras produções',Object.keys(BOUQUETS).length],['colecoes','🎀 Decorações, temas e presentes',Object.keys(DECORATIONS).length+Object.keys(GIFT_ITEMS).length+Object.keys(FARM_THEMES).length],['equipamentos','🎣 Equipamentos adquiridos',Object.keys(FISHING_RODS).length+Object.keys(SEA_NETS).length]],records=Array.isArray(state.catalog)?state.catalog:[],total=groups.reduce((n,g)=>n+g[2],0),found=groups.reduce((n,g)=>n+records.filter(x=>x.category===g[0]).length,0),fishTotal=Object.values(state.fishWarehouse||{}).reduce((n,v)=>n+(Number(v)||0),0)+Object.values(state.seaWarehouse||{}).reduce((n,v)=>n+(Number(v)||0),0),sections=groups.map(([key,title,count])=>{const items=records.filter(x=>x.category===key).sort((x,y)=>x.name.localeCompare(y.name,'pt-BR'));return '<details class="catalog-section"><summary>'+title+' <span>('+items.length+'/'+count+' · faltam '+Math.max(0,count-items.length)+')</span></summary><div class="catalog-items">'+(items.map(x=>'<div class="list-line"><span>'+(x.category==='mata'&&FOREST_TREES[x.id]?forestIconMarkup(x.id):CROPS[x.id]?cropIconMarkup(x.id):x.category==='ervas'&&MIX_HERB_RECIPES[x.id]?mixHerbRecipeIconMarkup(x.id,MIX_HERB_RECIPES[x.id]):safe(x.icon))+' '+safe(x.name)+'</span><small>Descoberto</small></div>').join('')||'<p class="historical-note">Nenhum item descoberto nesta categoria.</p>')+'</div></details>'}).join('');return '<div class="gift-summary"><span class="symbol">📚</span><div><b>Seu catálogo de descobertas</b><small>Registra permanentemente o que você já plantou, produziu, adquiriu ou pescou.</small></div></div><div class="catalog-stats"><div><b>'+fmt(records.length)+'</b><small>descobertas</small></div><div><b>'+fmt(Math.max(0,total-found))+'</b><small>a descobrir</small></div><div><b>'+fmt(fishTotal)+'</b><small>peixes no depósito</small></div><div><b>'+fmt(state.progressCounters?.harvest||0)+'</b><small>colheitas registradas</small></div></div><p class="historical-note">Progresso de referência: '+fmt(found)+' de '+fmt(total)+' registros conhecidos. Itens nunca registrados não são presumidos como descobertos.</p>'+sections+'<p class="historical-note">O catálogo acompanha descobertas e estatísticas da fazenda.</p>'}
function validateFarmSnapshot(data){
 if(!data||typeof data!=='object'||Array.isArray(data))return false;
 let encoded;try{encoded=JSON.stringify(data)}catch{return false}
 if(typeof encoded!=='string'||encoded.length>8*1024*1024)return false;
 if(!Array.isArray(data.plots)||data.plots.length<BASE_PLOT_COUNT||data.plots.length>PLOT_COUNT||!Number.isFinite(data.coins)||data.coins<0)return false;
 if(!data.inventory||typeof data.inventory!=='object'||Array.isArray(data.inventory)||!Array.isArray(data.animals))return false;
 for(const [key,value] of Object.entries(data.inventory)){if(typeof value!=='number'||!Number.isFinite(value)||value<0)return false}
 for(const plot of data.plots){
  if(!plot||typeof plot!=='object'||!['grass','dirt','spent','growing'].includes(plot.status))return false;
  if(plot.status==='growing'&&(!CROPS[plot.crop]||!Number.isFinite(plot.plantedAt)))return false;
 }
 return true;
}
function stableIntegrityValue(value){
 if(Array.isArray(value))return value.map(stableIntegrityValue);
 if(value&&typeof value==='object'){
  const out={};
  for(const key of Object.keys(value).sort())if(key!=='updatedAt')out[key]=stableIntegrityValue(value[key]);
  return out;
 }
 return value;
}
function farmIntegritySummary(data){
 const plots=Array.isArray(data?.plots)?data.plots:[];
 const animals=Array.isArray(data?.animals)?data.animals:[];
 const inventory=data?.inventory&&typeof data.inventory==='object'?data.inventory:{};
 return {
  coins:Number(data?.coins)||0,greenCoins:Number(data?.greenCoins)||0,xp:Number(data?.xp)||0,
  plots:plots.length,occupiedPlots:plots.filter(p=>p?.status==='growing').length,
  animals:animals.length,inventoryTypes:Object.keys(inventory).filter(k=>(Number(inventory[k])||0)>0).length,
  catalog:Array.isArray(data?.catalog)?data.catalog.length:0,
  farmName:typeof data?.farmName==='string'?data.farmName:'—'
 };
}
function compareFarmIntegrity(local,remote){
 const groups=[
  ['Economia',['coins','greenCoins','flowers','popularity']],
  ['Progressão',['xp','xpProgressionVersion','farmName','dailyStreak','dailyRewardDate','lastLevelRewarded','claimedAchievements','tutorial','taskProgress','progressCounters']],
  ['Canteiros e árvores',['plots','orchardTrees','forestTrees']],
  ['Inventário e depósitos',['inventory','warehouse','animalWarehouse','flowerWarehouse','fishWarehouse','seaWarehouse','meatWarehouse','processedWarehouse','bouquets','giftInventory']],
  ['Animais',['animals','dogBreedsOwned','temporaryDogBreeds']],
  ['Áreas e estruturas',['expansions','lake','grill','kitchen','herbMix','fishing','decorInventory','placedDecorations','farmTheme','ownedFarmThemes']],
  ['Catálogo e coleções',['catalog','history','social']]
 ];
 const differences=[];
 for(const [label,keys] of groups){
  const a={},b={};for(const key of keys){a[key]=local?.[key]??null;b[key]=remote?.[key]??null}
  if(JSON.stringify(stableIntegrityValue(a))!==JSON.stringify(stableIntegrityValue(b)))differences.push(label);
 }
 return differences;
}
function renderFarmIntegrityReport(){
 const report=cloudIntegrityReport;if(!report)return '';
 const stamp=report.checkedAt?new Date(report.checkedAt).toLocaleString('pt-BR'):'—';
 if(!report.localValid||!report.cloudValid)return '<div class="gift-summary"><span class="symbol">⚠️</span><div><b>Verificação inconclusiva</b><small>'+(!report.localValid?'Os dados desta sessão não passaram na validação. ':'')+(!report.cloudValid?'O registro da nuvem não passou na validação.':'')+' Nenhuma alteração foi realizada.</small></div></div>';
 const rows=[['Fazenda',report.localSummary.farmName,report.cloudSummary.farmName],['Moedas amarelas',fmt(report.localSummary.coins),fmt(report.cloudSummary.coins)],['Moedas verdes',fmt(report.localSummary.greenCoins),fmt(report.cloudSummary.greenCoins)],['Experiência',fmt(report.localSummary.xp),fmt(report.cloudSummary.xp)],['Canteiros ocupados',report.localSummary.occupiedPlots,report.cloudSummary.occupiedPlots],['Animais',report.localSummary.animals,report.cloudSummary.animals],['Tipos de itens em estoque',report.localSummary.inventoryTypes,report.cloudSummary.inventoryTypes],['Descobertas no catálogo',report.localSummary.catalog,report.cloudSummary.catalog]];
 return '<div class="gift-summary"><span class="symbol">'+(report.differences.length?'⚠️':'✅')+'</span><div><b>'+(report.differences.length?'Divergências encontradas':'Dados consistentes nos grupos verificados')+'</b><small>Verificação em '+safe(stamp)+'. Revisão da nuvem: '+safe(String(report.revision))+(report.updatedAt?' · Atualizada em '+safe(new Date(report.updatedAt).toLocaleString('pt-BR')):'')+'. Nenhum dado foi alterado.</small></div></div>'+(report.differences.length?'<p><b>Grupos com diferenças:</b> '+report.differences.map(safe).join(', ')+'. Compare os detalhes antes de decidir qualquer recuperação.</p>':'')+'<div class="table-wrap"><table><thead><tr><th>Indicador</th><th>Nesta sessão</th><th>Na nuvem</th></tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map(cell=>'<td>'+safe(String(cell))+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
}
async function runFarmIntegrityCheck(){
 if(!cloudUser||!supabaseClient||cloudSessionReadyUserId!==cloudUser.id)return notify('Conecte e carregue sua fazenda na nuvem antes de executar o diagnóstico.');
 if(cloudIntegrityChecking)return;
 cloudIntegrityChecking=true;cloudIntegrityReport=null;
 const button=$('cloud-integrity-check');if(button){button.disabled=true;button.textContent='Verificando dados...'}
 try{
  const localValid=validateFarmSnapshot(state);
  const {data,error}=await supabaseClient.from('farm_saves').select('state,revision,updated_at').eq('user_id',cloudUser.id).maybeSingle();
  if(error)throw error;
  if(!data)throw new Error('Nenhum registro de fazenda foi encontrado na nuvem.');
  const cloudValid=validateFarmSnapshot(data.state);
  const report={checkedAt:Date.now(),localValid,cloudValid,revision:Number(data.revision)||0,updatedAt:data.updated_at||null,localSummary:farmIntegritySummary(state),cloudSummary:farmIntegritySummary(data.state),differences:[]};
  if(localValid&&cloudValid)report.differences=compareFarmIntegrity(state,data.state);
  cloudIntegrityReport=report;
  if(!localValid||!cloudValid)notify('A verificação encontrou um estado inválido. Nenhum dado foi alterado.');
  else if(report.differences.length)notify('Foram encontradas diferenças entre esta sessão e a nuvem. Nenhum dado foi alterado.');
  else notify('Diagnóstico concluído: os grupos verificados estão consistentes.');
 }catch(error){console.error('Diagnóstico de integridade:',error);cloudIntegrityReport={error:error.message||'Falha na consulta'};notify('Não foi possível concluir o diagnóstico: '+(error.message||'verifique sua conexão.'))}
 finally{cloudIntegrityChecking=false;if(currentModal==='account')renderModal()}
}
function normalizeFarmSnapshot(raw){
 if(!validateFarmSnapshot(raw))return null;
 try{return normalize(JSON.parse(JSON.stringify(raw)))}catch(error){console.warn('Snapshot rejeitado durante a normalização:',error);return null}
}
function normalize(data){
 if(!data||!Array.isArray(data.plots)||data.plots.length<BASE_PLOT_COUNT||data.plots.length>PLOT_COUNT||!Number.isFinite(data.coins)||data.coins<0)return null;
 while(data.plots.length<PLOT_COUNT)data.plots.push({status:'grass',soil:'normal',crop:null,plantedAt:null,wateredAt:null,weed:false,pest:false,harvestsRemaining:0});
 data.redSoilApplications=Number.isFinite(data.redSoilApplications)?Math.max(0,Math.floor(data.redSoilApplications)):0;
 data.farmName=typeof data.farmName==='string'?data.farmName.trim().replace(/\s+/g,' ').slice(0,24):'Minha fazenda';
 if(data.farmName.length<2)data.farmName='Minha fazenda';
 data.profilePhoto=typeof data.profilePhoto==='string'&&data.profilePhoto.length<=400000&&/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(data.profilePhoto)?data.profilePhoto:'';
 data.vipUntil=Number.isFinite(data.vipUntil)?Math.max(0,data.vipUntil):0;
 data.dogBreedsOwned=Array.isArray(data.dogBreedsOwned)?[...new Set(data.dogBreedsOwned.filter(id=>DOG_BREEDS[id]))]:[];
 // Migra compras temporárias ainda válidas para propriedade permanente; expiradas não são reativadas.
 const legacyTemporaryDogs=(data.temporaryDogBreeds&&typeof data.temporaryDogBreeds==='object')?data.temporaryDogBreeds:{};
 for(const [id,expiresAt] of Object.entries(legacyTemporaryDogs)){if(DOG_BREEDS[id]&&Number.isFinite(expiresAt)&&expiresAt>Date.now()&&!data.dogBreedsOwned.includes(id))data.dogBreedsOwned.push(id);}
 data.temporaryDogBreeds={};
 if(!data.dogBreedsOwned.includes('classico'))data.dogBreedsOwned.unshift('classico');
 data.inventory=(data.inventory&&typeof data.inventory==='object')?data.inventory:{};
 const forestSeedMoves=[['pinheiro_natal','pinheiro_natal'],['eucalipto','eucalipto'],['pinha','pinha'],['arvore_garrafa','uvaia'],['nepenthes','cambuca']];
 for(const [oldId,newId] of forestSeedMoves){const target='tree_'+newId,legacyKeys=oldId===newId?[oldId]:[oldId,'tree_'+oldId];for(const key of legacyKeys){if(key===target)continue;const qty=Math.max(0,Math.floor(Number(data.inventory[key])||0));if(qty){data.inventory[target]=(Number(data.inventory[target])||0)+qty;data.inventory[key]=0}}}
 data.catalog=Array.isArray(data.catalog)?data.catalog.filter(x=>x&&typeof x.category==='string'&&typeof x.id==='string'&&typeof x.name==='string'&&!(x.category==='caes'&&RETIRED_DOG_BREED_IDS.includes(x.id))).map(x=>({category:x.category,id:x.category==='equipamentos'&&x.id==='rede_extraordinaria_teste'?'rede_lendaria':x.id,name:x.category==='equipamentos'&&x.id==='rede_extraordinaria_teste'?'Rede Lendária':x.name,icon:typeof x.icon==='string'?x.icon:'📌',discoveredAt:Number.isFinite(x.discoveredAt)?x.discoveredAt:Date.now()})):[];
 data.giftInventory=(data.giftInventory&&typeof data.giftInventory==='object')?data.giftInventory:{};
 for(const id of Object.keys(GIFT_ITEMS))data.giftInventory[id]=Number.isFinite(data.giftInventory[id])?Math.max(0,Math.floor(data.giftInventory[id])):0;
 data.expansions=(data.expansions&&typeof data.expansions==='object')?data.expansions:{};data.expansions.orchard=!!data.expansions.orchard;data.expansions.pond=!!data.expansions.pond;data.expansions.haras=!!data.expansions.haras;
 data.lake=(data.lake&&typeof data.lake==='object')?data.lake:{fish:[],decorations:[],bridges:[]};data.lake.fish=Array.isArray(data.lake.fish)?data.lake.fish.filter(f=>f&&LAKE_FISH[f.type]&&typeof f.id==='string').slice(0,10).map(f=>({id:f.id,type:f.type,stage:Math.max(1,Math.min(5,Math.floor(Number(f.stage)||1))),status:['hungry','growing','adult'].includes(f.status)?f.status:'hungry',readyAt:Number.isFinite(f.readyAt)?Math.max(0,f.readyAt):0,createdAt:Number.isFinite(f.createdAt)?f.createdAt:Date.now()})):[];data.lake.decorations=Array.isArray(data.lake.decorations)?data.lake.decorations.filter(d=>DECORATIONS[d.id]&&Number.isInteger(d.slot)&&d.slot>=0&&d.slot<LAKE_DECOR_SLOTS.length):[];data.lake.bridges=Array.isArray(data.lake.bridges)?data.lake.bridges.map((b,i)=>typeof b==='string'?{id:b,slot:i%4}:b).filter(b=>b&&['ponte_carvalho','ponte_azul','ponte_verde','ponte_rubra'].includes(b.id)&&Number.isInteger(b.slot)&&b.slot>=0&&b.slot<4).slice(0,4):[];
 data.orchardTrees=Array.isArray(data.orchardTrees)?data.orchardTrees.slice(0,8):[];while(data.orchardTrees.length<8)data.orchardTrees.push({type:null,status:'empty',plantedAt:0,harvestsRemaining:0});
 data.orchardTrees=data.orchardTrees.map(t=>t&&ORCHARD_CROP_IDS.includes(t.type)&&CROPS[t.type]?{type:t.type,status:['growing','ready'].includes(t.status)?t.status:'growing',plantedAt:Number.isFinite(t.plantedAt)?t.plantedAt:Date.now(),harvestsRemaining:Number.isFinite(t.harvestsRemaining)?Math.max(1,Math.floor(t.harvestsRemaining)):(CROPS[t.type].seasons||1),regrowing:!!t.regrowing}:{type:null,status:'empty',plantedAt:0,harvestsRemaining:0,regrowing:false});
 data.butterflyTreeClaimed=!!data.butterflyTreeClaimed;
 data.warehouse=(data.warehouse&&typeof data.warehouse==='object')?data.warehouse:{};
 data.animalWarehouse=(data.animalWarehouse&&typeof data.animalWarehouse==='object')?data.animalWarehouse:{};
 data.flowerWarehouse=(data.flowerWarehouse&&typeof data.flowerWarehouse==='object')?data.flowerWarehouse:{};
 data.flowerLocks=(data.flowerLocks&&typeof data.flowerLocks==='object')?data.flowerLocks:{};
 data.bouquets=(data.bouquets&&typeof data.bouquets==='object')?data.bouquets:{};
 data.flowers=Number.isFinite(data.flowers)?Math.max(0,data.flowers):0;
 data.animals=Array.isArray(data.animals)?data.animals:starterAnimals();
 data.animals=data.animals.filter(a=>a&&ANIMALS[a.type]&&typeof a.id==='string').map((a,i)=>({...a,breed:a.type==='cachorro'&&DOG_BREEDS[a.breed]&&data.dogBreedsOwned.includes(a.breed)?a.breed:(ANIMALS[a.type].role==='horse'?ANIMALS[a.type].breed:'classico'),level:Number.isFinite(a.level)?Math.max(1,Math.min(10,Math.floor(a.level))):Number.isFinite(a.stage)?Math.max(1,Math.min(10,Math.floor(a.stage))):1,slot:a.type==='cachorro'||isBirdType(a.type)?-1:(Number.isInteger(a.slot)?a.slot:i),aviarySlot:isBirdType(a.type)?(Number.isInteger(a.aviarySlot)&&a.aviarySlot>=0?a.aviarySlot:i):-1,name:typeof a.name==='string'?a.name:ANIMALS[a.type].name,status:ANIMALS[a.type].role==='horse'&&Number(a.stage||a.level||1)>=5?'adult':(['hungry','producing','ready','growing','adult','guarding'].includes(a.status)?a.status:'hungry'),stage:Number.isFinite(a.stage)?Math.max(1,Math.min(ANIMALS[a.type].role==='horse'?5:10,a.stage)):(Number.isFinite(a.level)?Math.max(1,Math.min(ANIMALS[a.type].role==='horse'?5:10,Math.floor(a.level))):1),productionStatus:['producing','ready'].includes(a.productionStatus)?a.productionStatus:(a.status==='producing'?'producing':a.status==='ready'?'ready':'hungry'),productionReadyAt:Number.isFinite(a.productionReadyAt)?a.productionReadyAt:(a.status==='producing'&&Number.isFinite(a.readyAt)?a.readyAt:0),growthStatus:['growing','adult'].includes(a.growthStatus)?a.growthStatus:(a.status==='growing'?'growing':a.status==='adult'&&(Number.isFinite(a.level)?a.level:Number.isFinite(a.stage)?a.stage:1)>=10?'adult':'hungry'),growthReadyAt:Number.isFinite(a.growthReadyAt)?a.growthReadyAt:(a.status==='growing'&&Number.isFinite(a.readyAt)?a.readyAt:0),readyAt:Number.isFinite(a.readyAt)?a.readyAt:0,guardUntil:Number.isFinite(a.guardUntil)?a.guardUntil:0}));
 if(!data.animals.some(a=>a.type==='cachorro'))data.animals.unshift(starterAnimals()[0]);
 if(!data.animals.some(a=>a.type!=='cachorro'))data.animals.push(...starterAnimals().filter(a=>a.type!=='cachorro'));
 const usedHorseSlots=new Set();
 data.animals=data.animals.filter(a=>{
  if(ANIMALS[a.type]?.role!=='horse')return true;
  let slot=a.slot;
  if(!Number.isInteger(slot)||slot<0||slot>=HORSE_SLOTS.length||usedHorseSlots.has(slot))slot=HORSE_SLOTS.findIndex((_,i)=>!usedHorseSlots.has(i));
  if(slot<0)return false;a.slot=slot;usedHorseSlots.add(slot);return true;
 });
 const usedSlots=new Set();
 data.animals=data.animals.filter(a=>{
  if(a.type==='cachorro'||isBirdType(a.type)||ANIMALS[a.type]?.role==='horse')return true;
  let slot=a.slot;
  if(!Number.isInteger(slot)||slot<0||slot>=ANIMAL_SLOTS.length||usedSlots.has(slot))slot=ANIMAL_SLOTS.findIndex((_,i)=>!usedSlots.has(i));
  if(slot<0)return false;
  a.slot=slot;usedSlots.add(slot);return true;
 });
 const usedAviarySlots=new Set();
 data.animals.filter(a=>isBirdType(a.type)).forEach((a,index)=>{
  let slot=a.aviarySlot;
  if(!Number.isInteger(slot)||slot<0||usedAviarySlots.has(slot)){slot=index;while(usedAviarySlots.has(slot))slot++;}
  a.aviarySlot=slot;usedAviarySlots.add(slot);
 });
 data.xp=Number.isFinite(data.xp)?Math.max(0,data.xp):0;data.specialistProgress=(data.specialistProgress&&typeof data.specialistProgress==='object')?data.specialistProgress:{};for(const key of ['chef','grill','lumberjack','carpenter','alchemist','fisher','haras']){const p=data.specialistProgress[key]&&typeof data.specialistProgress[key]==='object'?data.specialistProgress[key]:{};data.specialistProgress[key]={xp:Number.isFinite(p.xp)?Math.max(0,Math.floor(p.xp)):0};}
 const progressionVersion=Number.isFinite(data.xpProgressionVersion)?data.xpProgressionVersion:1;
 if(progressionVersion<2){const oldLevel=1+Math.floor(data.xp/200),oldProgress=(data.xp%200)/200;data.xp=oldLevelXPRequired(oldLevel)+Math.round(oldProgress*oldLevelXPNext(oldLevel));}
 if(progressionVersion<3){const oldLevel=oldLevelFromXP(data.xp),oldProgress=(data.xp-oldLevelXPRequired(oldLevel))/oldLevelXPNext(oldLevel);data.xp=xpRequiredForLevel(oldLevel)+Math.round(oldProgress*xpForNextLevel(oldLevel));}
 data.xpProgressionVersion=3;
 data.greenCoins=Number.isFinite(data.greenCoins)?Math.max(0,data.greenCoins):0;
 data.popularity=Number.isFinite(data.popularity)?Math.max(0,data.popularity):0;
 data.social=(data.social&&typeof data.social==='object')?data.social:{};data.social.friends=Array.isArray(data.social.friends)?data.social.friends.filter(f=>f&&typeof f.id==='string'&&typeof f.farmName==='string').slice(0,100):[];data.social.inbox=Array.isArray(data.social.inbox)?data.social.inbox.filter(m=>m&&typeof m.id==='string'&&typeof m.text==='string').slice(0,200):[];data.social.sent=Array.isArray(data.social.sent)?data.social.sent.filter(m=>m&&typeof m.id==='string').slice(0,200):[];
 data.flowers=Number.isFinite(data.flowers)?Math.max(0,data.flowers):0;
 data.dailyRewardDate=typeof data.dailyRewardDate==='string'?data.dailyRewardDate:'';
 data.dailyStreak=Number.isFinite(data.dailyStreak)?Math.max(0,data.dailyStreak):0;
 data.lastLevelRewarded=Number.isFinite(data.lastLevelRewarded)?Math.max(1,Math.floor(data.lastLevelRewarded)):levelFromXP(data.xp);
 data.mood=MOODS.some(m=>m.id===data.mood)?data.mood:'happy';
 data.moodDate=typeof data.moodDate==='string'?data.moodDate:'';
 data.grill=(data.grill&&typeof data.grill==='object')?data.grill:{owned:false,assembled:false,parts:{}};
 data.grill.owned=!!data.grill.owned;data.grill.assembled=!!data.grill.assembled;data.grill.parts=(data.grill.parts&&typeof data.grill.parts==='object')?data.grill.parts:{};
 for(const id of Object.keys(GRILL_PARTS))data.grill.parts[id]=Number.isFinite(data.grill.parts[id])?Math.max(0,Math.min(GRILL_PARTS_REQUIRED,Math.floor(data.grill.parts[id]))):0;
 if(data.grill.assembled)data.grill.owned=true;
 data.grill.queue=Array.isArray(data.grill.queue)?data.grill.queue.filter(j=>j&&GRILL_RECIPES[j.recipe]&&!GRILL_RECIPES[j.recipe].kitchenOnly&&typeof j.id==='string'&&Number.isFinite(j.startedAt)&&Number.isFinite(j.readyAt)&&j.readyAt>=j.startedAt).slice(-100).map(j=>({...j,quantity:Number.isSafeInteger(j.quantity)?Math.max(1,Math.min(999,j.quantity)):1,outputYield:Number.isSafeInteger(j.outputYield)?Math.max(1,j.outputYield):GRILL_RECIPES[j.recipe].yield*(j.quantity||1),xpEarned:Number.isSafeInteger(j.xpEarned)?Math.max(0,j.xpEarned):GRILL_RECIPES[j.recipe].xp*(j.quantity||1)})):[];
 data.kitchen=(data.kitchen&&typeof data.kitchen==='object')?data.kitchen:{queue:[]};data.kitchen.queue=Array.isArray(data.kitchen.queue)?data.kitchen.queue.filter(j=>j&&GRILL_RECIPES[j.recipe]?.kitchenOnly&&typeof j.id==='string'&&Number.isFinite(j.startedAt)&&Number.isFinite(j.readyAt)&&j.readyAt>=j.startedAt).slice(0,3).map(j=>({...j,quantity:Number.isSafeInteger(j.quantity)?Math.max(1,Math.min(999,j.quantity)):1,outputYield:Number.isSafeInteger(j.outputYield)?Math.max(1,j.outputYield):GRILL_RECIPES[j.recipe].yield*(j.quantity||1),xpEarned:Number.isSafeInteger(j.xpEarned)?Math.max(0,j.xpEarned):GRILL_RECIPES[j.recipe].xp*(j.quantity||1)})):[];
 data.forestPlots=Array.isArray(data.forestPlots)?data.forestPlots.slice(0,FOREST_PLOTS):[];while(data.forestPlots.length<FOREST_PLOTS)data.forestPlots.push({type:null,status:'empty',plantedAt:0});data.forestPlots=data.forestPlots.map(t=>t&&FOREST_TREES[t.type]?{type:t.type,status:['growing','ready'].includes(t.status)?t.status:'growing',plantedAt:Number.isFinite(t.plantedAt)?t.plantedAt:Date.now()}:{type:null,status:'empty',plantedAt:0});
 data.woodWarehouse=(data.woodWarehouse&&typeof data.woodWarehouse==='object')?data.woodWarehouse:{};for(const id of [...new Set(Object.values(FOREST_TREES).map(t=>t.wood))])data.woodWarehouse[id]=Number.isFinite(data.woodWarehouse[id])?Math.max(0,Math.floor(data.woodWarehouse[id])):0;
 data.furnitureWarehouse=(data.furnitureWarehouse&&typeof data.furnitureWarehouse==='object')?data.furnitureWarehouse:{};for(const id of Object.keys(WOODWORK_RECIPES))data.furnitureWarehouse[id]=Number.isFinite(data.furnitureWarehouse[id])?Math.max(0,Math.floor(data.furnitureWarehouse[id])):0;data.carpentry=(data.carpentry&&typeof data.carpentry==='object')?data.carpentry:{queue:[]};data.carpentry.queue=Array.isArray(data.carpentry.queue)?data.carpentry.queue.filter(j=>j&&WOODWORK_RECIPES[j.recipe]&&typeof j.id==='string'&&Number.isFinite(j.startedAt)&&Number.isFinite(j.readyAt)&&j.readyAt>=j.startedAt).slice(-100).map(j=>({...j,xpEarned:Number.isSafeInteger(j.xpEarned)?Math.max(0,j.xpEarned):12,woodConsumed:Number.isSafeInteger(j.woodConsumed)?Math.max(0,j.woodConsumed):WOODWORK_RECIPES[j.recipe].qty})):[];
 data.seaFishing=(data.seaFishing&&typeof data.seaFishing==='object')?data.seaFishing:{};data.seaFishing.nets=Array.isArray(data.seaFishing.nets)?[...new Set(data.seaFishing.nets.map(id=>id==='extraordinaria_teste'?'lendaria':id).filter(id=>SEA_NETS[id]))]:['normal'];if(!data.seaFishing.nets.includes('normal'))data.seaFishing.nets.unshift('normal');if(data.seaFishing.net==='extraordinaria_teste')data.seaFishing.net='lendaria';data.seaFishing.net=SEA_NETS[data.seaFishing.net]&&data.seaFishing.nets.includes(data.seaFishing.net)?data.seaFishing.net:'normal';data.seaFishing.lastCastAt=Number.isFinite(data.seaFishing.lastCastAt)?Math.max(0,data.seaFishing.lastCastAt):0;data.seaFishing.extraordinaryMisses=Number.isFinite(data.seaFishing.extraordinaryMisses)?Math.max(0,Math.min(50,Math.floor(data.seaFishing.extraordinaryMisses))):0;data.seaFishing.pendingCatch=data.seaFishing.pendingCatch&&SEA_TYPES[data.seaFishing.pendingCatch.id]&&Number.isFinite(data.seaFishing.pendingCatch.readyAt)?{id:data.seaFishing.pendingCatch.id,readyAt:data.seaFishing.pendingCatch.readyAt,isExtraordinary:!!data.seaFishing.pendingCatch.isExtraordinary,quantity:1,net:data.seaFishing.pendingCatch.net==='extraordinaria_teste'?'lendaria':(data.seaFishing.pendingCatch.net&&SEA_NETS[data.seaFishing.pendingCatch.net]?data.seaFishing.pendingCatch.net:data.seaFishing.net)}:null;
 data.seaWarehouse=(data.seaWarehouse&&typeof data.seaWarehouse==='object')?data.seaWarehouse:{};for(const id of Object.keys(SEA_TYPES))data.seaWarehouse[id]=Number.isFinite(data.seaWarehouse[id])?Math.max(0,Math.floor(data.seaWarehouse[id])):0;const legacyCaviarStock=data.seaWarehouse.caviar||0;if(legacyCaviarStock){data.inventory.caviar=(Number(data.inventory.caviar)||0)+legacyCaviarStock;data.seaWarehouse.caviar=0;}data.inventory.caviar=Math.max(0,Math.floor(Number(data.inventory.caviar)||0));
 data.fishing=(data.fishing&&typeof data.fishing==='object')?data.fishing:{};data.fishing.rods=Array.isArray(data.fishing.rods)?[...new Set(data.fishing.rods.filter(id=>FISHING_RODS[id]))]:['normal'];if(!data.fishing.rods.includes('normal'))data.fishing.rods.unshift('normal');data.fishing.rod=FISHING_RODS[data.fishing.rod]&&data.fishing.rods.includes(data.fishing.rod)?data.fishing.rod:'normal';data.fishing.lastCastAt=Number.isFinite(data.fishing.lastCastAt)?Math.max(0,data.fishing.lastCastAt):0;data.fishing.extraordinaryMisses=Number.isFinite(data.fishing.extraordinaryMisses)?Math.max(0,Math.min(40,Math.floor(data.fishing.extraordinaryMisses))):0;data.fishing.pendingCatch=data.fishing.pendingCatch&&FISH_TYPES[data.fishing.pendingCatch.id]&&Number.isFinite(data.fishing.pendingCatch.readyAt)?{id:data.fishing.pendingCatch.id,readyAt:data.fishing.pendingCatch.readyAt,isExtraordinary:!!data.fishing.pendingCatch.isExtraordinary,rod:data.fishing.pendingCatch.rod&&FISHING_RODS[data.fishing.pendingCatch.rod]?data.fishing.pendingCatch.rod:data.fishing.rod}:null;
 data.fishWarehouse=(data.fishWarehouse&&typeof data.fishWarehouse==='object')?data.fishWarehouse:{};for(const id of Object.keys(FISH_TYPES))data.fishWarehouse[id]=Number.isFinite(data.fishWarehouse[id])?Math.max(0,Math.floor(data.fishWarehouse[id])):0;
 data.meatWarehouse=(data.meatWarehouse&&typeof data.meatWarehouse==='object')?data.meatWarehouse:{};
 data.meatLocks=(data.meatLocks&&typeof data.meatLocks==='object')?data.meatLocks:{};
 data.processedWarehouse=(data.processedWarehouse&&typeof data.processedWarehouse==='object')?data.processedWarehouse:{};
 data.processedLocks=(data.processedLocks&&typeof data.processedLocks==='object')?data.processedLocks:{};
 data.warehouseLocks=(data.warehouseLocks&&typeof data.warehouseLocks==='object')?data.warehouseLocks:{};
 for(const id of FIELD_CROP_IDS){if(typeof data.warehouseLocks[id]!=='boolean')data.warehouseLocks[id]=false;if(!Number.isFinite(data.warehouse[id])||data.warehouse[id]<0)data.warehouse[id]=0;}
 for(const id of Object.keys(MEAT_PRODUCTS)){if(!Number.isFinite(data.meatWarehouse[id])||data.meatWarehouse[id]<0)data.meatWarehouse[id]=0;if(typeof data.meatLocks[id]!=='boolean')data.meatLocks[id]=true;}
 for(const id of Object.keys(GRILL_RECIPES)){if(!Number.isFinite(data.processedWarehouse[id])||data.processedWarehouse[id]<0)data.processedWarehouse[id]=0;if(typeof data.processedLocks[id]!=='boolean')data.processedLocks[id]=true;}
 data.decorInventory=(data.decorInventory&&typeof data.decorInventory==='object')?data.decorInventory:{};
 for(const id of Object.keys(DECORATIONS))data.decorInventory[id]=Number.isFinite(data.decorInventory[id])?Math.max(0,Math.floor(data.decorInventory[id])):0;
 data.placedDecorations=Array.isArray(data.placedDecorations)?data.placedDecorations.filter(d=>d&&DECORATIONS[d.id]&&Number.isInteger(d.slot)&&d.slot>=0&&d.slot<12).map(d=>{const installedAt=Number.isFinite(d.installedAt)?d.installedAt:Date.now(),expiresAt=Number.isFinite(d.expiresAt)?d.expiresAt:installedAt+30*24*HOUR;return {...d,installedAt,expiresAt}}).filter(d=>d.expiresAt>Date.now()).slice(0,12):[];
 data.farmThemeExpiries=(data.farmThemeExpiries&&typeof data.farmThemeExpiries==='object')?data.farmThemeExpiries:{};
 data.ownedFarmThemes=Array.isArray(data.ownedFarmThemes)?[...new Set(data.ownedFarmThemes.filter(id=>FARM_THEMES[id]&&id!=='classic'))]:[];
 for(const id of Object.keys(data.farmThemeExpiries))if(FARM_THEMES[id]&&id!=='classic'&&!data.ownedFarmThemes.includes(id))data.ownedFarmThemes.push(id);
 if(FARM_THEMES[data.farmTheme]&&data.farmTheme!=='classic'&&!data.ownedFarmThemes.includes(data.farmTheme))data.ownedFarmThemes.push(data.farmTheme);
 data.farmTheme=FARM_THEMES[data.farmTheme]&&(data.farmTheme==='classic'||data.ownedFarmThemes.includes(data.farmTheme))?data.farmTheme:'classic';
 data.farmThemeExpiries={};
 data.history=Array.isArray(data.history)?data.history:[];
 data.tutorial=(data.tutorial&&typeof data.tutorial==='object')?data.tutorial:{acceptedId:null,completed:[],finished:false};data.tutorial.completed=Array.isArray(data.tutorial.completed)?[...new Set(data.tutorial.completed.filter(id=>TUTORIAL_TASKS.some(t=>t.id===id)))]:[];data.tutorial.acceptedId=TUTORIAL_TASKS.some(t=>t.id===data.tutorial.acceptedId)&&!data.tutorial.completed.includes(data.tutorial.acceptedId)?data.tutorial.acceptedId:null;data.tutorial.finished=!!data.tutorial.finished||data.tutorial.completed.length===TUTORIAL_TASKS.length;data.taskProgress=(data.taskProgress&&typeof data.taskProgress==='object')?data.taskProgress:{};for(const t of TUTORIAL_TASKS)data.taskProgress[t.id]=Number.isFinite(data.taskProgress[t.id])?Math.max(0,Math.min(t.goal,Math.floor(data.taskProgress[t.id]))):0;data.mobileShortcuts=Array.isArray(data.mobileShortcuts)?[...new Set(data.mobileShortcuts.filter(x=>['shop','kitchen','animals','friends','catalog','tasks','inventory','warehouse','orchard','pond','sea','forest','decor','inbox'].includes(x)))].slice(0,4):['shop','kitchen','animals','friends'];data.progressCounters=(data.progressCounters&&typeof data.progressCounters==='object')?data.progressCounters:{};for(const k of ['harvest','plant','water','sell','animal','feed','produce','fish','cook','explore','discover'])data.progressCounters[k]=Number.isFinite(data.progressCounters[k])?Math.max(0,Math.floor(data.progressCounters[k])):0;data.missionDay=typeof data.missionDay==='string'?data.missionDay:todayKey();data.missionWeek=typeof data.missionWeek==='string'?data.missionWeek:missionWeekKey();data.missionDailyProgress=data.missionDailyProgress&&typeof data.missionDailyProgress==='object'?data.missionDailyProgress:{};data.missionWeeklyProgress=data.missionWeeklyProgress&&typeof data.missionWeeklyProgress==='object'?data.missionWeeklyProgress:{};data.missionDailyClaims=Array.isArray(data.missionDailyClaims)?data.missionDailyClaims:[];data.missionWeeklyClaims=Array.isArray(data.missionWeeklyClaims)?data.missionWeeklyClaims:[];data.unlockedTitles=Array.isArray(data.unlockedTitles)?[...new Set(data.unlockedTitles.filter(x=>typeof x==='string'&&x.length<=60))]:[];data.activeTitle=typeof data.activeTitle==='string'&&data.unlockedTitles.includes(data.activeTitle)?data.activeTitle:'';if(data.missionDay!==todayKey()){data.missionDay=todayKey();data.missionDailyProgress={};data.missionDailyClaims=[]}if(data.missionWeek!==missionWeekKey()){data.missionWeek=missionWeekKey();data.missionWeeklyProgress={};data.missionWeeklyClaims=[]}data.claimedAchievements=Array.isArray(data.claimedAchievements)?[...new Set(data.claimedAchievements.filter(id=>ACHIEVEMENTS.some(a=>a.id===id)))]:[];
 for(const id of CROP_IDS)if(!Number.isFinite(data.inventory[id]))data.inventory[id]=0;
 for(const id of ['fertilizer','superFertilizer','fertilizer_250','fertilizer_550','sunlightFertilizer','loveFertilizer','fertilizer_15h','surfConcentrate','feed_dog','feed_chicken','feed_cow','feed_sheep','feed_pig','feed_donkey','feed_duck','feed_pigeon','feed_peacock','feed_yak','feed_bull','feed_goat','feed_buffalo','feed_rabbit','feed_growers','feed_producers','ration_chicken','ration_cow','ration_pig','honey','seasoning','banana_leaf','dende_oil','redSoilWand','restoreSoilWand'])if(!Number.isFinite(data.inventory[id]))data.inventory[id]=0;
 for(const id of Object.keys(ANIMAL_PRODUCTS))if(!Number.isFinite(data.animalWarehouse[id])||data.animalWarehouse[id]<0)data.animalWarehouse[id]=0;
 for(const id of FLOWER_IDS){if(!Number.isFinite(data.flowerWarehouse[id])||data.flowerWarehouse[id]<0)data.flowerWarehouse[id]=0;if(typeof data.flowerLocks[id]!=='boolean')data.flowerLocks[id]=true;}
 for(const id of BOUQUET_IDS)if(!Number.isFinite(data.bouquets[id])||data.bouquets[id]<0)data.bouquets[id]=0;
 for(const plot of data.plots){if(!plot||!['grass','dirt','spent','growing'].includes(plot.status))return null;if(plot.status==='growing'&&(!CROPS[plot.crop]||!Number.isFinite(plot.plantedAt)))return null;plot.soil=plot.soil==='red'?'red':'normal';plot.weed=!!plot.weed;plot.pest=!!plot.pest;plot.wateredAt=Number.isFinite(plot.wateredAt)?plot.wateredAt:plot.plantedAt;plot.harvestsRemaining=Number.isFinite(plot.harvestsRemaining)?Math.max(1,plot.harvestsRemaining):1;}
 catalogLegacySeed(data);
 return data;
}
function oldLevelXPNext(level){return 200+(Math.max(1,Math.floor(level))-1)*8}
function oldLevelXPRequired(level){const n=Math.max(0,Math.floor(level)-1);return 200*n+4*n*(n-1)}
function oldLevelFromXP(xp){const value=Math.max(0,Number(xp)||0),n=Math.max(0,Math.floor((-196+Math.sqrt(38416+16*value))/8));return n+1}
// Nova curva aumenta o custo por nível em 16 XP (antes, 8 XP).
function xpForNextLevel(level){return 200+(Math.max(1,Math.floor(level))-1)*16}
function xpRequiredForLevel(level){const n=Math.max(0,Math.floor(level)-1);return 200*n+8*n*(n-1)}
function levelFromXP(xp){const value=Math.max(0,Number(xp)||0),n=Math.max(0,Math.floor((-192+Math.sqrt(36864+32*value))/16));return n+1}
function farmLevel(){return levelFromXP(state.xp)}
function nextLockedPlotIndex(){return state.plots.findIndex((p,i)=>i>=24&&i<EXPANSION_PLOT_START&&p.status==='grass')}
function unlockedExpansionPlotCount(){return Math.max(0,Math.min(36,farmLevel()-49))}
function syncLevelPlotUnlocks(){if(writeLocked||!state?.plots)return false;const count=unlockedExpansionPlotCount();let unlocked=[];for(let n=0;n<count;n++){const index=EXPANSION_PLOT_START+n,p=state.plots[index];if(p&&p.status==='grass'){Object.assign(p,{status:'dirt',soil:p.soil||'normal',crop:null,plantedAt:null,wateredAt:null,weed:false,pest:false,harvestsRemaining:0});unlocked.push({number:index+1,level:50+n})}}if(unlocked.length){for(const item of unlocked)remember('Canteiro '+item.number+' liberado automaticamente no nível '+item.level+'.');markDirty()}return unlocked.length>0}
function plotUnlockCost(index){return index>=30?2200:1500}
function buyNextPlot(){if(writeLocked)return notify('Salvamento protegido.');const index=nextLockedPlotIndex();if(index<0)return notify('Todos os 36 canteiros da primeira área já estão liberados.');const required=index>=30?10:1,cost=plotUnlockCost(index);if(farmLevel()<required)return notify(`A expansão seguinte exige nível ${required}.`);if(state.coins<cost)return notify(`Você precisa de ${fmt(cost)} moedas amarelas para liberar este canteiro.`);state.coins-=cost;Object.assign(state.plots[index],{status:'dirt',soil:'normal',crop:null,plantedAt:null,wateredAt:null,weed:false,pest:false,harvestsRemaining:0});awardXP(15,'expansão da fazenda');remember(`Liberou o canteiro ${index+1} por ${fmt(cost)} moedas.`);markDirty();refresh();notify(`Canteiro ${index+1} liberado!`)}
function redSoilCost(){return {coins:0,green:0}}
function buySoilWand(kind,currency='green'){if(writeLocked)return notify('Salvamento protegido.');if(kind==='red'){if((state.inventory.redSoilWand||0)>0)return notify('Você já possui a Varinha da Terra Vermelha reutilizável.');const green=currency==='green',price=green?2:30000,wallet=green?'greenCoins':'coins';if(state[wallet]<price)return notify(green?'A Varinha da Terra Vermelha custa 2 moedas verdes.':'A Varinha da Terra Vermelha custa 30.000 moedas amarelas.');state[wallet]-=price;state.inventory.redSoilWand=1;remember('Comprou a Varinha da Terra Vermelha reutilizável.');markDirty();refresh();return notify('Varinha da Terra Vermelha comprada! As aplicações são gratuitas e reutilizáveis.')}if(kind==='restore'){const price=3000;if(state.coins<price)return notify('A Varinha de Restauração custa 3.000 moedas amarelas.');state.coins-=price;state.inventory.restoreSoilWand=(state.inventory.restoreSoilWand||0)+1;remember('Comprou uma Varinha de Restauração.');markDirty();refresh();return notify('Varinha de Restauração adicionada aos itens.')}}
function applySoilWand(plot,kind){if(!farmWriteAllowed())return;if(plot.status==='grass')return notify('Libere este canteiro na loja antes de alterar o solo.');if(plot.status==='growing')return notify('Aguarde a colheita antes de alterar o solo deste canteiro.');if(kind==='red'){if(plot.soil==='red')return notify('Este canteiro já está com terra vermelha.');if((state.inventory.redSoilWand||0)<=0)return notify('Compre a Varinha da Terra Vermelha na loja.');state.redSoilApplications=(state.redSoilApplications||0)+1;plot.soil='red';remember(`Aplicou terra vermelha gratuitamente no canteiro ${lastSelected+1}.`);markDirty();refresh();notify('Terra vermelha aplicada gratuitamente! A varinha continua reutilizável.');return}if(plot.soil!=='red')return notify('Este canteiro já está com terra normal.');if((state.inventory.restoreSoilWand||0)<=0)return notify('Compre uma Varinha de Restauração por 3.000 moedas amarelas na loja.');state.inventory.restoreSoilWand--;plot.soil='normal';remember('Restaurou um canteiro para terra normal; o custo anterior da terra vermelha não foi reembolsado.');markDirty();refresh();notify('Terra normal restaurada. O custo anterior não é reembolsado.');if(!(state.inventory.restoreSoilWand||0))setTool('inspect')}
function buyVIPCard(){
 if(writeLocked)return notify('Salvamento protegido.');const price=100;if(state.greenCoins<price)return notify('O Cartão VIP custa 100 moedas verdes.');
 state.greenCoins-=price;state.vipUntil=Math.max(Date.now(),Number(state.vipUntil)||0)+30*24*HOUR;remember('Ativou o Cartão VIP por 30 dias.');markDirty();refresh();notify('Cartão VIP ativado por 30 dias! Sementes VIP liberadas enquanto estiver válido.')
}
function buyFertilizer(id){
 if(writeLocked)return notify('Salvamento protegido.');
 const cfg=FERTILIZERS[id];if(!cfg||cfg.currency==='gift')return notify('Este fertilizante é obtido como presente diário.');
 const wallet=cfg.currency==='greenCoins'?'greenCoins':'coins';
 if(state[wallet]<cfg.price)return notify(`Saldo insuficiente para comprar ${cfg.name}.`);
 state[wallet]-=cfg.price;state.inventory[id]=(state.inventory[id]||0)+1;
 remember(`Comprou ${cfg.name}.`);markDirty();refresh();notify(`${cfg.name} adicionado aos itens.`)
}
function useFertilizerOnPlot(plot){if(!farmWriteAllowed())return;
 if(plot.status!=='growing')return notify('Selecione uma planta em crescimento para adubar.');
 const id=chosenFertilizer||'quick',key=id==='quick'?'fertilizer':id,cfg=FERTILIZERS[id];
 if(cfg?.flowerOnly&&CROPS[plot.crop]?.kind!=='flower')return notify('O Surf Líquido Concentrado só pode ser usado em flores.');
 if((state.inventory[key]||0)<=0)return notify(id==='quick'?'Você não tem fertilizante rápido.':'Você não possui este fertilizante.');
 const duration=cropHours(plot.crop,plot.regrowing)*HOUR,elapsed=Date.now()-plot.plantedAt,remaining=Math.max(0,duration-elapsed);
 if(remaining<=0)return notify('Esta planta já está pronta para colher.');
 const boost=id==='quick'?remaining*.3:Math.min(remaining,cfg.hours*CROP_TIME_FACTOR*HOUR);
 if(boost<=0)return notify('Esta planta já está pronta para colher.');
 plot.plantedAt-=boost;playSfx('fertilizer');state.inventory[key]--;remember(`Aplicou ${id==='quick'?'fertilizante rápido':cfg.name} em ${CROPS[plot.crop].name}.`);markDirty();refresh();
 notify(`${id==='quick'?'Fertilizante rápido aplicado':cfg.name+' aplicado'}: -${formatHours(boost/HOUR)} no tempo restante.`)
}
function focusFarmArea(id,close=true){if(id==='lake'){switchFarmScene('river');view.zoom=1.15;view.cx=-980;view.cy=760;updateView();if(close)closeModal();return}if(id==='haras'){if(!state?.expansions?.haras)return notify('Libere primeiro o Haras nas Expansões.');switchFarmScene('farm');view.zoom=1.25;view.cx=-380;view.cy=330;updateView();if(close)closeModal();return}if(id==='new-fields'){switchFarmScene('river');view.zoom=1.05;view.cx=-1550;view.cy=280;updateView();if(close)closeModal();return}if(id==='orchard'&&!state?.expansions?.orchard)return notify('Libere primeiro o Pomar nas Expansões.');if(id==='pond'&&!state?.expansions?.pond)return notify('Libere primeiro o Rio nas Expansões.');if(id==='forest'){focusForestArea(close);return}if(id==='pond'){switchFarmScene('river');view.zoom=sceneFitZoom('river');view.cx=-1850;view.cy=650;updateView();if(close)closeModal();return}if(id==='orchard'){switchFarmScene('nature');view.zoom=1.0;view.cx=3600;view.cy=300;updateView();if(close)closeModal();return}switchFarmScene('farm');view.zoom=1.45;view.cx=0;view.cy=420;updateView();if(close)closeModal()}
function buyExpansion(id,currency='coins'){
 if(writeLocked)return notify('Salvamento protegido.');const cfg=AREA_CONFIG[id];if(!cfg)return;
 if(state.expansions[id])return notify(cfg.name+' já está liberado.');
 if(farmLevel()<cfg.level)return notify(cfg.name+' exige nível '+cfg.level+'.');
 const wallet=id==='haras'&&currency==='greenCoins'?'greenCoins':'coins',price=wallet==='greenCoins'?(cfg.greenPrice||0):cfg.price;
 if(state[wallet]<price)return notify(wallet==='greenCoins'?'Moedas verdes insuficientes para liberar o Haras.':'Você precisa de '+fmt(price)+' moedas amarelas para liberar '+cfg.name+'.');
 state[wallet]-=price;state.expansions[id]=true;awardXP(80,'expansão da propriedade');remember('Liberou a área: '+cfg.name+'.');markDirty();refresh();notify(cfg.name+' liberado!');
}
function orchardTreeProgress(tree){if(!tree?.type||!tree.plantedAt)return 0;return Math.max(0,Math.min(1,(Date.now()-tree.plantedAt)/(cropHours(tree.type,!!tree.regrowing)*HOUR)))}
function syncOrchardTrees(){if(!farmWriteAllowed(false))return false;if(writeLocked||!state?.expansions?.orchard)return false;let changed=false;for(const t of state.orchardTrees||[]){if(t.type&&t.status==='growing'&&orchardTreeProgress(t)>=1){t.status='ready';changed=true;remember(`${CROPS[t.type].name} do pomar está pronta para colher.`)}}if(changed)markDirty(true);return changed}
function plantOrchardTree(slot,id){
 if(writeLocked)return notify('Salvamento protegido.');if(!state.expansions.orchard)return notify('Libere primeiro a área do Pomar.');
 const tree=state.orchardTrees[slot],crop=CROPS[id];if(!tree||tree.type||!ORCHARD_CROP_IDS.includes(id)||!crop)return notify('Escolha um espaço vazio e uma árvore válida.');
 if((state.inventory[id]||0)<=0)return notify(`Você não possui a semente de ${crop.name}. Compre-a na loja.`);
 if(!cropLevelAllowed(crop))return notify(`Você precisa alcançar o nível ${crop.minLevel||1} ou ativar um Cartão VIP válido.`);
 state.inventory[id]--;discoverItem('pomar',id,crop.name,crop.icon);state.orchardTrees[slot]={type:id,status:'growing',plantedAt:Date.now(),harvestsRemaining:crop.seasons||1,regrowing:false};
 awardXP(8,'plantio de árvore no pomar');playSfx('plant');remember(`Plantou ${crop.name} no Pomar.`);markDirty();refresh();notify(`${crop.name} plantada no Pomar. O ciclo segue a redução de 1/5.`)
}
function harvestOrchardTree(slot){
 if(writeLocked)return notify('Salvamento protegido.');const tree=state.orchardTrees?.[slot];if(!tree?.type)return openModal('orchard');
 const crop=CROPS[tree.type];if(tree.status!=='ready'&&orchardTreeProgress(tree)<1){return notify(`${crop.name}: faltam ${formatHours((1-orchardTreeProgress(tree))*cropHours(tree.type,!!tree.regrowing))}.`)}
 state.warehouse[tree.type]=(state.warehouse[tree.type]||0)+crop.yield;const orchardLeafMap={manga:'folha_manga',goiaba:'folha_goiaba',acerola:'folha_acerola',eucalipto:'folha_eucalipto',cana:'folha_cana'};if(orchardLeafMap[tree.type]){const leaf='herb_'+orchardLeafMap[tree.type];state.inventory[leaf]=(state.inventory[leaf]||0)+Math.max(1,Math.floor(crop.yield/4));}const xp=Math.floor(crop.xp/(crop.seasons||1));awardXP(xp,'colheita do pomar');playSfx('harvest');tree.harvestsRemaining=Math.max(0,(tree.harvestsRemaining||1)-1);
 if(tree.type==='pinheiro_natal'&&tree.harvestsRemaining<=1){state.decorInventory.christmas_tree=(state.decorInventory.christmas_tree||0)+1;remember('Recebeu um Pinheiro de Natal decorável no Pomar.')}if(tree.harvestsRemaining>0){tree.status='growing';tree.plantedAt=Date.now();tree.regrowing=true}else state.orchardTrees[slot]={type:null,status:'empty',plantedAt:0,harvestsRemaining:0,regrowing:false};
 remember(`Colheu ${crop.yield} ${crop.name} no Pomar.`);markDirty();refresh();notify(`Pomar: ${crop.yield} ${crop.name} recolhidos · +${xp} XP.`)
}
function buyGiftItem(id){
 if(writeLocked)return notify('Salvamento protegido.');const gift=GIFT_ITEMS[id];if(!gift)return;
 if(state.coins<gift.price)return notify('Moedas amarelas insuficientes para este presente.');state.coins-=gift.price;state.giftInventory[id]=(state.giftInventory[id]||0)+1;discoverItem('colecoes','presente_'+id,gift.name,'🎁');remember(`Adicionou ${gift.name} à coleção de presentes.`);markDirty();refresh();notify(`${gift.name} adicionado à coleção.`)
}
function orchardTreeMarkup(slot,tree){
 const [x,y]=ORCHARD_SLOTS[slot],crop=tree?.type?CROPS[tree.type]:null,ready=tree?.status==='ready'||(tree?.type&&orchardTreeProgress(tree)>=1);
 if(!crop)return `<g class="orchard-tree-slot" data-orchard-slot="${slot}" transform="translate(${x} ${y})" style="cursor:pointer;pointer-events:all"><ellipse cy="14" rx="60" ry="14" fill="#285c1c" opacity=".22"/><ellipse cy="0" rx="48" ry="19" fill="#8b6038" stroke="#67421f" stroke-width="5"/><path d="M-28 -2L-18 -19L0 -26L18 -19L28 -2" fill="#b37b43" stroke="#76502a" stroke-width="4"/><text y="-42" text-anchor="middle" font-size="18" fill="#fff4ce" stroke="#65451f" stroke-width="2" paint-order="stroke">＋ Plantar</text></g>`;
 const colors={maca:'#d83b37',laranja:'#f28a25',goiaba:'#e58d8c',limao:'#d4d83e',coco:'#8c5731',arvore_jujuba:'#e67eb7',arvore_pirulito:'#df4f87',arvore_romantica_chinesa:'#e78bbd',pinheiro_natal:'#d3b34d',arvore_namorados:'#e75b91',carambola:'#e8c63b',acerola:'#c92d43',jaca:'#a6b43d',caju:'#e98a38',pera:'#9ab34b',jabuticaba:'#49304f',guarana:'#a82f3b',mamao:'#e88d45'};
 const fruit=colors[tree.type]||crop.fruit||'#d4a13a',progress=orchardTreeProgress(tree),count=ready?6:Math.max(0,Math.floor(progress*6)),treeHue=({maca:'hue-rotate(-8deg) saturate(1.3)',laranja:'hue-rotate(18deg) saturate(1.25)',limao:'hue-rotate(48deg) saturate(1.35)',coco:'sepia(.25) saturate(.8)',jabuticaba:'hue-rotate(55deg) saturate(1.4)',pinheiro_natal:'hue-rotate(25deg) saturate(1.5)',arvore_jujuba:'hue-rotate(-28deg) saturate(1.5)',caju:'hue-rotate(10deg) saturate(1.35)',goiaba:'hue-rotate(-15deg) saturate(1.3)'})[tree.type]||'saturate(1.08)';
 const fruits=Array.from({length:count},(_,i)=>{const a=i*2.4;return `<circle cx="${Math.cos(a)*56}" cy="${-178+Math.sin(a)*23}" r="9" fill="${fruit}" stroke="#80512c" stroke-width="3"/><circle cx="${Math.cos(a)*56-2}" cy="${-181+Math.sin(a)*23}" r="2.5" fill="#fff0bd" opacity=".75"/>`}).join('');
 return `<g class="orchard-tree" data-orchard-slot="${slot}" transform="translate(${x} ${y})" style="cursor:pointer;pointer-events:all"><ellipse cy="17" rx="88" ry="16" fill="#245b18" opacity=".25"/><rect x="-100" y="-270" width="200" height="320" fill="transparent" pointer-events="all"/><image href="/assets/arvore.png" x="-94" y="-265" width="188" height="265" preserveAspectRatio="none" pointer-events="none" style="filter:${treeHue}"/>${fruits}${ready?'<circle cx="75" cy="-230" r="17" fill="#f4d55f" stroke="#a8742c" stroke-width="3"/><path d="M75-242V-218M63-230H87" stroke="#fff8dc" stroke-width="4"/>':''}<text y="43" text-anchor="middle" font-size="15" font-weight="bold" fill="#fff5d4" stroke="#5d421e" stroke-width="3" paint-order="stroke">${ready?'PRONTA':`${Math.round(progress*100)}%`}</text><title>${crop.name} · ${ready?'Clique para colher':formatHours((1-progress)*cropHours(tree.type,!!tree.regrowing))+' restantes'}</title></g>`;
}
function renderHarasArea(){
 if(!state?.expansions?.haras)return '';
 const outline='M-1030 -315Q-1030 -385 -955 -385H-465Q-390 -385 -390 -315V-145Q-390 -75 -465 -75H-955Q-1030 -75 -1030 -145Z';
 const posts=[[-1015,-315],[-955,-385],[-820,-385],[-650,-385],[-485,-385],[-405,-315],[-405,-145],[-485,-75],[-650,-75],[-820,-75],[-955,-75],[-1015,-145]];
 const postMarkup=posts.map(([x,y])=>'<g transform="translate('+x+' '+y+')"><path d="M0 -20V23" stroke="#52371f" stroke-width="17" stroke-linecap="round"/><path d="M0 -19V21" stroke="#b77c45" stroke-width="10" stroke-linecap="round"/><path d="M-4 -17V14" stroke="#e2b777" stroke-width="2.5" opacity=".8"/></g>').join('');
 return '<g id="haras-area" pointer-events="none" transform="translate(380 1080)">'+
  '<path d="'+outline+'" fill="#6e9e45" stroke="#426b31" stroke-width="20" stroke-linejoin="round"/>'+
  '<path d="M-1000 -315Q-985 -355 -930 -355H-490Q-435 -355 -420 -315V-145Q-435 -105 -490 -105H-930Q-985 -105 -1000 -145Z" fill="#8bb957" stroke="#c3d98a" stroke-width="5"/>'+
  '<path d="M-965 -270Q-700 -320 -455 -270M-965 -180Q-700 -130 -455 -180" fill="none" stroke="#a9c86b" stroke-width="5" opacity=".55"/>'+
  '<ellipse cx="-700" cy="-230" rx="205" ry="76" fill="#c3a174" opacity=".9" stroke="#967047" stroke-width="7"/>'+
  '<ellipse cx="-700" cy="-230" rx="184" ry="57" fill="none" stroke="#e3c79a" stroke-width="4" stroke-dasharray="10 12" opacity=".85"/>'+
  '<path d="'+outline+'" fill="none" stroke="#6b4528" stroke-width="13" stroke-linejoin="round"/>'+
  '<path d="M-1030 -300Q-700 -350 -390 -300M-1030 -160Q-700 -110 -390 -160" fill="none" stroke="#d5a36a" stroke-width="9" stroke-linecap="round"/>'+
  '<path d="M-1030 -245Q-700 -295 -390 -245" fill="none" stroke="#d5a36a" stroke-width="7" stroke-linecap="round"/>'+
  '<g>'+postMarkup+'</g>'+
  '<g transform="translate(-710 -405)"><path d="M-115 0L-92 -45H92L115 0V45H-115Z" fill="#744a2b" stroke="#49301e" stroke-width="6"/><path d="M-99 2H99V32H-99Z" fill="#f0d49a" stroke="#956331" stroke-width="4"/><text y="26" text-anchor="middle" font-size="25" font-weight="900" letter-spacing="2" fill="#70451f">HARAS</text></g>'+
  '<g transform="translate(-710 -77)"><path d="M-58 0V-43M58 0V-43" stroke="#52371f" stroke-width="17"/><path d="M-58 -43V-2M58 -43V-2" stroke="#b77c45" stroke-width="10"/><path d="M-53 -34L53 -34M-53 -10H53" stroke="#704a2d" stroke-width="10" stroke-linecap="round"/><path d="M-48 -34L48 -10" stroke="#e2b777" stroke-width="3"/></g>'+
 '</g>';
}
function renderOrchardArea(){
  if(!state?.expansions?.orchard)return '';
  let html=`<g id="orchard-area-position" transform="translate(350 0)"><g id="orchard-ground" pointer-events="none">
   <!-- Pomar reposicionado para cima, com afastamento claro da estrada e de sua cerca. -->
   <path d="M2075 335Q2075 245 2185 230L3125 230Q3240 245 3250 345L3240 535Q3230 615 3130 630L2185 630Q2075 615 2065 535Z" fill="#75452f" stroke="#51301f" stroke-width="17" stroke-linejoin="round"/>
   <path d="M2095 338Q2095 265 2195 250L3115 250Q3220 265 3230 350L3220 525Q3210 595 3120 610L2195 610Q2095 595 2085 525Z" fill="#9a6240" stroke="#c18a5c" stroke-width="7" stroke-linejoin="round"/>
   <path d="M2120 405Q2360 370 2540 400T2900 395T3200 405M2110 525Q2350 495 2550 525T2910 520T3210 530" fill="none" stroke="#68412d" stroke-width="12" stroke-linecap="round" opacity=".28"/>
   <path d="M2150 350Q2370 330 2560 355T2920 350T3180 360M2140 570Q2370 550 2570 575T2930 570T3170 580" fill="none" stroke="#d2a078" stroke-width="5" stroke-linecap="round" opacity=".32"/>
   <g fill="#6f4933" opacity=".34"><ellipse cx="2220" cy="480" rx="18" ry="6"/><ellipse cx="2510" cy="430" rx="14" ry="5"/><ellipse cx="2810" cy="480" rx="20" ry="6"/><ellipse cx="3110" cy="450" rx="17" ry="5"/><ellipse cx="2350" cy="585" rx="19" ry="5"/><ellipse cx="2940" cy="590" rx="16" ry="5"/></g>
   <!-- Cerca regular: lateral esquerda com abertura para porteira. -->
   <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2070 335Q2075 220 2190 205H3120Q3260 225 3270 345" stroke="#523725" stroke-width="16"/>
    <path d="M2070 335Q2075 220 2190 205H3120Q3260 225 3270 345" stroke="#bd8954" stroke-width="8"/>
    <path d="M2070 490V535Q2080 645 2190 655H3130Q3250 640 3260 535V345" stroke="#523725" stroke-width="16"/>
    <path d="M2070 490V535Q2080 645 2190 655H3130Q3250 640 3260 535V345" stroke="#bd8954" stroke-width="8"/>
    <path d="M2070 335V390M2070 470V490" stroke="#523725" stroke-width="16"/>
   </g>
   <g fill="#70482d" stroke="#4b3324" stroke-width="4">
    <path d="M2058 310l25-3 7 78-25 3Z"/><path d="M2058 455l25-3 7 78-25 3Z"/>
    <path d="M2175 175l27-2 4 76-27 2Z"/><path d="M2400 175l27-2 2 76-27 2Z"/>
    <path d="M2630 175l27-2 2 76-27 2Z"/><path d="M2860 175l27-2 2 76-27 2Z"/>
    <path d="M3105 175l27-2 5 76-27 2Z"/><path d="M3255 315l27-2 6 78-27 2Z"/>
    <path d="M3245 515l27 2-6 78-27-2Z"/><path d="M3110 615l27 2-4 72-27-2Z"/>
    <path d="M2870 620l27 1-2 72-27-1Z"/><path d="M2630 620l27 1-1 72-27-1Z"/>
    <path d="M2390 618l27 2-3 72-27-2Z"/><path d="M2175 610l27 2-5 72-27-2Z"/>
   </g>
   <g transform="translate(2070 415)">
    <path d="M0 -16L90 -10V45L0 38Z" fill="#70472d" stroke="#4b3324" stroke-width="6"/>
    <path d="M8 -8L82 -3M8 8L82 13M8 24L82 29" stroke="#c18a5c" stroke-width="7" stroke-linecap="round"/>
    <path d="M8 -10L82 35" stroke="#e0b77d" stroke-width="6"/>
    <circle cx="72" cy="10" r="4" fill="#f1d18e"/>
   </g>
   <g fill="#d5a16a" opacity=".9"><path d="M2060 312l20-2 2 10-20 2Z"/><path d="M2178 177l21-2 1 10-21 2Z"/><path d="M2403 177l21-2 1 10-21 2Z"/><path d="M2633 177l21-2 1 10-21 2Z"/><path d="M2863 177l21-2 1 10-21 2Z"/><path d="M3108 177l21-2 1 10-21 2Z"/></g>
  </g>`;
  html+=(state.orchardTrees||[]).map((tree,index)=>orchardTreeMarkup(index,tree)).join('');
   return html+'</g>';
}
function renderRiverBridgeMarkup(x,y,angle,half,tone,variant){
 const posts=Array.from({length:9},(_,i)=>{const px=-half+(i*2*half/8);return `<path d="M${px.toFixed(1)} -20v-29 M${px.toFixed(1)} 20v29" stroke="#493326" stroke-width="${i===0||i===8?8:6}" stroke-linecap="round"/>`}).join("");
 const planks=Array.from({length:13},(_,i)=>{const px=-half+((i+1)*2*half/14);return `<path d="M${px.toFixed(1)} -17v39" stroke="#69452e" stroke-width="3.2" opacity=".85"/>`}).join("");
 const rail=variant%2===0?'#d7ad70':'#e2c18b';
 return `<g class="river-bridge river-bridge-${variant}" transform="translate(${x} ${y}) rotate(${angle})">
  <path d="M-${half} -13Q0 -29 ${half} -13L${half} 28Q0 12 -${half} 28Z" fill="#30251e" opacity=".4" transform="translate(0 7)"/>
  <path d="M-${half} -19Q0 -35 ${half} -19L${half} 22Q0 6 -${half} 22Z" fill="${tone}" stroke="#493326" stroke-width="7" stroke-linejoin="round"/>
  <path d="M-${half} -19Q0 -35 ${half} -19L${half} -8Q0 -24 -${half} -8Z" fill="#f4d9a5" opacity=".72"/>
  ${planks}
  <path d="M-${half} -20Q0 -67 ${half} -20M-${half} 20Q0 67 ${half} 20" fill="none" stroke="#493326" stroke-width="8" stroke-linecap="round"/>
  <path d="M-${half} -20Q0 -67 ${half} -20M-${half} 20Q0 67 ${half} 20" fill="none" stroke="${rail}" stroke-width="4.5" stroke-linecap="round"/>
  ${posts}
  <path d="M-${half} -18l-7 -8m${2*half-14} 0l7 8M-${half} 22l-7 8m${2*half-14} 0l7 -8" stroke="#493326" stroke-width="5" stroke-linecap="round"/>
  <path d="M-${half} -4h13m${2*half-26} 0h13" stroke="#f6e1b9" stroke-width="3" opacity=".8"/>
  <path d="M-${half+3} -23l-5 -7m${2*half+6} 0l-5 7" stroke="#f0d19a" stroke-width="5" stroke-linecap="round"/>
 </g>`;
}
function renderPondArea(){
 // A paisagem do Rio, incluindo árvores, água, ponte e píer, agora é a imagem
 // panorâmica em #river-landscape. Não renderizar a antiga vegetação/água por cima.
 return '';
}
function renderRiverLandmarks(){
 return `
 <g id="river-hut" pointer-events="none" transform="translate(-1770 610) scale(1.95 2.2)">
  <ellipse cx="118" cy="166" rx="142" ry="20" fill="#254b22" opacity=".28"/>
  <path d="M12 68Q18 42 42 35H196Q220 43 224 68V158H12Z" fill="#8c542f" stroke="#563821" stroke-width="8" stroke-linejoin="round"/>
  <path d="M18 72Q20 52 43 47H194Q216 53 218 72V151H18Z" fill="#bd8048" stroke="#6d4328" stroke-width="4"/>
  <path d="M22 81H214M20 101H216M19 122H217M18 143H218" stroke="#77472c" stroke-width="5" opacity=".8"/>
  <path d="M22 77H213M22 97H213M22 118H213M22 139H213" stroke="#e0aa69" stroke-width="2.5" opacity=".75"/>
  <path d="M30 49V153M204 49V153" stroke="#704329" stroke-width="8"/>
  <path d="M34 51V151M200 51V151" stroke="#e0a363" stroke-width="2.5" opacity=".75"/>
  <path d="M5 69L116 -17L235 69L218 88L116 18L22 88Z" fill="#70452b" stroke="#4d3425" stroke-width="7" stroke-linejoin="round"/>
  <path d="M0 65Q116 -42 238 65Q232 87 215 87Q116 5 22 87Q5 86 0 65Z" fill="#b8873e" stroke="#68452b" stroke-width="7"/>
  <path d="M8 61Q116 -35 230 61M13 53Q116 -39 225 53M22 45Q116 -36 216 45M33 37Q116 -31 205 37" fill="none" stroke="#e5c276" stroke-width="5" stroke-linecap="round"/>
  <path d="M15 67l-7 13m22-28l-9 18m34-42l-8 18m39-35l-7 18m34-23l-2 19m38-15l4 18m35-4l8 18m18 8l10 14" stroke="#f0d28a" stroke-width="3" stroke-linecap="round" opacity=".9"/>
  <path d="M16 72Q116 10 222 72" fill="none" stroke="#6a452b" stroke-width="5"/>
  <path d="M83 158V105Q83 77 116 77Q149 77 149 105V158Z" fill="#543522" stroke="#4a2e20" stroke-width="7"/>
  <path d="M91 158V106Q91 86 116 86Q141 86 141 106V158Z" fill="#a66a3c" stroke="#e0b477" stroke-width="3"/>
  <path d="M105 91V157M127 91V157M94 112H138M94 137H138" stroke="#704329" stroke-width="3" opacity=".9"/>
  <circle cx="132" cy="127" r="4" fill="#f8d77d" stroke="#70452a" stroke-width="1.5"/>
  <rect x="35" y="86" width="39" height="39" rx="2" fill="#583a28" stroke="#5b3924" stroke-width="6"/>
  <rect x="40" y="91" width="29" height="29" fill="#8fd0df" stroke="#f0cf91" stroke-width="3"/>
  <path d="M54.5 92V119M41 105.5H68" stroke="#fff0c7" stroke-width="3.5"/>
  <path d="M29 159H207" stroke="#563820" stroke-width="9"/>
  <path d="M30 155H206" stroke="#e0a86a" stroke-width="3"/>
 </g>
`;
}

function professionXPReward(key,baseXP){const level=specialistLevelFromXP(state.specialistProgress?.[key]?.xp||0);return Math.max(1,Math.round(Math.max(0,Number(baseXP)||0)*(1+Math.max(0,level-1)*.2)))}
function awardProfessionXP(key,baseXP,source='atividade'){const earned=professionXPReward(key,baseXP);awardXP(earned,source);awardSpecialistXP(key,earned);return earned}
function kitchenSlotLimit(){return 3+Math.max(0,specialistLevelFromXP(state.specialistProgress?.chef?.xp||0)-1)*2}
function awardXP(amount,source='atividade'){const before=farmLevel();state.xp=Math.max(0,state.xp+Math.max(0,Math.floor(amount||0)));const level=farmLevel(),last=Number.isFinite(state.lastLevelRewarded)?state.lastLevelRewarded:before;if(level>last){const gained=level-last;state.greenCoins+=gained;state.lastLevelRewarded=level;remember(`Subiu para o nível ${level}: recebeu ${gained} moeda(s) verde(s).`);playSfx('levelup');notify(`Nível ${level}! +${gained} moeda(s) verde(s).`)}else if(!Number.isFinite(state.lastLevelRewarded))state.lastLevelRewarded=level;syncLevelPlotUnlocks();return level-before}
function birdCount(type){return state.animals.filter(a=>isBirdType(a.type)&&(!type||a.type===type)).length}
function birdLimitReached(type){return type!=='galinha'&&birdCount(type)>=2}
function horseCount(){return state.animals.filter(a=>ANIMALS[a.type]?.role==='horse').length}
function horseUnlockedSlots(){const level=farmLevel();return level<20?0:Math.min(HORSE_SLOTS.length,1+Math.floor((level-20)/2))}
function farmAnimalCount(){return state.animals.filter(a=>a.type!=='cachorro'&&!isBirdType(a.type)&&ANIMALS[a.type]?.role!=='horse').length}
function animalRemaining(a,kind='production'){const deadline=a.type==='cachorro'?a.guardUntil:(isDualPurposeAnimal(a.type)?(kind==='growth'?a.growthReadyAt:a.productionReadyAt):a.readyAt);return Math.max(0,((deadline||0)-Date.now())/HOUR)}
function animalProgress(a,kind='production'){const cfg=ANIMALS[a.type],readyAt=isDualPurposeAnimal(a.type)?(kind==='growth'?a.growthReadyAt:a.productionReadyAt):a.readyAt;if(!cfg||!readyAt)return 0;const total=(isDualPurposeAnimal(a.type)&&kind==='growth'?(cfg.growthHours||cfg.cycleHours||12):(cfg.cycleHours||cfg.growthHours||12))*ANIMAL_TIME_FACTOR*HOUR;return Math.max(0,Math.min(1,1-(readyAt-Date.now())/total))}
function isDualPurposeAnimal(type){return DUAL_PURPOSE_ANIMALS.includes(type)}
function syncAnimalCycles(){
 if(!farmWriteAllowed(false)||writeLocked||!state||!Array.isArray(state.animals))return false;
 let changed=false;const now=Date.now();
 for(const a of state.animals){
  const cfg=ANIMALS[a.type];
  if(a.type==='cachorro'&&a.status==='guarding'&&a.guardUntil<=now){a.status='hungry';a.guardUntil=0;changed=true;remember('A proteção do cachorro terminou.');continue}
  if(cfg?.role==='horse'){
   if(a.status==='growing'&&a.readyAt<=now){a.stage=Math.min(5,(a.stage||1)+1);a.readyAt=0;a.status=a.stage>=5?'adult':'hungry';changed=true;awardProfessionXP('haras',cfg.xp||14,'crescimento do cavalo');remember(a.status==='adult'?cfg.name+' chegou à fase adulta.':cfg.name+' avançou para a etapa '+a.stage+'/5.')}
   continue;
  }
  if(isDualPurposeAnimal(a.type)){
   if(a.productionStatus==='producing'&&a.productionReadyAt<=now){a.productionStatus='ready';a.productionReadyAt=0;changed=true;remember(cfg.name+' está pronta para produzir.')}
   if(a.growthStatus==='growing'&&a.growthReadyAt<=now){a.level=Math.min(10,(a.level||1)+1);a.stage=a.level;a.growthReadyAt=0;a.growthStatus=a.level>=10?'adult':'hungry';changed=true;awardXP(cfg.xp||10,'crescimento animal');remember(a.growthStatus==='adult'?cfg.name+' chegou ao nível máximo 10.':cfg.name+' avançou para o nível '+a.level+'/10.')}
   a.status=a.growthStatus==='adult'?'adult':'hungry';
  }else{
   if(a.status==='producing'&&a.readyAt<=now){a.status='ready';a.readyAt=0;changed=true;remember(cfg.name+' está pronta para produzir.')}
   else if(a.status==='growing'&&a.readyAt<=now){a.stage=Math.min(5,(a.stage||1)+1);a.readyAt=0;a.status=a.stage>=5?'adult':'hungry';changed=true;awardXP(cfg.xp||10,'crescimento animal');remember(a.status==='adult'?cfg.name+' chegou à fase adulta.':cfg.name+' avançou para a fase '+a.stage+'/5.')}
  }
 }
 if(changed)markDirty(true);return changed;
}
function isDogBreedOwned(id){return !!DOG_BREEDS[id]&&state.dogBreedsOwned.includes(id)}
function expireTemporaryDogBreeds(){return false} // Compatibilidade com salvamentos antigos: raças compradas não expiram.
function buyDogBreed(id){
 if(writeLocked)return notify('Salvamento protegido.');const cfg=DOG_BREEDS[id];if(!cfg||id==='classico')return;if(isDogBreedOwned(id))return equipDogBreed(id);const wallet=cfg.currency==='greenCoins'?'greenCoins':'coins';if(state[wallet]<cfg.price)return notify(cfg.currency==='greenCoins'?'Moedas verdes insuficientes para esta raça.':'Moedas amarelas insuficientes para esta raça.');state[wallet]-=cfg.price;if(!state.dogBreedsOwned.includes(id))state.dogBreedsOwned.push(id);discoverItem('caes',id,cfg.name,'🐕');const dog=state.animals.find(a=>a.type==='cachorro');if(dog)dog.breed=id;remember(`Adquiriu permanentemente ${cfg.name} (ID ${cfg.id}).`);markDirty();refresh();renderAnimals();notify(`${cfg.name} adquirido permanentemente e equipado!`)
}
function equipDogBreed(id){if(writeLocked)return notify('Salvamento protegido.');if(!DOG_BREEDS[id]||!isDogBreedOwned(id))return notify('Esta raça ainda não foi adquirida.');const dog=state.animals.find(a=>a.type==='cachorro');if(!dog)return;dog.breed=id;remember(`Equipou o cachorro com a raça ${DOG_BREEDS[id].name}.`);markDirty();renderAnimals();refresh();notify(`${DOG_BREEDS[id].name} equipado.`)}
function buyGenericAnimalFood(role){
 if(writeLocked)return notify('Salvamento protegido.');const cfg=role==='producer'?{key:'feed_producers',name:'Alimento para animais que produzem',price:120}:role==='grower'?{key:'feed_growers',name:'Alimento para animais que crescem',price:80}:null;if(!cfg)return;if(state.coins<cfg.price)return notify(`São necessárias ${fmt(cfg.price)} moedas amarelas.`);state.coins-=cfg.price;state.inventory[cfg.key]=(state.inventory[cfg.key]||0)+1;remember(`Comprou ${cfg.name}.`);markDirty();refresh();notify(`${cfg.name} adicionado ao inventário.`)
}
function buyAnimalRation(type){
 if(writeLocked)return notify('Salvamento protegido.');const cfg=ANIMAL_RATIONS[type];if(!cfg)return; if(state.greenCoins<cfg.price)return notify(`${cfg.name} custa ${cfg.price} moedas verdes.`);state.greenCoins-=cfg.price;state.inventory[cfg.key]=(state.inventory[cfg.key]||0)+1;remember(`Comprou ${cfg.name}.`);markDirty();refresh();notify(`${cfg.name} adicionada aos itens.`)
}
function upgradeAnimal(id){
 if(writeLocked)return notify('Salvamento protegido.');const a=state.animals.find(x=>x.id===id);if(!a)return;const ration=ANIMAL_RATIONS[a.type];if(!ration)return;if((a.level||1)>=10)return notify('Este animal já alcançou o nível máximo 10.');if(['producing','growing','ready'].includes(a.status)||a.productionStatus==='producing'||a.productionStatus==='ready'||a.growthStatus==='growing')return notify('Aguarde terminar os ciclos atuais antes de melhorar o animal.');if((state.inventory[ration.key]||0)<=0)return notify(`Você precisa de ${ration.name}.`);state.inventory[ration.key]--;a.level=(a.level||1)+1;a.stage=a.level;if(a.level>=10){a.growthStatus='adult';a.growthReadyAt=0;a.status='adult'}awardXP(5,'melhoria animal');remember(`${a.name||ANIMALS[a.type].name} evoluiu para o nível ${a.level}.`);markDirty();refresh();notify(`${a.name||ANIMALS[a.type].name} agora está no nível ${a.level}/10!`)
}
function buyAnimal(type){
 if(writeLocked)return notify('Salvamento protegido. Abra Configurações.');
 const cfg=ANIMALS[type];if(!cfg||cfg.role==='guard')return notify('Este animal não está disponível para compra.');
 const bird=isBirdType(type),horse=cfg.role==='horse';
 if(horse){if(!state.expansions.haras)return notify('Libere primeiro o Haras nas Expansões.');const unlocked=horseUnlockedSlots();if(horseCount()>=unlocked)return notify(unlocked>=10?'Todas as vagas do Haras estão ocupadas.':'Você ainda não liberou outra vaga. A próxima é desbloqueada a cada 2 níveis da fazenda.');}
 else if(bird&&birdLimitReached(type))return notify('O viveiro já possui o limite de 2 '+cfg.name.toLowerCase()+'.');
 else if(!bird&&farmAnimalCount()>=ANIMAL_SLOTS.length)return notify('O curral está cheio. Venda um animal para liberar espaço.');
 const wallet=cfg.currency==='greenCoins'?'greenCoins':'coins';
 if(state[wallet]<cfg.price)return notify(cfg.currency==='greenCoins'?'Moedas verdes insuficientes para comprar este animal.':'Moedas amarelas insuficientes para comprar este animal.');
 let slot=-1,aviarySlot=-1;
 if(horse){const used=new Set(state.animals.filter(a=>ANIMALS[a.type]?.role==='horse').map(a=>a.slot));slot=HORSE_SLOTS.findIndex((_,i)=>!used.has(i));if(slot<0||slot>=horseUnlockedSlots())return notify('Não há vaga liberada no Haras.');}
 else if(bird){aviarySlot=state.animals.filter(a=>isBirdType(a.type)).reduce((max,a)=>Math.max(max,Number.isInteger(a.aviarySlot)?a.aviarySlot:-1),-1)+1;}
 else{const used=new Set(state.animals.filter(a=>a.type!=='cachorro'&&!isBirdType(a.type)&&ANIMALS[a.type]?.role!=='horse').map(a=>a.slot));slot=ANIMAL_SLOTS.findIndex((_,i)=>!used.has(i));if(slot<0)return notify('Não há espaço livre no curral.');}
 state[wallet]-=cfg.price;
 state.animals.push({id:type+'-'+Date.now()+'-'+Math.floor(Math.random()*10000),type,name:cfg.name,breed:cfg.breed,slot,aviarySlot,status:'hungry',stage:1,readyAt:0,guardUntil:0});discoverItem(horse?'haras':'animais',type,cfg.name,cfg.icon);
 remember('Comprou '+cfg.name+' para o '+(horse?'Haras':bird?'viveiro':'curral')+'.');
 markDirty();refresh();notify(cfg.name+' chegou ao '+(horse?'Haras':bird?'viveiro':'curral')+'!');
}
function buyAnimalFeed(type){if(writeLocked)return notify('Salvamento protegido. Abra Configurações.');const cfg=ANIMALS[type];if(!cfg)return;const wallet=cfg.feedCurrency==='greenCoins'?'greenCoins':'coins';if(state[wallet]<cfg.feedPrice)return notify(`Saldo insuficiente para comprar ${cfg.feedName}.`);state[wallet]-=cfg.feedPrice;state.inventory[cfg.feedKey]=(state.inventory[cfg.feedKey]||0)+1;remember(`Comprou ${cfg.feedName}.`);markDirty();refresh();notify(`${cfg.feedName} comprado(a).`)}
function feedAnimal(id,mode='legacy'){if(writeLocked)return notify('Salvamento protegido. Abra Configurações.');const a=state.animals.find(x=>x.id===id);if(!a)return;const cfg=ANIMALS[a.type];if(!cfg)return;if(cfg.role==='horse'){if(a.status==='adult')return notify('Este cavalo já está na fase adulta e pode ser vendido.');if(a.status==='growing')return notify('O cavalo já está crescendo. Aguarde a etapa terminar.');if((state.inventory[cfg.feedKey]||0)<=0)return notify('Compre Ração para cavalos na janela do Haras.');state.inventory[cfg.feedKey]--;state.progressCounters.feed=(state.progressCounters.feed||0)+1;bumpMissionProgress('feed',1);awardXP(2,'alimentação de cavalo');a.status='growing';a.readyAt=Date.now()+cfg.growthHours*ANIMAL_TIME_FACTOR*HOUR;remember('Alimentou '+(a.name||cfg.name)+' para avançar para a etapa '+Math.min(5,(a.stage||1)+1)+'/5.');markDirty();refresh();notify(cfg.name+': crescimento iniciado.');return}if(a.type==='cachorro'){if(a.status==='guarding')return notify('A proteção do cachorro já está ativa.');const foodKey=(state.inventory[cfg.feedKey]||0)>0?cfg.feedKey:null;if(!foodKey)return notify('Compre '+cfg.feedName+' na loja.');state.inventory[foodKey]--;a.status='guarding';a.guardUntil=Date.now()+cfg.guardHours*ANIMAL_TIME_FACTOR*HOUR;state.progressCounters.feed=(state.progressCounters.feed||0)+1;bumpMissionProgress('feed',1);awardXP(2,'alimentação animal');remember('Alimentou o cachorro; proteção preparada para o modo online.');markDirty();refresh();notify('Cachorro alimentado. Proteção preparada para o modo online.');return}if(isDualPurposeAnimal(a.type)){if(mode==='legacy')mode='produce';if(mode==='produce'){if(['producing','ready'].includes(a.productionStatus))return notify('A produção já está em andamento ou pronta para recolher.')}else if(mode==='grow'){if((a.level||1)>=10||a.growthStatus==='adult')return notify('Este animal já alcançou o nível máximo 10.');if(a.growthStatus==='growing')return notify('O crescimento já está em andamento.')}else return;const genericKey=mode==='produce'?'feed_producers':'feed_growers',foodKey=(state.inventory[cfg.feedKey]||0)>0?cfg.feedKey:((state.inventory[genericKey]||0)>0?genericKey:null);if(!foodKey)return notify('Compre '+cfg.feedName+' ou o alimento genérico correspondente na loja.');state.inventory[foodKey]--;state.progressCounters.feed=(state.progressCounters.feed||0)+1;bumpMissionProgress('feed',1);awardXP(2,'alimentação animal');const hours=(mode==='produce'?(cfg.cycleHours||12):(cfg.growthHours||12))*ANIMAL_TIME_FACTOR;if(mode==='produce'){a.productionStatus='producing';a.productionReadyAt=Date.now()+hours*HOUR;remember('Iniciou a produção de '+cfg.productName+' de '+(a.name||cfg.name)+'.')}else{a.growthStatus='growing';a.growthReadyAt=Date.now()+hours*HOUR;remember('Iniciou o crescimento de '+(a.name||cfg.name)+' rumo ao nível '+((a.level||1)+1)+'/10.')}markDirty();refresh();notify(mode==='produce'?cfg.name+': produção iniciada.':cfg.name+': crescimento iniciado rumo ao nível '+((a.level||1)+1)+'/10.');return}if(['producing','growing','ready','adult','guarding'].includes(a.status))return notify('Este animal ainda não precisa de alimento.');const genericKey=cfg.role==='producer'?'feed_producers':cfg.role==='grower'?'feed_growers':null,foodKey=(state.inventory[cfg.feedKey]||0)>0?cfg.feedKey:(genericKey&&(state.inventory[genericKey]||0)>0?genericKey:null);if(!foodKey)return notify('Compre '+cfg.feedName+' ou o alimento genérico correspondente na loja.');state.inventory[foodKey]--;state.progressCounters.feed=(state.progressCounters.feed||0)+1;bumpMissionProgress('feed',1);awardXP(2,'alimentação animal');const baseHours=foodKey==='feed_producers'?8:foodKey==='feed_growers'?12:(cfg.role==='producer'?cfg.cycleHours:cfg.growthHours),hours=baseHours*ANIMAL_TIME_FACTOR;a.status=cfg.role==='producer'?'producing':'growing';a.readyAt=Date.now()+hours*HOUR;remember('Alimentou '+(a.name||cfg.name)+'.');markDirty();refresh();notify(cfg.role==='producer'?cfg.name+': produção iniciada.':cfg.name+': crescimento iniciado.')}
function collectAnimal(id){if(writeLocked)return notify('Salvamento protegido. Abra Configurações.');const a=state.animals.find(x=>x.id===id);if(!a)return;const cfg=ANIMALS[a.type];if(cfg?.role==='horse')return notify('Cavalos não produzem itens. Alimente-os para crescer ou venda-os.');if(isDualPurposeAnimal(a.type)){if(a.productionStatus!=='ready')return;const amount=cfg.yield+(ANIMAL_RATIONS[a.type]?Math.max(0,(a.level||1)-1):0);state.animalWarehouse[cfg.product]=(state.animalWarehouse[cfg.product]||0)+amount;awardXP(cfg.xp,'coleta animal');a.productionStatus='hungry';a.productionReadyAt=0;remember('Recolheu '+amount+' '+cfg.productName+' de '+(a.name||cfg.name)+'.');markDirty();refresh();notify(cfg.productIcon+' '+amount+' '+cfg.productName+' recolhidos · +'+cfg.xp+' XP.');return}if(a.status!=='ready')return;const amount=cfg.yield+(ANIMAL_RATIONS[a.type]?Math.max(0,(a.level||1)-1):0);state.animalWarehouse[cfg.product]=(state.animalWarehouse[cfg.product]||0)+amount;awardXP(cfg.xp,'coleta animal');a.status='hungry';a.readyAt=0;remember('Recolheu '+amount+' '+cfg.productName+' de '+(a.name||cfg.name)+'.');markDirty();refresh();notify(cfg.productIcon+' '+amount+' '+cfg.productName+' recolhidos · +'+cfg.xp+' XP.')}
function sellAnimal(id){if(writeLocked)return notify('Salvamento protegido. Abra Configurações.');const i=state.animals.findIndex(x=>x.id===id);if(i<0)return;const a=state.animals[i];if(a.type==='cachorro')return notify('O cão de guarda permanece na fazenda.');const cfg=ANIMALS[a.type],value=cfg.sellPrice&&a.status==='adult'?cfg.sellPrice+(ANIMAL_RATIONS[a.type]?Math.max(0,(a.level||1)-1)*250:0):Math.floor(cfg.price*.45);if(!confirm(`Vender ${a.name||cfg.name} por ${fmt(value)} moedas?`))return;state.coins+=value;state.animals.splice(i,1);remember(`Vendeu ${a.name||cfg.name} por ${value} moedas.`);markDirty();refresh();notify(`Animal vendido: +${fmt(value)} moedas.`)}
function sellAnimalProduct(id,requested){if(writeLocked)return notify('Salvamento protegido. Abra Configurações.');const cfg=ANIMAL_PRODUCTS[id],available=state.animalWarehouse[id]||0;if(!cfg||available<=0)return;const qty=requested===undefined?available:requested;if(!Number.isSafeInteger(qty)||qty<1||qty>available)return notify('Quantidade de venda inválida.');const total=saleWithPopularity(qty*cfg.unitPrice);state.coins+=total;state.animalWarehouse[id]-=qty;remember(`Vendeu ${qty} ${cfg.name} com bônus de popularidade.`);markDirty();refresh();notify(`${cfg.name}: ${qty} unidade(s) vendida(s) · +${fmt(total)} moedas.`)}
function updateHud(){const level=farmLevel(),currentXP=state.xp-xpRequiredForLevel(level),neededXP=xpForNextLevel(level);$('level').textContent=level;$('xp-fill').style.width=(currentXP/neededXP*100)+'%';$('xp-num').textContent=`${currentXP}/${neededXP} XP`;$('coins').textContent=fmt(state.coins);$('green-coins').textContent=fmt(state.greenCoins);$('popularity').textContent=fmt(state.popularity);const bonus=$('sale-bonus');if(bonus)bonus.textContent=`+${Math.round(popularityBonusRate()*100)}%`;const mood=MOODS.find(m=>m.id===state.mood)||MOODS[0];const button=$('mood-button');if(button){button.textContent=mood.icon;button.title=`Humor: ${mood.name} · clique para alterar`}const farmName=$('farm-name-text');if(farmName)farmName.textContent=state.farmName||'Minha fazenda';const farmSign=$('farm-sign-label');if(farmSign)farmSign.textContent=state.farmName||'Minha fazenda';const avatarImage=$('avatar-image'),avatarPlaceholder=$('avatar-placeholder');if(avatarImage&&avatarPlaceholder){if(state.profilePhoto){avatarImage.src=state.profilePhoto;avatarImage.hidden=false;avatarPlaceholder.hidden=true}else{avatarImage.removeAttribute('src');avatarImage.hidden=true;avatarPlaceholder.hidden=false}}const avatar=$('avatar-display');if(avatar)avatar.title=state.profilePhoto?'Alterar foto do perfil':'Adicionar foto do perfil';const moodLabel=$('mood-label');if(moodLabel)moodLabel.textContent=mood.name;const quickHarvest=$('quick-harvest'),quickDig=$('quick-dig');if(quickHarvest){const n=state.plots.filter(p=>p.status==='growing'&&progress(p)>=1).length;quickHarvest.disabled=!n;quickHarvest.textContent=`🌾 Colheita rápida (${n})`}if(quickDig){const n=state.plots.filter(p=>p.status==='spent').length;quickDig.disabled=!n;quickDig.textContent=`🪏 Escavada rápida (${n})`}updateNotificationBadges()}
function updateNotificationBadges(){
 const now=Date.now(),counts={
  crops:state.plots.filter(p=>p.status==='growing'&&progress(p)>=1).length,
  animals:state.animals.filter(a=>a.status==='ready').length,
  kitchen:(state.kitchen?.queue||[]).filter(job=>job.readyAt<=now).length,
  grill:(state.grill?.queue||[]).filter(job=>job.readyAt<=now).length,
  orchard:state.expansions?.orchard?(state.orchardTrees||[]).filter(t=>t.type&&(t.status==='ready'||orchardTreeProgress(t)>=1)).length:0,
  forest:(state.forestPlots||[]).filter(t=>t.type&&(t.status==='ready'||forestProgress(t)>=1)).length
 };
 document.querySelectorAll('[data-notify]').forEach(button=>{
  const key=button.dataset.notify,count=counts[key]||0;
  let badge=button.querySelector('.notification-badge');
  if(count&&!badge){badge=document.createElement('span');badge.className='notification-badge';badge.setAttribute('aria-hidden','true');button.appendChild(badge)}
  if(badge){badge.textContent=count>99?'99+':String(count);badge.hidden=!count}
  button.classList.toggle('has-notification',count>0);
  const base=button.dataset.notifyTitle||button.getAttribute('aria-label')||button.getAttribute('title')||button.textContent.trim();
  if(!button.dataset.notifyTitle)button.dataset.notifyTitle=base;
  const label=count?base+' · '+count+' pronto(s)':base;
  if(button.hasAttribute('title'))button.title=label;else button.setAttribute('aria-label',label);
 });
 const layer=$('notification-layer');
 if(layer){
  const marker=(x,y,emoji,count,label)=>count?'<g class="world-notification" transform="translate('+x+' '+y+')" pointer-events="none" aria-label="'+label+'"><circle r="24" fill="#fff8e7" stroke="#b52c22" stroke-width="5"/><text y="9" text-anchor="middle" font-size="25">'+emoji+'</text><circle cx="19" cy="-18" r="12" fill="#d92727" stroke="#fff8e7" stroke-width="3"/><text x="19" y="-14" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">'+(count>99?'99+':count)+'</text></g>':'';
  const readyBirds=state.animals.filter(a=>a.status==='ready'&&isBirdType(a.type)).length,readyLivestock=counts.animals-readyBirds;
  layer.innerHTML=marker(532,320,'🌾',counts.crops,'Plantação pronta para colher')+
   marker(1060,55,'🍳',counts.kitchen,'Receita pronta na cozinha')+
   marker(700,205,'🔥',counts.grill,'Receita pronta na churrasqueira')+
   marker(1810,430,'🐄',readyLivestock,'Produção pronta no curral')+
   marker(45,-10,'🐦',readyBirds,'Produção pronta no viveiro')+
   marker(2670,155,'🍎',counts.orchard,'Frutas prontas no pomar')+
   marker(3890,-190,'🌳',counts.forest,'Folhas prontas na mata');
 }
}
function notify(message){const e=$('toast');e.className='toast';e.textContent=message;e.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove('show'),2500)}
let fishingCelebrationQueue=[],fishingCelebrationActive=false,fishingCelebrationTimer=null;
const FISHING_RARITY_STYLE={'Comum':'common','Incomum':'uncommon','Raro':'rare','Muito raro':'very-rare','Lendário':'legendary','Extraordinário':'extraordinary'};
function playFishingSfx(rarity,isExtraordinary=false){
 if(!soundEnabled)return;
 const ctx=ensureAudio();if(!ctx)return;
 const key=isExtraordinary?'Extraordinário':rarity;
 const notes={
  'Comum':[523,659],
  'Incomum':[587,740,880],
  'Raro':[659,784,988],
  'Muito raro':[587,740,988,1175],
  'Lendário':[523,659,784,1047,1319],
  'Extraordinário':[392,587,784,1047,1319,1568]
 }[key]||[523,659];
 notes.forEach((freq,index)=>setTimeout(()=>playTone(freq,key==='Extraordinário'?.2:.14,'sine',key==='Extraordinário'?.055:.04,index===notes.length-1?freq*.08:0),index*(key==='Extraordinário'?115:90)));
 if(key==='Extraordinário'){setTimeout(()=>playNoise(.32,.035,1450),180);setTimeout(()=>playTone(1760,.38,'triangle',.05,280),650)}
}
function launchFishingCelebrationEffects(style){
 const layer=document.createElement('div');layer.className='fishing-fx-layer rarity-'+style;layer.setAttribute('aria-hidden','true');document.body.append(layer);
 const palette={common:['#fff2b0'],uncommon:['#8de49b','#e7ffd0'],rare:['#75d5ff','#d7f4ff'], 'very-rare':['#c58cff','#f4d9ff'],legendary:['#ffd35c','#fff0a6','#ff9d3d'],extraordinary:['#ff4b65','#ffd447','#46d9ff','#b86cff','#6ff08a','#ff8bdb']}[style]||['#fff2b0'];
 const count={common:9,uncommon:15,rare:23,'very-rare':30,legendary:40,extraordinary:54}[style]||9;
 for(let i=0;i<count;i++){const p=document.createElement('i');p.className='fishing-fx-particle';p.style.left=(4+Math.random()*92)+'%';p.style.top=(12+Math.random()*76)+'%';p.style.setProperty('--fx-color',palette[i%palette.length]);p.style.setProperty('--fx-angle',(Math.random()*360)+'deg');p.style.setProperty('--fx-distance',(24+Math.random()*100)+'px');p.style.setProperty('--fx-delay',(Math.random()*.35)+'s');layer.append(p)}
 if(style==='extraordinary')for(let b=0;b<5;b++){const burst=document.createElement('span');burst.className='fishing-fx-firework';burst.style.left=([12,82,31,68,50][b])+'%';burst.style.top=([24,20,72,68,42][b])+'%';burst.style.setProperty('--fx-delay',(b*.16)+'s');for(let j=0;j<18;j++){const ray=document.createElement('i');ray.style.setProperty('--fx-angle',(j*20)+'deg');ray.style.setProperty('--fx-color',palette[(j+b)%palette.length]);burst.append(ray)}layer.append(burst)}
 setTimeout(()=>layer.remove(),2600);
}
function showFishingCelebration(catchInfo){
 if((catchInfo.scene==='sea'||catchInfo.scene==='river')&&activeScene===catchInfo.scene){
  const status=$('sea-fishing-status');
  if(status){
   clearTimeout(toastTimer);
   launchFishingCelebrationEffects(catchInfo.isExtraordinary?'extraordinary':(FISHING_RARITY_STYLE[catchInfo.rarity||'Comum']||'common'));
   const rarity=catchInfo.isExtraordinary?'Extraordinário':(catchInfo.rarity||'Comum');
   const style=FISHING_RARITY_STYLE[rarity]||'common';
   status.className='sea-fishing-status is-result toast fishing-toast rarity-'+style+' show';status.dataset.scene=catchInfo.scene;status.hidden=false;status.replaceChildren();
   const content=document.createElement('div');content.className='fishing-toast-content';
   const heading=document.createElement('strong');heading.className='fishing-toast-heading';heading.textContent=catchInfo.isExtraordinary?'✨ PESCA EXTRAORDINÁRIA! ✨':'🎣 PEIXE PESCADO!';
   const fish=document.createElement('div');fish.className='fishing-toast-fish';
   const icon=document.createElement('span');icon.className='fishing-toast-icon';icon.textContent=catchInfo.icon||'🐟';
   const name=document.createElement('span');name.className='fishing-toast-name';name.textContent=catchInfo.name;fish.append(icon,name);
   const detail=document.createElement('small');detail.className='fishing-toast-detail';detail.textContent=rarity+(catchInfo.quantity>1?' · '+catchInfo.quantity+' unidades':'')+(catchInfo.reward?' · '+catchInfo.reward:'')+' · +'+catchInfo.xp+' XP';
   content.append(heading,fish,detail);status.append(content);
   playFishingSfx(rarity,catchInfo.isExtraordinary);
   toastTimer=setTimeout(()=>{status.hidden=true;status.className='sea-fishing-status';status.replaceChildren()},3600);
   return;
  }
 }
 const e=$('toast');if(!e)return;
 launchFishingCelebrationEffects(catchInfo.isExtraordinary?'extraordinary':(FISHING_RARITY_STYLE[catchInfo.rarity||'Comum']||'common'));
 const rarity=catchInfo.isExtraordinary?'Extraordinário':(catchInfo.rarity||'Comum');
 const style=FISHING_RARITY_STYLE[rarity]||'common';
 e.className='toast fishing-toast rarity-'+style;
 e.replaceChildren();
 const content=document.createElement('div');content.className='fishing-toast-content';
 const heading=document.createElement('strong');heading.className='fishing-toast-heading';
 heading.textContent=catchInfo.isExtraordinary?'✨ PESCA EXTRAORDINÁRIA! ✨':'🎣 PEIXE PESCADO!';
 const fish=document.createElement('div');fish.className='fishing-toast-fish';
 const icon=document.createElement('span');icon.className='fishing-toast-icon';icon.textContent=catchInfo.icon||'🐟';
 const name=document.createElement('span');name.className='fishing-toast-name';name.textContent=catchInfo.name;
 fish.append(icon,name);
 const detail=document.createElement('small');detail.className='fishing-toast-detail';
 detail.textContent=rarity+(catchInfo.quantity>1?' · '+catchInfo.quantity+' unidades':'')+(catchInfo.reward?' · '+catchInfo.reward:'')+' · +'+catchInfo.xp+' XP';
 content.append(heading,fish,detail);e.append(content);
 const sparkleCount=({common:3,uncommon:5,rare:8,'very-rare':11,legendary:15,extraordinary:20})[style]||3;
 for(let i=0;i<sparkleCount;i++){
  const sparkle=document.createElement('span');sparkle.className='fish-sparkle';
  sparkle.style.left=(8+(i*37)%84)+'%';sparkle.style.top=(12+(i*53)%76)+'%';
  sparkle.style.setProperty('--sparkle-delay',(i%5)*.075+'s');e.append(sparkle);
 }
 if(style==='extraordinary'){
  for(let burst=0;burst<4;burst++){
   const firework=document.createElement('span');firework.className='fish-firework';
   firework.style.left=([18,78,34,68][burst])+'%';firework.style.top=([22,18,76,70][burst])+'%';
   firework.style.setProperty('--firework-delay',burst*.22+'s');
   for(let ray=0;ray<12;ray++){
    const particle=document.createElement('i');particle.style.setProperty('--angle',(ray*30)+'deg');
    particle.style.setProperty('--firework-color',['#ff4b65','#ffd447','#46d9ff','#b86cff','#6ff08a','#ff8bdb'][((ray+burst)%6)]);
    firework.append(particle);
   }
   e.append(firework);
  }
 }
 clearTimeout(toastTimer);e.classList.add('show');
 playFishingSfx(rarity,catchInfo.isExtraordinary);
 toastTimer=setTimeout(()=>{e.classList.remove('show');e.classList.remove('fishing-toast');},3600);
}
function queueFishingCelebration(catchInfo){
 fishingCelebrationQueue.push(catchInfo);
 if(fishingCelebrationActive)return;
 const next=()=>{
  const item=fishingCelebrationQueue.shift();
  if(!item){fishingCelebrationActive=false;fishingCelebrationTimer=null;return}
  fishingCelebrationActive=true;showFishingCelebration(item);
  fishingCelebrationTimer=setTimeout(next,3800);
 };
 next();
}
function remember(message){state.history.unshift({message,time:Date.now()});state.history=state.history.slice(0,40);const m=String(message);let event=null;if(/^Colheu\b/.test(m))event='harvest';else if(/^Plantou\b/.test(m))event='plant';else if(/^Regou\b/.test(m))event='water';else if(/^Vendeu\b/.test(m))event='sell';else if(/^Alimentou\b/.test(m))event='feed';else if(/^Recolheu \d+ /.test(m))event='produce';else if(/^Comprou .+\.$/.test(m)&&Object.values(ANIMALS).some(a=>a.name&&m===`Comprou ${a.name}.`))event='animal';if(event){state.progressCounters=state.progressCounters||{};state.progressCounters[event]=(state.progressCounters[event]||0)+1;bumpMissionProgress(event,1);const active=state.tutorial?.acceptedId,task=TUTORIAL_TASKS.find(t=>t.id===active);if(task&&task.event===event)state.taskProgress[task.id]=Math.min(task.goal,(state.taskProgress[task.id]||0)+1)}}
function acceptTutorialTask(id){if(!farmWriteAllowed())return;const t=TUTORIAL_TASKS.find(x=>x.id===id),next=TUTORIAL_TASKS.find(x=>!state.tutorial.completed.includes(x.id));if(!t||!next||t.id!==next.id||state.tutorial.acceptedId)return;state.tutorial.acceptedId=id;state.taskProgress[id]=0;markDirty();renderModal()}
function confirmTutorialTask(id){if(!farmWriteAllowed())return;const t=TUTORIAL_TASKS.find(x=>x.id===id);if(!t||state.tutorial.acceptedId!==id||(state.taskProgress[id]||0)<t.goal)return;state.coins+=t.reward;awardXP(t.xp,'tarefa do livro');state.tutorial.completed.push(id);state.tutorial.acceptedId=null;state.tutorial.finished=state.tutorial.completed.length===TUTORIAL_TASKS.length;remember(`Concluiu a tarefa: ${t.title}.`);markDirty();refresh();notify(`Tarefa concluída! +${fmt(t.reward)} moedas.`)}
function claimAchievement(id){if(!farmWriteAllowed())return;const a=ACHIEVEMENTS.find(x=>x.id===id);if(!a||state.claimedAchievements.includes(id)||!a.test())return;state.claimedAchievements.push(id);state.coins+=a.reward;awardXP(a.xp,'conquista');if(a.titleReward){state.unlockedTitles=Array.isArray(state.unlockedTitles)?state.unlockedTitles:[];if(!state.unlockedTitles.includes(a.titleReward))state.unlockedTitles.push(a.titleReward);state.activeTitle=a.titleReward}if(a.decorReward)state.decorInventory[a.decorReward]=(state.decorInventory[a.decorReward]||0)+1;remember('Conquistou: '+a.title+'.');markDirty();refresh();notify('Conquista resgatada: +'+fmt(a.reward)+' moedas e '+a.xp+' XP'+(a.titleReward?' · Título '+a.titleReward:'')+(a.decorReward?' · Decoração '+DECORATIONS[a.decorReward].name:'')+'.')}
function farmWriteAllowed(showMessage=true){const allowed=!writeLocked&&!cloudConflict&&!!cloudUser&&cloudSessionReadyUserId===cloudUser.id;if(!allowed&&showMessage)notify('Salvamento protegido. Aguarde a conexão e o carregamento da fazenda na nuvem.');return allowed}
function hasPendingCloudChanges(){return dirty||cloudDirty}
function markDirty(deferUntilAutosave=false){if(!farmWriteAllowed())return false;cloudIntegrityReport=null;cloudPermanentSaveError=null;dirty=true;cloudDirty=true;state.updatedAt=Date.now();$('save-status').textContent=deferUntilAutosave?'Alterações pendentes · salvamento em até 1 minuto':'Salvando na nuvem...';$('save-dot').className='savedot saving';if(!deferUntilAutosave){clearTimeout(saveTimer);saveTimer=setTimeout(()=>{saveTimer=null;save()},0)}return true}
async function save(){
 if(!dirty)return saving;
 if(cloudConflict){$('save-status').textContent='Conflito de versões · escolha como recuperar';$('save-dot').className='savedot error';return saving}
 if(cloudPermanentSaveError){$('save-status').textContent='Falha permanente · verifique a conta ou os dados';$('save-dot').className='savedot error';return saving}
 if(cloudRetryTimer)return saving;
 if(writeLocked||!cloudUser||cloudSessionReadyUserId!==cloudUser.id){dirty=true;$('save-status').textContent='Aguardando conexão com a nuvem';$('save-dot').className='savedot error';return saving}
 dirty=false;
 saving=saving.then(async()=>{
  if(!cloudUser)throw new Error('Nenhuma conta conectada para salvar na nuvem.');
  if(cloudRetryContext){
   const alreadySaved=await reconcileCloudRetry();
   if(alreadySaved){cloudRetryContext=null;return}
  }
  const snapshot=JSON.parse(JSON.stringify(state));
  await saveCloud(snapshot);
 }).then(()=>{
  cloudPermanentSaveError=null;cloudRetryContext=null;cloudRetryAttempt=0;clearCloudRetry();cloudDirty=dirty;recordCloudSyncEvent('success','Salvamento concluído na nuvem','Revisão '+cloudRevision+'.');
  if(!dirty){$('save-status').textContent='Salvo na nuvem';$('save-dot').className='savedot'}
  else{$('save-status').textContent='Novas alterações pendentes · sincronizando';$('save-dot').className='savedot saving';if(!saveTimer)saveTimer=setTimeout(()=>{saveTimer=null;save()},0)}
 }).catch(e=>{
  console.error('Cloud save:',e);dirty=true;cloudDirty=true;
  if(e?.code==='CLOUD_REVISION_CONFLICT'){
   clearCloudRetry();cloudRetryContext=null;cloudPermanentSaveError=null;cloudConflict=true;writeLocked=true;$('save-status').textContent='Conflito entre versões · gravação pausada';$('save-dot').className='savedot error';
   recordCloudSyncEvent('warning','Conflito entre versões','A gravação foi bloqueada para proteger o progresso.');
   if(currentModal==='account')renderModal();
   notify('Outra sessão salvou uma versão mais recente. As gravações foram pausadas para proteger os dois progressos. Abra Conta e sincronização para escolher como recuperar.');
  }else if(isPermanentCloudSaveError(e)){
   clearCloudRetry();cloudPermanentSaveError=e;$('save-status').textContent='Falha permanente · verifique a conta ou os dados';$('save-dot').className='savedot error';recordCloudSyncEvent('error','Falha permanente na gravação',e.message||'A nuvem recusou a gravação.');
   notify('A nuvem recusou a gravação. As alterações permanecem nesta sessão; verifique a conta ou os dados antes de tentar novamente.');
  }else{
   if(!cloudRetryContext)cloudRetryContext={userId:cloudUser?.id,baseRevision:cloudRevision,snapshot:JSON.parse(JSON.stringify(state))};
   scheduleCloudRetry(e);
  }
 });
 return saving;
}
function progress(p){return Math.max(0,Math.min(1,(Date.now()-p.plantedAt)/(cropHours(p.crop,p.regrowing)*HOUR)))}
function timeRemain(p){return formatHours((1-progress(p))*cropHours(p.crop,p.regrowing))}
function plotAction(i){if(writeLocked){notify('Salvamento protegido. Veja Configurações.');return}const p=state.plots[i];if(!p)return;if(i>=EXPANSION_PLOT_START&&farmLevel()<50+(i-EXPANSION_PLOT_START)){notify('Este canteiro será liberado no nível '+(50+i-EXPANSION_PLOT_START)+'.');return}if(multiSelectMode){if(p.status!=='growing'||progress(p)<1)return notify('Selecione somente canteiros com plantas maduras.');if(selectedPlotIndices.has(i))selectedPlotIndices.delete(i);else selectedPlotIndices.add(i);renderPlots();updateMultiSelectControls();return}if(i>=EXPANSION_PLOT_START&&p.status==='grass'){p.status='dirt';markDirty()}lastSelected=i;renderPlots();
if(tool==='soil-red'||tool==='soil-restore'){applySoilWand(p,tool==='soil-red'?'red':'restore');return}
if(tool==='inspect'){if(p.status==='growing'&&progress(p)>=1){tool='hand';plotAction(i);tool='inspect';
document.querySelectorAll('.tool').forEach(btn=>btn.classList.toggle('active',btn.dataset.tool==='inspect'));return}if(p.status==='growing'&&p.weed){p.weed=false;p.weedCleared=true;awardXP(2,'remoção contextual de ervas');playSfx('weed');remember('Removeu ervas daninhas com a ação contextual.');markDirty();refresh();notify('Ervas daninhas removidas automaticamente.');return}if(p.status==='growing'&&p.pest){p.pest=false;p.pestCleared=true;awardXP(2,'controle contextual de pragas');playSfx('pest');remember('Eliminou insetos com a ação contextual.');markDirty();refresh();notify('Insetos eliminados automaticamente.');return}if(p.status==='growing'&&p.wateredAt&&Date.now()-p.wateredAt>=4*HOUR*CROP_TIME_FACTOR){p.wateredAt=Date.now();awardXP(2,'irrigação contextual');playSfx('water');remember('Regou a plantação com a ação contextual.');markDirty();refresh();notify('Plantação regada automaticamente.');return}notify(p.status==='grass'?'Terreno reservado para expansão.':p.status==='dirt'?'Terra limpa pronta para plantar.':p.status==='spent'?'Use a pá para limpar este canteiro.':`${CROPS[p.crop].name}: ${timeRemain(p)} restantes`);return}
if(p.status==='grass'){notify('Terreno ainda não liberado.');return}
if(tool==='seed'){if(p.status!=='dirt'){notify('Plante em terreno livre e limpo.');return}if(!chosenCrop||!state.inventory[chosenCrop]){openModal('inventory');return}const c=CROPS[chosenCrop];if(!cropLevelAllowed(c)){notify(`Você precisa alcançar o nível ${c.minLevel} ou ativar um Cartão VIP válido.`);return}if(c.advanced&&p.soil!=='red'){notify('Esta semente avançada só pode ser plantada em terra vermelha. Use a Varinha da Terra Vermelha na loja.');return}Object.assign(p,{status:'growing',crop:chosenCrop,plantedAt:Date.now(),wateredAt:Date.now(),weed:false,pest:false,harvestsRemaining:c.seasons||1,regrowing:false,weedCleared:false,pestCleared:false});delete p.initialGift;state.inventory[chosenCrop]--;discoverItem('canteiros',chosenCrop,c.name,c.icon);awardXP(5,'plantio');playSfx('plant');remember('Plantou '+c.name);markDirty();refresh();notify(`${c.name} plantado!`);if(!state.inventory[chosenCrop])setTool('inspect');return}
if(tool==='hand'){if(p.status!=='growing'){notify('Não há planta madura neste terreno.');return}if(progress(p)<1){notify('Aguarde '+timeRemain(p));return}const cropId=p.crop,c=CROPS[cropId],target=c.kind==='flower'?state.flowerWarehouse:state.warehouse;target[cropId]=(target[cropId]||0)+c.yield;const fieldLeafMap={cana:'folha_cana',eucalipto:'folha_eucalipto',louro:'folha_louro'};if(fieldLeafMap[cropId]){const leaf='herb_'+fieldLeafMap[cropId];state.inventory[leaf]=(state.inventory[leaf]||0)+Math.max(1,Math.floor(c.yield/4));}const gained=Math.floor(c.xp/(c.seasons||1));awardXP(gained,'colheita');playSfx('harvest');if(cropId==='pinheiro_natal'&&p.harvestsRemaining<=1){state.decorInventory.christmas_tree=(state.decorInventory.christmas_tree||0)+1;remember('Recebeu um Pinheiro de Natal pronto para decorar.')}p.harvestsRemaining=Math.max(0,p.harvestsRemaining-1);if(p.harvestsRemaining>0){Object.assign(p,{plantedAt:Date.now(),wateredAt:Date.now(),weed:false,pest:false,weedCleared:false,pestCleared:false,regrowing:true})}else{Object.assign(p,{status:'spent',crop:null,plantedAt:null,wateredAt:null,weed:false,pest:false})}remember(`Colheu ${c.yield} ${c.name}`);markDirty();refresh();notify(`Colheu ${c.yield} ${c.name} · +${gained} XP${fieldLeafMap[cropId]?' · folhas recolhidas para o Mix de Ervas':''}`);return}
if(tool==='fertilizer'){useFertilizerOnPlot(p);return}
if(tool==='hoe'){if(p.status==='spent'){Object.assign(p,{status:'dirt',crop:null,weed:false,pest:false});remember('Preparou um canteiro com a pá');playSfx('hoe');markDirty();refresh();notify('Canteiro limpo.')}else notify('Use a pá após a colheita.');return}
if(tool==='water'){if(p.status==='growing'){p.wateredAt=Date.now();awardXP(2,'irrigação');playSfx('water');remember('Regou '+CROPS[p.crop].name);markDirty();refresh();notify('Planta regada!')}else notify('Selecione uma planta para regar.');return}
if(tool==='weed'||tool==='pest'){if(p.status!=='growing'){notify('Selecione um canteiro cultivado.');return}const key=tool==='weed'?'weed':'pest';if(p[key]){p[key]=false;p[key+'Cleared']=true;awardXP(2,tool==='weed'?'remoção de ervas':'controle de pragas');remember(tool==='weed'?'Removeu ervas daninhas':'Aplicou pesticida em '+CROPS[p.crop].name);playSfx(tool==='weed'?'weed':'pest');markDirty();refresh();notify(tool==='weed'?'Ervas removidas.':'Insetos eliminados.')}else notify(tool==='weed'?'Este canteiro não tem ervas daninhas.':'Este canteiro não tem insetos.');return}}
function setTool(t){if(t==='seed'){openModal('inventory');return}if(t==='fertilizer')chosenFertilizer='quick';tool=t;chosenCrop=null;document.querySelectorAll('.tool').forEach(btn=>btn.classList.toggle('active',btn.dataset.tool===t));const hints={inspect:'Selecione um canteiro para consultar seu cultivo.',hoe:'Pá: limpe o terreno após colher.',water:'Regador: clique em uma plantação.',fertilizer:chosenFertilizer==='quick'?'Fertilizante rápido: acelere em 30% o tempo restante.':`${FERTILIZERS[chosenFertilizer]?.name||'Fertilizante'}: clique em uma planta em crescimento.`,hand:'Mão: clique em uma planta madura para colher.',weed:'Removedor: retire ervas daninhas.',pest:'Pesticida: elimine insetos das plantações.','soil-red':'Varinha vermelha: transforme um canteiro vazio em terra vermelha.','soil-restore':'Varinha de restauração: volte o canteiro para terra normal.'};$('tip').textContent=hints[t]||''}
function chooseSeed(id){if(!state.inventory[id]){notify('Compre sementes na loja!');return}chosenCrop=id;tool='seed';closeModal();document.querySelectorAll('.tool').forEach(btn=>btn.classList.toggle('active',btn.dataset.tool==='seed'));$('tip').textContent=`🌱 ${CROPS[id].name}: clique em uma terra livre para plantar.`}
function modalHasFocusedEditor(){const active=document.activeElement;return !!(active&&active.closest&&active.closest('#modal-body input,#modal-body textarea,#modal-body select'))}
const MOBILE_SHORTCUTS={shop:['🛒','Loja'],kitchen:['🍲','Produção'],animals:['🐾','Animais'],friends:['👥','Amigos'],catalog:['📚','Catálogo'],tasks:['🎯','Missões'],inventory:['🎒','Itens'],warehouse:['📦','Depósito'],orchard:['🍎','Pomar'],pond:['🌊','Rio'],sea:['🐟','Mar'],forest:['🌳','Mata'],decor:['🌷','Decoração'],inbox:['📬','Mensagens']};
function renderMobileNavigation(){const nav=$('mobile-navigation');if(!nav||!state)return;const ids=(Array.isArray(state.mobileShortcuts)?state.mobileShortcuts:[]).filter(id=>MOBILE_SHORTCUTS[id]).slice(0,4);while(ids.length<4){const next=Object.keys(MOBILE_SHORTCUTS).find(id=>!ids.includes(id));if(!next)break;ids.push(next)}const more=nav.querySelector('[data-more-toggle]');if(!more)return;nav.querySelectorAll('button:not([data-more-toggle])').forEach(button=>button.remove());ids.forEach(id=>more.insertAdjacentHTML('beforebegin','<button type="button" data-modal="'+id+'" aria-label="Abrir '+MOBILE_SHORTCUTS[id][1]+'"><span>'+MOBILE_SHORTCUTS[id][0]+'</span><small>'+MOBILE_SHORTCUTS[id][1]+'</small></button>'))}
function refresh(){syncLakeFish();expireDecorations();expireFarmTheme();syncAnimalCycles();syncOrchardTrees();syncLevelPlotUnlocks();updateHud();renderMobileNavigation();renderPlots();renderAnimals();renderFarmAddons();if(currentModal&&!modalHasFocusedEditor())renderModal()}
function infest(){if(!farmWriteAllowed(false))return;let changed=false;for(let i=0;i<state.plots.length;i++){const p=state.plots[i];if(p.status!=='growing'||p.initialGift||progress(p)>=1)continue;const h=(Date.now()-p.plantedAt)/HOUR;if(h>=3*CROP_TIME_FACTOR&&!p.weed&&!p.weedCleared&&(Math.floor(p.plantedAt/HOUR)+i*11)%5===0){p.weed=true;changed=true}if(h>=6*CROP_TIME_FACTOR&&!p.pest&&!p.pestCleared&&(Math.floor(p.plantedAt/HOUR)+i*13)%7===0){p.pest=true;changed=true}}if(changed){markDirty(true);refresh()}}
function openModal(kind){if(kind==='sea')switchFarmScene('sea');setMusicContext(kind==='pond'&&state?.expansions?.pond?'river':kind==='sea'?'sea':'general');if(kind==='inbox'&&cloudUser)onlineInboxLoaded=false;if(kind==='gifts'&&cloudUser)onlineGiftsLoaded=false;if(kind==='lake')focusLakeArea(false);if(kind==='orchard'&&state?.expansions?.orchard)focusFarmArea('orchard',false);if(kind==='pond'&&state?.expansions?.pond)focusFarmArea('pond',false);if(kind==='haras'&&state?.expansions?.haras)focusFarmArea('haras',false);currentModal=kind;document.querySelector('.app')?.classList.add('modal-open');document.querySelector('.app')?.classList.toggle('sea-fishing-open',kind==='sea');document.body.classList.toggle('sea-fishing-open',kind==='sea');if(kind==='profile')profilePhotoDraft=state?.profilePhoto||'';$('overlay').classList.remove('hidden');try{renderModal()}catch(err){console.error('Falha ao abrir janela '+kind,err);$('modal-title').textContent=kind==='kitchen'?'Cozinha da fazenda':kind==='grill'?'Churrasqueira':kind==='account'?'Conta e sincronização':kind==='settings'?'Configurações':'Fazenda';$('modal-body').innerHTML='<p>Não foi possível carregar esta janela. Seus dados continuam preservados.</p><p class="historical-note" id="modal-error-detail"></p>';const detail=$('modal-error-detail');if(detail)detail.textContent='Detalhe técnico: '+(err?.message||String(err))}$('modal-body').scrollTop=0}
function closeModal(){if(writeLocked&&(!cloudUser||cloudSessionReadyUserId!==cloudUser.id)){notify('Entre na sua conta para acessar a fazenda.');return}setMusicContext(activeScene==='sea'?'sea':'general');currentModal='';document.querySelector('.app')?.classList.remove('modal-open','sea-fishing-open');document.body.classList.remove('sea-fishing-open');$('overlay').classList.add('hidden');renderPlots();}
function dailyRewardAvailable(){return state.dailyRewardDate!==todayKey()}
function claimDailyReward(){if(!farmWriteAllowed())return;
 if(!dailyRewardAvailable())return notify('A recompensa diária de hoje já foi resgatada.');
 const today=todayKey();state.dailyStreak=state.dailyRewardDate===yesterdayKey()?state.dailyStreak+1:1;
 const roll=Math.random(),qty=Math.min(5,1+Math.floor((state.dailyStreak-1)/3));let message='';
 if(state.dailyStreak>=5&&!state.butterflyTreeClaimed){state.decorInventory.butterfly_tree=(state.decorInventory.butterfly_tree||0)+1;state.butterflyTreeClaimed=true;message='Árvore Borboleta especial por 5 dias consecutivos';}
 else if(roll<.28){state.inventory.nabo=(state.inventory.nabo||0)+qty;message=`${qty} semente(s) de nabo`; }
 else if(roll<.52){state.inventory.fertilizer=(state.inventory.fertilizer||0)+qty;message=`${qty} fertilizante(s) rápido(s)`;}
 else if(roll<.72){state.inventory.sunlightFertilizer=(state.inventory.sunlightFertilizer||0)+1;message='1 Luz do Sol Mágica (8h)';}
 else if(roll<.82){state.inventory.fertilizer_250=(state.inventory.fertilizer_250||0)+qty;message=`${qty} Fertilizante(s) 2h30`; }
 else if(roll<.90){state.inventory.surfConcentrate=(state.inventory.surfConcentrate||0)+1;message='1 Surf Líquido Concentrado (20h para flores)';}
 else{state.flowers=(state.flowers||0)+qty;message=`${qty} flor(es) para a casa de presentes`;}
 state.dailyRewardDate=today;remember('Recebeu recompensa diária: '+message);markDirty();refresh();notify('Recompensa recebida: '+message);if(currentModal)renderModal();
}
function saveFarmName(){if(writeLocked)return notify('Salvamento protegido.');const input=$('farm-name-input');const name=(input?.value||'').trim().replace(/\s+/g,' ').slice(0,24);if(name.length<2)return notify('Digite um nome com pelo menos 2 caracteres.');if(name===state.farmName)return notify('O nome da fazenda já está atualizado.');state.farmName=name;remember(`Renomeou a fazenda para “${name}”.`);markDirty();refresh();notify('Nome da fazenda atualizado!')}
function saveProfilePhoto(){if(writeLocked)return notify('Salvamento protegido.');if(!profilePhotoDraft)return notify('Selecione uma foto antes de aplicar.');if(profilePhotoDraft===state.profilePhoto)return notify('Esta foto já está aplicada.');state.profilePhoto=profilePhotoDraft;remember('Atualizou a foto do perfil.');markDirty();refresh();profilePhotoDraft=state.profilePhoto;notify('Foto do perfil atualizada e salva!')}
function removeProfilePhoto(){if(writeLocked)return notify('Salvamento protegido.');if(!state.profilePhoto)return notify('Não há foto personalizada para remover.');state.profilePhoto='';profilePhotoDraft='';remember('Removeu a foto personalizada do perfil.');markDirty();refresh();notify('Foto removida. O avatar padrão foi restaurado.')}
function processProfilePhoto(file){if(!file)return;if(!['image/jpeg','image/png','image/webp'].includes(file.type))return notify('Escolha uma imagem PNG, JPG ou WEBP.');if(file.size>8*1024*1024)return notify('A imagem deve ter no máximo 8 MB.');const reader=new FileReader();reader.onerror=()=>notify('Não foi possível ler a imagem selecionada.');reader.onload=()=>{const image=new Image();image.onload=()=>{try{const side=256,canvas=document.createElement('canvas');canvas.width=side;canvas.height=side;const ctx=canvas.getContext('2d');if(image.naturalWidth>10000||image.naturalHeight>10000)return notify('A imagem possui dimensões muito grandes. Escolha uma foto menor.');ctx.fillStyle='#fff5dc';ctx.fillRect(0,0,side,side);const crop=Math.min(image.naturalWidth,image.naturalHeight),sx=(image.naturalWidth-crop)/2,sy=(image.naturalHeight-crop)/2;ctx.drawImage(image,sx,sy,crop,crop,0,0,side,side);profilePhotoDraft=canvas.toDataURL('image/jpeg',.82);if(profilePhotoDraft.length>400000)profilePhotoDraft=canvas.toDataURL('image/jpeg',.68);renderModal();notify('Prévia pronta. Clique em “Aplicar foto” para salvar.')}catch(err){console.error(err);notify('Não foi possível processar esta imagem.')}};image.onerror=()=>notify('Não foi possível abrir a imagem selecionada.');image.src=reader.result};reader.readAsDataURL(file)}
function setMood(id){if(writeLocked)return notify('Salvamento protegido.');if(!MOODS.some(m=>m.id===id))return;const today=todayKey();if(state.mood===id&&state.moodDate!==today){state.moodDate=today;remember('Confirmou o humor diário: '+MOODS.find(m=>m.id===id).name+'.');markDirty();refresh();return notify('Humor diário confirmado.')}if(state.mood===id)return notify('Este já é seu humor atual.');if(state.moodDate===today){if(state.coins<1000)return notify('Trocar o humor novamente hoje custa 1.000 moedas amarelas.');state.coins-=1000;remember('Pagou 1.000 moedas para trocar o humor novamente.')}state.mood=id;state.moodDate=today;remember('Definiu o humor diário: '+MOODS.find(m=>m.id===id).name+'.');markDirty();refresh();notify('Humor atualizado: '+MOODS.find(m=>m.id===id).name+'.')}

function buyFishingRod(id,currency){
 if(writeLocked)return notify('Salvamento protegido.');
 const rod=FISHING_RODS[id];if(!rod||id==='normal')return;
 if(state.fishing.rods.includes(id))return selectFishingRod(id);
 if(farmLevel()<rod.level)return notify(`A vara ${rod.name} exige nível ${rod.level}.`);
 const wallet=currency==='greenCoins'?'greenCoins':'coins',price=currency==='greenCoins'?rod.greenCoins:rod.coins;
 if(state[wallet]<price)return notify(currency==='greenCoins'?'Moedas verdes insuficientes.':'Moedas amarelas insuficientes.');
 state[wallet]-=price;state.fishing.rods.push(id);discoverItem('equipamentos','vara_'+id,'Vara '+rod.name,'🪝');state.fishing.rod=id;
 remember(`Comprou a vara de pesca ${rod.name}.`);markDirty();refresh();notify(`Vara ${rod.name} comprada e equipada!`);
}
function selectFishingRod(id){if(!farmWriteAllowed())return;
 if(!FISHING_RODS[id]||!state.fishing.rods.includes(id))return;
 state.fishing.rod=id;remember(`Equipou a vara ${FISHING_RODS[id].name}.`);markDirty();refresh();notify(`Vara ${FISHING_RODS[id].name} equipada.`);
}
function syncPendingFishing(){
 if(!state||!farmWriteAllowed(false))return false;
 const now=Date.now();let changed=false;const celebrations=[];
 const river=state.fishing?.pendingCatch;
 if(river&&river.readyAt<=now&&FISH_TYPES[river.id]){
  const fish=FISH_TYPES[river.id];state.fishing.pendingCatch=null;
  state.fishWarehouse[river.id]=(state.fishWarehouse[river.id]||0)+1;
  state.progressCounters.fish=(state.progressCounters.fish||0)+1;bumpMissionProgress('fish',1);
  discoverItem('rio',river.id,fish.name,fish.icon);const earnedXP=awardProfessionXP('fisher',fish.xp,'pescaria');
  const rod=FISHING_RODS[river.rod]||FISHING_RODS.normal;
  remember((river.isExtraordinary?'Pescou extraordinariamente ':'Pescou ')+fish.name+' com a vara '+rod.name+'.');
  celebrations.push({name:fish.name,icon:fish.icon,rarity:fish.rarity,xp:earnedXP,isExtraordinary:!!river.isExtraordinary,scene:'river'});
  changed=true;
 }
 const sea=state.seaFishing?.pendingCatch;
 if(sea&&sea.readyAt<=now&&SEA_TYPES[sea.id]){
  const item=SEA_TYPES[sea.id];state.seaFishing.pendingCatch=null;
  if(sea.id!=='caviar')state.seaWarehouse[sea.id]=(state.seaWarehouse[sea.id]||0)+1;
  state.inventory.caviar=(state.inventory.caviar||0)+3;
  state.progressCounters.fish=(state.progressCounters.fish||0)+1;bumpMissionProgress('fish',1);
  discoverItem('mar',sea.id,item.name,item.icon);const earnedXP=awardProfessionXP('fisher',item.xp,'pesca no mar');
  const net=SEA_NETS[sea.net]||SEA_NETS.normal;
  remember((sea.isExtraordinary?'Capturou extraordinariamente ':'Capturou ')+item.name+' com a rede '+net.name+'. Recompensa adicional: 3 caviares.');
  celebrations.push({name:item.name,icon:item.icon,rarity:item.rarity,xp:earnedXP,quantity:1,reward:'+3 caviares',isExtraordinary:!!sea.isExtraordinary,scene:'sea'});
  changed=true;
 }
 if(changed){markDirty();refresh();celebrations.forEach(queueFishingCelebration)}
 return changed;
}
function updateFishingCooldownButtons(){
 syncPendingFishing();
 const now=Date.now(),body=$('modal-body');
 if(body){
  const fishing=body.querySelector('[data-cast-fish]');if(fishing){
   const pending=state.fishing.pendingCatch,remaining=pending?Math.max(0,pending.readyAt-now):Math.max(0,FISH_COOLDOWN-(now-(state.fishing.lastCastAt||0))),waiting=remaining>0;
   fishing.disabled=writeLocked||waiting;
   fishing.textContent=pending?'🐟 Peixe fisgado · '+Math.ceil(remaining/1000)+'s':waiting?'Aguarde '+Math.ceil(remaining/1000)+'s':'Lançar a vara · Pescar';
  }
  const sea=body.querySelector('[data-cast-sea]');if(sea){
   const pending=state.seaFishing.pendingCatch,remaining=pending?Math.max(0,pending.readyAt-now):Math.max(0,SEA_FISH_COOLDOWN-(now-(state.seaFishing.lastCastAt||0))),waiting=remaining>0;
   sea.disabled=writeLocked||waiting||farmLevel()<22;
   sea.textContent=pending?'🐟 Captura na rede · '+Math.ceil(remaining/1000)+'s':waiting?'Aguarde '+Math.ceil(remaining/1000)+'s':'Lançar a rede · Pescar no mar';
  }
 }
 const status=$('sea-fishing-status');
 if(status&&!status.classList.contains('is-result')){
  const isSea=activeScene==='sea',isRiver=activeScene==='river';
  const pending=isSea?state?.seaFishing?.pendingCatch:isRiver?state?.fishing?.pendingCatch:null;
  if(pending){
   const duration=isSea?SEA_FISH_COOLDOWN:FISH_COOLDOWN,remaining=Math.max(0,pending.readyAt-now);
   const seconds=Math.ceil(remaining/1000),progress=Math.max(0,Math.min(100,(1-remaining/duration)*100));
   status.dataset.scene=activeScene;status.hidden=false;status.innerHTML='<strong>'+(isSea?'🌊 Pesca em andamento':'🎣 Pesca no Rio em andamento')+'</strong><span>Aguarde '+seconds+'s para descobrir o peixe</span><i><b style="width:'+progress+'%"></b></i>';
  }else{status.hidden=true;status.replaceChildren();status.classList.remove('is-result')}
 }
}
function weightedFishingChoice(entries,levelKey,level){
 const weighted=entries.map(([id,item])=>({id,item,weight:item.weight})).filter(x=>x.weight>0);
 const total=weighted.reduce((sum,x)=>sum+x.weight,0);let roll=Math.random()*total;
 for(const x of weighted){roll-=x.weight;if(roll<=0)return x.id;}
 return weighted[0]?.id||null;
}
function extraordinaryFishingChoice(types,levelKey,level){
 const candidates=Object.entries(types).filter(([,item])=>item.extraordinaryOnly||item[levelKey]>level);
 if(!candidates.length)return null;
 const weighted=candidates.map(([id,item])=>({id,weight:item.weight/(item.extraordinaryOnly?1:Math.pow(item[levelKey]-level,1.5))}));
 const total=weighted.reduce((sum,x)=>sum+x.weight,0);let roll=Math.random()*total;
 for(const x of weighted){roll-=x.weight;if(roll<=0)return x.id;}
 return weighted[0]?.id||null;
}
function castFishingRod(){
 if(soundEnabled)ensureAudio();
 if(writeLocked)return notify('Salvamento protegido.');
 if(!state.expansions.pond)return notify('Libere primeiro o Lago nas Expansões.');
 const now=Date.now(),remaining=FISH_COOLDOWN-(now-(state.fishing.lastCastAt||0));
 if(remaining>0)return notify(`Aguarde mais ${Math.ceil(remaining/1000)} segundo(s) para pescar novamente.`);
 const rod=FISHING_RODS[state.fishing.rod]||FISHING_RODS.normal;
 const available=Object.entries(FISH_TYPES).filter(([,f])=>!f.extraordinaryOnly&&f.minRod<=rod.order);
 const misses=state.fishing.extraordinaryMisses||0;
 const chance=Math.min(8,2+Math.floor(misses/5)*.5);
 const extraordinary=misses>=40-1||Math.random()*100<chance;
 let fishId=rod.extraordinaryOnly?extraordinaryFishingChoice(FISH_TYPES,'minRod',rod.order):(extraordinary?extraordinaryFishingChoice(FISH_TYPES,'minRod',rod.order):null);
 const isExtraordinary=!!fishId;
 if(rod.extraordinaryOnly&&!fishId)return notify('Nenhum peixe extraordinário disponível para esta vara.');
 if(!fishId)fishId=weightedFishingChoice(available,'minRod',rod.order);
 if(!fishId)return notify('Nenhum peixe disponível para este equipamento.');
 state.fishing.lastCastAt=now;
 state.fishing.extraordinaryMisses=isExtraordinary?0:Math.min(40,misses+1);
 state.fishing.pendingCatch={id:fishId,readyAt:now+FISH_COOLDOWN,isExtraordinary,rod:state.fishing.rod};
 markDirty();refresh();
 notify('🎣 Linha lançada! Aguarde a contagem para descobrir o peixe.');
}

function buyGrill(){if(writeLocked)return notify('Salvamento protegido.');if(state.grill.owned)return;if(state.coins<1000)return notify('A churrasqueira custa 1.000 moedas amarelas.');state.coins-=1000;state.grill.owned=true;remember('Comprou a churrasqueira desmontada.');markDirty();renderFarmAddons();refresh();notify('Churrasqueira comprada! Agora reúna os componentes para montá-la.')}
function buyGrillPart(id){if(writeLocked)return notify('Salvamento protegido.');if(!state.grill.owned||state.grill.assembled||!GRILL_PARTS[id])return;const have=state.grill.parts[id]||0;if(have>=GRILL_PARTS_REQUIRED)return notify('Você já reuniu todas as peças deste tipo.');if(state.greenCoins<1)return notify('É necessária 1 moeda verde por componente nesta adaptação offline.');state.greenCoins--;state.grill.parts[id]=have+1;remember('Adquiriu '+GRILL_PARTS[id].name+'.');markDirty();refresh();if(Object.keys(GRILL_PARTS).every(k=>state.grill.parts[k]>=GRILL_PARTS_REQUIRED))notify('Todos os componentes reunidos! Já pode montar a churrasqueira.');}
function assembleGrill(){if(writeLocked)return notify('Salvamento protegido.');if(!state.grill.owned||state.grill.assembled)return;const ready=Object.keys(GRILL_PARTS).every(k=>(state.grill.parts[k]||0)>=GRILL_PARTS_REQUIRED);if(!ready)return notify('Ainda faltam componentes para montar a churrasqueira.');state.grill.assembled=true;remember('Montou a churrasqueira da fazenda.');markDirty();renderFarmAddons();refresh();notify('Churrasqueira montada! O livro de receitas está disponível.')}

function ingredientCount(type,id){if(type==='crop')return state.warehouse[id]||0;if(type==='meat')return state.meatWarehouse[id]||0;if(type==='fish')return state.fishWarehouse[id]||0;if(type==='sea')return state.seaWarehouse[id]||0;if(type==='wood')return state.woodWarehouse[id]||0;if(type==='animal')return state.animalWarehouse[id]||0;if(type==='herb')return (state.inventory['herb_'+id]||0)+(id==='folha_louro'?(state.inventory.bay_leaf||0):0);if(type==='flower')return state.flowerWarehouse[id]||0;if(type==='mix')return state.inventory['mix_'+id]||0;return state.inventory[id]||0}
function ingredientName(type,id){if(type==='crop')return CROPS[id]?.name||id;if(type==='meat')return MEAT_PRODUCTS[id]?.name||id;if(type==='fish')return FISH_TYPES[id]?.name||id;if(type==='sea')return SEA_TYPES[id]?.name||id;if(type==='wood')return FOREST_TREES[Object.keys(FOREST_TREES).find(k=>FOREST_TREES[k].wood===id)]?.woodName||id;if(type==='animal')return ANIMAL_PRODUCTS[id]?.name||id;if(type==='flower')return CROPS[id]?.name||id;if(type==='mix')return MIX_HERB_RECIPES[id]?.name||id;if(type==='herb')return ({arruda:'Folha de Arruda',guine:'Folha de Guiné',pata_vaca:'Folha de Pata-de-Vaca',peregum_verde:'Folha de Peregum Verde',boldo:'Folha de Boldo',manjericao:'Folha de Manjericão',pega_pinto:'Folha de Pega-Pinto',jureminha:'Folha de Jureminha',alecrim:'Folha de Alecrim',folha_manga:'Folha de Manga',folha_goiaba:'Folha de Goiaba',folha_cana:'Folha de Cana-de-Açúcar',folha_pitangueira:'Folha de Pitangueira',folha_aroeira:'Folha de Aroeira',folha_eucalipto:'Folha de Eucalipto',folha_acerola:'Folha de Acerola',folha_louro:'Folha de Louro'})[id]||id;return GRILL_SUPPLIES[id]?.name||id}

Object.assign(GRILL_RECIPES,{
 kitchen_feijoada:{name:'Feijoada Completa',icon:'🍲',minutes:95,yield:3,salePrice:980,xp:52,kitchenOnly:true,category:'savory',ingredients:[['crop','feijao',3],['meat','pork',2],['crop','arroz',2],['supply','seasoning',1]]},
 kitchen_frango_cremoso:{name:'Frango Cremoso com Milho',icon:'🍗',minutes:42,yield:3,salePrice:590,xp:32,kitchenOnly:true,category:'savory',ingredients:[['meat','chicken',1],['crop','milho',2],['animal','milk',1]]},
 kitchen_escondidinho:{name:'Escondidinho Caipira',icon:'🥘',minutes:58,yield:3,salePrice:720,xp:38,kitchenOnly:true,category:'savory',ingredients:[['crop','batata',3],['meat','beef',1],['animal','milk',1]]},
 kitchen_arroz_leite:{name:'Arroz-doce Cremoso',icon:'🍚',minutes:35,yield:3,salePrice:430,xp:25,kitchenOnly:true,category:'savory',ingredients:[['crop','arroz',2],['animal','milk',2],['supply','honey',1]]},
 kitchen_bolo_milho:{name:'Bolo de Milho da Roça',icon:'🍰',minutes:48,yield:3,salePrice:620,xp:34,kitchenOnly:true,category:'savory',ingredients:[['crop','milho',3],['animal','eggs',2],['animal','milk',1]]},
 kitchen_pamonha:{name:'Pamonha Doce',icon:'🌽',minutes:40,yield:3,salePrice:520,xp:29,kitchenOnly:true,category:'savory',ingredients:[['crop','milho',3],['animal','milk',1],['supply','honey',1]]},
 kitchen_curau:{name:'Curau de Milho',icon:'🍮',minutes:32,yield:2,salePrice:460,xp:24,kitchenOnly:true,category:'savory',ingredients:[['crop','milho',2],['animal','milk',2]]},
 kitchen_abobora_coco:{name:'Doce de Abóbora com Coco',icon:'🎃',minutes:44,yield:3,salePrice:580,xp:31,kitchenOnly:true,category:'sweet',ingredients:[['crop','abobora',2],['crop','coco',1],['supply','honey',1]]},
 kitchen_torta_maca:{name:'Torta de Maçã',icon:'🥧',minutes:55,yield:2,salePrice:680,xp:36,kitchenOnly:true,category:'sweet',ingredients:[['crop','maca',2],['animal','eggs',2],['animal','milk',1]]},
 kitchen_salada_frutas:{name:'Salada Tropical',icon:'🍍',minutes:22,yield:2,salePrice:390,xp:20,kitchenOnly:true,category:'sweet',ingredients:[['crop','maca',1],['crop','mamao',1],['crop','abacaxi',1]]},
 kitchen_sopa_legumes:{name:'Sopa de Legumes',icon:'🥣',minutes:38,yield:3,salePrice:490,xp:27,kitchenOnly:true,category:'savory',ingredients:[['crop','batata',2],['crop','cenoura',2],['crop','tomate',1]]},
 kitchen_pao_milho:{name:'Broa de Milho',icon:'🍞',minutes:46,yield:3,salePrice:540,xp:30,kitchenOnly:true,category:'savory',ingredients:[['crop','milho',2],['animal','eggs',1],['animal','milk',1]]},
 kitchen_quiche:{name:'Quiche de Legumes',icon:'🥧',minutes:52,yield:2,salePrice:690,xp:37,kitchenOnly:true,category:'savory',ingredients:[['animal','eggs',3],['crop','tomate',1],['crop','ervilha',1]]},
 kitchen_geleia_goiaba:{name:'Geleia de Goiaba',icon:'🍯',minutes:36,yield:3,salePrice:510,xp:28,kitchenOnly:true,category:'sweet',ingredients:[['crop','goiaba',2],['supply','honey',1]]},
 kitchen_banana_assada:{name:'Banana Assada com Mel',icon:'🍌',minutes:25,yield:2,salePrice:370,xp:19,kitchenOnly:true,category:'sweet',ingredients:[['crop','banana',2],['supply','honey',1]]},
 kitchen_robalo:{name:'Robalo ao Molho de Ervas',icon:'🐟',minutes:62,yield:2,salePrice:890,xp:46,kitchenOnly:true,category:'savory',ingredients:[['sea','robalo',1],['crop','tomate',1],['supply','seasoning',1]]},
 kitchen_tainha:{name:'Tainha Assada com Limão',icon:'🐟',minutes:58,yield:2,salePrice:820,xp:42,kitchenOnly:true,category:'savory',ingredients:[['sea','tainha',1],['crop','limao',2],['supply','seasoning',1]]},
 kitchen_corvina:{name:'Corvina ao Forno',icon:'🐟',minutes:66,yield:2,salePrice:940,xp:48,kitchenOnly:true,category:'savory',ingredients:[['sea','corvina',1],['crop','batata',2],['crop','tomate',1]]},
 kitchen_pescada:{name:'Pescada-amarela Grelhada',icon:'🐟',minutes:70,yield:2,salePrice:1020,xp:52,kitchenOnly:true,category:'savory',ingredients:[['sea','pescada',1],['crop','pimenta',1],['supply','seasoning',1]]},
 kitchen_sardinha:{name:'Sardinha na Cebola',icon:'🐟',minutes:34,yield:3,salePrice:590,xp:30,kitchenOnly:true,category:'savory',ingredients:[['sea','sardinha',2],['crop','cebola',1],['crop','tomate',1]]},
 kitchen_camaroes:{name:'Camarão Cremoso',icon:'🍤',minutes:48,yield:2,salePrice:980,xp:50,kitchenOnly:true,category:'savory',ingredients:[['sea','camarao',2],['animal','milk',1],['crop','cebola',1],['crop','alho',1]]},
 kitchen_lula:{name:'Lula Recheada',icon:'🦑',minutes:72,yield:2,salePrice:1180,xp:58,kitchenOnly:true,category:'savory',ingredients:[['sea','lula',1],['crop','arroz',1],['crop','tomate',1]]},
 kitchen_polvo:{name:'Polvo ao Vinagrete',icon:'🐙',minutes:88,yield:2,salePrice:1450,xp:68,kitchenOnly:true,category:'savory',ingredients:[['sea','polvo',1],['crop','tomate',2],['crop','pimenta',1]]},
 kitchen_ostra:{name:'Ostras Gratinadas',icon:'🦪',minutes:54,yield:2,salePrice:1100,xp:56,kitchenOnly:true,category:'savory',ingredients:[['sea','ostra',3],['animal','milk',1],['supply','seasoning',1]]},
 kitchen_vieira:{name:'Vieiras na Manteiga',icon:'🦪',minutes:60,yield:2,salePrice:1320,xp:64,kitchenOnly:true,category:'savory',ingredients:[['sea','vieira',2],['animal','milk',1],['crop','alho',1]]},
 kitchen_mexilhao:{name:'Mexilhões ao Molho de Tomate',icon:'🦪',minutes:52,yield:3,salePrice:990,xp:50,kitchenOnly:true,category:'savory',ingredients:[['sea','mexilhao',3],['crop','tomate',2],['supply','seasoning',1]]},
 kitchen_garoupa:{name:'Garoupa com Crosta de Ervas',icon:'🐟',minutes:82,yield:2,salePrice:1420,xp:70,kitchenOnly:true,category:'savory',ingredients:[['sea','garoupa',1],['crop','milho',1],['supply','seasoning',1]]},
 kitchen_torta_bovina:{name:'Empadão Caipira de Carne Bovina',icon:'🥧',minutes:48,yield:3,salePrice:720,xp:38,kitchenOnly:true,category:'savory',ingredients:[['meat','beef',1],['crop','batata',2],['animal','eggs',1]]},
 kitchen_cabra_ensopada:{name:'Ensopado de Cabra com Ervas',icon:'🍲',minutes:52,yield:2,salePrice:680,xp:36,kitchenOnly:true,category:'savory',ingredients:[['meat','goat',1],['crop','tomate',1],['crop','batata',1],['supply','seasoning',1]]},
 kitchen_acassa:{name:'Acaçá na Folha de Bananeira',icon:'🌽',minutes:48,yield:3,salePrice:560,xp:32,kitchenOnly:true,category:'savory',ingredients:[['crop','milho_canjica',2],['supply','banana_leaf',1]]},
 kitchen_acaraje_baiano:{name:'Acarajé Baiano',icon:'🫘',minutes:72,yield:2,salePrice:980,xp:58,kitchenOnly:true,category:'savory',ingredients:[['crop','feijao_fradinho',3],['supply','dende_oil',1],['sea','camarao',1]]},
 kitchen_nhoque_mandioca_carne:{name:'Nhoque de Mandioca com Carne',icon:'🍝',minutes:78,yield:3,salePrice:920,xp:54,kitchenOnly:true,category:'savory',ingredients:[['crop','mandioca',3],['meat','beef',1],['animal','eggs',1],['crop','tomate',1]]},
 kitchen_canjica_doce:{name:'Canjica Doce',icon:'🍮',minutes:55,yield:3,salePrice:640,xp:36,kitchenOnly:true,category:'sweet',ingredients:[['crop','milho_canjica',2],['animal','milk',2],['crop','coco',1],['supply','honey',1]]},
 kitchen_mungunza_salgado:{name:'Mungunzá Salgado',icon:'🍲',minutes:68,yield:3,salePrice:790,xp:44,kitchenOnly:true,category:'savory',ingredients:[['crop','milho_canjica',2],['meat','pork',1],['supply','seasoning',1]]},
 kitchen_abara_baiano:{name:'Abará Baiano',icon:'🍃',minutes:64,yield:2,salePrice:850,xp:48,kitchenOnly:true,category:'savory',ingredients:[['crop','feijao_fradinho',2],['supply','dende_oil',1],['supply','banana_leaf',1],['sea','camarao',1]]},
 kitchen_escondidinho_mandioca:{name:'Escondidinho de Mandioca com Carne',icon:'🥘',minutes:62,yield:3,salePrice:880,xp:50,kitchenOnly:true,category:'savory',ingredients:[['crop','mandioca',3],['meat','beef',1],['animal','milk',1],['crop','tomate',1]]},
 kitchen_bolinho_aipim:{name:'Bolinho de Aipim com Carne',icon:'🥟',minutes:50,yield:3,salePrice:720,xp:40,kitchenOnly:true,category:'savory',ingredients:[['crop','mandioca',2],['meat','beef',1],['animal','eggs',1]]},
 kitchen_ekuru_baiano:{name:'Ekuru Baiano',icon:'🍃',minutes:66,yield:2,salePrice:890,xp:50,kitchenOnly:true,category:'savory',ingredients:[['crop','feijao_fradinho',2],['crop','cebola',1],['supply','banana_leaf',1]]},
 kitchen_stuffed_peppers:{name:'Pimentões Recheados à Brasileira',icon:'🫑',minutes:95,yield:2,salePrice:980,xp:42,kitchenOnly:true,category:'savory',ingredients:[['crop','pimentao_verde',1],['crop','pimentao_vermelho',1],['meat','beef',1],['crop','arroz',1],['crop','cebola',1]]},
 kitchen_yellow_pepper_risotto:{name:'Risoto de Pimentão Amarelo',icon:'🍚',minutes:85,yield:2,salePrice:920,xp:40,kitchenOnly:true,category:'savory',ingredients:[['crop','pimentao_amarelo',1],['crop','arroz',2],['crop','cebola',1],['supply','seasoning',1]]},
 kitchen_gourmet_beef:{name:'Filé Mignon com Purê da Fazenda',icon:'🥩',minutes:150,yield:1,salePrice:2400,xp:90,kitchenOnly:true,gourmet:true,category:'savory',ingredients:[['meat','beef',2],['crop','batata',2],['crop','cebola',1],['supply','seasoning',1]]},
 kitchen_gourmet_salmon:{name:'Risoto Cremoso de Salmão',icon:'🐟',minutes:135,yield:1,salePrice:2250,xp:84,kitchenOnly:true,gourmet:true,category:'savory',ingredients:[['sea','salmao',1],['crop','arroz',2],['crop','cebola',1],['herb','alecrim',1]]},
 kitchen_gourmet_duck:{name:'Pato à L’Orange com Pimentão',icon:'🦆',minutes:165,yield:1,salePrice:2600,xp:96,kitchenOnly:true,gourmet:true,category:'savory',ingredients:[['meat','duck',2],['crop','laranja',2],['crop','pimentao_amarelo',1],['herb','folha_louro',1]]},
 kitchen_gourmet_tatin:{name:'Tarte Tatin de Maçã',icon:'🍎',minutes:120,yield:1,salePrice:1900,xp:78,kitchenOnly:true,gourmet:true,category:'sweet',ingredients:[['crop','maca',3],['animal','eggs',1],['supply','honey',1]]},
 kitchen_gourmet_mousse:{name:'Mousse de Chocolate Amargo',icon:'🍫',minutes:90,yield:2,salePrice:1750,xp:72,kitchenOnly:true,gourmet:true,category:'sweet',ingredients:[['crop','cacau',2],['animal','eggs',2],['crop','morango',1]]},
 kitchen_gourmet_peach:{name:'Pêssegos Caramelizados com Mel',icon:'🍑',minutes:80,yield:2,salePrice:1650,xp:68,kitchenOnly:true,gourmet:true,category:'sweet',ingredients:[['crop','pessego',2],['supply','honey',1],['animal','eggs',1]]},
 grill_peppers_beef:{name:'Espetinho de Carne com Pimentões Coloridos',icon:'🍢',minutes:105,yield:2,salePrice:1180,xp:48,ingredients:[['meat','beef',1],['crop','pimentao_verde',1],['crop','pimentao_vermelho',1],['crop','cebola',1]]},
 grill_pepper_chicken:{name:'Frango na Brasa com Pimentão Amarelo',icon:'🍗',minutes:100,yield:2,salePrice:1050,xp:44,ingredients:[['meat','chicken',1],['crop','pimentao_amarelo',1],['herb','alecrim',1],['supply','seasoning',1]]},
 grill_gourmet_tenderloin:{name:'Medalhão de Filé Mignon com Pimentões',icon:'🥩',minutes:180,yield:1,salePrice:2700,xp:100,gourmet:true,ingredients:[['meat','beef',2],['crop','pimentao_vermelho',1],['crop','pimentao_amarelo',1],['crop','cebola',1]]},
 grill_gourmet_salmon:{name:'Salmão Grelhado com Ervas Finas',icon:'🐟',minutes:165,yield:1,salePrice:2500,xp:94,gourmet:true,ingredients:[['sea','salmao',1],['crop','pimentao_verde',1],['herb','alecrim',2],['herb','folha_louro',1]]},
 grill_gourmet_duck:{name:'Peito de Pato Grelhado com Laranja',icon:'🦆',minutes:180,yield:1,salePrice:2800,xp:104,gourmet:true,ingredients:[['meat','duck',2],['crop','laranja',2],['crop','pimentao_amarelo',1],['supply','seasoning',1]]}
});

const MIX_HERB_RECIPES={
 banho_sete_ervas:{name:'Banho de Sete Ervas',icon:'🛁',yield:1,xp:42,ingredients:[['herb','arruda',1],['herb','guine',1],['herb','boldo',1],['herb','manjericao',1],['herb','alecrim',1],['herb','jureminha',1],['herb','peregum_verde',1]],note:'Composição inspirada em registros acadêmicos de banhos ritualísticos; as combinações variam entre comunidades e casas.'},
 banho_descarrego:{name:'Banho tradicional de descarrego',icon:'🌿',yield:1,xp:36,ingredients:[['herb','arruda',1],['herb','guine',1],['herb','manjericao',1],['supply','lavender',1]],note:'Arruda, guiné, manjericão e alfazema aparecem juntos em registro etnográfico de preparo tradicional.'},
 banho_energizacao:{name:'Banho de Energização',icon:'✨',yield:1,xp:34,ingredients:[['herb','alecrim',2],['herb','manjericao',1],['supply','lavender',1]],note:'Alecrim e manjericão são citados em preparos tradicionais de energização e renovação.'},
 banho_protecao:{name:'Banho de proteção',icon:'🛡️',yield:1,xp:38,ingredients:[['herb','arruda',1],['herb','guine',1],['herb','alecrim',1]],note:'Mistura baseada em práticas tradicionais documentadas; respeite as orientações da sua tradição.'},
 banho_renovacao_pitangueira:{name:'Banho com Folha de Pitangueira',icon:'🍃',yield:1,xp:32,ingredients:[['herb','folha_pitangueira',2],['herb','alecrim',1],['herb','manjericao',1]],note:'A folha de pitanga aparece em registros de banhos com sete ervas.'},
 banho_folhas_aromaticas:{name:'Banho de Folhas Aromáticas',icon:'🌱',yield:1,xp:30,ingredients:[['herb','folha_manga',1],['herb','folha_goiaba',1],['herb','folha_acerola',1],['supply','lavender',1]],note:'Preparação simbólica de jogo que reúne folhas de árvores cultivadas; não representa fórmula ritual universal.'},
 banho_mata:{name:'Banho da Mata',icon:'🌳',yield:1,xp:40,ingredients:[['herb','pata_vaca',1],['herb','pega_pinto',1],['herb','jureminha',1],['herb','folha_aroeira',1],['herb','folha_eucalipto',1]],note:'Receita temática do jogo baseada nas espécies citadas em estudos etnobotânicos e práticas locais.'},
 banho_louro_alfazema:{name:'Defumação de Louro, Alfazema e Cana',icon:'🪻',yield:1,xp:35,ingredients:[['herb','folha_louro',2],['supply','lavender',1],['herb','folha_cana',1]],note:'Inspirada em registros de defumação de prosperidade com louro, alfazema e cana; a quantidade e a combinação foram adaptadas para o jogo.'},
 tempero_aromatico:{name:'Tempero aromático de Louro e Alecrim',icon:'🧂',yield:2,xp:28,ingredients:[['herb','folha_louro',2],['herb','alecrim',2],['herb','manjericao',1]],note:'Mistura culinária inspirada no uso gastronômico tradicional do louro, alecrim e manjericão.'},
 tempero_verde_mata:{name:'Tempero verde da Mata',icon:'🌿',yield:2,xp:26,ingredients:[['herb','alecrim',1],['herb','manjericao',2],['herb','folha_louro',1]],note:'Mistura culinária de ervas aromáticas; não utiliza espécies de uso ritual ou não culinário.'},
 banho_louro_prosperidade:{name:'Banho da Prosperidade',icon:'🍃',yield:1,xp:40,ingredients:[['herb','folha_louro',3],['herb','manjericao',1],['herb','alecrim',1]],note:'Receita publicada pela Rede Bahia/Globo: manjericão, alecrim e três folhas de louro. A associação à prosperidade pertence à tradição popular.'},
 banho_louro_amor:{name:'Banho do Amor',icon:'🌹',yield:1,xp:40,ingredients:[['supply','camomile',1],['herb','folha_louro',3],['supply','cinnamon',1],['flower','rosa_vermelha',1]],note:'Receita popular que combina camomila, folhas de louro, canela e rosa.'},
 banho_pipoca:{name:'Banho de Pipoca',icon:'🍿',yield:1,xp:38,ingredients:[['crop','milho',10]],note:'Preparação simbólica inspirada em tradições populares que associam pipoca à limpeza e renovação; requer 10 unidades de milho.'},
 banho_casca_laranja:{name:'Banho de Casca de Laranja',icon:'🍊',yield:1,xp:32,ingredients:[['crop','laranja',1]],note:'Inspirado em receitas populares de banho com casca de laranja; a fruta é colhida no pomar.'},
 banho_pitangueira:{name:'Banho de Pitangueira',icon:'🍃',yield:1,xp:34,ingredients:[['herb','folha_pitangueira',2],['herb','folha_louro',1],['herb','manjericao',1]],note:'Inspirado em registros de banhos tradicionais com folha de pitanga, louro e manjericão.'},
 tempero_pimenta_alecrim:{name:'Tempero de Pimenta e Alecrim',icon:'🌶️',yield:2,xp:30,ingredients:[['crop','pimenta',1],['crop','alho',1],['herb','alecrim',2],['herb','manjericao',1]],note:'Mistura culinária da fazenda para carnes, aves e peixes; combina pimenta, alho, alecrim e manjericão.'},
 tempero_pimentao_verde:{name:'Tempero de Pimentão Verde e Ervas',icon:'🫑',yield:2,xp:34,ingredients:[['crop','pimentao_verde',2],['herb','alecrim',1],['herb','manjericao',1]],note:'Pasta fresca de pimentão verde, alecrim e manjericão.'},
 tempero_pimentao_vermelho:{name:'Tempero de Pimentão Vermelho Defumado',icon:'🫑',yield:2,xp:38,ingredients:[['crop','pimentao_vermelho',2],['herb','folha_louro',1],['supply','seasoning',1]],note:'Mistura de pimentão vermelho, louro e especiarias.'},
 tempero_pimentao_amarelo:{name:'Tempero de Pimentão Amarelo e Limão',icon:'🍋',yield:2,xp:36,ingredients:[['crop','pimentao_amarelo',2],['crop','limao',1],['herb','alecrim',1]],note:'Tempero cítrico de pimentão amarelo, limão e alecrim.'},
 tempero_cajun:{name:'Tempero Cajun',icon:'🌶️',yield:2,xp:40,ingredients:[['crop','pimenta',2],['crop','pimentao_vermelho',1],['herb','alecrim',1],['supply','seasoning',1]],note:'Mistura inspirada no tempero cajun da Louisiana.'},
 tempero_italiano:{name:'Tempero Italiano de Tomate e Manjericão',icon:'🍅',yield:2,xp:32,ingredients:[['crop','tomate',2],['herb','manjericao',2],['herb','alecrim',1]],note:'Base aromática de tomate e ervas italianas.'},
 tempero_citrico_peixes:{name:'Tempero Cítrico para Peixes',icon:'🐟',yield:2,xp:35,ingredients:[['crop','limao',1],['herb','alecrim',2],['herb','folha_louro',1]],note:'Combinação de limão, alecrim e louro para peixes.'},
 tempero_mineiro:{name:'Tempero Mineiro de Alho e Cebola',icon:'🧄',yield:3,xp:30,ingredients:[['crop','alho',2],['crop','cebola',2],['herb','manjericao',1]],note:'Pasta caseira de alho, cebola e ervas.'},
 tempero_pimentoes_coloridos:{name:'Tempero de Pimentões Coloridos',icon:'🌈',yield:3,xp:44,ingredients:[['crop','pimentao_verde',1],['crop','pimentao_vermelho',1],['crop','pimentao_amarelo',1],['herb','alecrim',1]],note:'Mistura tricolor de pimentões e alecrim.'},
 tempero_ervas_provence:{name:'Ervas de Provence',icon:'🌿',yield:2,xp:42,ingredients:[['herb','alecrim',1],['herb','manjericao',1],['herb','folha_louro',1],['supply','lavender',1]],note:'Mistura inspirada nas ervas aromáticas provençais.'}
};

Object.assign(GRILL_RECIPES,{
 kitchen_chicken_stew:{name:'Frango Ensopado com Mandioca',icon:'🍗',minutes:48,yield:2,salePrice:620,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","chicken",1],["crop","mandioca",1],["crop","cebola",1]]},
 kitchen_chicken_farm:{name:'Frango Cremoso de Panela',icon:'🍗',minutes:55,yield:2,salePrice:680,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","chicken",1],["crop","batata",1],["crop","alho",1]]},
 grill_chicken_herbs:{name:'Frango na Brasa com Alho',icon:'🍗',minutes:62,yield:2,salePrice:690,xp:38,ingredients:[["meat","chicken",1],["crop","alho",1],["supply","seasoning",1]]},
 grill_chicken_skewer:{name:'Frango Grelhado com Pimenta',icon:'🍗',minutes:68,yield:2,salePrice:740,xp:38,ingredients:[["meat","chicken",1],["crop","pimenta",1],["crop","cebola",1]]},
 kitchen_turkey_stew:{name:'Peru Ensopado com Batatas e Tomate',icon:'🦃',minutes:48,yield:2,salePrice:620,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","turkey",1],["crop","batata",1],["crop","tomate",1]]},
 kitchen_turkey_farm:{name:'Peru ao Alho e Cebola',icon:'🦃',minutes:55,yield:2,salePrice:680,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","turkey",1],["crop","alho",1],["crop","alho",1]]},
 grill_turkey_herbs:{name:'Peru na Brasa com Alho e Tempero',icon:'🦃',minutes:62,yield:2,salePrice:690,xp:38,ingredients:[["meat","turkey",1],["crop","alho",1],["supply","seasoning",1]]},
 grill_turkey_skewer:{name:'Espetinho de Peru Temperado',icon:'🦃',minutes:68,yield:2,salePrice:740,xp:38,ingredients:[["meat","turkey",1],["crop","pimenta",1],["crop","cebola",1]]},
 kitchen_duck_stew:{name:'Pato Ensopado com Batatas',icon:'🦆',minutes:48,yield:2,salePrice:620,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","duck",1],["crop","batata",2],["crop","cebola",1]]},
 kitchen_duck_farm:{name:'Arroz de Pato Caipira',icon:'🦆',minutes:55,yield:2,salePrice:680,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","duck",1],["crop","arroz",2],["crop","milho",1]]},
 grill_duck_herbs:{name:'Pato na Brasa com Laranja',icon:'🦆',minutes:62,yield:2,salePrice:690,xp:38,ingredients:[["meat","duck",1],["crop","laranja",1],["supply","seasoning",1]]},
 grill_duck_skewer:{name:'Pato Grelhado com Pimenta',icon:'🦆',minutes:68,yield:2,salePrice:740,xp:38,ingredients:[["meat","duck",1],["crop","pimenta",1],["crop","cebola",1]]},
 kitchen_beef_stew:{name:'Picadinho Bovino com Mandioca',icon:'🥩',minutes:48,yield:2,salePrice:620,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","beef",1],["crop","milho",1],["crop","cebola",1]]},
 kitchen_beef_farm:{name:'Carne de Panela com Batatas',icon:'🥩',minutes:55,yield:2,salePrice:680,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","beef",1],["crop","mandioca",1],["crop","alho",1]]},
 grill_beef_herbs:{name:'Bife Bovino na Brasa',icon:'🥩',minutes:62,yield:2,salePrice:690,xp:38,ingredients:[["meat","beef",1],["crop","alho",1],["supply","seasoning",1]]},
 grill_beef_skewer:{name:'Espetinho de Carne Bovina',icon:'🥩',minutes:68,yield:2,salePrice:740,xp:38,ingredients:[["meat","beef",1],["crop","pimenta",1],["crop","cebola",1]]},
 kitchen_pork_stew:{name:'Carne Suína de Panela',icon:'🥓',minutes:48,yield:2,salePrice:620,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","pork",1],["crop","mandioca",1],["crop","cebola",1]]},
 kitchen_pork_farm:{name:'Lombo Suíno com Cebolas',icon:'🥓',minutes:55,yield:2,salePrice:680,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","pork",1],["crop","batata",1],["crop","alho",1]]},
 grill_pork_herbs:{name:'Costelinha Suína na Brasa',icon:'🥓',minutes:62,yield:2,salePrice:690,xp:38,ingredients:[["meat","pork",1],["crop","alho",1],["supply","seasoning",1]]},
 grill_pork_skewer:{name:'Espetinho Suíno com Alho',icon:'🥓',minutes:68,yield:2,salePrice:740,xp:38,ingredients:[["meat","pork",1],["crop","pimenta",1],["crop","cebola",1]]},
 kitchen_lamb_stew:{name:'Ensopado de Cordeiro',icon:'🍖',minutes:48,yield:2,salePrice:620,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","lamb",1],["crop","batata",1],["crop","tomate",1]]},
 kitchen_lamb_farm:{name:'Cordeiro com Batatas',icon:'🍖',minutes:55,yield:2,salePrice:680,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","lamb",1],["crop","alho",1],["crop","alho",1]]},
 grill_lamb_herbs:{name:'Cordeiro Assado com Alecrim',icon:'🍖',minutes:62,yield:2,salePrice:690,xp:38,ingredients:[["meat","lamb",1],["crop","alho",1],["supply","seasoning",1]]},
 grill_lamb_skewer:{name:'Espetinho de Cordeiro',icon:'🍖',minutes:68,yield:2,salePrice:740,xp:38,ingredients:[["meat","lamb",1],["crop","pimenta",1],["crop","cebola",1]]},
 kitchen_goat_stew:{name:'Cabrito ao Molho Caipira',icon:'🐐',minutes:48,yield:2,salePrice:620,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","goat",1],["crop","alho",1],["crop","pimenta",1]]},
 kitchen_goat_farm:{name:'Carne de Cabra com Mandioca',icon:'🐐',minutes:55,yield:2,salePrice:680,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","goat",1],["crop","milho",1],["crop","alho",1]]},
 grill_goat_herbs:{name:'Cabrito na Brasa com Pimenta',icon:'🐐',minutes:62,yield:2,salePrice:690,xp:38,ingredients:[["meat","goat",1],["crop","alho",1],["supply","seasoning",1]]},
 grill_goat_skewer:{name:'Espetinho de Cabrito',icon:'🐐',minutes:68,yield:2,salePrice:740,xp:38,ingredients:[["meat","goat",1],["crop","pimenta",1],["crop","cebola",1]]},
 kitchen_yak_stew:{name:'Iaque ao Molho de Cogumelos',icon:'🐂',minutes:48,yield:2,salePrice:620,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","yak",1],["crop","milho",1],["crop","cebola",1]]},
 kitchen_yak_farm:{name:'Carne de Iaque com Legumes',icon:'🐂',minutes:55,yield:2,salePrice:680,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","yak",1],["crop","mandioca",1],["crop","alho",1]]},
 grill_yak_herbs:{name:'Iaque Grelhado com Ervas',icon:'🐂',minutes:62,yield:2,salePrice:690,xp:38,ingredients:[["meat","yak",1],["crop","alho",1],["supply","seasoning",1]]},
 grill_yak_skewer:{name:'Iaque na Brasa com Alho',icon:'🐂',minutes:68,yield:2,salePrice:740,xp:38,ingredients:[["meat","yak",1],["crop","pimenta",1],["crop","cebola",1]]},
 kitchen_buffalo_stew:{name:'Búfala ao Molho de Cebola',icon:'🐃',minutes:48,yield:2,salePrice:620,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","buffalo",1],["crop","mandioca",1],["crop","cebola",1]]},
 kitchen_buffalo_farm:{name:'Carne de Búfala com Batatas',icon:'🐃',minutes:55,yield:2,salePrice:680,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","buffalo",1],["crop","batata",1],["crop","alho",1]]},
 grill_buffalo_herbs:{name:'Búfala na Brasa',icon:'🐃',minutes:62,yield:2,salePrice:690,xp:38,ingredients:[["meat","buffalo",1],["crop","alho",1],["supply","seasoning",1]]},
 grill_buffalo_skewer:{name:'Espetinho de Búfala',icon:'🐃',minutes:68,yield:2,salePrice:740,xp:38,ingredients:[["meat","buffalo",1],["crop","pimenta",1],["crop","cebola",1]]},
 kitchen_rabbit_stew:{name:'Coelho Ensopado com Cenoura',icon:'🐇',minutes:48,yield:2,salePrice:620,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","rabbit",1],["crop","batata",1],["crop","tomate",1]]},
 kitchen_rabbit_farm:{name:'Coelho com Batatas',icon:'🐇',minutes:55,yield:2,salePrice:680,xp:34,kitchenOnly:true,category:'savory',ingredients:[["meat","rabbit",1],["crop","alho",1],["crop","alho",1]]},
 grill_rabbit_herbs:{name:'Coelho Assado com Ervas',icon:'🐇',minutes:62,yield:2,salePrice:690,xp:38,ingredients:[["meat","rabbit",1],["crop","alho",1],["supply","seasoning",1]]},
 grill_rabbit_skewer:{name:'Espetinho de Coelho',icon:'🐇',minutes:68,yield:2,salePrice:740,xp:38,ingredients:[["meat","rabbit",1],["crop","pimenta",1],["crop","cebola",1]]},
 kitchen_pao_caseiro:{name:'Pão Caseiro',icon:'🍞',minutes:55,yield:2,salePrice:850,xp:48,kitchenOnly:true,category:'savory',ingredients:[['crop','trigo',2],['animal','eggs',1],['animal','milk',1],['supply','fermento_quimico',1]]}
});
// Cooking and grilling durations are real waiting minutes.
for(const [id,r] of Object.entries(GRILL_RECIPES)){
 const key=(id+' '+(r.name||'')).toLowerCase();
 if(r.kitchenOnly){
  if(/p[aã]o caseiro|bread/.test(key))r.minutes=55;
  else if(/feijoada|costela|carne de panela|ensopado|moqueca|caldeirada|bacalhau|pato .*l.?orange|fil[eé] mignon/.test(key))r.minutes=75;
  else if(/risoto|arroz|feij[aã]o com arroz|galinhada|picadinho/.test(key))r.minutes=35;
  else if(/bolo|torta|tarte|mousse|doce|geleia|compota|p[eê]ssegos caramelizados/.test(key))r.minutes=45;
  else if(r.gourmet)r.minutes=65;
  else if(/omelete|pur[eê]|panqueca/.test(key))r.minutes=20;
  else r.minutes=40;
 }else{
  if(/peru assado|peru na brasa|pato na brasa|pato grelhado|costela|costelinha|cordeiro assado|cordeiro na brasa/.test(key))r.minutes=90;
  else if(/peixe|til[aá]pia|pacu|tambaqui|tra[ií]ra|tucunar[eé]|dourado|pirarucu|lambari|piau|curimbat[aá]|pintado|surubim|ja[uú]|pirarara|piranha|matrinx[aã]|piraputanga|jundi[aá]|cachara|barbado|aru[aã]n[aá]|apaiari|salm[aã]o|bacalhau/.test(key))r.minutes=25;
  else if(/espetinho|kebab|bife|medalh[aã]o|steak|grelhad/.test(key))r.minutes=20;
  else if(/frango|chicken/.test(key))r.minutes=35;
  else if(r.gourmet)r.minutes=50;
  else r.minutes=40;
 }
}
const MIX_HERB_PREP_MINUTES={banho_sete_ervas:35,banho_descarrego:30,banho_energizacao:25,banho_protecao:30,banho_renovacao_pitangueira:25,banho_folhas_aromaticas:25,banho_mata:35,banho_louro_alfazema:30,banho_louro_prosperidade:25,banho_louro_amor:30,banho_pipoca:35,banho_casca_laranja:20,banho_pitangueira:25,tempero_aromatico:15,tempero_verde_mata:15,tempero_pimenta_alecrim:15,tempero_pimentao_verde:18,tempero_pimentao_vermelho:20,tempero_pimentao_amarelo:15,tempero_cajun:15,tempero_italiano:20,tempero_citrico_peixes:12,tempero_mineiro:15,tempero_pimentoes_coloridos:20,tempero_ervas_provence:12};
for(const [id,r] of Object.entries(MIX_HERB_RECIPES))r.minutes=MIX_HERB_PREP_MINUTES[id]||(id.startsWith('banho_')?25:15);

const MIX_HERB_SALE_PRICES={
 banho_sete_ervas:520,banho_descarrego:420,banho_energizacao:400,banho_protecao:360,
 banho_renovacao_pitangueira:360,banho_folhas_aromaticas:400,banho_mata:460,
 banho_louro_alfazema:420,banho_louro_prosperidade:420,banho_louro_amor:560,
 banho_pipoca:420,banho_casca_laranja:180,banho_pitangueira:360
};
function recipeIngredientTotals(recipe){const totals=new Map();for(const [type,id,qty] of recipe.ingredients){const key=`${type}:${id}`,current=totals.get(key);if(current)current.qty+=qty;else totals.set(key,{type,id,qty});}return [...totals.values()]}
function recipeMissing(recipe){return recipeIngredientTotals(recipe).filter(({type,id,qty})=>ingredientCount(type,id)<qty)}
function mixHerbRecipeIconMarkup(id,recipe){const cropId=id==='tempero_pimentao_verde'?'pimentao_verde':id==='tempero_pimentao_vermelho'?'pimentao_vermelho':id==='tempero_pimentao_amarelo'?'pimentao_amarelo':id==='tempero_cajun'?'pimentao_vermelho':id==='tempero_pimentoes_coloridos'?'pimentao_verde':null;return cropId?cropIconMarkup(cropId):(recipe?.icon||'🌿')}
function recipeNeedText(recipe){return recipeIngredientTotals(recipe).map(({type,id,qty})=>`${type==='crop'&&(id.startsWith('pimentao_')||id==='milho_canjica')?cropIconMarkup(id):type==='crop'?CROPS[id]?.icon:type==='meat'?MEAT_PRODUCTS[id]?.icon:type==='fish'?FISH_TYPES[id]?.icon:type==='sea'?SEA_TYPES[id]?.icon:type==='wood'?'🪵':type==='animal'?ANIMAL_PRODUCTS[id]?.icon:type==='flower'?CROPS[id]?.icon:type==='herb'?'🌿':type==='mix'?'🧂':GRILL_SUPPLIES[id]?.icon} ${qty} ${ingredientName(type,id)}`).join(' + ')}
const SPECIALIST_TITLES={
 chef:['Chef Iniciante','Chef Ajudante','Chef Junior','Chef-Meio Oficial','Chef Pleno','Chef Sênior','Chef Líder','Chef Master'],
 carpenter:['Marceneiro Iniciante','Marceneiro Ajudante','Marceneiro Junior','Marceneiro-Meio Oficial','Marceneiro Pleno','Marceneiro Sênior','Líder de Produção','Projetista'],
 alchemist:['Alquimista','Misturador','Alquimista Junior','Curandeiro','Alquimista Pleno','Alquimista Sênior','Herbologista','Transmutador'],
 grill:['Churrasqueiro','Grelhador','Espeteiro','Meat Junior','Meat Pleno','Meat Senior','Líder Braseiro','Pitmaster'],
 lumberjack:['Lenhador','Escoteiro','Lenhador Junior','Serrador','Lenhador Pleno','Lenhador Sênior','Cortador Pro','Mestre do Machado'],
 fisher:['Aprendiz','Amador','Apaiari','Dourado','Titã Marinho','Caçador Abissal','Corsário','Mestre Pescador'],
 haras:['Pangaré','Quarto de Milha','Puro Sangue','Árabe','Campolina','Alazão','Percheron','Clydesdale']
};
function specialistTitleLevel(key,index){const names=SPECIALIST_TITLES[key]||[];return names.length<2?1:1+Math.round(index*49/(names.length-1))}
function specialistTitle(key,level){const names=SPECIALIST_TITLES[key]||[];let title=names[0]||key;for(let i=0;i<names.length;i++){if(level>=specialistTitleLevel(key,i))title=names[i];else break;}return title}
function specialistPromotionLevel(key,level){return (SPECIALIST_TITLES[key]||[]).some((_,i)=>i>0&&specialistTitleLevel(key,i)===level)}
function specialistLevelFromXP(xp){let level=1,remaining=Math.max(0,Math.floor(Number(xp)||0)),need=100;while(remaining>=need&&level<50){remaining-=need;level++;need=100+(level-1)*75;}return level}
function specialistXPForNext(level){return 100+Math.max(0,level-1)*75}
function specialistXPAtLevel(level){let total=0;for(let n=1;n<level;n++)total+=specialistXPForNext(n);return total}
function specialistSummary(key,label){const p=state.specialistProgress?.[key]||{xp:0},level=specialistLevelFromXP(p.xp),within=p.xp-specialistXPAtLevel(level),need=specialistXPForNext(level),name=specialistTitle(key,level);return '<div class="list-line"><span>🏅 '+name+' · nível '+level+'/50</span><b>'+(level>=50?'NÍVEL MÁXIMO':fmt(within)+' / '+fmt(need)+' XP')+'</b></div><div class="animal-progress"><i style="width:'+Math.min(100,level>=50?100:Math.round(within/need*100))+'%"></i></div>'}
function specialistRewardPools(key){
 const crops=FIELD_CROP_IDS.filter(id=>CROPS[id]&&CROPS[id].kind!=='flower'&&!CROPS[id].advanced);
 const meats=Object.keys(MEAT_PRODUCTS),supplies=Object.keys(GRILL_SUPPLIES).filter(id=>id!=='caviar'),fish=Object.keys(FISH_TYPES),woods=Object.keys(state.woodWarehouse||{}),herbs=[...new Set(Object.values(FOREST_TREES).map(t=>t.leafId).filter(Boolean))],mixes=Object.keys(MIX_HERB_RECIPES);
 if(key==='chef')return [{type:'crop',ids:crops},{type:'meat',ids:meats},{type:'supply',ids:supplies}];
 if(key==='grill')return [{type:'meat',ids:meats},{type:'fish',ids:fish},{type:'supply',ids:supplies}];
 if(key==='carpenter')return [{type:'wood',ids:woods}];
 if(key==='lumberjack')return [{type:'wood',ids:woods},{type:'herb',ids:herbs}];
 if(key==='alchemist')return [{type:'herb',ids:herbs},{type:'supply',ids:supplies},{type:'mix',ids:mixes}];
 return [];
}
function grantSpecialistReward(key,level,promotion){
 const pools=specialistRewardPools(key).filter(pool=>pool.ids.length),awards=[];
 if(!pools.length)return awards;
 const count=promotion?Math.min(3,pools.length):Math.min(2,pools.length),quantity=promotion?4+Math.floor(level/10):1+Math.floor(level/20);
 for(let n=0;n<count;n++){
  const pool=pools[(level+n+(key.length%pools.length))%pools.length],id=pool.ids[(level*3+n*7+key.length)%pool.ids.length],amount=quantity;
  if(pool.type==='crop'){state.warehouse[id]=(state.warehouse[id]||0)+amount;awards.push(amount+' '+CROPS[id].name);}
  else if(pool.type==='meat'){state.meatWarehouse[id]=(state.meatWarehouse[id]||0)+amount;awards.push(amount+' '+MEAT_PRODUCTS[id].name);}
  else if(pool.type==='supply'){state.inventory[id]=(state.inventory[id]||0)+amount;awards.push(amount+' '+GRILL_SUPPLIES[id].name);}
  else if(pool.type==='fish'){state.fishWarehouse[id]=(state.fishWarehouse[id]||0)+amount;awards.push(amount+' '+FISH_TYPES[id].name);}
  else if(pool.type==='wood'){state.woodWarehouse[id]=(state.woodWarehouse[id]||0)+amount;const woodName=Object.values(FOREST_TREES).find(tree=>tree.wood===id)?.woodName||('Madeira de '+id.replaceAll('_',' '));awards.push(amount+' '+woodName);}
  else if(pool.type==='herb'){state.inventory['herb_'+id]=(state.inventory['herb_'+id]||0)+amount;const herbName=Object.values(FOREST_TREES).find(tree=>tree.leafId===id)?.name||id.replaceAll('_',' ');awards.push(amount+' folhas de '+herbName);}
  else if(pool.type==='mix'){state.inventory['mix_'+id]=(state.inventory['mix_'+id]||0)+amount;awards.push(amount+' '+MIX_HERB_RECIPES[id].name);}
 }
 return awards;
}
function awardSpecialistXP(key,amount){
 if(!state.specialistProgress)state.specialistProgress={};
 const p=state.specialistProgress[key]||(state.specialistProgress[key]={xp:0});
 const before=specialistLevelFromXP(p.xp);
 p.xp=Math.max(0,p.xp+Math.max(0,Math.floor(amount||0)));
 const level=specialistLevelFromXP(p.xp);
 if(level>before){
  playSfx('levelup');const notices=[];
  for(let reached=before+1;reached<=level;reached++){
   const promotion=specialistPromotionLevel(key,reached),rewards=grantSpecialistReward(key,reached,promotion);
   const greenReward=1+(promotion?3:0);state.greenCoins=(state.greenCoins||0)+greenReward;
   rewards.push('🟢 '+greenReward+' moeda(s) verde(s)');
   notices.push('Nível '+reached+': '+specialistTitle(key,reached)+(promotion?' · PROMOÇÃO':'')+' · '+(rewards.length?rewards.join(', '):'recompensa recebida'));
  }
  const lastTitle=specialistTitle(key,level),lastPromotion=specialistPromotionLevel(key,level);
  notify('🏅 '+lastTitle+' · nível '+level+(lastPromotion?'! Promoção conquistada!':'')+' · '+notices.slice(-2).join(' | '));
 }
 return level;
}
function specialistYield(base,key){const level=specialistLevelFromXP(state.specialistProgress?.[key]?.xp||0);return Math.max(1,Math.round(base*(1+Math.max(0,level-1)*.1)))}
function recipeMaxCraftable(recipe){const totals=recipeIngredientTotals(recipe);return totals.length?Math.max(0,Math.min(...totals.map(({type,id,qty})=>Math.floor(ingredientCount(type,id)/qty)))):0}
function consumeRecipeIngredients(recipe,batches){for(const {type,id:key,qty} of recipeIngredientTotals(recipe)){const used=qty*batches;if(type==='crop')state.warehouse[key]-=used;else if(type==='meat')state.meatWarehouse[key]-=used;else if(type==='fish')state.fishWarehouse[key]-=used;else if(type==='sea')state.seaWarehouse[key]-=used;else if(type==='wood')state.woodWarehouse[key]-=used;else if(type==='animal')state.animalWarehouse[key]-=used;else if(type==='flower')state.flowerWarehouse[key]-=used;else if(type==='herb'){const stock=state.inventory['herb_'+key]||0,fromHerbs=Math.min(stock,used);state.inventory['herb_'+key]=stock-fromHerbs;if(key==='folha_louro'&&fromHerbs<used)state.inventory.bay_leaf=Math.max(0,(state.inventory.bay_leaf||0)-(used-fromHerbs));}else if(type==='mix')state.inventory['mix_'+key]-=used;else state.inventory[key]-=used;}}
function buyGrillSupply(id){if(writeLocked)return notify('Salvamento protegido.');const cfg=GRILL_SUPPLIES[id];if(!cfg)return;if(cfg.obtainOnly)return notify(cfg.name+' é obtido exclusivamente na pesca marítima.');if(state.coins<cfg.price)return notify('Moedas amarelas insuficientes.');state.coins-=cfg.price;state.inventory[id]=(state.inventory[id]||0)+1;remember(`Comprou ${cfg.name} para as receitas da fazenda.`);markDirty();refresh();notify(`${cfg.name} adicionado aos ingredientes.`)}
function buyTurkeyMeat(){if(writeLocked)return notify('Salvamento protegido.');const price=650;if(state.coins<price)return notify('Moedas amarelas insuficientes para comprar carne de peru.');state.coins-=price;state.meatWarehouse.turkey=(state.meatWarehouse.turkey||0)+1;remember('Comprou 1 porção de carne de peru no fornecedor local offline.');markDirty();refresh();notify('Carne de peru adicionada ao depósito. Este fornecedor local substitui a aquisição social indisponível offline.')}
function butcherAnimal(id){if(writeLocked)return notify('Salvamento protegido.');const i=state.animals.findIndex(a=>a.id===id);if(i<0)return;const a=state.animals[i];if(ANIMALS[a.type]?.role==='horse')return notify('Cavalos não podem ser abatidos.');const source=ANIMAL_MEAT_SOURCE[a.type];if(!source)return notify('Este animal não fornece carne nesta edição.');if((a.level||1)<10||a.growthStatus!=='adult')return notify('Este animal precisa alcançar o nível 10 antes do abate.');if(a.productionStatus==='producing'||a.productionStatus==='ready'||a.growthStatus==='growing')return notify('Conclua e recolha a produção antes do abate.');const cfg=MEAT_PRODUCTS[source.meat],yieldCount=source.yield+Math.max(0,(a.level||1)-1);if(!confirm('Abater '+(a.name||ANIMALS[a.type].name)+' no nível '+a.level+'/10? O animal será removido permanentemente e você receberá '+yieldCount+' unidade(s) de '+cfg.name+'.'))return;state.meatWarehouse[source.meat]=(state.meatWarehouse[source.meat]||0)+yieldCount;state.animals.splice(i,1);awardXP(5,'manejo da fazenda');remember('Abateu '+(a.name||ANIMALS[a.type].name)+' no nível '+a.level+' e obteve '+yieldCount+' '+cfg.name+'.');markDirty();refresh();notify(yieldCount+' unidade(s) de '+cfg.name+' adicionadas ao depósito.')}
function produceGrillRecipe(id,requested=1){if(writeLocked)return notify('Salvamento protegido.');if(!state.grill.assembled)return notify('Monte a churrasqueira antes de produzir.');const recipe=GRILL_RECIPES[id];if(!recipe||recipe.kitchenOnly)return;if(state.grill.queue.length>=100)return notify('A fila da churrasqueira atingiu o limite de 100 preparos.');const qty=Number(requested),max=recipeMaxCraftable(recipe);if(!Number.isSafeInteger(qty)||qty<1||qty>max)return notify('Quantidade inválida ou ingredientes insuficientes. Você pode preparar até '+max+' lote(s).');consumeRecipeIngredients(recipe,qty);const now=Date.now(),last=state.grill.queue.filter(j=>j.readyAt>now).reduce((m,j)=>Math.max(m,j.readyAt),now),startedAt=last,readyAt=startedAt+recipe.minutes*GRILL_TIME_FACTOR*60000,outputYield=specialistYield(recipe.yield,'grill')*qty,xpEarned=recipe.xp*qty;state.grill.queue.push({id:'grill-'+now+'-'+Math.floor(Math.random()*100000),recipe:id,quantity:qty,outputYield,xpEarned,startedAt,readyAt});state.progressCounters.cook=(state.progressCounters.cook||0)+qty;bumpMissionProgress('cook',qty);remember('Enfileirou '+qty+' lote(s) de '+recipe.name+' na churrasqueira.');markDirty();refresh();notify(qty+' lote(s) de '+recipe.name+' na fila · rendimento previsto '+outputYield+'.')}
function produceHerbMix(id){
 if(writeLocked)return notify('Salvamento protegido.');
 const r=MIX_HERB_RECIPES[id];if(!r)return;
 const queue=state.herbMix.queue||[];if(queue.length>=30)return notify('A fila do Mix de Ervas está cheia (30 preparos).');
 const missing=recipeMissing(r);if(missing.length)return notify('Ingredientes insuficientes: '+missing.map(x=>x.qty+' '+ingredientName(x.type,x.id)).join(', '));
 consumeRecipeIngredients(r,1);const now=Date.now(),minutes=Math.max(1,r.minutes||(id.startsWith('banho_')?25:12));
 state.herbMix.queue.push({id:'herb-'+now+'-'+Math.floor(Math.random()*100000),recipe:id,startedAt:now,readyAt:now+minutes*60000,outputYield:r.yield,xpEarned:r.xp});
 state.progressCounters.cook=(state.progressCounters.cook||0)+1;bumpMissionProgress('cook',1);remember('Iniciou o preparo de '+r.name+' no Mix de Ervas.');markDirty();refresh();notify(r.name+' entrou na fila. Aguarde '+minutes+' minutos para recolher.');
}
function collectHerbMix(){
 if(writeLocked)return notify('Salvamento protegido.');
 const now=Date.now(),ready=state.herbMix.queue.filter(j=>j.readyAt<=now);if(!ready.length)return notify('Ainda não há banhos ou temperos prontos para recolher.');
 let total=0,xp=0;for(const job of ready){const r=MIX_HERB_RECIPES[job.recipe];if(!r)continue;const amount=job.outputYield||r.yield;state.inventory['mix_'+job.recipe]=(state.inventory['mix_'+job.recipe]||0)+amount;discoverItem('ervas',job.recipe,r.name,r.icon);total+=amount;xp+=job.xpEarned??r.xp;}
 state.herbMix.queue=state.herbMix.queue.filter(j=>j.readyAt>now);const earnedXP=awardProfessionXP('alchemist',xp,'Mix de Ervas');remember('Recolheu '+ready.length+' preparo(s) do Mix de Ervas.');markDirty();refresh();notify(total+' preparado(s) recolhido(s) · +'+earnedXP+' XP de Alquimista.');
}

function produceKitchenRecipe(id,requested=1){if(writeLocked)return notify('Salvamento protegido.');const recipe=GRILL_RECIPES[id];if(!recipe?.kitchenOnly)return;if(state.kitchen.queue.length>=kitchenSlotLimit())return notify('A cozinha comporta até '+kitchenSlotLimit()+' preparos no seu nível atual.');const qty=Number(requested),max=recipeMaxCraftable(recipe);if(!Number.isSafeInteger(qty)||qty<1||qty>max)return notify('Quantidade inválida ou ingredientes insuficientes. Você pode preparar até '+max+' lote(s).');consumeRecipeIngredients(recipe,qty);const now=Date.now(),readyAt=now+recipe.minutes*KITCHEN_TIME_FACTOR*60000,outputYield=specialistYield(recipe.yield,'chef')*qty,xpEarned=recipe.xp*qty;state.kitchen.queue.push({id:'kitchen-'+now+'-'+Math.floor(Math.random()*100000),recipe:id,quantity:qty,outputYield,xpEarned,startedAt:now,readyAt});state.progressCounters.cook=(state.progressCounters.cook||0)+qty;bumpMissionProgress('cook',qty);remember('Iniciou '+qty+' lote(s) de '+recipe.name+' na cozinha.');markDirty();refresh();notify(qty+' lote(s) de '+recipe.name+' iniciado(s) · rendimento previsto '+outputYield+'.')}
function collectKitchen(){if(writeLocked)return notify('Salvamento protegido.');const now=Date.now(),ready=state.kitchen.queue.filter(j=>j.readyAt<=now);if(!ready.length)return notify('Ainda não há pratos prontos para recolher.');let total=0,xp=0;for(const job of ready){const r=GRILL_RECIPES[job.recipe],yieldCount=job.outputYield||r.yield*(job.quantity||1);state.processedWarehouse[job.recipe]=(state.processedWarehouse[job.recipe]||0)+yieldCount;discoverItem('cozinha',job.recipe,r.name,r.icon);total+=yieldCount;xp+=job.xpEarned??r.xp*(job.quantity||1);}state.kitchen.queue=state.kitchen.queue.filter(j=>j.readyAt>now);const earnedXP=awardProfessionXP('chef',xp,'cozinha');remember('Recolheu '+ready.length+' preparo(s) da cozinha ('+total+' pratos).');markDirty();refresh();notify(total+' prato(s) recolhidos da cozinha · +'+earnedXP+' XP de Chef.')}
function collectGrill(){if(writeLocked)return notify('Salvamento protegido.');const now=Date.now(),ready=state.grill.queue.filter(j=>j.readyAt<=now);if(!ready.length)return notify('Ainda não há pratos prontos para recolher.');let total=0,xp=0;for(const job of ready){const r=GRILL_RECIPES[job.recipe],yieldCount=job.outputYield||r.yield*(job.quantity||1);state.processedWarehouse[job.recipe]=(state.processedWarehouse[job.recipe]||0)+yieldCount;discoverItem('churrasqueira',job.recipe,r.name,r.icon);total+=yieldCount;xp+=job.xpEarned??r.xp*(job.quantity||1);}state.grill.queue=state.grill.queue.filter(j=>j.readyAt>now);const earnedXP=awardProfessionXP('grill',xp,'churrasqueira');remember('Recolheu '+ready.length+' preparo(s) da churrasqueira ('+total+' pratos).');markDirty();refresh();notify(total+' prato(s) recolhidos · +'+earnedXP+' XP de Churrasqueiro.')}
function sellHerbMix(id,requested){
 if(writeLocked)return notify('Salvamento protegido.');
 const recipe=MIX_HERB_RECIPES[id],price=MIX_HERB_SALE_PRICES[id],available=state.inventory['mix_'+id]||0;
 if(!recipe||!id.startsWith('banho_')||!Number.isFinite(price)||available<=0)return;
 const qty=requested===undefined?available:requested;
 if(!Number.isSafeInteger(qty)||qty<1||qty>available)return notify('Quantidade de venda inválida.');
 const total=saleWithPopularity(qty*price);
 state.inventory['mix_'+id]-=qty;state.coins+=total;
 remember('Vendeu '+qty+' '+recipe.name+' por '+fmt(total)+' moedas.');
 markDirty();refresh();
 notify(recipe.name+': '+qty+' unidade(s) vendida(s) · +'+fmt(total)+' moedas'+(popularityBonusRate()>0?' com bônus de popularidade.':'.'));
}
function toggleMeatLock(id){if(writeLocked)return notify('Salvamento protegido.');if(!MEAT_PRODUCTS[id])return;state.meatLocks[id]=!state.meatLocks[id];remember(`${state.meatLocks[id]?'Bloqueou':'Desbloqueou'} a venda de ${MEAT_PRODUCTS[id].name}.`);markDirty();refresh()}
function fishSalePrice(item){return Math.max(20,Math.round((item.xp||5)*22));}
function sellFishStock(kind,id,requested){if(writeLocked)return notify('Salvamento protegido.');const sea=kind==='sea',types=sea?SEA_TYPES:FISH_TYPES,stock=sea?state.seaWarehouse:state.fishWarehouse,item=types[id],available=stock[id]||0;if(!item||available<=0)return;const qty=requested===undefined?available:requested;if(!Number.isSafeInteger(qty)||qty<1||qty>available)return notify('Quantidade de venda inválida.');const total=saleWithPopularity(qty*fishSalePrice(item));stock[id]-=qty;state.coins+=total;remember('Vendeu '+qty+' '+item.name+' da '+(sea?'pesca marítima':'pesca de rio')+'.');markDirty();refresh();notify(item.name+': '+qty+' unidade(s) vendida(s) · +'+fmt(total)+' moedas.');}
function sellMeat(id,requested){if(writeLocked)return notify('Salvamento protegido.');const cfg=MEAT_PRODUCTS[id],available=state.meatWarehouse[id]||0;if(!cfg||available<=0)return;if(state.meatLocks[id])return notify('Este ingrediente está bloqueado contra venda acidental. Desbloqueie-o no depósito.');const qty=requested===undefined?available:requested;if(!Number.isSafeInteger(qty)||qty<1||qty>available)return notify('Quantidade de venda inválida.');const total=saleWithPopularity(qty*cfg.unitPrice);state.coins+=total;state.meatWarehouse[id]-=qty;remember(`Vendeu ${qty} ${cfg.name}.`);markDirty();refresh();notify(`${cfg.name}: ${qty} unidade(s) vendida(s) · +${fmt(total)} moedas.`)}
function toggleProcessedLock(id){if(writeLocked)return notify('Salvamento protegido.');if(!GRILL_RECIPES[id])return;state.processedLocks[id]=!state.processedLocks[id];remember(`${state.processedLocks[id]?'Bloqueou':'Desbloqueou'} a venda de ${GRILL_RECIPES[id].name}.`);markDirty();refresh()}
function sellProcessed(id,requested){if(writeLocked)return notify('Salvamento protegido.');const recipe=GRILL_RECIPES[id],available=state.processedWarehouse[id]||0;if(!recipe||available<=0)return;if(state.processedLocks[id])return notify('Este prato está bloqueado contra venda acidental. Desbloqueie-o no depósito.');const qty=requested===undefined?available:requested;if(!Number.isSafeInteger(qty)||qty<1||qty>available)return notify('Quantidade de venda inválida.');const total=saleWithPopularity(qty*recipe.salePrice);state.coins+=total;state.processedWarehouse[id]-=qty;remember(`Vendeu ${qty} ${recipe.name} com bônus de popularidade.`);markDirty();refresh();notify(`${recipe.name}: ${qty} unidade(s) vendida(s) · +${fmt(total)} moedas.`)}
function applyFarmTheme(id){if(writeLocked)return notify('Salvamento protegido.');if(!FARM_THEMES[id])return;if(id!=='classic'&&!(state.ownedFarmThemes||[]).includes(id))return notify('Este tema ainda não foi adquirido.');state.farmTheme=id;remember('Aplicou o tema de fazenda: '+FARM_THEMES[id].name+'.');markDirty();renderFarmAddons();refresh();notify('Tema '+FARM_THEMES[id].name+' aplicado!')}
function buyFarmTheme(id,currency='coins'){if(writeLocked)return notify('Salvamento protegido.');const t=FARM_THEMES[id];if(!t||id==='classic')return;if((state.ownedFarmThemes||[]).includes(id))return applyFarmTheme(id);const green=currency==='greenCoins'&&Number.isFinite(t.greenPrice),w=getSeasonalThemeWindow(t);if(!green&&t.seasonal&&!w.available)return notify('Este tema poderá ser comprado com moedas amarelas em '+w.daysUntil+' dia(s). A compra com moedas verdes continua disponível.');const wallet=green?'greenCoins':'coins',price=green?t.greenPrice:t.price;if(!Number.isFinite(price)||state[wallet]<price)return notify(green?'Moedas verdes insuficientes.':'Moedas amarelas insuficientes.');state[wallet]-=price;state.ownedFarmThemes=Array.isArray(state.ownedFarmThemes)?state.ownedFarmThemes:[];if(!state.ownedFarmThemes.includes(id))state.ownedFarmThemes.push(id);discoverItem('colecoes','tema_'+id,t.name,'🎨');state.farmTheme=id;if(t.xp)awardXP(t.xp,'compra de tema');remember('Adquiriu permanentemente o tema de fazenda: '+t.name+'.');markDirty();renderFarmAddons();refresh();notify(t.name+' adquirido permanentemente e aplicado!')}
function expireFarmTheme(){if(!farmWriteAllowed(false))return;if(state)state.farmThemeExpiries={};}
function buyDecoration(id){if(writeLocked)return notify('Salvamento protegido.');const d=DECORATIONS[id];if(!d)return;if(d.obtainOnly)return notify(d.obtainNote||'Este item é obtido por uma recompensa histórica.');const wallet=d.currency==='greenCoins'?'greenCoins':'coins';if(state[wallet]<d.price)return notify(d.currency==='greenCoins'?'Moedas verdes insuficientes.':'Moedas amarelas insuficientes.');state[wallet]-=d.price;state.decorInventory[id]=(state.decorInventory[id]||0)+1;discoverItem('colecoes',id,d.name,'🌷');awardXP(d.xp||0,'compra de decoração');remember('Comprou decoração: '+d.name+'.');markDirty();refresh();notify(d.name+' adicionada aos seus itens.')}
const DECORATION_SLOTS=[[600,140],[-650,220],[1800,170],[2050,690],[3300,1080],[2500,160],[2800,650],[3300,400],[-1120,160],[4200,170],[4200,1010],[1900,1030]];
function placeDecoration(id){if(writeLocked)return notify('Salvamento protegido.');if(!DECORATIONS[id]||(state.decorInventory[id]||0)<=0)return;const used=new Set(state.placedDecorations.map(d=>d.slot));const slot=DECORATION_SLOTS.findIndex((_,i)=>!used.has(i));if(slot<0)return notify('Todos os espaços seguros de decoração estão ocupados.');state.decorInventory[id]--;state.placedDecorations.push({id,slot,installedAt:Date.now(),expiresAt:Date.now()+30*24*HOUR});remember('Instalou '+DECORATIONS[id].name+'.');markDirty();renderFarmAddons();refresh();notify(DECORATIONS[id].name+' instalada na fazenda.')}
function removeDecoration(slot){if(!farmWriteAllowed())return;expireDecorations();const i=state.placedDecorations.findIndex(d=>d.slot===Number(slot));if(i<0)return;const d=state.placedDecorations.splice(i,1)[0];state.decorInventory[d.id]=(state.decorInventory[d.id]||0)+1;remember('Guardou '+DECORATIONS[d.id].name+'.');markDirty();renderFarmAddons();refresh();notify('Decoração guardada nos itens.')}
function expireDecorations(){if(!farmWriteAllowed(false))return;if(!state||!Array.isArray(state.placedDecorations))return;const now=Date.now(),expired=state.placedDecorations.filter(d=>Number.isFinite(d.expiresAt)&&d.expiresAt<=now);if(!expired.length)return;state.placedDecorations=state.placedDecorations.filter(d=>!Number.isFinite(d.expiresAt)||d.expiresAt>now);remember(`${expired.length} decoração(ões) expiraram após 30 dias.`);markDirty(true);renderFarmAddons();notify('Uma decoração da fazenda expirou.')}
function renderDecorationMarkup(id,x,y){
 if(id==='valentine_background')return `<g transform="translate(${x} ${y})"><ellipse cy="26" rx="112" ry="14" fill="#234b13" opacity=".22"/><path d="M-104 18V-90Q0-160 104-90V18" fill="none" stroke="#c95a79" stroke-width="12"/><path d="M-104-90Q0-160 104-90" fill="none" stroke="#f0c0ce" stroke-width="7"/><g fill="#e85b82" stroke="#9d3556" stroke-width="3"><path d="M-58-88Q-82-120-104-94Q-115-65-58-30Q-5-66-18-94Q-36-120-58-88Z"/><path d="M0-130Q-23-158-44-134Q-52-107 0-78Q52-107 44-134Q23-158 0-130Z"/><path d="M58-88Q34-120 12-94Q1-65 58-30Q115-65 104-94Q82-120 58-88Z"/></g><text y="52" text-anchor="middle" font-size="14" font-weight="bold" fill="#fff2d9" stroke="#8e3c56" stroke-width="3" paint-order="stroke">DIA DOS NAMORADOS</text></g>`;
 if(id==='valentine_house')return `<g transform="translate(${x} ${y})"><ellipse cy="24" rx="82" ry="13" fill="#234b13" opacity=".25"/><path d="M-72-12L0-78L72-12V22H-72Z" fill="#f3d5a5" stroke="#8d5732" stroke-width="6"/><path d="M-84-10L0-95L84-10" fill="#b94c55" stroke="#78323c" stroke-width="8"/><path d="M-24 22V-22Q0-54 24-22V22" fill="#6b402c" stroke="#e9bd83" stroke-width="5"/><path d="M0-68Q-20-92-36-72Q-44-48 0-25Q44-48 36-72Q20-92 0-68Z" fill="#ef6f91" stroke="#a33f5e" stroke-width="4"/><circle cx="-48" cy="-3" r="9" fill="#a8d5e2" stroke="#8b5733" stroke-width="3"/><circle cx="48" cy="-3" r="9" fill="#a8d5e2" stroke="#8b5733" stroke-width="3"/></g>`;
 if(id==='valentine_fence')return `<g transform="translate(${x} ${y})"><ellipse cy="22" rx="98" ry="12" fill="#234b13" opacity=".25"/><path d="M-92-55V18M-30-72V18M32-72V18M92-55V18" stroke="#986039" stroke-width="13" stroke-linecap="round"/><path d="M-100-36H100M-100-2H100" stroke="#c78a4e" stroke-width="12" stroke-linecap="round"/><g fill="#e85b82" stroke="#a53a5c" stroke-width="3"><path d="M-62-52Q-80-75-96-55Q-102-35-62-13Q-22-35-28-55Q-44-75-62-52Z"/><path d="M0-58Q-18-82-34-60Q-40-40 0-18Q40-40 34-60Q18-82 0-58Z"/><path d="M62-52Q44-75 28-55Q22-35 62-13Q102-35 96-55Q80-75 62-52Z"/></g></g>`;
 if(id==='valentine_kennel')return `<g transform="translate(${x} ${y})"><ellipse cy="22" rx="70" ry="12" fill="#234b13" opacity=".25"/><path d="M-58-5L0-60L58-5V20H-58Z" fill="#d79a59" stroke="#7d4c2b" stroke-width="6"/><path d="M-70-4L0-78L70-4" fill="#b74b54" stroke="#78323c" stroke-width="7"/><path d="M-22 20V-8Q0-42 22-8V20" fill="#4c3025" stroke="#8a542e" stroke-width="4"/><path d="M0-64Q-16-83-29-66Q-35-48 0-30Q35-48 29-66Q16-83 0-64Z" fill="#ef6f91" stroke="#a33f5e" stroke-width="3"/></g>`;
 if(id==='valentine_garden')return `<g transform="translate(${x} ${y})"><ellipse cy="23" rx="90" ry="12" fill="#234b13" opacity=".25"/><path d="M-84 5Q-60-38-35 5Q0-50 35 5Q60-38 84 5L72 22H-72Z" fill="#8d5a35" stroke="#633d24" stroke-width="5"/><path d="M-72 4Q-55-62 0-72Q55-62 72 4" fill="none" stroke="#4b9b39" stroke-width="9"/><g fill="#e85b82" stroke="#a53a5c" stroke-width="3"><path d="M-42-34Q-58-55-74-36Q-78-17-42 0Q-6-17-10-36Q-26-55-42-34Z"/><path d="M0-60Q-18-82-34-60Q-38-42 0-22Q38-42 34-60Q18-82 0-60Z"/><path d="M42-34Q26-55 10-36Q6-17 42 0Q78-17 74-36Q58-55 42-34Z"/></g><g fill="#f5d76c"><circle cx="-60" cy="13" r="7"/><circle cx="-20" cy="8" r="7"/><circle cx="22" cy="12" r="7"/><circle cx="60" cy="8" r="7"/></g></g>`;
 if(id==='rainbow_arch')return `<g transform="translate(${x} ${y})"><ellipse cy="24" rx="105" ry="13" fill="#234b13" opacity=".25"/><path d="M-90 18V-25A90 90 0 0 1 90-25V18" fill="none" stroke="#d84a48" stroke-width="17"/><path d="M-74 18V-24A74 74 0 0 1 74-24" fill="none" stroke="#ed9b3b" stroke-width="15"/><path d="M-58 18V-22A58 58 0 0 1 58-22" fill="none" stroke="#f1d34e" stroke-width="14"/><path d="M-42 18V-18A42 42 0 0 1 42-18" fill="none" stroke="#55a65a" stroke-width="13"/><path d="M-26 18V-14A26 26 0 0 1 26-14" fill="none" stroke="#528fc4" stroke-width="12"/></g>`;
 if(id==='autumn_maple')return `<g transform="translate(${x} ${y})"><ellipse cy="24" rx="68" ry="14" fill="#234b13" opacity=".25"/><path d="M0 24Q-14-38 4-100" stroke="#86502c" stroke-width="12" fill="none"/><path d="M0-45Q-70-110-75-52Q-65-14-5-15Q-2-65 0-45Q18-112 72-74Q92-24 15-12Q4-34 0-45Z" fill="#d97832" stroke="#934c28" stroke-width="6"/><path d="M-55-55L-8-24L0-45L12-20L65-63" fill="none" stroke="#f3b34c" stroke-width="5"/></g>`;
 if(id==='flower_swing')return `<g transform="translate(${x} ${y})"><ellipse cy="22" rx="70" ry="12" fill="#234b13" opacity=".25"/><path d="M-55 20L-38-88M55 20L38-88M-38-88H38" stroke="#80502c" stroke-width="9" fill="none"/><path d="M-48-4H48" stroke="#c28a4c" stroke-width="9"/><path d="M-35-4L-35 10M35-4L35 10" stroke="#80502c" stroke-width="5"/><path d="M-48-90Q0-112 48-90" stroke="#4a9c3d" stroke-width="9" fill="none"/><g fill="#e87fa8"><circle cx="-28" cy="-96" r="8"/><circle cx="0" cy="-103" r="9"/><circle cx="28" cy="-96" r="8"/></g></g>`;
 if(id==='brazil_flag')return `<g transform="translate(${x} ${y})"><ellipse cy="22" rx="36" ry="10" fill="#234b13" opacity=".25"/><path d="M0 20V-130" stroke="#80502c" stroke-width="8"/><path d="M5-125L78-108L5-88Z" fill="#299b54" stroke="#1c713a" stroke-width="3"/><path d="M18-108L44-118L68-108L44-98Z" fill="#f4d44b"/><circle cx="44" cy="-108" r="9" fill="#347bb4"/><path d="M36-110Q44-117 52-109" fill="none" stroke="#fff" stroke-width="2"/></g>`;
 if(id==='apple_tree'||id==='orange_tree'){const fruit=id==='apple_tree'?'#d83d36':'#f18b24',leaf=id==='apple_tree'?'#6cab27':'#79ad28';return `<g transform="translate(${x} ${y})"><ellipse cy="28" rx="76" ry="16" fill="#234b13" opacity=".25"/><path d="M-4 25Q-18-22 0-62Q17-22 7 25Z" fill="#98602d" stroke="#68401f" stroke-width="6"/><path d="M0-45Q-48-105-82-65Q-105-18-45-8Q0 5 0-45Q35-110 82-72Q110-25 54-8Q12 5 0-45Z" fill="${leaf}" stroke="#397b24" stroke-width="5"/><g fill="${fruit}" stroke="#9a4825" stroke-width="2"><circle cx="-55" cy="-54" r="11"/><circle cx="-20" cy="-78" r="10"/><circle cx="28" cy="-74" r="11"/><circle cx="61" cy="-47" r="10"/><circle cx="12" cy="-28" r="10"/></g><path d="M-55 -66l3 -8m22 -14l3 -7m55 4l2 -7m32 42l3 -6m-45 22l2 -7" stroke="#4d7726" stroke-width="3"/></g>`}if(id==='romantic_tree'||id==='butterfly_tree'||id==='coconut_tree'||id==='christmas_tree'){
 const common=`<g transform="translate(${x} ${y})"><ellipse cy="28" rx="84" ry="17" fill="#234b13" opacity=".25"/>`;
 if(id==='coconut_tree')return common+`<path d="M-4 26Q22-55 2-145Q-4-170 12-178Q45-95 22 28Z" fill="#a56b35" stroke="#69411f" stroke-width="7"/><g fill="none" stroke-linecap="round" stroke-width="15"><path d="M10-164Q-100-235-145-178Q-92-180-24-132" stroke="#3e8c36"/><path d="M10-164Q-15-270 42-292Q44-230 26-164" stroke="#5a9d38"/><path d="M10-164Q110-250 150-180Q83-185 24-132" stroke="#3d8732"/><path d="M10-164Q142-150 142-90Q83-112 22-135" stroke="#70aa42"/><path d="M10-164Q-120-130-135-72Q-75-102 18-134" stroke="#78b84b"/></g><g fill="#80502d" stroke="#59371d" stroke-width="4"><ellipse cx="34" cy="-120" rx="18" ry="24"/><ellipse cx="-3" cy="-117" rx="18" ry="24"/><ellipse cx="18" cy="-94" rx="17" ry="22"/></g></g>`;
 if(id==='christmas_tree')return common+`<path d="M0 18V-175" stroke="#81502a" stroke-width="13"/><path d="M0-205L-100-92H-55L-132-12H132L55-92H100Z" fill="#2d8b3e" stroke="#1d6532" stroke-width="7"/><path d="M0-205L-100-92H-55L-132-12H132L55-92H100Z" fill="none" stroke="#79bb56" stroke-width="5"/><g fill="#f5d45d" stroke="#a8752d" stroke-width="3"><circle cx="-50" cy="-110" r="12"/><circle cx="46" cy="-87" r="12"/><circle cx="-10" cy="-52" r="12"/><circle cx="60" cy="-25" r="12"/><circle cx="0" cy="-155" r="12"/></g><path d="M0-235L12-208L40-207L18-189L26-162L0-177L-26-162L-18-189L-40-207L-12-208Z" fill="#ffd84e" stroke="#a8752d" stroke-width="4"/><g fill="#f5e8c4" opacity=".85"><circle cx="-75" cy="-85" r="5"/><circle cx="80" cy="-45" r="5"/><circle cx="25" cy="-135" r="5"/></g></g>`;
 if(id==='butterfly_tree')return common+`<path d="M-5 26Q-20-28 0-95Q18-28 8 26Z" fill="#95602f" stroke="#68401f" stroke-width="7"/><path d="M0-68Q-90-138-120-70Q-125-15-55-9Q0 0 0-68Q52-145 120-88Q133-22 58-8Q5 2 0-68Z" fill="#6dad38" stroke="#397b24" stroke-width="7"/><g fill="#9bd45a" opacity=".75"><ellipse cx="-70" cy="-80" rx="30" ry="20"/><ellipse cx="-25" cy="-105" rx="34" ry="22"/><ellipse cx="35" cy="-100" rx="32" ry="22"/><ellipse cx="82" cy="-66" rx="30" ry="20"/></g><g transform="translate(-88 -118)"><path d="M0 0Q-35-45-48-10Q-36 18-3 8Q30 38 43 4Q38-26 0 0Z" fill="#f3a4d3" stroke="#a44c88" stroke-width="4"/><path d="M-3 3L3 12" stroke="#684126" stroke-width="5"/></g><g transform="translate(92 -130) scale(.75)"><path d="M0 0Q-35-45-48-10Q-36 18-3 8Q30 38 43 4Q38-26 0 0Z" fill="#f5d66c" stroke="#a8782e" stroke-width="4"/><path d="M-3 3L3 12" stroke="#684126" stroke-width="5"/></g></g>`;
 return common+`<path d="M-5 26Q-20-28 0-95Q18-28 8 26Z" fill="#95602f" stroke="#68401f" stroke-width="7"/><path d="M0-68Q-90-138-120-70Q-125-15-55-9Q0 0 0-68Q52-145 120-88Q133-22 58-8Q5 2 0-68Z" fill="#e8a5c9" stroke="#a95e94" stroke-width="7"/><g fill="#f8d9e9" opacity=".8"><circle cx="-70" cy="-78" r="18"/><circle cx="-28" cy="-104" r="17"/><circle cx="28" cy="-104" r="18"/><circle cx="78" cy="-70" r="18"/></g><g fill="#e9b64b" stroke="#9b682b" stroke-width="3"><circle cx="-65" cy="-75" r="8"/><circle cx="32" cy="-100" r="8"/><circle cx="80" cy="-65" r="8"/></g></g>`;
 }if(id==='science_theme')return `<g transform="translate(${x} ${y})"><ellipse cy="24" rx="92" ry="14" fill="#234b13" opacity=".25"/><path d="M-70 18V-74L0-118L70-74V18Z" fill="#c9d8df" stroke="#54718a" stroke-width="7"/><path d="M-70-74L0-118L70-74" fill="none" stroke="#8ba9bd" stroke-width="12"/><circle cx="0" cy="-55" r="34" fill="#79b7c4" stroke="#426b7c" stroke-width="6"/><ellipse cx="0" cy="-55" rx="13" ry="34" fill="none" stroke="#f2d46a" stroke-width="5"/><path d="M-30-55H30M0-89V-21" stroke="#f2d46a" stroke-width="4"/><path d="M-40 18V-8H40V18" fill="#6b4a34" stroke="#4b3225" stroke-width="4"/></g>`;if(id==='children_theme')return `<g transform="translate(${x} ${y})"><ellipse cy="24" rx="105" ry="15" fill="#234b13" opacity=".25"/><path d="M-92 20V-70Q0-160 92-70V20" fill="none" stroke="#e6bd65" stroke-width="12"/><path d="M-92-70Q0-160 92-70" fill="none" stroke="#d85b6a" stroke-width="10"/><g><circle cx="-68" cy="-110" r="25" fill="#f1d55b"/><circle cx="0" cy="-155" r="27" fill="#75b7e3"/><circle cx="68" cy="-110" r="25" fill="#e58ac0"/><path d="M-68-85V-40M0-128V-40M68-85V-40" stroke="#fff2c5" stroke-width="5"/></g><text y="48" text-anchor="middle" font-size="14" fill="#fff2d1" stroke="#76512c" stroke-width="3" paint-order="stroke">DIA DAS CRIANÇAS</text></g>`;if(id==='tibet_theme')return `<g transform="translate(${x} ${y})"><ellipse cy="24" rx="92" ry="14" fill="#234b13" opacity=".25"/><path d="M-78 18L-65-58L0-112L65-58L78 18Z" fill="#d5b17a" stroke="#81542e" stroke-width="7"/><path d="M-65-58L0-112L65-58" fill="none" stroke="#a34f39" stroke-width="14"/><path d="M-30 18V-28Q0-60 30-28V18" fill="#543a2a"/><g stroke-width="5"><path d="M-92-78L-50-98L-15-82L20-102L58-83L92-96" fill="none" stroke="#f1d66a"/><path d="M-70-90L-70-62M-28-88L-28-58M14-92L14-60M58-88L58-58" stroke="#e7d3a2"/></g></g>`;if(id==='snowman')return `<g transform="translate(${x} ${y})"><ellipse cy="24" rx="50" ry="12" fill="#234b13" opacity=".25"/><circle cy="-4" r="42" fill="#fffdf0" stroke="#c6d2d4" stroke-width="5"/><circle cy="-73" r="30" fill="#fffdf0" stroke="#c6d2d4" stroke-width="5"/><path d="M-30-103H30L23-120H-22Z" fill="#3d3b3b" stroke="#252525" stroke-width="4"/><rect x="-18" y="-119" width="36" height="17" rx="3" fill="#333"/><path d="M-28-32Q0-15 30-34" fill="none" stroke="#b93836" stroke-width="12"/><path d="M-6-70L25-65L-5-58Z" fill="#e58a30"/><circle cx="-10" cy="-83" r="4" fill="#333"/><circle cx="10" cy="-83" r="4" fill="#333"/><g fill="#4b4b4b"><circle cx="0" cy="-4" r="4"/><circle cx="0" cy="12" r="4"/></g><path d="M-40-15L-65-45M40-15L65-45" stroke="#80502a" stroke-width="7" stroke-linecap="round"/></g>`;if(id==='windmill')return `<g transform="translate(${x} ${y})"><ellipse cy="35" rx="62" ry="13" fill="#234b13" opacity=".25"/><path d="M-30 30L-20-55H20L30 30Z" fill="#e7d5a9" stroke="#8a5b32" stroke-width="5"/><path d="M-32-55L0-88L32-55Z" fill="#b95d32" stroke="#754223" stroke-width="5"/><circle cy="-48" r="9" fill="#81512e"/><g stroke="#8c5b2d" stroke-width="9" stroke-linecap="round"><path d="M0-48L0-115M0-48L62-15M0-48L-62-15M0-48L0 18"/></g><g stroke="#f5e4b8" stroke-width="3"><path d="M0-48L0-115M0-48L62-15M0-48L-62-15M0-48L0 18"/></g><circle cy="-48" r="8" fill="#d9a34b"/></g>`;if(id==='well')return `<g transform="translate(${x} ${y})"><ellipse cy="27" rx="60" ry="13" fill="#234b13" opacity=".25"/><path d="M-46-2L-35 24H35L46-2Z" fill="#9b9a8d" stroke="#5d5b52" stroke-width="5"/><path d="M-50-5Q0-26 50-5L42 8Q0-7-42 8Z" fill="#c5c0a7" stroke="#68675b" stroke-width="4"/><path d="M-35-7V-70M35-7V-70M-35-70H35" stroke="#80502c" stroke-width="8"/><path d="M-40-74L0-100L40-74Z" fill="#c88b47" stroke="#81502b" stroke-width="4"/><path d="M-20-1Q0 10 20-1" stroke="#5ba8c5" stroke-width="5" fill="none"/></g>`;if(id==='flowerbed')return `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="17" rx="57" ry="11" fill="#234b13" opacity=".25"/><path d="M-52 -3L-42 20H42L52 -3Z" fill="#a86636" stroke="#6c3e20" stroke-width="4"/><path d="M-44 -5H44" stroke="#e7b06b" stroke-width="7"/><path d="M-35 -8Q-23 -34 -14 -10M-10 -8Q1 -42 12 -8M18 -8Q29 -35 38 -8" fill="none" stroke="#398d2b" stroke-width="7" stroke-linecap="round"/>${[-28,-8,14,34].map((xx,i)=>flower(xx,-23-(i%2)*5,.8,['#f7d54b','#f08fb9','#fff0d3','#c8a1ed'][i])).join('')}</g>`;if(id==='bench')return `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="18" rx="58" ry="10" fill="#234b13" opacity=".25"/><path d="M-48 -34H48V-4H-48Z" fill="#b8793f" stroke="#70411f" stroke-width="5"/><path d="M-48 -1H48V19H-48Z" fill="#d08a48" stroke="#70411f" stroke-width="5"/><path d="M-38 18L-42 50M38 18L42 50M-35 -34L-35 -57M35 -34L35 -57" stroke="#71421f" stroke-width="9" stroke-linecap="round"/><path d="M-42 -45H42" stroke="#edbd76" stroke-width="6"/></g>`;return `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="24" rx="38" ry="9" fill="#234b13" opacity=".25"/><path d="M0 -45V21M-30 -22L30 -22M-27 -22L-44 3M27 -22L44 3" stroke="#8b542d" stroke-width="9" stroke-linecap="round"/><path d="M-28 -52Q0 -72 28 -52L20 -40H-20Z" fill="#d9a44f" stroke="#805126" stroke-width="4"/><circle cy="-39" r="15" fill="#efc38b" stroke="#86542b" stroke-width="3"/><path d="M-10 -40L-4 -40M4 -40L10 -40M-4 -31Q0 -28 4 -31" stroke="#694226" stroke-width="2.5" stroke-linecap="round"/><path d="M-17 -20L-34 -7M17 -20L34 -7" stroke="#d5a45a" stroke-width="8" stroke-linecap="round"/><path d="M-14 20L-24 38M14 20L24 38" stroke="#75451f" stroke-width="7"/></g>`}

function easterSunday(year){const a=year%19,b=Math.floor(year/100),c=year%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),month=Math.floor((h+l-7*m+114)/31),day=((h+l-7*m+114)%31)+1;return new Date(year,month-1,day,12)}
const CHINESE_NEW_YEAR_DATES={2026:'2026-02-17',2027:'2027-02-06',2028:'2028-01-26',2029:'2029-02-13',2030:'2030-02-03',2031:'2031-01-23',2032:'2032-02-11',2033:'2033-01-31',2034:'2034-02-19',2035:'2035-02-08',2036:'2036-01-28',2037:'2037-02-15',2038:'2038-02-04',2039:'2039-01-24',2040:'2040-02-12'};
function themeEventDate(kind,year){if(kind==='easter')return easterSunday(year);if(kind==='chinese_new_year'){const s=CHINESE_NEW_YEAR_DATES[year];if(s){const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d,12)}return new Date(year,1,10,12)}const md={halloween:[9,31],christmas:[11,25],valentine:[5,12],autumn:[2,20],summer:[11,21]}[kind];return md?new Date(year,md[0],md[1],12):null}
function getSeasonalThemeWindow(theme,now=new Date()){if(!theme?.seasonal)return{available:true,daysUntil:0,eventDate:null};const today=new Date(now.getFullYear(),now.getMonth(),now.getDate(),12);let eventDate=themeEventDate(theme.seasonal,today.getFullYear());if(!eventDate||eventDate<today)eventDate=themeEventDate(theme.seasonal,today.getFullYear()+1);const releaseDate=new Date(eventDate.getTime()-30*86400000),daysUntil=Math.max(0,Math.ceil((releaseDate-today)/86400000));return{available:today>=releaseDate&&today<=eventDate,daysUntil,eventDate,releaseDate}}
function renderHouseThemeDecor(id){
 const common='<path d="M75 160L229 101L386 157" fill="none" stroke="#5b3525" stroke-width="3" opacity=".65"/>';
 const themes={
  valentine:'<path d="M83 158Q155 112 229 103Q310 119 378 157" fill="none" stroke="#d46b91" stroke-width="7" stroke-linecap="round"/><path d="M83 158Q155 112 229 103Q310 119 378 157" fill="none" stroke="#ffe1e9" stroke-width="2" stroke-dasharray="3 8"/><g fill="#f4a0bd" stroke="#9c4568" stroke-width="2"><path d="M112 137q-8-12-17-3q-6 12 17 26q23-14 17-26q-9-9-17 3Z"/><path d="M345 145q-8-12-17-3q-6 12 17 26q23-14 17-26q-9-9-17 3Z"/></g><circle cx="229" cy="153" r="14" fill="#f7d9e4" stroke="#b45a7d" stroke-width="4"/><path d="M229 145q-7-8-12 0q-3 8 12 16q15-8 12-16q-5-8-12 0Z" fill="#d65c88"/><path d="M211 169Q229 179 247 169" fill="none" stroke="#d7a65e" stroke-width="3"/>',
  christmas:'<path d="M75 160Q145 128 229 104Q310 128 386 158" fill="none" stroke="#286443" stroke-width="10" stroke-linecap="round"/><path d="M75 160Q145 128 229 104Q310 128 386 158" fill="none" stroke="#5d9b64" stroke-width="4" stroke-dasharray="5 7"/><g fill="#d9433c" stroke="#8e2d2b" stroke-width="2"><circle cx="111" cy="145" r="6"/><circle cx="151" cy="129" r="6"/><circle cx="193" cy="114" r="6"/><circle cx="270" cy="114" r="6"/><circle cx="314" cy="132" r="6"/><circle cx="355" cy="146" r="6"/></g><g fill="#f5d477" stroke="#a77b35" stroke-width="2"><circle cx="132" cy="137" r="4"/><circle cx="174" cy="121" r="4"/><circle cx="292" cy="122" r="4"/><circle cx="335" cy="139" r="4"/></g><circle cx="229" cy="153" r="17" fill="#27613c" stroke="#c5a65b" stroke-width="4"/><path d="M219 153q10-13 20 0q-10 17-20 0Z" fill="#d9473e"/><circle cx="229" cy="153" r="4" fill="#f4d477"/>',
  science:'<path d="M78 158L146 132V147H191V116H265V132H319V145H382" fill="none" stroke="#287fa8" stroke-width="5" stroke-linejoin="round"/><g fill="#a6f0ff" stroke="#276b91" stroke-width="3"><circle cx="146" cy="132" r="6"/><circle cx="191" cy="147" r="6"/><circle cx="265" cy="132" r="6"/><circle cx="319" cy="145" r="6"/></g><rect x="210" y="139" width="38" height="23" rx="5" fill="#1f5779" stroke="#8deaff" stroke-width="3"/><path d="M219 150h20M229 145v10" stroke="#a9f5ff" stroke-width="2"/>',
  autumn:'<path d="M75 160Q145 128 229 104Q310 128 386 158" fill="none" stroke="#a65c2d" stroke-width="7"/><g fill="#d98a39" stroke="#87451f" stroke-width="2"><path d="M112 137q-19-13-18 7q7 15 18 19q13-7 18-19q1-20-18-7Z"/><path d="M164 119q-18-13-17 7q7 15 17 19q12-7 17-19q1-20-17-7Z"/><path d="M296 119q-18-13-17 7q7 15 17 19q12-7 17-19q1-20-17-7Z"/><path d="M347 140q-18-13-17 7q7 15 17 19q12-7 17-19q1-20-17-7Z"/></g><g fill="#f1c66d"><circle cx="138" cy="135" r="4"/><circle cx="321" cy="137" r="4"/></g>',
  van_gogh:'<path d="M74 160Q110 128 151 133Q190 139 229 104Q275 87 316 131Q350 148 386 158" fill="none" stroke="#244f89" stroke-width="7"/><path d="M78 154Q118 119 153 126Q191 132 229 97Q273 81 318 124Q352 141 382 151" fill="none" stroke="#e8c65a" stroke-width="3"/><g fill="#f4d66e" stroke="#a67c30" stroke-width="2"><path d="M112 125l4 10 10 1-8 7 2 10-8-5-9 5 2-10-8-7 10-1Z"/><path d="M346 137l4 10 10 1-8 7 2 10-8-5-9 5 2-10-8-7 10-1Z"/></g><path d="M229 143q-15-13-25 0q-8 14 25 27q33-13 25-27q-10-13-25 0Z" fill="#e7c85d" stroke="#385a91" stroke-width="3"/>',
  pelourinho:'<path d="M84 158Q155 128 229 111Q310 129 378 158" fill="none" stroke="#f3d69b" stroke-width="5"/><g stroke="#7a4b43" stroke-width="2"><path d="M105 151l12 21 12-26Z" fill="#e75d52"/><path d="M145 136l12 21 12-26Z" fill="#e9bd4d"/><path d="M185 122l12 21 12-26Z" fill="#4d9e76"/><path d="M251 117l12 21 12-26Z" fill="#4d83bd"/><path d="M291 130l12 21 12-26Z" fill="#e75d52"/><path d="M331 145l12 21 12-26Z" fill="#e9bd4d"/></g><g fill="#f4dcae" stroke="#875d45" stroke-width="2"><circle cx="117" cy="178" r="5"/><circle cx="341" cy="178" r="5"/></g>',
  greek:'<path d="M76 160L229 103L385 158" fill="none" stroke="#315f91" stroke-width="8"/><path d="M82 157L229 108L379 156" fill="none" stroke="#f2dfb7" stroke-width="3" stroke-dasharray="8 5"/><g fill="#f5ead0" stroke="#47749b" stroke-width="3"><path d="M103 174h20v8h-20zM99 204h28v5h-28zM105 174v30M120 174v30"/><path d="M349 174h20v8h-20zM345 204h28v5h-28zM351 174v30M366 174v30"/></g><circle cx="229" cy="151" r="13" fill="#f6e9c9" stroke="#3b6c9b" stroke-width="4"/><path d="M218 151h22M229 140v22" stroke="#c49c52" stroke-width="3"/>',
  summer:'<path d="M75 160Q145 128 229 104Q310 128 386 158" fill="none" stroke="#4b8b48" stroke-width="7"/><g fill="#2d8d58" stroke="#246b45" stroke-width="2"><path d="M112 145q-25-30-32-12q10 15 32 12q-22 8-23 23q18-4 23-23q5 20 21 22q-1-17-21-22q25-2 29-18q-17-4-29 18Z"/><path d="M346 147q-25-30-32-12q10 15 32 12q-22 8-23 23q18-4 23-23q5 20 21 22q-1-17-21-22q25-2 29-18q-17-4-29 18Z"/></g><g fill="#f4bd4f" stroke="#a86b36" stroke-width="2"><circle cx="151" cy="133" r="7"/><circle cx="308" cy="133" r="7"/></g><g fill="#fff0c7"><circle cx="151" cy="133" r="3"/><circle cx="308" cy="133" r="3"/></g>',
  mountain:'<path d="M75 160L229 104L386 158" fill="none" stroke="#d9edf2" stroke-width="11"/><path d="M75 160L229 104L386 158" fill="none" stroke="#7fa9bb" stroke-width="3"/><g fill="#2e694c" stroke="#214c3c" stroke-width="2"><path d="M112 147l-15-17h10l-8-12h24l-8 12h10Z"/><path d="M345 148l-15-17h10l-8-12h24l-8 12h10Z"/></g><g fill="#fff" stroke="#b4cdd7" stroke-width="1"><circle cx="154" cy="135" r="4"/><circle cx="304" cy="135" r="4"/></g>',
  germany:'<path d="M75 160L229 104L386 158" fill="none" stroke="#70472f" stroke-width="8"/><path d="M94 158L229 110L365 157" fill="none" stroke="#e6c18a" stroke-width="3"/><g fill="#f3dca2" stroke="#815332" stroke-width="2"><path d="M105 179l13-9 13 9v14h-26Z"/><path d="M339 179l13-9 13 9v14h-26Z"/></g><g fill="#c94e50"><circle cx="111" cy="181" r="4"/><circle cx="121" cy="185" r="4"/><circle cx="345" cy="181" r="4"/><circle cx="355" cy="185" r="4"/></g><path d="M211 152h36v12h-36z" fill="#f1e3c7" stroke="#805b3e" stroke-width="3"/>',
  independence:'<path d="M75 160L229 104L386 158" fill="none" stroke="#28784d" stroke-width="7"/><g stroke="#8c622f" stroke-width="2"><path d="M110 146l14 16 14-20Z" fill="#e9c84f"/><path d="M158 129l14 16 14-20Z" fill="#2b8d55"/><path d="M292 129l14 16 14-20Z" fill="#e9c84f"/><path d="M340 146l14 16 14-20Z" fill="#2b8d55"/></g><circle cx="229" cy="151" r="14" fill="#277a4d" stroke="#e7c84c" stroke-width="3"/><path d="M221 151l8-8 8 8-8 8Z" fill="#e7c84c"/><circle cx="229" cy="151" r="4" fill="#2866a5"/>',
  japan:'<path d="M76 159Q125 120 166 132Q202 142 229 104Q276 91 315 130Q351 148 386 158" fill="none" stroke="#6d493b" stroke-width="5"/><g fill="#f3b3c9" stroke="#b86d8c" stroke-width="2"><circle cx="111" cy="139" r="8"/><circle cx="124" cy="130" r="7"/><circle cx="137" cy="141" r="8"/><circle cx="342" cy="143" r="8"/><circle cx="354" cy="132" r="7"/><circle cx="367" cy="143" r="8"/></g><g stroke="#70402e" stroke-width="3"><path d="M96 163v-25M362 163v-25"/></g><g fill="#d93d42" stroke="#8d292c" stroke-width="2"><path d="M86 138h20v19H86Z"/><path d="M352 138h20v19h-20Z"/></g><path d="M86 147h20M352 147h20" stroke="#f5d47c" stroke-width="3"/>',
  future_city:'<path d="M75 160L229 104L386 158" fill="none" stroke="#2e9fca" stroke-width="8"/><path d="M80 156L229 110L380 155" fill="none" stroke="#9af7ff" stroke-width="2"/><g fill="#173d61" stroke="#53d9f2" stroke-width="3"><rect x="104" y="139" width="22" height="20" rx="3"/><rect x="333" y="140" width="22" height="20" rx="3"/></g><g fill="#9af7ff"><circle cx="110" cy="145" r="3"/><circle cx="120" cy="145" r="3"/><circle cx="339" cy="146" r="3"/><circle cx="349" cy="146" r="3"/></g><path d="M211 147h36v19h-36z" fill="#173d61" stroke="#6cecff" stroke-width="3"/><path d="M218 153h22M218 159h14" stroke="#a9f6ff" stroke-width="2"/>',
  paris:'<path d="M75 160Q145 128 229 104Q310 128 386 158" fill="none" stroke="#514b66" stroke-width="5"/><path d="M100 151q22-30 44 0q22-30 44 0M270 151q22-30 44 0q22-30 44 0" fill="none" stroke="#c8a66c" stroke-width="4"/><g fill="#f4d7e2" stroke="#9c6c80" stroke-width="2"><path d="M112 163q-9-13-18-3q-5 12 18 24q23-12 18-24q-9-10-18 3Z"/><path d="M346 163q-9-13-18-3q-5 12 18 24q23-12 18-24q-9-10-18 3Z"/></g><circle cx="229" cy="151" r="12" fill="#d8c2e7" stroke="#7b688d" stroke-width="3"/>',
  halloween:'<path d="M75 160Q145 128 229 104Q310 128 386 158" fill="none" stroke="#543a50" stroke-width="7"/><g fill="#f3a13a" stroke="#754025" stroke-width="3"><path d="M109 139Q91 124 91 143Q91 160 109 164Q127 160 127 143Q127 124 109 139Z"/><path d="M349 145Q331 130 331 149Q331 166 349 170Q367 166 367 149Q367 130 349 145Z"/></g><g fill="#3a293f"><path d="M174 112q-10-16-20 0q10-5 20 0q10-5 20 0q-10-16-20 0Z"/><path d="M278 112q-10-16-20 0q10-5 20 0q10-5 20 0q-10-16-20 0Z"/></g><g fill="#ffd77b"><circle cx="109" cy="148" r="4"/><circle cx="349" cy="154" r="4"/></g>',
  easter:'<path d="M75 160Q145 128 229 104Q310 128 386 158" fill="none" stroke="#83a85a" stroke-width="6"/><g stroke="#a87956" stroke-width="2"><ellipse cx="112" cy="145" rx="9" ry="13" fill="#f4c6da"/><ellipse cx="151" cy="130" rx="9" ry="13" fill="#b9d9f1"/><ellipse cx="308" cy="130" rx="9" ry="13" fill="#f6df87"/><ellipse cx="349" cy="145" rx="9" ry="13" fill="#c6e4b6"/></g><g fill="#fff" stroke="#d9a3ba" stroke-width="2"><circle cx="229" cy="151" r="12"/><path d="M229 139q-8-12-13-3q-4 10 13 19q17-9 13-19q-5-9-13 3Z" fill="#f3b5ce"/></g>',
  football:'<path d="M75 160L229 104L386 158" fill="none" stroke="#347d4a" stroke-width="8"/><g stroke="#f5f3df" stroke-width="2"><path d="M104 148l14 13 14-22Z" fill="#f4f4e8"/><path d="M151 131l14 13 14-22Z" fill="#2777b7"/><path d="M292 131l14 13 14-22Z" fill="#df4848"/><path d="M339 148l14 13 14-22Z" fill="#f4f4e8"/></g><circle cx="229" cy="151" r="15" fill="#f7f7f2" stroke="#31553c" stroke-width="3"/><path d="M229 143l7 5-3 9h-8l-3-9Z" fill="#202b35"/><path d="M214 151h-5M244 151h5" stroke="#31553c" stroke-width="3"/>',
  cute:'<path d="M75 160Q145 128 229 104Q310 128 386 158" fill="none" stroke="#d58eaf" stroke-width="6"/><g fill="#f4bfd5" stroke="#a96c91" stroke-width="2"><path d="M111 132q-8-13-16-3q-5 12 16 24q21-12 16-24q-8-10-16 3Z"/><path d="M349 146q-8-13-16-3q-5 12 16 24q21-12 16-24q-8-10-16 3Z"/></g><g fill="#f4d77e" stroke="#b58d43" stroke-width="2"><path d="M229 133l5 12 13 1-10 8 3 13-11-7-11 7 3-13-10-8 13-1Z"/><circle cx="151" cy="131" r="5"/><circle cx="308" cy="131" r="5"/></g>',
  technology:'<path d="M75 160L132 139V153H174V126H205M253 126H285V145H327V136L386 158" fill="none" stroke="#2997ba" stroke-width="5" stroke-linejoin="round"/><g fill="#193d5b" stroke="#62e3f4" stroke-width="3"><rect x="208" y="135" width="42" height="27" rx="5"/><circle cx="111" cy="147" r="7"/><circle cx="358" cy="150" r="7"/></g><g fill="#a6f5ff"><circle cx="111" cy="147" r="3"/><circle cx="358" cy="150" r="3"/></g><path d="M216 143h26M216 151h18" stroke="#a6f5ff" stroke-width="2"/>',
  chinese_new_year:'<path d="M75 160Q145 128 229 104Q310 128 386 158" fill="none" stroke="#b62d32" stroke-width="7"/><g stroke="#8a4a27" stroke-width="3"><path d="M111 143v-18M349 150v-18"/></g><g fill="#d92f35" stroke="#8b252a" stroke-width="3"><path d="M94 125Q111 113 128 125V153Q111 169 94 153Z"/><path d="M332 132Q349 120 366 132V160Q349 176 332 160Z"/></g><g fill="#f4d16d"><path d="M105 136h12M343 143h12"/><circle cx="111" cy="157" r="3"/><circle cx="349" cy="164" r="3"/></g><circle cx="229" cy="151" r="13" fill="#d52d35" stroke="#e9c56b" stroke-width="4"/><path d="M229 140v22M218 151h22" stroke="#f6d979" stroke-width="3"/>'
 };
 if(!id||id==='classic')return '';
 const art=themes[id]||common;
 return '<g class="house-theme-decor" transform="translate(780 100.2128) scale(.9361702)" pointer-events="none">'+art+'</g>';
}

function renderThemeScenery(id){
 if(!id||id==='classic')return '';
 const tint={valentine:'#e58ca8',christmas:'#c8e1f0',science:'#7fb9d4',autumn:'#d99a48',van_gogh:'#d4a74f',pelourinho:'#e2a1a0',greek:'#79a9c8',japan:'#e8a9c0',future_city:'#4d79bd',paris:'#c7b4dc',halloween:'#9a6a4b',easter:'#f0c5d7',football:'#4c9a52',cute:'#e8c1d7',technology:'#4b9dbd',chinese_new_year:'#d94a3f'}[id]||'#ffffff';
 let art=`<g id="farm-theme-art" pointer-events="none"><rect x="-2600" y="-400" width="7000" height="1700" fill="${tint}" opacity=".075"/>`;
 if(id==='christmas'){
  // Camada de neve sobre o cenário inteiro; os flocos e as copas acumulam neve sem criar arcos artificiais.
  art+=`<rect x="-2600" y="-400" width="7000" height="1700" fill="#edf6fa" opacity=".48"/>
   <path d="M532 890C620 945 755 970 910 940C1080 910 1215 885 1390 900C1600 920 1800 922 2010 890C2240 855 2450 865 2680 890S3220 905 3600 875S4100 865 4400 890" fill="none" stroke="#ffffff" stroke-width="9" stroke-linecap="round" stroke-dasharray="18 34" opacity=".62"/>`;
  const snowyTrees=[[-430,20,235,285],[-2460,620,225,270],[-2460,265,205,245],[120,-190,210,255],[600,-205,225,270],[1810,-190,255,300],[1900,115,210,250],[3420,20,235,275],[3820,45,250,290],[4300,30,250,290]];
  for(const [x,y,w,h] of snowyTrees){
   const cx=x+w*.5,top=y+h*.22;
   art+=`<path d="M${cx-w*.34} ${top+18}Q${cx-w*.16} ${top-10} ${cx} ${top+2}Q${cx+w*.18} ${top-14} ${cx+w*.34} ${top+18}" fill="none" stroke="#ffffff" stroke-width="13" stroke-linecap="round" opacity=".96"/>`;
   art+=`<path d="M${cx-w*.22} ${top+48}Q${cx} ${top+28} ${cx+w*.22} ${top+48}" fill="none" stroke="#ffffff" stroke-width="9" stroke-linecap="round" opacity=".88"/>`;
  }
  for(let i=0;i<92;i++){const x=-1350+(i*173)%5550,y=-180+(i*97)%1280,r=2+(i%5)*1.7;art+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" opacity="${.5+(i%4)*.1}"/>`;}
 }if(id==='autumn'){for(let i=0;i<58;i++){const x=-2460+(i*37)%300,y=350+(i*53)%400,rot=(i*37)%360,c=['#d85b31','#e9a43c','#b94b2d','#d8bb58'][i%4];art+=`<path d="M${x} ${y-12}q-24-15-22 8q7 18 22 24q15-6 22-24q2-23-22-8Z" fill="${c}" stroke="#9d512b" stroke-width="2" transform="rotate(${rot} ${x} ${y})" opacity=".78"/>`;}}
 if(id==='van_gogh'){for(let i=0;i<34;i++){const x=-1200+(i*173)%5400,y=-80+(i*97)%1200;if(x>-1450&&x<-100&&y>300&&y<930)continue;art+=`<path d="M${x} ${y}q55-45 112 0q-48 45-100 4" fill="none" stroke="${i%2?'#276b91':'#e4c04e'}" stroke-width="9" stroke-linecap="round" opacity=".48"/>`;}}
 // Elementos de cenário em escala real: ficam nas bordas da fazenda e nunca recebem cliques.
 const decor={
 valentine:`<g transform="translate(-760 350)"><path d="M0 430V100Q0-40 150-40Q300-40 300 100V430" fill="none" stroke="#b94e76" stroke-width="34"/><path d="M0 430V100Q0-10 150-10Q300-10 300 100V430" fill="none" stroke="#ffd5e3" stroke-width="13"/><g fill="#ed6b9b" stroke="#a83e69" stroke-width="5"><path d="M150 70c-35-42-92 8 0 76c92-68 35-118 0-76Z"/><path d="M45 225c-24-30-64 5 0 52c64-47 24-82 0-52Z"/><path d="M255 225c-24-30-64 5 0 52c64-47 24-82 0-52Z"/></g><g fill="#e95c89"><circle cx="-35" cy="430" r="35"/><circle cx="330" cy="430" r="35"/><circle cx="55" cy="450" r="23"/><circle cx="250" cy="450" r="23"/></g></g><g transform="translate(-760 920) scale(.78)" fill="#f6a1bd" stroke="#a94b70" stroke-width="5"><path d="M0 0q-30-40-60-8q-20 42 60 94q80-52 60-94Q30-40 0 0Z"/><path d="M160 25q-24-32-48-6q-16 34 48 76q64-42 48-76q-24-26-48 6Z"/></g>`,
 christmas:`<g transform="translate(-760 350)"><path d="M145 0L25 180H265Z" fill="#1d6845" stroke="#164b36" stroke-width="9"/><path d="M145 105L-5 330H295Z" fill="#247d50" stroke="#164b36" stroke-width="9"/><path d="M145 310V390" stroke="#70462c" stroke-width="30"/><path d="M45 150Q145 205 245 150M15 265Q145 330 275 265" fill="none" stroke="#f5d46b" stroke-width="12"/><g fill="#e84b4b" stroke="#fff0d5" stroke-width="4"><circle cx="95" cy="165" r="15"/><circle cx="205" cy="220" r="15"/><circle cx="90" cy="285" r="16"/><circle cx="220" cy="300" r="16"/></g><path d="M145-35l14 28 31 4-23 21 6 31-28-15-28 15 6-31-23-21 31-4Z" fill="#ffdf78" stroke="#d69c38" stroke-width="5"/></g><g transform="translate(-760 920) scale(.78)"><circle cy="0" r="62" fill="#fff" stroke="#b9d7e7" stroke-width="7"/><circle cy="-95" r="43" fill="#fff" stroke="#b9d7e7" stroke-width="7"/><circle cx="-15" cy="-105" r="5" fill="#263d50"/><circle cx="15" cy="-105" r="5" fill="#263d50"/><path d="M0-91l28 7-28 8Z" fill="#e58c36"/><path d="M-45-5H45M-22-40L-38-65M22-40L38-65" stroke="#b94d42" stroke-width="12" stroke-linecap="round"/></g><path d="M-1250 15Q-900-30-620 18M1850 20Q2150-25 2460 20" fill="none" stroke="#e9f7ff" stroke-width="20" stroke-dasharray="2 28" stroke-linecap="round"/>`,
 science:`<g transform="translate(-760 350)"><path d="M0 250V130Q0 0 150 0Q300 0 300 130V250Z" fill="#527f9b" stroke="#d6f4ff" stroke-width="12"/><path d="M-25 130H325M150 0V250" stroke="#d6f4ff" stroke-width="8"/><path d="M-45 250H345V285H-45Z" fill="#304e66" stroke="#a8d8ea" stroke-width="8"/><circle cx="150" cy="115" r="65" fill="#172d45" stroke="#9ce3f5" stroke-width="10"/><circle cx="150" cy="115" r="35" fill="#6ed5e8" opacity=".6"/><path d="M110 115H190M150 75V155" stroke="#e5fbff" stroke-width="7"/></g><g transform="translate(-760 920) scale(.78)" stroke="#b7e7f5" stroke-width="13" fill="none"><circle r="95"/><circle r="56"/><path d="M-145 0H145M0-145V145M-105-105L105 105M105-105L-105 105"/><circle r="20" fill="#e8d26c"/></g><g transform="translate(-760 920) scale(.78)" fill="#477f9c" stroke="#d6f4ff" stroke-width="8"><path d="M-95 0L-20-35L-10-115L35-115L45-35L110 0L45 35L35 110L-10 110L-20 35Z"/><circle r="38" fill="#b7e7f5"/></g>`,
 autumn:`<g transform="translate(-760 350)"><path d="M145 110V390" stroke="#754326" stroke-width="38"/><g fill="#bd6530" stroke="#874426" stroke-width="7"><circle cx="75" cy="95" r="92"/><circle cx="190" cy="55" r="105"/><circle cx="260" cy="145" r="78"/><circle cx="135" cy="-25" r="72"/></g><g fill="#e6b44c"><circle cx="50" cy="80" r="16"/><circle cx="210" cy="30" r="17"/><circle cx="250" cy="155" r="14"/></g></g><g transform="translate(-760 920) scale(.78)"><path d="M-110 0Q0-155 110 0Z" fill="#d68a39" stroke="#9d582a" stroke-width="8"/><path d="M-110 0H110" stroke="#f6c66a" stroke-width="9"/><path d="M-35-20q-12-22 0-40m35 40q-12-22 0-40m35 40q-12-22 0-40" stroke="#7a9b3b" stroke-width="8" fill="none"/></g>`,
 van_gogh:`<g transform="translate(-760 350)"><path d="M0 440Q75 290 40 170Q20 40 155-40Q240 110 205 250Q190 350 285 440Z" fill="#173e50" stroke="#e8c45a" stroke-width="8"/><path d="M45 350Q120 200 105 65M130 365Q210 210 170 80" fill="none" stroke="#3e9a9b" stroke-width="18" stroke-linecap="round"/></g><g transform="translate(-760 920) scale(.78)"><circle r="110" fill="#e7bf4e" stroke="#f6e7a0" stroke-width="12"/><g fill="#284e75"><circle cx="-35" cy="-22" r="12"/><circle cx="35" cy="25" r="15"/><circle cx="20" cy="-55" r="9"/></g><path d="M-180 150Q-60 70 40 150T250 150M-180 195Q-60 115 40 195T250 195" fill="none" stroke="#e4c65c" stroke-width="16" stroke-linecap="round"/></g><g fill="#f5d86b"><path d="M2200 400l10 25 27 2-21 17 7 26-23-15-23 15 7-26-21-17 27-2Z"/><path d="M-900 650l8 20 22 2-17 14 5 21-18-12-18 12 5-21-17-14 22-2Z"/></g>`,
 pelourinho:`<g transform="translate(-760 350)"><path d="M0 120L0-15L210-80L420-15V360H0Z" fill="#e8c34e" stroke="#75452f" stroke-width="10"/><path d="M-15-15H435V20H-15Z" fill="#d34e55" stroke="#75452f" stroke-width="8"/><g fill="#4c789f" stroke="#75452f" stroke-width="7"><rect x="45" y="70" width="78" height="110"/><rect x="170" y="70" width="78" height="110"/><rect x="295" y="70" width="78" height="110"/></g><g fill="#fff1d0"><path d="M35 70Q84 5 133 70ZM160 70Q209 5 258 70ZM285 70Q334 5 383 70Z"/></g><path d="M0 220H420" stroke="#fff1d0" stroke-width="12"/><path d="M50 360V260H370V360" fill="#b94e50" stroke="#75452f" stroke-width="8"/></g><g transform="translate(-760 920) scale(.78)" stroke="#f7e2ad" stroke-width="7"><path d="M0 0V420" stroke="#79523a" stroke-width="12"/><path d="M0 25L125 55L0 90Z" fill="#e8c34e"/><path d="M0 125L125 155L0 190Z" fill="#4e9a8d"/><path d="M0 225L125 255L0 290Z" fill="#d94e54"/><path d="M0 325L125 355L0 390Z" fill="#5487bd"/></g>`,
 greek:`<g transform="translate(-760 350)" fill="#e8e0ce" stroke="#9e927d" stroke-width="10"><path d="M-20 70L160-25L340 70Z"/><path d="M0 70H320V105H0Z"/><path d="M25 105V360H75V105ZM125 105V360H175V105ZM225 105V360H275V105Z"/><path d="M-20 360H340V400H-20Z"/></g><g transform="translate(-760 920) scale(.78)" fill="none" stroke="#d7c8a9" stroke-width="15"><circle r="100"/><path d="M-70-70L70 70M70-70L-70 70M-100 0H100M0-100V100"/></g>`,
 summer:`<g transform="translate(-760 350)"><path d="M150 410Q100 180 175 0" stroke="#8b5a32" stroke-width="35" fill="none"/><g fill="#258b4c" stroke="#17643b" stroke-width="8"><path d="M170 25Q-20-100-145-10Q25-30 175 75Z"/><path d="M170 25Q60-180 175-235Q230-95 170 25Z"/><path d="M170 25Q360-135 460-25Q285-35 170 75Z"/><path d="M170 25Q360 100 390 220Q265 130 170 75Z"/></g></g><g transform="translate(-760 920) scale(.78)"><path d="M0 0V-180" stroke="#8b5a32" stroke-width="18"/><path d="M0-180L-140-110H140Z" fill="#ed7d46" stroke="#fff0c8" stroke-width="8"/><path d="M-130-110H130" stroke="#fff0c8" stroke-width="8"/><path d="M-90 0H90" stroke="#c99b57" stroke-width="18"/></g><circle cx="2150" cy="-30" r="95" fill="#ffd15e" stroke="#f3a93b" stroke-width="12"/>`,
 mountain:`<path d="M-1450 500L-1110-70L-820 330L-520-160L-160 500Z" fill="#718fa2" stroke="#dbe8ec" stroke-width="18"/><path d="M-1110-70L-1200 80L-1090 45L-1015 125L-950 70ZM-520-160L-640 40L-520 5L-430 90L-360 20Z" fill="#fff" stroke="#c5d8e2" stroke-width="8"/><path d="M1950 470L2240-100L2520 470Z" fill="#718fa2" stroke="#dbe8ec" stroke-width="18"/><path d="M2240-100L2160 60L2245 25L2330 95Z" fill="#fff"/><g transform="translate(-760 350)" fill="#245b48" stroke="#174435" stroke-width="8"><path d="M0-250L-130 0H130Z"/><path d="M0-170L-155 90H155Z"/><path d="M0-80L-180 180H180Z"/><path d="M-20 160H20V245H-20Z" fill="#765039"/></g><g transform="translate(-760 920) scale(.78)" fill="#245b48" stroke="#174435" stroke-width="8"><path d="M0-250L-130 0H130Z"/><path d="M0-170L-155 90H155Z"/><path d="M0-80L-180 180H180Z"/><path d="M-20 160H20V245H-20Z" fill="#765039"/></g>`,
 germany:`<g transform="translate(-760 350)"><path d="M0 130L190-15L380 130V370H0Z" fill="#e5d2a5" stroke="#64452f" stroke-width="12"/><path d="M-25 135L190-45L405 135" fill="#9b4e39" stroke="#553b2d" stroke-width="16"/><path d="M55 185H135V275H55ZM245 185H325V275H245Z" fill="#75a8b7" stroke="#64452f" stroke-width="8"/><path d="M150 370V250H230V370Z" fill="#70462f" stroke="#513323" stroke-width="8"/><path d="M20 145H360" stroke="#64452f" stroke-width="12"/><path d="M190-45V-115" stroke="#64452f" stroke-width="12"/><path d="M190-115L285-90L190-65Z" fill="#d94b3e"/></g><g transform="translate(-760 920) scale(.78)" fill="#d9b96d" stroke="#785337" stroke-width="9"><path d="M0 0L-115 100H115Z"/><path d="M-90 100H90V330H-90Z"/><path d="M-30 170H30V260H-30Z"/></g>`,
 independence:`<g transform="translate(-760 350)"><path d="M150 0V430" stroke="#80502c" stroke-width="16"/><path d="M160 35L430 105L160 175Z" fill="#26964d" stroke="#e7d15a" stroke-width="8"/><path d="M200 105L295 65L390 105L295 145Z" fill="#f1d14a"/><circle cx="295" cy="105" r="34" fill="#357eb7"/><path d="M185 105Q295 60 405 105" fill="none" stroke="#fff" stroke-width="7"/></g><g transform="translate(-760 920) scale(.78)"><path d="M0 170V-120" stroke="#80502c" stroke-width="15"/><path d="M10-110L180-70L10-30Z" fill="#26964d" stroke="#e7d15a" stroke-width="7"/><path d="M38-70L95-95L152-70L95-45Z" fill="#f1d14a"/><circle cx="95" cy="-70" r="19" fill="#357eb7"/></g><path d="M-1250 650Q-950 570-650 650M1900 700Q2200 620 2500 700" fill="none" stroke="#2c8c49" stroke-width="35"/><path d="M-1250 650Q-950 570-650 650M1900 700Q2200 620 2500 700" fill="none" stroke="#e8c94c" stroke-width="12" stroke-dasharray="24 24"/>`
 ,
 japan:`<g transform="translate(-760 350)"><g transform="translate(0 0)"><path d="M0 280V40M0 65L-85 8M0 90L90 25" stroke="#74462e" stroke-width="22" fill="none"/><g fill="#f4a9c6" stroke="#d879a2" stroke-width="4"><circle cx="-78" cy="5" r="34"/><circle cx="-25" cy="-5" r="38"/><circle cx="34" cy="12" r="39"/><circle cx="88" cy="20" r="31"/><circle cx="8" cy="55" r="32"/></g><path d="M-120 290H125L95 325H-95Z" fill="#b85b42" stroke="#713b31" stroke-width="8"/><path d="M-90 290V180M90 290V180M-90 190Q0 105 90 190" fill="none" stroke="#b85b42" stroke-width="15"/><path d="M-65 290V205M65 290V205" stroke="#f4d7a0" stroke-width="7"/></g><g transform="translate(455 15)"><path d="M0 0V155" stroke="#70432e" stroke-width="8"/><path d="M-42 10H42V105Q0 145-42 105Z" fill="#d94f59" stroke="#8e343c" stroke-width="7"/><path d="M-30 28H30M-25 50H25" stroke="#ffe2a9" stroke-width="5"/><path d="M-58 10H58" stroke="#70432e" stroke-width="10"/></g><g fill="#f5c6d7" stroke="#d879a2" stroke-width="2"><circle cx="350" cy="310" r="12"/><circle cx="385" cy="335" r="9"/><circle cx="420" cy="300" r="13"/></g></g>`,
 future_city:`<g transform="translate(-760 350)"><g transform="translate(0 0)"><path d="M-20 300V75L55 25L130 75V300Z" fill="#243b69" stroke="#4fe0f2" stroke-width="8"/><path d="M-5 95H115M-5 145H115M-5 195H115M20 65V285M65 50V285M100 65V285" stroke="#67dff4" stroke-width="7"/><path d="M150 300V-10H270V300Z" fill="#1b315d" stroke="#d35dff" stroke-width="8"/><path d="M170 25H250M170 70H250M170 115H250M170 160H250M170 205H250" stroke="#64e6f0" stroke-width="9"/><path d="M295 300V100L355 45L415 100V300Z" fill="#263b70" stroke="#4fe0f2" stroke-width="8"/><path d="M315 130H395M315 175H395M315 220H395" stroke="#d35dff" stroke-width="8"/><path d="M-50 315H450" stroke="#4fe0f2" stroke-width="10"/><path d="M-35 340H430" stroke="#d35dff" stroke-width="4" stroke-dasharray="15 14"/></g><g transform="translate(455 25)" fill="none" stroke="#55e6f5" stroke-width="6"><circle r="38"/><ellipse rx="72" ry="24" transform="rotate(-28)"/><circle r="9" fill="#ff5de4"/></g></g>`,
 paris:`<g transform="translate(-760 350)"><g transform="translate(0 0)" stroke="#4c4565" stroke-width="9" stroke-linejoin="round"><path d="M-10 300L35 130L55 130L85 300Z" fill="#8d7c9f"/><path d="M35 130L45 55L55 130M45 55L45 20" fill="none" stroke-width="8"/><path d="M20 180H70M5 240H95M-10 300H110" fill="none" stroke-width="10"/><path d="M-5 300H105" stroke="#b79b69" stroke-width="12"/><path d="M150 300V175Q150 115 215 115Q280 115 280 175V300Z" fill="#e9d8c3"/><path d="M140 175H290L215 120Z" fill="#6c526c"/><path d="M175 205H195V245H175ZM230 205H250V245H230Z" fill="#8ac4d6"/><path d="M210 300V240H225V300" fill="#8b654f"/><path d="M130 300H300" stroke="#b79b69" stroke-width="12"/></g><g transform="translate(455 25)" fill="none" stroke="#d8b36c" stroke-width="8"><path d="M0 0V210M-35 60H35M-35 130H35M-45 210H45"/><path d="M-20 0H20"/></g><g fill="#d95e87"><path d="M340 315q-22-30-44-5q-16 32 44 70q60-38 44-70q-22-25-44 5Z"/><path d="M410 340q-16-22-32-4q-12 24 32 53q44-29 32-53q-16-18-32 4Z"/></g></g>`
 };
 if(decor[id])art+=decor[id].replaceAll('translate(-760 350)','translate(-2460 350) scale(.75)').replaceAll('translate(-760 920) scale(.78)','translate(-2460 980) scale(.60)').replaceAll('M-1250 650Q-950 570-650 650','M-2520 650Q-2370 570-2220 650');
 return art+'</g>';
}
let weatherRainActive=false,weatherRequestInFlight=false,weatherLastCheckedAt=0,weatherLocation=null;
function renderWeatherRain(){
 const layer=$('weather-layer');if(!layer)return;
 if(!weatherRainActive||!weatherLocation||!SCENE_BOUNDS[activeScene]){layer.innerHTML='';return}
 const b=SCENE_BOUNDS[activeScene],w=b.right-b.left,h=b.bottom-b.top;
 const drops=(offset,count)=>Array.from({length:count},(_,i)=>{
  const x=b.left+(((i*137.508+offset*31)%1000)/1000)*w,y=b.top+(((i*83.173+offset*67)%1000)/1000)*h;
  const lean=(i+offset)%2===0?-7:7,len=18+(i%4)*4;
  return '<path d="M'+x.toFixed(1)+' '+y.toFixed(1)+'l'+lean+' '+len+'" />';
 }).join('');
 layer.innerHTML='<g class="rain-wind-a" opacity=".64"><g class="rain-fall" fill="none" stroke="#e4f4ff" stroke-width="1.25" stroke-linecap="round">'+drops(0,190)+'</g></g><g class="rain-wind-b" opacity=".43"><g class="rain-fall" fill="none" stroke="#c8e6f5" stroke-width="1.05" stroke-linecap="round">'+drops(7,150)+'</g></g>';
}
async function updateWeatherFromLocation(){
 if(weatherRequestInFlight||!navigator.geolocation||!navigator.onLine)return;
 weatherRequestInFlight=true;
 try{
  const position=await new Promise((resolve,reject)=>navigator.geolocation.getCurrentPosition(resolve,reject,{enableHighAccuracy:false,maximumAge:300000,timeout:12000}));
  weatherLocation={latitude:position.coords.latitude,longitude:position.coords.longitude};
  const url='https://api.open-meteo.com/v1/forecast?latitude='+encodeURIComponent(weatherLocation.latitude)+'&longitude='+encodeURIComponent(weatherLocation.longitude)+'&current=precipitation,rain,showers,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto';
  const response=await fetch(url,{cache:'no-store'});if(!response.ok)throw new Error('Consulta meteorológica indisponível');
  const data=await response.json(),current=data?.current||{},code=Number(current.weather_code),amount=Number(current.precipitation||0)+Number(current.rain||0)+Number(current.showers||0);
  const rainyCodes=[51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99];
  weatherRainActive=amount>.05||rainyCodes.includes(code);weatherLastCheckedAt=Date.now();
  renderWeatherRain();
 }catch(error){
  if(error?.code===1){console.info('Clima local desativado: permissão de localização não concedida.')}
  else console.warn('Não foi possível atualizar o clima local:',error?.message||error);
  if(weatherLastCheckedAt&&Date.now()-weatherLastCheckedAt>30*60*1000){weatherRainActive=false;renderWeatherRain()}
 }finally{weatherRequestInFlight=false}
}
function initWeatherSystem(){
 if(!navigator.geolocation){console.info('Este navegador não oferece geolocalização para o clima local.');return}
 updateWeatherFromLocation();
 setInterval(()=>{if(document.visibilityState==='visible')updateWeatherFromLocation()},10*60*1000);
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')updateWeatherFromLocation()});
}
function updateDayNight(){
 const layer=$('day-night-layer');if(!layer)return;
 const now=new Date(),minutes=now.getHours()*60+now.getMinutes();
 const phase=minutes>=360&&minutes<1020?'day':minutes>=1020&&minutes<1140?'sunset':'night';
 if(layer.dataset.phase===phase&&layer.dataset.scene===activeScene)return;
 layer.dataset.phase=phase;layer.dataset.scene=activeScene;
 const environmentLayers=['ground-layer','day-night-ground-layer','theme-ground-layer'];
 const filter=phase==='sunset'?'sepia(.58) saturate(.9) brightness(.96)':phase==='night'?'brightness(.62) saturate(.78) contrast(1.06)':'';
 for(const id of environmentLayers){const node=$(id);if(node)node.style.filter=filter}
 layer.innerHTML='';
 const environment=$('day-night-ground-layer');if(!environment)return;
 environment.innerHTML='';
 if(phase==='night'){
  environment.innerHTML='<g id="environment-night-overlay" pointer-events="none"><rect x="-3400" y="-400" width="10000" height="1800" fill="#07152f" opacity=".16"/><g fill="#fff4ce"><circle cx="-2880" cy="-165" r="4"/><circle cx="-2460" cy="-95" r="3"/><circle cx="-2050" cy="-205" r="3"/><circle cx="-1720" cy="-125" r="4"/><circle cx="-1380" cy="-185" r="3"/><circle cx="-1020" cy="-95" r="4"/><circle cx="-720" cy="-205" r="3"/><circle cx="-380" cy="-160" r="4"/><circle cx="10" cy="-85" r="3"/><circle cx="420" cy="-180" r="4"/><circle cx="820" cy="-120" r="3"/><circle cx="1260" cy="-180" r="4"/><circle cx="1640" cy="-90" r="3"/><circle cx="2040" cy="-160" r="4"/><circle cx="2560" cy="-105" r="3"/><circle cx="3120" cy="-175" r="4"/><circle cx="3710" cy="-90" r="3"/></g><g transform="translate(1370 -98)"><circle r="40" fill="#e7e7e7"/><path d="M-35 -19Q-7 -47 20 -29Q39 -14 33 7Q27 28 6 32Q-15 36-31 18Z" fill="#d2d2d2"/><g fill="#bdbdbd"><circle cx="-12" cy="-11" r="7"/><circle cx="16" cy="-19" r="4"/><circle cx="10" cy="16" r="9"/><circle cx="-21" cy="17" r="5"/></g><g fill="#fff"><path d="M-25 -37l4 12 12 4-12 4-4 12-4-12-12-4 12-4Z"/><path d="M35 5l3 9 9 3-9 3-3 9-3-9-9-3 9-3Z"/></g></g></g>';
 }else{
  const sun=phase==='sunset'?'#ff9a18':'#ffe600';
  const glow=phase==='sunset'?'#ffb347':'#fff36a';
  environment.innerHTML='<g id="environment-sun" pointer-events="none" transform="translate(1370 -42)"><circle r="58" fill="'+glow+'" opacity=".18"/><circle r="40" fill="'+sun+'"/><circle cx="-11" cy="-12" r="11" fill="#fff6a6" opacity=".45"/></g>';
 }
 if(activeScene==='sea'){
  if(phase==='night')environment.innerHTML+='<g id="sea-night-sky" pointer-events="none"><g fill="#fff7d6"><circle cx="6650" cy="40" r="4"/><circle cx="7100" cy="155" r="3"/><circle cx="7550" cy="-20" r="4"/><circle cx="7900" cy="110" r="3"/><circle cx="8650" cy="-35" r="4"/><circle cx="9050" cy="125" r="3"/><circle cx="9650" cy="10" r="4"/><circle cx="10100" cy="145" r="3"/></g><g id="sea-moon" transform="translate(6900 105)"><circle r="270" fill="#dcecff" opacity=".13"/><circle r="205" fill="#e9edf0" stroke="#fff" stroke-width="12"/><path d="M-130 -72Q-18 -205 110 -105Q210 -26 135 112Q24 225 -112 126Q-208 28 -130 -72Z" fill="#d0d8df"/><g fill="#b9c4cf"><circle cx="-64" cy="-54" r="34"/><circle cx="74" cy="-92" r="22"/><circle cx="45" cy="70" r="42"/><circle cx="-92" cy="86" r="23"/></g><path d="M-80 -150Q-10 -195 60 -164" fill="none" stroke="#fff" stroke-width="13" opacity=".55"/></g></g>';
  else environment.innerHTML+='<g id="sea-day-sun" pointer-events="none" transform="translate(8500 '+(phase==='sunset'?'415':'75')+')"><circle r="300" fill="'+(phase==='sunset'?'#ffb04b':'#fff36a')+'" opacity=".2"/><circle r="205" fill="'+(phase==='sunset'?'#ff8a35':'#ffe65b')+'" stroke="'+(phase==='sunset'?'#ffd19a':'#fff3a0')+'" stroke-width="14"/><circle cx="-58" cy="-58" r="52" fill="#fff8c0" opacity=".48"/><path d="M-112 78Q-20 35 105 100" fill="none" stroke="#fff5c2" stroke-width="15" opacity=".32"/></g>';
 }
}
function applyMenuThemeColors(){
 const root=document.querySelector('.app');if(!root)return;
 const palettes={
  valentine:{light:'#fff0f5',mid:'#f3c7d7',ink:'#783c56',border:'#c46f8d',accent:'#e58eae',strong:'#b95178',dark:'#71344f',toolText:'#fff0f5'},
  christmas:{light:'#f2f8ff',mid:'#c9dfef',ink:'#34536b',border:'#83abc9',accent:'#8fc5e8',strong:'#477fa9',dark:'#294c6b',toolText:'#f3faff'},
  science:{light:'#edf7ff',mid:'#bfd9eb',ink:'#284d68',border:'#729dbb',accent:'#80b8d8',strong:'#356f98',dark:'#1d4668',toolText:'#f2f9ff'},
  autumn:{light:'#fff3df',mid:'#e9c18a',ink:'#754522',border:'#bf8545',accent:'#d99a48',strong:'#a85e2b',dark:'#713d24',toolText:'#fff5e5'},
  van_gogh:{light:'#fff6cf',mid:'#e6d17e',ink:'#3c4b69',border:'#b69a45',accent:'#e7c34f',strong:'#4c6f9d',dark:'#263d68',toolText:'#fff8d8'},
  pelourinho:{light:'#fff0df',mid:'#e9b8a1',ink:'#704333',border:'#c17d65',accent:'#e58e69',strong:'#a94e55',dark:'#713a46',toolText:'#fff4e8'},
  greek:{light:'#f0f8ff',mid:'#c5dced',ink:'#244968',border:'#7ca9c8',accent:'#75b5dd',strong:'#315f8c',dark:'#203f66',toolText:'#f3faff'},
  summer:{light:'#fff5d9',mid:'#cce6d9',ink:'#285e58',border:'#76b6a4',accent:'#e8c36b',strong:'#31958d',dark:'#23645f',toolText:'#fff9e7'},
  mountain:{light:'#f1f6fb',mid:'#c9d5e1',ink:'#344c60',border:'#8da4b9',accent:'#9bb6c9',strong:'#58788f',dark:'#344f66',toolText:'#f6fbff'},
  germany:{light:'#fff2d8',mid:'#d8c1a0',ink:'#493b32',border:'#a98a63',accent:'#c85c4b',strong:'#8b3435',dark:'#342b2b',toolText:'#fff4df'},
  independence:{light:'#f5f8dc',mid:'#c8df9d',ink:'#315b32',border:'#83a94e',accent:'#e4c84c',strong:'#438d49',dark:'#205c3a',toolText:'#fffbdc'},
  japan:{light:'#fff1f5',mid:'#f2cbd9',ink:'#713d52',border:'#c57d9b',accent:'#eaa4bd',strong:'#a94e78',dark:'#71354f',toolText:'#fff7fa'},
  future_city:{light:'#e8f5ff',mid:'#9fc9e7',ink:'#183d62',border:'#4a8fc4',accent:'#44d8ee',strong:'#315da9',dark:'#142b56',toolText:'#f1ffff'},
  paris:{light:'#f5f0ff',mid:'#d7c9e9',ink:'#493d66',border:'#a28abf',accent:'#d6ad65',strong:'#66528d',dark:'#3c315d',toolText:'#fffaf0'}
 };
 const palette=palettes[state?.farmTheme||'classic'];
 if(!palette){root.removeAttribute('data-menu-theme');for(const key of ['light','mid','ink','border','accent','strong','dark','toolText'])root.style.removeProperty('--menu-'+key);return;}
 root.dataset.menuTheme=state.farmTheme;
 for(const [key,value] of Object.entries(palette))root.style.setProperty('--menu-'+key,value);
}
function renderLakeArea(){
 const x=-960,y=760,waterY=y-8;
 let s=`<g id="artificial-lake" data-lake-open="true" style="cursor:pointer" transform="translate(-960 760) scale(1.08) translate(980 -760)">
 <ellipse cx="${x}" cy="${y+25}" rx="238" ry="166" fill="#315b2a" opacity=".25"/>
 <ellipse cx="${x}" cy="${y}" rx="236" ry="158" fill="#b79a69" stroke="#755b3a" stroke-width="12"/>
 <ellipse cx="${x}" cy="${y-5}" rx="214" ry="137" fill="#e4d2a4" stroke="#f0e0b6" stroke-width="7"/>
 <defs>
 <linearGradient id="lake-water" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#8cddd3"/><stop offset=".48" stop-color="#369bb0"/><stop offset="1" stop-color="#17617e"/></linearGradient>
 <clipPath id="lake-clip"><ellipse cx="${x}" cy="${waterY}" rx="201" ry="125"/></clipPath>
 </defs>
 <ellipse cx="${x}" cy="${waterY}" rx="201" ry="125" fill="url(#lake-water)"/>
 <g class="lake-fish-school" clip-path="url(#lake-clip)">`;
 const positions=[[-126,-52],[-62,-84],[24,-78],[112,-48],[142,8],[78,62],[-8,82],[-102,56],[-158,4],[8,5]];
 const sizes=[.72,1.02,.84,1.18,.68,.96,1.12,.78,1.04,.88];
 const shapes=[
  {body:"M-18 0Q-11 -12 5 -10Q22 -8 24 0Q19 10 4 10Q-11 11 -18 0Z",tail:"M-15 0L-31 -12L-28 0L-31 12Z"},
  {body:"M-20 0Q-9 -9 7 -7Q19 -5 21 0Q18 7 5 9Q-10 10 -20 0Z",tail:"M-17 0L-29 -9L-27 0L-29 9Z"},
  {body:"M-16 0Q-8 -14 10 -8Q20 0 10 8Q-8 14 -16 0Z",tail:"M-13 0L-27 -14L-25 0L-27 14Z"}
 ];
 (state.lake?.fish||[]).slice(0,10).forEach((f,i)=>{
  const pos=positions[i],sc=sizes[i],dur=5.8+(i%4)*1.35,delay=-(i*.73),shape=shapes[i%shapes.length];
  s+=`<g transform="translate(${x+pos[0]} ${waterY+pos[1]}) scale(${sc})">
   <g class="lake-fish-shadow" style="--fish-duration:${dur}s;--fish-delay:${delay}s" opacity=".82">
    <path d="${shape.body}" fill="#17191b"/>
    <path d="${shape.tail}" fill="#17191b"/>
    <path d="M-2 -7L5 -15L10 -6Z" fill="#17191b"/>
   </g>
  </g>`;
 });
 s+=`</g>
 <ellipse cx="${x}" cy="${waterY}" rx="201" ry="125" fill="#58b8b7" opacity=".13"/>
 <g class="lake-ripples" clip-path="url(#lake-clip)">
  <path d="M${x-190} ${y-45}q65-22 130 0t130 0t130 0M${x-180} ${y+24}q60-18 120 0t120 0t120 0M${x-140} ${y+75}q45-14 90 0t90 0t90 0" fill="none" stroke="#e2ffff" stroke-width="7" opacity=".34"/>
  <path d="M${x-90} ${y-95}q55-15 110 0t110 0M${x-175} ${y+5}q38-12 76 0t76 0" fill="none" stroke="#d8ffff" stroke-width="4" opacity=".38"/>
 </g>
 <path d="M${x-170} ${y-105}q-32-22-48 4m380 18q26-22 42 2M${x-170} ${y+105}q-26 18-43-4m365-2q30 20 45-4" fill="none" stroke="#397b35" stroke-width="9" stroke-linecap="round"/>
`;
 (state.lake?.bridges||[]).forEach(bridge=>{
  const tone=WOODWORK_RECIPES[bridge.id]?.tone||"#b7834d";
  const angle=[0,90,45,-45][Number(bridge.slot)]??0,rad=angle*Math.PI/180;
  const half=1/Math.sqrt((Math.cos(rad)/236)**2+(Math.sin(rad)/158)**2);
  const planks=Array.from({length:13},(_,i)=>{const px=-half+((i+1)*2*half/14);return `<path d="M${px.toFixed(1)} -17Q${px.toFixed(1)} -5 ${px.toFixed(1)} 22" stroke="#69452e" stroke-width="3.2" opacity=".85"/>`}).join("");
  const posts=Array.from({length:9},(_,i)=>{const px=-half+(i*2*half/8);return `<path d="M${px.toFixed(1)} -20v-29 M${px.toFixed(1)} 20v29" stroke="#493326" stroke-width="${i===0||i===8?8:6}" stroke-linecap="round"/>`}).join("");
  s+=`<g class="lake-bridge" transform="translate(${x} ${waterY}) rotate(${angle})">
   <path d="M-${half.toFixed(1)} -13Q0 -29 ${half.toFixed(1)} -13L${half.toFixed(1)} 28Q0 12 -${half.toFixed(1)} 28Z" fill="#3b3026" opacity=".42" transform="translate(0 7)"/>
   <path d="M-${half.toFixed(1)} -19Q0 -35 ${half.toFixed(1)} -19L${half.toFixed(1)} 22Q0 6 -${half.toFixed(1)} 22Z" fill="${tone}" stroke="#493326" stroke-width="7" stroke-linejoin="round"/>
   <path d="M-${half.toFixed(1)} -19Q0 -35 ${half.toFixed(1)} -19L${half.toFixed(1)} -8Q0 -24 -${half.toFixed(1)} -8Z" fill="#f4d9a5" opacity=".72"/>
   ${planks}
   <path d="M-${half.toFixed(1)} -20Q0 -67 ${half.toFixed(1)} -20M-${half.toFixed(1)} 20Q0 67 ${half.toFixed(1)} 20" fill="none" stroke="#493326" stroke-width="8" stroke-linecap="round"/>
   <path d="M-${half.toFixed(1)} -20Q0 -67 ${half.toFixed(1)} -20M-${half.toFixed(1)} 20Q0 -27 ${half.toFixed(1)} 20" fill="none" stroke="#d7ad70" stroke-width="4.5" stroke-linecap="round"/>
   ${posts}
   <path d="M-${half.toFixed(1)} -18l-7 -8m${(2*half).toFixed(1)} 0l7 8M-${half.toFixed(1)} 22l-7 8m${(2*half).toFixed(1)} 0l7 -8" stroke="#493326" stroke-width="5" stroke-linecap="round"/>
   <path d="M-${half.toFixed(1)} -4h13m${(2*half-26).toFixed(1)} 0h13" stroke="#f6e1b9" stroke-width="3" opacity=".8"/>
  </g>`;
 });
 (state.lake?.decorations||[]).forEach(d=>{
  const [dx,dy]=LAKE_DECOR_SLOTS[d.slot]||[0,0];
  s+=`<g transform="translate(${x+dx} ${y+dy})" pointer-events="none"><ellipse cy="8" rx="22" ry="7" fill="#254d25" opacity=".25"/><text text-anchor="middle" y="7" font-size="30">${DECORATIONS[d.id]?.icon||"🌿"}</text></g>`;
 });
 return s+"</g>";
}
function focusLakeArea(close=true){switchFarmScene('river');view.zoom=1.15;view.cx=-960;view.cy=760;updateView();if(close)closeModal()}
function lakeFishProgress(f){if(!f||f.status!=='growing'||!f.readyAt)return 0;return Math.max(0,Math.min(1,1-(f.readyAt-Date.now())/(LAKE_TIME_FACTOR*LAKE_FISH[f.type].hours*HOUR)))}
function syncLakeFish(){if(!farmWriteAllowed(false))return false;if(!state?.lake?.fish)return false;let changed=false;for(const f of state.lake.fish){if(f.status==='growing'&&f.readyAt<=Date.now()){f.stage=Math.min(5,f.stage+1);f.readyAt=0;f.status=f.stage>=5?'adult':'hungry';changed=true;remember(f.status==='adult'?`${LAKE_FISH[f.type].name} chegou à fase adulta.`:`${LAKE_FISH[f.type].name} cresceu para a fase ${f.stage}/5.`);if(f.status==='adult')awardXP(18,'crescimento de peixe')}}if(changed)markDirty(true);return changed}
function renderLakeModal(){const fish=state.lake.fish||[],adult=fish.filter(f=>f.status==='adult').length;let s=`<div class="gift-summary"><span class="symbol">🐟</span><div><b>Lago artificial · Piscicultura</b><small>${fish.length} peixe(s) · ${adult} adulto(s). Criação comercial independente das capturas do Rio e do Mar.</small></div></div><button class="modal-action alt" data-focus-area="lake">Centralizar Lago</button><h3>🥚 Loja de ovos de peixes</h3><p>Compre ovos e alimente os peixes a cada etapa até a fase adulta.</p><div class="grid-cards">${Object.entries(LAKE_FISH).map(([id,f])=>`<div class="store-card"><span class="symbol">${f.icon}</span><strong>${f.name}</strong><small>Ovo · ${f.hours} h por etapa · Venda adulta: 🟡 ${fmt(f.price)}</small><b>🟡 ${fmt(f.egg)}</b><button data-buy-lake-egg="${id}" ${state.coins<f.egg?'disabled':''}>Comprar ovo</button></div>`).join('')}</div><h3>🪣 Ração para peixes</h3><p>Estoque: ${fmt(state.inventory.lake_fish_feed||0)} · 🟡 ${fmt(LAKE_FEED_PRICE)} cada</p><button class="modal-action" data-buy-lake-feed="true" ${state.coins<LAKE_FEED_PRICE?'disabled':''}>Comprar ração</button><h3>🐠 Seus peixes</h3>${fish.length?`<div class="grid-cards">${fish.map(f=>{const c=LAKE_FISH[f.type],p=lakeFishProgress(f);return `<div class="store-card"><span class="symbol">${c.icon}</span><strong>${c.name}</strong><small>Fase ${f.stage}/5 · ${f.status==='adult'?'Adulto':f.status==='growing'?'Crescendo · '+Math.ceil((f.readyAt-Date.now())/60000)+' min':'Precisa de alimento'}</small><div class="lake-growth"><i style="width:${Math.round(p*100)}%"></i></div>${f.status==='adult'?`<b>Venda: 🟡 ${fmt(c.price)}</b><button data-sell-lake-fish="${f.id}">Vender adulto</button>`:f.status==='hungry'?`<button data-feed-lake-fish="${f.id}" ${!(state.inventory.lake_fish_feed>0)?'disabled':''}>Alimentar</button>`:'<button disabled>Crescimento em andamento</button>'}</div>`}).join('')}</div>`:'<p>Compre ovos para começar sua criação.</p>'}<h3>🌿 Decoração das margens</h3><p>Instale itens que já possui no menu Decorações.</p><div class="grid-cards">${Object.entries(DECORATIONS).filter(([id])=>(state.decorInventory[id]||0)>0).map(([id,d])=>`<div class="store-card"><span class="symbol">${d.icon}</span><strong>${d.name}</strong><small>Disponível: ${state.decorInventory[id]}</small><button data-place-lake-decor="${id}">Colocar na margem</button></div>`).join('')||'<p>Nenhuma decoração disponível no inventário.</p>'}</div>${state.lake.decorations.length?'<h4>Decorações instaladas</h4>'+state.lake.decorations.map(d=>'<div class="list-line"><span>'+DECORATIONS[d.id].icon+' '+DECORATIONS[d.id].name+'</span><button class="modal-action alt" data-remove-lake-decor="'+d.slot+'">Retirar</button></div>').join(''):''}<h3>🌉 Pontes instaladas</h3>${state.lake.bridges.length?state.lake.bridges.map(b=>'<div class="list-line"><span>🌉 '+WOODWORK_RECIPES[b.id].name+'</span><button class="modal-action alt" data-remove-lake-bridge="'+b.slot+'">Remover</button></div>').join(''):'<p>Nenhuma ponte instalada.</p>'}<h3>Fabricar na Marcenaria</h3>${['ponte_carvalho','ponte_azul','ponte_verde','ponte_rubra'].map(id=>{const r=WOODWORK_RECIPES[id],n=state.furnitureWarehouse[id]||0;return `<div class="list-line"><span>${r.icon} <b>${r.name}</b><br><small>Fabricadas: ${n}</small></span><button data-place-lake-bridge="${id}" ${!n||state.lake.bridges.includes(id)?'disabled':''}>${state.lake.bridges.includes(id)?'Instalada':'Instalar ponte'}</button></div>`}).join('')}`;return s}
function buyLakeEgg(id){if(writeLocked)return notify('Salvamento protegido.');const f=LAKE_FISH[id];if(!f)return;if(state.coins<f.egg)return notify('Moedas amarelas insuficientes.');if(state.lake.fish.length>=10)return notify('O Lago comporta até 10 peixes.');state.coins-=f.egg;state.lake.fish.push({id:'lake-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),type:id,stage:1,status:'hungry',readyAt:0,createdAt:Date.now()});remember('Adquiriu ovo de '+f.name+'.');markDirty();refresh();notify('Ovo de '+f.name+' adquirido!')}
function buyLakeFeed(){if(writeLocked)return notify('Salvamento protegido.');if(state.coins<LAKE_FEED_PRICE)return notify('Moedas amarelas insuficientes.');state.coins-=LAKE_FEED_PRICE;state.inventory.lake_fish_feed=(state.inventory.lake_fish_feed||0)+1;markDirty();refresh();notify('Ração para peixes comprada.')}
function feedLakeFish(id){if(writeLocked)return notify('Salvamento protegido.');const f=state.lake.fish.find(x=>x.id===id);if(!f||f.status!=='hungry')return;if(!(state.inventory.lake_fish_feed>0))return notify('Compre ração para peixes na loja do Lago.');state.inventory.lake_fish_feed--;f.status='growing';f.readyAt=Date.now()+LAKE_FISH[f.type].hours*LAKE_TIME_FACTOR*HOUR;awardXP(2,'alimentação de peixes');remember('Alimentou '+LAKE_FISH[f.type].name+'.');markDirty();refresh();notify(LAKE_FISH[f.type].name+' está crescendo.')}
function sellLakeFish(id){if(writeLocked)return notify('Salvamento protegido.');const i=state.lake.fish.findIndex(f=>f.id===id&&f.status==='adult');if(i<0)return;const f=state.lake.fish.splice(i,1)[0],c=LAKE_FISH[f.type];state.coins+=c.price;awardXP(12,'venda de peixe adulto');remember('Vendeu '+c.name+' adulto por '+fmt(c.price)+' moedas.');markDirty();refresh();notify(c.name+' vendido por '+fmt(c.price)+' moedas.')}
function placeLakeDecoration(id){if(writeLocked)return notify('Salvamento protegido.');if(!DECORATIONS[id]||(state.decorInventory[id]||0)<=0)return;const slot=LAKE_DECOR_SLOTS.findIndex((_,i)=>!state.lake.decorations.some(d=>d.slot===i));if(slot<0)return notify('Todas as posições ao redor do Lago estão ocupadas.');state.decorInventory[id]--;state.lake.decorations.push({id,slot});markDirty();refresh();notify('Decoração instalada na margem.')}
function removeLakeDecoration(slot){if(!farmWriteAllowed())return;const i=state.lake.decorations.findIndex(d=>d.slot===slot);if(i<0)return;const d=state.lake.decorations.splice(i,1)[0];state.decorInventory[d.id]=(state.decorInventory[d.id]||0)+1;markDirty();refresh();notify('Decoração devolvida ao inventário.')}
function placeLakeBridge(id){if(writeLocked)return notify('Salvamento protegido.');if(!WOODWORK_RECIPES[id]?.lakeBridge||(state.furnitureWarehouse[id]||0)<1)return;if(state.lake.bridges.some(b=>b.id===id))return notify('Esta ponte já está instalada.');const slot=[0,1,2,3].find(i=>!state.lake.bridges.some(b=>b.slot===i));if(slot===undefined)return notify('O Lago já possui quatro posições de ponte ocupadas.');state.furnitureWarehouse[id]--;state.lake.bridges.push({id,slot});markDirty();refresh();notify(WOODWORK_RECIPES[id].name+' instalada de uma margem a outra.')}
function removeLakeBridge(slot){if(!farmWriteAllowed())return;const i=state.lake.bridges.findIndex(b=>b.slot===slot);if(i<0)return;const b=state.lake.bridges.splice(i,1)[0];state.furnitureWarehouse[b.id]=(state.furnitureWarehouse[b.id]||0)+1;markDirty();refresh();notify('Ponte devolvida à marcenaria.')}
// Mar: barco pesqueiro redesenhado e animações ambientais suaves, sem alterar a lógica de pesca.
function renderSeaLandscapeMarkup(){
 return `<g id="sea-landscape" pointer-events="none">
  <defs>
   <linearGradient id="sea-sky-gradient" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#75c7ec"/><stop offset=".62" stop-color="#b9e5ed"/><stop offset="1" stop-color="#f3d9ad"/></linearGradient>
   <linearGradient id="sea-water-gradient" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#268fae"/><stop offset=".38" stop-color="#147c9b"/><stop offset="1" stop-color="#07506f"/></linearGradient>
   <linearGradient id="sea-horizon-glow" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff4c8" stop-opacity=".72"/><stop offset="1" stop-color="#fff4c8" stop-opacity="0"/></linearGradient>
   <linearGradient id="sea-deck-gradient" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#bd8952"/><stop offset=".45" stop-color="#8f5d35"/><stop offset="1" stop-color="#55351f"/></linearGradient>
   <linearGradient id="sea-boat-side" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#70472c"/><stop offset="1" stop-color="#3e2b20"/></linearGradient>
  </defs>
  <rect x="3000" y="-700" width="11000" height="2500" fill="url(#sea-sky-gradient)"/>
  <g id="sea-sun" transform="translate(5200 125)" pointer-events="none">
   <circle r="205" fill="#fff2b6" opacity=".13"/>
   <circle r="158" fill="#ffe9a0" opacity=".22"/>
   <g stroke="#ffe7a0" stroke-width="15" stroke-linecap="round" opacity=".82">
    <path d="M0 -218V-252M0 218V252M-218 0H-252M218 0H252M-154 -154L-180 -180M154 154L180 180M154 -154L180 -180M-154 154L-180 180"/>
   </g>
   <circle r="128" fill="#ffd76f" stroke="#fff0b2" stroke-width="12"/>
   <path d="M-82 -34Q-20 -66 42 -35Q78 -15 105 -31Q85 42 12 72Q-48 95 -95 43Z" fill="#fff0b0" opacity=".28"/>
  </g>

  <path d="M3000 270Q3500 215 4000 255T5000 245T6000 250T7000 245T8000 250T9000 240T10000 250T11000 230T12000 250T13000 235T14000 260V500H3000Z" fill="url(#sea-horizon-glow)"/>
  <g fill="#fff" opacity=".56">
   <path d="M6600 105Q6640 65 6690 91Q6730 42 6790 78Q6845 66 6865 112Q6900 145 6850 155H6650Q6590 150 6600 105Z"/>
   <path d="M9100 145Q9140 104 9190 126Q9230 79 9290 111Q9340 99 9365 144Q9395 174 9350 185H9150Q9090 180 9100 145Z"/>
  </g>
  <g fill="#668b83" opacity=".88">
   <path d="M3150 468Q3400 400 3630 448Q3860 365 4090 438Q4310 390 4550 468L4550 520H3150Z"/>
   <path d="M4650 478Q4890 420 5100 462Q5350 378 5600 452Q5820 412 6060 478L6060 520H4650Z"/>
   <path d="M10500 470Q10720 405 10930 448Q11180 370 11430 445Q11680 405 11900 472L11900 520H10500Z"/>
   <path d="M11900 475Q12120 430 12320 464Q12550 390 12790 458Q13020 420 13900 480V520H11900Z"/>
  </g>
  <g id="sea-lighthouse" transform="translate(10400 0)">
   <g transform="translate(0 490) scale(1.42) translate(0 -490)">
    <path d="M-175 490Q-150 455 -125 420H145Q170 458 195 490Z" fill="#68736e" stroke="#485a53" stroke-width="8"/>
    <path d="M-83 420L-58 260H76L105 420Z" fill="#f4ead3" stroke="#8d806b" stroke-width="10"/>
    <path d="M-72 326H91M-82 385H101" stroke="#d36a48" stroke-width="25"/>
    <path d="M-72 260L-48 205H67L91 260Z" fill="#b64d3c" stroke="#713b34" stroke-width="8"/>
    <rect x="-28" y="276" width="58" height="52" rx="8" fill="#ffe9a4" stroke="#9c7442" stroke-width="7"/>
    <path d="M-39 199Q9 153 57 199" fill="none" stroke="#f4ead3" stroke-width="14"/>
    <path d="M-128 490Q5 456 168 490" fill="none" stroke="#f0e0b8" stroke-width="12"/>
    <path d="M-30 280L-210 220M35 280L210 220" stroke="#fff1b5" stroke-width="20" opacity=".14"/>
   </g>
  </g>
  <g id="sea-birds" fill="none" stroke="#385c64" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" opacity=".9">
   <g class="bird-position bird-a" transform="translate(7040 165) scale(1.05)"><g class="sea-bird"><path class="bird-wing-left" d="M0 3Q-18 -15 -34 7"/><path class="bird-wing-right" d="M0 3Q18 -15 34 7"/></g></g>
   <g class="bird-position bird-b" transform="translate(7540 218) scale(.82)"><g class="sea-bird"><path class="bird-wing-left" d="M0 3Q-18 -15 -34 7"/><path class="bird-wing-right" d="M0 3Q18 -15 34 7"/></g></g>
   <g class="bird-position bird-c" transform="translate(7920 140) scale(.96)"><g class="sea-bird"><path class="bird-wing-left" d="M0 3Q-18 -15 -34 7"/><path class="bird-wing-right" d="M0 3Q18 -15 34 7"/></g></g>
   <g class="bird-position bird-d" transform="translate(10300 190) scale(.76)"><g class="sea-bird"><path class="bird-wing-left" d="M0 3Q-18 -15 -34 7"/><path class="bird-wing-right" d="M0 3Q18 -15 34 7"/></g></g>
   <g class="bird-position bird-e" transform="translate(10700 125) scale(1.0)"><g class="sea-bird"><path class="bird-wing-left" d="M0 3Q-18 -15 -34 7"/><path class="bird-wing-right" d="M0 3Q18 -15 34 7"/></g></g>
  </g>
  <path d="M3000 480Q3500 465 4000 478T5000 474T6000 478T7000 470T8000 476T9000 472T10000 478T11000 470T12000 476T13000 474T14000 480V1800H3000Z" fill="url(#sea-water-gradient)"/>
  <path d="M3000 484Q3600 472 4200 486T5400 482T6600 481T7800 484T9000 481T10200 482T11400 480T12600 484T14000 480" fill="none" stroke="#e9f5df" stroke-width="8" opacity=".72"/>
  <g id="sea-water-ripples" fill="none" stroke-linecap="round">
   <g stroke="#bcecf0" opacity=".42" stroke-width="7">
    <path d="M6350 570Q6510 552 6660 565M6900 625Q7070 604 7230 619M7620 555Q7780 540 7940 555M8450 655Q8650 631 8830 649M9400 570Q9560 550 9720 565M9900 735Q10070 716 10230 731"/>
    <path d="M6520 820Q6700 799 6870 817M7280 900Q7470 878 7640 894M8120 790Q8320 765 8500 786M9000 930Q9180 907 9360 925M9700 850Q9870 830 10040 847"/>
   </g>
   <g stroke="#063e61" opacity=".28" stroke-width="5">
    <path d="M6220 690Q6380 676 6540 688M7000 760Q7160 744 7320 756M7850 700Q8020 680 8190 695M8750 750Q8910 732 9070 746M9550 680Q9720 664 9890 678"/>
    <path d="M6700 1010Q6890 990 7080 1008M7550 1080Q7740 1055 7930 1072M8660 1025Q8850 1003 9040 1020M9500 1110Q9690 1087 9880 1105"/>
   </g>
  </g>
  <g opacity=".72">
   <path d="M7180 470V365L7245 465Z" fill="#fff4d9" stroke="#7b8c83" stroke-width="4"/>
   <path d="M7245 465V390L7290 464Z" fill="#f6e6c5" stroke="#7b8c83" stroke-width="3"/>
   <path d="M7168 470H7300" stroke="#425b58" stroke-width="6"/>
  </g>
  <g id="sea-boat" transform="translate(8500 0)">
   <g id="sea-boat-motion">
    <!-- casco de barco pesqueiro, com proa elevada e pintura azul-petróleo -->
    <path d="M-930 1015Q-790 975 -565 988L590 988Q850 990 1010 1060L805 1305Q700 1385 280 1410Q-350 1430 -700 1340Q-835 1305 -885 1205Z" fill="#29434a" stroke="#23383e" stroke-width="24" stroke-linejoin="round"/>
    <path d="M-900 1032Q-660 1000 -420 1010L620 1010Q850 1015 974 1070L790 1285Q620 1360 260 1380Q-340 1395 -675 1320Q-800 1285 -850 1195Z" fill="#47636a" stroke="#b77b45" stroke-width="12" stroke-linejoin="round"/>
    <path d="M-868 1060Q-520 1100 -130 1070Q440 1035 935 1080L880 1140Q420 1100 -80 1135Q-530 1160 -840 1120Z" fill="#d8b27a" stroke="#61472f" stroke-width="9"/>
    <!-- convés de madeira e tábuas -->
    <path d="M-790 1080Q-470 1110 -120 1090Q420 1055 870 1090L720 1250Q450 1310 100 1325Q-440 1335 -690 1240Z" fill="url(#sea-deck-gradient)" stroke="#573b27" stroke-width="12"/>
    <g stroke="#e2b77e" stroke-width="9" opacity=".72" fill="none">
     <path d="M-690 1120Q-360 1150 -40 1130T760 1120M-650 1165Q-320 1190 0 1170T810 1160M-610 1210Q-260 1235 80 1210T770 1200M-520 1250Q-180 1270 150 1250T710 1240"/>
     <path d="M-460 1100L-400 1290M-220 1100L-180 1310M20 1090L35 1320M260 1080L280 1305M500 1070L520 1285" opacity=".42"/>
    </g>
    <!-- borda clara, defensas e amarras -->
    <path d="M-920 1022Q-520 970 -80 1005T720 1000Q900 1015 1000 1060" fill="none" stroke="#f0d7a8" stroke-width="22" stroke-linecap="round"/>
    <path d="M-890 1050Q-520 1005 -80 1038T720 1028Q900 1040 970 1070" fill="none" stroke="#387b82" stroke-width="12" stroke-linecap="round"/>
    <g fill="#e8ddc7" stroke="#8a6748" stroke-width="6">
     <ellipse cx="-690" cy="1055" rx="23" ry="35"/><ellipse cx="-350" cy="1080" rx="22" ry="32"/><ellipse cx="650" cy="1040" rx="22" ry="32"/>
    </g>
    <g fill="none" stroke="#60432d" stroke-width="18" stroke-linecap="round">
     <path d="M-770 1035L-770 930M-560 1050L-560 950M770 1025L770 925"/>
    </g>
    <!-- reflexos, friso de proa e vigias do casco -->
    <path d="M-760 1290Q-400 1380 30 1370Q520 1360 760 1260" fill="none" stroke="#8eb6b3" stroke-width="13" opacity=".7"/>
    <path d="M-850 1178Q-420 1240 30 1220Q520 1200 900 1135" fill="none" stroke="#d9e7d8" stroke-width="8" opacity=".46"/>
    <g fill="#d6e4d8" stroke="#35545a" stroke-width="8"><circle cx="-500" cy="1302" r="18"/><circle cx="-250" cy="1340" r="18"/><circle cx="20" cy="1350" r="18"/><circle cx="300" cy="1332" r="18"/></g>
    <path d="M-890 1100Q-500 1145 -80 1125T900 1100" fill="none" stroke="#f7e4bb" stroke-width="10" opacity=".72"/>
    <!-- pequena cabine de comando na popa -->
    <g id="sea-boat-cabin" transform="translate(-650 0)">
     <path d="M-175 1035V875Q-170 820 -115 810H105Q160 820 165 875V1035Z" fill="#e7dfc9" stroke="#60452e" stroke-width="13"/>
     <path d="M-185 870Q-160 785 -95 770H95Q160 785 180 870Z" fill="#2e6671" stroke="#253f45" stroke-width="13"/>
     <path d="M-195 862Q-150 770 -85 748H100Q168 770 192 862L165 880H-170Z" fill="#d8c49d" stroke="#5b4934" stroke-width="11"/>
     <path d="M-165 858Q-120 790 -72 782H85Q137 790 163 858" fill="none" stroke="#f4e6c5" stroke-width="9"/>
     <path d="M-135 885H-35V940H-135ZM15 885H115V940H15Z" fill="#b6d9d6" stroke="#4e6a6a" stroke-width="8"/>
     <path d="M-125 894L-45 932M25 894L105 932" stroke="#eef4df" stroke-width="6" opacity=".8"/>
     <path d="M-145 875H130V950H-145Z" fill="#8fc4c7" stroke="#5a4835" stroke-width="10"/>
     <path d="M-12 875V950M-145 912H130" stroke="#f5e8c9" stroke-width="9"/>
     <path d="M-160 1028H150" stroke="#b47b45" stroke-width="17"/>
     <rect x="-45" y="955" width="90" height="72" rx="8" fill="#6b4930" stroke="#4b3526" stroke-width="8"/>
     <circle cx="0" cy="990" r="13" fill="#e8c27c"/>
     <path d="M-100 780V735H-82V780" fill="#6d5140" stroke="#4b3526" stroke-width="6"/>
     <path d="M-92 735Q-78 710 -62 735" fill="none" stroke="#d8e9e5" stroke-width="7"/>
    </g>
    <!-- caixas de pesca, boia e pequeno barril -->
    <g transform="translate(100 1170)">
     <path d="M-115 -65H115V78H-115Z" fill="#a66d3d" stroke="#573b27" stroke-width="10"/>
     <path d="M-115 -28H115M-75 -65V78M75 -65V78" stroke="#e0b47a" stroke-width="9"/>
     <path d="M-88 -80H88" stroke="#593c28" stroke-width="14" stroke-linecap="round"/>
    </g>
    <g transform="translate(700 1190)">
     <path d="M-48 -70Q-62 -20 -42 56Q0 85 42 56Q62 -20 48 -70Z" fill="#b94e3e" stroke="#67392f" stroke-width="9"/>
     <path d="M-45 -15H45" stroke="#f1d6a5" stroke-width="12"/>
     <path d="M-24 -72Q0 -100 24 -72" fill="none" stroke="#69452d" stroke-width="10"/>
    </g>
    <!-- mastro curto e bandeirola -->
    <path d="M410 1000V690" stroke="#62462e" stroke-width="17" stroke-linecap="round"/>
    <path d="M420 700Q520 665 600 710L420 760Z" fill="#e7b75f" stroke="#76502e" stroke-width="7"/>
    <path d="M420 700V760" stroke="#f6e7c8" stroke-width="7"/>
    <!-- vara de pesca apoiada na amurada -->
    <g transform="translate(760 965) rotate(-18)">
     <path d="M0 0L-70 -280" stroke="#4d3526" stroke-width="13" stroke-linecap="round"/>
     <path d="M-70 -280L-120 -470" stroke="#b88b5c" stroke-width="5" stroke-linecap="round"/>
     <path d="M-120 -470Q-95 -260 -10 -55" fill="none" stroke="#eaf7ed" stroke-width="3" opacity=".75"/>
    </g>
   <g transform="translate(-430 1155)" data-sea-bag role="button" tabindex="0" aria-label="Abrir bolsa de pesca" style="cursor:pointer" pointer-events="all">
    <ellipse cx="0" cy="95" rx="125" ry="24" fill="#3b291d" opacity=".3"/>
    <path d="M-82 12Q-78 -42 -34 -48H38Q82 -42 84 12L68 98Q0 124 -68 98Z" fill="#9b6034" stroke="#51331f" stroke-width="13"/>
    <path d="M-53 -40Q-48 -102 0 -102Q48 -102 53 -40" fill="none" stroke="#4e3423" stroke-width="15"/>
    <path d="M-78 12Q0 35 80 12L70 42Q0 65 -70 42Z" fill="#c28a4d" stroke="#6e4728" stroke-width="8"/>
    <rect x="-17" y="27" width="34" height="29" rx="7" fill="#e8c16d" stroke="#694526" stroke-width="6"/><path d="M-95 4Q-120 35 -110 72M95 4Q120 35 110 72" fill="none" stroke="#e5c18c" stroke-width="9"/>
    <rect x="-116" y="-112" width="232" height="250" rx="28" fill="transparent" stroke="transparent"/>
    <text x="0" y="158" text-anchor="middle" font-size="42" fill="#fff4d7" stroke="#5a3b25" stroke-width="5" paint-order="stroke">🎒</text>
   </g>
   <g transform="translate(420 1155)" data-sea-net role="button" tabindex="0" aria-label="Lançar rede e pescar" style="cursor:pointer" pointer-events="all">
    <ellipse cx="0" cy="105" rx="132" ry="22" fill="#3b291d" opacity=".28"/>
    <path d="M-100 78L-12 -20L98 -102" fill="none" stroke="#67452b" stroke-width="22" stroke-linecap="round"/>
    <path d="M-12 -20L-100 78L-8 112L92 20Z" fill="#e7d8ae" fill-opacity=".32" stroke="#f1dfb6" stroke-width="9"/>
    <path d="M-72 59L51 -53M-42 83L76 -24M-90 30L20 93M-60 1L49 64M-30 -27L78 35" fill="none" stroke="#d7c69c" stroke-width="6" opacity=".9"/>
    <path d="M-115 92Q-10 140 112 38" fill="none" stroke="#7b5837" stroke-width="13"/>
    <rect x="-142" y="-125" width="284" height="280" rx="28" fill="transparent" stroke="transparent"/>
    <text x="0" y="178" text-anchor="middle" font-size="42" fill="#fff4d7" stroke="#5a3b25" stroke-width="5" paint-order="stroke">🪢</text>
   </g>
   </g>
  </g>
 </g>`;
}
function renderFarmAddons(previewOnly=false){const layer=$('decoration-layer');if(!layer||!state)return;const brandIcon=$('brand-theme-icon');if(!previewOnly&&brandIcon)brandIcon.textContent=FARM_THEMES[state.farmTheme||'classic']?.icon||'🌿';const world=$('world');if(world)world.setAttribute('data-farm-theme',state.farmTheme||'classic');if(!previewOnly)applyMenuThemeColors();const groundWinter=$('theme-ground-layer');if(groundWinter)groundWinter.innerHTML=state.farmTheme==='christmas'?'<rect x="-2600" y="-400" width="7000" height="1700" fill="#f2f8fc" opacity=".78"/>':'';const winterLayer=$('theme-overlay-layer');if(winterLayer)winterLayer.innerHTML=state.farmTheme==='christmas'?'<g pointer-events="none"><path d="M-68 620L532 350L1132 620L532 890Z" fill="#f4fbff" opacity=".48"/><path d="M-45 620L532 370L1108 620L532 870Z" fill="none" stroke="#ffffff" stroke-width="12" opacity=".48"/><path d="M-2000 620L-1400 350L-800 620L-1400 890Z" fill="#f4fbff" opacity=".48"/><path d="M-1977 620L-1400 370L-823 620L-1400 870Z" fill="none" stroke="#ffffff" stroke-width="12" opacity=".48"/></g>':'';updateDayNight();let html=renderThemeScenery(state.farmTheme)+renderHouseThemeDecor(state.farmTheme)+renderPondArea()+renderRiverLandmarks()+renderLakeArea()+renderHarasArea()+renderOrchardArea()+renderForestArea();if(state.grill?.owned){const x=700,y=280;html+=`<g id="grill-building" transform="translate(${x} ${y}) scale(.92)">
 <ellipse cx="0" cy="66" rx="58" ry="12" fill="#234b13" opacity=".25"/>
 <path d="M-48 -5L-40 -45H40L48 -5V52H-48Z" fill="${state.grill.assembled?'#a94c34':'#a9a09a'}" stroke="#633c24" stroke-width="5"/>
 <path d="M-48 -44L-30 -66H30L48 -44" fill="#8b4930" stroke="#603821" stroke-width="6"/>
 <path d="M-38 -36H38" stroke="#e7a56b" stroke-width="6"/>
 <path d="M-32 -24H32V25H-32Z" fill="#33231d" stroke="#5c3828" stroke-width="5"/>
 <path d="M-26 -16H26M-26 -7H26M-26 2H26" stroke="#b6a18a" stroke-width="4"/>
 <path d="M-28 30Q-16 8 -4 30Q8 8 20 30" fill="none" stroke="#ef8d31" stroke-width="6"/>
 <path d="M-36 50V68M36 50V68" stroke="#67402a" stroke-width="9" stroke-linecap="round"/>
 <path d="M-54 -42L-54 -68H-36V-42" fill="#9a5133" stroke="#633c24" stroke-width="5"/>
 <path d="M-51 -67H-33" stroke="#4a3429" stroke-width="8"/>
 
 </g>`}
 const kitchenSmoke=(state.kitchen?.queue||[]).some(job=>job.readyAt>Date.now());
 const grillSmoke=(state.grill?.queue||[]).some(job=>job.readyAt>Date.now());
 if(kitchenSmoke)html+=`<g class="production-smoke house-smoke" transform="translate(1060 98)" pointer-events="none"><circle class="smoke-puff puff-a" cx="0" cy="0" r="9"/><circle class="smoke-puff puff-b" cx="7" cy="-8" r="7"/><circle class="smoke-puff puff-c" cx="-4" cy="-15" r="8"/><circle class="smoke-puff puff-d" cx="5" cy="-23" r="6"/></g>`;
 if(grillSmoke)html+=`<g class="production-smoke grill-smoke" transform="translate(650 205)" pointer-events="none"><circle class="smoke-puff puff-a" cx="0" cy="0" r="7"/><circle class="smoke-puff puff-b" cx="5" cy="-8" r="6"/><circle class="smoke-puff puff-c" cx="-3" cy="-15" r="7"/></g>`;
 for(const d of state.placedDecorations){const [x,y]=DECORATION_SLOTS[d.slot]||[0,0];html+=renderDecorationMarkup(d.id,x,y)}layer.innerHTML=html;const worldSvg=$('world');if(worldSvg){worldSvg.querySelector('#river-fishing-sign')?.remove();worldSvg.insertAdjacentHTML('beforeend',` <g id="river-fishing-sign" aria-hidden="true" pointer-events="none" transform="translate(-1950 880)">
  <rect x="-82" y="-76" width="164" height="142" fill="#ffffff" opacity="0.01" pointer-events="none"/>
  <ellipse cx="0" cy="48" rx="50" ry="9" fill="#244b21" opacity=".25"/>
  <path d="M0 35V-7" stroke="#68452c" stroke-width="9" stroke-linecap="round"/>
  <path d="M-3 33V-6" stroke="#bd8b54" stroke-width="4" stroke-linecap="round"/>
  <path d="M-63 -53Q-63 -62 -53 -62H53Q63 -62 63 -53V-8Q63 1 53 1H-53Q-63 1 -63 -8Z" fill="#a66a37" stroke="#593a27" stroke-width="6"/>
  <path d="M-54 -51H54V-10H-54Z" fill="#f2d49a" stroke="#d4a76b" stroke-width="3"/>
  <text x="0" y="-22" text-anchor="middle" font-size="25" font-weight="900" letter-spacing="1" fill="#4d3928">PESCA</text>
  <path d="M-42 -43H42" stroke="#fff0c7" stroke-width="2" opacity=".7"/>
 </g>
 <g id="river-fishing-backpack" data-river-backpack="true" tabindex="0" role="button" aria-label="Abrir mochila de pesca" pointer-events="all" style="cursor:pointer;touch-action:manipulation" transform="translate(-2180 1010)">
  <rect x="-62" y="-66" width="124" height="132" fill="#fff" opacity=".01" pointer-events="all"/>
  <ellipse cx="0" cy="58" rx="54" ry="11" fill="#294b24" opacity=".3"/>
  <path d="M-30 -35Q-35 -58 -13 -60H13Q35 -58 30 -35" fill="none" stroke="#284b2d" stroke-width="10"/>
  <path d="M-43 -28Q-47 -42 -30 -48L-20 -55H20L30 -48Q47 -42 43 -28L48 37Q0 60 -48 37Z" fill="#397b42" stroke="#214b2d" stroke-width="7" stroke-linejoin="round"/>
  <path d="M-34 -28Q0 -39 34 -28L39 30Q0 47 -39 30Z" fill="#4e9851" stroke="#a4c77b" stroke-width="3"/>
  <path d="M-24 -39L-18 36M24 -39L18 36" stroke="#244e31" stroke-width="7" stroke-linecap="round"/>
  <rect x="-25" y="-8" width="50" height="31" rx="7" fill="#d8c28a" stroke="#5d4a2b" stroke-width="3"/>
  <path d="M-13 7Q0 -5 13 7Q0 20 -13 7Z" fill="#4d8b4d" stroke="#315b35" stroke-width="2"/>
  <path d="M-36 -38L-25 -47M36 -38L25 -47" stroke="#d0b47b" stroke-width="4" stroke-linecap="round"/>
 </g>
 <g id="river-fishing-rod" data-river-rod="true" tabindex="0" role="button" aria-label="Iniciar pesca no Rio" pointer-events="all" style="cursor:pointer;touch-action:manipulation" transform="translate(-1650 1025) rotate(35)">
  <rect x="-32" y="-210" width="76" height="230" fill="#fff" opacity=".01" pointer-events="all"/>
  <ellipse cx="0" cy="8" rx="27" ry="7" fill="#294b24" opacity=".28"/>
  <path d="M0 0Q-2 -48 7 -96Q13 -145 20 -194" fill="none" stroke="#4d2e1b" stroke-width="12" stroke-linecap="round"/>
  <path d="M0 -8Q-1 -55 9 -103Q14 -151 21 -194" fill="none" stroke="#bd8b4f" stroke-width="5" stroke-linecap="round"/>
  <path d="M20 -194Q31 -207 40 -213" fill="none" stroke="#e4c98e" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M-1 -26Q-23 -37 -29 -20Q-31 -7 -12 -4" fill="none" stroke="#3d2920" stroke-width="6"/>
  <circle cx="-10" cy="-17" r="10" fill="#c5cbd0" stroke="#4d3a2a" stroke-width="3"/>
  <circle cx="-10" cy="-17" r="4" fill="#6c8590"/>
  <path d="M-8 -1L-5 9" stroke="#70452c" stroke-width="7" stroke-linecap="round"/>
 </g>`)}}

function forestProgress(tree){if(!tree?.type||!tree.plantedAt)return 0;return Math.max(0,Math.min(1,(Date.now()-tree.plantedAt)/(FOREST_TREES[tree.type].hours*FOREST_TIME_FACTOR*HOUR)))}
function forestTreeMarkup(slot,tree){const [x,y]=FOREST_SLOT_POS[slot],cfg=tree?.type?FOREST_TREES[tree.type]:null;if(!cfg)return '<g data-forest-slot="'+slot+'" transform="translate('+x+' '+y+')" style="cursor:pointer"><ellipse cy="8" rx="46" ry="13" fill="#3e6b2d" opacity=".25"/><ellipse cy="0" rx="38" ry="15" fill="#9a7046" stroke="#704b2d" stroke-width="4"/><text y="-25" text-anchor="middle" font-size="14" fill="#fff3ce" stroke="#5c421f" stroke-width="3" paint-order="stroke">＋ Plantar</text></g>';
 const p=forestProgress(tree),ready=tree.status==='ready'||p>=1;return '<g data-forest-slot="'+slot+'" transform="translate('+x+' '+y+')" style="cursor:pointer"><ellipse cy="8" rx="48" ry="12" fill="#315d29" opacity=".25"/><path d="M-8 0L-6 -62L6 -62L8 0Z" fill="#805334" stroke="#604027" stroke-width="3"/><circle cy="-76" r="36" fill="'+cfg.color+'" stroke="#396d39" stroke-width="4"/><circle cx="-24" cy="-58" r="22" fill="'+cfg.color+'" opacity=".9"/><circle cx="23" cy="-58" r="23" fill="'+cfg.color+'" opacity=".9"/><circle cy="-96" r="21" fill="'+cfg.color+'" opacity=".9"/><text y="30" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff5d4" stroke="#563d20" stroke-width="3" paint-order="stroke">'+(ready?'PRONTA':Math.round(p*100)+'%')+'</text><title>'+cfg.name+' · '+(ready?'Clique para colher':formatHours((1-p)*cfg.hours*FOREST_TIME_FACTOR)+' restantes')+'</title></g>'}
function unlockedForestPlotCount(){const level=farmLevel(),byLevel=level<20?0:Math.min(FOREST_PLOTS,1+Math.floor((level-20)/2));let occupied=0;for(let i=0;i<state.forestPlots.length;i++)if(state.forestPlots[i]?.type)occupied=i+1;return Math.max(byLevel,occupied)}
function forestLockedSlotMarkup(slot){const [x,y]=FOREST_SLOT_POS[slot],required=20+slot*2;return '<g data-forest-slot="'+slot+'" transform="translate('+x+' '+y+')" style="cursor:pointer"><ellipse cy="8" rx="46" ry="13" fill="#294b26" opacity=".28"/><ellipse cy="0" rx="38" ry="15" fill="#806747" stroke="#59462f" stroke-width="4"/><path d="M-10 -17v-8a10 10 0 0 1 20 0v8" fill="none" stroke="#f4d78a" stroke-width="4"/><rect x="-14" y="-19" width="28" height="23" rx="4" fill="#e1c078" stroke="#76552d" stroke-width="3"/><text y="-28" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff5d4" stroke="#563d20" stroke-width="3" paint-order="stroke">NV. '+required+'</text><title>Canteiro bloqueado · alcance o nível '+required+'</title></g>'}
function renderForestArea(){const background='<g id="forest-area" pointer-events="none"><path d="M3735 225Q3760 190 3835 190H5125Q5200 200 5235 255V590Q5210 650 5125 660H3835Q3750 650 3720 590V275Q3720 240 3735 225Z" fill="#754b32" stroke="#563a28" stroke-width="12" stroke-linejoin="round"/><path d="M3760 270Q3790 230 3845 230H5110Q5170 240 5195 280V575Q5170 615 5110 620H3845Q3785 610 3755 575V285Z" fill="#a8754c" stroke="#c18a5c" stroke-width="7" stroke-linejoin="round"/><path d="M3800 350Q3990 330 4170 350T4550 345T4950 350M3800 500Q4000 480 4180 505T4570 500T4980 505" fill="none" stroke="#805638" stroke-width="10" stroke-linecap="round" opacity=".28"/><g fill="#6f4933" opacity=".28"><ellipse cx="3910" cy="420" rx="18" ry="6"/><ellipse cx="4300" cy="300" rx="17" ry="5"/><ellipse cx="4700" cy="555" rx="20" ry="6"/><ellipse cx="5050" cy="420" rx="18" ry="5"/></g></g>';const unlocked=unlockedForestPlotCount();return '<g id="forest-area-position" transform="translate(100 0)">'+background+state.forestPlots.map((t,i)=>i<unlocked?forestTreeMarkup(i,t):forestLockedSlotMarkup(i)).join('')+'</g>'}
function focusForestArea(close=true){switchFarmScene('nature');view.zoom=.82;view.cx=4500;view.cy=425;updateView();if(close)closeModal()}
function plantForestTree(slot,id){if(writeLocked)return notify('Salvamento protegido.');const tree=state.forestPlots[slot],cfg=FOREST_TREES[id],unlocked=unlockedForestPlotCount();if(!Number.isInteger(slot)||slot<0||slot>=unlocked)return notify('Este canteiro será liberado no nível '+(20+slot*2)+'.');if(!tree||tree.type||!cfg||cfg.retired)return notify('Escolha um canteiro vazio e uma espécie disponível.');if(farmLevel()<cfg.level)return notify(cfg.name+' exige nível '+cfg.level+'.');if((state.inventory['tree_'+id]||0)<1)return notify('Você não possui a muda de '+cfg.name+'. Compre-a na loja.');state.inventory['tree_'+id]--;discoverItem('mata',id,cfg.name,cfg.icon||'🌳');state.progressCounters.explore=(state.progressCounters.explore||0)+1;bumpMissionProgress('explore',1);state.forestPlots[slot]={type:id,status:'growing',plantedAt:Date.now()};awardProfessionXP('lumberjack',10,'plantio na Mata');remember('Plantou '+cfg.name+' na Mata.');markDirty();refresh();notify(cfg.name+' plantada na Mata.')}
function harvestForestTree(slot){if(writeLocked)return notify('Salvamento protegido.');const t=state.forestPlots[slot];if(!t?.type)return openModal('forest');const cfg=FOREST_TREES[t.type],p=forestProgress(t);if(p<1&&t.status!=='ready')return notify(cfg.name+': faltam '+formatHours((1-p)*cfg.hours*FOREST_TIME_FACTOR)+'.');state.progressCounters.explore=(state.progressCounters.explore||0)+1;bumpMissionProgress('explore',1);if(cfg.fruitCrop){const fruit=CROPS[cfg.fruitCrop];state.warehouse[cfg.fruitCrop]=(state.warehouse[cfg.fruitCrop]||0)+cfg.yield;awardProfessionXP('lumberjack',cfg.xp,'colheita de frutos da Mata');remember('Colheu '+cfg.yield+' frutos de '+cfg.name+'.');state.forestPlots[slot]={type:null,status:'empty',plantedAt:0};markDirty();refresh();return notify(cfg.yield+' '+fruit.name+' adicionados ao depósito para suas receitas.')}if(cfg.herbYield){const key='herb_'+cfg.herbYield;state.inventory[key]=(state.inventory[key]||0)+cfg.yield;awardProfessionXP('lumberjack',cfg.xp,'colheita de ervas na Mata');remember('Colheu '+cfg.yield+' folhas de '+cfg.name+'.');state.forestPlots[slot]={type:null,status:'empty',plantedAt:0};markDirty();refresh();return notify(cfg.yield+' folhas de '+cfg.name+' adicionadas aos ingredientes do Mix de Ervas.')}if(cfg.wood)state.woodWarehouse[cfg.wood]=(state.woodWarehouse[cfg.wood]||0)+cfg.yield;if(cfg.leafId){const key='herb_'+cfg.leafId;state.inventory[key]=(state.inventory[key]||0)+Math.max(1,Math.floor(cfg.yield/3));}awardProfessionXP('lumberjack',cfg.xp,'colheita de madeira');remember('Obteve '+cfg.yield+' unidades de '+cfg.woodName+'.');state.forestPlots[slot]={type:null,status:'empty',plantedAt:0};markDirty();refresh();notify(cfg.yield+' unidades de '+cfg.woodName+' adicionadas ao estoque.'+(cfg.leafId?' Folhas também recolhidas para o Mix de Ervas.':''))}
function buySeaNet(id,currency){if(writeLocked)return notify('Salvamento protegido.');if(farmLevel()<22)return notify('A pesca no mar é desbloqueada no nível 22.');const cfg=SEA_NETS[id];if(!cfg||id==='normal')return;if(state.seaFishing.nets.includes(id))return selectSeaNet(id);if(farmLevel()<cfg.level)return notify('A rede '+cfg.name+' exige nível '+cfg.level+'.');const wallet=currency==='greenCoins'?'greenCoins':'coins',price=currency==='greenCoins'?cfg.greenCoins:cfg.coins;if(state[wallet]<price)return notify(currency==='greenCoins'?'Moedas verdes insuficientes.':'Moedas amarelas insuficientes.');state[wallet]-=price;state.seaFishing.nets.push(id);discoverItem('equipamentos','rede_'+id,'Rede '+cfg.name,'🪢');state.seaFishing.net=id;remember('Comprou a rede '+cfg.name+'.');markDirty();refresh();notify('Rede '+cfg.name+' adquirida e equipada.')}
function selectSeaNet(id){if(!farmWriteAllowed())return;if(farmLevel()<22)return notify('A pesca no mar é desbloqueada no nível 22.');if(!SEA_NETS[id]||!state.seaFishing.nets.includes(id))return;state.seaFishing.net=id;markDirty();refresh();notify('Rede '+SEA_NETS[id].name+' equipada.')}
function castSeaNet(){
 if(soundEnabled)ensureAudio();
 if(writeLocked)return notify('Salvamento protegido.');
 if(farmLevel()<22)return notify('A pesca no mar é desbloqueada no nível 22.');
 const now=Date.now(),remaining=SEA_FISH_COOLDOWN-(now-(state.seaFishing.lastCastAt||0));
 if(remaining>0)return notify('Aguarde '+Math.ceil(remaining/1000)+' segundo(s) para lançar a rede novamente.');
 const net=SEA_NETS[state.seaFishing.net]||SEA_NETS.normal;
 const available=Object.entries(SEA_TYPES).filter(([,f])=>!f.extraordinaryOnly&&f.minNet<=net.order);
 const misses=state.seaFishing.extraordinaryMisses||0;
 const chance=Math.min(8,1.5+Math.floor(misses/5)*.5);
 const extraordinary=misses>=50-1||Math.random()*100<chance;
 let id=net.extraordinaryOnly?extraordinaryFishingChoice(SEA_TYPES,'minNet',net.order):(extraordinary?extraordinaryFishingChoice(SEA_TYPES,'minNet',net.order):null);
 const isExtraordinary=!!id;
 if(net.extraordinaryOnly&&!id)return notify('Nenhuma captura extraordinária disponível para esta rede.');
 if(!id)id=weightedFishingChoice(available,'minNet',net.order);
 if(!id)return notify('Nenhum item disponível para esta rede.');
 state.seaFishing.lastCastAt=now;
 state.seaFishing.extraordinaryMisses=isExtraordinary?0:Math.min(50,misses+1);
 state.seaFishing.pendingCatch={id,readyAt:now+SEA_FISH_COOLDOWN,isExtraordinary,quantity:1,net:state.seaFishing.net};
 markDirty();refresh();
 notify('🌊 Rede lançada! Aguarde a contagem para descobrir a captura.');
}
function craftWoodItem(id){if(writeLocked)return notify('Salvamento protegido.');const cfg=WOODWORK_RECIPES[id];if(!cfg)return;const have=state.woodWarehouse[cfg.wood]||0;if(have<cfg.qty)return notify('Madeira insuficiente: '+cfg.qty+' unidades de '+ingredientName('wood',cfg.wood)+'.');state.carpentry=state.carpentry||{queue:[]};if(state.carpentry.queue.length>=100)return notify('A fila da marcenaria atingiu o limite de 100 fabricações.');state.woodWarehouse[cfg.wood]-=cfg.qty;const now=Date.now(),startedAt=state.carpentry.queue.filter(j=>j.readyAt>now).reduce((m,j)=>Math.max(m,j.readyAt),now),minutes=cfg.minutes||Math.max(25,20+cfg.qty*9+(cfg.lakeBridge?35:0)),readyAt=startedAt+minutes*60000;state.carpentry.queue.push({id:'wood-'+now+'-'+Math.floor(Math.random()*100000),recipe:id,startedAt,readyAt,xpEarned:12,woodConsumed:cfg.qty});remember('Iniciou a fabricação de '+cfg.name+' na marcenaria.');markDirty();refresh();notify(cfg.name+' entrou na fila. Aguarde '+minutes+' minutos para recolher.')}
function collectWoodwork(){if(writeLocked)return notify('Salvamento protegido.');const now=Date.now(),ready=(state.carpentry?.queue||[]).filter(j=>j.readyAt<=now);if(!ready.length)return notify('Ainda não há móveis ou itens prontos para recolher.');let xp=0;for(const job of ready){if(!WOODWORK_RECIPES[job.recipe])continue;state.furnitureWarehouse[job.recipe]=(state.furnitureWarehouse[job.recipe]||0)+1;discoverItem('marcenaria',job.recipe,WOODWORK_RECIPES[job.recipe].name,'🪚');xp+=job.xpEarned||12;}state.carpentry.queue=state.carpentry.queue.filter(j=>j.readyAt>now);const earnedXP=awardProfessionXP('carpenter',xp,'marcenaria');remember('Recolheu '+ready.length+' item(ns) fabricado(s) na marcenaria.');markDirty();refresh();notify(ready.length+' item(ns) recolhido(s) · +'+earnedXP+' XP de Marceneiro.')}

function updateMultiSelectControls(){const toggle=$('multi-select-plots'),harvest=$('multi-harvest-selected');if(toggle){toggle.classList.toggle('active',multiSelectMode);toggle.textContent=multiSelectMode?'✖ Cancelar seleção':'☑ Selecionar canteiros';toggle.setAttribute('aria-pressed',String(multiSelectMode))}if(harvest){harvest.disabled=!selectedPlotIndices.size;harvest.textContent='🌾 Colher selecionados ('+selectedPlotIndices.size+')'}const tip=$('tip');if(tip)tip.textContent=multiSelectMode?'Modo de seleção: clique nos canteiros maduros que deseja colher.':'Selecione uma ferramenta e clique em um canteiro.'}
function toggleMultiSelectPlots(){if(writeLocked)return notify('Salvamento protegido.');multiSelectMode=!multiSelectMode;selectedPlotIndices.clear();updateMultiSelectControls();renderPlots();notify(multiSelectMode?'Selecione vários canteiros maduros e depois escolha Colher selecionados.':'Seleção múltipla encerrada.')}
function harvestSelectedPlots(){if(writeLocked)return notify('Salvamento protegido.');let count=0,totalXP=0;for(const i of [...selectedPlotIndices]){const p=state.plots[i];if(!p||p.status!=='growing'||progress(p)<1)continue;const id=p.crop,c=CROPS[id],target=c.kind==='flower'?state.flowerWarehouse:state.warehouse;target[id]=(target[id]||0)+c.yield;discoverItem('canteiros',id,c.name,c.icon);totalXP+=Math.floor(c.xp/(c.seasons||1));count++;if(id==='pinheiro_natal'&&p.harvestsRemaining<=1)state.decorInventory.christmas_tree=(state.decorInventory.christmas_tree||0)+1;p.harvestsRemaining=Math.max(0,p.harvestsRemaining-1);if(p.harvestsRemaining>0)Object.assign(p,{plantedAt:Date.now(),wateredAt:Date.now(),weed:false,pest:false,weedCleared:false,pestCleared:false,regrowing:true});else Object.assign(p,{status:'spent',crop:null,plantedAt:null,wateredAt:null,weed:false,pest:false})}selectedPlotIndices.clear();multiSelectMode=false;updateMultiSelectControls();if(!count){renderPlots();return notify('Nenhum dos canteiros selecionados continua maduro.')}state.progressCounters.harvest=(state.progressCounters.harvest||0)+count;bumpMissionProgress('harvest',count);playSfx('harvest');awardXP(totalXP,'colheita múltipla');remember('Colheu '+count+' canteiro(s) selecionado(s).');markDirty();refresh();notify(count+' canteiro(s) colhido(s) · +'+totalXP+' XP.')}
function quickHarvest(){if(writeLocked)return notify('Salvamento protegido.');let count=0,totalXP=0;for(const p of state.plots){if(p.status!=='growing'||progress(p)<1)continue;const cropId=p.crop,c=CROPS[cropId],target=c.kind==='flower'?state.flowerWarehouse:state.warehouse;target[cropId]=(target[cropId]||0)+c.yield;discoverItem('canteiros',cropId,c.name,c.icon);const gained=Math.floor(c.xp/(c.seasons||1));totalXP+=gained;count++;if(cropId==='pinheiro_natal'&&p.harvestsRemaining<=1)state.decorInventory.christmas_tree=(state.decorInventory.christmas_tree||0)+1;p.harvestsRemaining=Math.max(0,p.harvestsRemaining-1);if(p.harvestsRemaining>0)Object.assign(p,{plantedAt:Date.now(),wateredAt:Date.now(),weed:false,pest:false,weedCleared:false,pestCleared:false,regrowing:true});else Object.assign(p,{status:'spent',crop:null,plantedAt:null,wateredAt:null,weed:false,pest:false})}if(!count)return notify('Não há plantas maduras para colher.');state.progressCounters.harvest=(state.progressCounters.harvest||0)+count;bumpMissionProgress('harvest',count);selectedPlotIndices.clear();multiSelectMode=false;updateMultiSelectControls();playSfx('harvest');awardXP(totalXP,'colheita rápida');remember(`Colheu rapidamente ${count} canteiro(s).`);markDirty();refresh();notify(`${count} canteiro(s) colhido(s) · +${totalXP} XP.`)}
function quickDig(){if(writeLocked)return notify('Salvamento protegido.');let count=0;for(const p of state.plots){if(p.status==='spent'){Object.assign(p,{status:'dirt',crop:null,plantedAt:null,wateredAt:null,weed:false,pest:false,harvestsRemaining:0});count++}}if(!count)return notify('Não há canteiros para escavar.');playSfx('hoe');remember(`Preparou rapidamente ${count} canteiro(s).`);markDirty();refresh();notify(`${count} canteiro(s) limpo(s).`)}
function socialId(){return 'cf2-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8)}
function downloadSocialPackage(payload,filename){const blob=new Blob([JSON.stringify({app:'ColheitaFeliz2',type:'cf2-social-exchange',version:1,...payload},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),800)}


function buildPublicFarmSnapshot(){
 const plots=(state.plots||[]).slice(0,72).map(p=>({
  status:['grass','dirt','spent','growing'].includes(p.status)?p.status:'dirt',
  crop:CROPS[p.crop]?p.crop:null,
  progress:p.status==='growing'&&CROPS[p.crop]&&Number.isFinite(p.plantedAt)?progress(p):0,
  plantedAt:Number.isFinite(p.plantedAt)?p.plantedAt:null,
  wateredAt:Number.isFinite(p.wateredAt)?p.wateredAt:null,
  regrowing:!!p.regrowing,
  harvestsRemaining:Math.max(0,Number(p.harvestsRemaining)||0),
  weed:!!p.weed,pest:!!p.pest,soil:p.soil==='red'?'red':'normal'
 }));
 const animals=(state.animals||[]).filter(a=>a&&ANIMALS[a.type]).slice(0,80).map(a=>({
  type:a.type,name:String(a.name||ANIMALS[a.type].name).slice(0,32),
  status:['hungry','producing','ready','growing','adult','guarding'].includes(a.status)?a.status:'hungry',
  slot:Number.isInteger(a.slot)?a.slot:0,aviarySlot:Number.isInteger(a.aviarySlot)?a.aviarySlot:0,
  stage:Math.max(1,Math.min(10,Number(a.stage)||1)),breed:DOG_BREEDS[a.breed]?a.breed:null
 }));
 const orchard=(state.orchardTrees||[]).slice(0,8).map(t=>({
  type:CROPS[t.type]?t.type:null,
  status:t.status==='ready'||(t.type&&orchardTreeProgress(t)>=1)?'ready':t.type?'growing':'empty',
  progress:t.type?orchardTreeProgress(t):0,plantedAt:Number.isFinite(t.plantedAt)?t.plantedAt:null,
  regrowing:!!t.regrowing,harvestsRemaining:Math.max(0,Number(t.harvestsRemaining)||0)
 }));
 const forest=(state.forestPlots||[]).slice(0,36).map(t=>({
  type:FOREST_TREES[t.type]?t.type:null,status:t.type&&forestProgress(t)>=1?'ready':t.type?'growing':'empty',
  progress:t.type?forestProgress(t):0,plantedAt:Number.isFinite(t.plantedAt)?t.plantedAt:null
 }));
 const lake={
  fish:Array.from({length:Math.min(10,(state.lake?.fish||[]).length)},()=>({})),
  decorations:(state.lake?.decorations||[]).filter(d=>DECORATIONS[d.id]).slice(0,12).map(d=>({id:d.id,slot:Number.isInteger(d.slot)?d.slot:0})),
  bridges:(state.lake?.bridges||[]).filter(d=>WOODWORK_RECIPES[d.id]).slice(0,4).map(d=>({id:d.id,slot:Number.isInteger(d.slot)?d.slot:0}))
 };
 const activeQueue=queue=>(queue||[]).some(job=>Number(job?.readyAt)>Date.now());
 return {
  version:2,farmTheme:FARM_THEMES[state.farmTheme]?state.farmTheme:'classic',plots,animals,orchard,forest,lake,
  expansions:{orchard:!!state.expansions?.orchard,pond:!!state.expansions?.pond,haras:!!state.expansions?.haras},
  decorations:(state.placedDecorations||[]).filter(d=>DECORATIONS[d.id]).slice(0,60).map(d=>({id:d.id,slot:Number.isInteger(d.slot)?d.slot:0})),
  grill:{owned:!!state.grill?.owned,assembled:!!state.grill?.assembled,queueActive:activeQueue(state.grill?.queue)},
  kitchen:{queueActive:activeQueue(state.kitchen?.queue)}
 };
}
let friendSelectedCropId='',friendSelectedArea='farm',friendSelectedAreaSlot=null;
let onlineFriends=[],onlineFriendRequests=[],onlineSearchResults=[],onlineSocialBusy=false,onlineSocialLoaded=false,onlinePlayerCode='',onlineCodeSearchResult=null,farmVisitSettings={allow_visits:true,like_count:0};
async function socialRpc(name,args={}){if(!supabaseClient||!cloudUser)throw new Error('Entre na sua conta para usar os recursos sociais.');const {data,error}=await supabaseClient.rpc(name,args);if(error)throw error;return data}
async function publishSocialProfile(){if(!cloudUser||!state)return;const profile={p_farm_name:state.farmName||'Minha fazenda',p_level:farmLevel(),p_popularity:Math.max(0,Number(state.popularity)||0),p_farm_snapshot:buildPublicFarmSnapshot()};await socialRpc('social_publish_profile',profile);try{onlinePlayerCode=String(await socialRpc('social_get_player_code')||'');await socialRpc('social_update_player_code_profile',{p_farm_name:profile.p_farm_name,p_level:profile.p_level,p_popularity:profile.p_popularity})}catch(error){console.warn('Código de jogador indisponível; aplique a migração social:',error)}}
async function refreshOnlineSocial(showError=true){if(!cloudUser)return;try{onlineSocialBusy=true;await publishSocialProfile();const [friends,requests,settings]=await Promise.all([socialRpc('social_list_friends'),socialRpc('social_list_requests'),socialRpc('social_get_farm_visit_settings')]);onlineFriends=Array.isArray(friends)?friends:[];onlineFriendRequests=Array.isArray(requests)?requests:[];farmVisitSettings=Array.isArray(settings)?(settings[0]||farmVisitSettings):(settings||farmVisitSettings);onlineSocialLoaded=true;refreshOnlineInbox(false).catch(error=>console.warn('Notificações sociais:',error));if(currentModal==='friends')renderModal()}catch(error){console.error('Social:',error);if(showError)notify(error.message||'Não foi possível carregar seus amigos.')}finally{onlineSocialBusy=false}}
async function searchOnlinePlayers(){const input=$('social-player-search'),query=(input?.value||'').trim();if(query.length<2)return notify('Digite pelo menos 2 caracteres para pesquisar.');try{onlineSearchResults=await socialRpc('social_search_players',{p_query:query})||[];onlineCodeSearchResult=null;renderModal()}catch(error){notify(error.message||'Falha ao pesquisar jogadores.')}}
async function searchOnlinePlayerByCode(){const input=$('social-player-code-search'),code=(input?.value||'').trim().toUpperCase();if(!/^CF-[A-F0-9]{8}$/.test(code))return notify('Digite um código válido no formato CF-XXXXXXXX.');try{const result=await socialRpc('social_find_player_by_code',{p_code:code});onlineCodeSearchResult=Array.isArray(result)?(result[0]||null):(result||null);renderModal();if(!onlineCodeSearchResult)notify('Nenhum jogador foi encontrado com esse código.')}catch(error){notify(error.message||'Falha ao pesquisar o código.')}}
async function copyOnlinePlayerCode(){if(!onlinePlayerCode)return notify('Seu código ainda não está disponível.');try{await navigator.clipboard.writeText(onlinePlayerCode);notify('Código de jogador copiado!')}catch{notify('Não foi possível copiar automaticamente. Código: '+onlinePlayerCode)}}
async function sendOnlineFriendRequest(id){try{await socialRpc('social_send_friend_request',{p_receiver:id});notify('Solicitação de amizade enviada!');await refreshOnlineSocial(false);if(currentModal==='friends')renderModal()}catch(error){notify(error.message||'Não foi possível enviar a solicitação.')}}
async function respondOnlineFriendRequest(id,accept){try{await socialRpc('social_respond_friend_request',{p_request:id,p_accept:accept});notify(accept?'Solicitação aceita. Vocês agora são amigos!':'Solicitação recusada.');await refreshOnlineSocial(false);if(currentModal==='friends')renderModal()}catch(error){notify(error.message||'Não foi possível responder à solicitação.')}}
let onlineMessages=[],onlineNotifications=[],activeConversationId='',onlineInboxLoaded=false,onlineInboxBusy=false;
async function refreshOnlineInbox(showError=true){
 if(!cloudUser)return;
 if(onlineInboxBusy)return;
 onlineInboxBusy=true;
 try{
  if(!onlineSocialLoaded)await refreshOnlineSocial(false);
  const notes=await socialRpc('social_list_notifications');
  onlineNotifications=Array.isArray(notes)?notes:[];updateSocialNotificationBadge();
  if(activeConversationId)await loadOnlineConversation(activeConversationId,false);
  onlineInboxLoaded=true;
  if(currentModal==='inbox')renderModal();
 }catch(error){console.error('Caixa social:',error);if(showError)notify(error.message||'Não foi possível atualizar a caixa de entrada.')}
 finally{onlineInboxBusy=false}
}
async function loadOnlineConversation(friendId,rerender=true){
 if(!friendId||!cloudUser)return;
 try{
  activeConversationId=friendId;
  const rows=await socialRpc('social_list_messages',{p_friend:friendId});
  onlineMessages=Array.isArray(rows)?rows:[];
  const unread=onlineMessages.filter(m=>m.sender_id===friendId&&!m.read_at);
  for(const message of unread)await socialRpc('social_mark_message_read',{p_message:message.id});
  if(unread.length)onlineMessages=await socialRpc('social_list_messages',{p_friend:friendId})||[];
  if(rerender&&currentModal==='inbox')renderModal();
 }catch(error){notify(error.message||'Não foi possível abrir esta conversa.')}
}
async function sendOnlineMessage(){
 const input=$('online-message-input'),body=(input?.value||'').trim();
 if(!activeConversationId)return notify('Escolha um amigo para iniciar a conversa.');
 if(!body)return notify('Digite uma mensagem antes de enviar.');
 if(body.length>500)return notify('A mensagem deve ter no máximo 500 caracteres.');
 try{
  await socialRpc('social_send_message',{p_receiver:activeConversationId,p_body:body});
  if(input)input.value='';
  await loadOnlineConversation(activeConversationId,false);
  await refreshOnlineInbox(false);
  if(currentModal==='inbox')renderModal();
  notify('Mensagem enviada!');
 }catch(error){notify(error.message||'Não foi possível enviar a mensagem.')}
}
async function markOnlineNotificationRead(id){
 try{await socialRpc('social_mark_notification_read',{p_notification:id});onlineNotifications=onlineNotifications.map(n=>n.id===id?{...n,read_at:new Date().toISOString()}:n);updateSocialNotificationBadge();if(currentModal==='inbox')renderModal()}
 catch(error){notify(error.message||'Não foi possível marcar a notificação.')}
}
async function markAllOnlineNotificationsRead(){
 try{await socialRpc('social_mark_all_notifications_read');const now=new Date().toISOString();onlineNotifications=onlineNotifications.map(n=>({...n,read_at:n.read_at||now}));updateSocialNotificationBadge();if(currentModal==='inbox')renderModal();notify('Todas as notificações foram marcadas como lidas.')}
 catch(error){notify(error.message||'Não foi possível marcar todas as notificações.')}
}
function updateSocialNotificationBadge(){
 const unread=onlineNotifications.filter(n=>!n.read_at).length;
 document.querySelectorAll('button[data-modal="friends"]').forEach(button=>{
  let badge=button.querySelector('.social-notification-badge');
  if(unread){if(!badge){badge=document.createElement('span');badge.className='social-notification-badge';button.append(badge)}badge.textContent=unread>99?'99+':String(unread);badge.setAttribute('aria-label',unread+' notificações não lidas')}
  else badge?.remove();
 });
}

let onlineGifts=[],onlineGiftsLoaded=false,onlineGiftsBusy=false,visitedFarm=null,selectedFriendPlot=null,friendVisitedScene='farm';farmVisitSettings={allow_visits:true,like_count:0};
async function refreshOnlineGifts(showError=true){
 if(!cloudUser||onlineGiftsBusy)return;
 onlineGiftsBusy=true;
 try{if(!onlineSocialLoaded)await refreshOnlineSocial(false);const rows=await socialRpc('social_list_gifts');onlineGifts=Array.isArray(rows)?rows:[];onlineGiftsLoaded=true;if(currentModal==='gifts')renderModal()}
 catch(error){console.error('Presentes online:',error);if(showError)notify(error.message||'Não foi possível carregar os presentes.')}
 finally{onlineGiftsBusy=false}
}
async function ensureSocialCloudCurrent(){
 if(cloudConflict)throw new Error('Há um conflito entre versões da fazenda. Resolva-o em Conta e sincronização antes de enviar presentes ou alterar o progresso.');
 if(dirty)await save();else await saving;
 if(cloudConflict)throw new Error('Há um conflito entre versões da fazenda. Resolva-o em Conta e sincronização antes de continuar.');
 if(cloudDirty)await saveCloud();
}
async function applySocialFarmState(row){
 const result=Array.isArray(row)?row[0]:row;
 if(!result?.state||!Number.isFinite(Number(result.revision)))throw new Error('O servidor não retornou o salvamento atualizado.');
 const restored=normalize(result.state);if(!restored)throw new Error('O salvamento atualizado retornou em formato inválido.');
 clearTimeout(saveTimer);saveTimer=null;state=restored;dirty=false;cloudDirty=false;cloudRevision=Number(result.revision);cloudUpdatedAt=new Date().toISOString();
 refresh();
 publishSocialProfile().catch(error=>console.error('Perfil social:',error));
}
async function sendOnlineGift(encoded){
 const [type,id]=String(encoded||'').split(':');
 const recipient=$('online-gift-recipient')?.value;
 if(!recipient)return notify('Escolha um amigo para receber o presente.');
 const friend=onlineFriends.find(f=>f.user_id===recipient);if(!friend)return notify('Destinatário não encontrado na sua lista de amigos.');
 const item=type==='bouquet'?BOUQUETS[id]:GIFT_ITEMS[id];
 if(!item)return notify('Este presente não é válido.');
 if(!confirm('Enviar '+item.name+' para '+friend.farm_name+'? O item será retirado da sua coleção.'))return;
 try{await ensureSocialCloudCurrent();const row=await socialRpc('social_send_gift',{p_receiver:recipient,p_gift_type:type,p_gift_id:id});await applySocialFarmState(row);await refreshOnlineGifts(false);notify(item.name+' enviado para '+friend.farm_name+'!');if(currentModal==='gifts')renderModal()}
 catch(error){console.error(error);notify(error.message||'Não foi possível enviar o presente.')}
}
async function claimOnlineGift(id){
 const gift=onlineGifts.find(g=>g.id===id);if(!gift)return notify('Presente não encontrado ou já recebido.');
 try{await ensureSocialCloudCurrent();const row=await socialRpc('social_claim_gift',{p_gift:id});await applySocialFarmState(row);onlineGifts=onlineGifts.filter(g=>g.id!==id);await refreshOnlineGifts(false);notify('Presente recebido e adicionado à sua coleção!');if(currentModal==='gifts')renderModal()}
 catch(error){console.error(error);notify(error.message||'Não foi possível receber o presente.')}
}
function renderOnlineGifts(){
 const friendOptions=onlineFriends.map(f=>'<option value="'+safe(f.user_id)+'">'+safe(f.farm_name)+'</option>').join('');
 const bouquetRows=BOUQUET_IDS.filter(id=>(state.bouquets?.[id]||0)>0).map(id=>'<div class="list-line"><span>'+BOUQUETS[id].icon+' '+safe(BOUQUETS[id].name)+' · '+fmt(state.bouquets[id])+'</span><button class="modal-action compact" data-send-online-gift="bouquet:'+id+'">Enviar</button></div>').join('');
 const itemRows=Object.entries(GIFT_ITEMS).filter(([id])=>(state.giftInventory?.[id]||0)>0).map(([id,g])=>'<div class="list-line"><span>'+g.icon+' '+safe(g.name)+' · '+fmt(state.giftInventory[id])+'</span><button class="modal-action compact" data-send-online-gift="item:'+id+'">Enviar</button></div>').join('');
 const pending=onlineGifts.length?onlineGifts.map(g=>{const item=g.gift_type==='bouquet'?BOUQUETS[g.gift_id]:GIFT_ITEMS[g.gift_id];return '<div class="list-line"><span><b>'+(item?.icon||'🎁')+' '+safe(item?.name||'Presente')+'</b><br><small>De '+safe(g.sender_farm_name||'Fazendeiro')+' · '+new Date(g.created_at).toLocaleString('pt-BR')+'</small></span><button class="modal-action compact" data-claim-online-gift="'+safe(g.id)+'">Receber</button></div>'}).join(''):'<p>Nenhum presente aguardando recebimento.</p>';
 return '<div class="gift-summary"><span class="symbol">🎁</span><div><b>Presentes online</b><small>Os itens são transferidos pelo servidor e só entram na sua coleção quando você os recebe.</small></div></div><h3>📤 Enviar para um amigo</h3>'+(friendOptions?'<label class="auth-field">Destinatário<select id="online-gift-recipient">'+friendOptions+'</select></label><p>Escolha um dos itens que já possui. O envio consome uma unidade do seu inventário ou coleção de buquês.</p><h4>💐 Buquês</h4>'+(bouquetRows||'<p>Você ainda não tem buquês disponíveis.</p>')+'<h4>🎁 Presentes históricos</h4>'+(itemRows||'<p>Você ainda não tem itens históricos disponíveis para enviar.</p>'):'<p>Adicione amigos antes de enviar presentes.</p>')+'<h3>📥 Presentes recebidos ('+onlineGifts.length+')</h3>'+(pending||'')+'<div class="actions"><button class="modal-action alt" data-refresh-online-gifts="true">Atualizar presentes</button><button class="modal-action alt" data-open="friends">Meus amigos</button><button class="modal-action alt" data-open="factory">Fábrica de buquês</button></div><h3>🎁 Coleção histórica</h3><div class="grid-cards">'+Object.entries(GIFT_ITEMS).map(([id,g])=>'<div class="store-card decor-card"><span class="symbol">'+g.icon+'</span><strong>'+safe(g.name)+'</strong><small>Na coleção: '+fmt(state.giftInventory?.[id]||0)+'</small><b>🟡 '+fmt(g.price)+' · preço estimado</b><button data-buy-gift="'+id+'" '+(state.coins<g.price?'disabled':'')+'>Adicionar à coleção</button></div>').join('')+'</div>';
}
function visitorTimezone(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||'UTC'}catch{return 'UTC'}}
async function visitOnlineFriendFarm(friendId){
 const friend=onlineFriends.find(f=>f.user_id===friendId);if(!friend)return notify('Amigo não encontrado.');
 try{
  const farm=await socialRpc('social_visit_friend_farm',{p_friend:friendId});if(!farm||typeof farm!=='object')throw new Error('O servidor não retornou os dados desta fazenda.');
  visitedFarm={...farm,friendId,helpUsed:0,helpLimit:15};selectedFriendPlot=null;friendVisitedScene='farm';friendSelectedArea='farm';friendSelectedAreaSlot=null;openModal('friend-farm');
  socialRpc('social_notify_farm_visit',{p_owner:friendId}).catch(error=>console.warn('Notificação de visita:',error));
  try{const help=await socialRpc('social_help_friend_status',{p_owner:friendId,p_timezone:visitorTimezone()}),quota=Array.isArray(help)?help[0]:help;if(currentModal==='friend-farm'&&visitedFarm?.friendId===friendId){visitedFarm={...visitedFarm,helpUsed:Number(quota?.used)||0,helpLimit:Number(quota?.limit)||15};renderModal()}}
  catch(error){console.warn('Não foi possível consultar o contador diário; a visita continua disponível:',error)}
 }catch(error){notify(error.message||'Não foi possível visitar esta fazenda.')}
}
async function toggleVisitedFarmLike(){
 if(!visitedFarm?.friendId)return notify('Abra primeiro a fazenda de um amigo.');
 try{const response=await socialRpc('social_toggle_farm_like',{p_owner:visitedFarm.friendId});const result=Array.isArray(response)?response[0]:response;if(!result)throw new Error('O servidor não confirmou a curtida.');visitedFarm={...visitedFarm,like_count:Number(result.like_count)||0,liked_by_me:!!result.liked_by_me};if(visitedFarm.liked_by_me)socialRpc('social_notify_farm_like',{p_owner:visitedFarm.friendId}).catch(error=>console.warn('Notificação de curtida:',error));renderModal()}
 catch(error){notify(error.message||'Não foi possível registrar sua curtida.')}
}
async function toggleFarmVisitPermission(){
 try{const next=!farmVisitSettings.allow_visits;const response=await socialRpc('social_set_farm_visit_permission',{p_allow:next});const result=Array.isArray(response)?response[0]:response;farmVisitSettings={...farmVisitSettings,...(result||{}),allow_visits:next};renderModal();notify(next?'Seus amigos agora podem visitar sua fazenda.':'As visitas à sua fazenda foram bloqueadas.')}
 catch(error){notify(error.message||'Não foi possível atualizar a privacidade da fazenda.')}
}
function friendPlotProgress(plot){
 if(!plot||plot.status!=='growing'||!CROPS[plot.crop])return 0;
 const hours=cropHours(plot.crop,!!plot.regrowing);
 if(typeof plot.plantedAt==='number'&&Number.isFinite(plot.plantedAt))return Math.max(0,Math.min(1,(Date.now()-plot.plantedAt)/(hours*HOUR)));
 const base=Math.max(0,Math.min(1,Number(plot.progress)||0)),updated=Date.parse(visitedFarm?.updated_at||'');
 if(!Number.isFinite(updated)||updated<=0)return base;
 return Math.max(0,Math.min(1,base+Math.max(0,Date.now()-updated)/(Math.max(1,hours)*HOUR)));
}
function buildFriendVisualState(snap){
 const visual=newGame(),level=Math.max(1,Math.min(999,Number(visitedFarm?.level)||1)),now=Date.now();
 visual.xp=Math.max(0,8*(level-1)*(level+23));
 visual.farmTheme=FARM_THEMES[snap.farmTheme]?snap.farmTheme:'classic';
 visual.expansions={...visual.expansions,orchard:!!snap.expansions?.orchard,pond:!!snap.expansions?.pond,haras:!!snap.expansions?.haras};
 visual.plots=Array.from({length:72},(_,i)=>{
  const p=snap.plots?.[i]||{},status=['grass','dirt','spent','growing'].includes(p.status)?p.status:'grass',crop=CROPS[p.crop]?p.crop:null,regrowing=!!p.regrowing;
  const hours=crop?cropHours(crop,regrowing):1,hasTime=typeof p.plantedAt==='number'&&Number.isFinite(p.plantedAt);
  const plantedAt=hasTime?p.plantedAt:now-Math.max(0,Math.min(1,Number(p.progress)||0))*hours*HOUR;
  return {...visual.plots[i],status,crop:status==='growing'?crop:null,plantedAt:status==='growing'&&crop?plantedAt:null,
   wateredAt:typeof p.wateredAt==='number'&&Number.isFinite(p.wateredAt)?p.wateredAt:plantedAt,
   regrowing,harvestsRemaining:Math.max(0,Number(p.harvestsRemaining)||0),weed:!!p.weed,pest:!!p.pest,soil:p.soil==='red'?'red':'normal'};
 });
 visual.animals=(snap.animals||[]).filter(a=>a&&ANIMALS[a.type]).slice(0,80).map((a,i)=>({
  id:String(a.id||'friend-animal-'+i).slice(0,80),type:a.type,name:String(a.name||ANIMALS[a.type].name).slice(0,32),
  status:['hungry','producing','ready','growing','adult','guarding'].includes(a.status)?a.status:'hungry',
  slot:Number.isInteger(a.slot)?a.slot:0,aviarySlot:Number.isInteger(a.aviarySlot)?a.aviarySlot:0,
  stage:Math.max(1,Math.min(10,Number(a.stage)||1)),breed:DOG_BREEDS[a.breed]?a.breed:null
 }));
 visual.orchardTrees=Array.from({length:8},(_,i)=>{
  const t=snap.orchard?.[i]||{},type=CROPS[t.type]?t.type:null;
  if(!type)return {type:null,status:'empty',plantedAt:0,harvestsRemaining:0,regrowing:false};
  const regrowing=!!t.regrowing,hours=cropHours(type,regrowing),p=Math.max(0,Math.min(1,Number(t.progress)||0));
  const plantedAt=typeof t.plantedAt==='number'&&Number.isFinite(t.plantedAt)?t.plantedAt:now-p*hours*HOUR;
  const ready=t.status==='ready'||p>=1;
  return {type,status:ready?'ready':'growing',plantedAt:ready?Math.min(plantedAt,now-hours*HOUR):plantedAt,harvestsRemaining:Math.max(0,Number(t.harvestsRemaining)||0),regrowing};
 });
 visual.forestPlots=Array.from({length:36},(_,i)=>{
  const t=snap.forest?.[i]||{},type=FOREST_TREES[t.type]?t.type:null;
  if(!type)return {type:null,status:'empty',plantedAt:0};
  const p=Math.max(0,Math.min(1,Number(t.progress)||0)),hours=FOREST_TREES[type].hours*FOREST_TIME_FACTOR;
  const plantedAt=typeof t.plantedAt==='number'&&Number.isFinite(t.plantedAt)?t.plantedAt:now-p*hours*HOUR,ready=t.status==='ready'||p>=1;
  return {type,status:ready?'ready':'growing',plantedAt:ready?Math.min(plantedAt,now-hours*HOUR):plantedAt};
 });
 visual.placedDecorations=(snap.decorations||[]).filter(d=>DECORATIONS[d.id]).slice(0,60).map(d=>({id:d.id,slot:Number.isInteger(d.slot)?d.slot:0}));
 const lake=snap.lake||{};
 visual.lake={
  fish:Array.isArray(lake.fish)?lake.fish.slice(0,10):[],
  decorations:(lake.decorations||[]).filter(d=>DECORATIONS[d.id]).slice(0,12).map(d=>({id:d.id,slot:Number.isInteger(d.slot)?d.slot:0})),
  bridges:(lake.bridges||[]).filter(d=>WOODWORK_RECIPES[d.id]).slice(0,4).map(d=>({id:d.id,slot:Number.isInteger(d.slot)?d.slot:0}))
 };
 const grill=typeof snap.grill==='object'&&snap.grill?snap.grill:{owned:!!snap.grill};
 visual.grill={...visual.grill,owned:!!grill.owned,assembled:!!grill.assembled,queue:grill.queueActive?[{readyAt:now+60000}]:[]};
 visual.kitchen={...visual.kitchen,queue:snap.kitchen?.queueActive?[{readyAt:now+60000}]:[]};
 return visual;
}
function renderFriendFarmScene(snap){
 if(Number(snap?.version)<2)return '<div class="friend-snapshot-outdated"><b>Atualizando a propriedade...</b><p>O proprietário precisa entrar no jogo com a versão atual para publicar os dados visuais completos da fazenda. Assim que o resumo for atualizado, as três áreas aparecerão aqui.</p></div>';
 const originalState=state,originalLastSelected=lastSelected,originalSelected=selectedPlotIndices,originalMulti=multiSelectMode,originalScene=activeScene;
 let markup='';
 try{
  state=buildFriendVisualState(snap);
  activeScene=friendVisitedScene;
  lastSelected=Number.isInteger(selectedFriendPlot)?selectedFriendPlot:-1;
  selectedPlotIndices=new Set();multiSelectMode=false;
  updateSceneLandscapeVisibility();renderWeatherRain();
  renderPlots();renderAnimals(false);renderFarmAddons(true);
  const source=$('world');
  if(!source)return '<p>Não foi possível montar a visualização da propriedade.</p>';
  const clone=source.cloneNode(true);clone.removeAttribute('id');
  clone.querySelectorAll('[data-plot-index]').forEach(node=>{
   node.setAttribute('data-help-plot',node.getAttribute('data-plot-index'));
   node.setAttribute('role','button');node.setAttribute('tabindex','0');
  });
  const idMap=new Map();
  clone.querySelectorAll('[id]').forEach(node=>{const old=node.getAttribute('id'),next='friend-'+old;idMap.set(old,next);node.setAttribute('id',next)});
  clone.querySelectorAll('*').forEach(node=>Array.from(node.attributes).forEach(attr=>{
   let value=attr.value;
   value=value.replace(/url\(#([^)]+)\)/g,(match,id)=>'url(#'+(idMap.get(id)||('friend-'+id))+')');
   if((attr.name==='href'||attr.name==='xlink:href')&&value.startsWith('#'))value='#'+(idMap.get(value.slice(1))||('friend-'+value.slice(1)));
   if(value!==attr.value)node.setAttribute(attr.name,value);
  }));
  const bounds=SCENE_BOUNDS[friendVisitedScene]||SCENE_BOUNDS.farm;
  const viewBox=[bounds.left,bounds.top,bounds.right-bounds.left,bounds.bottom-bounds.top].join(' ');
  markup='<svg id="friend-farm-world" class="friend-farm-scene" data-farm-theme="'+safe(snap.farmTheme||'classic')+'" viewBox="'+viewBox+'" preserveAspectRatio="xMidYMid meet" role="group" aria-label="Propriedade de '+safe(visitedFarm?.farm_name||'amigo')+' · '+safe(bounds.label)+'" xmlns="http://www.w3.org/2000/svg">'+clone.innerHTML+'</svg>';
 }finally{
  state=originalState;lastSelected=originalLastSelected;selectedPlotIndices=originalSelected;multiSelectMode=originalMulti;activeScene=originalScene;
  updateSceneLandscapeVisibility();renderWeatherRain();
  if(originalState){renderPlots();renderAnimals();renderFarmAddons()}
 }
 return markup;
}
async function performFriendFarmAction(area,slot,action,cropId=null){
 if(!visitedFarm?.friendId)return notify('Abra primeiro a fazenda de um amigo.');if(!farmWriteAllowed())return;
 if(hasPendingCloudChanges())return notify('Aguarde a sincronização da sua fazenda antes de ajudar um amigo.');
 try{
  const response=await socialRpc('social_help_friend_action',{p_owner:visitedFarm.friendId,p_area:area,p_slot:slot,p_action:action,p_crop_id:cropId,p_timezone:visitorTimezone()}),row=Array.isArray(response)?response[0]:response;
  if(!row?.state||!row?.revision)throw new Error('O servidor não confirmou a ação.');
  const restored=normalizeFarmSnapshot(row.state);if(!restored||!validateFarmSnapshot(restored))throw new Error('O salvamento atualizado não passou pela verificação de integridade.');
  state=restored;cloudRevision=Number(row.revision)||cloudRevision+1;cloudUpdatedAt=row.updated_at||new Date().toISOString();dirty=false;cloudDirty=false;cloudRetryContext=null;clearTimeout(saveTimer);saveTimer=null;
  const friendId=visitedFarm.friendId,farm=await socialRpc('social_visit_friend_farm',{p_friend:friendId}),quota=await socialRpc('social_help_friend_status',{p_owner:friendId,p_timezone:visitorTimezone()}),status=Array.isArray(quota)?quota[0]:quota;
  visitedFarm={...farm,friendId,helpUsed:Number(status?.used)||Number(row.daily_used)||0,helpLimit:Number(status?.limit)||15};selectedFriendPlot=area==='farm'?slot:null;friendSelectedArea=area;friendSelectedAreaSlot=area==='farm'?null:slot;
  refresh();if(currentModal==='friend-farm')renderModal();
  const xp=Number(row.xp_awarded)||0,green=Number(row.green_coin_awarded)||0;
  const labels={harvest:'Colheita enviada ao depósito do proprietário.',water:'Plantação regada.',pest:'Pragas removidas.',weed:'Ervas daninhas removidas.',plow:'Solo preparado para o plantio.',plant:'Semente plantada na fazenda do amigo.',orchard_harvest:'Colheita do Pomar enviada ao depósito do proprietário.',forest_harvest:'Produção da Mata enviada ao estoque do proprietário.'};
  notify((labels[action]||'Ajuda concluída')+' +'+xp+' XP'+(green?' · +'+green+' 🟢':' · sem moedas verdes nesta ajuda'));
 }catch(error){notify(error.message||'Não foi possível concluir a ajuda.')}
}
function friendAreaProgress(area,item){
 if(!item?.type)return 0;
 if(item.status==='ready')return 1;
 const base=Math.max(0,Math.min(1,Number(item.progress)||0)),cfg=area==='orchard'?CROPS[item.type]:FOREST_TREES[item.type];
 if(!cfg)return base;
 const hours=area==='orchard'?cropHours(item.type,!!item.regrowing):cfg.hours*FOREST_TIME_FACTOR;
 if(typeof item.plantedAt==='number'&&Number.isFinite(item.plantedAt))return Math.max(0,Math.min(1,(Date.now()-item.plantedAt)/(Math.max(1,hours)*HOUR)));
 const updated=Date.parse(visitedFarm?.updated_at||'');
 if(!Number.isFinite(updated)||updated<=0)return base;
 return Math.max(0,Math.min(1,base+Math.max(0,Date.now()-updated)/(Math.max(1,hours)*HOUR)));
}
function renderVisitedFarm(){
 if(!visitedFarm)return '<p>Nenhuma fazenda selecionada.</p>';
 const snap=visitedFarm.snapshot||{},theme=FARM_THEMES[snap.farmTheme]?.name||'Fazenda clássica',plots=snap.plots||[];
 const pcount=plots.filter(p=>p.status!=='grass').length,readyCount=plots.filter(p=>p.status==='growing'&&friendPlotProgress(p)>=1).length,likeCount=Math.max(0,Number(visitedFarm.like_count)||0),liked=!!visitedFarm.liked_by_me;
 const used=Math.max(0,Number(visitedFarm.helpUsed)||0),limit=15,plot=Number.isInteger(selectedFriendPlot)?plots[selectedFriendPlot]:null,crop=plot?.crop?CROPS[plot.crop]:null,ready=!!plot&&plot.status==='growing'&&friendPlotProgress(plot)>=1;
 const VISIT_CROP_IDS=['pilea_involucrata','rosa_amarela','girassol'];
 const availableSeeds=VISIT_CROP_IDS.filter(id=>(Number(state.inventory?.[id])||0)>0&&cropLevelAllowed(CROPS[id]));
 if(!availableSeeds.includes(friendSelectedCropId))friendSelectedCropId=availableSeeds[0]||'';
 const seedOptions=availableSeeds.map(id=>'<option value="'+id+'" '+(friendSelectedCropId===id?'selected':'')+'>'+safe(CROPS[id].name)+' · '+fmt(state.inventory[id]||0)+'</option>').join('');
 const orchardCards=(snap.orchard||[]).map((t,i)=>{if(!t?.type||!CROPS[t.type])return '';const c=CROPS[t.type],p=friendAreaProgress('orchard',t),r=t.status==='ready'||p>=1;return '<div class="friend-area-card"><span class="symbol">'+cropIconMarkup(t.type)+'</span><strong>'+safe(c.name)+'</strong><small>Árvore '+(i+1)+' · '+(r?'Pronta para colher':Math.round(p*100)+'% de crescimento')+(t.harvestsRemaining?' · '+t.harvestsRemaining+' colheita(s) restante(s)':'')+'</small><button class="modal-action '+(r?'':'alt')+'" data-friend-area-harvest="orchard" data-friend-area-slot="'+i+'" '+(r?'':'disabled')+'>🍎 Colher</button></div>'}).join('');
 const forestCards=(snap.forest||[]).map((t,i)=>{if(!t?.type||!FOREST_TREES[t.type])return '';const c=FOREST_TREES[t.type],p=friendAreaProgress('forest',t),r=t.status==='ready'||p>=1;return '<div class="friend-area-card"><span class="symbol">'+(c.icon||'🌳')+'</span><strong>'+safe(c.name)+'</strong><small>Árvore '+(i+1)+' · '+(r?'Pronta para colher':Math.round(p*100)+'% de crescimento')+'</small><button class="modal-action '+(r?'':'alt')+'" data-friend-area-harvest="forest" data-friend-area-slot="'+i+'" '+(r?'':'disabled')+'>🌳 Colher</button></div>'}).join('');
 let plotActions='<small>Selecione um canteiro para usar as ferramentas.</small>';
 if(plot){const actions=[];if(plot.status==='spent')actions.push('<button class="modal-action" data-friend-action="plow">🪏 Preparar solo</button>');if(plot.status==='dirt')actions.push('<button class="modal-action" data-friend-action="plant" '+(friendSelectedCropId?'':'disabled')+'>🌱 Plantar semente</button>');if(plot.status==='growing'){if(ready)actions.push('<button class="modal-action" data-friend-action="harvest">🌾 Colher</button>');actions.push('<button class="modal-action" data-friend-action="water">💧 Regar</button>');if(plot.pest)actions.push('<button class="modal-action" data-friend-action="pest">🐛 Remover pragas</button>');if(plot.weed)actions.push('<button class="modal-action" data-friend-action="weed">🌿 Remover ervas daninhas</button>')}plotActions=actions.length?actions.join(''):'<small>Não há ação disponível neste canteiro.</small>'}
 const toolbar='<div class="friend-farm-toolbar"><div class="friend-farm-tools"><button class="modal-action alt compact" data-friend-action="plow" '+(plot?.status==='spent'?'':'disabled')+'>🪏 Arar</button><button class="modal-action alt compact" data-friend-action="plant" '+(plot?.status==='dirt'&&friendSelectedCropId?'':'disabled')+'>🌱 Plantar</button><button class="modal-action alt compact" data-friend-action="water" '+(plot?.status==='growing'?'':'disabled')+'>💧 Regar</button><button class="modal-action alt compact" data-friend-action="harvest" '+(ready?'':'disabled')+'>🌾 Colher</button><button class="modal-action alt compact" data-friend-action="weed" '+(plot?.status==='growing'&&plot.weed?'':'disabled')+'>🌿 Ervas</button><button class="modal-action alt compact" data-friend-action="pest" '+(plot?.status==='growing'&&plot.pest?'':'disabled')+'>🐛 Pragas</button></div><label for="friend-seed-select">Semente do visitante</label><select id="friend-seed-select" class="modal-select" '+(availableSeeds.length?'':'disabled')+'><option value="">'+(availableSeeds.length?'Escolha uma semente':'Nenhuma semente no inventário')+'</option>'+seedOptions+'</select><button class="modal-action alt compact" data-open="shop">🛒 Loja</button></div>';
 const sceneNav=Number(snap.version)>=2?'<div class="friend-scene-nav">'+[['farm','Fazenda'],['river','Rio'],['nature','Pomar / Mata']].map(([id,label])=>'<button type="button" class="modal-action '+(friendVisitedScene===id?'':'alt')+(friendVisitedScene===id?' is-active':'')+'" data-friend-scene="'+id+'" aria-pressed="'+(friendVisitedScene===id?'true':'false')+'">'+label+'</button>').join('')+'</div>':'';
 const areas='<h3>🌳 Pomar do amigo</h3><div class="friend-area-grid">'+(orchardCards||'<p class="historical-note">Nenhuma árvore plantada no Pomar.</p>')+'</div><h3>🌲 Mata do amigo</h3><div class="friend-area-grid">'+(forestCards||'<p class="historical-note">Nenhuma árvore plantada na Mata.</p>')+'</div>';
 return '<div class="gift-summary"><span class="symbol">🌾</span><div><b>'+safe(visitedFarm.farm_name||'Fazenda do amigo')+'</b><small>Nível '+fmt(visitedFarm.level||1)+' · Popularidade '+fmt(visitedFarm.popularity||0)+' · Tema: '+safe(theme)+'</small></div></div><div class="actions"><button class="modal-action alt" data-open="friends">← Voltar aos amigos</button><button class="modal-action alt" data-conversation="'+safe(visitedFarm.friendId)+'">Conversar</button><button class="modal-action" data-farm-like="true">'+(liked?'♥ Curtida registrada':'♡ Curtir fazenda')+' · '+fmt(likeCount)+'</button></div><div class="friend-help-quota"><b>🟢 Ajudas realizadas hoje: '+used+'/'+limit+'</b><span>Ajuda ilimitada · moedas verdes nas primeiras 15 ações do dia; depois, apenas XP básico. O contador reinicia à meia-noite do seu fuso horário.</span></div><h3>🌎 '+(Number(snap.version)>=2?'Propriedade completa':'Visita à propriedade')+' · '+pcount+'/72 canteiros · '+readyCount+' prontos</h3>'+toolbar+sceneNav+renderFriendFarmScene(snap)+'<div class="friend-help-selected"><b>'+(plot?'Canteiro '+(selectedFriendPlot+1)+' · '+safe(crop?.name||(plot.status==='spent'?'Solo usado':plot.status==='dirt'?'Solo preparado':'Plantação')):'Ferramentas da fazenda')+'</b><div class="actions">'+plotActions+'</div></div>'+areas+'<p class="historical-note">As colheitas e produções são enviadas diretamente ao depósito/estoque do proprietário. As sementes usadas no plantio são consumidas do seu inventário. Você recebe XP e, nas primeiras 15 ajudas do dia, 1 moeda verde por ação; o proprietário recebe XP básico.</p>';
}
function renderOnlineInbox(){
 const friendName=id=>onlineFriends.find(f=>f.user_id===id)?.farm_name||'Amigo';
 const notificationText=n=>{const actor=onlineFriends.find(f=>f.user_id===n.actor_id)?.farm_name||'Jogador';const labels={friend_request:'Solicitação de amizade',friend_accepted:'Amizade confirmada',message:'Nova mensagem',gift:'Presente recebido',help:'Ajuda na fazenda',farm_visit:'Visita à fazenda',farm_like:'Curtida na fazenda'};return '<div class="list-line"><span><b>🔔 '+safe(labels[n.kind]||'Notificação')+' · '+safe(actor)+'</b><br><small>'+safe(n.payload?.message||'Você recebeu uma atualização social.')+'<br>'+new Date(n.created_at).toLocaleString('pt-BR')+'</small></span><button class="modal-action alt compact" data-notification-read="'+safe(n.id)+'" '+(n.read_at?'disabled':'')+'>'+(n.read_at?'Lida':'Marcar lida')+'</button></div>'};
 const friendButtons=onlineFriends.length?onlineFriends.map(f=>'<button class="modal-action '+(activeConversationId===f.user_id?'':'alt')+' compact" data-conversation="'+safe(f.user_id)+'">'+safe(f.farm_name)+'</button>').join(''):'<p>Adicione amigos para trocar mensagens.</p>';
 const messages=onlineMessages.length?onlineMessages.slice().reverse().map(m=>'<div class="list-line"><span><b>'+(m.sender_id===cloudUser.id?'Você':safe(friendName(m.sender_id)))+'</b><br>'+safe(m.body)+'<br><small>'+new Date(m.created_at).toLocaleString('pt-BR')+'</small></span></div>').join(''):'<p>Nenhuma mensagem nesta conversa. Envie a primeira!</p>';
 const active=activeConversationId?'<h3>💬 Conversa com '+safe(friendName(activeConversationId))+'</h3><div class="social-messages">'+messages+'</div><textarea id="online-message-input" maxlength="500" rows="3" placeholder="Escreva sua mensagem (até 500 caracteres)"></textarea><button class="modal-action" data-send-online-message="true">Enviar mensagem</button>':'<p>Selecione um amigo acima para abrir a conversa.</p>';
 const unreadCount=onlineNotifications.filter(n=>!n.read_at).length;
 return '<div class="actions"><button class="modal-action alt" data-social-inbox-refresh="true">Atualizar caixa</button><button class="modal-action alt" data-mark-all-notifications="true" '+(unreadCount?'':'disabled')+'>Marcar todas como lidas ('+unreadCount+')</button><button class="modal-action alt" data-open="friends">Meus amigos</button></div><h3>👥 Conversas</h3><div class="actions">'+friendButtons+'</div>'+active+'<h3>🔔 Notificações ('+onlineNotifications.filter(n=>!n.read_at).length+' não lida(s))</h3>'+(onlineNotifications.length?onlineNotifications.map(notificationText).join(''):'<p>Nenhuma notificação.</p>');
}

function exportFriendCard(){downloadSocialPackage({kind:'friend',friend:{id:socialId(),farmName:state.farmName,level:farmLevel(),popularity:state.popularity||0,exportedAt:Date.now()}},'ColheitaFeliz2-amigo.json');notify('Cartão de fazendeiro exportado para compartilhar.')}
function exportSocialMessage(){if(!farmWriteAllowed())return;const recipient=prompt('Nome do destinatário (como aparece no cartão de fazendeiro):');if(!recipient)return;const message=prompt('Escreva sua mensagem (até 500 caracteres):');if(!message)return;const text=String(message).trim().slice(0,500);if(!text)return;downloadSocialPackage({kind:'message',message:{id:socialId(),from:state.farmName,to:String(recipient).slice(0,40),text,createdAt:Date.now()}},'ColheitaFeliz2-mensagem.json');state.social.sent.unshift({id:socialId(),to:String(recipient).slice(0,40),text,createdAt:Date.now(),kind:'message'});state.social.sent=state.social.sent.slice(0,200);markDirty();notify('Mensagem exportada. Envie o arquivo ao destinatário.')}
function exportBouquetGift(id){if(!farmWriteAllowed())return;const b=BOUQUETS[id];if(!b||(state.bouquets[id]||0)<1)return notify('Você não possui esse buquê.');if(!confirm(`Preparar um pacote de presente com ${b.name}? O buquê será consumido agora, ao criar o arquivo de presente. Deseja continuar?`))return;downloadSocialPackage({kind:'bouquet',gift:{id:socialId(),bouquet:id,name:b.name,from:state.farmName,createdAt:Date.now()}},'ColheitaFeliz2-presente.json');state.bouquets[id]--;state.social.sent.unshift({id:socialId(),to:'Arquivo de troca',text:`Presente preparado: ${b.name}`,createdAt:Date.now(),kind:'bouquet'});state.social.sent=state.social.sent.slice(0,200);remember(`Preparou ${b.name} para troca social por arquivo.`);markDirty();refresh();notify('Pacote de presente criado e buquê consumido.')}
async function importSocialPackage(file){if(!farmWriteAllowed())return;if(!file||file.size>256*1024)return notify('Arquivo social inválido ou muito grande.');try{const p=JSON.parse(await file.text());if(p.app!=='ColheitaFeliz2'||p.type!=='cf2-social-exchange'||p.version!==1)throw Error('formato');const s=state.social||(state.social={friends:[],inbox:[],sent:[]});if(p.kind==='friend'){const f=p.friend;if(!f||typeof f.id!=='string'||typeof f.farmName!=='string'||f.farmName.length>40||f.id.length>100)throw Error('amigo');if(f.id===state.socialProfileId||s.friends.some(x=>x.id===f.id))return notify('Este fazendeiro já está na sua lista.');s.friends.unshift({id:f.id,farmName:f.farmName,level:Math.max(1,Math.min(999,Number(f.level)||1)),popularity:Math.max(0,Math.min(1e9,Number(f.popularity)||0)),addedAt:Date.now()});s.friends=s.friends.slice(0,100);s.inbox.unshift({id:socialId(),from:f.farmName,text:'Cartão de fazendeiro adicionado à sua lista de amigos.',createdAt:Date.now(),read:false,kind:'system'});notify(`${f.farmName} foi adicionado à lista de amigos.`)}else if(p.kind==='message'){const m=p.message;if(!m||typeof m.id!=='string'||typeof m.from!=='string'||typeof m.text!=='string'||m.text.length>500||m.text.length===0)throw Error('mensagem');if(s.inbox.some(x=>x.id===m.id))return notify('Esta mensagem já foi recebida.');if(m.to&&m.to.toLocaleLowerCase('pt-BR')!==state.farmName.toLocaleLowerCase('pt-BR'))return notify(`Esta mensagem foi endereçada a ${m.to}, não a esta fazenda.`);s.inbox.unshift({id:m.id,from:m.from.slice(0,40),text:m.text,createdAt:Number(m.createdAt)||Date.now(),read:false,kind:'message'});notify(`Mensagem recebida de ${m.from}.`)}else if(p.kind==='bouquet'){const g=p.gift;if(!g||typeof g.id!=='string'||!BOUQUETS[g.bouquet])throw Error('presente');if(s.inbox.some(x=>x.id===g.id))return notify('Este presente já foi recebido.');state.bouquets[g.bouquet]=(state.bouquets[g.bouquet]||0)+1;state.popularity+=(BOUQUETS[g.bouquet].popularity||0);s.inbox.unshift({id:g.id,from:String(g.from||'Fazendeiro').slice(0,40),text:`Você recebeu ${BOUQUETS[g.bouquet].name}.`,createdAt:Number(g.createdAt)||Date.now(),read:false,kind:'gift'});notify(`Presente recebido: ${BOUQUETS[g.bouquet].name}!`)}else throw Error('tipo');s.inbox=s.inbox.slice(0,200);markDirty();refresh();if(currentModal)renderModal()}catch(e){notify('Não foi possível importar: arquivo incompatível, duplicado ou inválido.')}}
function renderInbox(){const rows=state.social.inbox||[];return rows.length?rows.map(m=>`<div class="list-line"><span><b>${m.kind==='gift'?'🎁':m.kind==='message'?'✉️':'📬'} ${safe(m.from||'Sistema')}</b><br/>${safe(m.text)}<br/><small>${new Date(m.createdAt||Date.now()).toLocaleString('pt-BR')}</small></span><button class="modal-action alt compact" data-read-message="${safe(m.id)}" ${m.read?'disabled':''}>${m.read?'Lida':'Marcar lida'}</button></div>`).join(''):'<div class="offline-feature"><span>📭</span><b>Sua caixa de entrada está vazia</b><p>Importe um arquivo de mensagem, cartão de amigo ou presente para receber correspondências de outros jogadores.</p></div>'}
function renderHistory(){return state.history.length?`<div class="history-list">${state.history.slice(0,25).map(h=>`<div class="history-entry"><span>🌾 ${safe(h.message)}</span><small>${new Date(h.time).toLocaleString('pt-BR')}</small></div>`).join('')}</div>`:'<p>Seu assistente ainda não registrou atividades. Plante, colha e cuide da fazenda para começar o histórico.</p>'}
function feedAllHungryAnimals(){if(!farmWriteAllowed())return;const candidates=state.animals.filter(animal=>{const cfg=ANIMALS[animal.type];if(!cfg||cfg.role==='horse')return false;if(animal.type==='cachorro')return animal.status!=='guarding';if(isDualPurposeAnimal(animal.type))return !['producing','ready'].includes(animal.productionStatus||'hungry');return animal.status==='hungry'});if(!candidates.length)return notify('Não há animais precisando de alimentação.');const keys=[...new Set(candidates.map(animal=>ANIMALS[animal.type].feedKey).filter(Boolean).concat(['feed_producers','feed_growers']))],before=keys.reduce((sum,key)=>sum+(state.inventory[key]||0),0);for(const animal of candidates)feedAnimal(animal.id);const after=keys.reduce((sum,key)=>sum+(state.inventory[key]||0),0),fed=Math.max(0,before-after);notify(fed?fed+' alimentação(ões) realizada(s) em lote.':'Nenhum animal pôde ser alimentado; confira o estoque de ração.')}
function renderAnimalCard(a){
 const cfg=ANIMALS[a.type],feedCount=state.inventory[cfg.feedKey]||0,feedSymbol=cfg.feedCurrency==='greenCoins'?'🟢':'🟡';let status='',action='';
 if(cfg.role==='horse'){
  const stage=Math.max(1,a.stage||1);
  status=a.status==='adult'?'Adulto · pronto para venda':a.status==='growing'?'Crescendo · etapa '+stage+'/5 · '+formatHours(animalRemaining(a))+' restantes':'Etapa '+stage+'/5 · pronto para receber ração';
  action=a.status==='adult'?'<span class="animal-state ready">🌟 Fase adulta</span>':a.status==='growing'?'<span class="animal-state">⏳ Crescimento em andamento</span>':'<button class="modal-action" data-feed-animal="'+safe(a.id)+'">Alimentar para crescer · '+Math.min(5,stage+1)+'/5</button>';
 }else if(a.type==='cachorro'){status=a.status==='guarding'?'Proteção preparada · '+formatHours(animalRemaining(a))+' restantes':'Está com fome e precisa de alimento.';action=a.status==='guarding'?'<span class="animal-state ready">🛡 Proteção preparada</span>':'<button class="modal-action" data-feed-animal="'+safe(a.id)+'">Alimentar cão</button>';}
 else if(isDualPurposeAnimal(a.type)){const level=Math.max(1,a.level||1),ps=a.productionStatus||'hungry',gs=a.growthStatus||(level>=10?'adult':'hungry');status='Nível '+level+'/10 · '+(ps==='producing'?'Produzindo '+cfg.productName.toLowerCase()+' · '+formatHours(animalRemaining(a,'production')):ps==='ready'?'Produção pronta para recolher':'Produção disponível')+' · '+(gs==='growing'?'Crescendo · '+formatHours(animalRemaining(a,'growth')):gs==='adult'?'Crescimento máximo atingido':'Pode crescer');action=ps==='ready'?'<button class="modal-action" data-collect-animal="'+safe(a.id)+'">Recolher '+cfg.productName.toLowerCase()+' · '+(cfg.yield+(ANIMAL_RATIONS[a.type]?level-1:0))+'</button>':ps==='producing'?'<span class="animal-state">⏳ Produção em andamento</span>':'<button class="modal-action" data-feed-animal="'+safe(a.id)+'" data-feed-mode="produce">Alimentar para produzir</button>';action+=gs==='adult'?'<span class="animal-state ready">🌟 Nível máximo 10</span>':gs==='growing'?'<span class="animal-state">⏳ Crescimento em andamento</span>':'<button class="modal-action alt" data-feed-animal="'+safe(a.id)+'" data-feed-mode="grow">Alimentar para crescer · '+(level+1)+'/10</button>';}
 else if(cfg.role==='producer'){status=a.status==='producing'?'Produzindo · '+formatHours(animalRemaining(a))+' restantes':a.status==='ready'?'Produção pronta para recolher.':'Com fome · precisa ser alimentado para produzir.';action=a.status==='ready'?'<button class="modal-action" data-collect-animal="'+safe(a.id)+'">Recolher '+cfg.productName.toLowerCase()+'</button>':a.status==='hungry'?'<button class="modal-action" data-feed-animal="'+safe(a.id)+'">Alimentar</button>':'<span class="animal-state">⏳ Em produção</span>';}
 else{status=a.status==='adult'?'Adulto · pronto para venda':a.status==='growing'?'Crescendo · etapa '+a.stage+'/5 · '+formatHours(animalRemaining(a))+' restantes':'Crescimento '+a.stage+'/5 · precisa ser alimentado.';action=a.status==='adult'?'<span class="animal-state ready">🌟 Fase adulta</span>':a.status==='hungry'?'<button class="modal-action" data-feed-animal="'+safe(a.id)+'">Alimentar e crescer</button>':'<span class="animal-state">⏳ Crescimento em andamento</span>';}
 const progress=cfg.role==='horse'?(a.status==='growing'?'<small>Progresso do crescimento</small><div class="animal-progress"><i style="width:'+Math.round(animalProgress(a)*100)+'%"></i></div>':''):isDualPurposeAnimal(a.type)?(a.productionStatus==='producing'?'<small>Progresso da produção</small><div class="animal-progress"><i style="width:'+Math.round(animalProgress(a,'production')*100)+'%"></i></div>':'')+(a.growthStatus==='growing'?'<small>Progresso do crescimento</small><div class="animal-progress"><i style="width:'+Math.round(animalProgress(a,'growth')*100)+'%"></i></div>':''):['producing','growing'].includes(a.status)?'<div class="animal-progress"><i style="width:'+Math.round(animalProgress(a)*100)+'%"></i></div>':'';
 const sell=a.type!=='cachorro'?'<button class="modal-action alt compact" data-sell-animal="'+safe(a.id)+'">Vender por 🟡 '+fmt(cfg.sellPrice&&a.status==='adult'?cfg.sellPrice+(ANIMAL_RATIONS[a.type]?Math.max(0,(a.level||1)-1)*250:0):Math.floor(cfg.price*.45))+'</button>':'';
 const source=ANIMAL_MEAT_SOURCE[a.type],meatYield=source?source.yield+Math.max(0,(a.level||1)-1):0,canButcher=source&&a.growthStatus==='adult'&&a.level>=10&&a.productionStatus!=='producing'&&a.productionStatus!=='ready';const butcher=canButcher?'<button class="modal-action danger compact" data-butcher-animal="'+safe(a.id)+'">Abater · '+meatYield+' '+MEAT_PRODUCTS[source.meat].name+'</button>':'';
 const ration=ANIMAL_RATIONS[a.type],levelLine=cfg.role==='horse'?'<small>Raça: '+safe(cfg.name)+' · etapa '+(a.stage||1)+'/5</small>':isDualPurposeAnimal(a.type)?'<small>Nível '+(a.level||1)+'/10 · rendimento de produção: '+(cfg.yield+(ANIMAL_RATIONS[a.type]?(a.level||1)-1:0))+' · carne no abate: '+meatYield+'</small>':ration?'<small>Nível '+(a.level||1)+'/10</small>':'';
 const rationActions=ration?'<button class="modal-action alt compact" data-upgrade-animal="'+safe(a.id)+'" '+((a.level||1)>=10||!state.inventory[ration.key]||['producing','growing','ready'].includes(a.status)||a.productionStatus==='producing'||a.productionStatus==='ready'||a.growthStatus==='growing'?'disabled':'')+'>Aplicar ração de melhoria ('+fmt(state.inventory[ration.key]||0)+')</button>':'';
 const breedLine=a.type==='cachorro'?'<small>Raça: '+safe(DOG_BREEDS[a.breed]?.name||'Cachorro clássico')+'</small>':'';
 const icon=cfg.role==='horse'?'<img class="horse-card-preview horse-breed-'+a.type+'" src="'+HORSE_ASSETS.horse+'" alt="Cavalo '+safe(cfg.name)+'">':cfg.icon;
 const feedLine=cfg.role==='horse'?'Ração para cavalos: '+fmt(feedCount)+' em estoque':cfg.feedName+': '+fmt(feedCount)+' em estoque · genérico produção: '+fmt(state.inventory.feed_producers||0)+' · genérico crescimento: '+fmt(state.inventory.feed_growers||0);
 return '<article class="animal-card"><div class="animal-card-icon">'+icon+'</div><div class="animal-card-main"><b>'+safe(a.name||cfg.name)+'</b>'+breedLine+'<small>'+status+'</small>'+(cfg.estimateNote?'<small class="data-origin estimated">Parâmetros estimados: '+safe(cfg.estimateNote)+'</small>':'')+progress+levelLine+'<small>'+feedLine+'</small><div class="animal-card-actions">'+action+'<button class="modal-action alt compact" data-buy-feed="'+a.type+'">Comprar alimento · '+feedSymbol+' '+fmt(cfg.feedPrice)+'</button>'+rationActions+sell+butcher+'</div></div></article>';
}
function renderDynamicHelp(){
 const entries=new Map(),fallback={haras:'Haras',kitchen:'Cozinha', 'herb-mix':'Mix de Ervas',carpentry:'Marcenaria',grill:'Churrasqueira',lake:'Lago',pond:'Rio',orchard:'Pomar',sea:'Mar',help:'Ajuda',account:'Conta e sincronização',settings:'Configurações',profile:'Perfil do fazendeiro',mood:'Humor',catalog:'Catálogo',tasks:'Missões e conquistas',inventory:'Meus itens',warehouse:'Meu depósito',factory:'Fábrica de buquês',animals:'Animais',areas:'Expansões',shop:'Loja',friends:'Amigos',inbox:'Caixa de entrada',assistant:'Assistente',gifts:'Casa de presentes',daily:'Recompensa diária','free-gifts':'Presentes grátis',decor:'Decoração','mobile-nav':'Personalizar barra inferior'};
 document.querySelectorAll('[data-modal]').forEach(button=>{const key=button.dataset.modal,label=button.textContent.replace(/\s+/g,' ').trim().replace(/\s*\d+$/,'').trim();if(!key||!/[\p{L}\p{N}]/u.test(label))return;const current=entries.get(key);if(label&&(!current||label.length>current.length))entries.set(key,label)});
 const features=[...entries].map(([key,label])=>({key,label:/[A-Za-z]{3,}/.test(label)&&label.length<3?fallback[key]||label:label||fallback[key]||'Outra função'})).map(x=>x.label).filter(Boolean);
 const unique=[...new Set(features)].sort((a,b)=>a.localeCompare(b,'pt-BR'));
 const toolsMap={inspect:'Inspecionar',hoe:'Enxada · preparar terreno',seed:'Plantar sementes',water:'Regar',fertilizer:'Adubar',weed:'Remover ervas daninhas',pest:'Combater pragas',hand:'Colher'};
 const tools=[...document.querySelectorAll('.tool[data-tool]')].map(button=>{const id=button.dataset.tool;const label=button.getAttribute('aria-label')||button.title;return label&&label!==id?label:toolsMap[id]||'Ferramenta de campo'}).filter(Boolean);
 const featuresHtml=unique.map(label=>'<div class="help-feature-item"><span>•</span><b>'+safe(label)+'</b></div>').join('');
 return '<div class="gift-summary"><span class="symbol">❔</span><div><b>Central de ajuda</b><small>Veja um resumo das áreas e ferramentas disponíveis na fazenda.</small></div></div><details class="catalog-section" open><summary>🌱 Fazenda e plantio</summary><div class="catalog-items"><p>Compre sementes na Loja, selecione-as no inventário e clique ou toque em um canteiro preparado. Aguarde o crescimento e use a mão para colher. A colheita rápida recolhe todas as plantas maduras; a seleção múltipla permite escolher canteiros específicos e colher apenas os selecionados. A escavação rápida limpa os canteiros colhidos.</p><p>Use os botões de zoom, a roda do mouse ou as teclas + e −. Arraste para movimentar a fazenda; em telas sensíveis ao toque, arraste com um dedo e use dois dedos para ajustar o zoom.</p></div></details><details class="catalog-section"><summary>🐾 Animais e criações</summary><div class="catalog-items"><p>Abra Animais para comprar, alimentar, acompanhar o crescimento e recolher produtos. Cada espécie possui alimento e ciclo próprios.</p></div></details><details class="catalog-section"><summary>🎣 Pesca no rio e em alto-mar</summary><div class="catalog-items"><p>Libere o Rio nas Expansões para pescar com varas. A pesca marítima é desbloqueada no nível 22 e utiliza redes. Os dois modos compartilham o nível de Pescador: Aprendiz, Amador, Apaiari, Dourado, Titã Marinho, Caçador Abissal, Corsário e Mestre Pescador. Caviar é uma captura marítima rara e rende três unidades por captura.</p></div></details><details class="catalog-section"><summary>🍲 Produção e especializações</summary><div class="catalog-items"><p>Cozinha, Churrasqueira e Mix de Ervas possuem filas de preparo. Inicie receitas com ingredientes, aguarde o tempo indicado e recolha os produtos. A Mata Brasileira permite cultivar árvores e ervas; a Marcenaria transforma madeira em móveis.</p></div></details><details class="catalog-section"><summary>📚 Catálogo, missões e conquistas</summary><div class="catalog-items"><p>O Catálogo registra descobertas e mostra o progresso das coleções. Missões diárias e semanais oferecem moedas e experiência. Conquistas permanentes podem liberar recompensas e títulos exclusivos.</p></div></details><details class="catalog-section"><summary>👥 Recursos sociais e conta</summary><div class="catalog-items"><p>Adicione amigos pelo código de jogador, envie mensagens e presentes, visite fazendas, curta propriedades e acompanhe notificações. A fazenda é salva exclusivamente na nuvem; entre na sua conta para jogar.</p></div></details><h3>🧭 Funções disponíveis no jogo</h3><div class="help-feature-list">'+featuresHtml+'</div><h3>🛠️ Ferramentas de campo</h3><div class="help-tool-list">'+tools.map(label=>'<span>'+safe(label)+'</span>').join('')+'</div><p class="historical-note">Esta relação é atualizada automaticamente conforme os menus disponíveis no jogo.</p>';
}
function renderModal(){if(modalHasFocusedEditor())return;ensureMissionState();syncLakeFish();syncAnimalCycles();state.grill=state.grill&&typeof state.grill==='object'?state.grill:{owned:false,assembled:false,parts:{},queue:[]};state.grill.parts=state.grill.parts&&typeof state.grill.parts==='object'?state.grill.parts:{};state.grill.queue=Array.isArray(state.grill.queue)?state.grill.queue:[];state.kitchen=state.kitchen&&typeof state.kitchen==='object'?state.kitchen:{queue:[]};state.kitchen.queue=Array.isArray(state.kitchen.queue)?state.kitchen.queue:[];state.herbMix=state.herbMix&&typeof state.herbMix==='object'?state.herbMix:{queue:[]};state.herbMix.queue=Array.isArray(state.herbMix.queue)?state.herbMix.queue.filter(j=>j&&MIX_HERB_RECIPES[j.recipe]&&typeof j.id==='string'&&Number.isFinite(j.startedAt)&&Number.isFinite(j.readyAt)&&j.readyAt>=j.startedAt).slice(-30):[];state.processedWarehouse=state.processedWarehouse&&typeof state.processedWarehouse==='object'?state.processedWarehouse:{};const body=$('modal-body'),modalScrollTop=body.scrollTop,accordionOpen=['shop','warehouse'].includes(currentModal)?[...body.querySelectorAll('.shop-section')].map(section=>section.querySelector('.shop-category-toggle')?.getAttribute('aria-expanded')==='true'):null,detailOpen=['herb-mix','kitchen'].includes(currentModal)?Object.fromEntries([...body.querySelectorAll('details[data-accordion-key]')].map(section=>[section.dataset.accordionKey,section.open])):null;let title='',html='';switch(currentModal){case 'catalog':title='Catálogo de descobertas';html=renderDiscoveryCatalog();break;
case 'shop':title='Loja da fazenda';const lockedPlot=nextLockedPlotIndex(),unlockCost=lockedPlot>=0?plotUnlockCost(lockedPlot):0,lockedCount=state.plots.filter((p,i)=>i>=24&&i<36&&p.status==='grass').length,newPlotCount=unlockedExpansionPlotCount(),soilCost=redSoilCost();html=`<h3>🌱 Sementes clássicas e históricas</h3><p>O catálogo reúne culturas da versão clássica, registros posteriores de 2010–2011 e sementes já incluídas nas versões anteriores. Todos os tempos exibidos respeitam a redução de 1/5.</p><div class="grid-cards historical-seed-grid">${BASIC_FIELD_CROP_IDS.map(id=>{const v=CROPS[id],available=cropAffordable(v);return `<div class="store-card" data-seed-card="${id}"><span class="symbol">${cropIconMarkup(id)}</span><strong>${v.name}</strong><small>Nível ${v.minLevel||1} · ${formatHours(cropHours(id))} até a colheita${v.regrowHours?`<br/>Rebrota: ${formatHours(cropHours(id,true))}`:''}<br/>Temporadas: ${v.seasons||1} · Rendimento: ${v.yield}<br/>Sementes: ${fmt(state.inventory[id]||0)}${cropBalanceNote(v)}</small><b>${cropPriceLabel(v)}</b><button data-buy="${id}" ${available?'':'disabled'}>Comprar semente</button></div>`}).join('')}</div><h3>🌼 Novas sementes de flores · Colheita Feliz 2</h3><p>Estas três culturas podem ser plantadas na sua fazenda e também durante a visita à fazenda de um amigo. Compre aqui; as sementes ficam no seu inventário pessoal e podem ser usadas para ajudar o amigo.</p><div class="grid-cards historical-seed-grid new-crop-seed-grid">${['pilea_involucrata','rosa_amarela','girassol'].map(id=>{const v=CROPS[id],available=cropAffordable(v);return '<div class="store-card" data-seed-card="'+id+'"><span class="symbol">'+cropIconMarkup(id)+'</span><strong>'+v.name+'</strong><small>Nível mínimo '+(v.minLevel||1)+'<br/>Crescimento: '+formatHours(cropHours(id))+'<br/>Rendimento: '+v.yield+' unidades<br/>Estoque pessoal: '+fmt(state.inventory[id]||0)+'</small><b>'+cropPriceLabel(v)+' moedas</b><button data-buy="'+id+'" '+(available?'':'disabled')+'>Comprar semente</button></div>'}).join('')}</div><h3>🌳 Mudas e sementes da Mata Brasileira · ${FOREST_TREE_IDS.length} espécies</h3><p>Plante árvores e ervas brasileiras em até 36 canteiros. As espécies exigem níveis progressivos; a colheita fornece madeira ou folhas destinadas ao Mix de Ervas.</p><div class="grid-cards historical-seed-grid">${FOREST_TREE_IDS.map(id=>{const t=FOREST_TREES[id],have=state.inventory['tree_'+id]||0,locked=farmLevel()<t.level;return `<div class="store-card"><span class="symbol">${forestIconMarkup(id)}</span><strong>${t.name}</strong><small>Nível ${t.level}${locked?' · Bloqueada':''}<br/>Crescimento: ${formatHours(t.hours*FOREST_TIME_FACTOR)}<br/>${t.fruitCrop?'Frutos: '+t.yield:t.herbYield?'Folhas para o Mix de Ervas':'Madeira: '+t.yield} · Estoque: ${have}</small><b>🟡 ${fmt(t.price)} moedas</b><button data-buy-tree="${id}" ${locked||state.coins<t.price?'disabled':''}>${t.herbYield?'Comprar semente':'Comprar muda'}</button></div>`}).join('')}</div><h3>💝 Arquivo do evento · Dia dos Namorados 2010</h3><p>O registro de maio de 2010 lista dez sementes temáticas. Sete foram retiradas numa atualização posterior; nesta réplica offline, o arquivo preserva todas. Os dados de cultivo são estimativas fictícias. As três que permaneceram no catálogo original eram compradas com moedas verdes.</p><div class="grid-cards historical-seed-grid event-seed-grid">${EVENT_CROP_IDS.map(id=>{const v=CROPS[id],available=cropAffordable(v),status=v.eventAvailable?'Permaneceu após a atualização':'Listada e retirada posteriormente';return `<div class="store-card event-seed-card" data-seed-card="${id}"><span class="symbol">${cropIconMarkup(id)}</span><strong>${v.name}</strong><small>${status}<br/>Nível ${v.minLevel||1} · ${formatHours(cropHours(id))} até colher · ${v.seasons||1} temporada(s)<br/>Rendimento: ${v.yield} · Em estoque: ${fmt(state.inventory[id]||0)}${cropBalanceNote(v)}</small><b>${cropPriceLabel(v)}</b><button data-buy="${id}" ${available?'':'disabled'}>Comprar semente</button></div>`}).join('')}</div><h3>🧙 Sementes avançadas · somente terra vermelha</h3><p>As doze culturas avançadas desta edição exigem o nível indicado e um canteiro transformado com a Varinha da Terra Vermelha. Quando os parâmetros históricos estavam incompletos, foram preenchidos com estimativas fictícias identificadas em cada cartão.</p><div class="grid-cards advanced-seed-grid">${ADVANCED_CROP_IDS.map(id=>{const v=CROPS[id],available=cropAffordable(v);return `<div class="store-card advanced-seed-card" data-seed-card="${id}"><span class="symbol">${cropIconMarkup(id)}</span><strong>${v.name}</strong><small>Nível ${v.minLevel} · ${formatHours(cropHours(id))} primeiro ciclo · ${v.seasons} colheitas<br/>Rebrota: ${formatHours(cropHours(id,true))}<br/>Rendimento: ${v.yield} · ${v.unitPrice} por unidade${cropBalanceNote(v)}<br/>Em estoque: ${fmt(state.inventory[id]||0)}</small><b>${cropPriceLabel(v)}</b><button data-buy="${id}" ${available?'':'disabled'}>Comprar semente avançada</button></div>`}).join('')}</div><h3>⭐ Cartão VIP histórico</h3><div class="store-card vip-card"><span class="symbol">🎟️</span><strong>Cartão VIP · 30 dias</strong><small>${vipActive()?`Ativo até ${new Date(state.vipUntil).toLocaleString('pt-BR')}. A compra renova a validade.`:'Desbloqueia temporariamente sementes e produtos VIP. As sementes VIP também mantêm o desbloqueio offline por nível como alternativa.'}<br/>Preço e duração recuperados da tabela histórica.</small><b>🟢 100 moedas verdes</b><button data-buy-vip-card="true" ${state.greenCoins<100?'disabled':''}>${vipActive()?'Renovar Cartão VIP':'Comprar Cartão VIP'}</button></div><h3>🪄 Ferramentas especiais de solo</h3><div class="grid-cards"><div class="store-card soil-tool-card"><span class="symbol">🪄</span><strong>Varinha da Terra Vermelha</strong><small>Uma única compra libera o uso reutilizável. Aplicar terra vermelha em qualquer canteiro é gratuito. Aplicações realizadas: ${state.redSoilApplications||0}.</small><b>🟢 2 moedas verdes ou 🟡 30.000 moedas amarelas</b><div class="actions"><button data-buy-soil-wand="red" data-wand-currency="green" ${state.greenCoins<2||(state.inventory.redSoilWand||0)>0?'disabled':''}>Comprar por 2 verdes</button><button class="modal-action alt" data-buy-soil-wand="red" data-wand-currency="coins" ${state.coins<30000||(state.inventory.redSoilWand||0)>0?'disabled':''}>Comprar por 30.000 amarelas</button></div></div><div class="store-card soil-tool-card restore"><span class="symbol">🪄</span><strong>Varinha de Restauração</strong><small>Restaura um canteiro vermelho para terra normal. Em estoque: ${fmt(state.inventory.restoreSoilWand||0)}. O custo da terra vermelha não é reembolsado.</small><b>🟡 3.000 moedas amarelas</b><button data-buy-soil-wand="restore" ${state.coins<3000?'disabled':''}>Comprar 1 varinha</button></div></div><h3>🪏 Expansão da plantação</h3><div class="land-expansion-card"><div><b>🌾 ${36-lockedCount} / 36 canteiros liberados</b><small>${lockedCount} canteiro(s) ainda bloqueado(s). A próxima expansão custa 🟡 ${fmt(unlockCost||0)}${lockedPlot>=30?' e exige nível 10':''}.</small></div><button class="modal-action" data-unlock-plot="true" ${lockedPlot<0||state.coins<unlockCost||farmLevel()<(lockedPlot>=30?10:1)?'disabled':''}>Liberar próximo canteiro</button></div><h3>🌾 Segunda plantação · 36 novos canteiros</h3><div class="land-expansion-card"><div><b>🌱 ${newPlotCount} / 36 canteiros liberados</b><small>${newPlotCount<36?'Um novo canteiro é liberado automaticamente a cada nível, começando no nível 50. Próximo desbloqueio: nível '+(50+newPlotCount)+'.':'Todos os 36 novos canteiros foram liberados!'} Não há custo em moedas para esta expansão.</small></div><button class="modal-action alt" data-focus-area="new-fields">Centralizar nova plantação</button></div><h3>🌼 Catálogo histórico de flores</h3><p>As flores recuperadas podem ser plantadas, colhidas, guardadas no depósito e vendidas. As quatro receitas de buquê já documentadas continuam na fábrica; não foram inventadas novas receitas.</p><div class="grid-cards">${FLOWER_IDS.map(id=>{const v=CROPS[id],available=cropAffordable(v);return `<div class="store-card flower-store-card" data-seed-card="${id}"><span class="symbol">${cropIconMarkup(id)}</span><strong>${v.name}</strong><small>${formatHours(cropHours(id))} até a colheita · Rendimento: ${v.yield}<br/>No depósito: ${fmt(state.flowerWarehouse[id]||0)}${cropBalanceNote(v)}</small><b>${cropPriceLabel(v)}</b><button data-buy="${id}" ${available?'':'disabled'}>Comprar sementes</button></div>`}).join('')}</div><h3>🐾 Alimentos históricos dos animais</h3><div class="grid-cards">${Object.entries(ANIMALS).filter(([id,a])=>a.role!=='horse').map(([id,a])=>{const wallet=a.feedCurrency==='greenCoins'?'greenCoins':'coins',label=a.feedCurrency==='greenCoins'?'🟢':'🟡';return `<div class="store-card"><span class="symbol">${a.icon}</span><strong>${a.feedName}</strong><small>Estoque: ${fmt(state.inventory[a.feedKey]||0)}${a.feedHistorical?'<br/><b class="data-origin historic">Preço histórico recuperado</b>':'<br/><b class="data-origin estimated">Preço local estimado</b>'}</small><b>${label} ${fmt(a.feedPrice)}</b><button data-buy-feed="${id}" ${state[wallet]<a.feedPrice?'disabled':''}>Comprar alimento</button></div>`}).join('')}</div><h3>🥣 Alimentos genéricos históricos</h3><p>Podem alimentar qualquer animal da categoria correspondente. Os ciclos respeitam a redução de 1/5.</p><div class="grid-cards"><div class="store-card"><span class="symbol">🌾</span><strong>Alimento para animais que crescem</strong><small>Alimenta animais em crescimento por 12 horas-base. Estoque: ${fmt(state.inventory.feed_growers||0)}.</small><b>🟡 80 moedas amarelas</b><button data-buy-generic-food="grower" ${state.coins<80?'disabled':''}>Comprar alimento</button></div><div class="store-card"><span class="symbol">🥣</span><strong>Alimento para animais que produzem</strong><small>Ativa produção por 8 horas-base. Estoque: ${fmt(state.inventory.feed_producers||0)}.</small><b>🟡 120 moedas amarelas</b><button data-buy-generic-food="producer" ${state.coins<120?'disabled':''}>Comprar alimento</button></div></div><h3>🃏 Rações para aumentar o nível dos animais</h3><p>As rações históricas aumentam o nível do animal e sua produção. Nesta réplica, o nível vai até 5; cada nível acrescenta uma unidade à produção de galinhas e vacas, ou à carne/valor de venda dos porcos. A fórmula é um balanceamento local, pois a progressão completa não foi recuperada.</p><div class="grid-cards">${Object.entries(ANIMAL_RATIONS).map(([type,r])=>`<div class="store-card"><span class="symbol">${ANIMALS[type].icon}</span><strong>${r.name}</strong><small>Em estoque: ${fmt(state.inventory[r.key]||0)} · melhora um animal por aplicação.</small><b>🟢 ${r.price} moeda(s) verde(s)</b><button data-buy-animal-ration="${type}" ${state.greenCoins<r.price?'disabled':''}>Comprar ração de melhoria</button></div>`).join('')}</div><h3>🧪 Fertilizantes históricos</h3><p>Os tempos de redução são aplicados em 1/5, seguindo a regra desta réplica. Preços sem comprovação documental estão identificados como estimativas.</p><div class="grid-cards">${Object.entries(FERTILIZERS).map(([id,v])=>{const wallet=v.currency==='greenCoins'?'greenCoins':'coins',balance=v.currency==='gift'?0:state[wallet],buyable=v.currency!=='gift',price=v.currency==='greenCoins'?`🟢 ${v.price} moeda(s) verde(s)`:v.currency==='coins'?`🟡 ${fmt(v.price)} moedas amarelas`:'Presente diário';return `<div class="store-card soil-tool-card"><span class="symbol">${v.icon}</span><strong>${v.name}</strong><small>${v.note}<br/>Estoque: ${fmt(state.inventory[id]||0)} · redução efetiva: ${formatHours(v.hours*CROP_TIME_FACTOR)}</small><b>${price}</b><button data-buy-fertilizer="${id}" ${!buyable||balance<v.price?'disabled':''}>${buyable?'Comprar 1':'Obtido em recompensa'}</button></div>`}).join('')}</div><h3>🥣 Ingredientes culinários</h3><p>Mel, temperos, fermento químico, folha de bananeira e azeite de dendê são insumos para as receitas da cozinha e da churrasqueira. O caviar é obtido na pesca marítima; a carne de peru está disponível no fornecedor local enquanto o sistema social permanece offline.</p><div class="grid-cards">${Object.entries(GRILL_SUPPLIES).filter(([id])=>id!=='caviar').map(([id,v])=>`<div class="store-card"><span class="symbol">${v.icon}</span><strong>${v.name}</strong><small>Estoque: ${fmt(state.inventory[id]||0)}</small><b>🟡 ${fmt(v.price)}</b><button data-buy-grill-ingredient="${id}" ${state.coins<v.price?'disabled':''}>Comprar 1</button></div>`).join('')}<div class="store-card"><span class="symbol">🦃</span><strong>Carne de peru</strong><small>Estoque: ${fmt(state.meatWarehouse.turkey||0)} · fornecedor local offline</small><b>🟡 650</b><button data-buy-turkey-meat="true" ${state.coins<650?'disabled':''}>Comprar 1</button></div></div><h3>🗺️ Novas áreas da propriedade</h3><div class="grid-cards">${Object.entries(AREA_CONFIG).map(([id,a])=>{
 const description=id==='orchard'?'Oito espaços para árvores produtivas.':id==='pond'?'Rio natural com margens, vegetação e pequeno píer.':'Haras octogonal próximo ao lago, com até 10 cavalos.';
 let controls='';
 if(state.expansions[id])controls='<span class="animal-state ready">Liberado</span><button class="modal-action alt" data-open="'+id+'">Ver área</button>';
 else if(id==='haras')controls='<div class="actions"><button data-buy-expansion="haras" data-expansion-currency="coins" '+(state.coins<a.price||farmLevel()<a.level?'disabled':'')+'>🟡 16.000</button><button data-buy-expansion="haras" data-expansion-currency="greenCoins" '+(state.greenCoins<a.greenPrice||farmLevel()<a.level?'disabled':'')+'>🟢 25</button></div>';
 else controls='<button data-buy-expansion="'+id+'" '+(state.coins<a.price||farmLevel()<a.level?'disabled':'')+'>Liberar área</button>';
 return '<div class="store-card land-expansion-card"><div><span class="symbol">'+a.icon+'</span><strong>'+a.name+'</strong><small>Nível '+a.level+' · '+(id==='haras'?'16.000 moedas amarelas ou 25 verdes':'🟡 '+fmt(a.price)+' moedas')+'<br/>'+description+'</small></div><div>'+controls+'</div></div>';
}).join('')}</div><div class="actions"><button class="modal-action alt" data-open="factory">Abrir fábrica de buquês</button><button class="modal-action alt" data-open="animals">Gerenciar animais</button><button class="modal-action alt" data-open="grill">Abrir churrasqueira</button><button class="modal-action alt" data-open="decor">Árvores e decoração</button></div>`;
html+=`<h3>🎣 Equipamentos de pesca</h3><p>Compre suas varas com moedas douradas ou verdes. Cada modelo exige um nível mínimo e permite capturar espécies de maior raridade.</p><div class="grid-cards fishing-rods">${Object.entries(FISHING_RODS).map(([id,r])=>{const owned=state.fishing.rods.includes(id),locked=farmLevel()<r.level;return `<div class="store-card fishing-rod-card"><span class="symbol">🪝</span><strong>Vara ${r.name}</strong><small>Nível mínimo: ${r.level}<br/>${owned?'Já adquirida':`${'Preço: 🟡 '+fmt(r.coins)+' ou 🟢 '+fmt(r.greenCoins)}`}<br/>Permite peixes até: ${(r.extraordinaryOnly?'Exclusiva para capturas extraordinárias':['Comum','Incomum','Raro','Muito raro','Lendário'][r.order])}</small>${owned?'<button disabled>Adquirida</button>':`<div class="actions"><button data-buy-rod="${id}" data-currency="coins" ${locked||state.coins<r.coins?'disabled':''}>🟡 ${fmt(r.coins)}</button><button class="modal-action alt"  data-buy-rod="${id}" data-currency="greenCoins" ${locked||state.greenCoins<r.greenCoins?'disabled':''}>🟢 ${fmt(r.greenCoins)}</button></div>`}</div>`}).join('')}</div>`;break;
case 'inventory':title='Meus itens';var sortInventoryIds=ids=>{var list=[...ids];if(inventorySortMode==='available')list=list.filter(id=>(state.inventory[id]||0)>0);if(inventorySortMode!=='default')list.sort((a,b)=>CROPS[a].name.localeCompare(CROPS[b].name,'pt-BR',{sensitivity:'base'}));return list;};var basicInventoryIds=sortInventoryIds(BASIC_FIELD_CROP_IDS),advancedInventoryIds=sortInventoryIds(ADVANCED_CROP_IDS),flowerInventoryIds=sortInventoryIds(FLOWER_IDS);html=`<p>Suas sementes, ferramentas consumíveis e presentes disponíveis.</p><div class="actions" style="align-items:center;gap:10px;margin:12px 0"><label for="inventory-sort"><strong>Organizar sementes:</strong></label><select id="inventory-sort" class="modal-select" style="max-width:240px"><option value="default" ${inventorySortMode==='default'?'selected':''}>Ordem padrão</option><option value="alphabetical" ${inventorySortMode==='alphabetical'?'selected':''}>Ordem alfabética</option><option value="available" ${inventorySortMode==='available'?'selected':''}>Somente disponíveis</option></select></div><h3>🌱 Sementes clássicas e históricas</h3><div class="grid-cards">${basicInventoryIds.map(id=>{const c=CROPS[id];return `<div class="store-card"><span class="symbol">${cropIconMarkup(id)}</span><strong>${c.name}</strong><small>Quantidade: ${fmt(state.inventory[id]||0)}${cropBalanceNote(c)}</small><button data-seed="${id}" ${(state.inventory[id]||0)<=0?'disabled':''}>Selecionar para plantar</button></div>`}).join('')}</div><h3>🧙 Sementes avançadas · terra vermelha</h3><div class="grid-cards advanced-seed-grid">${advancedInventoryIds.map(id=>{const c=CROPS[id];return `<div class="store-card advanced-seed-card"><span class="symbol">${cropIconMarkup(id)}</span><strong>${c.name}</strong><small>Quantidade: ${fmt(state.inventory[id]||0)} · Nível ${c.minLevel} · Somente terra vermelha${cropBalanceNote(c)}</small><button data-seed="${id}" ${(state.inventory[id]||0)<=0?'disabled':''}>Selecionar para plantar</button></div>`}).join('')}</div><h3>🌼 Sementes de flores</h3><div class="grid-cards">${flowerInventoryIds.map(id=>{const c=CROPS[id];return `<div class="store-card flower-store-card"><span class="symbol">${cropIconMarkup(id)}</span><strong>${c.name}</strong><small>Quantidade: ${fmt(state.inventory[id]||0)} · Colheita: ${c.yield} flores${cropBalanceNote(c)}</small><button data-seed="${id}" ${(state.inventory[id]||0)<=0?'disabled':''}>Selecionar para plantar</button></div>`}).join('')}</div><h3>🪄 Ferramentas de terra</h3><div class="grid-cards"><div class="store-card soil-tool-card"><span class="symbol">🪄</span><strong>Varinha da Terra Vermelha</strong><small>${(state.inventory.redSoilWand||0)>0?'1 varinha reutilizável adquirida':'Não adquirida'} · aplicações realizadas: ${state.redSoilApplications||0}. Cada terreno tem custo progressivo.</small><button data-tool="soil-red" ${(state.inventory.redSoilWand||0)<=0?'disabled':''}>Selecionar varinha</button></div><div class="store-card soil-tool-card restore"><span class="symbol">🪄</span><strong>Varinha de Restauração</strong><small>Quantidade: ${fmt(state.inventory.restoreSoilWand||0)} · cada varinha restaura um canteiro, sem reembolso do custo anterior.</small><button data-tool="soil-restore" ${(state.inventory.restoreSoilWand||0)<=0?'disabled':''}>Selecionar varinha</button></div><div class="store-card"><span class="symbol">🧪</span><strong>Fertilizante rápido</strong><small>Quantidade: ${fmt(state.inventory.fertilizer||0)} · reduz em 30% o tempo restante.</small><button data-tool="fertilizer" ${(state.inventory.fertilizer||0)<=0?'disabled':''}>Selecionar ferramenta</button></div>${Object.entries(FERTILIZERS).map(([id,v])=>`<div class="store-card soil-tool-card"><span class="symbol">${v.icon}</span><strong>${v.name}</strong><small>Quantidade: ${fmt(state.inventory[id]||0)} · redução efetiva: ${formatHours(v.hours*CROP_TIME_FACTOR)}<br/>${v.note}</small><button data-use-fertilizer="${id}" ${(state.inventory[id]||0)<=0?'disabled':''}>Selecionar fertilizante</button></div>`).join('')}<div class="store-card"><span class="symbol">💐</span><strong>Flores de presente</strong><small>Quantidade: ${fmt(state.flowers||0)} · flores avulsas recebidas na recompensa diária.</small></div></div><h3>🥣 Ingredientes culinários</h3><div class="grid-cards">${Object.entries(GRILL_SUPPLIES).map(([id,v])=>`<div class="store-card"><span class="symbol">${v.icon}</span><strong>${v.name}</strong><small>Quantidade: ${fmt(state.inventory[id]||0)}</small>${id==='caviar'?'<button data-open="sea">Pescar no mar</button>':'<button data-open="shop">Comprar na loja</button>'}</div>`).join('')}${Object.entries(MIX_HERB_RECIPES).filter(([id])=>id.startsWith('tempero_')).map(([id,v])=>`<div class="store-card"><span class="symbol">${mixHerbRecipeIconMarkup(id,v)}</span><strong>${v.name}</strong><small>Quantidade: ${fmt(state.inventory['mix_'+id]||0)}</small><button data-open="herb-mix">Preparar no Mix de Ervas</button></div>`).join('')}</div><div class="actions"><button class="modal-action alt" data-open="shop">Comprar mais sementes</button><button class="modal-action alt" data-open="factory">Fábrica de buquês</button><button class="modal-action alt" data-open="daily">Recompensa diária</button><button class="modal-action alt" data-open="orchard">Abrir pomar produtivo</button></div>`;break;
case 'warehouse':title='Meu depósito';const all=FIELD_CROP_IDS.filter(id=>!CROPS[id].advanced&&state.warehouse[id]>0),fishGoods=Object.keys(FISH_TYPES).filter(id=>(state.fishWarehouse[id]||0)>0),seaGoods=Object.keys(SEA_TYPES).filter(id=>(state.seaWarehouse[id]||0)>0),advancedGoods=ADVANCED_CROP_IDS.filter(id=>state.warehouse[id]>0),flowerGoods=FLOWER_IDS.filter(id=>(state.flowerWarehouse[id]||0)>0),animalGoods=Object.keys(ANIMAL_PRODUCTS).filter(id=>(state.animalWarehouse[id]||0)>0),meatGoods=Object.keys(MEAT_PRODUCTS).filter(id=>(state.meatWarehouse[id]||0)>0),cookedGoods=Object.keys(GRILL_RECIPES).filter(id=>(state.processedWarehouse[id]||0)>0);html=`<h3>🌾 Colheitas</h3>${all.length?all.map(id=>`<div class="list-line"><span>${cropIconMarkup(id)} ${CROPS[id].name} — ${fmt(state.warehouse[id])} unidades<br/><small>${state.warehouseLocks[id]?'🔒 Venda bloqueada':'🔓 Venda liberada'}</small></span><div class="actions"><button class="modal-action alt compact" data-toggle-crop-lock="${id}">${state.warehouseLocks[id]?'Desbloquear':'Bloquear'}</button><input class="sale-qty-input" type="number" min="1" max="${state.warehouse[id]}" value="1" aria-label="Quantidade de ${CROPS[id].name}" data-sale-qty="crop:${id}" ${state.warehouseLocks[id]?'disabled':''}><button class="modal-action compact" data-sell="${id}" ${state.warehouseLocks[id]?'disabled':''}>Vender quantidade</button></div></div>`).join(''):'<p>Nenhuma colheita armazenada.</p>'}<h3>🍓 Cultivos avançados · terra vermelha</h3>${advancedGoods.length?advancedGoods.map(id=>`<div class="list-line"><span>${cropIconMarkup(id)} ${CROPS[id].name} — ${fmt(state.warehouse[id])} unidades<br/><small>${state.warehouseLocks[id]?'🔒 Venda bloqueada':'🔓 Venda liberada'}</small></span><div class="actions"><button class="modal-action alt compact" data-toggle-crop-lock="${id}">${state.warehouseLocks[id]?'Desbloquear':'Bloquear'}</button><input class="sale-qty-input" type="number" min="1" max="${state.warehouse[id]}" value="1" aria-label="Quantidade de ${CROPS[id].name}" data-sale-qty="crop:${id}" ${state.warehouseLocks[id]?'disabled':''}><button class="modal-action compact" data-sell="${id}" ${state.warehouseLocks[id]?'disabled':''}>Vender quantidade</button></div></div>`).join(''):'<p>Nenhum cultivo avançado armazenado.</p>'}<h3>🌼 Flores colhidas</h3>${flowerGoods.length?flowerGoods.map(id=>`<div class="list-line flower-stock-line"><span>${cropIconMarkup(id)} ${CROPS[id].name} — ${fmt(state.flowerWarehouse[id])} unidades<br/><small>${state.flowerLocks[id]?'🔒 Venda bloqueada':'🔓 Venda liberada'}</small></span><div class="actions"><button class="modal-action alt compact" data-toggle-flower-lock="${id}">${state.flowerLocks[id]?'Desbloquear':'Bloquear'}</button><input class="sale-qty-input" type="number" min="1" max="${state.flowerWarehouse[id]}" value="1" aria-label="Quantidade de ${CROPS[id].name}" data-sale-qty="flower:${id}" ${state.flowerLocks[id]?'disabled':''}><button class="modal-action compact" data-sell-flower="${id}" ${state.flowerLocks[id]?'disabled':''}>Vender quantidade</button></div></div>`).join(''):'<p>Nenhuma flor armazenada.</p>'}<p class="historical-note">Flores e ingredientes de receitas podem ser bloqueados para evitar venda acidental.</p><h3>🐄 Produtos dos animais</h3>${animalGoods.length?animalGoods.map(id=>`<div class="list-line"><span>${ANIMAL_PRODUCTS[id].icon} ${ANIMAL_PRODUCTS[id].name} — ${fmt(state.animalWarehouse[id])} unidades</span><div class="actions"><input class="sale-qty-input" type="number" min="1" max="${state.animalWarehouse[id]}" value="1" aria-label="Quantidade de ${ANIMAL_PRODUCTS[id].name}" data-sale-qty="animal:${id}"><button class="modal-action compact" data-sell-animal-product="${id}">Vender quantidade</button></div></div>`).join(''):'<p>Nenhum produto animal armazenado.</p>'}<h3>🥩 Carnes e ingredientes</h3>${meatGoods.length?meatGoods.map(id=>`<div class="list-line"><span>${MEAT_PRODUCTS[id].icon} ${MEAT_PRODUCTS[id].name} — ${fmt(state.meatWarehouse[id])}<br/><small>${state.meatLocks[id]?'🔒 Venda bloqueada':'🔓 Venda liberada'} · ingrediente de receitas</small></span><div class="actions"><button class="modal-action alt compact" data-toggle-meat-lock="${id}">${state.meatLocks[id]?'Desbloquear':'Bloquear'}</button><input class="sale-qty-input" type="number" min="1" max="${state.meatWarehouse[id]}" value="1" aria-label="Quantidade de ${MEAT_PRODUCTS[id].name}" data-sale-qty="meat:${id}" ${state.meatLocks[id]?'disabled':''}><button class="modal-action compact" data-sell-meat="${id}" ${state.meatLocks[id]?'disabled':''}>Vender quantidade</button></div></div>`).join(''):'<p>Nenhuma carne armazenada.</p>'}<p class="historical-note">O abate é opcional e irreversível. Ingredientes bloqueados continuam disponíveis para a churrasqueira.</p><h3>🐟 Peixes pescados</h3>${fishGoods.length?fishGoods.map(id=>`<div class="list-line"><span>${FISH_TYPES[id].icon} ${FISH_TYPES[id].name} — ${fmt(state.fishWarehouse[id])} unidade(s)<br/><small>${FISH_TYPES[id].rarity} · venda-base: 🟡 ${fmt(fishSalePrice(FISH_TYPES[id]))}/unidade · ingrediente para churrasqueira</small></span><div class="actions"><input class="sale-qty-input" type="number" min="1" max="${state.fishWarehouse[id]}" value="1" aria-label="Quantidade de ${FISH_TYPES[id].name}" data-sale-qty="fish:${id}"><button class="modal-action compact" data-sell-fish="${id}">Vender quantidade</button></div></div>`).join(''):'<p>Nenhum peixe de rio armazenado.</p>'}<h3>🌊 Capturas de alto-mar</h3>${seaGoods.length?seaGoods.map(id=>`<div class="list-line sea-stock-line"><span>${SEA_TYPES[id].icon} ${SEA_TYPES[id].name} — ${fmt(state.seaWarehouse[id])} unidade(s)<br/><small>${SEA_TYPES[id].rarity} · venda-base: 🟡 ${fmt(fishSalePrice(SEA_TYPES[id]))}/unidade</small></span><div class="actions"><input class="sale-qty-input" type="number" min="1" max="${state.seaWarehouse[id]}" value="1" aria-label="Quantidade de ${SEA_TYPES[id].name}" data-sale-qty="sea:${id}"><button class="modal-action compact" data-sell-sea-fish="${id}">Vender quantidade</button></div></div>`).join(''):'<p>Nenhuma captura de alto-mar armazenada.</p>'}<h3>🍖 Pratos preparados</h3>${cookedGoods.length?cookedGoods.map(id=>`<div class="list-line"><span>${GRILL_RECIPES[id].icon} ${GRILL_RECIPES[id].name} — ${fmt(state.processedWarehouse[id])} unidades<br/><small>${state.processedLocks[id]?'🔒 Venda bloqueada':'🔓 Venda liberada'}</small></span><div class="actions"><button class="modal-action alt compact" data-toggle-processed-lock="${id}">${state.processedLocks[id]?'Desbloquear':'Bloquear'}</button><input class="sale-qty-input" type="number" min="1" max="${state.processedWarehouse[id]}" value="1" aria-label="Quantidade de ${GRILL_RECIPES[id].name}" data-sale-qty="processed:${id}" ${state.processedLocks[id]?'disabled':''}><button class="modal-action compact" data-sell-processed="${id}" ${state.processedLocks[id]?'disabled':''}>Vender quantidade</button></div></div>`).join(''):'<p>Nenhum prato preparado armazenado.</p>'}<div class="actions"><button class="modal-action alt" data-sellall="true">Vender todas as colheitas</button><button class="modal-action alt" data-open="factory">Abrir fábrica</button><button class="modal-action alt" data-open="grill">Abrir churrasqueira</button><button class="modal-action alt" data-open="animals">Gerenciar animais</button></div>`;break;
case 'mobile-nav':title='Personalizar barra inferior';{const selected=Array.isArray(state.mobileShortcuts)?state.mobileShortcuts:['shop','kitchen','animals','friends'];html='<p>Escolha até quatro atalhos para a barra inferior do celular ou tablet. A seleção será salva junto à fazenda na nuvem.</p><div class="mobile-shortcut-grid">'+Object.entries(MOBILE_SHORTCUTS).map(([id,item])=>'<label class="mobile-shortcut-option"><input type="checkbox" data-mobile-shortcut="'+id+'" '+(selected.includes(id)?'checked':'')+'><span>'+item[0]+' '+item[1]+'</span></label>').join('')+'</div><button class="modal-action" data-save-mobile-shortcuts="true">Salvar atalhos</button>';break;}
case 'tasks':title='Missões e conquistas';ensureMissionState();{
const achievements=ACHIEVEMENTS.map(a=>({...a,unlocked:a.test(),claimed:state.claimedAchievements.includes(a.id),value:Math.min(a.goal||1,Math.max(0,Number(a.progress?a.progress():(a.test()?1:0))||0))}));
const unlockedCount=achievements.filter(a=>a.unlocked).length,claimedCount=achievements.filter(a=>a.claimed).length;
const groups=[...new Set(achievements.map(a=>a.category||'Outras'))];
const achievementHtml=groups.map((group,index)=>{const items=achievements.filter(a=>(a.category||'Outras')===group).sort((a,b)=>(a.goal||1)-(b.goal||1)),done=items.filter(a=>a.unlocked).length;return '<details class="achievement-category" '+(index===0?'open':'')+'><summary><span>'+safe(group)+'</span><small>'+done+' / '+items.length+' desbloqueadas</small></summary><div class="achievement-list">'+items.map(a=>{const pct=Math.round(a.value/(a.goal||1)*100);return '<div class="achievement-card '+(a.unlocked?'unlocked':'')+' '+(a.claimed?'claimed':'locked')+'"><span class="achievement-icon">'+a.icon+'</span><div class="achievement-main"><b>'+safe(a.title)+'</b><small>'+safe(a.detail)+'</small><div class="achievement-progress"><i style="width:'+pct+'%"></i></div><small class="achievement-state">'+(a.claimed?'✓ Recompensa resgatada':a.unlocked?'🏅 Conquista desbloqueada · '+fmt(a.reward)+' moedas + '+a.xp+' XP':'🔒 Progresso: '+fmt(a.value)+' / '+fmt(a.goal||1))+'</small></div>'+(a.unlocked&&!a.claimed?'<button class="modal-action alt" data-claim-achievement="'+a.id+'">Resgatar</button>':'<span class="achievement-lock">'+(a.claimed?'✓':'🔒')+'</span>')+'</div>'}).join('')+'</div></details>'}).join('');
html='<div class="gift-summary"><span class="symbol">🗓️</span><div><b>Missões da fazenda</b><small>Objetivos renovados diariamente e semanalmente, com recompensas em moedas e XP.</small></div></div><h3>☀️ Missões diárias</h3><p>Desafios rápidos para concluir ao longo do dia.</p>'+renderMissionCards('daily',DAILY_MISSIONS)+'<h3>📅 Missões semanais</h3><p>Objetivos de longo prazo com recompensas maiores.</p>'+renderMissionCards('weekly',WEEKLY_MISSIONS)+'<details class="achievement-hub" open><summary><span>🏆 Conquistas permanentes</span><small>'+unlockedCount+' / '+achievements.length+' desbloqueadas · '+claimedCount+' resgatadas</small></summary><p>Conquistas em etapas, com metas crescentes, barras de progresso e recompensas. Expanda cada categoria para acompanhar sua evolução.</p>'+achievementHtml+'</details>'+(state.unlockedTitles?.length?'<h3>🎖️ Títulos conquistados</h3><p>'+state.unlockedTitles.map(safe).join(' · ')+'</p>':'')+'<p class="historical-note">O progresso e os resgates são sincronizados na nuvem. As antigas tarefas introdutórias permanecem apenas como dados históricos.</p>';
break;} case 'haras':title='Haras da fazenda';if(!state.expansions.haras){html='<div class="offline-feature"><span>🐎</span><b>O Haras ainda está bloqueado</b><p>Libere a expansão no nível 20 por 16.000 moedas amarelas ou 25 moedas verdes.</p></div><button class="modal-action" data-open="areas">Ver Expansões</button>';break;}{
 const horses=state.animals.filter(a=>ANIMALS[a.type]?.role==='horse'),unlocked=horseUnlockedSlots(),nextLevel=20+unlocked*2;
 const breedCards=Object.entries(HORSE_BREEDS).map(([id,b])=>{
  const count=horses.filter(a=>a.type===id).length,full=horses.length>=unlocked;
  return '<div class="store-card horse-breed-card"><img class="horse-breed-preview horse-breed-'+id+'" src="'+HORSE_ASSETS.horse+'" alt="Cavalo '+b.name+'"><strong>'+b.name+'</strong><small>'+b.coat+'<br/>No Haras: '+count+'<br/>Venda na fase adulta: 🟡 '+fmt(b.sellPrice)+' moedas</small><b>🟡 '+fmt(b.price)+' moedas</b><button data-buy-animal="'+id+'" '+(full||state.coins<b.price?'disabled':'')+'>'+(full?'Sem vaga liberada':'Comprar cavalo')+'</button></div>';
 }).join('');
 const summary='<div class="gift-summary"><span class="symbol">🐎</span><div><b>Criação e desenvolvimento de cavalos</b><small>Alimente cada cavalo para avançar pelas cinco etapas até a fase adulta. Cavalos não produzem itens e não podem ser abatidos; podem ser vendidos.</small></div></div>';
 const capacity='<div class="animal-summary"><b>Vagas liberadas: '+unlocked+'/10 · Ocupadas: '+horses.length+'</b><small>'+(unlocked<10?'A próxima vaga será liberada no nível '+nextLevel+' da fazenda.':'Todas as vagas do Haras estão liberadas.')+' A primeira vaga abre no nível 20 e uma nova é liberada a cada 2 níveis.</small></div>';
 const feed='<h3>🌾 Alimentação</h3><div class="grid-cards"><div class="store-card"><span class="symbol">🌾</span><strong>Ração para cavalos</strong><small>Estoque: '+fmt(state.inventory.feed_horse||0)+' · Cada unidade inicia uma etapa de crescimento.</small><b>🟡 180 moedas amarelas</b><button data-buy-feed="horse_percheron" '+(state.coins<180?'disabled':'')+'>Comprar ração</button></div></div>';
 html=summary+specialistSummary('haras','Haras')+capacity+'<button class="modal-action alt" data-focus-area="haras">Centralizar Haras no cenário</button><h3>🐎 Meus cavalos</h3><div class="animal-list">'+(horses.length?horses.map(renderAnimalCard).join(''):'<p>O Haras está vazio. Escolha uma raça na loja para adquirir seu primeiro cavalo.</p>')+'</div><h3>🛒 Loja de raças</h3><div class="grid-cards horse-breed-grid">'+breedCards+'</div>'+feed+'<p class="historical-note">Os títulos do Haras evoluem separadamente do nível da fazenda. As raças disponíveis para compra são Percheron, Quarto de Milha, Puro Sangue, Frísio e Andaluz.</p>';
 break;
}
case 'animals':title='Animais da fazenda';{
const birds=state.animals.filter(a=>isBirdType(a.type)),livestock=state.animals.filter(a=>!isBirdType(a.type)&&ANIMALS[a.type]?.role!=='horse'),horses=state.animals.filter(a=>ANIMALS[a.type]?.role==='horse');
html=`<div class="actions"><button class="modal-action alt" data-feed-all="true">🐾 Alimentar animais aptos em lote</button></div><div class="animal-summary"><b>🐦 Viveiro: ${birds.length} ave(s)</b><small>Galinha sem limite específico. Pombo, pato, pavão e peru: até 2 unidades de cada espécie.</small></div>
<div class="animal-summary"><b>🐾 Curral: ${farmAnimalCount()} de ${ANIMAL_SLOTS.length} espaços ocupados</b><small>Alimente os animais para iniciar a produção ou avançar seu crescimento. Os ciclos desta edição seguem a redução de tempo de 1/5.</small></div><div class="animal-summary"><b>🐎 Haras: ${horses.length} cavalo(s)</b><small>${state.expansions.haras?'Gerencie raças, alimentação e crescimento na janela do Haras.':'Desbloqueie no nível 20 em Expansões.'}</small><button class="modal-action alt" data-open="haras">${state.expansions.haras?'Abrir Haras':'Ver expansão do Haras'}</button></div>
<h3>🐦 Aves do viveiro</h3><div class="animal-list">${birds.length?birds.map(renderAnimalCard).join(''):'<p>O viveiro ainda está vazio. Adquira aves abaixo para começar sua criação.</p>'}</div>
<h3>🛒 Comprar aves para o viveiro</h3><div class="grid-cards">${BIRD_TYPES.map(id=>{const a=ANIMALS[id],count=birdCount(id),limited=id!=='galinha',limitReached=birdLimitReached(id),wallet=a.currency==='greenCoins'?'greenCoins':'coins',price=a.currency==='greenCoins'?`🟢 ${fmt(a.price)} moedas verdes`:`🟡 ${fmt(a.price)} moedas amarelas`,description=isDualPurposeAnimal(id)?`Produz ${a.productName.toLowerCase()} e também pode crescer até o nível 10 para abate.`:a.role==='producer'?`Produz ${a.productName.toLowerCase()} após ser alimentada.`:'Cresce em cinco etapas e pode ser vendida quando adulta.';return `<div class="store-card"><span class="symbol">${a.icon}</span><strong>${a.name}</strong><small>${description}<br/>${limited?`Limite: 2 · ${count}/2`:`Quantidade atual: ${count} · sem limite específico`}<br/>Ração: ${a.feedName}${a.estimateNote?`<br/><span class="data-origin estimated">${safe(a.estimateNote)}</span>`:''}</small><b>${price}</b><button data-buy-animal="${id}" ${limitReached||state[wallet]<a.price?'disabled':''}>${limitReached?'Limite atingido':'Comprar ave'}</button></div>`}).join('')}</div>
<h3>🐄 Animais do curral</h3><div class="animal-list">${livestock.map(renderAnimalCard).join('')}</div>
<div class="actions"><button class="modal-action alt" data-equip-dog-breed="classico" ${state.animals.find(a=>a.type==='cachorro')?.breed==='classico'?'disabled':''}>↩ Restaurar cachorro original</button></div>
<h3>🐕 Canil · raças históricas</h3><p>Os IDs das raças foram recuperados de catálogos antigos. Os preços abaixo são estimativas locais; as raças alteram a aparência do cão de guarda, sem criar animais extras.</p><div class="grid-cards dog-breed-grid">${Object.entries(DOG_BREEDS).filter(([id])=>id!=='classico').map(([id,b])=>{const owned=isDogBreedOwned(id),active=state.animals.find(a=>a.type==='cachorro')?.breed===id,wallet=b.currency==='greenCoins'?'greenCoins':'coins',symbol=b.currency==='greenCoins'?'🟢':'🟡',priceNote='Preço local estimado';return `<div class="store-card dog-breed-card"><img class="dog-breed-preview" src="${b.image||("/assets/"+b.asset+"."+(b.ext||"svg"))}" alt="${b.name}"><strong>${b.name}</strong><small>ID histórico ${b.id}${b.event?'<br/>Variante de evento':''}<br/>${owned?'Adquirido permanentemente':priceNote}</small><b>${symbol} ${fmt(b.price)} ${b.currency==='greenCoins'?'moedas verdes':'moedas'}</b>${owned?`<button data-equip-dog-breed="${id}" ${active?'disabled':''}>${active?'Em uso':'Equipar raça'}</button>`:`<button data-buy-dog-breed="${id}" ${state[wallet]<b.price?'disabled':''}>Comprar e equipar</button>`}</div>`}).join('')}</div>
<h3>🛒 Comprar animais para o curral</h3><div class="grid-cards">${Object.entries(ANIMALS).filter(([id,a])=>a.role!=='guard'&&!isBirdType(id)).map(([id,a])=>`<div class="store-card"><span class="symbol">${a.icon}</span><strong>${a.name}</strong><small>${isDualPurposeAnimal(id)?`Produz ${a.productName.toLowerCase()} e pode crescer até o nível 10 para abate.`:a.role==='producer'?`Produz ${a.productName.toLowerCase()} a cada ciclo após ser alimentado.`:'Cresce em cinco etapas; pode ser vendido quando adulto.'}<br/>Ração: ${a.feedName}${a.estimateNote?`<br/><span class="data-origin estimated">${safe(a.estimateNote)}</span>`:''}</small><b>${a.currency==='greenCoins'?`🟢 ${fmt(a.price)} moedas verdes`:`🟡 ${fmt(a.price)} moedas amarelas`}</b><button data-buy-animal="${id}" ${state[a.currency==='greenCoins'?'greenCoins':'coins']<a.price||farmAnimalCount()>=ANIMAL_SLOTS.length?'disabled':''}>Comprar animal</button></div>`).join('')}</div>
<p class="historical-note">As aves agora ocupam o viveiro e não consomem espaços do curral. Os animais de corte do viveiro (galinha, peru e pato) e do curral, exceto o burro, podem produzir e crescer em paralelo até o nível 10; no nível máximo, podem ser abatidos para gerar carne. Pombo e pavão permanecem fora desse sistema.</p>`;break;
}case 'factory':title='Fábrica de flores';html=`<div class="gift-summary"><span class="symbol">🏭</span><div><b>Monte buquês com as flores do depósito</b><small>Os ingredientes são consumidos na produção. Cada receita aumenta sua popularidade local e concede experiência.</small></div></div><div class="grid-cards bouquet-recipes">${BOUQUET_IDS.map(id=>{const r=BOUQUETS[id],need=Object.entries(r.recipe).map(([flower,amount])=>`${CROPS[flower].icon} ${amount} ${CROPS[flower].name}`).join(' + '),enough=Object.entries(r.recipe).every(([flower,amount])=>(state.flowerWarehouse[flower]||0)>=amount),owned=state.bouquets[id]||0;return `<div class="store-card bouquet-card"><span class="symbol">${r.icon}</span><strong>${r.name}</strong><small>${r.description}<br/>Ingredientes: ${need}<br/>Em estoque: ${owned} buquê(s)</small><b>⭐ +${r.popularity} popularidade · +${r.xp} XP</b><button data-make-bouquet="${id}" ${enough?'':'disabled'}>Produzir buquê</button></div>`}).join('')}</div><p class="historical-note">Receitas históricas documentadas: 6 crisântemos, 16 peônias, 20 cravos e 26 rosas vermelhas por buquê. A popularidade de 520 pontos do buquê de rosas vermelhas é citada em guia de 2010; os demais valores e o bônus offline são balanceamento desta reconstrução.</p><div class="actions"><button class="modal-action alt" data-open="warehouse">Abrir depósito de flores</button><button class="modal-action alt" data-open="gifts">Casa de presentes</button><button class="modal-action alt" data-open="shop">Comprar sementes de flores</button></div>`;break;
case 'gifts':title='Casa de presentes';if(!cloudUser){html='<div class="gift-summary"><span class="symbol">🔐</span><div><b>Entre na sua conta para enviar e receber presentes online</b><small>Sua coleção local continua disponível neste dispositivo.</small></div></div><button class="modal-action" data-open="account">Entrar ou criar conta</button>';break;}html=renderOnlineGifts();break;
case 'areas':title='Expansões da fazenda';{
 const cards=Object.entries(AREA_CONFIG).map(([id,a])=>{
  const description=id==='orchard'?'Oito espaços para plantar árvores produtivas e colher frutos.':id==='pond'?'Rio para pesca de peixes brasileiros, com margens naturais e pequeno píer.':'Cercado octogonal de madeira próximo ao lago, com capacidade para até 10 cavalos.';
  let controls='';
  if(state.expansions[id])controls='<span class="animal-state ready">Já liberado</span><button class="modal-action alt" data-open="'+id+'">Ver área</button>';
  else if(id==='haras')controls='<div class="actions"><button data-buy-expansion="haras" data-expansion-currency="coins" '+(farmLevel()<a.level||state.coins<a.price?'disabled':'')+'>🟡 16.000</button><button data-buy-expansion="haras" data-expansion-currency="greenCoins" '+(farmLevel()<a.level||state.greenCoins<a.greenPrice?'disabled':'')+'>🟢 25</button></div>';
  else controls='<button data-buy-expansion="'+id+'" '+(farmLevel()<a.level||state.coins<a.price?'disabled':'')+'>Liberar área</button>';
  return '<div class="store-card land-expansion-card"><div><span class="symbol">'+a.icon+'</span><strong>'+a.name+'</strong><small>Nível mínimo: '+a.level+'<br/>'+(id==='haras'?'Custo: 16.000 moedas amarelas ou 25 moedas verdes':'Custo: 🟡 '+fmt(a.price))+'<br/>'+description+'</small></div><div>'+controls+'</div></div>';
 }).join('');
 html='<p>Abra novas áreas físicas para ampliar a propriedade.</p><div class="grid-cards">'+cards+'</div><p class="historical-note">O Haras libera a primeira vaga no nível 20 da fazenda e mais uma a cada 2 níveis, até 10 vagas no nível 38. O lago libera a pescaria e o depósito de peixes.</p>';break;
}
case 'orchard':title='Pomar produtivo';if(!state.expansions.orchard){html=`<div class="offline-feature"><span>🌳</span><b>O pomar ainda está bloqueado</b><p>Libere a área nas Expansões da fazenda. Ela terá oito espaços para árvores produtivas.</p></div><button class="modal-action" data-open="areas">Ver expansões</button>`;break;}html=`<div class="gift-summary"><span class="symbol">🌳</span><div><b>Oito espaços para árvores produtivas</b><small>Use sementes de árvores que já estejam no seu inventário. Os ciclos seguem a regra de 1/5 do tempo.</small></div></div><div class="grid-cards">${state.orchardTrees.map((t,i)=>{const c=t.type?CROPS[t.type]:null,ready=t.status==='ready'||(t.type&&orchardTreeProgress(t)>=1);return `<div class="store-card decor-card"><span class="symbol">${c?.icon||'🌱'}</span><strong>Espaço ${i+1}${c?' · '+c.name:''}</strong><small>${!c?'Vazio · escolha uma muda do seu inventário.':ready?'Pronta para colher!':`Crescendo · ${formatHours((1-orchardTreeProgress(t))*cropHours(t.type,!!t.regrowing))} restantes · ${t.harvestsRemaining} colheita(s)`}</small>${c?`<button data-harvest-orchard="${i}" ${ready?'':'disabled'}>Colher árvore</button>`:`<div class="orchard-seed-list">${ORCHARD_CROP_IDS.filter(id=>CROPS[id]&&!CROPS[id].advanced).map(id=>`<button class="modal-action alt compact" data-plant-orchard-tree="${id}" data-slot="${i}" ${(state.inventory[id]||0)<=0||!cropLevelAllowed(CROPS[id])?'disabled':''}>${cropIconMarkup(id)} ${CROPS[id].name} · ${fmt(state.inventory[id]||0)}</button>`).join('')}</div>`}</div>`}).join('')}</div><p class="historical-note">As árvores do pomar são objetos próprios do cenário e não ocupam os 72 canteiros das duas áreas de plantio. Para obter mais mudas, compre sementes na Loja.</p><button class="modal-action alt" data-focus-area="orchard">Centralizar Pomar no cenário</button>`;break;
case 'pond':title='Rio da Fazenda';if(!state.expansions.pond){html=`<div class="offline-feature"><span>🦆</span><b>O Rio ainda está bloqueado</b><p>Libere a área nas Expansões da fazenda. O rio tem margens naturais, vegetação e um pequeno píer.</p></div><button class="modal-action" data-open="areas">Ver expansões</button>`;break;}{const rod=FISHING_RODS[state.fishing.rod]||FISHING_RODS.normal,remaining=Math.max(0,FISH_COOLDOWN-(Date.now()-(state.fishing.lastCastAt||0))),fishTotal=Object.values(state.fishWarehouse).reduce((sum,n)=>sum+n,0);html=`<div class="gift-summary"><span class="symbol">🎣</span><div><b>Rio da Fazenda · Pesqueiro</b><small>Vara equipada: ${rod.name} · Nível ${farmLevel()} · ${fishTotal} peixe(s) no depósito. A pescaria tem intervalo de 8 segundos.</small></div></div>${specialistSummary('fisher','Pescador')}<button class="modal-action alt" data-focus-area="pond">Centralizar Rio no cenário</button><h3>🎣 Pescar</h3><p>Use sua vara para encontrar peixes brasileiros. Varas melhores ampliam a variedade e aumentam a chance de capturas raras.</p><button class="modal-action fishing-cast" data-cast-fish="true" ${remaining>0?'disabled':''}>${remaining>0?'Aguarde '+Math.ceil(remaining/1000)+'s':'Lançar a vara · Pescar'}</button><h3>🪝 Varas de pesca</h3><div class="grid-cards fishing-rods">${Object.entries(FISHING_RODS).map(([id,r])=>{const owned=state.fishing.rods.includes(id),selected=state.fishing.rod===id,locked=farmLevel()<r.level;return `<div class="store-card fishing-rod-card"><span class="symbol">🪝</span><strong>Vara ${r.name}</strong><small>Nível ${r.level} ${locked?'· Bloqueada pelo nível':''}<br/>${owned?(selected?'Equipada':'Adquirida'):('Preço: 🟡 '+fmt(r.coins)+' ou 🟢 '+fmt(r.greenCoins))}<br/>Peixes disponíveis até raridade: ${(r.extraordinaryOnly?'Exclusiva para capturas extraordinárias':['Comum','Incomum','Raro','Muito raro','Lendário'][r.order])}</small>${owned?(selected?'<button disabled>Em uso</button>':`<button data-select-rod="${id}">Equipar</button>`):`<div class="actions"><button data-buy-rod="${id}" data-currency="coins" ${locked||state.coins<r.coins?'disabled':''}>🟡 ${fmt(r.coins)}</button><button class="modal-action alt"  data-buy-rod="${id}" data-currency="greenCoins" ${locked||state.greenCoins<r.greenCoins?'disabled':''}>🟢 ${fmt(r.greenCoins)}</button></div>`}</div>`}).join('')}</div><h3>🐟 Peixes no depósito</h3>${fishTotal?Object.entries(FISH_TYPES).filter(([id])=>(state.fishWarehouse[id]||0)>0).map(([id,f])=>`<div class="list-line"><span>${f.icon} <b>${f.name}</b> — ${fmt(state.fishWarehouse[id])} unidade(s)<br/><small>${f.rarity} · +${f.xp} XP por captura</small></span></div>`).join(''):'<p>Você ainda não pescou nenhum peixe.</p>'}<p class="historical-note">Os preços, níveis, probabilidades, XP e tempo de espera são valores de balanceamento desta edição. As espécies são peixes encontrados em águas brasileiras; não exigem imagens individuais.</p>`;}break;
case 'profile':title='Personalizar fazenda e perfil';const photoPreview=profilePhotoDraft?`<img id="profile-preview-img" src="${safe(profilePhotoDraft)}" alt="Prévia da foto">`:'<span id="profile-preview-placeholder">👨🏻‍🌾</span>';html=`<div class="profile-editor"><div class="profile-editor-preview"><div class="profile-photo-preview">${photoPreview}</div><b>Seu perfil</b><small>A imagem será ajustada para um quadrado de 256 × 256 pixels.</small></div><div class="profile-editor-fields"><label for="farm-name-input">Nome da fazenda</label><input id="farm-name-input" type="text" maxlength="24" autocomplete="off" value="${safe(state.farmName||'Minha fazenda')}" placeholder="Ex.: Fazenda Esperança"><small>Escolha um nome de até 24 caracteres.</small><button class="modal-action profile-save-name" data-save-farm-name="true">Salvar nome da fazenda</button><div class="profile-divider"></div><b>Foto do perfil</b><input id="profile-photo-file" type="file" accept="image/png,image/jpeg,image/webp"><label class="upload-button" for="profile-photo-file">📷 Selecionar foto do computador</label><small id="profile-photo-help">PNG, JPG ou WEBP · até 8 MB. A imagem é reduzida antes de salvar.</small><div class="actions profile-photo-actions"><button class="modal-action" data-save-profile-photo="true" ${profilePhotoDraft===state.profilePhoto?'disabled':''}>Aplicar foto</button><button class="modal-action alt" data-remove-profile-photo="true" ${state.profilePhoto?'':'disabled'}>Remover foto</button></div></div></div><p class="historical-note">O nome da fazenda e a foto ficam salvos neste computador e também são incluídos no backup JSON. Nenhuma imagem é enviada para a internet.</p>`;break;
case 'mood':title='Humor do fazendeiro';const moodToday=state.moodDate===todayKey(),currentMood=MOODS.find(m=>m.id===state.mood)||MOODS[0];html=`<div class="gift-summary"><span class="symbol">${currentMood.icon}</span><div><b>Seu humor atual: ${currentMood.name}</b><small>Na versão clássica, o humor era exibido junto ao perfil e podia ser visto pelos amigos que visitavam a fazenda.</small></div></div><p>${moodToday?'Você já definiu seu humor hoje. Outra troca custa 1.000 moedas amarelas.':'Escolha seu humor de hoje gratuitamente. Uma nova troca no mesmo dia custa 1.000 moedas amarelas.'}</p><div class="mood-grid">${MOODS.map(m=>`<button class="mood-choice ${m.id===state.mood?'selected':''}" data-set-mood="${m.id}"><span>${m.icon}</span><b>${m.name}</b></button>`).join('')}</div><p class="historical-note">O humor fica salvo localmente. A exibição para amigos será ativada quando existir conexão online real.</p>`;break;
case 'free-gifts':title='Presentes grátis';const freeGiftRows=[{level:40,icon:'🧪',name:'Saco de superfertilizante'},{level:60,icon:'🌼',name:'Rosa amarela'}];html=`<div class="gift-summary"><span class="symbol">🎁</span><div><b>Presentes gratuitos por nível</b><small>Os presentes eram liberados conforme a experiência do fazendeiro.</small></div></div>${freeGiftRows.map(g=>`<div class="list-line free-gift-line"><span>${g.icon} <b>${g.name}</b><br/><small>Desbloqueia no nível ${g.level}</small></span><button class="modal-action alt" disabled>${farmLevel()>=g.level?'Enviar (online)':'🔒 Nível '+g.level}</button></div>`).join('')}<div class="offline-feature"><span>📡</span><b>Envio de presentes depende de conexão</b><p>Os itens e níveis documentados aparecem aqui, mas não criaremos destinatários fictícios nem enviaremos presentes sem servidor online.</p></div>`;break;
case 'decor':title='Árvores e decoração';html=`<div class="gift-summary"><span class="symbol">🌳</span><div><b>Personalize o cenário inteiro da sua fazenda</b><small>Escolha temas históricos com mudanças de paleta e elementos visuais próprios. Os temas temporários duram 30 dias; o visual clássico é permanente. Os preços sem registro histórico estão identificados como estimativas.</small></div></div><h3>🎨 Temas completos da fazenda</h3><p class="historical-note">Temas sazonais aceitam moedas amarelas somente nos 30 dias anteriores à comemoração e até o dia do evento. Moedas verdes podem ser usadas a qualquer momento. Após adquirir, o tema fica permanente.</p><div class="grid-cards theme-grid">${Object.entries(FARM_THEMES).map(([id,t])=>{const owned=id==='classic'||(state.ownedFarmThemes||[]).includes(id),w=getSeasonalThemeWindow(t),yellow=t.price===0?'Gratuito':`🟡 ${fmt(t.price)} moedas amarelas`,green=Number.isFinite(t.greenPrice)?`🟢 ${fmt(t.greenPrice)} moedas verdes`:'';const locked=!!t.seasonal&&!w.available,count=locked?`<small class="theme-countdown">🕒 Moedas amarelas liberadas em ${w.daysUntil} dia(s)</small>`:t.seasonal?'<small class="theme-countdown">🟢 Compra verde liberada · 🟡 janela sazonal aberta</small>':'';return `<div class="store-card theme-card ${state.farmTheme===id?'theme-selected':''}"><span class="symbol">${t.icon}</span><strong>${t.name}</strong><small>${t.description}<br/>Permanente após adquirir${t.historical?' · tema histórico':''}${t.estimated?' · valores estimados':''}</small><b>${id==='classic'?'Gratuito':yellow}</b>${count}${owned?`<small>Sua coleção permanente</small><button data-apply-theme="${id}" ${state.farmTheme===id?'disabled':''}>${state.farmTheme===id?'Em uso':'Aplicar tema'}</button>`:(t.price===0?`<button data-buy-theme="${id}" data-currency="coins">Resgatar tema</button>`:`<div class="actions"><button data-buy-theme="${id}" data-currency="coins" ${locked||state.coins<t.price?'disabled':''}>🟡 ${fmt(t.price)}</button>${green?`<button class="modal-action alt" data-buy-theme="${id}" data-currency="greenCoins" ${state.greenCoins<t.greenPrice?'disabled':''}>${green}</button>`:''}</div>`)}</div>`}).join('')}</div><h3>🌷 Objetos e decorações</h3><div class="grid-cards">${Object.entries(DECORATIONS).map(([id,d])=>`<div class="store-card decor-card"><span class="symbol">${d.icon}</span><strong>${d.name}</strong><small>Em itens: ${fmt(state.decorInventory[id]||0)} · Instalados: ${state.placedDecorations.filter(x=>x.id===id).length}<br/>${d.event?'Evento histórico · preço estimado · validade de 30 dias':d.obtainOnly?'Item de recompensa':d.xp===null?'XP não preservado':`+${d.xp} XP ao adquirir`}</small><b>${d.obtainOnly?'Recompensa especial':d.currency==='greenCoins'?`🟢 ${fmt(d.price)} moedas verdes`:`🟡 ${fmt(d.price)} moedas amarelas`}</b><button data-buy-decoration="${id}" ${d.obtainOnly||state[d.currency==='greenCoins'?'greenCoins':'coins']<d.price?'disabled':''}>${d.obtainOnly?'Obter pela recompensa':'Comprar'}</button><button class="modal-action alt" data-place-decoration="${id}" ${(state.decorInventory[id]||0)<=0?'disabled':''}>Instalar na fazenda</button></div>`).join('')}</div><h3>Decorações instaladas</h3>${state.placedDecorations.length?state.placedDecorations.map(d=>`<div class="list-line"><span>${DECORATIONS[d.id].icon} ${DECORATIONS[d.id].name} <small>· ${Math.max(0,Math.ceil(((d.expiresAt||Date.now()+30*24*HOUR)-Date.now())/(24*HOUR)))} dia(s)</small></span><button class="modal-action alt" data-remove-decoration="${d.slot}">Guardar</button></div>`).join(''):'<p>Nenhuma decoração instalada ainda.</p>'}<p class="historical-note">Os itens são posicionados em doze pontos seguros pré-definidos, evitando as áreas centrais da casa, do curral, das estradas e dos 72 canteiros. Cada instalação permanece por 30 dias e pode ser guardada antes disso.</p>`;break;
case 'grill':title='Churrasqueira';const partRows=Object.entries(GRILL_PARTS).map(([id,p])=>`<div class="list-line"><span>${p.icon} ${p.name} — ${fmt((state.grill.parts||{})[id]||0)}/${GRILL_PARTS_REQUIRED}</span><button class="modal-action alt" data-buy-grill-part="${id}" ${!state.grill.owned||state.grill.assembled||(state.grill.parts[id]||0)>=GRILL_PARTS_REQUIRED||state.greenCoins<1?'disabled':''}>Comprar 1 · 🟢 1</button></div>`).join('');if(!state.grill.assembled){html=state.grill.owned?`<div class="gift-summary"><span class="symbol">🧰</span><div><b>Churrasqueira desmontada</b><small>Reúna 10 peças de ferro, 10 parafusos e 10 baldes de tinta para montá-la.</small></div></div>${partRows}<button class="modal-action" data-assemble-grill="true" ${Object.keys(GRILL_PARTS).some(k=>(state.grill.parts[k]||0)<GRILL_PARTS_REQUIRED)?'disabled':''}>Montar churrasqueira</button><p class="historical-note">No jogo original, os componentes podiam ser enviados por vizinhos ou comprados com moedas verdes. A compra local de 1 moeda verde por componente é uma adaptação offline.</p>`:`<div class="daily-reward"><span>🔥</span><b>Churrasqueira da fazenda</b><p>Compre a churrasqueira desmontada por 1.000 moedas amarelas. Depois, reúna os três tipos de componentes.</p><button class="modal-action" data-buy-grill="true" ${state.coins<1000?'disabled':''}>Comprar churrasqueira · 🟡 1.000</button></div>`;}else{const now=Date.now(),queue=state.grill.queue||[],readyCount=queue.filter(j=>j.readyAt<=now).length;const queueHtml=queue.length?queue.map(j=>{const r=GRILL_RECIPES[j.recipe],ready=j.readyAt<=now,progress=Math.max(0,Math.min(1,(now-j.startedAt)/Math.max(1,j.readyAt-j.startedAt)));return `<div class="queue-line"><div class="queue-icon">${r.icon}</div><div class="queue-main"><b>${r.name}</b><small>${ready?'Pronto para recolher':`Termina em ${formatHours((j.readyAt-now)/3600000)}`}</small><div class="animal-progress"><i style="width:${Math.round(ready?100:progress*100)}%"></i></div></div><span class="queue-state ${ready?'ready':''}">${ready?'✓':'⏳'}</span></div>`}).join(''):'<p>Nenhum preparo na fila.</p>';html=specialistSummary('grill','Churrasqueiro')+`<div class="gift-summary"><span class="symbol">🔥</span><div><b>Churrasqueira montada e pronta para produzir</b><small>Os ingredientes são consumidos ao iniciar. A fila continua avançando mesmo quando o jogo está fechado. Os tempos de preparo são exibidos em minutos reais de espera.</small></div></div><h3>📖 Livro de receitas</h3><p>Além dos pratos tradicionais, prepare receitas brasileiras com os peixes que você capturar no lago.</p><div class="grid-cards grill-recipes">${Object.entries(GRILL_RECIPES).filter(([id,r])=>!r.kitchenOnly).map(([id,r])=>{const missing=recipeMissing(r),need=recipeNeedText(r),time=formatHours(r.minutes*GRILL_TIME_FACTOR/60),max=recipeMaxCraftable(r),disabled=max<1;return `<div class="store-card grill-recipe-card"><span class="symbol">${r.icon}</span><strong>${r.name}</strong><small>Ingredientes: ${need}<br/>Tempo: ${time} · Rendimento: ${r.yield}<br/>Em depósito: ${fmt(state.processedWarehouse[id]||0)}</small><b>+${r.xp} XP por lote</b><label>Quantidade de lotes <input type="number" min="1" max="${Math.max(1,max)}" value="1" step="1" data-batch-qty></label><small>Máximo possível: ${max} lote(s)</small><button data-produce-grill="${id}" ${disabled?'disabled':''}>Assar</button>${disabled?`<small class="missing-ingredients">Faltam: ${missing.map(({type,id,qty})=>`${qty} ${ingredientName(type,id)}`).join(', ')}</small>`:''}</div>`}).join('')}</div><h3>⏳ Fila da churrasqueira (${queue.length})</h3>${queueHtml}<div class="actions"><button class="modal-action" data-collect-grill="true" ${readyCount?'':'disabled'}>Recolher pratos prontos (${readyCount})</button><button class="modal-action alt" data-open="warehouse">Abrir depósito</button><button class="modal-action alt" data-open="animals">Gerenciar animais</button><button class="modal-action alt" data-open="shop">Comprar temperos e mel</button></div><p class="historical-note">O guia de 2010 confirma a churrasqueira, o botão Produzir e o livro de receitas. Os nomes dos pratos são históricos; como as quantidades e os tempos da tabela original não puderam ser recuperados em texto legível, os ingredientes, custos, rendimentos e tempos exibidos aqui são balanceamento explícito desta reconstrução, não valores originais confirmados.</p>`;}break;
case 'herb-mix':title='Mix de Ervas';{
const entries=Object.entries(MIX_HERB_RECIPES),seasonings=entries.filter(([id])=>id.startsWith('tempero_')),baths=entries.filter(([id])=>id.startsWith('banho_')),queue=state.herbMix.queue||[],now=Date.now(),ready=queue.filter(j=>j.readyAt<=now).length,total=entries.reduce((n,[id])=>n+(state.inventory['mix_'+id]||0),0);
const queueHtml=queue.length?queue.map(j=>{const r=MIX_HERB_RECIPES[j.recipe],done=j.readyAt<=now,progress=Math.max(0,Math.min(1,(now-j.startedAt)/Math.max(1,j.readyAt-j.startedAt)));return '<div class="queue-line"><div class="queue-icon">'+mixHerbRecipeIconMarkup(j.recipe,r)+'</div><div class="queue-main"><b>'+r.name+'</b><small>'+(done?'Pronto para recolher':'Termina em '+formatHours((j.readyAt-now)/3600000))+'</small><div class="animal-progress"><i style="width:'+Math.round(done?100:progress*100)+'%"></i></div></div><span class="queue-state '+(done?'ready':'')+'">'+(done?'✓':'⏳')+'</span></div>'}).join(''):'<p>Nenhum banho ou tempero na fila.</p>';
const cards=list=>'<div class="grid-cards grill-recipes">'+list.map(([id,r])=>{const missing=recipeMissing(r),stock=state.inventory['mix_'+id]||0,isBath=id.startsWith('banho_'),price=MIX_HERB_SALE_PRICES[id];return '<div class="store-card grill-recipe-card"><span class="symbol">'+mixHerbRecipeIconMarkup(id,r)+'</span><strong>'+r.name+'</strong><small>Ingredientes: '+recipeNeedText(r)+'<br/>Rendimento: '+r.yield+' · Preparo: '+formatHours(r.minutes/60)+'<br/>Em estoque: '+fmt(stock)+' · +'+r.xp+' XP ao recolher</small><p class="historical-note">'+r.note+'</p><button data-mix-herb="'+id+'" '+(missing.length||queue.length>=30?'disabled':'')+'>Iniciar preparo</button>'+(missing.length?'<small class="missing-ingredients">Faltam: '+missing.map(x=>x.qty+' '+ingredientName(x.type,x.id)).join(', ')+'</small>':'')+(isBath?'<b>Venda: 🟡 '+fmt(price)+' moedas/unidade</b>'+(stock>0?'<div class="actions"><input type="number" min="1" max="'+stock+'" step="1" value="1" data-sale-qty="mix:'+id+'" aria-label="Quantidade de '+r.name+' para vender"><button class="modal-action alt" data-sell-herb-mix="'+id+'">Vender</button></div>':'<small>Sem unidades para vender.</small>'):'')+'</div>'}).join('')+'</div>';
html=specialistSummary('alchemist','Alquimista')+'<div class="gift-summary"><span class="symbol">🌿</span><div><b>Mix de Ervas</b><small>Temperos e banhos são preparados aqui. Os ingredientes são consumidos ao iniciar; produto e XP de Alquimista só são recebidos após a conclusão e o recolhimento.</small></div></div><details class="shop-section" data-accordion-key="mix-seasonings" open><summary>🧂 Temperos ('+seasonings.length+')</summary>'+cards(seasonings)+'</details><details class="shop-section" data-accordion-key="mix-baths"><summary>🛁 Banhos ('+baths.length+')</summary>'+cards(baths)+'</details><h3>⏳ Preparos em andamento ('+queue.length+'/30)</h3>'+queueHtml+'<div class="actions"><button class="modal-action" data-collect-herb-mix="true" '+(ready?'':'disabled')+'>Recolher preparados prontos ('+ready+')</button></div><div class="list-line"><span>Preparados prontos no inventário</span><b>'+total+'</b></div><p class="historical-note">Algumas plantas podem apresentar riscos conforme espécie, concentração e forma de uso. Esta funcionalidade é apenas uma representação lúdica de saberes tradicionais.</p>';
}break;

case 'kitchen':title='Cozinha da fazenda';{const queue=state.kitchen.queue||[],now=Date.now(),ready=queue.filter(j=>j.readyAt<=now).length,slotLimit=kitchenSlotLimit();const queueHtml=queue.length?queue.map(j=>{const r=GRILL_RECIPES[j.recipe],done=j.readyAt<=now,progress=Math.max(0,Math.min(1,(now-j.startedAt)/Math.max(1,j.readyAt-j.startedAt)));return '<div class="queue-line"><div class="queue-icon">'+r.icon+'</div><div class="queue-main"><b>'+r.name+' · '+(j.quantity||1)+' lote(s)</b><small>'+(done?'Pronto para recolher':'Termina em '+formatHours((j.readyAt-now)/3600000))+'</small><div class="animal-progress"><i style="width:'+Math.round(done?100:progress*100)+'%"></i></div></div><span class="queue-state '+(done?'ready':'')+'">'+(done?'✓':'⏳')+'</span></div>'}).join(''):'<p>Nenhum preparo na fila.</p>';const recipes=Object.entries(GRILL_RECIPES).filter(([id,r])=>r.kitchenOnly);const card=list=>'<div class="grid-cards grill-recipes">'+list.map(([id,r])=>{const max=recipeMaxCraftable(r),disabled=max<1||queue.length>=kitchenSlotLimit();return '<div class="store-card grill-recipe-card"><span class="symbol">'+r.icon+'</span><strong>'+r.name+'</strong><small>Consumo por lote: '+recipeNeedText(r)+'<br/>Tempo: '+formatHours(r.minutes*KITCHEN_TIME_FACTOR/60)+' · Rendimento base: '+r.yield+'<br/>Em depósito: '+fmt(state.processedWarehouse[id]||0)+' · +'+r.xp+' XP/lote</small><label>Quantidade de lotes <input type="number" min="1" max="'+Math.max(1,max)+'" value="1" step="1" data-batch-qty></label><small>Máximo possível: '+max+' lote(s)</small><button data-cook-recipe="'+id+'" '+(disabled?'disabled':'')+'>Cozinhar</button>'+(max<1?'<small class="missing-ingredients">Ingredientes insuficientes</small>':'')+'</div>'}).join('')+'</div>';const savory=recipes.filter(([id,r])=>!r.gourmet&&r.category!=='sweet'),sweet=recipes.filter(([id,r])=>!r.gourmet&&r.category==='sweet'),gourmetSavory=recipes.filter(([id,r])=>r.gourmet&&r.category!=='sweet'),gourmetSweet=recipes.filter(([id,r])=>r.gourmet&&r.category==='sweet');html='<div class="gift-summary"><span class="symbol">🍳</span><div><b>Fogão e cozinha da fazenda</b><small>Escolha a quantidade de lotes. O estoque limita a produção; o nível de Chef aumenta o rendimento sem aumentar o consumo por lote. Sua cozinha possui '+kitchenSlotLimit()+' espaços no nível '+farmLevel()+', liberando mais 2 espaços a cada nível.</small></div></div>'+specialistSummary('chef','Chef')+'<details class="shop-section" data-accordion-key="kitchen-savory" open><summary>🥘 Receitas salgadas ('+savory.length+')</summary>'+card(savory)+'</details><details class="shop-section" data-accordion-key="kitchen-sweet"><summary>🍰 Receitas doces ('+sweet.length+')</summary>'+card(sweet)+'</details><details class="shop-section" data-accordion-key="kitchen-gourmet-savory"><summary>⭐ Gourmet salgadas ('+gourmetSavory.length+')</summary>'+card(gourmetSavory)+'</details><details class="shop-section" data-accordion-key="kitchen-gourmet-sweet"><summary>🍮 Gourmet doces ('+gourmetSweet.length+')</summary>'+card(gourmetSweet)+'</details><h3>⏳ Preparos na cozinha ('+queue.length+'/'+slotLimit+')</h3>'+queueHtml+'<div class="actions"><button class="modal-action" data-collect-kitchen="true" '+(ready?'':'disabled')+'>Recolher pratos prontos ('+ready+')</button><button class="modal-action alt" data-open="warehouse">Abrir depósito</button></div>';}break;
case 'forest':title='Mata Brasileira';{
const unlocked=unlockedForestPlotCount();
const slots=state.forestPlots.map((tree,i)=>{
 const locked=i>=unlocked,selected=i===selectedForestSlot;
 const cfg=tree?.type?FOREST_TREES[tree.type]:null;
 const ready=cfg&&(tree.status==='ready'||forestProgress(tree)>=1);
 const status=locked?'Bloqueado · nível '+(20+i*2):cfg?(ready?'Pronta para corte':'Em crescimento'):'Livre para plantio';
 return '<button type="button" class="forest-slot-card'+(locked?' is-locked':' is-open')+(selected?' is-selected':'')+'" data-select-forest="'+i+'" '+(locked?'':'')+'><span class="forest-slot-icon">'+(locked?'🔒':cfg?forestIconMarkup(tree.type):'🌱')+'</span><strong>Canteiro '+(i+1)+'</strong><small>'+(cfg?cfg.name:status)+'</small><em>'+(locked?'Bloqueado · NV. '+(20+i*2):status)+'</em></button>';
}).join('');
const t=state.forestPlots[selectedForestSlot],lockedSelected=selectedForestSlot>=unlocked&&!t?.type;
html=specialistSummary('lumberjack','Lenhador')+'<div class="gift-summary"><span class="symbol">🌳</span><div><b>Mata Brasileira · '+unlocked+' / 36 canteiros liberados</b><small>Um novo canteiro é liberado a cada 2 níveis, a partir do nível 20. Os espaços bloqueados permanecem identificados com cadeado.</small></div></div><div class="forest-slot-grid">'+slots+'</div><h3>Canteiro '+(selectedForestSlot+1)+' de 36</h3>';
if(lockedSelected){
 const required=20+selectedForestSlot*2;
 html+='<div class="offline-feature"><span>🔒</span><b>Canteiro bloqueado</b><p>Este espaço será liberado automaticamente no nível '+required+'. Seu nível atual é '+farmLevel()+'.</p></div>';
}else if(t?.type){
 const cfg=FOREST_TREES[t.type],p=forestProgress(t),ready=p>=1||t.status==='ready';
 html+='<div class="store-card"><span class="symbol">'+forestIconMarkup(t.type)+'</span><strong>'+cfg.name+'</strong><small>'+(ready?'Pronta para corte':Math.round(p*100)+'% · '+formatHours((1-p)*cfg.hours*FOREST_TIME_FACTOR)+' restantes')+'<br/>Rendimento: '+cfg.yield+' unidades de '+(cfg.herbYield?'Folhas para o Mix de Ervas':cfg.woodName)+'</small><button data-harvest-forest="'+selectedForestSlot+'" '+(ready?'':'disabled')+'>'+(cfg.fruitCrop?'Colher frutos':cfg.herbYield?'Colher folhas':'Cortar árvore e recolher madeira')+'</button></div>';
}else{
 html+='<p>Escolha uma muda que já esteja no seu inventário.</p><div class="grid-cards">'+FOREST_TREE_IDS.map(id=>[id,FOREST_TREES[id]]).filter(([id,cfg])=>farmLevel()>=cfg.level&&(state.inventory['tree_'+id]||0)>0).map(([id,cfg])=>'<div class="store-card"><span class="symbol">'+forestIconMarkup(id)+'</span><strong>'+cfg.name+'</strong><small>Estoque: '+fmt(state.inventory['tree_'+id]||0)+' '+(cfg.herbYield?'semente(s)':'muda(s)')+'<br/>Crescimento: '+formatHours(cfg.hours*FOREST_TIME_FACTOR)+'<br/>'+(cfg.fruitCrop?'Frutos: '+cfg.yield:cfg.herbYield?'Folhas: '+cfg.yield:'Madeira: '+cfg.yield)+' · Nível '+cfg.level+'</small><button data-plant-forest="'+id+'" data-slot="'+selectedForestSlot+'">Plantar aqui</button></div>').join('')+'</div>';
 if(!FOREST_TREE_IDS.some(id=>{const cfg=FOREST_TREES[id];return farmLevel()>=cfg.level&&(state.inventory['tree_'+id]||0)>0}))html+='<p>Você ainda não possui mudas. Visite a Loja para comprar sementes de árvores.</p>';
}
html+='<h3>🪵 Estoque de madeira</h3>'+Object.entries(state.woodWarehouse).filter(([,n])=>n>0).map(([id,n])=>'<div class="list-line"><span>🪵 '+ingredientName('wood',id)+'</span><b>'+fmt(n)+'</b></div>').join('');
if(!Object.values(state.woodWarehouse).some(n=>n>0))html+='<p>Nenhuma madeira armazenada.</p>';
}break;
case 'sea':title='Pesca em alto-mar';{if(farmLevel()<22){html='<div class="gift-summary"><span class="symbol">🔒</span><div><b>Pesca em alto-mar bloqueada</b><small>Alcance o nível 22 para desbloquear a pesca marítima e comprar ou equipar redes.</small></div></div><p>Continue cultivando, cuidando dos animais e pescando no rio para ganhar experiência.</p>';break;}const net=SEA_NETS[state.seaFishing.net]||SEA_NETS.normal,remaining=Math.max(0,SEA_FISH_COOLDOWN-(Date.now()-(state.seaFishing.lastCastAt||0))),total=Object.values(state.seaWarehouse).reduce((n,v)=>n+v,0);html='<div class="gift-summary"><span class="symbol">🌊</span><div><b>Pesca no mar</b><small>Rede equipada: '+net.name+' · Nível '+farmLevel()+' · '+total+' captura(s) no depósito. Intervalo: 12 segundos.</small></div></div>'+specialistSummary('fisher','Pescador')+'<h3>🪢 Lançar rede</h3><p>As redes melhores alcançam espécies mais raras. Capturas possíveis: peixes marinhos, camarão, lula, polvo, ostra, vieira e mexilhão.</p><button class="modal-action fishing-cast sea-cast" data-cast-sea="true" '+(remaining>0?'disabled':'')+'>'+(remaining>0?'Aguarde '+Math.ceil(remaining/1000)+'s':'Lançar a rede · Pescar no mar')+'</button><h3>🪢 Redes de pesca</h3><div class="grid-cards fishing-rods">'+Object.entries(SEA_NETS).map(([id,r])=>{const owned=state.seaFishing.nets.includes(id),selected=state.seaFishing.net===id,locked=farmLevel()<r.level;let buttons=owned?(selected?'<button disabled>Em uso</button>':'<button data-select-sea-net="'+id+'">Equipar</button>'):'<div class="actions"><button data-buy-sea-net="'+id+'" data-currency="coins" '+(locked||state.coins<r.coins?'disabled':'')+'>🟡 '+fmt(r.coins)+'</button><button class="modal-action alt"  data-buy-sea-net="'+id+'" data-currency="greenCoins" '+(locked||state.greenCoins<r.greenCoins?'disabled':'')+'>🟢 '+fmt(r.greenCoins)+'</button></div>';return '<div class="store-card fishing-rod-card"><span class="symbol">🪢</span><strong>Rede '+r.name+'</strong><small>Nível '+r.level+(locked?' · Bloqueada':'')+'<br/>'+(owned?(selected?'Equipada':'Adquirida'):('Preço: 🟡 '+fmt(r.coins)+' ou 🟢 '+fmt(r.greenCoins)))+'<br/>Raridade máxima: '+(r.extraordinaryOnly?'Exclusiva para capturas extraordinárias':['Comum','Incomum','Raro','Muito raro','Lendário'][r.order])+'</small>'+buttons+'</div>'}).join('')+'</div><h3>🐟 Capturas no depósito</h3>'+Object.entries(SEA_TYPES).filter(([id])=>(state.seaWarehouse[id]||0)>0).map(([id,f])=>'<div class="list-line"><span>'+f.icon+' <b>'+f.name+'</b><br/><small>'+f.rarity+' · +'+f.xp+' XP</small></span><b>'+fmt(state.seaWarehouse[id])+'</b></div>').join('');if(!total)html+='<p>Nenhuma captura marinha ainda.</p>';html+='<p class="historical-note">A lista é limitada às espécies solicitadas: peixes, camarão, lula, polvo, ostra, vieira e mexilhão.</p>';}break;
case 'lake':title='Lago artificial · Piscicultura';html=renderLakeModal();break;
case 'lake':title='Lago artificial · Piscicultura';html=renderLakeModal();break;
case 'carpentry':title='Marcenaria do celeiro';const woodQueue=state.carpentry?.queue||[],woodReady=woodQueue.filter(j=>j.readyAt<=Date.now());html='<div class="gift-summary"><span class="symbol">🪚</span><div><b>Oficina de móveis e decoração</b><small>A madeira é consumida ao iniciar; recolha o item quando a fabricação terminar para receber XP de Marceneiro.</small></div></div>'+specialistSummary('carpenter','Marceneiro')+'<h3>⏳ Fila de fabricação ('+woodQueue.length+'/100)</h3>'+(woodQueue.length?'<div class="queue-list">'+woodQueue.map(j=>{const r=WOODWORK_RECIPES[j.recipe],remaining=Math.max(0,j.readyAt-Date.now());return '<div class="list-line"><span>'+r.icon+' <b>'+r.name+'</b><br/><small>'+(remaining>0?'Em fabricação · '+Math.ceil(remaining/60000)+' min restantes':'Pronto para recolher')+'</small></span><span class="queue-state '+(remaining>0?'':'ready')+'">'+(remaining>0?'⏳':'✓ Pronto')+'</span></div>'}).join('')+'</div><button class="modal-action" data-collect-woodwork="true" '+(woodReady.length?'':'disabled')+'>Recolher itens prontos ('+woodReady.length+')</button>':'<p>Nenhum item em fabricação.</p>')+'<h3>🪵 Madeira disponível</h3>'+Object.entries(state.woodWarehouse).filter(([,n])=>n>0).map(([id,n])=>'<div class="list-line"><span>🪵 '+ingredientName('wood',id)+'</span><b>'+fmt(n)+'</b></div>').join('');if(!Object.values(state.woodWarehouse).some(n=>n>0))html+='<p>Obtenha madeira cortando árvores na Mata.</p>';html+='<h3>🪑 Catálogo de fabricação</h3><div class="grid-cards">'+Object.entries(WOODWORK_RECIPES).map(([id,r])=>{const have=state.woodWarehouse[r.wood]||0,owned=state.furnitureWarehouse[id]||0;return '<div class="store-card"><span class="symbol">'+r.icon+'</span><strong>'+r.name+'</strong><small><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:'+r.tone+';vertical-align:middle"></span> Acabamento: '+r.color+'<br/>Material: '+r.qty+' × '+ingredientName('wood',r.wood)+'<br/>Disponível: '+have+' · Fabricados: '+owned+'<br/>Sem moedas ou tinta</small><button data-craft-wood="'+id+'" '+(have<r.qty||woodQueue.length>=100?'disabled':'')+'>Iniciar fabricação · '+(r.minutes||Math.max(25,20+r.qty*9+(r.lakeBridge?35:0)))+' min</button></div>'}).join('')+'</div><h3>📦 Itens fabricados</h3>'+Object.entries(WOODWORK_RECIPES).filter(([id])=>(state.furnitureWarehouse[id]||0)>0).map(([id,r])=>'<div class="list-line"><span>'+r.icon+' <b>'+r.name+'</b></span><b>'+fmt(state.furnitureWarehouse[id])+'</b></div>').join('');if(!Object.values(state.furnitureWarehouse).some(n=>n>0))html+='<p>Nenhum móvel fabricado ainda.</p>';break;
case 'assistant':title='Assistente da fazenda';html=`<p>Registro das atividades recentes da sua propriedade.</p>${renderHistory()}`;break;
case 'friends':title='Fazenda dos amigos';if(!cloudUser){html='<div class="gift-summary"><span class="symbol">🔐</span><div><b>Entre na sua conta para acessar os amigos</b><small>O sistema online utiliza as contas já cadastradas no jogo.</small></div></div><button class="modal-action" data-open="account">Entrar ou criar conta</button>';break;}html='<div class="gift-summary"><span class="symbol">👥</span><div><b>'+onlineFriends.length+' amigo(s) online</b><small>Encontre jogadores pelo código exclusivo ou pelo nome da fazenda.</small></div></div><div class="gift-summary"><span class="symbol">🆔</span><div><b>Meu código de jogador</b><small>Compartilhe este código para que outras pessoas encontrem sua fazenda.</small><strong style="display:block;font-size:1.25rem;letter-spacing:2px;margin-top:6px">'+(onlinePlayerCode||'Código indisponível')+'</strong></div></div><div class="actions"><button class="modal-action" data-copy-player-code="true" '+(onlinePlayerCode?'':'disabled')+'>Copiar meu código</button><button class="modal-action alt" data-social-refresh="true">Atualizar lista</button><button class="modal-action alt" data-open="inbox">Caixa de entrada'+(onlineNotifications.filter(n=>!n.read_at).length?' · '+onlineNotifications.filter(n=>!n.read_at).length+' não lida(s)':'')+'</button></div><h3>🔒 Privacidade da fazenda</h3><div class="gift-summary"><span class="symbol">🛡️</span><div><b>Visitas de amigos</b><small>'+(farmVisitSettings.allow_visits?'Seus amigos podem visitar sua fazenda.':'As visitas estão bloqueadas para todos os amigos.')+' Curtidas recebidas: '+fmt(farmVisitSettings.like_count||0)+'</small></div></div><div class="actions"><button class="modal-action alt" data-farm-visit-toggle="true">'+(farmVisitSettings.allow_visits?'Bloquear visitas':'Permitir visitas de amigos')+'</button></div><h3>🔎 Encontrar jogadores pelo código</h3><div class="actions"><input id="social-player-code-search" type="text" maxlength="11" placeholder="Ex.: CF-A1B2C3D4" style="flex:1;min-width:150px;text-transform:uppercase"><button class="modal-action" data-social-code-search="true">Buscar código</button></div><div class="social-results">'+(onlineCodeSearchResult?'<div class="list-line"><span><b>👨‍🌾 '+safe(onlineCodeSearchResult.farm_name)+'</b><br><small>Nível '+fmt(onlineCodeSearchResult.level)+' · Popularidade '+fmt(onlineCodeSearchResult.popularity)+'</small></span><button class="modal-action compact" data-social-add="'+safe(onlineCodeSearchResult.user_id)+'">Adicionar</button></div>':'<p>Digite o código compartilhado por outro jogador.</p>')+'</div><h3>🔎 Encontrar jogadores pelo nome da fazenda</h3><div class="actions"><input id="social-player-search" type="search" maxlength="40" placeholder="Nome da fazenda (mín. 2 caracteres)" style="flex:1;min-width:150px"><button class="modal-action" data-social-search="true">Pesquisar</button></div><div class="social-results">'+(onlineSearchResults.length?onlineSearchResults.map(p=>'<div class="list-line"><span><b>👨‍🌾 '+safe(p.farm_name)+'</b><br><small>Nível '+fmt(p.level)+' · Popularidade '+fmt(p.popularity)+'</small></span>'+(p.relationship==='friend'?'<span class="queue-state ready">Amigo</span>':p.relationship==='pending'?'<span class="queue-state">Pendente</span>':'<button class="modal-action compact" data-social-add="'+safe(p.user_id)+'">Adicionar</button>')+'</div>').join(''):'<p>Pesquise pelo nome da fazenda para encontrar outros jogadores.</p>')+'</div><h3>📨 Solicitações recebidas ('+onlineFriendRequests.length+')</h3>'+(onlineFriendRequests.length?onlineFriendRequests.map(q=>'<div class="list-line"><span><b>👨‍🌾 '+safe(q.farm_name)+'</b><br><small>Nível '+fmt(q.level)+'</small></span><span class="actions"><button class="modal-action compact" data-social-accept="'+safe(q.id)+'">Aceitar</button><button class="modal-action alt compact" data-social-reject="'+safe(q.id)+'">Recusar</button></span></div>').join(''):'<p>Nenhuma solicitação pendente.</p>')+'<h3>🌾 Meus amigos</h3>'+(onlineFriends.length?onlineFriends.map(f=>'<div class="list-line"><span><b>👨‍🌾 '+safe(f.farm_name)+'</b><br><small>Nível '+fmt(f.level)+' · Popularidade '+fmt(f.popularity)+'</small></span><span class="actions"><button class="modal-action compact" data-visit-farm="'+safe(f.user_id)+'">Visitar</button><button class="modal-action alt compact" data-conversation="'+safe(f.user_id)+'">Conversar</button></span></div>').join(''):'<p>Sua lista ainda está vazia. Encontre jogadores e envie uma solicitação.</p>')+'<p class="historical-note">Seu perfil público mostra somente nome da fazenda, nível e popularidade. O salvamento completo continua privado.</p>';break;
case 'friend-farm':title='Fazenda do amigo';html=renderVisitedFarm();break;
case 'inbox':title='Caixa de entrada';if(!cloudUser){html='<div class="gift-summary"><span class="symbol">🔐</span><div><b>Entre na sua conta para acessar as mensagens</b><small>As mensagens privadas e notificações são sincronizadas online.</small></div></div><button class="modal-action" data-open="account">Entrar ou criar conta</button>';break;}html=renderOnlineInbox();break;
case 'daily':title='Recompensa diária';html=dailyRewardAvailable()?`<div class="daily-reward"><span>🎁</span><b>Seu presente de hoje está esperando!</b><p>Receba sementes, fertilizantes ou flores. A quantidade cresce com sua sequência de visitas (até 5 itens nesta adaptação offline).</p><p><b>Sequência atual: ${fmt((state.dailyRewardDate===yesterdayKey()?(state.dailyStreak||0)+1:1))} dia(s)</b></p><button class="modal-action" data-claim-daily="true">Resgatar recompensa</button></div>`:`<div class="daily-reward claimed"><span>🌟</span><b>Recompensa de hoje já recebida!</b><p>Sequência atual: ${fmt(state.dailyStreak||1)} dia(s). Volte amanhã para receber outra recompensa.</p></div>`;break;
case 'help':title='Ajuda por seções';html=renderDynamicHelp();break;
case 'account':title='Conta e salvamento na nuvem';if(!initSupabase()){html='<p>O serviço de autenticação não carregou. Verifique sua conexão e recarregue a página. O jogo permanece bloqueado até que seja possível conectar à nuvem.</p>';break;}if(cloudUser){html=`<div class="account-card"><b>☁️ Conta conectada</b><p>${safe(cloudUser.email||'Jogador')}</p><small>${cloudConflict?'Conflito detectado: outra sessão possui uma versão mais recente. As alterações desta sessão estão preservadas apenas enquanto esta página permanecer aberta.':writeLocked?'Aguardando carregamento ou recuperação da fazenda na nuvem.':'Sua fazenda está salva exclusivamente na nuvem.'}</small></div><div class="gift-summary"><span class="symbol">🔎</span><div><b>Diagnóstico de integridade</b><small>Compara os dados desta sessão com o registro da nuvem sem modificar ou recuperar informações automaticamente.</small></div></div><div class="actions"><button class="modal-action alt" id="cloud-integrity-check" ${cloudIntegrityChecking||cloudSessionReadyUserId!==cloudUser.id?'disabled':''}>${cloudIntegrityChecking?'Verificando dados...':'Verificar consistência dos dados'}</button></div>${cloudIntegrityReport?.error?'<p class="historical-note">Falha no diagnóstico: '+safe(cloudIntegrityReport.error)+'</p>':renderFarmIntegrityReport()}${cloudConflict?`<div class="gift-summary"><span class="symbol">⚠️</span><div><b>Conflito de sincronização</b><small>Para evitar perda de dados, nenhuma gravação será feita automaticamente. Carregar a nuvem substituirá as alterações ainda não sincronizadas desta página.</small></div></div><div class="actions"><button class="modal-action" id="cloud-resolve-load">Carregar versão mais recente da nuvem</button></div>`:''}<div class="actions"><button class="modal-action" id="cloud-sync" ${cloudConflict?'disabled':''}>Carregar / sincronizar nuvem</button><button class="modal-action alt" id="cloud-signout">Sair da conta</button></div><div class="gift-summary"><span class="symbol">🕘</span><div><b>Histórico de sincronização</b><small>Eventos recentes desta sessão, com data e horário. Este diagnóstico não altera nem substitui o salvamento da fazenda.</small></div></div><div id="cloud-sync-history">${renderCloudSyncHistory()}</div><p><small>O progresso do jogo é salvo somente na nuvem e fica privado na sua conta. Sem conexão, alterações não podem ser persistidas.</small></p>`;}else{html=`<div class="gift-summary"><span class="symbol">☁️</span><div><b>Entre para jogar</b><small>O jogo utiliza salvamento exclusivamente na nuvem. É necessário entrar ou criar uma conta antes de acessar sua fazenda.</small></div></div><label class="auth-field">E-mail<input id="auth-email" type="email" autocomplete="email" placeholder="seu@email.com"></label><label class="auth-field">Senha<input id="auth-password" type="password" autocomplete="current-password" placeholder="Mínimo de 6 caracteres"></label><div class="actions"><button class="modal-action" id="auth-signin">Entrar</button><button class="modal-action alt" id="auth-signup">Criar conta</button></div><p><small>O cadastro pode exigir confirmação do endereço de e-mail, conforme as configurações de autenticação do projeto Supabase.</small></p>`;}break;
case 'settings':title='Configurações e backup';html=`<p>O progresso é salvo automaticamente e exclusivamente na nuvem. O arquivo JSON abaixo é um backup manual opcional, exportado somente quando você solicitar.</p><div class="audio-settings"><h3>🔊 Mixer de áudio</h3><label><input id="sound-toggle" type="checkbox" ${soundEnabled?'checked':''}> Efeitos sonoros e notificações</label><label><input id="music-toggle" type="checkbox" ${musicEnabled?'checked':''}> Música do jogo</label><div class="audio-mixer-control"><label for="music-volume">🎵 Volume da música <output id="music-volume-value">${musicVolume}%</output></label><input id="music-volume" type="range" min="0" max="100" step="1" value="${musicVolume}"></div><div class="audio-mixer-control"><label for="sfx-volume">🔔 Volume dos efeitos e notificações <output id="sfx-volume-value">${sfxVolume}%</output></label><input id="sfx-volume" type="range" min="0" max="100" step="1" value="${sfxVolume}"></div><label for="music-mode">🎼 Reprodução das músicas</label><select id="music-mode"><option value="random" ${musicMode==='random'?'selected':''}>Aleatória, sem repetir até tocar as nove músicas</option><option value="sequential" ${musicMode==='sequential'?'selected':''}>Em sequência</option></select><small>Nove músicas gerais e trilhas próprias para a pesca no rio e no mar. As faixas mudam com transições suaves.</small></div><div class="actions"><button class="modal-action" data-export="true">Exportar backup JSON</button><button class="modal-action alt" data-import="true">Importar backup JSON</button></div><div class="actions"><button class="modal-action danger" data-reset="true">Reiniciar fazenda (com confirmação)</button></div><input type="file" id="import-file" accept="application/json,.json">`;break;
}
$('modal-title').textContent=title;body.innerHTML=html;body.scrollTop=modalScrollTop;
if(currentModal==='inventory'){
 const sortSelect=$('inventory-sort');
 if(sortSelect)sortSelect.addEventListener('change',()=>{inventorySortMode=['default','alphabetical','available'].includes(sortSelect.value)?sortSelect.value:'default';sortSelect.blur();requestAnimationFrame(()=>{if(currentModal==='inventory')renderModal();});});
}
if(currentModal==='settings'){
 const sound=$('sound-toggle'),music=$('music-toggle'),musicSlider=$('music-volume'),sfxSlider=$('sfx-volume'),mode=$('music-mode');
 if(sound)sound.addEventListener('change',()=>setSoundEnabled(sound.checked));
 if(music)music.addEventListener('change',()=>setMusicEnabled(music.checked));
 if(musicSlider)musicSlider.addEventListener('input',()=>setMusicVolume(musicSlider.value));
 if(sfxSlider)sfxSlider.addEventListener('input',()=>setSfxVolume(sfxSlider.value));
 if(mode)mode.addEventListener('change',()=>setMusicMode(mode.value));
}
if(currentModal==='friends'&&cloudUser&&!onlineSocialLoaded){refreshOnlineSocial(false)}else if(currentModal==='friends'&&cloudUser&&!onlineInboxLoaded){refreshOnlineInbox(false)}
if(currentModal==='inbox'&&cloudUser&&!onlineInboxLoaded){refreshOnlineInbox(false)}
if(currentModal==='gifts'&&cloudUser&&!onlineGiftsLoaded){refreshOnlineGifts(false)}
 if(currentModal==='account'){
 $('cloud-integrity-check')?.addEventListener('click',runFarmIntegrityCheck);
 $('cloud-resolve-load')?.addEventListener('click',async()=>{if(!cloudConflict||!cloudUser)return;if(!confirm('Carregar a versão mais recente da nuvem? As alterações ainda não sincronizadas desta página serão descartadas.'))return;const button=$('cloud-resolve-load');if(button){button.disabled=true;button.textContent='Carregando versão da nuvem...'}try{const {data,error}=await supabaseClient.from('farm_saves').select('state,revision,updated_at').eq('user_id',cloudUser.id).maybeSingle();if(error)throw error;if(!data)throw new Error('Nenhum salvamento foi encontrado na nuvem.');const restored=normalizeFarmSnapshot(data.state);if(!restored)throw new Error('A versão mais recente da nuvem está em formato inválido.');state=restored;cloudRevision=Number(data.revision)||1;cloudUpdatedAt=data.updated_at||null;clearCloudRetry();cloudRetryAttempt=0;cloudRetryContext=null;cloudPermanentSaveError=null;cloudConflict=false;cloudDirty=false;dirty=false;writeLocked=false;clearTimeout(saveTimer);saveTimer=null;cloudSessionReadyUserId=cloudUser.id;recordCloudSyncEvent('success','Versão mais recente recuperada da nuvem','Revisão '+cloudRevision+'.');$('save-status').textContent='Versão mais recente carregada da nuvem';$('save-dot').className='savedot';refresh();notify('Conflito resolvido. A versão mais recente da nuvem foi carregada.');renderModal()}catch(error){console.error('Recuperação de conflito:',error);if(button){button.disabled=false;button.textContent='Tentar carregar novamente'}notify('Não foi possível recuperar a versão da nuvem: '+(error.message||'verifique sua conexão.'))}});
 $('auth-signin')?.addEventListener('click',()=>authenticate('signin'));
 $('auth-signup')?.addEventListener('click',()=>authenticate('signup'));
 $('cloud-signout')?.addEventListener('click',disconnectCloud);
 $('cloud-sync')?.addEventListener('click',async()=>{if(dirty){await save();return}if(cloudDirty){try{await saveCloud();$('save-status').textContent='Salvo na nuvem';$('save-dot').className='savedot';notify('Fazenda sincronizada com a nuvem.')}catch(error){notify('Falha ao sincronizar: '+(error.message||'tente novamente.'))}return}cloudSessionReadyUserId=null;await handleAuthSession({user:cloudUser})});
}
if(['shop','warehouse'].includes(currentModal)){
 const headings=[...body.querySelectorAll(':scope > h3')];
 headings.forEach((heading,index)=>{
  const section=document.createElement('section');section.className='shop-section';section.id=`shop-section-${index}`;
  const toggle=document.createElement('button');toggle.type='button';toggle.className='shop-category-toggle';toggle.setAttribute('aria-expanded',index===0?'true':'false');toggle.innerHTML=`<span>${heading.textContent.trim()}</span><b class="shop-category-chevron">${index===0?'−':'＋'}</b>`;
  const content=document.createElement('div');content.className='shop-section-content';if(index!==0)content.hidden=true;
  let cursor=heading.nextSibling;
  while(cursor&&cursor.tagName!=='H3'){const next=cursor.nextSibling;content.appendChild(cursor);cursor=next;}
  section.append(toggle,content);heading.replaceWith(section);
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));content.hidden=open;toggle.querySelector('.shop-category-chevron').textContent=open?'＋':'−';});
 });
 if(accordionOpen?.length){[...body.querySelectorAll('.shop-section')].forEach((section,index)=>{const toggle=section.querySelector('.shop-category-toggle'),content=section.querySelector('.shop-section-content');if(!toggle||!content||accordionOpen[index]===undefined)return;const open=accordionOpen[index];toggle.setAttribute('aria-expanded',String(open));content.hidden=!open;const icon=toggle.querySelector('.shop-category-chevron');if(icon)icon.textContent=open?'−':'＋';});}
}
if(detailOpen){for(const section of body.querySelectorAll('details[data-accordion-key]')){const key=section.dataset.accordionKey;if(Object.prototype.hasOwnProperty.call(detailOpen,key))section.open=detailOpen[key];}}
if(['shop','warehouse','inventory','herb-mix','kitchen'].includes(currentModal)){body.scrollTop=modalScrollTop;requestAnimationFrame(()=>{body.scrollTop=modalScrollTop;});}

$('dialog').classList.toggle('wide',['shop','inventory','warehouse','factory','decor','grill','kitchen','herb-mix','carpentry','free-gifts','mood','gifts','areas','orchard','animals','friend-farm'].includes(currentModal));
}
function popularityBonusRate(){return Math.min(.25,Math.floor((state.popularity||0)/100)*.01)}
function saleWithPopularity(base){return Math.floor(base*(1+popularityBonusRate()))}
function toggleCropLock(id){if(writeLocked)return notify('Salvamento protegido.');if(!FIELD_CROP_IDS.includes(id))return;state.warehouseLocks[id]=!state.warehouseLocks[id];remember(`${state.warehouseLocks[id]?'Bloqueou':'Desbloqueou'} a venda de ${CROPS[id].name}.`);markDirty();refresh()}
function saleQuantity(kind,id,available){const field=$('modal-body').querySelector(`[data-sale-qty="${kind}:${id}"]`),raw=field?Number(field.value):1;if(!Number.isSafeInteger(raw)||raw<1)return notify('Informe uma quantidade inteira maior que zero.'),0;if(raw>available)return notify(`Quantidade indisponível. Estoque atual: ${fmt(available)}.`),0;return raw}
function sellCrop(id,requested){if(writeLocked)return notify('Salvamento protegido.');if(state.warehouseLocks?.[id])return notify('Esta colheita está bloqueada contra venda acidental. Desbloqueie-a no depósito.');const available=state.warehouse[id]||0;if(!available)return;const num=requested===undefined?available:requested;if(!Number.isSafeInteger(num)||num<1||num>available)return notify('Quantidade de venda inválida.');const money=saleWithPopularity(num*CROPS[id].unitPrice);state.coins+=money;state.warehouse[id]-=num;remember(`Vendeu ${num} ${CROPS[id].name} com bônus de popularidade.`);markDirty();refresh();notify(`Venda realizada: ${num} unidade(s) · +${fmt(money)} moedas (${Math.round(popularityBonusRate()*100)}% de bônus)`)}
function toggleFlowerLock(id){if(!farmWriteAllowed())return;if(!FLOWER_IDS.includes(id))return;state.flowerLocks[id]=!state.flowerLocks[id];remember(`${state.flowerLocks[id]?'Bloqueou':'Desbloqueou'} a venda de ${CROPS[id].name}.`);markDirty();refresh()}
function sellFlower(id,requested){if(!farmWriteAllowed())return;const cfg=CROPS[id],available=state.flowerWarehouse[id]||0;if(!cfg||cfg.kind!=='flower'||available<=0)return;if(state.flowerLocks[id])return notify('Esta flor está bloqueada contra venda acidental. Desbloqueie-a no depósito.');const num=requested===undefined?available:requested;if(!Number.isSafeInteger(num)||num<1||num>available)return notify('Quantidade de venda inválida.');const money=saleWithPopularity(num*cfg.unitPrice);state.coins+=money;state.flowerWarehouse[id]-=num;remember(`Vendeu ${num} ${cfg.name} com bônus de popularidade.`);markDirty();refresh();notify(`Flores vendidas: ${num} unidade(s) · +${fmt(money)} moedas.`)}
function makeBouquet(id){if(writeLocked)return notify('Salvamento protegido. Abra Configurações.');const recipe=BOUQUETS[id];if(!recipe)return;const missing=Object.entries(recipe.recipe).filter(([flower,amount])=>(state.flowerWarehouse[flower]||0)<amount);if(missing.length)return notify('Ainda faltam flores para este buquê.');for(const [flower,amount] of Object.entries(recipe.recipe))state.flowerWarehouse[flower]-=amount;state.bouquets[id]=(state.bouquets[id]||0)+1;discoverItem('buques',id,recipe.name,recipe.icon);state.popularity+=recipe.popularity;awardXP(recipe.xp,'fábrica de buquês');remember(`Fabricou ${recipe.name}: +${recipe.popularity} de popularidade.`);markDirty();refresh();notify(`${recipe.name} produzido! +${recipe.popularity} popularidade · +${recipe.xp} XP.`)}
function downloadBackup(){const snapshot=normalizeFarmSnapshot(state);if(!snapshot)return notify('O estado atual não passou pela verificação de integridade. O backup não foi exportado.');const data=JSON.stringify({version:2,exportedAt:new Date().toISOString(),state:snapshot},null,2),blob=new Blob([data],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='ColheitaFeliz2-backup-'+new Date().toISOString().slice(0,10)+'.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),800)}
async function importBackup(file){if(writeLocked||!cloudUser||cloudSessionReadyUserId!==cloudUser.id)return notify('Entre na sua conta e carregue a fazenda da nuvem antes de importar um backup.');if(!file||file.size>8*1024*1024)return notify('Arquivo inválido ou maior que 8 MB.');try{const parsed=JSON.parse(await file.text()),data=[1,2].includes(parsed?.version)?normalizeFarmSnapshot(parsed.state):null;if(!data)throw Error('integridade');if(!confirm('Substituir a fazenda atual pelo conteúdo deste backup validado?'))return;state=data;writeLocked=false;markDirty();refresh();closeModal();notify('Backup validado e importado!')}catch(e){console.warn('Backup rejeitado:',e);notify('O backup está corrompido, incompleto ou não é compatível. A fazenda atual foi mantida.')}}
function updateSceneLandscapeVisibility(){
 // O Mar usa um fundo próprio que cobre a área inteira do playfield.
 $('playfield')?.classList.toggle('sea-scene-active',activeScene==='sea');
 // Fazenda e Rio são regiões contíguas do mesmo mundo; manter ambas as imagens
 // visíveis evita que uma área revele um vazio ou um cenário independente.
 const farmLandscape=$('farm-landscape');
 if(farmLandscape)farmLandscape.style.display=activeScene==='sea'?'none':'';
 const riverLandscape=$('river-landscape');
 if(riverLandscape)riverLandscape.style.display=activeScene==='sea'?'none':'';
 const natureLandscape=$('nature-landscape');
 if(natureLandscape)natureLandscape.style.display=activeScene==='sea'?'none':'';
 const waterMotion=$('river-water-motion');
 if(waterMotion)waterMotion.classList.toggle('is-active',activeScene==='river');
}
function sceneFitZoom(id=activeScene){const b=SCENE_BOUNDS[id]||SCENE_BOUNDS.farm,rect=svg.getBoundingClientRect(),aspect=Math.max(.25,rect.width/Math.max(1,rect.height)),width=b.right-b.left,height=b.bottom-b.top,mobileViewport=matchMedia('(max-width:700px), (max-height:500px) and (pointer:coarse)').matches,fitHeight=id==='sea'?height:mobileViewport?height:Math.max(height,width/aspect);return Math.max(.08,Math.min(2.5,WORLD.h/fitHeight*(id==='sea'?.985:mobileViewport?1.005:.985)))}
function updateView(){const b=SCENE_BOUNDS[activeScene]||SCENE_BOUNDS.farm,rect=svg.getBoundingClientRect(),aspect=rect.width/Math.max(1,rect.height),minZoom=sceneFitZoom(activeScene),v=Math.min(2.5,Math.max(minZoom,view.zoom));view.zoom=v;const h=WORLD.h/v,w=h*aspect,minX=b.left+w/2,maxX=b.right-w/2,minY=b.top+h/2,maxY=b.bottom-h/2;view.cx=minX>maxX?(b.left+b.right)/2:Math.max(minX,Math.min(maxX,view.cx));view.cy=minY>maxY?(b.top+b.bottom)/2:Math.max(minY,Math.min(maxY,view.cy));svg.setAttribute('viewBox',`${view.cx-w/2} ${view.cy-h/2} ${w} ${h}`);$('zoom-label').textContent=`${Math.round(v*100)}%`;document.querySelectorAll('[data-farm-scene]').forEach(button=>{const active=button.dataset.farmScene===activeScene;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))})}
function setZoom(next){view.zoom=Math.round(Math.max(sceneFitZoom(activeScene),Math.min(2.5,next))*100)/100;updateView()}
function fitWholeFarm(){const b=SCENE_BOUNDS[activeScene]||SCENE_BOUNDS.farm;view.cx=(b.left+b.right)/2;view.cy=(b.top+b.bottom)/2;view.zoom=sceneFitZoom(activeScene);updateView()}
function switchFarmScene(id){if(!SCENE_BOUNDS[id])return;if(id===activeScene){fitWholeFarm();return}const previous=activeScene;cancelAnimationFrame(sceneAnimationFrame);activeScene=id;if(id==='sea')setMusicContext('sea');else if(previous==='sea')setMusicContext('general');updateSceneLandscapeVisibility();if(id==='sea'){const groundLayer=$('ground-layer');if(groundLayer){groundLayer.querySelector('#sea-landscape')?.remove();groundLayer.insertAdjacentHTML('beforeend',renderSeaLandscapeMarkup())}}else if(previous==='sea')$('ground-layer')?.querySelector('#sea-landscape')?.remove();if(id==='sea'||previous==='sea')renderFarmAddons();renderWeatherRain();const b=SCENE_BOUNDS[id];view.cx=(b.left+b.right)/2;view.cy=(b.top+b.bottom)/2;view.zoom=sceneFitZoom(id);svg.style.transition='opacity .16s ease';svg.style.opacity='.35';updateView();requestAnimationFrame(()=>{svg.style.opacity='1'})}
function panView(direction){const order=['river','farm','nature','sea'],index=order.indexOf(activeScene),next=order[Math.max(0,Math.min(order.length-1,index+Math.sign(direction)))];if(next!==activeScene)switchFarmScene(next)}
let drag=null,selectedForestSlot=0,activePointers=new Map(),pinchState=null,suppressWorldClickUntil=0;
function setupEvents(){
svg.addEventListener('click',e=>{const riverBag=e.target.closest?.('[data-river-backpack]');if(riverBag){e.preventDefault();e.stopPropagation();if(!drag&&Date.now()>suppressWorldClickUntil)openModal('pond');return}const riverRod=e.target.closest?.('[data-river-rod]');if(riverRod){e.preventDefault();e.stopPropagation();if(!drag&&Date.now()>suppressWorldClickUntil)castFishingRod();return}const bag=e.target.closest?.('[data-sea-bag]');if(bag){e.preventDefault();e.stopPropagation();if(!drag&&Date.now()>suppressWorldClickUntil)openModal('sea');return}const net=e.target.closest?.('[data-sea-net]');if(net){e.preventDefault();e.stopPropagation();if(!drag&&Date.now()>suppressWorldClickUntil)castSeaNet();return}},true);
svg.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const riverBag=e.target.closest?.('[data-river-backpack]'),riverRod=e.target.closest?.('[data-river-rod]'),bag=e.target.closest?.('[data-sea-bag]'),net=e.target.closest?.('[data-sea-net]');if(!riverBag&&!riverRod&&!bag&&!net)return;e.preventDefault();if(riverBag)openModal('pond');else if(riverRod)castFishingRod();else if(bag)openModal('sea');else castSeaNet()});
$('garden-layer').addEventListener('click',e=>{const hit=e.target.closest('[data-i]');if(hit&&!drag&&Date.now()>suppressWorldClickUntil)plotAction(Number(hit.dataset.i))});$('foreground-layer').addEventListener('click',e=>{const fishing=e.target.closest('[data-river-fishing]');if(fishing){e.preventDefault();e.stopPropagation();openModal('pond');return}const sign=e.target.closest('[data-farm-sign]');if(sign&&!drag&&Date.now()>suppressWorldClickUntil)openModal('profile')});$('foreground-layer').addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest('[data-farm-sign]')){e.preventDefault();openModal('profile')}});$('decoration-layer').addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest('[data-river-fishing]')){e.preventDefault();openModal('pond')}});
$('decoration-layer').addEventListener('click',e=>{if(e.target.closest('[data-river-fishing]')&&!drag&&Date.now()>suppressWorldClickUntil){openModal('pond');return}if(e.target.closest('[data-lake-open]')&&!drag){openModal('lake');return}const hit=e.target.closest('[data-orchard-slot]');if(hit&&!drag&&Date.now()>suppressWorldClickUntil)harvestOrchardTree(Number(hit.dataset.orchardSlot))});$('decoration-layer').addEventListener('click',e=>{const hit=e.target.closest('[data-forest-slot]');if(hit&&!drag){selectedForestSlot=Number(hit.dataset.forestSlot);openModal('forest')}});
$('animal-layer').addEventListener('click',e=>{const hit=e.target.closest('[data-animal-id]');if(!hit||drag||Date.now()<=suppressWorldClickUntil)return;const a=state.animals.find(x=>x.id===hit.dataset.animalId);if(!a)return;const cfg=ANIMALS[a.type];if(a.status==='hungry'&&(state.inventory[cfg.feedKey]||0)>0){feedAnimal(a.id)}else openModal('animals')});
$('garden-layer').addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.dataset.i){e.preventDefault();plotAction(Number(e.target.dataset.i))}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-modal]');if(!b||b.closest('#modal-body'))return;e.preventDefault();e.stopPropagation();openModal(b.dataset.modal)},true);
document.querySelectorAll('[data-area-nav="forest"]').forEach(b=>b.addEventListener('click',()=>{focusForestArea(false);selectedForestSlot=0;openModal('forest')}));

document.querySelectorAll('.tool').forEach(b=>b.addEventListener('click',()=>setTool(b.dataset.tool)));
$('orientation-toggle')?.addEventListener('click',toggleLandscapeMode);$('orientation-toggle-mobile')?.addEventListener('click',toggleLandscapeMode);
const bottomNavToggle=$('bottom-nav-toggle');let bottomNavVisible=true;try{bottomNavVisible=localStorage.getItem('cf2-bottom-navigation-hidden')!=='1'}catch{}
const applyBottomNavVisibility=visible=>{bottomNavVisible=!!visible;document.querySelector('.app')?.classList.toggle('bottom-navigation-hidden',!bottomNavVisible);if(bottomNavToggle){bottomNavToggle.textContent=bottomNavVisible?'⌄':'⌃';bottomNavToggle.setAttribute('aria-pressed',String(bottomNavVisible));bottomNavToggle.setAttribute('aria-label',bottomNavVisible?'Ocultar barra inferior':'Mostrar barra inferior');bottomNavToggle.title=bottomNavVisible?'Ocultar barra inferior':'Mostrar barra inferior'}};
applyBottomNavVisibility(bottomNavVisible);
bottomNavToggle?.addEventListener('click',()=>{applyBottomNavVisibility(!bottomNavVisible);try{localStorage.setItem('cf2-bottom-navigation-hidden',bottomNavVisible?'0':'1')}catch{}});$('close-modal').addEventListener('click',closeModal);$('overlay').addEventListener('click',e=>{if(e.target===$('overlay'))closeModal()});
$('modal-body').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
if(d.socialSearch)searchOnlinePlayers();if(d.socialCodeSearch)searchOnlinePlayerByCode();if(d.markAllNotifications)markAllOnlineNotificationsRead();if(d.copyPlayerCode)copyOnlinePlayerCode();if(d.socialRefresh)refreshOnlineSocial();if(d.socialAdd)sendOnlineFriendRequest(d.socialAdd);if(d.socialAccept)respondOnlineFriendRequest(d.socialAccept,true);if(d.socialReject)respondOnlineFriendRequest(d.socialReject,false);if(d.conversation){activeConversationId=d.conversation;onlineMessages=[];openModal('inbox');loadOnlineConversation(d.conversation,false)}if(d.socialInboxRefresh)refreshOnlineInbox();if(d.sendOnlineMessage)sendOnlineMessage();if(d.notificationRead)markOnlineNotificationRead(d.notificationRead);if(d.visitFarm)visitOnlineFriendFarm(d.visitFarm);if(d.farmLike)toggleVisitedFarmLike();if(d.farmVisitToggle)toggleFarmVisitPermission();if(d.sendOnlineGift)sendOnlineGift(d.sendOnlineGift);if(d.claimOnlineGift)claimOnlineGift(d.claimOnlineGift);if(d.refreshOnlineGifts)refreshOnlineGifts();if(d.exportFriend)exportFriendCard();if(d.exportMessage)exportSocialMessage();if(d.exportBouquet)exportBouquetGift(d.exportBouquet);if(d.importSocial)$('social-import-file')?.click();if(d.readMessage){const m=state.social.inbox.find(x=>x.id===d.readMessage);if(m){m.read=true;markDirty();renderModal()}}if(d.feedAll)feedAllHungryAnimals();if(d.saveMobileShortcuts){if(!farmWriteAllowed())return;const chosen=[...$('modal-body').querySelectorAll('[data-mobile-shortcut]:checked')].map(x=>x.dataset.mobileShortcut);if(chosen.length<1||chosen.length>4)return notify('Escolha entre um e quatro atalhos.');state.mobileShortcuts=chosen;markDirty();renderMobileNavigation();renderModal();notify('Barra inferior atualizada e salva na nuvem.')}if(d.acceptTask)acceptTutorialTask(d.acceptTask);if(d.confirmTask)confirmTutorialTask(d.confirmTask);if(d.claimMission)claimMission(d.missionPeriod,d.claimMission);if(d.claimAchievement)claimAchievement(d.claimAchievement);if(d.saveFarmName)saveFarmName();if(d.buyVipCard)buyVIPCard();if(d.buyDogBreed)buyDogBreed(d.buyDogBreed);if(d.equipDogBreed)equipDogBreed(d.equipDogBreed);if(d.buyGenericFood)buyGenericAnimalFood(d.buyGenericFood);if(d.buyAnimalRation)buyAnimalRation(d.buyAnimalRation);if(d.upgradeAnimal)upgradeAnimal(d.upgradeAnimal);if(d.saveProfilePhoto)saveProfilePhoto();if(d.removeProfilePhoto)removeProfilePhoto();if(d.buySoilWand)buySoilWand(d.buySoilWand,d.wandCurrency||'green');if(d.unlockPlot!==undefined)buyNextPlot();if(d.buyFertilizer)buyFertilizer(d.buyFertilizer);if(d.useFertilizer){chosenFertilizer=d.useFertilizer;tool='fertilizer';closeModal();document.querySelectorAll('.tool').forEach(btn=>btn.classList.toggle('active',btn.dataset.tool==='fertilizer'));$('tip').textContent=`${FERTILIZERS[chosenFertilizer]?.name||'Fertilizante'}: clique em uma planta em crescimento.`}if(d.buyExpansion)buyExpansion(d.buyExpansion,d.expansionCurrency);if(d.plantOrchardTree!==undefined)plantOrchardTree(Number(d.slot),d.plantOrchardTree);if(d.buyGift)buyGiftItem(d.buyGift);if(d.harvestOrchard!==undefined)harvestOrchardTree(Number(d.harvestOrchard));if(d.focusArea)focusFarmArea(d.focusArea);
if(d.setMood)setMood(d.setMood);if(d.buyRod)buyFishingRod(d.buyRod,d.currency);if(d.selectRod)selectFishingRod(d.selectRod);if(d.castFish)castFishingRod();if(d.buyGrill)buyGrill();if(d.buyGrillPart)buyGrillPart(d.buyGrillPart);if(d.buyGrillIngredient)buyGrillSupply(d.buyGrillIngredient);if(d.buyTurkeyMeat)buyTurkeyMeat();if(d.butcherAnimal)butcherAnimal(d.butcherAnimal);if(d.produceGrill)produceGrillRecipe(d.produceGrill,Number(b.closest('.store-card')?.querySelector('[data-batch-qty]')?.value||1));if(d.collectGrill)collectGrill();if(d.cookRecipe)produceKitchenRecipe(d.cookRecipe,Number(b.closest('.store-card')?.querySelector('[data-batch-qty]')?.value||1));if(d.collectKitchen)collectKitchen();if(d.selectForest!==undefined){selectedForestSlot=Number(d.selectForest);renderModal()}if(d.plantForest!==undefined)plantForestTree(Number(d.slot),d.plantForest);if(d.harvestForest!==undefined)harvestForestTree(Number(d.harvestForest));if(d.buySeaNet)buySeaNet(d.buySeaNet,d.currency);if(d.selectSeaNet)selectSeaNet(d.selectSeaNet);if(d.castSea)castSeaNet();if(d.craftWood)craftWoodItem(d.craftWood);if(d.collectWoodwork)collectWoodwork();if(d.buyLakeEgg)buyLakeEgg(d.buyLakeEgg);if(d.buyLakeFeed)buyLakeFeed();if(d.feedLakeFish)feedLakeFish(d.feedLakeFish);if(d.sellLakeFish)sellLakeFish(d.sellLakeFish);if(d.placeLakeDecor)placeLakeDecoration(d.placeLakeDecor);if(d.removeLakeDecor!==undefined)removeLakeDecoration(Number(d.removeLakeDecor));if(d.placeLakeBridge)placeLakeBridge(d.placeLakeBridge);if(d.removeLakeBridge!==undefined)removeLakeBridge(Number(d.removeLakeBridge));if(d.toggleMeatLock)toggleMeatLock(d.toggleMeatLock);if(d.sellFish){const qty=saleQuantity('fish',d.sellFish,state.fishWarehouse[d.sellFish]||0);if(qty)sellFishStock('river',d.sellFish,qty)}if(d.sellSeaFish){const qty=saleQuantity('sea',d.sellSeaFish,state.seaWarehouse[d.sellSeaFish]||0);if(qty)sellFishStock('sea',d.sellSeaFish,qty)}if(d.sellMeat){const qty=saleQuantity('meat',d.sellMeat,state.meatWarehouse[d.sellMeat]||0);if(qty)sellMeat(d.sellMeat,qty)}if(d.toggleProcessedLock)toggleProcessedLock(d.toggleProcessedLock);if(d.sellProcessed){const qty=saleQuantity('processed',d.sellProcessed,state.processedWarehouse[d.sellProcessed]||0);if(qty)sellProcessed(d.sellProcessed,qty)}if(d.assembleGrill)assembleGrill();if(d.buyTheme)buyFarmTheme(d.buyTheme,d.currency||'coins');if(d.applyTheme)applyFarmTheme(d.applyTheme);if(d.buyDecoration)buyDecoration(d.buyDecoration);if(d.placeDecoration)placeDecoration(d.placeDecoration);if(d.removeDecoration!==undefined)removeDecoration(d.removeDecoration);
if(d.mixHerb)produceHerbMix(d.mixHerb);if(d.collectHerbMix)collectHerbMix();if(d.sellHerbMix){const qty=saleQuantity('mix',d.sellHerbMix,state.inventory['mix_'+d.sellHerbMix]||0);if(qty)sellHerbMix(d.sellHerbMix,qty);}if(d.buyTree){if(writeLocked)return notify('Salvamento protegido.');const t=FOREST_TREES[d.buyTree];if(!t||t.retired||farmLevel()<t.level)return notify('Muda ainda bloqueada ou retirada da loja.');if(state.coins<t.price)return notify('Moedas amarelas insuficientes.');state.coins-=t.price;const key='tree_'+d.buyTree;state.inventory[key]=(state.inventory[key]||0)+1;remember('Comprou muda de '+t.name+'.');markDirty();refresh();notify('Muda de '+t.name+' adicionada ao inventário.')}
if(d.buy){if(writeLocked)return notify('Gravação bloqueada para proteger seu salvamento.');const c=CROPS[d.buy];if(!c||!cropLevelAllowed(c))return;const wallet=cropCurrency(c);if(state[wallet]<c.price)return notify(`Moedas insuficientes para comprar ${c.name}.`);state[wallet]-=c.price;state.inventory[d.buy]=(state.inventory[d.buy]||0)+1;remember('Comprou '+c.name);markDirty();refresh();notify('Semente comprada!')}
if(d.buyAnimal)buyAnimal(d.buyAnimal);if(d.buyFeed)buyAnimalFeed(d.buyFeed);if(d.feedAnimal)feedAnimal(d.feedAnimal,d.feedMode||'legacy');if(d.collectAnimal)collectAnimal(d.collectAnimal);if(d.sellAnimal)sellAnimal(d.sellAnimal);if(d.sellAnimalProduct){const qty=saleQuantity('animal',d.sellAnimalProduct,state.animalWarehouse[d.sellAnimalProduct]||0);if(qty)sellAnimalProduct(d.sellAnimalProduct,qty)}if(d.makeBouquet)makeBouquet(d.makeBouquet);if(d.sellFlower){const qty=saleQuantity('flower',d.sellFlower,state.flowerWarehouse[d.sellFlower]||0);if(qty)sellFlower(d.sellFlower,qty)}if(d.toggleFlowerLock)toggleFlowerLock(d.toggleFlowerLock);
if(d.seed)chooseSeed(d.seed);if(d.open)openModal(d.open);if(d.tool){closeModal();setTool(d.tool)}if(d.claimDaily)claimDailyReward();if(d.toggleCropLock)toggleCropLock(d.toggleCropLock);if(d.sell){const qty=saleQuantity('crop',d.sell,state.warehouse[d.sell]||0);if(qty)sellCrop(d.sell,qty)}if(d.sellall){for(const id of FIELD_CROP_IDS)sellCrop(id)}
if(d.export){if(writeLocked||!cloudUser)return notify('Entre na sua conta para exportar o backup da fazenda.');downloadBackup()}if(d.import){if(writeLocked||!cloudUser)return notify('Entre na sua conta antes de importar um backup.');$('import-file').click()}if(d.reset&&confirm('Deseja realmente iniciar uma NOVA fazenda? Recomendamos exportar um backup primeiro.')){if(writeLocked||!cloudUser)return notify('Entre na sua conta antes de reiniciar a fazenda.');state=newGame();markDirty();refresh();closeModal();notify('Nova fazenda iniciada e será salva na nuvem.')}});

$('modal-body').addEventListener('click',e=>{
 const sceneButton=e.target.closest('[data-friend-scene]');
 if(sceneButton){
  const scene=sceneButton.dataset.friendScene;
  if(SCENE_BOUNDS[scene]){friendVisitedScene=scene;const bounds=SCENE_BOUNDS[scene],world=$('friend-farm-world');if(world)world.setAttribute('viewBox',[bounds.left,bounds.top,bounds.right-bounds.left,bounds.bottom-bounds.top].join(' '));document.querySelectorAll('[data-friend-scene]').forEach(button=>{const active=button.dataset.friendScene===scene;button.classList.toggle('is-active',active);button.classList.toggle('alt',!active);button.setAttribute('aria-pressed',String(active))})}
  return;
 }
 const plot=e.target.closest('[data-help-plot]');
 if(plot){
  const index=Number(plot.dataset.helpPlot),item=visitedFarm?.snapshot?.plots?.[index];
  if(!Number.isInteger(index)||!item||item.status==='grass')return;
  selectedFriendPlot=index;friendSelectedArea='farm';friendSelectedAreaSlot=null;renderModal();return;
 }
 const action=e.target.closest('button[data-friend-action]');
 if(action){e.preventDefault();if(action.disabled)return;const kind=action.dataset.friendAction,plotIndex=selectedFriendPlot;if(Number.isInteger(plotIndex)&&['harvest','water','pest','weed','plow','plant'].includes(kind)){if(kind==='plant'&&!friendSelectedCropId)return notify('Escolha uma semente do seu inventário.');performFriendFarmAction('farm',plotIndex,kind,kind==='plant'?friendSelectedCropId:null)}}
 const areaHarvest=e.target.closest('button[data-friend-area-harvest]');
 if(areaHarvest&&!areaHarvest.disabled){e.preventDefault();performFriendFarmAction(areaHarvest.dataset.friendAreaHarvest,Number(areaHarvest.dataset.friendAreaSlot),areaHarvest.dataset.friendAreaHarvest+'_harvest')}
});
$('modal-body').addEventListener('keydown',e=>{
 if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-help-plot]')){
  e.preventDefault();const index=Number(e.target.dataset.helpPlot),item=visitedFarm?.snapshot?.plots?.[index];
  if(!item||item.status==='grass')return;selectedFriendPlot=index;friendSelectedArea='farm';friendSelectedAreaSlot=null;renderModal();
 }
});
$('modal-body').addEventListener('change',e=>{if(e.target.id==='friend-seed-select')friendSelectedCropId=e.target.value;if(e.target.id==='social-import-file')importSocialPackage(e.target.files[0]);if(e.target.id==='import-file')importBackup(e.target.files[0]);if(e.target.id==='profile-photo-file')processProfilePhoto(e.target.files?.[0])});$('modal-body').addEventListener('keydown',e=>{if(e.target.id==='farm-name-input'&&e.key==='Enter'){e.preventDefault();saveFarmName()}});
$('quick-harvest').addEventListener('click',quickHarvest);$('quick-dig').addEventListener('click',quickDig);$('multi-select-plots')?.addEventListener('click',toggleMultiSelectPlots);$('multi-harvest-selected')?.addEventListener('click',harvestSelectedPlots);
$('zoom-in').addEventListener('click',()=>setZoom(view.zoom+.15));$('zoom-out').addEventListener('click',()=>setZoom(view.zoom-.15));$('zoom-fit').addEventListener('click',fitWholeFarm);$('zoom-reset').addEventListener('click',fitWholeFarm);$('pan-left').addEventListener('click',()=>panView(-1));$('pan-right').addEventListener('click',()=>panView(1));document.querySelectorAll('[data-farm-scene]').forEach(button=>button.addEventListener('click',()=>switchFarmScene(button.dataset.farmScene)));
$('playfield').addEventListener('wheel',e=>{if(e.target.closest('.modal-body,.side-menu'))return;e.preventDefault();setZoom(view.zoom+(e.deltaY>0?-.1:.1))},{passive:false});
window.addEventListener('resize',()=>{if(activeScene==='sea'){const b=SCENE_BOUNDS.sea;view.zoom=sceneFitZoom('sea');view.cx=(b.left+b.right)/2;view.cy=(b.top+b.bottom)/2}updateView()});
window.addEventListener('keydown',e=>{if($('overlay').classList.contains('hidden')===false&&e.key!=='Escape')return;if(e.key==='Escape'){closeModal();return}if(e.key==='0'){view.cx=950;view.cy=490;setZoom(1)}if(e.key==='ArrowLeft'){e.preventDefault();panView(-1)}if(e.key==='ArrowRight'){e.preventDefault();panView(1)}if(e.key==='ArrowUp'||e.key==='ArrowDown'){e.preventDefault();const rect=svg.getBoundingClientRect(),visibleH=WORLD.h/view.zoom;view.cy+=(e.key==='ArrowUp'?-1:1)*visibleH*.16;updateView()}if(e.key==='+'||e.key==='=')setZoom(view.zoom+.1);if(e.key==='-'||e.key==='_')setZoom(view.zoom-.1)});
const pointerGeometry=e=>{
 const rect=svg.getBoundingClientRect();
 if(document.documentElement.classList.contains('orientation-landscape-fallback')&&matchMedia('(orientation: portrait)').matches){
  const virtualRect={left:0,top:0,right:rect.height,bottom:rect.width,width:rect.height,height:rect.width};
  return {x:e.clientY-rect.top,y:rect.right-e.clientX,rect:virtualRect};
 }
 return {x:e.clientX,y:e.clientY,rect};
};
$('playfield').addEventListener('pointerdown',e=>{
 if(!e.target.closest('#world'))return;
 const point=pointerGeometry(e);
 activePointers.set(e.pointerId,{x:point.x,y:point.y});
 if(activePointers.size>=2){
  try{$('playfield').setPointerCapture(e.pointerId)}catch{}
  const pts=[...activePointers.values()],a=pts[0],b=pts[1],rect=point.rect;
  const midX=(a.x+b.x)/2,midY=(a.y+b.y)/2,dist=Math.max(1,Math.hypot(b.x-a.x,b.y-a.y));
  const visibleH=WORLD.h/view.zoom,visibleW=visibleH*rect.width/Math.max(1,rect.height);
  const rx=(midX-rect.left)/Math.max(1,rect.width),ry=(midY-rect.top)/Math.max(1,rect.height);
  pinchState={distance:dist,zoom:view.zoom,worldX:view.cx-visibleW/2+rx*visibleW,worldY:view.cy-visibleH/2+ry*visibleH};
  drag=null;e.preventDefault();return;
 }
 const interactive=e.target.closest('.plot-hit,[data-animal-id],[data-orchard-slot],[data-river-fishing],[data-sea-bag],[data-sea-net],[data-modal],button');
 const requested=e.altKey||e.button===1,freeDrag=e.button===0&&!interactive;
 if(!requested&&!freeDrag)return;
 try{$('playfield').setPointerCapture(e.pointerId)}catch{}
 e.preventDefault();drag={x:point.x,y:point.y,cx:view.cx,cy:view.cy,moved:false};
});
$('playfield').addEventListener('pointermove',e=>{
 if(!activePointers.has(e.pointerId))return;
 const point=pointerGeometry(e);
 activePointers.set(e.pointerId,{x:point.x,y:point.y});
 if(activePointers.size>=2&&pinchState){
  const pts=[...activePointers.values()],a=pts[0],b=pts[1],rect=point.rect;
  const midX=(a.x+b.x)/2,midY=(a.y+b.y)/2,dist=Math.max(1,Math.hypot(b.x-a.x,b.y-a.y));
  const next=Math.max(sceneFitZoom(activeScene),Math.min(2.5,pinchState.zoom*dist/pinchState.distance));
  view.zoom=Math.round(next*100)/100;
  const visibleH=WORLD.h/view.zoom,visibleW=visibleH*rect.width/Math.max(1,rect.height);
  const rx=(midX-rect.left)/Math.max(1,rect.width),ry=(midY-rect.top)/Math.max(1,rect.height);
  view.cx=pinchState.worldX-rx*visibleW+visibleW/2;
  view.cy=pinchState.worldY-ry*visibleH+visibleH/2;
  suppressWorldClickUntil=Date.now()+500;updateView();e.preventDefault();return;
 }
 if(!drag)return;
 const dx=point.x-drag.x,dy=point.y-drag.y;
 if(Math.abs(dx)+Math.abs(dy)>3)drag.moved=true;
 const rect=point.rect,visibleH=WORLD.h/view.zoom,visibleW=visibleH*rect.width/Math.max(1,rect.height),ratioX=visibleW/rect.width,ratioY=visibleH/rect.height;
 view.cx=drag.cx-dx*ratioX;view.cy=drag.cy-dy*ratioY;updateView();
});
const finishPointer=e=>{
 activePointers.delete(e.pointerId);pinchState=null;drag=null;
 if(activePointers.size===1){const p=[...activePointers.values()][0];drag={x:p.x,y:p.y,cx:view.cx,cy:view.cy,moved:true}}
};
$('playfield').addEventListener('pointerup',finishPointer);
$('playfield').addEventListener('pointercancel',finishPointer);
window.addEventListener('offline',()=>{clearCloudRetry();if(hasPendingCloudChanges()){$('save-status').textContent='Sem conexão · alterações pendentes na nuvem';$('save-dot').className='savedot error'}});
window.addEventListener('online',()=>{if(dirty&&farmWriteAllowed(false)){clearCloudRetry();cloudPermanentSaveError=null;save()}});
window.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){updateDayNight();if(dirty&&navigator.onLine&&farmWriteAllowed(false))save()}else if(document.visibilityState==='hidden'&&dirty&&navigator.onLine&&farmWriteAllowed(false))save()});
window.addEventListener('pageshow',()=>{if(dirty&&navigator.onLine&&farmWriteAllowed(false))save()});
window.addEventListener('pagehide',()=>{if(dirty&&navigator.onLine&&farmWriteAllowed(false))save()});
window.addEventListener('beforeunload',event=>{if(hasPendingCloudChanges()){event.preventDefault();event.returnValue='';return ''}});
}
async function start(){
 initScene();setupEvents();updateView();state=newGame();writeLocked=true;
 refresh();updateConnectionLabel();initWeatherSystem();
 $('save-status').textContent='Entre na sua conta para carregar a fazenda da nuvem';
 $('save-dot').className='savedot error';
 let sessionFound=false;
 if(initSupabase()){
  try{await processEmailConfirmationCallback();const {data,error}=await supabaseClient.auth.getSession();if(error)throw error;if(data?.session){sessionFound=true;await handleAuthSession(data.session);}}
  catch(error){console.error('Auth session:',error);$('save-status').textContent='Falha ao conectar à nuvem · jogo bloqueado';notify('Não foi possível acessar a nuvem. Verifique sua conexão e tente novamente.')}
 }
 if((!sessionFound||writeLocked)&&currentModal!=='account')openModal('account');
 setInterval(()=>{if(dirty&&!cloudRetryTimer&&!cloudPermanentSaveError&&navigator.onLine&&farmWriteAllowed(false))save()},15000);
 setInterval(updateFishingCooldownButtons,250);
 setInterval(()=>{if(cloudUser&&document.visibilityState==='visible')refreshOnlineInbox(false)},45000);
 setInterval(()=>{updateDayNight();infest();expireDecorations();expireFarmTheme();expireTemporaryDogBreeds();const lakeChanged=syncLakeFish(),animalsChanged=syncAnimalCycles(),treesChanged=syncOrchardTrees();if(animalsChanged)renderAnimals();if(treesChanged)renderFarmAddons();if(!currentModal)renderPlots();else if(['kitchen','grill','factory','animals','orchard','pond','lake','sea','carpentry'].includes(currentModal)&&!modalHasFocusedEditor())renderModal()},15000);
}
start();
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(error=>console.warn('PWA: registro indisponível.',error)));
let deferredInstallPrompt=null;window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredInstallPrompt=event;const button=$('install-app');if(button)button.hidden=false});window.addEventListener('appinstalled',()=>{deferredInstallPrompt=null;const button=$('install-app');if(button)button.hidden=true});document.addEventListener('click',async event=>{const button=event.target.closest('#install-app');if(!button||!deferredInstallPrompt)return;deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;button.hidden=true});
