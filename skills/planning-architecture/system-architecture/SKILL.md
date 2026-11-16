---
name: system-architecture
description: Define e avalia arquitetura de software a partir de atributos de qualidade, comparando alternativas com trade-offs explícitos, delimitando módulos e fronteiras, escolhendo tecnologias com critério e registrando decisões e riscos. Use quando for desenhar um sistema ou módulo novo, decidir entre monólito e serviços, escolher banco, fila ou framework, avaliar uma arquitetura existente ou analisar riscos técnicos de uma mudança estrutural.
---

# Arquitetura de Sistemas

Arquitetura é o conjunto de decisões caras de mudar. O trabalho é identificar quais são, decidir com base nos requisitos de qualidade e registrar o porquê. A melhor arquitetura é a mais simples que atende aos requisitos conhecidos.

## Quando usar

- Sistema, serviço ou módulo novo.
- Decisão estrutural: estilo arquitetural, divisão de serviços, armazenamento, comunicação, hospedagem.
- Avaliação de arquitetura existente ou de proposta de mudança.
- Escolha de tecnologia com impacto de longo prazo.

Requisitos pouco claros? Comece por `requirements-discovery`.

## Fluxo

1. **Extraia os direcionadores.** Requisitos funcionais centrais, restrições (prazo, equipe, orçamento, legado, regulação) e atributos de qualidade com valores: desempenho, disponibilidade, escalabilidade, segurança, manutenibilidade, custo, tempo de entrega.
2. **Priorize os atributos de qualidade.** Não é possível maximizar todos. Escolha os três mais importantes e aceite conscientemente o custo nos demais.
3. **Entenda o contexto existente**: código, infraestrutura, competências da equipe, padrões já adotados. Uma arquitetura que a equipe não consegue operar é errada, por melhor que seja no papel.
4. **Identifique as decisões significativas**: as difíceis de reverter. Para as demais, adote o padrão e siga.
5. **Para cada decisão significativa, gere pelo menos duas alternativas reais**, incluindo a mais simples possível. Compare contra os atributos priorizados em tabela de trade-offs.
6. **Delimite módulos e fronteiras** pelo domínio: alta coesão interna, baixo acoplamento externo, dependências em uma só direção. Cada módulo esconde suas decisões internas atrás de uma interface pequena.
7. **Defina os dados**: quem é dono de cada dado, onde está a fonte da verdade, como ele trafega e que consistência é exigida.
8. **Percorra os cenários críticos** sobre o desenho: o fluxo principal, o pico de carga, a falha de uma dependência, a publicação de nova versão, a recuperação de desastre. O desenho que não sobrevive ao passeio precisa mudar.
9. **Liste os riscos** e, para os maiores, defina um experimento que os reduza antes do investimento principal.
10. **Registre**: diagramas em níveis (contexto, contêineres, componentes) e um ADR por decisão significativa.

Aprofundamentos: [references/distributed-systems.md](references/distributed-systems.md) para sistemas distribuídos e [references/technology-evaluation.md](references/technology-evaluation.md) para escolha de tecnologias.

## Padrões

**Comece pelo monólito modular.** Um único artefato implantável com módulos de fronteiras claras resolve a maioria dos casos e preserva a opção de extrair serviços depois. Extraia um serviço quando houver motivo concreto: escala muito diferente, ciclo de publicação independente exigido por equipes distintas, isolamento de falha ou de segurança, tecnologia especializada.

**Tabela de trade-offs**

| Critério (peso) | Opção A | Opção B |
| --- | --- | --- |
| Atende ao requisito X | Sim, com folga | Sim, no limite |
| Custo de operação | Baixo | Alto |
| Reversibilidade | Fácil | Difícil |
| Familiaridade da equipe | Alta | Baixa |

A decisão é declarada com o motivo principal e com o que foi sacrificado.

**Princípios de desenho**
- Dependências apontam para o que é mais estável; o domínio não depende de infraestrutura.
- Estado é o problema difícil: componentes sem estado sempre que possível, estado concentrado em poucos lugares bem cuidados.
- Prefira tecnologia consolidada e conhecida pela equipe; reserve a inovação para onde ela é o diferencial.
- Projete para a falha: toda dependência externa falha, atrasa e devolve lixo em algum momento.
- Adie decisões irreversíveis enquanto a informação ainda estiver chegando; tome cedo as reversíveis.
- Dimensione para a ordem de grandeza seguinte à atual, não para um futuro hipotético.

**Diagramas em níveis**
1. *Contexto*: o sistema, seus usuários e sistemas vizinhos.
2. *Contêineres*: aplicações, bancos, filas e como se comunicam.
3. *Componentes*: módulos internos de um contêiner, apenas onde for necessário.

**Avaliação de arquitetura existente**
- Mapeie o que existe a partir do código, não da documentação.
- Identifique onde o desenho atual viola os atributos priorizados, com evidência (métrica, incidente, custo de mudança).
- Proponha evolução incremental. Reescrita total quase nunca é a resposta.

## Evite

- Escolher a arquitetura pela popularidade ou pelo currículo.
- Microsserviços para equipe pequena ou domínio ainda desconhecido.
- Apresentar uma única opção como se não houvesse alternativa.
- Atributos de qualidade sem número.
- Banco de dados compartilhado entre serviços que deveriam ser independentes.
- Camadas e abstrações para flexibilidade que nenhum requisito pede.
- Diagrama sem legenda, com setas sem rótulo.
- Decisão significativa sem registro do porquê.

## Critérios de pronto

- [ ] Atributos de qualidade priorizados e quantificados.
- [ ] Cada decisão significativa com alternativas comparadas e motivo registrado em ADR.
- [ ] Diagramas de contexto e de contêineres presentes e legíveis.
- [ ] Dono e fonte da verdade definidos para cada dado relevante.
- [ ] Cenários críticos percorridos, com o resultado anotado.
- [ ] Riscos listados com mitigação ou experimento.
- [ ] Caminho de evolução descrito: o que muda se a escala ou o escopo crescer.

## Exemplo

Contexto: plataforma de agendamento para clínicas, equipe de três pessoas, centenas de clínicas no primeiro ano, dados de saúde.

Atributos priorizados: segurança e isolamento entre clínicas; tempo de entrega; custo de operação.

Decisão: monólito modular (módulos de agenda, cadastro, notificações e cobrança) com um banco relacional, isolamento por inquilino na camada de dados reforçado por segurança em nível de linha, e fila para notificações. Alternativa descartada: serviços separados por módulo, por multiplicar o custo de operação sem requisito que justifique. Sacrifício aceito: escala independente por módulo. Critério de revisão: módulo de notificações passar a exigir escala ou disponibilidade distintas do restante.

## Skills relacionadas

- `requirements-discovery` para os direcionadores.
- `threat-modeling` para os riscos de segurança do desenho.
- `data-modeling` para o esquema de dados.
- `technical-writing` para ADRs e diagramas.
- `implementation-planning` para transformar o desenho em entregas.
- `observability` e `performance-engineering` para requisitos operacionais.
