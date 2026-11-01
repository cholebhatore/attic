---
name: docs-standard
description: >-
  House standard for writing documentation in any fumadocs app. Defines how to
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
- **Whether a math plugin is configured.** Grep for `rehype-katex` and `remark-math`. This app has
  `remark-math` and `rehype-katex` configured (with KaTeX CSS), so `$formula$` and `$$equation$$` are
  fully supported. Only those two delimiters work: LaTeX's `\[...\]` and `\(...\)` are not parsed by
  `remark-math` and render as literal backslashes. If working in an app without a math plugin, `$...$`
  renders as literal dollar signs and braces like `2^{h+1}` throw Acorn JSX parse errors, in which
  case write math in inline backticks instead.
- **Two or three existing pages in the same section.** They define depth, tone, and structure better
  than this file does. If the user explicitly asks to write in a specific tone, then you can skip this part.

## Find the scope document

Documentation usually has a source of truth that enumerates what must be covered: a toc, an
outline, an architecture spec, a roadmap, a set of tracking issues, or a section index that already
links pages which do not exist yet. Look for one before writing — `ls content/docs`, grep for
`toc|outline|plan|roadmap|architecture`, and read the nearest index page. The user will most likely provide the scope.

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

## Editing text the reader wrote

Study docs often arrive with the reader's own explanation pasted in wherever they got stuck, plus
markers like `(this still sounds difficult)` or `todo: add X somewhere`. Those are instructions, not
prose.

- **Topics are load-bearing; wording is not.** Never drop a topic or subtopic. Rewording, merging
  duplicate passages, and reordering are all fair. Simplify by adding intuition, never by skimming
  content away.
- **Their phrasing is the style guide.** An analogy the reader reached for themselves is evidence
  about what lands. Keep that register, and their words where the words work.
- **Move it, do not append it.** Pasted text belongs where it fits the argument, which is rarely
  where it was typed. Resolve the confusion marker, then delete the marker.
- **Every geometric claim needs two numbers.** If a page asserts a shape, an angle, or which way a
  weight moves, put a hand-checkable instance beside it. A claim the reader can verify in their head
  stops being a claim.

## Writing standard

## Depth policy

Breadth over depth. There is no limit to the number of code lines, but avoid writing unnecessarily.

- Keep boilerplate low: no repeated "in this section we will" framing, no recap paragraphs.
- Break explanations down into a logical story: start with a real-world system failure or puzzle, explain the root cause, and then show the working solution.
- Keep the language conversational, clear, and easy to follow, but never omit important technical terms. Instead, define them immediately using the analogy.
- Highlight common developer mistakes and practical interview pitfalls.
- First lay out the hierarchy, then dive into the subtopics. For example, if a topic has four subtopics, list all four before you start explaining each one, instead of jumping straight into the first and then the second and so on.
- Use tooltips, callouts, and accordions to provide additional information without overwhelming the main content.
- Keep the pages short and focused, but do not sacrifice completeness. If a topic requires more depth, consider splitting it into multiple pages or sections.
- Keep the descriptions short.

The reason to hold a line budget is that a reader scanning for one term should find it. Length is
not a proxy for rigor, and padding buries the thing they came for.

## Learning notes: basics first, advanced kept

Study material is written for a reader who must reach the advanced content without having been told
the basics. Medium or advanced level is never a reason to skip a basic term: if a page uses NLP,
MLP, encoding, or a loader, the notes define it somewhere the reader passes first. Make it easy, and
leave nothing out.

- **Never delete, only expand.** Keep every topic, number, example, and advanced detail. Rearranging,
  merging duplicates, and rewording are allowed when every point survives. Before reporting, read the
  removed lines in `git diff` and confirm each is a rewording, a move, or a deliberate fix.
- **A basics page opens every section** (for example AI Basics, PyTorch Basics, RAG Basics). It
  carries: the field or pipeline map, every stage or idea in order with one line each, a vocabulary
  table, a tiny runnable from-scratch example, the tech stack, a "where each idea is covered" table,
  and interview questions.
- **Every content page opens with `## The plain-language version`**, placed before the first deep H2.
  It says where the page sits in the section's sequence or pipeline, explains the idea in plain words
  with an everyday analogy, lists the page's topics in order (hierarchy before detail), and gives a
  `| Word | Plain meaning |` table defining every term the page uses. Add a common-mistake callout
  where one exists.
- **Order follows the real flow.** When a section describes a pipeline or process, pages and sidebar
  groups follow the order data or work moves through it (for RAG: load, parse, ingest, chunk, embed,
  index, retrieve, rerank, assemble, generate, evaluate). Use `---Label---` separators in the section
  `meta.json` to group the stages. If a topic is taught out of flow order, say why on the page.
- **Fill missing stages.** If the sequence has a gap (no page on loaders, parsing, or ingestion while
  later stages are covered in depth), write the missing page rather than leaving the gap to a later
  page's aside. Cross-link scattered material from where it lives now to its new home.
- **Cover the tech stack with theory.** For each stage, name the category of tool, explain how it works
  inside (what a PDF stores, how MinHash estimates similarity, why a cross-encoder is slower), then list
  real tools with what each is best at. Categories outlive brands, so the theory comes first.
- **Define terms where they first appear**, and link to the page that goes deeper rather than
  re-explaining it.
- **Mark interview-relevant pages** with `interview: true` in the curriculum data, and the `INTERVIEW`
  tag in overview listings.

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
- A section index for learning material also carries a full topic map: every heading from every child
  page, in reading order, one clause of detail each, as a closed `<Accordion>` per page. It serves
  three readers at once — the one previewing, the one revising, and the one using it as a cheat
  sheet — and it is the only place the section's real breadth is visible on one screen.
- Where a page ends with a recall list (interview questions, review prompts, self-checks), make it an
  `<Accordions>` block with one `<Accordion>` per item and a short answer in the body. A prompt the
  reader cannot check is a list of anxieties, not a study tool; collapsing it keeps the page scannable
  while leaving the answer one click away. Leave the titles unnumbered: the order in the file is the
  reading order, and a leading digit is noise once every panel is closed. Give each term its own
  definition page entry rather than a repeated gloss.

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
formatting, the blank lines were missing. A markdown list at column 0 is worse than vanished: the
indented closing tag reads as a lazy continuation of the last item, and MDX throws expecting
`</Accordion>`. Indent list bullets four spaces inside a JSX child.

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
   path. A `000` is usually the dev server still compiling — retry one route before believing it.
5. If you added or reordered a page, update every registration site. Grep the slug of a neighbouring
   page and fix each hit: folder `meta.json`, the section index (reading-order chart, cards, topic
   map), the parent index, and any generated curriculum data file (in this repo,
   `src/app/ai/curriculum/curriculum-data.ts`, which is the single scope index; there is no `toc.md`).
   One miss leaves a page reachable by URL and invisible in the sidebar.

Do not commit unless asked.
