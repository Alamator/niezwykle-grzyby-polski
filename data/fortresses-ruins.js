(() => {
  const categories = [
    { id: "miasta-idealne", label: "Miasta idealne", short: "Miasta", icon: "M" },
    { id: "zamki-rezydencje", label: "Zamki i rezydencje", short: "Zamki", icon: "Z" },
    { id: "twierdze", label: "Twierdze", short: "Twierdze", icon: "T" },
    { id: "ruiny", label: "Ruiny", short: "Ruiny", icon: "R" },
    { id: "zapomniane-konstrukcje", label: "Zapomniane konstrukcje", short: "Konstrukcje", icon: "K" }
  ];

  const cat = Object.fromEntries(categories.map((category) => [category.id, category]));

  const sharedSourceHints = [
    "oficjalna strona obiektu, muzeum, miasta lub zarządcy",
    "NID / zabytek.pl, UNESCO albo Pomnik Historii, jeśli dotyczy",
    "lokalne instytucje kultury, parki kulturowe lub materiały konserwatorskie"
  ];

  function entry(data) {
    const category = cat[data.category];
    return {
      ...data,
      name: data.name || data.name_pl,
      location: data.location || data.region_pl,
      region: data.region || data.region_pl,
      group: category.label,
      short: data.short || data.hook,
      whyOdd: data.whyOdd || data.occurrence_note,
      scienceNote: data.scienceNote || data.habitat_pl,
      quizFacts: data.quizFacts || [
        data.name_pl,
        category.label,
        data.quiz_angle
      ],
      sourceHints: data.sourceHints || sharedSourceHints,
      category_label: category.label,
      category_short: category.short,
      category_icon: category.icon
    };
  }

  function base(data) {
    return entry({
      source_status: "from_uploaded_md",
      ...data
    });
  }

  const fortressesRuins = [
    base({
      id: "zamosc",
      name_pl: "Zamość",
      name_lat: "Lubelskie • renesansowe miasto idealne",
      category: "miasta-idealne",
      hook: "Miasto, które miało działać jak idealnie zaprojektowane ciało.",
      quiz_angle: "renesansowy plan, rynek, fortyfikacje, ordynacja i wpis UNESCO",
      safety_note: "zwiedzać jak żywe miasto: szanować mieszkańców, zabytkową tkankę i zasady ruchu w obrębie starówki",
      region_pl: "Zamość, Lubelskie.",
      habitat_pl: "Mechanizm: miasto zaplanowano jako spójny układ funkcji, osi, rynku, rezydencji i obrony.",
      occurrence_note: "Osobliwością jest kompletność założenia: urbanistyka, ambicja polityczna i fortyfikacje tworzą jedną czytelną maszynę miasta.",
      level: "miasto UNESCO"
    }),
    base({
      id: "zamek-krzyztopor",
      name_pl: "Zamek Krzyżtopór",
      name_lat: "Ujazd • pałac w twierdzy",
      category: "ruiny",
      hook: "Zamek, który podobno liczył czas w kamieniu.",
      quiz_angle: "legenda kalendarza, bastiony, pałacowa skala i ruina rezydencji obronnej",
      safety_note: "poruszać się wyznaczoną trasą; nie wchodzić na kruche mury ani do miejsc zamkniętych",
      region_pl: "Ujazd, Świętokrzyskie.",
      habitat_pl: "Mechanizm: reprezentacyjny pałac wpisano w układ bastionowy, łącząc prestiż rodu z ideą obrony.",
      occurrence_note: "Krzyżtopór zapamiętuje się nie jako zwykły zamek, lecz jako program ambicji opowiedziany architekturą i legendą liczb.",
      level: "kalendarz w kamieniu"
    }),
    base({
      id: "zamek-malbork",
      name_pl: "Zamek w Malborku",
      name_lat: "Pomorskie • ceglany kolos UNESCO",
      category: "zamki-rezydencje",
      hook: "Ceglany kolos zakonu krzyżackiego.",
      quiz_angle: "gotyk ceglany, trzyczęściowy zespół zamkowy, zakon i skala nad Nogatem",
      safety_note: "traktować obiekt jak intensywnie użytkowane muzeum; nie dotykać detali i pilnować zasad tras",
      region_pl: "Malbork, Pomorskie.",
      habitat_pl: "Mechanizm: cegła, mury, dziedzińce i wodne otoczenie tworzą obronno-administracyjny organizm o ogromnej skali.",
      occurrence_note: "W atlasie Malbork jest lekcją skali: warownia działała jak stolica zakonu, magazyn, klasztor i twierdza naraz.",
      level: "ceglane UNESCO"
    }),
    base({
      id: "twierdza-srebrna-gora",
      name_pl: "Twierdza Srebrna Góra",
      name_lat: "Dolnośląskie • górski donżon",
      category: "twierdze",
      hook: "Forteca, która miała przetrwać oblężenie jak osobne miasto.",
      quiz_angle: "górskie położenie, donżon, kazamaty, samowystarczalność i pruska inżynieria",
      safety_note: "nie schodzić z tras i uważać na wysokość, schody oraz mokre kamienne powierzchnie",
      region_pl: "Srebrna Góra, Dolnośląskie.",
      habitat_pl: "Mechanizm: twierdza wykorzystuje wysokość, masę murów i rozproszone forty, aby kontrolować przejścia górskie.",
      occurrence_note: "Jej osobliwością jest połączenie krajobrazu z konstrukcją: forteca wygląda jak małe miasto zawieszone na grzbiecie Sudetów.",
      level: "górska forteca"
    }),
    base({
      id: "zamek-ksiaz",
      name_pl: "Zamek Książ",
      name_lat: "Wałbrzych • pałac nad tajemnicą",
      category: "zamki-rezydencje",
      hook: "Pałac, góra i tajemnica pod spodem.",
      quiz_angle: "monumentalna rezydencja, tarasy, podziemia wojenne i kontrast powierzchni z tunelem",
      safety_note: "zwiedzać tylko udostępnione części zamku i podziemi; nie wchodzić do stref technicznych ani zamkniętych",
      region_pl: "Wałbrzych, Dolnośląskie.",
      habitat_pl: "Mechanizm: rezydencja wykorzystuje strome położenie, tarasy i późniejsze podziemia, tworząc kilka warstw historii.",
      occurrence_note: "Książ jest osobliwy przez napięcie: reprezentacyjny zamek nad doliną i surowe wojenne korytarze pod nim.",
      level: "zamek i Riese"
    }),
    base({
      id: "zamek-ogrodzieniec",
      name_pl: "Zamek Ogrodzieniec",
      name_lat: "Podzamcze • ruina jurajska",
      category: "ruiny",
      hook: "Kamienny statek rozbity na wapiennej skale.",
      quiz_angle: "Jura Krakowsko-Częstochowska, wapienne ostańce, Orle Gniazda i ruina wpisana w skałę",
      safety_note: "trzymać się trasy i barierek; ruiny oraz skały nie są miejscem do wspinania bez zasad",
      region_pl: "Podzamcze, Śląskie.",
      habitat_pl: "Mechanizm: mury korzystają z naturalnej obronności skał, a wapienne formy stają się częścią architektury.",
      occurrence_note: "Tu osobliwością jest zrost budowli z geologią: trudno powiedzieć, gdzie kończy się skała, a zaczyna zamek.",
      level: "orle gniazdo"
    }),
    base({
      id: "zamek-moszna",
      name_pl: "Zamek w Mosznej",
      name_lat: "Opolskie • fantazyjna rezydencja",
      category: "zamki-rezydencje",
      hook: "Pałac, który wygląda jak sen architekta bez ograniczeń.",
      quiz_angle: "wieże, eklektyzm, teatralna sylweta i pałacowa legenda stu wież",
      safety_note: "szanować czynny obiekt i park; nie wchodzić do nieudostępnionych pomieszczeń ani na elementy architektury",
      region_pl: "Moszna, Opolskie.",
      habitat_pl: "Mechanizm: eklektyczna bryła łączy różne style i wieże w jedną bardzo rozpoznawalną sylwetkę rezydencji.",
      occurrence_note: "Moszna jest osobliwa przez nadmiar formy: zamiast jednej spokojnej fasady dostajemy architekturę niemal teatralną.",
      level: "pałac fantazji"
    }),
    base({
      id: "zamek-lancut",
      name_pl: "Zamek w Łańcucie",
      name_lat: "Podkarpackie • rezydencja i powozownia",
      category: "zamki-rezydencje",
      hook: "Arystokratyczna kapsuła czasu.",
      quiz_angle: "wnętrza, park, powozownia, rezydencja magnacka i zachowany rytm codzienności elit",
      safety_note: "w muzealnych wnętrzach nie dotykać wyposażenia i stosować się do zasad fotografowania oraz ruchu",
      region_pl: "Łańcut, Podkarpackie.",
      habitat_pl: "Mechanizm: zamek działa jako zespół rezydencjonalny, w którym wnętrza, park i zaplecze transportowe tworzą jedną opowieść.",
      occurrence_note: "Osobliwością jest zachowana skala życia rezydencji: nie tylko mury, ale też powozy, pokoje i rytuał reprezentacji.",
      level: "rezydencja muzealna"
    }),
    base({
      id: "zamek-krasiczyn",
      name_pl: "Zamek w Krasiczynie",
      name_lat: "Podkarpackie • wieże i sgrafitta",
      category: "zamki-rezydencje",
      hook: "Zamek, w którym fasada opowiada program rodu.",
      quiz_angle: "cztery symboliczne wieże, dziedziniec, dekoracja sgrafittowa i renesansowa narracja",
      safety_note: "oglądać detale bez dotykania tynków i dekoracji; respektować zasady parku i wnętrz",
      region_pl: "Krasiczyn, Podkarpackie.",
      habitat_pl: "Mechanizm: układ wież i dekoracji fasad przekłada idee rodu oraz porządek świata na język architektury.",
      occurrence_note: "Krasiczyn jest osobliwy, bo nie tylko stoi w krajobrazie: jego ściany zachowują program symboliczny.",
      level: "fasada opowieści"
    }),
    base({
      id: "zamek-baranow-sandomierski",
      name_pl: "Zamek w Baranowie Sandomierskim",
      name_lat: "Podkarpackie • renesansowy mały Wawel",
      category: "zamki-rezydencje",
      hook: "Idealna rezydencja odbita w wodzie i proporcjach.",
      quiz_angle: "renesansowy dziedziniec, arkady, proporcje i przydomek małego Wawelu",
      safety_note: "poruszać się po udostępnionych trasach; nie dotykać detali i uważać przy wodzie oraz schodach",
      region_pl: "Baranów Sandomierski, Podkarpackie.",
      habitat_pl: "Mechanizm: symetria, dziedziniec i arkadowe krużganki porządkują rezydencję jak model renesansowej harmonii.",
      occurrence_note: "W atlasie Baranów pokazuje osobliwość proporcji: zamek zapamiętuje się jako bardzo spójną miniaturę wielkiej idei.",
      level: "mały Wawel"
    }),
    base({
      id: "zamek-janowiec",
      name_pl: "Zamek w Janowcu",
      name_lat: "Lubelskie • ruina nad Wisłą",
      category: "ruiny",
      hook: "Ruina, która pokazuje skalę dawnej ambicji.",
      quiz_angle: "położenie nad Wisłą, monumentalna ruina, rezydencja Firlejów i widok na Kazimierz Dolny",
      safety_note: "nie wchodzić na niezabezpieczone partie murów; ruiny traktować jako zabytek, nie plac do eksploracji",
      region_pl: "Janowiec, Lubelskie.",
      habitat_pl: "Mechanizm: zamek wykorzystuje wyniesienie nad doliną Wisły, a rozległy obrys ruin pozwala odczytać dawną skalę rezydencji.",
      occurrence_note: "Janowiec jest osobliwy, bo ruina nie ukrywa braku: właśnie przez brak dachu i wnętrz lepiej widać rozmach założenia.",
      level: "ruina nad rzeką"
    }),
    base({
      id: "zamek-czocha",
      name_pl: "Zamek Czocha",
      name_lat: "Dolnośląskie • warownia i legenda",
      category: "zamki-rezydencje",
      hook: "Zamek z ukrytymi korytarzami i teatralną aurą tajemnicy.",
      quiz_angle: "zamek nad Kwisą, przebudowy, tajne przejścia, legenda i powojenne opowieści",
      safety_note: "odróżniać udokumentowaną historię od legend; zwiedzać wyłącznie udostępnione części",
      region_pl: "Sucha koło Leśnej, Dolnośląskie.",
      habitat_pl: "Mechanizm: warownia na skale i nad wodą została przekształcona w rezydencję, a liczne przebudowy zbudowały jej teatralny charakter.",
      occurrence_note: "Czocha działa w atlasie jako lekcja ostrożności: tajemnica jest ciekawa, ale trzeba ją oddzielać od pewnych źródeł.",
      level: "zamek legend"
    }),
    base({
      id: "zamek-bolkow",
      name_pl: "Zamek Bolków",
      name_lat: "Dolnośląskie • wieża dziobowa",
      category: "zamki-rezydencje",
      hook: "Wieża jak kamienny dziób skierowany w stronę ataku.",
      quiz_angle: "charakterystyczna wieża, obrona, Śląsk piastowski i czytelna geometria warowni",
      safety_note: "uważać na schody, ekspozycję i krawędzie murów; nie wchodzić na miejsca poza trasą",
      region_pl: "Bolków, Dolnośląskie.",
      habitat_pl: "Mechanizm: ostroga wieży i masyw murów kierują obronę ku najbardziej narażonej stronie założenia.",
      occurrence_note: "Osobliwością Bolkowa jest jedna bardzo zapamiętywalna forma: wieża nie jest okrągła dekoracyjnie, lecz funkcjonalnie ostra.",
      level: "wieża dziobowa"
    }),
    base({
      id: "zamek-chojnik",
      name_pl: "Zamek Chojnik",
      name_lat: "Jelenia Góra • ruina na skale",
      category: "ruiny",
      hook: "Zamek na skale i legenda o próbie odwagi.",
      quiz_angle: "strome wzgórze, Karkonosze, legenda Kunegundy, ruina i kontrola doliny",
      safety_note: "iść wyznaczonym szlakiem; strome podejścia i mury wymagają zwykłej górskiej ostrożności",
      region_pl: "Jelenia Góra-Sobieszów, Dolnośląskie.",
      habitat_pl: "Mechanizm: ruina wykorzystuje naturalną stromiznę Chojnika, przez co krajobraz jest częścią systemu obrony.",
      occurrence_note: "Chojnik zapada w pamięć, bo historia miejsca zaczyna się jeszcze przed murami: od samej skały i podejścia.",
      level: "górska ruina"
    }),
    base({
      id: "zamek-niedzica",
      name_pl: "Zamek Niedzica",
      name_lat: "Pieniny • zamek graniczny",
      category: "zamki-rezydencje",
      hook: "Pieniński zamek, który lubi opowieści o skarbach.",
      quiz_angle: "pogranicze polsko-węgierskie, Dunajec, jezioro, legenda inkaska i zamek nad wodą",
      safety_note: "traktować legendy jako część kultury miejsca; nad wodą i na tarasach zachować ostrożność",
      region_pl: "Niedzica, Małopolskie.",
      habitat_pl: "Mechanizm: zamek kontrolował pograniczne przejścia nad Dunajcem, a dzisiejszy krajobraz współtworzy Jezioro Czorsztyńskie.",
      occurrence_note: "Niedzica jest osobliwa przez warstwy opowieści: granica, rzeka, zamek i legenda tworzą bardzo gęsty punkt atlasu.",
      level: "zamek graniczny"
    }),
    base({
      id: "zamek-czorsztyn",
      name_pl: "Ruiny zamku Czorsztyn",
      name_lat: "Małopolskie • druga strona Dunajca",
      category: "ruiny",
      hook: "Dwa zamki patrzące na siebie przez wodę.",
      quiz_angle: "ruina nad Jeziorem Czorsztyńskim, sąsiedztwo Niedzicy, Dunajec i pogranicze",
      safety_note: "poruszać się po udostępnionej trasie; ruiny i skarpy nie nadają się do samodzielnego schodzenia",
      region_pl: "Czorsztyn, Małopolskie.",
      habitat_pl: "Mechanizm: dawny zamek korzystał z wyniesienia nad doliną Dunajca, a dziś tworzy parę krajobrazową z Niedzicą.",
      occurrence_note: "Czorsztyn jest osobliwy nie samotnie, lecz w dialogu z drugim zamkiem widocznym przez wodę.",
      level: "ruina w duecie"
    }),
    base({
      id: "zamek-pieskowa-skala",
      name_pl: "Zamek Pieskowa Skała",
      name_lat: "Małopolskie • renesans przy Maczudze",
      category: "zamki-rezydencje",
      hook: "Zamek i skała, które tworzą naturalną scenografię.",
      quiz_angle: "Maczuga Herkulesa, Orle Gniazda, dziedziniec arkadowy i krajobraz Ojcowskiego Parku Narodowego",
      safety_note: "szanować park narodowy i obiekt muzealny; nie schodzić poza szlaki ani nie niszczyć skał",
      region_pl: "Sułoszowa, Małopolskie.",
      habitat_pl: "Mechanizm: rezydencja stoi w jurajskim krajobrazie, gdzie skały wzmacniają zarówno obronę, jak i teatralność miejsca.",
      occurrence_note: "Pieskowa Skała jest osobliwa przez duet architektury i geologii: zamek działa tu razem z naturalnym pomnikiem skały.",
      level: "zamek i ostaniec"
    }),
    base({
      id: "zamki-mirow-bobolice",
      name_pl: "Zamki Mirów i Bobolice",
      name_lat: "Śląskie • kamienne siostry Jury",
      category: "ruiny",
      hook: "Dwie warownie jak kamienne siostry.",
      quiz_angle: "bliźniaczy układ, ruina i rekonstrukcja, Szlak Orlich Gniazd oraz wapienne grzbiety",
      safety_note: "trzymać się wyznaczonych ścieżek; ruina Mirowa i skały wymagają dystansu oraz poszanowania zabezpieczeń",
      region_pl: "Mirów i Bobolice, Śląskie.",
      habitat_pl: "Mechanizm: dwa zamki wykorzystują ten sam jurajski krajobraz, ale dziś pokazują dwa różne losy zabytku.",
      occurrence_note: "Osobliwością jest porównanie: obok siebie stoją ruina i mocno odtworzona warownia, więc łatwo zobaczyć napięcie między pamięcią a rekonstrukcją.",
      level: "dwa zamki"
    }),
    base({
      id: "zamek-tenczyn-rudno",
      name_pl: "Zamek Tenczyn w Rudnie",
      name_lat: "Małopolskie • ruina na dawnym wulkanie",
      category: "ruiny",
      hook: "Zamek na śladach dawnego wulkanu.",
      quiz_angle: "Garb Tenczyński, położenie na wzniesieniu, ruina rodu Tęczyńskich i wulkaniczne skały",
      safety_note: "nie schodzić z trasy i nie wspinać się po murach; traktować ruiny oraz podłoże skalne jako chronione źródło wiedzy",
      region_pl: "Rudno, Małopolskie.",
      habitat_pl: "Mechanizm: warownia korzystała z wyniesienia i twardego podłoża, a geologiczna przeszłość wzgórza dodaje jej osobny wymiar.",
      occurrence_note: "Tenczyn jest osobliwy, bo ruina opowiada naraz o rodowej potędze i bardzo starym krajobrazie geologicznym.",
      level: "wulkaniczna ruina"
    }),
    base({
      id: "mysia-wieza-kruszwica",
      name_pl: "Mysia Wieża",
      name_lat: "Kruszwica • wieża legendy",
      category: "ruiny",
      hook: "Wieża, myszy i jedna z najbardziej znanych polskich legend.",
      quiz_angle: "pozostałość zamku, jezioro Gopło, legenda o Popielu i siła pojedynczej wieży",
      safety_note: "legendę traktować jako opowieść kulturową; na wieży uważać na schody i wysokość",
      region_pl: "Kruszwica, Kujawsko-Pomorskie.",
      habitat_pl: "Mechanizm: pojedyncza ocalała wieża koncentruje pamięć po większym założeniu zamkowym i porządkuje widok nad Gopłem.",
      occurrence_note: "Mysia Wieża pokazuje, że czasem osobliwością nie jest cały zamek, lecz jeden element, który utrzymał legendę przy życiu.",
      level: "wieża legendy"
    }),
    base({
      id: "zamek-bedzin",
      name_pl: "Zamek w Będzinie",
      name_lat: "Śląskie • strażnica granicy",
      category: "zamki-rezydencje",
      hook: "Kamienna brama między krainami.",
      quiz_angle: "średniowieczna strażnica, dawna granica, wieża, mury i kontrola szlaku",
      safety_note: "zwiedzać zgodnie z zasadami muzeum; nie wchodzić na zamknięte elementy murów ani stoków wzgórza",
      region_pl: "Będzin, Śląskie.",
      habitat_pl: "Mechanizm: zamek na wzgórzu kontrolował ruch i granicę, wykorzystując widoczność oraz prostą, zwartą geometrię obrony.",
      occurrence_note: "Będzin jest osobliwy jako kamienny znak pogranicza: niewielka bryła ma bardzo duży sens strategiczny.",
      level: "zamek graniczny"
    }),
    base({
      id: "twierdza-modlin",
      name_pl: "Twierdza Modlin",
      name_lat: "Mazowieckie • forteca u zbiegu rzek",
      category: "twierdze",
      hook: "Twierdza z koszarami dłuższymi niż spacer przez małe miasto.",
      quiz_angle: "ujście Narwi do Wisły, koszary, wielki obwód forteczny i warstwy XIX oraz XX wieku",
      safety_note: "nie wchodzić do opuszczonych ani zamkniętych obiektów; część twierdzy ma ograniczony dostęp i różny stan techniczny",
      region_pl: "Nowy Dwór Mazowiecki, Mazowieckie.",
      habitat_pl: "Mechanizm: twierdza wykorzystuje połączenie rzek, długie koszary i rozległy system umocnień do kontroli strategicznego węzła.",
      occurrence_note: "Modlin jest osobliwy przez skalę: to nie jeden fort, ale ogromny krajobraz wojskowy rozpisany na miasto i rzeki.",
      level: "twierdza rzek"
    }),
    base({
      id: "twierdza-klodzko",
      name_pl: "Twierdza Kłodzko",
      name_lat: "Dolnośląskie • bastiony i chodniki",
      category: "twierdze",
      hook: "Obrona prowadzona także pod ziemią.",
      quiz_angle: "bastiony, chodniki minerskie, miasto pod twierdzą i obrona w kilku poziomach",
      safety_note: "w podziemnych trasach pilnować grupy, kasku i głowy; nie schodzić do zamkniętych korytarzy",
      region_pl: "Kłodzko, Dolnośląskie.",
      habitat_pl: "Mechanizm: twierdza łączy dominację nad miastem z siecią chodników, które służyły rozpoznaniu i obronie pod ziemią.",
      occurrence_note: "Kłodzko jest osobliwe, bo forteca ma nie tylko mury na wzgórzu, lecz także ukryty wymiar chodników minerskich.",
      level: "twierdza warstwowa"
    }),
    base({
      id: "twierdza-przemysl",
      name_pl: "Twierdza Przemyśl",
      name_lat: "Podkarpackie • pierścień fortów",
      category: "twierdze",
      hook: "Miasto otoczone pierścieniem fortów.",
      quiz_angle: "forty pierścieniowe, monarchia austro-węgierska, I wojna światowa i rozproszony krajobraz obrony",
      safety_note: "forty oglądać tylko tam, gdzie są dostępne i bezpieczne; nie wchodzić do zrujnowanych kazamat ani wykopów",
      region_pl: "Przemyśl i okolice, Podkarpackie.",
      habitat_pl: "Mechanizm: obrona została rozrzucona w pierścieniu wokół miasta, aby kontrolować podejścia i prowadzić walkę na przedpolu.",
      occurrence_note: "Osobliwością Przemyśla jest skala systemu: mapa fortów bywa ważniejsza niż pojedynczy obiekt.",
      level: "pierścień fortów"
    }),
    base({
      id: "twierdza-boyen",
      name_pl: "Twierdza Boyen",
      name_lat: "Giżycko • gardło Mazur",
      category: "twierdze",
      hook: "Kamienna zatyczka między jeziorami.",
      quiz_angle: "położenie między jeziorami, plan gwiaździsty, bramy i kontrola przesmyku mazurskiego",
      safety_note: "poruszać się po udostępnionych trasach; nie wchodzić do zamkniętych kazamat i obiektów technicznych",
      region_pl: "Giżycko, Warmińsko-Mazurskie.",
      habitat_pl: "Mechanizm: forteca kontrolowała wąski lądowy przesmyk między wodami, wzmacniając naturalną barierę krajobrazu.",
      occurrence_note: "Boyen jest osobliwy jako przykład twierdzy dopasowanej do mapy jezior: architektura zamyka mazurską bramę.",
      level: "twierdza jezior"
    }),
    base({
      id: "twierdza-osowiec",
      name_pl: "Twierdza Osowiec",
      name_lat: "Podlaskie • mury i mokradła",
      category: "twierdze",
      hook: "Twierdza, którą chroniły mury i mokradła.",
      quiz_angle: "bagna Biebrzy, forty, obrona twierdzy i trudny krajobraz podejścia",
      safety_note: "respektować ograniczenia dostępu, teren wojskowy i przyrodniczy; nie wchodzić do ruin ani na bagna bez trasy",
      region_pl: "Osowiec-Twierdza, Podlaskie.",
      habitat_pl: "Mechanizm: fortyfikacje działały razem z mokradłami, które spowalniały ruch i ograniczały kierunki ataku.",
      occurrence_note: "Osowiec jest osobliwy, bo natura nie była tylko tłem: bagienny krajobraz stał się częścią obrony.",
      level: "forteca bagien"
    }),
    base({
      id: "wilczy-szaniec",
      name_pl: "Wilczy Szaniec",
      name_lat: "Gierłoż • betonowe ruiny w lesie",
      category: "twierdze",
      hook: "Betonowe ruiny ukryte w lesie historii.",
      quiz_angle: "kwatera wojenna, maskowanie, bunkry, zamach z 20 lipca i trudna pamięć miejsca",
      safety_note: "zachować spokojny, historyczny ton; nie wspinać się na ruiny bunkrów ani nie schodzić poza wyznaczoną trasę",
      region_pl: "Gierłoż, Warmińsko-Mazurskie.",
      habitat_pl: "Mechanizm: kompleks ukryto w lesie i zabezpieczono masywnym betonem, tworząc rozproszoną kwaterę dowodzenia.",
      occurrence_note: "W atlasie to karta o ruinie nowoczesnej władzy: ciężki beton pozostał, ale sens miejsca wymaga ostrożnej pamięci.",
      level: "kwatera leśna"
    }),
    base({
      id: "westerplatte",
      name_pl: "Westerplatte",
      name_lat: "Gdańsk • półwysep pamięci",
      category: "twierdze",
      hook: "Mały półwysep z ciężarem wielkiej historii.",
      quiz_angle: "Wojskowa Składnica Tranzytowa, początek II wojny światowej, wartownie i krajobraz pamięci",
      safety_note: "traktować miejsce jako teren pamięci; nie wchodzić na zamknięte ruiny i zachować powagę przy pomnikach",
      region_pl: "Gdańsk, Pomorskie.",
      habitat_pl: "Mechanizm: niewielki teren portowo-wojskowy stał się punktem oporu, a później symbolicznym krajobrazem pamięci.",
      occurrence_note: "Westerplatte jest osobliwe przez skalę znaczenia: przestrzeń jest mała, ale historyczny ciężar bardzo duży.",
      level: "półwysep pamięci"
    }),
    base({
      id: "wiadukty-stanczyki",
      name_pl: "Wiadukty w Stańczykach",
      name_lat: "Warmińsko-Mazurskie • północne akwedukty",
      category: "zapomniane-konstrukcje",
      hook: "Północne akwedukty, po których nie jeżdżą pociągi.",
      quiz_angle: "nieczynna linia kolejowa, podwójne arkady, wielka skala i krajobraz Puszczy Rominckiej",
      safety_note: "korzystać tylko z udostępnionych miejsc; nie przechodzić przez barierki ani nie wchodzić na niepewne elementy",
      region_pl: "Stańczyki, Warmińsko-Mazurskie.",
      habitat_pl: "Mechanizm: wysokie żelbetowe arkady przenosiły kolej nad doliną, a po zaniku ruchu stały się monumentalną pamiątką infrastruktury.",
      occurrence_note: "Osobliwością jest kontrast: konstrukcja ma rozmach wielkiej magistrali, ale dziś działa głównie jako milczący znak dawnej linii.",
      level: "akwedukty kolei"
    }),
    base({
      id: "wiadukty-kiepojcie",
      name_pl: "Wiadukty w Kiepojciach",
      name_lat: "Warmińsko-Mazurskie • cichy brat Stańczyków",
      category: "zapomniane-konstrukcje",
      hook: "Cichy brat Stańczyków.",
      quiz_angle: "bliźniacze wiadukty dawnej linii kolejowej, dolina Bludzi i mniej znana monumentalność",
      safety_note: "nie wchodzić na konstrukcję bez upewnienia się, że miejsce jest legalnie i bezpiecznie udostępnione",
      region_pl: "Kiepojcie, Warmińsko-Mazurskie.",
      habitat_pl: "Mechanizm: para wysokich wiaduktów pokazuje, jak kolej rozwiązywała problem dolin i nierównego terenu w północnym krajobrazie.",
      occurrence_note: "Kiepojcie są osobliwe przez ciszę: podobny typ konstrukcji jak w Stańczykach, ale bez równie silnej turystycznej legendy.",
      level: "zapomniany wiadukt"
    }),
    base({
      id: "palac-kopice",
      name_pl: "Pałac w Kopicach",
      name_lat: "Opolskie • pałac-widmo",
      category: "zapomniane-konstrukcje",
      hook: "Pałac-widmo, który wygląda jak ostrzeżenie przed zapomnieniem.",
      quiz_angle: "ruina rezydencji Schaffgotschów, neogotycka sylweta, zniszczenie i problem ochrony zabytku",
      safety_note: "nie wchodzić do ruin ani na teren bez zgody; zrujnowane pałace są niebezpieczne i zwykle mają ograniczony dostęp",
      region_pl: "Kopice, Opolskie.",
      habitat_pl: "Mechanizm: pałacowa architektura po utracie funkcji i opieki staje się kruchą strukturą, w której najważniejsze są zabezpieczenie i pamięć.",
      occurrence_note: "Kopice są osobliwe, bo pokazują nie triumf rezydencji, lecz jej długie zanikanie w krajobrazie.",
      level: "ruina rezydencji"
    }),
    base({
      id: "palac-slobity",
      name_pl: "Pałac w Słobitach",
      name_lat: "Warmińsko-Mazurskie • arystokratyczny kolos",
      category: "zapomniane-konstrukcje",
      hook: "Arystokratyczny kolos, po którym zostały ściany.",
      quiz_angle: "rezydencja Prus Wschodnich, skala założenia, ruina i trudna historia powojenna",
      safety_note: "nie eksplorować ruin bez zgody i zabezpieczenia; grożą zawaleniem, upadkiem i naruszeniem własności",
      region_pl: "Słobity, Warmińsko-Mazurskie.",
      habitat_pl: "Mechanizm: wielka rezydencja po utracie funkcji i wyposażenia zachowuje jedynie fragment układu przestrzennego.",
      occurrence_note: "Słobity są osobliwe przez pustkę po skali: ściany pozwalają wyobrazić sobie pałac większy niż to, co ocalało.",
      level: "ruina kolosa"
    }),
    base({
      id: "zamek-lapalice",
      name_pl: "Zamek w Łapalicach",
      name_lat: "Pomorskie • niedokończona legenda",
      category: "zapomniane-konstrukcje",
      hook: "Nie zabytek, ale osobliwość: zamek, którego nigdy nie skończono.",
      quiz_angle: "współczesna niedokończona budowla, prywatny teren, lokalna legenda i granice fascynacji ruiną",
      safety_note: "nie wchodzić na teren ani do konstrukcji bez zgody; niedokończony obiekt nie jest bezpieczną atrakcją turystyczną",
      region_pl: "Łapalice, Pomorskie.",
      habitat_pl: "Mechanizm: współczesna, niedokończona konstrukcja zamkowa stała się obiektem opowieści właśnie przez brak ukończenia i niejasny status.",
      occurrence_note: "Łapalice zamykają kolekcję innym typem osobliwości: to nie historyczny zabytek, lecz nowa ruina wytwarzająca lokalną legendę.",
      level: "niedokończony zamek"
    })
  ];

  window.FORTRESS_RUIN_APP_DATA = {
    subtitle: "33 osobliwości twierdz i ruin Polski: miasta idealne, zamki-legendy, twierdze, opuszczone pałace i konstrukcje, które zostały po ambicji.",
    long_intro: "To atlas miejsc, w których człowiek chciał rządzić przestrzenią: budował miasta idealne, zamki jak kalendarze, twierdze jak podziemne miasta i pałace, które dziś wyglądają jak scenografia po końcu świata.",
    safety_notice: "To prototyp edukacyjny. Zamki, twierdze i ruiny zwiedzaj tylko legalnie i ostrożnie: nie wchodź do opuszczonych, prywatnych ani zamkniętych obiektów, nie wspinaj się po murach i traktuj miejsca pamięci spokojnym językiem historycznym.",
    categories,
    fortressesRuins
  };
})();
