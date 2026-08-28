# Adversarial first-read review 4 — Signal Check

**Reviewed:** 2026-08-28  
**Live URL:** <https://color-meaning-audit.sociobot.in/>  
**Review base:** `5df56ede1dddad8530a8d500dfc147496be75c0e`  
**Viewports:** fresh Chromium contexts at 390×844 and 1440×900  
**Verdict: FAIL**

One minor copy defect remains. This review contract requires zero findings for a PASS.

## Cold first read

Before scrolling in separate empty browser contexts, I understood the product checks charts and dashboards for color-only meaning, it is for people with color-vision differences who need to act, and I should choose **“Try sample data — see a color-only warning.”**

The exact first-screen proof is:

> “Check color-only signals before you act.”
>
> “For people with color-vision differences who need to act, check charts and dashboards for meaning carried only by color.”
>
> “Try sample data — see a color-only warning”

This passes. The headline is six words, the audience-and-change sentence is 19 words, and the action names its outcome. Both views had no horizontal overflow or console error.

## Findings

### F-4-1 — P2: README test instructions use unexplained implementation jargon

**Location / exact quote:** [README.md](../README.md), **Run and test**:

> “The end-to-end command uses Xvfb on Linux to invoke the extension’s real toolbar shortcut.”

**Why a reader is lost:** “Xvfb” is an unexplained implementation name. The plain-words contract applies to README copy and requires jargon to be flagged. A person who only wants to run the documented test cannot tell what it is or whether they need to configure it.

**Concrete fix:** replace it with: “On Linux, the test command opens a test browser and uses the extension button.” Put implementation detail only in a troubleshooting note that explains why it is needed.

## Copy audit

Counts treat hyphenated terms, paths, URLs, commands, and version strings as one word. Navigation labels and product name alone are excluded; README code blocks are excluded. No visible item is over 22 words. There are no banned marketing adjectives, inconsistent core terms, unclear headings, or non-result-naming actions. F-4-1 is the sole jargon flag.

### Landing page

| Words | Text |
| ---: | --- |
| 8 | A field check for the page in front of you |
| 6 | Check color-only signals before you act. |
| 19 | For people with color-vision differences who need to act, check charts and dashboards for meaning carried only by color. |
| 7 | Try sample data — see a color-only warning |
| 3 | Download for Chromium |
| 3 | Free to download |
| 3 | No account screen |
| 9 | Sample warning reloads offline after its first visit |
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
| 8 | The demo saves only its own temporary sample. |
| 6 | Resetting it removes that sample state. |
| 4 | Open the sample warning |
| 2 | Honest limits |
| 6 | A second look, not a diagnosis. |
| 10 | Use Signal Check as a second check, not a verdict. |
| 10 | Confirm important decisions with labels, source data, or a colleague. |
| 5 | See it before you install |
| 4 | Give color a backup. |
| 4 | Open the sample warning |
| 5 | Chromium extension · version 1.0.3 · free |
| 6 | Checks color-only signals on the visible page. |
| 12 | Built by Param Factory · build 1.0.3 · hero artwork is original project artwork. |

### README

| Words | Text |
| ---: | --- |
| 20 | Signal Check is a Chromium extension for people with color-vision differences who need to act on charts or status dashboards. |
| 12 | It opens check notes that name another cue to use before acting. |
| 6 | Try the isolated sample at `/demo/?demo=1`. |
| 7 | It opens a color-only status warning immediately. |
| 6 | The sample has no account screen. |
| 6 | It saves only temporary demo data. |
| 7 | Resetting the demo recreates only that sample. |
| 14 | A Chromium extension with Deutan and Protan red-green views, plus a Tritan blue-sensitive view. |
| 10 | Check notes that say when a written status label is missing. |
| 13 | A static site with a sample warning, privacy policy, terms, and extension download. |
| 9 | The sample warning reloads offline after its first visit. |
| 7 | Node.js 22+ and npm 10+ are required. |
| 9 | Chromium for Playwright is supplied by the factory image. |
| 14 | The end-to-end command uses Xvfb on Linux to invoke the extension’s real toolbar shortcut. **F-4-1** |
| 11 | This grants the same temporary page access as a user click. |
| 8 | `npm run build` creates `dist/extension/chrome-mv3/`, `dist/site/`, and `dist/site/downloads/signal-check-chrome.zip`. |
| 4 | Run `npm run build`. |
| 4 | Open `chrome://extensions` or `edge://extensions`. |
| 3 | Enable Developer mode. |
| 6 | Choose Load unpacked and select `dist/extension/chrome-mv3`. |
| 6 | Open a chart or status dashboard. |
| 11 | Choose Signal Check from the toolbar, then choose Check this page. |
| 13 | The extension stores the selected view and last result in browser-local extension storage. |
| 11 | It does not request network resources while it builds check notes. |
| 6 | See the privacy policy and terms. |
| 6 | Every visitor-facing claim appears in `.factory/claims.json`. |
| 8 | Run each listed command from a clean checkout. |
| 11 | The sample storage boundary and reset path are documented in `.factory/demo.md`. |
| 8 | Deploy `dist/site` as the static site for `https://color-meaning-audit.sociobot.in`. |
| 5 | The work order performs deployment. |
| 10 | `staticwebapp.config.json` supplies headers, route fallback, and the designed 404 response. |
| 12 | See `.factory/brief.json` for scope, `.factory/design.md` for design provenance, and `.factory/handoff.md` for verification. |
| 5 | Licensed under the MIT License. |

