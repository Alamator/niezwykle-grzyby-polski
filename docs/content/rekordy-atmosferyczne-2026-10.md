# Szuflada „Rekordy atmosferyczne” (31.10.2026)

Materiał wyjściowy to 30 pozycji o rekordach pogody w Polsce, przygotowanych 30.10.2026. Do atlasu weszło 17 kart.

## Decyzje Roberta

- Osobna szuflada, a nie kategoria w „Atmosferze i astronomii”.
- Żywiec 1929 wchodzi, ale bez słowa „oficjalny”. Za oficjalny rekord zimna IMGW-PIB uznaje −41 °C z Siedlec (11 stycznia 1940 r.). Atlas pisze tak w karcie „Siedlce i rekord mrozu” i w ciekawostce F1073.
- Szuflada wchodzi najpierw bez ciekawostek.
  - Ciekawostki miał zrobić generator. Ich sprawdzone teksty i zasady są w `zmiany-dla-generatora-2026-10.json` (`new_collections`, `new_facts`).
  - Generatora nie było, więc 31.10.2026 te 35 ciekawostek trafiło prosto do `data/facts/rekordy-atmosferyczne.facts.js` (`README-weryfikacja.md`). Wcześniej kolekcja stała na liście `FACTS_PENDING` w `scripts/validate-facts.mjs`, a „Ciekawostka dnia” ją pomijała.

## Jak sprawdzono

1. **30.10.2026:** każdą z 30 pozycji sprawdzono zdanie po zdaniu, w trzech niezależnych przebiegach po 10 pozycji. Wynik i powody są w raporcie z audytu z tego dnia.
2. **31.10.2026:** 17 kart napisano od nowa z tego sprawdzenia, po polsku i po angielsku 1:1.
   - Każdą kartę sprawdził osobny, krytyczny sprawdzający: każde zdanie ze źródłem, tłumaczenie, zdjęcie, punkt na mapie.
   - Na koniec sprawdzono wszystkie karty razem i z kartami, które atlas już ma.
3. **Zasada:** co sporne, niepotwierdzone albo oparte tylko na obliczeniach własnych, tego nie ma.
4. **Przegląd całej zmiany:** po złożeniu szuflady niezależny przegląd sprawdził treść, kod, działanie i angielski, także poprawki wprowadzone po sprawdzeniu kart. Każde zgłoszenie przeszło dwa sprawdzenia. Potwierdzone poprawiono, m.in.:
   - przy tornadach z 2008 r. nie ma już oceny F3–F4;
   - podpisy źródeł nie mają przecinków i dat w polskim zapisie;
   - quiz pyta „które miejsce” tylko z miejscami w odpowiedziach.

**Ograniczenie:**
- Do 31.10.2026 strony IMGW-PIB, PAP, GUS, TPN i Lasów Państwowych nie otwierały się z naszego środowiska, więc ich treść była znana tylko z wyników wyszukiwania. Wyjątek od 31.10.2026: rocznik GUS Poznań (Robert dopuścił `poznan.stat.gov.pl`, niżej). 1.11.2026 Robert dopuścił kolejne strony, m.in. IMGW-PIB, GUS, Lasów Państwowych i angielskiej Wikipedii, a szufladę sprawdzono jeszcze raz (niżej, „Sprawdzenie z 1.11.2026”).
- Nadal nie otwierają się stąd:
  - biuletyn PSHM na `dane.imgw.pl`;
  - PAP: zamiast artykułu strona pokazuje test, czy czytelnik nie jest robotem;
  - praca T. Niedźwiedzia (IGiPZ PAN 1999, sumy opadów z 1997 r.);
  - repozytorium RE-BUŚ (wysokość stacji na Hali Gąsienicowej);
  - praca E. Żmudzkiej w archiwum TPN (`archiwum.tpn.pl`);
  - Radio Kraków;
  - roczniki GUS z Opola i Szczecina oraz kopia publikacji GUS na `www.bdl.lasy.gov.pl`.
