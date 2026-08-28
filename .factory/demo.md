# Signal Check demo

Open [`/demo/?demo=1`](/demo/?demo=1) or [`/demo/`](/demo/). The sample is a Northstar release dashboard with red and green round status marks. The shipped check-note overlay opens immediately and points to the missing cue.

The persistent banner says “Demo — sample data, nothing is saved to your real checks.” Demo state uses only `localStorage` key `demo:signal-check:sample-state`. It never reads or writes extension storage or non-`demo:` keys. **Reset demo** removes and recreates that sample key. **Start for real** removes it and returns to the landing page.

After its first visit, the site service worker caches the demo shell and its loaded assets. The offline claim test reloads the demo while the browser context is offline.
