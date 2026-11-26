# Application Architecture

**Status:** NOT READY FOR FINALIZATION

## Confirmed architecture

- Static single-page application
- Vite-style hashed entry assets
- Entry HTML loads a module script and stylesheet
- Client-rendered DOM inside `#app`
- Hash-based routing
- Inline pre-paint bootstrap for theme, language, and layout
- Lesson content and diagram implementations bundled or dynamically chunked
- Local browser storage for preferences and progress

## Entry assets

Current live evidence matches saved assets:

| Asset | Live/Saved SHA-256 |
|---|---|
| `/assets/index-BeXJu_A0.js` | `475546D36E0549AECBC4D5E4557F7D5FECFD0B14F207EF7E0B5412C464B06FA0` |
| `/assets/index-CxX-BAVx.css` | `DC99C195D0230AE0D23C005906C6E307FBD8184AD59408735878B58B7430EEE1` |

Evidence: [asset-freshness.json](evidence/live-2026-11-25/asset-freshness.json), [index.html](index.html), [q18-network.json](q18-network.json).

## Rendering

- Root shell is created client-side.
- Lesson stages use inline SVG.
- Guide cards, timelines, drawers, search, and dialogs are DOM components.
- CSS layout and animation classes are class-driven.
- Dynamic lesson chunk loading was observed during language/navigation probes.

Static analysis of [app.js](app.js) parsed 153,619 AST nodes within the selected source. It remains partial and must not be interpreted as runtime control-flow proof.

## Routing

- Root hash is empty for initial state.
- Lesson routes use `#/lesson-id/step`.
- Numbered steps are one-based in URLs.
- Browser history and deep-link state are runtime-confirmed.

No server routes or backend API contract are established.

## State

Directly observed keys:
- `sdt:theme`
- `sdt:lang`
- `sdt:last`
- `sdt:recent`
- `sdt:done`
- `sdt:progressOpen`

## Unresolved architecture

- State-manager implementation
- Complete component/module organization
- Dynamic import trigger map
- API/data contracts
- Authentication boundary
- Service-worker implementation
- Error-handling boundaries
- Cross-tab synchronization
- Version migration strategy
