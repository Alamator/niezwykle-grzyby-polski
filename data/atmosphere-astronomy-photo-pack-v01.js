(() => {
  const appData = window.ATMOSPHERE_ASTRONOMY_APP_DATA;
  if (!appData || !Array.isArray(appData.phenomena)) return;

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
  const ccBy25 = "https://creativecommons.org/licenses/by/2.5/";
  const ccBy30 = "https://creativecommons.org/licenses/by/3.0/";
  const ccBy40 = "https://creativecommons.org/licenses/by/4.0/";
  const ccBySa30 = "https://creativecommons.org/licenses/by-sa/3.0/";
  const ccBySa40 = "https://creativecommons.org/licenses/by-sa/4.0/";
  const publicDomain = "https://creativecommons.org/publicdomain/mark/1.0/";

  const photos = {
    "widmo-brockenu": photo(
      "Brocken Spectre with Glory.jpg",
      "Widmo Brockenu z barwną glorią wokół cienia obserwatora na chmurze",
      "Dunpharlain",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    gloria: photo(
      "Solar glory and Spectre of the Brocken from GGB on 07-05-2011.jpg",
      "Kadr reprezentatywny: gloria i widmo Brockenu pokazujące koncentryczne pierścienie wokół cienia",
      "Brocken Inaglory",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "morze-chmur-i-inwersje-gorskie": photo(
      "Sninský kameň - inverzia 008.jpg",
      "Kadr reprezentatywny: morze chmur podczas inwersji temperatury w górach",
      "Milan Bališin",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "ognie-swietego-elma": photo(
      "St. Elmo's Fire flashing in front of the windshield of a U.S. Air Force KC-135 Stratotanker.jpg",
      "Kadr reprezentatywny: ognie świętego Elma widoczne jako poświata przy szybie samolotu",
      "U.S. Air Force photo by Staff Sgt. Jackson Manske",
      "Public domain",
      publicDomain
    ),
    "wyladowania-koronowe-na-szczytach": photo(
      "St. Elmo's fire on the windshield of an Airbus A320.jpg",
      "Kadr reprezentatywny: wyładowania koronowe na krawędzi szyby samolotu, analogiczne do świateł na ostrych elementach",
      "Antelopesensign",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "czerwone-duszki-nad-polska": photo(
      "Red sprite lightning seen from ISS (ISS031-E-010712).jpg",
      "Kadr reprezentatywny: czerwony duszek uchwycony z Międzynarodowej Stacji Kosmicznej",
      "NASA/Expedition 31",
      "Public domain",
      publicDomain
    ),
    "niebieskie-strumienie": photo(
      "Gigantic jet NOIRLab.jpg",
      "Kadr reprezentatywny: wielki strumień elektryczny nad burzą jako kontekst dla blue jets",
      "International Gemini Observatory/NOIRLab/NSF/AURA/A. Smith",
      "CC BY 4.0",
      ccBy40
    ),
    "elves-nad-burzami": photo(
      "Upperatmoslight1.jpg",
      "Diagram reprezentatywny: typy przejściowych zjawisk świetlnych ponad burzami, w tym elves",
      "Abestrobi",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "dodatnie-wyladowania-cg-plus": photo(
      "Where positive and negative collide - Flickr - 5thLargestinAfrica.jpg",
      "Kadr reprezentatywny: wyładowanie atmosferyczne jako kontekst dla dodatnich piorunów chmura-ziemia",
      "5thLargestinAfrica",
      "CC BY 2.0",
      ccBy20
    ),
    "burze-sniezne-z-wyladowaniami": photo(
      "Aphid storm radar lightning.png",
      "Kadr reprezentatywny: radarowy obraz burzy z wyładowaniami, użyty dla zjawiska burzy śnieżnej",
      "Robert S. Hamilton, David Zaff, and Thomas Niziol",
      "Public domain",
      publicDomain
    ),
    "biale-noce-astronomiczne": photo(
      "White night.jpg",
      "Kadr reprezentatywny: jasna letnia noc, w której niebo nie osiąga pełnej ciemności",
      "Semenov.m7",
      "CC0",
      cc0
    ),
    "biale-noce-zeglarskie": photo(
      "White night (9067122930).jpg",
      "Kadr reprezentatywny: biała noc z jasnym horyzontem w letnim półmroku",
      "kishjar? from Moscow, Russia",
      "CC BY 2.0",
      ccBy20
    ),
    "obloki-srebrzyste": photo(
      "Obłoki srebrzyste nad Krakowem, 20240708 2211 0616.jpg",
      "Obłoki srebrzyste nad Krakowem, widoczne jako srebrno-błękitne struktury po zmierzchu",
      "Jakub Hałun",
      "CC BY 4.0",
      ccBy40
    ),
    "izerski-park-ciemnego-nieba": photo(
      "Izerski Park Ciemnego Nieba - Makemake.jpg",
      "Punkt widokowy Makemake w Izerskim Parku Ciemnego Nieba, element edukacyjnej ścieżki astronomicznej",
      "Szydzio",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "bieszczadzki-park-gwiezdnego-nieba": photo(
      "Droga Mleczna widziana z Bieszczad.jpg",
      "Droga Mleczna widziana z centrum Bieszczad w lipcową noc",
      "Michał Zaczek",
      "CC BY 4.0",
      ccBy40
    ),
    "sopotnia-wielka-ciemne-niebo": photo(
      "Sopotnia Wielka BŻ2.jpg",
      "Sopotnia Wielka, miejscowość związana z lokalną ochroną ciemnego nieba",
      "Jerzy Opioła",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "droga-mleczna-nad-polska": photo(
      "Droga Mleczna widziana z Bieszczad.jpg",
      "Droga Mleczna nad Bieszczadami jako przykład polskiego ciemnego nieba",
      "Michał Zaczek",
      "CC BY 4.0",
      ccBy40
    ),
    "zorze-polarne-nad-polska": photo(
      "Zorza polarna nad Polską, maj 2024.jpg",
      "Zorza polarna sfotografowana nad Polską podczas silnej aktywności geomagnetycznej",
      "Aneta p",
      "CC BY 4.0",
      ccBy40
    ),
    perseidy: photo(
      "Perseids.jpg",
      "Kadr reprezentatywny: meteor z roju Perseidów przecinający nocne niebo",
      "Christos Doudoulakis",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    geminidy: photo(
      "Geminids.jpg",
      "Kadr reprezentatywny: meteor z roju Geminidów na północnym niebie",
      "Asim Patel",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "miraz-gorny-nad-baltykiem": photo(
      "20160607 Ferry FataMorgana Mirage BalticSea DSC01734 PtrQs.jpg",
      "Fata Morgana nad Bałtykiem: zniekształcony obraz promu ponad horyzontem",
      "PtrQs",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "fata-morgana-latajace-statki": photo(
      "20160607 Ferry FataMorgana Mirage BalticSea DSC01861 PtrQs.jpg",
      "Fata Morgana promu na Bałtyku, z efektem pozornego uniesienia i deformacji obrazu",
      "PtrQs",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "baltycki-efekt-morza": photo(
      "Lake Effect Snow on Earth.jpg",
      "Kadr reprezentatywny: satelitarny obraz pasm śniegu z efektu jeziora, użyty jako analogia efektu Bałtyku",
      "SeaWiFS Project, NASA",
      "Public domain",
      publicDomain
    ),
    "tatry-z-wyzyny-lubelskiej": photo(
      "Tatry. Polska..JPG",
      "Kadr reprezentatywny: Tatry widziane z Kasprowego Wierchu, użyte jako kontekst dla dalekich obserwacji",
      "Fagata",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "rekord-godziszow-zadni-gerlach": photo(
      "Tatry. Polska..JPG",
      "Kadr reprezentatywny: tatrzańskie szczyty jako cel ekstremalnie dalekich obserwacji z Roztocza",
      "Fagata",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "atmosfera-jako-soczewka": photo(
      "Atmospheric refraction.svg",
      "Diagram reprezentatywny: refrakcja atmosferyczna zmieniająca pozorne położenie obiektu przy horyzoncie",
      "Original: Francisco Javier Blanco González; vector: Jona",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "hala-izerska-mala-syberia": photo(
      "Gory izerskie hala izerska.jpg",
      "Hala Izerska w Górach Izerskich, znana z silnych inwersji i mrozowiska",
      "Hydrus",
      "CC BY 2.5",
      ccBy25
    ),
    "litworowy-kociol": photo(
      "Hala Izerska, Izera (01).jpg",
      "Kadr reprezentatywny: otwarte górskie obniżenie sprzyjające radiacyjnemu wychładzaniu",
      "cs:ŠJů",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "puscizna-rekowianska": photo(
      "Stacja meteorologiczna na Puściźnie Rękowiańskiej i widok na Tatry.jpg",
      "Stacja meteorologiczna na Puściźnie Rękowiańskiej z widokiem na Tatry",
      "Ardo",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "siedlce-rekord-mrozu": photo(
      "Jacek siedlce.JPG",
      "Kadr reprezentatywny: ratusz Jacek w Siedlcach, mieście związanym z historycznym rekordem mrozu",
      "Wasiakp89 (Paweł Wasiak)",
      "CC BY 3.0",
      ccBy30
    ),
    "pyl-saharyjski-nad-polska": photo(
      "Bielsko-Biała, Trzy Lipki, pył saharyjski - Saharan dust (kalima), 2024-04-01.jpg",
      "Pył saharyjski nad Bielskiem-Białą, z żółtawym zmętnieniem nieba",
      "Michał Gąsior",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "brudny-deszcz": photo(
      "Polvo sahariano en Madrid.jpg",
      "Kadr reprezentatywny: saharyjski pył osadzony na samochodzie po opadzie",
      "Xemenendura",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "czerwony-snieg-w-gorach": photo(
      "Chlamydomonas nivalis- Red Snow - Flickr - Dick Culbert.jpg",
      "Kadr reprezentatywny: czerwony śnieg wywołany przez organizmy śnieżne",
      "Dick Culbert from Gibsons, B.C., Canada",
      "CC BY 2.0",
      ccBy20
    )
  };

  for (const phenomenon of appData.phenomena) {
    Object.assign(phenomenon, photos[phenomenon.id] || {});
  }

  appData.atmosphere_astronomy_photo_pack_v01 = {
    title: "Wikimedia Commons photo pack v01",
    applied: Object.keys(photos).length,
    source: "Wikimedia Commons",
    note: "Zdjęcia osadzone z atrybucją autora, źródła, licencji i informacją o sposobie użycia. Część kart używa kadrów reprezentatywnych, gdy nie znaleziono wolnego zdjęcia konkretnej polskiej obserwacji."
  };
})();
