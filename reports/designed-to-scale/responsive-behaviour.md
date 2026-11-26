# Responsive Behaviour

**Status:** CONFIRMED FOR REPRESENTATIVE VIEWPORTS; UNVERIFIED AT EVERY BREAKPOINT

## Desktop

Measured: `1440×900`

- `data-layout="desktop"`
- Top navigation visible
- Menu button hidden
- Sidebar visible
- Lesson sheet and right rail visible
- No recorded body horizontal overflow

Evidence: `q10-desktop.json`.

## Tablet

Measured: `1024×768`

- `data-layout="tablet"`
- Menu button visible
- Primary top navigation hidden
- Sidebar/drawer behavior active
- Sheet and rail have separate dimensions

Evidence: `q10-tablet.json`, `q10-responsive.js`, `q22-tablet.json`.

## Stack/mobile

Measured: `390×844`

- `data-layout="stack"`
- Top navigation hidden
- Brand, menu, and search visible
- Sidebar initially off-canvas
- Lesson sheet stacks stage, timeline, guide, and goals
- Vertical scrolling observed

Evidence: `q10-mobile.json`, `q11-mobile.json`, `q22-mobile.json`.

## Drawer

- Closed drawer is off-canvas
- Open drawer becomes visible and receives close focus
- Close restores menu-button focus
- Opening a lesson navigates and closes the drawer

Evidence: `q11-drawer.js`, `q11-mobile.json`.

## Pager

- Desktop/tablet pager behavior is context-dependent
- Mobile batch-stream evidence recorded a fixed pager
- Tablet batch-stream evidence recorded static pager positioning

Evidence: `q22-mobile.json`, `q22-tablet.json`.

## Pending responsive checks

- 960/1200 breakpoint boundaries
- Short-height desktop
- Landscape mobile
- Browser zoom
- Intermediate widths
- RTL drawer transitions
- Horizontal overflow across every step
- Diagram scaling for each lesson type
