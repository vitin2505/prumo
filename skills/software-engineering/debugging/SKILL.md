---
name: debugging
description: Diagnostica e corrige defeitos de forma sistemática, com reprodução confiável, coleta de evidência, hipóteses testáveis, isolamento por bisseção, identificação da causa raiz e correção com teste de regressão. Use quando houver erro, exceção, teste falhando, comportamento inesperado, falha intermitente ou regressão, especialmente quando a causa não for evidente ou tentativas anteriores de correção não tiverem funcionado.
---

# Depuração Sistemática

Depurar é investigar com método científico: observar, formular hipótese, testar, concluir. Corrigir sem entender a causa esconde o defeito e cria outro.

## Quando usar

- Erro, exceção, falha de teste ou de build.
- Comportamento diferente do esperado.
- Defeito intermitente ou que só ocorre em um ambiente.
- Regressão: algo que funcionava e parou.

## Regra central

**Nenhuma correção antes de entender a causa.** Se você não consegue explicar por que o defeito acontece e por que a correção o resolve, ainda está na fase de diagnóstico.

## Fluxo

1. **Defina o problema com precisão.** O que era esperado, o que aconteceu, em que condições. Leia a mensagem de erro e o rastro de pilha inteiros, do começo ao fim: muitas vezes a resposta está lá.
2. **Reproduza de forma confiável.** Reduza ao menor caso que falha, de preferência como teste automatizado. Sem reprodução, não há como confirmar a correção. Se for intermitente, descubra o que aumenta a frequência.
3. **Reúna evidências antes de teorizar**: logs, estado dos dados, versões, configuração, diferenças entre o ambiente em que funciona e o em que falha, e o que mudou recentemente (`git log`, publicações, dependências).
4. **Localize**, reduzindo o espaço de busca pela metade a cada passo:
   - no histórico: `git bisect` entre um commit bom e um ruim;
   - no fluxo: inspecione o dado no meio do caminho e descubra em que metade ele se corrompe;
   - na entrada: remova partes até restar o mínimo que falha.
5. **Formule uma hipótese específica e refutável**: "o valor chega nulo porque a consulta não carrega a relação quando o usuário não tem endereço".
6. **Teste a hipótese com um experimento** que possa contrariá-la. Mude uma variável por vez. Registre o resultado.
7. **Se refutada, descarte e volte às evidências.** Não ajuste a hipótese para sobreviver.
8. **Encontre a causa raiz**, não o sintoma: pergunte "por quê?" até chegar a algo que, corrigido, impede a recorrência. Verifique se o mesmo erro existe em outros lugares.
9. **Escreva o teste que falha** reproduzindo o defeito.
10. **Corrija a causa** com a menor mudança que resolve.
11. **Verifique**: o teste novo passa, a suíte passa, a reprodução original não falha mais.
12. **Limpe** a instrumentação temporária e registre a causa e a correção.

## Padrões

**Leitura de erros**
- Em um rastro de pilha, procure o primeiro quadro que pertence ao seu código.
- Em erros encadeados, a causa original costuma ser a última da cadeia.
- Pesquise a mensagem exata no código do projeto e das dependências antes de supor o significado.

**Instrumentação**
- Registre nas fronteiras entre componentes o que entra e o que sai, para descobrir em qual deles o dado se desvia.
- Prefira o depurador ou registros direcionados a espalhar impressões.
- Verifique as premissas explicitamente: "tenho certeza de que esta função é chamada" merece um registro que comprove.

**Perguntas de diferença**
- Funcionava antes? O que mudou desde então?
- Funciona em outro ambiente, usuário, dado ou navegador? Qual é a diferença?
- Falha sempre ou às vezes? O que distingue as ocorrências?

**Defeitos intermitentes**

Causas frequentes: condição de corrida, dependência da ordem de execução, estado compartilhado entre testes, tempo e fuso, cache, tempo limite, dados não determinísticos, limites de recursos. Aumente a frequência (repetição em laço, carga, atrasos injetados) até reproduzir de forma confiável, e registre mais contexto a cada ocorrência.

**Quando travar**
- Após três hipóteses refutadas, pare e reavalie as premissas: provavelmente uma delas é falsa.
- Explique o problema em voz alta ou por escrito, passo a passo.
- Verifique o óbvio: o código em execução é o que você está editando? O serviço foi reiniciado? O cache foi limpo? A variável de ambiente está definida?
- Reduza ainda mais o caso de reprodução.
- Se várias correções em sequência falharam, questione o desenho, não só a linha.

**Correção**
- Corrige a causa no ponto de origem, não o sintoma onde ele aparece.
- Sem mudanças não relacionadas no mesmo commit.
- Se a causa raiz não puder ser corrigida agora, a mitigação é marcada como tal, com registro da pendência.

**Registro**

```markdown
- **Sintoma:** <o que foi observado>
- **Reprodução:** <passos ou teste>
- **Causa raiz:** <o porquê, com arquivo e linha>
- **Correção:** <o que mudou>
- **Verificação:** <teste de regressão e comandos executados>
- **Prevenção:** <o que evita a recorrência ou detecta mais cedo>
```

## Evite

- Alterar código por tentativa e erro até o erro sumir.
- Várias mudanças de uma vez, sem saber qual teve efeito.
- Ignorar parte da mensagem de erro ou os avisos anteriores.
- Capturar e silenciar a exceção para "resolver".
- Culpar a ferramenta, o framework ou o ambiente sem evidência.
- Declarar corrigido sem reproduzir o cenário original.
- Alterar o teste para passar em vez de corrigir o código.
- Deixar instrumentação de depuração no código entregue.

## Critérios de pronto

- [ ] Defeito reproduzido de forma confiável antes da correção.
- [ ] Causa raiz explicada, com evidência que a sustenta.
- [ ] Teste de regressão que falhava antes e passa depois.
- [ ] Suíte completa passando; cenário original verificado.
- [ ] Busca por ocorrências do mesmo problema em outros pontos.
- [ ] Instrumentação temporária removida.
- [ ] Causa e correção registradas.

## Exemplo

Sintoma: vendas feitas na noite do último dia do mês aparecem no relatório do mês seguinte, apenas em produção.

Diferença: produção roda em UTC; as máquinas locais, no fuso de Brasília. Hipótese: o agrupamento por mês usa a data em UTC, e uma venda às 22h do dia 31 no horário local já é dia 1º em UTC. Experimento: teste com venda às 22h do dia 31 no horário de Brasília e fuso do processo definido como UTC; o teste falha, confirmando. Causa raiz: truncamento de data sem conversão para o fuso do negócio. Correção: converter para o fuso da organização antes de agrupar. Busca por outros truncamentos de data revelou o mesmo problema no relatório semanal, corrigido em commit separado.

## Skills relacionadas

- `testing-strategy` para o teste de regressão.
- `observability` para obter os sinais necessários ao diagnóstico.
- `performance-engineering` quando o sintoma é lentidão.
- `code-quality` quando o defeito revela um problema de desenho.
- `delivery-verification` para comprovar a correção.
