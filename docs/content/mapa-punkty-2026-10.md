# Punkty na mapie miejsc (28.10.2026)

Mapa pokazuje **245 punktów** w 10 kolekcjach miejsc. Kolekcje gatunków nie mają mapy, bo atlas nie pokazuje, gdzie żyją gatunki.

## Skąd są współrzędne i jak je sprawdzono

- **Źródło:** Wikidata (licencja CC0). Każdy punkt to współrzędne obiektu z Wikidaty: miejsca z karty albo miejsca, które je obejmuje (lista niżej). Numer obiektu (`Q…`) jest zapisany przy każdym punkcie w `data/places/<kolekcja>.places.js`.
- **Wybór obiektu:** ręczny, karta po karcie. Kandydatów dało wyszukiwanie po nazwie z karty i po miejscowości z pola regionu. Każdy wybór sprawdzony co najmniej dwoma niezależnymi cechami:
  - nazwa obiektu zgodna z kartą;
  - gmina i województwo z łańcucha jednostek administracyjnych w Wikidacie zgodne z polem regionu na karcie;
  - odległość od miejscowości z karty.
- **Druga, niezależna kontrola wszystkich 245 punktów:** jakie miejscowości leżą najbliżej punktu (do 5 km) i w jakiej gminie i województwie. Każde odchylenie przejrzane ręcznie. Wszystkie punkty leżą w województwie z karty. Odchylenia wynikały tylko z odmiany nazw („Przesieki” i „Przesieka”) albo z tego, że karta podaje pasmo górskie zamiast miejscowości.
- **Zasada Roberta:** gdy nie dało się pewnie ustalić obiektu, karta zostaje bez punktu.

## Wynik według kolekcji

| Kolekcja | Punkty | Karty |
| --- | --- | --- |
| Drzewa | 11 | 30 |
| Formacje skalne | 29 | 32 |
| Architektura drewniana | 27 | 29 |
| Podziemia | 25 | 30 |
| Cuda inżynierii | 31 | 33 |
| Twierdze i ruiny | 32 | 33 |
| Memento mori | 29 | 30 |
| Skamieniałości | 7 | 32 |
| Atmosfera i astronomia | 8 | 33 |
| Rekordy krajobrazu | 46 | 56 |

## Punkt miejsca, które obejmuje obiekt z karty

Gdy obiekt z karty nie ma własnego wpisu ze współrzędnymi, a leży w jednym, oczywistym miejscu, punkt wskazuje to miejsce:

- **Podziemia:**
  - Podziemia Zamku Książ: zamek Książ;
  - Twierdza Kłodzko — labirynty: twierdza;
  - Projekt Riese — Włodarz i Osówka: góry, w których wykuto kompleksy;
  - Dwór z Drogini: skansen w Wygiełzowie, do którego go przeniesiono.
- **Cuda inżynierii:**
  - Mosty Tczewskie: most kolejowy (w Wikidacie ma alias „mosty tczewskie”);
  - Stocznia Gdańska — suwnice i bramy: Brama nr 2;
  - Kolej linowa na Kasprowy Wierch: obiekt kolei, punkt przy górnej stacji.
- **Rekordy krajobrazu:**
  - Klify Wolińskiego PN: park narodowy;
  - Połoniny Bieszczadzkie: Bieszczadzki PN;
  - Gołoborza Łysogór: pasmo Łysogór;
  - Ruchome wydmy Słowińskiego PN: Wydma Łącka;
  - Zatopiony Las: jezioro Pile;
  - Skit w Odrynkach: cerkiew skitu, bo obiekt skitu ma tylko zaokrąglony punkt.
- **Obszary:** parki narodowe, jeziora, Mierzeja Helska i parki ciemnego nieba mają punkt z Wikidaty dla całego obszaru. Parki ciemnego nieba mają tam punkt podany z dokładnością do 0,01°.
- **Miasta i wsie, gdy to one są tematem karty:** Tarnów, Sokołowsko, Raczki Elbląskie, Siedlce, Sopotnia Wielka, Godziszów.

## Przy granicy

