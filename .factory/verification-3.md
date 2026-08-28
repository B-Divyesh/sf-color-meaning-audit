# Independent verification 3 — FAIL

**Candidate:** `d2c8688bec821923b69f597f210e705c70f37b96` (`main`)

**Live URL:** https://color-meaning-audit.sociobot.in/

**Verified:** 2026-08-28 from a clean detached worktree with no pre-existing
`node_modules` or `dist`.

## Release decision

**FAIL.** The candidate repairs both blockers from verification 2, builds and
tests reproducibly, is deployed with correct response policies, and performs
the core local audit. Fresh end-to-end coverage nevertheless found two
release-blocking states outside the repository suite:

1. Screenshot/palette findings create invalid ARIA that axe 4.10.2 classifies
   as **serious**. This violates the non-negotiable requirement of zero
   serious/critical findings in the accessible overlay.
2. At the required 390 px viewport, “Locate these signals” scrolls and
   highlights the source underneath an opaque sheet covering essentially the
   entire viewport. Closing the sheet immediately removes those highlights, so
   the user cannot inspect the located cue.

No product code was changed during this verification.

## Clean-checkout gates

| Gate | Result | Fresh evidence |
| --- | --- | --- |
| Candidate and clean state | PASS | Detached worktree at exact SHA `d2c8688`; `node_modules` and `dist` absent before install. |
| Install | PASS | Node `v22.23.2`, npm `10.9.8`; `npm ci` added 262 packages and audited 263 with 0 vulnerabilities. |
| Full repository test | PASS | First `npm test` from the clean checkout passed type checking, 2 Vitest files / 5 tests, output verification, and Playwright: 9 passed / 1 intentional desktop skip. |
| Type/lint | PASS | `npm run typecheck` (`wxt prepare && tsc --noEmit`) passed inside `npm test`. No lint script or lint configuration exists. |
| Exact production build | PASS | A separate `npm run build` passed and rebuilt extension, site, and ZIP after cleaning `dist`. |
| Package integrity | PASS | `unzip -t dist/site/downloads/signal-check-chrome.zip` found no errors; `npm audit --omit=dev` found 0 vulnerabilities. |

The prior clean-test defect remains repaired: the first test run creates every
fixture it consumes. The prior progress defect also remains repaired: ready,
success, cleared, and error states compute to `display:none`; only the finite
pending state displays/animates the marks. Reduced motion disables that
animation. The deployed AVIF now correctly returns `Content-Type: image/avif`.

## Independent product exercise

The unpacked production MV3 extension was loaded in Chrome for Testing 145 and
invoked through the real `Alt+Shift+S` browser action against real tabs. Audit
logic was not stubbed.

| Scenario | Result | Evidence |
| --- | --- | --- |
| Live DOM signal | PASS | With the live sample board visible, deutan returned **1 signal to verify**, named Billing handshake and Token refresh, and made no HTTP(S) request during the check. |
| Locate and close | PASS on desktop | Keyboard Enter highlighted exactly 2 source marks. Escape removed the dialog, highlights, and temporary IDs. |
| Screenshot-only content | PASS functionally / **FAIL a11y** | Canvas-only red/green blocks produced local palette findings and alternate-cue guidance, but those findings trigger the serious axe defect below. |
| Comparison choice | PASS | Radio-arrow navigation selected and persisted tritan; a tritan-convergent pair produced a correctly labelled tritan overlay. |
| Invalid persisted value | PASS | An unknown stored `visionModel` recovered to the default deutan selection and a subsequent audit succeeded. |
| Empty state | PASS | A page without colored signals returned the honest “No likely color-only signals found” result and visible-area caveat. |
| Boundary / alternate cue | PASS | Same-shape 6×6 px marks flagged; 5×5 px marks did not; a 6×6 circle/square pair did not. |
| Protected page / recovery | PASS | `chrome://settings/` produced the actionable protected-page error with enabled Check button and hidden progress; the next website audit succeeded. |
| Offline | PASS | With the inspected tab network-offline, the real screenshot/DOM audit still completed locally. The repository regression also verifies the offline notice. |
| Local persistence | PASS | Default audit stored only `{lastResult:{count,at}}`; model selection added only `visionModel`; keyboard “Clear last check” removed `lastResult`. No screenshot or page text persisted. |
| 390×844 layout | **FAIL locate action** | Sheet bounds were x=6, width=378, height=828. A located signal center at (95, 134.875) remained inside/behind the opaque sheet bounds (6,8)–(384,836); closing the sheet removed the highlight. |
| Reduced motion | PASS | Popup transition duration was `0s`, popup scan animation was `none`, and the injected sheet animation was `none`. |
| Runtime | PASS | Normal exercised flows produced 0 unexpected console errors, 0 page errors, and 0 unexpected failed requests; the deliberate offline transition was excluded. |

## Accessibility and visual QA

- Live `/`, `/privacy/`, and `/terms/` at desktop and exact 390×844 had 0
  serious/critical axe findings. The packaged popup also had 0. All routes have
  `lang=en`, one h1, one main, labelled controls, and no image missing `alt`.
- `/opt/fleet/lib/verify-url.sh` passed: HTTPS 200, 841 ms network-idle load,
  descriptive title, `lang=en`, one h1, main landmark, 0 missing alt text, 0
  unlabelled buttons, and 0 console/page errors.
- Keyboard activation works for the browser shortcut, model radio group, Check,
  Clear, Locate, and Escape close. Focus indicators are visible 3 px amber
  outlines. Controls exercised in the popup and overlay meet the 44 px target.
