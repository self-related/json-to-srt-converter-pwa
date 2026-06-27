const pwaCache = "pwa_cache";
const precachedResources = [
    "./",
    "./index.html",
    "./index.js",
    "./styles.css",
    "./icons/favicon.png",
    "./icons/pwa-icon-512.png",
    "./scripts/converter.js",
    "./scripts/dom-handler.js",
    "./cache-worker.js"
];

async function precache() {
    const cache = await caches.open(pwaCache);
    await cache.addAll(precachedResources);

    console.log("pre-cache complete");
}


/**@type { function(Request): Response } */
async function fetchCacheFirst(request) {
    const cachedResponse = await caches.match(request, { ignoreSearch: true, ignoreVary: true });
    if (cachedResponse) {
        console.log("Found in cache: " + cachedResponse.url);
        
        return cachedResponse;
    } 


    console.log("Not found in cache: " + request.url);

    
    // if not found in cache fetch and put in cache
    try {
        const netResponse = await fetch(request); 
        // only 200 can be put in cache
        if (netResponse.ok) {
            const cache = await caches.open(pwaCache);
            await cache.put(request, netResponse.clone());
        }
        return netResponse;
    } catch (err) {
        return new Response(`Resources not found in cache, err: ${err}`, { status: 200, headers: { "Content-Type": "text/plain" } });        
    }
}


self.addEventListener("install", (event) => {
    console.log("install event fired");

    event.waitUntil(precache());
});


self.addEventListener('fetch', (event) => {
    console.log("Fetch event fired");

    event.respondWith(fetchCacheFirst(event.request));
});