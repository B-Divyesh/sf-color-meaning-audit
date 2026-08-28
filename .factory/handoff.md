# Signal Check — repair handoff, perfection loop 1

**Repair commit:** `5ed448342d627dc5f4a78233d5d4d62ea9ea32c1` (based on reviewed candidate `50618434d790fed95dd5fcfb8df04d1153b4195b` and review `52d01c8fee243a68c972d7cdcf46c370d092a948`).

## Completed acceptance work

- Rewrote the first screen around the user and job: color-vision differences, charts/status dashboards, and a single visible **Try it with sample data** path.
- Added `/demo/` and direct `?demo=1` entry. The demo contains a Northstar release-status sample and opens the shipped check-note overlay immediately.
- Added the persistent demo banner, `demo:signal-check:sample-state` isolation, Reset demo, and Start for real cleanup. The service worker supplies a self-contained warning on an offline demo reload after first visit.
- Added `.factory/claims.json` with 12 claim IDs, each with exactly one `@claim:` browser test, plus `.factory/demo.md` and a landing copy audit.
- Added real static routes for demo, privacy, terms, and a styled 404 response. Route pages set title/description/canonical/OG/Twitter metadata, focus their heading, and announce the route. Added the original-art social card and 180px Apple touch icon.
- Made header/footer/legal targets at least 44px, adjusted the demo for a 390px viewport, and retained the ruled-paper lab-notebook visual system.
- Updated privacy/terms/footer links, build identity, catalog description, README, sitemap, static headers, and extension version to 1.0.1.

## Verification evidence

### Main checkout

`npm test` passed on 2026-08-28:

- Typecheck passed.
- Vitest: 5 passed.
- Production package verification passed; `dist/site/downloads/signal-check-chrome.zip` was created.
- Playwright: 18 passed, 14 intentionally skipped duplicate claim executions on the mobile project. Desktop claim tests cover every claim once; mobile layout, routes, axe, and overlay behavior are also covered.
- Axe checks on `/`, `/demo/`, `/privacy/`, `/terms/`, `/404.html`, popup, and overlay reported no serious or critical violations.
- `npm run build` passed after the suite and produced `dist/extension/chrome-mv3` and `dist/site`.

Lighthouse against the built `/demo/` route (Chromium 1208, local static preview): Performance **100**, Accessibility **100**, Best Practices **100**, SEO **100**; LCP **938 ms**, CLS **0**, TBT **0 ms**.

### Clean-clone claim contract

A fresh clone at `/tmp/signal-check-clean` ran `npm ci`, then every command recorded in `.factory/claims.json`. All 12 passed:

`free-download`, `no-account-screen`, `demo-warning`, `demo-isolation`, `demo-reset`, `demo-exit`, `demo-first-party`, `demo-offline`, `extension-check-notes`, `extension-local-check`, `extension-local-storage`, and `extension-clear`.

Each command rebuilds the extension/site before running its isolated Playwright assertion. The desktop claim run passes and the redundant mobile project execution is intentionally skipped.

## Run/deploy

```bash
npm ci
npm test
npm run build
```

Deploy `dist/site` as the static site. The pushed `main` branch is the work-order deployment input; `site/public/staticwebapp.config.json` carries the static route, 404, security-header, and cache configuration.

## Known gaps

None known. The generated social card is a crop of the recorded original notebook artwork; no third-party runtime assets or services were added.
