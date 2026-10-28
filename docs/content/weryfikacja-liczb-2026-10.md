# Sprawdzenie liczb i dat w ciekawostkach (10.2026)

Krok zapowiedziany w [README-weryfikacja.md](README-weryfikacja.md): ciekawostki z liczbami i datami sprawdzone wyszukiwaniem w niezależnych źródłach. Zasada Roberta: **to, co niepewne albo niepotwierdzone, nie trafia do atlasu.**

**Stan: sprawdzono 173 z 707 (24%).** Pozostałe 534 czekają na kolejne rundy wyszukiwania (limit narzędzia: 200 wyszukiwań na turę).

## Zakres

- **707 ciekawostek** do sprawdzenia:
  - 642 z cyframi, czyli wszystkie poza 67 już potwierdzonymi wyszukiwaniem (status `checked`) i 81 zdaniami tylko o statusie ochrony, które wcześniej sprawdzono z tekstem rozporządzenia;
  - 18 o kategoriach czerwonych list i datach zmian ochrony;
  - 47 z liczbami zapisanymi słownie albo z wiekami (np. „w XIV w.”).
- Sprawdzana jest **każda liczba i data** w zdaniu: rok, data dzienna, wymiar, odległość, liczebność, odsetek, temperatura, kolejność w rankingu.

## Jak sprawdzano

- Wyszukiwanie z naciskiem na źródła instytucjonalne: NID (zabytek.pl), UNESCO, IMGW, PIG-PIB, GDOŚ, parki, Lasy Państwowe, muzea, uczelnie, PAN, strony miast, a także publikacje naukowe, Encyklopedia PWN i uznane media. Gdy instytucja i inne źródła się różnią, rozstrzyga instytucja.
- **Wikipedia i jej kopie nie liczą się** jako niezależne źródło.
- Gdy jedynym źródłem ciekawostki jest strona instytucji (np. gminy), liczby potwierdza sama ta strona: jej pełny tekst sprawdzono przy pierwszej weryfikacji. Taka ciekawostka zostaje na stronie z dotychczasowym statusem.
- Liczba jest potwierdzona tylko wtedy, gdy wynik wyszukiwania wiąże ją z konkretną stroną. Środowisko, w którym pracował Claude, nie pozwalało otwierać stron, więc oceny opierają się na fragmentach stron w wynikach wyszukiwania; każdą da się sprawdzić pod podanym linkiem.
- Wyniki:
  - ✅ potwierdzona: każda liczba i data zgadza się z niezależnym źródłem (z dokładnością, jaką podaje zdanie);
  - ✏️ do poprawki: niezależne źródło podaje inną wartość albo wiarygodne źródła się różnią, a zdanie podaje jedną wartość jako pewną; jest propozycja poprawionego brzmienia;
  - ❔ niepotwierdzona: co najmniej jednej liczby lub daty nie potwierdza żadne niezależne źródło; propozycja zostawia tylko potwierdzone części zdania (albo każe ciekawostkę pominąć).

## Co to zmienia w atlasie

- Ciekawostki **do poprawki** i **niepotwierdzone** strona ukrywa od razu: lista `WITHDRAWN.numbers` w `data/collections.js` (74 ciekawostki).
- Poprawione brzmienie trafia do generatora ciekawostek (poza repo) przez [`zmiany-dla-generatora-2026-10.json`](zmiany-dla-generatora-2026-10.json): `replace_facts` (nowa treść PL i EN, źródła), `skip_facts` (pominąć), `confirm_facts` (status `checked` i niezależne źródła). Po ponownym wygenerowaniu plików `data/facts/*.facts.js` ciekawostki wrócą w nowym brzmieniu, a `npm run test:facts` przypomni, które wpisy usunąć z `WITHDRAWN.numbers`.

## Wyniki

Razem: 173 sprawdzonych, ✅ potwierdzona: 99, ✏️ do poprawki: 31, ❔ niepotwierdzona: 43.

### Grzyby

Sprawdzone 11 z 79; ✅ potwierdzona: 5; ✏️ do poprawki: 3; ❔ niepotwierdzona: 3.

