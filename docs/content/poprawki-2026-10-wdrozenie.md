# Wdrożenie poprawek z `poprawki-2026-10.json` (Karta 2.0)

Stan na 28.10.2026. Zasada redakcyjna Roberta: **to, co niepewne albo niepotwierdzone, nie trafia do atlasu.** Według niej rozstrzygnięte są wszystkie pozycje, które wcześniej czekały na decyzję.

Każda ze 160 pozycji pliku [`poprawki-2026-10.json`](poprawki-2026-10.json) ma jeden status:

- ✅ **wprowadzona** — zmiana jest w danych kolekcji (`data/*.js`), a tekst angielski w `data/i18n.js`, jeśli karta ma tłumaczenie;
- 🗑️ **karta wycofana** — obecności w Polsce albo samej osobliwości nie da się potwierdzić, więc karty nie ma w atlasie;
- 📌 **w ciekawostce** — karta nie zawiera błędu, a brakującą informację podaje zweryfikowana ciekawostka widoczna na karcie;
- ➖ **bez zmian** — pozycja sama zaleca zostawić tekst albo karta nie podaje niepotwierdzonej informacji.

Gdy zmieniała się nazwa polska (albo łacińska), dawna nazwa trafiła do pola `synonyms`: karta pokazuje ją jako „Dawniej w atlasie”, a wyszukiwarka dalej ją znajduje.

**Razem:** ✅ wprowadzona: 124, 🗑️ karta wycofana: 5, 📌 w ciekawostce: 21, ➖ bez zmian: 10.

## Wycofane karty i ciekawostki

Lista jest w `data/collections.js` (`WITHDRAWN`). Pliki `data/facts/*.facts.js` powstają poza repo, dlatego wycofane ciekawostki są odfiltrowywane przy wczytywaniu kolekcji, a nie usuwane z tych plików. Przy następnym generowaniu faktów można je pominąć; `npm run test:facts` pilnuje, żeby lista zgadzała się z danymi.

31.10.2026 wycofane ciekawostki usunięto z plików `data/facts/*.facts.js` (`README-weryfikacja.md`); lista `WITHDRAWN` ma teraz tylko karty.

### Karty

| Karta | Powód |
| --- | --- |
| Ryby: `murowy-swiecik` | Mauryk: brak potwierdzonej obserwacji w Bałtyku (C064). |
| Ryby: `lis-morski` | Kosogon: brak potwierdzonej obserwacji w Bałtyku (C065). |
| Formacje skalne: `zezow-czarne-dzialy` | Zęzów i Czarne Działy: nie wiadomo, o które miejsce chodzi; potwierdzona jest tylko wysokość Zęzowa (C111). |
| Skamieniałości: `tholodus-schmidi` | Tholodus schmidi: brak publikacji o znaleziskach z Polski (C127). |
| Architektura drewniana: `chata-na-wysokosci` | Chata na Wysokości: prywatna kwatera, historia tylko według właścicieli, bez ciekawostek i bez zdjęcia obiektu (C144). |

### Ciekawostki

| ID | Karta | Treść (PL) | Powód |
| --- | --- | --- | --- |
| F0032 | Grzyby: Piestrzenica kasztanowata | Zawartość toksyny bardzo się waha między regionami i siedliskami, a do tego trudno ustalić, po jakim czasie obróbki termicznej gyromitryna traci trujące właściwości. | Czas obróbki termicznej to wskazówka kulinarna. |
| F0037 | Grzyby: Smardz jadalny | W stanie surowym lub niedogotowanym może wywołać zatrucie pokarmowe; toksyny smardzów nie są dobrze poznane, a dokładna obróbka termiczna zmniejsza ryzyko. | „dokładna obróbka termiczna zmniejsza ryzyko” to porada kulinarna. |
| F0073 | Grzyby: Galaretek kolczasty | Ostrzeżenie sanitarne: tego grzyba odradza się jeść na surowo, bo istnieje ryzyko zarażenia jajami bąblowca wielojamowego (tasiemca pasożytującego w ciele lisów). | „odradza się jeść na surowo” sugeruje jedzenie po obróbce. |
| F0143 | Grzyby: Żółciak siarkowy | Surowe lub niedogotowane owocniki mogą wywoływać zatrucia, objawiające się głównie nudnościami, wymiotami i zawrotami głowy. | „surowe lub niedogotowane” sugeruje jadalność po ugotowaniu. |
| F0170 | Grzyby: Opieńka miodowa sensu lato | Surowa lub niedogotowana może być trująca. | „surowa lub niedogotowana” sugeruje jadalność po ugotowaniu. |
| F0985 | Skamieniałości: Pterozaury z Owadowa-Brzezinek | *Ctenochasma* miała w szczękach ok. 250 grzebieniastych zębów do filtrowania wody. | Rodzaj niepotwierdzony w Owadowie-Brzezinkach, fakt nie dotyczy karty (C121). |
| F1073 | Atmosfera i astronomia: Siedlce i rekord mrozu | 11 stycznia 1940 r. w Siedlcach zanotowano −41 °C. To najniższa oficjalna temperatura w Polsce. | „najniższa oficjalna temperatura” przeczy F1070 (oficjalny rekord IMGW: −40,6 °C, Żywiec 1929). |

## Pozycje według kolekcji

### Grzyby (C000–C030, 29)

