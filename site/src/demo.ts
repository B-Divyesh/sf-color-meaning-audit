import { scanAndShowOverlay, type VisionModel } from '../../src/audit';
import './site';

const demoKey = 'demo:signal-check:sample-state';
const state = document.querySelector<HTMLElement>('#demo-state')!;
const reset = document.querySelector<HTMLButtonElement>('#reset-demo')!;
const startReal = document.querySelector<HTMLAnchorElement>('#start-real')!;

function runSample(model: VisionModel = 'deutan'): void {
  scanAndShowOverlay([], model);
  const overlay = document.querySelector<HTMLElement>('#signal-check-overlay-host');
  overlay?.style.setProperty('top', '116px');
  localStorage.setItem(demoKey, JSON.stringify({ model, openedAt: Date.now() }));
  state.textContent = 'Sample status dashboard loaded.';
}

document.querySelectorAll<HTMLInputElement>('input[name="demo-model"]').forEach((input) => {
  input.addEventListener('change', () => {
    if (input.checked) runSample(input.value as VisionModel);
  });
});

reset.addEventListener('click', () => {
  localStorage.removeItem(demoKey);
  document.querySelector('#signal-check-overlay-host')?.remove();
  runSample();
  state.textContent = 'Demo reset. The sample warning is open again.';
});

startReal.addEventListener('click', () => localStorage.removeItem(demoKey));

runSample();
