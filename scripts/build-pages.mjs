// Builds a page for every collection and every card, and sitemap.xml, on each deployment: npm run build,
// which Vercel runs (vercel.json). Each page is index.html with its own title, description, canonical
// address and link preview, already opened on its collection, so search engines and link previews see
// the collection or card itself. In the browser the app takes over as on any other address.
// It also writes mapa.html, the map of every place, and 404.html, which Vercel shows for an address that
// leads nowhere. The output (atlas/, mapa.html, sitemap.xml and 404.html) is not committed; see .gitignore.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { buildMapPoints } from "./build-map-points.mjs";
import { loadAtlas } from "./build-start-page.mjs";

const SITE_NAME = "Atlas Osobliwości Polski";
export const MAP_ROUTE = "/mapa";

const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;"
})[char]);

const sentence = (text) => (/[.!?…]$/.test(String(text).trim()) ? String(text).trim() : `${String(text).trim()}.`);

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

// Every change must hit exactly one place in index.html, so a changed page fails the build instead of
// shipping a page with the start-page title.
function replaceOnce(html, pattern, replacement, what) {
  const matches = typeof pattern === "string" ? html.split(pattern).length - 1 : (html.match(new RegExp(pattern, "g")) || []).length;
  if (matches !== 1) throw new Error(`index.html: expected one ${what}, found ${matches}`);
  return html.replace(pattern, () => replacement);
}

function setMeta(html, attribute, name, value) {
  return replaceOnce(html, new RegExp(`<meta ${attribute}="${name}" content="[^"]*" />`), `<meta ${attribute}="${name}" content="${escapeHtml(value)}" />`, `${name} meta tag`);
}

export function canonicalOrigin(indexHtml) {
  const href = indexHtml.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!href) throw new Error("index.html: no canonical link");
  return new URL(href).origin;
}

