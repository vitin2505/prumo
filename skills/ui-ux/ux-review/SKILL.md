---
name: ux-review
description: Avalia a experiência de uso de uma interface ou fluxo por meio de análise de tarefas, percurso cognitivo, heurísticas de usabilidade, auditoria visual e funcional e análise de conversão, produzindo achados priorizados com evidência e recomendação. Use quando pedirem auditoria de UX ou de usabilidade, revisão de tela, fluxo ou landing page, diagnóstico de baixa conversão ou de abandono, ou planejamento de pesquisa com usuários.
---

# Revisão de UX

Encontrar onde o usuário trava, erra ou desiste, explicar o motivo e recomendar a correção. Todo achado tem evidência observável; opinião sem evidência é marcada como hipótese.

## Quando usar

- Auditoria de usabilidade de tela, fluxo, produto ou landing page.
- Diagnóstico de abandono, baixa conversão ou excesso de chamados de suporte.
- Revisão antes de lançar funcionalidade.
- Planejamento de pesquisa ou de teste com usuários.

Para criar ou redesenhar a interface, use `interface-design`.

## Limite desta avaliação

Uma revisão por especialista identifica problemas prováveis, não substitui a observação de usuários reais nem dados de uso. Declare isso no relatório e indique o que deve ser confirmado com teste ou métrica. Não apresente estimativa de impacto em conversão como fato.

## Fluxo

1. **Defina escopo, usuário e tarefas.** Quem é o usuário típico, o que ele sabe e quais são as três a cinco tarefas mais importantes. Sem tarefas, a auditoria vira lista de preferências.
2. **Reúna evidências disponíveis**: métricas de funil, gravações, chamados, pesquisas. Registre o que existe e o que falta.
3. **Use a interface de verdade**, no navegador ou no aplicativo em execução, em tela pequena e grande. Capturas de tela não revelam problemas de interação.
4. **Faça o percurso cognitivo** de cada tarefa. Em cada passo, pergunte:
   - O usuário sabe o que fazer a seguir?
   - Ele enxerga o controle necessário?
   - Ele entende que aquele controle produz o efeito desejado?
   - Depois da ação, ele percebe que avançou?
5. **Avalie com as heurísticas** abaixo, como lente para o que o percurso não revelou.
6. **Faça a auditoria visual e funcional**: consistência, hierarquia, estados, responsividade, acessibilidade básica, textos, desempenho percebido.
7. **Analise a conversão**, quando houver objetivo de negócio: clareza da proposta, atrito, confiança, chamada para ação.
8. **Registre cada achado** no formato padrão e classifique a severidade.
9. **Priorize** por severidade e esforço, destacando ganhos rápidos.
10. **Relate** com resumo, achados, o que funciona bem e o que precisa de validação com usuários.

## Heurísticas de usabilidade

| Heurística | Pergunta de verificação |
| --- | --- |
| Visibilidade do estado do sistema | O usuário sempre sabe o que está acontecendo e onde está? |
| Correspondência com o mundo real | A linguagem é a do usuário, não a do sistema? |
| Controle e liberdade | É possível desfazer, cancelar e voltar sem perder trabalho? |
| Consistência e padrões | Elementos iguais se comportam igual? As convenções da plataforma são seguidas? |
| Prevenção de erros | O desenho impede o erro antes que aconteça? |
| Reconhecimento em vez de memorização | As opções estão visíveis, sem exigir lembrança? |
| Flexibilidade e eficiência | Há atalhos para quem usa com frequência? |
| Estética e desenho minimalista | Há informação irrelevante competindo com a relevante? |
| Recuperação de erros | As mensagens explicam o problema e a solução em linguagem simples? |
| Ajuda e documentação | A ajuda está disponível no contexto em que é necessária? |

## Padrões

**Formato do achado**

```markdown
### <Título curto do problema>
- **Onde:** <tela, passo, componente>
- **Evidência:** <o que foi observado; como reproduzir>
- **Por que é problema:** <princípio violado e consequência para o usuário>
- **Severidade:** crítica | alta | média | baixa
- **Recomendação:** <mudança concreta>
- **Confiança:** observado | hipótese a validar
```

**Severidade**

| Nível | Critério |
| --- | --- |
| Crítica | Impede a conclusão de uma tarefa principal |
| Alta | Causa erro frequente, perda de dados ou grande esforço |
| Média | Gera hesitação ou retrabalho, mas o usuário conclui |
| Baixa | Incômodo estético ou de consistência, sem afetar a tarefa |

**Auditoria visual e funcional**
- Consistência: componentes, espaçamentos, terminologia e ícones iguais para funções iguais.
- Hierarquia: a ação principal é evidente em cada tela.
- Estados: vazio, carregando, erro, sucesso e desabilitado existem e são claros.
- Formulários: rótulos, ajuda, validação, mensagens, preservação dos dados.
- Responsividade: 320 px, tablet, tela larga, zoom de 200%.
- Acessibilidade básica: teclado, foco visível, contraste, nomes acessíveis.
- Textos: claros, específicos, sem jargão interno.
- Desempenho percebido: retorno imediato às ações, sem saltos de layout.

**Análise de conversão**
- *Clareza*: em cinco segundos, fica claro o que é oferecido e para quem?
- *Relevância*: a página cumpre a promessa do anúncio ou do link de origem?
- *Atrito*: quantos passos, campos e decisões separam o usuário do objetivo?
- *Confiança*: há prova, garantias, preço e condições claros?
- *Chamada para ação*: única, visível, com texto que descreve o resultado?
- *Distrações*: links e elementos que desviam do objetivo?

Recomendações de conversão são hipóteses: proponha como validar (teste comparativo, métrica do funil).

**Pesquisa com usuários**
- Teste de usabilidade moderado com cerca de cinco participantes por perfil costuma revelar a maior parte dos problemas graves de um fluxo.
- Roteiro com tarefas realistas, sem instruir como fazer. Observe o comportamento; peça que pensem em voz alta.
- Entrevistas com perguntas abertas sobre comportamento passado, não sobre intenção futura.
- Dados pessoais de participantes exigem consentimento e cuidado: ver `privacy-lgpd`.

## Evite

- Lista de preferências pessoais sem ligação com tarefa ou princípio.
- Avaliar apenas por captura de tela.
- Recomendar "melhorar a usabilidade" sem dizer o quê.
- Apresentar hipótese como fato, ou inventar números de impacto.
- Apontar só defeitos: registrar o que funciona evita que seja removido.
- Recomendar padrões que manipulam o usuário.

## Critérios de pronto

- [ ] Usuário e tarefas definidos.
- [ ] Cada tarefa percorrida na interface em execução, em tela pequena e grande.
- [ ] Cada achado com local, evidência, severidade, recomendação e nível de confiança.
- [ ] Achados priorizados, com ganhos rápidos destacados.
- [ ] Pontos fortes registrados.
- [ ] Limites declarados e itens a validar com usuários ou métricas listados.

## Skills relacionadas

- `interface-design` para redesenhar com base nos achados.
- `frontend-engineering` para a verificação técnica de acessibilidade.
- `requirements-discovery` quando o problema é de escopo, não de interface.
- `performance-engineering` quando a lentidão é a causa do abandono.
