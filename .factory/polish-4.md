# Polish round 4 — complete finding closure

**Release candidate:** `5df56ede1dddad8530a8d500dfc147496be75c0e`  
**Review commit:** `29f7963128ec4f62592afc3b19d2b3ffd6e6e1dc`  
**Repair commits:** `475037718fe5a6ddbe40568a704494dc3437aef1`, `5556cd6d65639667bacfcc8b02feedeee1fd2138`  
**Deployment:** `5ca499b9-18ec-4153-82ec-069a529d2c0c`  
**Live URL:** <https://color-meaning-audit.sociobot.in/>  
**Demo URL:** <https://color-meaning-audit.sociobot.in/demo/?demo=1>

Every finding in `review-1.md` through `review-4.md` is closed below. Round-one and round-two IDs follow `polish-2.md` so the history remains traceable.

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| R1-FIRST-SCREEN | Kept the six-word job headline, the single 19-word audience-and-change sentence, the outcome-specific demo action, and three plain facts. | `primary demo wording names its result and the query entry opens the isolated route`; [mobile home](evidence/polish-4/live-home/screenshot-mobile.png); live `/`. |
| R1-DEMO-SANDBOX | Kept the one-click `/demo/?demo=1` route, already-open real check notes, persistent banner, isolated `demo:` namespace, Reset, and Start for real. | `@claim:demo-warning`, `@claim:demo-isolation`, `@claim:demo-reset`, `@claim:demo-exit`; [mobile demo](evidence/polish-4/live-demo/screenshot-mobile.png); live demo URL. |
| R1-CLAIMS-CONTRACT | Rechecked `.factory/claims.json`: all 14 entries have exactly one matching tagged test, and every exact registry command passes independently. | [claim logs](evidence/polish-4/claims-clean/); `summary.json`; clean clone at `5556cd6`. |
| R1-ROUTING-404-FOCUS | Kept real home, demo, privacy, terms, and notebook-styled 404 documents with route titles, heading focus, announcements, reload, and Back behavior. | `routes provide titles, metadata, focus, and an explicit not-found page`; `real links, reload, and browser Back preserve route titles and heading focus`; [mobile 404](evidence/polish-4/live-404/screenshot-mobile.png); live unknown URL returned 404. |
| R1-UNLISTED-CLAIMS | Rechecked landing and README claims against all 14 registry entries; every observable promise remains covered. | `.factory/claims.json`; `.factory/copy-audit.md`; all logs under `evidence/polish-4/claims-clean/`; live `/` and `/demo/?demo=1`. |
| R1-METADATA-SKELETON | Preserved route-specific titles, descriptions, canonicals, OG/Twitter art, icons, sitemap, legal links, factory credit, and advanced the visible build to 1.0.4. | `routes provide titles, metadata, focus, and an explicit not-found page`; fresh `verify-url.sh` reports under `evidence/polish-4/live-*`; live `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html`. |
| R1-TOUCH-TARGETS | Preserved at least 44×44 CSS px for header/footer brands, legal links, demo controls, and view controls at desktop and 390 px. | `responsive layout has no horizontal overflow and keeps every core target at least 44px`; [mobile home](evidence/polish-4/live-home/screenshot-mobile.png); [mobile demo](evidence/polish-4/live-demo/screenshot-mobile.png). |
| R1-TERMINOLOGY | Kept one vocabulary: chart legend, color, color-vision view, check notes, sample data, and demo. | `.factory/copy-audit.md`; [live README](evidence/polish-4/live-readme/screenshot-desktop.png); live home and demo copy. |
| R1-COPY-L03 | Kept the long original hero statement replaced by the direct job headline and 19-word support sentence. | `primary demo wording names its result and the query entry opens the isolated route`; [desktop home](evidence/polish-4/live-home/screenshot-desktop.png); live `/`. |
| R1-COPY-R02 | Kept the README opening as two short user-facing sentences. | `plain project copy`; `.factory/copy-audit.md`; [live README](evidence/polish-4/live-readme/screenshot-desktop.png). |
| R1-COPY-R14 | Kept installation as short numbered actions with the actual toolbar action. | Packaged-extension tests in `npm test`; `.factory/copy-audit.md`; live ZIP returned 200. |
| R1-COPY-R27 | Kept deployment wording short and concrete; cache behavior stays in testable project configuration. | `static host caching policy`; `scripts/verify-site-output.mjs`; live response `Cache-Control: public, max-age=0, must-revalidate`. |
| R1-COPY-R28 | Kept scope, design, and verification links in one 12-word sentence. | `.factory/copy-audit.md`; [live README](evidence/polish-4/live-readme/screenshot-desktop.png). |
| R1-CTA | Kept “Try sample data — see a color-only warning” as the primary action and direct demo link. | `primary demo wording names its result and the query entry opens the isolated route`; [mobile home](evidence/polish-4/live-home/screenshot-mobile.png); live click reached `/demo/?demo=1`. |
| R2-PRIVACY-CLAIM | Kept the packaged MV3 capture, screenshot analysis, and injection test with HTTP(S) interception over the complete check. | `@claim:extension-local-check runs the packaged visible-page check without HTTP requests`; [claim log](evidence/polish-4/claims-clean/extension-local-check.log); live ZIP hash matches the tested package. |
| R2-DEMO-TOUCH | Kept Reset, Start for real, and both color-vision controls at least 44×44 px, with the overlay below the banner. | `responsive layout has no horizontal overflow and keeps every core target at least 44px`; [mobile demo](evidence/polish-4/live-demo/screenshot-mobile.png); live demo. |
| R2-FIRST-ACTION | Kept the first action’s visible sample outcome and separate install link. | `primary demo wording names its result and the query entry opens the isolated route`; [desktop home](evidence/polish-4/live-home/screenshot-desktop.png); live `/`. |
| R2-COLOR-VIEWS | Kept real packaged checks for Deutan and Protan red-green views plus the Tritan blue-sensitive view and saved selection. | `@claim:color-vision-views checks every selectable view through the packaged extension`; [claim log](evidence/polish-4/claims-clean/color-vision-views.log); deployed ZIP version 1.0.4. |
| R2-COPY-SECONDARY | Kept “Open the sample warning” for both secondary demo links. | `.factory/copy-audit.md`; [mobile home](evidence/polish-4/live-home/screenshot-mobile.png); live `/`. |
| R2-COPY-BROWSER-KEY | Kept implementation-key wording out of visitor copy while documenting the exact namespace in `.factory/demo.md`. | `@claim:demo-isolation`, `@claim:demo-reset`; [mobile demo](evidence/polish-4/live-demo/screenshot-mobile.png); live demo. |
| R2-COPY-ADVISORY | Kept direct “second check, not a verdict” wording in the landing and check notes. | `the palette overlay opens accessible check notes with alternate-cue guidance`; [desktop home](evidence/polish-4/live-home/screenshot-desktop.png); live `/`. |
| F-3-1 | Kept explicit accessible-name matching only; unrelated service names never become status labels. The sample says no written label was found. | `@claim:extension-check-notes`, `@claim:demo-warning`; [mobile demo](evidence/polish-4/live-demo/screenshot-mobile.png); live demo dialog. |
| F-3-2 | Kept the required audience and change in one 19-word first-screen sentence. | `primary demo wording names its result and the query entry opens the isolated route`; [mobile home](evidence/polish-4/live-home/screenshot-mobile.png); live `/`. |
| F-3-3 | Regenerated the complete round-4 README copy audit, including every prose and numbered-instruction sentence; code blocks remain explicitly excluded. | `.factory/copy-audit.md`; `plain project copy`; [live README](evidence/polish-4/live-readme/screenshot-desktop.png). |
| F-4-1 | Replaced the unexplained runner name with “On Linux, the test command opens a test browser and uses the extension button.” Added a regression that rejects the old term and checks the 14-word replacement. | `keeps reader-facing test instructions free of unexplained runner jargon`; `.factory/copy-audit.md`; [live README](evidence/polish-4/live-readme/screenshot-desktop.png); exact pushed README at `4750377`. |

