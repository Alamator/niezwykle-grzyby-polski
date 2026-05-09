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
      heading: "Niezwykle grzyby Polski",
      subtitle: "60 grzybowych osobliwosci: formy, kolory, zapachy i gatunki, ktore latwo zapamietac.",
      count_label: "60 osobliwosci",
      icon: "G",
      accent: "forest",
      search_placeholder: "np. sromotnik, koral, gwiazda...",
      safety_notice: mushroomData.safety_notice,
      source_note: "Zdjecia dodajemy tylko z jasna licencja. Pierwsze paczki Wikimedia Commons maja autora, zrodlo i licencje.",
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
      count_label: "30 osobliwosci",
      icon: "O",
      accent: "amber",
      search_placeholder: "np. oleica, świetlik, jelonek...",
      safety_notice: insectData.safety_notice,
      source_note: "Opisy startuja z listy roboczej. Zdjecia i atrybucje bedziemy uzupelniac stopniowo z legalnych zrodel.",
      categories: insectData.categories,
      items: insectData.insects
    });
  }

  window.ATLAS_APP_DATA = {
    project: "Atlas Osobliwości Polski",
    subtitle: "Jedno miejsce na niezwykle grzyby, owady i kolejne osobliwosci polskiej przyrody.",
    version: "0.1.0-collections",
    views,
    collections
  };
})();
