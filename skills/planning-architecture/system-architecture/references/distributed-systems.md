# Sistemas distribuídos: decisões e armadilhas

Distribuir um sistema troca problemas de código por problemas de rede, consistência e operação. Só distribua quando o ganho for claro.

## Premissas que não valem

A rede não é confiável, a latência não é zero, a banda não é infinita, a rede não é segura, a topologia muda, não há um único administrador, o transporte tem custo e a rede não é homogênea. Todo desenho distribuído deve responder ao que acontece quando cada uma dessas premissas falha.

## Consistência

- Em uma partição de rede, o sistema escolhe entre responder com dado possivelmente desatualizado (disponibilidade) e recusar a resposta (consistência). A escolha é feita por operação, não para o sistema inteiro.
- **Consistência forte**: necessária onde a invariante não tolera desvio (saldo, estoque limitado, unicidade). Mantenha esses dados dentro de uma única fronteira transacional.
- **Consistência eventual**: aceitável onde um atraso é tolerável (contadores, feeds, buscas, relatórios). Projete a interface para comunicar o atraso.
- Leitura após escrita: o usuário espera ver o que acabou de gravar. Garanta isso mesmo com réplicas de leitura.

## Transações entre serviços

Não há transação distribuída barata. Opções:

| Padrão | Como funciona | Quando |
| --- | --- | --- |
| Manter no mesmo serviço | Uma transação local | Sempre que possível; reveja a fronteira antes de distribuir |
| Outbox | Evento gravado na mesma transação e publicado depois | Propagar mudança de estado com garantia |
| Saga | Sequência de transações locais com compensações | Processo de negócio longo entre serviços |
| Reserva e confirmação | Reserva o recurso, confirma ou libera depois | Recursos limitados com confirmação posterior |

Em sagas: cada passo é idempotente, toda ação tem compensação definida e o estado intermediário é visível e aceitável para o negócio.

## Comunicação

| Estilo | Vantagem | Custo |
| --- | --- | --- |
| Síncrona (HTTP, RPC) | Simples, resposta imediata | Acoplamento temporal; a falha se propaga |
| Assíncrona por fila | Absorve picos, isola falhas | Consistência eventual, mais operação |
| Eventos publicados | Baixo acoplamento entre produtor e consumidores | Fluxo difícil de enxergar; evolução de esquema |

- Cadeias síncronas longas multiplicam latência e indisponibilidade: a disponibilidade do conjunto é o produto das partes.
- Entrega exatamente uma vez não existe na prática: projete para pelo menos uma vez, com consumidor idempotente.

## Resiliência

- Tempo limite em toda chamada; orçamento de tempo propagado ao longo da cadeia.
- Repetição com recuo e variação aleatória, em uma única camada.
- Disjuntor por dependência.
- Compartimentos: recursos isolados por dependência ou por cliente, para que um não esgote os demais.
- Degradação planejada: o que o sistema ainda entrega quando cada dependência está fora.
- Contrapressão: recuse cedo quando sobrecarregado, em vez de aceitar e falhar tarde.

## Escalabilidade

- Escale primeiro o que a medição aponta como gargalo.
- Serviços sem estado escalam horizontalmente; o estado exige plano: réplicas de leitura, cache, particionamento.
- Cache: defina validade, invalidação e comportamento quando ele está vazio. Proteja contra avalanche de recomputação simultânea.
- Particionamento de dados é difícil de desfazer: escolha a chave pelo padrão de acesso e adie enquanto um nó maior resolver.

## Multi-inquilino

| Modelo | Isolamento | Custo e operação |
| --- | --- | --- |
| Banco por inquilino | Máximo | Alto; migrações multiplicadas |
| Esquema por inquilino | Alto | Médio; limite prático de quantidade |
| Tabelas compartilhadas com coluna de inquilino | Depende do código | Baixo; exige filtro obrigatório e segunda barreira |

Defina também limites por inquilino para que um cliente não degrade os demais.

## Operação

- Identificador de correlação propagado por todas as chamadas e mensagens.
- Publicação gradual com reversão rápida; compatibilidade entre versão nova e anterior durante a transição.
- Relógios divergem: não use carimbo de tempo local para ordenar eventos entre máquinas.
- Teste as falhas de propósito, em ambiente controlado.

## Perguntas antes de extrair um serviço

1. Qual problema concreto e medido a extração resolve?
2. A fronteira é estável, ou o domínio ainda está mudando?
3. Quais dados ficam de cada lado, e como as invariantes entre eles serão mantidas?
4. A equipe consegue operar mais um serviço (publicação, monitoramento, plantão)?
5. O que acontece com cada lado quando o outro está fora?
