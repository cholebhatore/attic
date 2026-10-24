# Fumadocs / Fumapress Component Reference

> This file documents **every interactive component** available in the MDX content layer.
> All components listed below are globally registered — no imports needed inside `.mdx` files.

> **⚠️ Cross-check before using**: Component APIs may have changed since this file was
> written. Before implementing, fetch the latest component docs from
> **https://fumadocs.dev/docs/ui/components** using `read_url_content` to verify
> prop names, types, and usage patterns are still accurate.

---

## Callout

Highlights important information with colored left border and icon.

### Props

| Prop    | Type                          | Default  | Description                             |
| :------ | :---------------------------- | :------- | :-------------------------------------- |
| `type`  | `"info" \| "warn" \| "error"` | `"info"` | Visual severity                         |
| `title` | `string`                      | —        | Optional title rendered as bold heading |

### Usage

```mdx
<Callout type="info">This is an informational callout. Use for background context.</Callout>

<Callout type="warn">
  ### Custom Title Warning callouts support markdown inside, including headings.
</Callout>

<Callout type="error">This operation is destructive and cannot be reversed.</Callout>
```

### When to Use

- `info` — Supplementary context, definitions, "good to know"
- `warn` — Trade-offs, potential pitfalls, deprecations, latency concerns
- `error` — Breaking changes, critical bugs, dangerous/irreversible operations

### When NOT to Use

- Don't use for general emphasis — use bold text instead
- Don't stack multiple callouts consecutively — add prose between them

---

## Tip

Inline tooltip: a dotted-underline term inside a sentence that reveals a short plain-language explanation on hover or keyboard focus. This is the **inline** counterpart to `<Callout>`, which is block-level.

> [!IMPORTANT]
> **Not a Fumadocs built-in.** `Tip` is a project-local component. It needs `@base-ui/react` (already present as a `fumadocs-ui` dependency — no install required at `^1.8.0`), a `src/components/tip.tsx` file, and registration as `Tip` in `getMDXComponents`. If the target repo lacks it, create all three before using it in MDX.

### Props

| Prop       | Type        | Default  | Description                             |
| :--------- | :---------- | :------- | :-------------------------------------- |
| `term`     | `string`    | Required | Visible trigger text, rendered in place |
| `children` | `ReactNode` | —        | The explanation shown in the popup      |

### Component Implementation (`src/components/tip.tsx`)

```tsx title="src/components/tip.tsx"
'use client';

import { Tooltip } from '@base-ui/react/tooltip';

export function Tip({ term, children }: { term: string; children?: React.ReactNode }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        delay={150}
        render={
          <span
            tabIndex={0}
            className="cursor-default underline decoration-dotted decoration-fd-muted-foreground underline-offset-4"
          />
        }
      >
        {term}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner side="top" align="start" sideOffset={8} className="z-50 max-w-72">
          <Tooltip.Popup className="rounded-xl border bg-fd-popover/60 p-3 text-sm text-fd-popover-foreground shadow-lg backdrop-blur-lg data-open:animate-fd-popover-in data-closed:animate-fd-popover-out">
            {children}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
```

Register it in `getMDXComponents` alongside `Callout`, `Tabs`, and `Mermaid`.

Three implementation details that are easy to get wrong:

1. **`render={<span tabIndex={0} />}` is required.** `Tooltip.Trigger` renders a `<button>` by default. A focusable button mid-sentence shifts the baseline and reads as a control rather than as prose.
2. **`fd-popover` tokens, not hardcoded colors.** `bg-fd-popover`, `text-fd-popover-foreground`, and the `animate-fd-popover-in`/`-out` utilities are the same ones `fumadocs-ui/components/ui/popover.js` uses, so the popup inherits the theme and dark mode for free.
3. **Use `cursor-pointer`, never `cursor-help`.** On Windows `cursor-help` renders the arrow-with-question-mark cursor, which is visually noisy and reads as a help widget. `cursor-pointer` plus the dotted underline signals clickable without the `?`.

### Usage

Keep the whole element on **one line** inside the paragraph:

```mdx
Eigenvalues also describe <Tip term="conditioning">How unevenly a matrix stretches different directions. A badly conditioned matrix makes gradients tiny in one direction and huge in another.</Tip>.
```

### Rules

