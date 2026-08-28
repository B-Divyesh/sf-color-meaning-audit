# Review 3 handoff — Signal Check

## Outcome

No product code was modified. The independent adversarial review is recorded in `.factory/review-3.md` and the release verdict is **FAIL**.

The blocking issue is semantic: the live demo calls service names a legend/status label and recommends them as an alternate cue, even though they do not state the meaning of the red/green dots. Two documentation/copy findings are also open: the hero does not use the required single audience-and-change sentence, and `.factory/copy-audit.md` omits current README prose.

## What was verified

- Cold published-site checks at 390x844 and 1440x900: job, audience, primary sample action, no horizontal overflow, and no console errors.
- The live `/demo/?demo=1` sandbox: open real overlay, persistent banner, Reset, Start for real, `demo:` isolation, retained non-demo sentinel, and same-origin-only request observation.
- Offline demo behavior through the tagged clean-clone claim test.
- All 13 exact `.factory/claims.json` commands from a new clone at `/tmp/signal-check-review-3-xH9TW9`: passed.
- `npm test` from that clean clone: passed (typecheck, 5 unit tests, build/package validation, and Playwright).
- Published route metadata, 404, direct/deep routes, focus, Back behavior, link crawl, headers/footer, and visual identity.

## How to reproduce

```sh
git clone /work/repo /tmp/signal-check-review-3-recheck
cd /tmp/signal-check-review-3-recheck
npm ci
npm test
```

Then open <https://color-meaning-audit.sociobot.in/demo/?demo=1> at 390px. The already-open dialog demonstrates F-3-1: it calls “Billing handshake” and “Token refresh” labels/legend text although neither says the state carried by the dots.

## Known gaps / next steps

1. Repair `labelFor()`/result wording and add packaged-extension tests for unrelated row text versus actual Ready/Blocked labels.
2. Replace the two hero support sentences with one <=22-word audience-and-change sentence.
3. Regenerate `.factory/copy-audit.md` from every current README sentence.
