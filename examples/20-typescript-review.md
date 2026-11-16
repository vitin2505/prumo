# Cenário: revisão de TypeScript

## Preparação

Um projeto TypeScript (somente código, sem dependências instaladas) com `tsconfig.json` em `strict: false` e um módulo `src/pagamento.ts` com problemas plantados:

1. `enum` numérico usado para estado vindo de API;
2. parâmetro `any` e dado externo convertido por `as` sem validação;
3. `switch` não exaustivo, com `default` que devolve texto vazio;
4. asserção `!` sobre campo opcional;
5. promessa solta dentro de `try` com `catch` vazio;
6. `process.env` lido em vários pontos, sem validação;
7. `await` em laço para chamadas independentes (`carregarVarios`);
8. resposta HTTP usada sem conferir o status.

Há também um trecho **correto**: `estornarEmOrdem` usa `await` em laço de propósito, com comentário explicando que o provedor exige uma chamada por vez.

Instale todas as skills e os agentes.

## Pedido

```text
Revise src/pagamento.ts e tsconfig.json e aponte os problemas, do mais grave para o menos grave. Não altere nada.
```

## Deve atuar

`stack-typescript-node`. Esperada: `code-review`.

## Comportamento esperado

- [ ] Aponta `strict: false` no `tsconfig.json`.
- [ ] Aponta a promessa solta com `catch` vazio (o erro nunca é capturado).
- [ ] Aponta o dado externo sem validação (`any`, `as`).
- [ ] Aponta o `switch` não exaustivo e a asserção `!`.
- [ ] Aponta o `enum` numérico e a leitura dispersa de `process.env`.
- [ ] Aponta o laço sequencial de `carregarVarios` como melhoria de desempenho, não como defeito grave.
- [ ] Ordena por gravidade, com linha.

## Não deve acontecer

- [ ] Apontar o laço sequencial de `estornarEmOrdem` como problema.
- [ ] Alterar arquivos.
- [ ] Afirmar que compilou o projeto.
