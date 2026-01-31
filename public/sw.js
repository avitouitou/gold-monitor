const CACHE_NAME = 'gold-tracker-v1';
const STATIC_ASSETS = [
  '/gold-monitor/',
  '/gold-monitor/index.html',
  '/gold-monitor/manifest.json',
  '/gold-monitor/icon-192.svg',
  '/gold-monitor/icon-512.svg',
];

const API_CACHE_NAME = 'gold-tracker-api-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== API_CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // API requests: network-first, fall back to cache
  if (url.hostname.includes('gold-api.com') || url.hostname.includes('open.er-api.com')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(API_CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Static assets: cache-first
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
