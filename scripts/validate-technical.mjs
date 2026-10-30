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
// The share image may drop the "www." people do not type.
const shownHost = new URL(canonical).host.replace(/^www\./, "");
assert(
  fs.readFileSync("scripts/generate-og-image.py", "utf8").includes(`"${shownHost}"`),
  "the share image should show the canonical address; update scripts/generate-og-image.py and run it"
);
// The former addresses send every page to the same page at the canonical address, for good (308).
// The bare atlas-osobliwosci.pl is sent to www by the domain settings in Vercel, not here.
for (const formerHost of ["niezwykle-grzyby-polski.vercel.app", "atlas-osobliwosci.vercel.app"]) {
  assert(
    vercelConfig.redirects?.some((rule) => rule.source === "/:path*" && rule.permanent === true &&
      rule.destination === `${origin}/:path*` && rule.has?.some((condition) => condition.type === "host" && condition.value === formerHost)),
    `vercel.json should redirect ${formerHost} permanently to ${origin}, keeping the path`
  );
}
// Vercel already redirects the bare domain to www; a rule back from www would loop.
assert(
  !vercelConfig.redirects?.some((rule) => rule.has?.some((condition) => condition.type === "host" && condition.value === new URL(canonical).host)),
  "vercel.json must not redirect the canonical address itself"
);