- **Term goes in the `term` attribute, explanation goes in `children`.** MDX parses markdown inside JSX children but **not** inside attributes, so an explanation written as an attribute would lose emphasis, lists, and inline code. This direction also keeps the fragile part (the trigger) immune to line wrapping.
- **One line, always.** A single-line element stays inline inside the existing `<p>`. Splitting the children across lines risks MDX block-wrapping them and breaking the sentence. Prettier leaves long MDX prose lines untouched, so a long line is safe.
- **Short trigger text.** `term` is an attribute; a multi-word phrase is fine, a sentence is not.
- Keep explanations to 1–2 sentences. Longer belongs in a `<Callout>` or an `<Accordion>`.

### When to Use

- Jargon the page **uses before it defines** — the case a reader actually stalls on
- A named theorem or concept that deserves a plain-language restatement
- Terms appearing mid-sentence, where a `<Callout>` would shatter the reading flow

### When NOT to Use

- Terms the surrounding sentence already defines — the tooltip becomes a duplicate of the prose
- Explanations needing code blocks, links, or other interactive content — Base UI tooltips are for non-interactive content; use a Popover
- Anything a reader must not miss. Hover content is absent from the rendered DOM until opened, so a required definition has to be visible prose
- Body-wide emphasis → use bold text

---

## Tabs / Tab

Organize content into switchable tabbed panels. Great for showing alternatives.

### Props — `<Tabs>`

| Prop      | Type       | Default  | Description                                                   |
| :-------- | :--------- | :------- | :------------------------------------------------------------ |
| `items`   | `string[]` | Required | Tab labels                                                    |
| `groupId` | `string`   | —        | Share active tab across multiple `<Tabs>` with same `groupId` |
| `persist` | `boolean`  | `false`  | Persist selected tab to localStorage                          |

### Props — `<Tab>`

| Prop    | Type     | Default  | Description                          |
| :------ | :------- | :------- | :----------------------------------- |
| `value` | `string` | Required | Must match one of the parent `items` |

### Usage

````mdx
<Tabs items={['npm', 'pnpm', 'yarn']}>
  <Tab value="npm">```bash npm install fumadocs-core fumadocs-ui fumadocs-mdx ```</Tab>
  <Tab value="pnpm">```bash pnpm add fumadocs-core fumadocs-ui fumadocs-mdx ```</Tab>
  <Tab value="yarn">```bash yarn add fumadocs-core fumadocs-ui fumadocs-mdx ```</Tab>
</Tabs>
````

### Syncing Tabs Across Page

```mdx
<Tabs items={['TypeScript', 'JavaScript']} groupId="lang" persist>
  <Tab value="TypeScript">...</Tab>
  <Tab value="JavaScript">...</Tab>
</Tabs>

<!-- Later on the same page, this stays in sync -->

<Tabs items={['TypeScript', 'JavaScript']} groupId="lang" persist>
  <Tab value="TypeScript">...</Tab>
  <Tab value="JavaScript">...</Tab>
</Tabs>
```

### When to Use

- Package manager alternatives (npm/pnpm/yarn/bun)
- Language variants (TypeScript/JavaScript)
- Framework alternatives (Next.js/Fumapress)
- Before/after comparisons
- Different config approaches

---

## Steps / Step

Numbered step-by-step instructions with visual step indicators.

### Usage

````mdx
<Steps>
  <Step>
    ### Install Dependencies

    ```bash
    npm install fumadocs-core fumadocs-ui
    ```

  </Step>
  <Step>
    ### Configure Source

    Create `source.config.ts` in the project root:

    ```typescript title="source.config.ts"
    import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

    export const docs = defineDocs({ dir: 'content/docs' });
    export default defineConfig();
    ```

  </Step>
  <Step>
    ### Start Development Server

    ```bash
    npm run dev
    ```

  </Step>
</Steps>
````

### When to Use

- Installation guides
- Setup walkthroughs
- Multi-step deployment procedures
- Any sequential process with > 2 steps

### When NOT to Use

- Simple 1-2 step actions → just use prose
- Non-sequential content → use `<Accordions>` or `<Cards>`

---

## Cards / Card

Navigation grid for linking to sub-pages or external resources.

### Props — `<Card>`

