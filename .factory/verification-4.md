# Independent verification 4 — FAIL

**Candidate:** `50618434d790fed95dd5fcfb8df04d1153b4195b` (`main`)

**Live URL:** https://color-meaning-audit.sociobot.in/

**Verified:** 2026-08-28 from the exact clean candidate checkout, initially with
no `node_modules` or `dist`.

## Release decision

**FAIL.** The candidate builds reproducibly, the deployed site and extension
match it, the extension completes the researched local audit end to end, and
the prior screenshot-ARIA and narrow Locate blockers are repaired. Fresh
responsive inspection found one remaining acceptance-contract violation: the
landing site's home/brand links and footer Terms link are smaller than the
required 44×44 CSS px touch target. The header link is 147.69×35 px on desktop
and only **35×35 px at 390 px**; the footer brand link is 141.69×29 px and
Terms is 40.98×44 px. Touch targets of at least 44×44 px are part of the
supplied non-negotiable accessibility baseline, so the candidate does not
meet the full definition of done.

No product code was changed during verification.

## Clean-checkout gates

| Gate | Result | Fresh evidence |
| --- | --- | --- |
| Candidate / clean state | PASS | `HEAD` was exactly `50618434d790fed95dd5fcfb8df04d1153b4195b`; `git status` was clean; `node_modules` and `dist` were absent before install. |
| Install | PASS | Node `v22.23.2`, npm `10.9.8`; `npm ci` added 262 packages and audited 263 with 0 vulnerabilities. |
| Full repository test | PASS | `npm test` passed strict TypeScript checking, 2 Vitest files / 5 tests, production fixture verification, and Playwright: 12 passed / 2 intentional project-specific skips across desktop Chromium and exact 390×844 mobile. |
| Type / lint | PASS | `npm run typecheck` (`wxt prepare && tsc --noEmit`) passed inside `npm test`. No lint script or lint configuration exists. |
| Exact production build | PASS | A separate `npm run build` cleaned and rebuilt the WXT extension, Vite site, and ZIP. |
| Package / dependencies | PASS | `unzip -t` found no archive errors; the ZIP is 16,997 B; `npm audit --omit=dev` found 0 vulnerabilities. |
| Live regression suite | PASS | `PLAYWRIGHT_BASE_URL=https://color-meaning-audit.sociobot.in npm run test:e2e` → 12 passed / 2 intentional skips. |

## Independent product exercise

The unpacked production MV3 extension was loaded in Chrome for Testing 145 and
opened with its real `Alt+Shift+S` browser-action shortcut. The checks below
used the packaged code and actual `captureVisibleTab` / `executeScript` flow;
audit logic was not stubbed.

| Scenario | Result | Evidence |
| --- | --- | --- |
| Normal DOM signals | PASS | A repeated red/green status pair produced an overlay with four advisory notes (one DOM pair plus screenshot palette observations), a labelled dialog, and one Locate action. Locate highlighted exactly two source marks; Escape removed the overlay, highlights, and temporary attributes. |
| Screenshot-only ambiguity | PASS | A canvas-only red/green chart produced two locally sampled palette notes, no DOM Locate action, valid named `role="img"` swatches, and plain-language label/shape/pattern/value guidance. |
| Comparison choice | PASS | Keyboard arrow navigation selected and persisted `tritan`; a tritan-convergent pair produced an overlay labelled `tritan (blue-sensitive)`. |
| Invalid saved value | PASS | Injected invalid `visionModel` state recovered to the default deutan radio and the next real audit completed. |
| Empty state | PASS | A text-only page stored count 0 and opened the explicit `No color-only signals found` advisory state. |
| Boundary / alternate cue | PASS | Same-shape 6×6 px marks produced one DOM finding; 5×5 px marks produced none; a 6×6 circle/square pair produced none. |
| Protected page / recovery | PASS | `chrome://settings/` produced the actionable protected-page message, restored the Check button, and hid progress. A subsequent website check completed with the empty overlay. |
| Offline | PASS | Under browser network emulation, the popup showed `Offline. Checks still work locally.` and the actual visible-page audit still completed. |
| Local persistence / clear | PASS | A normal result stored only `{lastResult:{count,at}}`; model selection adds only `visionModel`. Clear removed `lastResult`; no screenshot, URL, or page text was retained. |
| 390×844 Locate flow | PASS | The sheet was x=6, width=363, height=828 with no page overflow. Locate collapsed it, retained two highlights, and exposed the source at y=110–134 while the 44 px Return control stayed at y=792–836. Return restored notes; Escape cleaned up. |
| Reduced motion | PASS | Popup scan animation computed to `none`, popup transitions to `0s`, and the injected sheet animation to `none`. |
| Runtime / outbound traffic | PASS | Exercised extension flows produced 0 page/console errors. Normal and screenshot-only real audits each produced 0 HTTP(S) requests during processing. |

## Accessibility and responsive QA

- Axe 4.10.2 found **0 serious/critical findings** on the live landing,
  privacy, and terms routes at desktop and 390×844; the packaged popup suite,
  real non-empty DOM overlay, and real screenshot-only overlay also returned 0.
