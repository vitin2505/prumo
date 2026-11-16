---
name: stack-python-django
description: Aplica convenções de Python moderno e Django, cobrindo tipagem, empacotamento, estrutura de projeto, ORM eficiente, migrações, transações, configurações seguras e APIs com Django REST Framework. Use quando for escrever ou revisar código Python, scripts de automação, modelos, views, serializers, tarefas ou migrações Django, ou diagnosticar consultas lentas e problemas de configuração.
---

# Stack: Python e Django

Convenções de stack. Princípios gerais estão em `backend-engineering`, `data-modeling` e `code-quality`.

## Quando usar

- Código Python de aplicação, biblioteca, script ou automação.
- Projetos Django e Django REST Framework.
- Configuração de ambiente, dependências, lint e testes em Python.

## Antes de escrever

1. Leia `pyproject.toml` (ou os arquivos de requisitos), a versão de Python e de Django, e a configuração de lint, formatação e tipos.
2. Use o gerenciador de dependências e o ambiente virtual que o projeto já usa. Nunca instale no Python do sistema.
3. Confirme recursos recentes na documentação da versão instalada.

## Fluxo

1. **Modele os dados e as regras** antes das views.
2. **Escreva o teste do comportamento** com o executor de testes do projeto.
3. **Implemente** com funções pequenas e tipadas, regra de negócio fora da view.
4. **Confira as consultas geradas** pelo ORM nos caminhos alterados.
5. **Verifique**: formatação, lint, tipos, testes e, em Django, `manage.py check` e `makemigrations --check`.

## Padrões

**Python**
- Anotações de tipo em toda função pública; verificador de tipos na integração contínua.
- Estruturas de dados com `dataclass` (preferencialmente `frozen=True` e `slots=True`) ou biblioteca de validação quando o dado vem de fora.
- `pathlib` para caminhos, `enum` para conjuntos fechados, `datetime` sempre com fuso, `Decimal` para dinheiro.
- Gerenciadores de contexto (`with`) para todo recurso que precisa ser liberado.
- Exceções específicas; nunca `except:` nu nem `except Exception: pass`. Encadeie com `raise ... from`.
- Argumento padrão mutável é um defeito clássico: use `None` e crie dentro da função.
- Compreensões para transformações simples; geradores para volumes grandes.
- `logging` com mensagens parametrizadas, não `print`.
- Subprocessos com lista de argumentos e sem `shell=True`.
- Concorrência: `asyncio` para muitas operações de E/S, processos para CPU. Não misture chamada bloqueante em código assíncrono.

**Projeto**
- Metadados e ferramentas em `pyproject.toml`; dependências com arquivo de trava.
- Um formatador e um linter, configurados e aplicados automaticamente.
- Scripts de automação: funções testáveis, ponto de entrada em `if __name__ == "__main__":`, argumentos por `argparse`, credenciais do ambiente, esperas explícitas por condição em vez de pausas fixas, e registro do que foi feito.

**Django: estrutura**
- Modelo de usuário personalizado desde o primeiro commit; referencie com `get_user_model()` e `settings.AUTH_USER_MODEL`.
- Apps por contexto de negócio. Regra de negócio em funções de serviço ou em métodos do modelo, não em views, serializers ou sinais.
- Sinais apenas para desacoplar apps de terceiros; fluxo de negócio explícito é mais fácil de seguir e de testar.
- Configuração por variáveis de ambiente, validada na inicialização. `DEBUG` falso e `SECRET_KEY` fora do código em produção.

**Django: ORM**
- Elimine N+1: `select_related` para relações de chave estrangeira e um para um; `prefetch_related` para muitos para muitos e relações inversas.
- Carregue só o necessário (`only`, `values`); use `exists()` e `count()` em vez de avaliar o conjunto inteiro.
- Atualizações atômicas no banco com expressões `F`; operações em lote com `bulk_create` e `bulk_update`; grandes volumes com `iterator()`.
- Restrições no modelo (`UniqueConstraint`, `CheckConstraint`) e índices declarados em `Meta`.
- `transaction.atomic` na fronteira do caso de uso; `select_for_update` para leitura seguida de escrita; efeitos externos em `transaction.on_commit`.
- Consultas brutas apenas com parâmetros vinculados.

**Django: migrações**
- Uma migração por mudança lógica, revisada como código. Não edite migração já aplicada.
- Migração de dados separada da de esquema, reversível quando possível, usando o modelo histórico (`apps.get_model`).
- Mudanças em tabelas grandes seguem expandir, migrar e contrair: ver `data-modeling`.

**Django: segurança**
- Execute `manage.py check --deploy` e trate os avisos.
- Mantenha as proteções padrão ativas: CSRF, escape automático de templates, validadores de senha.
- Cookies de sessão e de CSRF seguros, HSTS, `ALLOWED_HOSTS` restrito.
- `mark_safe` e o filtro `safe` apenas sobre conteúdo sanitizado.

**Django REST Framework**
- Um serializer por operação quando entrada e saída diferem; campos listados explicitamente (nunca `"__all__"`).
- Classes de permissão padrão restritivas; permissão por objeto verificada; `get_queryset` já filtrado pelo usuário ou inquilino.
- Paginação, limitação de taxa e filtros configurados globalmente.
- Views finas: validam, chamam o serviço e serializam.

## Evite

- Lógica de negócio em views, serializers, templates ou sinais.
- Consultas dentro de laços e em templates.
- `settings` com segredos versionados.
- Capturar exceção genérica e seguir.
- Código no nível de módulo com efeito colateral na importação.
- Testes que dependem de ordem ou de dados deixados por outro teste.

## Critérios de pronto

- [ ] Formatador, linter e verificador de tipos sem erros novos.
- [ ] Testes passando com o comando do projeto.
- [ ] `manage.py check` limpo; `makemigrations --check` sem migração pendente.
- [ ] Número de consultas dos caminhos alterados conferido em teste (asserção de quantidade).
- [ ] Migrações aplicam e revertem em banco limpo.
- [ ] Nenhum segredo ou configuração de ambiente no código.

## Skills relacionadas

- `backend-engineering` para camadas e casos de uso.
- `data-modeling` para esquema, índices e migrações seguras.
- `api-design` para o contrato exposto.
- `secure-coding` para controles de segurança.
- `testing-strategy` para a estratégia de testes.