- Trzech zdjęć (Wrocław, Suwałki, Kalisz) nie dało się początkowo stąd obejrzeć, bo Commons blokował zapytania. Autora i licencję sprawdzono, a same zdjęcia obejrzano później tego dnia (niżej, „Decyzje z 31.10.2026”).
- Status „verified” ma tylko ciekawostka zgodna ze wskazanym źródłem, które dało się otworzyć. Ciekawostka potwierdzona tylko w innych źródłach ma status „checked”.
- Linki do Wikipedii prowadzą do sprawdzanej wersji artykułu (`oldid`).

## Ramka „Gdzie i kiedy”

- Każda karta podaje miejsce, czas i wartość. Pod ramką są źródła z datą sprawdzenia (`data/occurrence/rekordy-atmosferyczne.occurrence.js`).
- Nagłówek ramki jest neutralny, bo nie każda karta opisuje rekord kraju. Średnie roczne Wrocławia, Suwałk i Kalisza są „jednymi z najwyższych/najniższych”, a nie rekordami.

## Karty (17)

| Karta | Najważniejsze zmiany wobec szkicu |
| --- | --- |
| Słubice — 40,5 °C | „rekord ogłoszony przez IMGW (stacje synoptyczne)”, bez „oficjalny” i bez Kołudy Wielkiej; „blisko 105 lat” |
| Prószków — 40,2 °C | rekord ciepła przypisany IMGW; pomiar z ówczesnej niemieckiej stacji |
| Żywiec — mróz −40,6 °C | bez „oficjalny”; odesłanie do karty Siedlec; bez nieudokumentowanego „−39,6 °C według UAM” |
| 2024 — rok rekordowego ciepła | według raportu IMGW-PIB za 2024 r.; bez obliczeń własnych |
| Wrocław — średnio 9,7 °C | bez „bieguna ciepła” (to przydomek Tarnowa w szufladzie „Rekordy krajobrazu”); bez kolejności miast i setnych części stopnia |
| Suwałki — średnio 7,2 °C | norma 7,2 °C (GUS), nie 7,3; bez „bieguna zimna” |
| Hala Gąsienicowa — 300 mm | „stacja meteorologiczna”; najwyższy opad dobowy według IMGW-PIB |
| Lipiec 1997 — ulewy | sumy z trzech dób; ulewy „przyczyniły się” do powodzi; bez 557 mm |
| Kasprowy Wierch — opady roczne | średnia 1966–2006 z pracy naukowej; zgodnie z IMGW-PIB Hala Gąsienicowa miała w 2001 r. więcej (2626 mm) |
| Kalisz — opady roczne | norma 494 mm (GUS); „jedna z najniższych”, bez „najsuchszy” |
| Śnieżka — wiatr 65 m/s | wartość z 21 lutego 2004 r. i przekroczona skala wiatromierza, bez „rekordu Polski” |
| Kasprowy Wierch — halny 1968 | porywy dochodzące do 75–80 m/s według IMGW-PIB; „prawdopodobnie” najsilniejszy wiatr na Kasprowym, nie w Polsce |
| Lublin — tornado z 1931 r. | „jedno z najsilniejszych udokumentowanych”; F4 jako szacunek; wagony przewracane, nie podnoszone |
| 15 sierpnia 2008 — seria tornad | bez oceny w skali Fujity: źródła się różnią, a F3 podaje tylko angielska Wikipedia, której nie dało się stąd przeczytać; zostały ścieżka i 15 rannych |
| 11 sierpnia 2017 — derecho | według IMGW-PIB porywy ponad 150 km/h; bez sprzecznych liczb hektarów lasu; zdjęcie skutków nawałnicy koło Lipusza (szkic nie miał zdjęcia) |
| Tomaszów Mazowiecki — grad 13,5 cm | rekord wielkości gradu przypisany IMGW-PIB (2023); bez „co najmniej” |
| Śnieżka — mgła | ok. 300 dni z mgłą w roku, za tabelą w haśle Wikipedii „Rekordy klimatyczne w Polsce” (bez źródła instytucjonalnego); bez „najwięcej w Polsce”, bo podaje to tylko zestawienie w Wikipedii oparte na encyklopedii szkolnej |

## Pominięte (13)