| ID | Karta | Wynik | Było | Co się nie zgadza | Proponowane brzmienie | Źródła |
| --- | --- | --- | --- | --- | --- | --- |
| F0001 | Okratek australijski | ✏️ do poprawki | W Polsce pierwsi zauważyli go w 1975 r. mieszkańcy okolic Biłgoraja. Jego „jaja” wzięli za… jaja węży! | ❌ w Polsce pierwsi zauważyli go w 1975 r.<br>✅ mieszkańcy okolic Biłgoraja wzięli owocniki za jaja węży<br>Pietras i in. (PJOES 2016) podają pierwsze stwierdzenie w Polsce w 1973 r., baza gatunków obcych IOP PAN ok. 1976 r.; roku 1975 nie podaje żadne niezależne źródło, a National Geographic opisuje historię z jajami węży spod Biłgoraja bez daty. | W Polsce po raz pierwszy odnotowano go w latach 70. XX w. Mieszkańcy okolic Biłgoraja wzięli jego „jaja” za… jaja węży! | [pjoes.com](https://www.pjoes.com/Distribution-and-Molecular-Characterization-of-an-Alien-Fungus-Clathrus-archeri-in-Poland,61230,0,2.html), [national-geographic.pl](https://www.national-geographic.pl/przyroda/okratek-australijski-wlasciwosci-wystepowanie-i-ciekawostki/) |
| F0002 | Okratek australijski | ❔ niepotwierdzona | Do 2014 r. owocniki notowano w Polsce blisko 90 razy, głównie na południu kraju; zasięg gatunku koncentruje się w Karpatach i na Śląsku. W Tatrach notowany jest dopiero od niedawna, m.in. na Polanie Chochołowskiej. | ✅ owocniki notowano w Polsce blisko 90 razy, głównie na południu kraju<br>❔ stan danych: do 2014 r.<br>Praca Pietras i in. (PJOES 2016) podaje blisko 90 stwierdzeń od 1973 r., głównie na południu, ale żadne niezależne źródło nie wiąże tej liczby z rokiem 2014. | Owocniki notowano w Polsce blisko 90 razy, głównie na południu kraju; zasięg gatunku koncentruje się w Karpatach i na Śląsku. W Tatrach notowany jest dopiero od niedawna, m.in. na Polanie Chochołowskiej. | [pjoes.com](https://www.pjoes.com/Distribution-and-Molecular-Characterization-of-an-Alien-Fungus-Clathrus-archeri-in-Poland,61230,0,2.html) |
| F0006 | Sromotnik smrodliwy | ✏️ do poprawki | W 1983 r. trafił do pierwszej polskiej listy chronionych grzybów: rozporządzenie objęło ochroną ścisłą całą rodzinę sromotnikowatych, a lista liczyła 10 pozycji i około 21 gatunków. W 2004 r. zdjęto go z listy, bo jest pospolity i szybko się rozprzestrzenia. | ✅ w 1983 r. trafił do pierwszej polskiej listy chronionych grzybów<br>✅ lista liczyła 10 pozycji<br>❌ lista obejmowała około 21 gatunków<br>✅ w 2004 r. zdjęto go z listy<br>Kujawa (Studia i Materiały CEPL 2015) podaje 10 pozycji obejmujących „w zależności od ujęcia” 21–24 gatunki, a Grzywacz (CEPL 2015) mówi o 23 gatunkach pod ochroną ścisłą, więc „około 21” to tylko dolna granica; rok 1983 i usunięcie z listy w 2004 r. potwierdza Kujawa. | W 1983 r. trafił do pierwszej polskiej listy chronionych grzybów: rozporządzenie objęło ochroną ścisłą całą rodzinę sromotnikowatych, a lista liczyła 10 pozycji obejmujących, zależnie od ujęcia, 21–24 gatunki. W 2004 r. zdjęto go z listy, bo jest pospolity i szybko się rozprzestrzenia. | [cepl.sggw.edu.pl](https://cepl.sggw.edu.pl/wp-content/uploads/sites/75/2021/08/Kujawa.pdf) |
| F0007 | Sromotnik smrodliwy | ❔ niepotwierdzona | Ma mnóstwo ludowych nazw: śmierdziuch, smrodnik, bedłka pańska, węże jajo… Polską nazwę nadał mu Józef Jundziłł w 1830 r., a samo słowo „sromotnik” to staropolski wyraz oznaczający osobę okrytą hańbą lub siejącą zgorszenie. | ❔ polską nazwę nadał mu Józef Jundziłł w 1830 r.<br>Autorstwa nazwy przez Józefa Jundziłła w 1830 r. nie podaje żadne znalezione niezależne źródło (grzyby.pl, RCIN, bazhum); zostawiono tylko nazwy ludowe i znaczenie słowa. | Ma mnóstwo ludowych nazw: śmierdziuch, smrodnik, bedłka pańska, węże jajo… Samo słowo „sromotnik” to staropolski wyraz oznaczający osobę okrytą hańbą lub siejącą zgorszenie. | — |
| F0009 | Mądziak psi | ✏️ do poprawki | Dorasta do ok. 16 cm wysokości przy grubości zaledwie ok. 1 cm. Prawdziwa leśna antena! 📡 | ❌ dorasta do ok. 16 cm wysokości<br>✅ grubość zaledwie ok. 1 cm<br>NatureSpot podaje 8–15 cm wysokości i 1–1,5 cm średnicy trzonu, strona Oakes Museum (Messiah University) 7–12 cm wysokości i 1–2 cm szerokości; wartości 16 cm nie podaje żadne niezależne źródło. | Dorasta do ok. 15 cm wysokości przy grubości zaledwie ok. 1 cm. Prawdziwa leśna antena! 📡 | [naturespot.org](https://www.naturespot.org/species/dog-stinkhorn) |
| F0010 | Mądziak psi | ❔ niepotwierdzona | Był ściśle chroniony. 9.10.2014 r. wykreślono go z listy, ale na Czerwonej liście nadal ma status V (narażony). | ❔ był ściśle chroniony; 9.10.2014 r. wykreślono go z listy gatunków chronionych<br>❔ na Czerwonej liście nadal ma status V (narażony)<br>Rozporządzenie o ochronie gatunkowej grzybów rzeczywiście nosi datę 9 października 2014 r. (Dz.U. 2014 poz. 1408), ale żadne dostępne niezależne źródło nie potwierdza skreślenia mądziaka z listy ani kategorii V na czerwonej liście, a tekstu rozporządzenia nie dało się otworzyć. | — (pominąć) | — |

<details>
<summary>Potwierdzone (5)</summary>

| ID | Karta | Potwierdzone liczby i daty | Źródła |
| --- | --- | --- | --- |
| F0000 | Okratek australijski | w Europie po raz pierwszy odnotowany w 1914 r. we Francji, w Wogezach; przywleczony najpewniej z zaopatrzeniem wojskowym na początku I wojny światowej (alternatywnie z wełną) | [typolive03-microsite-preview.wsl.ch](https://typolive03-microsite-preview.wsl.ch/fileadmin/user_upload/WSL/Microsite/SwissFungi/Merkblaetter/Factsheet_Clathrus_FR_200423_web.pdf), [colfungi.org](https://colfungi.org/taxon/urn:lsid:indexfungorum.org:names:112728/general-information) |
| F0004 | Sromotnik smrodliwy | według Uniwersytetu Oksfordzkiego owocnik rośnie w tempie 1–15 cm na godzinę; model matematyczny opublikowany w 2004 r. w „Mycologist”; nacisk ok. 1,33 kN/m² (1,33 kPa) | [herbaria.plants.ox.ac.uk](https://herbaria.plants.ox.ac.uk/bol/plants400/Profiles/op/Phallus), [cambridge.org](https://cambridge.org/core/journals/mycologist/article/is-phallus-impudicus-a-mycological-giant/7DA3020D5E5DFCE10D1133296E4F908A) |
| F0012 | Sromotnik fiołkowy | w 1564 r. Hadrianus Junius wydał broszurę o sromotnikach z holenderskich piasków | [encyclopedia.odeuropa.eu](https://encyclopedia.odeuropa.eu/items/show/17) |
| F0013 | Sromotnik fiołkowy | w 1980 r. Poczta Polska wydała znaczek ze sromotnikiem fiołkowym | [stampworld.com](https://www.stampworld.com/en/stamps/Poland/Postage%20stamps/1980-1989) |
| F0016 | Czarka austriacka | do 2014 r. czarka austriacka była ściśle chroniona | [kp.org.pl](https://kp.org.pl/pdf/pp/pdf2/PPXXVI_1_N_markiewicz.pdf) |

</details>

Czeka na sprawdzenie (68): F0020, F0022, F0025, F0028, F0029, F0033, F0034, F0036, F0039, F0040, F0042, F0043, F0044, F0045, F0046, F0047, F0048, F0050, F0051, F0052, F0060, F0070, F0074, F0075, F0079, F0082, F0083, F0084, F0086, F0087, F0088, F0090, F0091, F0093, F0096, F0097, F0101, F0103, F0105, F0108, F0111, F0114, F0115, F0116, F0127, F0128, F0131, F0132, F0133, F0134, F0135, F0136, F0139, F0140, F0146, F0147, F0148, F0153, F0160, F0163, F0165, F0166, F0167, F0168, F0172, F0177, F0189, F0200.

### Kwiaty

Sprawdzone 12 z 26; ✅ potwierdzona: 6; ❔ niepotwierdzona: 6.

| ID | Karta | Wynik | Było | Co się nie zgadza | Proponowane brzmienie | Źródła |
| --- | --- | --- | --- | --- | --- | --- |
| F0205 | Pływacz zwyczajny | ❔ niepotwierdzona | Na każdym liściu ma co najmniej 8 pęcherzyków-pułapek, a na całej roślinie może ich być **ponad 200**. | ❔ na każdym liściu co najmniej 8 pęcherzyków-pułapek<br>❔ na całej roślinie ponad 200 pęcherzyków<br>Niezależne źródła opisują liczne pęcherzyki na liściach, ale żadne nie podaje liczb 8 na liść ani ponad 200 na roślinę. | Na jego liściach jest wiele pęcherzyków-pułapek. | — |
| F0207 | Pływacz zwyczajny | ❔ niepotwierdzona | Był chroniony w latach 2004–2014. **Obecnie nie jest chroniony**, natomiast kilku jego krewnych jest (np. pływacz drobny pod ochroną ścisłą). | ❔ był chroniony od 2004 r.<br>❔ był chroniony do 2014 r.<br>Żadne niezależne źródło nie podaje lat ochrony pływacza zwyczajnego 2004–2014 (nie wiadomo, czy nie był chroniony już od 2001 r.); trzeba by sprawdzić załączniki rozporządzeń z 2001, 2004 i 2012 r. w ISAP. | **Obecnie nie jest chroniony**, natomiast kilku jego krewnych jest (np. pływacz drobny pod ochroną ścisłą). | — |
| F0214 | Obrazki plamiste | ❔ niepotwierdzona | Roślina w czasie kwitnienia sama się grzeje: 1 gram jej tkanki wytwarza 0,4 J ciepła na sekundę. | ❔ 1 g tkanki wytwarza 0,4 J ciepła na sekundę (0,4 W/g)<br>Prace o termogenezie obrazków (np. New Phytologist 1995) potwierdzają nagrzewanie się kolby, ale żadne niezależne źródło nie podaje wartości 0,4 W na gram tkanki. | Roślina w czasie kwitnienia sama się grzeje. | — |
| F0220 | Obrazki alpejskie | ❔ niepotwierdzona | Od 2014 r. są pod **ochroną częściową**, a w latach 2001–2014 były pod ścisłą. | ✅ od 2014 r. obrazki alpejskie są pod ochroną częściową<br>❔ w latach 2001–2014 były pod ochroną ścisłą<br>Ochronę częściową według rozporządzenia z 2014 r. potwierdza lista RDLP w Krakowie (Lasy Państwowe); okresu ochrony ścisłej 2001–2014 nie potwierdziło żadne niezależne źródło. | Od 2014 r. są pod **ochroną częściową**. | [krakow.lasy.gov.pl](https://www.krakow.lasy.gov.pl/documents/688359/20929648/Lista+ro%C5%9Blin+obj%C4%99tych+ochron%C4%85+w+zasi%C4%99gu+terytorialnym++RDLP+w+Krakowie/55ba0cc3-270d-f890-9555-73c01b311169) |
| F0232 | Dwulistnik pszczeli | ❔ niepotwierdzona | Jeden z nowych gatunków polskiej flory. Do 2010 r. nie był w Polsce notowany. Pierwszą populację znaleziono wtedy na Górnym Śląsku, a dekadę później, w 2020 r., kolejną w Sudetach. | ✅ do 2010 r. nie był w Polsce notowany; pierwszą populację znaleziono w 2010 r. na Górnym Śląsku<br>❔ dekadę później, w 2020 r., znaleziono kolejną populację w Sudetach<br>Rok 2010 (kamieniołom pod Imielinem) potwierdzają Osiadacz i Kręciała (2014) oraz Scientific Reports (2025); stanowisko w Górach Kaczawskich opisano w 2020 r. (Biodiversity Research and Conservation), ale roku jego znalezienia nie podaje żadne znalezione źródło. | Jeden z nowych gatunków polskiej flory. Do 2010 r. nie był w Polsce notowany. Pierwszą populację znaleziono wtedy na Górnym Śląsku, a w 2020 r. opisano kolejną, w Sudetach. | [pressto.amu.edu.pl](https://pressto.amu.edu.pl/index.php/biorc/article/download/biorc-2014-0027/29164/71695) |
| F0239 | Podkolan biały | ❔ niepotwierdzona | W latach 1946–2014 był pod ochroną ścisłą, a **od 2014 r. jest pod częściową**. | ❔ w latach 1946–2014 był pod ochroną ścisłą<br>✅ od 2014 r. jest pod ochroną częściową<br>Ochronę częściową według rozporządzenia z 2014 r. potwierdza artykuł w „Chrońmy Przyrodę Ojczystą” (2015); żadne niezależne źródło nie potwierdza ochrony ścisłej podkolanu białego nieprzerwanie od 1946 r. | **Od 2014 r. jest pod ochroną częściową**. | [rcin.org.pl](https://rcin.org.pl//Content/125587/PDF/KR038_156827_r2015-t71-no2_ChPO-Soltys-137-143.pdf) |

<details>
<summary>Potwierdzone (6)</summary>

| ID | Karta | Potwierdzone liczby i daty | Źródła |
| --- | --- | --- | --- |
| F0204 | Aldrowanda pęcherzykowata | na świecie potwierdzono tylko 50 istniejących populacji; w Polskiej Czerwonej Księdze Roślin kategoria CR (krytycznie zagrożona) | [butbn.cas.cz](https://www.butbn.cas.cz/adamec/PPEES2018.pdf), [siedliska.gios.gov.pl](https://siedliska.gios.gov.pl/images/pliki_pdf/wyniki/2020-2021/dla_roslin/aldrowanda_pecherzykowata_wyniki_monitoringu_2021.pdf) |
| F0210 | Rosiczka | rodzime rosiczki chroni się w Polsce od 1946 r. | [eli.gov.pl](https://eli.gov.pl/eli/DU/1946/384/ogl/pol/pdf) |
| F0215 | Obrazki plamiste | kwiatostan nagrzewa się nawet o 15 °C ponad temperaturę otoczenia | [homepage.uni-graz.at](https://homepage.uni-graz.at/en/anton.stabentheiner/research/floral-biology/) |
| F0217 | Obrazki plamiste | na Czerwonej liście z 2006 r. kategoria E (wymierający) | [independent.academia.edu](https://independent.academia.edu/TycAnna) |
| F0234 | Dwulistnik pszczeli | w 2017 r. zarządzeniem RDOŚ w Katowicach objęto go ochroną gatunkową na terenie województwa śląskiego; ochrona na 5 lat | [pressto.amu.edu.pl](https://pressto.amu.edu.pl/index.php/biorc/article/download/biorc-2020-0007/29483/72196) |
| F0240 | Podkolan zielonawy | ostroga długości 2–4 cm, maczugowato zgrubiała na końcu | [efloras.org](https://www.efloras.org/florataxon.aspx?flora_id=2&taxon_id=200028800) |

</details>

Czeka na sprawdzenie (14): F0203, F0225, F0237, F0241, F0243, F0246, F0247, F0252, F0254, F0258, F0259, F0261, F0263, F0271.

### Drzewa

Sprawdzone 14 z 48; ✅ potwierdzona: 7; ✏️ do poprawki: 5; ❔ niepotwierdzona: 2.

| ID | Karta | Wynik | Było | Co się nie zgadza | Proponowane brzmienie | Źródła |
| --- | --- | --- | --- | --- | --- | --- |
| F0295 | Sosna na Szczudłach | ✏️ do poprawki | Poziom gruntu obniżył się o **około 4 m** po dawnym wydobywaniu piasku. Odsłonięte korzenie obrosły korą i zaczęły pełnić rolę pni, stąd też nazwa „Krocząca Sosna”. | ❌ poziom gruntu obniżył się o około 4 m po wydobywaniu piasku<br>Gminny przewodnik busko.travel i ZPE (zpe.gov.pl) podają, że odsłonięte korzenie wystają ok. 3 m nad ziemię, Radio Kielce – ponad 3 m; wartości 4 m nie podaje żadne niezależne źródło. | Po dawnym wydobywaniu piasku jej korzenie wystają **około 3 m** nad ziemię. Obrosły korą i zaczęły pełnić rolę pni, stąd też nazwa „Krocząca Sosna”. | [busko.travel](https://busko.travel/data/file/Co%20zobaczyc/Busko-Zdroj/Miciewicza/22_CIT/reportaze/sciezka_oraz_Nowy_Folwark.pdf) |
| F0296 | Sosna na Szczudłach | ❔ niepotwierdzona | Jest pomnikiem przyrody od 2002 r. Według albumu *Drzewa Polski* ma około 120 lat, 15 m wysokości i 260 cm obwodu (2013). | ✅ pomnik przyrody od 2002 r.<br>❔ według albumu „Drzewa Polski” ma około 120 lat<br>❔ 15 m wysokości<br>❔ 260 cm obwodu (2013)<br>Rok 2002 potwierdza Radio Kielce; danych z albumu (120 lat, 15 m, 260 cm w 2013 r.) nie podaje żadne dostępne niezależne źródło, a materiały konkursu Drzewo Roku 2023 mówią o ok. 100 latach i 200 cm obwodu. | Jest pomnikiem przyrody od 2002 r. | [radiokielce.pl](https://radiokielce.pl/703666/post-53615) |
| F0298 | Krzywy Las | ✏️ do poprawki | 〰️ Ponad 50 sosen wygiętych pod kątem około 90°, około 20 cm nad ziemią. Posadzono je prawdopodobnie w 1934 r. | ✅ ponad 50 sosen<br>✅ wygiętych pod kątem około 90°<br>❌ wygięcie około 20 cm nad ziemią<br>✅ posadzone prawdopodobnie w 1934 r.<br>Wysokość wygięcia jest w źródłach różna: ulotka Gminy Gryfino podaje cięcie na wysokości 30–50 cm, portal turystyczny województwa ok. 20 cm, inne 10–40 cm; National Geographic (2021) podaje ok. 100 krzywych sosen, a rok 1934 potwierdzają gmina i NG. | 〰️ Ponad 50 sosen wygiętych nisko nad ziemią pod kątem około 90°. Posadzono je prawdopodobnie w 1934 r. | [national-geographic.pl](https://www.national-geographic.pl/przyroda/krzywy-las-obumiera-dlatego-obok-powstaje-drugi-taki-sam-211125025653/), [national-geographic.pl](https://www.national-geographic.pl/artykul/slynny-krzywy-las-do-wyciecia), [gryfino.pl](https://gryfino.pl/UMGryfinoFiles/file/Krzywy-Las-PL.pdf) |
| F0300 | Krzywy Las | ✏️ do poprawki | W 2021 r. Nadleśnictwo Gryfino utworzyło „powierzchnię zastępczą” Krzywego Lasu, na której posadzono 1000 młodych drzewek. | ✅ w 2021 r. utworzono powierzchnię zastępczą<br>❌ posadzono 1000 młodych drzewek<br>National Geographic Polska (listopad 2021) pisze, że w pierwszym etapie rewitalizacji posadzono 1100 sadzonek zdeformowanych sosen, a nie 1000. | W 2021 r. Nadleśnictwo Gryfino utworzyło „powierzchnię zastępczą” Krzywego Lasu, na której posadzono 1100 młodych drzewek. | [national-geographic.pl](https://www.national-geographic.pl/przyroda/krzywy-las-obumiera-dlatego-obok-powstaje-drugi-taki-sam-211125025653/) |
| F0303 | Cis Henrykowski | ✏️ do poprawki | **Najstarsze drzewo w Polsce.** Jego wiek w 1987 r. oszacowano na około 1250 lat, a w 1992 r. dr Cezary Pacyniak ocenił go na 1253 lata. Według przeliczenia z 2020 r. drzewo miało około 1280 lat. Niektóre źródła podają nawet 1300–1500 lat. | ✅ najstarsze drzewo w Polsce<br>❔ w 1987 r. wiek oszacowano na około 1250 lat<br>❔ w 1992 r. dr Cezary Pacyniak ocenił wiek na 1253 lata<br>❌ według przeliczenia z 2020 r. około 1280 lat<br>✅ niektóre źródła podają około 1300 lat<br>❔ niektóre źródła podają do 1500 lat<br>RMF24 podaje, że w 2020 r. wiek określono na 1270 lat (nie ok. 1280), National Geographic – ok. 1300 lat; szacunków z 1987 r. (1250) i 1992 r. (Pacyniak, 1253) ani górnej granicy 1500 lat nie potwierdza żadne niezależne źródło. | **Najstarsze drzewo w Polsce.** W 2020 r. jego wiek określono na około 1270 lat, a niektóre źródła podają około 1300 lat. | [rmf24.pl](https://www.rmf24.pl/ciekawostki-rmf24/news-najstarsze-drzewo-swiata-ile-ma-lat-odpowiedz-jest-nieoczywi,nId,8071674), [national-geographic.pl](https://www.national-geographic.pl/przyroda/ma-okolo-1300-lat-i-obumiera-trwa-ratowanie-najstarszego-z-polskich-cisow/) |
| F0304 | Cis Henrykowski | ❔ niepotwierdzona | Przeżył uszkodzenia od żołnierzy (1813), pocisku artyleryjskiego (1945) i huraganu (1989). Ma dziś zraszacze, zamgławiacze i monitoring. | ❔ uszkodzenia od żołnierzy (1813)<br>❔ uszkodzenia od pocisku artyleryjskiego (1945)<br>✅ uszkodzenia od huraganu (1989)<br>TVN24 opisuje wichurę z lat 1988–1989, która zniszczyła odnogę cisa; dat 1813 (żołnierze) i 1945 (pocisk) nie podaje żadne dostępne niezależne źródło. | Przeżył uszkodzenia od huraganu (1989). Ma dziś zraszacze, zamgławiacze i monitoring. | [tvn24.pl](https://tvn24.pl/tvnmeteo/najnowsze/najstarsze-drzewo-w-polsce-zagrozone-ls4905878) |
| F0338 | Sosna na Sokolicy | ✏️ do poprawki | ⏳ Ma ponad 500 lat, a dokładnego wieku nie zbadano, żeby jej nie uszkodzić. To sosna reliktowa wysoka na około 3 m. | ❌ ma ponad 500 lat<br>❔ wysoka na około 3 m<br>RMF24 i komunikaty PPN w mediach mówią o szacunkowo ok. 500 latach (sosna nigdy nie była badana), nie „ponad 500”; wysokości ok. 3 m nie podaje żadne dostępne niezależne źródło. | ⏳ Ma około 500 lat, a dokładnego wieku nie zbadano, żeby jej nie uszkodzić. To sosna reliktowa. | [rmf24.pl](https://www.rmf24.pl/fakty/polska/news-slynny-500-letni-symbol-pienin-zostal-zniszczony-w-trakcie-a,nId,2627787) |

<details>
<summary>Potwierdzone (7)</summary>

| ID | Karta | Potwierdzone liczby i daty | Źródła |
| --- | --- | --- | --- |
| F0280 | Miłorząb dwuklapowy | kopalne miłorzęby bardzo podobne do dzisiejszego sprzed około 170 mln lat (środkowa jura) | [nature.com](https://www.nature.com/articles/423821a) |
| F0286 | Bożodrzew gruczołowaty | w młodości przyrasta nawet 2 m rocznie; w Polsce dorasta do 30 m; do Europy trafił w 1751 r. | [ogrod.uw.edu.pl](https://www.ogrod.uw.edu.pl/baza-wiedzy/bozodrzew-gruczolowaty-3/), [research.fs.usda.gov](https://research.fs.usda.gov/silvics/ailanthus) |
| F0297 | Sosna na Szczudłach | finalistka konkursu Drzewo Roku 2023 | [wroclaw.pl](https://www.wroclaw.pl/zielony-wroclaw/buk-serce-ogrodu-ktory-rosnie-w-arboretum-wojslawice-zostal-drzewem-roku-2023) |
| F0318 | Drzewo z kulą armatnią | znalezisko jesienią 2025 r.; kula o wadze około 3 kg; średnica ponad 8 cm (potwierdza samo źródło faktu, strona instytucji) | [wloszczowa.pl](https://wloszczowa.pl/aktualnosci/jakie-tajemnice-kryje-jeszcze-historyczna-czarnca-w-starym-drzewie-w-parku-arboretum-pracownicy-miejskiej-zieleni-znalezli-najprawdopodobniej-kule-armatnia-z-xvi-lub-xvii-wieku.html) |
| F0339 | Sosna na Sokolicy | 6 września 2018 r. podmuch wirnika śmigłowca podczas akcji ratunkowej uszkodził sosnę | [wydarzenia.interia.pl](https://wydarzenia.interia.pl/malopolskie/news-slynna-pieninska-sosna-w-opatrunku,nId,5003012) |
| F0340 | Sosna na Sokolicy | odłamany konar miał około 160 lat; kilkadziesiąt gatunków epifitów, w tym 21 gatunków porostów | [radiokrakow.pl](https://www.radiokrakow.pl/aktualnosci/nowy-sacz/za-tydzien-szczegolowe-wyniki-badan-zlamanej-galezi-sosny-z-sokolicy), [scienceinpoland.pl](https://scienceinpoland.pl/en/node/33026) |
| F0347 | Dawidia chińska | kwiatostany otaczają dwie białe podsadki; podsadki długości do 20 cm | [landscapeplants.oregonstate.edu](https://landscapeplants.oregonstate.edu/plants/davidia-involucrata), [rhs.org.uk](https://www.rhs.org.uk/plants/5364/wd/details) |

</details>

Czeka na sprawdzenie (34): F0301, F0302, F0306, F0307, F0308, F0309, F0310, F0311, F0312, F0313, F0315, F0321, F0323, F0324, F0325, F0326, F0327, F0328, F0329, F0330, F0331, F0332, F0333, F0335, F0336, F0337, F0342, F0343, F0344, F0345, F0346, F0350, F0352, F0353.

### Owady

Sprawdzone 4 z 20; ✅ potwierdzona: 1; ✏️ do poprawki: 2; ❔ niepotwierdzona: 1.

| ID | Karta | Wynik | Było | Co się nie zgadza | Proponowane brzmienie | Źródła |
| --- | --- | --- | --- | --- | --- | --- |
| F0397 | Wielbłądka | ✏️ do poprawki | To prastara grupa: rozkwit przeżyła w jurze i kredzie. Naukowo opisano dziś około 210 żyjących gatunków, a szacuje się, że na świecie jest ich około 260. | ❌ rozkwit przeżyła w jurze i kredzie<br>❌ naukowo opisano dziś około 210 żyjących gatunków<br>❔ szacuje się, że na świecie jest ich około 260<br>Aspöck i Aspöck (Deutsche Entomologische Zeitschrift 2023) podają ok. 250 opisanych gatunków, szacunku 260 nie podaje żadne niezależne źródło, a praca w BMC Evolutionary Biology (2014) mówi, że w jurze wielbłądki były nieliczne (7 rodzajów, 14 gatunków), więc rozkwit przypada na kredę. | To prastara grupa: rozkwit przeżyła w kredzie. Naukowo opisano dziś około 250 żyjących gatunków. | [biomedcentral.com](https://www.biomedcentral.com/1471-2148/14/84), [doaj.org](https://doaj.org/article/38c0fad96bb64c69a2d0d6e296809675) |
| F0401 | Bujanka | ❔ niepotwierdzona | Długa, sztywna ssawka (u bujanki większej 5,5–7,5 mm) służy do picia nektaru i mimo groźnego wyglądu jest nieszkodliwa, a sama mucha **nie żądli**. | ❔ ssawka bujanki większej ma 5,5–7,5 mm<br>Zakres 5,5–7,5 mm podają tylko Wikipedia i strony popularne (powołujące się na Kastinger i Weber 2001), a badanie w Journal of Applied Entomology (2024, par.nsf.gov) zmierzyło u bujanki większej ssawki od 4,35 do 11,69 mm. | Długa, sztywna ssawka służy do picia nektaru i mimo groźnego wyglądu jest nieszkodliwa, a sama mucha **nie żądli**. | — |
| F0428 | Nadobnica alpejska | ✏️ do poprawki | Larwy rozwijają się 3–4 lata w martwym i obumierającym drewnie starych buków, rzadziej wiązów górskich. Głównym zagrożeniem jest wycinka starych buczyn i usuwanie z lasu obumierających buków. Pułapką bywa też drewno bukowe składowane latem w lesie, które wywozi się razem ze złożonymi w nim jajami. | ❌ larwy rozwijają się 3–4 lata<br>„Roczniki Bieszczadzkie” (BdPN) i rozprawa doktorska R. Gila (UWr) podają 2–4 lata całego rozwoju, a inne opracowanie ochroniarskie 4 lata z możliwym wydłużeniem o 1–2 lata w wyższych położeniach; zakresu 3–4 lata nie podaje żadne niezależne źródło, stąd ostrożne „kilka lat”. | Larwy rozwijają się kilka lat w martwym i obumierającym drewnie starych buków, rzadziej wiązów górskich. Głównym zagrożeniem jest wycinka starych buczyn i usuwanie z lasu obumierających buków. Pułapką bywa też drewno bukowe składowane latem w lesie, które wywozi się razem ze złożonymi w nim jajami. | [archiwum.bdpn.pl](https://archiwum.bdpn.pl/dokumenty/roczniki/rb24/art10.pdf) |

<details>
<summary>Potwierdzone (1)</summary>

| ID | Karta | Potwierdzone liczby i daty | Źródła |
| --- | --- | --- | --- |
| F0405 | Zgarb rogaty | przedplecze z 3 wyrostkami (2 boczne i 1 tylny) | [gbif.org](https://www.gbif.org/species/165258241) |

</details>

Czeka na sprawdzenie (16): F0371, F0374, F0375, F0378, F0380, F0388, F0409, F0410, F0422, F0424, F0427, F0430, F0431, F0432, F0434, F0435.

### Ryby

Sprawdzone 4 z 22; ✅ potwierdzona: 1; ✏️ do poprawki: 1; ❔ niepotwierdzona: 2.

| ID | Karta | Wynik | Było | Co się nie zgadza | Proponowane brzmienie | Źródła |
| --- | --- | --- | --- | --- | --- | --- |
| F0437 | Stynka | ❔ niepotwierdzona | Na tarło wędruje nawet **30 km w górę rzeki**. | ❔ na tarło wędruje nawet 30 km w górę rzeki<br>Niezależne źródła (m.in. Archiwum Rybactwa Polskiego na rcin.org.pl) potwierdzają tylko, że stynka wchodzi na tarło do rzek; dystansu 30 km nie podaje żadne znalezione źródło poza Wikipedią. | Na tarło wędruje w górę rzeki. | — |
| F0451 | Tasza | ✏️ do poprawki | Inna nazwa to „zając morski”. W Bałtyku dorasta do około 30 cm. | ❌ w Bałtyku dorasta do około 30 cm<br>Atlas Stacji Morskiej Uniwersytetu Gdańskiego podaje, że w Bałtyku tasza ma do 40 cm (samce nieco mniejsze), a nie ok. 30 cm. | Inna nazwa to „zając morski”. W Bałtyku dorasta do 40 cm. | [hel.arch.ug.edu.pl](https://hel.arch.ug.edu.pl/atlas/org/ryb/tas/text.htm) |
| F0454 | Stornia | ❔ niepotwierdzona | W rozwoju jej oczy „wędrują” zwykle na prawą stronę, ale u około **30%** osobników na lewą! | ❔ oczy wędrują na lewą stronę u około 30% osobników<br>Prace naukowe (Russo i in. 2012, badania z Morza Białego w Trudy ZIN 2021–2022) opisują dużą, zależną od populacji zmienność udziału osobników lewostronnych (np. 13–26% w Zatoce Onegi, 2–7% w innej zatoce); wartości ok. 30% dla gatunku nie podaje żadne znalezione źródło. | W rozwoju jej oczy „wędrują” zwykle na prawą stronę, ale u części osobników na lewą! | — |

<details>
<summary>Potwierdzone (1)</summary>

| ID | Karta | Potwierdzone liczby i daty | Źródła |
| --- | --- | --- | --- |
| F0460 | Iglicznia | młode opuszczają torbę lęgową po około miesiącu; młode mają 2–3 cm długości | [pmc.ncbi.nlm.nih.gov](https://pmc.ncbi.nlm.nih.gov/articles/PMC2842728), [fishes-fnam.linnaeus.naturalis.nl](https://fishes-fnam.linnaeus.naturalis.nl/linnaeus_ng/app/views/species/taxon.php?id=109991) |

</details>

Czeka na sprawdzenie (18): F0465, F0466, F0472, F0474, F0476, F0478, F0479, F0485, F0487, F0490, F0492, F0494, F0500, F0503, F0504, F0505, F0506, F0509.

### Płazy i gady

Sprawdzone 4 z 22; ✅ potwierdzona: 2; ✏️ do poprawki: 1; ❔ niepotwierdzona: 1.

| ID | Karta | Wynik | Było | Co się nie zgadza | Proponowane brzmienie | Źródła |
| --- | --- | --- | --- | --- | --- | --- |
| F0517 | Grzebiuszka ziemna | ❔ niepotwierdzona | Samica składa skrzek w jednym grubym sznurze o długości 40–100 cm. | ✅ sznur skrzeku ma do 100 cm długości (górna granica)<br>❔ sznur skrzeku ma od 40 cm długości (dolna granica zakresu 40–100 cm)<br>❔ skrzek składany jest w jednym sznurze<br>AmphibiaWeb podaje gruby, kiełbaskowaty sznur skrzeku do 1 m (opisany jako „paired”); dolnej granicy 40 cm ani pojedynczego sznura nie potwierdza żadne niezależne źródło. | Samica składa skrzek w grubym sznurze o długości do 100 cm. | [amphibiaweb.org](https://amphibiaweb.org/species/5270) |
| F0530 | Ropucha szara | ✏️ do poprawki | Skrzek składa w sznurach długości **2,5–5 m**, z kilkoma tysiącami jaj. | ❌ sznury skrzeku długości 2,5–5 m<br>✅ z kilkoma tysiącami jaj<br>Źródła instytucjonalne różnią się co do długości: opis płazów Wigierskiego PN podaje 2,5–6,0 m i kilka tysięcy jaj, strony Lasów Państwowych mówią o „kilkumetrowych” sznurach (pojedynczy nawet do 5 m, do 6000 jaj), a Woodland Trust podaje średnio 1500 jaj (maks. 5000). | Skrzek składa w **kilkumetrowych sznurach**, z kilkoma tysiącami jaj. | [wigry.org.pl](https://www.wigry.org.pl/plazy2/ropu.htm) |

<details>
<summary>Potwierdzone (2)</summary>

| ID | Karta | Potwierdzone liczby i daty | Źródła |
| --- | --- | --- | --- |
| F0522 | Kumak górski | bombininę wyizolowano na przełomie lat 60. i 70. XX w., pierwszy opis z 1970 r.; jeden z pierwszych poznanych peptydów przeciwdrobnoustrojowych płazów | [link.springer.com](https://link.springer.com/article/10.1007/BF00907538), [pmc.ncbi.nlm.nih.gov](https://pmc.ncbi.nlm.nih.gov/articles/PMC4070539) |
| F0525 | Salamandra plamista | największy płaz ogoniasty w Polsce; długość 10–24 cm; maksymalnie 32 cm | [polsatnews.pl](https://www.polsatnews.pl/wiadomosc/2023-10-23/salamandra-plamista-to-najwiekszy-plaz-ogoniasty-w-polsce-ostrzezono-przed-dotykaniem-zwierzecia/), [national-geographic.pl](https://www.national-geographic.pl/przyroda/salamandra-od-legend-o-ogniu-po-wspolczesna-ochrone-przyrody/), [liverpoolmuseums.org.uk](https://www.liverpoolmuseums.org.uk/artifact/salamandra-salamandra-linnaeus-1758-0) |

</details>

Czeka na sprawdzenie (18): F0534, F0537, F0540, F0547, F0551, F0555, F0557, F0558, F0562, F0565, F0568, F0569, F0570, F0571, F0575, F0583, F0591, F0594.

### Ptaki

Sprawdzone 14 z 35; ✅ potwierdzona: 8; ❔ niepotwierdzona: 6.

| ID | Karta | Wynik | Było | Co się nie zgadza | Proponowane brzmienie | Źródła |
| --- | --- | --- | --- | --- | --- | --- |
| F0601 | Bielik | ❔ niepotwierdzona | W Polsce gniazduje dziś około 1,4–1,5 tys. par, co daje trzecią co do wielkości populację w Europie, po Norwegii i europejskiej części Rosji. Od 1994 do 2008 r. przybywało średnio 40 par rocznie. | ✅ w Polsce gniazduje około 1,4–1,5 tys. par<br>✅ trzecia co do wielkości populacja w Europie<br>❔ kolejność: po Norwegii i europejskiej części Rosji<br>❔ od 1994 do 2008 r. przybywało średnio 40 par rocznie<br>Praca naukowa z 2022 r. podaje 1400–1500 par (za Chodkiewicz i in.), media z 2026 r. już 1,5–2 tys. par i 3. miejsce w Europie, ale kolejności „po Norwegii i Rosji” ani przyrostu 40 par rocznie w latach 1994–2008 nie potwierdza żadne niezależne źródło. | W Polsce gniazduje dziś około 1,4–1,5 tys. par, co daje trzecią co do wielkości populację w Europie. | [informahealthcare.com](https://informahealthcare.com/doi/full/10.1080/24750263.2022.2134478), [polsatnews.pl](https://www.polsatnews.pl/wiadomosc/2026-05-12/smutne-i-bulwersujace-zniszczono-gniazdo-bielika-pod-poddebicami/) |
| F0606 | Mysikrólik | ❔ niepotwierdzona | W czasie 18-godzinnej zimowej nocy przy –25 °C, przytulone do siebie mysikróliki spalają tłuszcz równy około 20% masy ciała. | ❔ 18-godzinna zimowa noc<br>❔ temperatura –25 °C<br>✅ spalają tłuszcz równy około 20% masy ciała<br>Woodland Trust i Countryfile podają ok. 20% masy ciała zużywane w mroźną noc, ale 18 godzin i –25 °C występują razem tylko na prywatnym blogu. | W czasie mroźnej zimowej nocy przytulone do siebie mysikróliki spalają tłuszcz równy około 20% masy ciała. | [woodlandtrust.org.uk](https://woodlandtrust.org.uk/trees-woods-and-wildlife/animals/birds/goldcrest/) |
| F0612 | Puchacz | ❔ niepotwierdzona | Do reformy ortografii z 1936 r. pisało się „**puhacz**”, od czasownika „puhać”. | ✅ reforma ortografii w 1936 r.<br>❔ pisownię „puhacz” zmieniła dopiero reforma z 1936 r.<br>Dawną formę „puhacz” potwierdza Słownik polszczyzny XVI wieku, ale żadne niezależne źródło nie wiąże zmiany pisowni tego słowa z reformą z 1936 r. | Dawniej pisało się „**puhacz**”, od czasownika „puhać”. | [notesfrompoland.com](https://notesfrompoland.com/2026/01/02/poland-introduces-biggest-changes-to-spelling-in-almost-a-century/) |
| F0623 | Dubelt | ❔ niepotwierdzona | Samce tokują **stadnie, nocą**, na torfowiskach. Niektóre tokowiska są używane **przez 20, a nawet 60 lat**! | ✅ niektóre tokowiska są używane przez 20 lat<br>❔ niektóre tokowiska są używane nawet przez 60 lat<br>Journal of Ornithology (2024) opisuje jedno tokowisko na Białorusi badane przez 22 lata, ale tokowiska używanego przez 60 lat nie podaje żadne niezależne źródło. | Samce tokują **stadnie, nocą**, na torfowiskach. Niektóre tokowiska są używane **przez 20 lat**! | [link.springer.com](https://link.springer.com/10.1007/s10336-023-02091-7) |
| F0634 | Pustułka | ❔ niepotwierdzona | Poluje, **zawisając** w powietrzu 10–20 m nad ziemią. Dawna angielska nazwa to *windhover*. | ❔ zawisa w powietrzu 10–20 m nad ziemią<br>Zakres 10–20 m podają tylko Wikipedia i jej kopie, a EBSCO Research Starters i Oiseaux.net piszą o wypatrywaniu zdobyczy z wysokości 10–40 m, więc liczbę lepiej pominąć. | Poluje, **zawisając** w powietrzu. Dawna angielska nazwa to *windhover*. | — |
| F0639 | Nawałnik duży | ❔ niepotwierdzona | W Polsce to rzadki zalatujący gość: do 2018 r. było **21 stwierdzeń**. | ❔ do 2018 r. w Polsce było 21 stwierdzeń<br>Raporty Komisji Faunistycznej dostępne w wynikach wyszukiwania nie podają łącznej liczby stwierdzeń nawałnika dużego do 2018 r., a liczby 21 nie potwierdza żadne niezależne źródło. | W Polsce to rzadki zalatujący gość. | — |

<details>
<summary>Potwierdzone (8)</summary>

| ID | Karta | Potwierdzone liczby i daty | Źródła |
| --- | --- | --- | --- |
| F0605 | Mysikrólik | pełne zniesienie liczy nawet 10–12 jaj; zniesienie waży około półtora raza więcej niż samica | [kentwildlifetrust.org.uk](https://www.kentwildlifetrust.org.uk/wildlife-explorer/birds/tits-crests-and-warblers/goldcrest) |
| F0614 | Jerzyk zwyczajny | śpi w locie nawet na wysokości 2,5 km | [lu.se](https://www.lu.se/lup/publication/0ca50830-4800-42a8-a035-35e500098a00) |
| F0615 | Jerzyk zwyczajny | nieprzerwany lot do 10 miesięcy poza okresem lęgowym | [nature.com](https://www.nature.com/news/record-breaking-common-swifts-fly-for-10-months-without-landing-1.20873) |
| F0617 | Sokół wędrowny | w locie nurkowym przekracza 320 km/h | [guinnessworldrecords.com](https://guinnessworldrecords.com/world-records/70929-fastest-bird-diving) |
| F0620 | Szlamnik | w 2022 r. młody ptak przeleciał z Alaski na Tasmanię; około 13 560 km; w 11 dni | [guinnessworldrecords.com](https://www.guinnessworldrecords.com/news/2023/1/the-record-breaking-bird-that-flew-from-alaska-to-australia-731576), [explorersweb.com](https://explorersweb.com/bird-sets-record-nonstop-13560km-flight/) |
| F0624 | Słonka zwyczajna | widzenie dookoła, w 360° | [britannica.com](https://www.britannica.com/animal/woodcock) |
| F0626 | Słonka zwyczajna | od 2.01.2026 słonka nie jest gatunkiem łownym w Polsce | [eli.gov.pl](https://eli.gov.pl/eli/DU/2025/1286/ogl) |
| F0648 | Żołna | nora długości do 2 m | [parkilodzkie.pl](https://parkilodzkie.pl/npk/aktualnosci/2097-zolna-nowy-gatunek-legowy-w-spalskim-pk) |

</details>

Czeka na sprawdzenie (21): F0622, F0638, F0651, F0653, F0659, F0664, F0665, F0672, F0674, F0676, F0679, F0680, F0681, F0682, F0683, F0684, F0685, F0686, F0689, F0692, F0693.

### Ssaki

Sprawdzone 4 z 31; ✏️ do poprawki: 1; ❔ niepotwierdzona: 3.

| ID | Karta | Wynik | Było | Co się nie zgadza | Proponowane brzmienie | Źródła |
| --- | --- | --- | --- | --- | --- | --- |
| F0698 | Ryjówka aksamitna | ✏️ do poprawki | Zimą jej **czaszka kurczy się o prawie 20%, a mózg nawet o 30%**, a wiosną odrasta mniej więcej do pierwotnych rozmiarów! To **zjawisko Dehnela**, nazwane od polskiego zoologa Augusta Dehnela. | ✅ zimą czaszka kurczy się o prawie 20%<br>❌ mózg kurczy się nawet o 30%<br>Tylko komunikat prasowy Cell Press z 2017 r. (ScienceDaily) podaje spadek masy mózgu o „20 lub 30%”; prace naukowe (przegląd w Current Biology 2021, badanie Instytutu Maxa Plancka, PubMed 29663134) podają ok. 21–21,4%, a badanie MPI z 2025 r. niespełna 10%. Redakcja: badania różnią się co do mózgu (od niespełna 10% do ok. 21%), więc bez liczby. | Zimą jej **czaszka kurczy się o prawie 20%, a mózg też wyraźnie maleje**, a wiosną odrasta mniej więcej do pierwotnych rozmiarów! To **zjawisko Dehnela**, nazwane od polskiego zoologa Augusta Dehnela. | [sciencedaily.com](https://www.sciencedaily.com/releases/2017/10/171023123631.htm), [cell.com](https://www.cell.com/current-biology/fulltext/S0960-9822(21)00519-4) |
| F0704 | Ryjówka górska | ❔ niepotwierdzona | Codziennie zjada **2–3 razy więcej**, niż sama waży! | ❔ ryjówka górska codziennie zjada 2–3 razy więcej, niż sama waży<br>Dla ryjówki górskiej żadne niezależne źródło nie podaje dziennego pobrania pokarmu; strony Lasów Państwowych podają dla ryjówek ogólnie od ok. 100% do 150–200% masy ciała, a „trzykrotność” tylko dla karmiącej samicy ryjówki malutkiej. | — (pominąć) | — |
| F0713 | Kret europejski | ❔ niepotwierdzona | Kopie korytarze w tempie **12–15 m na godzinę**, a na glebach bagiennych kretowiska osiągają do 90 cm wysokości! | ✅ kopie korytarze w tempie 12–15 m na godzinę<br>❔ na glebach bagiennych kretowiska osiągają do 90 cm wysokości<br>Game & Wildlife Conservation Trust podaje, że kret przekopał w godzinę ponad 15 jardów (ok. 14 m), co mieści się w 12–15 m; wysokości kretowisk do 90 cm na glebach bagiennych nie podaje żadne znalezione źródło. | Kopie korytarze w tempie **12–15 m na godzinę**! | [gwct.org.uk](https://gwct.org.uk/wildlife/species-of-the-month/2010/february/) |
| F0720 | Nocek rudy | ❔ niepotwierdzona | W Finlandii samiec „Nestori”, żyjący w starym młynie, miał w 2024 r. około **21 lat**! | ❔ samiec „Nestori” miał w 2024 r. około 21 lat<br>Luomus (Uniwersytet Helsiński) potwierdza Nestoriego z młyna w Lieto (zaobrączkowany w 2008 r. jako dorosły, w 2019–2020 r. „blisko 20 lat”), ale wieku ok. 21 lat w 2024 r. nie podaje żadne niezależne źródło – tylko Wikipedia za „Helsingin Sanomat”. | — (pominąć) | — |

Czeka na sprawdzenie (27): F0702, F0707, F0710, F0722, F0724, F0727, F0729, F0732, F0734, F0741, F0742, F0747, F0749, F0750, F0751, F0752, F0753, F0754, F0757, F0760, F0761, F0765, F0767, F0769, F0772, F0780, F0782.

### Minerały

Sprawdzone 16 z 25; ✅ potwierdzona: 10; ✏️ do poprawki: 2; ❔ niepotwierdzona: 4.

| ID | Karta | Wynik | Było | Co się nie zgadza | Proponowane brzmienie | Źródła |
| --- | --- | --- | --- | --- | --- | --- |
| F0802 | Sachanbińskiit | ✏️ do poprawki | Nazwa honoruje prof. Michała Sachanbińskiego, w latach 1977–2009 kierownika Muzeum Mineralogicznego UWr. W 1992 roku wraz ze współautorami opisał on naturalny prazjolit z okolic Suszyny-Mrówieńca na Dolnym Śląsku, uznawany za pierwsze znalezisko naturalnego prazjolitu. | ✅ kierownik Muzeum Mineralogicznego UWr od 1977 r.<br>❌ kierownik Muzeum do 2009 r.<br>✅ w 1992 r. opisał naturalny prazjolit z okolic Suszyny-Mrówieńca<br>Strona historii muzeum podaje 1977–2009, ale historia na stronie ING UWr (koniec 31.08.2008), lista pracowników muzeum (do 1.09.2008) i Elements (1977–2008) wskazują 2008 r., więc proponuję ostrożne „od 1977 r. przez ponad 30 lat” (albo 1977–2008). | Nazwa honoruje prof. Michała Sachanbińskiego, który od 1977 r. przez ponad 30 lat kierował Muzeum Mineralogicznym UWr. W 1992 roku wraz ze współautorami opisał on naturalny prazjolit z okolic Suszyny-Mrówieńca na Dolnym Śląsku, uznawany za pierwsze znalezisko naturalnego prazjolitu. | [muzmin.uwr.edu.pl](https://muzmin.uwr.edu.pl/historia/), [ing.uwr.edu.pl](https://ing.uwr.edu.pl/en/k-maslankiewicz-mineralogical-museum/history-of-the-mineralogy-museum/), [muzmin.uwr.edu.pl](https://muzmin.uwr.edu.pl/en/?p=26223) |
| F0806 | Krzemień pasiasty | ❔ niepotwierdzona | W Polsce tworzy konkrecje do 2 m lub warstwy w skałach górnej jury (oksford, kimeryd). | ❔ konkrecje do 2 m<br>✅ skały górnej jury – oksford<br>❔ skały górnej jury – kimeryd<br>Źródła PIG wiążą krzemień pasiasty z górnym oksfordem i opisują formy o średnicy ponad 1 m (grubości do 10 cm), ale konkrecji do 2 m ani kimerydu nie potwierdza żadne niezależne źródło. | W Polsce tworzy konkrecje lub warstwy w skałach górnej jury (oksford). | [vjs.pgi.gov.pl](https://vjs.pgi.gov.pl/article/download/26453/18163) |
| F0807 | Krzemień pasiasty | ❔ niepotwierdzona | W ok. 95% to krzemionka, głównie kwarc. Chalcedonu jest mniej. Jego geneza wciąż nie jest do końca wyjaśniona. | ❔ w ok. 95% to krzemionka<br>Udziału ok. 95% krzemionki nie podaje żadne niezależne źródło (PIG pisze ogólnie, że głównym składnikiem konkrecji krzemiennych jest chalcedon). | To głównie krzemionka, przede wszystkim kwarc. Chalcedonu jest mniej. Jego geneza wciąż nie jest do końca wyjaśniona. | — |
| F0823 | Aragonit z Machowa | ✏️ do poprawki | To polimorficzna odmiana węglanu wapnia, druga co do powszechności po kalcycie. Z aragonitu składa się ok. 90% masy perłowej. | ✅ aragonit to druga co do powszechności po kalcycie odmiana węglanu wapnia<br>❌ z aragonitu składa się ok. 90% masy perłowej<br>Berkeley Lab podaje, że aragonit stanowi 95% masy perłowej (przegląd ScienceDirect: ponad 95% wagowo, reszta to 1–5% materii organicznej), a nie ok. 90%; drugie miejsce po kalcycie potwierdza Mindat. | To polimorficzna odmiana węglanu wapnia, druga co do powszechności po kalcycie. Z aragonitu składa się ok. 95% masy perłowej. | [mindat.org](https://www.mindat.org/min-307.html), [newscenter.lbl.gov](https://newscenter.lbl.gov/2008/11/25/mother-of-pearl-secret-revealed/) |
| F0826 | Halit z Grot Kryształowych | ❔ niepotwierdzona | Groty Kryształowe to podziemny rezerwat przyrody nieożywionej w Kopalni Soli Wieliczka. W obecnej formie utworzono go rozporządzeniem Wojewody Małopolskiego z 11 września 2000 r., ale groty chroniono jako podziemny rezerwat już od 1928 r. | ❔ rezerwat w obecnej formie utworzono rozporządzeniem Wojewody Małopolskiego z 11 września 2000 r.<br>✅ rezerwat utworzono w 2000 r.<br>✅ groty chroniono jako podziemny rezerwat już od 1928 r.<br>Baza geostanowisk IOP PAN i prace w „Studia Naturae” (2000) potwierdzają ochronę od 1928 r. i utworzenie rezerwatu w 2000 r., ale dokładnej daty 11 września 2000 r. nie podaje żadne dostępne niezależne źródło. | Groty Kryształowe to podziemny rezerwat przyrody nieożywionej w Kopalni Soli Wieliczka. W obecnej formie utworzono go rozporządzeniem Wojewody Małopolskiego w 2000 r., ale groty chroniono jako podziemny rezerwat już od 1928 r. | [iop.krakow.pl](https://www.iop.krakow.pl/geosites/home/single/250) |
| F0827 | Halit z Grot Kryształowych | ❔ niepotwierdzona | Chroni dwie naturalne pustki: Grotę Dolną (706 m³) i Górną (1000 m³), na głębokości 70–114 m. | ✅ Grota Dolna ma 706 m³<br>✅ Grota Górna ma 1000 m³<br>❔ groty leżą na głębokości 70–114 m<br>IOP PAN podaje 706 m³ Groty Dolnej i ok. 1000 m³ Górnej (w rozporządzeniu z 2000 r. 1000,17 m³), ale o głębokości mówi tylko, że groty leżą ok. 80 m pod powierzchnią; zakresu 70–114 m nie podaje żadne niezależne źródło. | Chroni dwie naturalne pustki: Grotę Dolną (706 m³) i Górną (1000 m³). | [iop.krakow.pl](https://www.iop.krakow.pl/geosites/home/single/250) |

<details>
<summary>Potwierdzone (10)</summary>

| ID | Karta | Potwierdzone liczby i daty | Źródła |
| --- | --- | --- | --- |
| F0787 | Żabińskiit | wzór idealny Ca(Al₀.₅Ta₀.₅)(SiO₄)O; numer IMA 2015-033; biuletyn CNMNC z sierpnia 2015 r. (Newsletter No. 26) | [resolver.caltech.edu](https://resolver.caltech.edu/CaltechAUTHORS:20170519-073605517), [geo.uw.edu.pl](https://geo.uw.edu.pl/wp-content/uploads/sites/65/2023/05/S_Ilnicki_publikacje.pdf) |
| F0788 | Żabińskiit | agregaty wielkości ok. 120 × 70 μm w spękanym krysztale cyrkonu | [resolver.caltech.edu](https://resolver.caltech.edu/CaltechAUTHORS:20170519-073605517) |
| F0791 | Taliomelan | włókniste skupienia mniejsze niż 50 μm | [msaweb.org](https://msaweb.org/MSA/AmMin/TOC/2021/Abstracts/AM106P2020.pdf) |
| F0796 | Skandiowinchit | IMA zatwierdziła go jako nowy minerał w 2022 r. (IMA 2022-009); pełny opis ukazał się w 2024 r. (American Mineralogist 109) | [msaweb.org](https://msaweb.org/MSA/AmMin/TOC/2024/Abstracts/AM109P0940.pdf) |
| F0798 | Skandiowinchit | kamieniołom koło Sobótki ok. 30 km na południe od Wrocławia | [msaweb.org](https://msaweb.org/MSA/AmMin/TOC/2024/Abstracts/AM109P0940.pdf) |
| F0799 | Berylokordieryt-Na | zatwierdzony przez IMA jako minerał 2022-108; wzór NaMg₄(Al₅Be)(AlSi₅O₁₈)₂·2H₂O | [cnmnc.units.it](https://cnmnc.units.it/recent/211a.%20CNMNC%20Newsletter%2072-2023%20(MM).pdf) |
| F0800 | Berylokordieryt-Na | Góra Szklana koło Szklar, ok. 6 km na północ od Ząbkowic Śląskich | [cnmnc.units.it](https://cnmnc.units.it/recent/211a.%20CNMNC%20Newsletter%2072-2023%20(MM).pdf) |
| F0808 | Krzemień pasiasty | Krzemionki na Liście Światowego Dziedzictwa UNESCO od 2019 r. | [whc.unesco.org](https://whc.unesco.org/en/decisions/7390/) |
| F0813 | Siarka rodzima z Tarnobrzega | odkrywkę w Machowie zamknięto w 1992 r. | [pgi.gov.pl](https://www.pgi.gov.pl/muzeum/kopalnia-wiedzy-1/12583-siarka.html) |
| F0816 | Haueryt z Machowa i Jeziórka | opisano go w 1846 r. ze złoża siarki Kalinka koło Detvy (dziś Słowacja) | [webmineral.com](https://webmineral.com/data/Hauerite.shtml) |

</details>

Czeka na sprawdzenie (9): F0845, F0847, F0849, F0852, F0854, F0855, F0857, F0859, F0862.

### Formacje skalne

Sprawdzone 7 z 44; ✅ potwierdzona: 4; ❔ niepotwierdzona: 3.

| ID | Karta | Wynik | Było | Co się nie zgadza | Proponowane brzmienie | Źródła |
| --- | --- | --- | --- | --- | --- | --- |
| F0866 | Słonecznik | ❔ niepotwierdzona | Leży na wysokości 1423 m n.p.m. i ma 12,5 m wysokości. Północny filar przypomina postać ludzką. | ❔ Słonecznik leży na wysokości 1423 m n.p.m.<br>❔ skałki mają 12,5 m wysokości<br>Wysokość 1423 m n.p.m. podają tylko serwisy turystyczne (regionalna baza szlaków ma na tej samej stronie także 1413 m), a wysokość skałek podawana jest różnie: ok. 10 m, ok. 12 m, 12,5 m, a nawet 25 m; brak źródła instytucjonalnego. | Północny filar przypomina postać ludzką. | — |
| F0870 | Dziurawa Skała | ❔ niepotwierdzona | Po niemiecku nazywała się Hohle Stein („Pusty Kamień”). To granitowa grupa skalna na wysokości 470 m n.p.m. | ❔ grupa skalna leży na wysokości 470 m n.p.m.<br>Wysokość ok. 470 m n.p.m. podaje tylko blog hotelu z Przesieki; bazy PIG-PIB (geostanowiska, Jaskinie Polski) opisują inną Dziurawą Skałę (Wyżyna Krakowsko-Częstochowska, 480 m). | Po niemiecku nazywała się Hohle Stein („Pusty Kamień”). To granitowa grupa skalna. | — |
| F0872 | Trzy Świnki | ❔ niepotwierdzona | Skałki mają do 8 m wysokości. Budują je granity porfirowate z dużymi kremowymi kryształami skaleni. | ❔ skałki mają do 8 m wysokości<br>Przewodnik geoturystyczny KPN potwierdza, że Trzy Świnki zbudowane są z granitu porfirowatego, ale wysokość ok. 8 m podaje tylko blog turystyczny (TravelFeed), bez potwierdzenia w źródłach instytucjonalnych. | Skałki budują granity porfirowate z dużymi kremowymi kryształami skaleni. | — |

<details>
<summary>Potwierdzone (4)</summary>

| ID | Karta | Potwierdzone liczby i daty | Źródła |
| --- | --- | --- | --- |
| F0868 | Pielgrzymy | granitowe skały mają do 25 m wysokości; trzy potężne grupy skalne | [kpnmab.pl](https://kpnmab.pl/pielgrzymy-pl/a) |
| F0869 | Pielgrzymy | stoją na wysokości 1204 m n.p.m. na Śląskim Grzbiecie, na południe od Borowic | [kpnmab.pl](https://kpnmab.pl/pielgrzymy-pl/a) |
| F0935 | Krzemionki | kopalnie eksploatowano ok. 3900–1600 p.n.e. | [whc.unesco.org](https://whc.unesco.org/en/decisions/7390/) |
| F0936 | Krzemionki | od 2019 r. obiekt UNESCO „Krzemionkowski region prehistorycznego górnictwa krzemienia pasiastego” | [whc.unesco.org](https://whc.unesco.org/en/decisions/7390/) |

</details>

Czeka na sprawdzenie (37): F0875, F0876, F0877, F0879, F0880, F0881, F0882, F0886, F0887, F0888, F0889, F0890, F0891, F0893, F0895, F0897, F0899, F0900, F0901, F0902, F0904, F0908, F0909, F0910, F0917, F0918, F0919, F0920, F0922, F0924, F0926, F0927, F0930, F0931, F0932, F0937, F0941.

### Skamieniałości

Sprawdzone 5 z 25; ✅ potwierdzona: 4; ✏️ do poprawki: 1.

| ID | Karta | Wynik | Było | Co się nie zgadza | Proponowane brzmienie | Źródła |
| --- | --- | --- | --- | --- | --- | --- |
| F0956 | Karbońskie lasy węglowe | ✏️ do poprawki | Lepidodendrony to widłaki dorastające do 30 m wysokości i ok. 2 m średnicy. Ich rombowe „poduszki” liściowe łatwo poznać w skale. | ❌ lepidodendrony dorastały do 30 m wysokości<br>✅ pnie miały ok. 2 m średnicy<br>Britannica w haśle Lepidodendron podaje do ok. 40 m wysokości i ok. 2 m średnicy, a w haśle Lycopsid (oraz Smithsonian) do ok. 30 m, więc bezpieczniej podać zakres 30–40 m. | Lepidodendrony to widłaki dorastające do 30–40 m wysokości i ok. 2 m średnicy. Ich rombowe „poduszki” liściowe łatwo poznać w skale. | [britannica.com](https://www.britannica.com/plant/Lepidodendron) |

<details>
<summary>Potwierdzone (4)</summary>

| ID | Karta | Potwierdzone liczby i daty | Źródła |
| --- | --- | --- | --- |
| F0949 | Wczesna flora lądowa dewonu | w 2007 r. opisano kompletne skamieniałości drzewa Wattieza z Nowego Jorku; do 2007 r. wielu naukowców uważało Archaeopteris za najstarsze znane drzewo | [sciencedaily.com](https://sciencedaily.com/releases/2007/04/070418130435.htm), [cbc.ca](https://www.cbc.ca/news/science/oldest-tree-fossil-found-scientists-say-1.685125) |
| F0950 | Alienacanthus malkowskii | gatunek opisany w 1957 r. przez Juliana Kulczyckiego | [royalsocietypublishing.org](https://royalsocietypublishing.org/doi/10.1098/rsos.231747) |
| F0955 | Tropy tetrapodów z Zachełmia | w 2015 r. Spencer G. Lucas zakwestionował interpretację tropów z Zachełmia | [ui.adsabs.harvard.edu](https://ui.adsabs.harvard.edu/abs/2015Ichno..22..136L) |
| F0957 | Karbońskie lasy węglowe | sygilarie osiągały ponad 20 m wysokości | [repository.si.edu](https://repository.si.edu/server/api/core/bitstreams/d4c37e19-24a4-44a0-85eb-952ee78deaab/content) |

</details>

Czeka na sprawdzenie (20): F0958, F0959, F0960, F0968, F0971, F0972, F0974, F0976, F0979, F0983, F0991, F0992, F1005, F1006, F1007, F1010, F1011, F1015, F1016, F1017.

### Atmosfera i astronomia

Sprawdzone 3 z 24; ✅ potwierdzona: 3.

<details>
<summary>Potwierdzone (3)</summary>

| ID | Karta | Potwierdzone liczby i daty | Źródła |
| --- | --- | --- | --- |
| F1019 | Widmo Brockenu | zjawisko na Brockenie jako pierwszy opisał w 1780 r. Johann Esaias Silberschlag; Pierre Bouguer i Antonio de Ulloa opisali podobne zjawisko w Andach wcześniej, w połowie XVIII w. | [dwd.de](https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv3=100496&lv2=100310), [cambridge.org](https://www.cambridge.org/core/books/abs/diffraction-effects-in-semiclassical-scattering/glory/50FABA20DFE356B768663E737E0B6BD2) |
| F1035 | Dodatnie wyładowania CG+ | pioruny dodatnie to średnio mniej niż 5% wszystkich uderzeń | [noaa.gov](https://www.noaa.gov/jetstream/lightning/positive-and-negative-side-of-lightning) |
| F1039 | Białe noce astronomiczne | latem w całej Polsce nie zapada noc astronomiczna; Słońce chowa się wtedy pod horyzont na mniej niż 18° | [national-geographic.pl](https://www.national-geographic.pl/kosmos/biale-noce-zawitaly-nad-polska-przez-najblizsze-tygodnie-ciemnosc-niemal-calkowicie-zniknie/) |

</details>

Czeka na sprawdzenie (21): F1041, F1044, F1045, F1047, F1048, F1049, F1051, F1053, F1055, F1056, F1057, F1063, F1065, F1067, F1068, F1069, F1070, F1071, F1072, F1074, F1075.

### Rekordy krajobrazu

Sprawdzone 6 z 59; ✅ potwierdzona: 3; ✏️ do poprawki: 2; ❔ niepotwierdzona: 1.

| ID | Karta | Wynik | Było | Co się nie zgadza | Proponowane brzmienie | Źródła |
| --- | --- | --- | --- | --- | --- | --- |
| F1080 | Pustynia Błędowska | ✏️ do poprawki | To największy w Polsce obszar lotnych piasków. Pustynia ma ok. 8 km długości i do 4 km szerokości, a obszar Natura 2000 „Pustynia Błędowska” obejmuje ok. 19,6 km². | ✅ największy w Polsce obszar lotnych piasków<br>❌ pustynia ma ok. 8 km długości<br>✅ pustynia ma do 4 km szerokości<br>✅ obszar Natura 2000 „Pustynia Błędowska” obejmuje ok. 19,6 km²<br>Długości 8 km nie podaje żadne niezależne źródło: Interia i interpelacja poselska mówią o ok. 10 km, a praca z 1962 r. (rcin.org.pl) o ok. 7 km pola wydm, więc proponuję usunąć długość; obszar Natura 2000 to 1960,53 ha wg rozporządzenia z 2022 r. | To największy w Polsce obszar lotnych piasków. Pustynia ma do 4 km szerokości, a obszar Natura 2000 „Pustynia Błędowska” obejmuje ok. 19,6 km². | [radiokrakow.pl](https://www.radiokrakow.pl/aktualnosci/malopolskazachodnia/nowe-obiekty-turystyczne-na-pustyni-bledowskiej), [wydarzenia.interia.pl](https://wydarzenia.interia.pl/tematy-pustynia-bledowska,gsbi,7214), [eli.gov.pl](https://eli.gov.pl/eli/DU/2022/1949/ogl/pol/pdf) |
| F1083 | Ruchome wydmy Słowińskiego Parku Narodowego | ❔ niepotwierdzona | Wyższy jest tylko Wielbłądzi Grzbiet (49,5 m n.p.m.), ale ta wydma ma stałą wysokość. | ✅ Wielbłądzi Grzbiet ma 49,5 m n.p.m. i jest wydmą stałą<br>❔ wyższy od Wydmy Łąckiej jest tylko Wielbłądzi Grzbiet (Łącka druga na polskim wybrzeżu)<br>Nadleśnictwo Elbląg podaje 49,5 m i nazywa Wielbłądzi Grzbiet (Mierzeja Wiślana) najwyższą stałą wydmą, Urząd Morski w Gdyni 49 m; żadne źródło nie potwierdza, że wyższy jest „tylko” on, a w wynikach pojawia się zalesiona Wydma Czołpińska w SPN z wysokością 56 m n.p.m. | Wyższy jest Wielbłądzi Grzbiet (49,5 m n.p.m.), ale ta wydma ma stałą wysokość. | [elblag.gdansk.lasy.gov.pl](https://elblag.gdansk.lasy.gov.pl/obiekty-edukacyjne/-/asset_publisher/1M8a/content/sciezka-przyrodnicza-i-wiata-widokowa-wielbladzi-garb-) |
| F1084 | Krzywy Las | ✏️ do poprawki | Ponad 50 sosen jest wygiętych pod kątem ok. 90°, tuż nad ziemią (ok. 20 cm). Mają 11–12 m wysokości. | ✅ ponad 50 sosen jest wygiętych<br>✅ pnie wygięte pod kątem ok. 90°<br>❌ wygięcie tuż nad ziemią, ok. 20 cm<br>❔ sosny mają 11–12 m wysokości<br>Nadleśnictwo Gryfino podaje 105 zdeformowanych sosen i (za opracowaniem Ćwiklińskiego) zgięcia pod kątem 90° i mniejszym na wysokości 10–55 cm, a nie ok. 20 cm; wysokości drzew 11–12 m nie podaje żadne niezależne źródło. | Ponad 50 sosen jest wygiętych pod kątem ok. 90°, tuż nad ziemią (10–55 cm). | [gryfino.szczecin.lasy.gov.pl](https://gryfino.szczecin.lasy.gov.pl/wiecej-o-krzywym-lesie) |

<details>
<summary>Potwierdzone (3)</summary>

| ID | Karta | Potwierdzone liczby i daty | Źródła |
| --- | --- | --- | --- |
| F1081 | Pustynia Błędowska | warstwa piasków ma miejscami nawet 70 m grubości | [pgi.gov.pl](https://www.pgi.gov.pl/surowce/skalne-i-inne/surowce-ilaste/14022-piaski_podsadzkowe.html) |
| F1082 | Ruchome wydmy Słowińskiego Parku Narodowego | Wydma Łącka wznosi się na ok. 40–42 m n.p.m.; jedna z najwyższych wydm na polskim wybrzeżu | [national-geographic.pl](https://www.national-geographic.pl/traveler/kierunki/polska-tez-ma-swoja-pustynie-wydma-lacka-to-kraina-wedrujacego-piasku/) |
| F1085 | Krzywy Las | sosny zasadzono w latach 30. XX w.; prawdopodobnie w 1934 r. | [gryfino.pl](https://gryfino.pl/chapter_289126.asp?soid=69A23C003E55414E82E352CC8AC22540) |

</details>

Czeka na sprawdzenie (53): F1086, F1087, F1090, F1091, F1092, F1094, F1096, F1098, F1100, F1103, F1107, F1108, F1110, F1112, F1114, F1117, F1118, F1119, F1122, F1123, F1125, F1126, F1128, F1132, F1133, F1134, F1135, F1136, F1137, F1141, F1145, F1148, F1149, F1150, F1151, F1152, F1157, F1159, F1160, F1161, F1162, F1163, F1164, F1165, F1167, F1168, F1169, F1172, F1173, F1179, F1181, F1182, F1183.

### Architektura drewniana

Sprawdzone 17 z 46; ✅ potwierdzona: 13; ✏️ do poprawki: 2; ❔ niepotwierdzona: 2.

| ID | Karta | Wynik | Było | Co się nie zgadza | Proponowane brzmienie | Źródła |
| --- | --- | --- | --- | --- | --- | --- |
| F1195 | Kościół św. Filipa i św. Jakuba w Sękowej | ❔ niepotwierdzona | Zbudowano go ok. 1520 r. (najpóźniej w 1522 r.). Jest na Liście UNESCO. | ✅ zbudowano go ok. 1520 r.<br>❔ najpóźniej w 1522 r.<br>✅ jest na Liście UNESCO (od 2003 r.)<br>Ok. 1520 r. podaje VisitMałopolska, ale datę 1522 źródła (zabytek.pl, VisitMałopolska) wiążą tylko z kamienną chrzcielnicą, a nie z końcem budowy. | Zbudowano go ok. 1520 r. Jest na Liście UNESCO. | [visitmalopolska.pl](https://visitmalopolska.pl/en_GB/obiekt/-/poi/kosciol-sw-sw-filipa-i-jakuba-apostolow-w-sekowej), [whc.unesco.org](https://whc.unesco.org/en/list/1053/) |
| F1203 | Cerkiew św. Paraskewii w Kwiatoniu | ✏️ do poprawki | Cerkiew zbudowano w drugiej połowie XVII w., a jako datę budowy często podaje się 1700 r. Wieżę dostawiono w 1743 r. | ✅ cerkiew zbudowano w drugiej połowie XVII w.<br>✅ jako datę budowy często podaje się 1700 r.<br>❌ wieżę dostawiono w 1743 r.<br>National Geographic Polska podaje, że datę 1743 odkryto na belce wieży i badacze łączą ją z remontem, a VisitMałopolska mówi tylko, że wieża jest o kilkadziesiąt lat młodsza od nawy; dostawienie wieży w 1743 r. podaje jedynie Wikipedia. | Cerkiew zbudowano w drugiej połowie XVII w., a jako datę budowy często podaje się 1700 r. Na jednej z belek wieży odkryto datę 1743, którą badacze wiążą raczej z remontem świątyni. | [visitmalopolska.pl](https://visitmalopolska.pl/obiekt/-/poi/cerkiew-pw-sw-paraskewii-w-kwiatoniu), [national-geographic.pl](https://www.national-geographic.pl/traveler/kierunki/to-arcydzielo-architektury-z-malopolski-zostalo-cudem-polski-2025-nie-wszyscy-znaja-te-cerkiew/) |
| F1205 | Cerkiew św. Jakuba w Powroźniku | ❔ niepotwierdzona | Cerkiew istniała od 1600 r. Ze starego budynku zostało tylko tyle, ile wchodzi dziś w skład zakrystii. Na wieży wisi dzwon z 1615 r. | ✅ cerkiew istniała od 1600 r.<br>❔ na wieży wisi dzwon z 1615 r.<br>Regionalny portal visitmalopolska.pl potwierdza rok 1600 i zachowanie najstarszej części jako zakrystii, ale dzwonu z 1615 r. nie wymienia żadne dostępne niezależne źródło. | Cerkiew istniała od 1600 r. Ze starego budynku zostało tylko tyle, ile wchodzi dziś w skład zakrystii. | [visitmalopolska.pl](https://visitmalopolska.pl/obiekt/-/poi/cerkiew-pw-sw-jakuba-w-powrozniku) |
| F1206 | Cerkiew św. Jakuba w Powroźniku | ✏️ do poprawki | Od 2013 r. jest w UNESCO. W 1813 r. z powodu powodzi cerkiew przeniesiono w nowe miejsce i zachowano przy tym jej pierwotną konstrukcję. | ✅ od 2013 r. jest w UNESCO<br>❌ w 1813 r. z powodu powodzi cerkiew przeniesiono w nowe miejsce<br>Portal visitmalopolska.pl mówi o przeniesieniu cerkwi po powodzi z lat 1813–1814, a opracowanie na digitalunesco.pl datuje przeniesienie na ok. 1813–1814, więc sam rok 1813 jest zbyt pewny; wpis do UNESCO w 2013 r. potwierdza „Gość Niedzielny”. | Od 2013 r. jest w UNESCO. Po powodzi w latach 1813–1814 cerkiew przeniesiono w nowe miejsce i zachowano przy tym jej pierwotną konstrukcję. | [tarnow.gosc.pl](https://tarnow.gosc.pl/doc/7290884.Powroznik-70-lat-parafii), [visitmalopolska.pl](https://visitmalopolska.pl/obiekt/-/poi/cerkiew-pw-sw-jakuba-w-powrozniku) |

<details>
<summary>Potwierdzone (13)</summary>

| ID | Karta | Potwierdzone liczby i daty | Źródła |
| --- | --- | --- | --- |
| F1187 | Kościół Pokoju w Świdnicy | od 2001 r. na Liście UNESCO, razem z kościołem w Jaworze | [whc.unesco.org](https://whc.unesco.org/en/list/1054) |
| F1188 | Kościół Pokoju w Jaworze | zbudowano w latach 1654–1655 według projektu Albrechta von Säbischa | [zabytek.pl](https://zabytek.pl/en/obiekty/jawor-jawor-kosciol-ewangelicko-augsburski-pw-ducha-swietego) |
| F1191 | Kościół św. Michała Archanioła w Dębnie Podhalańskim | wieżę wzniesiono w 1601 r.; wieża ma ok. 15 m | [nid.pl](https://nid.pl/en/miejsca/drewniane-koscioly/debno/), [3d.drewniana.malopolska.pl](https://3d.drewniana.malopolska.pl/en/portfolio-item/church-of-st-michael-the-archangel-debno-podhalanskie-unesco-list/) |
| F1192 | Kościół św. Michała Archanioła w Dębnie Podhalańskim | plebiscyt „Rzeczpospolitej” w 2007 r.; 27 obiektów nominowanych przez kapitułę (w tym kościół w Dębnie) | [money.pl](https://www.money.pl/archiwum/wiadomosci_agencyjne/iar/artykul/rzeczpospolita;siedem;cudow;polski,176,0,266928.html), [swietokrzyskie.pro](https://www.swietokrzyskie.pro/siedem-cudow-polski/) |
| F1193 | Kościół św. Michała Archanioła w Binarowej | kościół parafialny wzmiankowano w 1415 r.; obecna świątynia powstała ok. 1500 r. | [visitmalopolska.pl](https://visitmalopolska.pl/obiekt/-/poi/binarowa-kosciol-sw-michala-archaniola), [nid.pl](https://nid.pl/wp-content/uploads/2026/02/MAL-rej_12.02.2026.pdf) |
| F1194 | Kościół św. Michała Archanioła w Binarowej | w 2003 r. wpisany na Listę UNESCO z innymi drewnianymi kościołami południowej Małopolski | [whc.unesco.org](https://whc.unesco.org/en/list/1053/) |
| F1196 | Kościół św. Filipa i św. Jakuba w Sękowej | kościół mocno ucierpiał w walkach pod Gorlicami (1914/1915); drewno z kościoła posłużyło do budowy okopów | [zabytek.pl](https://zabytek.pl/pl/obiekty/sekowa-kosciol-pw-sw-filipa-i-sw-jakuba), [visitmalopolska.pl](https://visitmalopolska.pl/obiekt/-/poi/kosciol-sw-sw-filipa-i-jakuba-apostolow-w-sekowej) |
| F1197 | Kościół św. Leonarda w Lipnicy Murowanej | według miejscowej tradycji kościół pochodzi z 1143 lub 1203 r. | [visitmalopolska.pl](https://visitmalopolska.pl/-/najpiekniejsze-koscioly-malopolski) |
| F1198 | Kościół św. Leonarda w Lipnicy Murowanej | malowidła w prezbiterium z 1689 r.; malowidła w nawie z 1711 r.; od 2003 r. w UNESCO | [nid.pl](https://nid.pl/en/wystawa-skarby-plansza-en-11/), [whc.unesco.org](https://whc.unesco.org/en/list/1053/) |
| F1200 | Kościół Wniebowzięcia NMP i św. Michała Archanioła w Haczowie | monumentalną polichromię wykonano w 1494 r.; od 2003 r. kościół jest na Liście UNESCO | [zabytek.pl](https://zabytek.pl/en/obiekty/haczow-kosciol-parafialny-pw-wniebowziecia-nmp-i-sw-michala-ar), [whc.unesco.org](https://whc.unesco.org/document/217699) |
| F1201 | Kościół Wszystkich Świętych w Bliznem | najwcześniejsza pewna wzmianka o kościele pochodzi z 1470 r. | [zabytek.pl](https://zabytek.pl/en/obiekty/blizne-kosciol-parafialny-pw-wszystkich-swietych) |
| F1202 | Kościół Wszystkich Świętych w Bliznem | w 1549 r. ściany ozdobiono polichromią; od 2003 r. kościół jest na Liście UNESCO | [medievalheritage.eu](https://medievalheritage.eu/en/main-page/heritage/poland/blizne-all-saints-church/), [whc.unesco.org](https://whc.unesco.org/en/list/1053/documents) |
| F1204 | Cerkiew św. Paraskewii w Kwiatoniu | od 2013 r. na Liście UNESCO w grupie drewnianych cerkwi polskiego i ukraińskiego regionu Karpat | [3d.drewniana.malopolska.pl](https://3d.drewniana.malopolska.pl/en/portfolio-item/st-paraskeva-greek-catholic-church-kwiaton-unesco-list/) |

</details>

Czeka na sprawdzenie (29): F1190, F1208, F1209, F1210, F1211, F1212, F1213, F1214, F1216, F1217, F1218, F1219, F1221, F1222, F1225, F1226, F1227, F1228, F1229, F1230, F1234, F1235, F1236, F1237, F1239, F1241, F1242, F1243, F1244.

### Podziemia

Sprawdzone 8 z 43; ✅ potwierdzona: 8.

<details>
<summary>Potwierdzone (8)</summary>

| ID | Karta | Potwierdzone liczby i daty | Źródła |
| --- | --- | --- | --- |
| F1247 | Kopalnia Soli „Wieliczka” | sól pochodzi z miocenu; od XIII w. do 1772 r. Wieliczka z Bochnią tworzyła żupy krakowskie | [muzeum.wieliczka.pl](https://muzeum.wieliczka.pl/jak-powstala-sol-w-wieliczce), [muzeum.wieliczka.pl](https://muzeum.wieliczka.pl/historia-kopalni-soli) |
| F1248 | Kopalnia Soli „Wieliczka” | w latach 2005–2011 kopalnię odwiedzało ok. miliona turystów rocznie | [krakow.stat.gov.pl](https://krakow.stat.gov.pl/cps/rde/xbcr/krak/ASSETS_2008_turystyka_kopalnia_soli_Wieliczka_pl.pdf) |
| F1249 | Kopalnia Soli Bochnia | sól wydobywano tu od XIII w. | [whc.unesco.org](https://whc.unesco.org/en/list/32) |
| F1250 | Kopalnia Soli Bochnia | do 1772 r. obie kopalnie były częścią żup krakowskich | [visitmalopolska.pl](https://visitmalopolska.pl/en/obiekt/-/poi/kopalnia-soli-w-boch-1) |
| F1251 | Krzemionki Opatowskie | kopalnie działały w latach ok. 3900–1600 p.n.e. | [whc.unesco.org](https://whc.unesco.org/en/decisions/7390/) |
| F1252 | Krzemionki Opatowskie | od 2019 r. na Liście światowego dziedzictwa UNESCO | [whc.unesco.org](https://whc.unesco.org/en/decisions/7390/) |
| F1253 | Zabytkowa Kopalnia Srebra | w 2017 r. kopalnię wraz z systemem gospodarowania wodami podziemnymi wpisano na Listę UNESCO | [whc.unesco.org](https://whc.unesco.org/en/list/1539/) |
| F1254 | Zabytkowa Kopalnia Srebra | trasę udostępniono w 1976 r.; labirynt wyrobisk i sztolni ma ponad 150 km | [kopalniasrebra.pl](https://kopalniasrebra.pl/historia-kopalnia-srebra/), [whc.unesco.org](https://whc.unesco.org/en/list/1539/) |

</details>

Czeka na sprawdzenie (35): F1255, F1256, F1257, F1258, F1259, F1260, F1261, F1263, F1265, F1266, F1269, F1270, F1274, F1275, F1276, F1277, F1278, F1280, F1281, F1284, F1286, F1287, F1289, F1291, F1292, F1293, F1295, F1296, F1297, F1300, F1301, F1303, F1304, F1305, F1306.

### Cuda inżynierii

Sprawdzone 16 z 55; ✅ potwierdzona: 11; ✏️ do poprawki: 2; ❔ niepotwierdzona: 3.

| ID | Karta | Wynik | Było | Co się nie zgadza | Proponowane brzmienie | Źródła |
| --- | --- | --- | --- | --- | --- | --- |
| F1309 | Kanał Elbląski | ❔ niepotwierdzona | Pochylnie napędza woda spadająca z wyższego poziomu na koło wodne. Łączna różnica poziomów na śluzach i pochylniach to 103,4 m. | ❔ łączna różnica poziomów na śluzach i pochylniach to 103,4 m<br>Wartości 103,4 m nie podaje żadne niezależne źródło; Wody Polskie i NID mówią tylko o ok. 99,5–100 m różnicy poziomów pokonywanej przez pochylnie, bez sumy ze śluzami. | Pochylnie napędza woda spadająca z wyższego poziomu na koło wodne. | — |
| F1312 | Tężnie solankowe w Ciechocinku | ✏️ do poprawki | Solanka spływa po tarninie wypełniającej drewnianą konstrukcję, a każda tężnia ma ok. 16 m (15,8 m) wysokości. Tężnie I i II zbudowano w latach 1824–1828. | ✅ każda tężnia ma ok. 16 m (15,8 m) wysokości<br>❌ tężnie I i II zbudowano w latach 1824–1828<br>NID (opis Pomnika Historii na zabytek.pl) podaje dla tężni I i II lata 1824–1833, karta tężni I – 1827–1828, a artykuł w „Geoheritage” (Springer) – 1824–1828; wysokość ok. 15,8 m jest potwierdzona. | Solanka spływa po tarninie wypełniającej drewnianą konstrukcję, a każda tężnia ma ok. 16 m (15,8 m) wysokości. Tężnie I i II zbudowano w latach 1824–1833. | [link.springer.com](https://link.springer.com/article/10.1007/s12371-023-00871-4), [zabytek.pl](https://zabytek.pl/en/obiekty/ciechocinek-ciechocinek-zespol-tezni-i-warzelni-soli-wraz-z-pa) |
| F1314 | Radiostacja Gliwicka | ❔ niepotwierdzona | Wieżę zmontowano w 1935 r. w 5 miesięcy. Wykonała ją firma Christoph & Unmack z Niesky. | ✅ wieżę zmontowano w 1935 r.<br>❔ montaż trwał 5 miesięcy<br>Rok 1935 potwierdza Muzeum w Gliwicach (wiecha 9 października 1935 r.), ale czasu montażu „5 miesięcy” nie podaje żadne niezależne źródło, a strony nieinstytucjonalne podają różne okresy budowy. | Wieżę zmontowano w 1935 r. Wykonała ją firma Christoph & Unmack z Niesky. | [muzeum.gliwice.pl](https://muzeum.gliwice.pl/pl/wydarzenia/90-lat-radiostacji-gliwice) |
| F1322 | Zapora Pilchowice | ✏️ do poprawki | Zbudowano ją w latach 1902–1912 na Bobrze jako ochronę przed powodziami, po wielkiej powodzi z 1897 r. | ❌ zbudowano ją w latach 1902–1912<br>✅ po wielkiej powodzi z 1897 r.<br>Początek budowy jest sporny: Tauron (właściciel) podaje 1904–1912, artykuł w BazTech (2023) – start w 1903 r., inne źródła – 1906 r., a rok 1902 podają głównie Wikipedia i portale; ukończenie w 1912 r. i powódź z 1897 r. się zgadzają. | Zbudowano ją na Bobrze na początku XX w. (ukończono w 1912 r.) jako ochronę przed powodziami, po wielkiej powodzi z 1897 r. | [ekoenergia.tauron.pl](https://ekoenergia.tauron.pl/elektrownie/energia-wodna/ew-jelenia-gora/pilchowice-1), [yadda.icm.edu.pl](https://yadda.icm.edu.pl/baztech/element/bwmeta1.element.baztech-202ea332-26b3-41b9-959c-8435b6a68913) |
| F1325 | Elektrownia Żarnowiec | ❔ niepotwierdzona | To największa elektrownia szczytowo-pompowa w Polsce. Decyzję o jej budowie podjęto w 1973 r., budowę rozpoczęto w 1976 r., a elektrownię uruchomiono w 1983 r. | ✅ największa elektrownia szczytowo-pompowa w Polsce<br>❔ decyzję o budowie podjęto w 1973 r.<br>✅ budowę rozpoczęto w 1976 r.<br>✅ elektrownię uruchomiono w 1983 r.<br>Urząd Wojewódzki w Gdańsku potwierdza start budowy w 1976 r. i uruchomienie 7 lat później, ale decyzji z 1973 r. nie podaje żadne niezależne źródło (kalendarium SEP przy PW podaje 1973 jako początek budowy). | To największa elektrownia szczytowo-pompowa w Polsce. Budowę rozpoczęto w 1976 r., a elektrownię uruchomiono w 1983 r. | [gazetaprawna.pl](https://www.gazetaprawna.pl/biznes/energetyka/artykuly/10922961,elektrownie-szczytowopomowe-odrzucono-ustawe-senat.html), [gdansk.uw.gov.pl](https://www.gdansk.uw.gov.pl/850-30-lat-elektrowni-w-zarnowcu) |

<details>
<summary>Potwierdzone (11)</summary>

| ID | Karta | Potwierdzone liczby i daty | Źródła |
| --- | --- | --- | --- |
| F1308 | Kanał Elbląski | na odcinku Ostróda–Elbląg jest 5 pochylni: Buczyniec, Kąty, Oleśnica, Jelenie i Całuny | [gov.pl](https://www.gov.pl/web/wody-polskie-gdansk/pochylnie) |
| F1313 | Radiostacja Gliwicka | drewniana wieża ma 111 m; najwyższa drewniana konstrukcja w Europie; najwyższa drewniana wieża nadawcza na świecie | [muzeum.gliwice.pl](https://muzeum.gliwice.pl/pl/zwiedzaj/radiostacja-gliwice), [muzeum.gliwice.pl](https://muzeum.gliwice.pl/pl/wydarzenia/konserwacja-wiezy-radiostacji-gliwice) |
| F1315 | Radiostacja Gliwicka | 31 sierpnia 1939 r. Niemcy przeprowadzili tu tzw. prowokację gliwicką | [muzeum.gliwice.pl](https://muzeum.gliwice.pl/pl/wydarzenia/86-rocznica-prowokacji-gliwickiej-i-zabojstwa-franza-honioka-31-sierpnia-1939) |
| F1316 | Hala Stulecia | halę wzniesiono w latach 1911–1913 według projektu Maxa Berga | [whc.unesco.org](https://whc.unesco.org/en/list/1165/) |
| F1317 | Hala Stulecia | od 2006 r. jest obiektem UNESCO | [whc.unesco.org](https://whc.unesco.org/en/list/1165/) |
| F1320 | Zapora Solina | budowę zaczęto w 1960 r.; zaporę oddano do eksploatacji 20 lipca 1968 r. | [national-geographic.pl](https://www.national-geographic.pl/traveler/kierunki/zapora-w-solinie-ciekawostki/) |
| F1326 | Elektrownia Żarnowiec | cztery turbiny (hydrozespoły odwracalne); łączna moc 716 MW; do 800 MW przy pompowaniu; poziom wody w górnym zbiorniku waha się do 16 m | [sep.krakow.pl](https://sep.krakow.pl/uploads/editor/13-Solski-A-Wielkie-kaszubskie-jezioro-przewodnik-techniczny-66ab7428367cb.pdf) |
| F1327 | Mosty Tczewskie | most zbudowano w latach 1851–1857 jako most drogowo-kolejowy; pierwszy w kontynentalnej Europie most kratownicowy o dużej rozpiętości przęseł | [ochronazabytkow.nid.pl](https://ochronazabytkow.nid.pl/wp-content/uploads/2023/01/OZ_1-2022_W-Affelt.pdf), [asce.org](https://www.asce.org/about-civil-engineering/history-and-heritage/historic-landmarks/old-wisla-bridge) |
| F1328 | Mosty Tczewskie | most kolejowy z 1891 r.; most kolejowy liczy ponad kilometr długości | [skarbnica.tczew.pl](https://skarbnica.tczew.pl/6974/tczew-wisla-most-drogowy-most-kolejowy-panorama-miasta/) |
| F1329 | Mosty Tczewskie | 1 września 1939 r. most kolejowy wysadzili polscy saperzy; most odbudowano na stałe w 1958 r. | [skarbnica.tczew.pl](https://skarbnica.tczew.pl/26380/tczew-mosty-tczewskie-1-wrzesnia-1939-roku-niem-die-dirschauer-weichselbrucke-im-augenblick-der-sprengung-durch-die-polen/), [skarbnica.tczew.pl](https://skarbnica.tczew.pl/6974/tczew-wisla-most-drogowy-most-kolejowy-panorama-miasta/) |
| F1331 | Most Rędziński | przeprawa (most główny) ma 612 m; z estakadami ma 1742 m; jest częścią autostrady A8 | [gazetawroclawska.pl](https://gazetawroclawska.pl/najdluzsze-mosty-wroclawia-top-10/ga/10661844/zd/20234726), [archiwum.gddkia.gov.pl](https://www.archiwum.gddkia.gov.pl/pl/a/9754/autostradowa-obwodnica-wroclawia-otwarta-do-ruchu), [auto-swiat.pl](https://www.auto-swiat.pl/wiadomosci/aktualnosci/najkrotsza-autostrada-w-polsce-ma-rekordowy-most-uwaga-bedzie-odcinkowy-pomiar/f8q6h5p) |

</details>

Czeka na sprawdzenie (39): F1332, F1333, F1334, F1335, F1336, F1337, F1338, F1339, F1340, F1341, F1343, F1346, F1347, F1348, F1349, F1350, F1351, F1352, F1353, F1354, F1355, F1357, F1358, F1359, F1360, F1361, F1362, F1363, F1364, F1365, F1366, F1367, F1368, F1370, F1371, F1372, F1374, F1375, F1377.

### Twierdze i ruiny

Sprawdzone 14 z 54; ✅ potwierdzona: 7; ✏️ do poprawki: 3; ❔ niepotwierdzona: 4.

| ID | Karta | Wynik | Było | Co się nie zgadza | Proponowane brzmienie | Źródła |
| --- | --- | --- | --- | --- | --- | --- |
| F1387 | Zamek Książ | ❔ niepotwierdzona | To trzeci co do wielkości zamek w Polsce, po Malborku i Wawelu, o powierzchni ok. 42 840 m². | ✅ trzeci co do wielkości zamek w Polsce, po Malborku i Wawelu<br>❔ powierzchnia ok. 42 840 m²<br>Rangę potwierdzają National Geographic i zarządca zamku; liczbę 42 840 m² podaje tylko agregator, a inne strony mówią o ok. 11 tys. m² kondygnacji lub 16 822 m² powierzchni użytkowej zespołu. | To trzeci co do wielkości zamek w Polsce, po Malborku i Wawelu. | [national-geographic.pl](https://www.national-geographic.pl/traveler/kierunki/zamek-ksiaz-w-walbrzychu-zwiedzanie-bilety-i-dojazd-historia-obiektu/) |
| F1388 | Zamek Książ | ✏️ do poprawki | W latach 1943–1945 pod zamkiem drążono tunele w ramach projektu Riese, przy pracy więźniów i jeńców. | ✅ projekt Riese realizowano w latach 1943–1945<br>❌ tunele pod samym zamkiem drążono od 1943 r.<br>Muzeum Gross-Rosen datuje Riese na 1943–1945, ale prace pod samym zamkiem wiarygodne źródła wiążą z 1944 r. (przejęcie przez Organizację Todt, podobóz AL Fürstenstein od maja 1944), więc rok 1943 lepiej przypisać projektowi. | W ramach projektu Riese (1943–1945) pod zamkiem drążono tunele, przy pracy więźniów i jeńców. | [gross-rosen.eu](https://www.gross-rosen.eu/historia-kl-gross-rosen/historia-al-riese/), [cnn.com](https://www.cnn.com/travel/ksiaz-castle-poland-nazi-tunnels-gold-train) |
| F1390 | Zamek Ogrodzieniec | ✏️ do poprawki | W latach 1530–1545 Seweryn Boner przebudował gotycką warownię na renesansowy zamek. | ❌ przebudowa przez Seweryna Bonera w latach 1530–1545<br>zabytek.pl (NID) podaje lata 1533–1547, a strona zamku i portale turystyczne 1530–1545; zgodnie z zasadą przyjęto datację NID. | W latach 1533–1547 Seweryn Boner przebudował gotycką warownię na renesansowy zamek. | [zabytek.pl](https://zabytek.pl/en/obiekty/podzamcze-zamek-ogrodzieniec) |
| F1392 | Pałac w Mosznej | ❔ niepotwierdzona | Kręcono tu m.in. „Test pilota Pirxa” (1978). Utożsamienie odkrytych w ogrodzie piwnic z zamkiem templariuszy uznaje się za raczej bezzasadne, a o pałacu przed 1845 r. brak informacji. | ✅ „Test pilota Pirxa” (1978)<br>❔ o pałacu przed 1845 r. brak informacji<br>Rok 1978 filmu podają bazy filmowe (AllMovie, plakaty Filmoteki Narodowej), ale żadne niezależne źródło nie mówi o braku informacji o pałacu sprzed 1845 r. (część stron pisze o barokowym pałacu z połowy XVIII w. i o zakupie majątku w 1771 r.). | Kręcono tu m.in. „Test pilota Pirxa” (1978). Utożsamienie odkrytych w ogrodzie piwnic z zamkiem templariuszy uznaje się za raczej bezzasadne. | [allmovie.com](https://www.allmovie.com/movie/test-pilota-pirxa-v113000/related) |
| F1393 | Zamek w Łańcucie | ❔ niepotwierdzona | W latach 1629–1641 zamek rozbudował Stanisław Lubomirski według projektu Macieja Trapoli. Bastiony obroniły go przed Szwedami (1655) i Siedmiogrodzianami (1657). | ✅ w latach 1629–1641 zamek rozbudował Stanisław Lubomirski<br>❔ bastiony obroniły zamek przed Szwedami w 1655 r.<br>❔ bastiony obroniły zamek przed Siedmiogrodzianami w 1657 r.<br>Lata 1629–1641 podaje Muzeum-Zamek w Łańcucie, ale obronę w 1655 i 1657 r. opisują tylko Wikipedia i strony turystyczne, a muzeum pisze jedynie, że wiosną 1657 r. wojska Rakoczego spaliły miasto i dawny drewniany zamek. | W latach 1629–1641 zamek rozbudował Stanisław Lubomirski według projektu Macieja Trapoli. | [zamek-lancut.pl](https://www.zamek-lancut.pl/?view=article&id=398%3Aile-bylo-zamkow-w-lancucie-2&catid=2%3Auncategorised) |
| F1394 | Zamek w Łańcucie | ❔ niepotwierdzona | Muzeum udostępniono zwiedzającym już we wrześniu 1944 r. | ✅ muzeum utworzono w 1944 r.<br>❔ muzeum udostępniono zwiedzającym we wrześniu 1944 r.<br>Folder Muzeum-Zamku podaje, że w 1944 r. zamek przekształcono w muzeum państwowe, ale miesiąca udostępnienia zwiedzającym (wrzesień) nie podaje żadne znalezione źródło, a jeden tekst PAP mówi nawet o 1945 r. | Muzeum utworzono w zamku już w 1944 r. | [old.zamek-lancut.pl](https://old.zamek-lancut.pl/digitalizacja/opisy/folderorka.pdf) |
| F1395 | Zamek w Krasiczynie | ✏️ do poprawki | Zamek zbudowano ok. 1580–1590 na planie czworoboku, z czterema basztami. Później dodano ażurowe attyki. | ❌ zamek zbudowano ok. 1580–1590<br>✅ plan czworoboku z czterema basztami<br>NID (zabytek.pl) opisuje czworoboczny zamek z czterema okrągłymi basztami, przebudowany z inicjatywy Stanisława Krasickiego ok. 1580 r., i kolejną, manierystyczną przebudowę Marcina Krasickiego w latach 1596–1633; zakresu 1580–1590 nie podaje żadne niezależne źródło. Redakcja: bez daty, bo NID łączy rok ok. 1580 z przebudową, a nie z budową od podstaw. | Zamek zbudowano na planie czworoboku, z czterema basztami. Później dodano ażurowe attyki. | [zabytek.pl](https://zabytek.pl/en/obiekty/krasiczyn-zespol-zamkowy) |

<details>
<summary>Potwierdzone (7)</summary>

| ID | Karta | Potwierdzone liczby i daty | Źródła |
| --- | --- | --- | --- |
| F1378 | Zamość | Stare Miasto w Zamościu na Liście UNESCO od 1992 r. | [unesco.pl](https://www.unesco.pl/kultura/dziedzictwo-kulturowe/swiatowe-dziedzictwo/lista-swiatowego-dziedzictwa/europa-i-ameryka-polnocna/polska/) |
| F1379 | Zamość | Zamość lokowano w 1580 r. | [zamosc.ap.gov.pl](https://zamosc.ap.gov.pl/2026/04/10/akt-lokacyjny-zamoscia-z-10-kwietnia-1580-r-dokument-od-ktorego-zaczyna-sie-nasza-historia/) |
| F1380 | Zamek Krzyżtopór | rezydencję zbudowano w latach 1621–1644 | [krzyztopor.org.pl](https://www.krzyztopor.org.pl/strona-3404-historia.html) |
| F1383 | Zamek w Malborku | zamek budowano etapami od ok. 1280 r.; od 1309 r. siedziba wielkich mistrzów; siedziba wielkich mistrzów do 1457 r.; od 1997 r. na Liście UNESCO | [zamek.malbork.pl](https://zamek.malbork.pl/wizyta/historia-zamku/lata-1280-1457/), [zamek.malbork.pl](https://zamek.malbork.pl/wizyta/historia-zamku/lata-1457-1772/), [zamek.malbork.pl](https://zamek.malbork.pl/aktualnosci/25-lecie-obecnosci-zamku-w-malborku-na-liscie-swiatowego-dziedzictwa-unesco/) |
| F1384 | Zamek w Malborku | Wielki Refektarz zbudowany w drugiej ćwierci XIV w.; wymiary ok. 30 × 15 m; największe wnętrze w świeckiej architekturze zakonu; sklepienie na trzech granitowych filarach | [cejsh.icm.edu.pl](https://cejsh.icm.edu.pl/cejsh/element/bwmeta1.element.desklight-87d0df43-120c-4a8a-a147-31767c5c35e7/c/Ochrona_Zabytkow-r1994-t47-n2__185_-s123-137.pdf), [zamek.malbork.pl](https://zamek.malbork.pl/wnetrze/wielki-refektarz/) |
| F1385 | Twierdza Srebrna Góra | twierdzę wzniesiono w latach 1765–1777; Przełęcz Srebrna ma 586 m n.p.m. | [forty.pl](https://forty.pl/en/fortress/calendar/), [encyklopedia.pwn.pl](https://encyklopedia.pwn.pl/haslo/Srebrna-Przelecz;3978652.html) |
| F1391 | Pałac w Mosznej | od 1866 r. rezydencja Tiele-Wincklerów; rezydencja rodu do 1945 r. | [visitopolskie.pl](https://www.visitopolskie.pl/en/strona/discover/561-moszna-castle) |

</details>

Czeka na sprawdzenie (40): F1381, F1397, F1398, F1399, F1400, F1403, F1404, F1406, F1407, F1408, F1410, F1412, F1413, F1414, F1415, F1416, F1417, F1418, F1419, F1421, F1422, F1423, F1424, F1425, F1426, F1427, F1428, F1429, F1430, F1431, F1433, F1434, F1435, F1436, F1437, F1438, F1439, F1440, F1441, F1442.

### Memento mori

Sprawdzone 14 z 49; ✅ potwierdzona: 6; ✏️ do poprawki: 6; ❔ niepotwierdzona: 2.

| ID | Karta | Wynik | Było | Co się nie zgadza | Proponowane brzmienie | Źródła |
| --- | --- | --- | --- | --- | --- | --- |
| F1445 | Kaplica Czaszek w Czermnej | ✏️ do poprawki | Kaplicę zbudował w latach 1776–1784 ksiądz Wacław Tomaszek. Zebrał kości ofiar wojen i epidemii z ziemi kłodzkiej, prawdopodobnie z czasów wojny trzydziestoletniej, wojen śląskich i cholery. | ✅ budowę kaplicy rozpoczął ks. Wacław Tomaszek w 1776 r.<br>❌ prace trwały do 1784 r. (lata 1776–1784)<br>Rok 1776 jest zgodny we wszystkich źródłach, ale koniec prac jest sporny: strona kaplicy (kaplicaczaszek.pl) podaje 1776–1784, a strona parafii w Czermnej i National Geographic Polska – prace przy wnętrzu do 1804 r. | Kaplicę zaczął budować w 1776 r. ksiądz Wacław Tomaszek. Zebrał kości ofiar wojen i epidemii z ziemi kłodzkiej, prawdopodobnie z czasów wojny trzydziestoletniej, wojen śląskich i cholery. | [czermna.pl](https://www.czermna.pl/#!/wartoZobaczyc/historia) |
| F1448 | Stare Powązki | ✏️ do poprawki | Cmentarz założono 4 listopada 1790 r. Ma 43 ha i jest w całości objęty ścisłą ochroną konserwatorską. | ✅ cmentarz założono 4 listopada 1790 r.<br>✅ cmentarz ma 43 ha<br>Data 4.11.1790 potwierdzona (PAP/dzieje.pl, um.warszawa.pl); powierzchnię 43 ha podaje PAP i strona miasta z 2019 r., ale inna strona Urzędu m.st. Warszawy podaje 44 ha, stąd bezpieczniej „ok. 43 ha”. | Cmentarz założono 4 listopada 1790 r. Ma ok. 43 ha i jest w całości objęty ścisłą ochroną konserwatorską. | [dzieje.pl](https://dzieje.pl/wiadomosci/235-lat-temu-zalozono-cmentarz-powazkowski-w-warszawie), [um.warszawa.pl](https://um.warszawa.pl/-/stare-powazki-wszystkie-groby-policzone-i-opisane) |
| F1451 | Cmentarz Rakowicki | ✏️ do poprawki | Dziś ma ok. 35 ha (700 × 500 m). Nazwa pochodzi od drogi do dawnej wsi Rakowice. | ❌ cmentarz ma dziś ok. 35 ha<br>❔ wymiary 700 × 500 m<br>Zarząd Cmentarzy Komunalnych w Krakowie podaje ok. 42,18 ha, a serwis miejski krakow.pl ponad 42 ha; wymiarów 700 × 500 m nie podaje żadne niezależne źródło. | Dziś ma ok. 42 ha. Nazwa pochodzi od drogi do dawnej wsi Rakowice. | [zck-krakow.pl](https://www.zck-krakow.pl/13/graveyards/2/cmentarz_rakowicki) |
| F1453 | Cmentarz na Pęksowym Brzyzku | ❔ niepotwierdzona | Po masakrach w Warszawie i Wilnie w 1861 r. rodzina Homolacsów ufundowała tu krzyż i tablicę ku pamięci ofiar. | ❔ w 1861 r., po masakrach w Warszawie i Wilnie, rodzina Homolacsów ufundowała krzyż i tablicę<br>Krzyż i tablicę Homolacsów z 1861 r. opisuje tylko Wikipedia i serwisy ją powielające (ezakopane.pl, malezakopane.pl); zabytek.pl, VisitMałopolska, PAP i serwisy miejskie Zakopanego o tym nie wspominają. | — (pominąć) | — |
| F1456 | Nowy Cmentarz Żydowski w Łodzi | ✏️ do poprawki | Cmentarz otwarto 10 listopada 1892 r. Ma 42 ha i jest jedną z największych nekropolii żydowskich w Europie oraz największą w Polsce. | ✅ cmentarz otwarto 10 listopada 1892 r.<br>❌ cmentarz ma 42 ha<br>✅ jedna z największych nekropolii żydowskich w Europie i największa w Polsce<br>Data otwarcia zgodna (lodz.pl, Sztetl/POLIN), ale powierzchnia różni się: Sztetl (POLIN) podaje 40,5 ha, miejski portal lodz.pl ok. 40 ha, a strony Urzędu Miasta Łodzi 42 ha. | Cmentarz otwarto 10 listopada 1892 r. Ma ok. 40–42 ha i jest jedną z największych nekropolii żydowskich w Europie oraz największą w Polsce. | [lodz.pl](https://lodz.pl/artykul/najwieksza-nekropolia-zydowska-w-polsce-cmentarz-przy-brackiej-w-lodzi-ma-134-lata-70025/), [sztetl.org.pl](https://sztetl.org.pl/pl/miejscowosci/l/497-lodz/114-cmentarze/193927-cmentarz-zydowski-w-lodzi-ul-bracka-40), [lodz.pl](https://lodz.pl/artykul/cmentarz-zydowski-w-lodzi-najwiekszy-w-polsce-i-jeden-z-najwiekszych-w-europie-64671/) |
| F1457 | Nowy Cmentarz Żydowski w Łodzi | ✏️ do poprawki | Zachowało się ok. 160 tys. macew. Spoczywa tu też ok. 45 tys. zmarłych i zamordowanych w getcie Litzmannstadt. | ✅ zachowało się ok. 160 tys. macew<br>❌ spoczywa tu ok. 45 tys. zmarłych i zamordowanych w getcie Litzmannstadt<br>Ok. 160 tys. nagrobków podaje miejski portal lodz.pl (Biuro Architekta Miasta mówi o blisko 180 tys. grobów); liczbę ofiar getta lodz.pl podaje jako ok. 45 tys., a Wirtualny Sztetl (POLIN) jako ok. 43 tys., stąd przedział. | Zachowało się ok. 160 tys. macew. Spoczywa tu też ok. 43–45 tys. zmarłych i zamordowanych w getcie Litzmannstadt. | [lodz.pl](https://lodz.pl/artykul/najwieksza-nekropolia-zydowska-w-polsce-cmentarz-przy-brackiej-w-lodzi-ma-134-lata-70025/), [sztetl.org.pl](https://sztetl.org.pl/pl/miejscowosci/l/497-lodz/116-miejsca-martyrologii/48188-pole-gettowe-na-cmentarzu-zydowskim-ul-bracka) |
| F1460 | Cmentarz Remuh | ✏️ do poprawki | Najstarsze zachowane macewy pochodzą z 1552 r. Władze austriackie zamknęły cmentarz w 1800 r. Ma ok. 0,75 ha. | ✅ najstarsze zachowane macewy pochodzą z 1552 r.<br>❌ władze austriackie zamknęły cmentarz w 1800 r.<br>✅ cmentarz ma ok. 0,75 ha<br>Większość źródeł podaje zamknięcie w 1800 r., ale miejski serwis krakow.pl pisze o 1809 r., a Radio Kraków o 1798 r.; rok 1552 podaje Gmina Wyznaniowa Żydowska, a ok. 0,75 ha Muzeum Krakowa. | Najstarsze zachowane macewy pochodzą z 1552 r. Władze austriackie zamknęły cmentarz na przełomie XVIII i XIX w. Ma ok. 0,75 ha. | [gwzkrakow.pl](https://gwzkrakow.pl/cmentarze/), [krakow.pl](https://www.krakow.pl/instcbi/1284,inst,10976,801,instcbi.html), [opowiedzmimiasto.mhk.pl](https://opowiedzmimiasto.mhk.pl/miejsca/stary-cmentarz-zydowski-remu/) |
| F1464 | Mizar w Bohonikach | ❔ niepotwierdzona | W 1679 r. pod Sokółką osiedliło się 30 rodzin tatarskich (Lipków). | ✅ osadnictwo tatarskie pod Sokółką w 1679 r.<br>❔ osiedliło się 30 rodzin tatarskich<br>Muzułmańska Gmina Wyznaniowa Bohoniki podaje przywilej królewski z 12 marca 1679 r., ale liczbę 30 rodzin powtarzają tylko strony turystyczne i blogi bez źródeł, a jeden tekst o historii wsi podaje ok. 30 rodzin dopiero dla 1717 r. | W 1679 r. pod Sokółką osiedliły się rodziny tatarskie (Lipków). | [bohoniki.eu](https://bohoniki.eu/index.php?Itemid=123&id=3&lang=pl&option=com_content&view=article) |

<details>
<summary>Potwierdzone (6)</summary>

| ID | Karta | Potwierdzone liczby i daty | Źródła |
| --- | --- | --- | --- |
| F1446 | Kaplica Czaszek w Czermnej | ściany i sklepienie pokrywają czaszki i kości ponad 3000 ofiar; w krypcie spoczywa ponad 21 000 kolejnych szczątków; inne źródła podają 20–30 tysięcy szczątków w krypcie | [smithsonianmag.com](https://www.smithsonianmag.com/travel/this-creepily-beautiful-chapel-in-czermna-poland-is-constructed-out-of-thousands-of-human-bones-6613033/), [tvpworld.com](https://tvpworld.com/85741600/echoes-of-the-dead-inside-polands-only-skull-chapel), [polska.travel](https://www.polska.travel/odkryjcie-polske-niezwykla-tajemnicze-miejsca/) |
| F1450 | Cmentarz Rakowicki | cmentarz działa od stycznia 1803 r. (pierwszy pogrzeb); pierwszy ogólny cmentarz miejski Krakowa, w miejsce zlikwidowanych cmentarzy przykościelnych | [zck-krakow.pl](https://www.zck-krakow.pl/13/graveyards/2/cmentarz_rakowicki), [archiwalneopowiesci.ank.gov.pl](https://archiwalneopowiesci.ank.gov.pl/wystawa/cmentarz-rakowicki-mieszkancy-dawnego-krakowa-historie-odnalezione-w-archiwaliach/) |
| F1452 | Cmentarz na Pęksowym Brzyzku | pierwszy cmentarz Zakopanego powstał w połowie XIX w.; najczęściej podaje się rok 1851 | [polska.travel](https://www.polska.travel/nostalgiczne-zwiedzanie-nekropolie-w-polsce/), [dzieje.pl](https://dzieje.pl/dziedzictwo-kulturowe/na-peksowym-brzyzku-w-zakopanem-spoczywaja-artysci-patrioci-i-sportowcy) |
| F1459 | Cmentarz Remuh | cmentarz powstał w XVI w.; źródła podają rok założenia od 1533 r.; źródła podają rok założenia do 1551 r.; najstarszy zachowany nagrobek pochodzi z 1552 r.; najstarszy zachowany cmentarz żydowski w Krakowie; jeden z najstarszych zachowanych cmentarzy żydowskich w Europie | [sztetl.org.pl](https://sztetl.org.pl/pl/miejscowosci/k/512-krakow/114-cmentarze/17208-cmentarz-zydowski-remu-w-krakowie-ul-szeroka-40), [gwzkrakow.pl](https://gwzkrakow.pl/cmentarze/), [muzeumkrakowa.pl](https://muzeumkrakowa.pl/plik-do-pobrania/45) |
| F1461 | Mizar w Kruszynianach | najstarsze nagrobki na mizarze pochodzą z końca XVII w. | [dzieje.pl](https://dzieje.pl/dziedzictwo-kulturowe/odnowiono-xix-wieczne-nagrobki-na-mizarze-w-kruszynianach) |
| F1462 | Mizar w Kruszynianach | Tatarzy osiedlali się tu na mocy nadań Jana III Sobieskiego (1679) | [pcr.uwb.edu.pl](https://pcr.uwb.edu.pl/BKWP/files/BKWP_2013_19_016.pdf) |

</details>

Czeka na sprawdzenie (35): F1447, F1465, F1466, F1467, F1468, F1471, F1472, F1473, F1474, F1475, F1476, F1477, F1478, F1480, F1481, F1482, F1483, F1484, F1485, F1486, F1487, F1488, F1490, F1492, F1494, F1495, F1496, F1497, F1498, F1499, F1500, F1502, F1503, F1505, F1506.
