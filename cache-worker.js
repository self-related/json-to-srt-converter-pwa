const pwaCache = "pwa_cache";
const precachedFiles = [
    "./",
    "./index.html",
    "./index.js",
    "./styles.css",
    "./cache-worker.js",
    "./manifest.json",
    "./icons/favicon.png",
    "./icons/pwa-icon-512.png",
    "./scripts/converter.js",
    "./scripts/dom-handler.js"
];


async function preCache() {
    const cache = await caches.open(pwaCache);
    await cache.addAll(precachedFiles);

    console.log("Pre-cache completed");
}


/**
 * @param { Request } request 
 * @returns { Promise<Response> }
 */
async function cacheFirstFetch(request) {
    const cache = await caches.open(pwaCache);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        console.log("Found in cache: " + request.url);
        return cachedResponse;
    }

    // if not found in cache
    console.log("Not found in cache: " + request.url);

    try {
        const netResponse = await fetch(request);

        if (netResponse.status === 200) {
            const cache = await caches.open(pwaCache);
            await cache.put(request, netResponse.clone());

            console.log("Fetched new resource and put in cache: " + request.url);
        } else {
            console.log(`Resource fetched with code ${netResponse.status}, need 200 for cache`);
        }


        return netResponse;     

    } catch (error) {
        const errorMsg = "Can't get url: " + request.url;
        console.log(errorMsg);
        
        return new Response(errorMsg, {
            status: 200, 
            headers: { "Content-Type": "text/plain" } 
        });
    }
}


self.addEventListener("install", (event) => {
    console.log("Install event fired in cache worker");
    event.waitUntil(preCache());
});


self.addEventListener("fetch", (event) => {
    console.log("Fetch event fired in cache worker");
    event.respondWith(cacheFirstFetch(event.request));
});