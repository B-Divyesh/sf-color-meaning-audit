# Copy audit — polish round 6

Counts treat a hyphenated term, URL, command, or path as one word. Navigation labels and the product name alone are excluded. README code blocks are excluded; every prose sentence and numbered instruction is included below. No sentence exceeds 22 words, and no banned marketing word appears.

## Landing page

| Words | Text |
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

## Install page

| Words | Text |
| ---: | --- |
| 2 | Chromium setup |
| 5 | Install Signal Check in Chromium. |
| 4 | Download the extension ZIP. |
| 14 | Add its extracted folder to Chromium, then check the page in front of you. |
| 3 | Download extension ZIP |
| 4 | Return to sample data |
| 6 | Your extension ZIP download has started. |
| 2 | Installation note |
| 6 | Add the extension in three steps. |
| 8 | Extract the downloaded ZIP into its own folder. |
| 7 | Open `chrome://extensions` and switch on Developer mode. |
| 8 | Choose Load unpacked and select the extracted folder. |
| 4 | Run your first check. |
| 5 | Open a chart or dashboard. |
| 11 | Choose Signal Check from the toolbar, then choose Check this page. |

## README

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

README headings are **What ships**, **Run and test**, **Install the extension**, **Claims and demo**, and **Deploy**. They are distinct and make sense out of context.

The round-5 jargon check found no unexplained implementation term in reader-facing prose. The setup note tells contributors when they need to install Chromium.

## Terminology

| Concept | One term |
| --- | --- |
| Result overlay | check notes |
| Chart explanation list | chart legend |
| Trial content | sample data |
| Isolated mode | demo |
| Color comparison | color-vision view |
| Installation file | extension ZIP |

First-screen read-aloud check: “For people with color-vision differences who need to act, check charts and dashboards for meaning carried only by color. Try sample data to see a color-only warning.”

## Catalog description

| Words | Text |
| ---: | --- |
| 10 | Check color-only chart and dashboard signals before making a decision. |

The catalog line starts with a verb, is 70 characters, and has no marketing claim.
