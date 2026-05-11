# Osobliwe Formacje Skalne Polski - Design

## Cel

Dodać do Atlasu Osobliwości Polski kolejny kafelek: `Formacje skalne`. Kolekcja ma działać tym samym rytmem co minerały: osobny plik danych, osobny pakiet zdjęć Wikimedia Commons, rejestracja kafelka w `collections.js`, tłumaczenia i walidacja testami.

## Zakres kolekcji

Pierwsza paczka obejmuje 33 obiekty wybrane z pliku `Osobliwe Formacje Skalne Polski_ Atlas.md` oraz z wcześniejszej rekomendacji użytkownika. Priorytet mają obiekty łatwe do zapamiętania, rozpoznawalne krajobrazowo i nadające się do quizu:

- granitowe formacje Karkonoszy: Słonecznik, Pielgrzymy, Dziurawa Skała, Trzy Świnki, Chojnik;
- wulkaniczne i pogórnicze osobliwości Sudetów: Małe Organy Myśliborskie, Organy Wielisławskie, Kolorowe Jeziorka;
- labirynty i osobliwości piaskowcowe Sudetów: Szczeliniec Wielki, Błędne Skały, Białe Skały, Skalne Grzyby, Czartowskie Skały, Skalna Czaszka, Radkowskie Skały, Diabelska Maczuga;
- jurajski kras i bramy: Maczuga Herkulesa, Brama Krakowska, Brama Bolechowicka, Okiennik Wielki, Skała Miłości w Mstowie, Góra Zborów;
- Karpaty i Tatry: Giewont, Przełom Białki, Prządki, Skamieniałe Miasto, Diable Skały, Zęzów i Czarne Działy;
- Świętokrzyskie, Roztocze i Niż: Skałki Piekło pod Niekłaniem, Kadzielnia, Krzemionki, Głaz Trygław, Groty Mechowskie.

Piekiełko koło Tomaszowa Lubelskiego pozostaje kandydatem do późniejszej paczki, ponieważ w pierwszym przejściu nie znalazłem zdjęcia samej formacji na Wikimedia Commons z jasną atrybucją.

## Dane

Nowy plik `data/rock-formations.js` zdefiniuje `window.ROCK_FORMATION_APP_DATA` z kategoriami i 33 wpisami. Wpisy użyją istniejącego modelu danych: `id`, `name_pl`, `name_lat`, `category`, `hook`, `quiz_angle`, `safety_note`, `region_pl`, `habitat_pl`, `occurrence_note`, `level`.

Pole `name_lat` będzie pełniło rolę krótkiej litologii lub genezy, ponieważ kolekcja nie dotyczy gatunków biologicznych.

## Zdjęcia

Nowy plik `data/rock-formation-photo-pack-v01.js` dopnie zdjęcia przez Wikimedia Commons `Special:Redirect/file/...`, bez kopiowania ich lokalnie. Każdy wpis ma mieć autora, stronę pliku, nazwę licencji, link do licencji i informację o osadzeniu.

Jeśli zdjęcie jest reprezentatywne lub pokazuje szerszy kontekst, `image_alt` powie to wprost.

## Integracja

`index.html` załaduje dane formacji i pakiet zdjęć przed `collections.js`. `data/collections.js` doda kafelek `formacje-skalne` z akcentem `cliff`. `css/styles.css` doda prosty akcent kafelka. `data/i18n.js` doda angielski blok kolekcji, kategorie, poziomy i domyślne teksty bezpieczeństwa/siedlisk.

## Testy

`scripts/validate-collections.mjs` ma najpierw wymagać nowej kolekcji, skryptów, 33 wpisów, 33 zdjęć z Commons i tłumaczeń. Oczekiwany pierwszy wynik: test pada, dopóki nie ma nowych danych. Po implementacji muszą przejść:

- `npm run test:collections`
- `npm run test:data`
- kontrola braku zakazanych nazw organizacji

Na końcu trzeba sprawdzić lokalnie kafelek, atlas, źródła i quiz na desktopie oraz na szerokości telefonu.
