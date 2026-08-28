import AxeBuilder from '@axe-core/playwright';
import { expect, test, chromium, type BrowserContext, type CDPSession, type Page } from '@playwright/test';
import { execFile } from 'node:child_process';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

const extensionPath = resolve('dist/extension/chrome-mv3');
const fixtureOrigin = 'http://127.0.0.1:4173';
const execFileAsync = promisify(execFile);

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

type RealCheckFixture = {
  context: BrowserContext;
  fixture: Page;
  popup: PopupTarget;
};

type PopupTarget = {
  evaluate<T>(expression: string): Promise<T>;
};

async function attachPopupTarget(root: CDPSession, targetId: string): Promise<PopupTarget> {
  const { sessionId } = await root.send('Target.attachToTarget', { targetId, flatten: false });
  let messageId = 0;
  const pending = new Map<number, { resolve: (value: unknown) => void; reject: (error: Error) => void }>();
  root.on('Target.receivedMessageFromTarget', (event) => {
    if (event.sessionId !== sessionId) return;
    const message = JSON.parse(event.message) as { id?: number; result?: unknown; error?: { message: string } };
    if (!message.id) return;
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    if (message.error) request.reject(new Error(message.error.message));
    else request.resolve(message.result);
  });
  const send = async (method: string, params: Record<string, unknown> = {}): Promise<any> => {
    const id = ++messageId;
    const response = new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
    await root.send('Target.sendMessageToTarget', {
      sessionId,
      message: JSON.stringify({ id, method, params }),
    });
    return response;
  };
  await send('Runtime.enable');
  return {
    async evaluate<T>(expression: string): Promise<T> {
      const response = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      if (response.exceptionDetails) throw new Error(response.exceptionDetails.text || 'Popup evaluation failed.');
      return response.result.value as T;
    },
  };
}

async function openRealCheckFixture(): Promise<RealCheckFixture> {
  const context = await chromium.launchPersistentContext('', {
    channel: 'chromium',
    headless: false,
    viewport: { width: 960, height: 720 },
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
    ],
  });
  let worker = context.serviceWorkers()[0];
  if (!worker) worker = await context.waitForEvent('serviceworker');
  const fixture = context.pages()[0] || await context.newPage();
  await fixture.goto(fixtureOrigin);
  await fixture.bringToFront();
  await execFileAsync(process.execPath, [resolve('scripts/trigger-extension-shortcut.mjs')]);
  await fixture.waitForTimeout(500);
  const session = await context.newCDPSession(fixture);
  const targets = await session.send('Target.getTargets');
  const popupInfo = targets.targetInfos.find(({ type, url }) => type === 'page' && /chrome-extension:\/\/.+\/popup\.html$/.test(url));
  if (!popupInfo) throw new Error(`Popup target did not open. Targets: ${JSON.stringify(targets.targetInfos.map(({ type, url }) => ({ type, url })))}`);
  const popup = await attachPopupTarget(session, popupInfo.targetId);
  await popup.evaluate(`new Promise((resolve) => document.readyState === 'loading' ? addEventListener('DOMContentLoaded', resolve, { once: true }) : resolve(true))`);
  return { context, fixture, popup };
}

async function loadSignalPair(
  fixture: Page,
  first: string,
  second: string,
  labels: { first: string; second: string } | null = { first: 'Ready', second: 'Blocked' },
): Promise<void> {
  const firstLabel = labels ? `aria-label="${labels.first}"` : 'aria-hidden="true"';
  const secondLabel = labels ? `aria-label="${labels.second}"` : 'aria-hidden="true"';
  await fixture.setContent(`
    <!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Signal Check test fixture</title><style>
      body { margin: 0; padding: 80px; color: #172c35; background: #fffdf6; font: 18px/1.5 system-ui, sans-serif; }
      main { max-width: 680px; }
      .status-list { display: flex; gap: 72px; padding: 32px; border: 2px solid #172c35; }
      .status { display: flex; align-items: center; gap: 12px; }
      .status-dot { display: block; width: 28px; height: 28px; border: 2px solid #172c35; border-radius: 50%; }
      .first { background: ${first}; }
      .second { background: ${second}; }
    </style></head><body><main><h1>Release signals</h1><div class="status-list">
      <div class="status"><span class="status-dot first" ${firstLabel}></span><span>Billing handshake</span></div>
      <div class="status"><span class="status-dot second" ${secondLabel}></span><span>Token refresh</span></div>
    </div></main></body></html>
  `);
}

