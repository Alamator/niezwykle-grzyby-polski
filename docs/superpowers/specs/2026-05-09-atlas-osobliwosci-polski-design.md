# Atlas Osobliwosci Polski - design

## Cel

Przeksztalcic obecny projekt "Niezwykle Grzyby Polski" w wspolna, statyczna aplikacje edukacyjna "Atlas Osobliwosci Polski", ktora moze rosnac o kolejne kolekcje przyrodnicze.

## Zakres pierwszego wdrozenia

Pierwsze wdrozenie ma zawierac dwie kolekcje:

- Grzyby: obecne 60 pozycji i istniejace zdjecia oraz zrodla.
- Owady: 30 pozycji z przygotowanej listy, na start z fallbackami wizualnymi i miejscem na przyszle zdjecia/licencje.

Kazda kolekcja korzysta z tego samego zestawu widokow: Atlas, Nauka, Quiz, Zrodla. Tryby Konkurs i Powtorki zostaja usuniete z glownej nawigacji i z logiki aplikacji.

## Doswiadczenie uzytkownika

Pierwszym ekranem jest wybor kolekcji. Kafle pokazuja nazwe, liczbe pozycji, krotki opis i akcje wejscia. Po wyborze kolekcji aplikacja pokazuje naglowek danej kolekcji, przycisk powrotu do wyboru oraz cztery zakladki: Atlas, Nauka, Quiz, Zrodla.

Widok Atlas pozwala szukac, filtrowac po kategoriach i otwierac szczegoly. Widok Nauka pokazuje fiszki z ciekawostka i odpowiedzia. Widok Quiz generuje spokojny quiz z danych kolekcji. Widok Zrodla pokazuje zasady tresci oraz tabele atrybucji zdjec, z oznaczeniem pozycji do uzupelnienia.

## Dane

Dane grzybow pozostaja w dotychczasowych plikach. Nowy plik owadow dostarcza obiekt kolekcji z tym samym kontraktem: `id`, `name_pl`, `name_lat`, `category`, `hook`, `quiz_angle`, `safety_note`, dane wystepowania i pola zdjec/licencji.

Wspolny rejestr kolekcji powstaje po zaladowaniu danych grzybow i owadow. Aplikacja czyta `window.ATLAS_APP_DATA.collections`, a nie bezposrednio `window.MUSHROOM_APP_DATA`.

## Zasady tresci i bezpieczenstwo

Opisy sa krotkie, autorskie i edukacyjne. Przy gatunkach chronionych lub wrazliwych komunikaty nie zachecaja do odlawiania, zbierania ani niepokojenia. Przy owadach strona nie ma sluzyc do pewnego oznaczania gatunkow w terenie ani do porad dotyczacych kontaktu z gatunkami toksycznymi lub pasozytniczymi.

## Testowanie

Walidator ma sprawdzac, ze:

- strona ma nowy tytul i nie pokazuje zakladek Konkurs/Powtorki,
- `index.html` laduje dane owadow i rejestr kolekcji przed aplikacja,
- istnieja kolekcje `grzyby` i `owady`,
- grzyby maja 60 pozycji, a owady 30 pozycji,
- kazda kolekcja ma widoki Atlas, Nauka, Quiz, Zrodla,
- pozycje maja podstawowe pola potrzebne do atlasu, fiszek, quizu i zrodel.
