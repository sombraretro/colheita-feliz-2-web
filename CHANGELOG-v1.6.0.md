# Colheita Feliz 2 — v1.6.0

## Progressão e tutorial
- Implementado Livro de Tarefas com aceite explícito, acompanhamento de progresso e confirmação manual da conclusão.
- Adicionadas sete tarefas iniciais reconstruídas/adaptadas a partir das ações já disponíveis no jogo.
- Recompensas de moedas e XP concedidas apenas após confirmação.
- Livro concluído permanece registrado no salvamento; tarefas concluídas não são repetidas.

## Conquistas
- Adicionadas seis conquistas permanentes: primeira plantação, primeira colheita, 10 plantações, 10 colheitas, cuidado animal e nível 5.
- Resgate individual idempotente; uma recompensa já recebida não pode ser concedida novamente.

## Compatibilidade e preservação
- Campos novos normalizados para saves antigos; formato de API e JSON continua compatível.
- Recompensa diária continua independente do livro de tarefas.
- Recursos sociais permanecem offline sem criação de amigos fictícios.
- Mecânicas já existentes de plantio, rega, pragas, pestes, enxada, baús e animais foram preservadas.

## Ressalva histórica
Fontes contemporâneas confirmam o fluxo aceitar → executar → confirmar → receber recompensa e o desaparecimento do livro após concluir o tutorial. A lista integral e as quantias originais não foram recuperadas. Os objetivos e valores desta versão são uma adaptação claramente identificada.

## Verificações
- `node --check web/app.js`
- `go test ./...`
- `python qa/test_160.py`
- `python qa/test_server_160.py`
- Build Windows x64 com `GOOS=windows GOARCH=amd64 CGO_ENABLED=0`.
