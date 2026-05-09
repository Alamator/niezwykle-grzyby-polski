(() => {
  const mushroomData = window.MUSHROOM_APP_DATA;
  const insectData = window.INSECT_APP_DATA;

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

  window.ATLAS_APP_DATA = {
    project: "Atlas Osobliwości Polski",
    subtitle: "Jedno miejsce na niezwykłe grzyby, owady i kolejne osobliwości polskiej przyrody.",
    version: "0.1.0-collections",
    views,
    collections
  };
})();
