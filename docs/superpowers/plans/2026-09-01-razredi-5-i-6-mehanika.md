# Mehanika odabira razreda (2./5./6.) — plan implementacije

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> (recommended) or superpowers:executing-plans to implement this plan task-by-task.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Uvesti razred kao treću dimenziju stranice (2., 5. i 6. razred × matematika i
hrvatski), s migracijom napretka bez gubitka i provjerom odgovora koja podnosi razlomke,
decimalne i negativne brojeve.

**Architecture:** `PREDMETI` zadržava ono što ne ovisi o razredu (pravilo provjere, traka u
zaglavlju, znakovi za unos), novi `GRADIVO[razred][predmet]` nosi sadržaj (naslovi, zadaci).
Ključ pamćenja prelazi iz `predmet` u `` `${razred}/${predmet}` ``, zapis profila iz `v:2` u
`v:3`. Oblik odgovora se deklarira u podacima poljem `oblik`, ne pogađa se iz zapisa.

**Tech Stack:** Statični HTML/CSS/JS bez buildanja i bez dependencyja (osim Google Fonts
CDN-a). Testovi su vlastiti harness u `provjere/provjere.js`, vrti se nad `index.html` u
iframeu preko `python -m http.server 8765`.

**Spec:** [`docs/superpowers/specs/2026-09-01-razredi-5-i-6-mehanika-design.md`](../specs/2026-09-01-razredi-5-i-6-mehanika-design.md)

## Global Constraints

- **Nema buildanja, nema novih dependencyja.** Sve ide preko `<script src>` u `index.html`.
- **Nema frameworka i nema modula** (`type="module"` bi razbio `file://` i postojeći harness).
  Datoteke sa zadacima deklariraju globalne `const` varijable.
- **Gradivo 2. razreda ostaje sadržajno nedirnuto.** Mijenja mu se ime datoteke, ime globalne
  varijable i tekst naslova; **ni jedan zadatak, odgovor ni oznaka cjeline se ne mijenja.**
- **Zadaci 2. razreda ne dobivaju polje `oblik`** i idu postojećom putanjom provjere bit po bit.
- Ime repozitorija i URL na Pagesu ostaju `matematika-3razred`.
- Komentari u kodu su na hrvatskom **bez dijakritike** (postojeći stil u `index.html` i
  `provjere/provjere.js`); tekst vidljiv korisniku ima punu dijakritiku.
- Identifikatori u kodu su hrvatski i bez dijakritike (`izgradiPredmet`, `zapamtiOdgovore`).
- Ciljna veličina dodira svih pilula najmanje 44 px u oba smjera.
- Harness se pokreće s `python -m http.server 8765`, pa `http://localhost:8765/provjere/pokreni.html`.
  Naslov stranice postane `PASS (n)` ili `FAIL (n)`.
- Ključ localStoragea ostaje `mat3-profil-v1` (verzija je u polju `v`, ne u imenu ključa).

## Polazno stanje

Harness na `main` prolazi s **PASS (43)**. Svaki task završava harnessom u zelenom; broj
provjera raste kroz plan.

## File Structure

| Datoteka | Odgovornost | Task |
|---|---|---|
| `zadaci-matematika-2.js` | preimenovano iz `zadaci-matematika.js`, globala `ZADACI_MATEMATIKA_2` | 1 |
| `zadaci-hrvatski-2.js` | preimenovano iz `zadaci-hrvatski.js`, globala `ZADACI_HRVATSKI_2` | 1 |
| `zadaci-matematika-5.js` | skelet, globala `ZADACI_MATEMATIKA_5` | 2 |
| `zadaci-hrvatski-5.js` | skelet, globala `ZADACI_HRVATSKI_5` | 2 |
| `zadaci-matematika-6.js` | skelet, globala `ZADACI_MATEMATIKA_6` | 2 |
| `zadaci-hrvatski-6.js` | skelet, globala `ZADACI_HRVATSKI_6` | 2 |
| `index.html` | `PREDMETI`, `RAZREDI`, `GRADIVO`, profil i migracija, pilule, provjera, traka znakova, avatar | 1–7 |
| `provjere/provjere.js` | harness: postojeće provjere + invarijante po skupu | 1–8 |
| `README.md` | dokumentacija razreda, oblika odgovora i strukture datoteka | 8 |

`index.html` je i dalje jedna datoteka. To je postojeći obrazac ovog repozitorija (mehanika u
`index.html`, podaci izvan njega) i plan ga ne mijenja — razdvajanje mehanike u više datoteka
bilo bi nepovezano prepravljanje.

---

### Task 1: `RAZREDI` i `GRADIVO`, preimenovane datoteke 2. razreda

Čisto preslagivanje konfiguracije. Na kraju taska stranica radi **identično** kao prije, samo
sadržaj dolazi iz `GRADIVO["2"][predmet]`.

**Files:**
- Rename: `zadaci-matematika.js` → `zadaci-matematika-2.js`
- Rename: `zadaci-hrvatski.js` → `zadaci-hrvatski-2.js`
- Modify: `index.html:553-554` (script tagovi), `index.html:561-580` (`PREDMETI`),
  `index.html:687-690` (`izgradiPredmet`), `index.html:798` (poziv), `index.html:1660` (poziv u
  `prebaciPredmet`), `index.html:1677` (poziv pri pokretanju)
- Test: `provjere/provjere.js`

**Interfaces:**
- Consumes: ništa (prvi task).
- Produces:
  - `RAZREDI` — `{ [razred: string]: { naziv: string, kratko: string } }`
  - `GRADIVO` — `{ [razred: string]: { [predmet: string]: { title, naslov, uvod, zadaci } } }`
  - `PREDMETI[predmet]` — `{ naziv, traka, provjera, znakovi }`
  - `izgradiPredmet(razred, predmet)` — dva argumenta, u tom redu
  - `let razred` — globalna varijabla s ključem aktivnog razreda, uz postojeći `let predmet`
  - globalne varijable `ZADACI_MATEMATIKA_2`, `ZADACI_HRVATSKI_2`

- [ ] **Step 1: Preimenuj datoteke i globalne varijable**

```bash
git mv zadaci-matematika.js zadaci-matematika-2.js
git mv zadaci-hrvatski.js zadaci-hrvatski-2.js
```

U `zadaci-matematika-2.js` prvi redak deklaracije:

```js
const ZADACI_MATEMATIKA_2 = [
```

U `zadaci-hrvatski-2.js`:

```js
const ZADACI_HRVATSKI_2 = [
```

Ništa drugo u tim dvjema datotekama se ne mijenja.

- [ ] **Step 2: Zamijeni script tagove u `index.html`**

Redovi 553–554 postaju:

```html
<script src="zadaci-matematika-2.js"></script>
<script src="zadaci-hrvatski-2.js"></script>
```

- [ ] **Step 3: Pokreni harness — mora pasti**

```bash
python -m http.server 8765
```

Otvori `http://localhost:8765/provjere/pokreni.html`.
Očekivano: **FAIL**, jer `PREDMETI` još pokazuje na stara imena (`ZADACI_MATEMATIKA` nije
definirano). Ovo je namjerni crveni korak koji dokazuje da harness stvarno učitava podatke.

- [ ] **Step 4: Prepiši `PREDMETI` i dodaj `RAZREDI` i `GRADIVO`**

`index.html`, blok koji počinje na retku 561, cijeli se zamjenjuje:

```js
/* ---------- predmeti, razredi i gradivo ----------
   Predmet nosi ono sto ne ovisi o razredu: pravilo provjere, traku u
   zaglavlju i znakove za unos. Razred nosi sadrzaj. Dodavanje razreda je
   jedna nova grana u GRADIVO i jedna datoteka sa zadacima po predmetu.
------------------------------------------------------------------------- */
const PREDMETI = {
  matematika: {
    naziv:    "Matematika",
    traka:    "brojevi",
    provjera: "broj",
    znakovi:  {}                     // 2. razred nema traku; 5. i 6. dobivaju je u Tasku 6
  },
  hrvatski: {
    naziv:    "Hrvatski jezik",
    traka:    "abeceda",
    provjera: "rijec",
    znakovi:  { "*": ["č", "ć", "š", "ž", "đ"] }
  }
};

const RAZREDI = {
  "2": { naziv: "2. razred", kratko: "2" },
  "5": { naziv: "5. razred", kratko: "5" },
  "6": { naziv: "6. razred", kratko: "6" }
};

const GRADIVO = {
  "2": {
    matematika: {
      title:  "Matematika — gradivo 2. razreda",
      naslov: "Ponavljamo matematiku<br>2. razreda",
      uvod:   "Gradivo 2. razreda: brojevi do 100, zbrajanje i oduzimanje s prelaskom desetice, tablica množenja i dijeljenja, geometrija, mjerenje i podaci. Upiši odgovor i provjeri se sam.",
      zadaci: ZADACI_MATEMATIKA_2
    },
    hrvatski: {
      title:  "Hrvatski jezik — gradivo 2. razreda",
      naslov: "Ponavljamo hrvatski<br>2. razreda",
      uvod:   "Gradivo 2. razreda: veliko početno slovo, č i ć, ije i je, glasovi i slova, rečenica, vrste riječi i značenje. Odgovori i provjeri se sam.",
      zadaci: ZADACI_HRVATSKI_2
    }
  }
};

let razred  = "2";                   // kljuc aktivnog razreda
let predmet = "matematika";          // kljuc aktivnog predmeta

/* Harness cita konfiguraciju kroz window: top-level const u klasicnoj
   skripti ne postaje svojstvo windowa, a deklaracija funkcije postaje.
   Zato se objekti izvoze rucno, a stanje kroz funkciju -- da harness ne
   drzi referencu na promjenjivu varijablu.                              */
Object.assign(window, { PREDMETI, RAZREDI, GRADIVO });
window.stanje = () => ({ razred, predmet });
```