- Desktop and mobile full-page visual review found the authored notebook design,
  clear hierarchy, intentional responsive stacking, legible content, and no
  horizontal overflow (`scrollWidth === clientWidth`: 1440 and 390).
- The screenshot-result overlay fails axe as described below. Site-only
  Lighthouse accessibility therefore does not clear the extension overlay.

## Privacy and permissions

- The shipped manifest requests only `activeTab`, `scripting`, and `storage`,
  with no host permissions. MV3 default CSP permits no remote script.
- The live real-tab check created 0 HTTP(S) requests. Source and built-output
  review found no analytics, telemetry, beacon, WebSocket, or remote runtime
  endpoint. Screenshot decoding fetches only its in-memory `data:` URL.
- Live desktop/mobile sessions requested only the first-party origin and created
  no cookies, local/session storage, or service-worker registrations.
- The observed storage boundary and local screenshot disposal match `/privacy/`.

## Performance and response policy

Lighthouse 12.8.2 mobile at `2026-08-28T04:33:48Z` reported:

| Category / metric | Result |
| --- | --- |
| Performance / accessibility / best practices / SEO | **99 / 100 / 100 / 100** |
| FCP / LCP / Speed Index | 0.88 s / 1.07 s / 0.92 s |
| Total blocking time / CLS | 113 ms / 0 |
| Total transfer | 35,182 bytes |

Budgets pass: site JS 1,172 B, CSS 10,788 B, no webfonts, mobile hero WebP
24,818 B, AVIF 27,044 B, extension JS 13,253 B total, extension CSS 3,395 B,
and unpacked extension 26.61 KB.

HTTP redirects to HTTPS. HTML and ZIP use `public, max-age=0,
must-revalidate`; fingerprinted JS/CSS/images use `public,
max-age=31536000, immutable`; an ETag conditional asset request returned 304.
Responses include HSTS, `nosniff`, `no-referrer`, restrictive permissions
policy, CSP, and `frame-ancestors 'none'`. AVIF and ZIP media types are correct.

## Deployment identity

The builder's earlier deployment-only failure is **not reproduced**. Live and
candidate production output are byte-identical for:

- HTML: `038bf7986622bc0f33e2bf8eebaae0425222ebe94dfce305873896bb35c66f47`
- JavaScript: `5eaba269e395abb3a42a0e237f6935782bd0a38eebce244791aeec3f154777af`
- CSS: `de6ec81a56366d27aad03e8bbdbfd22d457f1598a51b0b73e97debf2c299c44a`
- AVIF: `84dda5400884fd296de0f8c9f5ced112328ba4d29597e6a0c1ae4239e26f1af5`

The local/live ZIP byte hashes differ because regenerated entries carry build
timestamps, but both are 16,806 bytes and extraction plus `diff -qr` found no
content difference. Every manifest and extension payload file matches.

## Defects by severity

### P1 — Screenshot-result swatches have prohibited ARIA and fail axe serious

**Reproduction:** Load the packaged extension, open a page whose ambiguity is
present only in a canvas/screenshot, run a check, then run axe 4.10.2 against
the page including the open shadow-DOM overlay.

**Observed:** axe reports `aria-prohibited-attr`, impact **serious**. Each
palette finding is emitted at `src/audit.ts:256` as a roleless
`<div class="swatches" aria-label="Compared colors …">`. The independent 390
px run produced three affected generated swatch groups after the page's
screenshot colors were sampled. Axe reports: “aria-label attribute cannot be
used on a div with no valid role attribute.”

**Impact:** The attempted text alternative for the color comparison uses
invalid semantics and may be ignored by assistive technology. This is exactly
the screenshot-only result path required by the researched brief and violates
the acceptance rule that accessible overlays have zero serious/critical axe
findings.

**Expected:** Give the swatch group valid semantics (for example, an
appropriate role with an accessible name, or equivalent visible/screen-reader
text) and add an axe regression using a non-empty palette result.

### P1 — Locate action is unusable at the required 390 px viewport

**Reproduction:** At 390×844, audit two visible ambiguous marks, activate
“Locate these signals” with Enter, and inspect the highlighted source.

**Observed:** The opaque sheet occupies x=6–384 and y=8–836 (378×828). The
located mark center was (95, 134.875), entirely behind that sheet. The sheet is
not movable despite the design contract. Closing it removes the highlight, so
there is no state in which the user can see the located highlight.

**Impact:** The core recovery action cannot show the source cue in a narrow
window, including the required mobile viewport. The user receives a warning
but cannot use the product's promised pointer back to the signal.

**Expected:** Provide a narrow-layout interaction that exposes the highlighted
page (for example, minimize/move the sheet or retain the highlight after a
reversible dismissal) and regression-test that the located element is visible.

## Scope notes

- This is not a library, CLI, backend, or PWA. Consumer-package,
  concurrency/health/persistence, and PWA update/offline-reload checks do not
  apply. The static site intentionally registers no service worker; the actual
  extension's offline audit was tested.
- The proposed 20-chart user-success benchmark has no repository artifact and
  was not independently reproduced in this engineering verification.

## Required next steps

1. Repair palette-swatch semantics and add axe coverage for a screenshot-only
   non-empty result.
2. Make Locate expose its highlighted source at 390 px and other narrow
   viewports; test the complete locate/inspect/return flow.
3. Repeat independent verification against the repaired commit and deployment.
