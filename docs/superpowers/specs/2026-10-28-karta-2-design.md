# Karta 2.0: ciekawostki ze źródłami na kartach Atlasu (brief dla sesji w chmurze)

**Repo:** `Alamator/niezwykle-grzyby-polski`. Pracuj na gałęzi `content/karta-2`, gdzie leżą już dane w `data/facts/*.facts.js`. Wynik: PR do `main` z podglądem Vercel. **Bez merge.** Merge robi Robert po przeglądzie.

## Dane (już w gałęzi, nie generuj ich od nowa)

- `data/facts/<kolekcja>.facts.js` ustawia `window.ATLAS_FACTS["<kolekcja>"] = {checked, items}`.
  - `items` to obiekt `id karty → {facts:[…], notes:[…]}`.
  - Fakt: `{id, icon, pl, en, sources:[{url,label}], status:"verified"|"corrected"}`. W tekstach `pl` i `en` występuje markdown light: `**pogrubienie**` i `*kursywa*` (nazwy łacińskie).
  - `notes` to krótkie uwagi bezpieczeństwa autora, bez źródła, np. „Nurkowanie tylko z uprawnieniami”.
- Wszystkie fakty przeszły weryfikację: link → tekst źródła → dwa niezależne modele, a sporne przypadki dodatkowo przez wyszukiwanie. Fakty niepotwierdzone zostały odrzucone wcześniej. Nie dodawaj własnych faktów.
- `docs/content/poprawki-2026-10.json`: potwierdzone poprawki do obecnej treści kart. Każda ma tekst, źródło i proponowane brzmienie (nazwy polskie, statusy ochrony, siedliska, rekordy).
  - Wprowadź je w plikach danych kolekcji (`data/*.js`) i w `data/i18n.js` dla EN.
  - Gdy zmieniasz nazwę polską, stara trafia do nowego pola `synonyms` i wyszukiwarka ma ją dalej znajdować.

## Interfejs

1. **Karta i szczegóły:** sekcja „Ciekawostki / Fun facts” z 2–4 faktami. Każdy fakt ma ikonę (`icon`) i dyskretny link „źródło” (etykieta z `label`, nowa karta, `rel="noopener"`). Język według przełącznika PL/EN; gdy brak `en`, pokaż `pl`.
2. **Plakietki:** ochrona (ścisła/częściowa) i „trujący” zawsze jako ikona + tekst, nigdy sam kolor. Dane: z `safety_note` oraz z faktów o ochronie (prosta reguła na tekście albo pole ustawione przy wprowadzaniu poprawek).
3. **„Ciekawostka dnia”** na stronie głównej: jeden losowy fakt ze źródłem i linkiem do karty, deterministycznie według daty.
4. **Link do pojedynczej karty** (`/atlas/<kolekcja>#<id>` albo podobnie) i przycisk „Udostępnij”: Web Share API, a gdy go brak, kopiowanie linku.
5. **Quiz:** nowy typ pytania „prawda czy fałsz” z ciekawostek. Fałsz budujesz tylko z faktu innej karty tej samej kolekcji. Nie zmieniaj liczb w faktach, żeby nie wytwarzać fałszywych faktów.
6. **Źródła:** w widoku „Źródła” lista domen źródeł ciekawostek z licznikiem i zdanie, jak fakty były sprawdzane: „sprawdzone 28.10.2026 na tekście wskazanego źródła; sporne przez wyszukiwanie”.

Mapa miejsc to osobny, późniejszy krok. Nie rób jej w tym PR, chyba że zostanie czas. Wtedy MapLibre GL **4.7.1**, nie 5.x (5.x psuje iOS < 13.4).

## Zasady (AGENTS.md + ustalenia Roberta)

- Vanilla JS, żadnych nowych zależności (poza ewentualnym MapLibre 4.7.1). Mobile od 360 px, PWA, stopka „Made by Oroloko”.
- Zero porad kulinarnych i zachęt do zbierania; atlas jest edukacyjny.
- Nie dodawaj nowych kolekcji ani analityki.
- Nowe pliki danych podłącz w `COLLECTION_BUILDERS[].scripts` (`data/collections.js`) **po** plikach danych kolekcji, żeby ładowały się leniwie razem z kolekcją.

## Testy i odbiór

- `npm run test:data`, `npm run test:collections`, `npm run test:technical` oraz nowy `scripts/validate-facts.mjs`:
  - każdy fakt ma `pl`, `sources[0].url` (https) i `status`;
  - id kart istnieją w danych kolekcji;
  - brak duplikatów id.
- Sprawdź ręcznie na 360 px i na desktopie: karta, szczegóły, „Ciekawostka dnia”, quiz, przełącznik PL/EN.
- Opis PR: co zmieniono, zrzuty ekranu (mobile i desktop), link do podglądu Vercel, lista poprawek wprowadzonych do kart.