Ovaj izvoz je jedini način da harness vidi podatke; bilješka na
`provjere/provjere.js:183` već bilježi zašto `W.ZADACI_HRVATSKI` ne radi.

Naslovi se namjerno mijenjaju iz „prije 3. razreda" u „gradivo 2. razreda": pilula u zaglavlju
piše `2. razred`, pa bi stari tekst bio u protuslovlju s njom. Sadržaj zadataka je nedirnut.

- [ ] **Step 5: Prilagodi `izgradiPredmet` da prima razred**

`index.html`, funkcija na retku 687. Prva tri retka tijela postaju:

```js
function izgradiPredmet(kljucRazreda, kljucPredmeta) {
  razred  = (GRADIVO[kljucRazreda] && GRADIVO[kljucRazreda][kljucPredmeta]) ? kljucRazreda : "2";
  predmet = PREDMETI[kljucPredmeta] ? kljucPredmeta : "matematika";
  const p = PREDMETI[predmet];
  const g = GRADIVO[razred][predmet];

  document.title = g.title;
  document.getElementById("naslov").innerHTML = g.naslov;
  document.getElementById("uvod").textContent = g.uvod;
  izgradiTraku(p.traka);
```

Dalje u istoj funkciji, `p.zadaci.forEach(...)` postaje `g.zadaci.forEach(...)`.

- [ ] **Step 6: Prilagodi tri poziva**

Provjereno: `izgradiPredmet` se poziva na **točno tri mjesta** (798, 1663, 1677); definicija je
na 687. Zatvaranje prijave ne iscrtava stranicu iznova, pa prijava nije četvrto mjesto.
Prije izmjene potvrdi:

```bash
grep -c "izgradiPredmet(" index.html   # mora ispisati 4: definicija + tri poziva
```

`index.html:798` (odmah nakon definicije funkcije):

```js
izgradiPredmet(razred, predmet);
```

`index.html`, u `prebaciPredmet()`, poziv `izgradiPredmet(kljuc)` postaje:

```js
  izgradiPredmet(razred, kljuc);
```

`index.html`, pri pokretanju (bio `izgradiPredmet(profil.predmet)`):

```js
izgradiPredmet("2", profil.predmet);   // razred dolazi iz profila u Tasku 3
```

- [ ] **Step 7: Prilagodi 20 poziva `izgradiPredmet` u harnessu**

`provjere/provjere.js` zove `W.izgradiPredmet("<predmet>")` na **20 mjesta** (retci 116, 133,
143, 158, 172, 190, 200, 222, 229, 237, 244, 275, 461, 476, 484, 497, 510, 528, 541, 543).
Svi dobivaju razred kao prvi argument:

```bash
sed -i 's/W\.izgradiPredmet("matematika")/W.izgradiPredmet("2", "matematika")/g; s/W\.izgradiPredmet("hrvatski")/W.izgradiPredmet("2", "hrvatski")/g' provjere/provjere.js
grep -c 'W.izgradiPredmet("2", ' provjere/provjere.js   # mora ispisati 20
```

Ako `grep` ispiše manje od 20, negdje je poziv napisan drugačije — nađi ga s
`grep -n 'izgradiPredmet(' provjere/provjere.js` i popravi rukom.

- [ ] **Step 8: Ažuriraj tvrdnju o naslovu u harnessu**

`provjere/provjere.js`, provjera „matematika: naslov stranice":

```js
provjera("matematika: naslov stranice", async ucitaj => {
  const W = await ucitaj();
  jednako(W.document.title, "Matematika — gradivo 2. razreda", "naslov");
});
```

Ako postoji i tvrdnja o naslovu za hrvatski, ona postaje
`"Hrvatski jezik — gradivo 2. razreda"`. Nijedna druga tvrdnja se ne dira.

- [ ] **Step 9: Dodaj provjeru da gradivo dolazi iz `GRADIVO`**

Dodaj na kraj `provjere/provjere.js`, prije pokretača:

```js
/* ---------- razredi i gradivo ---------- */

provjera("GRADIVO ima 2. razred za oba predmeta", async ucitaj => {
  const W = await ucitaj();
  istina(!!W.GRADIVO["2"].matematika.zadaci.length, "matematika 2. ima zadatke");
  istina(!!W.GRADIVO["2"].hrvatski.zadaci.length, "hrvatski 2. ima zadatke");
  jednako(W.stanje().razred, "2", "aktivni razred");
});

provjera("RAZREDI ima 2., 5. i 6. razred", async ucitaj => {
  const W = await ucitaj();
  jednako(Object.keys(W.RAZREDI), ["2", "5", "6"], "kljucevi razreda");
});
```

- [ ] **Step 10: Pokreni harness — mora proći**

Otvori `http://localhost:8765/provjere/pokreni.html`.
Očekivano: **PASS (45)**.

- [ ] **Step 11: Commit**

```bash
git add zadaci-matematika-2.js zadaci-hrvatski-2.js index.html provjere/provjere.js
git commit -m "Uvedi RAZREDI i GRADIVO, preimenuj datoteke 2. razreda"
```

---

### Task 2: Skeleti za 5. i 6. razred

Četiri nove datoteke, svaka s jednom cjelinom od nekoliko zadataka. Ovo nije sadržaj — sadržaj
dolazi u specovima B–E. Svrha je da pilule imaju što pokazati i da harness ima što provjeriti.

**Files:**
- Create: `zadaci-matematika-5.js`, `zadaci-hrvatski-5.js`, `zadaci-matematika-6.js`,
  `zadaci-hrvatski-6.js`
- Modify: `index.html` (script tagovi, `GRADIVO`)
- Test: `provjere/provjere.js`

**Interfaces:**
- Consumes: `GRADIVO`, `RAZREDI` iz Taska 1.
- Produces: globalne varijable `ZADACI_MATEMATIKA_5`, `ZADACI_HRVATSKI_5`,
  `ZADACI_MATEMATIKA_6`, `ZADACI_HRVATSKI_6`; grane `GRADIVO["5"]` i `GRADIVO["6"]`.
  Zadaci nose polje `oblik` (string: `"broj"` | `"razlomak"` | `"popis"` | `"tekst"`), koje
  provjera počinje koristiti u Tasku 5 — do tada je inertno.

- [ ] **Step 1: Napiši provjeru koja pada**

Dodaj u `provjere/provjere.js`:

```js
provjera("GRADIVO ima sva sest skupova i ni jedan nije prazan", async ucitaj => {
  const W = await ucitaj();
  const parovi = [];
  for (const r of Object.keys(W.RAZREDI))
    for (const p of Object.keys(W.PREDMETI))
      parovi.push([r + "/" + p, (W.GRADIVO[r] && W.GRADIVO[r][p] || {}).zadaci]);
  const prazni = parovi.filter(([, z]) => !z || !z.length).map(([k]) => k);
  jednako(prazni, [], "skupovi bez zadataka");
});
```

- [ ] **Step 2: Pokreni harness — mora pasti**

Očekivano: **FAIL**, s ispisom
`skupovi bez zadataka: dobiveno ["5/matematika","5/hrvatski","6/matematika","6/hrvatski"]`.

- [ ] **Step 3: Napiši `zadaci-matematika-5.js`**

```js
/* Zadaci: Matematika, gradivo 5. razreda.

   SKELET. Prava sadrzajna cjelina dolazi u specu B, vezana na ishode
   MAT OS A.5.1-6, B.5.1-2, C.5.1-3, D.5.1-5 i E.5.1 iz NN 7/2019.

   Polje "oblik" deklarira kako se odgovor provjerava:
     "broj" | "razlomak" | "popis" | "tekst"
   Tipovi zadataka su opisani u READMEu.                                   */

const ZADACI_MATEMATIKA_5 = [
{id:"c1", nav:"Razlomci", title:"Razlomci", lead:"Prikazi razlomka i jednakost razlomaka.", tasks:[
  {t:"calc", oblik:"razlomak", q:"Upiši razlomak koji je jednak polovini.",
   items:[["1/2 = ?/4","2/4"],["1/2 = ?/6","3/6"]]},
  {t:"calc", oblik:"broj", q:"Izračunaj.",
   items:[["2,5 + 1,5","4"],["3,2 − 1,2","2"]]}
]}
];
```

- [ ] **Step 4: Napiši `zadaci-hrvatski-5.js`**

```js
/* Zadaci: Hrvatski jezik, gradivo 5. razreda.

   SKELET. Prava sadrzajna cjelina dolazi u specu D. Jezgra su OS HJ A.5.5
   (promjenjive i nepromjenjive vrste rijeci) i pravopis; B.5.2 ide kao
   "izbor", a produktivni ishodi kao "note".                              */

const ZADACI_HRVATSKI_5 = [
{id:"h1", nav:"Vrste riječi", title:"Promjenjive i nepromjenjive riječi",
 lead:"Prepoznavanje vrste riječi u rečenici.", tasks:[
  {t:"izbor", q:"Koja je vrsta riječi?", items:[
    ["knjiga",  ["imenica","glagol"],   "imenica"],
    ["čitati",  ["glagol","pridjev"],   "glagol"],
    ["brzo",    ["prilog","imenica"],   "prilog"]]}
]}
];
```

- [ ] **Step 5: Napiši `zadaci-matematika-6.js`**

