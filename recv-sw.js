var _cacheName = 'cimbar-transfer-recv-v9';
var _cacheFiles = [
  'recv.html',
  'recv-worker.js',
  'recv-sw.js',
  'vendor/cimbar_js.js',
  'vendor/cimbar_js.wasm',
  'vendor/cimbar_js.2026-01-20T0312.wasm',
  'cimbar_js.2026-01-20T0312.wasm',
  'vendor/zstd.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(_cacheName).then(function(cache) {
      return cache.addAll(_cacheFiles);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.map(function(cn) {
          if (cn !== _cacheName) return caches.delete(cn);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});