| Pozycja | Powód |
| --- | --- |
| Kołuda Wielka 40,6 °C | sporne: IMGW nie rozstrzygnął, który pomiar jest rekordem |
| Rozdziele, noc 28,4 °C | niepotwierdzone |
| Opole, 37 dni upalnych | tylko obliczenia własne (TVN podaje 28 dni) |
| Kasprowy, 88 dni bez odwilży | tylko obliczenia własne |
| Krosno, burze | tylko obliczenia własne |
| Ciśnienie 1907 i 1931 | rekonstrukcja nieinstytucjonalna |
| Hel, najwięcej słońca | tylko obliczenia własne; zły obiekt Wikidaty |
| Najmniej słońca w górach | tylko obliczenia własne |
| Siedlce −41 °C | atlas ma już kartę „Siedlce i rekord mrozu” |
| Litworowy Kocioł −41,1 °C | atlas ma już kartę „Litworowy Kocioł” |
| Zorza w maju 2024 | atlas ma już kartę o zorzach nad Polską |
| Kamienica 2024 | źródła podają różne wartości (254,5 mm w publikacji GUS i w danych dobowych IMGW-PIB, 214,5 i 228,4 mm w tekstach IMGW-PIB); zostaje poza atlasem (decyzja z 31.10.2026), do ponownej decyzji Roberta (niżej) |
| 388 cm śniegu na Kasprowym | bez osobnej karty; od 31.10.2026 ciekawostka F1543 na karcie Kasprowego Wierchu (niżej) |

Nowe karty sprawdza też `npm run test:collections`:
- Żywiec i Słubice nie nazywają swojego rekordu oficjalnym, także w ciekawostkach, a szuflada nie wspomina Kołudy Wielkiej ani 254,5 mm z Kamienicy;
- pominięte pozycje nie wracają;
- liczba kart i zdjęć się zgadza.

Ciekawostki szuflady to sprawdzone teksty z `new_facts`. Od 31.10.2026 poprawia się je w `data/facts/rekordy-atmosferyczne.facts.js`, jak ciekawostki innych szuflad (`README-weryfikacja.md`).

## Do sprawdzenia przez Roberta

- **Zdjęcia na podglądzie (rozstrzygnięte 31.10.2026):** Wrocław, Suwałki i Kalisz. Początkowo nie dało się ich stąd obejrzeć (sprawdzone były autor i licencja); obejrzane później tego dnia, a Kalisz ma nowe zdjęcie (niżej).
- **Przypis „c” przy Kaliszu (rozstrzygnięte 31.10.2026):** w tabeli rocznika GUS Poznań 2023 wiersz Kalisza ma przypis „c”. Początkowo PDF się stąd nie otwierał; po dopuszczeniu `poznan.stat.gov.pl` odczytano go: przypis dotyczy tylko zachmurzenia (niżej).
- **Kamienica 2024 i 388 cm śniegu na Kasprowym (rozstrzygnięte 31.10.2026):** początkowo miały wejść po potwierdzeniu w źródłach IMGW. 388 cm weszło jako ciekawostka F1543, a Kamienica zostaje poza atlasem (niżej). **Kamienica wraca do decyzji Roberta:** przy sprawdzeniu z 1.11.2026 wartość 254,5 mm znalazła się w publikacji GUS i w danych IMGW-PIB (niżej, „Do decyzji Roberta”).
- **Adresy kart (zasada na stałe):** pięć różni się od szkicu, np. `wroclaw-srednia-roczna` zamiast `wroclaw-biegun-ciepla`; pełna lista jest w `id_changes`. Po publikacji adresy kart się nie zmieniają.

## Decyzje z 31.10.2026: 388 cm, Kamienica, Kalisz

