import { createWriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import archiver from 'archiver';

const source = resolve('dist/extension/chrome-mv3');
const destination = resolve('dist/site/downloads/signal-check-chrome.zip');
await mkdir(resolve('dist/site/downloads'), { recursive: true });

await new Promise((resolveArchive, rejectArchive) => {
  const output = createWriteStream(destination);
  const archive = archiver('zip', { zlib: { level: 9 } });
  output.on('close', resolveArchive);
  output.on('error', rejectArchive);
  archive.on('error', rejectArchive);
  archive.pipe(output);
  archive.directory(source, false);
  void archive.finalize();
});

console.log(`Packaged ${destination}`);
