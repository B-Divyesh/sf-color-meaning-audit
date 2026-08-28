const CACHE = 'signal-check-site-v5';
const SHELL = ['/', '/demo/', '/install/', '/privacy/', '/terms/', '/404.html', ...__ASSETS__];
const OFFLINE_DEMO = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f6f0e3"><title>Demo — Signal Check</title><style>
*{box-sizing:border-box}body{min-width:320px;margin:0;background:#f6f0e3;color:#172c35;font:16px/1.5 system-ui,sans-serif}a{color:inherit}.banner{position:sticky;z-index:10;top:0;min-height:60px;padding:8px max(16px,calc((100% - 960px)/2));display:flex;align-items:center;justify-content:center;gap:12px 18px;background:#3e286b;color:#fff;box-shadow:0 2px #172c3548}.banner span{color:#e8e0f4}.banner button,.banner a{min-width:44px;min-height:44px;padding:0 12px;display:inline-flex;align-items:center;justify-content:center;border:1px solid #fff;background:transparent;color:#fff;font:inherit;font-weight:700}.wrap{width:min(960px,calc(100% - 28px));margin:auto}main{padding:48px 0 80px}h1{max-width:700px;margin:0 0 14px;font-size:clamp(38px,8vw,64px);line-height:1}.intro{max-width:62ch;margin-bottom:32px;color:#526269}.workspace{padding:24px;background:#fffdf6;border:2px solid #172c35;box-shadow:8px 9px #172c3528}.workspace h2{margin:0 0 20px}.statuses{margin:0;padding:0;list-style:none;border-top:2px solid #172c35}.statuses li{min-height:72px;display:grid;grid-template-columns:36px 1fr auto;align-items:center;gap:12px;border-bottom:1px solid #b9c9c8}.dot{width:24px;height:24px;border:2px solid #172c35;border-radius:50%}.good{background:#409060}.blocked{background:#c04040}.statuses small,.statuses time{display:block;color:#526269;font:13px/1.4 ui-monospace,monospace}.note{max-width:700px;margin:34px 0 0 auto;padding:20px 22px;background:repeating-linear-gradient(#fffdf6 0 31px,#c9d5d1 32px);border:2px solid #172c35;box-shadow:6px 7px #172c3548}.note h2{margin:0 0 12px}.note p{margin:0 0 10px}.note button{min-height:44px;padding:0 14px;border:2px solid #3e286b;background:#fffdf6;color:#3e286b;font:inherit;font-weight:700}.eyebrow{margin:0 0 8px;color:#526269;font:700 12px/1.3 ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase}:focus-visible{outline:3px solid #a65d0c;outline-offset:3px}@media(max-width:600px){.banner{align-items:start;justify-content:flex-start;flex-wrap:wrap;padding:10px 14px}.banner strong,.banner span{width:100%}main{padding-top:36px}.workspace{padding:18px 14px}.statuses li{grid-template-columns:36px 1fr}.statuses time{grid-column:2}.note{margin-top:24px}}
</style></head><body><aside class="banner" aria-label="Demo controls"><strong>Demo — sample data, nothing is saved to your real checks.</strong><span id="state" aria-live="polite">Offline sample loaded.</span><button id="reset" type="button">Reset demo</button><a id="start" href="/install/?download=1">Start for real</a></aside><main class="wrap"><p class="eyebrow">Offline sample workspace</p><h1>A warning is already open.</h1><p class="intro">The Northstar sample and its privacy boundary are available without a connection.</p><section class="workspace" aria-labelledby="dashboard-title"><h2 id="dashboard-title">Launch status dashboard</h2><p>The round marks use color but no written state.</p><ul class="statuses" aria-label="Sample launch checks"><li><span class="dot good" aria-hidden="true"></span><span><strong>Billing handshake</strong><small>Region 1</small></span><time>09:42 UTC</time></li><li><span class="dot blocked" aria-hidden="true"></span><span><strong>Token refresh</strong><small>Region 2</small></span><time>09:43 UTC</time></li><li><span class="dot good" aria-hidden="true"></span><span><strong>Webhook delivery</strong><small>Region 3</small></span><time>09:44 UTC</time></li></ul></section><aside id="signal-check-overlay-host"><section class="note" role="dialog" aria-labelledby="note-title"><p class="eyebrow">Signal Check · red-green</p><h2 id="note-title">1 signal to verify</h2><p><strong>Two nearby signals may look alike.</strong></p><p>No nearby text label was found. Look for a shape, line pattern, position, or written value before acting.</p><button type="button" disabled>Locate these signals</button></section></aside></main><script>const key='demo:signal-check:sample-state',save=()=>localStorage.setItem(key,JSON.stringify({model:'deutan',offline:true,openedAt:Date.now()}));save();document.querySelector('#reset').onclick=()=>{localStorage.removeItem(key);save();document.querySelector('#state').textContent='Demo reset. The offline sample warning is open again.'};document.querySelector('#start').onclick=()=>localStorage.removeItem(key)</script></body></html>`;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => Promise.all(SHELL.map(async (url) => {
    try {
      const request = new Request(new URL(url, self.location.origin), { cache: 'reload' });
      const response = await fetch(request);
      if (response.ok) await cache.put(url, response);
    } catch {
      // The self-contained offline demo still works if an optional shell file misses the precache.
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
