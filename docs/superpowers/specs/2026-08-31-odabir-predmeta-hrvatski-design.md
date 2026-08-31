# Odabir predmeta i Hrvatski jezik za 2. razred

Datum: 2026-08-31

## Cilj

Stranica je napravljena za matematiku. Uvodi se odabir predmeta i drugi predmet —
Hrvatski jezik, gradivo 2. razreda — s naglaskom na veliko i malo početno slovo,
č/ć i ije/je. Sva zajednička mehanika (razine, avatar, prijava, pamćenje napretka)
ostaje jedna i dijeli se između predmeta.

## Odluke

| Odluka | Izabrano | Zašto |
|---|---|---|
| Način odgovora | Mješovito: tap za slova, upis za riječi i rečenice | č ć š ž đ se na tabletu bez hrvatske tipkovnice ne mogu upisati; drill na slovima ide tapom, pisanje ostaje pisanje |
| Odabir predmeta | U prijavi + prekidač u zaglavlju | Nadimak i avatar su zajednički, napredak odvojen, stranica se otvori na zadnje biranom predmetu |
| Obuhvat hrvatskoga | 7 cjelina, 85 polja | Isti obujam i osjećaj igre kao matematika |
| Organizacija datoteka | Zadaci u zasebne `.js` datoteke | `index.html` bi inače narastao na ~100 KB; uređivanje zadataka postaje pregledno |

## Arhitektura

### Datoteke

```
index.html             mehanika: razine, avatar, prijava, pamćenje, prekidač predmeta
zadaci-matematika.js   const ZADACI_MATEMATIKA = [...]   (današnji DATA, prenesen neizmijenjen)
zadaci-hrvatski.js     const ZADACI_HRVATSKI = [...]     (novo)
```

Učitavaju se običnim `<script src>` prije glavne skripte. Bez buildanja, bez
dependencyja, radi na GitHub Pagesu i preko `file://`.

### Registar predmeta

```js
const PREDMETI = {
  matematika: {
    naziv:   "Matematika",
    naslov:  "Ponavljamo matematiku<br>prije 3. razreda",
    uvod:    "Gradivo 2. razreda: brojevi do 100, …",
    traka:   "brojevi",          // koja se traka crta u zaglavlju
    provjera:"broj",             // koje pravilo usporedbe odgovora
    zadaci:  ZADACI_MATEMATIKA
  },
  hrvatski: {
    naziv:   "Hrvatski jezik",
    naslov:  "Ponavljamo hrvatski<br>prije 3. razreda",
    uvod:    "Gradivo 2. razreda: veliko početno slovo, č i ć, ije i je, …",
    traka:   "abeceda",
    provjera:"rijec",
    zadaci:  ZADACI_HRVATSKI
  }
};
```

### Iz statičnog HTML-a u generirano

Ovo je danas ručno napisano u `index.html` i mora se graditi iz aktivnog predmeta:

- `<title>`
- naslov (`h1`) i uvod (`p`) u zaglavlju
- **`<nav>` sa 7 linkova na cjeline** — danas ručno napisan
- traka u zaglavlju i njezine oznake (`0 / 50 / 100`)

`#main` se već generira i ostaje kako je.

## Provjera odgovora

Razdvaja se po predmetu. Ovo je najosjetljiviji dio jer matematika mora nastaviti
raditi identično.

| | Matematika (`broj`) | Hrvatski (`rijec`) |
|---|---|---|
| veliko/malo slovo | nevažno | **bitno** — `Ana` ≠ `ana` |
| č ć š ž đ | — | **bitno** — `kuca` ≠ `kuća` |
| `.` i `,` | isto (`3.70` = `3,70`) | različito |
| razmaci | ignorirani | višak se sabija u jedan |
| završni `. ? !` | — | **bitno**, rečenični znak se uči |

```js
// matematika: današnji norm(), prenesen bit za bit
const provjeraBroj = (upis, odgovor) => norm(upis) === norm(odgovor);

// hrvatski: sabij razmake, ništa drugo
const ocisti = t => t.toString().trim().replace(/\s+/g, " ");
const provjeraRijec = (upis, odgovor) => ocisti(upis) === ocisti(odgovor);
```

