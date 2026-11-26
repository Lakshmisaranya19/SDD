# UI Component Inventory

**Status:** PARTIALLY VERIFIED

## Application shell

| Component | Role | Evidence |
|---|---|---|
| Top bar | Brand, primary navigation, search, language, theme, credit | `q1`, `q2`, `q10` |
| Sidebar/course | Module accordions, lesson links, progress | `q2`, `q11`, `q12` |
| Lesson sheet | Header, stage, timeline | `q1`, `q10` |
| Rail | Guide and goals cards | `q10`, `q20` |
| Drawer | Narrow-layout sidebar container | `q11`, `q12`, `q14` |

## Components

### Search

- Modal-like search shell
- Combobox input
- Clear and close controls
- Grouped listbox
- Recent, lesson, concept, and step result categories
- Empty state

Confirmed: `q6`, `q20`, `q27`.

### Theme and language

- Theme button
- Theme-colour metadata
- Language menu
- 20+ locale items plus mapped browser locale values
- `aria-expanded` menu state

Partial: reload and RTL coverage remain incomplete.

### Sidebar/drawer

- Menu button
- Drawer close button
- Backdrop
- Module accordion
- Progress card
- Lesson links

Confirmed on desktop/tablet/stack. Native focus audit remains pending.

### Lesson stage

- Inline SVG
- Timeline
- Fit
- Replay
- Pause/Play
- Fullscreen
- Metrics chips

Presence confirmed; dynamic transition details remain partial.

### Guide

- Chapter marker
- Heading
- Body
- Callout
- Takeaways
- Previous/Next navigation

Static content structures were observed in `q25` and `q26`.
