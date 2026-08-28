# Adversarial first-read review 3 — Signal Check

**Reviewed:** 2026-08-28  
**Live URL:** <https://color-meaning-audit.sociobot.in/>  
**Review checkout:** fresh clone at `0d2521a0092edc287307ae3e6c0d8e0ccddfb448`  
**Verdict: FAIL**

The home page is clear and the isolated demo works mechanically. The demo's actual result, however, tells a visitor that unrelated service names are a status cue. That makes the core advice misleading.

## Cold first read

Fresh Chromium contexts at 390x844 and 1440x900 had no console/page errors and no horizontal overflow. Before scrolling, I understood:

- **What:** it checks charts and status dashboards for meaning carried only by color, then directs me to another cue.
- **For whom:** people with color-vision differences who need to act on a page.
- **First click:** **“Try sample data — see a color-only warning.”**

The supporting text was “Check charts and status dashboards for meaning carried only by color. For people with color-vision differences who need to act on a page.” This cold-read check passes.

## Findings

### F-3-1 — BLOCKING: the sample treats unrelated service names as a usable status cue

**Location / exact quote:** the live `/demo/?demo=1` dialog opens with:

> “1. ‘Billing handshake Region 1 09:42 UTC’ and ‘Token refresh Region 2 09:43 UTC’ may look alike”
>
> “The legend has words, but the marks share the same shape. Match a label, line pattern, or position before acting.”

**Evidence:** the three sample dots are `aria-hidden`; their parent rows contain only service names, regions, and times. There is no legend and no written ready/blocked status. In `src/audit.ts`, `labelFor()` uses the entire nearest `li`/`[class*="status"]` text as a label, so arbitrary status-row text becomes an alleged alternate cue.

**Why this fails:** “Billing handshake” and “Token refresh” name services; they do not identify which dot means healthy or blocked. The user is told to match a label that does not carry the missing status meaning. This is the core advice the demo asks a first-time visitor to trust, and the same heuristic can affect the shipped extension on real dashboards.

**Concrete fix:** only call text an alternate cue when it is explicitly associated with the mark (such as its own accessible name or a verified legend label), never merely because it shares a status row. This demo should instead say: “No nearby text label was found. Look for a shape, line pattern, position, or written value before acting.” Add a packaged-extension regression for unlabeled dots beside unrelated service names (no-label guidance) and for dots with explicit Ready/Blocked labels (label guidance). Extend `@claim:demo-warning` and `@claim:extension-check-notes` to assert the truthful cue text, not only dialog existence.

### F-3-2 — P2: the hero support copy misses the required single <=22-word audience-and-change sentence

**Location / exact quote:** “Check charts and status dashboards for meaning carried only by color. For people with color-vision differences who need to act on a page.”

**Why this matters:** the two sentences are clear but together have 23 words and split the mandatory first-screen audience-and-change statement. This is not a clarity blocker; it misses the supplied plain-words shape.

**Concrete fix:** use: “For people with color-vision differences who need to act, check charts and dashboards for meaning carried only by color.” (19 words.)

### F-3-3 — P2: `.factory/copy-audit.md` is not a complete README audit

**Location / exact quote:** the file calls itself “Copy audit — polish round 2,” but omits README sentences including:

> “The end-to-end command uses Xvfb on Linux to invoke the extension’s real toolbar shortcut.”
>
> “This grants the same temporary page access as a user click.”
>
> “Deploy `dist/site` as the static site for `https://color-meaning-audit.sociobot.in`.”

**Why this matters:** the plain-words proof is required to cover every README sentence. Omitted prose bypasses the word-count/jargon review.

**Concrete fix:** regenerate the audit from the current README, including every prose and numbered-instruction sentence, word count, and terminology table; state explicitly that code blocks are excluded.

## Demo and sandbox verification

- The primary link reached `/demo/?demo=1` in one navigation. It immediately showed a Northstar status dashboard and the real open check-note overlay.
- The persistent banner said “Demo — sample data, nothing is saved to your real checks.” Reset recreated only `demo:signal-check:sample-state` while a manually set `real:sentinel` remained. Start for real removed the `demo:` key and retained the sentinel.
- Live request interception over landing, demo, reset, and exit observed only `https://color-meaning-audit.sociobot.in`; no console errors occurred.
- The clean-state offline claim first obtained service-worker control, then reloaded offline and asserted the warning/dialog/banner. It passed.

These pass the demo-storage mechanics but do not cure F-3-1's misleading result text.

## Claims execution

I cloned the repository into `/tmp/signal-check-review-3-xH9TW9`, ran `npm ci`, then ran every exact `.factory/claims.json` command independently. All 13 passed; the final Playwright status was `passed`. `npm test` also passed in that clean clone: typecheck, 5 Vitest tests, build/package validation, and the 40-test Playwright run.

| Claim ID | Result |
| --- | --- |
| `free-download` | Pass |
| `no-account-screen` | Pass |
| `demo-warning` | Pass; it does not assert truthful cue content (F-3-1) |
| `demo-isolation` | Pass |
| `demo-reset` | Pass |
| `demo-exit` | Pass |
| `demo-first-party` | Pass |
| `demo-offline` | Pass |
| `extension-check-notes` | Pass; it does not cover unrelated-row text (F-3-1) |
| `color-vision-views` | Pass |
| `extension-local-check` | Pass |
| `extension-local-storage` | Pass |
| `extension-clear` | Pass |

