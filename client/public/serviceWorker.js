const CACHE = "v1"
const urlToCache = ["index.html", "offline.html"]

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            // console.log('Opened cache'); 
            return cache.addAll(urlToCache)
        })
    )
})


this.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            return fetch(e.request).catch(()=> caches.match('offline.html') )
        })
    )
})


this.addEventListener('activate', (ev)=> {
    const cacheWhiteList = [] 
    cacheWhiteList.push(CACHE)

    ev.waitUntil(caches.keys().then((cacheNames)=> Promise.all(
        cacheNames.map((cacheName)=> {
            if(!cacheWhiteList.includes(cacheName)) {
                return caches.delete(cacheName); 
            }
        })
    ) ))
})