async function activateFixtureAndCheck(check: RealCheckFixture): Promise<void> {
  await check.popup.evaluate(`document.querySelector('#check').click()`);
  try {
    await expect(check.fixture.locator('#signal-check-overlay-host')).toBeVisible({ timeout: 15_000 });
    await expect.poll(() => check.popup.evaluate<boolean>(`!document.querySelector('#check').disabled`)).toBe(true);
  } catch (error) {
    const diagnostics = await check.popup.evaluate(`(async () => ({ status: document.querySelector('#status').textContent, tabs: (await chrome.tabs.query({ active: true, currentWindow: true })).map(({ id, url }) => ({ id, url })) }))()`);
    throw new Error(`The real extension check did not open an overlay: ${JSON.stringify(diagnostics)}. ${String(error)}`);
  }
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

test.beforeEach(({}, testInfo) => {
  if (testInfo.project.name === 'mobile') test.skip(true, 'The packaged extension popup is verified in the desktop Chromium profile.');
});

test('@claim:extension-clear clears the stored last result in one action', async () => {
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
    expect(await popup.evaluate(async () => chrome.storage.local.get('lastResult'))).toEqual({});
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

test('@claim:extension-local-storage saves the chosen view and last result in extension-local storage', async () => {
  const { context, popup } = await openPackagedPopup();
  try {
    await popup.getByRole('radio', { name: /Protan/i }).check();
    await popup.evaluate(() => {
      chrome.tabs.query = async () => [{ id: 7, windowId: 1, url: 'https://example.test/' } as chrome.tabs.Tab];
      chrome.tabs.captureVisibleTab = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = 8;
        canvas.height = 8;
        return canvas.toDataURL('image/jpeg');
      };
      chrome.scripting.executeScript = async () => [{ frameId: 0, result: { count: 2, domCount: 1, paletteCount: 1 } }] as chrome.scripting.InjectionResult[];
    });
    await popup.getByRole('button', { name: 'Check this page' }).click();
    await expect(popup.getByText('2 signals to verify.', { exact: false })).toBeVisible();
    const saved = await popup.evaluate(async () => chrome.storage.local.get(['visionModel', 'lastResult']));
    expect(saved.visionModel).toBe('protan');
    expect((saved.lastResult as { count: number }).count).toBe(2);
  } finally {
    await context.close();
  }
});

test('@claim:extension-check-notes uses only explicit status labels as text cues', async () => {
  const check = await openRealCheckFixture();
  try {
    await loadSignalPair(check.fixture, 'rgb(64, 144, 96)', 'rgb(192, 64, 64)', null);
    await activateFixtureAndCheck(check);

    let overlay = check.fixture.locator('#signal-check-overlay-host');
    await expect(overlay.getByText('Two nearby signals may look alike', { exact: false })).toBeVisible();
    await expect(overlay.getByText('No nearby text label was found. Look for a shape, line pattern, position, or written value before acting.', { exact: true })).toBeVisible();
    await expect(overlay.getByText(/Billing handshake.*Token refresh.*may look alike/i)).toHaveCount(0);
    await expect(overlay.getByText(/legend has words/i)).toHaveCount(0);

    await loadSignalPair(check.fixture, 'rgb(64, 144, 96)', 'rgb(192, 64, 64)');
    await activateFixtureAndCheck(check);

    overlay = check.fixture.locator('#signal-check-overlay-host');
    const labelledNotes = await overlay.locator('.sheet').innerText();
    expect(labelledNotes).toContain('“Ready” and “Blocked” may look alike');
    expect(labelledNotes).toContain('Written labels are tied to these marks. Match the written label before acting.');
  } finally {
    await check.context.close();
  }
});

test('@claim:extension-local-check runs the packaged visible-page check without HTTP requests', async () => {
  const check = await openRealCheckFixture();
  try {
    await loadSignalPair(check.fixture, 'rgb(32, 192, 32)', 'rgb(192, 128, 32)');
    const requests: string[] = [];
    check.context.on('request', (request) => {
      if (/^https?:/.test(request.url())) requests.push(request.url());
    });

    await activateFixtureAndCheck(check);

    const overlay = check.fixture.locator('#signal-check-overlay-host');
    await expect(overlay.getByRole('heading', { name: /signals? to verify/i })).toBeVisible();
    await expect(overlay.getByText(/deutan \(green-sensitive\)/i)).toBeVisible();
    await expect(overlay.getByRole('button', { name: 'Locate these signals' })).toBeVisible();
    expect(requests).toEqual([]);
  } finally {
    await check.context.close();
  }
});

test('@claim:extension-offline completes a visible-page check while offline', async () => {
  const check = await openRealCheckFixture();
  try {
    await loadSignalPair(check.fixture, 'rgb(64, 144, 96)', 'rgb(192, 64, 64)', null);
    await check.context.setOffline(true);
    await activateFixtureAndCheck(check);

    const overlay = check.fixture.locator('#signal-check-overlay-host');
    await expect(overlay.getByRole('heading', { name: /signals? to verify/i })).toBeVisible();
    await expect(overlay.getByText('No nearby text label was found. Look for a shape, line pattern, position, or written value before acting.', { exact: true })).toBeVisible();
  } finally {
    await check.context.setOffline(false);
    await check.context.close();
  }
});

test('@claim:color-vision-views checks every selectable view through the packaged extension', async () => {
  const check = await openRealCheckFixture();
  const cases = [
    { model: 'deutan', name: /deutan \(green-sensitive\)/i, colors: ['rgb(32, 192, 32)', 'rgb(192, 128, 32)'] },
    { model: 'protan', name: /protan \(red-sensitive\)/i, colors: ['rgb(32, 160, 128)', 'rgb(224, 128, 128)'] },
    { model: 'tritan', name: /tritan \(blue-sensitive\)/i, colors: ['rgb(224, 32, 128)', 'rgb(224, 64, 32)'] },
  ] as const;
  try {
    for (const item of cases) {
      await loadSignalPair(check.fixture, item.colors[0], item.colors[1]);
      if (item.model === 'deutan') await check.popup.evaluate(`document.querySelector('input[value="protan"]').click()`);
      await check.popup.evaluate(`document.querySelector('input[value="${item.model}"]').click()`);
      await expect.poll(() => check.popup.evaluate<{ visionModel?: string }>(`chrome.storage.local.get('visionModel')`)).toEqual({ visionModel: item.model });
      await activateFixtureAndCheck(check);
      const overlay = check.fixture.locator('#signal-check-overlay-host');
      await expect(overlay.getByText(item.name)).toBeVisible();
      await expect(overlay.getByRole('heading', { name: /signals? to verify/i })).toBeVisible();
      await check.fixture.waitForTimeout(600);
    }
  } finally {
    await check.context.close();
  }
});
