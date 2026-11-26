# Network and Integrations

**Status:** PARTIAL

## Reload evidence

Captured reload resources included:
- HTML document
- Main JS and CSS bundles
- PWA manifest
- Local fonts
- Favicon and icons
- Dynamic language/lesson chunks in later navigation

Evidence: `q8`, `q18`, `q19`.

## Asset freshness

Main live/saved assets were cryptographically compared and match:

- [asset-freshness.json](evidence/live-2026-11-25/asset-freshness.json)
- Main JS SHA-256: `475546D36E0549AECBC4D5E4557F7D5FECFD0B14F207EF7E0B5412C464B06FA0`
- Main CSS SHA-256: `DC99C195D0230AE0D23C005906C6E307FBD8184AD59408735878B58B7430EEE1`

Dynamic chunks remain outside this freshness comparison.

## API and backend

No application API or backend request was observed during the reload capture.

This does **not** prove:
- No API exists
- No request occurs during search or lesson completion
- No future interactive section uses a backend
- No analytics or telemetry is loaded

## External resources

Observed static resources are same-origin assets and local fonts. The credit/author link points to X in static metadata.

## Voice/TTS

Static bundle contains Web Speech-style UI structures. Runtime voice behavior is UNVERIFIED.

## PWA

Manifest confirmed. No active service worker or Cache Storage entries were observed in the tested context.

## Integration gaps

- Analytics and telemetry
- Authentication
- Accounts
- Synchronization
- Search backend
- TTS provider/network behavior
- External link behavior
- Update and stale-cache behavior
