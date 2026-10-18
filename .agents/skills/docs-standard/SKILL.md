---
name: docs-standard
description: >-
  House standard for writing documentation in any fumadocs or fumapress app. Defines how to
  discover a repo's own conventions before writing, the breadth-over-depth policy, the rule that
  every number needs a source, how to write code samples when the runtime is unavailable, the MDX
  gotchas that silently break rendering, and the verify-before-done checklist. Use this skill
  whenever asked to write, extend, edit, or review documentation pages, section overviews, guides,
  specs, or study material — including "write docs for X", "add a page about X", "continue the
  docs", "write the next section", or any request to produce content under content/docs/. Pairs
  with the fumadocs and humanizer skills; this one carries the working standard those two do not.
---

# Docs standard

Writing standard for documentation in a fumadocs app. Follow it alongside `fumadocs` (component
choice) and `humanizer` (prose voice). Where they overlap, this file wins.

Nothing here is tied to one subject or one repo. The specifics live in the app you are writing for,
so the first job is always to go and read them.

## Read the app before writing

Five things determine more about the output than any rule below:

- **`package.json` scripts.** These are the real format, lint, typecheck, build, and dev commands.
  Use them instead of guessing `npm run lint` or `npx tsc`.
- **The MDX component map** (`src/components/mdx.tsx` or equivalent). Only the components and icons
  registered there exist in MDX. An unregistered icon renders as nothing and fails silently.
- **The route shape under `src/app`.** A route group such as `(docs)` does not appear in the URL, so
  `content/docs/guides/setup.mdx` may serve at `/guides/setup`. Read the catch-all page to find out
  before you curl anything.
- **Whether a math plugin is configured.** Grep for `rehype-katex` and `remark-math`. Without one,
  `$...$` renders as literal dollar signs and braces like `2^{h+1}` throw Acorn JSX parse errors.
  Write math in inline backticks instead.
- **Two or three existing pages in the same section.** They define depth, tone, and structure better
  than this file does.

## Find the scope document

Documentation usually has a source of truth that enumerates what must be covered: a `toc.md`, an
outline, an architecture spec, a roadmap, a set of tracking issues, or a section index that already
links pages which do not exist yet. Look for one before writing — `ls content/docs`, grep for
`toc|outline|plan|roadmap|architecture`, and read the nearest index page.

If you find one, cover **every topic and subtopic** it lists for the part you are writing. Skipping
a subtopic because it looks minor is the worst failure mode available here: weak prose is subjective
and cheap to fix, while a missing topic is silent, and nobody notices until a reader needs it.

If you cannot find a scope document, ask rather than inventing an outline. A confident outline of
the wrong things is worse than a question.

These files usually belong to the user. Do not move, delete, or reformat one to make your job
easier — including "fixing" placeholder frontmatter that looks broken but is holding the build
green.

## Match the corpus

Existing pages encode conventions no rule file mentions: whether they end with a question list,
exercises, a summary, or a further-reading section; how long a code sample runs; whether headings
are sentence case; whether an overview page tracks progress per section. Read a few and follow
them. If the corpus contradicts itself, follow the most recent pages and say which you chose.

## Writing standard

## Depth policy

Breadth over depth. There is no limit to the number of code lines, but avoid writing unnecessarily.

- Prefer tables, formulas in backticks, and compact API snippets over prose derivation.
- One short paragraph per idea. Skip a worked example when a formula plus one sentence carries the
  same information.
- Keep boilerplate low: no repeated "in this section we will" framing, no recap paragraphs.
- Break explanations down into a logical story: start with a real-world system failure or puzzle, explain the root cause, and then show the working solution.
- Keep the language conversational, clear, and easy to follow, but never omit important technical terms. Instead, define them immediately using the analogy.
- Highlight common developer mistakes and practical interview pitfalls.
- Use bullet points when appropriate, bold key phrases, and direct headings. No fluff, no robotic introductions.

The reason to hold a line budget is that a reader scanning for one term should find it. Length is
not a proxy for rigor, and padding buries the thing they came for.

## Numbers and claims

Never present an invented figure as a measurement. This is the rule most likely to be broken by
accident, because a plausible number reads the same as a correct one.

