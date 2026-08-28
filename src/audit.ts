export type VisionModel = 'deutan' | 'protan' | 'tritan';

export interface PaletteFinding {
  colorA: string;
  colorB: string;
  confidence: number;
  share: number;
}

export interface AuditResult {
  count: number;
  domCount: number;
  paletteCount: number;
}

type Rgb = [number, number, number];

const matrices: Record<VisionModel, number[][]> = {
  deutan: [[0.367, 0.861, -0.228], [0.28, 0.673, 0.047], [-0.012, 0.043, 0.969]],
  protan: [[0.152, 1.053, -0.205], [0.115, 0.786, 0.099], [-0.004, -0.048, 1.052]],
  tritan: [[1.256, -0.077, -0.179], [-0.078, 0.931, 0.148], [0.005, 0.691, 0.304]],
};

function clamp(value: number): number {
  return Math.max(0, Math.min(255, value));
}

export function simulateColor(rgb: Rgb, model: VisionModel): Rgb {
  const matrix = matrices[model];
  return [0, 1, 2].map((row) => clamp(Math.round(
    rgb[0] * matrix[row]![0]! + rgb[1] * matrix[row]![1]! + rgb[2] * matrix[row]![2]!,
  ))) as Rgb;
}

export function colorDistance(a: Rgb, b: Rgb): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

