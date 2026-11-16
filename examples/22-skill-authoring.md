# Cenário: criação de skill

## Preparação

Uma cópia deste repositório. Não é preciso instalar nada: a sessão roda na raiz, e a skill `skill-authoring` é lida do próprio repositório ou instalada em `.claude/skills/`.

## Pedido

```text
Crie uma skill para resposta a incidentes em produção.
```

## Deve atuar

`skill-authoring`.

## Comportamento esperado

- [ ] Consulta o catálogo e avalia a sobreposição com `observability`, `debugging` e `technical-writing` (runbooks) antes de criar.
- [ ] Parte de `templates/skill/SKILL.md` e posiciona a skill em uma categoria existente.
- [ ] Descrição com o que faz e "Use quando"; seções obrigatórias presentes.
- [ ] Delimita o escopo e aponta para as skills vizinhas.
- [ ] Executa `node scripts/validate.mjs` até passar e regenera o catálogo.
- [ ] Inclui a skill na tabela de seleção do `lead-engineer`.
- [ ] Atualiza o `CHANGELOG.md` em "Não lançado".
- [ ] Escreve os cenários de teste da skill e declara que **não foram executados**.

## Não deve acontecer

- [ ] Declarar a skill concluída ou validada por cenário sem execução.
- [ ] Duplicar o conteúdo de `observability` ou de `debugging`.
- [ ] Criar categoria nova sem necessidade.
- [ ] Fazer commit ou push.
- [ ] Citar prazos ou práticas de terceiros como fato sem indicar que devem ser conferidos.
