# Atlas Osobliwosci Polski Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the static mushroom atlas into a reusable multi-collection "Atlas Osobliwosci Polski" with mushrooms and insects.

**Architecture:** Keep the app static and dependency-light. Preserve existing mushroom data files, add an insect collection file, then add a small registry that exposes all collections to the existing UI logic through one `window.ATLAS_APP_DATA` contract.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node validation scripts, Wikimedia-hosted images where available.

---

### Task 1: Collection Contract Test

**Files:**
- Create: `scripts/validate-collections.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing test**

Create a Node validation script that reads `index.html`, loads deferred data scripts in VM context, and asserts the new collection contract.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:collections`
Expected: fail because `data/insects.js`, `data/collections.js`, and `window.ATLAS_APP_DATA` do not exist yet.

### Task 2: Data Registry

**Files:**
- Create: `data/insects.js`
- Create: `data/collections.js`
- Modify: `index.html`

- [ ] **Step 1: Add insect data**

Add 30 insect entries from the provided list, grouped into clear categories and shaped like the mushroom entries.

- [ ] **Step 2: Add registry**

Create `window.ATLAS_APP_DATA` with `project`, `views`, and `collections` entries for `grzyby` and `owady`.

- [ ] **Step 3: Load scripts in order**

Load insect data and collection registry after mushroom packs and before `js/app.js`.

- [ ] **Step 4: Run collection test**

Run: `npm run test:collections`
Expected: pass.

### Task 3: Shared App UI

**Files:**
- Modify: `index.html`
- Modify: `js/app.js`
- Modify: `css/styles.css`

- [ ] **Step 1: Replace mushroom-only shell copy**

Change title, meta description, hero, navigation, dialog ids, and section labels to collection-neutral language.

- [ ] **Step 2: Add collection picker behavior**

Render collection cards on startup and allow entering a selected collection. Add a back-to-collections action.

- [ ] **Step 3: Remove contest and review behavior**

Delete contest/review navigation, rendering, storage, and action handling.

- [ ] **Step 4: Keep Atlas, Nauka, Quiz, Zrodla working for active collection**

Make filtering, cards, details, flashcards, quiz, and credits use `state.collection.items` and `state.collection.categories`.

- [ ] **Step 5: Run data tests**

Run: `npm run test:data` and `npm run test:collections`.

### Task 4: Browser Verification

**Files:**
- No production file ownership unless verification finds a bug.

- [ ] **Step 1: Start static server**

Run the local dev server.

- [ ] **Step 2: Verify desktop and mobile**

Open the page, check the collection picker, enter Grzyby and Owady, test Atlas/Nauka/Quiz/Zrodla, and check a narrow mobile viewport.

- [ ] **Step 3: Fix any visual breakage**

Patch only layout issues discovered during verification.
