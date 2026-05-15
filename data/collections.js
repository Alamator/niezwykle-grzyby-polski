(() => {
  // Each entry: static metadata visible before data loads + scripts to lazy-fetch + builder that
  // pulls live data from the window globals defined by those scripts.
  const COLLECTION_BUILDERS = [
    {
      id: "grzyby",
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
        "/data/photo-pack-v08.js"
      ],
      build: () => {
        const data = window.MUSHROOM_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.mushrooms };
      }
    },
    {
      id: "owady",
      title: "Owady",
      heading: "Osobliwe owady Polski",
      subtitle: "30 rzadkich, dziwnych i zapadających w pamięć owadów spotykanych w Polsce.",
      count_label: "30 osobliwości",
      icon: "O",
      accent: "amber",
      search_placeholder: "np. oleica, świetlik, jelonek...",
      source_note: "Opisy startują z listy roboczej. Zdjęcia i atrybucje będziemy uzupełniać stopniowo z legalnych źródeł.",
      scripts: ["/data/insects.js"],
      build: () => {
        const data = window.INSECT_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.insects };
      }
    },
    {
      id: "kwiaty",
      title: "Kwiaty",
      heading: "Osobliwe kwiaty i rośliny Polski",
      subtitle: "31 polskie, dziko rosnące lub zadomowione osobliwości roślinne: pułapki, zapachy, mimikra, pasożyty i relikty.",
      count_label: "31 osobliwości",
      icon: "K",
      accent: "rose",
      search_placeholder: "np. aldrowanda, storczyk, dyptam...",
      source_note: "Opisy startują z listy roboczej o osobliwych roślinach Polski. Zdjęcia i atrybucje dodamy później z legalnych źródeł.",
      scripts: ["/data/flowers.js", "/data/flower-photo-pack-v01.js"],
      build: () => {
        const data = window.FLOWER_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.flowers };
      }
    },
    {
      id: "ryby",
      title: "Ryby",
      heading: "Osobliwe ryby polskich wód",
      subtitle: "32 rybie osobliwości polskich wód i ich rubieży: zapachy, dźwięki, przyssawki, wędrówki, kamuflaż i gatunki inwazyjne.",
      count_label: "32 osobliwości",
      icon: "R",
      accent: "aqua",
      search_placeholder: "np. stynka, tasza, różanka...",
      source_note: "Opisy powstały na bazie listy roboczej o osobliwych rybach Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją.",
      scripts: ["/data/fish.js", "/data/fish-photo-pack-v01.js"],
      build: () => {
        const data = window.FISH_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.fish };
      }
    },
    {
      id: "ptaki",
      title: "Ptaki",
      heading: "Osobliwe ptaki Polski",
      subtitle: "32 ptasie osobliwości Polski: rekordy skali, lotu, zmysłów, gniazd, strategii, mokradeł, gór i rzadkich gości.",
      count_label: "32 osobliwości",
      icon: "P",
      accent: "sky",
      search_placeholder: "np. dudek, jerzyk, pomurnik...",
      source_note: "Opisy powstały na bazie dwóch list roboczych o osobliwej awifaunie Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją.",
      scripts: ["/data/birds.js", "/data/bird-photo-pack-v01.js"],
      build: () => {
        const data = window.BIRD_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.birds };
      }
    },
    {
      id: "ssaki",
      title: "Ssaki",
      heading: "Osobliwe ssaki Polski",
      subtitle: "33 ssacze osobliwości Polski: ryjówki ze zjawiskiem Dehnela, jadowite rzęsorki, nietoperze z MRU, relikty stepów i Tatr, żubr, ekspansywne drapieżniki oraz ssaki Bałtyku.",
      count_label: "33 osobliwości",
      icon: "S",
      accent: "fur",
      search_placeholder: "np. ryjówka, nocek, żubr, morświn...",
      source_note: "Opisy powstały na bazie wskazanego materiału o osobliwościach teriofauny Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/mammals.js", "/data/mammal-photo-pack-v01.js"],
      build: () => {
        const data = window.MAMMAL_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.mammals };
      }
    },
    {
      id: "plazy-gady",
      title: "Płazy i Gady",
      heading: "Osobliwe płazy i gady Polski",
      subtitle: "30 herpetologiczne osobliwości Polski: błękitne gody żaby moczarowej, czosnkowa obrona grzebiuszki, odruch kumaka, grzebienie traszek, nadrzewne rzekotki, reliktowe węże, żółw błotny i inwazyjne żółwie ozdobne.",
      count_label: "30 osobliwości",
      icon: "P+G",
      accent: "herp",
      search_placeholder: "np. żaba moczarowa, kumak, żółw, żmija...",
      source_note: "Opisy powstały na bazie wskazanego materiału o osobliwościach herpetofauny Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/amphibians-reptiles.js", "/data/amphibian-reptile-photo-pack-v01.js"],
      build: () => {
        const data = window.AMPHIBIAN_REPTILE_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.amphibiansReptiles };
      }
    },
    {
      id: "drzewa",
      title: "Drzewa",
      heading: "Osobliwe drzewa Polski",
      subtitle: "Te dendrologiczne osobliwości Polski to 30 historii zapachu, światła próchna, deformacji, rekordów wieku, pamięci miejsc, katastrof i parkowych egzotów.",
      count_label: "30 osobliwości",
      icon: "D",
      accent: "leaf",
      search_placeholder: "np. sosna, dąb, cis, platan...",
      source_note: "Opisy powstały na bazie listy roboczej o osobliwościach dendrologicznych Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/trees.js", "/data/tree-photo-pack-v01.js"],
      build: () => {
        const data = window.TREE_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.trees };
      }
    },
    {
      id: "mineraly",
      title: "Minerały",
      heading: "Osobliwe minerały Polski",
      subtitle: "33 mineralogiczne osobliwości Polski: endemity IMA, kruszce, sole, agaty, krzemień pasiasty, bursztyn i minerały z dawnych kopalń.",
      count_label: "33 osobliwości",
      icon: "M",
      accent: "stone",
      search_placeholder: "np. krzemień, siarka, halit, agat...",
      source_note: "Opisy powstały na bazie listy roboczej o osobliwościach mineralogicznych Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/minerals.js", "/data/mineral-photo-pack-v01.js"],
      build: () => {
        const data = window.MINERAL_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.minerals };
      }
    },
    {
      id: "formacje-skalne",
      title: "Formacje skalne",
      heading: "Osobliwe formacje skalne Polski",
      subtitle: "33 formacje skalne Polski: granitowe skałki Karkonoszy, wulkaniczne organy, piaskowcowe labirynty, jurajskie bramy, karpackie ostańce i głazy polodowcowe.",
      count_label: "33 osobliwości",
      icon: "F",
      accent: "cliff",
      search_placeholder: "np. Błędne Skały, Maczuga, Giewont...",
      source_note: "Opisy powstały na bazie listy roboczej o osobliwych formacjach skalnych Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/rock-formations.js", "/data/rock-formation-photo-pack-v01.js"],
      build: () => {
        const data = window.ROCK_FORMATION_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.formations };
      }
    },
    {
      id: "architektura-drewniana",
      title: "Architektura drewniana",
      heading: "Architektoniczne osobliwości: drewno",
      subtitle: "30 drewnianych osobliwości Polski: Kościoły Pokoju, gotyckie świątynie zrębowe, cerkwie Karpat, styl zakopiański, tatarskie meczety i drewniane wsie.",
      count_label: "30 osobliwości",
      icon: "AD",
      accent: "wood",
      route: "/atlas/architektura-drewniana",
      search_placeholder: "np. Świdnica, Dębno, Kwiatoń, Wang, Kruszyniany...",
      source_note: "Opisy powstały na bazie wskazanego materiału o drewnianej architekturze Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; kadry reprezentatywne są oznaczone uczciwie.",
      scripts: ["/data/wooden-architecture.js", "/data/wooden-architecture-photo-pack-v01.js"],
      build: () => {
        const data = window.WOODEN_ARCHITECTURE_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.woodenArchitecture };
      }
    },
    {
      id: "podziemia",
      title: "Podziemia",
      heading: "Podziemia Atlasu Osobliwości",
      subtitle: "30 podziemnych osobliwości Polski: kopalnie soli, krzemienia i srebra, miejskie piwnice, sztolnie, schrony oraz tajemnice Gór Sowich.",
      count_label: "30 osobliwości",
      icon: "P",
      accent: "subterra",
      route: "/atlas/podziemia",
      search_placeholder: "np. Wieliczka, Riese, MRU, Sandomierz, Chełm...",
      source_note: "Opisy powstały na bazie wskazanego materiału o podziemnych osobliwościach Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; schematy i kadry reprezentatywne są oznaczone uczciwie.",
      scripts: ["/data/underground.js", "/data/underground-photo-pack-v01.js"],
      build: () => {
        const data = window.UNDERGROUND_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.underground };
      }
    },
    {
      id: "cuda-inzynierii",
      title: "Cuda Inżynierii",
      heading: "Techniczne osobliwości Polski",
      subtitle: "33 techniczne osobliwości Polski: kanały, śluzy, tężnie, radiostacje, hale, zapory, mosty, tunele, koleje i przemysłowe miasta.",
      count_label: "33 osobliwości",
      icon: "I",
      accent: "machina",
      route: "/atlas/cuda-inzynierii",
      search_placeholder: "np. Kanał Elbląski, tężnie, Radiostacja Gliwicka, Solina, Gdynia...",
      source_note: "Opisy powstały na bazie wskazanego materiału o techniczno-architektonicznych osobliwościach Polski. Źródła i dane liczbowe należy weryfikować przed publikacją finalnych kart.",
      scripts: ["/data/engineering-wonders.js", "/data/engineering-wonders-photo-pack-v01.js"],
      build: () => {
        const data = window.ENGINEERING_WONDER_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.engineeringWonders };
      }
    },
    {
      id: "twierdze-ruiny",
      title: "Twierdze i Ruiny",
      heading: "Twierdze, ruiny i zapomniane miejsca",
      subtitle: "33 osobliwości twierdz i ruin Polski: miasta idealne, zamki-legendy, twierdze, opuszczone pałace i konstrukcje, które zostały po ambicji.",
      count_label: "33 osobliwości",
      icon: "T",
      accent: "civitas",
      route: "/atlas/twierdze-ruiny",
      search_placeholder: "np. Zamość, Krzyżtopór, Malbork, Modlin, Stańczyki...",
      source_note: "Opisy powstały na bazie wskazanego materiału o zamkach, twierdzach, ruinach i zapomnianych konstrukcjach Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; kadry reprezentatywne są oznaczone uczciwie.",
      scripts: ["/data/fortresses-ruins.js", "/data/fortresses-ruins-photo-pack-v01.js"],
      build: () => {
        const data = window.FORTRESS_RUIN_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.fortressesRuins };
      }
    },
    {
      id: "memento-mori",
      title: "Memento Mori",
      heading: "Memento Mori: miejsca pamięci i przemijania",
      subtitle: "30 miejsc pamięci i przemijania: ossuaria, cmentarze, nekropolie, miejsca Zagłady, martyrologii, wojenne cmentarze, kopce i pradawne pochówki.",
      count_label: "30 osobliwości",
      icon: "M",
      accent: "memento",
      route: "/atlas/memento-mori",
      search_placeholder: "np. Czermna, Powązki, mizar, Treblinka, kopiec...",
      source_note: "Opisy powstały na bazie wskazanego materiału o miejscach pamięci i przemijania w Polsce. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; przy miejscach trudnej historii zachowujemy spokojny, edukacyjny ton.",
      scripts: ["/data/memento-mori.js", "/data/memento-mori-photo-pack-v01.js"],
      build: () => {
        const data = window.MEMENTO_MORI_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.mementoMori };
      }
    },
    {
      id: "skamienialosci",
      title: "Skamieniałości",
      heading: "Osobliwe skamieniałości Polski",
      subtitle: "33 paleontologiczne osobliwości Polski: trylobity, rafy dewońskie, Zachełmie, triasowe olbrzymy, tropy dinozaurów, jurajskie morza, bursztyn i megafauna epoki lodowcowej.",
      count_label: "33 osobliwości",
      icon: "S",
      accent: "fossil",
      search_placeholder: "np. Zachełmie, Smok, amonity, bursztyn...",
      source_note: "Opisy powstały na bazie listy roboczej o polskich skamieniałościach i wskazanego zakresu tropów oraz amonitów. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/fossils.js", "/data/fossil-photo-pack-v01.js"],
      build: () => {
        const data = window.FOSSIL_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.fossils };
      }
    },
    {
      id: "atmosfera-astronomia",
      title: "Atmosfera i astronomia",
      heading: "Osobliwości atmosferyczne i astronomiczne Polski",
      subtitle: "33 atmosferyczne i astronomiczne osobliwości Polski: widmo Brockenu, duszki, białe noce, obłoki srebrzyste, ciemne niebo, zorze, Bałtyk jako fabryka śniegu, dalekie obserwacje, mrozowiska i pył saharyjski.",
      count_label: "33 osobliwości",
      icon: "N",
      accent: "skyfire",
      search_placeholder: "np. Brockenu, zorza, Bałtyk, mrozowisko...",
      source_note: "Opisy powstały na bazie listy roboczej o polskich zjawiskach atmosferycznych i astronomicznych. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      scripts: ["/data/atmosphere-astronomy.js", "/data/atmosphere-astronomy-photo-pack-v01.js"],
      build: () => {
        const data = window.ATMOSPHERE_ASTRONOMY_APP_DATA;
        if (!data) return null;
        return { safety_notice: data.safety_notice, categories: data.categories, items: data.phenomena };
      }
    },
    {
      id: "rekordy-krajobrazu",
      title: "Rekordy krajobrazu",
      heading: "Rekordy i osobliwości krajobrazowe Polski",
      subtitle: "56 krajobrazowych osobliwości Polski: polska pustynia, ruchome wydmy, krzywy las, klify, bagna, kolorowe jeziora, przełomy, dawne wulkany, mikroklimaty i miejsca jak z innej mapy.",
      count_label: "56 osobliwości",
      icon: "RK",
      accent: "landscape",
      route: "/atlas/rekordy-krajobrazu",
      search_placeholder: "np. pustynia, wydmy, Hańcza, mofeta, Rysy...",
      source_note: "Opisy powstały na bazie wskazanego materiału o rekordach i osobliwościach krajobrazowych Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; kadry kontekstowe są oznaczone uczciwie.",
      scripts: ["/data/landscape-records.js", "/data/landscape-records-photo-pack-v01.js"],
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

  // Placeholders rendered on the home grid before any collection is opened. items[] stays empty
  // until loadCollection() pulls the matching data files.
  const collections = COLLECTION_BUILDERS.map((builder) => ({
    id: builder.id,
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
    _builder: builder,
    _loaded: false,
    _loadPromise: null
  }));

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
      collection._loaded = true;
    }
  }

  window.ATLAS_APP_DATA = {
    project: "Atlas Osobliwości Polski",
    subtitle: "Jedno miejsce na niezwykłe grzyby, owady, kwiaty, ryby, ptaki, ssaki, płazy i gady, drzewa, minerały, formacje skalne, architekturę drewnianą, podziemia, cuda inżynierii, twierdze i ruiny, Memento Mori, skamieniałości, niebo, rekordy krajobrazu i kolejne osobliwości Polski.",
    version: "0.2.0-lazy-load",
    views,
    collections,
    loadCollection
  };
})();
