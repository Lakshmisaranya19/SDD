# Data and Persistence

**Status:** CONFIRMED FOR OBSERVED KEYS; RESET AND SYNC UNVERIFIED

## Local-storage keys

| Key | Observed value/purpose |
|---|---|
| `sdt:theme` | `light` or `dark` |
| `sdt:lang` | Selected locale |
| `sdt:last` | Last lesson and step object |
| `sdt:recent` | Recent lesson/step array |
| `sdt:done` | Completed lesson ID array |
| `sdt:progressOpen` | Progress popover open state |

Evidence: `q1`, `q7`, `q8`, `q16`, `q21`.

## Progress

`0 / 40` starts at an empty local completion set. Completing the tested request-lifecycle lesson adds `request-lifecycle` and produces `1 / 40`.

## Recent and last lesson

The app stores the last visited lesson/step and a recent list. Values are JSON-encoded in localStorage.

## Theme

Inline bootstrap applies the stored dark theme before first paint.

## Language

Inline bootstrap selects query parameter, stored locale, browser locale, or English fallback. `ar` and `he` set RTL.

## Search state

Search is DOM/session interaction state. No dedicated persistent search key was confirmed.

## Pending state semantics

- Reset/clear UI
- Corrupt or invalid local-storage values
- Cross-tab updates
- Storage unavailable/privacy mode
- Migration/versioning
- Remote synchronization
- Account/export/deletion behavior
