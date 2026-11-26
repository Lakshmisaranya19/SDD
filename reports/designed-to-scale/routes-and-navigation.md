# Routes and Navigation

**Status:** CONFIRMED WITH EDGE GAPS

## Confirmed route patterns

| Pattern | Behaviour |
|---|---|
| `/` or empty hash | Opens the initial request-lifecycle lesson |
| `#/lesson-id/1` | Opens lesson step 1 |
| `#/lesson-id/stepNumber` | Opens the numbered lesson step |
| `#/does-not-exist/5` | Falls back without presenting an error page |
| `#/lesson-id/999` | Tested sharding step clamps to the last step |
| `#/lesson-id` | Tested malformed sharding hash is normalised |

Evidence: `q4`, `q5`, `q16`.

## Navigation components

- Brand link
- Primary top navigation
- Sidebar/drawer course tree
- Module accordions
- Lesson links
- Back and Next pager
- Timeline step buttons
- Search result selection
- Browser Back/Forward

## Top-level navigation

Practice, Design Lab, and Cheatsheets display “Practice is coming soon” and leave Learn active in the tested interaction.

## Browser behaviour

- Lesson navigation updates `location.hash`
- Next/Back update browser history
- Browser Back restored earlier lesson state in probe evidence
- Direct deep links restore lesson and step state
- Initial empty hash may internally represent step zero rather than a hash route

## Undocumented/edge routes

Not sufficiently investigated:
- Query parameter combinations
- Duplicate/trailing slash behavior
- Case variants
- Unknown step text
- Browser Forward after route changes
- Reload failure states
- `?lang=` with hash routes
