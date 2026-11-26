# Visual Design System

**Status:** PARTIALLY VERIFIED

## Typography

- Primary custom font: JetBrains Mono
- System monospace fallbacks are also present
- Font weights observed: 400, 500, 600, 700, 800
- Font is bundled with Latin, Greek, Cyrillic and Arabic/other subsets as loaded

## Colour

Observed light/dark variables:

| Use | Light | Dark |
|---|---|---|
| Paper/background | `#f4ebe0` | `#211e1a` |
| Default ink | `#1d1b18` | `#efe6d6` |

Theme values were directly observed in `q7`.

## Components

- 1.5px ink borders
- Warm card surfaces
- Rounded cards/dialogs
- Offset drop shadows
- Rounded 32px-style action surfaces in selected controls
- Timeline dots and current/done states
- Toast with icon and text
- Search dialog with backdrop

## Layout

- Desktop top bar, left sidebar, lesson sheet, right rail
- Tablet hides primary top navigation and uses drawer rail behavior
- Stack/mobile uses inline cards and a fixed-width drawer
- `data-layout` is selected before first paint

Exact all-viewport token values and every breakpoint are not fully measured.

## Animation

Observed CSS keyframes:
- `fresh-in`
- `chip-flash`
- `held`
- `spot`
- `pulse`
- `speak-wave`
- `chip-in`
- `guide-in`
- `guide-out`

Evidence: `q23.out.json`, `app.css`.
