# Ciekawostki: skąd są i jak je sprawdzono (28.10.2026)

Ciekawostki zostały napisane przez Roberta w trzech plikach (grzyby; przyroda; ziemia, niebo, człowiek i kultura). Każdy fakt miał link do źródła. Przed publikacją każdy przeszedł weryfikację:

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

**Ograniczenie, które znamy:** w ślepym audycie 40 losowych faktów „verified” wyszukiwanie doprecyzowało 13, a 1 nie znalazło potwierdzenia. Zgodność z hasłem Wikipedii nie gwarantuje więc pełnej precyzji. Dlatego 707 faktów z liczbami i datami sprawdzono wyszukiwaniem w niezależnych źródłach (28.10.2026): 352 potwierdzone, 113 do poprawki, 242 bez potwierdzenia. Szczegóły: [weryfikacja-liczb-2026-10.md](weryfikacja-liczb-2026-10.md). Fakty do poprawki i bez potwierdzenia strona ukrywała do 31.10.2026, kiedy zmiany z [zmiany-dla-generatora-2026-10.json](zmiany-dla-generatora-2026-10.json) wprowadzono do plików (opis niżej).

`docs/content/poprawki-2026-10.json` to potwierdzone poprawki do obecnej treści kart: nazwy, statusy ochrony, siedliska, rekordy. Wprowadzono je w październiku 2026 (`poprawki-2026-10-wdrozenie.md`).

**Audyt z 30.10.2026:** zewnętrzny audyt zakwestionował 8 faktów. Po ponownym sprawdzeniu ukryto 3 (F0217, F1070, F1349), przywrócono F1073 (Siedlce: oficjalny rekord zimna według IMGW-PIB) i zmieniono poprawkę F1325. Szczegóły: [audyt-2026-10-30.md](audyt-2026-10-30.md).

## 31.10.2026: poprawki wprowadzone w repozytorium

Generatora (`build_site_data.py`) nie ma w repozytorium ani w dostępnych sesjach. Dlatego plik [`zmiany-dla-generatora-2026-10.json`](zmiany-dla-generatora-2026-10.json) wprowadzono prosto do `data/facts/*.facts.js`. Przed każdą zmianą treści (`replace_facts`, `skip_facts`) skrypt sprawdzał, że obecny tekst ciekawostki jest tym, który opisuje plik zmian.

- **Nowe brzmienie:** 322 ciekawostki (`replace_facts`).
- **Potwierdzone:** 349 ciekawostek dostało status i niezależne źródła ze sprawdzenia liczb (`confirm_facts`).
- **Usunięte:** 43 ciekawostki (`skip_facts`) i 9 ciekawostek czterech kart usuniętych z atlasu (`skip_cards`).
- **Źródła (`fix_sources`):**
  - F0209 linkuje do nowego adresu listu Darwina.
  - Usunięto dwa źródła, które w audycie 30.10 nie działały, a z tego środowiska nie dało się ich sprawdzić. Obie ciekawostki mają inne źródła (Wikipedia):
    - przy F1319 (Solina): `http://doi.prz.edu.pl/pl/pdf/biis/151`;
    - przy F0600 (bielik): PDF „Bielik – nasz ptak narodowy” na `uwb.edu.pl`.
- **Nowa szuflada „Rekordy atmosferyczne”:** 35 ciekawostek z `new_facts` (F1508–F1542), z ikonami dobranymi do treści.
- **Nic już nie jest ukryte:** każda ciekawostka z listy `WITHDRAWN` w `data/collections.js` dostała nowe brzmienie albo zniknęła.
- **Karty bez ciekawostek:** trzy karty zostały bez ciekawostek: „Sosna Kandelabrowa”, „Godziszów i Zadni Gerlach” i „Żuławskie domy podcieniowe”. Według decyzji Roberta z 31.10.2026:
  - „Godziszów i Zadni Gerlach” usunięto z atlasu (`WITHDRAWN.cards`, `skip_cards`). Rekordowego zdjęcia z 30.01.2025 (246,1 km) nie potwierdza żadne niezależne źródło, a widok Tatr z daleka opisuje karta „Tatry z Wyżyny Lubelskiej”. „Atmosfera i astronomia” ma teraz 32 karty;
  - „Sosna Kandelabrowa” mówi w polu „Gdzie rośnie” tylko, że sosna obumarła, bez wieku i daty, których sprawdzenie nie potwierdziło.