✅ wprowadzona: 25, 📌 w ciekawostce: 1, ➖ bez zmian: 3

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C000 | Ochrona ścisła | ✅ wprowadzona | Plakietka „Ochrona ścisła” na 13 kartach i uwaga „gatunek pod ochroną ścisłą” (dzbankówka, czareczka, krążkówka, soplówka jeżowata, promieniak, gwiazda wieloporowata, gwiazdosz wzniesiony, 3 kolczakówki, żyłkowiec, krwistoborowik, pniarek). Nazwy z rozporządzenia są w ciekawostkach F0026 i F0119. |
| C001 | Ochrona częściowa | ✅ wprowadzona | Plakietka „Ochrona częściowa” na 9 kartach i uwaga o ochronie; u smardzów z wyjątkiem ogrodów, upraw ogrodniczych, szkółek leśnych i terenów zieleni. |
| C002 | Status ochrony: ozorek, lakownica, soplówka bukowa, szyszkowiec, krążkówka | ✅ wprowadzona | Uwagi ozorka, lakownicy, soplówki bukowej, szyszkowca i krążkówki podają teraz status ochrony zamiast „sprawdzić”. |
| C003 | Nie są chronione | ➖ bez zmian | Karty tych 6 gatunków nie twierdzą, że są chronione; wykreślenie z listy opisują ciekawostki (F0010, F0016, F0052, F0093, F0166). |
| C004 | Chlorówka drobna | ✅ wprowadzona | Chlorówka drobna: siedlisko to spróchniałe, okorowane drewno (zwłaszcza dąb); region i notka, które opierały się na murawach, przeredagowane (PL i EN). |
| C005 | Berłóweczka zimowa | ✅ wprowadzona | Berłóweczka zimowa: ciepłe murawy na suchych, piaszczystych lub wapiennych glebach; region „rzadka (R)” zamiast „cała Polska” (PL i EN). |
| C006 | Sromotnik fiołkowy | ✅ wprowadzona | Sromotnik fiołkowy: wydmy nadmorskie, w głębi lądu sporadycznie (PL i EN). |
| C007 | Świecznik rozgałęziony | ✅ wprowadzona | Świecznik rozgałęziony: siedlisko nadrzewne (butwiejące pnie osiki, brzozy i innych drzew) (PL i EN). |
| C008 | Płomyczka galaretowata | ✅ wprowadzona | Płomyczka galaretowata: rzadka, góry, zakopane drewno świerka lub jodły, gleby wapienne (PL i EN). |
| C009 | Dzbankówka kulista | ✅ wprowadzona | Dzbankówka kulista: 13 stanowisk z literatury to stanowiska historyczne; mszyste świerczyny nad strumieniami (PL i EN). |
| C010 | Żyłkowiec różowawy | ✅ wprowadzona | Żyłkowiec różowawy: Puszcza Białowieska (6 stanowisk w 2020 r.), martwe drewno głównie wiązów (PL i EN). |
| C011 | Gwiazda wieloporowa | ✅ wprowadzona | Nazwa: Gwiazda wieloporowata (tak w poprawionym tekście pozycji i w haśle Wikipedii; dawniej w atlasie: Gwiazda wieloporowa); bardzo rzadka (5 aktualnych stanowisk) zamiast „rozproszona w całej Polsce” (PL i EN). |
| C012 | Gwiazdosz wzniesiony | ✅ wprowadzona | Gwiazdosz wzniesiony: zarośla bogate w azot zamiast „ciepłe murawy” (PL i EN). |
| C013 | Częstość występowania | ✅ wprowadzona | Mądziak psi (V), wrośniak cynobrowy (R), maczużnik bojowy (R): „rzadki” zamiast „cała Polska”; miękusz rabarbarowy: „dość rzadki” zamiast „częsty” (PL i EN). |
| C015 | „dzieżka pomarańczowa” | ✅ wprowadzona | Nazwa: Dzieżka pomarańczowa (dawniej w atlasie: Kustrzebka pomarańczowa). |
| C016 | „sromotnik smrodliwy” | ✅ wprowadzona | Nazwa: Sromotnik smrodliwy (dawniej: Sromotnik bezwstydny); poprawione też odwołanie w karcie sromotnika fiołkowego. |
| C017 | *Pseudohydnum gelatinosum* („kolczakówka galaretowata”) | ✅ wprowadzona | Nazwa: Galaretek kolczasty (dawniej: Kolczakówka galaretowata). |
| C018 | „płomyczka galaretowata” | ✅ wprowadzona | Nazwa: Płomyczka galaretowata (dawniej: Płomyczek galaretowaty). |
| C019 | „kubecznik pospolity” | ✅ wprowadzona | Nazwa: Kubecznik pospolity (dawniej: Gniazdniczka kulista / kubek gładki). |
| C020 | „pięknoróg największy” | ✅ wprowadzona | Nazwa: Pięknoróg największy (dawniej: Pięknoróg lepki). |
| C021 | „koralówka czerwonowierzchołkowa” | ✅ wprowadzona | Nazwa: Koralówka czerwonowierzchołkowa (dawniej: Koralówka / gałęziak groniasty). |
| C022 | „kolczakówka niebieskawa” | ✅ wprowadzona | Nazwa: Kolczakówka niebieskawa (dawniej: Kolczakówka niebieska). |
| C023 | „lakownica żółtawa” | ✅ wprowadzona | Nazwa: Lakownica żółtawa (dawniej: Lakownica lśniąca). |
| C024 | „świecznik rozgałęziony” | ✅ wprowadzona | Nazwa: Świecznik rozgałęziony (dawniej: Świecznica rozgałęziona). |
| C026 | *Pycnoporus cinnabarinus* | ✅ wprowadzona | Nazwa przyjęta w GBIF: *Trametes cinnabarina*, po polsku „wrośniak cynobrowy” (jak w polskiej Wikipedii); dawne „Gęstoporek cynobrowy” i *Pycnoporus cinnabarinus* zostają w synonimach i w wyszukiwarce. |
| C027 | *Fomitopsis officinalis* | ➖ bez zmian | Pozycja sama stwierdza, że obecna nazwa *Fomitopsis officinalis* nie jest błędem. |
| C028 | Pozostałe nazwy łacińskie (GBIF) | ➖ bez zmian | Informacja: pozostałe nazwy łacińskie są przyjęte w GBIF. |
| C029 | Wilgotnica czerniejąca | ✅ wprowadzona | Wilgotnica czerniejąca: uwaga „lekko trująca” i plakietka „Gatunek lekko trujący” (PL i EN). |
| C030 | Muchomor czerwony | 📌 w ciekawostce | Ciekawostka F0134 (lista nowych substancji psychoaktywnych od 22.05.2025) jest widoczna na karcie muchomora. |