| Prop          | Type        | Default  | Description                                 |
| :------------ | :---------- | :------- | :------------------------------------------ |
| `title`       | `string`    | Required | Card heading                                |
| `description` | `string`    | —        | Short description below title               |
| `href`        | `string`    | —        | Link destination                            |
| `icon`        | `ReactNode` | —        | Lucide icon component: `icon={<Compass />}` |

### Usage

```mdx
<Cards>
  <Card
    icon={<Compass />}
    title="Getting Started"
    description="Learn the fundamentals and set up your environment"
    href="/docs/getting-started"
  />
  <Card
    icon={<Layers />}
    title="Architecture"
    description="System design and component interactions"
    href="/docs/architecture"
  />
  <Card
    icon={<Wrench />}
    title="Guides"
    description="Step-by-step tutorials for common tasks"
    href="/docs/guides"
  />
</Cards>
```

### Design Rules

- Always include `icon`, `title`, `description`, and `href`.
- Use on **section index pages** to link to child pages.
- Keep descriptions to ≤ 15 words.
- Use 2–6 cards per grid. More than 6 becomes overwhelming.

### When NOT to Use

- Content display — cards are for **navigation**, not for showing information
- FAQs → use `<Accordions>`
- Data comparisons → use tables

---

## Accordions / Accordion

Collapsible sections ideal for FAQs, optional detail, and long reference content.

### Props — `<Accordion>`

| Prop    | Type     | Default  | Description              |
| :------ | :------- | :------- | :----------------------- |
| `title` | `string` | Required | Trigger label            |
| `id`    | `string` | —        | URL-linkable hash anchor |

### Usage

````mdx
<Accordions>
  <Accordion title="What is a Health Factor?" id="health-factor">
    The Health Factor (HF) is the ratio of a borrower's collateral value to
    their outstanding debt. When HF drops below 1.0, the position becomes
    eligible for liquidation.

    ```
    HF = Collateral Value × Liquidation Threshold / Borrowed Value
    ```

  </Accordion>
  <Accordion title="How does the auction window work?" id="auction-window">
    The auction window opens when an unhealthy position is detected and remains
    open for 1–2 blocks to collect competing bids.
  </Accordion>
</Accordions>
````

### When to Use

- FAQ sections
- "Learn more" expandable details
- Optional deep-dive content that most readers will skip
- Glossary definitions

---

## Files / Folder / File

Renders a visual file tree with expand/collapse folders.

### Usage

```mdx
<Files>
  <Folder name="content" defaultOpen>
    <Folder name="docs" defaultOpen>
      <File name="index.mdx" />
      <File name="meta.json" />
      <Folder name="getting-started">
        <File name="meta.json" />
        <File name="index.mdx" />
        <File name="setup.mdx" />
      </Folder>
    </Folder>
  </Folder>
  <File name="source.config.ts" />
  <File name="next.config.mjs" />
</Files>
```

### Props — `<Folder>`

| Prop          | Type      | Default  | Description         |
| :------------ | :-------- | :------- | :------------------ |
| `name`        | `string`  | Required | Folder label        |
| `defaultOpen` | `boolean` | `false`  | Expanded by default |

### Props — `<File>`

| Prop   | Type     | Default  | Description |
| :----- | :------- | :------- | :---------- |
| `name` | `string` | Required | File label  |

### When to Use

- Showing project structure in setup guides
- Explaining content directory layout
- Documenting config file locations

---

## InlineTOC

Renders the page's table of contents inline within the content body.

### Usage

```mdx
---
title: Comprehensive Reference
description: Full API reference for all modules
---

This page covers all modules. Use the table of contents below to jump to any section.

<InlineTOC />

## Module A

...

## Module B

...
```

### When to Use

- Very long reference pages with 8+ H2 headings
- Pages where the sidebar TOC is disabled (`full: true`)

---

## Mermaid

Renders Mermaid diagrams as responsive SVGs with automatic dark/light theme switching.

