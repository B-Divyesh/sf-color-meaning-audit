# Polish round 3 — finding closure

**Release candidate:** `0d2521a0092edc287307ae3e6c0d8e0ccddfb448`  
**Review commit:** `7529deb1449cd6317f5a1d2233e9b3b10c1a3416`  
**Repair commits:** `52b1624`, `00a1911`, `0e46a38`  
**Live URL:** <https://color-meaning-audit.sociobot.in/>  
**Demo URL:** <https://color-meaning-audit.sociobot.in/demo/?demo=1>

Every finding in `review-1.md`, `review-2.md`, and `review-3.md` is closed below. Round-one and round-two IDs follow `polish-2.md`.

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| R1-FIRST-SCREEN | Kept the job-led six-word h1 and rewrote the support copy as one 19-word audience-and-change sentence. | `primary demo wording names its result and the query entry opens the isolated route`; `evidence/polish-3/live-home/screenshot-mobile.png`; live `/`. |
| R1-DEMO-SANDBOX | Preserved the one-click `?demo=1` entry, already-open production check notes, persistent banner, isolated `demo:` state, reset, and exit behavior. | `@claim:demo-warning`, `@claim:demo-isolation`, `@claim:demo-reset`, `@claim:demo-exit`; `evidence/polish-3/live-demo/screenshot-mobile.png`; live `/demo/?demo=1`. |
| R1-CLAIMS-CONTRACT | Updated `.factory/claims.json` to 14 observable claims, each with exactly one matching tagged test; added the previously unlisted extension offline state. | All commands in `evidence/polish-3/claims-clean/summary.json` exit 0; `evidence/polish-3/live-demo/screenshot-desktop.png`; live demo claim suite. |
| R1-ROUTING-404-FOCUS | Retained direct demo/legal routes, route titles, heading focus, Back behavior, announcements, and the notebook-styled 404. Closing check notes now restores prior page focus. | Route/focus test plus `the palette overlay opens accessible check notes with alternate-cue guidance`; `evidence/polish-3/live-404/screenshot-mobile.png`; live `/not-a-real-route` returns 404. |
| R1-UNLISTED-CLAIMS | Re-audited public promises and added `extension-offline`; narrowed the sample/check-note claims to the behavior now asserted. | 14/14 claim commands in `claims-clean/summary.json`; `evidence/polish-3/live-home/screenshot-mobile.png`; live `/` and `/demo/?demo=1`. |
| R1-METADATA-SKELETON | Preserved route-specific titles, descriptions, canonicals, OG/Twitter art, icons, sitemap, legal links, Param Factory credit, and bumped build/version to 1.0.3. | `routes provide titles, metadata, focus, and an explicit not-found page`; `evidence/polish-3/live-privacy/screenshot-desktop.png`; live home/demo/privacy/terms/404 checks all pass. |
| R1-TOUCH-TARGETS | Preserved 44×44 px minimum targets for brands, legal links, demo controls, and model choices at both viewports. | `responsive layout has no horizontal overflow and keeps every core target at least 44px`; `evidence/polish-3/live-demo/screenshot-mobile.png`; live demo. |
| R1-TERMINOLOGY | Standardized visible result wording on “check notes,” removed “field-note overlay,” “selected comparison,” and demo “browser key” copy. | Full suite plus `.factory/copy-audit.md`; `evidence/polish-3/live-demo/screenshot-mobile.png`; live home/demo/privacy. |
| R1-COPY-L03 | The first-screen support sentence is 19 words and names audience, task, and change. | First-screen Playwright assertion; `evidence/polish-3/live-home/screenshot-mobile.png`; live `/`. |
| R1-COPY-R02 | Kept the README opening split into two short, concrete sentences. | `.factory/copy-audit.md`; `evidence/polish-3/live-home/screenshot-desktop.png`; live `/` confirms matching product language. |
| R1-COPY-R14 | Kept installation as short numbered actions and the real toolbar action. | Clean `npm test` packaged-extension flow; `evidence/polish-3/live-home/screenshot-desktop.png`; live download returns 200. |
| R1-COPY-R27 | Kept deployment/cache wording short and concrete. | `static host caching policy`; `evidence/polish-3/live-home/screenshot-desktop.png`; live responses revalidate. |
| R1-COPY-R28 | Kept scope, design, and handoff references in one 12-word README sentence. | `.factory/copy-audit.md`; `evidence/polish-3/live-home/screenshot-desktop.png`; live `/` smoke check. |
| R1-CTA | Preserved “Try sample data — see a color-only warning” as the primary first-screen action. | Primary demo wording Playwright test; `evidence/polish-3/live-home/screenshot-mobile.png`; live CTA opens `/demo/?demo=1`. |
| R2-PRIVACY-CLAIM | Preserved the packaged MV3 capture, analysis, and injection test with HTTP(S) interception over the complete operation. | `@claim:extension-local-check`; `claims-clean/extension-local-check.log`; live ZIP hash matches the locally tested package. |
| R2-DEMO-TOUCH | Preserved 44 px Reset, Start for real, and color-vision controls with overlay clearance at 390 px. | Responsive geometry test; `evidence/polish-3/live-demo/screenshot-mobile.png`; live demo. |
| R2-FIRST-ACTION | Preserved the outcome-specific sample CTA beside the install action. | Primary demo wording Playwright test; `evidence/polish-3/live-home/screenshot-mobile.png`; live `/`. |
| R2-COLOR-VIEWS | Preserved packaged tests for Deutan, Protan, and Tritan flows and saved selection. | `@claim:color-vision-views`; `claims-clean/color-vision-views.log`; live ZIP is byte-identical to the tested ZIP. |
| R2-COPY-SECONDARY | Preserved “Open the sample warning” for both secondary demo links. | `.factory/copy-audit.md`; `evidence/polish-3/live-home/screenshot-mobile.png`; live `/`. |
| R2-COPY-BROWSER-KEY | Removed the remaining visitor-facing “browser key” wording from demo, privacy, and README while keeping the exact namespace in technical demo docs. | Demo isolation/reset tests; `evidence/polish-3/live-demo/screenshot-mobile.png`; live demo/privacy. |
| R2-COPY-ADVISORY | Preserved direct “second check, not a verdict” wording and replaced the overlay’s remaining “Advisory” label. | Palette overlay test; `evidence/polish-3/live-demo/screenshot-desktop.png`; live `/` and demo. |
| F-3-1 | Replaced ancestor-row text inference with explicit `aria-label`, `title`, or `aria-labelledby` association. Unlabeled service rows now report no written label; Ready/Blocked marks get label guidance. | `@claim:extension-check-notes` packaged regression and strengthened `@claim:demo-warning`; `evidence/polish-3/live-demo/screenshot-mobile.png`; live demo shows “No nearby text label was found.” |
| F-3-2 | Replaced two support sentences with the required single 19-word audience-and-change sentence. | First-screen Playwright assertion; `evidence/polish-3/live-home/screenshot-mobile.png`; live `/`. |
| F-3-3 | Regenerated `.factory/copy-audit.md` from the complete current README, including all prose and numbered instructions; code blocks are explicitly excluded. | `.factory/copy-audit.md`; clean `npm test`; `evidence/polish-3/live-home/screenshot-desktop.png`; live copy check. |

