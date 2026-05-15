(() => {
  const categories = [
    { id: "woda-kanaly", label: "Woda i kanały", short: "Woda", icon: "W" },
    { id: "mosty-tunele-koleje", label: "Mosty i tunele", short: "Mosty", icon: "M" },
    { id: "energia", label: "Energia", short: "Energia", icon: "E" },
    { id: "radio-komunikacja", label: "Radio i komunikacja", short: "Radio", icon: "R" },
    { id: "przemyslowe-miasta", label: "Przemysłowe miasta", short: "Miasta", icon: "P" },
    { id: "adaptacje-industrialne", label: "Adaptacje industrialne", short: "Adaptacje", icon: "A" },
    { id: "beton-fortyfikacje", label: "Beton i fortyfikacje", short: "Beton", icon: "B" }
  ];

  const cat = Object.fromEntries(categories.map((category) => [category.id, category]));

  const sharedSourceHints = [
    "oficjalna strona obiektu, muzeum, miasta lub zarządcy",
    "NID / zabytek.pl, UNESCO albo Pomnik Historii, jeśli dotyczy",
    "materiały techniczne zarządcy infrastruktury lub instytucji branżowej"
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

  const engineeringWonders = [
    base({
      id: "kanal-elblaski",
      name_pl: "Kanał Elbląski",
      name_lat: "Warmińsko-Mazurskie • pochylnie i woda",
      category: "woda-kanaly",
      hook: "Statek jedzie po trawie.",
      quiz_angle: "pochylnie, wózki torowe, różnica poziomów i pomysł przewożenia statku lądem",
      safety_note: "oglądać pochylnie z wyznaczonych miejsc; nie wchodzić na urządzenia techniczne ani tory wózków",
      region_pl: "Warmińsko-Mazurskie.",
      habitat_pl: "Mechanizm: system pochylni przenosi jednostki między odcinkami kanału, gdy sama śluza nie wystarczyłaby do pokonania różnicy wysokości.",
      occurrence_note: "Osobliwością nie jest długość kanału, lecz sposób rozwiązania problemu wysokości: statek na chwilę staje się ładunkiem kolejki.",
      level: "statek na trawie"
    }),
    base({
      id: "teznie-ciechocinek",
      name_pl: "Tężnie solankowe w Ciechocinku",
      name_lat: "Kujawsko-Pomorskie • drewno, tarnina i solanka",
      category: "woda-kanaly",
      hook: "Największy spacerowy inhalator z drewna i tarniny.",
      quiz_angle: "solanka spływająca po tarninie, parowanie, aerozol i drewniana skala konstrukcji",
      safety_note: "korzystać z udostępnionych alejek i zasad uzdrowiska; nie wchodzić na konstrukcję ani nie odłamywać gałązek tarniny",
      region_pl: "Ciechocinek, Kujawsko-Pomorskie.",
      habitat_pl: "Mechanizm: solanka rozprowadzona po gałęziach traci część wody przez parowanie, a w powietrzu pojawia się słony aerozol.",
      occurrence_note: "To infrastruktura przemysłowo-uzdrowiskowa, w której proces technologiczny stał się także krajobrazem spaceru.",
      level: "solanka w powietrzu"
    }),
    base({
      id: "radiostacja-gliwicka",
      name_pl: "Radiostacja Gliwicka",
      name_lat: "Gliwice • drewniana wieża radiowa",
      category: "radio-komunikacja",
      hook: "Drewniana wieża dla fal radiowych.",
      quiz_angle: "wysoka konstrukcja drewniana, elementy niemagnetyczne, radio i propagacja fal",
      safety_note: "zwiedzać zgodnie z zasadami muzeum; nie wchodzić na konstrukcję ani do stref technicznych bez zgody",
      region_pl: "Gliwice, Śląskie.",
      habitat_pl: "Mechanizm: konstrukcja nośna została wykonana z drewna, aby ograniczyć zakłócenia i pracować z urządzeniami radiowymi.",
      occurrence_note: "Wieża jest osobliwa, bo wielka infrastruktura łączności wygląda tu bardziej jak ciesielski eksperyment niż stalowy maszt.",
      level: "drewno i radio"
    }),
    base({
      id: "hala-stulecia",
      name_pl: "Hala Stulecia",
      name_lat: "Wrocław • żelbetowa kopuła UNESCO",
      category: "beton-fortyfikacje",
      hook: "Betonowa kopuła, która wyprzedziła epokę.",
      quiz_angle: "żelbet, wielka rozpiętość, kopuła, hala widowiskowa i przełom w konstrukcjach XX wieku",
      safety_note: "traktować obiekt jak czynny zabytek i przestrzeń wydarzeń; nie wchodzić do stref technicznych ani na elementy konstrukcji",
      region_pl: "Wrocław, Dolnośląskie.",
      habitat_pl: "Mechanizm: żelbet pozwolił połączyć masę betonu ze zbrojeniem stalowym i uzyskać dużą, otwartą przestrzeń pod kopułą.",
      occurrence_note: "W atlasie Hala Stulecia jest lekcją materiału: beton przestaje być ścianą, a staje się śmiałą konstrukcją nośną.",
      level: "żelbet UNESCO"
    }),
    base({
      id: "zapora-solina",
      name_pl: "Zapora Solina",
      name_lat: "Bieszczady • beton i energia",
      category: "energia",
      hook: "Betonowa ściana, która stworzyła bieszczadzkie morze.",
      quiz_angle: "zapora wodna, retencja, elektrownia, krajobraz zalewu i skala betonowej przegrody",
      safety_note: "poruszać się tylko po udostępnionych miejscach; nie schodzić do stref technicznych ani na brzegi wyłączone z ruchu",
      region_pl: "Solina, Podkarpackie.",
      habitat_pl: "Mechanizm: zapora piętrzy wodę, tworzy zbiornik i pozwala zamieniać kontrolowany przepływ w energię elektryczną.",
      occurrence_note: "Osobliwością jest tu zamiana doliny w wielki układ hydrotechniczny: krajobraz, retencję i produkcję energii naraz.",
      level: "bieszczadzka tama"
    }),
    base({
      id: "zapora-pilchowice",
      name_pl: "Zapora Pilchowice",
      name_lat: "Dolnośląskie • łuk nad Bobrem",
      category: "energia",
      hook: "Kamienno-betonowy łuk w górskiej dolinie.",
      quiz_angle: "zapora łukowa, dolina Bobru, historyczna hydroenergetyka i praca parcia wody",
      safety_note: "oglądać z legalnych punktów widokowych i dróg; nie przechodzić przez zamknięte elementy zapory",
      region_pl: "Pilchowice, Dolnośląskie.",
      habitat_pl: "Mechanizm: łukowa forma pomaga przenosić nacisk spiętrzonej wody na zbocza doliny i masę konstrukcji.",
      occurrence_note: "To karta o tym, że zapora nie jest tylko ścianą: jej kształt jest odpowiedzią na geometrię rzeki i gór.",
      level: "łuk hydrotechniki"
    }),
    base({
      id: "elektrownia-porabka-zar",
      name_pl: "Elektrownia Porąbka-Żar",
      name_lat: "Śląskie • górska bateria wodna",
      category: "energia",
      hook: "Bateria zrobiona z góry i jeziora.",
      quiz_angle: "elektrownia szczytowo-pompowa, pompowanie wody pod górę, spadek i magazynowanie energii",
      safety_note: "nie wchodzić na infrastrukturę energetyczną ani do stref zamkniętych; zbiorniki i skarpy traktować jako obiekty techniczne",
      region_pl: "Międzybrodzie Bialskie / góra Żar, Śląskie.",
      habitat_pl: "Mechanizm: gdy energii jest nadmiar, woda jest pompowana wyżej; gdy potrzeba mocy, spływa przez turbiny.",
      occurrence_note: "Osobliwością jest tu odwrócenie intuicji: najpierw wydaje się energię na podniesienie wody, aby później odzyskać ją w szczycie zapotrzebowania.",
      level: "bateria krajobrazu"
    }),
    base({
      id: "elektrownia-zarnowiec",
      name_pl: "Elektrownia Żarnowiec",
      name_lat: "Pomorskie • magazyn energii",
      category: "energia",
      hook: "Magazyn energii w skali krajobrazu.",
      quiz_angle: "duża elektrownia szczytowo-pompowa, górny zbiornik, jezioro i stabilizacja systemu",
      safety_note: "infrastrukturę energetyczną oglądać tylko z miejsc publicznych; nie wchodzić na teren zakładu ani skarpy zbiorników",
      region_pl: "Czymanowo / okolice Jeziora Żarnowieckiego, Pomorskie.",
      habitat_pl: "Mechanizm: układ dwóch poziomów wody działa jak akumulator, który przechowuje energię w postaci wysokości.",
      occurrence_note: "Ta karta pokazuje, że magazyn energii może być nie pudełkiem z chemią, lecz wielkim układem terenu i wody.",
      level: "wodny akumulator"
    }),
    base({
      id: "mosty-tczewskie",
      name_pl: "Mosty Tczewskie",
      name_lat: "Tczew / Lisewo • żelazna brama Wisły",
      category: "mosty-tunele-koleje",
      hook: "Żelazna brama przez Wisłę.",
      quiz_angle: "przeprawa przez Wisłę, konstrukcja kratownicowa, kolej i rola komunikacyjna Pomorza",
      safety_note: "oglądać z udostępnionych tras i punktów; nie wchodzić na zamknięte części konstrukcji ani tory",
      region_pl: "Tczew / Lisewo, Pomorskie.",
      habitat_pl: "Mechanizm: stalowe przęsła przenoszą obciążenia nad szeroką rzeką, tworząc trwałą przeprawę kolejowo-drogową.",
      occurrence_note: "Osobliwością jest rola mostu jako infrastruktury państwa: technika, transport i historia skupione w jednym przejściu przez Wisłę.",
      level: "brama Wisły"
    }),
    base({
      id: "most-redzinski",
      name_pl: "Most Rędziński",
      name_lat: "Wrocław • most wantowy",
      category: "mosty-tunele-koleje",
      hook: "Most zawieszony na jednym wielkim geście.",
      quiz_angle: "most wantowy, pylon, liny nośne, obwodnica i czytelna praca sił",
      safety_note: "oglądać z bezpiecznych miejsc poza ruchem; nie zatrzymywać się w miejscach niedozwolonych na jezdni",
      region_pl: "Wrocław, Dolnośląskie.",
      habitat_pl: "Mechanizm: wanty przekazują ciężar pomostu na pylon, dzięki czemu długa przeprawa może mieć rozpoznawalną, lekką sylwetkę.",
      occurrence_note: "To współczesna lekcja konstrukcji: most pozwala zobaczyć, jak lina, pylon i jezdnia układają się w jeden układ sił.",
      level: "wanty nad Odrą"
    }),
    base({
      id: "most-grunwaldzki",
      name_pl: "Most Grunwaldzki",
      name_lat: "Wrocław • stalowa ikona Odry",
      category: "mosty-tunele-koleje",
      hook: "Wrocławska stalowa ikona nad Odrą.",
      quiz_angle: "historyczny most miejski, stal, zawieszenie i rola przeprawy w układzie centrum Wrocławia",
      safety_note: "poruszać się chodnikami i przejściami; nie wchodzić na elementy konstrukcji ani nad jezdnię",
      region_pl: "Wrocław, Dolnośląskie.",
      habitat_pl: "Mechanizm: stalowa konstrukcja przenosi ruch przez rzekę, a jej forma stała się częścią miejskiej orientacji.",
      occurrence_note: "W atlasie pokazuje most jako infrastrukturę i symbol naraz: technika codziennie niesie ruch, ale też buduje obraz miasta.",
      level: "ikona mostowa"
    }),
    base({
      id: "wiadukt-boleslawiec",
      name_pl: "Wiadukt kolejowy w Bolesławcu",
      name_lat: "Dolnośląskie • kamienna kolej nad Bobrem",
      category: "mosty-tunele-koleje",
      hook: "Rzymski rozmach kolei XIX wieku.",
      quiz_angle: "kamienny wiadukt, arkady, rzeka Bóbr, kolej i monumentalna skala infrastruktury",
      safety_note: "oglądać z legalnych punktów; nie wchodzić na tory ani elementy kolejowe",
      region_pl: "Bolesławiec, Dolnośląskie.",
      habitat_pl: "Mechanizm: powtarzalne arkady rozkładają ciężar torów i pociągów, pozwalając kolei przejść wysoko nad doliną.",
      occurrence_note: "Osobliwością jest skala dawnej kolei: wiadukt wygląda jak akwedukt, ale służy rytmowi pociągów.",
      level: "arkady kolei"
    }),
    base({
      id: "kanal-augustowski-sluzy",
      name_pl: "Kanał Augustowski — śluzy",
      name_lat: "Podlaskie • geometria poziomów",
      category: "woda-kanaly",
      hook: "Ręczna geometria wody i poziomów.",
      quiz_angle: "kanał, śluzy, komory, poziomy wody i historyczny transport wodny",
      safety_note: "przy śluzach zachować dystans od krawędzi, wrót i ruchomych elementów; stosować się do obsługi kanału",
      region_pl: "Podlaskie.",
      habitat_pl: "Mechanizm: śluza zamyka łódź w komorze i zmienia poziom wody, aby pokonać różnicę wysokości między odcinkami kanału.",
      occurrence_note: "Ta karta pokazuje inżynierię bardzo czytelną: wystarczy patrzeć na komorę, wrota i poziom wody.",
      level: "winda wodna"
    }),
    base({
      id: "sluza-paniewo",
      name_pl: "Śluza Paniewo",
      name_lat: "Kanał Augustowski • dwie komory",
      category: "woda-kanaly",
      hook: "Winda wodna z XIX wieku.",
      quiz_angle: "dwukomorowa śluza, większa różnica poziomów, ręczna obsługa i precyzja hydrotechniki",
      safety_note: "nie dotykać mechanizmów śluzy i nie stawać przy krawędziach komór podczas pracy urządzeń",
      region_pl: "Kanał Augustowski, Podlaskie.",
      habitat_pl: "Mechanizm: dwie komory działają sekwencyjnie, dzieląc większą zmianę poziomu na bezpieczniejsze etapy.",
      occurrence_note: "Paniewo dobrze tłumaczy, że śluza jest maszyną zrobioną z wody, wrót i cierpliwej kolejności działań.",
      level: "dwie komory"
    }),
    base({
      id: "kanal-gliwicki",
      name_pl: "Kanał Gliwicki",
      name_lat: "Śląskie / Opolskie • droga wodna przemysłu",
      category: "woda-kanaly",
      hook: "Droga wodna dla ciężkiego przemysłu.",
      quiz_angle: "kanał żeglugowy, śluzy, połączenie Śląska z Odrą i transport towarów",
      safety_note: "nie wchodzić na nabrzeża techniczne ani urządzenia śluz; ruch statków obserwować z miejsc publicznych",
      region_pl: "Śląskie / Opolskie.",
      habitat_pl: "Mechanizm: kanał tworzy kontrolowaną drogę wodną, gdzie poziomy, brzegi i śluzy podporządkowano transportowi.",
      occurrence_note: "W atlasie Kanał Gliwicki pokazuje infrastrukturę jako krwiobieg przemysłu, mniej widowiskowy, ale bardzo praktyczny.",
      level: "wodna logistyka"
    }),
    base({
      id: "wroclawski-wezel-wodny",
      name_pl: "Wrocławski Węzeł Wodny",
      name_lat: "Wrocław • miasto sterujące rzeką",
      category: "woda-kanaly",
      hook: "Miasto, które musiało nauczyć się sterować rzeką.",
      quiz_angle: "kanały, jazy, śluzy, ochrona przeciwpowodziowa i miejski układ Odry",
      safety_note: "przy jazach i kanałach zachować dystans od nurtu oraz urządzeń hydrotechnicznych; nie wchodzić na zamknięte obiekty",
      region_pl: "Wrocław, Dolnośląskie.",
      habitat_pl: "Mechanizm: sieć odnóg, kanałów, jazów i śluz rozdziela przepływy oraz pozwala miastu funkcjonować obok dużej rzeki.",
      occurrence_note: "To osobliwość systemowa: pojedynczy obiekt jest mniej ważny niż cała wodna maszyna miasta.",
      level: "miasto i rzeka"
    }),
    base({
      id: "tunel-pod-martwa-wisla",
      name_pl: "Tunel pod Martwą Wisłą",
      name_lat: "Gdańsk • droga pod rzeką",
      category: "mosty-tunele-koleje",
      hook: "Droga pod rzeką.",
      quiz_angle: "tunel drogowy, rzeka, pierścienie obudowy, wentylacja i połączenie części miasta",
      safety_note: "tunel traktować jak czynny obiekt drogowy; nie zatrzymywać się ani nie wchodzić poza miejsca awaryjne",
      region_pl: "Gdańsk, Pomorskie.",
      habitat_pl: "Mechanizm: obudowa tunelu oddziela ruch drogowy od gruntu i wody, a wentylacja oraz systemy bezpieczeństwa utrzymują pracę obiektu.",
      occurrence_note: "Osobliwość polega na przesunięciu miasta w trzeci wymiar: zamiast mostu nad wodą powstał przejazd pod jej dnem.",
      level: "podwodna droga"
    }),
    base({
      id: "tunel-pod-swina",
      name_pl: "Tunel pod Świną",
      name_lat: "Świnoujście • połączenie wysp",
      category: "mosty-tunele-koleje",
      hook: "Miasto połączone pod wodą.",
      quiz_angle: "tunel drogowy, Uznam, Wolin, maszyna drążąca i stałe połączenie miejskie",
      safety_note: "korzystać zgodnie z zasadami ruchu; nie zatrzymywać się w tunelu poza sytuacją awaryjną",
      region_pl: "Świnoujście, Zachodniopomorskie.",
      habitat_pl: "Mechanizm: podwodny tunel tworzy stałe połączenie wysp, zastępując zależność codziennego ruchu od przeprawy promowej.",
      occurrence_note: "W atlasie to prosty, mocny przykład, jak inżynieria zmienia geografię codzienności mieszkańców.",
      level: "wyspy pod wodą"
    }),
    base({
      id: "kolej-kasprowy-wierch",
      name_pl: "Kolej linowa na Kasprowy Wierch",
      name_lat: "Tatry • kolej wysokogórska",
      category: "mosty-tunele-koleje",
      hook: "Wjazd w Tatry jako projekt inżynieryjny.",
      quiz_angle: "lina nośna, podpory, różnica wysokości, pogoda wysokogórska i transport ludzi",
      safety_note: "stosować się do zasad kolei i Tatrzańskiego Parku Narodowego; nie schodzić poza wyznaczone szlaki",
      region_pl: "Tatry, Małopolskie.",
      habitat_pl: "Mechanizm: wagonik porusza się po linie między stacjami, a cała trasa musi pracować w trudnych warunkach górskich.",
      occurrence_note: "To karta o tym, że turystyczny zachwyt ma bardzo techniczne zaplecze: podpory, napęd, liny i reżim pogody.",
      level: "kolej wysokogórska"
    }),
    base({
      id: "kolej-gubalowka",
      name_pl: "Kolej linowo-terenowa na Gubałówkę",
      name_lat: "Zakopane • stromy tor miejski",
      category: "mosty-tunele-koleje",
      hook: "Mała kolej, duża różnica wysokości.",
      quiz_angle: "kolej linowo-terenowa, mijanka, nachylenie, napęd linowy i szybkie pokonanie stoku",
      safety_note: "wsiadać i wysiadać tylko w wyznaczonych miejscach; nie wchodzić na tor ani strefy techniczne",
      region_pl: "Zakopane, Małopolskie.",
      habitat_pl: "Mechanizm: wagoniki poruszają się po torach połączone liną, dzięki czemu stromy stok staje się krótką trasą komunikacyjną.",
      occurrence_note: "Gubałówka pokazuje mniejszą, miejską skalę tej samej idei: wysokość rozwiązuje się torami, liną i rytmem wagoników.",
      level: "stromy tor"
    }),
    base({
      id: "port-gdynia",
      name_pl: "Port Gdynia",
      name_lat: "Gdynia • port zbudowany jako strategia",
      category: "radio-komunikacja",
      hook: "Miasto i port stworzone niemal od zera.",
      quiz_angle: "baseny portowe, nabrzeża, kolej, magazyny i strategiczny projekt II RP",
      safety_note: "nie wchodzić na czynne nabrzeża ani tereny portowe bez zgody; ruch portowy obserwować z miejsc publicznych",
      region_pl: "Gdynia, Pomorskie.",
      habitat_pl: "Mechanizm: port łączy wodę, kolej, drogi, magazyny i urządzenia przeładunkowe w jeden system wymiany towarów.",
      occurrence_note: "Osobliwością jest skala planu: infrastruktura nie tylko obsłużyła miasto, ale w dużej mierze je stworzyła.",
      level: "port II RP"
    }),
    base({
      id: "modernizm-gdyni",
      name_pl: "Modernizm Gdyni",
      name_lat: "Gdynia • architektura miasta-portu",
      category: "przemyslowe-miasta",
      hook: "Polska wizja nowoczesności nad morzem.",
      quiz_angle: "urbanistyka, białe fasady, zaokrąglenia, rytm portowego miasta i architektura międzywojnia",
      safety_note: "oglądać z przestrzeni publicznej i szanować czynne budynki mieszkalne oraz usługowe",
      region_pl: "Gdynia, Pomorskie.",
      habitat_pl: "Mechanizm: układ ulic, funkcje portowe i modernistyczne formy budynków wspólnie budowały obraz miasta szybkiej modernizacji.",
      occurrence_note: "W atlasie modernizm Gdyni jest osobliwością urbanistyczną: całe miasto działa jak projekt nowoczesności.",
      level: "miasto-port"
    }),
    base({
      id: "osada-fabryczna-zyrardow",
      name_pl: "Osada fabryczna Żyrardów",
      name_lat: "Mazowieckie • miasto fabryki lnu",
      category: "przemyslowe-miasta",
      hook: "Fabryka, która zbudowała całe miasto.",
      quiz_angle: "układ osady przemysłowej, fabryka, mieszkania robotnicze, usługi i planowanie społeczne",
      safety_note: "szanować prywatne i czynne budynki; opuszczonych obiektów nie traktować jak miejsca eksploracji",
      region_pl: "Żyrardów, Mazowieckie.",
      habitat_pl: "Mechanizm: zakład przemysłowy potrzebował mieszkań, usług i infrastruktury, więc zorganizował wokół siebie cały miejski organizm.",
      occurrence_note: "To karta o urbanistyce pracy: osobliwością jest nie jeden gmach, lecz relacja fabryki, domów i codziennego życia.",
      level: "miasto fabryki"
    }),
    base({
      id: "ksiezy-mlyn",
      name_pl: "Księży Młyn",
      name_lat: "Łódź • bawełniane miasto w mieście",
      category: "przemyslowe-miasta",
      hook: "Bawełniane miasto w mieście.",
      quiz_angle: "kompleks fabryczny, domy robotnicze, rezydencja, szkoła, sklep i układ przemysłowego osiedla",
      safety_note: "poruszać się przestrzenią publiczną i udostępnionymi wnętrzami; nie wchodzić do zamkniętych budynków pofabrycznych",
      region_pl: "Łódź, Łódzkie.",
      habitat_pl: "Mechanizm: przemysł włókienniczy skupił produkcję, mieszkanie i usługi w jednym, czytelnym układzie przestrzennym.",
      occurrence_note: "W atlasie Księży Młyn tłumaczy, jak fabryka potrafiła być centrum techniki, ekonomii i życia społecznego naraz.",
      level: "bawełniane miasto"
    }),
    base({
      id: "nikiszowiec",
      name_pl: "Nikiszowiec",
      name_lat: "Katowice • ceglane osiedle górnicze",
      category: "przemyslowe-miasta",
      hook: "Czerwone miasto dla górników.",
      quiz_angle: "osiedle robotnicze, cegła, dziedzińce, powtarzalny układ i zaplecze kopalni",
      safety_note: "pamiętać, że to dzielnica zamieszkana; nie wchodzić na podwórza ani do klatek bez zaproszenia",
      region_pl: "Katowice, Śląskie.",
      habitat_pl: "Mechanizm: układ kwartałów i mieszkań odpowiadał rytmowi pracy kopalni oraz potrzebom społeczności robotniczej.",
      occurrence_note: "Osobliwością jest spójność: infrastruktura mieszkaniowa staje się równie wyrazista jak sama kopalnia.",
      level: "ceglany rytm"
    }),
    base({
      id: "giszowiec",
      name_pl: "Giszowiec",
      name_lat: "Katowice • śląskie miasto-ogród",
      category: "przemyslowe-miasta",
      hook: "Śląska wersja miasta-ogrodu.",
      quiz_angle: "miasto-ogród, domy robotnicze, zieleń, przemysł i inny model mieszkania przy kopalni",
      safety_note: "oglądać z poszanowaniem mieszkańców i prywatnych posesji; nie traktować osiedla jak skansenu bez ludzi",
      region_pl: "Katowice, Śląskie.",
      habitat_pl: "Mechanizm: zamiast zwartego ceglanego kwartału zastosowano luźniejszy układ z zielenią, który miał poprawić warunki życia pracowników.",
      occurrence_note: "W atlasie Giszowiec pokazuje, że przemysłowe osiedle nie musiało mieć jednej formy: mogło też udawać spokojną wieś-ogrodową.",
      level: "miasto-ogród"
    }),
    base({
      id: "ec1-lodz",
      name_pl: "EC1 Łódź",
      name_lat: "Łódź • elektrownia wiedzy",
      category: "adaptacje-industrialne",
      hook: "Energia przemysłowa zamieniona w energię wiedzy.",
      quiz_angle: "dawna elektrownia, turbiny, rewitalizacja, centrum nauki i zmiana funkcji infrastruktury",
      safety_note: "zwiedzać zgodnie z regulaminem centrum; nie dotykać ekspozycji technicznych poza elementami interaktywnymi",
      region_pl: "Łódź, Łódzkie.",
      habitat_pl: "Mechanizm: architektura przemysłowa została zachowana i przystosowana do edukacji, kultury oraz pokazów technologii.",
      occurrence_note: "To przykład, że osobliwość techniczna może przetrwać zmianę funkcji: z maszynowni w miejsce opowieści o maszynach.",
      level: "elektrownia kultury"
    }),
    base({
      id: "stocznia-gdanska",
      name_pl: "Stocznia Gdańska — suwnice i bramy",
      name_lat: "Gdańsk • metal, praca i historia",
      category: "przemyslowe-miasta",
      hook: "Metal, praca i historia, która zmieniła Europę.",
      quiz_angle: "suwnice, bramy, przemysł okrętowy, przestrzeń pracy i pamięć Solidarności",
      safety_note: "czynne i prywatne tereny stoczniowe oglądać tylko tam, gdzie są udostępnione; nie wchodzić na konstrukcje ani place robocze",
      region_pl: "Gdańsk, Pomorskie.",
      habitat_pl: "Mechanizm: stocznia łączy hale, dźwigi, nabrzeża i logistykę ciężkich elementów kadłubów w jeden organizm produkcyjny.",
      occurrence_note: "W atlasie to miejsce łączy inżynierię przemysłową z historią społeczną: techniczna przestrzeń stała się sceną zmiany politycznej.",
      level: "stocznia pamięci"
    }),
    base({
      id: "muzeum-slaskie-kopalnia-katowice",
      name_pl: "Muzeum Śląskie / dawna Kopalnia Katowice",
      name_lat: "Katowice • kultura po kopalni",
      category: "adaptacje-industrialne",
      hook: "Kultura pod i nad dawną kopalnią.",
      quiz_angle: "kopalnia, wieża szybowa, adaptacja, podziemne galerie i nowe życie terenu przemysłowego",
      safety_note: "korzystać z udostępnionych tras i punktów widokowych; nie wchodzić do zamkniętych szybów ani infrastruktury technicznej",
      region_pl: "Katowice, Śląskie.",
      habitat_pl: "Mechanizm: dawna infrastruktura kopalniana została przekształcona tak, aby zachować pamięć przemysłu i pomieścić funkcje muzealne.",
      occurrence_note: "Osobliwość polega na odwróceniu kierunku: miejsce wydobycia spod ziemi stało się przestrzenią pokazywania kultury i historii.",
      level: "kopalnia muzeum"
    }),
    base({
      id: "kopiec-kosciuszki-fort",
      name_pl: "Kopiec Kościuszki z fortem",
      name_lat: "Kraków • usypana góra i pierścień",
      category: "beton-fortyfikacje",
      hook: "Usypana góra i wojskowy pierścień.",
      quiz_angle: "kopiec ziemny, fortyfikacje, geometria obrony, punkt widokowy i symbol pamięci",
      safety_note: "poruszać się wyznaczonymi trasami; nie wchodzić na skarpy, mury i elementy fortyfikacji poza udostępnionymi miejscami",
      region_pl: "Kraków, Małopolskie.",
      habitat_pl: "Mechanizm: forma ziemna kopca została otoczona infrastrukturą forteczną, która podporządkowała teren logice obrony.",
      occurrence_note: "W atlasie to nietypowe połączenie symbolu i inżynierii: pamięć usypano w ziemi, a potem wpisano w system twierdzy.",
      level: "ziemia i fort"
    }),
    base({
      id: "fort-winiary-cytadela-poznan",
      name_pl: "Fort Winiary / Cytadela Poznańska",
      name_lat: "Poznań • twierdza zmieniona w park",
      category: "beton-fortyfikacje",
      hook: "Forteca, która stała się zielonym miastem.",
      quiz_angle: "fortyfikacje, przekształcenie funkcji, park pamięci i układ dawnej twierdzy",
      safety_note: "respektować regulamin parku i miejsca pamięci; nie wchodzić do zamkniętych pozostałości fortyfikacji",
      region_pl: "Poznań, Wielkopolskie.",
      habitat_pl: "Mechanizm: dawny teren wojskowy został przekształcony w przestrzeń publiczną, ale ślady układu obronnego nadal organizują krajobraz.",
      occurrence_note: "Ta karta pokazuje długie życie infrastruktury: obiekt projektowany do kontroli miasta stał się jego zielonym fragmentem.",
      level: "fort parkowy"
    }),
    base({
      id: "wieza-cisnien-borek",
      name_pl: "Wieża ciśnień Borek",
      name_lat: "Wrocław • architektura ciśnienia wody",
      category: "woda-kanaly",
      hook: "Architektura dla ciśnienia wody.",
      quiz_angle: "wieża ciśnień, wodociągi, wysokość zbiornika, ciśnienie i reprezentacyjna forma infrastruktury",
      safety_note: "oglądać jako zabytek z miejsc dostępnych publicznie; nie wchodzić do środka ani na teren bez zgody",
      region_pl: "Wrocław, Dolnośląskie.",
      habitat_pl: "Mechanizm: wyniesiony zbiornik pomagał utrzymywać ciśnienie w sieci wodociągowej dzięki różnicy wysokości.",
      occurrence_note: "Osobliwością jest elegancja rzeczy praktycznej: budynek dla ciśnienia wody dostał monumentalną, miejską formę.",
      level: "ciśnienie w wieży"
    }),
    base({
      id: "dzwigi-portowe-szczecin",
      name_pl: "Dźwigi i infrastruktura portowa Szczecina",
      name_lat: "Szczecin • maszyny miasta-portu",
      category: "przemyslowe-miasta",
      hook: "Maszyny, które robią z miasta port.",
      quiz_angle: "dźwigi, nabrzeża, przeładunek, Odra, port morsko-rzeczny i skala logistyki",
      safety_note: "czynne nabrzeża i urządzenia portowe oglądać tylko z miejsc publicznych; nie wchodzić na teren portu bez uprawnienia",
      region_pl: "Szczecin, Zachodniopomorskie.",
      habitat_pl: "Mechanizm: dźwigi i nabrzeża zamieniają granicę wody i lądu w miejsce przeładunku, sortowania oraz dalszego transportu.",
      occurrence_note: "W atlasie Szczecin domyka portowy wątek: osobliwością nie jest pojedynczy budynek, lecz praca maszyn w miejskim krajobrazie.",
      level: "portowe maszyny"
    })
  ];

  window.ENGINEERING_WONDER_APP_DATA = {
    subtitle: "33 techniczne osobliwości Polski: kanały, śluzy, tężnie, radiostacje, hale, zapory, mosty, tunele, koleje i przemysłowe miasta.",
    long_intro: "To kolekcja miejsc, w których inżynierowie próbowali wygrać z fizyką: przenieść statek przez trawę, zagęścić solankę w powietrzu, zbudować drewnianą wieżę radiową bez stali albo przykryć halę kopułą, która wyprzedziła swoją epokę.",
    safety_notice: "To prototyp edukacyjny. Obiekty techniczne oglądaj z miejsc legalnie udostępnionych: nie wchodź na zapory, tory, nabrzeża, konstrukcje mostowe ani tereny przemysłowe bez zgody i traktuj czynną infrastrukturę jak realne miejsce pracy.",
    categories,
    engineeringWonders
  };
})();
