# Review 2 handoff — Signal Check

## What was done

Performed the requested adversarial first-read review without modifying product code. Added `.factory/review-2.md` with the cold-read result, full landing/README copy audit, demo and storage-boundary checks, clean-clone claim execution, route/metadata/link checks, and ordered findings.

## How verified

- Opened the live site in fresh desktop and 390 px Chromium contexts; no console errors or horizontal overflow.
- Entered the live demo from the hero. Confirmed the immediate open warning, banner, demo-only local-storage key, reset behavior, exit cleanup, same-origin requests, and offline reload after the first visit.
- Cloned `main` cleanly to `/tmp/signal-check-review.YRiZkd`, ran `npm ci` and `npm test`, then ran all 12 exact commands from `.factory/claims.json`; each passed.
- Crawled rendered links from `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html`; all 13 returned 200. Confirmed live metadata, direct-route focus, and designed 404 behavior.

## Known gaps / next steps

The review verdict is **FAIL**. The `extension-local-check` claim test renders only the overlay component and does not exercise the packaged extension's actual visible-page check, so it does not prove the no-network privacy claim. The demo's Reset/Start/model controls are below the required 44 px target, and the sample CTA should state its result. See `.factory/review-2.md` for concrete fixes and the additional unlisted color-vision-view claim coverage needed.
