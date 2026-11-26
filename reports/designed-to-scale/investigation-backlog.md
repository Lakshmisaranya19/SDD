# Prioritized Reverse-Engineering Investigation Backlog

This backlog contains only investigations not already answered sufficiently by existing evidence. Completed but historically unqualified work is marked with reuse guidance.

## P0 — Essential before SDD specification

### P0-1. Establish current asset and deployment identity

**Status: COMPLETED**

**Exact question:** Does the live deployment match the saved `index.html`, `app.js`, `app.css`, bundle names, and historical network observations?

**Why:** Route, component, persistence, and technical behavior cannot be finalized if static captures are stale.

**Existing evidence:**
- `index.html`
- `app.js`
- `app.css`
- `q8.out.json`
- `q18-network.json`
- Live REA target and asset list

**Additional evidence required:**
- Live response SHA-256 for the main JS and CSS assets
- Live response SHA-256 for saved static captures, or a cryptographic hash comparison
- Current entry HTML and asset references
- Deployment/resource cache status

**Suggested REA/browser investigation:** Reuse target `16D98C1A242AF4D867016458EDA593BF`; passively inspect scripts/resources and export script bytes. Do not navigate or mutate storage.

**Completion criteria:** Each relevant live asset is matched or explicitly classified as changed/unknown.

**Dependency:** None.

**Completion evidence:** Live entry and main assets were downloaded and hashed:
- Main JS live/saved SHA-256 identical: `475546D36E0549AECBC4D5E4557F7D5FECFD0B14F207EF7E0B5412C464B06FA0`
- Main CSS live/saved SHA-256 identical: `DC99C195D0230AE0D23C005906C6E307FBD8184AD59408735878B58B7430EEE1`
- Live entry references the same hashed JS/CSS names found historically.
- Detailed record: [asset-freshness.json](evidence/live-2026-11-25/asset-freshness.json)

**Remaining limitation:** Dynamic chunk freshness has not been cryptographically compared across every route.

---

### P0-2. Native search and keyboard behavior

**Status: PARTIALLY COMPLETED — native core behavior confirmed; full control matrix remains**

**Exact question:** How do Tab, Enter, arrows, Escape, and Ctrl+K behave through native browser input?

**Why:** Keyboard behavior is a core accessibility and navigation requirement.

**Existing evidence:** `q6`, `q16`, `q17`, `q20`, `q27`.

**Additional evidence required:**
- Native key-event observations for search, lesson navigation, timeline, sidebar/drawer, progress, and dialog close.
- Focus before/after and active element.
- Escape and focus restoration for all overlays.

**Suggested investigation:** One read-only/native-input session with target reuse; no local-storage changes.

**Completion criteria:** Native behavior is recorded for every keyboard-critical control; synthetic-event-only gaps are resolved.

**Dependency:** P0-1.

**Phase 2 evidence:**
- Ctrl+K opens and focuses search.
- ArrowDown changes search selection.
- Enter opens the selected lesson and updates the hash.
- Escape closes search.
- Tab moves through the header controls.
- Enter activates menu/search buttons.
- Escape closes the drawer and restores focus to the menu button.
- Space toggles Pause/Play.
- Tab/Shift+Tab and Enter operate timeline controls.
- Dedicated record: [native-keyboard-focus.json](evidence/phase-2-keyboard/native-keyboard-focus.json)

**Remaining P0-2 scope:**
- Visible focus indicator measurement
- Complete search and drawer Tab-wrap/focus-trap cycles
- Native Next activation
- Native replay/theme isolation
- Full control matrix beyond representative controls

---

### P0-3. Lesson navigation and completion semantics

**Exact question:** Which exact action marks a lesson complete, and can progress be reset or cleared?

**Why:** Data model, progress requirements, acceptance criteria, and reload behavior depend on it.

**Existing evidence:** `q5`, `q16`, `q17`, `q21`, local-storage keys.

**Additional evidence required:**
- Native click sequence to recap and replay or reopen
- Last lesson and recent-list updates
- Whether reopening a completed lesson changes progress
- Reset/clear UI and storage effects

**Suggested investigation:** Use read-only/interaction capture against the existing browser state without clearing storage.

