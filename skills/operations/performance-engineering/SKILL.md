---
name: performance-engineering
description: Investiga e melhora desempenho com método baseado em medição, incluindo definição de meta, reprodução, perfilamento, localização do gargalo, mudança isolada e comparação antes e depois, para front-end, back-end e banco de dados. Use quando algo estiver lento, consumindo recursos em excesso ou não escalando, quando for definir orçamentos de desempenho ou planejar testes de carga.
---

# Engenharia de Performance

Otimização sem medição é palpite. O método é sempre o mesmo: definir a meta, medir, encontrar o gargalo, mudar uma coisa, medir de novo.

## Quando usar

- Página, endpoint, consulta, job ou build lento.
- Consumo excessivo de CPU, memória, rede ou custo.
- Preparação para aumento de carga.
- Definição de orçamentos e metas de desempenho.

## Fluxo

1. **Defina a meta em número**: qual métrica, em qual percentil, sob qual carga, para qual cenário. Sem meta, a otimização não termina.
2. **Reproduza de forma mensurável**: um cenário repetível, com dados e volume representativos, em ambiente o mais próximo possível da produção. Registre a linha de base com várias execuções.
3. **Decomponha o tempo** ao longo do caminho: rede, servidor, banco, serviços externos, renderização. Use rastreamento, registros de tempo e ferramentas do navegador para saber onde o tempo é gasto.
4. **Perfile o trecho dominante** com o perfilador adequado (CPU, memória, plano de consulta). Não deduza o gargalo lendo o código.
5. **Formule uma hipótese** que explique a medição e que possa ser refutada.
6. **Faça uma mudança por vez**, a de maior impacto esperado e menor risco.
7. **Meça novamente** com o mesmo método. Compare distribuição, não uma única execução. Sem melhora relevante, reverta.
8. **Verifique que nada regrediu**: testes, uso de memória, outras rotas.
9. **Repita** até atingir a meta; então pare.
10. **Previna regressão**: orçamento de desempenho ou teste automatizado no pipeline, e métrica acompanhada em produção.

## Padrões

**Medição**
- Use percentis (p50, p95, p99). A média esconde a cauda, que é o que o usuário mais lento experimenta.
- Meça em produção com dados de usuários reais sempre que possível; laboratório serve para comparar mudanças.
- Aqueça antes de medir; descarte a primeira execução; controle o ruído.
- Registre ambiente, versão, volume de dados e comando usados, para que a medição seja repetível.

**Onde o tempo costuma estar**

| Camada | Causas frequentes | Como confirmar |
| --- | --- | --- |
| Banco | Consultas N+1, falta de índice, varredura completa, bloqueio | Log de consultas, plano de execução |
| Back-end | Chamadas externas em série, serialização de objetos grandes, trabalho síncrono que poderia ser assíncrono | Rastreamento, perfilador de CPU |
| Rede | Muitas requisições, payload grande, falta de compressão ou de cache | Painel de rede do navegador |
| Front-end | JavaScript em excesso, renderizações repetidas, imagens grandes, recursos bloqueantes | Perfilador do navegador, métricas de Core Web Vitals |
| Memória | Vazamento, cache sem limite, carga de conjuntos inteiros | Perfilador de heap, comparação de instantâneos |

**Estratégias, da mais barata para a mais cara**
1. Não fazer o trabalho: remover o que é desnecessário.
2. Fazer menos: paginar, selecionar apenas os campos usados, filtrar na origem.
3. Fazer uma vez: agrupar em lote, deduplicar, guardar em cache.
4. Fazer depois: mover para processamento assíncrono.
5. Fazer em paralelo: operações independentes ao mesmo tempo.
6. Fazer mais rápido: algoritmo ou estrutura de dados melhor.
7. Adicionar recursos: escalar, quando o custo compensa.

**Cache**
- Só depois de otimizar a origem. Defina chave, validade, invalidação, tamanho máximo e comportamento quando vazio.
- Dados por usuário não vão para cache compartilhado.
- Proteja contra recomputação simultânea em massa quando uma entrada popular expira.

**Front-end**
- Metas de referência no percentil 75: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1.
- Orçamento de tamanho de JavaScript por rota, verificado no build.
- Carregue primeiro o necessário para a primeira tela; adie o restante.

**Teste de carga**
- Modele o tráfego real: mistura de operações, tempo entre ações, crescimento gradual.
- Tipos: carga esperada, estresse até o ponto de quebra, pico repentino e longa duração (para vazamentos).
- Observe latência por percentil, taxa de erro e saturação dos recursos.
- Execute apenas em ambiente autorizado e isolado. Nunca contra produção ou contra serviços de terceiros sem autorização explícita.

**Complexidade**
- Atenção a laços aninhados sobre dados que crescem e a operações lineares dentro de laços (busca em lista, concatenação repetida).
- Para volumes pequenos, clareza vale mais que eficiência assintótica.

## Evite

- Otimizar o que "parece" lento sem perfilar.
- Várias mudanças ao mesmo tempo, impossibilitando saber o que ajudou.
- Comparar uma execução antes com uma execução depois.
- Medir em ambiente de desenvolvimento e concluir sobre produção.
- Cache para esconder uma consulta ruim.
- Micro-otimizações que pioram a legibilidade sem ganho medido.
- Declarar melhora sem números.

## Critérios de pronto

- [ ] Meta numérica definida e linha de base registrada com método repetível.
- [ ] Gargalo identificado por medição, com a evidência anexada.
- [ ] Cada mudança medida isoladamente; as sem efeito foram revertidas.
- [ ] Resultado antes e depois apresentado em percentis, com o mesmo método.
- [ ] Testes passando e sem regressão em memória ou em outras operações.
- [ ] Proteção contra regressão adicionada.
- [ ] O que não foi medido está declarado.

## Exemplo

Queixa: "a listagem de pedidos demora". Meta: p95 abaixo de 500 ms com 50 mil pedidos. Linha de base: p95 de 4,2 s em 20 execuções. Decomposição pelo rastreamento: 3,9 s no banco, em 201 consultas. Hipótese: N+1 ao carregar o cliente de cada pedido. Mudança 1: carregamento em lote da relação; resultado: 2 consultas, p95 de 610 ms. Plano de execução mostra varredura completa na ordenação por data. Mudança 2: índice composto por organização e data; p95 de 85 ms. Proteção: teste de integração que afirma o número máximo de consultas da rota.

## Skills relacionadas

- `observability` para os sinais usados na medição.
- `data-modeling` para índices e consultas.
- `frontend-engineering` para desempenho de interface.
- `debugging` quando a lentidão é sintoma de defeito.
- `system-architecture` quando o limite é estrutural.
