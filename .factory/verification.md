# Verification — FAIL

**Candidate:** `65c751d8ad210f6d18b2b42f2119f19a99e05136` (`main`)

**Live URL:** https://color-meaning-audit.sociobot.in/

**Verified:** 2026-08-28, independently from a clean worktree after `npm ci`.

## Release decision

**FAIL.** The required clean-checkout quality gate is not reproducible: the first
`npm test` after `npm ci` fails in both Chromium projects. The test requests
`/downloads/signal-check-chrome.zip` after running only `build:site`; that ZIP
is created solely by `package:extension`, which `npm test` never runs. Vite
returns `index.html` (8,404 bytes) for the missing download and the assertion
requires more than 10,000 bytes. `npm test` passes only *after* a prior
`npm run build` has left the ZIP in `dist/`, so the result depends on stale
build output.

This violates the factory requirement that the repository test command exists
and passes locally from a clean checkout. No product code was modified during
this verification.

## Evidence

| Area | Result | Evidence |
| --- | --- | --- |
| Clean install | PASS | `npm ci`: 263 packages audited, 0 vulnerabilities. |
| Type checking | PASS | `npm run typecheck` completed (`wxt prepare && tsc --noEmit`). No lint script is provided. |
| Unit tests | PASS | `vitest run`: 4/4 passed. Includes grayscale boundary and repeated red/green detection. |
| Clean full test command | **FAIL** | First `npm test`: 2 failures (desktop and mobile), `tests/e2e/site.spec.ts:17`; expected download >10,000 bytes, received 8,404. Other 3 assertions passed and 1 was expected mobile-only skip. |
| Test after production build | PASS, non-clean | A subsequent `npm test` passed 5, skipped 1 only because `npm run build` had produced the ZIP first. This does not cure the clean-run failure. |
| Exact production build | PASS | `npm run build` completed: WXT MV3 output 26.58 KB; site JS 1.17 KB, CSS 10.78 KB; ZIP 16,791 bytes; `unzip -t` passed. |
| Packaged extension | PASS | Loaded `dist/extension/chrome-mv3/` in Chromium through the actual toolbar action. On the in-view red/green status board it reported **1 signal to verify**, named the two labels, wrote only `{lastResult:{count:1,at}}` to `chrome.storage.local`, located/highlighted both marks, and Escape removed overlay and highlights. No console/page errors. |
| Normal / empty / invalid recovery | PASS | At the top of the same site, no in-view candidate produced the honest “No likely color-only signals found” overlay. A real toolbar run on `chrome://settings/` showed “This browser page is protected…” and restored the enabled Check button. |
| Desktop and 390px mobile | PASS | Live page at 1440px and Pixel 5 / 393px CSS width: one h1/main, no horizontal overflow, keyboard Enter toggled Deutan state, 3px visible focus outline, no errors. |
| Reduced motion | PASS | `prefers-reduced-motion: reduce` yielded `scroll-behavior: auto` and 0s status-board transition. |
| Accessibility | PASS | Axe had 0 serious/critical findings on `/`, `/privacy/`, and `/terms/` live; all have `lang=en`, one h1, and one main. Overlay dialog has labelled close control, focusable sheet, and Escape close. |
| Privacy / outbound traffic | PASS | First-load live requests were exclusively `https://color-meaning-audit.sociobot.in`; no analytics or third-party font/script calls. Manifest has only `activeTab`, `scripting`, and `storage`; no host permissions. Source review found only local data-URL `fetch` and local `chrome.storage.local` writes. |
| Deployment parity | PASS | Live `/` SHA-256 `1d02011d…bed4bcd` equals `dist/site/index.html`; live `/assets/main-CP_r-BVq.js` SHA-256 `5eaba269…154777af` equals the candidate build. Live download is HTTP 200, ZIP, 16,791 bytes. |
| Headers / policies | PASS with defect below | HTTPS, HSTS, CSP (`default-src 'self'`), `nosniff`, no-referrer, restrictive permissions policy, and `frame-ancestors 'none'` were present. |

## Defects

### P1 — `npm test` fails from a clean checkout

**Reproduction:** `npm ci && npm test`.

**Observed:** The e2e download assertion gets 8,404-byte HTML instead of the
extension ZIP in both desktop and mobile projects. `npm test` invokes
`build:site`, not `package:extension`; `dist/` is absent after the clean
checkout/install.

**Expected:** The documented test command must prepare its own test fixture or
package the extension so it consistently passes without a pre-existing
`dist/site/downloads/signal-check-chrome.zip`.

### P2 — Hashed static assets are not immutable cached

Live JS, CSS, AVIF, HTML, and ZIP all return
`cache-control: public, must-revalidate, max-age=30`. The candidate’s hashed
JS/CSS assets should use a long-lived immutable cache policy, as required by
the performance contract. This is not a functional failure, but wastes repeat
visits and does not meet the stated caching policy.

## Notes and scope

- The deployed site is exactly the tested candidate; the builder’s earlier
  deployment-only concern is not reproduced.
- This is a browser extension, not a library/CLI/PWA/backend; consumer package,
  PWA offline/update, and backend persistence/concurrency checks do not apply.
- No Lighthouse command is supplied by the repository. Bundle sizes are well
  under the stated static-product budget; the caching defect remains.

## Required next steps

1. Make `npm test` self-contained, then repeat `npm ci && npm test` from an
   empty `dist/` directory.
2. Configure immutable, long-lived caching for content-hashed assets while
   retaining an appropriate short/revalidation policy for HTML.
3. Re-run this verification before release.
