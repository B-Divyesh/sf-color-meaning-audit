# Adversarial first-read review 1 — Signal Check

**Reviewed:** 2026-08-28
**Live URL:** `https://color-meaning-audit.sociobot.in/`
**Viewports:** fresh Chromium contexts at 390×844 and 1440×900
**Verdict: FAIL**

The product is visually distinct and the extension build/test suite completes, but a new visitor cannot try the real product in one click. The advertised sample is a landing-page illustration rather than an isolated product demo. There is also no claims registry or claim test suite, and unknown URLs silently return the home page instead of a designed 404. Any one of those is blocking under this review contract.

## First screen: cold read

Before scrolling, I understood **what it seems to do**: it checks charts, status dots, and repeated colours that may be difficult to distinguish, then suggests another cue. I could identify a likely first action, **“Download for Chromium,”** although **“Try the sample first”** competes with it and does not say what will happen.

I could **not identify who it is for**. The mobile first screen says:

> “Signal Check finds chart keys, status dots, and repeated page colors that may become hard to tell apart—then tells you which label, shape, pattern, or position to seek.”

It never names people with colour-vision deficiency, nor the work situation described in the brief (interpreting a chart, status dashboard, or UI before acting). This is a **BLOCKING** first-read failure. A visitor who merely has a low-quality display, a design problem, or a colour-blind colleague cannot tell whether this is for them.

**Concrete fix:** replace the hero lede with two plain sentences: “Check charts and status dashboards for meaning carried only by color. For people with color-vision differences who need to act on a page.” Put **“Try it with sample data — see a colour-only status warning”** beside the real install action.

The visual treatment itself is product-specific: the warm lab-notebook palette, ruled evidence marks, and original notebook image do not read as a generic SaaS template. This is a pass, not a remedy for the clarity failure.

## Findings, in severity order

### BLOCKING — There is no one-click product demo or isolated demo sandbox

**Quote:** “Try the sample first →”

**Observed:** In a fresh context, the link only changes the URL to `/#try` and scrolls to an illustrative status board. The only controls are **Original** and **Deutan comparison**. Selecting Deutan changes the board class and the note to “The two status colors now nearly merge”; it does not run the extension on sample data.

`/?demo=1` and `/demo` both return the ordinary home page. Neither shows “Demo — sample data, nothing is saved,” “Reset demo,” or “Start for real.” No `.factory/demo.md` exists. There is no separated `demo:` storage namespace to inspect, no reset operation, and no way to establish that real browser-extension storage remains untouched.

**Why this loses or misleads a first-time visitor:** “Try the sample first” promises a trial path but delivers an explanatory mock-up. A visitor cannot see the actual overlay, results, reset behaviour, or privacy boundary before installing an extension.

**Concrete fix:** provide `/demo` (and `?demo=1`) that opens a working sample page with the actual audit result already visible. Persist the banner “Demo — sample data, nothing is saved” with **Reset demo** and **Start for real**. Keep demo state in a separate namespace, document it in `.factory/demo.md`, and add Playwright coverage that proves reset and non-interference with real storage.

### BLOCKING — Verifiable claims contract is absent

**Quote:** `.factory/claims.json` is missing.

**Observed:** A clean `npm ci` completed, and `npm test` passed (5 Vitest tests; 12 Playwright passed; 2 project skips). `rg '@claim:' tests` found no claim tags. Since the required registry does not exist, there were no listed claim commands to run from the clean checkout; therefore none of the visitor-facing promises has the required observable, tagged test.

**Why this loses or misleads a first-time visitor:** The landing page asks visitors to rely on privacy, local processing, inspection, and accessibility statements, but a verifier cannot tell which test proves any statement. The static-site network interception did show only same-origin requests and empty website storage, but that does not prove the extension's screenshot or storage claims.

**Concrete fix:** add `.factory/claims.json`, one `@claim:<id>` clean-state test per claim, and remove every claim that cannot be demonstrated. At minimum test the real demo's visible findings, local-only processing with network interception across the whole flow, stored fields, clear/reset, and offline operation after initial load.

### BLOCKING — Routing supplies neither a real demo route nor a designed 404

