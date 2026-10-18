---
name: html-tracker
description: Build beautiful, self-contained interactive HTML trackers, checklists, curricula, reading lists, roadmaps, and audit pages. Features a minimalist Linear/Vercel-inspired developer aesthetic, Geist and Geist Mono typography, pure-black dark theme (#000000), localStorage state persistence, live progress calculation, real-time search, filter pills, collapsible accordions, clipboard summary export, and toast notifications. Use whenever the user asks to create an interactive HTML checklist, progress tracker, table of contents tracker, curriculum tracker, study plan HTML, audit checklist, or standalone HTML dashboard with checkboxes.
---

# Interactive HTML Tracker

Create standalone, zero-dependency HTML files designed for tracking progress across structured topics, checklists, study curricula, roadmaps, or technical documentation.

The generated HTML file is fully self-contained: HTML, CSS, SVG icons, and vanilla JavaScript all live in a single file that can be opened locally in any browser (`file:///...`) or hosted on any static web server with zero build step.

---

## Design System & Aesthetics

Always follow this exact aesthetic specification:

### 1. Typography & Hierarchy

- **Font Stack**:
  - Sans-serif: `'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
  - Monospace: `'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
  - Import Google Fonts:
    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    ```
- **Font Weights**:
  - Regular (`400`) for descriptions, body text, and secondary copy.
  - Medium (`500`) for item titles, filter pills, and button labels.
  - Semibold (`600`) for headers, badges, section titles, and key metrics.
  - **Never use bold (`700` or `800`)**: semibold (`600`) keeps the UI crisp and uncluttered.
- **Font Sizing**:
  - Hero Title: `18px`, `font-weight: 600`, `letter-spacing: -0.01em`
  - Section Headers: `12px`, `font-weight: 600`, `text-transform: uppercase`, `letter-spacing: 0.05em`
  - Phase / Group Title: `12.5px`, `font-weight: 600`
  - Item Title: `12px`, `font-weight: 500`
  - Description / Body: `11px` to `12px`, line height `1.4` to `1.5`
  - Badges / Micro-pills: `9.5px` to `10.5px`, `font-weight: 600`

### 2. Color Palette (Dark Theme Default, Light Theme Supported)

- **Dark Theme (Default)**:
  - Base background: `#000000` (pure black, never blue-tinted slate or purple)
  - Subtle background: `#080808`
  - Surface cards: `#0e0e0e`
  - Elevated surfaces (badges, buttons, toast): `#161616`
  - Hover surface: `#1c1c1c`
  - Borders: `#242424` (sharp 1px lines)
  - Subtle borders: `#181818`
  - Text primary: `#ededed`
  - Text muted: `#999999`
  - Text dim / secondary: `#666666`
- **Light Theme**:
  - Base background: `#f8fafc`
  - Surface cards: `#ffffff`
  - Elevated surfaces: `#f8fafc`
  - Hover surface: `#f1f5f9`
  - Borders: `#cbd5e1`
  - Subtle borders: `#e2e8f0`
  - Text primary: `#0f172a`
  - Text muted: `#475569`
  - Text dim: `#64748b`
- **Accents**:
  - **Success / Covered (Emerald Green)**:
    - Text/Fill: `#10b981` (light: `#059669`)
    - Background: `#091a12` (light: `#ecfdf5`)
    - Border: `#143d2b` (light: `#a7f3d0`)
  - **Star / Highlight / Priority (Amber)**:
    - Text: `#f59e0b` (light: `#b45309`)
    - Background: `#1c1606` (light: `#fef3c7`)
    - Border: `#3b2e08` (light: `#fde68a`)

### 3. Borders & Cards

- Use subtle 1px borders with standard radius:
  - Small elements (badges, buttons, checkboxes): `border-radius: 3px` or `4px`
  - Cards & Toolbar containers: `border-radius: 6px`
- Do not use loud gradients, neon glows, or heavy drop shadows. Keep everything crisp, flat, and legible.

---

## Layout Architecture & Core Components

Every generated tracker must include these structured sections:

```
┌─────────────────────────────────────────────────────────────┐
│ Top Nav: [Brand Pill]         [Copy Summary] [Theme Toggle] │
│ Header: Hero Title + Concise Description                    │
├─────────────────────────────────────────────────────────────┤
│ Progress Card:                                              │
│   Curriculum Progress                  [X% Covered] [M/N]   │
│   ═══════════════════════[Progress Bar]══════════════════   │
│   [Metric 1]     [Metric 2]     [Metric 3]     [Metric 4]   │
├─────────────────────────────────────────────────────────────┤
│ Toolbar:                                                    │
│   [🔍 Search input (e.g. keyword...)]  [All] [Uncovered] ...│
│   [Expand All] • [Collapse All]     [Mark All] • [Reset]    │
├─────────────────────────────────────────────────────────────┤
│ Group Section 1:                                            │
│   ▼ Phase 1: Topic Group Title         [Written] [0/8] [▼]  │
│       Phase description text...                             │
│       [8 items]                    [Toggle Phase Covered]   │
│       ┌──────────────────────────────────────────────────┐  │
│       │ [ ] Item 1 Title  [⭐ PRIORITY] [✓ Covered] [Link]│  │
│       │     Description of subtopic / item...            │  │
│       ├──────────────────────────────────────────────────┤  │
│       │ [✓] Item 2 Title                 [✓ Covered] [Link]│  │
│       │     Description of subtopic / item...            │  │
│       └──────────────────────────────────────────────────┘  │
│   ▼ Phase 2: ...                                            │
├─────────────────────────────────────────────────────────────┤
│ Footer: Tracker title • LocalStorage auto-save notice       │
└─────────────────────────────────────────────────────────────┘
  [Toast notification bottom-right: Progress updated!]
```

---

## Component Checklist

### 1. Top Nav

- Left: Brand pill with an inline SVG icon (e.g. bookmark, code, terminal, book).
- Right:
  - `Copy Summary` button: formats current completion stats and copies to clipboard with toast feedback.
  - `Theme` toggle button: toggles between dark and light mode, switching moon/sun SVG icons and saving preference in `localStorage`.

### 2. Progress Dashboard Card

- Title + percentage pill (e.g. `0% Covered`).
- Progress ratio counter (e.g. `0 / 120 Topics`).
- Animated smooth progress bar fill: `transition: width 0.25s ease`.
- 4-column metric grid at the bottom with divider line:
  - Category 1 (e.g. Starred / Core items)
  - Category 2 (e.g. Completed / In Progress)
  - Category 3 (e.g. Planned / Backlog)
  - Total Phases / Modules

### 3. Search & Filter Toolbar

- **Search Box**:
  - Search icon on left.
  - Live query input with instant filtering across item titles, descriptions, and tags.
  - Clear button (`&times;`) that appears when input is non-empty.
- **Filter Pills**:
  - `All (Total)`
  - `Uncovered` / `Pending`
  - `Covered` / `Completed`
  - Custom category filters (e.g. `⭐ Core`, `📖 Docs`, `Module A`)
- **Bulk Action Buttons**:
  - `Expand All` / `Collapse All`
  - `Mark All Covered` / `Reset All` (with confirmation or safe toggle)

### 4. Hierarchical Accordion Groups & Phases

- Group titles (e.g. `FOUNDATIONS`, `ADVANCED`, `OPERATIONS`) with item count badges.
- Collapsible cards with:
  - Left: Phase/Module number badge + Phase title.
  - Right: Category badge, completion ratio pill (`0/10`), chevron SVG that rotates `180deg` when expanded.
  - Header click toggles `.expanded` class on the card.
- Phase Body:
  - Phase summary description.
  - Sub-actions bar: item count label and `Toggle Phase Covered` quick-action button.
  - List of child checklist rows.

### 5. Checklist Rows (`.topic-row`)

- **Custom Styled Checkbox**:
  - Hidden `<input type="checkbox">` for native state.
  - Custom `15px x 15px` box with `1.5px` border.
  - On checked: background fills with `var(--accent-green)` and displays a white SVG checkmark.
  - Entire row is clickable to toggle checkbox (with `event.stopPropagation()` on link buttons).
- **Row Content**:
  - Item Title: `12px font-weight: 500`.
  - Badges:
    - Priority / Starred badge: `tag-interview` amber pill with star SVG or emoji.
    - Status badge: `tag-covered-status` green `✓ Covered` pill that shows dynamically when checked.
  - Direct Link Button (`.doc-link-btn`):
    - Optional link to documentation, source code, deployment URL, or external reference.
    - Includes title + external link SVG icon (`↗`).
    - Stays clean with `target="_blank" rel="noopener noreferrer"`.
  - Item Description: `11px` muted gray explaining what the item covers.

### 6. Toast Notification

- Fixed bottom-right notification (`position: fixed; bottom: 20px; right: 20px;`).
- Triggered whenever checkboxes are modified or summary is copied.
- Fades in with `opacity: 1; transform: translateY(0)` and automatically hides after 2 seconds.

---

## JavaScript Architecture (Zero Dependencies)

Embed an IIFE in the `<script>` tag at the bottom of the HTML:

```javascript
(function () {
  const STORAGE_KEY = 'tracker_progress_v1';
  const THEME_KEY = 'tracker_theme_pref';

  // 1. Theme initialization & toggle (reads localStorage or prefers-color-scheme)
  // 2. State loading & saving (Set of checked item IDs in localStorage JSON)
  // 3. UI update pipeline:
  //    - Updates checkboxes to match Set
  //    - Updates item row classes (.is-covered)
  //    - Recalculates master progress bar width & percentage badge
  //    - Updates stats counters (total covered, starred covered, etc.)
  //    - Updates phase badges & marks phase cards (.all-covered)
  // 4. Live search & filter evaluator:
  //    - Matches search query against data attributes / textContent
  //    - Applies activeFilter ('all', 'uncovered', 'covered', 'starred', etc.)
  //    - Hides non-matching rows and auto-expands phases with matching children
  //    - Displays empty-search state if 0 items match
  // 5. Expand / Collapse All handlers
  // 6. Bulk Mark / Reset handlers
  // 7. Copy Summary clipboard handler with toast
})();
```

---

## Reference Template

A complete, working reference implementation is provided in:
`references/template.html`

When building a new tracker, use `references/template.html` as the structural foundation, replacing the curriculum/data array and metadata with the user's specific topics.

---

## Generation Best Practices

1. **Standalone output**: Always ensure the resulting HTML file works offline with no node server, python server, or framework needed.
2. **Build script option**: If generating a large tracker (over 50 items), prefer writing a node generator script (e.g. `scripts/build-tracker.js`) that defines structured JSON and outputs the standalone HTML. This makes future data updates effortless.
3. **Preserve exact font weights**: Never use `font-weight: 700` or `font-weight: bold`. Always stick to `400`, `500`, and `600`.
4. **Pure black dark mode**: Always keep dark theme `--bg: #000000;`. Avoid blue/slate tints.
