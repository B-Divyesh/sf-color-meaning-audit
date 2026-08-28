# Adversarial first-read review 5 — Signal Check

**Reviewed:** 2026-08-28  
**Live URL:** <https://color-meaning-audit.sociobot.in/>  
**Review base:** `8bd8e0e52c61a1cb3304131b93230e1a12356fcb`  
**Clean clone:** `/tmp/signal-check-review-5-gmuq0D/repo`  
**Viewports:** fresh Chromium contexts at 390×844 and 1440×900  
**Verdict: FAIL**

The cold landing screen explains the job, audience, and first action. The sample also opens a truthful warning and keeps its storage isolated. The release still fails because the required demo boundary is not persistent: its banner and controls scroll completely out of view. “Start for real” also returns to the landing page instead of starting installation or a real check. Nine copy/claim issues remain after those blocking demo findings.

## Cold first read, before scrolling

In separate empty mobile and desktop contexts, I understood:

- **What it does:** checks charts and dashboards for signals whose meaning is carried only by color.
- **For whom:** people with color-vision differences who need to act on what a page shows.
- **What to click first:** **“Try sample data — see a color-only warning.”**

The exact first-screen text that supplied those answers was:

> “Check color-only signals before you act.”
>
> “For people with color-vision differences who need to act, check charts and dashboards for meaning carried only by color.”
>
> “Try sample data — see a color-only warning”

This part passes. The six-word headline, 19-word audience sentence, and result-naming primary action are visible without scrolling at 390 px and desktop. Neither view had horizontal overflow or console errors.

## Findings, ordered by severity

### F-5-1 / R1-DEMO-SANDBOX — BLOCKING: the required persistent demo banner scrolls away

**Exact quote/location:** live `/demo/?demo=1`, `.demo-banner`:

> “Demo — sample data, nothing is saved to your real checks.”  
> “Reset demo”  
> “Start for real”

**Evidence:** `.demo-banner` has no fixed or sticky positioning in `site/src/style.css`. After closing the check-note sheet and scrolling, its live bounding box was entirely above the viewport at both sizes: mobile `y=-152`, height `136`; desktop `y=-226`, height `60`. The existing responsive test measures the controls only at the top of the route and never scrolls.

**Why this fails:** the attached demo contract requires a persistent boundary notice. Once a visitor follows “Locate these signals” or scrolls through the sample, neither the “nothing is saved” notice nor Reset/Start controls remain visible. This is the previously reported `R1-DEMO-SANDBOX` requirement only half-fixed, so it is blocking again.

**Concrete fix:** make the banner sticky or fixed while demo mode is active, reserve its height, and continue offsetting the check-note sheet below it. Add a 390 px and desktop test that closes/minimizes the sheet, scrolls to the bottom, and asserts the banner, Reset, and Start controls still intersect the viewport.

### F-5-2 — BLOCKING: “Start for real” does not start real use

**Exact quote/location:** live demo banner, **“Start for real.”**

**Evidence:** activating it only removes `demo:signal-check:sample-state` and returns to `/`. The landing page’s primary action sends the visitor back into the demo; the real extension is not downloaded, opened, or explained. The registered `demo-exit` test asserts only the storage deletion and home URL, so it codifies the loop without verifying the button’s promised result.

**Why this fails:** the required exit action tells a first-time visitor that real use will begin. Returning to the page they just left is not that result and leaves the browser-extension installation step undisclosed.

**Concrete fix:** send **Start for real** to a short install route that downloads the ZIP and shows the Chromium developer-mode steps, while discarding demo state. If the intended action is only to exit, rename it **Leave demo** and provide a separate **Install Signal Check** action. Extend `@claim:demo-exit` to assert the real destination and visible next step.

### F-5-3 / R1-UNLISTED-CLAIMS — P1: “safe” is an unlisted, unbounded claim

**Exact quote/location:** landing privacy band eyebrow, **“A safe first check.”**

**Why this misleads:** “safe” can imply security, accuracy, or decision safety. The registry proves demo isolation and selected network behavior, not a general safety promise. This reopens the earlier unlisted-claims finding.

**Concrete fix:** replace it with **“An isolated sample check”** and keep the tested storage explanation below it, or add a narrowly worded claim and a test for the exact promised property.

