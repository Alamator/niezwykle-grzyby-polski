(() => {
  const appData = window.MEMENTO_MORI_APP_DATA;
  if (!appData || !Array.isArray(appData.mementoMori)) return;

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
  const ccBy25 = "https://creativecommons.org/licenses/by/2.5/";
  const ccBy30 = "https://creativecommons.org/licenses/by/3.0/";
  const ccBy40 = "https://creativecommons.org/licenses/by/4.0/";
  const ccBySa25 = "https://creativecommons.org/licenses/by-sa/2.5/";
  const ccBySa30 = "https://creativecommons.org/licenses/by-sa/3.0/";
  const ccBySa30Pl = "https://creativecommons.org/licenses/by-sa/3.0/pl/deed.en";
  const ccBySa40 = "https://creativecommons.org/licenses/by-sa/4.0/";

  const photos = {
    "kaplica-czaszek-czermna": photo(
      "2018 Kaplica Czaszek w Kudowie-Zdroju 1.jpg",
      "Wnętrze Kaplicy Czaszek w Czermnej",
      "Jacek Halicki",
      "CC BY 3.0",
      ccBy30
    ),
    "stare-powazki": photo(
      "Stare Powązki 2015.JPG",
      "Aleja na Starych Powązkach w Warszawie",
      "Adrian Grycuk",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    "cmentarz-rakowicki": photo(
      "20225, Kraków, Cmentarz Rakowicki w Krakowie, 11.jpg",
      "Cmentarz Rakowicki w Krakowie",
      "Igor123121",
      "CC BY 4.0",
      ccBy40
    ),
    "peksowy-brzyzek": photo(
      "Stary Cmentarz na Pęksowym Brzyzku (Pęksowy Brzyzek National Cemetery in Zakopane) - panoramio.jpg",
      "Stary Cmentarz na Pęksowym Brzyzku w Zakopanem",
      "MARELBU",
      "CC BY 3.0",
      ccBy30
    ),
    "cmentarz-zydowski-okopowa": photo(
      "Cmentarz żydowski w Warszawie Wola Okopowa Street Jewish Cemetery in Warsaw Poland.jpg",
      "Cmentarz Żydowski przy ulicy Okopowej w Warszawie",
      "Wojciech Domagała",
      "CC BY 3.0",
      ccBy30
    ),
    "nowy-cmentarz-zydowski-lodz": photo(
      "Jewish cemetery Lodz IMGP6736.jpg",
      "Nowy Cmentarz Żydowski w Łodzi",
      "Nikodem Nijaki",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "cmentarz-remuh": photo(
      "Remuh cemetery in Kraków 01.jpg",
      "Cmentarz Remuh w Krakowie",
      "Kritzolina",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "mizar-kruszyniany": photo(
      "Kruszyniany mizar 1.jpg",
      "Mizar tatarski w Kruszynianach",
      "Andrzej Otrębski",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "mizar-bohoniki": photo(
      "Mizar Bohoniki 6.jpg",
      "Mizar muzułmański w Bohonikach",
      "Zala",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "cmentarz-mennonicki-stogi": photo(
      "Cmentarz Mennonicki, Stogi 6.jpg",
      "Cmentarz mennonicki w Stogach Malborskich",
      "AnnaBanasiak",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "cmentarz-wojenny-luzna-pustki": photo(
      "Cmentarz wojenny nr.123 Łużna - Pustki i las krzyży.jpg",
      "Cmentarz wojenny nr 123 Łużna-Pustki",
      "Kacper Jerzak",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "cmentarz-wojenny-magura-malastowska": photo(
      "World War I Cemetery nr 60 in Przełęcz Małastowska (by Pudelek).JPG",
      "Cmentarz wojenny nr 60 na Przełęczy Małastowskiej",
      "Pudelek (Marcin Szala)",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    "rotunda-zamojska": photo(
      "Brama obozu niemieckiego Rotunda Zamojska 1940-1944.jpg",
      "Brama Rotundy Zamojskiej",
      "Ziuteknowocz",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    palmiry: photo(
      "Palmiry cmentarz 2.JPG",
      "Cmentarz wojenny w Palmirach",
      "Natalia Sobiecka",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    "auschwitz-birkenau": photo(
      "Auschwitz II Birkenau.jpg",
      "Teren Auschwitz II-Birkenau w Brzezince",
      "Jacek7770",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    majdanek: photo(
      "Majdanek State Museum (38893).jpg",
      "Państwowe Muzeum na Majdanku",
      "Eran",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    belzec: photo(
      "Bełżec memorial 07.jpg",
      "Muzeum i Miejsce Pamięci w Bełżcu",
      "Dreamcatcher25",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    sobibor: photo(
      "Museum Gedenkstätte Sobibor 2021.jpg",
      "Muzeum i miejsce pamięci w Sobiborze",
      "Hajog",
      "CC BY 4.0",
      ccBy40
    ),
    "kulmhof-chelmno": photo(
      "Kulmhof - pomnik.jpg",
      "Pomnik w miejscu pamięci Kulmhof",
      "Kolanin",
      "CC BY-SA 2.5",
      ccBySa25
    ),
    treblinka: photo(
      "Treblinka memorial 2013 013.JPG",
      "Kamienie i pomnik w miejscu pamięci Treblinka",
      "Adrian Grycuk",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    piasnica: photo(
      "Pomnik Piaśnicki 1955 (Piaśnica Memorial) 2011.jpg",
      "Pomnik Piaśnicki w miejscu pamięci",
      "Marcin Drewa",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    michniow: photo(
      "Michniów. Mauzoleum Martyrologii Wsi Polskich (26).jpg",
      "Mauzoleum Martyrologii Wsi Polskich w Michniowie",
      "Gorofil",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "grob-nieznanego-zolnierza": photo(
      "Grób Nieznanego Żołnierza w Warszawie.JPG",
      "Grób Nieznanego Żołnierza w Warszawie",
      "Piotr Frydecki",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "kopiec-powstania-warszawskiego": photo(
      "Kopiec Powstania Warszawskiego 11.11.2019 (view).jpg",
      "Widok z Kopca Powstania Warszawskiego",
      "MOs810",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "westerplatte-cmentarz": photo(
      "01 Cmentarz Polskich Żołnierzy Poległych Obrońców Westerplatte.jpg",
      "Cmentarz Obrońców Westerplatte",
      "Kancelaria Sejmu",
      "CC BY 2.0",
      ccBy20
    ),
    "kamienne-kregi-odry": photo(
      "Odry kamienie przy kręgu III 02.07.10 p.jpg",
      "Kamienne kręgi w Odrach",
      "Przykuta",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "kamienne-kregi-wesiory": photo(
      "POL Węsiory Kamienne Kręgi Gotów 03.jpg",
      "Kamienne kręgi w Węsiorach",
      "Maria Golinski",
      "CC BY 2.5",
      ccBy25
    ),
    "kopiec-krakusa": photo(
      "Kraków. Kopiec Krakusa.jpg",
      "Kopiec Krakusa w Krakowie",
      "Łukasz Niemiec",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "kopiec-wandy": photo(
      "Kopiec Wandy Krakow 1.jpg",
      "Kopiec Wandy w Krakowie",
      "Travelarz",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "stary-cmentarz-zydowski-wroclaw": photo(
      "Wroclaw Old Jewish Cemetery IMGP7250.jpg",
      "Stary Cmentarz Żydowski we Wrocławiu",
      "Nikodem Nijaki",
      "CC BY-SA 3.0",
      ccBySa30
    )
  };

  for (const item of appData.mementoMori) {
    Object.assign(item, photos[item.id] || {});
  }

  appData.mementoMoriPhotoPack = {
    title: "Memento Mori Commons photo pack v01",
    applied: Object.keys(photos).length,
    source: "Wikimedia Commons",
    note: "Zdjęcia osadzone z atrybucją autora, źródła, licencji i informacją o sposobie użycia. Przy miejscach trudnej historii kadry dobrano bez sensacyjnego tonu."
  };
})();
