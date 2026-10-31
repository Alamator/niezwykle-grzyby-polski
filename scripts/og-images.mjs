// The link preview images (Open Graph and Twitter Card, 1200×630): one for the atlas and one for each
// collection, in Polish and in English. A collection page and each of its cards show the image of their
// collection; the start page, the map and the quiz show the atlas's (scripts/build-pages.mjs).
// scripts/generate-og-image.py draws the images from what ogImages() returns (it runs this file) and writes
// what it drew into assets/og/manifest.json. npm run test:technical compares that with the data, so a new
// name, description, number of cards or map point shows up as images to draw again.
// Photos stay out: a link preview has no room for their credits.
import fs from "node:fs";
import { pathToFileURL } from "node:url";

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_MANIFEST = "assets/og/manifest.json";

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
      alt: texts.words.imageAlt,
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
      if (!title || !teaser || !countLabel) throw new Error(`${where}: a link preview image needs the collection's title, teaser and count label`);
      const group = texts.group(collection);
      const drawn = own.length
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
        alt: fill(own.length ? texts.words.collectionMapImageAlt : texts.words.collectionImageAlt, { title, count: countLabel, teaser }),
        drawn
      });
    }
  }
  return images;
}

// What the manifest should hold for these images: the drawn part of each, by its file.
export function manifestOf(images) {
  return Object.fromEntries(images.map((image) => [image.file, image.drawn]));
}

// The width and height of a PNG file, from its header.
export function pngSize(file) {
  const head = fs.readFileSync(file).subarray(0, 24);
  if (head.toString("latin1", 1, 4) !== "PNG" || head.toString("latin1", 12, 16) !== "IHDR") throw new Error(`${file} is not a PNG`);
  return [head.readUInt32BE(16), head.readUInt32BE(20)];
}

// node scripts/og-images.mjs prints the images for generate-og-image.py. scripts/build-pages.mjs imports this
// file, so it is loaded only after this file has run to its end (no await at the top level).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  Promise.all([import("./build-pages.mjs"), import("./build-map-points.mjs"), import("./build-start-page.mjs")])
    .then(([{ languageTexts }, { buildMapPoints }, { loadAtlas }]) => {
      const win = loadAtlas();
      const images = ogImages(win, (language) => languageTexts(win, language), buildMapPoints(win).places);
      process.stdout.write(JSON.stringify({ width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, manifest: OG_MANIFEST, images: images.map(({ file, drawn }) => ({ file, drawn })) }));
    });
}
