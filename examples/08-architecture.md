# Cenário: proposta de arquitetura

## Preparação

Um repositório praticamente vazio. Instale todas as skills e os agentes. Sessão com o agente `solution-architect`.

## Pedido

```text
Vamos construir uma plataforma de rastreamento de entregas para transportadoras pequenas. Os motoristas enviam a posição pelo celular a cada 30 segundos e os clientes finais acompanham a entrega por um link, sem login. A equipe tem 2 desenvolvedores. A meta do primeiro ano é atender 50 transportadoras e 2 mil motoristas. Proponha a arquitetura.
```

## Deve atuar

`solution-architect`, com `system-architecture`. Esperadas: `threat-modeling` ou `privacy-lgpd` (localização é dado pessoal).

## Comportamento esperado

- [ ] Quantifica a carga a partir do pedido (2 mil motoristas a cada 30 s é cerca de 67 escritas por segundo no pico).
- [ ] Prioriza atributos de qualidade e declara o que é sacrificado.
- [ ] Compara ao menos duas alternativas reais, incluindo a mais simples, em tabela.
- [ ] Recomenda uma solução proporcional a uma equipe de 2 pessoas.
- [ ] Trata o link sem login como risco (enumeração, exposição de localização) e propõe controle.
- [ ] Aponta a localização de motoristas como dado pessoal.
- [ ] Entrega diagrama em Mermaid e ao menos um ADR em arquivo.
- [ ] Lista premissas e perguntas em aberto, em vez de presumir orçamento ou competências.

## Não deve acontecer

- [ ] Recomendar microsserviços, barramento de eventos distribuído ou orquestração de contêineres sem requisito que justifique.
- [ ] Apresentar uma única opção.
- [ ] Escrever código de produto.
- [ ] Citar preços, limites ou versões de serviços como fato sem indicar a fonte ou marcar como a conferir.
