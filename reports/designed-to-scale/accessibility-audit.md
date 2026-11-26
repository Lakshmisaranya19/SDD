# Accessibility Audit

**Status:** PARTIALLY VERIFIED

## Confirmed structural evidence

- Search uses `role="dialog"`, `aria-modal="true"`, and `aria-label="Search the course"`
- Search input has combobox role
- Search results use listbox role
- Timeline and guide DOM structures are present
- Diagram SVG has `role="img"`
- Toast uses `role="status"`
- Search focus remained within the input in its probe

Evidence: `q20`, `q27`.

## Confirmed controls

- Hamburger has “Open the course menu” and `aria-expanded`
- Theme button exposes switch-dark/light accessible names
- X credit link has accessible text
- Language items use menuitemradio and aria state
- Fullscreen control exposes accessible label

## Pending native checks

- Full Tab order across the page and all lessons
- Focus entry and restoration for every overlay
- Live-region step-change announcements
- Complete native Enter/Space/arrow behavior matrix
- Complete drawer Tab loop
- Timeline accessible names
- Search result selection by arrow keys
- Progress popover behavior
- Zoom and 200% text behavior

## Native Phase 2 evidence

Native browser input was used through the shared browser page, not synthetic JavaScript dispatch.

Confirmed:
- Ctrl+K opens search and focuses the combobox.
- ArrowDown changes the selected search result.
- Enter opens the selected lesson and changes the hash.
- Escape closes search and closes the course drawer.
- Drawer close restores focus to the menu button.
- Tab moves through the menu, brand, search, language, theme and external link.
- Enter activates the menu and search buttons.
- Space toggles Pause/Play.
- Tab/Shift+Tab moves between timeline controls.
- Enter activates a timeline step and changes the hash.

Partial:
- Search Tab/focus trapping is incomplete; no outside-element focus was observed in one limited sequence, but full wraparound was not proven.
- Drawer close restoration is confirmed, but a complete drawer Tab loop remains untested.
- Replay Enter and theme Space need isolated evidence.
- Visible focus indicators were not measured.

Dedicated record: [native-keyboard-focus.json](evidence/phase-2-keyboard/native-keyboard-focus.json).

## Contrast and SVG

Not sufficiently measured:
- Contrast ratios in light/dark themes
- SVG text alternatives
- SVG title/description
- Diagram visual-only information
- Color-only state differences

## Completion criteria

Produce pass/partial/fail rows for every major control and overlay using native browser input and accessibility snapshots.
