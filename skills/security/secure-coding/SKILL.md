---
name: secure-coding
description: Aplica controles de segurança durante a escrita de código, cobrindo validação de entrada, injeção, controle de acesso, criptografia, segredos, dependências e tratamento seguro de erros, com base no OWASP Top 10. Use quando for implementar ou alterar código que recebe entrada externa, lida com autenticação, autorização, arquivos, dados sensíveis, segredos ou chamadas a outros sistemas.
---

# Secure Coding

Segurança é construída no momento em que o código é escrito. Esta skill é usada durante a implementação; para auditar código existente, use `security-review`.

## Quando usar

- Código que recebe dados de fora do processo: requisições, arquivos, filas, webhooks, variáveis de ambiente, respostas de outros serviços.
- Autenticação, sessão, autorização, upload, download, geração de consultas, comandos ou HTML.
- Manipulação de dados pessoais, financeiros ou segredos.

## Princípios

1. **Toda entrada externa é hostil até ser validada**, inclusive a que vem de serviços internos e do próprio banco.
2. **Negar por padrão.** O que não foi explicitamente permitido é recusado.
3. **Menor privilégio**: cada componente, credencial e token com o mínimo necessário.
4. **Defesa em profundidade**: nenhuma barreira é a única.
5. **Falhar fechado**: em erro, a operação é negada e nada sensível é exposto.
6. **Não inventar criptografia**: use bibliotecas consolidadas e padrões atuais.

## Fluxo

1. **Mapeie as fronteiras de confiança** do que será alterado: de onde vem cada dado, quem controla, para onde vai.
2. **Para cada entrada, defina um esquema**: tipo, tamanho, formato, conjunto permitido. Rejeite o que não se encaixa; não tente consertar.
3. **Para cada saída, codifique conforme o destino**: parâmetros vinculados em SQL, escape contextual em HTML, lista de argumentos em comandos, serialização segura em JSON.
4. **Para cada operação, confirme autenticação e autorização por recurso** no servidor.
5. **Percorra a tabela de controles** em [references/owasp-controls.md](references/owasp-controls.md) e aplique os que se relacionam com a mudança.
6. **Escreva o teste negativo**: prove que a entrada maliciosa e o acesso indevido são recusados.
7. **Revise o diff** procurando segredos, logs com dados sensíveis e mensagens de erro detalhadas demais.

## Padrões

**Injeção**
- SQL: sempre parâmetros vinculados. Identificadores dinâmicos (coluna de ordenação) vêm de lista de permissão.
- Comandos: evite interpretador de shell; passe argumentos como lista; valide por lista de permissão.
- HTML: use o escape automático do framework; conteúdo rico passa por sanitizador com lista de permissão.
- Caminhos de arquivo: resolva o caminho final e confirme que permanece dentro do diretório permitido.

**Requisições do servidor a endereços informados pelo usuário (SSRF)**
- Lista de permissão de destinos. Resolva o DNS e bloqueie endereços privados, de loopback e de metadados de nuvem; não siga redirecionamentos sem revalidar.

**Upload de arquivos**
- Valide tipo pelo conteúdo, limite tamanho, gere o nome no servidor, armazene fora da raiz servida e sirva com `Content-Disposition` e tipo fixos.

**Segredos**
- Fora do código, do repositório, dos logs e das mensagens de erro. Carregue do ambiente ou de cofre.
- Segredo exposto em commit é considerado comprometido: rotacione, não apenas remova.

**Criptografia**
- TLS em todo tráfego. Senhas com Argon2id, scrypt ou bcrypt. Aleatoriedade de gerador criptográfico. Comparação de segredos em tempo constante.
- Cifragem autenticada (AES-GCM ou ChaCha20-Poly1305) com chaves gerenciadas fora do código.

**Erros e logs**
- Ao cliente: mensagem genérica e identificador de correlação. No log: detalhe técnico, sem senhas, tokens, documentos ou dados de cartão.
- Registre eventos de segurança: login, falha de autenticação, acesso negado, alteração de permissão.

**Cabeçalhos e navegador**
- Política de segurança de conteúdo restritiva, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, proteção contra enquadramento.
- Cookies de sessão com `HttpOnly`, `Secure` e `SameSite`. CORS com lista de origens explícita, nunca reflexão da origem com credenciais.

**Dependências**
- Versões fixadas por arquivo de trava; auditoria de vulnerabilidades automatizada; avalie manutenção e reputação antes de adicionar um pacote novo.

## Evite

- Validar por lista de bloqueio ("remover caracteres perigosos").
- Autorização apenas na interface ou baseada em dado enviado pelo cliente.
- Desserializar formatos que executam código a partir de dados não confiáveis.
- Desativar verificação de certificado, CSRF ou CORS "temporariamente".
- Expressões regulares com retrocesso catastrófico aplicadas a entrada sem limite de tamanho.
- Segredo em valor padrão de configuração, em teste ou em exemplo.

## Critérios de pronto

- [ ] Toda entrada nova tem esquema de validação com limites.
- [ ] Nenhuma consulta, comando ou HTML montado por concatenação de dado externo.
- [ ] Autorização por recurso presente e coberta por teste do caso negado.
- [ ] Nenhum segredo no diff (busca executada por padrões de chave, token e senha).
- [ ] Respostas de erro sem detalhes internos; logs sem dados sensíveis.
- [ ] Dependências novas justificadas e sem vulnerabilidade conhecida no momento da inclusão.

## Exemplo

Tarefa: endpoint que baixa uma imagem a partir de uma URL informada pelo usuário.

Controles aplicados: esquema aceita apenas `https`; o host é resolvido e recusado se o endereço for privado, de loopback ou de link local; a conexão usa o endereço já validado (evita troca de DNS entre a verificação e o uso); redirecionamentos desativados; tempo limite e tamanho máximo de resposta; tipo validado pelo conteúdo; teste negativo com URL apontando para o endereço de metadados da nuvem e para `localhost`.

## Skills relacionadas

- `security-review` para auditoria de código existente.
- `threat-modeling` para analisar um desenho antes de implementar.
- `privacy-lgpd` para tratamento de dados pessoais.
- `backend-engineering` para autenticação e autorização em detalhe.
- `delivery-pipeline` para verificações de segurança automatizadas.
