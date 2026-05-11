(() => {
  const mushroomData = window.MUSHROOM_APP_DATA;
  const insectData = window.INSECT_APP_DATA;
  const flowerData = window.FLOWER_APP_DATA;
  const fishData = window.FISH_APP_DATA;
  const birdData = window.BIRD_APP_DATA;
  const treeData = window.TREE_APP_DATA;
  const mineralData = window.MINERAL_APP_DATA;
  const rockFormationData = window.ROCK_FORMATION_APP_DATA;

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

  window.ATLAS_APP_DATA = {
    project: "Atlas Osobliwości Polski",
    subtitle: "Jedno miejsce na niezwykłe grzyby, owady, kwiaty, ryby, ptaki, drzewa, minerały, formacje skalne i kolejne osobliwości polskiej przyrody.",
    version: "0.1.0-collections",
    views,
    collections
  };
})();
