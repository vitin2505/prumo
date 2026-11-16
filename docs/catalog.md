# Catálogo

> Arquivo gerado por `node scripts/validate.mjs --write-catalog`. Não edite à mão.

**31 skills** em 12 categorias · **6 agentes**

## Skills

### Engenharia de IA

Diretório: `skills/ai-engineering/`

| Skill | O que faz | Referências |
| --- | --- | --- |
| [`llm-engineering`](../skills/ai-engineering/llm-engineering/SKILL.md) | Projeta e implementa funcionalidades baseadas em modelos de linguagem, cobrindo escolha de arquitetura (chamada única, cadeia, recuperação, agente com ferramentas), saída estruturada, recuperação de contexto (RAG), avaliação automatizada, custo, latência e proteção contra injeção de prompt. | - |
| [`prompt-engineering`](../skills/ai-engineering/prompt-engineering/SKILL.md) | Projeta, revisa e melhora prompts e instruções para modelos de linguagem, definindo objetivo, contexto, estrutura, exemplos, formato de saída e critérios de avaliação. | - |

### APIs e integrações

Diretório: `skills/api-integration/`

| Skill | O que faz | Referências |
| --- | --- | --- |
| [`api-design`](../skills/api-integration/api-design/SKILL.md) | Projeta e revisa contratos de API REST e GraphQL, definindo recursos, operações, erros, paginação, idempotência, versionamento, autenticação e especificação formal. | 2 |
| [`resilient-integrations`](../skills/api-integration/resilient-integrations/SKILL.md) | Implementa integrações confiáveis entre sistemas, com tempo limite, repetição com recuo, idempotência, disjuntor, outbox, envio e recebimento de webhooks com verificação de assinatura e reconciliação. | - |

### Back-end

Diretório: `skills/backend/`

| Skill | O que faz | Referências |
| --- | --- | --- |
| [`backend-engineering`](../skills/backend/backend-engineering/SKILL.md) | Projeta e implementa serviços de back-end com camadas bem definidas, regras de negócio isoladas, validação nas bordas, tratamento de erros, transações, autenticação e autorização. | 1 |
| [`data-modeling`](../skills/backend/data-modeling/SKILL.md) | Modela esquemas de banco de dados relacionais, define restrições, índices e transações, escreve migrações seguras e otimiza consultas. | 1 |

### Front-end

Diretório: `skills/frontend/`

| Skill | O que faz | Referências |
| --- | --- | --- |
| [`frontend-engineering`](../skills/frontend/frontend-engineering/SKILL.md) | Constrói e revisa interfaces web com arquitetura de componentes, gestão de estado, busca de dados, responsividade, acessibilidade e performance. | 1 |

### Operações e entrega

Diretório: `skills/operations/`

| Skill | O que faz | Referências |
| --- | --- | --- |
| [`delivery-pipeline`](../skills/operations/delivery-pipeline/SKILL.md) | Projeta e revisa a esteira de entrega de software, incluindo Dockerfile e Docker Compose, integração e entrega contínuas com GitHub Actions, verificações de segurança automatizadas (DevSecOps), estratégias de publicação e reversão. | - |
| [`observability`](../skills/operations/observability/SKILL.md) | Instrumenta sistemas com logs estruturados, métricas e rastreamento distribuído, define indicadores e objetivos de nível de serviço, alertas acionáveis, verificações de saúde e painéis. | - |
| [`performance-engineering`](../skills/operations/performance-engineering/SKILL.md) | Investiga e melhora desempenho com método baseado em medição, incluindo definição de meta, reprodução, perfilamento, localização do gargalo, mudança isolada e comparação antes e depois, para front-end, back-end e banco de dados. | - |

### Planejamento e arquitetura

Diretório: `skills/planning-architecture/`

| Skill | O que faz | Referências |
| --- | --- | --- |
| [`implementation-planning`](../skills/planning-architecture/implementation-planning/SKILL.md) | Transforma um objetivo ou especificação em plano de execução com fatias verticais pequenas, ordem por risco e dependência, critério de verificação por etapa e pontos de reversão. | - |
| [`requirements-discovery`](../skills/planning-architecture/requirements-discovery/SKILL.md) | Conduz o levantamento e a especificação de requisitos, transformando um pedido vago em problema definido, escopo delimitado, requisitos funcionais e não funcionais verificáveis, critérios de aceite e análise de viabilidade. | - |
| [`system-architecture`](../skills/planning-architecture/system-architecture/SKILL.md) | Define e avalia arquitetura de software a partir de atributos de qualidade, comparando alternativas com trade-offs explícitos, delimitando módulos e fronteiras, escolhendo tecnologias com critério e registrando decisões e riscos. | 2 |

