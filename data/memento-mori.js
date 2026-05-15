(() => {
  const categories = [
    { id: "ossuaria", label: "Ossuaria", short: "Ossuaria", icon: "O" },
    { id: "nekropolie", label: "Nekropolie", short: "Nekropolie", icon: "N" },
    { id: "cmentarze-wielu-kultur", label: "Cmentarze wielu kultur", short: "Wiele kultur", icon: "K" },
    { id: "cmentarze-wojenne", label: "Cmentarze wojenne", short: "Wojenne", icon: "W" },
    { id: "miejsca-zaglady", label: "Miejsca Zagłady", short: "Zagłada", icon: "Z" },
    { id: "miejsca-martyrologii", label: "Miejsca martyrologii", short: "Pamięć", icon: "P" },
    { id: "kopce-pradawne-pochowki", label: "Kopce i pradawne pochówki", short: "Kopce", icon: "C" }
  ];

  const cat = Object.fromEntries(categories.map((category) => [category.id, category]));

  const sharedSourceHints = [
    "oficjalna strona miejsca pamięci, muzeum, cmentarza albo zarządcy",
    "NID / zabytek.pl, UNESCO albo Pomnik Historii, jeśli dotyczy",
    "materiały edukacyjne muzeów, IPN, samorządów i instytucji opiekujących się miejscem"
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

  const mementoMori = [
    base({
      id: "kaplica-czaszek-czermna",
      name_pl: "Kaplica Czaszek w Czermnej",
      name_lat: "Kudowa-Zdrój • barokowe ossuarium",
      category: "ossuaria",
      hook: "Mała kaplica, która mówi wielkim głosem o przemijaniu.",
      quiz_angle: "ossuarium, wojny śląskie, epidemie, barokowa symbolika i pamięć o bezimiennych zmarłych",
      safety_note: "zwiedzać z powagą; nie fotografować ani nie komentować szczątków jak atrakcji",
      region_pl: "Czermna, Kudowa-Zdrój, Dolnośląskie.",
      habitat_pl: "Mechanizm pamięci: kości zebrane po wojnach i epidemiach ułożono w sakralnej przestrzeni jako przypomnienie o kruchości życia.",
      occurrence_note: "Osobliwością nie jest skala, lecz język miejsca: architektura, szczątki i cisza tworzą jedną lekcję memento mori.",
      level: "ossuarium"
    }),
    base({
      id: "stare-powazki",
      name_pl: "Stare Powązki",
      name_lat: "Warszawa • narodowa nekropolia",
      category: "nekropolie",
      hook: "Cmentarz, który działa jak encyklopedia polskiej pamięci.",
      quiz_angle: "Aleja Zasłużonych, rzeźba nagrobna, historia Warszawy i groby ludzi kultury",
      safety_note: "traktować jako czynny cmentarz: poruszać się spokojnie i nie naruszać prywatności odwiedzających",
      region_pl: "Warszawa, Mazowieckie.",
      habitat_pl: "Mechanizm pamięci: układ alejek, kaplice, nagrobki i rzeźby tworzą wielowarstwowy zapis historii miasta i kraju.",
      occurrence_note: "Powązki są osobliwe przez gęstość biografii: pojedynczy spacer odsłania sztukę, język epok i narodowe rytuały pamiętania.",
      level: "nekropolia narodowa"
    }),
    base({
      id: "cmentarz-rakowicki",
      name_pl: "Cmentarz Rakowicki",
      name_lat: "Kraków • kamienna mapa miasta",
      category: "nekropolie",
      hook: "Kamienna mapa krakowskiej historii.",
      quiz_angle: "XIX-wieczna nekropolia, krakowskie rody, sztuka sepulkralna i pamięć miasta",
      safety_note: "poruszać się wyznaczonymi alejkami i szanować groby, zieleń oraz osoby odwiedzające bliskich",
      region_pl: "Kraków, Małopolskie.",
      habitat_pl: "Mechanizm pamięci: zabytkowe kwatery pokazują, jak miasto porządkuje biografie przez aleje, symbole i rzeźbę nagrobną.",
      occurrence_note: "Rakowice są osobliwe jako archiwum pod gołym niebem: historia Krakowa jest tu czytelna w nazwiskach, detalach i rytmie kwater.",
      level: "nekropolia miejska"
    }),
    base({
      id: "peksowy-brzyzek",
      name_pl: "Cmentarz na Pęksowym Brzyzku",
      name_lat: "Zakopane • podhalańska nekropolia",
      category: "nekropolie",
      hook: "Podhalańska pamięć zapisana w drewnie i kamieniu.",
      quiz_angle: "styl zakopiański, twórcy Podhala, drewniane krzyże i regionalny język form",
      safety_note: "nie dotykać drewnianych detali i traktować miejsce jako cichy cmentarz, nie scenografię do zdjęć",
      region_pl: "Zakopane, Małopolskie.",
      habitat_pl: "Mechanizm pamięci: lokalne materiały, krzyże, rzeźba i położenie przy starym kościele budują bardzo regionalny język nekropolii.",
      occurrence_note: "Osobliwością jest spójność kultury miejsca: sztuka ludowa, biografie artystów i góralska forma mówią jednym głosem.",
      level: "nekropolia regionalna"
    }),
    base({
      id: "cmentarz-zydowski-okopowa",
      name_pl: "Cmentarz Żydowski przy ul. Okopowej w Warszawie",
      name_lat: "Warszawa • rozległa nekropolia żydowska",
      category: "cmentarze-wielu-kultur",
      hook: "Kamienna księga warszawskich Żydów.",
      quiz_angle: "macewy, hebrajskie inskrypcje, symbole rodowe, historia diaspory i skala nekropolii",
      safety_note: "zachować powagę, nie przestawiać kamieni i respektować zasady opiekunów cmentarza",
      region_pl: "Warszawa, Mazowieckie.",
      habitat_pl: "Mechanizm pamięci: inskrypcje, symbole i różne formy nagrobków opowiadają o religii, językach i społeczności dawnej Warszawy.",
      occurrence_note: "To miejsce jest osobliwe przez skalę zachowanego zapisu: setki biografii tworzą materialną historię miasta wielu kultur.",
      level: "cmentarz żydowski"
    }),
    base({
      id: "nowy-cmentarz-zydowski-lodz",
      name_pl: "Nowy Cmentarz Żydowski w Łodzi",
      name_lat: "Łódź • miasto macew",
      category: "cmentarze-wielu-kultur",
      hook: "Miasto macew w mieście fabryk.",
      quiz_angle: "łódzki przemysł, mauzoleum Izraela Poznańskiego, pole gettowe i rozległość cmentarza",
      safety_note: "nie wchodzić na groby, nie dotykać nagrobków i pamiętać, że część miejsca wiąże się z historią getta",
      region_pl: "Łódź, Łódzkie.",
      habitat_pl: "Mechanizm pamięci: cmentarz łączy monumentalne grobowce przemysłowej Łodzi z prostymi znakami tragedii XX wieku.",
      occurrence_note: "Osobliwością jest kontrast skali: bogactwo miasta fabrycznego i doświadczenie Zagłady spotykają się w jednym krajobrazie pamięci.",
      level: "nekropolia żydowska"
    }),
    base({
      id: "cmentarz-remuh",
      name_pl: "Cmentarz Remuh",
      name_lat: "Kraków Kazimierz • stara nekropolia żydowska",
      category: "cmentarze-wielu-kultur",
      hook: "Nekropolia ukryta w sercu dawnej dzielnicy żydowskiej.",
      quiz_angle: "Kazimierz, macewy, rabin Remuh, mur z fragmentów nagrobków i dawna gmina żydowska",
      safety_note: "odwiedzać z poszanowaniem tradycji żydowskiej i nie traktować starych macew jako dekoracji",
      region_pl: "Kraków, Małopolskie.",
      habitat_pl: "Mechanizm pamięci: niewielka przestrzeń skupia zabytkowe macewy, synagogę i pamięć o jednej z najważniejszych gmin żydowskich w Polsce.",
      occurrence_note: "Remuh jest osobliwy przez intensywność miejsca: w ciasnej tkance Kazimierza mieści się kilka stuleci pamięci.",
      level: "stary cmentarz"
    }),
    base({
      id: "mizar-kruszyniany",
      name_pl: "Mizar w Kruszynianach",
      name_lat: "Podlaskie • tatarski cmentarz muzułmański",
      category: "cmentarze-wielu-kultur",
      hook: "Polski islam zapisany w kamiennych nagrobkach.",
      quiz_angle: "Tatarzy polscy, mizar, orientacja grobów, inskrypcje i sąsiedztwo drewnianego meczetu",
      safety_note: "traktować mizar jak czynne miejsce religijnej pamięci i nie wchodzić między groby bez potrzeby",
      region_pl: "Kruszyniany, Podlaskie.",
      habitat_pl: "Mechanizm pamięci: kamienie nagrobne, języki inskrypcji i układ pochówków pokazują ciągłość tatarskiej obecności w Rzeczypospolitej.",
      occurrence_note: "Osobliwością jest wielokulturowy wymiar polskiego krajobrazu: mizar przypomina, że historia lokalna bywa muzułmańska, tatarska i pograniczna.",
      level: "mizar"
    }),
    base({
      id: "mizar-bohoniki",
      name_pl: "Mizar w Bohonikach",
      name_lat: "Podlaskie • tatarska nekropolia",
      category: "cmentarze-wielu-kultur",
      hook: "Cichy ślad Rzeczypospolitej wielu kultur.",
      quiz_angle: "Tatarzy, islam w Polsce, kamienne nagrobki, pogranicze i lokalna ciągłość wspólnoty",
      safety_note: "zachować ciszę i szacunek dla tradycji muzułmańskiej oraz lokalnej społeczności",
      region_pl: "Bohoniki, Podlaskie.",
      habitat_pl: "Mechanizm pamięci: mizar porządkuje rodzinne i religijne biografie w krajobrazie pogranicza, gdzie kultury od dawna się spotykają.",
      occurrence_note: "Bohoniki są osobliwe nie monumentalnością, lecz trwaniem: mała nekropolia przechowuje dużą opowieść o wspólnym państwie wielu wyznań.",
      level: "mizar"
    }),
    base({
      id: "cmentarz-mennonicki-stogi",
      name_pl: "Cmentarz mennonicki w Stogach Malborskich",
      name_lat: "Żuławy • ślad osadników w krainie wody",
      category: "cmentarze-wielu-kultur",
      hook: "Nagrobki ludzi, którzy osuszali krainę wody.",
      quiz_angle: "mennonici, Żuławy, gospodarka wodna, nagrobki i pamięć osadnictwa olęderskiego",
      safety_note: "nie czyścić ani nie przestawiać nagrobków; oglądać z poszanowaniem kruchego zabytku",
      region_pl: "Stogi Malborskie, Pomorskie.",
      habitat_pl: "Mechanizm pamięci: cmentarz łączy historię osadnictwa, religii i pracy nad krajobrazem delty Wisły.",
      occurrence_note: "Osobliwością jest związek nekropolii z geografią: nagrobki opowiadają o ludziach, którzy przez pokolenia żyli z wodą i przeciw wodzie.",
      level: "cmentarz mennonicki"
    }),
    base({
      id: "cmentarz-wojenny-luzna-pustki",
      name_pl: "Cmentarz wojenny nr 123 Łużna-Pustki",
      name_lat: "Małopolskie • las krzyży I wojny światowej",
      category: "cmentarze-wojenne",
      hook: "Drewniana góra pamięci po bitwie gorlickiej.",
      quiz_angle: "I wojna światowa, bitwa gorlicka, wzgórze Pustki, drewniane krzyże i projektowanie cmentarzy wojennych",
      safety_note: "traktować miejsce jako cmentarz wojenny; nie wchodzić poza ścieżki ani nie siadać na elementach grobów",
      region_pl: "Łużna, Małopolskie.",
      habitat_pl: "Mechanizm pamięci: układ krzyży i położenie na wzgórzu przekłada doświadczenie pola bitwy na czytelny krajobraz żałoby.",
      occurrence_note: "Osobliwością jest skala drewnianego znaku: cmentarz wygląda jak las pamięci, ale pozostaje precyzyjnie zaprojektowaną przestrzenią.",
      level: "I wojna światowa"
    }),
    base({
      id: "cmentarz-wojenny-magura-malastowska",
      name_pl: "Cmentarz wojenny nr 60 Magura Małastowska",
      name_lat: "Beskid Niski • Jurkovič w krajobrazie",
      category: "cmentarze-wojenne",
      hook: "Architektura pamięci ukryta w górach.",
      quiz_angle: "Dušan Jurkovič, drewniana forma, Karpaty, I wojna światowa i cmentarze okręgu gorlickiego",
      safety_note: "zachować ostrożność na górskiej trasie i nie naruszać drewnianych elementów cmentarza",
      region_pl: "Przełęcz Małastowska, Małopolskie.",
      habitat_pl: "Mechanizm pamięci: projekt łączy regionalne drewno, rytm krzyży i górskie położenie w jedną spokojną kompozycję.",
      occurrence_note: "Cmentarz jest osobliwy, bo nie oddziela architektury od pejzażu: góra staje się częścią formy pamięci.",
      level: "architektura pamięci"
    }),
    base({
      id: "rotunda-zamojska",
      name_pl: "Rotunda Zamojska",
      name_lat: "Zamość • fortyfikacja i miejsce pamięci",
      category: "miejsca-martyrologii",
      hook: "Fortyfikacja zamieniona w miejsce cierpienia.",
      quiz_angle: "architektura obronna, okupacja niemiecka, miejsce kaźni i muzealna funkcja pamięci",
      safety_note: "używać spokojnego języka i traktować ekspozycję jako świadectwo martyrologii, nie element zwiedzania rozrywkowego",
      region_pl: "Zamość, Lubelskie.",
      habitat_pl: "Mechanizm pamięci: obiekt militarny zyskał drugą, bolesną warstwę znaczeń przez funkcję więzienia i miejsca egzekucji.",
      occurrence_note: "Osobliwością Rotundy jest zmiana sensu budowli: forma obronna stała się ramą dla pamięci o ofiarach przemocy.",
      level: "miejsce martyrologii"
    }),
    base({
      id: "palmiry",
      name_pl: "Palmiry",
      name_lat: "Puszcza Kampinoska • las pamięci",
      category: "miejsca-martyrologii",
      hook: "Las, który stał się cmentarzem pamięci.",
      quiz_angle: "egzekucje w czasie okupacji, cmentarz, muzeum, Puszcza Kampinoska i symbolika lasu",
      safety_note: "zachować ciszę przy grobach i nie używać miejsca jako pleneru bez świadomości jego historii",
      region_pl: "Palmiry, Mazowieckie.",
      habitat_pl: "Mechanizm pamięci: leśny krajobraz, rzędy krzyży i muzeum tworzą przestrzeń, w której przyroda nie zaciera historii.",
      occurrence_note: "Palmiry są osobliwe przez napięcie między spokojem lasu a wiedzą o zbrodniach, które ten las przechowuje.",
      level: "las pamięci"
    }),
    base({
      id: "auschwitz-birkenau",
      name_pl: "Auschwitz-Birkenau",
      name_lat: "Oświęcim i Brzezinka • miejsce Zagłady UNESCO",
      category: "miejsca-zaglady",
      hook: "Miejsce, przy którym atlas musi mówić ciszej.",
      quiz_angle: "niemiecki nazistowski obóz koncentracyjny i zagłady, UNESCO, autentyzm miejsca i edukacja o ludobójstwie",
      safety_note: "zachować najwyższą powagę; nie używać miejsca do pozowania, żartów ani uproszczeń historii",
      region_pl: "Oświęcim i Brzezinka, Małopolskie.",
      habitat_pl: "Mechanizm pamięci: zachowane baraki, ruiny, ekspozycje i teren muzeum uczą przez autentyczną przestrzeń zbrodni.",
      occurrence_note: "Osobliwością w atlasie jest ciężar świadectwa: to nie atrakcja, lecz jedno z najważniejszych miejsc edukacji o Zagładzie.",
      level: "UNESCO i miejsce Zagłady"
    }),
    base({
      id: "majdanek",
      name_pl: "Państwowe Muzeum na Majdanku",
      name_lat: "Lublin • zachowany teren obozu",
      category: "miejsca-zaglady",
      hook: "Architektura zbrodni jako ostrzeżenie.",
      quiz_angle: "KL Lublin, zachowany teren, baraki, pomnik, muzeum i język dokumentowania zbrodni",
      safety_note: "zwiedzać w skupieniu i pamiętać, że ekspozycja dotyczy konkretnych ofiar oraz sprawców",
      region_pl: "Lublin, Lubelskie.",
      habitat_pl: "Mechanizm pamięci: zachowana infrastruktura obozowa pokazuje, jak przestrzeń, ogrodzenie i budynki były częścią systemu przemocy.",
      occurrence_note: "Majdanek jest osobliwy przez materialną czytelność miejsca: topografia obozu pozostaje blisko miasta i wymaga uważnego języka.",
      level: "miejsce Zagłady"
    }),
    base({
      id: "belzec",
      name_pl: "Muzeum i Miejsce Pamięci w Bełżcu",
      name_lat: "Lubelskie • pomnik po obozie zagłady",
      category: "miejsca-zaglady",
      hook: "Pomnik zbudowany bardziej z ciszy niż z formy.",
      quiz_angle: "obóz zagłady, współczesne upamiętnienie, topografia pustki i edukacja o ofiarach",
      safety_note: "unikać skrótów i liczb bez kontekstu; mówić o miejscu spokojnie i rzeczowo",
      region_pl: "Bełżec, Lubelskie.",
      habitat_pl: "Mechanizm pamięci: współczesny pomnik porządkuje teren po zniszczonym obozie, używając materiału, skali i pustki.",
      occurrence_note: "Bełżec jest osobliwy przez sposób upamiętnienia: forma nie odtwarza obozu, lecz prowadzi przez brak i pamięć o zamordowanych.",
      level: "miejsce Zagłady"
    }),
    base({
      id: "sobibor",
      name_pl: "Muzeum Byłego Obozu Zagłady w Sobiborze",
      name_lat: "Lubelskie • las i miejsce pamięci",
      category: "miejsca-zaglady",
      hook: "Las i przestrzeń po nieistniejącym obozie.",
      quiz_angle: "obóz zagłady, powstanie więźniów, archeologia miejsca i współczesna ekspozycja",
      safety_note: "nie sprowadzać historii do jednej opowieści o ucieczce; pamiętać o skali ofiar i zniszczonym obozie",
      region_pl: "Sobibór, Lubelskie.",
      habitat_pl: "Mechanizm pamięci: muzeum i badania archeologiczne pomagają odczytać miejsce, którego materialne ślady zostały celowo zatarte.",
      occurrence_note: "Sobibór jest osobliwy przez widzialny brak: las i pomnik wymagają opowieści o śladach, które próbowano usunąć.",
      level: "miejsce Zagłady"
    }),
    base({
      id: "kulmhof-chelmno",
      name_pl: "Ośrodek Zagłady Kulmhof",
      name_lat: "Chełmno nad Nerem • pamięć rozproszona",
      category: "miejsca-zaglady",
      hook: "Pamięć rozproszona między pałacem, lasem i mogiłami.",
      quiz_angle: "Chełmno nad Nerem, samochody-komory gazowe, Las Rzuchowski i wczesny etap Zagłady",
      safety_note: "zachować ścisłość nazewnictwa i nie upraszczać historii pierwszego niemieckiego ośrodka zagłady na ziemiach polskich",
      region_pl: "Chełmno nad Nerem i Las Rzuchowski, Wielkopolskie.",
      habitat_pl: "Mechanizm pamięci: kilka miejsc składa się na jeden krajobraz zbrodni, dlatego źródła i topografia są szczególnie ważne.",
      occurrence_note: "Kulmhof jest osobliwy przez rozproszenie śladów: pamięć nie mieści się w jednym budynku, lecz między punktami dawnego procesu zagłady.",
      level: "miejsce Zagłady"
    }),
    base({
      id: "treblinka",
      name_pl: "Treblinka",
      name_lat: "Mazowieckie • kamienne pole pamięci",
      category: "miejsca-zaglady",
      hook: "Kamienie zamiast miasta, którego już nie ma.",
      quiz_angle: "obóz zagłady, symboliczne kamienie, zniszczenie śladów i pomnikowa topografia pamięci",
      safety_note: "nie traktować symbolicznych form jak dekoracji; ich abstrakcja odnosi się do konkretnych społeczności i ofiar",
      region_pl: "Treblinka, Mazowieckie.",
      habitat_pl: "Mechanizm pamięci: pomnik i kamienie zastępują nieistniejącą zabudowę obozu, budując język obecności przez symbol.",
      occurrence_note: "Treblinka jest osobliwa, bo pamięć działa tu przez znak, a nie przez zachowane budynki: pole kamieni staje się mapą utraconych miejsc.",
      level: "miejsce Zagłady"
    }),
    base({
      id: "piasnica",
      name_pl: "Piaśnica",
      name_lat: "Pomorskie • leśne miejsce martyrologii",
      category: "miejsca-martyrologii",
      hook: "Las północnej Polski jako niemy świadek.",
      quiz_angle: "masowe egzekucje, las piaśnicki, pamięć Pomorza i rola leśnego krajobrazu",
      safety_note: "opowiadać o miejscu bez obrazowego epatowania przemocą; skupić się na pamięci i źródłach",
      region_pl: "Lasy Piaśnickie koło Wejherowa, Pomorskie.",
      habitat_pl: "Mechanizm pamięci: mogiły, pomniki i leśna przestrzeń utrwalają historię egzekucji dokonanych z dala od centrum miasta.",
      occurrence_note: "Piaśnica jest osobliwa przez ciszę krajobrazu: zwykły las stał się jednym z ważnych miejsc pamięci Pomorza.",
      level: "las martyrologii"
    }),
    base({
      id: "michniow",
      name_pl: "Mauzoleum Martyrologii Wsi Polskich w Michniowie",
      name_lat: "Świętokrzyskie • architektura rany",
      category: "miejsca-martyrologii",
      hook: "Dom, który stał się raną w krajobrazie.",
      quiz_angle: "pacyfikacja wsi, mauzoleum, symbol domu, pamięć wsi polskich i współczesna architektura",
      safety_note: "traktować ekspozycję jako opowieść o cywilach i wspólnotach, bez skracania jej do efektownej formy budynku",
      region_pl: "Michniów, Świętokrzyskie.",
      habitat_pl: "Mechanizm pamięci: architektura rozcina formę domu, aby pokazać przerwaną codzienność i los pacyfikowanych wsi.",
      occurrence_note: "Michniów jest osobliwy przez moc współczesnej formy: budynek nie tylko mieści pamięć, ale sam staje się jej językiem.",
      level: "mauzoleum"
    }),
    base({
      id: "grob-nieznanego-zolnierza",
      name_pl: "Grób Nieznanego Żołnierza",
      name_lat: "Warszawa • państwowy symbol pamięci",
      category: "miejsca-martyrologii",
      hook: "Jedna arkada, bardzo wiele historii.",
      quiz_angle: "symboliczny grób, zmiana warty, tablice bitewne, plac Piłsudskiego i pamięć państwowa",
      safety_note: "zachować powagę podczas uroczystości i nie przeszkadzać wartownikom ani innym odwiedzającym",
      region_pl: "Warszawa, Mazowieckie.",
      habitat_pl: "Mechanizm pamięci: ocalały fragment pałacowej arkady skupia rytuały państwowe, nazwane bitwy i symboliczny pochówek bezimiennego żołnierza.",
      occurrence_note: "Osobliwością jest kondensacja sensu: bardzo mała forma architektoniczna niesie ogólnopaństwową pamięć o poległych.",
      level: "symbol państwowy"
    }),
    base({
      id: "kopiec-powstania-warszawskiego",
      name_pl: "Kopiec Powstania Warszawskiego",
      name_lat: "Warszawa • góra z ruin miasta",
      category: "miejsca-martyrologii",
      hook: "Góra usypana z ruin miasta.",
      quiz_angle: "gruz Warszawy, Powstanie Warszawskie, znak Polski Walczącej i pamięć odbudowy",
      safety_note: "traktować kopiec jako miejsce pamięci; nie banalizować gruzu, z którego powstał",
      region_pl: "Warszawa, Mazowieckie.",
      habitat_pl: "Mechanizm pamięci: materiał zniszczonego miasta został przekształcony w ziemną formę, która łączy stratę, odbudowę i rytuał rocznicowy.",
      occurrence_note: "Kopiec jest osobliwy, bo jego tworzywo ma znaczenie historyczne: to nie tylko nasyp, lecz przetworzony ślad ruin Warszawy.",
      level: "kopiec pamięci"
    }),
    base({
      id: "westerplatte-cmentarz",
      name_pl: "Westerplatte — Cmentarz Obrońców Wybrzeża",
      name_lat: "Gdańsk • cmentarz symbolicznej obrony",
      category: "cmentarze-wojenne",
      hook: "Mała placówka, wielki symbol.",
      quiz_angle: "obrona Westerplatte, wrzesień 1939, cmentarz, pomnik i pamięć początku wojny",
      safety_note: "zachować powagę przy grobach i odróżniać część cmentarną od szerszej trasy historycznej Westerplatte",
      region_pl: "Gdańsk, Pomorskie.",
      habitat_pl: "Mechanizm pamięci: cmentarz łączy konkretne groby obrońców z szeroką symboliką pierwszych dni II wojny światowej.",
      occurrence_note: "Westerplatte jest osobliwe przez różnicę skali: niewielki teren niesie znaczenie wykraczające daleko poza sam półwysep.",
      level: "cmentarz wojenny"
    }),
    base({
      id: "kamienne-kregi-odry",
      name_pl: "Kamienne kręgi w Odrach",
      name_lat: "Pomorskie • pradawne cmentarzysko",
      category: "kopce-pradawne-pochowki",
      hook: "Pradawna geometria pamięci w lesie.",
      quiz_angle: "kultura wielbarska, kamienne kręgi, kurhany, archeologia i rezerwat przyrody",
      safety_note: "nie przesuwać kamieni, nie schodzić z tras i traktować stanowisko jako zabytek archeologiczny",
      region_pl: "Odry koło Czerska, Pomorskie.",
      habitat_pl: "Mechanizm pamięci: kamienne kręgi i pochówki porządkują przestrzeń tak, że archeologia staje się widoczna jako geometria terenu.",
      occurrence_note: "Odry są osobliwe, bo miejsce działa jednocześnie jako stanowisko archeologiczne, leśny rezerwat i mapa dawnych rytuałów.",
      level: "cmentarzysko pradziejowe"
    }),
    base({
      id: "kamienne-kregi-wesiory",
      name_pl: "Kamienne kręgi w Węsiorach",
      name_lat: "Pomorskie • cmentarzysko kultury wielbarskiej",
      category: "kopce-pradawne-pochowki",
      hook: "Miejsce, gdzie archeologia wygląda jak rytuał.",
      quiz_angle: "Węsiory, kamienne kręgi, kurhany, Gotowie, kultura wielbarska i ochrona stanowiska",
      safety_note: "oglądać bez wchodzenia na kurhany i bez zabierania kamieni, ziemi ani drobnych znalezisk",
      region_pl: "Węsiory, Pomorskie.",
      habitat_pl: "Mechanizm pamięci: układ kamieni i kurhanów pozwala odczytać dawny porządek pochówku bez rekonstrukcji budynków.",
      occurrence_note: "Węsiory są osobliwe przez materialną prostotę: kilka kamieni w lesie potrafi otworzyć bardzo odległą warstwę historii.",
      level: "kręgi i kurhany"
    }),
    base({
      id: "kopiec-krakusa",
      name_pl: "Kopiec Krakusa",
      name_lat: "Kraków • legenda, grób i horyzont",
      category: "kopce-pradawne-pochowki",
      hook: "Góra, która może być grobem, legendą albo kalendarzem.",
      quiz_angle: "legenda Kraka, pradawny kopiec, widok na Kraków, interpretacje archeologiczne i symbol miasta",
      safety_note: "nie rozkopywać stoków ani nie niszczyć roślinności; traktować kopiec jako chroniony zabytek krajobrazu",
      region_pl: "Kraków, Małopolskie.",
      habitat_pl: "Mechanizm pamięci: ziemna forma bez jednoznacznej odpowiedzi łączy archeologię, legendę założycielską i obserwację krajobrazu.",
      occurrence_note: "Kopiec Krakusa jest osobliwy, bo im mniej pewnych odpowiedzi, tym silniej działa jako punkt pamięci i wyobraźni miasta.",
      level: "legendarny kopiec"
    }),
    base({
      id: "kopiec-wandy",
      name_pl: "Kopiec Wandy",
      name_lat: "Kraków-Nowa Huta • legenda w ziemnej formie",
      category: "kopce-pradawne-pochowki",
      hook: "Legenda zapisana w ziemnej formie.",
      quiz_angle: "legenda Wandy, kopiec w Mogile, krajobraz Nowej Huty i dawne formy upamiętniania",
      safety_note: "chronić stok i otoczenie kopca; nie traktować legendy jako pewnego opisu historycznego pochówku",
      region_pl: "Kraków-Mogiła, Małopolskie.",
      habitat_pl: "Mechanizm pamięci: kopiec działa jak znak w krajobrazie, którego sens budują opowieść, położenie i długie trwanie formy.",
      occurrence_note: "Kopiec Wandy jest osobliwy przez zderzenie dawnych legend z nowoczesnym otoczeniem Nowej Huty.",
      level: "legendarny kopiec"
    }),
    base({
      id: "stary-cmentarz-zydowski-wroclaw",
      name_pl: "Stary Cmentarz Żydowski we Wrocławiu",
      name_lat: "Wrocław • muzeum sztuki cmentarnej",
      category: "cmentarze-wielu-kultur",
      hook: "Nekropolia, która pozwala czytać miasto przez nagrobki.",
      quiz_angle: "Śląska historia Żydów, sztuka nagrobna, wielojęzyczne inskrypcje i muzealna ochrona cmentarza",
      safety_note: "oglądać jak zabytek i cmentarz zarazem: bez dotykania macew, siadania na nagrobkach i skracania drogi przez kwatery",
      region_pl: "Wrocław, Dolnośląskie.",
      habitat_pl: "Mechanizm pamięci: zachowane nagrobki pokazują języki, style artystyczne i społeczne role żydowskiej społeczności dawnego Wrocławia.",
      occurrence_note: "Wrocławski cmentarz uzupełnia kolekcję jako miejsce, gdzie edukacja muzealna spotyka się z realną tkanką nekropolii.",
      level: "rozszerzony kandydat",
      source_status: "expanded_candidate"
    })
  ];

  window.MEMENTO_MORI_APP_DATA = {
    subtitle: "30 miejsc pamięci i przemijania: ossuaria, cmentarze, nekropolie, miejsca Zagłady, martyrologii, wojenne cmentarze, kopce i pradawne pochówki.",
    long_intro: "Ten atlas pokazuje miejsca, gdzie architektura spotyka pamięć. Są tu kaplice czaszek, stare nekropolie, tatarskie mizary, cmentarze wojenne, miejsca Zagłady, kurhany i pomniki, które uczą, że historia to nie tylko budowanie, ale też pamiętanie.",
    safety_notice: "Ta kolekcja zawiera miejsca pamięci i trudnej historii. Czytaj i zwiedzaj z szacunkiem: bez sensacyjnego tonu, bez pozowania przy grobach i bez wchodzenia w miejsca zamknięte albo kruche.",
    categories,
    mementoMori
  };
})();
