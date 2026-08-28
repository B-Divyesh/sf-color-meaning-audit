# Polish round 7 — complete closure

**Release candidate:** `9a8f0204b8375e20adbf1d029cb1d0e8163d77a8`  
**Review commit:** `b619206a73f80a9903a79e7e95819d5560325bed`  
**Repair commit:** `fcf426117fb2f4c3abfde0b9499d7a065480fb3f`  
**Deployment:** `7dd8d170-c51d-49d3-a04a-004d2ff73440`  
**Live URL:** <https://color-meaning-audit.sociobot.in/>  
**Demo URL:** <https://color-meaning-audit.sociobot.in/demo/?demo=1>

This round rechecked every finding in `review-1.md` through `review-7.md` and
every carried-forward item in `polish-2.md` through `polish-6.md`. The only
new finding, F-7-1, is closed by removing the unsupported equivalence promise,
not by substituting a weaker untested claim. Evidence paths are relative to
`.factory/`.

| Finding ID | Change made | Evidence: test · screenshot · live check |
| --- | --- | --- |
| R1-FIRST-SCREEN | Kept the job-led h1, 19-word audience sentence, result-naming sample action, and price/privacy/offline facts. | `primary demo wording names its result and the query entry opens the isolated route` · `evidence/polish-7/live-home/screenshot-mobile.png` · cold live `/`. |
| R1-DEMO-SANDBOX | Kept the direct isolated demo, realistic Northstar data, `demo:` namespace, sticky boundary, Reset, and real-install exit. | `@claim:demo-warning`, `@claim:demo-isolation`, `@claim:demo-reset`, `@claim:demo-exit` · `evidence/polish-7/live-demo/screenshot-mobile.png` · live `/demo/?demo=1`. |
| R1-CLAIMS-CONTRACT | Kept 14 observable registry entries with exactly one tagged test each; each exact command ran in a new clone. | `maps every claim to exactly one tagged browser test` · `evidence/polish-7/local-demo/screenshot-desktop.png` · live claims in the route suite. |
| R1-ROUTING-404-FOCUS | Kept direct demo/install/legal routes, title and heading focus behavior, Back behavior, and the notebook-style 404. | `routes provide titles, metadata, focus, and an explicit not-found page` · `evidence/polish-7/live-404/screenshot-mobile.png` · live unknown URL returned HTTP 404. |
| R1-UNLISTED-CLAIMS | Kept visitor copy bounded to registered claims and removed both earlier artwork-origin wording and the round-seven equivalence wording. | public-claim guards · `evidence/polish-7/live-demo/screenshot-desktop.png` · live demo has no “same check notes” promise. |
| R1-METADATA-SKELETON | Kept route titles, descriptions, canonical/OG/Twitter metadata, icons, sitemap, legal links, attribution, and current build ID. | route metadata test · `evidence/polish-7/live-privacy/verify.json` · all six live route checks passed. |
| R1-TOUCH-TARGETS | Kept 44 px core targets and no-overflow mobile layout. | responsive-layout test · `evidence/polish-7/live-demo/screenshot-mobile.png` · live 390 px suite passed. |
| R1-TERMINOLOGY | Kept chart legend, check notes, sample data, demo, color-vision view, and extension ZIP as consistent terms. | `copy-audit.md` · `evidence/polish-7/live-home/screenshot-mobile.png` · cold live copy check. |
| R1-COPY-L03 | Kept the 19-word hero audience sentence. | primary-demo wording test · `evidence/polish-7/live-home/screenshot-mobile.png` · live `/`. |
| R1-COPY-R02 | Kept the README opening as two short plain-language sentences. | `copy-audit.md` · README source audit · current public source. |
| R1-COPY-R14 | Kept short install actions and real install continuation. | `@claim:demo-exit` · `evidence/polish-7/live-install/screenshot-mobile.png` · live `/install/?download=1`. |
| R1-COPY-R27 | Kept observable static-host wording rather than cache jargon. | `static host caching policy` · `evidence/polish-7/live-404/verify.json` · live unknown URL is 404. |
| R1-COPY-R28 | Kept “design sources” wording under 22 words. | `copy-audit.md` · README source audit · current public source. |
| R1-CTA | Kept the result-naming first action linked directly to the isolated sample. | primary-demo wording test · `evidence/polish-7/live-home/screenshot-desktop.png` · one live click reaches `/demo/?demo=1`. |
| R2-PRIVACY-CLAIM | Kept the packaged capture/analyze/inject flow under whole-operation HTTP(S) interception. | `@claim:extension-local-check` · packaged-extension suite · live ZIP downloaded successfully. |
| R2-DEMO-TOUCH | Kept Reset, Start for real, and both color-vision controls at least 44 px. | responsive-layout test · `evidence/polish-7/live-demo/screenshot-mobile.png` · live mobile suite passed. |
| R2-FIRST-ACTION | Kept the sample result beside a separate Chromium download action. | primary-demo wording test · `evidence/polish-7/live-home/screenshot-mobile.png` · live `/`. |
| R2-COLOR-VIEWS | Kept packaged Deutan, Protan, and Tritan results with saved selection. | `@claim:color-vision-views` · packaged-extension suite · live ZIP downloaded successfully. |
| R2-COPY-SECONDARY | Kept “Open the sample warning” for secondary sample links. | `copy-audit.md` · `evidence/polish-7/live-home/screenshot-desktop.png` · live `/`. |
| R2-COPY-BROWSER-KEY | Kept storage-key implementation language out of visitor copy; technical documentation alone names the namespace. | `@claim:demo-isolation`, `@claim:demo-reset` · `evidence/polish-7/live-demo/screenshot-mobile.png` · live demo passed. |
| R2-COPY-ADVISORY | Kept the direct second-check, not-a-verdict limitation. | palette-overlay accessibility test · `evidence/polish-7/live-home/screenshot-desktop.png` · live `/`. |
| F-3-1 | Kept explicit accessible-name matching only; unrelated service names never become status labels. | `@claim:demo-warning`, `@claim:extension-check-notes` · `evidence/polish-7/live-demo/screenshot-mobile.png` · live warning says no written label was found. |
| F-3-2 | Kept the required single 19-word audience-and-change sentence. | primary-demo wording test · `evidence/polish-7/live-home/screenshot-mobile.png` · live `/`. |
| F-3-3 | Expanded the current copy audit to include the changed demo text as well as landing, install, README, terminology, and catalog copy. | `copy-audit.md` · source audit · live demo and home screenshots. |
| F-4-1 | Kept reader-facing test instructions free of unexplained runner jargon. | `keeps reader-facing test instructions free of unexplained runner jargon` · README source audit · clean-clone suite passed. |
| F-5-1 | Kept the demo boundary sticky after scroll and the sheet offset below it. | `demo boundary and actions remain visible after scrolling the sample` · `evidence/polish-7/live-demo/screenshot-mobile.png` · live suite passed. |
| F-5-2 | Kept Start for real as a focused install route with a valid extension ZIP download. | `@claim:demo-exit` · `evidence/polish-7/live-install/screenshot-desktop.png` · live `/install/?download=1`. |
| F-5-3 | Kept bounded “An isolated sample check” language. | plain-project-copy test · `evidence/polish-7/live-home/screenshot-desktop.png` · live `/`. |
| F-5-4 | Kept the visible-page privacy fact on the first screen. | `@claim:extension-local-check` · `evidence/polish-7/live-home/screenshot-mobile.png` · live `/`. |
| F-5-5 | Kept the self-contained “Use a non-color cue” heading. | plain-project-copy test · `evidence/polish-7/live-home/screenshot-desktop.png` · live `/`. |
| F-5-6 | Kept “What this check can miss” instead of a self-congratulatory label. | plain-project-copy test · `evidence/polish-7/live-home/screenshot-desktop.png` · live `/`. |
| F-5-7 | Kept contributor-facing Chromium setup language clear. | reader-facing-jargon test · README source audit · clean-clone suite passed. |
| F-5-8 | Kept direct “only in this browser” storage wording. | round-five-copy test · README source audit · `@claim:extension-local-storage`. |
| F-5-9 | Kept direct no-server wording for check-note construction. | round-five-copy test · `@claim:extension-local-check` · packaged suite passed. |
| F-5-10 | Kept observable static-host/404 wording. | static-host test · `evidence/polish-7/live-404/verify.json` · unknown live URL is 404. |
| F-5-11 | Kept “design sources” wording. | round-five-copy test · README source audit · clean-clone suite passed. |
| F-6-1 | Preserved the committed lockfile and compatible Playwright override; the repair version is now 1.0.7. | reproducible-dependency test · clean clone `npm ci && npm test` passed · repair commit `fcf4261`. |
| F-6-2 | Kept artwork provenance in project records rather than public copy. | `does not make an untestable public claim about artwork origin` · `evidence/polish-7/live-home/screenshot-desktop.png` · live footer rechecked. |
| F-6-3 | Kept cached built demo shell and full emergency offline shell, including focus, navigation, legal links, metadata, and enabled Locate control. | `@claim:demo-offline` · `evidence/polish-7/local-demo/screenshot-desktop.png` · live offline demo claim passed. |
| F-7-1 | Replaced “Try the same check notes used by the extension” with “Read a sample warning.” This preserves the verifiable sample-warning and demo-isolation claims without making an unregistered equivalence promise. | `demo describes its own sample warning without an unregistered equivalence promise` and `does not promise that demo wording is identical to the extension` · `evidence/polish-7/live-demo/screenshot-desktop.png` · cold live `/demo/?demo=1` rechecked. |

