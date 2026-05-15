(() => {
  const appData = window.WOODEN_ARCHITECTURE_APP_DATA;
  if (!appData || !Array.isArray(appData.woodenArchitecture)) return;

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

  const ccBy30 = "https://creativecommons.org/licenses/by/3.0/";
  const ccBy40 = "https://creativecommons.org/licenses/by/4.0/";
  const ccBySa20 = "https://creativecommons.org/licenses/by-sa/2.0/";
  const ccBySa30 = "https://creativecommons.org/licenses/by-sa/3.0/";
  const ccBySa30Pl = "https://creativecommons.org/licenses/by-sa/3.0/pl/deed.en";
  const ccBySa40 = "https://creativecommons.org/licenses/by-sa/4.0/";
  const publicDomain = "https://creativecommons.org/publicdomain/mark/1.0/";

  const photos = {
    "kosciol-pokoju-swidnica": photo(
      "Swidnica- Kosciol Pokoju- sufit.jpg",
      "Wnętrze Kościoła Pokoju w Świdnicy z dekorowanym stropem",
      "Jar.ciurus",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    "kosciol-pokoju-jawor": photo(
      "Kościół Pokoju w Jaworze chrzcielnica 21.07.2011 p.jpg",
      "Wnętrze Kościoła Pokoju w Jaworze, z widocznym fragmentem wyposażenia i empor",
      "Przykuta",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "debno-podhalanskie": photo(
      "Dębno Podhalańskie. Kościół św. Michała Archanioła 3.jpg",
      "Kościół św. Michała Archanioła w Dębnie Podhalańskim",
      "Gorofil",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    binarowa: photo(
      "Binarowa, kościół św. Michała Archanioła (HB12).jpg",
      "Kościół św. Michała Archanioła w Binarowej",
      "Henryk Bielamowicz",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    sekowa: photo(
      "Sękowa, kościół św. Filipa i św. Jakuba (HB2).jpg",
      "Kościół św. Filipa i św. Jakuba w Sękowej z charakterystycznym dachem",
      "Henryk Bielamowicz",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "lipnica-murowana": photo(
      "Kościół św. Leonarda w Lipnicy 20140501 2515.jpg",
      "Kościół św. Leonarda w Lipnicy Murowanej",
      "Jakub Hałun",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    haczow: photo(
      "Haczów, Kościół Wniebowzięcia NMP i św. Michała Archanioła - fotopolska.eu (283441).jpg",
      "Kościół Wniebowzięcia NMP i św. Michała Archanioła w Haczowie",
      "Rafał T",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    blizne: photo(
      "PL-Blizne, kościół Wszystkich Świętych 2013-07-10--09-10-08-003.jpg",
      "Kościół Wszystkich Świętych w Bliznem",
      "Kroton",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    kwiaton: photo(
      "Kwiatoń, cerkiew św. Paraskewy (HB25).jpg",
      "Cerkiew św. Paraskewii w Kwiatoniu",
      "Henryk Bielamowicz",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    powroznik: photo(
      "Cerkiew św. Jakuba w Powroźniku, 20251025 1558 5381.jpg",
      "Cerkiew św. Jakuba w Powroźniku",
      "Jakub Hałun",
      "CC BY 4.0",
      ccBy40
    ),
    owczary: photo(
      "CERKIEW PW. OPIEKI BOGURODZICY W OWCZARACH, fot. M. Klag (MIK, 2000) (3533684502).jpg",
      "Cerkiew Opieki Bogurodzicy w Owczarach",
      "M. Klag / Małopolski Instytut Kultury",
      "CC BY-SA 2.0",
      ccBySa20
    ),
    "brunary-wyzne": photo(
      "Brunary Wyżne, cerkiew pw. św. Michała Archanioła (2).jpg",
      "Cerkiew św. Michała Archanioła w Brunarach Wyżnych",
      "Sebastian Mierzwa",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    chotyniec: photo(
      "Chotyniec, cerkiew Narodzenia Przenajświętszej Bogurodzicy (HB13).jpg",
      "Cerkiew Narodzenia Przenajświętszej Bogurodzicy w Chotyńcu",
      "Henryk Bielamowicz",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    radruz: photo(
      "Radruż, cerkiew św. Paraskewy (HB11).jpg",
      "Cerkiew św. Paraskewy w Radrużu",
      "Henryk Bielamowicz",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    smolnik: photo(
      "Smolnik, Cerkiew św. Michała Archanioła w Smolniku.jpg",
      "Cerkiew św. Michała Archanioła w Smolniku",
      "Szymon Muszański",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    turzansk: photo(
      "Turzańsk, cerkiew św. Michała Archanioła (HB8).jpg",
      "Cerkiew św. Michała Archanioła w Turzańsku",
      "Henryk Bielamowicz",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "swiatynia-wang": photo(
      "Świątynia Wang, Karpacz - 44.jpg",
      "Świątynia Wang w Karpaczu",
      "Scotch Mist",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    jaszczurowka: photo(
      "Jaszczurówka at Winter.jpg",
      "Kaplica Najświętszego Serca Pana Jezusa w Jaszczurówce zimą",
      "Jakub T. Jankiewicz",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "willa-koliba": photo(
      "Willa KOLIBA.jpg",
      "Willa Koliba w Zakopanem",
      "Janusz Pienkowski",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    chocholow: photo(
      "Chochołów.jpg",
      "Drewniana zabudowa wsi Chochołów",
      "Aotearoa",
      "CC BY 3.0",
      ccBy30
    ),
    orawka: photo(
      "Orawka - Kościół.jpg",
      "Kościół św. Jana Chrzciciela w Orawce",
      "Mimikla",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    szalowa: photo(
      "Kościół par. p.w. św. Michała Archanioła w Szalowej 5.JPG",
      "Kościół św. Michała Archanioła w Szalowej",
      "Lollencja",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    grywalt: photo(
      "Grywałd, Kościół św. Marcina 184.jpg",
      "Kościół św. Marcina w Grywałdzie",
      "Jan Łoziński",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    lopuszna: photo(
      "Łopuszna, kościół Świętej Trójcy i św. Antoniego Opata (HB1).jpg",
      "Kościół Świętej Trójcy i św. Antoniego Opata w Łopusznej",
      "Henryk Bielamowicz",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    kruszyniany: photo(
      "Meczet w Kruszynianach internal 2.jpg",
      "Wnętrze drewnianego meczetu tatarskiego w Kruszynianach",
      "Polimerek",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    bohoniki: photo(
      "2021 Meczet Bohoniki 2.jpg",
      "Drewniany meczet tatarski w Bohonikach",
      "Zala",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "kraina-otwartych-okiennic": photo(
      "Trześcianka, kraina otwartych okiennic (20110910).jpg",
      "Drewniany dom z ozdobnymi okiennicami w Trześciance, w Krainie Otwartych Okiennic",
      "Krzysztof Kundzicz",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "domy-podcieniowe-zulawy": photo(
      "Dom podcieniowy w Orłowie, 20220523 0911 6353.jpg",
      "Żuławski dom podcieniowy w Orłowie",
      "Jakub Hałun",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "dwor-z-drogini": photo(
      "DWÓR Z DROGINI W NADWIŚLAŃSKIM PARKU ETNOGRAFICZNYM W WYGIEŁZOWIE, fot. M. Klag (MIK, 2006) (4526328444).jpg",
      "Dwór z Drogini w Nadwiślańskim Parku Etnograficznym w Wygiełzowie",
      "M. Klag / Małopolski Instytut Kultury",
      "CC BY-SA 2.0",
      ccBySa20
    ),
    "chata-na-wysokosci": photo(
      "Zakopane - chata goralska. 1937-1939 (74197676).jpg",
      "Kadr reprezentatywny: historyczna góralska chata drewniana z bali, użyta dla karty Chata na Wysokości",
      "autor nieznany; Polona / Biblioteka Narodowa",
      "Public domain",
      publicDomain
    )
  };

  for (const item of appData.woodenArchitecture) {
    Object.assign(item, photos[item.id] || {});
  }

  appData.wooden_architecture_photo_pack_v01 = {
    title: "Wikimedia Commons photo pack for wooden architecture curiosities",
    applied: Object.keys(photos).length,
    source: "Wikimedia Commons",
    note: "Zdjęcia osadzone z atrybucją autora, źródła, licencji i informacją o sposobie użycia. Gdy nie użyto kadru dokładnego obiektu, opis alternatywny uczciwie oznacza zdjęcie jako reprezentatywne."
  };
})();