- Cite anything that came from somewhere: paper title plus arXiv id, library docs, or the config
  file the value came from.
- Estimate ordinary arithmetic instead of verifying it with a script. Rounded figures and orders of
  magnitude are honest; a fabricated seven-digit number presented as a measurement is not. Save the
  compute for derivations with real structure, where a mistake would be silent and the whole page
  rests on the result.
- Say when a number is an estimate or an approximation.

## Code samples

Find out whether the runtime is available before writing code. If it is, running a snippet is cheap
insurance, but do not turn it into a verification loop: obvious output can be estimated, and only
the results that are hard to predict by reading the code are worth executing.

If it is not — dependency missing, no GPU, no network — write from knowledge and be precise by
inspection, because there is no safety net:

- Real API signatures and argument names for the version pinned in the lockfile, not the version
  you remember. Argument names change across major versions and a renamed keyword fails at import
  time for the reader.
- Shapes and types annotated in a comment on the line that produces them.
- Imports present in any block that uses a name.
- Output the reader can check by reading: shapes, dtypes, lengths, booleans, `.tolist()`. Avoid
  opaque object reprs whose formatting cannot be verified without running the code.

Do not install a large dependency to verify a documentation snippet unless the user asked for it.
Writing docs is not authorization to change the machine.

## Page anatomy

`fumadocs` covers frontmatter fields, `meta.json`, section indexes, and component selection. Two
additions:

- Section index pages, in order: intro, a `<Mermaid>` reading-order chart, `<Cards>` linking each
  child page, prerequisites linking back to earlier sections, a "what you should be able to do
  afterwards" list, and canonical resources. The last three only apply to learning material; a
  reference or guide section stops after the cards.
- Content pages: intro paragraph, `---` between every `## H2`, closing section last.
- Where a page ends with a recall list (interview questions, review prompts, self-checks), make it an
  `<Accordions>` block with one `<Accordion>` per item and a short answer in the body. A prompt the
  reader cannot check is a list of anxieties, not a study tool; collapsing it keeps the page scannable
  while leaving the answer one click away. Number the titles so the list still reads in order when
  everything is closed, and give each term its own definition page entry rather than a repeated gloss.

## MDX gotchas not covered elsewhere

Inside a `<Callout>`, blank lines are load-bearing. Prettier merges a heading into the paragraph
that follows it when nothing separates them, which silently destroys the heading — the page still
builds, still passes lint, and renders as one run-on paragraph. Write exactly this shape: heading
indented two spaces, blank line, body at column 0, blank line, closing tag.

```mdx
<Callout type="info">
  ### Heading text

Body paragraph starts at column 0 and is never re-wrapped.

</Callout>
```

The same applies to any JSX block whose children are markdown. If a heading or list vanished after
formatting, the blank lines were missing.

The other JSX-child trap: text inside a component's children is still parsed as MDX, so a literal
`{` or `}` opens an expression and throws, and a `<` followed by a letter opens a tag. That catches
accordion answers, callout bodies and table cells containing set notation, tags, or config literals.
Put such fragments in backticks, or spell them out in words.

## Verify before reporting done

1. Run the repo's formatter on the new files. A clean parse also proves the MDX is valid, which
   makes this the cheapest syntax check available.
2. Run lint and typecheck with the repo's own scripts. Record the pre-existing warnings first so you
   can tell yours apart from them.
3. Build. Kill the dev server before you do — `next build` shares `.next` with it and the two
   corrupt each other's output. Restart the dev server afterwards.
4. `curl` each new route and expect `200`. Derive the URL from the app directory, not the content
   path.
5. Browser-check each page with the browser-use MCP: count `<Mermaid>` SVGs and their `.node`
   elements, assert no `/Syntax error|Parse error|Render Error/` in `document.body.innerText`, and
   confirm callout headings rendered as headings rather than merging into their bodies. Where a page
   has an accordion list, count its triggers against the number of items you wrote, then click one
   and read the panel — collapsed bodies are not in the DOM, so a count alone proves nothing about
   the answers.

   Use `evaluate_script`, never `wait_for` — it dumps the full accessibility tree and exhausts the
   context window. Scripts have a hard 15s timeout, so check one page per call instead of looping
   over routes or loading them into iframes.

Do not commit unless asked.
