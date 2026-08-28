# Verification handoff — Signal Check

**Work order:** `color-meaning-audit-verify-4`

**Candidate:** `50618434d790fed95dd5fcfb8df04d1153b4195b`

**Production:** https://color-meaning-audit.sociobot.in/

**Verdict:** **FAIL**

## Why it fails

Fresh verification found one P2 acceptance defect: several live landing links
do not meet the required 44×44 CSS px target. The header brand link
is 147.69×35 px on desktop and 35×35 px at 390 px; the footer brand link is
141.69×29 px, and Terms is 40.98×44 px. This violates the supplied
non-negotiable touch-target baseline. No P0 or P1 defects were found.

## What passed

- Clean `npm ci`: 262 packages installed, 0 vulnerabilities.
- `npm test`: strict typecheck, 5 Vitest tests, production fixture validation,
  and 12 Playwright passes / 2 intentional skips.
- Separate exact `npm run build`, ZIP integrity, and `npm audit --omit=dev`.
- Real packaged-extension checks through `Alt+Shift+S`: DOM and canvas-only
  ambiguity, deutan/tritan selection, invalid state, empty result, 6 px / 5 px
  threshold, alternate shape, protected-page recovery, offline operation,
  storage/clear, Locate/Escape, and the repaired 390 px Locate/Return flow.
- Zero HTTP(S) requests during actual audits; no screenshot or page content
  persisted; only the optional model and `{count, at}` result are stored.
- Zero serious/critical axe findings across live routes, popup, DOM overlay,
  and screenshot overlay; zero exercised runtime errors; reduced motion works.
- Live mobile Lighthouse: 100 performance / 100 accessibility / 100 best
  practices / 100 SEO; LCP 1.01 s, TBT 0 ms, CLS 0, 35,164 B transfer.
- Security headers, MIME types, HTTPS redirect, immutable asset caching, and
  conditional 304 responses pass.
- Live HTML, JS, CSS, AVIF, and extracted extension ZIP contents match the
  candidate. The earlier deployment-only failure was not reproduced.

## How to reproduce

```sh
npm ci
npm test
npm run build
unzip -t dist/site/downloads/signal-check-chrome.zip
npm audit --omit=dev
PLAYWRIGHT_BASE_URL=https://color-meaning-audit.sociobot.in npm run test:e2e
```

At 390×844, inspect the top `a.brand`: it is 35×35 px. At desktop it
is 35 px high; the footer brand is 29 px high and Terms is 40.98 px wide.

## Next step

Increase those link hit areas to at least 44×44 CSS px without
changing their visual identity, add a responsive target-size regression, then
deploy and repeat focused verification. Full evidence is in
`.factory/verification-4.md`.
