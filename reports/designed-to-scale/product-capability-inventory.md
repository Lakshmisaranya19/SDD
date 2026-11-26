# Product Capability Inventory

**Status:** Evidence-based synthesis
**Scope:** Reusable learning-product capabilities observed in the reference application

This inventory distinguishes direct observations from proposals for the future platform. A capability is reusable only when the reference evidence shows a common mechanism, or the mechanism is a reasonable platform-level recommendation clearly labeled as a proposal.

## Capability summary

| Capability | Purpose | Observed behavior | Reusable responsibility | Course data required | Evidence | Confidence |
|---|---|---|---|---|---|---|
| Application shell | Frame the learning experience | Sticky top bar, course navigation, main lesson sheet, and responsive rail/drawer | Shared layout, responsive modes, theme and locale application | Shell labels, top-level section definitions, course branding | [q1.out.json](q1.out.json), [q10-desktop.json](q10-desktop.json), [q10-mobile.json](q10-mobile.json) | High |
| Course tree | Navigate the curriculum | 9 modules and 40 lessons; module accordions; lesson links; completion counts | Expand/collapse, active/done state, deep-link selection | Module IDs/titles/order, lesson metadata, lesson hierarchy | [q2.out.json](q2.out.json), [q9.out.json](q9.out.json), [lessons-raw.json](lessons-raw.json) | High |
| Lesson player | Present one lesson through ordered steps | Header, animated stage, timeline, guide rail, goals, and step pager | Step state, navigation history, fit/replay/pause/fullscreen, completion state | Lesson metadata, step records, guide content, goals, recap, diagram definition | [REPORT.md](REPORT.md), [q21.out.json](q21.out.json), [q25.out.json](q25.out.json) | High |
| Hash routing | Deep-link and revisit lessons | `#/lesson-id/step`; browser back/forward; clamp/normalization of invalid routes | Route parsing, normalization, history integration, unknown route fallback | Stable lesson and step identifiers | [routes-and-navigation.md](routes-and-navigation.md), [q5.out.json](q5.out.json), [q16.out.json](q16.out.json) | High |
| Timeline | Show lesson progression | Numbered step buttons, current/done styling, direct step jumps | State calculation, accessible controls, visual timeline | Step titles, order, optional step duration | [q9.out.json](q9.out.json), [q17.out.json](q17.out.json), [q20.out.json](q20.out.json) | High |
| Step guide | Explain the current lesson state | Chapter label, heading, body, callouts, changes, takeaways, and pager | Shared card/typography animation and reading state | Step copy, chapter label, callouts, takeaways, next-lesson prompt | [q25.out.json](q25.out.json), [q26.out.json](q26.out.json) | High |
| Diagram stage | Visualize learning concepts | Inline SVG with step-specific elements, metrics, replay/pause/fit/fullscreen | SVG-compatible view; fit; step animation; control and accessibility shell | Visualization type, element definitions, labels, connections, step state changes, metrics | [q21.out.json](q21.out.json), [q23.out.json](q23.out.json), [q24.out.json](q24.out.json) | High for shell; medium for complete data model |
| Metrics | Reinforce step outcomes | Small chips change label/value/level by step | Generic chip rendering, levels and transitions | Metric keys, labels, values, thresholds and visual levels | [q21.out.json](q21.out.json), [q9.out.json](q9.out.json) | High for behavior; medium for thresholds |
| Search | Find course and concept information | Search dialog, grouped recent/lesson/concept/step results, keyboard selection | Search index, dialog, result grouping, keyboard interaction | Indexed titles, step names, concepts, guide text, route metadata | [q6.out.json](q6.out.json), [q27-final.json](q27-final.json) | High |
| Progress | Track learner completion | `0 / 40` initially; completed IDs in local storage; module and lesson counts | Store IDs, derive counts, mark active/done/recent states | Course lesson IDs and module membership | [data-and-persistence.md](data-and-persistence.md), [q16.out.json](q16.out.json) | High |
| Recent/last state | Resume or return to learning | `sdt:last` and `sdt:recent` store lesson/step; selection works across locale changes | Persistence, restoration, bounded recent list | Lesson/step IDs | [data-and-persistence.md](data-and-persistence.md), [q21.out.json](q21.out.json) | High |
| Theme | Support light/dark preferences | Pre-paint application, toggle, persisted `sdt:theme`, theme metadata | Theme state and bootstrap independent of course content | Optional course-specific visualization palettes; fallback to shared palette | [q7.out.json](q7.out.json), [visual-design-system.md](visual-design-system.md) | High |
| Localization | Render multiple locales | 22 locale options, persisted locale, browser fallback, RTL for Arabic/Hebrew | Locale resolution, runtime loading, text formatting, RTL/LTR layout | UI strings plus complete course text/metadata translations | [q7.out.json](q7.out.json), [q19-lang.json](q19-lang.json), [q27-final.json](q27-final.json) | High |
| Keyboard interaction | Operate without pointer-only workflows | Ctrl+K, Escape, arrows, Tab, Enter and Space behavior observed in representative flows | Focus management, shortcuts, dialog/drawer trapping, control activation | No course-specific data | [q17.out.json](q17.out.json), [evidence/phase-2-keyboard/native-keyboard-focus.json](evidence/phase-2-keyboard/native-keyboard-focus.json) | Medium |
| Responsive layout | Adapt desktop, tablet and stack layouts | Pre-paint layout mode; persistent sidebar on desktop; drawer at narrower sizes; inline cards on mobile | Shared breakpoints and layout/overflow rules | Course content must remain in semantic blocks; layout exceptions can be optional data | [responsive-behaviour.md](responsive-behaviour.md), [q10-desktop.json](q10-desktop.json), [q10-mobile.json](q10-mobile.json) | High |
| Visual animation | Reinforce step changes | Fresh-in, guide-in, chips, hold/pulse/spot effects and reading highlight styles | Animation engine, reduced-motion handling, state transition lifecycle | Course-specific animation sequence, timing and target element IDs | [q23.out.json](q23.out.json), [visual-design-system.md](visual-design-system.md) | High for CSS patterns; medium for complete sequence model |
| Voice/TTS | Future or optional reading assistance | Speech-related DOM/assets exist, but runtime was unverified | Optional shared speech adapter and control | Language/voice text and voice preferences | [q21.out.json](q21.out.json), [network-and-integrations.md](network-and-integrations.md) | Low |
| PWA/offline | Install or access without network | Manifest and icons confirmed; no worker or cache entries observed | Optional deployment/service-worker policy | No subject-specific content except asset manifests produced at build time | [pwa-and-offline.md](pwa-and-offline.md) | Medium for manifest; low for offline |

