# Adversarial first-read review 7 — Signal Check

**Reviewed:** 2026-08-28  
**Live URL:** <https://color-meaning-audit.sociobot.in/>  
**Review checkout:** fresh clone at `9a8f0204b8375e20adbf1d029cb1d0e8163d77a8`  
**Viewports:** new Chromium contexts at 390×844 and 1440×900  
**Verdict: FAIL**

The core experience is clear, tryable, and mechanically well verified. One visitor-facing equivalence promise on the demo route is not represented in the claim registry. The contract requires every such promise to have its own observable claim test, so this round cannot pass with zero findings.

## Cold first read

Before scrolling, in separate storage-free mobile and desktop contexts, I understood:

- **What it does:** checks charts and status dashboards for meaning carried only by color and points to another cue.
- **For whom:** people with color-vision differences who need to act on that information.
- **What to click first:** **“Try sample data — see a color-only warning.”**

The evidence was on the first screen at both sizes: “Check color-only signals before you act.” and “For people with color-vision differences who need to act, check charts and dashboards for meaning carried only by color.” The mobile document was 390 px wide with no horizontal overflow, storage, cookie, or console error. This mandatory first-read check passes.

## Findings, ordered by severity

### F-7-1 — P1: the demo makes an unlisted equivalence claim

**Quote/location:** `/demo/?demo=1`, below the h1: “Try the same check notes used by the extension.”

**Evidence:** `.factory/claims.json` has no `demo-shared-check-notes` (or equivalent) entry. Its `demo-warning` test verifies a truthful demo warning, and `extension-check-notes` verifies packaged-extension guidance, but neither registered claim says or asserts that the two surfaces use the same check-note implementation or wording. Current source does import `scanAndShowOverlay` from `src/audit.ts` in `site/src/demo.ts`, so this is a claim-contract gap rather than evidence that the statement is presently false.

**Why this matters:** A first-time visitor is invited to judge the extension from the demo. “Same” is a concrete promise that the sample represents the installed product. Without a named claim and observable comparison, a future demo-specific fork could silently make that promise false.

**Concrete fix:** either remove “same” and say “Try sample check notes,” or add `demo-shared-check-notes` to `.factory/claims.json`. Its one tagged test should run the demo and the packaged extension against the same labelled and unlabelled signal pairs, then assert the same model name and guidance text in both results.

## Copy audit

Counts treat a hyphenated term, URL, path, command, or version as one word. Navigation labels and the product name alone are excluded; visible action and fact labels are included. README code blocks are excluded. No item below is over 22 words, contains a banned marketing adjective, uses inconsistent product terminology, has a contextless heading, or exposes a non-result-naming visitor action. F-7-1 is a claims finding, not a plain-words flag.

### Landing page

| Words | Sentence or visible label |
| ---: | --- |
| 10 | A field check for the page in front of you |
| 6 | Check color-only signals before you act. |
| 19 | For people with color-vision differences who need to act, check charts and dashboards for meaning carried only by color. |
| 7 | Try sample data — see a color-only warning |
| 3 | Download for Chromium |
| 3 | Free to download |
| 6 | Visible-page checks stay in your browser |
| 9 | Sample warning reloads offline after its first visit |
| 9 | A label or shape can carry the missing meaning. |
| 5 | What the check notes show |
| 5 | See the signal and another cue. |
| 3 | Color-only status marks |
| 10 | Find a repeated signal that needs more than its color. |
| 2 | Check notes |
| 9 | Read a plain warning beside the page you need to interpret. |
| 4 | Use a non-color cue |
| 9 | Use a label, shape, pattern, written value, or position. |
| 3 | Three short steps |
| 4 | Check before you act. |
| 3 | Open the page. |
| 7 | Keep the chart or status dashboard in view. |
| 3 | Run Signal Check. |
| 8 | Choose a color-vision view and check the visible page. |
| 4 | Read the check notes. |
| 5 | Use another cue before you decide. |
| 4 | An isolated sample check |
| 7 | Sample data stays separate from real checks. |
| 8 | The demo saves only its own temporary sample. |
| 6 | Resetting it removes that sample state. |
| 4 | Open the sample warning |
| 5 | What this check can miss |
| 6 | A second look, not a diagnosis. |
| 10 | Use Signal Check as a second check, not a verdict. |
| 10 | Confirm important decisions with labels, source data, or a colleague. |
| 5 | See it before you install |
| 4 | Give color a backup. |
| 4 | Open the sample warning |
| 5 | Chromium extension · version 1.0.6 · free |
| 6 | Checks color-only signals on the visible page. |
| 6 | Built by Param Factory · build 1.0.6 |

