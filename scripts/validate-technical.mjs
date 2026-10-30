import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

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
// (npm run build, run by Vercel) and stay out of git. Then scripts/version-assets.mjs puts each site file's
// hash in its address, and only such an address may stay in the browser for a year.
assert.equal(packageJson.scripts?.build, "node scripts/build-pages.mjs", "npm run build should make the collection and card pages");
assert.equal(vercelConfig.buildCommand, "npm run build && node scripts/version-assets.mjs --in-place", "Vercel should build the collection and card pages, then put the files' hashes in their addresses, on each deployment");
{
  const rule = (source) => vercelConfig.headers?.find((entry) => entry.source === source);
  const cacheControl = (entry) => entry?.headers.find((header) => header.key === "Cache-Control")?.value;
  const byVersion = (conditions) => conditions?.some((condition) => condition.type === "query" && condition.key === "v" && condition.value === undefined);
  assert(byVersion(rule("/(.*)")?.missing) && cacheControl(rule("/(.*)")) === "public, max-age=0, must-revalidate", "pages and files without ?v= should be checked on every visit");
  for (const dir of ["css", "js", "data", "fonts"]) {
    assert(byVersion(rule(`/${dir}/(.*)`)?.has) && cacheControl(rule(`/${dir}/(.*)`)) === "public, max-age=31536000, immutable", `files in ${dir}/ should stay in the browser for a year, but only at an address with ?v=`);
  }
}
// Every response: no guessing the type of a file, only the site's address for the sites it links to, and
// no camera, microphone or payments. The location stays on for "Blisko mnie", on the site's own pages only.
{
  const rule = vercelConfig.headers?.find((entry) => entry.source === "/(.*)" && !entry.has && !entry.missing);
  const header = (key) => rule?.headers.find((entry) => entry.key === key)?.value;
  assert.equal(header("X-Content-Type-Options"), "nosniff", "every response should forbid guessing the type of a file");
  assert.equal(header("Referrer-Policy"), "strict-origin-when-cross-origin", "other sites should get only the site's address");
  const permissions = (header("Permissions-Policy") || "").split(/,\s*/);
  for (const feature of ["camera=()", "microphone=()", "payment=()", "geolocation=(self)"]) {
    assert(permissions.includes(feature), `the Permissions-Policy header should include ${feature}`);
  }
  assert(appJs.includes("navigator.geolocation.getCurrentPosition"), "the location is allowed only for \"Blisko mnie\"; without it, set geolocation=() in vercel.json");
}
// With a build step Vercel looks for the site in public/ unless told otherwise; the site is the project root.
assert.equal(vercelConfig.outputDirectory, ".", "Vercel should serve the project root after the build");
const gitignore = fs.existsSync(".gitignore") ? fs.readFileSync(".gitignore", "utf8") : "";
assert(["/atlas/", "/en/", "/en.html", "/mapa.html", "/quiz.html", "/sitemap.xml", "/404.html"].every((entry) => gitignore.split("\n").includes(entry)), ".gitignore should keep the built pages, sitemap and 404 page out of git");
assert(fs.readFileSync("robots.txt", "utf8").includes(`Sitemap: ${origin}/sitemap.xml`), "robots.txt should point to the sitemap at the canonical address");
{
  const { buildPages, cardSlug, routeForCollection } = await import("./build-pages.mjs");
  const { buildStartPage, loadAtlas } = await import("./build-start-page.mjs");
  const win = loadAtlas();
  const { pages, sitemap } = buildPages(win, indexHtml);
  const collections = win.ATLAS_APP_DATA.collections;
  const cardCount = collections.reduce((sum, collection) => sum + collection.items.length, 0);
  assert.equal(pages.length, 2 * (2 + collections.length + cardCount) + 1, "the map, the quiz, every collection and every card should get a page in Polish and in English, and the English start page one too");
  assert.equal((sitemap.match(/<loc>/g) || []).length, pages.length + 1, "the sitemap should list the start page and every page");
  assert.equal(new Set(pages.map((page) => page.route)).size, pages.length, "every page should have its own address");
  const card = pages.find((page) => page.route === "/atlas/grzyby/okratek-australijski");
  assert(card, "the Okratek card should have a page at /atlas/grzyby/okratek-australijski");
  assert.match(card.html, /<title>Okratek australijski – Grzyby – Atlas Osobliwości Polski<\/title>/);
  assert(card.html.includes(`<link rel="canonical" href="${origin}/atlas/grzyby/okratek-australijski" />`), "a card page should name itself as canonical");
  assert(card.html.includes(`<meta property="og:url" content="${origin}/atlas/grzyby/okratek-australijski" />`), "a card page should share its own address");
  assert(card.html.includes('<div id="startPage" class="start-page is-hidden" tabindex="-1">'), "a card page should open on its collection, not the start page");
  // The photo at the top of the collection is in the page, so the browser fetches it before the app runs.
  // The app keeps it when the page is marked with the same collection and language (renderCollectionPhoto),
  // so the page must hold what the app would draw. collectionPhotoHtml in scripts/build-pages.mjs copies these
  // lines of js/app.js: change both, then this list.
  const appBanner = [
    "if (!node || (node.dataset.collection === collection.id && node.dataset.language === state.language)) return;",
    'return `${photo.image}?width=${width}`;',
    '<picture><source media="(max-width: 620px)" srcset="${escapeHtml(commonsSrc(cover.photo, 500))}" /><img src="${escapeHtml(commonsSrc(cover.photo, 960))}" alt="" decoding="async" fetchpriority="high" onerror="this.remove()" /></picture>',
    '${photoCreditHtml(cover.photo, localized(cover.name), "collection-bar__credit")}',
    '<a class="photo-credit ${className}" href="${escapeHtml(photo.source)}" target="_blank" rel="noopener noreferrer"><span class="visually-hidden">${escapeHtml(t("photoCreditPrefix", { name }))}</span>${escapeHtml(`${photo.author} · ${photo.license}`)}</a>'
  ];
  for (const line of appBanner) {
    assert(appJs.includes(line), `js/app.js no longer draws the collection photo as scripts/build-pages.mjs writes it (collectionPhotoHtml); missing: ${line}`);
  }
  // Every collection and card page: the photo of its collection, fetched first at the widths the app uses,
  // with its author, license and source.
  const esc = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" })[char]);
  const { covers } = buildStartPage(win);
  for (const collection of collections) {
    const route = routeForCollection(collection);
    const { photo, name } = covers[collection.id];
    const src = (width) => esc(`${photo.image}?width=${width}`);
    const credit = `<a class="photo-credit collection-bar__credit" href="${esc(photo.source)}" target="_blank" rel="noopener noreferrer"><span class="visually-hidden">${esc(win.ATLAS_I18N.ui.pl.photoCreditPrefix.replace("{name}", name.pl))}</span>${esc(`${photo.author} · ${photo.license}`)}</a>`;
    for (const page of pages.filter((entry) => entry.route === route || entry.route.startsWith(`${route}/`))) {
      assert(page.html.includes(`<div id="collectionPhoto" class="collection-bar__photo" data-collection="${collection.id}" data-language="pl">`), `${page.route}: the page should have the photo of its collection, marked for the app`);
      assert(page.html.includes(`<picture><source media="(max-width: 620px)" srcset="${src(500)}" /><img src="${src(960)}" alt="" decoding="async" fetchpriority="high" onerror="this.remove()" /></picture>`), `${page.route}: the collection photo should be fetched first, at the widths the app uses`);
      assert(page.html.includes(credit), `${page.route}: the collection photo should keep its author, license and source`);
    }
  }
  // Commons serves photos only at fixed widths and rounds any other up, so a card photo offers only those.
  const cardWidthsList = /const CARD_PHOTO_WIDTHS = (\[[\d,\s]*\]);/.exec(appJs);
  assert(cardWidthsList, "js/app.js should list the card photo widths in CARD_PHOTO_WIDTHS");
  assert(JSON.parse(cardWidthsList[1]).every((width) => [250, 330, 500, 960, 1280].includes(width)), "card photos should offer only the widths Commons serves");
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
  assert(indexHtml.includes('<a id="skipLink" class="skip-link" href="#startPage"') && indexHtml.includes('<div id="startPage" class="start-page" tabindex="-1">'), "on the start page the skip link should lead to the start page");
  assert(card.html.includes('<a id="skipLink" class="skip-link" href="#main"'), "on a card page the skip link should lead to the collection");
  // One main area holds every page the app shows, so screen readers find the content on each of them.
  assert.equal((indexHtml.match(/<main\b/g) || []).length, 1, "index.html should have one main element");
  const mainHtml = indexHtml.slice(indexHtml.indexOf("<main>"), indexHtml.indexOf("</main>"));
  for (const id of ["startPage", "mapPage", "quizPage", "main"]) assert(mainHtml.includes(` id="${id}" `), `the main element should hold #${id}`);
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
  assert(mapPage.html.includes('<div id="main" class="app-main is-hidden" tabindex="-1">'), "the map page should keep the collection view hidden");
  assert(mapPage.html.includes('<a id="skipLink" class="skip-link" href="#mapPage"'), "on the map page the skip link should lead to the map");
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
  assert(quizPage.html.includes('<a id="skipLink" class="skip-link" href="#quizPage"'), "on the quiz page the skip link should lead to the quiz");
  assert(sitemap.includes(`<loc>${origin}${QUIZ_ROUTE}</loc>`), "the sitemap should list the quiz page");
  // The page names the numbers of questions before the app runs; they have to be the app's.
  const dailyQuestions = appJs.match(/const DAILY_QUESTIONS = (\d+);/)?.[1];
  const mixQuestions = appJs.match(/const MIX_QUESTIONS = (\d+);/)?.[1];
  assert(dailyQuestions && mixQuestions, "js/app.js should set the numbers of questions of the atlas quiz");
  assert(indexHtml.includes(`<h2 id="dailyModeTitle">${dailyQuestions} pytań,`) && indexHtml.includes(`<p id="dailyQuizCardText">${dailyQuestions} pytań z całego atlasu`), "index.html should give the number of questions of the daily challenge");
  assert(indexHtml.includes(`<h2 id="mixModeTitle">${mixQuestions} pytań z całego atlasu</h2>`), "index.html should give the number of questions of the random quiz");
  const buildPagesJs = fs.readFileSync("scripts/build-pages.mjs", "utf8");
  assert(buildPagesJs.includes(`const DAILY_QUESTIONS = ${dailyQuestions};`) && buildPagesJs.includes(`const MIX_QUESTIONS = ${mixQuestions};`), "the English pages should give the app's numbers of questions");

  // English pages: every page has a twin at the same address under /en, and both name each other for
  // search engines (hreflang), Polish being the default. js/app.js gives pages the same addresses.
  const { addressFor, ENGLISH_PREFIX } = await import("./build-pages.mjs");
  assert.equal(ENGLISH_PREFIX, "/en");
  assert(appJs.includes(`const ENGLISH_PREFIX = "${ENGLISH_PREFIX}";`), "js/app.js should put the English pages under the same prefix");
  const bodyOf = (source, name) => source.match(new RegExp(`^( *)(?:export )?function ${name}\\([^)]*\\) \\{\\n([\\s\\S]*?)\\n\\1\\}$`, "m"))?.[2].replace(/\s+/g, " ").trim();
  for (const name of ["addressFor", "markdownLight"]) {
    assert(bodyOf(appJs, name) && bodyOf(appJs, name) === bodyOf(buildPagesJs, name), `${name} should be the same in js/app.js and scripts/build-pages.mjs`);
  }
  const english = (route) => addressFor(route, "en");
  assert.equal(english("/"), "/en");
  assert.equal(english("/mapa"), "/en/mapa");
  assert.equal(english("/#myDrawer"), "/en#myDrawer");
  const byRoute = new Map(pages.map((page) => [page.route, page]));
  const alternates = (route) => [["pl", route], ["en", english(route)], ["x-default", route]]
    .map(([hreflang, address]) => `<link rel="alternate" hreflang="${hreflang}" href="${origin}${address}" />`);
  assert(alternates("/").every((link) => indexHtml.includes(link)), "index.html should name the English start page and itself as the default");
  for (const page of pages.filter((entry) => entry.route !== ENGLISH_PREFIX && !entry.route.startsWith(`${ENGLISH_PREFIX}/`))) {
    const twin = byRoute.get(english(page.route));
    assert(twin, `${page.route} should have an English page at ${english(page.route)}`);
    assert.equal(twin.file, `${english(page.route).slice(1)}.html`, `${twin.route} should be built where Vercel serves it`);
    for (const link of alternates(page.route)) {
      assert(page.html.includes(link) && twin.html.includes(link), `${page.route} and ${twin.route} should name each other: ${link}`);
    }
    assert(page.html.includes('<html lang="pl">') && page.html.includes('<meta property="og:locale" content="pl_PL" />'), `${page.route} should be in Polish`);
    assert(twin.html.includes('<html lang="en">') && twin.html.includes('<meta property="og:locale" content="en_US" />'), `${twin.route} should be in English`);
    assert(twin.html.includes(`<link rel="canonical" href="${origin}${twin.route}" />`) && twin.html.includes(`<meta property="og:url" content="${origin}${twin.route}" />`), `${twin.route} should name itself as canonical`);
    assert(sitemap.includes(`<loc>${origin}${twin.route}</loc>`), `the sitemap should list ${twin.route}`);
  }
  assert(sitemap.includes(`<loc>${origin}${ENGLISH_PREFIX}</loc>`), "the sitemap should list the English start page");
  // Every text the app writes by its key reads as data/i18n.js gives it: in Polish in index.html, in
  // English on the English pages, so nothing changes language when the app starts.
  const i18nUi = win.ATLAS_I18N.ui;
  const keyed = (html) => [
    ...[...html.matchAll(/<(\w+)\b[^>]*\sdata-i18n="(\w+)"[^>]*>([^<]*)<\/\1>/g)].map(([, , key, text]) => ({ key, text, expect: (ui) => esc(ui[key]) })),
    ...[...html.matchAll(/<(\w+)\b[^>]*\sdata-i18n-html="(\w+)"[^>]*>([\s\S]*?)<\/\1>/g)].map(([, , key, text]) => ({ key, text, expect: (ui) => markdownLightOf(ui[key]) })),
    ...[...html.matchAll(/<\w+\b[^>]*\sdata-i18n-label="(\w+)"[^>]*>/g)].map(([tag, key]) => ({ key, text: tag.match(/ aria-label="([^"]*)"/)?.[1], expect: (ui) => esc(ui[key]) })),
    ...[...html.matchAll(/<\w+\b[^>]*\sdata-i18n-placeholder="(\w+)"[^>]*>/g)].map(([tag, key]) => ({ key, text: tag.match(/ placeholder="([^"]*)"/)?.[1], expect: (ui) => esc(ui[key]) }))
  ];
  const { markdownLight: markdownLightOf } = await import("./build-pages.mjs");
  const keyedInIndex = keyed(indexHtml);
  assert.equal(keyedInIndex.length, (indexHtml.match(/\sdata-i18n(-html|-label|-placeholder)?="/g) || []).length, "every element with a data-i18n key should hold plain text (or *emphasis* for data-i18n-html)");
  for (const { key, text, expect } of keyedInIndex) {
    assert.equal(text, expect(i18nUi.pl), `index.html should read as data/i18n.js gives ${key} in Polish`);
  }
  for (const route of [ENGLISH_PREFIX, english("/atlas/grzyby/okratek-australijski"), english(MAP_ROUTE), english(QUIZ_ROUTE)]) {
    for (const { key, text, expect } of keyed(byRoute.get(route).html)) {
      assert.equal(text, expect(i18nUi.en), `${route} should read as data/i18n.js gives ${key} in English`);
    }
  }
  // The English card says what the app would: names, descriptions and texts from data/i18n.
  const okratekEn = win.ATLAS_I18N.collections.en.grzyby;
  const enCard = byRoute.get(english("/atlas/grzyby/okratek-australijski"));
  const enHook = okratekEn.items["okratek-australijski"].hook.trim();
  assert(enCard.html.includes(`<title>${okratekEn.items["okratek-australijski"].name} – ${okratekEn.title} – ${i18nUi.en.documentTitle}</title>`), "the English card should have the app's title");
  assert(enCard.html.includes(`<meta name="description" content="${esc(i18nUi.en.metaCardDescription.replace("{hook}", /[.!?…]$/.test(enHook) ? enHook : `${enHook}.`).replace("{collection}", okratekEn.title))}" />`), "the English card should describe itself as the app does");
  assert(enCard.html.includes(`<span id="safetyNotice" data-collection="grzyby">${esc(okratekEn.safety_notice)}</span>`), "the English card should give the English safety notice");
  assert(enCard.html.includes(`data-collection="grzyby" data-language="en">`), "the English card's collection photo should be marked as English, so the app keeps it");
  assert(enCard.html.includes(`<a id="wordmark" class="wordmark" href="${ENGLISH_PREFIX}"`) && enCard.html.includes(`<a id="mapLink" class="topbar__link" href="${english(MAP_ROUTE)}"`), "the English pages should lead to English pages");
  assert(enCard.html.includes('<button class="language-btn is-active" data-action="set-language" data-language="en" type="button">'), "the English pages should show English as chosen");
  const enStart = byRoute.get(ENGLISH_PREFIX);
  assert.equal(enStart?.file, "en.html", "the English start page should be built as en.html, served at /en");
  assert(enStart.html.includes(`<meta name="description" content="${esc(i18nUi.en.metaStartDescription)}" />`) && enStart.html.includes(`<meta property="og:description" content="${esc(i18nUi.en.metaStartShare)}" />`), "the English start page should describe itself as data/i18n.js does");
  assert(enStart.html.includes('<div id="startPage" class="start-page" tabindex="-1">'), "the English start page should open on the start page");
  // An unknown English card or collection opens the English start page, as an unknown Polish one opens the Polish.
  assert(vercelConfig.rewrites?.some((rule) => rule.source === "/en/atlas/:path*" && rule.destination === ENGLISH_PREFIX), "vercel.json should send unknown English atlas addresses to the English start page");
  // 404.html: out of search results, with a way home and a link to every collection.
  const { notFoundHtml } = await import("./build-pages.mjs");
  const notFound = notFoundHtml(win);
  assert(notFound.includes('<meta name="robots" content="noindex" />'), "404.html should stay out of search results");
  assert(notFound.includes('<a class="primary" href="/">'), "404.html should lead back to the start page");
  for (const collection of collections) {
    assert(notFound.includes(`href="${collection.route || `/atlas/${collection.id}`}"`), `404.html should link to ${collection.id}`);
  }
  assert(notFound.includes("/assets/logo-oroloko-ai.svg"), "404.html should keep the Made by Oroloko footer");
  // The logo's description repeats its English words, so screen readers read it in English.
  for (const [file, html] of [["index.html", indexHtml], ["404.html", notFound]]) {
    assert(html.includes('<img class="footer-logo" src="/assets/logo-oroloko-ai.svg" lang="en" alt="'), `${file}: the footer logo should be marked as English`);
  }
  // scripts/version-assets.mjs, tried on a temporary copy with the start page, a card page and the 404 page:
  // every address of a site file gets the hash of that file, as it is after its own addresses got theirs.
  const { ASSET_ADDRESS, contentHash, versionAssets } = await import("./version-assets.mjs");
  const copy = fs.mkdtempSync(path.join(os.tmpdir(), "atlas-versions-"));
  try {
    for (const dir of ["css", "js", "data", "fonts"]) fs.cpSync(dir, path.join(copy, dir), { recursive: true });
    fs.mkdirSync(path.join(copy, "atlas", "grzyby"), { recursive: true });
    const site = { "index.html": indexHtml, "atlas/grzyby/okratek-australijski.html": card.html, "404.html": notFound };
    for (const [file, html] of Object.entries(site)) fs.writeFileSync(path.join(copy, file), html);
    const named = ["index.html", "atlas/grzyby/okratek-australijski.html", "404.html", "css/styles.css", "js/app.js", "data/collections.js"];
    const before = Object.fromEntries(named.map((file) => [file, [...fs.readFileSync(path.join(copy, file), "utf8").matchAll(ASSET_ADDRESS)].map((match) => match[0])]));
    versionAssets(copy);
    const withHash = /(?<=["'(])(\/(?:css|js|data|fonts)\/[\w./-]+\.(?:css|js|woff2))\?v=([0-9a-f]{10})(?=["')])/g;
    for (const file of named) {
      const text = fs.readFileSync(path.join(copy, file), "utf8");
      assert(before[file].length, `${file} should name site files`);
      assert.deepEqual([...text.matchAll(ASSET_ADDRESS)].map((match) => match[0]), [], `${file}: every address of a site file should carry its hash`);
      const found = [...text.matchAll(withHash)];
      assert.deepEqual(found.map((match) => match[1]), before[file], `${file}: the same addresses, now with their hashes`);
      for (const [, address, hash] of found) {
        assert.equal(hash, contentHash(fs.readFileSync(path.join(copy, address))), `${file}: ${address} should carry the hash of its content`);
      }
    }
    const snapshot = () => Object.fromEntries(fs.readdirSync(copy, { recursive: true })
      .filter((file) => fs.statSync(path.join(copy, file)).isFile())
      .map((file) => [file, contentHash(fs.readFileSync(path.join(copy, file)))]));
    const once = snapshot();
    versionAssets(copy);
    assert.deepEqual(snapshot(), once, "a second run of scripts/version-assets.mjs should change nothing");
  } finally {
    fs.rmSync(copy, { recursive: true, force: true });
  }
  const refusal = spawnSync(process.execPath, ["scripts/version-assets.mjs"], { encoding: "utf8" });
  assert.equal(refusal.status, 1, "scripts/version-assets.mjs should not rewrite a working copy without --in-place");
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

  for (const address of ["/en", "/en/", "/en/atlas/grzyby", "/en/atlas/grzyby/okratek-australijski", "/en/mapa", "/en/quiz", "/en/atlas/grzyby/no-such-card"]) {
    const response = await fetch(`http://127.0.0.1:${port}${address}`);
    assert.equal(response.status, 200, `local dev server should serve ${address}`);
    assert.match(await response.text(), /id="startPage"/, `${address} should open the app`);
  }

  const missingResponse = await fetch(`http://127.0.0.1:${port}/not-a-real-file.js`);
  assert.equal(missingResponse.status, 404, "local dev server should keep non-atlas missing files as 404");
} finally {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}