**Quote:** requesting `/demo` and `/not-a-real-route` returned the home title, “Signal Check — know when color is carrying the meaning.”

**Observed:** Both URLs returned HTTP 200 and the landing `<h1>`, rather than a demo route or a designed not-found page. The sitemap lists only `/`, `/privacy/`, and `/terms/`; no 404 asset/route exists. A legal-page navigation leaves focus on `<body>`; the new `<h1>` has no focus management or route announcement.

**Why this loses or misleads a first-time visitor:** A copied `/demo` link appears to work while silently showing unrelated content. A mistyped URL has no error or recovery message. Keyboard and screen-reader users receive no clear route-change destination.

**Concrete fix:** implement `/demo` as above and a styled 404 with a Home link. Make each route set its own title, move focus to the page `<h1>` after navigation (with an `aria-live` announcement where client routing is used), and test direct load, reload, Back, and focus for every route.

### P1 — Essential claims are unlisted

Because there is no claims registry, every statement below that a visitor could rely on is an **unlisted claim finding**. IDs refer to the copy audit below; each needs its own registry entry and tagged observable test, or removal/rewording as an unverified limitation. This list deliberately includes privacy and product-behaviour assertions, not headings or calls to action.

| Location | Unlisted claim IDs | Required evidence/fix |
| --- | --- | --- |
| Landing | L03–L07, L09–L10, L14–L16, L18–L24, L28 | Test a demo against realistic chart/status data; assert the actual alternate-cue result. Intercept all HTTP(S) throughout the audit, assert the screenshot lifecycle and stored keys, and exercise each stated limitation where feasible. Keep image provenance in project records rather than visitor-facing claim copy if it is not tested. |
| README | R01–R10, R16–R22, R24–R29 | Test package capabilities, keyboard/overlay behaviour, narrow layout, permissions/storage, no outbound requests, response/cache policy, and emitted artefacts from a clean build. Split compound claims into separately testable entries. |

### P2 — Metadata and site skeleton are incomplete

**Observed:** `/`, `/privacy/`, and `/terms/` have appropriate titles, descriptions, `lang`, one `<h1>`, a `<main>`, an SVG favicon, and reachable internal/external links (the link crawl returned HTTP 200 for all 13 unique targets). They do **not** have canonical links, Open Graph metadata/image, Twitter card metadata, or an Apple touch icon. The legal footers also omit the required “Built by Param Factory” and version/build identifier.

**Why this matters:** Shared links and saved routes have no canonical or product image, while the footer no longer reliably identifies the product/version across pages.

**Concrete fix:** add route-specific canonical, OG, and Twitter tags; ship a 1200×630 image made from the notebook art and a 180px Apple touch icon; add the factory attribution and build/version consistently in every footer.

### P2 — Some controls miss the required 44×44 px touch target

**Observed:** On the live 390 px view, the header home/brand target is **35×35 px**, the footer brand is **141.7×29 px**, and the footer **Terms** target is **41.0×44 px**. The same brand targets are only 35 px and 29 px high at desktop. Other measured primary actions are at least 44 px high.

**Why this matters:** Small brand and legal targets make basic navigation harder for visitors with limited dexterity or touch precision.

**Concrete fix:** give every `.brand` anchor and the Terms link a real minimum 44×44 px clickable box at each breakpoint, then add desktop and 390 px geometry assertions.

### P2 — Copy uses unexplained technical terms and inconsistent names

| Quote | Problem | Concrete rewrite |
| --- | --- | --- |
| “chart keys” / README “chart legends” | One concept has two names. | Use “chart legends” everywhere. |
| “hue alone” | “Hue” is jargon for a first-time visitor. | “color alone” |
| “selected comparison” / “Deutan comparison” | The term is not explained before use. | “the color-vision view you choose (such as red-green)” |
| “field notes” / “Signal note” | The result panel has two names. | Use “check notes” everywhere. |
| “DOM and SVG marks” | README uses implementation jargon rather than user language. | “page and chart markers” |
| “WXT + TypeScript Manifest V3” | README opening inventory is framework jargon. | “A Chromium browser extension with three color-vision views.” |

