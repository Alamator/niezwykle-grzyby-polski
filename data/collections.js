(() => {
  const mushroomData = window.MUSHROOM_APP_DATA;
  const insectData = window.INSECT_APP_DATA;
  const flowerData = window.FLOWER_APP_DATA;
  const fishData = window.FISH_APP_DATA;
  const birdData = window.BIRD_APP_DATA;
  const mammalData = window.MAMMAL_APP_DATA;
  const amphibianReptileData = window.AMPHIBIAN_REPTILE_APP_DATA;
  const treeData = window.TREE_APP_DATA;
  const mineralData = window.MINERAL_APP_DATA;
  const rockFormationData = window.ROCK_FORMATION_APP_DATA;
  const woodenArchitectureData = window.WOODEN_ARCHITECTURE_APP_DATA;
  const undergroundData = window.UNDERGROUND_APP_DATA;
  const engineeringWonderData = window.ENGINEERING_WONDER_APP_DATA;
  const fortressRuinData = window.FORTRESS_RUIN_APP_DATA;
  const fossilData = window.FOSSIL_APP_DATA;
  const atmosphereAstronomyData = window.ATMOSPHERE_ASTRONOMY_APP_DATA;

  const views = [
    { id: "atlas", label: "Atlas" },
    { id: "learn", label: "Nauka" },
    { id: "quiz", label: "Quiz" },
    { id: "sources", label: "Źródła" }
  ];

  const collections = [];

  if (mushroomData) {
    collections.push({
      id: "grzyby",
      title: "Grzyby",
      heading: "Niezwykłe grzyby Polski",
      subtitle: "60 grzybowych osobliwości: formy, kolory, zapachy i gatunki, które łatwo zapamiętać.",
      count_label: "60 osobliwości",
      icon: "G",
      accent: "forest",
      search_placeholder: "np. sromotnik, koral, gwiazda...",
      safety_notice: mushroomData.safety_notice,
      source_note: "Zdjęcia dodajemy tylko z jasną licencją. Pierwsze paczki Wikimedia Commons mają autora, źródło i licencję.",
      categories: mushroomData.categories,
      items: mushroomData.mushrooms
    });
  }

  if (insectData) {
    collections.push({
      id: "owady",
      title: "Owady",
      heading: "Osobliwe owady Polski",
      subtitle: insectData.subtitle,
      count_label: "30 osobliwości",
      icon: "O",
      accent: "amber",
      search_placeholder: "np. oleica, świetlik, jelonek...",
      safety_notice: insectData.safety_notice,
      source_note: "Opisy startują z listy roboczej. Zdjęcia i atrybucje będziemy uzupełniać stopniowo z legalnych źródeł.",
      categories: insectData.categories,
      items: insectData.insects
    });
  }

  if (flowerData) {
    collections.push({
      id: "kwiaty",
      title: "Kwiaty",
      heading: "Osobliwe kwiaty i rośliny Polski",
      subtitle: flowerData.subtitle,
      count_label: "31 osobliwości",
      icon: "K",
      accent: "rose",
      search_placeholder: "np. aldrowanda, storczyk, dyptam...",
      safety_notice: flowerData.safety_notice,
      source_note: "Opisy startują z listy roboczej o osobliwych roślinach Polski. Zdjęcia i atrybucje dodamy później z legalnych źródeł.",
      categories: flowerData.categories,
      items: flowerData.flowers
    });
  }

  if (fishData) {
    collections.push({
      id: "ryby",
      title: "Ryby",
      heading: "Osobliwe ryby polskich wód",
      subtitle: fishData.subtitle,
      count_label: "32 osobliwości",
      icon: "R",
      accent: "aqua",
      search_placeholder: "np. stynka, tasza, różanka...",
      safety_notice: fishData.safety_notice,
      source_note: "Opisy powstały na bazie listy roboczej o osobliwych rybach Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją.",
      categories: fishData.categories,
      items: fishData.fish
    });
  }

  if (birdData) {
    collections.push({
      id: "ptaki",
      title: "Ptaki",
      heading: "Osobliwe ptaki Polski",
      subtitle: birdData.subtitle,
      count_label: "32 osobliwości",
      icon: "P",
      accent: "sky",
      search_placeholder: "np. dudek, jerzyk, pomurnik...",
      safety_notice: birdData.safety_notice,
      source_note: "Opisy powstały na bazie dwóch list roboczych o osobliwej awifaunie Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją.",
      categories: birdData.categories,
      items: birdData.birds
    });
  }

  if (mammalData) {
    collections.push({
      id: "ssaki",
      title: "Ssaki",
      heading: "Osobliwe ssaki Polski",
      subtitle: mammalData.subtitle,
      count_label: "33 osobliwości",
      icon: "S",
      accent: "fur",
      search_placeholder: "np. ryjówka, nocek, żubr, morświn...",
      safety_notice: mammalData.safety_notice,
      source_note: "Opisy powstały na bazie wskazanego materiału o osobliwościach teriofauny Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      categories: mammalData.categories,
      items: mammalData.mammals
    });
  }

  if (amphibianReptileData) {
    collections.push({
      id: "plazy-gady",
      title: "Płazy i Gady",
      heading: "Osobliwe płazy i gady Polski",
      subtitle: amphibianReptileData.subtitle,
      count_label: "30 osobliwości",
      icon: "P+G",
      accent: "herp",
      search_placeholder: "np. żaba moczarowa, kumak, żółw, żmija...",
      safety_notice: amphibianReptileData.safety_notice,
      source_note: "Opisy powstały na bazie wskazanego materiału o osobliwościach herpetofauny Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      categories: amphibianReptileData.categories,
      items: amphibianReptileData.amphibiansReptiles
    });
  }

  if (treeData) {
    collections.push({
      id: "drzewa",
      title: "Drzewa",
      heading: "Osobliwe drzewa Polski",
      subtitle: treeData.subtitle,
      count_label: "30 osobliwości",
      icon: "D",
      accent: "leaf",
      search_placeholder: "np. sosna, dąb, cis, platan...",
      safety_notice: treeData.safety_notice,
      source_note: "Opisy powstały na bazie listy roboczej o osobliwościach dendrologicznych Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      categories: treeData.categories,
      items: treeData.trees
    });
  }

  if (mineralData) {
    collections.push({
      id: "mineraly",
      title: "Minerały",
      heading: "Osobliwe minerały Polski",
      subtitle: mineralData.subtitle,
      count_label: "33 osobliwości",
      icon: "M",
      accent: "stone",
      search_placeholder: "np. krzemień, siarka, halit, agat...",
      safety_notice: mineralData.safety_notice,
      source_note: "Opisy powstały na bazie listy roboczej o osobliwościach mineralogicznych Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      categories: mineralData.categories,
      items: mineralData.minerals
    });
  }

  if (rockFormationData) {
    collections.push({
      id: "formacje-skalne",
      title: "Formacje skalne",
      heading: "Osobliwe formacje skalne Polski",
      subtitle: rockFormationData.subtitle,
      count_label: "33 osobliwości",
      icon: "F",
      accent: "cliff",
      search_placeholder: "np. Błędne Skały, Maczuga, Giewont...",
      safety_notice: rockFormationData.safety_notice,
      source_note: "Opisy powstały na bazie listy roboczej o osobliwych formacjach skalnych Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      categories: rockFormationData.categories,
      items: rockFormationData.formations
    });
  }

  if (woodenArchitectureData) {
    collections.push({
      id: "architektura-drewniana",
      title: "Architektura drewniana",
      heading: "Architektoniczne osobliwości: drewno",
      subtitle: woodenArchitectureData.subtitle,
      count_label: "30 osobliwości",
      icon: "AD",
      accent: "wood",
      route: "/atlas/architektura-drewniana",
      search_placeholder: "np. Świdnica, Dębno, Kwiatoń, Wang, Kruszyniany...",
      safety_notice: woodenArchitectureData.safety_notice,
      source_note: "Opisy powstały na bazie wskazanego materiału o drewnianej architekturze Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; kadry reprezentatywne są oznaczone uczciwie.",
      categories: woodenArchitectureData.categories,
      items: woodenArchitectureData.woodenArchitecture
    });
  }

  if (undergroundData) {
    collections.push({
      id: "podziemia",
      title: "Podziemia",
      heading: "Podziemia Atlasu Osobliwości",
      subtitle: undergroundData.subtitle,
      count_label: "30 osobliwości",
      icon: "P",
      accent: "subterra",
      route: "/atlas/podziemia",
      search_placeholder: "np. Wieliczka, Riese, MRU, Sandomierz, Chełm...",
      safety_notice: undergroundData.safety_notice,
      source_note: "Opisy powstały na bazie wskazanego materiału o podziemnych osobliwościach Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; schematy i kadry reprezentatywne są oznaczone uczciwie.",
      categories: undergroundData.categories,
      items: undergroundData.underground
    });
  }

  if (engineeringWonderData) {
    collections.push({
      id: "cuda-inzynierii",
      title: "Cuda Inżynierii",
      heading: "Techniczne osobliwości Polski",
      subtitle: engineeringWonderData.subtitle,
      count_label: "33 osobliwości",
      icon: "I",
      accent: "machina",
      route: "/atlas/cuda-inzynierii",
      search_placeholder: "np. Kanał Elbląski, tężnie, Radiostacja Gliwicka, Solina, Gdynia...",
      safety_notice: engineeringWonderData.safety_notice,
      source_note: "Opisy powstały na bazie wskazanego materiału o techniczno-architektonicznych osobliwościach Polski. Źródła i dane liczbowe należy weryfikować przed publikacją finalnych kart.",
      categories: engineeringWonderData.categories,
      items: engineeringWonderData.engineeringWonders
    });
  }

  if (fortressRuinData) {
    collections.push({
      id: "twierdze-ruiny",
      title: "Twierdze i Ruiny",
      heading: "Twierdze, ruiny i zapomniane miejsca",
      subtitle: fortressRuinData.subtitle,
      count_label: "33 osobliwości",
      icon: "T",
      accent: "civitas",
      route: "/atlas/twierdze-ruiny",
      search_placeholder: "np. Zamość, Krzyżtopór, Malbork, Modlin, Stańczyki...",
      safety_notice: fortressRuinData.safety_notice,
      source_note: "Opisy powstały na bazie wskazanego materiału o zamkach, twierdzach, ruinach i zapomnianych konstrukcjach Polski. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; kadry reprezentatywne są oznaczone uczciwie.",
      categories: fortressRuinData.categories,
      items: fortressRuinData.fortressesRuins
    });
  }

  if (fossilData) {
    collections.push({
      id: "skamienialosci",
      title: "Skamieniałości",
      heading: "Osobliwe skamieniałości Polski",
      subtitle: fossilData.subtitle,
      count_label: "33 osobliwości",
      icon: "S",
      accent: "fossil",
      search_placeholder: "np. Zachełmie, Smok, amonity, bursztyn...",
      safety_notice: fossilData.safety_notice,
      source_note: "Opisy powstały na bazie listy roboczej o polskich skamieniałościach i wskazanego zakresu tropów oraz amonitów. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      categories: fossilData.categories,
      items: fossilData.fossils
    });
  }

  if (atmosphereAstronomyData) {
    collections.push({
      id: "atmosfera-astronomia",
      title: "Atmosfera i astronomia",
      heading: "Osobliwości atmosferyczne i astronomiczne Polski",
      subtitle: atmosphereAstronomyData.subtitle,
      count_label: "33 osobliwości",
      icon: "N",
      accent: "skyfire",
      search_placeholder: "np. Brockenu, zorza, Bałtyk, mrozowisko...",
      safety_notice: atmosphereAstronomyData.safety_notice,
      source_note: "Opisy powstały na bazie listy roboczej o polskich zjawiskach atmosferycznych i astronomicznych. Zdjęcia pochodzą z Wikimedia Commons z pełną atrybucją; część kadrów jest uczciwie oznaczona jako reprezentatywna.",
      categories: atmosphereAstronomyData.categories,
      items: atmosphereAstronomyData.phenomena
    });
  }

  window.ATLAS_APP_DATA = {
    project: "Atlas Osobliwości Polski",
    subtitle: "Jedno miejsce na niezwykłe grzyby, owady, kwiaty, ryby, ptaki, ssaki, płazy i gady, drzewa, minerały, formacje skalne, architekturę drewnianą, podziemia, cuda inżynierii, twierdze i ruiny, skamieniałości, niebo i kolejne osobliwości Polski.",
    version: "0.1.0-collections",
    views,
    collections
  };
})();
