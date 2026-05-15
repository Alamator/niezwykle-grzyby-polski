(() => {
  const appData = window.AMPHIBIAN_REPTILE_APP_DATA;
  if (!appData || !Array.isArray(appData.amphibiansReptiles)) return;

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
  const ccBySa25 = "https://creativecommons.org/licenses/by-sa/2.5/";
  const ccBySa30 = "https://creativecommons.org/licenses/by-sa/3.0/";
  const ccBySa40 = "https://creativecommons.org/licenses/by-sa/4.0/";
  const publicDomain = "https://creativecommons.org/publicdomain/mark/1.0/";

  const photos = {
    "zaba-moczarowa": photo(
      "RanaArvalisBlueMaleGroup.jpg",
      "Kadr reprezentatywny: błękitne samce żaby moczarowej w krótkim okresie godowym",
      "Christian Fischer",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "grzebiuszka-ziemna": photo(
      "Knoflookpad - common spadefoot - Pelobates fuscus 2.jpg",
      "Kadr reprezentatywny: grzebiuszka ziemna, płaz kopiący o czosnkowej obronie",
      "Bouke ten Cate",
      "CC BY 4.0",
      ccBy40
    ),
    "kumak-nizinny": photo(
      "Benny Trapp Bombina bombina Rotbauchunke.jpg",
      "Kadr reprezentatywny: kumak nizinny z widocznym ostrzegawczym ubarwieniem brzucha",
      "Benny Trapp",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "kumak-gorski": photo(
      "Geelbuikvuurpad - yellow bellied toad - Bombina variegata 2.tif",
      "Kadr reprezentatywny: kumak górski z żółtym ostrzegawczym rysunkiem brzucha",
      "Bouke ten Cate",
      "CC BY 4.0",
      ccBy40
    ),
    "salamandra-plamista": photo(
      "Fire salamander (Salamandra Salamandra).jpg",
      "Kadr reprezentatywny: salamandra plamista z kontrastowym czarno-żółtym ubarwieniem",
      "Petar Milošević",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "ropucha-szara": photo(
      "Bufo bufo 2015 G3.jpg",
      "Kadr reprezentatywny: ropucha szara, krępy płaz z wyraźnymi gruczołami przyusznymi",
      "George Chernilevsky",
      "Public domain",
      publicDomain
    ),
    "traszka-grzebieniasta": photo(
      "Kamsalamander - great crested newt - Triturus cristatus 2.jpg",
      "Kadr reprezentatywny: traszka grzebieniasta z efektowną szatą godową",
      "Bouke ten Cate",
      "CC BY 4.0",
      ccBy40
    ),
    "traszka-zwyczajna": photo(
      "Ludwag Steinbruch Teichmolch-20170521-RM-173509.jpg",
      "Kadr reprezentatywny: traszka zwyczajna w wodnej fazie sezonu rozrodczego",
      "Ermell",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "traszka-karpacka": photo(
      "Lissotriton montandoni01.jpg",
      "Kadr reprezentatywny: traszka karpacka, regionalna osobliwość chłodnych małych wód",
      "Maciej Pabijan",
      "CC BY-SA 2.5",
      ccBySa25
    ),
    "traszka-gorska": photo(
      "Ichthyosaura alpestris Bergmolch.jpg",
      "Kadr reprezentatywny: traszka górska z pomarańczowym brzuchem",
      "Holger Krisp",
      "CC BY 3.0",
      ccBy30
    ),
    "ropucha-paskowka": photo(
      "Bufo calamita (Marek Szczepanek).jpg",
      "Kadr reprezentatywny: ropucha paskówka z jasnym paskiem grzbietowym",
      "Marek Szczepanek",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "ropucha-zielona": photo(
      "Ropucha w parku Rataje w Poznaniu - lipiec 2021 - 1.jpg",
      "Ropucha zielona sfotografowana w Poznaniu, z mozaiką zielonych plam na grzbiecie",
      "Koefbac",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "rzekotka-drzewna": photo(
      "European tree frog (Hyla arborea) (2).jpg",
      "Kadr reprezentatywny: rzekotka drzewna, zielony płaz z przylgami na palcach",
      "Stijn99",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "rzekotka-wschodnia": photo(
      "Oostelijke boomkikker - eastern tree frog - Hyla orientalis.jpg",
      "Kadr reprezentatywny: rzekotka wschodnia, bliźniaczy gatunek rzekotki drzewnej",
      "Bouke ten Cate",
      "CC BY 4.0",
      ccBy40
    ),
    "zaba-trawna": photo(
      "20171104 Frog in Leeuwenhorstbos - Rana temporaria .jpg",
      "Kadr reprezentatywny: żaba trawna w brunatnym, maskującym ubarwieniu",
      "Rudolphous",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zaba-zwinka": photo(
      "Agile frog (Rana dalmatina).jpg",
      "Kadr reprezentatywny: żaba zwinka, smukły gatunek o długich tylnych nogach",
      "Petar Milošević",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zaba-jeziorkowa": photo(
      "Bochum - Botanischer Garten - Pelophylax lessonae 01 ies.jpg",
      "Kadr reprezentatywny: żaba jeziorkowa z grupy zielonych żab wodnych",
      "Frank Vincentz",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "zaba-wodna": photo(
      "2018.05.11.-24-Kirschgartshaeuser Schlaege Mannheim--Teichfrosch-Maennchen.jpg",
      "Kadr reprezentatywny: żaba wodna, hybrydowy przedstawiciel zielonych żab",
      "Andreas Eichler",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zaba-smieszka": photo(
      "-Pelophylax ridibundus.jpg",
      "Kadr reprezentatywny: żaba śmieszka, duża zielona żaba związana z wodą",
      "LOISEAU Samuel",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zolw-blotny": photo(
      "Cistude d'Europe (Emys orbicularis).jpg",
      "Kadr reprezentatywny: żółw błotny, rodzimy żółw Europy związany z cichymi mokradłami",
      "DEFI-Écologique",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zolw-ozdobny": photo(
      "02483 Drei Wasserschildkröten im Bolestraszyce See bei Przemyśl (2012).JPG",
      "Żółwie ozdobne w zbiorniku w Bolestraszycach, przykład obcych żółwi spotykanych w Polsce",
      "Silar",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "padalec-zwyczajny": photo(
      "Anguis fragilis autotomie (dkrb)-1.jpg",
      "Kadr reprezentatywny: padalec zwyczajny, beznoga jaszczurka po autotomii ogona",
      "Drahkrub. Attribution must include the URL https://de.wikipedia.org/wiki/Benutzer:Drahkrub.",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "padalec-kolchidzki": photo(
      "Anguis colchica Padalec kolchidzki.jpg",
      "Padalec kolchidzki, bliźniaczy gatunek padalca rozpoznany w polskiej herpetofaunie",
      "Halfpeacee",
      "CC BY 4.0",
      ccBy40
    ),
    "jaszczurka-zwinka": photo(
      "Lacerta agilis 1 (Marek Szczepanek).jpg",
      "Kadr reprezentatywny: jaszczurka zwinka, samiec z zielonkawym ubarwieniem boków",
      "Marek Szczepanek",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "jaszczurka-zyworodna": photo(
      "Common (viviparous) lizard (zootoca vivipara).jpg",
      "Kadr reprezentatywny: jaszczurka żyworodna, gad chłodniejszych i wilgotniejszych siedlisk",
      "Charles J. Sharp",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zaskroniec-zwyczajny": photo(
      "A Grass Snake at Warnsborn pond, Schaarsbergen, Netherlands.jpg",
      "Kadr reprezentatywny: zaskroniec zwyczajny z żółtymi plamami za głową",
      "Henk Monster",
      "CC BY 3.0",
      ccBy30
    ),
    "zaskroniec-rybolow": photo(
      "2017-05-21 Würfelnatter at Nahe River shore BME WiTi 08.jpg",
      "Kadr reprezentatywny: zaskroniec rybołów przy brzegu rzeki, gatunek związany z wodą i rybami",
      "Wild Tibbi",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "gniewosz-plamisty": photo(
      "Coronella austriaca (Laurenti, 1768).jpg",
      "Kadr reprezentatywny: gniewosz plamisty, niejadowity wąż często mylony ze żmiją",
      "Ivan Medenica",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "waz-eskulapa": photo(
      "Aesculapean Snake (Zamenis longissimus) (42801938540).jpg",
      "Kadr reprezentatywny: wąż Eskulapa, najdłuższy polski wąż i niejadowity dusiciel",
      "Bernard DUPONT from FRANCE",
      "CC BY-SA 2.0",
      ccBy20
    ),
    "zmija-zygzakowata": photo(
      "Common European viper (Vipera berus) female Pieniny.jpg",
      "Samica żmii zygzakowatej sfotografowana w Pieninach, z widocznym zygzakiem na grzbiecie",
      "Charles J. Sharp",
      "CC BY-SA 4.0",
      ccBySa40
    )
  };

  for (const item of appData.amphibiansReptiles) {
    Object.assign(item, photos[item.id] || {});
  }

  appData.amphibian_reptile_photo_pack_v01 = {
    title: "Wikimedia Commons photo pack for amphibian and reptile curiosities",
    applied: Object.keys(photos).length,
    source: "Wikimedia Commons",
    note: "Zdjęcia osadzone z atrybucją autora, źródła, licencji i informacją o sposobie użycia. Część kart używa kadrów reprezentatywnych, gdy nie znaleziono wolnego zdjęcia konkretnego polskiego osobnika lub stanowiska."
  };
})();
