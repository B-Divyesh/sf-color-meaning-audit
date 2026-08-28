# Signal Check — review 6 handoff

> This review-only handoff supersedes the round-5 acceptance statement below. No product code changed in review 6; the current verdict is **FAIL**. See `.factory/review-6.md`.

## Outcome

Polish round 5 is complete. Every finding in `.factory/review-1.md` through `.factory/review-5.md` is closed and mapped in `.factory/polish-5.md`. The browser-extension artifact class, local-first behavior, and notebook-and-lens visual identity remain intact.

The deployed source is `54ff710746c80e1fb309cbf59b275f3bef23cf02`. Static deployment `99f10b16-5f35-4647-a680-3de4cf23e71a5` is Ready at <https://color-meaning-audit.sociobot.in/>.

Round 5 adds a sticky demo boundary, a real install handoff with automatic ZIP download and Chromium steps, a resilient self-contained offline sample, the reviewed first-screen and README rewrites, install-route metadata/focus, and exact claim coverage. The visible build is 1.0.5.

## Verification

- Fresh clone: `/tmp/signal-check-polish-5-final-a01pRM/repo` at `54ff710746c80e1fb309cbf59b275f3bef23cf02`.
- `npm ci`: 263 packages installed; zero vulnerabilities.
- `npm test`: TypeScript passed; 9 unit tests passed; production extension/site/ZIP builds passed; 31 browser tests passed; 15 intentional duplicate mobile claim runs skipped.
- Claims: all 14 exact commands in `.factory/claims.json` passed independently from that clean clone. Logs are in `.factory/evidence/polish-5/claims-final-clean/`.
- Live browser suite: 20 passed; 8 intentional duplicate claim runs skipped. It covered demo isolation/reset/exit/offline, metadata, focus, Back, Axe, scrolling controls, mobile overflow, and 44 px targets.
- Cold route verification: home, demo, install, privacy, terms, and 404 each have the correct title, `lang=en`, one h1, one main, named controls, alt text, and zero console/page errors.
- Live link crawl: every rendered internal, asset, download, GitHub source, and issue link returned 200. `/not-a-real-route` returned the designed page with HTTP 404.
- Live Lighthouse: 100 performance, 100 accessibility, 100 best practices, and 100 SEO; FCP 1.0 s, LCP 1.1 s, TBT 0 ms, CLS 0, transfer 35 KiB.
- Accessibility: Playwright Axe found no serious or critical issue on home, demo, install, privacy, terms, or 404 at mobile and desktop widths.
- Privacy/offline: whole-flow interception proves the demo is same-origin and the packaged check makes zero HTTP(S) requests. Both demo and packaged extension checks pass offline.
- Artifact: the local and live ZIPs are byte-identical at SHA-256 `6637e919282bbae8e1d656d62eeef81d69c2440da8a4f8c888b046ab6ea1cb02`.
- Budgets: total emitted site JavaScript including the service worker is 18,388 bytes; CSS 15,467 bytes; fonts 0 bytes; mobile hero WebP 24,818 bytes; AVIF 27,044 bytes.

Primary evidence is under `.factory/evidence/polish-5/`. Run locally with `npm ci && npm test`; build release artifacts with `npm run build`.

## Known gaps and next steps

Review 6 found three remaining items:

1. **F-6-1 (blocking):** the repository has no lockfile. `npm ci` cannot run, and a normal clean install resolves incompatible Playwright types so `npm test` fails at typecheck.
2. **F-6-2:** the public footer says the hero is original project artwork without a corresponding claim/test.
3. **F-6-3:** the offline service-worker demo is a reduced route shell without normal navigation, legal links, metadata, route focus, or an explanation for its disabled Locate action.

Review verification: fresh 390 px and desktop live checks passed the first-read, demo, metadata, link, and visual checks; all 14 exact claim commands passed after a diagnostic clean-clone install; `npm run build` passed; `npm test` failed as F-6-1 describes. After repair, verify from a new clone with `npm ci && npm test`, rerun every claim command, and repeat the offline route-shell test.
