# Signal Check demo

Open [`/demo/?demo=1`](/demo/?demo=1) or [`/demo/`](/demo/). The sample is a Northstar release dashboard with red and green round status marks. The service names do not state the dots’ status. The shipped check notes open immediately and report that no written status label was found.

The persistent banner says “Demo — sample data, nothing is saved to your real checks.” Demo state uses only `localStorage` key `demo:signal-check:sample-state`. It never reads or writes extension storage or non-`demo:` keys. **Reset demo** removes and recreates that sample key. **Start for real** removes it and returns to the landing page.

After its first visit, the service worker can reload the sample warning and privacy banner while offline. Reset and color-vision controls need an online page load.