> [!IMPORTANT]
> **Always Use `<Mermaid chart={`...`} />` (Never Fenced Code Blocks)**:
> In Fumadocs, the Shiki syntax-highlighting pipeline processes fenced ` ```mermaid ` code blocks into static syntax-highlighted code blocks with a copy button. Fenced code blocks will **never** render as interactive SVG diagrams.
>
> You MUST use the `<Mermaid chart={`...`} />` JSX component directly in MDX.
>
> Install `mermaid` (`npm i mermaid next-themes`), create `src/components/mermaid.tsx`, and register `Mermaid` in `getMDXComponents`.

### Component Implementation (`src/components/mermaid.tsx`)

To avoid blurry shadows, fuzzy gradient strokes, and React hydration/ID collisions:

1. In `mermaid.initialize()`, set `look: 'classic'`, `theme: 'base'`, `fontSize: 13`, and configure neutral grayscale `themeVariables` with `useGradient: false` and `dropShadow: 'none'`.
2. Add CSS overrides and scaling to the SVG wrapper container: `[&>svg]:max-w-[480px] md:[&>svg]:max-w-[540px] [&>svg]:w-auto [&>svg]:h-auto [&_rect]:filter-none! [&_polygon]:filter-none! [&_circle]:filter-none! [&_.node_rect]:stroke-[1.25px]!`.
3. Sanitize `useId()` with `.replace(/[^a-zA-Z0-9_-]/g, '')` to avoid invalid CSS selector crashes.

```tsx title="src/components/mermaid.tsx"
'use client';