Przegląd tych zmian (31.10.2026) znalazł kilka miejsc, w których odkryte ciekawostki nie zgadzały się z resztą atlasu. Poprawiono je w plikach:
- **F1148 (Szczeliniec Wielki):** bez wysokości. Podawała 919 m, a F0885 w „Formacjach skalnych” wyjaśnia, że szczyt ma 922 m, a 919 m to punkt geodezyjny.
- **F1126 (Kolorowe Jeziorka):** bez „okresowego Żółtego” stawu, który sprawdzenie F0882 uznało za błąd.
- **F0058 (koralówka):** „Gromadzi toksyczny arsen.”, bez sugestii, gdzie zbierać ten zagrożony gatunek.
- **F1530 (halny 1968):** szyk zdania jak po angielsku: to prąd strumieniowy wzmocnił efekt halnego.
- **Żagwiak łuskowaty:** pole „Kiedy” na karcie podaje to, co poprawiona F0200 („od maja do października”, grzyby.pl), a nie marzec i luty, które sprawdzenie odrzuciło.
- **Źródła:** sześć ciekawostek podawało tę samą stronę dwa razy (z ukośnikiem na końcu, z „www.” albo z zakodowanymi nawiasami), w szufladzie rekordów etykiety źródeł nie mają już przecinków ani dat.
- **Nowa ciekawostka F1543 (Kasprowy Wierch):** 388 cm śniegu w marcu 1939 r., za artykułem w „Przeglądzie Geofizycznym” (2018) opartym na archiwum IMGW-PIB (decyzja Roberta z 31.10.2026, `rekordy-atmosferyczne-2026-10.md`).

Później tego dnia F1528 (Kalisz) dostała status `verified` zamiast `checked`: rocznik GUS Poznań 2023 dał się otworzyć i potwierdza 507, 494 i 437 mm, a przypis „c” przy Kaliszu dotyczy tylko zachmurzenia (`rekordy-atmosferyczne-2026-10.md`).

## 1.11.2026: źródła, które wcześniej się nie otwierały

Decyzją Roberta dopuszczono w ustawieniach środowiska kolejne strony, m.in. IMGW-PIB, GUS i Lasów Państwowych. Dzięki temu sprawdzono jeszcze raz całą szufladę „Rekordy atmosferyczne” (36 ciekawostek i 17 kart) i źródła trzech ciekawostek, które nie działały w audycie 30.10.2026 (F0209, F1319, F0600). Każdą ciekawostkę szuflady oraz F0209 i F1319 przeczytały dwa niezależne odczyty, na pełnych tekstach tych źródeł, które się otwierają. PDF przy F0600 i część źródeł szuflady nadal się nie otwierają (niżej i w `rekordy-atmosferyczne-2026-10.md`).

