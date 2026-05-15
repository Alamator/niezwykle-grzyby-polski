(() => {
  const appData = window.FORTRESS_RUIN_APP_DATA;
  if (!appData || !Array.isArray(appData.fortressesRuins)) return;

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

  const ccBy20 = "https://creativecommons.org/licenses/by/2.0/";
  const ccBy30 = "https://creativecommons.org/licenses/by/3.0/";
  const ccBy40 = "https://creativecommons.org/licenses/by/4.0/";
  const ccBySa30 = "https://creativecommons.org/licenses/by-sa/3.0/";
  const ccBySa30Pl = "https://creativecommons.org/licenses/by-sa/3.0/pl/deed.en";
  const ccBySa40 = "https://creativecommons.org/licenses/by-sa/4.0/";
  const publicDomain = "https://creativecommons.org/publicdomain/mark/1.0/";

  const photos = {
    zamosc: photo(
      "Zamość. Rynek Wielki. Pierzeja północna (1).jpg",
      "Pierzeja północna Rynku Wielkiego w Zamościu",
      "Gorofil",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zamek-krzyztopor": photo(
      "Krzyżtopór, Ujazd, województwo świętokrzyskie, 20260117 1431 6848.jpg",
      "Zamek Krzyżtopór w Ujeździe",
      "Jakub Hałun",
      "CC BY 4.0",
      ccBy40
    ),
    "zamek-malbork": photo(
      "Malbork Castle 2023 008.jpg",
      "Zamek w Malborku",
      "Scotch Mist",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "twierdza-srebrna-gora": photo(
      "2016 Twierdza Srebrna Góra.jpg",
      "Twierdza Srebrna Góra",
      "Jacek Halicki",
      "CC BY 3.0",
      ccBy30
    ),
    "zamek-ksiaz": photo(
      "20160502 Zamek Książ 6244.jpg",
      "Zamek Książ w Wałbrzychu",
      "Jakub Hałun",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zamek-ogrodzieniec": photo(
      "Podzamcze, zamek Ogrodzieniec.jpg",
      "Ruiny zamku Ogrodzieniec w Podzamczu",
      "1bumer",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zamek-moszna": photo(
      "20180812 Zamek w Mosznej 1006 8605 DxO.jpg",
      "Zamek w Mosznej",
      "Jakub Hałun",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zamek-lancut": photo(
      "2018 Powiat łańcucki, Łańcut, Zespół zamkowy, Zamek 07.jpg",
      "Zamek w Łańcucie",
      "Marcin Konsek",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zamek-krasiczyn": photo(
      "02020 0678 Krasiczyn Castle in 2020.jpg",
      "Zamek w Krasiczynie",
      "Silar",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zamek-baranow-sandomierski": photo(
      "20180816 Zamek w Baranowie Sandomierskim 1545 8967 DxO.jpg",
      "Zamek w Baranowie Sandomierskim",
      "Jakub Hałun",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zamek-janowiec": photo(
      "Janowiec1 (js).jpg",
      "Ruiny zamku w Janowcu",
      "Jerzy Strzelecki",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "zamek-czocha": photo(
      "Czocha Castle 01.jpg",
      "Zamek Czocha",
      "Scotch Mist",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zamek-bolkow": photo(
      "Bolków - castle 01.jpg",
      "Zamek Bolków",
      "Paweł 'pbm' Szubert",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "zamek-chojnik": photo(
      "Chojnik Castle 01.jpg",
      "Zamek Chojnik",
      "Scotch Mist",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zamek-niedzica": photo(
      "20170305 Niedzica zamek 5195.jpg",
      "Zamek Niedzica nad Jeziorem Czorsztyńskim",
      "Jakub Hałun",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zamek-czorsztyn": photo(
      "20180414 Zamek Czorsztyn 2310 DxO.jpg",
      "Ruiny zamku Czorsztyn nad Jeziorem Czorsztyńskim",
      "Jakub Hałun",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zamek-pieskowa-skala": photo(
      "Pieskowa Skała castle, October 2020 (1).jpg",
      "Zamek Pieskowa Skała",
      "MichalPL",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zamki-mirow-bobolice": photo(
      "Bobolice i Mirów 2013-08-15 117.JPG",
      "Ruiny zamku w Mirowie, kadr reprezentatywny dla pary Mirów i Bobolice",
      "Hania Pydynowska",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    "zamek-tenczyn-rudno": photo(
      "20190127 Zamek Tenczyn w Rudnie 1109 1372 DxO.jpg",
      "Zamek Tenczyn w Rudnie",
      "Jakub Hałun",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "mysia-wieza-kruszwica": photo(
      "Mysia Wieża (Mouse Tower).jpg",
      "Mysia Wieża w Kruszwicy",
      "Gornypatryk",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zamek-bedzin": photo(
      "Zamek w Będzinie.jpg",
      "Zamek w Będzinie",
      "Lestat (Jan Mehlich)",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "twierdza-modlin": photo(
      "Twierdzamodlinwidok.jpg",
      "Widok na Twierdzę Modlin z lotu ptaka",
      "Gaszerbrum",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "twierdza-klodzko": photo(
      "2013 Kłodzko, twierdza 52.jpg",
      "Twierdza Kłodzko",
      "Halicki",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    "twierdza-przemysl": photo(
      "Fort W I \"Salis Soglio\" - panoramio.jpg",
      "Fort W I Salis Soglio, część Twierdzy Przemyśl",
      "MSzybalski",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "twierdza-boyen": photo(
      "Twierdza Boyen. Giżycko. - panoramio.jpg",
      "Twierdza Boyen w Giżycku",
      "Lech_Darski",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "twierdza-osowiec": photo(
      "Osowiec, Twierdza Osowiec, budynki koszarowe i gospodarcze (2).JPG",
      "Budynki koszarowe i gospodarcze Twierdzy Osowiec",
      "Bazie",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    "wilczy-szaniec": photo(
      "Poland. Kętrzyn. Gierłoż. Wolf's Lair 037.JPG",
      "Ruiny Wilczego Szańca w Gierłoży",
      "Albertyanks, Albert Jankowski",
      "Public domain",
      publicDomain
    ),
    westerplatte: photo(
      "Gdańsk Westerplatte (1).JPG",
      "Westerplatte w Gdańsku",
      "Tomasz Przechlewski",
      "CC BY 2.0",
      ccBy20
    ),
    "wiadukty-stanczyki": photo(
      "Stanczyki viaduct.jpg",
      "Wiadukt w Stańczykach",
      "Joost van Os",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "wiadukty-kiepojcie": photo(
      "Kiepojcie wiadukty kolejowe 11.jpg",
      "Wiadukty kolejowe w Kiepojciach",
      "Zala",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "palac-kopice": photo(
      "Pałac Schaffgotschów w Kopicach - ruiny pałacu-Kopice-2049-0026-RIKiWK-MCD.jpg",
      "Ruiny Pałacu Schaffgotschów w Kopicach",
      "Adam Rostecki / Regionalny Instytut Kultury w Katowicach",
      "CC BY 4.0",
      ccBy40
    ),
    "palac-slobity": photo(
      "Słobity-pałac-ruina.jpg",
      "Ruiny pałacu w Słobitach",
      "Kuba1664",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    "zamek-lapalice": photo(
      "Łapalice – zamek.JPG",
      "Niedokończony zamek w Łapalicach",
      "Tomasz Przechlewski",
      "CC BY 2.0",
      ccBy20
    )
  };

  for (const item of appData.fortressesRuins) {
    Object.assign(item, photos[item.id] || {});
  }

  appData.fortressesRuinsPhotoPack = {
    title: "Fortresses and ruins Commons photo pack v01",
    applied: Object.keys(photos).length,
    source: "Wikimedia Commons",
    note: "Zdjęcia osadzone z atrybucją autora, źródła, licencji i informacją o sposobie użycia. Kadry reprezentatywne są oznaczone w opisie alternatywnym."
  };
})();
