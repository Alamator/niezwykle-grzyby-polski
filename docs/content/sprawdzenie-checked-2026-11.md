# Ponowne sprawdzenie ciekawostek „checked” (1.11.2026)

Przed tym sprawdzeniem 470 ciekawostek miało status `checked`: potwierdziło je wyszukiwanie w niezależnym źródle, zwykle tylko z wyników wyszukiwania, bo strony tych źródeł się stąd nie otwierały. Na prośbę Roberta wszystkie sprawdzono jeszcze raz, tym razem na pełnych tekstach źródeł, które dało się otworzyć. Statusy opisuje [README-weryfikacja.md](README-weryfikacja.md).

## Jak sprawdzono

1. **Źródła:** wszystkie strony podane przy tych ciekawostkach, które się stąd otwierają, pobrano raz, 1.11.2026, i zamieniono na tekst (Wikipedia: aktualna wersja artykułu). Otwierają się Wikipedia i nieliczne inne strony: z 658 adresów spoza Wikipedii tylko 44. Pozostałe blokuje filtr sieci tego środowiska.
2. **Dwa niezależne odczyty:** każdą ciekawostkę przeczytały dwa niezależne odczyty (dwa różne modele), zdanie po zdaniu, po polsku i po angielsku.
3. **Rozstrzygnięcie:** gdy odczyty się nie zgadzały albo proponowały zmianę brzmienia, decyzję podejmował trzeci odczyt na pełnych tekstach źródeł.
4. **Zasady:**
   - `verified` tylko wtedy, gdy źródło podane przy ciekawostce i czytelne stąd mówi wszystko, co ona: każdą liczbę, datę, miejsce i przymiotnik w stopniu najwyższym, po polsku i po angielsku;
   - `corrected`, gdy coś było za mocne, nieprecyzyjne albo inne niż w źródłach: nowe brzmienie mówi tylko to, co źródła, a angielski tłumaczy polski 1:1;
   - `checked` zostaje, gdy czytelne źródła nie mówią wszystkiego, a nic im nie przeczy (źródło potwierdzające jest zablokowane).
5. **Dopisane źródła:** przy 50 ciekawostkach, które zostały `checked`, odczyty wskazały czytelne źródło spoza listy, które ma potwierdzać całość. Dwa kolejne niezależne odczyty sprawdziły każde z nich. Źródło dopisano tylko tam, gdzie oba odczyty uznały, że to samo źródło mówi wszystko (16 ciekawostek).
6. **Przegląd:** niezależny przegląd sprawdził wszystkie poprawione brzmienia, karty tych ciekawostek i losową próbę 30 ciekawostek `verified`. Każde zgłoszenie sprawdził drugi, sceptyczny odczyt. W próbie `verified` nie znalazł się żaden błąd w faktach, tylko dwie sprawy językowe (F0325, F0644).

## Wynik

| Szuflada | Ciekawostek | `verified` | `corrected` | zostaje `checked` |
| --- | ---: | ---: | ---: | ---: |
| architektura-drewniana | 41 | 32 | 8 | 1 |
| atmosfera-astronomia | 19 | 13 | 2 | 4 |
| cuda-inzynierii | 45 | 38 | 4 | 3 |
| drzewa | 20 | 11 | 4 | 5 |
| formacje-skalne | 19 | 12 | 3 | 4 |
| grzyby | 39 | 19 | 13 | 7 |
| kwiaty | 11 | 4 | 4 | 3 |
| memento-mori | 26 | 17 | 7 | 2 |
| mineraly | 26 | 7 | 2 | 17 |
| owady | 10 | 6 | 3 | 1 |
| plazy-gady | 13 | 8 | 3 | 2 |
| podziemia | 31 | 19 | 10 | 2 |
| ptaki | 26 | 16 | 6 | 4 |
| rekordy-atmosferyczne | 2 | 2 | 0 | 0 |
| rekordy-krajobrazu | 40 | 29 | 8 | 3 |
| ryby | 11 | 5 | 3 | 3 |
| skamienialosci | 29 | 11 | 3 | 15 |
| ssaki | 25 | 15 | 6 | 4 |
| twierdze-ruiny | 37 | 27 | 7 | 3 |
| **razem** | **470** | **291** | **96** | **83** |

