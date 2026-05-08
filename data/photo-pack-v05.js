(() => {
  const appData = window.MUSHROOM_APP_DATA;
  if (!appData || !Array.isArray(appData.mushrooms)) return;

  const commonsImage = (fileName) =>
    `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}?width=900`;

  const embeddedFromCommons =
    "osadzenie z Wikimedia Commons przez Special:Redirect; przeglądarka pobiera wersję skalowaną do ok. 900 px; bez lokalnego kopiowania pliku";

  const updates = {
    "krazkowka-zylkowana": {
      image_status: "commons_verified",
      image: commonsImage("Disciotis venosa.jpg"),
      image_alt: "Krążkówka żyłkowana (Disciotis venosa), czarkowaty owocnik z pomarszczoną, żyłkowaną powierzchnią",
      image_author: "Gerhard Koller",
      image_source: "https://commons.wikimedia.org/wiki/File:Disciotis_venosa.jpg",
      image_license: "CC BY-SA 3.0",
      license_url: "https://creativecommons.org/licenses/by-sa/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["żyłki", "czarka", "smardzowe siedliska"]
    },
    "koralowka-groniasta": {
      image_status: "commons_verified",
      image: commonsImage("Ramaria botrytis 299869.jpg"),
      image_alt: "Koralówka groniasta (Ramaria botrytis), rozgałęziony koralowy owocnik z różowawymi końcówkami",
      image_author: "John Kirkpatrick (natashadak)",
      image_source: "https://commons.wikimedia.org/wiki/File:Ramaria_botrytis_299869.jpg",
      image_license: "CC BY-SA 3.0",
      license_url: "https://creativecommons.org/licenses/by-sa/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["korale", "różowe końcówki", "trudna grupa"]
    },
    "szyszkowiec-luskowaty": {
      image_status: "commons_verified",
      image: commonsImage("Strobilomyces strobilaceus (23682362208).jpg"),
      image_alt: "Szyszkowiec łuskowaty (Strobilomyces strobilaceus), ciemny owocnik pokryty łuskami",
      image_author: "Björn S...",
      image_source: "https://commons.wikimedia.org/wiki/File:Strobilomyces_strobilaceus_(23682362208).jpg",
      image_license: "CC BY-SA 2.0",
      license_url: "https://creativecommons.org/licenses/by-sa/2.0/",
      image_modifications: embeddedFromCommons,
      tags: ["łuski", "ciemny", "borowikowaty"]
    },
    "krwistoborowik-szatanski": {
      image_status: "commons_verified",
      image: commonsImage("Boletus satanas.JPG"),
      image_alt: "Krwistoborowik szatański (Rubroboletus satanas), jasny kapelusz i czerwone elementy trzonu oraz rurek",
      image_author: "Archenzo",
      image_source: "https://commons.wikimedia.org/wiki/File:Boletus_satanas.JPG",
      image_license: "CC BY-SA 3.0 / GFDL 1.2+",
      license_url: "https://creativecommons.org/licenses/by-sa/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["trujący", "czerwone pory", "ostrożność"]
    },
    "wilgotnica-czerniejaca": {
      image_status: "commons_verified",
      image: commonsImage("Hygrocybe conica.JPG"),
      image_alt: "Wilgotnica czerniejąca (Hygrocybe conica), stożkowaty czerwono-pomarańczowy owocnik",
      image_author: "Dr. Killer",
      image_source: "https://commons.wikimedia.org/wiki/File:Hygrocybe_conica.JPG",
      image_license: "CC BY-SA 3.0 / GFDL",
      license_url: "https://creativecommons.org/licenses/by-sa/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["czerwony", "czernienie", "wilgotnica"]
    },
    "lakowka-ametystowa": {
      image_status: "commons_verified",
      image: commonsImage("Laccaria amethystina - Љубичаста гљивица.jpg"),
      image_alt: "Lakówka ametystowa (Laccaria amethystina), fioletowy owocnik na ściółce leśnej",
      image_author: "JovanaKoturov",
      image_source: "https://commons.wikimedia.org/wiki/File:Laccaria_amethystina_-_%D0%89%D1%83%D0%B1%D0%B8%D1%87%D0%B0%D1%81%D1%82%D0%B0_%D0%B3%D1%99%D0%B8%D0%B2%D0%B8%D1%86%D0%B0.jpg",
      image_license: "CC BY-SA 4.0",
      license_url: "https://creativecommons.org/licenses/by-sa/4.0/",
      image_modifications: embeddedFromCommons,
      tags: ["fiolet", "ametyst", "kolor"]
    },
    "chlorowka-drobna": {
      image_status: "commons_verified",
      image: commonsImage("Chlorociboria-aeruginascens.jpg"),
      image_alt: "Chlorówka drobna (Chlorociboria aeruginascens), drobne zielononiebieskie owocniki barwiące drewno",
      image_author: "Holger Krisp",
      image_source: "https://commons.wikimedia.org/wiki/File:Chlorociboria-aeruginascens.jpg",
      image_license: "CC BY 3.0",
      license_url: "https://creativecommons.org/licenses/by/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["zielone drewno", "turkus", "drobny"]
    },
    "grzybowka-krwista": {
      image_status: "commons_verified",
      image: commonsImage("Mycena haematopus.jpg"),
      image_alt: "Grzybówka krwista (Mycena haematopus), drobne owocniki z ciemnoczerwonym sokiem po uszkodzeniu",
      image_author: "Archenzo",
      image_source: "https://commons.wikimedia.org/wiki/File:Mycena_haematopus.jpg",
      image_license: "CC BY-SA 3.0 / GFDL",
      license_url: "https://creativecommons.org/licenses/by-sa/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["krwisty sok", "drobna", "martwe drewno"]
    },
    "ozorek-debowy": {
      image_status: "commons_verified",
      image: commonsImage("Fistulina hepatica (36813125456).jpg"),
      image_alt: "Ozorek dębowy (Fistulina hepatica), czerwono-brązowy mięsisty owocnik na drewnie",
      image_author: "Lukas from London, England",
      image_source: "https://commons.wikimedia.org/wiki/File:Fistulina_hepatica_(36813125456).jpg",
      image_license: "CC BY-SA 2.0",
      license_url: "https://creativecommons.org/licenses/by-sa/2.0/",
      image_modifications: embeddedFromCommons,
      tags: ["ozorek", "dąb", "mięsisty"]
    },
    "zolciak-siarkowy": {
      image_status: "commons_verified",
      image: commonsImage("Laetiporus sulphureus .jpg"),
      image_alt: "Żółciak siarkowy (Laetiporus sulphureus), intensywnie żółtopomarańczowe półki na drewnie",
      image_author: "Johannes Fabrizius",
      image_source: "https://commons.wikimedia.org/wiki/File:Laetiporus_sulphureus_.jpg",
      image_license: "CC BY-SA 4.0",
      license_url: "https://creativecommons.org/licenses/by-sa/4.0/",
      image_modifications: embeddedFromCommons,
      tags: ["siarkowy kolor", "półki", "drewno"]
    }
  };

  let patchedCount = 0;
  appData.mushrooms = appData.mushrooms.map((mushroom) => {
    const update = updates[mushroom.id];
    if (!update) return mushroom;
    patchedCount += 1;
    return { ...mushroom, ...update };
  });

  appData.version = "0.5.0-photo-pack-4";
  appData.last_updated = "2026-05-08";
  appData.photo_pack_4 = {
    title: "Wikimedia Commons photo pack 4",
    updated_mushrooms: patchedCount,
    target_total_images: 40,
    note: "Czwarta paczka zdjęć i atrybucji: mocne kolory, grzyby nadrzewne, korale i gatunki ostrzegawcze."
  };
})();