### P2 — Copy flags with direct rewrites

| ID | Quote | Flag | Proposed rewrite |
| --- | --- | --- | --- |
| L03 | “Signal Check finds chart keys, status dots, and repeated page colors that may become hard to tell apart—then tells you which label, shape, pattern, or position to seek.” | 29 words; compound claim; “keys” is inconsistent. | “Check chart legends, status marks, and repeated colors. It names another cue to use: a label, shape, pattern, or position.” |
| R02 | “It checks the visible page for chart legends, status marks, and repeated colors that may rely on hue alone, then opens an accessible overlay explaining which alternate cue—label, shape, pattern, value, or position—to seek before acting.” | 38 words; compound sentence; “hue” jargon. | “It checks the visible page for colors that may carry meaning alone. The overlay names another cue to use before acting.” |
| R14 | “Open a chart or status page and choose Signal Check from the toolbar, or press Alt+Shift+S (Control+Shift+S on macOS).” | 23 words. | “Open a chart or status page. Choose Signal Check from the toolbar, or press Alt+Shift+S.” |
| R27 | “HTML and download responses revalidate on each request; Vite-fingerprinted /assets/ files are served with a one-year immutable cache policy.” | Build/deployment jargon for a general README. | “The site checks HTML and downloads for updates. Its versioned asset files can stay cached for a year.” |
| R28 | “The researched product scope is in .factory/brief.json, the visual system and image provenance are in .factory/design.md, and build verification is in .factory/handoff.md.” | 28 words and three ideas. | “See `.factory/brief.json` for scope. See `design.md` for design and `handoff.md` for verification.” |
| CTA | “Try the sample first →” | Does not name a result and currently only scrolls. | “Try it with sample data — see the warning” |

## Copy audit

Word counts use words rather than punctuation tokens. Pure labels, navigation labels, product names, timestamps, and button-state labels are excluded from the sentence list; the CTA is audited separately above. `*` marks a >22-word sentence.

### Landing page

| ID | Words | Sentence |
| --- | ---: | --- |
| L01 | 5 | Color should be a clue. |
| L02 | 4 | Not the whole message. |
| L03 | 29* | Signal Check finds chart keys, status dots, and repeated page colors that may become hard to tell apart—then tells you which label, shape, pattern, or position to seek. |
| L04 | 9 | Pattern and shape preserve the message when hue cannot. |
| L05 | 8 | The colored dots look distinct to some readers. |
| L06 | 15 | But without a word or shape, the board asks color to do all the work. |
| L07 | 8 | Red and green statuses rely on hue alone. |
| L08 | 15 | Before acting, seek a written state such as “healthy” or “blocked,” or a second shape. |
| L09 | 16 | Samples the visible page palette and looks for important colors that converge in the selected comparison. |
| L10 | 17 | Inspects visible DOM and SVG marks, nearby labels, shape, size, and grouping to find likely meaning-bearing pairs. |
| L11 | 18 | Points back to the signal and names the fallback to seek: text, pattern, shape, written value, or position. |
| L12 | 3 | Open the page. |
| L13 | 13 | Keep the chart, status board, or UI you need to interpret in view. |
| L14 | 4 | Press Alt + Shift + S. |
| L15 | 9 | Choose a comparison and run the local visible-page check. |
| L16 | 4 | Verify the field notes. |
| L17 | 11 | Locate each signal and use the alternate cue before you act. |
| L18 | 6 | Your screenshots never leave the browser. |
| L19 | 10 | The visible tab image is sampled in memory and discarded. |
| L20 | 14 | Your selected comparison and last result count stay in extension storage on this device. |
| L21 | 10 | There is no analytics, account, cloud API, or page-history log. |
| L22 | 4 | Signal Check is advisory. |
| L23 | 17 | It can miss meaning inside canvas charts, images, video, tiny marks, or content outside the visible area. |
| L24 | 10 | It does not measure your vision or certify a page. |
| L25 | 12 | When a decision matters, confirm against labels, source data, or a colleague. |
| L26 | 4 | Give color a backup. |
| L27 | 10 | Built for careful decisions, one visible page at a time. |
| L28 | 11 | Hero artwork generated for this project with the factory image model. |