**Completion criteria:** Completion trigger and reset behavior are directly observed or clearly documented as absent/not implemented.

**Dependency:** P0-1.

---

### P0-4. PWA, offline, and service-worker behavior

**Exact question:** Is installation and offline reload supported, and what happens with cache, network loss, or stale assets?

**Why:** PWA behavior is a high-impact architecture and non-functional requirement.

**Existing evidence:** Manifest in `q8`/`q18`; no active worker or Cache Storage entries in tested context.

**Additional evidence required:**
- Active registration in a clean test profile or explicit reason if absent
- Cache Storage inventory
- Offline navigation/reload behavior
- Install eligibility and install prompt
- Update or stale-cache behavior

**Suggested investigation:** Reuse browser only if a clean state can be obtained without clearing existing storage. Do not reset user progress. Separate PWA evidence from the existing session if isolation is required.

**Completion criteria:** Worker, cache, install, and offline reload states are each confirmed or safely pending.

**Dependency:** P0-1.

---

### P0-5. Accessibility audit

**Exact question:** Are semantic structure, names, focus, announcements, zoom, contrast, and SVG alternatives sufficient?

**Why:** Accessibility is a mandatory NFR and user-flow constraint.

**Existing evidence:** `q20`, `q27`, structural ARIA/role observations.

**Additional evidence required:**
- Native Tab order and focus trapping/restoration
- Accessible names and live-region behavior
- Timeline and lesson state announcements
- SVG title/description or equivalent
- High zoom and contrast measurements
- Drawer and modal behavior

**Suggested investigation:** Passive DOM/accessibility plus native keyboard interactions in existing browser target.

**Completion criteria:** A control-by-control accessibility matrix is recorded with pass/partial/fail evidence.

**Dependency:** P0-2.

---

## P1 — Important for accurate reconstruction

### P1-1. Locale reload persistence and RTL

**Exact question:** Which of the 22 locales reload correctly and how do RTL layouts behave on desktop/tablet/stack?

**Why:** Persistence, layout, and translation requirements differ by locale.

**Existing evidence:** `q7`, `q19`, `q27`.

**Additional evidence:** Native locale selection, reload, direct `?lang=`, and one representative Hebrew/Arabic layout at each breakpoint.

**Completion criteria:** Complete locale matrix for direct, stored, and browser-derived language selection.

**Dependency:** P0-1.

---

### P1-2. Theme reload persistence

**Exact question:** Does a switched theme persist through reload and direct deep link?

**Why:** Required preference behavior is straightforward but must be separated from static-storage evidence.

**Existing evidence:** `q7`, `q8`, `q21`, inline theme bootstrap.

**Additional evidence:** Switch, reload, current deep-linked route, then no application-state changes.

**Completion criteria:** One direct reload sequence proves persistence and pre-paint behavior.

**Dependency:** P0-1.

---

### P1-3. Metric and dynamic diagram behavior

**Exact question:** What values transition by step and how are changes animated?

**Why:** Metric cards and SVG states are visible functional behavior, not just static copy.

**Existing evidence:** `q9`, `q21`, lesson static output.

**Additional evidence:** Step-by-step snapshots for representative lessons and all metric keys found in the curriculum.

**Completion criteria:** Per-step metric values/formulas and animation triggers are recorded.

**Dependency:** P0-1.

---

### P1-4. Replay, pause, Fit, fullscreen, and reading animation

**Exact question:** What state changes occur and how do controls behave across viewports?

**Why:** These controls define the core lesson experience.

**Existing evidence:** `q4`, `q17`, `q23`, `q24`.

**Additional evidence:** Native control sequence, SVG transform/animation state, pause/reading highlight state, fullscreen enter/exit.

**Completion criteria:** State transitions and responsive behavior are confirmed for all stage tools.

**Dependency:** P0-2.

---

### P1-5. Intermediate and edge responsive states

**Exact question:** How do layout, drawer, stage, rail, guide, and pager change across breakpoints and zoom states?

**Why:** Representative sizes alone do not prove breakpoint transitions.

**Existing evidence:** `q10`, `q11`, `q12`, `q14`, `q22`, `q23`.

