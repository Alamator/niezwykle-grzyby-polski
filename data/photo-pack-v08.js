(() => {
  const appData = window.MUSHROOM_APP_DATA;
  if (!appData || !Array.isArray(appData.mushrooms) || !Array.isArray(appData.categories)) return;

  const commonsImage = (fileName) =>
    `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}?width=900`;

  const embeddedFromCommons =
    "osadzenie z Wikimedia Commons przez Special:Redirect; przeglądarka pobiera wersję skalowaną do ok. 900 px; bez lokalnego kopiowania pliku";

  const specialEffectsCategory = {
    id: "efekty-specjalne",
    label: "Efekty specjalne natury",
    short: "Efekty",
    icon: "⚡"
  };

  if (!appData.categories.some((category) => category.id === specialEffectsCategory.id)) {
    appData.categories = [...appData.categories, specialEffectsCategory];
  }

  const nextOrdinal = Math.max(...appData.mushrooms.map((mushroom) => mushroom.ordinal || 0)) + 1;
  const newMushrooms = [
    {
      id: "wrosniak-roznobarwny",
      name_pl: "Wrośniak różnobarwny",
      name_lat: "Trametes versicolor",
      category: specialEffectsCategory.id,
      hook: "Miniaturowe wachlarze układają się w koncentryczne pasy barw, jak naturalna grafika na martwym drewnie.",
      quiz_angle: "kolorowe strefy, cienkie skórzaste półeczki i wzrost w rozetach lub dachówkach na drewnie",
      safety_note: "niejadalny z powodu twardej konsystencji; materiał edukacyjny, nie kulinarny",
      image_status: "commons_verified",
      ordinal: nextOrdinal,
      category_label: specialEffectsCategory.label,
      category_short: specialEffectsCategory.short,
      category_icon: specialEffectsCategory.icon,
      tags: ["wielobarwne pasy", "huba", "martwe drewno"],
      level: "efekt wow",
      region_pl: "Cała Polska poza wyższymi partiami gór; bardzo pospolity.",
      habitat_pl: "Pnie i pniaki, głównie martwych drzew, często wkrótce po ścięciu lub obumarciu drzewa; w lasach, zaroślach, ogrodach i parkach.",
      occurrence_note: "Rośnie przez cały rok. Rzadszy jest tylko w nadrzecznych łęgach.",
      image: commonsImage("Trametes versicolor Turkey tail.jpg"),
      image_alt: "Wrośniak różnobarwny (Trametes versicolor), wachlarzowate owocniki z kolorowymi pasami",
      image_author: "Jobevo17",
      image_source: "https://commons.wikimedia.org/wiki/File:Trametes_versicolor_Turkey_tail.jpg",
      image_license: "CC BY-SA 4.0",
      license_url: "https://creativecommons.org/licenses/by-sa/4.0/",
      image_modifications: embeddedFromCommons
    },
    {
      id: "boczniaczek-pomaranczowozolty",
      name_pl: "Boczniaczek pomarańczowożółty",
      name_lat: "Phyllotopsis nidulans",
      category: specialEffectsCategory.id,
      hook: "Jaskrawo pomarańczowe półeczki wyrastają bokiem z drewna i wyglądają jak leśny neon.",
      quiz_angle: "intensywny pomarańczowożółty kolor, boczne przyrośnięcie i wzrost na martwym drewnie",
      safety_note: "nie traktować jako grzyba jadalnego; gatunek rzadki i edukacyjny",
      image_status: "commons_verified",
      ordinal: nextOrdinal + 1,
      category_label: specialEffectsCategory.label,
      category_short: specialEffectsCategory.short,
      category_icon: specialEffectsCategory.icon,
      tags: ["pomarańczowy", "rzadki", "drewno iglaste"],
      level: "okaz specjalny",
      region_pl: "Rzadki; na Czerwonej liście ma status V (narażony).",
      habitat_pl: "Stare, murszejące drzewa oraz obumarłe pnie i pniaki drzew liściastych i iglastych, w lasach liściastych i mieszanych.",
      occurrence_note: "Owocniki pojawiają się od kwietnia do października.",
      image: commonsImage("Phyllotopsis nidulans.JPG"),
      image_alt: "Boczniaczek pomarańczowożółty (Phyllotopsis nidulans), pomarańczowe owocniki przyrośnięte bokiem do drewna",
      image_author: "Archenzo",
      image_source: "https://commons.wikimedia.org/wiki/File:Phyllotopsis_nidulans.JPG",
      image_license: "CC BY-SA 3.0",
      license_url: "https://creativecommons.org/licenses/by-sa/3.0/",
      image_modifications: embeddedFromCommons
    },
    {
      id: "zaslonak-fioletowy",
      name_pl: "Zasłonak fioletowy",
      name_lat: "Cortinarius violaceus",
      category: specialEffectsCategory.id,
      hook: "Cały owocnik potrafi mieć głęboki, aksamitny fiolet z metalicznym połyskiem.",
      quiz_angle: "ciemnofioletowy kolor kapelusza i trzonu, aksamitna powierzchnia oraz zasnówka u młodych okazów",
      safety_note: "nie zachęcać do zbioru; zasłonaki są trudne w oznaczaniu i obejmują gatunki niebezpieczne",
      image_status: "commons_verified",
      ordinal: nextOrdinal + 2,
      category_label: specialEffectsCategory.label,
      category_short: specialEffectsCategory.short,
      category_icon: specialEffectsCategory.icon,
      tags: ["fiolet", "aksamitny", "rzadki"],
      level: "okaz specjalny",
      region_pl: "Rzadki; na Czerwonej liście ma status V (narażony).",
      habitat_pl: "Na ziemi w lasach liściastych i mieszanych, głównie pod bukami i brzozami; gleby kwaśne lub zasadowe.",
      occurrence_note: "Owocniki pojawiają się od sierpnia do października, pojedynczo lub w niewielkich grupach.",
      image: commonsImage("Cortinarius violaceus (32636120275).jpg"),
      image_alt: "Zasłonak fioletowy (Cortinarius violaceus), ciemnofioletowy owocnik w ściółce",
      image_author: "Dick Culbert",
      image_source: "https://commons.wikimedia.org/wiki/File:Cortinarius_violaceus_(32636120275).jpg",
      image_license: "CC BY 2.0",
      license_url: "https://creativecommons.org/licenses/by/2.0/",
      image_modifications: embeddedFromCommons
    },
    {
      id: "czernidlak-kolpakowaty",
      name_pl: "Czernidłak kołpakowaty",
      name_lat: "Coprinus comatus",
      category: specialEffectsCategory.id,
      hook: "Biały, łuskowaty kołpak dojrzewa szybko, czernieje i rozpływa się w atramentową maź.",
      quiz_angle: "wysoki biały kołpak, odstające łuski i czernienie oraz rozpływanie blaszek",
      safety_note: "strona nie służy do decyzji o jedzeniu; pokazujemy przemianę owocnika jako ciekawostkę",
      image_status: "commons_verified",
      ordinal: nextOrdinal + 3,
      category_label: specialEffectsCategory.label,
      category_short: specialEffectsCategory.short,
      category_icon: specialEffectsCategory.icon,
      tags: ["atrament", "rozpływanie", "biały kołpak"],
      level: "łatwy start",
      region_pl: "W Polsce bardzo pospolity, także blisko człowieka.",
      habitat_pl: "Trawniki, ogródki, brzegi rzek, śmietniska i inne siedliska ruderalne; także łąki, pastwiska i lasy.",
      occurrence_note: "Owocniki pojawiają się od kwietnia do listopada.",
      image: commonsImage("Coprinus comatus 2110.jpg"),
      image_alt: "Czernidłak kołpakowaty (Coprinus comatus), biały łuskowaty owocnik o wydłużonym kształcie",
      image_author: "Nikola Milic",
      image_source: "https://commons.wikimedia.org/wiki/File:Coprinus_comatus_2110.jpg",
      image_license: "CC BY-SA 4.0",
      license_url: "https://creativecommons.org/licenses/by-sa/4.0/",
      image_modifications: embeddedFromCommons
    },
    {
      id: "miekusz-rabarbarowy",
      name_pl: "Miękusz rabarbarowy",
      name_lat: "Hapalopilus rutilans",
      category: specialEffectsCategory.id,
      hook: "Niepozorna, cynamonowa huba ma laboratoryjny sekret: w kontakcie z zasadą szybko robi się fioletowa.",
      quiz_angle: "chemiczna reakcja KOH lub amoniaku: miąższ przebarwia się na fioletowo",
      safety_note: "silnie trujący; opis dotyczy wyłącznie ciekawostki przyrodniczej i nie zachęca do eksperymentów terenowych",
      toxic: true,
      image_status: "commons_verified",
      ordinal: nextOrdinal + 4,
      category_label: specialEffectsCategory.label,
      category_short: specialEffectsCategory.short,
      category_icon: specialEffectsCategory.icon,
      tags: ["reakcja chemiczna", "fiolet", "trujący"],
      level: "ciekawostka chemiczna",
      region_pl: "W Polsce dość rzadki, ale nie jest zagrożony.",
      habitat_pl: "Pnie, pniaki i gałęzie martwych drzew liściastych, szczególnie brzozy, grabu, leszczyny, jesionu, dębu i wierzby iwy; w lasach i parkach.",
      occurrence_note: "Owocniki są jednoroczne i rozwijają się od czerwca do października.",
      image: commonsImage("Hapalopilus rutilans 9134008.jpg"),
      image_alt: "Miękusz rabarbarowy (Hapalopilus rutilans), ochrowobrązowy owocnik hubowaty na drewnie",
      image_author: "Bill Sheehan",
      image_source: "https://commons.wikimedia.org/wiki/File:Hapalopilus_rutilans_9134008.jpg",
      image_license: "CC BY-SA 4.0",
      license_url: "https://creativecommons.org/licenses/by-sa/4.0/",
      image_modifications: embeddedFromCommons
    },
    {
      id: "krasnoborowik-ceglastopory",
      name_pl: "Krasnoborowik ceglastopory",
      name_lat: "Neoboletus luridiformis",
      category: specialEffectsCategory.id,
      hook: "Czerwone pory i żółty miąższ po uszkodzeniu szybko przechodzą w intensywny granat.",
      quiz_angle: "błyskawiczne sinienie po dotknięciu lub przecięciu oraz czerwone pory bez siateczki na trzonie",
      safety_note: "nie używać strony do oceny jadalności; podobne borowiki bywają trudne i niebezpieczne",
      image_status: "commons_verified",
      ordinal: nextOrdinal + 5,
      category_label: specialEffectsCategory.label,
      category_short: specialEffectsCategory.short,
      category_icon: specialEffectsCategory.icon,
      tags: ["sinienie", "czerwone pory", "borowik"],
      level: "efekt wow",
      region_pl: "W Polsce dość pospolity; w górach znacznie częstszy niż na niżu.",
      habitat_pl: "Lasy liściaste i iglaste, głównie pod jodłami, grabami, bukami, świerkami, dębami i lipami.",
      occurrence_note: "Owocniki pojawiają się od maja do późnej jesieni.",
      image: commonsImage("Neoboletus luridiformis (36327866804).jpg"),
      image_alt: "Krasnoborowik ceglastopory (Neoboletus luridiformis), borowik z czerwonawymi porami i masywnym trzonem",
      image_author: "Björn S...",
      image_source: "https://commons.wikimedia.org/wiki/File:Neoboletus_luridiformis_(36327866804).jpg",
      image_license: "CC BY-SA 2.0",
      license_url: "https://creativecommons.org/licenses/by-sa/2.0/",
      image_modifications: embeddedFromCommons
    },
    {
      id: "lejkowiec-dety",
      name_pl: "Lejkowiec dęty",
      name_lat: "Craterellus cornucopioides",
      category: specialEffectsCategory.id,
      hook: "Czarna, pusta trąbka wyrasta z dna lasu i potrafi całkowicie zniknąć optycznie wśród bukowych liści.",
      quiz_angle: "pusty, trąbkowaty owocnik, czarne wnętrze i szarawy zewnętrzny hymenofor",
      safety_note: "materiał edukacyjny; nie używać strony do potwierdzania zbioru",
      image_status: "commons_verified",
      ordinal: nextOrdinal + 6,
      category_label: specialEffectsCategory.label,
      category_short: specialEffectsCategory.short,
      category_icon: specialEffectsCategory.icon,
      tags: ["czarna trąbka", "bukowy las", "kamuflaż"],
      level: "okaz klimatyczny",
      region_pl: "W Polsce najczęściej na obszarach podgórskich.",
      habitat_pl: "Lasy liściaste i mieszane, zwykle pod bukami i dębami; rośnie kępami.",
      occurrence_note: "Owocniki pojawiają się od sierpnia do listopada.",
      image: commonsImage("Craterellus cornucopioides JPG1.jpg"),
      image_alt: "Lejkowiec dęty (Craterellus cornucopioides), czarne trąbkowate owocniki w ściółce",
      image_author: "Jean-Pol GRANDMONT",
      image_source: "https://commons.wikimedia.org/wiki/File:Craterellus_cornucopioides_JPG1.jpg",
      image_license: "CC BY 3.0 / GFDL",
      license_url: "https://creativecommons.org/licenses/by/3.0/",
      image_modifications: embeddedFromCommons
    },
    {
      id: "zagwiak-luskowaty",
      name_pl: "Żagwiak łuskowaty",
      name_lat: "Cerioporus squamosus",
      category: specialEffectsCategory.id,
      hook: "Ogromny, wachlarzowaty kapelusz ma ciemne łuski ułożone jak wzór na skórze gada.",
      quiz_angle: "bardzo duży wachlarzowaty owocnik, koncentryczne łuski i wzrost na pniach drzew liściastych",
      safety_note: "strona opisuje formę i siedlisko; nie jest poradnikiem zbioru",
      image_status: "commons_verified",
      ordinal: nextOrdinal + 7,
      category_label: specialEffectsCategory.label,
      category_short: specialEffectsCategory.short,
      category_icon: specialEffectsCategory.icon,
      tags: ["duży owocnik", "łuski", "drzewa liściaste"],
      level: "skala i forma",
      region_pl: "Cała Polska poza wyższymi partiami gór; pospolity.",
      habitat_pl: "Żywe i obumierające pnie drzew liściastych, najczęściej buków, klonów i jesionów; w lasach, parkach, ogrodach i przy drogach.",
      occurrence_note: "Młode owocniki pojawiają się w marcu i rosną do pierwszych mrozów; stare utrzymują się na pniach czasem do lutego.",
      image: commonsImage("Cerioporus squamosus (29543626074).jpg"),
      image_alt: "Żagwiak łuskowaty (Cerioporus squamosus), duży wachlarzowaty owocnik z ciemnymi łuskami",
      image_author: "Dr. Hans-Günter Wagner",
      image_source: "https://commons.wikimedia.org/wiki/File:Cerioporus_squamosus_(29543626074).jpg",
      image_license: "CC BY-SA 2.0",
      license_url: "https://creativecommons.org/licenses/by-sa/2.0/",
      image_modifications: embeddedFromCommons
    }
  ];

  const existingIds = new Set(appData.mushrooms.map((mushroom) => mushroom.id));
  const additions = newMushrooms.filter((mushroom) => !existingIds.has(mushroom.id));
  appData.mushrooms = [...appData.mushrooms, ...additions];

  appData.version = "0.8.0-special-effects";
  appData.last_updated = "2026-05-09";
  appData.special_effects_pack_8 = {
    title: "Zjawiskowe okazy i efekty specjalne natury",
    added_mushrooms: additions.length,
    note: "Paczka skupia się na gatunkach, które są efektowne wizualnie albo mają łatwą do opowiedzenia niezwykłą cechę: barwę, reakcję chemiczną, zmianę koloru, rozpad lub nietypową skalę.",
    sources: [
      "https://www.grzyby.pl/gatunki/Trametes_versicolor.htm",
      "https://www.grzyby.pl/gatunki/Phyllotopsis_nidulans.htm",
      "https://www.grzyby.pl/gatunki/Cortinarius_violaceus.htm",
      "https://www.grzyby.pl/gatunki/Coprinus_comatus.htm",
      "https://www.grzyby.pl/gatunki/Hapalopilus_nidulans.htm",
      "https://www.grzyby.pl/gatunki/Boletus_erythropus.htm",
      "https://www.grzyby.pl/gatunki/Craterellus_cornucopioides.htm",
      "https://www.grzyby.pl/gatunki/Polyporus_squamosus.htm"
    ]
  };
})();