export function rgbToHex(rgb: Rgb): string {
  return `#${rgb.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
}

export function findAmbiguousPalette(
  imageData: ImageData,
  model: VisionModel,
  limit = 3,
): PaletteFinding[] {
  const buckets = new Map<string, { rgb: Rgb; count: number }>();
  let chromaticPixels = 0;

  for (let index = 0; index < imageData.data.length; index += 16) {
    const r = imageData.data[index]!;
    const g = imageData.data[index + 1]!;
    const b = imageData.data[index + 2]!;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max < 42 || min > 238 || max - min < 28) continue;
    chromaticPixels += 1;
    const rgb: Rgb = [Math.round(r / 32) * 32, Math.round(g / 32) * 32, Math.round(b / 32) * 32].map(clamp) as Rgb;
    const key = rgb.join(',');
    const bucket = buckets.get(key);
    if (bucket) bucket.count += 1;
    else buckets.set(key, { rgb, count: 1 });
  }

  if (!chromaticPixels) return [];
  const colors = [...buckets.values()]
    .filter((item) => item.count / chromaticPixels >= 0.008)
    .sort((a, b) => b.count - a.count)
    .slice(0, 16);

  const findings: PaletteFinding[] = [];
  for (let a = 0; a < colors.length; a += 1) {
    for (let b = a + 1; b < colors.length; b += 1) {
      const first = colors[a]!;
      const second = colors[b]!;
      const original = colorDistance(first.rgb, second.rgb);
      if (original < 64) continue;
      const simulated = colorDistance(simulateColor(first.rgb, model), simulateColor(second.rgb, model));
      const ratio = simulated / original;
      if (simulated < 72 && ratio < 0.58) {
        findings.push({
          colorA: rgbToHex(first.rgb),
          colorB: rgbToHex(second.rgb),
          confidence: Math.round((1 - ratio) * 100),
          share: Math.round(((first.count + second.count) / chromaticPixels) * 100),
        });
      }
    }
  }

  return findings.sort((a, b) => b.confidence * b.share - a.confidence * a.share).slice(0, limit);
}

export async function analyzeScreenshot(dataUrl: string, model: VisionModel): Promise<PaletteFinding[]> {
  const image = await createImageBitmap(await (await fetch(dataUrl)).blob());
  const scale = Math.min(1, 240 / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  const canvas = new OffscreenCanvas(width, height);
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('The local image checker could not start.');
  context.drawImage(image, 0, 0, width, height);
  image.close();
  return findAmbiguousPalette(context.getImageData(0, 0, width, height), model);
}

// This runs inside the active page. Keep it self-contained so Chrome can serialize it.
export function scanAndShowOverlay(palette: PaletteFinding[], model: VisionModel): AuditResult {
  const rootId = 'signal-check-overlay-host';
  const oldHost = document.getElementById(rootId);
  if (oldHost) oldHost.remove();
  const restoreHighlight = (node: Element) => {
    const element = node as HTMLElement;
    element.style.outline = element.getAttribute('data-signal-check-old-outline') || '';
    element.style.outlineOffset = element.getAttribute('data-signal-check-old-offset') || '';
    element.removeAttribute('data-signal-check-highlighted');
    element.removeAttribute('data-signal-check-old-outline');
    element.removeAttribute('data-signal-check-old-offset');
  };
  document.querySelectorAll('[data-signal-check-highlighted]').forEach(restoreHighlight);
  document.querySelectorAll('[data-signal-check-id]').forEach((node) => node.removeAttribute('data-signal-check-id'));

  const modelMatrices: Record<string, number[][]> = {
    deutan: [[0.367, 0.861, -0.228], [0.28, 0.673, 0.047], [-0.012, 0.043, 0.969]],
    protan: [[0.152, 1.053, -0.205], [0.115, 0.786, 0.099], [-0.004, -0.048, 1.052]],
    tritan: [[1.256, -0.077, -0.179], [-0.078, 0.931, 0.148], [0.005, 0.691, 0.304]],
  };
  const parse = (value: string): number[] | null => {
    const match = value.match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)/);
    return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
  };
  const simulate = (rgb: number[]): number[] => modelMatrices[model]!.map((row) => Math.max(0, Math.min(255,
    rgb[0]! * row[0]! + rgb[1]! * row[1]! + rgb[2]! * row[2]!,
  )));
  const distance = (a: number[], b: number[]) => Math.hypot(a[0]! - b[0]!, a[1]! - b[1]!, a[2]! - b[2]!);
  const visible = (element: Element, rect: DOMRect) => {
    const style = getComputedStyle(element);
    return style.visibility !== 'hidden' && style.display !== 'none' && Number(style.opacity) > 0 && rect.width >= 6 && rect.height >= 6 && rect.bottom >= 0 && rect.top <= innerHeight && rect.right >= 0 && rect.left <= innerWidth;
  };
  const labelFor = (element: Element): string => {
    const normalize = (value: string | null | undefined) => value?.replace(/\s+/g, ' ').trim().slice(0, 70) || '';
    const namedGraphic = element.closest('svg[aria-label], svg[aria-labelledby], [role="img"][aria-label], [role="img"][aria-labelledby]');
    const labelOwner = element.matches('[aria-label], [aria-labelledby], [title]') ? element : namedGraphic;
    if (!labelOwner) return '';

    const direct = normalize(labelOwner.getAttribute('aria-label') || labelOwner.getAttribute('title'));
    if (direct) return direct;

    const labelledBy = labelOwner.getAttribute('aria-labelledby')?.split(/\s+/).filter(Boolean) || [];
    return normalize(labelledBy.map((id) => document.getElementById(id)?.textContent || '').join(' '));
  };

  type Candidate = { element: Element; color: number[]; rect: DOMRect; round: boolean; label: string; id: string };
  const candidates: Candidate[] = [];
  const elements = [...document.body.querySelectorAll('*')].slice(0, 2500);
  for (const element of elements) {
    if (element.closest(`#${rootId}`)) continue;
    const rect = element.getBoundingClientRect();
    if (!visible(element, rect) || rect.width > 100 || rect.height > 100 || rect.width * rect.height > 8000) continue;
    const style = getComputedStyle(element);
    const isSvg = element instanceof SVGElement;
    const source = isSvg ? (style.fill !== 'none' ? style.fill : style.stroke) : style.backgroundColor;
    const rgb = parse(source);
    if (!rgb || Math.max(...rgb) - Math.min(...rgb) < 25) continue;
    const looksSignal = isSvg || /legend|status|badge|dot|swatch|key|traffic/i.test(element.className?.toString() || '') || rect.width <= 32 || rect.height <= 32;
    if (!looksSignal) continue;
    const id = `sc-${candidates.length}`;
    element.setAttribute('data-signal-check-id', id);
    candidates.push({ element, color: rgb, rect, round: parseFloat(style.borderRadius) >= Math.min(rect.width, rect.height) / 3, label: labelFor(element), id });
    if (candidates.length >= 100) break;
  }

  const domFindings: Array<{ a: Candidate; b: Candidate; title: string; detail: string }> = [];
  const used = new Set<string>();
  for (let a = 0; a < candidates.length; a += 1) {
    for (let b = a + 1; b < candidates.length; b += 1) {
      const first = candidates[a]!;
      const second = candidates[b]!;
      if (used.has(first.id) || used.has(second.id)) continue;
      const sizeRatio = Math.max(first.rect.width, second.rect.width) / Math.max(1, Math.min(first.rect.width, second.rect.width));
      const original = distance(first.color, second.color);
      const simulated = distance(simulate(first.color), simulate(second.color));
      const near = Math.hypot(first.rect.x - second.rect.x, first.rect.y - second.rect.y) < 640;
      if (sizeRatio <= 1.8 && first.round === second.round && near && original > 60 && simulated < 72 && simulated / original < .58) {
        const hasDistinctLabels = Boolean(first.label && second.label && first.label !== second.label);
        const names = hasDistinctLabels ? `“${first.label}” and “${second.label}”` : 'Two nearby signals';
        domFindings.push({
          a: first,
          b: second,
          title: `${names} may look alike`,
          detail: hasDistinctLabels
            ? 'Written labels are tied to these marks. Match the written label before acting.'
            : 'No nearby text label was found. Look for a shape, line pattern, position, or written value before acting.',
        });
        used.add(first.id); used.add(second.id);
        if (domFindings.length >= 4) break;
      }
    }
    if (domFindings.length >= 4) break;
  }

  const host = document.createElement('aside');
  host.id = rootId;
  const shadow = host.attachShadow({ mode: 'open' });
  const modelName = model === 'deutan' ? 'deutan (green-sensitive)' : model === 'protan' ? 'protan (red-sensitive)' : 'tritan (blue-sensitive)';
  const total = domFindings.length + palette.length;
  shadow.innerHTML = `
    <style>
      :host { all: initial; position: fixed; z-index: 2147483647; top: 16px; right: 16px; color: #172c35; font-family: ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; color-scheme: light; }
      * { box-sizing: border-box; }
      .sheet { width: min(390px, calc(100vw - 24px)); max-height: calc(100vh - 32px); overflow: auto; padding: 18px 18px 16px 38px; border: 2px solid #172c35; border-radius: 5px; background: repeating-linear-gradient(#fffdf6 0 31px,#c9d5d1 32px); box-shadow: 6px 7px 0 rgba(23,44,53,.28); }
      .sheet::before { content:""; position:absolute; left:25px; top:2px; bottom:2px; border-left:1px solid rgba(154,47,54,.45); }
      header { position: relative; display:flex; justify-content:space-between; gap:12px; align-items:start; }
      .eyebrow { margin:0 0 3px; color:#526269; font:700 11px/1.2 ui-monospace,SFMono-Regular,Consolas,monospace; letter-spacing:.08em; text-transform:uppercase; }
      h2 { margin:0; font-size:23px; line-height:1.15; }
      .summary { margin:14px 0; font-size:16px; line-height:1.5; }
      .note { margin:0 0 10px; padding:10px; border:1px solid #8fa3a1; background:rgba(255,253,246,.92); }
      .note h3 { margin:0 0 5px; font-size:16px; line-height:1.35; }
      .note p { margin:0; color:#37474f; font-size:16px; line-height:1.45; }
      .swatches { display:flex; gap:5px; margin-bottom:6px; }
      .swatch { width:28px; height:11px; border:1px solid #172c35; }
      button { min-width:44px; min-height:44px; border:2px solid #3e286b; border-radius:3px; background:#fffdf6; color:#3e286b; font:700 14px/1 ui-sans-serif,-apple-system,sans-serif; cursor:pointer; }
      button:hover { background:#eee7f7; }
      .locate { width:100%; margin-top:8px; }
      .return { position:relative; display:block; margin-left:auto; padding:0 14px; background:#5b3f8c; color:#fff; box-shadow:3px 3px 0 #172c35; }
      .return[hidden] { display:none; }
      .fine { margin:13px 0 0; color:#526269; font-size:12px; line-height:1.45; }
      :focus-visible { outline:3px solid #a65d0c; outline-offset:2px; }
      @media (max-width: 430px) {
        :host { inset:8px 6px auto; }
        :host([data-minimized]) { inset:auto 8px 8px auto; }
        .sheet { width:100%; max-height:calc(100vh - 16px); }
      }
      @media (prefers-reduced-motion:no-preference) { .sheet { animation:arrive 180ms ease-out; } @keyframes arrive { from { opacity:0; transform:translateY(-8px); } } }
    </style>
    <section class="sheet" role="dialog" aria-modal="false" aria-labelledby="sc-title" tabindex="-1">
      <header><div><p class="eyebrow">Signal Check · ${modelName}</p><h2 id="sc-title">${total ? `${total} signal${total === 1 ? '' : 's'} to verify` : 'No color-only signals found'}</h2></div><button class="close" type="button" aria-label="Close Signal Check">×</button></header>
      <p class="summary">${total ? 'These colors can become hard to tell apart in the color-vision view you chose. Use another cue before you act.' : 'The visible area did not contain a repeated color pair that our local check could confidently flag.'}</p>
      <div class="findings"></div>
      <p class="fine">A second check, not a diagnosis. Only the visible area was checked; charts drawn on canvas may need a text table or source labels.</p>
    </section>
    <button class="return" type="button" hidden>Return to Signal Check notes</button>`;

  const list = shadow.querySelector('.findings')!;
  const sheet = shadow.querySelector<HTMLElement>('.sheet')!;
  const returnButton = shadow.querySelector<HTMLButtonElement>('.return')!;
  const escape = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]!));
  domFindings.forEach((finding, index) => {
    const article = document.createElement('article');
    article.className = 'note';
    article.innerHTML = `<h3>${index + 1}. ${escape(finding.title)}</h3><p>${escape(finding.detail)}</p><button class="locate" type="button">Locate these signals</button>`;
    article.querySelector('button')!.addEventListener('click', () => {
      [finding.a.element, finding.b.element].forEach((element) => {
        const target = element as HTMLElement;
        if (!target.hasAttribute('data-signal-check-highlighted')) {
          target.setAttribute('data-signal-check-highlighted', 'true');
          target.setAttribute('data-signal-check-old-outline', target.style.outline);
          target.setAttribute('data-signal-check-old-offset', target.style.outlineOffset);
        }
        target.style.setProperty('outline', '4px solid #a65d0c', 'important');
        target.style.setProperty('outline-offset', '4px', 'important');
      });
      if (innerWidth <= 430) {
        host.setAttribute('data-minimized', 'true');
        sheet.hidden = true;
        returnButton.hidden = false;
        returnButton.focus({ preventScroll: true });
      }
      finding.a.element.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    });
    list.append(article);
  });
  palette.forEach((finding, index) => {
    const article = document.createElement('article');
    article.className = 'note';
    article.innerHTML = `<div class="swatches" role="img" aria-label="Compared colors ${escape(finding.colorA)} and ${escape(finding.colorB)}"><i class="swatch" aria-hidden="true" style="background:${escape(finding.colorA)}"></i><i class="swatch" aria-hidden="true" style="background:${escape(finding.colorB)}"></i></div><h3>${domFindings.length + index + 1}. Repeated page colors may merge</h3><p>These colors cover about ${finding.share}% of sampled color pixels. Seek a label, shape, pattern, or written value.</p>`;
    list.append(article);
  });

  returnButton.addEventListener('click', () => {
    host.removeAttribute('data-minimized');
    returnButton.hidden = true;
    sheet.hidden = false;
    sheet.focus();
  });
  const close = () => {
    document.querySelectorAll('[data-signal-check-highlighted]').forEach(restoreHighlight);
    document.querySelectorAll('[data-signal-check-id]').forEach((node) => node.removeAttribute('data-signal-check-id'));
    host.remove();
  };
  shadow.querySelector('.close')!.addEventListener('click', close);
  shadow.addEventListener('keydown', (event) => { if ((event as KeyboardEvent).key === 'Escape') close(); });
  document.documentElement.append(host);
  sheet.focus();
  return { count: total, domCount: domFindings.length, paletteCount: palette.length };
}
