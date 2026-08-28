export function focusPageHeading(): void {
  const heading = document.querySelector<HTMLElement>('main h1');
  const announcement = document.querySelector<HTMLElement>('#route-announcement');
  if (!heading) return;
  heading.focus({ preventScroll: true });
  if (announcement) announcement.textContent = `${document.title} loaded`;
}

export function registerOfflineShell(): void {
  if ('serviceWorker' in navigator) {
    void navigator.serviceWorker.register('/sw.js').catch(() => {
      // Offline support is progressive; an ordinary visit remains usable.
    });
  }
}

focusPageHeading();
registerOfflineShell();
