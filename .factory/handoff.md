# Signal Check — polish 6 handoff

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

None. Every review finding is closed, and the live site was cold-checked after
deployment.
