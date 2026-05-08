const CACHE_NAME = "niezwykle-grzyby-polski-safe-no-cache-v0-3-3";

async function clearOldCaches() {
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => caches.delete(key)));
}

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(clearOldCaches());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // Service worker kept as a safe no-op for older browser registrations.
  // Do not call respondWith(), so every request goes directly to the network.
  // Do not navigate clients from here; that can create reload loops in previews.
});
