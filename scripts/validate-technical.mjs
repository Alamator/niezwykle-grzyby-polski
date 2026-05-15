import assert from "node:assert/strict";
import fs from "node:fs";

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const readme = fs.readFileSync("README.md", "utf8");
const appJs = fs.readFileSync("js/app.js", "utf8");
const cacheResetJs = fs.readFileSync("js/cache-reset.js", "utf8");

assert.equal(
  packageJson.scripts?.dev,
  "node scripts/dev-server.mjs",
  "local dev should use the project Node server instead of platform-specific python aliases"
);
assert(
  fs.existsSync("scripts/dev-server.mjs"),
  "local dev server should exist and provide SPA route fallback"
);
assert.match(
  readme,
  /npm run dev/,
  "README should document the project dev command"
);
assert.match(
  readme,
  /\/atlas\/rekordy-krajobrazu/,
  "README should mention that nested atlas routes work locally"
);

assert.doesNotMatch(
  appJs,
  /serviceWorker\.register/,
  "the app should not register a self-unregistering service worker"
);
assert.match(
  cacheResetJs,
  /getRegistrations\(\)/,
  "cache reset should keep unregistering old service workers for existing visitors"
);
assert.match(
  cacheResetJs,
  /registration\.unregister\(\)/,
  "cache reset should unregister old service worker registrations"
);

assert(
  !fs.existsSync("data/data/photo-pack-v05.js"),
  "duplicate nested photo-pack-v05.js copy should not be kept in data/data"
);

assert.match(
  appJs,
  /function buildQuestions\(\)/,
  "quiz should build a unique set of question seeds for each round"
);
assert.match(
  appJs,
  /sample\(items\(\), Math\.min\(10, items\(\)\.length\)\)/,
  "quiz should sample unique correct answers before building questions"
);

const { createStaticServer } = await import("./dev-server.mjs");
const server = createStaticServer();

await new Promise((resolve) => {
  server.listen(0, "127.0.0.1", resolve);
});

try {
  const { port } = server.address();
  const atlasResponse = await fetch(`http://127.0.0.1:${port}/atlas/rekordy-krajobrazu`);
  assert.equal(atlasResponse.status, 200, "local dev server should serve nested atlas routes");
  assert.match(
    await atlasResponse.text(),
    /Atlas Osobliwości Polski/,
    "nested atlas route should fall back to index.html"
  );

  const missingResponse = await fetch(`http://127.0.0.1:${port}/not-a-real-file.js`);
  assert.equal(missingResponse.status, 404, "local dev server should keep non-atlas missing files as 404");
} finally {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}
