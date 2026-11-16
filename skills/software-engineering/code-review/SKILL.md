---
name: code-review
description: Revisa código e pull requests com método, verificando correção, segurança, desenho, testes e legibilidade, e produz achados classificados por severidade com evidência e sugestão concreta. Use quando pedirem revisão de código, de diff ou de pull request, análise de qualidade de um módulo, segunda opinião sobre uma implementação ou para revisar o próprio trabalho antes de entregar.
---

# Revisão de Código

A revisão existe para encontrar o que o autor não viu e para manter a base saudável. O revisor procura defeitos reais primeiro, e só depois melhorias. Cada apontamento é específico, justificado e acionável.

## Quando usar

- Revisar pull request, diff ou conjunto de arquivos.
- Avaliar a qualidade de um módulo existente.
- Auto-revisão antes de entregar.

Para auditoria focada em segurança, use `security-review`.

## Fluxo

1. **Entenda a intenção.** Leia a descrição, a tarefa vinculada e os critérios de aceite. Sem saber o que deveria acontecer, não há como julgar se acontece.
2. **Tenha visão do todo**: quais arquivos mudaram, qual o tamanho, onde está o núcleo da mudança. Mudança grande demais para revisar bem é o primeiro apontamento.
3. **Leia o contexto ao redor**, não só as linhas alteradas: quem chama o código, o que ele chama, quais contratos e testes existem. Muitos defeitos estão na interação com o que não mudou.
4. **Verifique em ordem de importância**:
   1. *Correção*: faz o que se propõe? Casos de borda, erros, nulos, concorrência, limites, ordem de operações.
   2. *Segurança*: validação de entrada, autorização por recurso, injeção, segredos, dados sensíveis em logs.
   3. *Dados*: migrações seguras e reversíveis, compatibilidade, integridade, transações.
   4. *Testes*: existem, falhariam se o comportamento quebrasse, cobrem bordas e erros.
   5. *Desenho*: responsabilidade no lugar certo, acoplamento, duplicação de conhecimento, complexidade desnecessária.
   6. *Desempenho*: consultas em laço, operações sem limite, trabalho repetido, apenas onde há impacto plausível.
   7. *Legibilidade*: nomes, clareza, consistência com a base.
   8. *Operação*: logs, métricas, tratamento de falha, configuração, reversão.
5. **Confirme cada suspeita antes de apontar.** Siga o fluxo no código, leia o teste, execute se possível. Marque como pergunta o que não pôde ser confirmado.
6. **Execute as verificações disponíveis** (testes, lint, tipos, build) quando o ambiente permitir, e relate o resultado real.
7. **Escreva os apontamentos** no formato padrão, classificados.
8. **Dê o veredito**: aprovar, aprovar com ressalvas ou solicitar mudanças, com resumo do motivo.

## Padrões

**Classificação**

| Nível | Significado | Bloqueia |
| --- | --- | --- |
| Crítico | Defeito, falha de segurança, perda ou corrupção de dados | Sim |
| Importante | Problema real de desenho, teste ausente em lógica relevante, risco operacional | Em geral, sim |
| Sugestão | Melhoria que vale considerar | Não |
| Detalhe | Estilo ou preferência menor | Não |
| Pergunta | Dúvida que precisa de resposta para concluir | Depende |

**Formato do apontamento**

```markdown
**[Nível] <título curto>** · `caminho/arquivo.ext:linha`
<O que está errado e em que situação se manifesta.>
<Por que importa: consequência concreta.>
Sugestão: <mudança específica, com trecho de código quando ajudar.>
```

**Conduta**
- Comente o código, não a pessoa. Explique o motivo; não imponha.
- Diferencie exigência de preferência. O que a ferramenta de formatação ou o lint resolvem não é assunto de revisão humana.
- Reconheça o que está bem feito, de forma específica.
- Poucos apontamentos relevantes valem mais que dezenas de detalhes: priorize.
- Não peça mudança fora do escopo; registre como sugestão de trabalho futuro.
- Se a abordagem inteira parece errada, diga isso primeiro, antes dos detalhes.

**Perguntas que revelam defeitos**
- O que acontece com entrada vazia, nula, enorme ou repetida?
- E se esta chamada falhar, demorar ou devolver algo inesperado?
- E se duas requisições fizerem isto ao mesmo tempo?
- Quem pode chamar isto? A permissão é verificada sobre este recurso?
- O que acontece com os dados já existentes?
- Como isto é revertido se der errado em produção?
- O teste falharia se eu invertesse esta condição?

**Código gerado por IA**

Revise com o mesmo rigor, com atenção especial a: APIs, funções ou parâmetros que não existem na versão instalada; tratamento de erro que engole a falha; testes que apenas espelham a implementação; código plausível que não atende ao requisito específico; dependências adicionadas sem necessidade.

**Auto-revisão**

Antes de entregar, leia o próprio diff completo como se fosse de outra pessoa: sobras de depuração, arquivos não intencionais, comentários desatualizados, mudanças fora do escopo.

## Evite

- Aprovar sem ler o contexto ou sem entender a intenção.
- Apontar suspeita como fato sem confirmar no código.
- Inundar a revisão com preferências de estilo.
- Dizer "isso está errado" sem dizer por quê e como corrigir.
- Inventar problemas para parecer rigoroso; se o código está bom, diga que está.
- Afirmar que os testes passam sem tê-los executado.
- Reescrever a mudança do autor nos comentários.

## Critérios de pronto

- [ ] Intenção da mudança compreendida e declarada no resumo.
- [ ] Contexto ao redor lido; chamadores e contratos conferidos.
- [ ] Todas as categorias verificadas ou marcadas como não aplicáveis.
- [ ] Cada apontamento com local, justificativa, sugestão e nível.
- [ ] Suspeitas não confirmadas apresentadas como perguntas.
- [ ] Verificações executadas relatadas com resultado real; as não executadas, declaradas.
- [ ] Veredito claro.

## Exemplo

```markdown
## Resumo
Adiciona cancelamento de pedido. A lógica principal está correta e bem testada no caminho feliz.
Veredito: **solicitar mudanças** (1 crítico, 1 importante).

**[Crítico] Cancelamento sem verificação de dono** · `src/pedidos/cancelar.ts:22`
`buscarPorId(id)` não filtra pela organização do usuário. Qualquer usuário autenticado
cancela pedido de outra organização informando o identificador.
Sugestão: usar `buscarPorIdDaOrganizacao(id, usuario.organizacaoId)` e responder 404.
Adicionar teste com usuário de outra organização.

**[Importante] Devolução de estoque fora da transação** · `src/pedidos/cancelar.ts:31-38`
Se a devolução falhar após a mudança de estado, o pedido fica cancelado sem devolver o estoque.
Sugestão: envolver as duas operações na mesma transação.

**[Sugestão] Nome do motivo** · `src/pedidos/tipos.ts:9`
`mot` poderia ser `motivoCancelamento`, alinhado ao restante do módulo.

Verificações: `npm test` executado, 142 passaram. Lint não executado (sem configuração local).
```

## Skills relacionadas

- `security-review` para auditoria de segurança aprofundada.
- `code-quality` para os critérios de desenho.
- `testing-strategy` para avaliar os testes.
- `git-workflow` para estrutura de commits e de pull requests.
- `delivery-verification` para relatar o que foi verificado.
