import './style.css';
import { analyzeScreenshot, scanAndShowOverlay, type AuditResult, type VisionModel } from '../../src/audit';

const checkButton = document.querySelector<HTMLButtonElement>('#check')!;
const status = document.querySelector<HTMLElement>('#status')!;
const progress = document.querySelector<HTMLElement>('#progress')!;
const offline = document.querySelector<HTMLElement>('#offline')!;
const clearButton = document.querySelector<HTMLButtonElement>('#clear')!;
const radios = [...document.querySelectorAll<HTMLInputElement>('input[name="model"]')];

function setStatus(message: string, kind: 'plain' | 'success' | 'error' = 'plain'): void {
  status.innerHTML = `<p class="${kind}">${message}</p>`;
}

function updateOffline(): void {
  offline.hidden = navigator.onLine;
}

async function selectedModel(): Promise<VisionModel> {
  return (radios.find((radio) => radio.checked)?.value || 'deutan') as VisionModel;
}

async function restore(): Promise<void> {
  const saved = await chrome.storage.local.get(['visionModel', 'lastResult']);
  const model = saved.visionModel as VisionModel | undefined;
  if (model) radios.find((radio) => radio.value === model)?.click();
  const last = saved.lastResult as { count: number; at: number } | undefined;
  if (last) {
    const time = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(last.at);
    setStatus(`<strong>Last check: ${last.count} signal${last.count === 1 ? '' : 's'} to verify</strong> at ${time}. Run again after the page changes.`);
  }
}

radios.forEach((radio) => radio.addEventListener('change', () => {
  if (radio.checked) void chrome.storage.local.set({ visionModel: radio.value });
}));

checkButton.addEventListener('click', async () => {
  checkButton.disabled = true;
  progress.hidden = false;
  setStatus('<strong>Checking the visible page…</strong> Sampling colors, legends, status marks, and alternate cues.');
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id || !tab.url || !/^https?:|^file:/.test(tab.url)) {
      throw new Error('This browser page is protected. Open a website or local file, then try again.');
    }
    const model = await selectedModel();
    const screenshot = await chrome.tabs.captureVisibleTab(tab.windowId, { format: 'jpeg', quality: 60 });
    const palette = await analyzeScreenshot(screenshot, model);
    const execution = await chrome.scripting.executeScript({ target: { tabId: tab.id }, func: scanAndShowOverlay, args: [palette, model] });
    const result = execution[0]?.result as AuditResult | undefined;
    if (!result) throw new Error('The page did not return a result. Reload it and try once more.');
    setStatus(result.count
      ? `<strong>${result.count} signal${result.count === 1 ? '' : 's'} to verify.</strong> The check notes are open on the page.`
      : '<strong>No likely color-only signals found.</strong> This is not a guarantee; check tables or labels for important decisions.', 'success');
    await chrome.storage.local.set({ lastResult: { count: result.count, at: Date.now() } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'The page could not be checked.';
    setStatus(`<strong>Couldn’t check this page.</strong> ${message}`, 'error');
  } finally {
    checkButton.disabled = false;
    progress.hidden = true;
  }
});

clearButton.addEventListener('click', async () => {
  await chrome.storage.local.remove('lastResult');
  setStatus('<strong>Cleared.</strong> Ready for a new local check.');
});

window.addEventListener('online', updateOffline);
window.addEventListener('offline', updateOffline);
updateOffline();
void restore();
