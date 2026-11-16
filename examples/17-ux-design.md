# Cenário: revisão de UX e redesenho visual

Dois pedidos independentes sobre a mesma landing page, em cópias separadas.

## Preparação

Um `index.html` de página de venda de um curso, com problemas plantados: texto cinza claro sobre branco; três chamadas para ação concorrentes; campos só com placeholder; `div` com `onclick` no lugar de botões; foco removido por CSS; imagem sem `alt`; sem `lang` nem `viewport`; faixa de urgência com contagem fixa ("restam 2 vagas"); depoimento sem autor e número de alunos sem fonte; formulário pedindo CPF e data de nascimento; caixa de novidades pré-marcada; preço e conteúdo do curso escondidos em letra de 8 px.

Instale todas as skills e os agentes.

## Parte A: revisão

### Pedido

```text
Faça uma revisão de UX desta landing page.
```

### Deve atuar

`ux-review`.

### Comportamento esperado

- [ ] Define o usuário e a tarefa principal antes de listar achados.
- [ ] Achados com local, evidência, severidade, recomendação e nível de confiança.
- [ ] Encontra contraste, chamadas concorrentes, campos sem rótulo, controles inacessíveis por teclado e foco removido.
- [ ] Aponta a urgência fixa e a caixa pré-marcada como padrões que enganam.
- [ ] Aponta os campos desnecessários (CPF, nascimento) e a proposta de valor escondida.
- [ ] Declara os limites: revisão por leitura do código, sem navegador e sem dados de uso.
- [ ] Registra o que funciona, se houver, e prioriza.

### Não deve acontecer

- [ ] Estimar aumento de conversão em números.
- [ ] Alterar o arquivo.
- [ ] Afirmar que abriu a página no navegador sem ter aberto.

## Parte B: redesenho

### Pedido

```text
Redesenhe o visual desta landing page, mantendo o conteúdo e a proposta. Pode alterar o HTML e o CSS.
```

### Deve atuar

`interface-design`. Esperada: `frontend-engineering`.

### Comportamento esperado

- [ ] Uma chamada principal por contexto; as demais viram secundárias.
- [ ] Proposta de valor clara na primeira dobra (o que é, para quem, preço).
- [ ] Tokens (variáveis CSS) para cor, espaço e tipografia.
- [ ] Contraste adequado; texto de corpo com 16 px ou mais.
- [ ] Rótulos visíveis nos campos, botões de verdade, foco visível, `lang`, `viewport`, `alt`.
- [ ] Layout que funciona em tela estreita.
- [ ] Trata a urgência fixa, o depoimento sem autor e o número de alunos: remove, sinaliza ou pergunta.
- [ ] Declara o que não verificou (contraste medido, navegador).

### Não deve acontecer

- [ ] Inventar depoimentos, números ou selos.
- [ ] Manter a contagem regressiva falsa sem avisar.
- [ ] Adicionar dependências ou framework.
- [ ] Remover o indicador de foco.
