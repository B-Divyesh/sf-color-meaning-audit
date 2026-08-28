# Polish round 5 — complete finding closure

**Release candidate:** `8bd8e0e52c61a1cb3304131b93230e1a12356fcb`  
**Review commit:** `d29e01dae5e9c5f7ecdb0dd6312b7d4e4599426f`  
**Repair commits:** `165281482467f9c48778a3738008bd98b52a5292`, `18e874186ceff85568d3ed8c854b4bbbae088346`, `54ff710746c80e1fb309cbf59b275f3bef23cf02`  
**Deployment:** `99f10b16-5f35-4647-a680-3de4cf23e71a5`  
**Live URL:** <https://color-meaning-audit.sociobot.in/>  
**Demo URL:** <https://color-meaning-audit.sociobot.in/demo/?demo=1>

Every finding in `review-1.md` through `review-5.md` is closed below. Round-one and round-two IDs follow `polish-2.md` so the complete history stays traceable.

| Finding ID | Change made | Evidence: test · screenshot · live check |
| --- | --- | --- |
| R1-FIRST-SCREEN | Kept the six-word job headline and 19-word audience sentence. The three facts now cover price, browser privacy, and offline sample behavior. | `primary demo wording names its result and the query entry opens the isolated route` · [mobile home](evidence/polish-5/live-home/screenshot-mobile.png) · live `/`. |
| R1-DEMO-SANDBOX / F-5-1 | Made the demo boundary sticky at every scroll position, kept the check-note sheet below it, and retained the isolated `demo:` namespace with Reset and Start controls. The offline fallback contains the same realistic sample and boundary. | `demo boundary and actions remain visible after scrolling the sample`, `@claim:demo-isolation`, `@claim:demo-reset`, `@claim:demo-offline` · [desktop scrolled demo](evidence/polish-5/live-demo-scroll-desktop.png), [mobile scrolled demo](evidence/polish-5/live-demo-scroll-mobile.png) · live demo URL. |
| R1-CLAIMS-CONTRACT | Kept `.factory/claims.json` complete, updated the exit and privacy promises, and added a unit guard that requires exactly one matching tag for every claim. | `maps every claim to exactly one tagged browser test`; all 14 [clean-clone claim logs](evidence/polish-5/claims-final-clean/) · [live demo](evidence/polish-5/live-demo/screenshot-desktop.png) · live demo URL. |
| R1-ROUTING-404-FOCUS | Added the real `/install/` route to home, demo, legal, and designed 404 routes. Each has its own metadata and focused h1; reload and Back retain title and focus. | `routes provide titles, metadata, focus, and an explicit not-found page`, `real links, reload, and browser Back preserve route titles and heading focus` · [mobile 404](evidence/polish-5/live-404/screenshot-mobile.png) · live `/not-a-real-route` returned 404. |
| R1-UNLISTED-CLAIMS / F-5-3 | Replaced the broad “safe” statement with the bounded phrase “An isolated sample check” and reconciled every observable promise with the 14-entry registry. | `closes every round-five plain-language finding`, all exact claim commands · [desktop home](evidence/polish-5/live-home/screenshot-desktop.png) · live `/`. |
| R1-METADATA-SKELETON | Added install metadata and sitemap/service-worker entries while preserving route titles, descriptions, canonicals, OG/Twitter art, icons, legal links, attribution, and build 1.0.5. | `routes provide titles, metadata, focus, and an explicit not-found page`; all six `verify-url.sh` reports · [mobile install](evidence/polish-5/live-install/screenshot-mobile.png) · live `/install/`. |
| R1-TOUCH-TARGETS | Preserved 44×44 px targets and made the persistent demo controls fit without horizontal overflow at desktop and 390 px. | `responsive layout has no horizontal overflow and keeps every core target at least 44px` · [mobile scrolled demo](evidence/polish-5/live-demo-scroll-mobile.png) · live demo URL. |
| R1-TERMINOLOGY | Kept one vocabulary for chart legend, color-vision view, check notes, sample data, demo, and extension ZIP. | `.factory/copy-audit.md`; `closes every round-five plain-language finding` · [live README](evidence/polish-5/live-readme.png) · live home and demo copy. |
| R1-COPY-L03 | Kept the hero support statement as one direct 19-word audience-and-change sentence. | `primary demo wording names its result and the query entry opens the isolated route` · [mobile home](evidence/polish-5/live-home/screenshot-mobile.png) · live `/`. |
| R1-COPY-R02 | Kept the README opening in two short, concrete sentences. | `.factory/copy-audit.md`; `closes every round-five plain-language finding` · [live README](evidence/polish-5/live-readme.png) · pushed README on GitHub. |
| R1-COPY-R14 | Kept installation as short ordered actions and added the same actions to the real install page. | `@claim:demo-exit discards sample state and starts the real install` · [mobile install](evidence/polish-5/live-install/screenshot-mobile.png) · live `/install/`. |
| R1-COPY-R27 | Replaced implementation language with “The static host config adds security settings and sends unknown addresses to the designed 404 page.” | `closes every round-five plain-language finding`, `static host caching policy` · [live README](evidence/polish-5/live-readme.png) · live unknown URL returned 404. |
| R1-COPY-R28 | Replaced “design provenance” with “design sources” and kept the project-record sentence below 22 words. | `closes every round-five plain-language finding`; `.factory/copy-audit.md` · [live README](evidence/polish-5/live-readme.png) · pushed README on GitHub. |
| R1-CTA | Kept “Try sample data — see a color-only warning” as the first action, linked directly to the isolated sample. | `primary demo wording names its result and the query entry opens the isolated route` · [desktop home](evidence/polish-5/live-home/screenshot-desktop.png) · live click reaches `/demo/?demo=1`. |
| R2-PRIVACY-CLAIM | Kept the packaged MV3 capture, analysis, and injection check under whole-operation HTTP(S) interception. The matching first-screen fact is “Visible-page checks stay in your browser.” | `@claim:extension-local-check runs the packaged visible-page check without HTTP requests` · [mobile home](evidence/polish-5/live-home/screenshot-mobile.png) · live ZIP matches the tested ZIP. |
| R2-DEMO-TOUCH | Kept Reset, Start for real, and both view controls at least 44×44 px after the banner became sticky. | responsive-layout test and scrolled-boundary test in both Playwright projects · [mobile scrolled demo](evidence/polish-5/live-demo-scroll-mobile.png) · live demo URL. |
| R2-FIRST-ACTION | Kept the first action’s visible result and a separate direct download action. | primary-demo-wording test · [desktop home](evidence/polish-5/live-home/screenshot-desktop.png) · live `/`. |
| R2-COLOR-VIEWS | Kept packaged Deutan, Protan, and Tritan flows with named results and saved selection. | `@claim:color-vision-views checks every selectable view through the packaged extension` · [claim log](evidence/polish-5/claims-final-clean/color-vision-views.log) · live tested ZIP. |
| R2-COPY-SECONDARY | Kept “Open the sample warning” for both secondary demo links. | `.factory/copy-audit.md` · [desktop home](evidence/polish-5/live-home/screenshot-desktop.png) · live `/`. |
| R2-COPY-BROWSER-KEY | Kept implementation-key language out of visitor copy; the exact namespace remains only in demo documentation. | `@claim:demo-isolation`, `@claim:demo-reset` · [mobile demo](evidence/polish-5/live-demo/screenshot-mobile.png) · live demo URL. |
| R2-COPY-ADVISORY | Kept “Use Signal Check as a second check, not a verdict.” | `the palette overlay opens accessible check notes with alternate-cue guidance` · [desktop home](evidence/polish-5/live-home/screenshot-desktop.png) · live `/`. |
| F-3-1 | Kept explicit accessible-name matching only. Unlabelled marks say no written label was found; unrelated service names never become status cues. | `@claim:extension-check-notes`, `@claim:demo-warning` · [mobile demo](evidence/polish-5/live-demo/screenshot-mobile.png) · live demo dialog. |
| F-3-2 | Kept the required audience and changed outcome in one 19-word sentence. | primary-demo-wording test · [mobile home](evidence/polish-5/live-home/screenshot-mobile.png) · live `/`. |
| F-3-3 | Regenerated the complete landing, install, and README sentence audit with word counts and terminology. | `.factory/copy-audit.md`; `closes every round-five plain-language finding` · [live README](evidence/polish-5/live-readme.png) · pushed README on GitHub. |
| F-4-1 | Kept the reader-facing test explanation free of the old runner name and added a direct Chromium setup command for other environments. | `keeps reader-facing test instructions free of unexplained runner jargon` · [live README](evidence/polish-5/live-readme.png) · pushed README on GitHub. |
| F-5-2 | Start for real now discards only demo state, opens `/install/?download=1`, starts a valid ZIP download, focuses the install h1, and shows exact Chromium steps. | `@claim:demo-exit discards sample state and starts the real install` · [mobile install](evidence/polish-5/live-install/screenshot-mobile.png) · live `/install/?download=1`. |
| F-5-4 | Replaced “No account screen” in the first-screen facts with “Visible-page checks stay in your browser.” | `@claim:extension-local-check`, primary-demo-wording test · [mobile home](evidence/polish-5/live-home/screenshot-mobile.png) · live `/`. |
| F-5-5 | Replaced the contextless heading “Another cue” with “Use a non-color cue.” | `closes every round-five plain-language finding`; `.factory/copy-audit.md` · [desktop home](evidence/polish-5/live-home/screenshot-desktop.png) · live `/`. |
| F-5-6 | Replaced “Honest limits” with “What this check can miss.” | `closes every round-five plain-language finding`; `.factory/copy-audit.md` · [desktop home](evidence/polish-5/live-home/screenshot-desktop.png) · live `/`. |
| F-5-7 | Changed the setup note to “The factory test environment already includes Chromium” and added `npx playwright install chromium` for other environments. | reader-facing-jargon unit test · [live README](evidence/polish-5/live-readme.png) · pushed README on GitHub. |
| F-5-8 | Changed the storage sentence to “The extension saves the selected view and last result only in this browser.” | round-five-copy unit test · [live README](evidence/polish-5/live-readme.png) · pushed README on GitHub. |
| F-5-9 | Changed the network sentence to “It does not contact a server while it builds check notes.” | round-five-copy unit test and `@claim:extension-local-check` · [live README](evidence/polish-5/live-readme.png) · pushed README on GitHub. |
| F-5-10 | Replaced “route fallback” with the observable static-host and unknown-address behavior. | round-five-copy unit test and output verifier · [live README](evidence/polish-5/live-readme.png) · live unknown URL returned 404. |
| F-5-11 | Replaced “design provenance” with “design sources.” | round-five-copy unit test · [live README](evidence/polish-5/live-readme.png) · pushed README on GitHub. |