// Title, description, canonical address and link preview of a page.
function headHtml(indexHtml, origin, page) {
  let html = indexHtml;
  const url = `${origin}${page.route}`;
  html = replaceOnce(html, `<title>${SITE_NAME}</title>`, `<title>${escapeHtml(page.title)}</title>`, "title");
  html = setMeta(html, "name", "description", page.description);
  html = replaceOnce(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${escapeHtml(url)}" />`, "canonical link");
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", page.shareTitle);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "name", "twitter:title", page.shareTitle);
  html = setMeta(html, "name", "twitter:description", page.description);
  // Opened on its own page, as the app shows it, so the start page does not flash first.
  return replaceOnce(html, '<div id="startPage" class="start-page">', '<div id="startPage" class="start-page is-hidden">', "start page");
}

function pageHtml(indexHtml, origin, page) {
  let html = headHtml(indexHtml, origin, page);
  html = replaceOnce(html, '<main id="main" class="app-main is-hidden" tabindex="-1">', '<main id="main" class="app-main" tabindex="-1">', "main");
  html = replaceOnce(html, '<nav id="appNav" class="app-nav is-hidden"', '<nav id="appNav" class="app-nav"', "navigation");
  if (page.hasMap) {
    html = replaceOnce(html, '<button class="nav-btn is-hidden" data-view="map" type="button">', '<button class="nav-btn" data-view="map" type="button">', "map tab");
  }
  html = replaceOnce(html, '<p class="eyebrow" id="collectionEyebrow">Aktywna kolekcja</p>', `<p class="eyebrow" id="collectionEyebrow">${escapeHtml(page.group)}</p>`, "collection eyebrow");
  html = replaceOnce(html, '<h1 id="collectionTitle">Atlas</h1>', `<h1 id="collectionTitle">${escapeHtml(page.heading)}</h1>`, "collection title");
  html = replaceOnce(html, '<p id="collectionLead" class="collection-bar__lead"></p>', `<p id="collectionLead" class="collection-bar__lead">${escapeHtml(page.lead)}</p>`, "collection lead");
  html = replaceOnce(html, '<span id="safetyNotice">To jest prototyp edukacyjny.</span>', `<span id="safetyNotice">${escapeHtml(page.safety)}</span>`, "safety notice");
  // The text of the page for readers and crawlers that do not run scripts.
  html = replaceOnce(html, '<div class="app-main__body shell">', `<div class="app-main__body shell">\n      <noscript>${page.noscript}</noscript>`, "main body");
  return html;
}

export function buildPages(win, indexHtml) {
  const app = win.ATLAS_APP_DATA;
  const origin = canonicalOrigin(indexHtml);
  const pages = [];
  for (const collection of app.collections) {
    const route = routeForCollection(collection);
    const group = (app.groups || []).find((entry) => entry.id === collection.group)?.label || "";
    const base = {
      group,
      heading: collection.heading || collection.title,
      lead: collection.subtitle,
      safety: collection.safety_notice,
      hasMap: Object.keys(collection.places || {}).length > 0
    };
    const slugs = new Set();
    for (const item of collection.items) {
      const slug = cardSlug(item.id);
      if (!/^[a-z0-9-]+$/.test(slug)) throw new Error(`${collection.id}/${item.id}: the card address "${slug}" needs plain letters`);
      if (slugs.has(slug)) throw new Error(`${collection.id}: two cards share the address ${slug}`);
      slugs.add(slug);
    }
    pages.push({
      ...base,
      route,
      file: `${route.slice(1)}.html`,
      title: `${collection.title} – ${SITE_NAME}`,
      shareTitle: collection.heading || collection.title,
      description: collection.subtitle,
      noscript: `<ul class="static-list">${collection.items.map((item) => `<li><a href="${escapeHtml(cardRoute(collection, item))}">${escapeHtml(item.name_pl)}</a>: ${escapeHtml(item.hook)}</li>`).join("")}</ul>`
    });
    for (const item of collection.items) {
      const itemRoute = cardRoute(collection, item);
      pages.push({
        ...base,
        route: itemRoute,
        file: `${itemRoute.slice(1)}.html`,
        title: `${item.name_pl} – ${collection.title} – ${SITE_NAME}`,
        shareTitle: item.name_pl,
        description: `${sentence(item.hook)} Karta z kolekcji ${collection.title} w Atlasie Osobliwości Polski.`,
        noscript: `<article class="static-card"><p class="eyebrow">${escapeHtml(collection.title)}</p><h2>${escapeHtml(item.name_pl)}</h2>` +
          `<p class="latin">${escapeHtml(item.name_lat)}</p><p>${escapeHtml(item.hook)}</p>` +
          (item.region_pl ? `<p><strong>Region:</strong> ${escapeHtml(item.region_pl)}</p>` : "") +
          `<p><a href="${escapeHtml(route)}">${escapeHtml(collection.title)}: wszystkie karty</a></p></article>`
      });
    }
  }
  const built = pages.map((page) => ({ file: page.file, route: page.route, html: pageHtml(indexHtml, origin, page) }));
  const map = mapPage(win, indexHtml, origin);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    ["/", map.route, ...built.map((page) => page.route)].map((route) => `  <url><loc>${escapeHtml(`${origin}${route}`)}</loc></url>`).join("\n") +
    "\n</urlset>\n";
  return { pages: [map, ...built], sitemap };
}

// The Polish plural form, as the app picks it (tPlural in js/app.js).
function plural(forms, count) {
  return (forms[new Intl.PluralRules("pl").select(count)] ?? forms.other).replace("{count}", count);
}

// The map of every place, opened on the map page, with the places by collection for readers and
// crawlers that do not run scripts.
function mapPage(win, indexHtml, origin) {
  const ui = win.ATLAS_I18N.ui.pl;
  const { places } = buildMapPoints(win);
  const count = plural(ui.placeCountForms, places.length);
  const page = {
    route: MAP_ROUTE,
    title: `${ui.allMapDocumentTitle} – ${SITE_NAME}`,
    shareTitle: "Mapa Atlasu Osobliwości Polski",
    description: `${count} z kart Atlasu Osobliwości Polski na jednej mapie: kopalnie, zamki, drewniane cerkwie, skały, jeziora i inne. Sprawdź, co jest najbliżej Ciebie.`
  };
  const collections = win.ATLAS_APP_DATA.collections.filter((collection) => places.some((place) => place.cards.some((card) => card.collection === collection.id)));
  const noscript = collections.map((collection) => {
    const cards = places.flatMap((place) => place.cards.filter((card) => card.collection === collection.id))
      .sort((a, b) => a.name.pl.localeCompare(b.name.pl, "pl"));
    return `<h2>${escapeHtml(collection.title)}</h2><ul class="static-list">${cards.map((card) =>
      `<li><a href="${escapeHtml(cardRoute(collection, card))}">${escapeHtml(card.name.pl)}</a></li>`).join("")}</ul>`;
  }).join("");
  let html = headHtml(indexHtml, origin, page);
  html = replaceOnce(html, '<a id="mapLink" class="topbar__link" href="/mapa"', '<a id="mapLink" class="topbar__link" href="/mapa" aria-current="page"', "map link");
  html = replaceOnce(html, '<div id="mapPage" class="map-page is-hidden" tabindex="-1">', '<div id="mapPage" class="map-page" tabindex="-1">', "map page");
  html = replaceOnce(html, `<p id="allMapEyebrow" class="eyebrow">${ui.allMapDocumentTitle}</p>`, `<p id="allMapEyebrow" class="eyebrow">${escapeHtml(ui.allMapEyebrow.replace("{places}", count))}</p>`, "map page eyebrow");
  html = replaceOnce(html, '<div id="allPlaceList" class="source-panel place-list"></div>', `<div id="allPlaceList" class="source-panel place-list"><noscript>${noscript}</noscript></div>`, "map page list");
  return { file: "mapa.html", route: MAP_ROUTE, html };
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
    <p class="not-found__en" lang="en">This page is not in the atlas.</p>
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
      <img class="footer-logo" src="/assets/logo-oroloko-ai.svg" alt="The AI does not replace your experience. It amplifies it. You are still the expert. Made by Robert Oroloko" width="800" height="110" loading="lazy" />
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
  // atlas/ holds only these generated pages.
  fs.rmSync(path.join(outDir, "atlas"), { recursive: true, force: true });
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
  console.log(`build-pages: ${pages} pages (atlas/ and mapa.html), ${urls} addresses in sitemap.xml, 404.html`);
}
