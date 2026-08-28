import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

type Claim = { id: string; test: string };

describe('claim registry', () => {
  it('maps every claim to exactly one tagged browser test', async () => {
    const claims = JSON.parse(await readFile(new URL('../../.factory/claims.json', import.meta.url), 'utf8')) as Claim[];
    const testSource = (await Promise.all([
      'site.spec.ts',
      'popup.spec.ts',
      'overlay.spec.ts',
    ].map((file) => readFile(new URL(`../e2e/${file}`, import.meta.url), 'utf8')))).join('\n');
    const registered = new Set(claims.map(({ id }) => id));
    const tagged = [...testSource.matchAll(/@claim:([a-z0-9-]+)/g)].map((match) => match[1]!);

    expect(registered.size).toBe(claims.length);
    expect(new Set(tagged)).toEqual(registered);
    for (const claim of claims) {
      expect(tagged.filter((id) => id === claim.id), claim.id).toHaveLength(1);
      expect(claim.test).toContain(`@claim:${claim.id}`);
    }
  });
});
