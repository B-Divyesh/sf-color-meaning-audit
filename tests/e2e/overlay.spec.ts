import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { scanAndShowOverlay, type PaletteFinding, type VisionModel } from '../../src/audit';

async function showOverlay(page: Page, palette: PaletteFinding[], model: VisionModel): Promise<unknown> {
  return page.evaluate(({ source, findings, comparison }) => {
    const scan = new Function(`return (${source})`)() as (items: PaletteFinding[], selected: VisionModel) => unknown;
    return scan(findings, comparison);
  }, { source: scanAndShowOverlay.toString(), findings: palette, comparison: model });
}

test.beforeEach(({}, testInfo) => {
  if (testInfo.project.name === 'mobile' && testInfo.title.includes('@claim:')) {
    test.skip(true, 'Claim contracts run once in the desktop clean-state sandbox.');
  }
});

test('@claim:extension-check-notes opens accessible check notes with an alternate cue', async ({ page }) => {
  await page.goto('/');
  await showOverlay(page, [{ colorA: '#c04040', colorB: '#409060', confidence: 61, share: 48 }], 'deutan');

  const overlay = page.locator('#signal-check-overlay-host');
  await expect(overlay.locator('.swatches')).toHaveAttribute('role', 'img');
  await expect(overlay.getByRole('img', { name: 'Compared colors #c04040 and #409060' })).toBeVisible();
  await expect(overlay.getByText(/Seek a label, shape, pattern, or written value/i)).toBeVisible();

  const results = await new AxeBuilder({ page }).include('#signal-check-overlay-host').analyze();
  expect(results.violations.filter(({ impact }) => ['serious', 'critical'].includes(impact || ''))).toEqual([]);
});

test('@claim:extension-local-check uses no HTTP requests while it builds check notes', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.setContent('<main><span class="dot" style="display:block;width:24px;height:24px;background:rgb(192,64,64)"></span><span class="dot" style="display:block;width:24px;height:24px;background:rgb(64,144,96)"></span></main>');
  await showOverlay(page, [], 'deutan');
  expect(requests.filter((url) => /^https?:/.test(url))).toEqual([]);
});

test('narrow Locate keeps the highlighted source visible and lets people return to the notes', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'narrow-layout regression');
  await page.setContent(`
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { min-height: 1800px; margin: 0; }
      .status { display: flex; gap: 10px; margin: 110px 0 0 78px; }
      .dot { display: inline-block; width: 24px; height: 24px; border-radius: 50%; }
      .red { background: rgb(192, 64, 64); }
      .green { background: rgb(64, 144, 96); }
    </style>
    <main><ul class="status"><li><span class="dot red"></span>Billing handshake</li><li><span class="dot green"></span>Token refresh</li></ul></main>
  `);
  await showOverlay(page, [], 'deutan');

  const overlay = page.locator('#signal-check-overlay-host');
  await overlay.getByRole('button', { name: 'Locate these signals' }).press('Enter');

  const returnToNotes = overlay.getByRole('button', { name: 'Return to Signal Check notes' });
  await expect(returnToNotes).toBeVisible();
  await expect(overlay.locator('.sheet')).toBeHidden();
  await expect(page.locator('.dot.red')).toHaveAttribute('data-signal-check-highlighted', 'true');
  await expect(page.locator('.dot.green')).toHaveAttribute('data-signal-check-highlighted', 'true');

  const bounds = await page.evaluate(() => {
    const source = document.querySelector('.dot.red')!.getBoundingClientRect();
    const control = document.querySelector('#signal-check-overlay-host')!.shadowRoot!.querySelector('.return')!.getBoundingClientRect();
    return { source: source.toJSON(), control: control.toJSON(), viewportHeight: innerHeight };
  });
  expect(bounds.source.top).toBeGreaterThanOrEqual(0);
  expect(bounds.source.bottom).toBeLessThanOrEqual(bounds.viewportHeight);
  expect(bounds.source.bottom <= bounds.control.top || bounds.source.top >= bounds.control.bottom).toBeTruthy();

  await returnToNotes.press('Enter');
  await expect(overlay.locator('.sheet')).toBeVisible();
  await expect(page.locator('.dot.red')).toHaveAttribute('data-signal-check-highlighted', 'true');
  await page.keyboard.press('Escape');
  await expect(overlay).toHaveCount(0);
  await expect(page.locator('.dot.red')).not.toHaveAttribute('data-signal-check-highlighted');
});
