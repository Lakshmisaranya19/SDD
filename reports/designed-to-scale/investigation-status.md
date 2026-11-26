# Investigation Status Checkpoint

**Website:** https://designed-to-scale.vercel.app/

**Purpose:** Reconciled checkpoint for continuing the reverse-engineering investigation in VS Code + GitHub Copilot + REA. This document summarizes evidence already present in `reports/designed-to-scale/`; it does not replace [REPORT.md](REPORT.md).

**Status values**

- **CONFIRMED**: Directly observed in one or more supporting evidence files.
- **PARTIALLY VERIFIED**: Some behavior or structure is directly observed, but coverage remains incomplete.
- **UNVERIFIED**: Not directly supported by the existing evidence.
- **PENDING**: Not investigated or requires a planned follow-up.

---

## Completed investigation areas

### 1. Connectivity and application shell

**Status: CONFIRMED**

- REA reused the existing Chrome CDP target.
- One page target was available for the target website.
- The app is a Vite-built static SPA with a client-rendered shell.
- Public metadata, PWA hints, theme colour, and course description were observed.
- Supporting evidence:
  - [REPORT.md](REPORT.md), sections 0 and 1
  - [q1.out.json](q1.out.json)
  - [index.html](index.html)
  - [app.js](app.js)
  - [app.css](app.css)

### 2. Route and curriculum inventory

**Status: CONFIRMED**

- Hash-based lesson routing uses `#/lesson-id/step`.
- The curriculum contains 9 modules and 40 lessons.
- All 40 lesson links are present and point to step 1.
- Every lesson has the same generated lesson/step structure, though complete content review remains open.
- Supporting evidence:
  - [REPORT.md](REPORT.md), sections 2 and 3
  - [q1.out.json](q1.out.json)
  - [q2.out.json](q2.out.json)
  - [q9.out.json](q9.out.json)
  - [q9-lessons.js](q9-lessons.js)
  - [lessons-raw.json](lessons-raw.json)
  - [appendix-lessons.md](appendix-lessons.md)

### 3. Top-level navigation

**Status: CONFIRMED**

- Learn is the active course section.
- Practice, Design Lab, and Cheatsheets were exercised and produced a “Practice is coming soon” toast while Learn remained active.
- These top-level controls do not currently navigate to another route in the tested flow.
- Brand and sidebar navigation structures were captured.
- Supporting evidence:
  - [q3.out.json](q3.out.json)
  - [q3-nav.js](q3-nav.js)
  - [q4.out.json](q4.out.json)
  - [q2.out.json](q2.out.json)

### 4. Lesson step navigation

**Status: CONFIRMED**

- Next and Back update lesson state and the URL hash.
- Timeline step clicks update the current step.
- Browser history navigation was observed.
- A root route starts at the first step of the request-lifecycle lesson.
- Deep links restore lesson and step state.
- Invalid lesson IDs fall back to the first step of the requested lesson context.
- An out-of-range or malformed step is clamped or normalised rather than opening an error page.
- Supporting evidence:
  - [q4.out.json](q4.out.json)
  - [q4-steps.js](q4-steps.js)
  - [q5.out.json](q5.out.json)
  - [q5-deeplink.js](q5-deeplink.js)
  - [q16.out.json](q16.out.json)
  - [q16-misc.js](q16-misc.js)

### 5. Completion and progress behavior

**Status: CONFIRMED**

- Completing the request-lifecycle recap stores `request-lifecycle` in `sdt:done`.
- Progress changed from `0 / 40` to `1 / 40`.
- The next lesson can be opened after the recap.
- The progress card exposes module and lesson completion counts.
- A fresh REA replay of the recap displayed `1 / 40` and `1/3` for Foundations; the expanded panel showed no reset control in that tested state (`ev_14e902e5db3919a1fffe1d5270b049f5059f6f519c087c4699b6de2efbd29dc1`).
- Supporting evidence:
  - [q5.out.json](q5.out.json)
  - [q16.out.json](q16.out.json)
  - [q17.out.json](q17.out.json)
  - [q21.out.json](q21.out.json)

**Status boundary:** Reset semantics and whether completion is markable independently of reaching the recap remain UNVERIFIED. Raw storage values in the fresh replay were hashed; the visible progress state does not establish their exact representation.

### 6. Search

