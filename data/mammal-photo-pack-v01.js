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
  const ccBySa40 = "https://creativecommons.org/licenses/by-sa/4.0/";
  const publicDomain = "https://creativecommons.org/publicdomain/mark/1.0/";

  const photos = {
    "ryjowka-malutka": photo(
      "Sorex minutus.jpg",
      "Ryjówka malutka, miniaturowy owadożerny ssak",
      "Polandeze; imported to Commons by Salix",
      "CC BY 2.0",
      ccBy20
    ),
    "ryjowka-aksamitna": photo(
      "Sorex araneus eating a worm in Norway.jpg",
      "Ryjówka aksamitna z bezkręgowcem, przykład wysokiego tempa żerowania",
      "Emily Chebul",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "ryjowka-srednia": photo(
      "Lappnäbbmus 140621.jpg",
      "Ryjówka średnia, trudny terenowo mikrossak chłodnych lasów",
      "Deryni",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "ryjowka-gorska": photo(
      "Sorex alpinus - Martin Scheuch.jpeg",
      "Ryjówka górska w wilgotnym siedlisku alpejskim",
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
    // Photographed in Innsbruck and filed under the former broad name Neomys anomalus; outside Iberia
    // the species is now Neomys milleri, the one on the card.
    "rzesorek-mniejszy": photo(
      "Neomys anomalus.jpg",
      "Rzęsorek mniejszy, bliski krewny rzęsorka rzeczka",
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
      "Nocek duży zimujący w podziemiu",
      "Petr Vodička",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "nocek-rudy": photo(
      "Myotis daubentoni01.jpg",
      "Nocek rudy trzymany przez badacza",
      "Gilles San Martin",
      "CC BY-SA 2.0",
      ccBySa20
    ),
    "nocek-lydkowlosy": photo(
      "Myotis dasycneme.jpg",
      "Nocek łydkowłosy, rzadki nietoperz związany z wodami",
      "Gilles San Martin",
      "CC BY-SA 2.0",
      ccBySa20
    ),
    "nocek-bechsteina": photo(
      "Myotis bechsteini.jpg",
      "Nocek Bechsteina, gatunek starych lasów liściastych",
      "Gilles San Martin",
      "CC BY-SA 2.0",
      ccBySa20
    ),
    "nocek-natterera": photo(
      "Myotis nattereri (2862347369).jpg",
      "Nocek Natterera, gatunek zbierający ofiary z powierzchni",
      "Gilles San Martin",
      "CC BY-SA 2.0",
      ccBySa20
    ),
    "nocek-wasatek": photo(
      "Whiskered bat (Myotis mystacinus) Rochovce.jpg",
      "Nocek wąsatek, mały nietoperz szczelinowy",
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
      "Chomik europejski, duży gryzoń pól i mozaik rolniczych",
      "Charles J. Sharp",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "popielica-szara": photo(
      "Edible dormouse - Relmuis - Glis glis.jpg",
      "Popielica szara, nadrzewny pilch",
      "Bouke ten Cate",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    orzesznica: photo(
      "Haselmaus.jpg",
      "Orzesznica leszczynowa wśród gałęzi, kadr pokazujący nadrzewny tryb życia",
      "Danielle Schwarz",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "koszatka-lesna": photo(
      "Dryomys nitedula.jpg",
      "Koszatka leśna, pilch z maską na pysku",
      "Dodoni",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "zolednica-europejska": photo(
      "Eliomys quercinus01.jpg",
      "Żołędnica europejska, rzadki pilch w masce",
      "Arno Laurent",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "swistak-tatrzanski": photo(
      "M.marmota latirostris in Kozia Dolina (Tatra Mountains) 1.jpg",
      "Dwa świstaki tatrzańskie na skałach w Koziej Dolince w Tatrach",
      "Tomasz Mielcarek [tmc]",
      "CC BY-SA 3.0",
      ccBySa30
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
      "Piżmak amerykański, obcy gryzoń wodny",
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
      "Jenot azjatycki sfotografowany w Polsce, ekspansywny obcy psowaty",
      "ShootGun180",
      "CC BY 3.0",
      ccBy30
    ),
    "norka-amerykanska": photo(
      "Norka amerykańska (neovison vison).jpg",
      "Wizon amerykański, inwazyjny drapieżnik półwodny",
      "Wojciech Uszak",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "szop-pracz": photo(
      "Raccoon in Central Park (35264).jpg",
      "Szop pracz, obcy gatunek o zręcznych dłoniach",
      "Rhododendrites",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "szakal-zlocisty": photo(
      "Golden jackal (Canis aureus moreotica).jpg",
      "Szakal złocisty, mezodrapieżnik rozszerzający zasięg w Europie",
      "Charles J. Sharp",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    lasica: photo(
      "Mustela nivalis -British Wildlife Centre-4.jpg",
      "Łasica, drobny drapieżnik o wydłużonym ciele",
      "Keven Law",
      "CC BY-SA 2.0",
      ccBySa20
    ),
    gronostaj: photo(
      "035 Stoat in winter coat in Parc naturel régional Jura vaudois Photo by Giles Laurent.jpg",
      "Gronostaj w białej szacie zimowej",
      "Giles Laurent",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zajac-bielak": photo(
      "Mountain hare (Lepus timidus) Oppdal.jpg",
      "Zając bielak w chłodnym, górskim krajobrazie",
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
      "Morświn zwyczajny, niewielki waleń Bałtyku",
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
