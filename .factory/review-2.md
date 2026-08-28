# Adversarial first-read review 2 — Signal Check

**Reviewed:** 2026-08-28  
**Live URL:** <https://color-meaning-audit.sociobot.in/>  
**Review checkout:** clean shallow clone of `main` at `99b8b78f66de4074baa1bdd7b2ef5f0a9bf380c7`  
**Verdict: FAIL**

The landing page is clear on a cold 390 px visit, and the demo is usable. The release nevertheless fails this review because the named test for the extension's no-network privacy promise does not exercise the extension's visible-page check. A passing component test is not evidence for that whole-flow promise.

## Cold first read

I opened the home page in separate new Chromium contexts at **390×844** and **1440×900**, without prior storage. Before scrolling, I understood:

- **What it does:** checks a visible chart or status dashboard for meaning carried only by color and points to another cue.
- **For whom:** people with color-vision differences who need to act on a page.
- **What to click first:** **Try it with sample data**.

The mobile first screen had no horizontal overflow, no storage, no cookies, and no console errors. The desktop screen showed the same job and primary action. This first-read check passes; it is not a blocking finding.

## Findings, ordered by severity

### BLOCKING — The privacy claim's test does not run the claimed extension flow

**Quote:** “Visible-page checking does not request network resources.”

**Evidence:** `.factory/claims.json` assigns that claim to `@claim:extension-local-check`. The test in `tests/e2e/overlay.spec.ts` calls `page.setContent()` and serializes only `scanAndShowOverlay()` into a normal page with an empty palette. It does not load the packaged extension, click **Check this page**, call `chrome.tabs.captureVisibleTab`, run `analyzeScreenshot`, or invoke `chrome.scripting.executeScript` through the extension. It therefore proves only that the overlay renderer makes no HTTP request in that artificial fixture.

**Why this is misleading:** A visitor relies on this as a privacy promise about the complete visible-page check, not only its final overlay. The named claim test can pass if a future change adds an outbound request to the popup or screenshot-analysis path.

**Concrete fix:** replace the test with a packaged-extension integration test. Load `dist/extension/chrome-mv3` in a fresh persistent Chromium profile, open a same-origin fixture page, attach request interception immediately before the actual toolbar/popup check, then click **Check this page** and wait for the real result. Assert that the operation produces no HTTP(S) request. Keep a separate component test for the overlay if useful, but do not use it as the privacy-claim test.

### P2 — Demo controls do not meet the 44 px touch-target requirement

**Quote:** “Reset demo” and “Start for real”.

**Evidence:** On the live 390 px demo page, both controls render at **38 px high** (`101×38` and `105×38`). The color-vision choice labels are also **32 px high**. The review contract requires 44 px touch targets.

**Why this loses a first-time visitor:** The two controls that define the demo boundary are harder to hit on the phone viewport the product explicitly supports. An accidental exit or missed reset weakens confidence in the sample/real-data separation.

**Concrete fix:** set the banner button/link and model-label hit areas to `min-height: 44px`, retain adequate horizontal padding, and add a 390 px geometry assertion for Reset, Start for real, and both model controls.

### P2 — The first action does not state the result it opens

**Quote:** “Try it with sample data”.

**Why this loses a first-time visitor:** The action is correctly prominent and it works, but the first screen does not say beside it what will happen. A visitor has to infer whether the click installs a browser extension, opens an explanation, or runs the sample. The sample does in fact open a color-only warning immediately.

**Concrete fix:** change the visible action to **“Try sample data — see a color-only warning”** (or add that exact outcome as adjacent text). Keep **Download for Chromium** as the clearly separate install action.

### P2 — A documented capability has no specific claim entry or all-model proof

**Quote:** README: “A Chromium extension with red-green and blue-yellow color-vision views.”

**Evidence:** No `.factory/claims.json` entry names this capability. The closest tests select Protan for storage and use Deutan in fixture/component paths; none verifies the advertised red-green and blue-yellow views through the shipped extension against representative sample signals.

**Why this is misleading:** A person selecting the extension for a blue-yellow difference cannot tell whether that stated view is an implemented, tested feature or just a label.

**Concrete fix:** add a `color-vision-views` claim entry and one tagged packaged-extension test that runs the red-green and blue-yellow sample cases, records the selected model, and asserts the corresponding visible check-note result. If that coverage is not intended, change the README to name only the view that is tested.

