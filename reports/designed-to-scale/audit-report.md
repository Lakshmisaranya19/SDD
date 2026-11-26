# Comprehensive Reverse-Engineering Evidence Audit

**Target:** https://designed-to-scale.vercel.app/

**Audit scope:** Existing evidence under `reports/designed-to-scale/`, plus a read-only reuse check of the existing REA Chrome CDP target.

**Live evidence ID:** `ev_f97295eba760baf05f306ea69c3c11fe26fb850fca77063df3fa2cbbd97b465b`

---

## Executive summary

The investigation is substantial and more reliable than a typical informal review. It directly observed the SPA shell, curriculum, routes, navigation, search, language/theme, persistence, responsive layouts, static assets, and many components. However, the evidence set is not yet sufficient to finalize a complete Software Design Specification (SDD).

The strongest findings are route structure, lesson inventory, common UI structure, local-storage keys, and static asset topology. The least reliable areas are PWA/offline behavior, TTS, native keyboard behavior, analytics/authentication, reset semantics, full-screen and zoom behavior across viewports, and accessibility beyond structural attributes.

The existing reports should not be treated as one uniform confidence level. [REPORT.md](REPORT.md) contains both direct observations and assumptions. [investigation-status.md](investigation-status.md) improves reconciliation, but it also repeats a few historical statements that need direct revalidation.

**Overall assessment:** The evidence is good enough to begin a conservative product overview and most functional requirements, but not enough to finalize architecture, accessibility, integrations, PWA, or acceptance criteria.

---

## Overall investigation quality

### Strengths

- Many findings are backed by multiple probes rather than a single screenshot or source-string match.
- Probe scripts and JSON outputs allow the sequence of state transitions to be checked.
- Static `index.html`, `app.js`, and `app.css` captures provide implementation evidence.
- The lesson inventory is complete: 40 IDs and 445 steps are reported consistently across inventory outputs.
- Search, navigation, theme, language, responsive layout, local persistence, and network reload behavior are covered better than most areas.
- The documentation clearly distinguishes some confirmed observations from assumptions.

### Weaknesses

- The referenced `evidence-log.md` is absent.
- Some evidence IDs in `REPORT.md` are truncated and cannot be correlated to a retained evidence record.
- Some conclusions are static-code observations rather than runtime behavior.
- Synthetic DOM events are used by several probes, so native keyboard behavior is not fully established.
- Probe state was mutated across runs, making later outputs partly historical and state-dependent.
- Several JSON files contain UTF-8/encoding artefacts.
- Console exceptions from synthetic interactions require interpretation.
- Several assets are chunked; previous findings need current bundle/version comparison.

---

## Evidence reliability assessment

### Direct browser/runtime evidence

Highest reliability when it is tied to a concrete probe output:

- Existing target reuse and current page state
- Lesson IDs, titles, step counts, timeline labels
- Next/Back and browser history behavior
- Search opening, query results, empty state, result selection
- Theme and language switching
- Desktop/tablet/stack measurements
- Drawer open/close state
- Local-storage keys and values
- Network requests seen during the captured reload
- Manifest, font, favicon, and icon requests

### Static code evidence

Reliable for implementation structure, but not runtime completion:

- Hash-routing bootstrap
- Pre-paint theme/language/layout logic
- Locale list and RTL mapping
- `sdt:*` storage key usage
- Route and component class names
- CSS breakpoint rules
- Static route inventories
- TTS and voice-related code references

### Inference or assumption

Requires qualification:

- The app framework is inferred to be a Vite-built static SPA; Vite markers and bundle structure support this, but framework identity is not independently proven.
- All 40 lessons share a route-driven renderer: the inventory supports this, but implementation behavior still has not been exercised for every lesson.
- No backend exists: the reload capture saw no API requests, but this does not exclude backend behavior only triggered by search, navigation, voice, or future features.
- No account/sync exists: no UI or storage evidence has shown accounts, but this remains a bounded observation, not a complete negative.
- Progress is local-only: storage evidence supports this, but an external sync request would have to be tested beyond one reload or interaction sequence.

---

## Correct and supported findings

The following major findings are supported and should remain unchanged without unsupported strengthening.

