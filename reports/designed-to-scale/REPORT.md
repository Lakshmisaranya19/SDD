# Reverse-Engineering Report — designed-to-scale.vercel.app

**Status:** In progress (incremental)
**Investigator:** Automated black-box browser investigation (REA)
**Method:** Passive CDP inspection of the already-open target page + read-only interaction probes + public static asset download. No application code was modified. No private backend was accessed; no source maps were requested.
**Evidence log:** See `evidence-log.md` (raw observations, tool evidence IDs).

> Confidence tags used throughout: **[Confirmed]** direct observation; **[Partially verified]** observed in one context or with limits; **[Assumed]** inference not yet tested.

---

## 0. Connectivity & Access Verification

| Check | Result | Confidence |
|---|---|---|
| REA ↔ browser CDP link (`http://127.0.0.1:9222`) | Working. Chrome/158.0.8127.37, protocol 1.3, JS 15.8.62.31 | Confirmed |
| Target page present | 1 page target: `https://designed-to-scale.vercel.app/`, title `How a Request Travels · System Design` | Confirmed |
| Browser reopened? | No. Existing page target reused. | Confirmed |
| Site reachable | HTTP 200, full HTML delivered (`index.html`, 6,347 bytes) | Confirmed |
| App type | Vite-built static SPA (`<div id="app">`, one JS module bundle + one CSS bundle) | Confirmed |
| Server-side rendering | No. HTML contains only shell + `<noscript>` fallback; all UI built client-side | Confirmed |

Evidence: `ev_b2071153…f20e29` (target list), `ev_d411a24d…450c6` (page inspection).

---

## 1. Website Overview

**System Design — an interactive course** by Dilum Sanjaya. Free, bilingual-by-design (22 locales) interactive system-design course. Each lesson is a step-by-step animated SVG diagram (1→N steps) with a written guide, learning goals, metrics chips, and a timeline. Additional sections: Practice, Design Lab, Cheatsheets.

Public metadata (from `index.html`) **[Confirmed]**:
- Canonical URL `https://designed-to-scale.vercel.app/`
- `lang="en"`, viewport `width=device-width, initial-scale=1.0, viewport-fit=cover`
- Description: "An interactive system design course: each idea is an animated diagram you step through — load balancing, caching, sharding, consensus, queues and whole-system designs, from one server to millions of users."
- Author/provider: Dilum Sanjaya (`https://x.com/DilumSanjaya`)
- `schema.org/Course` JSON-LD, free, educationalLevel "Beginner to advanced"
- Open Graph + Twitter card, 1200×630 `og.jpg`
- PWA hints: `site.webmanifest`, `apple-touch-icon.png`, `favicon.svg`
- Theme colour `#f4ebe0` (warm cream), swapped with theme

**Tech fingerprint [Confirmed]:** Vite (`/assets/index-<hash>.js`, `type="module" crossorigin`), hash-based routing (`#/lesson-id/step`), no framework markers in CSS/DOM (`no React/Vue data attributes observed`), single 790 KB minified JS bundle, 64 KB CSS.

**Pre-paint bootstrap [Confirmed]** in inline `<head>` script:
- Theme: reads `localStorage['sdt:theme']`; if `'dark'` sets `documentElement.dataset.theme='dark'` before paint (no flash).
- Language: `?lang=` → stored `sdt:lang` → first matching `navigator.languages` → `en`. Sets `data-start-lang`; for `ar`/`he` sets `dir="rtl"`; non-English waits (hidden) until translation file loads.
- Layout: chooses `data-layout` = `desktop` (w≥1200 && h≥560), `tablet` (w≥960 && h≥600), else `stack` — before first paint.

---

## 2. Page & Route Inventory

Routing is **hash-based** (`#/<lessonId>/<step>`). Root path `/` with empty hash renders the first lesson. Confirmed links all use `#/…`.

### 2.1 Top-level sections (top bar nav)

| Section | Access | Route observed | Confidence |
|---|---|---|---|
| Learn | `button.nav__item[data-nav="Learn"]` | `#/` / lesson hashes | Confirmed |
| Practice | `button.nav__item[data-nav="Practice"]` | TBD (pending click probe) | Partially verified |
| Design Lab | `button.nav__item[data-nav="Design Lab"]` | TBD | Partially verified |
| Cheatsheets | `button.nav__item[data-nav="Cheatsheets"]` | TBD | Partially verified |

