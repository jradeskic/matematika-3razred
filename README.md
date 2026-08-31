# Matematika — ponavljanje prije 3. razreda

Statična stranica sa zadacima iz gradiva 2. razreda (hrvatski kurikulum): brojevi do 100,
zbrajanje i oduzimanje s prelaskom desetice, tablica množenja i dijeljenja, geometrija,
mjerenje, podaci. Odgovori se upisuju i provjeravaju u pregledniku, bez servera.

Sve je u jednoj datoteci: `index.html` (nema buildanja, nema dependencyja osim Google Fonts CDN-a).

## Objava na GitHub Pages

1. Napravi novi javni repozitorij na GitHubu, npr. `matematika-3razred`.
2. Dodaj `index.html` (i ovaj README) u korijen repozitorija i pushaj na branch `main`:
   ```bash
   git init
   git add .
   git commit -m "Zadaci za ponavljanje matematike"
   git branch -M main
   git remote add origin git@github.com:KORISNIK/matematika-3razred.git
   git push -u origin main
   ```
3. U repozitoriju: **Settings → Pages → Build and deployment**
   - Source: *Deploy from a branch*
   - Branch: `main`, folder: `/ (root)` → **Save**
4. Nakon minutu-dvije stranica je na
   `https://KORISNIK.github.io/matematika-3razred/`

Bitno: `index.html` mora biti u korijenu (ili u `/docs` ako u koraku 3. odabereš taj folder),
inače Pages prikaže 404.

## Izmjene zadataka

Svi zadaci su u JS objektu `DATA` na dnu `index.html`. Struktura:

```js
{id:"c3", title:"Naslov cjeline", lead:"Podnaslov", tasks:[
  {t:"calc", q:"Tekst zadatka", items:[["3 · 7","21"], ["6 · 8","48"]]},
  {t:"note", q:"Zadatak za vježbenicu", solution:"opcionalna napomena"}
]}
```

- `t:"calc"` → za svaki `[prikaz, odgovor]` generira se polje za upis i provjera.
  Provjera ignorira razmake i tretira `.` i `,` kao isto (3.70 = 3,70).
- `t:"note"` → zadatak koji se rješava na papiru, bez polja za upis.
- `table:[[...]]` → opcionalna tablica iznad polja za upis.

Odgovori su u HTML-u (`data-answer`), pa su vidljivi u *View source*. Za dijete od 8 godina
to je u praksi dovoljno, ali ako to smeta, jedina prava opcija je provjera na serveru —
statični Pages to ne može.
