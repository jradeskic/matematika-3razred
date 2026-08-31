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

**Avatar.** Uz svaki odgovor iskoči kraj samog polja — desno od njega, a ako ondje nema
mjesta, lijevo — odglumi svoje i nestane. Ne stoji nigdje stalno, pa ne troši mjesto na
ekranu i ne može pokriti zadatak.

Na ekranu ostaje **3 sekunde** (prije 1,5 s, što je bilo prekratko da se tekst pročita).
Kako lik stoji desno od riješenog polja, dulje zadržavanje bi stajalo preko sljedećeg — zato
se makne prije roka u trenutku kad dijete započne tipkati (`input` u `#main`). Tekst tako
ostaje čitljiv ako se stane, a ne smeta ako se nastavi.

- Točan odgovor: pet različitih izvedbi (skok, vrtnja, ples, bacanje kape, naraste od sreće)
  i deset rečenica („Bravo!", „Majstore!", „Tako se to radi!"…).
- Netočan: pet izvedbi (trese se, lupi nogom, napuše se, okrene se, vrti glavom) i deset
  rečenica („Ajme meni!", „Grrr!", „Probaj opet!"…). Izraz lica se mijenja: obrve se skupe,
  obrazi pocrvene, usta se nadure.
- Ni pokret ni rečenica se ne ponavljaju dva puta zaredom.
- Kod svladane razine ima posebnu izvedbu i svoje rečenice.

Bira se između dva lika:

| | Pokreti | Govor |
|---|---|---|
| **Patuljak** | skok, vrtnja, ples, bacanje kape, naraste od sreće / trese se, lupi nogom, napuše se, okrene se, vrti glavom | obične hrvatske uzrečice |
| **Mali Jedi** | lebdi, vrtnja, maše ušima, diže ruku (Sila), naraste / uši se objese, trese se, ispruži ruku, okrene se, napuše se | obrnuti red riječi i Sila |

Mali Jedi je **izvorni lik** u tom duhu, ne prikaz Baby Yode, i rečenice su napisane za ovu
stranicu, a ne prepisane iz filmova — stranica je javna na GitHub Pagesu, pa se prepoznatljiv
lik i doslovni citati ne koriste.

## Nadimak i pamćenje napretka

Pri prvom otvaranju stranica pita za nadimak i lik. Nadimak **nije prijava** — nema servera,
sve stoji u `localStorage`u tog preglednika na tom uređaju. Tko otvori stranicu na drugom
uređaju ili u drugom pregledniku, počinje ispočetka.

- Nadimak se pojavljuje u zaglavlju („Zdravo, Luka!") i u rečenicama lika.
- Napredak se sprema uz svaki odgovor, pa gasenje preglednika ništa ne gubi. Pri sljedećem
  otvaranju odgovori se vrate, trake razina i trofeji su gdje su bili, i pojavi se poruka
  „Nastavljamo gdje smo stali".
- **„Počni ispočetka" briše i zapamćeno**, ali čuva nadimak i lik. Lik se mijenja preko
  „promijeni" uz pozdrav.
- Ako nadimka nema („Bez imena"), rečenice se koriste u varijanti bez imena.

Detalji izvedbe:

- Polja se pamte po `data-key` u obliku `cjelina|prikaz|redni broj istog prikaza`, ne po redu
  na stranici. Zato preslagivanje ili dodavanje zadataka ne pomakne odgovore u tuđa polja.
  Oznaka se u istoj cjelini smije ponoviti (npr. `broj` dva puta u `c7`) — redni broj ih razdvaja.
- Vraćanje napretka ide kroz `updateProgress({silent:true})`: razine koje su bile svladane
  dobiju trofej bez konfeta, poruka i zvuka, a bravica za veliko finale se odmah postavi da se
  ne okine na prvi sljedeći odgovor. Niz („niz 5 🔥") se ne prenosi kroz posjete, počinje od nule.
- Rečenice su predlošci: `{ime}` je nadimak, a `[ … ]` je dio koji ispada kad nadimka nema —
  zato nikad ne piše „Bravo, !".
- Polje za nadimak je izvan `#main`, a `inputs()` gleda samo unutar `#main`, da se ne bi
  računalo kao 86. polje sa zadatkom.

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

## Poznat problem: traka s tipkama nije stalno na ekranu

`.toolbar` ima `position:sticky; bottom:0`, ali to ne radi ono što gornji opis prilagodbe za
tablet tvrdi. Sticky s `bottom` podiže element **odozdo** u vidokrug dok mu je prirodno mjesto
ispod ruba ekrana; kad ga skrolaš prođeš, element se **ne gura prema dolje** nego odlazi gore
s ostatkom stranice. Kako je traka u dokumentu odmah ispod navigacije, vidljiva je samo prvih
~800 px stranice.

Provjereno mjerenjem na više položaja skrola, i u commitu `8bed7cf` — dakle postoji otprije,
nije uneseno s razinama. (Prvi commit `96bd9ac` nije provjeren.) Za stvarno stalnu traku treba `position:fixed` i rezerviran prostor na dnu
(`padding-bottom` jednak visini trake), ali na tabletu u portretu traka s tipkama pune širine
tada trajno zauzima trećinu ekrana, pa to nije bezbolna promjena. Nije dirano.

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