```js
/* Zadaci: Matematika, gradivo 6. razreda.

   SKELET. Prava sadrzajna cjelina dolazi u specu C, vezana na ishode
   MAT OS A.6.1-9, B.6.1, C.6.1-3, D.6.1-5 i E.6.1 iz NN 7/2019.
   Oznaka MAT OS D.6.3 u dokumentu stoji bez vlastitog teksta -- spec C
   je mora provjeriti u izvorniku prije nego joj dodijeli cjelinu.        */

const ZADACI_MATEMATIKA_6 = [
{id:"c1", nav:"Cijeli brojevi", title:"Cijeli brojevi", lead:"Negativni brojevi i racunanje s njima.", tasks:[
  {t:"calc", oblik:"broj", q:"Izračunaj.",
   items:[["−3 + 8","5"],["4 − 9","-5"],["−6 − 2","-8"]]},
  {t:"calc", oblik:"razlomak", q:"Skrati razlomak do kraja.",
   items:[["6/8","3/4"],["10/15","2/3"]]}
]}
];
```

Negativni odgovori u podacima pišu se ASCII minusom (`-5`), a u tekstu zadatka stoji tipografski
minus (`−`). Provjera iz Taska 5 izjednačava obje varijante, pa dijete može upisati bilo koju.

- [ ] **Step 6: Napiši `zadaci-hrvatski-6.js`**

```js
/* Zadaci: Hrvatski jezik, gradivo 6. razreda.

   SKELET. Prava sadrzajna cjelina dolazi u specu E. Jezgra su OS HJ A.6.5
   (promjenjive vrste rijeci) i A.6.6 (jezicna raznolikost), uz pravopis;
   B.6.2 ide kao "izbor", a produktivni ishodi kao "note".                */

const ZADACI_HRVATSKI_6 = [
{id:"h1", nav:"Glagolska vremena", title:"Glagolska vremena",
 lead:"Prepoznavanje vremena u kojem je glagol.", tasks:[
  {t:"izbor", q:"U kojem je vremenu glagol?", items:[
    ["Čitao sam knjigu.", ["perfekt","prezent"], "perfekt"],
    ["Čitam knjigu.",     ["prezent","futur"],   "prezent"],
    ["Čitat ću knjigu.",  ["futur","perfekt"],   "futur"]]}
]}
];
```

- [ ] **Step 7: Dodaj script tagove i grane u `GRADIVO`**

`index.html`, script tagovi (bili redovi 553–554):

```html
<script src="zadaci-matematika-2.js"></script>
<script src="zadaci-hrvatski-2.js"></script>
<script src="zadaci-matematika-5.js"></script>
<script src="zadaci-hrvatski-5.js"></script>
<script src="zadaci-matematika-6.js"></script>
<script src="zadaci-hrvatski-6.js"></script>
```

U `GRADIVO`, uz postojeću granu `"2"`:

```js
  "5": {
    matematika: {
      title:  "Matematika — gradivo 5. razreda",
      naslov: "Ponavljamo matematiku<br>5. razreda",
      uvod:   "Gradivo 5. razreda: prirodni brojevi i djeljivost, razlomci, decimalni brojevi, jednadžbe, likovi i kutovi, mjerenje i podaci.",
      zadaci: ZADACI_MATEMATIKA_5
    },
    hrvatski: {
      title:  "Hrvatski jezik — gradivo 5. razreda",
      naslov: "Ponavljamo hrvatski<br>5. razreda",
      uvod:   "Gradivo 5. razreda: promjenjive i nepromjenjive vrste riječi, pravopis i književni pojmovi.",
      zadaci: ZADACI_HRVATSKI_5
    }
  },
  "6": {
    matematika: {
      title:  "Matematika — gradivo 6. razreda",
      naslov: "Ponavljamo matematiku<br>6. razreda",
      uvod:   "Gradivo 6. razreda: racionalni brojevi, cijeli brojevi, postoci, konstrukcije trokuta i četverokuta, koordinatni sustav i podaci.",
      zadaci: ZADACI_MATEMATIKA_6
    },
    hrvatski: {
      title:  "Hrvatski jezik — gradivo 6. razreda",
      naslov: "Ponavljamo hrvatski<br>6. razreda",
      uvod:   "Gradivo 6. razreda: promjenjive vrste riječi, glagolska vremena, jezična raznolikost i pravopis.",
      zadaci: ZADACI_HRVATSKI_6
    }
  }
```

- [ ] **Step 8: Pokreni harness — mora proći**

Očekivano: **PASS (46)**.

- [ ] **Step 9: Commit**

```bash
git add zadaci-matematika-5.js zadaci-hrvatski-5.js zadaci-matematika-6.js zadaci-hrvatski-6.js index.html provjere/provjere.js
git commit -m "Dodaj skelete zadataka za 5. i 6. razred"
```

---

### Task 3: Složeni ključ napretka i migracija na `v:3`

**Files:**
- Modify: `index.html:587` (`profil`), `index.html:597-614` (`ucitajProfil`),
  `index.html:1617-1624` (`zapamtiOdgovore`), `index.html:1626-1628` (`vratiNapredak`),
  `index.html:1677` (pokretanje)
- Test: `provjere/provjere.js`

**Interfaces:**
- Consumes: `RAZREDI`, `GRADIVO`, `razred`, `predmet` iz Taskova 1–2.
- Produces:
  - `kljucNapretka()` → string oblika `"2/matematika"`
  - `profil` oblika `{ v:3, ime, avatar, razred, predmet, napredak }`, gdje su ključevi
    `napredak` mape složeni (`"razred/predmet"`)

- [ ] **Step 1: Napiši provjere koje padaju**

Dodaj u `provjere/provjere.js`:

```js
/* ---------- migracija profila na v:3 ---------- */

provjera("v:1 zapis se migrira u napredak 2/matematika", async ucitaj => {
  localStorage.setItem("mat3-profil-v1", JSON.stringify({
    ime: "Luka", avatar: "jedi", odgovori: { "c1|63|0": "6D3J" }
  }));
  const W = await ucitaj();
  await cekaj(300);
  const zapis = JSON.parse(localStorage.getItem("mat3-profil-v1"));
  jednako(zapis.v, 3, "verzija zapisa");
  jednako(zapis.ime, "Luka", "ime je ocuvano");
  jednako(zapis.razred, "2", "razred");
  jednako(zapis.napredak["2/matematika"]["c1|63|0"], "6D3J", "odgovor je preseljen");
  jednako(W.document.querySelectorAll("#main input.ok").length, 1, "odgovor je vracen na ekran");
});

provjera("v:2 zapis se migrira u slozene kljuceve", async ucitaj => {
  localStorage.setItem("mat3-profil-v1", JSON.stringify({
    v: 2, ime: "Ana", avatar: "patuljak", predmet: "hrvatski",
    napredak: { matematika: { "c1|63|0": "6D3J" }, hrvatski: { "h1|Živim u ____.|0": "Hrvatskoj" } }
  }));
  const W = await ucitaj();
  await cekaj(300);
  const zapis = JSON.parse(localStorage.getItem("mat3-profil-v1"));
  jednako(zapis.v, 3, "verzija zapisa");
  jednako(zapis.napredak["2/matematika"]["c1|63|0"], "6D3J", "matematika preseljena");
  istina(!!zapis.napredak["2/hrvatski"], "hrvatski preseljen");
  jednako(zapis.napredak.matematika, undefined, "stari kljuc je uklonjen");
  jednako(W.stanje().predmet, "hrvatski", "otvara se na zapamcenom predmetu");
  jednako(W.stanje().razred, "2", "otvara se na 2. razredu");
});

provjera("zapis novije verzije se cita i ne gubi nepoznate kljuceve", async ucitaj => {
  localStorage.setItem("mat3-profil-v1", JSON.stringify({
    v: 4, ime: "Mia", avatar: "jedi", razred: "2", predmet: "matematika",
    napredak: { "2/matematika": { "c1|63|0": "6D3J" }, "9/fizika": { "x|y|0": "42" } }
  }));
  const W = await ucitaj();
  await cekaj(300);
  const zapis = JSON.parse(localStorage.getItem("mat3-profil-v1"));
  jednako(W.document.querySelectorAll("#main input.ok").length, 1, "poznati napredak je prikazan");
  jednako(zapis.napredak["9/fizika"]["x|y|0"], "42", "nepoznati kljuc je prezivio upis");
});

provjera("napredak se pamti po paru razred/predmet", async ucitaj => {
  const W = await ucitaj();
  const m = polja(W)[0];
  upisi(W, m, m.dataset.answer);
  await cekaj(300);
  const zapis = JSON.parse(localStorage.getItem("mat3-profil-v1"));
  jednako(Object.keys(zapis.napredak), ["2/matematika"], "kljucevi napretka");
  jednako(zapis.razred, "2", "zapisan razred");
});
```

- [ ] **Step 2: Pokreni harness — mora pasti**

Očekivano: **FAIL**, prva pogreška `verzija zapisa: dobiveno 2, ocekivano 3`.

- [ ] **Step 3: Prepiši `profil` i `ucitajProfil`**

`index.html`, deklaracija profila:

```js
const profil = { v: 3, ime: "", avatar: "patuljak", razred: "2", predmet: "matematika", napredak: {} };

// Kljuc pamcenja je par razreda i predmeta. Isti oblik kljuca koristi i
// Set "promijenjeni", pa zastita od zastarjele kartice radi nepromijenjeno.
const kljucNapretka = () => razred + "/" + predmet;
```

`ucitajProfil()` u cijelosti:

```js
function ucitajProfil() {
  try {
    const zapis = JSON.parse(localStorage.getItem(KLJUC_PROFILA) || "null");
    if (!zapis || typeof zapis !== "object") return false;
    profil.ime = typeof zapis.ime === "string" ? zapis.ime.slice(0, 20) : "";
    profil.avatar = zapis.avatar === "jedi" ? "jedi" : "patuljak";
    profil.predmet = PREDMETI[zapis.predmet] ? zapis.predmet : "matematika";

    const mapa = (zapis.napredak && typeof zapis.napredak === "object" &&
                  !Array.isArray(zapis.napredak)) ? zapis.napredak : {};

    if (zapis.v >= 3) {
      // v:3 i noviji: kljucevi su vec slozeni. Nepoznate kljuceve zadrzavamo --
      // dolaze iz novije verzije stranice i ne smijemo ih izgubiti pri upisu.
      profil.razred = RAZREDI[zapis.razred] ? zapis.razred : "2";
      profil.napredak = mapa;
    } else if (zapis.v === 2) {
      // zapis prije uvodenja razreda: sve je bilo gradivo 2. razreda
      profil.razred = "2";
      profil.napredak = {};
      for (const p of Object.keys(mapa))
        if (PREDMETI[p]) profil.napredak["2/" + p] = mapa[p];
    } else {
      // v:1, prije uvodenja predmeta: odgovori su bili samo matematicki
      profil.razred = "2";
      profil.predmet = "matematika";
      profil.napredak = {
        "2/matematika": (zapis.odgovori && typeof zapis.odgovori === "object") ? zapis.odgovori : {}
      };
    }
    return true;
  } catch (_) { return false; }        // privatni prozor ili ugasena pohrana
}
```

- [ ] **Step 4: Prepiši `zapamtiOdgovore` i `vratiNapredak`**

```js
function zapamtiOdgovore() {
  const zapis = {};
  inputs().forEach(i => { if (i.value.trim() !== "") zapis[i.dataset.key] = i.value; });
  const kljuc = kljucNapretka();
  profil.napredak[kljuc] = zapis;
  promijenjeni.add(kljuc);
  profil.razred = razred;
  profil.predmet = predmet;
  spremiProfil();
}

function vratiNapredak() {
  const zapis = profil.napredak[kljucNapretka()];
  if (!zapis || !Object.keys(zapis).length) return 0;
```

Ostatak `vratiNapredak()` je nepromijenjen.

Blok spajanja s diskom u `spremiProfil()` (`index.html:626-628`) **mora promijeniti uvjet
verzije** s `naDisku.v === 2` na `naDisku.v >= 3`:

```js
      if (naDisku && naDisku.v >= 3 && naDisku.napredak &&
```

Ostatak bloka ostaje kakav je — iterira `Object.keys(naDisku.napredak)` i uspoređuje sa
`promijenjeni`, pa radi na složenim ključevima jednako kao na starim.

**Zašto uvjet mora ići uz migraciju:** čim `profil.v` postane 3, zapis na disku je `v:3`, pa
`=== 2` više nikad nije istinit i blok spajanja se ne izvrši. Zaštita od zastarjele kartice bila
bi trajno mrtva, a napredak koji druga kartica upiše bio bi prepisan pri sljedećem odgođenom
upisu — što ruši nadređenu invarijantu „nijedna grana ne briše napredak". `>= 2` je pogrešno u
drugu stranu: goli ključ `matematika` s v:2 diska vratio bi se u `profil.napredak` i zauvijek
ostao u zapisu. `=== 3` je prestrogo, jer v:4 zapis po ugovoru ove verzije ima složene ključeve
i mora ući u spajanje.

- [ ] **Step 4b: Prilagodi i gumb „Počni ispočetka"**

Gumb koji prazni napredak (`index.html:1429`, `profil.napredak[predmet] = {}`) također je pisač u
`napredak` i mora prijeći na složeni ključ:

```js
  profil.napredak[kljucNapretka()] = {};   // inace bi osvjezavanje vratilo stare odgovore
  promijenjeni.add(kljucNapretka());
```

Bez ovoga gumb tiho ne radi: brisao bi pod golim `predmet`, a `vratiNapredak()` čita složeni
ključ, pa bi se stari odgovori vratili pri prvom osvježavanju.

Nakon Taska 3 svaki pisač u `profil.napredak` ide kroz `kljucNapretka()`. Provjeri:

```bash
grep -n "profil.napredak\[" index.html    # svaki mora koristiti kljucNapretka() ili slozeni kljuc
```

- [ ] **Step 5: Prilagodi pokretanje**

```js
izgradiPredmet(profil.razred, profil.predmet);   // otvori se na zadnjem paru
```

- [ ] **Step 6: Pokreni harness — mora proći**

Očekivano: **PASS (50)**.

- [ ] **Step 7: Commit**

```bash
git add index.html provjere/provjere.js
git commit -m "Pamti napredak po paru razred/predmet i migriraj profil na v:3"
```

---

### Task 4: Pilule razreda u zaglavlju

**Files:**
- Modify: `index.html:374` (markup), `index.html:297-303` i `index.html:357` (CSS),
  `index.html:1645-1673` (prekidač)
- Test: `provjere/provjere.js`

**Interfaces:**
- Consumes: `RAZREDI`, `GRADIVO`, `kljucNapretka()`, `izgradiPredmet(razred, predmet)`.
- Produces:
  - `prebaciRazred(kljuc)` — mijenja razred i iscrtava stranicu
  - `oznaciRazred()` — postavlja `aktivan` i `aria-pressed` na pilulama razreda
  - `imaGradivo(razred, predmet)` → boolean
  - DOM: `#razredi .razred[data-razred]`

- [ ] **Step 1: Napiši provjere koje padaju**

```js
/* ---------- prekidac razreda ---------- */

provjera("prekidac razreda ima pilulu za svaki razred", async ucitaj => {
  const W = await ucitaj();
  const pilule = [...W.document.querySelectorAll("#razredi .razred")];
  jednako(pilule.map(p => p.dataset.razred), ["2", "5", "6"], "pilule");
  jednako(pilule.filter(p => p.classList.contains("aktivan")).length, 1, "jedna je aktivna");
  jednako(pilule.filter(p => p.disabled).length, 0, "ni jedna nije onemogucena");
});

provjera("prebacivanje razreda mijenja naslov i cjeline", async ucitaj => {
  const W = await ucitaj();
  W.document.querySelector("#razredi .razred[data-razred='6']").click();
  await cekaj(300);
  jednako(W.document.title, "Matematika — gradivo 6. razreda", "naslov");
  jednako(W.stanje().razred, "6", "aktivni razred");
  istina(!!W.document.querySelector("#main section#c1"), "cjelina je iscrtana");
});

provjera("prebacivanje razreda cuva napredak oba razreda", async ucitaj => {
  const W = await ucitaj();
  const m = polja(W)[0];
  upisi(W, m, m.dataset.answer);
  await cekaj(300);
  W.document.querySelector("#razredi .razred[data-razred='6']").click();
  await cekaj(300);
  const n = polja(W)[0];
  upisi(W, n, n.dataset.answer);
  await cekaj(300);
  W.document.querySelector("#razredi .razred[data-razred='2']").click();
  await cekaj(300);
  jednako(polja(W)[0].value, polja(W)[0].dataset.answer, "odgovor 2. razreda je vracen");
  const zapis = JSON.parse(localStorage.getItem("mat3-profil-v1"));
  jednako(Object.keys(zapis.napredak).sort(), ["2/matematika", "6/matematika"], "oba kljuca");
});

provjera("razred i predmet prezive osvjezavanje stranice", async ucitaj => {
  const W = await ucitaj();
  W.document.querySelector("#razredi .razred[data-razred='5']").click();
  await cekaj(300);
  W.document.querySelector("#predmeti .predmet[data-predmet='hrvatski']").click();
  await cekaj(300);
  const W2 = await ucitaj();
  jednako(W2.stanje().razred, "5", "razred nakon osvjezavanja");
  jednako(W2.stanje().predmet, "hrvatski", "predmet nakon osvjezavanja");
});
```

- [ ] **Step 2: Pokreni harness — mora pasti**

Očekivano: **FAIL**, `pilule: dobiveno [], ocekivano ["2","5","6"]`.

- [ ] **Step 3: Dodaj markup**

`index.html`, neposredno **prije** retka s `id="predmeti"`:

```html
  <div class="razredi" id="razredi" role="group" aria-label="Razred"></div>
```

- [ ] **Step 4: Dodaj CSS**

Uz postojeći blok `.predmeti` / `button.predmet`:

```css
  .razredi{display:flex;gap:10px;margin:14px 0 0;flex-wrap:wrap}
  button.razred{
    min-height:46px;min-width:46px;padding:0 18px;border-radius:999px;
    font:700 16px/1 "Nunito",sans-serif;
    background:#f1eee2;border:2px solid transparent;color:var(--ink);
  }
  button.razred.aktivan{background:var(--grass);border-color:var(--grass);color:#fff}
  button.razred:disabled{opacity:.45}
```

U postojeći `@media` blok koji sadrži `button.predmet{width:auto}` (oko retka 357) dodaj:

```css
    button.razred{width:auto}
```

I novi blok za uski ekran, uz ostale media upite:

```css
  @media (max-width:420px){
    button.razred{padding:0 14px}
    button.razred .dugo{display:none}
  }
```

- [ ] **Step 5: Dodaj prekidač razreda**

`index.html`, neposredno **prije** bloka `/* ---------- prekidac predmeta ---------- */`:

