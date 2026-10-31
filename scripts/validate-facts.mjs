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
assert(entryBlocks.length >= 19, "collections.js should expose a scripts list for every collection");

// Collections whose facts the generator has not made yet. They open without facts and have no facts
// file in their scripts. When the file comes, it goes last in the scripts and the id leaves this list.
const FACTS_PENDING = new Set(["rekordy-atmosferyczne"]);

// Each collection loads its own facts file lazily, after the collection data and photo packs.
for (const { id, scripts } of entryBlocks) {
  const factsFile = `/data/facts/${id}.facts.js`;
  const index = scripts.indexOf(factsFile);
  if (FACTS_PENDING.has(id)) {
    if (index !== -1 || fs.existsSync(factsFile.slice(1))) fail(`${id}: its facts file is here; take it off FACTS_PENDING`);
    continue;
  }
  if (index === -1) fail(`${id}: ${factsFile} is missing from COLLECTION_BUILDERS[].scripts`);
  else if (index !== scripts.length - 1) fail(`${id}: ${factsFile} should be the last script, after the collection data files`);
  if (!fs.existsSync(factsFile.slice(1))) fail(`${id}: ${factsFile} does not exist`);
}
const appJsText = fs.readFileSync("js/app.js", "utf8");
if (!appJsText.includes("const withFacts = app.collections.filter((collection) => collection.has_facts);")
  || !appJsText.includes("const collection = withFacts[dayNumber % withFacts.length];")) {
  fail("js/app.js: the fact of the day should take only collections with facts (has_facts)");
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
const withdrawn = { cards: {}, facts: {}, numbers: [], ...app.withdrawn };
const hiddenFacts = new Set([...Object.keys(withdrawn.facts), ...withdrawn.numbers]);

const seenFactIds = new Map();
const factTexts = new Map();
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
  // The fact of the day takes only collections that have facts (js/app.js, loadDailyFact).
  if (collection.has_facts !== !FACTS_PENDING.has(collection.id)) fail(`${collection.id}: has_facts should say whether the collection has its facts file`);
  if (FACTS_PENDING.has(collection.id)) continue;
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
    // The interface gets the facts of existing cards only, without the hidden facts.
    const expected = cardIds.has(cardId) && Array.isArray(entry.facts)
      ? entry.facts.filter((fact) => !hiddenFacts.has(fact?.id)).map((fact) => fact?.id)
      : null;
    const attached = collection.facts?.[cardId]?.facts?.map((fact) => fact.id) ?? null;
    if (JSON.stringify(expected) !== JSON.stringify(attached)) fail(`${where}: collections.js should attach the card's facts without the hidden ones`);
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
      else {
        seenFactIds.set(fact.id, where);
        factTexts.set(fact.id, fact.pl);
      }

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
if (!Array.isArray(withdrawn.numbers)) fail("WITHDRAWN.numbers should be an array of fact ids");
for (const id of new Set(withdrawn.numbers)) {
  if (withdrawn.numbers.indexOf(id) !== withdrawn.numbers.lastIndexOf(id)) fail(`WITHDRAWN.numbers lists ${id} twice`);
  if (withdrawn.facts[id]) fail(`${id} is both in WITHDRAWN.facts and WITHDRAWN.numbers`);
  if (!seenFactIds.has(id)) warn(`hidden fact ${id} (numbers check) no longer exists in data/facts`);
}

// The generator handoff lists every hidden fact with its reason and, where possible, the corrected
// wording. A hidden fact that already has the corrected wording can be shown again.
const HANDOFF = "docs/content/zmiany-dla-generatora-2026-10.json";
const handoff = JSON.parse(fs.readFileSync(HANDOFF, "utf8"));
const handoffEntries = new Map([...handoff.skip_facts, ...handoff.replace_facts].map((entry) => [entry.id, entry]));
const handoffCards = new Set(handoff.skip_cards.map((entry) => `${entry.collection}/${entry.card}`));
for (const key of Object.keys(withdrawn.cards)) {
  if (!handoffCards.has(key)) fail(`withdrawn card ${key} is missing from skip_cards in ${HANDOFF}`);
}
for (const id of hiddenFacts) {
  if (!handoffEntries.has(id)) fail(`hidden fact ${id} is missing from skip_facts/replace_facts in ${HANDOFF}`);
}
for (const [id, entry] of handoffEntries) {
  if (!seenFactIds.has(id)) continue;
  const updated = entry.pl_old !== undefined && factTexts.get(id) === entry.pl;
  if (updated && hiddenFacts.has(id)) warn(`${id} already has the corrected wording from ${HANDOFF}; remove it from WITHDRAWN to show it again`);
  if (!updated && !hiddenFacts.has(id)) fail(`${id} is listed in ${HANDOFF} but data/collections.js does not hide it`);
}
const numbersCheck = handoff.number_check || {};
for (const entry of handoff.confirm_facts) {
  if (!seenFactIds.has(entry.id)) warn(`confirmed fact ${entry.id} from ${HANDOFF} no longer exists in data/facts`);
  if (hiddenFacts.has(entry.id)) fail(`${entry.id} is confirmed in ${HANDOFF} but hidden in data/collections.js`);
}
// A collection waiting for its facts is in the handoff with exactly its cards, and its checked facts
// belong to those cards, so the generator writes facts for the cards the atlas has.
for (const id of FACTS_PENDING) {
  const collection = app.collections.find((entry) => entry.id === id);
  const entry = (handoff.new_collections || []).find((candidate) => candidate.collection === id);
  if (!entry) {
    fail(`${id} waits for its facts but has no new_collections entry in ${HANDOFF}`);
    continue;
  }
  const cards = (collection?.items || []).map((item) => item.id);
  if (JSON.stringify([...entry.cards].sort()) !== JSON.stringify([...cards].sort())) fail(`${HANDOFF}: new_collections should list exactly the cards of ${id}`);
  for (const fact of (handoff.new_facts || []).filter((candidate) => candidate.collection === id)) {
    if (!cards.includes(fact.card)) fail(`${HANDOFF}: a new fact of ${id} belongs to ${fact.card}, which is not a card of the collection`);
    if (!STATUSES.has(fact.status) || !fact.pl || !fact.en || !fact.sources?.length) fail(`${HANDOFF}: a new fact of ${id}/${fact.card} needs pl, en, a status and sources`);
    // The owner's rule (31.10.2026): neither record is called official (IMGW-PIB: Siedlce 1940).
    if (["zywiec-1929", "slubice-40-5"].includes(fact.card) && /oficjaln|official/i.test(`${fact.pl} ${fact.en}`)) fail(`${HANDOFF}: a new fact of ${id}/${fact.card} calls the record official`);
  }
}
// Once the generated file is here, the facts of a new collection are the checked ones from the handoff.
for (const entry of handoff.new_collections || []) {
  if (FACTS_PENDING.has(entry.collection)) continue;
  const checked = new Set((handoff.new_facts || []).filter((fact) => fact.collection === entry.collection).map((fact) => `${fact.card}\n${fact.pl}`));
  for (const [cardId, item] of Object.entries(allFacts[entry.collection]?.items || {})) {
    for (const fact of item.facts || []) {
      if (!checked.has(`${cardId}\n${fact.pl}`)) fail(`${entry.collection}/${cardId}/${fact.id}: not one of the checked new_facts in ${HANDOFF}`);
    }
  }
}

for (const message of warnings) console.warn(`warning: ${message}`);
if (errors.length) {
  for (const message of errors) console.error(`error: ${message}`);
  console.error(`\nvalidate-facts: ${errors.length} error(s)`);
  process.exit(1);
}
const statusSummary = Object.entries(stats.statuses).map(([status, count]) => `${status} ${count}`).join(", ");
const withdrawnSummary = `withdrawn: ${Object.keys(withdrawn.cards).length} cards (${stats.withdrawnCardFacts} of their facts) and ${Object.keys(withdrawn.facts).length} facts`;
const numbersSummary = `numbers check: ${numbersCheck.checked} of ${numbersCheck.to_check} checked, ${withdrawn.numbers.length} hidden`;
console.log(`validate-facts: ${stats.facts} facts on ${stats.cards} cards (${statusSummary}), ${stats.notes} notes; ${withdrawnSummary}; ${numbersSummary}; ${warnings.length} warning(s)`);
