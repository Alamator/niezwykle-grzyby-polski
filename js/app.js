(() => {
  "use strict";

  const data = window.MUSHROOM_APP_DATA;
  const mushrooms = data.mushrooms;
  const categories = data.categories;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const store = {
    get reviewIds() {
      try { return JSON.parse(localStorage.getItem("mushroomReviewIds") || "[]"); }
      catch { return []; }
    },
    set reviewIds(value) {
      localStorage.setItem("mushroomReviewIds", JSON.stringify([...new Set(value)]));
    },
    get bestContest() {
      return Number(localStorage.getItem("bestContestScore") || 0);
    },
    set bestContest(value) {
      localStorage.setItem("bestContestScore", String(value));
    }
  };

  const state = {
    view: "atlas",
    category: "all",
    search: "",
    flashIndex: randomIndex(mushrooms.length),
    flashRevealed: false,
    quiz: null,
    contest: null,
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

  function byId(id) {
    return mushrooms.find((item) => item.id === id);
  }

  function addToReview(id) {
    store.reviewIds = [...store.reviewIds, id];
    renderReview();
  }

  function removeFromReview(id) {
    store.reviewIds = store.reviewIds.filter((item) => item !== id);
    renderReview();
  }

  function isInReview(id) {
    return store.reviewIds.includes(id);
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
        <span>${escapeHtml(item.category_icon || "🍄")}</span>
        <span>${large ? "zdjęcie do dodania" : escapeHtml(item.category_short)}</span>
      </div>`;
  }

  function cardHtml(item) {
    const inReview = isInReview(item.id);
    return `
      <article class="m-card" data-id="${escapeHtml(item.id)}">
        ${visualHtml(item)}
        <div class="m-card__body">
          <h3>${escapeHtml(item.name_pl)}</h3>
          <div class="latin">${escapeHtml(item.name_lat)}</div>
          <p class="hook">${escapeHtml(item.hook)}</p>
          <div class="meta-line">
            <span class="pill">${escapeHtml(item.category_icon)} ${escapeHtml(item.category_short)}</span>
            <span class="pill">${escapeHtml(item.level)}</span>
          </div>
        </div>
        <div class="card-actions">
          <button class="secondary" data-action="details" data-id="${escapeHtml(item.id)}">Szczegóły</button>
          <button class="ghost" data-action="${inReview ? "unreview" : "review"}" data-id="${escapeHtml(item.id)}">${inReview ? "Usuń" : "Powtórz"}</button>
        </div>
      </article>`;
  }

  function renderCategoryFilters() {
    const container = $("#categoryFilters");
    container.innerHTML = [
      `<button class="chip ${state.category === "all" ? "is-active" : ""}" data-category="all">Wszystkie</button>`,
      ...categories.map((cat) => `<button class="chip ${state.category === cat.id ? "is-active" : ""}" data-category="${escapeHtml(cat.id)}">${escapeHtml(cat.icon)} ${escapeHtml(cat.short)}</button>`)
    ].join("");
  }

  function filteredMushrooms() {
    const phrase = state.search.trim().toLocaleLowerCase("pl");
    return mushrooms.filter((item) => {
      const matchesCategory = state.category === "all" || item.category === state.category;
      const haystack = [item.name_pl, item.name_lat, item.hook, item.category_label, item.quiz_angle]
        .join(" ")
        .toLocaleLowerCase("pl");
      const matchesSearch = !phrase || haystack.includes(phrase);
      return matchesCategory && matchesSearch;
    });
  }

  function renderStats(list) {
    const withImages = mushrooms.filter((item) => item.image).length;
    const reviewCount = store.reviewIds.length;
    const html = `
      <div class="stat-card"><strong>${mushrooms.length}</strong><span>gatunków w MVP</span></div>
      <div class="stat-card"><strong>${categories.length}</strong><span>grup ciekawostek</span></div>
      <div class="stat-card"><strong>${list.length}</strong><span>widocznych po filtrach</span></div>
      <div class="stat-card"><strong>${withImages}</strong><span>zdjęć z atrybucją</span></div>`;
    $("#statsGrid").innerHTML = html;
  }

  function renderAtlas() {
    renderCategoryFilters();
    const list = filteredMushrooms();
    renderStats(list);
    $("#atlasGrid").innerHTML = list.length
      ? list.map(cardHtml).join("")
      : `<div class="empty-state">Brak wyników. Zmień wyszukiwanie albo filtr.</div>`;
  }

  function showDialog(id) {
    const item = byId(id);
    if (!item) return;
    const dialog = $("#mushroomDialog");
    $("#dialogContent").innerHTML = `
      <div class="dialog-body">
        ${visualHtml(item, true)}
        <div class="meta-line" style="margin-top:1rem">
          <span class="pill">${escapeHtml(item.category_icon)} ${escapeHtml(item.category_label)}</span>
          <span class="pill">Poziom: ${escapeHtml(item.level)}</span>
        </div>
        <h2 id="dialogTitle" style="margin-top:.75rem">${escapeHtml(item.name_pl)}</h2>
        <p class="latin">${escapeHtml(item.name_lat)}</p>
        <p class="hook">${escapeHtml(item.hook)}</p>
        <h3>Kąt quizowy</h3>
        <p>${escapeHtml(item.quiz_angle)}</p>
        <div class="safety"><strong>Bezpieczeństwo:</strong> ${escapeHtml(item.safety_note || data.safety_notice)}</div>
        <div class="row-actions">
          <button class="primary" data-action="review" data-id="${escapeHtml(item.id)}">Dodaj do powtórek</button>
          <button class="secondary" data-action="next-flash" data-id="${escapeHtml(item.id)}">Ucz się tego gatunku</button>
        </div>
      </div>`;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function renderFlashcard() {
    const item = mushrooms[state.flashIndex] || mushrooms[0];
    $("#flashcard").innerHTML = `
      <div class="flash-inner">
        ${visualHtml(item, true)}
        <div class="flash-content">
          <p class="eyebrow">Fiszka ${state.flashIndex + 1} / ${mushrooms.length}</p>
          <div class="big-icon" aria-hidden="true">${escapeHtml(item.category_icon)}</div>
          <blockquote>${escapeHtml(item.hook)}</blockquote>
          <p><strong>Kategoria:</strong> ${escapeHtml(item.category_label)}</p>
          ${state.flashRevealed ? `
            <div class="reveal-box">
              <h3>${escapeHtml(item.name_pl)}</h3>
              <p class="latin">${escapeHtml(item.name_lat)}</p>
              <p><strong>Warto zapamiętać:</strong> ${escapeHtml(item.quiz_angle)}</p>
              <p><strong>Bezpieczeństwo:</strong> ${escapeHtml(item.safety_note)}</p>
            </div>` : ""}
          <div class="row-actions">
            <button class="primary" data-action="reveal-flash">${state.flashRevealed ? "Ukryj odpowiedź" : "Pokaż odpowiedź"}</button>
            <button class="secondary" data-action="known-flash">Znam, następny</button>
            <button class="ghost" data-action="review" data-id="${escapeHtml(item.id)}">Do powtórki</button>
          </div>
        </div>
      </div>`;
  }

  function buildQuestion() {
    const correct = sample(mushrooms, 1)[0];
    const mode = Math.random() > 0.45 ? "hook" : "latin";
    const prompt = mode === "hook"
      ? `Który gatunek pasuje do opisu: „${correct.hook}”?`
      : `Jaką polską nazwę ma gatunek ${correct.name_lat}?`;
    const wrong = sample(mushrooms.filter((item) => item.id !== correct.id), 3);
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
      questions: Array.from({ length: 10 }, buildQuestion),
      index: 0,
      score: 0,
      answered: false,
      selectedId: null,
      finished: false,
    };
    renderQuiz();
  }

  function renderQuiz() {
    if (!state.quiz) initQuiz();
    const quiz = state.quiz;
    const box = $("#quizBox");
    if (quiz.finished) {
      box.innerHTML = `
        <div class="question-card">
          <p class="eyebrow">Wynik</p>
          <h3>${quiz.score} / ${quiz.questions.length}</h3>
          <p>${quiz.score >= 8 ? "Świetnie — grzybowe osobliwości zaczynają wchodzić w pamięć." : "Dobra rozgrzewka. Błędne odpowiedzi warto dodać do powtórek."}</p>
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

  function startContest() {
    state.contest = {
      timeLeft: 90,
      score: 0,
      total: 0,
      question: buildQuestion(),
      answered: false,
      selectedId: null,
      timer: null,
      finished: false,
    };
    state.contest.timer = window.setInterval(() => {
      if (!state.contest || state.contest.finished) return;
      state.contest.timeLeft -= 1;
      if (state.contest.timeLeft <= 0) finishContest();
      else renderContest();
    }, 1000);
    renderContest();
  }

  function finishContest() {
    if (!state.contest) return;
    window.clearInterval(state.contest.timer);
    state.contest.finished = true;
    if (state.contest.score > store.bestContest) store.bestContest = state.contest.score;
    renderContest();
  }

  function renderContest() {
    const box = $("#contestBox");
    const contest = state.contest;
    if (!contest) {
      box.innerHTML = `
        <div class="question-card">
          <p class="eyebrow">90 sekund</p>
          <h3>Ile osobliwości rozpoznasz?</h3>
          <p>Najlepszy wynik w tej przeglądarce: <strong>${store.bestContest}</strong>.</p>
          <button class="primary" data-action="start-contest">Start konkursu</button>
        </div>`;
      return;
    }
    if (contest.finished) {
      box.innerHTML = `
        <div class="question-card">
          <p class="eyebrow">Koniec czasu</p>
          <h3>${contest.score} punktów</h3>
          <p>Odpowiedzi łącznie: ${contest.total}. Najlepszy wynik lokalny: <strong>${store.bestContest}</strong>.</p>
          <div class="row-actions">
            <button class="primary" data-action="start-contest">Spróbuj ponownie</button>
            <button class="secondary" data-go="review">Powtórki</button>
          </div>
        </div>`;
      return;
    }
    const q = contest.question;
    box.innerHTML = `
      <div class="quiz-progress"><span>Czas: ${contest.timeLeft}s</span><span>Punkty: ${contest.score}</span><span>Najlepszy: ${store.bestContest}</span></div>
      <div class="question-card">
        <h3>${escapeHtml(q.prompt)}</h3>
        <div class="answers">
          ${q.options.map((option) => {
            const klass = !contest.answered ? "" : option.id === q.correctId ? "is-correct" : option.id === contest.selectedId ? "is-wrong" : "";
            return `<button class="answer-btn ${klass}" data-action="answer-contest" data-id="${escapeHtml(option.id)}" ${contest.answered ? "disabled" : ""}>${escapeHtml(option.label)}</button>`;
          }).join("")}
        </div>
        ${contest.answered ? `<div class="feedback"><strong>${escapeHtml(q.correctName)}</strong>. ${escapeHtml(q.detail)}</div>` : ""}
        <div class="row-actions">
          ${contest.answered ? `<button class="primary" data-action="next-contest">Następne</button>` : ""}
          <button class="ghost" data-action="finish-contest">Zakończ</button>
        </div>
      </div>`;
  }

  function renderReview() {
    const ids = store.reviewIds;
    const list = ids.map(byId).filter(Boolean);
    const container = $("#reviewList");
    container.innerHTML = list.length
      ? list.map(cardHtml).join("")
      : `<div class="empty-state">Nie masz jeszcze gatunków do powtórki. Dodaj je z atlasu, fiszek albo po pomyłce w quizie.</div>`;
  }

  function renderCredits() {
    const rows = mushrooms.map((item) => `
      <tr>
        <td><strong>${escapeHtml(item.name_pl)}</strong><br><span class="latin">${escapeHtml(item.name_lat)}</span></td>
        <td>${item.image ? `<a href="${escapeHtml(item.image)}" rel="noopener noreferrer" target="_blank">podgląd</a>` : "do uzupełnienia"}</td>
        <td>${item.image_author ? escapeHtml(item.image_author) : "do uzupełnienia"}</td>
        <td>${item.image_license ? escapeHtml(item.image_license) : "do uzupełnienia"}</td>
        <td>${item.image_source ? `<a href="${escapeHtml(item.image_source)}" rel="noopener noreferrer" target="_blank">źródło</a>` : "do uzupełnienia"}</td>
        <td>${item.image_modifications ? escapeHtml(item.image_modifications) : "—"}</td>
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
    if (view === "quiz" && !state.quiz) initQuiz();
    if (view === "contest") renderContest();
    if (view === "review") renderReview();
    if (view === "sources") renderCredits();
  }

  function handleAction(action, target) {
    const id = target.dataset.id;
    if (action === "details") showDialog(id);
    if (action === "review") { addToReview(id); renderAtlas(); renderFlashcard(); }
    if (action === "unreview") { removeFromReview(id); renderAtlas(); }
    if (action === "next-flash") {
      const index = mushrooms.findIndex((item) => item.id === id);
      state.flashIndex = index >= 0 ? index : state.flashIndex;
      state.flashRevealed = true;
      $("#mushroomDialog").close?.();
      activateView("learn");
    }
    if (action === "reveal-flash") { state.flashRevealed = !state.flashRevealed; renderFlashcard(); }
    if (action === "known-flash") { state.flashIndex = randomIndex(mushrooms.length); state.flashRevealed = false; renderFlashcard(); }
    if (action === "restart-quiz") { state.quiz = null; initQuiz(); }
    if (action === "answer-quiz") {
      const quiz = state.quiz;
      if (!quiz || quiz.answered) return;
      const q = quiz.questions[quiz.index];
      quiz.answered = true;
      quiz.selectedId = id;
      if (id === q.correctId) quiz.score += 1;
      else addToReview(q.correctId);
      renderQuiz();
    }
    if (action === "next-quiz") {
      const quiz = state.quiz;
      if (quiz.index + 1 >= quiz.questions.length) quiz.finished = true;
      else { quiz.index += 1; quiz.answered = false; quiz.selectedId = null; }
      renderQuiz();
    }
    if (action === "start-contest") startContest();
    if (action === "finish-contest") finishContest();
    if (action === "answer-contest") {
      const contest = state.contest;
      if (!contest || contest.answered) return;
      contest.answered = true;
      contest.selectedId = id;
      contest.total += 1;
      if (id === contest.question.correctId) contest.score += 1;
      else addToReview(contest.question.correctId);
      renderContest();
    }
    if (action === "next-contest") {
      if (!state.contest) return;
      state.contest.question = buildQuestion();
      state.contest.answered = false;
      state.contest.selectedId = null;
      renderContest();
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

      if (event.target.matches(".dialog-close")) $("#mushroomDialog").close?.();
    });

    $("#searchInput").addEventListener("input", (event) => {
      state.search = event.target.value;
      renderAtlas();
    });

    $("#mushroomDialog").addEventListener("click", (event) => {
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
  renderAtlas();
  renderFlashcard();
  renderContest();
  renderReview();
  renderCredits();
  registerServiceWorker();
})();
