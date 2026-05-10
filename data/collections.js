(() => {
  const mushroomData = window.MUSHROOM_APP_DATA;
  const insectData = window.INSECT_APP_DATA;
  const flowerData = window.FLOWER_APP_DATA;
  const fishData = window.FISH_APP_DATA;

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

  window.ATLAS_APP_DATA = {
    project: "Atlas Osobliwości Polski",
    subtitle: "Jedno miejsce na niezwykłe grzyby, owady i kolejne osobliwości polskiej przyrody.",
    version: "0.1.0-collections",
    views,
    collections
  };
})();