Po tym podejściu atlas miał 1458 ciekawostek: 846 `verified`, 529 `corrected` i 83 `checked`. Drugie podejście, po dopuszczeniu kolejnych stron, opisano [niżej](#drugie-podejście-nowo-dopuszczone-strony-1112026).

## Poprawione brzmienie (96)

Tabela podaje tekst polski. Gdy zmienił się tylko angielski, wiersz pokazuje angielski. Typowe poprawki:
- przymiotnik w stopniu najwyższym albo stwierdzenie mocniejsze niż w źródle („przekracza 320 km/h” → „potrafi przekroczyć 320 km/h”);
- liczby z innego okresu albo zaokrąglone przez nas („około półtora raza” → „144% masy ciała samicy”);
- zdania, których źródła nie potwierdzają, usunięte;
- angielski, który mówił więcej niż polski.

| Id | Karta | Było | Jest |
| --- | --- | --- | --- |
| F1196 | Kościół św. Filipa i św. Jakuba w Sękowej | Kościół mocno ucierpiał w czasie bitwy pod Gorlicami (1914/1915). Drewno z niego posłużyło wtedy m.in. do budowy okopów. | Kościół mocno ucierpiał w czasie walk pod Gorlicami na przełomie 1914/1915 r. Drewno z niego posłużyło wtedy m.in. do budowy okopów. |
| F1198 | Kościół św. Leonarda w Lipnicy Murowanej | Malowidła w prezbiterium pochodzą z 1689 r., a w nawie z 1711 r. Od 2003 r. kościół jest w UNESCO. | Malowidła w prezbiterium pochodzą z 1689 r., a polichromia na północnej ścianie nawy z 1711 r. Od 2003 r. kościół jest w UNESCO. |
| F1201 | Kościół Wszystkich Świętych w Bliznem | EN: The earliest reliable mention dates from 1470. The church served a defensive purpose. | EN: The earliest reliable mention dates from 1470. The church had a defensive character. (polski tekst bez zmian) |
| F1214 | Cerkiew św. Paraskewy w Radrużu | To jedna z najstarszych i najcenniejszych drewnianych cerkwi zachowanych w Polsce. Od 2013 r. jest na Liście Światowego Dziedzictwa UNESCO. | To jedna z najstarszych i najlepiej zachowanych drewnianych cerkwi w Polsce. Od 2013 r. jest na Liście Światowego Dziedzictwa UNESCO. |
| F1215 | Cerkiew św. Michała Archanioła w Smolniku | Pierwsza wzmianka o cerkwi w Smolniku pochodzi z 1589 r. Od 1974 r. świątynia jest kościołem rzymskokatolickim. | Pierwsza znana wzmianka o cerkwi w Smolniku pochodzi z 1589 r. Obecny budynek od 1974 r. jest kościołem rzymskokatolickim. |
| F1229 | Kościół św. Jana Chrzciciela w Orawce | Leży na małopolskim Szlaku Architektury Drewnianej. Szlak ma ponad 1500 km i obejmuje 255 obiektów. | Leży na małopolskim Szlaku Architektury Drewnianej. Szlak ma ponad 1500 km. |
| F1237 | Meczet tatarski w Bohonikach | Obecny meczet datuje się zwykle na II połowę XIX w. Podczas prac konserwatorskich w 2006 r. na jednej z belek odkryto datę 1873, która może oznaczać rok budowy albo przebudowy. | Obecny meczet datuje się zwykle na II połowę XIX w. Podczas prac konserwatorskich na jednej z belek odkryto datę 1873, która może oznaczać rok budowy albo przebudowy. |
| F1239 | Kraina Otwartych Okiennic | Szlak obejmuje m.in. Soce i Puchły. Projekt działa od 2001 r. i ratuje znikający krajobraz kulturowy doliny Narwi. | Szlak obejmuje m.in. Soce. Projekt działa od 2001 r. i ma na celu ratowanie znikającego krajobrazu kulturowego doliny Narwi. |
| F1039 | Białe noce astronomiczne | Latem w całej Polsce nie zapada noc astronomiczna. Słońce chowa się wtedy pod horyzont na mniej niż 18°. | Latem w całej Polsce bywają noce, kiedy nie zapada noc astronomiczna. Słońce chowa się wtedy pod horyzont na mniej niż 18°. |
| F1056 | Geminidy | Ich ciałem macierzystym jest planetoida (3200) Phaethon, która według dzisiejszej wiedzy jest najpewniej odewoluowanym jądrem starej komety. | Ich ciałem macierzystym jest planetoida (3200) Phaethon, która według dzisiejszej wiedzy wydaje się odewoluowanym jądrem starej komety. |
| F1343 | Wrocławski Węzeł Wodny | Po powodzi z 1903 r. zbudowano nowy Kanał Powodziowy. W 1997 r. system zawiódł podczas powodzi tysiąclecia. | Po powodzi z 1903 r. zbudowano nowy Kanał Powodziowy. W 1997 r. system przeciwpowodziowy zawiódł podczas powodzi tysiąclecia. |
| F1352 | Port Gdynia | Port zbudowano, by zapewnić Polsce dostęp do morza i bazę marynarki wojennej. Gdynia dostała prawa miejskie 4 marca 1926 r. | Port zbudowano, by zapewnić Polsce dostęp do morskich szlaków i bazę marynarki wojennej. Gdynia dostała prawa miejskie 4 marca 1926 r. |
| F1361 | Nikiszowiec | W 1978 r. trafiło do rejestru zabytków, a od 2011 r. jest Pomnikiem Historii. | W 1978 r. układ urbanistyczny osiedla trafił do rejestru zabytków, a od 2011 r. osiedle jest Pomnikiem Historii. |
| F1364 | EC1 Łódź | Pierwsza komercyjna elektrownia w Łodzi dawała prąd od 1907 r. Jako elektrociepłownia szczytowa działała do 2000 r. | Pierwsza miejska elektrownia w Łodzi dawała prąd od 1907 r. Jako elektrociepłownia szczytowa działała do 2000 r. |
| F0280 | Miłorząb dwuklapowy | To „żywa skamieniałość”: kopalne miłorzęby bardzo podobne do dzisiejszego znane są sprzed około **170 mln lat** (środkowa jura). | To „żywa skamieniałość”: kopalne miłorzęby podobne do dzisiejszego znane są sprzed około **170 mln lat** (środkowa jura). |
| F0286 | Bożodrzew gruczołowaty | W młodości przyrasta nawet **2 m rocznie**, a w Polsce dorasta do 30 m. Pochodzi z Chin, a do Europy trafił w **1751 r.** | W młodości przyrasta nawet **2 m rocznie**, a w Polsce dorasta do 30 m. Pochodzi z Chin, a do Europy trafił w **XVIII w.** |
| F0337 | Dęby Rogalińskie | Najsłynniejsze to Lech, Czech i Rus. Od 2020 roku pomnikiem historii jest nie tylko zespół pałacowo-parkowy, ale także cały obszar dawnego majątku ziemskiego Raczyńskich w Rogalinie. | Najsłynniejsze to Lech, Czech i Rus. Od 2020 roku pomnikiem historii jest nie tylko zespół pałacowo-parkowy, ale także obszar dawnego majątku ziemskiego Raczyńskich w Rogalinie. |
| F0347 | Dawidia chińska | „Drzewo chusteczkowe”: kuliste kwiatostany otaczają dwie białe podsadki **długości do 20 cm**. | „Drzewo chusteczkowe”: kuliste kwiatostany są otoczone **dwiema białymi podsadkami**. |
| F0868 | Pielgrzymy | Granitowe skały mają do 25 m wysokości. To trzy potężne grupy oraz wiele mniejszych bloków. | Granitowe skały mają do 25 m wysokości. To trzy potężne grupy skalne, kilka mniejszych i wiele pojedynczych bloków. |
| F0886 | Szczeliniec Wielki | Prowadzi tam 665 schodów, powstałych w 1814 r. dzięki Franzowi Pablowi, sołtysowi Karłowa i pierwszemu przewodnikowi po szczycie. | Prowadzą tam schody, powstałe w 1814 r. dzięki Franzowi Pablowi, sołtysowi Karłowa i pierwszemu przewodnikowi po szczycie. |
| F0897 | Skalna Czaszka | Pobliski Narożnik (851 m n.p.m.) zbudowany jest z piaskowców ciosowych górnych, czyli najmłodszej warstwy Gór Stołowych. Jego pionowe ściany od zachodu i południa są popularnym rejonem wspinaczkowym. | Narożnik zbudowany jest z piaskowców ciosowych górnych, czyli najmłodszej warstwy Gór Stołowych. Jego pionowe ściany od zachodu i południa są popularnym rejonem wspinaczkowym. |
| F0000 | Okratek australijski | Przybysz z antypodów. Za jego ojczyznę uważa się Australię z Tasmanią i Nową Zelandię. W Europie po raz pierwszy odnotowano go w 1914 r. we Francji, w Wogezach. Najpewniej przypłynął z zaopatrzeniem wojskowym na początku I wojny światowej, choć bierze się też pod uwagę transport australijskiej wełny. | Przybysz z antypodów. Za jego ojczyznę uważa się Australię z Tasmanią i Nową Zelandię. W Europie po raz pierwszy odnotowano go w 1914 r. we Francji. |
| F0022 | Dzbankówka kulista | W Finlandii przez trzy dekady przybywało jej stwierdzeń (dane z 2013 r.). Autorzy badania przypuszczają, że jedną z przyczyn mogą być cieplejsze zimy i deszczowe wiosny. | W Finlandii przez trzy dekady zwiększało się jej występowanie (badanie z 2013 r.). Autorzy badania przypuszczają, że jedną z przyczyn mogą być cieplejsze zimy i deszczowe wiosny. |
| F0034 | Smardz jadalny | W latach 1983–2014 był pod ochroną ścisłą. Od 2014 r. jest pod **częściową**. Okazy rosnące poza ogrodami, uprawami, szkółkami i terenami zieleni nadal są chronione. | W latach 1983–2014 był pod ochroną ścisłą. Od 2014 r. jest pod **częściową**. Zbierać go na własny użytek i do celów gospodarczych wolno tylko w ogrodach, uprawach ogrodniczych, szkółkach leśnych i na terenach zieleni. |
| F0057 | Koralówka czerwonowierzchołkowa | Owocniki dorastają do ok. 20 cm wysokości i 30 cm szerokości. Mają różowe lub czerwonawe końcówki. | Owocniki dorastają do ok. 20 cm wysokości. Mają różowe lub czerwonawe końcówki. |
| F0077 | Płomyczka galaretowata | Po angielsku to „apricot jelly” (morelowa galaretka). Jest jedynym gatunkiem w swoim rodzaju. | Po angielsku to „apricot jelly” (morelowa galaretka). Jest jedynym gatunkiem ze swojego rodzaju w Polsce. |
| F0089 | Gwiazdosz czteropromienny | To jeden z najmniejszych gwiazdoszy. Suche owocniki można znaleźć nawet zimą i wiosną. | To jeden z najmniejszych gwiazdoszy. Suche owocniki można znaleźć także w bezśnieżne zimy, a nawet wiosną. |
| F0101 | Kolczakówka piekąca | Owocniki zawierają atromentynę, barwnik o działaniu przeciwzakrzepowym podobnym do heparyny, wykrytym w badaniach na zwierzętach w latach 60. XX wieku. Nie wykazano, że atromentyna występuje akurat w czerwonych kroplach. | Zawiera atromentynę, barwnik o działaniu przeciwzakrzepowym podobnym do heparyny. |
| F0124 | Lakówka ametystowa | EN: On arsenic-contaminated soils it can accumulate large amounts of the element. | EN: On arsenic-contaminated soils it can strongly accumulate the element. (polski tekst bez zmian) |
| F0128 | Chlorówka drobna | EN: The fruiting bodies measure a mere 2–5 mm. We see the green wood far more often than the fungus itself. | EN: The fruiting bodies measure a mere 2–5 mm. We see just the green wood more often than the fungus. (polski tekst bez zmian) |
| F0135 | Muchomor czerwony | Wbrew nazwie za zatrucia odpowiada głównie kwas ibotenowy, a nie muskaryna, której jest ok. 0,0002%. | Wbrew łacińskiej nazwie za zatrucia odpowiada głównie kwas ibotenowy, a nie muskaryna, której jest ok. 0,0002%. |
| F0139 | Ozorek dębowy | Rozkłada drewno dębu bardzo powoli (nawet przez kilkadziesiąt lat), a na początku tego procesu drewno nabiera czerwonego odcienia, co **podnosi jego wartość w meblarstwie**. | Rozkłada drewno dębu powoli (nawet przez kilkadziesiąt lat), a na początku tego procesu drewno nabiera czerwonego odcienia, co **podnosi jego wartość w meblarstwie**. |
| F0153 | Błyskoporek podkorowy | Narośl zawiera bardzo dużo szczawianów. W badanych proszkach z czagi było ich od 2,8 do 14,2 g na 100 g. | Narośl zawiera bardzo dużo szczawianów: od 2800 do 11 200 mg na 100 g. |
| F0164 | Czasznica olbrzymia | EN: It measures 10–60 cm across. One of the largest known specimens (Czech Republic, 1955) weighed 20.8 kg, and a specimen of over 23 kg has been recorded in Canada. | EN: It measures 10–60 cm across. One of the largest known specimens (Czechia, 1955) weighed 20.8 kg, and a specimen of over 23 kg has been recorded in Canada. (polski tekst bez zmian) |
| F0203 | Aldrowanda pęcherzykowata | EN: It's the underwater cousin of the Venus flytrap: its two-lobed trap works just like the flytrap's, only it's smaller and hidden underwater. | EN: It's the underwater cousin of the Venus flytrap: its two-lobed trap works like the flytrap's, only it's smaller and hidden underwater. (polski tekst bez zmian) |
| F0210 | Rosiczka | Wszystkie krajowe rosiczki (okrągłolistna, długolistna, pośrednia i mieszańcowa owalna) są pod **ochroną ścisłą**. Rodzime gatunki chroni się w Polsce od 1946 roku. | Wszystkie krajowe rosiczki (okrągłolistna, długolistna, pośrednia i mieszańcowa owalna) są pod **ochroną ścisłą**. |
| F0240 | Podkolan zielonawy | Ma ostrogę długości 2–4 cm, maczugowato zgrubiałą na końcu. Kwiaty zapylają ćmy, które przylatują po nektar. | Ma ostrogę długości 20–40 mm, maczugowato zgrubiałą na końcu. Kwiaty zapylają ćmy, które przylatują po nektar. |
| F0244 | Kukuczka kapturkowata | Botanicy przenieśli ją ostatnio do rodzaju *Hemipilia* (*H. cucullata*). | Botanicy przenieśli ją do rodzaju *Hemipilia* (*H. cucullata*). |
| F1450 | Cmentarz Rakowicki | Działa od stycznia 1803 r. Był pierwszym ogólnym cmentarzem miejskim Krakowa, założonym w miejsce zlikwidowanych cmentarzy przykościelnych. | Działa od stycznia 1803 r. Był pierwszym cmentarzem komunalnym w Krakowie. Powstał w związku z zakazem pochówków na cmentarzach przykościelnych w obrębie miasta. |
| F1452 | Cmentarz na Pęksowym Brzyzku | Pierwszy cmentarz Zakopanego powstał w połowie XIX wieku; najczęściej podaje się rok 1851, choć dokładna data nie jest pewna. Nazwa pochodzi od darczyńcy ziemi, Jana Pęksy. | Cmentarz powstał w połowie XIX wieku. Nazwa pochodzi od darczyńcy ziemi, Jana Pęksy. |
| F1454 | Cmentarz Żydowski przy ul. Okopowej w Warszawie | Cmentarz założono w 1806 r. Ma ok. 33,4 ha. Pochowano tu ponad 200 tys. osób. | Cmentarz założono w 1806 r. Ma ok. 33,5 ha. Pochowano tu ponad 200 tys. osób. |
| F1461 | Mizar w Kruszynianach | Najstarsze nagrobki na mizarze pochodzą z końca XVII w.; to nieociosane kamienie, na wielu z nich nie ma inskrypcji albo są nieczytelne. | Najstarsze nagrobki na mizarze pochodzą z XVII i XVIII w.; to nieociosane kamienie bez czytelnych inskrypcji. |
| F1473 | Palmiry | Spoczywa tu ponad 2 tys. Polaków zamordowanych przez Niemców w latach 1939–1943. Najczęściej podaje się liczbę 2115 pochowanych, a w niektórych opracowaniach 2204. | Spoczywa tu ponad 2 tys. Polaków zamordowanych przez Niemców w latach 1939–1943. Podaje się różne liczby pochowanych, m.in. 2115 i 2204. |
| F1485 | Ośrodek Zagłady Kulmhof | Liczba ofiar sięgnęła prawdopodobnie ok. 200 tys. osób. Byli to głównie Żydzi, a także mniejsze grupy Polaków i jeńców sowieckich. | Liczba ofiar sięgnęła prawdopodobnie ok. 200 tys. osób. Byli to głównie Żydzi, a także Romowie i Sinti oraz mniejsze grupy Polaków i jeńców sowieckich. |
| F1504 | Kopiec Wandy | Wieś Mogiła, której nazwę wiąże się z kopcem, wzmiankowano w 1222 r. Wygląd kopca opisano po raz pierwszy w 1584 r. | Wieś Mogiła, której nazwę wiąże się z kopcem, wzmiankowano po raz pierwszy w 1222 r. Pierwsza wzmianka o wyglądzie kopca pochodzi z 1584 r. |
| F0795 | Heflikit | Heflikit **nie jest amfibolem**, jak podaje strona. Amfibolem ze skandem jest skandiowinchit. | Heflikit **nie jest amfibolem**. Skandiowinchit to amfibol ze skandem. |
| F0813 | Siarka rodzima z Tarnobrzega | Odkrywkę w Machowie zamknięto w 1992 r. i zalano wodą. Tak powstało Jezioro Tarnobrzeskie. | Wydobycie w odkrywce w Machowie zakończono w 1992 r. Wyrobisko zalano potem wodą. Tak powstało Jezioro Tarnobrzeskie. |
| F0378 | Gąsienica zmrocznika gładysza | Dorosły motyl widzi kolory nawet przy bardzo słabym świetle. To pierwszy gatunek zwierzęcia, u którego udokumentowano **nocne widzenie barwne** (badania z 2002 roku). Rozróżniał kolory przy świetle tak słabym jak blask gwiazd. | Dorosły motyl widzi kolory nawet przy bardzo słabym świetle. To jeden z pierwszych gatunków zwierząt, u których udokumentowano **nocne widzenie barwne** (badania z 2002 roku). Rozróżniał kolory przy świetle tak słabym jak blask gwiazd. |
| F0409 | Bryzgun | Jednym z gatunków rodzaju *Cimbex* jest **bryzgun brzozowiec** (*C. femoratus*), dorastający do 20 mm. | Jednym z gatunków rodzaju *Cimbex* jest **bryzgun brzozowiec** (*C. femoratus*). |
| F0435 | Kozioróg dębosz | EN: It lives in sunlit oaks over 100 years old, including Bartek, the famous monument oak. | EN: It lives in sunlit oaks over 100 years old, including the monument oak Bartek. (polski tekst bez zmian) |
| F0522 | Kumak górski | Z wydzieliny skóry kumaka górskiego wyizolowano na przełomie lat 60. i 70. XX w. (pierwszy opis z 1970 r.) bombininę, jeden z pierwszych poznanych peptydów przeciwdrobnoustrojowych płazów. | W skórze kumaka górskiego znaleziono peptydy przeciwdrobnoustrojowe. Pierwszym wyizolowanym z nich była bombinina. |
| F0529 | Ropucha szara | To **największa ropucha Polski**. Samice mają do 12,5 cm. | To **największa ropucha Polski**. Samice są większe od samców. |
| F0540 | Traszka górska | Ma pomarańczowy brzuch i gardło. To jedyny żyjący dziś gatunek swojego rodzaju, nazywanego *Ichthyosaura*, choć część herpetologów od 2025 r. używa nazwy *Mesotriton*. | Ma pomarańczowy brzuch i gardło. To jedyny żyjący dziś gatunek swojego rodzaju, nazywanego *Ichthyosaura* lub *Mesotriton*. |
| F1247 | Kopalnia Soli „Wieliczka” | Sól pochodzi z miocenu. Od XIII w. do 1772 r. Wieliczka razem z Bochnią tworzyła żupy krakowskie. | Sól pochodzi z miocenu. Od XIII w. do 1772 r. Wieliczka razem z Bochnią wchodziła w skład żup krakowskich. |
| F1249 | Kopalnia Soli Bochnia | Kopalnie w Wieliczce i Bochni tworzą wspólny obiekt UNESCO „Królewskie Kopalnie Soli”. Sól wydobywano tu od XIII w. | Kopalnie w Wieliczce i Bochni należą do wspólnego obiektu UNESCO „Królewskie Kopalnie Soli w Wieliczce i Bochni”. Sól wydobywano tu od XIII w. |
| F1260 | Kopalnia Guido | Kopalnię założył hrabia Guido Henckel von Donnersmarck, który 2 października 1855 r. otrzymał nadanie górnicze. | Kopalnię założył hrabia Guido Henckel von Donnersmarck, który w 1855 r. otrzymał nadanie górnicze. |
| F1261 | Kopalnia Guido | Wydobycie prowadzono na poziomach 170 i 320 m. | Wydobycie prowadzono m.in. na poziomach 170 i 320 m. |
| F1262 | Sztolnia Królowa Luiza | Kompleks to prawie 5 km wyrobisk. Od 14 września 2018 r. działa tu najdłuższy podziemny spływ łodziami w Polsce. | Od 14 września 2018 r. działa tu najdłuższy podziemny spływ łodziami w Polsce. |
| F1263 | Sztolnia Królowa Luiza | Razem z Kopalnią Guido należy do Muzeum Górnictwa Węglowego w Zabrzu, które od 2013 roku tworzy z nimi jedną instytucję. | Razem z Kopalnią Guido należy do Muzeum Górnictwa Węglowego w Zabrzu. W 2013 roku Kopalnię Guido połączono z muzeum w jedną instytucję. |
| F1269 | Projekt Riese — Włodarz | „Riese” („Olbrzym”) to kryptonim wielkiej budowy nowej kwatery Hitlera w Górach Sowich i na zamku Książ. Prace zaczęto prawdopodobnie w październiku 1943 roku i przerwano w 1945 roku, zanim je skończono. | „Riese” („Olbrzym”) to kryptonim wielkiej budowy w Górach Sowich i na zamku Książ. Uważa się, że zamek Książ przygotowywano na jedną z kwater głównych Hitlera. Prace prowadzono w latach 1943–1945 i ich nie ukończono. |
| F1286 | Bunkier kolejowy w Stępinie-Cieszynie | 27 sierpnia 1941 r. przybyli tu koleją Adolf Hitler i Benito Mussolini i spędzili w Stępinie noc. | 27 sierpnia 1941 r. Adolf Hitler i Benito Mussolini przybyli koleją do kwatery głównej „Anlage Süd”. |
| F1295 | Podziemna Trasa Turystyczna w Sandomierzu | W XX w. zapadliska i katastrofy budowlane zagroziły starówce. Do ratowania gruntu wezwano górników z Bytomia. | W XX w. zapadliska i katastrofy budowlane zagroziły starówce. Aby ustabilizować grunt pod budynkami, pracownicy Przedsiębiorstwa Robót Górniczych w Bytomiu prowadzili prace górnicze. |
| F1303 | Toruńskie piwnice i podziemia staromiejskie | Toruńska starówka (z zamkiem krzyżackim) jest od 1997 r. obiektem UNESCO „Średniowieczne miasto Toruń”. | Stare Miasto, Nowe Miasto i zamek krzyżacki w Toruniu są od 1997 r. obiektem UNESCO „Średniowieczny zespół miejski Torunia”. |
| F0604 | Mysikrólik | To **najmniejszy ptak Europy**: waży **4,5–7 g**. Wbrew obiegowej opinii nie jest nim strzyżyk. | To **najmniejszy ptak Europy**: waży **4,5–7 g**. Niektórzy błędnie przypisują ten tytuł strzyżykowi. |
| F0605 | Mysikrólik | Pełne zniesienie, liczące nawet 10–12 jaj, może ważyć około półtora raza więcej niż sama samica. | Całe zniesienie z 10 jaj waży 144% masy ciała samicy (przy założeniu, że samica waży 5 g). |
| F0617 | Sokół wędrowny | W locie nurkowym przekracza **320 km/h**. To najszybciej poruszający się organizm na Ziemi. | W locie nurkowym potrafi przekroczyć **320 km/h**. To najszybciej poruszający się organizm na Ziemi. |
| F0620 | Szlamnik | Podgatunek baueri leci jesienią z Alaski do Nowej Zelandii i wschodniej Australii nad Pacyfikiem, bez lądowania i bez żerowania. To najdłuższa znana wędrówka ptaka bez przerwy na odpoczynek i jedzenie: w 2022 roku młody ptak przeleciał około 13 560 km z Alaski na Tasmanię w 11 dni. | Podgatunek baueri leci z Alaski do Nowej Zelandii i wschodniej Australii nad Pacyfikiem, bez lądowania i bez żerowania. To najdłuższa znana wędrówka ptaka bez przerwy na odpoczynek i jedzenie: w 2022 roku młody ptak przeleciał co najmniej 13 560 km z Alaski na Tasmanię w 11 dni i 1 godzinę. |
| F0644 | Zimorodek | Gniazduje w **norze wykopanej w stromym brzegu**. Polską nazwę próbowano wywodzić od „ziemiorodek”, czyli „rodzący się w ziemi”. | Gniazduje w **norze wykopanej w stromym brzegu**. Polską nazwę próbowano wywodzić od „ziemio-rodek”, czyli „rodzący się w ziemi”. |
| F0672 | Szablodziób | W Polsce lęgi zdarzają się wyjątkowo, a w 2023 r. na sztucznej wyspie na Zalewie Szczecińskim gniazdowało aż **25 par**, co jak na polskie warunki jest dużą liczbą. | W Polsce lęgi zdarzają się wyjątkowo, a w 2023 r. na Zalewie Szczecińskim gniazdowało aż **25 par**. |
| F1081 | Pustynia Błędowska | Piaski i żwiry nanosiły do doliny kolejne zlodowacenia epoki lodowej. Ich warstwa ma miejscami nawet 70 m grubości. | Piaski i żwiry nanosiły do doliny kolejne zlodowacenia epoki lodowej. Warstwa piasków ma miejscami nawet 70 m grubości. |
| F1082 | Ruchome wydmy Słowińskiego Parku Narodowego | Wydma Łącka, zwana też Łącką Górą, wznosi się na ok. 40–42 m n.p.m. To najbardziej znana ruchoma wydma w Polsce i jedna z najwyższych na polskim wybrzeżu. | Wydma Łącka, zwana też Łącką Górą, wznosi się nawet na 42 m n.p.m. To ruchoma wydma i jedna z najwyższych wydm w Polsce. |
| F1085 | Krzywy Las | Zasadzono je w latach 30. XX w. (prawdopodobnie w 1934 r.). Najpopularniejsza teoria mówi, że celowo hodowano „krzywulce” do stolarki lub szkutnictwa. Pewności nie ma. | Zasadzono je w latach 30. XX w. (prawdopodobnie w 1934 r.). Najbardziej znana teoria mówi, że celowo hodowano „krzywulce” do stolarki lub szkutnictwa. Pewności nie ma. |
| F1090 | Klify Wolińskiego Parku Narodowego | Najwyższe aktywne klify WPN mają do 93 m wysokości (Gosań). | Najwyższe aktywne klify WPN osiągają wysokość 95 m. |
| F1100 | Jezioro Hańcza | To najgłębsze jezioro Polski i całej środkowej części Niżu Europejskiego. Najczęściej podaje się 108,5 m. Inne źródła i pomiary dają od około 105 do 113 m. | To najgłębsze jezioro Polski i całej środkowej części Niżu Europejskiego. Najczęściej podaje się 108,5 m. Inne źródła i pomiary dają od 105,55 do 113 m. |
| F1128 | Jezioro Turkusowe | Ma 6,74 ha i 21,2 m głębokości. Lustro wody leży 2,6 m n.p.m., więc dno to kryptodepresja (18,6 m p.p.m.). | Ma 6,74 ha i 21,2 m głębokości. Lustro wody leży 2,6 m n.p.m., więc jezioro tworzy kryptodepresję (18,6 m p.p.m.). |
| F1164 | Głazowisko Bachanowo nad Czarną Hańczą | Rezerwat utworzono 27 października 1972 r. | Rezerwat utworzono zarządzeniem z 27 października 1972 r. |
| F1179 | Sokołowsko — Dolnośląskie Davos | W 1854 r. uzdrowisko przejął dr Hermann Brehmer i w latach 1854–1855 uruchomił tu sanatorium dla chorych na gruźlicę, powszechnie uważane za pierwsze takie na świecie. Leczono w nim klimatem i dietą. | W 1854 r. uzdrowisko przejął dr Hermann Brehmer. Uruchomił tu sanatorium dla chorych na gruźlicę, powszechnie uważane za pierwsze takie na świecie. Leczono w nim klimatem i dietą. |
| F0444 | Piskorz | **Oddycha jelitem!** Połyka powietrze przy powierzchni, tlen wchłaniają naczynia krwionośne w jelicie, a resztę wydala odbytem. | **Potrafi oddychać jelitem!** Gdy w wodzie jest mało tlenu, połyka powietrze przy powierzchni, tlen wchłaniają naczynia krwionośne w jelicie, a resztę wydala odbytem. |
| F0500 | Zębacz pasiasty | Za stożkowatymi zębami w szczęce górnej ma **trzy rzędy zębów miażdżących**, a w dolnej dwa rzędy zębów trzonowych, którymi radzi sobie z krabami i jeżowcami. | Za stożkowatymi zębami w szczęce górnej ma **trzy rzędy zębów miażdżących**, a w dolnej dwa rzędy zębów trzonowych. Silnymi szczękami zjada m.in. kraby i jeżowce. |
| F0505 | Wstęgor królewski | To najdłuższa ryba kostnoszkieletowa świata: rekordowe, wiarygodnie zmierzone okazy miały około 8 m, a niepotwierdzone doniesienia mówią nawet o 11 m. Zwykle osiąga około 3 m. | To najdłuższa ryba kostnoszkieletowa świata: jej rekordowa długość to około 7–8 m, a być może nawet do 11 m. Zwykle osiąga około 3 m. |
| F0957 | Karbońskie lasy węglowe | Sygilarie (ponad 20 m) były bardzo pospolite w górnym karbonie Polski, m.in. na Górnym Śląsku i koło Wałbrzycha. | Sygilarie (do ponad 20 m wysokości) były bardzo pospolite w górnym karbonie Polski, m.in. na Górnym Śląsku i w rejonie Wałbrzycha. |
| F0959 | Smok wawelski | Szczątki pochodzą z cegielni w Lisowicach koło Lublińca. Osady datuje się na przełom noryku i retyku (205–200 mln lat). | Szczątki pochodzą z cegielni w Lisowicach koło Lublińca. Osady datuje się na przełom noryku i retyku. |
| F1017 | Niedźwiedzie jaskiniowe z Kletna | ⏳ Niedźwiedź jaskiniowy wymarł pod koniec ostatniej epoki lodowej, ok. 28 tys. lat temu. | ⏳ Niedźwiedź jaskiniowy wymarł pod koniec ostatniej epoki lodowej. |
| F0699 | Ryjówka aksamitna | To jeden z rzadkich **jadowitych ssaków**. Codziennie zjada pokarm o masie 80–90% swojego ciała, jedząc co 2–3 godziny. | To jeden z rzadkich **jadowitych ssaków**. Je co 2–3 godziny. |
| F0710 | Rzęsorek mniejszy | Badania genetyczne podzieliły dawny gatunek na dwa. Nazwa *N. anomalus* oznacza dziś **rzęsorka iberyjskiego**, a środkowoeuropejskie rzęsorki to *N. milleri*. | Badania genetyczne podzieliły dawny gatunek na dwa. Nazwa *N. anomalus* oznacza dziś **gatunek iberyjski**, a ten żyjący w Polsce to *N. milleri*. |
| F0722 | Nocek łydkowłosy | Poluje nad spokojną wodą: kanałami, rzekami i jeziorami. Rekordowy osobnik dożył **20,5 roku**. | Poluje nad **spokojną wodą**: kanałami, rzekami i jeziorami. |
| F0727 | Nocek Natterera | Brzeg błony ogonowej ma porośnięty **dwoma rzędami sztywnych, haczykowatych włosów**. To jego cecha rozpoznawcza. | Brzeg błony ogonowej ma porośnięty **dwoma rzędami sztywnych, haczykowatych włosów**. To jedna z jego cech rozpoznawczych. |
| F0741 | Orzesznica leszczynowa | Dorosła orzesznica waży około 20 g, ale jesienią, przed snem zimowym (od października do kwietnia), jej masa może się nawet podwoić. | Jesienią, tuż przed snem zimowym (od października do kwietnia), masa orzesznicy leszczynowej rośnie do 30–40 g. |
| F0780 | Szarytka morska | Na początku XX w. w Bałtyku żyło około 100 tys. szarytek; masowe polowania zmniejszyły ich liczbę do około 20 tys. w latach 40., a przez DDT i PCB w latach 70. zostało ich mniej niż 3 tys. Dziś liczebność **powoli rośnie**. | Na początku XX w. w Bałtyku żyło około 100 tys. szarytek; masowe polowania i przyłów w sieciach rybackich zmniejszyły ich liczbę do około 20 tys. w latach 40., a przez DDT i PCB w latach 70. zostało ich **mniej niż 3 tys.** |
| F1380 | Zamek Krzyżtopór | Rezydencję otoczoną bastionami zbudował w latach 1621–1644 wojewoda Krzysztof Ossoliński. | Rezydencję otoczoną bastionami zbudował wojewoda Krzysztof Ossoliński. Budowę ukończono w 1644 roku. |
| F1381 | Zamek Krzyżtopór | Była jedną z największych rezydencji pałacowych XVII-wiecznej Europy. | Była to jedna z największych budowli pałacowych w Europie przed powstaniem Wersalu. |
| F1384 | Zamek w Malborku | Wielki Refektarz (zbudowany w drugiej ćwierci XIV w., ok. 30 × 15 m) był największym wnętrzem w świeckiej architekturze zakonu krzyżackiego. Jego sklepienie wspiera się na trzech smukłych granitowych filarach. | Wielki Refektarz (zbudowany ok. 1320–1337, 30,3 × 15,3 m) był największym świeckim pomieszczeniem w państwie zakonu krzyżackiego. Jego sklepienie wspiera się na trzech granitowych filarach. |
| F1415 | Zamek Tenczyn w Rudnie | Przyjmuje się, że pierwszy, drewniany zamek zbudował ok. 1319 r. kasztelan krakowski Nawój z Morawicy. Od jego imienia nazwano „Wieżę Nawojową”. | Przyjmuje się, że pierwszy, drewniany zamek zbudował ok. 1319 r. kasztelan krakowski Nawój z Morawicy. Wzniósł też zamkową wieżę, zwaną do dziś „Wieżą Nawojową”. |
| F1416 | Mysia Wieża | Ceglaną wieżę zbudował ok. 1350 r. Kazimierz Wielki. Razem z resztkami murów i piwnic jest pozostałością zamku w Kruszwicy, a zarazem jego najlepiej zachowaną częścią. | Ceglaną wieżę zbudował ok. 1350 r. Kazimierz Wielki. Jest pozostałością zamku w Kruszwicy. |
| F1428 | Twierdza Osowiec | Nigdy jej nie zdobyto. Obrona z 1915 r. przeszła do historii jako „atak umarłych”. | W I wojnie światowej jej nie zdobyto. Obrona z 1915 r. przeszła do historii jako „atak umarłych”. |
| F1439 | Pałac w Kopicach | To pałac w ruinie: podpalony w 1956 roku, potem rozgrabiony i zdewastowany, a później zabezpieczony tylko prowizorycznie. | To pałac w ruinie: podpalony w 1956 roku, potem rozgrabiony i zdewastowany, a później zabezpieczony prowizorycznie. |

## Dopisane źródła (16 ciekawostek z `checked` na `verified`)

| Id | Karta | Dopisane źródło |
| --- | --- | --- |
| F1187 | Kościół Pokoju w Świdnicy | [zabytek.pl](https://zabytek.pl/en/obiekty/jawor-jawor-kosciol-ewangelicko-augsburski-pw-ducha-swietego) |
| F1194 | Kościół św. Michała Archanioła w Binarowej | [Wikipedia (PL)](https://pl.wikipedia.org/wiki/Ko%C5%9Bci%C3%B3%C5%82_%C5%9Bw._Micha%C5%82a_Archanio%C5%82a_w_Binarowej) |
| F1204 | Cerkiew św. Paraskewii w Kwiatoniu | [Wikipedia (EN)](https://en.wikipedia.org/wiki/Wooden_Tserkvas_of_the_Carpathian_Region_in_Poland_and_Ukraine), [Wikipedia (PL)](https://pl.wikipedia.org/wiki/Drewniane_cerkwie_w_polskim_i_ukrai%C5%84skim_regionie_Karpat) |
| F0323 | Dąb Bolko | [Wikipedia (DE)](https://de.wikipedia.org/wiki/Europ%C3%A4ischer_Baum_des_Jahres) |
| F0818 | Celestyn z Machowa | [Wikipedia (EN)](https://en.wikipedia.org/wiki/Celestine_(mineral)) |
| F0859 | Galena z rejonu Olkusza | [Wikipedia (PL)](https://pl.wikipedia.org/wiki/Kopalnia_rud_o%C5%82owiu,_srebra_i_cynku_wraz_z_systemem_gospodarowania_wodami_podziemnymi_w_Tarnowskich_G%C3%B3rach) |
| F1232 | Kościół św. Marcina w Grywałdzie | [Wikipedia (PL)](https://pl.wikipedia.org/wiki/Ko%C5%9Bci%C3%B3%C5%82_%C5%9Bw._Marcina_w_Grywa%C5%82dzie) (zamiast linku z literówką w tytule) |
| F1048 | Park Gwiezdnego Nieba „Bieszczady” | [Wikipedia (PL)](https://pl.wikipedia.org/wiki/Park_Gwiezdnego_Nieba_%E2%80%9EBieszczady%E2%80%9D) |
| F0958 | Smok wawelski | [Wikipedia (EN)](https://en.wikipedia.org/wiki/Smok_wawelski) |
| F1058 | Miraż górny nad Bałtykiem | [Wikipedia (EN)](https://en.wikipedia.org/wiki/Hillingar_effect), [Wikipedia (EN)](https://en.wikipedia.org/wiki/Mirage) |
| F1317 | Hala Stulecia | [Wikipedia (PL)](https://pl.wikipedia.org/wiki/Hala_Stulecia_we_Wroc%C5%82awiu) |
| F1475 | Auschwitz-Birkenau | [Wikipedia (PL)](https://pl.wikipedia.org/wiki/Auschwitz-Birkenau) |
| F1477 | Auschwitz-Birkenau | [Wikipedia (PL)](https://pl.wikipedia.org/wiki/Pa%C5%84stwowe_Muzeum_Auschwitz-Birkenau_w_O%C5%9Bwi%C4%99cimiu) |
| F0808 | Krzemień pasiasty | [Wikipedia (PL)](https://pl.wikipedia.org/wiki/Krzemionki) |
| F0936 | Krzemionki | [Wikipedia (EN)](https://en.wikipedia.org/wiki/Krzemionki), [Wikipedia (PL)](https://pl.wikipedia.org/wiki/Krzemionki) |
| F1114 | Skrzyżowanie Wełny i Nielby | [Wikipedia (PL)](https://pl.wikipedia.org/wiki/Skrzy%C5%BCowanie_We%C5%82ny_z_Nielb%C4%85) |

## Poprawki kart

Przegląd sprawdził też karty poprawionych ciekawostek. Cztery karty mówiły to, co poprawka usunęła z ciekawostki. Poprawiono je po polsku i po angielsku:
- **Smardz jadalny:** w polu bezpieczeństwa tylko „pod ochroną częściową”, bez zakresu ochrony, którego źródła nie podają dla tego gatunku.
- **Kościół w Bliznem:** podpis pod nazwą „kościół o charakterze obronnym” zamiast „warowny krajobraz wsi”.
- **Piskorz:** „potrafi oddychać jelitowo” zamiast „oddycha jelitowo”.
- **Kraina Otwartych Okiennic:** poprawny dopełniacz „Soc” zamiast „Socec”.

## Drugie podejście: nowo dopuszczone strony (1.11.2026)

Po pierwszym podejściu Robert dopuścił kolejne strony: `eli.gov.pl` (pełne teksty ustaw i rozporządzeń), `msaweb.org`, `acta-zoologica-bulgarica.eu` i `doi.org`. Przy 16 z 83 ciekawostek `checked` któreś źródło dało się wtedy przeczytać. Sprawdzono je tak samo jak w pierwszym podejściu: dwa niezależne odczyty, a trzeci przy sporach i poprawkach. Czytelne źródło spoza listy, wskazane przez odczyty, sprawdziły jeszcze dwa niezależne odczyty. Tym razem ciekawostka mogła dostać `verified` także wtedy, gdy dopisane źródło mówi wszystko razem z czytelnymi źródłami, które już przy niej były. Oba odczyty musiały to potwierdzić cytatami. Na koniec niezależny przegląd sprawdził cztery poprawki, kartę żołędnicy i wszystkie 10 nowych `verified`.

| Id | Karta | Wynik | Rozstrzygające źródło |
| --- | --- | --- | --- |
| F0093 | Berłóweczka zimowa | `verified` | Dz.U. 2014 poz. 1408 (eli.gov.pl), Wikipedia (PL) |
| F0237 | Obuwik pospolity | `verified` | Dz.U. 2014 poz. 1409 (eli.gov.pl), Wikipedia (PL) |
| F0278 | Podejźrzon księżycowy | `verified` | Dz.U. 2014 poz. 1409 (eli.gov.pl), Wikipedia (PL) |
| F0798 | Skandiowinchit | `verified` | streszczenie artykułu w „American Mineralogist” (msaweb.org) |
| F0646 | Żołna | `verified` | dopisany tekst jednolity rozporządzenia w sprawie ochrony gatunkowej zwierząt (Dz.U. 2022 poz. 2380) z eli.gov.pl; ten sam tekst na `api.sejm.gov.pl` jest zablokowany |
| F0721 | Nocek łydkowłosy | `verified` | jak przy F0646 |
| F0016 | Czarka austriacka | `verified` | dopisane: Wikipedia (PL) „Czarka austriacka” i Dz.U. 2004 nr 168 poz. 1765 |
| F0134 | Muchomor czerwony | `verified` | dopisane: Wikipedia (PL) „Muchomor czerwony” i tekst Dz.U. 2025 poz. 598 (eli.gov.pl) |
| F1367 | Stocznia Gdańska — suwnice i bramy | `verified` | dopisane: Wikipedia (PL) „Grudzień 1970” i polska wersja strony zabytek.pl |
| F1412 | Zamki Mirów i Bobolice | `verified` | dopisane: Wikipedia (PL) „Zamek w Bobolicach” |
| F0052 | Siedzuń sosnowy | `corrected` | niżej |
| F0791 | Taliomelan | `corrected` | niżej |
| F0797 | Skandiowinchit | `corrected` | niżej |
| F0747 | Żołędnica europejska | `corrected` | niżej |
| F0796 | Skandiowinchit | zostaje `checked` | streszczenie nie podaje, że IMA zatwierdziła minerał w 2022 r.; `doi.org` przekierowuje do zablokowanej strony wydawnictwa |
| F0680 | Wodniczka | zostaje `checked` | żadne czytelne źródło nie mówi o spadku liczebności nad Biebrzą w ostatnich latach (`otop.org.pl` jest zablokowane) |

### Poprawione brzmienie (4)

| Id | Karta | Było | Jest | Dlaczego |
| --- | --- | --- | --- | --- |
| F0052 | Siedzuń sosnowy | Od 1990 r. był ściśle chroniony, ale 9.10.2014 r. **wykreślono go z listy**. Chroniony częściowo jest za to jego krewny, siedzuń dębowy (*S. brevipes*). | Był ściśle chroniony, ale 9.10.2014 r. **wykreślono go z listy**. Chroniony częściowo jest za to jego krewny, siedzuń dębowy (*S. brevipes*). | Rok 1990 podaje tylko Wikipedia, a jej przypis prowadzi do rozporządzenia z 2004 r., które o 1990 r. nie mówi. Rozporządzenia z 1983 r. (Dz.U. 1983 nr 27 poz. 134) i z 1995 r. (Dz.U. 1995 nr 41 poz. 214) chroniły go już wcześniej. Dopisano rozporządzenie z 2004 r., które obowiązywało do 2014 r. i wymienia wśród grzybów pod ochroną ścisłą wszystkie gatunki rodzaju *Sparassis* (wtedy pod nazwą „szmaciak”). |
| F0791 | Taliomelan | Tworzy włókniste skupienia mniejsze niż 50 μm. Powstał w przedlodowcowej strefie utleniania, w klimacie półsuchym lub suchym. | Tworzy włókniste skupienia mniejsze niż 50 μm. Powstał w przedlodowcowej strefie utleniania, najprawdopodobniej w klimacie półsuchym lub suchym. | Streszczenie podaje klimat jako prawdopodobny („most probably”). |
| F0797 | Skandiowinchit | Jest naprawdę mikro: pojedynczy kryształ ma ok. 20 × 8 μm, a skupienia do 50 μm. Dlatego nie dało się zmierzyć jego barwy. | Jest naprawdę mikro: pojedynczy kryształ ma ok. 20 × 8 μm, a skupienia do 50 μm. Przez tak małe kryształy i skąpość materiału nie dało się zmierzyć jego barwy. | Streszczenie podaje dwie przyczyny: skąpość materiału i wyjątkowo małe kryształy. |
| F0747 | Żołędnica europejska | W Polsce uznawana obecnie za gatunek wymarły: ostatnia wiarygodna obserwacja pochodzi z 1961 r. z rejonu Babiej Góry. W Holandii w 2007 r. znaleziono już tylko 9 osobników. | Analizy opublikowane w 2024 r. wskazują, że gatunek wymarł w Polsce: ostatnia wiarygodna obserwacja pochodzi z 1961 r. z rejonu Babiej Góry. W Holandii badacze podali w 2007 r., że w dwóch lasach w prowincji Limburgia znaleźli już tylko 9 osobników. | niżej |

Przegląd znalazł na karcie „Siedzuń sosnowy” to samo, co poprawka F0052 usunęła z ciekawostki: „Od 1990 do 2014 r. gatunek był pod ochroną ścisłą.” Teraz karta mówi „Do 2014 r. gatunek był pod ochroną ścisłą.” (po angielsku „Until 2014 the species was strictly protected.”).

### Żołędnica (F0747): sprawa z pierwszego podejścia rozstrzygnięta

Praca z 2024 r. („Acta Zoologica Bulgarica”, Suppl. 19) otwiera się teraz. Podaje:
- ostatnia wiarygodna informacja o żołędnicy w Polsce pochodzi z 1961 r. ze wsi Zawoja u stóp Babiej Góry i od tamtej pory wiarygodnych informacji nie ma;
- „Our analyses indicate that the garden dormouse is now extinct in Poland”, czyli wymarcie to wniosek autorów;
- najnowsza „Czerwona lista kręgowców Polski” (Głowaciński 2022) utrzymała kategorię CR (krytycznie zagrożony), choć według autorów nowe analizy jej nie potwierdzają.

„Uznawana obecnie za gatunek wymarły” było więc za mocne, bo oficjalna kategoria tak nie mówi. Ciekawostka mówi teraz, że według analiz opublikowanych w 2024 r. gatunek w Polsce wymarł. Zdanie o Holandii trzyma się angielskiej Wikipedii: w 2007 r. badacze podali, że w dwóch lasach w Limburgii znaleźli 9 osobników. Polską Wikipedię usunięto ze źródeł F0747, bo pisze, że żołędnica „w Polsce występuje tylko na terenach Babiogórskiego Parku Narodowego”, a to przeczy pracy z 2024 r.

Karta „Żołędnica europejska” mówiła to samo. Poprawiono ją po polsku i po angielsku:
- `quiz_angle`: „gatunek uznawany w Polsce za wymarły” → „brak wiarygodnej obserwacji w Polsce od 1961 r.”;
- `region_pl`: „W Polsce uznawana obecnie za gatunek wymarły; ostatnia wiarygodna obserwacja pochodzi z 1961 r. z rejonu Babiej Góry.” → „Ostatnia wiarygodna obserwacja w Polsce pochodzi z 1961 r. z rejonu Babiej Góry; według analiz opublikowanych w 2024 r. gatunek w Polsce wymarł.”

Zdanie karty, że prawo nadal obejmuje żołędnicę ochroną ścisłą ze strefą ochrony, potwierdza tekst jednolity rozporządzenia w sprawie ochrony gatunkowej zwierząt (Dz.U. 2022 poz. 2380, załączniki nr 1 i 4). Zostaje bez zmian.

Po drugim podejściu atlas miał 1458 ciekawostek: 856 `verified`, 533 `corrected` i 69 `checked`.

## Trzecie podejście: `cambridge.org` (1.11.2026)

Potem Robert dopuścił `www.cambridge.org` i `pubs.geoscienceworld.org`. Strony Cambridge się otwierają: artykuły w „Mineralogical Magazine” i „Mycologist” oraz rozdział książki o glorii. `pubs.geoscienceworld.org` odpowiada każdemu zapytaniu spoza przeglądarki stroną Cloudflare „Enable JavaScript and cookies” (błąd 403), więc tamte źródła nadal są nieczytelne. Tej blokady nie obchodzono.

Źródła na tych stronach miało 12 ciekawostek `checked`. Sprawdzono je tak samo jak wcześniej: dwa niezależne odczyty, a trzeci przy sporach i poprawkach. Źródło dopisano tylko tam, gdzie oba odczyty potwierdziły cytatami, że razem z czytelnymi źródłami ciekawostki mówi ono wszystko. Najczęściej był to biuletyn komisji nowych minerałów IMA (CNMNC Newsletter) w „Mineralogical Magazine”. Podaje on numer IMA, wzór i miejsce typowe nowego minerału.

| Id | Karta | Wynik | Rozstrzygające źródło |
| --- | --- | --- | --- |
| F0787 | Żabińskiit | `verified` | artykuł w „Mineralogical Magazine” (2016); dopisany CNMNC Newsletter 26 (IMA 2015-033) |
| F0793 | Heflikit | `verified` | artykuł w „Mineralogical Magazine” (2023) |
| F0799 | Berylokordieryt-Na | `verified` | CNMNC Newsletter 72 |
| F0800 | Berylokordieryt-Na | `verified` | CNMNC Newsletter 72 |
| F0790 | Taliomelan | `verified` | dopisane: streszczenie artykułu w „American Mineralogist” (msaweb.org) i CNMNC Newsletter 52 („In a quarry at the Zalas village, near Cracow”) |
| F0796 | Skandiowinchit | `verified` | dopisany CNMNC Newsletter 67: IMA 2022-009 wśród minerałów zatwierdzonych w maju 2022 r.; reszta jest w streszczeniu na msaweb.org |
| F0788 | Żabińskiit | `corrected` | niżej |
| F1019 | Widmo Brockenu | `corrected` | niżej |
| F0789 | Żabińskiit | zostaje `checked` | czytelne źródła nie mówią, kogo upamiętnia nazwa minerału; `muzmin.uwr.edu.pl` jest zablokowane |
| F0792 | Taliomelan | zostaje `checked` | toksyczność talu potwierdza Wikipedia, ale „to minerał do laboratorium, nie do kieszeni” to wniosek, którego żadne źródło nie mówi; `zpe.gov.pl` jest zablokowane |
| F0801 | Sachanbińskiit | zostaje `checked` | dopisany CNMNC Newsletter 72 potwierdza wzór, numer IMA i Szklary, ale nie mówi wprost, że to manganowy „brat” berylokordierytu-Na |
| F0004 | Sromotnik smrodliwy | zostaje `checked` | artykuł w „Mycologist” potwierdza model z 2004 r., asfalt i 1,33 kN/m²; tempa 1–15 cm na godzinę według Uniwersytetu Oksfordzkiego nie da się sprawdzić, bo strona jest zablokowana |

### Poprawione brzmienie (2)

| Id | Karta | Było | Jest | Dlaczego |
| --- | --- | --- | --- | --- |
| F0788 | Żabińskiit | … Występuje razem z tytanitami bogatymi w glin, tantal i niob, … | … Występuje razem z tytanitami zawierającymi glin, tantal i niob, … | W źródle tytanity są „(Al,Ta,Nb)-bearing”, czyli zawierają te pierwiastki. „Bogate” to więcej, niż mówi źródło. |
| F1019 | Widmo Brockenu | … Podobny cień otoczony tęczową obwódką opisali jednak już wcześniej, w połowie XVIII w., Pierre Bouguer i Antonio de Ulloa w Andach. | … Podobny cień otoczony tęczową obwódką zaobserwowali jednak już wcześniej, w latach 1737–1739, Pierre Bouguer i Antonio de Ulloa w Andach. | Rozdział o glorii (Cambridge) datuje te obserwacje na lata 1737–1739. Żadne czytelne źródło nie datuje ich opisu. Dopisano Wikipedię (EN i DE): niemiecka mówi, że Silberschlag opisał zjawisko na Brockenie. |

Karty tych ciekawostek nie powtarzają poprawionych sformułowań.

### Uzupełnienie: F0801 i karta „Berylokordieryt-Na”

Robert przesłał PDF strony z „Elements” (20(2): 134, kwiecień 2024), na którą prowadzi źródło F0801; sama strona jest za blokadą Cloudflare. Dwa niezależne odczyty i rozstrzygnięcie trzeciego:
- Strona potwierdza wzór NaMn₄(Al₅Be)(AlSi₅O₁₈)₂·2H₂O, numer IMA 2022-109 i pokrewieństwo z kordierytem, ale nie porównuje minerału z berylokordierytem-Na. „Manganowy »brat« berylokordierytu-Na” to więc nasz wniosek z dwóch wzorów.
- Biuletyn CNMNC nr 87 (Mineralogical Magazine 89, 26 września 2025 r., doi:10.1180/mgm.2025.10163): „The minerals avdeevite and beryllocordierite-Na have been discredited; beryllosachanbińskiite-Na has been redefined to sachanbińskiite”. Berylokordieryt-Na nie jest już uznanym minerałem.
- F0801 (`corrected`, dopisany biuletyn nr 87): „Zatwierdzony przez IMA jako berylosachanbińskiit-Na: NaMn₄(Al₅Be)(AlSi₅O₁₈)₂·2H₂O (IMA 2022-109). Miejsce typowe: pegmatyt koło Szklar.”

Karta „Sachanbińskiit” już wcześniej podawała zmianę nazwy z 2025 r. Karta „Berylokordieryt-Na” przedstawiała natomiast zdyskredytowany minerał jako nowy. Decyzją Roberta karta wychodzi z atlasu (`WITHDRAWN.cards` w `data/collections.js`, z powodem). Szuflada „Minerały” ma teraz 32 karty. Dwie ciekawostki tej karty (F0799, F0800) zostają w pliku, ale strona ich nie pokazuje.

## Po trzecim podejściu: 60 `checked`

Źródła, które je potwierdziły, nie otwierały się stąd, a czytelne strony nie mówiły wszystkiego. Najwięcej było ich w szufladach „Skamieniałości” (15) i „Minerały” (6). Potrzebowały stron z 93 różnych adresów, każdy dla jednej albo dwóch ciekawostek (m.in. `mindat.org`, `ejm.copernicus.org`, `journals.plos.org`, `pmc.ncbi.nlm.nih.gov`, `tandfonline.com`, `pubs.geoscienceworld.org`, portale informacyjne). Sprawdzono je w czwartym podejściu, [niżej](#czwarte-podejście-teksty-stron-od-roberta-2112026).

Po trzecim podejściu atlas miał 1456 ciekawostek na 627 kartach: 860 `verified`, 536 `corrected` i 60 `checked`. Dwie ciekawostki wycofanej karty „Berylokordieryt-Na” zostają w pliku jako ukryte.

## Czwarte podejście: teksty stron od Roberta (2.11.2026)

Strony źródeł tych 60 ciekawostek pobrano 2.11.2026 poza tym środowiskiem, z pomocą narzędzia Grok, i przekazano tu jako 136 plików tekstowych razem z raportem Groka. Każdy plik zaczyna się od adresu strony, daty i sposobu pobrania: 102 pliki to tekst pobranej strony (curl), 28 to strona przerobiona na tekst przez serwis pobierający (26 Exa, 2 Bright Data), a 6 to kopie tego samego adresu z Wayback Machine (zrzuty z lat 2023–2026). Część plików to strony spoza listy źródeł, wskazane przez Groka jako zastępcze.

**Czy teksty są wierne.** Dwie z tych stron otwierają się także stąd: artykuł P. E. Ahlberga z `cambridge.org` i strona Ministerstwa Kultury o Krzemionkach na `gov.pl`. Ich teksty od Roberta zgadzają się z pobraniem stąd zdanie po zdaniu (1722 z 1722 i 51 z 51 zdań). Zarządzenie RDOŚ w Katowicach z 2017 r. (`gov.pl`) to skan bez warstwy tekstowej, a Grok przepisał tylko jego fragment. Obie strony skanu przepisano więc tu z obrazu i tego tekstu użyto. Pozostałych stron nie da się stąd porównać z oryginałem. W tabeli `verified` niżej zaznaczono, gdzie rozstrzyga tekst z serwisu pobierającego albo kopia z Wayback Machine.

**Jak sprawdzono.** Tak samo jak wcześniej: dwa niezależne odczyty, zdanie po zdaniu, po polsku i po angielsku. Trzeci odczyt (sędzia) rozstrzygał każdą proponowaną zmianę, każdy spór i 21 ciekawostek, przy których raport Groka miał uwagi. Wnioski z raportu o niczym nie przesądzały: sędzia sprawdzał każdą uwagę w tekstach stron. Skrypt potwierdził, że każdy z 257 cytatów, na których opierają się zmiany, jest w pliku źródła. Stronę spoza listy dopisywano tylko wtedy, gdy oba odczyty i sędzia potwierdzili ją cytatem i uznali za wiarygodną (urząd, czasopismo naukowe, baza danych, muzeum, park, poważna gazeta). Prywatnego bloga wskazanego przez Groka nie dopisano. Na koniec niezależny przegląd sprawdził wszystkie 57 zmian i ich karty. Każde zgłoszenie sprawdził sceptyczny odczyt: z 8 zgłoszeń potwierdził 5 i te wprowadzono (F0503, F0680 oraz trzy poprawki na dwóch kartach, niżej).

| Szuflada | Ciekawostek | `verified` | `corrected` | zostaje `checked` |
| --- | --- | --- | --- | --- |
| Skamieniałości | 15 | 9 | 6 | 0 |
| Minerały | 6 | 5 | 0 | 1 |
| Drzewa | 5 | 4 | 1 | 0 |
| Formacje skalne | 4 | 3 | 0 | 1 |
| Grzyby | 3 | 3 | 0 | 0 |
| Ryby | 3 | 0 | 3 | 0 |
| Ptaki | 3 | 1 | 2 | 0 |
| Atmosfera i astronomia | 3 | 1 | 1 | 1 |
| Rekordy krajobrazu | 3 | 3 | 0 | 0 |
| Płazy i gady | 2 | 1 | 1 | 0 |
| Ssaki | 2 | 2 | 0 | 0 |
| Podziemia | 2 | 1 | 1 | 0 |
| Cuda inżynierii | 2 | 1 | 1 | 0 |
| Twierdze i ruiny | 2 | 2 | 0 | 0 |
| Memento Mori | 2 | 1 | 1 | 0 |
| Rośliny | 1 | 1 | 0 | 0 |
| Owady | 1 | 0 | 1 | 0 |
| Architektura drewniana | 1 | 1 | 0 | 0 |
| **Razem** | **60** | **39** | **18** | **3** |

### `verified` (39)

| Id | Karta | Źródła, które mówią wszystko | Tekst z serwisu pobierającego albo z archiwum |
| --- | --- | --- | --- |
| F0004 | Sromotnik smrodliwy | `herbaria.plants.ox.ac.uk`, `en.wikipedia.org`, `cambridge.org` | – |
| F0012 | Sromotnik fiołkowy | `encyclopedia.odeuropa.eu` | – |
| F0172 | Łycznik ochrowy | `cdnsciencepub.com`, `en.wikipedia.org` | `cdnsciencepub.com` (Exa) |
| F0234 | Dwulistnik pszczeli | `gov.pl`, `pressto.amu.edu.pl`, `pl.wikipedia.org` | – |
| F0297 | Sosna na Szczudłach | `echodnia.eu` | – |
| F0299 | Krzywy Las | `gryfino.szczecin.lasy.gov.pl`, `pl.wikipedia.org` | – |
| F0332 | Drzewostan Sosnowy w Ościsłowie | `pomniki-przyrody.pl`, `ipn.gov.pl` | – |
| F0343 | Lipa w Stroniu Śląskim | `pomniki-przyrody.pl` | – |
| F0525 | Salamandra plamista | `polsatnews.pl`, `pl.wikipedia.org`, `liverpoolmuseums.org.uk`, `national-geographic.pl` | – |
| F0674 | Pluszcz | `pl.wikipedia.org`, `anatomypubs.onlinelibrary.wiley.com`, `birdsoftheworld.org` | `anatomypubs.onlinelibrary.wiley.com` (Wayback Machine) |
| F0751 | Bóbr europejski | `sulecin.szczecin.lasy.gov.pl`, `zolopole.lasy.gov.pl` | – |
| F0761 | Jenot azjatycki | `legislation.gov.uk`, `eur-lex.europa.eu`, `pl.wikipedia.org` | `eur-lex.europa.eu` (Wayback Machine) |
| F0789 | Żabińskiit | `mindat.org`, `handbookofmineralogy.org`, `muzmin.uwr.edu.pl` | `mindat.org` (Exa) |
| F0803 | Sachanbińskiit | `athena.unige.ch` | – |
| F0804 | Magnesiodutrowit | `mindat.org`, `ejm.copernicus.org` | `mindat.org` (Exa) |
| F0805 | Magnesiodutrowit | `mindat.org` | `mindat.org` (Exa) |
| F0816 | Haueryt z Machowa i Jeziórka | `mindat.org`, `en.wikipedia.org` | `mindat.org` (Exa) |
| F0880 | Organy Wielisławskie | `pl.wikipedia.org`, `gorykaczawskie.pl` | – |
| F0918 | Giewont | `z-ne.pl`, `pl.wikipedia.org` | – |
| F0920 | Przełom Białki | `journals.plos.org` | – |
| F0955 | Tropy tetrapodów z Zachełmia | `doi.org`, `cambridge.org`, `media.springernature.com` | `doi.org` (Exa) |
| F0970 | Tropy dinozaurów z Gór Świętokrzyskich | `doi.org`, `researchgate.net` | `doi.org` (Exa), `researchgate.net` (Exa) |
| F0975 | Tropy dinozaurów z Borkowic | `pgi.gov.pl`, `geojournals.pgi.gov.pl` | `pgi.gov.pl` (Bright Data), `geojournals.pgi.gov.pl` (Exa) |
| F0976 | Tropy dinozaurów z Borkowic | `uu.se`, `geojournals.pgi.gov.pl` | `geojournals.pgi.gov.pl` (Exa) |
| F0979 | Plezjozaury Annopola | `paleo.pan.pl`, `orbi.uliege.be` | – |
| F0981 | Krokodylomorfy z Owadowa-Brzezinek | `doi.org`, `muzeumewolucji.pl` | `doi.org` (Wayback Machine) |
| F0984 | Crenatolimulus darwini z Owadowa-Brzezinek | `onlinelibrary.wiley.com` | `onlinelibrary.wiley.com` (Exa) |
| F0987 | Laguna Owadów-Brzezinki | `pmc.ncbi.nlm.nih.gov` | – |
| F0991 | Gigantyczne amonity z Opola | `pl.wikipedia.org`, `naukawpolsce.pl` | – |
| F1069 | Litworowy Kocioł | `pl.wikipedia.org`, `oko.press`, `energetyka24.com`, `radiokrakow.pl` | – |
| F1087 | Sosna na Szczudłach w Wełczu | `radiokielce.pl`, `busko.com.pl` | – |
| F1162 | Organy Wielisławskie | `polska.travel`, `pl.wikipedia.org`, `geopark.org.pl` | `polska.travel` (Wayback Machine), `geopark.org.pl` (Wayback Machine) |
| F1173 | Raczki Elbląskie — dawny najniższy punkt Polski | `geoforum.pl`, `tvn24.pl`, `pl.wikipedia.org`, `wydarzenia.interia.pl` | – |
| F1192 | Kościół św. Michała Archanioła w Dębnie Podhalańskim | `swietokrzyskie.pro`, `pl.wikipedia.org` | – |
| F1252 | Krzemionki Opatowskie | `whc.unesco.org`, `gov.pl` | – |
| F1342 | Wrocławski Węzeł Wodny | `odrapcu.pl` | – |
| F1378 | Zamość | `whc.unesco.org`, `unesco.pl` | – |
| F1404 | Zamek Chojnik | `kpnmab.pl`, `pl.wikipedia.org` | – |
| F1446 | Kaplica Czaszek w Czermnej | `smithsonianmag.com`, `polska.travel` | – |

### Poprawione brzmienie (18)

| Id | Karta | Co się zmieniło i dlaczego |
| --- | --- | --- |
| F0319 | Drzewo z kulą armatnią | „dwór, w którym czasowo mieszkał hetman **Stefan Czarniecki**” zamiast „dwór hetmana”; zamiast „wiek i pochodzenie mają dopiero ustalić archeolodzy”: „nie są pewne. O jej zbadanie poproszono archeologów”. Tak pisze artykuł Urzędu Gminy Włoszczowa (12.11.2025). |
| F0431 | Jelonek rogacz | bez „(zwykle około pięciu)”: źródła podają 2–5 lat (RDLP Poznań), 4–6 (Radio Kielce) i 3–7 (NHM, Wikipedia). |
| F0478 | Ciernik | „u wielu słodkowodnych populacji ciernika” zamiast „u słodkowodnych cierników”; bez „zarodka”. Dopisana praca Chan i in. 2010 (`pmc.ncbi.nlm.nih.gov`, Exa): utrata pasa miednicowego dotyczy ponad dwudziestu populacji słodkowodnych, a enhancer działa w zawiązkach płetw larw. |
| F0483 | Sapa | „Do dorzecza Wisły **przywędrowała Kanałem Dniepr–Bug**.” bez „Angielska Wikipedia podaje” i bez zdania „Warto to potwierdzić w literaturze ichtiologicznej”: FishBase potwierdza tę drogę. |
| F0503 | Lamna śledziowa | HELCOM: dziś bardzo rzadka w Kattegacie, a dalej na południe, w Sundzie, jeszcze rzadsza (wcześniej „tam”, czyli w obu, i „dalej na południe” od obu). Przegląd: „To rekin notowany w rejonie Morza Bałtyckiego.” zamiast „jeden z kilku rekinów”, bo inne rekiny podaje tylko zdanie Wikipedii oznaczone jako bez przypisu. |
| F0588 | Zaskroniec rybołów | „Pierwsza udokumentowana obserwacja” zamiast „Pierwszy współczesny osobnik”: praca Zając i in. 2022 (`ruj.uj.edu.pl`, dopisana) wymienia wcześniejszy, niepotwierdzony okaz z Ludyni (opisany w 1923 r.). |
| F0680 | Wodniczka | zamiast „w ostatnich latach populacja nad Biebrzą wyraźnie spadła”: „Podczas suszy w 2025 roku populacja nad Biebrzą osiągnęła zaledwie 50% normalnej liczebności.” (Biebrzański PN, `bbpn.gov.pl`, dopisany, Exa). Przegląd usunął też „Dzięki ochronie czynnej liczebność przez lata rosła, ale”: GIOŚ i raport OTOP z 2024 r. podają od 2011 r. umiarkowany spadek. |
| F0693 | Mewa delawarska | „a w 2021 roku obserwowano ją w Cleveland” zamiast „ostatni raz widziano ją w Cleveland w grudniu 2021 roku”: miejsce grudniowej obserwacji podaje tylko prywatny blog, a żadne źródło nie mówi, że była ostatnia. Dopisany „The Columbus Dispatch” (`dispatch.com`, Exa): obrączkowanie w Toronto w 1992 r. |
| F0949 | Wczesna flora lądowa dewonu | bez „kompletne” (drzewo złożono z dwóch skamieniałości); „ze stanu Nowy Jork” zamiast „z Nowego Jorku” (Gilboa). |
| F0954 | Tropy tetrapodów z Zachełmia | „najstarszych znanych skamieniałych szczątków czworonogów” zamiast „szkieletów”: „Nature” porównuje z „body fossils”. |
| F0983 | Crenatolimulus darwini z Owadowa-Brzezinek | „co najmniej ośmiu okazów”: praca raz podaje osiem okazów, a raz holotyp i osiem paratypów. |
| F0988 | Laguna Owadów-Brzezinki | „z Owadowa-Brzezinek” zamiast „z Owadowa”: tak nazywa stanowisko praca z 2023 r. |
| F1007 | Skamieniałe drewna Roztocza | „Prusia” zamiast „Prus” (wieś Prusie u Długosza), po angielsku „Prusie” zamiast „Prusy”. |
| F1013 | Kraków-Spadzista i łowcy mamutów | „licząc po żuchwach i dolnych zębach trzonowych” zamiast „licząc po zębach” (Wojtal i in. 2019, Exa). |
| F1047 | Park Gwiezdnego Nieba „Bieszczady” | „Jego nazwa” zamiast „Oficjalna nazwa”: żadne źródło nie nazywa jej oficjalną. Dopisana strona gminy Lutowiska (`lutowiska.pl`, Exa). |
| F1297 | Rynek Podziemny w Krakowie | tylko po angielsku: „classes” zamiast „workshops”, bo muzeum pisze o zajęciach edukacyjnych. |
| F1327 | Mosty Tczewskie | „mostem kratowym” / „lattice-truss bridge” zamiast „kratownicowym” / „truss bridge”: ASCE i NID mówią o pierwszym moście kratowym, a NID wymienia wcześniejsze, mniejsze mosty kratowe. |
| F1459 | Cmentarz Remuh | „od 1533 do 1552 r.” zamiast „do 1551 r.”: broszura Muzeum Krakowa podaje rok założenia 1552. |

### Dopisane źródła (14 przy 12 ciekawostkach)

| Id | Dopisane źródło | Co potwierdza |
| --- | --- | --- |
| F0234 | zarządzenie RDOŚ w Katowicach z 31.10.2017 (`gov.pl`, skan przepisany tu) | uzasadnienie: dwulistnika nie uwzględniono w rozporządzeniu z 9.10.2014 w sprawie ochrony gatunkowej roślin |
| F0299 | Nadleśnictwo Gryfino, „Więcej o Krzywym Lesie” | że pochodzenie krzywych drzew wciąż jest tylko hipotezą |
| F0478 | Chan i in. 2010, „Science” (`pmc.ncbi.nlm.nih.gov`) | enhancer *Pitx1*, kolce i pas miednicowy |
| F0588 | Zając i in. 2022, „Przegląd Przyrodniczy” (`ruj.uj.edu.pl`) | pierwsza udokumentowana obserwacja w 2009 r., rozmnażająca się populacja |
| F0680 | Biebrzański Park Narodowy (`bbpn.gov.pl`) | 50% normalnej liczebności w czasie suszy 2025 r. |
| F0693 | „The Columbus Dispatch” (`dispatch.com`) | obrączkowanie jako pisklę w Toronto w 1992 r. |
| F0789 | `mindat.org` i „Handbook of Mineralogy” | kogo upamiętnia nazwa żabińskiitu i gdzie jest holotyp |
| F0816 | `mindat.org` | opis z 1846 r. i miejsce typowe: złoże Kalinka koło Detvy |
| F0955 | Ahlberg 2018 (`cambridge.org`, pobrany stąd) i materiały uzupełniające do pracy w „Nature” z 2025 r. (`media.springernature.com`) | że autorzy odkrycia i część badaczy uznają te struktury za tropy czworonogów (interpretację Lucasa z 2015 r. potwierdza źródło już podane przy ciekawostce) |
| F0975 | artykuł w „Przeglądzie Geologicznym” (`geojournals.pgi.gov.pl`, Exa) | lipiec 2021 r. i wyrobisko glin w Borkowicach |
| F1047 | gmina Lutowiska (`lutowiska.pl`) | powołanie parku 8 marca 2013 r. w Lutowiskach |
| F1252 | Ministerstwo Kultury (`gov.pl`, pobrana stąd) | nazwa „Krzemionkowski region prehistorycznego górnictwa krzemienia pasiastego” |

### Poprawki kart (po przeglądzie)

- **Zaskroniec rybołów:** „Pierwszej udokumentowanej obserwacji w Polsce dokonano w lipcu 2009 r.” zamiast „Pierwszego współczesnego osobnika…”, tak jak w F0588. Region: „Bardzo lokalnie w południowej Polsce, w rejonie Śląska Cieszyńskiego.” bez „i dolin rzecznych o odpowiednich warunkach”, bo praca UJ zna w Polsce jedną populację. Po angielsku tak samo.
- **Tropy tetrapodów z Zachełmia:** Ahlberg (2018), dopisany do F0955, pisze, że środowisko Zachełmia uważane w 2010 r. za pływowe zinterpretowano od nowa (Qvarnström i in. 2018) jako płytkie, okresowe jeziora na nizinie nadmorskiej. Karta mówi teraz „krok w płytkiej wodzie” zamiast „w płytkiej lagunie” i „środowisko płytkich okresowych jezior na nizinie nadmorskiej zamiast klasycznej rzecznej delty” zamiast „pływowej laguny”. Po angielsku tak samo.

Przegląd zgłosił też trzy sprawy, które sceptyczny odczyt odrzucił: link zdjęcia Krzywego Lasu na stronie startowej jest poprawny; sprostowanie z 4.03.2026 do pracy o bumerangu z Obłazowej (F0920) nie ma powodu zmieniać datowania, a pobrana po nim strona podaje to samo; F0987 słusznie podaje pierwotną nazwę *Cryopterygius kielanae*.

## Zostaje `checked` (3)

Każdą z nich potwierdza w całości któreś ze źródeł, z wyjątkiem jednego szczegółu. Nic jej nie przeczy, ale żaden tekst nie mówi tego szczegółu wprost. Najmniejsza zmiana, po której ciekawostka byłaby `verified`, czeka na decyzję Roberta.

| Id | Karta | Czego nie potwierdza żaden tekst | Wersja, którą źródła potwierdzają w całości |
| --- | --- | --- | --- |
| F0792 | Taliomelan | „więc to minerał do laboratorium, nie do kieszeni” to nasz wniosek; e-lekcja ZPE potwierdza silną toksyczność talu | „Tal jest silnie toksyczny.” |
| F0869 | Pielgrzymy | tłumaczenie Dreisteine = „Trzy Kamienie”; Wikipedia podaje tylko niemiecką nazwę, a miesięcznik „Karkonosze” (2011) dawną nazwę „Trzy Kamienie” ze starych map, bez związku z nazwą niemiecką | bez nawiasu z tłumaczeniem |
| F1044 | Obłoki srebrzyste | „w Moskwie”: źródła podają datę 13 czerwca 1885 r., ale nie miejsce obserwacji; Moskwę wymienia tylko praca HGSS, przy innej obserwacji (26 czerwca, „near Moscow”) | bez „w Moskwie” |

Teraz atlas ma 1456 ciekawostek na 627 kartach: 899 `verified`, 554 `corrected` i 3 `checked`. Dwie ciekawostki wycofanej karty „Berylokordieryt-Na” zostają w pliku jako ukryte.