**Status: CONFIRMED**

- Search opens a modal-style dialog with a combobox and listbox.
- Initial search shows grouped recent, lesson, and step results.
- Querying `cache` produced concept, step, and lesson groups.
- An empty query produced a usable no-results message.
- Selecting a result navigates to the matched lesson.
- Escape, Clear, and Ctrl+K behavior were observed.
- Focus remained within the search input during the keyboard probe.
- Supporting evidence:
  - [q6.out.json](q6.out.json)
  - [q6-search.js](q6-search.js)
  - [q20.out.json](q20.out.json)
  - [q27-final.json](q27-final.json)

### 7. Theme and language behavior

**Status: PARTIALLY VERIFIED**

Confirmed:

- Theme toggles between light and dark.
- Theme changes the page background and theme-colour metadata.
- `sdt:theme` stores the selected theme.
- Spanish and Japanese locale selections translate visible navigation and lesson text.
- Arabic sets `dir="rtl"` and visibly translates the top navigation.
- `sdt:lang` stores the selected locale.
- Language selection restores a deep-linked lesson/step in at least one tested flow.
- Supporting evidence:
  - [q7.out.json](q7.out.json)
  - [q7-theme-lang.js](q7-theme-lang.js)
  - [q19-lang.json](q19-lang.json)
  - [q21.out.json](q21.out.json)

Pending/revalidation:

- Theme persistence across a clean reload.
- Arabic/Hebrew layout quality across desktop, tablet, and stack modes.
- End-to-end RTL behavior beyond one caching lesson.
- Reload behavior for all 22 locales.

### 8. Sidebar and drawer

**Status: CONFIRMED**

- Desktop exposes a persistent sidebar.
- Tablet and mobile use a slide-out drawer.
- The menu button opens and closes the drawer.
- Close focus is restored to the menu button after closing.
- Lesson selection from the drawer navigates and closes the drawer.
- Supporting evidence:
  - [q11-mobile.json](q11-mobile.json)
  - [q11-drawer.js](q11-drawer.js)
  - [q12.json](q12.json)
  - [q12-sidebar.js](q12-sidebar.js)
  - [q13-sidebar.js](q13-sidebar.js)
  - [q14.json](q14.json)
  - [q14-css.js](q14-css.js)
  - [q15-anim.js](q15-anim.js)

### 9. Responsive layout

**Status: CONFIRMED**

Direct measurements are available for:

- Desktop: `1440×900`, layout `desktop`.
- Tablet: `1024×768`, layout `tablet`.
- Stack/mobile: `390×844`, layout `stack`.
- A tablet batch-stream viewport recorded no page overflow and a static pager.
- Mobile batch-stream content records a fixed pager and vertical page scrolling.
- Supporting evidence:
  - [q10-desktop.json](q10-desktop.json)
  - [q10-mobile.json](q10-mobile.json)
  - [q10-tablet.json](q10-tablet.json)
  - [q10-responsive.js](q10-responsive.js)
  - [q22-mobile.json](q22-mobile.json)
  - [q22-mobile-metrics.js](q22-mobile-metrics.js)
  - [q22-tablet.json](q22-tablet.json)
  - [q12.json](q12.json)
  - [q14.json](q14.json)

**Status boundary:** Exact behavior across every intermediate breakpoint remains UNVERIFIED.

### 10. Stage tools

**Status: PARTIALLY VERIFIED**

Confirmed:

- Replay, Pause/Play, Fit, and full-screen controls are present.
- Pause changes the control label to Play.
- Full-screen changes the stage class and root state and Escape exits full screen.
- Supporting evidence:
  - [q4.out.json](q4.out.json)
  - [q4-steps.js](q4-steps.js)
  - [q17.out.json](q17.out.json)
  - [q21.out.json](q21.out.json)

Not directly complete:

- Fit/zoom transformation measurements.
- Replay animation visual verification.
- Full-screen behavior across tablet and mobile.

### 11. Keyboard behavior

**Status: PARTIALLY VERIFIED**

Confirmed:

- Ctrl+K opens search.
- Escape closes search.
- Search focus trapping was observed.
- Arrow Right/Left dispatches and the app updates lesson step state in the probe sequence.
- Space toggles the pause control in the probe sequence.
- Supporting evidence:
  - [q6.out.json](q6.out.json)
  - [q16.out.json](q16.out.json)
  - [q16-misc.js](q16-misc.js)
  - [q17.out.json](q17.out.json)
  - [q17-keys.js](q17-keys.js)
  - [q20.out.json](q20.out.json)

