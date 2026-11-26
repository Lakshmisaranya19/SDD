# Architecture Discovery Summary

**Status:** Consolidated findings

## Target application principle

The proposed platform is one cohesive learning application with a Content Layer and an Application / Rendering Layer. Authoring, content storage, validation, and loading live in internal Content Layer modules; course navigation, domain behavior, and reusable presentation live in internal application modules. A versioned contract separates their responsibilities and dependencies. Separate applications, deployments, or services are not required. The shared renderer should reproduce the reference's learner experience; only course data changes between subjects.

## What we learned

The reference is a static, client-rendered learning SPA for a 40-lesson system-design course. It uses a single application shell and one lesson-player pattern across the curriculum.

Confirmed from existing evidence:
- 9 modules and 40 lessons
- hash routes for lesson and step
- 445 reported steps
- inline SVG lesson stages
- timeline, guide, goals and metric areas
- local progress, recent and last state
- local theme and locale preferences
- search across lessons, steps and concepts
- desktop/tablet/stack layouts
- shared stage controls
- pre-paint theme, locale and layout bootstrap

The evidence supports a reusable shell and learner experience, but it does not prove that the reference was implemented as a formally separated, schema-validated content system.

## What is reusable

| Reusable capability | Confidence |
|---|---|
| application shell and responsive layout | High |
| course tree/sidebar/drawer | High |
| lesson-player layout | High |
| hash routing and deep links | High |
| step navigation and history | High |
| timeline/current/done state | High |
| guide block rendering | High |
| stage Fit/Replay/Pause/fullscreen controls | High |
| metric chip components | High |
| search UI and keyboard behavior | High |
| progress/recent/last state | High |
| theme/locale preference system | High |
| animation lifecycle and shared CSS patterns | Medium-High |

## What is course-specific

| Course data | Confidence |
|---|---|
| course title and metadata | High |
| module and lesson hierarchy | High |
| lesson titles/subtitles/durations/levels | High |
| step names and order | High |
| guide prose, objectives and callouts | High |
| recap/takeaways and next lesson | High |
| metric labels/values/thresholds | High |
| subject concepts | High |
| visualization nodes, edges and state transitions | Medium |
| animation sequences | Medium |
| translations | High |

## What requires both

- lesson navigation
- diagram state and animation
- search
- progress
- localization
- goals
- recaps
- metric rendering
- theme-aware visualization palettes

## What remains unknown

- the reference site's original content file format
- whether content is formally separate from the bundle
- exact data schema for every SVG and animation state
- exact search ranking and index generation
- reset/clear progress semantics
- completion semantics outside the tested flows
- PWA offline behavior
- service-worker scope
- analytics and telemetry
- authentication/accounts and remote synchronization
- complete locale matrix
- complete accessibility matrix
- exact dynamic chunk loading contract

These unknowns should remain documented rather than being inferred as implementation facts.

## Architectural decisions to make

1. course package format
2. manifest and lesson schemas
3. guide block and content type model
4. visualization representation
5. animation data model
6. route format
7. local-storage and progress storage API
8. search index strategy
9. localization resource ownership
10. static bundle versus runtime content loading
11. first implementation framework and build pipeline
12. accessibility baseline

## Proposed next development step

Begin Spec-Driven Development from the reference-derived Version 1 scope. The following sequence validates the content contract and renderer; it does not reduce the final Version 1 experience to a small sample:

1. Define a versioned course manifest and lesson/step schema from the [product capability inventory](product-capability-inventory.md).
2. Use representative reference lessons to validate the schema and renderer against the required layouts and learning features.
3. Implement the content presentation and visualization capabilities established by the reference evidence; do not assume an arbitrary initial component set.
4. Implement the reference's routing, timeline, navigation and progress behavior.
5. Implement the reference's guide, search and other shared application capabilities.
6. Validate that a second subject requires content and assets, not core application branches.

Do not finalize a universal schema for every possible visualization in the first pass. Define the Version 1 visualization contract from the reference scenes; introduce future renderer extensions only when distinct content patterns expose a genuine reusable capability.

## Direct answer to the task

1. **What are we building?** One reusable learning application whose internal rendering layer consumes independent, schema-conforming course packages supplied by its Content Layer.
2. **What capabilities should it provide?** The reference-aligned lesson player, hierarchy navigation, routing, timeline, guide, visualization, search, single progress experience, preferences and responsive layout.
3. **What information must a course supply?** Metadata, modules, lessons, steps, guide content, objectives, recaps, metrics, visualization definitions and translations.
4. **How should diagrams and animations be represented?** Derive the Version 1 model from the reference's observed scenes and animations; keep unverified details open, and extend the renderer only for reusable capabilities, never for a specific course.
5. **How will content be consumed?** A versioned manifest and validated course package loaded through a lazy content loader.
6. **Which features are shared?** Navigation shell, lesson state, progress, search, preferences, shared UI and visualization controls.
7. **Which features are course-specific?** Subject hierarchy, titles, copy, examples, concepts, data values and visual states.
8. **How will a new subject be added?** Add or update a course package through the Content Layer and update its catalog. The normal application content-release process may be needed, but core rendering logic should remain unchanged for supported content types.
9. **Which architecture should be implemented first?** A content contract and renderer based on the reference-derived Version 1 inventory, with route/player state, visualization, progress and search behavior matching the reference.
