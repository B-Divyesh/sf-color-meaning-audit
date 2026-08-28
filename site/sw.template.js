const CACHE = 'signal-check-site-v5';
const SHELL = ['/', '/demo/', '/install/', '/privacy/', '/terms/', '/404.html', ...__ASSETS__];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE)
    .then((cache) => cache.addAll(SHELL))
    .then(() => self.skipWaiting()));
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
    event.respondWith(fetch(event.request).catch(async () => {
      const cachedDemo = await caches.match('/demo/');
      return cachedDemo || Response.error();
    }));
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