### Kwiaty (C031–C040, 10)

✅ wprowadzona: 9, ➖ bez zmian: 1

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C031 | Dwulistnik pszczeli | ✅ wprowadzona | Dwulistnik pszczeli: uwaga „storczyk krytycznie zagrożony (CR), w Polsce znany z pojedynczych stanowisk” zamiast „storczyk chroniony”; brak plakietki ochrony (nie ma go w rozporządzeniu) (PL i EN). |
| C032 | Obrazki plamiste: region | ✅ wprowadzona | Obrazki plamiste: region „dość rzadkie, Pomorze Zachodnie” (PL i EN). |
| C033 | Obrazki alpejskie | ✅ wprowadzona | Obrazki alpejskie: ochrona częściowa (plakietka) i uwaga z nazwą z rozporządzenia *Arum alpinum* (PL i EN). |
| C034 | „Świetlik mszysty” (*Schistostega pennata*) | ✅ wprowadzona | Nazwa: Świetlanka długoszowata (dawniej: Świetlik mszysty), poprawiona odmiana w opisie; karta nie podaje ochrony. Zaktualizowałem asercję w scripts/validate-collections.mjs. |
| C035 | Bniec biały | ✅ wprowadzona | Nazwa: Lepnica biała (dawniej: Bniec biały). |
| C036 | Kurzyślad polny | ✅ wprowadzona | Nazwa łacińska: *Lysimachia arvensis* (dawniej w atlasie: *Anagallis arvensis*, zostaje w wyszukiwarce). |
| C037 | Kukuczka kapturkowata | ✅ wprowadzona | Nazwa łacińska: *Hemipilia cucullata* (dawniej: *Neottianthe cucullata*); stanowisk nadal nie podajemy. |
| C038 | Rosiczka | ✅ wprowadzona | Rosiczka: uwaga „wszystkie cztery krajowe rosiczki są pod ochroną ścisłą” i plakietka (PL i EN). |
| C039 | Wawrzynek, podkolany, gnidosz, zaraza żółta | ✅ wprowadzona | Wawrzynek, oba podkolany, gnidosz i zaraza: plakietka i uwaga „ochrona częściowa”; karty kopytnika, łuskiewnika i pływacza nie twierdzą, że są chronione (PL i EN). |
| C040 | Kłokoczka | ➖ bez zmian | Karta kłokoczki nie podaje, że nasiona są jadalne; notka o różańcach zostaje. |

### Drzewa (C041–C051, 11)

✅ wprowadzona: 11

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C041 | Lipa w Cielętnikach | ✅ wprowadzona | Lipa w Cielętnikach: *Tilia cordata* zamiast *Tilia sp.*; karta mówi, że lipę powalił orkan Ksawery (5/6.10.2017). |
| C042 | Lipa Pokoju (Głuchołazy) | ✅ wprowadzona | Lipa Pokoju: *Tilia platyphyllos* zamiast *Tilia sp.* |
| C043 | Lipa w Stroniu Śląskim | ✅ wprowadzona | Lipa w Stroniu Śląskim: gatunek opierał się na jednym blogu, więc zostaje tylko pewny rodzaj (*Tilia sp.* zamiast *T. platyphyllos*); dopisana data powodzi (15.09.2024), a kąt quizowy nie zgaduje już, czy pomógł kształt pnia. |
| C044 | Drzewo z kulą armatnią (Czarnca) | ✅ wprowadzona | Drzewo z kulą armatnią: kulę znaleźli jesienią 2025 r. pracownicy zieleni miejskiej, a nie archeolodzy; „zabliźnienie przez stulecia” opisane jako hipoteza. |
| C045 | Sosna Kandelabrowa | ✅ wprowadzona | Sosna Kandelabrowa: obumarła, nie dożywszy stu lat (śmierć opisana w listopadzie 2018 r.). |
| C046 | Jodła Lasumiła | ✅ wprowadzona | Jodła Lasumiła: najgrubsza (519 cm, 35 m), nie najwyższa; lokalizacja: masyw Łopiennika, Nadleśnictwo Baligród. |
| C047 | Dąb Bolko | ✅ wprowadzona | Dąb Bolko: Hniszów, gmina Ruda-Huta (woj. lubelskie). |
| C048 | Dąb Gniewko | ✅ wprowadzona | Dąb Gniewko: Bielino-Wirgnia, gmina Słupno (pow. płocki). |
| C049 | Mamutowiec w Brwicach | ✅ wprowadzona | Mamutowiec w Brwicach: „największy mamutowiec w Polsce” (zgodnie z ciekawostką F0349). |
| C050 | Bożodrzew | ✅ wprowadzona | Bożodrzew: uwaga o unijnej liście inwazyjnych gatunków obcych (zakaz sprzedaży i rozmnażania). |
| C051 | Cis Henrykowski | ✅ wprowadzona | Cis Henrykowski: cis pospolity jako gatunek jest pod ochroną częściową (plakietka + uwaga). |

### Owady (C052–C063, 12)

