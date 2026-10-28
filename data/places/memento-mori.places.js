// Map points of the "Memento mori" collection: Wikidata coordinates (CC0) of the place on each card,
// or of the place that holds it (the castle above an underground route, the park of a group of meadows).
// Each point was checked against the municipality and voivodeship on the card; cards without a sure
// point, and cards that cover several places, are left out. Loaded with the collection (data/collections.js).
window.ATLAS_PLACES = window.ATLAS_PLACES || {};
window.ATLAS_PLACES["memento-mori"] = {
  checked: "2026-10-28",
  items: {
    "kaplica-czaszek-czermna": { lat: 50.45153, lng: 16.24193, wikidata: "Q2879740" },  // Kaplica Czaszek w Czermnej
    "stare-powazki": { lat: 52.25194, lng: 20.97278, wikidata: "Q168886" },  // cmentarz Powązkowski w Warszawie
    "cmentarz-rakowicki": { lat: 50.07556, lng: 19.95389, wikidata: "Q1457419" },  // Cmentarz Rakowicki w Krakowie
    "peksowy-brzyzek": { lat: 49.2967, lng: 19.9471, wikidata: "Q6940830" },  // Cmentarz Zasłużonych na Pęksowym Brzyzku w Zakopanem
    "cmentarz-zydowski-okopowa": { lat: 52.2475, lng: 20.97472, wikidata: "Q1716786" },  // Cmentarz żydowski w Warszawie (Wola)
    "nowy-cmentarz-zydowski-lodz": { lat: 51.79681, lng: 19.48022, wikidata: "Q115094" },  // Nowy cmentarz żydowski w Łodzi
    "cmentarz-remuh": { lat: 50.0525, lng: 19.94694, wikidata: "Q115001" },  // Cmentarz Remuh w Krakowie
    "mizar-kruszyniany": { lat: 53.17731, lng: 23.81799, wikidata: "Q30579199" },  // cmentarz muzułmański w Kruszynianach
    "mizar-bohoniki": { lat: 53.3972, lng: 23.5956, wikidata: "Q8511392" },  // Cmentarz muzułmański w Bohonikach
    "cmentarz-mennonicki-stogi": { lat: 54.07088, lng: 18.98088, wikidata: "Q20034168" },  // Cmentarz mennonicki w Stogach
    "cmentarz-wojenny-luzna-pustki": { lat: 49.71778, lng: 21.06321, wikidata: "Q8512277" },  // Cmentarz wojenny nr 123 - Łużna-Pustki
    "cmentarz-wojenny-magura-malastowska": { lat: 49.54389, lng: 21.24389, wikidata: "Q3537530" },  // Cmentarz wojenny nr 60 - Magura w Małastowie
    "rotunda-zamojska": { lat: 50.7108, lng: 23.2472, wikidata: "Q30101783" },  // Rotunda, ob. Muzeum Martyrologii Rotunda (1825-31 r.)
    "palmiry": { lat: 52.33388, lng: 20.74471, wikidata: "Q559257" },  // Cmentarz w Palmirach
    "auschwitz-birkenau": { lat: 50.03583, lng: 19.17833, wikidata: "Q7341" },  // Auschwitz-Birkenau
    "majdanek": { lat: 51.22533, lng: 22.60621, wikidata: "Q13060293" },  // Majdanek State Museum
    "belzec": { lat: 50.37339, lng: 23.45814, wikidata: "Q59280811" },  // Muzeum – Miejsce Pamięci w Bełżcu
    "sobibor": { lat: 51.44699, lng: 23.59414, wikidata: "Q152658" },  // Obóz zagłady w Sobiborze
    "kulmhof-chelmno": { lat: 52.15417, lng: 18.72306, wikidata: "Q160152" },  // Obóz zagłady w Chełmnie nad Nerem
    "treblinka": { lat: 52.63506, lng: 22.0535, wikidata: "Q30524433" },  // Muzeum Treblinka
    "piasnica": { lat: 54.67581, lng: 18.18431, wikidata: "Q11816415" },  // Cmentarz - Miejsce Pamięci w Piaśnicy
    "michniow": { lat: 51.0053, lng: 20.8489, wikidata: "Q17619129" },  // Mauzoleum Martyrologii Wsi Polskich w Michniowie
    "grob-nieznanego-zolnierza": { lat: 52.24111, lng: 21.01139, wikidata: "Q1540926" },  // Grób Nieznanego Żołnierza w Warszawie
    "westerplatte-cmentarz": { lat: 54.4071, lng: 18.6754, wikidata: "Q9195116" },  // Cmentarzyk Poległych Obrońców Westerplatte
    "kamienne-kregi-odry": { lat: 53.8985, lng: 17.9941, wikidata: "Q9308745" },  // Rezerwat przyrody Kręgi Kamienne (województwo pomorskie)
    "kamienne-kregi-wesiory": { lat: 54.21776, lng: 17.83985, wikidata: "Q9381462" },  // Węsiory (cmentarzysko)
    "kopiec-krakusa": { lat: 50.03805, lng: 19.95844, wikidata: "Q722446" },  // Kopiec Krakusa
    "kopiec-wandy": { lat: 50.07028, lng: 20.06806, wikidata: "Q421819" },  // Kopiec Wandy
    "stary-cmentarz-zydowski-wroclaw": { lat: 51.08694, lng: 17.025, wikidata: "Q114597" }  // Stary Cmentarz Żydowski we Wrocławiu
  }
};
