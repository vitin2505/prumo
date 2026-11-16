---
name: delivery-verification
description: Verifica uma entrega com evidência antes de declará-la concluída, conferindo requisitos, executando testes e verificações, exercitando o comportamento real, revisando o diff e relatando com precisão o que foi verificado, o que falhou e o que ficou pendente. Use quando for concluir qualquer tarefa de implementação, correção ou refatoração, antes de dizer que algo funciona, está pronto ou foi corrigido, e antes de commit, pull request ou publicação.
---

# Verificação de Entrega

"Pronto" é uma afirmação que precisa de prova. Esta skill é o último passo de qualquer trabalho: confirmar com evidência nova que o resultado atende ao pedido, e relatar com honestidade o que foi e o que não foi verificado.

## Quando usar

- Antes de afirmar que uma tarefa está concluída, que um defeito foi corrigido ou que os testes passam.
- Antes de commit, pull request, publicação ou passagem para outra pessoa.
- Ao receber o resultado de um subagente ou de uma ferramenta, antes de repassá-lo como fato.

## Regra central

**Sem evidência obtida agora, não há afirmação.** Evidência é a saída de um comando executado nesta sessão, depois da última alteração. Não valem: memória de execução anterior, "deve funcionar", o relato de outro agente não conferido, nem a ausência de erro em um comando que não testa o que foi afirmado.

## Fluxo

1. **Releia o pedido original** e liste os requisitos e os critérios de aceite, incluindo os implícitos (não quebrar o que funcionava).
2. **Mapeie cada requisito a uma verificação** que o comprove: teste, comando, inspeção de comportamento. Requisito sem verificação possível é declarado como não verificado.
3. **Execute as verificações automatizadas do projeto**, na ordem: formatação e lint, verificação de tipos, testes, build. Use os comandos do próprio projeto. Leia a saída inteira, incluindo avisos, contagem de testes executados e código de saída.
4. **Exercite o comportamento real** quando for observável: chame o endpoint, abra a tela, rode o comando. Testes passando não provam que a funcionalidade funciona de ponta a ponta.
5. **Verifique o caso negativo**: a entrada inválida é recusada, o acesso indevido é negado, o defeito original não reaparece.
6. **Revise o diff completo**: apenas mudanças intencionais; sem código de depuração, segredos, arquivos gerados, comentários obsoletos ou alterações fora do escopo.
7. **Confira os efeitos colaterais**: documentação, exemplos, migrações, configuração e dependências acompanham a mudança.
8. **Se algo falhar, corrija e repita** a verificação desde o passo 3. Uma correção invalida a evidência anterior.
9. **Relate** no formato abaixo, distinguindo verificado, falho e não verificado.

## Padrões

**Afirmação e evidência exigida**

| Afirmação | Evidência necessária |
| --- | --- |
| "Os testes passam" | Saída do comando de testes, executado agora, com zero falhas e a contagem |
| "O build funciona" | Comando de build concluído com código de saída zero |
| "O defeito foi corrigido" | Reprodução original executada e sem falha; teste de regressão passando |
| "O requisito foi atendido" | Verificação item a item contra os critérios de aceite |
| "Não quebrei nada" | Suíte completa executada, não apenas os testes novos |
| "O subagente concluiu" | Diff e resultado conferidos de forma independente |
| "A interface funciona" | Tela exercitada em execução, com os estados relevantes |

**Linguagem do relato**
- Afirmativa e precisa quando há evidência: "42 testes passaram (`npm test`)".
- Explícita quando não há: "não executei os testes de ponta a ponta porque o ambiente não tem navegador".
- Sem palavras que disfarçam incerteza: "deve", "provavelmente", "em princípio", "parece funcionar".
- Falha é relatada com a saída relevante, não minimizada.

**Formato do relato**

```markdown
## Resultado
<o que foi entregue, em uma ou duas frases>

## Verificado
- <requisito ou verificação>: <comando ou ação> → <resultado observado>

## Não verificado
- <item>: <motivo> → <como verificar>

## Pendências e riscos
- <o que ficou de fora, limitações conhecidas, decisões que precisam do solicitante>

## Arquivos alterados
- <caminho>: <resumo da mudança>
```

**Quando a verificação não é possível**
- Diga o que impede (ambiente, credencial, dependência externa).
- Entregue o comando ou o roteiro para que outra pessoa verifique.
- Nunca substitua a verificação por suposição.

**Limites que não se cruzam para "fazer passar"**
- Não desative, pule ou enfraqueça testes.
- Não silencie erros, avisos do compilador ou regras de lint.
- Não fixe no código o resultado esperado pelo teste.
- Não altere o critério de aceite sem acordo com o solicitante.
- Não simule saída de comando nem resultado de teste.

Se a única forma de concluir exige um desses atalhos, pare e relate o impedimento.

## Evite

- Declarar sucesso logo após escrever o código, sem executar nada.
- Executar apenas o teste novo e concluir que a suíte passa.
- Confiar em execução anterior à última edição.
- Relatar "concluído" omitindo falhas ou partes não feitas.
- Tratar ausência de mensagem de erro como prova de funcionamento.
- Resumo otimista que não corresponde à saída dos comandos.

## Critérios de pronto

- [ ] Cada requisito do pedido mapeado a uma verificação ou declarado como não verificado.
- [ ] Verificações automatizadas executadas após a última alteração, com a saída lida.
- [ ] Comportamento real exercitado quando observável.
- [ ] Caso negativo conferido.
- [ ] Diff revisado, sem conteúdo não intencional.
- [ ] Relato distingue verificado, não verificado e pendente, sem termos vagos.
- [ ] Nenhum atalho usado para forçar a aprovação.

## Exemplo

```markdown
## Resultado
Cancelamento de pedido implementado, com devolução de estoque e verificação de dono.

## Verificado
- Regras de cancelamento: `npm test -- pedidos` → 18 passaram, 0 falharam
- Suíte completa: `npm test` → 146 passaram, 0 falharam
- Tipos e lint: `npm run typecheck` e `npm run lint` → sem erros
- Endpoint: `POST /v1/pedidos/{id}/cancelamento` com pedido aberto → 200, estado `cancelado`
- Caso negativo: usuário de outra organização → 404

## Não verificado
- Envio do e-mail de confirmação: depende do provedor externo, indisponível no ambiente local.
  Para verificar: executar em homologação e conferir a caixa de testes.

## Pendências e riscos
- A migração adiciona índice em `pedidos`; em produção deve ser criada sem bloqueio de escrita.
```

## Skills relacionadas

- `testing-strategy` para os testes que sustentam a verificação.
- `code-review` para a auto-revisão do diff.
- `debugging` quando uma verificação falha sem causa evidente.
- `git-workflow` para o commit e o pull request após a verificação.
