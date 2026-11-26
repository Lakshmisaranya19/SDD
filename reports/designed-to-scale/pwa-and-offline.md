# PWA and Offline

**Status:** PENDING

## Manifest confirmed

The manifest declares:
- Name: System Design
- Short name: System Design
- Standalone display
- `/` start URL
- Light background/theme
- 192×192 and 512×512 icons

Evidence: `q8`, `q18`.

## Service worker

No active service-worker registration was observed in the tested context.

This is not proof that no worker could be registered in another state or browser profile.

## Cache Storage

No Cache Storage entries were observed in `q8`.

## Installability

Manifest presence is confirmed, but install eligibility/prompt behavior was not tested.

## Offline behavior

UNVERIFIED:
- Offline reload
- Offline lesson navigation
- Install/update flow
- Stale cache behavior
- Asset-cache scope
- Offline font fallback

## Safe next investigation

Use the existing browser target or an explicitly justified isolated profile without clearing existing storage. Do not reset progress or preferences.
