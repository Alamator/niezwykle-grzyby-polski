(() => {
  const appData = window.MUSHROOM_APP_DATA;
  if (!appData || !Array.isArray(appData.mushrooms)) return;

  const commonsImage = (fileName) =>
    `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}?width=900`;

  const embeddedFromCommons =
    "osadzenie z Wikimedia Commons przez Special:Redirect; przeglądarka pobiera wersję skalowaną do ok. 900 px; bez lokalnego kopiowania pliku";

  const updates = {
    "madziak-psi": {
      image_status: "commons_verified",
      image: commonsImage("Mutinus caninus 16.jpg"),
      image_alt: "Mądziak psi (Mutinus caninus), smukły owocnik z ciemną masą zarodnikową na szczycie",
      image_author: "JovanaKoturov",
      image_source: "https://commons.wikimedia.org/wiki/File:Mutinus_caninus_16.jpg",
      image_license: "CC BY-SA 4.0",
      license_url: "https://creativecommons.org/licenses/by-sa/4.0/",
      image_modifications: embeddedFromCommons,
      tags: ["zapach", "owady", "leśna antena"]
    },
    "sromotnik-fiolkowy": {
      image_status: "commons_verified",
      image: commonsImage("Phallus hadriani sl14.jpg"),
      image_alt: "Sromotnik fiołkowy (Phallus hadriani), rozwinięty owocnik na piaszczystym podłożu",
      image_author: "Stefan.lefnaer",
      image_source: "https://commons.wikimedia.org/wiki/File:Phallus_hadriani_sl14.jpg",
      image_license: "CC BY-SA 4.0",
      license_url: "https://creativecommons.org/licenses/by-sa/4.0/",
      image_modifications: embeddedFromCommons,
      tags: ["zapach", "stadium jaja", "wydmy"]
    },
    "kustrzebka-pomaranczowa": {
      image_status: "commons_verified",
      image: commonsImage("Aleuria-aurantia.jpg"),
      image_alt: "Kustrzebka pomarańczowa (Aleuria aurantia), pomarańczowy czarkowaty owocnik na ziemi",
      image_author: "Holger Krisp",
      image_source: "https://commons.wikimedia.org/wiki/File:Aleuria-aurantia.jpg",
      image_license: "CC BY 3.0 / GFDL",
      license_url: "https://creativecommons.org/licenses/by/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["skórka pomarańczy", "workowiec", "czarka"]
    },
    "piestrzenica-kasztanowata": {
      image_status: "commons_verified",
      image: commonsImage("Gyromitra esculenta.jpg"),
      image_alt: "Piestrzenica kasztanowata (Gyromitra esculenta), brunatny pofałdowany owocnik przypominający mózg",
      image_author: "Аимаина хикари",
      image_source: "https://commons.wikimedia.org/wiki/File:Gyromitra_esculenta.jpg",
      image_license: "Public domain",
      license_url: "https://commons.wikimedia.org/wiki/Commons:Public_domain",
      image_modifications: embeddedFromCommons,
      tags: ["trujący", "fałszywy smardz", "mózg"]
    },
    "smardz-jadalny": {
      image_status: "commons_verified",
      image: commonsImage("Speise-Morchel Morchella esculenta.jpg"),
      image_alt: "Smardz jadalny (Morchella esculenta), jasny owocnik o strukturze plastra miodu",
      image_author: "Holger Krisp",
      image_source: "https://commons.wikimedia.org/wiki/File:Speise_Morchel_Morchella_esculenta.jpg",
      image_license: "CC BY 3.0",
      license_url: "https://creativecommons.org/licenses/by/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["plaster miodu", "wiosna", "pomyłki"]
    },
    "smardz-wyniosly": {
      image_status: "commons_verified",
      image: commonsImage("Spitz-Morchel Morchella elata.jpg"),
      image_alt: "Smardz wyniosły (Morchella elata), ciemny stożkowaty owocnik z jamkami",
      image_author: "Holger Krisp",
      image_source: "https://commons.wikimedia.org/wiki/File:Spitz-Morchel_Morchella_elata.jpg",
      image_license: "CC BY 3.0",
      license_url: "https://creativecommons.org/licenses/by/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["plaster miodu", "wiosna", "stożek"]
    },
    "soplowka-bukowa": {
      image_status: "commons_verified",
      image: commonsImage("Hericium-coralloides.jpg"),
      image_alt: "Soplówka bukowa (Hericium coralloides), biały rozgałęziony owocnik na martwym drewnie",
      image_author: "Gerhard Elsner",
      image_source: "https://commons.wikimedia.org/wiki/File:Hericium-coralloides.jpg",
      image_license: "CC BY 3.0 / GFDL",
      license_url: "https://creativecommons.org/licenses/by/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["sople", "martwe drewno", "koralowiec"]
    },
    "swiecznica-rozgaleziona": {
      image_status: "commons_verified",
      image: commonsImage("Artomyces pyxidatus (38109610811).jpg"),
      image_alt: "Świecznica rozgałęziona (Artomyces pyxidatus), koralowe gałązki z koronkowymi końcówkami",
      image_author: "Björn S...",
      image_source: "https://commons.wikimedia.org/wiki/File:Artomyces_pyxidatus_(38109610811).jpg",
      image_license: "CC BY-SA 2.0",
      license_url: "https://creativecommons.org/licenses/by-sa/2.0/",
      image_modifications: embeddedFromCommons,
      tags: ["korale", "koronki", "martwe drewno"]
    },
    "pieknorog-lepki": {
      image_status: "commons_verified",
      image: commonsImage("Calocera viscosa (36078920944).jpg"),
      image_alt: "Pięknoróg lepki (Calocera viscosa), żółtopomarańczowe rogi na drewnie",
      image_author: "Björn S...",
      image_source: "https://commons.wikimedia.org/wiki/File:Calocera_viscosa_(36078920944).jpg",
      image_license: "CC BY-SA 2.0",
      license_url: "https://creativecommons.org/licenses/by-sa/2.0/",
      image_modifications: embeddedFromCommons,
      tags: ["żółte rogi", "drewno iglaste", "galaretowaty"]
    },
    "galaretnica-miesista": {
      image_status: "commons_verified",
      image: commonsImage("20251129 Ascocoryne sarcoides 01.jpg"),
      image_alt: "Galaretnica mięsista (Ascocoryne sarcoides), fioletowo-różowe galaretowate owocniki na korze martwego drzewa",
      image_author: "Flocci Nivis",
      image_source: "https://commons.wikimedia.org/wiki/File:20251129_Ascocoryne_sarcoides_01.jpg",
      image_license: "CC BY 4.0",
      license_url: "https://creativecommons.org/licenses/by/4.0/",
      image_modifications: embeddedFromCommons,
      tags: ["fiolet", "galaretka", "martwe drewno"]
    }
  };

  let patchedCount = 0;
  appData.mushrooms = appData.mushrooms.map((mushroom) => {
    const update = updates[mushroom.id];
    if (!update) return mushroom;
    patchedCount += 1;
    return { ...mushroom, ...update };
  });

  appData.version = "0.3.0-photo-pack-2";
  appData.last_updated = "2026-05-08";
  appData.photo_pack_2 = {
    title: "Wikimedia Commons photo pack 2",
    updated_mushrooms: patchedCount,
    note: "Druga paczka zdjęć i atrybucji ładowana po głównym pliku danych, żeby nie ryzykować naruszenia działającego MVP."
  };
})();
