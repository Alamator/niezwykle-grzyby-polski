import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const indexHtml = fs.readFileSync("index.html", "utf8");
const scriptSources = [...indexHtml.matchAll(/<script\s+defer\s+src="([^"]+)"/g)].map((match) => match[1]);

assert.match(indexHtml, /Atlas Osobliwości Polski/, "page should use the umbrella atlas title");
assert.doesNotMatch(indexHtml, /Otwórz owady/, "hero should not privilege one collection with a direct shortcut");
assert.doesNotMatch(indexHtml, /data-view="contest"/, "contest view should not be in navigation");
assert.doesNotMatch(indexHtml, /data-view="review"/, "review view should not be in navigation");
assert(scriptSources.includes("./data/insects.js"), "index.html should load data/insects.js");
assert(scriptSources.includes("./data/flowers.js"), "index.html should load data/flowers.js");
assert(scriptSources.includes("./data/flower-photo-pack-v01.js"), "index.html should load flower Commons photo pack");
assert(scriptSources.includes("./data/fish.js"), "index.html should load data/fish.js");
assert(scriptSources.includes("./data/fish-photo-pack-v01.js"), "index.html should load fish Commons photo pack");
assert(scriptSources.includes("./data/birds.js"), "index.html should load data/birds.js");
assert(scriptSources.includes("./data/bird-photo-pack-v01.js"), "index.html should load bird Commons photo pack");
assert(scriptSources.includes("./data/trees.js"), "index.html should load data/trees.js");
assert(scriptSources.includes("./data/tree-photo-pack-v01.js"), "index.html should load tree Commons photo pack");
assert(scriptSources.includes("./data/minerals.js"), "index.html should load data/minerals.js");
assert(scriptSources.includes("./data/mineral-photo-pack-v01.js"), "index.html should load mineral Commons photo pack");
assert(scriptSources.includes("./data/rock-formations.js"), "index.html should load data/rock-formations.js");
assert(scriptSources.includes("./data/rock-formation-photo-pack-v01.js"), "index.html should load rock formation Commons photo pack");
assert(scriptSources.includes("./data/fossils.js"), "index.html should load data/fossils.js");
assert(scriptSources.includes("./data/fossil-photo-pack-v01.js"), "index.html should load fossil Commons photo pack");
assert(scriptSources.includes("./data/atmosphere-astronomy.js"), "index.html should load data/atmosphere-astronomy.js");
assert(scriptSources.includes("./data/atmosphere-astronomy-photo-pack-v01.js"), "index.html should load atmosphere and astronomy Commons photo pack");
assert(scriptSources.includes("./data/mammals.js"), "index.html should load data/mammals.js");
assert(scriptSources.includes("./data/mammal-photo-pack-v01.js"), "index.html should load mammal Commons photo pack");
assert(scriptSources.includes("./data/collections.js"), "index.html should load data/collections.js");
assert(scriptSources.includes("./data/i18n.js"), "index.html should load data/i18n.js");
assert(
  scriptSources.indexOf("./data/flowers.js") < scriptSources.indexOf("./data/collections.js"),
  "flowers.js should load before collections.js"
);
assert(
  scriptSources.indexOf("./data/flowers.js") < scriptSources.indexOf("./data/flower-photo-pack-v01.js") &&
    scriptSources.indexOf("./data/flower-photo-pack-v01.js") < scriptSources.indexOf("./data/collections.js"),
  "flower photo pack should load after flowers.js and before collections.js"
);
assert(
  scriptSources.indexOf("./data/fish.js") < scriptSources.indexOf("./data/fish-photo-pack-v01.js") &&
    scriptSources.indexOf("./data/fish-photo-pack-v01.js") < scriptSources.indexOf("./data/collections.js"),
  "fish photo pack should load after fish.js and before collections.js"
);
assert(
  scriptSources.indexOf("./data/birds.js") < scriptSources.indexOf("./data/bird-photo-pack-v01.js") &&
    scriptSources.indexOf("./data/bird-photo-pack-v01.js") < scriptSources.indexOf("./data/collections.js"),
  "bird photo pack should load after birds.js and before collections.js"
);
assert(
  scriptSources.indexOf("./data/trees.js") < scriptSources.indexOf("./data/tree-photo-pack-v01.js") &&
    scriptSources.indexOf("./data/tree-photo-pack-v01.js") < scriptSources.indexOf("./data/collections.js"),
  "tree photo pack should load after trees.js and before collections.js"
);
assert(
  scriptSources.indexOf("./data/minerals.js") < scriptSources.indexOf("./data/mineral-photo-pack-v01.js") &&
    scriptSources.indexOf("./data/mineral-photo-pack-v01.js") < scriptSources.indexOf("./data/collections.js"),
  "mineral photo pack should load after minerals.js and before collections.js"
);
assert(
  scriptSources.indexOf("./data/rock-formations.js") < scriptSources.indexOf("./data/rock-formation-photo-pack-v01.js") &&
    scriptSources.indexOf("./data/rock-formation-photo-pack-v01.js") < scriptSources.indexOf("./data/collections.js"),
  "rock formation photo pack should load after rock-formations.js and before collections.js"
);
assert(
  scriptSources.indexOf("./data/fossils.js") < scriptSources.indexOf("./data/fossil-photo-pack-v01.js") &&
    scriptSources.indexOf("./data/fossil-photo-pack-v01.js") < scriptSources.indexOf("./data/collections.js"),
  "fossil photo pack should load after fossils.js and before collections.js"
);
assert(
  scriptSources.indexOf("./data/atmosphere-astronomy.js") < scriptSources.indexOf("./data/atmosphere-astronomy-photo-pack-v01.js") &&
    scriptSources.indexOf("./data/atmosphere-astronomy-photo-pack-v01.js") < scriptSources.indexOf("./data/collections.js"),
  "atmosphere and astronomy photo pack should load after atmosphere-astronomy.js and before collections.js"
);
assert(
  scriptSources.indexOf("./data/mammals.js") < scriptSources.indexOf("./data/mammal-photo-pack-v01.js") &&
    scriptSources.indexOf("./data/mammal-photo-pack-v01.js") < scriptSources.indexOf("./data/collections.js"),
  "mammal photo pack should load after mammals.js and before collections.js"
);
assert(
  scriptSources.indexOf("./data/collections.js") < scriptSources.indexOf("./js/app.js"),
  "collections.js should load before app.js"
);
assert(
  scriptSources.indexOf("./data/i18n.js") < scriptSources.indexOf("./js/app.js"),
  "i18n.js should load before app.js"
);

const context = { window: {} };
vm.createContext(context);

for (const source of scriptSources.filter((src) => src.startsWith("./data/"))) {
  vm.runInContext(fs.readFileSync(source.replace("./", ""), "utf8"), context, {
    filename: source
  });
}

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
assert.equal(collections.length, 11, "atlas should expose mushrooms, insects, flowers, fish, birds, trees, minerals, rock formations, fossils, sky phenomena and mammals");

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
