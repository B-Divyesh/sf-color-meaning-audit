import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('landing page explains and demonstrates the product', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Signal Check/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Color should be a clue/);
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.locator('h1')).toHaveCount(1);

  await page.getByRole('button', { name: 'Deutan comparison' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Deutan comparison' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('heading', { name: /colors now nearly merge/i })).toBeVisible();

  const response = await page.request.get('/downloads/signal-check-chrome.zip');
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('application/zip');
  const archive = await response.body();
  expect(archive.byteLength).toBeGreaterThan(10_000);
  expect([...archive.subarray(0, 4)]).toEqual([0x50, 0x4b, 0x03, 0x04]);
});

test('main and legal pages have no serious accessibility findings', async ({ page }, testInfo) => {
  for (const path of ['/', '/privacy/', '/terms/']) {
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('main')).toHaveCount(1);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact || ''));
    expect(serious, `${path} accessibility violations in ${testInfo.project.name}`).toEqual([]);
  }
});

test('mobile layout has no horizontal overflow and keeps the primary action visible', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile-only assertion');
  await page.goto('/');
  const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client);
  await expect(page.getByRole('link', { name: /Download for Chromium/ })).toBeVisible();
});