**Revalidation needed:** Some probes used synthetic `KeyboardEvent` dispatches; native keyboard event behavior should be rechecked if strict browser-level evidence is required.

### 12. Local persistence

**Status: CONFIRMED**

Directly observed keys include:

- `sdt:theme`
- `sdt:lang`
- `sdt:done`
- `sdt:last`
- `sdt:recent`
- `sdt:progressOpen`

Supporting evidence:

- [q1.out.json](q1.out.json)
- [q7.out.json](q7.out.json)
- [q8.out.json](q8.out.json)
- [q21.out.json](q21.out.json)

### 13. Lesson content, guide cards, and recap

**Status: CONFIRMED**

- All 40 lesson names and step counts were extracted.
- Lesson headers, tags, durations, levels, and subtitles were observed.
- Caching content, warning callouts, recap takeaways, and request-lifecycle recap content were observed.
- Supporting evidence:
  - [q9.out.json](q9.out.json)
  - [q25.out.json](q25.out.json)
  - [q25-content.js](q25-content.js)
  - [q26.out.json](q26.out.json)
  - [q26-head.js](q26-head.js)
  - [appendix-lessons.md](appendix-lessons.md)

### 14. Metrics chips

**Status: CONFIRMED**

The caching lesson exposes dynamic-looking metric cards for p95 latency, hit rate, database CPU, and freshness.
- Supporting evidence:
  - [q21.out.json](q21.out.json)

**Status boundary:** Exact value transitions across steps and lessons remain PARTIALLY VERIFIED.

### 15. Network and static assets

**Status: CONFIRMED**

- Reload requests included document, JS bundle, CSS bundle, manifest, fonts, favicon, and icons.
- No application API or backend request was captured in the reload probe.
- The reload used hash state `#/sharding/2`.
- The 26 November REA page-load replay observed 11 same-origin requests, all 2xx. Selecting Spanish observed 16 same-origin 2xx requests, including `ui-BRJ4JvhW.js`, `request-lifecycle-C6fLr-m8.js`, and `latency-throughput-B4d-ZZqv.js`. A direct Spanish `#/caching/1` replay rendered Caché and fetched `caching-CuJZmXh9.js` with status 200; its response body was not captured.
- No API origin was observed in those bounded flows; this does not establish absence of APIs in untested flows.
- Supporting evidence:
  - [q18-network.json](q18-network.json)
  - [q8.out.json](q8.out.json)
  - [netcap.mjs](netcap.mjs)
  - [q8-network.js](q8-network.js)
  - REA Evidence `ev_e65050ff4c3c9b5afdbac4f2531d7fdac5a841e513d68fb7f790ea7edc5beedb`, `ev_13754a58c2e44f3c89bec60fb3edf445786e87959b98e2bf93cb1eca761a51fe`, and `ev_4c20133c3e7db2b90212fbd9fef2df9baeae7d457e3aa31c1bd01a60f4596870`

### 16. PWA manifest

**Status: CONFIRMED**

- The manifest was observed with name, short name, description, `/` start URL, standalone display, and 192/512 icons.
- No active service-worker registrations or Cache Storage entries were observed in the tested context.
- Supporting evidence:
  - [q8.out.json](q8.out.json)
  - [q18-network.json](q18-network.json)

### 17. Accessibility structure

**Status: PARTIALLY VERIFIED**

Direct structural checks confirmed:

- Search has `role="dialog"`, `aria-modal`, `aria-label`, combobox input, and listbox result container.
- Timeline and guide structures are present.
- The main diagram SVG has `role="img"`.
- The toast exposes `role="status"`.
- Search focus stayed within the dialog during the probe.
- Supporting evidence:
  - [q20.out.json](q20.out.json)
  - [q20-a11y.js](q20-a11y.js)
  - [q27-final.json](q27-final.json)

Pending:

- Tab-order and focus-restoration audit across all components.
- Screen-reader names and step-change announcements.
- Contrast and zoom/accessibility validation.
- SVG alternative text and accessible diagram descriptions.

---

## Pending investigation areas

