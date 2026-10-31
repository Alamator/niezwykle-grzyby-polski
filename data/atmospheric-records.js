(() => {
  // Weather records of Poland: measurements and events checked in the sources listed in
  // data/occurrence/rekordy-atmosferyczne.occurrence.js (IMGW-PIB, GUS, papers, PAP, Wikipedia).
  // What is disputed or rests only on own calculations stays out (review of 30-31.10.2026).
  const categories = [
    { id: "upal-mroz", label: "Upał i mróz", short: "Temperatura", icon: "T" },
    { id: "opady", label: "Opady", short: "Opady", icon: "O" },
    { id: "wiatr", label: "Wiatr", short: "Wiatr", icon: "W" },
    { id: "burze", label: "Burze, tornada i grad", short: "Burze", icon: "B" },
    { id: "mgla", label: "Mgła", short: "Mgła", icon: "M" }
  ];

  const cat = Object.fromEntries(categories.map((category) => [category.id, category]));

  function entry(data) {
    const category = cat[data.category];
    return { ...data, category_label: category.label, category_short: category.short, category_icon: category.icon };
  }

  const atmosphericRecords = [
    entry({
      id: "slubice-40-5",
      name_pl: "Słubice — 40,5 °C, rekord ogłoszony przez IMGW",
      name_lat: "Lubuskie • upał z czerwca 2026 r.",
      category: "upal-mroz",
      hook: "28 czerwca 2026 r. zmierzono tu 40,5 °C, najwięcej w historii pomiarów na stacjach synoptycznych w Polsce.",
      quiz_angle: "40,5 °C na stacji synoptycznej; według IMGW rekord z 1921 r. pobity o 0,3 °C",
      safety_note: "w upale ograniczać wysiłek w najgorętszych godzinach, pić wodę i śledzić aktualne ostrzeżenia pogodowe",
      region_pl: "Słubice, Lubuskie.",
      habitat_pl: "28 czerwca 2026 r.",
      occurrence_note: "40,5 °C to rekord ogłoszony przez IMGW (stacje synoptyczne). Według IMGW pobił rekord 40,2 °C z Prószkowa (29 lipca 1921 r.), który przetrwał blisko 105 lat.",
      level: "czerwcowy upał"
    }),
    entry({
      id: "proszkow-1921",
      name_pl: "Prószków — 40,2 °C",
      name_lat: "Opolskie • upał z lipca 1921 r.",
      category: "upal-mroz",
      hook: "Tu 29 lipca 1921 r. termometr pokazał 40,2 °C; według IMGW był to rekord ciepła, który przetrwał aż do 2026 r.",
      quiz_angle: "40,2 °C na ówczesnej niemieckiej stacji, według IMGW rekord pobity dopiero w 2026 roku",
      safety_note: "dawny pomiar to kontekst historyczny; w czasie upałów sprawdzać bieżące komunikaty i ostrzeżenia pogodowe",
      region_pl: "Prószków, Opolskie.",
      habitat_pl: "29 lipca 1921 r.",
      occurrence_note: "40,2 °C to według IMGW dawny rekord ciepła, pobity dopiero 28 czerwca 2026 r. w Słubicach. W 1921 r. pomiar wykonała ówczesna niemiecka stacja meteorologiczna; Prószków przyłączono do Polski w 1945 r.",
      level: "historyczny upał"
    }),
    entry({
      id: "zywiec-1929",
      name_pl: "Żywiec — mróz −40,6 °C",
      name_lat: "Śląskie • mróz z lutego 1929 r.",
      category: "upal-mroz",
      hook: "10 lutego 1929 r. zanotowano tu −40,6 °C, jedną z najniższych temperatur w historii pomiarów w Polsce.",
      quiz_angle: "−40,6 °C w lutym 1929 r., ale rekord zimna według IMGW-PIB należy do Siedlec",
      safety_note: "przy silnym mrozie chronić twarz i dłonie, ubierać się warstwowo oraz skracać pobyt na zewnątrz",
      region_pl: "Żywiec, Śląskie.",
      habitat_pl: "10 lutego 1929 r.",
      occurrence_note: "−40,6 °C to pomiar historyczny. Za rekord zimna w Polsce IMGW-PIB uznaje −41 °C z Siedlec (11 stycznia 1940 r.); zob. kartę „Siedlce i rekord mrozu” w szufladzie „Atmosfera i astronomia”.",
      level: "historyczny mróz"
    }),
    entry({
      id: "rok-2024",
      name_pl: "2024 — rok rekordowego ciepła",
      name_lat: "średnia obszarowa 10,9 °C",
      category: "upal-mroz",
      hook: "Rok, w którym średnia temperatura powietrza w Polsce wyniosła 10,9 °C, aż o 2,2 °C więcej niż norma z lat 1991–2020.",
      quiz_angle: "średnio 10,9 °C, o 2,2 °C ponad normę 1991–2020 i o 0,7 °C ponad rekord z 2019 roku",
      safety_note: "średnia roczna to statystyka, nie prognoza; bieżące zagrożenia sprawdzać w aktualnych komunikatach pogodowych",
      region_pl: "Cała Polska (średnia obszarowa temperatura powietrza).",
      habitat_pl: "cały rok 2024.",
      occurrence_note: "Średnia obszarowa 10,9 °C: według raportu IMGW-PIB za 2024 r. to najcieplejszy rok w historii polskich pomiarów instrumentalnych, o 0,7 °C cieplejszy od poprzedniego rekordowego 2019 r.",
      level: "rekordowa średnia roczna"
    }),
    entry({
      id: "wroclaw-srednia-roczna",
      name_pl: "Wrocław — średnio 9,7 °C w latach 1991–2020",
      name_lat: "Dolnośląskie • ciepła średnia roczna",
      category: "upal-mroz",
      hook: "Miasto ze średnią roczną 9,7 °C w latach 1991–2020, jedną z najwyższych w Polsce.",
      quiz_angle: "jedna z najwyższych średnich rocznych w Polsce, 9,7 °C wobec 7,2 °C w Suwałkach",
      safety_note: "średnią wieloletnią traktować jako tło klimatyczne; w upalne dni sprawdzać aktualne ostrzeżenia pogodowe",
      region_pl: "Wrocław, Dolnośląskie.",
      habitat_pl: "lata 1991–2020 (średnia wieloletnia).",
      occurrence_note: "Średnia roczna temperatura powietrza na stacji meteorologicznej we Wrocławiu wyniosła 9,7 °C w latach 1991–2020 i 8,7 °C w latach 1971–2000 (dane IMGW-PIB w publikacji GUS). Ta średnia z lat 1991–2020 należy do najwyższych w Polsce.",
      level: "ciepły kraniec skali"
    }),
    entry({
      id: "suwalki-srednia-roczna",
      name_pl: "Suwałki — średnio 7,2 °C w latach 1991–2020",
      name_lat: "Podlaskie • chłodna średnia roczna",
      category: "upal-mroz",
      hook: "Jedno z najzimniejszych miejsc w Polsce poza górami: średnia roczna temperatura wyniosła tu 7,2 °C w latach 1991–2020.",
      quiz_angle: "jedno z najzimniejszych miejsc poza górami, 7,2 °C wobec 9,7 °C we Wrocławiu",
      safety_note: "przy silnym mrozie ubierać się warstwowo i sprawdzać aktualne ostrzeżenia pogodowe",
      region_pl: "Suwałki, Podlaskie.",
      habitat_pl: "lata 1991–2020 (średnia wieloletnia).",
      occurrence_note: "Średnia roczna temperatura powietrza na stacji meteorologicznej w Suwałkach wyniosła 7,2 °C w latach 1991–2020 i 6,3 °C w latach 1971–2000 (dane IMGW-PIB w publikacji GUS).",
      level: "chłodny północny wschód"
    }),
    entry({
      id: "hala-gasienicowa-300-mm",
      name_pl: "Hala Gąsienicowa — 300 mm opadu w jedną dobę",
      name_lat: "Tatry • opad dobowy z czerwca 1973 r.",
      category: "opady",
      hook: "Dobowa suma opadu sięgnęła tu 300 mm, czyli 300 litrów wody na każdy metr kwadratowy.",
      quiz_angle: "300 mm w jedną dobę 30 czerwca 1973 r., według IMGW-PIB najwięcej w Polsce",
      safety_note: "przy ulewach w górach nie przekraczać wezbranych potoków, a przed wyjściem na szlak sprawdzać prognozę i ostrzeżenia",
      region_pl: "Hala Gąsienicowa w Tatrach, Małopolskie.",
      habitat_pl: "30 czerwca 1973 r.",
      occurrence_note: "300 mm w jedną dobę zmierzyła stacja meteorologiczna na wysokości 1520 m n.p.m.; według IMGW-PIB to najwyższy opad dobowy w Polsce.",
      level: "opad dobowy"
    }),
    entry({
      id: "powodz-1997-opady",
      name_pl: "Lipiec 1997 — ulewy i powódź tysiąclecia",
      name_lat: "sumy opadów z trzech dób w Masywie Śnieżnika",
      category: "opady",
      hook: "Trzy doby ulew przyniosły w dwóch sudeckich wsiach 456 mm i 431 mm deszczu.",
      quiz_angle: "trzy doby ulew w Masywie Śnieżnika, które przyczyniły się do powodzi w dorzeczu Odry",
      safety_note: "w czasie ulew i wezbrań śledzić aktualne ostrzeżenia meteorologiczne i hydrologiczne, nie wchodzić do wezbranej wody i nie wjeżdżać na zalane drogi",
      region_pl: "Kamienica i Międzygórze w Masywie Śnieżnika, Dolnośląskie.",
      habitat_pl: "początek lipca 1997 r.",
      occurrence_note: "Sumy opadu z trzech dób wyniosły 456 mm w Kamienicy i 431 mm w Międzygórzu. Te ulewy przyczyniły się do tzw. powodzi tysiąclecia w dorzeczu Odry.",
      level: "ulewy wielodniowe"
    }),
    entry({
      id: "kasprowy-opady-roczne",
      name_pl: "Kasprowy Wierch — średni roczny opad ok. 1800 mm",
      name_lat: "Tatry • roczne opady na szczycie",
      category: "opady",
      hook: "Tatrzański szczyt, na którym w 2001 r. spadło aż 2600 mm opadu, najwięcej tu w latach 1966–2006.",
      quiz_angle: "średni roczny opad ok. 1800 mm (1966–2006), a w 2001 r. aż 2600 mm",
      safety_note: "przed wyjściem w wysokie góry sprawdzać prognozę i ostrzeżenia, a przy załamaniu pogody zawracać",
      region_pl: "Kasprowy Wierch w Tatrach, Małopolskie.",
      habitat_pl: "lata 1966–2006 (średnia wieloletnia) oraz 2001 r.",
      occurrence_note: "W latach 1966–2006 średnia roczna suma opadów wyniosła tu 1797,7 mm. Najwięcej w tym okresie spadło w 2001 r.: 2600 mm; według IMGW-PIB na Hali Gąsienicowej zmierzono wtedy 2626 mm.",
      level: "mokry szczyt"
    }),
    entry({
      id: "kalisz-opady-roczne",
      name_pl: "Kalisz — średni roczny opad 494 mm w latach 1991–2020",
      name_lat: "Wielkopolskie • mało opadów",
      category: "opady",
      hook: "W latach 1991–2020 spadało tu średnio tylko 494 mm opadu rocznie: to jedna z najniższych sum w Polsce.",
      quiz_angle: "średnio 494 litry wody z opadów na każdy metr kwadratowy w roku",
      safety_note: "w czasie suszy oszczędzać wodę i szczególnie uważać z ogniem w lesie i przy lesie",
      region_pl: "Kalisz, Wielkopolskie.",
      habitat_pl: "lata 1991–2020 (średnia wieloletnia).",
      occurrence_note: "Średnia roczna suma opadów w Kaliszu wyniosła 494 mm w latach 1991–2020 i 507 mm w latach 1971–2000. Ta średnia z lat 1991–2020 należy do najniższych w Polsce.",
      level: "niska suma opadów"
    }),
    entry({
      id: "sniezka-wiatr",
      name_pl: "Śnieżka — wiatr 65 m/s",
      name_lat: "Karkonosze • wiatromierz poza skalą",
      category: "wiatr",
      hook: "W lutym 2004 r. wiatr na tym szczycie przekroczył skalę wiatromierza.",
      quiz_angle: "65 m/s (234 km/h) 21 lutego 2004 r.; skala wiatromierza została przekroczona",
      safety_note: "przy silnym wietrze nie wychodzić na odsłonięte grzbiety i szczyty; przed wyjściem w góry sprawdzać ostrzeżenia pogodowe",
      region_pl: "Śnieżka w Karkonoszach, Dolnośląskie.",
      habitat_pl: "21 lutego 2004 r.",
      occurrence_note: "Na szczycie zanotowano wtedy wiatr o prędkości 65 m/s (234 km/h). Skala wiatromierza została przekroczona, więc wiać mogło jeszcze mocniej.",
      level: "wietrzny szczyt"
    }),
    entry({
      id: "halny-1968",
      name_pl: "Kasprowy Wierch — halny z maja 1968 roku",
      name_lat: "Tatry • porywy do 75–80 m/s według IMGW-PIB",
      category: "wiatr",
      hook: "6 maja 1968 r. porywy wiatru fenowego dochodziły tu według IMGW-PIB do 75–80 m/s, czyli 270–288 km/h.",
      quiz_angle: "halny to ciepły, suchy wiatr fenowy; dla maja 1968 r. IMGW-PIB podaje porywy do 75–80 m/s",
      safety_note: "podczas halnego omijać las i odsłonięte grzbiety; ten wiatr potrafi łamać drzewa i zrywać dachy",
      region_pl: "Kasprowy Wierch w Tatrach, Małopolskie.",
      habitat_pl: "6 maja 1968 r.",
      occurrence_note: "Według IMGW-PIB tego dnia odnotowano prawdopodobnie najwyższą prędkość wiatru w historii obserwacji na Kasprowym Wierchu: porywy dochodziły do 75–80 m/s.",
      level: "wiatr fenowy"
    }),
    entry({
      id: "tornado-lublin-1931",
      name_pl: "Lublin — tornado z 1931 roku",
      name_lat: "Lubelskie • siła wiatru szacowana na F4",
      category: "burze",
      hook: "Jedno z najsilniejszych udokumentowanych tornad w Polsce przewracało tu wagony kolejowe.",
      quiz_angle: "20 lipca 1931 r., przewrócone wagony i siła wiatru szacowana na F4",
      safety_note: "gdy zbliża się trąba powietrzna, schronić się w murowanym budynku, najlepiej w pomieszczeniu bez okien na najniższej kondygnacji",
      region_pl: "Lublin i okolice, Lubelskie.",
      habitat_pl: "20 lipca 1931 r.",
      occurrence_note: "Według współczesnych analiz siła wiatru odpowiadała najprawdopodobniej stopniowi F4 w skali Fujity; to szacunek. Tornado zabiło 6 osób, a rannych było według szacunków ok. 100.",
      level: "historyczne tornado"
    }),
    entry({
      id: "tornada-2008",
      name_pl: "15 sierpnia 2008 — seria tornad",
      name_lat: "potwierdzone tornada w trzech województwach",
      category: "burze",
      hook: "Dzień, w którym jedno z kilku tornad miało ścieżkę długą na prawie 20 km, a miejscami szeroką do 1 km.",
      quiz_angle: "tornado z powiatu strzeleckiego: prawie 20 km ścieżki i 15 rannych",
      safety_note: "nie podchodzić do trąby powietrznej, by ją nagrać; przy ostrzeżeniu przed burzą schronić się w murowanym budynku",
      region_pl: "Opolskie / Śląskie / Łódzkie.",
      habitat_pl: "15 sierpnia 2008 r.",
      occurrence_note: "Tornado o ścieżce długiej na prawie 20 km przeszło przez powiat strzelecki; rannych zostało 15 osób.",
      level: "dzień tornad"
    }),
    entry({
      id: "derecho-2017",
      name_pl: "11 sierpnia 2017 — derecho",
      name_lat: "burza wiatrowa od Dolnego Śląska po Pomorze",
      category: "burze",
      hook: "Nawałnica przyczyniła się do śmierci 6 osób, a Lasy Państwowe nazwały ją największym kataklizmem w swojej historii.",
      quiz_angle: "derecho to długo trwająca burza wiatrowa, która niszczy na bardzo dużym obszarze",
      safety_note: "przy ostrzeżeniu przed burzą z silnym wiatrem omijać las i drzewa oraz schronić się w murowanym budynku",
      region_pl: "Kujawsko-Pomorskie / Pomorskie / Wielkopolskie (największe straty).",
      habitat_pl: "popołudnie i wieczór 11 sierpnia oraz noc z 11 na 12 sierpnia 2017 r.",
      occurrence_note: "Według IMGW-PIB było to derecho z porywami wiatru przekraczającymi 150 km/h.",
      level: "rozległa nawałnica"
    }),
    entry({
      id: "grad-tomaszow-2021",
      name_pl: "Tomaszów Mazowiecki — gradzina 13,5 cm",
      name_lat: "Łódzkie • grad z czerwca 2021 r.",
      category: "burze",
      hook: "W 2021 r. w pobliżu tego miasta spadł grad o średnicy 13,5 cm; według IMGW-PIB to rekord wielkości gradu w Polsce.",
      quiz_angle: "13,5 cm średnicy, według IMGW-PIB rekord wielkości gradu w Polsce",
      safety_note: "przy ostrzeżeniu przed burzą z dużym gradem zostać w budynku i trzymać się z dala od okien",
      region_pl: "Okolice Tomaszowa Mazowieckiego, Łódzkie.",
      habitat_pl: "24 czerwca 2021 r.",
      occurrence_note: "Według komunikatu IMGW-PIB z 2023 r. rekord wielkości gradu w Polsce wynosi 13,5 cm; taki grad spadł w 2021 r. w pobliżu Tomaszowa Mazowieckiego.",
      level: "duży grad"
    }),
    entry({
      id: "sniezka-mgla",
      name_pl: "Śnieżka — ok. 300 dni z mgłą w roku",
      name_lat: "Karkonosze • więcej dni z mgłą niż bez niej",
      category: "mgla",
      hook: "Szczyt, na którym mgła pojawia się średnio w ok. 300 dniach roku.",
      quiz_angle: "średnio ok. 300 dni z mgłą w roku, czyli więcej niż dni bez mgły",
      safety_note: "we mgle trzymać się oznakowanego szlaku i zawrócić, gdy widoczność mocno spada",
      region_pl: "Śnieżka w Karkonoszach, Dolnośląskie.",
      habitat_pl: "przeciętny rok (średnia wieloletnia).",
      occurrence_note: "Mgła pojawia się tu średnio w ok. 300 dniach roku. Dni z mgłą jest więc więcej niż dni bez niej.",
      level: "mglisty szczyt"
    })
  ];

  window.ATMOSPHERIC_RECORD_APP_DATA = {
    subtitle: "17 pogodowych osobliwości Polski: upał w Słubicach, mróz w Żywcu, ulewy w Tatrach i Sudetach, wiatr na Śnieżce, halny, tornada, derecho, grad i mgła.",
    safety_notice: "Karty opisują pomiary i zjawiska z przeszłości. Nie zastępują prognoz ani ostrzeżeń meteorologicznych IMGW-PIB: przy upale, burzy czy wichurze kieruj się aktualnymi komunikatami.",
    categories,
    atmosphericRecords
  };
})();
