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

  function itemTranslation(item) {
    return collectionTranslation().items?.[item.id] || {};
  }

  function itemField(item, field, fallbackField = field) {
    const translated = itemTranslation(item);
    return translated[field] || item[fallbackField] || item[field] || "";
  }

  function itemName(item) {
    return itemField(item, "name", "name_pl") || item.name_lat;
  }

  function itemHook(item) {
    return itemField(item, "hook", "hook");
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
          <div class="latin">${escapeHtml(item.name_lat)}</div>
          <p class="hook">${escapeHtml(itemHook(item))}</p>
          ${region ? `<p class="occurrence-snippet"><strong>${escapeHtml(t("regionLabel"))}:</strong> ${escapeHtml(region)}</p>` : ""}
          <div class="meta-line">
            <span class="pill">${escapeHtml(item.category_icon || "")} ${escapeHtml(itemCategoryShort(item))}</span>
            <span class="pill">${escapeHtml(itemLevel(item) || "atlas")}</span>
          </div>
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

  function filteredItems() {
    const locale = state.language === "en" ? "en" : "pl";
    const phrase = state.search.trim().toLocaleLowerCase(locale);
    return items().filter((item) => {
      const matchesCategory = state.category === "all" || item.category === state.category;
      const haystack = [
        itemName(item),
        item.name_lat,
        itemHook(item),
        itemQuizAngle(item),
        itemCategoryLabel(item),
        itemCategoryShort(item),
        itemRegion(item),
        itemHabitat(item)
      ].join(" ").toLocaleLowerCase(locale);
      const matchesSearch = !phrase || haystack.includes(phrase);
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

  function renderDialogContent(item) {
    const region = itemRegion(item);
    const habitat = itemHabitat(item);
    const occurrence = itemOccurrence(item);
    $("#dialogContent").innerHTML = `
      <div class="dialog-body">
        ${visualHtml(item, true)}
        <div class="meta-line" style="margin-top:1rem">
          <span class="pill">${escapeHtml(item.category_icon || "")} ${escapeHtml(itemCategoryLabel(item))}</span>
          <span class="pill">${escapeHtml(t("levelLabel"))}: ${escapeHtml(itemLevel(item) || "atlas")}</span>
        </div>
        <h2 id="dialogTitle" style="margin-top:.75rem">${escapeHtml(itemName(item))}</h2>
        <p class="latin">${escapeHtml(item.name_lat)}</p>
        <p class="hook">${escapeHtml(itemHook(item))}</p>
        ${region ? `
          <div class="occurrence-box">
            <h3>${escapeHtml(t("occurrenceTitle"))}</h3>
            <p><strong>${escapeHtml(t("regionLabel"))}:</strong> ${escapeHtml(region)}</p>
            ${habitat ? `<p><strong>${escapeHtml(t("habitatLabel"))}:</strong> ${escapeHtml(habitat)}</p>` : ""}
            ${occurrence ? `<p>${escapeHtml(occurrence)}</p>` : ""}
          </div>` : ""}
        <h3>${escapeHtml(t("quizAngleTitle"))}</h3>
        <p>${escapeHtml(itemQuizAngle(item))}</p>
        <div class="safety"><strong>${escapeHtml(t("cautionLabel"))}:</strong> ${escapeHtml(itemSafety(item))}</div>
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
              <p class="latin">${escapeHtml(item.name_lat)}</p>
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

  function buildQuestion(correct) {
    const list = items();
    const selected = correct || sample(list, 1)[0];
    const mode = Math.random() > 0.45 ? "hook" : "latin";
    const prompt = mode === "hook"
      ? t("quizHookPrompt", { hook: itemHook(selected) })
      : t("quizLatinPrompt", { latin: selected.name_lat });
    const wrong = sample(list.filter((item) => item.id !== selected.id), 3);
    return {
      correctId: selected.id,
      correctName: itemName(selected),
      prompt,
      detail: itemQuizAngle(selected),
      options: shuffle([selected, ...wrong]).map((item) => ({ id: item.id, label: itemName(item) }))
    };
  }

  function buildQuestions() {
    return sample(items(), Math.min(10, items().length)).map((item) => buildQuestion(item));
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
    box.innerHTML = `
      <div class="quiz-progress"><span>${escapeHtml(t("questionCounter", { current: quiz.index + 1, total: quiz.questions.length }))}</span><span>${escapeHtml(t("scoreLabel", { score: quiz.score }))}</span></div>
      <div class="question-card">
        <h3>${escapeHtml(q.prompt)}</h3>
        <div class="answers">
          ${q.options.map((option) => {
            const klass = !quiz.answered ? "" : option.id === q.correctId ? "is-correct" : option.id === quiz.selectedId ? "is-wrong" : "";
            return `<button class="answer-btn ${klass}" data-action="answer-quiz" data-id="${escapeHtml(option.id)}" ${quiz.answered ? "disabled" : ""}>${escapeHtml(option.label)}</button>`;
          }).join("")}
        </div>
        ${quiz.answered ? `<div class="feedback"><strong>${escapeHtml(t("correctAnswer"))}:</strong> ${escapeHtml(q.correctName)}. ${escapeHtml(q.detail)}</div>` : ""}
        <div class="row-actions">
          ${quiz.answered ? `<button class="primary" data-action="next-quiz">${escapeHtml(quiz.index + 1 === quiz.questions.length ? t("finishQuiz") : t("nextQuestion"))}</button>` : ""}
          <button class="ghost" data-action="restart-quiz">${escapeHtml(t("restart"))}</button>
        </div>
      </div>`;
  }

  function renderCredits() {
    const rows = items().map((item) => `
      <tr>
        <td><strong>${escapeHtml(itemName(item))}</strong><br><span class="latin">${escapeHtml(item.name_lat)}</span></td>
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
    if (view === "sources") renderCredits();
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

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const go = event.target.closest("[data-go]");
      if (go) activateView(go.dataset.go);

      const nav = event.target.closest(".nav-btn[data-view]");
      if (nav) activateView(nav.dataset.view);

      const chip = event.target.closest(".chip[data-category]");
      if (chip) { state.category = chip.dataset.category; renderAtlas(); }

      const action = event.target.closest("[data-action]");
      if (action) handleAction(action.dataset.action, action);

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
})();