- **388 cm śniegu na Kasprowym Wierchu:** potwierdza je artykuł w „Przeglądzie Geofizycznym” (2018, s. 367: O. Skrynyk, L. Rymarowicz) oparty na archiwum IMGW-PIB. W marcu 1939 r. maksymalna grubość pokrywy śnieżnej na Kasprowym wynosiła 388 cm. Dnia ani słowa „rekord” artykuł nie podaje. 355 cm to maksimum lat 1966–2023 (Quaestiones Geographicae 2025), a 335 cm (2009) to wypowiedź w mediach. Te liczby dotyczą różnych okresów. Według decyzji Roberta 388 cm weszło jako ciekawostka F1543 na karcie „Kasprowy Wierch — średni roczny opad ok. 1800 mm”, bez dnia i bez słowa „rekord”. Osobnej karty nie ma.
- **Kamienica 2024:** zostaje poza atlasem. Do 31.10.2026 wartości 254,5 mm nie było w żadnym znalezionym źródle (1.11.2026 znalazła się w publikacji GUS i w danych IMGW-PIB, niżej). Komunikat IMGW-PIB z 14.09.2024 (znany tylko z wyników wyszukiwania) podaje 214,5 mm za okno 13.09, 20:00 – 14.09, 20:00, a abstrakt konferencyjny IMGW-PIB z 2025 r. 228,4 mm za 14.09. Według biuletynu PSHM najwyższy opad dobowy 14.09.2024 zanotowano na Śnieżniku (218,8 mm).
- **Zdjęcia Wrocławia, Suwałk i Kalisza:** obejrzane przez miniatury Commons (`commons.wikimedia.org/w/thumb.php`). Wrocław (Odra i most Sikorskiego o zmierzchu) i Suwałki (zegar słoneczny w parku zimą) pasują do kart i zostają. Zdjęcie Kalisza było małe (680×510 px) i pokazywało osiedle bez rozpoznawalnego obiektu. Według decyzji Roberta zastąpiło je zdjęcie ratusza i Głównego Rynku z lotu ptaka: „Kalisz Town Hall 2019 P04.jpg”, Fallaner, 23.06.2019, CC BY-SA 4.0, 4000×3000 px. Ratusz jest ten sam co na zdjęciu w artykule „Ratusz w Kaliszu” w polskiej Wikipedii (biała wieża z zegarem). Miejsce zdjęcia podane na Commons leży ok. 100 m od ratusza (Główny Rynek 20), a niemiecka Wikipedia używa go w artykule o tym ratuszu.
- **Przypis „c” przy Kaliszu:** Robert dopuścił w ustawieniach środowiska `poznan.stat.gov.pl`, więc PDF rocznika otwarto. Tablica 1 „Warunki meteorologiczne” (dział I, s. 12), wiersz „Kalisz” w części o opadach (dane IMGW-PIB, stacja Kalisz): 507 mm (1971–2000), 494 mm (1991–2020), 465 mm (2011–2020), 500 mm (2016–2020) i 437 mm (2022); dalej 3,7 m/s (średnia prędkość wiatru, 2022), 2007 h (usłonecznienie, 2022) i kropka zamiast średniego zachmurzenia. Przypis „c” brzmi: „Brak pełnego ciągu pomiarowego zachmurzenia.” (po angielsku: „Lack of a full measurement sequence of of cloudiness.”, z podwójnym „of” jak w oryginale). Dotyczy więc tylko zachmurzenia, a nie opadów: liczby na karcie (494 i 507 mm) i w ciekawostce F1528 (także 437 mm w 2022 r.) zostają bez zmian. Przypis „a” mówi, że dane za okresy wieloletnie to średnie roczne z tych okresów. F1528 ma teraz status `verified`: zgadza się ze źródłem, co potwierdziły dwa niezależne odczyty PDF.

## Sprawdzenie z 1.11.2026: strony IMGW-PIB i GUS

Po dopuszczeniu kolejnych stron (m.in. IMGW-PIB, GUS, Lasów Państwowych i angielskiej Wikipedii) wszystkie 36 ciekawostek i 17 kart szuflady sprawdzono jeszcze raz, na pełnych tekstach tych źródeł, które się otwierają:
- każdą kartę i ciekawostkę przeczytały dwa niezależne odczyty (dwa różne modele), a drugi oceniał też wynik pierwszego;
- liczby porównano też z publicznymi danymi pomiarowymi IMGW-PIB (`danepubliczne.imgw.pl`), ale samo obliczenie z danych nie wystarczało do potwierdzenia;
- cytaty z nowych źródeł sprawdzono jeszcze raz bezpośrednio na stronach.

**Wynik:** przedtem 23 ciekawostki miały status `checked`, a 13 `verified`. Teraz 31 ma `verified`, 3 `corrected`, a 2 `checked`.