The remaining landing/README wording is instruction, limitation, provenance, or development documentation. I found no additional unlisted visitor claim.

## Copy audit

Counts treat a hyphenated term, URL, command, or path as one word. Navigation labels and the product name alone are excluded. No sentence exceeds 22 words; the exceptions are the first-screen shape and incomplete recorded audit above.

### Landing page

| Words | Text |
| ---: | --- |
| 8 | A field check for the page in front of you |
| 6 | Check color-only signals before you act. |
| 11 | Check charts and status dashboards for meaning carried only by color. |
| 12 | For people with color-vision differences who need to act on a page. |
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
| 5 | Chromium extension · version 1.0.2 · free |
| 6 | Checks color-only signals on the visible page. |
| 12 | Built by Param Factory · build 1.0.2 · hero artwork is original project artwork. |

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
| 14 | A Chromium extension with Deutan and Protan red-green views, plus a Tritan blue-sensitive view. |
| 13 | Check notes that point to a label, shape, pattern, written value, or position. |
| 13 | A static site with a sample audit, privacy policy, terms, and extension download. |
| 9 | The sample warning reloads offline after its first visit. |
| 7 | Node.js 22+ and npm 10+ are required. |
| 9 | Chromium for Playwright is supplied by the factory image. |
| 14 | The end-to-end command uses Xvfb on Linux to invoke the extension’s real toolbar shortcut. |
| 11 | This grants the same temporary page access as a user click. |
| 8 | `npm run build` creates `dist/extension/chrome-mv3/`, `dist/site/`, and `dist/site/downloads/signal-check-chrome.zip`. |
| 4 | Run `npm run build`. |
| 4 | Open `chrome://extensions` or `edge://extensions`. |
| 3 | Enable Developer mode. |
| 6 | Choose Load unpacked and select `dist/extension/chrome-mv3`. |
| 6 | Open a chart or status dashboard. |
| 11 | Choose Signal Check from the toolbar, then choose **Check this page**. |
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

README headings (**What ships**, **Run and test**, **Install the extension**, **Claims and demo**, **Deploy**) make sense in context. Landing controls name their result/action; no button-copy finding was recorded.

## Earlier-finding closure check

I reread `review-1.md`, `review-2.md`, `polish-2.md`, and the prior handoff, then rechecked each earlier repair in live behavior and source.

| Earlier finding | Current check |
| --- | --- |
| `R1-FIRST-SCREEN`, `R1-CTA`, `R2-FIRST-ACTION` | Job, audience, sample outcome, and separate download are visible at 390px and desktop. |
| `R1-DEMO-SANDBOX`, `R2-DEMO-TOUCH` | Isolated route/banner/reset/exit and >=44px core controls work. |
| `R1-CLAIMS-CONTRACT`, `R1-UNLISTED-CLAIMS` | Registry exists; all 13 commands pass; promises map to entries. |
| `R1-ROUTING-404-FOCUS`, `R1-METADATA-SKELETON` | Direct routes, focus, Back, route metadata, designed 404, footer, sitemap, and icons work. |
| `R1-TOUCH-TARGETS` | Header/footer brands, legal and demo targets meet 44px in checked viewports. |
| `R1-TERMINOLOGY`, `R1-COPY-L03`, `R1-COPY-R02`, `R1-COPY-R14`, `R1-COPY-R27`, `R1-COPY-R28` | Current public wording is short and consistent; no >22-word sentence exists. |
| `R2-PRIVACY-CLAIM` | Packaged toolbar capture/injection flow is intercepted for zero HTTP(S) requests. |
| `R2-COLOR-VIEWS` | Packaged Deutan, Protan, and Tritan test runs pass. |
| `R2-COPY-SECONDARY`, `R2-COPY-BROWSER-KEY`, `R2-COPY-ADVISORY` | Current secondary/demo/limitation wording has the recorded plain rewrites. |

F-3-1 is not a mechanical regression of those repairs; it is a semantic gap in the alternate-cue advice that existing tests do not assert.

## Structure and visual verification

- `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html` have suitable titles, one h1, main, `lang="en"`, description, canonical, OG/Twitter card, and SVG/Apple icons. Back from Privacy restored home-heading focus.
- `/not-a-real-route` returned HTTP 404 with “That page is not in this notebook.” A crawl of rendered links on all five routes returned 200 for every HTTP target, including ZIP and source links.
- Header/footer Privacy and Terms links are consistent. The warm ruled-paper, graphite, violet, magnifier, and notebook composition are a distinct careful-lab-notebook identity, not a generic SaaS template.

## Missed leverage

No AI, import/export, or sync feature is implied by the brief’s smallest useful local visible-page check. Adding AI would weaken privacy without improving this immediate decision. No provider key or decorative AI feature is present.

## What would make this perfect

1. Repair and claim-test F-3-1 so the demo explicitly says no written status label is available.
2. Replace the hero support copy with the required one-sentence statement.
3. Regenerate the complete README copy audit.
