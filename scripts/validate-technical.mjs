import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const readme = fs.readFileSync("README.md", "utf8");
const appJs = fs.readFileSync("js/app.js", "utf8");
const cacheResetJs = fs.readFileSync("js/cache-reset.js", "utf8");
const indexHtml = fs.readFileSync("index.html", "utf8");
const vercelConfig = JSON.parse(fs.readFileSync("vercel.json", "utf8"));

// MapLibre GL JS 4.7.1 (not 5.x, which breaks iOS < 13.4) is vendored unmodified from the npm package
// and loaded only when the map view opens; see vendor/maplibre-gl-4.7.1/README.md.
const maplibreFiles = {
  "maplibre-gl.js": "be9633c4d870e26fb37f1cfe5c5a77181667114003ea16207ac7850d8da8add1",
  "maplibre-gl.css": "576b085fdd9487a65a19215328c1e086c07ce5bf6da09b666b3806d3d008dae9",
  "LICENSE.txt": "ee5fc05a0677eaf69601d2c7db0d9ecd6cc27c3abc1d0733bc9ed34707cf8ef2"
};
for (const [file, sha256] of Object.entries(maplibreFiles)) {
  const digest = crypto.createHash("sha256").update(fs.readFileSync(`vendor/maplibre-gl-4.7.1/${file}`)).digest("hex");
  assert.equal(digest, sha256, `vendor/maplibre-gl-4.7.1/${file} should be the unmodified MapLibre 4.7.1 file`);
}
assert.doesNotMatch(indexHtml, /maplibre/i, "index.html should not load MapLibre up front");
assert.match(appJs, /"\/vendor\/maplibre-gl-4\.7\.1\/"/, "the map view should load the vendored MapLibre 4.7.1");
assert(
  vercelConfig.headers?.some((rule) => rule.source === "/vendor/(.*)" && rule.headers.some((header) => /immutable/.test(header.value))),
  "versioned vendor files should be cached as immutable"
);

// Fonts are self-hosted (SIL Open Font License, licenses next to the files); no request goes to Google Fonts.
const stylesCss = fs.readFileSync("css/styles.css", "utf8");
assert.doesNotMatch(indexHtml, /fonts\.(googleapis|gstatic)\.com/, "index.html should not load Google Fonts");
const fontFiles = [...stylesCss.matchAll(/url\("\/fonts\/([^"]+\.woff2)"\)/g)].map((match) => match[1]);
assert(fontFiles.length > 0, "css/styles.css should declare the self-hosted fonts");
for (const file of fontFiles) assert(fs.existsSync(`fonts/${file}`), `fonts/${file} is declared in css/styles.css but missing`);
for (const file of fs.readdirSync("fonts").filter((name) => name.endsWith(".woff2"))) {
  assert(fontFiles.includes(file), `fonts/${file} is not used by css/styles.css`);
  const family = file.replace(/-latin(-ext)?-\d{3}-(normal|italic)\.woff2$/, "");
  assert(fs.existsSync(`fonts/OFL-${family}.txt`), `fonts/${file} needs its license in fonts/OFL-${family}.txt`);
}
for (const [, href] of indexHtml.matchAll(/rel="preload" href="([^"]+)"/g)) {
  assert(fs.existsSync(`.${href}`), `index.html preloads ${href}, which does not exist`);
}

// The site lives at one address: the canonical link, the share metadata and the share image name the same one.
const canonical = indexHtml.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
assert(canonical, "index.html should name its canonical address");
const origin = new URL(canonical).origin;
for (const [, name, value] of indexHtml.matchAll(/<meta (?:property|name)="((?:og|twitter):(?:url|image))" content="([^"]+)"/g)) {
  assert(value.startsWith(origin), `${name} should use the canonical address ${origin}, not ${value}`);
}
assert(
  fs.readFileSync("scripts/generate-og-image.py", "utf8").includes(`"${new URL(canonical).host}"`),
  "the share image should show the canonical address; update scripts/generate-og-image.py and run it"
);

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
