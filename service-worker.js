const CACHE_NAME = "niezwykle-grzyby-polski-sw-disabled-v0-3-2";

async function cleanup() {
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => caches.delete(key)));
  await self.registration.unregister();
  const clientsList = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
  clientsList.forEach((client) => client.navigate(client.url));
}

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(cleanup());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(cleanup().then(() => self.clients.claim()));
});

self.addEventListener("fetch", () => {
  // Service worker intentionally disabled for MVP.
  // Let the browser fetch fresh files directly from Vercel.
});
