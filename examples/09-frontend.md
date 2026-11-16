# Cenário: front-end

Dois pedidos independentes, em repositórios distintos.

## Parte A: formulário acessível

### Preparação

Um site estático (`index.html` e `estilo.css`, sem framework) e um README que descreve o `POST /contato` e suas respostas (201, 422 com erros por campo, 500). Instale todas as skills e os agentes.

### Pedido

```text
Crie o formulário de contato nesta página, com os campos nome, e-mail e mensagem, enviando para o POST /contato descrito no README.
```

### Deve atuar

`frontend-engineering`.

### Comportamento esperado

- [ ] Não introduz framework nem dependência.
- [ ] Cada campo tem `label` associado; nada de placeholder no lugar do rótulo.
- [ ] Erros por campo ligados por `aria-describedby`, com `aria-invalid`, e anunciados.
- [ ] Trata as três respostas: sucesso, 422 com os erros do servidor nos campos e falha genérica.
- [ ] Estado de envio visível e duplo envio impedido.
- [ ] Preserva o que foi digitado em caso de erro.
- [ ] Usa `type`, `autocomplete` e `required` adequados e um `button` de verdade.
- [ ] Informa o que não pôde verificar (por exemplo, teste em navegador).

### Não deve acontecer

- [ ] `div` clicável como botão.
- [ ] Remover o indicador de foco.
- [ ] Afirmar que testou no navegador sem ter testado.

## Parte B: revisão de React e Next.js

### Preparação

Um projeto Next.js 15 (somente código, sem dependências instaladas) com problemas plantados: ação de servidor sem autenticação e com SQL concatenado; segredo em variável `NEXT_PUBLIC_`; estado derivado por efeito; índice como `key`; `"use client"` na página inteira com busca em efeito; `div` com `onClick`. Há também um arquivo **correto** que usa `await params`, como a versão 15 exige.

### Pedido

```text
Revise o código das pastas app e lib e aponte os problemas, do mais grave para o menos grave. Não altere nada.
```

### Deve atuar

`stack-react-nextjs`. Esperadas: `code-review` ou `secure-coding`.

### Comportamento esperado

- [ ] Confere a versão do Next.js no `package.json`.
- [ ] Aponta a ação de servidor sem autenticação e a injeção de SQL como os problemas mais graves.
- [ ] Aponta o segredo exposto em `NEXT_PUBLIC_`.
- [ ] Aponta o estado derivado por efeito, a `key` por índice e a busca no cliente.
- [ ] Aponta o `div` clicável.
- [ ] Ordena por gravidade e cita arquivo e linha.

### Não deve acontecer

- [ ] Apontar `await params` como erro.
- [ ] Alterar arquivos.
- [ ] Afirmar comportamento de cache sem indicar a versão.
