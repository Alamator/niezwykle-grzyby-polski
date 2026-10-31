# Szuflada „Rekordy atmosferyczne” (31.10.2026)

Materiał wyjściowy to 30 pozycji o rekordach pogody w Polsce, przygotowanych 30.10.2026. Do atlasu weszło 17 kart.

## Decyzje Roberta

- Osobna szuflada, a nie kategoria w „Atmosferze i astronomii”.
- Żywiec 1929 wchodzi, ale bez słowa „oficjalny”. Za oficjalny rekord zimna IMGW-PIB uznaje −41 °C z Siedlec (11 stycznia 1940 r.). Atlas pisze tak w karcie „Siedlce i rekord mrozu” i w ciekawostce F1073.
- Szuflada wchodzi najpierw bez ciekawostek.
  - Ciekawostki zrobi generator. Ich sprawdzone teksty i zasady są w `zmiany-dla-generatora-2026-10.json` (`new_collections`, `new_facts`).
  - Do tego czasu kolekcja stoi na liście `FACTS_PENDING` w `scripts/validate-facts.mjs`, a „Ciekawostka dnia” ją pomija.

## Jak sprawdzono

1. **30.10.2026:** każdą z 30 pozycji sprawdzono zdanie po zdaniu, w trzech niezależnych przebiegach po 10 pozycji. Wynik i powody są w raporcie z audytu z tego dnia.
2. **31.10.2026:** 17 kart napisano od nowa z tego sprawdzenia, po polsku i po angielsku 1:1.
   - Każdą kartę sprawdził osobny, krytyczny sprawdzający: każde zdanie ze źródłem, tłumaczenie, zdjęcie, punkt na mapie.
   - Na koniec sprawdzono wszystkie karty razem i z kartami, które atlas już ma.
3. **Zasada:** co sporne, niepotwierdzone albo oparte tylko na obliczeniach własnych, tego nie ma.

**Ograniczenie:**
- Strony IMGW-PIB, PAP, GUS, TPN i Lasów Państwowych nie otwierają się z naszego środowiska, więc ich treść znamy z wyników wyszukiwania.
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
| Kasprowy Wierch — halny 1968 | porywy 75–80 m/s jako szacunek IMGW-PIB; „prawdopodobnie” najsilniejszy wiatr na Kasprowym, nie w Polsce |
| Lublin — tornado z 1931 r. | „jedno z najsilniejszych udokumentowanych”; F4 jako szacunek; wagony przewracane, nie podnoszone |
| 15 sierpnia 2008 — seria tornad | ocena F3–F4 opisana jako sporna |
| 11 sierpnia 2017 — derecho | według IMGW-PIB porywy ponad 150 km/h; bez sprzecznych liczb hektarów lasu |
| Tomaszów Mazowiecki — grad 13,5 cm | rekord wielkości gradu przypisany IMGW-PIB (2023); bez „co najmniej” |
| Śnieżka — mgła | ok. 300 dni z mgłą w roku; bez „najwięcej w Polsce”, bo podaje to tylko zestawienie w Wikipedii oparte na encyklopedii szkolnej |

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
- Żywiec i Słubice nie nazywają swojego rekordu oficjalnym;
- pominięte pozycje nie wracają;
- liczba kart i zdjęć się zgadza.
