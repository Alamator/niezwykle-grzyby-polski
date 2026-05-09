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
    "botaniczny księżyc": "botanical moon"
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
    return "Educational material only; observe without disturbing the insect or its habitat.";
  }

  function defaultRegion(collectionId) {
    if (collectionId === "grzyby") return "Recorded in Poland; local abundance depends strongly on habitat and season.";
    if (collectionId === "kwiaty") return "Recorded in Poland as a native, wild or established plant curiosity, depending strongly on habitat.";
    return "Found locally or more widely in Poland, depending on habitat quality and season.";
  }

  function defaultOccurrence(collectionId) {
    if (collectionId === "grzyby") return "Use the habitat, shape and season as field context; the note is educational, not a collecting guide.";
    if (collectionId === "kwiaty") return "Observe without collecting; many plant curiosities depend on fragile microhabitats.";
    return "Best treated as a field curiosity: observe, photograph and leave the habitat undisturbed.";
  }

  function makeItemMap(collectionId, overrides) {
    const collection = collectionById(collectionId);
    return Object.fromEntries((collection.items || []).map((item) => {
      const entry = overrides[item.id] || {};
      return [item.id, {
        name: entry.name || item.name_lat || item.name_pl,
        hook: entry.hook || `${entry.name || item.name_lat || item.name_pl} is included here for its unusual field appearance and memorable natural-history story.`,
        quiz_angle: entry.quiz_angle || "Recognize it by the strongest field mark, habitat and the feature that makes it unusual.",
        safety_note: entry.safety_note || defaultSafety(item, collectionId),
        region: entry.region || defaultRegion(collectionId),
        habitat: entry.habitat || defaultHabitats[collectionId]?.[item.category] || "specialized habitats in Poland",
        occurrence: entry.occurrence || defaultOccurrence(collectionId),
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
        heroEyebrow: "Atlas • Polska • kolekcje przyrodnicze",
        heroTitle: "Atlas Osobliwości Polski",
        heroLead: "Wybierz kolekcję i ucz się przez atlas, fiszki, quiz oraz źródła. Projekt jest gotowy na kolejne działy: ryby, motyle, kwiaty i następne osobliwości.",
        quickActions: "Szybkie akcje",
        languageLabel: "Wybór języka",
        chooseCollection: "Wybierz kolekcję",
        collectionsEyebrow: "Kolekcje",
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
        learnTitle: "Fiszki: zgadnij gatunek",
        learnNote: "Najpierw zobacz ciekawostkę, potem odsłoń odpowiedź.",
        quizEyebrow: "Quiz",
        quizTitle: "10 pytań na spokojnie",
        quizNote: "Pytania są generowane z opisów i nazw łacińskich aktywnej kolekcji.",
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
        learnSpecies: "Ucz się tego gatunku",
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
        quizHookPrompt: "Który gatunek pasuje do opisu: „{hook}”?",
        quizLatinPrompt: "Jaką polską nazwę ma gatunek {latin}?",
        creditSpecies: "Gatunek",
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
        heroEyebrow: "Atlas • Poland • nature collections",
        heroTitle: "Atlas of Polish Curiosities",
        heroLead: "Choose a collection and learn through the atlas, flashcards, quiz and sources. The project is ready for future sections: fish, butterflies, flowers and more natural curiosities.",
        quickActions: "Quick actions",
        languageLabel: "Language selection",
        chooseCollection: "Choose a collection",
        collectionsEyebrow: "Collections",
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
        learnTitle: "Flashcards: guess the species",
        learnNote: "First read the clue, then reveal the answer.",
        quizEyebrow: "Quiz",
        quizTitle: "10 calm questions",
        quizNote: "Questions are generated from descriptions and Latin names in the active collection.",
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
        learnSpecies: "Learn this species",
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
        quizHookPrompt: "Which species matches this description: \"{hook}\"?",
        quizLatinPrompt: "Which common name belongs to {latin}?",
        creditSpecies: "Species",
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
        }
      }
    }
  };
})();
