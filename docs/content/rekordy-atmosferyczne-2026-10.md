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
- Strony IMGW-PIB, PAP, GUS, TPN i Lasów Państwowych nie otwierają się z naszego środowiska, więc ich treść znamy z wyników wyszukiwania.
- Tak samo:
  - praca T. Niedźwiedzia (IGiPZ PAN 1999, sumy opadów z 1997 r.);
  - repozytorium RE-BUŚ (wysokość stacji na Hali Gąsienicowej);
  - Radio Kraków;
  - angielska Wikipedia.
- Trzech zdjęć (Wrocław, Suwałki, Kalisz) nie dało się początkowo stąd obejrzeć, bo Commons blokował zapytania. Autora i licencję sprawdzono, a same zdjęcia obejrzano później tego dnia (niżej, „Decyzje z 31.10.2026”).
- Ciekawostki oparte na tych źródłach mają dlatego status „checked”, a nie „verified”.
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
| Śnieżka — mgła | ok. 300 dni z mgłą w roku, za dwoma hasłami Wikipedii (bez źródła instytucjonalnego); bez „najwięcej w Polsce”, bo podaje to tylko zestawienie w Wikipedii oparte na encyklopedii szkolnej |

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
| Kamienica 2024 | 254,5 mm nie znalazło się w żadnym źródle; do sprawdzenia przez Roberta we wpisie IMGW |
| 388 cm śniegu na Kasprowym | źródła podają 355 albo 335 cm; do sprawdzenia przez Roberta w Vademecum IMGW |

Nowe karty sprawdza też `npm run test:collections`:
- Żywiec i Słubice nie nazywają swojego rekordu oficjalnym, także w ciekawostkach, a szuflada nie wspomina Kołudy Wielkiej ani 254,5 mm z Kamienicy;
- pominięte pozycje nie wracają;
- liczba kart i zdjęć się zgadza.

Ciekawostki szuflady to sprawdzone teksty z `new_facts`. Od 31.10.2026 poprawia się je w `data/facts/rekordy-atmosferyczne.facts.js`, jak ciekawostki innych szuflad (`README-weryfikacja.md`).

## Do sprawdzenia przez Roberta

- **Zdjęcia na podglądzie:** Wrocław, Suwałki i Kalisz. Nie dało się ich stąd obejrzeć; sprawdzone są tylko autor i licencja. Obejrzane później 31.10.2026 (niżej).
- **Przypis „c” przy Kaliszu:** w tabeli rocznika GUS Poznań 2023 wiersz Kalisza ma przypis „c”, ale jego treści nie znamy (PDF się stąd nie otwiera).
- **Kamienica 2024 i 388 cm śniegu na Kasprowym:** wejdą, jeśli potwierdzisz je w źródłach IMGW.
- **Adresy kart:** pięć różni się od szkicu, np. `wroclaw-srednia-roczna` zamiast `wroclaw-biegun-ciepla`; pełna lista jest w `id_changes`. Po publikacji adresy nie powinny się już zmieniać.

## Decyzje z 31.10.2026: 388 cm, Kamienica i zdjęcie Kalisza

- **388 cm śniegu na Kasprowym Wierchu:** potwierdza je artykuł w „Przeglądzie Geofizycznym” (2018, s. 367: O. Skrynyk, L. Rymarowicz) oparty na archiwum IMGW-PIB. W marcu 1939 r. maksymalna grubość pokrywy śnieżnej na Kasprowym wynosiła 388 cm. Dnia ani słowa „rekord” artykuł nie podaje. 355 cm to maksimum lat 1966–2023 (Quaestiones Geographicae 2025), a 335 cm (2009) to wypowiedź w mediach. Te liczby dotyczą różnych okresów. Według decyzji Roberta 388 cm weszło jako ciekawostka F1543 na karcie „Kasprowy Wierch — średni roczny opad ok. 1800 mm”, bez dnia i bez słowa „rekord”. Osobnej karty nie ma.
- **Kamienica 2024:** zostaje poza atlasem. Wartości 254,5 mm nie ma w żadnym znalezionym źródle. Komunikat IMGW-PIB z 14.09.2024 (znany tylko z wyników wyszukiwania) podaje 214,5 mm za okno 13.09, 20:00 – 14.09, 20:00, a abstrakt konferencyjny IMGW-PIB z 2025 r. 228,4 mm za 14.09. Według biuletynu PSHM najwyższy opad dobowy 14.09.2024 zanotowano na Śnieżniku (218,8 mm).
- **Zdjęcia Wrocławia, Suwałk i Kalisza:** obejrzane przez miniatury Commons (`commons.wikimedia.org/w/thumb.php`). Wrocław (Odra i most Sikorskiego o zmierzchu) i Suwałki (zegar słoneczny w parku zimą) pasują do kart i zostają. Zdjęcie Kalisza było małe (680×510 px) i pokazywało osiedle bez rozpoznawalnego obiektu. Według decyzji Roberta zastąpiło je zdjęcie ratusza i Głównego Rynku z lotu ptaka: „Kalisz Town Hall 2019 P04.jpg”, Fallaner, 23.06.2019, CC BY-SA 4.0, 4000×3000 px. Ratusz jest ten sam co na zdjęciu w artykule „Ratusz w Kaliszu” w polskiej Wikipedii (biała wieża z zegarem). Miejsce zdjęcia podane na Commons leży ok. 100 m od ratusza (Główny Rynek 20), a niemiecka Wikipedia używa go w artykule o tym ratuszu.