- **18 ciekawostek ma status `verified` zamiast `checked`:** F1508, F1509, F1514–F1521, F1523, F1524, F1529, F1530, F1537–F1539 i F1541.
  - Zgadzają się ze wskazanymi źródłami: ze stronami IMGW-PIB, GUS i Lasów Państwowych, które teraz się otwierają, a F1520, F1524, F1538 i F1541 także z polską Wikipedią, która otwierała się już wcześniej. F1524 opiera się tylko na Wikipedii, bo praca IGiPZ PAN nadal się nie otwiera.
  - F1509, F1516 i F1517 linkowały do kopii publikacji GUS „Ochrona środowiska 2025” na zablokowanym `www.bdl.lasy.gov.pl`. Teraz linkują do tego samego PDF na `stat.gov.pl`.
  - F1508 i F1523 mają nowe źródła IMGW-PIB (niżej).
- **Nowe źródła**, przy ciekawostkach i w ramkach „Gdzie i kiedy”:
  - F1508 i karta Słubic: „Obserwator” IMGW-PIB z 13.07.2026 (40,5 °C to „najwyższa temperatura powietrza zarejestrowana na stacjach synoptycznych w historii pomiarów w Polsce”) i z 6.07.2026 („w Słubicach padł rekord absolutnej temperatury maksymalnej”).
  - F1510, F1511 oraz karty Słubic i Prószkowa: „Obserwator” z 6.07.2026 (rekord pobity o 0,3 °C „po blisko 105 latach”) i strona IMGW-PIB „Upał – prognoza i rekordy” z 2020 r. („Maksymalna odnotowana temperatura w Polsce to +40.2°C w Prószkowie 29.07.1921”). Ta strona opisuje też wątpliwości wobec pomiaru z Prószkowa, ale pisze, że rekord „jest powszechnie uznawany”.
  - F1523 i karta powodzi z 1997 r.: monografia IMGW-PIB „Przebieg i skutki wybranych powodzi w dorzeczu Odry od XIX wieku do czasów współczesnych” (2021, s. 73–74). Podaje sumy opadów z 5–7.07.1997: 456 mm w Kamienicy i 431,2 mm w Międzygórzu.
  - Karta Hali Gąsienicowej: metadane stacji IMGW-PIB (wysokość 1520 m), jak przy F1522 (niżej).
  - Karta Kasprowego Wierchu: artykuł E. Żmudzkiej w „Miscellanea Geographica” (2011), jak przy F1526 i F1527 (niżej).
  - Karta Suwałk: normy klimatyczne IMGW-PIB 1991–2020, jak przy karcie Wrocławia (niżej).
- **F1510 i F1511 zostają `checked`.** Żaden tekst, który się otwiera, nie mówi w jednym miejscu, że pomiar ze Słubic pobił właśnie rekord z Prószkowa. Wynika to z zestawienia dwóch tekstów IMGW-PIB (40,5 − 0,3 = 40,2 °C; 1921 + 105 = 2026). Artykuł PAP, który prawdopodobnie mówi to wprost, nadal jest stąd nieczytelny. Brzmienie zostaje, bo obie ciekawostki przypisują rekord IMGW („Według IMGW”).
- **3 ciekawostki mają nowe brzmienie (`corrected`):**
  - F1522 (Hala Gąsienicowa): stacja „leżała wtedy według metadanych IMGW-PIB na wysokości 1520 m n.p.m.”, a nie „leży”. Według metadanych IMGW-PIB stacja miała 1520 m w latach 1968–2018, a obecna stacja synoptyczna w tym samym miejscu (od 2019 r.) ma 1523 m. Strona metadanych pokazuje od razu obecną stację (1523 m); 1520 m dla lat 1968–2018 jest w historii stacji (przycisk „Pobierz historię metadanych”). Nowe źródła: metadane stacji IMGW-PIB i „Obserwator” IMGW-PIB z 2020 r., który podaje 300 mm z 30 czerwca 1973 r. (to samo źródło co przy F1519–F1521).
  - F1526 i F1527 (Kasprowy Wierch): bez zdań o Zakopanem (średnio 1117,6 mm; 1462,2 mm w 2001 r.). Tych liczb nie podaje żadne źródło, które się otwiera, bo praca w archiwum TPN jest zablokowana. Oba odczyty policzyły z danych IMGW-PIB te same wartości, ale samo obliczenie nie wystarcza. Liczby dla Kasprowego (1797,7 mm; 2600,3 mm w 2001 r.) potwierdza artykuł E. Żmudzkiej w „Miscellanea Geographica” (2011), dopisany jako źródło. To ta sama autorka i ta sama seria danych co w pracy z archiwum TPN.

