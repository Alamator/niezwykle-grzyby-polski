// The link preview images (Open Graph and Twitter Card, 1200×630): one for the atlas and one for each
// collection, in Polish and in English. A collection page and each of its cards show the image of their
// collection; the start page, the map and the quiz show the atlas's (scripts/build-pages.mjs).
// scripts/generate-og-image.py draws the images from what ogImages() returns (it runs this file) and writes
// into assets/og/manifest.json what it drew and a hash of each file it saved. The build and npm run
// test:technical compare that with the data (imageProblems), so a new name, teaser, count label (count_label),
// start page heading or map point stops them until the images are drawn again.
// Photos stay out: a link preview has no room for their credits.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { pathToFileURL } from "node:url";

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_MANIFEST = "assets/og/manifest.json";
export const REDRAW = "run python scripts/generate-og-image.py";

// The Polish image of the atlas keeps the address link previews have known it by (index.html names it).
export function atlasImageFile(language) {
  return language === "pl" ? "assets/og-image.png" : `assets/og/atlas-${language}.png`;
}

export function collectionImageFile(collection, language) {
  return `assets/og/${collection.id}-${language}.png`;
}

// Words drawn only in the images; {places} is a count of places in the words of data/i18n.js.
const WORDS = {
  pl: { atlasPlaces: "{places} z atlasu", collectionPlaces: "{places} z kolekcji" },
  en: { atlasPlaces: "{places} in the atlas", collectionPlaces: "{places} in the collection" }
};
const MAP_CREDIT = "Wikidata · Natural Earth";
// A collection with fewer places than this shows its count label in large figures instead of a nearly empty map
// (Skamieniałości: 4 places for 32 cards).
export const MIN_MAP_PLACES = 5;

// A word missing from values stops the build, so no description loses a part unnoticed.
const fill = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => {
  if (values[key] === undefined) throw new Error(`no {${key}} for "${template}"`);
  return values[key];
});

// "Polska, jakiej *nie pokazują* przewodniki." as runs of plain and emphasized text, drawn in italic amber
// as on the start page (data/i18n.js heroTitle).
export function emphasisRuns(text) {
  const parts = String(text).split("*");
  if (parts.length % 2 === 0) throw new Error(`unclosed emphasis in "${text}"`);
  return parts.map((part, index) => [part, index % 2 ? "italic" : "regular"]).filter(([part]) => part);
}

// The same heading as plain words for the image's description: "Polska, jakiej nie pokazują przewodniki".
const plainHeading = (text) => String(text).replace(/\*/g, "").trim().replace(/\.$/, "");

// "60 osobliwości" as the number and the word after it.
function countParts(label, where) {
  const match = /^(\d+)\s+(\S.*)$/.exec(String(label || "").trim());
  if (!match) throw new Error(`${where}: the count label "${label}" should be a number and a word`);
  return { number: match[1], word: match[2] };
}

