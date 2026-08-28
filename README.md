# Signal Check

Signal Check is a private, local-first Chromium extension for color-blind knowledge workers. It checks the visible page for chart legends, status marks, and repeated colors that may rely on hue alone, then opens an accessible overlay explaining which alternate cue—label, shape, pattern, value, or position—to seek before acting.

It is advisory, not a medical test or accessibility certification. The extension never uploads the visible-tab capture or page content.

## What ships

- A WXT + TypeScript Manifest V3 extension with deutan, protan, and tritan comparisons.
- DOM/SVG signal inspection plus downsampled visible-screenshot palette analysis.
- A keyboard and screen-reader accessible field-note overlay; `Escape` closes it and “Locate these signals” outlines the relevant marks.
- Local preferences and last-result count, with a one-click clear action.
- A responsive static landing site, interactive sample, privacy policy, terms, optimized original artwork, and downloadable extension ZIP.

## Requirements

- Node.js 22+
- npm 10+
- Chromium for Playwright tests (the factory image provides version 1.58.2 browsers)

## Develop and verify

```bash
npm install
npm run dev          # WXT extension development
npm run dev:site     # landing site development
npm test             # clean dist + unit + packaged ZIP + Chromium desktop/mobile + axe checks
npm run build        # exact production build command
```

`npm run build` creates:

- `dist/extension/chrome-mv3/` — unpacked extension
- `dist/site/` — static deployment root (including `index.html`)
- `dist/site/downloads/signal-check-chrome.zip` — packaged extension

## Install the extension locally

1. Run `npm run build`.
2. Open `chrome://extensions` or `edge://extensions`.
3. Enable Developer mode, choose **Load unpacked**, and select `dist/extension/chrome-mv3`.
4. Open a chart or status page and choose Signal Check from the toolbar, or press `Alt+Shift+S` (`Control+Shift+S` on macOS).
5. Choose a comparison and press **Check this page**.

Chromium blocks extensions on internal pages such as `chrome://`; Signal Check explains this in the popup. Local `file://` pages require the browser’s “Allow access to file URLs” toggle.

## Privacy and permissions

The extension requests only `activeTab`, `scripting`, and `storage`. A visible-tab JPEG is downsampled and analyzed in memory, then discarded. Page contents are not sent over the network or stored. Only the selected comparison plus the last result count/time remain in browser-local extension storage. The website has no analytics, cookies, remote fonts, or third-party runtime scripts.

See [privacy](site/privacy/index.html) and [terms](site/terms/index.html).

## Deployment

Deploy `dist/site` as a static site at `https://color-meaning-audit.sociobot.in`. The repository does not manage DNS, hosting, billing, or store submission. The included `staticwebapp.config.json` sets security headers and static routing defaults.
HTML and download responses revalidate on each request; Vite-fingerprinted `/assets/` files are served with a one-year immutable cache policy.

## Project notes

The researched product scope is in [.factory/brief.json](.factory/brief.json), the visual system and image provenance are in [.factory/design.md](.factory/design.md), and build verification is in [.factory/handoff.md](.factory/handoff.md).

Licensed under the [MIT License](LICENSE).
