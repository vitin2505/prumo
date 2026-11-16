# Modelo de relatório de auditoria

Use este modelo no modo completo. Preencha todas as seções; quando uma não se aplicar, escreva o motivo em vez de removê-la.

```markdown
# Relatório de auditoria de segurança: <nome do alvo>

## 1. Resumo

- **Alvo:** <repositório ou módulo>
- **Referência analisada:** <commit> (árvore de trabalho limpa: sim/não)
- **Escopo:** <caminhos incluídos>
- **Fora do escopo:** <caminhos e aspectos não examinados>
- **Tipo de cobertura:** completa do escopo | parcial
- **Método:** análise estática do código-fonte; reprodução local com dados fictícios quando indicado
- **Resultado:** <n> confirmados (<críticos>/<altos>/<médios>/<baixos>/<informativos>), <n> requerem validação, <n> rejeitados

<Dois ou três parágrafos: os riscos mais relevantes e a ação prioritária.>

## 2. Arquitetura e fronteiras de confiança

- **Atores:** <anônimo, usuário, administrador, serviço interno, terceiro>
- **Pontos de entrada:** <rotas, consumidores, tarefas, webhooks>
- **Armazenamentos e integrações:** <bancos, filas, serviços externos>
- **Autenticação e autorização:** <mecanismo e onde é aplicado>

## 3. Achados confirmados

### <ID> <Título> · Severidade: <nível>

- **Ator:** <quem explora e com que privilégio>
- **Entrada:** <requisição, mensagem ou arquivo>
- **Caminho:** <arquivo:linha> → <arquivo:linha> → <ponto sensível>
- **Controle ausente ou falho:** <o que deveria impedir>
- **Impacto demonstrado:** <resultado concreto>
- **Pré-condições:** <o que precisa ser verdade>
- **Reprodução local:** <passos com dados fictícios, ou "análise estática apenas">
- **Correção recomendada:** <menor mudança, com local>
- **Teste de regressão:** <o que o teste deve provar>

## 4. Itens que requerem validação

### <ID> <Título>

- **Hipótese:** <fronteira que pode estar sendo violada>
- **Evidência no código:** <arquivo:linha>
- **Fato ausente:** <configuração ou comportamento que o repositório não mostra>
- **Como validar com segurança:** <verificação pelo responsável, sem sondar produção>

## 5. Candidatos rejeitados

| ID | Hipótese | Motivo da rejeição |
| --- | --- | --- |

## 6. Matriz de cobertura

| Superfície | Controle de acesso | Injeção | Autenticação e sessão | SSRF | Exposição de dados | Lógica de negócio | Configuração |
| --- | --- | --- | --- | --- | --- | --- | --- |
| <módulo ou rota> | coberto | coberto | n/a | não examinado | ... | ... | ... |

Legenda: **coberto** (examinado, com ou sem achado), **n/a** (não se aplica), **não examinado** (lacuna declarada).

## 7. Recomendações de fortalecimento

<Melhorias de defesa em profundidade que não são vulnerabilidades. Mantidas separadas dos achados.>

## 8. Limitações

<O que esta auditoria não cobre: infraestrutura, configuração de produção, dependências transitivas, testes dinâmicos, etc.>
```

## Regras de preenchimento

1. Todo achado confirmado cita arquivo e linha existentes na referência analisada.
2. Severidade apenas na seção 3.
3. A contagem do resumo coincide com as seções 3, 4 e 5.
4. Sem instruções de exploração contra ambientes reais.
5. Segredos encontrados são citados por local e tipo, nunca reproduzidos.
