(() => {
  const appData = window.BIRD_APP_DATA;
  if (!appData || !Array.isArray(appData.birds)) return;

  const commonsImage = (fileName) =>
    `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}?width=900`;

  const embeddedFromCommons =
    "osadzenie z Wikimedia Commons przez Special:Redirect; przeglądarka pobiera wersję skalowaną do ok. 900 px; bez lokalnego kopiowania pliku";

  const photo = (fileName, alt, author, source, license, licenseUrl) => ({
    image: commonsImage(fileName),
    image_alt: alt,
    image_author: author,
    image_source: source,
    image_license: license,
    license_url: licenseUrl,
    image_modifications: embeddedFromCommons
  });

  const photos = {
    bielik: photo(
      "Fighting white-tailed eagles (Haliaeetus albicilla) (2).jpg",
      "Bieliki (Haliaeetus albicilla) z rozpostartymi skrzydłami podczas starcia w powietrzu",
      "Andreas Weith",
      "https://commons.wikimedia.org/wiki/File:Fighting_white-tailed_eagles_(Haliaeetus_albicilla)_(2).jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    mysikrolik: photo(
      "Goldcrest 1.jpg",
      "Mysikrólik (Regulus regulus), bardzo mały ptak z żółtym paskiem na głowie",
      "Francis C. Franklin",
      "https://commons.wikimedia.org/wiki/File:Goldcrest_1.jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    zniczek: photo(
      "Firecrest 2024 01 28 02.jpg",
      "Zniczek (Regulus ignicapilla), drobny ptak z kontrastowym wzorem głowy",
      "Alexis Lours",
      "https://commons.wikimedia.org/wiki/File:Firecrest_2024_01_28_02.jpg",
      "CC BY 4.0",
      "https://creativecommons.org/licenses/by/4.0/"
    ),
    puchacz: photo(
      "Bubo bubo portrait.jpg",
      "Puchacz (Bubo bubo), portret dużej sowy z pomarańczowymi oczami",
      "Flickr user indygnome",
      "https://commons.wikimedia.org/wiki/File:Bubo_bubo_portrait.jpg",
      "CC BY 2.0",
      "https://creativecommons.org/licenses/by/2.0/"
    ),
    "jerzyk-zwyczajny": photo(
      "Common Swift 2025 07 18 02.jpg",
      "Jerzyk zwyczajny (Apus apus) w locie na jasnym tle",
      "Alexis Lours",
      "https://commons.wikimedia.org/wiki/File:Common_Swift_2025_07_18_02.jpg",
      "CC BY 4.0",
      "https://creativecommons.org/licenses/by/4.0/"
    ),
    "sokol-wedrowny": photo(
      "Peregrine falcon (Falco peregrinus) in flight, Cape Baily, Kamay Botany Bay NSW Jun 2022.jpg",
      "Sokół wędrowny (Falco peregrinus) w locie, widoczna smukła sylwetka drapieżnika",
      "Kytabu",
      "https://commons.wikimedia.org/wiki/File:Peregrine_falcon_(Falco_peregrinus)_in_flight,_Cape_Baily,_Kamay_Botany_Bay_NSW_Jun_2022.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    szlamnik: photo(
      "Bar-tailed Godwit.jpg",
      "Szlamnik (Limosa lapponica), brodziec z długim dziobem stojący w płytkiej wodzie",
      "Andreas Trepte",
      "https://commons.wikimedia.org/wiki/File:Bar-tailed_Godwit.jpg",
      "CC BY-SA 2.5",
      "https://creativecommons.org/licenses/by-sa/2.5/"
    ),
    dubelt: photo(
      "Gallinago media 57850158.jpg",
      "Dubelt (Gallinago media), skryty ptak o brązowym maskującym upierzeniu",
      "konstantinseliverstov",
      "https://commons.wikimedia.org/wiki/File:Gallinago_media_57850158.jpg",
      "CC BY 4.0",
      "https://creativecommons.org/licenses/by/4.0/"
    ),
    "slonka-zwyczajna": photo(
      "Scolopax rusticola in hands.jpg",
      "Słonka zwyczajna (Scolopax rusticola), ptak o liściastym kamuflażu trzymany do dokumentacji",
      "Акутагава",
      "https://commons.wikimedia.org/wiki/File:Scolopax_rusticola_in_hands.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    uszatka: photo(
      "Asio otus.jpg",
      "Uszatka (Asio otus), sowa z pęczkami piór przypominającymi uszy",
      "BS Thurner Hof",
      "https://commons.wikimedia.org/wiki/File:Asio_otus.jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    "puszczyk-zwyczajny": photo(
      "Strix aluco aluco.jpg",
      "Puszczyk zwyczajny (Strix aluco), sowa o ciemnych oczach siedząca na gałęzi",
      "Chrumps",
      "https://commons.wikimedia.org/wiki/File:Strix_aluco_aluco.jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    pustulka: photo(
      "Falco tinnunculus (female).jpg",
      "Pustułka (Falco tinnunculus), samica sokoła widziana z bliska",
      "Hans Hillewaert",
      "https://commons.wikimedia.org/wiki/File:Falco_tinnunculus_(female).jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    dudek: photo(
      "Upupa epops (057A2126).jpg",
      "Dudek (Upupa epops), ptak z rdzawym czubem i czarno-białymi skrzydłami",
      "Luckhy86",
      "https://commons.wikimedia.org/wiki/File:Upupa_epops_(057A2126).jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "nawalnik-duzy": photo(
      "Leach's Storm-petrel Saint-Jean-de-Monts 01.jpg",
      "Nawałnik duży (Hydrobates leucorhous), mały ptak morski leżący na plaży",
      "Alexis Lours",
      "https://commons.wikimedia.org/wiki/File:Leach%27s_Storm-petrel_Saint-Jean-de-Monts_01.jpg",
      "CC BY 4.0",
      "https://creativecommons.org/licenses/by/4.0/"
    ),
    remiz: photo(
      "Eurasian Penduline Tit - Remiz pendulinus 01.jpg",
      "Remiz (Remiz pendulinus), mały ptak z czarną maską siedzący na gałązce",
      "Zeynel Cebeci",
      "https://commons.wikimedia.org/wiki/File:Eurasian_Penduline_Tit_-_Remiz_pendulinus_01.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    zimorodek: photo(
      "Alcedo atthis 3494.jpg",
      "Zimorodek (Alcedo atthis), kolorowy ptak z turkusowym grzbietem na gałęzi",
      "Ravi Vaidyanathan",
      "https://commons.wikimedia.org/wiki/File:Alcedo_atthis_3494.jpg",
      "CC BY 2.5",
      "https://creativecommons.org/licenses/by/2.5/"
    ),
    zolna: photo(
      "European bee-eater (Merops apiaster).jpg",
      "Żołna (Merops apiaster), barwny ptak o żółto-turkusowym upierzeniu",
      "Charles J. Sharp",
      "https://commons.wikimedia.org/wiki/File:European_bee-eater_(Merops_apiaster).jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    brzegowka: photo(
      "Riparia riparia (29052430095).jpg",
      "Brzegówka (Riparia riparia), drobna jaskółka w locie",
      "Donald Hobern",
      "https://commons.wikimedia.org/wiki/File:Riparia_riparia_(29052430095).jpg",
      "CC BY 2.0",
      "https://creativecommons.org/licenses/by/2.0/"
    ),
    dymowka: photo(
      "Hirundo rustica.jpg",
      "Dymówka (Hirundo rustica), jaskółka karmiąca młode przy gnieździe",
      "Immanuel Giel",
      "https://commons.wikimedia.org/wiki/File:Hirundo_rustica.jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    srokosz: photo(
      "Lanius excubitor (28541051502).jpg",
      "Srokosz (Lanius excubitor), szary ptak z czarną maską siedzący na gałęzi",
      "yves hoebeke",
      "https://commons.wikimedia.org/wiki/File:Lanius_excubitor_(28541051502).jpg",
      "CC BY-SA 2.0",
      "https://creativecommons.org/licenses/by-sa/2.0/"
    ),
    kukulka: photo(
      "Common cuckoo (Cuculus canorus).jpg",
      "Kukułka (Cuculus canorus), smukły ptak o prążkowanym spodzie ciała",
      "Ron Knight",
      "https://commons.wikimedia.org/wiki/File:Common_cuckoo_(Cuculus_canorus).jpg",
      "CC BY 2.0",
      "https://creativecommons.org/licenses/by/2.0/"
    ),
    "krzyzodziob-swierkowy": photo(
      "Loxia curvirostra2.jpg",
      "Krzyżodziób świerkowy (Loxia curvirostra), ptak z wyraźnie skrzyżowanym dziobem",
      "David Menke",
      "https://commons.wikimedia.org/wiki/File:Loxia_curvirostra2.jpg",
      "Public domain",
      "https://creativecommons.org/publicdomain/mark/1.0/"
    ),
    gluszec: photo(
      "Tetrao urogallus.JPG",
      "Głuszec (Tetrao urogallus), duży ciemny samiec na śniegu",
      "Zouavman Le Zouave",
      "https://commons.wikimedia.org/wiki/File:Tetrao_urogallus.JPG",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    "lelek-kozodoj": photo(
      "Caprimulgus europaeus 1200x855.jpg",
      "Lelek kozodój (Caprimulgus europaeus), nocny ptak w maskującym ubarwieniu na ziemi",
      "Jenny Th",
      "https://commons.wikimedia.org/wiki/File:Caprimulgus_europaeus_1200x855.jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    szablodziob: photo(
      "Avocet (Recurvirostra avosetta).jpg",
      "Szablodziób (Recurvirostra avosetta), czarno-biały ptak z zadartym dziobem",
      "Charles J. Sharp",
      "https://commons.wikimedia.org/wiki/File:Avocet_(Recurvirostra_avosetta).jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    pluszcz: photo(
      "Cinclus cinclus.jpg",
      "Pluszcz (Cinclus cinclus), ptak z białym śliniakiem związany z potokami",
      "Nikola Veljković",
      "https://commons.wikimedia.org/wiki/File:Cinclus_cinclus.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    pomurnik: photo(
      "Tichodroma muraria - Aragon.jpg",
      "Pomurnik (Tichodroma muraria), ptak na skale z widocznymi czerwonymi polami skrzydeł",
      "Kookaburra 81",
      "https://commons.wikimedia.org/wiki/File:Tichodroma_muraria_-_Aragon.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    wodniczka: photo(
      "Acrocephalus paludicola 102494875.jpg",
      "Wodniczka (Acrocephalus paludicola), drobny ptak trzcinowy na źdźble",
      "Christoph Moning",
      "https://commons.wikimedia.org/wiki/File:Acrocephalus_paludicola_102494875.jpg",
      "CC BY 4.0",
      "https://creativecommons.org/licenses/by/4.0/"
    ),
    "puszczyk-mszarny": photo(
      "Great Gray Owl (Strix nebulosa) (6182442647).jpg",
      "Puszczyk mszarny (Strix nebulosa), wielka szara sowa z okrągłą tarczą twarzową",
      "Kameron Perensovich",
      "https://commons.wikimedia.org/wiki/File:Great_Gray_Owl_(Strix_nebulosa)_(6182442647).jpg",
      "CC BY-SA 2.0",
      "https://creativecommons.org/licenses/by-sa/2.0/"
    ),
    "czajka-stepowa": photo(
      "Vanellus gregarius.jpg",
      "Czajka stepowa (Vanellus gregarius), siewkowiec stojący na otwartym terenie",
      "Lip Kee",
      "https://commons.wikimedia.org/wiki/File:Vanellus_gregarius.jpg",
      "CC BY-SA 2.0",
      "https://creativecommons.org/licenses/by-sa/2.0/"
    ),
    "cyranka-modroskrzydla": photo(
      "Spatula discors.jpg",
      "Cyranka modroskrzydła (Spatula discors), kaczka z błękitnym panelem na skrzydle",
      "Alan D. Wilson, www.naturespicsonline.com",
      "https://commons.wikimedia.org/wiki/File:Spatula_discors.jpg",
      "CC BY-SA 2.5",
      "https://creativecommons.org/licenses/by-sa/2.5/"
    ),
    "mewa-delawarska": photo(
      "Ring-billed Gull (Larus delawarensis) RWD1.jpg",
      "Mewa delawarska (Larus delawarensis), mewa z czarną obrączką na dziobie",
      "Dick Daniels",
      "https://commons.wikimedia.org/wiki/File:Ring-billed_Gull_(Larus_delawarensis)_RWD1.jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    )
  };

  const missingImages = [];

  for (const bird of appData.birds) {
    const curatedPhoto = photos[bird.id];
    if (curatedPhoto) {
      Object.assign(bird, curatedPhoto);
    } else {
      missingImages.push(bird.id);
    }
  }

  window.BIRD_APP_DATA.bird_photo_pack_v01 = {
    title: "Wikimedia Commons photo pack for bird curiosities",
    source: "Wikimedia Commons",
    curated: "2026-05-10",
    added_images: Object.keys(photos).length,
    missing_images: missingImages
  };
})();
