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
    let resolved = false;
    const checkReady = (chunk) => {
      if ((output + (chunk ? chunk.toString() : '')).includes('running at') && !resolved) {
        resolved = true;
        resolve();
      }
    };
    if (output.includes('running at')) {
      resolved = true;
      return resolve();
    }
    child.stdout.on('data', checkReady);
    child.once('error', reject);
    child.once('exit', (code) => {
      if (!resolved) reject(new Error(`server exited early with code ${code}: ${output}`));
    });
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(); // proceed to poll
      }
    }, 4000);
  });

  // Polling with retry to ensure socket is accepting connections
  let ready = false;
  for (let i = 0; i < 30; i++) {
    try {
      const probe = await fetch(`${base}/api/health`, { signal: AbortSignal.timeout(500) });
      if (probe.ok) {
        ready = true;
        break;
      }
    } catch {
      await new Promise((r) => setTimeout(r, 150));
    }
  }
  if (!ready) {
    throw new Error(`Server did not respond on ${base} within timeout. Output: ${output}`);
  }

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