| Finding | Evidence support | Assessment |
|---|---|---|
| Hash-based SPA routing | `q4`, `q5`, `q16`, `index.html`, `app.js` | Correct |
| 9 modules and 40 lessons | `q2`, `q9`, `lessons-raw.json`, `appendix-lessons.md` | Correct |
| 445 steps across all lesson metadata | Lesson inventory outputs/appendix | Correct as reported metadata; content/interaction coverage is separate |
| Learn/Practice/Design Lab/Cheatsheets top bar | `q1`, `q2`, `q3` | Correct |
| Practice/Design Lab/Cheatsheets show coming-soon toast | `q3`, `q4` | Correct for tested click behavior |
| Sidebar on desktop and drawer on tablet/stack | `q10`, `q11`, `q12`, `q14` | Correct |
| Next/Back updates lesson state and hash | `q4`, `q5` | Correct |
| Timeline navigation updates the current step | `q4`, `q16`, `q17` | Correct |
| Invalid lesson is not presented as an error page | `q16` | Correct for tested values |
| Out-of-range lesson step clamps to the final step | `q16` | Correct for tested value |
| Completing a lesson stores it in `sdt:done` | `q5`, `q16`, `q21` | Correct for tested first completion |
| Search dialog, listbox, empty state, and result navigation | `q6`, `q20`, `q27` | Correct |
| Theme toggle updates document CSS/state | `q7`, `q8` | Correct |
| `sdt:theme` persists selected theme | `q7`, `q21` | Correct as storage behavior |
| Locale switching updates visible language | `q7`, `q19`, `q27` | Correct for observed locales |
| `sdt:lang` persists locale | `q7`, `q19`, `q27` | Correct |
| Arabic sets RTL | `q19` | Correct for tested caching step |
| Static reload asset set | `q8`, `q18`, `q19` | Correct historically, but freshness remains to be proven |
| PWA manifest is present | `q8`, `q18`, static manifest request | Correct |
| No service worker/Cache Storage observed in tested context | `q8` | Correct only for the tested context/time |
| No application API observed during reload | `q18` | Correct only for observed reload scope |

---

## Findings requiring correction or qualification

1. **Vite/framework confirmation**
   - The statement that this is a Vite-built static SPA is strongly supported by entry assets and module scripts, but framework identity beyond Vite build tooling is not proven. Qualify framework claims as build/deployment evidence.

2. **No backend API calls**
   - This is historically supported only for the reload window and selected interactions. It must remain “no API calls observed,” not “no backend exists.”

3. **Local-only persistence**
   - [REPORT.md](REPORT.md) says local persistence and no auth/account; storage evidence supports local state, not the absence of future or hidden sync.

4. **Keyboard behavior**
   - [REPORT.md](REPORT.md) previously described Enter/arrow navigation and Ctrl+K as unverified or hinted. Existing `q4`, `q6`, `q16`, `q17`, and `q20` outputs provide synthetic-browser evidence, but native press behavior was not uniformly validated. Change only the status label to PARTIALLY VERIFIED, not CONFIRMED.

5. **Theme persistence**
   - Static code and storage evidence support persistence, but the historical switch probe must be distinguished from a clean reload test.

6. **TTS**
   - Static/DOM evidence found no `speak` control or voices in `q21`, but [REPORT.md](REPORT.md) should not conclude TTS is absent; it concluded only that the menu/behavior was unverified.

7. **Metrics**
   - Metric cards were observed in `q9` and `q21`, but dynamic transitions and exact formulas are only partially verified.

8. **Reading animation**
   - `q24` found no `.is-reading` element during its sampling schedule. This is not evidence that reading annotations do not exist; it is inconclusive timing evidence.

9. **All 40 lessons playable**
   - `q2` found no `is-soon` classes and all lesson links. `q9` visited generated lesson headers/step names. This supports all lessons being available from the sidebar, but not every interaction/content state within every lesson.

10. **Invalid route behavior**
   - `q16` proves behavior for `#/does-not-exist/5` and `#/sharding/999`. It does not prove behavior for every malformed hash variant.

---

## Contradictions and gaps

### Contradictions

- No direct contradiction was found among the main probe findings.
- Several reported console exceptions appear tied to synthetic event dispatch and require revalidation under native browser input.
- One keyboard probe initially found Arrow Right had no state change, while later probes found navigation behavior. [q16] and [q17] likely differ in dispatch target or timing; this is a probe-method inconsistency, not necessarily an application contradiction.
- [q24] reported no reading highlight while [q23] confirmed the CSS/state selectors exist. This indicates timing coverage is insufficient, not contradictory application behavior.

### Duplicate or non-duplicative evidence

Already sufficiently established and should not be repeated without a freshness/fresh-profile reason:

