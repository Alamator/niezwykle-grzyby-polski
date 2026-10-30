(() => {
  const categories = [
    { id: "piasek-wydmy", label: "Piasek i wydmy", short: "Piasek", icon: "P" },
    { id: "las-deformacje", label: "Las i deformacje", short: "Las", icon: "L" },
    { id: "morze-klify-wyspy", label: "Morze, klify i wyspy", short: "Morze", icon: "M" },
    { id: "jeziora-mokradla", label: "Jeziora i mokradła", short: "Woda", icon: "J" },
    { id: "rzeki-zrodla-przelomy", label: "Rzeki, źródła i przełomy", short: "Rzeki", icon: "R" },
    { id: "kolory-pokopalniane", label: "Kolory i krajobrazy pokopalniane", short: "Kolory", icon: "K" },
    { id: "gaz-wulkany-geologia", label: "Gaz, wulkany i geologia żywa", short: "Geologia", icon: "G" },
    { id: "gory-skaly-lodowce", label: "Góry, skały i lodowce", short: "Góry", icon: "S" },
    { id: "ekstrema-iluzje-mikroklimaty", label: "Ekstrema, iluzje i mikroklimaty", short: "Ekstrema", icon: "E" }
  ];

  const cat = Object.fromEntries(categories.map((category) => [category.id, category]));

  const sharedSourceHints = [
    "oficjalna strona parku narodowego, krajobrazowego, rezerwatu, gminy albo zarządcy terenu",
    "materiały Państwowego Instytutu Geologicznego, uczelni, geoparku UNESCO albo regionalnych służb ochrony przyrody",
    "Wikimedia Commons i oficjalne materiały lokalne do weryfikacji zdjęć, nazw, statusu ochrony oraz danych liczbowych"
  ];

  const defaultSafety =
    "To prototyp edukacyjny. Traktuj kartę jako opis krajobrazu i mechanizmu, nie jako instrukcję dojścia; sprawdzaj aktualne zasady ochrony i poruszaj się tylko po legalnie dostępnych trasach.";

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
      safety_note: data.safety_note || defaultSafety,
      quizFacts: data.quizFacts || [
        data.name_pl,
        category.label,
        data.quiz_angle,
        data.habitat_pl
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

  const landscapeRecords = [
    base({
      id: "pustynia-bledowska",
      name_pl: "Pustynia Błędowska",
      name_lat: "Małopolskie / Śląskie • lotne piaski",
      category: "piasek-wydmy",
      hook: "Polska Sahara, która powstała z piasku, wiatru i działalności człowieka.",
      quiz_angle: "lotne piaski, odsłonięcie osadów rzecznolodowcowych, wiatr i dawny wpływ górnictwa",
      region_pl: "Małopolskie / Śląskie.",
      habitat_pl: "Mechanizm: piaszczyste osady zostały odsłonięte, a wiatr mógł formować otwarty, suchy krajobraz przypominający pustynię.",
      occurrence_note: "Osobliwością jest skala kontrastu: w środku kraju pojawia się przestrzeń bardziej kojarzona z pustynią niż z Europą Środkową.",
      level: "Polska Sahara"
    }),
    base({
      id: "ruchome-wydmy-slowinski",
      name_pl: "Ruchome wydmy Słowińskiego Parku Narodowego",
      name_lat: "okolice Łeby • aktywne wydmy nad Bałtykiem",
      category: "piasek-wydmy",
      hook: "Piasek, który wędruje i zostawia za sobą martwy las.",
      quiz_angle: "wydmy nadmorskie, wiatr, deflacja, akumulacja piasku i zasypywanie roślinności",
      region_pl: "Okolice Łeby, Pomorskie.",
      habitat_pl: "Mechanizm: fale dostarczają piasek, a wiatr przesypuje go w głąb lądu, stale przebudowując grzbiety wydmowe.",
      occurrence_note: "To jeden z najbardziej dynamicznych krajobrazów Polski: forma terenu nie jest tu stabilną górą, lecz ruchem.",
      level: "wędrujący piasek"
    }),
    base({
      id: "krzywy-las",
      name_pl: "Krzywy Las",
      name_lat: "Nowe Czarnowo koło Gryfina • wygięte sosny",
      category: "las-deformacje",
      hook: "Las, w którym drzewa najpierw rosną poziomo, a dopiero potem pionowo.",
      quiz_angle: "jednolity kierunek wygięcia sosen, młody etap wzrostu i nieznana przyczyna (celowe kształtowanie drzew to hipoteza)",
      region_pl: "Nowe Czarnowo koło Gryfina, Zachodniopomorskie.",
      habitat_pl: "Mechanizm: pnie zostały zdeformowane na wczesnym etapie wzrostu, a później drzewa kontynuowały normalny pionowy przyrost.",
      occurrence_note: "Osobliwością jest powtarzalność formy: wiele drzew wygląda, jakby zareagowało na ten sam impuls.",
      level: "las deformacji"
    }),
    base({
      id: "sosna-na-szczudlach-welcz",
      name_pl: "Sosna na Szczudłach w Wełczu",
      name_lat: "Wełecz koło Buska-Zdroju • odsłonięte korzenie",
      category: "las-deformacje",
      hook: "Sosna, pod którą można przejść jak pod małym mostem.",
      quiz_angle: "odsłonięty system korzeniowy, erozja podłoża i drzewo utrzymujące pień nad gruntem",
      region_pl: "Wełecz koło Buska-Zdroju, Świętokrzyskie.",
      habitat_pl: "Mechanizm: podłoże wokół korzeni zostało usunięte lub obniżone, a korzenie pozostały jak naturalne podpory.",
      occurrence_note: "Drzewo działa jak miniaturowa rzeźba erozji: pokazuje część systemu, która zwykle jest ukryta pod ziemią.",
      level: "drzewo na korzeniach"
    }),
    base({
      id: "zatopiony-las-jezioro-pile",
      name_pl: "Zatopiony Las w jeziorze Pile",
      name_lat: "Borne Sulinowo • podwodne pnie",
      category: "las-deformacje",
      hook: "Las, który zniknął pod wodą, ale nadal stoi.",
      quiz_angle: "zatopione pnie, zmiana poziomu wody i podwodny krajobraz po dawnym lesie",
      region_pl: "Borne Sulinowo, Zachodniopomorskie.",
      habitat_pl: "Mechanizm: fragment dawnego lasu znalazł się pod wodą, a pionowe pnie zachowały czytelny ślad zatopionego siedliska.",
      occurrence_note: "Osobliwość działa pod powierzchnią: zwykła tafla jeziora kryje pionowy, leśny rytm.",
      level: "podwodny las"
    }),
    base({
      id: "klify-wolinskiego-parku-narodowego",
      name_pl: "Klify Wolińskiego Parku Narodowego",
      name_lat: "Wolin • aktywnie podcinany brzeg",
      category: "morze-klify-wyspy",
      hook: "Brzeg Polski, który morze stale odgryza i przesuwa.",
      quiz_angle: "abrazja Bałtyku, osuwanie klifu, gliny morenowe i cofanie brzegu",
      region_pl: "Wolin, Zachodniopomorskie.",
      habitat_pl: "Mechanizm: fale podcinają podstawę klifu, a materiał osuwa się i jest wynoszony przez morze.",
      occurrence_note: "To krajobraz w trakcie przebudowy: granica lądu i morza jest tu procesem, nie linią na mapie.",
      level: "klif aktywny"
    }),
    base({
      id: "klif-orlowski",
      name_pl: "Klif Orłowski",
      name_lat: "Gdynia-Orłowo • gliny morenowe nad morzem",
      category: "morze-klify-wyspy",
      hook: "Urwisko, które pokazuje, że Bałtyk jest rzeźbiarzem.",
      quiz_angle: "aktywny klif, gliny morenowe, abrazja i widoczna praca fal",
      region_pl: "Gdynia-Orłowo, Pomorskie.",
      habitat_pl: "Mechanizm: morze usuwa materiał z podstawy stoku, przez co urwisko traci stabilność i cofa się etapami.",
      occurrence_note: "Klif jest osobliwy przez czytelność procesu: w miejskim krajobrazie widać surową pracę geologii.",
      level: "miejski klif"
    }),
    base({
      id: "delta-swiny-kraina-44-wysp",
      name_pl: "Delta Świny i Kraina 44 Wysp",
      name_lat: "Świnoujście / Wolin • wyspiarski labirynt",
      category: "morze-klify-wyspy",
      hook: "Archipelag, który bardziej przypomina wodny labirynt niż zwykłe wybrzeże.",
      quiz_angle: "delta wsteczna, kanały, trzcinowiska, rozlewiska i wyspy u ujścia rzeki",
      region_pl: "Świnoujście / Wolin, Zachodniopomorskie.",
      habitat_pl: "Mechanizm: prądy, cofki, osadzanie materiału i zmiany poziomu wody tworzą mozaikę wysp oraz kanałów.",
      occurrence_note: "Osobliwością jest rozdrobnienie krajobrazu: ląd i woda nie tworzą tu prostego brzegu, tylko sieć.",
      level: "Kraina 44 Wysp"
    }),
    base({
      id: "mierzeja-helska",
      name_pl: "Mierzeja Helska",
      name_lat: "Pomorskie • wąski pas piasku",
      category: "morze-klify-wyspy",
      hook: "Droga przez morze: z jednej strony zatoka, z drugiej Bałtyk.",
      quiz_angle: "mierzeja, transport piasku wzdłuż brzegu, wąski półwysep i dwa odmienne akweny",
      region_pl: "Pomorskie.",
      habitat_pl: "Mechanizm: prądy przybrzeżne i fale przenosiły piasek, budując długi wał oddzielający zatokę od otwartego morza.",
      occurrence_note: "To osobliwość skali i proporcji: krajobraz jest długi, cienki i stale zależny od ruchu piasku.",
      level: "piaskowa mierzeja"
    }),
    base({
      id: "mewia-lacha-ujscie-wisly",
      name_pl: "Mewia Łacha i ujście Wisły",
      name_lat: "Wyspa Sobieszewska / Mikoszewo • łachy piasku",
      category: "morze-klify-wyspy",
      hook: "Miejsce, gdzie największa polska rzeka buduje nowe wyspy.",
      quiz_angle: "ujście rzeki, łachy, transport osadów i zderzenie nurtu Wisły z Bałtykiem",
      region_pl: "Wyspa Sobieszewska / Mikoszewo, Pomorskie.",
      habitat_pl: "Mechanizm: Wisła niesie osady, a fale i prądy Bałtyku przemieszczają je w zmienne łachy.",
      occurrence_note: "Mapa tego miejsca żyje: piasek potrafi pojawiać się, znikać i zmieniać kształt brzegu.",
      level: "rzeka buduje ląd"
    }),
    base({
      id: "jezioro-hancza",
      name_pl: "Jezioro Hańcza",
      name_lat: "Suwalszczyzna • najgłębsze jezioro Polski",
      category: "jeziora-mokradla",
      hook: "Jezioro, które wygląda spokojnie, ale kryje podwodną przepaść.",
      quiz_angle: "rynna polodowcowa, duża głębokość, zimna woda i krajobraz Suwalszczyzny",
      region_pl: "Suwalszczyzna, Podlaskie.",
      habitat_pl: "Mechanizm: lądolód i wody roztopowe wyżłobiły głęboką rynnę, która została wypełniona wodą.",
      occurrence_note: "Osobliwością jest pionowa skala niewidoczna z brzegu: najważniejszy rekord kryje się pod taflą.",
      level: "najgłębsze jezioro"
    }),
    base({
      id: "jezioro-sniardwy",
      name_pl: "Jezioro Śniardwy",
      name_lat: "Mazury • największe jezioro Polski",
      category: "jeziora-mokradla",
      hook: "Morze Mazur, które potrafi być płytkie i zdradliwe.",
      quiz_angle: "największa powierzchnia jeziora w Polsce, płytkość, wiatr i głazy polodowcowe",
      region_pl: "Mazury, Warmińsko-Mazurskie.",
      habitat_pl: "Mechanizm: jezioro zajmuje rozległe obniżenie polodowcowe, a wiatr szybko buduje falę na szerokiej tafli.",
      occurrence_note: "Jego rekord działa poziomo: nie imponuje głębią, tylko rozległością i poczuciem otwartego wodnego horyzontu.",
      level: "największe jezioro"
    }),
    base({
      id: "bagna-biebrzanskie",
      name_pl: "Bagna Biebrzańskie",
      name_lat: "Biebrzański Park Narodowy • wielkie mokradła",
      category: "jeziora-mokradla",
      hook: "Polska kraina mgły, trzcin, torfu i ptaków.",
      quiz_angle: "torfowiska, rozlewiska, najrozleglejszy park narodowy w Polsce i naturalny rytm wody",
      region_pl: "Biebrzański Park Narodowy, Podlaskie.",
      habitat_pl: "Mechanizm: niska dolina, torf i okresowe zalewy utrzymują rozległy mokradłowy krajobraz.",
      occurrence_note: "To osobliwość skali: zamiast punktowej atrakcji dostajemy wielki, powolny system wody i torfu.",
      level: "wielkie bagno"
    }),
    base({
      id: "narwianski-park-narodowy",
      name_pl: "Narwiański Park Narodowy — Polska Amazonia",
      name_lat: "Podlaskie • rzeka wielokorytowa",
      category: "jeziora-mokradla",
      hook: "Rzeka, która zamiast jednego koryta wybiera wiele dróg naraz.",
      quiz_angle: "układ anastomozujący, koryta rozdzielone trzcinami, labirynt wodny i powolny przepływ",
      region_pl: "Podlaskie.",
      habitat_pl: "Mechanizm: mały spadek doliny, roślinność i osady rozdzielają nurt Narwi na wiele równoległych koryt.",
      occurrence_note: "Przydomek działa jako haczyk: osobliwością jest labiryntowy sposób płynięcia, a nie dosłowne podobieństwo do Amazonii.",
      level: "Polska Amazonia"
    }),
    base({
      id: "ujscie-warty",
      name_pl: "Park Narodowy „Ujście Warty”",
      name_lat: "Lubuskie • zalewane łąki i rozlewiska",
      category: "jeziora-mokradla",
      hook: "Rzeka, która na chwilę zamienia łąki w ogromne jezioro.",
      quiz_angle: "okresowe zalewy, łąki, rozlewiska i zmienny krajobraz ptasiej ostoi",
      region_pl: "Lubuskie.",
      habitat_pl: "Mechanizm: Warta i Odra regulują wodny rytm doliny, okresowo zalewając szerokie, płaskie tereny.",
      occurrence_note: "Osobliwość polega na zmienności: ten sam teren bywa łąką, rozlewiskiem i ptasią sceną.",
      level: "zalewowa scena"
    }),
    base({
      id: "poleski-park-narodowy-durne-bagno",
      name_pl: "Poleski Park Narodowy i Durne Bagno",
      name_lat: "Lubelskie • mokradłowa mała północ",
      category: "jeziora-mokradla",
      hook: "Fragment północy ukryty na wschodzie Polski.",
      quiz_angle: "torfowiska, jeziora, bagna, chłodny mikroklimat i roślinność kojarzona z północą",
      region_pl: "Lubelskie.",
      habitat_pl: "Mechanizm: płaskie obniżenia, wysoki poziom wód i torf utrzymują bagienny krajobraz Polesia.",
      occurrence_note: "Osobliwością jest wrażenie biogeograficznego przesunięcia: wschodnia Polska przypomina chwilami chłodniejszą północ.",
      level: "mała tundra"
    }),
    base({
      id: "dolina-rospudy",
      name_pl: "Dolina Rospudy",
      name_lat: "Podlaskie • dzika dolina rzeczna",
      category: "jeziora-mokradla",
      hook: "Miejsce, gdzie rzeka płynie przez żywe bagno.",
      quiz_angle: "naturalna dolina, torfowiska, meandry i zależność siedlisk od czystej wody",
      region_pl: "Podlaskie.",
      habitat_pl: "Mechanizm: rzeka, torf i zasilanie wodami podziemnymi utrzymują w dolinie mozaikę mokradeł.",
      occurrence_note: "To krajobraz, w którym najważniejszy jest brak prostowania: rzeka zachowuje własny, naturalny rytm.",
      level: "dzika dolina"
    }),
    base({
      id: "bifurkacja-wagrowiecka",
      name_pl: "Skrzyżowanie Wełny i Nielby",
      name_lat: "Wągrowiec • skrzyżowanie dwóch rzek",
      synonyms: ["Bifurkacja Wągrowiecka / skrzyżowanie Wełny i Nielby"],
      category: "rzeki-zrodla-przelomy",
      hook: "Dwie rzeki przecinają się jak drogi na skrzyżowaniu.",
      quiz_angle: "sztuczne skrzyżowanie rzek z XIX w., betonowy jaz i melioracja zamiast bifurkacji",
      region_pl: "Wągrowiec, Wielkopolskie.",
      habitat_pl: "Mechanizm: w XIX w., przy pracach melioracyjnych, koryta ukształtowano tak, że Nielba przecina Wełnę pod kątem prostym, a wodę kieruje betonowy jaz.",
      occurrence_note: "Osobliwość jest prawie graficzna: woda zachowuje się tu jak linie na mapie ulic.",
      level: "skrzyżowanie rzek"
    }),
    base({
      id: "niebieskie-zrodla",
      name_pl: "Niebieskie Źródła",
      name_lat: "Tomaszów Mazowiecki • wywierzyska krasowe",
      category: "rzeki-zrodla-przelomy",
      hook: "Źródła, które wyglądają jakby były podświetlone od spodu.",
      quiz_angle: "wywierzyska, czysta woda, pulsujący piasek na dnie i efekt barwy",
      region_pl: "Tomaszów Mazowiecki, Łódzkie.",
      habitat_pl: "Mechanizm: woda podziemna wypływa przez piaszczyste dno, poruszając osady i wzmacniając efekt barwy.",
      occurrence_note: "To osobliwość optyczna i hydrologiczna naraz: ruch źródlanej wody staje się widoczny.",
      level: "niebieskie wywierzyska"
    }),
    base({
      id: "przelom-dunajca",
      name_pl: "Przełom Dunajca",
      name_lat: "Pieniny • rzeka między wapiennymi ścianami",
      category: "rzeki-zrodla-przelomy",
      hook: "Rzeka, która wycięła drogę między wapiennymi ścianami.",
      quiz_angle: "przełom rzeczny, wapienie Pienin, erozja i kręty bieg Dunajca",
      region_pl: "Pieniny, Małopolskie.",
      habitat_pl: "Mechanizm: Dunajec wcinał się w podnoszony i odporny masyw, zachowując kręty przebieg między skałami.",
      occurrence_note: "Osobliwością jest kontrast skali: spokojnie płynąca rzeka wygląda jakby przecięła kamienne ściany.",
      level: "przełom pieniński"
    }),
    base({
      id: "wawoz-korzeniowy-dol",
      name_pl: "Wąwóz Korzeniowy Dół",
      name_lat: "Kazimierz Dolny • less i korzenie",
      category: "rzeki-zrodla-przelomy",
      hook: "Tunel z lessu i korzeni.",
      quiz_angle: "lessowy wąwóz, erozja, strome ściany i odsłonięte systemy korzeniowe",
      region_pl: "Kazimierz Dolny, Lubelskie.",
      habitat_pl: "Mechanizm: woda spływająca po lessie pogłębia drogę, a korzenie drzew zostają odsłonięte na ścianach.",
      occurrence_note: "Osobliwością jest przestrzenne doświadczenie: krajobraz zamienia się w naturalny korytarz.",
      level: "lessowy tunel"
    }),
    base({
      id: "szumy-nad-tanwia",
      name_pl: "Szumy nad Tanwią",
      name_lat: "Roztocze • progi skalne i małe kaskady",
      category: "rzeki-zrodla-przelomy",
      hook: "Miniaturowe wodospady, które słychać zanim się je zobaczy.",
      quiz_angle: "progi skalne, małe kaskady, erozja wsteczna i charakterystyczny szum nurtu",
      region_pl: "Roztocze, Lubelskie.",
      habitat_pl: "Mechanizm: rzeka pokonuje serię odporniejszych progów, tworząc niski, powtarzalny układ kaskad.",
      occurrence_note: "To osobliwość rytmu: nie jeden wielki wodospad, lecz cała seria drobnych progów buduje pamięć miejsca.",
      level: "szumy roztoczańskie"
    }),
    base({
      id: "przelom-kamiennej-baltow",
      name_pl: "Meandry i przełom Kamiennej koło Bałtowa",
      name_lat: "Bałtów • nizinna rzeka w wapiennym krajobrazie",
      category: "rzeki-zrodla-przelomy",
      hook: "Spokojna rzeka, która nagle zachowuje się jak górski przełom.",
      quiz_angle: "meandry, wcięcie w wapienne wzgórza, dolina rzeki Kamiennej i kontrast nizinny",
      region_pl: "Bałtów, Świętokrzyskie.",
      habitat_pl: "Mechanizm: Kamienna wcina się w lokalne wyniesienia i prowadzi kręty nurt między wapiennymi formami.",
      occurrence_note: "Osobliwością jest zmiana tonu krajobrazu: rzeka z nizinnej robi się niemal przełomowa.",
      level: "meander i przełom"
    }),
    base({
      id: "kolorowe-jeziorka",
      name_pl: "Kolorowe Jeziorka",
      name_lat: "Rudawy Janowickie • pogórnicze barwy wody",
      category: "kolory-pokopalniane",
      hook: "Góry, w których woda przybrała kolory chemii i skał.",
      quiz_angle: "dawne wyrobiska, związki mineralne, kwaśne wody i purpurowe oraz błękitne odcienie",
      region_pl: "Rudawy Janowickie, Dolnośląskie.",
      habitat_pl: "Mechanizm: dawne wyrobiska wypełniły się wodą, a minerały i odczyn nadały zbiornikom intensywne barwy.",
      occurrence_note: "Osobliwością jest chemia widoczna z daleka: kolor staje się główną formą krajobrazu.",
      level: "chemia barw"
    }),
    base({
      id: "jezioro-turkusowe-wapnica",
      name_pl: "Jezioro Turkusowe",
      name_lat: "Wapnica, Wyspa Wolin • zalane wyrobisko kredy",
      category: "kolory-pokopalniane",
      hook: "Jezioro, które wygląda jak kawałek południa Europy na Pomorzu.",
      quiz_angle: "dawne wyrobisko kredy, jasne dno, rozpraszanie światła i turkusowa barwa",
      region_pl: "Wapnica, Wyspa Wolin, Zachodniopomorskie.",
      habitat_pl: "Mechanizm: woda wypełniła wyrobisko kredy, a jasne podłoże i zawiesiny wzmacniają turkusowy odcień.",
      occurrence_note: "To krajobraz pokopalniany, który zamiast surowości daje bardzo mocny efekt wizualny.",
      level: "turkusowe wyrobisko"
    }),
    base({
      id: "park-grodek-polskie-malediwy",
      name_pl: "Park Gródek — Polskie Malediwy",
      name_lat: "Jaworzno • zalana kopalnia dolomitu",
      category: "kolory-pokopalniane",
      hook: "Śląskie wyrobisko, które zamieniło się w turkusowy krajobraz.",
      quiz_angle: "dawna kopalnia dolomitu, jasne ściany, przejrzysta woda i popularny przydomek Polskie Malediwy",
      region_pl: "Jaworzno, Śląskie.",
      habitat_pl: "Mechanizm: eksploatacja odsłoniła jasne skały, a po zalaniu powstał zbiornik o wyrazistym kolorze.",
      occurrence_note: "Przydomek jest skrótem wyobraźni: osobliwością jest przemiana przemysłowego śladu w malowniczą wodną scenę.",
      level: "Polskie Malediwy"
    }),
    base({
      id: "luk-muzakowa",
      name_pl: "Łuk Mużakowa",
      name_lat: "Lubuskie / granica polsko-niemiecka • morena spiętrzona",
      category: "kolory-pokopalniane",
      hook: "Lodowiec zgiął ziemię w ogromny łuk.",
      quiz_angle: "morena spiętrzona, glacitektonika, geopark UNESCO i górnicze odsłonięcia warstw",
      region_pl: "Lubuskie / granica polsko-niemiecka.",
      habitat_pl: "Mechanizm: nacisk lądolodu spiętrzył warstwy osadów, a późniejsze górnictwo odsłoniło kolorowe ślady tej deformacji.",
      occurrence_note: "Osobliwością jest skala formy: łuk najlepiej rozumie się jak wielki zapis ruchu lodowca.",
      level: "geopark UNESCO"
    }),
    base({
      id: "jezioro-afryka-kopalnia-babina",
      name_pl: "Jezioro Afryka / Kopalnia Babina",
      name_lat: "Łęknica • kwaśne jeziora pokopalniane",
      category: "kolory-pokopalniane",
      hook: "Czerwone jezioro, które wygląda jak mapa kontynentu.",
      quiz_angle: "kwaśne wody pokopalniane, żelazo, rdzawy kolor i kształt kojarzony z Afryką",
      region_pl: "Łęknica, Lubuskie.",
      habitat_pl: "Mechanizm: woda w dawnych wyrobiskach reaguje z minerałami, przez co część zbiorników przybiera rdzawe barwy.",
      occurrence_note: "To osobliwość chemii i wyobraźni: kształt oraz kolor zamieniają wyrobisko w krajobrazowy znak.",
      level: "jezioro mapa"
    }),
    base({
      id: "mofeta-swidzińskiego",
      name_pl: "Mofeta im. prof. Henryka Świdzińskiego",
      name_lat: "Złockie / Jastrzębik • naturalne CO2",
      category: "gaz-wulkany-geologia",
      hook: "Miejsce, gdzie ziemia oddycha bąblami.",
      quiz_angle: "naturalna emisja dwutlenku węgla, bulgotanie w wodzie i karpacka geologia",
      region_pl: "Złockie / Jastrzębik, Małopolskie.",
      habitat_pl: "Mechanizm: dwutlenek węgla wydostaje się szczelinami ku powierzchni i ujawnia się jako bąble w wodzie oraz błocie.",
      occurrence_note: "Osobliwością jest widzialna geologia żywa: gaz z głębi staje się dźwiękiem i ruchem.",
      level: "mofeta karpacka"
    }),
    base({
      id: "mofety-tylicz",
      name_pl: "Mofety w Tyliczu",
      name_lat: "Tylicz • źródła CO2",
      category: "gaz-wulkany-geologia",
      hook: "Kosmiczno-piekielne źródła Sądecczyzny.",
      quiz_angle: "ekshalacje CO2, źródła mineralne, algi i niezwykła historia badań",
      region_pl: "Tylicz, Małopolskie.",
      habitat_pl: "Mechanizm: gaz przemieszcza się ku powierzchni w strefie karpackich wód mineralnych, tworząc bulgoczące wypływy.",
      occurrence_note: "To osobliwość na styku geologii i opowieści naukowej: mały wypływ gazu otwiera duży kontekst badań.",
      level: "źródła gazowe"
    }),
    base({
      id: "belkotka-iwonicz",
      name_pl: "Bełkotka w Iwoniczu-Zdroju",
      name_lat: "Iwonicz-Zdrój • gazujące źródło",
      category: "gaz-wulkany-geologia",
      hook: "Źródło, które bulgocze od gazu z wnętrza ziemi.",
      quiz_angle: "emisja gazu ziemnego, bulgotanie źródła i dawne opowieści o płonącej wodzie",
      region_pl: "Iwonicz-Zdrój, Podkarpackie.",
      habitat_pl: "Mechanizm: gaz ziemny i wody mineralne wydostają się ku powierzchni, tworząc charakterystyczne bulgotanie.",
      occurrence_note: "Osobliwość jest niewielka, ale bardzo zapamiętywalna: źródło zachowuje się jak aktywny zawór geologiczny.",
      level: "bulgoczące źródło"
    }),
    base({
      id: "gory-pieprzowe",
      name_pl: "Góry Pieprzowe",
      name_lat: "Sandomierz • stare łupki kambryjskie",
      category: "gaz-wulkany-geologia",
      hook: "Najstarszy, pieprzny fragment gór tuż nad Wisłą.",
      quiz_angle: "stare łupki, krucha czarna skała, erozja i kontrast z doliną Wisły",
      region_pl: "Sandomierz, Świętokrzyskie.",
      habitat_pl: "Mechanizm: bardzo stare, kruche łupki odsłaniają się na zboczach i wietrzeją na drobny, ciemny materiał.",
      occurrence_note: "Osobliwością jest wiek i faktura: małe wzgórza nad rzeką okazują się geologicznym staruszkiem.",
      level: "stare łupki"
    }),
    base({
      id: "sniezne-kotly",
      name_pl: "Śnieżne Kotły",
      name_lat: "Karkonosze • kotły polodowcowe",
      category: "gory-skaly-lodowce",
      hook: "Sudecka ściana lodowcowej przeszłości.",
      quiz_angle: "kotły polodowcowe, strome ściany, dawne lodowce i wysokogórski charakter Karkonoszy",
      region_pl: "Karkonosze, Dolnośląskie.",
      habitat_pl: "Mechanizm: dawne lodowce górskie żłobiły zagłębienia i podcinały stoki, zostawiając strome kotły.",
      occurrence_note: "To krajobraz niemal alpejski w Sudetach: ściany kotłów pokazują skalę dawnego lodu.",
      level: "kotły lodowcowe"
    }),
    base({
      id: "wielka-siklawa-dolina-pieciu-stawow",
      name_pl: "Wielka Siklawa i Dolina Pięciu Stawów Polskich",
      name_lat: "Tatry • wodospad i dolina polodowcowa",
      category: "gory-skaly-lodowce",
      hook: "Woda spada z progu doliny wyrzeźbionej przez lodowiec.",
      quiz_angle: "próg polodowcowy, wysokogórskie jeziora, wodospad i tatrzańska rzeźba lodowcowa",
      region_pl: "Tatry, Małopolskie.",
      habitat_pl: "Mechanizm: lodowiec wyżłobił dolinę i progi skalne, po których dziś spływa potok tworzący wodospad.",
      occurrence_note: "Osobliwością jest kondensacja Tatr: jeziora, próg i wodospad w jednym wysokogórskim układzie.",
      level: "wodospad polodowcowy"
    }),
    base({
      id: "szczeliniec-wielki",
      name_pl: "Szczeliniec Wielki",
      name_lat: "Góry Stołowe • góra jak pęknięty stół",
      category: "gory-skaly-lodowce",
      hook: "Góra jak stół, ale pęknięta na labirynt.",
      quiz_angle: "piaskowce, poziome ławice, szczeliny, erozja i płaski masyw Gór Stołowych",
      region_pl: "Góry Stołowe, Dolnośląskie.",
      habitat_pl: "Mechanizm: poziome warstwy piaskowca pękały i wietrzały, tworząc tarasy, szczeliny oraz skalne korytarze.",
      occurrence_note: "Z daleka wygląda spokojnie i płasko, z bliska okazuje się labiryntem.",
      level: "góra stołowa"
    }),
    base({
      id: "bledne-skaly",
      name_pl: "Błędne Skały",
      name_lat: "Góry Stołowe • piaskowcowy labirynt",
      category: "gory-skaly-lodowce",
      hook: "Skalny labirynt, w którym góra zamienia się w korytarze.",
      quiz_angle: "spękania piaskowca, poszerzanie szczelin, bloki skalne i labirynt przejść",
      region_pl: "Góry Stołowe, Dolnośląskie.",
      habitat_pl: "Mechanizm: woda, mróz i wietrzenie poszerzały naturalne szczeliny w piaskowcu, rozcinając masyw na bloki.",
      occurrence_note: "Osobliwość jest przestrzenna: trzeba przejść przez skałę, żeby zrozumieć jej kształt.",
      level: "labirynt skał"
    }),
    base({
      id: "skalki-pieklo-nieklan",
      name_pl: "Skałki Piekło pod Niekłaniem",
      name_lat: "Niekłań • leśne formy piaskowcowe",
      category: "gory-skaly-lodowce",
      hook: "Małe piekło z piaskowca w środku lasu.",
      quiz_angle: "piaskowcowe grzyby, baszty, bramy, selektywne wietrzenie i leśne ukrycie form",
      region_pl: "Niekłań, Świętokrzyskie.",
      habitat_pl: "Mechanizm: różna odporność warstw piaskowca sprawiła, że wietrzenie zostawiło grzyby, ambony i bramy.",
      occurrence_note: "To osobliwość kameralna: niewielki las skrywa krajobraz jak z większych gór stołowych.",
      level: "leśne skałki"
    }),
    base({
      id: "dolina-pradnika-maczuga-herkulesa",
      name_pl: "Dolina Prądnika i Maczuga Herkulesa",
      name_lat: "Ojcowski Park Narodowy • koncentrat wapieni",
      category: "gory-skaly-lodowce",
      hook: "Mały park, wielki koncentrat wapiennych osobliwości.",
      quiz_angle: "dolina krasowa, wapienie jurajskie, ostańce, jaskinie i Maczuga Herkulesa",
      region_pl: "Ojcowski Park Narodowy, Małopolskie.",
      habitat_pl: "Mechanizm: kras i erozja rzeczna rozcięły wapienne skały, zostawiając dolinę, jaskinie oraz samotne ostańce.",
      occurrence_note: "Osobliwością jest zagęszczenie form: na małej przestrzeni mieści się niemal cały alfabet wapiennego krajobrazu.",
      level: "kras jurajski"
    }),
    base({
      id: "brama-bolechowicka",
      name_pl: "Brama Bolechowicka",
      name_lat: "Jura Krakowsko-Częstochowska • wapienna brama",
      category: "gory-skaly-lodowce",
      hook: "Naturalna brama z dwóch skalnych wież.",
      quiz_angle: "wapienne ściany, wejście do doliny, kras i erozja jurajskich skał",
      region_pl: "Jura Krakowsko-Częstochowska, Małopolskie.",
      habitat_pl: "Mechanizm: erozja wycięła dolinę między odpornymi wapieniami, zostawiając monumentalne skalne filary.",
      occurrence_note: "To osobliwość progu: krajobraz otwiera się jak architektoniczne wejście, choć powstał naturalnie.",
      level: "brama wapienna"
    }),
    base({
      id: "goloborza-lysogor",
      name_pl: "Gołoborza Łysogór",
      name_lat: "Świętokrzyski Park Narodowy • pola bloków skalnych",
      category: "gory-skaly-lodowce",
      hook: "Kamienna rzeka na szczycie pradawnych gór.",
      quiz_angle: "wietrzenie mrozowe, kwarcyty, pola bloków i jedne z najstarszych gór Polski",
      region_pl: "Świętokrzyski Park Narodowy, Świętokrzyskie.",
      habitat_pl: "Mechanizm: pękanie skał pod wpływem mrozu i długie wietrzenie nagromadziły bloki na stokach i grzbietach.",
      occurrence_note: "Osobliwością jest surowy materiał krajobrazu: zamiast lasu na szczycie pojawia się kamienne morze.",
      level: "kamienne morze"
    }),
    base({
      id: "torfowisko-pod-zielencem",
      name_pl: "Torfowisko pod Zieleńcem",
      name_lat: "Góry Bystrzyckie • górskie torfowisko wysokie",
      category: "jeziora-mokradla",
      hook: "Fragment tajgi ukryty w Sudetach.",
      quiz_angle: "torfowisko wysokie, chłodny mikroklimat, mchy torfowce i roślinność północna",
      region_pl: "Góry Bystrzyckie, Dolnośląskie.",
      habitat_pl: "Mechanizm: nadmiar wody, chłód i wolny rozkład materii roślinnej budują kopułę torfu.",
      occurrence_note: "Osobliwością jest mikroklimat: Sudety przechowują tu krajobraz bardziej północny niż okoliczne lasy.",
      level: "górskie torfowisko"
    }),
    base({
      id: "poloniny-bieszczadzkie",
      name_pl: "Połoniny Bieszczadzkie",
      name_lat: "Bieszczadzki Park Narodowy • bezleśne grzbiety",
      category: "gory-skaly-lodowce",
      hook: "Góry, na których las nagle ustępuje trawom i wiatrowi.",
      quiz_angle: "połoniny, Karpaty Wschodnie, piętro subalpejskie i otwarte grzbiety",
      region_pl: "Bieszczadzki Park Narodowy, Podkarpackie.",
      habitat_pl: "Mechanizm: warunki wysokościowe, historia użytkowania i naturalna granica lasu tworzą rozległe, trawiaste grzbiety.",
      occurrence_note: "W Polsce to krajobraz wyjątkowo wschodni: góry zapamiętuje się nie przez skałę, lecz przez morze traw.",
      level: "morze traw"
    }),
    base({
      id: "ostrzyca-proboszczowicka",
      name_pl: "Ostrzyca Proboszczowicka",
      name_lat: "Pogórze Kaczawskie • stożek dawnego wulkanu",
      category: "gaz-wulkany-geologia",
      hook: "Mały polski wulkan, który wyrasta samotnie z pól.",
      quiz_angle: "bazaltowy stożek, dawny wulkanizm, Śląska Fudżijama i izolowana sylwetka góry",
      region_pl: "Pogórze Kaczawskie, Dolnośląskie.",
      habitat_pl: "Mechanizm: odporniejsze skały wulkaniczne zostały w krajobrazie jako stożkowe wzgórze po dawnym wulkanizmie.",
      occurrence_note: "Osobliwością jest sylwetka: góra wygląda bardziej jak samotny znak niż fragment pasma.",
      level: "Śląska Fudżijama"
    }),
    base({
      id: "organy-wielislawskie",
      name_pl: "Organy Wielisławskie",
      name_lat: "Pogórze Kaczawskie • ryolitowe organy",
      category: "gaz-wulkany-geologia",
      hook: "Skała, która wygląda jak instrument.",
      quiz_angle: "ryolity, cios słupowy, dawne procesy wulkaniczne i ściana przypominająca piszczałki",
      region_pl: "Pogórze Kaczawskie, Dolnośląskie.",
      habitat_pl: "Mechanizm: stygnięcie i pękanie skał wulkanicznych utworzyło regularny układ słupów.",
      occurrence_note: "Osobliwość polega na geometrii: naturalne spękania wyglądają jak starannie zaprojektowana fasada.",
      level: "skalne organy"
    }),
    base({
      id: "glazowisko-bachanowo",
      name_pl: "Głazowisko Bachanowo nad Czarną Hańczą",
      name_lat: "Suwalszczyzna • głazy narzutowe",
      category: "gory-skaly-lodowce",
      hook: "Łąka, na której lodowiec rozsypał kamienny ładunek.",
      quiz_angle: "głazy narzutowe, lądolód, zagęszczenie bloków i dolina Czarnej Hańczy",
      region_pl: "Suwalszczyzna, Podlaskie.",
      habitat_pl: "Mechanizm: lądolód przyniósł bloki skalne z północy i zostawił je po wytopieniu lodu.",
      occurrence_note: "Osobliwością jest zagęszczenie: na małej przestrzeni widać kamienny podpis lodowca.",
      level: "ładunek lodowca"
    }),
    base({
      id: "gora-sleza",
      name_pl: "Góra Ślęża",
      name_lat: "Masyw Ślęży • samotna góra nad równiną",
      category: "gaz-wulkany-geologia",
      hook: "Samotna góra, która wygląda jak wyspa nad równiną.",
      quiz_angle: "izolowany masyw, kontrast wysokości, złożona geologia i kulturowa osobność miejsca",
      region_pl: "Masyw Ślęży, Dolnośląskie.",
      habitat_pl: "Mechanizm: odporny masyw góruje nad otaczającymi nizinami, tworząc mocny kontrast wysokości i widoczności.",
      occurrence_note: "Osobliwością jest dominacja w horyzoncie: Ślęża działa jak osobna wyspa krajobrazowa.",
      level: "samotna góra"
    }),
    base({
      id: "gora-sw-anny",
      name_pl: "Góra św. Anny",
      name_lat: "Opolskie • wulkan i krajobraz pielgrzymkowy",
      category: "gaz-wulkany-geologia",
      hook: "Wygasły wulkan, który stał się świętą górą.",
      quiz_angle: "dawny wulkanizm, bazalt, forma wzgórza i warstwa kulturowo-pielgrzymkowa",
      region_pl: "Opolskie.",
      habitat_pl: "Mechanizm: dawne skały wulkaniczne budują wyniesienie, a historia kulturowa nałożyła na geologię kolejną warstwę sensu.",
      occurrence_note: "Osobliwością jest zrost natury i kultury: wulkaniczny ślad stał się osią miejsca pielgrzymkowego.",
      level: "wulkan kulturowy"
    }),
    base({
      id: "jaskinia-mechowska",
      name_pl: "Jaskinia Mechowska / Groty Mechowskie",
      name_lat: "Mechowo koło Pucka • jaskinia Niżu Polskiego",
      category: "gory-skaly-lodowce",
      hook: "Jaskinia tam, gdzie prawie nie powinno być jaskiń.",
      quiz_angle: "osady polodowcowe, zlepieńce, procesy sufozyjne i rzadka jaskinia na Niżu Polskim",
      region_pl: "Mechowo koło Pucka, Pomorskie.",
      habitat_pl: "Mechanizm: wody wypłukiwały drobniejszy materiał z osadów polodowcowych i zlepieńców, tworząc niewielką pustkę.",
      occurrence_note: "Osobliwością jest kontekst: jaskinia nie wymaga gór krasowych, tylko nietypowego układu osadów i wody.",
      level: "jaskinia nizin"
    }),
    base({
      id: "rysy",
      name_pl: "Rysy — najwyższy punkt Polski",
      name_lat: "Tatry • dach Polski",
      category: "ekstrema-iluzje-mikroklimaty",
      hook: "Dach Polski.",
      quiz_angle: "najwyższy punkt Polski, graniczny szczyt Tatr i naturalny biegun wysokości kraju",
      region_pl: "Tatry, Małopolskie.",
      habitat_pl: "Mechanizm: alpejska rzeźba Tatr, tektoniczne wyniesienie i erozja stworzyły najwyższy krajobraz Polski.",
      occurrence_note: "Osobliwością jest rekord wysokości: punkt na mapie staje się symbolicznym szczytem całego kraju.",
      level: "najwyższy punkt"
    }),
    base({
      id: "raczki-elblaskie",
      name_pl: "Raczki Elbląskie — dawny najniższy punkt Polski",
      name_lat: "Żuławy Wiślane • depresja",
      synonyms: ["Raczki Elbląskie — najniższy punkt Polski"],
      category: "ekstrema-iluzje-mikroklimaty",
      hook: "Miejsce, gdzie Polska schodzi poniżej poziomu morza.",
      quiz_angle: "depresja Żuław, polderowy krajobraz, woda kontrolowana wałami i rekord, który przeszedł na Marzęcino",
      region_pl: "Żuławy Wiślane, Warmińsko-Mazurskie.",
      habitat_pl: "Mechanizm: płaski teren delty Wisły został osuszony i utrzymywany przez system wałów, kanałów oraz pomp.",
      occurrence_note: "To rekord odwrotny do gór, który zmienił adres: Raczki leżą 1,8 m p.p.m., a od 2022 r. za najniższy punkt Polski uznaje się depresję w Marzęcinie (2,2 m p.p.m.).",
      level: "depresja Żuław"
    }),
    base({
      id: "punkty-antygrawitacyjne-karpacz-swieradow",
      name_pl: "Punkty antygrawitacyjne w Karpaczu i Świeradowie-Zdroju",
      name_lat: "Sudety • iluzja topograficzna",
      category: "ekstrema-iluzje-mikroklimaty",
      hook: "Miejsce, gdzie samochód „jedzie pod górę” bez silnika.",
      quiz_angle: "iluzja optyczna, brak pewnego horyzontu, nachylenie drogi i błędna interpretacja spadku",
      region_pl: "Sudety, Dolnośląskie.",
      habitat_pl: "Mechanizm: otoczenie i brak czytelnego horyzontu zaburzają ocenę nachylenia, więc spadek wygląda jak podjazd.",
      occurrence_note: "Osobliwość nie łamie fizyki: pokazuje, jak łatwo krajobraz oszukuje zmysły.",
      level: "iluzja grawitacji"
    }),
    base({
      id: "ponidzie-polska-toskania",
      name_pl: "Polska Toskania — Ponidzie",
      name_lat: "okolice Pińczowa • falisty krajobraz gipsowo-wapienny",
      category: "ekstrema-iluzje-mikroklimaty",
      hook: "Polskie wzgórza, które udają włoską prowincję.",
      quiz_angle: "faliste wzgórza, gipsy, wapienie, sucholubna roślinność i ciepły mikroklimat",
      region_pl: "Okolice Pińczowa, Świętokrzyskie.",
      habitat_pl: "Mechanizm: skały gipsowe i wapienne, erozja oraz ciepłe stoki tworzą mozaikę wzgórz, dolin i muraw.",
      occurrence_note: "Przydomek jest metaforą, ale pomaga uchwycić kontrast: Ponidzie ma miękką, słoneczną skalę krajobrazu.",
      level: "Polska Toskania"
    }),
    base({
      id: "szwajcaria-kaszubska",
      name_pl: "Szwajcaria Kaszubska",
      name_lat: "Pojezierze Kaszubskie • pagórki polodowcowe",
      category: "ekstrema-iluzje-mikroklimaty",
      hook: "Północ Polski, która nagle robi się pagórkowata jak miniaturowe góry.",
      quiz_angle: "deniwelacje pojezierza, rynny jeziorne, wzgórza morenowe i efekt miniaturowych gór",
      region_pl: "Pojezierze Kaszubskie, Pomorskie.",
      habitat_pl: "Mechanizm: lądolód pozostawił moreny, rynny i zagłębienia, tworząc pofałdowany krajobraz jeziorny.",
      occurrence_note: "Osobliwością jest kontrast z wyobrażeniem o płaskiej północy: tu teren nagle nabiera wysokości.",
      level: "Szwajcaria Kaszubska"
    }),
    base({
      id: "sokolowsko-dolnoslaskie-davos",
      name_pl: "Sokołowsko — Dolnośląskie Davos",
      name_lat: "Góry Suche • dolina mikroklimatu",
      category: "ekstrema-iluzje-mikroklimaty",
      hook: "Sudety, które kiedyś porównywano do szwajcarskiego Davos.",
      quiz_angle: "zamknięta dolina, mikroklimat, historia leczenia płuc i krajobraz uzdrowiskowy",
      region_pl: "Góry Suche, Dolnośląskie.",
      habitat_pl: "Mechanizm: położenie w dolinie i warunki górskie kształtowały lokalny mikroklimat wykorzystywany w lecznictwie.",
      occurrence_note: "To osobliwość klimatu i kultury: krajobraz stał się argumentem medycznym oraz częścią tożsamości miejsca.",
      level: "Dolnośląskie Davos"
    }),
    base({
      id: "tarnow-polski-biegun-ciepla",
      name_pl: "Tarnów — Polski Biegun Ciepła",
      name_lat: "Małopolskie • ciepły mikroklimat miasta",
      category: "ekstrema-iluzje-mikroklimaty",
      hook: "Miasto z przydomkiem najcieplejszego w Polsce, choć dziś wyprzedza je Wrocław.",
      quiz_angle: "historyczny przydomek z danych IMGW 1971–2000, ciepły mikroklimat i nowe normy, w których prowadzi Wrocław",
      region_pl: "Małopolskie.",
      habitat_pl: "Mechanizm: położenie, ekspozycja, zabudowa i regionalne warunki klimatyczne wzmacniają obraz miasta bardzo ciepłego.",
      occurrence_note: "Przydomek jest historyczny: w normach IMGW 1991–2020 Tarnów ma 9,4 °C, a najwyższą średnią roczną temperaturę ma Wrocław (9,7 °C).",
      level: "Polski Biegun Ciepła"
    }),
    base({
      id: "skit-odrynki",
      name_pl: "Skit w Odrynkach",
      name_lat: "dolina Narwi • pustelnia wśród rozlewisk",
      category: "ekstrema-iluzje-mikroklimaty",
      hook: "Drewniana pustelnia pośród wody, bagien i ciszy.",
      quiz_angle: "krajobraz kulturowy, rozlewiska Narwi, drewniana pustelnia i okresowy efekt wyspy",
      region_pl: "Dolina Narwi, Podlaskie.",
      habitat_pl: "Mechanizm: okresowe rozlewiska i podmokłe otoczenie wpisują drewniany skit w krajobraz niemal wyspiarski.",
      occurrence_note: "To bonus krajobrazowo-kulturowy: osobliwość wynika z relacji architektury, wody i ciszy.",
      level: "krajobraz kulturowy"
    })
  ];

  window.LANDSCAPE_RECORD_APP_DATA = {
    subtitle: "56 krajobrazowych osobliwości Polski: polska pustynia, ruchome wydmy, krzywy las, klify, bagna, kolorowe jeziora, przełomy, dawne wulkany, mikroklimaty i miejsca jak z innej mapy.",
    long_intro: "Polska ma miejsca, które zaskakują, bo nie pasują do stereotypowego krajobrazu kraju. Są tu pustynne piaski, wędrujące wydmy, las z powyginanymi sosnami, najgłębsze jezioro, wielkie bagna, rzeki płynące labiryntem, chemicznie kolorowe zbiorniki, bulgoczące mofety, dawne wulkany, lodowcowe kotły, iluzje topograficzne i mikroregiony przypominające inne kraje.",
    safety_notice: "To prototyp edukacyjny o krajobrazie jako zjawisku. Nie traktuj opisów jako instrukcji dojścia ani gwarancji dostępu: sprawdzaj zasady parków, rezerwatów i terenów prywatnych, nie niszcz skał, roślin, torfowisk ani wydm.",
    categories,
    landscapeRecords
  };
})();
