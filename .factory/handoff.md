# Signal Check — adversarial review 5 handoff

## Outcome

Review 5 is complete at base `8bd8e0e52c61a1cb3304131b93230e1a12356fcb`. The verdict is **FAIL** with 11 findings in `.factory/review-5.md`. Product code was not changed.

Two findings are blocking. The demo banner and its boundary controls scroll out of view, reopening `R1-DEMO-SANDBOX`; **Start for real** removes demo state but only returns to the landing page instead of beginning installation or real use. The remaining findings cover one unlisted “safe” claim, the missing first-screen privacy fact, one contextless heading, one marketing label, and five plain-language issues in the README.

## Verification performed

- Opened the live home and demo cold in fresh 390×844 and 1440×900 Chromium contexts; captured evidence under `.factory/evidence/review-5/`.
- Ran the live site Playwright suite: 18 passed, 8 intentional duplicate claim checks skipped.
- Ran Axe on home, demo, privacy, terms, and 404 at 390 px: zero violations on every route.
- Crawled all rendered internal, asset, download, source, and issue links: all returned 200. An unknown route returned the designed page with HTTP 404.
- Confirmed demo-only localStorage, Reset preservation of a real sentinel, demo-state removal on exit, same-origin requests, and offline reload.
- Created a clean clone at `/tmp/signal-check-review-5-gmuq0D/repo`; `npm ci` reported zero vulnerabilities.
- Ran `npm test`: 7 unit tests and 29 browser tests passed; 15 intentional duplicate mobile claim checks skipped.
- Ran each of the 14 exact `.factory/claims.json` commands independently: all passed.
- Ran `npm run build`: `dist/extension`, `dist/site`, and the extension ZIP were produced.
- Compared the deployed and rebuilt extension archives: all entry names and per-file hashes match. Outer archive hashes differ because ZIP timestamps differ.

## Next steps

Apply the concrete fixes in F-5-1 through F-5-11, add the scroll-persistence and real-destination assertions described in the review, then repeat the full review from fresh contexts and a clean clone. No deployment, infrastructure, DNS, or billing action was taken.
