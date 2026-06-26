const pwaCache = "pwa_cache";
const precachedResources = [
    "/json-to-srt-converter-pwa/",
    "/json-to-srt-converter-pwa/index.html",
    "/json-to-srt-converter-pwa/index.js",
    "/json-to-srt-converter-pwa/styles.css",
    "/json-to-srt-converter-pwa/manifest.json",
    "/json-to-srt-converter-pwa/icons/pwa-icon-512.png",
    "/json-to-srt-converter-pwa/icons/favicon.png",
    "/json-to-srt-converter-pwa/scripts/converter.js",
    "/json-to-srt-converter-pwa/scripts/dom-handler.js",
    "/json-to-srt-converter-pwa/scripts/cache-worker.js"
];

async function precache() {
    const cache = await caches.open(pwaCache);
    return cache.addAll(precachedResources);
}

async function cacheFirst(request) {
    const responseCached = await caches.match(request);
    if (responseCached) 
    return responseCached;

    // if response not matched, fetch and add to cache as well
    try {
        let response = await fetch(request);

        const spoofedHeaders = new Headers(response.headers);
        spoofedHeaders.delete('cache-control');
        spoofedHeaders.delete('expires')

        const blob = await response.blob();
        const spoofedResponse = new Response(blob, { 
            status: response.status, 
            statusText: response.statusText, 
            headers: spoofedHeaders 
        });
        response = spoofedResponse; // spoof response
        
        if (response.ok) {
            const cache = await caches.open(pwaCache);
            cache.put(request, response.clone());
        }
        return response;
    } catch(error) {
        return responseCached || Response.error();
    }
}


self.addEventListener("install", (event) => {
    event.waitUntil(precache());
});


self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
    if (precachedResources.includes(url.pathname)) {
        event.respondWith(cacheFirst(event.request));
    }
});


self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});