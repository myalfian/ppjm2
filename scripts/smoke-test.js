import { spawn } from 'node:child_process';

const port = 3417;
const base = `http://127.0.0.1:${port}`;
const expected = [
  ['/', 'text/html', '<!doctype html'],
  ['/script.js', 'javascript', '//'],
  ['/style.css', 'text/css', '.'],
  ['/maps.js', 'javascript', 'import'],
  ['/manifest.json', 'json', '{'],
  ['/sw.js', 'javascript', 'const CACHE_NAME'],
  ['/api/health', 'json', '"status":"healthy"'],
  ['/__env.js', 'javascript', 'window.__ENV__']
];

const child = spawn(process.execPath, ['server.js'], {
  env: { ...process.env, PORT: String(port) },
  stdio: ['ignore', 'pipe', 'pipe']
});
let output = '';
child.stdout.on('data', (chunk) => { output += chunk; });
child.stderr.on('data', (chunk) => { output += chunk; });

const cleanup = () => child.kill('SIGTERM');
process.on('exit', cleanup);

try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, 4000);
    child.stdout.on('data', (chunk) => {
      if (chunk.toString().includes('running at')) {
        clearTimeout(timer);
        resolve();
      }
    });
    child.once('error', reject);
    child.once('exit', (code) => {
      clearTimeout(timer);
      reject(new Error(`server exited early with code ${code}: ${output}`));
    });
  });

  for (const [path, contentType, marker] of expected) {
    const response = await fetch(`${base}${path}`);
    const body = await response.text();
    const actualType = response.headers.get('content-type') || '';
    if (!response.ok) throw new Error(`${path}: expected HTTP 200, got ${response.status}`);
    if (!actualType.includes(contentType)) {
      throw new Error(`${path}: expected content type containing ${contentType}, got ${actualType}`);
    }
    if (!body.toLowerCase().includes(marker.toLowerCase())) throw new Error(`${path}: expected marker ${marker}`);
    if (path !== '/' && body.trimStart().toLowerCase().startsWith('<!doctype html')) {
      throw new Error(`${path}: asset unexpectedly returned the HTML shell`);
    }
    console.log(`✓ ${path} → ${actualType}`);
  }
  console.log('Smoke test passed.');
} finally {
  cleanup();
}
