# Niezwykłe Grzyby Polski — paczka zdjęć nr 4

Cel: przejście z 30 do 40 zdjęć z atrybucją.

## Co jest w paczce

Plik:

`data/photo-pack-v05.js`

Technicznie nazwa to `v05`, bo:
- `mushrooms.js` = baza,
- `photo-pack-v03.js` = paczka, która dobiła do 20,
- `photo-pack-v04.js` = paczka, która dobiła do 30,
- `photo-pack-v05.js` = nowa, czwarta paczka zdjęć, która ma dobić do 40.

## Jak dodać ręcznie w GitHubie

1. Rozpakuj ZIP.
2. Wejdź w repozytorium: `Alamator/niezwykle-grzyby-polski`.
3. Otwórz folder `data`.
4. Wybierz **Add file → Upload files**.
5. Wrzuć plik: `photo-pack-v05.js`.
6. Zrób commit, np.: `Add photo pack v05`.

## Jak podpiąć w index.html

Otwórz `index.html`, kliknij edycję i znajdź fragment z plikami JS w `<head>`.

Dodaj jedną linię **przed** `./js/app.js`:

```html
<script defer src="./data/photo-pack-v05.js"></script>
```

Finalnie fragment powinien wyglądać tak:

```html
<script defer src="./js/cache-reset.js"></script>
<script defer src="./data/mushrooms.js"></script>
<script defer src="./data/photo-pack-v03.js"></script>
<script defer src="./data/photo-pack-v04.js"></script>
<script defer src="./data/photo-pack-v05.js"></script>
<script defer src="./js/app.js"></script>
```

Zrób commit, np.: `Load photo pack v05`.

## Test po wdrożeniu Vercel

Po deployu otwórz:

`https://niezwykle-grzyby-polski.vercel.app/data/photo-pack-v05.js`

Jeśli widzisz kod JavaScript, plik jest na produkcji.

Potem otwórz stronę w Brave/incognito. Licznik powinien pokazać:

`40 zdjęć z atrybucją`

## Gatunki w paczce

- Krążkówka żyłkowana
- Koralówka / gałęziak groniasty
- Szyszkowiec łuskowaty
- Krwistoborowik szatański
- Wilgotnica czerniejąca
- Lakówka ametystowa
- Chlorówka drobna
- Grzybówka krwista
- Ozorek dębowy
- Żółciak siarkowy