✅ wprowadzona: 11, ➖ bez zmian: 1

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C052 | „Kozóg dębowy” | ✅ wprowadzona | Nazwa: Kozioróg dębosz (dawniej: Kozóg dębowy); uwaga i plakietka: ochrona ścisła z wymogiem ochrony czynnej (PL i EN). Zaktualizowana asercja w validate-collections. |
| C053 | „Turkuc podjadek” | ✅ wprowadzona | Pisownia: Turkuć podjadek (bez wpisu w „dawniej w atlasie” — to poprawka literówki; wyszukiwarka ignoruje teraz polskie znaki). |
| C054 | „Wojsilka” | ✅ wprowadzona | Pisownia: Wojsiłka pospolita (jak wyżej). |
| C055 | „Żyrytwa pluskwowata” | ✅ wprowadzona | Nazwa: Płoszczyca szara (dawniej: Żyrytwa pluskwowata). Zaktualizowana asercja w validate-collections. |
| C056 | „Mieniak mżawiec” | ✅ wprowadzona | Nazwa: Mieniak tęczowiec (dawniej: Mieniak mżawiec). |
| C057 | „Pucółka” (*Cimbex*) | ✅ wprowadzona | Nazwa: Bryzgun (dawniej: Pucółka) — polska nazwa rodzaju *Cimbex*. |
| C058 | Jelonek rogacz | ✅ wprowadzona | Jelonek rogacz: „jeden z największych chrząszczy w Polsce” zamiast „największy”; uwaga „ochrona częściowa od 2014 r.” (PL i EN). |
| C059 | Biegacz skórzasty | ✅ wprowadzona | Biegacz skórzasty: „drugi co do wielkości biegacz Europy” zamiast „największy polski”; ochrona częściowa (PL i EN). |
| C060 | Zawisak borowiec | ✅ wprowadzona | Gąsienica zawisaka borowca: usunięte niepotwierdzone twierdzenie o świeceniu w UV (hook, kąt quizowy, poziom „leśny neon” → „mistrz kamuflażu”) (PL i EN). Jeśli masz źródło, można je przywrócić. |
| C061 | Paź królowej | ➖ bez zmian | Karta pazia królowej nie sugeruje ochrony; ciekawostka F0422 mówi, że obecnie nie jest chroniony. |
| C062 | Strzyżak sarni w kategorii „Toksyczne i zapachowe” | ✅ wprowadzona | Strzyżak sarni przeniesiony z „Toksyczne i zapachowe” do „Dziwne kształty” (bez tworzenia nowej kategorii). |
| C063 | Bujanka | ✅ wprowadzona | Bujanka: uwaga „niegroźna dla ludzi, nie żądli” zamiast mylącego „nie niszczyć gniazd dzikich pszczół” (PL i EN). |

### Ryby (C064–C073, 10)

✅ wprowadzona: 8, 🗑️ karta wycofana: 2

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C064 | „Murowy świecik” | 🗑️ karta wycofana | Karta „Mauryk” (dawniej „Murowy świecik”) wycofana: nie ma potwierdzonej obserwacji w Bałtyku. |
| C065 | „Lis morski” | 🗑️ karta wycofana | Karta „Kosogon” (dawniej „Lis morski”) wycofana: nie ma potwierdzonej obserwacji w Bałtyku. |
| C066 | „Lamna” | ✅ wprowadzona | Nazwa: Lamna śledziowa (dawniej: Lamna). |
| C067 | „Zębacz smugowy” | ✅ wprowadzona | Nazwy: Zębacz pasiasty (dawniej: Zębacz smugowy) i Babka śniadogłowa (dawniej: Babka bycza). |
| C068 | Brak informacji o ochronie | ✅ wprowadzona | Dennik, wężynka, iglicznia: plakietka i uwaga „ochrona częściowa” (PL i EN). |
| C069 | Koza, piskorz, różanka | ✅ wprowadzona | Koza, piskorz, różanka: „ochrona częściowa” zamiast „gatunek chroniony” (plakietka + uwaga, PL i EN). Nazwy „Koza” nie zmieniałem (pozycja nie mówi, że to błąd). |
| C070 | Lipień | ✅ wprowadzona | Lipień: uwaga mówi, że nie jest objęty ochroną gatunkową (bez twierdzeń o przepisach rybackich, których weryfikacja nie potwierdziła) (PL i EN). |
| C071 | Węgorz | ✅ wprowadzona | Węgorz: ostrzeżenie, że surowa krew jest trująca (ichtiotoksyna) (PL i EN). Bez plakietki „trujący” — to nie gatunek trujący w zwykłym sensie. |
| C072 | Piskorz | ✅ wprowadzona | Piskorz: hook doprecyzowany zgodnie z new_text — oddychanie jelitowe i cichy pisk powietrza uchodzącego z jelita (PL i EN). |
| C073 | Miętus | ✅ wprowadzona | Miętus: „jedyny w pełni słodkowodny przedstawiciel dorszokształtnych” (PL i EN). |

### Płazy i gady (C074–C082, 8)

✅ wprowadzona: 6, 📌 w ciekawostce: 2

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C074 | Status ochrony | ✅ wprowadzona | Plakietki ochrony ścisłej/częściowej na 27 kartach płazów i gadów (m.in. ścisła: zaskroniec rybołów, ropucha zielona, żaba zwinka, moczarowa, grzebiuszka, paskówka). |
| C075 | Zaskroniec rybołów | ✅ wprowadzona | Zaskroniec rybołów: pierwsza współczesna obserwacja w lipcu 2009 r., plakietka ochrony ścisłej; lokalizacja nadal tylko regionalna (PL i EN). |
| C076 | Ropucha zielona | 📌 w ciekawostce | Obie nazwy łacińskie podaje pierwsza ciekawostka karty (F0545: „w rozporządzeniu jako *Pseudepidalea viridis*”); uwaga doprecyzowana do „ochrony ścisłej”. |
| C077 | Rzekotka wschodnia i padalec kolchidzki | ✅ wprowadzona | Rzekotka wschodnia i padalec kolchidzki: notka, że w rozporządzeniu nie występują pod własną nazwą; karty nie pisały „chroniony” i nie mają plakietki (PL i EN). |
| C078 | Rzekotka wschodnia | 📌 w ciekawostce | Ciekawostka F0551 („w Polsce dopiero od 2012 r.”) jest widoczna na karcie. |
| C079 | Żaba jeziorkowa | ✅ wprowadzona | Żaba jeziorkowa: notka, że żaby zielone trudno odróżnić w terenie (czasem potrzebne badania kariotypu); bez zachęty do chwytania (PL i EN). |
| C081 | Żółw ozdobny | ✅ wprowadzona | Żółw ozdobny: uwaga o unijnej liście inwazyjnych gatunków obcych od 2016 r. (PL i EN). |
| C082 | Wąż Eskulapa | ✅ wprowadzona | Wąż Eskulapa: uwaga — ochrona ścisła ze strefą ochrony, niejadowity (PL i EN). |

