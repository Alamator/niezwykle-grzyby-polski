(() => {
  const appData = window.FISH_APP_DATA;
  if (!appData || !Array.isArray(appData.fish)) return;

  const commonsImage = (fileName) =>
    `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}?width=900`;

  const embeddedFromCommons =
    "osadzenie z Wikimedia Commons przez Special:Redirect; przeglądarka pobiera wersję skalowaną do ok. 900 px; bez lokalnego kopiowania pliku";

  const photo = (fileName, alt, author, source, license, licenseUrl) => ({
    image: commonsImage(fileName),
    image_alt: alt,
    image_author: author,
    image_source: source,
    image_license: license,
    license_url: licenseUrl,
    image_modifications: embeddedFromCommons
  });

  const photos = {
    stynka: photo(
      "Osmerus eperlanus 214346016.jpg",
      "Stynka (Osmerus eperlanus), smukła srebrzysta ryba widziana z boku",
      "Nasser Halaweh",
      "https://commons.wikimedia.org/wiki/File:Osmerus_eperlanus_214346016.jpg",
      "CC BY 4.0",
      "https://creativecommons.org/licenses/by/4.0/"
    ),
    lipien: photo(
      "Grayling Thymallus thymallus.JPG",
      "Lipień (Thymallus thymallus), ryba z dużą płetwą grzbietową pod wodą",
      "High Plains Grifter",
      "https://commons.wikimedia.org/wiki/File:Grayling_Thymallus_thymallus.JPG",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "kur-diabel": photo(
      "Myoxocephalus scorpius 01.jpg",
      "Kur diabeł (Myoxocephalus scorpius), ryba z szeroką kolczastą głową na dnie",
      "TinoStrauss",
      "https://commons.wikimedia.org/wiki/File:Myoxocephalus_scorpius_01.jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    piskorz: photo(
      "Misgurnus fossilis 2009 G1.jpg",
      "Piskorz (Misgurnus fossilis), wydłużona ryba o wąsikach przy pysku",
      "George Chernilevsky",
      "https://commons.wikimedia.org/wiki/File:Misgurnus_fossilis_2009_G1.jpg",
      "Public domain",
      "https://creativecommons.org/publicdomain/mark/1.0/"
    ),
    "murowy-swiecik": photo(
      "Maurolicus muelleri ventral.jpg",
      "Murowy świecik (Maurolicus muelleri), mała srebrzysta ryba z widoczną stroną brzuszną",
      "HulloThere",
      "https://commons.wikimedia.org/wiki/File:Maurolicus_muelleri_ventral.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    tasza: photo(
      "Cyclopterus lumpus female.jpg",
      "Tasza (Cyclopterus lumpus), krępa morska ryba o guzowatej sylwetce",
      "Clumpus",
      "https://commons.wikimedia.org/wiki/File:Cyclopterus_lumpus_female.jpg",
      "CC BY 4.0",
      "https://creativecommons.org/licenses/by/4.0/"
    ),
    dennik: photo(
      "Liparis liparis.jpg",
      "Dennik (Liparis liparis), ilustracja miękkiej ryby przydennej",
      "P. Roetter",
      "https://commons.wikimedia.org/wiki/File:Liparis_liparis.jpg",
      "Public domain",
      "https://creativecommons.org/publicdomain/mark/1.0/"
    ),
    stornia: photo(
      "Platichthys flesus 1.jpg",
      "Stornia (Platichthys flesus), płaska ryba widziana od strony grzbietowej",
      "Hans Hillewaert",
      "https://commons.wikimedia.org/wiki/File:Platichthys_flesus_1.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    wezynka: photo(
      "Nerophis ophidion2.JPG",
      "Wężynka (Nerophis ophidion), długa cienka ryba igliczniowata",
      "Yuriy Kvach",
      "https://commons.wikimedia.org/wiki/File:Nerophis_ophidion2.JPG",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    iglicznia: photo(
      "Syngnathus typhle Limnos 3.jpg",
      "Iglicznia (Syngnathus typhle), morska ryba o sztywnym ciele i rurkowatym pysku",
      "Roberto Pillon",
      "https://commons.wikimedia.org/wiki/File:Syngnathus_typhle_Limnos_3.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    koza: photo(
      "Steinbeisser 001.jpg",
      "Koza (Cobitis taenia), drobna ryba o plamistym wzorze na jasnym tle",
      "J.C. Harf",
      "https://commons.wikimedia.org/wiki/File:Steinbeisser_001.jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    jazgarz: photo(
      "Gymnocephalus cernuus Pärnu River Estonia 2010-01-06.jpg",
      "Jazgarz (Gymnocephalus cernua), kolczasta ryba denna widziana z boku",
      "Tiit Hunt",
      "https://commons.wikimedia.org/wiki/File:Gymnocephalus_cernuus_P%C3%A4rnu_River_Estonia_2010-01-06.jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    wegorzyca: photo(
      "3 specimens of Zoarces viviparus.jpg",
      "Węgorzyca (Zoarces viviparus), trzy wydłużone osobniki ułożone obok siebie",
      "Yuriy Kvach",
      "https://commons.wikimedia.org/wiki/File:3_specimens_of_Zoarces_viviparus.jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    rozanka: photo(
      "RhodeusSericeusBitterlingMaleSpawningColors.jpg",
      "Różanka (Rhodeus amarus), samiec w intensywnych barwach godowych",
      "Viridiflavus",
      "https://commons.wikimedia.org/wiki/File:RhodeusSericeusBitterlingMaleSpawningColors.jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    mietus: photo(
      "Burbot (Lota lota) (52881169184).jpg",
      "Miętus (Lota lota), wydłużona ryba dorszowata z wąsem na brodzie",
      "USFWS Mountain-Prairie",
      "https://commons.wikimedia.org/wiki/File:Burbot_(Lota_lota)_(52881169184).jpg",
      "Public domain",
      "https://creativecommons.org/publicdomain/mark/1.0/"
    ),
    "wegorz-europejski": photo(
      "Anguillidae Anguilla anguilla 1.jpg",
      "Węgorz europejski (Anguilla anguilla), długie wężowate ciało w wodzie",
      "NasserHalaweh",
      "https://commons.wikimedia.org/wiki/File:Anguillidae_Anguilla_anguilla_1.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    ciernik: photo(
      "Gasterosteus aculeatus - Epinoche - Three-spined stickleback.jpg",
      "Ciernik (Gasterosteus aculeatus), mała ryba z kolcami na grzbiecie",
      "Gilles San Martin",
      "https://commons.wikimedia.org/wiki/File:Gasterosteus_aculeatus_-_Epinoche_-_Three-spined_stickleback.jpg",
      "CC BY-SA 2.0",
      "https://creativecommons.org/licenses/by-sa/2.0/"
    ),
    cierniczek: photo(
      "Pungitius pungitius.jpg",
      "Cierniczek (Pungitius pungitius), drobna ryba z wieloma małymi kolcami grzbietowymi",
      "Piet Spaans",
      "https://commons.wikimedia.org/wiki/File:Pungitius_pungitius.jpg",
      "Public domain",
      "https://creativecommons.org/publicdomain/mark/1.0/"
    ),
    sapa: photo(
      "Ballerus sapa.JPG",
      "Sapa (Ballerus sapa), srebrzysta ryba karpiowata z dużymi oczami",
      "Vladimir Yu. Arkhipov, Arkhivov",
      "https://commons.wikimedia.org/wiki/File:Ballerus_sapa.JPG",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    slonecznica: photo(
      "LeucaspiusDelineatusMale.JPG",
      "Słonecznica (Leucaspius delineatus), mała srebrzysta ryba widziana z boku",
      "Viridiflavus",
      "https://commons.wikimedia.org/wiki/File:LeucaspiusDelineatusMale.JPG",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    swinka: photo(
      "Chondrostoma nasus (aka).jpg",
      "Świnka (Chondrostoma nasus), ryba karpiowata o dolnym pysku",
      "André Karwath aka Aka",
      "https://commons.wikimedia.org/wiki/File:Chondrostoma_nasus_(aka).jpg",
      "CC BY-SA 2.5",
      "https://creativecommons.org/licenses/by-sa/2.5/"
    ),
    bolen: photo(
      "Aspius aspius.jpg",
      "Boleń (Aspius aspius), smukła drapieżna ryba karpiowata",
      "Jenny Glans",
      "https://commons.wikimedia.org/wiki/File:Aspius_aspius.jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    sielawa: photo(
      "Coregonus albula.jpg",
      "Sielawa (Coregonus albula), srebrzysta ryba jeziorowa widziana z boku",
      "Markus Kauppinen",
      "https://commons.wikimedia.org/wiki/File:Coregonus_albula.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    rozpior: photo(
      "Ballerus ballerus (Abramis ballerus) - Swedish Museum of Natural History - Stockholm, Sweden - DSC00596.JPG",
      "Rozpiór (Ballerus ballerus), okaz muzealny ryby karpiowatej widziany z boku",
      "Daderot",
      "https://commons.wikimedia.org/wiki/File:Ballerus_ballerus_(Abramis_ballerus)_-_Swedish_Museum_of_Natural_History_-_Stockholm,_Sweden_-_DSC00596.JPG",
      "CC0 1.0",
      "https://creativecommons.org/publicdomain/zero/1.0/"
    ),
    krap: photo(
      "Blicca bjoerkna Finland.jpg",
      "Krąp (Blicca bjoerkna), srebrzysta ryba podobna do leszcza",
      "mikaelnyman",
      "https://commons.wikimedia.org/wiki/File:Blicca_bjoerkna_Finland.jpg",
      "CC BY 4.0",
      "https://creativecommons.org/licenses/by/4.0/"
    ),
    samoglow: photo(
      "Mola mola ocean sunfish Monterey Bay Aquarium 1.jpg",
      "Samogłów (Mola mola), duża ryba oceaniczna o wysokim ciele",
      "Fred Hsu",
      "https://commons.wikimedia.org/wiki/File:Mola_mola_ocean_sunfish_Monterey_Bay_Aquarium_1.jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    "lis-morski": photo(
      "Alopias vulpinus noaa2.jpg",
      "Lis morski (Alopias vulpinus), rekin z bardzo wydłużoną górną częścią ogona",
      "NOAA/PIER",
      "https://commons.wikimedia.org/wiki/File:Alopias_vulpinus_noaa2.jpg",
      "Public domain",
      "https://creativecommons.org/publicdomain/mark/1.0/"
    ),
    "zebacz-smugowy": photo(
      "Anarhichas-lupus-Atlanterhavsparken.jpg",
      "Zębacz smugowy (Anarhichas lupus), morska ryba o masywnej głowie",
      "Bjørn Christian Tørrissen",
      "https://commons.wikimedia.org/wiki/File:Anarhichas-lupus-Atlanterhavsparken.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    lamna: photo(
      "Lamna nasus csiro-nfc.jpg",
      "Lamna (Lamna nasus), rekin śledziowy o torpedowatej sylwetce",
      "CSIRO National Fish Collection",
      "https://commons.wikimedia.org/wiki/File:Lamna_nasus_csiro-nfc.jpg",
      "CC BY 3.0",
      "https://creativecommons.org/licenses/by/3.0/"
    ),
    "wstegor-krolewski": photo(
      "Regalecus glesne, Naturhistorisches Museum Wien.jpg",
      "Wstęgor królewski (Regalecus glesne), długi okaz muzealny ryby wstęgowej",
      "Sandstein",
      "https://commons.wikimedia.org/wiki/File:Regalecus_glesne,_Naturhistorisches_Museum_Wien.jpg",
      "CC BY 3.0",
      "https://creativecommons.org/licenses/by/3.0/"
    ),
    "czebaczek-amurski": photo(
      "Pseudorasbora parva(edited version).jpg",
      "Czebaczek amurski (Pseudorasbora parva), mała ryba karpiowata widziana z boku",
      "Seotaro; cleaned up and denoised by Estrilda; edited by Laitche",
      "https://commons.wikimedia.org/wiki/File:Pseudorasbora_parva(edited_version).jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    "babka-bycza": photo(
      "Neogobius melanostomus, Serhiivka.jpg",
      "Babka bycza (Neogobius melanostomus), ryba denna na jasnym tle",
      "Yuriy Kvach",
      "https://commons.wikimedia.org/wiki/File:Neogobius_melanostomus,_Serhiivka.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    )
  };

  const missingImages = [];

  for (const fish of appData.fish) {
    const curatedPhoto = photos[fish.id];
    if (curatedPhoto) {
      Object.assign(fish, curatedPhoto);
    } else {
      missingImages.push(fish.id);
    }
  }

  window.FISH_APP_DATA.fish_photo_pack_v01 = {
    title: "Wikimedia Commons photo pack for fish curiosities",
    source: "Wikimedia Commons",
    curated: "2026-05-10",
    added_images: Object.keys(photos).length,
    missing_images: missingImages
  };
})();
