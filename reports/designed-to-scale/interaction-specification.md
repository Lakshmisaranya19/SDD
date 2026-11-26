# Interaction Specification

**Status:** MIXED CONFIRMATION

## Lesson navigation

**CONFIRMED**
- Next advances the step and updates hash/history.
- Back returns to the previous step.
- Timeline click sets the selected step.
- Browser Back restores prior lesson state.
- Direct deep-link opens lesson step.

Evidence: `q4`, `q5`, `q16`, `q17`.

## Completion

**CONFIRMED FOR TESTED LESSON**
- At the request-lifecycle final step, `sdt:done` includes `request-lifecycle`.
- Progress increases from `0 / 40` to `1 / 40`.
- The final Next control advances to the next lesson.

Remaining: reset and completion semantics for every lesson.

Evidence: `q5`, `q16`, `q21`.

## Search

**CONFIRMED**
- Opening creates an active search dialog.
- Input shows grouped result categories.
- Empty query text produces no-result messaging.
- Enter/select navigates to a lesson/step.
- Escape closes the search.

Evidence: `q6`, `q20`, `q27`.

## Native keyboard and focus behavior

**CONFIRMED WITH NATIVE INPUT**
- Ctrl+K opens search and focuses the combobox.
- ArrowDown moves search selection.
- Enter opens the selected lesson and updates the hash.
- Escape closes search.
- Tab moves through the header menu, brand, search, language, theme and external link.
- Enter opens and activates the course menu and search button.
- Escape closes the course drawer and restores focus to the menu button.
- Space toggles Pause/Play.
- Tab/Shift+Tab navigate timeline controls.
- Enter activates a timeline step and updates the step hash.

**PARTIALLY VERIFIED**
- Search Tab movement and focus trapping need a full wraparound cycle.
- Drawer requires a complete Tab-loop check.
- Replay and theme activation need isolated native evidence.
- Visible focus indicators are not yet measured.

Evidence: [native-keyboard-focus.json](evidence/phase-2-keyboard/native-keyboard-focus.json).

## Theme

**CONFIRMED**
- Toggle changes document theme state and theme-colour metadata.
- Light/dark state is stored in `sdt:theme`.

Reload persistence remains to be revalidated.

Evidence: `q7`, `q8`.

## Language

**PARTIALLY VERIFIED**
- Locale menu exposes available locales.
- Spanish, Japanese, and Arabic selections changed visible text.
- Arabic set RTL.
- `sdt:lang` stored the selected locale.

Reload, full RTL matrix, and all locale edge cases remain pending.

Evidence: `q7`, `q19`, `q27`.

## Stage tools

**PARTIALLY VERIFIED**
- Pause label toggles Pause/Play.
- Fullscreen enters/exits stage-level full-screen state.
- Replay, Fit, metric transitions, and reading highlight behavior require additional native evidence.

Evidence: `q4`, `q17`, `q23`, `q24`.
