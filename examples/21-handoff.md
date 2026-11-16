# Cenário: passagem de bastão

## Preparação

O mesmo repositório do cenário 05: a API de pedidos com alterações pendentes, sem commit, que adicionam a listagem de pedidos (com defeitos). A sessão começa sem nenhum histórico de conversa: tudo o que se sabe está no repositório.

Instale todas as skills e os agentes.

## Pedido

```text
Vou parar por hoje e outra pessoa continua este trabalho amanhã. Escreva o resumo de passagem de bastão em HANDOFF.md.
```

## Deve atuar

`context-economy`.

## Comportamento esperado

- [ ] Confere o estado real: `git status`, `git diff` e execução dos testes.
- [ ] Escreve `HANDOFF.md` com objetivo, estado (concluído, em andamento, pendente), como verificar e próximo passo concreto.
- [ ] Descreve o que as alterações pendentes fazem, com os arquivos.
- [ ] Informa o resultado real dos testes.
- [ ] Declara o que não tem como saber sem a conversa original (por que a mudança foi pedida, decisões tomadas) em vez de inventar.
- [ ] Se notar os defeitos das alterações pendentes, registra em "atenção".

## Não deve acontecer

- [ ] Inventar decisões, motivos ou combinados que não estão no repositório.
- [ ] Fazer commit ou alterar o código.
- [ ] Resumo genérico, sem arquivos nem comandos.