### Ptaki (C083–C093, 11)

✅ wprowadzona: 5, 📌 w ciekawostce: 3, ➖ bez zmian: 3

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C083 | Bielik, „największy lęgowy ptak Polski” | ✅ wprowadzona | Bielik: „największy orzeł gniazdujący w Polsce” zamiast „największy lęgowy ptak Polski” (PL i EN). |
| C084 | „Czajka stepowa” | ✅ wprowadzona | Nazwa: Czajka towarzyska (dawniej: Czajka stepowa). |
| C085 | Słonka | 📌 w ciekawostce | Ciekawostka F0626 („od 2.01.2026 słonka nie jest gatunkiem łownym”) jest widoczna na karcie. |
| C086 | Uszatka | ✅ wprowadzona | Uszatka: twierdzenie o świeceniu piór w UV usunięte, bo nie potwierdza go żadna zweryfikowana ciekawostka. Karta opiera się na ciekawostkach F0628/F0629: „uszy” z piór, cudze gniazda krukowatych, wspólne zimowe noclegowiska (PL i EN). |
| C087 | Pustułka | ✅ wprowadzona | Pustułka: widzenie UV przy szukaniu gryzoni opisane jako dyskutowana hipoteza, podważana przez nowsze badania; poziom „detektor UV” → „łowca z zawisu” (PL i EN). |
| C088 | Słonka | ✅ wprowadzona | Słonka: usunięte niepotwierdzone „białe pióra jak odblaski”; w zamian widzenie w 360° i ciągi; poziom „leśny reflektor” → „mistrz kamuflażu” (PL i EN). |
| C089 | Głuszec | ➖ bez zmian | Głuszec: hook mówi o „przysłowiowo głuchym” ptaku, czyli o tradycji, nie o fakcie biologicznym; pieśń tokową opisuje ciekawostka F0665. |
| C090 | Nazwy w rozporządzeniu | 📌 w ciekawostce | Nazwy z rozporządzenia i ochronę ścisłą podają ciekawostki F0638 i F0688; obie karty mają plakietkę. |
| C091 | Strefy ochrony | ➖ bez zmian | Strefy ochrony są w ciekawostkach; karty nadal nie podają stanowisk. |
| C092 | Pomurnik | 📌 w ciekawostce | Ciekawostka F0676 (CR, Czerwona lista 2020) jest widoczna na karcie pomurnika. |
| C093 | Wodniczka | ➖ bez zmian | Wodniczka: karta nie podaje odsetka; zostaje zweryfikowana ciekawostka F0680 (ok. 25%), a niepotwierdzonych 29% nie dopisuję. |

### Ssaki (C094–C103, 10)

✅ wprowadzona: 10

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C094 | Rzęsorek mniejszy | ✅ wprowadzona | Rzęsorek mniejszy: nazwa łacińska *Neomys milleri* (dawniej w atlasie: *N. anomalus*; tak nadal w rozporządzeniu — ciekawostka F0709). EN: „Miller's water shrew”. |
| C095 | „Foka szara” | ✅ wprowadzona | Nazwa: Szarytka morska (dawniej w atlasie: Foka szara — obie nazwy widoczne na karcie i w wyszukiwarce). |
| C096 | „Norka amerykańska” | ✅ wprowadzona | Nazwa: Wizon amerykański (dawniej: Norka amerykańska). |
| C097 | Nazwy MiIZ PAN 2015 | ✅ wprowadzona | Nazwy MiIZ PAN: Orzesznica leszczynowa, Jenot azjatycki, Piżmak amerykański (dawne nazwy w „dawniej w atlasie”); koszatka, żołędnica i popielica już je miały. |
| C098 | Status ochrony | ✅ wprowadzona | Plakietki ochrony częściowej (11 kart) i ścisłej (17 kart) przy wszystkich wymienionych gatunkach. |
| C099 | Nietoperze | ✅ wprowadzona | Nocek duży: uwaga o zakazie fotografowania, filmowania i obserwacji mogących płoszyć (PL i EN), zgodnie z new_text tylko dla nocka dużego. |
| C100 | Szakal | ✅ wprowadzona | Szakal złocisty: od 2017 r. gatunek łowny (rozporządzenie zalicza go do drapieżników) (PL i EN). |
| C101 | Jenot, szop, piżmak, wizon | ✅ wprowadzona | Jenot azjatycki: od 1.04.2022 niełowny, inwazyjny gatunek obcy (PL i EN). Szopa, piżmaka i wizona nie ruszałem — new_text ograniczył się do jenota. |
| C102 | Żołędnica | ✅ wprowadzona | Lokalizacji nadal nie podajemy dokładniej niż region (strefa ochrony: F0745). Karta uzgodniona z ciekawostką F0747: w Polsce gatunek uznawany za wymarły, ostatnia pewna obserwacja z 1961 r. (PL i EN). |
| C103 | Kret | ✅ wprowadzona | Kret: uwaga z wyjątkami ochrony częściowej (ogrody, uprawy ogrodnicze, szkółki leśne, lotniska trawiaste, konstrukcje hydrotechniczne, obiekty sportowe) (PL i EN). |

### Minerały (C104–C110, 7)

