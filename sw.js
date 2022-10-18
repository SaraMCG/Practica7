const STATIC_CACHE_NAME = 'static-cache-v1.3';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1.1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1.1';

self.addEventListener('install', (event) => {
    console.log('SW: Instalado');
    const promiseCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll(
            [
                '/',
                '/index.html',
                '/images/navidad.jpg'
            ]
        );
    });

    const promiseCahceInmutable = caches
        .open(INMUTABLE_CACHE_NAME)
        .then((cache) => {
            return cache.addAll([
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-solid-900.ttf',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-solid-900.woff2'
            ]);
        });

    event.waitUntil(Promise.all([promiseCache, promiseCahceInmutable]));
});

self.addEventListener('fetch', (event) => {
    //console.log(event);
    const respCache = caches.match(event.request);
    event.respondWith(respCache);
})