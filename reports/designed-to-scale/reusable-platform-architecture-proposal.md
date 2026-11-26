# Reusable Platform Architecture Proposal

**Status:** Recommendation for our application; not a claim about the reference implementation

## Application boundary

Build one cohesive learning application. The Content Layer (authoring, contract, validation, and course repository) and the Application / Rendering Layer (navigation, domain state, and reusable UI) are separate internal modules connected by the versioned content contract. "Separate" here means responsibility, code organization, and dependency boundaries—not separate applications, deployments, or required services. Course packages are data supplied to the same application's renderer; course-specific renderer implementations are not part of the design. The reference is the Version 1 blueprint: derive the initial supported components and capabilities from the [product capability inventory](product-capability-inventory.md) and [visualization inventory](visualization-inventory.md), rather than inventing a starter set. Recreate that learner-facing interface and behavior as closely as possible, with course data—not course-specific code—determining what is displayed.

## Target architecture

```text
One learning application (one deployment)
  Content Layer
    authoring and course organization
    versioned contract and validation
    course repository and loader
          | validated course data via contract
          v
  Application / Rendering Layer
    application domain state
      routing, lesson navigation, progress, preferences, search
    rendering engine
      shell, lesson player, guide blocks, timeline, metrics
    visualization engine
      shared primitive renderers, step state, animation lifecycle

Course packages are data owned by the Content Layer, not separate applications.
```

## 1. Course content

Keep course content independent from application code.

Illustrative package structure (not a final folder or file-format decision):

```text
content/
  kubernetes/
    course.yaml
    modules/
      fundamentals/
        module.yaml
        lessons/
    assets/
  docker/
    course.yaml
    modules/
    assets/
  signoz/
    course.yaml
    modules/
    assets/
```

A course package should own:
- course metadata
- module hierarchy
- lesson metadata
- step records
- guide content
- lesson objectives
- recap and takeaways
- metrics
- visualization definitions
- translations
- course-specific assets

Course package should not own application components or route implementation.
Every course follows the same agreed package structure and contract, but each course's files and assets are maintained independently.

## 2. Content schema and validation

Use versioned typed schemas rather than ad-hoc JavaScript objects.

Minimum schema groups:

```text
CourseManifest
Module
Lesson
LessonStep
GuideBlock
Visualization
Metric
LocalizationBundle
SearchDocument
```

Recommended schema validation:
- require stable IDs
- require unique lesson/step IDs
- require step index continuity or normalize with warning
- validate visualization references
- validate metric keys and units
- validate translations against source locale
- reject unknown guide block types
- include a schema version in course metadata
- report invalid content and unsupported schema versions clearly
- prefer additive content-type changes that preserve existing course compatibility

Do not introduce a migration framework until an actual breaking schema change requires one.

## 3. Content loading

Use a build-time or runtime loader that resolves a course manifest and lazily loads lessons.

Recommended interface:

```text
loadCourse(courseId): CourseManifest
loadLesson(courseId, lessonId): Lesson
loadLocalization(courseId, locale): LocalizationBundle
loadVisualization(courseId, visualizationId): Visualization
```

Options within the same application:
- static course files bundled with the application for simple deployment
- route/lazy chunk per lesson, still loaded by the same application
- same-origin manifest/content files read by the application's repository for more frequent updates

The loader should not contain subject-specific branches. It receives a repository interface and returns contract-validated course data; it must not import files or behavior from individual course implementations.

## 4. Rendering engine

The lesson renderer should consume typed content and compose shared UI primitives.

Core components:
- application shell
- top bar
- course sidebar/drawer
- course module tree
- lesson header
- stage container
- timeline
- guide card
- goals card
- metrics row
- pager
- search dialog
- preference menus

The shared renderer should select a visualization based on a `renderer` or `type` field and never import each subject's lesson components.

## 5. Visualization engine

The visualization engine should have:
- a primitive component registry
- a step-state resolver
- an animation timeline
- fit/zoom utilities
- replay/pause controls
- fullscreen support
- theme mapping
- accessibility metadata

Derive the Version 1 primitive set from the reference scenes and their observed behavior in the [visualization inventory](visualization-inventory.md). Do not treat a generic list of possible shapes as a committed component set. Keep the scene data model open until representative reference patterns have been compared, as noted in the [reference content model](reference-content-model.md).

Renderer capabilities should be extensible by generic content type:

```text
rendererRegistry.register(referenceSupportedType, sharedRenderer)
```

The Version 1 registry must contain the capabilities established by reference evidence, not a speculative list. It must not select renderers by course ID, lesson ID, or subject. Add a shared renderer capability only when the reference baseline or a later approved requirement calls for it; a course package itself must never introduce application code.

## 6. Navigation and progress

Navigation state should be course-agnostic:

```text
courseId
moduleId
lessonId
stepIndex
```

Routing should support:
- course entry route
- module/lesson route
- lesson/step route
- browser history
- deep-link normalization
- invalid route fallback

Use one learner-facing progress experience matching the reference; do not add a second tracker or new progress behavior without justification. Keep its data separate from course packages. Store completion by course namespace:

```text
courseId + lessonId
```

This avoids collision if multiple courses are installed together.

Course packages continue to contain the full course and lesson order regardless of an individual learner's completion state.

## 7. Search

Use a build-time index or a lightweight runtime index.

Each searchable document should contain:
- course/lesson/step IDs
- type
- title
- body/concept text
- locale
- route target
- optional relevance fields

The search UI should be shared. Ranking and grouping can be configurable per course, but course-specific hardcoded results should not exist.

## 8. Preferences

Preferences should be independent of course content:
- theme
- locale
- layout mode
- animation preference
- text or reading preferences

Storage keys should be namespaced and optionally versioned:

```text
learning.platform.theme
learning.platform.locale
learning.platform.progress.<courseId>
learning.platform.recent.<courseId>
```

## 9. Localization

Separate:
- application UI strings
- course content translations
- date/number/unit formatting
- directionality

Use `source locale -> target locale` fallback. RTL should be handled by layout primitives and logical CSS properties rather than course-specific CSS.

## 10. Adding a new course

Proposed workflow:

1. Add a course manifest.
2. Add modules and lessons.
3. Add step and guide content.
4. Add visualization data using supported generic types; if needed, extend the shared renderer for a new generic content type, never for a specific course.
5. Add translations and assets.
6. Run schema validation.
7. Build the course search index.
8. Publish the package through the same application's content repository/catalog. If packages are bundled, use the normal application release process; a separate service or deployment is not required.

No new course should require changing:
- lesson player routing
- timeline logic
- progress storage
- search dialog
- theme/locale behavior
- shared layout components

Only a new generic visualization primitive or interaction type should require core application code. Content changes must not create course-specific renderer branches.

## 11. First implementation slice

This is an implementation sequence, not a reduced Version 1 feature scope. The completed Version 1 must reproduce the capabilities identified in the reference inventories; representative lessons are validation fixtures, not a substitute for that scope.

Build in this order:

1. Versioned course manifest and lesson schema
2. Loader and validation
3. Lesson route and step state
4. Shared lesson shell
5. Guide block renderer
6. Timeline and pager
7. Progress and recent/last state
8. Generic SVG primitive renderer
9. Search index/UI
10. Theme, locale and responsive shell
11. Replay/pause/fullscreen and accessibility hardening

This first slice should validate the architecture with at least two deliberately different courses or representative lessons.