✅ wprowadzona: 7

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C104 | Heflikit | ✅ wprowadzona | Heflikit: „minerał supergrupy epidotu ze skandem” zamiast „amfibol ze skandem”. |
| C105 | Nioboholtit | ✅ wprowadzona | Nioboholtit: borokrzemian niobu i glinu z supergrupy dumortierytu; pegmatyt w Szklarach koło Ząbkowic Śląskich. |
| C106 | Żabińskiit | ✅ wprowadzona | Żabińskiit: grupa tytanitu (z glinem i tantalem — wg ciekawostki F0787 to tantal, nie niob); miejsce typowe: pegmatyt w Piławie Górnej (blok Gór Sowich). |
| C107 | Taliomelan | ✅ wprowadzona | Taliomelan: miejsce typowe Zalas koło Krakowa, grupa koronadytu. |
| C108 | Berylosachanbińskiit-Na | ✅ wprowadzona | Nazwa: Sachanbińskiit (dawniej: Berylosachanbińskiit-Na) — przedefiniowany przez IMA-CNMNC w 2025 r., grupa kordierytu (PL i EN). |
| C109 | Halit z Grot Kryształowych | ✅ wprowadzona | Halit z Grot Kryształowych: rezerwat nieudostępniany do masowego zwiedzania (ryzyko zmian mikroklimatu i korozji kryształów), wejście tylko w celach naukowych i edukacyjnych (PL i EN). |
| C110 | Niezweryfikowane | ✅ wprowadzona | Siarka: „Polska była pod koniec lat 80. trzecim producentem siarki na świecie” zamiast „największe złoża świata”; haueryt: bez „najbardziej imponujących okazów” i poziomu „światowy rekord”; agat: nazwa karty „Agaty z Nowego Kościoła” (dawniej: Agat gwiaździsty z Nowego Kościoła) i zdanie, że spotyka się w nich gwiaździsty rysunek (PL i EN). |

### Formacje skalne (C111–C114, 4)

✅ wprowadzona: 2, 🗑️ karta wycofana: 1, ➖ bez zmian: 1

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C111 | Zęzów i Czarne Działy | 🗑️ karta wycofana | Karta „Zęzów i Czarne Działy” wycofana: nie wiadomo, o które miejsce chodzi (znane Czarne Działy leżą w Beskidzie Małym), a potwierdzona jest tylko wysokość Zęzowa. |
| C112 | Słonecznik | ✅ wprowadzona | Słonecznik: północne zbocze Smogorni (gm. Podgórzyn), nad Karpaczem Górnym; „zegar” dla mieszkańców Podgórzyna, Przesieki i Borowic (hook, kąt quizowy, region). |
| C113 | Dziurawa Skała | ✅ wprowadzona | Dziurawa Skała: nad Podgórną, na granicy Podgórzyna Górnego i Przesieki, ok. 470 m n.p.m. |
| C114 | Przełom Białki | ➖ bez zmian | Zostaje „Kramnica”: tak pisze zweryfikowana ciekawostka F0919 i zdanie o rezerwacie w źródle; atlas używa tej formy konsekwentnie. |

### Skamieniałości (C117–C128, 11)

✅ wprowadzona: 7, 🗑️ karta wycofana: 1, 📌 w ciekawostce: 3

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C117 | Proterochersis robusta | ✅ wprowadzona | Karta przemianowana na *Proterochersis porebensis* (dawniej: *P. robusta*, gatunek z Niemiec); region: Poręba (warstwy ze Zbąszynka). Zdjęcie pozostaje oznaczone jako „kadr reprezentatywny: *P. robusta*”. |
| C118 | Jantarogekko balticus | ✅ wprowadzona | *Yantarogekko balticus* (dawniej: *Jantarogekko*); jedyny okaz z obwodu kaliningradzkiego, nie z Gdańska. |
| C119 | Limulus darwini | ✅ wprowadzona | *Crenatolimulus darwini* (dawniej: *Limulus darwini*); usunięte obalone „najstarszy przedstawiciel rodzaju *Limulus*”; podpisy zdjęć zaktualizowane. |
| C120 | Pliozaury z Krzyżanowic | ✅ wprowadzona | Karta przeredagowana według ciekawostek F0977/F0978: „Gady morskie z Krzyżanowic koło Iłży” (dawniej: Pliozaury…), hook o rewizji (metriorynchid zamiast pliozaura, niepewne pochodzenie szczęk), krąg plezjozauroida i żółwie. Zdjęcie odlewu czaszki pliozaura usunięte, bo pokazywało właśnie odrzucone oznaczenie; karta jest bez zdjęcia. |
| C121 | Pterozaury z Owadowa-Brzezinek | ✅ wprowadzona | Pterozaury z Owadowa: bez *Ctenochasma elegans* (nazwa łacińska → Pterosauria indet.); tylko nieliczne szczątki pterozaurów; poziom „grzebień w pysku” → „pterozaur z laguny”. Ciekawostka F0985 o *Ctenochasma* wycofana, bo nie dotyczy karty. |
| C122 | Krokodylomorfy z Owadowa | ✅ wprowadzona | Krokodylomorfy z Owadowa: formy morskie (Thalattosuchia, w tym metriorynchidy) i lądowe atopozaurydy *Theriosuchus*. |
| C123 | Tropy z Zachełmia | ✅ wprowadzona | Tropy z Zachełmia: dopisane, że interpretacja jest dyskutowana (praca z 2015 r.); szczegóły w ciekawostce F0955. |
| C124 | Mamuty z okolic Konina | 📌 w ciekawostce | Karta nie twierdzi, że szkielet z Jóźwina to mamut; ciekawostka F1010 (słoń leśny) jest widoczna na karcie. |
| C125 | Nosorożec włochaty z Polski | 📌 w ciekawostce | Ciekawostki F1011/F1012 mówią, że okaz ze Staruni pochodzi z dzisiejszej Ukrainy. |
| C127 | Tholodus schmidi – „Śląsk” | 🗑️ karta wycofana | Karta „Tholodus schmidi” wycofana: zweryfikowane ciekawostki wymieniają znaleziska z Niemiec, Włoch, Rosji i być może Chin, a polskie wystąpienie nie ma publikacji. |
| C128 | Trylobity – „eksperyment z oczami” | 📌 w ciekawostce | Ciekawostka F0944 („*Ellipsocephalus* był ślepy”) jest widoczna na karcie trylobitów. |

### Atmosfera i astronomia (C129–C134, 6)

