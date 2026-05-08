(() => {
  "use strict";

  window.MUSHROOM_APP_BUILD = "0.3.2-cache-reset";

  async function clearOldCaches() {
    if (!("caches" in window)) return;
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    } catch {
      // best-effort cleanup
    }
  }

  async function unregisterServiceWorkers() {
    if (!("serviceWorker" in navigator)) return;
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    } catch {
      // best-effort cleanup
    }
  }

  clearOldCaches();
  unregisterServiceWorkers();
})();