## Acceptance evidence

- Final clean clone: `/tmp/signal-check-polish-3-final-iuowoM/repo` at `0e46a38`; `npm ci` reported zero vulnerabilities.
- Full clean-clone suite: `npm test` passed 5 Vitest tests and 29 Playwright tests; 15 mobile duplicates of desktop-only claim tests were intentionally skipped. See `evidence/polish-3/npm-test-clean.log`.
- Claims: all 14 exact commands in `.factory/claims.json` passed independently. See `evidence/polish-3/claims-clean/summary.json` and per-claim logs.
- Accessibility: the Axe Playwright check found zero serious/critical issues across home, demo, privacy, terms, and 404 at desktop and 390 px. See `evidence/polish-3/axe-local.json` and `evidence/polish-3/site-live.json`.
- Browser/live: final live site suite passed 18 tests with 8 intentional duplicate skips. Cold `verify-url.sh` checks report no console/page errors, one h1, `lang=en`, main, alt text, and named buttons.
- Routing: home, demo, privacy, terms, 404 asset, and ZIP return 200; `/not-a-real-route` returns 404. See `evidence/polish-3/live-http.json`.
- Performance: live mobile Lighthouse is 100 performance, 100 accessibility, 100 best practices, and 100 SEO; FCP 0.9 s, LCP 0.9 s, TBT 20 ms, CLS 0. See `evidence/polish-3/lighthouse-live.json`.
- Artifact: the local and live extension ZIP share SHA-256 `e788eabd542a9b6069036e6c9aa11ab38fd7485d3ff1bc76c3e35d8be19dcdd3`. See `evidence/polish-3/artifact-hashes.txt`.
- Deployment: Azure Static Web Apps deployment `5bf80b00-d00e-4cd5-82b6-85e3bb7b52fe` succeeded; the custom domain reported Ready and HTTPS 200.

No finding from any review remains open.

## Infrastructure retry verification

The repair was reverified from a fresh clone at `b8f57c38ce1f5e68a0b15ca69d82d906622eb587` after the controller reported a prior Chromium context SIGSEGV. Playwright 1.58.2 and Chrome for Testing 145 completed the full suite twice without a browser crash. No further product change was required.

- `npm ci` passed with zero vulnerabilities.
- `npm test` passed 5 Vitest tests and 29 Playwright tests; 15 project duplicates were intentionally skipped. Evidence: `evidence/polish-3-infra-retry/npm-test-clean.log`.
- All 14 exact claim commands passed independently. Evidence: `evidence/polish-3-infra-retry/claims-clean/` and `summary.json`.
- Fresh live site coverage passed 18 tests with 8 intentional duplicate skips, including demo isolation/reset/offline, route metadata/focus, Axe, and 390 px geometry. Evidence: `evidence/polish-3-infra-retry/site-live.log`.
- Every route was opened cold in a separate verifier browser. Fresh desktop/mobile screenshots and console/accessibility summaries are under `evidence/polish-3-infra-retry/live-*`.
- Live Lighthouse scored 100 in performance, accessibility, best practices, and SEO; LCP was 1.0 s and CLS was 0. Evidence: `evidence/polish-3-infra-retry/lighthouse-live.json`.
- Local and live extension ZIPs are byte-identical at SHA-256 `c712c78f57ce3d12044a0eda873e1e8bd08647f026b1c69f0d96e5b9158ee0cc`.
- Azure Static Web Apps deployment `b965676f-300b-4b1d-b166-a7e9dd4ccd94` succeeded. The custom domain is Ready, all real routes return 200, and an unknown route returns the designed 404.

The fresh screenshots replace the same route names used in every finding row above: `live-home`, `live-demo`, `live-privacy`, `live-terms`, and `live-404`. Each finding remains closed on the deployed URL.
