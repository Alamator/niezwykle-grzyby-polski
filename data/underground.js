(() => {
  const categories = [
    { id: "kopalnie-surowce", label: "Kopalnie i surowce", short: "Kopalnie", icon: "K" },
    { id: "podziemia-wojenne", label: "Podziemia wojenne", short: "Wojenne", icon: "W" },
    { id: "miejskie-piwnice", label: "Miejskie piwnice", short: "Piwnice", icon: "M" },
    { id: "fortyfikacje-schrony", label: "Fortyfikacje i schrony", short: "Schrony", icon: "F" },
    { id: "tajemnice-legendy", label: "Tajemnice i legendy", short: "Tajemnice", icon: "T" }
  ];

  const cat = Object.fromEntries(categories.map((category) => [category.id, category]));

  const sharedSourceHints = [
    "oficjalna strona obiektu lub muzeum",
    "NID / zabytek.pl",
    "UNESCO lub lokalna instytucja, jeśli dotyczy"
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

  function expanded(data) {
    return entry({
      source_status: "expanded_candidate",
      ...data
    });
  }

  const underground = [
    base({
      id: "kopalnia-soli-wieliczka",
      name_pl: "Kopalnia Soli „Wieliczka”",
      name_lat: "Wieliczka • solne miasto UNESCO",
      category: "kopalnie-surowce",
      hook: "Katedra wykuta w soli, bez dostępu do dziennego światła.",
      quiz_angle: "solne komory, kaplica św. Kingi, rzeźby z halitu i wielopiętrowa skala kopalni",
      safety_note: "zwiedzać tylko oficjalną trasą; słuchać zasad przewodnika i nie dotykać solnych rzeźb ani zabezpieczeń",
      region_pl: "Wieliczka, Małopolska.",
      habitat_pl: "Historyczne wyrobiska soli kamiennej, komory, kaplice i chodniki udostępnione jako trasa muzealna.",
      occurrence_note: "To jedno z najbardziej rozpoznawalnych podziemi Polski i część wpisu UNESCO związanego z górnictwem solnym.",
      level: "solne UNESCO"
    }),
    base({
      id: "kopalnia-soli-bochnia",
      name_pl: "Kopalnia Soli Bochnia",
      name_lat: "Bochnia • najstarszy rytm soli",
      category: "kopalnie-surowce",
      hook: "Najstarsze solne podziemie, które działa jak kronika górnictwa.",
      quiz_angle: "średniowieczna metryka, poziomy kopalni, komora Ważyn i praca soli w mieście",
      safety_note: "poruszać się wyłącznie z obsługą trasy; nie oddalać się od grupy i nie wchodzić do nieudostępnionych wyrobisk",
      region_pl: "Bochnia, Małopolska.",
      habitat_pl: "Wielopoziomowa kopalnia soli z komorami, szybami i trasami pokazującymi rozwój techniki górniczej.",
      occurrence_note: "W atlasie tworzy z Wieliczką duet solnych podziemi UNESCO, ale ma własną, bardzo starą historię.",
      level: "najstarsza sól"
    }),
    base({
      id: "krzemionki-opatowskie",
      name_pl: "Krzemionki Opatowskie",
      name_lat: "Świętokrzyskie • neolityczny krzemień",
      category: "kopalnie-surowce",
      hook: "Prehistoryczna fabryka narzędzi ukryta pod ziemią.",
      quiz_angle: "krzemień pasiasty, neolityczne szyby, pradziejowa organizacja pracy i status UNESCO",
      safety_note: "nie schodzić poza wyznaczoną trasę; stanowiska archeologiczne traktować jak delikatne źródło wiedzy",
      region_pl: "Krzemionki koło Ostrowca Świętokrzyskiego, Świętokrzyskie.",
      habitat_pl: "Zespół pradziejowych kopalń krzemienia pasiastego z szybami, chodnikami i powierzchnią górniczą.",
      occurrence_note: "To karta, która przesuwa opowieść o polskich podziemiach daleko przed epokę przemysłu.",
      level: "neolit UNESCO"
    }),
    base({
      id: "zabytkowa-kopalnia-srebra",
      name_pl: "Zabytkowa Kopalnia Srebra",
      name_lat: "Tarnowskie Góry • srebro i woda",
      category: "kopalnie-surowce",
      hook: "Srebro, woda i maszyny: śląska rewolucja pod ziemią.",
      quiz_angle: "rudy srebra, ołowiu i cynku, odwadnianie, maszyny parowe oraz wpis UNESCO",
      safety_note: "trzymać się trasy turystycznej; niskie chodniki i wilgoć wymagają spokojnego tempa zwiedzania",
      region_pl: "Tarnowskie Góry, Śląsk.",
      habitat_pl: "Dawne wyrobiska rud metali i fragment systemu odwadniania, który umożliwiał rozwój górnictwa.",
      occurrence_note: "Obiekt pokazuje, że podziemia przemysłowe są także historią hydrotechniki i organizacji pracy.",
      level: "srebro UNESCO"
    }),
    base({
      id: "sztolnia-czarnego-pstraga",
      name_pl: "Sztolnia Czarnego Pstrąga",
      name_lat: "Tarnowskie Góry • podziemna woda",
      category: "kopalnie-surowce",
      hook: "Podziemna rzeka techniki.",
      quiz_angle: "łodzie w sztolni, odwadnianie kopalń, długa infrastruktura wodna i ciemność trasy",
      safety_note: "na trasie łodzią stosować się do poleceń przewodnika; nie wychylać się i nie dotykać obudowy sztolni",
      region_pl: "Tarnowskie Góry, Śląsk.",
      habitat_pl: "Sztolnia odwadniająca dawne pola górnicze, dziś oglądana z poziomu wody.",
      occurrence_note: "W atlasie dopełnia kopalnię srebra: pokazuje zaplecze, bez którego wydobycie nie mogłoby działać.",
      level: "sztolnia wodna"
    }),
    base({
      id: "kopalnia-zlota-zloty-stok",
      name_pl: "Kopalnia Złota",
      name_lat: "Złoty Stok • złoto i arsen",
      category: "kopalnie-surowce",
      hook: "Złoto, trucizna i alchemiczna legenda Sudetów.",
      quiz_angle: "wydobycie złota, rudy arsenu, sztolnie Sudetów i opowieści o dawnych technikach",
      safety_note: "nie dotykać minerałów ani starych zabezpieczeń; dawne górnictwo arsenu traktować jako kontekst historyczny",
      region_pl: "Złoty Stok, Dolny Śląsk.",
      habitat_pl: "Dawne wyrobiska złota i arsenu, połączone z ekspozycją o historii sudeckiego górnictwa.",
      occurrence_note: "To miejsce łączy atrakcyjny temat złota z mniej wygodną, chemiczną stroną dawnego przemysłu.",
      level: "złoto Sudetów"
    }),
    base({
      id: "kopalnia-guido",
      name_pl: "Kopalnia Guido",
      name_lat: "Zabrze • głębia węgla",
      category: "kopalnie-surowce",
      hook: "Zjazd do świata, który napędzał miasta.",
      quiz_angle: "głębokość trasy, górnictwo węgla, maszyny i skala przemysłowego Śląska",
      safety_note: "kask i zasady trasy traktować serio; podziemie przemysłowe nie jest zwykłym muzealnym korytarzem",
      region_pl: "Zabrze, Śląsk.",
      habitat_pl: "Dawna kopalnia węgla kamiennego z trasami pokazującymi chodniki, maszyny i warunki pracy.",
      occurrence_note: "W atlasie reprezentuje ciemną, ciężką stronę historii energii i miejskiego rozwoju.",
      level: "węglowa głębia"
    }),
    base({
      id: "sztolnia-krolowa-luiza",
      name_pl: "Sztolnia Królowa Luiza",
      name_lat: "Zabrze • górnicza infrastruktura",
      category: "kopalnie-surowce",
      hook: "Górnicza autostrada wodna.",
      quiz_angle: "kanały, sztolnie, transport urobku, para i wodny szlak w górnictwie",
      safety_note: "zwiedzać w tempie trasy; nie wchodzić do odgałęzień i nie traktować infrastruktury jak placu zabaw",
      region_pl: "Zabrze, Śląsk.",
      habitat_pl: "Połączenie sztolni, kanałów i kopalnianych odcinków, które pokazują logistykę przemysłu pod ziemią.",
      occurrence_note: "Ta karta uczy, że kopalnia to także sieć dróg, wody i techniki, a nie tylko miejsce wydobycia.",
      level: "hydrotechnika"
    }),
    base({
      id: "kopalnia-wegla-nowa-ruda",
      name_pl: "Kopalnia Węgla w Nowej Rudzie",
      name_lat: "Nowa Ruda • czarne podziemie",
      category: "kopalnie-surowce",
      hook: "Czarne podziemie Dolnego Śląska.",
      quiz_angle: "węgiel, metan, niskie chodniki, pamięć pracy i pogórnicza tożsamość miasta",
      safety_note: "uważać na niskie stropy i wilgoć; trasę traktować jako lekcję pracy, nie sportową próbę odwagi",
      region_pl: "Nowa Ruda, Dolny Śląsk.",
      habitat_pl: "Dawna kopalnia węgla z ekspozycją o warunkach pracy i historii górnictwa w Sudetach.",
      occurrence_note: "W atlasie pokazuje, że przemysłowe podziemia miały także mniejszą, lokalną skalę poza wielkim Śląskiem.",
      level: "węgiel Sudetów"
    }),
    base({
      id: "kopalnia-uranu-liczyrzepa",
      name_pl: "Kopalnia Uranu Liczyrzepa",
      name_lat: "Kowary • cień atomowej epoki",
      category: "kopalnie-surowce",
      hook: "Miejsce, gdzie lokalna skała łączy się z atomową historią XX wieku.",
      quiz_angle: "uran, powojenna historia, tajność wydobycia i sudeckie sztolnie",
      safety_note: "nie wchodzić do nieudostępnionych sztolni uranowych; promieniotwórczość traktować jako realny temat bezpieczeństwa",
      region_pl: "Kowary, Dolny Śląsk.",
      habitat_pl: "Dawne wyrobiska związane z wydobyciem uranu w Sudetach, dziś opowiadane w formule trasy turystycznej.",
      occurrence_note: "To spokojna karta o zimnej wojnie, surowcach strategicznych i pamięci miejsc pracy.",
      level: "uran XX wieku"
    }),
    base({
      id: "kopalnia-uranu-kletno",
      name_pl: "Kopalnia Uranu w Kletnie",
      name_lat: "Kletno • minerały i uran",
      category: "kopalnie-surowce",
      hook: "Kolorowe minerały i cień atomowej epoki.",
      quiz_angle: "uran, fluoryt, barwne mineralizacje, Sudety i ostrożny język o promieniotwórczości",
      safety_note: "zwiedzać tylko udostępniony odcinek; nie zbierać minerałów i nie wchodzić do starych wyrobisk",
      region_pl: "Kletno, Dolny Śląsk.",
      habitat_pl: "Dawna kopalnia uranu i fluorytu w masywie Śnieżnika, znana także z różnorodnych minerałów.",
      occurrence_note: "W atlasie łączy górnictwo strategiczne z bardziej geologiczną opowieścią o barwach skał.",
      level: "uran i fluoryt"
    }),
    base({
      id: "riese-wlodarz",
      name_pl: "Projekt Riese — Włodarz",
      name_lat: "Góry Sowie • kompleks wojenny",
      category: "podziemia-wojenne",
      hook: "Niedokończone podziemne miasto III Rzeszy.",
      quiz_angle: "wielkie hale, niedokończone korytarze, praca przymusowa i niepewna funkcja kompleksu",
      safety_note: "opowiadać o miejscu spokojnym językiem historycznym; zwiedzać tylko z przewodnikiem i nie wchodzić do zamkniętych partii",
      region_pl: "Góry Sowie, Dolny Śląsk.",
      habitat_pl: "Jeden z największych udostępnionych kompleksów projektu Riese, z rozległymi korytarzami i halami.",
      occurrence_note: "To karta o skali niedokończonej budowy i o ludziach, których praca została wykorzystana w czasie wojny.",
      level: "Riese"
    }),
    base({
      id: "riese-osowka",
      name_pl: "Projekt Riese — Osówka",
      name_lat: "Głuszyca • sztolnie i beton",
      category: "podziemia-wojenne",
      hook: "Tunel, bunkier czy fabryka? Osówka zostawia pytania.",
      quiz_angle: "sztolnie, naziemne konstrukcje żelbetowe, hipotezy funkcji i granice wiedzy historycznej",
      safety_note: "nie dopowiadać pewników bez źródeł; teren i podziemia oglądać tylko w miejscach udostępnionych",
      region_pl: "Głuszyca, Dolny Śląsk.",
      habitat_pl: "Kompleks projektu Riese, w którym podziemne chodniki łączą się z tajemniczymi konstrukcjami na powierzchni.",
      occurrence_note: "W atlasie Osówka pokazuje, jak ciekawe bywa miejsce, gdy zachowamy uczciwe „nie wiemy”.",
      level: "Riese"
    }),
    base({
      id: "riese-walim-rzeczka",
      name_pl: "Projekt Riese — Walim-Rzeczka",
      name_lat: "Walim • trzy wejścia w góry",
      category: "podziemia-wojenne",
      hook: "Góry, które miały ukryć wojenną machinę.",
      quiz_angle: "trzy wejścia, żelbetowe odcinki, niewykończone hale i kontekst Gór Sowich",
      safety_note: "zachować historyczny dystans; nie schodzić poza trasę i nie dotykać elementów zabezpieczeń",
      region_pl: "Walim, Dolny Śląsk.",
      habitat_pl: "Udostępniony kompleks Riese z korytarzami, dużymi przestrzeniami i czytelną konstrukcją sztolni.",
      occurrence_note: "Ta karta dobrze tłumaczy, jak wojskowa budowa zmieniała naturalny masyw górski w labirynt.",
      level: "Riese"
    }),
    base({
      id: "podziemia-zamku-ksiaz",
      name_pl: "Podziemia Zamku Książ",
      name_lat: "Wałbrzych • pałac nad tunelem",
      category: "podziemia-wojenne",
      hook: "Pałac nad tunelem.",
      quiz_angle: "rezydencja, korytarze projektu Riese, relacja zamku i prac wojennych",
      safety_note: "traktować miejsce jako zabytek i świadectwo wojny; nie dotykać ścian ani instalacji trasy",
      region_pl: "Wałbrzych, Dolny Śląsk.",
      habitat_pl: "Tunele wydrążone pod jedną z największych rezydencji w Polsce, łączące historię zamku z projektem Riese.",
      occurrence_note: "W atlasie ważny jest kontrast: reprezentacyjny zamek na powierzchni i surowe korytarze pod nim.",
      level: "zamek i Riese"
    }),
    expanded({
      id: "riese-sobon-jugowice-gontowa",
      name_pl: "Projekt Riese — Soboń / Jugowice / Gontowa",
      name_lat: "Góry Sowie • mniej znane odcinki",
      category: "tajemnice-legendy",
      hook: "Najbardziej tajemnicza część większej układanki.",
      quiz_angle: "mniej dostępne kompleksy, nazwy wzgórz, fragmentaryczna dokumentacja i ostrożność interpretacji",
      safety_note: "nie eksplorować samodzielnie starych sztolni; niektóre odcinki mogą być niedostępne, niebezpieczne lub chronione",
      region_pl: "Góry Sowie, Dolny Śląsk.",
      habitat_pl: "Mniej znane elementy projektu Riese, częściowo nieudostępnione lub zachowane fragmentarycznie.",
      occurrence_note: "Ta karta celowo mówi spokojnie: tajemnica jest tu skutkiem braków w źródłach, nie zaproszeniem do ryzyka.",
      level: "Riese"
    }),
    base({
      id: "miedzyrzecki-rejon-umocniony",
      name_pl: "Międzyrzecki Rejon Umocniony",
      name_lat: "Lubuskie • podziemna forteca",
      category: "fortyfikacje-schrony",
      hook: "Podziemna forteca, w której zimują tysiące nietoperzy.",
      quiz_angle: "bunkry, korytarze, zapory pancerne, nietoperze i skala centralnego odcinka",
      safety_note: "zimowiska nietoperzy i fortyfikacje wymagają ciszy, dystansu i wejścia wyłącznie legalną trasą",
      region_pl: "Okolice Międzyrzecza, Lubuskie.",
      habitat_pl: "Rozległy system schronów, korytarzy i obiektów fortecznych, częściowo pełniący rolę zimowiska nietoperzy.",
      occurrence_note: "W atlasie MRU łączy wojskową inżynierię z przyrodniczą historią wtórnie zasiedlonych podziemi.",
      level: "fortyfikacja"
    }),
    base({
      id: "podziemne-miasto-wolin",
      name_pl: "Podziemne Miasto na Wyspie Wolin",
      name_lat: "Świnoujście • schrony dowodzenia",
      category: "fortyfikacje-schrony",
      hook: "Ukryte miasto dowodzenia pod wydmami i lasem.",
      quiz_angle: "bateria nadbrzeżna, schrony, stanowiska dowodzenia i powojskowe warstwy wybrzeża",
      safety_note: "poruszać się po trasie muzealnej; nie wchodzić do zamkniętych schronów ani na elementy umocnień",
      region_pl: "Świnoujście / Wyspa Wolin, Zachodniopomorskie.",
      habitat_pl: "Zespół powojskowych schronów i stanowisk dowodzenia ukrytych w nadmorskim lesie.",
      occurrence_note: "To karta o tym, że wybrzeże ma nie tylko plaże i porty, ale także ciche warstwy militarnej infrastruktury.",
      level: "wybrzeże"
    }),
    base({
      id: "bunkier-stepina-cieszyna",
      name_pl: "Bunkier kolejowy w Stępinie-Cieszynie",
      name_lat: "Podkarpacie • schron dla pociągu",
      category: "fortyfikacje-schrony",
      hook: "Tunel zbudowany dla pociągów specjalnych.",
      quiz_angle: "schron kolejowy, masywny beton, Anlage Süd i wojenne planowanie transportu",
      safety_note: "zachować spokojny ton historyczny; nie wchodzić na konstrukcję ani do niedostępnych części obiektu",
      region_pl: "Stępina-Cieszyna, Podkarpackie.",
      habitat_pl: "Monumentalny żelbetowy schron kolejowy z czasów II wojny światowej.",
      occurrence_note: "W atlasie wyróżnia się formą: to nie klasyczny bunkier, lecz betonowa przestrzeń dla składu kolejowego.",
      level: "schron kolejowy"
    }),
    base({
      id: "bunkier-konewka",
      name_pl: "Bunkier kolejowy Konewka",
      name_lat: "Łódzkie • betonowa rura",
      category: "fortyfikacje-schrony",
      hook: "Betonowa rura dla tajnych pociągów.",
      quiz_angle: "długi schron kolejowy, las, gruby żelbet i podobieństwa do Stępiny",
      safety_note: "zwiedzać tylko udostępnione odcinki; nie wspinać się po betonowych elementach i nie wchodzić do zamkniętych pomieszczeń",
      region_pl: "Konewka koło Spały, Łódzkie.",
      habitat_pl: "Leśny kompleks schronów z charakterystycznym długim schronem kolejowym.",
      occurrence_note: "Ta karta pokazuje, jak infrastruktura transportowa była ukrywana w krajobrazie leśnym.",
      level: "schron kolejowy"
    }),
    expanded({
      id: "mamerki",
      name_pl: "Kompleks schronów w Mamerkach",
      name_lat: "Mazury • kwatera w lesie",
      category: "fortyfikacje-schrony",
      hook: "Mazurski las pełen bunkrów i śladów wojny.",
      quiz_angle: "dawna kwatera, schrony, maskowanie w lesie i powojenne życie miejsca jako muzeum",
      safety_note: "nie wchodzić na zniszczone lub zamknięte konstrukcje; obiekt zwiedzać jako miejsce historii, nie przygody bez zasad",
      region_pl: "Mamerki, Mazury.",
      habitat_pl: "Zespół schronów i obiektów dawnej kwatery wojskowej ukrytej w krajobrazie leśnym.",
      occurrence_note: "W atlasie Mamerki spokojnie domykają mazurski wątek wojskowych kompleksów poza najbardziej znanymi nazwami.",
      level: "kwatera leśna"
    }),
    base({
      id: "twierdza-klodzko-labirynty",
      name_pl: "Twierdza Kłodzko — labirynty",
      name_lat: "Kłodzko • chodniki minerskie",
      category: "fortyfikacje-schrony",
      hook: "Twierdza, która broniła się także pod ziemią.",
      quiz_angle: "chodniki kontrminerskie, kazamaty, obrona twierdzy i akustyka podziemnych korytarzy",
      safety_note: "w labiryntach pilnować grupy i głowy; nie próbować samodzielnie eksplorować bocznych korytarzy",
      region_pl: "Kłodzko, Dolny Śląsk.",
      habitat_pl: "Podziemne chodniki minerskie i kazamaty związane z systemem obronnym twierdzy.",
      occurrence_note: "To karta o podziemiu militarnym starszym niż XX wiek: tu korytarz był narzędziem obrony i kontroli.",
      level: "twierdza"
    }),
    base({
      id: "podziemna-trasa-klodzko",
      name_pl: "Podziemna Trasa Turystyczna w Kłodzku",
      name_lat: "Kłodzko • miasto pod ulicami",
      category: "miejskie-piwnice",
      hook: "Miasto z drugim poziomem pod ulicami.",
      quiz_angle: "piwnice kupieckie, zabezpieczenia, komunikacja pod starówką i różnica wobec twierdzy",
      safety_note: "uważać na schody, wilgoć i niskie przejścia; podziemia miejskie zwiedzać wyłącznie oficjalną trasą",
      region_pl: "Kłodzko, Dolny Śląsk.",
      habitat_pl: "System dawnych piwnic i korytarzy pod zabudową starego miasta.",
      occurrence_note: "W atlasie pokazuje drugie Kłodzko: nie militarne, lecz miejskie i kupieckie.",
      level: "miejskie piwnice"
    }),
    base({
      id: "podziemna-trasa-sandomierz",
      name_pl: "Podziemna Trasa Turystyczna w Sandomierzu",
      name_lat: "Sandomierz • magazyny pod rynkiem",
      category: "miejskie-piwnice",
      hook: "Sandomierz miał pod sobą magazyny, nie tylko legendy.",
      quiz_angle: "lessowe podłoże, piwnice kupieckie, zabezpieczenie miasta i opowieść o ratowaniu starówki",
      safety_note: "trzymać się trasy i nie dotykać ekspozycji; miejskie piwnice są zabytkiem, nie tłem do biegania",
      region_pl: "Sandomierz, Świętokrzyskie.",
      habitat_pl: "Sieć dawnych piwnic i korytarzy pod sandomierskim starym miastem.",
      occurrence_note: "Ta karta dobrze zapamiętuje prostą rzecz: handel budował miasta także w dół.",
      level: "miejskie piwnice"
    }),
    base({
      id: "podziemia-rynku-krakow",
      name_pl: "Podziemia Rynku w Krakowie",
      name_lat: "Kraków • archeologia pod placem",
      category: "miejskie-piwnice",
      hook: "Średniowieczne miasto schowane pod współczesnym placem.",
      quiz_angle: "archeologia miejska, Sukiennice, dawne bruki, handel i ekspozycja pod płytą rynku",
      safety_note: "traktować ekspozycję jak stanowisko archeologiczne; nie dotykać zabezpieczonych reliktów",
      region_pl: "Kraków, Małopolska.",
      habitat_pl: "Nowoczesna ekspozycja archeologiczna pod Rynkiem Głównym, pokazująca warstwy średniowiecznego miasta.",
      occurrence_note: "W atlasie to przykład, że podziemie nie musi być kopalnią: czasem jest zachowaną warstwą miasta.",
      level: "archeologia miejska"
    }),
    base({
      id: "rzeszowskie-piwnice",
      name_pl: "Rzeszowskie Piwnice",
      name_lat: "Rzeszów • korytarze kupieckie",
      category: "miejskie-piwnice",
      hook: "Kupieckie magazyny, które stały się trasą pod ziemią.",
      quiz_angle: "piwnice pod kamienicami, magazynowanie towarów, zabezpieczenie starówki i nowa narracja multimedialna",
      safety_note: "poruszać się spokojnie po schodach i wąskich przejściach; nie schodzić poza udostępniony ciąg",
      region_pl: "Rzeszów, Podkarpackie.",
      habitat_pl: "Podziemny system piwnic pod centrum miasta, związany z handlem i zabezpieczeniem dawnych kamienic.",
      occurrence_note: "Ta karta pokazuje, jak miejskie podziemia przechodzą od funkcji magazynowej do edukacyjnej.",
      level: "miejskie piwnice"
    }),
    base({
      id: "podziemna-trasa-jaroslaw",
      name_pl: "Podziemna Trasa w Jarosławiu",
      name_lat: "Jarosław • handel w dół",
      category: "miejskie-piwnice",
      hook: "Miasto handlowe rosło także w dół.",
      quiz_angle: "piwnice kupieckie, jarmarki, magazyny, zabezpieczenia pod kamienicami i wielopoziomowość miasta",
      safety_note: "nie dotykać murów i ekspozycji; wąskie przejścia wymagają spokojnego tempa",
      region_pl: "Jarosław, Podkarpackie.",
      habitat_pl: "Piwnice i korytarze pod kamienicami miasta znanego z dawnych kontaktów handlowych.",
      occurrence_note: "W atlasie Jarosław wyjaśnia prosty mechanizm: wielki handel potrzebował chłodnych, pojemnych zapleczy.",
      level: "kupieckie piwnice"
    }),
    base({
      id: "podziemia-opatowskie",
      name_pl: "Podziemia Opatowskie",
      name_lat: "Opatów • małe miasto pod spodem",
      category: "miejskie-piwnice",
      hook: "Małe miasto z dużym podziemnym zapleczem.",
      quiz_angle: "piwnice kupieckie, korytarze pod starówką, magazynowanie i różnica skali wobec dużych miast",
      safety_note: "uważać na nierówności i schody; podziemne mury oglądać bez dotykania i skrobania powierzchni",
      region_pl: "Opatów, Świętokrzyskie.",
      habitat_pl: "Dawne piwnice i korytarze pod historycznym centrum Opatowa.",
      occurrence_note: "Ta karta przypomina, że podziemna infrastruktura nie była przywilejem największych ośrodków.",
      level: "miejskie piwnice"
    }),
    expanded({
      id: "torunskie-piwnice",
      name_pl: "Toruńskie piwnice i podziemia staromiejskie",
      name_lat: "Toruń • gotyk nad magazynami",
      category: "miejskie-piwnice",
      hook: "Gotyk na powierzchni, handel pod ziemią.",
      quiz_angle: "miasto hanzeatyckie, kamienice, chłodne piwnice i handlowy sens podziemi",
      safety_note: "zwiedzać tylko miejsca udostępnione publicznie; piwnice kamienic często pozostają częścią czynnych budynków",
      region_pl: "Toruń, Kujawsko-Pomorskie.",
      habitat_pl: "Rozbudowane piwnice i podziemia związane z historyczną zabudową staromiejską.",
      occurrence_note: "W atlasie Toruń jest miejską lekcją o tym, że zaplecze handlu bywa mniej widoczne niż gotyckie fasady.",
      level: "hanzeatyckie piwnice"
    }),
    base({
      id: "chelmskie-podziemia-kredowe",
      name_pl: "Chełmskie Podziemia Kredowe",
      name_lat: "Chełm • białe korytarze",
      category: "tajemnice-legendy",
      hook: "Białe podziemia z duchem Bieluchem.",
      quiz_angle: "kreda, miejskie wydobycie pod domami, labirynt korytarzy i legenda Bielucha",
      safety_note: "nie schodzić do nieudostępnionych korytarzy; miękka kreda i stare wyrobiska wymagają stałego zabezpieczenia",
      region_pl: "Chełm, Lubelskie.",
      habitat_pl: "Labirynt korytarzy wykutych w kredzie pod miastem, powstałych z dawnego wydobycia.",
      occurrence_note: "To karta, w której geologia, gospodarka miasta i legenda spotykają się w jednej białej przestrzeni.",
      level: "kredowy labirynt"
    })
  ];

  window.UNDERGROUND_APP_DATA = {
    subtitle: "30 podziemnych osobliwości Polski: kopalnie soli, krzemienia i srebra, miejskie piwnice, sztolnie, schrony oraz tajemnice Gór Sowich.",
    safety_notice: "To prototyp edukacyjny. Podziemia zwiedzaj tylko legalnymi trasami: nie wchodź do opuszczonych sztolni, schronów ani piwnic, nie dotykaj zabezpieczeń i przy obiektach wojennych zachowuj spokojny, historyczny ton.",
    categories,
    underground
  };
})();
