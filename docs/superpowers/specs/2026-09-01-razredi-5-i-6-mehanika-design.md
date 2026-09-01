# Gradivo 5. i 6. razreda — mehanika odabira razreda

Datum: 2026-09-01
Opseg: **samo mehanika.** Sadržaj zadataka za 5. i 6. razred ide u četiri odvojena speca
(vidi [Podjela posla](#9-podjela-posla)).

## 1. Problem

Stranica sad nosi gradivo 2. razreda za dva predmeta. Predmet je jedina dimenzija:
`PREDMETI` u `index.html` ključan je po predmetu, napredak se pamti kao
`profil.napredak[predmet]` u zapisu `v:2`.

Traži se **treća dimenzija — razred**, s tri odvojena skupa gradiva: 2. razred (postojeće),
5. razred i 6. razred. To nije „ulazak u razred" nego gradivo samog razreda; postojeći dio
ostaje kakav je, pod oznakom 2. razreda.

Kurikulum za 5./6. razred uvodi oblike odgovora koje sadašnja provjera ne poznaje i, u
hrvatskom, ishode koji se uglavnom ne mogu provjeriti automatski. Oboje je riješeno niže.

## 2. Izvori

Ishodi se preuzimaju iz izvornika, ne iz pamćenja:

- Matematika: *Odluka o donošenju kurikuluma za nastavni predmet Matematika za osnovne škole
  i gimnazije u Republici Hrvatskoj*, NN 7/2019 —
  <https://narodne-novine.nn.hr/clanci/sluzbeni/2019_01_7_146.html>
- Hrvatski jezik: *Odluka o donošenju kurikuluma za nastavni predmet Hrvatski jezik za
  osnovne škole i gimnazije u Republici Hrvatskoj*, NN 10/2019 —
  <https://narodne-novine.nn.hr/clanci/sluzbeni/2019_01_10_215.html>

Iz njih je pročitano:

- **Matematika**, domene A Brojevi, B Algebra i funkcije, C Oblik i prostor, D Mjerenje,
  E Podaci, statistika i vjerojatnost.
  5. razred: 17 ishoda (`A.5.1–6`, `B.5.1–2`, `C.5.1–3`, `D.5.1–5`, `E.5.1`).
  6. razred: 19 ishoda (`A.6.1–9`, `B.6.1`, `C.6.1–3`, `D.6.1–5`, `E.6.1`).
- **Hrvatski jezik**, domene A Hrvatski jezik i komunikacija, B Književnost i stvaralaštvo,
  C Kultura i mediji. 13 ishoda u svakom razredu: `A.x.1–6`, `B.x.1–4`, `C.x.1–3`.

Otvoreno pitanje za spec C: oznaka `MAT OŠ D.6.3` u dokumentu stoji bez vlastitoga teksta,
neposredno uz `MAT OŠ A.6.9` (postoci). Spec C mora tu oznaku provjeriti u izvorniku prije
nego joj dodijeli cjelinu — ne pretpostavljamo što pokriva.

Dvije posljedice za dizajn:

- **Matematika** traži razlomke (`MAT OŠ A.5.3`, `A.6.2`), decimalne brojeve (`A.5.4`,
  `A.5.5`), **cijele brojeve, dakle negativne** (`A.6.6`, `A.6.7`), potencije baze 10
  (`A.6.8`), **postotke** (`A.6.9`), preračunavanje mjernih jedinica (`D.5.2`, `D.6.1`) i
  koordinate točaka (`D.6.5`).
- **Hrvatski** u 5./6. razredu ima samo dva ishoda koja se svode na polje za upis
  (`OŠ HJ A.5.5` i `A.6.5`, promjenjive i nepromjenjive vrste riječi). Uz njih je `A.6.6`
  (jezična raznolikost kroz hrvatsku povijest) upotrebljiv kao `izbor`. Ostalo je govorenje,
  slušanje, pisanje trodijelnih tekstova i tumačenje književnosti.

## 3. Arhitektura podataka

Konfiguracija se dijeli na dvije razine: **predmet** nosi ono što ne ovisi o razredu,
**razred** nosi sadržaj.

```js
const PREDMETI = {
  matematika: { naziv: "Matematika",     traka: "brojevi", provjera: "broj",  znakovi: {} },
  hrvatski:   { naziv: "Hrvatski jezik", traka: "abeceda", provjera: "rijec",
                znakovi: { "*": ["č","ć","š","ž","đ"] } }
};

const RAZREDI = {
  "2": { naziv: "2. razred", kratko: "2" },
  "5": { naziv: "5. razred", kratko: "5" },
  "6": { naziv: "6. razred", kratko: "6" }
};

const GRADIVO = {
  "2": {
    matematika: { title, naslov, uvod, zadaci: ZADACI_MATEMATIKA_2 },
    hrvatski:   { title, naslov, uvod, zadaci: ZADACI_HRVATSKI_2 }
  },
  "5": { matematika: { … zadaci: ZADACI_MATEMATIKA_5 }, hrvatski: { … } },
  "6": { matematika: { … zadaci: ZADACI_MATEMATIKA_6 }, hrvatski: { … } }
};
```

`znakovi` je mapa `razred → popis znakova` s ključem `"*"` za „svi razredi". Matematika
dobiva `{ "5": ["-","/",",","²","³"], "6": ["-","/",",","²","³"] }`; 2. razred nema unos i
traka se ne prikazuje, kao dosad.

`title`, `naslov` i `uvod` sele iz `PREDMETI` u `GRADIVO`, jer ovise o razredu.
`traka` i `provjera` ostaju u `PREDMETI`, jer ne ovise.

### Datoteke

Šest datoteka sa zadacima, sve preko `<script src>`, po obrascu
`zadaci-<predmet>-<razred>.js`, svaka s jednom globalnom varijablom:

| Datoteka | Globalna varijabla |
|---|---|
| `zadaci-matematika-2.js` | `ZADACI_MATEMATIKA_2` |
| `zadaci-hrvatski-2.js` | `ZADACI_HRVATSKI_2` |
| `zadaci-matematika-5.js` | `ZADACI_MATEMATIKA_5` |
| `zadaci-hrvatski-5.js` | `ZADACI_HRVATSKI_5` |
| `zadaci-matematika-6.js` | `ZADACI_MATEMATIKA_6` |
| `zadaci-hrvatski-6.js` | `ZADACI_HRVATSKI_6` |

Postojeće `zadaci-matematika.js` i `zadaci-hrvatski.js` preimenuju se u varijantu s `-2`
(`git mv`, sadržaj nedirnut osim imena globalne varijable). Mijenjaju se `<script src>` u
`index.html`, popis datoteka u `provjere/provjere.js` i README.

Nove četiri datoteke ovaj spec ostavlja **kao skelet**: globalna varijabla s jednom probnom
cjelinom od nekoliko zadataka, dosta da se pilula klikne i harness prođe. Pravi sadržaj
dolazi u specovima B–E.

### Oznake cjelina

Oznake (`c1…c7`, `h1…h7`) **ostaju kakve su i ponavljaju se kroz razrede.** Ne kolidiraju:
`data-key` pamćenja je `"cjelina|prikaz|redni broj istog prikaza"` i uvijek stoji unutar
zapisa jednog `razred/predmet`, a u DOM-u je u svakom trenutku iscrtan samo jedan razred.
Jedini zahtjev je da su jedinstvene **unutar datoteke** — to harness provjerava.

## 4. Pamćenje i migracija

`profil` ide s `v:2` na `v:3`:

```js
{ v: 3, ime, avatar, razred: "2", predmet: "matematika",
  napredak: { "2/matematika": {…}, "5/hrvatski": {…} } }
```

Ključ napretka je `` `${razred}/${predmet}` ``. Time `promijenjeni` Set i zaštita od
zastarjele kartice ostaju netaknuti — već su ključani istim stringom kao `napredak`.

Migracija u `ucitajProfil()`, po uzoru na postojeći v1→v2 put:

| Zapis na disku | Postupak |
|---|---|
| `v:3` | čita se kako je; nepoznati ključevi u `napredak` se zadržavaju |
| `v:2` | `napredak.matematika` → `napredak["2/matematika"]`, `napredak.hrvatski` → `napredak["2/hrvatski"]`, `razred = "2"` |
| `v:1` (bez predmeta) | `zapis.odgovori` → `napredak["2/matematika"]`, `predmet = "matematika"`, `razred = "2"` |
| `v` veći od 3 | čitaju se **samo** `ime` i `avatar`; `napredak` se ne dira i ne prepisuje |
| pokvaren zapis / ugašena pohrana | kao dosad: prazan profil, bez pada |

Zapis s višim `v` znači da je korisnik otvorio noviju verziju stranice. Bolje mu ne pokazati
napredak nego mu ga zbrisati, zato se `napredak` u tom slučaju ne prepisuje.

Odmah nakon migracije upisuje se `v:3` zapis, kao što se sad upisuje `v:2`.

Stranica se otvara na zadnjem **paru** (razred, predmet). Ako zapamćeni razred ili predmet
više ne postoji u `RAZREDI` / `PREDMETI`, pada na `"2"` i `matematika`.

## 5. Odabir razreda u zaglavlju

Dva reda kontrola u zaglavlju: gore tri pilule za razred, dolje postojeće pilule za predmet.
Isti mehanizam i isti `aria-pressed` kao postojeći prekidač predmeta.

Promjena razreda ide **istom putanjom** kao promjena predmeta: `zapamtiOdgovore()` pa
`izgradiPredmet(razred, predmet)`. Tako je zaštita od gubitka nezapisanih odgovora
(uvedena commitom `1b4d947`) automatski pokrivena i za razred.

Na ekranu užem od 420 px pilule razreda gube riječ „razred" i prikazuju samo `2` / `5` / `6`,
uz `aria-label` s punim nazivom. Ciljna veličina dodira ostaje najmanje 44 px u oba smjera.

Traka u zaglavlju (brojevna ljestvica ili abeceda) ostaje vezana na **predmet**, ne na razred.

Ako par (razred, predmet) nema učitane zadatke, pilula razreda se iscrtava onemogućena
(`disabled`, `aria-disabled`) s kratkom napomenom uz nju. Ostatak stranice radi normalno.

## 6. Provjera odgovora

Sadašnja `norm()` pretvara `.` u `,` i briše razmake, pa su `2,5` (decimalni broj) i `8,33`
(dvočlani popis) za nju istoga oblika. U 5./6. razredu, gdje su decimalni brojevi
svakodnevni, to bi bio izvor lažnih grešaka.

**Oblik odgovora se deklarira u podacima, ne pogađa.** Zadatak dobiva neobavezno polje
`oblik`:

| `oblik` | Pravilo | Primjeri koji su isti odgovor |
|---|---|---|
| *nema* | točno postojeće ponašanje `norm()` / `ocisti()`, bit po bit | — |
| `broj` | cijeli ili decimalni broj, usporedba **po vrijednosti**; `-` `−` `‑` `–` isti su znak; `,` = `.` | `-7` = `−7`, `2,5` = `2.5` = `2,50` |
| `razlomak` | usporedba po vrijednosti, egzaktnom racionalnom aritmetikom; prihvaća i decimalni i mješoviti zapis | `3/4` = `6/8` = `0,75`, `1 1/2` = `3/2` = `1,5` |
| `popis` | razdvoji zarezom, svaki član po pravilu `broj`, **poredak bitan** | `40, 50, 60` = `40,50,60` |
| `tekst` | normalizirani niz znakova; dijakritika, veliko slovo i `²` su bitni | `cm²`; višak razmaka se sabija |

Pravila:

- **Gradivo 2. razreda ne dobiva `oblik`.** Ide starom putanjom nepromijenjeno, pa je rizik
  regresije na postojećem dijelu nula. Nove datoteke deklariraju `oblik` izričito.
- Racionalna aritmetika radi s cjelobrojnim brojnikom i nazivnikom (`a/b == c/d` kao
  `a*d == c*b`), bez usporedbe `parseFloat` vrijednosti. Test slučaj `0,1 + 0,2` mora proći.
- Potencija baze 10 (`MAT OŠ A.6.8`) piše se u zadatku kao vrijednost, ne kao izraz —
  odgovor na `10³` je `1000`, oblik `broj`. Zapis s eksponentom se ne upisuje.
- Koordinate točaka (`MAT OŠ D.6.5`) idu kao dva odvojena polja (`x`, `y`), svako oblika
  `broj`. Nema parsiranja `(3, -2)`.
- Postoci (`MAT OŠ A.6.9`): znak `%` stoji u tekstu zadatka, upisuje se samo broj, oblik
  `broj`. Kad se traži sam postotak kao odgovor, oblik je `broj` a zadatak izričito kaže
  „upiši broj bez znaka %".
- Mjerne jedinice: kad je jedinica dio odgovora, oblik je `tekst`; kad je jedinica u tekstu
  zadatka a upisuje se samo broj, oblik je `broj`. Zadatak mora reći koje se traži.
- Ako `oblik` postoji a **odgovor u podacima** se ne da razložiti u taj oblik, to je greška u
  podacima: provjera pada na `tekst`, a harness to prijavljuje kao neuspjeh. Nikad se ne
  prijavljuje kao netočan odgovor djeteta.
- Ako se **upis djeteta** ne da razložiti u deklarirani oblik, odgovor je netočan (dijete je
  upisalo nešto što nije taj oblik) — ponašanje kao dosad.

Pravilo po predmetu (`PREDMETI[...].provjera`, vrijednosti `"broj"` i `"rijec"`) ostaje i
određuje ponašanje kad `oblik` nije zadan.

## 7. Tipke za unos

Traka znakova sad se prikazuje kad `provjera === "rijec"`. Postaje vođena `znakovi` mapom iz
sekcije 3:

- hrvatski, svi razredi → `č ć š ž đ` (nepromijenjeno)
- matematika, 2. razred → nema trake (nepromijenjeno)
- matematika, 5. i 6. razred → `- / , ² ³`

Isti DOM, isti mehanizam odmicanja polja iznad trake kad bi ga traka pokrila. Znakovi dolaze
iz konfiguracije; nema drugoga koda.

## 8. Avatar

Ton ostaje isti na svim razredima — Patuljak i Mali Jedi, konfeti, poruke o nizu. Bez
prekidača i bez razlike po razredu.

Repertoar se širi s 10 na **20 rečenica po liku po ishodu** (točan odgovor, netočan odgovor,
svladana razina), u duhu koji već postoji: Patuljak obične hrvatske uzrečice, Mali Jedi
obrnuti red riječi i Sila. Postojeće rečenice se zadržavaju; dodaje se po deset novih.

Pravilo „ni pokret ni rečenica ne ponavljaju se dva puta zaredom" ostaje. Mali Jedi ostaje
izvorni lik: bez citata iz filmova i bez prikaza prepoznatljivog lika.

## 9. Podjela posla

Ovaj spec pokriva samo mehaniku i završava sa šest datoteka, od kojih su četiri skeleti.
Sadržaj slijedi u četiri odvojena speca, svaki sa svojim planom:

| Spec | Sadržaj | Ishodi |
|---|---|---|
| B | Matematika, 5. razred | 17 ishoda: `MAT OŠ A.5.1–6`, `B.5.1–2`, `C.5.1–3`, `D.5.1–5`, `E.5.1` |
| C | Matematika, 6. razred | 19 ishoda: `MAT OŠ A.6.1–9`, `B.6.1`, `C.6.1–3`, `D.6.1–5`, `E.6.1` |
| D | Hrvatski jezik, 5. razred | jezgra `OŠ HJ A.5.5` i pravopis; `B.5.2` kao `izbor`; produktivni ishodi kao `note` |
| E | Hrvatski jezik, 6. razred | jezgra `OŠ HJ A.6.5` i `A.6.6`, pravopis; `B.6.2` kao `izbor`; produktivni ishodi kao `note` |

Za hrvatski je odluka: **gramatika i pravopis su jezgra** (tu se odgovor točno provjerava),
književni pojmovi idu kao `izbor`, a pisanje teksta kao `note` zadatak za vježbenicu, bez
brojanja u napredak. Svaka cjelina u tim specovima navodi oznaku ishoda na koji se odnosi,
doslovno iz NN 7/2019 i NN 10/2019. Ishod koji nijedna cjelina ne pokriva spec **izričito
navodi kao nepokriven** — cjelina se ne izmišlja da tablica bude puna.

## 10. Provjere

Sadašnji harness nosi apsolutne brojke (`PASS (41)`, četiri brojačke tvrdnje). Sa šest skupova
podataka one bi se mijenjale pri svakoj izmjeni sadržaja, pa se zamjenjuju **invarijantama po
skupu**, s jednom tablicom očekivanja na vrhu `provjere/provjere.js`.

Provjere koje se dodaju:

1. Za svaki `(razred, predmet)` iz `GRADIVO` globalna varijabla postoji i nije prazna.
2. Svaki `izbor` zadatak: točan odgovor je među ponuđenima.
3. Svaki zadatak s `oblik`: odgovor iz podataka razlaže se u deklarirani oblik.
4. Oznake cjelina jedinstvene su unutar svake datoteke.
5. Migracija: zapis `v:1`, `v:2` i `v:4` daje očekivani `napredak`; `v:4` ga ne gubi.
6. Prebacivanje razreda i predmeta u nizu ne gubi upisane odgovore.
7. Jedinični testovi provjere: `broj` (varijante minusa, `,` i `.`), `razlomak`
   (`3/4` = `6/8`, `1 1/2` = `3/2`, `0,1 + 0,2` bez binarne pogreške), `popis` (poredak
   bitan), `tekst` (dijakritika bitna).
8. Odsutna globalna varijabla: pilula tog razreda je onemogućena, ostatak stranice radi.
9. Traka znakova: hrvatski je ima na svim razredima, matematika samo na 5. i 6.
10. Postojeće provjere za 2. razred prolaze nepromijenjene.

Harness se pokreće kao dosad, preko lokalnog servera:

```bash
python -m http.server 8765
```

pa `provjere/pokreni.html`.

## 11. Što ovaj spec ne mijenja

- Ime repozitorija i URL na GitHub Pagesu ostaju `matematika-3razred`. Preimenovanje bi
  razbilo postojeći link.
- Nema buildanja, nema dependencyja osim Google Fonts CDN-a.
- Odgovori su i dalje u HTML-u (`data-answer`), vidljivi u *View source*. Statični Pages ne
  može provjeru na serveru.
- Nadimak i avatar ostaju zajednički za sve razrede i predmete.
- Gradivo 2. razreda ostaje sadržajno nedirnuto; mijenja mu se samo ime datoteke i ime
  globalne varijable.
