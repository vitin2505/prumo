# Convenções REST

Convenções padrão para APIs novas. Em API existente, a convenção já adotada prevalece.

## URLs

- Recursos no plural, em minúsculas com hífen: `/ordens-de-servico`.
- Hierarquia apenas para posse real, com no máximo dois níveis: `/clientes/{id}/enderecos`.
- Filtros, ordenação e paginação na query: `?status=aberto&ordenar=-criado_em&limite=50`.
- Ação que não é CRUD: sub-recurso nomeado como substantivo: `POST /faturas/{id}/estorno`.
- Sem barra final, sem extensão de arquivo, sem verbo.

## Métodos

| Método | Uso | Idempotente | Corpo de resposta típico |
| --- | --- | --- | --- |
| `GET` | Ler | Sim | Recurso ou coleção |
| `POST` | Criar ou executar ação | Não (use chave de idempotência) | Recurso criado, com `Location` |
| `PUT` | Substituir por completo | Sim | Recurso |
| `PATCH` | Alterar parcialmente | Depende do formato | Recurso |
| `DELETE` | Remover | Sim | Vazio |

## Códigos de status

| Código | Quando |
| --- | --- |
| `200` | Sucesso com corpo |
| `201` | Recurso criado |
| `202` | Aceito para processamento assíncrono; devolva onde consultar o andamento |
| `204` | Sucesso sem corpo |
| `400` | Requisição malformada (sintaxe, tipo) |
| `401` | Não autenticado |
| `403` | Autenticado, sem permissão para a operação |
| `404` | Não existe, ou existe e o solicitante não pode saber |
| `409` | Conflito com o estado atual |
| `412` | Pré-condição falhou (`If-Match`) |
| `422` | Sintaxe correta, conteúdo inválido para a regra |
| `429` | Limite de taxa excedido |
| `500` | Erro inesperado do servidor |
| `503` | Indisponível temporariamente; inclua `Retry-After` |

## Formato de erro

```json
{
  "type": "https://api.exemplo.com/erros/validacao",
  "title": "Dados inválidos",
  "status": 422,
  "code": "validacao_falhou",
  "detail": "Um ou mais campos são inválidos.",
  "instance": "/v1/clientes",
  "trace_id": "01J9...",
  "errors": [
    { "field": "email", "code": "formato_invalido", "message": "Informe um e-mail válido." }
  ]
}
```

Tipo de mídia: `application/problem+json`.

## Coleções

```json
{
  "data": [ { "id": "cli_1" } ],
  "pagination": { "next_cursor": "eyJ...", "has_more": true }
}
```

- `limite` com padrão e máximo documentados; valor acima do máximo é erro ou é reduzido, de forma documentada.
- O cursor é opaco: o cliente não o interpreta.
- Contagem total só quando barata; se oferecida, é opcional.

## Representações

- Nomes de campo em um único padrão (`snake_case` ou `camelCase`) em toda a API.
- Datas e horas em ISO 8601 com fuso: `2026-03-10T14:30:00Z`. Datas sem hora: `2026-03-10`.
- Dinheiro: inteiro na menor unidade mais a moeda, ou string decimal: `{ "valor": 1990, "moeda": "BRL" }`.
- Identificadores como string. Prefixo por tipo ajuda na depuração (`ped_`, `cli_`).
- Enumerações como strings estáveis em minúsculas.
- Ausência de valor: omita o campo ou use `null`, de forma consistente e documentada.

## Concorrência e cache

- Devolva `ETag` em recursos editáveis; exija `If-Match` em atualizações para evitar sobrescrita perdida.
- `Cache-Control` explícito em toda resposta de leitura; dados por usuário nunca em cache compartilhado.
- Requisições condicionais (`If-None-Match`) economizam banda em leituras repetidas.

## Versionamento

- Uma versão principal no caminho (`/v1`) é a opção mais simples de operar e depurar.
- Só incremente para mudança incompatível; evolua de forma aditiva dentro da versão.
- Depreciação anunciada na especificação e nos cabeçalhos `Deprecation` e `Sunset`.

## Operações em lote e assíncronas

- Lote: recurso próprio (`POST /importacoes`), com resultado por item e sucesso parcial explícito.
- Processamento longo: `202` com recurso de acompanhamento (`GET /importacoes/{id}`) com estado, progresso e resultado; opcionalmente notificação por webhook.

## Limite de taxa

- Cabeçalhos de cota restante e de reinício em toda resposta.
- `429` com `Retry-After`. Limites por credencial, documentados.
