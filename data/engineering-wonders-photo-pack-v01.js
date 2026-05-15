(() => {
  const appData = window.ENGINEERING_WONDER_APP_DATA;
  if (!appData || !Array.isArray(appData.engineeringWonders)) return;

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

  const cc0 = "https://creativecommons.org/publicdomain/zero/1.0/";
  const ccBy20 = "https://creativecommons.org/licenses/by/2.0/";
  const ccBy30 = "https://creativecommons.org/licenses/by/3.0/";
  const ccBy40 = "https://creativecommons.org/licenses/by/4.0/";
  const ccBySa20 = "https://creativecommons.org/licenses/by-sa/2.0/";
  const ccBySa25 = "https://creativecommons.org/licenses/by-sa/2.5/";
  const ccBySa30 = "https://creativecommons.org/licenses/by-sa/3.0/";
  const ccBySa30Pl = "https://creativecommons.org/licenses/by-sa/3.0/pl/deed.en";
  const ccBySa40 = "https://creativecommons.org/licenses/by-sa/4.0/";
  const publicDomain = "https://creativecommons.org/publicdomain/mark/1.0/";

  const photos = {
    "kanal-elblaski": photo(
      "Kanał Elbląski, pochylnia Buczyniec.jpg",
      "Pochylnia Buczyniec na Kanale Elbląskim",
      "Wojciech Pędzich",
      "CC BY 3.0",
      ccBy30
    ),
    "teznie-ciechocinek": photo(
      "Ciechocinek 2023 61.jpg",
      "Tężnie solankowe w Ciechocinku",
      "Scotch Mist",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "radiostacja-gliwicka": photo(
      "Reflections of the Gliwice Radio Tower 03.jpg",
      "Radiostacja Gliwicka odbita w wodzie",
      "Kritzolina",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "hala-stulecia": photo(
      "Wroclaw - Hala Stulecia 03.jpg",
      "Hala Stulecia we Wrocławiu",
      "Jar.ciurus",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    "zapora-solina": photo(
      "Solina zapora 0001.JPG",
      "Zapora w Solinie",
      "Jacek Karczmarz",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "zapora-pilchowice": photo(
      "Zapora Pilchowice 3.jpg",
      "Zapora Pilchowice w dolinie Bobru",
      "Kacper Malina",
      "CC BY 3.0",
      ccBy30
    ),
    "elektrownia-porabka-zar": photo(
      "Elektrownia Porąbka-Żar.jpg",
      "Elektrownia Porąbka-Żar",
      "Lihor~commonswiki",
      "CC BY-SA 2.5",
      ccBySa25
    ),
    "elektrownia-zarnowiec": photo(
      "Czymanowo, Elektrownia Wodna Żarnowiec - panoramio.jpg",
      "Elektrownia Wodna Żarnowiec w Czymanowie",
      "t.przechlewski",
      "CC BY 3.0",
      ccBy30
    ),
    "mosty-tczewskie": photo(
      "Tczew, oblouky železničního mostu.JPG",
      "Łuki mostu kolejowego w Tczewie",
      "Aktron",
      "CC BY 3.0",
      ccBy30
    ),
    "most-redzinski": photo(
      "Most Rędziński we Wroclawiu.jpg",
      "Most Rędziński we Wrocławiu",
      "Olgierd Rudak",
      "CC BY-SA 2.0",
      ccBySa20
    ),
    "most-grunwaldzki": photo(
      "Wroclaw-Most Grunwaldzki.jpg",
      "Most Grunwaldzki we Wrocławiu",
      "Jar.ciurus",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    "wiadukt-boleslawiec": photo(
      "Bolesławiec. Wiadukt kolejowy (3).jpg",
      "Wiadukt kolejowy w Bolesławcu",
      "Gorofil",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "kanal-augustowski-sluzy": photo(
      "Kanał Augustowski (1).jpg",
      "Kanał Augustowski ze śluzami",
      "Lesnydzban",
      "CC BY 4.0",
      ccBy40
    ),
    "sluza-paniewo": photo(
      "Śluza Paniewo.jpg",
      "Śluza Paniewo na Kanale Augustowskim",
      "Puszczyk",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "kanal-gliwicki": photo(
      "Pławniowice - Kanał Gliwicki.JPG",
      "Kanał Gliwicki w Pławniowicach",
      "Lestat (Jan Mehlich)",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "wroclawski-wezel-wodny": photo(
      "JazOpatowicki.JPG",
      "Jaz Opatowicki we Wrocławskim Węźle Wodnym",
      "User: (WT-shared) Flasher at wts wikivoyage",
      "Public domain",
      publicDomain
    ),
    "tunel-pod-martwa-wisla": photo(
      "POL Gdańsk tunel pod Martwą Wisłą 02.JPG",
      "Tunel pod Martwą Wisłą w Gdańsku",
      "Tadeusz Rudzki",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "tunel-pod-swina": photo(
      "Świnoujście - tunel pod Świną - tunel ewakuacyjny - 30.06.2023 14-16-18.jpg",
      "Tunel ewakuacyjny pod Świną",
      "Photographs by Radosław Drożdżewski (User:Zwiadowca21)",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "kolej-kasprowy-wierch": photo(
      "Kolej linowa na Kasprowy Wierch, wagon.jpg",
      "Wagon kolei linowej na Kasprowy Wierch",
      "Zalasem1",
      "CC BY 4.0",
      ccBy40
    ),
    "kolej-gubalowka": photo(
      "Zakopane kolej na Gubalowke 3.jpg",
      "Kolej linowo-terenowa na Gubałówkę",
      "Andrzej Otrębski",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "port-gdynia": photo(
      "Gdynia z lotu ptaka - 080.JPG",
      "Port Gdynia z lotu ptaka",
      "Joymaster",
      "Public domain",
      publicDomain
    ),
    "modernizm-gdyni": photo(
      "Staircase of the BGK Building (26620981474).jpg",
      "Modernistyczna klatka schodowa w budynku BGK w Gdyni",
      "Bart Lumber",
      "CC0",
      cc0
    ),
    "osada-fabryczna-zyrardow": photo(
      "Żyrardów - osada fabryczna 2.jpg",
      "Osada fabryczna w Żyrardowie",
      "DeGirard",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    "ksiezy-mlyn": photo(
      "Księży Młyn, Łódź.jpg",
      "Księży Młyn w Łodzi",
      "Michał Tomczak",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "nikiszowiec": photo(
      "Nikiszowiec, courtyard with chimneys, 2024-08-09.jpg",
      "Dziedziniec Nikiszowca z kominami",
      "Radomianin",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "giszowiec": photo(
      "Katowice-Giszowiec 032.jpg",
      "Historyczna zabudowa Giszowca w Katowicach",
      "Marek Mróz",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "ec1-lodz": photo(
      "EC1 Łódź in the evening 2024 December.jpg",
      "Kompleks EC1 w Łodzi wieczorem",
      "Zorro2212",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "stocznia-gdanska": photo(
      "Stocznia Gdańska, żurawie portowe - panoramio.jpg",
      "Żurawie portowe Stoczni Gdańskiej",
      "t.przechlewski",
      "CC BY 3.0",
      ccBy30
    ),
    "muzeum-slaskie-kopalnia-katowice": photo(
      "KWK Katowice.jpg",
      "Dawna Kopalnia Katowice, obecnie teren Muzeum Śląskiego",
      "Ewkaa",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "kopiec-kosciuszki-fort": photo(
      "Kopieckosciuszki.jpg",
      "Kopiec Kościuszki w Krakowie",
      "Jan Jerszyński - Jersz",
      "CC BY-SA 2.5",
      ccBySa25
    ),
    "fort-winiary-cytadela-poznan": photo(
      "Poznań, Cytadela, południowy front.jpg",
      "Front Fortu Winiary w Poznaniu",
      "Z. Szumowski",
      "Public domain",
      publicDomain
    ),
    "wieza-cisnien-borek": photo(
      "Wrocław wieża ciśnień przy alei Wiśniowej 15.jpg",
      "Wieża ciśnień przy alei Wiśniowej we Wrocławiu",
      "Zala",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "dzwigi-portowe-szczecin": photo(
      "Szczecin port dzwigi polbramowe.jpg",
      "Dźwigi półbramowe w porcie szczecińskim",
      "Kapitel",
      "CC BY-SA 4.0",
      ccBySa40
    )
  };

  appData.engineeringWonders.forEach((item) => {
    if (photos[item.id]) Object.assign(item, photos[item.id]);
  });

  appData.engineeringWondersPhotoPack = {
    title: "Engineering wonders Commons photo pack v01",
    items: Object.keys(photos).length
  };
})();
