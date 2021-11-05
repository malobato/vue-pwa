const CACHE_NAME = "v1_cache_vue_counter";
const urlsToCache = [
    "./",
    "./images/pig.png",
    "./images/pig16.png",
    "./images/pig32.png",
    "./images/pig64.png",
    "./images/pig128.png",
    "./images/pig256.png",
    "./images/pig512.png",
    "./images/pig1024.png",
    "./js/main.js",
    "./js/mountApp.js",
    "./css/style.css",
    "https://unpkg.com/vue@next",
    "https://necolas.github.io/normalize.css/8.0.1/normalize.css"    
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(urlsToCache).then(
                () => self.skipWaiting()
            ).catch(
                error => console.error(error)
            )
        )
    );
});

self.addEventListener("activate", event => {
    const cacheWhiteList = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(
            cacheNames => {
                console.log(cacheNames);
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if (cacheWhiteList.indexOf(cacheName) === -1) {
                                return caches.delete(cacheName);
                            }
                        }
                    )
                )
            }
        ).then(
            () => self.clients.claim()
        )
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(
            response => {
                if (response) {
                    return response;
                }

                return fetch(event.request);
            }
        )
    )
});
