# Colheita Feliz 2 — Plano v1.6.0: Progressão

Data: 09/11/2026  
Base: código-fonte v1.5.0

## Objetivo

Reconstruir primeiro a progressão histórica do Colheita Feliz, sem introduzir ainda as personalizações planejadas pelo usuário. Preservar integralmente o salvamento v1.5.0 e não alterar as mecânicas já consideradas implementadas: animais, rega, pragas, pestes, enxada e baús.

## Auditoria da implementação atual

- O modal `tasks` é atualmente um painel de estatísticas; não possui tarefas com estado, aceite, conclusão ou recompensa.
- A fazenda inicia com dois nabos de presente (`initialGift`), mas não existe um livro tutorial funcional associado a essa introdução.
- A recompensa diária já possui estado próprio (`dailyRewardDate`, `dailyStreak`, `butterflyTreeClaimed`) e deve permanecer separada do livro tutorial.
- A progressão de nível já existe por XP, com 200 XP por nível e uma moeda verde concedida por nível em `awardXP`.
- O histórico (`state.history`) registra atividades e pode apoiar estatísticas, mas não deve ser usado como única fonte de verdade para conquistas: limites, deduplicação e migração precisam ser explícitos.
- A normalização de salvamento em `normalize(data)` é o ponto de migração compatível para os novos campos opcionais.

## Evidência histórica recuperada

Fontes de comunidade e guias de 2009 descrevem o livro como tutorial inicial:

1. O jogador aceitava uma tarefa antes de executá-la.
2. Após cumprir o objetivo, retornava ao livro e confirmava a tarefa.
3. A confirmação concedia uma recompensa.
4. Ao concluir todas as tarefas iniciais, o livro desaparecia.
5. Plantar e regar aparecem entre as tarefas descritas; tarefas sociais também eram parte da experiência geral, mas dependiam de vizinhos reais.

Fontes consultadas:
- https://www.estimulanet.com/2009/12/truques-manhas-e-dicas-para-jogar.html
- https://www.blogdozemarcos.com/2009/11/agora-sou-fazendeiro-virtual.html
- https://orkutrecos.blogspot.com/2010/04/mais-dicas-da-colheita-feliz-no-orkut.html
- https://aplicativosdoorkut.blogspot.com/2009/12/colheita-feliz.html

**Limitação documental:** não foi recuperada uma lista primária completa e verificável com a ordem, os textos, os requisitos e os valores de recompensa de todas as tarefas do livro. Não apresentar uma sequência inventada como se fosse original. Itens reconstruídos por aproximação devem ser rotulados como adaptação da réplica.

## Escopo funcional proposto

### A. Livro tutorial

- Exibir somente enquanto houver tarefas introdutórias pendentes.
- Estados por tarefa: bloqueada, disponível, aceita, concluída aguardando confirmação e resgatada.
- Uma tarefa ativa por vez na sequência tutorial, salvo se a evidência histórica futura justificar outra regra.
- O progresso deve ser derivado de ações reais do jogo, não de cliques em botões de teste.
- A recompensa só é entregue uma vez, após confirmação explícita.
- Conclusão do tutorial arquiva o livro; o registro permanece no salvamento.
- Não exigir visitas/ações sociais enquanto o modo online não existir. Tais tarefas ficam para a etapa social ou são claramente identificadas como indisponíveis, nunca simuladas.

### B. Conquistas permanentes

- Categorias sugeridas: cultivo, colheita, economia, animais, decoração, nível e atividades sociais futuras.
- Marcos cumulativos persistentes e idempotentes.
- Cada conquista registra data de desbloqueio e recompensa resgatada, se houver.
- Conquistas não devem conceder XP retroativo ou recompensas repetidas ao carregar um salvamento.

### C. Recompensas

- Reutilizar moedas, inventário, depósito e inventário de decoração já existentes.
- Separar recompensas do tutorial, conquistas, níveis e recompensa diária.
- Definir catálogo centralizado com tipo, quantidade, pré-requisitos e identificador único.
- Evitar conceder moedas verdes ou itens pagos em quantidades não documentadas como se fossem históricas.

## Compatibilidade e segurança

- Novos campos opcionais e valores padrão em `newGame()` e `normalize(data)`.
- Não alterar a estrutura de campos existentes nem redefinir moedas, XP, inventário, animais ou plantações.
- Salvamentos antigos devem migrar sem perder dados.
- Recompensas devem ser idempotentes: recarregar, reabrir modal ou repetir confirmação não pode duplicar prêmio.
- Exportação/importação JSON deve preservar o progresso.

## Critérios de aceite da v1.6.0

1. Um salvamento v1.5.0 abre sem perda de dados.
2. Uma fazenda nova recebe o livro tutorial no estado inicial previsto.
3. Uma tarefa não pode ser concluída antes de ser aceita.
4. O progresso só avança quando a ação correspondente acontece.
5. A recompensa só é creditada uma vez, na confirmação.
6. O livro desaparece ao concluir a sequência, mas o histórico permanece.
7. Conquistas cumulativas desbloqueiam uma única vez.
8. Recompensa diária continua independente e sem regressão.
9. Testes de desktop, viewport móvel, salvamento e recarga passam.
10. Nenhuma mecânica social exige ou simula amigos fictícios no modo offline.

## Próxima etapa de implementação

Antes de codificar a sequência do tutorial, continuar a pesquisa para recuperar mais textos/etapas/recompensas históricas. Se a lista integral não for encontrada, implementar uma sequência curta explicitamente identificada como reconstrução fiel ao tipo de fluxo documentado, sem alegar que os textos e valores são originais.
