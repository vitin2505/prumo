---
name: security-review
description: Audita código existente em busca de vulnerabilidades reais, com mapeamento de fronteiras de confiança, rastreamento de entrada até o ponto sensível, validação adversarial de cada achado e relatório com severidade calibrada. Use quando pedirem auditoria ou revisão de segurança de um repositório, módulo, pull request ou funcionalidade, ou para verificar se uma suspeita de vulnerabilidade procede.
---

# Revisão de Segurança

Encontrar falhas que violam uma fronteira de confiança real e entregar ao responsável a evidência no código, o impacto e a menor correção eficaz. Um achado sem ator afetado, caminho rastreado e consequência concreta é uma hipótese, não uma vulnerabilidade.

## Quando usar

- Auditoria de repositório, serviço, módulo ou diff.
- Verificação de uma suspeita específica.
- Revisão antes de publicar funcionalidade sensível (autenticação, pagamento, upload, multi-inquilino).

Para aplicar controles enquanto escreve código novo, use `secure-coding`. Para analisar um desenho ainda não implementado, use `threat-modeling`.

## Regras de conduta

- **Somente leitura sobre o alvo.** A auditoria descreve correções; não altera o código auditado sem pedido explícito.
- **Sem testes contra ambientes reais.** Não sonde endpoints publicados, produção, serviços de terceiros nem dados de usuários. Reprodução só local, com dados fictícios.
- **Sem execução de código do alvo fora de ambiente isolado.** Se não houver isolamento, registre o item como "requer validação" com o plano de teste.
- **Não invente.** Comportamento de proxy, nuvem ou configuração ausente do repositório não se presume: registra-se como fato a confirmar.

## Modos

| Modo | Quando | Entrega |
| --- | --- | --- |
| Focado | Pergunta pontual, diff, funcionalidade | Resposta direta com achados e evidências |
| Completo | Pedido explícito de auditoria | Relatório conforme [references/report-template.md](references/report-template.md) |

Se o pedido for ambíguo, pergunte o escopo antes de iniciar o modo completo.

## Fluxo

1. **Defina escopo e referência.** Caminhos incluídos, commit analisado, o que fica de fora. Um escopo parcial deve se apresentar como parcial.
2. **Reconhecimento.** Mapeie: pontos de entrada (rotas, consumidores, CLIs, tarefas agendadas, webhooks), atores e níveis de privilégio, armazenamentos, integrações externas, mecanismos de autenticação e autorização, e onde ficam segredos e configuração.
3. **Trace as fronteiras de confiança.** Para cada ponto de entrada: quem pode chamar, que dados controla e qual verificação deveria existir.
4. **Monte o plano de cobertura**: matriz de superfície × classe de ataque. Marque cada célula como coberta, não aplicável ou não examinada. A matriz vai para o relatório.
5. **Cace por classe**, seguindo o dado da entrada até o ponto sensível:
   - controle de acesso por recurso e por função, isolamento entre inquilinos;
   - injeção (SQL, comando, template, caminho, cabeçalho) e desserialização;
   - autenticação, sessão, recuperação de conta, tokens;
   - requisições do servidor a destinos controlados pelo usuário;
   - exposição de dados em respostas, logs, erros e armazenamento;
   - lógica de negócio: condições de corrida, repetição, limites, manipulação de preço e estado;
   - segredos no repositório e no histórico; dependências com falha conhecida;
   - configuração: cabeçalhos, CORS, modo de depuração, permissões.
6. **Valide cada candidato de forma adversarial.** Tente refutá-lo: existe verificação anterior no caminho? O framework já neutraliza? O ator realmente alcança o ponto? Só sobrevive o que resiste.
7. **Classifique**:
   - **Confirmado**: caminho completo rastreado no código e resultado demonstrado ou inequívoco.
   - **Requer validação**: hipótese fundamentada, bloqueada por um fato específico ausente do código. Sem severidade.
   - **Rejeitado**: refutado, com o motivo registrado.
8. **Atribua severidade apenas aos confirmados** e proponha a menor correção na última linha de decisão confiável, com teste de regressão.
9. **Reconcilie** relatório, lista de achados e matriz de cobertura: nenhum achado no texto que não esteja na lista, e vice-versa.

## Severidade

| Nível | Âncora |
| --- | --- |
| Crítica | Ator não autenticado obtém execução de código, acesso total aos dados ou tomada de contas arbitrárias |
| Alta | Um controle explícito é totalmente vencido com consequência real: bypass de autenticação, leitura ou escrita entre inquilinos, script armazenado afetando outros usuários |
| Média | Violação real com alcance limitado ou pré-condições incomuns |
| Baixa | Exposição de informação interna não secreta, ou efeito mínimo com esforço alto |
| Informativa | Observação confirmada de impacto mínimo, útil como contexto |

Se não for possível descrever o dano concreto, a severidade é menor do que parece. A severidade nunca excede o impacto demonstrado.

## Evite

- Apresentar desvio de checklist ou ausência de boa prática como vulnerabilidade.
- Recomendação de defesa em profundidade sem violação alcançável, misturada aos achados.
- Presumir configuração de implantação que não está no repositório.
- Tratar ação do próprio usuário sobre seus próprios dados como cruzamento de fronteira.
- Declarar efeito mais forte do que o observado.
- Escrever o relatório antes de validar os candidatos.
- Afirmar que o sistema "está seguro": uma auditoria cobre o que examinou.

## Critérios de pronto

- [ ] Escopo, commit e limitações declarados no início do relatório.
- [ ] Cada achado confirmado tem: ator, entrada, caminho com arquivo e linha, controle ausente, impacto, correção e teste de regressão.
- [ ] Cada candidato passou por tentativa de refutação registrada.
- [ ] Itens "requer validação" citam o fato exato que falta e como obtê-lo com segurança.
- [ ] Matriz de cobertura presente, com o que não foi examinado.
- [ ] Nenhum arquivo do alvo modificado.

## Exemplo

Achado confirmado, severidade alta:

> **Leitura de faturas de outro inquilino.** Ator: qualquer usuário autenticado. Entrada: `GET /faturas/:id`. Caminho: `rotas/faturas.ts:41` chama `repositorio.buscarPorId(id)` em `repositorios/faturas.ts:18`, que consulta apenas por `id`. Controle ausente: filtro por organização do solicitante. Impacto: leitura de valores e dados cadastrais de qualquer fatura, com identificadores sequenciais. Correção: incluir a organização do usuário na consulta e responder como não encontrado. Regressão: teste de integração com usuário de outra organização.

## Skills relacionadas

- `secure-coding` para os controles a aplicar na correção.
- `threat-modeling` para análise de desenho.
- `privacy-lgpd` quando os achados envolvem dados pessoais.
- `code-review` para revisão geral de qualidade.
