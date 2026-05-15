import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const indexHtml = fs.readFileSync("index.html", "utf8");
const collectionsJs = fs.readFileSync("data/collections.js", "utf8");

assert.match(indexHtml, /Atlas Osobliwości Polski/, "page should use the umbrella atlas title");
assert.doesNotMatch(indexHtml, /(src|href)="\.\/(?:assets|css|data|js|manifest)/, "root assets should use absolute paths so nested atlas routes can load them");
assert.doesNotMatch(indexHtml, /data-view="contest"/, "contest view should not be present");
assert.doesNotMatch(indexHtml, /data-view="review"/, "review view should not be present");

// The mushroom data scripts are now lazy-loaded by collections.js. We pick them out of the manifest
// and run them in a shared vm context to validate the data shape.
const mushroomBlockMatch = collectionsJs.match(/id:\s*"grzyby"[\s\S]*?scripts:\s*\[([\s\S]*?)\]/);
assert(mushroomBlockMatch, "collections.js should declare the grzyby entry with a scripts array");
const mushroomScripts = [...mushroomBlockMatch[1].matchAll(/"(\/data\/[^"]+)"/g)].map((m) => m[1]);

assert(mushroomScripts.includes("/data/mushrooms.js"), "grzyby manifest should reference data/mushrooms.js");
assert(mushroomScripts.includes("/data/region-pack-v07.js"), "grzyby manifest should reference data/region-pack-v07.js");
assert(mushroomScripts.includes("/data/photo-pack-v08.js"), "grzyby manifest should reference data/photo-pack-v08.js");
assert(
  mushroomScripts.indexOf("/data/mushrooms.js") < mushroomScripts.indexOf("/data/photo-pack-v08.js"),
  "mushrooms.js must load before photo-pack-v08.js so the pack can mutate the mushroom list"
);

const context = {
  window: {},
  document: { head: { appendChild() {} }, createElement: () => ({ dataset: {} }), querySelector: () => null }
};
vm.createContext(context);

for (const source of mushroomScripts) {
  vm.runInContext(fs.readFileSync(source.replace(/^\//, ""), "utf8"), context, { filename: source });
}

const data = context.window.MUSHROOM_APP_DATA;
assert(data, "MUSHROOM_APP_DATA should be defined");

const glowingCategory = data.categories.find((category) => category.id === "swiecace-i-fluorescencyjne");
assert(glowingCategory, "glowing category should exist");
assert.equal(glowingCategory.short, "Świecące", "glowing category should have the expected short label");

const requiredGlowIds = [
  "opienka-miodowa-bioluminescencja",
  "lycznik-ochrowy-bioluminescencja"
];

for (const id of requiredGlowIds) {
  const item = data.mushrooms.find((mushroom) => mushroom.id === id);
  assert(item, `${id} should be present`);
  assert.equal(item.category, "swiecace-i-fluorescencyjne", `${id} should be in the glowing category`);
  assert.match(item.quiz_angle, /bioluminescenc|fluorescenc/i, `${id} should explain the glow angle`);
}

const specialEffectsCategory = data.categories.find((category) => category.id === "efekty-specjalne");
assert(specialEffectsCategory, "special effects category should exist");
assert.equal(specialEffectsCategory.short, "Efekty", "special effects category should have the expected short label");

const requiredSpecialEffectIds = [
  "wrosniak-roznobarwny",
  "boczniaczek-pomaranczowozolty",
  "zaslonak-fioletowy",
  "czernidlak-kolpakowaty",
  "miekusz-rabarbarowy",
  "krasnoborowik-ceglastopory",
  "lejkowiec-dety",
  "zagwiak-luskowaty"
];

for (const id of requiredSpecialEffectIds) {
  const item = data.mushrooms.find((mushroom) => mushroom.id === id);
  assert(item, `${id} should be present`);
  assert.equal(item.category, "efekty-specjalne", `${id} should be in the special effects category`);
  assert(item.region_pl && item.habitat_pl && item.occurrence_note, `${id} should include occurrence details`);
  assert(item.image && item.image_source && item.image_license, `${id} should include image credits`);
}

const missingOccurrence = data.mushrooms.filter(
  (mushroom) => !mushroom.region_pl || !mushroom.habitat_pl || !mushroom.occurrence_note
);

assert.equal(
  missingOccurrence.length,
  0,
  `every mushroom should have region_pl, habitat_pl, and occurrence_note; missing: ${missingOccurrence.map((mushroom) => mushroom.id).join(", ")}`
);

assert.equal(data.mushrooms.length, 60, "atlas should include the original 50 plus two glowing fungi plus eight special-effect fungi");
assert.equal(
  data.mushrooms.filter((mushroom) => mushroom.image).length,
  60,
  "all atlas entries should have images after the special-effect pack"
);