**Additional evidence:** 960/1200 boundary cases, short-height desktop, landscape mobile, browser zoom, and drawer/RTL combinations.

**Completion criteria:** Responsive matrix covers breakpoint boundaries and overflow.

**Dependency:** P0-1.

---

### P1-6. Network and external integration scope

**Exact question:** Does the app call APIs or analytics, or load external resources during navigation, language, search, voice, or lesson changes?

**Why:** Architecture and privacy requirements cannot be finalized from reload-only capture.

**Existing evidence:** `q8`, `q18`, `q19`.

**Additional evidence:** Interaction-based network capture with explicit allowed origins.

**Completion criteria:** Requests are classified into application assets, fonts, TTS, analytics, API, and external links.

**Dependency:** P0-1.

---

### P1-7. TTS and voice behavior

**Exact question:** Is voice/TTS implemented, selectable, and network-dependent?

**Why:** Existing static code hints but runtime evidence is absent.

**Existing evidence:** `q21`, static bundle and CSS references.

**Additional evidence:** Control presence, browser voices, selected voice, playback, pause/stop, and network activity.

**Completion criteria:** TTS behavior is confirmed or explicitly absent from the current deployed app.

**Dependency:** P0-1 and P1-6.

---

### P1-8. Search completeness and ranking

**Exact question:** How are lessons, steps, concepts, recency, and completion used in ranking and navigation?

**Why:** Search behavior is central to UX and may involve an implementation contract not covered by a few queries.

**Existing evidence:** `q6`, `q20`.

**Additional evidence:** Ranking across representative query types, punctuation, locale, focus navigation, result limits, and empty-state behavior.

**Completion criteria:** A stable indexing/ranking description is supported by direct results.

**Dependency:** P0-2.

---

## P2 — Secondary functionality and edge cases

### P2-1. Route edge cases

Test duplicate slashes, trailing slashes, case variants, `?lang=`, unknown step text, and browser Back/Forward combinations.

**Existing evidence:** `q16`, `q5`.

**Completion criteria:** Edge-case fallback matrix.

---

### P2-2. Loading and error states

Verify locale chunk loading, lazy lesson chunk loading, slow-network behavior, and unavailable external/voice resources.

**Existing evidence:** Network and chunk-name outputs in `q8`, `q19`.

**Completion criteria:** Each loading and failure state is either observed or documented as absent.

---

### P2-3. External links and credit behavior

Verify new-window behavior and URL integrity for X and social metadata links.

**Existing evidence:** Static `index.html`, `q1`.

**Completion criteria:** Link attributes and navigation behavior are recorded.

---

### P2-4. Lesson content completeness

Review a representative group of all 40 lesson first-step, recap, and special diagram states.

**Existing evidence:** `q9`, `lessons-raw`, `q25`.

**Completion criteria:** Any missing or malformed content found in each tested lesson.

---

### P2-5. Persistence reset and multi-tab behavior

Verify progress/reset, storage event behavior across tabs, stale state, and locale/theme consistency.

**Existing evidence:** Local-storage keys in `q1`, `q8`, `q21`.

**Completion criteria:** Storage write/delete events and cross-tab behavior are specified.

---

## P3 — Optional or low-impact

### P3-1. Social metadata and sharing

Validate canonical URL, OG/Twitter cards, and image availability.

**Existing evidence:** `index.html`, `q1`, `q20`.

**Completion criteria:** Metadata fields match live and deployed URLs.

---

### P3-2. Noscript fallback

Verify the static no-JS fallback content and behavior.

**Existing evidence:** `index.html`.

**Completion criteria:** No-JS state is recorded.

---

### P3-3. Visual regression baselines

Keep existing screenshots as historical baselines; add only if asset freshness or responsive changes are found.

**Existing evidence:** `shots/`.

**Completion criteria:** Screenshots match a known asset/build and browser state.

---

## Task dependencies

1. P0-1 asset freshness before P1-1 through P1-8.
2. P0-2 keyboard behavior before P0-5 accessibility.
3. P0-3 progress semantics before persistence and acceptance criteria.
4. P0-4 PWA behavior before PWA NFRs.
5. P1-6 network scope before P1-7 TTS and P1-8 search backend assumptions.

