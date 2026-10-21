import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

// Hardening: Disable information disclosure headers
app.disable('x-powered-by');

// Hardening: Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com https://unpkg.com https://cdn.jsdelivr.net https://www.googletagmanager.com https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://unpkg.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://*.supabase.co https://*.googleapis.com https://www.google-analytics.com; frame-src 'self' https://www.google.com https://maps.google.com; frame-ancestors 'self'; object-src 'none'; base-uri 'self';"
  );
  next();
});

// Middleware to parse json bodies if needed
app.use(express.json());

// Simple .env parser for local dev if available
import fs from 'fs';
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const idx = trimmed.indexOf('=');
        if (idx !== -1) {
          const key = trimmed.slice(0, idx).trim();
          const val = trimmed.slice(idx + 1).trim();
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    });
  } catch (e) {
    console.warn('Could not read .env file:', e.message);
  }
}

// Environment endpoint (mirrors Vercel /__env.js and /api/env.js)
const handleEnv = (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Cache-Control', 'no-store');
  const supabaseUrl = (process.env.SUPABASE_URL || '').replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY || '';
  res.status(200).send(
    `window.__ENV__ = { SUPABASE_URL: ${JSON.stringify(supabaseUrl)}, SUPABASE_ANON_KEY: ${JSON.stringify(supabaseAnonKey)}, GOOGLE_MAPS_API_KEY: ${JSON.stringify(googleMapsApiKey)} };`
  );
};

app.get('/__env.js', handleEnv);
app.get('/api/env.js', handleEnv);
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Pondok Pesantren Jauharul Maknuun Web Portal',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve static assets from project root
app.use(express.static(__dirname));

// Route tests explicitly if accessed
app.use('/tests', express.static(path.join(__dirname, 'tests')));

// Root route handler
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback for SPA/direct navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`PPSPJM Portal server running at http://${HOST}:${PORT}`);
});
