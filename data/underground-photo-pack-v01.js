(() => {
  const appData = window.UNDERGROUND_APP_DATA;
  if (!appData || !Array.isArray(appData.underground)) return;

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
    "kopalnia-soli-wieliczka": photo(
      "Kopalnia soli Wieliczka 001.JPG",
      "Podziemna komora w Kopalni Soli Wieliczka",
      "Janericloebe",
      "Public domain",
      publicDomain
    ),
    "kopalnia-soli-bochnia": photo(
      "PL-Bochnia, kopalnia soli 2013-07-09--08-51-50-001.jpg",
      "Podziemny chodnik w Kopalni Soli Bochnia",
      "Kroton",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    "krzemionki-opatowskie": photo(
      "Krzemionki Opatowskie (1).jpg",
      "Krzemionki Opatowskie, pradziejowy krajobraz górniczy",
      "Gorofil",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zabytkowa-kopalnia-srebra": photo(
      "Tarnowskie Góry Kopalnia Srebra.jpg",
      "Zabytkowa Kopalnia Srebra w Tarnowskich Górach",
      "Gabriel Wilk",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "sztolnia-czarnego-pstraga": photo(
      "SZTOLNIA GŁĘBOKA FRYDERYK.jpg",
      "Sztolnia Głęboka Fryderyk, część systemu związanego ze Sztolnią Czarnego Pstrąga",
      "Stowarzyszenie Miłośników Ziemi Tarnogórskiej",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "kopalnia-zlota-zloty-stok": photo(
      "ZŁOTY STOK-KOPALNIA ZŁOTA - panoramio (2).jpg",
      "Kopalnia Złota w Złotym Stoku",
      "ARKADIUSZ MARKIEWICZ",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "kopalnia-guido": photo(
      "2012-06 Zabrze Kopalnia Guido (3).jpg",
      "Podziemna część Kopalni Guido w Zabrzu",
      "Marek Mróz",
      "CC BY 4.0",
      ccBy40
    ),
    "sztolnia-krolowa-luiza": photo(
      "Sztolnia Królowa Luiza EC (11).jpg",
      "Sztolnia Królowa Luiza w Zabrzu",
      "EwkaC",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "kopalnia-wegla-nowa-ruda": photo(
      "2025 Kopalnia Węgla Kamiennego Nowa Ruda (1).jpg",
      "Kopalnia Węgla Kamiennego w Nowej Rudzie",
      "Jacek Halicki",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "kopalnia-uranu-liczyrzepa": photo(
      "Sztolnia Liczyrzepa 1.jpg",
      "Sztolnia Liczyrzepa w Kowarach",
      "Przemysław Woźnica",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "kopalnia-uranu-kletno": photo(
      "Kletno kopalnia uranu.JPG",
      "Sztolnia dawnej kopalni uranu w Kletnie",
      "Laura631",
      "CC BY 3.0",
      ccBy30
    ),
    "riese-wlodarz": photo(
      "Polska Włodarz 002.jpg",
      "Korytarz kompleksu Włodarz, część projektu Riese",
      "Dariusz Cierpiał",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "riese-osowka": photo(
      "Kompleks Riese - Podziemne Miasto Osówka.jpg",
      "Kompleks Riese - Podziemne Miasto Osówka",
      "Aneta Pawska",
      "CC BY 3.0",
      ccBy30
    ),
    "riese-walim-rzeczka": photo(
      "2018 Wejście do kompleksu Riese Rzeczka w Walimiu 1.jpg",
      "Wejście do kompleksu Riese Rzeczka w Walimiu",
      "Jacek Halicki",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "podziemia-zamku-ksiaz": photo(
      "Książ Castle - Riese.PNG",
      "Schemat podziemnego kompleksu pod Zamkiem Książ, część projektu Riese",
      "Les7007",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "riese-sobon-jugowice-gontowa": photo(
      "Complex Soboń.svg",
      "Schemat kompleksu Soboń, użyty reprezentatywnie dla karty Soboń / Jugowice / Gontowa",
      "Les7007",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "miedzyrzecki-rejon-umocniony": photo(
      "MRU - czyli Międzyrzecki Rejon Umocnień - panoramio.jpg",
      "Międzyrzecki Rejon Umocniony",
      "geo573",
      "CC BY 3.0",
      ccBy30
    ),
    "podziemne-miasto-wolin": photo(
      "Podziemne Miasto na Wyspie Wolin 01.jpg",
      "Podziemne Miasto na Wyspie Wolin",
      "Fry72, Karel Frydrýšek",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "bunkier-stepina-cieszyna": photo(
      "Stępina - schron kolejowy.jpg",
      "Schron kolejowy w Stępinie-Cieszynie",
      "Scots",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    "bunkier-konewka": photo(
      "JKRUK 20110424 KONEWKA BUNKIER KOLEJOWY DSC02378.jpg",
      "Bunkier kolejowy Konewka",
      "Jarosław Kruk",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    mamerki: photo(
      "Mamerki, 11.jpg",
      "Kadr z Mamerk, użyty dla karty kompleksu schronów",
      "Honza Groh",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "twierdza-klodzko-labirynty": photo(
      "Podziemna trasa pod twierdzą - panoramio.jpg",
      "Podziemna trasa pod Twierdzą Kłodzko",
      "MSzybalski",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "podziemna-trasa-klodzko": photo(
      "Kłodzko, podziemna trasa turystyczna, 01.JPG",
      "Podziemna Trasa Turystyczna w Kłodzku",
      "Halicki",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    "podziemna-trasa-sandomierz": photo(
      "Sandomierz podziemna trasa turystyczna beczka 31.12.2010 p.jpg",
      "Beczka na Podziemnej Trasie Turystycznej w Sandomierzu",
      "Przykuta",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "podziemia-rynku-krakow": photo(
      "Rynek Underground, 2010.jpg",
      "Podziemia Rynku w Krakowie",
      "Robin",
      "CC BY 2.0",
      ccBy20
    ),
    "rzeszowskie-piwnice": photo(
      "Underground tourist route in Rzeszów, entry.jpg",
      "Wejście do podziemnej trasy turystycznej w Rzeszowie",
      "Lowdown",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "podziemna-trasa-jaroslaw": photo(
      "Jarosław Podziemna Trasa Turystyczna poziom -3.jpg",
      "Podziemna Trasa Turystyczna w Jarosławiu, poziom -3",
      "Mcdrwal",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "podziemia-opatowskie": photo(
      "Opatów rynek podziemia 02.jpg",
      "Podziemia pod rynkiem w Opatowie",
      "Agnieszka Kwiecień, Nova",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "torunskie-piwnice": photo(
      "Toruń, Rynek Staromiejski (piwnice pierzei pn.) (Ola Z.).jpg",
      "Piwnice północnej pierzei Rynku Staromiejskiego w Toruniu",
      "Ola Zaparucha",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    "chelmskie-podziemia-kredowe": photo(
      "Chełmskie Podziemia Kredowe (31).JPG",
      "Chełmskie Podziemia Kredowe",
      "Bazie",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    )
  };

  for (const item of appData.underground) {
    Object.assign(item, photos[item.id] || {});
  }

  appData.underground_photo_pack_v01 = {
    title: "Wikimedia Commons photo pack for underground curiosities",
    applied: Object.keys(photos).length,
    source: "Wikimedia Commons",
    note: "Zdjęcia osadzone z atrybucją autora, źródła, licencji i informacją o sposobie użycia. Schematy lub kadry reprezentatywne są oznaczone w opisie alternatywnym."
  };
})();
