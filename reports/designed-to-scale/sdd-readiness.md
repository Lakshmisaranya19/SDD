# Software Design Specification Readiness

**Status scale**

- **READY**: Existing evidence is sufficient to draft and generally finalize the area.
- **READY WITH ASSUMPTIONS**: A draft can begin, but must label assumptions and unresolved evidence.
- **NOT READY**: Current evidence is insufficient to define the area reliably.

## Ready areas

### Product overview

**Status: READY WITH ASSUMPTIONS**

Supported by:
- [REPORT.md](REPORT.md)
- `index.html`
- `q1`, `q2`, `q9`, `lessons-raw.json`
- `appendix-lessons.md`

Uncertainties:
- Exact educational publisher/product positioning
- Public release goals
- User personas
- Analytics or account goals

**Recommendation:** Draft now and mark lifecycle goals as product assumptions where no evidence exists.

---

### Functional requirements

**Status: READY WITH ASSUMPTIONS**

Supported by:
- Route and lesson evidence
- Next/Back/timeline/search evidence
- Theme/language/persistence evidence
- Sidebar/drawer evidence

Uncertainties:
- Reset/clear behavior
- PWA/offline behavior
- TTS behavior
- Full acceptance behavior for every lesson
- Search ranking contract

**Recommendation:** Draft common functional requirements and explicit accepted evidence boundaries. Do not infer reset or PWA requirements.

---

### User flows

**Status: READY WITH ASSUMPTIONS**

Supported by:
- `q4`, `q5`, `q6`, `q11`, `q16`, `q17`

Uncertainties:
- Native keyboard flow
- PWA install/offline flow
- TTS flow
- Reset flow
- Error/loading states

**Recommendation:** Draft the standard Learn, lesson, search, preference, and drawer flows. Treat edge/error flows as not yet final.

---

### UI/component specifications

**Status: READY WITH ASSUMPTIONS**

Supported by:
- `q1`, `q2`, `q10`, `q11`, `q12`, `q20`, `q21`, `q23`
- Static HTML/CSS captures

Uncertainties:
- Component behavior under all breakpoints
- Exact animation timings
- Exact focus behavior
- Accessibility semantics
- Voice and metric transition behavior

**Recommendation:** Define stable components and layouts, but annotate responsive and state variants as pending final review.

---

### Data and persistence requirements

**Status: READY WITH ASSUMPTIONS**

Supported by direct storage evidence:
- `sdt:theme`
- `sdt:lang`
- `sdt:done`
- `sdt:last`
- `sdt:recent`
- `sdt:progressOpen`

Uncertainties:
- Reset semantics
- Schema versioning
- Cross-tab behavior
- Invalid/corrupt storage handling
- Remote synchronization
- Data export/deletion

**Recommendation:** Define observed keys and expected values. Do not assume schema migration or sync until evidence exists.

---

## Not-ready areas

### Application architecture specification

**Status: NOT READY**

Reasons:
- The reference's internal source organization is not available; bundled assets cannot prove a formal source/content separation.
- Live and saved main assets are cryptographically identical, but dynamic chunk contracts remain incompletely mapped.
- Complete route-to-chunk graph is missing.
- API boundaries and telemetry scope are not established.
- PWA/service-worker architecture is unknown.
- State-management architecture is inferred rather than directly mapped.

The new reusable-platform proposal is ready for an architectural synthesis checkpoint:
- [reusable-platform-architecture-proposal.md](reusable-platform-architecture-proposal.md)
- [architecture-discovery-summary.md](architecture-discovery-summary.md)

Required evidence:
- P1-6 network scope
- P0-4 PWA/service-worker evidence
- Static bundle-to-feature analysis

Completed prerequisite:
- P0-1 main entry, JS, and CSS identity is confirmed current at 2026-11-25.

---

### Non-functional requirements

**Status: NOT READY**

Reasons:
- Accessibility implementation is only partially measured.
- Performance thresholds beyond one reload are not established.
- Offline/installability behavior is unknown.
- Browser and device support matrix is missing.
- Error/loading behavior is untested.

Required evidence:
- P0-5 accessibility audit
- P0-4 PWA/offline audit
- P1-5 responsive matrix
- P1-6 network scope

---

### Acceptance criteria

**Status: NOT READY**

Reasons:
- Several major P0 questions remain open.
- Native keyboard behavior is incomplete.
- PWA and reset behavior are unresolved.
- Metric and animation transitions lack exact acceptance values.
- Current asset freshness is not proven.

Required evidence:
- P0 investigation backlog completion
- A fresh native-browser probe matrix
- Direct pass/fail accessibility criteria
- Final route/content/persistence matrix

---

## Specification writing order

1. **Draft product overview**
   - Use observed audience/course content and clearly mark business assumptions.

2. **Draft core functional requirements**
   - Cover modules, lessons, steps, hash routes, search, navigation, theme, language, and progress.

3. **Draft user flows**
   - Start with Learn → lesson → recap → next lesson; search; drawer; preference changes.

4. **Draft UI/component specifications**
   - Use stable component names and representative desktop/tablet/stack layouts.
   - Mark all pending states and exact animation variants.

5. **Draft persistence requirements**
   - Document only directly observed keys.
   - Separate confirmed behavior from reset/migration assumptions.

6. **Do not finalize architecture yet**
   - Wait for P0-1 asset identity and P1-6 network/integration scope.

7. **Do not finalize NFRs yet**
   - Wait for P0-5 accessibility and P0-4 PWA/offline.

8. **Write acceptance criteria last**
   - Derive from final P0/P1 evidence and add explicit browser/viewpoint matrices.

## Overall recommendation

**SDD drafting can begin now for product overview, core functional requirements, user flows, UI components, and observed persistence.**

**Final SDD completion should wait for P0 investigations.**

The new documents should be treated as an evidence checkpoint, not as a source of new runtime findings.
