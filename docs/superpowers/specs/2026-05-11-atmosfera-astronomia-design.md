# Osobliwości atmosferyczne i astronomiczne Polski - projekt kolekcji

## Cel

Dodać do Atlasu Osobliwości Polski kafelek `Atmosfera i astronomia`. Kolekcja ma działać tak samo jak minerały, formacje skalne i skamieniałości: lista wpisów, kategorie, fiszki, quiz, źródła oraz zdjęcia z Wikimedia Commons z pełną atrybucją.

## Zakres

Kolekcja obejmuje 33 karty wybrane z pliku `Polski Atlas Zjawisk Atmosferycznych i Astronomicznych.md`. Zestaw rozdziela zjawiska zbiorcze na czytelne, zapamiętywalne karty i pomija najbardziej sporne relacje jako samodzielne hasła. Grupy:

- optyka górska: widmo Brockenu, gloria, morze chmur, ognie św. Elma i wyładowania koronowe;
- burze i górna atmosfera: czerwone duszki, blue jets, elves, wyładowania dodatnie i burze śnieżne z piorunami;
- niebo nocne i kosmos: białe noce, obłoki srebrzyste, parki ciemnego nieba, Droga Mleczna, zorze, Perseidy i Geminidy;
- Bałtyk, refrakcja i dalekie obserwacje: miraże morskie, efekt morza, Tatry widziane z Roztocza i atmosfera jako soczewka;
- mróz, pył i osobliwe osady: Hala Izerska, Litworowy Kocioł, Puścizna Rękowiańska, Siedlce, pył saharyjski, brudny deszcz i czerwony śnieg.

## Dane i zdjęcia

Nowe pliki:

- `data/atmosphere-astronomy.js` - kategorie, 33 wpisy, oryginalne krótkie opisy, regiony, noty bezpieczeństwa i kąty quizowe;
- `data/atmosphere-astronomy-photo-pack-v01.js` - zdjęcia osadzone z Wikimedia Commons przez `Special:Redirect/file/...`, z autorem, źródłem, licencją i informacją o sposobie użycia.

Część zdjęć jest dokładna dla Polski lub zjawiska, a część reprezentatywna, gdy brak dobrego wolnego kadru konkretnej polskiej obserwacji. W takich przypadkach `image_alt` ma jasno mówić, że to kadr reprezentatywny.

## Integracja i testy

- `index.html` ładuje nowe dane i paczkę zdjęć przed `collections.js`;
- `data/collections.js` dodaje kolekcję `atmosfera-astronomia`;
- `data/i18n.js` dostaje angielskie nazwy kategorii, wpisów i fallbacki;
- `css/styles.css` dostaje akcent kafelka;
- `scripts/validate-collections.mjs` sprawdza skrypty, 33 wpisy, 33 zdjęcia, Commons i EN.

Walidacja końcowa:

- `npm run test:collections`
- `npm run test:data`
- kontrola braku zakazanych nazw roboczych
- lokalny podgląd kafelka, wpisów i źródeł.
