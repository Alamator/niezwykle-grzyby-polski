// Builds a page for every collection and every card, and sitemap.xml, on each deployment: npm run build,
// which Vercel runs (vercel.json). Each page is index.html with its own title, description, canonical
// address and link preview, already opened on its collection, so search engines and link previews see
// the collection or card itself. In the browser the app takes over as on any other address.
// It also writes mapa.html, the map of every place, quiz.html, the quiz of the whole atlas, and 404.html,
// which Vercel shows for an address that leads nowhere. Every page has an English twin at the same address
// under /en (en.html is the English start page). The output (atlas/, en/, en.html, mapa.html, quiz.html,
// sitemap.xml and 404.html) is not committed; see .gitignore.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { buildMapPoints } from "./build-map-points.mjs";
import { buildStartPage, loadAtlas } from "./build-start-page.mjs";

const SITE_NAME = "Atlas Osobliwości Polski";
export const MAP_ROUTE = "/mapa";
export const QUIZ_ROUTE = "/quiz";
// English pages have the same addresses under /en, as js/app.js gives them (addressFor).
export const ENGLISH_PREFIX = "/en";
export const LANGUAGES = ["pl", "en"];
// Questions in the daily challenge and in the random quiz (DAILY_QUESTIONS and MIX_QUESTIONS in js/app.js).
const DAILY_QUESTIONS = 5;
const MIX_QUESTIONS = 10;
// Words only the built pages use: for readers without scripts, and the description of the link preview image.
const STATIC_WORDS = {
  pl: { allCards: "wszystkie karty", quizNeedsScripts: "Quiz działa w przeglądarce z włączonym JavaScriptem. Karty, z których powstają pytania, są w kolekcjach:" },
  en: {
    allCards: "all cards",
    quizNeedsScripts: "The quiz works in a browser with JavaScript turned on. The cards its questions come from are in these collections:",
    imageAlt: "Atlas of Polish Curiosities: the Polish heading “Polska, jakiej nie pokazują przewodniki” (The Poland guidebooks leave out) and a map of Poland drawn with the places of the atlas"
  }
};

const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;"
})[char]);

const sentence = (text) => (/[.!?…]$/.test(String(text).trim()) ? String(text).trim() : `${String(text).trim()}.`);
const fill = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");

// Card addresses use the card id without Polish letters, as js/app.js does (cardSlug).
export function cardSlug(id) {
  return String(id).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l").replace(/Ł/g, "L");
}

export function routeForCollection(collection) {
  return collection.route || `/atlas/${collection.id}`;
}

export function cardRoute(collection, item) {
  return `${routeForCollection(collection)}/${cardSlug(item.id)}`;
}

// A route at the address of a language: "/" is "/en" in English, "/mapa" is "/en/mapa".
export function addressFor(route, language) {
  if (language !== "en") return route;
  const [path, hash] = route.split("#");
  return `${path === "/" ? ENGLISH_PREFIX : `${ENGLISH_PREFIX}${path}`}${hash ? `#${hash}` : ""}`;
}

// What the pages of a language say: the interface texts of data/i18n.js, the site's name, and collections
// and cards in that language, as js/app.js picks them (collectionText, groupText, itemName, itemHook).
export function languageTexts(win, language) {
  const app = win.ATLAS_APP_DATA;
  const i18n = win.ATLAS_I18N;
  const translated = (collection) => (language === "en" && i18n.collections?.en?.[collection.id]) || {};
  const card = (collection, item) => translated(collection).items?.[item.id] || {};
  return {
    language,
    ui: i18n.ui[language],
    words: STATIC_WORDS[language],
    site: language === "en" ? i18n.ui.en.documentTitle : SITE_NAME,
    collection: (collection, field) => translated(collection)[field] || collection[field] || "",
    group: (collection) => (language === "en" && i18n.groups?.en?.[collection.group]?.label) ||
      (app.groups || []).find((entry) => entry.id === collection.group)?.label || "",
    name: (collection, item) => card(collection, item).name || item.name_pl,
    hook: (collection, item) => card(collection, item).hook || item.hook,
    latin: (collection, item) => card(collection, item).latin || item.name_lat || "",
    region: (collection, item) => (language === "en" ? card(collection, item).region : item.region_pl) || "",
    plural: (forms, count) => (forms[new Intl.PluralRules(language).select(count)] ?? forms.other).replace("{count}", count),
    address: (route) => addressFor(route, language)
  };
}

