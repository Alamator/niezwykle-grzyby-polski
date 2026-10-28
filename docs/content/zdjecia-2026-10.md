# Zdjęcia: sprawdzenie licencji i uzupełnienia (28.10.2026)

Atlas ma **617 kart**. Zdjęcie ma **616** z nich (601 różnych plików z Wikimedia Commons). Bez zdjęcia zostaje jedna karta: gady morskie z Krzyżanowic.

## Jak sprawdzono

- **Wszystkie pliki:** każdy z 601 plików porównany z jego stroną w Wikimedia Commons, przez API Commons. Sprawdzone, czy plik istnieje, kto jest autorem, jaka jest licencja i dokąd prowadzi link licencji.
  - Każdą różnicę przejrzałem ręcznie na stronie pliku (pole autora, szablon licencji, prośba autora o sposób podpisu).
  - Wszystkie 601 plików istnieje.
- **Zdjęcia dotąd niesprawdzone:** 21 zdjęć grzybów miało status „kandydat” (`commons_candidate`). Obejrzałem ich miniatury i opisy w Commons.
  - Każde zdjęcie pokazuje gatunek z karty.
  - Tam, gdzie tekst alternatywny opisywał coś, czego na zdjęciu nie widać, poprawiłem go.
- **Nowe zdjęcia:** wybrane tylko z jasną licencją, z autorem i źródłem na stronie pliku. Przed wyborem obejrzane miniatury.

## Zmiany

### Grzyby

- **Kolczakówka piekąca, lakownica żółtawa, błyskoporek podkorowy:** autor i licencja były wpisane jako „do weryfikacji”. Teraz są uzupełnione ze stron plików:
  - Bernypisa, CC BY-SA 3.0;
  - JovanaKoturov, CC BY-SA 4.0;
  - Tocekas, CC BY-SA 3.0.
- **Grzybówka krwista:** wpis podawał innego autora i licencję, niż ma plik. Na stronie pliku autorem jest Roberto Petruzzo, a zdjęcie jest w domenie publicznej. Wcześniej wpis podawał Archenzo i CC BY-SA 3.0 / GFDL.
- **Krasnoborowik ceglastopory:** autor „Björn S...”, tak jak w Commons. Nazwiska „Sothmann” z dawnego wpisu nie ma na stronie pliku.
- **Siedzuń sosnowy:** nowe zdjęcie z lasu koło Lubniewic (Julo, CC BY-SA 4.0). Stare zdjęcie Commons oznacza jako wymagające sprawdzenia źródła („Files in need of review (sources)”).
- **Opieńka miodowa (świecenie):** link licencji prowadził do pliku. Teraz prowadzi do znaku domeny publicznej.
- **Czareczka długotrzonkowa, lakownica żółtawa, grzybówka krwista, siedzuń sosnowy:** tekst alternatywny opisuje to, co widać na zdjęciu.
- **21 zdjęć ze statusem „kandydat”:** wszystkie sprawdzone i oznaczone jako `commons_verified`.
- **Nieużywany wpis w `photo-pack-v06.js`:** usunięty. Był to muchomor czerwony z autorem „do weryfikacji”; karta ma inne, sprawdzone zdjęcie.

### Pozostałe kolekcje

- **Iskrzyk:** pierwsze zdjęcie na karcie. Pokazuje samca od spodu, z jasnymi narządami świetlnymi na końcu odwłoka.
  - Autor: Francisco Welter-Schultes, licencja CC0.
  - Według opisu pliku gatunek oznaczyli eksperci serwisu kerbtier.de.
- **Bursztyn bałtycki:** autor „W.carter”, tak jak na stronie pliku. Wcześniej wpis podawał imię i nazwisko, których strona pliku nie podaje.
- **Wąż Eskulapa:** link licencji prowadził do CC BY 2.0 zamiast do CC BY-SA 2.0.
- **Tropy dinozaurów z Bałtowa:** licencja CC BY 2.0. Wcześniej wpis podawał CC BY-SA 2.0.
- **Chwytówka w bursztynie:** licencja CC BY-SA 4.0. Wcześniej wpis podawał CC BY-SA 3.0.
- **Linki licencji z `http://` zamienione na `https://`:** fruczak gołąbek, kruszczyca złotawka, jelonek rogacz i Dęby Rogalińskie.

## Sprawdzone i bez zmian

- **Kilka licencji naraz:** dla 8 zdjęć grzybów wpis podaje licencję CC i GFDL, a Commons pokazuje tylko pierwszą z nich. Wszystkie te licencje są na stronach plików.
- **Kulmhof (pomnik):** plik ma dwie licencje, domenę publiczną i CC BY-SA 2.5. Wpis z CC BY-SA 2.5 jest poprawny.
- **Żółciak siarkowy:** autor prosi w szablonie licencji o podpis „Johannes Fabrizius”. Wpis zostaje.
- **Inny zapis tego samego autora:** polskie znaki, kolejność imienia i nazwiska, „derivative work”.
- **Autor podany poza formularzem pliku:** 8 plików ma autora w tekście albo w tabeli na stronie pliku. Każdy wpis zgadza się z tą stroną.

## Bez zdjęcia: gady morskie z Krzyżanowic

- W Commons nie ma zdjęć okazów z Krzyżanowic. Nie znalazło ich wyszukiwanie po miejscowości, po pracy, która je zrewidowała (Madzia, Szczygielski i Wolniewicz 2021, *Acta Palaeontologica Polonica* 66: 99–129), ani po jej DOI.
- Zdjęcie innego okazu mogłoby wyglądać jak okaz z Krzyżanowic. Na stronie dopisek „kadr reprezentatywny” jest tylko w tekście alternatywnym i widzący czytelnik go nie widzi.
- Karta zostaje więc bez zdjęcia, zgodnie z decyzją z 28.10.2026.

## Do decyzji Roberta (poza tym PR)

- **Kadry reprezentatywne:** 123 karty (m.in. płazy i gady 26, minerały 25, ssaki 24, atmosfera 21, skamieniałości 15) mają zdjęcie innego okazu albo miejsca. Podpis „Kadr reprezentatywny” jest tylko w tekście alternatywnym. Można go pokazać pod zdjęciem.
- **Nazwa iskrzyka:**
  - Commons i polska baza biomap.pl używają nazwy *Lamprohiza splendidula*. Biomap podaje rodzaj *Phausis* jako synonim rodzaju *Lamprohiza*.
  - Karta ma nazwę *Phausis splendidula*.
  - Można dopisać synonim albo zmienić nazwę.

## Pilnuje tego test

`npm run test:collections` sprawdza teraz każde zdjęcie we wszystkich kolekcjach:

- plik pochodzi z Commons;
- są autor, licencja, link licencji i tekst alternatywny, bez wpisów „do weryfikacji” i „do uzupełnienia”;
- link licencji prowadzi do licencji, a nie do pliku;
- zdjęcie nie ma statusu `commons_candidate`.

## Uwaga techniczna

Linki `Special:Redirect` przekierowują teraz przeglądarkę na nowy serwer miniatur Wikimedia: `thumb.wikimedia.org`. Strona nie ma nagłówka Content-Security-Policy, więc zdjęcia działają. Gdyby taki nagłówek kiedyś doszedł, musi dopuszczać `thumb.wikimedia.org` i `upload.wikimedia.org`.
