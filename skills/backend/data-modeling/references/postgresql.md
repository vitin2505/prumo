# PostgreSQL: referência prática

Confirme a versão do servidor (`SELECT version();`) antes de aplicar um recurso específico; comportamentos de DDL mudam entre versões principais.

## Tipos recomendados

| Necessidade | Tipo | Observação |
| --- | --- | --- |
| Chave primária | `bigint GENERATED ALWAYS AS IDENTITY` ou `uuid` | UUID ordenável por tempo reduz fragmentação de índice em relação ao aleatório |
| Texto | `text` | Limite de tamanho por `CHECK`, quando for regra de negócio |
| Data e hora | `timestamptz` | Evite `timestamp` sem fuso para instantes |
| Dinheiro | `numeric(p,s)` ou inteiro em centavos | Nunca `float`, `real` ou `money` |
| Conjunto fechado estável | `CHECK` com lista ou tabela de domínio | `enum` nativo é rígido para remover valores |
| Dados semiestruturados | `jsonb` | Apenas para o que não é filtrado nem relacionado com frequência |
| Intervalos | tipos `range` com restrição de exclusão | Impede sobreposição (reservas, vigências) |

## Índices

- **B-tree** (padrão): igualdade, intervalo e ordenação.
- **Parcial**: `CREATE INDEX ... WHERE excluido_em IS NULL` reduz tamanho e permite unicidade condicional.
- **De expressão**: `CREATE UNIQUE INDEX ... ON clientes (lower(email))`. A consulta precisa usar a mesma expressão.
- **Cobertura**: `INCLUDE (coluna)` permite varredura apenas no índice.
- **GIN**: `jsonb`, arrays e busca textual.
- **BRIN**: tabelas muito grandes, apenas com inserção e naturalmente ordenadas (por tempo).
- Chaves estrangeiras não criam índice na coluna que referencia: crie manualmente.

## Lendo planos de execução

Use `EXPLAIN (ANALYZE, BUFFERS)` em ambiente com dados realistas. `ANALYZE` executa a consulta de verdade: envolva comandos de escrita em transação com `ROLLBACK`.

Sinais a investigar:

- **Varredura sequencial em tabela grande** com filtro seletivo: falta índice ou a expressão não corresponde ao índice.
- **Linhas estimadas muito diferentes das reais**: estatísticas desatualizadas (`ANALYZE tabela`) ou correlação entre colunas.
- **Ordenação ou hash em disco**: memória de trabalho insuficiente ou conjunto grande demais; reduza as linhas antes.
- **Laço aninhado com muitas iterações**: junção sem índice no lado interno.
- **Muitos buffers lidos para poucas linhas devolvidas**: índice pouco seletivo ou tabela inchada.

## Alterações de esquema e bloqueios

A maioria dos comandos `ALTER TABLE` exige bloqueio exclusivo, que enfileira atrás de transações longas e bloqueia todas as demais enquanto espera. Regras:

1. Defina `lock_timeout` curto na sessão da migração e tente novamente em caso de falha, em vez de travar a fila.
2. **Adicionar coluna**: anulável ou com valor padrão constante é rápido nas versões atuais. Padrão volátil reescreve a tabela.
3. **Índice**: `CREATE INDEX CONCURRENTLY` (fora de bloco de transação). Se falhar, sobra um índice inválido que deve ser removido antes de repetir.
4. **Chave estrangeira e `CHECK`**: adicione com `NOT VALID` e depois execute `VALIDATE CONSTRAINT` em comando separado, que não bloqueia escrita.
5. **`NOT NULL` em tabela grande**: adicione `CHECK (coluna IS NOT NULL) NOT VALID`, valide e então aplique `SET NOT NULL`, que aproveita a restrição já validada.
6. **Mudança de tipo**: em geral reescreve a tabela. Prefira coluna nova, preenchimento em lotes e troca.
7. **Preenchimento de dados**: lotes pequenos com confirmação entre eles, fora da migração de esquema.

## Concorrência

- Nível padrão: `READ COMMITTED`. Para invariantes entre linhas use `SELECT ... FOR UPDATE`, restrições ou `SERIALIZABLE` com repetição em caso de falha de serialização.
- Filas em tabela: `FOR UPDATE SKIP LOCKED`.
- Inserir ou atualizar: `INSERT ... ON CONFLICT (...) DO UPDATE`.
- Bloqueio por chave de negócio sem linha existente: bloqueios consultivos de transação.

## Operação

- Use pool de conexões; conexões são caras e limitadas.
- Transações ociosas abertas impedem a limpeza de linhas mortas e seguram bloqueios: configure tempo limite para sessão ociosa em transação.
- Acompanhe consultas mais custosas pelas estatísticas de execução do servidor, não por impressão.
- Em sistemas multi-inquilino, considere segurança em nível de linha como segunda barreira, além do filtro na aplicação.
