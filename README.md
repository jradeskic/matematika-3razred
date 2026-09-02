# Ponavljanje gradiva — 2., 5. i 6. razred

Statična stranica sa zadacima iz hrvatskog kurikuluma, za dva predmeta — **matematiku** i
**hrvatski jezik** — i tri razreda: **2., 5. i 6.** Razred se bira pilulama u zaglavlju, uz
prekidač predmeta. Gradivo 2. razreda pokriva brojeve do 100, zbrajanje i oduzimanje s
prelaskom desetice, tablicu množenja i dijeljenja, geometriju, mjerenje i podatke (matematika),
te veliko početno slovo, č i ć, ije i je, glasove i slova, rečenicu, vrste riječi i značenje
(hrvatski). Odgovori se upisuju i provjeravaju u pregledniku, bez servera. Vidi
[Razredi i predmeti](#razredi-i-predmeti) niže.

Sve preko `<script src>`, nema buildanja, nema dependencyja osim Google Fonts CDN-a.

## Objava na GitHub Pages

1. Napravi novi javni repozitorij na GitHubu, npr. `matematika-3razred`.
2. Dodaj `index.html`, svih šest datoteka `zadaci-<predmet>-<razred>.js` (i ovaj README) u
   korijen repozitorija i pushaj na branch `main`:
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
  i dvadeset rečenica („Bravo!", „Majstore!", „Tako se to radi!"…).
- Netočan: pet izvedbi (trese se, lupi nogom, napuše se, okrene se, vrti glavom) i dvadeset
  rečenica („Ajme meni!", „Grrr!", „Probaj opet!"…). Izraz lica se mijenja: obrve se skupe,
  obrazi pocrvene, usta se nadure.
- Svladana razina ima osam vlastitih rečenica po liku.
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

## Razredi i predmeti

Stranica ima dva predmeta: **Matematiku** i **Hrvatski jezik**, svaki dostupan za pet razreda:
**2., 4., 5., 6. i 7.** Predmet se bira pri prvoj prijavi, a razred **ne** — počinje na 2. razredu.
Oba se mijenjaju prekidačima u zaglavlju: gornji red su pilule razreda, donji pilule predmeta.
Nadimak i avatar su zajednički za sve razrede i
predmete, a napredak se pamti odvojeno po **paru** razred/predmet. Stranica se otvori na
zadnje biranom razredu i predmetu.

Konfiguracija stoji u tri objekta u `index.html`:

- `PREDMETI[predmet]` — `{ naziv, traka, provjera, znakovi }`, jedan zapis po predmetu.
- `RAZREDI[razred]` — `{ naziv, kratko }`, jedan zapis po razredu (trenutno `"2"`, `"4"`, `"5"`, `"6"`, `"7"`).
- `GRADIVO[razred][predmet]` — `{ title, naslov, uvod, zadaci }`, sadržaj za taj par.

Zadaci stoje izvan `index.html`, jedna datoteka po paru razred/predmet:

```
index.html                     mehanika: razine, avatar, prijava, pamćenje, prekidači
zadaci-<predmet>-<razred>.js   const ZADACI_<PREDMET>_<RAZRED> = [...]
```

Dodavanje razreda: nova stavka u `RAZREDI`, nova grana u `GRADIVO` i po jedna datoteka sa
zadacima za svaki predmet. Dodavanje predmeta: nova stavka u `PREDMETI` i po jedna datoteka
sa zadacima za svaki razred.

**Sadržaj po razredu.** Svaka cjelina u datotekama sa zadacima nosi u komentaru oznaku ishoda
iz kurikuluma na koji se odnosi:

| Skup | Cjelina | Polja | Ishodi |
|---|---|---|---|
| Matematika 2. | 7 | 85 | gradivo 2. razreda |
| Hrvatski 2. | 7 | 85 | gradivo 2. razreda |
| Matematika 4. | 9 | 150 | `MAT OŠ A.4.1–4`, `B.4.1`, `C.4.1–5`, `D.4.1–2`, `E.4.1–2` — svi ishodi 4. razreda |
| Hrvatski 4. | 9 | 131 | jezgra `OŠ HJ A.4.5`; `A.4.6`; `B.4.2`; `A.4.1–4` kao „note" |
| Matematika 5. | 8 | 134 | `MAT OŠ A.5.1–6`, `B.5.1–2`, `C.5.1–3`, `D.5.1–5`, `E.5.1` |
| Hrvatski 5. | 8 | 106 | jezgra `OŠ HJ A.5.5`, `A.5.6`; `B.5.2`; `A.5.1–4` kao „note" |
| Matematika 6. | 9 | 132 | `MAT OŠ A.6.1–9`, `B.6.1`, `C.6.1–3`, `D.6.1–5`, `E.6.1` — svi ishodi 6. razreda |
| Hrvatski 6. | 8 | 87 | jezgra `OŠ HJ A.6.5`, `A.6.6`; `B.6.2`; `A.6.1–4` kao „note" |
| Matematika 7. | 10 | 188 | `MAT OŠ A.7.1–5`, `B.7.1–4`, `C.7.1–3`, `D.7.1–6`, `E.7.1` — svi ishodi 7. razreda |
| Hrvatski 7. | 7 | 116 | jezgra `OŠ HJ A.7.5`; `A.7.6`; `B.7.2`; `A.7.1–4` kao „note" |

Hrvatski 7. ima osam cjelina, ali `h8` sadrži same `note` zadatke, pa nema polja ni
`data-total` — zato u stupcu *Cjelina* stoji 7.

Što **nije** pokriveno automatskom provjerom, i zašto:

- Hrvatski, domena **C (Kultura i mediji)** i ishodi `B.x.1`, `B.x.3`, `B.x.4` — traže razgovor,
  posjet kulturnom događaju ili stvaralački rad. Dio je zahvaćen `note` zadacima u cjelini h8.
- Hrvatski, produktivni ishodi (govorenje, slušanje, čitanje, pisanje) idu kao `note` zadaci za
  vježbenicu — dijete ih rješava u bilježnici, stranica ih ne ocjenjuje.

Napomena o `MAT OŠ D.6.3`: ta oznaka u NN 7/2019 stoji u istoj ćeliji kao `A.6.9`, nad
zajedničkim tekstom ishoda „Primjenjuje računanje postotnoga iznosa zadane osnovne vrijednosti".
To su isti ishod naveden u dvjema domenama (isti uzorak kao `A.7.1` + `D.7.6`), pa ga cjelina
o postocima pokriva — matematika 6. razreda time pokriva **sve** ishode svojega razreda.

Kurikulumski izvori:

- Matematika: *Odluka o donošenju kurikuluma za nastavni predmet Matematika za osnovne škole i
  gimnazije*, NN 7/2019 —
  <https://narodne-novine.nn.hr/clanci/sluzbeni/2019_01_7_146.html>
- Hrvatski jezik: *Odluka o donošenju kurikuluma nastavnoga predmeta Hrvatski jezik za osnovne
  škole i gimnazije*, NN 10/2019 —
  <https://narodne-novine.nn.hr/clanci/sluzbeni/2019_01_10_215.html>

### Tipovi zadataka

- `calc` → za svaki `[prikaz, odgovor]` polje za upis. Odgovor dulji od 14 znakova
  dobiva široko polje s oznakom nad njim.
- `izbor` → za svaki `[prikaz, [ponuđeno, …], odgovor]` red tipki za tap. Točan odgovor
  mora biti među ponuđenima. Tipke se premješaju pri iscrtavanju. Odabrana vrijednost
  ide u skriveno polje, pa razine, ključevi, kvačice i avatar rade isto kao kod upisa.
- `note` → zadatak za vježbenicu, bez polja.

Uz `calc` i `izbor`, zadatak može deklarirati polje `oblik`, koje kaže kako se odgovor
razlaže i uspoređuje, neovisno o predmetu:

| `oblik` | Primjer | Pravilo usporedbe |
|---|---|---|
| `broj` | `-5`, `2,5` | ASCII i tipografski minus su isti, `.` i `,` su isti decimalni znak, nule na kraju ne mijenjaju vrijednost |
| `razlomak` | `3/4`, `1 1/2` | uspoređuje se vrijednost, ne zapis — `6/8` je isto što i `3/4`, mješoviti brojevi su dopušteni |
| `popis` | `40, 50, 60` | poredak je bitan, razmaci nisu |
| `tekst` | `cm²`, `jednakokračan` | doslovna usporedba — dijakritika i eksponenti su bitni |

Gradivo 2. razreda **nema** `oblik` — provjerava se starim pravilom po predmetu (tablica niže).

### Provjera odgovora ovisi o predmetu

| | Matematika | Hrvatski |
|---|---|---|
| veliko/malo slovo | nevažno | bitno (`Ana` ≠ `ana`) |
| č ć š ž đ | — | bitno (`kuca` ≠ `kuća`) |
| `.` i `,` | isto (3.70 = 3,70) | različito |
| razmaci | ignorirani | višak se sabija u jedan |
| završni `. ? !` | — | bitno |
| deklariran `oblik` | nadjačava pravilo predmeta | nadjačava pravilo predmeta |

U hrvatskom, uz polja za upis stoji red tipki **č ć š ž đ**, jer se ta slova na
tabletu bez hrvatske tipkovnice ne mogu upisati. Matematika 5., 6. i 7. razreda dobiva
vlastitu traku znakova (`- / , ² ³`) za razlomke i stupnjeve, a matematika 4. razreda
užu traku (`, ²`) — ondje nema ni negativnih brojeva ni razlomaka.

Odgovori su u HTML-u (`data-answer`), pa su vidljivi u *View source*. Za dijete od 8 godina
to je u praksi dovoljno, ali ako to smeta, jedina prava opcija je provjera na serveru —
statični Pages to ne može.

## Provjere

```bash
python -m http.server 8765
```

Pa otvori `http://localhost:8765/provjere/pokreni.html`. Stranica vrti provjere nad
`index.html` u iframeu i u naslov kartice stavi `PASS (n)` ili `FAIL (n)`. Nema
dependencyja ni buildanja.

**Nije pokriveno provjerom:** izuzimanje skrivenih polja iz skoka na Enter (traka slova
ne smije postati sljedeće polje). `focus()` ne postavlja `activeElement` u iframeu ovoga
harnessa (`document.hasFocus()` je `false`), a jedini drugi opazivi učinak rukovatelja —
pokretanje `check()` na pravom kraju liste — jednak je s filterom i bez njega. Provjereno
je rasuđivanjem čitajući kod, ne automatskom provjerom.

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
