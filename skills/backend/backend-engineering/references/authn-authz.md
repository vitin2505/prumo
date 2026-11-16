# Autenticação e autorização

Autenticação responde "quem é"; autorização responde "pode fazer isto, com este recurso". São decisões separadas e ambas pertencem ao servidor.

## Autenticação

**Senhas**
- Armazene apenas o hash, com algoritmo próprio para senhas e custo ajustável: Argon2id (preferido), scrypt ou bcrypt. Nunca hash rápido (MD5, SHA-1, SHA-256 puro).
- Política: comprimento mínimo, sem regras de composição arbitrárias, bloqueio de senhas presentes em vazamentos conhecidos, permitir colar e gerenciadores de senha.
- Mensagens de login e de recuperação não revelam se a conta existe. Tempo de resposta semelhante nos dois casos.

**Proteção contra abuso**
- Limite de tentativas por conta e por origem, com atraso progressivo.
- Segundo fator para operações sensíveis e para contas privilegiadas.
- Tokens de recuperação: aleatórios com pelo menos 128 bits de entropia, uso único, validade curta, armazenados como hash.

**Sessão: escolha consciente**

| Mecanismo | Quando usar | Cuidados |
| --- | --- | --- |
| Sessão no servidor com cookie | Aplicação web própria | Cookie `HttpOnly`, `Secure`, `SameSite=Lax` ou `Strict`; rotacione o identificador no login; proteção CSRF em mutações |
| Token de acesso curto + token de renovação | APIs consumidas por clientes móveis ou de terceiros | Acesso com validade de minutos; renovação rotativa com detecção de reuso; revogação no servidor |
| Delegação via OAuth 2.0 / OpenID Connect | Login por provedor de identidade | Fluxo de código de autorização com PKCE; valide `state`, `nonce`, emissor, audiência e assinatura |

**Tokens assinados (JWT)**
- Fixe o algoritmo aceito no servidor; nunca aceite o algoritmo declarado no próprio token sem lista de permissão.
- Valide assinatura, expiração, emissor e audiência em toda requisição.
- Não coloque dados sensíveis no payload: ele é legível por qualquer portador.
- Token não revogável precisa ter vida curta. Para revogação imediata, mantenha estado no servidor.
- Não guarde tokens em armazenamento acessível por script quando um cookie `HttpOnly` resolve.

## Autorização

**Regra central:** toda operação verifica, no servidor, (1) se o solicitante tem a permissão e (2) se o recurso específico está no seu alcance. A maior parte das falhas reais de controle de acesso é do segundo tipo: o usuário autenticado troca um identificador e acessa o recurso de outra pessoa.

**Modelos**
- **RBAC** (papéis): simples, bom ponto de partida. Verifique permissões, não nomes de papel, para poder evoluir.
- **ABAC** (atributos): regras baseadas em atributos do usuário, do recurso e do contexto. Use quando papéis explodem em combinações.
- **Baseado em relacionamento**: "usuário é membro da organização dona do documento". Adequado a produtos colaborativos.

**Práticas**
1. Negar por padrão: rota sem regra declarada não responde.
2. Centralize a decisão em um único ponto (política, guarda) e a chame de todas as entradas: HTTP, fila, tarefa agendada, console administrativo.
3. Em sistemas multi-inquilino, aplique o filtro de inquilino na camada de dados (escopo obrigatório no repositório ou segurança em nível de linha), de modo que esquecer o filtro seja impossível, não apenas improvável.
4. Recurso de outro dono responde como não encontrado, para não confirmar existência.
5. Verifique também campos: quem pode ler ou alterar cada atributo. Nunca vincule o corpo da requisição direto ao modelo (atribuição em massa).
6. Operações em lote e exportações aplicam a mesma regra a cada item.
7. Reautentique antes de operações críticas (troca de e-mail, senha, dados de pagamento).

## Testes obrigatórios

- Sem credencial: negado.
- Credencial válida sem a permissão: negado.
- Credencial válida de outro inquilino ou dono, usando o identificador do recurso alheio: não encontrado.
- Token expirado, adulterado ou com audiência errada: negado.
- Tentativa de alterar campo protegido pelo corpo da requisição: ignorada ou rejeitada.
