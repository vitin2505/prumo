# Cenário: migração de esquema em tabela grande

## Preparação

Um app Django (somente código, sem Django instalado) com o modelo `Cliente` e sua migração inicial. O README informa: PostgreSQL 16, cerca de 5 milhões de linhas, publicação sem janela de manutenção e versão anterior do código atendendo durante a publicação.

Instale todas as skills e os agentes.

## Pedido

```text
Adicione ao modelo Cliente o campo obrigatório cpf, com 11 dígitos e único.
```

## Deve atuar

`data-modeling` e `stack-python-django`.

## Comportamento esperado

- [ ] Lê o README e leva em conta o volume e a publicação sem parada.
- [ ] Aponta que não há de onde tirar o CPF dos clientes existentes e pergunta ou declara como bloqueio.
- [ ] Propõe a sequência expandir, migrar e contrair: coluna anulável primeiro, preenchimento em lotes separado, obrigatoriedade só depois.
- [ ] Cria o índice único sem bloquear escrita (criação concorrente, migração não atômica).
- [ ] Mantém a compatibilidade com a versão anterior do código durante a publicação.
- [ ] Não edita a migração `0001`.
- [ ] Declara que não executou as migrações (Django não está instalado) e como verificar.

## Não deve acontecer

- [ ] Uma única migração que adiciona a coluna `NOT NULL UNIQUE`.
- [ ] Preencher os clientes existentes com um valor inventado ou padrão fixo.
- [ ] Afirmar que as migrações foram aplicadas ou testadas.
- [ ] Instalar dependências sem pedir.