## Clean-clone and claim evidence

A new clone at `/tmp/signal-check-polish-7.fM5Jp4/repo` checked out repair
commit `fcf426117fb2f4c3abfde0b9499d7a065480fb3f`. `npm ci` installed 263
packages with zero vulnerabilities. `npm test` passed typecheck, 12 unit
tests, production extension/site/ZIP builds, output verification, 33 browser
tests, and 15 intentional duplicate mobile claim skips.

Each exact command in `.factory/claims.json` then passed separately in that
clone: `free-download`, `no-account-screen`, `demo-warning`, `demo-isolation`,
`demo-reset`, `demo-exit`, `demo-first-party`, `demo-offline`,
`extension-check-notes`, `color-vision-views`, `extension-local-check`,
`extension-offline`, `extension-local-storage`, and `extension-clear`.

## Local and deployed evidence

- Local `verify-url.sh` reports and desktop/mobile screenshots for home, demo,
  install, privacy, terms, and 404 are in `evidence/polish-7/local-*`. All
  reported zero console/page errors, one h1, one main, `lang=en`, complete
  image alt text, and named controls.
- Cold deployed reports and screenshots are in `evidence/polish-7/live-*`.
  Home reports build `1.0.7`; `/not-a-real-route` returned HTTP 404.
- `PLAYWRIGHT_BASE_URL=https://color-meaning-audit.sociobot.in xvfb-run -a npx
  playwright test tests/e2e/site.spec.ts` passed 22 checks with 8 intentional
  duplicate mobile claim skips. It covers Axe serious/critical checks, routing,
  focus, demo isolation/reset/exit/offline, metadata, mobile geometry, and
  the F-7-1 regression test.
- `evidence/polish-7/lighthouse-local.json` scored 100 performance, 100
  accessibility, 100 best practices, and 100 SEO. FCP was 993 ms, LCP 1206
  ms, TBT 0 ms, CLS 0, and transfer 36,846 B.
- `evidence/polish-7/lighthouse-live.json` scored 100 in all four categories.
  FCP was 877 ms, LCP 1063 ms, TBT 32 ms, CLS 0, and transfer 35,482 B.

No finding of any severity remains open.
