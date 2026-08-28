import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

type StaticWebAppConfig = {
  globalHeaders: Record<string, string>;
  routes: Array<{ route: string; headers?: Record<string, string> }>;
  mimeTypes: Record<string, string>;
  responseOverrides: Record<string, { rewrite: string; statusCode: number }>;
};

type PackageLock = {
  lockfileVersion: number;
  packages: Record<string, { version?: string }>;
};

describe('static host caching policy', () => {
  it('revalidates documents while keeping fingerprinted build assets immutable', async () => {
    const source = await readFile(new URL('../../site/public/staticwebapp.config.json', import.meta.url), 'utf8');
    const config = JSON.parse(source) as StaticWebAppConfig;

    expect(config.globalHeaders['Cache-Control']).toBe('public, max-age=0, must-revalidate');
    expect(config.routes).toContainEqual({
      route: '/assets/*',
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
    });
    expect(config.mimeTypes['.avif']).toBe('image/avif');
    expect(config.responseOverrides['404']).toEqual({ rewrite: '/404.html', statusCode: 404 });
  });
});

describe('plain project copy', () => {
  it('keeps reader-facing test instructions free of unexplained runner jargon', async () => {
    const readme = await readFile(new URL('../../README.md', import.meta.url), 'utf8');
    const explanation = 'On Linux, the test command opens a test browser and uses the extension button.';

    expect(readme).toContain(explanation);
    expect(readme).not.toMatch(/\bXvfb\b/);
    expect(readme).toContain('The factory test environment already includes Chromium.');
    expect(readme).toContain('The extension saves the selected view and last result only in this browser.');
    expect(readme).toContain('It does not contact a server while it builds check notes.');
    expect(readme).not.toContain('browser-local extension storage');
    expect(readme).not.toContain('route fallback');
    expect(readme).not.toContain('design provenance');
    expect(explanation.split(/\s+/)).toHaveLength(14);
  });

  it('does not make an untestable public claim about artwork origin', async () => {
    const landing = await readFile(new URL('../../site/index.html', import.meta.url), 'utf8');

    expect(landing).not.toMatch(/hero artwork is original project artwork/i);
    expect(landing).not.toMatch(/original project artwork/i);
  });

  it('closes every round-five plain-language finding', async () => {
    const [landing, readme, claimsSource] = await Promise.all([
      readFile(new URL('../../site/index.html', import.meta.url), 'utf8'),
      readFile(new URL('../../README.md', import.meta.url), 'utf8'),
      readFile(new URL('../../.factory/claims.json', import.meta.url), 'utf8'),
    ]);

    expect(landing).toContain('Visible-page checks stay in your browser');
    expect(landing).toContain('<h3>Use a non-color cue</h3>');
    expect(landing).toContain('<p class="eyebrow">An isolated sample check</p>');
    expect(landing).toContain('<p class="eyebrow">What this check can miss</p>');
    expect(landing).not.toContain('A safe first check');
    expect(landing).not.toContain('Honest limits');
    expect(claimsSource).toContain('"claim": "Visible-page checks stay in your browser"');
    expect(readme).not.toContain('Chromium for Playwright is supplied by the factory image.');
    expect(readme).not.toContain('request network resources');
  });

  it('keeps the catalog description verb-first and within 120 characters', async () => {
    const description = (await readFile(new URL('../../.factory/catalog-description.txt', import.meta.url), 'utf8')).trim();

    expect(description).toMatch(/^Check\b/);
    expect(description.length).toBeLessThanOrEqual(120);
    expect(description).not.toContain('\n');
  });
});

describe('reproducible test dependencies', () => {
  it('pins the Playwright type graph in the committed npm lockfile', async () => {
    const [packageSource, lockSource] = await Promise.all([
      readFile(new URL('../../package.json', import.meta.url), 'utf8'),
      readFile(new URL('../../package-lock.json', import.meta.url), 'utf8'),
    ]);
    const packageJson = JSON.parse(packageSource) as { devDependencies: Record<string, string>; overrides: Record<string, string> };
    const lock = JSON.parse(lockSource) as PackageLock;

    expect(lock.lockfileVersion).toBe(3);
    expect(packageJson.devDependencies['@playwright/test']).toBe('1.58.2');
    expect(packageJson.overrides['playwright-core']).toBe('1.58.2');
    expect(lock.packages['node_modules/playwright-core']?.version).toBe('1.58.2');
    expect(Object.keys(lock.packages).filter((name) => name.endsWith('/playwright-core'))).toEqual(['node_modules/playwright-core']);
  });
});