## Major product areas

### Application shell

The shell combines a sticky top bar, brand, primary section navigation, search, language and theme controls, a course sidebar/drawer, and the lesson workspace. Desktop keeps all major regions visible. Tablet hides primary navigation and uses the drawer. Stack/mobile moves the rail below the lesson content.

**Reusable:** layout registry, top bar, navigation, drawer behavior, preference controls and breakpoint policy.

**Course-specific:** brand/course name, top-level section labels, module/lesson tree and external publisher links.

### Primary navigation

The Learn section is active and course content is available. Practice, Design Lab and Cheatsheets were observed as present but returned a “coming soon” state in the existing tests.

**Reusable:** section switch mechanism and unavailable-state handling.

**Course-specific:** Which sections a course exposes and whether they have custom content. The reference evidence does not prove these sections should be in every future course.

### Search

Search is an application capability over course data. It searches lesson titles, step titles/content, and extracted concepts. A no-backend static implementation is consistent with observed behavior, though the evidence does not establish the exact implementation or ranking.

**Reusable:** dialog, combobox/listbox, keyboard navigation, grouping and result ranking.

**Course-specific:** all searchable indexed text and result route metadata.

### Progress

Progress is local and identifier-driven. The reference stores a completed lesson-ID set, derives module and course counts, and records last/recent lesson IDs.

**Reusable:** completion state machine and persistence adapter.

**Course-specific:** lesson/module identifiers and completion event semantics.
