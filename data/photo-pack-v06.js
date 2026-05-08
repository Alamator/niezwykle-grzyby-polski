(() => {
  const appData = window.MUSHROOM_APP_DATA;
  if (!appData || !Array.isArray(appData.mushrooms)) return;

  const commonsImage = (fileName) =>
    `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}?width=900`;

  const embeddedFromCommons =
    "osadzenie z Wikimedia Commons przez Special:Redirect; przeglądarka pobiera wersję skalowaną do ok. 900 px; bez lokalnego kopiowania pliku";

  // Final sweep: nie nadpisuje rekordów, które mają już zweryfikowane zdjęcie.
  // Uzupełnia ostatnie braki oraz dwa możliwe zaległe gatunki z wcześniejszych kategorii.
  const updates = {
    "dzbankowka-kulista": {
      image_status: "commons_candidate",
      image: commonsImage("Bombmurkla.jpg"),
      image_alt: "Dzbankówka kulista (Sarcosoma globosum), ciemny beczułkowaty owocnik przypominający mały dzbanek",
      image_author: "Staffan Kyrk",
      image_source: "https://commons.wikimedia.org/wiki/File:Bombmurkla.jpg",
      image_license: "CC BY 3.0",
      license_url: "https://creativecommons.org/licenses/by/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["beczułka", "rzadki workowiec", "ciemny"]
    },
    "czareczka-dlugotrzonkowa": {
      image_status: "commons_candidate",
      image: commonsImage("Microstoma protractum Poland 1.jpg"),
      image_alt: "Czareczka długotrzonkowa (Microstoma protractum), mały czerwony czarkowaty owocnik na długim trzonku",
      image_author: "Piotr Wróblewski",
      image_source: "https://commons.wikimedia.org/wiki/File:Microstoma_protractum_Poland_1.jpg",
      image_license: "CC BY-SA 4.0",
      license_url: "https://creativecommons.org/licenses/by-sa/4.0/",
      image_modifications: embeddedFromCommons,
      tags: ["czerwona czarka", "długi trzonek", "miniaturowy kielich"]
    },
    "kolczakowka-piekaca": {
      image_status: "commons_candidate",
      image: commonsImage("Hydnellum peckii.jpg"),
      image_alt: "Kolczakówka piekąca (Hydnellum peckii), jasny owocnik z czerwonymi kroplami przypominającymi żywicę lub krew",
      image_author: "do weryfikacji w Wikimedia Commons",
      image_source: "https://commons.wikimedia.org/wiki/File:Hydnellum_peckii.jpg",
      image_license: "do weryfikacji",
      license_url: "https://commons.wikimedia.org/wiki/File:Hydnellum_peckii.jpg",
      image_modifications: embeddedFromCommons,
      tags: ["czerwone krople", "kolce", "efekt wow"]
    },
    "kolczakowka-wonna": {
      image_status: "commons_candidate",
      image: commonsImage("Hydnellum suaveolens 51703.jpg"),
      image_alt: "Kolczakówka wonna (Hydnellum suaveolens), bladoniebieskawy owocnik z kolczastym hymenoforem",
      image_author: "Johannes Harnisch (Johann), Mushroom Observer",
      image_source: "https://commons.wikimedia.org/wiki/File:Hydnellum_suaveolens_51703.jpg",
      image_license: "CC BY-SA 3.0",
      license_url: "https://creativecommons.org/licenses/by-sa/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["zapach", "kolce", "niebieskawy"]
    },
    "muchomor-czerwony": {
      image_status: "commons_candidate",
      image: commonsImage("Amanita muscaria 3 vliegenzwammen op rij.jpg"),
      image_alt: "Muchomor czerwony (Amanita muscaria), czerwone kapelusze z białymi łatkami",
      image_author: "do weryfikacji w Wikimedia Commons",
      image_source: "https://commons.wikimedia.org/wiki/File:Amanita_muscaria_3_vliegenzwammen_op_rij.jpg",
      image_license: "do weryfikacji",
      license_url: "https://commons.wikimedia.org/wiki/File:Amanita_muscaria_3_vliegenzwammen_op_rij.jpg",
      image_modifications: embeddedFromCommons,
      tags: ["ikona", "czerwony kapelusz", "białe łatki"]
    },
    "lakownica-lsniaca": {
      image_status: "commons_candidate",
      image: commonsImage("Ganoderma lucidum.jpg"),
      image_alt: "Lakownica lśniąca (Ganoderma lucidum), błyszczący lakierowany owocnik nadrzewny",
      image_author: "do weryfikacji w Wikimedia Commons",
      image_source: "https://commons.wikimedia.org/wiki/File:Ganoderma_lucidum.jpg",
      image_license: "do weryfikacji",
      license_url: "https://commons.wikimedia.org/wiki/File:Ganoderma_lucidum.jpg",
      image_modifications: embeddedFromCommons,
      tags: ["lakier", "nadrzewny", "błyszczący"]
    },
    "pniarek-lekarski": {
      image_status: "commons_candidate",
      image: commonsImage("Fomitopsis officinalis 32014.JPG"),
      image_alt: "Pniarek lekarski (Fomitopsis officinalis), jasny wieloletni owocnik huby na pniu drzewa",
      image_author: "Walter Siegmund",
      image_source: "https://commons.wikimedia.org/wiki/File:Fomitopsis_officinalis_32014.JPG",
      image_license: "CC BY 2.5",
      license_url: "https://creativecommons.org/licenses/by/2.5/",
      image_modifications: embeddedFromCommons,
      tags: ["huba", "pień", "rzadkość"]
    },
    "blyskoporek-podkorowy": {
      image_status: "commons_candidate",
      image: commonsImage("Inonotus obliquus.jpg"),
      image_alt: "Błyskoporek podkorowy (Inonotus obliquus), ciemna nieregularna narośl na pniu brzozy",
      image_author: "do weryfikacji w Wikimedia Commons",
      image_source: "https://commons.wikimedia.org/wiki/File:Inonotus_obliquus.jpg",
      image_license: "do weryfikacji",
      license_url: "https://commons.wikimedia.org/wiki/File:Inonotus_obliquus.jpg",
      image_modifications: embeddedFromCommons,
      tags: ["czaga", "brzoza", "czarna narośl"]
    },
    "gestoporek-cynobrowy": {
      image_status: "commons_candidate",
      image: commonsImage("Zinnober-Tramete Pycnoporus cinnabarinus.jpg"),
      image_alt: "Gęstoporek cynobrowy (Pycnoporus cinnabarinus), intensywnie pomarańczowo-czerwony owocnik na martwym drewnie",
      image_author: "Holger Krisp",
      image_source: "https://commons.wikimedia.org/wiki/File:Zinnober-Tramete_Pycnoporus_cinnabarinus.jpg",
      image_license: "CC BY 3.0",
      license_url: "https://creativecommons.org/licenses/by/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["cynober", "martwe drewno", "pomarańczowy"]
    },
    "maczuznik-bojowy": {
      image_status: "commons_candidate",
      image: commonsImage("Puppen-Kernkeule Cordyceps militaris.jpg"),
      image_alt: "Maczużnik bojowy (Cordyceps militaris), pomarańczowe maczugowate owocniki wyrastające z podłoża związanego z owadami",
      image_author: "Holger Krisp",
      image_source: "https://commons.wikimedia.org/wiki/File:Puppen-Kernkeule_Cordyceps_militaris.jpg",
      image_license: "CC BY 3.0",
      license_url: "https://creativecommons.org/licenses/by/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["owady", "maczugi", "pomarańczowy"]
    },
    "maczuznik-nasiezrzalowy": {
      image_status: "commons_candidate",
      image: commonsImage("Tolypocladium ophioglossoides 154949377.jpg"),
      image_alt: "Maczużnik nasięźrzałowy (Tolypocladium ophioglossoides), ciemny maczugowaty owocnik pasożytujący na podziemnych grzybach",
      image_author: "Tom Zucker-Scharff",
      image_source: "https://commons.wikimedia.org/wiki/File:Tolypocladium_ophioglossoides_154949377.jpg",
      image_license: "CC BY 4.0",
      license_url: "https://creativecommons.org/licenses/by/4.0/",
      image_modifications: embeddedFromCommons,
      tags: ["pasożyt", "maczuga", "podziemne grzyby"]
    },
    "czasznica-olbrzymia": {
      image_status: "commons_candidate",
      image: commonsImage("Riesenbovist Calvatia gigantea.JPG"),
      image_alt: "Czasznica olbrzymia (Calvatia gigantea), duży biały kulisty owocnik na trawie",
      image_author: "Holger Krisp",
      image_source: "https://commons.wikimedia.org/wiki/File:Riesenbovist_Calvatia_gigantea.JPG",
      image_license: "CC BY 3.0",
      license_url: "https://creativecommons.org/licenses/by/3.0/",
      image_modifications: embeddedFromCommons,
      tags: ["olbrzym", "biała kula", "łąka"]
    }
  };

  let patchedCount = 0;
  let skippedVerifiedCount = 0;

  appData.mushrooms = appData.mushrooms.map((mushroom) => {
    const update = updates[mushroom.id];
    if (!update) return mushroom;

    if (mushroom.image_status === "commons_verified" && mushroom.image) {
      skippedVerifiedCount += 1;
      return mushroom;
    }

    patchedCount += 1;
    return { ...mushroom, ...update };
  });

  appData.version = "0.6.1-photo-pack-6-image-fixes";
  appData.last_updated = "2026-05-08";
  appData.photo_pack_6 = {
    title: "Wikimedia Commons final photo sweep",
    updated_mushrooms: patchedCount,
    skipped_verified_mushrooms: skippedVerifiedCount,
    candidate_mushrooms: Object.keys(updates).length,
    target_total_images: 50,
    note: "Ostatnia paczka domykająca brakujące zdjęcia. Nie nadpisuje zdjęć już oznaczonych jako commons_verified; linki wskazują konkretne pliki Commons zamiast niestabilnych przekierowań."
  };
})();