### README

| Words | Sentence or instruction |
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
| 7 | The factory test environment already includes Chromium. |
| 9 | In another environment, install it before running browser tests. |
| 14 | On Linux, the test command opens a test browser and uses the extension button. |
| 11 | This grants the same temporary page access as a user click. |
| 8 | `npm run build` creates `dist/extension/chrome-mv3/`, `dist/site/`, and `dist/site/downloads/signal-check-chrome.zip`. |
| 4 | Run `npm run build`. |
| 4 | Open `chrome://extensions` or `edge://extensions`. |
| 3 | Enable Developer mode. |
| 6 | Choose Load unpacked and select `dist/extension/chrome-mv3`. |
| 6 | Open a chart or status dashboard. |
| 11 | Choose Signal Check from the toolbar, then choose Check this page. |
| 13 | The extension saves the selected view and last result only in this browser. |
| 11 | It does not contact a server while it builds check notes. |
| 6 | See the privacy policy and terms. |
| 6 | Every visitor-facing claim appears in `.factory/claims.json`. |
| 8 | Run each listed command from a clean checkout. |
| 11 | The sample storage boundary and reset path are documented in `.factory/demo.md`. |
| 8 | Deploy `dist/site` as the static site for `https://color-meaning-audit.sociobot.in`. |
| 5 | The work order performs deployment. |
| 16 | The static host config adds security settings and sends unknown addresses to the designed 404 page. |
| 12 | See `.factory/brief.json` for scope, `.factory/design.md` for design sources, and `.factory/handoff.md` for verification. |
| 5 | Licensed under the MIT License. |

README headings — **What ships**, **Run and test**, **Install the extension**, **Claims and demo**, and **Deploy** — all make sense as a heading list. Terminology consistently uses *check notes*, *chart legend*, *sample data*, *demo*, *color-vision view*, and *extension ZIP*.

## Demo and sandbox verification

- One live click from the first screen opened `/demo/?demo=1`. Its first view already showed a Northstar release dashboard and an open “1 signal to verify” check-note sheet.
- The persistent boundary read “Demo — sample data, nothing is saved to your real checks.” At 390 px, it remained sticky after scrolling; Reset reopened the warning.
- A new context created only `demo:signal-check:sample-state`. After a `real:review-sentinel` diagnostic key was inserted, Reset recreated the demo key and retained the sentinel. Start for real removed the demo key, kept the sentinel, navigated to `/install/`, focused its h1, and downloaded a valid `signal-check-chrome.zip`.
- Request interception over demo load, Reset, and Start for real saw only `https://color-meaning-audit.sociobot.in`. The live `@claim:demo-offline` test then reloaded the sample warning, sheet, banner, header, footer, legal links, and enabled Locate action while offline.

The demo itself is not blocking; F-7-1 is limited to its unregistered “same check notes” assertion.

## Claims and clean-clone verification

Fresh clone: `/tmp/signal-check-review-7.D7MzrH/repo`, checked out at `9a8f020`. `npm ci` installed 263 packages with zero vulnerabilities and `npm test` passed typecheck, 11 unit tests, build/package/output verification, and 31 browser tests (15 duplicate mobile claim checks intentionally skipped).

Every exact command in `.factory/claims.json` was run independently in that clone. All 14 passed. A final `npm run test:e2e -- --grep '@claim:'` run confirmed 14 passed with 14 intentional mobile duplicates skipped.

| Claim ID | Result | Observable evidence |
| --- | --- | --- |
| `free-download` | PASS | Landing-linked ZIP had a valid ZIP signature. |
| `no-account-screen` | PASS | Demo opened without sign-in or form controls. |
| `demo-warning` | PASS | Sample sheet gave no-label, non-service-name guidance. |
| `demo-isolation` | PASS | Only a `demo:` storage key was created. |
| `demo-reset` | PASS | Reset recreated the sample and preserved the real sentinel. |
| `demo-exit` | PASS | Exit removed sample state, opened install, and downloaded ZIP. |
| `demo-first-party` | PASS | Demo flow requested only the site origin. |
| `demo-offline` | PASS | Cached warning and full demo shell reloaded offline. |
| `extension-check-notes` | PASS | Only explicit labels counted as text cues. |
| `color-vision-views` | PASS | Packaged Deutan, Protan, and Tritan checks completed. |
| `extension-local-check` | PASS | Packaged capture/check/injection flow made no HTTP(S) request. |
| `extension-offline` | PASS | Packaged visible-page check completed while offline. |
| `extension-local-storage` | PASS | Selected view and last result remained extension-local. |
| `extension-clear` | PASS | Clear removed the stored last result. |

