# Signal Check — visual thesis

## Direction: the careful lab notebook

Signal Check should feel like a colleague has opened a ruled lab book beside the screen, circled the questionable signals, and written down what to verify. The material language is warm paper, graphite, blue-black ink, measurement ticks, and highlighter—not a generic accessibility dashboard. Decoration is useful: rules organize evidence, underlines indicate inspected items, and hand-drawn loops mark ambiguity.

This is intentionally a single light treatment. A warm opaque paper surface remains legible over any webpage and avoids the uncertainty of inheriting page theme colors. The browser popup and injected report use the same tokens.

## Palette

| Token | Value | Role |
| --- | --- | --- |
| `paper` | `#F6F0E3` | main background, like unbleached notebook stock |
| `paper-raised` | `#FFFDF6` | active sheets and fields |
| `ink` | `#172C35` | blue-black primary text |
| `ink-muted` | `#526269` | supporting text (7.1:1 on paper) |
| `rule` | `#B9C9C8` | notebook rules and separators |
| `graphite` | `#37474F` | outlines and secondary controls |
| `violet` | `#5B3F8C` | primary action; chosen to avoid the red/green axis |
| `violet-deep` | `#3E286B` | hover/focus and white-text contrast |
| `amber` | `#8A4B08` | caution with `!`/text, never alone |
| `red` | `#9A2F36` | errors with icon/text, never alone |
| `green` | `#286446` | confirmed states with check/text, never alone |

All text pairs meet WCAG AA. Color is never the only state carrier: every status includes a word and symbol.

## Type

- Interface and long-form: system humanist sans (`ui-sans-serif`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, sans-serif). It stays compact and highly legible inside browser chrome.
- Evidence annotations: `ui-monospace`, `SFMono-Regular`, `Consolas`, monospace. Used for numbered observations, values, and notebook labels—not paragraphs.
- Scale: 12 / 14 / 16 / 20 / 28 / 44 px, body never below 16 px on the landing page. Tabular figures for measured values.

No webfont is needed, keeping font payload at 0 KB and avoiding third-party requests.

## Spacing and shape

An 8 px base rhythm with 4 px for small optical corrections. Page measures cap at 1120 px; prose at 68 characters. Corners are restrained (2–10 px) like paper labels rather than pill-shaped SaaS controls. Borders are 1–2 px ink strokes. Touch targets are at least 44×44 px.

## Interaction grammar

- The one primary verb is **Check this page**.
- While scanning, three pencil marks advance to show real work.
- Results arrive as a numbered check-note list. Selecting a finding locates and outlines the source element on the page.
- Text counts as an alternate cue only when the mark has an explicit accessible name. Nearby row copy is evidence context, not a status label.
- The overlay is a movable paper sheet pinned to the upper-right; Escape closes it and focus returns to the launcher.
- Deficiency choice is a real radio group with plain-language options. The selected model changes the local comparison only and is never presented as a diagnosis.
- Helpful alternatives are concrete: read the adjacent label, look for a shape, compare position, or ask for a text value.

## Motion

Transitions last 160–220 ms and use opacity/translate only: the report sheet enters from its browser-toolbar origin, and findings expose their detail in place. No decorative or idle motion loops; pencil marks repeat only while a finite check is pending and disappear in every settled state. Under `prefers-reduced-motion: reduce`, transitions and animated scan marks become instantaneous while progress remains textual.

## Original asset plan and provenance

The landing hero uses one original generated editorial still: a top-down lab notebook in which two colored chart traces become deliberately ambiguous, while graphite labels, different line patterns, and a magnifying lens restore meaning. It explains the distinction between recoloring and checking meaning. UI icons and the logo are hand-authored SVG/CSS using simple geometric strokes.

**Prompt sheet**

- Use case: `illustration-story`
- Subject/world: an accessibility researcher’s open lab notebook beside a laptop edge; a hand-drawn chart with two confusing color traces, then differentiated with dashed/solid graphite lines and tiny geometric markers; magnifying lens nearby
- Materials: fibrous cream paper, graphite, blue-black fountain pen, translucent violet acetate, restrained amber highlighter
- Light/lens: soft north-window daylight, editorial top-down macro, gentle paper shadows, generous negative space
- Palette words: warm paper, blue-black ink, graphite, lab violet, amber annotation; deliberately muted red/green only inside the chart sample
- Negative list: no people, no hands, no readable text, no letters, no logos, no watermark, no neon gradient, no glossy 3D, no medical imagery, no fake browser UI

Generated with the factory Azure image model (`factory-image`) on 2026-08-28 using `/opt/fleet/lib/gen-image.sh`. The selected output is original project artwork under the repository MIT license. Source PNG and prompt sidecar are retained in `assets/src/`; optimized WebP is shipped in the static site.

The 1200×630 social card is a hand-composed crop of that same generated notebook still. The 180px Apple touch icon is a resized export of the hand-authored project mark. Neither introduces a third-party asset.
