(() => {
  const appData = window.MINERAL_APP_DATA;
  if (!appData || !Array.isArray(appData.minerals)) return;

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
  const robLavinsky = "Robert M. Lavinsky, iRocks.com";

  const photos = {
    nioboholtit: photo(
      "Columbite-186423.jpg",
      "Kadr reprezentatywny: kolumbit, minerał niobu pokazywany jako wizualny kontekst dla nioboholtitu",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    zabinskiit: photo(
      "Tantalite-(Fe)-160203.jpg",
      "Kadr reprezentatywny: tantalit żelazowy, minerał tantalu użyty jako wizualny kontekst dla żabińskiitu",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    taliomelan: photo(
      "Hutchinsonite-169844.jpg",
      "Kadr reprezentatywny: hutchinsonit, rzadki minerał talu użyty jako ostrożny kontekst dla taliomelanu",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    heflikit: photo(
      "Heflikite - Figure 1.png",
      "Figura naukowa przedstawiająca heflikit, nowy minerał skandowy z Jordanowa Śląskiego",
      "Pieczka A, Kristiansen R, Stachowicz M, et al.",
      "CC BY 4.0",
      ccBy40
    ),
    skandiowinchit: photo(
      "Heflikite - Figure 1 (a).png",
      "Kadr reprezentatywny ze skandowej mineralizacji Jordanowa Śląskiego, użyty dla skandiowinchitu",
      "Pieczka A, Kristiansen R, Stachowicz M, et al.",
      "CC BY 4.0",
      ccBy40
    ),
    "berylokordieryt-na": photo(
      "Beryl-119311.jpg",
      "Kadr reprezentatywny: kryształ berylu jako wizualny kontekst dla berylokordierytu-Na",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "berylosachanbinskiit-na": photo(
      "Beryl-23651.jpg",
      "Kadr reprezentatywny: beryl w pegmatycie jako kontekst dla berylosachanbińskiitu-Na",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    magnesiodutrowit: photo(
      "Schorl-283975.jpg",
      "Kadr reprezentatywny: schorl z grupy turmalinu, użyty dla magnesiodutrowitu",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "krzemien-pasiasty": photo(
      "Krzemien pasiasty.jpg",
      "Krzemień pasiasty z widocznym pasmowym wzorem, okaz z muzeum geologicznego",
      "Wikipek",
      "CC BY 3.0",
      ccBy30
    ),
    "bursztyn-baltycki": photo(
      "A piece of raw Baltic amber 1.jpg",
      "Surowa bryłka bursztynu bałtyckiego o miodowej barwie",
      "Ann-Sophie Qvarnström",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "siarka-rodzima-tarnobrzeg": photo(
      "Sulphur-Celestine-162785.jpg",
      "Siarka rodzima z celestynem, kadr reprezentujący paragenezę siarkową rejonu Tarnobrzega",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "haueryt-machow-jeziorko": photo(
      "Hauerite-627175.jpg",
      "Kadr reprezentatywny: ostre kryształy hauerytu, użyte dla polskich okazów z Machowa i Jeziórka",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "celestyn-machow": photo(
      "Sulphur-Celestine-162785.jpg",
      "Celestyn z siarką, kadr reprezentujący siarczany strontu w tarnobrzeskiej paragenezie",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "baryt-machow": photo(
      "Barite-lw69a.jpg",
      "Kadr reprezentatywny: kryształy barytu, użyte dla barytu z paragenezy siarkowej Machowa",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "aragonit-machow": photo(
      "Baryte-Aragonite-Sulphur-171538.jpg",
      "Aragonit z barytem i siarką, kadr reprezentujący asocjacje z Machowa",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "kalcyt-siarkowy": photo(
      "Calcite-285196.jpg",
      "Kadr reprezentatywny: kryształy kalcytu pokazujące formę węglanu wapnia",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "halit-wieliczka": photo(
      "Halite crystals.jpeg",
      "Przezroczyste kryształy halitu z kolekcji związanej z Wieliczką",
      "Virtual Museums of Małopolska",
      "Public domain",
      publicDomain
    ),
    "gips-wtorny-jeziorko": photo(
      "Gypsum-186581.jpg",
      "Kadr reprezentatywny: przezroczyste kryształy gipsu, użyte dla wtórnej krystalizacji gipsu w strefach siarkowych",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "stroncjanit-tarnobrzeg": photo(
      "Strontianite-118172.jpg",
      "Kadr reprezentatywny: stroncjanit jako węglan strontu z igiełkowymi kryształami",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "agat-gwiazdzisty-nowy-kosciol": photo(
      "Agate from Nowy Kościół RN3.jpg",
      "Agat z Nowego Kościoła w Sudetach, z widocznym wnętrzem buły agatowej",
      "Robert Niedźwiedzki",
      "CC BY 3.0",
      ccBy30
    ),
    "kwarc-dymny-strzegom": photo(
      "Smoky quartz 13.jpg",
      "Kadr reprezentatywny: kryształy kwarcu dymnego, użyte dla strzegomskich pegmatytów",
      "James St. John",
      "CC BY 2.0",
      "https://creativecommons.org/licenses/by/2.0/"
    ),
    "topaz-strzegom": photo(
      "Topaz-238928.jpg",
      "Kadr reprezentatywny: kryształ topazu jako kontekst dla topazu z pegmatytów Strzegomia",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "beryl-strzegom": photo(
      "Beryl-119311.jpg",
      "Kadr reprezentatywny: beryl jako kontekst dla berylu z dolnośląskich pegmatytów",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "turmalin-strzegom": photo(
      "Schorl-Quartz-193922.jpg",
      "Kadr reprezentatywny: czarny schorl z kwarcem, użyty dla turmalinu ze Strzegomia",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "fluoryt-kowary": photo(
      "Fluorite-34783.jpg",
      "Kadr reprezentatywny: fluoryt o zielonej barwie, użyty dla kowarskich żył fluorytowych",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "chryzokola-miedzianka": photo(
      "Chrysocolla-257264.jpg",
      "Kadr reprezentatywny: błękitna chryzokola jako minerał wtórny miedzi",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "malachit-miedzianka": photo(
      "Malachite-231725.jpg",
      "Kadr reprezentatywny: zielony malachit, minerał wtórny miedzi",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "azuryt-miedzianka": photo(
      "Azurite-Malachite-193802.jpg",
      "Kadr reprezentatywny: azuryt z malachitem, duet minerałów wtórnych miedzi",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "kupryt-miedzianka": photo(
      "Copper-Cuprite-226396.jpg",
      "Kadr reprezentatywny: miedź rodzima z kuprytem, użyta dla strefy utleniania rud miedzi",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "uraninit-kowary": photo(
      "Uraninite-225146.jpg",
      "Kadr reprezentatywny: uraninit, minerał promieniotwórczy związany z dawnym górnictwem uranu",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "galena-olkusz": photo(
      "Galena-186601.jpg",
      "Kadr reprezentatywny: metaliczne kryształy galeny, rudy ołowiu",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "sfaleryt-olkusz": photo(
      "Sphalerite-186600.jpg",
      "Kadr reprezentatywny: sfaleryt, główna ruda cynku",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "whewellit-weglowy": photo(
      "Whewellite-280567.jpg",
      "Kadr reprezentatywny: tabliczkowe kryształy whewellitu, szczawianu wapnia",
      robLavinsky,
      "CC BY-SA 3.0",
      ccBySa30
    )
  };

  const missingImages = [];

  for (const mineral of appData.minerals) {
    const curatedPhoto = photos[mineral.id];
    if (curatedPhoto) {
      Object.assign(mineral, curatedPhoto);
    } else {
      missingImages.push(mineral.id);
    }
  }

  window.MINERAL_APP_DATA.mineral_photo_pack_v01 = {
    title: "Wikimedia Commons photo pack for mineral curiosities",
    source: "Wikimedia Commons",
    curated: "2026-05-11",
    added_images: Object.keys(photos).length,
    missing_images: missingImages
  };
})();
