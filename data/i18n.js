(() => {
  const app = window.ATLAS_APP_DATA || { collections: [] };

  const normalize = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const collectionById = (id) => (app.collections || []).find((collection) => collection.id === id) || { items: [] };

  const levels = {
    "łatwy start": "easy start",
    "średni": "intermediate",
    "trudniejszy": "harder",
    "ciekawostka nocna": "night curiosity",
    "efekt wow": "wow effect",
    "okaz specjalny": "special specimen",
    "ciekawostka chemiczna": "chemical curiosity",
    "okaz klimatyczny": "atmospheric specimen",
    "skala i forma": "scale and form",
    "rzadki gość": "rare visitor",
    "wodny dziwak": "aquatic oddity",
    "skryty gatunek": "hidden species",
    "perła atlasu": "atlas jewel",
    "podziemny inżynier": "underground engineer",
    "mikroosobliwość": "micro-curiosity",
    "dziwny kształt": "strange shape",
    "rzadziej widywana": "less often seen",
    "zapachowa osobliwość": "aromatic curiosity",
    "nocny łowca": "night hunter",
    "pospolity klasyk": "common classic",
    "wodny drapieżnik": "aquatic predator",
    "mistrz kamuflażu": "camouflage master",
    "podwodny łowca": "underwater hunter",
    "nocny sygnał": "night signal",
    "rzadka noc": "rare night",
    "efekt UV": "UV effect",
    "leśny neon": "forest neon",
    "klejnot": "jewel",
    "pospolite piękno": "common beauty",
    "nieprzyjemny klasyk": "unpleasant classic",
    "pospolity dziwak": "common oddity",
    "metamorfoza": "metamorphosis",
    "arystokrata": "aristocrat",
    "delikatny sprzymierzeniec": "delicate ally",
    "majestat": "majestic species",
    "prehistoryczny król": "prehistoric king",
    "krytyczna rzadkość": "critical rarity",
    "torfowiskowy łowca": "bog hunter",
    "termiczna pułapka": "thermal trap",
    "świetlny relikt": "light relic",
    "nocny zegar": "night clock",
    "sygnał UV": "UV signal",
    "nocny zapach": "night scent",
    "mimikra": "mimicry",
    "żywa pułapka": "living trap",
    "podziemny duch": "underground ghost",
    "pasożyt": "parasite",
    "półpasożyt": "hemiparasite",
    "gorejący krzew": "burning bush",
    "trujący klasyk": "toxic classic",
    "mroczny klasyk": "hidden-flower classic",
    "chemiczna obrona": "chemical defense",
    "relikt kulturowy": "cultural relic",
    "czterolistna iluzja": "four-leaf illusion",
    "żółty dywan": "yellow carpet",
    "polny zegar": "field clock",
    "botaniczny księżyc": "botanical moon",
    "naukowy klejnot": "scientific jewel",
    "toksyczna rzadkość": "toxic rarity",
    "strukturalna zagadka": "structural puzzle",
    "złoto północy": "northern gold",
    "gigant złoża": "deposit giant",
    "światowy rekord": "world-class record",
    "błękitna sól": "blue salt",
    "ciężka wskazówka": "heavy clue",
    "forma z tej samej chemii": "same-chemistry form",
    "pospolity świadek": "common witness",
    "podziemny cud": "underground wonder",
    "młoda krystalizacja": "young crystallization",
    "rzadka sól": "rare salt",
    "kamieniołomowy klasyk": "quarry classic",
    "twardy akcent": "hard accent",
    "pegmatytowy wskaźnik": "pegmatite marker",
    "czarny podpis skały": "black rock signature",
    "barwny topnik": "colorful flux",
    "turkus wietrzenia": "weathering turquoise",
    "zielony sygnał": "green signal",
    "błękitny wskaźnik": "blue indicator",
    "czerwony trop": "red clue",
    "radioaktywny rozdział": "radioactive chapter",
    "metaliczny klasyk": "metallic classic",
    "ruda cynku": "zinc ore",
    "organiczna granica": "organic boundary",
    "pancerz początku": "first armor",
    "rafa w mieście": "reef in the city",
    "pierwsze zielone lądy": "first green lands",
    "szczęka z innej planety": "jaw from another planet",
    "ślady przełomu": "tracks of a turning point",
    "las węglowy": "coal forest",
    "triasowy drapieżnik": "Triassic predator",
    "gigant roślinożerca": "herbivore giant",
    "żółw u początku": "turtle near the beginning",
    "morski ząb triasu": "Triassic marine tooth",
    "lilia w wapieniu": "crinoid in limestone",
    "tropy w piaskowcu": "tracks in sandstone",
    "park tropów": "track park",
    "ślad sensacji": "sensational trace",
    "drapieżnik z morza": "marine predator",
    "długa szyja jury": "long-necked Jurassic reptile",
    "lagunowy krokodyl": "lagoon crocodile",
    "żywa skamieniałość": "living fossil",
    "pterozaur z laguny": "lagoon pterosaur",
    "okno laguny": "lagoon window",
    "spiralny klasyk": "spiral classic",
    "gigant głowonóg": "cephalopod giant",
    "pocisk z morza": "sea projectile",
    "bursztynowe okno": "amber window",
    "pająk w bursztynie": "spider in amber",
    "owad w kapsule": "insect in a capsule",
    "gekko w bursztynie": "gecko in amber",
    "ptasi relikt": "bird relic",
    "kamienne drewno": "stone wood",
    "lodowy olbrzym": "ice-age giant",
    "rogi lodowca": "ice-age horns",
    "stanowisko łowców": "hunter site",
    "sen w jaskini": "sleep in the cave",
    "cień olbrzyma": "giant shadow",
    "aureola z mgły": "halo in the mist",
    "wyspy nad chmurami": "islands above clouds",
    "burzowy alarm": "storm alarm",
    "iskry przed piorunem": "sparks before lightning",
    "błysk nad burzą": "flash above the storm",
    "strumień z kowadła": "jet from the anvil",
    "pierścień jonosfery": "ionosphere ring",
    "piorun z plusa": "positive lightning",
    "grzmot w śniegu": "thunder in snow",
    "noc bez czerni": "night without blackness",
    "jasny horyzont": "bright horizon",
    "chmury z kosmosu": "clouds from space",
    "rezerwat nocy": "night reserve",
    "ciemność premium": "premium darkness",
    "mądra latarnia": "smart lamp",
    "galaktyczny pas": "galactic band",
    "kosmiczna pogoda": "space weather",
    "sierpniowe smugi": "August streaks",
    "zimowy rój": "winter shower",
    "statek nad horyzontem": "ship above the horizon",
    "fatamorgana Bałtyku": "Baltic Fata Morgana",
    "śnieg z morza": "snow from the sea",
    "góry zza horyzontu": "mountains beyond the horizon",
    "rekord widoczności": "visibility record",
    "niewidzialna soczewka": "invisible lens",
    "niecka mrozu": "frost basin",
    "kocioł zimna": "cold cauldron",
    "torfowiskowy mróz": "peatland frost",
    "liczba w historii": "number in history",
    "pustynia w powietrzu": "desert in the air",
    "rdzawy ślad": "rusty trace",
    "śnieg z rumieńcem": "blushing snow",
    "miniaturowy piec": "miniature furnace",
    "mózg na zimę": "winter brain",
    "leśny wskaźnik": "forest indicator",
    "cień potoku": "stream shadow",
    "jadowity pływak": "venomous swimmer",
    "cień większego": "larger cousin's shadow",
    "dominant podziemi": "underground dominant",
    "lot nad taflą": "flight over water",
    "rzadki nocek": "rare myotis",
    "ucho starego lasu": "old-forest ear",
    "nocny zbieracz": "night gleaner",
    "mały echolokator": "small echolocator",
    "stepowa kolonia": "steppe colony",
    "znikające pole": "vanishing field",
    "sen w koronach": "sleep in the canopy",
    "kulka w leszczynie": "hazel thicket ball",
    "maska w koronach": "mask in the canopy",
    "pilch z legendy": "legendary dormouse",
    "gwizd na hali": "whistle on alpine grassland",
    "renaturyzator": "renaturation engineer",
    "obcy pływak": "alien swimmer",
    "olbrzym po powrocie": "returned giant",
    "kopyta na krawędzi": "hooves on the edge",
    "obcy psowaty": "alien canid",
    "cień mokradeł": "wetland shadow",
    "zręczny kolonista": "dexterous colonist",
    "nowy sąsiad": "new neighbor",
    "drapieżnik w miniaturze": "miniature predator",
    "biały podpis": "white signature",
    "relikt bieli": "relic of white",
    "powrót na łachy": "return to sandbars",
    "niewidzialny waleń": "invisible cetacean",
    "błękitny sygnał": "blue signal",
    "czosnkowa obrona": "garlic defense",
    "brzuch ostrzegawczy": "warning belly",
    "żółty alarm": "yellow alarm",
    "jaskrawy komunikat": "bright warning",
    "parotydowy klasyk": "parotoid classic",
    "godowy grzebień": "breeding crest",
    "mały wachlarz": "small fan",
    "karpacki endemit": "Carpathian endemic",
    "górska pomarańcza": "mountain orange",
    "biegacz wydm": "dune runner",
    "zielona mozaika": "green mosaic",
    "przylga liścia": "leaf adhesive",
    "bliźniacza rzekotka": "twin tree frog",
    "zimny start": "cold start",
    "skok z liści": "leaf-litter leap",
    "mała zielona": "small green frog",
    "hybrydowy rodowód": "hybrid lineage",
    "głośny olbrzym": "loud giant",
    "pancerz mokradeł": "wetland armor",
    "obcy pancerz": "alien shell",
    "ogon awaryjny": "emergency tail",
    "ukryty bliźniak": "hidden twin",
    "zielony samiec": "green male",
    "żyworodny chłód": "live-bearing cold",
    "teatr obrony": "defense theatre",
    "nowy wąż": "new snake",
    "łagodny sobowtór": "gentle lookalike",
    "reliktowy dusiciel": "relic constrictor",
    "jadowity termometr": "venomous thermometer",
    "szachulec UNESCO": "UNESCO half-timber",
    "gotyk zrębowy": "log Gothic",
    "cerkiew UNESCO": "UNESCO tserkva",
    "drewno gór": "mountain wood",
    "wielokulturowe drewno": "multicultural wood",
    "żywy zabytek": "living monument",
    "drewniany barok": "wooden Baroque",
    "dwór z modrzewia": "larch manor"
  };

  const mushroomCategories = {
    "kosmici-i-zapachowcy": { label: "Alien shapes and strong smells", short: "Alien forms" },
    "czarki-mozgi-i-plastry-miodu": { label: "Cups, brains and honeycombs", short: "Cups and brains" },
    "sople-korale-i-galaretki": { label: "Spines, corals and jellies", short: "Corals and jellies" },
    "gwiazdy-i-gniazda": { label: "Stars and nests", short: "Stars and nests" },
    "kolory-formy-i-kultowe-gatunki": { label: "Colors, forms and iconic species", short: "Colors and icons" },
    "drzewne-potwory-i-pasozyty": { label: "Tree monsters and parasites", short: "Tree forms" },
    "swiecace-i-fluorescencyjne": { label: "Glowing and fluorescent fungi", short: "Glowing" },
    "efekty-specjalne": { label: "Nature's special effects", short: "Effects" }
  };

  const insectCategories = {
    "toksyczne-i-zapachowe": { label: "Toxic and aromatic", short: "Toxins" },
    "nocne-i-swiecace": { label: "Nocturnal and glowing", short: "Nocturnal" },
    "wodne-osobliwosci": { label: "Aquatic curiosities", short: "Aquatic" },
    "dziwne-ksztalty": { label: "Strange shapes", short: "Shapes" },
    "barwy-i-piekno": { label: "Colors and beauty", short: "Colors" },
    "majestatyczne-i-chronione": { label: "Majestic and protected", short: "Protected" }
  };

  const flowerCategories = {
    "lowcy-i-pulapki": { label: "Hunters and traps", short: "Traps" },
    "zapach-swiatlo-i-noc": { label: "Scent, light and night", short: "Night and light" },
    "storczyki-i-mimikra": { label: "Orchids and mimicry", short: "Orchids" },
    "pasozyty-i-polpasozyty": { label: "Parasites and hemiparasites", short: "Parasites" },
    "toksyczne-i-obronne": { label: "Toxic and defensive plants", short: "Defense" },
    "relikty-i-dziwne-formy": { label: "Relics and strange forms", short: "Forms" }
  };

  const fishCategories = {
    "zapach-i-zmysly": { label: "Scent and senses", short: "Senses" },
    "dzwiek-i-swiatlo": { label: "Sound and light", short: "Sound" },
    "forma-i-kamuflaz": { label: "Form and camouflage", short: "Form" },
    "rozrod-i-wedrowki": { label: "Reproduction and migrations", short: "Breeding" },
    "rzeczne-paradoksy": { label: "River paradoxes", short: "Rivers" },
    "oceaniczni-goscie": { label: "Oceanic visitors", short: "Visitors" },
    "inwazyjne-alarmy": { label: "Invasive alerts", short: "Alerts" }
  };

  const birdCategories = {
    "rekordy-i-skala": { label: "Records and scale", short: "Scale" },
    "lot-i-wedrowki": { label: "Flight and migrations", short: "Flight" },
    "swiatlo-i-zmysly": { label: "Light and senses", short: "Senses" },
    "zapach-i-obrona": { label: "Scent and defense", short: "Defense" },
    "gniazda-i-architektura": { label: "Nests and architecture", short: "Nests" },
    "strategie-i-mity": { label: "Strategies and myths", short: "Strategies" },
    "woda-i-gory": { label: "Water and mountains", short: "Niches" },
    "rzadkie-goscie": { label: "Rare visitors", short: "Visitors" }
  };

  const mammalCategories = {
    "mikrossaki-i-jad": { label: "Micromammals and venom", short: "Micro" },
    "nietoperze-i-zimowiska": { label: "Bats and winter refuges", short: "Bats" },
    "gryzonie-relikty-inzynierowie": { label: "Rodents, relics and engineers", short: "Rodents" },
    "puszcze-i-turnie": { label: "Primeval forests and crags", short: "Wildlands" },
    "drapiezniki-i-zmiany-arealow": { label: "Predators and range shifts", short: "Predators" },
    "baltyckie-ssaki-morskie": { label: "Baltic marine mammals", short: "Baltic" }
  };

  const amphibianReptileCategories = {
    "barwy-i-obrona": { label: "Colors and defense", short: "Defense" },
    "gody-i-metamorfozy": { label: "Breeding and metamorphosis", short: "Breeding" },
    "wspinaczka-i-woda": { label: "Climbing and water", short: "Niches" },
    "zolwie-i-inwazje": { label: "Turtles and invasions", short: "Turtles" },
    "jaszczurki-i-beznogie": { label: "Lizards and legless lizards", short: "Lizards" },
    "weze-jad-i-relikty": { label: "Snakes, venom and relics", short: "Snakes" }
  };

  const woodenArchitectureCategories = {
    "koscioly-pokoju": { label: "Peace Churches", short: "Peace" },
    "gotyk-zrebowy": { label: "Log Gothic", short: "Log Gothic" },
    "cerkwie-karpat": { label: "Carpathian tserkvas", short: "Tserkvas" },
    "styl-zakopianski-i-gorale": { label: "Zakopane style and mountain wood", short: "Mountain" },
    "wielokulturowe-drewno": { label: "Multicultural wood", short: "Cultures" }
  };

  const undergroundCategories = {
    "kopalnie-surowce": { label: "Mines and raw materials", short: "Mines" },
    "podziemia-wojenne": { label: "Wartime undergrounds", short: "Wartime" },
    "miejskie-piwnice": { label: "Urban cellars", short: "Cellars" },
    "fortyfikacje-schrony": { label: "Fortifications and shelters", short: "Shelters" },
    "tajemnice-legendy": { label: "Mysteries and legends", short: "Mysteries" }
  };

  const engineeringWonderCategories = {
    "woda-kanaly": { label: "Water and canals", short: "Water" },
    "mosty-tunele-koleje": { label: "Bridges and tunnels", short: "Bridges" },
    energia: { label: "Energy", short: "Energy" },
    "radio-komunikacja": { label: "Radio and communication", short: "Radio" },
    "przemyslowe-miasta": { label: "Industrial cities", short: "Cities" },
    "adaptacje-industrialne": { label: "Industrial adaptations", short: "Adaptations" },
    "beton-fortyfikacje": { label: "Concrete and fortifications", short: "Concrete" }
  };

  const fortressRuinCategories = {
    "miasta-idealne": { label: "Ideal cities", short: "Cities" },
    "zamki-rezydencje": { label: "Castles and residences", short: "Castles" },
    twierdze: { label: "Fortresses", short: "Fortresses" },
    ruiny: { label: "Ruins", short: "Ruins" },
    "zapomniane-konstrukcje": { label: "Forgotten structures", short: "Structures" }
  };

  const mementoMoriCategories = {
    ossuaria: { label: "Ossuaries", short: "Ossuaries" },
    nekropolie: { label: "Necropolises", short: "Necropolises" },
    "cmentarze-wielu-kultur": { label: "Multicultural cemeteries", short: "Many cultures" },
    "cmentarze-wojenne": { label: "War cemeteries", short: "War graves" },
    "miejsca-zaglady": { label: "Holocaust memorial sites", short: "Holocaust" },
    "miejsca-martyrologii": { label: "Martyrdom memorials", short: "Memorials" },
    "kopce-pradawne-pochowki": { label: "Mounds and ancient burials", short: "Mounds" }
  };

  const landscapeRecordCategories = {
    "piasek-wydmy": { label: "Sand and dunes", short: "Sand" },
    "las-deformacje": { label: "Forest and deformations", short: "Forest" },
    "morze-klify-wyspy": { label: "Sea, cliffs and islands", short: "Coast" },
    "jeziora-mokradla": { label: "Lakes and wetlands", short: "Water" },
    "rzeki-zrodla-przelomy": { label: "Rivers, springs and gorges", short: "Rivers" },
    "kolory-pokopalniane": { label: "Colors and post-mining landscapes", short: "Colors" },
    "gaz-wulkany-geologia": { label: "Gas, volcanoes and living geology", short: "Geology" },
    "gory-skaly-lodowce": { label: "Mountains, rocks and glaciers", short: "Mountains" },
    "ekstrema-iluzje-mikroklimaty": { label: "Extremes, illusions and microclimates", short: "Extremes" }
  };

  const treeCategories = {
    "zapach-i-chemia": { label: "Scent and chemistry", short: "Chemistry" },
    "swiatlo-i-mikrozycie": { label: "Light and micro-life", short: "Light" },
    "anomalie-formy": { label: "Form anomalies", short: "Form" },
    "rekordy-i-dlugowiecznosc": { label: "Records and longevity", short: "Records" },
    "historia-i-pamiec": { label: "History and memory", short: "Memory" },
    "kataklizmy-i-przetrwanie": { label: "Disasters and survival", short: "Survival" },
    "egzotyka-i-kolekcje": { label: "Exotics and collections", short: "Exotics" }
  };

  const mineralCategories = {
    "endemity-nowe-mineraly": { label: "Endemics and new minerals", short: "Endemics" },
    "kolor-swiatlo-forma": { label: "Color, light and form", short: "Form" },
    "kruszce-pierwiastki": { label: "Ores and elements", short: "Ores" },
    "sole-ewaporaty-konkrecje": { label: "Salts, evaporites and concretions", short: "Salts" },
    "historia-surowce-kultury": { label: "History and cultural materials", short: "History" },
    "strefy-wietrzenia": { label: "Weathering zones", short: "Weathering" },
    "radioaktywne-organiczne": { label: "Radioactive and organic minerals", short: "Boundaries" }
  };

  const rockFormationCategories = {
    "granitowe-karkonosze": { label: "Granite Karkonosze", short: "Granite" },
    "wulkaniczne-i-pogornicze": { label: "Volcanic and post-mining", short: "Volcanic" },
    "labirynty-piaskowcowe": { label: "Sandstone labyrinths", short: "Labyrinths" },
    "jurajski-kras": { label: "Jurassic karst", short: "Karst" },
    "karpaty-flisz-tatry": { label: "Carpathians, flysch and Tatras", short: "Carpathians" },
    "swietokrzyskie-niz": { label: "Świętokrzyskie and lowlands", short: "Lowlands" }
  };

  const fossilCategories = {
    "paleozoik-pierwsze-lady": { label: "Paleozoic and first lands", short: "Paleozoic" },
    "tropy-i-lad-triasu": { label: "Tracks and Triassic land", short: "Triassic" },
    "morza-mezozoiku": { label: "Mesozoic seas", short: "Seas" },
    "bursztyn-i-kenozoik": { label: "Amber and Cenozoic", short: "Cenozoic" },
    "epoka-lodowcowa": { label: "Ice Age", short: "Pleistocene" }
  };

  const atmosphereAstronomyCategories = {
    "optyka-gorska": { label: "Mountain optics", short: "Optics" },
    "burze-i-gorna-atmosfera": { label: "Storms and upper atmosphere", short: "Storms" },
    "niebo-nocne-i-kosmos": { label: "Night sky and space", short: "Sky" },
    "baltyk-refrakcja-obserwacje": { label: "Baltic, refraction and long views", short: "Refraction" },
    "mroz-pyl-osady": { label: "Frost, dust and odd deposits", short: "Extremes" }
  };

  const defaultHabitats = {
    grzyby: {
      "kosmici-i-zapachowcy": "mulch, compost, fertile litter, parks, gardens and warm transformed sites",
      "czarki-mozgi-i-plastry-miodu": "moist litter, dead twigs, rich soils, parks, river valleys and early-spring woodland",
      "sople-korale-i-galaretki": "old woodland, dead wood, stumps, logs and humid forest microhabitats",
      "gwiazdy-i-gniazda": "dry grassland, sandy edges, moss, litter and small pieces of dead plant material",
      "kolory-formy-i-kultowe-gatunki": "forests, meadows, old parks and distinctive microhabitats depending on the species",
      "drzewne-potwory-i-pasozyty": "old trunks, dead wood, weakened trees and long-continuity woodland",
      "swiecace-i-fluorescencyjne": "dead wood, bark, rhizomorphs, night observations and UV-related curiosities",
      "efekty-specjalne": "open grassland, dead wood, forest litter or distinctive substrates where the visible effect appears"
    },
    owady: {
      "toksyczne-i-zapachowe": "forests, shrubs, gardens, moist edges and habitats with host plants or prey",
      "nocne-i-swiecace": "dark meadows, woodland edges, gardens, host plants and places with little artificial light",
      "wodne-osobliwosci": "ponds, ditches, oxbows, still waters and vegetated shallow margins",
      "dziwne-ksztalty": "warm edges, shrubs, gardens, old trees, bark and varied low vegetation",
      "barwy-i-piekno": "flowers, gardens, meadows, woodland rides and sunny edges",
      "majestatyczne-i-chronione": "old deciduous forests, veteran trees and dead or dying wood"
    },
    kwiaty: {
      "lowcy-i-pulapki": "bogs, shallow waters, wet rocks and nutrient-poor places where plants supplement their diet",
      "zapach-swiatlo-i-noc": "woodland shade, field edges, night-blooming sites and microhabitats shaped by light or scent",
      "storczyki-i-mimikra": "calcareous grasslands, old woods, meadows and orchid sites with sensitive mycorrhizal networks",
      "pasozyty-i-polpasozyty": "woods, meadows and host-rich places where plants tap into roots, fungi or neighboring plants",
      "toksyczne-i-obronne": "woodlands, sunny edges, grasslands and ruderal sites where chemical defense matters",
      "relikty-i-dziwne-formy": "old woods, springs, field margins, grasslands and small habitats with distinctive forms"
    },
    ryby: {
      "zapach-i-zmysly": "cold lakes, clean rivers and coastal waters where smell and sensory ecology matter",
      "dzwiek-i-swiatlo": "muddy lowland waters, rocky Baltic shallows or deeper marine layers with unusual signals",
      "forma-i-kamuflaz": "bottom habitats, aquatic vegetation, sand, stones and places where body shape becomes camouflage",
      "rozrod-i-wedrowki": "waters where breeding behavior, parental care or long migration shapes the whole life cycle",
      "rzeczne-paradoksy": "rivers, lakes, reservoirs and open water where familiar fish families produce surprising forms",
      "oceaniczni-goscie": "open seas and rare Baltic or northern-sea contexts rather than regular inland habitats",
      "inwazyjne-alarmy": "ports, canals, ponds, river mouths and connected waters where invasive fish can spread"
    },
    ptaki: {
      "rekordy-i-skala": "forests, cliffs, open water and tree crowns where size or miniaturization becomes the story",
      "lot-i-wedrowki": "open sky, wetlands, coasts, towns and migration routes where endurance or speed matters",
      "swiatlo-i-zmysly": "woodland, towns, fields and night habitats where sight, UV, sound or camouflage shape behavior",
      "zapach-i-obrona": "nest cavities, oceanic edges and places where scent becomes a defense or navigation clue",
      "gniazda-i-architektura": "riverbanks, buildings, sandy cliffs, willow thickets and other nest-building sites",
      "strategie-i-mity": "fields, forests and nocturnal places where unusual feeding, breeding or folklore attaches to birds",
      "woda-i-gory": "marshes, fast streams, mountain cliffs and wet forests with strongly specialized bird niches",
      "rzadkie-goscie": "coasts, wetlands, fields and reservoirs where vagrant birds may briefly appear"
    },
    ssaki: {
      "mikrossaki-i-jad": "leaf litter, damp banks, underground corridors and small mammal microhabitats where metabolism and senses dominate",
      "nietoperze-i-zimowiska": "old forests, water edges, attics, caves, bunkers and humid underground refuges used through the year",
      "gryzonie-relikty-inzynierowie": "steppe grasslands, old woods, mountain meadows, wetlands and water edges shaped by rodents",
      "puszcze-i-turnie": "large forest mosaics, mountain crags, alpine grasslands and wide protected landscapes",
      "drapiezniki-i-zmiany-arealow": "fields, wetlands, forests, river valleys and human-shaped mosaics where predators track prey and range shifts",
      "baltyckie-ssaki-morskie": "Baltic waters, sandbars, beaches and quiet coastal haul-out or feeding areas"
    },
    "plazy-gady": {
      "barwy-i-obrona": "breeding pools, damp woods, shallow waters and refuges where color or skin chemistry becomes defensive",
      "gody-i-metamorfozy": "small fish-free ponds, spring pools, ruts, ditches and moist terrestrial shelters used during amphibian breeding cycles",
      "wspinaczka-i-woda": "pond edges, shrubs, reeds, woodland pools and vegetated waters where climbing, calling or aquatic life dominates",
      "zolwie-i-inwazje": "quiet wetlands, oxbows, park ponds, basking logs and sandy nesting places used by native or released turtles",
      "jaszczurki-i-beznogie": "sunny banks, grasslands, gardens, forest edges, bogs and ground-level cover used for warming and hiding",
      "weze-jad-i-relikty": "wetland edges, warm slopes, rocky refuges, Bieszczady valleys and mosaics where snakes find prey and shelter"
    },
    "architektura-drewniana": {
      "koscioly-pokoju": "large half-timbered sacred interiors where wood, history and restrictions shaped unusual spaces",
      "gotyk-zrebowy": "log-built Gothic churches, shingled roofs, painted interiors and small village ensembles",
      "cerkwie-karpat": "Carpathian wooden tserkvas, iconostases, towers, domes and borderland sacred landscapes",
      "styl-zakopianski-i-gorale": "mountain wooden houses, chapels, villas and village ensembles shaped by Podhale carpentry",
      "wielokulturowe-drewno": "wooden mosques, manor houses, arcaded homes and villages where culture, craft and settlement history meet"
    },
    podziemia: {
      "kopalnie-surowce": "salt, flint, metal, coal, gold and uranium mines where geology meets work and engineering",
      "podziemia-wojenne": "wartime tunnels, unfinished works and underground structures interpreted with calm historical context",
      "miejskie-piwnice": "urban cellars, merchant storage spaces, archaeology and routes below old-town streets",
      "fortyfikacje-schrony": "fortresses, shelters, railway bunkers and command sites where concrete and corridors shaped defense",
      "tajemnice-legendy": "partly documented undergrounds, local legends and places where careful uncertainty is part of the story"
    },
    "cuda-inzynierii": {
      "woda-kanaly": "canals, locks, brine structures, water towers and urban river systems where water level, pressure or flow is the main mechanism",
      "mosty-tunele-koleje": "bridges, viaducts, tunnels and mountain railways where structure solves distance, height or barriers",
      energia: "dams, pumped-storage plants and former power infrastructure where water, height and machines become energy",
      "radio-komunikacja": "radio, ports and long-range infrastructure where communication, logistics and movement organize whole places",
      "przemyslowe-miasta": "factory settlements, port cities, worker districts and shipyard landscapes shaped by production",
      "adaptacje-industrialne": "former industrial sites reused for culture, knowledge or public life while keeping their technical memory",
      "beton-fortyfikacje": "reinforced concrete, earthworks and fortification landscapes where material and geometry solve structural problems"
    },
    "twierdze-ruiny": {
      "miasta-idealne": "planned urban layouts where streets, squares, residence and fortifications were designed as one organism",
      "zamki-rezydencje": "castles, palaces and residences where defense, representation, landscape and memory meet",
      twierdze: "fortress landscapes, ring forts, bastions, wartime sites and defensive systems shaped by terrain",
      ruiny: "castle and palace ruins where missing roofs, exposed walls and geology reveal former ambition",
      "zapomniane-konstrukcje": "abandoned palaces, unused viaducts and unfinished structures that require careful access and source checking"
    },
    "memento-mori": {
      ossuaria: "ossuaries and chapels where architecture turns human remains into a sober lesson about mortality",
      nekropolie: "historic cemeteries and necropolises where art, biography and city memory share one landscape",
      "cmentarze-wielu-kultur": "Jewish, Tatar, Mennonite and multicultural burial grounds where inscriptions preserve community history",
      "cmentarze-wojenne": "war cemeteries and military memorials where landscape design organizes collective remembrance",
      "miejsca-zaglady": "Holocaust memorial sites where evidence, names, emptiness and museum language protect difficult history",
      "miejsca-martyrologii": "martyrdom memorials and execution sites where architecture helps visitors read historical trauma calmly",
      "kopce-pradawne-pochowki": "mounds, stone circles and ancient burial landscapes that connect archaeology, legend and commemoration"
    },
    "rekordy-krajobrazu": {
      "piasek-wydmy": "wind-shaped sands, spits and dunes where loose sediment becomes the main landscape mechanism",
      "las-deformacje": "forests and trees where growth, erosion or flooding makes the hidden structure visible",
      "morze-klify-wyspy": "coastal cliffs, spits, deltas and sandbars shaped by waves, currents and sediment",
      "jeziora-mokradla": "deep lakes, vast marshes, peatlands and river wetlands controlled by water level and glacial history",
      "rzeki-zrodla-przelomy": "rivers, springs, gorges and ravines where flowing water cuts, carries or reveals the land",
      "kolory-pokopalniane": "post-mining lakes and landscapes where rock chemistry and extraction history create strong colors",
      "gaz-wulkany-geologia": "gas vents, extinct volcanic forms and old rock outcrops where geology feels unusually alive",
      "gory-skaly-lodowce": "mountain, rock and glacial forms where ice, frost, joints and resistant rock shape the view",
      "ekstrema-iluzje-mikroklimaty": "highest and lowest points, optical illusions, warm pockets and cultural landscapes with unusual spatial effects"
    },
    drzewa: {
      "zapach-i-chemia": "parks, streets, arboreta and old plantings where bark, resin, leaves or fruits create a memorable chemical story",
      "swiatlo-i-mikrozycie": "dead wood, old trunks, forest litter and living-decay boundaries where fungi and wood organisms become visible",
      "anomalie-formy": "sandy soils, shaped stands, damaged crowns and exposed roots where growth form becomes the main feature",
      "rekordy-i-dlugowiecznosc": "veteran-tree sites, parks, villages and forests where age, girth or crown scale defines the curiosity",
      "historia-i-pamiec": "parks, town squares, memorial woods and cultural landscapes where trees carry human stories",
      "kataklizmy-i-przetrwanie": "cliffs, river valleys, storm-prone coasts and damaged trunks shaped by wind, water, lightning or drought",
      "egzotyka-i-kolekcje": "arboreta, botanical gardens and old estates where introduced trees survived outside their native range"
    },
    mineraly: {
      "endemity-nowe-mineraly": "microscopic type minerals, pegmatites, serpentinites and research collections where new species are identified",
      "kolor-swiatlo-forma": "pegmatites, volcanic cavities, crystal pockets and museum specimens where color and crystal form stand out",
      "kruszce-pierwiastki": "ore deposits, old mining districts and museum collections connected with metals and native elements",
      "sole-ewaporaty-konkrecje": "evaporite deposits, salt caverns, sulfur-bearing limestones and secondary crystallization zones",
      "historia-surowce-kultury": "archaeological mining landscapes, beaches, museum collections and cultural materials shaped by geology",
      "strefy-wietrzenia": "oxidized ore veins, dumps and weathered copper-bearing rocks where secondary minerals form",
      "radioaktywne-organiczne": "uranium districts, coal measures and low-temperature veins where geology touches radiation or organic chemistry"
    },
    "formacje-skalne": {
      "granitowe-karkonosze": "granite tors, castle hills and high-mountain blocks shaped by frost, water and jointing",
      "wulkaniczne-i-pogornicze": "volcanic outcrops, columnar jointing and post-mining basins where rock chemistry is visible",
      "labirynty-piaskowcowe": "sandstone labyrinths, walls, mushrooms and isolated blocks shaped by widening joints",
      "jurajski-kras": "limestone gates, windows, cliffs and karst landforms of the Kraków-Częstochowa Upland",
      "karpaty-flisz-tatry": "flysch sandstones, limestone massifs, river gorges and mountain rock forms",
      "swietokrzyskie-niz": "lowland erratics, Devonian and Jurassic rocks, pseudokarst caves and protected outcrops"
    },
    skamienialosci: {
      "paleozoik-pierwsze-lady": "Paleozoic seas, reefs, coal forests and early land ecosystems known from rocks and museum collections",
      "tropy-i-lad-triasu": "Triassic and Early Jurassic land surfaces, clay pits, track-bearing sandstones and vertebrate fossil sites",
      "morza-mezozoiku": "Mesozoic seas, lagoons, quarries and limestone or marl deposits with marine reptiles and invertebrates",
      "bursztyn-i-kenozoik": "Baltic amber, Cenozoic bird sites, museum inclusions and silicified wood from fossil-rich collections",
      "epoka-lodowcowa": "Pleistocene caves, river deposits, loess sites and archaeological layers with Ice Age megafauna"
    },
    "atmosfera-astronomia": {
      "optyka-gorska": "mountain ridges, summits, mist, cloud layers and exposed terrain where light and electric fields become visible",
      "burze-i-gorna-atmosfera": "storm systems, thundercloud tops and upper-atmosphere layers connected with strong convection",
      "niebo-nocne-i-kosmos": "dark skies, summer twilight, northern horizons, meteor nights and low-light observing sites",
      "baltyk-refrakcja-obserwacje": "sea horizons, inversion layers, long sight lines and coastal or upland viewpoints shaped by refraction",
      "mroz-pyl-osady": "frost hollows, peatlands, mountain basins, snow cover and air masses carrying dust or unusual deposits"
    }
  };

  function defaultSafety(item, collectionId) {
    const text = normalize(item.safety_note);
    if (collectionId === "grzyby" && (text.includes("truj") || text.includes("niebez") || text.includes("psycho"))) {
      return "Toxic or potentially dangerous species; educational material only, not advice for collecting or eating.";
    }
    if (text.includes("chron") || text.includes("wrazliw")) {
      return "Sensitive or protected species; observe only and do not collect or disturb wild specimens.";
    }
    if (text.includes("nie chwyt") || text.includes("nie dotyk") || text.includes("nie brac")) {
      return "Do not handle; observe calmly and leave the animal or specimen in place.";
    }
    if (collectionId === "grzyby") {
      return "Educational material only; do not use the atlas to decide whether a fungus is edible.";
    }
    if (collectionId === "ryby") {
      return "Educational material only; do not use the atlas as fishing, handling or legal guidance.";
    }
    if (collectionId === "ptaki") {
      return "Educational material only; observe from a distance and do not disturb nests, leks or rare-bird sites.";
    }
    if (collectionId === "ssaki") {
      return "Educational material only; observe mammals from a distance, do not handle wild animals, disturb bat roosts or approach large mammals and seals.";
    }
    if (collectionId === "plazy-gady") {
      return "Educational material only; observe amphibians and reptiles without handling, moving animals, disturbing breeding sites or revealing sensitive locations.";
    }
    if (collectionId === "architektura-drewniana") {
      return "Educational material only; visit wooden monuments respectfully, follow site rules, do not touch polychrome, icons, woodwork or fragile interiors, and check current opening times.";
    }
    if (collectionId === "podziemia") {
      return "Educational material only; visit underground sites only on legal routes, follow guides, do not enter abandoned adits or shelters, and treat wartime places with calm historical respect.";
    }
    if (collectionId === "cuda-inzynierii") {
      return "Educational material only; view technical sites from legal public areas, do not enter tracks, dams, bridges, port zones, industrial grounds or active infrastructure without permission.";
    }
    if (collectionId === "twierdze-ruiny") {
      return "Educational material only; visit castles, fortresses and ruins legally, do not enter closed, private or unstable structures, and treat memorial sites with historical respect.";
    }
    if (collectionId === "memento-mori") {
      return "Educational material only; this collection includes memorial places and difficult history, so visit respectfully, avoid sensational framing and follow cemetery, museum and site rules.";
    }
    if (collectionId === "rekordy-krajobrazu") {
      return "Educational material only; treat this as landscape context, not route guidance, and follow current rules for national parks, reserves, private land, cliffs, bogs, dunes and mountain terrain.";
    }
    if (collectionId === "drzewa") {
      return "Educational material only; veteran trees and memorial sites should be observed from a distance without damaging bark, roots or supports.";
    }
    if (collectionId === "mineraly") {
      return "Educational material only; do not enter abandoned mines, damage protected sites, collect toxic ores or experiment with radioactive minerals.";
    }
    if (collectionId === "formacje-skalne") {
      return "Educational material only; stay on marked trails, do not damage rock surfaces, enter caves only on official routes and respect protected sites.";
    }
    if (collectionId === "skamienialosci") {
      return "Educational material only; do not damage fossil sites, dig protected layers, enter quarries without permission or remove rare finds from context.";
    }
    if (collectionId === "atmosfera-astronomia") {
      return "Educational material only; do not chase storms, enter exposed ridges during electrical activity, ignore cold risk or treat the atlas as a forecast.";
    }
    return "Educational material only; observe without disturbing the insect or its habitat.";
  }

  function defaultRegion(collectionId) {
    if (collectionId === "grzyby") return "Recorded in Poland; local abundance depends strongly on habitat and season.";
    if (collectionId === "kwiaty") return "Recorded in Poland as a native, wild or established plant curiosity, depending strongly on habitat.";
    if (collectionId === "ryby") return "Recorded in Polish waters or included as a rare visitor from the marine edge of the atlas.";
    if (collectionId === "ptaki") return "Recorded in Poland as a breeding bird, migrant or rare visitor, depending on the species.";
    if (collectionId === "ssaki") return "Recorded in Poland as a native, reintroduced, expanding, invasive or Baltic mammal curiosity, depending on the species.";
    if (collectionId === "plazy-gady") return "Recorded in Poland as a native, local, newly documented, protected or invasive amphibian or reptile curiosity, depending on the species.";
    if (collectionId === "architektura-drewniana") return "Recorded in Poland as a wooden church, tserkva, mosque, house, manor, village ensemble or imported wooden monument.";
    if (collectionId === "podziemia") return "Recorded in Poland as a mine, adit, urban cellar, fortress, shelter, wartime tunnel or chalk underground open to careful historical interpretation.";
    if (collectionId === "cuda-inzynierii") return "Recorded in Poland as a canal, lock, tower, bridge, tunnel, railway, power plant, port, factory district or technical monument.";
    if (collectionId === "twierdze-ruiny") return "Recorded in Poland as an ideal city, castle, residence, fortress, ruin, memorial landscape, abandoned palace, viaduct or unfinished structure.";
    if (collectionId === "memento-mori") return "Recorded in Poland as a cemetery, ossuary, memorial, Holocaust site, war cemetery, mound or ancient burial landscape.";
    if (collectionId === "rekordy-krajobrazu") return "Recorded in Poland as a landscape record, contrast, landform, hydrological curiosity, microclimate or cultural landscape with an unusual spatial effect.";
    if (collectionId === "drzewa") return "Recorded in Poland as a named veteran tree, unusual stand, planted exotic or dendrological phenomenon.";
    if (collectionId === "mineraly") return "Recorded in Poland as a mineral, mineralogical material, ore curiosity or representative geological specimen.";
    if (collectionId === "formacje-skalne") return "Recorded in Poland as a rock formation, protected outcrop, landform, erratic or geologically distinctive site.";
    if (collectionId === "skamienialosci") return "Recorded in Poland as a fossil, trace fossil, fossil site, amber inclusion or representative palaeontological specimen.";
    if (collectionId === "atmosfera-astronomia") return "Recorded in Poland as an atmospheric, astronomical, optical, thermal or sky-observation phenomenon.";
    return "Found locally or more widely in Poland, depending on habitat quality and season.";
  }

  function defaultOccurrence(collectionId) {
    if (collectionId === "grzyby") return "Use the habitat, shape and season as field context; the note is educational, not a collecting guide.";
    if (collectionId === "kwiaty") return "Observe without collecting; many plant curiosities depend on fragile microhabitats.";
    if (collectionId === "ryby") return "Treat the note as natural-history context, not as identification, fishing or handling advice.";
    if (collectionId === "ptaki") return "Use this as natural-history context, not as a reason to approach nests, roosts or sensitive sites.";
    if (collectionId === "ssaki") return "Treat this as natural-history context, not as handling, tracking, feeding or site-disclosure guidance.";
    if (collectionId === "plazy-gady") return "Treat this as natural-history context, not as handling advice, site-disclosure guidance or permission to move amphibians and reptiles.";
    if (collectionId === "architektura-drewniana") return "Treat this as cultural and architectural context, not as a conservation assessment or guarantee of opening and access.";
    if (collectionId === "podziemia") return "Treat this as cultural, industrial and historical context, not as permission to explore closed undergrounds or rely on unverified legends.";
    if (collectionId === "cuda-inzynierii") return "Treat this as engineering and cultural context, not as access guidance, technical certification or permission to enter restricted infrastructure.";
    if (collectionId === "twierdze-ruiny") return "Treat this as architectural, historical and landscape context, not as access guidance, ownership advice or permission to explore unsafe ruins.";
    if (collectionId === "memento-mori") return "Treat this as historical and memorial context, not as access guidance or permission to enter restricted, fragile or sacred areas.";
    if (collectionId === "rekordy-krajobrazu") return "Treat this as landscape and process context, not as access guidance, safety advice or permission to enter fragile or restricted terrain.";
    if (collectionId === "drzewa") return "Treat this as natural-history and cultural context, not as a reason to climb, enter cavities or disturb roots.";
    if (collectionId === "mineraly") return "Treat this as mineralogical context, not as permission to collect, enter mines or handle hazardous specimens.";
    if (collectionId === "formacje-skalne") return "Treat this as geological context, not as permission to climb, collect rock, leave trails or enter restricted caves.";
    if (collectionId === "skamienialosci") return "Treat this as palaeontological context, not as permission to collect fossils, dig sites or disturb scientific layers.";
    if (collectionId === "atmosfera-astronomia") return "Treat this as sky and weather context, not as a forecast, safety instruction or guarantee that the phenomenon will appear.";
    return "Best treated as a field curiosity: observe, photograph and leave the habitat undisturbed.";
  }

  function makeItemMap(collectionId, overrides) {
    const collection = collectionById(collectionId);
    return Object.fromEntries((collection.items || []).map((item) => {
      const entry = overrides[item.id] || {};
      const name = entry.name || item.name_en || item.name_lat || item.name_pl;
      const defaultHook = collectionId === "architektura-drewniana"
        ? `${name} is included here for its unusual wooden structure, craft or cultural story.`
        : collectionId === "podziemia"
          ? `${name} is included here for its underground engineering, urban, mining or wartime story.`
          : collectionId === "cuda-inzynierii"
            ? `${name} is included here because it turns water, height, concrete, radio, transport or industry into a memorable engineering story.`
            : collectionId === "twierdze-ruiny"
              ? `${name} is included here for its unusual architecture, defensive logic, ruined form or memory of place.`
              : collectionId === "memento-mori"
                ? `${name} is included here for its memorial architecture, burial culture, symbolic landscape or difficult historical testimony.`
                : collectionId === "rekordy-krajobrazu"
                  ? `${name} is included here because it turns a record, contrast, process or microclimate into a memorable Polish landscape.`
                : `${name} is included here for its unusual field appearance and memorable natural-history story.`;
      const defaultQuizAngle = collectionId === "architektura-drewniana"
        ? "Recognize it by the building type, wooden technique, region and the feature that makes it unusual."
        : collectionId === "podziemia"
          ? "Recognize it by the type of underground site, region and the historical or technical feature that makes it unusual."
          : collectionId === "cuda-inzynierii"
            ? "Recognize it by the mechanism, material, region and problem that the engineering solved."
            : collectionId === "twierdze-ruiny"
              ? "Recognize it by the building type, landscape position, defensive idea and the detail that makes it unusual."
              : collectionId === "memento-mori"
                ? "Recognize it by the type of memorial place, community, period and the form through which memory is kept."
                : collectionId === "rekordy-krajobrazu"
                  ? "Recognize it by the landform, process, region and record or nickname that makes the landscape unusual."
                : "Recognize it by the strongest field mark, habitat and the feature that makes it unusual.";
      return [item.id, {
        name,
        hook: entry.hook || item.hook_en || defaultHook,
        quiz_angle: entry.quiz_angle || item.quiz_angle_en || defaultQuizAngle,
        safety_note: entry.safety_note || item.safety_note_en || defaultSafety(item, collectionId),
        region: entry.region || item.region_en || defaultRegion(collectionId),
        habitat: entry.habitat || item.habitat_en || defaultHabitats[collectionId]?.[item.category] || "specialized habitats in Poland",
        occurrence: entry.occurrence || item.occurrence_en || defaultOccurrence(collectionId),
        level: entry.level || levels[item.level] || item.level || "atlas note"
      }];
    }));
  }

  const mushroomText = {
    "okratek-australijski": {
      name: "Australian basket stinkhorn",
      hook: "It looks like a red octopus or starfish rising out of the forest litter.",
      quiz_angle: "recognize the red arms, slimy spore mass and almost unreal stinkhorn shape"
    },
    "sromotnik-bezwstydny": {
      name: "Common stinkhorn",
      hook: "A woodland stinker whose smell attracts flies that carry its spores.",
      quiz_angle: "smell, shape and the role of insects in spreading spores"
    },
    "madziak-psi": {
      name: "Dog stinkhorn",
      hook: "A slender, strange stinkhorn relative that can look like a tiny woodland antenna.",
      quiz_angle: "how to separate dog stinkhorn from the larger stinkhorns"
    },
    "sromotnik-fiolkowy": {
      name: "Dune stinkhorn",
      hook: "Its egg stage may be pinkish or violet, giving the fungus a surprisingly vivid look.",
      quiz_angle: "the egg stage and comparison with the common stinkhorn"
    },
    "czarka-austriacka": {
      name: "Scarlet elf cup",
      hook: "A vivid red cup that appears when many people do not expect fungi at all.",
      quiz_angle: "late-winter and early-spring cup fungi"
    },
    "kustrzebka-pomaranczowa": {
      name: "Orange peel fungus",
      hook: "It looks like a piece of orange peel dropped onto bare soil.",
      quiz_angle: "unusual cup fungi without a classic cap and stem"
    },
    "dzbankowka-kulista": {
      name: "Globe-shaped witches' cauldron",
      hook: "A dark barrel-shaped fungus that resembles a small leathery cup or jar.",
      quiz_angle: "rare cup fungi and natural, humid forest habitats"
    },
    "czareczka-dlugotrzonkowa": {
      name: "Long-stalked scarlet cup",
      hook: "A tiny red cup on a long stalk, like a miniature chalice in the litter.",
      quiz_angle: "small details: cup, stalk and buried wood in the substrate"
    },
    "krazkowka-zylkowana": {
      name: "Veined cup fungus",
      hook: "A wrinkled bowl with clear veins, often linked with morel-like spring habitats.",
      quiz_angle: "comparison with morels and false morels"
    },
    "piestrzenica-kasztanowata": {
      name: "False morel",
      hook: "It looks like a brown brain, making it a strong lesson in dangerous look-alikes.",
      quiz_angle: "distinguishing it from true morels and remembering toxicology warnings"
    },
    "smardz-jadalny": {
      name: "Common morel",
      hook: "A honeycomb-like fruiting body: one of the most recognizable spring fungi.",
      quiz_angle: "honeycomb pits versus the folded brain-like surface of false morels"
    },
    "smardz-wyniosly": {
      name: "Black morel",
      hook: "A tall, conical morel with a graphic, ridged structure.",
      quiz_angle: "differences between morel types and similar-looking fungi"
    },
    "soplowka-jezowata": {
      name: "Lion's mane",
      hook: "A white ball with long hanging spines, like a lion's mane or a sea creature.",
      quiz_angle: "wood-growing fungi without a classic cap"
    },
    "soplowka-bukowa": {
      name: "Coral tooth fungus",
      hook: "Branching white spines look like ice coral on dead wood.",
      quiz_angle: "comparing different Hericium species"
    },
    "siedzun-sosnowy": {
      name: "Cauliflower fungus",
      hook: "A woodland cauliflower or noodle-like tangle growing near a pine trunk.",
      quiz_angle: "the large, folded, cream-colored structure"
    },
    "swiecznica-rozgaleziona": {
      name: "Crown coral fungus",
      hook: "Coral-like branches end in tiny crown shapes, like little candlesticks.",
      quiz_angle: "the crown-like tips of the branches"
    },
    "koralowka-groniasta": {
      name: "Clustered coral fungus",
      hook: "A fungus that looks like a bouquet of pinkish coral.",
      quiz_angle: "caution with coral fungi: many similar species exist"
    },
    "pieknorog-lepki": {
      name: "Yellow stagshorn",
      hook: "Yellow-orange antler-like branches rise from dead conifer wood.",
      quiz_angle: "horn shape and conifer wood substrate"
    },
    "trzesak-pomaranczowozolty": {
      name: "Witch's butter",
      hook: "A yellow jelly on branches, like a little woodland blob of dessert.",
      quiz_angle: "jelly fungi and the visible effect of moisture"
    },
    "uszak-bzowy": {
      name: "Wood ear",
      hook: "A jelly fungus shaped like an ear, often found on elder wood.",
      quiz_angle: "ear shape, jelly texture and wood substrate"
    },
    "galaretnica-miesista": {
      name: "Purple jellydisc",
      hook: "Violet-pink jelly clusters grow on dead wood.",
      quiz_angle: "color, texture and the tiny dead-wood microhabitat"
    },
    "kolczakowka-galaretowata": {
      name: "Toothed jelly fungus",
      hook: "A translucent whitish fungus with a spiny underside and jelly-like texture.",
      quiz_angle: "spines underneath instead of gills or pores"
    },
    "plomyczek-galaretowaty": {
      name: "Apricot jelly fungus",
      hook: "A salmon-pink jelly flame rising from soil or decaying substrate.",
      quiz_angle: "color and the soft funnel-like form"
    },
    "promieniak-wilgociomierz": {
      name: "Barometer earthstar",
      hook: "A small star that opens and closes its arms in response to moisture.",
      quiz_angle: "hygroscopic movement and comparison with earthstars"
    },
    "gwiazda-wieloporowa": {
      name: "Many-holed earthstar",
      hook: "An earthstar with several openings, like a small mechanical model from another planet.",
      quiz_angle: "multiple openings and the star-shaped body"
    },
    "gwiazdosz-wzniesiony": {
      name: "Arched earthstar",
      hook: "The fruiting body seems to stand on its own star-shaped supports.",
      quiz_angle: "different earthstar shapes and how they are built"
    },
    "gwiazdosz-czteropromienny": {
      name: "Rayed earthstar",
      hook: "A precise little star with a round spore sac in the middle.",
      quiz_angle: "number and arrangement of the arms"
    },
    "berloweczka-zimowa": {
      name: "Winter stalkball",
      hook: "A tiny lollipop with a spore sac on a thin stem.",
      quiz_angle: "fungi of sandy grasslands and dry habitats"
    },
    "kubek-prazkowany": {
      name: "Fluted bird's nest",
      hook: "A miniature bird's nest holding tiny 'eggs' that contain spores.",
      quiz_angle: "rain-splash spore dispersal"
    },
    "gniazdniczka-kulista": {
      name: "Common bird's nest",
      hook: "Another bird's-nest fungus, perfect for comparison in the quiz.",
      quiz_angle: "differences between smooth and fluted bird's-nest fungi"
    },
    "kolczakowka-piekaca": {
      name: "Bleeding tooth fungus",
      hook: "The famous bleeding tooth: a pale fruiting body with red droplets.",
      quiz_angle: "guttation droplets and the toothed fertile surface"
    },
    "kolczakowka-niebieska": {
      name: "Blue tooth fungus",
      hook: "Blue shades in fungi make a strong visual impression.",
      quiz_angle: "fruiting-body color and the spiny underside"
    },
    "kolczakowka-wonna": {
      name: "Fragrant tooth fungus",
      hook: "Interesting not only for its form, but also for its scent.",
      quiz_angle: "features beyond color: smell and spines"
    },
    "zylkowiec-rozowawy": {
      name: "Wrinkled peach",
      hook: "A pinkish cap with a network of veins, like an anatomical drawing.",
      quiz_angle: "veined cap surface and wood-growing habit"
    },
    "szyszkowiec-luskowaty": {
      name: "Old man of the woods",
      hook: "A dark scaly bolete that looks as if it came from a storybook forest.",
      quiz_angle: "cap scales and bolete structure"
    },
    "krwistoborowik-szatanski": {
      name: "Devil's bolete",
      hook: "A pale cap, red pores and a dramatic name make it a strong safety quiz species.",
      quiz_angle: "red pores, stem pattern and the risk of wrong associations"
    },
    "wilgotnica-czerniejaca": {
      name: "Blackening waxcap",
      hook: "A bright fungus that clearly darkens with age or damage.",
      quiz_angle: "color change over time as a recognition feature"
    },
    "lakowka-ametystowa": {
      name: "Amethyst deceiver",
      hook: "An intensely violet mushroom: an easy visual hit for beginners.",
      quiz_angle: "purple gills and cap, with color changing as it ages"
    },
    "chlorowka-drobna": {
      name: "Green elfcup",
      hook: "It stains wood blue-green; sometimes the colored wood is easier to find than the fruiting bodies.",
      quiz_angle: "a fungus recognized by its effect on wood"
    },
    "grzybowka-krwista": {
      name: "Bleeding fairy helmet",
      hook: "When damaged, it releases dark red latex, a great curiosity but not a field experiment.",
      quiz_angle: "damage response and growth on dead wood"
    },
    "muchomor-czerwony": {
      name: "Fly agaric",
      hook: "The most iconic fungus in culture: red cap, white spots and instant recognition.",
      quiz_angle: "mythology, pop culture and real toxicology warnings"
    },
    "ozorek-debowy": {
      name: "Beefsteak fungus",
      hook: "It resembles a piece of raw meat attached to an oak trunk.",
      quiz_angle: "shape, color and its link with oaks"
    },
    "zolciak-siarkowy": {
      name: "Chicken of the woods",
      hook: "Bright yellow shelves on a tree, visible from far away.",
      quiz_angle: "bracket fungi, shelf-like fruiting bodies and parasitism on trees"
    },
    "lakownica-lsniaca": {
      name: "Shiny bracket",
      hook: "A glossy, varnished fruiting body that looks like a carved wooden object.",
      quiz_angle: "shiny bracket fungi and the myth of medicinal mushrooms"
    },
    "pniarek-lekarski": {
      name: "Agarikon",
      hook: "Historically linked with old medicine, today it is more notable as a relic of natural forests.",
      quiz_angle: "history of use and protection of old tree stands"
    },
    "blyskoporek-podkorowy": {
      name: "Chaga",
      hook: "A black growth on birch that looks more like a charred lump than a classic mushroom.",
      quiz_angle: "the difference between the sterile conk and the true fruiting body"
    },
    "gestoporek-cynobrowy": {
      name: "Cinnabar bracket",
      hook: "An intensely cinnabar-red wood fungus: small but very photogenic.",
      quiz_angle: "bright bracket fungi on dead wood"
    },
    "maczuznik-bojowy": {
      name: "Scarlet caterpillarclub",
      hook: "Orange clubs rising from insect larvae, like a natural-history documentary scene.",
      quiz_angle: "fungi that parasitize insects"
    },
    "maczuznik-nasiezrzalowy": {
      name: "Snaketongue truffleclub",
      hook: "A dark club growing from underground fungi: a parasite on a parasite.",
      quiz_angle: "fungus-on-fungus parasitism in hidden underground fruiting bodies"
    },
    "czasznica-olbrzymia": {
      name: "Giant puffball",
      hook: "A huge white ball that looks more like a sports ball than a fungus.",
      quiz_angle: "young round fungi and caution in identification"
    },
    "opienka-miodowa-bioluminescencja": {
      name: "Honey fungus group",
      hook: "The mycelium and dark rhizomorphs can give a greenish glow in complete darkness.",
      quiz_angle: "bioluminescence in mycelium and rhizomorphs, not usually in the caps"
    },
    "lycznik-ochrowy-bioluminescencja": {
      name: "Bitter oyster",
      hook: "Small ochre caps grow in groups on dead wood; the glow story is real, but European specimens often glow weakly or not at all.",
      quiz_angle: "bioluminescence versus fluorescence and why European records need caution"
    },
    "wrosniak-roznobarwny": {
      name: "Turkey tail",
      hook: "Tiny fans form concentric color bands like natural graphics on dead wood.",
      quiz_angle: "colored zones, thin leathery shelves and tiled growth on wood"
    },
    "boczniaczek-pomaranczowozolty": {
      name: "Orange mock oyster",
      hook: "Bright orange shelves grow sideways from wood and look like woodland neon.",
      quiz_angle: "intense orange-yellow color, side attachment and dead-wood growth"
    },
    "zaslonak-fioletowy": {
      name: "Violet webcap",
      hook: "The whole fruiting body can be deep velvety violet with a metallic sheen.",
      quiz_angle: "dark violet cap and stem, velvety surface and young cortina"
    },
    "czernidlak-kolpakowaty": {
      name: "Shaggy ink cap",
      hook: "A white shaggy cap matures quickly, blackens and dissolves into inky liquid.",
      quiz_angle: "tall white cap, shaggy scales and blackening gills"
    },
    "miekusz-rabarbarowy": {
      name: "Cinnamon bracket",
      hook: "A modest cinnamon bracket hides a laboratory secret: alkali turns it purple.",
      quiz_angle: "the KOH or ammonia reaction that stains the flesh purple"
    },
    "krasnoborowik-ceglastopory": {
      name: "Scarletina bolete",
      hook: "Red pores and yellow flesh quickly turn deep blue when bruised.",
      quiz_angle: "rapid blue staining and red pores without a stem net"
    },
    "lejkowiec-dety": {
      name: "Black trumpet",
      hook: "A black hollow trumpet grows from the forest floor and can disappear visually among beech leaves.",
      quiz_angle: "hollow trumpet shape, dark interior and grey outer surface"
    },
    "zagwiak-luskowaty": {
      name: "Dryad's saddle",
      hook: "A huge fan-shaped cap carries dark scales arranged like a reptile-skin pattern.",
      quiz_angle: "large fan-shaped fruiting body, concentric scales and growth on deciduous trunks"
    }
  };

  const insectText = {
    "oleica-krowka": {
      name: "Common oil beetle",
      hook: "A swollen beetle with short wing cases, as if it no longer fits its own armor.",
      quiz_angle: "yellow drops of cantharidin-rich haemolymph and the inflated abdomen",
      safety_note: "Do not touch; its defensive fluid contains toxic cantharidin.",
      region: "Scattered in Poland and easiest to look for in spring.",
      habitat: "Sunny clearings, woodland edges, dry meadows and roadside grasslands.",
      occurrence: "The larvae depend on wild bees, so the species favors mosaics of warm habitats.",
      level: "wow effect"
    },
    "zmierzchnica-trupia-glowka": {
      name: "Death's-head hawkmoth",
      hook: "A large moth with a yellow thoracic pattern that resembles a human skull.",
      quiz_angle: "the skull pattern, its ability to squeak and its habit of stealing honey from hives",
      safety_note: "Do not handle; observe without stressing the insect.",
      region: "In Poland it appears rarely as a migrant from the south.",
      habitat: "Gardens, fields, warm tree lines and places with larval host plants.",
      occurrence: "Encounters are rare and often linked with warm seasons and migration.",
      level: "rare visitor"
    },
    "fruczak-golabek": {
      name: "Hummingbird hawkmoth",
      hook: "It looks like a tiny hummingbird, hovering in front of flowers to drink nectar.",
      quiz_angle: "hovering flight, a very long proboscis and rapid wingbeats",
      safety_note: "Do not catch it; it is best watched at flowers.",
      region: "Seen increasingly often in many parts of Poland.",
      habitat: "Gardens, balconies, flowerbeds, meadows and warm flower-rich edges.",
      occurrence: "Especially easy to notice at lavender, geraniums and buddleia.",
      level: "easy start"
    },
    "zyrytwa-pluskwowata": {
      name: "Water scorpion",
      hook: "An aquatic bug that looks like a cross between a dry leaf and a scorpion.",
      quiz_angle: "grasping front legs and the long breathing tube at the end of the abdomen",
      safety_note: "Do not pick it up; observe it in the water.",
      region: "Local in still and slow-moving waters in Poland.",
      habitat: "Shallow ponds, ditches, oxbows and vegetated margins.",
      occurrence: "It often waits motionless among plants and hunts by ambush.",
      level: "aquatic oddity"
    },
    "wielbladka": {
      name: "Snakefly",
      hook: "Its elongated front body makes it look like an insect with an unnaturally long neck.",
      quiz_angle: "the camel-like profile and predatory life under bark",
      safety_note: "Do not peel bark to search for it; observe without damaging habitat.",
      region: "Scattered in Poland and usually rarely noticed.",
      habitat: "Forests, old trees, dead wood and bark inhabited by small insects.",
      occurrence: "They are not usually abundant in view because they live a hidden life.",
      level: "hidden species"
    },
    "bujanka": {
      name: "Bee-fly",
      hook: "A flying ball of fluff with a long proboscis, more odd than dangerous.",
      quiz_angle: "fuzzy body, hovering at flowers and flicking eggs into wild bee nests",
      safety_note: "Harmless to people; do not destroy wild bee nests.",
      region: "Found in warm sandy places across many regions.",
      habitat: "Sunny woodland edges, sandy roads, grasslands and gardens.",
      occurrence: "Most visible in spring, especially in April and May.",
      level: "easy start"
    },
    "nadobnica-alpejska": {
      name: "Rosalia longicorn",
      hook: "A blue-grey beetle with velvety black spots and very long antennae.",
      quiz_angle: "blue-grey color, black spots and old beech forests",
      safety_note: "Strictly protected; do not collect or disturb it.",
      region: "Extremely rare; key refuges are in south-eastern Poland.",
      habitat: "Old beech forests, especially with dead and dying beech wood.",
      occurrence: "A symbol of old-forest and dead-wood conservation.",
      level: "atlas jewel"
    },
    "turkuc-podjadek": {
      name: "European mole cricket",
      hook: "It looks like a cricket crossed with a mole, with shovel-like digging legs.",
      quiz_angle: "underground tunnels, digging front legs and the loud night song of males",
      safety_note: "Do not kill without need; it is part of the local ecosystem.",
      region: "Local, more frequent in warm and moist places.",
      habitat: "Moist soils, gardens, meadows and the edges of water bodies.",
      occurrence: "Despite its heavy build it can fly and swim.",
      level: "underground engineer"
    },
    "zgarb-rogaty": {
      name: "Horned treehopper",
      hook: "A miniature insect gargoyle with a spiny helmet-like projection on the thorax.",
      quiz_angle: "the horned helmet that mimics thorns and helps camouflage it on twigs",
      safety_note: "Observe without knocking it off plants.",
      region: "Scattered and locally found in warm habitats.",
      habitat: "Shrubs, young trees, thickets and warm woodland edges.",
      occurrence: "Easy to overlook because its shape imitates part of the plant.",
      level: "micro-curiosity"
    },
    "wojsilka-pospolita": {
      name: "Common scorpionfly",
      hook: "It looks like a fly with a scorpion tail, although it has no venomous sting.",
      quiz_angle: "the male reproductive structure that resembles a scorpion abdomen",
      safety_note: "Harmless; best observed on vegetation.",
      region: "Fairly widespread, though not always noticed.",
      habitat: "Moist thickets, woodland edges, meadows and gardens.",
      occurrence: "It feeds partly on dead small invertebrates.",
      level: "strange shape"
    },
    "pucolka": {
      name: "Cimbicid sawfly",
      hook: "A chunky sawfly that looks like an oversized, ungainly bee.",
      quiz_angle: "massive body, clubbed antennae and defensive droplets of haemolymph",
      safety_note: "Do not grab it; observe from a little distance.",
      region: "Found locally, depending on the species and host plants.",
      habitat: "Deciduous woods, tree lines, edges and places with suitable shrubs or trees.",
      occurrence: "Adults are striking but seasonal.",
      level: "less often seen"
    },
    "wonnica-pizmowka": {
      name: "Musk beetle",
      hook: "A metallic green beetle that can smell musky and rosy.",
      quiz_angle: "metallic body, long antennae and an unexpectedly pleasant scent",
      safety_note: "Do not collect; observation and photography are enough.",
      region: "Local and linked with willows and moist habitats.",
      habitat: "Riverside tree lines, willows, moist meadows and edges.",
      occurrence: "The scent may be noticeable before the insect is spotted.",
      level: "aromatic curiosity"
    },
    "biegacz-skorzasty": {
      name: "Great ground beetle",
      hook: "Poland's largest ground beetle: dark, heavy and armed with chemical defense.",
      quiz_angle: "large size, wrinkled wing cases and a foul defensive spray",
      safety_note: "Do not handle; it can bite and release irritating fluid.",
      region: "Found in many Polish regions, especially forests.",
      habitat: "Deciduous and mixed forests, shaded gardens and damp hideouts.",
      occurrence: "An active ground predator, often nocturnal.",
      level: "night hunter"
    },
    "odorek-zieleniak": {
      name: "Green shield bug",
      hook: "A green true bug known for its strong defensive odor.",
      quiz_angle: "green shield shape and intense smell when disturbed",
      safety_note: "Do not crush it; the smell is irritating and long-lasting.",
      region: "Common in many parts of Poland.",
      habitat: "Shrubs, gardens, orchards, raspberries, thickets and woodland edges.",
      occurrence: "It sometimes visits fruit, which makes it easy to remember.",
      level: "common classic"
    },
    "pluskolec-pospolity": {
      name: "Common backswimmer",
      hook: "A predatory aquatic bug that swims upside down.",
      quiz_angle: "upside-down swimming, oar-like hind legs and a painful bite",
      safety_note: "Do not handle; the bite can be painful.",
      region: "Frequent in still waters in Poland.",
      habitat: "Ponds, garden ponds, ditches, oxbows and calm bays.",
      occurrence: "It is sometimes called a water wasp because of the painful bite.",
      level: "aquatic predator"
    },
    "topielica": {
      name: "Water stick insect",
      hook: "An underwater stick insect with a long breathing tube held above the surface.",
      quiz_angle: "thin stick-like body, grasping legs and breathing tube",
      safety_note: "Do not remove it from water without need.",
      region: "Scattered in still and slow-flowing waters.",
      habitat: "Shallow vegetated ponds, ditches and quiet margins.",
      occurrence: "It can wait motionless for hours, relying on camouflage.",
      level: "camouflage master"
    },
    "plywak-zoltobrzezek": {
      name: "Great diving beetle",
      hook: "A large aquatic beetle that carries an air supply under its wing cases like a tank.",
      quiz_angle: "yellow edging, underwater hunting and the air bubble under the wing cases",
      safety_note: "Do not handle; the strong jaws of larvae and adults can hurt.",
      region: "Found in various still waters in Poland.",
      habitat: "Ponds, garden ponds, clay pits and vegetated water bodies.",
      occurrence: "Larvae are fierce predators and can take tadpoles and small fish.",
      level: "underwater hunter"
    },
    "swietlik-swietojanski": {
      name: "Common glow-worm",
      hook: "Females look larva-like and glow greenish in summer nights.",
      quiz_angle: "female bioluminescence, wingless females and flying males",
      safety_note: "Do not collect glowing females; observe after dusk.",
      region: "Local and strongly dependent on dark, less disturbed habitats.",
      habitat: "Meadows, woodland edges, field margins and gardens without strong night lighting.",
      occurrence: "Easiest to search for on warm humid evenings around late June and early July.",
      level: "night signal"
    },
    "iskrzyk": {
      name: "Lesser glow-worm",
      hook: "A smaller glow-worm relative whose glowing males can look like green sparks.",
      quiz_angle: "tiny male lanterns and swarming in dark woodland",
      safety_note: "Do not catch it; limit torchlight during observation.",
      region: "Local and difficult to detect without the right night conditions.",
      habitat: "Moist shady forests and thickets with little artificial light.",
      occurrence: "Most spectacular during its short mating period.",
      level: "rare night"
    },
    "gasienica-zmrocznika-gladysza": {
      name: "Elephant hawkmoth caterpillar",
      hook: "The caterpillar looks like a small snake with false eyes.",
      quiz_angle: "false eyes, defensive posture and UV-visible fluorescence",
      safety_note: "Do not move it without need; leave it on its host plant.",
      region: "Widespread where suitable host plants grow.",
      habitat: "Moist meadows, gardens, tall herb vegetation and places with willowherbs or bedstraws.",
      occurrence: "The UV effect is an observation curiosity, not a reason to disturb caterpillars.",
      level: "UV effect"
    },
    "gasienica-zawisaka-borowca": {
      name: "Pine hawkmoth caterpillar",
      hook: "A green pine caterpillar can glow bluish-green under UV light.",
      quiz_angle: "link with pines, camouflage on needles and UV fluorescence",
      safety_note: "Do not pull it from twigs; observe briefly and gently.",
      region: "Linked with pine forests and pine plantings.",
      habitat: "Pine woods, forest edges, young stands and gardens with pines.",
      occurrence: "By day it is well camouflaged on needles and easy to miss.",
      level: "forest neon"
    },
    "mieniak-mzawiec": {
      name: "Purple emperor",
      hook: "The male's brown wings suddenly flash violet or blue at the right angle.",
      quiz_angle: "structural color without blue pigment and the metallic flash of males",
      safety_note: "Do not collect; photograph from a distance.",
      region: "Local and linked with deciduous forests and willows.",
      habitat: "Woodland rides, clearings, edges and moist forest places.",
      occurrence: "Males often come down to damp soil and mineral patches on roads.",
      level: "jewel"
    },
    "kruszczyca-zlotawka": {
      name: "Rose chafer",
      hook: "A metallic beetle that shifts through green, gold, copper and purple.",
      quiz_angle: "shiny armor and colors that change with viewing angle",
      safety_note: "Do not destroy larvae in rotting wood; they are part of nutrient cycling.",
      region: "Common in many Polish regions.",
      habitat: "Gardens, parks, orchards, woodland edges and flowering shrubs.",
      occurrence: "Adults often sit on roses and elder flowers.",
      level: "common beauty"
    },
    "strzyzak-sarni": {
      name: "Deer ked",
      hook: "A flat parasitic fly that drops its wings after finding a host.",
      quiz_angle: "hard flattened body, running through hair and shedding wings",
      safety_note: "Avoid contact; after a walk check clothing and hair.",
      region: "Locally common in forests with deer.",
      habitat: "Forests, tree lines and places used by roe deer, red deer and elk.",
      occurrence: "Often mistaken for a tick, though it is a fly.",
      level: "unpleasant classic"
    },
    "skorek-pospolity": {
      name: "Common earwig",
      hook: "An earwig with forceps at the end of the abdomen, much scarier in looks than in reality.",
      quiz_angle: "abdominal forceps, flattened body and night activity",
      safety_note: "Harmless; there is no reason to panic if found at home or in a garden.",
      region: "Common throughout Poland.",
      habitat: "Gardens, parks, compost, cracks, bark and damp hiding places.",
      occurrence: "It helps control small invertebrates, although it may nibble plants.",
      level: "common oddity"
    },
    "larwa-biedronki": {
      name: "Ladybird larva",
      hook: "It looks like a tiny spiny alligator, although it becomes a familiar ladybird.",
      quiz_angle: "black-orange spines, long legs and hunting aphids",
      safety_note: "Do not destroy; the larvae are very useful in gardens.",
      region: "Common wherever aphids and ladybirds occur.",
      habitat: "Gardens, meadows, trees, shrubs, crops and plants with aphid colonies.",
      occurrence: "A good example that larvae can look completely different from adults.",
      level: "metamorphosis"
    },
    "paz-krolowej": {
      name: "Old World swallowtail",
      hook: "One of Poland's most beautiful butterflies, with yellow wings and elegant tails.",
      quiz_angle: "yellow-black pattern, blue eyespots, red marks and wing tails",
      safety_note: "Do not collect; observe at flowers and host plants.",
      region: "Scattered, locally regular in warm open habitats.",
      habitat: "Meadows, grasslands, gardens, roadsides and places with umbellifers.",
      occurrence: "Caterpillars feed on carrot-family plants and are as striking as the adults.",
      level: "aristocrat"
    },
    "zlotook-pospolity": {
      name: "Common green lacewing",
      hook: "A delicate green insect with transparent wings and eyes shining like gold.",
      quiz_angle: "pale green body, golden eyes and lace-like wings",
      safety_note: "Do not kill indoors; gently release it outside.",
      region: "Common in many Polish habitats.",
      habitat: "Gardens, tree lines, meadows, parks and plants with aphids.",
      occurrence: "The predatory larvae are useful because they eat aphids.",
      level: "delicate ally"
    },
    "jelonek-rogacz": {
      name: "Stag beetle",
      hook: "Poland's largest beetle, with males carrying antler-like jaws.",
      quiz_angle: "huge male jaws, old oaks and dusk flight",
      safety_note: "Protected species; do not collect or move without need.",
      region: "Rare and local, mainly in warmer regions with ancient oaks.",
      habitat: "Old deciduous forests, parks, avenues and places with decaying oak wood.",
      occurrence: "Its presence depends on old trees and dead wood.",
      level: "majestic species"
    },
    "kozog-debowy": {
      name: "Great capricorn beetle",
      hook: "A large black beetle with antennae longer than its body, tied to old oaks.",
      quiz_angle: "very long antennae, tar-black body and old oak habitats",
      safety_note: "Protected species; do not collect or damage inhabited oaks.",
      region: "Rare and point-local, linked with refuges of old oaks.",
      habitat: "Old sunlit oaks in forests, parks, avenues and open landscapes.",
      occurrence: "A symbol of habitat continuity with very old trees.",
      level: "prehistoric king"
    }
  };

  const flowerText = {
    "aldrowanda-pecherzykowata": {
      name: "Waterwheel plant",
      hook: "A rootless aquatic plant with tiny snap traps that catch plankton like an underwater Venus flytrap.",
      quiz_angle: "underwater snap traps, rootless growth and winter turions",
      safety_note: "Critically endangered and protected; never collect it from wild sites."
    },
    "plywacz-zwyczajny": {
      name: "Greater bladderwort",
      hook: "An underwater hunter with thousands of tiny bladders that suck in small organisms in a fraction of a second.",
      quiz_angle: "vacuum bladder traps, no classic roots and yellow flowers above the water",
      safety_note: "Observe without uprooting; it is part of delicate aquatic habitats."
    },
    "rosiczka": {
      name: "Sundew",
      hook: "A small rosette with sticky dew-like drops that turn leaves into insect traps.",
      quiz_angle: "red glandular hairs, sticky mucilage and slow leaf movement around prey",
      safety_note: "Protected species; do not pick them or trample bog habitats."
    },
    "tlustosz": {
      name: "Butterwort",
      hook: "Flat glossy leaves look harmless, but their surface works as a sticky trap for tiny flies.",
      quiz_angle: "greasy leaves, microscopic glands and large flowers on stalks",
      safety_note: "Rare and sensitive; do not remove plants from wet rocks, fens or bogs."
    },
    "obrazki-plamiste": {
      name: "Lords-and-ladies",
      hook: "Its inflorescence can warm itself and release a rotting smell to lure flies into a temporary trap.",
      quiz_angle: "thermogenesis, spadix, spathe and a short-lived pollinator prison",
      safety_note: "Poisonous and protected; do not touch the berries or dig up plants."
    },
    "obrazki-alpejskie": {
      name: "Alpine arum",
      hook: "A woodland arum with the same strange aura of scent, warmth and specialized fly pollination.",
      quiz_angle: "arum-like spadix, spathe and the attraction of small flies",
      safety_note: "Protected species; do not pick it or damage its sites."
    },
    "swietlik-mszysty": {
      name: "Goblin's gold",
      hook: "It does not glow chemically, but its protonema reflects faint light like a green-gold shine in cracks.",
      quiz_angle: "lens-like protonema cells, reflected light and dark microhabitats",
      safety_note: "Do not scrape it from rocks or root plates; observe without disturbing the micro-site."
    },
    "wiesiolek-dwuletni": {
      name: "Common evening-primrose",
      hook: "Yellow flowers open toward evening, as if the plant starts a night clock for moths.",
      quiz_angle: "evening flower opening, yellow corolla and nocturnal pollinators",
      safety_note: "Educational material only; the atlas is not a herbal-use guide."
    },
    "bniec-bialy": {
      name: "White campion",
      hook: "White flowers become more fragrant after dusk, when nocturnal pollinators take over.",
      quiz_angle: "white corolla, evening scent and separate male and female plants",
      safety_note: "Observe without stripping field margins and roadsides of flowers."
    },
    "chaber-blawatek": {
      name: "Cornflower",
      hook: "For people it is a blue field classic; for insects it is also a map of ultraviolet signals.",
      quiz_angle: "flower head, intense blue color and hidden contrasts for pollinators",
      safety_note: "Do not pick it in bulk; leave flowers for pollinators and seed set."
    },
    "fiolek-trojbarwny": {
      name: "Wild pansy",
      hook: "A small flower whose patterned petals work like a landing pad and signpost for pollinators.",
      quiz_angle: "three-colored corolla, dark veins and hidden nectar guides",
      safety_note: "Educational material only; do not damage grassland or field-edge sites."
    },
    "dwulistnik-pszczeli": {
      name: "Bee orchid",
      hook: "An orchid whose flower imitates an insect so well that it looks like evolutionary deception in bloom.",
      quiz_angle: "bee-like lip, sexual mimicry and very rare sites",
      safety_note: "Protected and very rare orchid; do not pick, dig up or publicize precise sites."
    },
    "obuwik-pospolity": {
      name: "Lady's-slipper orchid",
      hook: "The large yellow slipper acts as a trap that guides an insect out through a narrow pollen route.",
      quiz_angle: "slipper-shaped lip, trap flower and sensitive protected sites",
      safety_note: "Strictly protected; do not pick it or trample sites while photographing."
    },
    "podkolan-bialy": {
      name: "Lesser butterfly-orchid",
      hook: "White flowers become more scented in the evening, calling long-tongued night moths.",
      quiz_angle: "night scent, long spurs and moth pollination",
      safety_note: "Protected orchid; do not pick or transplant it from meadows or woods."
    },
    "podkolan-zielonawy": {
      name: "Greater butterfly-orchid",
      hook: "A greenish orchid whose pollination depends on precise contact with nocturnal insects.",
      quiz_angle: "greenish flowers, spurs and anther arrangement separating it from the lesser butterfly-orchid",
      safety_note: "Protected orchid; observe without damaging plants or forest floor."
    },
    "kukuczka-kapturkowata": {
      name: "Hooded orchid",
      hook: "A small hooded orchid that rewards careful looking close to the forest floor.",
      quiz_angle: "small size, hooded flowers and rarity of sites",
      safety_note: "Protected species; do not pick it or trample the ground while searching."
    },
    "storzan-bezlistny": {
      name: "Ghost orchid",
      hook: "A leafless orchid that spends most of its life underground and suddenly sends up a pale flowering shoot.",
      quiz_angle: "no leaves, dependence on fungi and irregular above-ground flowering",
      safety_note: "Extremely rare and protected; do not reveal sites or touch flowering shoots."
    },
    "luskiewnik-rozowy": {
      name: "Common toothwort",
      hook: "A pink plant without green leaves emerges from the soil because it steals resources from tree and shrub roots.",
      quiz_angle: "no chlorophyll, scaly shoots and root parasitism",
      safety_note: "Do not dig it up; the most interesting part of the plant is underground."
    },
    "zaraza-zolta": {
      name: "Yellow broomrape",
      hook: "A yellowish parasite without chlorophyll, choosing a host connection instead of photosynthesis.",
      quiz_angle: "non-green shoot, parasitism and dependence on host plants",
      safety_note: "Rare plant; do not pick it or damage its sites."
    },
    "gnidosz-rozeslany": {
      name: "Lousewort",
      hook: "A low hemiparasitic plant that looks delicate but taps resources from neighbors underground.",
      quiz_angle: "hemiparasitism, pink flowers and wet-meadow habitats",
      safety_note: "Rare and habitat-sensitive; do not drain or damage wet meadows."
    },
    "pszeniec-gajowy": {
      name: "Wood cow-wheat",
      hook: "Yellow flowers and purple bracts create a two-colored plant with a hidden hemiparasitic lifestyle.",
      quiz_angle: "purple bracts, yellow flowers and root hemiparasitism",
      safety_note: "Educational material only; do not treat it as a useful plant."
    },
    "dyptam-jesionolistny": {
      name: "Burning bush",
      hook: "A fragrant, beautiful plant famous for the burning-bush legend and painful phototoxic burns.",
      quiz_angle: "essential oils, furanocoumarins, phototoxicity and the burning-plant story",
      safety_note: "Do not touch it in sunshine; it can cause strong burns and skin discoloration."
    },
    "wawrzynek-wilczelyko": {
      name: "Mezereon",
      hook: "Pink flowers appear very early, often before the leaves, while later red berries are highly poisonous.",
      quiz_angle: "flowering before leaves, strong scent and toxic red berries",
      safety_note: "Highly poisonous; do not touch berries or pick twigs."
    },
    "kopytnik-pospolity": {
      name: "European wild ginger",
      hook: "Glossy leaves hide brown flowers close to the ground like small woodland secrets.",
      quiz_angle: "ground-level flowers, hoof-shaped leaves and peppery-ginger scent",
      safety_note: "Poisonous plant; do not use it as a medicinal plant on your own."
    },
    "barszcz-zwyczajny": {
      name: "Hogweed",
      hook: "A native relative of famous giant hogweeds, useful for learning the furanocoumarin caution pattern.",
      quiz_angle: "umbel flowerhead, large leaves and photosensitizing compounds in the sap",
      safety_note: "Avoid sap contact in sunshine; it can irritate skin."
    },
    "wilczomlecz-pstry": {
      name: "Cushion spurge",
      hook: "Bright bracts look like petals, while the white sap reminds you that spurges defend themselves chemically.",
      quiz_angle: "yellow bracts, inconspicuous flowers and irritating milky sap",
      safety_note: "Do not touch the sap; it can irritate skin and eyes."
    },
    "klokoczka-poludniowa": {
      name: "European bladdernut",
      hook: "A shrub with inflated seed capsules that rattle after drying like natural beads.",
      quiz_angle: "pinnate leaves, white flowers and bladder-like fruits with rattling seeds",
      safety_note: "Do not damage shrubs; wild sites are local and biogeographically valuable."
    },
    "czworolist-pospolity": {
      name: "Herb-paris",
      hook: "It looks like a botanical sign: four leaves in a whorl and one geometric flower in the center.",
      quiz_angle: "four leaves, solitary flower and black berry",
      safety_note: "Poisonous plant; do not touch berries or confuse them with edible fruit."
    },
    "sledziennica-skretolistna": {
      name: "Alternate-leaved golden saxifrage",
      hook: "It makes yellow-green carpets near springs, although the true flowers are tiny and modest.",
      quiz_angle: "yellow bracts, spring habitats and lack of classic showy petals",
      safety_note: "Do not damage springs or wet microhabitats."
    },
    "kurzyslad-polny": {
      name: "Scarlet pimpernel",
      hook: "A tiny field flower closes with changing weather, so it was once treated as a natural barometer.",
      quiz_angle: "small orange or red flowers and response to clouding weather",
      safety_note: "Poisonous plant; do not treat it as useful or edible."
    },
    "podejzrzon-ksiezycowy": {
      name: "Moonwort",
      hook: "A tiny fern with crescent-shaped leaflets, like a botanical miniature from another age.",
      quiz_angle: "crescent leaf segments, spore-bearing shoot and inconspicuous size",
      safety_note: "Rare and easy to overlook; do not pick it or trample grasslands."
    }
  };

  const fishText = {
    stynka: {
      name: "European smelt",
      hook: "A small silver fish that can smell distinctly like fresh cucumber when taken from the water.",
      quiz_angle: "cucumber scent, cold-water shoals and the small adipose fin behind the dorsal fin",
      safety_note: "Educational material only; do not use the atlas as fishing or food guidance.",
      level: "cucumber scent"
    },
    lipien: {
      name: "European grayling",
      hook: "A fish of clean rivers with a sail-like dorsal fin and a delicate herbal scent.",
      quiz_angle: "scented mucus, the male's large dorsal fin and dependence on cold oxygen-rich water",
      safety_note: "Sensitive and locally regulated; observe without disturbing spawning grounds.",
      level: "river aristocrat"
    },
    "kur-diabel": {
      name: "Shorthorn sculpin",
      hook: "A Baltic bottom predator with a spiny head that can grunt or growl when stressed.",
      quiz_angle: "spiny head, scaleless body and sound amplified by the swim bladder",
      safety_note: "Do not handle with bare hands; the spines and animal stress are reason enough to keep distance.",
      level: "underwater caller"
    },
    piskorz: {
      name: "Weatherfish",
      hook: "A mud-loving fish that can breathe through its gut and squeak when air is forced out.",
      quiz_angle: "intestinal breathing, burrowing in mud and sensitivity to pressure changes",
      safety_note: "Protected and habitat-sensitive; do not collect it or damage oxbows and muddy ponds.",
      level: "living barometer"
    },
    "murowy-swiecik": {
      name: "Pearlside",
      hook: "A small deep-water fish with photophores that help erase its silhouette with light.",
      quiz_angle: "belly photophores, counter-illumination and rare Baltic appearances",
      safety_note: "A rare marine visitor; treat it as natural-history context, not a field target.",
      level: "light visitor"
    },
    tasza: {
      name: "Lumpfish",
      hook: "A stout marine fish with a belly suction disc that lets it cling to rocks in waves.",
      quiz_angle: "fused pelvic fins forming a suction disc, bumpy skin and male care for eggs",
      safety_note: "Observe without taking it from shallow habitats; the atlas is not a fishing guide.",
      level: "Baltic suction cup"
    },
    dennik: {
      name: "Common seasnail",
      hook: "A soft scaleless bottom fish that looks more like a gelatinous shadow than a classic swimmer.",
      quiz_angle: "soft body, bottom life and links with cold marine waters",
      safety_note: "Associated with sensitive seabed habitats; do not disturb bottom environments.",
      level: "soft benthos"
    },
    stornia: {
      name: "European flounder",
      hook: "A flatfish whose young begin symmetrical, then one eye migrates to the other side of the head.",
      quiz_angle: "eye migration, flattened body and camouflage on the seabed",
      safety_note: "Educational material only; do not use the atlas as fishing guidance.",
      level: "asymmetry"
    },
    wezynka: {
      name: "Straightnose pipefish",
      hook: "A thread-thin seagrass mimic related to seahorses, with a tail used for anchoring in vegetation.",
      quiz_angle: "loss of tail fin, elongated body and camouflage in underwater meadows",
      safety_note: "Do not uproot marine vegetation; it is the shelter that makes this fish possible.",
      level: "grass with eyes"
    },
    iglicznia: {
      name: "Broadnosed pipefish",
      hook: "A stiff marine needle with a tube snout and a male that carries young in a brood pouch.",
      quiz_angle: "tube-shaped snout, stick-like body and male incubation of eggs",
      safety_note: "Protect underwater vegetation and do not collect pipefish out of curiosity.",
      level: "marine needle"
    },
    koza: {
      name: "Spined loach",
      hook: "A tiny fish of sandy shallows with a hidden sharp spine beneath the eye.",
      quiz_angle: "suborbital spine, mottled pattern and burrowing in sand",
      safety_note: "Protected species; do not collect it or sieve the bottom for fun.",
      level: "hidden spine"
    },
    jazgarz: {
      name: "Ruffe",
      hook: "A small perch relative whose spiny fins and gill covers make it a difficult mouthful.",
      quiz_angle: "rough body, sharp spines and bottom-oriented life",
      safety_note: "Avoid needless handling; spines can hurt and the fish belongs in the water.",
      level: "rough armor"
    },
    wegorzyca: {
      name: "Viviparous eelpout",
      hook: "A Baltic fish that bypasses exposed eggs and gives birth to live young.",
      quiz_angle: "live-bearing reproduction, elongated body and bottom-dwelling marine life",
      safety_note: "Educational material only; avoid disturbing bottom habitats.",
      level: "live-bearing fish"
    },
    rozanka: {
      name: "Bitterling",
      hook: "A tiny fish that needs living freshwater mussels and places its eggs inside them.",
      quiz_angle: "female ovipositor, bright male breeding colors and dependence on mussels",
      safety_note: "Protect mussels and clean water; without them the bitterling loses its nursery.",
      level: "mussel tenant"
    },
    mietus: {
      name: "Burbot",
      hook: "Poland's freshwater cod relative becomes most active when cold slows many other fish down.",
      quiz_angle: "cold-loving life, chin barbel and spawning in the coldest part of the year",
      safety_note: "Locally regulated species; the atlas does not replace current fishing rules.",
      level: "winter cod"
    },
    "wegorz-europejski": {
      name: "European eel",
      hook: "A migrant whose life cycle links Polish waters with a long oceanic journey toward the Sargasso Sea.",
      quiz_angle: "catadromy, snake-like body, glass eels and distant spawning migration",
      safety_note: "Threatened species; do not treat the atlas as encouragement to catch or buy it.",
      level: "ocean migrant"
    },
    ciernik: {
      name: "Three-spined stickleback",
      hook: "A tiny fighter with three spines, breeding colors and nests glued from plant fibers.",
      quiz_angle: "three spines, red-bellied males and nest building with egg guarding",
      safety_note: "Observe without damaging shoreline vegetation where nests may be built.",
      level: "spiny father"
    },
    cierniczek: {
      name: "Ninespine stickleback",
      hook: "A smaller stickleback relative with a row of many little dorsal spines.",
      quiz_angle: "more small spines than the three-spined stickleback, tiny size and nesting behavior",
      safety_note: "Do not collect it from small waters; its habitats are easy to damage.",
      level: "nine spines"
    },
    sapa: {
      name: "White-eye bream",
      hook: "A river cyprinid with large eyes and a tail whose lower lobe is noticeably longer.",
      quiz_angle: "large eyes, downturned mouth, asymmetrical tail and deeper river channels",
      safety_note: "Locally regulated species; the atlas does not replace current protection rules.",
      level: "asymmetrical tail"
    },
    slonecznica: {
      name: "Sunbleak",
      hook: "A tiny silver fish that may shed scales into a glittering distraction when attacked.",
      quiz_angle: "loosely attached scales, upward mouth and bluish side stripe",
      safety_note: "Do not collect small schooling fish from shallow water; they matter to the ecosystem too.",
      level: "living glitter"
    },
    swinka: {
      name: "Common nase",
      hook: "A cyprinid stone-scraper with a hard lower lip adapted to grazing periphyton from rocks.",
      quiz_angle: "downturned mouth, hardened lip and feeding on stones in faster current",
      safety_note: "Protect natural riffles and clean gravel; do not trample shallow spawning areas.",
      level: "river scraper"
    },
    bolen: {
      name: "Asp",
      hook: "A predatory cyprinid that hunts quickly near the surface, unlike many calmer-looking relatives.",
      quiz_angle: "predatory behavior in a cyprinid, surface strikes and streamlined body",
      safety_note: "Locally regulated species; this is not a fishing guide.",
      level: "toothless predator"
    },
    sielawa: {
      name: "Vendace",
      hook: "A silver fish of cold lakes that lives in open water and needs clean, well-oxygenated conditions.",
      quiz_angle: "pelagic life, silver shine and dependence on cold lakes",
      safety_note: "Sensitive to water quality; the atlas does not replace local protection or fishing rules.",
      level: "silver open water"
    },
    rozpior: {
      name: "Blue bream",
      hook: "A slender bream relative often hidden in plain sight among similar fish of large rivers.",
      quiz_angle: "deep flattened body, bream resemblance and life in larger waters",
      safety_note: "Educational material only; similar cyprinids require careful keys and current references.",
      level: "bream look-alike"
    },
    krap: {
      name: "Silver bream",
      hook: "A common but tricky bream look-alike that teaches attention to proportions and fin details.",
      quiz_angle: "bream resemblance, body proportions and subtle diagnostic differences",
      safety_note: "Educational material only; do not use the atlas as the only identification key.",
      level: "master of confusion"
    },
    samoglow: {
      name: "Ocean sunfish",
      hook: "A giant ocean fish without a classic tail, occasionally recorded as a sensational Baltic visitor.",
      quiz_angle: "no typical tail fin, enormous size and sporadic records near the Polish coast",
      safety_note: "Rare visitor, often in poor condition; leave reports to services and specialists.",
      level: "swimming head"
    },
    "lis-morski": {
      name: "Common thresher",
      hook: "A shark with a tail so long it can use it like a whip to stun schooling fish.",
      quiz_angle: "long upper tail lobe, oceanic shark and very rare northern appearances",
      safety_note: "Oceanic visitor, not a search target; unusual records should be handled by experts.",
      level: "whip tail"
    },
    "zebacz-smugowy": {
      name: "Atlantic wolffish",
      hook: "A marine predator with massive teeth for crushing hard shells and armored prey.",
      quiz_angle: "durophagy, powerful teeth and a famously rough face",
      safety_note: "Marine fish that can bite; do not touch found specimens.",
      level: "crushing teeth"
    },
    lamna: {
      name: "Porbeagle",
      hook: "A strong torpedo-shaped shark of cool seas, included here as a rare northern marine edge case.",
      quiz_angle: "streamlined body, porbeagle identity and rare-visitor status",
      safety_note: "Do not approach living or freshly stranded sharks; report unusual finds.",
      level: "cool-water torpedo"
    },
    "wstegor-krolewski": {
      name: "Giant oarfish",
      hook: "A legendary ribbon-like deep-sea fish whose length helped inspire sea-serpent stories.",
      quiz_angle: "ribbon body, great length and deep-water life",
      safety_note: "Exceptional oceanic visitor; document any find and contact specialists.",
      level: "king of herrings"
    },
    "czebaczek-amurski": {
      name: "Topmouth gudgeon",
      hook: "A small invasive Asian fish whose success comes from fast breeding and ecological opportunism.",
      quiz_angle: "alien invasive species, small size, early maturity and risk to native fauna",
      safety_note: "Invasive alien species; do not move, keep or release it, and follow current rules.",
      level: "micro-invasion"
    },
    "babka-bycza": {
      name: "Round goby",
      hook: "A Ponto-Caspian goby that colonized the Baltic and many connected waters with remarkable toughness.",
      quiz_angle: "alien species, fused pelvic fins forming a suction disc and spread via ballast-water pathways",
      safety_note: "Invasive alien species; do not release caught individuals and check local rules.",
      level: "bottom colonizer"
    }
  };

  const birdText = {
    bielik: {
      name: "White-tailed Eagle",
      hook: "Poland's largest breeding bird patrols lakes and river valleys on broad, board-like wings.",
      quiz_angle: "huge wingspan, pale adult tail and apex-predator role",
      level: "sky monarch"
    },
    mysikrolik: {
      name: "Goldcrest",
      hook: "Poland's smallest bird weighs almost nothing, yet survives by feeding nearly constantly.",
      quiz_angle: "tiny size, golden crown stripe and restless feeding in conifers",
      level: "featherweight"
    },
    zniczek: {
      name: "Firecrest",
      hook: "A goldcrest relative with a fiery crown and a sharper, more contrasting face pattern.",
      quiz_angle: "small size, bright crown, white eyebrow and dark eye stripe",
      level: "spark in needles"
    },
    puchacz: {
      name: "Eurasian Eagle-Owl",
      hook: "Europe's largest owl pairs orange eyes, ear tufts and a deep nocturnal call.",
      quiz_angle: "massive size, orange eyes, feather tufts and resonant hooting",
      level: "night giant"
    },
    "jerzyk-zwyczajny": {
      name: "Common Swift",
      hook: "A nearly aerial bird that feeds, drinks, mates and even sleeps on the wing outside the breeding season.",
      quiz_angle: "sickle wings, tiny feet, screaming summer flight and nesting in buildings",
      level: "air bird"
    },
    "sokol-wedrowny": {
      name: "Peregrine Falcon",
      hook: "The fastest hunting bird turns its body into a controlled missile during a stoop.",
      quiz_angle: "diving speed, black moustache mark and aerial hunting",
      level: "living projectile"
    },
    szlamnik: {
      name: "Bar-tailed Godwit",
      hook: "A shorebird built for astonishing non-stop migration over enormous distances.",
      quiz_angle: "long bill, shorebird shape and marathon flights",
      level: "sky marathoner"
    },
    dubelt: {
      name: "Great Snipe",
      hook: "A secretive wetland bird that combines lekking meadows with remarkable migration speed.",
      quiz_angle: "cryptic plumage, wet meadow leks and fast long-distance travel",
      level: "wetland sprinter"
    },
    "slonka-zwyczajna": {
      name: "Eurasian Woodcock",
      hook: "A leaf-colored forest bird whose white feather patches can act like natural reflectors at dusk.",
      quiz_angle: "camouflage, roding flights and unusually reflective white feathers",
      level: "forest reflector"
    },
    uszatka: {
      name: "Long-eared Owl",
      hook: "A slim owl whose fresh feathers can glow pinkish under ultraviolet light.",
      quiz_angle: "ear tufts, orange eyes, winter roosts and feather porphyrins",
      level: "UV glow"
    },
    "puszczyk-zwyczajny": {
      name: "Tawny Owl",
      hook: "A black-eyed woodland owl whose voice became one of Europe's classic night sounds.",
      quiz_angle: "dark eyes, round head, silent flight and familiar hooting",
      level: "night voice"
    },
    pustulka: {
      name: "Common Kestrel",
      hook: "A hovering falcon that can use ultraviolet clues when searching for vole activity.",
      quiz_angle: "hovering, rusty back, long tail and UV-assisted hunting",
      level: "UV detector"
    },
    dudek: {
      name: "Eurasian Hoopoe",
      hook: "A spectacular crested bird whose nesting family can defend itself with a foul-smelling secretion.",
      quiz_angle: "crest, black-and-white wings, up-up-up call and chemical nest defense",
      level: "scent shield"
    },
    "nawalnik-duzy": {
      name: "Leach's Storm Petrel",
      hook: "A rare oceanic visitor whose world of scent and night feels far more Atlantic than Baltic.",
      quiz_angle: "tiny seabird, tube-like nostrils, musky smell and rarity in Poland",
      level: "musky visitor"
    },
    remiz: {
      name: "European Penduline Tit",
      hook: "A masked little bird that weaves a hanging nest like a soft pouch or mitten.",
      quiz_angle: "black mask, riverside shrubs and a nest woven from plant down",
      level: "waterside weaver"
    },
    zimorodek: {
      name: "Common Kingfisher",
      hook: "A blue flash over the river that nests not in a tree, but in a tunnel dug into a bank.",
      quiz_angle: "turquoise back, orange belly, bank tunnel and plunge-diving",
      level: "river jewel"
    },
    zolna: {
      name: "European Bee-eater",
      hook: "Poland's most tropical-looking bird nests in sandy banks and specializes in stinging insects.",
      quiz_angle: "bright colors, bank burrows and bee-handling behavior",
      level: "ravine parrot"
    },
    brzegowka: {
      name: "Sand Martin",
      hook: "A small swallow that turns river cliffs into crowded apartment blocks of tunnels.",
      quiz_angle: "colonial burrows, brown breast band and low flight over water",
      level: "tunnel colony"
    },
    dymowka: {
      name: "Barn Swallow",
      hook: "A mud-building swallow that mixes soil with saliva and nests under human roofs.",
      quiz_angle: "forked tail, red throat and mud cup nest in buildings",
      level: "mud mason"
    },
    srokosz: {
      name: "Great Grey Shrike",
      hook: "A songbird predator that stores prey by impaling it on thorns or wire.",
      quiz_angle: "black mask, hooked bill and prey caches on sharp points",
      level: "butcher bird"
    },
    kukulka: {
      name: "Common Cuckoo",
      hook: "A brood parasite that lays its eggs in other birds' nests and leaves parenting to hosts.",
      quiz_angle: "famous call, slim shape and egg-laying in host nests",
      level: "social engineer"
    },
    "krzyzodziob-swierkowy": {
      name: "Red Crossbill",
      hook: "Its crossed bill looks odd until you see it work as a tool for opening cones.",
      quiz_angle: "crossed bill tips, cone feeding and red males",
      level: "living pliers"
    },
    gluszec: {
      name: "Western Capercaillie",
      hook: "A large forest grouse whose display song includes a trance-like phase behind the old 'deaf' reputation.",
      quiz_angle: "large male, fanned tail, lek site and display song sequence",
      level: "lek trance"
    },
    "lelek-kozodoj": {
      name: "European Nightjar",
      hook: "A nocturnal insect hunter with a huge mouth and a folklore reputation it never deserved.",
      quiz_angle: "churring call, wide gape, bristles and night hunting over open woodland",
      level: "night myth"
    },
    szablodziob: {
      name: "Pied Avocet",
      hook: "An elegant wader with an upcurved bill that sweeps through shallow mud like a sensitive probe.",
      quiz_angle: "black-and-white pattern, blue legs and upturned bill",
      level: "sabre in mud"
    },
    pluszcz: {
      name: "White-throated Dipper",
      hook: "A songbird that dives and walks along the bottom of fast mountain streams.",
      quiz_angle: "white bib, bobbing posture and underwater feeding in current",
      level: "underwater walker"
    },
    pomurnik: {
      name: "Wallcreeper",
      hook: "A grey cliff climber that suddenly flashes red wings against mountain rock.",
      quiz_angle: "vertical rock movement, crimson wing panels and thin curved bill",
      level: "Tatras butterfly"
    },
    wodniczka: {
      name: "Aquatic Warbler",
      hook: "A globally threatened sedge-bed singer for which Polish wetlands are crucial refuges.",
      quiz_angle: "crown stripe, sedge habitat and dependence on intact fens",
      level: "fen voice"
    },
    "puszczyk-mszarny": {
      name: "Great Grey Owl",
      hook: "A huge pale owl of northern forests, rare in Poland and tied to wet woodland landscapes.",
      quiz_angle: "massive facial disc, pale eyes and wet forest edge habitat",
      level: "taiga owl"
    },
    "czajka-stepowa": {
      name: "Sociable Lapwing",
      hook: "An extremely rare eastern visitor that can turn an ordinary field into a birding event.",
      quiz_angle: "steppe origin, pale eyebrow and rarity status",
      level: "steppe alert"
    },
    "cyranka-modroskrzydla": {
      name: "Blue-winged Teal",
      hook: "An American duck whose blue wing patch can make a Polish wetland suddenly feel transatlantic.",
      quiz_angle: "blue wing panel, American origin and vagrant status",
      level: "blue visitor"
    },
    "mewa-delawarska": {
      name: "Ring-billed Gull",
      hook: "A North American gull picked out among similar birds by the dark ring on its bill.",
      quiz_angle: "bill ring, gull similarity and rare-vagrant context",
      level: "American bill ring"
    }
  };

  const mineralText = {
    nioboholtit: { name: "Nioboholtite" },
    zabinskiit: { name: "Żabińskiite" },
    taliomelan: { name: "Thalliomelane" },
    heflikit: { name: "Heflikite" },
    skandiowinchit: { name: "Scandio-winchite" },
    "berylokordieryt-na": { name: "Beryllocordierite-Na" },
    "berylosachanbinskiit-na": { name: "Beryllosachanbińskiite-Na" },
    magnesiodutrowit: { name: "Magnesio-dutrowite" },
    "krzemien-pasiasty": { name: "Striped flint" },
    "bursztyn-baltycki": { name: "Baltic amber" },
    "siarka-rodzima-tarnobrzeg": { name: "Native sulfur from Tarnobrzeg" },
    "haueryt-machow-jeziorko": { name: "Hauerite from Machów and Jeziórko" },
    "celestyn-machow": { name: "Celestine from Machów" },
    "baryt-machow": { name: "Baryte from Machów" },
    "aragonit-machow": { name: "Aragonite from Machów" },
    "kalcyt-siarkowy": { name: "Calcite from sulfur deposits" },
    "halit-wieliczka": { name: "Halite from the Crystal Caves" },
    "gips-wtorny-jeziorko": { name: "Secondary gypsum from sulfur zones" },
    "stroncjanit-tarnobrzeg": { name: "Strontianite from the sulfur assemblage" },
    "agat-gwiazdzisty-nowy-kosciol": { name: "Star-like agate from Nowy Kościół" },
    "kwarc-dymny-strzegom": { name: "Smoky quartz from Strzegom" },
    "topaz-strzegom": { name: "Topaz from Strzegom pegmatites" },
    "beryl-strzegom": { name: "Beryl from Strzegom" },
    "turmalin-strzegom": { name: "Tourmaline from Strzegom" },
    "fluoryt-kowary": { name: "Fluorite from Kowary" },
    "chryzokola-miedzianka": { name: "Chrysocolla from Miedzianka" },
    "malachit-miedzianka": { name: "Malachite from Miedzianka" },
    "azuryt-miedzianka": { name: "Azurite from Miedzianka" },
    "kupryt-miedzianka": { name: "Cuprite from Miedzianka" },
    "uraninit-kowary": { name: "Uraninite from Kowary" },
    "galena-olkusz": { name: "Galena from the Olkusz region" },
    "sfaleryt-olkusz": { name: "Sphalerite from the Olkusz region" },
    "whewellit-weglowy": { name: "Whewellite from coal measures" }
  };

  const rockFormationText = {
    slonecznik: { name: "Słonecznik rock" },
    pielgrzymy: { name: "Pielgrzymy granite towers" },
    "dziurawa-skala": { name: "Dziurawa Skała rock window" },
    "trzy-swinki": { name: "Three Little Pigs rocks" },
    chojnik: { name: "Chojnik rocks" },
    "male-organy-mysliborskie": { name: "Little Myślibórz Organs" },
    "organy-wielislawskie": { name: "Wielisław Organs" },
    "kolorowe-jeziorka": { name: "Colourful Lakes" },
    "szczeliniec-wielki": { name: "Szczeliniec Wielki" },
    "bledne-skaly": { name: "Błędne Skały labyrinth" },
    "biale-skaly": { name: "Białe Skały" },
    "skalne-grzyby": { name: "Rock Mushrooms" },
    "czartowskie-skaly": { name: "Czartowskie Rocks" },
    "skalna-czaszka": { name: "Skalna Czaszka" },
    "radkowskie-skaly": { name: "Radkowskie Rocks" },
    "diabelska-maczuga-gorzeszow": { name: "Devil's Club of Gorzeszów" },
    "maczuga-herkulesa": { name: "Hercules' Club" },
    "brama-krakowska": { name: "Kraków Gate" },
    "brama-bolechowicka": { name: "Bolechowice Gate" },
    "okiennik-wielki": { name: "Great Rock Window" },
    "skala-milosci-mstow": { name: "Love Rock in Mstów" },
    "gora-zborow": { name: "Góra Zborów" },
    giewont: { name: "Giewont" },
    "przelom-bialki": { name: "Białka River Gorge" },
    przadki: { name: "Prządki rocks" },
    "skamieniale-miasto": { name: "Petrified City" },
    "diable-skaly-bukowiec": { name: "Devil's Rocks in Bukowiec" },
    "zezow-czarne-dzialy": { name: "Zęzów and Czarne Działy" },
    "skalki-pieklo-nieklan": { name: "Piekło Rocks near Niekłań" },
    kadzielnia: { name: "Kadzielnia" },
    krzemionki: { name: "Krzemionki" },
    "glaz-tryglaw": { name: "Trygław erratic boulder" },
    "groty-mechowskie": { name: "Mechowo Caves" }
  };

  const fossilText = {
    "trylobity-kambryjskie-gor-swietokrzyskich": { name: "Cambrian trilobites of the Świętokrzyskie Mountains" },
    "rafy-dewonskie-kadzielni": { name: "Devonian reefs of Kadzielnia" },
    "wczesna-flora-ladowa-dewonu": { name: "Early Devonian land flora" },
    "alienacanthus-malkowskii": { name: "Alienacanthus malkowskii" },
    "tropy-tetrapodow-z-zachelmia": { name: "Zachełmie tetrapod tracks" },
    "karbonskie-lasy-weglowe": { name: "Carboniferous coal forests" },
    "smok-wawelski-lisowice": { name: "Smok wawelski" },
    "lisowicia-bojani": { name: "Lisowicia bojani" },
    "proterochersis-robusta": { name: "Proterochersis robusta" },
    "tholodus-schmidi": { name: "Tholodus schmidi" },
    "encrinus-liliiformis": { name: "Encrinus liliiformis" },
    "tropy-dinozaurow-gor-swietokrzyskich": { name: "Dinosaur tracks of the Świętokrzyskie Mountains" },
    "tropy-dinozaurow-baltow": { name: "Dinosaur tracks from Bałtów" },
    "tropy-dinozaurow-borkowice": { name: "Dinosaur tracks from Borkowice" },
    "pliozaury-z-krzyzanowic": { name: "Pliosaurs from Krzyżanowice near Iłża" },
    "plezjozaury-annopola": { name: "Plesiosaurs of Annopol" },
    "krokodylomorfy-owadowa": { name: "Crocodylomorphs from Owadów-Brzezinki" },
    "limulus-darwini-owadow": { name: "Limulus darwini from Owadów-Brzezinki" },
    "ctenochasma-owadow": { name: "Pterosaurs from Owadów-Brzezinki" },
    "laguna-owadow-brzezinki": { name: "Owadów-Brzezinki lagoon" },
    "amonity-jurajskie-polski": { name: "Jurassic ammonites of Poland" },
    "pachydesmoceras-z-opola": { name: "Giant ammonites from Opole" },
    "belemnity-polskich-morz": { name: "Belemnites of Polish Mesozoic seas" },
    "inkluzje-owadow-w-bursztynie": { name: "Insect inclusions in amber" },
    "ptasznik-w-bursztynie-baltyckim": { name: "Spider in Baltic amber" },
    "chwytowka-w-bursztynie": { name: "Grasping insect in amber" },
    "jantarogekko-balticus": { name: "Jantarogekko balticus" },
    "oligocenskie-ptaki-polski": { name: "Oligocene birds of Poland" },
    "skamieniale-drewna-roztocza": { name: "Petrified woods of Roztocze" },
    "mamuty-z-okolic-konina": { name: "Mammoths from the Konin area" },
    "nosorozec-wlochaty-polski": { name: "Woolly rhinoceros of Poland" },
    "krakow-spadzista-lowcy-mamutow": { name: "Kraków-Spadzista mammoth hunters" },
    "niedzwiedzie-jaskiniowe-kletna": { name: "Cave bears of Kletno" }
  };

  const mammalText = {
    "ryjowka-malutka": { name: "Eurasian pygmy shrew" },
    "ryjowka-aksamitna": { name: "Common shrew" },
    "ryjowka-srednia": { name: "Laxmann's shrew" },
    "ryjowka-gorska": { name: "Alpine shrew" },
    "rzesorek-rzeczek": { name: "Eurasian water shrew" },
    "rzesorek-mniejszy": { name: "Mediterranean water shrew" },
    "kret-europejski": { name: "European mole" },
    "nocek-duzy": { name: "Greater mouse-eared bat" },
    "nocek-rudy": { name: "Daubenton's bat" },
    "nocek-lydkowlosy": { name: "Pond bat" },
    "nocek-bechsteina": { name: "Bechstein's bat" },
    "nocek-natterera": { name: "Natterer's bat" },
    "nocek-wasatek": { name: "Whiskered bat" },
    "susel-perelkowany": { name: "Speckled ground squirrel" },
    "chomik-europejski": { name: "European hamster" },
    "popielica-szara": { name: "Edible dormouse" },
    orzesznica: { name: "Hazel dormouse" },
    "koszatka-lesna": { name: "Forest dormouse" },
    "zolednica-europejska": { name: "Garden dormouse" },
    "swistak-tatrzanski": { name: "Tatra marmot" },
    "bobr-europejski": { name: "Eurasian beaver" },
    pizmak: { name: "Muskrat" },
    "zubr-europejski": { name: "European bison" },
    "kozica-tatrzanska": { name: "Tatra chamois" },
    jenot: { name: "Raccoon dog" },
    "norka-amerykanska": { name: "American mink" },
    "szop-pracz": { name: "Raccoon" },
    "szakal-zlocisty": { name: "Golden jackal" },
    lasica: { name: "Least weasel" },
    gronostaj: { name: "Stoat" },
    "zajac-bielak": { name: "Mountain hare" },
    "foka-szara": { name: "Grey seal" },
    "morswin-zwyczajny": { name: "Harbour porpoise" }
  };

  const amphibianReptileText = {
    "zaba-moczarowa": { name: "Moor frog" },
    "grzebiuszka-ziemna": { name: "Common spadefoot" },
    "kumak-nizinny": { name: "Fire-bellied toad" },
    "kumak-gorski": { name: "Yellow-bellied toad" },
    "salamandra-plamista": { name: "Fire salamander" },
    "ropucha-szara": { name: "Common toad" },
    "traszka-grzebieniasta": { name: "Great crested newt" },
    "traszka-zwyczajna": { name: "Smooth newt" },
    "traszka-karpacka": { name: "Carpathian newt" },
    "traszka-gorska": { name: "Alpine newt" },
    "ropucha-paskowka": { name: "Natterjack toad" },
    "ropucha-zielona": { name: "European green toad" },
    "rzekotka-drzewna": { name: "European tree frog" },
    "rzekotka-wschodnia": { name: "Eastern tree frog" },
    "zaba-trawna": { name: "Common frog" },
    "zaba-zwinka": { name: "Agile frog" },
    "zaba-jeziorkowa": { name: "Pool frog" },
    "zaba-wodna": { name: "Edible frog" },
    "zaba-smieszka": { name: "Marsh frog" },
    "zolw-blotny": { name: "European pond turtle" },
    "zolw-ozdobny": { name: "Pond slider" },
    "padalec-zwyczajny": { name: "Slow worm" },
    "padalec-kolchidzki": { name: "Eastern slow worm" },
    "jaszczurka-zwinka": { name: "Sand lizard" },
    "jaszczurka-zyworodna": { name: "Viviparous lizard" },
    "zaskroniec-zwyczajny": { name: "Grass snake" },
    "zaskroniec-rybolow": { name: "Dice snake" },
    "gniewosz-plamisty": { name: "Smooth snake" },
    "waz-eskulapa": { name: "Aesculapian snake" },
    "zmija-zygzakowata": { name: "Common European adder" }
  };

  const woodenArchitectureText = {
    "kosciol-pokoju-swidnica": { name: "Peace Church in Świdnica" },
    "kosciol-pokoju-jawor": { name: "Peace Church in Jawor" },
    "debno-podhalanskie": { name: "St. Michael the Archangel Church in Dębno Podhalańskie" },
    binarowa: { name: "St. Michael the Archangel Church in Binarowa" },
    sekowa: { name: "Sts. Philip and James Church in Sękowa" },
    "lipnica-murowana": { name: "St. Leonard's Church in Lipnica Murowana" },
    haczow: { name: "Church of the Assumption and St. Michael in Haczów" },
    blizne: { name: "All Saints Church in Blizne" },
    kwiaton: { name: "St. Paraskevi Tserkva in Kwiatoń" },
    powroznik: { name: "St. James Tserkva in Powroźnik" },
    owczary: { name: "Protection of the Mother of God Tserkva in Owczary" },
    "brunary-wyzne": { name: "St. Michael the Archangel Tserkva in Brunary Wyżne" },
    chotyniec: { name: "Nativity of the Mother of God Tserkva in Chotyniec" },
    radruz: { name: "St. Paraskevi Tserkva in Radruż" },
    smolnik: { name: "St. Michael the Archangel Tserkva in Smolnik" },
    turzansk: { name: "St. Michael the Archangel Tserkva in Turzańsk" },
    "swiatynia-wang": { name: "Wang Church" },
    jaszczurowka: { name: "Sacred Heart Chapel in Jaszczurówka" },
    "willa-koliba": { name: "Koliba Villa" },
    chocholow: { name: "Wooden village buildings of Chochołów" },
    orawka: { name: "St. John the Baptist Church in Orawka" },
    szalowa: { name: "St. Michael the Archangel Church in Szalowa" },
    grywalt: { name: "St. Martin's Church in Grywałd" },
    lopuszna: { name: "Holy Trinity and St. Anthony the Abbot Church in Łopuszna" },
    kruszyniany: { name: "Tatar mosque in Kruszyniany" },
    bohoniki: { name: "Tatar mosque in Bohoniki" },
    "kraina-otwartych-okiennic": { name: "Land of Open Shutters" },
    "domy-podcieniowe-zulawy": { name: "Żuławy arcaded houses" },
    "dwor-z-drogini": { name: "Manor house from Droginia" },
    "chata-na-wysokosci": { name: "Chata na Wysokości" }
  };

  const atmosphereAstronomyText = {
    "widmo-brockenu": { name: "Brocken spectre" },
    gloria: { name: "Glory" },
    "morze-chmur-i-inwersje-gorskie": { name: "Sea of clouds and mountain inversions" },
    "ognie-swietego-elma": { name: "St. Elmo's fire" },
    "wyladowania-koronowe-na-szczytach": { name: "Corona discharges on summits" },
    "czerwone-duszki-nad-polska": { name: "Red sprites over Poland" },
    "niebieskie-strumienie": { name: "Blue jets" },
    "elves-nad-burzami": { name: "ELVES above storms" },
    "dodatnie-wyladowania-cg-plus": { name: "Positive CG+ lightning" },
    "burze-sniezne-z-wyladowaniami": { name: "Thundersnow" },
    "biale-noce-astronomiczne": { name: "Astronomical white nights" },
    "biale-noce-zeglarskie": { name: "Nautical white nights" },
    "obloki-srebrzyste": { name: "Noctilucent clouds" },
    "izerski-park-ciemnego-nieba": { name: "Izera Dark-Sky Park" },
    "bieszczadzki-park-gwiezdnego-nieba": { name: "Bieszczady Starry-Sky Park" },
    "sopotnia-wielka-ciemne-niebo": { name: "Sopotnia Wielka and smart dark-sky lighting" },
    "droga-mleczna-nad-polska": { name: "The Milky Way over Poland" },
    "zorze-polarne-nad-polska": { name: "Auroras over Poland" },
    perseidy: { name: "Perseids" },
    geminidy: { name: "Geminids" },
    "miraz-gorny-nad-baltykiem": { name: "Superior mirage over the Baltic" },
    "fata-morgana-latajace-statki": { name: "Fata Morgana and flying ships" },
    "baltycki-efekt-morza": { name: "Baltic sea-effect snow" },
    "tatry-z-wyzyny-lubelskiej": { name: "The Tatras seen from the Lublin Upland" },
    "rekord-godziszow-zadni-gerlach": { name: "Godziszów and Zadni Gerlach" },
    "atmosfera-jako-soczewka": { name: "The atmosphere as a lens" },
    "hala-izerska-mala-syberia": { name: "Hala Izerska, the little Siberia" },
    "litworowy-kociol": { name: "Litworowy Kocioł" },
    "puscizna-rekowianska": { name: "Puścizna Rękowiańska" },
    "siedlce-rekord-mrozu": { name: "Siedlce and the official cold record" },
    "pyl-saharyjski-nad-polska": { name: "Saharan dust over Poland" },
    "brudny-deszcz": { name: "Dust rain" },
    "czerwony-snieg-w-gorach": { name: "Red snow in the mountains" }
  };

  const fortressRuinText = {
    zamosc: {
      name: "Zamość",
      hook: "A Renaissance ideal city designed as one urban organism of market square, residence and defenses.",
      quiz_angle: "remember the planned layout, UNESCO status and the idea of a city shaped like a designed body"
    },
    "zamek-krzyztopor": {
      name: "Krzyżtopór Castle",
      hook: "A palace-fortress whose calendar symbolism turned architecture into a legend of numbers.",
      quiz_angle: "recognize the bastions, ruined residence and the famous story of towers, rooms and windows"
    },
    "zamek-malbork": {
      name: "Malbork Castle",
      hook: "A vast brick stronghold that worked as fortress, monastery, warehouse and Teutonic capital.",
      quiz_angle: "recognize the brick Gothic scale, the Nogat setting and the UNESCO Teutonic castle complex"
    },
    "twierdza-srebrna-gora": {
      name: "Srebrna Góra Fortress",
      hook: "A mountain fortress built to endure siege like a self-contained town.",
      quiz_angle: "remember the donjon, casemates, Sudeten ridge and Prussian fortress engineering"
    },
    "zamek-ksiaz": {
      name: "Książ Castle",
      hook: "A grand residence above a valley, with wartime tunnels adding a darker lower layer.",
      quiz_angle: "recognize the terraces, monumental residence, Riese context and contrast between palace and underground"
    },
    "zamek-ogrodzieniec": {
      name: "Ogrodzieniec Castle",
      hook: "A Jurassic ruin fused with limestone rock, as if the hill itself became architecture.",
      quiz_angle: "remember the Eagles' Nests, limestone outcrops and the ruin growing out of the rock"
    },
    "zamek-moszna": {
      name: "Moszna Castle",
      hook: "An eclectic residence whose towers make it look like architectural fantasy made solid.",
      quiz_angle: "recognize the towered silhouette, eclectic form and theatrical palace character"
    },
    "zamek-lancut": {
      name: "Łańcut Castle",
      hook: "A preserved aristocratic residence where interiors, park and carriage house still tell one story.",
      quiz_angle: "remember the interiors, park, carriage collection and magnate residence context"
    },
    "zamek-krasiczyn": {
      name: "Krasiczyn Castle",
      hook: "A Renaissance residence whose towers and sgraffito turn the facade into a family program.",
      quiz_angle: "recognize the four symbolic towers, courtyard and sgraffito decoration"
    },
    "zamek-baranow-sandomierski": {
      name: "Baranów Sandomierski Castle",
      hook: "A compact Renaissance residence remembered for harmony, arcades and the 'Little Wawel' nickname.",
      quiz_angle: "remember the courtyard, arcades, Renaissance proportions and Little Wawel comparison"
    },
    "zamek-janowiec": {
      name: "Janowiec Castle",
      hook: "A large ruin above the Vistula that reveals ambition precisely because so much is missing.",
      quiz_angle: "recognize the Vistula setting, monumental outline and the scale of a former residence"
    },
    "zamek-czocha": {
      name: "Czocha Castle",
      hook: "A lakeside castle where documented history and secret-passage legends have to be kept separate.",
      quiz_angle: "remember the Kwisa setting, rebuilt residence and the need to separate legend from evidence"
    },
    "zamek-bolkow": {
      name: "Bolków Castle",
      hook: "A defensive castle whose pointed tower looks like a stone beak facing attack.",
      quiz_angle: "recognize the beak-shaped tower, Piast Silesian context and compact defensive plan"
    },
    "zamek-chojnik": {
      name: "Chojnik Castle",
      hook: "A mountain ruin where the steep approach is as memorable as the walls.",
      quiz_angle: "remember Chojnik Hill, Karkonosze setting and the legend of Kunegunda"
    },
    "zamek-niedzica": {
      name: "Niedzica Castle",
      hook: "A border castle above the Dunajec where landscape, water and treasure legends cluster tightly.",
      quiz_angle: "recognize the Pieniny setting, former borderland, lake view and Inca treasure legend"
    },
    "zamek-czorsztyn": {
      name: "Czorsztyn Castle Ruins",
      hook: "A ruin that gains meaning by facing Niedzica across water.",
      quiz_angle: "remember the pair of castles, Dunajec landscape and Lake Czorsztyn setting"
    },
    "zamek-pieskowa-skala": {
      name: "Pieskowa Skała Castle",
      hook: "A Renaissance castle whose stage set is completed by the Hercules' Club limestone stack.",
      quiz_angle: "recognize the Ojców landscape, arcade courtyard and the rock standing nearby"
    },
    "zamki-mirow-bobolice": {
      name: "Mirów and Bobolice Castles",
      hook: "Two Jurassic strongholds show the tension between ruin, reconstruction and landscape memory.",
      quiz_angle: "remember the paired castles, Eagles' Nests route and contrast between ruin and reconstruction"
    },
    "zamek-tenczyn-rudno": {
      name: "Tenczyn Castle in Rudno",
      hook: "A castle ruin on a hill shaped by much older volcanic history.",
      quiz_angle: "recognize the Tenczyn ridge, ruined residence and volcanic-geological background"
    },
    "mysia-wieza-kruszwica": {
      name: "Mouse Tower in Kruszwica",
      hook: "One surviving tower carries one of Poland's best-known foundation legends.",
      quiz_angle: "remember Lake Gopło, Popiel's legend and the power of a single surviving tower"
    },
    "zamek-bedzin": {
      name: "Będzin Castle",
      hook: "A compact border stronghold that marked movement between historical lands.",
      quiz_angle: "recognize the hilltop castle, tower, former border function and route control"
    },
    "twierdza-modlin": {
      name: "Modlin Fortress",
      hook: "A huge fortress landscape where rivers, barracks and fort rings work together.",
      quiz_angle: "remember the Vistula-Narew junction, long barracks and sprawling military system"
    },
    "twierdza-klodzko": {
      name: "Kłodzko Fortress",
      hook: "A fortress that defended not only above the town, but also through underground passages.",
      quiz_angle: "recognize bastions, counter-mine corridors and the layered defense above Kłodzko"
    },
    "twierdza-przemysl": {
      name: "Przemyśl Fortress",
      hook: "A whole city encircled by forts from the Austro-Hungarian military landscape.",
      quiz_angle: "remember the ring forts, First World War context and system-wide scale"
    },
    "twierdza-boyen": {
      name: "Boyen Fortress",
      hook: "A fortress placed like a stone plug in the strategic throat of the Masurian lakes.",
      quiz_angle: "recognize Giżycko, the lake isthmus, gates and star-like fortress plan"
    },
    "twierdza-osowiec": {
      name: "Osowiec Fortress",
      hook: "A fortress whose defenses included not only walls, but also the Biebrza marshes.",
      quiz_angle: "remember the marshland setting, forts and the defensive value of difficult terrain"
    },
    "wilczy-szaniec": {
      name: "Wolf's Lair",
      hook: "Forest-covered concrete ruins that demand historical calm rather than sensationalism.",
      quiz_angle: "recognize Gierłoż, camouflage, massive bunkers and the July 20 assassination attempt context"
    },
    westerplatte: {
      name: "Westerplatte",
      hook: "A small peninsula carrying an outsized memory of the beginning of the Second World War.",
      quiz_angle: "remember the military transit depot, guardhouses and memorial landscape"
    },
    "wiadukty-stanczyki": {
      name: "Stańczyki Viaducts",
      hook: "Monumental railway arches often compared to northern aqueducts, though trains no longer use them.",
      quiz_angle: "recognize the unused railway line, paired arches and scale in the Romincka Forest landscape"
    },
    "wiadukty-kiepojcie": {
      name: "Kiepojcie Viaducts",
      hook: "A quieter sibling of Stańczyki: monumental railway engineering without the same fame.",
      quiz_angle: "remember the paired viaducts, former railway line and the Bludzia valley"
    },
    "palac-kopice": {
      name: "Kopice Palace",
      hook: "A ghostly palace ruin that teaches how easily a residence can become a warning about neglect.",
      quiz_angle: "recognize the Schaffgotsch residence, ruined neo-Gothic silhouette and conservation problem"
    },
    "palac-slobity": {
      name: "Słobity Palace",
      hook: "A former East Prussian aristocratic giant now read mostly through walls and absence.",
      quiz_angle: "remember the scale, East Prussian residence context and postwar ruin"
    },
    "zamek-lapalice": {
      name: "Łapalice Castle",
      hook: "Not a historic castle, but a modern unfinished structure that became a local legend.",
      quiz_angle: "recognize the contemporary unfinished building, private-access caution and unusual status"
    }
  };

  const mementoMoriText = {
    "kaplica-czaszek-czermna": {
      name: "Skull Chapel in Czermna",
      hook: "A small Baroque chapel where an ossuary speaks quietly about mortality.",
      quiz_angle: "remember the ossuary, Silesian wars, epidemics and memento mori symbolism"
    },
    "stare-powazki": {
      name: "Old Powązki Cemetery",
      hook: "A Warsaw necropolis that reads like an encyclopedia of national memory.",
      quiz_angle: "recognize the Avenue of Merit, funerary sculpture and the biographies gathered in one cemetery"
    },
    "cmentarz-rakowicki": {
      name: "Rakowicki Cemetery",
      hook: "A Kraków cemetery where art, city history and civic memory meet in stone.",
      quiz_angle: "remember Kraków, historic tombs, sculptural detail and the cemetery as a city archive"
    },
    "peksowy-brzyzek": {
      name: "Pęksowy Brzyzek Cemetery",
      hook: "A mountain necropolis where Zakopane style gives memory a local wooden language.",
      quiz_angle: "recognize Podhale, carved crosses, artists' graves and the Zakopane cultural landscape"
    },
    "cmentarz-zydowski-okopowa": {
      name: "Okopowa Street Jewish Cemetery in Warsaw",
      hook: "A vast Jewish cemetery whose matzevot preserve family, language and Warsaw history.",
      quiz_angle: "remember the scale, Hebrew and Polish inscriptions, symbolic reliefs and Jewish Warsaw"
    },
    "nowy-cmentarz-zydowski-lodz": {
      name: "New Jewish Cemetery in Łódź",
      hook: "One of Europe's largest Jewish cemeteries, shaped by industrial Łódź and its communities.",
      quiz_angle: "recognize the Łódź scale, industrial-era mausolea and the Ghetto Field"
    },
    "cmentarz-remuh": {
      name: "Remuh Cemetery",
      hook: "A compact Kraków cemetery that concentrates centuries of Jewish memory in Kazimierz.",
      quiz_angle: "remember Kazimierz, Renaissance-period matzevot, Rabbi Moses Isserles and lapidarium walls"
    },
    "mizar-kruszyniany": {
      name: "Kruszyniany Mizar",
      hook: "A Tatar Muslim cemetery where wooden village, mosque and burial ground explain one borderland story.",
      quiz_angle: "recognize Tatar heritage, crescent symbols, Podlasie and the Muslim cemetery tradition"
    },
    "mizar-bohoniki": {
      name: "Bohoniki Mizar",
      hook: "A quiet Podlasie mizar that keeps the memory of Polish-Lithuanian Tatars visible.",
      quiz_angle: "remember Bohoniki, Tatar settlement, Islamic grave forms and borderland continuity"
    },
    "cmentarz-mennonicki-stogi": {
      name: "Mennonite Cemetery in Stogi Malborskie",
      hook: "A Żuławy cemetery where Mennonite stelae point to migration, drainage and delta communities.",
      quiz_angle: "recognize Mennonite heritage, Żuławy, old grave stelae and the Vistula delta landscape"
    },
    "cmentarz-wojenny-luzna-pustki": {
      name: "War Cemetery No. 123 Łużna-Pustki",
      hook: "A First World War cemetery where forest, crosses and designed order shape remembrance.",
      quiz_angle: "remember Gorlice campaign context, wooden crosses, cemetery design and the Pustki hill"
    },
    "cmentarz-wojenny-magura-malastowska": {
      name: "War Cemetery No. 60 Magura Małastowska",
      hook: "A Beskid war cemetery whose form is inseparable from pass, forest and First World War front.",
      quiz_angle: "recognize the Małastowska Pass, Austro-Hungarian cemetery system and mountain setting"
    },
    "rotunda-zamojska": {
      name: "Zamość Rotunda",
      hook: "A former defensive structure turned memorial, carrying the memory of wartime imprisonment and executions.",
      quiz_angle: "remember Zamość, the rotunda form, German occupation and martyrdom memorial function"
    },
    palmiry: {
      name: "Palmiry",
      hook: "A forest cemetery and memorial landscape for people murdered near Warsaw during the German occupation.",
      quiz_angle: "recognize Kampinos Forest, mass executions, cemetery rows and documentary museum context"
    },
    "auschwitz-birkenau": {
      name: "Auschwitz-Birkenau",
      hook: "A preserved former German Nazi concentration and extermination camp, central to Holocaust education.",
      quiz_angle: "remember the Auschwitz and Birkenau sites, preserved evidence, UNESCO status and survivor testimony"
    },
    majdanek: {
      name: "Majdanek State Museum",
      hook: "A former German Nazi camp whose preserved fields and museum work keep evidence readable.",
      quiz_angle: "recognize Lublin, barracks, the memorial dome and the role of a state museum"
    },
    belzec: {
      name: "Bełżec Memorial and Museum",
      hook: "A memorial whose austere architecture marks the site of a German Nazi extermination camp.",
      quiz_angle: "remember Operation Reinhardt, the memorial path, names and the restrained museum language"
    },
    sobibor: {
      name: "Sobibór Memorial and Museum",
      hook: "A memorial site where archaeology, documentation and museum design protect the memory of victims.",
      quiz_angle: "recognize Operation Reinhardt, the prisoners' uprising, archaeological traces and memorial reconstruction"
    },
    "kulmhof-chelmno": {
      name: "Kulmhof Extermination Center",
      hook: "A memorial to the first German Nazi extermination center on occupied Polish lands.",
      quiz_angle: "remember Chełmno nad Nerem, gas vans, forest graves and early Holocaust chronology"
    },
    treblinka: {
      name: "Treblinka",
      hook: "A memorial landscape where stones, paths and names stand in for a destroyed extermination camp.",
      quiz_angle: "recognize Operation Reinhardt, the stone field, symbolic station and memorial architecture"
    },
    piasnica: {
      name: "Piaśnica",
      hook: "A forest memorial for mass executions in Pomerania at the beginning of the Second World War.",
      quiz_angle: "remember the Pomeranian forest, early occupation crimes, graves and regional memory"
    },
    michniow: {
      name: "Mauzoleum of Martyrology of Polish Villages in Michniów",
      hook: "A memorial to pacified villages, using architecture to speak about civilian suffering.",
      quiz_angle: "recognize Michniów, village pacification, memorial architecture and Polish rural martyrdom"
    },
    "grob-nieznanego-zolnierza": {
      name: "Tomb of the Unknown Soldier in Warsaw",
      hook: "A central state memorial that turns an architectural fragment into a national ritual of remembrance.",
      quiz_angle: "remember Piłsudski Square, the Saxon Palace arcade, guard of honor and symbolic unknown soldier"
    },
    "kopiec-powstania-warszawskiego": {
      name: "Warsaw Uprising Mound",
      hook: "A mound built from the rubble of Warsaw, linking ruined material with civic memory.",
      quiz_angle: "recognize the uprising symbol, rubble origin, anchor sign and Warsaw's postwar landscape"
    },
    "westerplatte-cmentarz": {
      name: "Westerplatte Defenders' Cemetery",
      hook: "A military cemetery on the peninsula associated with the opening of the Second World War.",
      quiz_angle: "remember Westerplatte, the Military Transit Depot, defenders' graves and coastal memorial landscape"
    },
    "kamienne-kregi-odry": {
      name: "Stone Circles in Odry",
      hook: "An archaeological cemetery where stone circles connect burial custom, landscape and interpretation.",
      quiz_angle: "recognize the Wielbark culture context, stone circles, tumuli and protected archaeological reserve"
    },
    "kamienne-kregi-wesiory": {
      name: "Stone Circles in Węsiory",
      hook: "A forested archaeological site where circles and mounds preserve a pre-medieval burial landscape.",
      quiz_angle: "remember Kashubia, stone circles, barrows and Wielbark culture interpretation"
    },
    "kopiec-krakusa": {
      name: "Krakus Mound",
      hook: "An ancient-looking mound where archaeology, legend and Kraków's skyline meet.",
      quiz_angle: "recognize the legendary ruler, mound form, Kraków panorama and uncertain chronology"
    },
    "kopiec-wandy": {
      name: "Wanda Mound",
      hook: "A Kraków mound tied to legend, landscape memory and questions that archaeology cannot fully close.",
      quiz_angle: "remember the Wanda legend, Nowa Huta setting, mound silhouette and uncertain origins"
    },
    "stary-cmentarz-zydowski-wroclaw": {
      name: "Old Jewish Cemetery in Wrocław",
      hook: "A preserved Jewish cemetery-museum where tombs, symbols and biographies show the city's multicultural past.",
      quiz_angle: "recognize Wrocław, museum status, sculptural tombs and nineteenth-century Jewish civic life"
    }
  };

  window.ATLAS_I18N = {
    defaultLanguage: "pl",
    languages: {
      pl: { label: "PL", name: "Polski" },
      en: { label: "EN", name: "English" }
    },
    ui: {
      pl: {
        documentTitle: "Atlas Osobliwości Polski",
        skipLink: "Przejdź do treści",
        heroEyebrow: "Atlas • Polska • przyroda i kultura",
        heroTitle: "Atlas Osobliwości Polski",
        heroLead: "Wybierz kolekcję i ucz się przez atlas, fiszki, quiz oraz źródła. Projekt rośnie o ssaki, płazy i gady, minerały, formacje skalne, architekturę drewnianą, podziemia, cuda inżynierii, twierdze i ruiny, Memento Mori oraz następne osobliwości.",
        quickActions: "Szybkie akcje",
        languageLabel: "Wybór języka",
        chooseCollection: "Wybierz kolekcję",
        collectionsEyebrow: "Kolekcje",
        groupEyebrow: "Sekcja",
        aboutEyebrow: "O projekcie",
        aboutTitle: "Atlas różnych osobliwości polskiej przyrody i kultury",
        aboutLeadBody: "Niezwykłe gatunki, miejsca i zjawiska Polski w jednym miejscu — z atlasem, fiszkami, quizem i jawnymi źródłami zdjęć. Projekt edukacyjny, w którym AI pomaga badać, a człowiek decyduje co trafia do publikacji.",
        aboutLeadSignature: "— Robert Oroloko",
        aboutCard1Title: "Tylko edukacja",
        aboutCard1Body: "Atlas nie służy do oznaczania gatunków w terenie, potwierdzania jadalności grzybów ani decyzji o kontakcie z dzikimi zwierzętami. To ciekawski wstęp, nie identyfikator.",
        aboutCard2Title: "AI + człowiek",
        aboutCard2Body: "Opisy startują z głębokich badań Gemini, fact-check i wybór należy do mnie. AI nie zastępuje doświadczenia — wzmacnia je.",
        aboutCard3Title: "Otwarte licencje",
        aboutCard3Body: "Zdjęcia z Wikimedia Commons z pełną atrybucją (autor, źródło, licencja, link, info o kadrowaniu). Nie kopiujemy opisów z cudzych atlasów.",
        collectionsTitle: "Wybierz atlas",
        collectionsNote: "Każdy dział ma ten sam rytm: Atlas, Nauka, Quiz i Źródła.",
        appNavLabel: "Nawigacja aplikacji",
        activeCollection: "Aktywna kolekcja",
        changeCollection: "Zmień kolekcję",
        noticePrefix: "Uwaga:",
        atlasEyebrow: "Atlas",
        atlasNote: "Kliknij kartę, żeby zobaczyć szczegóły.",
        searchLabel: "Szukaj",
        searchFallback: "Szukaj...",
        learnEyebrow: "Nauka",
        learnTitle: "Fiszki: zgadnij wpis",
        learnNote: "Najpierw zobacz ciekawostkę, potem odsłoń odpowiedź.",
        quizEyebrow: "Quiz",
        quizTitle: "10 pytań na spokojnie",
        quizNote: "Pytania są generowane z opisów i nazw aktywnej kolekcji.",
        sourcesEyebrow: "Źródła i licencje",
        sourcesTitle: "Atrybucja zdjęć",
        sourcePanelTitle: "Zasada projektu",
        sourcePanelCopy: "Nie kopiujemy opisów z cudzych atlasów. Tworzymy krótkie, własne teksty edukacyjne i używamy zdjęć wyłącznie z jasnymi licencjami.",
        sourceChecklistTitle: "Checklist zdjęcia",
        sourceChecklistItems: ["autor / właściciel praw,", "link do strony pliku,", "nazwa licencji,", "link do licencji,", "informacja, czy zdjęcie było kadrowane lub kompresowane."],
        collectionCardButton: "Otwórz atlas",
        all: "Wszystkie",
        details: "Szczegóły",
        learnItem: "Ucz się",
        regionLabel: "Region",
        habitatLabel: "Siedlisko",
        occurrenceTitle: "Występowanie w Polsce",
        levelLabel: "Poziom",
        quizAngleTitle: "Kąt quizowy",
        cautionLabel: "Uwaga",
        learnSpecies: "Ucz się tego wpisu",
        close: "Zamknij",
        imageToAdd: "zdjęcie do dodania",
        imageToAddLabel: "Zdjęcie do uzupełnienia: {name}",
        defaultCategory: "osobliwość",
        noResults: "Brak wyników. Zmień wyszukiwanie albo filtr.",
        statItems: "pozycji w kolekcji",
        statGroups: "grup ciekawostek",
        statVisible: "widocznych po filtrach",
        statPhotos: "zdjęć z atrybucją",
        flashEmpty: "Ta kolekcja nie ma jeszcze fiszek.",
        flashCounter: "Fiszka {current} / {total}",
        categoryLabel: "Kategoria",
        rememberLabel: "Warto zapamiętać",
        showAnswer: "Pokaż odpowiedź",
        hideAnswer: "Ukryj odpowiedź",
        next: "Następny",
        quizResult: "Wynik",
        quizExcellent: "Świetnie - osobliwości zaczynają wchodzić w pamięć.",
        quizRetry: "Dobra rozgrzewka. Wróć do fiszek i spróbuj ponownie.",
        again: "Jeszcze raz",
        goLearn: "Przejdź do nauki",
        questionCounter: "Pytanie {current} / {total}",
        scoreLabel: "Wynik: {score}",
        correctAnswer: "Poprawna odpowiedź",
        finishQuiz: "Zakończ quiz",
        nextQuestion: "Następne pytanie",
        restart: "Restart",
        quizHookPrompt: "Który wpis pasuje do opisu: „{hook}”?",
        quizLatinPrompt: "Jaką nazwę w atlasie ma: {latin}?",
        creditSpecies: "Wpis",
        creditFile: "Plik",
        creditAuthor: "Autor",
        creditLicense: "Licencja",
        creditSource: "Źródło",
        preview: "podgląd",
        missing: "do uzupełnienia"
      },
      en: {
        documentTitle: "Atlas of Polish Curiosities",
        skipLink: "Skip to content",
        heroEyebrow: "Atlas • Poland • nature and culture",
        heroTitle: "Atlas of Polish Curiosities",
        heroLead: "Choose a collection and learn through the atlas, flashcards, quiz and sources. The project now includes mammals, amphibians and reptiles, minerals, rock formations, wooden architecture, undergrounds, engineering wonders, fortresses and ruins, Memento Mori, and the next curiosities.",
        quickActions: "Quick actions",
        languageLabel: "Language selection",
        chooseCollection: "Choose a collection",
        collectionsEyebrow: "Collections",
        groupEyebrow: "Section",
        aboutEyebrow: "About",
        aboutTitle: "A multi-domain atlas of Poland's natural and cultural curiosities",
        aboutLeadBody: "Rare species, places and phenomena of Poland gathered in one site — with an atlas, flashcards, quiz and transparent photo credits. An educational project where AI helps research, and a human decides what gets published.",
        aboutLeadSignature: "— Robert Oroloko",
        aboutCard1Title: "Education, not identification",
        aboutCard1Body: "This atlas isn't a field guide, mushroom edibility test or decision tool for approaching wild animals. Treat it as a curious primer, not an identifier.",
        aboutCard2Title: "AI + curator",
        aboutCard2Body: "Descriptions start from Gemini deep research; fact-checking and selection are mine. AI doesn't replace experience — it amplifies it.",
        aboutCard3Title: "Open licensing",
        aboutCard3Body: "Photos from Wikimedia Commons with full attribution (author, source, license, license URL, crop and compression info). We don't copy descriptions from other atlases.",
        collectionsTitle: "Choose an atlas",
        collectionsNote: "Each section follows the same rhythm: Atlas, Learn, Quiz and Sources.",
        appNavLabel: "Application navigation",
        activeCollection: "Active collection",
        changeCollection: "Change collection",
        noticePrefix: "Note:",
        atlasEyebrow: "Atlas",
        atlasNote: "Click a card to see details.",
        searchLabel: "Search",
        searchFallback: "Search...",
        learnEyebrow: "Learn",
        learnTitle: "Flashcards: guess the entry",
        learnNote: "First read the clue, then reveal the answer.",
        quizEyebrow: "Quiz",
        quizTitle: "10 calm questions",
        quizNote: "Questions are generated from descriptions and names in the active collection.",
        sourcesEyebrow: "Sources and licenses",
        sourcesTitle: "Photo attribution",
        sourcePanelTitle: "Project rule",
        sourcePanelCopy: "We do not copy descriptions from other atlases. We write short original educational notes and use only images with clear licenses.",
        sourceChecklistTitle: "Photo checklist",
        sourceChecklistItems: ["author / rights holder,", "link to the file page,", "license name,", "license link,", "note whether the image was cropped or compressed."],
        collectionCardButton: "Open atlas",
        all: "All",
        details: "Details",
        learnItem: "Learn",
        regionLabel: "Region",
        habitatLabel: "Habitat",
        occurrenceTitle: "Occurrence in Poland",
        levelLabel: "Level",
        quizAngleTitle: "Quiz angle",
        cautionLabel: "Note",
        learnSpecies: "Learn this entry",
        close: "Close",
        imageToAdd: "photo to add",
        imageToAddLabel: "Photo to add: {name}",
        defaultCategory: "curiosity",
        noResults: "No results. Change the search phrase or filter.",
        statItems: "entries in collection",
        statGroups: "curiosity groups",
        statVisible: "visible after filters",
        statPhotos: "photos with attribution",
        flashEmpty: "This collection does not have flashcards yet.",
        flashCounter: "Flashcard {current} / {total}",
        categoryLabel: "Category",
        rememberLabel: "Worth remembering",
        showAnswer: "Show answer",
        hideAnswer: "Hide answer",
        next: "Next",
        quizResult: "Result",
        quizExcellent: "Excellent - the curiosities are starting to stick.",
        quizRetry: "Good warm-up. Return to the flashcards and try again.",
        again: "Again",
        goLearn: "Go to learn",
        questionCounter: "Question {current} / {total}",
        scoreLabel: "Score: {score}",
        correctAnswer: "Correct answer",
        finishQuiz: "Finish quiz",
        nextQuestion: "Next question",
        restart: "Restart",
        quizHookPrompt: "Which entry matches this description: \"{hook}\"?",
        quizLatinPrompt: "Which atlas entry is described as {latin}?",
        creditSpecies: "Entry",
        creditFile: "File",
        creditAuthor: "Author",
        creditLicense: "License",
        creditSource: "Source",
        preview: "preview",
        missing: "to be added"
      }
    },
    collections: {
      en: {
        grzyby: {
          title: "Fungi",
          heading: "Unusual Fungi of Poland",
          subtitle: "60 fungal curiosities: forms, colors, smells and species that are easy to remember.",
          count_label: "60 curiosities",
          search_placeholder: "e.g. stinkhorn, coral, earthstar...",
          safety_notice: "Educational prototype. Do not use the atlas to decide whether a fungus is edible, protected or safe to collect.",
          source_note: "Photos are added only when the license is clear. Wikimedia Commons packages include author, source and license.",
          categories: mushroomCategories,
          items: makeItemMap("grzyby", mushroomText)
        },
        owady: {
          title: "Insects",
          heading: "Unusual Insects of Poland",
          subtitle: "30 rare, strange and memorable insects found in Poland.",
          count_label: "30 curiosities",
          search_placeholder: "e.g. oil beetle, glow-worm, stag beetle...",
          safety_notice: "Educational prototype. Observe insects without catching, harming or moving them from their habitat.",
          source_note: "Descriptions start from the working species list. Photos and attribution are added gradually from legal sources.",
          categories: insectCategories,
          items: makeItemMap("owady", insectText)
        },
        kwiaty: {
          title: "Flowers",
          heading: "Unusual Flowers and Plants of Poland",
          subtitle: "31 Polish wild or established plant curiosities: traps, scents, mimicry, parasites and relics.",
          count_label: "31 curiosities",
          search_placeholder: "e.g. waterwheel, orchid, burning bush...",
          safety_notice: "Educational prototype. Many plants are protected, rare, toxic or habitat-sensitive: observe without picking or moving them.",
          source_note: "Descriptions start from the working list of unusual Polish plants. Photos and attribution will be added later from legal sources.",
          categories: flowerCategories,
          items: makeItemMap("kwiaty", flowerText)
        },
        ryby: {
          title: "Fish",
          heading: "Unusual Fish of Polish Waters",
          subtitle: "32 fish curiosities of Polish waters and their marine edge: scents, sounds, suction discs, migrations, camouflage and invasive species.",
          count_label: "32 curiosities",
          search_placeholder: "e.g. smelt, lumpfish, bitterling...",
          safety_notice: "Educational prototype. Fish may be protected, locally regulated or invasive: observe without collecting and always check current rules.",
          source_note: "Descriptions start from the working list of unusual fish of Poland. Photos come from Wikimedia Commons with full attribution.",
          categories: fishCategories,
          items: makeItemMap("ryby", fishText)
        },
        ptaki: {
          title: "Birds",
          heading: "Unusual Birds of Poland",
          subtitle: "32 bird curiosities of Poland: scale records, flight, senses, nests, strategies, wetlands, mountains and rare visitors.",
          count_label: "32 curiosities",
          search_placeholder: "e.g. hoopoe, swift, wallcreeper...",
          safety_notice: "Educational prototype. Birds may be protected, sensitive to disturbance and tied to nests or leks: observe from a distance, do not reveal rare sites and do not interfere with habitats.",
          source_note: "Descriptions start from two working lists of unusual Polish avifauna. Photos come from Wikimedia Commons with full attribution.",
          categories: birdCategories,
          items: makeItemMap("ptaki", birdText)
        },
        ssaki: {
          title: "Mammals",
          heading: "Unusual Mammals of Poland",
          subtitle: "33 mammal curiosities of Poland: Dehnel shrews, venomous water shrews, MRU bats, steppe and Tatra relics, bison, expanding predators and Baltic mammals.",
          count_label: "33 curiosities",
          search_placeholder: "e.g. shrew, bat, bison, porpoise...",
          safety_notice: "Educational prototype. Observe mammals from a distance: do not handle small animals, disturb bat winter roosts, approach large mammals or seals, or reveal sensitive sites.",
          source_note: "Descriptions start from the supplied working material on unusual Polish mammals. Photos come from Wikimedia Commons with full attribution; representative images are labelled as such.",
          categories: mammalCategories,
          items: makeItemMap("ssaki", mammalText)
        },
        "plazy-gady": {
          title: "Amphibians and Reptiles",
          heading: "Unusual Amphibians and Reptiles of Poland",
          subtitle: "30 herpetofauna curiosities of Poland: blue moor-frog breeding, garlic-scented spadefoots, Bombina warning displays, newt crests, tree-frog climbing, relic snakes, pond turtles and invasive ornamental turtles.",
          count_label: "30 curiosities",
          search_placeholder: "e.g. moor frog, fire-bellied toad, pond turtle, adder...",
          safety_notice: "Educational prototype. Observe amphibians and reptiles without handling, moving or damaging habitats; many are protected, sensitive to disturbance or risky when approached carelessly. Never release terrarium animals into the wild.",
          source_note: "Descriptions start from the supplied working material on Polish herpetofauna curiosities. Photos come from Wikimedia Commons with full attribution; representative frames are labelled as such.",
          categories: amphibianReptileCategories,
          items: makeItemMap("plazy-gady", amphibianReptileText)
        },
        drzewa: {
          title: "Trees",
          heading: "Unusual Trees of Poland",
          subtitle: "30 dendrological curiosities of Poland: scents, glowing deadwood, strange forms, veteran trees, memory sites, disasters and park exotics.",
          count_label: "30 curiosities",
          search_placeholder: "e.g. pine, oak, yew, plane tree...",
          safety_notice: "Educational prototype. Veteran trees, old trunks and memorial sites should be observed from a distance: do not climb roots, remove bark, disturb supports or leave marked paths.",
          source_note: "Descriptions start from the working list of dendrological curiosities of Poland. Photos come from Wikimedia Commons with full attribution; representative images are labelled as such.",
          categories: treeCategories,
          items: makeItemMap("drzewa", {})
        },
        mineraly: {
          title: "Minerals",
          heading: "Unusual Minerals of Poland",
          subtitle: "33 mineralogical curiosities of Poland: IMA endemics, ores, salts, agates, striped flint, amber and minerals from old mines.",
          count_label: "33 curiosities",
          search_placeholder: "e.g. flint, sulfur, halite, agate...",
          safety_notice: "Educational prototype. Observe minerals without damaging sites: do not enter abandoned mines, break protected rocks, collect toxic or radioactive ores, or run home chemistry experiments.",
          source_note: "Descriptions start from the working list of mineralogical curiosities of Poland. Photos come from Wikimedia Commons with full attribution; representative images are labelled as such.",
          categories: mineralCategories,
          items: makeItemMap("mineraly", mineralText)
        },
        "formacje-skalne": {
          title: "Rock Formations",
          heading: "Unusual Rock Formations of Poland",
          subtitle: "33 Polish rock-form curiosities: Karkonosze granite tors, volcanic organs, sandstone labyrinths, Jurassic gates, Carpathian outcrops and glacial boulders.",
          count_label: "33 curiosities",
          search_placeholder: "e.g. Błędne Skały, Hercules' Club, Giewont...",
          safety_notice: "Educational prototype. Observe rock formations without damaging sites: stay on marked trails, do not chip or mark rock, enter caves only on official routes and respect protected areas.",
          source_note: "Descriptions start from the working list of unusual Polish rock formations. Photos come from Wikimedia Commons with full attribution; representative images are labelled as such.",
          categories: rockFormationCategories,
          items: makeItemMap("formacje-skalne", rockFormationText)
        },
        "architektura-drewniana": {
          title: "Wooden Architecture",
          heading: "Architectural Curiosities: Wood",
          subtitle: "30 wooden curiosities of Poland: Peace Churches, log-built Gothic churches, Carpathian tserkvas, Zakopane style, Tatar mosques and living wooden villages.",
          count_label: "30 curiosities",
          search_placeholder: "e.g. Świdnica, Dębno, Kwiatoń, Wang, Kruszyniany...",
          safety_notice: "Educational prototype. Visit wooden monuments respectfully: do not touch polychrome, icons, carved wood or construction elements, do not enter private property without permission and check current visiting rules.",
          source_note: "Descriptions start from the supplied working material on Polish wooden architecture. Photos come from Wikimedia Commons with full attribution; representative frames are labelled honestly.",
          categories: woodenArchitectureCategories,
          items: makeItemMap("architektura-drewniana", woodenArchitectureText)
        },
        podziemia: {
          title: "Undergrounds",
          heading: "Underground Curiosities of Poland",
          subtitle: "30 subterranean curiosities of Poland: salt, flint and silver mines, urban cellars, adits, shelters and the unanswered questions of the Owl Mountains.",
          count_label: "30 curiosities",
          search_placeholder: "e.g. Wieliczka, Riese, MRU, Sandomierz, Chełm...",
          safety_notice: "Educational prototype. Visit underground sites only on official routes: do not enter abandoned adits, shelters or cellars, do not touch safety structures, and keep a calm historical tone around wartime places.",
          source_note: "Descriptions start from the supplied working material on Polish underground curiosities. Photos come from Wikimedia Commons with full attribution; diagrams and representative frames are labelled honestly.",
          categories: undergroundCategories,
          items: makeItemMap("podziemia", {})
        },
        "cuda-inzynierii": {
          title: "Engineering Wonders",
          heading: "Technical Curiosities of Poland",
          subtitle: "33 technical curiosities of Poland: canals, locks, brine graduation towers, radio towers, halls, dams, bridges, tunnels, railways and industrial cities.",
          count_label: "33 curiosities",
          search_placeholder: "e.g. Elbląg Canal, graduation towers, Gliwice Radio Tower, Solina, Gdynia...",
          safety_notice: "Educational prototype. View technical sites only from legal public areas: do not enter dams, tracks, quays, bridge structures, industrial grounds or active infrastructure without permission.",
          source_note: "Descriptions start from the supplied working material on Polish technical and architectural curiosities. Technical figures and source references should be verified before final publication.",
          categories: engineeringWonderCategories,
          items: makeItemMap("cuda-inzynierii", {})
        },
        "twierdze-ruiny": {
          title: "Fortresses and Ruins",
          heading: "Fortresses, Ruins and Forgotten Places",
          subtitle: "33 curiosities of Polish fortresses and ruins: ideal cities, legendary castles, fortress systems, abandoned palaces and structures left after ambition.",
          count_label: "33 curiosities",
          search_placeholder: "e.g. Zamość, Krzyżtopór, Malbork, Modlin, Stańczyki...",
          safety_notice: "Educational prototype. Visit castles, fortresses and ruins legally and carefully: do not enter abandoned, private or closed sites, do not climb walls and treat memorial places with calm historical language.",
          source_note: "Descriptions start from the supplied working material on Polish castles, fortresses, ruins and forgotten structures. Photos come from Wikimedia Commons with full attribution; representative frames are labelled honestly.",
          categories: fortressRuinCategories,
          items: makeItemMap("twierdze-ruiny", fortressRuinText)
        },
        "memento-mori": {
          title: "Memento Mori",
          heading: "Memento Mori: Places of Memory and Transience",
          subtitle: "30 places of memory and transience in Poland: ossuaries, cemeteries, necropolises, Holocaust and martyrdom memorials, war graves, mounds and ancient burials.",
          count_label: "30 curiosities",
          search_placeholder: "e.g. Czermna, Powązki, mizar, Treblinka, mound...",
          safety_notice: "Educational prototype. This collection includes memorial places and difficult history; read and visit respectfully, without sensational framing, posing at graves or entering closed or fragile areas.",
          source_note: "Descriptions start from the supplied working material on Polish memorial and burial-culture places. Photos come from Wikimedia Commons with full attribution; difficult-history sites use calm educational language.",
          categories: mementoMoriCategories,
          items: makeItemMap("memento-mori", mementoMoriText)
        },
        skamienialosci: {
          title: "Fossils",
          heading: "Unusual Fossils of Poland",
          subtitle: "33 paleontological curiosities of Poland: trilobites, Devonian reefs, Zachełmie, Triassic giants, dinosaur tracks, Jurassic seas, amber and Ice Age megafauna.",
          count_label: "33 curiosities",
          search_placeholder: "e.g. Zachełmie, Smok, ammonites, amber...",
          safety_notice: "Educational prototype. Observe fossils without damaging sites: do not chip specimens from reserves, enter quarries without permission, dig fossil sites or remove rare finds from their context.",
          source_note: "Descriptions start from the working list of unusual Polish fossils. Photos come from Wikimedia Commons with full attribution; representative images are labelled as such.",
          categories: fossilCategories,
          items: makeItemMap("skamienialosci", fossilText)
        },
        "atmosfera-astronomia": {
          title: "Atmosphere and Astronomy",
          heading: "Atmospheric and Astronomical Curiosities of Poland",
          subtitle: "33 sky and weather curiosities of Poland: Brocken spectres, sprites, white nights, noctilucent clouds, dark-sky parks, auroras, Baltic snow bands, long-distance views, frost hollows and Saharan dust.",
          count_label: "33 curiosities",
          search_placeholder: "e.g. Brocken, aurora, Baltic, frost hollow...",
          safety_notice: "Educational prototype. Sky and weather phenomena are not forecasts or invitations to take risks: do not chase storms, stand on ridges during electrical activity, ignore cold or use the atlas as safety guidance.",
          source_note: "Descriptions start from the working list of Polish atmospheric and astronomical phenomena. Photos come from Wikimedia Commons with full attribution; representative images are labelled as such.",
          categories: atmosphereAstronomyCategories,
          items: makeItemMap("atmosfera-astronomia", atmosphereAstronomyText)
        },
        "rekordy-krajobrazu": {
          title: "Landscape Records",
          heading: "Landscape Records and Curiosities of Poland",
          subtitle: "56 Polish landscape curiosities: a desert-like sand plain, moving dunes, crooked forest, cliffs, marshes, colored lakes, gorges, extinct volcanoes, microclimates and places that feel from another map.",
          count_label: "56 curiosities",
          search_placeholder: "e.g. desert, dunes, Hańcza, mofette, Rysy...",
          safety_notice: "Educational prototype. Treat this as landscape context, not route guidance: follow park and reserve rules, do not damage rocks, dunes, peatlands or plants, and check current access before visiting.",
          source_note: "Descriptions start from the supplied working material on Polish landscape records and curiosities. Photos come from Wikimedia Commons with full attribution; contextual and representative frames are labelled honestly.",
          categories: landscapeRecordCategories,
          items: makeItemMap("rekordy-krajobrazu", {})
        }
      }
    },
    groups: {
      pl: {
        "przyroda-zywa": {
          label: "Przyroda żywa",
          description: "Fauna i flora Polski — od bioluminescencji po reliktowe gatunki."
        },
        "ziemia-niebo": {
          label: "Ziemia i niebo",
          description: "Geologia, minerały, formacje skalne, atmosfera i krajobraz."
        },
        "czlowiek-kultura": {
          label: "Człowiek i kultura",
          description: "Architektura, technika i pamięć — ślady ludzi w polskim krajobrazie."
        }
      },
      en: {
        "przyroda-zywa": {
          label: "Living nature",
          description: "Polish flora and fauna — from bioluminescence to relict species."
        },
        "ziemia-niebo": {
          label: "Earth & sky",
          description: "Geology, minerals, rock formations, atmosphere and landscape."
        },
        "czlowiek-kultura": {
          label: "People & culture",
          description: "Architecture, technology and memory — human traces in the Polish landscape."
        }
      }
    }
  };
})();
