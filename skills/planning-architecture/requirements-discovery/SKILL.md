---
name: requirements-discovery
description: Conduz o levantamento e a especificação de requisitos, transformando um pedido vago em problema definido, escopo delimitado, requisitos funcionais e não funcionais verificáveis, critérios de aceite e análise de viabilidade. Use quando um pedido for ambíguo, amplo ou sem critério de sucesso, antes de iniciar projeto ou funcionalidade relevante, ou quando pedirem especificação, definição de escopo ou análise de viabilidade.
---

# Levantamento de Requisitos

O erro mais caro em software é construir bem a coisa errada. Esta skill garante que o problema, o escopo e o critério de sucesso estejam claros antes de qualquer desenho ou código.

## Quando usar

- Pedido que cabe em uma frase, mas esconde decisões ("quero um sistema de agendamento").
- Início de projeto, módulo ou funcionalidade com impacto relevante.
- Divergência entre partes sobre o que deve ser entregue.
- Necessidade de avaliar se algo é viável antes de comprometer esforço.

Não use para tarefas pequenas e bem definidas: nelas, confirmar o entendimento em uma frase é suficiente.

## Fluxo

1. **Separe problema de solução.** Reescreva o pedido como: quem tem qual dificuldade, em que situação, e o que muda quando estiver resolvido. Se o pedido já vier como solução ("adicione um botão de exportar"), descubra a necessidade por trás.
2. **Leia o que já existe** antes de perguntar: código, documentação, tickets, dados. Não pergunte o que o repositório responde.
3. **Liste as lacunas** e classifique cada uma:
   - *bloqueante*: a resposta muda o desenho ou o escopo. Pergunte.
   - *presumível*: há um padrão sensato. Adote, registre como premissa e siga.
4. **Pergunte de forma objetiva.** Poucas perguntas por vez, cada uma com opções e uma recomendação. Uma pergunta bem feita informa a consequência de cada resposta. Quando for preciso parar para esperar as respostas, a mesma mensagem já entrega o que não depende delas: o problema reformulado (passo 1), o que o código mostra, as premissas adotadas e um escopo provisório de dentro, fora e depois. Os requisitos detalhados vêm depois das respostas.
5. **Defina atores e cenários**: quem usa, com que objetivo, qual o caminho principal e quais os alternativos e de exceção.
6. **Escreva os requisitos funcionais** em forma verificável, com identificador. Cada um tem critério de aceite no formato dado, quando, então.
7. **Escreva os requisitos não funcionais com número**: desempenho (latência no percentil, volume), disponibilidade, segurança e privacidade, acessibilidade, compatibilidade, observabilidade, custo. "Rápido" e "seguro" não são requisitos.
8. **Delimite o escopo** com três listas: dentro, fora e depois. A lista "fora" é tão importante quanto a "dentro".
9. **Priorize**: essencial, importante e desejável. Identifique a menor entrega que já resolve o problema principal.
10. **Avalie viabilidade**: técnica (é possível com a stack e as integrações?), de prazo e esforço (ordem de grandeza, com as incertezas), operacional (quem mantém?), legal (dados pessoais, licenças). Aponte os riscos e o que precisa ser provado primeiro.
11. **Valide** com quem pediu: devolva o resumo e confirme. Registre premissas e questões em aberto.

## Padrões

**Requisito bem escrito**
- Uma necessidade por requisito, sem "e" escondendo dois.
- Descreve o quê, não o como.
- Verificável: existe um teste ou uma demonstração que diz sim ou não.
- Rastreável: tem identificador e origem.

**Critério de aceite**

```text
Dado que <contexto inicial>
Quando <ação>
Então <resultado observável>
```

Inclua critérios para erro e exceção, não só para o caminho principal.

**Perguntas que quase sempre precisam de resposta**
- Quem são os usuários e quantos? Qual o volume de dados e de uso esperado?
- Quais dados são pessoais ou sensíveis?
- Com que sistemas existentes isto precisa conversar?
- O que acontece hoje, sem a solução? O que não pode piorar?
- Como saberemos que deu certo? Qual indicador muda?
- Quais restrições são inegociáveis (prazo, orçamento, tecnologia, regulação)?

**Estimativa**
- Em faixas, com as premissas explícitas. Estimativa de ponto único comunica precisão que não existe.
- Incerteza alta se reduz com um experimento curto e delimitado, não com mais discussão.

## Evite

- Começar a desenhar a solução antes de entender o problema.
- Fazer muitas perguntas de uma vez, ou perguntas cuja resposta está no código.
- Presumir em silêncio uma decisão que muda o escopo.
- Requisitos que descrevem a implementação ("usar tabela X").
- Decidir ou perguntar sobre tecnologia nesta etapa (qual banco, qual biblioteca). Registre a necessidade ("os agendamentos precisam sobreviver a reinício") e deixe a escolha para a arquitetura.
- Descrever a situação atual do negócio como fato sem tê-la confirmado; o que não foi confirmado é premissa.
- Escopo sem lista do que fica de fora.
- Aceitar "todos", "sempre", "tempo real" sem quantificar.
- Inventar regras de negócio para preencher lacunas.

## Critérios de pronto

- [ ] Problema e resultado esperado descritos em linguagem do negócio.
- [ ] Atores e cenário principal definidos.
- [ ] Cada requisito funcional com critério de aceite verificável.
- [ ] Requisitos não funcionais relevantes com valores numéricos.
- [ ] Listas de dentro, fora e depois preenchidas.
- [ ] Premissas e questões em aberto registradas, com responsável.
- [ ] Riscos de viabilidade identificados, com o que validar primeiro.
- [ ] Resumo confirmado pelo solicitante.

## Exemplo

Pedido: "Quero que os clientes possam agendar pelo site."

Lacunas bloqueantes levadas ao solicitante: (1) o agendamento é confirmado na hora ou depende de aprovação? Recomendação: na hora, com base na agenda. (2) Há pagamento antecipado? Recomendação: não na primeira entrega.

Premissas adotadas: um profissional por horário; fuso de Brasília; cancelamento até 24 h antes.

Requisito e critério:

> **RF-03** O cliente cancela um agendamento futuro.
> Dado um agendamento para daqui a mais de 24 h, quando o cliente confirma o cancelamento, então o horário volta a ficar disponível e o cliente recebe a confirmação por e-mail.
> Dado um agendamento para daqui a menos de 24 h, quando o cliente tenta cancelar, então o sistema informa a política e oferece o contato da clínica.

Fora do escopo: reagendamento, lista de espera, integração com calendário externo.

## Skills relacionadas

- `system-architecture` para desenhar a solução dos requisitos definidos.
- `implementation-planning` para dividir a entrega em etapas.
- `technical-writing` para o formato da especificação.
- `privacy-lgpd` quando houver dados pessoais.
- `ux-review` para fluxos e necessidades do usuário.
