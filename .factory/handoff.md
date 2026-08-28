# Signal Check — polish 7 handoff

## Outcome

Round 7 repairs review commit `b619206a73f80a9903a79e7e95819d5560325bed`
for release candidate `9a8f0204b8375e20adbf1d029cb1d0e8163d77a8`.

Repair commit `fcf426117fb2f4c3abfde0b9499d7a065480fb3f` removes the one
remaining unregistered demo equivalence promise. The demo now says “Read a
sample warning,” which is directly covered by the existing sample-warning and
isolation claims. A rendered-page regression test and a source-copy guard keep
the unsupported “same check notes” wording from returning. The extension and
static site are version `1.0.7`; the service-worker cache was advanced to
`signal-check-site-v7` so repaired offline content is refreshed.

The deployed static-site artifact is deployment
`7dd8d170-c51d-49d3-a04a-004d2ff73440` at
<https://color-meaning-audit.sociobot.in/>. Cold live verification confirms
build `1.0.7`, the isolated demo at
<https://color-meaning-audit.sociobot.in/demo/?demo=1>, and an HTTP-404
response for an unknown route.

## Run and verify

```sh
npm ci
npm test
npm run build
```

Run every exact command listed in `.factory/claims.json` from a clean clone.
The demo uses only `demo:signal-check:sample-state`; Reset recreates only that
sample state, and Start for real removes it before opening installation and
starting the extension ZIP download. See `.factory/demo.md` for the sandbox
boundary.

## Exact evidence

- Fresh clone: `/tmp/signal-check-polish-7.fM5Jp4/repo` at repair commit
  `fcf426117fb2f4c3abfde0b9499d7a065480fb3f`. `npm ci` installed 263 packages
  with zero vulnerabilities.
- Clean-clone `npm test`: typecheck passed; 12 Vitest unit tests passed;
  extension/site/ZIP build and output verification passed; 33 browser tests
  passed; 15 duplicate mobile claim runs were intentionally skipped.
- All 14 exact registry commands passed independently in that clone:
  download, no-account, demo warning/isolation/reset/exit/first-party/offline,
  extension check notes/views/local processing/offline/local storage/clear.
- Local browser evidence is in `.factory/evidence/polish-7/local-*`; every
  route had zero console/page errors, `lang=en`, exactly one h1, one main,
  complete alt text, and named controls. The local 404 asset is covered by the
  static-host response-override test; the development preview intentionally
  does not emulate its production HTTP status.
- Live cold evidence is in `.factory/evidence/polish-7/live-*`. Home, demo,
  install, privacy, terms, and 404 asset passed `verify-url.sh`; the unknown
  live route returned HTTP 404.
- Live suite:
  `PLAYWRIGHT_BASE_URL=https://color-meaning-audit.sociobot.in xvfb-run -a npx playwright test tests/e2e/site.spec.ts`
  passed 22 checks with 8 intentional duplicate mobile claim skips. It includes
  Axe serious/critical checks, focus/Back behavior, metadata, mobile targets,
  demo privacy, reset, first-party requests, and offline reload.
- Lighthouse: local and live reports are
  `.factory/evidence/polish-7/lighthouse-local.json` and
  `.factory/evidence/polish-7/lighthouse-live.json`. Both scored 100 in
  performance, accessibility, best practices, and SEO. The live result was
  FCP 877 ms, LCP 1063 ms, TBT 32 ms, CLS 0, and 35,482 B transfer.
- Budget: production site JavaScript plus worker is about 22 KB uncompressed,
  CSS is 15.46 KB, fonts are 0 KB, and the mobile hero WebP is 24.81 KB.

## Known gaps and next steps

None. Every finding through review 7 is mapped to its repair and evidence in
`.factory/polish-7.md`.
