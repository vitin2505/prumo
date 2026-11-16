---
name: git-workflow
description: Organiza o trabalho em Git e GitHub com commits atômicos no padrão Conventional Commits, ramos curtos, pull requests revisáveis, resolução de conflitos e histórico seguro. Use quando for criar commits, escrever mensagens, abrir ou descrever pull requests, resolver conflitos de merge ou rebase, preparar uma versão ou recuperar trabalho no Git.
---

# Fluxo de Git e GitHub

O histórico é documentação: cada commit explica uma mudança e cada pull request conta uma história que alguém consegue revisar.

## Quando usar

- Criar commits e escrever mensagens.
- Abrir, descrever ou atualizar pull requests.
- Resolver conflitos, reorganizar ou recuperar histórico.
- Marcar versões.

## Regras de segurança

- Inspecione antes de agir: `git status`, `git diff` e `git log` antes de qualquer commit, e o estado do remoto antes de qualquer envio.
- **Não execute sem pedido explícito**: envio forçado, `reset --hard`, `clean -fd`, exclusão de ramo, reescrita de histórico já compartilhado, alteração de configuração global.
- Quando for inevitável forçar em ramo próprio, use `--force-with-lease`.
- Nunca inclua segredos. Segredo que entrou em um commit está comprometido: remova e peça a rotação.
- Não pule verificações (`--no-verify`) para fazer um commit passar: corrija a causa.
- Não faça commit direto no ramo principal quando o projeto usa pull requests.

## Fluxo

1. **Sincronize** com o ramo principal e crie um ramo curto com nome descritivo: `tipo/descricao-curta` (por exemplo, `feat/cancelamento-de-pedido`).
2. **Trabalhe em passos pequenos.** Cada commit compila, passa nos testes e faz uma coisa.
3. **Revise o próprio diff** antes de cada commit. Adicione arquivos de forma seletiva; evite `git add .` sem conferir o que entra.
4. **Escreva a mensagem** no padrão abaixo.
5. **Antes de abrir o pull request**: atualize com o ramo principal, rode as verificações locais e reorganize commits de correção para que o histórico conte a história certa.
6. **Abra o pull request** pequeno, com a descrição no modelo abaixo.
7. **Responda à revisão** com novos commits (não reescreva o que já foi revisado, a menos que seja a convenção do projeto) e resolva cada comentário.
8. **Integre** pela estratégia do repositório e apague o ramo.

## Padrões

**Mensagem de commit (Conventional Commits)**

```text
<tipo>(<escopo opcional>): <resumo no imperativo, até cerca de 72 caracteres>

<corpo opcional: o porquê da mudança e o que não é óbvio no diff>

<rodapé opcional: BREAKING CHANGE: descrição | Refs: #123>
```

| Tipo | Uso |
| --- | --- |
| `feat` | Nova capacidade para o usuário |
| `fix` | Correção de defeito |
| `refactor` | Mudança de estrutura sem alterar comportamento |
| `perf` | Melhoria de desempenho |
| `test` | Testes |
| `docs` | Documentação |
| `build` / `ci` | Sistema de build, dependências, pipeline |
| `chore` | Manutenção sem impacto no código de produção |

Mudança incompatível: `!` após o tipo ou rodapé `BREAKING CHANGE:`. Siga o idioma já usado no histórico do repositório.

Exemplo:

```text
fix(pedidos): impede cancelamento de pedido já enviado

A verificação de estado acontecia depois da devolução ao estoque,
o que gerava saldo incorreto quando o cancelamento era recusado.

Refs: #482
```

**Commits atômicos**
- Separe refatoração, mudança de comportamento e formatação.
- O teste entra no mesmo commit da mudança que ele cobre.
- Arquivos gerados, dependências instaladas e arquivos locais ficam no `.gitignore`.

**Pull request**

```markdown
## O que muda
<resumo em uma ou duas frases>

## Por quê
<problema ou necessidade, com link para a tarefa>

## Como foi verificado
<comandos executados, testes adicionados, evidências>

## Pontos de atenção
<riscos, migrações, sinalizadores, o que merece olhar cuidadoso>
```

- Um pull request, um propósito. Mudanças grandes são divididas em uma sequência de pequenas.
- O título segue o mesmo padrão das mensagens de commit.

**Integração**
- *Squash*: histórico principal linear, um commit por pull request. Bom padrão para a maioria dos projetos.
- *Rebase*: preserva commits individuais bem organizados em linha reta.
- *Merge commit*: preserva o contexto do ramo; útil para ramos de longa duração.
- Rebase apenas em ramos que só você usa. Nunca em ramo compartilhado.

**Conflitos**
1. Entenda as duas intenções antes de editar: veja o que cada lado mudou e por quê.
2. Resolva preservando ambas as intenções, não escolhendo um lado inteiro por conveniência.
3. Remova todos os marcadores, compile e rode os testes antes de continuar.
4. Arquivos de trava e gerados: regenere com a ferramenta em vez de editar à mão.
5. Em dúvida sobre a intenção do outro lado, pergunte ao autor.

**Versões**
- Versionamento semântico: principal para mudança incompatível, secundária para funcionalidade, correção para defeito.
- Etiqueta anotada por versão, com o changelog correspondente.

**Recuperação**
- `git reflog` localiza commits que parecem perdidos.
- `git revert` desfaz mudança já compartilhada sem reescrever o histórico.
- `git stash` ou um commit temporário guardam trabalho em andamento antes de trocar de contexto.
- `git bisect` encontra o commit que introduziu uma regressão.

## Evite

- Mensagens como "ajustes", "wip" ou "correções" no histórico final.
- Commit gigante com mudanças não relacionadas.
- Pull request sem descrição ou sem forma de verificação.
- Reescrever histórico compartilhado.
- Resolver conflito aceitando um lado sem ler o outro.
- Ramos de longa duração divergindo do principal.

## Critérios de pronto

- [ ] `git status` limpo, sem arquivos não intencionais no commit.
- [ ] Cada commit faz uma coisa e tem mensagem no padrão.
- [ ] Nenhum segredo, arquivo gerado ou dado local no diff.
- [ ] Ramo atualizado com o principal, verificações passando.
- [ ] Pull request com descrição completa e tamanho revisável.
- [ ] Nenhuma operação destrutiva executada sem autorização.

## Skills relacionadas

- `code-review` para revisar o pull request.
- `delivery-pipeline` para as verificações automatizadas.
- `implementation-planning` para dividir o trabalho em commits.
- `technical-writing` para changelog e notas de versão.
