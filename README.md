# Niezwykłe Grzyby Polski — MVP

Statyczna strona edukacyjna: **Atlas + Nauka + Quiz + Konkurs + Powtórki + Źródła**.

Projekt jest przygotowany jako niezależne MVP, bez nazw OMTTK/PTTK i bez kopiowania cudzych opisów. Wersja 0.1 ma 50 gatunków i placeholdery zdjęć. Zdjęcia można dodawać stopniowo, najlepiej z Wikimedia Commons albo innych źródeł z jasną licencją.

## Struktura

```text
index.html
css/styles.css
js/app.js
data/mushrooms.js
images/.gitkeep
assets/logo-oroloko-ai.svg
assets/favicon.svg
manifest.webmanifest
service-worker.js
vercel.json
```

## Uruchomienie lokalne

W katalogu projektu:

```bash
python3 -m http.server 5173
```

Następnie otwórz:

```text
http://localhost:5173
```

## Publikacja na Vercel

Najprościej:

1. Utwórz repozytorium na GitHubie.
2. Wrzuć zawartość tego katalogu.
3. W Vercel wybierz **New Project** i wskaż repozytorium.
4. Framework: **Other** albo brak frameworka.
5. Build command: puste.
6. Output directory: `.` albo puste, jeśli Vercel sam wykryje statyczną stronę.

Alternatywnie z CLI:

```bash
npm i -g vercel
vercel --prod
```

## Dodawanie zdjęć

Dla każdego grzyba w `data/mushrooms.js` uzupełnij pola:

```js
"image": "./images/okratek-australijski.webp",
"image_alt": "Okratek australijski",
"image_author": "Autor zdjęcia",
"image_source": "https://commons.wikimedia.org/wiki/File:...",
"image_license": "CC BY-SA 4.0",
"license_url": "https://creativecommons.org/licenses/by-sa/4.0/"
```

Pliki zdjęć trzymaj w katalogu `images/`.

## Zasady treści

- Projekt edukacyjny, nie poradnik zbioru ani potwierdzania jadalności.
- Nie kopiować opisów z cudzych atlasów.
- Każde zdjęcie musi mieć autora, źródło i licencję.
- Przy gatunkach chronionych lub wrażliwych dodawać komunikat „nie zbierać”.

## Stopka

W stopce jest: **Made by Oroloko** oraz znak „created with AI assistance”.