### F-5-4 — P2: the first screen omits the required privacy fact

**Exact quote/location:** landing quick facts:

> “Free to download”  
> “No account screen”  
> “Sample warning reloads offline after its first visit”

**Why this matters:** the supplied first-screen shape calls for price, privacy, and offline facts. Price and offline behavior are present, but “No account screen” does not say whether the visible page or screenshot leaves the browser—the brief’s central privacy concern.

**Concrete fix:** replace **“No account screen”** with **“Visible-page checks stay in your browser”** and map it to `extension-local-check`, or add that fact as a fourth short line.

### F-5-5 — P2: “Another cue” is not a self-contained heading

**Exact quote/location:** landing “What the check notes show” list, `<h3>` **“Another cue.”**

**Why this loses context:** in a screen-reader heading list, it does not say another cue for what. Its meaning depends on the preceding card and paragraph.

**Concrete fix:** use **“Use a non-color cue”**.

### F-5-6 — P2: “Honest limits” is marketing copy, not an informative label

**Exact quote/location:** landing limits eyebrow, **“Honest limits.”**

**Why this matters:** “honest” asks the visitor to accept a self-assessment and adds no information. The following limitation text is useful without it.

**Concrete fix:** use **“Limits”** or **“What this check can miss.”**

### F-5-7 — P2: README test setup uses unexplained factory jargon

**Exact quote/location:** README, Run and test:

> “Chromium for Playwright is supplied by the factory image.”

**Why this loses a reader:** “factory image” is internal environment terminology, and the sentence does not tell a normal contributor whether they need to install a browser.

**Concrete fix:** use **“The factory test environment already includes Chromium.”** If other environments require setup, add the exact install command.

### F-5-8 — P2: README privacy wording uses storage jargon

**Exact quote/location:** README, Install the extension:

> “The extension stores the selected view and last result in browser-local extension storage.”

**Why this loses a reader:** “browser-local extension storage” is implementation language where the privacy result can be stated directly.

**Concrete fix:** use **“The extension saves the selected view and last result only in this browser.”**

### F-5-9 — P2: README network wording is technical rather than direct

**Exact quote/location:** README, Install the extension:

> “It does not request network resources while it builds check notes.”

**Why this loses a reader:** “request network resources” describes an implementation mechanism, not the privacy outcome.

**Concrete fix:** use **“It does not contact a server while it builds check notes.”** Keep the existing whole-flow interception test.

### F-5-10 — P2: README deployment wording uses unexplained “route fallback” jargon

**Exact quote/location:** README, Deploy:

> “`staticwebapp.config.json` supplies headers, route fallback, and the designed 404 response.”

**Why this loses a reader:** “route fallback” does not explain the behavior a deployer should expect.

**Concrete fix:** use **“The static host config adds security settings and sends unknown addresses to the designed 404 page.”**

### F-5-11 — P2: README uses “provenance” where “sources” is clearer

**Exact quote/location:** README, Deploy:

> “See `.factory/brief.json` for scope, `.factory/design.md` for design provenance, and `.factory/handoff.md` for verification.”

**Why this loses a reader:** “design provenance” is specialist language for the much simpler idea of design sources and origin.

**Concrete fix:** use **“See `.factory/brief.json` for scope, `.factory/design.md` for design sources, and `.factory/handoff.md` for verification.”**

## Copy audit

Counts treat a hyphenated term, URL, command, path, or version as one word. Navigation labels and the product name alone are not sentences. README code blocks are excluded; headings and numbered instructions are included. No item exceeds 22 words. No banned word appears. Core terms—**check notes**, **sample data**, **demo**, **chart legend**, and **color-vision view**—are otherwise consistent. Flags refer to findings above.

### Landing page

