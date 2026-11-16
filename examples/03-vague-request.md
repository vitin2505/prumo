# Cenário: pedido vago e caso de não acionamento

Este arquivo tem dois pedidos. O primeiro deve acionar `requirements-discovery`; o segundo, não.

## Preparação

Um repositório de aplicação web de uma clínica, com cadastro de pacientes e de profissionais, sem nenhuma funcionalidade de agenda.

Instale: `requirements-discovery`, `system-architecture`, `implementation-planning`, `privacy-lgpd`.

---

## Parte A: pedido vago

### Pedido

```text
Quero que os pacientes possam agendar consultas pelo site.
```

### Deve atuar

`requirements-discovery`. Por envolver dados de saúde, espera-se menção a `privacy-lgpd`.

### Comportamento esperado

- [ ] Não começa a implementar nem a desenhar telas ou tabelas.
- [ ] Lê o repositório antes de perguntar, e não pergunta o que o código responde (por exemplo, se já existe cadastro de profissionais).
- [ ] Reformula o pedido como problema e resultado esperado.
- [ ] Faz poucas perguntas, apenas as que mudam o escopo ou o desenho, cada uma com opções e recomendação. Exemplos: confirmação imediata ou sujeita a aprovação; cancelamento e reagendamento; pagamento antecipado.
- [ ] Declara como premissas as lacunas com padrão sensato, em vez de perguntar tudo.
- [ ] Escreve requisitos funcionais com critérios de aceite verificáveis, incluindo casos de erro (horário já ocupado, cancelamento fora do prazo).
- [ ] Inclui requisitos não funcionais relevantes com valores, ou marca como questão em aberto.
- [ ] Apresenta as listas de dentro, fora e depois do escopo.
- [ ] Aponta que o motivo da consulta e outros dados de saúde exigem tratamento específico.
- [ ] Indica riscos de viabilidade e o que validar primeiro (por exemplo, concorrência na reserva do mesmo horário).

### Não deve acontecer

- [ ] Inventar regras de negócio da clínica como se fossem fatos.
- [ ] Fazer uma lista longa de perguntas de uma só vez.
- [ ] Entregar requisitos sem critério de aceite.
- [ ] Escolher tecnologia ou estrutura de banco nesta etapa.

---

## Parte B: caso de não acionamento

### Pedido

```text
No formulário de cadastro de paciente, troque o rótulo "Fone" por "Telefone".
```

### Deve atuar

Nenhuma skill de planejamento. É uma alteração pequena e bem definida.

### Comportamento esperado

- [ ] Localiza o rótulo e faz a alteração diretamente.
- [ ] Verifica se o mesmo texto aparece em testes ou em outros pontos que precisem acompanhar a mudança.
- [ ] Informa como verificou.

### Não deve acontecer

- [ ] Iniciar levantamento de requisitos, perguntas de escopo ou plano de implementação em várias etapas.
- [ ] Alterar outros textos ou o layout sem pedido.
