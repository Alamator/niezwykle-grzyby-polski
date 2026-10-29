# Atlas Osobliwości Polski

Statyczna strona edukacyjna: **wybór kolekcji + przełącznik PL/EN + Atlas + Nauka + Quiz + Źródła**.

Projekt wyrósł z atlasu grzybów i jest teraz przygotowany jako wspólna rama dla kolejnych osobliwości polskiej przyrody. Pierwsze kolekcje:

- **Grzyby**: 60 pozycji z uzupełnionymi zdjęciami i atrybucjami.
- **Owady**: 30 pozycji ze zdjęciami i atrybucjami z Wikimedia Commons.
- **Kwiaty**: 31 polskich, dziko rosnących lub zadomowionych osobliwości roślinnych ze zdjęciami i atrybucjami z Wikimedia Commons.
- **Ryby**: 32 osobliwości polskich wód i ich rubieży ze zdjęciami Wikimedia Commons.
- **Ptaki**: 32 osobliwości polskiej awifauny ze zdjęciami Wikimedia Commons.

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
data/birds.js
data/bird-photo-pack-v01.js
data/collections.js
data/i18n.js
data/start-page.js
data/photo-pack-*.js
data/region-pack-v07.js
fonts/
assets/logo-oroloko-ai.svg
assets/favicon.svg
assets/og-image.png
manifest.webmanifest
service-worker.js
vercel.json
```

## Uruchomienie lokalne

W katalogu projektu:

```bash
npm run dev
```

Następnie otwórz:

```text
http://localhost:5173
```

Lokalny serwer obsługuje też bezpośrednie wejścia w podstrony atlasu, np.:

```text
http://localhost:5173/atlas/rekordy-krajobrazu
```

## Testy

```bash
npm run test:data
npm run test:collections
npm run test:facts
npm run test:technical
```

## Dodawanie kolekcji

Najprostsza ścieżka:

1. Dodaj plik danych w `data/`, np. `fish.js`.
2. Utrzymaj pola pozycji zgodne z obecnymi kolekcjami: `id`, `name_pl`, `name_lat`, `category`, `hook`, `quiz_angle`, `safety_note`, `region_pl`, `habitat_pl`, `occurrence_note` oraz pola zdjęć/licencji.
3. Dopisz kolekcję w `data/collections.js`, z plikami danych na liście `scripts` (ładują się dopiero po otwarciu kolekcji) i krótkim opisem szuflady w `teaser`.
4. Dodaj tłumaczenia interfejsu kolekcji, kategorii i pozycji w `data/i18n.js`, razem z angielskim `teaser`.
5. Wybierz zdjęcie szuflady w `scripts/build-start-page.mjs` (`COVERS`) i uruchom `npm run build:start-page`.
6. Zmień liczebnik w nagłówku szuflad (`collectionsTitle` w `data/i18n.js`) i w teście, który go pilnuje.
7. Uruchom testy.

## Mapa miejsc

- **Biblioteka:** MapLibre GL JS **4.7.1** (nie 5.x, bo 5.x psuje iOS < 13.4).
  - Leży w `vendor/maplibre-gl-4.7.1/` jako niezmieniona kopia z pakietu npm; pochodzenie i sumy kontrolne opisuje `README.md` w tym katalogu.
  - Strona wczytuje ją dopiero po otwarciu widoku „Mapa”.
- **Podkład:** OpenFreeMap (ciemny styl `dark`, dane © współtwórcy OpenStreetMap), bez klucza i rejestracji.
- **Punkty:** `data/places/<kolekcja>.places.js`, ładowane razem z kolekcją, przed plikiem ciekawostek:

  ```js
  window.ATLAS_PLACES["podziemia"] = { checked: "RRRR-MM-DD", items: { "<id karty>": { lat, lng, wikidata: "Q…" } } };
  ```

  - Współrzędne pochodzą z Wikidaty (CC0) i są sprawdzone z gminą i województwem z karty.
  - Karty bez pewnego punktu albo obejmujące kilka miejsc nie trafiają na mapę.
  - Opis sprawdzania i lista kart bez punktu, z powodami: `docs/content/mapa-punkty-2026-10.md`.
- **Bez stanowisk gatunków:** kolekcje gatunków nie mają mapy. Na mapę nie trafia też karta, której uwaga prosi, żeby nie ujawniać miejsca. Pilnuje tego `npm run test:collections`.
- Zakładka „Mapa” pokazuje się tylko w kolekcjach, które mają punkty.

## Wygląd: gabinet osobliwości

- **Styl:** ciemne tło, bursztynowy akcent, cienkie linie; kolekcje to szuflady gabinetu ułożone na trzech półkach (grupach).
- **Czcionki:** Instrument Serif (tytuły), Inter (tekst) i IBM Plex Mono (etykiety).
  - Leżą w `fonts/` jako pliki woff2 (zestawy znaków łaciński i łaciński rozszerzony) z pakietów @fontsource 5.3.0.
  - Licencja: SIL Open Font License 1.1, teksty licencji obok plików (`fonts/OFL-*.txt`).
  - Strona nie łączy się z Google Fonts. Pilnuje tego `npm run test:technical`.
- **Strona startowa:** gabinet pięciu osobliwości, szuflady kolekcji ze zdjęciem jednej karty, ciekawostka dnia, zasady projektu.
  - Nazwy, opisy i zdjęcia z autorami są kopiami kart w `data/start-page.js`, bo strona startowa nie wczytuje danych kolekcji.
  - Plik tworzy `npm run build:start-page`. Karty gabinetu i szuflad wybiera się w `scripts/build-start-page.mjs`.
  - Po zmianie nazwy, opisu albo zdjęcia takiej karty `npm run test:collections` zatrzymuje się, dopóki plik nie zostanie odtworzony.
  - Strona startowa używa tylko zdjęć bez oznaczenia „Kadr reprezentatywny” lub „Kadr kontekstowy”. Wszystkie jej zdjęcia z autorami i licencjami są w rozwijanej liście „Zdjęcia na stronie głównej”.
- **Liczby pod tytułem:** karty we wszystkich kolekcjach, miejsca na mapie (różne obiekty Wikidaty) i zdjęcia (różne pliki z Commons).
  - Liczone są karty, nie „różne osobliwości”: kilka miejsc ma kartę w dwóch kolekcjach, a Sosna na Szczudłach ma dwie karty pod dwiema nazwami.
- **„Zaskocz mnie”** otwiera losową kartę losowej kolekcji. Jak ciekawostka dnia, omija miejsca Zagłady i martyrologii.
- **Ikony i obrazek do udostępniania:** `python scripts/generate-favicons.py` i `python scripts/generate-og-image.py` (wymagają tylko Pillow).
  - Znak to pochyłe „A” z Instrument Serif.
  - Obrazek do udostępniania pokazuje tytuł strony i mapę Polski z punktów atlasu (granice: Natural Earth, domena publiczna). Nie ma na nim zdjęć, bo podgląd linku nie zmieści ich podpisów.

## Zasady treści

- Projekt edukacyjny, nie narzędzie do pewnego oznaczania gatunków w terenie.
- Nie kopiować opisów z cudzych atlasów.
- Każde zdjęcie musi mieć autora, źródło i licencję.
  - Wpisy muszą się zgadzać ze stroną pliku w Wikimedia Commons, a link licencji prowadzi do tekstu licencji, nie do pliku.
  - Zdjęcia z autorem lub licencją „do weryfikacji” i niesprawdzone (`commons_candidate`) zatrzymuje `npm run test:collections`.
  - Ostatnie sprawdzenie wszystkich zdjęć: `docs/content/zdjecia-2026-10.md`.
- Zdjęcie innego okazu, osobnika albo miejsca niż to z karty ma na początku opisu oznaczenie:
  - „Kadr reprezentatywny: …”, gdy pokazuje podobny okaz, osobnika lub miejsce;
  - „Kadr kontekstowy: …”, gdy pokazuje otoczenie;
  - „Diagram reprezentatywny: …” albo „Schemat reprezentatywny: …”, gdy to rysunek.
  - Strona pokazuje to oznaczenie pod zdjęciem. Opis, który wspomina o kadrze reprezentatywnym albo kontekstowym bez oznaczenia na początku, zatrzymuje `npm run test:collections`.
  - Karta gatunku opisuje gatunek, więc zdjęcie tego gatunku zrobione za granicą nie dostaje oznaczenia. Dostaje je zdjęcie innego gatunku albo podgatunku, także wtedy, gdy nie da się potwierdzić, że to ten sam takson.
- Przy gatunkach chronionych, toksycznych lub wrażliwych dodawać komunikat o obserwacji bez niepokojenia.

## Publikacja na Vercel

Framework: **Other** albo brak frameworka. Build command pusty. Output directory: `.` albo puste, jeśli Vercel sam wykryje statyczną stronę.

- **Adres strony:** https://atlas-osobliwosci.vercel.app (adres kanoniczny w `index.html`).
- **Dawny adres:** `niezwykle-grzyby-polski.vercel.app` przekierowuje na stałe (308) na nowy, z zachowaniem podstrony, np. `/atlas/grzyby`. Przekierowanie jest w `vercel.json`.

## Stopka

W stopce jest znak **Made by Oroloko** oraz informacja o asyście AI. Na ciemnej stronie leży na jasnej tabliczce, bo znak ma ciemny napis na przezroczystym tle.
