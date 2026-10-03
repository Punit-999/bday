import { readdir, mkdir, writeFile, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const root = process.cwd();
const media = {
  photos: { dir: join(root, 'public/photos'), output: join(root, 'public/generated/photos.json'), extensions: ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'] },
  audio: { dir: join(root, 'public/audio'), output: join(root, 'public/generated/audio.json'), extensions: ['.mp3', '.wav', '.m4a', '.ogg', '.webm'] },
};

function titleFromFile(name) {
  return name.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

async function readMedia({ dir, output, extensions }) {
  await mkdir(dir, { recursive: true });
  const files = (await readdir(dir, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && extensions.includes(extname(entry.name).toLowerCase()))
    .map((entry) => ({ file: `/` + join(dir.replace(join(root, 'public'), ''), entry.name).replaceAll('\\', '/').replace(/^\/+/, ''), title: titleFromFile(entry.name) }))
    .sort((a, b) => a.file.localeCompare(b.file));
  await mkdir(join(root, 'public/generated'), { recursive: true });
  await writeFile(output, JSON.stringify(files, null, 2) + '\n');
  return files.length;
}

const results = await Promise.all(Object.values(media).map(readMedia));
console.log(`Generated media manifests: ${results[0]} photos, ${results[1]} audio files`);
