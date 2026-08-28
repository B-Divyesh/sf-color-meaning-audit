# Adversarial first-read review 8 — Signal Check

**Reviewed:** 2026-08-28  
**Live URL:** <https://color-meaning-audit.sociobot.in/>  
**Review checkout:** fresh clone at `0a051471eef1452b67dfcc95ca9e6f8e326bd47d`  
**Viewports:** new Chromium contexts at 390×844 and 1440×900  
**Verdict: PASS**

**Findings: 0.** No blocking, major, or minor issue remains.

## Cold first read

Before scrolling in separate empty browser contexts, I could identify the job,
audience, and first action.

| Question | Answer from the first screen | Exact supporting text |
| --- | --- | --- |
| What does it do? | It checks charts and dashboards for signals whose meaning depends only on color, then directs the person to another cue. | “Check color-only signals before you act.” |
| For whom? | People with color-vision differences who need to act on a chart or dashboard. | “For people with color-vision differences who need to act, check charts and dashboards for meaning carried only by color.” |
| What should I click first? | Try the sample warning. | “Try sample data — see a color-only warning” |

Both widths loaded with no console or page errors. At 390 px, the sample action
and three facts were visible before scrolling: free download, local
visible-page checks, and offline sample reload after the first visit.

## Copy audit

The full landing and README sentence lists with word counts are in
[`.factory/copy-audit.md`](copy-audit.md), regenerated for the current 1.0.7
copy and checked against the rendered live landing page and `README.md`.

- The landing list contains 39 visible sentences/labels. The longest is the
  19-word audience-and-change sentence.
- The README list contains 34 prose sentences/instructions. The longest is
  the 20-word opening sentence.
- No sentence exceeds 22 words. There is no banned marketing adjective,
  inconsistent core term, unexplained reader-facing jargon, contextless
  heading, or non-result-naming visitor action.
- README headings — **What ships**, **Run and test**, **Install the
  extension**, **Claims and demo**, and **Deploy** — make sense in a heading
  list. Terminology remains **check notes**, **chart legend**, **sample data**,
  **demo**, **color-vision view**, and **extension ZIP**.

## Demo and sandbox verification

One click on the landing action opened `/demo/?demo=1`. The first screen
already showed the Northstar release dashboard and an open check-note sheet.
The sheet truthfully says no written status label was found; it does not treat
unrelated service names as status labels.

- The sticky boundary says “Demo — sample data, nothing is saved to your real
  checks.” and exposes **Reset demo** and **Start for real** at 390 px.
- A new context created only `demo:signal-check:sample-state`. After adding a
  `real:review-8-sentinel` diagnostic key, Reset recreated the demo key and
  retained the sentinel.
- Start for real removed the demo key, retained the sentinel, opened
  `/install/`, focused its h1, and downloaded a valid extension ZIP.
- Request logging through demo load, reset, and exit saw only
  `https://color-meaning-audit.sociobot.in`. No console/page error occurred.
- The live offline test established service-worker control, reloaded offline,
  and retained the warning, focused dialog, sticky boundary, header, footer,
  Privacy/Terms links, metadata, and enabled Locate action.

## Claims verification

A new clone at `/tmp/signal-check-review-8-op1hW3/repo` completed `npm ci` and
`npm test`: typecheck, 12 unit tests, production extension/site/ZIP builds,
output verification, and browser tests passed. Its final Playwright record is
`status: passed` with no failed tests. Every exact registry command then passed
independently.

| Claim ID | Result | Observable result checked |
| --- | --- | --- |
| `free-download` | PASS | Landing-linked ZIP has a valid ZIP signature. |
| `no-account-screen` | PASS | Demo opens with no sign-in or form. |
| `demo-warning` | PASS | Sample opens truthful no-written-label guidance. |
| `demo-isolation` | PASS | Fresh demo uses only the `demo:` namespace. |
| `demo-reset` | PASS | Reset recreates sample state and retains real sentinel. |
| `demo-exit` | PASS | Exit removes sample state, opens install, and downloads ZIP. |
| `demo-first-party` | PASS | Demo flow requests only the site origin. |
| `demo-offline` | PASS | Full sample shell and warning reload offline after first visit. |
| `extension-check-notes` | PASS | Only explicit labels become text cues. |
| `color-vision-views` | PASS | Packaged Deutan, Protan, and Tritan checks complete. |
| `extension-local-check` | PASS | Packaged capture/check/injection makes no HTTP(S) request. |
| `extension-offline` | PASS | Packaged visible-page check completes offline. |
| `extension-local-storage` | PASS | View and last result remain extension-local. |
| `extension-clear` | PASS | Clear removes the stored last result. |

