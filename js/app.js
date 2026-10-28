(() => {
  "use strict";

  const app = window.ATLAS_APP_DATA;
  const i18n = window.ATLAS_I18N || {};
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

  function storedLanguage() {
    try {
      return window.localStorage.getItem("atlasLanguage");
    } catch {
      return null;
    }
  }

  const state = {
    language: languageIds.includes(storedLanguage()) ? storedLanguage() : defaultLanguage,
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

  function collectionFromRoute(path = window.location.pathname) {
    const target = normalizedPath(path);
    return app.collections.find((collection) => normalizedPath(routeForCollection(collection)) === target);
  }

  function pushRoute(path, stateData = {}) {
    if (!window.history?.pushState) return;
    if (normalizedPath(window.location.pathname) === normalizedPath(path)) return;
    window.history.pushState(stateData, "", path);
  }

  // A single card is addressable as /atlas/<collection>#item=<card id>.
  function cardPath(collection, item) {
    return `${routeForCollection(collection)}#item=${encodeURIComponent(item.id)}`;
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
    $("#collectionEyebrow").textContent = collectionText(collection, "count_label");
    $("#collectionTitle").textContent = collectionText(collection, "heading") || collectionText(collection, "title");
    $("#safetyNotice").textContent = collectionText(collection, "safety_notice");
    $("#sourceNote").textContent = collectionText(collection, "source_note");
    $("#searchInput").placeholder = collectionText(collection, "search_placeholder") || t("searchFallback");
  }

  function renderChrome() {
    document.documentElement.lang = state.language;
    document.title = t("documentTitle");

    setText("#skipLink", "skipLink");
    setText("#heroEyebrow", "heroEyebrow");
    setText("#heroTitle", "heroTitle");
    setText("#heroLead", "heroLead");
    setText("#chooseCollectionHero", "chooseCollection");
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
    setText("#collections-title", "collectionsTitle");
    setText("#collectionsNote", "collectionsNote");
    setText("#changeCollectionButton", "changeCollection");
    setText("#noticePrefix", "noticePrefix");
    setText("#atlasEyebrow", "atlasEyebrow");
    setText("#atlasNote", "atlasNote");
    setText("#searchLabel", "searchLabel");
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
      pl: { atlas: "Atlas", learn: "Nauka", quiz: "Quiz", sources: "Źródła" },
      en: { atlas: "Atlas", learn: "Learn", quiz: "Quiz", sources: "Sources" }
    };
    $$(".nav-btn[data-view]").forEach((button) => {
      button.textContent = navLabels[state.language]?.[button.dataset.view] || navLabels.pl[button.dataset.view] || button.dataset.view;
    });

    updateActiveCollectionLabels();
    renderCollections();
    renderDailyFact();
  }

  function collectionCardHtml(collection) {
    const title = collectionText(collection, "title");
    return `
      <article class="collection-card collection-card--${escapeHtml(collection.accent || "default")}">
        <div class="collection-card__icon" aria-hidden="true">${escapeHtml(collection.icon || title.slice(0, 1))}</div>
        <div>
          <p class="eyebrow">${escapeHtml(collectionText(collection, "count_label") || `${collection.items.length}`)}</p>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(collectionText(collection, "subtitle"))}</p>
        </div>
        <button class="primary" data-action="select-collection" data-collection="${escapeHtml(collection.id)}">${escapeHtml(t("collectionCardButton"))}</button>
      </article>`;
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
      grid.innerHTML = app.collections.map(collectionCardHtml).join("");
      return;
    }

    grid.classList.add("is-grouped");
    grid.innerHTML = orderedGroups.map((group) => {
      const label = groupText(group.id, "label");
      const description = groupText(group.id, "description");
      const cards = byGroup.get(group.id).map(collectionCardHtml).join("");
      return `
        <section class="collection-group" data-group="${escapeHtml(group.id)}">
          <header class="collection-group__head">
            <p class="eyebrow">${escapeHtml(t("groupEyebrow"))}</p>
            <h3>${escapeHtml(label)}</h3>
            ${description ? `<p class="collection-group__lead">${escapeHtml(description)}</p>` : ""}
          </header>
          <div class="collection-group__grid">${cards}</div>
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
        <div class="m-card__body">
          <h3>${escapeHtml(itemName(item))}</h3>
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

  function currentRouteWithoutHash() {
    return window.location.pathname + window.location.search;
  }

  function setItemHash(id) {
    if (!window.history?.pushState) return;
    const target = `${currentRouteWithoutHash()}#item=${encodeURIComponent(id)}`;
    const current = `${currentRouteWithoutHash()}${window.location.hash}`;
    if (current === target) return;
    window.history.pushState(window.history.state || {}, "", target);
  }

  function clearItemHash() {
    if (!window.location.hash) return;
    if (!window.history?.replaceState) return;
    window.history.replaceState(window.history.state || {}, "", currentRouteWithoutHash());
  }

  function syncDialogFromHash() {
    const dialog = $("#itemDialog");
    const hashId = itemIdFromHash();
    if (hashId) {
      const item = byId(hashId);
      if (item && (!dialog.open || dialog.dataset.itemId !== hashId)) {
        showDialog(hashId, { skipRoute: true });
      } else if (!item) {
        clearItemHash();
        if (dialog.open) dialog.close?.();
      }
    } else if (dialog.open) {
      dialog.close?.();
    }
  }

  function showDialog(id, options = {}) {
    const item = byId(id);
    if (!item) return;
    const dialog = $("#itemDialog");
    dialog.dataset.itemId = id;
    renderDialogContent(item);
    if (!options.skipRoute) setItemHash(id);
    if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
    else dialog.setAttribute("open", "");
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
    const path = `${routeForCollection(collection)}#item=${encodeURIComponent(itemId)}`;
    if (window.history?.pushState) window.history.pushState({ collectionId }, "", path);
    else window.location.hash = `item=${encodeURIComponent(itemId)}`;
    await selectCollection(collectionId, { updateRoute: false });
    $("#appNav")?.scrollIntoView({ block: "start" });
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
        ${visualHtml(item, true)}
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

  function activateView(view) {
    state.view = view;
    $$(".nav-btn").forEach((btn) => btn.classList.toggle("is-active", btn.dataset.view === view));
    $$(".view").forEach((section) => section.classList.toggle("is-active", section.id === view));
    $("#main").focus({ preventScroll: true });
    if (view === "atlas") renderAtlas();
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
    $("#collectionPicker").classList.add("is-hidden");
    $(".app-nav").classList.remove("is-hidden");
    $("#main").classList.remove("is-hidden");
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
    activateView("atlas");
    if (options.updateRoute !== false) pushRoute(routeForCollection(collection), { collectionId: collection.id });
    syncDialogFromHash();
  }

  function showCollections(options = {}) {
    state.collectionId = null;
    $("#collectionPicker").classList.remove("is-hidden");
    $(".app-nav").classList.add("is-hidden");
    $("#main").classList.add("is-hidden");
    $("#collectionPicker").scrollIntoView({ behavior: "smooth", block: "start" });
    if (options.updateRoute !== false) pushRoute("/", { collectionId: null });
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
      if (nav) activateView(nav.dataset.view);

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
      clearItemHash();
    });

    window.addEventListener("hashchange", () => {
      if (!state.collectionId) return;
      syncDialogFromHash();
    });

    window.addEventListener("popstate", () => {
      const collection = collectionFromRoute();
      if (collection) selectCollection(collection.id, { updateRoute: false });
      else showCollections({ updateRoute: false });
    });
  }

  function restoreRoute() {
    const collection = collectionFromRoute();
    if (collection) selectCollection(collection.id, { updateRoute: false });
  }

  bindEvents();
  renderChrome();
  restoreRoute();
  scheduleDailyFact();
})();
