# Polish round 6 — complete closure

**Base candidate:** `7da01b3dd7a6a853d96b8eaf46cfac8cca3550b9`  
**Repair commit:** `672e0aa6b6b996a492c52ed8da72f087fc90b0d6`  
**Live URL:** <https://color-meaning-audit.sociobot.in/>  
**Demo URL:** <https://color-meaning-audit.sociobot.in/demo/?demo=1>

This record closes every finding in `review-1.md` through `review-6.md` and
every item carried forward in `polish-2.md` through `polish-5.md`. Evidence
paths below are relative to `.factory/`.

| Finding ID | Change made | Evidence: test · screenshot · live check |
| --- | --- | --- |
| R1-FIRST-SCREEN | Kept the six-word job headline, one 19-word audience-and-change sentence, result-naming demo action, and price/privacy/offline facts. | `primary demo wording names its result and the query entry opens the isolated route` · `evidence/polish-6/live-home/screenshot-mobile.png` · live `/` passed cold verification. |
| R1-DEMO-SANDBOX | Kept direct `/demo/?demo=1`, realistic Northstar status data, the isolated `demo:` key, sticky boundary, Reset, and installation exit. | `@claim:demo-warning`, `@claim:demo-isolation`, `@claim:demo-reset`, `@claim:demo-exit` · `evidence/polish-6/live-demo/screenshot-mobile.png` · live demo passed. |
| R1-CLAIMS-CONTRACT | Kept 14 registered observable claims, exactly one tag each, and independently ran every exact registry command from a new clone. | `maps every claim to exactly one tagged browser test` and all claim commands · `evidence/polish-6/live-demo/screenshot-desktop.png` · live site claim suite passed. |
| R1-ROUTING-404-FOCUS | Kept direct demo/install/legal routes, titles, heading focus, route announcement, Back behavior, and notebook-style 404. | `routes provide titles, metadata, focus, and an explicit not-found page` · `evidence/polish-6/live-404/screenshot-mobile.png` · live unknown route returned HTTP 404. |
| R1-UNLISTED-CLAIMS | Removed the remaining unsupported artwork-origin footer statement; retained provenance only in `design.md`. | `does not make an untestable public claim about artwork origin` · `evidence/polish-6/live-home/screenshot-desktop.png` · live footer says only factory/build identity. |
| R1-METADATA-SKELETON | Kept route titles, descriptions, canonical/OG/Twitter tags, icons, sitemap, legal links, factory credit, and build identifier. | route metadata test · `evidence/polish-6/live-demo/verify.json` · all six live route checks passed. |
| R1-TOUCH-TARGETS | Kept 44 px core controls and mobile no-overflow layout. | `responsive layout has no horizontal overflow and keeps every core target at least 44px` · `evidence/polish-6/live-demo/screenshot-mobile.png` · live mobile suite passed. |
| R1-TERMINOLOGY | Kept chart legend, check notes, sample data, demo, color-vision view, and extension ZIP vocabulary consistent. | `copy-audit.md` · `evidence/polish-6/live-home/screenshot-mobile.png` · live copy rechecked. |
| R1-COPY-L03 | Kept the 19-word hero audience sentence. | primary-demo wording test · `evidence/polish-6/live-home/screenshot-mobile.png` · live `/`. |
| R1-COPY-R02 | Kept the README opening as two short plain-language sentences. | `copy-audit.md` · README source audit · live source commit. |
| R1-COPY-R14 | Kept short installation steps and real `/install/` continuation. | `@claim:demo-exit` · `evidence/polish-6/live-install/screenshot-mobile.png` · live `/install/?download=1`. |
| R1-COPY-R27 | Kept observable static-host wording rather than cache jargon. | `static host caching policy` · `evidence/polish-6/live-404/verify.json` · live unknown address is 404. |
| R1-COPY-R28 | Kept “design sources” wording and project-record sentence under 22 words. | `copy-audit.md` · README source audit · live source commit. |
| R1-CTA | Kept the result-naming primary action pointing directly at the sample warning. | primary-demo wording test · `evidence/polish-6/live-home/screenshot-desktop.png` · one live click reaches `/demo/?demo=1`. |
| R2-PRIVACY-CLAIM | Kept the packaged capture/analyze/inject flow under whole-operation HTTP(S) interception. | `@claim:extension-local-check` · packaged extension suite · live ZIP download passed. |
| R2-DEMO-TOUCH | Kept Reset, Start for real, and view labels at least 44 px. | responsive-layout test · `evidence/polish-6/live-demo/screenshot-mobile.png` · live mobile suite passed. |
| R2-FIRST-ACTION | Kept the sample result beside the first action and the separate Chromium download. | primary-demo wording test · `evidence/polish-6/live-home/screenshot-mobile.png` · live `/`. |
| R2-COLOR-VIEWS | Kept packaged Deutan, Protan, and Tritan results with stored selection. | `@claim:color-vision-views` · packaged extension suite · live ZIP download passed. |
| R2-COPY-SECONDARY | Kept “Open the sample warning” for secondary sample links. | `copy-audit.md` · `evidence/polish-6/live-home/screenshot-desktop.png` · live `/`. |
| R2-COPY-BROWSER-KEY | Kept implementation-key language out of visitor copy; the namespace stays in demo documentation. | `@claim:demo-isolation` and `@claim:demo-reset` · live demo screenshot · live demo passed. |
| R2-COPY-ADVISORY | Kept the direct second-check, not-a-verdict limitation. | overlay accessibility test · `evidence/polish-6/live-home/screenshot-desktop.png` · live `/`. |
| F-3-1 | Kept explicit accessible-name matching only; unrelated service names never become status labels. | `@claim:demo-warning`, `@claim:extension-check-notes` · `evidence/polish-6/live-demo/screenshot-mobile.png` · live warning says no written label was found. |
| F-3-2 | Kept the single 19-word first-screen audience statement. | primary-demo wording test · `evidence/polish-6/live-home/screenshot-mobile.png` · live `/`. |
| F-3-3 | Regenerated the complete round-six copy audit, including the changed build footer and catalog description. | `copy-audit.md` · README/source audit · live home copy check. |
| F-4-1 | Kept reader-facing test instructions free of unexplained runner jargon. | `keeps reader-facing test instructions free of unexplained runner jargon` · README source audit · clean-clone test passed. |
| F-5-1 | Kept the demo boundary sticky after scroll and the sheet offset beneath it. | `demo boundary and actions remain visible after scrolling the sample` · `evidence/polish-6/live-demo/screenshot-mobile.png` · live suite passed. |
| F-5-2 | Kept Start for real as a real install route with a ZIP download and focused install heading. | `@claim:demo-exit` · `evidence/polish-6/live-install/screenshot-desktop.png` · live `/install/?download=1`. |
| F-5-3 | Kept the bounded “An isolated sample check” wording. | plain-project-copy test · `evidence/polish-6/live-home/screenshot-desktop.png` · live `/`. |
| F-5-4 | Kept the visible-page privacy fact on the first screen. | `@claim:extension-local-check` · `evidence/polish-6/live-home/screenshot-mobile.png` · live `/`. |
| F-5-5 | Kept the self-contained “Use a non-color cue” heading. | plain-project-copy test · live home screenshot · live `/`. |
| F-5-6 | Kept “What this check can miss” rather than a self-congratulatory label. | plain-project-copy test · live home screenshot · live `/`. |
| F-5-7 | Kept the contributor-facing Chromium setup wording. | reader-facing-jargon test · README source audit · clean-clone test passed. |
| F-5-8 | Kept direct “only in this browser” storage wording. | round-five-copy test · README source audit · `@claim:extension-local-storage`. |
| F-5-9 | Kept direct no-server wording for check-note construction. | round-five-copy test · README source audit · `@claim:extension-local-check`. |
| F-5-10 | Kept observable static-host/404 wording. | static-host test · `evidence/polish-6/live-404/verify.json` · unknown live route is 404. |
| F-5-11 | Kept “design sources” wording. | round-five-copy test · README source audit · clean-clone test passed. |
| F-6-1 | Bumped the release to 1.0.6, committed `package-lock.json`, and pinned `playwright-core` to 1.58.2 with an npm override. | `reproducible test dependencies pins the Playwright type graph in the committed npm lockfile` · fresh clone `npm ci && npm test` passed · commit `672e0aa`. |
| F-6-2 | Removed the public artwork-origin statement; provenance remains project documentation, not visitor copy. | `does not make an untestable public claim about artwork origin` · `evidence/polish-6/live-home/screenshot-desktop.png` · live footer rechecked. |
| F-6-3 | The worker now serves cached built `/demo/` HTML and assets offline. The emergency fallback also has full metadata, header, skip link, footer/legal links, focus, and an enabled Locate action. Cache matching ignores only request variation, never the route boundary. | expanded `@claim:demo-offline` · `evidence/polish-6/live-demo/screenshot-desktop.png` · live offline demo claim passed. |

