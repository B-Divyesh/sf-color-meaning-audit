import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const expectedOrigin = process.env.PLAYWRIGHT_BASE_URL
  ? new URL(process.env.PLAYWRIGHT_BASE_URL).origin
  : 'http://127.0.0.1:4173';

test.beforeEach(({}, testInfo) => {
  if (testInfo.project.name === 'mobile' && testInfo.title.includes('@claim:')) {
    test.skip(true, 'Claim contracts run once in the desktop clean-state sandbox.');
  }
});

test('@claim:free-download downloads the packaged extension directly', async ({ page }) => {
  await page.goto('/');
  const response = await page.request.get('/downloads/signal-check-chrome.zip');
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('application/zip');
  expect((await response.body()).subarray(0, 4)).toEqual(Buffer.from([0x50, 0x4b, 0x03, 0x04]));
});

test('@claim:no-account-screen opens the sample without sign-in or form fields', async ({ page }) => {
  await page.goto('/demo/?demo=1');
  await expect(page.getByText('Demo — sample data, nothing is saved to your real checks.')).toBeVisible();
  await expect(page.locator('input[type="password"], input[autocomplete="username"], form')).toHaveCount(0);
});

test('@claim:demo-warning opens the real check-note overlay on sample status data', async ({ page }) => {
  await page.goto('/demo/?demo=1');
  const overlay = page.locator('#signal-check-overlay-host');
  await expect(overlay).toBeVisible();
  await expect(overlay.getByRole('dialog')).toBeVisible();
  await expect(overlay.getByRole('heading', { level: 2 })).toHaveText(/signal to verify/i);
  await expect(overlay.getByText('Two nearby signals may look alike', { exact: false })).toBeVisible();
  await expect(overlay.getByText('No nearby text label was found. Look for a shape, line pattern, position, or written value before acting.', { exact: true })).toBeVisible();
  await expect(overlay.getByText(/Billing handshake.*Token refresh.*may look alike/i)).toHaveCount(0);
  await expect(overlay.getByText(/legend has words/i)).toHaveCount(0);
  await expect(overlay.getByRole('button', { name: 'Locate these signals' })).toBeVisible();
});

test('@claim:demo-isolation keeps sample state in a demo namespace', async ({ page }) => {
  await page.goto('/demo/?demo=1');
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys).toEqual(['demo:signal-check:sample-state']);
  expect(keys.some((key) => !key.startsWith('demo:'))).toBeFalsy();
});

test('@claim:demo-reset removes and recreates only sample state', async ({ page }) => {
  await page.goto('/demo/?demo=1');
  await page.evaluate(() => localStorage.setItem('real:signal-check:sentinel', 'kept'));
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByText('Demo reset. The sample warning is open again.')).toBeVisible();
  const state = await page.evaluate(() => ({ demo: localStorage.getItem('demo:signal-check:sample-state'), real: localStorage.getItem('real:signal-check:sentinel') }));
  expect(state.demo).toBeTruthy();
  expect(state.real).toBe('kept');
});

test('@claim:demo-exit discards sample state when starting for real', async ({ page }) => {
  await page.goto('/demo/?demo=1');
  await page.getByRole('link', { name: 'Start for real' }).click();
  await expect(page).toHaveURL(/\/$/);
  expect(await page.evaluate(() => localStorage.getItem('demo:signal-check:sample-state'))).toBeNull();
});

test('@claim:demo-first-party requests only this site during the demo flow', async ({ page }) => {
  const origins = new Set<string>();
  page.on('request', (request) => {
    if (/^https?:/.test(request.url())) origins.add(new URL(request.url()).origin);
  });
  await page.goto('/demo/?demo=1');
  await page.getByRole('button', { name: 'Reset demo' }).click();
  expect([...origins]).toEqual([expectedOrigin]);
});

test('@claim:demo-offline reloads the sample after its first visit', async ({ context, page }) => {
  await page.goto('/demo/?demo=1');
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
  await page.reload();
  await expect(page.locator('#signal-check-overlay-host')).toBeVisible();
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'A warning is already open.' })).toBeVisible();
  await expect(page.locator('#signal-check-overlay-host')).toHaveAttribute('role', 'dialog');
  await expect(page.getByText('Demo — sample data, nothing is saved to your real checks.')).toBeVisible();
  await expect(page.getByText('No nearby text label was found. Look for a shape, line pattern, position, or written value before acting.', { exact: true })).toBeVisible();
  await context.setOffline(false);
});

