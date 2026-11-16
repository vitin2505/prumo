# Tokens de design

Tokens são as decisões visuais com nome. Organizados em camadas, permitem trocar tema e marca sem tocar nos componentes.

## Três camadas

| Camada | O que é | Exemplo | Quem usa |
| --- | --- | --- | --- |
| Primitivos | Valores brutos da paleta e das escalas | `--blue-600`, `--space-4` | Apenas a camada semântica |
| Semânticos | Papel do valor na interface | `--color-action`, `--color-text-muted` | Componentes e telas |
| De componente | Decisão específica de um componente | `--button-padding-x` | O próprio componente |

Componentes nunca referenciam primitivos diretamente: é a camada semântica que muda entre temas.

## Exemplo em CSS

```css
:root {
  /* Primitivos */
  --gray-0: #ffffff;
  --gray-50: #f6f7f9;
  --gray-200: #dfe3e8;
  --gray-600: #5b6573;
  --gray-900: #14181f;
  --blue-600: #1d5fd1;
  --blue-700: #174ba6;
  --red-600: #c62f2f;
  --green-700: #1c7a45;

  /* Semânticos */
  --color-surface: var(--gray-0);
  --color-surface-raised: var(--gray-50);
  --color-border: var(--gray-200);
  --color-text: var(--gray-900);
  --color-text-muted: var(--gray-600);
  --color-action: var(--blue-600);
  --color-action-hover: var(--blue-700);
  --color-on-action: var(--gray-0);
  --color-danger: var(--red-600);
  --color-success: var(--green-700);
  --color-focus-ring: var(--blue-600);

  /* Espaçamento: base de 4 px */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Tipografia */
  --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.5rem;
  --text-2xl: 2rem;
  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-bold: 700;

  /* Forma e elevação */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-full: 9999px;
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.08);
  --shadow-md: 0 4px 12px rgb(0 0 0 / 0.12);

  /* Movimento */
  --duration-fast: 120ms;
  --duration-base: 220ms;
  --ease-out: cubic-bezier(0.2, 0, 0, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
}

[data-theme="dark"] {
  --color-surface: #101319;
  --color-surface-raised: #181c24;
  --color-border: #2a303b;
  --color-text: #eceff3;
  --color-text-muted: #a3acb9;
  --color-action: #6ea0f5;
  --color-action-hover: #8fb5f8;
  --color-on-action: #0b1220;
  --color-focus-ring: #8fb5f8;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0ms;
    --duration-base: 0ms;
  }
}
```

Os valores acima são um ponto de partida ilustrativo. Antes de adotar qualquer par de cores, meça o contraste com uma ferramenta: os valores não substituem a verificação.

## Regras de nomenclatura

- Nome semântico descreve o papel, não a aparência: `--color-danger`, não `--color-red`.
- Pares de fundo e conteúdo são nomeados juntos: `--color-action` e `--color-on-action`.
- Escalas numéricas com intervalos, para permitir inserção futura.
- Mesmo vocabulário no design e no código.

## Token de componente

```css
.button {
  --button-bg: var(--color-action);
  --button-fg: var(--color-on-action);
  --button-padding-x: var(--space-4);
  --button-padding-y: var(--space-2);

  background: var(--button-bg);
  color: var(--button-fg);
  padding: var(--button-padding-y) var(--button-padding-x);
  border-radius: var(--radius-md);
  font-weight: var(--weight-medium);
  transition: background var(--duration-fast) var(--ease-out);
}

.button:hover { --button-bg: var(--color-action-hover); }

.button:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}

.button[data-variant="danger"] { --button-bg: var(--color-danger); }
```

Variantes alteram os tokens do componente, não as propriedades.

## Documentação de um componente

Para cada componente do sistema, registre:

1. **Propósito**: quando usar e quando não usar, com a alternativa.
2. **Anatomia**: partes e quais são opcionais.
3. **Variantes e tamanhos**: com o critério de escolha.
4. **Estados**: padrão, sobre, foco, pressionado, desabilitado, carregando, erro.
5. **Comportamento**: teclado, foco, responsividade, conteúdo longo.
6. **Acessibilidade**: papel, nome acessível, atributos necessários.
7. **Exemplos**: uso correto e uso incorreto.

## Governança

- Token novo exige um caso de uso que os existentes não atendem.
- Mudança em token semântico é mudança incompatível em potencial: avalie o impacto em todos os componentes.
- Uma única fonte de verdade para os tokens, da qual as plataformas derivam.
- Remova tokens sem uso.
