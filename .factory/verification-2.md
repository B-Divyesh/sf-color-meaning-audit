# Independent verification 2 — FAIL

**Candidate:** `871409aac922bd2f5370da6e0dc49f419853a9fa`

**Live URL:** https://color-meaning-audit.sociobot.in/

**Verified:** 2026-08-28 from a clean detached worktree after `npm ci`.

## Release decision

**FAIL.** The candidate fixes the two defects from the first verification and
the live deployment matches its site and extension payload. The actual MV3
extension completes the researched job end to end. However, its loading marks
are visibly present and animate forever in every non-reduced-motion popup
state, including Ready, success, cleared, and error. The authored `.progress {
display: flex }` rule overrides the element's `hidden` attribute. This violates
the acceptance contract's distinct feedback states and prohibition on
uncontrolled looping motion.

No product code was changed during this verification.

## Clean-checkout gates

| Gate | Result | Fresh evidence |
| --- | --- | --- |
| Checkout | PASS | Detached worktree at exact SHA `871409a`; no `node_modules` or `dist` before install. |
| Install | PASS | Node `v22.23.2`, npm `10.9.8`; `npm ci` installed/audited 263 packages, 0 vulnerabilities. |
| Full repository test | PASS | First `npm test` from the clean worktree: typecheck passed; Vitest 2 files / 5 tests passed; production fixtures rebuilt; Playwright 5 passed / 1 intentional project skip across desktop Chromium and exact 390×844 mobile. |
| Type/lint | PASS | `npm run typecheck` (`wxt prepare && tsc --noEmit`) passed within `npm test`. No lint script/configuration exists. |
| Exact production build | PASS | A separate `npm run build` passed after the test run. WXT output was 26.58 KB; the site emitted 1.17 KB JS and 10.78 KB CSS. |
| Package integrity | PASS | `unzip -t dist/site/downloads/signal-check-chrome.zip` reported no errors; `npm audit --omit=dev` reported 0 vulnerabilities. |

The formerly non-reproducible test gate is repaired: `prepare:test` now removes
`dist`, builds the extension and site, packages the ZIP, verifies the output,
and only then runs Playwright.

## Independent product exercise

The unpacked production extension was loaded in Chrome for Testing 145 and
invoked through its real `Alt+Shift+S` browser-action shortcut. It was not
tested by calling internal functions in place of the toolbar flow.

| Scenario | Result | Evidence |
| --- | --- | --- |
| Normal DOM case | PASS | With the live sample status board in view, Deutan reported **1 signal to verify**, named Billing handshake and Token refresh, and opened a labelled dialog. “Locate these signals” highlighted exactly 2 marks. Escape removed the overlay, highlights, and temporary IDs. |
| Empty state | PASS | At the top of the same live page, the popup reported “No likely color-only signals found” and the overlay explained the visible-area limitation. Escape closed it. |
| Screenshot-only case | PASS | On a controlled canvas containing only repeated red/green chart blocks, the packaged extension reported palette findings and advised seeking a label, shape, pattern, or written value. No DOM mark was available to drive that result. |
| Boundary / alternate cue | PASS | Two same-shape 6×6 px marks produced 1 warning; 5×5 px marks produced none; a 6×6 circle/square pair produced none. This exercises the documented minimum visible-mark and alternate-shape behavior. |
| Offline | PASS | With Chromium network emulation offline, the popup showed “Offline. Checks still work locally” and still found the controlled pair. |
| Invalid/protected page | PASS | On `chrome://settings/`, the popup explained that the page is protected and returned the Check button to enabled. A subsequent live-page audit succeeded at mobile width. |
| Local persistence | PASS | Storage contained only `visionModel` and `{lastResult:{count,at}}`. “Clear last check” removed the result and returned a clear confirmation. No screenshot or page text was stored. |
| Keyboard | PASS | Browser shortcut opened the popup; radio arrows changed the model; Enter ran the check and Locate action; Escape closed the overlay. Focus used a visible 3 px amber outline. There was no trap. |
| Overlay semantics | PASS | Focus moved to the injected `.sheet`; it had `role=dialog` and `aria-labelledby=sc-title`. The close and locate controls were named and at least 44 px. |
| Mobile overlay | PASS | At a 390×844 viewport, the sheet bounds were x=6, width=363, height=472 and remained scrollable within the viewport; the underlying live page had no horizontal overflow. |
| Reduced motion | PASS | Live-site transitions became `0s`; popup motion became `none/0s`; the injected sheet also became `none/0s` when reduced motion was active. |
| Console/runtime | PASS | No console errors, page errors, or failed requests occurred in the site or exercised extension flows. |

The deliberately misleading loading marks described under Defects were visible
during all of these popup states and are therefore a release blocker despite
the successful audit results.

## Accessibility, responsive behavior, and visual QA

- Independent axe scans found **0 serious or critical violations** on `/`,
  `/privacy/`, and `/terms/` at both 1440×900 and 390×844; the popup and
  injected mobile result overlay also had 0 serious/critical findings.
- All three live routes returned 200 and had `lang=en`, a descriptive title,
  exactly one `<h1>`, exactly one `<main>`, and no images missing `alt`.
