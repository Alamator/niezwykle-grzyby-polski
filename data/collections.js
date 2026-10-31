(() => {
  // Each entry: static metadata visible before data loads + scripts to lazy-fetch + builder that
  // pulls live data from the window globals defined by those scripts.
  // Within "przyroda-zywa" the order follows an evolutionary / complexity progression used in
  // Polish biology textbooks: Fungi → plants (herbaceous → woody) → invertebrates → vertebrates
  // (fish → amphibians and reptiles → birds → mammals).
  const COLLECTION_BUILDERS = [
    {
      id: "grzyby",
      group: "przyroda-zywa",
      title: "Grzyby",
      heading: "Niezwykłe grzyby Polski",
      subtitle: "60 grzybowych osobliwości: formy, kolory, zapachy i gatunki, które łatwo zapamiętać.",
      teaser: "formy, kolory i zapachy, które łatwo zapamiętać",
      count_label: "60 osobliwości",
      icon: "G",
      accent: "forest",
      search_placeholder: "np. sromotnik, koral, gwiazda...",
      source_note: "Zdjęcia dodajemy tylko z jasną licencją. Pierwsze paczki Wikimedia Commons mają autora, źródło i licencję.",
      scripts: [
        "/data/mushrooms.js",
        "/data/photo-pack-v03.js",
        "/data/photo-pack-v04.js",
        "/data/photo-pack-v05.js",
        "/data/photo-pack-v06.js",
        "/data/region-pack-v07.js",
        "/data/photo-pack-v08.js",
        "/data/i18n/grzyby.en.js",
        "/data/occurrence/grzyby.occurrence.js",
        "/data/facts/grzyby.facts.js"
      ],
      build: () => {
        const data = window.MUSHROOM_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.mushrooms };
      }
    },
    {
      id: "kwiaty",
      group: "przyroda-zywa",
      title: "Kwiaty",
      heading: "Osobliwe kwiaty i rośliny Polski",
      subtitle: "31 polskich, dziko rosnących lub zadomowionych osobliwości roślinnych: pułapki, zapachy, mimikra, pasożyty i relikty.",
      teaser: "pułapki, mimikra, pasożyty i relikty",
      count_label: "31 osobliwości",
      icon: "K",
      accent: "rose",
      search_placeholder: "np. aldrowanda, storczyk, dyptam...",
      source_note: "Opisy startują z listy roboczej o osobliwych roślinach Polski. Zdjęcia i atrybucje dodamy później z legalnych źródeł.",
      scripts: ["/data/flowers.js", "/data/flower-photo-pack-v01.js", "/data/i18n/kwiaty.en.js", "/data/facts/kwiaty.facts.js"],
      build: () => {
        const data = window.FLOWER_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.flowers };
      }
    },
    {
      id: "drzewa",
      group: "przyroda-zywa",
      title: "Drzewa",
      heading: "Osobliwe drzewa Polski",
      subtitle: "Te dendrologiczne osobliwości Polski to 30 historii zapachu, światła próchna, deformacji, rekordów wieku, pamięci miejsc, katastrof i parkowych egzotów.",
      teaser: "świecące próchno, rekordy wieku i drzewa z historią",
      count_label: "30 osobliwości",
      card_labels: { occurrence: "Gdzie rośnie", region: "Miejsce" },
      icon: "D",
      accent: "leaf",
      search_placeholder: "np. sosna, dąb, cis, platan...",
      source_note: "Opisy powstały na bazie listy roboczej o osobliwościach dendrologicznych Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/trees.js", "/data/tree-photo-pack-v01.js", "/data/i18n/drzewa.en.js", "/data/places/drzewa.places.js", "/data/facts/drzewa.facts.js"],
      build: () => {
        const data = window.TREE_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.trees };
      }
    },
    {
      id: "owady",
      group: "przyroda-zywa",
      title: "Owady",
      heading: "Osobliwe owady Polski",
      subtitle: "30 rzadkich, dziwnych i zapadających w pamięć owadów spotykanych w Polsce.",
      teaser: "rzadkie, dziwne i zapadające w pamięć",
      count_label: "30 osobliwości",
      icon: "O",
      accent: "amber",
      search_placeholder: "np. oleica, świetlik, jelonek...",
      source_note: "Opisy startują z listy roboczej. Zdjęcia i atrybucje będziemy uzupełniać stopniowo z legalnych źródeł.",
      scripts: ["/data/insects.js", "/data/i18n/owady.en.js", "/data/facts/owady.facts.js"],
      build: () => {
        const data = window.INSECT_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.insects };
      }
    },
    {
      id: "ryby",
      group: "przyroda-zywa",
      title: "Ryby",
      heading: "Osobliwe ryby polskich wód",
      subtitle: "30 rybich osobliwości polskich wód i ich rubieży: zapachy, dźwięki, przyssawki, wędrówki, kamuflaż i gatunki inwazyjne.",
      teaser: "dźwięki, przyssawki, wędrówki i kamuflaż",
      count_label: "30 osobliwości",
      icon: "R",
      accent: "aqua",
      search_placeholder: "np. stynka, tasza, różanka...",
      source_note: "Opisy powstały na bazie listy roboczej o osobliwych rybach Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją.",
      scripts: ["/data/fish.js", "/data/fish-photo-pack-v01.js", "/data/i18n/ryby.en.js", "/data/facts/ryby.facts.js"],
      build: () => {
        const data = window.FISH_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.fish };
      }
    },
    {
      id: "plazy-gady",
      group: "przyroda-zywa",
      title: "Płazy i Gady",
      heading: "Osobliwe płazy i gady Polski",
      subtitle: "30 herpetologiczne osobliwości Polski: błękitne gody żaby moczarowej, czosnkowa obrona grzebiuszki, odruch kumaka, grzebienie traszek, nadrzewne rzekotki, reliktowe węże, żółw błotny i inwazyjne żółwie ozdobne.",
      teaser: "błękitne gody żaby moczarowej i czosnkowa obrona grzebiuszki",
      count_label: "30 osobliwości",
      icon: "P+G",
      accent: "herp",
      search_placeholder: "np. żaba moczarowa, kumak, żółw, żmija...",
      source_note: "Opisy powstały na bazie wskazanego materiału o osobliwościach herpetofauny Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/amphibians-reptiles.js", "/data/amphibian-reptile-photo-pack-v01.js", "/data/i18n/plazy-gady.en.js", "/data/facts/plazy-gady.facts.js"],
      build: () => {
        const data = window.AMPHIBIAN_REPTILE_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.amphibiansReptiles };
      }
    },
    {
      id: "ptaki",
      group: "przyroda-zywa",
      title: "Ptaki",
      heading: "Osobliwe ptaki Polski",
      subtitle: "32 ptasie osobliwości Polski: rekordy skali, lotu, zmysłów, gniazd, strategii, mokradeł, gór i rzadkich gości.",
      teaser: "rekordy lotu, zmysłów i gniazd",
      count_label: "32 osobliwości",
      icon: "P",
      accent: "sky",
      search_placeholder: "np. dudek, jerzyk, pomurnik...",
      source_note: "Opisy powstały na bazie dwóch list roboczych o osobliwej awifaunie Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją.",
      scripts: ["/data/birds.js", "/data/bird-photo-pack-v01.js", "/data/i18n/ptaki.en.js", "/data/facts/ptaki.facts.js"],
      build: () => {
        const data = window.BIRD_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.birds };
      }
    },
    {
      id: "ssaki",
      group: "przyroda-zywa",
      title: "Ssaki",
      heading: "Osobliwe ssaki Polski",
      subtitle: "33 ssacze osobliwości Polski: ryjówki ze zjawiskiem Dehnela, jadowite rzęsorki, nietoperze z MRU, relikty stepów i Tatr, żubr, ekspansywne drapieżniki oraz ssaki Bałtyku.",
      teaser: "zjawisko Dehnela, jadowite rzęsorki i żubr",
      count_label: "33 osobliwości",
      icon: "S",
      accent: "fur",
      search_placeholder: "np. ryjówka, nocek, żubr, morświn...",
      source_note: "Opisy powstały na bazie wskazanego materiału o osobliwościach teriofauny Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/mammals.js", "/data/mammal-photo-pack-v01.js", "/data/i18n/ssaki.en.js", "/data/facts/ssaki.facts.js"],
      build: () => {
        const data = window.MAMMAL_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.mammals };
      }
    },
    {
      id: "mineraly",
      group: "ziemia-niebo",
      title: "Minerały",
      heading: "Osobliwe minerały Polski",
      subtitle: "33 mineralogiczne osobliwości Polski: endemity IMA, kruszce, sole, agaty, krzemień pasiasty, bursztyn i minerały z dawnych kopalń.",
      teaser: "endemity, agaty, krzemień pasiasty i kryształy soli",
      count_label: "33 osobliwości",
      card_labels: { region: "Miejsce", habitat: "Środowisko geologiczne" },
      icon: "M",
      accent: "stone",
      search_placeholder: "np. krzemień, siarka, halit, agat...",
      source_note: "Opisy powstały na bazie listy roboczej o osobliwościach mineralogicznych Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/minerals.js", "/data/mineral-photo-pack-v01.js", "/data/i18n/mineraly.en.js", "/data/facts/mineraly.facts.js"],
      build: () => {
        const data = window.MINERAL_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.minerals };
      }
    },
    {
      id: "formacje-skalne",
      group: "ziemia-niebo",
      title: "Formacje skalne",
      heading: "Osobliwe formacje skalne Polski",
      subtitle: "32 formacje skalne Polski: granitowe skałki Karkonoszy, wulkaniczne organy, piaskowcowe labirynty, jurajskie bramy, karpackie ostańce i głazy polodowcowe.",
      teaser: "granitowe skałki, wulkaniczne organy, skalne labirynty",
      count_label: "32 osobliwości",
      card_labels: { occurrence: "Położenie i geologia", region: "Miejsce", habitat: "Geologia" },
      icon: "F",
      accent: "cliff",
      search_placeholder: "np. Błędne Skały, Maczuga, Giewont...",
      source_note: "Opisy powstały na bazie listy roboczej o osobliwych formacjach skalnych Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/rock-formations.js", "/data/rock-formation-photo-pack-v01.js", "/data/i18n/formacje-skalne.en.js", "/data/places/formacje-skalne.places.js", "/data/facts/formacje-skalne.facts.js"],
      build: () => {
        const data = window.ROCK_FORMATION_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.formations };
      }
    },
    {
      id: "architektura-drewniana",
      group: "czlowiek-kultura",
      title: "Architektura drewniana",
      heading: "Architektoniczne osobliwości: drewno",
      subtitle: "29 drewnianych osobliwości Polski: Kościoły Pokoju, gotyckie świątynie zrębowe, cerkwie Karpat, styl zakopiański, tatarskie meczety i drewniane wsie.",
      teaser: "Kościoły Pokoju, cerkwie Karpat, styl zakopiański",
      count_label: "29 osobliwości",
      card_labels: { occurrence: "Miejsce i obiekt", region: "Miejsce", habitat: "Obiekt" },
      icon: "AD",
      accent: "wood",
      route: "/atlas/architektura-drewniana",
      search_placeholder: "np. Świdnica, Dębno, Kwiatoń, Wang, Kruszyniany...",
      source_note: "Opisy powstały na bazie wskazanego materiału o drewnianej architekturze Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; kadry reprezentatywne są oznaczone uczciwie.",
      scripts: ["/data/wooden-architecture.js", "/data/wooden-architecture-photo-pack-v01.js", "/data/i18n/architektura-drewniana.en.js", "/data/places/architektura-drewniana.places.js", "/data/facts/architektura-drewniana.facts.js"],
      build: () => {
        const data = window.WOODEN_ARCHITECTURE_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.woodenArchitecture };
      }
    },
    {
      id: "podziemia",
      group: "czlowiek-kultura",
      title: "Podziemia",
      heading: "Podziemia Atlasu Osobliwości",
      subtitle: "30 podziemnych osobliwości Polski: kopalnie soli, krzemienia i srebra, miejskie piwnice, sztolnie, schrony oraz tajemnice Gór Sowich.",
      teaser: "kopalnie soli i srebra, sztolnie, Góry Sowie",
      count_label: "30 osobliwości",
      card_labels: { occurrence: "Miejsce i obiekt", region: "Miejsce", habitat: "Obiekt" },
      icon: "P",
      accent: "subterra",
      route: "/atlas/podziemia",
      search_placeholder: "np. Wieliczka, Riese, MRU, Sandomierz, Chełm...",
      source_note: "Opisy powstały na bazie wskazanego materiału o podziemnych osobliwościach Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; schematy i kadry reprezentatywne są oznaczone uczciwie.",
      scripts: ["/data/underground.js", "/data/underground-photo-pack-v01.js", "/data/i18n/podziemia.en.js", "/data/places/podziemia.places.js", "/data/facts/podziemia.facts.js"],
      build: () => {
        const data = window.UNDERGROUND_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.underground };
      }
    },
    {
      id: "cuda-inzynierii",
      group: "czlowiek-kultura",
      title: "Cuda Inżynierii",
      heading: "Techniczne osobliwości Polski",
      subtitle: "33 techniczne osobliwości Polski: kanały, śluzy, tężnie, radiostacje, hale, zapory, mosty, tunele, koleje i przemysłowe miasta.",
      teaser: "kanały, tężnie, zapory i drewniana wieża radiostacji",
      count_label: "33 osobliwości",
      card_labels: { occurrence: "Miejsce i mechanizm", region: "Miejsce", habitat: "Mechanizm" },
      icon: "I",
      accent: "machina",
      route: "/atlas/cuda-inzynierii",
      search_placeholder: "np. Kanał Elbląski, tężnie, Radiostacja Gliwicka, Solina, Gdynia...",
      source_note: "Opisy powstały na bazie wskazanego materiału o techniczno-architektonicznych osobliwościach Polski. Źródła i dane liczbowe należy weryfikować przed publikacją finalnych kart.",
      scripts: ["/data/engineering-wonders.js", "/data/engineering-wonders-photo-pack-v01.js", "/data/i18n/cuda-inzynierii.en.js", "/data/places/cuda-inzynierii.places.js", "/data/facts/cuda-inzynierii.facts.js"],
      build: () => {
        const data = window.ENGINEERING_WONDER_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.engineeringWonders };
      }
    },
    {
      id: "twierdze-ruiny",
      group: "czlowiek-kultura",
      title: "Twierdze i Ruiny",
      heading: "Twierdze, ruiny i zapomniane miejsca",
      subtitle: "33 osobliwości twierdz i ruin Polski: miasta idealne, zamki-legendy, twierdze, opuszczone pałace i konstrukcje, które zostały po ambicji.",
      teaser: "miasto idealne, zamki-legendy, pałace-widma",
      count_label: "33 osobliwości",
      card_labels: { occurrence: "Miejsce i mechanizm", region: "Miejsce", habitat: "Mechanizm" },
      icon: "T",
      accent: "civitas",
      route: "/atlas/twierdze-ruiny",
      search_placeholder: "np. Zamość, Krzyżtopór, Malbork, Modlin, Stańczyki...",
      source_note: "Opisy powstały na bazie wskazanego materiału o zamkach, twierdzach, ruinach i zapomnianych konstrukcjach Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; kadry reprezentatywne są oznaczone uczciwie.",
      scripts: ["/data/fortresses-ruins.js", "/data/fortresses-ruins-photo-pack-v01.js", "/data/i18n/twierdze-ruiny.en.js", "/data/places/twierdze-ruiny.places.js", "/data/facts/twierdze-ruiny.facts.js"],
      build: () => {
        const data = window.FORTRESS_RUIN_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.fortressesRuins };
      }
    },
    {
      id: "memento-mori",
      group: "czlowiek-kultura",
      title: "Memento Mori",
      heading: "Memento Mori: miejsca pamięci i przemijania",
      subtitle: "30 miejsc pamięci i przemijania: ossuaria, cmentarze, nekropolie, miejsca Zagłady, martyrologii, wojenne cmentarze, kopce i pradawne pochówki.",
      teaser: "kaplica czaszek, nekropolie, kopce i miejsca pamięci",
      count_label: "30 osobliwości",
      card_labels: { occurrence: "Miejsce i pamięć", region: "Miejsce", habitat: "Mechanizm pamięci" },
      icon: "M",
      accent: "memento",
      route: "/atlas/memento-mori",
      search_placeholder: "np. Czermna, Powązki, mizar, Treblinka, kopiec...",
      source_note: "Opisy powstały na bazie wskazanego materiału o miejscach pamięci i przemijania w Polsce. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; przy miejscach trudnej historii zachowujemy spokojny, edukacyjny ton.",
      scripts: ["/data/memento-mori.js", "/data/memento-mori-photo-pack-v01.js", "/data/i18n/memento-mori.en.js", "/data/places/memento-mori.places.js", "/data/facts/memento-mori.facts.js"],
      build: () => {
        const data = window.MEMENTO_MORI_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.mementoMori };
      }
    },
    {
      id: "skamienialosci",
      group: "ziemia-niebo",
      title: "Skamieniałości",
      heading: "Osobliwe skamieniałości Polski",
      subtitle: "32 paleontologiczne osobliwości Polski: trylobity, rafy dewońskie, Zachełmie, triasowe olbrzymy, tropy dinozaurów, jurajskie morza, bursztyn i megafauna epoki lodowcowej.",
      teaser: "trylobity, rafy dewońskie, tropy dinozaurów",
      count_label: "32 osobliwości",
      card_labels: { region: "Stanowiska", habitat: "Dawne środowisko" },
      icon: "S",
      accent: "fossil",
      search_placeholder: "np. Zachełmie, Smok, amonity, bursztyn...",
      source_note: "Opisy powstały na bazie listy roboczej o polskich skamieniałościach i wskazanego zakresu tropów oraz amonitów. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/fossils.js", "/data/fossil-photo-pack-v01.js", "/data/i18n/skamienialosci.en.js", "/data/places/skamienialosci.places.js", "/data/facts/skamienialosci.facts.js"],
      build: () => {
        const data = window.FOSSIL_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.fossils };
      }
    },
    {
      id: "atmosfera-astronomia",
      group: "ziemia-niebo",
      title: "Atmosfera i astronomia",
      heading: "Osobliwości atmosferyczne i astronomiczne Polski",
      subtitle: "33 atmosferyczne i astronomiczne osobliwości Polski: widmo Brockenu, duszki, białe noce, obłoki srebrzyste, ciemne niebo, zorze, Bałtyk jako fabryka śniegu, dalekie obserwacje, mrozowiska i pył saharyjski.",
      teaser: "widmo Brockenu, duszki, zorze i białe noce",
      count_label: "33 osobliwości",
      card_labels: { occurrence: "Gdzie i kiedy zobaczyć", region: "Gdzie", habitat: "Warunki" },
      icon: "N",
      accent: "skyfire",
      search_placeholder: "np. Brockenu, zorza, Bałtyk, mrozowisko...",
      source_note: "Opisy powstały na bazie listy roboczej o polskich zjawiskach atmosferycznych i astronomicznych. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/atmosphere-astronomy.js", "/data/atmosphere-astronomy-photo-pack-v01.js", "/data/i18n/atmosfera-astronomia.en.js", "/data/places/atmosfera-astronomia.places.js", "/data/facts/atmosfera-astronomia.facts.js"],
      build: () => {
        const data = window.ATMOSPHERE_ASTRONOMY_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.phenomena };
      }
    },
    {
      id: "rekordy-krajobrazu",
      group: "ziemia-niebo",
      title: "Rekordy krajobrazu",
      heading: "Rekordy i osobliwości krajobrazowe Polski",
      subtitle: "56 krajobrazowych osobliwości Polski: polska pustynia, ruchome wydmy, krzywy las, klify, bagna, kolorowe jeziora, przełomy, dawne wulkany, mikroklimaty i miejsca jak z innej mapy.",
      teaser: "polska pustynia, ruchome wydmy, krzywy las",
      count_label: "56 osobliwości",
      card_labels: { occurrence: "Miejsce i mechanizm", region: "Miejsce", habitat: "Mechanizm" },
      icon: "RK",
      accent: "landscape",
      route: "/atlas/rekordy-krajobrazu",
      search_placeholder: "np. pustynia, wydmy, Hańcza, mofeta, Rysy...",
      source_note: "Opisy powstały na bazie wskazanego materiału o rekordach i osobliwościach krajobrazowych Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; kadry kontekstowe są oznaczone uczciwie.",
      scripts: ["/data/landscape-records.js", "/data/landscape-records-photo-pack-v01.js", "/data/i18n/rekordy-krajobrazu.en.js", "/data/places/rekordy-krajobrazu.places.js", "/data/facts/rekordy-krajobrazu.facts.js"],
      build: () => {
        const data = window.LANDSCAPE_RECORD_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.landscapeRecords };
      }
    },
    {
      id: "rekordy-atmosferyczne",
      group: "ziemia-niebo",
      title: "Rekordy atmosferyczne",
      heading: "Rekordy atmosferyczne Polski",
      subtitle: "17 pogodowych osobliwości Polski: upał w Słubicach, mróz w Żywcu, ulewy w Tatrach i Sudetach, wiatr na Śnieżce, halny, tornada, derecho, grad i mgła.",
      teaser: "upał, ulewy, halny, tornada i mgła na Śnieżce",
      count_label: "17 osobliwości",
      card_labels: { occurrence: "Gdzie i kiedy", region: "Gdzie", habitat: "Kiedy" },
      icon: "RA",
      accent: "weather",
      route: "/atlas/rekordy-atmosferyczne",
      search_placeholder: "np. Słubice, halny, tornado, grad...",
      source_note: "Opisy powstały na bazie wskazanego materiału o rekordach pogody w Polsce. Wartości sprawdzono w źródłach (IMGW-PIB, GUS, prace naukowe, PAP, Wikipedia); sporne i niepotwierdzone pominięto. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; kadry kontekstowe są oznaczone uczciwie.",
      scripts: ["/data/atmospheric-records.js", "/data/atmospheric-records-photo-pack-v01.js", "/data/i18n/rekordy-atmosferyczne.en.js", "/data/places/rekordy-atmosferyczne.places.js", "/data/occurrence/rekordy-atmosferyczne.occurrence.js", "/data/facts/rekordy-atmosferyczne.facts.js"],
      build: () => {
        const data = window.ATMOSPHERIC_RECORD_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.atmosphericRecords };
      }
    }
  ];

  const views = [
    { id: "atlas", label: "Atlas" },
    { id: "learn", label: "Nauka" },
    { id: "quiz", label: "Quiz" },
    { id: "sources", label: "Źródła" }
  ];

  // Group manifest — labels and descriptions are the Polish fallback. i18n.js can override per language.
  const groups = [
    {
      id: "przyroda-zywa",
      label: "Przyroda żywa",
      description: "Fauna i flora Polski — od bioluminescencji po reliktowe gatunki."
    },
    {
      id: "ziemia-niebo",
      label: "Ziemia i niebo",
      description: "Geologia, minerały, formacje skalne, atmosfera i krajobraz."
    },
    {
      id: "czlowiek-kultura",
      label: "Człowiek i kultura",
      description: "Architektura, technika i pamięć — ślady ludzi w polskim krajobrazie."
    }
  ];

  // Placeholders rendered on the home grid before any collection is opened. items[] stays empty
  // until loadCollection() pulls the matching data files.
  const collections = COLLECTION_BUILDERS.map((builder) => ({
    id: builder.id,
    group: builder.group,
    title: builder.title,
    heading: builder.heading,
    subtitle: builder.subtitle,
    teaser: builder.teaser,
    count_label: builder.count_label,
    icon: builder.icon,
    accent: builder.accent,
    search_placeholder: builder.search_placeholder,
    source_note: builder.source_note,
    card_labels: builder.card_labels,
    route: builder.route,
    // False while a collection has no facts file in its scripts yet (FACTS_PENDING in scripts/validate-facts.mjs):
    // the fact of the day passes it by.
    has_facts: builder.scripts.some((src) => src.startsWith("/data/facts/")),
    safety_notice: "",
    categories: [],
    items: [],
    facts: {},
    facts_checked: "",
    _builder: builder,
    _loaded: false,
    _loadPromise: null
  }));

  // Editorial review of 28.10.2026: what is not confirmed well enough stays out of the atlas. The withdrawn
  // cards were removed from the collection data, with their facts (skip_cards in
  // docs/content/zmiany-dla-generatora-2026-10.json). A fact that needs a correction can be hidden here
  // (facts: { id: reason }) until data/facts/*.facts.js is fixed. Since 31.10.2026 the facts are corrected
  // in those files directly, and every hidden fact of 28-31.10.2026 has been corrected or removed there.
  const WITHDRAWN = {
    cards: {
      "ryby/murowy-swiecik": "Mauryk: brak potwierdzonej obserwacji w Bałtyku (C064).",
      "ryby/lis-morski": "Kosogon: brak potwierdzonej obserwacji w Bałtyku (C065).",
      "formacje-skalne/zezow-czarne-dzialy": "Zęzów i Czarne Działy: nie wiadomo, o które miejsce chodzi; potwierdzona jest tylko wysokość Zęzowa (C111).",
      "skamienialosci/tholodus-schmidi": "Tholodus schmidi: brak publikacji o znaleziskach z Polski (C127).",
      "architektura-drewniana/chata-na-wysokosci": "Chata na Wysokości: prywatna kwatera, historia tylko według właścicieli, bez ciekawostek i bez zdjęcia obiektu (C144)."
    },
    facts: {},
    numbers: []
  };
  const HIDDEN_FACTS = new Set([...Object.keys(WITHDRAWN.facts), ...WITHDRAWN.numbers]);

  // Verified fun facts live in data/facts/<collection>.facts.js (corrected there; docs/content/README-weryfikacja.md) and set
  // window.ATLAS_FACTS[<collection>] = { checked, items: { <card id>: { facts, notes } } }.
  // Only the facts of cards present in the collection are attached, without the hidden ones.
  function attachFacts(collection) {
    const facts = window.ATLAS_FACTS?.[collection.id];
    const cardIds = new Set((collection.items || []).map((item) => item.id));
    collection.facts = Object.fromEntries(Object.entries(facts?.items || {})
      .filter(([cardId]) => cardIds.has(cardId))
      .map(([cardId, entry]) => [cardId, { ...entry, facts: (entry.facts || []).filter((fact) => !HIDDEN_FACTS.has(fact.id)) }]));
    collection.facts_checked = facts?.checked || "";
  }

  // Map points live in data/places/<collection>.places.js, loaded with the collection, and set
  // window.ATLAS_PLACES[<collection>] = { checked, items: { <card id>: { lat, lng, wikidata } } }.
  // Species collections have no such file: the atlas does not show where species live.
  function attachPlaces(collection) {
    const places = window.ATLAS_PLACES?.[collection.id];
    const cardIds = new Set((collection.items || []).map((item) => item.id));
    collection.places = Object.fromEntries(Object.entries(places?.items || {})
      .filter(([cardId]) => cardIds.has(cardId)));
    collection.places_checked = places?.checked || "";
  }

  // Sources of the "Występowanie w Polsce" box (region, habitat and the note below them) live in
  // data/occurrence/<collection>.occurrence.js, loaded with the collection, and set
  // window.ATLAS_OCCURRENCE_SOURCES[<collection>] = { checked, items: { <card id>: [{ url, label }] } }.
  function attachOccurrenceSources(collection) {
    const sources = window.ATLAS_OCCURRENCE_SOURCES?.[collection.id];
    const cardIds = new Set((collection.items || []).map((item) => item.id));
    collection.occurrence_sources = Object.fromEntries(Object.entries(sources?.items || {})
      .filter(([cardId]) => cardIds.has(cardId)));
    collection.occurrence_checked = sources?.checked || "";
  }

  const scriptCache = new Map();

  function loadScriptOnce(src) {
    if (scriptCache.has(src)) return scriptCache.get(src);
    const promise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-lazy-src="${src}"]`);
      if (existing) { resolve(); return; }
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.dataset.lazySrc = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Nie udało się załadować ${src}`));
      document.head.appendChild(script);
    });
    scriptCache.set(src, promise);
    return promise;
  }

  async function loadCollection(id) {
    const collection = collections.find((c) => c.id === id);
    if (!collection) return null;
    if (collection._loaded) return collection;
    if (collection._loadPromise) return collection._loadPromise;
    collection._loadPromise = (async () => {
      for (const src of collection._builder.scripts) {
        await loadScriptOnce(src);
      }
      const built = collection._builder.build();
      if (built) {
        Object.assign(collection, built);
        attachFacts(collection);
        attachPlaces(collection);
        attachOccurrenceSources(collection);
        collection._loaded = true;
      }
      return collection;
    })();
    try {
      return await collection._loadPromise;
    } catch (err) {
      collection._loadPromise = null;
      throw err;
    }
  }

  // Best-effort eager build for any collection whose data globals are already on window.
  // In the browser at first paint these globals don't exist (data scripts are lazy-loaded on
  // collection select), so build() returns null and collections stay placeholders. In a test
  // or SSR environment that preloaded the data scripts, this populates collections immediately.
  for (const collection of collections) {
    const built = collection._builder.build();
    if (built) {
      Object.assign(collection, built);
      attachFacts(collection);
      attachPlaces(collection);
      attachOccurrenceSources(collection);
      collection._loaded = true;
    }
  }

  window.ATLAS_APP_DATA = {
    project: "Atlas Osobliwości Polski",
    subtitle: "Jedno miejsce na niezwykłe grzyby, kwiaty, drzewa, owady, ryby, płazy i gady, ptaki, ssaki, minerały, formacje skalne, architekturę drewnianą, podziemia, cuda inżynierii, twierdze i ruiny, Memento Mori, skamieniałości, niebo i rekordy krajobrazu.",
    version: "0.4.0-evolutionary-order",
    views,
    groups,
    collections,
    withdrawn: WITHDRAWN,
    loadCollection
  };
})();