## Claim evidence

All 14 exact commands in `.factory/claims.json` passed independently from the clean clone at `/tmp/signal-check-polish-4-final-fNjzGN/repo`, commit `5556cd6d65639667bacfcc8b02feedeee1fd2138`.

| Claim ID | Result | Evidence |
| --- | --- | --- |
| `free-download` | PASS | `claims-clean/free-download.log` |
| `no-account-screen` | PASS | `claims-clean/no-account-screen.log` |
| `demo-warning` | PASS | `claims-clean/demo-warning.log` |
| `demo-isolation` | PASS | `claims-clean/demo-isolation.log` |
| `demo-reset` | PASS | `claims-clean/demo-reset.log` |
| `demo-exit` | PASS | `claims-clean/demo-exit.log` |
| `demo-first-party` | PASS | `claims-clean/demo-first-party.log` |
| `demo-offline` | PASS | `claims-clean/demo-offline.log` |
| `extension-check-notes` | PASS | `claims-clean/extension-check-notes.log` |
| `color-vision-views` | PASS | `claims-clean/color-vision-views.log` |
| `extension-local-check` | PASS | `claims-clean/extension-local-check.log` |
| `extension-offline` | PASS | `claims-clean/extension-offline.log` |
| `extension-local-storage` | PASS | `claims-clean/extension-local-storage.log` |
| `extension-clear` | PASS | `claims-clean/extension-clear.log` |

## Final acceptance evidence

- `npm ci` in the fresh clone installed 263 packages and reported zero vulnerabilities.
- `npm test` in that clone passed TypeScript, 7 unit tests, the production extension/site/ZIP build, and 29 browser tests; 15 mobile duplicates of desktop-only claim checks were intentionally skipped. See `evidence/polish-4/npm-test-clean.log`.
- Live site coverage passed 18 tests with 8 intentional claim duplicates skipped. It covered demo storage/reset/offline, first-screen copy, route metadata/focus/Back, axe, overflow, and 44 px targets. See `evidence/polish-4/site-live.log`.
- Fresh `verify-url.sh` runs on home, demo, privacy, terms, and 404 found zero console errors, one h1, `lang=en`, one main landmark, complete image alt text, and named buttons. Reports and desktop/mobile captures are under `evidence/polish-4/live-*`.
- Live Lighthouse scored 100 performance, 100 accessibility, 100 best practices, and 100 SEO; FCP 0.9 s, LCP 1.1 s, TBT 0 ms, CLS 0, and transfer 34 KiB. See `evidence/polish-4/lighthouse-live.json`.
- `/`, `/demo/?demo=1`, `/privacy/`, `/terms/`, `/404.html`, and the ZIP return 200. `/not-a-real-route` returns the designed page with HTTP 404. All rendered site and GitHub destinations returned 200.
- The local and live extension ZIPs are byte-identical at SHA-256 `f97d63d22525f28f31758fcdc91a9fe30973c8e88f7fe760c1715c2a52399701`; its manifest is MV3 version 1.0.4 with only `activeTab`, `scripting`, and `storage` permissions and no host permissions.
- The complete emitted site JavaScript is 11.08 KB uncompressed, CSS is 14.07 KB, fonts are 0 KB, the mobile hero WebP is 24.81 KB, and the AVIF hero is 27.04 KB.

No finding of any severity remains open.
