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
  !htmlScripts.some((src) => /\/data\/(mushrooms|insects|flowers|fish|birds|mammals|amphibians-reptiles|trees|minerals|rock-formations|wooden-architecture|underground|engineering-wonders|fortresses-ruins|memento-mori|fossils|atmosphere-astronomy|landscape-records|photo-pack-v0[3-8]|region-pack-v07|[a-z-]+-photo-pack-v01)\.js$/.test(src)),
  "per-collection data scripts must be lazy-loaded by collections.js, not declared eagerly in index.html"
);

// Extract every "/data/X.js" reference from the per-collection scripts arrays in collections.js.
const scriptsArrayBlocks = [...collectionsJs.matchAll(/scripts:\s*\[([\s\S]*?)\]/g)];
assert(scriptsArrayBlocks.length >= 18, "collections.js should expose at least 18 lazy-load script lists, one per collection");
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
assert(
  vercelConfig.rewrites?.some((rewrite) => rewrite.source === "/atlas/:path*" && rewrite.destination === "/"),
  "Vercel should rewrite nested atlas routes to the static SPA entry using the documented wildcard syntax"
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

const collections = app.collections || [];
assert.equal(collections.length, 18, "atlas should expose mushrooms, insects, flowers, fish, birds, mammals, amphibians and reptiles, trees, minerals, rock formations, wooden architecture, underground, engineering wonders, fortresses and ruins, memento mori, landscape records, fossils and sky phenomena");

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
assert.equal(mushrooms.items.length, 60, "mushroom collection should keep all 60 entries");
assert.equal(insects.items.length, 30, "insect collection should contain the prepared 30 entries");
assert.equal(flowers.items.length, 31, "flower collection should contain 31 Polish wild or naturalized plant curiosities");
assert.equal(fish.items.length, 32, "fish collection should contain 32 fish curiosities");
assert.equal(birds.items.length, 32, "bird collection should contain 32 bird curiosities");
assert.equal(trees.items.length, 30, "tree collection should contain 30 dendrological curiosities");
assert.equal(minerals.items.length, 33, "mineral collection should contain 33 mineralogical curiosities");
assert.equal(rockFormations.items.length, 33, "rock formation collection should contain 33 geological curiosities");
assert.equal(fossils.items.length, 33, "fossil collection should contain 33 paleontological curiosities");
assert.equal(skyPhenomena.items.length, 33, "atmosphere and astronomy collection should contain 33 sky and weather curiosities");
assert.equal(mammals.items.length, 33, "mammal collection should contain 33 mammal curiosities");
assert.equal(amphibiansReptiles.items.length, 30, "amphibian and reptile collection should contain 30 well-documented herpetofauna curiosities");
assert.equal(woodenArchitecture.items.length, 30, "wooden architecture collection should contain 30 prepared architectural curiosities");
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
assert.equal(fishImages.length, 32, "fish collection should include 32 curated images with attribution");
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
assert.equal(mineralImages.length, 33, "mineral collection should include 33 curated images with attribution");
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
assert.equal(rockFormationImages.length, 33, "rock formation collection should include 33 curated images with attribution");
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
assert.equal(fossilImages.length, 33, "fossil collection should include 33 curated images with attribution");
assert(
  fossils.items.every((item) => item.image.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/")),
  "fossil images should use Wikimedia Commons Special:Redirect links"
);
assert(
  fossils.items.every((item) => item.image_source.startsWith("https://commons.wikimedia.org/wiki/File:")),
  "fossil image sources should link to Wikimedia Commons file pages"
);
const skyPhenomenonImages = skyPhenomena.items.filter(
  (item) => item.image && item.image_author && item.image_source && item.image_license && item.license_url && item.image_modifications
);
assert.equal(skyPhenomenonImages.length, 33, "atmosphere and astronomy collection should include 33 curated images with attribution");
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
assert.equal(woodenArchitectureImages.length, 30, "wooden architecture collection should include 30 curated images with attribution");
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
assert.equal(
  insects.items.filter((item) => item.image && item.image_author && item.image_source && item.image_license).length,
  29,
  "insect collection should include 29 Commons images with attribution; Phausis splendidula remains without a verified photo"
);

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
assert.match(insects.subtitle, /pamięć owadów/, "insect subtitle should use Polish diacritics");
assert(insects.categories.some((category) => category.label === "Nocne i świecące"), "insect categories should use Polish diacritics");
assert(insects.categories.some((category) => category.short === "Kształty"), "insect category short names should use Polish diacritics");
assert(flowers.subtitle.includes("dziko rosnące"), "flower subtitle should describe the wild/naturalized scope");
assert(flowers.categories.some((category) => category.label === "Łowcy i pułapki"), "flower categories should use Polish diacritics");
assert(flowers.items.some((item) => item.name_pl === "Świetlik mszysty"), "flower collection should include the moss curiosity from the source file");
assert(fish.subtitle.includes("rybie osobliwości"), "fish subtitle should describe fish curiosities");
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
assert(fortressesRuins.items.some((item) => item.name_pl === "Wiadukty w Stańczykach"), "fortresses and ruins collection should include Stańczyki viaducts");
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
  "zyrytwa-pluskwowata": "Żyrytwa pluskwowata",
  "paz-krolowej": "Paź królowej",
  "kozog-debowy": "Kozóg dębowy"
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