### Produtividade e otimização

Diretório: `skills/productivity/`

| Skill | O que faz | Referências |
| --- | --- | --- |
| [`context-economy`](../skills/productivity/context-economy/SKILL.md) | Reduz o consumo de tokens e mantém a qualidade em sessões de desenvolvimento assistido por IA, com leitura direcionada, saídas enxutas, delegação criteriosa, resumo de estado e passagem de bastão entre sessões. | - |
| [`skill-authoring`](../skills/productivity/skill-authoring/SKILL.md) | Cria, revisa e mantém skills e agentes no padrão Prumo, definindo escopo, descrição de acionamento, fluxo operacional, critérios de pronto, arquivos de referência e validação automatizada e por cenário. | - |

### Segurança

Diretório: `skills/security/`

| Skill | O que faz | Referências |
| --- | --- | --- |
| [`privacy-lgpd`](../skills/security/privacy-lgpd/SKILL.md) | Aplica privacidade desde a concepção e os requisitos da LGPD (Lei 13.709/2018) ao desenho e à implementação de software, cobrindo inventário de dados pessoais, base legal, minimização, direitos do titular, retenção, compartilhamento e resposta a incidentes. | - |
| [`secure-coding`](../skills/security/secure-coding/SKILL.md) | Aplica controles de segurança durante a escrita de código, cobrindo validação de entrada, injeção, controle de acesso, criptografia, segredos, dependências e tratamento seguro de erros, com base no OWASP Top 10. | 1 |
| [`security-review`](../skills/security/security-review/SKILL.md) | Audita código existente em busca de vulnerabilidades reais, com mapeamento de fronteiras de confiança, rastreamento de entrada até o ponto sensível, validação adversarial de cada achado e relatório com severidade calibrada. | 1 |
| [`threat-modeling`](../skills/security/threat-modeling/SKILL.md) | Conduz modelagem de ameaças de um sistema ou funcionalidade, com diagrama de fluxo de dados, fronteiras de confiança, identificação por STRIDE, priorização por risco e definição de mitigações rastreáveis. | - |

### Engenharia de software

Diretório: `skills/software-engineering/`

| Skill | O que faz | Referências |
| --- | --- | --- |
| [`code-quality`](../skills/software-engineering/code-quality/SKILL.md) | Orienta a escrita e a refatoração de código legível e sustentável, aplicando nomes claros, funções coesas, módulos profundos, princípios SOLID, padrões de projeto com critério e refatoração segura em passos pequenos. | 1 |
| [`code-review`](../skills/software-engineering/code-review/SKILL.md) | Revisa código e pull requests com método, verificando correção, segurança, desenho, testes e legibilidade, e produz achados classificados por severidade com evidência e sugestão concreta. | - |
| [`debugging`](../skills/software-engineering/debugging/SKILL.md) | Diagnostica e corrige defeitos de forma sistemática, com reprodução confiável, coleta de evidência, hipóteses testáveis, isolamento por bisseção, identificação da causa raiz e correção com teste de regressão. | - |
| [`delivery-verification`](../skills/software-engineering/delivery-verification/SKILL.md) | Verifica uma entrega com evidência antes de declará-la concluída, conferindo requisitos, executando testes e verificações, exercitando o comportamento real, revisando o diff e relatando com precisão o que foi verificado, o que falhou e o que ficou pendente. | - |
| [`testing-strategy`](../skills/software-engineering/testing-strategy/SKILL.md) | Define e implementa testes automatizados eficazes, escolhendo o nível adequado (unitário, integração, contrato, ponta a ponta), aplicando TDD, projetando casos por comportamento e mantendo a suíte rápida e confiável. | - |

### Stacks e tecnologias

Diretório: `skills/stacks-technologies/`

