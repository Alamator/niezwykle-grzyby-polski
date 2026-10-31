(() => {
  const appData = window.ATMOSPHERIC_RECORD_APP_DATA;
  if (!appData || !Array.isArray(appData.atmosphericRecords)) return;

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
  const ccBySa30 = "https://creativecommons.org/licenses/by-sa/3.0/";
  const ccBySa40 = "https://creativecommons.org/licenses/by-sa/4.0/";
  const publicDomain = "https://creativecommons.org/publicdomain/mark/1.0/";

  // Most photos show the place of the record, not the event: their descriptions start with "Kadr kontekstowy".
  // Two cards have no fitting free photo: the warmest year (all of Poland) and the 2017 derecho.
  const photos = {
    "slubice-40-5": photo(
      "Słubice 2007 001.jpg",
      "Kadr kontekstowy: letnia ulica w Słubicach z kamienicami i szyldem kina Piast",
      "Sebastian Wallroth",
      "CC BY 4.0",
      ccBy40
    ),
    "proszkow-1921": photo(
      "Proskau Prószków Ring Rynek.JPG",
      "Kadr kontekstowy: kamienice przy rynku w Prószkowie",
      "Daviidos",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "zywiec-1929": photo(
      "Żywiec Konkatedra Narodzenia Najświętszej Maryi Panny 001.JPG",
      "Kadr kontekstowy: zima w Żywcu, ośnieżona konkatedra Narodzenia Najświętszej Maryi Panny",
      "Janericloebe",
      "Public domain",
      publicDomain
    ),
    "wroclaw-srednia-roczna": photo(
      "Wrocław panorama near Sikorskiego Bridge 2019.jpg",
      "Kadr kontekstowy: panorama Wrocławia w pobliżu mostu Sikorskiego",
      "Zorro2212",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "suwalki-srednia-roczna": photo(
      "Zegar słoneczny w suwalskim parku miejskim. Zima 2021 r.jpg",
      "Kadr kontekstowy: zegar słoneczny w parku miejskim w Suwałkach zimą",
      "Atekaja",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "hala-gasienicowa-300-mm": photo(
      "Hala Gąsienicowa, Tatry.jpg",
      "Kadr kontekstowy: kamienny szlak wśród różowych kwiatów na Hali Gąsienicowej, w tle szczyty Tatr",
      "Fotodruk",
      "CC BY 4.0",
      ccBy40
    ),
    "powodz-1997-opady": photo(
      "2016 Zapora w Międzygórzu 1.jpg",
      "Kadr kontekstowy: zapora przeciwpowodziowa na Wilczce w Międzygórzu, zdjęcie z 2016 r",
      "Jacek Halicki",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "kasprowy-opady-roczne": photo(
      "Kasprowy Wierch 2023-09-06.jpg",
      "Kadr kontekstowy: Kasprowy Wierch widziany znad Zielonego Stawu Gąsienicowego",
      "Faxe",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "kalisz-opady-roczne": photo(
      "Kalisz Panorama.jpg",
      "Kadr kontekstowy: panorama Kalisza",
      "Wydra666 at pl.wikipedia",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "sniezka-wiatr": photo(
      "Karkonosze, Śnieżka, stacja meteorologiczna i restauracja.jpg",
      "Kadr kontekstowy: Wysokogórskie Obserwatorium Meteorologiczne im. Tadeusza Hołdysa na szczycie Śnieżki w pogodny dzień",
      "Stanislav Dusík",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "halny-1968": photo(
      "Wiatr halny.jpg",
      "Kadr reprezentatywny: wał chmur utworzony przez wiatr halny nad ośnieżonymi Tatrami, na pierwszym planie las iglasty",
      "Tomasz Skowroński",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "tornado-lublin-1931": photo(
      "F4 damage to the Lublin slaughterhouse after the 1931 Lublin tornado.jpg",
      "Zniszczony budynek w Lublinie po przejściu tornada 20 lipca 1931 roku",
      "Unknown author",
      "Public domain",
      publicDomain
    ),
    "tornada-2008": photo(
      "August 2008 tornado in Poland - Kalina p3.jpg",
      "Kalina w powiecie lublinieckim 24 sierpnia 2008 roku, po przejściu jednego z tornad z 15 sierpnia: pozostałość pnia modrzewia, który zwalił się na budynek",
      "Przykuta",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "grad-tomaszow-2021": photo(
      "Tomaszów Mazowiecki, main square. October 2021.jpg",
      "Kadr kontekstowy: główny plac Tomaszowa Mazowieckiego w październiku 2021 roku",
      "WrS.tm.pl",
      "Public domain",
      publicDomain
    ),
    "sniezka-mgla": photo(
      "Śnieżka 07.jpg",
      "Budynek obserwatorium meteorologicznego na szczycie Śnieżki, złożony z brył w kształcie dysków, w gęstej mgle",
      "Wyksztalcioch",
      "CC BY 3.0",
      ccBy30
    )
  };

  for (const record of appData.atmosphericRecords) {
    Object.assign(record, photos[record.id] || {});
  }

  appData.atmospheric_records_photo_pack_v01 = {
    title: "Wikimedia Commons photo pack v01",
    applied: Object.keys(photos).length,
    source: "Wikimedia Commons",
    note: "Zdjęcia osadzone z atrybucją autora, źródła, licencji i informacją o sposobie użycia. Większość kart pokazuje miejsce rekordu jako kadr kontekstowy."
  };
})();
