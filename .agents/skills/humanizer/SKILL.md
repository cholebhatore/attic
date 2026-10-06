---
name: humanizer
description: >-
  Strict human writing standards for EVERYTHING written on the website: docs (content/docs/**),
  section indexes, guides, UI components, landing pages, banners, component titles, and any
  user-facing copy. Removes AI writing tells, corporate filler, staged run-ups, forced triads,
  chatbot residue, and inflated prose. Always active when authoring, modifying, or reviewing
  any user-facing content on the site.
---

# Humanizer: Human Writing Standards for Website & Documentation

Rewrite and author text so it reads like a real person, not an AI model or chatbot. Keep what it says, maintain technical accuracy, and never invent facts.

---

## 0. Mandatory Scope: Universal Website & Docs Rule

> **MANDATORY POLICY**: Apply these humanizer standards to **EVERYTHING** the agent writes on the website, whether it is:
>
> - Documentation pages and references (`content/docs/**`)
> - Section indexes, guides, tutorials, and architecture specs
> - Website UI copy, landing pages, banners, component titles, and labels
> - Any public or user-facing prose in the repository
>
> Never default to generic, robotic, or inflated chatbot prose. State facts directly, plainly, and with the natural voice of an experienced engineer.

---

## 1. Why AI Text Sounds the Way It Does

A language model writes whatever is most likely to come next, so by default it makes the choice that fits the widest range of readers and subjects. A human writer chooses for one reader and one subject, so their choices are uneven, direct, and specific. Every pattern below is one form of the default choice:

1. **Staging.** The sentence signals importance instead of adding a fact, with a contrast that only adds weight or a one-line closer that repeats the point.
2. **Rhythm by rule.** Triads and dashes applied everywhere, whether or not the meaning asks for them.
3. **Inflation.** Ordinary technical facts dressed as pivotal, game-changing, or expert-backed.
4. **Formatting by rule.** Bold text and title case applied to every single item.
5. **Leftovers.** Chat wrappers ("Here is a guide to...", "I hope this helps!") and drafting moves that were never meant for the reader.
6. **Wrong reader.** Explaining background the reader already has, so the actual decision or answer arrives last.

### Two Foundational Rules

1. **Every sentence you write must add something the reader did not already have.** Cut padding that simply re-announces what was just said.
2. **State, don't stage.** If you have a fact, state the fact. Do not warm up the reader or stage an emotional reaction to it.

---

## 2. Operating Modes

### A. Authoring Mode (Website & Docs)

When authoring or modifying documentation files (`.md`, `.mdx`), components, or UI pages:

- Apply these standards **directly at draft time**. Do not write robotic copy with the intent of cleaning it up later.
- Change prose only. Keep code blocks, inline code, terminal commands, file paths, YAML metadata, numbers, and links exact.

### B. Review & Edit Mode

When reviewing existing text or files:

- Read the whole text once and mark patterns, starting with the strongest tells (§1 to §5, §12, §22).
- Draft the rewrite while preserving all technical facts, code examples, and instructions.
- Ensure no factual claims were lost, and no unsupported assertions were added.

### C. Embedded Mode

When writing summaries, pull request descriptions, or user-facing explanations, return clean, direct prose without chat wrappers or theatrical flourishes.

---

## 3. Catalog of AI Writing Tells to Eliminate

### A. Staging Instead of Stating

These are the strongest and most frequent tells in model prose. Act on one sighting.

#### 1. "Not X but Y"

- **Watch for:** `not X but Y`; `not just`, `not only`, or `not merely X, but Y`; `it's not X, it's Y`; the reversed form `X rather than Y`; the same contrast split across sentences ("This does not mean X. It means Y."); a clipped negative tail ("..., no guessing").
- **Problem:** The negative half names something no one claimed, just to make the positive half sound larger. State the point directly. Keep a contrast only when the negative half corrects an active misconception.
- **Before:** _It's not just about running containers; it's about complete operational freedom and high availability._
- **After:** _It runs containers across multiple availability zones for high availability._
- **Before (clipped tail):** _The options come from the selected item, no guessing._
- **After:** _The options come directly from the selected item._

#### 2. One-Line Closers and Dramatic Fragments

- **Watch for:** A one-sentence paragraph that restates the paragraph before it; _"That is the real win."_; _"That distinction matters."_; _"Read that again."_; _"Let that sink in."_; the same closer after several sections; a sentence after an example that announces what it showed (_"This shows the power of..."_, _"The message was clear:"_); rows of fragments (_"No aesthetic prior. No nostalgia."_); spaced words for emphasis (_"every. single. time."_).
- **Problem:** The line begs the reader to pause on a claim instead of adding information. Cut repeating closers. End on the last concrete fact.
- **Before:** _Retries hide brief network outages. That is where the magic happens._
- **After:** _Retries hide brief network outages._

#### 3. Sayings That Sound Deep

- **Watch for:** _the real question is_, _at its core_, _in reality_, _what really matters_, _fundamentally_, _the deeper issue_, _the heart of the matter_, _X is the Y of Z_, _X becomes a trap_, _the architecture of_, _the language of_.
- **Problem:** An ordinary technical point is dressed as an aphorism, adding zero detail. Replace the saying with the specific factual claim.
- **Before:** _At its core, what really matters in microservices is communication._
- **After:** _Microservices depend on reliable network calls between services._

#### 4. Staged Run-Up Before the Point

- **Watch for:** _Let's dive in_, _let's explore_, _let's break this down_, _here's what you need to know_, _now let's look at_, _without further ado_, _heads up_, _quick note_, _Honestly?_, _Look,_, _Here's the thing_, _Let's be honest_, _Real talk_.
- **Problem:** Announcing the point before making it. Cut the run-up entirely and begin with the topic or instruction.
- **Before:** _Let's dive into how IAM policies work in AWS. Here's what you need to know._
- **After:** _AWS IAM policies define access permissions using JSON documents._

#### 5. Arguing with No One

- **Watch for:** _This isn't (mainly) about_, _I'm not saying_, _To be clear_, _Don't get me wrong_, _This is not to say_, _Some might say... but_, _A tempting approach would be_, _One might be tempted to_, _You might think... but_.
- **Problem:** Defending against phantom objections that no reader raised. If an alternative is realistic, evaluate it plainly; otherwise, state the actual mechanism directly.
- **Before:** _To be clear, I'm not saying relational databases are bad, but DynamoDB scales differently._
- **After:** _DynamoDB handles high-throughput key-value lookups with predictable single-digit millisecond latency._

---

### B. Rhythm by Rule

#### 6. Forced Triads

- **Problem:** Forcing ideas into lists of three to sound rhythmic ("scalability, reliability, and security"; "innovation, inspiration, and insights"). If there are two items, state two. If there are four, state four.
- **Before:** _The cluster provides automated failover, zero downtime, and unmatched performance._
- **After:** _The cluster provides automated failover and eliminates downtime during deployments._

#### 7. Repeated Sentence Openings

- **Problem:** Several consecutive sentences starting with the same pronoun or subject ("The service does X. The service also does Y. The service connects to Z."). Vary sentence structure and merge related clauses.

#### 8. Dashes as the Universal Connector

- **Rule:** Do not overuse em dashes (—) or en dashes (–) as a crutch to avoid structuring sentences. Replace excessive dashes with commas, periods, colons, or parentheses. Never use double hyphens (`--`) as dashes in prose. Keep hyphens inside code, commands, flags, and URLs intact.
- **Before:** _The load balancer — configured across multiple subnets — distributes traffic — ensuring zero downtime._
- **After:** _The load balancer, configured across multiple subnets, distributes incoming traffic to maintain availability._

#### 9. Stacked Qualifiers

- **Watch for:** _could potentially_, _might arguably_, _in some cases it may possibly be_.
- **Problem:** Layering hedges over an ordinary statement. Keep genuine technical constraints; remove vague double-hedges.
- **Before:** _It could potentially be argued that this might improve latency._
- **After:** _This reduces request latency._

#### 10. Hyphenated Pairs Everywhere

- **Watch for:** Keeping hyphens in predicate adjectives (_"the service is high-quality"_). Keep hyphens before the noun (_"high-quality code"_), and omit them after (_"the code is high quality"_).

#### 11. Passive Voice and Missing Subjects

- **Problem:** Obscuring who or what executes the action. Use active, clear technical voice.
- **Before:** _Configurations are automatically loaded upon startup._
- **After:** _The server loads its configuration on startup._

---

### C. Inflation and Borrowed Authority

#### 12. Overused AI Words

- **Banned / Overused List:** _Actually_, _additionally_, _align with_, _bolstered_, _crucial_, _deep dive_, _delve_, _enduring_, _enhance_, _garner_, _highlight_ (verb), _interplay_, _intricate/intricacies_, _key_ (adjective), _landscape_ (abstract noun), _meticulous/meticulously_, _pivotal_, _quietly_, _robust_ (figurative; keep technical uses like robust protocol), _showcase_, _tapestry_, _testament_, _underscore_ (verb), _valuable_, _vibrant_.
- **Rule:** Replace these with simple, precise words. Use _important_ or _necessary_ instead of _crucial_ or _pivotal_; use _examine_ or _review_ instead of _delve into_; use _fast_ or _resilient_ instead of _robust_.

#### 13. Inflated Significance

- **Watch for:** _stands as a testament_, _a pivotal moment_, _plays a key role_, _underscores its importance_, _evolving landscape_, _indelible mark_, _the future looks bright_, _exciting times ahead_.
- **Problem:** Dressing up an ordinary tool or release as historic. State what it does.
- **Before:** _Kubernetes stands as a testament to Google's enduring legacy in container orchestration._
- **After:** _Kubernetes originated from Google's internal Borg container management system._

#### 14. Shallow -ing Riders

- **Watch for:** Sentences ending with _-ing_ clauses: _highlighting_, _underscoring_, _emphasizing_, _ensuring_, _reflecting_, _symbolizing_, _contributing to_, _showcasing_.
- **Problem:** Tacking on a faux-philosophical rider to pad sentence length. End the sentence on the action.
- **Before:** _The pipeline executes unit tests on every pull request, ensuring seamless collaboration and highlighting team agility._
- **After:** _The pipeline runs unit tests on every pull request before merging._

#### 15. Sales Fluff & Marketing Buzzwords

- **Watch for:** _rich_, _profound_, _groundbreaking_, _breathtaking_, _stunning_, _must-have_, _next-generation_, _best-in-class_.
- **Problem:** Technical documentation must never sound like marketing copy. State specifications, architecture, and behavior objectively.

#### 16. Avoiding Simple Verbs (is, are, has)

- **Watch for:** _serves as_, _stands as_, _functions as_, _operates as_, _represents_, _boasts_, _features_.
- **Problem:** Reaching for elaborate phrasing when simple verbs are clearest.
- **Before:** _The cluster features three worker nodes and boasts automated scaling._
- **After:** _The cluster has three worker nodes and scales automatically._

---

### D. Formatting by Rule

#### 17. Bold as Decoration

- **Problem:** Bolding arbitrary words in every sentence, or making every list item start with a bold buzzword followed by a colon when unnecessary.
- **Rule:** Use bold only for genuine UI buttons, key terms on first definition, or critical warnings. Do not bold every third word.

#### 18. Decorative Headings & Emoji Clutter

- **Problem:** Headings in Title Case with random decorative emojis (🚀 Launch Phase, 💡 Pro Tip, ⚡ Fast Setup).
- **Rule:** Use clean Sentence case headings without decorative emojis unless an established style explicitly calls for one.

---

### E. Leftovers from Chatbots

#### 19. Chatbot Residue

- **Banned:** _I hope this helps!_, _Of course!_, _Certainly!_, _Great question!_, _Let me know if you need anything else!_, _As mentioned earlier_, _In this guide, we will explore..._.
- **Rule:** Strip all conversational boilerplate immediately. Documentation must read as standalone, permanent reference material.

#### 20. Knowledge Cut-off Disclaimers

- **Banned:** _As of my last update..._, _While details are limited in available sources..._.
- **Rule:** If information is verified, state it. If an API has changed, verify the current implementation and document what is accurate.

#### 21. Document Self-Narration

- **Watch for:** _This document was created to..._, _The section below outlines..._, _As you can see in the diagram above..._.
- **Rule:** Talk about the subject (the infrastructure, the code, the API), not the document itself.

---

### F. Writing for the Reader

#### 22. Respecting Reader Context

- When answering or writing a technical subchapter, do not re-explain the entire history of cloud computing before answering the question.
- Start directly with the relevant solution, command, or architectural principle.

---

## 4. Quick Checklist Before Saving Any Website Content

Before saving any page, component, or doc file:

- [ ] Are all staged run-ups removed? (No _"Let's dive in"_, _"Here's what you need to know"_)
- [ ] Are all dramatic one-line closers removed? (No _"That's the real win."_)
- [ ] Are banned AI filler words removed? (No _delve_, _crucial_, _pivotal_, _testament_, _robust_, _landscape_)
- [ ] Are em dashes used sparingly and naturally, without acting as random sentence glue?
- [ ] Are headings in sentence case and free of decorative emoji clutter?
- [ ] Is chatbot residue eliminated? (No _"I hope this helps"_, _"Of course!"_)
- [ ] Does every paragraph state facts directly using simple verbs (`is`, `has`, `uses`)?
- [ ] Is the technical instruction clear, executable, and accurate?
