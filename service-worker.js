const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  ".",
  "index.html",
  "about.html",
  "kegiatan.html",
  "contact.html",
  "offline.html",
  "donatcandy.png",            
  "gambar%202/pemandangan.jpg" 
];


self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});


self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});


self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      if (event.request.mode === "navigate") {
        return caches.match("/offline.html");
      } else {
        return caches.match(event.request);
      }
    })
  );
});