// Pages of collections and cards with their own titles, and the sitemap, are built on each deployment
// (npm run build, run by Vercel) and stay out of git.
assert.equal(packageJson.scripts?.build, "node scripts/build-pages.mjs", "npm run build should make the collection and card pages");
assert.equal(vercelConfig.buildCommand, "npm run build", "Vercel should build the collection and card pages on each deployment");
// With a build step Vercel looks for the site in public/ unless told otherwise; the site is the project root.
assert.equal(vercelConfig.outputDirectory, ".", "Vercel should serve the project root after the build");
const gitignore = fs.existsSync(".gitignore") ? fs.readFileSync(".gitignore", "utf8") : "";
assert(["/atlas/", "/mapa.html", "/quiz.html", "/sitemap.xml", "/404.html"].every((entry) => gitignore.split("\n").includes(entry)), ".gitignore should keep the built pages, sitemap and 404 page out of git");
assert(fs.readFileSync("robots.txt", "utf8").includes(`Sitemap: ${origin}/sitemap.xml`), "robots.txt should point to the sitemap at the canonical address");
{
  const { buildPages, cardSlug } = await import("./build-pages.mjs");
  const { loadAtlas } = await import("./build-start-page.mjs");
  const win = loadAtlas();
  const { pages, sitemap } = buildPages(win, indexHtml);
  const collections = win.ATLAS_APP_DATA.collections;
  const cardCount = collections.reduce((sum, collection) => sum + collection.items.length, 0);
  assert.equal(pages.length, 2 + collections.length + cardCount, "the map, the quiz, every collection and every card should get a page");
  assert.equal((sitemap.match(/<loc>/g) || []).length, pages.length + 1, "the sitemap should list the start page and every page");
  assert.equal(new Set(pages.map((page) => page.route)).size, pages.length, "every page should have its own address");
  const card = pages.find((page) => page.route === "/atlas/grzyby/okratek-australijski");
  assert(card, "the Okratek card should have a page at /atlas/grzyby/okratek-australijski");
  assert.match(card.html, /<title>Okratek australijski – Grzyby – Atlas Osobliwości Polski<\/title>/);
  assert(card.html.includes(`<link rel="canonical" href="${origin}/atlas/grzyby/okratek-australijski" />`), "a card page should name itself as canonical");
  assert(card.html.includes(`<meta property="og:url" content="${origin}/atlas/grzyby/okratek-australijski" />`), "a card page should share its own address");
  assert(card.html.includes('<div id="startPage" class="start-page is-hidden" tabindex="-1">'), "a card page should open on its collection, not the start page");
  assert(pages.find((page) => page.route === "/atlas/rekordy-krajobrazu/mofeta-swidzinskiego"), "card addresses should drop Polish letters");
  // The descriptions come from data/i18n.js, which the app uses too when the reader moves around the atlas.
  const ui = win.ATLAS_I18N.ui.pl;
  const okratek = collections.find((entry) => entry.id === "grzyby").items.find((item) => item.id === "okratek-australijski");
  const okratekDescription = ui.metaCardDescription.replace("{hook}", /[.!?…]$/.test(okratek.hook.trim()) ? okratek.hook.trim() : `${okratek.hook.trim()}.`).replace("{collection}", "Grzyby");
  assert(card.html.includes(`<meta name="description" content="${okratekDescription.replace(/"/g, "&quot;")}" />`), "a card page should describe itself with the text the app uses");
  // The start page tells search engines and link previews what data/i18n.js gives the app for it.
  assert(indexHtml.includes(`<meta name="description" content="${ui.metaStartDescription}" />`), "index.html should describe the start page as data/i18n.js does");
  assert(indexHtml.includes(`<meta property="og:description" content="${ui.metaStartShare}" />`) && indexHtml.includes(`<meta name="twitter:description" content="${ui.metaStartShare}" />`), "the start page's link preview should match data/i18n.js");
  // "Przejdź do treści" leads to the page shown: the start page, a collection, the map or the quiz.
  assert(indexHtml.includes('<a id="skipLink" class="skip-link" href="#startPage">') && indexHtml.includes('<div id="startPage" class="start-page" tabindex="-1">'), "on the start page the skip link should lead to the start page");
  assert(card.html.includes('<a id="skipLink" class="skip-link" href="#main">'), "on a card page the skip link should lead to the collection");
  for (const page of pages) {
    assert(page.html.includes('<script defer src="/js/app.js"></script>'), `${page.route}: the page should load the app`);
  }
  // The map of every place: its own title and address, opened on the map, with every placed card linked
  // for readers without scripts. js/app.js opens the same address.
  const { MAP_ROUTE } = await import("./build-pages.mjs");
  assert.equal(MAP_ROUTE, "/mapa");
  assert(appJs.includes(`const ALL_MAP_ROUTE = "${MAP_ROUTE}";`), "js/app.js should open the map of every place at the address of its page");
  const mapPage = pages.find((page) => page.route === MAP_ROUTE);
  assert.equal(mapPage?.file, "mapa.html", "the map of every place should be built as mapa.html, served at /mapa");
  assert.match(mapPage.html, /<title>Mapa atlasu – Atlas Osobliwości Polski<\/title>/);
  assert(mapPage.html.includes(`<link rel="canonical" href="${origin}${MAP_ROUTE}" />`), "the map page should name itself as canonical");
  assert(mapPage.html.includes('<div id="startPage" class="start-page is-hidden" tabindex="-1">'), "the map page should not open on the start page");
  assert(mapPage.html.includes('<div id="mapPage" class="map-page" tabindex="-1">'), "the map page should open on the map");
  assert(mapPage.html.includes('<main id="main" class="app-main is-hidden" tabindex="-1">'), "the map page should keep the collection view hidden");
  assert(mapPage.html.includes('<a id="skipLink" class="skip-link" href="#mapPage">'), "on the map page the skip link should lead to the map");
  const placedCards = collections.flatMap((collection) => collection.items.filter((item) => collection.places?.[item.id]).map((item) => `/atlas/${collection.id}/${cardSlug(item.id)}`));
  for (const route of placedCards) {
    assert(mapPage.html.includes(`href="${route}"`), `the map page should link to ${route} for readers without scripts`);
  }
  assert(sitemap.includes(`<loc>${origin}${MAP_ROUTE}</loc>`), "the sitemap should list the map page");
  // The quiz of the whole atlas: its own title and address, opened on the quiz; js/app.js opens the same address.
  const { QUIZ_ROUTE } = await import("./build-pages.mjs");
  assert.equal(QUIZ_ROUTE, "/quiz");
  assert(appJs.includes(`const ALL_QUIZ_ROUTE = "${QUIZ_ROUTE}";`), "js/app.js should open the quiz of the whole atlas at the address of its page");
  const quizPage = pages.find((page) => page.route === QUIZ_ROUTE);
  assert.equal(quizPage?.file, "quiz.html", "the quiz should be built as quiz.html, served at /quiz");
  assert.match(quizPage.html, /<title>Quiz atlasu – Atlas Osobliwości Polski<\/title>/);
  assert(quizPage.html.includes(`<link rel="canonical" href="${origin}${QUIZ_ROUTE}" />`), "the quiz page should name itself as canonical");
  assert(quizPage.html.includes('<div id="startPage" class="start-page is-hidden" tabindex="-1">'), "the quiz page should not open on the start page");
  assert(quizPage.html.includes('<div id="quizPage" class="quiz-page" tabindex="-1">'), "the quiz page should open on the quiz");
  assert(quizPage.html.includes('<a id="skipLink" class="skip-link" href="#quizPage">'), "on the quiz page the skip link should lead to the quiz");
  assert(sitemap.includes(`<loc>${origin}${QUIZ_ROUTE}</loc>`), "the sitemap should list the quiz page");
  // The page names the numbers of questions before the app runs; they have to be the app's.
  const dailyQuestions = appJs.match(/const DAILY_QUESTIONS = (\d+);/)?.[1];
  const mixQuestions = appJs.match(/const MIX_QUESTIONS = (\d+);/)?.[1];
  assert(dailyQuestions && mixQuestions, "js/app.js should set the numbers of questions of the atlas quiz");
  assert(indexHtml.includes(`<h2 id="dailyModeTitle">${dailyQuestions} pytań,`) && indexHtml.includes(`<p id="dailyQuizCardText">${dailyQuestions} pytań z całego atlasu`), "index.html should give the number of questions of the daily challenge");
  assert(indexHtml.includes(`<h2 id="mixModeTitle">${mixQuestions} pytań z całego atlasu</h2>`), "index.html should give the number of questions of the random quiz");
  // 404.html: out of search results, with a way home and a link to every collection.
  const { notFoundHtml } = await import("./build-pages.mjs");
  const notFound = notFoundHtml(win);
  assert(notFound.includes('<meta name="robots" content="noindex" />'), "404.html should stay out of search results");
  assert(notFound.includes('<a class="primary" href="/">'), "404.html should lead back to the start page");
  for (const collection of collections) {
    assert(notFound.includes(`href="${collection.route || `/atlas/${collection.id}`}"`), `404.html should link to ${collection.id}`);
  }
  assert(notFound.includes("/assets/logo-oroloko-ai.svg"), "404.html should keep the Made by Oroloko footer");
  // js/app.js builds the same card addresses as scripts/build-pages.mjs.
  assert(appJs.includes('String(id).normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").replace(/ł/g, "l").replace(/Ł/g, "L")'), "js/app.js and scripts/build-pages.mjs should make card addresses the same way");
}