Odgovori u hrvatskom moraju biti jednoznačni — nijedan zadatak s upisom ne smije
imati dva jednako točna rješenja. Zato u cjelini 7 nema upisa istoznačnica
(„velik" → golem / ogroman / silan), samo tap između ponuđenih.

## Tipovi zadataka

Postojeći ostaju: `calc` (polja za upis) i `note` (vježbenica). Dodaje se jedan.

```js
{t:"izbor", q:"Č ili Ć?", items:[
   ["ku_a",   ["ć","č"], "ć"],
   ["_ovjek", ["č","ć"], "č"]
]}
```

Prikazuje se kao prikaz (`ku_a`) i dvije-tri tipke za tap. Koja se provjera
koristi određuje **predmet**, ne tip zadatka — tako ostaju samo tri pojma.

Prikaz smije biti **prazan niz**; tada se iscrtavaju samo tipke. Tako rade cjelina
h3 (tipke su cijele riječi, `dijete` / `djete`) i pitanja oblika „Koji je zapis
točan?", gdje je pitanje već u `q`.

### Kako se `izbor` uklapa u postojeću mehaniku

Svaki `izbor` dobiva **skriveno polje** `<input type="text" hidden data-answer data-key>`
u koje tipka upisuje odabranu vrijednost. Time bez ijedne izmjene nastavljaju
raditi: `inputs()`, brojanje razine, `data-key` za pamćenje, vraćanje napretka,
kvačica/križ (`.mark[data-for]`), reakcija avatara i konfeti.

Tri detalja koja iz toga slijede:

1. Klik na tipku ne pokreće `focusout`, pa rukovatelj sam zove `setState()`,
   `updateProgress()` i `zapamtiOdgovore()`.
2. Skrivena polja moraju se izuzeti iz skoka na Enter (`keydown` u `#main`
   indeksira `inputs()`), inače Enter „uskoči" u nevidljivo polje.
3. Sidro za avatara je **odabrana tipka**, ne skriveno polje, jer skriveno polje
   nema položaj na ekranu.

### Redoslijed ponuđenih tipki

Tipke se **premješaju pri iscrtavanju**. Bez toga je točan odgovor uvijek prvi u
podacima i dijete nauči tapkati prvu tipku. Pamti se odabrana **vrijednost**, ne
položaj, pa premještanje pri sljedećem otvaranju ne kvari vraćanje napretka.

### Hrvatska slova pri upisu

Za zadatke s upisom u hrvatskom, ispod polja stoji red tipki **č ć š ž đ** koji
upisuje slovo na mjesto kursora. Bez toga je „napiši protuznačnicu od *dan*"
(→ `noć`) nerješivo na engleskoj tipkovnici. Red se prikazuje samo u hrvatskom i
samo kod `calc` zadataka.

Pet malih slova je dovoljno: svi odgovori s upisom u popisu niže traže samo mala
`č ć š ž đ` (`čita`, `škole`, `loše`, `ku-ća`, `kuće`, `žive`), a velika početna
slova su obična latinična (`Ana`, `Marko`, `Danas`). Zato su zadaci koji traže
upis velikog `Ž` — prvo i zadnje slovo abecede — postavljeni kao `izbor`.

## Zadaci: Hrvatski jezik, 2. razred

Cjeline nose oznake `h1`–`h7` da se ključevi za pamćenje ne miješaju s `c1`–`c7`.
Ukupno **85 polja** za provjeru, plus jedan zadatak za vježbenicu.

### h1 · Veliko početno slovo (12)

Imena i prezimena, mjesta, ulice i trgovi, kućni ljubimci, početak rečenice.

| tip | zadatak | točno |
|---|---|---|
| izbor | „____ ide u školu." | Ana *(ana)* |
| izbor | „Moj brat ____ voli nogomet." | Ivan *(ivan)* |
| izbor | „Stanujem u ____ ulici." | Cvjetnoj *(cvjetnoj)* |
| izbor | „Ljeti idemo u ____." | Split *(split)* |
| izbor | „Naša mačka zove se ____." | Mica *(mica)* |
| izbor | „Živim u ____." | Hrvatskoj *(hrvatskoj)* |
| izbor | „Vlak ide u ____." | Rijeku *(rijeku)* |
| izbor | Koji je zapis točan? | Trg bana Jelačića *(trg bana jelačića)* |
| izbor | Koji je zapis točan? | Ulica kralja Tomislava *(ulica Kralja Tomislava)* |
| upis | Popravi: „moj pas se zove rex." | Moj pas se zove Rex. |
| upis | Popravi: „danas idemo u zagreb." | Danas idemo u Zagreb. |
| upis | Popravi: „ana i marko žive u osijeku." | Ana i Marko žive u Osijeku. |

### h2 · Č ili Ć (14)

Dvanaest parova č/ć i dva dž/đ. Uz riječi gdje prikaz nije dovoljan, u zagradi
stoji značenje.

| prikaz | ponuđeno | točno | riječ |
|---|---|---|---|
| ku_a *(dom)* | ć č | ć | kuća |
| _ovjek | č ć | č | čovjek |
| no_ | ć č | ć | noć |
| klju_ | č ć | č | ključ |
| cvije_e | ć č | ć | cvijeće |
| ru_nik | č ć | č | ručnik |
| sre_a | ć č | ć | sreća |
| _okolada | č ć | č | čokolada |
| ma_ka | č ć | č | mačka |
| vo_e | ć č | ć | voće |
| _izma | č ć | č | čizma |
| pomo_ | ć č | ć | pomoć |
| ro_ak | đ dž | đ | rođak |
| _ep *(na hlačama)* | dž ž | dž | džep |

### h3 · IJE ili JE (12)

Odabir cijele riječi, jer je upravo to drill.

| ponuđeno | točno |
|---|---|
| dijete / djete | dijete |
| djeca / dijeca | djeca |
| lijep / ljep | lijep |
| mlijeko / mljeko | mlijeko |
| cvijet / cvjet | cvijet |
| vjetar / vijetar | vjetar |
| snijeg / snjeg | snijeg |
| vjeverica / vijeverica | vjeverica |
| rijeka / rjeka | rijeka |
| mjesec / mijesec | mjesec |
| bijel / bjel | bijel |
| pjesma / pijesma | pjesma |

### h4 · Glasovi i slova (12)

Abeceda, slogovi, lj/nj.

| tip | zadatak | točno |
|---|---|---|
| upis | Koliko slogova ima „lopata"? | 3 |
| upis | Koliko slogova ima „škola"? | 2 |
| upis | Koliko slogova ima „olovka"? | 3 |
| upis | Rastavi na slogove: kuća | ku-ća |
| upis | Rastavi na slogove: mama | ma-ma |
| izbor | Koje je prvo slovo abecede? | A *(B)* |
| izbor | Koje je zadnje slovo abecede? | Ž *(Z)* |
| izbor | Koje je slovo u abecedi ispred Ć? | Č *(C)* |
| izbor | Koje je slovo u abecedi ispred Č? | C *(Ć)* |
| izbor | _ubav | lj *(nj)* → ljubav |
| izbor | ko_ | nj *(lj)* → konj |
| izbor | k_iga | nj *(lj)* → knjiga |

Hrvatska abeceda za provjeru poretka: A B C Č Ć D DŽ Đ E F G H I J K L LJ M N NJ
O P R S Š T U V Z Ž.

### h5 · Rečenica (12)

Rečenični znakovi, jesne i niječne rečenice, „ne" uz glagol.

| tip | zadatak | točno |
|---|---|---|
| izbor | „Gdje si bio__" | ? *(.)* |
| izbor | „Kako je lijepo__" | ! *(?)* |
| izbor | „Marko čita knjigu__" | . *(?)* |
| izbor | „Ne volim kišu." je rečenica: | niječna *(jesna)* |
| izbor | „Volim ljeto." je rečenica: | jesna *(niječna)* |
| izbor | Koji je zapis točan? | ne znam *(neznam)* |
| izbor | Koji je zapis točan? | ne volim *(nevolim)* |
| upis | Pretvori u niječnu: „Ivan čita." | Ivan ne čita. |
| upis | Pretvori u niječnu: „Ana pjeva." | Ana ne pjeva. |
| upis | Pretvori u jesnu: „Petar ne trči." | Petar trči. |
| upis | Koliko rečenica ima: „Pada snijeg. Djeca se raduju."? | 2 |
| upis | Popravi: „ana ide u školu" | Ana ide u školu. |

### h6 · Vrste riječi (12)

Imenice (opće i vlastite), jednina i množina, glagoli, pridjevi.

| tip | zadatak | točno |
|---|---|---|
| izbor | „Zagreb" je: | vlastita imenica *(opća imenica)* |
| izbor | „grad" je: | opća imenica *(vlastita imenica)* |
| izbor | „Sava" je: | vlastita imenica *(opća imenica)* |
| izbor | Koja je riječ glagol? | trči *(trava)* |
| izbor | Koja je riječ glagol? | pjeva *(pjesma)* |
| izbor | Koja je riječ pridjev? | visok *(visina)* |
| izbor | Koja je riječ pridjev? | hladan *(hladnjak)* |
| izbor | „djeca" je: | množina *(jednina)* |
| upis | Množina od „kuća" | kuće |
| upis | Množina od „prozor" | prozori |
| upis | Jednina od „olovke" | olovka |
| upis | Jednina od „djeca" | dijete |

### h7 · Riječi i značenje (11 + 1 za vježbenicu)

Protuznačnice, istoznačnice, redoslijed riječi u rečenici.

| tip | zadatak | točno |
|---|---|---|
| izbor | Protuznačnica od „velik" | malen *(ogroman)* |
| izbor | Protuznačnica od „dan" | noć *(jutro)* |
| izbor | Protuznačnica od „visok" | nizak *(dugačak)* |
| izbor | Protuznačnica od „mokro" | suho *(vlažno)* |
| izbor | Istoznačnica od „kuća" | dom *(vrt)* |
| izbor | Istoznačnica od „velik" | golem *(malen)* |
| izbor | Istoznačnica od „auto" | automobil *(kamion)* |
| upis | Protuznačnica od „vruće" | hladno |
| upis | Protuznačnica od „dobro" | loše |
| upis | Složi rečenicu: škole / iz / Marko / dolazi | Marko dolazi iz škole. |
| upis | Složi rečenicu: lijepa / je / Ana | Ana je lijepa. |
| note | U vježbenicu napiši tri riječi koje počinju slovom Č. | *npr. čaša, čokolada, čizma* |

Zbroj polja za provjeru: 12 + 14 + 12 + 12 + 12 + 12 + 11 = **85**.

## Pamćenje napretka

### Oblik u localStorageu

```js
{
  v: 2,
  ime: "Luka",
  avatar: "jedi",
  predmet: "hrvatski",              // zadnje biran
  napredak: {
    matematika: { "c1|63|0": "6D3J", … },
    hrvatski:   { "h2|ku_a|0": "ć", … }
  }
}
```

### Prijelaz s postojeće verzije

Pri prvom otvaranju nakon izmjene, zapis bez `v: 2` se tiho prebaci:
`odgovori` → `napredak.matematika`, `predmet: "matematika"`, `v: 2`. Nadimak i
avatar ostaju. Ako je zapis neupotrebljiv, počinje se od prijave, kao dosad.

### Prebacivanje predmeta

1. zapamti odgovore trenutnog predmeta
2. izgradi nanovo `<title>`, zaglavlje, `<nav>`, traku i `#main`
3. tiho vrati napredak novog predmeta — `updateProgress({ silent: true })`
   (već postoji, uveden za vraćanje napretka pri učitavanju)
4. niz na nulu, avatar `reset()`

Nema poruke „Nastavljamo gdje smo stali" pri prebacivanju — ona ostaje samo za
prvo učitavanje stranice.

## Zaglavlje

- **Prekidač**: dvije pilule uz pozdrav — „Matematika" i „Hrvatski jezik",
  aktivna istaknuta, ista `nav a.done` estetika kao pilule cjelina.
- **Traka**: matematika zadržava brojevnu ljestvicu 0–50–100. Hrvatski dobiva
  abecednu traku od 30 kućica koje se pale kako odgovori dolaze, s oznakama `A` i
  `Ž` na krajevima. Ista mehanika iskustva, primjerena predmetu.

## Što se ne mijenja

Avatari, njihove rečenice i animacije, 3 s zadržavanja, skrivanje na tipkanje,
PIN `1234` za rješenja, razine, niz, konfeti, zvuk, `prefers-reduced-motion`.
Matematički zadaci se prenose neizmijenjeni.

„Počni ispočetka" briše napredak **samo trenutnog predmeta**; drugi predmet,
nadimak i avatar ostaju.

## Provjera prije proglašenja gotovim

Dva mjesta gdje se postojeća matematika može pokvariti:

1. **Razdvajanje provjere odgovora.** Svih 85 matematičkih odgovora protjerati
   kroz novu `provjeraBroj` i usporediti s ponašanjem današnjeg `norm()` —
   nijedan se rezultat ne smije razlikovati.
2. **Generiranje `<nav>`-a.** Izgenerirani nav za matematiku mora dati identičnih
   7 linkova (tekst i `href`) kao današnji ručno napisani.

Uz to, za novi predmet:

- 85 jedinstvenih `data-key` vrijednosti, nijedan duplikat (isti test kao za
  matematiku, gdje je uhvatio `c7|broj` dvaput)
- veliko slovo se traži: `ana` je **netočno** za `Ana`
- dijakritika se traži: `kuca` je **netočno** za `kuća`
- tipke `izbor`-a nisu u istom poretku kao u podacima
- prebacivanje predmeta ne ispaljuje konfete ni trofeje za razine svladane prije
- prijelaz starog zapisa u `v: 2` čuva matematički napredak
- „Počni ispočetka" u hrvatskom ne dira matematički napredak
- sve i dalje radi uz uključen `prefers-reduced-motion`

## Izvan obuhvata

- Slušanje, govorenje i čitanje s razumijevanjem iz kurikuluma — traže zvuk i
  dulje tekstove, ne uklapaju se u „upiši odgovor i provjeri se sam".
- Rukopis i slovopis (pisana slova) — ne mogu se provjeriti u pregledniku.
- Treći predmet. Registar `PREDMETI` ga podnosi, ali sadržaj nije predmet ovoga.
- Preimenovanje repozitorija iz `matematika-3razred`. Odvojena odluka.
