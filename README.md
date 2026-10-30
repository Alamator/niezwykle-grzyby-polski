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
data/i18n/<kolekcja>.en.js
data/occurrence/<kolekcja>.occurrence.js
data/start-page.js
data/map-points.js
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

Strony kolekcji i kart z własnymi tytułami powstają po `npm run build`. Bez tego lokalny serwer pokazuje te adresy przez `index.html`, a aplikacja i tak otwiera właściwą kartę.

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
   - Jeśli „Występowanie w Polsce”, „Region” i „Siedlisko” nie pasują do kolekcji (kopalnia, zorza, minerał), nazwij je po swojemu w `card_labels`, np. `card_labels: { occurrence: "Miejsce i obiekt", region: "Miejsce", habitat: "Obiekt" }`. Angielskie odpowiedniki idą do `card_labels` kolekcji w `data/i18n.js`.
   - Tekst w polu nie powtarza swojej etykiety: przy etykiecie „Mechanizm” piszemy „system pochylni przenosi…”, a nie „Mechanizm: system pochylni…”.
   - Pole `level` to zwykle motyw ciekawostki (karta pokazuje „Motyw: solne UNESCO”). Tylko wartości „łatwy start”, „średni” i „trudniejszy” karta podpisuje jako „Poziom”.
4. Dodaj angielskie teksty:
   - nazwę, opisy i kategorie kolekcji w `data/i18n.js`, razem z angielskim `teaser`;
   - teksty kart w `data/i18n/<kolekcja>.en.js`, na liście `scripts` kolekcji. Każda karta ma tu każde pole (`name`, `hook`, `quiz_angle`, `safety_note`, `region`, `habitat`, `occurrence`, `level`, a dla miejsc także `latin`, czyli podpis pod nazwą), przetłumaczone 1:1 z polskiego. Karta bez angielskiego tekstu pokazałaby polski, a `npm run test:collections` tego pilnuje.
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

### Mapa wszystkich miejsc (`/mapa`)

- Wszystkie miejsca atlasu na jednej mapie, z wyborem kolekcji i listą kart pod mapą. Karta otwiera się w swojej kolekcji, a „wstecz” wraca na mapę tam, gdzie była.
- Wejścia: link „Mapa” w górnym pasku, liczba miejsc pod tytułem strony startowej i link pod mapą kolekcji.
- Strona nie wczytuje danych kolekcji. Punkty i nazwy kart są kopiami w `data/map-points.js`, jeden wpis na obiekt Wikidaty, z kartami, które go opisują.
  - Plik tworzy `npm run build:map-points`. Po zmianie punktu albo nazwy karty `npm run test:collections` zatrzymuje się, dopóki plik nie zostanie odtworzony.
  - Liczba miejsc musi się zgadzać z liczbą pod tytułem strony startowej.
- **„Blisko mnie”:** po zgodzie przeglądarki na położenie strona liczy odległość w linii prostej i pokazuje 10 najbliższych kart, w wybranej kolekcji albo we wszystkich.
  - Liczy to przeglądarka. Położenie nie jest nigdzie zapisywane ani wysyłane, co strona mówi przy przycisku.
  - Mapa pobiera z OpenFreeMap podkład oglądanego obszaru, więc po „Blisko mnie” także okolicy, w której jest użytkownik.

## Moja szuflada

- Przycisk „☆ Zachowaj w szufladzie” jest na karcie, a gwiazdka na jej kafelku w atlasie. Zachowane karty pokazuje strona główna pod tytułem, w sekcji „Moja szuflada”: najnowsze najpierw, osiem na początek i przycisk „Pokaż wszystkie”.
- Lista jest tylko w przeglądarce (`localStorage`, klucz `atlasDrawer`). Wpis to kolekcja, id karty i nazwy karty po polsku i angielsku, żeby strona główna pokazała listę bez wczytywania kolekcji.
  - Gdy kolekcja się wczyta, jej karty w szufladzie dostają aktualne nazwy, a karta, której nie ma już w atlasie, wypada z szuflady.
  - Atlas niczego nie wysyła. `npm run test:technical` pilnuje, żeby skrypty strony nie miały `fetch`, `XMLHttpRequest`, `sendBeacon`, `WebSocket` ani `EventSource`.
  - Gdy przeglądarka nie pozwala zapisywać, na przykład w niektórych oknach prywatnych, strona o tym mówi.
  - Zmianę w jednej karcie przeglądarki widać od razu w pozostałych.

## Quiz atlasu (`/quiz`)

- Pytania z całego atlasu, z tych samych kart i tak samo jak w quizie kolekcji. Każde pytanie powstaje w swojej kolekcji, więc złe odpowiedzi to karty tego samego rodzaju.
- Miejsca Zagłady i martyrologii nie trafiają ani do pytań, ani do odpowiedzi, tak jak w ciekawostce dnia i w „Zaskocz mnie”.
- **Wyzwanie dnia:** 5 pytań z 5 kolekcji. Kolekcje, karty i odpowiedzi zależą tylko od daty, więc tego samego dnia każdy dostaje te same pytania, po polsku i po angielsku.
  - Liczy się pierwszy wynik dnia. Wynik i serię dni z rzędu zna tylko przeglądarka (`localStorage`, klucz `atlasDaily`).
  - „Udostępnij wynik” udostępnia albo kopiuje zdanie z wynikiem i adres quizu.