1. **PWA installation and offline behavior** — UNVERIFIED
2. **TTS/voice menu behavior** — PARTIALLY VERIFIED (speech-synthesis code is present but its build-time gate is false; no speak control appeared in the initial accessibility tree; exhaustive runtime check remains open)
3. **Metrics-chip transitions across lessons** — PARTIALLY VERIFIED
4. **Fit/zoom visual behavior** — UNVERIFIED
5. **Replay animation behavior** — UNVERIFIED
6. **Full-screen behavior on tablet/mobile** — UNVERIFIED
7. **Complete lesson-by-lesson content verification** — UNVERIFIED
8. **Progress reset/clear behavior** — UNVERIFIED
9. **Language reload behavior for all locales** — UNVERIFIED
10. **Arabic/Hebrew RTL layout** — UNVERIFIED beyond static/one-case evidence
11. **Analytics and telemetry** — UNVERIFIED
12. **Authentication, account, or sync** — UNVERIFIED
13. **External credit link behavior** — UNVERIFIED
14. **Complete responsive behavior across intermediate breakpoints** — UNVERIFIED
15. **Full accessibility audit** — UNVERIFIED
16. **Native keyboard behavior for all controls** — PARTIALLY VERIFIED
    - Native Ctrl+K, search arrows/Enter/Escape, header Tab sequence, menu Enter/Escape, Pause/Play Space, and timeline Tab/Enter behavior are confirmed.
    - Visible focus indicators, complete search/drawer Tab loops, native Next, and native replay/theme isolation remain pending.
17. **Console exceptions and probe-induced failures** — PENDING revalidation

---

## Findings requiring revalidation

1. **PWA and service worker**
   - Existing evidence found no active registration/Cache Storage entries, but this is a state-specific result.
   - Revalidate in a clean browser profile and after an explicit install/offline sequence.

2. **Theme persistence**
   - The theme control and storage key are confirmed, but a reload after switching should be tested as a separate step.

3. **Language persistence and RTL**
   - Spanish/Japanese/Arabic behavior is observed, but not all locales or RTL layouts.
   - Revalidate after reload and on `stack`/`tablet` layouts.

4. **Keyboard navigation**
   - Synthetic events and native events can differ.
   - Revalidate Enter, arrows, Space, Escape, Tab, and Ctrl+K using normal browser input.

5. **Animated reading state**
   - [q24.out.json](q24.out.json) recorded no `.is-reading` elements during its sampling sequence.
   - This does not invalidate the CSS state; it requires a longer or different phase-aligned recheck.

6. **Network probe exceptions**
   - [q18-network.json](q18-network.json) contains multiple `e.target.closest is not a function` and document-hidden transition exceptions.
   - Determine whether these repeat under normal browser interactions and whether the synthetic probes caused them.

7. **Static bundle freshness**
   - Existing report and probes use captured `app.js`, `app.css`, and named asset hashes.
   - P0-1 is now partially resolved: live and saved main JS/CSS bytes match by SHA-256.
   - A 26 November direct route requested `caching-CuJZmXh9.js` with status 200, but its body/hash was not captured; dynamic-chunk content freshness remains unverified.

8. **Open browser state**
   - [q21.out.json](q21.out.json) and later probes show modified language, progress, and viewport state.
   - New checks must account for or explicitly reset localStorage test state without modifying application code.

---

## Known inconsistencies and documentation gaps

1. **Missing evidence log**
   - [REPORT.md](REPORT.md) references `evidence-log.md`.
   - No `evidence-log.md` exists in [reports/designed-to-scale/](/C:/Users/Ara/SDD/reports/designed-to-scale).
   - Until this is restored or replaced, raw tool evidence IDs cannot be cross-checked from the folder.

2. **Outdated pending labels**
   - The report’s Keyboard section still says Enter/arrow navigation and Ctrl+K were not exercised, despite `q4`, `q6`, `q16`, `q17`, and `q20` evidence.
   - The report’s Search section still treats search ranking and keyboard navigation as unverified, despite direct search results.
   - The report still lists step navigation/deep links and stage controls as unverified, despite direct probe evidence.
   - The top-navigation pending item is now outdated: Practice, Design Lab, and Cheatsheets were exercised and show the coming-soon toast.

