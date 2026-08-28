const CACHE = 'signal-check-site-v3';
const SHELL = ['/', '/demo/', '/privacy/', '/terms/', '/404.html', ...__ASSETS__];
const OFFLINE_DEMO = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Demo — Signal Check</title><style>body{margin:0;padding:24px;background:#f6f0e3;color:#172c35;font:16px/1.5 system-ui,sans-serif}.banner{margin:-24px -24px 36px;padding:12px 24px;background:#3e286b;color:#fff}main,aside{max-width:680px;margin:auto}aside{margin-top:24px;padding:20px;border:2px solid #172c35;background:#fffdf6;box-shadow:6px 7px 0 rgba(23,44,53,.25)}h1{font-size:clamp(32px,8vw,48px);line-height:1.05}button{min-height:44px;padding:0 14px;border:2px solid #3e286b;background:#5b3f8c;color:#fff;font:inherit;font-weight:700}</style><body><div class="banner"><strong>Demo — sample data, nothing is saved to your real checks.</strong><br>Offline sample loaded from Signal Check.</div><main><h1>A warning is already open.</h1><p>Northstar release status dashboard sample.</p><aside id="signal-check-overlay-host" role="dialog" aria-labelledby="offline-note"><p>Signal Check · red-green</p><h2 id="offline-note">1 signal to verify</h2><p>No nearby text label was found. Look for a shape, line pattern, position, or written value before acting.</p><button type="button" disabled>Locate these signals</button></aside></main></body></html>`;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => Promise.all(SHELL.map(async (url) => {
    try {
      const request = new Request(new URL(url, self.location.origin), { cache: 'reload' });
      const response = await fetch(request);
      if (response.ok) await cache.put(url, response);
    } catch {
      // A failed optional precache item does not break the first online visit.
    }
  }))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(Promise.all([
    caches.keys().then((names) => Promise.all(names
      .filter((name) => name.startsWith('signal-check-site-') && name !== CACHE)
      .map((name) => caches.delete(name)))),
    self.clients.claim(),
  ]));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  const url = new URL(event.request.url);
  if (event.request.mode === 'navigate' && url.pathname === '/demo/') {
    event.respondWith(fetch(event.request).catch(() => new Response(OFFLINE_DEMO, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })));
    return;
  }
  event.respondWith(caches.match(event.request, { ignoreSearch: true }).then((cached) => {
    if (cached) return cached;
    return fetch(event.request).then((response) => {
      if (response.ok) void caches.open(CACHE).then((cache) => cache.put(event.request, response.clone()));
      return response;
    });
  }));
});
