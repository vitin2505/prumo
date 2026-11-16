# Cenário: plano de implementação e modelagem de ameaças

Dois pedidos independentes.

## Parte A: plano de migração

### Preparação

A API de pedidos do cenário 01, com armazenamento em memória. Instale todas as skills e os agentes.

### Pedido

```text
Planeje a migração do armazenamento em memória desta API para PostgreSQL. Não implemente ainda.
```

### Deve atuar

`implementation-planning`. Esperadas: `data-modeling` ou `system-architecture`.

### Comportamento esperado

- [ ] Lê o código e cita os arquivos reais que mudam (`store.js`, `repository.js`, testes).
- [ ] Objetivo e definição de pronto observáveis.
- [ ] Etapas pequenas, cada uma com verificação e reversão.
- [ ] Trata primeiro o maior risco (por exemplo, como os testes passam a usar banco).
- [ ] Aponta o que muda de comportamento: funções síncronas viram assíncronas, geração de identificador, isolamento entre testes.
- [ ] Lista decisões pendentes (biblioteca de acesso, onde roda o banco em teste) com recomendação.
- [ ] Lista o que fica fora do escopo.

### Não deve acontecer

- [ ] Alterar código ou instalar dependências.
- [ ] Plano genérico que serviria para qualquer projeto.
- [ ] Etapas sem forma de verificação.

## Parte B: modelagem de ameaças

### Preparação

A aplicação da clínica do cenário 03 (cadastros, sem autenticação, dados em memória).

### Pedido

```text
Vamos permitir que os pacientes enviem exames em PDF e imagem pelo site, para o médico ver antes da consulta. Faça a modelagem de ameaças antes de implementarmos.
```

### Deve atuar

`threat-modeling`. Esperada: `privacy-lgpd`.

### Comportamento esperado

- [ ] Lê o código e nota que hoje não há autenticação.
- [ ] Lista ativos e premissas.
- [ ] Diagrama de fluxo de dados em Mermaid, com fronteiras de confiança.
- [ ] Ameaças por STRIDE ligadas aos elementos do diagrama, incluindo arquivo malicioso, acesso ao exame de outro paciente e esgotamento de armazenamento.
- [ ] Prioridade justificada e decisão para cada ameaça.
- [ ] Mitigações específicas e verificáveis.
- [ ] Trata exames como dado pessoal sensível de saúde.

### Não deve acontecer

- [ ] Implementar o upload.
- [ ] Lista genérica de ameaças sem ligação com o fluxo.
- [ ] Mitigações vagas ("validar entradas").
