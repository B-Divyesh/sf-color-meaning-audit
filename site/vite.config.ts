import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: resolve(import.meta.dirname),
  publicDir: resolve(import.meta.dirname, 'public'),
  build: {
    outDir: resolve(import.meta.dirname, '../dist/site'),
    emptyOutDir: false,
    target: 'es2022',
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        demo: resolve(import.meta.dirname, 'demo/index.html'),
        privacy: resolve(import.meta.dirname, 'privacy/index.html'),
        terms: resolve(import.meta.dirname, 'terms/index.html'),
        notFound: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
  plugins: [{
    name: 'demo-offline-shell',
    async generateBundle(_options, bundle) {
      const template = await readFile(resolve(import.meta.dirname, 'sw.template.js'), 'utf8');
      const assets = Object.keys(bundle)
        .filter((name) => name.startsWith('assets/'))
        .map((name) => `/${name}`);
      this.emitFile({
        type: 'asset',
        fileName: 'sw.js',
        source: template.replace('__ASSETS__', JSON.stringify(assets)),
      });
    },
  }],
});
