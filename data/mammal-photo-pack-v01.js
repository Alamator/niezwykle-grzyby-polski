(() => {
  const appData = window.MAMMAL_APP_DATA;
  if (!appData || !Array.isArray(appData.mammals)) return;

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
  const ccBySa20 = "https://creativecommons.org/licenses/by-sa/2.0/";
  const ccBySa25 = "https://creativecommons.org/licenses/by-sa/2.5/";
  const ccBySa30 = "https://creativecommons.org/licenses/by-sa/3.0/";
  const ccBySa30At = "https://creativecommons.org/licenses/by-sa/3.0/at/deed.en";
  const ccBySa40 = "https://creativecommons.org/licenses/by-sa/4.0/";
  const publicDomain = "https://creativecommons.org/publicdomain/mark/1.0/";

  const photos = {
    "ryjowka-malutka": photo(
      "Sorex minutus.jpg",
      "Ryjówka malutka, kadr reprezentatywny pokazujący miniaturowego owadożernego ssaka",
      "Polandeze; imported to Commons by Salix",
      "CC BY 2.0",
      ccBy20
    ),
    "ryjowka-aksamitna": photo(
      "Sorex araneus eating a worm in Norway.jpg",
      "Ryjówka aksamitna z bezkręgowcem, kadr reprezentatywny dla wysokiego tempa żerowania",
      "Emily Chebul",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "ryjowka-srednia": photo(
      "Lappnäbbmus 140621.jpg",
      "Kadr reprezentatywny: ryjówka średnia, trudny terenowo mikrossak chłodnych lasów",
      "Deryni",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "ryjowka-gorska": photo(
      "Sorex alpinus - Martin Scheuch.jpeg",
      "Kadr reprezentatywny: ryjówka górska w wilgotnym siedlisku alpejskim",
      "Martin Scheuch (iNaturalist user ma_sche)",
      "CC BY 4.0",
      ccBy40
    ),
    "rzesorek-rzeczek": photo(
      "Neomys fodiens (Varsinais-Suomi, Finland) 1.jpg",
      "Rzęsorek rzeczek, półwodny owadożerny ssak z wyraźnym kontrastem ubarwienia",
      "Håkan Söderholm",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "rzesorek-mniejszy": photo(
      "Neomys anomalus.jpg",
      "Kadr reprezentatywny: rzęsorek mniejszy, bliski krewny rzęsorka rzeczka",
      "Mnolf",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "kret-europejski": photo(
      "Talpa europaea MHNT.jpg",
      "Kret europejski z widocznymi łopatowatymi kończynami przednimi",
      "Didier Descouens",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "nocek-duzy": photo(
      "Bat-Myotis-myotis.jpg",
      "Nocek duży zimujący w podziemiu, kadr reprezentatywny dla hibernujących nietoperzy",
      "Petr Vodička",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "nocek-rudy": photo(
      "Myotis daubentoni01.jpg",
      "Nocek rudy trzymany przez badacza, kadr reprezentatywny do cech diagnostycznych",
      "Gilles San Martin",
      "CC BY-SA 2.0",
      ccBySa20
    ),
    "nocek-lydkowlosy": photo(
      "Myotis dasycneme.jpg",
      "Nocek łydkowłosy, kadr reprezentatywny rzadkiego nietoperza związanego z wodami",
      "Gilles San Martin",
      "CC BY-SA 2.0",
      ccBySa20
    ),
    "nocek-bechsteina": photo(
      "Myotis bechsteini.jpg",
      "Nocek Bechsteina, kadr reprezentatywny gatunku starych lasów liściastych",
      "Gilles San Martin",
      "CC BY-SA 2.0",
      ccBySa20
    ),
    "nocek-natterera": photo(
      "Myotis nattereri (2862347369).jpg",
      "Nocek Natterera, kadr reprezentatywny gatunku zbierającego ofiary z powierzchni",
      "Gilles San Martin",
      "CC BY-SA 2.0",
      ccBySa20
    ),
    "nocek-wasatek": photo(
      "Whiskered bat (Myotis mystacinus) Rochovce.jpg",
      "Nocek wąsatek, kadr reprezentatywny małego nietoperza szczelinowego",
      "Charles J. Sharp",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "susel-perelkowany": photo(
      "Spermophilus suslicus (G Lesniewski).jpg",
      "Suseł perełkowany przy norze na stanowisku we wschodniej Polsce",
      "Grzegorz Leśniewski",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "chomik-europejski": photo(
      "European hamster (Cricetus cricetus) Meidling 2.jpg",
      "Kadr reprezentatywny: chomik europejski, duży gryzoń pól i mozaik rolniczych",
      "Charles J. Sharp",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "popielica-szara": photo(
      "Edible dormouse - Relmuis - Glis glis.jpg",
      "Popielica szara, kadr reprezentatywny nadrzewnego pilcha",
      "Bouke ten Cate",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    orzesznica: photo(
      "Haselmaus.jpg",
      "Orzesznica wśród gałęzi, kadr pokazujący nadrzewny tryb życia",
      "Danielle Schwarz",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "koszatka-lesna": photo(
      "Dryomys nitedula.jpg",
      "Koszatka leśna, kadr reprezentatywny pilcha z maską na pysku",
      "Dodoni",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "zolednica-europejska": photo(
      "Eliomys quercinus01.jpg",
      "Żołędnica europejska, kadr reprezentatywny rzadkiego pilcha w masce",
      "Arno Laurent",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "swistak-tatrzanski": photo(
      "Alpenmurmeltier Marmota marmota of Rätikon 5.JPG",
      "Kadr reprezentatywny: świstak alpejski, bliski odpowiednik tatrzańskiego reliktu wysokogórskiego",
      "Böhringer Friedrich",
      "CC BY-SA 3.0 AT",
      ccBySa30At
    ),
    "bobr-europejski": photo(
      "Castor fiber vistulanus2.jpg",
      "Bóbr europejski przy tamie w północnej Polsce",
      "Klaudiusz Muchowski",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    pizmak: photo(
      "Ondatra zibethicus FWS.jpg",
      "Kadr reprezentatywny: piżmak, obcy gryzoń wodny",
      "David Menke, U.S. Fish and Wildlife Service",
      "Public domain",
      publicDomain
    ),
    "zubr-europejski": photo(
      "European bison (Bison bonasus) male Białowieza.jpg",
      "Samiec żubra europejskiego w Puszczy Białowieskiej",
      "Charles J. Sharp",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "kozica-tatrzanska": photo(
      "Rupicapra rupicapra tatrica.jpg",
      "Kozica tatrzańska na zboczach Starorobociańskiego Wierchu",
      "Jacek rybak",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    jenot: photo(
      "Nyctereutes procyonoides - Raccoon Dog - Jenot.png",
      "Jenot sfotografowany w Polsce, kadr reprezentujący ekspansywnego obcego psowatego",
      "ShootGun180",
      "CC BY 3.0",
      ccBy30
    ),
    "norka-amerykanska": photo(
      "Norka amerykańska (neovison vison).jpg",
      "Norka amerykańska, kadr reprezentatywny inwazyjnego drapieżnika półwodnego",
      "Wojciech Uszak",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "szop-pracz": photo(
      "Raccoon in Central Park (35264).jpg",
      "Kadr reprezentatywny: szop pracz, obcy gatunek o zręcznych dłoniach",
      "Rhododendrites",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "szakal-zlocisty": photo(
      "Golden jackal (Canis aureus moreotica).jpg",
      "Kadr reprezentatywny: szakal złocisty, mezodrapieżnik rozszerzający zasięg w Europie",
      "Charles J. Sharp",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    lasica: photo(
      "Mustela nivalis -British Wildlife Centre-4.jpg",
      "Kadr reprezentatywny: łasica, drobny drapieżnik o wydłużonym ciele",
      "Keven Law",
      "CC BY-SA 2.0",
      ccBySa20
    ),
    gronostaj: photo(
      "035 Stoat in winter coat in Parc naturel régional Jura vaudois Photo by Giles Laurent.jpg",
      "Kadr reprezentatywny: gronostaj w białej szacie zimowej",
      "Giles Laurent",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zajac-bielak": photo(
      "Mountain hare (Lepus timidus) Oppdal.jpg",
      "Kadr reprezentatywny: zając bielak w chłodnym, górskim krajobrazie",
      "Charles J. Sharp",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "foka-szara": photo(
      "Focario de focas grises (Halichoerus grypus), Hel, Polonia, 2013-05-23, DD 11.jpg",
      "Foki szare w fokarium w Helu, polski kadr gatunku rekolonizującego Bałtyk",
      "Diego Delso",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "morswin-zwyczajny": photo(
      "Marsvin (Phocoena phocoena).jpg",
      "Kadr reprezentatywny: morświn zwyczajny, niewielki waleń Bałtyku",
      "Malene Thyssen",
      "CC BY-SA 3.0",
      ccBySa30
    )
  };

  for (const mammal of appData.mammals) {
    Object.assign(mammal, photos[mammal.id] || {});
  }

  appData.mammal_photo_pack_v01 = {
    title: "Wikimedia Commons photo pack for mammal curiosities",
    applied: Object.keys(photos).length,
    source: "Wikimedia Commons",
    note: "Zdjęcia osadzone z atrybucją autora, źródła, licencji i informacją o sposobie użycia. Część kart używa kadrów reprezentatywnych, gdy nie znaleziono wolnego zdjęcia konkretnego polskiego osobnika lub stanowiska."
  };
})();
