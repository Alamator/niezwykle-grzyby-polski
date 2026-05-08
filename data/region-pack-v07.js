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
    "okratek-australijski": ["Rozproszony w całej Polsce, częściej w cieplejszych miastach i na zachodzie kraju.", "Zrębki, kompost, ogrody, parki i ściółkowane rabaty.", "Gatunek obcy, który w Polsce najłatwiej trafia się w miejscach przekształconych przez człowieka."],
    "sromotnik-bezwstydny": ["Cała Polska.", "Lasy liściaste i mieszane, parki, ogrody, żyzne gleby i ściółka.", "Owocniki pojawiają się lokalnie, ale gatunek jest szeroko rozpowszechniony."],
    "madziak-psi": ["Cała Polska, zwykle lokalnie.", "Lasy, zarośla, parki i wilgotniejsza ściółka.", "Najłatwiej szukać go tam, gdzie jest dużo próchnicy i martwych resztek roślinnych."],
    "sromotnik-fiolkowy": ["Głównie cieplejsze regiony południowej i zachodniej Polski; rzadko.", "Żyzne lasy liściaste, parki i miejsca z grubą warstwą próchnicy.", "W atlasie warto traktować go jako rzadką ciekawostkę terenową."],
    "czarka-austriacka": ["Południe Polski, pogórza i góry; poza nimi lokalnie.", "Wilgotne zarośla, łęgi, gałązki przykryte ściółką, brzegi potoków.", "Czerwone czarki najczęściej rzucają się w oczy wczesną wiosną."],
    "kustrzebka-pomaranczowa": ["Cała Polska.", "Goła ziemia, skarpy, pobocza dróg leśnych, rowy i odsłonięte gleby.", "Lubi miejsca naruszone, gdzie ma odsłonięty mineralny grunt."],
    "dzbankowka-kulista": ["Bardzo rzadka; głównie północno-wschodnia Polska i chłodniejsze, stare kompleksy leśne.", "Wilgotne, stare lasy z dużą ilością butwiejącego drewna i mchu.", "To gatunek do ostrożnego opisu: spotkania są wyjątkowe i punktowe."],
    "czareczka-dlugotrzonkowa": ["Rozproszona; częściej w południowej i wschodniej Polsce.", "Wilgotne lasy liściaste, butwiejące gałązki i drobne drewno.", "Mały rozmiar sprawia, że łatwo ją przeoczyć mimo intensywnej barwy."],
    "krazkowka-zylkowana": ["Cała Polska, lokalnie.", "Żyzne lasy liściaste, parki, pobocza leśne i próchniczna gleba.", "Często zdradza ją miseczkowaty kształt i żyłkowany środek."],
    "piestrzenica-kasztanowata": ["Cała Polska, szczególnie bory sosnowe.", "Piaszczyste lasy iglaste, skraje dróg leśnych, zręby i młodniki.", "Nie używać jako podpowiedzi kulinarnej: gatunek jest toksyczny i mylący."],
    "smardz-jadalny": ["Cała Polska, ale punktowo; doliny rzek, parki i ogrody.", "Żyzne gleby, sady, łęgi, stare ogrody, miejsca po popiele lub ściółce.", "Smardze są objęte ograniczeniami ochronnymi; opis ma charakter edukacyjny."],
    "smardz-wyniosly": ["Cała Polska, najczęściej lokalnie w miastach, parkach i dolinach rzecznych.", "Zrębki, rabaty, ogrody, parki, gleby zasobne w materię organiczną.", "W ostatnich latach bywa znajdowany także w siedliskach miejskich."],
    "soplowka-jezowata": ["Rozproszona; częściej stare lasy liściaste południa, wschodu i północnego wschodu.", "Stare buki i inne drzewa liściaste, martwe lub osłabione drewno.", "Wymaga starych drzew, dlatego dobrze pasuje do opowieści o ciągłości lasu."],
    "soplowka-bukowa": ["Cała Polska, ale lokalnie tam, gdzie są stare lasy liściaste.", "Martwe drewno buków i innych drzew liściastych.", "Najlepsze skojarzenie terenowe: wilgotne, dojrzałe buczyny."],
    "siedzun-sosnowy": ["Cała Polska, szczególnie regiony borów sosnowych.", "Przy korzeniach sosen, w borach i na skrajach drzewostanów iglastych.", "Owocnik często wygląda jak jasna, falista gąbka u podstawy drzewa."],
    "swiecznica-rozgaleziona": ["Góry i pogórza, zwłaszcza Karpaty i Sudety; poza nimi rzadziej.", "Cieniste, wilgotne lasy, ściółka i mszyste miejsca.", "Delikatne owocniki najlepiej traktować jako wskaźnik wilgotnego mikroklimatu."],
    "koralowka-groniasta": ["Cała Polska, lokalnie w lasach liściastych i mieszanych.", "Ściółka, gleba próchniczna, buczyny i grądy.", "Koralowate formy są efektowne, ale wiele podobnych gatunków wymaga ostrożności."],
    "pieknorog-lepki": ["Cała Polska.", "Martwe drewno iglaste, pniaki, kłody i wilgotne bory.", "Jeden z łatwiejszych żółtych, galaretowatych akcentów na drewnie."],
    "trzesak-pomaranczowozolty": ["Cała Polska.", "Martwe gałęzie drzew liściastych, często po deszczu.", "Po wyschnięciu kurczy się, a po wilgoci odzyskuje galaretowaty wygląd."],
    "uszak-bzowy": ["Cała Polska, szczególnie tam, gdzie rośnie bez czarny.", "Martwe i osłabione gałęzie bzu czarnego oraz innych liściastych.", "Najprostszy trop terenowy to stare zarośla bzu czarnego po deszczu."],
    "galaretnica-miesista": ["Cała Polska, lokalnie.", "Martwe drewno liściaste, wilgotne pniaki i kłody.", "Najłatwiej zauważyć ją przy wysokiej wilgotności."],
    "kolczakowka-galaretowata": ["Cała Polska, częściej w borach i lasach z dużą ilością drewna iglastego.", "Butwiejące pniaki i kłody iglaste.", "Miękka, galaretowata struktura dobrze odróżnia ją od wielu innych kolczaków."],
    "plomyczek-galaretowaty": ["Cała Polska, lokalnie.", "Martwe drewno liściaste, drobne gałęzie i wilgotne pniaki.", "Małe owocniki łatwo przeoczyć bez uważnego oglądania drewna."],
    "promieniak-wilgociomierz": ["Cała Polska, punktowo w suchych i ciepłych miejscach.", "Murawy, piaszczyste skraje lasów, suche zbocza i wydmy śródlądowe.", "Reaguje na wilgoć, dlatego region jest mniej ważny niż suche, odsłonięte siedlisko."],
    "gwiazda-wieloporowa": ["Rozproszona w całej Polsce; częściej w ciepłych, suchych siedliskach.", "Murawy, skraje lasów, zarośla i gleby piaszczyste lub wapienne.", "To gatunek lokalny: dobry do oznaczania przez siedlisko i kształt."],
    "gwiazdosz-wzniesiony": ["Rozproszony; częściej południe i centrum Polski.", "Ciepłe murawy, zarośla, skraje lasów i gleby zasobne w wapń.", "Gwiazdkowate owocniki mogą długo utrzymywać się po wyschnięciu."],
    "gwiazdosz-czteropromienny": ["Rzadki, rozproszony; głównie lasy iglaste i mieszane.", "Ściółka, mchy i próchnica w borach oraz starych drzewostanach.", "Najlepiej opisywać go jako gatunek punktowy, zależny od mikrosiedliska."],
    "berloweczka-zimowa": ["Cała Polska, lokalnie.", "Mchy, ściółka i gleba w lasach, szczególnie w chłodnej części roku.", "Zimowy termin pojawu pomaga ją zapamiętać."],
    "kubek-prazkowany": ["Cała Polska.", "Martwe gałązki, resztki roślinne, ściółka i wilgotne drewienka.", "Małe kubeczki często widać dopiero po przyjrzeniu się z bliska."],
    "gniazdniczka-kulista": ["Cała Polska.", "Próchnica, ściółka, drobne gałązki, zrębki i martwe resztki roślin.", "Drobne 'gniazdka' lubią miejsca bogate w rozkładającą się materię."],
    "kolczakowka-piekaca": ["Rozproszona; głównie bory sosnowe północy, wschodu i miejscami góry.", "Kwaśne, ubogie lasy iglaste i mieszane, często z sosną.", "Efekt czerwonych kropli zależy od wieku owocnika i wilgotności."],
    "kolczakowka-niebieska": ["Rozproszona; bory sosnowe, północna Polska i obszary górskie.", "Kwaśne lasy iglaste, mchy i ubogie siedliska borowe.", "Barwa jest najmocniejsza u młodych owocników."],
    "kolczakowka-wonna": ["Rozproszona; chłodniejsze bory północy i gór.", "Lasy iglaste i mieszane, kwaśna ściółka, mchy.", "Zapach i niebieskawe tony są ważniejsze niż dokładny region."],
    "zylkowiec-rozowawy": ["Rzadki; doliny rzeczne, stare parki i miejsca z wiązami.", "Martwe lub zamierające drewno wiązów i innych liściastych.", "Występowanie jest mocno związane z dostępnością starego drewna."],
    "szyszkowiec-luskowaty": ["Góry i pogórza, lokalnie także starsze lasy iglaste poza górami.", "Lasy świerkowe i mieszane, gleba w pobliżu drzew iglastych.", "Łuskowaty wygląd dobrze pasuje do chłodniejszych, górskich siedlisk."],
    "krwistoborowik-szatanski": ["Ciepłe regiony południa i zachodu Polski; rzadko.", "Ciepłe buczyny i dąbrowy, zwykle na glebach wapiennych.", "Gatunek efektowny, ale toksyczny; opis tylko edukacyjny."],
    "wilgotnica-czerniejaca": ["Rozproszona; łąki i murawy w górach, na pogórzach i pojezierzach.", "Nienawożone łąki, murawy, pastwiska i ubogie trawniki.", "Jest związana z tradycyjnie użytkowanymi, mało nawożonymi łąkami."],
    "lakowka-ametystowa": ["Cała Polska.", "Lasy liściaste, iglaste i mieszane; ściółka, mchy i wilgotne gleby.", "Kolor zależy od wilgotności i może blednąć."],
    "chlorowka-drobna": ["Rzadka; głównie ciepłe murawy południa Polski.", "Murawy kserotermiczne, suche zbocza i ubogie trawiaste siedliska.", "To bardziej ciekawostka siedliskowa niż pospolity gatunek leśny."],
    "grzybowka-krwista": ["Cała Polska, lokalnie.", "Martwe drewno liściaste, szczególnie bukowe, i wilgotne kłody.", "Krwisty sok najlepiej widać na świeżych, młodych owocnikach."],
    "muchomor-czerwony": ["Cała Polska.", "Bory, brzeziny, lasy mieszane; mikoryza m.in. z brzozą, sosną i świerkiem.", "Ikoniczny gatunek leśny, ale nie jest grzybem jadalnym."],
    "ozorek-debowy": ["Cała Polska, częściej w regionach z wiekowymi dębami.", "Stare dęby, pnie, dziuple i żywe lub martwe drewno liściaste.", "Dobre siedlisko to park, aleja lub stary las z dużymi dębami."],
    "zolciak-siarkowy": ["Cała Polska.", "Pnie i konary drzew liściastych, parki, sady, łęgi i lasy.", "Żółte półki na drzewie są widoczne z daleka w sezonie."],
    "lakownica-lsniaca": ["Cała Polska, lokalnie.", "Pniaki i martwe drewno liściaste, szczególnie w cieplejszych i wilgotnych miejscach.", "Błyszcząca skórka jest dobrym tropem wizualnym."],
    "pniarek-lekarski": ["Bardzo rzadki; głównie obszary górskie z modrzewiem.", "Stare modrzewie i martwe drewno modrzewiowe.", "W Polsce to gatunek do opisu jako wyjątkowa rzadkość związana z drzewem-gospodarzem."],
    "blyskoporek-podkorowy": ["Cała Polska, szczególnie lasy i zadrzewienia z brzozą.", "Pnie żywych i martwych brzóz, pod korą i na zranieniach.", "Znany jako czaga; w atlasie bez zachęt do pozyskiwania."],
    "gestoporek-cynobrowy": ["Cała Polska.", "Martwe drewno liściaste, gałęzie i pniaki w wilgotnych lasach.", "Intensywny cynober najlepiej widać na świeżych owocnikach."],
    "maczuznik-bojowy": ["Cała Polska, lokalnie.", "Ściółka, mchy i miejsca, gdzie w podłożu znajdują się larwy lub poczwarki owadów.", "Owocniki są małe, więc częściej trafia się go przy uważnym oglądaniu ściółki."],
    "maczuznik-nasiezrzalowy": ["Cała Polska, ale rzadko i punktowo.", "Lasy z podziemnymi grzybami, na których pasożytuje; ściółka i próchnica.", "Niezwykłość polega na pasożytowaniu na innych grzybach ukrytych pod ziemią."],
    "czasznica-olbrzymia": ["Cała Polska.", "Łąki, pastwiska, parki, skraje pól i żyzne trawniki.", "Duże białe kule najłatwiej zauważyć na otwartych terenach trawiastych."]
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
      safety_note: "nie używać świecenia do identyfikacji ani zbioru; opieńki wymagają ostrożnego oznaczania i obróbki, a strona jest edukacyjna",
      image_status: "commons_candidate",
      ordinal: nextOrdinal,
      category_label: glowingCategory.label,
      category_short: glowingCategory.short,
      category_icon: glowingCategory.icon,
      tags: ["bioluminescencja", "ryzomorfy", "martwe drewno"],
      level: "ciekawostka nocna",
      region_pl: "Cała Polska; opieńki jako grupa są bardzo pospolite, szczególnie jesienią.",
      habitat_pl: "Martwe drewno, pniaki, korzenie i osłabione drzewa liściaste oraz iglaste.",
      occurrence_note: "Zielonkawa poświata dotyczy głównie grzybni i ryzomorfów pod korą lub w próchnie, a nie typowego wyglądu owocników.",
      image: commonsImage("Armillaria mellea 2011 G1.jpg"),
      image_alt: "Opieńka miodowa sensu lato (Armillaria mellea s.l.), kępa miodowobrązowych owocników przy drewnie",
      image_author: "George Chernilevsky",
      image_source: "https://commons.wikimedia.org/wiki/File:Armillaria_mellea_2011_G1.jpg",
      image_license: "Public domain",
      license_url: "https://commons.wikimedia.org/wiki/File:Armillaria_mellea_2011_G1.jpg",
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
      image_status: "commons_candidate",
      ordinal: nextOrdinal + 1,
      category_label: glowingCategory.label,
      category_short: glowingCategory.short,
      category_icon: glowingCategory.icon,
      tags: ["bioluminescencja", "drewno liściaste", "ochrowy"],
      level: "ciekawostka nocna",
      region_pl: "Cała Polska; dość częsty w lasach z martwym drewnem liściastym.",
      habitat_pl: "Pniaki, kłody i martwe drewno drzew liściastych, szczególnie dębu, buka i brzozy.",
      occurrence_note: "W Polsce ważniejsza jest sama obecność gatunku; widoczne świecenie owocników nie jest czymś, czego należy obiecywać w terenie.",
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