| ID | Words | Text | Flag |
| --- | ---: | --- | --- |
| L01 | 10 | A field check for the page in front of you | — |
| L02 | 6 | Check color-only signals before you act. | — |
| L03 | 19 | For people with color-vision differences who need to act, check charts and dashboards for meaning carried only by color. | — |
| L04 | 7 | Try sample data — see a color-only warning | — |
| L05 | 3 | Download for Chromium | — |
| L06 | 3 | Free to download | — |
| L07 | 3 | No account screen | First-screen facts omit explicit privacy; F-5-4. |
| L08 | 8 | Sample warning reloads offline after its first visit | — |
| L09 | 9 | A label or shape can carry the missing meaning. | — |
| L09a | 14 | Notebook chart with a red circle and green triangle checked under a magnifying lens | Image alt; — |
| L10 | 5 | What the check notes show | — |
| L11 | 6 | See the signal and another cue. | — |
| L12 | 3 | Color-only status marks | — |
| L13 | 10 | Find a repeated signal that needs more than its color. | — |
| L14 | 2 | Check notes | — |
| L15 | 11 | Read a plain warning beside the page you need to interpret. | — |
| L16 | 2 | Another cue | Heading lacks context; F-5-5. |
| L17 | 9 | Use a label, shape, pattern, written value, or position. | — |
| L18 | 3 | Three short steps | — |
| L19 | 4 | Check before you act. | — |
| L20 | 3 | Open the page. | — |
| L21 | 8 | Keep the chart or status dashboard in view. | — |
| L22 | 3 | Run Signal Check. | — |
| L23 | 9 | Choose a color-vision view and check the visible page. | — |
| L24 | 4 | Read the check notes. | — |
| L25 | 6 | Use another cue before you decide. | — |
| L26 | 4 | A safe first check | Unlisted broad claim; F-5-3. |
| L27 | 7 | Sample data stays separate from real checks. | — |
| L28 | 8 | The demo saves only its own temporary sample. | — |
| L29 | 6 | Resetting it removes that sample state. | — |
| L30 | 4 | Open the sample warning | — |
| L31 | 2 | Honest limits | Marketing adjective; F-5-6. |
| L32 | 6 | A second look, not a diagnosis. | — |
| L33 | 10 | Use Signal Check as a second check, not a verdict. | — |
| L34 | 10 | Confirm important decisions with labels, source data, or a colleague. | — |
| L35 | 5 | See it before you install | — |
| L36 | 4 | Give color a backup. | — |
| L37 | 4 | Open the sample warning | — |
| L38 | 5 | Chromium extension · version 1.0.4 · free | — |
| L39 | 7 | Checks color-only signals on the visible page. | — |
| L40 | 12 | Built by Param Factory · build 1.0.4 · hero artwork is original project artwork. | — |

### README

| ID | Words | Text | Flag |
| --- | ---: | --- | --- |
| R01 | 20 | Signal Check is a Chromium extension for people with color-vision differences who need to act on charts or status dashboards. | — |
| R02 | 12 | It opens check notes that name another cue to use before acting. | — |
| R03 | 6 | Try the isolated sample at `/demo/?demo=1`. | — |
| R04 | 7 | It opens a color-only status warning immediately. | — |
| R05 | 6 | The sample has no account screen. | — |
| R06 | 6 | It saves only temporary demo data. | — |
| R07 | 7 | Resetting the demo recreates only that sample. | — |
| RH1 | 2 | What ships | — |
| R08 | 14 | A Chromium extension with Deutan and Protan red-green views, plus a Tritan blue-sensitive view. | — |
| R09 | 11 | Check notes that say when a written status label is missing. | — |
| R10 | 13 | A static site with a sample warning, privacy policy, terms, and extension download. | — |
| R11 | 9 | The sample warning reloads offline after its first visit. | — |
| RH2 | 3 | Run and test | — |
| R12 | 7 | Node.js 22+ and npm 10+ are required. | — |
| R13 | 9 | Chromium for Playwright is supplied by the factory image. | Unexplained factory jargon; F-5-7. |
| R14 | 14 | On Linux, the test command opens a test browser and uses the extension button. | — |
| R15 | 11 | This grants the same temporary page access as a user click. | — |
| R16 | 8 | `npm run build` creates `dist/extension/chrome-mv3/`, `dist/site/`, and `dist/site/downloads/signal-check-chrome.zip`. | — |
| RH3 | 3 | Install the extension | — |
| R17 | 4 | Run `npm run build`. | — |
| R18 | 4 | Open `chrome://extensions` or `edge://extensions`. | — |
| R19 | 3 | Enable Developer mode. | — |
| R20 | 6 | Choose Load unpacked and select `dist/extension/chrome-mv3`. | — |
| R21 | 6 | Open a chart or status dashboard. | — |
| R22 | 11 | Choose Signal Check from the toolbar, then choose Check this page. | — |
| R23 | 13 | The extension stores the selected view and last result in browser-local extension storage. | Storage jargon; F-5-8. |
| R24 | 11 | It does not request network resources while it builds check notes. | Network jargon; F-5-9. |
| R25 | 6 | See the privacy policy and terms. | — |
| RH4 | 3 | Claims and demo | — |
| R26 | 6 | Every visitor-facing claim appears in `.factory/claims.json`. | Reopened by F-5-3. |
| R27 | 8 | Run each listed command from a clean checkout. | — |
| R28 | 11 | The sample storage boundary and reset path are documented in `.factory/demo.md`. | — |
| RH5 | 1 | Deploy | — |
| R29 | 8 | Deploy `dist/site` as the static site for `https://color-meaning-audit.sociobot.in`. | — |
| R30 | 5 | The work order performs deployment. | — |
| R31 | 10 | `staticwebapp.config.json` supplies headers, route fallback, and the designed 404 response. | Deployment jargon; F-5-10. |
| R32 | 12 | See `.factory/brief.json` for scope, `.factory/design.md` for design provenance, and `.factory/handoff.md` for verification. | “Provenance” jargon; F-5-11. |
| R33 | 5 | Licensed under the MIT License. | — |

