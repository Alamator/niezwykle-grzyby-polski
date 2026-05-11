# Mineraly Polski - design

## Cel

Dodać do Atlasu Osobliwosci Polski nowy kafelek "Mineraly": edukacyjna kolekcje okolo 30-35 polskich osobliwosci mineralogicznych, oparta na przygotowanej notatce "Tworzenie Listy Polskich Mineralow.md" i dopasowana do istniejacego ukladu Atlas, Nauka, Quiz i Zrodla.

## Zakres kolekcji

Kolekcja ma miec szeroki, ale mineralogiczny zakres. Wchodza formalne gatunki mineralow, odmiany mineralne, kruszce, sole, kryszaly, konkrecje, mineraloidy i surowce, jesli ich osobliwosc wynika ze skladu, krystalizacji, barwy, chemii, zloza albo historii wykorzystania.

Do kolekcji moga wejsc m.in. krzemien pasiasty, bursztyn baltycki, siarka rodzima, halit z Wieliczki, agaty z Dolnego Slaska, haueryt z Machowa, aragonit, baryt, celestyn, kalcytowe lub kwarcowe osobliwosci, rudy miedzi i srebra oraz wybrane polskie mineraly typowe zatwierdzane przez IMA, jesli da sie opisac je zrozumiale i uczciwie dla odbiorcy atlasu.

## Granice wobec przyszlych kafelkow

Kafelek "Formacje skalne" zostaje osobnym tematem. Do mineralow nie trafiaja jako glowne hasla Bledne Skaly, Maczuga Herkulesa, goleborza, Kolorowe Jeziorka ani inne krajobrazy, w ktorych glowna ciekawosc jest forma terenu, erozja lub krajobraz. Wyjatek: obiekt moze zostac ujety, gdy karta dotyczy przede wszystkim mineralu lub krystalizacji, np. halitu w Grocie Krysztalowej.

Kafelek "Skamienialosci" rowniez zostaje osobnym tematem. Do mineralow nie trafiaja tropy dinozaurow, amonity, kosci ani stanowiska paleontologiczne jako takie. Wyjatek: dopuszczalne sa karty o biomineralizacji albo minerale organicznym, gdy glownym tematem jest mineral, a nie skamienialosc.

## Dobor pozycji

Lista startowa powinna miec okolo 30 pozycji. Jesli z notatki i dostepnych zrodel wyjdzie wiecej mocnych kandydatow, mozna rozszerzyc kolekcje do okolo 35 pozycji, ale nie kosztem jakosci zdjec, atrybucji i krotkich opisow.

Priorytet wyboru:

- polskie locus typicus albo mineral opisany po raz pierwszy z materialu z Polski,
- rozpoznawalna osobliwosc o wysokiej wartosci edukacyjnej,
- wyrazny efekt wizualny, chemiczny, historyczny albo gospodarczy,
- mozliwosc znalezienia legalnego zdjecia z Wikimedia Commons lub uczciwego kadru reprezentatywnego,
- brak konfliktu z przyszlymi kafelkami o formacjach skalnych i skamienialosciach.

## Kategorie

Proponowane kategorie kolekcji:

- "Endemity i nowe mineraly" - polskie locus typicus, gatunki zatwierdzane przez IMA, rzadkie fazy pierwiastkow krytycznych.
- "Kolor, swiatlo i forma" - agaty, fluoryt, kwarc, aragonit, halit i inne okazy, ktore dzialaja wizualnie.
- "Kruszce i pierwiastki" - siarka rodzima, miedz, srebro, galena, sfaleryt, rudy miedziowe i polimetaliczne.
- "Sole, ewaporaty i konkrecje" - Wieliczka, Bochnia, celestyn, baryt, gips, selenit i podobne procesy osadowe.
- "Historia i surowce kultury" - krzemien pasiasty, bursztyn, hematyt/rudy zelaza, kamienie uzywane w rzemiosle i dyplomacji.

## Dane i integracja

Nowy plik `data/minerals.js` udostepni `window.MINERAL_APP_DATA` z polami zgodnymi z istniejacymi kolekcjami: `categories`, `minerals`, `subtitle` i `safety_notice`. Kazdy rekord bedzie mial co najmniej `id`, `name_pl`, `name_lat`, `category`, `hook`, `quiz_angle`, `safety_note`, `region_pl`, `habitat_pl`, `occurrence_note` i `level`.

Nowy plik `data/mineral-photo-pack-v01.js` dopnie zdjecia z Wikimedia Commons do rekordow po `id`. Metadane zdjec beda zgodne z istniejacymi paczkami: `image`, `image_alt`, `image_author`, `image_source`, `image_license`, `license_url` i `image_modifications`.

`index.html` zaladuje `minerals.js` i `mineral-photo-pack-v01.js` przed `data/collections.js`. `data/collections.js` doda kafelek `mineraly` z tytulem "Mineraly", naglowkiem, licznikiem, tekstem pola wyszukiwania, kolorem akcentu i zrodlowym komunikatem o zdjeciach Commons. `data/i18n.js` dostanie angielskie teksty kolekcji, kategorii i pozycji, zeby walidator dwujezycznosci nadal przechodzil.

## Tresc i bezpieczenstwo

Opisy maja byc krotkie, autorskie i ostrozne. Atlas nie bedzie poradnikiem zbierania mineralow, eksploracji kopaln ani wchodzenia do wyrobisk. Karty o obiektach toksycznych, radioaktywnych, podziemnych albo chronionych dostana jasne noty: nie zbierac, nie rozbijac skal, nie wchodzic do zamknietych wyrobisk, nie prowadzic domowych eksperymentow z rudami i zwiazkami chemicznymi.

## Zdjecia

Zdjecia beda podpinane przez Wikimedia Commons `Special:Redirect/file`, bez kopiowania plikow do repozytorium. Dla kazdego uzytego zdjecia trzeba zweryfikowac autora, strone pliku, licencje i link do licencji. Jesli nie ma dobrego zdjecia konkretnego polskiego stanowiska lub mineralu, mozna uzyc kadru reprezentatywnego tylko wtedy, gdy `image_alt` i opis jasno to mowia.

## Testowanie i weryfikacja

Walidator kolekcji ma zostac rozszerzony tak, aby sprawdzal:

- `index.html` laduje `data/minerals.js` i `data/mineral-photo-pack-v01.js` we wlasciwej kolejnosci,
- Atlas eksponuje siedem kolekcji: grzyby, owady, kwiaty, ryby, ptaki, drzewa i mineraly,
- kolekcja mineralow ma okolo 30-35 pozycji i wszystkie wymagane pola,
- wszystkie pozycje mineralow maja kategorie istniejace w `categories`,
- zdjecia mineralow, o ile dodane, maja pelne pola atrybucji i korzystaja z linkow Wikimedia Commons,
- angielskie tlumaczenia kolekcji, kategorii i pozycji istnieja w `data/i18n.js`,
- zakazane nazwy projektu nadal nie wystepuja.

Po implementacji nalezy uruchomic sprawdzenia danych, kolekcji i zakazanych nazw, a nastepnie obejrzec strone lokalnie na szerokosci mobilnej okolo 360 px i desktopowej, szczegolnie wybor kafelka, Atlas, Nauke, Quiz i Zrodla.

## Publikacja

Po przejsciu weryfikacji zmiany maja zostac zapisane na osobnej galezi `codex/mineraly-polski`, wypchniete do GitHuba i przygotowane do merge przez pull request albo wypchnieta galaz, zgodnie z dostepnymi narzedziami repozytorium.
