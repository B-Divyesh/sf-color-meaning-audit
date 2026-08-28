import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const x11 = require('x11');

await new Promise((resolve, reject) => {
  const client = x11.createClient((clientError, display) => {
    if (clientError) {
      reject(clientError);
      return;
    }
    const X = display.client;
    X.GetKeyboardMapping(display.min_keycode, display.max_keycode - display.min_keycode + 1, (mappingError, rows) => {
      if (mappingError) {
        reject(mappingError);
        return;
      }
      const keycodeFor = (keysym) => {
        const offset = rows.findIndex((row) => row.includes(keysym));
        if (offset < 0) throw new Error(`X11 key symbol ${keysym} is not mapped.`);
        return display.min_keycode + offset;
      };
      const keys = [keycodeFor(0xffe9), keycodeFor(0xffe1), keycodeFor(0x73)]; // Alt + Shift + S
      X.require('xtest', (extensionError, XTest) => {
        if (extensionError) {
          reject(extensionError);
          return;
        }
        keys.forEach((keycode) => XTest.FakeInput(XTest.KeyPress, keycode, 0, 0, 0, 0));
        [...keys].reverse().forEach((keycode) => XTest.FakeInput(XTest.KeyRelease, keycode, 0, 0, 0, 0));
        X.GetInputFocus((syncError) => {
          X.terminate();
          if (syncError) reject(syncError);
          else resolve();
        });
      });
    });
  });
  client.on('error', reject);
});
