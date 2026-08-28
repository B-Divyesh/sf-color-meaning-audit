import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

type StaticWebAppConfig = {
  globalHeaders: Record<string, string>;
  routes: Array<{ route: string; headers?: Record<string, string> }>;
  mimeTypes: Record<string, string>;
  responseOverrides: Record<string, { rewrite: string; statusCode: number }>;
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
    expect(explanation.split(/\s+/)).toHaveLength(14);
  });

  it('keeps the catalog description verb-first and within 120 characters', async () => {
    const description = (await readFile(new URL('../../.factory/catalog-description.txt', import.meta.url), 'utf8')).trim();

    expect(description).toMatch(/^Check\b/);
    expect(description.length).toBeLessThanOrEqual(120);
    expect(description).not.toContain('\n');
  });
});
