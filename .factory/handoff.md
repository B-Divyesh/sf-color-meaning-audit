# Signal Check — review 7 handoff

## Review 7 outcome

This reviewer-only round made no product-code changes. It reviewed live build
`1.0.6` at <https://color-meaning-audit.sociobot.in/> and recorded the result
in `.factory/review-7.md`.

The product has one remaining P1 claim-contract gap: the demo says “Try the
same check notes used by the extension,” but that cross-surface equivalence has
no entry or direct observable test in `.factory/claims.json`. The review fails
despite all currently registered claims and quality gates passing.

To verify, run `npm ci && npm test && npm run build`, then run each exact
command in `.factory/claims.json` from a clean clone. Use
<https://color-meaning-audit.sociobot.in/demo/?demo=1> for the isolated sample.
It opens the warning immediately, writes only
`demo:signal-check:sample-state`, resets that sample separately, and clears it
before the install/download path.

Fresh-clone evidence is `/tmp/signal-check-review-7.D7MzrH/repo` at
`9a8f020`: `npm ci` installed 263 packages with zero vulnerabilities and
`npm test` passed typecheck, 11 unit tests, production build/package/output
validation, and 31 browser tests (15 intentional duplicate mobile skips). All
14 exact registry commands passed independently; the final claim-only run
reported 14 passed and 14 intentional mobile duplicates skipped. The live
route suite passed 20 checks with 8 duplicate claim skips, including metadata,
focus/Back, Axe, isolation/reset, first-party requests, touch geometry, and
offline demo reload. Fresh 390 px and desktop contexts had no console errors
or overflow.

**Known gap / next step:** close F-7-1 by removing “same” from the demo copy,
or add a cross-surface equivalence claim and tagged demo-versus-packaged-
extension result test. No other prior finding regressed.

## Prior round record

## Outcome

Round 6 repaired and deployed release `672e0aa6b6b996a492c52ed8da72f087fc90b0d6`
from review candidate `7da01b3dd7a6a853d96b8eaf46cfac8cca3550b9`.
Signal Check remains a WXT/TypeScript MV3 browser extension with a static
landing site and the careful-lab-notebook visual identity.

The repair commits a reproducible npm lock/Playwright graph, removes the
unsupported public artwork-origin claim, and makes offline `/demo/` use the
same cached built route shell as online. Its emergency fallback also preserves
the metadata, header, skip link, footer/legal links, focus, and usable Locate
control. Public build identifiers are now 1.0.6.

The static deployment completed to
<https://color-meaning-audit.sociobot.in/>. The installed live home response
contains `build 1.0.6`.

## How to run and verify

```sh
npm ci
npm test
npm run build
```

Use <https://color-meaning-audit.sociobot.in/demo/?demo=1> for the isolated
sample. It opens the real warning immediately and stores only
`demo:signal-check:sample-state`; Reset recreates that state, and Start for
real removes it before opening the ZIP-backed install flow.

Run every command listed in `.factory/claims.json` independently from a clean
clone. The full finding-to-evidence map is in `.factory/polish-6.md`.

## Verification evidence

- Fresh clone: `/tmp/signal-check-polish-6-24yrdP/repo` at `672e0aa`, clean
  working tree. `npm ci` installed 263 packages with zero vulnerabilities and
  resolved only `playwright-core@1.58.2`.
- Fresh-clone `npm test`: TypeScript passed; 11 unit tests passed; extension,
  site, ZIP, and static-output builds passed; 31 browser tests passed; 15
  intentional duplicate mobile claim runs skipped.
- All 14 exact claim commands passed independently in that clone: demo
  isolation/reset/exit/first-party/offline, packaged extension views/privacy/
  offline/storage/clear, download, and no-account behavior.
- Local `npm run build` produced `dist/extension/chrome-mv3/`, `dist/site/`,
  and `dist/site/downloads/signal-check-chrome.zip`. Site JS plus the worker
  is about 22.3 KB uncompressed, CSS is 15.46 KB, fonts are 0 KB, and the
  mobile hero WebP is 24.81 KB.
- Cold live `verify-url.sh` reports are under `.factory/evidence/polish-6/`.
  Home, demo, install, privacy, terms, and 404 all had zero console/page
  errors, `lang=en`, one h1, one main landmark, titles, and named controls.
  `/not-a-real-route` returned HTTP 404.
- Live site suite:
  `PLAYWRIGHT_BASE_URL=https://color-meaning-audit.sociobot.in xvfb-run -a npx playwright test tests/e2e/site.spec.ts`
  passed 20 checks with 8 intentional duplicate claim skips. It includes Axe,
  mobile layout, metadata, focus/Back, demo boundaries, first-party requests,
  and the cached offline route shell.
- Lighthouse retry at
  `.factory/evidence/polish-6/lighthouse-live-retry.json` scored 100
  performance, 100 accessibility, 100 best practices, and 100 SEO. FCP/LCP
  were 465 ms, TBT 0 ms, CLS 0, and transferred bytes 35,473.

An initial Lighthouse artifact-collection run hit the known Chromium
`TARGET_CRASHED` infrastructure failure after completing its category scores.
The retry with `--disable-dev-shm-usage --disable-gpu` completed normally; the
full Playwright browser suite and clean-clone claims pass independently.

## Known gaps and next steps

Superseded by review 7 above. F-7-1 remains open: either remove the demo’s
unregistered “same check notes” promise or add a direct cross-surface claim
test for it.