Terminology is otherwise consistent: **check notes** is the result, **sample data** the example content, **demo** the isolated mode, and **color-vision view** the comparison choice. The headings **What ships**, **Run and test**, **Install the extension**, **Claims and demo**, and **Deploy** make sense alone.

## Demo and sandbox verification

- One landing click reached `/demo/?demo=1`.
- The first screen showed the Northstar release dashboard, realistic color-only marks, and the real open check-note dialog: **“1 signal to verify.”**
- The persistent banner said **“Demo — sample data, nothing is saved to your real checks.”** and exposed **Reset demo** and **Start for real**.
- Fresh storage contained only `demo:signal-check:sample-state`. After adding `real:sentinel=keep`, Reset recreated only the demo key and preserved the sentinel. Start for real removed the demo key and preserved the sentinel.
- The sample guidance correctly says: **“No nearby text label was found. Look for a shape, line pattern, position, or written value before acting.”**
- Request interception across landing, demo, reset, and exit observed only the product origin. No console errors occurred.
- The offline claim test waited for service-worker control, reloaded, set the fresh context offline, and verified the warning, banner, and dialog.

## Claims verification

I made a literal clean temporary clone at `/tmp/signal-check-review-4-5HLY8P`, ran `npm ci`, then ran every exact command in `.factory/claims.json`. All 14 passed; the clone’s final Playwright record was `status: passed` with no failed tests.

| Claim ID | Result |
| --- | --- |
| `free-download` | PASS |
| `no-account-screen` | PASS |
| `demo-warning` | PASS |
| `demo-isolation` | PASS |
| `demo-reset` | PASS |
| `demo-exit` | PASS |
| `demo-first-party` | PASS |
| `demo-offline` | PASS |
| `extension-check-notes` | PASS |
| `color-vision-views` | PASS |
| `extension-local-check` | PASS |
| `extension-offline` | PASS |
| `extension-local-storage` | PASS |
| `extension-clear` | PASS |

Landing and README visitor claims map to these entries: download/account, sample warning/isolation/reset/exit/first-party/offline, the three views, local checking, and local storage/clear. Remaining wording is instruction, limitation, provenance, or developer documentation. No unlisted visitor claim was found.

## Earlier-finding closure check

| Earlier finding | Current confirmation |
| --- | --- |
| Review 1: first read and CTA | The job, audience, sample outcome, and separate download are visible at both sizes. |
| Review 1: demo and claims contract | Real demo, isolated namespace, reset/exit, docs, 14 tagged clean-clone claim tests, and no unlisted visitor claim. |
| Review 1: routing/metadata/touch/copy | Routes, styled 404, focus, metadata, 44 px targets, terminology, and plain rewrites were rechecked. |
| Review 2: privacy test | `extension-local-check` now exercises the packaged visible-page check with request interception. |
| Review 2: controls, CTA, views | Controls are at least 44 px, CTA names its result, and packaged Deutan/Protan/Tritan coverage passes. |
| F-3-1 | Only explicit status labels count; unlabeled marks now give no-label guidance. |
| F-3-2 | Hero support copy is one 19-word audience-and-change sentence. |
| F-3-3 | This review independently repeated the complete README audit. |

## Structure, accessibility, and visual verification

- `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html` have route-appropriate titles, one h1, one main, `lang=en`, descriptions, canonicals, OG/Twitter image data, and icons. `/not-a-real-route` returned HTTP 404 with the designed recovery page.
- Rendered public internal links returned 200, including the ZIP; the 404 skip link is a same-document hash link. Every footer includes Privacy, Terms, product one-liner, factory credit, and build version.
- Direct load, reload, and Back return focus to the h1; the demo sends focus to the check-note dialog host and has a polite route announcement.
- `npm test` passed: typecheck, 5 unit tests, package/build validation, and 44 browser tests. `npm run build` also passed and produced `dist/`.
- Axe coverage reports no serious/critical issue on public routes and overlay. Live mobile/desktop pages had no console errors. Core targets are 44 px or larger and reduced motion is covered.
- The warm paper, ruled lines, graphite/violet controls, lens mark, and original notebook artwork are a distinct lab-notebook system, not a generic SaaS template.

## Missed leverage

No AI, import/export, or sync feature is implied by the brief’s local, immediate visible-page check. Adding AI would increase privacy/key-management burden without improving this job. No decorative AI feature or provider key is present.

## What would make this perfect

Apply F-4-1’s rewrite (or explain the term in a developer-only troubleshooting note), rerun the copy audit and clean-clone claims checks, then repeat this review. No product-behavior change is otherwise required.