## Clean-clone and claim evidence

A new clone at `/tmp/signal-check-polish-6-24yrdP/repo` checked out
`672e0aa6b6b996a492c52ed8da72f087fc90b0d6` with no working-tree changes.
`npm ci` installed 263 packages with zero vulnerabilities and one compatible
`playwright-core@1.58.2`. `npm test` passed TypeScript, 11 unit tests, the
extension/site/ZIP build, and 31 browser tests; 15 duplicate mobile claim runs
were intentionally skipped. Every exact command from `claims.json` then passed
independently:

`free-download`, `no-account-screen`, `demo-warning`, `demo-isolation`,
`demo-reset`, `demo-exit`, `demo-first-party`, `demo-offline`,
`extension-check-notes`, `color-vision-views`, `extension-local-check`,
`extension-offline`, `extension-local-storage`, and `extension-clear`.

## Deployed evidence

- Static deployment completed from `dist/site` after the repair commit; the
  cold live home response reports build `1.0.6`.
- `verify-url.sh` found zero console/page errors, one h1, one main landmark,
  `lang=en`, named controls, and complete image alt text for home, demo,
  install, privacy, terms, and 404. Reports and desktop/mobile screenshots are
  in `evidence/polish-6/live-*`.
- `PLAYWRIGHT_BASE_URL=https://color-meaning-audit.sociobot.in xvfb-run -a npx
  playwright test tests/e2e/site.spec.ts` passed 20 live checks with 8
  intentional duplicate claim skips. This includes Axe, mobile geometry,
  route/focus behavior, demo privacy, and offline reload.
- The successful Lighthouse retry is
  `evidence/polish-6/lighthouse-live-retry.json`: 100 performance, 100
  accessibility, 100 best practices, 100 SEO; FCP/LCP 465 ms, TBT 0 ms,
  CLS 0, and 35,473 B transfer.

No review finding remains open.
