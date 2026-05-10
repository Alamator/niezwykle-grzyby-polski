(() => {
  const appData = window.TREE_APP_DATA;
  if (!appData || !Array.isArray(appData.trees)) return;

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

  const publicDomain = "https://creativecommons.org/publicdomain/mark/1.0/";

  const photos = {
    "sosna-na-szczudlach": photo(
      "Sosna na szczudłach - Pine on Stilts - Wełecz 20230501 09.jpg",
      "Sosna na Szczudłach w Wełeczu z odsłoniętymi korzeniami unoszącymi pień nad ziemią",
      "Dwxn",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "krzywy-las": photo(
      "Krzywy las - 003.jpg",
      "Krzywy Las w Nowym Czarnowie z sosnami wygiętymi u nasady pni",
      "Maciek R. Drewniak",
      "CC BY 4.0",
      "https://creativecommons.org/licenses/by/4.0/"
    ),
    "milorzab-dwuklapowy": photo(
      "A ginkgo biloba fruit on dark rocky background.png",
      "Reprezentatywny owoc miłorzębu dwuklapowego, część odpowiedzialna za charakterystyczny zapach",
      "Leo219",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "grujecznik-japonski": photo(
      "Cercidiphyllum japonicum in autumn 20161014.jpg",
      "Jesienne liście grujecznika japońskiego, których opadanie wiąże się ze słodkim zapachem",
      "そらみみ",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "opienka-na-martwym-drewnie": photo(
      "Armillaria mellea 2011 G1.jpg",
      "Opieńka miodowa na drewnie; kadr reprezentuje grzyba związanego z nocnym świeceniem próchna",
      "George Chernilevsky",
      "Public domain",
      publicDomain
    ),
    "cis-henrykowski": photo(
      "Najstarszy cis w Polsce 01.JPG",
      "Cis Henrykowski w Henrykowie Lubańskim, najstarsze znane drzewo Polski",
      "Antosh",
      "CC BY-SA 2.5",
      "https://creativecommons.org/licenses/by-sa/2.5/"
    ),
    "sosna-na-sokolicy": photo(
      "Sokolica Sosna IMG 0453.jpg",
      "Słynna karłowata sosna na szczycie Sokolicy w Pieninach",
      "Robsuper",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    "drzewo-z-kula-armatnia": photo(
      "Old Sycamore Tree.jpg",
      "Kadr reprezentatywny: stare drzewo z obiektem wrośniętym w pień, podobny mechanizm zabliźniania obcego ciała",
      "Photos have truth",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "bozodrzew-gruczolowaty": photo(
      "Ailanthus altissima bark Siemianowice.jpg",
      "Kora bożodrzewu gruczołowatego, inwazyjnego drzewa dobrze znoszącego miasta",
      "Adrian Tync",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "korkowiec-amurski": photo(
      "Phellodendron amurense OB10.jpg",
      "Korkowiec amurski w Ogrodzie Botanicznym w Krakowie z widoczną koroną i liśćmi",
      "Jerzy Opioła",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "dawidia-chinska": photo(
      "Davidia involucrata flowering branch.jpg",
      "Kwitnąca gałąź dawidii chińskiej z dużymi białymi podsadkami",
      "Myrabella",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "mamutowiec-brwice": photo(
      "Brwice mamutowiec (3).jpg",
      "Mamutowiec olbrzymi w Brwicach, egzotyczne drzewo parkowe w Polsce",
      "Kapitel",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "dab-uparty-mazur": photo(
      "Dab uparty mazur.jpg",
      "Dąb Uparty Mazur, pomnikowy dąb o masywnym pniu",
      "Dwarfy",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "dab-bolko": photo(
      "Dąb Bolko w Hniszowie.JPG",
      "Dąb Bolko w Hniszowie, monumentalny dąb szypułkowy",
      "Fastred",
      "Public domain",
      publicDomain
    ),
    "dab-bazynskiego": photo(
      "Kadyny dab Bazynskiego.jpg",
      "Dąb Bażyńskiego w Kadynach, stary dąb o bogatej historii nazw",
      "Polimerek",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    "jodla-lasumila": photo(
      "Abies alba.jpg",
      "Kadr reprezentatywny: jodła pospolita, gatunek rekordowej Lasumiły z Bieszczad",
      "Meneerke bloem",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    "lipa-cieletniki": photo(
      "Cielętniki - 700letnia lipa - widok na pień.jpg",
      "Pień starej lipy w Cielętnikach, drzewa z historią kulturowego odzierania kory",
      "Leszek Korpas",
      "CC BY 2.5 pl",
      "https://creativecommons.org/licenses/by/2.5/pl/deed.en"
    ),
    "dab-rebowo": photo(
      "Birch tree destroyed by lightning - trunk.jpg",
      "Kadr reprezentatywny z Polski: pień drzewa uszkodzony przez piorun, jako ilustracja ekstremalnego uszkodzenia",
      "Incnis Mrsi",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "sosna-kandelabrowa": photo(
      "Picea montigena or Picea asperata (candelabra spruce) 2 (24557264947).jpg",
      "Kadr reprezentatywny: iglaste drzewo o kandelabrowym układzie gałęzi, nie polska Sosna Kandelabrowa",
      "James St. John",
      "CC BY 2.0",
      "https://creativecommons.org/licenses/by/2.0/"
    ),
    "lipa-pokoju": photo(
      "Rynek, Głuchołazy 2018.04.08 (08).jpg",
      "Rynek w Głuchołazach z lipą-pomnikiem przyrody wpisaną w przestrzeń miasta",
      "Wlodek k1",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    "drzewostan-sosnowy-oscislowo": photo(
      "Las sosnowy (2).jpg",
      "Kadr reprezentatywny: las sosnowy w Polsce, użyty dla powierzchniowego pomnika drzewostanu sosnowego",
      "Aw58",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "lipa-stronie-slaskie": photo(
      "2024 Kaplica św. Onufrego w Stroniu Śląskim (5).jpg",
      "Kadr kontekstowy ze Stronia Śląskiego przy kaplicy św. Onufrego, w otoczeniu opisywanej lipy i powodziowego krajobrazu",
      "Jacek Halicki",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "dab-mieszko": photo(
      "Mieszko oak front.jpg",
      "Dąb Mieszko w Kończycach Wielkich z potężnym pniem, w tle dąb Przemko",
      "Buforowy23",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    "dab-chrobry-bialobrzegi": photo(
      "Very old Oak tree.jpg",
      "Kadr reprezentatywny: bardzo stary dąb szypułkowy, użyty dla białobrzeskiego Chrobrego bez zdjęcia konkretnego okazu",
      "AnemoneProjectors",
      "CC BY-SA 2.0",
      "https://creativecommons.org/licenses/by-sa/2.0/"
    ),
    "kasztanowiec-jastarnia": photo(
      "European horsechestnut (Aesculus hippocastanum L.), św. Idziego street, Kraków, Poland.jpg",
      "Kadr reprezentatywny: kasztanowiec pospolity w Polsce, użyty dla wiatroodpornego okazu z Jastarni",
      "Zygmunt Put",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "dab-gniewko": photo(
      "Crooked branches of Quercus robur.jpg",
      "Kadr reprezentatywny: konary dębu szypułkowego pokazujące złożoną architekturę korony",
      "Stefanst at English Wikipedia",
      "CC BY 2.5",
      "https://creativecommons.org/licenses/by/2.5/"
    ),
    "dab-jozef": photo(
      "2017 Josef Oak.jpg",
      "Dąb Józef z Wiśniowej, laureat konkursów drzewnych",
      "Rafal Godek",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "platan-olbrzym": photo(
      "Chojna platan Olbrzym (1).jpg",
      "Platan Olbrzym w Chojnie, monumentalny platan klonolistny",
      "Kapitel",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "jodla-balsamiczna": photo(
      "Abies balsamea.jpg",
      "Jodła balsamiczna z szyszkami, kadr reprezentujący aromatyczny gatunek iglasty",
      "U.S. Fish and Wildlife Service",
      "Public domain",
      publicDomain
    ),
    "deby-rogalinskie": photo(
      "Dęby Rogalińskie-Lech,Czech,Rus.JPG",
      "Dęby Rogalińskie Lech, Czech i Rus w krajobrazie Rogalina",
      "Noaśka",
      "CC0",
      "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
    )
  };

  const missingImages = [];

  for (const tree of appData.trees) {
    const curatedPhoto = photos[tree.id];
    if (curatedPhoto) {
      Object.assign(tree, curatedPhoto);
    } else {
      missingImages.push(tree.id);
    }
  }

  window.TREE_APP_DATA.tree_photo_pack_v01 = {
    title: "Wikimedia Commons photo pack for tree curiosities",
    source: "Wikimedia Commons",
    curated: "2026-05-10",
    added_images: Object.keys(photos).length,
    missing_images: missingImages
  };
})();
