import fs from 'fs';
import { execFileSync } from 'node:child_process';

console.log('--- Running CI Verification Suite ---');

const fail = (message) => {
  console.error(`✗ ${message}`);
  process.exit(1);
};

// 1. Validate manifest.json
try {
  const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
  if (!manifest.name || !manifest.start_url || !manifest.scope) {
    fail('manifest.json is missing required PWA fields');
  }
  console.log(`✓ manifest.json is valid JSON (name: ${manifest.name})`);
} catch (err) {
  fail(`manifest.json validation failed: ${err.message}`);
}

// 2. Validate Vercel routing. The filesystem handler must run before the SPA fallback
// so real JS/CSS/JSON files are not rewritten to index.html.
try {
  const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  const routes = Array.isArray(vercel.routes) ? vercel.routes : [];
  const filesystemIndex = routes.findIndex(route => route.handle === 'filesystem');
  const fallbackIndex = routes.findIndex(route => route.dest === '/index.html');
  const envRoute = routes.some(route => route.src === '/__env\\.js' && route.dest === '/api/env.js');

  if (filesystemIndex === -1) fail('vercel.json must include a filesystem route');
  if (fallbackIndex === -1 || fallbackIndex < filesystemIndex) {
    fail('vercel.json must place the SPA fallback after the filesystem route');
  }
  if (!envRoute) fail('vercel.json must route /__env.js to /api/env.js');
  if (vercel.buildCommand !== 'npm run build') fail('vercel.json must use npm run build');
  if (vercel.outputDirectory !== 'dist') fail('vercel.json must serve the dist output directory');
  console.log('✓ vercel.json uses filesystem-first routing with a final SPA fallback');
} catch (err) {
  fail(`vercel.json validation failed: ${err.message}`);
}

// 3. Validate that deployment assets exist and are not HTML fallbacks.
const requiredAssets = ['index.html', 'script.js', 'style.css', 'maps.js', 'manifest.json', 'sw.js'];
for (const asset of requiredAssets) {
  if (!fs.existsSync(asset)) fail(`required deployment asset is missing: ${asset}`);
  const content = fs.readFileSync(asset, 'utf8').trimStart().toLowerCase();
  if (asset !== 'index.html' && (content.startsWith('<!doctype html') || content.startsWith('<html'))) {
    fail(`${asset} appears to contain HTML instead of its expected asset type`);
  }
}
console.log(`✓ required deployment assets present and type-safe (${requiredAssets.length} files)`);

if (!fs.existsSync('dist')) fail('dist output is missing; run npm run build before validation');
for (const asset of requiredAssets) {
  if (!fs.existsSync(`dist/${asset}`)) fail(`dist output is missing: ${asset}`);
}
console.log(`✓ dist output contains all required frontend assets (${requiredAssets.length} files)`);

// 4. Prevent local secrets from being tracked in the repository.
if (fs.existsSync('.env')) {
  console.warn('⚠ local .env exists; it must remain ignored and must never be committed');
}
if (fs.existsSync('.gitignore')) {
  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  if (!/^\.env\s*$/m.test(gitignore)) fail('.gitignore must ignore .env');
}
console.log('✓ local environment files are protected by repository ignore rules');

// 5. Environment examples must contain placeholders, never credentials copied from a project.
const envExample = fs.readFileSync('.env.example', 'utf8');
const secretLikeValue = /(?:AIza[0-9A-Za-z_-]{20,}|eyJ[A-Za-z0-9_-]{20,}|https:\/\/[a-z0-9]{15,}\.supabase\.co)/;
if (secretLikeValue.test(envExample)) {
  fail('.env.example contains a credential-like value; use placeholders only');
}
if (!/replace-with-supabase-anon-public-key/.test(envExample)) {
  fail('.env.example must document a placeholder for SUPABASE_ANON_KEY');
}
console.log('✓ .env.example contains placeholders only');

// 6. No tracked local environment file may be shipped to production.
const trackedFiles = typeof fs.realpathSync === 'function' && fs.existsSync('.git')
  ? requireTrackedFiles()
  : [];
if (trackedFiles.some((file) => /(^|\/)(\.env|\.env\.[^e])$/.test(file))) {
  fail('a local .env file is tracked by Git');
}
console.log('✓ no local .env file is tracked');

console.log('All CI checks passed successfully!');

function requireTrackedFiles() {
  try {
    return execFileSync('git', ['ls-files'], { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
  } catch {
    return [];
  }
}
