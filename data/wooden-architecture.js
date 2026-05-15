(() => {
  const categories = [
    { id: "koscioly-pokoju", label: "Kościoły Pokoju", short: "Pokój", icon: "P" },
    { id: "gotyk-zrebowy", label: "Gotyk zrębowy", short: "Zrąb", icon: "G" },
    { id: "cerkwie-karpat", label: "Cerkwie Karpat", short: "Cerkwie", icon: "C" },
    { id: "styl-zakopianski-i-gorale", label: "Styl zakopiański i drewno gór", short: "Góry", icon: "Z" },
    { id: "wielokulturowe-drewno", label: "Wielokulturowe drewno", short: "Kultury", icon: "W" }
  ];

  const cat = Object.fromEntries(categories.map((category) => [category.id, category]));

  function entry(data) {
    const category = cat[data.category];
    return {
      ...data,
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
    // verify source before final publication
    return entry({
      source_status: "expanded_candidate",
      ...data
    });
  }

  const woodenArchitecture = [
    base({
      id: "kosciol-pokoju-swidnica",
      name_pl: "Kościół Pokoju w Świdnicy",
      name_lat: "Świdnica • szachulec UNESCO",
      category: "koscioly-pokoju",
      hook: "Ogromna drewniana świątynia szkieletowa kryje barokowe wnętrze, które powstało pod presją bardzo surowych ograniczeń budowlanych.",
      quiz_angle: "szachulec, empory, historia tolerancji i skala wnętrza ukryta w drewnianej konstrukcji",
      safety_note: "zwiedzać zgodnie z zasadami obiektu; nie dotykać polichromii, snycerki ani elementów wyposażenia",
      region_pl: "Świdnica, Dolny Śląsk.",
      habitat_pl: "Drewniana konstrukcja szkieletowa z wypełnieniem, wielokondygnacyjne empory i bogato dekorowane wnętrze.",
      occurrence_note: "To jeden z dwóch zachowanych dolnośląskich Kościołów Pokoju wpisanych na listę UNESCO.",
      level: "szachulec UNESCO"
    }),
    base({
      id: "kosciol-pokoju-jawor",
      name_pl: "Kościół Pokoju w Jaworze",
      name_lat: "Jawor • szachulec UNESCO",
      category: "koscioly-pokoju",
      hook: "Z zewnątrz skromny, wewnątrz działa jak drewniany teatr pamięci: empory, malowidła i szachulec opowiadają o kompromisie po wojnie trzydziestoletniej.",
      quiz_angle: "drewniany szkielet, protestancka historia, empory i monumentalna przestrzeń bez kamiennej fasady",
      safety_note: "traktować wnętrze jak delikatny zabytek; fotografować i poruszać się tylko tam, gdzie pozwala regulamin",
      region_pl: "Jawor, Dolny Śląsk.",
      habitat_pl: "Szkieletowa architektura sakralna z bogatym programem malarskim i wielopoziomową organizacją przestrzeni.",
      occurrence_note: "Razem ze Świdnicą tworzy najlepiej zachowany w Polsce duet Kościołów Pokoju.",
      level: "szachulec UNESCO"
    }),
    base({
      id: "debno-podhalanskie",
      name_pl: "Kościół św. Michała Archanioła w Dębnie Podhalańskim",
      name_lat: "Dębno Podhalańskie • gotyk zrębowy",
      category: "gotyk-zrebowy",
      hook: "Mała bryła z modrzewiowego drewna przechowuje niezwykły świat polichromii, w którym geometryczne wzory układają się w pamięć średniowiecza.",
      quiz_angle: "gotycka konstrukcja zrębowa, polichromia patronowa i wyjątkowo dobrze zachowane wnętrze",
      safety_note: "nie dotykać malowanych ścian ani wyposażenia; we wnętrzu ograniczać światło, hałas i pośpiech",
      region_pl: "Dębno Podhalańskie, Małopolska.",
      habitat_pl: "Drewniany kościół zrębowy z gontowym dachem, sobotami i barwną polichromią we wnętrzu.",
      occurrence_note: "Jeden z najbardziej rozpoznawalnych gotyckich kościołów drewnianych Małopolski, objęty wpisem UNESCO.",
      level: "gotyk zrębowy"
    }),
    base({
      id: "binarowa",
      name_pl: "Kościół św. Michała Archanioła w Binarowej",
      name_lat: "Binarowa • gotyk zrębowy",
      category: "gotyk-zrebowy",
      hook: "Wnętrze tej świątyni działa jak drewniana księga obrazów: późnogotycka konstrukcja spotyka tu malarstwo, barok i lokalną pamięć.",
      quiz_angle: "zrębowa bryła, rozbudowane polichromie i warstwy stylów widoczne w jednym drewnianym kościele",
      safety_note: "zwiedzać spokojnie i bez dotykania dekoracji; drewno oraz malowidła są wrażliwe na zniszczenia",
      region_pl: "Binarowa, Małopolska.",
      habitat_pl: "Zabytkowy kościół drewniany w krajobrazie wsi, z malowanym wnętrzem i historycznym wyposażeniem.",
      occurrence_note: "Należy do małopolskich kościołów drewnianych wpisanych na listę UNESCO.",
      level: "gotyk zrębowy"
    }),
    base({
      id: "sekowa",
      name_pl: "Kościół św. Filipa i św. Jakuba w Sękowej",
      name_lat: "Sękowa • dach i soboty",
      category: "gotyk-zrebowy",
      hook: "Sękowa jest pamiętana przez niezwykłą sylwetkę: wielki, opadający dach i soboty sprawiają, że drewno wygląda tu jak ochronny płaszcz.",
      quiz_angle: "smukła gotycka bryła, bardzo wysoki dach, soboty i wrażenie drewnianej osłony",
      safety_note: "poruszać się wyznaczonymi dojściami; nie wspinać się na soboty ani nie dotykać drewnianych elementów",
      region_pl: "Sękowa, Małopolska.",
      habitat_pl: "Kościół zrębowy o charakterystycznym gontowym dachu i otaczających go podcieniach.",
      occurrence_note: "Jeden z najbardziej malowniczych kościołów drewnianych Małopolski, ujęty w grupie UNESCO.",
      level: "gotyk zrębowy"
    }),
    base({
      id: "lipnica-murowana",
      name_pl: "Kościół św. Leonarda w Lipnicy Murowanej",
      name_lat: "Lipnica Murowana • cmentarz i drewno",
      category: "gotyk-zrebowy",
      hook: "Niewielka świątynia stoi przy starym cmentarzu jak kapsuła czasu: prostota zrębu wzmacnia wagę malowanych i rzeźbionych detali.",
      quiz_angle: "mała skala, gotycki zrąb, cmentarne otoczenie i wyjątkowo cenne wyposażenie",
      safety_note: "szanować zarówno zabytek, jak i cmentarne otoczenie; nie dotykać konstrukcji ani wyposażenia",
      region_pl: "Lipnica Murowana, Małopolska.",
      habitat_pl: "Drewniany kościół cmentarny z gontowym dachem, polichromią i historycznym wyposażeniem.",
      occurrence_note: "W atlasie reprezentuje kościoły, w których niewielka skala niesie bardzo dużą wartość historyczną.",
      level: "gotyk zrębowy"
    }),
    base({
      id: "haczow",
      name_pl: "Kościół Wniebowzięcia NMP i św. Michała Archanioła w Haczowie",
      name_lat: "Haczów • wielki zrąb",
      category: "gotyk-zrebowy",
      hook: "Haczów pokazuje, że drewno potrafi budować monumentalnie: długa, zrębowa bryła należy do najważniejszych średniowiecznych świątyń drewnianych w Polsce.",
      quiz_angle: "duża skala kościoła zrębowego, gotycka metryka i polichromie zachowane w drewnianej strukturze",
      safety_note: "nie dotykać ścian ani elementów wyposażenia; zwiedzać tylko zgodnie z zasadami opieki nad zabytkiem",
      region_pl: "Haczów, Podkarpacie.",
      habitat_pl: "Rozległy kościół drewniany o konstrukcji zrębowej, z gontami, wieżą i historycznymi malowidłami.",
      occurrence_note: "Jeden z kluczowych obiektów grupy drewnianych kościołów południowej Małopolski i Podkarpacia UNESCO.",
      level: "gotyk zrębowy"
    }),
    expanded({
      id: "blizne",
      name_pl: "Kościół Wszystkich Świętych w Bliznem",
      name_lat: "Blizne • warowny krajobraz wsi",
      category: "gotyk-zrebowy",
      hook: "Drewniany kościół w Bliznem zachował nie tylko bryłę i polichromie, lecz także poczucie dawnego zespołu kościelnego w krajobrazie podkarpackiej wsi.",
      quiz_angle: "gotycki zrąb, malowane wnętrze i czytelny zespół sakralny wokół świątyni",
      safety_note: "szanować obiekt i jego otoczenie; nie dotykać polichromii, ogrodzeń ani drewnianych detali",
      region_pl: "Blizne, Podkarpacie.",
      habitat_pl: "Drewniany kościół w historycznym zespole sakralnym, z wnętrzem ważnym dla poznania malarstwa ściennego.",
      occurrence_note: "W atlasie dopełnia podkarpacki wątek gotyckich kościołów zrębowych wpisanych na listę UNESCO.",
      level: "gotyk zrębowy"
    }),
    base({
      id: "kwiaton",
      name_pl: "Cerkiew św. Paraskewii w Kwiatoniu",
      name_lat: "Kwiatoń • łemkowska cerkiew UNESCO",
      category: "cerkwie-karpat",
      hook: "Smukła sylwetka i harmonijne banie sprawiają, że cerkiew w Kwiatoniu bywa pokazywana jako modelowy przykład drewnianej architektury łemkowskiej.",
      quiz_angle: "trójdzielna bryła, wieże, banie i łemkowski typ drewnianej cerkwi karpackiej",
      safety_note: "nie dotykać ikonostasu ani malowideł; we wnętrzu zachować ciszę i dystans od wyposażenia",
      region_pl: "Kwiatoń, Małopolska.",
      habitat_pl: "Drewniana cerkiew w karpackim krajobrazie, z czytelnym układem części i zachowanym wyposażeniem.",
      occurrence_note: "Należy do drewnianych cerkwi polskiego i ukraińskiego regionu Karpat wpisanych na listę UNESCO.",
      level: "cerkiew UNESCO"
    }),
    base({
      id: "powroznik",
      name_pl: "Cerkiew św. Jakuba w Powroźniku",
      name_lat: "Powroźnik • najstarsze warstwy cerkiewne",
      category: "cerkwie-karpat",
      hook: "Powroźnik przypomina, że cerkwie drewniane bywają palimpsestem: przekształcenia, przeniesienia i zachowane malowidła składają się tu na jedną historię.",
      quiz_angle: "karpacka cerkiew drewniana, zachowane malowidła i skomplikowana historia przekształceń",
      safety_note: "zwiedzać uważnie i nie opierać się o drewniane ściany; szczególnie chronić malowane partie wnętrza",
      region_pl: "Powroźnik, Małopolska.",
      habitat_pl: "Drewniana cerkiew dawnego pogranicza kulturowego, z historycznym wyposażeniem i malarstwem.",
      occurrence_note: "Jeden z obiektów UNESCO pokazujących złożoność cerkiewnej architektury Karpat.",
      level: "cerkiew UNESCO"
    }),
    base({
      id: "owczary",
      name_pl: "Cerkiew Opieki Bogurodzicy w Owczarach",
      name_lat: "Owczary • cerkiew łemkowska",
      category: "cerkwie-karpat",
      hook: "W Owczarach drewno, gont i smukła wieża tworzą zabytek, który pozwala czytać historię Łemkowszczyzny bez wielkich kamiennych gestów.",
      quiz_angle: "łemkowski układ cerkwi, wieża, gont i delikatna skala karpackiej architektury drewnianej",
      safety_note: "nie dotykać ikon, polichromii ani elementów drewnianej konstrukcji; respektować sakralny charakter miejsca",
      region_pl: "Owczary, Małopolska.",
      habitat_pl: "Drewniana cerkiew w dolinie Beskidu Niskiego, z zachowanym wyposażeniem i charakterystyczną wieżą.",
      occurrence_note: "To karta o ciągłości i zmianie funkcji: wiele cerkwi karpackich ma dziś także nowe życie parafialne lub muzealne.",
      level: "cerkiew UNESCO"
    }),
    expanded({
      id: "brunary-wyzne",
      name_pl: "Cerkiew św. Michała Archanioła w Brunarach Wyżnych",
      name_lat: "Brunary Wyżne • cerkiew karpacka",
      category: "cerkwie-karpat",
      hook: "Rozbudowana bryła cerkwi w Brunarach pokazuje, jak drewniana architektura potrafiła przyjmować kolejne warstwy historii bez utraty lokalnego rytmu.",
      quiz_angle: "cerkiew karpacka, przekształcenia bryły, gontowe dachy i bogate wnętrze",
      safety_note: "nie dotykać malowideł, ikon ani drewnianych elementów; sprawdzić aktualne zasady zwiedzania przed wizytą",
      region_pl: "Brunary Wyżne, Małopolska.",
      habitat_pl: "Drewniana cerkiew w Beskidzie Niskim, z wieloczęściową bryłą i historycznym wyposażeniem.",
      occurrence_note: "Należy do grupy karpackich cerkwi UNESCO, w których dobrze widać dialog tradycji i późniejszych zmian.",
      level: "cerkiew UNESCO"
    }),
    expanded({
      id: "chotyniec",
      name_pl: "Cerkiew Narodzenia Przenajświętszej Bogurodzicy w Chotyńcu",
      name_lat: "Chotyniec • tradycja pogranicza",
      category: "cerkwie-karpat",
      hook: "Chotyniec wnosi do atlasu wątek wschodniego pogranicza: drewniana cerkiew zachowuje odmienny rytm przestrzeni, galerii i liturgicznej pamięci.",
      quiz_angle: "cerkiew pogranicza, drewniana konstrukcja, arkadowe galerie i wpis UNESCO",
      safety_note: "szanować czynny lub sakralny charakter miejsca; nie dotykać wyposażenia i przestrzegać zasad fotografowania",
      region_pl: "Chotyniec, Podkarpacie.",
      habitat_pl: "Drewniana cerkiew we wschodniej części polskich Karpat i pogranicza kulturowego.",
      occurrence_note: "W atlasie poszerza obraz cerkwi karpackich poza najczęściej fotografowany Beskid Niski.",
      level: "cerkiew UNESCO"
    }),
    expanded({
      id: "radruz",
      name_pl: "Cerkiew św. Paraskewy w Radrużu",
      name_lat: "Radruż • zespół cerkiewny UNESCO",
      category: "cerkwie-karpat",
      hook: "Radruż działa jak kompletny drewniany mikrokrajobraz: cerkiew, dzwonnica, ogrodzenie i otoczenie składają się na rzadko spójny zespół.",
      quiz_angle: "zespół cerkiewny, drewniana architektura obronna i pełny kontekst miejsca",
      safety_note: "nie wspinać się na ogrodzenia ani konstrukcje; traktować cały zespół, także otoczenie, jako część zabytku",
      region_pl: "Radruż, Podkarpacie.",
      habitat_pl: "Zespół drewnianej cerkwi z dzwonnicą i historycznym ogrodzeniem w krajobrazie pogranicza.",
      occurrence_note: "To jeden z najbardziej kompletnych zespołów cerkiewnych w polskiej części wpisu UNESCO.",
      level: "cerkiew UNESCO"
    }),
    expanded({
      id: "smolnik",
      name_pl: "Cerkiew św. Michała Archanioła w Smolniku",
      name_lat: "Smolnik • bojkowska sylweta",
      category: "cerkwie-karpat",
      hook: "Trójdzielna, bojkowska sylweta cerkwi w Smolniku przypomina, że Karpaty nie mają jednego wzoru drewna, lecz wiele lokalnych dialektów.",
      quiz_angle: "bojkowski typ cerkwi, trójdzielna bryła i gontowe dachy w bieszczadzkim krajobrazie",
      safety_note: "zachować dystans od wyposażenia i konstrukcji; nie traktować gontów, schodów ani ogrodzeń jak elementów do wspinania",
      region_pl: "Smolnik nad Sanem, Podkarpacie.",
      habitat_pl: "Drewniana cerkiew w Bieszczadach, osadzona w krajobrazie dawnego pogranicza bojkowskiego.",
      occurrence_note: "W atlasie reprezentuje mniej oczywisty, bojkowski rozdział karpackiej architektury drewnianej.",
      level: "cerkiew UNESCO"
    }),
    expanded({
      id: "turzansk",
      name_pl: "Cerkiew św. Michała Archanioła w Turzańsku",
      name_lat: "Turzańsk • cerkiew w dolinie Osławy",
      category: "cerkwie-karpat",
      hook: "Cerkiew w Turzańsku ma mocną, rytmiczną sylwetkę z wieżami i baniami, dzięki której drewno staje się znakiem kultury doliny Osławy.",
      quiz_angle: "wschodniołemkowska tradycja, rozbudowana sylweta i gontowe zwieńczenia",
      safety_note: "przed wizytą sprawdzić dostępność; na miejscu nie dotykać ikonostasu, ścian ani wyposażenia",
      region_pl: "Turzańsk, Podkarpacie.",
      habitat_pl: "Drewniana cerkiew w południowo-wschodniej Polsce, z charakterystycznymi wieżami i zachowanym wnętrzem.",
      occurrence_note: "Wpis UNESCO obejmuje ją jako część karpackiego dziedzictwa cerkiewnego po polskiej stronie granicy.",
      level: "cerkiew UNESCO"
    }),
    expanded({
      id: "swiatynia-wang",
      name_pl: "Świątynia Wang",
      name_lat: "Karpacz • norweski kościół klepkowy",
      category: "styl-zakopianski-i-gorale",
      hook: "Przeniesiona z Norwegii świątynia klepkowa wygląda w Karkonoszach jak architektoniczny przybysz, który na stałe wpisał się w lokalny pejzaż.",
      quiz_angle: "kościół klepkowy, przeniesienie z Norwegii, Karpacz i niezwykła migracja drewnianego zabytku",
      safety_note: "respektować sakralny charakter miejsca i ruch turystyczny; nie dotykać rzeźbionych detali",
      region_pl: "Karpacz, Dolny Śląsk.",
      habitat_pl: "Drewniana świątynia klepkowa w górskim krajobrazie Karkonoszy, dziś jeden z symboli Karpacza.",
      occurrence_note: "To wyjątek w atlasie: zabytek nie powstał w Polsce, ale jego historia przeniesienia sama stała się osobliwością.",
      level: "drewno gór"
    }),
    expanded({
      id: "jaszczurowka",
      name_pl: "Kaplica Najświętszego Serca Pana Jezusa w Jaszczurówce",
      name_lat: "Zakopane • styl zakopiański",
      category: "styl-zakopianski-i-gorale",
      hook: "Kaplica w Jaszczurówce jest jak manifest stylu zakopiańskiego w małej skali: góralskie formy, rzeźbienie i drewniana konstrukcja pracują tu razem.",
      quiz_angle: "styl zakopiański, projekt Witkiewiczowski, stromy dach i ornamentalne detale z drewna",
      safety_note: "nie dotykać detali snycerskich ani wyposażenia; zwiedzać z poszanowaniem modlitewnego charakteru miejsca",
      region_pl: "Zakopane-Jaszczurówka, Małopolska.",
      habitat_pl: "Drewniana kaplica w górskim otoczeniu, z detalem inspirowanym sztuką Podhala.",
      occurrence_note: "W atlasie pokazuje sakralny wariant stylu zakopiańskiego, bardziej kameralny niż wielkie wille.",
      level: "drewno gór"
    }),
    expanded({
      id: "willa-koliba",
      name_pl: "Willa Koliba",
      name_lat: "Zakopane • muzeum stylu zakopiańskiego",
      category: "styl-zakopianski-i-gorale",
      hook: "Koliba to drewniana deklaracja, że dom może być programem kultury: styl zakopiański dostał tu jedną ze swoich najbardziej czytelnych form.",
      quiz_angle: "willa w stylu zakopiańskim, Stanisław Witkiewicz, podhalański detal i narodowa ambicja stylu",
      safety_note: "we wnętrzu muzealnym nie dotykać wyposażenia ani detali; sprawdzić godziny otwarcia przed wizytą",
      region_pl: "Zakopane, Małopolska.",
      habitat_pl: "Drewniana willa muzealna, łącząca konstrukcję, ornament i ideę stylu zakopiańskiego.",
      occurrence_note: "To jedna z najważniejszych kart świeckiej architektury drewnianej Podhala.",
      level: "drewno gór"
    }),
    expanded({
      id: "chocholow",
      name_pl: "Zabudowa drewniana wsi Chochołów",
      name_lat: "Chochołów • żywa wieś drewniana",
      category: "styl-zakopianski-i-gorale",
      hook: "Chochołów jest wyjątkowy nie przez pojedynczy dom, lecz przez skalę drewnianej tkanki wsi, w której rzędy zrębowych chałup nadal budują ulicę.",
      quiz_angle: "zespół chałup, drewniany układ wsi, zrębowa konstrukcja i żywy krajobraz Podhala",
      safety_note: "pamiętać, że to także miejsce zamieszkania; nie wchodzić na prywatne podwórza i nie fotografować ludzi natarczywie",
      region_pl: "Chochołów, Małopolska.",
      habitat_pl: "Zespół drewnianej zabudowy wiejskiej, w którym wartość tworzą rytm domów, ulica i codzienne użytkowanie.",
      occurrence_note: "W atlasie reprezentuje żywe drewniane wsie, a nie tylko pojedyncze obiekty muzealne.",
      level: "żywy zabytek"
    }),
    expanded({
      id: "orawka",
      name_pl: "Kościół św. Jana Chrzciciela w Orawce",
      name_lat: "Orawka • malowana Orawa",
      category: "wielokulturowe-drewno",
      hook: "Orawka zachwyca wnętrzem, w którym drewno stało się nośnikiem barwnej opowieści religijnej, regionalnej i pogranicznej.",
      quiz_angle: "orawski kościół drewniany, polichromie, pogranicze i malowana narracja wnętrza",
      safety_note: "nie dotykać polichromii ani wyposażenia; przed wizytą sprawdzić zasady wejścia do zabytkowego wnętrza",
      region_pl: "Orawka, Małopolska.",
      habitat_pl: "Drewniany kościół na Orawie, szczególnie ceniony za bogate malarstwo ścienne.",
      occurrence_note: "To karta o drewnie jako powierzchni opowieści: ściany są tu równie ważne jak konstrukcja.",
      level: "wielokulturowe drewno"
    }),
    expanded({
      id: "szalowa",
      name_pl: "Kościół św. Michała Archanioła w Szalowej",
      name_lat: "Szalowa • drewniany barok",
      category: "wielokulturowe-drewno",
      hook: "Szalowa udowadnia, że drewno potrafi udawać monumentalny barok: iluzja, ornament i lekkość materiału tworzą zaskakująco teatralne wnętrze.",
      quiz_angle: "drewniany barok, iluzjonistyczny efekt wnętrza i bogaty detal w lekkiej konstrukcji",
      safety_note: "nie dotykać snycerki ani malowanych partii wnętrza; szanować sakralne i zabytkowe funkcje obiektu",
      region_pl: "Szalowa, Małopolska.",
      habitat_pl: "Drewniany kościół o wyjątkowo teatralnym, barokowym wnętrzu i bogatym wystroju.",
      occurrence_note: "W atlasie pokazuje, że drewniana architektura nie musi być surowa ani skromna.",
      level: "drewniany barok"
    }),
    expanded({
      id: "grywalt",
      name_pl: "Kościół św. Marcina w Grywałdzie",
      name_lat: "Grywałd • pieniński gotyk drewniany",
      category: "gotyk-zrebowy",
      hook: "Kościół w Grywałdzie ma kameralną skalę i mocną sylwetkę, dzięki czemu świetnie pokazuje lokalny wariant małopolskiego gotyku drewnianego.",
      quiz_angle: "mały kościół zrębowy, stromy dach, wieża i pieniński kontekst krajobrazowy",
      safety_note: "nie dotykać drewnianych ścian, malowideł ani wyposażenia; na terenie obiektu zachować ciszę",
      region_pl: "Grywałd, Małopolska.",
      habitat_pl: "Drewniany kościół wiejski w krajobrazie Pienin, z zachowaną historyczną formą.",
      occurrence_note: "To uzupełnienie głównego nurtu UNESCO o mniejsze, ale bardzo czytelne zabytki drewnianego gotyku.",
      level: "gotyk zrębowy"
    }),
    expanded({
      id: "lopuszna",
      name_pl: "Kościół Świętej Trójcy i św. Antoniego Opata w Łopusznej",
      name_lat: "Łopuszna • gotyk Podhala",
      category: "gotyk-zrebowy",
      hook: "Łopuszna łączy gotycką tradycję drewnianą z podhalańskim pejzażem, w którym gont, zrąb i wieża tworzą spokojny znak miejscowości.",
      quiz_angle: "drewniany kościół podhalański, zrębowa konstrukcja, gont i historyczne wyposażenie",
      safety_note: "zwiedzać z poszanowaniem funkcji sakralnej; nie dotykać ołtarzy, malowideł ani drewnianych detali",
      region_pl: "Łopuszna, Małopolska.",
      habitat_pl: "Drewniany kościół w podhalańskiej wsi, związany z lokalnym krajobrazem i tradycją ciesielską.",
      occurrence_note: "W atlasie wzmacnia podhalański wątek gotyckich świątyń zrębowych poza najbardziej znanymi ikonami.",
      level: "gotyk zrębowy"
    }),
    expanded({
      id: "kruszyniany",
      name_pl: "Meczet tatarski w Kruszynianach",
      name_lat: "Kruszyniany • drewniany meczet tatarski",
      category: "wielokulturowe-drewno",
      hook: "Zielony drewniany meczet w Kruszynianach jest jednym z najmocniejszych znaków tatarskiej obecności w Polsce: skromna forma niesie wielką historię pogranicza.",
      quiz_angle: "drewniany meczet, tatarska społeczność, Podlasie i odmienna funkcja sakralna w atlasie drewna",
      safety_note: "traktować obiekt jako miejsce religijne; wejście, ubiór i fotografowanie podporządkować zasadom gospodarzy",
      region_pl: "Kruszyniany, Podlasie.",
      habitat_pl: "Drewniany meczet w krajobrazie wsi tatarskiej, związany z czynną pamięcią społeczności.",
      occurrence_note: "To karta pokazująca, że drewniana architektura Polski nie jest tylko chrześcijańska ani góralska.",
      level: "wielokulturowe drewno"
    }),
    expanded({
      id: "bohoniki",
      name_pl: "Meczet tatarski w Bohonikach",
      name_lat: "Bohoniki • podlaskie drewno tatarskie",
      category: "wielokulturowe-drewno",
      hook: "Meczet w Bohonikach jest mniejszy i cichszy niż wiele ikon atlasu, ale właśnie w tej skali dobrze widać trwałość tatarskiej tradycji.",
      quiz_angle: "podlaski meczet drewniany, tatarska historia i kameralna architektura sakralna",
      safety_note: "respektować zasady zwiedzania i religijny charakter miejsca; nie dotykać wyposażenia bez zgody opiekunów",
      region_pl: "Bohoniki, Podlasie.",
      habitat_pl: "Drewniany meczet w podlaskiej wsi, powiązany z lokalną społecznością i mizarami regionu.",
      occurrence_note: "Razem z Kruszynianami tworzy najczytelniejszy tatarski rozdział polskiej architektury drewnianej.",
      level: "wielokulturowe drewno"
    }),
    expanded({
      id: "kraina-otwartych-okiennic",
      name_pl: "Kraina Otwartych Okiennic",
      name_lat: "Podlasie • ornament drewnianych wsi",
      category: "wielokulturowe-drewno",
      hook: "Tu osobliwością nie jest pojedynczy dom, lecz rytm okiennic, narożników i kolorowych detali, które zmieniają drewniane wsie w żywy ornament.",
      quiz_angle: "zdobione okiennice, podlaskie wsie, drewniany detal i krajobraz wielokulturowego pogranicza",
      safety_note: "to zamieszkane miejscowości; oglądać z drogi, nie wchodzić na posesje i nie traktować domów jak dekoracji bez właścicieli",
      region_pl: "Podlasie, szczególnie okolice Trześcianki, Socec i Puchłów.",
      habitat_pl: "Zespoły drewnianej zabudowy wiejskiej z bogatym detalem snycerskim wokół okien, naroży i szczytów.",
      occurrence_note: "W atlasie reprezentuje drewnianą architekturę żywą, rozproszoną i zależną od codziennej opieki mieszkańców.",
      level: "żywy zabytek"
    }),
    expanded({
      id: "domy-podcieniowe-zulawy",
      name_pl: "Żuławskie domy podcieniowe",
      name_lat: "Żuławy • konstrukcja podcieniowa",
      category: "wielokulturowe-drewno",
      hook: "Żuławskie domy podcieniowe rozpoznaje się po wysuniętej części wspartej na słupach, jakby dom robił miejsce dla pracy, magazynu i reprezentacji naraz.",
      quiz_angle: "podcień na słupach, żuławski krajobraz osadniczy i mieszanie funkcji domu gospodarczego",
      safety_note: "wiele obiektów jest prywatnych lub delikatnych technicznie; nie wchodzić bez zgody i nie opierać się o konstrukcję",
      region_pl: "Żuławy Wiślane, Pomorze.",
      habitat_pl: "Drewniano-murowane domy wiejskie z podcieniem, wpisane w płaski krajobraz deltowy i historię osadnictwa.",
      occurrence_note: "To karta o architekturze pogranicza i gospodarowania wodą, nie tylko o ozdobnym detalu.",
      level: "wielokulturowe drewno"
    }),
    expanded({
      id: "dwor-z-drogini",
      name_pl: "Dwór z Drogini",
      name_lat: "Wygiełzów • dwór z modrzewia",
      category: "wielokulturowe-drewno",
      hook: "Przeniesiony do skansenu dwór z Drogini pokazuje szlacheckie drewno w wydaniu innym niż wiejska chata: bardziej reprezentacyjnym, ale nadal ciesielskim.",
      quiz_angle: "drewniany dwór, modrzewiowa konstrukcja, translokacja do skansenu i ziemiański model domu",
      safety_note: "zwiedzać jak obiekt muzealny; nie dotykać wyposażenia, polichromii ani elementów konstrukcji",
      region_pl: "Nadwiślański Park Etnograficzny w Wygiełzowie, Małopolska; obiekt przeniesiony z Drogini.",
      habitat_pl: "Drewniany dwór szlachecki w ekspozycji skansenowskiej, zachowujący układ domu reprezentacyjnego.",
      occurrence_note: "W atlasie uzupełnia obraz drewna o warstwę dworską, często pomijaną między kościołami i chałupami.",
      level: "dwór z modrzewia"
    }),
    base({
      id: "chata-na-wysokosci",
      name_pl: "Chata na Wysokości",
      name_lat: "Zalesie • świeckie budownictwo góralskie",
      category: "styl-zakopianski-i-gorale",
      hook: "Ta karta pokazuje mniej pomnikowy wymiar drewna gór: dom mieszkalny, w którym konstrukcja, klimat i codzienność są ważniejsze niż efekt reprezentacyjny.",
      quiz_angle: "góralska chata z bali, świecka funkcja, adaptacja do górskiego klimatu i skala codziennego domu",
      safety_note: "jeśli obiekt jest prywatny lub użytkowany, oglądać tylko z miejsc dostępnych publicznie i nie wchodzić bez zgody",
      region_pl: "Zalesie, górska część południowej Polski.",
      habitat_pl: "Drewniana chata związana z budownictwem góralskim i lokalną tradycją ciesielską.",
      occurrence_note: "Zdjęcie w paczce jest oznaczone jako reprezentatywne, bo nie użyto wolnego kadru dokładnego obiektu.",
      level: "drewno gór"
    })
  ];

  window.WOODEN_ARCHITECTURE_APP_DATA = {
    subtitle: "30 drewnianych osobliwości Polski: Kościoły Pokoju, gotyckie świątynie zrębowe, cerkwie Karpat, styl zakopiański, tatarskie meczety i drewniane wsie.",
    safety_notice: "To prototyp edukacyjny. Drewniane zabytki oglądaj z szacunkiem: nie dotykaj polichromii, ikon, snycerki ani konstrukcji, nie wchodź na prywatne posesje bez zgody i sprawdzaj aktualne zasady zwiedzania.",
    categories,
    woodenArchitecture
  };
})();