- **Trzy Świnki:** skały leżą na grzbiecie granicznym; Wikidata przypisuje je do czeskiego Harrachova. Punkt jest na granicy, zgodnie z kartą („rejon Szrenicy”).
- **Przełom Dunajca i Śnieżne Kotły:** najbliższe zabudowania są po stronie słowackiej i czeskiej, ale obiekty w Wikidacie leżą w Polsce.

## Karty bez punktu (93)

- **Nie są jednym miejscem:** gatunki drzew, zjawiska na niebie, tematy obejmujące wiele stanowisk.
  - Drzewa (7): miłorząb, grujecznik, opieńka, bożodrzew, korkowiec, dawidia, jodła balsamiczna.
  - Atmosfera i astronomia (25): wszystkie zjawiska i karty o regionach, np. białe noce, zorze, Tatry z Wyżyny Lubelskiej.
  - Skamieniałości (17): m.in. trylobity, amonity, belemnity, bursztyn, mamuty, nosorożec włochaty. Yantarogekko pochodzi z obwodu kaliningradzkiego.
- **Kilka miejsc na jednej karcie (8):**
  - Kraina Otwartych Okiennic, żuławskie domy podcieniowe;
  - Riese — Soboń / Jugowice / Gontowa, toruńskie piwnice;
  - śluzy Kanału Augustowskiego, Wrocławski Węzeł Wodny;
  - zamki Mirów i Bobolice, punkty antygrawitacyjne w Karpaczu i Świeradowie.
- **Regiony (2):** Ponidzie, Szwajcaria Kaszubska.
- **Brak obiektu w Wikidacie:**
  - Drzewa: 11 drzew, dla których Wikidata ma tylko wieś, kościół albo parafię, a nie samo drzewo. To Sosna na Szczudłach, Drzewo z kulą armatnią, Mamutowiec w Brwicach, Jodła Lasumiła, Lipa w Cielętnikach, Dąb w Rębowie, Sosna Kandelabrowa, Lipa Pokoju, Drzewostan w Ościsłowie, Lipa w Stroniu Śląskim i Dęby Rogalińskie.
  - Formacje skalne: Czartowskie Skały, Skalna Czaszka.
  - Podziemia: Podziemne Miasto na Wolinie, Podziemna Trasa w Jarosławiu.
  - Memento mori: Kopiec Powstania Warszawskiego, który nie ma wpisu ze współrzędnymi także jako Kopiec Czerniakowski.
  - Skamieniałości: Poręba, Annopol, Kraków-Spadzista.
  - Rekordy krajobrazu: Wąwóz Korzeniowy Dół, przełom Kamiennej koło Bałtowa, Jezioro Afryka, mofety w Tyliczu, Sosna na Szczudłach.
- **Niepewne, więc pominięte:**
  - **Dąb Gniewko:** jedyny „Dąb Gniewko” w Wikidacie rośnie w województwie kujawsko-pomorskim. Do tego polskie dane karty różnią się nazwą wsi („Bielina-Wirgini” i „Bielino-Wirgnia”).
  - **Diabelska Maczuga w Gorzeszowie:** obok jest „Czarcia Maczuga”, ale nic nie potwierdza, że to ta sama skała.
  - **Kopalnia Uranu w Kletnie:** obiekt „Kopaliny (kopalnia uranu)” leży 2,3 km od Żmijowca, gdzie trasę umieszczają ciekawostki karty.
  - **Bełkotka w Iwoniczu-Zdroju:** wpis ma tylko „Mała Bełkotka”.
  - **Smok wawelski i Lisowicia z Lisowic:** wpis ma tylko muzeum, nie stanowisko.
  - **Tropy dinozaurów z Bałtowa:** wpis ma tylko JuraPark, park rozrywki.
  - **Gady morskie z Krzyżanowic:** karta sama mówi, że szczęki prawdopodobnie pochodzą z innego miejsca.
  - **Łuk Mużakowa:** łuk leży po obu stronach granicy, a punkt jego wpisu jest w Niemczech.
- **Uwaga karty, by nie ujawniać miejsca (1):** tropy dinozaurów z Borkowic.