// Screen readers hear which category filter is chosen and which view of a collection is shown.
assert(appJs.includes('aria-pressed="${state.category === id}"'), "the category filters should say which one is pressed");
assert(appJs.includes('btn.setAttribute("aria-current", "page")'), "the view tabs should say which view is shown");

// Contact and error reports go to the atlas's mailbox. The address is put together by js/app.js, never
// written out in the pages, where address-harvesting bots would find it.
{
  const domain = ["atlas-osobliwosci", "pl"].join(".");
  assert(appJs.includes(`const CONTACT_EMAIL = ["kontakt", "${domain}"].join("@");`), "js/app.js should put the contact address together");
  assert(!indexHtml.includes(`@${domain}`) && !indexHtml.includes(`mailto:`), "index.html should not spell out the contact address");
  assert(/cardReportHtml\(collection, item\)/.test(appJs) && appJs.includes('$("#footerContact")'), "cards and the footer should lead to the contact address");
}

// "Moja szuflada" and the position for "Blisko mnie" stay in the browser, as the page says: the app's own
// scripts send nothing anywhere (the map library fetches only the base map).
for (const file of ["js/app.js", "js/cache-reset.js", "data/collections.js", "data/i18n.js"]) {
  assert.doesNotMatch(fs.readFileSync(file, "utf8"), /\bfetch\(|XMLHttpRequest|sendBeacon|WebSocket|EventSource/, `${file} should not send anything anywhere`);
}

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
  /const pool = quizPool\(collection\);[\s\S]{0,200}sample\(pool, Math\.min\(10, pool\.length\)\)/,
  "quiz should sample unique correct answers, without Holocaust and martyrdom sites, before building questions"
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

  const quizResponse = await fetch(`http://127.0.0.1:${port}/quiz`);
  assert.equal(quizResponse.status, 200, "local dev server should serve the quiz of the whole atlas");
  assert.match(await quizResponse.text(), /id="quizPage"/, "the quiz address should open the app");

  const mapResponse = await fetch(`http://127.0.0.1:${port}/mapa`);
  assert.equal(mapResponse.status, 200, "local dev server should serve the map of every place");
  assert.match(await mapResponse.text(), /id="mapPage"/, "the map address should open the app");

  const missingResponse = await fetch(`http://127.0.0.1:${port}/not-a-real-file.js`);
  assert.equal(missingResponse.status, 404, "local dev server should keep non-atlas missing files as 404");
} finally {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}