// Every image with what it shows. "drawn" is what generate-og-image.py draws and the manifest keeps; "alt"
// describes the image to people who cannot see it, in the language of the page.
// texts is languageTexts() of scripts/build-pages.mjs; places are the places of buildMapPoints().
export function ogImages(win, textsFor, places) {
  const app = win.ATLAS_APP_DATA;
  const point = (place) => [place.lng, place.lat];
  const images = [];
  for (const language of ["pl", "en"]) {
    const texts = textsFor(language);
    const { ui } = texts;
    const words = WORDS[language];
    images.push({
      file: atlasImageFile(language),
      language,
      alt: fill(texts.words.imageAlt, { heading: plainHeading(ui.heroTitle) }),
      drawn: {
        eyebrow: fill(ui.heroEyebrow, { collections: texts.plural(ui.collectionCountForms, app.collections.length) }).toUpperCase(),
        headline: emphasisRuns(ui.heroTitle),
        caption: `${fill(words.atlasPlaces, { places: texts.plural(ui.placeCountForms, places.length) })} · ${MAP_CREDIT}`,
        points: places.map(point)
      }
    });
    for (const collection of app.collections) {
      const own = places.filter((place) => place.cards.some((card) => card.collection === collection.id));
      const title = texts.collection(collection, "title");
      const teaser = texts.collection(collection, "teaser");
      const countLabel = texts.collection(collection, "count_label");
      const where = `${collection.id} (${language})`;
      if (!title || !teaser || !countLabel) {
        throw new Error(`${where}: a link preview image needs the collection's title, teaser and count_label (data/collections.js, and data/i18n.js in English)`);
      }
      const group = texts.group(collection);
      const withMap = own.length >= MIN_MAP_PLACES;
      const drawn = withMap
        ? {
          eyebrow: `${group} · ${countLabel}`.toUpperCase(),
          title,
          teaser,
          caption: `${fill(words.collectionPlaces, { places: texts.plural(ui.placeCountForms, own.length) })} · ${MAP_CREDIT}`,
          points: own.map(point)
        }
        : { eyebrow: group.toUpperCase(), title, teaser, count: countParts(countLabel, where) };
      images.push({
        file: collectionImageFile(collection, language),
        language,
        collection: collection.id,
        alt: fill(withMap ? texts.words.collectionMapImageAlt : texts.words.collectionImageAlt, { title, count: countLabel, teaser }),
        drawn
      });
    }
  }
  return images;
}

export function fileHash(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

// What keeps the committed images from showing what the data says now: an image or the manifest missing, an
// image drawn from other data, a file that is not the one generate-og-image.py saved, an image no page shows.
export function imageProblems(images, root = ".") {
  const manifestFile = path.join(root, OG_MANIFEST);
  if (!fs.existsSync(manifestFile)) return [`${OG_MANIFEST} is missing`];
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
  } catch {
    return [`${OG_MANIFEST} is not valid JSON (a merge conflict?)`];
  }
  const problems = [];
  for (const image of images) {
    const file = path.join(root, image.file);
    const entry = manifest[image.file];
    if (!fs.existsSync(file)) problems.push(`${image.file} is missing`);
    else if (!entry) problems.push(`${image.file} is not in ${OG_MANIFEST}`);
    else if (!isDeepStrictEqual(entry.drawn, image.drawn)) problems.push(`${image.file} shows older data (a name, teaser, count label, heading or map point)`);
    else if (entry.sha256 !== fileHash(file)) problems.push(`${image.file} is not the file generate-og-image.py saved`);
  }
  for (const file of Object.keys(manifest)) {
    if (!images.some((image) => image.file === file)) problems.push(`${OG_MANIFEST} lists ${file}, which no page shows`);
  }
  return problems;
}

// The width and height of a PNG file, from its header.
export function pngSize(file) {
  const head = fs.readFileSync(file).subarray(0, 24);
  if (head.toString("latin1", 1, 4) !== "PNG" || head.toString("latin1", 12, 16) !== "IHDR") throw new Error(`${file} is not a PNG`);
  return [head.readUInt32BE(16), head.readUInt32BE(20)];
}

// node scripts/og-images.mjs prints the images for generate-og-image.py. scripts/build-pages.mjs imports this
// file, so it is loaded only after this file has run to its end (no await at the top level).
if (process.argv[1] && import.meta.url === pathToFileURL(fs.realpathSync(process.argv[1])).href) {
  Promise.all([import("./build-pages.mjs"), import("./build-map-points.mjs"), import("./build-start-page.mjs")])
    .then(([{ languageTexts }, { buildMapPoints }, { loadAtlas }]) => {
      const win = loadAtlas();
      const images = ogImages(win, (language) => languageTexts(win, language), buildMapPoints(win).places);
      process.stdout.write(JSON.stringify({ width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, manifest: OG_MANIFEST, images: images.map(({ file, drawn }) => ({ file, drawn })) }));
    });
}
