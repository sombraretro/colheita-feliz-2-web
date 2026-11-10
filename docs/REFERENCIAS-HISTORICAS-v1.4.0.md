# Referências históricas — Colheita Feliz 2 v1.4.0

Data de consulta: 09/11/2026. As fontes são páginas de fãs/arquivos históricos de 2010 e não documentação oficial preservada do servidor original. Elas são usadas como evidência de existência, nomes, IDs, preços e regras; quando não preservam um parâmetro, a réplica o identifica como estimativa.

## Ferramentas, alimentos e VIP

- `https://upcolheitafeliz.webnode.com.br/tabela-de-ferramentas/` — tabela histórica de ferramentas: osso para cachorro (2 moedas verdes); alimento para galinha (40 amarelas); alimento para gado (60 amarelas); alimento para porco (60 amarelas); alimento para animais que crescem (80 amarelas, 12 horas); alimento para animais que produzem (120 amarelas, 8 horas); ração para galinha (4 verdes), vaca (10 verdes), porco (2 verdes); Cartão VIP (100 verdes, 30 dias).
- `https://downloadnow2010.webnode.com.pt/colheita-feliz/` — catálogo de IDs: animais, flores, dez raças de cachorro, presentes e ferramentas. IDs de cachorro: Cachorro 21_0/22_0, Papillon 50_0, Dálmata 51_0, Robô 52_0, Husky 53_0, Poodle 54_0, Salsichinha 55_0, Pastor de Shetland 56_0, Shar-Pei 57_0, Mastiff 58_0, Papai Noel Renas 59_0.

## Evento Dia dos Namorados — maio de 2010

- `https://colheitafelizbugsetruques.blogspot.com/2010/05/dia-dos-namorados-na-colheita-feliz.html` — lista dez sementes: Árvore dos Namorados, Carambola, Acerola, Jaca, Caju, Pera, Jabuticaba, Alface, Guaraná e Mamão. A própria publicação informa que sete foram retiradas após uma atualização e que permaneceram Árvore dos Namorados, Alface e Mamão, todas compradas com moedas verdes.
- A mesma publicação lista Cachorro apaixonado (50 moedas verdes, expira em 30 dias), Cachorro dos namorados (40 moedas verdes, expira em 30 dias), além de quatro presentes: Flores Dia dos Namorados, Celebrando Dia dos Namorados, Eu amo você e Urso Dia dos Namorados.
- O artigo registra cinco decorações temáticas: Fundo do Dia dos Namorados, Casa de Dia dos Namorados, Cerca de Dia dos Namorados, Canil de Dia dos Namorados e Jardim Romântico de Dia dos Namorados, com período efetivo de 30 dias. A réplica ainda não substitui o cenário/casa/cerca por esses temas; eles ficam para uma etapa visual própria.

## Implementação e estimativas desta réplica

- Os nomes/IDs históricos são preservados; os dez dog breeds permanentes são representados por sprites vetoriais próprios e estáticos. Os preços das raças permanentes são balanceamento local.
- Os dois cães de Dia dos Namorados usam preços e duração recuperados. A aparência retorna automaticamente ao cachorro clássico ao expirar.
- A tabela de ferramentas informa que as rações elevam o nível e a produção animal, mas não preserva a fórmula completa. A réplica limita os níveis a 5 e usa +1 unidade por nível para galinhas/vacas e bônus local de carne/valor para porcos.
- Os alimentos genéricos respeitam as durações históricas-base de 8h para produtores e 12h para animais em crescimento; todos os ciclos da réplica são multiplicados por 1/5.
- Os preços de coleção dos quatro presentes do evento são estimativas; a fonte confirma nomes, não preços.
- A fonte do evento confirma que as três sementes restantes eram compradas com moedas verdes, mas não preserva o preço exato nem os tempos/rendimentos completos. Para as sete sementes retiradas, os dados de plantio são fictícios e identificados no catálogo.
- O Pomar com oito slots é uma expansão própria do modo offline, não uma afirmação de que esse layout existia no jogo original.
- Não foi encontrada evidência confiável suficiente nesta rodada para adicionar abelhas ou pesca como sistemas históricos do jogo. O Lago continua ornamental e o sistema social real aguarda o futuro modo online.
