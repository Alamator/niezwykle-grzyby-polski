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
assert(scriptSources.includes("./data/collections.js"), "index.html should load data/collections.js");
assert(scriptSources.includes("./data/i18n.js"), "index.html should load data/i18n.js");
assert(
  scriptSources.indexOf("./data/flowers.js") < scriptSources.indexOf("./data/collections.js"),
  "flowers.js should load before collections.js"
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
assert.equal(collections.length, 3, "atlas should expose mushrooms, insects and flowers");

const mushrooms = collections.find((collection) => collection.id === "grzyby");
const insects = collections.find((collection) => collection.id === "owady");
const flowers = collections.find((collection) => collection.id === "kwiaty");
assert(mushrooms, "mushroom collection should exist");
assert(insects, "insect collection should exist");
assert(flowers, "flower collection should exist");
assert.equal(mushrooms.items.length, 60, "mushroom collection should keep all 60 entries");
assert.equal(insects.items.length, 30, "insect collection should contain the prepared 30 entries");
assert.equal(flowers.items.length, 31, "flower collection should contain 31 Polish wild or naturalized plant curiosities");
assert(flowers.items.every((item) => !item.image && !item.image_author), "flower collection should start with placeholders until Commons images are curated");
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
