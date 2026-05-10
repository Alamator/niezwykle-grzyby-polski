# Atlas Osobliwości Polski

Statyczna strona edukacyjna: **wybór kolekcji + przełącznik PL/EN + Atlas + Nauka + Quiz + Źródła**.

Projekt wyrósł z atlasu grzybów i jest teraz przygotowany jako wspólna rama dla kolejnych osobliwości polskiej przyrody. Pierwsze kolekcje:

- **Grzyby**: 60 pozycji z uzupełnionymi zdjęciami i atrybucjami.
- **Owady**: 30 pozycji startowych z miejscem na przyszłe zdjęcia i licencje.
- **Kwiaty**: 31 polskich, dziko rosnących lub zadomowionych osobliwości roślinnych ze zdjęciami i atrybucjami z Wikimedia Commons.
- **Ryby**: 32 osobliwości polskich wód i ich rubieży ze zdjęciami Wikimedia Commons.

## Struktura

```text
index.html
css/styles.css
js/app.js
data/mushrooms.js
data/insects.js
data/flowers.js
data/flower-photo-pack-v01.js
data/fish.js
data/fish-photo-pack-v01.js
data/collections.js
data/i18n.js
data/photo-pack-*.js
data/region-pack-v07.js
assets/logo-oroloko-ai.svg
assets/favicon.svg
manifest.webmanifest
service-worker.js
vercel.json
```

## Uruchomienie lokalne

W katalogu projektu:

```bash
python -m http.server 5173
```

Następnie otwórz:

```text
http://localhost:5173
```

## Testy danych

```bash
npm run test:data
npm run test:collections
```

## Dodawanie kolekcji

Najprostsza ścieżka:

1. Dodaj plik danych w `data/`, np. `fish.js`.
2. Utrzymaj pola pozycji zgodne z obecnymi kolekcjami: `id`, `name_pl`, `name_lat`, `category`, `hook`, `quiz_angle`, `safety_note`, `region_pl`, `habitat_pl`, `occurrence_note` oraz pola zdjęć/licencji.
3. Dopisz kolekcję w `data/collections.js`.
4. Dodaj tłumaczenia interfejsu kolekcji, kategorii i pozycji w `data/i18n.js`.
5. Dodaj skrypt danych do `index.html` przed `data/collections.js`.
6. Uruchom oba testy.

## Zasady treści

- Projekt edukacyjny, nie narzędzie do pewnego oznaczania gatunków w terenie.
- Nie kopiować opisów z cudzych atlasów.
- Każde zdjęcie musi mieć autora, źródło i licencję.
- Przy gatunkach chronionych, toksycznych lub wrażliwych dodawać komunikat o obserwacji bez niepokojenia.

## Publikacja na Vercel

Framework: **Other** albo brak frameworka. Build command pusty. Output directory: `.` albo puste, jeśli Vercel sam wykryje statyczną stronę.

## Stopka

W stopce jest znak **Made by Oroloko** oraz informacja o asyście AI.
