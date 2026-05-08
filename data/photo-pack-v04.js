(() => {
  const appData = window.MUSHROOM_APP_DATA;
  if (!appData || !Array.isArray(appData.mushrooms)) return;

  const commonsImage = (fileName) =>
    `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}?width=900`;

  const embeddedFromCommons =
    "osadzenie z Wikimedia Commons przez Special:Redirect; przeglądarka pobiera wersję skalowaną do ok. 900 px; bez lokalnego kopiowania pliku";

  const updates = {
    "kolczakowka-galaretowata": {
      image_status: "commons_verified",
      image: commonsImage("Pseudohydnum gelatinosum (37516414602).jpg"),
      image_alt: "Kolczakówka galaretowata (Pseudohydnum gelatinosum), jasny galaretowaty owocnik z kolczastym spodem",
      image_author: "Björn S...",
      image_source: "https://commons.wikimedia.org/wiki/File:Pseudohydnum_gelatinosum_(37516414602).jpg",
      image_license: "CC BY-SA 2.0",
      license_url: "https://creativecommons.org/licenses/by-sa/2.0/",
      image_modifications: embeddedFromCommons,
      tags: ["galaretka", "kolce", "martwe drewno"]
    },
    "plomyczek-galaretowaty": {
      image_status: "commons_verified",
      image: commonsImage("Guepinia helvelloides 47030.jpg"),
      image_alt: "Płomyczek galaretowaty (Guepinia helvelloides), różowopomarańczowy galaretowaty owocnik",
      image_author: "Daryl Thompson (woobs)",
      image_source: "https://commons.wikimedia.org/wiki/File:Guepinia_helvelloides_47030.jpg",
      image_license: "CC BY-SA 3.0",
      license_url: "https://creativecommons.org/licenses/by-sa/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["galaretka", "płomyk", "różowy"]
    },
    "gwiazda-wieloporowa": {
      image_status: "commons_verified",
      image: commonsImage("Myriostoma coliforme.jpg"),
      image_alt: "Gwiazda wieloporowa (Myriostoma coliforme), gwiazdowaty owocnik z wieloma otworami na główce",
      image_author: "Diana Marcela Rocabado Reyes",
      image_source: "https://commons.wikimedia.org/wiki/File:Myriostoma_coliforme.jpg",
      image_license: "CC BY-SA 3.0",
      license_url: "https://creativecommons.org/licenses/by-sa/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["gwiazda", "wiele otworów", "rzadkość"]
    },
    "gwiazdosz-wzniesiony": {
      image_status: "commons_verified",
      image: commonsImage("Geastrum fornicatum.jpg"),
      image_alt: "Gwiazdosz wzniesiony (Geastrum fornicatum), owocnik wyniesiony na łukowatych ramionach",
      image_author: "Nathan Wilson",
      image_source: "https://commons.wikimedia.org/wiki/File:Geastrum_fornicatum.jpg",
      image_license: "CC BY-SA 3.0",
      license_url: "https://creativecommons.org/licenses/by-sa/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["gwiazda", "łuki", "owocnik wyniesiony"]
    },
    "gwiazdosz-czteropromienny": {
      image_status: "commons_verified",
      image: commonsImage("Geastrum quadrifidum 89496.jpg"),
      image_alt: "Gwiazdosz czteropromienny (Geastrum quadrifidum), mały gwiazdowaty owocnik z czterema ramionami",
      image_author: "Sasata",
      image_source: "https://commons.wikimedia.org/wiki/File:Geastrum_quadrifidum_89496.jpg",
      image_license: "CC BY 3.0",
      license_url: "https://creativecommons.org/licenses/by/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["gwiazda", "cztery ramiona", "mały owocnik"]
    },
    "berloweczka-zimowa": {
      image_status: "commons_verified",
      image: commonsImage("SSL22834 Tulostoma brumale.JPG"),
      image_alt: "Berłóweczka zimowa (Tulostoma brumale), kulista główka na smukłym trzonku",
      image_author: "Jymm",
      image_source: "https://commons.wikimedia.org/wiki/File:SSL22834_Tulostoma_brumale.JPG",
      image_license: "Public domain",
      license_url: "https://commons.wikimedia.org/wiki/Commons:Public_domain",
      image_modifications: embeddedFromCommons,
      tags: ["berło", "sucholubny", "trzonek"]
    },
    "kubek-prazkowany": {
      image_status: "commons_verified",
      image: commonsImage("Gestreifte-Teuerling-Cyathus-striatus.jpg"),
      image_alt: "Kubek prążkowany (Cyathus striatus), małe kubeczki z perydiolkami przypominającymi jajka w gnieździe",
      image_author: "Holger Krisp",
      image_source: "https://commons.wikimedia.org/wiki/File:Gestreifte-Teuerling-Cyathus-striatus.jpg",
      image_license: "CC BY 3.0",
      license_url: "https://creativecommons.org/licenses/by/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["gniazdo", "kubek", "perydiolki"]
    },
    "gniazdniczka-kulista": {
      image_status: "commons_verified",
      image: commonsImage("Crucibulum laeve 432072338.jpg"),
      image_alt: "Gniazdniczka kulista (Crucibulum laeve), drobne ptasie gniazda z perydiolkami",
      image_author: "Matej Frančeškin",
      image_source: "https://commons.wikimedia.org/wiki/File:Crucibulum_laeve_432072338.jpg",
      image_license: "CC BY 4.0",
      license_url: "https://creativecommons.org/licenses/by/4.0/",
      image_modifications: embeddedFromCommons,
      tags: ["gniazdo", "perydiolki", "miniatura"]
    },
    "kolczakowka-niebieska": {
      image_status: "commons_verified",
      image: commonsImage("Hydnellum caeruleum 93507.jpg"),
      image_alt: "Kolczakówka niebieska (Hydnellum caeruleum), niebieskawy owocnik z kolczastym hymenoforem",
      image_author: "Steve Nelsen (sfnelsen)",
      image_source: "https://commons.wikimedia.org/wiki/File:Hydnellum_caeruleum_93507.jpg",
      image_license: "CC BY-SA 3.0",
      license_url: "https://creativecommons.org/licenses/by-sa/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["niebieski", "kolce", "dziwne kolory"]
    },
    "zylkowiec-rozowawy": {
      image_status: "commons_verified",
      image: commonsImage("Rhodotus palmatus 19006798.jpg"),
      image_alt: "Żyłkowiec różowawy (Rhodotus palmatus), różowawy owocnik z wyraźnie żyłkowaną powierzchnią kapelusza",
      image_author: "squirrely",
      image_source: "https://commons.wikimedia.org/wiki/File:Rhodotus_palmatus_19006798.jpg",
      image_license: "CC BY-SA 4.0",
      license_url: "https://creativecommons.org/licenses/by-sa/4.0/",
      image_modifications: embeddedFromCommons,
      tags: ["różowy", "żyłki", "martwe drewno"]
    }
  };

  let patchedCount = 0;
  appData.mushrooms = appData.mushrooms.map((mushroom) => {
    const update = updates[mushroom.id];
    if (!update) return mushroom;
    patchedCount += 1;
    return { ...mushroom, ...update };
  });

  appData.version = "0.4.0-photo-pack-3";
  appData.last_updated = "2026-05-08";
  appData.photo_pack_3 = {
    title: "Wikimedia Commons photo pack 3",
    updated_mushrooms: patchedCount,
    target_total_images: 30,
    note: "Trzecia paczka zdjęć i atrybucji: galaretki, gwiazdy, gniazda oraz wybrane kolorowe osobliwości."
  };
})();
