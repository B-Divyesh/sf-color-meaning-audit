import { scanAndShowOverlay, type VisionModel } from '../../src/audit';
import './site';

const demoKey = 'demo:signal-check:sample-state';
const state = document.querySelector<HTMLElement>('#demo-state')!;
const reset = document.querySelector<HTMLButtonElement>('#reset-demo')!;
const startReal = document.querySelector<HTMLAnchorElement>('#start-real')!;
const banner = document.querySelector<HTMLElement>('.demo-banner')!;
const overlayObserver = new MutationObserver(positionOverlay);

function positionOverlay(): void {
  const overlay = document.querySelector<HTMLElement>('#signal-check-overlay-host');
  if (overlay?.hasAttribute('data-minimized')) {
    overlay.style.removeProperty('top');
    return;
  }
  overlay?.style.setProperty('top', `${Math.ceil(banner.getBoundingClientRect().bottom + 8)}px`);
}

function watchOverlay(): void {
  overlayObserver.disconnect();
  const overlay = document.querySelector<HTMLElement>('#signal-check-overlay-host');
  if (overlay) overlayObserver.observe(overlay, { attributes: true, attributeFilter: ['data-minimized'] });
}

function runSample(model: VisionModel = 'deutan'): void {
  scanAndShowOverlay([], model);
  watchOverlay();
  positionOverlay();
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
new ResizeObserver(positionOverlay).observe(banner);
window.addEventListener('resize', positionOverlay);
window.addEventListener('scroll', positionOverlay, { passive: true });

runSample();
