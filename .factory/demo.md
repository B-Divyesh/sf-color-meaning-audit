# Signal Check demo

Open [`/demo/?demo=1`](/demo/?demo=1) or [`/demo/`](/demo/). The sample is a Northstar release dashboard with red and green round status marks. The service names do not state the dots’ status. The shipped check notes open immediately and report that no written status label was found.

The sticky banner stays visible while the sample scrolls. It says “Demo — sample data, nothing is saved to your real checks.” Demo state uses only `localStorage` key `demo:signal-check:sample-state`. It never reads or writes extension storage or non-`demo:` keys. **Reset demo** removes and recreates that sample key. **Start for real** removes it, opens `/install/`, and downloads the extension ZIP.

After its first visit, the service worker reloads the full sample, sticky banner, Reset action, and color-vision controls while offline.
