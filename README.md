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

## Igra: razine, nizovi i animacije

Svaka cjelina je jedna **razina** s vlastitom trakom napretka (`x / y` točnih odgovora).

- **Točan odgovor** — polje poskakne, kvačica uleti, sitne iskrice, kratki zvuk.
- **Netоčan odgovor** — polje se zatrese, niži tonski signal, niz se prekida.
- **Niz** (uzastopni točni odgovori) broji se u traci s tipkama; na svakih 5 stiže poruka.
- **Razina svladana** — konfeti, poruka i 🏆 uz naslov, a pilula u navigaciji pozeleni.
- **Sve razine** — veliki konfeti preko cijelog ekrana.
- Ljestvica u zaglavlju više nije samo ukras: puni se kako raste broj točnih odgovora.
- Gumb 🔊 u traci isključuje zvuk.

Detalji izvedbe, ako se bude mijenjalo:

- Sve animacije idu preko `element.animate()` (Web Animations API), ne preko CSS klasa —
  klase `ok`/`no` se stalno prepisuju pa se CSS keyframe animacija ne bi ponovno pokrenula.
- `setState()` je jedino mjesto koje piše `ok`/`no`. Efekti se ispaljuju **samo na promjenu
  stanja**, pa drugi klik na „Provjeri odgovore" ne ponavlja konfete i zvukove.
- Kad jedan klik na „Provjeri odgovore" riješi više od 6 novih polja, umjesto niza pojedinačnih
  efekata ide jedna zajednička čestitka.
- `prefers-reduced-motion: reduce` gasi animacije **i** stvaranje čestica (ostaju samo boje).
- Čestice se brišu i preko `setTimeout` fallbacka — ako korisnik prebaci karticu, animacija
  stane i `Animation.finished` nikad ne stigne.
- Napredak se **ne pamti** između posjeta; osvježavanje stranice počinje ispočetka.

## PIN za rješenja

Gumb **Pokaži rješenja** traži PIN. Zadani PIN je `1234`, otključanje vrijedi do zatvaranja
kartice (`sessionStorage`). U kodu je samo SHA-256 otisak PIN-a (`PIN_HASH` u `index.html`),
ne i sam PIN. Za promjenu otvori konzolu preglednika (F12) i pokreni:

```js
crypto.subtle.digest("SHA-256", new TextEncoder().encode("noviPIN"))
  .then(b => console.log([...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("")))
```

pa dobiveni niz upiši u `PIN_HASH`.

Ovo zaustavlja dijete, ne i nekoga tko zna otvoriti *View source* — točni odgovori su i dalje
u `data-answer`. Za stvarnu zaštitu trebalo bi odgovore držati kao hash, a tekst rješenja
šifrirati (AES-GCM) lozinkom, ili preseliti stranicu na hosting s pravim loginom.

## Prilagodba za tablet

- Osnovna veličina teksta 19–20 px, polja i tipke minimalno 54 px visine (Appleova i
  Googleova preporuka za dodirni cilj je 44–48 px).
- Polja za upis imaju `inputmode="decimal"` kad je odgovor broj → na tabletu se otvara
  brojčana tipkovnica. Kod tekstualnih odgovora (npr. ime iz tablice) ostaje slovna,
  uz isključen autocapitalize i autocorrect.
- Traka s tipkama je `position:sticky` na dnu ekrana, pa je „Provjeri odgovore" dostupna
  bez skrolanja natrag na vrh.
- Navigacija po cjelinama je vodoravna traka koja se skrola prstom umjesto da se lomi
  u više redova.
- Enter (odnosno „next" na tipkovnici tableta) skače u sljedeće polje. Polje se dodatno
  provjeri samo kad dijete iz njega izađe.
- U portretu su tipke pune širine; ispod 400 px širine smanjuje se rub stranice.