## Demo and sandbox checks

The one-click demo path is present and passes the functional check:

- From the live first screen, **Try it with sample data** opened `/demo/?demo=1` in one navigation.
- The first demo screen already contained a Northstar release dashboard with three realistic named status checks and an open **1 signal to verify** check-note dialog.
- The persistent banner read **“Demo — sample data, nothing is saved to your real checks.”** and included **Reset demo** and **Start for real**.
- A fresh context contained only `demo:signal-check:sample-state`. After inserting a non-demo sentinel, Reset recreated the demo key and preserved the sentinel. Start for real removed the demo key and also preserved the sentinel.
- After the initial live visit and service-worker control, an offline reload showed the offline sample warning and dialog. Request observation over launch, reset, and exit saw only `https://color-meaning-audit.sociobot.in`.

These checks confirm a credible demo boundary. They do not cure the blocking gap in the extension privacy claim test above.

## Claims execution from a clean clone

`npm ci` and `npm test` passed in `/tmp/signal-check-review.YRiZkd`. I then ran every exact `test` command listed in `.factory/claims.json`, independently from that clean clone. All commands passed.

| Claim ID | Result |
| --- | --- |
| `free-download` | Pass |
| `no-account-screen` | Pass |
| `demo-warning` | Pass |
| `demo-isolation` | Pass |
| `demo-reset` | Pass |
| `demo-exit` | Pass |
| `demo-first-party` | Pass |
| `demo-offline` | Pass |
| `extension-check-notes` | Pass |
| `extension-local-check` | Pass, but inadequate for its stated whole-flow privacy claim (blocking finding above) |
| `extension-local-storage` | Pass |
| `extension-clear` | Pass |

No other landing or README sentence was treated as an unlisted visitor claim: the demonstrated sample, isolation, reset, offline, download, account, local-storage, and network statements have entries; the remaining prose is instruction, a limitation, or build documentation. The red/blue view statement is the unlisted capability finding above.

## Copy audit

Counts treat a hyphenated term and a URL as one word. To make the audit complete, sentence-like headings, facts, and visible labels are included; standalone navigation labels and the product name alone are not. No landing or README sentence exceeds 22 words and no banned marketing adjective appears.

### Landing page

| Words | Text |
| ---: | --- |
| 8 | A field check for the page in front of you |
| 6 | Check color-only signals before you act. |
| 11 | Check charts and status dashboards for meaning carried only by color. |
| 12 | For people with color-vision differences who need to act on a page. |
| 4 | Try it with sample data |
| 3 | Download for Chromium |
| 3 | Free to download |
| 3 | No account screen |
| 8 | Demo works offline after its first visit |
| 2 | Observation 01 |
| 9 | A label or shape can carry the missing meaning. |
| 5 | What the check notes show |
| 5 | See the signal and another cue. |
| 3 | Color-only status marks |
| 10 | Find a repeated signal that needs more than its color. |
| 2 | Check notes |
| 9 | Read a plain warning beside the page you need to interpret. |
| 2 | Another cue |
| 9 | Use a label, shape, pattern, written value, or position. |
| 3 | Three short steps |
| 4 | Check before you act. |
| 3 | Open the page. |
| 7 | Keep the chart or status dashboard in view. |
| 3 | Run Signal Check. |
| 8 | Choose a color-vision view and check the visible page. |
| 4 | Read the check notes. |
| 5 | Use another cue before you decide. |
| 5 | A safe first check |
| 7 | Sample data stays separate from real checks. |
| 8 | The demo has its own temporary browser key. |
| 6 | Resetting it removes that sample state. |
| 3 | Open the sample audit |
| 2 | Honest limits |
| 6 | A second look, not a diagnosis. |
| 4 | Signal Check is advisory. |
| 10 | Confirm important decisions with labels, source data, or a colleague. |
| 5 | See it before you install |
| 4 | Give color a backup. |
| 3 | Try the sample audit |
| 5 | Chromium extension · version 1.0.1 · free |
| 6 | Checks color-only signals on the visible page. |
| 12 | Built by Param Factory · build 1.0.1 · hero artwork is original project artwork. |

### README

