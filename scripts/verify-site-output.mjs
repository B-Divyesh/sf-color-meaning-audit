import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const site = resolve('dist/site');
const index = await readFile(resolve(site, 'index.html'), 'utf8');
await readFile(resolve(site, 'demo/index.html'), 'utf8');
await readFile(resolve(site, 'install/index.html'), 'utf8');
await readFile(resolve(site, 'privacy/index.html'), 'utf8');
await readFile(resolve(site, 'terms/index.html'), 'utf8');
await readFile(resolve(site, '404.html'), 'utf8');
const config = JSON.parse(await readFile(resolve(site, 'staticwebapp.config.json'), 'utf8'));
const assets = await readdir(resolve(site, 'assets'));

const immutableAssetsRoute = config.routes?.find((entry) => entry.route === '/assets/*');
if (config.globalHeaders?.['Cache-Control'] !== 'public, max-age=0, must-revalidate') {
  throw new Error('Static documents must revalidate instead of receiving a long-lived cache policy.');
}
if (immutableAssetsRoute?.headers?.['Cache-Control'] !== 'public, max-age=31536000, immutable') {
  throw new Error('Fingerprint-named assets must receive the immutable cache policy.');
}
if (config.mimeTypes?.['.avif'] !== 'image/avif') {
  throw new Error('AVIF assets must be served with the image/avif media type.');
}

const fingerprintedAsset = /-[A-Za-z0-9_-]{8}\.(?:avif|webp|jpg|css|js)$/;
if (!assets.some((asset) => fingerprintedAsset.test(asset))) {
  throw new Error('The production site did not emit content-fingerprinted assets.');
}
if (!/\/assets\/hero-notebook-[A-Za-z0-9_-]{8}\.avif/.test(index)) {
  throw new Error('The hero image is not referenced through its content-fingerprinted production URL.');
}

console.log('Verified fingerprinted assets and static-host cache policy.');
