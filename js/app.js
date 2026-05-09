(() => {
  "use strict";

  const app = window.ATLAS_APP_DATA;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  if (!app || !Array.isArray(app.collections) || app.collections.length === 0) {
    document.body.insertAdjacentHTML("afterbegin", "<p>Brak danych atlasu.</p>");
    return;
  }

  const state = {
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

  function items() {
    return activeCollection().items || [];
  }

  function categories() {
    return activeCollection().categories || [];
  }

  function byId(id) {
    return items().find((item) => item.id === id);
  }

  function renderCollections() {
    $("#collectionGrid").innerHTML = app.collections.map((collection) => `
      <article class="collection-card collection-card--${escapeHtml(collection.accent || "default")}">
        <div class="collection-card__icon" aria-hidden="true">${escapeHtml(collection.icon || collection.title.slice(0, 1))}</div>
        <div>
          <p class="eyebrow">${escapeHtml(collection.count_label || `${collection.items.length} pozycji`)}</p>
          <h3>${escapeHtml(collection.title)}</h3>
          <p>${escapeHtml(collection.subtitle)}</p>
        </div>
        <button class="primary" data-action="select-collection" data-collection="${escapeHtml(collection.id)}">Otwórz atlas</button>
      </article>`).join("");
  }

  function visualHtml(item, large = false) {
    if (item.image) {
      return `
        <div class="m-card__visual">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.image_alt || item.name_pl)}" loading="lazy" onerror="this.closest('.m-card__visual').classList.add('visual-error'); this.remove();" />
        </div>`;
    }
    return `
      <div class="m-card__visual visual-fallback" aria-label="Zdjęcie do uzupełnienia: ${escapeHtml(item.name_pl)}">
        <span>${escapeHtml(item.category_icon || activeCollection().icon || "?")}</span>
        <span>${large ? "zdjęcie do dodania" : escapeHtml(item.category_short || "osobliwość")}</span>
      </div>`;
  }

  function cardHtml(item) {
    return `
      <article class="m-card" data-id="${escapeHtml(item.id)}">
        ${visualHtml(item)}
        <div class="m-card__body">
          <h3>${escapeHtml(item.name_pl)}</h3>
          <div class="latin">${escapeHtml(item.name_lat)}</div>
          <p class="hook">${escapeHtml(item.hook)}</p>
          ${item.region_pl ? `<p class="occurrence-snippet"><strong>Region:</strong> ${escapeHtml(item.region_pl)}</p>` : ""}
          <div class="meta-line">
            <span class="pill">${escapeHtml(item.category_icon || "")} ${escapeHtml(item.category_short || item.category_label || "")}</span>
            <span class="pill">${escapeHtml(item.level || "atlas")}</span>
          </div>
        </div>
        <div class="card-actions">
          <button class="secondary" data-action="details" data-id="${escapeHtml(item.id)}">Szczegóły</button>
          <button class="ghost" data-action="learn-item" data-id="${escapeHtml(item.id)}">Ucz się</button>
        </div>
      </article>`;
  }

  function renderCategoryFilters() {
    const container = $("#categoryFilters");
    container.innerHTML = [
      `<button class="chip ${state.category === "all" ? "is-active" : ""}" data-category="all">Wszystkie</button>`,
      ...categories().map((cat) => `<button class="chip ${state.category === cat.id ? "is-active" : ""}" data-category="${escapeHtml(cat.id)}">${escapeHtml(cat.icon)} ${escapeHtml(cat.short)}</button>`)
    ].join("");
  }

  function filteredItems() {
    const phrase = state.search.trim().toLocaleLowerCase("pl");
    return items().filter((item) => {
      const matchesCategory = state.category === "all" || item.category === state.category;
      const haystack = [item.name_pl, item.name_lat, item.hook, item.category_label, item.quiz_angle, item.region_pl, item.habitat_pl]
        .join(" ")
        .toLocaleLowerCase("pl");
      const matchesSearch = !phrase || haystack.includes(phrase);
      return matchesCategory && matchesSearch;
    });
  }

  function renderStats(list) {
    const collection = activeCollection();
    const withImages = items().filter((item) => item.image).length;
    $("#statsGrid").innerHTML = `
      <div class="stat-card"><strong>${items().length}</strong><span>pozycji w kolekcji</span></div>
      <div class="stat-card"><strong>${categories().length}</strong><span>grup ciekawostek</span></div>
      <div class="stat-card"><strong>${list.length}</strong><span>widocznych po filtrach</span></div>
      <div class="stat-card"><strong>${withImages}</strong><span>zdjęć z atrybucją</span></div>`;
    $("#atlas-title").textContent = `${collection.count_label} - ${collection.title}`;
  }

  function renderAtlas() {
    renderCategoryFilters();
    const list = filteredItems();
    renderStats(list);
    $("#atlasGrid").innerHTML = list.length
      ? list.map(cardHtml).join("")
      : `<div class="empty-state">Brak wyników. Zmień wyszukiwanie albo filtr.</div>`;
  }

  function showDialog(id) {
    const item = byId(id);
    if (!item) return;
    const dialog = $("#itemDialog");
    $("#dialogContent").innerHTML = `
      <div class="dialog-body">
        ${visualHtml(item, true)}
        <div class="meta-line" style="margin-top:1rem">
          <span class="pill">${escapeHtml(item.category_icon || "")} ${escapeHtml(item.category_label || "")}</span>
          <span class="pill">Poziom: ${escapeHtml(item.level || "atlas")}</span>
        </div>
        <h2 id="dialogTitle" style="margin-top:.75rem">${escapeHtml(item.name_pl)}</h2>
        <p class="latin">${escapeHtml(item.name_lat)}</p>
        <p class="hook">${escapeHtml(item.hook)}</p>
        ${item.region_pl ? `
          <div class="occurrence-box">
            <h3>Występowanie w Polsce</h3>
            <p><strong>Region:</strong> ${escapeHtml(item.region_pl)}</p>
            <p><strong>Siedlisko:</strong> ${escapeHtml(item.habitat_pl)}</p>
            <p>${escapeHtml(item.occurrence_note)}</p>
          </div>` : ""}
        <h3>Kąt quizowy</h3>
        <p>${escapeHtml(item.quiz_angle)}</p>
        <div class="safety"><strong>Uwaga:</strong> ${escapeHtml(item.safety_note || activeCollection().safety_notice)}</div>
        <div class="row-actions">
          <button class="primary" data-action="learn-item" data-id="${escapeHtml(item.id)}">Ucz się tego gatunku</button>
          <button class="secondary" data-action="close-dialog">Zamknij</button>
        </div>
      </div>`;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function renderFlashcard() {
    const list = items();
    const item = list[state.flashIndex] || list[0];
    if (!item) {
      $("#flashcard").innerHTML = `<div class="empty-state">Ta kolekcja nie ma jeszcze fiszek.</div>`;
      return;
    }
    $("#flashcard").innerHTML = `
      <div class="flash-inner">
        ${visualHtml(item, true)}
        <div class="flash-content">
          <p class="eyebrow">Fiszka ${state.flashIndex + 1} / ${list.length}</p>
          <div class="big-icon" aria-hidden="true">${escapeHtml(item.category_icon || activeCollection().icon || "?")}</div>
          <blockquote>${escapeHtml(item.hook)}</blockquote>
          <p><strong>Kategoria:</strong> ${escapeHtml(item.category_label)}</p>
          ${state.flashRevealed ? `
            <div class="reveal-box">
              <h3>${escapeHtml(item.name_pl)}</h3>
              <p class="latin">${escapeHtml(item.name_lat)}</p>
              ${item.region_pl ? `<p><strong>Region:</strong> ${escapeHtml(item.region_pl)}</p>` : ""}
              <p><strong>Warto zapamiętać:</strong> ${escapeHtml(item.quiz_angle)}</p>
              <p><strong>Uwaga:</strong> ${escapeHtml(item.safety_note)}</p>
            </div>` : ""}
          <div class="row-actions">
            <button class="primary" data-action="reveal-flash">${state.flashRevealed ? "Ukryj odpowiedź" : "Pokaż odpowiedź"}</button>
            <button class="secondary" data-action="known-flash">Następny</button>
          </div>
        </div>
      </div>`;
  }

  function buildQuestion() {
    const list = items();
    const correct = sample(list, 1)[0];
    const mode = Math.random() > 0.45 ? "hook" : "latin";
    const prompt = mode === "hook"
      ? `Który gatunek pasuje do opisu: „${correct.hook}”?`
      : `Jaką polską nazwę ma gatunek ${correct.name_lat}?`;
    const wrong = sample(list.filter((item) => item.id !== correct.id), 3);
    return {
      correctId: correct.id,
      correctName: correct.name_pl,
      prompt,
      detail: correct.quiz_angle,
      options: shuffle([correct, ...wrong]).map((item) => ({ id: item.id, label: item.name_pl }))
    };
  }

  function initQuiz() {
    state.quiz = {
      collectionId: state.collectionId,
      questions: Array.from({ length: Math.min(10, items().length) }, buildQuestion),
      index: 0,
      score: 0,
      answered: false,
      selectedId: null,
      finished: false
    };
    renderQuiz();
  }

  function renderQuiz() {
    if (!state.quiz || state.quiz.collectionId !== state.collectionId) initQuiz();
    const quiz = state.quiz;
    const box = $("#quizBox");
    if (quiz.finished) {
      box.innerHTML = `
        <div class="question-card">
          <p class="eyebrow">Wynik</p>
          <h3>${quiz.score} / ${quiz.questions.length}</h3>
          <p>${quiz.score >= 8 ? "Świetnie - osobliwości zaczynają wchodzić w pamięć." : "Dobra rozgrzewka. Wróć do fiszek i spróbuj ponownie."}</p>
          <div class="row-actions">
            <button class="primary" data-action="restart-quiz">Jeszcze raz</button>
            <button class="secondary" data-go="learn">Przejdź do nauki</button>
          </div>
        </div>`;
      return;
    }
    const q = quiz.questions[quiz.index];
    box.innerHTML = `
      <div class="quiz-progress"><span>Pytanie ${quiz.index + 1} / ${quiz.questions.length}</span><span>Wynik: ${quiz.score}</span></div>
      <div class="question-card">
        <h3>${escapeHtml(q.prompt)}</h3>
        <div class="answers">
          ${q.options.map((option) => {
            const klass = !quiz.answered ? "" : option.id === q.correctId ? "is-correct" : option.id === quiz.selectedId ? "is-wrong" : "";
            return `<button class="answer-btn ${klass}" data-action="answer-quiz" data-id="${escapeHtml(option.id)}" ${quiz.answered ? "disabled" : ""}>${escapeHtml(option.label)}</button>`;
          }).join("")}
        </div>
        ${quiz.answered ? `<div class="feedback"><strong>Poprawna odpowiedź:</strong> ${escapeHtml(q.correctName)}. ${escapeHtml(q.detail)}</div>` : ""}
        <div class="row-actions">
          ${quiz.answered ? `<button class="primary" data-action="next-quiz">${quiz.index + 1 === quiz.questions.length ? "Zakończ quiz" : "Następne pytanie"}</button>` : ""}
          <button class="ghost" data-action="restart-quiz">Restart</button>
        </div>
      </div>`;
  }

  function renderCredits() {
    const rows = items().map((item) => `
      <tr>
        <td><strong>${escapeHtml(item.name_pl)}</strong><br><span class="latin">${escapeHtml(item.name_lat)}</span></td>
        <td>${item.image ? `<a href="${escapeHtml(item.image)}" rel="noopener noreferrer" target="_blank">podgląd</a>` : "do uzupełnienia"}</td>
        <td>${item.image_author ? escapeHtml(item.image_author) : "do uzupełnienia"}</td>
        <td>${item.image_license ? escapeHtml(item.image_license) : "do uzupełnienia"}</td>
        <td>${item.image_source ? `<a href="${escapeHtml(item.image_source)}" rel="noopener noreferrer" target="_blank">źródło</a>` : "do uzupełnienia"}</td>
      </tr>`).join("");
    $("#creditsTable").innerHTML = `
      <table>
        <thead><tr><th>Gatunek</th><th>Plik</th><th>Autor</th><th>Licencja</th><th>Źródło</th></tr></thead>
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

  function selectCollection(id) {
    const collection = app.collections.find((entry) => entry.id === id) || app.collections[0];
    state.collectionId = collection.id;
    state.category = "all";
    state.search = "";
    state.flashIndex = randomIndex(collection.items.length);
    state.flashRevealed = false;
    state.quiz = null;
    $("#searchInput").value = "";
    $("#collectionPicker").classList.add("is-hidden");
    $(".app-nav").classList.remove("is-hidden");
    $("#main").classList.remove("is-hidden");
    $("#collectionEyebrow").textContent = collection.count_label;
    $("#collectionTitle").textContent = collection.heading || collection.title;
    $("#safetyNotice").textContent = collection.safety_notice;
    $("#sourceNote").textContent = collection.source_note;
    $("#searchInput").placeholder = collection.search_placeholder || "Szukaj...";
    activateView("atlas");
  }

  function showCollections() {
    state.collectionId = null;
    $("#collectionPicker").classList.remove("is-hidden");
    $(".app-nav").classList.add("is-hidden");
    $("#main").classList.add("is-hidden");
    $("#collectionPicker").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleAction(action, target) {
    const id = target.dataset.id;
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
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    if (location.protocol !== "https:" && location.hostname !== "localhost") return;
    navigator.serviceWorker.register("./service-worker.js").catch(() => undefined);
  }

  bindEvents();
  renderCollections();
  registerServiceWorker();
})();
