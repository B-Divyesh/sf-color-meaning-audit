# Polish round 2 handoff — Signal Check

## Outcome

Repaired release candidate `10f7a9c243d7962a2b9173179ad7847ca9db6aa8` against every finding in `review-1.md` and `review-2.md`. The product remains a WXT/TypeScript MV3 browser extension with a static Vite site and retains its ruled lab-notebook identity.

The implementation is commit `2d33071` and is live at <https://color-meaning-audit.sociobot.in/>. The isolated sample is at <https://color-meaning-audit.sociobot.in/demo/?demo=1>.

## What changed

- Rewrote the first screen so the job, audience, sample outcome, install action, and three facts are clear on a phone.
- Completed the demo sandbox with persistent banner, demo-only storage, Reset, Start for real, query entry, offline warning, and protected 44 px controls.
- Replaced the inadequate privacy claim test with a real packaged-extension run through the toolbar shortcut, capture, analysis, injection, visible result, and network interception.
- Added full shipped-extension coverage for Deutan, Protan, and Tritan views.
- Completed the 13-entry claims registry and exact tagged claim commands.
- Completed real route titles, metadata, canonical/social tags, heading focus, Back/reload behavior, legal navigation, versioned footers, and HTTP 404 handling.
- Updated visitor and README language, the complete copy/terminology audit, demo documentation, version `1.0.2`, and the verb-first 77-character catalog description.
- Preserved the original notebook artwork and product-specific visual system; no generic template or replacement asset was introduced.

The finding-by-finding change and evidence map is in `.factory/polish-2.md`.

## Verification

From a clean clone at `/tmp/signal-check-clean-8QhVQe`:

- `npm ci` — passed; 263 packages, zero vulnerabilities.
- `npm test` — passed: TypeScript, 2 Vitest files / 5 tests, production extension/site/ZIP build, Playwright 26 passed / 14 intentional mobile claim skips.
- Every exact command in `.factory/claims.json` — all 13 passed independently.
- Build output — extension 27.26 KB total; site CSS 14.07 KB (4.02 KB gzip); largest initial route JS 9.73 KB (4.13 KB gzip); mobile hero WebP 24.81 KB.

After deployment:

- `PLAYWRIGHT_BASE_URL=https://color-meaning-audit.sociobot.in npm run test:e2e -- tests/e2e/site.spec.ts` — 18 passed / 8 intentional mobile claim skips.
- `verify-url.sh` on live home and demo — HTTP 200, zero console/page errors, correct title/lang/one `h1`/`main`, no missing alt text or button names.
- Axe 4.10.3 on all five live routes — zero violations.
- Unknown live route — HTTP 404 with the designed recovery page.
- Lighthouse mobile — 100 performance, 100 accessibility, 100 best practices, 100 SEO; FCP 0.9 s, LCP 1.1 s, TBT 70 ms, CLS 0.
- Cold desktop and 390 px screenshots were opened and inspected. The sample banner/actions remain visible, the overlay stays below them, and no horizontal overflow appears.

Evidence is committed under `.factory/evidence/polish-2/`.

## Run, test, and deploy

```sh
npm ci
npm test
npm run build
/opt/fleet/lib/deploy-static.sh color-meaning-audit dist/site
```

`npm run build` emits `dist/extension/chrome-mv3/`, `dist/site/`, and `dist/site/downloads/signal-check-chrome.zip`.

## Known gaps

None. Every recorded finding is closed and the deployed site passed the cold verification loop.
