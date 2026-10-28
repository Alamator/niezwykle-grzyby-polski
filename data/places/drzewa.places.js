// Map points of the "Drzewa" collection: Wikidata coordinates (CC0) of the place on each card,
// or of the place that holds it (the castle above an underground route, the park of a group of meadows).
// Each point was checked against the municipality and voivodeship on the card; cards without a sure
// point, and cards that cover several places, are left out. Loaded with the collection (data/collections.js).
window.ATLAS_PLACES = window.ATLAS_PLACES || {};
window.ATLAS_PLACES["drzewa"] = {
  checked: "2026-10-28",
  items: {
    "krzywy-las": { lat: 53.21389, lng: 14.475, wikidata: "Q1602409" },  // Krzywy Las
    "cis-henrykowski": { lat: 51.17142, lng: 15.21832, wikidata: "Q1301101" },  // Cis Henrykowski
    "sosna-na-sokolicy": { lat: 49.4175, lng: 20.44075, wikidata: "Q56490178" },  // sosna na Sokolicy
    "dab-uparty-mazur": { lat: 52.78761, lng: 20.47328, wikidata: "Q9249151" },  // Dąb Uparty Mazur
    "dab-bolko": { lat: 51.25678, lng: 23.6985, wikidata: "Q891397" },  // Dąb Bolko
    "dab-bazynskiego": { lat: 54.29583, lng: 19.48742, wikidata: "Q812618" },  // Dąb Bażyńskiego
    "dab-mieszko": { lat: 49.83877, lng: 18.6416, wikidata: "Q21974354" },  // Dąb Mieszko
    "dab-chrobry-bialobrzegi": { lat: 52.45111, lng: 19.93639, wikidata: "Q110388812" },  // Dąb Chrobry w Białobrzegach
    "kasztanowiec-jastarnia": { lat: 54.6968, lng: 18.68222, wikidata: "Q28672969" },  // Kasztanowiec biały w Jastarni
    "dab-jozef": { lat: 49.8687, lng: 21.64408, wikidata: "Q48847385" },  // Dąb Józef
    "platan-olbrzym": { lat: 52.9665, lng: 14.4297, wikidata: "Q21856069" }  // Platan Olbrzym
  }
};
