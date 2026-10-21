const CACHE_NAME = 'ppjm-v9';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/maps.js',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
  '/logo.jpg',
  '/logo-sdirada.png'
];

const isSameOrigin = (request) => new URL(request.url).origin === self.location.origin;
const isApiRequest = (url) => url.pathname.startsWith('/api/') || url.pathname === '/__env.js';
const isAssetRequest = (request) => /\.(?:js|css|json|webmanifest|svg|png|jpg|jpeg|webp|woff2?)$/i.test(new URL(request.url).pathname);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || !isSameOrigin(request)) return;

  const url = new URL(request.url);
  if (isApiRequest(url)) return;

  // Always prefer the network for document navigations so deployments are not hidden by stale HTML.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {});
          }
          return response;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const networkRequest = fetch(request).then((response) => {
        const contentType = response.headers.get('content-type') || '';
        const validAsset = response.ok && (!isAssetRequest(request) || !contentType.includes('text/html'));
        if (validAsset) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {});
        }
        return response;
      });
      return cachedResponse || networkRequest.catch(() => undefined);
    })
  );
});
