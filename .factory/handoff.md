# Polish round 3 infrastructure-retry handoff — Signal Check

## Outcome

Round 3 is complete and redeployed at <https://color-meaning-audit.sociobot.in/>. The shipped artifact remains a WXT TypeScript Manifest V3 browser extension with a static Vite site and downloadable ZIP.

The core correction is semantic. Signal Check no longer treats arbitrary text from a nearby status row as a label for a colored mark. Only an explicit accessible name (`aria-label`, `title`, or `aria-labelledby`, including a named graphic owner) can trigger written-label guidance. The sample now truthfully says no nearby text label was found. A packaged-extension regression proves both unlabeled service rows and explicitly named Ready/Blocked marks.

The first-screen support copy is one 19-word audience-and-change sentence. Remaining “browser key,” “field-note overlay,” and “selected comparison” wording was removed from visitor UI. The complete current README is recorded in `.factory/copy-audit.md`. Version/build is 1.0.3, and the catalog description is the 64-character verb-first sentence “Find color-only signals in charts and dashboards before you act.”

The controller-reported Chromium SIGSEGV did not recur. Playwright 1.58.2 completed twice with newly launched Chrome for Testing 145 contexts from a clean clone. No additional product defect was found.

## Verification

- Final clean clone: `/tmp/signal-check-polish-3-infra-retry-GohrcN/repo` at `b8f57c38ce1f5e68a0b15ca69d82d906622eb587`.
- `npm ci`: passed; 0 vulnerabilities.
- `npm test`: passed; TypeScript, 5 Vitest tests, extension/site/ZIP builds, 29 Playwright tests passed, and 15 intentional mobile duplicates of desktop-only claim tests skipped.
- Every one of the 14 commands in `.factory/claims.json`: passed independently from that clean clone. See `.factory/evidence/polish-3-infra-retry/claims-clean/` and `summary.json`.
- Privacy: `@claim:extension-local-check` ran the packaged capture/analyze/inject flow with zero HTTP(S) requests. `@claim:demo-first-party` observed only the product origin.
- Offline: `@claim:demo-offline` passed after service-worker control. `@claim:extension-offline` completed a packaged visible-page check with the browser context offline.
- Accessibility/browser: Axe found zero serious/critical violations on `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html` at desktop and 390 px. The fresh live site suite passed 18 tests with 8 intentional claim duplicates skipped.
- Cold live checks: `verify-url.sh` launched a new browser for every route and reported no console/page errors, one h1, `lang=en`, a main landmark, complete image alt text, and named buttons. Fresh desktop/mobile screenshots are under `.factory/evidence/polish-3-infra-retry/live-*`.
- Routing: `/`, `/demo/?demo=1`, `/privacy/`, `/terms/`, `/404.html`, and the ZIP return 200. `/not-a-real-route` returns the designed page with HTTP 404.
- Mobile: no horizontal overflow; all tested brand, legal, demo-boundary, and color-vision controls are at least 44×44 CSS px.
- Performance: fresh live Lighthouse scored 100 performance, 100 accessibility, 100 best practices, and 100 SEO. FCP 1.0 s, LCP 1.0 s, TBT 20 ms, and CLS 0.
- Payload: initial site JavaScript totals 11,107 bytes uncompressed; CSS is 14,075 bytes; the selected AVIF hero is 27,044 bytes.
- Download integrity: the deployed and local ZIP share SHA-256 `c712c78f57ce3d12044a0eda873e1e8bd08647f026b1c69f0d96e5b9158ee0cc`; its manifest reports version 1.0.3.
- Deployment: Azure Static Web Apps deployment `b965676f-300b-4b1d-b166-a7e9dd4ccd94` succeeded in `eastus2`; the custom domain reported Ready and HTTPS 200.

Fresh retry evidence is under `.factory/evidence/polish-3-infra-retry/`. The full finding map is `.factory/polish-3.md`.

## Run and verify

```sh
npm ci
npm test
npm run build
```

To recheck one claim, run its exact `test` command from `.factory/claims.json`. Deploy `dist/site` with:

```sh
/opt/fleet/lib/deploy-static.sh color-meaning-audit dist/site
```

## Known gaps

None. No review finding is deferred.