✅ wprowadzona: 4, 📌 w ciekawostce: 1, ➖ bez zmian: 1

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C129 | Siedlce i oficjalny rekord mrozu / Litworowy Kocioł | ✅ wprowadzona | „Siedlce i rekord mrozu” (dawniej: „…i oficjalny rekord mrozu”); notka: pomiar −41 °C z 1940 r. budzi wątpliwości, a −41,1 °C zanotowano 17.02.2025 w Litworowym Kotle. Ciekawostka F1073 („najniższa oficjalna temperatura”) wycofana, bo przeczy F1070 (oficjalny rekord IMGW: −40,6 °C, Żywiec 1929). EN zaktualizowane. |
| C130 | Bieszczadzki Park Gwiezdnego Nieba | ✅ wprowadzona | Oficjalna nazwa: Park Gwiezdnego Nieba „Bieszczady” (dawna nazwa „Bieszczadzki Park Gwiezdnego Nieba” zostaje w synonimach); data powołania jest w ciekawostce F1047. |
| C131 | Geminidy | 📌 w ciekawostce | Phaethon jako ciało macierzyste Geminidów (najpewniej odewoluowane jądro komety) jest w ciekawostce F1056; karta nie twierdziła inaczej. |
| C132 | Białe noce żeglarskie | ✅ wprowadzona | Region białych nocy żeglarskich ujednolicony z ciekawostką F1042: „zwłaszcza klify Jastrzębiej Góry” zamiast Rozewia, Władysławowa i Helu. |
| C133 | Godziszów i Zadni Gerlach | ✅ wprowadzona | Notka: rekordowe zdjęcie 30.01.2025 z odległości 246,1 km (zamiast zdania o „dacie pliku”); EN zaktualizowane. |
| C134 | Niebieskie strumienie | ➖ bez zmian | Sformułowanie „zjawisko możliwe” przy niebieskich strumieniach zostaje, zgodnie z zaleceniem. |

### Rekordy krajobrazu (C135–C141, 7)

✅ wprowadzona: 5, 📌 w ciekawostce: 2

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C135 | Raczki Elbląskie — najniższy punkt Polski | ✅ wprowadzona | „Raczki Elbląskie — dawny najniższy punkt Polski” (dawna nazwa w synonimach); notka: Raczki 1,8 m p.p.m., od 2022 r. najniższy punkt to Marzęcino (2,2 m p.p.m.); podpis zdjęcia znaku i EN zaktualizowane. |
| C136 | Bifurkacja Wągrowiecka | ✅ wprowadzona | Tytuł zgodnie z propozycją: „Skrzyżowanie Wełny i Nielby” (dawna nazwa w synonimach, wyszukiwarka znajduje „bifurkacja”); mechanizm: XIX-wieczna melioracja i betonowy jaz; EN zaktualizowane. |
| C137 | Tarnów — Polski Biegun Ciepła | ✅ wprowadzona | Przydomek Tarnowa opisany jako historyczny (dane IMGW 1971–2000); w normach 1991–2020 Tarnów 9,4 °C, najcieplejszy Wrocław 9,7 °C. Hook, notka i EN zaktualizowane. |
| C138 | Sosna na Szczudłach w Wełczu | ✅ wprowadzona | Mianownik „Wełecz” w lokalizacji i podpisie łacińskim; nazwa karty „…w Wełczu” zostaje (miejscownik); poprawiony też podpis zdjęcia („w Wełeczu” → „w Wełczu”). |
| C139 | Delta Świny i Kraina 44 Wysp | 📌 w ciekawostce | Wyjaśnienie „44 wysp” (3 zamieszkane + 41) jest w ciekawostce F1094 widocznej na karcie. |
| C140 | Jezioro Hańcza | 📌 w ciekawostce | Rozrzut pomiarów głębokości (ok. 105–113 m, najczęściej 108,5 m) jest w ciekawostce F1100; karta nie podaje liczby. |
| C141 | Krzywy Las | ✅ wprowadzona | „Prawdopodobne dawne kształtowanie drzew” → „nieznana przyczyna (celowe kształtowanie drzew to hipoteza)”; szczegóły w ciekawostce F1085. |

### Architektura drewniana (C143–C148, 5)

✅ wprowadzona: 3, 🗑️ karta wycofana: 1, 📌 w ciekawostce: 1

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C143 | Dwór z Drogini | ✅ wprowadzona | Lokalizacja: „Park Etnograficzny Krakowiaków Zachodnich w Wygiełzowie (do 2023 r. Nadwiślański Park Etnograficzny)”; podpis zdjęcia z 2006 r. i EN zaktualizowane. Szczegóły w ciekawostce F1244. |
| C144 | Chata na Wysokości (Zalesie) | 🗑️ karta wycofana | Karta „Chata na Wysokości” wycofana: prywatna kwatera, jej historię znamy tylko od właścicieli, a karta nie miała ciekawostek ani zdjęcia obiektu. |
| C145 | Owczary, Powroźnik, Brunary Wyżne, Chotyniec, Smolnik, Turzańsk | ✅ wprowadzona | Znacznik „• UNESCO” w podpisie karty przy wszystkich 8 cerkwiach z wpisu 2013 (Owczary, Powroźnik, Brunary Wyżne, Chotyniec, Smolnik, Turzańsk, a także Kwiatoń i Radruż w tym samym formacie). |
| C146 | Dębno, Binarowa, Sękowa, Lipnica, Haczów, Blizne | ✅ wprowadzona | Ten sam znacznik „• UNESCO” przy 6 kościołach z wpisu 2003 (Dębno, Binarowa, Sękowa, Lipnica Murowana, Haczów, Blizne); dla spójności także Świdnica i Jawor. |
| C148 | Lipnica Murowana, Łopuszna | 📌 w ciekawostce | Karty nie podają dat 1143/1203 ani 1240; ciekawostki F1197 i F1234 opisują je jako niepotwierdzoną tradycję. |

### Podziemia (C149–C153, 4)

