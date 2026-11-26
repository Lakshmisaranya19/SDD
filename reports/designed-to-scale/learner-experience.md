# Learner Experience

**Status:** Evidence-based learner journey

## Journey summary

```text
Open course
  -> resume or open initial lesson
  -> select module and lesson
  -> read lesson step
  -> move through timeline or Next/Back
  -> view recap
  -> mark lesson complete
  -> select next or return to the curriculum
```

Search and preferences can be used at any point.

## 1. Enter the course

The initial route opens the `request-lifecycle` lesson at step 1 in the tested state. A learner can instead deep-link directly to a lesson and step.

Application responsibilities:
- restore last/recent state
- normalize invalid routes
- open the initial lesson
- render the shell and preselected sidebar lesson

Course responsibilities:
- initial lesson ID
- lesson and step IDs
- module hierarchy

## 2. Select a module

The sidebar presents 9 collapsible modules. The module shows the module title and lesson completion count. Module 01 starts open in the observed load.

Application responsibilities:
- accordion state
- active module/lesson state
- completion count derivation
- mobile drawer behavior

Course responsibilities:
- module title/order
- lesson membership
- lesson metadata

## 3. Open a lesson

Opening a lesson from the sidebar or search:
- updates the hash
- opens step 1 unless a step is supplied
- renders metadata, stage, timeline and guide
- closes a mobile drawer if used

Application responsibilities:
- route parsing
- data loading
- selected lesson state
- responsive navigation

Course responsibilities:
- lesson content and visual data

## 4. Read a step

Each step combines:
- a lesson stage
- a timeline position
- a guide card
- objectives
- optional metric chips
- optional callouts/takeaways

The learner can:
- view the visual
- fit or fullscreen it
- replay it
- pause traffic/animation
- read the guide

Application responsibilities:
- shared stage controls
- animation lifecycle
- reading/guide highlight state
- metric formatting
- accessibility and reduced motion

Course responsibilities:
- lesson prose
- objectives
- step titles
- visualization states
- metric values

## 5. Move through steps

Learners can:
- choose a timeline step
- press Next/Back
- use browser Back/Forward
- use a deep link
- use native keyboard controls in tested flows

At step 1, Back is disabled. The Next control names the next step.

Application responsibilities:
- step bounds
- route updates
- history
- current/done timeline calculation
- next/previous labels

Course responsibilities:
- step order and titles

## 6. Revisit and resume

The app stores:
- last lesson and step
- recent lesson/step entries
- completed lesson IDs

Learners can also use browser history and stable hash links.

Application responsibilities:
- persistence adapter
- bounded recent list
- restoration
- route and preference consistency

Course responsibilities:
- stable IDs
- module/lesson relationships

## 7. Search

Search opens by button or Ctrl+K. It exposes recent, lesson, concept and step results. Arrow keys move selection and Enter opens the result.

Application responsibilities:
- search UI
- index lifecycle
- keyboard interaction
- result route generation
- empty and no-result states

Course responsibilities:
- searchable text
- concept names
- lesson/step metadata

## 8. Change preferences

Learners can:
- switch light/dark theme
- choose a locale
- use an Arabic or Hebrew RTL layout

Application responsibilities:
- pre-paint defaults
- persistence
- runtime UI/resource loading
- document direction

Course responsibilities:
- translated UI/course content
- locale formatting rules

## 9. Complete a lesson

In the tested request-lifecycle and sharding flows:
- reaching the final/recap step marks the lesson complete
- `sdt:done` gains the lesson ID
- progress increases
- module and course counts update
- a next-lesson prompt appears

Reset semantics and whether completion can be changed independently remain unknown.

Application responsibilities:
- completion state
- progress derivation
- next lesson routing

Course responsibilities:
- recap step
- lesson ID
- next lesson recommendation

## 10. Continue to the next lesson

The final control continues to the next lesson in the tested experience. Learners can also open any lesson from the curriculum or search.

Application responsibilities:
- next/previous lesson lookup
- navigation and route updates

Course responsibilities:
- curriculum order
- explicit next-lesson overrides if required