test('routes provide titles, metadata, focus, and an explicit not-found page', async ({ page }) => {
  const routes = [
    ['/', 'Signal Check — check color-only meaning'],
    ['/demo/', 'Demo — Signal Check'],
    ['/privacy/', 'Privacy — Signal Check'],
    ['/terms/', 'Terms — Signal Check'],
    ['/404.html', 'Page not found — Signal Check'],
  ] as const;
  for (const [path, title] of routes) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('main')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
    if (path === '/demo/') await expect(page.locator('#signal-check-overlay-host').getByRole('dialog')).toBeFocused();
    else await expect(page.locator('h1')).toBeFocused();
  }
  await expect(page.getByRole('heading', { name: /not in this notebook/i })).toBeVisible();
});

test('main, demo, legal, and not-found pages have no serious accessibility findings', async ({ page }, testInfo) => {
  for (const path of ['/', '/demo/', '/privacy/', '/terms/', '/404.html']) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact || ''));
    expect(serious, `${path} accessibility violations in ${testInfo.project.name}`).toEqual([]);
  }
});

test('responsive layout has no horizontal overflow and keeps every core target at least 44px', async ({ page }) => {
  await page.goto('/demo/?demo=1');
  const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client);
  await expect(page.getByRole('button', { name: 'Reset demo' })).toBeVisible();
  for (const locator of [
    page.locator('.site-header .brand'),
    page.locator('.site-footer .brand'),
    page.getByRole('link', { name: 'Terms' }),
    page.getByRole('button', { name: 'Reset demo' }),
    page.getByRole('link', { name: 'Start for real' }),
    page.getByRole('radio', { name: 'Red-green' }).locator('..'),
    page.getByRole('radio', { name: 'Blue-yellow' }).locator('..'),
  ]) {
    const box = await locator.first().boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
    expect(box?.width).toBeGreaterThanOrEqual(44);
  }
  const boundaryControls = await page.getByRole('button', { name: 'Reset demo' }).evaluate((element) => {
    const resetBox = element.getBoundingClientRect();
    const startBox = document.querySelector<HTMLElement>('#start-real')!.getBoundingClientRect();
    const overlayBox = document.querySelector<HTMLElement>('#signal-check-overlay-host')!.getBoundingClientRect();
    return {
      resetBottom: resetBox.bottom,
      startBottom: startBox.bottom,
      overlayTop: overlayBox.top,
    };
  });
  expect(boundaryControls.overlayTop).toBeGreaterThanOrEqual(boundaryControls.resetBottom + 7);
  expect(boundaryControls.overlayTop).toBeGreaterThanOrEqual(boundaryControls.startBottom + 7);
});

test('primary demo wording names its result and the query entry opens the isolated route', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-lede')).toHaveText('For people with color-vision differences who need to act, check charts and dashboards for meaning carried only by color.');
  const sample = page.getByRole('link', { name: 'Try sample data — see a color-only warning' });
  await expect(sample).toBeVisible();
  await sample.click();
  await expect(page).toHaveURL(/\/demo\/\?demo=1$/);
  await expect(page.getByText('Demo — sample data, nothing is saved to your real checks.')).toBeVisible();

  await page.goto('/?demo=1');
  await expect(page).toHaveURL(/\/demo\/\?demo=1$/);
  await expect(page.locator('#signal-check-overlay-host')).toBeVisible();
});

test('real links, reload, and browser Back preserve route titles and heading focus', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Privacy' }).first().click();
  await expect(page).toHaveURL(/\/privacy\/$/);
  await expect(page).toHaveTitle('Privacy — Signal Check');
  await expect(page.locator('h1')).toBeFocused();
  await page.reload();
  await expect(page.locator('h1')).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page).toHaveTitle('Signal Check — check color-only meaning');
  await expect(page.locator('h1')).toBeFocused();

  for (const name of ['Privacy', 'Terms']) {
    await expect(page.locator('.site-footer').getByRole('link', { name })).toHaveAttribute('href', `/${name.toLowerCase()}/`);
  }
});