## Demo and sandbox verification

- One landing click opened `/demo/?demo=1` with the Northstar release dashboard and the real check-note sheet already visible.
- The warning correctly said, **“No nearby text label was found. Look for a shape, line pattern, position, or written value before acting.”** It did not reuse service names as status labels.
- Fresh storage contained only `demo:signal-check:sample-state`. Reset recreated that key while preserving a non-demo sentinel. Start for real removed the demo key and preserved the sentinel.
- Request interception over demo load/reset observed only the product origin. After service-worker control, an offline reload retained the banner, dashboard, and warning.
- Reset and isolation therefore work. F-5-1 and F-5-2 still make the demo boundary incomplete.

## Claims verification

The clean clone began without `node_modules` or `dist`. `npm ci` installed 263 packages with zero reported vulnerabilities. Every exact command in `.factory/claims.json` was then run independently; all 14 exited zero. Each claim ID occurs exactly once in the test suite.

| Claim | Result | Evidence checked |
| --- | --- | --- |
| `free-download` | PASS | Landing-linked response is a valid ZIP. |
| `no-account-screen` | PASS | Demo opens without a sign-in form. |
| `demo-warning` | PASS | Real sheet opens with truthful no-label guidance. |
| `demo-isolation` | PASS | Only the `demo:` key exists in a fresh context. |
| `demo-reset` | PASS | Reset recreates demo state and preserves the real sentinel. |
| `demo-exit` | PASS as written | Demo state is removed; test does not cover F-5-2’s promised destination. |
| `demo-first-party` | PASS | Only same-origin HTTP(S) requests observed. |
| `demo-offline` | PASS | Warning and banner reload offline after the first visit. |
| `extension-check-notes` | PASS | Packaged extension distinguishes explicit labels from unrelated row text. |
| `color-vision-views` | PASS | Packaged Deutan, Protan, and Tritan flows produce named results and save selection. |
| `extension-local-check` | PASS | Real packaged capture/analyze/inject flow made zero HTTP(S) requests. |
| `extension-offline` | PASS | A packaged visible-page check completed offline. |
| `extension-local-storage` | PASS | Selected view and last result remained in `chrome.storage.local`. |
| `extension-clear` | PASS | Clear removed the last result. |

The only unlisted claim found in the audited landing/README copy is F-5-3. No registry command was left unrun; F-5-2 is an uncovered action promise rather than a failing registered test.

## Earlier-finding verification

Every earlier review, polish record, and the prior handoff was reread. Each row below was checked against both the live build and current source.

