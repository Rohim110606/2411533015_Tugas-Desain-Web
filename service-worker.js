const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/about.html",
  "/Kegiatan.html",
  "/contact.html",
  "/offline.html",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Install Service Worker & cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch & fallback ke cache saat offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then((res) => {
      return res || caches.match("/offline.html");
    }))
  );
});
