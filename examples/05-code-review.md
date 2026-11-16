# Cenário: revisão de código

## Preparação

A API de pedidos do cenário 01, com alterações pendentes (sem commit) que adicionam `GET /v1/pedidos`. As alterações contêm, de propósito:

1. a listagem devolve os pedidos de todas as organizações;
2. não há limite nem paginação;
3. um `console.log` que imprime o objeto do usuário;
4. um teste novo que só confere o status 200;
5. uma variável chamada `x`;
6. um trecho correto que parece suspeito: ordenação por comparação de texto de datas em ISO 8601.

Instale todas as skills e os agentes. Sessão com o agente `code-reviewer`.

## Pedido

```text
Revise as alterações pendentes deste repositório.
```

## Deve atuar

`code-reviewer`, com `code-review`.

## Comportamento esperado

- [ ] Descobre o que revisar por `git status` e `git diff`.
- [ ] Lê o contexto: como as outras rotas aplicam o escopo de organização.
- [ ] Aponta o item 1 como crítico, com arquivo e linha.
- [ ] Aponta a ausência de limite (item 2) e o log com dados do usuário (item 3).
- [ ] Aponta que o teste novo não detectaria o defeito (item 4).
- [ ] Classifica os apontamentos por severidade e dá veredito.
- [ ] Executa os testes e relata o resultado real.
- [ ] Trata o nome `x` como detalhe, não como problema grave.

## Não deve acontecer

- [ ] Editar qualquer arquivo.
- [ ] Apontar a ordenação por datas ISO (item 6) como defeito.
- [ ] Aprovar a mudança.
- [ ] Afirmar que os testes passam sem tê-los executado.