Brand link `a.brand` → `#/`. Footer/credit link → `https://x.com/DilumSanjaya` (external, new tab behaviour TBD).

### 2.2 Course curriculum — 9 modules, 40 lessons [Confirmed]

Every lesson link observed is `#/<lesson-id>/1` (step 1). Progress counter is `0 / 40` in a fresh session.

**01. Foundations (0/3)**
- `request-lifecycle` — How a Request Travels
- `latency-throughput` — Latency & Throughput
- `napkin-math` — Napkin Math

**02. Scaling (0/5)**
- `vertical-horizontal` — Vertical vs Horizontal
- `load-balancing` — Load Balancing
- `stateless` — Stateless Services
- `caching` — Caching
- `cdn` — Content Delivery

**03. Data & Storage (0/11)**
- `sql-nosql` — SQL vs NoSQL
- `indexes` — Indexes
- `storage-engines` — Storage Engines
- `replication` — Replication
- `sharding` — Sharding
- `consistent-hashing` — Consistent Hashing
- `unique-ids` — Unique IDs at Scale
- `cap` — CAP & Consistency
- `consensus` — Consensus & Leaders
- `transactions` — Transactions & Isolation
- `files` — Files & Media

**04. Communication (0/4)**
- `apis` — REST, RPC & GraphQL
- `queues` — Message Queues
- `pubsub` — Pub/Sub & Events
- `realtime` — Real-time Updates

**05. Reliability (0/4)**
- `redundancy` — Redundancy & Failover
- `rate-limiting` — Rate Limiting
- `timeouts-retries` — Timeouts & Retries
- `observability` — Observability

**06. Architecture (0/4)**
- `microservices` — Monolith vs Microservices
- `service-discovery` — Service Discovery
- `sagas` — Sagas & Distributed Tx
- `batch-stream` — Batch & Stream Processing

**07. Security (0/3)**
- `authentication` — Authentication
- `authorization` — Authorization
- `encryption` — Encryption & Secrets

**08. Shipping (0/2)**
- `testing` — Testing
- `cicd` — CI/CD & Deployments

**09. Whole Systems (0/4)**
- `hld-lld` — HLD & LLD
- `design-url-shortener` — Design a URL Shortener
- `design-news-feed` — Design a News Feed
- `design-chat` — Design a Chat System

### 2.3 Lesson page anatomy (root route, step 1)

`#request-lifecycle` at step 1 observed:
- H1 `.title` = "How a Request Travels"
- 10-step timeline: 1 Hit Enter · 2 Find address · 3 Connect · 4 Request · 5 Fetch data · 6 Response · 7 More files · 8 Slow query · 9 Far away · 10 Recap
- Guide card `#guide`, H2 "Users say the shop feels slow"
- Goals card `#goals`
- Stage card with inline animated SVG (`role="img"`)
- Controls: Back (disabled at step 1), "Next: Find address", Fit, Replay, Pause, full-screen expand
- "Learn" nav marked `is-active`

### 2.4 Deep-linked lessons

Every lesson has a stable `#/<id>/1` URL; steps are numbered URL segments. **[Confirmed]** for `request-lifecycle`; **[Assumed]** identical pattern for all 40 (all generated from same renderer).

---

## 3. Navigation Structure

```
Top bar (sticky header .topbar)
├─ ☰ menu button (#menu-btn, "Open the course menu")  → drawer/sidebar
├─ Brand "System Design" → #/
├─ Primary nav: Learn | Practice | Design Lab | Cheatsheets
├─ Search button (Ctrl K)
├─ Language button (EN) → menu of 22 locales
├─ Theme toggle (light/dark)
└─ Credit → x.com/DilumSanjaya

Sidebar (#sidebar, role complementary, aria-label "Course")
├─ Drawer nav (Learn/Practice/Design Lab/Cheatsheets) [duplicate of top nav]
├─ Course tree (#course): 9 collapsible modules → 40 lesson links
└─ Progress card ("Progress 0 / 40")

Lesson sheet (main.sheet)
├─ #head lesson header (title, module/step context)
├─ Stage card (animated SVG + tools: Fit, Replay, Pause, Fullscreen)
├─ Timeline card (#timeline) — step list
└─ Rail (aside.rail): Guide (#guide) + Goals (#goals)
```

Notes:
- The primary nav is duplicated inside the sidebar for narrow layouts. **[Confirmed]**
- Module headers are `button.mod__head` with `aria-expanded`; only module 01 starts open. **[Confirmed]**
- Active lesson styling/`is-done` marks tracked per module (`0/3` … `0/4`). **[Confirmed]**

