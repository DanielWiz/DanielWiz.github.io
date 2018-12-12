var cacheName = 'ListaPaginaCache';
var filesToCache = [
  '/',
  '/DetallesListas.html',
  '/index.html',
  '/Listas.html',
  '/Login.html',
  '/registro.html',
  '/tiendas.html',
  'js/app.js',
  'js/menu.js',
  '/service-worker.js',
  'IMG/Login.png',
  'IMG/loginImagen.png',
  'IMG/logo lista.png',
  'IMG/RegisterImagen.png',
  'styles/background.css',
  'styles/botonesIndex.css',
  'styles/formulario.css',
  'styles/menu.css'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