import { use, useId, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';

const cache = new Map<string, Promise<unknown>>();

function cachePromise<T>(key: string, setPromise: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  if (cached) return cached as Promise<T>;
  const promise = setPromise();
  cache.set(key, promise);
  return promise;
}

type RenderResult =
  | { success: true; svg: string; bindFunctions?: (element: Element) => void }
  | { success: false; error: string };

function MermaidContent({ chart, className = '' }: { chart: string; className?: string }) {
  const rawId = useId();
  const id = `mermaid-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const { default: mermaid } = use(cachePromise('mermaid', () => import('mermaid')));

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    fontFamily: 'inherit',
    fontSize: 13,
    themeCSS: 'margin: 0 !important;',
    look: 'classic',
    theme: 'base',
    flowchart: {
      padding: 8,
    },
    themeVariables: {
      useGradient: false,
      dropShadow: 'none',
      darkMode: isDark,
      background: 'transparent',
      fontFamily: 'inherit',
      fontSize: '13px',

      // Pure monochrome / neutral grayscale colors (no colorful tints)
      primaryColor: isDark ? '#18181b' : '#ffffff',
      primaryTextColor: isDark ? '#f4f4f5' : '#18181b',
      primaryBorderColor: isDark ? '#3f3f46' : '#71717a',

      secondaryColor: isDark ? '#27272a' : '#f4f4f5',
      secondaryTextColor: isDark ? '#f4f4f5' : '#18181b',
      secondaryBorderColor: isDark ? '#3f3f46' : '#71717a',

      tertiaryColor: isDark ? '#18181b' : '#ffffff',
      tertiaryTextColor: isDark ? '#f4f4f5' : '#18181b',
      tertiaryBorderColor: isDark ? '#3f3f46' : '#71717a',

      lineColor: isDark ? '#71717a' : '#71717a',
      arrowheadColor: isDark ? '#71717a' : '#71717a',
      textColor: isDark ? '#f4f4f5' : '#18181b',

      clusterBkg: isDark ? '#121214' : '#fafafa',
      clusterBorder: isDark ? '#27272a' : '#e4e4e7',
      titleColor: isDark ? '#a1a1aa' : '#52525b',

      edgeLabelBackground: isDark ? '#18181b' : '#ffffff',
      nodeBorder: isDark ? '#3f3f46' : '#71717a',
      nodeTextColor: isDark ? '#f4f4f5' : '#18181b',
      mainBkg: isDark ? '#18181b' : '#ffffff',
    },
  });

  const result = use(
    cachePromise<RenderResult>(`${chart}-${resolvedTheme}`, async () => {
      try {
        const res = await mermaid.render(id, chart.replaceAll('\\n', '\n'));
        return {
          success: true,
          svg: res.svg,
          bindFunctions: res.bindFunctions,
        };
      } catch (err: unknown) {
        return {
          success: false,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    }),
  );

  if (!result.success) {
    return (
      <div className="my-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs font-mono text-red-400">
        Mermaid Render Error: {result.error}
      </div>
    );
  }

  return (
    <div
      className={`mermaid-wrapper my-4 flex w-full justify-start overflow-x-auto rounded-lg border border-fd-border bg-fd-card/30 p-4 shadow-xs [&>svg]:m-0! [&>svg]:max-w-135 [&>svg]:w-auto [&>svg]:h-auto [&_rect]:filter-none! [&_polygon]:filter-none! [&_circle]:filter-none! [&_.node_rect]:stroke-[1.25px]! ${className}`}
      ref={(container) => {
        if (container && result.bindFunctions) result.bindFunctions(container);
      }}
      dangerouslySetInnerHTML={{ __html: result.svg }}
    />
  );
}

export function Mermaid({
  chart,
  children,
  className = '',
}: {
  chart?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const code = (
    typeof chart === 'string' ? chart : typeof children === 'string' ? children : ''
  ).trim();
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  if (!isClient || !code) return null;
  return <MermaidContent chart={code} className={className} />;
}
```

### Usage

Use the `<Mermaid />` component directly in MDX:

```mdx
<Mermaid
  chart={`
flowchart LR
    A["Step 1: Detect"] --> B["Step 2: Auction"]
    B --> C["Step 3: Settle"]
`}
/>
```

### Supported Diagram Types

| Type      | Syntax                  | Best For                          |
| :-------- | :---------------------- | :-------------------------------- |
| Flowchart | `flowchart LR/TD/BT/RL` | Process flows, decision trees     |
| Sequence  | `sequenceDiagram`       | API interactions, message passing |
| Timeline  | `timeline`              | Chronological events              |
| Class     | `classDiagram`          | Data models, interfaces           |
| State     | `stateDiagram-v2`       | State machines, lifecycle         |
| ER        | `erDiagram`             | Database schemas                  |
| Graph     | `graph LR/TD`           | Relationship diagrams             |

### Rules

- **Always** quote labels with special characters: `A["Label (with parens)"]`
- Avoid HTML tags inside labels
- Keep diagrams ≤ 15 nodes for readability
- Use `LR` for linear processes, `TD` for hierarchical structures

---

## Math & LaTeX Notation

LaTeX math is enabled in this project via `remark-math` and `rehype-katex` (with KaTeX CSS).

### When to Use LaTeX

- **Mathematical formulas and equations**: Loss functions, attention equations, Taylor expansions, probabilities.
- **Vectors, matrices, and linear transformations**: $\mathbf{y} = A\mathbf{x} + \mathbf{b}$, $W \in \mathbb{R}^{d_{\text{out}} \times d_{\text{in}}}$.
- **Calculus and gradients**: $\nabla_{\mathbf{w}} \mathcal{L}$, $\frac{\partial f}{\partial x}$, $\lim_{h \to 0}$.
- **Greek parameters**: $\alpha, \beta, \gamma, \lambda, \epsilon, \sigma, \theta$.

### Math Syntax Guide

| Pattern                     | Syntax                                             | Output Example                                                   |
| :-------------------------- | :------------------------------------------------- | :--------------------------------------------------------------- |
| **Inline Math**             | `$E = mc^2$` or `$\nabla f(\mathbf{x})$`           | Renders inline formula smoothly within text flow                 |
| **Block / Display Math**    | `$$\mathcal{L} = -\sum y_i \log(\hat{y}_i)$$`      | Centered display equation on its own line                        |
| **Fenced Math Block**       | ` ```math\n\int_0^\infty e^{-x^2} dx\n``` `        | Alternate block syntax for multiline math                        |
| **Matrices**                | `$$\begin{bmatrix} a & b \\ c & d \end{bmatrix}$$` | Clean bracketed matrix                                           |
| **Simple Code Identifiers** | `` `O(1)` ``, `` `k` ``, `` `d_model` ``           | Use backticks when referring to code variables or API signatures |

### MDX Guardrails for Math

> [!IMPORTANT]
>
> - **Always wrap LaTeX formulas in `$...$` or `$$...$$`**: Never leave raw LaTeX macros like `\frac` or unescaped braces like `{h+1}` in markdown prose outside math delimiters, or MDX's Acorn parser will attempt to parse them as JSX JavaScript expressions and fail the build.
> - **Inside JSX Components (`<Callout>`, `<Accordion>`)**: LaTeX math (`$...$` and `$$...$$`) works seamlessly inside Fumadocs JSX components. Keep delimiters tightly bound to content (`$x$` not `$ x $`).