- All live routes have `lang=en`, one h1, one main landmark, descriptive titles,
  and no image missing `alt`. The hero decoded successfully.
- Keyboard checks covered the visible skip link, sample button, popup radio
  arrows, Locate, Return, and Escape. The skip link appeared at y=12 with a 3 px
  focus outline and its next Tab entered main content. The overlay receives
  focus as a labelled `role=dialog`.
- Desktop and 390 px pages had no horizontal overflow. At 200% browser zoom the
  effective viewport was 195 CSS px; the h1, full body text, and primary
  download remained present (horizontal reflow is expected below the authored
  320 px minimum).
- Visual captures show the product-specific lab-notebook system, intentional
  phone stacking, readable hierarchy, original artwork, and no clipping.
- The undersized home links described under Defects remain a touch-access
  failure despite the otherwise clean axe and keyboard results.

## Privacy and permissions

- The shipped manifest requests only `activeTab`, `scripting`, and `storage`,
  with no host permissions. MV3's default extension CSP permits no remote
  script.
- Actual audits made 0 HTTP(S) requests. Source and built-output review found
  no analytics, telemetry, beacon, WebSocket, remote font, or remote runtime
  API; the only `fetch` consumes an in-memory `data:` screenshot.
- Each live page load made six requests, all to
  `https://color-meaning-audit.sociobot.in`; it created no cookies,
  local/session storage, or service-worker registration.
- The observed screenshot lifecycle, permissions, and stored fields agree
  with `/privacy/`.

## Performance, bundles, and response policy

Fresh Lighthouse 12.8.2 mobile results (`2026-08-28T06:00:09Z`):

| Category / metric | Result |
| --- | --- |
| Performance / accessibility / best practices / SEO | **100 / 100 / 100 / 100** |
| FCP / LCP / Speed Index | 1.01 s / 1.01 s / 1.01 s |
| Total blocking time / CLS | 0 ms / 0 |
| Total transfer | 35,164 B |
| Sample interaction latency | 24.7 ms desktop / 11.1 ms mobile |

Budgets pass: initial site JS 1,172 B, CSS 10,788 B, no webfonts, mobile hero
WebP 24,818 B / AVIF 27,044 B, extension JS 13,903 B total, and extension CSS
3,395 B. These are well below the supplied 200 KB JS, 50 KB CSS, 120 KB font,
and 300 KB hero limits.

HTTP redirects to HTTPS. HTML and ZIP use
`public, max-age=0, must-revalidate`; hashed JS/CSS/AVIF use
`public, max-age=31536000, immutable`; conditional requests returned 304.
Responses include HSTS, `nosniff`, `no-referrer`, a restrictive permissions
policy, CSP `default-src 'self'`, and `frame-ancestors 'none'`. AVIF and ZIP use
the correct MIME types.

## Deployment identity

The builder's earlier deployment-only failure is **not reproduced**. Local and
live hashes match exactly:

- HTML: `038bf7986622bc0f33e2bf8eebaae0425222ebe94dfce305873896bb35c66f47`
- JavaScript: `5eaba269e395abb3a42a0e237f6935782bd0a38eebce244791aeec3f154777af`
- CSS: `de6ec81a56366d27aad03e8bbdbfd22d457f1598a51b0b73e97debf2c299c44a`
- AVIF: `84dda5400884fd296de0f8c9f5ced112328ba4d29597e6a0c1ae4239e26f1af5`

Local and live ZIPs are both 16,997 B. Their archive-byte hashes differ only
because regenerated ZIP entries carry timestamps; extracting both and running
`diff -qr` found no content difference, so every shipped manifest and
extension payload file matches the candidate.

## Defects by severity

No P0 or P1 defects were found.

### P2 — Landing links miss the required 44×44 px target size

**Reproduction:** Open the live landing page at 1440×900 or 390×844 and measure
the anchors matching `a.brand`.

**Observed:** The header home link is 147.69×35 px at desktop. At 390 px, its
text is intentionally hidden and the complete target becomes 35×35 px at
(14,16). The footer home link is 141.69×29 px in both layouts. The visible
footer Terms link is 40.98×44 px. Visible focus styling and accessible names
are correct, but these clickable boxes remain below the required geometry.

**Impact:** Users with limited dexterity or touch precision get materially
smaller home targets than the attached accessibility and design contracts
permit. Automated axe does not flag this CSS geometry issue.

**Expected:** Give each `.brand` anchor and the narrow Terms link a minimum
44×44 px hit area (or equivalent padding/pseudo hit area that is part of the
anchor) at every breakpoint while preserving the current visual size.

## Scope notes

- This is not a library, CLI, backend, or PWA. Consumer-package,
  backend concurrency/health, and PWA update tests do not apply. The static
  site intentionally registers no service worker; the extension's offline
  behavior was exercised directly.
- The researched 20-chart human success benchmark has no repository artifact
  and was not reproduced as an engineering test.

## Required next step

Increase the header/footer brand and Terms hit areas to at least 44×44 CSS px,
add desktop/mobile geometry regression coverage, deploy, and repeat focused
verification.
