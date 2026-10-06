# Humanizer: Mandatory Writing Standard for Website and User-Facing Content

Apply the **humanizer** standard to **EVERYTHING** written for the website, whether it is documentation, guides, or any user-facing prose.

## Scope of Application

This rule applies universally across the entire project to:

1. **Documentation & Content** (`content/docs/**`): MDX pages, section indexes, guides, concepts, tutorials, references, and `meta.json` titles/descriptions.
2. **UI & Web Application Copy** (`app/**`, `components/**`): Landing pages, hero copy, card descriptions, navigation labels, button text, tooltips, dialogs, badges, empty states, and error messages.
3. **Diagrams & Flowcharts**: Mermaid node labels, flowchart titles, and architectural explanations.
4. **Frontmatter & Metadata**: Page titles, metadata descriptions, OpenGraph tags, and SEO summaries.

## Core Rules

1. **State facts directly; never stage them**:
   - Cut warm-ups and staged run-ups (_"Let's dive in"_, _"Here's what you need to know"_, _"In modern cloud architecture..."_, _"When it comes to..."_).
   - Cut dramatic one-line closers and mic-drops (_"That's where the magic happens."_, _"That distinction matters."_).
   - Cut phantom debates (_"To be clear, I'm not saying X is bad, but Y..."_, _"It's not just about X, it's about Y"_).

2. **Eliminate AI vocabulary & corporate fluff**:
   - Banned words: _delve_, _crucial_, _pivotal_, _robust_, _landscape_, _tapestry_, _testament_, _seamless_, _game-changer_, _streamline_, _leverage_, _unlock_, _elevate_, _powerhouse_, _intricacies_, _enduring_.
   - Replace with plain, precise words: _important_, _needed_, _fast_, _resilient_, _use_, _inspect_, _examine_.

3. **Avoid structural formulas**:
   - No forced triads: Do not force points into lists of three for pseudo-rhythm.
   - Do not overuse em dashes (`—`) as sentence glue.
   - Use simple, active verbs (`is`, `has`, `runs`, `routes`, `stores`, `sends`).

4. **Zero chatbot residue**:
   - No conversational filler (_"I hope this helps!"_, _"Certainly!"_, _"Of course!"_, _"Great question!"_).
   - No document self-narration (_"In this guide we will explore..."_, _"As you can see in the diagram above..."_).

5. **Maintain technical integrity**:
   - Never alter or truncate code blocks, terminal commands, configuration options, exact file paths, or URLs.

For the full detailed catalog of anti-patterns and examples, refer to [SKILL.md](../skills/humanizer/SKILL.md).
