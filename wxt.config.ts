import { defineConfig } from 'wxt';

export default defineConfig({
  outDir: 'dist/extension',
  manifest: {
    name: 'Signal Check',
    description: 'Find page signals that may rely on color alone, then learn what alternate cue to seek.',
    version: '1.0.2',
    permissions: ['activeTab', 'scripting', 'storage'],
    action: { default_title: 'Check color meaning on this page' },
    commands: {
      '_execute_action': {
        suggested_key: { default: 'Alt+Shift+S', mac: 'MacCtrl+Shift+S' },
      },
    },
  },
});