### README

| ID | Words | Sentence |
| --- | ---: | --- |
| R01 | 12 | Signal Check is a private, local-first Chromium extension for color-blind knowledge workers. |
| R02 | 38* | It checks the visible page for chart legends, status marks, and repeated colors that may rely on hue alone, then opens an accessible overlay explaining which alternate cue—label, shape, pattern, value, or position—to seek before acting. |
| R03 | 10 | It is advisory, not a medical test or accessibility certification. |
| R04 | 10 | The extension never uploads the visible-tab capture or page content. |
| R05 | 12 | A WXT + TypeScript Manifest V3 extension with deutan, protan, and tritan comparisons. |
| R06 | 9 | DOM/SVG signal inspection plus downsampled visible-screenshot palette analysis. |
| R07 | 18 | A keyboard and screen-reader accessible field-note overlay; Escape closes it and “Locate these signals” outlines the relevant marks. |
| R08 | 21 | On narrow screens, Locate collapses the notes behind a Return to Signal Check notes control so the highlighted source stays visible. |
| R09 | 10 | Local preferences and last-result count, with a one-click clear action. |
| R10 | 17 | A responsive static landing site, interactive sample, privacy policy, terms, optimized original artwork, and downloadable extension ZIP. |
| R11 | 4 | Run `npm run build`. |
| R12 | 6 | Open `chrome://extensions` or `edge://extensions`. |
| R13 | 11 | Enable Developer mode, choose Load unpacked, and select `dist/extension/chrome-mv3`. |
| R14 | 23* | Open a chart or status page and choose Signal Check from the toolbar, or press Alt+Shift+S (Control+Shift+S on macOS). |
| R15 | 8 | Choose a comparison and press Check this page. |
| R16 | 16 | Chromium blocks extensions on internal pages such as `chrome://`; Signal Check explains this in the popup. |
| R17 | 12 | Local `file://` pages require the browser’s Allow access to file URLs toggle. |
| R18 | 8 | The extension requests only `activeTab`, `scripting`, and `storage`. |
| R19 | 11 | A visible-tab JPEG is downsampled and analyzed in memory, then discarded. |
| R20 | 10 | Page contents are not sent over the network or stored. |
| R21 | 15 | Only the selected comparison plus the last result count/time remain in browser-local extension storage. |
| R22 | 12 | The website has no analytics, cookies, remote fonts, or third-party runtime scripts. |
| R23 | 4 | See privacy and terms. |
| R24 | 12 | Deploy `dist/site` as a static site at `https://color-meaning-audit.sociobot.in`. |
| R25 | 11 | The repository does not manage DNS, hosting, billing, or store submission. |
| R26 | 12 | The included `staticwebapp.config.json` sets security headers and static routing defaults. |
| R27 | 19 | HTML and download responses revalidate on each request; Vite-fingerprinted `/assets/` files are served with a one-year immutable cache policy. |
| R28 | 28* | The researched product scope is in `.factory/brief.json`, the visual system and image provenance are in `.factory/design.md`, and build verification is in `.factory/handoff.md`. |
| R29 | 5 | Licensed under the MIT License. |

## Verification record

- Fresh Chromium contexts at desktop and 390 px loaded without console errors. The static page made only same-origin requests and created no cookies, local storage, session storage, or service-worker registration. This is limited website evidence only, not proof of the extension privacy claim.
- `npm ci` completed from a checkout without dependencies; `npm test` passed: TypeScript, 5 Vitest tests, build/package verification, and 12 Playwright tests (2 intentional skips).
- No `.factory/claims.json`, `.factory/demo.md`, or `@claim:` test tag exists, so the required claim-test loop could not be run.
- Link crawl: all 13 unique rendered links from landing, Privacy, and Terms returned HTTP 200, including ZIP and the two GitHub destinations. This does not excuse the missing 404 route.
- Header/basic response checks pass: `lang=en`, a title, one `<h1>`, a `<main>`, meta description, SVG favicon, and no live console errors. Missing canonical/OG/Twitter/Apple-touch metadata and missing route focus handling are recorded above.