✅ wprowadzona: 3, 📌 w ciekawostce: 1

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C149 | Projekt Riese – opisy („podziemne miasto”, „wojenna machina”) | ✅ wprowadzona | Riese bez sensacji: zamiast „podziemnego miasta III Rzeszy” i „wojennej machiny” — niedokończony kompleks z lat 1943–1945 budowany przez więźniów i jeńców; niepewne przeznaczenie (Walim, Osówka), spokojniejsze opisy Osówki i Sobonia. Szczegóły w ciekawostkach F1269, F1270, F1272. Nazwa trasy „Podziemne Miasto Osówka” w podpisie zdjęcia zostaje, bo to nazwa własna obiektu. |
| C150 | Kopalnia Soli Bochnia – „najstarsze solne podziemie” | ✅ wprowadzona | Bochnia: „jedna z najstarszych kopalń soli w Polsce” zamiast „najstarsze solne podziemie”; notka zgodna z UNESCO (Bochnia i Wieliczka równolegle od XIII do końca XX w.); poziom „sól od XIII w.”. |
| C152 | Twierdza Kłodzko | 📌 w ciekawostce | Odkrycie nieznanych chodników kontrminowych w 2022 r. jest w ciekawostce F1292. |
| C153 | Podziemia Rynku w Krakowie | ✅ wprowadzona | „Rynek Podziemny w Krakowie” (oficjalna nazwa oddziału Muzeum Krakowa; dawna nazwa w synonimach); podpis zdjęcia zaktualizowany. |

### Cuda inżynierii (C155–C159, 5)

✅ wprowadzona: 2, 📌 w ciekawostce: 3

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C155 | Modernizm Gdyni | ✅ wprowadzona | Znacznik UNESCO w podpisie karty jak przy Hali Stulecia: „Gdynia • modernistyczne centrum UNESCO”; wpis z 2026 r. opisuje ciekawostka F1354. |
| C156 | Mosty Tczewskie | ✅ wprowadzona | Mechanizm Mostów Tczewskich: most z 1857 r. był drogowo-kolejowy, dziś drogowy; kolej biegnie osobnym mostem z lat 1888–1891, ok. 40 m obok („kratownicowe” zamiast „stalowe” przęsła). |
| C157 | Śluza Paniewo | 📌 w ciekawostce | Karta nie opisuje stanu śluzy; zamknięcie w 2011 r., remont i oddanie do użytku 28.06.2021 po wymianie wrót opisuje ciekawostka F1339. |
| C158 | Radiostacja Gliwicka | 📌 w ciekawostce | Kontekst 31.08.1939 (prowokacja gliwicka) i rekord 111 m są w ciekawostkach F1315 i F1313. |
| C159 | Elektrownia Porąbka-Żar | 📌 w ciekawostce | „Jedyna podziemna elektrownia w Polsce” jest w ciekawostce F1323. |

### Twierdze i ruiny (C162–C167, 5)

✅ wprowadzona: 4, 📌 w ciekawostce: 1

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C162 | Wiadukty w Stańczykach | ✅ wprowadzona | „Mosty w Stańczykach” (dawniej: „Wiadukty…”, w synonimach): dwa mosty kolejowe, tor tylko na jednym; „akwedukty Puszczy Rominckiej” opisane jako porównanie wizualne; poziom „dwa mosty, jeden tor”; podpis zdjęcia, EN i asercja testu zaktualizowane. |
| C164 | Zamek w Mosznej | ✅ wprowadzona | „Pałac w Mosznej” (dawniej: „Zamek w Mosznej”, w synonimach); podpis zdjęcia i EN („Moszna Palace”) zaktualizowane. |
| C165 | Zamek Krzyżtopór | ✅ wprowadzona | Legenda liczb Krzyżtoporu w notce wyraźnie jako legenda (spisana w latach 30. XIX w. przez Klementynę z Tańskich Hoffmanową; liczba okien się nie zgadza); EN hook i notka zaktualizowane. |
| C166 | Zamek Czocha | 📌 w ciekawostce | Brak dowodów na szkołę szyfrantów Abwehry opisuje ciekawostka F1401; karta tego nie twierdzi. |
| C167 | Zamek w Łapalicach | ✅ wprowadzona | Łapalice: samowola budowlana w mechanizmie (zamiast „niejasnego statusu”), uwaga bezpieczeństwa: zakaz wstępu na teren obiektu; EN zaktualizowane. Notatka terenowa przy karcie mówi to samo. |

### Memento mori (C168–C172, 5)

✅ wprowadzona: 2, 📌 w ciekawostce: 3

| ID | Karta / temat | Status | Co zrobiono |
| --- | --- | --- | --- |
| C168 | Westerplatte — Cmentarz Obrońców Wybrzeża | ✅ wprowadzona | „Westerplatte — Cmentarz Wojskowy Żołnierzy Wojska Polskiego” (nazwa z poprawki i ciekawostki F1497; dawna w synonimach), mechanizm: cmentarz z 2022 r. Podpis zdjęcia neutralny: „Cmentarz na Westerplatte”. EN zaktualizowane. |
| C169 | Sobibór, Bełżec, Kulmhof, Treblinka | 📌 w ciekawostce | Karty nie podają liczb ofiar; zakres i źródło dla Sobiboru (130–300 tys., badania z 2014 r.: ok. 170–180 tys.) są w ciekawostce F1483. Bełżec, Kulmhof i Treblinka mają w ciekawostkach oszacowania „prawdopodobnie ok.” ze źródłem — zostają, bo są oznaczone jako przybliżone; zakresy można dodać w generatorze. |
| C170 | Kaplica Czaszek | 📌 w ciekawostce | Karta nie podaje liczb; ciekawostka F1446 podaje je jako przybliżone („ponad 3000”, „ponad 21 000”, inne źródła 20–30 tys.). |
| C171 | Kopiec Krakusa / Kopiec Wandy | ✅ wprowadzona | Kopiec Krakusa i Kopiec Wandy: notki mówią wprost, że grób władcy / Wandy to hipoteza lub podanie; EN zaktualizowane. |
| C172 | Nowy Cmentarz Żydowski w Łodzi | 📌 w ciekawostce | 42 ha i Mauzoleum Poznańskiego są w ciekawostkach F1456 i F1458; zweryfikowana ciekawostka mówi „jedna z największych nekropolii żydowskich w Europie” (nie „największa”), więc tego superlatywu nie dopisuję. |
