(() => {
  const appData = window.FLOWER_APP_DATA;
  if (!appData || !Array.isArray(appData.flowers)) return;

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
    "aldrowanda-pecherzykowata": photo(
      "Aldrovanda vesiculosa kz04.jpg",
      "Aldrowanda pęcherzykowata (Aldrovanda vesiculosa), wodne pędy z okółkami pułapkowych liści",
      "Krzysztof Ziarnek, Kenraiz",
      "https://commons.wikimedia.org/wiki/File:Aldrovanda_vesiculosa_kz04.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "plywacz-zwyczajny": photo(
      "Utricularia vulgaris 001.JPG",
      "Pływacz zwyczajny (Utricularia vulgaris), żółte kwiaty wyniesione nad powierzchnię wody",
      "H. Zell",
      "https://commons.wikimedia.org/wiki/File:Utricularia_vulgaris_001.JPG",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    rosiczka: photo(
      "Drosera rotundifolia leaf1.jpg",
      "Rosiczka okrągłolistna (Drosera rotundifolia), liść z czerwonymi włoskami i kroplami lepu",
      "Petr Dlouhý",
      "https://commons.wikimedia.org/wiki/File:Drosera_rotundifolia_leaf1.jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    tlustosz: photo(
      "Pinguicula vulgaris01(js).jpg",
      "Tłustosz pospolity (Pinguicula vulgaris), rozetka lepkich liści i fioletowy kwiat",
      "Jerzy Strzelecki",
      "https://commons.wikimedia.org/wiki/File:Pinguicula_vulgaris01(js).jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "obrazki-plamiste": photo(
      "GevlekteAronskelk.jpg",
      "Obrazki plamiste (Arum maculatum), pochwa kwiatostanu i kolba w runie leśnym",
      "GerardM",
      "https://commons.wikimedia.org/wiki/File:GevlekteAronskelk.jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    "obrazki-alpejskie": photo(
      "Arum cylindraceum sl3.jpg",
      "Obrazki alpejskie (Arum cylindraceum), zielonkawa pochwa kwiatostanu i kolba",
      "Stefan.lefnaer",
      "https://commons.wikimedia.org/wiki/File:Arum_cylindraceum_sl3.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "swietlik-mszysty": photo(
      "Schistostega pennata s2 zoom.JPG",
      "Świetlik mszysty (Schistostega pennata), zielony połysk splątka w wilgotnym mikrosiedlisku",
      "Alpsdake",
      "https://commons.wikimedia.org/wiki/File:Schistostega_pennata_s2_zoom.JPG",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "wiesiolek-dwuletni": photo(
      "Oenothera biennis kz02.jpg",
      "Wiesiołek dwuletni (Oenothera biennis), żółte kwiaty i pąki na szczycie pędu",
      "Krzysztof Ziarnek, Kenraiz",
      "https://commons.wikimedia.org/wiki/File:Oenothera_biennis_kz02.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "bniec-bialy": photo(
      "Silene latifolia kz06.jpg",
      "Bniec biały (Silene latifolia), białe kwiaty na smukłych pędach",
      "Krzysztof Ziarnek, Kenraiz",
      "https://commons.wikimedia.org/wiki/File:Silene_latifolia_kz06.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "chaber-blawatek": photo(
      "Cornflowers Centaurea cyanus.jpg",
      "Chaber bławatek (Centaurea cyanus), intensywnie niebieskie koszyczki kwiatowe",
      "Petr Vodička",
      "https://commons.wikimedia.org/wiki/File:Cornflowers_Centaurea_cyanus.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "fiolek-trojbarwny": photo(
      "Viola tricolor Fiołek trójbarwny 2020-07-02 01.jpg",
      "Fiołek trójbarwny (Viola tricolor), drobny kwiat z kontrastowym rysunkiem płatków",
      "Agnieszka Kwiecień, Nova",
      "https://commons.wikimedia.org/wiki/File:Viola_tricolor_Fio%C5%82ek_tr%C3%B3jbarwny_2020-07-02_01.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "dwulistnik-pszczeli": photo(
      "Ophrys apifera Bienen-Ragwurz 2014.jpg",
      "Dwulistnik pszczeli (Ophrys apifera), storczyk z warżką przypominającą owada",
      "Tuxyso",
      "https://commons.wikimedia.org/wiki/File:Ophrys_apifera_Bienen-Ragwurz_2014.jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    "obuwik-pospolity": photo(
      "Cypripedium calceolus - Kaunis kuldking Keila.jpg",
      "Obuwik pospolity (Cypripedium calceolus), żółta warżka w kształcie pantofelka",
      "Ivar Leidus",
      "https://commons.wikimedia.org/wiki/File:Cypripedium_calceolus_-_Kaunis_kuldking_Keila.jpg",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/"
    ),
    "podkolan-bialy": photo(
      "Platanthera bifolia (flower).jpg",
      "Podkolan biały (Platanthera bifolia), białe kwiaty storczyka z długimi ostrogami",
      "Hans Hillewaert",
      "https://commons.wikimedia.org/wiki/File:Platanthera_bifolia_(flower).jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "podkolan-zielonawy": photo(
      "Platanthera chlorantha Podkolan zielonawy 2022-06-26 02.jpg",
      "Podkolan zielonawy (Platanthera chlorantha), zielonkawe kwiaty z ostrogami",
      "Agnieszka Kwiecień, Nova",
      "https://commons.wikimedia.org/wiki/File:Platanthera_chlorantha_Podkolan_zielonawy_2022-06-26_02.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "kukuczka-kapturkowata": photo(
      "Neottianthe cucullata (flower).JPG",
      "Kukuczka kapturkowata (Neottianthe cucullata), różowawy kwiat storczyka z kapturkowatą budową",
      "Alpsdake",
      "https://commons.wikimedia.org/wiki/File:Neottianthe_cucullata_(flower).JPG",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "storzan-bezlistny": photo(
      "Epipogium aphyllum 01.jpg",
      "Storzan bezlistny (Epipogium aphyllum), blady bezzieleniowy storczyk wyrastający z runa",
      "Joachim Lutz",
      "https://commons.wikimedia.org/wiki/File:Epipogium_aphyllum_01.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "luskiewnik-rozowy": photo(
      "Lathraea squamaria Poland.jpg",
      "Łuskiewnik różowy (Lathraea squamaria), różowa pasożytnicza roślina bez zielonych liści",
      "Agnieszka Kwiecień (Nova)",
      "https://commons.wikimedia.org/wiki/File:Lathraea_squamaria_Poland.jpg",
      "CC BY 2.5",
      "https://creativecommons.org/licenses/by/2.5/"
    ),
    "zaraza-zolta": photo(
      "Orobanche flava Petasites kablikianus 2023-08-22 Dolina Kościeliska 03.jpg",
      "Zaraza żółta (Orobanche flava), żółtawy pasożytniczy pęd kwiatowy bez chlorofilu",
      "Agnieszka Kwiecień, Nova",
      "https://commons.wikimedia.org/wiki/File:Orobanche_flava_Petasites_kablikianus_2023-08-22_Dolina_Ko%C5%9Bcieliska_03.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "gnidosz-rozeslany": photo(
      "Pedicularis sylvatica 280407a.jpg",
      "Gnidosz rozesłany (Pedicularis sylvatica), różowe kwiaty półpasożytniczej rośliny torfowiskowej",
      "Bernd Haynold",
      "https://commons.wikimedia.org/wiki/File:Pedicularis_sylvatica_280407a.jpg",
      "CC BY 2.5",
      "https://creativecommons.org/licenses/by/2.5/"
    ),
    "pszeniec-gajowy": photo(
      "Melampyrum nemorosum kz10.jpg",
      "Pszeniec gajowy (Melampyrum nemorosum), żółte kwiaty pod fioletowymi podsadkami",
      "Krzysztof Ziarnek, Kenraiz",
      "https://commons.wikimedia.org/wiki/File:Melampyrum_nemorosum_kz10.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "dyptam-jesionolistny": photo(
      "Dictamnus albus 2016-04-19 7891.JPG",
      "Dyptam jesionolistny (Dictamnus albus), jasnoróżowe kwiaty z ciemnym żyłkowaniem",
      "Salicyna",
      "https://commons.wikimedia.org/wiki/File:Dictamnus_albus_2016-04-19_7891.JPG",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "wawrzynek-wilczelyko": photo(
      "Daphne mezereum flowers - Keila.jpg",
      "Wawrzynek wilczełyko (Daphne mezereum), różowe kwiaty wyrastające bezpośrednio na pędzie",
      "Ivar Leidus",
      "https://commons.wikimedia.org/wiki/File:Daphne_mezereum_flowers_-_Keila.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "kopytnik-pospolity": photo(
      "Asarum europaeum flower 050403.jpg",
      "Kopytnik pospolity (Asarum europaeum), ukryty brunatny kwiat przy ziemi",
      "Bernd Haynold",
      "https://commons.wikimedia.org/wiki/File:Asarum_europaeum_flower_050403.jpg",
      "CC BY 2.5",
      "https://creativecommons.org/licenses/by/2.5/"
    ),
    "barszcz-zwyczajny": photo(
      "Heracleum sphondylium with flies and a spider.jpg",
      "Barszcz zwyczajny (Heracleum sphondylium), baldach kwiatowy odwiedzany przez muchówki i pająka",
      "Pierre-Jacques DESPA",
      "https://commons.wikimedia.org/wiki/File:Heracleum_sphondylium_with_flies_and_a_spider.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "wilczomlecz-pstry": photo(
      "Euphorbia epithymoides kz07.jpg",
      "Wilczomlecz pstry (Euphorbia epithymoides), żółtozielone podsadki tworzące efekt kwiatów",
      "Krzysztof Ziarnek, Kenraiz",
      "https://commons.wikimedia.org/wiki/File:Euphorbia_epithymoides_kz07.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "klokoczka-poludniowa": photo(
      "Staphylea pinnata kz01.jpg",
      "Kłokoczka południowa (Staphylea pinnata), białe kwiaty krzewu w zwisających gronach",
      "Krzysztof Ziarnek, Kenraiz",
      "https://commons.wikimedia.org/wiki/File:Staphylea_pinnata_kz01.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "czworolist-pospolity": photo(
      "Paris quadrifolia flower - Keila.jpg",
      "Czworolist pospolity (Paris quadrifolia), pojedynczy kwiat nad okółkiem czterech liści",
      "Ivar Leidus",
      "https://commons.wikimedia.org/wiki/File:Paris_quadrifolia_flower_-_Keila.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "sledziennica-skretolistna": photo(
      "Chrysosplenium alternifolium RF.jpg",
      "Śledziennica skrętolistna (Chrysosplenium alternifolium), żółtozielone podsadki przy drobnych kwiatach",
      "Robert Flogaus-Faust",
      "https://commons.wikimedia.org/wiki/File:Chrysosplenium_alternifolium_RF.jpg",
      "CC BY 4.0",
      "https://creativecommons.org/licenses/by/4.0/"
    ),
    "kurzyslad-polny": photo(
      "Lysimachia arvensis kz11.jpg",
      "Kurzyślad polny (Lysimachia arvensis), pomarańczowy kwiat dawnej Anagallis arvensis",
      "Krzysztof Ziarnek, Kenraiz",
      "https://commons.wikimedia.org/wiki/File:Lysimachia_arvensis_kz11.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/"
    ),
    "podejzrzon-ksiezycowy": photo(
      "Botrychium lunaria kz01.jpg",
      "Podejźrzon księżycowy (Botrychium lunaria), drobna paproć z półksiężycowatymi odcinkami liścia",
      "Krzysztof Ziarnek, Kenraiz",
      "https://commons.wikimedia.org/wiki/File:Botrychium_lunaria_kz01.jpg",
      "CC BY 4.0",
      "https://creativecommons.org/licenses/by/4.0/"
    )
  };

  const missingImages = [];

  for (const flower of appData.flowers) {
    const curatedPhoto = photos[flower.id];
    if (curatedPhoto) {
      Object.assign(flower, curatedPhoto);
    } else {
      missingImages.push(flower.id);
    }
  }

  window.FLOWER_APP_DATA.flower_photo_pack_v01 = {
    title: "Wikimedia Commons photo pack for flower curiosities",
    source: "Wikimedia Commons",
    curated: "2026-05-09",
    added_images: Object.keys(photos).length,
    missing_images: missingImages
  };
})();
