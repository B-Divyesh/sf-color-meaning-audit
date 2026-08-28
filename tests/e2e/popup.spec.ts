import AxeBuilder from '@axe-core/playwright';
import { expect, test, chromium, type BrowserContext, type Page } from '@playwright/test';
import { resolve } from 'node:path';

const extensionPath = resolve('dist/extension/chrome-mv3');

async function openPackagedPopup(): Promise<{ context: BrowserContext; popup: Page }> {
  const context = await chromium.launchPersistentContext('', {
    channel: 'chromium',
    headless: true,
    viewport: { width: 390, height: 844 },
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
    ],
  });
  let worker = context.serviceWorkers()[0];
  if (!worker) worker = await context.waitForEvent('serviceworker');
  const extensionId = new URL(worker.url()).host;
  const popup = await context.newPage();
  await popup.goto(`chrome-extension://${extensionId}/popup.html`);
  return { context, popup };
}

async function expectProgress(popup: Page, visible: boolean): Promise<void> {
  const progress = popup.locator('#progress');
  await expect(progress).toHaveJSProperty('hidden', !visible);
  await expect(progress).toHaveCSS('display', visible ? 'flex' : 'none');
  if (visible) {
    await expect(progress.locator('i').first()).toHaveCSS('animation-name', 'pencil');
    await expect(progress.locator('i').first()).toHaveCSS('animation-iteration-count', 'infinite');
  }
}

test('packaged popup shows progress only while a check is pending', async () => {
  const { context, popup } = await openPackagedPopup();
  try {
    // Ready state.
    await expect(popup.getByText('Ready.', { exact: true })).toBeVisible();
    await expectProgress(popup, false);
    const dimensions = await popup.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    const axeResults = await new AxeBuilder({ page: popup }).analyze();
    expect(axeResults.violations.filter(({ impact }) => ['serious', 'critical'].includes(impact || ''))).toEqual([]);

    await context.setOffline(true);
    await expect(popup.getByText('Offline. Checks still work locally.')).toBeVisible();
    await context.setOffline(false);
    await expect(popup.getByText('Offline. Checks still work locally.')).toBeHidden();

    await popup.evaluate(() => {
      let releaseQuery!: (tabs: chrome.tabs.Tab[]) => void;
      const pendingQuery = new Promise<chrome.tabs.Tab[]>((resolveQuery) => {
        releaseQuery = resolveQuery;
      });
      (globalThis as typeof globalThis & { releasePopupQuery: () => void }).releasePopupQuery = () => {
        releaseQuery([{ id: 7, windowId: 1, url: 'https://example.test/' } as chrome.tabs.Tab]);
      };
      chrome.tabs.query = async () => pendingQuery;
      chrome.tabs.captureVisibleTab = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = 8;
        canvas.height = 8;
        return canvas.toDataURL('image/jpeg');
      };
      chrome.scripting.executeScript = async () => [{
        frameId: 0,
        result: { count: 1, findings: [] },
      }] as chrome.scripting.InjectionResult[];
    });

    await popup.getByRole('button', { name: 'Check this page' }).focus();
    await popup.keyboard.press('Enter');

    // Loading state while the browser query is intentionally pending.
    await expect(popup.getByText('Checking the visible page…', { exact: false })).toBeVisible();
    await expectProgress(popup, true);

    await popup.evaluate(() => {
      (globalThis as typeof globalThis & { releasePopupQuery: () => void }).releasePopupQuery();
    });

    // Successful result state.
    await expect(popup.getByText('1 signal to verify.', { exact: false })).toBeVisible();
    await expectProgress(popup, false);

    // Cleared state.
    await popup.getByRole('button', { name: 'Clear last check' }).focus();
    await popup.keyboard.press('Enter');
    await expect(popup.getByText('Cleared.', { exact: false })).toBeVisible();
    await expectProgress(popup, false);

    await popup.evaluate(() => {
      chrome.tabs.query = async () => [];
    });
    await popup.getByRole('button', { name: 'Check this page' }).focus();
    await popup.keyboard.press('Enter');

    // Protected-page error state.
    await expect(popup.getByText('Couldn’t check this page.', { exact: false })).toBeVisible();
    await expectProgress(popup, false);
  } finally {
    await context.close();
  }
});