| Words | Text |
| ---: | --- |
| 20 | Signal Check is a Chromium extension for people with color-vision differences who need to act on charts or status dashboards. |
| 12 | It opens check notes that name another cue to use before acting. |
| 6 | Try the isolated sample at `/demo/?demo=1`. |
| 7 | It opens a color-only status warning immediately. |
| 6 | The sample has no account screen. |
| 7 | Its state uses a `demo:` browser key. |
| 7 | Resetting the demo recreates only that key. |
| 9 | A Chromium extension with red-green and blue-yellow color-vision views. |
| 13 | Check notes that point to a label, shape, pattern, written value, or position. |
| 13 | A static site with a sample audit, privacy policy, terms, and extension download. |
| 8 | An offline demo shell after the first visit. |
| 7 | Node.js 22+ and npm 10+ are required. |
| 8 | Chromium for Playwright is supplied by the factory image. |
| 6 | `npm run build` creates `dist/extension/chrome-mv3/`, `dist/site/`, and `dist/site/downloads/signal-check-chrome.zip`. |
| 3 | Run `npm run build`. |
| 4 | Open `chrome://extensions` or `edge://extensions`. |
| 3 | Enable Developer mode. |
| 6 | Choose Load unpacked and select `dist/extension/chrome-mv3`. |
| 6 | Open a chart or status dashboard. |
| 10 | Choose Signal Check from the toolbar, then choose **Check this page**. |
| 13 | The extension stores the selected view and last result in browser-local extension storage. |
| 11 | It does not request network resources while it builds check notes. |
| 6 | See the privacy policy and terms. |
| 8 | Every visitor-facing claim appears in `.factory/claims.json`. |
| 8 | Run each listed command from a clean checkout. |
| 11 | The sample storage boundary and reset path are documented in `.factory/demo.md`. |
| 8 | Deploy `dist/site` as the static site for `https://color-meaning-audit.sociobot.in`. |
| 5 | The work order performs deployment. |
| 10 | `staticwebapp.config.json` supplies headers, route fallback, and the designed 404 response. |
| 12 | See `.factory/brief.json` for scope, `.factory/design.md` for design provenance, and `.factory/handoff.md` for verification. |
| 6 | Licensed under the MIT License. |

### Copy flags and proposed rewrites

| Quote | Finding | Proposed rewrite |
| --- | --- | --- |
| “Try it with sample data” | Primary action does not name the result; see P2 finding. | “Try sample data — see a color-only warning” |
| “Try the sample audit” | Secondary action has the same outcome ambiguity. | “Open the sample warning” |
| “Open the sample audit” | “Audit” is abstract where the result is a warning/check note. | “Open the sample warning” |
| “The demo has its own temporary browser key.” | “browser key” is implementation jargon in visitor copy. | “The demo saves only its own temporary sample.” |
| “Signal Check is advisory.” | “advisory” is less direct than the adjacent limitation heading. | “Use Signal Check as a second check, not a verdict.” |

Terminology is otherwise consistent enough for a cold read: **demo** denotes the isolated mode, **sample data** its contents, and **check notes** its result. No generic SaaS language, banned marketing words, or unexplained product-name headline was observed.

## Structure, routes, and visual check

- The live `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html` routes have route-appropriate titles, one `h1`, one `main`, `lang="en"`, a meta description, canonical URL, OG/Twitter social card, SVG favicon, and Apple touch icon.
- Direct loads focused each page heading; the demo focuses its open shadow-dialog sheet, whose host is the document's active element. Browser Back restored the landing focus to its `h1`.
- An unknown live route returned HTTP 404 with the designed notebook-themed “That page is not in this notebook.” page and a return-home action.
- A crawl of all rendered links on the five routes found 13 targets; each returned HTTP 200 (or was a same-document anchor/download).
- Headers and footers include Privacy and Terms. The footer identifies Param Factory and build `1.0.1`.
- The warm ruled-paper, graphite, violet, and notebook-inspection composition is distinct from a generic centered-hero SaaS template and matches the recorded visual thesis.

The structural check passes apart from the mobile touch-target finding.

## Required next steps

1. Replace `@claim:extension-local-check` with an end-to-end packaged-extension network-interception test, then re-run every listed claim command from a clean clone.
2. Increase the demo banner and model-control hit areas to 44 px and add mobile geometry coverage.
3. State the sample outcome beside the primary CTA and either claim-test all advertised color-vision views or narrow the README statement.
