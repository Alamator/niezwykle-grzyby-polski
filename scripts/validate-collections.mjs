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
assert(scriptSources.includes("./data/collections.js"), "index.html should load data/collections.js");
assert(
  scriptSources.indexOf("./data/collections.js") < scriptSources.indexOf("./js/app.js"),
  "collections.js should load before app.js"
);

const context = { window: {} };
vm.createContext(context);

for (const source of scriptSources.filter((src) => src.startsWith("./data/"))) {
  vm.runInContext(fs.readFileSync(source.replace("./", ""), "utf8"), context, {
    filename: source
  });
}

const app = context.window.ATLAS_APP_DATA;
assert(app, "ATLAS_APP_DATA should be defined");
assert.equal(app.project, "Atlas Osobliwości Polski");
assert.equal(JSON.stringify(app.views.map((view) => view.id)), JSON.stringify(["atlas", "learn", "quiz", "sources"]));

const collections = app.collections || [];
assert.equal(collections.length, 2, "first release should expose mushrooms and insects");

const mushrooms = collections.find((collection) => collection.id === "grzyby");
const insects = collections.find((collection) => collection.id === "owady");
assert(mushrooms, "mushroom collection should exist");
assert(insects, "insect collection should exist");
assert.equal(mushrooms.items.length, 60, "mushroom collection should keep all 60 entries");
assert.equal(insects.items.length, 30, "insect collection should contain the prepared 30 entries");
assert.equal(
  insects.items.filter((item) => item.image && item.image_author && item.image_source && item.image_license).length,
  29,
  "insect collection should include 29 Commons images with attribution; Phausis splendidula remains without a verified photo"
);

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
