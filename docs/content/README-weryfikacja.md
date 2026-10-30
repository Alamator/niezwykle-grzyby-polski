# Ciekawostki: skąd są i jak je sprawdzono (28.10.2026)

Ciekawostki napisał Robert, w trzech plikach (grzyby; przyroda; ziemia, niebo, człowiek i kultura). Każdy fakt miał link do źródła. Przed publikacją każdy przeszedł weryfikację:

1. **Linki:** 864 adresy pobrane. Hasła Wikipedii przez API MediaWiki, akty prawne jako tekst PDF (Dz.U. 2014 poz. 1408 i 1409, tekst jednolity Dz.U. 2022 poz. 2380).
2. **Zgodność ze źródłem:** dwa niezależne modele (Claude Opus 5.5 i Sonnet 5.5) czytały pełny tekst źródła i oceniały każdy fakt. Fakty o ochronie gatunkowej sprawdzano zawsze także z właściwym rozporządzeniem.
3. **Spory:** gdy modele się nie zgadzały albo źródło pokrywało fakt tylko częściowo, Opus rozstrzygał na pełnych tekstach wszystkich źródeł faktu. Zostawiał fakt, przycinał zdanie do tego, co mówi źródło, albo odsyłał dalej.
4. **Wyszukiwanie:** niedostępne źródła, wątpliwości autora, sprzeczności i **wszystkie fakty z superlatywami** (największy, najstarszy, jedyny, pierwszy) sprawdzono wyszukiwaniem w źródłach instytucjonalnych: NID, IMGW, PIG-PIB, GDOŚ, parki, muzea, publikacje.

Statusy w `data/facts/*.facts.js`:

| status | znaczenie | liczba |
|---|---|---|
| `checked` | potwierdzone wyszukiwaniem w niezależnym źródle | 139 |
| `verified` | zgodne ze wskazanym źródłem; ocena dwóch modeli | 1 019 |
| `corrected` | brzmienie poprawione tak, by zgadzało się ze źródłami | 316 |

12 faktów bez potwierdzenia nie trafiło na stronę.

**Ograniczenie, które znamy:** w ślepym audycie 40 losowych faktów „verified” wyszukiwanie doprecyzowało 13, a 1 nie znalazło potwierdzenia. Zgodność z hasłem Wikipedii nie gwarantuje więc pełnej precyzji. Dlatego 707 faktów z liczbami i datami sprawdzono wyszukiwaniem w niezależnych źródłach (28.10.2026): 352 potwierdzone, 113 do poprawki, 242 bez potwierdzenia. Szczegóły: [weryfikacja-liczb-2026-10.md](weryfikacja-liczb-2026-10.md). Fakty do poprawki i bez potwierdzenia strona ukrywa, dopóki generator nie wprowadzi zmian z [zmiany-dla-generatora-2026-10.json](zmiany-dla-generatora-2026-10.json).

`docs/content/poprawki-2026-10.json` to potwierdzone poprawki do obecnej treści kart: nazwy, statusy ochrony, siedliska, rekordy. Wprowadzi je sesja, która robi interfejs.

**Audyt z 30.10.2026:** zewnętrzny audyt zakwestionował 8 faktów. Po ponownym sprawdzeniu ukryto 3 (F0217, F1070, F1349), przywrócono F1073 (Siedlce: oficjalny rekord zimna według IMGW-PIB) i zmieniono poprawkę F1325. Szczegóły: [audyt-2026-10-30.md](audyt-2026-10-30.md).