Landing and README claims map to those entries. Remaining text is instruction,
limitation, version information, or build documentation. No unlisted claim was
found.

## Structure, accessibility, and visual identity

- `/`, `/demo/`, `/install/`, `/privacy/`, `/terms/`, and `/404.html`
  returned 200. An unknown route returned the designed notebook page with HTTP
  404.
- Each checked route had `lang="en"`, one `h1`, one `main`, a route-specific
  title and description, canonical URL, OG image, favicon, Apple touch icon,
  header, footer, Privacy, and Terms.
- The live route suite passed titles/metadata, heading focus, reload,
  Back-button, responsive target, sticky-demo, and Axe serious/critical checks
  (22 passed; 8 duplicate mobile claim tests intentionally skipped).
- Every unique rendered internal route, download, GitHub source, and issue
  tracker link returned HTTP 200. Same-page anchors were excluded.
- The warm paper, graphite rules, violet controls, inspection marks, and
  notebook/lens image follow the recorded careful-lab-notebook thesis rather
  than a generic SaaS template.

No AI, import/export, or sync capability is an obvious unmet expectation for
the brief's local visible-page check. No runtime AI feature, provider key, or
third-party model request was found.

## Earlier-finding closure check

Every earlier review, polish record, and handoff was read. Each prior finding
was rechecked on the live product and against current source/tests.

| Earlier finding | Current confirmation |
| --- | --- |
| `R1-FIRST-SCREEN` | Job, 19-word audience sentence, and result-naming action remain live at both widths. |
| `R1-DEMO-SANDBOX` | Direct realistic demo, sticky boundary, isolated state, Reset, and install exit work. |
| `R1-CLAIMS-CONTRACT` | All 14 registry commands pass from the clean clone. |
| `R1-ROUTING-404-FOCUS` | Direct routes, heading focus/Back, and HTTP-404 recovery work. |
| `R1-UNLISTED-CLAIMS` | No landing/README visitor claim lacks registry coverage. |
| `R1-METADATA-SKELETON` | Required metadata, icons, shell, and legal links are present. |
| `R1-TOUCH-TARGETS` | Live 390 px core/demo target checks pass. |
| `R1-TERMINOLOGY` | Approved terms are used consistently. |
| `R1-COPY-L03`, `R1-COPY-R02`, `R1-COPY-R14`, `R1-COPY-R27`, `R1-COPY-R28`, `R1-CTA` | Copy/CTA rewrites remain present and pass the fresh audit. |
| `R2-PRIVACY-CLAIM` | Packaged extension flow is request-intercepted by its claim test. |
| `R2-DEMO-TOUCH`, `R2-FIRST-ACTION`, `R2-COLOR-VIEWS` | Targets meet 44 px; action names warning; three packaged views pass. |
| `R2-COPY-SECONDARY`, `R2-COPY-BROWSER-KEY`, `R2-COPY-ADVISORY` | Secondary copy names warning, avoids key jargon, and keeps advisory limit. |
| `F-3-1` | Live and packaged results give no-label guidance for unrelated service names. |
| `F-3-2`, `F-3-3`, `F-4-1` | Hero sentence, complete audit, and plain README test wording remain fixed. |
| `F-5-1` | Scrolled demo retains sticky boundary and both actions. |
| `F-5-2` | Start for real clears sample state, focuses install, and starts ZIP download. |
| `F-5-3`–`F-5-6` | “Safe” is absent; privacy fact and self-contained headings remain. |
| `F-5-7`–`F-5-11` | README's Chromium, storage, network, deployment, and design-source wording remain plain. |
| `F-6-1` | Clean `npm ci && npm test` passes with committed lockfile/override. |
| `F-6-2` | Public artwork-origin assertion is absent; provenance remains documentation. |
| `F-6-3` | Offline demo has complete shell, metadata, legal links, focus, and Locate action. |
| `F-7-1` | Demo says “Read a sample warning,” not that it is the same as extension notes. |

## What would make this perfect

Nothing remains to add for the stated brief. Keep the existing clean-clone
claim commands and live route suite for future changes; they cover the precise
failure modes found in reviews 1–7.