---

## 4. UI Component Inventory

| Component | Selector / role | Behaviour | Confidence |
|---|---|---|---|
| Top bar | `header.topbar` | Sticky header; brand, nav, search, lang, theme | Confirmed |
| Menu (hamburger) | `button#menu-btn.menu-btn` | aria-expanded=false; opens sidebar drawer | Confirmed (state), behaviour TBD |
| Primary nav | `.nav` → `button.nav__item[data-nav]` | Section switching | Confirmed |
| Search trigger | `button.search#search-open` | Opens `role="dialog"` search | Confirmed (dialog exists in DOM) |
| Search dialog | `div.sx__dialog[role=dialog]`, `input.sx__input[role=combobox]`, `div#sx-list[role=listbox]` | Search-as-you-type; Clear + Esc buttons | Confirmed (structure) |
| Language menu | `.lang__btn` + `#lang-menu[role=menu]` with `menuitemradio` items | 22 languages, current marked `is-on` | Confirmed |
| Theme toggle | `button#theme-btn` | aria-label "Switch to dark theme" | Confirmed |
| Sidebar | `aside#sidebar.sidebar[aria-label=Course]` | Course navigation + progress | Confirmed |
| Module accordion | `button.mod__head[aria-expanded]` | Expand/collapse module lessons | Confirmed |
| Lesson list item | `li.lesson[data-lesson]` (`.lesson__markbox`, `.lesson__title`) | Link to lesson; `is-soon` / `is-done` states | Confirmed (classes present) |
| Progress card | `#progress.card.progress` | `0 / 40` counter; expandable (`aria-expanded=false`) | Confirmed |
| Lesson header | `div#head.lesson-head` | Title, meta, freshness animation class `is-fresh` | Confirmed |
| Stage | `section.card.stage` + inline `svg[role=img]` | Animated diagram; zoom/fit | Confirmed |
| Stage tools | `button.tool--fit`, `button.tool`, `.tool--expand` | Fit / Replay / Pause / Fullscreen | Confirmed |
| Timeline | `section#timeline.card.timeline` | Step chips/buttons, current step | Confirmed |
| Step buttons | `#timeline button` (1…10) | Jump to step; text "1 Hit Enter" etc. | Confirmed |
| Lesson pager | `button.btn-ghost` Back, `button.btn-pop.btn-next` Next | Back disabled on first step | Confirmed |
| Guide card | `section#guide.card.guide` | Prose explanation per step | Confirmed |
| Goals card | `section#goals.card.goals` | Learning goals per lesson | Confirmed |
| Metrics chips | `.chip[data-k]` with `.chip__value` (in stage) | Live-updating metrics with levels | Confirmed (DOM), values TBD |
| Toast | `div.toast[role=status]` + `.toast__text` | Transient messages, 2.8 s | Confirmed (code), trigger TBD |
| Voice menu | `.voice-menu` with note | TTS/voice options exist in code | Partially verified |
| Search result cards | `.sx__*` list items | Results grouped by lesson/step | Partially verified |

---

## 5. Interaction Behaviour

**Observed on load**
- Root path renders lesson `request-lifecycle` step 1.
- `localStorage` after load:
  - `sdt:last` = `{"lessonId":"request-lifecycle","step":0}`
  - `sdt:recent` = `[{"lessonId":"request-lifecycle","step":0}]`
- Back button disabled at step 1; Next labelled with the next step's name.
- `Pause` shown (not `Play`) while animation autoplays. **[Confirmed]**
- URL hash is empty at initial load even though internal state says step 0. **[Confirmed]** — state-driven start; hash updates on navigation. **[Assumed]**

**Keyboard**
- Native browser input confirmed `Ctrl+K` opens search and focuses the combobox; `ArrowDown` changes search selection; `Enter` opens the selected lesson and updates the hash; `Esc` closes search. **[Confirmed]**
- Native Tab movement confirmed across the header menu, brand, search, language, theme and external link. **[Confirmed]**
- Native Enter activates the course menu and search buttons; Escape closes the drawer and restores focus to the menu button. **[Confirmed]**
- Native Tab/Shift+Tab movement and Enter activation of timeline controls are confirmed. **[Confirmed]**
- Native Space toggles Pause/Play. **[Confirmed]**
- A complete search/drawer Tab-wrap cycle, visible focus indicator, native Next activation, native replay/theme isolation and number-key shortcuts remain unverified. **[Pending]**

