import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const indexHtml = fs.readFileSync("index.html", "utf8");
const appJs = fs.readFileSync("js/app.js", "utf8");
const cacheResetJs = fs.readFileSync("js/cache-reset.js", "utf8");
const collectionsJs = fs.readFileSync("data/collections.js", "utf8");
const i18nJs = fs.readFileSync("data/i18n.js", "utf8");
const vercelConfig = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
const rawScriptSources = [...indexHtml.matchAll(/<script\s+defer\s+src="([^"]+)"/g)].map((match) => match[1]);
const htmlScripts = rawScriptSources.map((source) => (source.startsWith("/") ? `.${source}` : source));

assert.match(indexHtml, /Atlas Osobliwości Polski/, "page should use the umbrella atlas title");
assert.doesNotMatch(indexHtml, /(src|href)="\.\/(?:assets|css|data|js|manifest)/, "root assets should use absolute paths so nested atlas routes can load them");
assert.doesNotMatch(indexHtml, /Otwórz owady/, "hero should not privilege one collection with a direct shortcut");
assert.doesNotMatch(indexHtml, /data-view="contest"/, "contest view should not be in navigation");
assert.doesNotMatch(indexHtml, /data-view="review"/, "review view should not be in navigation");

// New architecture: index.html only eagerly loads the cache reset, i18n table, the collection
// registry and the app. Per-collection data scripts are lazy-loaded by collections.js.
assert(htmlScripts.includes("./js/cache-reset.js"), "index.html should load js/cache-reset.js");
assert(htmlScripts.includes("./data/i18n.js"), "index.html should load data/i18n.js");
assert(htmlScripts.includes("./data/collections.js"), "index.html should load data/collections.js");
assert(htmlScripts.includes("./js/app.js"), "index.html should load js/app.js");
assert(
  htmlScripts.indexOf("./data/collections.js") < htmlScripts.indexOf("./js/app.js"),
  "collections.js should load before app.js"
);
assert(
  htmlScripts.indexOf("./data/i18n.js") < htmlScripts.indexOf("./js/app.js"),
  "i18n.js should load before app.js"
);
assert(
  htmlScripts.indexOf("./data/collections.js") < htmlScripts.indexOf("./data/i18n.js"),
  "collections.js must load before i18n.js so the i18n table can read ATLAS_APP_DATA at IIFE start"
);
assert(
  !htmlScripts.some((src) => /\/data\/(mushrooms|insects|flowers|fish|birds|mammals|amphibians-reptiles|trees|minerals|rock-formations|wooden-architecture|underground|engineering-wonders|fortresses-ruins|memento-mori|fossils|atmosphere-astronomy|landscape-records|atmospheric-records|photo-pack-v0[3-8]|region-pack-v07|[a-z-]+-photo-pack-v01)\.js$/.test(src)),
  "per-collection data scripts must be lazy-loaded by collections.js, not declared eagerly in index.html"
);

// Extract every "/data/X.js" reference from the per-collection scripts arrays in collections.js.
const scriptsArrayBlocks = [...collectionsJs.matchAll(/scripts:\s*\[([\s\S]*?)\]/g)];
assert(scriptsArrayBlocks.length >= 19, "collections.js should expose at least 19 lazy-load script lists, one per collection");
const manifestScripts = scriptsArrayBlocks.map((match) =>
  [...match[1].matchAll(/"(\/data\/[^"]+)"/g)].map((m) => m[1])
);
const allManifestFiles = manifestScripts.flat();

function assertManifestIncludes(file, message) {
  assert(allManifestFiles.includes(file), message);
}
assertManifestIncludes("/data/mushrooms.js", "collections.js manifest should reference data/mushrooms.js");
assertManifestIncludes("/data/insects.js", "collections.js manifest should reference data/insects.js");
assertManifestIncludes("/data/flowers.js", "collections.js manifest should reference data/flowers.js");
assertManifestIncludes("/data/flower-photo-pack-v01.js", "collections.js manifest should reference the flower Commons photo pack");
assertManifestIncludes("/data/fish.js", "collections.js manifest should reference data/fish.js");
assertManifestIncludes("/data/fish-photo-pack-v01.js", "collections.js manifest should reference the fish Commons photo pack");
assertManifestIncludes("/data/birds.js", "collections.js manifest should reference data/birds.js");
assertManifestIncludes("/data/bird-photo-pack-v01.js", "collections.js manifest should reference the bird Commons photo pack");
assertManifestIncludes("/data/trees.js", "collections.js manifest should reference data/trees.js");
assertManifestIncludes("/data/tree-photo-pack-v01.js", "collections.js manifest should reference the tree Commons photo pack");
assertManifestIncludes("/data/minerals.js", "collections.js manifest should reference data/minerals.js");
assertManifestIncludes("/data/mineral-photo-pack-v01.js", "collections.js manifest should reference the mineral Commons photo pack");
assertManifestIncludes("/data/rock-formations.js", "collections.js manifest should reference data/rock-formations.js");
assertManifestIncludes("/data/rock-formation-photo-pack-v01.js", "collections.js manifest should reference the rock formation Commons photo pack");
assertManifestIncludes("/data/fossils.js", "collections.js manifest should reference data/fossils.js");
assertManifestIncludes("/data/fossil-photo-pack-v01.js", "collections.js manifest should reference the fossil Commons photo pack");
assertManifestIncludes("/data/atmosphere-astronomy.js", "collections.js manifest should reference data/atmosphere-astronomy.js");
assertManifestIncludes("/data/atmosphere-astronomy-photo-pack-v01.js", "collections.js manifest should reference the atmosphere and astronomy Commons photo pack");
assertManifestIncludes("/data/mammals.js", "collections.js manifest should reference data/mammals.js");
assertManifestIncludes("/data/mammal-photo-pack-v01.js", "collections.js manifest should reference the mammal Commons photo pack");
assertManifestIncludes("/data/amphibians-reptiles.js", "collections.js manifest should reference data/amphibians-reptiles.js");
assertManifestIncludes("/data/amphibian-reptile-photo-pack-v01.js", "collections.js manifest should reference the amphibian and reptile Commons photo pack");
assertManifestIncludes("/data/wooden-architecture.js", "collections.js manifest should reference data/wooden-architecture.js");
assertManifestIncludes("/data/wooden-architecture-photo-pack-v01.js", "collections.js manifest should reference the wooden architecture Commons photo pack");
assertManifestIncludes("/data/underground.js", "collections.js manifest should reference data/underground.js");
assertManifestIncludes("/data/underground-photo-pack-v01.js", "collections.js manifest should reference the underground Commons photo pack");
assertManifestIncludes("/data/engineering-wonders.js", "collections.js manifest should reference data/engineering-wonders.js");
assertManifestIncludes("/data/engineering-wonders-photo-pack-v01.js", "collections.js manifest should reference the engineering wonders Commons photo pack");
assertManifestIncludes("/data/fortresses-ruins.js", "collections.js manifest should reference data/fortresses-ruins.js");
assertManifestIncludes("/data/fortresses-ruins-photo-pack-v01.js", "collections.js manifest should reference the fortresses and ruins Commons photo pack");
assertManifestIncludes("/data/memento-mori.js", "collections.js manifest should reference data/memento-mori.js");
assertManifestIncludes("/data/memento-mori-photo-pack-v01.js", "collections.js manifest should reference the memento mori Commons photo pack");
assertManifestIncludes("/data/landscape-records.js", "collections.js manifest should reference data/landscape-records.js");
assertManifestIncludes("/data/landscape-records-photo-pack-v01.js", "collections.js manifest should reference the landscape records Commons photo pack");

// Inside each collection entry the base data file must precede its photo / region packs
// (photo packs mutate the base data, so order within the entry matters).
for (const collectionScripts of manifestScripts) {
  const firstPackIdx = collectionScripts.findIndex((src) => /-photo-pack|-region-pack|\/photo-pack-v0|\/region-pack-v0/.test(src));
  const firstBaseIdx = collectionScripts.findIndex((src) => !/-photo-pack|-region-pack|\/photo-pack-v0|\/region-pack-v0/.test(src));
  if (firstPackIdx !== -1 && firstBaseIdx !== -1) {
    assert(firstBaseIdx < firstPackIdx, `base data file must precede photo/region packs in collection entry [${collectionScripts.join(", ")}]`);
  }
}

assert.match(appJs, /routeForCollection/, "app should derive collection routes");
assert.match(appJs, /history\.pushState/, "app should push collection routes into browser history");
assert.match(appJs, /popstate/, "app should restore collections from browser history");
assert.doesNotMatch(appJs, /serviceWorker\.register/, "app should not re-register the self-unregistering service worker");
assert.match(cacheResetJs, /getRegistrations\(\)/, "cache reset should keep unregistering old service workers");
// Every collection and card has its own built page (scripts/build-pages.mjs), so an atlas address without one
// leads nowhere and gets the 404 page, not the start page with "200 OK" (a "soft 404" for search engines).
assert(
  !(vercelConfig.rewrites || []).some((rewrite) => /^(\/en)?\/atlas\//.test(rewrite.source)),
  "vercel.json should not send atlas addresses without a page to another page"
);

// Run all manifest data files in a shared vm context (preserving per-entry order), then i18n.js,
// then collections.js. The eager-build pass inside collections.js populates each collection from
// the now-present window.*_APP_DATA globals.
const context = {
  window: {},
  document: {
    head: { appendChild() {} },
    createElement: () => ({ dataset: {} }),
    querySelector: () => null
  }
};
vm.createContext(context);

const dedupedManifestFiles = [];
for (const collectionScripts of manifestScripts) {
  for (const src of collectionScripts) {
    if (!dedupedManifestFiles.includes(src)) dedupedManifestFiles.push(src);
  }
}
for (const source of dedupedManifestFiles) {
  vm.runInContext(fs.readFileSync(source.replace(/^\//, ""), "utf8"), context, { filename: source });
}
// collections.js builds window.ATLAS_APP_DATA; i18n.js reads it at IIFE start.
vm.runInContext(collectionsJs, context, { filename: "data/collections.js" });
vm.runInContext(i18nJs, context, { filename: "data/i18n.js" });

const app = context.window.ATLAS_APP_DATA;
const i18n = context.window.ATLAS_I18N;
assert(app, "ATLAS_APP_DATA should be defined");
assert(i18n, "ATLAS_I18N should be defined");
assert.equal(app.project, "Atlas Osobliwości Polski");
assert.equal(JSON.stringify(app.views.map((view) => view.id)), JSON.stringify(["atlas", "learn", "quiz", "sources"]));
assert.equal(i18n.defaultLanguage, "pl", "Polish should remain the default language");
assert.equal(i18n.languages.en.label, "EN", "English language metadata should exist");
assert.equal(i18n.ui.en.chooseCollection, "Choose a collection", "English UI copy should exist");
for (const key of Object.keys(i18n.ui.pl)) {
  assert(key in i18n.ui.en, `the English interface should have a text for ${key}`);
}

const collections = app.collections || [];
assert.equal(collections.length, 19, "atlas should expose mushrooms, insects, flowers, fish, birds, mammals, amphibians and reptiles, trees, minerals, rock formations, wooden architecture, underground, engineering wonders, fortresses and ruins, memento mori, landscape records, fossils, sky phenomena and weather records");

const mushrooms = collections.find((collection) => collection.id === "grzyby");
const insects = collections.find((collection) => collection.id === "owady");
const flowers = collections.find((collection) => collection.id === "kwiaty");
const fish = collections.find((collection) => collection.id === "ryby");
const birds = collections.find((collection) => collection.id === "ptaki");
const trees = collections.find((collection) => collection.id === "drzewa");
const minerals = collections.find((collection) => collection.id === "mineraly");
const rockFormations = collections.find((collection) => collection.id === "formacje-skalne");
const fossils = collections.find((collection) => collection.id === "skamienialosci");
const skyPhenomena = collections.find((collection) => collection.id === "atmosfera-astronomia");
const mammals = collections.find((collection) => collection.id === "ssaki");
const amphibiansReptiles = collections.find((collection) => collection.id === "plazy-gady");
const woodenArchitecture = collections.find((collection) => collection.id === "architektura-drewniana");
const underground = collections.find((collection) => collection.id === "podziemia");
const engineeringWonders = collections.find((collection) => collection.id === "cuda-inzynierii");
const fortressesRuins = collections.find((collection) => collection.id === "twierdze-ruiny");
const mementoMori = collections.find((collection) => collection.id === "memento-mori");
const landscapeRecords = collections.find((collection) => collection.id === "rekordy-krajobrazu");
const weatherRecords = collections.find((collection) => collection.id === "rekordy-atmosferyczne");
assert(mushrooms, "mushroom collection should exist");
assert(insects, "insect collection should exist");
assert(flowers, "flower collection should exist");
assert(fish, "fish collection should exist");
assert(birds, "bird collection should exist");
assert(trees, "tree collection should exist");
assert(minerals, "mineral collection should exist");
assert(rockFormations, "rock formation collection should exist");
assert(fossils, "fossil collection should exist");
assert(skyPhenomena, "atmosphere and astronomy collection should exist");
assert(mammals, "mammal collection should exist");
assert(amphibiansReptiles, "amphibian and reptile collection should exist");
assert(woodenArchitecture, "wooden architecture collection should exist");
assert(underground, "underground collection should exist");
assert(engineeringWonders, "engineering wonders collection should exist");
assert(fortressesRuins, "fortresses and ruins collection should exist");
assert(mementoMori, "memento mori collection should exist");
assert(landscapeRecords, "landscape records collection should exist");
assert(weatherRecords, "weather records collection should exist");
assert.equal(mushrooms.items.length, 60, "mushroom collection should keep all 60 entries");
assert.equal(insects.items.length, 30, "insect collection should contain the prepared 30 entries");
assert.equal(flowers.items.length, 31, "flower collection should contain 31 Polish wild or naturalized plant curiosities");
assert.equal(fish.items.length, 30, "fish collection should contain 30 fish curiosities (Mauryk and Kosogon withdrawn: no confirmed Baltic record)");
assert.equal(birds.items.length, 32, "bird collection should contain 32 bird curiosities");
assert.equal(trees.items.length, 30, "tree collection should contain 30 dendrological curiosities");
assert.equal(minerals.items.length, 32, "mineral collection should contain 32 mineralogical curiosities");
assert.equal(rockFormations.items.length, 32, "rock formation collection should contain 32 geological curiosities (Zęzów i Czarne Działy withdrawn)");
assert.equal(fossils.items.length, 32, "fossil collection should contain 32 paleontological curiosities (Tholodus schmidi withdrawn: no published Polish record)");
assert.equal(skyPhenomena.items.length, 32, "atmosphere and astronomy collection should contain 32 sky and weather curiosities");
assert.equal(mammals.items.length, 33, "mammal collection should contain 33 mammal curiosities");
assert.equal(amphibiansReptiles.items.length, 30, "amphibian and reptile collection should contain 30 well-documented herpetofauna curiosities");
assert.equal(woodenArchitecture.items.length, 29, "wooden architecture collection should contain 29 prepared architectural curiosities (Chata na Wysokości withdrawn)");
assert.equal(woodenArchitecture.route, "/atlas/architektura-drewniana", "wooden architecture collection should expose the requested route");
assert.equal(underground.items.length, 30, "underground collection should contain 30 prepared subterranean curiosities");
assert.equal(underground.route, "/atlas/podziemia", "underground collection should expose the requested route");
assert.equal(engineeringWonders.items.length, 33, "engineering wonders collection should contain 33 technical and architectural curiosities");
assert.equal(engineeringWonders.route, "/atlas/cuda-inzynierii", "engineering wonders collection should expose the requested route");
assert.equal(fortressesRuins.items.length, 33, "fortresses and ruins collection should contain 33 architectural and historical curiosities");
assert.equal(fortressesRuins.route, "/atlas/twierdze-ruiny", "fortresses and ruins collection should expose the requested route");
assert.equal(mementoMori.items.length, 30, "memento mori collection should contain 30 memorial and burial-culture curiosities");
assert.equal(mementoMori.route, "/atlas/memento-mori", "memento mori collection should expose the requested route");
assert.equal(landscapeRecords.items.length, 56, "landscape records collection should contain 56 landscape curiosities");
assert.equal(landscapeRecords.route, "/atlas/rekordy-krajobrazu", "landscape records collection should expose the requested route");
assert.equal(weatherRecords.items.length, 17, "weather records collection should contain the 17 records confirmed in the sources (30.10.2026)");
assert.equal(weatherRecords.route, "/atlas/rekordy-atmosferyczne", "weather records collection should expose the requested route");
const flowerImages = flowers.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(flowerImages.length, 31, "flower collection should include 31 curated images with attribution");
assert(
  flowers.items.every((item) => item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")),
  "flower images should use Wikimedia Commons Special:Redirect links"
);
assert(
  flowers.items.every((item) => item.image_source.startsWith("https://commons.wikimedia.org/wiki/File:")),
  "flower image sources should link to Wikimedia Commons file pages"
);
const fishImages = fish.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(fishImages.length, 30, "fish collection should include 30 curated images with attribution");
assert(
  fish.items.every((item) => item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")),
  "fish images should use Wikimedia Commons Special:Redirect links"
);
assert(
  fish.items.every((item) => item.image_source.startsWith("https://commons.wikimedia.org/wiki/File:")),
  "fish image sources should link to Wikimedia Commons file pages"
);
const birdImages = birds.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(birdImages.length, 32, "bird collection should include 32 curated images with attribution");
assert(
  birds.items.every((item) => item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")),
  "bird images should use Wikimedia Commons Special:Redirect links"
);
assert(
  birds.items.every((item) => item.image_source.startsWith("https://commons.wikimedia.org/wiki/File:")),
  "bird image sources should link to Wikimedia Commons file pages"
);
const treeImages = trees.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(treeImages.length, 30, "tree collection should include 30 curated images with attribution");
assert(
  trees.items.every((item) => item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")),
  "tree images should use Wikimedia Commons Special:Redirect links"
);
assert(
  trees.items.every((item) => item.image_source.startsWith("https://commons.wikimedia.org/wiki/File:")),
  "tree image sources should link to Wikimedia Commons file pages"
);
const mineralImages = minerals.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(mineralImages.length, 32, "mineral collection should include 32 curated images with attribution");
assert(
  minerals.items.every((item) => item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")),
  "mineral images should use Wikimedia Commons Special:Redirect links"
);
assert(
  minerals.items.every((item) => item.image_source.startsWith("https://commons.wikimedia.org/wiki/File:")),
  "mineral image sources should link to Wikimedia Commons file pages"
);
const rockFormationImages = rockFormations.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(rockFormationImages.length, 32, "rock formation collection should include 32 curated images with attribution");
assert(
  rockFormations.items.every((item) => item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")),
  "rock formation images should use Wikimedia Commons Special:Redirect links"
);
assert(
  rockFormations.items.every((item) => item.image_source.startsWith("https://commons.wikimedia.org/wiki/File:")),
  "rock formation image sources should link to Wikimedia Commons file pages"
);
const fossilImages = fossils.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(fossilImages.length, 31, "fossil collection should include 31 curated images with attribution; the Krzyżanowice marine-reptile card has no fitting free photo");
assert(
  fossils.items.filter((item) => !item.image).every((item) => item.id === "pliozaury-z-krzyzanowic"),
  "only the Krzyżanowice marine-reptile card should be without a photo"
);
assert(
  fossils.items.filter((item) => item.image).every((item) => item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")),
  "fossil images should use Wikimedia Commons Special:Redirect links"
);
assert(
  fossils.items.filter((item) => item.image).every((item) => item.image_source.startsWith("https://commons.wikimedia.org/wiki/File:")),
  "fossil image sources should link to Wikimedia Commons file pages"
);
const skyPhenomenonImages = skyPhenomena.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(skyPhenomenonImages.length, 32, "atmosphere and astronomy collection should include 32 curated images with attribution");
assert(
  skyPhenomena.items.every((item) => item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")),
  "atmosphere and astronomy images should use Wikimedia Commons Special:Redirect links"
);
assert(
  skyPhenomena.items.every((item) => item.image_source.startsWith("https://commons.wikimedia.org/wiki/File:")),
  "atmosphere and astronomy image sources should link to Wikimedia Commons file pages"
);
const mammalImages = mammals.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(mammalImages.length, 33, "mammal collection should include 33 curated images with attribution");
assert(
  mammals.items.every((item) => item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")),
  "mammal images should use Wikimedia Commons Special:Redirect links"
);
assert(
  mammals.items.every((item) => item.image_source.startsWith("https://commons.wikimedia.org/wiki/File:")),
  "mammal image sources should link to Wikimedia Commons file pages"
);
const amphibianReptileImages = amphibiansReptiles.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(amphibianReptileImages.length, 30, "amphibian and reptile collection should include 30 curated images with attribution");
assert(
  amphibiansReptiles.items.every((item) => item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")),
  "amphibian and reptile images should use Wikimedia Commons Special:Redirect links"
);
assert(
  amphibiansReptiles.items.every((item) => item.image_source.startsWith("https://commons.wikimedia.org/wiki/File:")),
  "amphibian and reptile image sources should link to Wikimedia Commons file pages"
);
const woodenArchitectureImages = woodenArchitecture.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(woodenArchitectureImages.length, 29, "wooden architecture collection should include 29 curated images with attribution");
assert(
  woodenArchitecture.items.every((item) => item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")),
  "wooden architecture images should use Wikimedia Commons Special:Redirect links"
);
assert(
  woodenArchitecture.items.every((item) => item.image_source.startsWith("https://commons.wikimedia.org/wiki/File:")),
  "wooden architecture image sources should link to Wikimedia Commons file pages"
);
const undergroundImages = underground.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(undergroundImages.length, 30, "underground collection should include 30 curated images with attribution");
assert(
  underground.items.every((item) => item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")),
  "underground images should use Wikimedia Commons Special:Redirect links"
);
assert(
  underground.items.every((item) => item.image_source.startsWith("https://commons.wikimedia.org/wiki/File:")),
  "underground image sources should link to Wikimedia Commons file pages"
);
const engineeringWonderImages = engineeringWonders.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(engineeringWonderImages.length, 33, "engineering wonders collection should include 33 curated images with attribution");
assert(
  engineeringWonders.items.every((item) => item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")),
  "engineering wonders images should use Wikimedia Commons Special:Redirect links"
);
assert(
  engineeringWonders.items.every((item) => item.image_source.startsWith("https://commons.wikimedia.org/wiki/File:")),
  "engineering wonders image sources should link to Wikimedia Commons file pages"
);
const fortressesRuinsImages = fortressesRuins.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(fortressesRuinsImages.length, 33, "fortresses and ruins collection should include 33 curated images with attribution");
assert(
  fortressesRuins.items.every((item) => item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")),
  "fortresses and ruins images should use Wikimedia Commons Special:Redirect links"
);
assert(
  fortressesRuins.items.every((item) => item.image_source.startsWith("https://commons.wikimedia.org/wiki/File:")),
  "fortresses and ruins image sources should link to Wikimedia Commons file pages"
);
const mementoMoriImages = mementoMori.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(mementoMoriImages.length, 30, "memento mori collection should include 30 curated images with attribution");
assert(
  mementoMori.items.every((item) => item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")),
  "memento mori images should use Wikimedia Commons Special:Redirect links"
);
assert(
  mementoMori.items.every((item) => item.image_source.startsWith("https://commons.wikimedia.org/wiki/File:")),
  "memento mori image sources should link to Wikimedia Commons file pages"
);
const landscapeRecordImages = landscapeRecords.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(landscapeRecordImages.length, 56, "landscape records collection should include 56 curated images with attribution");
assert(
  landscapeRecords.items.every((item) => item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")),
  "landscape records images should use Wikimedia Commons Special:Redirect links"
);
assert(
  landscapeRecords.items.every((item) => item.image_source.startsWith("https://commons.wikimedia.org/wiki/File:")),
  "landscape records image sources should link to Wikimedia Commons file pages"
);
const weatherRecordImages = weatherRecords.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(weatherRecordImages.length, 16, "weather records collection should include 16 curated images with attribution");
assert.equal(
  JSON.stringify(weatherRecords.items.filter((item) => !item.image).map((item) => item.id)),
  JSON.stringify(["rok-2024"]),
  "only the warmest year (all of Poland) should be without a photo"
);
// The owner's rules for this drawer (30-31.10.2026): IMGW-PIB regards Siedlce 1940 as the official cold
// record, so Żywiec 1929 is never called official; Słubice is the record announced by IMGW for synoptic
// stations. What was disputed, rested on own calculations or repeated an existing card stays out.
// Every text of the card, also the photo description, the safety note and its fun facts.
const cardTexts = (item) => {
  const english = i18n.collections.en["rekordy-atmosferyczne"].items[item.id] || {};
  const facts = weatherRecords.facts?.[item.id]?.facts || [];
  return { pl: [...Object.values(item).filter((value) => typeof value === "string"), ...facts.map((fact) => fact.pl)].join(" "),
    en: [...Object.values(english), ...facts.map((fact) => fact.en)].join(" ") };
};
for (const id of ["zywiec-1929", "slubice-40-5"]) {
  const item = weatherRecords.items.find((entry) => entry.id === id);
  assert(item, `weather records should include ${id}`);
  assert(!/oficjaln/i.test(cardTexts(item).pl) && !/official/i.test(cardTexts(item).en), `${id} should not call its record official`);
}
// Kołuda Wielka (a disputed reading) is not mentioned, and Kamienica 2024 stays out (Robert's decisions of 31.10 and
// 1.11.2026; sources give different values: docs/content/rekordy-atmosferyczne-2026-10.md).
for (const item of weatherRecords.items) {
  const { pl, en } = cardTexts(item);
  assert(!/Ko[lł]ud/i.test(`${pl} ${en}`), `${item.id} should not mention Kołuda Wielka`);
  assert(!/254[,.]5/.test(`${pl} ${en}`), `${item.id} should not give 254,5 mm (Kamienica 2024 stays out of the atlas)`);
}
for (const id of ["koluda-wielka-40-6", "rozdziele-noc-28-4", "opole-dni-upalne", "kasprowy-88-dni-mrozu", "krosno-burze",
  "cisnienie-skrajnosci", "hel-najwiecej-slonca", "najmniej-slonca-gory", "siedlce-minus-41", "litworowy-kociol-41-1",
  "zorza-maj-2024", "kamienica-2024", "kasprowy-388-cm-sniegu"]) {
  assert(!weatherRecords.items.some((item) => item.id === id), `weather records should leave out ${id} (disputed, unconfirmed or already in the atlas)`);
}
// The drawer mixes places with cards about a year or several regions: a "which place" quiz question
// offers only places as wrong answers.
assert(appJs.includes("pool = others.filter((item) => placePart(item) && placePart(item) !== place);"), "a place question in the quiz should offer only places as wrong answers");
assert.equal(
  insects.items.filter((item) => item.image && item.image_author && item.image_source && item.image_license).length,
  30,
  "insect collection should include 30 Commons images with attribution"
);

// Every photo shown in any collection needs confirmed credits checked on Commons.
const unconfirmedCredit = /do weryfikacji|do uzupełnienia/i;
const photoLabel = /^(Kadr reprezentatywny|Kadr kontekstowy|Diagram reprezentatywny|Schemat reprezentatywny)\b/;
for (const collection of collections) {
  for (const item of collection.items.filter((entry) => entry.image)) {
    const where = `${collection.id}/${item.id}`;
    assert(item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/"), `${where} photo should be embedded from Wikimedia Commons`);
    assert(item.image_source?.startsWith("https://commons.wikimedia.org/wiki/File:"), `${where} photo source should be its Commons file page`);
    for (const field of ["image_alt", "image_author", "image_license", "license_url", "image_modifications"]) {
      assert(item[field] && !unconfirmedCredit.test(item[field]), `${where} photo needs a confirmed ${field}`);
    }
    assert(/^https:\/\/(creativecommons\.org|commons\.wikimedia\.org\/wiki\/(Commons|Template):)/.test(item.license_url), `${where} license link should point to the license, not to the file`);
    assert.notEqual(item.image_status, "commons_candidate", `${where} photo should be checked on Commons before it is shown`);
    // The app shows this label under representative and context photos, so the description must start with it.
    if (/reprezent|kontekst/i.test(item.image_alt)) {
      assert(photoLabel.test(item.image_alt), `${where} representative or context photo should start its description with a photo label`);
    }
  }
}
for (const key of ["photoRepresentative", "photoContext", "photoDiagram"]) {
  assert(i18n.ui.en[key] && i18n.ui.en[`${key}Note`], `English UI should name the ${key} label and explain it`);
}

for (const collection of collections) {
  const translatedCollection = i18n.collections.en[collection.id];
  assert(translatedCollection, `${collection.id} should have English collection text`);
  assert(translatedCollection.title, `${collection.id} should have an English title`);
  assert(translatedCollection.categories, `${collection.id} should have English category labels`);
  assert(translatedCollection.items, `${collection.id} should have English item translations`);

  for (const category of collection.categories) {
    assert(translatedCollection.categories[category.id]?.label, `${collection.id}/${category.id} should have an English category label`);
    assert(translatedCollection.categories[category.id]?.short, `${collection.id}/${category.id} should have an English category short label`);
  }

  for (const item of collection.items) {
    const translatedItem = translatedCollection.items[item.id];
    assert(translatedItem, `${collection.id}/${item.id} should have English item text`);
    assert(translatedItem.name, `${collection.id}/${item.id} should have an English display name`);
    assert(translatedItem.hook, `${collection.id}/${item.id} should have an English hook`);
    assert(translatedItem.quiz_angle, `${collection.id}/${item.id} should have an English quiz angle`);
    assert(translatedItem.safety_note, `${collection.id}/${item.id} should have an English safety note`);
  }
}
// English card texts live in data/i18n/<collection>.en.js, one file per collection, loaded with the
// collection; a card without English text would show its Polish one. Every card needs every field, and
// the files must not keep Polish sentences by mistake.
const itemTextEn = context.window.ATLAS_ITEM_TEXT_EN || {};
const englishFields = ["name", "hook", "quiz_angle", "safety_note", "region", "habitat", "occurrence", "level"];
const polishFields = { safety_note: "safety_note", region: "region_pl", habitat: "habitat_pl", occurrence: "occurrence_note" };
const polishWords = /(^|[^\p{L}])(się|jest|oraz|który|która|które|również|można|dlatego|gdzie)(?![\p{L}])/iu;
// Level labels that are the same word in English: a Tatar cemetery and the code name of the Owl Mountains complex.
const sameInEnglish = new Set(["mizar", "Riese"]);
// English texts that rightly repeat although the Polish ones differ (only in grammatical gender).
const sharedEnglish = new Set(["Rare; listed as R on the Polish Red List."]);
const i18nFiles = fs.existsSync("data/i18n") ? fs.readdirSync("data/i18n") : [];
for (const collection of collections) {
  assert(i18nFiles.includes(`${collection.id}.en.js`), `${collection.id} should have its English card texts in data/i18n/${collection.id}.en.js`);
}
for (const file of i18nFiles) {
  const collectionId = file.replace(/\.en\.js$/, "");
  const collection = collections.find((entry) => entry.id === collectionId);
  assert(collection, `data/i18n/${file} does not belong to any collection`);
  assert(manifestScripts.some((scripts) => scripts.includes(`/data/i18n/${file}`)), `data/i18n/${file} should be loaded with its collection`);
  const texts = itemTextEn[collectionId];
  assert(texts, `data/i18n/${file} should set window.ATLAS_ITEM_TEXT_EN["${collectionId}"]`);
  const cardIds = new Set(collection.items.map((item) => item.id));
  for (const id of Object.keys(texts)) assert(cardIds.has(id), `data/i18n/${file}: ${id} is not a card of ${collectionId}`);
  for (const item of collection.items) {
    const entry = texts[item.id];
    assert(entry, `data/i18n/${file} should have English text for ${item.id}`);
    for (const field of englishFields) {
      assert(typeof entry[field] === "string" && entry[field].trim(), `${collectionId}/${item.id}: English ${field} is missing`);
      assert(!polishWords.test(entry[field]), `${collectionId}/${item.id}: English ${field} looks Polish: ${entry[field]}`);
    }
    assert(entry.level !== item.level || sameInEnglish.has(item.level), `${collectionId}/${item.id}: the English level is still the Polish one: ${item.level}`);
    if (entry.latin !== undefined) assert(typeof entry.latin === "string" && entry.latin.trim(), `${collectionId}/${item.id}: English latin line should be a non-empty string`);
    // For places the line under the name is a Polish descriptor ("Wieliczka • solne miasto UNESCO"), not a scientific name.
    if (item.name_lat?.includes(" • ")) assert(entry.latin, `${collectionId}/${item.id}: the descriptor under the name needs an English text`);
    // The interface shows the card file as it is.
    const shown = i18n.collections.en[collectionId].items[item.id];
    for (const field of englishFields) assert.equal(shown[field], entry[field], `${collectionId}/${item.id}: the English ${field} shown should come from data/i18n/${file}`);
  }
  // One English text for cards whose Polish texts differ is a template, not a translation.
  for (const [field, polishField] of Object.entries(polishFields)) {
    const polishByEnglish = new Map();
    for (const item of collection.items) {
      const english = texts[item.id][field];
      if (!polishByEnglish.has(english)) polishByEnglish.set(english, new Set());
      polishByEnglish.get(english).add(item[polishField]);
    }
    for (const [english, polish] of polishByEnglish) {
      assert(polish.size === 1 || sharedEnglish.has(english), `${collectionId}: one English ${field} stands for ${polish.size} different Polish texts: ${english}`);
    }
  }
}

// True or false in the quiz ("is this fact about <card>?"): a false statement is a real fact of another card
// that names its own card in both languages, each with that language's name (factNamesCard in js/app.js), and
// comes from another genus and another category (buildTrueFalseQuestion). Cases found in reviews:
// - F0272 matched only through "gold" of the English "golden saxifrage" in "Golden-yellow bracts", so the
//   Polish page showed a fact that names no card;
// - F0179 "mokry pomarańczowożółty" only describes a colour, though the card is "Boczniaczek pomarańczowożółty";
// - F0527 matched "salamand" inside the Latin "*Batrachochytrium salamandrivorans*", and the fungus threatens
//   newts too;
// - F1066 and F1058 (refraction, mirages) are true of the other mirage cards of their category, and F0265
//   (phototoxic sap) of Dyptam, a card of the same category;
// - F0813 (the Machów mine closed and flooded) named "Siarka rodzima z Tarnobrzega" only through Tarnobrzeg,
//   the find place of other minerals too, so it fitted calcite, gypsum and strontianite; F0849 (uranium ore
//   from Miedzianka) named malachite only through Miedzianka and fitted uraninite;
// - F1410 said only "Zamek zbudował … Kazimierz Wielki", which fits Mysia Wieża too; it now names its castle.
// The test runs the real buildTrueFalseQuestion for every quiz card and every possible false statement, in
// Polish and in English.
function appFunction(name) {
  const start = appJs.indexOf(`function ${name}(`);
  assert(start >= 0, `js/app.js should define ${name}`);
  let depth = 0;
  let index = appJs.indexOf("(", start);
  // The parameter list can hold braces ("{ collection, rng } = {}"), so the body starts after it.
  for (; index < appJs.length; index += 1) {
    if (appJs[index] === "(") depth += 1;
    if (appJs[index] === ")" && --depth === 0) break;
  }
  for (index = appJs.indexOf("{", index); index < appJs.length; index += 1) {
    if (appJs[index] === "{") depth += 1;
    if (appJs[index] === "}" && --depth === 0) return appJs.slice(start, index + 1);
  }
  throw new Error(`could not read ${name} from js/app.js`);
}
const quizState = { language: "pl", collection: null, lengths: [] };
const quizContext = vm.createContext({
  i18n,
  state: quizState,
  defaultLanguage: "pl",
  FACTS_LIMIT: Number(appJs.match(/const FACTS_LIMIT = (\d+);/)[1]),
  SOLEMN_CATEGORIES: new Set(JSON.parse(appJs.match(/const SOLEMN_CATEGORIES = new Set\((\[[^\]]*\])\);/)[1])),
  activeCollection: () => quizState.collection,
  t: (key) => `${quizState.language}:${key}`,
  itemName: (item) => item.id,
  // Records how many choices each draw had, so the test can go through every possible false statement.
  randomIndex: (length, rng) => {
    quizState.lengths.push(length);
    return Math.floor(rng() * length);
  },
});
const quizFunctions = ["itemSynonyms", "factsEntry", "itemFacts", "nameWords", "wordStem", "latinGenus", "stemsOf", "englishItemName",
  "nameStems", "factMentions", "sharedFindPlaces", "polishNamesCard", "factNamesCard", "lineageKey", "quizFactsFor", "factTextCounts", "quizPool", "buildTrueFalseQuestion"];
vm.runInContext(`${quizFunctions.map(appFunction).join("\n")}\nthis.quiz = { factNamesCard, factTextCounts, quizPool, buildTrueFalseQuestion };`, quizContext);
// The question is built anew for every choice, so the name checks repeat; their results are kept per fact, card
// and page language (the language stays in the key, so a check that came to depend on it would still show).
vm.runInContext(`
  const remember = (check) => {
    const results = new WeakMap();
    return (fact, item, collection) => {
      if (!results.has(fact)) results.set(fact, new Map());
      const byCard = results.get(fact);
      const key = item.id + "|" + state.language;
      if (!byCard.has(key)) byCard.set(key, check(fact, item, collection));
      return byCard.get(key);
    };
  };
  factNamesCard = remember(factNamesCard);
  factMentions = remember(factMentions);
`, quizContext);
const { quiz } = quizContext;
{
  const factOf = (collectionId, itemId, factId) => {
    const collection = collections.find((entry) => entry.id === collectionId);
    const item = collection.items.find((entry) => entry.id === itemId);
    const fact = collection.facts[itemId].facts.find((entry) => entry.id === factId);
    assert(fact, `${collectionId}/${itemId} should have the fact ${factId}`);
    return quiz.factNamesCard(fact, item, collection);
  };
  assert(!factOf("kwiaty", "sledziennica-skretolistna", "F0272"), "F0272 names its card only through the English 'golden' and should not be a true/false decoy");
  assert(!factOf("grzyby", "boczniaczek-pomaranczowozolty", "F0179"), "F0179 only describes a colour ('pomarańczowożółty') and should not be a true/false decoy");
  assert(!factOf("architektura-drewniana", "kraina-otwartych-okiennic", "F1240"), "F1240 uses 'okiennice' as a common word, not the proper name 'Kraina Otwartych Okiennic', and should not be a true/false decoy");
  assert(!factOf("plazy-gady", "salamandra-plamista", "F0527"), "F0527 contains 'salamand' only inside a Latin name in italics and should not be a true/false decoy");
  assert(!factOf("mineraly", "siarka-rodzima-tarnobrzeg", "F0813"), "F0813 names only Tarnobrzeg, the find place of other minerals too, and should not be a true/false decoy");
  assert(!factOf("mineraly", "malachit-miedzianka", "F0849"), "F0849 names only Miedzianka, the find place of other minerals too, and should not be a true/false decoy");
  {
    const castles = collections.find((collection) => collection.id === "twierdze-ruiny");
    const pieskowaSkala = castles.facts["zamek-pieskowa-skala"].facts.find((fact) => fact.id === "F1410");
    assert(pieskowaSkala.pl.includes("Pieskowej Skale") && pieskowaSkala.en.includes("Pieskowa Skała"), "F1410 is a false statement for Mysia Wieża, which Kazimierz Wielki built too, so it should name its castle");
  }
  assert(factOf("drzewa", "krzywy-las", "F0300"), "F0300 names the Krzywy Las by its first word and should stay a possible decoy");
  assert(factOf("drzewa", "kasztanowiec-jastarnia", "F0345"), "F0345 names Jastarnia, a proper name from the card's name, and should stay a possible decoy");

  const served = new Map();
  for (const collection of collections) {
    if (!Object.keys(collection.facts || {}).length) continue;
    quizState.collection = collection;
    const counts = quiz.factTextCounts(collection);
    const list = quiz.quizPool(collection);
    const ask = (selected, draws, language) => {
      quizState.language = language;
      let draw = 0;
      return quiz.buildTrueFalseQuestion(selected, counts, { collection, list, rng: () => draws[draw++] ?? 0 });
    };
    const falseStatements = new Set();
    for (const selected of list) {
      quizState.lengths = [];
      // The second draw (below 0.5) asks for a false statement; the last recorded length is how many there are.
      const first = ask(selected, [0, 0.1, 0], "pl");
      if (!first || first.correctId === "true") continue;
      const choices = quizState.lengths.at(-1);
      const facts = new Set();
      for (let choice = 0; choice < choices; choice += 1) {
        const draws = [0, 0.1, (choice + 0.5) / choices];
        const polish = ask(selected, draws, "pl");
        const english = ask(selected, draws, "en");
        assert.equal(english.fact.id, polish.fact.id, `${collection.id}/${selected.id}: the true/false question should not depend on the page language`);
        assert.equal(polish.correctId, "false", `${collection.id}/${selected.id}: ${polish.fact.id} should be a false statement`);
        assert.equal(english.correctId, "false", `${collection.id}/${selected.id}: ${english.fact.id} should be a false statement`);
        const owner = list.find((item) => item.id === polish.ownerName);
        assert(owner && owner.id !== selected.id && owner.category !== selected.category, `${collection.id}/${selected.id}: ${polish.fact.id} should come from a card of another category`);
        assert(quiz.factNamesCard(polish.fact, owner, collection), `${collection.id}/${selected.id}: ${polish.fact.id} should name its own card`);
        facts.add(polish.fact.id);
      }
      served.set(`${collection.id}/${selected.id}`, facts);
      for (const id of facts) falseStatements.add(id);
    }
    assert(falseStatements.size >= 5, `${collection.id}: the true/false quiz should keep at least 5 facts that can serve as a false statement (now ${falseStatements.size})`);
  }
  const neverServed = [
    ["plazy-gady/traszka-gorska", "F0527"], ["plazy-gady/traszka-zwyczajna", "F0527"], ["plazy-gady/traszka-karpacka", "F0527"], ["plazy-gady/traszka-grzebieniasta", "F0527"],
    ["atmosfera-astronomia/miraz-gorny-nad-baltykiem", "F1066"], ["atmosfera-astronomia/fata-morgana-latajace-statki", "F1066"], ["atmosfera-astronomia/tatry-z-wyzyny-lubelskiej", "F1066"],
    ["atmosfera-astronomia/fata-morgana-latajace-statki", "F1058"], ["atmosfera-astronomia/tatry-z-wyzyny-lubelskiej", "F1058"], ["atmosfera-astronomia/atmosfera-jako-soczewka", "F1058"],
    ["kwiaty/dyptam-jesionolistny", "F0265"],
    ["mineraly/gips-wtorny-jeziorko", "F0813"], ["mineraly/kalcyt-siarkowy", "F0813"], ["mineraly/stroncjanit-tarnobrzeg", "F0813"],
    ["mineraly/uraninit-kowary", "F0849"],
  ];
  for (const [card, factId] of neverServed) {
    assert(collections.some((collection) => collection.items.some((item) => card === `${collection.id}/${item.id}`)), `${card} should be a card`);
    assert(!served.get(card)?.has(factId), `${factId} is true of ${card} too and should not be served there as a false statement`);
  }
}

// Polish "Podlaskie" (region line, line under the name) is the voivodeship, so English says "Podlaskie Province",
// as with "Lublin Province". English "Podlasie" is the historical region: it stands only where the Polish text
// names the region too ("Podlasie" or the adjective "podlaski"), and a Polish "Podlasie" there stays "Podlasie".
const podlasieFields = [["name_pl", "name"], ["name_lat", "latin"], ["hook", "hook"], ["quiz_angle", "quiz_angle"],
  ["safety_note", "safety_note"], ["region_pl", "region"], ["habitat_pl", "habitat"], ["occurrence_note", "occurrence"], ["level", "level"]];
for (const collection of collections) {
  for (const item of collection.items) {
    const english = itemTextEn[collection.id]?.[item.id] || {};
    for (const [polishField, englishField] of podlasieFields) {
      const polish = item[polishField] || "";
      const text = english[englishField] || "";
      const where = `${collection.id}/${item.id}: the English ${englishField}`;
      if (text.includes("Podlasie")) assert(/Podlasi|podlask/.test(polish), `${where} says "Podlasie", but the Polish ${polishField} does not name the region: ${text}`);
      if (polishField !== "region_pl" && polishField !== "name_lat") continue;
      if (/\bPodlaskie\b/.test(polish)) assert(text.includes("Podlaskie Province") && !text.includes("Podlasie"), `${where} should say "Podlaskie Province" for the Polish "Podlaskie": ${text}`);
      if (/\bPodlasi/.test(polish)) assert(text.includes("Podlasie") && !text.includes("Podlaskie Province"), `${where} should keep "Podlasie" for the Polish "Podlasie": ${text}`);
    }
  }
}

// A collection may name the occurrence box and its lines itself ("Obiekt" instead of "Siedlisko" for a mine).
// Every Polish label needs an English one, and a text does not repeat its own label ("Mechanizm: …").
const cardLabelFields = new Set(["occurrence", "region", "habitat"]);
for (const collection of collections) {
  const polish = collection.card_labels;
  const english = i18n.collections.en[collection.id]?.card_labels;
  if (!polish) {
    assert(!english, `${collection.id}: English card_labels without Polish ones`);
    continue;
  }
  for (const [field, label] of Object.entries(polish)) {
    assert(cardLabelFields.has(field), `${collection.id}: unknown card label ${field}`);
    assert(typeof label === "string" && label.trim(), `${collection.id}: card label ${field} should be a non-empty string`);
    assert(typeof english?.[field] === "string" && english[field].trim(), `${collection.id}: card label ${field} needs an English text`);
    assert(english[field] !== label && !polishWords.test(english[field]), `${collection.id}: the English card label ${field} looks Polish: ${english[field]}`);
  }
  assert.deepEqual(Object.keys(english).sort(), Object.keys(polish).sort(), `${collection.id}: English and Polish card labels should name the same fields`);
  for (const item of collection.items) {
    if (polish.habitat) assert(!item.habitat_pl.startsWith(`${polish.habitat}:`), `${collection.id}/${item.id}: the habitat text repeats its label "${polish.habitat}"`);
    if (english.habitat) assert(!itemTextEn[collection.id][item.id].habitat.startsWith(`${english.habitat}:`), `${collection.id}/${item.id}: the English habitat text repeats its label "${english.habitat}"`);
  }
}

// The photo packs note in Polish how each photo is shown; the English interface translates every note.
const photoNotes = new Set(collections.flatMap((collection) => collection.items.map((item) => item.image_modifications).filter(Boolean)));
for (const note of photoNotes) {
  const key = Object.keys(i18n.ui.pl).find((name) => name.startsWith("photoModifications") && i18n.ui.pl[name] === note);
  assert(key && i18n.ui.en[key] && i18n.ui.en[key] !== note, `the English interface should translate the photo note: ${note}`);
}

// Map points live in data/places/<collection>.places.js: coordinates from Wikidata, checked against the
// card's municipality and voivodeship. Only collections of places get them; the atlas never shows where
// species live, and a card whose safety note asks not to reveal the site gets no point either.
const placeCollections = new Set(["podziemia", "cuda-inzynierii", "architektura-drewniana", "twierdze-ruiny", "memento-mori",
  "rekordy-krajobrazu", "formacje-skalne", "drzewa", "skamienialosci", "atmosfera-astronomia", "rekordy-atmosferyczne"]);
const hiddenSite = /nie (ujawniać|publikować|nagłaśniać|zdradzać)/i;
const placeData = context.window.ATLAS_PLACES || {};
for (const file of fs.existsSync("data/places") ? fs.readdirSync("data/places") : []) {
  const collectionId = file.replace(/\.places\.js$/, "");
  const collection = collections.find((entry) => entry.id === collectionId);
  assert(collection, `data/places/${file} does not belong to any collection`);
  assert(placeCollections.has(collectionId), `data/places/${file}: ${collectionId} is not a collection of places`);
  assert(manifestScripts.some((scripts) => scripts.includes(`/data/places/${file}`)), `data/places/${file} should be loaded with its collection`);
  const places = placeData[collectionId];
  assert(places?.items, `data/places/${file} should set window.ATLAS_PLACES["${collectionId}"].items`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(places.checked || ""), `data/places/${file} should give the date the points were checked`);
  for (const [id, place] of Object.entries(places.items)) {
    const item = collection.items.find((entry) => entry.id === id);
    assert(item, `data/places/${file}: ${id} is not a card of ${collectionId}`);
    assert(!hiddenSite.test(item.safety_note || ""), `${collectionId}/${id}: the safety note asks not to reveal the site, so it gets no map point`);
    assert(Number.isFinite(place.lat) && place.lat >= 49 && place.lat <= 54.9, `${collectionId}/${id}: latitude ${place.lat} is outside Poland`);
    assert(Number.isFinite(place.lng) && place.lng >= 14.1 && place.lng <= 24.2, `${collectionId}/${id}: longitude ${place.lng} is outside Poland`);
    assert(/^Q\d+$/.test(place.wikidata || ""), `${collectionId}/${id}: the map point should name its Wikidata item`);
  }
  assert.equal(Object.keys(collection.places || {}).length, Object.keys(places.items).length, `${collectionId}: every map point should reach the collection`);
}
for (const scripts of manifestScripts) {
  const placesFile = scripts.find((src) => src.startsWith("/data/places/"));
  if (placesFile) assert(fs.existsSync(placesFile.slice(1)), `${placesFile} is listed in collections.js but missing`);
}

// The "Występowanie w Polsce" box (region, habitat and the note below them) of a collection with a file in
// data/occurrence/ names, for every card, the sources it was checked against and the date of the check.
const occurrenceData = context.window.ATLAS_OCCURRENCE_SOURCES || {};
for (const file of fs.existsSync("data/occurrence") ? fs.readdirSync("data/occurrence") : []) {
  const collectionId = file.replace(/\.occurrence\.js$/, "");
  const collection = collections.find((entry) => entry.id === collectionId);
  assert(collection, `data/occurrence/${file} does not belong to any collection`);
  assert(manifestScripts.some((scripts) => scripts.includes(`/data/occurrence/${file}`)), `data/occurrence/${file} should be loaded with its collection`);
  const sources = occurrenceData[collectionId];
  assert(sources?.items, `data/occurrence/${file} should set window.ATLAS_OCCURRENCE_SOURCES["${collectionId}"].items`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(sources.checked || ""), `data/occurrence/${file} should give the date the cards were checked`);
  for (const id of Object.keys(sources.items)) assert(collection.items.some((item) => item.id === id), `data/occurrence/${file}: ${id} is not a card of ${collectionId}`);
  for (const item of collection.items) {
    const list = sources.items[item.id];
    assert(Array.isArray(list) && list.length, `${collectionId}/${item.id}: the occurrence box needs at least one source`);
    for (const source of list) {
      assert(/^https:\/\/\S+$/.test(source.url || ""), `${collectionId}/${item.id}: a source should be an https address: ${source.url}`);
      assert(typeof source.label === "string" && source.label.trim(), `${collectionId}/${item.id}: every source needs a label`);
    }
  }
  assert.equal(Object.keys(collection.occurrence_sources || {}).length, collection.items.length, `${collectionId}: the sources of every card should reach the collection`);
}
for (const scripts of manifestScripts) {
  const occurrenceFile = scripts.find((src) => src.startsWith("/data/occurrence/"));
  if (occurrenceFile) assert(fs.existsSync(occurrenceFile.slice(1)), `${occurrenceFile} is listed in collections.js but missing`);
}

assert.match(insects.subtitle, /pamięć owadów/, "insect subtitle should use Polish diacritics");
assert(insects.categories.some((category) => category.label === "Nocne i świecące"), "insect categories should use Polish diacritics");
assert(insects.categories.some((category) => category.short === "Kształty"), "insect category short names should use Polish diacritics");
assert(flowers.subtitle.includes("dziko rosnących"), "flower subtitle should describe the wild/naturalized scope");
assert(flowers.categories.some((category) => category.label === "Łowcy i pułapki"), "flower categories should use Polish diacritics");
assert(flowers.items.some((item) => item.name_pl === "Świetlanka długoszowata" && item.synonyms?.includes("Świetlik mszysty")), "flower collection should include the moss curiosity under its corrected name, with the former atlas name kept as a synonym");
assert(fish.subtitle.includes("rybich osobliwości"), "fish subtitle should describe fish curiosities");
assert(fish.categories.some((category) => category.label === "Dźwięk i światło"), "fish categories should use Polish diacritics");
assert(fish.items.some((item) => item.name_pl === "Różanka"), "fish collection should include the bitterling curiosity from the source file");
assert(birds.subtitle.includes("ptasie osobliwości"), "bird subtitle should describe bird curiosities");
assert(birds.categories.some((category) => category.label === "Światło i zmysły"), "bird categories should use Polish diacritics");
assert(birds.items.some((item) => item.name_pl === "Dudek"), "bird collection should include the hoopoe curiosity from the source files");
assert(trees.subtitle.includes("dendrologiczne osobliwości"), "tree subtitle should describe dendrological curiosities");
assert(trees.categories.some((category) => category.label === "Zapach i chemia"), "tree categories should use Polish diacritics");
assert(trees.items.some((item) => item.name_pl === "Sosna na Szczudłach"), "tree collection should include the walking pine curiosity from the source file");
assert(minerals.subtitle.includes("mineralogiczne osobliwości"), "mineral subtitle should describe mineralogical curiosities");
assert(minerals.categories.some((category) => category.label === "Endemity i nowe minerały"), "mineral categories should use Polish diacritics");
assert(minerals.items.some((item) => item.name_pl === "Krzemień pasiasty"), "mineral collection should include striped flint from the source file");
assert(minerals.items.some((item) => item.name_pl === "Haueryt z Machowa i Jeziórka"), "mineral collection should include the Polish hauerite curiosity from the source file");
assert(rockFormations.subtitle.includes("formacje skalne"), "rock formation subtitle should describe geological rock-form curiosities");
assert(rockFormations.categories.some((category) => category.label === "Labirynty piaskowcowe"), "rock formation categories should use Polish diacritics");
assert(rockFormations.items.some((item) => item.name_pl === "Błędne Skały"), "rock formation collection should include Błędne Skały from the source file");
assert(rockFormations.items.some((item) => item.name_pl === "Maczuga Herkulesa"), "rock formation collection should include Maczuga Herkulesa from the source file");
assert(rockFormations.items.some((item) => item.name_pl === "Kolorowe Jeziorka"), "rock formation collection should include Kolorowe Jeziorka from the user's requested scope");
assert(fossils.subtitle.includes("paleontologiczne osobliwości"), "fossil subtitle should describe paleontological curiosities");
assert(fossils.categories.some((category) => category.label === "Tropy i ląd triasu"), "fossil categories should use Polish diacritics");
assert(fossils.items.some((item) => item.name_pl === "Tropy tetrapodów z Zachełmia"), "fossil collection should include Zachełmie tetrapod tracks from the source file");
assert(fossils.items.some((item) => item.name_pl === "Tropy dinozaurów z Gór Świętokrzyskich"), "fossil collection should include dinosaur tracks from the user's requested scope");
assert(fossils.items.some((item) => item.name_pl === "Amonity jurajskie Polski"), "fossil collection should include ammonites from the user's requested scope");
assert(skyPhenomena.subtitle.includes("atmosferyczne i astronomiczne osobliwości"), "atmosphere and astronomy subtitle should describe sky curiosities");
assert(skyPhenomena.categories.some((category) => category.label === "Niebo nocne i kosmos"), "atmosphere and astronomy categories should use Polish diacritics");
assert(skyPhenomena.items.some((item) => item.name_pl === "Widmo Brockenu"), "atmosphere and astronomy collection should include the Brocken spectre from the source file");
assert(skyPhenomena.items.some((item) => item.name_pl === "Obłoki srebrzyste"), "atmosphere and astronomy collection should include noctilucent clouds from the source file");
assert(skyPhenomena.items.some((item) => item.name_pl === "Zorze polarne nad Polską"), "atmosphere and astronomy collection should include auroras over Poland from the source file");
assert(mammals.subtitle.includes("ssacze osobliwości"), "mammal subtitle should describe mammal curiosities");
assert(mammals.categories.some((category) => category.label === "Mikrossaki i jad"), "mammal categories should use Polish diacritics");
assert(mammals.items.some((item) => item.name_pl === "Ryjówka aksamitna"), "mammal collection should include the Dehnel phenomenon shrew from the source file");
assert(mammals.items.some((item) => item.name_pl === "Rzęsorek rzeczek"), "mammal collection should include the venomous water shrew from the source file");
assert(mammals.items.some((item) => item.name_pl === "Żubr europejski"), "mammal collection should include the European bison from the source file");
assert(mammals.items.some((item) => item.name_pl === "Morświn zwyczajny"), "mammal collection should include the Baltic porpoise from the source file");
assert(amphibiansReptiles.subtitle.includes("herpetologiczne osobliwości"), "amphibian and reptile subtitle should describe herpetofauna curiosities");
assert(amphibiansReptiles.categories.some((category) => category.label === "Barwy i obrona"), "amphibian and reptile categories should use Polish diacritics");
assert(amphibiansReptiles.items.some((item) => item.name_pl === "Żaba moczarowa"), "amphibian and reptile collection should include the blue moor frog phenomenon from the source file");
assert(amphibiansReptiles.items.some((item) => item.name_pl === "Grzebiuszka ziemna"), "amphibian and reptile collection should include the garlic-scented spadefoot from the source file");
assert(amphibiansReptiles.items.some((item) => item.name_pl === "Wąż Eskulapa"), "amphibian and reptile collection should include the Aesculapian snake from the source file");
assert(amphibiansReptiles.items.some((item) => item.name_pl === "Zaskroniec rybołów"), "amphibian and reptile collection should include the documented dice snake population from the source file");
assert(amphibiansReptiles.items.some((item) => item.name_pl === "Żółw błotny"), "amphibian and reptile collection should include the native European pond turtle from the source file");
assert(!amphibiansReptiles.items.some((item) => item.name_pl === "Jaszczurka zielona"), "amphibian and reptile collection should omit the unconfirmed green lizard as a species card");
assert(woodenArchitecture.subtitle.includes("drewnianych osobliwości Polski"), "wooden architecture subtitle should describe Polish wooden curiosities");
assert(woodenArchitecture.categories.some((category) => category.label === "Kościoły Pokoju"), "wooden architecture categories should include Peace Churches");
assert(woodenArchitecture.items.some((item) => item.name_pl === "Kościół Pokoju w Świdnicy"), "wooden architecture collection should include the Świdnica Peace Church");
assert(woodenArchitecture.items.some((item) => item.name_pl === "Kościół św. Michała Archanioła w Dębnie Podhalańskim"), "wooden architecture collection should include the Dębno wooden church");
assert(woodenArchitecture.items.some((item) => item.name_pl === "Cerkiew św. Paraskewii w Kwiatoniu"), "wooden architecture collection should include the Kwiatoń Lemko church");
assert(woodenArchitecture.items.some((item) => item.name_pl === "Świątynia Wang"), "wooden architecture collection should include the Wang stave church");
assert(woodenArchitecture.items.some((item) => item.name_pl === "Meczet tatarski w Kruszynianach"), "wooden architecture collection should include the Kruszyniany wooden mosque");
assert(woodenArchitecture.items.some((item) => item.source_status === "expanded_candidate"), "wooden architecture collection should mark expanded candidates for later verification");
assert(underground.subtitle.includes("podziemnych osobliwości Polski"), "underground subtitle should describe Polish subterranean curiosities");
assert(underground.categories.some((category) => category.label === "Kopalnie i surowce"), "underground categories should include mines and raw materials");
assert(underground.items.some((item) => item.name_pl === "Kopalnia Soli „Wieliczka”"), "underground collection should include Wieliczka Salt Mine");
assert(underground.items.some((item) => item.name_pl === "Krzemionki Opatowskie"), "underground collection should include Krzemionki Opatowskie");
assert(underground.items.some((item) => item.name_pl === "Projekt Riese — Włodarz"), "underground collection should include Riese Włodarz");
assert(underground.items.some((item) => item.name_pl === "Międzyrzecki Rejon Umocniony"), "underground collection should include Międzyrzecz Fortified Region");
assert(underground.items.some((item) => item.name_pl === "Chełmskie Podziemia Kredowe"), "underground collection should include Chełm Chalk Tunnels");
assert(underground.items.every((item) => !/sensac/i.test(item.hook)), "underground wartime descriptions should avoid sensational framing");
assert(engineeringWonders.subtitle.includes("techniczne osobliwości Polski"), "engineering wonders subtitle should describe technical curiosities");
assert(engineeringWonders.categories.some((category) => category.label === "Woda i kanały"), "engineering wonders categories should include water and canals");
assert(engineeringWonders.categories.some((category) => category.label === "Mosty i tunele"), "engineering wonders categories should include bridges and tunnels");
assert(engineeringWonders.items.some((item) => item.name_pl === "Kanał Elbląski"), "engineering wonders collection should include the Elbląg Canal");
assert(engineeringWonders.items.some((item) => item.name_pl === "Radiostacja Gliwicka"), "engineering wonders collection should include the Gliwice Radio Tower");
assert(engineeringWonders.items.some((item) => item.name_pl === "Elektrownia Porąbka-Żar"), "engineering wonders collection should include the Porąbka-Żar pumped storage plant");
assert(engineeringWonders.items.some((item) => item.name_pl === "Tunel pod Świną"), "engineering wonders collection should include the Świna tunnel");
assert(engineeringWonders.items.every((item) => item.scienceNote && item.quizFacts?.length >= 3 && item.sourceHints?.length >= 3), "engineering wonders entries should include science notes, quiz facts and source hints");
assert(fortressesRuins.subtitle.includes("twierdz i ruin"), "fortresses and ruins subtitle should describe Polish fortresses and ruins");
assert(fortressesRuins.categories.some((category) => category.label === "Miasta idealne"), "fortresses and ruins categories should include ideal cities");
assert(fortressesRuins.categories.some((category) => category.label === "Zapomniane konstrukcje"), "fortresses and ruins categories should include forgotten structures");
assert(fortressesRuins.items.some((item) => item.name_pl === "Zamość"), "fortresses and ruins collection should include Zamość");
assert(fortressesRuins.items.some((item) => item.name_pl === "Zamek Krzyżtopór"), "fortresses and ruins collection should include Krzyżtopór Castle");
assert(fortressesRuins.items.some((item) => item.name_pl === "Twierdza Srebrna Góra"), "fortresses and ruins collection should include Srebrna Góra Fortress");
assert(fortressesRuins.items.some((item) => item.name_pl === "Mosty w Stańczykach" && item.synonyms?.includes("Wiadukty w Stańczykach")), "fortresses and ruins collection should include the Stańczyki bridges under their official name, with the former atlas name kept as a synonym");
assert(fortressesRuins.items.some((item) => item.name_pl === "Zamek w Łapalicach"), "fortresses and ruins collection should include the unfinished Łapalice castle");
assert(fortressesRuins.items.every((item) => item.scienceNote && item.quizFacts?.length >= 3 && item.sourceHints?.length >= 3), "fortresses and ruins entries should include science notes, quiz facts and source hints");
assert(mementoMori.subtitle.includes("miejsc pamięci i przemijania"), "memento mori subtitle should describe memorial and transience places");
assert(mementoMori.categories.some((category) => category.label === "Miejsca Zagłady"), "memento mori categories should include Holocaust memorial sites");
assert(mementoMori.categories.some((category) => category.label === "Kopce i pradawne pochówki"), "memento mori categories should include mounds and ancient burials");
assert(mementoMori.items.some((item) => item.name_pl === "Kaplica Czaszek w Czermnej"), "memento mori collection should include the Czermna Skull Chapel");
assert(mementoMori.items.some((item) => item.name_pl === "Auschwitz-Birkenau"), "memento mori collection should include Auschwitz-Birkenau");
assert(mementoMori.items.some((item) => item.name_pl === "Cmentarz Żydowski przy ul. Okopowej w Warszawie"), "memento mori collection should include the Okopowa Jewish Cemetery");
assert(mementoMori.items.some((item) => item.name_pl === "Mizar w Kruszynianach"), "memento mori collection should include the Kruszyniany mizar");
assert(mementoMori.items.some((item) => item.name_pl === "Kopiec Powstania Warszawskiego"), "memento mori collection should include the Warsaw Uprising Mound");
assert(mementoMori.items.every((item) => item.scienceNote && item.quizFacts?.length >= 3 && item.sourceHints?.length >= 3), "memento mori entries should include science notes, quiz facts and source hints");
assert(mementoMori.items.every((item) => !/(najstrasz|makabr|horror|sensac|creepy)/i.test(`${item.hook} ${item.quiz_angle} ${item.safety_note}`)), "memento mori entries should avoid sensational framing");
assert(landscapeRecords.subtitle.includes("krajobrazowych osobliwości"), "landscape records subtitle should describe landscape curiosities");
assert(landscapeRecords.count_label === "56 osobliwości", "landscape records tile should use the requested 56-item badge");
assert(landscapeRecords.categories.some((category) => category.label === "Piasek i wydmy"), "landscape records categories should include sand and dunes");
assert(landscapeRecords.categories.some((category) => category.label === "Ekstrema, iluzje i mikroklimaty"), "landscape records categories should include extremes, illusions and microclimates");
assert(landscapeRecords.items.some((item) => item.name_pl === "Pustynia Błędowska"), "landscape records collection should include Błędów Desert");
assert(landscapeRecords.items.some((item) => item.name_pl === "Ruchome wydmy Słowińskiego Parku Narodowego"), "landscape records collection should include the moving dunes");
assert(landscapeRecords.items.some((item) => item.name_pl === "Krzywy Las"), "landscape records collection should include the Crooked Forest");
assert(landscapeRecords.items.some((item) => item.name_pl === "Rysy — najwyższy punkt Polski"), "landscape records collection should include Rysy as the highest point");
assert(landscapeRecords.items.some((item) => item.name_pl === "Skit w Odrynkach"), "landscape records collection should include the Odrynki skete");
assert(landscapeRecords.items.every((item) => item.scienceNote && item.quizFacts?.length >= 3 && item.sourceHints?.length >= 3), "landscape records entries should include science notes, quiz facts and source hints");

const requiredPolishInsectText = {
  "oleica-krowka": "Oleica krówka",
  "zmierzchnica-trupia-glowka": "Zmierzchnica trupia główka",
  "zyrytwa-pluskwowata": "Płoszczyca szara",
  "paz-krolowej": "Paź królowej",
  "kozog-debowy": "Kozioróg dębosz"
};

for (const [id, expectedName] of Object.entries(requiredPolishInsectText)) {
  const item = insects.items.find((entry) => entry.id === id);
  assert(item, `${id} should exist`);
  assert.equal(item.name_pl, expectedName, `${id} should use Polish diacritics in name`);
}

for (const collection of collections) {
  assert(collection.title, `${collection.id} should have a title`);
  assert(collection.subtitle, `${collection.id} should have a subtitle`);
  assert(collection.safety_notice, `${collection.id} should have a safety notice`);
  assert(Array.isArray(collection.categories) && collection.categories.length > 0, `${collection.id} should have categories`);
  assert(Array.isArray(collection.items) && collection.items.length > 0, `${collection.id} should have items`);

  const categoryIds = new Set(collection.categories.map((category) => category.id));
  for (const item of collection.items) {
    assert(item.id, `${collection.id} item should have id`);
    assert(item.name_pl, `${collection.id} item ${item.id} should have Polish name`);
    assert(item.name_lat, `${collection.id} item ${item.id} should have Latin name`);
    assert(item.hook, `${collection.id} item ${item.id} should have hook`);
    assert(item.quiz_angle, `${collection.id} item ${item.id} should have quiz angle`);
    assert(item.safety_note, `${collection.id} item ${item.id} should have safety note`);
    assert(categoryIds.has(item.category), `${collection.id} item ${item.id} should reference an existing category`);
  }
}

// Start page: the cabinet of curiosities, the drawer photos and the numbers under the hero are copies of
// the cards in data/start-page.js, made by scripts/build-start-page.mjs. They have to match the cards.
const { buildStartPage } = await import("./build-start-page.mjs");
vm.runInContext(fs.readFileSync("data/start-page.js", "utf8"), context, { filename: "data/start-page.js" });
const startPage = JSON.parse(JSON.stringify(context.window.ATLAS_START || null));
assert(startPage, "data/start-page.js should set window.ATLAS_START");
assert.deepEqual(startPage, JSON.parse(JSON.stringify(buildStartPage(context.window))), "data/start-page.js no longer matches the cards: run npm run build:start-page");
assert(htmlScripts.indexOf("./data/start-page.js") !== -1 && htmlScripts.indexOf("./data/start-page.js") < htmlScripts.indexOf("./js/app.js"), "index.html should load data/start-page.js before js/app.js");
// "Szukaj w całym atlasie" looks through data/search-index.js, made by scripts/build-search-index.mjs: one row
// per card of every collection. The page loads it on first use, so index.html does not.
const { buildSearchIndex } = await import("./build-search-index.mjs");
vm.runInContext(fs.readFileSync("data/search-index.js", "utf8"), context, { filename: "data/search-index.js" });
const searchIndex = JSON.parse(JSON.stringify(context.window.ATLAS_SEARCH || null));
assert(searchIndex, "data/search-index.js should set window.ATLAS_SEARCH");
assert.deepEqual(searchIndex, JSON.parse(JSON.stringify(buildSearchIndex(context.window))), "data/search-index.js no longer matches the cards: run npm run build:search-index");
assert.equal(searchIndex.cards.length, collections.reduce((sum, collection) => sum + collection.items.length, 0), "the search index should have every card");
assert(!htmlScripts.some((src) => src.includes("search-index")), "index.html should not load the search index up front");
assert(appJs.includes('loadScript("/data/search-index.js", "ATLAS_SEARCH")'), "the start page should load data/search-index.js for the search");
const startPhotos = [...startPage.specimens.map((entry) => entry.photo), ...Object.values(startPage.covers).map((entry) => entry.photo)];
assert.equal(new Set(startPhotos.map((photo) => photo.image)).size, startPhotos.length, "every photo on the start page should be different");
for (const photo of startPhotos) {
  // The start page shows no photo labels, so it only uses photos of the card's own subject.
  assert(!photoLabel.test(photo.alt), `${photo.source}: the start page should not use a representative or context photo`);
}
for (const collection of collections) {
  assert(startPage.covers[collection.id], `${collection.id} should have a drawer photo in scripts/build-start-page.mjs`);
  assert(collection.teaser, `${collection.id} should have a short teaser for its drawer`);
  assert(i18n.collections.en[collection.id].teaser, `${collection.id} should have an English drawer teaser`);
  // The drawer, the collection's heading and its link preview image show this count.
  for (const label of [collection.count_label, i18n.collections.en[collection.id].count_label]) {
    assert(String(label || "").startsWith(`${collection.items.length} `), `${collection.id}: the count label "${label}" should start with the number of cards, ${collection.items.length}`);
  }
}
// The drawer heading spells the number of collections out.
const numberWords = { 19: ["Dziewiętnaście", "Nineteen"] };
assert(numberWords[collections.length], `add the number words for ${collections.length} collections here and to collectionsTitle in data/i18n.js`);
assert(i18n.ui.pl.collectionsTitle.startsWith(numberWords[collections.length][0]), "the Polish drawer heading should name the number of collections");
assert(i18n.ui.en.collectionsTitle.startsWith(numberWords[collections.length][1]), "the English drawer heading should name the number of collections");
// The line above the hero and the share texts of the start page give the number in figures.
const collectionCount = (language) => {
  const forms = i18n.ui[language].collectionCountForms;
  return (forms[new Intl.PluralRules(language).select(collections.length)] ?? forms.other).replace("{count}", collections.length);
};
assert(indexHtml.includes(`<p id="heroEyebrow" class="eyebrow">${i18n.ui.pl.heroEyebrow.replace("{collections}", collectionCount("pl"))}</p>`), "index.html should give the number of collections above the hero");
for (const language of ["pl", "en"]) {
  assert(i18n.ui[language].metaStartShare.includes(collectionCount(language)), `the ${language} share text of the start page should give the number of collections`);
}

// The map of every place (/mapa) shows the places before any collection loads, from copies of the map
// points and card names in data/map-points.js, made by scripts/build-map-points.mjs. Only that page loads it.
const { buildMapPoints } = await import("./build-map-points.mjs");
vm.runInContext(fs.readFileSync("data/map-points.js", "utf8"), context, { filename: "data/map-points.js" });
const mapPoints = JSON.parse(JSON.stringify(context.window.ATLAS_MAP_POINTS || null));
assert(mapPoints, "data/map-points.js should set window.ATLAS_MAP_POINTS");
assert.deepEqual(mapPoints, JSON.parse(JSON.stringify(buildMapPoints(context.window))), "data/map-points.js no longer matches the map points and cards: run npm run build:map-points");
assert.equal(mapPoints.places.length, startPage.stats.places, "the map of every place should show as many places as the start page counts");
assert.equal(new Set(mapPoints.places.map((place) => place.q)).size, mapPoints.places.length, "every place should be on the map once");
assert(!htmlScripts.includes("./data/map-points.js"), "index.html should not load data/map-points.js up front; the map page loads it");
assert(appJs.includes('loadScript("/data/map-points.js", "ATLAS_MAP_POINTS")'), "the map page should load data/map-points.js");
