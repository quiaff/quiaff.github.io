
const cacheActual = 'Grupo2-v2';

const recursosEstaticos = [
  'css/materialize.min.css',
  'css/estilos.css',
  'js/materialize.min.js',
  'icons/512.png',
  'icons/192.png',
  'img/gaby_chica.jpg',
  'img/julian_chica.jpg',
  'img/vanesa_chica.jpg',
  'img/nayi_chica.jpg',
  'index.html',
  'tp1.html',
  'favicon.ico',
  'sw.js'
];

self.addEventListener('install', function (event) {
    event.waitUntil
    (
      caches.open(cacheActual).then(function (cache) {
          return cache.addAll(recursosEstaticos);
      })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');

    e.waitUntil(
        caches.keys().then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
            if (key !== cacheActual) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          }));
        })
    );

    return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.match(event.request)
        .then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