| Skill | O que faz | Referências |
| --- | --- | --- |
| [`git-workflow`](../skills/stacks-technologies/git-workflow/SKILL.md) | Organiza o trabalho em Git e GitHub com commits atômicos no padrão Conventional Commits, ramos curtos, pull requests revisáveis, resolução de conflitos e histórico seguro. | - |
| [`stack-python-django`](../skills/stacks-technologies/stack-python-django/SKILL.md) | Aplica convenções de Python moderno e Django, cobrindo tipagem, empacotamento, estrutura de projeto, ORM eficiente, migrações, transações, configurações seguras e APIs com Django REST Framework. | - |
| [`stack-react-nextjs`](../skills/stacks-technologies/stack-react-nextjs/SKILL.md) | Aplica convenções de React e Next.js com App Router, cobrindo componentes de servidor e de cliente, busca de dados, ações de servidor, cache, roteamento, estado e efeitos. | - |
| [`stack-typescript-node`](../skills/stacks-technologies/stack-typescript-node/SKILL.md) | Aplica convenções de TypeScript, Node.js e NestJS para código tipado com rigor, assíncrono correto e serviços bem estruturados. | - |

### Documentação técnica

Diretório: `skills/technical-documentation/`

| Skill | O que faz | Referências |
| --- | --- | --- |
| [`technical-writing`](../skills/technical-documentation/technical-writing/SKILL.md) | Produz e revisa documentação técnica de software, incluindo README, guias, referência de API, especificações, ADRs, runbooks e diagramas Mermaid, escolhendo o tipo de documento pelo objetivo do leitor. | 1 |

### UI/UX e design

Diretório: `skills/ui-ux/`

| Skill | O que faz | Referências |
| --- | --- | --- |
| [`interface-design`](../skills/ui-ux/interface-design/SKILL.md) | Projeta a camada visual e de interação de interfaces, definindo hierarquia, tipografia, cor, espaçamento, tokens de design, sistema de componentes com estados, microinterações e páginas de conversão. | 1 |
| [`ux-review`](../skills/ui-ux/ux-review/SKILL.md) | Avalia a experiência de uso de uma interface ou fluxo por meio de análise de tarefas, percurso cognitivo, heurísticas de usabilidade, auditoria visual e funcional e análise de conversão, produzindo achados priorizados com evidência e recomendação. | - |

## Agentes

| Agente | Tipo | Papel | Ferramentas |
| --- | --- | --- | --- |
| [`lead-engineer`](../agents/core/lead-engineer.md) | Principal | Engenheiro de software sênior e coordenador técnico do ecossistema Prumo. Analisa a solicitação, levanta requisitos, planeja, seleciona e combina as skills adequadas, implementa, testa, revisa segurança, documenta e verifica a entrega com evidência. | todas (herdadas) |
| [`code-reviewer`](../agents/specialized/code-reviewer.md) | Especializado | Revisor de código independente. Analisa diff, pull request ou módulo quanto a correção, segurança, dados, testes, desenho e legibilidade, executa as verificações disponíveis e entrega apontamentos classificados por severidade com evidência e sugestão. | Read, Grep, Glob, Bash, Skill |
| [`quality-engineer`](../agents/specialized/quality-engineer.md) | Especializado | Engenheiro de qualidade. Define a estratégia de testes, escreve e corrige testes automatizados, reproduz defeitos, investiga testes instáveis e verifica entregas de forma independente, com evidência. | Read, Grep, Glob, Bash, Edit, Write, Skill |
| [`security-auditor`](../agents/specialized/security-auditor.md) | Especializado | Auditor de segurança independente e somente leitura. Mapeia fronteiras de confiança, rastreia entradas até pontos sensíveis, valida cada candidato de forma adversarial e entrega relatório com achados confirmados, severidade calibrada e correções recomendadas. | Read, Grep, Glob, Skill |
| [`solution-architect`](../agents/specialized/solution-architect.md) | Especializado | Arquiteto de soluções. Transforma requisitos em desenho de sistema com alternativas comparadas, trade-offs explícitos, diagramas, modelo de ameaças inicial e ADRs. | Read, Grep, Glob, Skill, Write, Edit, WebFetch, WebSearch |
| [`technical-writer`](../agents/specialized/technical-writer.md) | Especializado | Redator técnico. Cria e atualiza README, guias, referência de API, especificações, ADRs, runbooks, changelog e diagramas Mermaid, sempre conferindo o conteúdo contra o código e executando os comandos documentados. | Read, Grep, Glob, Bash, Edit, Write, Skill |
