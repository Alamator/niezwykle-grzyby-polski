(() => {
  const appData = window.FOSSIL_APP_DATA;
  if (!appData || !Array.isArray(appData.fossils)) return;

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
  const ccBySa30 = "https://creativecommons.org/licenses/by-sa/3.0/";
  const ccBySa30Pl = "https://creativecommons.org/licenses/by-sa/3.0/pl/deed.en";
  const ccBySa40 = "https://creativecommons.org/licenses/by-sa/4.0/";
  const publicDomain = "https://creativecommons.org/publicdomain/mark/1.0/";

  const photos = {
    "trylobity-kambryjskie-gor-swietokrzyskich": photo(
      "Trilobites.jpg",
      "Kadr reprezentatywny: skamieniałe trylobity pokazujące segmentowany pancerz dawnych stawonogów morskich",
      "John Mittler",
      "Public domain",
      publicDomain
    ),
    "rafy-dewonskie-kadzielni": photo(
      "Kielce, Kadzielnia, KsP 01.jpg",
      "Kadzielnia w Kielcach, wapienne ściany dawnego kamieniołomu z dewońskim zapisem rafowym",
      "Krzysztof Popławski",
      "CC BY 4.0",
      ccBy40
    ),
    "wczesna-flora-ladowa-dewonu": photo(
      "Archaeopteris.JPG",
      "Kadr reprezentatywny: skamieniałość Archaeopteris jako kontekst dla wczesnych roślin drzewiastych",
      "Ghedoghedo",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "alienacanthus-malkowskii": photo(
      "Dunkleosteus CMNH 5768 skull.png",
      "Kadr reprezentatywny: czaszka dewońskiej ryby pancernej, użyta jako kontekst dla placoderma Alienacanthus",
      "Russell K. Engelman",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "tropy-tetrapodow-z-zachelmia": photo(
      "Zachelmie tracks vs selected Devonian fossils.svg",
      "Diagram pokazujący pozycję tropów tetrapodów z Zachełmia względem innych kluczowych skamieniałości dewonu",
      "Sceptic view",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "karbonskie-lasy-weglowe": photo(
      "Arthropleura fossil Poland.jpg",
      "Skamieniały tergit Arthropleura z karbonu Polski, otoczony szczątkami dawnych roślin",
      "Prehistorica CM",
      "CC BY 4.0",
      ccBy40
    ),
    "smok-wawelski-lisowice": photo(
      "Smok.jpg",
      "Materiał kostny drapieżnego archozaura Smok wawelski z późnotriasowych osadów Lisowic",
      "Grzegorz Niedźwiedzki, Tomasz Sulej and Jerzy Dzik",
      "CC BY 2.0",
      ccBy20
    ),
    "lisowicia-bojani": photo(
      "Lisowicia bojani J..png",
      "Rekonstrukcja Lisowicia bojani, ogromnego późnotriasowego dicynodonta z Lisowic",
      "Juan(-username-)",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "proterochersis-robusta": photo(
      "Proterochersis robusta.JPG",
      "Kadr reprezentatywny: materiał kopalny żółwia Proterochersis robusta",
      "Ghedoghedo",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "tholodus-schmidi": photo(
      "Ichthyosaur fossil.jpg",
      "Kadr reprezentatywny: skamieniałość ichtiozaura, użyta jako morski kontekst dla triasowego Tholodus",
      "soebe",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "encrinus-liliiformis": photo(
      "Encrinus liliiformis.JPG",
      "Skamieniała lilia morska Encrinus liliiformis z widoczną strukturą ramion i kielicha",
      "Ghedoghedo",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "tropy-dinozaurow-gor-swietokrzyskich": photo(
      "Dinosaur Tracks (14176736955).jpg",
      "Kadr reprezentatywny: tropy dinozaurów w skale, użyte dla świętokrzyskich stanowisk ichnologicznych",
      "U.S. Geological Survey",
      "Public domain",
      publicDomain
    ),
    "tropy-dinozaurow-baltow": photo(
      "Dinosaur tracks (19482706481).jpg",
      "Kadr reprezentatywny: odciski stóp dinozaurów na powierzchni skalnej",
      "Sandy Horvath-Dori",
      "CC BY-SA 2.0",
      ccBySa20
    ),
    "tropy-dinozaurow-borkowice": photo(
      "An Corran dinosaur tracks.jpg",
      "Kadr reprezentatywny: wyraźne tropy dinozaurów użyte jako kontekst dla stanowiska w Borkowicach",
      "Neil Clark",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "pliozaury-z-krzyzanowic": photo(
      "Pliosaurus rossicus cast.jpg",
      "Kadr reprezentatywny: odlew czaszki pliozaura, pokazujący potężną głowę morskiego drapieżnika",
      "Kenneth Carpenter",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "plezjozaury-annopola": photo(
      "Denti di plesiosauro.jpg",
      "Kadr reprezentatywny: zęby plezjozaura jako kontekst dla morskich gadów z Annopola",
      "Assianir",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "krokodylomorfy-owadowa": photo(
      "Teleosaurus cadomensis fossils.jpg",
      "Kadr reprezentatywny: szczątki morskiego krokodylomorfa, użyte dla jurajskich krewniaków z Owadowa-Brzezinek",
      "Ghedo",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "limulus-darwini-owadow": photo(
      "L polyphemus L darwini.png",
      "Porównanie współczesnego Limulus polyphemus i jurajskiego Limulus darwini z kamieniołomu Owadów-Brzezinki",
      "Adrian Kin and Błażej Błażejowski",
      "CC BY 4.0",
      ccBy40
    ),
    "ctenochasma-owadow": photo(
      "Ctenochasma elegans.jpg",
      "Kadr reprezentatywny: Ctenochasma elegans jako kontekst dla drobnych pterozaurów z jurajskich lagun",
      "Ghedoghedo; derivative by Haplochromis",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "laguna-owadow-brzezinki": photo(
      "L polyphemus L darwini.png",
      "Figura z jurajskim Limulus darwini z Owadowa-Brzezinek, pokazująca wyjątkowe zachowanie skamieniałości laguny",
      "Adrian Kin and Błażej Błażejowski",
      "CC BY 4.0",
      ccBy40
    ),
    "amonity-jurajskie-polski": photo(
      "Perisphinctes plicatilis 2.jpg",
      "Jurajski amonit Perisphinctes z widoczną spiralną muszlą i żebrowaniem",
      "Wikipek",
      "CC BY 3.0",
      ccBy30
    ),
    "pachydesmoceras-z-opola": photo(
      "Lewesiceras peramplum.jpg",
      "Kadr reprezentatywny: duży amonit z kredy, użyty jako kontekst dla gigantycznych opolskich głowonogów",
      "Wikipek",
      "CC BY 3.0",
      ccBy30
    ),
    "belemnity-polskich-morz": photo(
      "Belemnitella americana.jpg",
      "Kadr reprezentatywny: rostra belemnitów pokazujące pociskowaty kształt skamieniałości",
      "Skye McDavid",
      "CC BY 4.0",
      ccBy40
    ),
    "inkluzje-owadow-w-bursztynie": photo(
      "Insects in baltic amber.jpg",
      "Owady zachowane w bursztynie bałtyckim, pokazujące drobne szczegóły dawnych stawonogów",
      "Brocken Inaglory",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "ptasznik-w-bursztynie-baltyckim": photo(
      "Jumping spider in amber.jpg",
      "Pająk skakun zachowany w bursztynie bałtyckim",
      "Kaldari",
      "CC0 1.0",
      cc0
    ),
    "chwytowka-w-bursztynie": photo(
      "Baltic amber inclusions - Cockroach (Pterygota, Neoptera, Dictyoptera, Blattodea).JPG",
      "Kadr reprezentatywny: karaczan zachowany w bursztynie bałtyckim jako kontekst dla inkluzji owadzich",
      "Anders L. Damgaard",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "jantarogekko-balticus": photo(
      "Bursztyn, jaszczurka, Gdańsk.jpg",
      "Jaszczurka w bursztynie bałtyckim z gdańskiej kolekcji, kadr reprezentujący kręgowce w bursztynie",
      "Qkiel",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "oligocenskie-ptaki-polski": photo(
      "Fossil bird head.jpg",
      "Kadr reprezentatywny: skamieniała głowa ptaka na płytce skalnej",
      "FunkMonk",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "skamieniale-drewna-roztocza": photo(
      "Petrified wood.jpg",
      "Kadr reprezentatywny: przekrój skamieniałego drewna z zachowanym rysunkiem słojów",
      "Mauro Cateb",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "mamuty-z-okolic-konina": photo(
      "Mammuthus primigenius limbs.jpg",
      "Kończyny mamuta włochatego w kolekcji muzealnej",
      "Wikipek",
      "CC BY 3.0",
      ccBy30
    ),
    "nosorozec-wlochaty-polski": photo(
      "Coelodonta antiquitatis, skull.JPG",
      "Czaszka nosorożca włochatego, kadr reprezentujący plejstoceńską megafaunę",
      "HTO",
      "Public domain",
      publicDomain
    ),
    "krakow-spadzista-lowcy-mamutow": photo(
      "Mammuthus primigenius et al.jpg",
      "Szkielet mamuta włochatego w muzeum, z kontekstem plejstoceńskiej megafauny",
      "Wikipek",
      "CC BY 3.0",
      ccBy30
    ),
    "niedzwiedzie-jaskiniowe-kletna": photo(
      "2015 Jaskinia Niedźwiedzia w Kletnie, szkielet niedźwiedzia jaskiniowego 02.JPG",
      "Szkielet niedźwiedzia jaskiniowego w Jaskini Niedźwiedziej w Kletnie",
      "Jacek Halicki",
      "CC BY-SA 3.0 pl",
      ccBySa30Pl
    )
  };

  for (const fossil of appData.fossils) {
    Object.assign(fossil, photos[fossil.id] || {});
  }

  appData.fossil_photo_pack_v01 = {
    title: "Wikimedia Commons photo pack v01",
    applied: Object.keys(photos).length,
    source: "Wikimedia Commons",
    note: "Zdjęcia osadzone z atrybucją autora, źródła, licencji i informacją o sposobie użycia. Część kart używa kadrów reprezentatywnych, gdy nie znaleziono wolnego zdjęcia konkretnego polskiego okazu."
  };
})();
