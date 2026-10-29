(() => {
  "use strict";

  const app = window.ATLAS_APP_DATA;
  const i18n = window.ATLAS_I18N || {};
  // Copies of card names, hooks and photos for the start page, made by scripts/build-start-page.mjs.
  const start = window.ATLAS_START || { stats: null, specimens: [], covers: {} };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  if (!app || !Array.isArray(app.collections) || app.collections.length === 0) {
    document.body.insertAdjacentHTML("afterbegin", "<p>Brak danych atlasu.</p>");
    return;
  }

  const languageIds = Object.keys(i18n.languages || { pl: { label: "PL" } });
  const defaultLanguage = i18n.defaultLanguage || languageIds[0] || "pl";

  // Karta 2.0: a card shows at most this many verified fun facts.
  const FACTS_LIMIT = 4;
  const FACT_ICON_FALLBACK = "💡";
  // Collections where the facts section uses a calmer heading than "Fun facts".
  const CALM_COLLECTIONS = new Set(["memento-mori"]);
  // Holocaust and martyrdom sites stay out of the playful formats (fact of the day, true or false).
  const SOLEMN_CATEGORIES = new Set(["miejsca-zaglady", "miejsca-martyrologii"]);
  const TRUE_FALSE_SHARE = 0.3;
  // The map of every place in the atlas has its own address (scripts/build-pages.mjs makes its page).
  const ALL_MAP_ROUTE = "/mapa";

  function storedLanguage() {
    try {
      return window.localStorage.getItem("atlasLanguage");
    } catch {
      return null;
    }
  }

  const state = {
    language: languageIds.includes(storedLanguage()) ? storedLanguage() : defaultLanguage,
    // "start", "collection" or "map" (the map of every place).
    page: "start",
    collectionId: null,
    view: "atlas",
    category: "all",
    search: "",
    flashIndex: 0,
    flashRevealed: false,
    quiz: null
  };

  const dailyFact = {
    status: "loading",
    parts: null,
    collectionId: null,
    itemId: null,
    factId: null
  };

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;"
    })[char]);
  }

  function format(value, params = {}) {
    if (typeof value !== "string") return value;
    return value.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? "");
  }

  function uiValue(key) {
    const current = i18n.ui?.[state.language]?.[key];
    const fallback = i18n.ui?.[defaultLanguage]?.[key];
    return current ?? fallback ?? key;
  }

  function t(key, params = {}) {
    return format(uiValue(key), params);
  }

  function tList(key) {
    const value = uiValue(key);
    return Array.isArray(value) ? value : [];
  }

  function tPlural(key, count) {
    const forms = uiValue(key);
    if (!forms || typeof forms !== "object") return String(count);
    let rule = "other";
    try {
      rule = new Intl.PluralRules(state.language).select(count);
    } catch {
      rule = count === 1 ? "one" : "other";
    }
    return format(forms[rule] ?? forms.other ?? "", { count });
  }

  function randomIndex(length) {
    return Math.floor(Math.random() * length);
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function sample(items, count) {
    return shuffle(items).slice(0, count);
  }

  function activeCollection() {
    return app.collections.find((collection) => collection.id === state.collectionId) || app.collections[0];
  }

  function collectionById(id) {
    return app.collections.find((collection) => collection.id === id);
  }

  function normalizedPath(path = window.location.pathname) {
    const clean = path.replace(/\/+$/, "");
    return clean || "/";
  }

  function routeForCollection(collection) {
    return collection.route || `/atlas/${collection.id}`;
  }

  // A collection lives at /atlas/<collection>, a card at /atlas/<collection>/<card>. Each has its own page
  // with its title and link preview, made by scripts/build-pages.mjs; older /atlas/<collection>#item=<card>
  // links still open the card.
  function routeFromPath(path = window.location.pathname) {
    const target = normalizedPath(path);
    for (const collection of app.collections) {
      const base = normalizedPath(routeForCollection(collection));
      if (target === base) return { collection, slug: null };
      const rest = target.startsWith(`${base}/`) ? target.slice(base.length + 1) : "";
      if (rest && !rest.includes("/")) {
        try { return { collection, slug: decodeURIComponent(rest) }; } catch { return { collection, slug: null }; }
      }
    }
    return null;
  }

  function collectionFromRoute(path = window.location.pathname) {
    return routeFromPath(path)?.collection;
  }

  function pushRoute(path, stateData = {}) {
    if (!window.history?.pushState) return;
    if (normalizedPath(window.location.pathname) === normalizedPath(path)) return;
    window.history.pushState(stateData, "", path);
  }

  // Card addresses drop Polish letters from the card id (scripts/build-pages.mjs does the same).
  function cardSlug(id) {
    return String(id).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l").replace(/Ł/g, "L");
  }

  function cardPath(collection, item) {
    return `${routeForCollection(collection)}/${encodeURIComponent(cardSlug(item.id))}`;
  }

  function cardUrl(collection, item) {
    return new URL(cardPath(collection, item), window.location.origin).href;
  }

  function collectionTranslation(collection = activeCollection()) {
    return i18n.collections?.[state.language]?.[collection.id] || {};
  }

  function collectionText(collection, field) {
    return collectionTranslation(collection)[field] || collection[field] || "";
  }

  function groupTranslation(groupId) {
    return i18n.groups?.[state.language]?.[groupId] || {};
  }

  function groupText(groupId, field) {
    const trans = groupTranslation(groupId);
    if (trans[field]) return trans[field];
    const group = (app.groups || []).find((g) => g.id === groupId);
    return group?.[field] || "";
  }

  function items() {
    return activeCollection().items || [];
  }

  function categories() {
    return activeCollection().categories || [];
  }

  function byId(id) {
    return items().find((item) => item.id === id);
  }

  function categoryById(id) {
    return categories().find((category) => category.id === id);
  }

  function categoryText(category, field) {
    if (!category) return "";
    const translated = collectionTranslation().categories?.[category.id] || {};
    return translated[field] || category[field] || "";
  }

  function itemTranslation(item, collection = activeCollection()) {
    return collectionTranslation(collection).items?.[item.id] || {};
  }

  function itemField(item, field, fallbackField = field, collection = activeCollection()) {
    const translated = itemTranslation(item, collection);
    return translated[field] || item[fallbackField] || item[field] || "";
  }

  function itemName(item, collection = activeCollection()) {
    return itemField(item, "name", "name_pl", collection) || item.name_lat;
  }

  // name_lat is a scientific name for species, but a short Polish descriptor for places
  // ("Wieliczka • solne miasto UNESCO"); the English card text may translate the descriptor.
  function itemLatin(item, collection = activeCollection()) {
    return itemTranslation(item, collection).latin || item.name_lat || "";
  }

  function itemHook(item, collection = activeCollection()) {
    return itemField(item, "hook", "hook", collection);
  }

  function itemQuizAngle(item) {
    return itemField(item, "quiz_angle", "quiz_angle");
  }

  function itemSafety(item) {
    return itemField(item, "safety_note", "safety_note") || collectionText(activeCollection(), "safety_notice");
  }

  function itemRegion(item) {
    return itemField(item, "region", "region_pl");
  }

  function itemHabitat(item) {
    return itemField(item, "habitat", "habitat_pl");
  }

  function itemOccurrence(item) {
    return itemField(item, "occurrence", "occurrence_note");
  }

  function itemLevel(item) {
    return itemField(item, "level", "level");
  }

  function itemCategoryLabel(item) {
    return categoryText(categoryById(item.category), "label") || item.category_label || "";
  }

  function itemCategoryShort(item) {
    return categoryText(categoryById(item.category), "short") || item.category_short || item.category_label || "";
  }

  function itemSynonyms(item) {
    return Array.isArray(item.synonyms) ? item.synonyms : [];
  }

  // ----- Karta 2.0: verified fun facts -----

  function factsEntry(item, collection = activeCollection()) {
    return collection.facts?.[item.id] || null;
  }

  function itemFacts(item, collection = activeCollection()) {
    return (factsEntry(item, collection)?.facts || []).slice(0, FACTS_LIMIT);
  }

  function itemNotes(item, collection = activeCollection()) {
    const notes = factsEntry(item, collection)?.notes || [];
    if (state.language === defaultLanguage) return notes;
    return notes.map((note) => i18n.factNotes?.[state.language]?.[note] || note);
  }

  function factText(fact) {
    return fact[state.language] || fact.pl || "";
  }

  function factsTitle(collection = activeCollection()) {
    return t(CALM_COLLECTIONS.has(collection.id) ? "factsTitleCalm" : "factsTitle");
  }

  // Markdown light used in the facts: **bold**, *italic* (Latin names) and ***both***.
  // The text is escaped first, so only <strong> and <em> can come out of it.
  function markdownLight(value) {
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

  function hostOf(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  }

  function factSourcesHtml(fact) {
    const links = (fact.sources || [])
      .filter((source) => /^https?:\/\//.test(source?.url || ""))
      .map((source) => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener">${escapeHtml(source.label || hostOf(source.url))}</a>`);
    if (!links.length) return "";
    return `<span class="fact__source">${escapeHtml(t("factSource"))}: ${links.join(", ")}</span>`;
  }

  function factHtml(fact) {
    return `
      <li class="fact">
        <span class="fact__icon" aria-hidden="true">${escapeHtml(fact.icon || FACT_ICON_FALLBACK)}</span>
        <div class="fact__body">
          <p class="fact__text">${markdownLight(factText(fact))}</p>
          ${factSourcesHtml(fact)}
        </div>
      </li>`;
  }

  function factsSectionHtml(item, { compact = false } = {}) {
    const facts = itemFacts(item);
    if (!facts.length) return "";
    const title = factsTitle();
    const list = `<ul class="facts__list">${facts.map(factHtml).join("")}</ul>`;
    if (compact) {
      return `
        <details class="facts facts--card">
          <summary><span aria-hidden="true">${FACT_ICON_FALLBACK}</span> ${escapeHtml(t("factsSummary", { title, count: facts.length }))}</summary>
          ${list}
        </details>`;
    }
    return `
      <section class="facts facts--dialog" aria-labelledby="dialogFactsTitle">
        <h3 id="dialogFactsTitle">${escapeHtml(title)}</h3>
        ${list}
      </section>`;
  }

  function notesHtml(item) {
    const notes = itemNotes(item);
    if (!notes.length) return "";
    return `
      <ul class="field-notes" aria-label="${escapeHtml(t("notesTitle"))}">
        ${notes.map((note) => `<li><span class="field-notes__icon" aria-hidden="true">⚠️</span><span>${escapeHtml(note)}</span></li>`).join("")}
      </ul>`;
  }

  // Badges always pair an icon with text; colour is only a secondary cue.
  function badgesHtml(item) {
    const badges = [];
    if (item.protection === "strict" || item.protection === "partial") {
      badges.push({
        kind: `protection-${item.protection}`,
        icon: "🛡️",
        label: t(item.protection === "strict" ? "badgeStrict" : "badgePartial"),
        title: t("badgeProtectionHint")
      });
    }
    if (item.toxic) {
      badges.push({ kind: "toxic", icon: "☠️", label: t(item.toxic === "mild" ? "badgeToxicMild" : "badgeToxic") });
    }
    if (!badges.length) return "";
    return `
      <ul class="badges" aria-label="${escapeHtml(t("badgesLabel"))}">
        ${badges.map((badge) => `<li class="badge badge--${badge.kind}"${badge.title ? ` title="${escapeHtml(badge.title)}"` : ""}><span class="badge__icon" aria-hidden="true">${badge.icon}</span><span>${escapeHtml(badge.label)}</span></li>`).join("")}
      </ul>`;
  }

  function synonymsHtml(item) {
    const names = itemSynonyms(item);
    if (!names.length) return "";
    return `<p class="synonyms"><strong>${escapeHtml(t("synonymsLabel"))}:</strong> ${escapeHtml(names.join(", "))}</p>`;
  }

  function setText(selector, key, params = {}) {
    const node = $(selector);
    if (node) node.textContent = t(key, params);
  }

  function updateActiveCollectionLabels() {
    if (!state.collectionId) return;
    const collection = activeCollection();
    $("#collectionEyebrow").textContent = (collection.group && groupText(collection.group, "label")) || t("activeCollection");
    $("#collectionTitle").textContent = collectionText(collection, "heading") || collectionText(collection, "title");
    $("#collectionLead").textContent = collectionText(collection, "subtitle");
    $("#safetyNotice").textContent = collectionText(collection, "safety_notice");
    $("#sourceNote").textContent = collectionText(collection, "source_note");
    $("#searchInput").placeholder = collectionText(collection, "search_placeholder") || t("searchFallback");
    renderCollectionPhoto(collection);
  }

  // ----- Start page: photos copied from the cards -----

  // Commons scales a photo to the requested width; srcset lets the browser take the larger one on sharp screens.
  function commonsSrc(photo, width) {
    return `${photo.image}?width=${width}`;
  }

  function commonsSrcset(photo) {
    return `${commonsSrc(photo, 500)} 500w, ${commonsSrc(photo, 960)} 960w`;
  }

  function localized(value) {
    return value?.[state.language] || value?.[defaultLanguage] || "";
  }

  // The visible credit is author and license; screen readers also hear what the photo shows.
  function photoCreditHtml(photo, name, className) {
    return `<a class="photo-credit ${className}" href="${escapeHtml(photo.source)}" target="_blank" rel="noopener noreferrer"><span class="visually-hidden">${escapeHtml(t("photoCreditPrefix", { name }))}</span>${escapeHtml(`${photo.author} · ${photo.license}`)}</a>`;
  }

  // The banner of an opened collection shows the photo of its drawer.
  function renderCollectionPhoto(collection) {
    const node = $("#collectionPhoto");
    if (!node || (node.dataset.collection === collection.id && node.dataset.language === state.language)) return;
    node.dataset.collection = collection.id;
    node.dataset.language = state.language;
    const cover = start.covers?.[collection.id];
    node.innerHTML = cover ? `
      <img src="${escapeHtml(commonsSrc(cover.photo, 960))}" srcset="${escapeHtml(commonsSrcset(cover.photo))}" sizes="100vw" alt="" decoding="async" onerror="this.remove()" />
      ${photoCreditHtml(cover.photo, localized(cover.name), "collection-bar__credit")}` : "";
  }

  function renderHeroStats() {
    const list = $("#heroStats");
    if (!list) return;
    const stats = start.stats;
    const entries = stats ? [["cards", "statCardsForms"], ["places", "statPlacesForms"], ["photos", "statPhotosForms"]] : [];
    list.innerHTML = entries.map(([key, forms]) => {
      const stat = `<strong>${escapeHtml(stats[key].toLocaleString(state.language))}</strong> <span>${escapeHtml(tPlural(forms, stats[key]))}</span>`;
      // The places lead to the map of all of them.
      return `<li>${key === "places" ? `<a class="hero__stat-link" href="${ALL_MAP_ROUTE}" data-action="go-map">${stat}</a>` : stat}</li>`;
    }).join("");
  }

  // Five curiosities in the hero. Each opens its card; the first is the large tile and loads first, unless
  // the page opened on a collection and the start page is hidden.
  function renderCabinet() {
    const cabinet = $("#cabinet");
    if (!cabinet) return;
    const startVisible = !$("#startPage")?.classList.contains("is-hidden");
    cabinet.innerHTML = (start.specimens || []).map((specimen, index) => {
      const collection = collectionById(specimen.collection);
      if (!collection) return "";
      const name = localized(specimen.name);
      const alt = state.language === defaultLanguage ? specimen.photo.alt : name;
      return `
        <li class="specimen specimen--${index + 1}">
          <img src="${escapeHtml(commonsSrc(specimen.photo, index === 0 ? 960 : 500))}" srcset="${escapeHtml(commonsSrcset(specimen.photo))}" sizes="(max-width: 560px) 80vw, (max-width: 900px) 50vw, 30vw" alt="${escapeHtml(alt)}" decoding="async"${index === 0 && startVisible ? ' fetchpriority="high"' : ' loading="lazy"'} onerror="this.closest('.specimen').classList.add('is-broken'); this.remove();" />
          <div class="specimen__caption">
            <span class="specimen__cat">${escapeHtml(collectionText(collection, "title"))}</span>
            <a class="specimen__name" href="${escapeHtml(cardPath(collection, { id: specimen.id }))}" data-action="open-card" data-collection="${escapeHtml(collection.id)}" data-id="${escapeHtml(specimen.id)}" aria-label="${escapeHtml(t("openCardLabel", { name }))}">${escapeHtml(name)}</a>
            <span class="specimen__note">${escapeHtml(localized(specimen.hook))}</span>
          </div>
          ${photoCreditHtml(specimen.photo, name, "specimen__credit")}
        </li>`;
    }).join("");
  }

  function renderStartCredits() {
    const list = $("#startCreditsList");
    if (!list) return;
    const entries = [
      ...(start.specimens || []),
      ...app.collections.map((collection) => start.covers?.[collection.id]).filter(Boolean)
    ];
    list.innerHTML = entries.map(({ name, photo }) => `
      <li>
        <strong>${escapeHtml(localized(name))}</strong>: ${escapeHtml(photo.author)},
        ${escapeHtml(t("startCreditsLicense"))} <a href="${escapeHtml(photo.license_url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(photo.license)}</a>,
        <a href="${escapeHtml(photo.source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("startCreditsFile"))}</a>
      </li>`).join("");
  }

  function renderChrome() {
    document.documentElement.lang = state.language;
    updateDocumentTitle();

    setText("#skipLink", "skipLink");
    setText("#heroEyebrow", "heroEyebrow", { collections: tPlural("collectionCountForms", app.collections.length) });
    $("#heroTitle").innerHTML = markdownLight(t("heroTitle"));
    setText("#heroLead", "heroLead");
    setText("#chooseCollectionHero", "heroStart");
    setText("#surpriseButton", "heroSurprise");
    setText("#startCreditsTitle", "startCreditsTitle");
    setText("#startCreditsNote", "startCreditsNote");
    setText("#dailyFactTitle", "dailyFactEyebrow");
    setText("#aboutEyebrow", "aboutEyebrow");
    setText("#about-title", "aboutTitle");
    setText("#aboutLeadBody", "aboutLeadBody");
    setText("#aboutLeadSignature", "aboutLeadSignature");
    setText("#aboutCard1Title", "aboutCard1Title");
    setText("#aboutCard1Body", "aboutCard1Body");
    setText("#aboutCard2Title", "aboutCard2Title");
    setText("#aboutCard2Body", "aboutCard2Body");
    setText("#aboutCard3Title", "aboutCard3Title");
    setText("#aboutCard3Body", "aboutCard3Body");
    setText("#collectionsEyebrow", "collectionsEyebrow");
    $("#collections-title").innerHTML = markdownLight(t("collectionsTitle"));
    setText("#collectionsNote", "collectionsNote");
    setText("#changeCollectionButton", "changeCollection");
    setText("#noticePrefix", "noticePrefix");
    setText("#atlasEyebrow", "atlasEyebrow");
    setText("#atlasNote", "atlasNote");
    setText("#searchLabel", "searchLabel");
    setText("#mapEyebrow", "mapEyebrow");
    setText("#map-title", "mapTitle");
    setText("#mapNote", "mapNote");
    setText("#mapAllLink", "mapAllLink");
    setText("#mapLink", "navMap");
    $("#mapLink")?.setAttribute("aria-label", t("navMapLabel"));
    renderAllMapChrome();
    setText("#learnEyebrow", "learnEyebrow");
    setText("#learn-title", "learnTitle");
    setText("#learnNote", "learnNote");
    setText("#quizEyebrow", "quizEyebrow");
    setText("#quiz-title", "quizTitle");
    setText("#quizNote", "quizNote");
    setText("#sourcesEyebrow", "sourcesEyebrow");
    setText("#sources-title", "sourcesTitle");
    setText("#sourcePanelTitle", "sourcePanelTitle");
    setText("#sourcePanelCopy", "sourcePanelCopy");
    setText("#sourceChecklistTitle", "sourceChecklistTitle");

    $("#heroActions")?.setAttribute("aria-label", t("quickActions"));
    $("#heroStats")?.setAttribute("aria-label", t("heroStatsLabel"));
    $("#cabinet")?.setAttribute("aria-label", t("cabinetLabel"));
    $("#wordmark")?.setAttribute("aria-label", t("homeLabel"));
    $("#languageToggle")?.setAttribute("aria-label", t("languageLabel"));
    $("#appNav")?.setAttribute("aria-label", t("appNavLabel"));
    $(".dialog-close")?.setAttribute("aria-label", t("close"));

    $("#sourceChecklist").innerHTML = tList("sourceChecklistItems")
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    $$(".language-btn").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.language === state.language);
      button.setAttribute("aria-pressed", String(button.dataset.language === state.language));
    });

    const navLabels = {
      pl: { atlas: "Atlas", map: "Mapa", learn: "Nauka", quiz: "Quiz", sources: "Źródła" },
      en: { atlas: "Atlas", map: "Map", learn: "Learn", quiz: "Quiz", sources: "Sources" }
    };
    $$(".nav-btn[data-view]").forEach((button) => {
      button.textContent = navLabels[state.language]?.[button.dataset.view] || navLabels.pl[button.dataset.view] || button.dataset.view;
    });

    updateActiveCollectionLabels();
    renderHeroStats();
    renderCabinet();
    renderCollections();
    renderStartCredits();
    renderDailyFact();
  }

  // A drawer of the cabinet: the photo of one of its cards, the count and a short teaser. The whole tile
  // opens the collection; the photo credit stays a separate link above it.
  function drawerHtml(collection) {
    const title = collectionText(collection, "title");
    const cover = start.covers?.[collection.id];
    return `
      <li class="drawer${cover ? "" : " drawer--plain"}">
        ${cover ? `<img class="drawer__img" src="${escapeHtml(commonsSrc(cover.photo, 500))}" srcset="${escapeHtml(commonsSrcset(cover.photo))}" sizes="(max-width: 1000px) 50vw, 25vw" alt="" loading="lazy" decoding="async" onerror="this.remove()" />` : ""}
        <p class="drawer__count">${escapeHtml(collectionText(collection, "count_label") || `${collection.items.length}`)}</p>
        <h4 class="drawer__name"><a class="drawer__open" href="${escapeHtml(routeForCollection(collection))}" data-action="select-collection" data-collection="${escapeHtml(collection.id)}">${escapeHtml(title)}</a></h4>
        <p class="drawer__teaser">${escapeHtml(collectionText(collection, "teaser"))}</p>
        ${cover ? photoCreditHtml(cover.photo, localized(cover.name), "drawer__credit") : ""}
      </li>`;
  }

  // Columns that fill whole rows: a shelf of 8 drawers gets 4 columns, a shelf of 5 gets 5.
  function shelfColumns(count) {
    if (count % 4 === 0) return 4;
    if (count % 5 === 0) return 5;
    if (count % 3 === 0) return 3;
    return Math.min(count, 4);
  }

  function renderCollections() {
    const grid = $("#collectionGrid");
    const groups = Array.isArray(app.groups) ? app.groups : [];
    const byGroup = new Map();
    for (const collection of app.collections) {
      if (!collection.group) continue;
      if (!byGroup.has(collection.group)) byGroup.set(collection.group, []);
      byGroup.get(collection.group).push(collection);
    }
    const orderedGroups = groups.filter((g) => byGroup.has(g.id));

    if (!orderedGroups.length) {
      grid.classList.remove("is-grouped");
      grid.innerHTML = `<ul class="shelf__drawers" style="--cols: ${shelfColumns(app.collections.length)}">${app.collections.map(drawerHtml).join("")}</ul>`;
      return;
    }

    // The groups are the shelves of the cabinet.
    grid.classList.add("is-grouped");
    grid.innerHTML = orderedGroups.map((group) => {
      const shelf = byGroup.get(group.id);
      const description = groupText(group.id, "description");
      return `
        <section class="shelf" data-group="${escapeHtml(group.id)}" aria-labelledby="shelf-${escapeHtml(group.id)}">
          <header class="shelf__head">
            <h3 id="shelf-${escapeHtml(group.id)}">${escapeHtml(groupText(group.id, "label"))}</h3>
            <p class="shelf__count">${escapeHtml(tPlural("drawerCountForms", shelf.length))}</p>
            ${description ? `<p class="shelf__lead">${escapeHtml(description)}</p>` : ""}
          </header>
          <ul class="shelf__drawers${shelf.length % 2 ? " shelf__drawers--odd" : ""}" style="--cols: ${shelfColumns(shelf.length)}">${shelf.map(drawerHtml).join("")}</ul>
        </section>`;
    }).join("");
  }

  function creditChipHtml(item) {
    if (!item.image_author) return "";
    const labelParts = [item.image_author];
    if (item.image_license) labelParts.push(item.image_license);
    const label = labelParts.join(" · ");
    const href = item.image_source || item.license_url || "";
    const aria = state.language === "en" ? "Photo attribution" : "Atrybucja zdjęcia";
    if (!href) {
      return `<span class="m-card__credit m-card__credit--static" aria-label="${escapeHtml(aria)}">${escapeHtml(label)}</span>`;
    }
    return `<a class="m-card__credit" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(aria)}">${escapeHtml(label)}</a>`;
  }

  // A representative photo shows a similar specimen, individual or place, and a context photo shows the
  // surroundings; the data marks both at the start of the Polish description.
  const PHOTO_LABEL = /^(Kadr reprezentatywny|Kadr kontekstowy|Diagram reprezentatywny|Schemat reprezentatywny)\b/;
  const PHOTO_LABEL_KEYS = {
    "Kadr reprezentatywny": "photoRepresentative",
    "Kadr kontekstowy": "photoContext",
    "Diagram reprezentatywny": "photoDiagram",
    "Schemat reprezentatywny": "photoDiagram"
  };

  // Shown under the photo. Cards and flashcards get only the label, because the description could give away
  // the answer in Nauka; the card dialog gets the whole description.
  function photoCaptionHtml(item, full = false) {
    const label = item.image ? PHOTO_LABEL.exec(item.image_alt || "")?.[1] : "";
    if (!label) return "";
    const polish = state.language === defaultLanguage;
    const key = PHOTO_LABEL_KEYS[label];
    const text = polish ? (full ? item.image_alt : label) : t(full ? `${key}Note` : key);
    // The Polish alt text starts with the same words, so screen readers do not need the caption there.
    return `<p class="photo-caption"${polish ? ' aria-hidden="true"' : ""}>${escapeHtml(text)}</p>`;
  }

  function visualHtml(item, large = false) {
    const name = itemName(item);
    if (item.image) {
      const altText = state.language === defaultLanguage ? item.image_alt || name : name;
      return `
        <div class="m-card__visual">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(altText)}" loading="lazy" onerror="this.closest('.m-card__visual').classList.add('visual-error'); this.remove();" />
          ${creditChipHtml(item)}
        </div>`;
    }
    return `
      <div class="m-card__visual visual-fallback" aria-label="${escapeHtml(t("imageToAddLabel", { name }))}">
        <span>${escapeHtml(item.category_icon || activeCollection().icon || "?")}</span>
        <span>${large ? escapeHtml(t("imageToAdd")) : escapeHtml(itemCategoryShort(item) || t("defaultCategory"))}</span>
      </div>`;
  }

  function cardHtml(item) {
    const region = itemRegion(item);
    return `
      <article class="m-card" data-id="${escapeHtml(item.id)}">
        ${visualHtml(item)}
        ${photoCaptionHtml(item)}
        <div class="m-card__body">
          <h3><a class="m-card__title" href="${escapeHtml(cardPath(activeCollection(), item))}" data-action="details" data-id="${escapeHtml(item.id)}">${escapeHtml(itemName(item))}</a></h3>
          <div class="latin">${escapeHtml(itemLatin(item))}</div>
          ${badgesHtml(item)}
          <p class="hook">${escapeHtml(itemHook(item))}</p>
          ${region ? `<p class="occurrence-snippet"><strong>${escapeHtml(t("regionLabel"))}:</strong> ${escapeHtml(region)}</p>` : ""}
          ${notesHtml(item)}
          <div class="meta-line">
            <span class="pill">${escapeHtml(item.category_icon || "")} ${escapeHtml(itemCategoryShort(item))}</span>
            <span class="pill">${escapeHtml(itemLevel(item) || "atlas")}</span>
          </div>
          ${factsSectionHtml(item, { compact: true })}
        </div>
        <div class="card-actions">
          <button class="secondary" data-action="details" data-id="${escapeHtml(item.id)}">${escapeHtml(t("details"))}</button>
          <button class="ghost" data-action="learn-item" data-id="${escapeHtml(item.id)}">${escapeHtml(t("learnItem"))}</button>
        </div>
      </article>`;
  }

  function renderCategoryFilters() {
    const container = $("#categoryFilters");
    container.innerHTML = [
      `<button class="chip ${state.category === "all" ? "is-active" : ""}" data-category="all">${escapeHtml(t("all"))}</button>`,
      ...categories().map((cat) => `<button class="chip ${state.category === cat.id ? "is-active" : ""}" data-category="${escapeHtml(cat.id)}">${escapeHtml(cat.icon)} ${escapeHtml(categoryText(cat, "short"))}</button>`)
    ].join("");
  }

  // Search ignores Polish diacritics, so "zolw" finds "żółw" and a former spelling still matches.
  function searchKey(value, locale) {
    return String(value || "")
      .toLocaleLowerCase(locale)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ł/g, "l");
  }

  function filteredItems() {
    const locale = state.language === "en" ? "en" : "pl";
    const phrase = searchKey(state.search.trim(), locale);
    return items().filter((item) => {
      const matchesCategory = state.category === "all" || item.category === state.category;
      const haystack = [
        itemName(item),
        item.name_pl,
        ...itemSynonyms(item),
        item.name_lat,
        itemLatin(item),
        itemHook(item),
        itemQuizAngle(item),
        itemCategoryLabel(item),
        itemCategoryShort(item),
        itemRegion(item),
        itemHabitat(item)
      ].join(" ");
      const matchesSearch = !phrase || searchKey(haystack, locale).includes(phrase);
      return matchesCategory && matchesSearch;
    });
  }

  function renderStats(list) {
    const collection = activeCollection();
    const withImages = items().filter((item) => item.image).length;
    $("#statsGrid").innerHTML = `
      <div class="stat-card"><strong>${items().length}</strong><span>${escapeHtml(t("statItems"))}</span></div>
      <div class="stat-card"><strong>${categories().length}</strong><span>${escapeHtml(t("statGroups"))}</span></div>
      <div class="stat-card"><strong>${list.length}</strong><span>${escapeHtml(t("statVisible"))}</span></div>
      <div class="stat-card"><strong>${withImages}</strong><span>${escapeHtml(t("statPhotos"))}</span></div>`;
    $("#atlas-title").textContent = `${collectionText(collection, "count_label")} - ${collectionText(collection, "title")}`;
  }

  function renderAtlas() {
    renderCategoryFilters();
    const list = filteredItems();
    renderStats(list);
    $("#atlasGrid").innerHTML = list.length
      ? list.map(cardHtml).join("")
      : `<div class="empty-state">${escapeHtml(t("noResults"))}</div>`;
  }

  function dialogCreditsHtml(item) {
    if (!item.image || !item.image_author) return "";
    const en = state.language === "en";
    const labels = {
      title: en ? "Photo attribution" : "Atrybucja zdjęcia",
      author: en ? "Author" : "Autor",
      source: en ? "Source" : "Źródło",
      license: en ? "License" : "Licencja",
      modifications: en ? "Modifications" : "Modyfikacje"
    };
    const licenseHtml = item.image_license
      ? (item.license_url
        ? `<a href="${escapeHtml(item.license_url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.image_license)}</a>`
        : escapeHtml(item.image_license))
      : "";
    const sourceHtml = item.image_source
      ? `<a href="${escapeHtml(item.image_source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.image_source)}</a>`
      : "";
    return `
      <div class="dialog-credits">
        <h3>${escapeHtml(labels.title)}</h3>
        <p><strong>${escapeHtml(labels.author)}:</strong> ${escapeHtml(item.image_author)}</p>
        ${sourceHtml ? `<p><strong>${escapeHtml(labels.source)}:</strong> ${sourceHtml}</p>` : ""}
        ${licenseHtml ? `<p><strong>${escapeHtml(labels.license)}:</strong> ${licenseHtml}</p>` : ""}
        ${item.image_modifications ? `<p><strong>${escapeHtml(labels.modifications)}:</strong> ${escapeHtml(item.image_modifications)}</p>` : ""}
      </div>`;
  }

  function cardToolsHtml(collection, item) {
    return `
      <div class="card-tools">
        <button class="secondary card-tools__share" type="button" data-action="share-card" data-collection="${escapeHtml(collection.id)}" data-id="${escapeHtml(item.id)}"><span aria-hidden="true">🔗</span> ${escapeHtml(t("share"))}</button>
        ${collectionPlaces(collection)[item.id] ? `<button class="secondary card-tools__map" type="button" data-action="show-on-map" data-id="${escapeHtml(item.id)}"><span aria-hidden="true">📍</span> ${escapeHtml(t("mapShowOnMap"))}</button>` : ""}
        <a class="card-tools__link" href="${escapeHtml(cardPath(collection, item))}" data-action="copy-card-link" data-collection="${escapeHtml(collection.id)}" data-id="${escapeHtml(item.id)}">${escapeHtml(t("cardLink"))}</a>
      </div>
      <p class="share-status" role="status" aria-live="polite"></p>`;
  }

  function renderDialogContent(item) {
    const collection = activeCollection();
    const region = itemRegion(item);
    const habitat = itemHabitat(item);
    const occurrence = itemOccurrence(item);
    const notes = itemNotes(item);
    $("#dialogContent").innerHTML = `
      <div class="dialog-body">
        ${visualHtml(item, true)}
        ${photoCaptionHtml(item, true)}
        <div class="meta-line" style="margin-top:1rem">
          <span class="pill">${escapeHtml(item.category_icon || "")} ${escapeHtml(itemCategoryLabel(item))}</span>
          <span class="pill">${escapeHtml(t("levelLabel"))}: ${escapeHtml(itemLevel(item) || "atlas")}</span>
        </div>
        <h2 id="dialogTitle" style="margin-top:.75rem">${escapeHtml(itemName(item))}</h2>
        <p class="latin">${escapeHtml(itemLatin(item))}</p>
        ${synonymsHtml(item)}
        ${badgesHtml(item)}
        ${cardToolsHtml(collection, item)}
        <p class="hook">${escapeHtml(itemHook(item))}</p>
        ${region ? `
          <div class="occurrence-box">
            <h3>${escapeHtml(t("occurrenceTitle"))}</h3>
            <p><strong>${escapeHtml(t("regionLabel"))}:</strong> ${escapeHtml(region)}</p>
            ${habitat ? `<p><strong>${escapeHtml(t("habitatLabel"))}:</strong> ${escapeHtml(habitat)}</p>` : ""}
            ${occurrence ? `<p>${escapeHtml(occurrence)}</p>` : ""}
          </div>` : ""}
        ${factsSectionHtml(item)}
        <h3>${escapeHtml(t("quizAngleTitle"))}</h3>
        <p>${escapeHtml(itemQuizAngle(item))}</p>
        <div class="safety">
          <strong>${escapeHtml(t("cautionLabel"))}:</strong> ${escapeHtml(itemSafety(item))}
          ${notes.length ? `<ul class="safety__notes">${notes.map((note) => `<li><span aria-hidden="true">⚠️</span> ${escapeHtml(note)}</li>`).join("")}</ul>` : ""}
        </div>
        ${dialogCreditsHtml(item)}
        <div class="row-actions">
          <button class="primary" data-action="learn-item" data-id="${escapeHtml(item.id)}">${escapeHtml(t("learnSpecies"))}</button>
          <button class="secondary" data-action="close-dialog">${escapeHtml(t("close"))}</button>
        </div>
      </div>`;
  }

  function itemIdFromHash(hash = window.location.hash) {
    const match = hash.match(/^#item=(.+)$/);
    if (!match) return null;
    try { return decodeURIComponent(match[1]); } catch { return null; }
  }

  // The card the address points at: its own path, or the #item= of an older link.
  function itemFromLocation() {
    const slug = routeFromPath()?.slug;
    if (slug) return items().find((item) => cardSlug(item.id) === slug) || null;
    const hashId = itemIdFromHash();
    return hashId ? byId(hashId) || null : null;
  }

  function addressNamesCard() {
    return Boolean(routeFromPath()?.slug || itemIdFromHash());
  }

  function setItemRoute(id) {
    if (!window.history?.pushState || !state.collectionId) return;
    const target = cardPath(activeCollection(), { id });
    if (normalizedPath() === normalizedPath(target) && !window.location.hash) return;
    window.history.pushState(window.history.state || {}, "", target);
  }

  function clearItemRoute() {
    if (!window.history?.replaceState || !state.collectionId) return;
    const target = routeForCollection(activeCollection());
    if (normalizedPath() === normalizedPath(target) && !window.location.hash) return;
    window.history.replaceState(window.history.state || {}, "", target);
  }

  function syncDialogFromRoute() {
    const dialog = $("#itemDialog");
    const item = itemFromLocation();
    if (item) {
      // An older #item= link moves to the card's own address.
      if (window.location.hash && window.history?.replaceState) {
        window.history.replaceState(window.history.state || {}, "", cardPath(activeCollection(), item));
      }
      if (!dialog.open || dialog.dataset.itemId !== item.id) showDialog(item.id, { skipRoute: true });
    } else {
      if (addressNamesCard()) clearItemRoute();
      if (dialog.open) dialog.close?.();
    }
    updateDocumentTitle();
  }

  // The tab title names the card and the collection, like the page made for that address.
  function updateDocumentTitle() {
    const base = t("documentTitle");
    if (state.page === "map") {
      document.title = `${t("allMapDocumentTitle")} – ${base}`;
      return;
    }
    if (!state.collectionId) {
      document.title = base;
      return;
    }
    const collection = activeCollection();
    const dialog = $("#itemDialog");
    const item = dialog?.open ? byId(dialog.dataset.itemId) : null;
    document.title = [item && itemName(item), collectionText(collection, "title"), base].filter(Boolean).join(" – ");
  }

  function showDialog(id, options = {}) {
    const item = byId(id);
    if (!item) return;
    const dialog = $("#itemDialog");
    dialog.dataset.itemId = id;
    renderDialogContent(item);
    if (!options.skipRoute) setItemRoute(id);
    if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
    else dialog.setAttribute("open", "");
    updateDocumentTitle();
  }

  // ----- Sharing a single card -----

  let toastTimer = null;

  function announce(message, { long = false } = {}) {
    const dialog = $("#itemDialog");
    // A modal dialog makes the rest of the page inert, so inside it the dialog's own status line is used.
    const node = dialog?.open ? $(".share-status", dialog) : $("#toast");
    if (!node) return;
    node.textContent = message;
    node.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove("is-visible"), long ? 12000 : 4000);
  }

  async function copyText(text) {
    try {
      if (window.isSecureContext && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // Fall back to a temporary text field below.
    }
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      ($("#itemDialog")?.open ? $("#itemDialog") : document.body).appendChild(area);
      area.select();
      const copied = document.execCommand("copy");
      area.remove();
      return copied;
    } catch {
      return false;
    }
  }

  async function copyCardLink(url) {
    const copied = await copyText(url);
    if (copied) announce(t("linkCopied"));
    else announce(t("linkCopyManual", { url }), { long: true });
  }

  async function shareCard(collectionId, itemId) {
    const collection = collectionById(collectionId);
    const item = collection?.items.find((entry) => entry.id === itemId);
    if (!item) return;
    const url = cardUrl(collection, item);
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: t("shareText", { name: itemName(item, collection) }), url });
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }
    await copyCardLink(url);
  }

  async function openCard(collectionId, itemId) {
    const collection = collectionById(collectionId);
    if (!collection) return;
    const path = cardPath(collection, { id: itemId });
    if (window.history?.pushState) window.history.pushState({ collectionId }, "", path);
    else window.location.hash = `item=${encodeURIComponent(itemId)}`;
    await selectCollection(collectionId, { updateRoute: false });
  }

  // "Zaskocz mnie": a random card of a random collection. Like the fact of the day, it never lands on a
  // Holocaust or martyrdom site.
  async function surprise(button) {
    if (button.getAttribute("aria-busy") === "true") return;
    const collection = app.collections[randomIndex(app.collections.length)];
    button.setAttribute("aria-busy", "true");
    button.textContent = t("surpriseLoading");
    try {
      if (typeof app.loadCollection === "function") await app.loadCollection(collection.id);
    } catch {
      announce(t("surpriseError"));
      return;
    } finally {
      button.removeAttribute("aria-busy");
      button.textContent = t("heroSurprise");
    }
    const pool = (collection.items || []).filter((item) => !SOLEMN_CATEGORIES.has(item.category));
    if (!pool.length) {
      announce(t("surpriseError"));
      return;
    }
    await openCard(collection.id, pool[randomIndex(pool.length)].id);
  }

  // ----- Fact of the day -----

  function localDateParts(date = new Date()) {
    return { y: date.getFullYear(), m: date.getMonth() + 1, d: date.getDate() };
  }

  function isoDate(parts) {
    return `${parts.y}-${String(parts.m).padStart(2, "0")}-${String(parts.d).padStart(2, "0")}`;
  }

  function formatDate(parts, { numeric = false } = {}) {
    const options = numeric
      ? { day: "2-digit", month: "2-digit", year: "numeric" }
      : { day: "numeric", month: "long", year: "numeric" };
    try {
      return new Date(parts.y, parts.m - 1, parts.d).toLocaleDateString(state.language === "en" ? "en-GB" : "pl-PL", options);
    } catch {
      return isoDate(parts);
    }
  }

  function partsFromIso(value) {
    const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return match ? { y: Number(match[1]), m: Number(match[2]), d: Number(match[3]) } : null;
  }

  function hashString(value) {
    let hash = 2166136261;
    for (const char of value) {
      hash ^= char.codePointAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function factTextCounts(collection) {
    const counts = new Map();
    for (const entry of Object.values(collection.facts || {})) {
      for (const fact of entry.facts || []) counts.set(fact.pl, (counts.get(fact.pl) || 0) + 1);
    }
    return counts;
  }

  function dailyPool(collection) {
    const counts = factTextCounts(collection);
    const pool = [];
    for (const item of collection.items || []) {
      if (SOLEMN_CATEGORIES.has(item.category)) continue;
      for (const fact of itemFacts(item, collection)) {
        // Skip short and repeated legal-status lines; the daily fact should tell a story.
        if (counts.get(fact.pl) > 1 || fact.pl.length < 60) continue;
        pool.push({ item, fact });
      }
    }
    return pool;
  }

  // Deterministic by the local date: the collections take turns day by day, and the date
  // hash picks one fact from that collection, so everybody sees the same fact on a given day.
  async function loadDailyFact() {
    const parts = localDateParts();
    const dayNumber = Math.floor(Date.UTC(parts.y, parts.m - 1, parts.d) / 86400000);
    const collection = app.collections[dayNumber % app.collections.length];
    try {
      if (typeof app.loadCollection === "function") await app.loadCollection(collection.id);
    } catch {
      dailyFact.status = "failed";
      renderDailyFact();
      return;
    }
    const pool = dailyPool(collection);
    if (!pool.length) {
      dailyFact.status = "failed";
      renderDailyFact();
      return;
    }
    const pick = pool[hashString(`${isoDate(parts)}:${collection.id}`) % pool.length];
    Object.assign(dailyFact, { status: "ready", parts, collectionId: collection.id, itemId: pick.item.id, factId: pick.fact.id });
    renderDailyFact();
  }

  function renderDailyFact() {
    const section = $("#dailyFact");
    const body = $("#dailyFactBody");
    if (!section || !body) return;
    if (dailyFact.status === "failed") {
      section.classList.add("is-hidden");
      return;
    }
    if (dailyFact.status !== "ready") {
      body.innerHTML = `<p class="daily-fact__loading">${escapeHtml(t("dailyFactLoading"))}</p>`;
      return;
    }
    const collection = collectionById(dailyFact.collectionId);
    const item = collection?.items.find((entry) => entry.id === dailyFact.itemId);
    const fact = item && itemFacts(item, collection).find((entry) => entry.id === dailyFact.factId);
    if (!fact) {
      section.classList.add("is-hidden");
      return;
    }
    const name = itemName(item, collection);
    body.innerHTML = `
      <p class="daily-fact__meta">${escapeHtml(formatDate(dailyFact.parts))} · ${escapeHtml(t("dailyFactCollection", { collection: collectionText(collection, "title") }))}</p>
      <div class="daily-fact__fact">
        <span class="fact__icon" aria-hidden="true">${escapeHtml(fact.icon || FACT_ICON_FALLBACK)}</span>
        <div class="fact__body">
          <p class="daily-fact__text">${markdownLight(factText(fact))}</p>
          ${factSourcesHtml(fact)}
        </div>
      </div>
      <div class="row-actions daily-fact__actions">
        <a class="primary" href="${escapeHtml(cardPath(collection, item))}" data-action="open-card" data-collection="${escapeHtml(collection.id)}" data-id="${escapeHtml(item.id)}">${escapeHtml(t("dailyFactOpen", { name }))}</a>
        <button class="secondary" type="button" data-action="share-card" data-collection="${escapeHtml(collection.id)}" data-id="${escapeHtml(item.id)}"><span aria-hidden="true">🔗</span> ${escapeHtml(t("share"))}</button>
      </div>`;
  }

  function scheduleDailyFact() {
    const start = () => { loadDailyFact(); };
    if ("requestIdleCallback" in window) window.requestIdleCallback(start, { timeout: 2000 });
    else window.setTimeout(start, 300);
  }

  function renderFlashcard() {
    const list = items();
    const item = list[state.flashIndex] || list[0];
    if (!item) {
      $("#flashcard").innerHTML = `<div class="empty-state">${escapeHtml(t("flashEmpty"))}</div>`;
      return;
    }
    const region = itemRegion(item);
    $("#flashcard").innerHTML = `
      <div class="flash-inner">
        <div class="flash-visual">
          ${visualHtml(item, true)}
          ${photoCaptionHtml(item)}
        </div>
        <div class="flash-content">
          <p class="eyebrow">${escapeHtml(t("flashCounter", { current: state.flashIndex + 1, total: list.length }))}</p>
          <div class="big-icon" aria-hidden="true">${escapeHtml(item.category_icon || activeCollection().icon || "?")}</div>
          <blockquote>${escapeHtml(itemHook(item))}</blockquote>
          <p><strong>${escapeHtml(t("categoryLabel"))}:</strong> ${escapeHtml(itemCategoryLabel(item))}</p>
          ${state.flashRevealed ? `
            <div class="reveal-box">
              <h3>${escapeHtml(itemName(item))}</h3>
              <p class="latin">${escapeHtml(itemLatin(item))}</p>
              ${badgesHtml(item)}
              ${region ? `<p><strong>${escapeHtml(t("regionLabel"))}:</strong> ${escapeHtml(region)}</p>` : ""}
              <p><strong>${escapeHtml(t("rememberLabel"))}:</strong> ${escapeHtml(itemQuizAngle(item))}</p>
              <p><strong>${escapeHtml(t("cautionLabel"))}:</strong> ${escapeHtml(itemSafety(item))}</p>
            </div>` : ""}
          <div class="row-actions">
            <button class="primary" data-action="reveal-flash">${state.flashRevealed ? escapeHtml(t("hideAnswer")) : escapeHtml(t("showAnswer"))}</button>
            <button class="secondary" data-action="known-flash">${escapeHtml(t("next"))}</button>
          </div>
        </div>
      </div>`;
  }

  // ----- Quiz -----

  // Name stems used to tell whether a fact names a given card ("smardz jadalny" -> "smard").
  function nameStems(item) {
    const stems = new Set();
    const names = [item.name_pl, itemName(item), ...itemSynonyms(item)];
    for (const name of names) {
      for (const word of String(name || "").split(/[\s/—–,()„”"-]+/)) {
        if (word.length < 5) continue;
        stems.add(word.slice(0, Math.max(4, word.length - 2)).toLocaleLowerCase("pl"));
      }
    }
    const genus = String(item.name_lat || "").split(/[\s,•]+/)[0];
    if (/^[A-Z][a-z]{3,}$/.test(genus)) stems.add(genus.toLowerCase());
    return [...stems];
  }

  function factMentions(fact, item) {
    const text = `${fact.pl || ""} ${fact.en || ""}`.toLocaleLowerCase("pl");
    return nameStems(item).some((stem) => text.includes(stem));
  }

  function lineageKey(item) {
    return String(item.name_lat || item.id).split(/[\s,•]+/)[0].toLowerCase();
  }

  function quizFactsFor(item, counts) {
    if (SOLEMN_CATEGORIES.has(item.category)) return [];
    // Legal-status lines and texts repeated on several cards would make the answer ambiguous.
    return itemFacts(item).filter((fact) => fact.icon !== "🛡️" && (counts.get(fact.pl) || 0) < 2 && factText(fact).length >= 40);
  }

  // True or false: "is this fact about <card>?". A false statement is always a real fact of another
  // card in the same collection, never an edited one. It must name its own card, must not name the
  // asked card and must come from another genus, so it cannot accidentally be true.
  function buildTrueFalseQuestion(selected, counts) {
    const own = quizFactsFor(selected, counts);
    if (!own.length) return null;
    let fact = own[randomIndex(own.length)];
    let owner = selected;
    if (Math.random() < 0.5) {
      const selectedTexts = new Set((factsEntry(selected)?.facts || []).map((entry) => entry.pl));
      const decoys = items()
        .filter((item) => item.id !== selected.id && lineageKey(item) !== lineageKey(selected))
        .flatMap((item) => quizFactsFor(item, counts)
          .filter((candidate) => !selectedTexts.has(candidate.pl) && factMentions(candidate, item) && !factMentions(candidate, selected))
          .map((candidate) => ({ item, fact: candidate })));
      if (decoys.length) {
        const decoy = decoys[randomIndex(decoys.length)];
        fact = decoy.fact;
        owner = decoy.item;
      }
    }
    const isTrue = owner.id === selected.id;
    return {
      type: "truefalse",
      correctId: isTrue ? "true" : "false",
      correctName: t(isTrue ? "quizTrue" : "quizFalse"),
      prompt: t("quizTrueFalsePrompt", { name: itemName(selected) }),
      fact,
      ownerName: itemName(owner),
      options: [{ id: "true", label: t("quizTrue") }, { id: "false", label: t("quizFalse") }]
    };
  }

  function buildQuestion(correct, counts = factTextCounts(activeCollection())) {
    const list = items();
    const selected = correct || sample(list, 1)[0];
    if (Math.random() < TRUE_FALSE_SHARE) {
      const trueFalse = buildTrueFalseQuestion(selected, counts);
      if (trueFalse) return trueFalse;
    }
    // A Latin name shared by several cards (e.g. many "Quercus robur" trees) would have more than one right answer.
    const latinIsUnique = list.filter((item) => item.name_lat === selected.name_lat).length === 1;
    const mode = Math.random() > 0.45 || !latinIsUnique ? "hook" : "latin";
    const prompt = mode === "hook"
      ? t("quizHookPrompt", { hook: itemHook(selected) })
      : t("quizLatinPrompt", { latin: itemLatin(selected) });
    const wrong = sample(list.filter((item) => item.id !== selected.id && itemHook(item) !== itemHook(selected)), 3);
    return {
      type: "choice",
      correctId: selected.id,
      correctName: itemName(selected),
      prompt,
      detail: itemQuizAngle(selected),
      options: shuffle([selected, ...wrong]).map((item) => ({ id: item.id, label: itemName(item) }))
    };
  }

  function buildQuestions() {
    const counts = factTextCounts(activeCollection());
    return sample(items(), Math.min(10, items().length)).map((item) => buildQuestion(item, counts));
  }

  function initQuiz() {
    state.quiz = {
      collectionId: state.collectionId,
      language: state.language,
      questions: buildQuestions(),
      index: 0,
      score: 0,
      answered: false,
      selectedId: null,
      finished: false
    };
    renderQuiz();
  }

  function answerButtonHtml(option, q, quiz) {
    const isCorrect = option.id === q.correctId;
    const isPicked = option.id === quiz.selectedId;
    const klass = !quiz.answered ? "" : isCorrect ? "is-correct" : isPicked ? "is-wrong" : "";
    const marker = !quiz.answered ? "" : isCorrect ? "✓ " : isPicked ? "✗ " : "";
    return `<button class="answer-btn ${klass}" data-action="answer-quiz" data-id="${escapeHtml(option.id)}" ${quiz.answered ? "disabled" : ""}>${marker ? `<span aria-hidden="true">${marker}</span>` : ""}${escapeHtml(option.label)}</button>`;
  }

  function quizFeedbackHtml(q) {
    if (q.type === "truefalse") {
      return `
        <div class="feedback">
          <strong>${escapeHtml(t("correctAnswer"))}:</strong> ${escapeHtml(q.correctName)}. ${escapeHtml(t("quizFactOwner", { name: q.ownerName }))}
          ${factSourcesHtml(q.fact)}
        </div>`;
    }
    return `<div class="feedback"><strong>${escapeHtml(t("correctAnswer"))}:</strong> ${escapeHtml(q.correctName)}. ${escapeHtml(q.detail)}</div>`;
  }

  function renderQuiz() {
    if (!state.quiz || state.quiz.collectionId !== state.collectionId || state.quiz.language !== state.language) initQuiz();
    const quiz = state.quiz;
    const box = $("#quizBox");
    if (quiz.finished) {
      box.innerHTML = `
        <div class="question-card">
          <p class="eyebrow">${escapeHtml(t("quizResult"))}</p>
          <h3>${quiz.score} / ${quiz.questions.length}</h3>
          <p>${escapeHtml(quiz.score >= 8 ? t("quizExcellent") : t("quizRetry"))}</p>
          <div class="row-actions">
            <button class="primary" data-action="restart-quiz">${escapeHtml(t("again"))}</button>
            <button class="secondary" data-go="learn">${escapeHtml(t("goLearn"))}</button>
          </div>
        </div>`;
      return;
    }
    const q = quiz.questions[quiz.index];
    const isTrueFalse = q.type === "truefalse";
    box.innerHTML = `
      <div class="quiz-progress"><span>${escapeHtml(t("questionCounter", { current: quiz.index + 1, total: quiz.questions.length }))}</span><span>${escapeHtml(t("scoreLabel", { score: quiz.score }))}</span></div>
      <div class="question-card${isTrueFalse ? " question-card--tf" : ""}">
        ${isTrueFalse ? `<p class="eyebrow">${escapeHtml(t("quizTrueFalseEyebrow"))}</p>` : ""}
        <h3>${escapeHtml(q.prompt)}</h3>
        ${isTrueFalse ? `
          <blockquote class="tf-fact">
            <span class="fact__icon" aria-hidden="true">${escapeHtml(q.fact.icon || FACT_ICON_FALLBACK)}</span>
            <span>${markdownLight(factText(q.fact))}</span>
          </blockquote>` : ""}
        <div class="answers${isTrueFalse ? " answers--tf" : ""}">
          ${q.options.map((option) => answerButtonHtml(option, q, quiz)).join("")}
        </div>
        ${quiz.answered ? quizFeedbackHtml(q) : ""}
        <div class="row-actions">
          ${quiz.answered ? `<button class="primary" data-action="next-quiz">${escapeHtml(quiz.index + 1 === quiz.questions.length ? t("finishQuiz") : t("nextQuestion"))}</button>` : ""}
          <button class="ghost" data-action="restart-quiz">${escapeHtml(t("restart"))}</button>
        </div>
      </div>`;
  }

  // ----- Sources -----

  function renderFactSources() {
    const node = $("#factSources");
    if (!node) return;
    const collection = activeCollection();
    const facts = items().flatMap((item) => itemFacts(item));
    if (!facts.length) {
      node.innerHTML = `<h3>${escapeHtml(t("factSourcesTitle"))}</h3><p>${escapeHtml(t("factSourcesEmpty"))}</p>`;
      return;
    }
    const statuses = { checked: 0, verified: 0, corrected: 0 };
    const domains = new Map();
    for (const fact of facts) {
      if (fact.status in statuses) statuses[fact.status] += 1;
      const hosts = new Set((fact.sources || []).map((source) => hostOf(source.url)).filter(Boolean));
      for (const host of hosts) domains.set(host, (domains.get(host) || 0) + 1);
    }
    const sorted = [...domains].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    const checkedOn = partsFromIso(collection.facts_checked);
    node.innerHTML = `
      <h3>${escapeHtml(t("factSourcesTitle"))}</h3>
      ${checkedOn ? `<p class="fact-sources__method">${escapeHtml(t("factSourcesMethod", { date: formatDate(checkedOn, { numeric: true }) }))}</p>` : ""}
      <p>${escapeHtml(t("factSourcesTotal", { count: tPlural("factCountForms", facts.length) }))}</p>
      <ul class="fact-status-list">
        <li>${escapeHtml(t("factStatusChecked"))}: <strong>${statuses.checked}</strong></li>
        <li>${escapeHtml(t("factStatusVerified"))}: <strong>${statuses.verified}</strong></li>
        <li>${escapeHtml(t("factStatusCorrected"))}: <strong>${statuses.corrected}</strong></li>
      </ul>
      <h4>${escapeHtml(t("factSourcesDomains"))}</h4>
      <ul class="domain-list">
        ${sorted.map(([host, count]) => `<li><span class="domain-list__host">${escapeHtml(host)}</span> <span class="domain-list__count">${count}</span></li>`).join("")}
      </ul>`;
  }

  function renderCredits() {
    const rows = items().map((item) => `
      <tr>
        <td><strong>${escapeHtml(itemName(item))}</strong><br><span class="latin">${escapeHtml(itemLatin(item))}</span></td>
        <td>${item.image ? `<a href="${escapeHtml(item.image)}" rel="noopener noreferrer" target="_blank">${escapeHtml(t("preview"))}</a>` : escapeHtml(t("missing"))}</td>
        <td>${item.image_author ? escapeHtml(item.image_author) : escapeHtml(t("missing"))}</td>
        <td>${item.image_license ? escapeHtml(item.image_license) : escapeHtml(t("missing"))}</td>
        <td>${item.image_source ? `<a href="${escapeHtml(item.image_source)}" rel="noopener noreferrer" target="_blank">${escapeHtml(t("creditSource").toLowerCase())}</a>` : escapeHtml(t("missing"))}</td>
      </tr>`).join("");
    $("#creditsTable").innerHTML = `
      <table>
        <thead><tr><th>${escapeHtml(t("creditSpecies"))}</th><th>${escapeHtml(t("creditFile"))}</th><th>${escapeHtml(t("creditAuthor"))}</th><th>${escapeHtml(t("creditLicense"))}</th><th>${escapeHtml(t("creditSource"))}</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  }

  // ----- Map of places -----

  // MapLibre GL 4.7.1 (not 5.x, which breaks iOS < 13.4) is vendored and loaded only when the map opens.
  // The dark OpenFreeMap style matches the page; the points are lit in the page's amber.
  const MAPLIBRE_BASE = "/vendor/maplibre-gl-4.7.1/";
  const MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/dark";
  const POLAND_BOUNDS = [[14.07, 48.99], [24.15, 54.84]];
  const MAP_LINKS = {
    wikidata: ["Wikidata", "https://www.wikidata.org/"],
    openfreemap: ["OpenFreeMap", "https://openfreemap.org/"],
    osm: ["OpenStreetMap", "https://www.openstreetmap.org/copyright"],
    maplibre: ["MapLibre GL JS 4.7.1", `${MAPLIBRE_BASE}LICENSE.txt`]
  };
  const mapState = { library: null, map: null, language: null, ready: false, collectionId: null, popup: null, pendingFocus: null };
  let mapLibraryPromise = null;

  function collectionPlaces(collection = activeCollection()) {
    return collection?.places || {};
  }

  function hasPlaces(collection = activeCollection()) {
    return Object.keys(collectionPlaces(collection)).length > 0;
  }

  function placedItems(collection = activeCollection()) {
    const places = collectionPlaces(collection);
    return (collection?.items || []).filter((item) => places[item.id]);
  }

  function updateMapNav() {
    $('.nav-btn[data-view="map"]')?.classList.toggle("is-hidden", !hasPlaces());
  }

  // Resolves with the global the script sets; a failed script is removed, so the next try loads it again.
  function loadScript(src, global) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => (window[global] ? resolve(window[global]) : reject(new Error(`${global} is missing`)));
      script.onerror = () => {
        script.remove();
        reject(new Error(`${src} did not load`));
      };
      document.head.appendChild(script);
    });
  }

  function loadMapLibrary() {
    if (window.maplibregl) return Promise.resolve(window.maplibregl);
    if (mapLibraryPromise) return mapLibraryPromise;
    if (!document.querySelector("link[data-maplibre]")) {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = `${MAPLIBRE_BASE}maplibre-gl.css`;
      css.dataset.maplibre = "";
      document.head.appendChild(css);
    }
    mapLibraryPromise = loadScript(`${MAPLIBRE_BASE}maplibre-gl.js`, "maplibregl").catch((error) => {
      mapLibraryPromise = null;
      throw error;
    });
    return mapLibraryPromise;
  }

  function webglAvailable() {
    try {
      const canvas = document.createElement("canvas");
      return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      return false;
    }
  }

  function mapLocale() {
    return {
      "CooperativeGesturesHandler.WindowsHelpText": t("mapGesturesDesktop"),
      "CooperativeGesturesHandler.MacHelpText": t("mapGesturesMac"),
      "CooperativeGesturesHandler.MobileHelpText": t("mapGesturesMobile"),
      "NavigationControl.ZoomIn": t("mapZoomIn"),
      "NavigationControl.ZoomOut": t("mapZoomOut"),
      "NavigationControl.ResetBearing": t("mapResetBearing"),
      "AttributionControl.ToggleAttribution": t("mapToggleAttribution"),
      "Popup.Close": t("mapPopupClose"),
      "Map.Title": t("mapCanvas")
    };
  }

  function placesGeoJson(collection = activeCollection()) {
    const places = collectionPlaces(collection);
    return {
      type: "FeatureCollection",
      features: placedItems(collection).map((item) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [places[item.id].lng, places[item.id].lat] },
        properties: { id: item.id }
      }))
    };
  }

  function showStatus(selector, message) {
    const node = $(selector);
    node.textContent = message;
    node.classList.toggle("is-visible", Boolean(message));
  }

  function setMapStatus(message) {
    showStatus("#mapStatus", message);
  }

  function mapSourceNoteHtml() {
    const links = Object.fromEntries(Object.entries(MAP_LINKS).map(([key, [label, href]]) =>
      [key, `<a href="${escapeHtml(href)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`]));
    return escapeHtml(uiValue("mapSourceNote")).replace(/\{(\w+)\}/g, (_, key) => links[key] || "");
  }

  function renderPlaceList() {
    const collection = activeCollection();
    const list = placedItems(collection);
    const total = collection?.items?.length || 0;
    const missing = list.length < total ? ` ${t("mapMissing")}` : "";
    $("#placeList").innerHTML = `
      <h3>${escapeHtml(t("mapListTitle"))}</h3>
      <p class="place-list__count">${escapeHtml(t("mapCount", { count: list.length, total }) + missing)}</p>
      <ol class="place-list__items">
        ${list.map((item) => `
          <li>
            <span class="place-list__text">
              <button class="place-list__name" type="button" data-action="map-focus" data-id="${escapeHtml(item.id)}">${escapeHtml(itemName(item))}</button>
              <span class="latin">${escapeHtml(itemLatin(item))}</span>
            </span>
            <button class="secondary place-list__card" type="button" data-action="details" data-id="${escapeHtml(item.id)}">${escapeHtml(t("mapOpenCard"))}</button>
          </li>`).join("")}
      </ol>`;
  }

  function popupHtml(ids) {
    const entries = ids.map((id) => byId(id)).filter(Boolean);
    if (entries.length === 1) {
      const [item] = entries;
      return `
        <div class="map-popup">
          <strong class="map-popup__name">${escapeHtml(itemName(item))}</strong>
          <span class="latin">${escapeHtml(itemLatin(item))}</span>
          <button class="primary map-popup__open" type="button" data-action="details" data-id="${escapeHtml(item.id)}">${escapeHtml(t("mapOpenCard"))}</button>
        </div>`;
    }
    return `
      <div class="map-popup">
        <strong class="map-popup__name">${escapeHtml(t("mapHere"))}</strong>
        <ul class="map-popup__list">
          ${entries.map((item) => `<li><button type="button" data-action="details" data-id="${escapeHtml(item.id)}">${escapeHtml(itemName(item))}</button></li>`).join("")}
        </ul>
      </div>`;
  }

  function selectPlaces(ids) {
    mapState.map?.setFilter("places-selected", ["in", ["get", "id"], ["literal", ids]]);
  }

  function showPlacePopup(ids, lngLat) {
    const { library: lib, map } = mapState;
    if (!lib || !map) return;
    mapState.popup?.remove();
    // No focus jump into the popup: during flyTo it can sit outside the visible map and the page would
    // scroll after it. Keyboard users have the same buttons in the list under the map.
    const popup = new lib.Popup({ maxWidth: "270px", offset: 12, focusAfterOpen: false })
      .setLngLat(lngLat)
      .setHTML(popupHtml(ids))
      .addTo(map);
    popup.on("close", () => {
      if (mapState.popup === popup) {
        mapState.popup = null;
        selectPlaces([]);
      }
    });
    mapState.popup = popup;
    selectPlaces(ids);
  }

  function focusPlace(id) {
    const place = collectionPlaces()[id];
    if (!place) return;
    // Without a working map the list still leads to the card.
    if (!mapState.ready) {
      showDialog(id);
      return;
    }
    const lngLat = [place.lng, place.lat];
    mapState.map.flyTo({ center: lngLat, zoom: Math.max(mapState.map.getZoom(), 9) });
    showPlacePopup([id], lngLat);
    $("#placeMap").scrollIntoView({ block: "nearest" });
  }

  function fitPlaces() {
    const { features } = placesGeoJson();
    if (!features.length) return;
    const bounds = new mapState.library.LngLatBounds();
    features.forEach((feature) => bounds.extend(feature.geometry.coordinates));
    mapState.map.fitBounds(bounds, { padding: 40, maxZoom: 9, duration: 0 });
  }

  function syncMapCollection() {
    if (!mapState.ready) return;
    const changed = mapState.collectionId !== state.collectionId;
    mapState.collectionId = state.collectionId;
    mapState.map.getSource("places")?.setData(placesGeoJson());
    if (changed) {
      mapState.popup?.remove();
      fitPlaces();
    }
    if (mapState.pendingFocus) {
      const id = mapState.pendingFocus;
      mapState.pendingFocus = null;
      focusPlace(id);
    }
  }

  function onMapClick(event) {
    const { x, y } = event.point;
    // A finger is wider than a dot, so a small box around the tap picks up every point under it.
    const hits = mapState.map.queryRenderedFeatures([[x - 12, y - 12], [x + 12, y + 12]], { layers: ["places-dot"] });
    const ids = [...new Set(hits.map((feature) => feature.properties.id))];
    if (ids.length) showPlacePopup(ids, hits[0].geometry.coordinates);
  }

  // Both maps: the dark base map over Poland, moved with two fingers (or Ctrl and scroll), never rotated.
  function baseMap(lib, container, options = {}) {
    const map = new lib.Map({
      container,
      style: MAP_STYLE_URL,
      bounds: POLAND_BOUNDS,
      fitBoundsOptions: { padding: 16 },
      cooperativeGestures: true,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
      attributionControl: { compact: true },
      locale: mapLocale(),
      ...options
    });
    map.touchZoomRotate.disableRotation();
    map.addControl(new lib.NavigationControl({ showCompass: false }), "top-right");
    return map;
  }

  // The base map mixes local, English and bilingual names; labels follow the atlas language instead,
  // with the local name where the map has no translation.
  function localizeLabels(map) {
    map.getStyle().layers.forEach((layer) => {
      const field = layer.layout?.["text-field"];
      if (field && JSON.stringify(field).includes("name")) {
        map.setLayoutProperty(layer.id, "text-field", ["coalesce", ["get", `name:${state.language}`], ["get", "name:latin"], ["get", "name"]]);
      }
    });
  }

  // Places are lit in the page's amber; a chosen place turns ivory.
  const PLACE_DOT = { "circle-radius": 7, "circle-color": "#e9a43b", "circle-stroke-color": "#0c110f", "circle-stroke-width": 2 };
  const PLACE_SELECTED = { "circle-radius": 10, "circle-color": "#ece6d8", "circle-stroke-color": "#e9a43b", "circle-stroke-width": 3 };

  function createMap(lib) {
    const map = baseMap(lib, "placeMap");
    map.on("load", () => {
      localizeLabels(map);
      map.addSource("places", { type: "geojson", data: placesGeoJson() });
      map.addLayer({ id: "places-dot", type: "circle", source: "places", paint: PLACE_DOT });
      map.addLayer({
        id: "places-selected",
        type: "circle",
        source: "places",
        filter: ["in", ["get", "id"], ["literal", []]],
        paint: PLACE_SELECTED
      });
      map.on("click", onMapClick);
      map.on("mouseenter", "places-dot", () => { map.getCanvas().style.cursor = "pointer"; });
      map.on("mouseleave", "places-dot", () => { map.getCanvas().style.cursor = ""; });
      mapState.ready = true;
      setMapStatus("");
      syncMapCollection();
    });
    // Without a listener MapLibre logs every error to the console. Before the first load an error
    // means the base map is missing; a single tile failing later is not worth a message.
    map.on("error", () => {
      if (!mapState.ready) setMapStatus(t("mapBaseError"));
    });
    return map;
  }

  async function renderMap() {
    const collection = activeCollection();
    $("#placeMap").setAttribute("aria-label", t("mapLabel", { collection: collectionText(collection, "title") }));
    $("#mapSourceNote").innerHTML = mapSourceNoteHtml();
    renderPlaceList();
    if (!webglAvailable()) {
      mapState.pendingFocus = null;
      setMapStatus(t("mapNoWebgl"));
      return;
    }
    if (mapState.map && mapState.language !== state.language) {
      // MapLibre takes the labels of its controls when it is created, so a language switch rebuilds the map.
      // The state is cleared first, so the closing popup does not touch the map being removed.
      const previous = mapState.map;
      Object.assign(mapState, { map: null, ready: false, collectionId: null, popup: null });
      previous.remove();
    }
    if (mapState.map) {
      mapState.map.resize();
      syncMapCollection();
      return;
    }
    setMapStatus(t("mapLoading"));
    try {
      mapState.library = await loadMapLibrary();
    } catch {
      setMapStatus(t("mapLoadError"));
      return;
    }
    if (state.view !== "map" || mapState.map) return;
    mapState.language = state.language;
    mapState.map = createMap(mapState.library);
  }

  // ----- Map of every place in the atlas (/mapa) -----

  // The page shows every place before any collection loads, so it reads copies of the map points and of
  // the card names from data/map-points.js (scripts/build-map-points.mjs). A card opens in its collection,
  // as from the start page, and back in history returns to the map as it was left.
  const NEAR_COUNT = 10;
  const allMap = {
    points: null, loading: null, map: null, language: null, ready: false, popup: null,
    filter: "all", me: null, fitMe: false, locating: false, nearStatus: "", scrollY: 0, listLanguage: null
  };

  function isAllMapRoute(path = window.location.pathname) {
    return normalizedPath(path) === ALL_MAP_ROUTE;
  }

  function loadMapPoints() {
    if (allMap.points) return Promise.resolve(allMap.points);
    if (!allMap.loading) {
      allMap.loading = loadScript("/data/map-points.js", "ATLAS_MAP_POINTS")
        .then((points) => (allMap.points = points))
        .finally(() => { allMap.loading = null; });
    }
    return allMap.loading;
  }

  // The collections with places, in the order of the drawers.
  function placeCollections() {
    const ids = new Set(allMap.points.places.flatMap((place) => place.cards.map((card) => card.collection)));
    return app.collections.filter((collection) => ids.has(collection.id));
  }

  // The cards of a place that the chosen collection keeps on the map.
  function shownCards(place) {
    return allMap.filter === "all" ? place.cards : place.cards.filter((card) => card.collection === allMap.filter);
  }

  function shownPlaces() {
    return allMap.points.places.filter((place) => shownCards(place).length);
  }

  function placeByQ(q) {
    return allMap.points.places.find((place) => place.q === q);
  }

  function pointGeoJson(points) {
    return {
      type: "FeatureCollection",
      features: points.map(({ lng, lat, q }) => ({ type: "Feature", geometry: { type: "Point", coordinates: [lng, lat] }, properties: { q } }))
    };
  }

  function cardCollectionTitle(card) {
    return collectionText(collectionById(card.collection), "title");
  }

  // A card opens at its own address, so a link from the map also works in a new tab.
  function cardLinkAttributes(card) {
    return `href="${escapeHtml(cardPath(collectionById(card.collection), card))}" data-action="open-card" data-collection="${escapeHtml(card.collection)}" data-id="${escapeHtml(card.id)}"`;
  }

  function allMapPopupHtml(places) {
    const cards = places.flatMap(shownCards);
    if (cards.length === 1) {
      const [card] = cards;
      return `
        <div class="map-popup">
          <span class="map-popup__collection">${escapeHtml(cardCollectionTitle(card))}</span>
          <strong class="map-popup__name">${escapeHtml(localized(card.name))}</strong>
          <a class="primary map-popup__open" ${cardLinkAttributes(card)}>${escapeHtml(t("mapOpenCard"))}</a>
        </div>`;
    }
    // Cards of one collection name it once, above the list; mixed ones name it under each card.
    const shared = new Set(cards.map((card) => card.collection)).size === 1;
    return `
      <div class="map-popup">
        ${shared ? `<span class="map-popup__collection">${escapeHtml(cardCollectionTitle(cards[0]))}</span>` : ""}
        <strong class="map-popup__name">${escapeHtml(t("mapHere"))}</strong>
        <ul class="map-popup__cards">
          ${cards.map((card) => `<li><a ${cardLinkAttributes(card)}>${escapeHtml(localized(card.name))}</a>${shared ? "" : ` <span class="map-popup__collection">${escapeHtml(cardCollectionTitle(card))}</span>`}</li>`).join("")}
        </ul>
      </div>`;
  }

  // A place with a popup moves below the middle of the map, so the popup opens above it and fits.
  function moveUnderPopup(place, options = {}) {
    const { map } = allMap;
    map.flyTo({ center: [place.lng, place.lat], offset: [0, Math.round(map.getContainer().clientHeight * 0.25)], ...options });
  }

  function selectAllMapPlaces(qs) {
    allMap.map?.setFilter("all-selected", ["in", ["get", "q"], ["literal", qs]]);
  }

  function showAllMapPopup(places) {
    const { library: lib } = mapState;
    const { map } = allMap;
    if (!lib || !map) return;
    allMap.popup?.remove();
    // As on the collection map, the popup does not take the focus; the lists under the map have the same links.
    const popup = new lib.Popup({ maxWidth: "280px", offset: 12, focusAfterOpen: false })
      .setLngLat([places[0].lng, places[0].lat])
      .setHTML(allMapPopupHtml(places))
      .addTo(map);
    popup.on("close", () => {
      if (allMap.popup === popup) {
        allMap.popup = null;
        selectAllMapPlaces([]);
      }
    });
    allMap.popup = popup;
    selectAllMapPlaces(places.map((place) => place.q));
  }

  function onAllMapClick(event) {
    const { map } = allMap;
    const { x, y } = event.point;
    const hits = map.queryRenderedFeatures([[x - 12, y - 12], [x + 12, y + 12]], { layers: ["all-dot"] });
    const places = [...new Set(hits.map((feature) => feature.properties.q))].map(placeByQ).filter(Boolean);
    if (!places.length) return;
    const cards = places.flatMap(shownCards).length;
    // Where the points crowd together, a tap first zooms in, so a popup never lists half a city.
    if (cards > 4 && map.getZoom() < 12) {
      map.easeTo({ center: event.lngLat, zoom: Math.min(map.getZoom() + 2, 12) });
      return;
    }
    showAllMapPopup(places);
    // A list of cards is taller than a single card, so it gets room above its place.
    if (cards > 1) moveUnderPopup(places[0]);
  }

  function focusAllMapPlace(target) {
    const place = placeByQ(target.dataset.q);
    if (!place) return;
    // Without a working map the list still leads to the card.
    if (!allMap.ready) {
      openCard(target.dataset.collection, target.dataset.id);
      return;
    }
    moveUnderPopup(place, { zoom: Math.max(allMap.map.getZoom(), 10) });
    showAllMapPopup([place]);
    $("#allMap").scrollIntoView({ block: "nearest" });
  }

  function fitAllPlaces(options = {}) {
    if (allMap.filter === "all") {
      allMap.map.fitBounds(POLAND_BOUNDS, { padding: 16, ...options });
      return;
    }
    const bounds = new mapState.library.LngLatBounds();
    shownPlaces().forEach((place) => bounds.extend([place.lng, place.lat]));
    allMap.map.fitBounds(bounds, { padding: 40, maxZoom: 9, ...options });
  }

  function renderAllMapFilters() {
    const chips = [["all", t("allMapAll")], ...placeCollections().map((collection) => [collection.id, collectionText(collection, "title")])];
    $("#allMapFilters").innerHTML = chips.map(([id, label]) =>
      `<button class="chip${allMap.filter === id ? " is-active" : ""}" type="button" data-action="all-map-filter" data-collection="${escapeHtml(id)}" aria-pressed="${allMap.filter === id}">${escapeHtml(label)}</button>`).join("");
  }

  function setAllMapFilter(id) {
    if (id === allMap.filter) return;
    allMap.filter = id;
    // The chips stay in place, so the focus stays on the one just pressed.
    $$("#allMapFilters .chip").forEach((chip) => {
      chip.classList.toggle("is-active", chip.dataset.collection === id);
      chip.setAttribute("aria-pressed", String(chip.dataset.collection === id));
    });
    allMap.popup?.remove();
    renderAllPlaceList();
    renderNearList();
    renderNearStatus();
    if (allMap.ready) {
      allMap.map.getSource("all-places").setData(pointGeoJson(shownPlaces()));
      fitAllPlaces();
    }
  }

  function placeRowHtml(card, place, meta = "") {
    return `
      <li>
        <span class="place-list__text">
          <button class="place-list__name" type="button" data-action="all-map-focus" data-q="${escapeHtml(place.q)}" data-collection="${escapeHtml(card.collection)}" data-id="${escapeHtml(card.id)}">${escapeHtml(localized(card.name))}</button>
          ${meta ? `<span class="place-list__meta">${escapeHtml(meta)}</span>` : ""}
        </span>
        <a class="secondary place-list__card" ${cardLinkAttributes(card)}>${escapeHtml(t("mapOpenCard"))}</a>
      </li>`;
  }

  // Every card with a place, by collection: the way to the places without the map, and from the keyboard.
  function renderAllPlaceList() {
    const collator = new Intl.Collator(state.language);
    const collections = placeCollections().filter((collection) => allMap.filter === "all" || collection.id === allMap.filter);
    $("#allPlaceList").innerHTML = `
      <h2 class="place-list__title">${escapeHtml(t("allMapListTitle"))}</h2>
      <p class="place-list__count">${escapeHtml(t("allMapListNote"))}</p>
      ${collections.map((collection) => {
        const rows = allMap.points.places
          .flatMap((place) => place.cards.filter((card) => card.collection === collection.id).map((card) => ({ card, place })))
          .sort((a, b) => collator.compare(localized(a.card.name), localized(b.card.name)));
        return `
          <details class="place-group"${allMap.filter === collection.id ? " open" : ""}>
            <summary><span class="place-group__name">${escapeHtml(collectionText(collection, "title"))}</span> <span class="place-group__count">${escapeHtml(tPlural("cardCountForms", rows.length))}</span></summary>
            <ol class="place-list__items">${rows.map(({ card, place }) => placeRowHtml(card, place)).join("")}</ol>
          </details>`;
      }).join("")}`;
  }

  // ----- "Blisko mnie": the nearest places, worked out in the browser -----

  // Straight-line (great-circle) distance in kilometres.
  function distanceKm(a, b) {
    const rad = Math.PI / 180;
    const h = Math.sin(((b.lat - a.lat) * rad) / 2) ** 2 +
      Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(((b.lng - a.lng) * rad) / 2) ** 2;
    return 2 * 6371 * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  // Tenths of a kilometre close by, whole kilometres further away.
  function formatDistance(km) {
    return t("distanceKm", { distance: km.toLocaleString(state.language, { maximumFractionDigits: km < 10 ? 1 : 0 }) });
  }

  // The nearest cards of the chosen collections; a place with two cards gives two rows.
  function nearestCards() {
    if (!allMap.me || !allMap.points) return [];
    return shownPlaces()
      .map((place) => ({ place, km: distanceKm(allMap.me, place) }))
      .sort((a, b) => a.km - b.km)
      .flatMap(({ place, km }) => shownCards(place).map((card) => ({ card, place, km })))
      .slice(0, NEAR_COUNT);
  }

  function renderNearList() {
    const rows = nearestCards();
    const node = $("#nearList");
    node.classList.toggle("is-hidden", !rows.length);
    node.innerHTML = rows.length ? `
      <h2 class="place-list__title">${escapeHtml(t("nearMeTitle"))}</h2>
      <p class="place-list__count">${escapeHtml(t("nearMeNote"))}</p>
      <ol class="place-list__items">
        ${rows.map(({ card, place, km }) => placeRowHtml(card, place, `${formatDistance(km)} · ${cardCollectionTitle(card)}`)).join("")}
      </ol>` : "";
  }

  // The status line under the button, kept as a key so it follows a change of language or collection.
  function renderNearStatus() {
    let message = allMap.nearStatus ? t(allMap.nearStatus) : "";
    if (allMap.nearStatus === "nearMeFound") {
      const [nearest] = nearestCards();
      message = nearest ? t("nearMeFound", { name: localized(nearest.card.name), distance: formatDistance(nearest.km) }) : "";
    }
    showStatus("#nearMeStatus", message);
  }

  function setNearStatus(key) {
    allMap.nearStatus = key;
    renderNearStatus();
  }

  function locateMe(button) {
    if (allMap.locating) return;
    if (!navigator.geolocation) {
      setNearStatus("nearMeUnsupported");
      return;
    }
    allMap.locating = true;
    button.setAttribute("aria-busy", "true");
    setNearStatus("nearMeLooking");
    const done = () => {
      allMap.locating = false;
      button.removeAttribute("aria-busy");
    };
    navigator.geolocation.getCurrentPosition((position) => {
      done();
      // The position stays in this page's memory, for the distances; nothing stores or sends it.
      allMap.me = { lat: position.coords.latitude, lng: position.coords.longitude };
      allMap.fitMe = true;
      renderNearList();
      setNearStatus("nearMeFound");
      showMe();
    }, (error) => {
      done();
      // Code 1 is PERMISSION_DENIED; the others are a position that could not be found in time.
      setNearStatus(error?.code === 1 ? "nearMeDenied" : "nearMeError");
    }, { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 });
  }

  // The blue dot; right after "Blisko mnie" the view takes in it and the three nearest places.
  function showMe() {
    if (!allMap.ready) return;
    allMap.map.getSource("me").setData(pointGeoJson(allMap.me ? [{ ...allMap.me, q: "me" }] : []));
    if (!allMap.me || !allMap.fitMe) return;
    allMap.fitMe = false;
    const here = [allMap.me.lng, allMap.me.lat];
    const bounds = new mapState.library.LngLatBounds(here, here);
    nearestCards().slice(0, 3).forEach(({ place }) => bounds.extend([place.lng, place.lat]));
    allMap.map.fitBounds(bounds, { padding: 60, maxZoom: 11 });
  }

  function createAllMap(lib, camera) {
    // After a change of language the new map opens where the old one was.
    const map = baseMap(lib, "allMap", camera ? { bounds: undefined, ...camera } : {});
    map.on("load", () => {
      localizeLabels(map);
      map.addSource("all-places", { type: "geojson", data: pointGeoJson(shownPlaces()) });
      // Over the whole country the dots are smaller, where they crowd; close up they are full size.
      map.addLayer({ id: "all-dot", type: "circle", source: "all-places", paint: { ...PLACE_DOT, "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 5, 9, 7] } });
      map.addLayer({ id: "all-selected", type: "circle", source: "all-places", filter: ["in", ["get", "q"], ["literal", []]], paint: PLACE_SELECTED });
      map.addSource("me", { type: "geojson", data: pointGeoJson([]) });
      map.addLayer({ id: "me-halo", type: "circle", source: "me", paint: { "circle-radius": 16, "circle-color": "#5aa9e6", "circle-opacity": 0.25 } });
      map.addLayer({ id: "me-dot", type: "circle", source: "me", paint: { "circle-radius": 7, "circle-color": "#5aa9e6", "circle-stroke-color": "#ece6d8", "circle-stroke-width": 2 } });
      map.on("click", onAllMapClick);
      map.on("mouseenter", "all-dot", () => { map.getCanvas().style.cursor = "pointer"; });
      map.on("mouseleave", "all-dot", () => { map.getCanvas().style.cursor = ""; });
      allMap.ready = true;
      showStatus("#allMapStatus", "");
      // A collection chosen while the map was loading.
      if (!camera && allMap.filter !== "all") fitAllPlaces({ duration: 0 });
      showMe();
    });
    map.on("error", () => {
      if (!allMap.ready) showStatus("#allMapStatus", t("mapBaseError"));
    });
    return map;
  }

  function renderAllMapChrome() {
    const places = start.stats?.places;
    $("#allMapEyebrow").textContent = places ? t("allMapEyebrow", { places: tPlural("placeCountForms", places) }) : t("allMapDocumentTitle");
    $("#allMapTitle").innerHTML = markdownLight(t("allMapTitle"));
    setText("#allMapLead", "allMapLead");
    setText("#nearMeButton", "nearMe");
    setText("#nearMePrivacy", "nearMePrivacy");
    $("#allMapFilters").setAttribute("aria-label", t("allMapFiltersLabel"));
    $("#allMap").setAttribute("aria-label", t("allMapLabel"));
    $("#allMapSourceNote").innerHTML = mapSourceNoteHtml();
  }

  async function renderAllMapPage() {
    try {
      await loadMapPoints();
    } catch {
      showStatus("#allMapStatus", t("allMapLoadError"));
      return;
    }
    if (state.page !== "map") return;
    // The lists are built once per language, so coming back finds them as they were left, groups open.
    if (allMap.listLanguage !== state.language) {
      allMap.listLanguage = state.language;
      renderAllMapFilters();
      renderAllPlaceList();
      renderNearList();
      renderNearStatus();
    }
    if (!webglAvailable()) {
      showStatus("#allMapStatus", t("mapNoWebgl"));
      return;
    }
    let camera = null;
    if (allMap.map && allMap.language !== state.language) {
      // As on the collection map, a language switch rebuilds the map; the state is cleared first.
      const previous = allMap.map;
      camera = { center: previous.getCenter(), zoom: previous.getZoom() };
      Object.assign(allMap, { map: null, ready: false, popup: null });
      previous.remove();
    }
    if (allMap.map) {
      allMap.map.resize();
      return;
    }
    showStatus("#allMapStatus", t("mapLoading"));
    try {
      mapState.library = await loadMapLibrary();
    } catch {
      showStatus("#allMapStatus", t("mapLoadError"));
      return;
    }
    if (state.page !== "map" || allMap.map) return;
    allMap.language = state.language;
    allMap.map = createAllMap(mapState.library, camera);
  }

  function activateView(view) {
    if (view === "map" && !hasPlaces()) view = "atlas";
    state.view = view;
    $$(".nav-btn").forEach((btn) => btn.classList.toggle("is-active", btn.dataset.view === view));
    $$(".view").forEach((section) => section.classList.toggle("is-active", section.id === view));
    $("#main").focus({ preventScroll: true });
    if (view === "atlas") renderAtlas();
    if (view === "map") renderMap();
    if (view === "learn") renderFlashcard();
    if (view === "quiz") renderQuiz();
    if (view === "sources") {
      renderFactSources();
      renderCredits();
    }
  }

  let selectionSerial = 0;

  async function selectCollection(id, options = {}) {
    const collection = app.collections.find((entry) => entry.id === id) || app.collections[0];
    const serial = ++selectionSerial;
    state.collectionId = collection.id;
    state.category = "all";
    state.search = "";
    state.flashRevealed = false;
    state.quiz = null;
    $("#searchInput").value = "";
    // The start page or the map gives way to the opened collection, which starts at the top of the page.
    showPage("collection");
    window.scrollTo(0, 0);
    updateActiveCollectionLabels();

    const needsLoad = !collection._loaded && typeof app.loadCollection === "function";
    if (needsLoad) {
      const loadingLabel = state.language === "en"
        ? "Loading collection data…"
        : "Wczytuję dane kolekcji…";
      $("#statsGrid").innerHTML = "";
      $("#atlasGrid").innerHTML = `<div class="empty-state">${escapeHtml(loadingLabel)}</div>`;
      try {
        await app.loadCollection(collection.id);
      } catch (err) {
        if (selectionSerial !== serial) return;
        const errorLabel = state.language === "en"
          ? "Could not load the collection. Check your connection and try again."
          : "Nie udało się załadować kolekcji. Sprawdź połączenie i odśwież.";
        $("#atlasGrid").innerHTML = `<div class="empty-state">${escapeHtml(errorLabel)}</div>`;
        return;
      }
      if (selectionSerial !== serial) return;
    }

    state.flashIndex = randomIndex(collection.items.length);
    updateActiveCollectionLabels();
    updateMapNav();
    activateView("atlas");
    if (options.updateRoute !== false) pushRoute(routeForCollection(collection), { collectionId: collection.id });
    syncDialogFromRoute();
  }

  // Which page shows: the start page, an opened collection or the map of every place.
  function showPage(page) {
    // Back from a card returns to the same spot of the map page.
    if (state.page === "map" && page !== "map") allMap.scrollY = window.scrollY;
    state.page = page;
    $("#startPage").classList.toggle("is-hidden", page !== "start");
    $("#mapPage").classList.toggle("is-hidden", page !== "map");
    $("#main").classList.toggle("is-hidden", page !== "collection");
    $(".app-nav").classList.toggle("is-hidden", page !== "collection");
    $("#skipLink").setAttribute("href", page === "map" ? "#mapPage" : "#main");
    if (page === "map") $("#mapLink").setAttribute("aria-current", "page");
    else $("#mapLink").removeAttribute("aria-current");
  }

  // Back to the start page: the wordmark goes to its top, every other way leads to the drawers.
  function showCollections(options = {}) {
    // A collection still loading does not open over the start page afterwards.
    selectionSerial += 1;
    state.collectionId = null;
    showPage("start");
    if ($("#itemDialog").open) $("#itemDialog").close?.();
    updateDocumentTitle();
    if (options.top) window.scrollTo({ top: 0, behavior: "smooth" });
    else $("#collectionPicker").scrollIntoView({ behavior: "smooth", block: "start" });
    if (options.updateRoute !== false) pushRoute("/", { collectionId: null });
  }

  // The map of every place, at /mapa. A link opens it at the top; back in history, where it was left.
  function showMapPage(options = {}) {
    selectionSerial += 1;
    state.collectionId = null;
    showPage("map");
    if ($("#itemDialog").open) $("#itemDialog").close?.();
    updateDocumentTitle();
    window.scrollTo(0, options.updateRoute === false ? allMap.scrollY : 0);
    $("#mapPage").focus({ preventScroll: true });
    if (options.updateRoute !== false) pushRoute(ALL_MAP_ROUTE, { collectionId: null });
    renderAllMapPage();
  }

  function setLanguage(language) {
    if (!languageIds.includes(language)) return;
    state.language = language;
    try {
      window.localStorage.setItem("atlasLanguage", language);
    } catch {
      // Local storage is optional; the switch still works for the current page.
    }
    state.quiz = null;
    renderChrome();
    if (state.collectionId) {
      activateView(state.view);
    }
    if (state.page === "map") renderAllMapPage();
    const dialog = $("#itemDialog");
    if (dialog?.open && dialog.dataset.itemId) {
      const item = byId(dialog.dataset.itemId);
      if (item) renderDialogContent(item);
    }
  }

  function handleAction(action, target) {
    const id = target.dataset.id;
    if (action === "set-language") setLanguage(target.dataset.language);
    if (action === "select-collection") selectCollection(target.dataset.collection);
    if (action === "show-collections") showCollections();
    if (action === "go-home") showCollections({ top: true });
    if (action === "go-map") showMapPage();
    if (action === "all-map-filter") setAllMapFilter(target.dataset.collection);
    if (action === "all-map-focus") focusAllMapPlace(target);
    if (action === "near-me") locateMe(target);
    if (action === "surprise") surprise(target);
    if (action === "details") showDialog(id);
    if (action === "open-card") openCard(target.dataset.collection, id);
    if (action === "share-card") shareCard(target.dataset.collection, id);
    if (action === "copy-card-link") copyCardLink(target.href);
    if (action === "learn-item") {
      const index = items().findIndex((item) => item.id === id);
      state.flashIndex = index >= 0 ? index : state.flashIndex;
      state.flashRevealed = true;
      $("#itemDialog").close?.();
      activateView("learn");
    }
    if (action === "close-dialog") $("#itemDialog").close?.();
    if (action === "show-on-map") {
      mapState.pendingFocus = id;
      $("#itemDialog").close?.();
      activateView("map");
    }
    if (action === "map-focus") focusPlace(id);
    if (action === "reveal-flash") { state.flashRevealed = !state.flashRevealed; renderFlashcard(); }
    if (action === "known-flash") { state.flashIndex = randomIndex(items().length); state.flashRevealed = false; renderFlashcard(); }
    if (action === "restart-quiz") { state.quiz = null; initQuiz(); }
    if (action === "answer-quiz") {
      const quiz = state.quiz;
      if (!quiz || quiz.answered) return;
      const q = quiz.questions[quiz.index];
      quiz.answered = true;
      quiz.selectedId = id;
      if (id === q.correctId) quiz.score += 1;
      renderQuiz();
    }
    if (action === "next-quiz") {
      const quiz = state.quiz;
      if (quiz.index + 1 >= quiz.questions.length) quiz.finished = true;
      else { quiz.index += 1; quiz.answered = false; quiz.selectedId = null; }
      renderQuiz();
    }
  }

  function isPlainClick(event) {
    return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const go = event.target.closest("[data-go]");
      if (go) activateView(go.dataset.go);

      const nav = event.target.closest(".nav-btn[data-view]");
      if (nav) {
        activateView(nav.dataset.view);
        // From the stuck navigation the new view starts at its top, right under the navigation.
        const navTop = $(".app-main__body").getBoundingClientRect().top + window.scrollY - $("#appNav").offsetHeight;
        if (window.scrollY > navTop) window.scrollTo(0, navTop);
      }

      const chip = event.target.closest(".chip[data-category]");
      if (chip) { state.category = chip.dataset.category; renderAtlas(); }

      const action = event.target.closest("[data-action]");
      if (action) {
        // Links keep their href for new tabs and copying; a plain click is handled in the app.
        if (action.tagName === "A") {
          if (!isPlainClick(event)) return;
          event.preventDefault();
        }
        handleAction(action.dataset.action, action);
      }

      if (event.target.matches(".dialog-close")) $("#itemDialog").close?.();
    });

    $("#searchInput").addEventListener("input", (event) => {
      state.search = event.target.value;
      renderAtlas();
    });

    $("#itemDialog").addEventListener("click", (event) => {
      const dialog = event.currentTarget;
      const rect = dialog.getBoundingClientRect();
      const clickedBackdrop = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (clickedBackdrop) dialog.close?.();
    });

    $("#itemDialog").addEventListener("close", () => {
      clearItemRoute();
      updateDocumentTitle();
    });

    window.addEventListener("hashchange", () => {
      if (!state.collectionId) return;
      syncDialogFromRoute();
    });

    window.addEventListener("popstate", () => {
      if (isAllMapRoute()) {
        showMapPage({ updateRoute: false });
        return;
      }
      const collection = collectionFromRoute();
      if (!collection) showCollections({ updateRoute: false });
      // Within the open collection only the card changes; filters and the current view stay.
      else if (collection.id === state.collectionId && collection._loaded) syncDialogFromRoute();
      else selectCollection(collection.id, { updateRoute: false });
    });
  }

  function restoreRoute() {
    if (isAllMapRoute()) {
      showMapPage({ updateRoute: false });
      return;
    }
    const collection = collectionFromRoute();
    if (collection) selectCollection(collection.id, { updateRoute: false });
  }

  bindEvents();
  renderChrome();
  restoreRoute();
  scheduleDailyFact();
})();