- The first Tab exposed “Skip to main content” at y=12 with a 3 px outline.
  The sample comparison worked with Enter and announced its changed wording.
- Desktop and 390 px visual captures showed the authored lab-notebook design,
  intentional responsive stacking, legible content, and no clipping. Primary
  controls measured 44–50 px high.
- The popup satisfies reduced-motion requests, but without that preference its
  idle progress marks loop indefinitely. Axe does not detect this state error.

## Privacy and permissions

- The shipped manifest requests only `activeTab`, `scripting`, and `storage`,
  with no host permissions. Its default MV3 CSP permits no remote script.
- A live audit generated **0 HTTP(S) requests during the check**. Source and
  built-output review found no remote runtime URL, analytics, telemetry,
  WebSocket, or beacon. Screenshot analysis uses a local data URL and memory.
- All first-party website requests observed in desktop and mobile sessions were
  confined to `https://color-meaning-audit.sociobot.in`; there were no cookies,
  local/session storage entries, remote fonts, or third-party scripts.
- `/privacy/` accurately describes the observed local processing and storage.

## Performance and response policy

Lighthouse 12.8.2 against the live mobile URL at
`2026-08-28T03:44:33Z` scored:

| Category / metric | Result |
| --- | --- |
| Performance / accessibility / best practices / SEO | **100 / 100 / 100 / 100** |
| FCP / LCP / Speed Index | 0.9 s / 0.9 s / 1.0 s |
| Total blocking time / max potential FID | 0 ms / 16 ms |
| CLS | 0 |
| Total transfer | 34 KiB |

Bundle budgets pass: site JS 1,172 bytes, site CSS 10,788 bytes, extension JS
13,253 bytes total, extension CSS 3,364 bytes, no webfonts, mobile hero WebP
24,818 bytes, and AVIF 27,044 bytes.

HTTP redirects to HTTPS. HTML and ZIP responses use
`public, max-age=0, must-revalidate`; hashed assets use
`public, max-age=31536000, immutable`; conditional requests returned 304.
HSTS, `nosniff`, no-referrer, restrictive permissions policy, CSP, and
`frame-ancestors 'none'` were present. The AVIF MIME defect is below.

## Deployment identity

The builder's earlier deployment-only failure is **not reproduced**.

- Live `/` and local `dist/site/index.html` both SHA-256:
  `038bf7986622bc0f33e2bf8eebaae0425222ebe94dfce305873896bb35c66f47`
- Live/local JS both SHA-256:
  `5eaba269e395abb3a42a0e237f6935782bd0a38eebce244791aeec3f154777af`
- Live/local CSS both SHA-256:
  `de6ec81a56366d27aad03e8bbdbfd22d457f1598a51b0b73e97debf2c299c44a`
- Live/local AVIF both SHA-256:
  `84dda5400884fd296de0f8c9f5ced112328ba4d29597e6a0c1ae4239e26f1af5`
- The local and live ZIP byte hashes differ because their entries carry build
  timestamps (03:38 vs 03:34), but both are 16,791 bytes and extraction plus
  `diff -qr` found no content difference. The manifest and every bundled file
  are identical.

This is not a library, CLI, backend, or PWA. Consumer install, concurrency,
persistence-boundary, health identity, and PWA update checks do not apply. The
site has no web app manifest and registered 0 service workers; the extension's
offline behavior was tested directly.

## Defects by severity

### P1 — Loading indicator is permanently visible and loops in idle/result/error states

**Reproduction:** Load the packaged extension, open its toolbar popup, and do
nothing. The three purple marks are visible under “Ready” and animate forever.
Run a successful check, clear it, or trigger the protected-page error; the
marks remain visible and animated.

**Exact evidence:** `#progress` has `hidden === true` but computed
`display: flex`, `visibility: visible`, and a 286×4 px rendered box. Its first
mark has `animation-name: pencil`, duration `0.9s`, and iteration count
`infinite`. The same `display:flex` was measured after the protected-page
error. `entrypoints/popup/style.css:78` overrides the HTML hidden state at
`entrypoints/popup/index.html:38`; application code correctly toggles
`progress.hidden` at `entrypoints/popup/main.ts:40,62` but CSS defeats it.

**Impact:** Ready, loading, success, and error are not visually distinct. A
motion cue falsely communicates that work is always in progress, and it loops
without a pause control. Reduced-motion users see static marks, but the state
misrepresentation remains.

**Expected:** A hidden progress region must compute to `display:none`; it
should appear and animate only while a check is actually pending.

### P2 — Live AVIF is served as generic binary data

`/assets/hero-notebook-KyRBVpV8.avif` returns
`Content-Type: application/octet-stream` instead of `image/avif` while also
sending `X-Content-Type-Options: nosniff`. Chrome 145 still decoded the asset
(`naturalWidth=1200`, `naturalHeight=800`), so this did not break the tested
experience, but the response metadata is incorrect and less portable. WebP,
JPEG, SVG, ZIP, HTML, robots, and sitemap types were correct.

## Required next steps

1. Ensure `[hidden]` wins for `.progress` (and add an automated computed-style
   regression for Ready, loading, success, cleared, and error states).
2. Serve `.avif` as `image/avif` and recheck the live response.
3. Re-run independent verification; all other tested release gates currently
   pass.
