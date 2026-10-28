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
      subtitle: "31 polskie, dziko rosnące lub zadomowione osobliwości roślinne: pułapki, zapachy, mimikra, pasożyty i relikty.",
      count_label: "31 osobliwości",
      icon: "K",
      accent: "rose",
      search_placeholder: "np. aldrowanda, storczyk, dyptam...",
      source_note: "Opisy startują z listy roboczej o osobliwych roślinach Polski. Zdjęcia i atrybucje dodamy później z legalnych źródeł.",
      scripts: ["/data/flowers.js", "/data/flower-photo-pack-v01.js", "/data/facts/kwiaty.facts.js"],
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
      count_label: "30 osobliwości",
      icon: "D",
      accent: "leaf",
      search_placeholder: "np. sosna, dąb, cis, platan...",
      source_note: "Opisy powstały na bazie listy roboczej o osobliwościach dendrologicznych Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/trees.js", "/data/tree-photo-pack-v01.js", "/data/facts/drzewa.facts.js"],
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
      count_label: "30 osobliwości",
      icon: "O",
      accent: "amber",
      search_placeholder: "np. oleica, świetlik, jelonek...",
      source_note: "Opisy startują z listy roboczej. Zdjęcia i atrybucje będziemy uzupełniać stopniowo z legalnych źródeł.",
      scripts: ["/data/insects.js", "/data/facts/owady.facts.js"],
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
      count_label: "30 osobliwości",
      icon: "R",
      accent: "aqua",
      search_placeholder: "np. stynka, tasza, różanka...",
      source_note: "Opisy powstały na bazie listy roboczej o osobliwych rybach Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją.",
      scripts: ["/data/fish.js", "/data/fish-photo-pack-v01.js", "/data/facts/ryby.facts.js"],
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
      count_label: "30 osobliwości",
      icon: "P+G",
      accent: "herp",
      search_placeholder: "np. żaba moczarowa, kumak, żółw, żmija...",
      source_note: "Opisy powstały na bazie wskazanego materiału o osobliwościach herpetofauny Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/amphibians-reptiles.js", "/data/amphibian-reptile-photo-pack-v01.js", "/data/facts/plazy-gady.facts.js"],
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
      count_label: "32 osobliwości",
      icon: "P",
      accent: "sky",
      search_placeholder: "np. dudek, jerzyk, pomurnik...",
      source_note: "Opisy powstały na bazie dwóch list roboczych o osobliwej awifaunie Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją.",
      scripts: ["/data/birds.js", "/data/bird-photo-pack-v01.js", "/data/facts/ptaki.facts.js"],
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
      count_label: "33 osobliwości",
      icon: "S",
      accent: "fur",
      search_placeholder: "np. ryjówka, nocek, żubr, morświn...",
      source_note: "Opisy powstały na bazie wskazanego materiału o osobliwościach teriofauny Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/mammals.js", "/data/mammal-photo-pack-v01.js", "/data/facts/ssaki.facts.js"],
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
      count_label: "33 osobliwości",
      icon: "M",
      accent: "stone",
      search_placeholder: "np. krzemień, siarka, halit, agat...",
      source_note: "Opisy powstały na bazie listy roboczej o osobliwościach mineralogicznych Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/minerals.js", "/data/mineral-photo-pack-v01.js", "/data/facts/mineraly.facts.js"],
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
      count_label: "32 osobliwości",
      icon: "F",
      accent: "cliff",
      search_placeholder: "np. Błędne Skały, Maczuga, Giewont...",
      source_note: "Opisy powstały na bazie listy roboczej o osobliwych formacjach skalnych Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/rock-formations.js", "/data/rock-formation-photo-pack-v01.js", "/data/facts/formacje-skalne.facts.js"],
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
      count_label: "29 osobliwości",
      icon: "AD",
      accent: "wood",
      route: "/atlas/architektura-drewniana",
      search_placeholder: "np. Świdnica, Dębno, Kwiatoń, Wang, Kruszyniany...",
      source_note: "Opisy powstały na bazie wskazanego materiału o drewnianej architekturze Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; kadry reprezentatywne są oznaczone uczciwie.",
      scripts: ["/data/wooden-architecture.js", "/data/wooden-architecture-photo-pack-v01.js", "/data/facts/architektura-drewniana.facts.js"],
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
      count_label: "30 osobliwości",
      icon: "P",
      accent: "subterra",
      route: "/atlas/podziemia",
      search_placeholder: "np. Wieliczka, Riese, MRU, Sandomierz, Chełm...",
      source_note: "Opisy powstały na bazie wskazanego materiału o podziemnych osobliwościach Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; schematy i kadry reprezentatywne są oznaczone uczciwie.",
      scripts: ["/data/underground.js", "/data/underground-photo-pack-v01.js", "/data/facts/podziemia.facts.js"],
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
      count_label: "33 osobliwości",
      icon: "I",
      accent: "machina",
      route: "/atlas/cuda-inzynierii",
      search_placeholder: "np. Kanał Elbląski, tężnie, Radiostacja Gliwicka, Solina, Gdynia...",
      source_note: "Opisy powstały na bazie wskazanego materiału o techniczno-architektonicznych osobliwościach Polski. Źródła i dane liczbowe należy weryfikować przed publikacją finalnych kart.",
      scripts: ["/data/engineering-wonders.js", "/data/engineering-wonders-photo-pack-v01.js", "/data/facts/cuda-inzynierii.facts.js"],
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
      count_label: "33 osobliwości",
      icon: "T",
      accent: "civitas",
      route: "/atlas/twierdze-ruiny",
      search_placeholder: "np. Zamość, Krzyżtopór, Malbork, Modlin, Stańczyki...",
      source_note: "Opisy powstały na bazie wskazanego materiału o zamkach, twierdzach, ruinach i zapomnianych konstrukcjach Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; kadry reprezentatywne są oznaczone uczciwie.",
      scripts: ["/data/fortresses-ruins.js", "/data/fortresses-ruins-photo-pack-v01.js", "/data/facts/twierdze-ruiny.facts.js"],
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
      count_label: "30 osobliwości",
      icon: "M",
      accent: "memento",
      route: "/atlas/memento-mori",
      search_placeholder: "np. Czermna, Powązki, mizar, Treblinka, kopiec...",
      source_note: "Opisy powstały na bazie wskazanego materiału o miejscach pamięci i przemijania w Polsce. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; przy miejscach trudnej historii zachowujemy spokojny, edukacyjny ton.",
      scripts: ["/data/memento-mori.js", "/data/memento-mori-photo-pack-v01.js", "/data/facts/memento-mori.facts.js"],
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
      count_label: "32 osobliwości",
      icon: "S",
      accent: "fossil",
      search_placeholder: "np. Zachełmie, Smok, amonity, bursztyn...",
      source_note: "Opisy powstały na bazie listy roboczej o polskich skamieniałościach i wskazanego zakresu tropów oraz amonitów. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/fossils.js", "/data/fossil-photo-pack-v01.js", "/data/facts/skamienialosci.facts.js"],
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
      count_label: "33 osobliwości",
      icon: "N",
      accent: "skyfire",
      search_placeholder: "np. Brockenu, zorza, Bałtyk, mrozowisko...",
      source_note: "Opisy powstały na bazie listy roboczej o polskich zjawiskach atmosferycznych i astronomicznych. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/atmosphere-astronomy.js", "/data/atmosphere-astronomy-photo-pack-v01.js", "/data/facts/atmosfera-astronomia.facts.js"],
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
      count_label: "56 osobliwości",
      icon: "RK",
      accent: "landscape",
      route: "/atlas/rekordy-krajobrazu",
      search_placeholder: "np. pustynia, wydmy, Hańcza, mofeta, Rysy...",
      source_note: "Opisy powstały na bazie wskazanego materiału o rekordach i osobliwościach krajobrazowych Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; kadry kontekstowe są oznaczone uczciwie.",
      scripts: ["/data/landscape-records.js", "/data/landscape-records-photo-pack-v01.js", "/data/facts/rekordy-krajobrazu.facts.js"],
      build: () => {
        const data = window.LANDSCAPE_RECORD_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.landscapeRecords };
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
    count_label: builder.count_label,
    icon: builder.icon,
    accent: builder.accent,
    search_placeholder: builder.search_placeholder,
    source_note: builder.source_note,
    route: builder.route,
    safety_notice: "",
    categories: [],
    items: [],
    facts: {},
    facts_checked: "",
    _builder: builder,
    _loaded: false,
    _loadPromise: null
  }));

  // Editorial review of 28.10.2026: what is not confirmed well enough stays out of the atlas.
  // The withdrawn cards were removed from the collection data. data/facts/*.facts.js is generated
  // outside the repo, so withdrawn facts are filtered here; the reasons are kept for the next run.
  const WITHDRAWN = {
    cards: {
      "ryby/murowy-swiecik": "Mauryk: brak potwierdzonej obserwacji w Bałtyku (C064).",
      "ryby/lis-morski": "Kosogon: brak potwierdzonej obserwacji w Bałtyku (C065).",
      "formacje-skalne/zezow-czarne-dzialy": "Zęzów i Czarne Działy: nie wiadomo, o które miejsce chodzi; potwierdzona jest tylko wysokość Zęzowa (C111).",
      "skamienialosci/tholodus-schmidi": "Tholodus schmidi: brak publikacji o znaleziskach z Polski (C127).",
      "architektura-drewniana/chata-na-wysokosci": "Chata na Wysokości: prywatna kwatera, historia tylko według właścicieli, bez ciekawostek i bez zdjęcia obiektu (C144)."
    },
    facts: {
      F0032: "Piestrzenica: czas obróbki termicznej to wskazówka kulinarna.",
      F0037: "Smardz: „dokładna obróbka termiczna zmniejsza ryzyko” to porada kulinarna.",
      F0073: "Galaretek kolczasty: „odradza się jeść na surowo” sugeruje jedzenie po obróbce.",
      F0143: "Żółciak: „surowe lub niedogotowane” sugeruje jadalność po ugotowaniu.",
      F0170: "Opieńka: „surowa lub niedogotowana” sugeruje jadalność po ugotowaniu.",
      F0985: "Ctenochasma: rodzaj niepotwierdzony w Owadowie-Brzezinkach, fakt nie dotyczy karty (C121).",
      F1073: "Siedlce: „najniższa oficjalna temperatura” przeczy F1070 (oficjalny rekord IMGW: −40,6 °C, Żywiec 1929)."
    },
    // Numbers and dates checked by search in independent sources (10.2026): in these facts a source
    // contradicts a number or date, or none confirms it. The reasons and the corrected wording for the
    // generator are in docs/content/zmiany-dla-generatora-2026-10.json.
    numbers: [
      "F0001", "F0002", "F0006", "F0007", "F0009", "F0010", "F0020", "F0025", "F0028", "F0029",
      "F0033", "F0036", "F0039", "F0040", "F0042", "F0043", "F0044", "F0046", "F0047", "F0048",
      "F0050", "F0051", "F0075", "F0079", "F0082", "F0083", "F0084", "F0086", "F0087", "F0088",
      "F0091", "F0096", "F0097", "F0103", "F0205", "F0207", "F0214", "F0220", "F0232", "F0239",
      "F0246", "F0254", "F0258", "F0261", "F0263", "F0271", "F0295", "F0296", "F0298", "F0300",
      "F0301", "F0302", "F0303", "F0304", "F0306", "F0307", "F0311", "F0312", "F0313", "F0315",
      "F0321", "F0324", "F0326", "F0327", "F0328", "F0330", "F0331", "F0336", "F0338", "F0342",
      "F0344", "F0345", "F0346", "F0350", "F0352", "F0353", "F0371", "F0380", "F0388", "F0397",
      "F0401", "F0410", "F0422", "F0428", "F0432", "F0434", "F0437", "F0451", "F0454", "F0465",
      "F0466", "F0472", "F0474", "F0476", "F0485", "F0487", "F0490", "F0492", "F0494", "F0504",
      "F0506", "F0509", "F0517", "F0530", "F0534", "F0537", "F0547", "F0555", "F0557", "F0558",
      "F0565", "F0568", "F0569", "F0571", "F0591", "F0601", "F0606", "F0612", "F0623", "F0634",
      "F0639", "F0651", "F0653", "F0659", "F0681", "F0686", "F0689", "F0692", "F0698", "F0702",
      "F0704", "F0713", "F0720", "F0732", "F0742", "F0753", "F0754", "F0757", "F0760", "F0765",
      "F0772", "F0802", "F0806", "F0807", "F0823", "F0826", "F0827", "F0845", "F0847", "F0849",
      "F0854", "F0855", "F0866", "F0870", "F0872", "F0875", "F0877", "F0879", "F0881", "F0882",
      "F0887", "F0888", "F0889", "F0890", "F0891", "F0893", "F0899", "F0900", "F0901", "F0902",
      "F0904", "F0908", "F0909", "F0910", "F0917", "F0919", "F0956", "F0960", "F0971", "F0974",
      "F0992", "F1006", "F1010", "F1016", "F1041", "F1049", "F1053", "F1057", "F1063", "F1065",
      "F1067", "F1071", "F1072", "F1074", "F1080", "F1083", "F1084", "F1086", "F1092", "F1096",
      "F1103", "F1107", "F1108", "F1112", "F1195", "F1203", "F1205", "F1206", "F1210", "F1211",
      "F1221", "F1222", "F1230", "F1234", "F1235", "F1241", "F1242", "F1257", "F1259", "F1265",
      "F1270", "F1276", "F1277", "F1280", "F1281", "F1287", "F1292", "F1293", "F1309", "F1312",
      "F1314", "F1322", "F1325", "F1332", "F1335", "F1337", "F1339", "F1341", "F1353", "F1358",
      "F1359", "F1360", "F1363", "F1387", "F1388", "F1390", "F1392", "F1393", "F1394", "F1395",
      "F1400", "F1403", "F1414", "F1417", "F1419", "F1421", "F1423", "F1425", "F1426", "F1445",
      "F1448", "F1451", "F1453", "F1456", "F1457", "F1460", "F1464", "F1465", "F1466", "F1468",
      "F1472", "F1476", "F1480", "F1482", "F1483", "F1484", "F1486", "F1487", "F1488", "F1490",
      "F1495"
    ]
  };
  const HIDDEN_FACTS = new Set([...Object.keys(WITHDRAWN.facts), ...WITHDRAWN.numbers]);

  // Verified fun facts live in data/facts/<collection>.facts.js (generated outside the repo) and set
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
