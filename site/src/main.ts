const modelButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-model]')];
const board = document.querySelector<HTMLElement>('.status-board');
const note = document.querySelector<HTMLElement>('#demo-note');

modelButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modelButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    const comparison = button.dataset.model === 'deutan';
    board?.classList.toggle('deutan', comparison);
    if (note) {
      note.querySelector('h3')!.textContent = comparison
        ? 'The two status colors now nearly merge'
        : 'Red and green statuses rely on hue alone';
    }
  });
});
