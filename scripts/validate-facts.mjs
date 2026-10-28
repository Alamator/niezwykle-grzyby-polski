// Validates the Karta 2.0 data: verified fun facts in data/facts/*.facts.js and the card fields
// that the interface reads next to them (protection / toxic badges, synonyms).
// The facts files are generated outside the repo, so this script only reads them. Cards and facts
// withdrawn after editorial review are listed in data/collections.js and must stay out of the UI.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const STATUSES = new Set(["checked", "verified", "corrected"]);
const PROTECTION = new Set(["strict", "partial"]);
const TOXIC = new Set([true, "mild"]);

const errors = [];
const warnings = [];
const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);

const collectionsJs = fs.readFileSync("data/collections.js", "utf8");
const entryBlocks = [...collectionsJs.matchAll(/id:\s*"([a-z-]+)",[\s\S]*?scripts:\s*\[([\s\S]*?)\]/g)]
  .map((match) => ({ id: match[1], scripts: [...match[2].matchAll(/"(\/data\/[^"]+)"/g)].map((m) => m[1]) }));
assert(entryBlocks.length >= 18, "collections.js should expose a scripts list for every collection");

// Each collection loads its own facts file lazily, after the collection data and photo packs.
for (const { id, scripts } of entryBlocks) {
  const factsFile = `/data/facts/${id}.facts.js`;
  const index = scripts.indexOf(factsFile);
  if (index === -1) fail(`${id}: ${factsFile} is missing from COLLECTION_BUILDERS[].scripts`);
  else if (index !== scripts.length - 1) fail(`${id}: ${factsFile} should be the last script, after the collection data files`);
  if (!fs.existsSync(factsFile.slice(1))) fail(`${id}: ${factsFile} does not exist`);
}
for (const file of fs.readdirSync("data/facts")) {
  const id = file.replace(/\.facts\.js$/, "");
  if (!entryBlocks.some((entry) => entry.id === id)) fail(`data/facts/${file} does not belong to any collection`);
}

const context = {
  window: {},
  document: { head: { appendChild() {} }, createElement: () => ({ dataset: {} }), querySelector: () => null }
};
vm.createContext(context);
const loaded = new Set();
for (const { scripts } of entryBlocks) {
  for (const source of scripts) {
    if (loaded.has(source)) continue;
    loaded.add(source);
    vm.runInContext(fs.readFileSync(source.slice(1), "utf8"), context, { filename: source });
  }
}
vm.runInContext(collectionsJs, context, { filename: "data/collections.js" });

const app = context.window.ATLAS_APP_DATA;
const allFacts = context.window.ATLAS_FACTS || {};
assert(app?.collections?.length, "ATLAS_APP_DATA should expose collections");
const withdrawn = app.withdrawn || { cards: {}, facts: {} };

const seenFactIds = new Map();
const stats = { cards: 0, facts: 0, notes: 0, statuses: {}, withdrawnCardFacts: 0 };

function markdownBalanced(text) {
  // Markdown light: **bold**, *italic* and ***both***. Every run of asterisks has to close.
  let strong = false;
  let em = false;
  for (const run of text.match(/\*+/g) || []) {
    if (run.length > 3) return false;
    if (run.length !== 1) strong = !strong;
    if (run.length !== 2) em = !em;
  }
  return !strong && !em;
}

for (const collection of app.collections) {
  const data = allFacts[collection.id];
  if (!data) {
    fail(`${collection.id}: window.ATLAS_FACTS["${collection.id}"] is not defined`);
    continue;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.checked || "")) fail(`${collection.id}: "checked" should be a YYYY-MM-DD date`);
  const cardIds = new Set(collection.items.map((item) => item.id));
  for (const cardId of Object.keys(collection.facts || {})) {
    if (!cardIds.has(cardId)) fail(`${collection.id}/${cardId}: collections.js attached facts of a card that is not in the collection`);
  }
  for (const [cardId, entry] of Object.entries(data.items || {})) {
    const where = `${collection.id}/${cardId}`;
    const isWithdrawn = Boolean(withdrawn.cards[where]);
    if (isWithdrawn) stats.withdrawnCardFacts += Array.isArray(entry.facts) ? entry.facts.length : 0;
    else if (!cardIds.has(cardId)) fail(`${where}: card id does not exist in the collection data`);
    // The interface gets the facts of existing cards only, without the withdrawn facts.
    const expected = cardIds.has(cardId) && Array.isArray(entry.facts)
      ? entry.facts.filter((fact) => !withdrawn.facts[fact?.id]).map((fact) => fact?.id)
      : null;
    const attached = collection.facts?.[cardId]?.facts?.map((fact) => fact.id) ?? null;
    if (JSON.stringify(expected) !== JSON.stringify(attached)) fail(`${where}: collections.js should attach the card's facts without the withdrawn ones`);
    if (!Array.isArray(entry.facts)) {
      fail(`${where}: "facts" should be an array`);
      continue;
    }
    if (!Array.isArray(entry.notes)) fail(`${where}: "notes" should be an array`);
    else {
      for (const note of entry.notes) if (typeof note !== "string" || !note.trim()) fail(`${where}: notes should be non-empty strings`);
      stats.notes += entry.notes.length;
    }
    if (entry.facts.length > 4) warn(`${where}: ${entry.facts.length} facts; the card shows the first 4`);
    stats.cards += 1;

    for (const fact of entry.facts) {
      const label = `${where}/${fact?.id || "?"}`;
      stats.facts += 1;
      if (!fact.id) fail(`${where}: fact without id`);
      else if (seenFactIds.has(fact.id)) fail(`${label}: duplicate fact id (also in ${seenFactIds.get(fact.id)})`);
      else seenFactIds.set(fact.id, where);

      if (typeof fact.pl !== "string" || !fact.pl.trim()) fail(`${label}: missing "pl" text`);
      if (fact.en !== undefined && typeof fact.en !== "string") fail(`${label}: "en" should be a string`);
      if (!fact.en) warn(`${label}: no "en" text, the EN view falls back to "pl"`);
      if (!STATUSES.has(fact.status)) fail(`${label}: status should be one of ${[...STATUSES].join(", ")} (got ${JSON.stringify(fact.status)})`);
      else stats.statuses[fact.status] = (stats.statuses[fact.status] || 0) + 1;
      if (typeof fact.icon !== "string") fail(`${label}: "icon" should be a string (may be empty)`);

      if (!Array.isArray(fact.sources) || fact.sources.length === 0) {
        fail(`${label}: at least one source is required`);
      } else {
        fact.sources.forEach((source, index) => {
          let url = null;
          try { url = new URL(source?.url); } catch { url = null; }
          if (!url) fail(`${label}: sources[${index}].url is not a valid URL`);
          else if (url.protocol !== "https:") {
            if (index === 0) fail(`${label}: sources[0].url must use https (${source.url})`);
            else warn(`${label}: sources[${index}].url is not https (${source.url})`);
          }
          if (!source?.label) fail(`${label}: sources[${index}] has no label`);
        });
      }

      for (const lang of ["pl", "en"]) {
        if (typeof fact[lang] === "string" && !markdownBalanced(fact[lang])) fail(`${label}: unbalanced markdown light (*) in "${lang}"`);
        if (typeof fact[lang] === "string" && /[<>]/.test(fact[lang])) fail(`${label}: "${lang}" should not contain HTML`);
      }
    }
  }
}

// Card fields added with Karta 2.0: badges and former names.
const genericStatus = [
  { pattern: /^\*\*Ochrona ścisła\b/, value: "strict" },
  { pattern: /^\*\*Ochrona częściowa\b/, value: "partial" }
];
for (const collection of app.collections) {
  for (const item of collection.items) {
    const where = `${collection.id}/${item.id}`;
    if (item.protection !== undefined && !PROTECTION.has(item.protection)) fail(`${where}: protection should be "strict" or "partial"`);
    if (item.toxic !== undefined && !TOXIC.has(item.toxic)) fail(`${where}: toxic should be true or "mild"`);
    if (item.synonyms !== undefined) {
      if (!Array.isArray(item.synonyms) || item.synonyms.some((name) => typeof name !== "string" || !name.trim())) {
        fail(`${where}: synonyms should be an array of non-empty strings`);
      } else if (item.synonyms.some((name) => name.toLocaleLowerCase("pl") === item.name_pl.toLocaleLowerCase("pl"))) {
        fail(`${where}: synonyms should not repeat the current Polish name`);
      }
    }
    // A protection badge must agree with the verified legal-status facts of the card.
    for (const fact of collection.facts?.[item.id]?.facts || []) {
      const match = genericStatus.find(({ pattern }) => pattern.test(fact.pl.trim()));
      if (match && item.protection !== match.value) {
        fail(`${where}: fact ${fact.id} states protection "${match.value}", card field is ${JSON.stringify(item.protection)}`);
      }
    }
  }
}

// The withdrawn registry has to stay in sync with the data: withdrawn cards are gone from the
// collections, withdrawn facts still exist in the generated files (a stale entry is a warning).
for (const key of Object.keys(withdrawn.cards)) {
  const [collectionId, cardId] = key.split("/");
  const collection = app.collections.find((entry) => entry.id === collectionId);
  if (!collection) fail(`withdrawn card ${key}: unknown collection`);
  else if (collection.items.some((item) => item.id === cardId)) fail(`withdrawn card ${key} still exists in the collection data`);
}
for (const id of Object.keys(withdrawn.facts)) {
  if (!seenFactIds.has(id)) warn(`withdrawn fact ${id} no longer exists in data/facts`);
}

for (const message of warnings) console.warn(`warning: ${message}`);
if (errors.length) {
  for (const message of errors) console.error(`error: ${message}`);
  console.error(`\nvalidate-facts: ${errors.length} error(s)`);
  process.exit(1);
}
const statusSummary = Object.entries(stats.statuses).map(([status, count]) => `${status} ${count}`).join(", ");
const withdrawnSummary = `withdrawn: ${Object.keys(withdrawn.cards).length} cards (${stats.withdrawnCardFacts} of their facts) and ${Object.keys(withdrawn.facts).length} facts`;
console.log(`validate-facts: ${stats.facts} facts on ${stats.cards} cards (${statusSummary}), ${stats.notes} notes; ${withdrawnSummary}; ${warnings.length} warning(s)`);
