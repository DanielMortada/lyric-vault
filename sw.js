const CACHE_NAME = 'vault-cache-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json'
];

// Install Event: Cache the core assets instantly
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
});

// Fetch Event: Serve from cache first, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});