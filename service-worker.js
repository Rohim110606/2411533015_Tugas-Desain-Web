const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  ".",
  "index.html",
  "about.html",
  "kegiatan.html",
  "contact.html",
  "offline.html",   // halaman offline
  "donatcandy.png",
  "gambar%202/pemandangan.jpg"
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch Event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        return response || caches.match("/offline.html"); // fallback offline
      });
    })
  );
});
