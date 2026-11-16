---
name: data-modeling
description: Modela esquemas de banco de dados relacionais, define restrições, índices e transações, escreve migrações seguras e otimiza consultas. Use quando for criar ou alterar tabelas, escrever migrações, investigar consultas lentas, decidir entre normalizar e desnormalizar ou revisar a camada de persistência.
---

# Modelagem de Dados e Persistência

O esquema é a parte mais difícil de mudar em um sistema. O banco deve tornar estados inválidos impossíveis, e toda mudança de esquema deve poder ser aplicada sem parar a aplicação.

## Quando usar

- Criar ou alterar tabelas, colunas, relacionamentos e restrições.
- Escrever ou revisar migrações.
- Diagnosticar consulta lenta, bloqueio ou inconsistência de dados.

Não use para escolher entre tipos de banco em um desenho novo (isso é `system-architecture`).

## Contexto a levantar

1. Banco e versão, ORM ou construtor de consultas, ferramenta de migração.
2. Volume atual e crescimento esperado das tabelas envolvidas.
3. Padrões de acesso: quais consultas existem, com que filtros, ordenações e frequência.
4. Como as migrações são aplicadas em produção e se há janela de manutenção.

## Fluxo

1. **Modele pelo domínio.** Liste entidades, atributos e relacionamentos com cardinalidade. Nomeie pelo vocabulário do negócio.
2. **Normalize até a terceira forma normal** por padrão: cada fato em um único lugar. Desnormalize apenas com um problema medido e um mecanismo que mantenha a cópia consistente.
3. **Declare as invariantes no banco**:
   - `NOT NULL` em tudo que é obrigatório;
   - chave estrangeira em todo relacionamento, com ação de exclusão decidida;
   - `UNIQUE` para regras de unicidade (inclusive compostas e parciais);
   - `CHECK` para domínios de valores e relações entre colunas.
   A aplicação valida para dar boa mensagem; o banco valida para garantir.
4. **Escolha tipos precisos**: identificadores estáveis, data e hora com fuso, decimal exato para dinheiro, enumeração ou tabela de domínio para conjuntos fechados.
5. **Crie índices a partir das consultas reais**, não por intuição. Para cada consulta relevante, confirme o plano de execução.
6. **Escreva a migração de forma expansiva e reversível**, seguindo expandir, migrar e contrair (abaixo).
7. **Verifique** em uma cópia com volume realista: plano das consultas, tempo da migração e bloqueios.

## Padrões

**Migrações sem interrupção: expandir, migrar, contrair**

1. *Expandir*: adicione a nova estrutura de forma compatível (coluna anulável, tabela nova). O código antigo continua funcionando.
2. *Migrar*: publique código que escreve nos dois formatos; preencha os dados antigos em lotes pequenos; passe a ler do novo.
3. *Contrair*: em uma publicação posterior, remova a estrutura antiga.

Nunca renomeie ou remova coluna na mesma publicação em que o código deixa de usá-la. Cada migração faz uma coisa e é separada de carga de dados volumosa.

**Índices**
- Índice composto atende filtros pelo prefixo das colunas; coloque primeiro as de igualdade, depois a de intervalo ou ordenação.
- Toda chave estrangeira usada em junção ou em exclusão em cascata precisa de índice.
- Índice tem custo de escrita e de espaço: remova os não utilizados.

**Transações e concorrência**
- Transações curtas; nada de chamada de rede dentro delas.
- Proteja invariantes com restrição do banco ou bloqueio explícito, não com verificar e depois gravar.
- Bloqueio otimista (coluna de versão) para edição concorrente por usuários.
- Adquira bloqueios sempre na mesma ordem para evitar deadlock.

**Consultas**
- Selecione apenas as colunas necessárias; pagine sempre. Em tabelas grandes, prefira paginação por cursor (chave) a deslocamento.
- Elimine N+1 com junção ou carregamento em lote.
- Parâmetros sempre vinculados, nunca concatenados.

**Exclusão e histórico**
- Decida conscientemente entre exclusão física, lógica (com impacto em unicidade e em todas as consultas) e arquivamento. Dados pessoais exigem exclusão ou anonimização real: ver `privacy-lgpd`.

Detalhes específicos de PostgreSQL (tipos, índices, bloqueios de DDL, leitura de planos) em [references/postgresql.md](references/postgresql.md).

## Evite

- Colunas genéricas (`dados`, `tipo`, `valor1`) e modelos entidade-atributo-valor para fugir de migrações.
- Listas separadas por vírgula ou JSON para dados que são consultados e relacionados.
- Regra de integridade apenas na aplicação.
- Editar migração já aplicada em algum ambiente.
- Alteração de esquema que reescreve ou bloqueia uma tabela grande sem plano.
- Índice em toda coluna "por garantia".

## Critérios de pronto

- [ ] Todo relacionamento tem chave estrangeira; toda regra de unicidade tem restrição.
- [ ] Migração aplicada e revertida em ambiente local limpo, com sucesso.
- [ ] Migração compatível com a versão anterior do código em execução.
- [ ] Plano de execução das consultas novas ou alteradas conferido com volume realista.
- [ ] Tempo de execução e bloqueios da migração estimados para a maior tabela afetada.
- [ ] Nenhum dado existente violando as novas restrições (consulta de verificação executada).

## Exemplo

Pedido: "Tornar o e-mail do cliente único, ignorando maiúsculas e contas excluídas."

1. Consulta de verificação para encontrar duplicidades existentes e plano para resolvê-las.
2. Migração 1 (expandir): índice único parcial sobre a forma normalizada do e-mail, restrito a registros não excluídos, criado sem bloquear escrita.
3. Código: normaliza o e-mail na escrita e traduz a violação da restrição em erro de conflito amigável.
4. Teste de integração: duas criações concorrentes com o mesmo e-mail resultam em exatamente um sucesso.

## Skills relacionadas

- `backend-engineering` para a camada de aplicação que usa o esquema.
- `performance-engineering` para investigação de lentidão ponta a ponta.
- `privacy-lgpd` para retenção, anonimização e dados pessoais.
- `system-architecture` para escolha de tecnologia de armazenamento.