```js
/* ---------- prekidac razreda ----------
   Isti mehanizam kao prekidac predmeta. Razred bez ucitanih zadataka dobiva
   onemogucenu pilulu: bolje jedan nedostupan razred nego bijela stranica.
------------------------------------------------------------------------- */
const razrediTraka = document.getElementById("razredi");

const imaGradivo = (r, p) =>
  !!(GRADIVO[r] && GRADIVO[r][p] && GRADIVO[r][p].zadaci && GRADIVO[r][p].zadaci.length);

function iscrtajRazrede() {
  razrediTraka.innerHTML = Object.entries(RAZREDI).map(([k, r]) => {
    const dostupan = imaGradivo(k, predmet);
    return `<button type="button" class="razred" data-razred="${k}"` +
           ` aria-pressed="false" aria-label="${r.naziv}"` +
           (dostupan ? "" : ` disabled title="zadaci za ovaj razred nisu učitani"`) +
           `>${r.kratko}<span class="dugo">. razred</span></button>`;
  }).join("");
}

function oznaciRazred() {
  razrediTraka.querySelectorAll(".razred").forEach(b => {
    const je = b.dataset.razred === razred;
    b.classList.toggle("aktivan", je);
    b.setAttribute("aria-pressed", je ? "true" : "false");
  });
}

function prebaciRazred(kljuc) {
  if (kljuc === razred || !imaGradivo(kljuc, predmet)) return;
  zapamtiOdgovore();                 // zapamti ono sto ostaje za sobom
  streak = 0;
  finaleShown = false;
  buddy.reset();
  izgradiPredmet(kljuc, predmet);
  profil.razred = razred;
  spremiProfil();
  oznaciRazred();
  vratiNapredak();
  updateProgress();
}

razrediTraka.addEventListener("click", e => {
  const b = e.target.closest(".razred");
  if (b && !b.disabled) prebaciRazred(b.dataset.razred);
});
```

- [ ] **Step 6: Poveži s prekidačem predmeta i pokretanjem**

U `prebaciPredmet()`, nakon `izgradiPredmet(razred, kljuc);` dodaj:

```js
  iscrtajRazrede();                  // dostupnost razreda ovisi o predmetu
  oznaciRazred();
```

Pri pokretanju, uz `oznaciPredmet();`:

```js
iscrtajRazrede();
oznaciRazred();
```

`iscrtajRazrede()` mora doći **nakon** `izgradiPredmet(...)`, jer čita `predmet`.

- [ ] **Step 7: Pokreni harness — mora proći**

Očekivano: **PASS (54)**.

- [ ] **Step 8: Commit**

```bash
git add index.html provjere/provjere.js
git commit -m "Dodaj pilule za odabir razreda u zaglavlje"
```

---

### Task 5: Provjera odgovora po deklariranom obliku

**Files:**
- Modify: `index.html:800-816` (`norm`, `ocisti`, `tocno`), `index.html:701-770`
  (iscrtavanje polja — prenošenje `oblik` u `data-oblik`)
- Test: `provjere/provjere.js`

**Interfaces:**
- Consumes: `PREDMETI[predmet].provjera`, polje `oblik` iz podataka (Task 2).
- Produces:
  - `razloziBroj(v)` → `{ a: number, b: number } | null` — racionalna vrijednost `a/b`
  - `usporedi(oblik, upis, odgovor)` → `boolean`
  - `oblikValjan(oblik, odgovor)` → `boolean` — je li **odgovor iz podataka** razložljiv
  - `tocno(upis, odgovor, oblik)` → `boolean` (treći argument neobavezan)
  - DOM: `input[data-oblik]`, a pokvareno polje dobiva `disabled` i klasu `pokvaren` te
    **nema** `data-answer`, pa ne ulazi u `data-total`

- [ ] **Step 1: Napiši provjere koje padaju**

```js
/* ---------- provjera po obliku odgovora ---------- */

provjera("oblik broj: varijante minusa i decimalnog znaka", async ucitaj => {
  const W = await ucitaj();
  const u = (a, b) => W.usporedi("broj", a, b);
  istina(u("-5", "−5"),   "ASCII minus vrijedi za tipografski");
  istina(u("−5", "-5"),   "tipografski minus vrijedi za ASCII");
  istina(u("‑5", "-5"),   "neprelomni minus vrijedi");
  istina(u("2.5", "2,5"), "tocka i zarez su isti decimalni znak");
  istina(u("2,50", "2,5"), "nula na kraju ne mijenja vrijednost");
  istina(!u("5", "-5"),   "predznak je bitan");
});

provjera("oblik razlomak: usporedba po vrijednosti", async ucitaj => {
  const W = await ucitaj();
  const u = (a, b) => W.usporedi("razlomak", a, b);
  istina(u("6/8", "3/4"),    "prosireni razlomak vrijedi");
  istina(u("0,75", "3/4"),   "decimalni zapis vrijedi");
  istina(u("1 1/2", "3/2"),  "mjesoviti zapis vrijedi");
  istina(u("-3/4", "−3/4"),  "negativni razlomak, oba minusa");
  istina(!u("4/3", "3/4"),   "obrnut razlomak ne vrijedi");
});

provjera("oblik razlomak: nema binarne pogreske", async ucitaj => {
  const W = await ucitaj();
  istina(W.usporedi("razlomak", "0,3", "3/10"), "0,3 = 3/10");
  // 0,1 -> 1/10, 0,2 -> 1/5 (skrati ga skrati). Unakrsni zbroj je 15/50, sto je
  // egzaktno 3/10 -- provjeravamo vrijednost, ne konkretan brojnik i nazivnik.
  const r = W.razloziBroj("0,1");
  const s = W.razloziBroj("0,2");
  const zbrojA = r.a * s.b + s.a * r.b, zbrojB = r.b * s.b;
  jednako(zbrojA * 10, 3 * zbrojB, "0,1 + 0,2 je egzaktno 3/10, bez binarne pogreske");
});

provjera("oblik popis: poredak je bitan, razmaci nisu", async ucitaj => {
  const W = await ucitaj();
  istina(W.usporedi("popis", "40, 50, 60", "40,50,60"), "razmaci ne smetaju");
  istina(!W.usporedi("popis", "50,40,60", "40,50,60"), "poredak je bitan");
});

provjera("oblik tekst: dijakritika i eksponent su bitni", async ucitaj => {
  const W = await ucitaj();
  istina(W.usporedi("tekst", "cm²", "cm²"), "isti zapis");
  istina(!W.usporedi("tekst", "cm2", "cm²"), "eksponent je bitan");
  istina(!W.usporedi("tekst", "jednakokracan", "jednakokračan"), "dijakritika je bitna");
});

provjera("2. razred se provjerava starim pravilom", async ucitaj => {
  const W = await ucitaj();
  const inp = polja(W).find(i => i.dataset.answer.includes(","));
  jednako(inp.dataset.oblik, undefined, "polje 2. razreda nema oblik");
  upisi(W, inp, inp.dataset.answer.replace(/,/g, "."));
  await cekaj(120);
  istina(inp.classList.contains("ok"), "tocka i zarez se i dalje broje kao isto");
});

provjera("pokvaren odgovor u podacima ne kaznjava dijete", async ucitaj => {
  const W = await ucitaj();
  jednako(W.oblikValjan("razlomak", "tri četvrtine"), false, "neispravan odgovor");
  jednako(W.oblikValjan("razlomak", "3/4"), true, "ispravan odgovor");
  jednako(W.oblikValjan("", "3/4"), true, "bez oblika vrijedi staro pravilo");
  jednako(W.oblikValjan("razlomci", "3/4"), false, "tipfeler u obliku je greska");
  jednako(W.usporedi("razlomci", "6/8", "3/4"), null, "nepoznat oblik ne usporeduje");
});
```

- [ ] **Step 2: Pokreni harness — mora pasti**

Očekivano: **FAIL**, `W.usporedi is not a function`.

- [ ] **Step 3: Napiši razlaganje i usporedbu**

`index.html`, blok `/* ---------- provjera ---------- */` se dopunjuje. Postojeći `norm`,
`ocisti` i `tocno` **ostaju**, `tocno` dobiva treći argument:

```js
/* ---------- provjera ---------- */
const norm = v => v.toString().toLowerCase()
  .replace(/\s+/g, "")
  .replace(/\./g, ",")      // 3.70 = 3,70
  .replace(/;/g, ",")
  .replace(/^,|,$/g, "");

/* Hrvatski: sabij samo visak razmaka. Veliko i malo slovo, dijakritika i
   zavrsni recenicni znak su bitni, jer se upravo to uvjezbava.            */
const ocisti = v => v.toString().trim().replace(/\s+/g, " ");

/* ---------- oblici odgovora ----------
   Oblik se deklarira u podacima poljem "oblik", ne pogada se iz zapisa:
   "2,5" je decimalni broj, "8,33" je dvoclani popis, a razlikovati ih iz
   samog niza znakova nije moguce. Gradivo 2. razreda nema "oblik" i ide
   starim putem, bit po bit.
------------------------------------------------------------------------- */

// sve varijante minus znaka u ASCII minus, pa decimalni zarez u tocku
const izravnajZnakove = v => v.toString().trim()
  .replace(/[−‑–—]/g, "-")
  .replace(/\s+/g, " ");

/* Razlozi broj u egzaktan razlomak a/b s cjelobrojnim a i b. Bez
   parseFloat usporedbe: 0,1 + 0,2 mora ostati 3/10, ne 0.30000000000000004.
   Prima: "-5", "2,5", "3/4", "-3/4", "1 1/2". Vraca null ako ne uspije.   */
function razloziBroj(v) {
  const s = izravnajZnakove(v).replace(/,/g, ".");
  if (s === "") return null;

  const cijeliIliDecimalni = t => {
    if (!/^-?\d+(\.\d+)?$/.test(t)) return null;
    const minus = t.startsWith("-") ? -1 : 1;
    const [c, d = ""] = t.replace("-", "").split(".");
    const b = Math.pow(10, d.length);
    return { a: minus * Number(c + d), b };
  };

  const skrati = ({ a, b }) => {
    const nzd = (x, y) => y ? nzd(y, x % y) : Math.abs(x);
    const d = nzd(a, b) || 1;
    return b < 0 ? { a: -a / d, b: -b / d } : { a: a / d, b: b / d };
  };

  // mjesoviti broj: "1 1/2"
  const mjes = s.match(/^(-?\d+)\s+(\d+)\/(\d+)$/);
  if (mjes) {
    const c = Number(mjes[1]), n = Number(mjes[2]), d = Number(mjes[3]);
    if (!d) return null;
    const znak = c < 0 ? -1 : 1;
    return skrati({ a: znak * (Math.abs(c) * d + n), b: d });
  }

  // razlomak: "3/4", "-3/4"
  const raz = s.match(/^(-?\d+)\/(-?\d+)$/);
  if (raz) {
    const d = Number(raz[2]);
    if (!d) return null;
    return skrati({ a: Number(raz[1]), b: d });
  }

  const cd = cijeliIliDecimalni(s);
  return cd ? skrati(cd) : null;
}

const istaVrijednost = (x, y) => !!x && !!y && x.a * y.b === y.a * x.b;

/* Popis dopustenih oblika. Bez njega bi tipfeler (oblik:"razlomci") tiho
   propao na pravilo predmeta: 6/8 bi se usporedilo kao niz znakova s 3/4 i
   dijete bi dobilo netocno, a harness bi ostao zelen.                     */
const OBLICI = ["broj", "razlomak", "popis", "tekst"];
window.OBLICI = OBLICI;              // harness ga cita; const ne dolazi na window

// je li odgovor iz podataka razlozljiv u deklarirani oblik
function oblikValjan(oblik, odgovor) {
  if (!oblik) return true;                       // nedeklariran: staro pravilo
  if (!OBLICI.includes(oblik)) return false;     // nepoznat oblik je greska u podacima
  if (oblik === "broj" || oblik === "razlomak") return !!razloziBroj(odgovor);
  if (oblik === "popis")
    return izravnajZnakove(odgovor).split(",").every(d => !!razloziBroj(d));
  return ocisti(odgovor) !== "";                 // tekst
}

function usporedi(oblik, upis, odgovor) {
  if (oblik === "broj" || oblik === "razlomak")
    return istaVrijednost(razloziBroj(upis), razloziBroj(odgovor));
  if (oblik === "popis") {
    const a = izravnajZnakove(upis).split(",").map(razloziBroj);
    const b = izravnajZnakove(odgovor).split(",").map(razloziBroj);
    return a.length === b.length && a.every((x, i) => istaVrijednost(x, b[i]));
  }
  if (oblik === "tekst") return ocisti(upis) === ocisti(odgovor);
  return null;                        // nema deklariranog oblika
}

// koje pravilo vrijedi odlucuje oblik, a kad ga nema -- predmet
function tocno(upis, odgovor, oblik) {
  if (oblik) {
    const r = usporedi(oblik, upis, odgovor);
    if (r !== null) return r;
  }
  return PREDMETI[predmet].provjera === "rijec"
    ? ocisti(upis) === ocisti(odgovor)
    : norm(upis) === norm(odgovor);
}
```

- [ ] **Step 4: Prenesi `oblik` u polje i onemogući pokvarena polja**

U `izgradiPredmet`, u dijelu koji iscrtava `calc` polja (oko retka 743), prije generiranja
HTML-a dodaj:

```js
        const oblik = task.oblik || "";
        const valjan = !oblik || oblikValjan(oblik, answer);
```

`<input>` za `calc` postaje:

```js
          <input type="text" class="ans${wide}${valjan ? "" : " pokvaren"}" id="${id}"
                 ${valjan ? `data-answer="${answer}"` : "disabled"}
                 ${oblik ? `data-oblik="${oblik}"` : ""}
                 data-key="${kljuc2}"
```

Iza polja, kad `valjan` nije istina, umjesto oznake ide napomena:

```js
        if (!valjan) html += `<span class="napomena">zadatak je u pripremi</span>`;
```

Isto za `izbor` polja (oko retka 766): `data-oblik` se dodaje, a pokvareni zadatak dobiva
`disabled` i nema `data-answer`.

- [ ] **Step 4b: Izbaci pokvareno polje iz brojanja razine**

`index.html:781` sad broji sva tekstualna polja:

```js
  const total = el.querySelectorAll("input[type=text]").length;
```

Postaje brojanje samo polja s odgovorom:

```js
  const total = el.querySelectorAll("input[data-answer]").length;
```

Pokvareno polje nema `data-answer`, pa ne ulazi u `total` i razina se može svladati bez njega.
Za gradivo 2. razreda broj ostaje isti (85), jer sva polja imaju odgovor.

- [ ] **Step 4c: Dodaj treći argument na sva četiri poziva `tocno`**

Provjereno: `tocno` se poziva na **četiri mjesta** — `index.html:1371` (`updateProgress`),
`1451` (`focusout` obrađivač), `1471` (klik na tipku kod `izbor`) i `1635` (`vratiNapredak`).
Svaki dobiva `inp.dataset.oblik` kao treći argument:

```bash
sed -i 's/tocno(inp\.value, inp\.dataset\.answer)/tocno(inp.value, inp.dataset.answer, inp.dataset.oblik)/g; s/tocno(v, inp\.dataset\.answer)/tocno(v, inp.dataset.answer, inp.dataset.oblik)/g' index.html
grep -c "inp.dataset.oblik)" index.html    # mora ispisati 4
```

Ako `grep` ispiše manje od 4, nađi preostali poziv s `grep -n "tocno(" index.html` i popravi
rukom. Propušten poziv znači da bi polje 5./6. razreda tiho ostalo na starom pravilu.

- [ ] **Step 5: Dodaj CSS za pokvareno polje**

```css
  input.pokvaren{background:#f4f2ec;color:var(--muted)}
  .napomena{font-size:14px;color:var(--muted);margin-left:8px}
```

- [ ] **Step 6: Pokreni harness — mora proći**

Očekivano: **PASS (61)**.

- [ ] **Step 7: Commit**

```bash
git add index.html provjere/provjere.js
git commit -m "Provjeravaj odgovore po deklariranom obliku (broj, razlomak, popis, tekst)"
```

---

### Task 6: Traka znakova po predmetu i razredu

**Files:**
- Modify: `index.html:1481-1512` (traka znakova), `index.html:561-575` (`znakovi` za matematiku)
- Test: `provjere/provjere.js`

**Interfaces:**
- Consumes: `PREDMETI[predmet].znakovi`, `razred`.
- Produces: `znakoviZaUnos()` → `string[]`; `iscrtajZnakove()` prepisuje `#slova`.

- [ ] **Step 1: Napiši provjere koje padaju**

```js
/* ---------- traka znakova za unos ---------- */

provjera("hrvatski ima traku slova na svim razredima", async ucitaj => {
  const W = await ucitaj();
  W.document.querySelector("#predmeti .predmet[data-predmet='hrvatski']").click();
  await cekaj(300);
  jednako(W.znakoviZaUnos(), ["č", "ć", "š", "ž", "đ"], "znakovi na 2. razredu");
  W.document.querySelector("#razredi .razred[data-razred='6']").click();
  await cekaj(300);
  jednako(W.znakoviZaUnos(), ["č", "ć", "š", "ž", "đ"], "znakovi na 6. razredu");
});

provjera("matematika ima traku znakova samo na 5. i 6. razredu", async ucitaj => {
  const W = await ucitaj();
  jednako(W.znakoviZaUnos(), [], "2. razred nema traku");
  W.document.querySelector("#razredi .razred[data-razred='5']").click();
  await cekaj(300);
  jednako(W.znakoviZaUnos(), ["-", "/", ",", "²", "³"], "5. razred");
  W.document.querySelector("#razredi .razred[data-razred='6']").click();
  await cekaj(300);
  jednako(W.znakoviZaUnos(), ["-", "/", ",", "²", "³"], "6. razred");
});

provjera("tipka iz trake upisuje znak u polje u fokusu", async ucitaj => {
  const W = await ucitaj();
  W.document.querySelector("#razredi .razred[data-razred='6']").click();
  await cekaj(300);
  const inp = vidljivaPolja(W)[0];
  // Samo inp.focus() nije dosta: kad prozor preglednika nema OS fokus,
  // focusin se ne okine, traka ostane skrivena i provjera pada iako je kod
  // ispravan. Odasiljemo dogadjaj sami, kao sto upisi() radi za focusout.
  inp.focus();
  inp.dispatchEvent(new W.FocusEvent("focusin", { bubbles: true }));
  await cekaj(60);
  W.document.querySelector("#slova .slovo[data-slovo='/']").click();
  jednako(inp.value, "/", "znak je upisan");
});
```

- [ ] **Step 2: Pokreni harness — mora pasti**

Očekivano: **FAIL**, `W.znakoviZaUnos is not a function`.

- [ ] **Step 3: Dodaj `znakovi` za matematiku**

U `PREDMETI.matematika`:

```js
    znakovi:  { "5": ["-", "/", ",", "²", "³"], "6": ["-", "/", ",", "²", "³"] }
```

- [ ] **Step 4: Prepiši traku znakova**

`index.html`, blok koji je počinjao s `const HRVATSKA_SLOVA = [...]`:

```js
/* ---------- traka znakova za unos ----------
   Red se pojavi samo kad predmet i razred imaju znakove i samo dok je polje
   za upis u fokusu. Hrvatski dobiva č ć š ž đ na svim razredima, matematika
   - / , ² ³ na 5. i 6. -- na tabletu se bez toga ne mogu upisati.
   mousedown/touchstart se zaustavljaju da polje ne izgubi fokus: inace bi
   focusout provjerio odgovor usred tipkanja i oznacio ga netocnim.
------------------------------------------------------------------------- */
const slovaTraka = document.getElementById("slova");

function znakoviZaUnos() {
  const z = PREDMETI[predmet].znakovi || {};
  return z[razred] || z["*"] || [];
}

function iscrtajZnakove() {
  slovaTraka.innerHTML = znakoviZaUnos().map(z =>
    `<button type="button" class="slovo" data-slovo="${z}" aria-label="znak ${z}">${z}</button>`
  ).join("");
}

iscrtajZnakove();
```

U `main.addEventListener("focusin", ...)`, redak koji je bio
`slovaTraka.hidden = PREDMETI[predmet].provjera !== "rijec";` postaje:

```js
  slovaTraka.hidden = znakoviZaUnos().length === 0;
```

Ostatak bloka (odmicanje polja, `focusout`, `mousedown`/`touchstart`, klik obrađivač)
nepromijenjen — `data-slovo` i dalje nosi znak.

- [ ] **Step 5: Iscrtaj traku pri svakoj promjeni razreda ili predmeta**

U `prebaciRazred()` i `prebaciPredmet()`, uz `oznaciRazred()` / `oznaciPredmet()`:

```js
  iscrtajZnakove();
```

**I pri pokretanju stranice**, uz `iscrtajRazrede()` / `oznaciRazred()`:

```js
iscrtajZnakove();
```

Bez tog poziva korisnik s pamćenim profilom (npr. hrvatski, 6. razred) dobije pri prvom fokusu
praznu ili pogrešnu traku, jer je `#slova` iscrtan samo za zadane vrijednosti — i to ostane tako
dok razred ili predmet ručno ne prebaci.

Poziv `iscrtajZnakove()` **ne smije** ući u `izgradiPredmet()`, iako bi to izgledalo čišće:
`izgradiPredmet` se poziva rano u skripti, iznad deklaracije `const slovaTraka`, pa bi to bacilo
`Cannot access 'slovaTraka' before initialization`. Pozivi ostaju u `prebaciRazred()`,
`prebaciPredmet()` i bloku pokretanja.

- [ ] **Step 6: Pokreni harness — mora proći**

Očekivano: **PASS (64)**.

- [ ] **Step 7: Commit**

```bash
git add index.html provjere/provjere.js
git commit -m "Traka znakova za unos ovisi o predmetu i razredu"
```

---

### Task 7: Deset novih rečenica po liku po ishodu

**Files:**
- Modify: `index.html` (`PATULJAK.rijeci`, `JEDI.rijeci`)
- Test: `provjere/provjere.js`

**Interfaces:**
- Consumes: `LIKOVI` (`{ patuljak, jedi }`), `rijeci: { happy, angry, party }`.
- Produces: `happy` i `angry` imaju najmanje 20 rečenica po liku, `party` najmanje 8.
  Rečenice mogu sadržavati `[…, {ime}]` — nadimak ispada kad ga nema.

- [ ] **Step 1: Napiši provjeru koja pada**

```js
/* ---------- avatar: repertoar recenica ---------- */

provjera("oba lika imaju najmanje 20 recenica za tocno i netocno", async ucitaj => {
  const W = await ucitaj();
  for (const lik of ["patuljak", "jedi"]) {
    const r = W.LIKOVI[lik].rijeci;
    istina(r.happy.length >= 20, lik + ": happy ima " + r.happy.length);
    istina(r.angry.length >= 20, lik + ": angry ima " + r.angry.length);
    istina(r.party.length >= 8,  lik + ": party ima " + r.party.length);
    jednako(new Set(r.happy).size, r.happy.length, lik + ": happy bez ponavljanja");
    jednako(new Set(r.angry).size, r.angry.length, lik + ": angry bez ponavljanja");
  }
});
```

`LIKOVI` je sad lokalna u zatvorenom bloku (`index.html:1098`). Da bi provjera do njega došla,
dodaj uz definiciju:

```js
  const LIKOVI = { patuljak: PATULJAK, jedi: JEDI };
  window.LIKOVI = LIKOVI;            // za harness; nema drugog korisnika
```

- [ ] **Step 2: Pokreni harness — mora pasti**

Očekivano: **FAIL**, `patuljak: happy ima 10`.

- [ ] **Step 3: Dopuni Patuljkove rečenice**

U `PATULJAK.rijeci`, postojećih deset `happy` rečenica ostaje, dodaje se deset:

```js
      happy: [
        /* … postojećih deset ostaje nepromijenjeno … */
        "Eto ga na[, {ime}]!", "Kao iz topa!", "Šampionski potez!",
        // "To je to[, {ime}]!" NE dodavati -- postojeci Patuljak ju vec ima kao drugu
        // recenicu u happy polju. Provjeri duplikate prije dodavanja.
        "Genijalno[, {ime}]!", "Ide ti kao po loju!", "Pravi si mudrijaš!",
        "Nema ti mane[, {ime}]!", "Bravo, glavo!", "Točnije od sata!",
        "Ti si mi faca[, {ime}]!"
      ],
      angry: [
        /* … postojećih deset ostaje nepromijenjeno … */
        "Uh, promašaj[, {ime}]!", "Nije to, nije!", "Opa, pazi malo!",
        "Fulao si za dlaku[, {ime}]!", "Vrati se i prebroji!", "Joj, joj, joj!",
        "Nešto nam tu ne štima.", "Još jedan pokušaj[, {ime}]!",
        "Ovo nije tvoj dan!", "Ne predaj se[, {ime}]!"
      ],
      party: [
        /* … postojeće ostaje … */
        "Razina je tvoja[, {ime}]!", "Pobrali smo sve!",
        "Ovo je za pohvalu!", "Kapa dolje[, {ime}]!"
      ]
```

Postojeće rečenice se **ne prepisuju** — dodaje se na kraj svakog polja. Nova rečenica ne
smije biti ista kao neka postojeća; provjera iz Step 1 to hvata.

- [ ] **Step 4: Dopuni Jedijeve rečenice**

U `JEDI.rijeci`, dodaje se deset po polju, u istom duhu (obrnut red riječi, Sila), bez citata
iz filmova:

```js
      happy: [
        /* … postojećih deset ostaje nepromijenjeno … */
        "Bistar um imaš[, {ime}].", "Svijetlu stranu odabrao si.",
        "Mirno je oko ovog broja.", "Naučio si, vidim.",
        "Snaga tvoja raste[, {ime}].", "Put pravi našao si.",
        "Jasna je Sila danas.", "Pravi odgovor osjetio si[, {ime}].",
        "Strpljenje plod je dalo.", "Sjaji znanje u tebi."
      ],
      angry: [
        /* … postojećih deset ostaje nepromijenjeno … */
        "Zamućen je put ovaj.", "Ne još[, {ime}]. Ne još.",
        "Sila drugdje vodi te.", "Pogriješio si, ali učiti smiješ.",
        "Uzmi zraka[, {ime}], pa pokušaj opet.", "Sjena je nad odgovorom.",
        "Brzina prijatelj ti nije.", "Slušaj bolje, mladi padawane.",
        "Drugi put pokušaj.", "Neuspjeh učitelj je najbolji."
      ],
      party: [
        /* … postojeće ostaje … */
        "Snažan u Sili postao si[, {ime}]!", "Iskušenje svladao si[, {ime}]!",
        "Put Jedija tvoj je.", "Sjaji Sila u tebi[, {ime}]!"
      ]
```

- [ ] **Step 5: Pokreni harness — mora proći**

Očekivano: **PASS (65)**.

- [ ] **Step 6: Provjeri rukom da nadimak ne razbija rečenicu**

Otvori `http://localhost:8765/index.html`, upiši nadimak, riješi nekoliko zadataka točno i
netočno. Nova rečenica s `[, {ime}]` mora čitati ispravno i **s** nadimkom i **bez** njega
(preskoči prijavu za drugi slučaj). Ako neka nova rečenica bez nadimka zvuči krnjo, ukloni iz
nje `[, {ime}]`.

- [ ] **Step 7: Commit**

```bash
git add index.html provjere/provjere.js
git commit -m "Prosiri repertoar recenica Patuljka i Malog Jedija na 20 po ishodu"
```

---

### Task 8: Invarijante u harnessu i README

**Files:**
- Modify: `provjere/provjere.js` (tablica očekivanja, invarijante), `README.md`
- Test: `provjere/provjere.js` (sam harness je test)

**Interfaces:**
- Consumes: sve iz Taskova 1–7.
- Produces: `OCEKIVANJA` — `{ [razredPredmet: string]: { cjelina: number, polja: number } }`,
  jedna tablica na vrhu harnessa; sadržajni specovi B–E mijenjaju **samo** nju.

- [ ] **Step 1: Napiši invarijante**

Dodaj u `provjere/provjere.js`, odmah nakon pomoćnika:

```js
/* ---------- ocekivanja po skupu ----------
   Jedino mjesto s apsolutnim brojkama. Specovi koji dodaju sadrzaj mijenjaju
   ovu tablicu i nista drugo u harnessu.
------------------------------------------------------------------------- */
const OCEKIVANJA = {
  "2/matematika": { cjelina: 7, polja: 85 },
  "2/hrvatski":   { cjelina: 7, polja: 85 },
  "5/matematika": { cjelina: 1, polja: 4 },
  "5/hrvatski":   { cjelina: 1, polja: 3 },
  "6/matematika": { cjelina: 1, polja: 5 },
  "6/hrvatski":   { cjelina: 1, polja: 3 }
};
```

Brojke za 2. razred prepiši iz postojećih tvrdnji u harnessu; za skelete iz Taska 2 prebroj
polja u napisanim datotekama. Ako se ne poklapaju, **tablica se ispravlja, ne podaci.**

Zatim invarijante:

```js
provjera("svaki skup ima ocekivani broj cjelina i polja", async ucitaj => {
  const W = await ucitaj();
  const dobiveno = {};
  for (const r of Object.keys(W.RAZREDI)) {
    for (const p of Object.keys(W.PREDMETI)) {
      W.izgradiPredmet(r, p);
      dobiveno[r + "/" + p] = {
        cjelina: W.document.querySelectorAll("section[data-total]").length,
        polja:   W.document.querySelectorAll("#main input[data-answer]").length
      };
    }
  }
  jednako(dobiveno, OCEKIVANJA, "cjeline i polja po skupu");
});

provjera("svaki izbor zadatak ima tocan odgovor medju ponudenima", async ucitaj => {
  const W = await ucitaj();
  const greske = [];
  for (const r of Object.keys(W.RAZREDI))
    for (const p of Object.keys(W.PREDMETI))
      for (const sec of W.GRADIVO[r][p].zadaci)
        for (const task of sec.tasks)
          if (task.t === "izbor")
            for (const [prikaz, ponudeno, odgovor] of task.items)
              if (!ponudeno.includes(odgovor))
                greske.push(`${r}/${p} ${sec.id} "${prikaz}" -> ${odgovor}`);
  jednako(greske, [], "izbor zadaci s nedostupnim odgovorom");
});

provjera("svaki odgovor s oblikom je razlozljiv u taj oblik", async ucitaj => {
  const W = await ucitaj();
  const greske = [];
  for (const r of Object.keys(W.RAZREDI))
    for (const p of Object.keys(W.PREDMETI))
      for (const sec of W.GRADIVO[r][p].zadaci)
        for (const task of sec.tasks) {
          if (!task.oblik || !task.items) continue;
          for (const item of task.items) {
            const odgovor = task.t === "izbor" ? item[2] : item[1];
            if (!W.oblikValjan(task.oblik, odgovor))
              greske.push(`${r}/${p} ${sec.id} oblik ${task.oblik} -> "${odgovor}"`);
          }
        }
  jednako(greske, [], "odgovori koji ne odgovaraju deklariranom obliku");
});

provjera("svaki deklariran oblik je s popisa OBLICI", async ucitaj => {
  const W = await ucitaj();
  const greske = [];
  for (const r of Object.keys(W.RAZREDI))
    for (const p of Object.keys(W.PREDMETI))
      for (const sec of W.GRADIVO[r][p].zadaci)
        for (const task of sec.tasks)
          if (task.oblik && !W.OBLICI.includes(task.oblik))
            greske.push(`${r}/${p} ${sec.id} -> "${task.oblik}"`);
  jednako(greske, [], "zadaci s nepoznatim oblikom");
});

provjera("oznake cjelina su jedinstvene unutar svakog skupa", async ucitaj => {
  const W = await ucitaj();
  const greske = [];
  for (const r of Object.keys(W.RAZREDI))
    for (const p of Object.keys(W.PREDMETI)) {
      const id = W.GRADIVO[r][p].zadaci.map(s => s.id);
      if (new Set(id).size !== id.length) greske.push(r + "/" + p);
    }
  jednako(greske, [], "skupovi s ponovljenom oznakom cjeline");
});

provjera("odsutan skup zadataka onemogucuje pilulu, stranica radi", async ucitaj => {
  const W = await ucitaj();
  const cuvaj = W.GRADIVO["6"].matematika.zadaci;
  W.GRADIVO["6"].matematika.zadaci = [];
  W.iscrtajRazrede();
  const pilula = W.document.querySelector("#razredi .razred[data-razred='6']");
  istina(pilula.disabled, "pilula je onemogucena");
  istina(W.document.querySelectorAll("#main .task").length > 0, "stranica je i dalje iscrtana");
  W.GRADIVO["6"].matematika.zadaci = cuvaj;
});

provjera("pokvaren zadatak daje onemoguceno polje izvan brojanja razine", async ucitaj => {
  const W = await ucitaj();
  const cuvaj = W.GRADIVO["6"].matematika.zadaci;
  W.GRADIVO["6"].matematika.zadaci = [{
    id: "t1", nav: "Test", title: "Test", lead: "Test.",
    tasks: [{ t: "calc", oblik: "razlomak", q: "Test.", items: [["a", "tri četvrtine"]] }]
  }];
  W.izgradiPredmet("6", "matematika");
  const polje = W.document.querySelector("#main input.pokvaren");
  istina(!!polje, "polje je oznaceno pokvarenim");
  istina(polje.disabled, "polje je onemoguceno");
  jednako(polje.dataset.answer, undefined, "polje nema odgovor");
  // Postojeci kod je `if (total) { el.dataset.total = total; ... }`, pa kod nule
  // atribut potpuno izostavlja -- ne postavlja ga na "0". Cjelina bez ispravnih
  // polja tako nema ni traku napretka, sto je zeljeno.
  istina(!W.document.querySelector("#main section").hasAttribute("data-total"),
         "cjelina sa samo pokvarenim poljem nema data-total");
  W.GRADIVO["6"].matematika.zadaci = cuvaj;
  W.izgradiPredmet("2", "matematika");
});
```

- [ ] **Step 2: Pokreni harness i uskladi brojke u `OCEKIVANJA`**

Očekivano pri prvom pokretanju: **FAIL** na „cjeline i polja po skupu", s ispisom stvarnih
brojki. Prepiši ih u `OCEKIVANJA` i pokreni ponovno.

Svaka provjera dobiva svježe učitanu stranicu preko `ucitaj()`, pa iscrtavanje šest skupova
unutar jedne provjere ne prlja ostale.

- [ ] **Step 3: Ukloni tvrdnje koje `OCEKIVANJA` sad pokriva**

Iz harnessa izbaci stare provjere s apsolutnim brojkama koje su postale suvišne:
„matematika: 85 polja u 7 cjelina" i njezin par za hrvatski. Provjere koje testiraju
**ponašanje** (jedinstvenost ključeva, popis navigacijskih linkova, točka i zarez) **ostaju** —
one ne mjere količinu.

- [ ] **Step 4: Pokreni harness — mora proći**

Očekivano: **PASS**, s brojem provjera oko 70 (dvije stare brojačke tvrdnje izbačene,
sedam novih invarijanti dodano). Zapiši točan broj u završni commit.

- [ ] **Step 5: Ažuriraj README**

U `README.md`:

1. Prvi odlomak: stranica nosi gradivo **2., 5. i 6. razreda** za dva predmeta; razred se
   bira pilulama u zaglavlju.
2. Odjeljak „Predmeti" preimenuj u „Razredi i predmeti" i opiši `PREDMETI` / `RAZREDI` /
   `GRADIVO`, sa strukturom datoteka:

```
index.html               mehanika: razine, avatar, prijava, pamcenje, prekidaci
zadaci-<predmet>-<razred>.js   const ZADACI_<PREDMET>_<RAZRED> = [...]
```

3. Dodaj razreda u opis: „Dodavanje razreda: nova stavka u `RAZREDI`, nova grana u `GRADIVO` i
   po jedna datoteka sa zadacima za svaki predmet."
4. U „Tipovi zadataka" dodaj tablicu oblika odgovora (`broj`, `razlomak`, `popis`, `tekst`) iz
   sekcije 6 speca, i napomenu da gradivo 2. razreda nema `oblik`.
5. U tablicu „Provjera odgovora ovisi o predmetu" dodaj redak da `oblik` nadjačava pravilo
   predmeta kad je deklariran.
6. Napiši da su četiri datoteke za 5. i 6. razred **skeleti** i da sadržaj dolazi u zasebnim
   specovima; navedi izvore kurikuluma (NN 7/2019, NN 10/2019) s linkovima.
7. Zamijeni „Ponavljanje prije 3. razreda" u naslovu READMEa s „Ponavljanje gradiva —
   2., 5. i 6. razred".

- [ ] **Step 6: Commit**

```bash
git add provjere/provjere.js README.md
git commit -m "Invarijante po skupu u harnessu i README za razrede"
```

---

## Završna provjera

- [ ] Harness prolazi: `python -m http.server 8765`, pa `http://localhost:8765/provjere/pokreni.html`
      pokazuje `PASS (n)` bez crvenih redaka.
- [ ] Ručna proba u pregledniku: sva tri razreda × dva predmeta se otvaraju, naslov i cjeline se
      mijenjaju, upisani odgovor preživi prebacivanje razreda **i** osvježavanje stranice.
- [ ] Migracija: u konzoli upiši `v:2` zapis sa stvarnim napretkom, osvježi, provjeri da je
      napredak vidljiv i da je na disku pod `"2/matematika"`.
- [ ] Ručna proba na tabletu ili u uskom prozoru (≤ 420 px): pilule razreda pokazuju `2` / `5` /
      `6`, oba reda pilula su dohvatljiva prstom, traka znakova ne pokriva polje u fokusu.
- [ ] `git log --oneline` pokazuje osam commitova, jedan po tasku.
