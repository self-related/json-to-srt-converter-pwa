const pwaCache = "pwa_cache";
const precachedResources = [
    "/json-to-srt-converter-pwa/",
    "/json-to-srt-converter-pwa/index.html",
    "/json-to-srt-converter-pwa/index.js",
    "/json-to-srt-converter-pwa/styles.css",
    "/json-to-srt-converter-pwa/icons/favicon.png",
    "/json-to-srt-converter-pwa/icons/pwa-icon-512.png",
    "/json-to-srt-converter-pwa/scripts/converter.js",
    "/json-to-srt-converter-pwa/scripts/dom-handler.js",
    "/json-to-srt-converter-pwa/scripts/cache-worker.js"
];

async function precache() {
    const cache = await caches.open(pwaCache);
    await cache.addAll(precachedResources);
}


/**@type { function(Request): Response } */
async function fetchCacheFirst(request) {
    const cachedResponse = await caches.match(request, { ignoreSearch: true, ignoreVary: true });
    if (cachedResponse) return cachedResponse;

    // if not found in cache fetch and put in cache
    try {
        const netResponse = await fetch(request); 
        // only 200 can be put in cache
        if (netResponse.ok) {
            const cache = caches.open(pwaCache);
            await cache.put(request, netResponse.clone());
        }        
        return netResponse;
    } catch (err) {
        return new Response(`Resources not found in cache, err: ${err}`, { status: 200, headers: { "Content-Type": "text/plain" } });        
    }
}


self.addEventListener("install", (event) => {
    event.waitUntil(precache());
});


self.addEventListener('fetch', (event) => {
    event.respondWith(fetchCacheFirst(request));
});