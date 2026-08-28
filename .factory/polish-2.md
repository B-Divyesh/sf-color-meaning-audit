# Polish round 2 — finding closure

**Release candidate:** `10f7a9c243d7962a2b9173179ad7847ca9db6aa8`  
**Review base:** `5dfd93cc3fb000c1b51d9891974b31627bda0c9e`  
**Repair commit:** `2d33071`  
**Live URL:** <https://color-meaning-audit.sociobot.in/>  
**Demo URL:** <https://color-meaning-audit.sociobot.in/demo/?demo=1>

Every finding in `review-1.md` and `review-2.md` is closed below. IDs are assigned here so the acceptance record is unambiguous.

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| R1-FIRST-SCREEN | Replaced the abstract hero with the six-word job headline, named charts/status dashboards and people with color-vision differences, and separated sample from install. | `primary demo wording names its result and the query entry opens the isolated route`; [live mobile home](evidence/polish-2/live-home/screenshot-mobile.png); live `/` |
| R1-DEMO-SANDBOX | Added the real `/demo/?demo=1` sample with an already-open production check-note overlay, realistic Northstar statuses, a persistent demo banner, Reset, Start for real, and the isolated `demo:signal-check:sample-state` namespace. Root `/?demo=1` redirects into it. | `@claim:demo-warning`, `@claim:demo-isolation`, `@claim:demo-reset`, `@claim:demo-exit`; [live mobile demo](evidence/polish-2/live-demo/screenshot-mobile.png); live demo URL |
| R1-CLAIMS-CONTRACT | Added `.factory/claims.json`; all 13 claims have exactly one matching `@claim:<id>` test and an exact clean-state command. | Every registry command passed independently in `/tmp/signal-check-clean-8QhVQe`; `npm test` passed in the same clean clone. |
| R1-ROUTING-404-FOCUS | Added real `/demo/`, `/privacy/`, `/terms/`, and designed `/404.html` routes. Unknown paths return HTTP 404. Route scripts focus the page `h1`, announce navigation, and restore correct focus/title through reload and Back. | `routes provide titles, metadata, focus, and an explicit not-found page`; `real links, reload, and browser Back preserve route titles and heading focus`; live `/no-such-route` = 404. |
| R1-UNLISTED-CLAIMS | Audited landing and README statements, narrowed the offline sentence to the tested warning behavior, registered all observable promises, and removed or narrowed unsupported phrasing. | `.factory/claims.json`; `.factory/copy-audit.md`; all 13 claim commands passed. |
| R1-METADATA-SKELETON | Added route-specific titles/descriptions/canonicals, OG/Twitter cards, original 1200×630 social art, SVG favicon, Apple touch icon, sitemap entries, consistent legal links, factory attribution, and build `1.0.2`. | `routes provide titles, metadata, focus, and an explicit not-found page`; `verify-url.sh` live home/demo reports correct title, `lang=en`, one `h1`, `main`, and no errors. |
| R1-TOUCH-TARGETS | Made header/footer brands and legal links real 44 px targets at desktop and 390 px. | `responsive layout has no horizontal overflow and keeps every core target at least 44px` runs in both projects. |
| R1-TERMINOLOGY | Standardized on chart legends, color, color-vision view, check notes, and page/chart markers; removed framework jargon from the README opening. | `.factory/copy-audit.md` terminology table; no copy flags remain. |
| R1-COPY-L03 | Split the long compound hero into direct job/audience sentences within the 22-word limit. | `.factory/copy-audit.md`; [live mobile home](evidence/polish-2/live-home/screenshot-mobile.png). |
| R1-COPY-R02 | Rewrote the README opening in user language and split behavior from limitations. | `.factory/copy-audit.md`; README first section. |
| R1-COPY-R14 | Split extension use into short steps and retained the toolbar action plus keyboard shortcut. | README “Install locally”; clean packaged-extension shortcut tests. |
| R1-COPY-R27 | Replaced cache jargon with short, plain deployment wording. | `.factory/copy-audit.md`; README deployment section. |
| R1-COPY-R28 | Split scope, design, and verification references into readable project-record sentences. | `.factory/copy-audit.md`; README project records. |
| R1-CTA | Replaced the scrolling mock CTA with “Try sample data — see a color-only warning” linking to the real demo. | `primary demo wording names its result and the query entry opens the isolated route`; live `/`. |
| R2-PRIVACY-CLAIM | Replaced the component-only claim test with a packed MV3 integration flow. It opens the real toolbar popup through `Alt+Shift+S`, runs `chrome.tabs.query`, `captureVisibleTab`, screenshot analysis, and `chrome.scripting.executeScript`, then verifies the overlay and zero HTTP(S) requests. The component renderer test remains separate and unclaimed. | `@claim:extension-local-check runs the packaged visible-page check without HTTP requests`; exact claim command passed from the clean clone. |
| R2-DEMO-TOUCH | Raised Reset, Start for real, and both model-label hit areas to at least 44×44 px. Dynamically positions the overlay below the resized banner so controls never overlap. | `responsive layout has no horizontal overflow and keeps every core target at least 44px`; [live mobile demo](evidence/polish-2/live-demo/screenshot-mobile.png). |
| R2-FIRST-ACTION | Changed the primary action to “Try sample data — see a color-only warning.” | `primary demo wording names its result and the query entry opens the isolated route`; live `/`. |
| R2-COLOR-VIEWS | Registered the view capability and added a real packaged-extension test for Deutan and Protan red-green views plus the Tritan blue-sensitive view, including stored selection and named result. | `@claim:color-vision-views checks every selectable view through the packaged extension`; exact claim command passed from the clean clone. |
| R2-COPY-SECONDARY | Replaced “sample audit” secondary actions with “Open the sample warning.” | `.factory/copy-audit.md`; live `/`. |
| R2-COPY-BROWSER-KEY | Replaced the visitor-facing “browser key” sentence with “The demo saves only its own temporary sample.” | `.factory/copy-audit.md`; live privacy section. |
| R2-COPY-ADVISORY | Replaced the abstract advisory sentence with “Use Signal Check as a second check, not a verdict.” | `.factory/copy-audit.md`; live limits section. |

## Acceptance evidence

- Clean clone: `/tmp/signal-check-clean-8QhVQe` from `2d33071`; `npm ci` reported zero vulnerabilities.
- Full suite: `npm test` passed with 2 Vitest files / 5 tests, production extension/site/ZIP builds, and Playwright 26 passed / 14 intentional project skips.
- Claims: all 13 exact `.factory/claims.json` commands passed independently from the clean clone.
- Accessibility: Axe found zero violations on live `/`, `/demo/?demo=1`, `/privacy/`, `/terms/`, and `/404.html`; report at `evidence/polish-2/axe-live.json`.
- Browser smoke: `verify-url.sh` reported HTTP 200, zero console/page errors, `lang=en`, one `h1`, `main`, and complete image/button names on cold live home and demo loads.
- Performance: live mobile Lighthouse scored 100 performance, 100 accessibility, 100 best practices, and 100 SEO; FCP 0.9 s, LCP 1.1 s, TBT 70 ms, CLS 0. Report at `evidence/polish-2/lighthouse-live.json`.
- Visual evidence: cold desktop/mobile captures are under `evidence/polish-2/live-home/` and `evidence/polish-2/live-demo/`.

No finding from either review remains open.
