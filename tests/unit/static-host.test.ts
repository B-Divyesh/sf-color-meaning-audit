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
