# Signal Check

Signal Check is a Chromium extension for people with color-vision differences who need to act on charts or status dashboards. It opens check notes that name another cue to use before acting.

Try the isolated sample at [`/demo/?demo=1`](https://color-meaning-audit.sociobot.in/demo/?demo=1). It opens a color-only status warning immediately. The sample has no account screen. Its state uses a `demo:` browser key. Resetting the demo recreates only that key.

## What ships

- A Chromium extension with red-green and blue-yellow color-vision views.
- Check notes that point to a label, shape, pattern, written value, or position.
- A static site with a sample audit, privacy policy, terms, and extension download.
- An offline demo shell after the first visit.

## Run and test

Node.js 22+ and npm 10+ are required. Chromium for Playwright is supplied by the factory image.

```bash
npm ci
npm run dev          # extension development
npm run dev:site     # site development
npm test             # typecheck, unit tests, clean build, browser and axe tests
npm run build        # creates dist/extension and dist/site
```

`npm run build` creates `dist/extension/chrome-mv3/`, `dist/site/`, and `dist/site/downloads/signal-check-chrome.zip`.

## Install the extension

1. Run `npm run build`.
2. Open `chrome://extensions` or `edge://extensions`.
3. Enable Developer mode.
4. Choose **Load unpacked** and select `dist/extension/chrome-mv3`.
5. Open a chart or status dashboard.
6. Choose Signal Check from the toolbar, then choose **Check this page**.

The extension stores the selected view and last result in browser-local extension storage. It does not request network resources while it builds check notes. See the [privacy policy](site/privacy/index.html) and [terms](site/terms/index.html).

## Claims and demo

Every visitor-facing claim appears in [.factory/claims.json](.factory/claims.json). Run each listed command from a clean checkout. The sample storage boundary and reset path are documented in [.factory/demo.md](.factory/demo.md).

## Deploy

Deploy `dist/site` as the static site for `https://color-meaning-audit.sociobot.in`. The work order performs deployment. `staticwebapp.config.json` supplies headers, route fallback, and the designed 404 response.

See [.factory/brief.json](.factory/brief.json) for scope, [.factory/design.md](.factory/design.md) for design provenance, and [.factory/handoff.md](.factory/handoff.md) for verification.

Licensed under the [MIT License](LICENSE).