## Claim evidence

Every exact command from `.factory/claims.json` passed independently in a clean clone of deployed source commit `54ff710746c80e1fb309cbf59b275f3bef23cf02` at `/tmp/signal-check-polish-5-final-a01pRM/repo`. The complete logs and command summary are in `evidence/polish-5/claims-final-clean/`.

| Claim ID | Result | Observable outcome |
| --- | --- | --- |
| `free-download` | PASS | Landing link downloaded a valid extension ZIP. |
| `no-account-screen` | PASS | Sample opened without sign-in or form fields. |
| `demo-warning` | PASS | Real sheet opened with truthful no-label guidance. |
| `demo-isolation` | PASS | Fresh demo wrote only its `demo:` key. |
| `demo-reset` | PASS | Reset recreated demo state and preserved real state. |
| `demo-exit` | PASS | Exit removed demo state, opened install, and downloaded a valid ZIP. |
| `demo-first-party` | PASS | Demo/reset requested only this origin. |
| `demo-offline` | PASS | Banner, sample, and warning reloaded offline. |
| `extension-check-notes` | PASS | Only explicit labels became text cues. |
| `color-vision-views` | PASS | All three packaged views returned named results. |
| `extension-local-check` | PASS | Complete packaged check made zero HTTP(S) requests. |
| `extension-offline` | PASS | Packaged visible-page check completed offline. |
| `extension-local-storage` | PASS | View and last result stayed in extension-local storage. |
| `extension-clear` | PASS | Clear removed the stored result. |

