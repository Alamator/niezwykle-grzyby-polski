(() => {
  const appData = window.LANDSCAPE_RECORD_APP_DATA;
  if (!appData || !Array.isArray(appData.landscapeRecords)) return;

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

  const ccBy20 = "https://creativecommons.org/licenses/by/2.0/";
  const ccBy25 = "https://creativecommons.org/licenses/by/2.5/";
  const ccBy30 = "https://creativecommons.org/licenses/by/3.0/";
  const ccBy40 = "https://creativecommons.org/licenses/by/4.0/";
  const ccBySa20 = "https://creativecommons.org/licenses/by-sa/2.0/";
  const ccBySa30 = "https://creativecommons.org/licenses/by-sa/3.0/";
  const ccBySa30Pl = "https://creativecommons.org/licenses/by-sa/3.0/pl/deed.en";
  const ccBySa40 = "https://creativecommons.org/licenses/by-sa/4.0/";

  const photos = {
    "pustynia-bledowska": photo(
      "20140619 Pustynia Błędowska w Chechle 3457.jpg",
      "Pustynia Błędowska, szeroka powierzchnia jasnych piasków",
      "Jakub Hałun",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "ruchome-wydmy-slowinski": photo(
      "Ruchome wydmy - Słowiński Park Narodowy 01.jpg",
      "Ruchome wydmy w Słowińskim Parku Narodowym",
      "Bogusław Chyła",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    "krzywy-las": photo(
      "Krzywy las - 003.jpg",
      "Krzywy Las w Nowym Czarnowie, sosny wygięte u nasady",
      "Maciek R. Drewniak",
      "CC BY 4.0",
      ccBy40
    ),
    "sosna-na-szczudlach-welcz": photo(
      "Sosna na szczudłach - Pine on Stilts - Wełecz 20230501 09.jpg",
      "Sosna na Szczudłach w Wełeczu z odsłoniętymi korzeniami",
      "Dwxn",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "zatopiony-las-jezioro-pile": photo(
      "Borne Sulinowo plaza A555.jpg",
      "Kadr kontekstowy: jezioro Pile przy Bornem Sulinowie, nad którym opisywany jest podwodny las",
      "Ciacho5",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "klify-wolinskiego-parku-narodowego": photo(
      "Woliński Park Narodowy klif 2016-08-25 p.jpg",
      "Klif w Wolińskim Parku Narodowym",
      "Przykuta",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "klif-orlowski": photo(
      "Klif Orłowski z boku od mola 2021-03-28.jpg",
      "Klif Orłowski widziany od strony mola",
      "Maciej Nux",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "delta-swiny-kraina-44-wysp": photo(
      "Delta Wsteczna Świny - 2018-06-02 15-33-08.jpg",
      "Delta Wsteczna Świny, mozaika kanałów i wysp",
      "Radosław Drożdżewski (Zwiadowca21)",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "mierzeja-helska": photo(
      "Piaskowe zbocze Mierzeja Helska.jpg",
      "Piaskowe zbocze Mierzei Helskiej",
      "Adrian Tync",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "mewia-lacha-ujscie-wisly": photo(
      "Rezerwat przyrody Mewia łacha w Mikoszewie - sierpień 2023.jpg",
      "Łacha piasku w rezerwacie Mewia Łacha przy ujściu Wisły",
      "Koefbac",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "jezioro-hancza": photo(
      "Jezioro Hańcza, 2018-08-06 (01).jpg",
      "Jezioro Hańcza, najgłębsze jezioro Polski",
      "Nostrix",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "jezioro-sniardwy": photo(
      "Jezioro Śniardwy - Niedźwiedzi Róg 1.jpg",
      "Jezioro Śniardwy widziane z Niedźwiedziego Rogu",
      "Lesnydzban",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "bagna-biebrzanskie": photo(
      "Długa Luka, Bagno Ławki, Biebrzański Park Narodowy, Polska (4664146151).jpg",
      "Bagno Ławki w Biebrzańskim Parku Narodowym",
      "Frank Vassen",
      "CC BY 2.0",
      ccBy20
    ),
    "narwianski-park-narodowy": photo(
      "Narwiański Park Narodowy Waniewo.jpg",
      "Narwiański Park Narodowy w okolicach Waniewa",
      "Grzegorz Janoszka",
      "CC BY 3.0",
      ccBy30
    ),
    "ujscie-warty": photo(
      "Rozlewisko Postomii, Park Narodowy Ujście Warty, 20230812 1553 7700.jpg",
      "Rozlewisko Postomii w Parku Narodowym Ujście Warty",
      "Jakub Hałun",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "poleski-park-narodowy-durne-bagno": photo(
      "Durne Bagno in Poleski National Park.jpg",
      "Durne Bagno w Poleskim Parku Narodowym widziane z wieży obserwacyjnej",
      "Happa",
      "CC BY 3.0",
      ccBy30
    ),
    "dolina-rospudy": photo(
      "Rospuda river fixed.jpg",
      "Rospuda w naturalnej dolinie rzecznej",
      "Artur Mikołajewski",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "bifurkacja-wagrowiecka": photo(
      "Welna Nielba.jpg",
      "Skrzyżowanie rzek Wełny i Nielby w Wągrowcu",
      "Slawomir Duda-Klimaszewski",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "niebieskie-zrodla": photo(
      "Blue Sources Nature Reserve in Tomaszow Mazowiecki - 34.jpg",
      "Niebieskie Źródła w Tomaszowie Mazowieckim",
      "Jolanta Dyr",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "przelom-dunajca": photo(
      "Dunajec Gorge - Limestone Rocks 2.jpg",
      "Wapienne skały Przełomu Dunajca",
      "Ingo Mehling",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "wawoz-korzeniowy-dol": photo(
      "Panorama of Wąwóz Korzeniowy Dół, Kazimierz Dolny, Poland.jpg",
      "Wąwóz Korzeniowy Dół z odsłoniętymi korzeniami drzew",
      "7oanna",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "szumy-nad-tanwia": photo(
      "Huta Szumy, most na Tanwi.jpg",
      "Tanew w okolicach Szumów nad Tanwią",
      "Antekbojar",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "przelom-kamiennej-baltow": photo(
      "Baltow - rzeka Kamienna.JPG",
      "Rzeka Kamienna w Bałtowie",
      "Alina Zienowicz (Ala z)",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "kolorowe-jeziorka": photo(
      "Rudawy Janowickie, kolorowe jeziorka - purpurowe.jpg",
      "Purpurowe Jeziorko w Rudawach Janowickich",
      "Monika Ćwiklińska",
      "CC BY 3.0",
      ccBy30
    ),
    "jezioro-turkusowe-wapnica": photo(
      "Wapnica Jezioro Turkusowe 2011 MZW 00343.jpg",
      "Jezioro Turkusowe w Wapnicy na wyspie Wolin",
      "M Z Wojalski",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "park-grodek-polskie-malediwy": photo(
      "2025-05 Jaworzno Park Gródek (33).jpg",
      "Park Gródek w Jaworznie, zalane dawne wyrobisko",
      "Marek Mróz",
      "CC BY 4.0",
      ccBy40
    ),
    "luk-muzakowa": photo(
      "Staw, Dawna Kopalnia Babina, Park Krajobrazowy Łuk Mużakowa, 20230812 0745 7387.jpg",
      "Staw w dawnej kopalni Babina na terenie Parku Krajobrazowego Łuk Mużakowa",
      "Jakub Hałun",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "jezioro-afryka-kopalnia-babina": photo(
      "Jezioro Afryka, Dawna Kopalnia Babina, Park Krajobrazowy Łuk Mużakowa, 20230812 0818 7470.jpg",
      "Jezioro Afryka w dawnej kopalni Babina",
      "Jakub Hałun",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "mofeta-swidzińskiego": photo(
      "Mofeta w Jastrzębiku BS17.2.jpg",
      "Mofeta w Jastrzębiku, naturalna emisja dwutlenku węgla",
      "Jerzy Opioła",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "mofety-tylicz": photo(
      "Mofeta Tylicz.jpg",
      "Mofeta w Tyliczu",
      "Gregdewal",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "belkotka-iwonicz": photo(
      "Iwonicz Zdrój Bełkotka 2015.08.19 p.jpg",
      "Źródło Bełkotka w Iwoniczu-Zdroju",
      "Przykuta",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "gory-pieprzowe": photo(
      "Sandomierz Góry Pieprzowe Wisła.jpg",
      "Góry Pieprzowe w Sandomierzu z widokiem na Wisłę",
      "Przykuta",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "sniezne-kotly": photo(
      "Śnieżne Kotły (Snežné jámy, Schneegruben), Krkonoše mountains 03.jpg",
      "Śnieżne Kotły w Karkonoszach",
      "Pudelek",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "wielka-siklawa-dolina-pieciu-stawow": photo(
      "Siklawa a2.jpg",
      "Wielka Siklawa w Tatrach",
      "Jerzy Opioła",
      "CC BY 2.5",
      ccBy25
    ),
    "szczeliniec-wielki": photo(
      "2015 Szczeliniec Wielki 02.JPG",
      "Szczeliniec Wielki, piaskowcowe ściany i szczeliny",
      "Jacek Halicki",
      "CC BY-SA 3.0 PL",
      ccBySa30Pl
    ),
    "bledne-skaly": photo(
      "Błędne Skały.jpg",
      "Błędne Skały, wąskie przejście w piaskowcowym labiryncie",
      "Op",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "skalki-pieklo-nieklan": photo(
      "2025 Skałki Piekło pod Niekłaniem 12.jpg",
      "Skałki Piekło pod Niekłaniem, leśne formy piaskowcowe",
      "Zala",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "dolina-pradnika-maczuga-herkulesa": photo(
      "20190525 Maczuga Herkulesa Pieskowa Skała 0827 2500 DxO.jpg",
      "Maczuga Herkulesa w Dolinie Prądnika, kadr reprezentujący krajobraz Ojcowa",
      "Jakub Hałun",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "brama-bolechowicka": photo(
      "Brama Bolechowicka DK33.jpg",
      "Brama Bolechowicka, wapienne wejście do doliny",
      "Jerzy Opioła",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "goloborza-lysogor": photo(
      "Gołoborze Łysa Góra Góry Świętokrzyskie 2020-08-15 09.jpg",
      "Gołoborze na Łysej Górze w Górach Świętokrzyskich",
      "Agnieszka Kwiecień, Nova",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "torfowisko-pod-zielencem": photo(
      "Torfowisko pod Zieleńcem, 02.jpg",
      "Torfowisko pod Zieleńcem",
      "Jacek Halicki",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "poloniny-bieszczadzkie": photo(
      "Połonina Wetlińska - Smerek.JPG",
      "Połonina Wetlińska i Smerek w Bieszczadach",
      "Pudelek",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "ostrzyca-proboszczowicka": photo(
      "Ostrzyca Proboszczowicka.jpg",
      "Ostrzyca Proboszczowicka widziana z Łysej Góry",
      "Jojo_1",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "organy-wielislawskie": photo(
      "2010-07 Organy Wielisławskie (2).jpg",
      "Organy Wielisławskie, ściana skał wulkanicznych",
      "Marek Mróz",
      "CC BY 4.0",
      ccBy40
    ),
    "glazowisko-bachanowo": photo(
      "Głazowisko Bachanowo.jpg",
      "Głazowisko Bachanowo nad Czarną Hańczą",
      "Rumun999",
      "CC BY-SA 2.0",
      ccBySa20
    ),
    "gora-sleza": photo(
      "Ślęża - widok z Wieżycy.jpg",
      "Ślęża widziana z Wieżycy",
      "Adam Dziura",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "gora-sw-anny": photo(
      "Góra Świętej Anny, ulica Leśnicka 02.jpg",
      "Góra Świętej Anny, krajobraz miejscowości na wzgórzu",
      "Kamil Czaiński",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "jaskinia-mechowska": photo(
      "Mechowo, groty mechowskie 4.jpg",
      "Groty Mechowskie w Mechowie",
      "1bumer",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    rysy: photo(
      "Rysy 006.JPG",
      "Szczyt Rysów w Tatrach",
      "Milan Bališin",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "raczki-elblaskie": photo(
      "Poland Raczki Elblaskie - depression sign.jpg",
      "Znak najniższego punktu Polski w Raczkach Elbląskich",
      "Merlin",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "punkty-antygrawitacyjne-karpacz-swieradow": photo(
      "Anomalia grawitacyjna.jpg",
      "Znak anomalii grawitacyjnej w Karpaczu",
      "SkywalkerPL",
      "CC BY 3.0",
      ccBy30
    ),
    "ponidzie-polska-toskania": photo(
      "Nida Wislica 20060503.jpg",
      "Rzeka Nida koło Wiślicy w krajobrazie Ponidzia",
      "Jakub Hałun",
      "CC BY-SA 3.0",
      ccBySa30
    ),
    "szwajcaria-kaszubska": photo(
      "Dólnô Brodnica (25).JPG",
      "Brodnica Dolna w krajobrazie Szwajcarii Kaszubskiej",
      "Gdaniec",
      "CC BY 3.0",
      ccBy30
    ),
    "sokolowsko-dolnoslaskie-davos": photo(
      "Sokolowsko from Wlostowa 2011-04.jpg",
      "Sokołowsko widziane z Włostowej",
      "JDavid",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "tarnow-polski-biegun-ciepla": photo(
      "Tarnow panorama noc.jpg",
      "Panorama Tarnowa ze wzgórza św. Marcina",
      "Andrzej Otrębski",
      "CC BY-SA 4.0",
      ccBySa40
    ),
    "skit-odrynki": photo(
      "Odrynki Skete 20230328.jpg",
      "Skit w Odrynkach z lotu ptaka",
      "Krzysztof Maria Różański (Upior polnocy)",
      "CC BY-SA 4.0",
      ccBySa40
    )
  };

  for (const item of appData.landscapeRecords) {
    Object.assign(item, photos[item.id] || {});
  }

  appData.landscapeRecordsPhotoPack = {
    title: "Rekordy krajobrazu Commons photo pack v01",
    applied: Object.keys(photos).length,
    source: "Wikimedia Commons",
    note: "Zdjęcia osadzone z atrybucją autora, źródła, licencji i informacją o sposobie użycia. Kilka trudnych obiektów ma uczciwie opisany kadr kontekstowy lub reprezentatywny z tego samego krajobrazu."
  };
})();
