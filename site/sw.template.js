const CACHE = 'signal-check-site-v7';
const SHELL = [
  '/',
  '/demo/',
  '/install/',
  '/privacy/',
  '/terms/',
  '/404.html',
  '/icon.svg',
  '/apple-touch-icon.png',
  '/social-card.jpg',
  ...__ASSETS__,
];

// This is only an emergency fallback when a browser loses its cache after the
// first visit. In the normal offline path the cached, built /demo/ document is
// returned, so the exact route shell, metadata, scripts, and overlay are kept.
const OFFLINE_DEMO = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="Try Signal Check on a sample status dashboard with a color-only warning already open.">
  <meta name="theme-color" content="#f6f0e3">
  <meta property="og:type" content="website"><meta property="og:title" content="Demo — Signal Check"><meta property="og:description" content="Try a color-only status warning with sample data."><meta property="og:image" content="/social-card.jpg"><meta property="og:url" content="/demo/">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Demo — Signal Check"><meta name="twitter:description" content="Try a color-only status warning with sample data."><meta name="twitter:image" content="/social-card.jpg">
  <link rel="canonical" href="/demo/"><link rel="icon" href="/icon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <title>Demo — Signal Check</title>
  <style>
    :root{color:#172c35;background:#f6f0e3;font-family:ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}body{min-width:320px;margin:0;background:#f6f0e3}a{color:inherit}:focus-visible{outline:3px solid #8a4b08;outline-offset:3px}.skip-link{position:fixed;z-index:30;top:-70px;left:12px;padding:12px 16px;color:#fff;background:#3e286b}.skip-link:focus{top:12px}.wrap,.site-header{width:min(1120px,calc(100% - 48px));margin:auto}.site-header{height:80px;display:flex;align-items:center;justify-content:space-between;gap:24px;border-bottom:1px solid #526269}.brand,.site-header nav,.site-footer nav{display:flex;align-items:center;gap:16px}.brand{min-width:44px;min-height:44px;text-decoration:none;font-weight:800}.site-header nav a,.site-footer nav a{min-width:44px;min-height:44px;display:inline-flex;align-items:center;font-weight:700}.demo-banner{position:sticky;z-index:20;top:0;min-height:54px;padding:8px max(24px,calc((100% - 1120px)/2));display:flex;align-items:center;justify-content:center;gap:12px 18px;color:#fffdf6;background:#3e286b;box-shadow:0 2px 0 rgba(23,44,53,.28);font-size:14px}.demo-banner span{color:#e8e0f4}.demo-banner button,.demo-banner a{min-width:44px;min-height:44px;display:inline-flex;align-items:center;justify-content:center;padding:0 12px;border:1px solid #fff;background:transparent;color:#fff;font:800 14px/1 ui-sans-serif,sans-serif}.demo-main{min-height:calc(100vh - 360px);padding:28px 0 94px}.eyebrow{margin:0 0 8px;color:#526269;font:800 12px/1.3 ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase}h1{max-width:700px;margin:0 0 14px;font-size:clamp(38px,8vw,64px);line-height:1}.intro{max-width:62ch;color:#526269;font-size:18px;line-height:1.6}.workspace{max-width:850px;margin-top:30px;padding:28px;background:#fffdf6;border:2px solid #172c35;box-shadow:9px 10px 0 rgba(23,44,53,.18)}.workspace h2{margin:0 0 16px}.statuses{margin:0;padding:0;list-style:none;border-top:2px solid #172c35}.statuses li{min-height:76px;display:grid;grid-template-columns:44px 1fr auto;align-items:center;gap:12px;border-bottom:1px solid #b9c9c8}.dot{width:24px;height:24px;border:2px solid #172c35;border-radius:50%}.good{background:#409060}.blocked{background:#c04040}.statuses small,.statuses time{display:block;color:#526269;font:13px/1.4 ui-monospace,monospace}.note{max-width:700px;margin:34px 0 0 auto;padding:20px 22px;background:repeating-linear-gradient(#fffdf6 0 31px,#c9d5d1 32px);border:2px solid #172c35;box-shadow:6px 7px #172c3548}.note h2{margin:0 0 12px}.note p{margin:0 0 10px}.note button{min-height:44px;padding:0 14px;border:2px solid #3e286b;background:#fffdf6;color:#3e286b;font:800 14px/1 ui-sans-serif,sans-serif}.site-footer{min-height:180px;padding:46px 0;display:grid;grid-template-columns:1fr auto;gap:28px;border-top:1px solid #b9c9c8}.site-footer p{max-width:52ch;margin:14px 0 0;color:#526269;font-size:13px}.site-footer .generated-note{grid-column:1/-1;margin-top:0}@media(max-width:600px){.wrap,.site-header{width:min(100% - 28px,1120px)}.site-header{height:68px}.site-header nav a:not(:last-child){display:none}.demo-banner{align-items:start;justify-content:flex-start;flex-wrap:wrap;padding:10px 14px}.demo-banner strong,.demo-banner span{width:100%}.demo-main{padding-top:20px}.workspace{padding:20px 16px}.statuses li{grid-template-columns:36px 1fr}.statuses time{grid-column:2;margin-top:-15px}.site-footer{grid-template-columns:1fr}.site-footer nav{flex-wrap:wrap;gap:16px}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;animation:none!important;transition:none!important}}
  </style>
</head>
<body class="demo-page">
  <a class="skip-link" href="#main">Skip to sample dashboard</a>
  <header class="site-header"><a class="brand" href="/" aria-label="Signal Check home">Signal Check</a><nav aria-label="Main navigation"><a href="/">Home</a><a href="/privacy/">Privacy</a><a href="/downloads/signal-check-chrome.zip" download>Download</a></nav></header>
  <p id="route-announcement" aria-live="polite" style="position:absolute;inline-size:1px;block-size:1px;overflow:hidden;clip:rect(0 0 0 0)">Demo — Signal Check loaded</p>
  <aside class="demo-banner" aria-label="Demo controls"><strong>Demo — sample data, nothing is saved to your real checks.</strong><span id="state" aria-live="polite">Offline sample loaded.</span><button id="reset" type="button">Reset demo</button><a id="start" href="/install/?download=1">Start for real</a></aside>
  <main id="main" class="demo-main wrap"><p class="eyebrow">Offline sample workspace</p><h1 tabindex="-1">A warning is already open.</h1><p class="intro">The Northstar sample and its privacy boundary are available without a connection.</p><section class="workspace" aria-labelledby="dashboard-title"><h2 id="dashboard-title">Launch status dashboard</h2><p>The round marks use color but no written state.</p><ul class="statuses" aria-label="Sample launch checks"><li><span class="dot good" aria-hidden="true"></span><span><strong>Billing handshake</strong><small>Region 1</small></span><time>09:42 UTC</time></li><li><span class="dot blocked" aria-hidden="true"></span><span><strong>Token refresh</strong><small>Region 2</small></span><time>09:43 UTC</time></li><li><span class="dot good" aria-hidden="true"></span><span><strong>Webhook delivery</strong><small>Region 3</small></span><time>09:44 UTC</time></li></ul></section><aside id="signal-check-overlay-host"><section class="note" role="dialog" aria-labelledby="note-title" tabindex="-1"><p class="eyebrow">Signal Check · red-green</p><h2 id="note-title">1 signal to verify</h2><p><strong>Two nearby signals may look alike.</strong></p><p>No nearby text label was found. Look for a shape, line pattern, position, or written value before acting.</p><button id="locate" type="button">Locate these signals</button></section></aside></main>
  <footer class="site-footer wrap"><div><a class="brand" href="/">Signal Check</a><p>Checks color-only signals on the visible page.</p></div><nav aria-label="Footer"><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></nav><p class="generated-note">Built by Param Factory · build 1.0.7</p></footer>
  <script>const key='demo:signal-check:sample-state',save=()=>localStorage.setItem(key,JSON.stringify({model:'deutan',offline:true,openedAt:Date.now()}));save();document.querySelector('#reset').onclick=()=>{localStorage.removeItem(key);save();document.querySelector('#state').textContent='Demo reset. The offline sample warning is open again.'};document.querySelector('#start').onclick=()=>localStorage.removeItem(key);document.querySelector('#locate').onclick=()=>{document.querySelectorAll('.dot').forEach((dot)=>dot.style.outline='4px solid #8a4b08');document.querySelector('#state').textContent='The sample signals are outlined.'};document.querySelector('[role=dialog]').focus();</script>
</body>
</html>`;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => Promise.all(SHELL.map(async (url) => {
    try {
      const request = new Request(new URL(url, self.location.origin), { cache: 'reload' });
      const response = await fetch(request);
      if (response.ok) await cache.put(url, response);
    } catch {
      // A later navigation can fill a missed cache entry while online.
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
    event.respondWith(fetch(event.request).then(async (response) => {
      if (response.ok) await caches.open(CACHE).then((cache) => cache.put('/demo/', response.clone()));
      return response;
    }).catch(async () => (await caches.match('/demo/')) || new Response(OFFLINE_DEMO, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })));
    return;
  }
  event.respondWith(caches.match(event.request, { ignoreSearch: true, ignoreVary: true }).then((cached) => {
    if (cached) return cached;
    return fetch(event.request).then((response) => {
      if (response.ok) void caches.open(CACHE).then((cache) => cache.put(event.request, response.clone()));
      return response;
    });
  }));
});