3. **Mixed confidence wording**
   - [REPORT.md](REPORT.md) combines `[Confirmed]`, `[Confirmed from code]`, `[Partially verified]`, and `[Assumed]`.
   - The new checkpoint distinguishes evidence from inference but does not rewrite historical findings.

4. **Untracked probe evidence**
   - Probe scripts and JSON files are numerous and not mapped individually to final findings.
   - This checkpoint provides the reconciliation map, but no source row in [REPORT.md](REPORT.md) currently links every numbered probe to each claim.

5. **Encoding artefacts**
   - Several JSON and Markdown files contain mojibake-style characters such as `┬╖` or replacement glyphs.
   - The underlying values remain usable, but future documentation should preserve UTF-8 explicitly.

6. **Captured state ambiguity**
   - Screenshots and probe outputs may represent differing language, theme, viewport, progress, and lesson state.
   - `q21.out.json` demonstrates accumulated state across probes.

7. **Bundle size inconsistency**
   - [REPORT.md](REPORT.md) reports bundle size estimates from an earlier capture.
   - Named bundle and asset hashes in later network evidence should be compared before reuse.

---

## Recommended investigation sequence

1. Compare currently loaded JS/CSS asset names and hashes with the captured static copies. Do not reuse stale bundle findings until matching is confirmed.
2. Establish a clean browser state for PWA and offline testing.
3. Verify service worker registration, Cache Storage, installability, and offline reload behavior.
4. Investigate TTS/voice controls and browser speech-synthesis voice availability.
5. Revalidate theme persistence and one reload per locale in `en`, Spanish, Japanese, and Arabic.
6. Revalidate RTL layouts at desktop, tablet, and stack widths.
7. Run a native keyboard and focus audit for all major components.
8. Validate Fit, Replay, full screen, and metrics transitions across representative lessons.
9. Extend the 26 November network baseline (initial load, Spanish switch, direct Caché route) to reloads, other lesson/section routes, and TTS/PWA flows if those questions remain in scope.
10. Investigate progress reset and completion semantics only after the existing local-state evidence is preserved.
11. Finish with analytics, account/authentication, external-link, and telemetry checks.

## 26 November REA follow-up

- The initial page load, Spanish locale switch, and direct Spanish Caché lesson route were exercised in sequential, isolated, provider-owned Chromium profiles. The browser process was cleaned up after each scenario; this did not reuse or create duplicate tabs in the user's browser.
- Spanish UI and lesson content rendered in place. The direct route `#/caching/1` rendered step 1 of 13 and requested the lesson-named script `caching-CuJZmXh9.js` (200). Network response bodies were not captured.
- The recap replay visibly updated course progress to `1 / 40`; the expanded progress panel had no reset control in the observed state. Progress reset behavior remains unknown.
- Static bundle analysis found speech-synthesis code behind a false `readAloud` gate; the baseline accessibility tree had no speak control. Full TTS behavior remains only partially checked.
- Evidence IDs: baseline `ev_e65050ff4c3c9b5afdbac4f2531d7fdac5a841e513d68fb7f790ea7edc5beedb`; progress `ev_14e902e5db3919a1fffe1d5270b049f5059f6f519c087c4699b6de2efbd29dc1`; Spanish switch `ev_13754a58c2e44f3c89bec60fb3edf445786e87959b98e2bf93cb1eca761a51fe`; direct lesson `ev_4c20133c3e7db2b90212fbd9fef2df9baeae7d457e3aa31c1bd01a60f4596870`.
- A separate translated-sidebar click timed out (`ev_4d5d07f6784cf6ac8d5f6f7cf91731ff5630ede37f686c4fbaceb9b3ca753ae8`); it is not evidence that lesson navigation failed. The direct route independently verified the rendered lesson.
- The REA launch environment blocks service workers, so these captures do not establish offline behavior. The captures selected network metadata, not response bodies; they cannot establish the exact contents of fetched lesson chunks or prove API absence beyond the tested flows.
- The central project blueprint [`PROJECT_ARCHITECTURE_26_11_2026.md`](../../PROJECT_ARCHITECTURE_26_11_2026.md) includes the detailed follow-up findings and design implications. `REPORT.md` references `evidence-log.md`, which is missing from this folder; the full REA Evidence is retained by the REA session rather than exported as local JSON.

The follow-up did not modify application code or existing probe outputs.
