(() => {
  const appData = window.ROCK_FORMATION_APP_DATA;
  if (!appData || !Array.isArray(appData.formations)) return;

  const commonsImage = (fileName) =>
    `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}?width=900`;

  const commonsFilePage = (fileName) =>
    `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fileName).replace(/%20/g, "_")}`;

  const embeddedFromCommons =
    "osadzenie z Wikimedia Commons przez Special:Redirect; przeglądarka pobiera wersję skalowaną do ok. 900 px; bez lokalnego kopiowania pliku";

  const photo = (fileName, alt, author, license, licenseUrl) => ({
    image: commonsImage(fileName),
    image_alt: alt,
    image_author: author,
    image_source: commonsFilePage(fileName),
    image_license: license,
    license_url: licenseUrl,
    image_modifications: embeddedFromCommons
  });

  const ccBy30 = "https://creativecommons.org/licenses/by/3.0";
  const ccBy40 = "https://creativecommons.org/licenses/by/4.0";
  const ccBySa30 = "https://creativecommons.org/licenses/by-sa/3.0";
  const ccBySa30Pl = "https://creativecommons.org/licenses/by-sa/3.0/pl/deed.en";
  const ccBySa40 = "https://creativecommons.org/licenses/by-sa/4.0";
  const publicDomain = "https://creativecommons.org/publicdomain/mark/1.0/";

  const photos = {
    slonecznik: photo(
      "Słonecznik (Mittagstein, Polední kámen) in the winter 2018 02.jpg",
      "Słonecznik w Karkonoszach, granitowa skałka widoczna zimą ponad szlakiem",
      "Pudelek",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    pielgrzymy: photo(
      "Pielgrzymy - Karkonosze.JPG",
      "Pielgrzymy w Karkonoszach, grupa wysokich granitowych bloków i baszt",
      "Mira440",
      "CC BY-SA 3.0 pl",
      ccBySa30Pl
    ),
    "dziurawa-skala": photo(
      "Wikiexpedice Dolní Slezsko, Dziurawa Skała 02.jpg",
      "Dziurawa Skała z widocznym oknem w granitowej formie",
      "MIGORMCZ",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "trzy-swinki": photo(
      "Trzy świnki.jpg",
      "Trzy Świnki, karkonoskie bloki granitowe o charakterystycznej sylwetce",
      "Wiktor Baron",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    chojnik: photo(
      "Zamek Chojnik.jpg",
      "Zamek Chojnik na granitowym wzgórzu, kadr reprezentujący skalną podstawę Chojnika",
      "FxJ",
      "Public domain",
      publicDomain
    ),
    "male-organy-mysliborskie": photo(
      "Małe Organy Myśliborskie 2021.jpg",
      "Małe Organy Myśliborskie, bazaltowe słupy widoczne w dawnym odsłonięciu",
      "Zorro2212",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "organy-wielislawskie": photo(
      "2010-07 Organy Wielisławskie (3).jpg",
      "Organy Wielisławskie, ściana skał wulkanicznych z wyraźnym ciosem słupowym",
      "Marek Mróz",
      "CC BY 4.0",
      ccBy40
    ),
    "kolorowe-jeziorka": photo(
      "Rudawy Janowickie, kolorowe jeziorka - purpurowe.jpg",
      "Purpurowe jeziorko w Rudawach Janowickich, pogórniczy zbiornik o intensywnej barwie",
      "Monika Ćwiklińska",
      "CC BY 3.0",
      ccBy30
    ),
    "szczeliniec-wielki": photo(
      "2015 Szczeliniec Wielki 02.JPG",
      "Szczeliniec Wielki, piaskowcowe ściany i szczeliny na trasie turystycznej",
      "Jacek Halicki",
      "CC BY-SA 3.0 pl",
      ccBySa30Pl
    ),
    "bledne-skaly": photo(
      "Błędne Skały.jpg",
      "Błędne Skały, wąskie przejście w piaskowcowym labiryncie",
      "Op",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "biale-skaly": photo(
      "Biale Skaly.jpg",
      "Białe Skały w Górach Stołowych, jasne piaskowcowe ściany w lesie",
      "Zp",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "skalne-grzyby": photo(
      "Skalne Grzyby 001.jpg",
      "Skalne Grzyby w Górach Stołowych, piaskowcowa forma z wyraźnym kapeluszem",
      "Zala",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "czartowskie-skaly": photo(
      "Czartowskie Skały (Zawory) 1.jpg",
      "Czartowskie Skały w Zaworach, leśne piaskowcowe bloki i progi",
      "Karol Karolus",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "skalna-czaszka": photo(
      "2024-08 Radkowskie Skały (2).jpg",
      "Kadr reprezentatywny: piaskowce Gór Stołowych w pobliżu tras do Skalnej Czaszki",
      "Marek Mróz",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "radkowskie-skaly": photo(
      "2024-08 Radkowskie Skały (18).jpg",
      "Radkowskie Skały w Górach Stołowych, piaskowcowe bloki i leśne przejście",
      "Marek Mróz",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "diabelska-maczuga-gorzeszow": photo(
      "2025 Diabelska Maczuga w Gorzeszowie (1).jpg",
      "Diabelska Maczuga w Gorzeszowie, samotny piaskowcowy ostaniec",
      "Jacek Halicki",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "maczuga-herkulesa": photo(
      "20190525 Maczuga Herkulesa Pieskowa Skała 0827 2500 DxO.jpg",
      "Maczuga Herkulesa koło Pieskowej Skały, wapienny ostaniec na wąskiej podstawie",
      "Jakub Hałun",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "brama-krakowska": photo(
      "Ojcow Brama Krakowska.jpg",
      "Brama Krakowska w Dolinie Prądnika, naturalny portal z jurajskiego wapienia",
      "Andrzej Otrębski",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "brama-bolechowicka": photo(
      "Brama Bolechowicka DK33.jpg",
      "Brama Bolechowicka, wapienne ściany otwierające dolinę",
      "Jerzy Opioła",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "okiennik-wielki": photo(
      "Okiennik Wielki.jpg",
      "Okiennik Wielki, wapienny ostaniec z dużym naturalnym oknem",
      "Przemysław Jahr",
      "Public domain",
      publicDomain
    ),
    "skala-milosci-mstow": photo(
      "Skała Miłości w Mstowie DK18.jpg",
      "Skała Miłości w Mstowie, wapienny ostaniec nad Wartą",
      "Jerzy Opioła",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "gora-zborow": photo(
      "Góra Zborów DK11 (12).jpg",
      "Góra Zborów, zespół białych wapiennych ostańców Jury",
      "Jerzy Opioła",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    giewont: photo(
      "Zakopane Giewont 1.jpg",
      "Giewont nad Zakopanem, charakterystyczny tatrzański masyw o profilu śpiącego rycerza",
      "Andrzej Otrębski",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "przelom-bialki": photo(
      "Przełom Białki a4.jpg",
      "Przełom Białki, wapienne skałki i nurt rzeki między Obłazową a Kramnicą",
      "Jerzy Opioła",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    przadki: photo(
      "Prządki Czarnorzeki 2c.jpg",
      "Prządki w Czarnorzekach, piaskowcowe ostańce o postaciowych sylwetkach",
      "Stanisław Szydło",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "skamieniale-miasto": photo(
      "Orzeł Skamieniałe Miasto SM1.jpg",
      "Skamieniałe Miasto w Ciężkowicach, piaskowcowa forma Orzeł",
      "Jerzy Opioła",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "diable-skaly-bukowiec": photo(
      "Grzyb (rezerwat Diable Skały) PCR15.jpg",
      "Diable Skały w Bukowcu, piaskowcowa forma grzybowa w leśnym rezerwacie",
      "Jerzy Opioła",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zezow-czarne-dzialy": photo(
      "Tymbark panorama.jpg",
      "Kadr reprezentatywny: panorama okolic Tymbarku i Beskidu Wyspowego dla Zęzowa i Czarnych Działów",
      "Jerzy Opioła",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "skalki-pieklo-nieklan": photo(
      "2025 Skałki Piekło pod Niekłaniem 12.jpg",
      "Skałki Piekło pod Niekłaniem, fantazyjne piaskowcowe formy w lesie",
      "Zala",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    kadzielnia: photo(
      "Kielce, Kadzielnia, KsP 01.jpg",
      "Kadzielnia w Kielcach, dawny kamieniołom wapieni z jeziorem i odsłonięciami",
      "Krzysztof Popławski",
      "CC BY 4.0",
      ccBy40
    ),
    krzemionki: photo(
      "Krzemionki 20150519 6496.jpg",
      "Krzemionki, teren pradziejowych kopalń krzemienia pasiastego",
      "Jakub Hałun",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "glaz-tryglaw": photo(
      "Głaz Trygław.JPG",
      "Głaz Trygław w Tychowie, ogromny głaz narzutowy pozostawiony przez lądolód",
      "Brogaj",
      "Public domain",
      publicDomain
    ),
    "groty-mechowskie": photo(
      "Mechowo, groty mechowskie 1.jpg",
      "Groty Mechowskie, piaskowcowo-zlepieńcowe wnętrze z delikatnymi kolumienkami",
      "1bumer",
      "CC BY-SA 4.0",
      ccBySa40
    )
  };

  for (const formation of appData.formations) {
    Object.assign(formation, photos[formation.id] || {});
  }

  appData.rock_formation_photo_pack_v01 = {
    title: "Wikimedia Commons photo pack v01",
    applied: Object.keys(photos).length,
    source: "Wikimedia Commons",
    note: "Zdjęcia osadzone z atrybucją autora, źródła, licencji i informacją o sposobie użycia. Dla Skalnej Czaszki użyto kadru reprezentatywnego z Gór Stołowych, ponieważ nie znaleziono pewnego pliku Commons tej konkretnej formy."
  };
})();
