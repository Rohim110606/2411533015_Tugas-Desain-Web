const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/about.html",
  "/kegiatan.html",
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
  self.skipWaiting();
});

// Activate Service Worker & hapus cache lama
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

// Fetch & fallback ke cache saat offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        if (response) return response;

        // fallback khusus untuk halaman navigasi
        if (event.request.mode === "navigate") {
          return caches.match("/offline.html");
        }
      });
    })
  );
});
