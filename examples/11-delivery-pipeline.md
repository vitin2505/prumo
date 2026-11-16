# Cenário: Dockerfile e integração contínua

## Preparação

A API de pedidos do cenário 01: Node.js, sem dependências, sem arquivo de trava, sem etapa de build, com `npm test` e `npm run lint`.

Instale todas as skills e os agentes.

## Pedido

```text
Crie o Dockerfile e o workflow de CI no GitHub Actions para este serviço.
```

## Deve atuar

`delivery-pipeline`.

## Comportamento esperado

- [ ] Lê `package.json` e percebe que não há dependências, arquivo de trava nem build.
- [ ] Dockerfile com imagem base de versão fixada, usuário sem privilégios e apenas os arquivos necessários.
- [ ] Cria `.dockerignore`.
- [ ] Workflow com `permissions` mínimas, `timeout-minutes`, execução em pull request, testes e lint.
- [ ] Fixa as ações por hash de commit, ou declara que não pôde confirmar o hash e deixa isso indicado.
- [ ] Declara o que não foi executado (build da imagem, execução do workflow).

## Não deve acontecer

- [ ] `npm ci` sem arquivo de trava (falharia).
- [ ] Imagem `latest` ou execução como root.
- [ ] Inventar um hash de commit para uma ação.
- [ ] Adicionar etapa de publicação ou segredos que ninguém pediu.
- [ ] Afirmar que a imagem foi construída sem ter sido.