// Every change must hit exactly one place in index.html, so a changed page fails the build instead of
// shipping a page with the start-page title.
function replaceOnce(html, pattern, replacement, what) {
  const matches = typeof pattern === "string" ? html.split(pattern).length - 1 : (html.match(new RegExp(pattern, "g")) || []).length;
  if (matches !== 1) throw new Error(`index.html: expected one ${what}, found ${matches}`);
  return html.replace(pattern, typeof replacement === "function" ? replacement : () => replacement);
}

function setMeta(html, attribute, name, value) {
  return replaceOnce(html, new RegExp(`<meta ${attribute}="${name}" content="[^"]*" />`), `<meta ${attribute}="${name}" content="${escapeHtml(value)}" />`, `${name} meta tag`);
}

export function canonicalOrigin(indexHtml) {
  const href = indexHtml.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!href) throw new Error("index.html: no canonical link");
  return new URL(href).origin;
}

// Title, description, canonical address and link preview of a page, and the same page in the other
// language for search engines (Polish is the default).
function headHtml(indexHtml, origin, page, texts) {
  let html = indexHtml;
  const url = `${origin}${texts.address(page.route)}`;
  html = replaceOnce(html, `<title>${SITE_NAME}</title>`, `<title>${escapeHtml(page.title)}</title>`, "title");
  html = setMeta(html, "name", "description", page.description);
  html = replaceOnce(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${escapeHtml(url)}" />`, "canonical link");
  for (const [hreflang, language] of [["pl", "pl"], ["en", "en"], ["x-default", "pl"]]) {
    html = replaceOnce(html, new RegExp(`<link rel="alternate" hreflang="${hreflang}" href="[^"]*" />`),
      `<link rel="alternate" hreflang="${hreflang}" href="${escapeHtml(`${origin}${addressFor(page.route, language)}`)}" />`, `${hreflang} alternate link`);
  }
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", page.shareTitle);
  html = setMeta(html, "property", "og:description", page.share || page.description);
  html = setMeta(html, "name", "twitter:title", page.shareTitle);
  html = setMeta(html, "name", "twitter:description", page.share || page.description);
  if (page.content !== "#startPage") {
    // Opened on its own page, as the app shows it, so the start page does not flash first; "Przejdź do
    // treści" leads to that page.
    html = replaceOnce(html, '<a id="skipLink" class="skip-link" href="#startPage"', `<a id="skipLink" class="skip-link" href="${page.content}"`, "skip link");
    html = replaceOnce(html, '<div id="startPage" class="start-page" tabindex="-1">', '<div id="startPage" class="start-page is-hidden" tabindex="-1">', "start page");
  }
  return texts.language === "en" ? englishHtml(html, texts) : html;
}

// The same as markdownLight in js/app.js: *emphasis*, **strong** and ***both*** in a text of data/i18n.js.
export function markdownLight(value) {
  const open = [];
  let html = "";
  const closeTag = (tag) => {
    const index = open.lastIndexOf(tag);
    const above = open.splice(index + 1);
    open.pop();
    for (const inner of [...above].reverse()) html += `</${inner}>`;
    html += `</${tag}>`;
    for (const inner of above) {
      html += `<${inner}>`;
      open.push(inner);
    }
  };
  for (const part of escapeHtml(value).split(/(\*{1,3})/)) {
    if (!/^\*+$/.test(part)) {
      html += part;
      continue;
    }
    const tags = part.length === 3 ? ["strong", "em"] : part.length === 2 ? ["strong"] : ["em"];
    const toClose = tags
      .filter((tag) => open.includes(tag))
      .sort((a, b) => open.lastIndexOf(b) - open.lastIndexOf(a));
    toClose.forEach(closeTag);
    for (const tag of tags) {
      if (toClose.includes(tag)) continue;
      open.push(tag);
      html += `<${tag}>`;
    }
  }
  for (const tag of [...open].reverse()) html += `</${tag}>`;
  return html;
}

// Replaces every match and fails unless there were as many as expected.
function replaceEach(html, pattern, replacement, expected, what) {
  let count = 0;
  const out = html.replace(pattern, (...match) => {
    count += 1;
    return replacement(...match);
  });
  if (count !== expected) throw new Error(`index.html: expected ${expected} ${what}, replaced ${count}`);
  return out;
}

// An English page reads English before the app runs: its language, the page's own links, the language
// switch, and every text the app writes by its key in data/i18n.js (data-i18n in index.html, renderChrome
// in js/app.js). Texts that follow the reader's state are written as a first visit sees them.
function englishHtml(html, texts) {
  const { ui } = texts;
  const keys = (attribute) => [...html.matchAll(new RegExp(`\\s${attribute}="(\\w+)"`, "g"))].map((match) => match[1]);
  for (const key of [...keys("data-i18n"), ...keys("data-i18n-html"), ...keys("data-i18n-label"), ...keys("data-i18n-placeholder")]) {
    if (typeof ui[key] !== "string") throw new Error(`data/i18n.js: no English text for ${key}`);
  }
  html = replaceOnce(html, '<html lang="pl">', '<html lang="en">', "page language");
  html = setMeta(html, "property", "og:locale", "en_US");
  html = setMeta(html, "property", "og:site_name", texts.site);
  html = setMeta(html, "property", "og:image:alt", texts.words.imageAlt);
  html = setMeta(html, "name", "twitter:image:alt", texts.words.imageAlt);
  // The links renderChrome in js/app.js points to the pages of the reader's language.
  for (const [id, route] of [["wordmark", "/"], ["drawerLink", "/#myDrawer"], ["mapLink", MAP_ROUTE], ["mapAllLink", MAP_ROUTE],
    ["dailyQuizCardLink", QUIZ_ROUTE], ["atlasQuizLink", QUIZ_ROUTE]]) {
    html = replaceOnce(html, new RegExp(`(<a id="${id}"[^>]*? href=")${route}"`), (_, start) => `${start}${texts.address(route)}"`, `${id} link`);
  }
  html = replaceOnce(html, '<button class="language-btn is-active" data-action="set-language" data-language="pl" type="button">',
    '<button class="language-btn" data-action="set-language" data-language="pl" type="button">', "Polish switch");
  html = replaceOnce(html, '<button class="language-btn" data-action="set-language" data-language="en" type="button">',
    '<button class="language-btn is-active" data-action="set-language" data-language="en" type="button">', "English switch");
  html = replaceEach(html, /(<(\w+)\b[^>]*\sdata-i18n="(\w+)"[^>]*>)[^<]*(<\/\2>)/g,
    (_, open, tag, key, close) => `${open}${escapeHtml(ui[key])}${close}`, keys("data-i18n").length, "texts with data-i18n");
  html = replaceEach(html, /(<(\w+)\b[^>]*\sdata-i18n-html="(\w+)"[^>]*>)[\s\S]*?(<\/\2>)/g,
    (_, open, tag, key, close) => `${open}${markdownLight(ui[key])}${close}`, keys("data-i18n-html").length, "texts with data-i18n-html");
  html = replaceEach(html, /<\w+\b[^>]*\sdata-i18n-label="(\w+)"[^>]*>/g,
    (tag, key) => tag.replace(/ aria-label="[^"]*"/, ` aria-label="${escapeHtml(ui[key])}"`), keys("data-i18n-label").length, "names with data-i18n-label");
  html = replaceEach(html, /<\w+\b[^>]*\sdata-i18n-placeholder="(\w+)"[^>]*>/g,
    (tag, key) => tag.replace(/ placeholder="[^"]*"/, ` placeholder="${escapeHtml(ui[key])}"`), keys("data-i18n-placeholder").length, "hints with data-i18n-placeholder");
  html = replaceOnce(html, /<p class="daily-fact__loading">[^<]*<\/p>/, `<p class="daily-fact__loading">${escapeHtml(ui.dailyFactLoading)}</p>`, "fact of the day loading");
  html = replaceOnce(html, /(<ul id="sourceChecklist">)[\s\S]*?(<\/ul>)/, (_, open, close) => `${open}${ui.sourceChecklistItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}${close}`, "source checklist");
  const questions = (count) => texts.plural(ui.questionCountForms, count);
  const noCards = texts.plural(ui.cardCountForms, 0);
  html = replaceOnce(html, /(<a id="drawerLink"[^>]*? aria-label=")[^"]*("[^>]*>)[^<]*(<\/a>)/, (_, start, end, close) => `${start}${escapeHtml(fill(ui.drawerLinkLabel, { cards: noCards }))}${end}${escapeHtml(ui.drawerLinkText)}${close}`, "drawer link");
  html = replaceOnce(html, /(<input id="searchInput"[^>]*? placeholder=")[^"]*"/, (_, start) => `${start}${escapeHtml(ui.searchFallback)}"`, "search hint");
  html = replaceOnce(html, /(<div id="placeMap"[^>]*? aria-label=")[^"]*"/, (_, start) => `${start}${escapeHtml(ui.mapCanvas)}"`, "collection map name");
  // Without a collection the app leaves the heading and notes of the collection view as they are; here they
  // wait empty.
  html = replaceOnce(html, /<h2 id="atlas-title">[^<]*<\/h2>/, '<h2 id="atlas-title"></h2>', "atlas title");
  html = replaceOnce(html, /<span id="safetyNotice">[^<]*<\/span>/, '<span id="safetyNotice"></span>', "safety notice");
  html = replaceOnce(html, /<p class="section-note" id="sourceNote">[^<]*<\/p>/, '<p class="section-note" id="sourceNote"></p>', "source note");
  for (const [id, text] of [
    ["collectionEyebrow", ui.activeCollection],
    ["allMapEyebrow", ui.allMapDocumentTitle],
    ["myDrawerEyebrow", fill(ui.myDrawerEyebrow, { cards: noCards })],
    ["myDrawerMore", fill(ui.myDrawerShowAll, { cards: noCards })],
    ["heroEyebrow", fill(ui.heroEyebrow, { collections: texts.plural(ui.collectionCountForms, texts.collections) })],
    ["dailyQuizCardText", fill(ui.startDailyQuizText, { questions: questions(DAILY_QUESTIONS) })],
    ["dailyQuizCardLink", ui.atlasQuizPlay],
    ["dailyModeEyebrow", ui.dailyQuizName],
    ["dailyModeTitle", fill(ui.dailyQuizTitle, { questions: questions(DAILY_QUESTIONS) })],
    ["dailyModeText", ui.dailyQuizIntro],
    ["dailyModeButton", ui.atlasQuizPlay],
    ["mixModeTitle", fill(ui.mixQuizTitle, { questions: questions(MIX_QUESTIONS) })]
  ]) {
    html = replaceOnce(html, new RegExp(`(<(\\w+)\\b[^>]*? id="${id}"[^>]*>)[^<]*(</\\2>)`), (_, open, tag, close) => `${open}${escapeHtml(text)}${close}`, `${id} text`);
  }
  return html;
}

function pageHtml(indexHtml, origin, page, texts) {
  let html = headHtml(indexHtml, origin, page, texts);
  html = replaceOnce(html, '<div id="main" class="app-main is-hidden" tabindex="-1">', '<div id="main" class="app-main" tabindex="-1">', "collection view");
  html = replaceOnce(html, '<nav id="appNav" class="app-nav is-hidden"', '<nav id="appNav" class="app-nav"', "navigation");
  if (page.hasMap) {
    html = replaceOnce(html, '<button class="nav-btn is-hidden" data-view="map" type="button"', '<button class="nav-btn" data-view="map" type="button"', "map tab");
  }
  html = replaceOnce(html, /<p class="eyebrow" id="collectionEyebrow">[^<]*<\/p>/, `<p class="eyebrow" id="collectionEyebrow">${escapeHtml(page.group)}</p>`, "collection eyebrow");
  html = replaceOnce(html, '<h1 id="collectionTitle">Atlas</h1>', `<h1 id="collectionTitle">${escapeHtml(page.heading)}</h1>`, "collection title");
  html = replaceOnce(html, '<p id="collectionLead" class="collection-bar__lead"></p>', `<p id="collectionLead" class="collection-bar__lead">${escapeHtml(page.lead)}</p>`, "collection lead");
  html = replaceOnce(html, '<div id="collectionPhoto" class="collection-bar__photo"></div>', page.photo, "collection photo");
  html = replaceOnce(html, /<h2 id="atlas-title">[^<]*<\/h2>/, `<h2 id="atlas-title">${escapeHtml(page.atlasTitle)}</h2>`, "atlas title");
  html = replaceOnce(html, /<p class="section-note" id="sourceNote">[^<]*<\/p>/, `<p class="section-note" id="sourceNote">${escapeHtml(page.sourceNote)}</p>`, "source note");
  // The app keeps this text while the collection's data loads (updateActiveCollectionLabels in js/app.js).
  html = replaceOnce(html, /<span id="safetyNotice">[^<]*<\/span>/, `<span id="safetyNotice" data-collection="${escapeHtml(page.collectionId)}">${escapeHtml(page.safety)}</span>`, "safety notice");
  html = replaceOnce(html, /(<input id="searchInput"[^>]*? placeholder=")[^"]*"/, (_, start) => `${start}${escapeHtml(page.searchHint)}"`, "search hint");
  // The text of the page for readers and crawlers that do not run scripts.
  html = replaceOnce(html, '<div class="app-main__body shell">', `<div class="app-main__body shell">\n        <noscript>${page.noscript}</noscript>`, "main body");
  return html;
}

// The photo at the top of a collection, as js/app.js draws it (renderCollectionPhoto), marked with the
// collection and language so the app keeps it. It is the largest thing on the first screen, and here the
// browser fetches it while reading the page instead of after the app and the collection data.
// npm run test:technical checks that the two copies match.
function collectionPhotoHtml(collection, cover, texts) {
  const src = (width) => `${cover.photo.image}?width=${width}`;
  const credit = fill(texts.ui.photoCreditPrefix, { name: cover.name[texts.language] || cover.name.pl });
  return `<div id="collectionPhoto" class="collection-bar__photo" data-collection="${escapeHtml(collection.id)}" data-language="${texts.language}">\n` +
    `          <picture><source media="(max-width: 620px)" srcset="${escapeHtml(src(500))}" /><img src="${escapeHtml(src(960))}" alt="" decoding="async" fetchpriority="high" onerror="this.remove()" /></picture>\n` +
    `          <a class="photo-credit collection-bar__credit" href="${escapeHtml(cover.photo.source)}" target="_blank" rel="noopener noreferrer"><span class="visually-hidden">${escapeHtml(credit)}</span>${escapeHtml(`${cover.photo.author} · ${cover.photo.license}`)}</a>\n` +
    "        </div>";
}

export function buildPages(win, indexHtml) {
  const origin = canonicalOrigin(indexHtml);
  const pages = [];
  for (const language of LANGUAGES) {
    const texts = { ...languageTexts(win, language), collections: win.ATLAS_APP_DATA.collections.length };
    if (language !== "pl") pages.push(startPage(win, indexHtml, origin, texts));
    pages.push(mapPage(win, indexHtml, origin, texts), quizPage(win, indexHtml, origin, texts), ...collectionPages(win, indexHtml, origin, texts));
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    ["/", ...pages.map((page) => page.route)].map((route) => `  <url><loc>${escapeHtml(`${origin}${route}`)}</loc></url>`).join("\n") +
    "\n</urlset>\n";
  return { pages, sitemap };
}

// A built page: its file, its address and its HTML.
const built = (page, texts, html) => {
  const route = texts.address(page.route);
  return { file: `${route.slice(1)}.html`, route, html };
};

// The start page in another language. The Polish one is index.html itself.
function startPage(win, indexHtml, origin, texts) {
  const { ui } = texts;
  const page = { route: "/", content: "#startPage", title: texts.site, shareTitle: texts.site, description: ui.metaStartDescription, share: ui.metaStartShare };
  return built(page, texts, headHtml(indexHtml, origin, page, texts));
}

// Every collection and every card, opened on their collection.
function collectionPages(win, indexHtml, origin, texts) {
  const app = win.ATLAS_APP_DATA;
  const { ui, words } = texts;
  const { covers } = buildStartPage(win);
  const pages = [];
  for (const collection of app.collections) {
    const route = routeForCollection(collection);
    const title = texts.collection(collection, "title");
    const base = {
      content: "#main",
      collectionId: collection.id,
      group: texts.group(collection),
      heading: texts.collection(collection, "heading") || title,
      lead: texts.collection(collection, "subtitle"),
      photo: collectionPhotoHtml(collection, covers[collection.id], texts),
      safety: texts.collection(collection, "safety_notice"),
      // As the app writes them (renderStats and updateActiveCollectionLabels in js/app.js).
      atlasTitle: `${texts.collection(collection, "count_label")} - ${title}`,
      sourceNote: texts.collection(collection, "source_note"),
      searchHint: texts.collection(collection, "search_placeholder") || ui.searchFallback,
      hasMap: Object.keys(collection.places || {}).length > 0
    };
    const slugs = new Set();
    for (const item of collection.items) {
      const slug = cardSlug(item.id);
      if (!/^[a-z0-9-]+$/.test(slug)) throw new Error(`${collection.id}/${item.id}: the card address "${slug}" needs plain letters`);
      if (slugs.has(slug)) throw new Error(`${collection.id}: two cards share the address ${slug}`);
      slugs.add(slug);
    }
    const page = {
      ...base,
      route,
      title: `${title} – ${texts.site}`,
      shareTitle: base.heading,
      description: base.lead,
      noscript: `<ul class="static-list">${collection.items.map((item) => `<li><a href="${escapeHtml(texts.address(cardRoute(collection, item)))}">${escapeHtml(texts.name(collection, item))}</a>: ${escapeHtml(texts.hook(collection, item))}</li>`).join("")}</ul>`
    };
    pages.push(built(page, texts, pageHtml(indexHtml, origin, page, texts)));
    for (const item of collection.items) {
      const name = texts.name(collection, item);
      const region = texts.region(collection, item);
      const card = {
        ...base,
        route: cardRoute(collection, item),
        title: `${name} – ${title} – ${texts.site}`,
        shareTitle: name,
        description: fill(ui.metaCardDescription, { hook: sentence(texts.hook(collection, item)), collection: title }),
        noscript: `<article class="static-card"><p class="eyebrow">${escapeHtml(title)}</p><h2>${escapeHtml(name)}</h2>` +
          `<p class="latin">${escapeHtml(texts.latin(collection, item))}</p><p>${escapeHtml(texts.hook(collection, item))}</p>` +
          (region ? `<p><strong>Region:</strong> ${escapeHtml(region)}</p>` : "") +
          `<p><a href="${escapeHtml(texts.address(route))}">${escapeHtml(title)}: ${words.allCards}</a></p></article>`
      };
      pages.push(built(card, texts, pageHtml(indexHtml, origin, card, texts)));
    }
  }
  return pages;
}

// The map of every place, opened on the map page, with the places by collection for readers and
// crawlers that do not run scripts.
function mapPage(win, indexHtml, origin, texts) {
  const { ui } = texts;
  const { places } = buildMapPoints(win);
  const count = texts.plural(ui.placeCountForms, places.length);
  const page = {
    route: MAP_ROUTE,
    content: "#mapPage",
    title: `${ui.allMapDocumentTitle} – ${texts.site}`,
    shareTitle: ui.metaMapTitle,
    description: fill(ui.metaMapDescription, { places: count })
  };
  const collections = win.ATLAS_APP_DATA.collections.filter((collection) => places.some((place) => place.cards.some((card) => card.collection === collection.id)));
  const name = (card) => card.name[texts.language] || card.name.pl;
  const noscript = collections.map((collection) => {
    const cards = places.flatMap((place) => place.cards.filter((card) => card.collection === collection.id))
      .sort((a, b) => name(a).localeCompare(name(b), texts.language));
    return `<h2>${escapeHtml(texts.collection(collection, "title"))}</h2><ul class="static-list">${cards.map((card) =>
      `<li><a href="${escapeHtml(texts.address(cardRoute(collection, card)))}">${escapeHtml(name(card))}</a></li>`).join("")}</ul>`;
  }).join("");
  let html = headHtml(indexHtml, origin, page, texts);
  html = replaceOnce(html, /<a id="mapLink" class="topbar__link" href="[^"]*"/, (tag) => `${tag} aria-current="page"`, "map link");
  html = replaceOnce(html, '<div id="mapPage" class="map-page is-hidden" tabindex="-1">', '<div id="mapPage" class="map-page" tabindex="-1">', "map page");
  html = replaceOnce(html, /<p id="allMapEyebrow" class="eyebrow">[^<]*<\/p>/, `<p id="allMapEyebrow" class="eyebrow">${escapeHtml(fill(ui.allMapEyebrow, { places: count }))}</p>`, "map page eyebrow");
  html = replaceOnce(html, '<div id="allPlaceList" class="source-panel place-list"></div>', `<div id="allPlaceList" class="source-panel place-list"><noscript>${noscript}</noscript></div>`, "map page list");
  return built(page, texts, html);
}

// The quiz of the whole atlas, opened on its page. A quiz needs scripts, so without them the page says so
// and leads to the collections.
function quizPage(win, indexHtml, origin, texts) {
  const { ui } = texts;
  const page = {
    route: QUIZ_ROUTE,
    content: "#quizPage",
    title: `${ui.atlasQuizDocumentTitle} – ${texts.site}`,
    shareTitle: ui.metaQuizTitle,
    description: ui.metaQuizDescription
  };
  const collections = win.ATLAS_APP_DATA.collections.map((collection) =>
    `<li><a href="${escapeHtml(texts.address(routeForCollection(collection)))}">${escapeHtml(texts.collection(collection, "title"))}</a></li>`).join("");
  let html = headHtml(indexHtml, origin, page, texts);
  html = replaceOnce(html, '<div id="quizPage" class="quiz-page is-hidden" tabindex="-1">', '<div id="quizPage" class="quiz-page" tabindex="-1">', "quiz page");
  html = replaceOnce(html, '<div id="atlasQuizBox" class="quiz-box atlas-quiz"></div>',
    `<div id="atlasQuizBox" class="quiz-box atlas-quiz"><noscript><p>${texts.words.quizNeedsScripts}</p><ul class="static-list">${collections}</ul></noscript></div>`, "quiz box");
  return built(page, texts, html);
}

// The page for an address that leads nowhere: no scripts, a way home and every collection.
export function notFoundHtml(win) {
  const collections = win.ATLAS_APP_DATA.collections;
  const drawers = collections.map((collection) =>
    `<li><a href="${escapeHtml(routeForCollection(collection))}">${escapeHtml(collection.title)}</a> <span>${escapeHtml(collection.count_label || "")}</span></li>`).join("\n          ");
  return `<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="robots" content="noindex" />
  <meta name="theme-color" content="#0c110f" />
  <meta name="color-scheme" content="dark" />
  <title>Nie ma takiej strony – ${SITE_NAME}</title>
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/icon-32x32.png" />
  <link rel="stylesheet" href="/css/styles.css" />
</head>
<body>
  <header class="topbar">
    <div class="topbar__inner shell">
      <a class="wordmark" href="/">Atlas <em>Osobliwości</em> Polski</a>
    </div>
  </header>
  <main class="not-found shell">
    <p class="eyebrow">Błąd 404 · nie ma takiej strony</p>
    <h1>Tej szuflady <em>nie ma</em> w gabinecie.</h1>
    <p class="lead">Ten adres nie prowadzi do żadnej strony atlasu. Może w linku jest literówka albo strona zmieniła adres.</p>
    <p class="not-found__en" lang="en">This page is not in the atlas. <a href="/en">English start page</a></p>
    <div class="hero__actions">
      <a class="primary" href="/">Strona główna</a>
      <a class="secondary" href="/#collectionPicker">Wszystkie kolekcje</a>
    </div>
    <nav class="not-found__drawers" aria-labelledby="notFoundDrawers">
      <h2 id="notFoundDrawers" class="eyebrow">Albo otwórz którąś z szuflad</h2>
      <ul>
          ${drawers}
      </ul>
    </nav>
  </main>
  <footer class="site-footer">
    <div class="site-footer__plaque">
      <img class="footer-logo" src="/assets/logo-oroloko-ai.svg" lang="en" alt="The AI does not replace your experience. It amplifies it. You are still the expert. Made by Robert Oroloko" width="800" height="110" loading="lazy" />
    </div>
  </footer>
</body>
</html>
`;
}

export function writePages(outDir = ".") {
  const indexHtml = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
  const win = loadAtlas();
  const { pages, sitemap } = buildPages(win, indexHtml);
  // atlas/ and en/ hold only these generated pages.
  for (const dir of ["atlas", "en"]) fs.rmSync(path.join(outDir, dir), { recursive: true, force: true });
  for (const page of pages) {
    const target = path.join(outDir, page.file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, page.html);
  }
  fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap);
  fs.writeFileSync(path.join(outDir, "404.html"), notFoundHtml(win));
  return { pages: pages.length, urls: pages.length + 1 };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { pages, urls } = writePages(".");
  console.log(`build-pages: ${pages} pages (atlas/, mapa.html, quiz.html, en.html, en/), ${urls} addresses in sitemap.xml, 404.html`);
}