| Earlier ID | Round-5 result |
| --- | --- |
| `R1-FIRST-SCREEN` | Fixed: job, audience, result-naming demo action, and separate download are visible at both widths. |
| `R1-DEMO-SANDBOX` | **Reopened by F-5-1 and F-5-2:** storage mechanics work, but the banner is not persistent and the real-use exit loops home. |
| `R1-CLAIMS-CONTRACT` | Fixed: 14 registry entries, exactly one tag each, all exact commands pass. |
| `R1-ROUTING-404-FOCUS` | Fixed: direct routes, reload, Back, focus, announcements, and live HTTP 404 work. |
| `R1-UNLISTED-CLAIMS` | **Reopened by F-5-3:** “A safe first check” is not bounded or registered. |
| `R1-METADATA-SKELETON` | Fixed: route titles, descriptions, canonicals, OG/Twitter art, icons, sitemap, footer, and build ID are present. |
| `R1-TOUCH-TARGETS` | Fixed: tested core controls remain at least 44×44 px at desktop and 390 px. |
| `R1-TERMINOLOGY` | Fixed: core product terms remain consistent. |
| `R1-COPY-L03` | Fixed: the hero support sentence is 19 words. |
| `R1-COPY-R02` | Fixed: the README opening remains split and concrete. |
| `R1-COPY-R14` | Fixed: install actions remain short and ordered. |
| `R1-COPY-R27` | Fixed: the old cache-policy sentence is absent. |
| `R1-COPY-R28` | Fixed for length; F-5-11 separately records the remaining jargon. |
| `R1-CTA` | Fixed: the primary demo action names the warning it opens. |
| `R2-PRIVACY-CLAIM` | Fixed: the packaged complete operation is intercepted, not only the renderer. |
| `R2-DEMO-TOUCH` | Fixed: Reset, Start, and model choices meet the target size. |
| `R2-FIRST-ACTION` | Fixed: the landing primary action names its result. |
| `R2-COLOR-VIEWS` | Fixed: all three packaged views are exercised. |
| `R2-COPY-SECONDARY` | Fixed: secondary sample links say “Open the sample warning.” |
| `R2-COPY-BROWSER-KEY` | Fixed: no visitor-facing “browser key” remains. |
| `R2-COPY-ADVISORY` | Fixed: direct second-check wording remains. |
| `F-3-1` | Fixed: unrelated service names are not treated as status labels. |
| `F-3-2` | Fixed: one 19-word audience-and-change sentence remains. |
| `F-3-3` | Fixed: the current copy audit covers the README; this review repeats it independently. |
| `F-4-1` | Fixed as quoted: “Xvfb” is gone. F-5-7 records different unexplained wording that remains beside it. |

## Structure, accessibility, and visual identity

- Live `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html` have route-appropriate titles, one h1, one main, `lang=en`, descriptions, canonicals, OG/Twitter images, and icons.
- `/not-a-real-route` returns the designed notebook-style page with HTTP 404. All rendered internal and GitHub links returned 200; `robots.txt`, `sitemap.xml`, and the extension ZIP returned 200.
- Reload and Back preserve route title and heading focus. The demo focuses its already-open check-note dialog. All route pages have consistent wordmark, legal links, factory credit, and build ID.
- Axe reported zero violations—not only zero serious/critical findings—on all five public routes at 390 px. Fresh verifier runs found no console/page errors or missing alt text.
- `npm test` passed 7 unit tests and 29 browser tests, with 15 intentional duplicate mobile claim checks skipped. `npm run build` produced `dist/extension`, `dist/site`, and the ZIP. Complete emitted site JS is about 11 KB uncompressed.
- The live and rebuilt ZIP archives have identical file names and per-file SHA-256 hashes; their outer ZIP hashes differ only because archive timestamps differ.
- The warm paper, graphite rules, violet controls, lens mark, and original notebook artwork remain a distinct product-specific visual system rather than a generic SaaS template.

F-5-1 is the sole structural failure in this section.

## Missed leverage

No AI, import/export, or synchronization feature is an obvious requirement for this local visible-page check. An AI step would add privacy and key-management cost without improving the brief’s immediate task. No decorative AI feature, provider key, or third-party model call is present.

## What would make this perfect

1. Keep the demo boundary and its controls visible throughout the sample.
2. Make **Start for real** lead to a real installation/onboarding result and test that destination.
3. Replace the unbounded “safe” claim, add the missing first-screen privacy fact, and apply the exact plain-word rewrites in F-5-5 through F-5-11.
4. Re-run all 14 claim commands, the live mobile/desktop suite, link crawl, and the complete copy audit. A subsequent review can pass only if it finds zero remaining issues.
