# Content vs. Application Analysis

**Status:** Evidence-based synthesis

The reference shows strong evidence of a shared lesson-player shell and a consistent content shape across 40 lessons. It does not provide enough source or runtime evidence to prove a formally separate content repository or finalized schema. This document therefore separates the observed behavior, architectural inference, and a proposed target boundary.

## What belongs in course content

| Content type | Reference example | Why it is course data | Confidence |
|---|---|---|---|
| Course metadata | System Design title, subtitle, author and educational description | Changes for Kubernetes, Docker or a future subject | High |
| Module hierarchy | Foundations, Scaling, Data & Storage | Defines course-specific organization | High |
| Lesson metadata | `caching`, 14 min, Beginner, 13 steps | Stable lesson IDs and display metadata | High |
| Lesson step names | “DB melts”, “Hit rate”, “Recap” | Directly supplies timeline and search text | High |
| Guide copy | H2, body paragraphs, callouts and takeaways | Subject-specific learner-facing text | High |
| Learning objectives | Cache lesson goals and constraints | Individual lesson information | Medium |
| Recaps | Takeaways and next-lesson prompt | Supplied per final step | High |
| Metrics | Cache hit rate, DB CPU, p95 latency | Values and labels vary by lesson and step | High |
| Visualization definition | Caching nodes, database, cache and traffic states | Subject-specific elements and relationships | Medium |
| Animation sequence | Replay, held states, pulses, change highlights | Sequencing and target elements vary by lesson | Medium |
| Course concepts | Cache-aside, cache stampede, negative caching | Search extraction and glossary-style content | High for observed concepts; medium for formal extraction |
| References/examples | Cache invalidation quote and case examples | Optional course-specific enrichment | Medium |
| Translations | Spanish/Japanese/Arabic lesson text | Course text and locale-specific translations | High |

## What belongs in the reusable application

| Responsibility | Evidence | Confidence |
|---|---|---|
| Render the shell and lesson page | Same 40 lessons use the same observed page structure | High |
| Parse and react to hash routes | `#/lesson-id/step`, browser history and normalization | High |
| Manage lesson step state | Next, Back, timeline and direct deep-link behavior | High |
| Derive timeline completion/current state | Timeline dots and labels update as state changes | High |
| Render guide components | The guide supports headings, body, callouts, changes and takeaways | High |
| Render and control visualization stages | Fit, replay, pause, fullscreen and step transitions share controls | High |
| Animate step transitions | Fresh-in and guide-in patterns repeat across lessons | High |
| Track completion/recent/last state | Identifier arrays and objects are stored locally | High |
| Expose search UI and keyboard behavior | Shared dialog and combobox semantics | High |
| Manage theme and locale preferences | Pre-paint bootstrap and persisted preference keys | High |
| Implement responsive layout | Desktop/tablet/stack policy changes the shared shell | High |
| Apply accessibility behavior | Shared focus, keyboard activation and live-region infrastructure | Medium |

## What requires both

| Feature | Application responsibility | Content responsibility | Evidence |
|---|---|---|---|
| Lesson navigation | Route/step state machine, history and controls | Lesson IDs, step IDs/names and order | [routes-and-navigation.md](routes-and-navigation.md) |
| Diagram changes | State transition and SVG/diagram rendering | Nodes, labels, connections, changed states and metrics | [q21.out.json](q21.out.json), [q23.out.json](q23.out.json) |
| Search | Dialog, index lifecycle and ranking UI | Searchable metadata, concept definitions and route targets | [q6.out.json](q6.out.json) |
| Progress | Completion storage and derived module/course counters | Module membership and lesson IDs | [data-and-persistence.md](data-and-persistence.md) |
| Localization | Locale resolution, RTL, loading and fallback | UI translations and course translations | [q27-final.json](q27-final.json), [q19-lang.json](q19-lang.json) |
| Goals | Goals card layout | Subject-lesson objectives | [q9.out.json](q9.out.json) |
| Recap | Recap layout and completion trigger | Takeaways and next-lesson link | [q25.out.json](q25.out.json), [q16.out.json](q16.out.json) |
| Metrics | Chip components and value formatting | Metric keys, labels, values and thresholds | [q21.out.json](q21.out.json) |
| Search indexing | Generic indexing pipeline | Lesson/step concepts and exact text | [q6.out.json](q6.out.json) |
| Theme | Shared palette application | Optional visualization-specific color overrides | [q7.out.json](q7.out.json) |

## Concrete separation examples

### Caching lesson

The reusable app owns:
- the 13-step lesson state
- timeline/current/done presentation
- hash updates
- diagram Fit/Replay/Pause/fullscreen controls
- cache hit-rate and DB CPU chip rendering
- guide animation
- completion on the final step

Course content owns:
- lesson title and module placement
- 13 step titles
- cache, database and application node definitions
- cache-hit and stale-data states
- values such as 92% DB CPU or cache hit 0%
- warning copy and recap takeaways

### Request-lifecycle lesson

The reusable app owns:
- 10-step back/next navigation
- stage and guide layouts
- browser deep-link restoration

Course content owns:
- DNS, connection, server, response and asset elements
- latency values
- step-specific copy
- recap and next-lesson prompt

## Architectural inference

The consistent 40-lesson structure strongly suggests a shared lesson renderer backed by content objects or generated content chunks. But the only confirmed mechanism is the final static experience. The evidence is insufficient to claim there is a formal published schema or that every lesson has a separate source-format file.

## Recommended content boundary

Implement this boundary within one cohesive learning application. The Content Layer (authoring, repository, validation, and loading) and the Application / Rendering Layer (domain behavior and reusable presentation) are logically separate modules that communicate through the versioned content contract. This is a responsibility and dependency boundary, not a requirement for separate applications, deployments, or services.

The future platform should keep the following separate:

1. A **course manifest** defining course metadata and module/lesson hierarchy.
2. A **lesson document** defining each lesson's metadata, objectives and ordered steps.
3. A **visualization document or typed block** for diagrams and animation.
4. A **translation resource** for course and UI strings.
5. A **search index artifact** generated from course content rather than authored into the application.

The core renderer should not contain lesson IDs, titles, subject definitions or subject-specific renderer branches. Course packages remain data; the same application's Content Layer supplies validated models to the shared renderer.
