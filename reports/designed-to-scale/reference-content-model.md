# Reference Content Model

**Status:** Candidate model derived from observed behavior; not a claim of the reference implementation

The existing evidence is strong at the curriculum and step levels but incomplete for every diagram and guide body. The model below describes what the runtime experience appears to require, not the reference site's internal source format.

## Confirmed hierarchy

```text
Course
  metadata
  modules[]
    module metadata
    lessons[]
      lesson metadata
      steps[]
        step metadata
        guide content
        stage visualization
        metric values
        navigation state
      recap
      goals
```

## Course

Observed:
- Title: System Design
- Author/publisher metadata
- Educational description
- 9 modules
- 40 lessons
- 445 reported lesson steps
- Locale resources

Proposed fields inferred from observed data:

```yaml
id: system-design
title: System Design
subtitle: ...
language: en
modules:
  - id: foundations
    title: Foundations
    lessons:
      - request-lifecycle
```

No original source format is established.

## Module

Observed module fields:
- display title
- stable order
- lesson membership
- completion counters

Example:

```yaml
id: foundations
title: Foundations
order: 1
lessons:
  - request-lifecycle
  - latency-throughput
  - napkin-math
```

## Lesson

Observed fields:
- lesson ID
- title
- module
- duration
- level
- subtitle
- step count
- step names
- guide heading
- metric chips
- goals
- recap

Example:

```yaml
id: caching
title: Caching
module: scaling
durationMinutes: 14
level: Beginner
subtitle: ...
steps:
  - id: db-melts
    title: DB melts
  # ...
goals:
  - ...
```

## Step

Each step appears to supply or determine:
- numeric step index
- timeline title
- guide chapter
- guide heading
- prose body
- callouts
- metric values
- stage/diagram state
- reading text
- navigation label

Example candidate shape:

```yaml
id: stale
index: 5
title: Stale
chapter: Problem
guide:
  heading: The price changed. The cache didn't.
  blocks:
    - type: paragraph
      text: ...
    - type: callout
      kind: warning
      text: ...
  takeaway: ...
visualization:
  type: data-flow
  state: stale-price
metrics:
  - key: hitRate
    value: 0%
    level: bad
```

## Guide content types

Observed:
- eyebrow/chapter labels
- headings
- paragraphs
- unordered or ordered lists
- tables
- callouts, including warning and next-lesson variants
- change annotations
- takeaways
- guide navigation
- previous/next hints

These can be represented as typed content blocks without forcing all lesson text into diagram-specific fields.

## Metric content

Observed generic fields:
- key
- label
- value
- visual level

Different lessons reuse metric keys and also introduce new keys. A course content model should allow a typed metric set per step rather than a global fixed metric table.

## Visualization content

The reference uses inline SVG scenes. A safe candidate model has:
- visualization type
- element collection
- connection collection
- labels
- step-state reference
- animation instructions
- metric bindings
- optional accessibility description

The actual data shape should remain open until the representative SVG patterns are compared.

## Recap content

Observed final-step content includes:
- Recap heading
- bullet or compact takeaway text
- next-lesson callout
- lesson completion
- next lesson navigation

## Localization

The reference stores a locale preference and serves translated UI and lesson text. A future content model should support:
- locale-specific strings
- direction metadata
- formatted numbers/units
- fallback locale

## Required evidence before schema finalization

- complete runtime step records for multiple representative lesson types
- representative SVG element/state definitions
- exact metric threshold rules
- animation timing and target model
- complete localization key ownership
- formal course chunk loading format

## Candidate JSON sketch

```json
{
  "course": {
    "id": "system-design",
    "title": "System Design",
    "modules": [
      {
        "id": "foundations",
        "title": "Foundations",
        "lessons": ["request-lifecycle"]
      }
    ]
  },
  "lesson": {
    "id": "caching",
    "moduleId": "scaling",
    "title": "Caching",
    "steps": [
      {
        "id": "stale",
        "title": "Stale",
        "guide": {
          "chapter": "Problem",
          "heading": "The price changed. The cache didn't.",
          "blocks": []
        },
        "metrics": [],
        "visualization": {
          "renderer": "data-flow",
          "state": "stale-price"
        }
      }
    ]
  }
}
```

This sketch is a proposal, not a representation of the reference application's internal format.
