# Controles por categoria de risco

Mapa entre as categorias do OWASP Top 10 (edição 2021) e controles concretos. Use como lista de conferência durante a implementação e a revisão. A lista de categorias é revisada periodicamente: confirme a edição vigente ao citar numeração em relatórios.

| Categoria | O que dá errado | Controles |
| --- | --- | --- |
| A01 Quebra de controle de acesso | Usuário acessa recurso ou função que não é sua | Negar por padrão; verificação por recurso no servidor; escopo de inquilino na camada de dados; teste do caso negado; sem identificadores de dono vindos do cliente |
| A02 Falhas criptográficas | Dado sensível exposto em trânsito ou em repouso | TLS em tudo; hash de senha adequado; cifragem autenticada; chaves fora do código; não armazenar o que não precisa |
| A03 Injeção | Dado interpretado como código | Parâmetros vinculados; escape contextual; lista de permissão; sem shell; sanitização de HTML rico |
| A04 Desenho inseguro | Falha de lógica que nenhum patch corrige | Modelagem de ameaças; limites de uso; fluxos de recuperação seguros; casos de abuso como requisitos |
| A05 Configuração insegura | Padrões abertos, recursos de depuração ativos | Configuração validada na inicialização; cabeçalhos de segurança; modo de depuração desligado; permissões mínimas; ambientes equivalentes |
| A06 Componentes vulneráveis | Dependência com falha conhecida | Arquivo de trava; auditoria automatizada; atualização contínua; inventário de componentes; remover o que não é usado |
| A07 Falhas de identificação e autenticação | Conta tomada por terceiros | Limite de tentativas; segundo fator; sessão rotacionada; tokens curtos; recuperação sem enumeração de contas |
| A08 Falhas de integridade de software e dados | Código ou dado adulterado é aceito | Verificação de assinatura em atualizações e webhooks; pipeline protegido; desserialização segura; dependências de origem verificada |
| A09 Falhas de registro e monitoramento | Ataque ocorre sem ser percebido | Log de eventos de segurança; alertas; retenção; logs protegidos contra alteração; sem dados sensíveis |
| A10 Requisição forjada pelo servidor | Servidor é induzido a acessar destino interno | Lista de permissão de destinos; bloqueio de endereços privados após resolução; sem redirecionamento automático; rede segmentada |

## Perguntas rápidas por tipo de mudança

**Novo endpoint**
- Exige autenticação? Qual permissão? Confere o dono do recurso?
- Entrada validada por esquema, com tamanho máximo?
- Há limite de taxa? A resposta expõe campos que o solicitante não deveria ver?

**Consulta ao banco**
- Todos os valores são parâmetros? Ordenação e filtros dinâmicos vêm de lista de permissão?
- O filtro de inquilino está aplicado?

**Arquivo**
- Nome e caminho definidos pelo servidor? Tipo conferido pelo conteúdo? Tamanho limitado?
- É servido de origem separada ou como anexo?

**Chamada a serviço externo**
- Destino fixo ou validado? Tempo limite definido? Resposta tratada como não confiável?
- A credencial usada tem escopo mínimo?

**Autenticação e sessão**
- Mensagens não revelam existência de conta? Há limite de tentativas?
- Identificador de sessão rotacionado no login e invalidado no logout?

**Interface**
- Algum HTML dinâmico sem escape? Algum dado sensível em URL, armazenamento local ou log do navegador?

## Aplicações com modelos de linguagem

Quando o sistema usa LLM, acrescente:

- Conteúdo recuperado (documentos, páginas, e-mails) é dado, não instrução: mantenha separado das instruções do sistema.
- A saída do modelo é entrada não confiável para o que vier depois: valide antes de executar, consultar ou renderizar.
- Ferramentas expostas ao modelo com menor privilégio; ações irreversíveis exigem confirmação humana.
- Não coloque segredos nem dados de outros usuários no contexto.
- Limite consumo por usuário para conter custo e abuso.

Ver a skill `llm-engineering`.