**Karty:**
- **Kasprowy Wierch — halny 1968:** „(po przeliczeniu 270–288 km/h)” zamiast „czyli 270–288 km/h”, także po angielsku. IMGW-PIB podaje tylko 75–80 m/s. Przeliczenie na km/h jest dokładne, ale wcześniej brzmiało jak część informacji IMGW-PIB.
- **Wrocław i Suwałki:** ramki „Gdzie i kiedy” podają też normy klimatyczne IMGW-PIB 1991–2020. Wśród 55 stacji Wrocław ma najwyższą średnią roczną (9,7 °C), a Suwałki (7,2 °C) najniższą poza trzema stacjami górskimi: Kasprowym Wierchem, Śnieżką i Zakopanem. Karty piszą ostrożnie „jedna z najwyższych w Polsce” i „jedno z najzimniejszych miejsc w Polsce poza górami”, bo żaden tekst instytucjonalny nie mówi tego słowami. Wynika to z tabel.
- **Suwałki po angielsku:** „Podlaskie Province” zamiast „Podlasie”, w polu „Gdzie” i w podtytule karty. Po angielsku „Podlasie” to kraina historyczna, a Suwałki do niej nie należą. Karta podaje więc nazwę województwa, jak karty z województw lubuskiego, opolskiego, lubelskiego i łódzkiego („… Province”). W innych szufladach tak samo opisano np. Suwalszczyznę i Kanał Augustowski („Suwałki region, Podlasie.”, „Augustów Canal, Podlasie.”): to osobna poprawka.
- **Śnieżka — mgła:** bez zmian, ale ze słabym źródłem. Ok. 300 dni z mgłą w roku podaje tabela w Wikipedii, która powołuje się na encyklopedię szkolną. Żaden tekst IMGW-PIB ani praca naukowa, które dało się otworzyć, nie podaje tej średniej. Drugi odczyt policzył z miesięcznych danych IMGW-PIB średnio 304 dni w latach 1991–2020 i od 269 do 336 dni w każdym roku 1981–2020. To sprawdzenie, a nie źródło, ale pokazuje, że zdanie „dni z mgłą jest więcej niż dni bez niej” jest prawdziwe.

**Do decyzji Roberta:**
- **Kamienica 2024 (poza atlasem):** publikacja GUS „Ochrona środowiska 2025” (s. 30, dane IMGW-PIB) podaje: „Maksymalny dobowy opad atmosferyczny w 2024 r. zanotowano 14 września na stacji meteorologicznej Kamienica (woj. dolnośląskie, pow. kłodzki) – wyniósł 254,5 mm.” Tę samą wartość mają publiczne dane dobowe IMGW-PIB: stacja Kamienica (kod 250160620, ta sama co na karcie powodzi z 1997 r.), 14.09.2024, 254,5 mm. To najwyższa wartość dobowa września 2024 r. w tych danych; druga jest Śnieżnik (218,8 mm).
  - Inne teksty IMGW-PIB podają inne liczby: komunikat z 14.09.2024 (znany tylko z wyników wyszukiwania) 214,5 mm za okno 13.09, 20:00 – 14.09, 20:00, a abstrakt konferencyjny z 2025 r. 228,4 mm za 14.09. Według biuletynu PSHM najwyższy opad dobowy 14.09.2024 zanotowano na Śnieżniku (218,8 mm).
  - Decyzja z 31.10.2026 opierała się na tym, że 254,5 mm nie ma w żadnym źródle. To już nieaktualne, więc o karcie decyduje Robert jeszcze raz. Do tego czasu karta zostaje poza atlasem, a `npm run test:collections` nadal pilnuje, żeby szuflada nie podawała 254,5 mm.

**Nadal do sprawdzenia**, gdy otworzą się strony z listy „Nadal nie otwierają się stąd” (wyżej). Najwięcej dałyby PAP (F1510, F1511) i praca E. Żmudzkiej w archiwum TPN (liczby dla Zakopanego).
