import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const indexHtml = fs.readFileSync("index.html", "utf8");
const scriptSources = [...indexHtml.matchAll(/<script\s+defer\s+src="([^"]+)"/g)].map((match) => match[1]);

assert(
  scriptSources.includes("./data/region-pack-v07.js"),
  "index.html should load data/region-pack-v07.js"
);
assert(
  scriptSources.indexOf("./data/region-pack-v07.js") < scriptSources.indexOf("./js/app.js"),
  "region-pack-v07.js should load before app.js"
);

const context = { window: {} };
vm.createContext(context);

for (const source of scriptSources.filter((src) => src.startsWith("./data/"))) {
  vm.runInContext(fs.readFileSync(source.replace("./", ""), "utf8"), context, {
    filename: source
  });
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

const missingOccurrence = data.mushrooms.filter(
  (mushroom) => !mushroom.region_pl || !mushroom.habitat_pl || !mushroom.occurrence_note
);

assert.equal(
  missingOccurrence.length,
  0,
  `every mushroom should have region_pl, habitat_pl, and occurrence_note; missing: ${missingOccurrence.map((mushroom) => mushroom.id).join(", ")}`
);

assert.equal(data.mushrooms.length, 52, "atlas should include the original 50 plus two glowing fungi");
assert.equal(
  data.mushrooms.filter((mushroom) => mushroom.image).length,
  52,
  "all atlas entries should have images after the glow pack"
);