**Theme**
- Toggle stores `sdt:theme`; inline script applies before paint. **[Confirmed from code]**, visual result TBD.

**Language**
- 22 locales: en, es, pt, fr, it, de, nl, pl, tr, id, vi, el, uk, ru, zh-Hans, zh-Hant, ja, ko, hi, ar, he (+ `yue`→zh-Hant mapping). Set via menu, persisted in `sdt:lang`, overridable with `?lang=`. RTL for ar/he. Non-English delays paint via `data-lang-pending`. **[Confirmed from code]**

**Progress**
- Per-lesson completion stored (local). `0/40`. Reset/clear semantics unknown. **[Assumed]** local only — no account/auth observed.

---

## 6. Data & API Observations

- **No backend API calls observed yet.** App is fully static; lesson content and diagrams are bundled in `app.js`. **[Partially verified]** — passive capture window was after load; a reload-time network capture is still required.
- Bundle size 790,585 bytes; CSS 64,269 bytes; both fingerprinted (immutable caching expected).
- Local persistence keys: `sdt:theme`, `sdt:lang`, `sdt:last`, `sdt:recent`, plus likely `sdt:done`/progress keys. **[Partially verified]**
- External dependency observed in bundle/head: none confirmed except optional TTS voices (Web Speech API) and link to x.com. Fonts appear local/system (stack uses ui-monospace/Menlo). **[Assumed]**
- PWA manifest present (`/site.webmanifest`) — service worker registration not yet checked.

---

## 7. Responsive Behaviour

Layout is chosen pre-paint into `data-layout`:
- `desktop`: width ≥ 1200 and height ≥ 560
- `tablet`: width ≥ 960 and height ≥ 600
- `stack`: otherwise

Currently observed `data-layout="tablet"` at the open browser's viewport. **[Confirmed]**
Breakpoint-driven CSS is present; the app also has a `fitWindow()` rule that recomputes layout. Hamburger + drawer only relevant in narrower modes. **[Partially verified]** — will test 1440×900, 1024×768, 390×844.

---

## 8. Unverified Functionality

- Practice, Design Lab, Cheatsheets content and routes.
- Search ranking, grouping, keyboard navigation, empty state.
- Step navigation via clicks/keys, URL hash updates, deep-link restore, browser back/forward.
- Replay / Pause / Fit / Fullscreen tool behaviour.
- Metrics chip values and their dynamic updates.
- Progress persistence: marking done, `is-done` state, progress expansion, reset.
- Language switching end-to-end (translation loading, RTL, persistence).
- Theme persistence across reload.
- TTS/voice menu.
- Service worker / offline behaviour.
- Any network calls on reload, language switch, or section switch.

---

## 9. Open Questions & Investigation Gaps

1. Does step navigation write the hash (`#/lesson/step`) and support deep links/back button?
2. Are lessons gated/`is-soon` for any content, or all 40 playable?
3. Is there a completion model (per-step vs per-lesson)? What marks `is-done`?
4. Where do Practice / Design Lab / Cheatsheets route to, and are they interactive?
5. Is any telemetry/analytics loaded? (Not seen yet.)
6. Any auth, account, or sync? (None observed; assumed local-only.)
7. Exact responsive transformations of sidebar/stage/guide at each breakpoint.
8. Accessibility: focus trapping in dialogs, aria-live announcements on step change.

---

## 10. Reusable Learning-Product Synthesis

The existing evidence has now been consolidated into a reference-product architecture analysis:

- [product-capability-inventory.md](product-capability-inventory.md)
- [content-vs-application-analysis.md](content-vs-application-analysis.md)
- [reference-content-model.md](reference-content-model.md)
- [visualization-inventory.md](visualization-inventory.md)
- [learner-experience.md](learner-experience.md)
- [reusable-platform-architecture-proposal.md](reusable-platform-architecture-proposal.md)
- [architecture-discovery-summary.md](architecture-discovery-summary.md)

**Material conclusion:** The reference demonstrates strong reuse of a shared shell and lesson-player mechanism across 40 subject-specific lessons. It does not establish a formal, separately packaged content system or a published content schema. The architecture documents distinguish confirmed reference behavior from proposals for the new platform.

**Recommended next specification area:** Define a versioned course manifest and lesson/step content contract, then validate it against one existing-style lesson and one deliberately different subject.