All landing and README claim-like text maps to one of those claims, or is instruction, a limitation, build documentation, or a plainly visible version. F-7-1 is the one claim-like statement found outside those two documents.

## Earlier-finding closure check

Each previous finding was checked on the live product and against current source/tests. The earlier issues remain fixed; none is re-opened by F-7-1.

| Earlier finding | Current confirmation |
| --- | --- |
| `R1-FIRST-SCREEN`, `R1-COPY-L03`, `R1-CTA` | Live mobile/desktop first screen has the job headline, 19-word audience sentence, result-naming sample action, and three facts. |
| `R1-DEMO-SANDBOX`, `R2-DEMO-TOUCH`, `R2-FIRST-ACTION`, `R2-COPY-SECONDARY`, `R2-COPY-BROWSER-KEY` | Direct isolated demo opens a real warning; its banner/actions are sticky and 44 px; sample links name the warning; visitor copy avoids key jargon. |
| `R1-CLAIMS-CONTRACT`, `R2-PRIVACY-CLAIM`, `R2-COLOR-VIEWS` | Registry has one tag per listed claim; packaged-extension network interception and all three view tests pass. |
| `R1-ROUTING-404-FOCUS`, `R1-METADATA-SKELETON` | Direct routes/reload/back focus work; titles, metadata, canonical, social image, icons, and notebook-styled 404 are present. |
| `R1-UNLISTED-CLAIMS`, `F-6-2` | The previous artwork-origin assertion is absent. F-7-1 is a new, separate demo-copy claim gap. |
| `R1-TOUCH-TARGETS`, `R1-TERMINOLOGY` | Live mobile geometry passes, and approved terms remain consistent. |
| `R1-COPY-R02`, `R1-COPY-R14`, `R1-COPY-R27`, `R1-COPY-R28`, `F-3-2`, `F-3-3`, `F-4-1`, `F-5-3`–`F-5-11` | Current complete copy audit has no length, jargon, heading, or banned-word regression. |
| `F-3-1`, `R2-COPY-ADVISORY` | Live and packaged checks state that no written label exists for unlabeled signals, and the product describes itself as a second check rather than a verdict. |
| `F-5-1`, `F-5-2`, `F-5-4`–`F-5-6` | Demo boundary remains visible; Start for real reaches installation/download; privacy fact and self-contained section headings remain present. |
| `F-6-1` | Committed lockfile and Playwright override allow clean `npm ci && npm test` to pass. |
| `F-6-3` | Offline demo reload has the same usable shell, metadata, legal links, focus, and enabled Locate action; its tagged test passes live. |

## Structure, accessibility, and visual identity

- `/`, `/demo/`, `/install/`, `/privacy/`, `/terms/`, and `/404.html` returned 200. Each had one h1 and main landmark, `lang="en"`, a route-specific title and description, canonical URL, Open Graph image, favicon, Apple touch icon, header, footer, Privacy, and Terms. `/not-a-real-route` returned the designed page with HTTP 404.
- The live route suite passed 20 tests with 8 intentional claim duplicates skipped. It covers route focus/Back, AXE serious/critical checks, overflow, touch targets, demo boundary, offline shell, and metadata. No console error was captured during independent mobile/desktop, demo, or route checks.
- Crawled internal routes, download, and the GitHub Source link responded successfully; the only deliberately nonexistent address was the explicit 404 check.
- The visual system remains product-specific: warm paper, graphite rules, violet controls, inspection marks, and the notebook/lens artwork follow the recorded “careful lab notebook” thesis rather than a generic SaaS template.

## Missed leverage

No AI, import/export, or sync feature is an obvious unmet expectation for this local visible-page check. An AI action would not improve the core inspection job and would add privacy/key-management complexity. No runtime AI feature, provider key, or third-party model request was found.

## What would make this perfect

Remove the word “same” from the demo sentence, or register and test it as a cross-surface equivalence claim. Then rerun the 14 claim commands, live route suite, and cold mobile/desktop check. With that registry gap closed and no new finding, this review can pass.
