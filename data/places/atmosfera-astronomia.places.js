// Map points of the "Atmosfera i astronomia" collection: Wikidata coordinates (CC0) of the place on each card,
// or of the place that holds it (the castle above an underground route, the park of a group of meadows).
// Each point was checked against the municipality and voivodeship on the card; cards without a sure
// point, and cards that cover several places, are left out. Loaded with the collection (data/collections.js).
window.ATLAS_PLACES = window.ATLAS_PLACES || {};
window.ATLAS_PLACES["atmosfera-astronomia"] = {
  checked: "2026-10-28",
  items: {
    "izerski-park-ciemnego-nieba": { lat: 50.84, lng: 15.33, wikidata: "Q959801" },  // Izerski Park Ciemnego Nieba
    "bieszczadzki-park-gwiezdnego-nieba": { lat: 49.2, lng: 22.47, wikidata: "Q62284127" },  // Park Gwiezdnego Nieba Bieszczady
    "sopotnia-wielka-ciemne-niebo": { lat: 49.59403, lng: 19.29703, wikidata: "Q2801727" },  // Sopotnia Wielka
    "rekord-godziszow-zadni-gerlach": { lat: 50.7525, lng: 22.485, wikidata: "Q5577084" },  // Godziszów
    "hala-izerska-mala-syberia": { lat: 50.847, lng: 15.3642, wikidata: "Q11708381" },  // Hala Izerska
    "litworowy-kociol": { lat: 49.2364, lng: 19.9128, wikidata: "Q11762032" },  // Litworowy Kocioł (Tatry Zachodnie)
    "puscizna-rekowianska": { lat: 49.46621, lng: 19.82248, wikidata: "Q30905509" },  // Puścizna Rękowiańska
    "siedlce-rekord-mrozu": { lat: 52.18333, lng: 22.28333, wikidata: "Q319813" }  // Siedlce
  }
};
