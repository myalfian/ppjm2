import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const assets = [
  'index.html',
  'script.js',
  'style.css',
  'maps.js',
  'manifest.json',
  'sw.js',
  'robots.txt',
  'sitemap.xml',
  'metadata.json',
  'logo.jpg',
  'logo-sdirada.png'
];

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const asset of assets) {
  const source = path.join(root, asset);
  if (!fs.existsSync(source)) throw new Error(`Missing build asset: ${asset}`);
  fs.copyFileSync(source, path.join(dist, asset));
}

console.log(`Build complete: ${assets.length} frontend assets copied to dist/`);