- **Losowy quiz:** 10 pytań z 5 losowych kolekcji, za każdym razem innych.
- Strona wczytuje dane tylko tych kolekcji, z których są pytania.
- Wejścia: „Wyzwanie dnia” pod ciekawostką dnia na stronie głównej i link pod quizem każdej kolekcji.
- Liczby pytań są w `js/app.js` (`DAILY_QUESTIONS`, `MIX_QUESTIONS`). `index.html` podaje je w tekstach, zanim ruszy skrypt, a `npm run test:technical` pilnuje, żeby się zgadzały.

## Kontakt i zgłoszenia błędów

- Skrzynka atlasu: kontakt (małpa) atlas-osobliwosci.pl, w OVH (Zimbra Starter, w cenie domeny), z webmailem pod https://webmail.mail.ovh.net/.
- Na końcu każdej karty jest „Coś się nie zgadza? Zgłoś błąd w tej karcie”. Link otwiera e-mail z nazwą karty i kolekcji w temacie i z adresem karty w pierwszej linijce.
- W stopce jest „Kontakt i zgłoszenia błędów” z tym samym adresem.
- Adres składa `js/app.js`. Nie ma go w kodzie HTML stron, żeby nie znalazły go boty zbierające adresy. Pilnuje tego `npm run test:technical`.

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
- Ramka „Występowanie w Polsce” (region, siedlisko i uwaga pod nimi) podaje tylko to, co potwierdzają źródła. Czego nie da się potwierdzić, tego nie piszemy.
  - Źródła i data sprawdzenia leżą w `data/occurrence/<kolekcja>.occurrence.js`, na liście `scripts` kolekcji przed plikiem ciekawostek:

    ```js
    window.ATLAS_OCCURRENCE_SOURCES["grzyby"] = { checked: "RRRR-MM-DD", items: { "<id karty>": [{ url: "https://…", label: "Wikipedia (PL)" }] } };
    ```

  - Karta pokazuje je pod ramką: „Źródła: … · sprawdzone DD.MM.RRRR”.
  - Link do Wikipedii prowadzi do wersji artykułu, która była sprawdzana (`oldid`).
  - `npm run test:collections` pilnuje, żeby każda karta kolekcji z takim plikiem miała co najmniej jedno źródło `https`.
  - Na razie mają je Grzyby. Zmiana tekstu w ramce wymaga ponownego sprawdzenia jego źródeł.

## Publikacja na Vercel

Framework: **Other** albo brak frameworka. Build Command `npm run build` i Output Directory `.` (główny katalog projektu) są ustawione w `vercel.json`.

## Wyszukiwarki i podgląd linków

- **Adresy:** kolekcja ma adres `/atlas/<kolekcja>`, a karta `/atlas/<kolekcja>/<karta>`, na przykład `/atlas/grzyby/okratek-australijski`. Mapa wszystkich miejsc ma adres `/mapa`, a quiz atlasu `/quiz`.
  - Adres karty to jej id bez polskich liter.
  - Stare linki `/atlas/<kolekcja>#item=<karta>` dalej otwierają kartę i przechodzą na jej adres.
- **Strony:** `npm run build` (`scripts/build-pages.mjs`) robi przy każdym wdrożeniu stronę dla każdej kolekcji i karty, stronę mapy wszystkich miejsc (`mapa.html`), stronę quizu atlasu (`quiz.html`), `sitemap.xml` i stronę błędu `404.html`.
  - Każda strona to `index.html` z własnym tytułem, opisem, adresem kanonicznym i podglądem linku. Jest od razu otwarta na kolekcji, na mapie albo na quizie, a bez skryptów pokazuje tekst karty albo listę kart.
  - Obrazek podglądu jest wspólny, bez zdjęć z kart, bo podgląd linku nie zmieści ich podpisów.
  - Wyniki (`atlas/`, `mapa.html`, `quiz.html`, `sitemap.xml`, `404.html`) nie trafiają do repozytorium (`.gitignore`).
  - Gdy zmieni się `index.html` tak, że skrypt nie znajdzie tytułu, opisu albo innego miejsca do podmiany, budowanie się zatrzyma. Pilnuje tego też `npm run test:technical`.
- **`robots.txt`:** wskazuje mapę strony i nie wpuszcza wyszukiwarek do `docs/`, `scripts/` i plików `.md`.
- **Google Search Console:** właściwość domeny `atlas-osobliwosci.pl` potwierdza się wpisem TXT w strefie DNS w OVH. Mapa strony: `https://www.atlas-osobliwosci.pl/sitemap.xml`.

- **Adres strony:** https://www.atlas-osobliwosci.pl (adres kanoniczny w `index.html`).
- **Adres bez `www`:** `atlas-osobliwosci.pl` przekierowuje na stałe (308) na `www`. To ustawienie domeny w Vercel (Domains), nie w kodzie.
- **Dawne adresy:** `atlas-osobliwosci.vercel.app` i `niezwykle-grzyby-polski.vercel.app` przekierowują na stałe (308) na główny, z zachowaniem podstrony, np. `/atlas/grzyby`. Przekierowania są w `vercel.json`.
- **Uwaga:** w `vercel.json` nie może być przekierowania z `www` na adres bez `www`, bo z ustawieniem domeny dałoby pętlę. Pilnuje tego `npm run test:technical`.

## Stopka

W stopce jest znak **Made by Oroloko** oraz informacja o asyście AI. Na ciemnej stronie leży na jasnej tabliczce, bo znak ma ciemny napis na przezroczystym tle.