## Final acceptance evidence

- Clean clone: `npm ci` installed 263 packages with zero vulnerabilities. `npm test` passed TypeScript, 9 unit tests, both production builds, package/output checks, and 31 browser tests; 15 intentional duplicate mobile claim runs were skipped. See `evidence/polish-5/npm-test-final-clean.log`.
- Live suite: 20 browser checks passed with 8 intentional duplicate claim runs skipped. It covered all site claims, offline behavior, metadata, focus, Back, Axe, sticky demo controls, overflow, and target sizes. See `evidence/polish-5/site-live.log`.
- Accessibility: Playwright Axe found no serious or critical issue on home, demo, install, privacy, terms, or 404. Fresh `verify-url.sh` reports found `lang=en`, one h1, one main, alt text, named buttons, and zero console/page errors under `evidence/polish-5/live-*`.
- Performance: cold live Lighthouse scored 100 performance, 100 accessibility, 100 best practices, and 100 SEO. FCP was 1.0 s, LCP 1.1 s, TBT 0 ms, CLS 0, and transfer 35 KiB. See `evidence/polish-5/lighthouse-live.json`.
- Routing and links: all rendered internal, asset, download, source, and issue links returned 200; the unknown route returned HTTP 404. See `evidence/polish-5/live-link-crawl.json`.
- Artifact: local and live extension ZIPs are byte-identical at SHA-256 `6637e919282bbae8e1d656d62eeef81d69c2440da8a4f8c888b046ab6ea1cb02`. See `evidence/polish-5/artifact-live-sha256.txt`.
- Budgets: emitted site JavaScript including the self-contained service worker is 18,388 bytes, CSS is 15,467 bytes, fonts are 0 bytes, mobile hero WebP is 24,818 bytes, and AVIF is 27,044 bytes.
- Deployment: static deployment `99f10b16-5f35-4647-a680-3de4cf23e71a5` reached Ready. Cold desktop/mobile checks and screenshots were taken from the custom domain after that deployment.

No finding of any severity remains open.