- **Szuflada „Rekordy atmosferyczne”:** 18 ciekawostek ma teraz status `verified`, a 3 mają nowe brzmienie (`corrected`: F1522, F1526, F1527). F1510 i F1511 zostają `checked`. Kilka ciekawostek i kart dostało nowe źródła, głównie IMGW-PIB. Kamienica 2024 zostaje poza atlasem (decyzja Roberta z 1.11.2026), choć wartość 254,5 mm znaleziono w publikacji GUS i w danych IMGW-PIB. Szczegóły: [rekordy-atmosferyczne-2026-10.md](rekordy-atmosferyczne-2026-10.md).
- **Źródła usunięte albo zmienione 31.10.2026 (`fix_sources`, wyżej):**
  - F0209 (Darwin i rosiczki): list Darwina do Ch. Lyella z 24.11.1860 otwiera się i ma cytat z ciekawostki („I care more about Drosera than the origin of all the species in the world”). Link prowadzi teraz wprost do adresu, na który przekierowuje dawny (`/view/letters/DCP-LETT-2996`). Status `verified`.
  - F1319 (Solina): artykuł Politechniki Rzeszowskiej (JCEEA 2014) otwiera się pod adresem `https://` i wrócił jako źródło. Podaje, że Solina to zbiornik zaporowy o największej pojemności w Polsce, a przy normalnym poziomie piętrzenia (420 m n.p.m.) mieści 472 mln m³. Ciekawostka mówi teraz dokładnie to. Wcześniej brzmiała „Jezioro Solińskie ma największą pojemność w Polsce”, bez słowa o zbiornikach zaporowych. Status `corrected`.
  - F0600 (bielik): PDF na `uwb.edu.pl` nadal się nie otwiera (serwer odpowiada błędem 503). Ciekawostka zostaje bez zmian, z dwoma hasłami Wikipedii.

### Ciekawostki „checked” (1.11.2026)

Na prośbę Roberta sprawdzono jeszcze raz wszystkie 470 ciekawostek ze statusem `checked`, na pełnych tekstach źródeł, które się stąd otwierają (głównie Wikipedia). Każdą przeczytały dwa niezależne odczyty, a spory i poprawki rozstrzygał trzeci. Potem przegląd sprawdził poprawki, ich karty i losową próbę ciekawostek `verified`.
- 291 ma teraz status `verified` (16 z nich po dopisaniu czytelnego źródła, które potwierdza całość);
- 96 ma nowe brzmienie (`corrected`), zgodne ze źródłami;
- 83 zostaje `checked`, bo źródła, które je potwierdziły, są stąd zablokowane;
- przy okazji poprawiono cztery karty, które mówiły to, co poprawka usunęła z ciekawostki, i link do Wikipedii z literówką w tytule (Grywałd).

Potem Robert dopuścił kolejne strony (m.in. `eli.gov.pl` z pełnymi tekstami ustaw i rozporządzeń, `msaweb.org`, `acta-zoologica-bulgarica.eu`, `doi.org`). Przy 16 z 83 ciekawostek `checked` któreś źródło dało się wtedy przeczytać. Sprawdzono je tak samo:
- 10 ma teraz status `verified` (6 z nich po dopisaniu czytelnego źródła);
- 4 mają nowe brzmienie (`corrected`), w tym F0747 (żołędnica): wymarcie w Polsce to wniosek pracy z 2024 r., a nie oficjalna kategoria, więc ciekawostka i karta mówią teraz „według analiz opublikowanych w 2024 r.”;
- 2 zostają `checked`.

Pozostałe 69 ciekawostek `checked` czeka na strony, które nadal są zablokowane, głównie wydawnictwa naukowe, do których przekierowuje `doi.org` (`cambridge.org`, `pubs.geoscienceworld.org`). Szczegóły, wszystkie poprawki i dopisane źródła: [sprawdzenie-checked-2026-11.md](sprawdzenie-checked-2026-11.md).

Teraz atlas ma 1458 ciekawostek na 628 kartach: 69 `checked`, 856 `verified` i 533 `corrected`.

**Od tej pory ciekawostki poprawia się w `data/facts/*.facts.js`, także w szufladzie rekordów.** Każda potrzebuje źródła i statusu według tabeli wyżej. Ciekawostkę, która czeka na poprawkę, można ukryć w `data/collections.js` (`WITHDRAWN.facts`, z powodem). `npm run test:facts` pilnuje, żeby nie wróciło to, co sprawdzenia z 28–31.10.2026 usunęły albo poprawiły, pod żadnym id i w żadnym języku:
- ciekawostki usuniętych kart i teksty ciekawostek pominiętych;
- dawne brzmienia poprawionych ciekawostek (PL i EN, zapisane w pliku zmian: `pl_old`, `en_old`, a przy pominiętych `pl`, `en`);
- dawne adresy źródeł, które zastąpiono nowymi.
