
const cacheActual = 'Grupo2-v1';

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
  'tp1.html'
];

self.addEventListener('install', function (event) {
    event.waitUntil
    (
      caches.open(cacheActual).then(function (cache) {
          return cache.addAll(recursosEstaticos);
      })
    );
});

self.addEventListener('activate', function (event) {
    var version = 'v1';
    event.waitUntil(
      caches.keys()
        .then(cacheNames =>
            Promise.all(
              cacheNames
                .map(c => c.split('-'))
                .filter(c => c[0] === 'Grupo2')
                .filter(c => c[1] !== version)
                .map(c => caches.delete(c.join('-')))
            )
        )
    );
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

