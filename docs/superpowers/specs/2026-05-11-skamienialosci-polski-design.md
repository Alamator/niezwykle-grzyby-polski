# Osobliwe skamieniałości Polski - projekt kolekcji

## Cel

Dodać do Atlasu Osobliwości Polski kolejny kafelek: `Skamieniałości`. Ma działać tak samo jak wcześniejsze kolekcje minerałów i formacji skalnych: lista wpisów, kategorie, fiszki, quiz, źródła oraz zdjęcia z Wikimedia Commons z pełną atrybucją.

## Zakres

Kolekcja obejmie 33 pozycje wybrane z pliku `Polskie Skamieniałości_ Osobliwości do Atlasu.md` oraz z wcześniej wskazanego przez użytkownika kontekstu o tropach dinozaurów i amonitach. Zestaw będzie podzielony na pięć grup:

- początki paleozoiku i dewon: trylobity, rafy Kadzielni, wczesna flora, Alienacanthus i tropy tetrapodów z Zachełmia;
- trias i tropy dinozaurów: Smok wawelski, Lisowicia, Proterochersis oraz ślady z Sołtykowa, Bałtowa i Borkowic;
- morza mezozoiku: Tholodus, Encrinus, pliozaury, plezjozaury, krokodylomorfy, Limulus darwini, Owadów-Brzezinki i amonity;
- bursztyn i kenozoik: inkluzje owadów, ptasznik, chwytówka, Jantarogekko, Eurotrochilus, Jamna i skamieniałe drewna Roztocza;
- plejstocen: mamuty, nosorożec włochaty, Kraków-Spadzista i niedźwiedzie jaskiniowe z Kletna.

## Dane i zdjęcia

Nowe pliki:

- `data/fossils.js` - kategorie, 33 wpisy, krótkie oryginalne opisy, regiony, siedliska, noty bezpieczeństwa i kąty quizowe;
- `data/fossil-photo-pack-v01.js` - zdjęcia z Wikimedia Commons przez `Special:Redirect/file/...`, autor, źródło, licencja i informacja o osadzeniu.

Część zdjęć będzie dokładna dla konkretnego znaleziska lub stanowiska. Dla okazów muzealnych bez wolnego zdjęcia konkretnego egzemplarza użyję uczciwie oznaczonych kadrów reprezentatywnych, np. pokrewnego typu skamieniałości, rekonstrukcji albo stanowiska.

## Integracja

- `index.html` ładuje `fossils.js` i paczkę zdjęć przed `collections.js`;
- `data/collections.js` dodaje kafelek `skamienialosci`;
- `data/i18n.js` dostaje angielskie nazwy kategorii, wpisów i fallbacki;
- `css/styles.css` dostaje akcent kafelka;
- `scripts/validate-collections.mjs` sprawdza obecność skryptów, 33 wpisy, 33 zdjęcia, Commons źródła i EN.

## Testy

Najpierw walidator kolekcji ma paść na braku nowych skryptów. Po implementacji muszą przejść:

- `npm run test:collections`
- `npm run test:data`
- kontrola braku zakazanych nazw organizacji

Na końcu sprawdzam lokalny podgląd desktop/mobile oraz ładowanie obrazów.