- Initial shell inventory
- Complete 40-lesson ID and step-name inventory
- Desktop/tablet/mobile geometry at representative sizes
- Basic search open/query/empty/selection behavior
- Theme toggle and theme storage key
- Spanish/Japanese/Arabic locale switching
- Drawer open/close and lesson selection
- Basic Next/Back/timeline/history behavior
- Static reload network/resource inventory

These can be reused without another broad probe.

### Missing evidence record

[REPORT.md](REPORT.md) references `evidence-log.md`, which does not exist. Raw Evidence IDs are therefore not auditable against the local folder. The live REA inspection Evidence ID is recorded here for this audit.

---

## Evidence freshness assessment

### Current evidence

Read-only live CDP reuse confirmed on 2026-11-25:

- Existing target remains open at `https://designed-to-scale.vercel.app/#/request-lifecycle/1`
- Target title remains “How a Request Travels · System Design”
- Chrome target ID remains `16D98C1A242AF4D867016458EDA593BF`
- The page is attached to the existing session

The live inspection observed the current page DOM and recorded the main JS asset name `index-BeXJu_A0.js` and CSS asset name `index-CxX-BAVx.css`. It also observed dynamically loaded script candidates in the existing page, including caching and CDN chunks.

### Historical evidence likely still representative

- Static `index.html` references `/assets/index-BeXJu_A0.js` and `/assets/index-CxX-BAVx.css`.
- [q8.out.json](q8.out.json) and [q18-network.json](q18-network.json) observed the same JS/CSS names.
- [app.js](app.js) and [app.css](app.css) use matching top-level asset data.

The filename/hash pairing has remained consistent across the saved entry point and historical network outputs.

### Freshness cannot be established

- Whether the current dynamically loaded chunks match older chunk names
- Whether the live browser has cached an older deployment
- Whether service-worker or CDN cache behavior differs between reload contexts

Live HTTP bytes and saved main assets have now been compared cryptographically:

- `index-BeXJu_A0.js`: live SHA-256 and saved [app.js](app.js) SHA-256 are identical: `475546D36E0549AECBC4D5E4557F7D5FECFD0B14F207EF7E0B5412C464B06FA0`
- `index-CxX-BAVx.css`: live SHA-256 and saved [app.css](app.css) SHA-256 are identical: `DC99C195D0230AE0D23C005906C6E307FBD8184AD59408735878B58B7430EEE1`

The live entry HTML and matching main asset names are also confirmed.

**Freshness classification: MAIN ENTRY AND MAIN ASSETS CONFIRMED CURRENT** at 2026-11-25. Dynamic chunks and future deployment changes remain outside this comparison; see [asset-freshness.json](evidence/live-2026-11-25/asset-freshness.json).

---

## Missing functionality coverage

### User interactions

Not sufficiently covered:

- Native Tab/Enter/Space/arrow behavior across every control
- Search ranking and multi-page keyboard navigation
- All lesson timeline controls and shortcut keys
- Fit, Replay, full screen, and pause visual state changes
- Metric chip transitions
- Reading/highlight animation lifecycle
- Progress reset/clear
- External credit-link behavior

### UI and error states

Not sufficiently covered:

- Network failure/offline load
- Missing translation asset fallback
- Invalid locale query parameter
- Route fallback variants
- PWA install prompt
- Browser unsupported APIs
- Service-worker update states
- Full-screen escape and lost fullscreen state
- Search with no exact/malformed input

### Loading states

No dedicated loading-state investigation exists. Verify initial JS loading, locale loading, lazy lesson-chunk loading, and delayed font loading.

### Responsive states

Representative desktop/tablet/stack evidence exists, but exact breakpoint transition, browser zoom, landscape mobile, short-height desktop, and RTL layouts remain open.

### Architecture evidence

Missing:

- Deployment/version manifest
- Complete route-to-chunk graph
- Source-map policy
- API contract inventory
- Authentication boundary
- State-management implementation map
- Service-worker implementation map
- TTS implementation and browser API boundaries

---

## SDD readiness by high-level area

| SDD area | Readiness |
|---|---|
| Product overview | READY WITH ASSUMPTIONS |
| Application architecture specification | NOT READY |
| Functional requirements | READY WITH ASSUMPTIONS |
| User flows | READY WITH ASSUMPTIONS |
| UI/component specifications | READY WITH ASSUMPTIONS |
| Data and persistence requirements | READY WITH ASSUMPTIONS |
| Non-functional requirements | NOT READY |
| Acceptance criteria | NOT READY |

The evidence supports a conservative draft now, but not final approval. Architecture and acceptance criteria depend on unresolved freshness, PWA, accessibility, network, and state-transition evidence.

