(() => {
  const appData = window.MUSHROOM_APP_DATA;
  if (!appData || !Array.isArray(appData.mushrooms) || !Array.isArray(appData.categories)) return;

  const commonsImage = (fileName) =>
    `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}?width=900`;

  const embeddedFromCommons =
    "osadzenie z Wikimedia Commons przez Special:Redirect; przeglądarka pobiera wersję skalowaną do ok. 900 px; bez lokalnego kopiowania pliku";

  const glowingCategory = {
    id: "swiecace-i-fluorescencyjne",
    label: "Świecące i fluorescencyjne",
    short: "Świecące",
    icon: "✨"
  };

  if (!appData.categories.some((category) => category.id === glowingCategory.id)) {
    appData.categories = [...appData.categories, glowingCategory];
  }

  const occurrenceById = {
    "okratek-australijski": ["Najwięcej stanowisk na południu Polski; gatunek się rozprzestrzenia.", "Najczęściej lasy, zwykle żyzne liściaste, ich skraje i drogi leśne; także łąki, murawy, sady, ogrody i zadrzewienia śródpolne.", "Gatunek obcy, pochodzi z Australii i Nowej Zelandii. Do 1990 r. znano w Polsce ok. 10 jego stanowisk, w 2012 r. ponad 90."],
    "sromotnik-bezwstydny": ["Cała Polska; pospolity, poza wyższymi partiami gór.", "Lasy, zarośla i parki; rośnie na ziemi, pojedynczo lub w grupach.", "W 1983 r. objęty w Polsce ochroną jako jeden z pierwszych 20 gatunków grzybów. Ochronę zniesiono w 2004 r., bo gatunek jest szeroko rozpowszechniony."],
    "madziak-psi": ["Rzadki; na Czerwonej liście ma status V (narażony).", "Najczęściej wilgotne, cieniste lasy liściaste na żyznych glebach.", "Owocniki pojawiają się latem i jesienią, zwykle w grupach. Do 2014 r. gatunek był w Polsce pod ochroną ścisłą."],
    "sromotnik-fiolkowy": ["Bardzo rzadki; głównie wydmy nad Bałtykiem, w głębi lądu sporadycznie.", "Piaszczyste, suche wydmy, przede wszystkim nadmorskie.", "Owocniki pojawiają się latem i jesienią. Na Czerwonej liście ma status V (narażony)."],
    "czarka-austriacka": ["W Polsce znana z co najmniej 170 stanowisk.", "Gałązki drzew liściastych, najczęściej wierzb, olch i klonów, w wilgotnych lasach, głównie łęgowych.", "Owocniki pojawiają się wczesną wiosną, od lutego do maja, czasem już w bezśnieżne zimy. Do 2014 r. gatunek był w Polsce pod ochroną ścisłą."],
    "kustrzebka-pomaranczowa": ["Notowana w różnych częściach Polski, m.in. w Sudetach, w Poznaniu i w Puszczy Białowieskiej.", "Na ziemi, głównie w otwartych, nasłonecznionych miejscach: na drogach leśnych i ich poboczach, w rowach, na wypaleniskach; także w parkach i ogrodach.", "Owocniki pojawiają się od późnego lata do jesieni, zwykle w grupach, często licznie."],
    "dzbankowka-kulista": ["Wszystkie 13 stanowisk podanych w polskim piśmiennictwie naukowym do 2020 r. to stanowiska historyczne.", "Wilgotne świerczyny z grubym dywanem mchu, często wzdłuż strumieni.", "Owocniki pojawiają się od zimy do wczesnego lata. Na Czerwonej liście ma status E (wymierający)."],
    "czareczka-dlugotrzonkowa": ["Bardzo rzadka: do 2018 r. znano w Polsce 7 stanowisk, w tym 4 historyczne.", "Żyzne lasy liściaste; rośnie przy murszejącym, zagrzebanym w ziemi drewnie drzew liściastych.", "Owocniki pojawiają się wczesną wiosną. Autorzy przeglądu z 2018 r. proponują uznać ją w Polsce za gatunek krytycznie zagrożony."],
    "krazkowka-zylkowana": ["Rzadka: do 2020 r. podano w Polsce 6 stanowisk historycznych i 27 nowych.", "Na ziemi w lasach liściastych i parkach, najchętniej na podłożu wapiennym.", "Owocniki pojawiają się w kwietniu i maju. W Polsce pod ochroną ścisłą od 1983 r."],
    "piestrzenica-kasztanowata": ["Cała Polska poza wyższymi partiami gór; dość częsta.", "Lasy sosnowe, często zręby i gleby piaszczyste; także miejsca z naruszoną glebą.", "Owocniki pojawiają się od marca do maja."],
    "smardz-jadalny": ["Cała Polska, ale rzadko: do 2020 r. podano ok. 260 stanowisk.", "Lasy liściaste i mieszane, łąki i łęgi, często pod jesionami; gleby nawożone.", "Owocniki pojawiają się w kwietniu i maju. Dawne stanowiska wymagają sprawdzenia, bo taksonomia smardzów w ostatnich latach się zmieniła."],
    "smardz-wyniosly": ["Do 2020 r. podano w Polsce ok. 50 stanowisk; wszystkie wymagają sprawdzenia po zmianach w taksonomii smardzów.", "Lasy i ich obrzeża, ziołorośla w świetlistych miejscach poza lasami; zwykle ubogie, piaszczyste gleby.", "W latach 1983–2014 był pod ochroną ścisłą."],
    "soplowka-jezowata": ["Rzadka: do 2021 r. podano w Polsce 3 stanowiska historyczne i 55 współczesnych.", "Lasy liściaste ze starym drzewostanem; pnie starszych, osłabionych lub martwych drzew, głównie buków i dębów.", "Owocniki rosną zwykle w dolnej części pnia, do wysokości kilku metrów. Na Czerwonej liście ma status E (wymierający)."],
    "soplowka-bukowa": ["Cała Polska, głównie południe i północ kraju, w zasięgu lasów bukowych.", "Wilgotne lasy liściaste; obumarłe, przewrócone lub złamane pnie, głównie bukowe, rzadziej brzozy i osiki.", "Do 2020 r. podano w Polsce ok. 300 stanowisk. Na Czerwonej liście ma status V (narażony)."],
    "siedzun-sosnowy": ["W Polsce dość częsty, choć na Czerwonej liście ma status R (rzadki).", "Lasy iglaste i mieszane; na korzeniach drzew iglastych, najczęściej sosny, u podstawy pnia.", "Na zaatakowanym drzewie owocniki pojawiają się co pewien czas przez kolejne lata. Od 1990 do 2014 r. gatunek był pod ochroną ścisłą."],
    "swiecznica-rozgaleziona": ["Dość rzadki; na Czerwonej liście ma status V (narażony).", "Butwiejące pnie i pniaki w lasach: drzew liściastych, m.in. brzozy omszonej i osiki, a także iglastych (sosny, świerka).", "Owocniki pojawiają się od czerwca do października."],
    "koralowka-groniasta": ["Rzadka; na Czerwonej liście ma status E (wymierający).", "Na ziemi wśród opadłych liści w lasach liściastych; tworzy mikoryzę z drzewami liściastymi, zwłaszcza z bukiem.", "Podobnych koralówek jest kilka; czasem do ich odróżnienia potrzebny jest mikroskop."],
    "pieknorog-lepki": ["Cała Polska; bardzo pospolity.", "Martwe drewno drzew iglastych w lasach iglastych i mieszanych.", "Owocniki pojawiają się od czerwca do listopada."],
    "trzesak-pomaranczowozolty": ["W Polsce gatunek pospolity.", "Opadłe gałęzie drzew liściastych, zwłaszcza buków, dębów, jesionów i leszczyn.", "Owocniki można spotkać przez cały rok, najczęściej późną jesienią, zimą i wiosną."],
    "uszak-bzowy": ["W Polsce pospolity, najczęściej na bzie czarnym.", "Osłabione lub martwe drewno, najczęściej bzu czarnego, także klonów, olch i innych drzew liściastych; w lasach, zaroślach, parkach i ogrodach.", "Rośnie przez cały rok, także w łagodne zimy. Przy długiej wilgotnej pogodzie tworzy całe kępy owocników."],
    "galaretnica-miesista": ["Notowana w różnych częściach Polski, m.in. na Pomorzu, w Poznaniu i w Puszczy Białowieskiej.", "Butwiejące drewno drzew liściastych, najczęściej buków i dębów, zwłaszcza powierzchnie cięcia pni i pniaków; sporadycznie drzewa iglaste.", "Owocniki pojawiają się głównie latem w wilgotną pogodę, późną jesienią i w łagodne zimy."],
    "kolczakowka-galaretowata": ["W Polsce gatunek pospolity.", "Martwe drewno drzew iglastych, zwykle świerków i sosen, w lasach iglastych i mieszanych.", "W Polsce pojawia się od lata do jesieni, czasem też wiosną i zimą."],
    "plomyczek-galaretowaty": ["Rzadka: do 2020 r. podano w Polsce 81 stanowisk, m.in. w Tatrach.", "Głównie zakopane, butwiejące drewno świerka lub jodły, rzadziej innych drzew; w górach, na glebach wapiennych.", "Wygląda, jakby rosła z ziemi, bo drewno, z którego wyrasta, bywa przykryte glebą."],
    "promieniak-wilgociomierz": ["Do 2020 r. podano w Polsce 12 stanowisk dawnych, 12 współczesnych i 15 wątpliwych.", "Suche, nasłonecznione miejsca: piaszczyste przydroża, obrzeża lasów liściastych, świetliste bory sosnowe, dąbrowy, ciepłolubne zarośla.", "Owocniki pojawiają się zwykle od lipca do września i mogą przetrwać nawet rok. Na Czerwonej liście ma status E (wymierający)."],
    "gwiazda-wieloporowa": ["Bardzo rzadka; do 2020 r. podano w Polsce 5 aktualnych, 8 historycznych i 1 wątpliwe stanowisko.", "Lasy sosnowe i świerkowe, także liściaste oraz kserotermiczne zarośla; najczęściej gleby piaszczyste i wapienne.", "W Europie owocnikuje od września do listopada. Na Czerwonej liście ma status E (wymierający)."],
    "gwiazdosz-wzniesiony": ["Rzadki: do 2020 r. znano w Polsce 3 stanowiska historyczne i 11 współczesnych.", "Zarośla bogate w azot, np. z lilakiem, głogiem, bzem czarnym i robinią.", "Owocniki pojawiają się od sierpnia do listopada. Na Czerwonej liście ma status E (wymierający)."],
    "gwiazdosz-czteropromienny": ["Rzadki; na Czerwonej liście ma status R.", "Lasy i zarośla, często pod świerkami, chętnie na podłożu wapiennym.", "Owocniki pojawiają się od sierpnia do października; suche można znaleźć jeszcze w bezśnieżne zimy, a nawet wiosną."],
    "berloweczka-zimowa": ["Rzadka; na Czerwonej liście ma status R.", "Ciepłe murawy, wśród traw i mchów, na suchych, piaszczystych lub wapiennych glebach.", "Mimo nazwy owocniki pojawiają się głównie jesienią. Do 2014 r. gatunek był w Polsce pod ochroną ścisłą."],
    "kubek-prazkowany": ["W Polsce gatunek pospolity.", "Szczątki drewna drzew liściastych i iglastych, liście i inne resztki roślinne; najczęściej w wilgotnych zaroślach i lasach.", "Owocniki wyrastają latem i jesienią, pojedynczo lub w grupach."],
    "gniazdniczka-kulista": ["W Polsce gatunek pospolity.", "Resztki drewna i opadłe gałązki; w lasach i zaroślach, nad potokami, przy drogach, w parkach.", "Owocniki pojawiają się od lata do jesieni."],
    "kolczakowka-piekaca": ["Do 2020 r. podano w Polsce 16 stanowisk.", "Lasy iglaste, także górskie; rośnie na ziemi, czasem na opadłych szyszkach, w mikoryzie głównie z sosną i świerkiem.", "Owocniki pojawiają się od lata do jesieni. Na Czerwonej liście ma status E (wymierający)."],
    "kolczakowka-niebieska": ["Do 2020 r. podano w Polsce 2 stanowiska historyczne, 7 współczesnych i 1 wątpliwe.", "Lasy iglaste, rzadziej mieszane, pod świerkami, sosnami i bukami; częściej w górach, zwłaszcza na glebach wapiennych.", "Owocniki pojawiają się od czerwca do października. Na Czerwonej liście ma status E (wymierający)."],
    "kolczakowka-wonna": ["Do 2020 r. podano w Polsce 20 stanowisk historycznych i 14 współczesnych.", "Lasy iglaste, częściej w górach; grzyb mikoryzowy.", "Owocniki pojawiają się od lipca do października. Na Czerwonej liście ma status E (wymierający)."],
    "zylkowiec-rozowawy": ["Rzadki; po ponad stu latach odnaleziony w Puszczy Białowieskiej, gdzie się rozprzestrzenia. W 2020 r. znano w Polsce 6 stanowisk.", "Martwe drewno w lasach liściastych, przede wszystkim drewno wiązów.", "W Europie owocniki pojawiają się głównie od sierpnia do listopada. Na Czerwonej liście ma status E (wymierający)."],
    "szyszkowiec-luskowaty": ["Rzadki; częściej w górach południowej Polski.", "Lasy iglaste, liściaste i mieszane; mikoryza z bukiem, a w górach ze świerkiem i jodłą.", "Owocniki pojawiają się od lata do jesieni. Na Czerwonej liście ma status R."],
    "krwistoborowik-szatanski": ["Bardzo rzadki; opisane w literaturze stanowiska leżą w Górach Kaczawskich i na Wyżynie Krakowsko-Częstochowskiej.", "Ciepłe lasy liściaste, zwłaszcza pod dębami i bukami; najczęściej na glebach wapiennych.", "Owocniki pojawiają się od lipca do września. Na Czerwonej liście ma status E (wymierający)."],
    "wilgotnica-czerniejaca": ["W Polsce gatunek pospolity.", "Wilgotne łąki i pastwiska.", "Owocniki pojawiają się od czerwca do października."],
    "lakowka-ametystowa": ["W Polsce gatunek pospolity.", "Lasy, ogrody i parki; na ziemi lub spróchniałym drewnie, pod drzewami liściastymi i iglastymi, najczęściej pod bukowcami (np. bukiem, dębem, brzozą).", "Kolor zależy od wilgotności i może blednąć."],
    "chlorowka-drobna": ["Notowana w Polsce, m.in. w Biebrzańskim Parku Narodowym.", "Dobrze spróchniałe, pozbawione kory kłody i gałęzie drzew liściastych i iglastych.", "Owocniki (2–5 mm) pojawiają się dość rzadko; częściej widać tylko drewno zabarwione grzybnią na zielono."],
    "grzybowka-krwista": ["W Polsce gatunek bardzo pospolity.", "Martwe drewno drzew liściastych: pnie, pniaki i opadłe gałęzie; na iglastych rzadko.", "Owocniki pojawiają się od kwietnia do października."],
    "muchomor-czerwony": ["W Polsce gatunek bardzo pospolity.", "Lasy liściaste, iglaste i mieszane, szczególnie często pod brzozą; mikoryza m.in. z brzozą, sosną, świerkiem, jodłą, osiką i dębem.", "Owocniki pojawiają się od czerwca do listopada."],
    "ozorek-debowy": ["Do 2020 r. podano w Polsce ok. 250 stanowisk; na Czerwonej liście ma status R.", "Korzenie, pnie, pniaki i wywroty dębów, także dębowe drewno użytkowe.", "Powoduje brunatną zgniliznę drewna; rozkład postępuje powoli i może trwać nawet kilkadziesiąt lat."],
    "zolciak-siarkowy": ["W Polsce gatunek pospolity.", "Głównie drzewa liściaste, najczęściej dęby, brzozy, wierzby i drzewa owocowe; zwykle w parkach, przy drogach, w sadach i ogrodach, w lasach rzadziej.", "Owocniki pojawiają się od kwietnia do października, głównie wiosną."],
    "lakownica-lsniaca": ["Do 2020 r. podano w Polsce ok. 150 stanowisk; na Czerwonej liście ma status R.", "Korzenie, pniaki i dolne części pni, głównie martwych drzew liściastych; w lasach, parkach i ogrodach.", "Świeże owocniki pojawiają się latem i jesienią, starsze można spotkać przez cały rok."],
    "pniarek-lekarski": ["Bardzo rzadki: do 2020 r. notowany na 11 stanowiskach dawnych i 6 współczesnych.", "Bardzo stare modrzewie w lasach o charakterze naturalnym; rzadko inne drzewa iglaste.", "Uważany za wskaźnik starych lasów. Na Czerwonej liście ma status E (wymierający)."],
    "blyskoporek-podkorowy": ["Rzadki, choć w literaturze podano wiele jego stanowisk w Polsce; na Czerwonej liście ma status R.", "Pnie drzew liściastych, w Polsce głównie brzóz; w różnych typach lasów, rzadziej w parkach. Do drzewa wnika przez rany.", "Pasożyt powodujący białą zgniliznę drewna; rozwija się przez wiele lat i zwykle prowadzi do obumarcia drzewa."],
    "gestoporek-cynobrowy": ["Rzadki; na Czerwonej liście ma status R.", "Martwe drewno drzew liściastych (pnie, pniaki, gałęzie) w miejscach dobrze oświetlonych; częściej w nadrzecznych łęgach, na olszach, wierzbach i brzozach.", "Częściej pojawia się w upalne lata."],
    "maczuznik-bojowy": ["Rzadki; na Czerwonej liście ma status R.", "Świetliste lasy i ich obrzeża; wyrasta z larw i poczwarek owadów w podłożu, głównie ciem.", "W Polsce jego stanowiska podano po raz pierwszy w 1902 r.; później notowano go wielokrotnie."],
    "maczuznik-nasiezrzalowy": ["Rzadki; na Czerwonej liście ma status R.", "Na podziemnych owocnikach jeleniaków, na których pasożytuje.", "Owocnik ma do 10 cm wysokości; główka młodych owocników jest żółta, z czasem czernieje."],
    "czasznica-olbrzymia": ["Częstsza w północnej Polsce, na południu rzadko spotykana.", "Łąki, pastwiska, parki i ogrody; gleby żyzne, bogate w azot, ale też kwaśne.", "Do 2014 r. gatunek był w Polsce pod ochroną ścisłą."]
  };

  appData.mushrooms = appData.mushrooms.map((mushroom) => {
    const occurrence = occurrenceById[mushroom.id] || [
      "Cała Polska lub stanowiska rozproszone; zależnie od lokalnego siedliska.",
      "Typowe siedlisko zgodne z kategorią gatunku: ściółka, drewno, gleba lub łąki.",
      "Zakres jest orientacyjny i służy edukacji, nie precyzyjnemu mapowaniu stanowisk."
    ];

    return {
      ...mushroom,
      region_pl: occurrence[0],
      habitat_pl: occurrence[1],
      occurrence_note: occurrence[2]
    };
  });

  const nextOrdinal = Math.max(...appData.mushrooms.map((mushroom) => mushroom.ordinal || 0)) + 1;
  const glowingMushrooms = [
    {
      id: "opienka-miodowa-bioluminescencja",
      name_pl: "Opieńka miodowa sensu lato",
      name_lat: "Armillaria mellea s.l.",
      category: glowingCategory.id,
      hook: "Nie tyle kapelusze, co grzybnia i ciemne ryzomorfy opieniek mogą dawać zielonkawą poświatę w zupełnej ciemności.",
      quiz_angle: "bioluminescencja: własne światło grzybni i ryzomorfów, zwykle nie świecą same owocniki",
      safety_note: "nie używać świecenia do identyfikacji ani zbioru; opieńki wymagają ostrożnego oznaczania, a strona jest edukacyjna",
      image_status: "commons_verified",
      ordinal: nextOrdinal,
      category_label: glowingCategory.label,
      category_short: glowingCategory.short,
      category_icon: glowingCategory.icon,
      tags: ["bioluminescencja", "ryzomorfy", "martwe drewno"],
      level: "ciekawostka nocna",
      region_pl: "W Polsce gatunek pospolity.",
      habitat_pl: "Drewno różnych drzew liściastych: pnie, pniaki, gałęzie i korzenie; w lasach, ogrodach, parkach i sadach.",
      occurrence_note: "Światło emitują rosnące ryzomorfy (sznury grzybni). Gdy przestają rosnąć i pokrywają się ciemną warstwą, świecenie zanika.",
      image: commonsImage("Armillaria mellea 2011 G1.jpg"),
      image_alt: "Opieńka miodowa sensu lato (Armillaria mellea s.l.), kępa miodowobrązowych owocników przy drewnie",
      image_author: "George Chernilevsky",
      image_source: "https://commons.wikimedia.org/wiki/File:Armillaria_mellea_2011_G1.jpg",
      image_license: "Public domain",
      license_url: "https://creativecommons.org/publicdomain/mark/1.0/",
      image_modifications: embeddedFromCommons
    },
    {
      id: "lycznik-ochrowy-bioluminescencja",
      name_pl: "Łycznik ochrowy",
      name_lat: "Panellus stipticus",
      category: glowingCategory.id,
      hook: "Małe ochrowe kapelusze rosną gromadnie na martwym drewnie; wątek świecenia jest prawdziwy, ale europejskie okazy zwykle świecą słabo albo wcale.",
      quiz_angle: "bioluminescencja i fluorescencja: szczepy północnoamerykańskie bywają wyraźnie bioluminescencyjne, europejskie traktujemy ostrożnie",
      safety_note: "niejadalny; nie używać świecenia lub lampy UV jako jedynej cechy rozpoznawczej",
      image_status: "commons_verified",
      ordinal: nextOrdinal + 1,
      category_label: glowingCategory.label,
      category_short: glowingCategory.short,
      category_icon: glowingCategory.icon,
      tags: ["bioluminescencja", "drewno liściaste", "ochrowy"],
      level: "ciekawostka nocna",
      region_pl: "W Polsce gatunek bardzo pospolity.",
      habitat_pl: "Martwe i butwiejące drewno, głównie drzew liściastych, szczególnie często dębów; na drzewach iglastych bardzo rzadko.",
      occurrence_note: "Zwykle rośnie w kępach.",
      image: commonsImage("Panellus stipticus 34244.jpg"),
      image_alt: "Łycznik ochrowy (Panellus stipticus), drobne muszlowate owocniki na drewnie",
      image_author: "Dan Molter (shroomydan), Mushroom Observer",
      image_source: "https://commons.wikimedia.org/wiki/File:Panellus_stipticus_34244.jpg",
      image_license: "CC BY-SA 3.0",
      license_url: "https://creativecommons.org/licenses/by-sa/3.0/",
      image_modifications: embeddedFromCommons
    }
  ];

  const existingIds = new Set(appData.mushrooms.map((mushroom) => mushroom.id));
  appData.mushrooms = [
    ...appData.mushrooms,
    ...glowingMushrooms.filter((mushroom) => !existingIds.has(mushroom.id))
  ];

  appData.version = "0.7.0-regions-glow";
  appData.last_updated = "2026-05-09";
  appData.region_pack_7 = {
    title: "Regiony występowania i dwa grzyby świecące",
    updated_mushrooms: appData.mushrooms.length,
    added_mushrooms: glowingMushrooms.filter((mushroom) => !existingIds.has(mushroom.id)).length,
    note: "Regiony są szerokimi wskazówkami edukacyjnymi, a nie mapą stanowisk. Przy świeceniu rozróżniamy bioluminescencję od fluorescencji pod UV.",
    sources: [
      "https://www.grzyby.pl/gatunki/Panellus_stipticus.htm",
      "https://www.grzyby.pl/gatunki/Armillaria_mellea_sensu_lato.htm",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC12653593/",
      "https://pubmed.ncbi.nlm.nih.gov/28726108/"
    ]
  };
})();
