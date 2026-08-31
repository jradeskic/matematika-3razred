# Odabir predmeta i Hrvatski jezik — plan implementacije

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dodati odabir predmeta u postojeću stranicu za ponavljanje matematike i drugi predmet — Hrvatski jezik, gradivo 2. razreda, 85 zadataka u 7 razina.

**Architecture:** Predmet postaje podatak u registru `PREDMETI`. Izgradnja stranice, danas jednokratna na vrhu skripte, postaje funkcija `izgradiPredmet(kljuc)` koja se može pozvati ponovno. Zadaci se izdvajaju u `zadaci-matematika.js` i `zadaci-hrvatski.js`, učitane običnim `<script src>`. Novi tip zadatka `izbor` (tap na jednu od ponuđenih tipki) uklapa se u postojeću mehaniku preko skrivenog `<input type="text">`, pa razine, ključevi za pamćenje, kvačice, avatar i konfeti nastavljaju raditi bez izmjena.

**Tech Stack:** Statični HTML + CSS + JavaScript bez buildanja i bez dependencyja. Objava na GitHub Pages. Provjere se vrte u pregledniku, nad `index.html` u iframeu.

**Spec:** [`docs/superpowers/specs/2026-08-31-odabir-predmeta-hrvatski-design.md`](../specs/2026-08-31-odabir-predmeta-hrvatski-design.md)

## Global Constraints

Svaki zadatak implicitno uključuje i ovo.

- **Bez buildanja i bez dependencyja** osim Google Fonts CDN-a. Samo `<script src>`. Mora raditi na GitHub Pagesu i preko `file://`.
- **Matematika se ne smije promijeniti**: točno 85 polja, 7 cjelina, naslov stranice `Matematika — ponavljanje prije 3. razreda`, a linkovi u navigaciji točno ovi tekstovi i redoslijed: `Brojevi do 100`, `Zbrajanje i oduzimanje`, `Množenje i dijeljenje`, `Zadaci riječima`, `Geometrija`, `Mjerenje`, `Podaci i logika`, s `href` `#c1`…`#c7`.
- **Semantika `norm()` za matematiku ostaje bit za bit**: razmaci se ignoriraju, `.` i `,` su isto, veliko i malo slovo su nevažni.
- **Nijedan matematički odgovor nije dulji od 14 znakova** (najdulji je `8,33,38,80,83`, 13 znakova). Novi razred za duga polja mora se aktivirati iznad 14 znakova, da matematički raspored ostane netaknut.
- **Provjera u hrvatskom je stroga**: veliko i malo slovo, dijakritika i završni `. ? !` su bitni. Sabija se samo višak razmaka.
- **Odgovori u hrvatskom moraju biti jednoznačni** — svako polje s upisom ima točno jedno točno rješenje.
- **Oznake cjelina**: matematika `c1`–`c7`, hrvatski `h1`–`h7`.
- **Hrvatski ima točno 85 polja za provjeru** i jedan `note` zadatak.
- **Ključ u localStorageu ostaje** `mat3-profil-v1`; zapis dobiva polje `v: 2`.
- **PIN za rješenja ostaje `1234`**, `PIN_HASH` se ne dira.
- **Avatari, njihove rečenice, animacije, 3 s zadržavanja i skrivanje na tipkanje ostaju nepromijenjeni** i dijele se između predmeta.
- **`prefers-reduced-motion: reduce` mora i dalje gasiti animacije i stvaranje čestica.**
- **Kod se piše hrvatski**, kao postojeći: nazivi i komentari na hrvatskom, komentari bez dijakritike.

---

### Task 1: Provjere u pregledniku i regresijska mreža za matematiku

Projekt nema test framework niti ga dobiva. Provjere se vrte nad pravim `index.html` u iframeu, iz iste origin, pa vide njegov DOM i dijele `localStorage`. Ovo je jedini zadatak koji piše provjere koje **odmah prolaze** — one bilježe današnje ponašanje matematike da bi kasniji zadaci mogli pasti ako ga pokvare.

**Files:**
- Create: `provjere/pokreni.html`
- Create: `provjere/provjere.js`

**Interfaces:**
- Consumes: ništa
- Produces: `provjera(ime, async ucitaj => {…})` za prijavu provjere; `ucitaj()` → `Promise<Window>` iframea nakon učitavanja; `jednako(dobiveno, ocekivano, opis)`, `istina(uvjet, opis)`, `cekaj(ms)`. Svaki kasniji zadatak dopisuje provjere na kraj `provjere/provjere.js`.

- [ ] **Step 1: Napiši pokretač provjera**

Create `provjere/pokreni.html`:

```html
<!DOCTYPE html>
<html lang="hr">
<head>
<meta charset="utf-8">
<title>Provjere</title>
<style>
  body{font:16px/1.5 system-ui,sans-serif;margin:20px;max-width:1000px}
  #zbroj{font-weight:700;font-size:20px}
  ul{padding-left:20px}
  li{margin:3px 0;font-family:ui-monospace,monospace;font-size:14px}
  li.ok{color:#2f9e5f}
  li.no{color:#e0544f;font-weight:700}
  #okvir{width:900px;height:600px;border:1px solid #ccc;margin-top:20px}
</style>
</head>
<body>
<h1>Provjere</h1>
<p id="zbroj">pokrećem…</p>
<ul id="ispis"></ul>
<iframe id="okvir" title="stranica koja se provjerava"></iframe>
<script src="provjere.js"></script>
</body>
</html>
```

- [ ] **Step 2: Napiši okvir za provjere i prve provjere**

Create `provjere/provjere.js`:

```js
/* Provjere se vrte nad ../index.html u iframeu. Bez dependencyja:
     python -m http.server 8765
   pa otvori http://localhost:8765/provjere/pokreni.html
   Naslov stranice postane "PASS (n)" ili "FAIL (n)", pa se rezultat vidi
   i bez citanja popisa. */

const PROVJERE = [];
const provjera = (ime, fn) => PROVJERE.push({ ime, fn });

const okvir = document.getElementById("okvir");
const ispis = document.getElementById("ispis");

// ucitaj stranicu iznova i vrati njezin window kad je skripta odradila
function ucitaj() {
  return new Promise(res => {
    okvir.onload = () => setTimeout(() => res(okvir.contentWindow), 90);
    // Date.now() umjesto brojaca: brojac pocinje od 0 na svaki reload pokreni.html
    // pa bi prvi ucitaj() uvijek gadjao isti "?p=0" URL koji preglednik moze
    // servirati iz HTTP kesa umjesto svjezeg indexa.
    okvir.src = "../index.html?p=" + Date.now();
  });
}

const cekaj = ms => new Promise(r => setTimeout(r, ms));

class Pad extends Error {}
function jednako(dobiveno, ocekivano, opis) {
  const a = JSON.stringify(dobiveno), b = JSON.stringify(ocekivano);
  if (a !== b) throw new Pad(`${opis}: dobiveno ${a}, ocekivano ${b}`);
}
function istina(uvjet, opis) {
  if (!uvjet) throw new Pad(opis);
}

// pomocnici nad stranicom u iframeu
const polja = W => [...W.document.querySelectorAll("#main input[type=text]")];
const vidljivaPolja = W => polja(W).filter(i => !i.hidden);
function upisi(W, inp, vrijednost) {
  inp.value = vrijednost;
  inp.dispatchEvent(new W.FocusEvent("focusout", { bubbles: true }));
}

/* ---------- matematika: danasnje ponasanje, mreza za kasnije ---------- */

provjera("matematika: 85 polja u 7 cjelina", async ucitaj => {
  const W = await ucitaj();
  jednako(polja(W).length, 85, "broj polja");
  jednako(W.document.querySelectorAll("section[data-total]").length, 7, "broj cjelina");
});

provjera("matematika: naslov stranice", async ucitaj => {
  const W = await ucitaj();
  jednako(W.document.title, "Matematika — ponavljanje prije 3. razreda", "naslov");
});

provjera("matematika: navigacija ima tocno 7 zadanih linkova", async ucitaj => {
  const W = await ucitaj();
  const dobiveno = [...W.document.querySelectorAll("nav a")]
    .map(a => [a.getAttribute("href"), a.textContent.trim()]);
  jednako(dobiveno, [
    ["#c1", "Brojevi do 100"],
    ["#c2", "Zbrajanje i oduzimanje"],
    ["#c3", "Množenje i dijeljenje"],
    ["#c4", "Zadaci riječima"],
    ["#c5", "Geometrija"],
    ["#c6", "Mjerenje"],
    ["#c7", "Podaci i logika"]
  ], "linkovi");
});

provjera("matematika: svih 85 kljuceva za pamcenje je jedinstveno", async ucitaj => {
  const W = await ucitaj();
  const kljucevi = polja(W).map(i => i.dataset.key);
  jednako(kljucevi.filter(k => !k).length, 0, "polja bez kljuca");
  jednako(new Set(kljucevi).size, 85, "jedinstvenih kljuceva");
});

provjera("matematika: tocka i zarez se broje kao isto", async ucitaj => {
  const W = await ucitaj();
  const inp = polja(W).find(i => i.dataset.answer.includes(","));
  istina(!!inp, "postoji odgovor sa zarezom");
  upisi(W, inp, inp.dataset.answer.replace(/,/g, "."));
  istina(inp.classList.contains("ok"), `"${inp.value}" bi trebalo biti tocno za "${inp.dataset.answer}"`);
});

provjera("matematika: veliko i malo slovo su nevazni", async ucitaj => {
  const W = await ucitaj();
  const inp = polja(W).find(i => /[A-ZČĆŠŽĐ]/.test(i.dataset.answer));
  istina(!!inp, "postoji odgovor s velikim slovom");
  upisi(W, inp, inp.dataset.answer.toLowerCase());
  istina(inp.classList.contains("ok"), `"${inp.value}" bi trebalo biti tocno za "${inp.dataset.answer}"`);
});

provjera("matematika: svi tocni odgovori daju 85/85 i 7/7 razina", async ucitaj => {
  const W = await ucitaj();
  polja(W).forEach(i => { i.value = i.dataset.answer; });
  W.document.getElementById("check").click();
  await cekaj(150);
  jednako(W.document.querySelectorAll("#main input.ok").length, 85, "tocnih polja");
  jednako(W.document.querySelectorAll("section.won").length, 7, "svladanih razina");
});

provjera("PIN 1234 otkriva rjesenja", async ucitaj => {
  const W = await ucitaj();
  W.prompt = () => "1234";
  W.document.getElementById("reveal").click();
  await cekaj(200);
  istina(W.document.querySelectorAll(".solution.show").length > 0, "rjesenja se prikazuju");
});

/* ---------- pokretanje ---------- */

(async () => {
  let proslo = 0, palo = 0;
  for (const { ime, fn } of PROVJERE) {
    const li = document.createElement("li");
    ispis.appendChild(li);
    li.textContent = "…     " + ime;
    try {
      localStorage.removeItem("mat3-profil-v1");   // ista origin: svaka provjera pocinje cisto
      await fn(ucitaj);
      li.className = "ok"; li.textContent = "PASS  " + ime; proslo++;
    } catch (e) {
      li.className = "no"; li.textContent = "FAIL  " + ime + " — " + e.message; palo++;
    }
  }
  document.getElementById("zbroj").textContent = `${proslo} PASS, ${palo} FAIL`;
  document.title = palo ? `FAIL (${palo})` : `PASS (${proslo})`;
})();
```

- [ ] **Step 3: Pokreni provjere**

```bash
python -m http.server 8765
```

Otvori `http://localhost:8765/provjere/pokreni.html`.
Expected: naslov kartice `PASS (8)`, u popisu 8 redova s `PASS`.

Ako neka padne, ne mijenjaj `index.html` — provjera je pogrešno napisana i njoj se traži greška. Ove provjere po definiciji opisuju stanje kakvo već jest.

- [ ] **Step 4: Commit**

```bash
git add provjere/pokreni.html provjere/provjere.js
git commit -m "Provjere u pregledniku i regresijska mreza za matematiku"
```

---

### Task 2: Izdvoji matematičke zadatke u `zadaci-matematika.js`

**Files:**
- Create: `zadaci-matematika.js`
- Modify: `index.html` — ukloni `const DATA = […]` (redovi 510–586), dodaj `<script src>` prije glavne skripte (oko reda 504)

**Interfaces:**
- Consumes: ništa
- Produces: globalni `ZADACI_MATEMATIKA` — niz od 7 objekata `{ id, nav, title, lead, tasks }`. `nav` je novo polje s tekstom linka u navigaciji; `id`, `title`, `lead`, `tasks` prenose se neizmijenjeni. Task 3 ga čita preko `PREDMETI`.

- [ ] **Step 1: Prenesi podatke u novu datoteku**

Create `zadaci-matematika.js`. Sadržaj je današnji `const DATA = [ … ];` iz `index.html` (redovi 510–586), preimenovan i s dodanim `nav` poljem u svakoj cjelini. Zaglavlje datoteke:

```js
/* Zadaci: Matematika, gradivo 2. razreda.

   Struktura cjeline:
     { id, nav, title, lead, tasks: [ … ] }
   id    oznaka za sidro i za kljuceve pamcenja (c1…c7)
   nav   tekst linka u navigaciji, krace od naslova
   title naslov cjeline
   lead  podnaslov
   Tipovi zadataka su opisani u READMEu.                                     */

const ZADACI_MATEMATIKA = [
{id:"c1", nav:"Brojevi do 100", title:"Brojevi do 100", lead:"Desetice i jedinice, usporedivanje, nizovi, parni i neparni brojevi.", tasks:[
  /* … sve nepromijenjeno iz danasnjeg DATA … */
]},
/* … c2 … c7 … */
];
```

`nav` vrijednosti po cjelinama, točno ove:

| id | nav | title |
|---|---|---|
| c1 | `Brojevi do 100` | Brojevi do 100 |
| c2 | `Zbrajanje i oduzimanje` | Zbrajanje i oduzimanje do 100 |
| c3 | `Množenje i dijeljenje` | Tablica množenja i dijeljenja do 100 |
| c4 | `Zadaci riječima` | Zadaci riječima |
| c5 | `Geometrija` | Geometrija |
| c6 | `Mjerenje` | Mjerenje |
| c7 | `Podaci i logika` | Podaci i logika |

Ne mijenjaj ni jedan `q`, `items`, `table` ni `solution`.

- [ ] **Step 2: Poveži datoteku i ukloni `DATA` iz `index.html`**

Prije `<script>` (red 504) dodaj:

```html
<script src="zadaci-matematika.js"></script>
<script>
```

U glavnoj skripti izbriši cijeli `const DATA = [ … ];` blok i na njegovo mjesto stavi privremeni most, da ostatak koda ostane nedirnut do Taska 3:

```js
/* Zadaci stoje u zadaci-matematika.js. Most do Taska 3, kad izgradnja
   pocne citati PREDMETI. */
const DATA = ZADACI_MATEMATIKA;
```

- [ ] **Step 3: Pokreni provjere**

Otvori `http://localhost:8765/provjere/pokreni.html`.
Expected: `PASS (8)`. Nijedna ne smije pasti — datoteka je samo preseljena.

- [ ] **Step 4: Commit**

```bash
git add zadaci-matematika.js index.html
git commit -m "Matematicki zadaci izdvojeni u zadaci-matematika.js"
```

---

### Task 3: Registar `PREDMETI` i izgradnja kao funkcija

Najveći refaktor. Danas se izgradnja vrti jednom, na vrhu skripte. Da bi se predmet mogao mijenjati, mora postati funkcija koja čisti i gradi nanovo — uključujući naslov, uvod, navigaciju i traku, koji su danas ručno napisani u HTML-u.

**Files:**
- Modify: `index.html` — `<title>` (red 6), zaglavlje (redovi 322–331), `<nav>` (redovi 333–341), ljestvica u JS-u (redovi 618–623), izgradnja (redovi 625–696)
- Modify: `provjere/provjere.js` — dopiši dvije provjere

**Interfaces:**
- Consumes: `ZADACI_MATEMATIKA` (Task 2)
- Produces:
  - `PREDMETI` — objekt `{ kljuc: { naziv, title, naslov, uvod, traka, provjera, zadaci } }`
  - `let predmet` — ključ aktivnog predmeta, početno `"matematika"`
  - `function izgradiPredmet(kljuc)` — postavlja `predmet`, prepisuje naslov stranice, zaglavlje, navigaciju, traku i `#main`; poziv dva puta ne udvostručuje sadržaj
  - `function izgradiTraku(vrsta)` — `vrsta` je `"brojevi"` ili `"abeceda"`
  - `const ABECEDA` — niz 30 slova hrvatske abecede

- [ ] **Step 1: Dopiši provjere koje sada padaju**

Na kraj `provjere/provjere.js`, prije bloka `/* ---------- pokretanje ---------- */`:

```js
/* ---------- izgradnja se moze pozvati ponovno ---------- */

provjera("izgradiPredmet je dostupan i ne udvostrucuje sadrzaj", async ucitaj => {
  const W = await ucitaj();
  istina(typeof W.izgradiPredmet === "function", "izgradiPredmet postoji");
  W.izgradiPredmet("matematika");
  jednako(polja(W).length, 85, "polja nakon druge izgradnje");
  jednako(W.document.querySelectorAll("section[data-total]").length, 7, "cjelina nakon druge izgradnje");
  jednako(W.document.querySelectorAll("nav a").length, 7, "linkova nakon druge izgradnje");
});

provjera("traka u zaglavlju ima 20 kucica za matematiku", async ucitaj => {
  const W = await ucitaj();
  jednako(W.document.querySelectorAll("#ladder span").length, 20, "kucica");
  jednako([...W.document.querySelectorAll(".ladder-scale span")].map(s => s.textContent),
          ["0", "50", "100"], "oznake ljestvice");
});
```

- [ ] **Step 2: Pokreni provjere i potvrdi da padaju**

Otvori `http://localhost:8765/provjere/pokreni.html`.
Expected: `FAIL (1)` — pada `izgradiPredmet je dostupan…` s `izgradiPredmet postoji`. Provjera trake prolazi, jer ljestvica već ima 20 kućica.

- [ ] **Step 3: Isprazni statični HTML koji postaje generiran**

U `index.html`: `<title>` ostavi kako je (JS ga prepisuje pri izgradnji, ali bez JS-a je bolje imati smisleni naslov). Zaglavlje i navigaciju svedi na prazne posude i uvodnom odlomku dodaj `id`:

```html
<header class="hero">
  <h1 id="naslov">Ponavljamo matematiku<br>prije 3. razreda</h1>
  <p id="uvod">Gradivo 2. razreda: brojevi do 100, zbrajanje i oduzimanje s prelaskom desetice, tablica množenja i dijeljenja, geometrija, mjerenje i podaci. Upiši odgovor i provjeri se sam.</p>
  <p class="pozdrav" id="pozdrav" hidden>
    <svg class="mini" id="mini" viewBox="0 0 100 122" aria-hidden="true"></svg>
    <span id="pozdravTekst"></span>
    <button type="button" class="link" id="promijeni">promijeni</button>
  </p>
  <div class="ladder" id="ladder" aria-hidden="true"></div>
  <div class="ladder-scale"><span>0</span><span>50</span><span>100</span></div>
</header>

<nav id="cjeline" aria-label="Cjeline"></nav>
```

- [ ] **Step 4: Dodaj registar predmeta**

U `index.html`, umjesto mosta `const DATA = ZADACI_MATEMATIKA;` iz Taska 2:

```js
/* ---------- predmeti ----------
   Predmet je podatak: naslovi, koja se traka crta u zaglavlju, koje pravilo
   usporedbe odgovora vrijedi i koji su zadaci. Dodavanje predmeta je nova
   stavka ovdje plus jedna datoteka sa zadacima.
------------------------------------------------------------------------- */
const PREDMETI = {
  matematika: {
    naziv:    "Matematika",
    title:    "Matematika — ponavljanje prije 3. razreda",
    naslov:   "Ponavljamo matematiku<br>prije 3. razreda",
    uvod:     "Gradivo 2. razreda: brojevi do 100, zbrajanje i oduzimanje s prelaskom desetice, tablica množenja i dijeljenja, geometrija, mjerenje i podaci. Upiši odgovor i provjeri se sam.",
    traka:    "brojevi",
    provjera: "broj",
    zadaci:   ZADACI_MATEMATIKA
  }
};

let predmet = "matematika";        // kljuc aktivnog predmeta
```

- [ ] **Step 5: Zamijeni ljestvicu funkcijom `izgradiTraku`**

Zamijeni redove 618–623 (`const ladder = …` i `for` petlju):

```js
/* ---------- traka u zaglavlju ----------
   Matematika ima brojevnu ljestvicu, hrvatski abecedu. Ista mehanika
   iskustva: updateProgress() pali kucice po broju tocnih odgovora i broji
   ih iz ladder.children.length, pa se prilagodava sam.
------------------------------------------------------------------------- */
const ladder = document.getElementById("ladder");
const ljestvicaOznake = document.querySelector(".ladder-scale");

const ABECEDA = ["A","B","C","Č","Ć","D","DŽ","Đ","E","F","G","H","I","J","K","L",
                 "LJ","M","N","NJ","O","P","R","S","Š","T","U","V","Z","Ž"];

function izgradiTraku(vrsta) {
  const abeceda = vrsta === "abeceda";
  ladder.innerHTML = "";
  ladder.classList.toggle("abeceda", abeceda);
  const n = abeceda ? ABECEDA.length : 20;
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    if (abeceda) { s.style.height = "100%"; s.textContent = ABECEDA[i]; }
    else s.style.height = (18 + (i + 1) * 2.6) + "%";
    ladder.appendChild(s);
  }
  ljestvicaOznake.innerHTML = (abeceda ? ["A", "", "Ž"] : ["0", "50", "100"])
    .map(o => `<span>${o}</span>`).join("");
}
```

- [ ] **Step 6: Dodaj CSS za abecednu traku**

U `index.html`, u blok stilova ispred `footer{`:

```css
  .ladder.abeceda span{
    display:flex;align-items:flex-end;justify-content:center;padding-bottom:2px;
    font:700 10px/1 "Nunito",sans-serif;color:#8a8778;border-radius:4px;
  }
  .ladder.abeceda span.lit{color:#fff}
```

- [ ] **Step 7: Zamotaj izgradnju u funkciju**

Zamijeni redove 625–696 (`/* ---------- izgradnja stranice ---------- */` do zatvaranja `DATA.forEach`):

```js
/* ---------- izgradnja stranice ----------
   Poziva se i pri prebacivanju predmeta, pa mora ocistiti za sobom.
------------------------------------------------------------------------- */
const main = document.getElementById("main");
const cjelineNav = document.getElementById("cjeline");
let inputCount = 0;

function izgradiPredmet(kljuc) {
  predmet = PREDMETI[kljuc] ? kljuc : "matematika";
  const p = PREDMETI[predmet];

  document.title = p.title;
  document.getElementById("naslov").innerHTML = p.naslov;
  document.getElementById("uvod").textContent = p.uvod;
  izgradiTraku(p.traka);

  main.innerHTML = "";
  cjelineNav.innerHTML = "";
  inputCount = 0;

  p.zadaci.forEach((sec, si) => {
    const brojacKljuca = {};      // koliko se puta isti prikaz ponavlja u ovoj cjelini
    const el = document.createElement("section");
    el.id = sec.id;
    el.innerHTML = `<h2><span class="num">${si + 1}</span>${sec.title}</h2>
                    <p class="lead">${sec.lead}</p>`;

    const link = document.createElement("a");
    link.href = "#" + sec.id;
    link.textContent = sec.nav || sec.title;
    cjelineNav.appendChild(link);

    sec.tasks.forEach((task, ti) => {
      const box = document.createElement("div");
      box.className = "task";
      const label = `${si + 1}.${ti + 1}`;
      let html = `<p class="q">${label} &nbsp;${task.q}</p>`;

      if (task.table) {
        html += "<table>";
        task.table.forEach((row, r) => {
          const cell = r === 0 ? "th" : "td";
          html += "<tr>" + row.map(c => `<${cell}>${c}</${cell}>`).join("") + "</tr>";
        });
        html += "</table>";
      }

      if (task.t === "calc") {
        html += '<div class="items">';
        task.items.forEach(([shown, answer]) => {
          const id = "i" + (inputCount++);
          // stabilan kljuc za pamcenje: ne mijenja se ako se zadaci presloze
          const osnova = sec.id + "|" + shown;
          brojacKljuca[osnova] = (brojacKljuca[osnova] || 0) + 1;
          const kljuc2 = (osnova + "|" + (brojacKljuca[osnova] - 1)).replace(/"/g, "");
          // brojčana tipkovnica samo kad je odgovor broj (dopušteni , . i razmak)
          const numeric = /^[0-9 ,.]+$/.test(answer);
          const mode = numeric ? "decimal" : "text";
          const wide = numeric ? "" : " wide";
          html += `<span class="item">
            <label for="${id}">${shown}</label>
            <input type="text" class="ans${wide}" id="${id}" data-answer="${answer}" data-key="${kljuc2}"
                   autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
                   enterkeyhint="next" inputmode="${mode}" aria-label="${shown.replace(/"/g, "")}">
            <span class="mark" data-for="${id}"></span></span>`;
        });
        html += "</div>";
        const sol = task.items.map(([s, a]) => `${s} = ${a}`).join(" · ");
        html += `<p class="solution">Rješenje: ${sol}</p>`;
      } else {
        html += `<div class="paper-task"><p>Riješi u vježbenici.</p></div>`;
        if (task.solution) html += `<p class="solution">Rješenje: ${task.solution}</p>`;
      }

      box.innerHTML = html;
      el.appendChild(box);
    });

    // razina dobiva traku napretka samo ako u njoj ima polja za upis
    const total = el.querySelectorAll("input[type=text]").length;
    if (total) {
      el.dataset.total = total;
      const bar = document.createElement("div");
      bar.className = "lvlbar";
      bar.innerHTML = `<div class="track" role="progressbar" aria-label="Napredak razine"
                            aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="0"><i></i></div>
                       <span class="lvlcount">0 / ${total}</span>
                       <span class="lvlbadge" aria-hidden="true">🏆</span>`;
      el.querySelector("p.lead").after(bar);
    }

    main.appendChild(el);
  });
}

izgradiPredmet(predmet);
```

Napomena: unutarnja varijabla je preimenovana iz `kljuc` u `kljuc2` jer `kljuc` je sada parametar funkcije.

- [ ] **Step 8: Pokreni provjere**

Otvori `http://localhost:8765/provjere/pokreni.html`.
Expected: `PASS (10)`. Navigacija, naslov, 85 polja i jedinstveni ključevi moraju ostati identični — to je regresijska mreža iz Taska 1.

- [ ] **Step 9: Commit**

```bash
git add index.html provjere/provjere.js
git commit -m "Registar PREDMETI i izgradnja stranice kao funkcija"
```

---

### Task 4: Tip zadatka `izbor` i registracija hrvatskoga

Novi tip zadatka i prva hrvatska cjelina koja ga koristi — `h2 · Č ili Ć`, 14 stavki. Prebacivanje predmeta još ne postoji, pa provjere pozivaju `izgradiPredmet("hrvatski")` izravno.

**Files:**
- Create: `zadaci-hrvatski.js`
- Modify: `index.html` — CSS ispred `footer{` i u zadnjem `@media (max-width:834px)` bloku; `PREDMETI`; `izgradiPredmet`; `setState`; `main` rukovatelji
- Modify: `provjere/provjere.js`

**Interfaces:**
- Consumes: `izgradiPredmet`, `predmet`, `PREDMETI` (Task 3)
- Produces:
  - globalni `ZADACI_HRVATSKI` — isti oblik kao `ZADACI_MATEMATIKA`
  - stavka `izbor`: `[prikaz, ponudeno[], odgovor]`; `prikaz` smije biti `""`
  - `function promijesaj(popis)` → novi izmiješani niz
  - `function oznaciTipku(inp)` — označi tipku koja odgovara vrijednosti skrivenog polja
  - `setState(inp, good, opt)` prima novo `opt.sidro` — element uz koji iskoči avatar

- [ ] **Step 1: Dopiši provjere koje sada padaju**

Na kraj `provjere/provjere.js`, prije bloka pokretanja:

```js
/* ---------- tip zadatka izbor i hrvatski ---------- */

provjera("hrvatski je registriran i gradi cjelinu h2", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("hrvatski");
  jednako(W.document.title, "Hrvatski jezik — ponavljanje prije 3. razreda", "naslov");
  jednako(W.document.querySelectorAll("#main section").length, 1, "cjelina");
  jednako(W.document.querySelector("#main section").id, "h2", "oznaka cjeline");
  jednako(polja(W).length, 14, "polja u h2");
  jednako(vidljivaPolja(W).length, 0, "polja izbora su skrivena");
});

provjera("izbor: tipke su tap, svaka stavka ima svoje tipke", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("hrvatski");
  const stavke = [...W.document.querySelectorAll(".izbor-item")];
  jednako(stavke.length, 14, "stavki izbora");
  stavke.forEach((s, i) => {
    const tipke = s.querySelectorAll(".chip");
    istina(tipke.length >= 2, `stavka ${i} ima najmanje dvije tipke`);
    const inp = s.querySelector("input[type=text]");
    const vrijednosti = [...tipke].map(t => t.dataset.vrijednost);
    istina(vrijednosti.includes(inp.dataset.answer),
           `stavka ${i}: tocan odgovor "${inp.dataset.answer}" mora biti medu tipkama ${JSON.stringify(vrijednosti)}`);
  });
});

provjera("izbor: klik na tocnu tipku daje kvacicu i puni razinu", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("hrvatski");
  const stavka = W.document.querySelector(".izbor-item");
  const inp = stavka.querySelector("input[type=text]");
  const tocnaTipka = [...stavka.querySelectorAll(".chip")]
    .find(t => t.dataset.vrijednost === inp.dataset.answer);
  tocnaTipka.click();
  await cekaj(120);
  istina(inp.classList.contains("ok"), "polje je oznaceno kao tocno");
  istina(tocnaTipka.classList.contains("odabrana"), "tipka je oznacena kao odabrana");
  jednako(W.document.querySelector(".lvlcount").textContent, "1 / 14", "brojac razine");
});

provjera("izbor: klik na krivu tipku daje kriz", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("hrvatski");
  const stavka = W.document.querySelector(".izbor-item");
  const inp = stavka.querySelector("input[type=text]");
  const krivaTipka = [...stavka.querySelectorAll(".chip")]
    .find(t => t.dataset.vrijednost !== inp.dataset.answer);
  krivaTipka.click();
  await cekaj(120);
  istina(inp.classList.contains("no"), "polje je oznaceno kao netocno");
});

provjera("izbor: tipke se premjesaju, nisu svaki put isto", async ucitaj => {
  // Podaci nisu dostupni kao W.ZADACI_HRVATSKI: top-level const u klasicnoj
  // skripti ne postaje svojstvo windowa. Zato ne usporedujemo s podacima nego
  // tri iscrtavanja medusobno: bez premjesavanja su uvijek identicna, a s njim
  // je poklapanje sva tri puta na svih 14 stavki 2^-28.
  const snimke = [];
  for (let k = 0; k < 3; k++) {
    const W = await ucitaj();
    W.izgradiPredmet("hrvatski");
    snimke.push(JSON.stringify([...W.document.querySelectorAll(".izbor-item")]
      .map(s => [...s.querySelectorAll(".chip")].map(t => t.dataset.vrijednost))));
  }
  istina(new Set(snimke).size > 1,
         "tri iscrtavanja dala su identican poredak tipki — premjesavanje ne radi");
});

provjera("izbor: promjena misljenja ostavlja tocno jednu odabranu tipku", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("hrvatski");
  const stavka = W.document.querySelector(".izbor-item");
  const inp = stavka.querySelector("input[type=text]");
  const tipke = [...stavka.querySelectorAll(".chip")];
  const kriva = tipke.find(t => t.dataset.vrijednost !== inp.dataset.answer);
  const tocna = tipke.find(t => t.dataset.vrijednost === inp.dataset.answer);
  kriva.click();
  await cekaj(80);
  istina(inp.classList.contains("no"), "prvi tap daje kriz");
  tocna.click();
  await cekaj(80);
  istina(inp.classList.contains("ok"), "nakon promjene misljenja je kvacica");
  istina(!inp.classList.contains("no"), "kriz je uklonjen");
  jednako(tipke.filter(t => t.classList.contains("odabrana")).map(t => t.dataset.vrijednost),
          [inp.dataset.answer], "ostala je tocno jedna odabrana tipka, i to prava");
});
```

- [ ] **Step 2: Pokreni provjere i potvrdi da padaju**

Expected: `FAIL (6)` — svih šest novih pada, jer `PREDMETI.hrvatski` ne postoji.

- [ ] **Step 3: Napiši `zadaci-hrvatski.js` s cjelinom h2**

Create `zadaci-hrvatski.js`:

```js
/* Zadaci: Hrvatski jezik, gradivo 2. razreda.

   Uz "calc" (upis) i "note" (vjezbenica) koristi se i tip "izbor":
     items: [ [prikaz, [ponudeno, …], odgovor], … ]
   prikaz  ono sto stoji uz tipke; smije biti "" kad su tipke same rijeci
   Tocan odgovor mora biti medu ponudenima. Tipke se premjesaju pri
   iscrtavanju, pa poredak u podacima nista ne odaje.                       */

const ZADACI_HRVATSKI = [

{id:"h2", nav:"Č ili Ć", title:"Č ili Ć",
 lead:"Izgovori riječ u sebi: ć je mekše, č je tvrđe. Na kraju i dž i đ.", tasks:[
  {t:"izbor", q:"Odaberi slovo koje pripada u riječ.", items:[
    ["ku_a (dom)",      ["ć","č"],  "ć"],
    ["_ovjek",          ["č","ć"],  "č"],
    ["no_",             ["ć","č"],  "ć"],
    ["klju_",           ["č","ć"],  "č"],
    ["cvije_e",         ["ć","č"],  "ć"],
    ["ru_nik",          ["č","ć"],  "č"],
    ["sre_a",           ["ć","č"],  "ć"],
    ["_okolada",        ["č","ć"],  "č"],
    ["ma_ka",           ["č","ć"],  "č"],
    ["vo_e",            ["ć","č"],  "ć"],
    ["_izma",           ["č","ć"],  "č"],
    ["pomo_",           ["ć","č"],  "ć"],
    ["ro_ak",           ["đ","dž"], "đ"],
    ["_ep (na hlačama)", ["dž","ž"], "dž"]]}
]}

];
```

- [ ] **Step 4: Registriraj predmet i poveži datoteku**

U `index.html`, uz `<script src="zadaci-matematika.js">`:

```html
<script src="zadaci-matematika.js"></script>
<script src="zadaci-hrvatski.js"></script>
```

U `PREDMETI` dodaj:

```js
  hrvatski: {
    naziv:    "Hrvatski jezik",
    title:    "Hrvatski jezik — ponavljanje prije 3. razreda",
    naslov:   "Ponavljamo hrvatski<br>prije 3. razreda",
    uvod:     "Gradivo 2. razreda: veliko početno slovo, č i ć, ije i je, glasovi i slova, rečenica, vrste riječi i značenje. Odgovori i provjeri se sam.",
    traka:    "abeceda",
    provjera: "rijec",
    zadaci:   ZADACI_HRVATSKI
  }
```

- [ ] **Step 5: Dodaj `promijesaj` i iscrtavanje tipa `izbor`**

Iznad `function izgradiPredmet(kljuc) {` dodaj:

```js
// Fisher-Yates. Tipke ne smiju stajati u poretku iz podataka, inace dijete
// nauci tapkati prvu.
function promijesaj(popis) {
  const k = popis.slice();
  for (let i = k.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [k[i], k[j]] = [k[j], k[i]];
  }
  return k;
}
```

U `izgradiPredmet`, između grane `if (task.t === "calc") { … }` i `} else {`, dodaj granu:

```js
      } else if (task.t === "izbor") {
        html += '<div class="items">';
        task.items.forEach(([prikaz, ponudeno, odgovor]) => {
          const id = "i" + (inputCount++);
          const osnova = sec.id + "|" + (prikaz || odgovor);
          brojacKljuca[osnova] = (brojacKljuca[osnova] || 0) + 1;
          const kljuc2 = (osnova + "|" + (brojacKljuca[osnova] - 1)).replace(/"/g, "");
          const tipke = promijesaj(ponudeno).map(v =>
            `<button type="button" class="chip" data-za="${id}" data-vrijednost="${v}">${v}</button>`
          ).join("");
          // skriveno polje nosi odabranu vrijednost, pa razine, kljucevi,
          // kvacice, pamcenje i avatar rade bez izmjena
          html += `<span class="item izbor-item">
            ${prikaz ? `<span class="izbor-prikaz">${prikaz}</span>` : ""}
            <span class="chips" role="group" aria-label="${(prikaz || task.q).replace(/"/g, "")}">${tipke}</span>
            <input type="text" class="ans" id="${id}" data-answer="${odgovor}" data-key="${kljuc2}" hidden>
            <span class="mark" data-for="${id}"></span></span>`;
        });
        html += "</div>";
        const sol = task.items.map(([p, _pon, a]) => `${p ? p + " → " : ""}${a}`).join(" · ");
        html += `<p class="solution">Rješenje: ${sol}</p>`;
```

- [ ] **Step 6: Dodaj CSS za tipke**

Ispred `footer{`:

```css
  /* ---------- zadatak s tapkanjem ---------- */
  .izbor-item{gap:10px;flex-wrap:wrap}
  .izbor-prikaz{font-weight:700;font-size:20px}
  .chips{display:flex;gap:8px}
  button.chip{
    min-height:54px;min-width:54px;padding:0 16px;
    font:700 20px/1 "Nunito",sans-serif;
    border:2px solid var(--line);border-radius:12px;background:#fff;
  }
  button.chip.odabrana{border-color:var(--sky);background:#e8f0fc}
```

U zadnjem `@media (max-width:834px)` bloku (onom uz `button.lik-izbor{width:auto}`, koji dolazi nakon `button{width:100%}`) dodaj:

```css
    button.chip{width:auto}
```

- [ ] **Step 7: Rukovatelj klika, oznaka tipke i sidro avatara**

U `setState` zamijeni dva poziva avatara tako da poštuju `opt.sidro`:

```js
      buddy.react("happy", opt.sidro || inp);
```
```js
      buddy.react("angry", opt.sidro || inp);
```

Uz ostale rukovatelje nad `main` (oko reda 1323) dodaj:

```js
// kod izbora oznaci tipku koja odgovara vrijednosti u skrivenom polju
function oznaciTipku(inp) {
  const skupina = inp.parentElement.querySelector(".chips");
  if (!skupina) return;
  skupina.querySelectorAll(".chip").forEach(t =>
    t.classList.toggle("odabrana", t.dataset.vrijednost === inp.value));
}

// tap na tipku: skriveno polje dobije vrijednost, pa ide ista provjera kao za upis
main.addEventListener("click", e => {
  const tipka = e.target.closest(".chip");
  if (!tipka) return;
  const inp = document.getElementById(tipka.dataset.za);
  inp.value = tipka.dataset.vrijednost;
  oznaciTipku(inp);
  setState(inp, norm(inp.value) === norm(inp.dataset.answer), { sidro: tipka });
  updateProgress();
  zapamtiOdgovore();
});
```

U skoku na Enter (red 1328) izuzmi skrivena polja:

```js
  const all = inputs().filter(i => !i.hidden);
```

- [ ] **Step 8: Pokreni provjere**

Expected: `PASS (16)`. Sve matematičke provjere iz Taska 1 moraju ostati zelene.

- [ ] **Step 9: Commit**

```bash
git add zadaci-hrvatski.js index.html provjere/provjere.js
git commit -m "Tip zadatka izbor i hrvatski predmet s cjelinom h2"
```

---

### Task 5: Provjera odgovora po predmetu

Matematika ostaje na današnjem `norm()`. Hrvatski dobiva strogu provjeru: veliko i malo slovo, dijakritika i završna interpunkcija su bitni.

**Files:**
- Modify: `index.html` — blok `/* ---------- provjera ---------- */` (oko reda 698) i tri mjesta usporedbe
- Modify: `provjere/provjere.js`

**Interfaces:**
- Consumes: `predmet`, `PREDMETI` (Task 3)
- Produces: `function tocno(upis, odgovor)` → `boolean`, koja bira pravilo po `PREDMETI[predmet].provjera`. Zamjenjuje sve izravne `norm(a) === norm(b)` usporedbe.

- [ ] **Step 1: Dopiši provjere koje sada padaju**

```js
/* ---------- provjera odgovora po predmetu ---------- */

provjera("hrvatski: veliko slovo je bitno", async ucitaj => {
  const W = await ucitaj();
  istina(typeof W.tocno === "function", "tocno() postoji");
  W.izgradiPredmet("hrvatski");
  istina(W.tocno("Ana", "Ana"), '"Ana" je tocno za "Ana"');
  istina(!W.tocno("ana", "Ana"), '"ana" NIJE tocno za "Ana"');
});

provjera("hrvatski: dijakritika je bitna", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("hrvatski");
  istina(W.tocno("kuća", "kuća"), '"kuća" je tocno');
  istina(!W.tocno("kuca", "kuća"), '"kuca" NIJE tocno za "kuća"');
  istina(!W.tocno("kuča", "kuća"), '"kuča" NIJE tocno za "kuća"');
});

provjera("hrvatski: zavrsna tocka je bitna, visak razmaka nije", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("hrvatski");
  istina(!W.tocno("Ivan ne čita", "Ivan ne čita."), "bez tocke NIJE tocno");
  istina(W.tocno("  Ivan   ne  čita.  ", "Ivan ne čita."), "visak razmaka se tolerira");
});

provjera("hrvatski: tocka i zarez nisu isto", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("hrvatski");
  istina(!W.tocno("ku,ća", "ku.ća"), "zarez nije zamjena za tocku");
});

provjera("matematika: tocno() se ponasa kao stari norm()", async ucitaj => {
  const W = await ucitaj();
  istina(W.tocno("3.70", "3,70"), "3.70 = 3,70");
  istina(W.tocno("iva", "Iva"), "veliko i malo slovo nevazni");
  istina(W.tocno(" 4 2 ", "42"), "razmaci nevazni");
  istina(!W.tocno("43", "42"), "razliciti brojevi nisu isto");
});
```

- [ ] **Step 2: Pokreni provjere i potvrdi da padaju**

Expected: `FAIL (5)`, prva s `tocno() postoji`.

- [ ] **Step 3: Dodaj pravila i sklopku**

U bloku `/* ---------- provjera ---------- */`, odmah nakon `const norm = …`:

```js
/* Hrvatski: sabij samo visak razmaka. Veliko i malo slovo, dijakritika i
   zavrsni recenicni znak su bitni, jer se upravo to uvjezbava.            */
const ocisti = v => v.toString().trim().replace(/\s+/g, " ");

// koje pravilo vrijedi odlucuje predmet, ne tip zadatka
function tocno(upis, odgovor) {
  return PREDMETI[predmet].provjera === "rijec"
    ? ocisti(upis) === ocisti(odgovor)
    : norm(upis) === norm(odgovor);
}
```

- [ ] **Step 4: Preusmjeri sva tri mjesta usporedbe na `tocno`**

U `check()`:
```js
    const good = tocno(inp.value, inp.dataset.answer);
```

U rukovatelju `focusout` nad `main`:
```js
  setState(inp, tocno(inp.value, inp.dataset.answer));
```

U rukovatelju `click` nad `main` (iz Taska 4):
```js
  setState(inp, tocno(inp.value, inp.dataset.answer), { sidro: tipka });
```

U `vratiNapredak()`:
```js
    setState(inp, tocno(v, inp.dataset.answer), { fx: false });
```

Nakon ovoga u datoteci ne smije ostati ni jedan `norm(` poziv izvan `norm` definicije i `tocno`. Provjeri:

```bash
grep -n "norm(" index.html
```
Expected: samo definicija `const norm = v =>` i dva poziva unutar `tocno`.

- [ ] **Step 5: Pokreni provjere**

Expected: `PASS (21)`.

- [ ] **Step 6: Commit**

```bash
git add index.html provjere/provjere.js
git commit -m "Provjera odgovora se razdvaja po predmetu"
```

---

### Task 6: Upis u hrvatskom — duga polja i red hrvatskih slova

Hrvatski ima odgovore u rečenicama („Moj pas se zove Rex."), za koje je današnje polje od 5–9 em prekratko. Uz to, č ć š ž đ se na engleskoj tipkovnici ne mogu upisati, pa ide red tipki koji ih ubacuje.

**Files:**
- Modify: `index.html` — CSS, `izgradiPredmet` (grana `calc`), novi element uz `#fx`, rukovatelji
- Modify: `provjere/provjere.js`

**Interfaces:**
- Consumes: `predmet`, `izgradiPredmet` (Task 3), `tocno` (Task 5)
- Produces: `const HRVATSKA_SLOVA = ["č","ć","š","ž","đ"]`; element `#slova` — traka koja se pojavi samo u hrvatskom, dok je polje za upis u fokusu. Polja s odgovorom duljim od 14 znakova dobivaju razred `duga`.

- [ ] **Step 1: Dopiši provjere koje sada padaju**

```js
/* ---------- upis u hrvatskom ---------- */

provjera("matematika ne dobiva duga polja", async ucitaj => {
  const W = await ucitaj();
  jednako(polja(W).filter(i => i.classList.contains("duga")).length, 0,
          "matematika nema odgovor dulji od 14 znakova, pa ni duga polja");
});

provjera("red hrvatskih slova postoji i skriven je u matematici", async ucitaj => {
  const W = await ucitaj();
  const slova = W.document.getElementById("slova");
  istina(!!slova, "#slova postoji");
  jednako([...slova.querySelectorAll(".slovo")].map(b => b.dataset.slovo),
          ["č", "ć", "š", "ž", "đ"], "slova u traci");
  istina(slova.hidden, "u matematici je traka skrivena");
});

provjera("tipka slova ubacuje znak na mjesto kursora", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("hrvatski");
  // Cjelina h2 ima samo izbor, pa za ovu provjeru otkrijemo jedno skriveno
  // polje i ponasamo se kao da je dijete uslo u njega. focus() u iframeu ne
  // postavlja activeElement, pa focusin saljemo sami.
  const inp = polja(W)[0];
  inp.hidden = false;
  inp.value = "kua";
  inp.setSelectionRange(2, 2);
  inp.dispatchEvent(new W.FocusEvent("focusin", { bubbles: true }));
  await cekaj(60);
  istina(!W.document.getElementById("slova").hidden,
         "traka slova se pojavila kad je dijete uslo u polje");
  W.document.querySelector('.slovo[data-slovo="ć"]').click();
  await cekaj(60);
  jednako(inp.value, "kuća", "znak je ubacen na mjesto kursora");
});
```

- [ ] **Step 2: Pokreni provjere i potvrdi da padaju**

Expected: `FAIL (2)` — prolazi samo „matematika ne dobiva duga polja", jer razreda još nema pa ih ni nema.

- [ ] **Step 3: Dodaj treći stupanj širine polja**

U `izgradiPredmet`, u grani `calc`, zamijeni izračun `wide`:

```js
          // brojčana tipkovnica samo kad je odgovor broj (dopušteni , . i razmak)
          const numeric = /^[0-9 ,.]+$/.test(answer);
          const mode = numeric ? "decimal" : "text";
          // rečenice u hrvatskom traže puno šire polje; matematika nema odgovor
          // dulji od 14 znakova, pa ovaj stupanj tamo nikad ne nastupi
          const wide = numeric ? "" : (answer.length > 14 ? " duga" : " wide");
```

- [ ] **Step 4: Dodaj CSS**

Ispred `footer{`:

```css
  input.duga{width:min(100%,24em);text-align:left;padding:0 12px}
  .item:has(input.duga){flex-direction:column;align-items:flex-start;gap:6px;width:100%}
  .item:has(input.duga) label{font-weight:600;font-size:18px}

  /* ---------- hrvatska slova iznad tipkovnice ---------- */
  .slova{
    position:fixed;left:0;right:0;bottom:0;z-index:40;
    display:flex;gap:8px;justify-content:center;
    padding:10px max(12px, calc(50% - 450px));
    background:rgba(255,253,247,.97);border-top:2px solid var(--ink);
  }
  .slova[hidden]{display:none}
  button.slovo{min-height:52px;min-width:52px;padding:0;font:700 22px/1 "Nunito",sans-serif}
```

U zadnjem `@media (max-width:834px)` bloku:

```css
    button.slovo{width:auto}
```

- [ ] **Step 5: Dodaj traku i rukovatelje**

U `index.html`, ispred `<div id="fx" aria-hidden="true"></div>`:

```html
<div class="slova" id="slova" hidden></div>
```

Uz ostale rukovatelje nad `main`:

```js
/* ---------- hrvatska slova ----------
   Red se pojavi samo u hrvatskom i samo dok je polje za upis u fokusu.
   mousedown/touchstart se zaustavljaju da polje ne izgubi fokus: inace bi
   focusout provjerio odgovor usred tipkanja i oznacio ga netocnim.
------------------------------------------------------------------------- */
const HRVATSKA_SLOVA = ["č", "ć", "š", "ž", "đ"];
const slovaTraka = document.getElementById("slova");
slovaTraka.innerHTML = HRVATSKA_SLOVA.map(z =>
  `<button type="button" class="slovo" data-slovo="${z}" aria-label="slovo ${z}">${z}</button>`).join("");

let poljeUFokusu = null;

main.addEventListener("focusin", e => {
  if (e.target.tagName !== "INPUT" || e.target.hidden) return;
  poljeUFokusu = e.target;
  slovaTraka.hidden = PREDMETI[predmet].provjera !== "rijec";
});

main.addEventListener("focusout", () => setTimeout(() => {
  if (!main.contains(document.activeElement)) slovaTraka.hidden = true;
}, 120));

["mousedown", "touchstart"].forEach(dogadaj =>
  slovaTraka.addEventListener(dogadaj, e => e.preventDefault()));

slovaTraka.addEventListener("click", e => {
  const t = e.target.closest(".slovo");
  if (!t || !poljeUFokusu) return;
  const inp = poljeUFokusu;
  const poc = inp.selectionStart ?? inp.value.length;
  const kraj = inp.selectionEnd ?? poc;
  inp.value = inp.value.slice(0, poc) + t.dataset.slovo + inp.value.slice(kraj);
  inp.focus();
  inp.setSelectionRange(poc + 1, poc + 1);
  inp.dispatchEvent(new Event("input", { bubbles: true }));
});
```

- [ ] **Step 6: Pokreni provjere**

Expected: `PASS (24)`.

- [ ] **Step 7: Commit**

```bash
git add index.html provjere/provjere.js
git commit -m "Duga polja za recenice i red hrvatskih slova pri upisu"
```

---

### Task 7: Napredak po predmetu i prekidač u zaglavlju

**Files:**
- Modify: `index.html` — profil (redovi 593–615), `zapamtiOdgovore`, `vratiNapredak`, rukovatelj `clear`, zaglavlje, CSS
- Modify: `provjere/provjere.js`

**Interfaces:**
- Consumes: `PREDMETI`, `predmet`, `izgradiPredmet` (Task 3)
- Produces:
  - zapis u `localStorage` pod `mat3-profil-v1` oblika `{ v: 2, ime, avatar, predmet, napredak: { matematika: {…}, hrvatski: {…} } }`
  - `function prebaciPredmet(kljuc)` — zapamti trenutno, izgradi novo, tiho vrati napredak
  - `function oznaciPredmet()` — osvježi pilule u zaglavlju
  - `profil.napredak` zamjenjuje `profil.odgovori`

- [ ] **Step 1: Dopiši provjere koje sada padaju**

```js
/* ---------- napredak po predmetu ---------- */

provjera("stari zapis se prevodi u v:2 i cuva matematicki napredak", async ucitaj => {
  localStorage.setItem("mat3-profil-v1", JSON.stringify({
    ime: "Luka", avatar: "jedi", odgovori: { "c1|63|0": "6D3J" }
  }));
  const W = await ucitaj();
  await cekaj(300);
  const zapis = JSON.parse(localStorage.getItem("mat3-profil-v1"));
  jednako(zapis.v, 2, "verzija zapisa");
  jednako(zapis.ime, "Luka", "ime je ocuvano");
  jednako(zapis.avatar, "jedi", "avatar je ocuvan");
  jednako(zapis.napredak.matematika["c1|63|0"], "6D3J", "matematicki odgovor je ocuvan");
  jednako(W.document.querySelectorAll("#main input.ok").length, 1, "odgovor je vracen na ekran");
});

provjera("prekidac predmeta ima pilulu za svaki predmet", async ucitaj => {
  const W = await ucitaj();
  const pilule = [...W.document.querySelectorAll("#predmeti .predmet")];
  jednako(pilule.map(p => p.dataset.predmet), ["matematika", "hrvatski"], "pilule");
  jednako(pilule.filter(p => p.classList.contains("aktivan")).length, 1, "jedna je aktivna");
});

provjera("prebacivanje predmeta cuva napredak oba predmeta", async ucitaj => {
  const W = await ucitaj();
  // matematika: jedan tocan odgovor
  const m = polja(W)[0];
  upisi(W, m, m.dataset.answer);
  await cekaj(300);
  // na hrvatski, pa jedan tap
  W.document.querySelector('.predmet[data-predmet="hrvatski"]').click();
  await cekaj(200);
  const stavka = W.document.querySelector(".izbor-item");
  const inp = stavka.querySelector("input[type=text]");
  [...stavka.querySelectorAll(".chip")].find(t => t.dataset.vrijednost === inp.dataset.answer).click();
  await cekaj(300);
  const zapis = JSON.parse(localStorage.getItem("mat3-profil-v1"));
  jednako(Object.keys(zapis.napredak.matematika).length, 1, "matematicki napredak je ostao");
  jednako(Object.keys(zapis.napredak.hrvatski).length, 1, "hrvatski napredak je zapisan");
  jednako(zapis.predmet, "hrvatski", "zadnje biran predmet");
  // natrag na matematiku: odgovor je tu
  W.document.querySelector('.predmet[data-predmet="matematika"]').click();
  await cekaj(200);
  jednako(W.document.querySelectorAll("#main input.ok").length, 1, "matematicki odgovor je vracen");
});

provjera("prebacivanje predmeta ne ispaljuje konfete", async ucitaj => {
  const W = await ucitaj();
  // svladaj cijelu prvu razinu matematike
  const prva = W.document.querySelector("section[data-total]");
  [...prva.querySelectorAll("input")].forEach(i => { i.value = i.dataset.answer; });
  W.document.getElementById("check").click();
  await cekaj(2600);                              // pusti da konfeti i poruke nestanu
  W.document.querySelector('.predmet[data-predmet="hrvatski"]').click();
  await cekaj(200);
  W.document.querySelector('.predmet[data-predmet="matematika"]').click();
  await cekaj(250);
  jednako(W.document.querySelectorAll("section.won").length, 1, "razina je i dalje svladana");
  jednako(W.document.querySelectorAll("#fx b").length, 0, "nema novih cestica");
  jednako([...W.document.querySelectorAll(".toast")].length, 0, "nema novih poruka");
});

provjera("Pocni ispocetka brise samo trenutni predmet", async ucitaj => {
  const W = await ucitaj();
  const m = polja(W)[0];
  upisi(W, m, m.dataset.answer);
  await cekaj(300);
  W.document.querySelector('.predmet[data-predmet="hrvatski"]').click();
  await cekaj(200);
  const stavka = W.document.querySelector(".izbor-item");
  const inp = stavka.querySelector("input[type=text]");
  [...stavka.querySelectorAll(".chip")].find(t => t.dataset.vrijednost === inp.dataset.answer).click();
  await cekaj(300);
  W.document.getElementById("clear").click();
  await cekaj(300);
  const zapis = JSON.parse(localStorage.getItem("mat3-profil-v1"));
  jednako(Object.keys(zapis.napredak.hrvatski).length, 0, "hrvatski je obrisan");
  jednako(Object.keys(zapis.napredak.matematika).length, 1, "matematika je ostala");
});
```

- [ ] **Step 2: Pokreni provjere i potvrdi da padaju**

Expected: `FAIL (5)`.

- [ ] **Step 3: Prebaci profil na `v: 2`**

Zamijeni redove 593–615:

```js
/* ---------- profil: nadimak, avatar i zapamćen napredak ----------
   Sve stoji u localStorageu ovog preglednika, na ovom uređaju. Nema servera,
   pa nadimak nije prijava nego samo ime kojega se stranica sjeti.
   Napredak se pamti odvojeno po predmetu.
------------------------------------------------------------------- */
const KLJUC_PROFILA = "mat3-profil-v1";
const profil = { v: 2, ime: "", avatar: "patuljak", predmet: "matematika", napredak: {} };

function ucitajProfil() {
  try {
    const zapis = JSON.parse(localStorage.getItem(KLJUC_PROFILA) || "null");
    if (!zapis || typeof zapis !== "object") return false;
    profil.ime = typeof zapis.ime === "string" ? zapis.ime.slice(0, 20) : "";
    profil.avatar = zapis.avatar === "jedi" ? "jedi" : "patuljak";
    if (zapis.v === 2) {
      profil.predmet = PREDMETI[zapis.predmet] ? zapis.predmet : "matematika";
      profil.napredak = (zapis.napredak && typeof zapis.napredak === "object") ? zapis.napredak : {};
    } else {
      // zapis prije uvodenja predmeta: odgovori su bili samo matematicki
      profil.predmet = "matematika";
      profil.napredak = {
        matematika: (zapis.odgovori && typeof zapis.odgovori === "object") ? zapis.odgovori : {}
      };
    }
    return true;
  } catch (_) { return false; }        // privatni prozor ili ugašena pohrana
}

let spremiTimer = null;
function spremiProfil() {
  clearTimeout(spremiTimer);
  spremiTimer = setTimeout(() => {
    try { localStorage.setItem(KLJUC_PROFILA, JSON.stringify(profil)); } catch (_) {}
  }, 200);
}

const imaProfil = ucitajProfil();
```

Napomena o redoslijedu: `ucitajProfil` čita `PREDMETI`, pa blok profila mora stajati **nakon** registra `PREDMETI`. Ako je danas prije njega, premjesti blok `PREDMETI` iznad profila.

- [ ] **Step 4: Pamćenje i vraćanje idu po predmetu**

```js
function zapamtiOdgovore() {
  const zapis = {};
  inputs().forEach(i => { if (i.value.trim() !== "") zapis[i.dataset.key] = i.value; });
  profil.napredak[predmet] = zapis;
  profil.predmet = predmet;
  spremiProfil();
}

function vratiNapredak() {
  const zapis = profil.napredak[predmet];
  if (!zapis || !Object.keys(zapis).length) return 0;
  let vraceno = 0;
  inputs().forEach(inp => {
    const v = zapis[inp.dataset.key];
    if (typeof v !== "string" || v.trim() === "") return;
    inp.value = v;
    oznaciTipku(inp);                  // kod izbora vrati i odabranu tipku
    setState(inp, tocno(v, inp.dataset.answer), { fx: false });
    vraceno++;
  });
  streak = 0;                          // niz se ne prenosi kroz posjete
  updateProgress({ silent: true });    // bez konfeta za razine svladane prošli put
  return vraceno;
}
```

U rukovatelju `clear` zamijeni brisanje i dodaj odznačavanje tipki:

```js
document.getElementById("clear").addEventListener("click", () => {
  streak = 0;
  finaleShown = false;
  inputs().forEach(i => { i.value = ""; oznaciTipku(i); setState(i, null, { fx: false }); });
  levels().forEach(s => s.classList.remove("won"));
  document.querySelectorAll("nav a.done").forEach(a => a.classList.remove("done"));
  buddy.reset();
  profil.napredak[predmet] = {};        // inace bi osvjezavanje vratilo stare odgovore
  spremiProfil();
  updateProgress();
});
```

- [ ] **Step 5: Dodaj prekidač u zaglavlje**

U `index.html`, ispod odlomka `#pozdrav`:

```html
  <div class="predmeti" id="predmeti" role="group" aria-label="Predmet"></div>
```

CSS ispred `footer{`:

```css
  /* ---------- prekidac predmeta ---------- */
  .predmeti{display:flex;gap:10px;margin:14px 0 0;flex-wrap:wrap}
  button.predmet{
    min-height:46px;padding:0 18px;border-radius:999px;
    font:700 16px/1 "Nunito",sans-serif;
    background:#f1eee2;border:2px solid transparent;color:var(--ink);
  }
  button.predmet.aktivan{background:var(--sky);border-color:var(--sky);color:#fff}
```

U zadnjem `@media (max-width:834px)` bloku:

```css
    button.predmet{width:auto}
```

- [ ] **Step 6: Poveži prekidač**

Uz `profil_ui` dio, prije bloka `/* ---------- pokretanje ---------- */`:

```js
/* ---------- prekidac predmeta ---------- */
const predmetiTraka = document.getElementById("predmeti");
predmetiTraka.innerHTML = Object.entries(PREDMETI).map(([k, p]) =>
  `<button type="button" class="predmet" data-predmet="${k}" aria-pressed="false">${p.naziv}</button>`
).join("");

function oznaciPredmet() {
  predmetiTraka.querySelectorAll(".predmet").forEach(b => {
    const je = b.dataset.predmet === predmet;
    b.classList.toggle("aktivan", je);
    b.setAttribute("aria-pressed", je ? "true" : "false");
  });
}

function prebaciPredmet(kljuc) {
  if (kljuc === predmet || !PREDMETI[kljuc]) return;
  zapamtiOdgovore();                 // zapamti ono sto ostaje za sobom
  streak = 0;
  finaleShown = false;
  buddy.reset();
  izgradiPredmet(kljuc);
  profil.predmet = predmet;
  spremiProfil();
  oznaciPredmet();
  vratiNapredak();                   // tiho, bez konfeta za prosle razine
  updateProgress();
}

predmetiTraka.addEventListener("click", e => {
  const b = e.target.closest(".predmet");
  if (b) prebaciPredmet(b.dataset.predmet);
});
```

- [ ] **Step 7: Pokreni na zapamćenom predmetu**

U bloku `/* ---------- pokretanje ---------- */`, prije `nacrtajPreglede();`:

```js
izgradiPredmet(profil.predmet);      // otvori se na zadnje biranom predmetu
oznaciPredmet();
```

- [ ] **Step 8: Pokreni provjere**

Expected: `PASS (29)`.

- [ ] **Step 9: Commit**

```bash
git add index.html provjere/provjere.js
git commit -m "Napredak po predmetu i prekidac predmeta u zaglavlju"
```

---

### Task 8: Odabir predmeta u prijavi

**Files:**
- Modify: `index.html` — dijalog prijave (oko reda 479), `profil_ui` blok
- Modify: `provjere/provjere.js`

**Interfaces:**
- Consumes: `PREDMETI`, `prebaciPredmet`, `oznaciPredmet` (Task 7)
- Produces: kartice `.predmet-izbor[data-predmet]` u dijalogu; `zatvoriPrijavu()` uz nadimak i avatara pamti i predmet

- [ ] **Step 1: Dopiši provjere koje sada padaju**

```js
/* ---------- odabir predmeta u prijavi ---------- */

provjera("prijava nudi odabir predmeta", async ucitaj => {
  const W = await ucitaj();
  await cekaj(150);
  istina(!W.document.getElementById("prijava").hidden, "prijava je otvorena");
  jednako([...W.document.querySelectorAll(".predmet-izbor")].map(b => b.dataset.predmet),
          ["matematika", "hrvatski"], "kartice predmeta");
});

provjera("odabir hrvatskoga u prijavi otvara hrvatski", async ucitaj => {
  const W = await ucitaj();
  await cekaj(150);
  W.document.getElementById("nick").value = "Ana";
  W.document.querySelector('.predmet-izbor[data-predmet="hrvatski"]').click();
  W.document.getElementById("kreni").click();
  await cekaj(350);
  jednako(W.document.querySelector("#main section").id, "h2", "otvorena cjelina");
  const zapis = JSON.parse(localStorage.getItem("mat3-profil-v1"));
  jednako(zapis.predmet, "hrvatski", "predmet je zapamcen");
  jednako(zapis.ime, "Ana", "ime je zapamceno");
});
```

- [ ] **Step 2: Pokreni provjere i potvrdi da padaju**

Expected: `FAIL (2)`.

- [ ] **Step 3: Dodaj kartice u dijalog**

U `index.html`, u `.prijava-box`, između polja za nadimak i odabira avatara:

```html
    <p style="margin-top:16px">Što danas vježbamo?</p>
    <div class="izbor" id="izborPredmeta">
      <button type="button" class="predmet-izbor" data-predmet="matematika" aria-pressed="false">
        <span class="lik-ime">Matematika</span>
      </button>
      <button type="button" class="predmet-izbor" data-predmet="hrvatski" aria-pressed="false">
        <span class="lik-ime">Hrvatski jezik</span>
      </button>
    </div>
```

CSS ispred `footer{`:

```css
  button.predmet-izbor{
    flex:1;min-height:64px;padding:12px 10px;
    border:2px solid var(--line);border-radius:16px;background:#fff;
  }
  button.predmet-izbor.izabran{border-color:var(--grass);background:#eefaf1;box-shadow:0 0 0 3px #c9ecd6}
```

U zadnjem `@media (max-width:834px)` bloku:

```css
    button.predmet-izbor{width:auto}
```

- [ ] **Step 4: Poveži kartice**

U `profil_ui` bloku, uz `izabrani` za avatara, dodaj odabir predmeta:

```js
let izabraniPredmet = profil.predmet;

const karticePredmeta = () => Array.from(document.querySelectorAll(".predmet-izbor"));

function oznaciIzborPredmeta() {
  karticePredmeta().forEach(b => {
    const je = b.dataset.predmet === izabraniPredmet;
    b.classList.toggle("izabran", je);
    b.setAttribute("aria-pressed", je ? "true" : "false");
  });
}

karticePredmeta().forEach(b => b.addEventListener("click", () => {
  izabraniPredmet = b.dataset.predmet;
  oznaciIzborPredmeta();
}));
```

U `otvoriPrijavu()` dodaj, uz `oznaciIzbor()`:

```js
  izabraniPredmet = predmet;
  oznaciIzborPredmeta();
```

U `zatvoriPrijavu()`, nakon postavljanja imena i avatara:

```js
  const drugiPredmet = izabraniPredmet !== predmet;
  profil.avatar = izabrani;
  spremiProfil();
  buddy.postaviLik(profil.avatar);
  osvjeziPozdrav();
  prijava.hidden = true;
  if (drugiPredmet) prebaciPredmet(izabraniPredmet);
```

- [ ] **Step 5: Pokreni provjere**

Expected: `PASS (31)`.

- [ ] **Step 6: Commit**

```bash
git add index.html provjere/provjere.js
git commit -m "Odabir predmeta u prijavi"
```

---

### Task 9: Ostale cjeline hrvatskoga — h1, h3, h4, h5, h6, h7

Dopuni `zadaci-hrvatski.js` na svih 7 cjelina i 85 polja. Redoslijed cjelina u datoteci je h1, h2, h3, h4, h5, h6, h7.

**Files:**
- Modify: `zadaci-hrvatski.js`
- Modify: `provjere/provjere.js`

**Interfaces:**
- Consumes: tipovi `izbor` (Task 4) i `calc`; `tocno` (Task 5); duga polja (Task 6)
- Produces: `ZADACI_HRVATSKI` s 7 cjelina, 85 polja za provjeru i jednim `note` zadatkom

- [ ] **Step 1: Dopiši provjere koje sada padaju**

```js
/* ---------- puni sadrzaj hrvatskoga ---------- */

provjera("hrvatski: 85 polja u 7 cjelina", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("hrvatski");
  jednako(polja(W).length, 85, "broj polja");
  jednako(W.document.querySelectorAll("section[data-total]").length, 7, "broj cjelina");
  jednako([...W.document.querySelectorAll("#main section")].map(s => s.id),
          ["h1", "h2", "h3", "h4", "h5", "h6", "h7"], "oznake cjelina");
  jednako(W.document.querySelectorAll("nav a").length, 7, "linkova u navigaciji");
});

provjera("hrvatski: svi kljucevi su jedinstveni", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("hrvatski");
  const kljucevi = polja(W).map(i => i.dataset.key);
  jednako(kljucevi.filter(k => !k).length, 0, "polja bez kljuca");
  jednako(new Set(kljucevi).size, 85, "jedinstvenih kljuceva");
});

provjera("hrvatski: tocan odgovor je uvijek medu ponudenim tipkama", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("hrvatski");
  const lose = [];
  [...W.document.querySelectorAll(".izbor-item")].forEach(s => {
    const inp = s.querySelector("input[type=text]");
    const vrijednosti = [...s.querySelectorAll(".chip")].map(t => t.dataset.vrijednost);
    if (!vrijednosti.includes(inp.dataset.answer))
      lose.push([inp.dataset.key, inp.dataset.answer, vrijednosti]);
  });
  jednako(lose, [], "stavke kojima tocan odgovor nije medu tipkama");
});

provjera("hrvatski: svi tocni odgovori daju 85/85 i 7/7 razina", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("hrvatski");
  polja(W).forEach(i => { i.value = i.dataset.answer; });
  W.document.getElementById("check").click();
  await cekaj(200);
  const netocna = polja(W).filter(i => i.classList.contains("no"))
    .map(i => [i.dataset.key, i.dataset.answer]);
  jednako(netocna, [], "odgovori iz podataka koje provjera odbija");
  jednako(W.document.querySelectorAll("#main input.ok").length, 85, "tocnih polja");
  jednako(W.document.querySelectorAll("section.won").length, 7, "svladanih razina");
});

provjera("hrvatski: jedan zadatak za vjezbenicu", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("hrvatski");
  jednako(W.document.querySelectorAll("#main .paper-task").length, 1, "zadataka za vjezbenicu");
});
```

- [ ] **Step 2: Pokreni provjere i potvrdi da padaju**

Expected: `FAIL (5)` — sve pet novih pada. Cjelina h2 nema `note` zadatak, pa pada i provjera o vježbenici.

- [ ] **Step 3: Dopuni `zadaci-hrvatski.js`**

Zamijeni sadržaj niza `ZADACI_HRVATSKI` ovime (h2 ostaje kako je iz Taska 4, samo dobiva svoje mjesto u redoslijedu):

```js
const ZADACI_HRVATSKI = [

{id:"h1", nav:"Veliko slovo", title:"Veliko početno slovo",
 lead:"Imena i prezimena, mjesta, ulice i trgovi, kućni ljubimci, početak rečenice.", tasks:[
  {t:"izbor", q:"Odaberi kako se piše.", items:[
    ["____ ide u školu.",           ["Ana","ana"],             "Ana"],
    ["Moj brat ____ voli nogomet.", ["Ivan","ivan"],           "Ivan"],
    ["Stanujem u ____ ulici.",      ["Cvjetnoj","cvjetnoj"],   "Cvjetnoj"],
    ["Ljeti idemo u ____.",         ["Split","split"],         "Split"],
    ["Naša mačka zove se ____.",    ["Mica","mica"],           "Mica"],
    ["Živim u ____.",               ["Hrvatskoj","hrvatskoj"], "Hrvatskoj"],
    ["Vlak ide u ____.",            ["Rijeku","rijeku"],       "Rijeku"]]},
  {t:"izbor", q:"Koji je zapis točan?", items:[
    ["", ["Trg bana Jelačića","trg bana jelačića"],           "Trg bana Jelačića"],
    ["", ["Ulica kralja Tomislava","ulica Kralja Tomislava"], "Ulica kralja Tomislava"]]},
  {t:"calc", q:"Prepiši ispravno, s velikim početnim slovima.", items:[
    ["moj pas se zove rex.",        "Moj pas se zove Rex."],
    ["danas idemo u zagreb.",       "Danas idemo u Zagreb."],
    ["ana i marko žive u osijeku.", "Ana i Marko žive u Osijeku."]]}
]},

{id:"h2", nav:"Č ili Ć", title:"Č ili Ć",
 lead:"Izgovori riječ u sebi: ć je mekše, č je tvrđe. Na kraju i dž i đ.", tasks:[
  {t:"izbor", q:"Odaberi slovo koje pripada u riječ.", items:[
    ["ku_a (dom)",       ["ć","č"],  "ć"],
    ["_ovjek",           ["č","ć"],  "č"],
    ["no_",              ["ć","č"],  "ć"],
    ["klju_",            ["č","ć"],  "č"],
    ["cvije_e",          ["ć","č"],  "ć"],
    ["ru_nik",           ["č","ć"],  "č"],
    ["sre_a",            ["ć","č"],  "ć"],
    ["_okolada",         ["č","ć"],  "č"],
    ["ma_ka",            ["č","ć"],  "č"],
    ["vo_e",             ["ć","č"],  "ć"],
    ["_izma",            ["č","ć"],  "č"],
    ["pomo_",            ["ć","č"],  "ć"],
    ["ro_ak",            ["đ","dž"], "đ"],
    ["_ep (na hlačama)", ["dž","ž"], "dž"]]}
]},

{id:"h3", nav:"IJE ili JE", title:"IJE ili JE",
 lead:"Ista riječ, dva zapisa. Samo je jedan točan.", tasks:[
  {t:"izbor", q:"Koja je riječ napisana ispravno?", items:[
    ["", ["dijete","djete"],         "dijete"],
    ["", ["djeca","dijeca"],         "djeca"],
    ["", ["lijep","ljep"],           "lijep"],
    ["", ["mlijeko","mljeko"],       "mlijeko"],
    ["", ["cvijet","cvjet"],         "cvijet"],
    ["", ["vjetar","vijetar"],       "vjetar"],
    ["", ["snijeg","snjeg"],         "snijeg"],
    ["", ["vjeverica","vijeverica"], "vjeverica"],
    ["", ["rijeka","rjeka"],         "rijeka"],
    ["", ["mjesec","mijesec"],       "mjesec"],
    ["", ["bijel","bjel"],           "bijel"],
    ["", ["pjesma","pijesma"],       "pjesma"]]}
]},

{id:"h4", nav:"Glasovi i slova", title:"Glasovi i slova",
 lead:"Abeceda, slogovi, lj i nj.", tasks:[
  {t:"calc", q:"Koliko slogova ima riječ?", items:[
    ["lopata", "3"],
    ["škola",  "2"],
    ["olovka", "3"]]},
  {t:"calc", q:"Rastavi riječ na slogove, s crticom između.", items:[
    ["kuća", "ku-ća"],
    ["mama", "ma-ma"]]},
  {t:"izbor", q:"Abeceda.", items:[
    ["Koje je prvo slovo abecede?",        ["A","B"], "A"],
    ["Koje je zadnje slovo abecede?",      ["Ž","Z"], "Ž"],
    ["Koje je slovo u abecedi ispred Ć?",  ["Č","C"], "Č"],
    ["Koje je slovo u abecedi ispred Č?",  ["C","Ć"], "C"]]},
  {t:"izbor", q:"Odaberi lj ili nj.", items:[
    ["_ubav", ["lj","nj"], "lj"],
    ["ko_",   ["nj","lj"], "nj"],
    ["k_iga", ["nj","lj"], "nj"]]}
]},

{id:"h5", nav:"Rečenica", title:"Rečenica",
 lead:"Točka, upitnik i uskličnik; jesne i niječne rečenice.", tasks:[
  {t:"izbor", q:"Koji znak ide na kraj rečenice?", items:[
    ["Gdje si bio__",        ["?","."], "?"],
    ["Kako je lijepo__",     ["!","?"], "!"],
    ["Marko čita knjigu__",  [".","?"], "."]]},
  {t:"izbor", q:"Jesna ili niječna rečenica?", items:[
    ["Ne volim kišu.", ["niječna","jesna"], "niječna"],
    ["Volim ljeto.",   ["jesna","niječna"], "jesna"]]},
  {t:"izbor", q:"Koji je zapis točan?", items:[
    ["", ["ne znam","neznam"],   "ne znam"],
    ["", ["ne volim","nevolim"], "ne volim"]]},
  {t:"calc", q:"Pretvori u niječnu rečenicu.", items:[
    ["Ivan čita.", "Ivan ne čita."],
    ["Ana pjeva.", "Ana ne pjeva."]]},
  {t:"calc", q:"Pretvori u jesnu rečenicu.", items:[
    ["Petar ne trči.", "Petar trči."]]},
  {t:"calc", q:"Odgovori.", items:[
    ["Koliko rečenica ima: Pada snijeg. Djeca se raduju.", "2"],
    ["Prepiši ispravno: ana ide u školu",                  "Ana ide u školu."]]}
]},

{id:"h6", nav:"Vrste riječi", title:"Vrste riječi",
 lead:"Imenice, glagoli i pridjevi; jednina i množina.", tasks:[
  {t:"izbor", q:"Opća ili vlastita imenica?", items:[
    ["Zagreb", ["vlastita imenica","opća imenica"], "vlastita imenica"],
    ["grad",   ["opća imenica","vlastita imenica"], "opća imenica"],
    ["Sava",   ["vlastita imenica","opća imenica"], "vlastita imenica"]]},
  {t:"izbor", q:"Koja je riječ glagol?", items:[
    ["", ["trči","trava"],   "trči"],
    ["", ["pjeva","pjesma"], "pjeva"]]},
  {t:"izbor", q:"Koja je riječ pridjev?", items:[
    ["", ["visok","visina"],    "visok"],
    ["", ["hladan","hladnjak"], "hladan"]]},
  {t:"izbor", q:"Jednina ili množina?", items:[
    ["djeca", ["množina","jednina"], "množina"]]},
  {t:"calc", q:"Napiši množinu.", items:[
    ["kuća",   "kuće"],
    ["prozor", "prozori"]]},
  {t:"calc", q:"Napiši jedninu.", items:[
    ["olovke", "olovka"],
    ["djeca",  "dijete"]]}
]},

{id:"h7", nav:"Riječi i značenje", title:"Riječi i značenje",
 lead:"Protuznačnice, istoznačnice i redoslijed riječi u rečenici.", tasks:[
  {t:"izbor", q:"Odaberi protuznačnicu.", items:[
    ["velik", ["malen","ogroman"],   "malen"],
    ["dan",   ["noć","jutro"],       "noć"],
    ["visok", ["nizak","dugačak"],   "nizak"],
    ["mokro", ["suho","vlažno"],     "suho"]]},
  {t:"izbor", q:"Odaberi istoznačnicu.", items:[
    ["kuća",  ["dom","vrt"],           "dom"],
    ["velik", ["golem","malen"],       "golem"],
    ["auto",  ["automobil","kamion"],  "automobil"]]},
  {t:"calc", q:"Napiši protuznačnicu.", items:[
    ["vruće", "hladno"],
    ["dobro", "loše"]]},
  {t:"calc", q:"Složi rečenicu od zadanih riječi.", items:[
    ["škole / iz / Marko / dolazi", "Marko dolazi iz škole."],
    ["lijepa / je / Ana",           "Ana je lijepa."]]},
  {t:"note", q:"U vježbenicu napiši tri riječi koje počinju slovom Č.",
   solution:"npr. čaša, čokolada, čizma"}
]}

];
```

Zbroj polja po cjelinama: 12 + 14 + 12 + 12 + 12 + 12 + 11 = 85.

- [ ] **Step 4: Pokreni provjere**

Expected: `PASS (36)`.

Ako padne „svi tocni odgovori daju 85/85", provjera ispiše koje polje odbija svoj vlastiti odgovor — to je tipfeler u podacima, ne u mehanici.

- [ ] **Step 5: Commit**

```bash
git add zadaci-hrvatski.js provjere/provjere.js
git commit -m "Sve cjeline hrvatskoga: h1 do h7, 85 polja"
```

---

### Task 10: Zadnja regresija i README

**Files:**
- Modify: `README.md`
- Modify: `provjere/provjere.js`

**Interfaces:**
- Consumes: sve iz Taskova 1–9
- Produces: ništa novo u kodu

- [ ] **Step 1: Dopiši zadnje provjere iz spec liste**

```js
/* ---------- zadnja mreza ---------- */

provjera("umireni pokret: bez animacija i bez zaostalih cestica", async ucitaj => {
  const W = await ucitaj();
  // pane s prefers-reduced-motion: provjeri da nista ne ostane visjeti
  const m = polja(W)[0];
  upisi(W, m, m.dataset.answer);
  await cekaj(2600);
  jednako(W.document.querySelectorAll("#fx b").length, 0, "zaostalih cestica");
});

provjera("avatar i PIN rade u oba predmeta", async ucitaj => {
  const W = await ucitaj();
  for (const p of ["matematika", "hrvatski"]) {
    W.izgradiPredmet(p);
    W.prompt = () => "1234";
    W.document.getElementById("reveal").click();
    await cekaj(200);
    istina(W.document.querySelectorAll(".solution.show").length > 0, `rjesenja u ${p}`);
    W.document.getElementById("reveal").click();
    await cekaj(100);
  }
  istina(!!W.document.getElementById("buddy"), "avatar postoji");
});

provjera("prebacivanje predmeta ne ostavlja polja drugog predmeta", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("hrvatski");
  jednako(polja(W).length, 85, "hrvatski");
  W.izgradiPredmet("matematika");
  jednako(polja(W).length, 85, "matematika nakon prebacivanja");
  jednako([...W.document.querySelectorAll("#main section")].map(s => s.id),
          ["c1", "c2", "c3", "c4", "c5", "c6", "c7"], "cjeline su matematicke");
});
```

- [ ] **Step 2: Pokreni provjere**

Expected: `PASS (39)`.

Napomena: izuzimanje skrivenih polja iz skoka na Enter **nije pokriveno provjerom**.
`focus()` ne postavlja `activeElement` u iframeu ovoga harnessa (`document.hasFocus()`
je `false`), a jedini drugi opazivi ucinak rukovatelja — pokretanje `check()` na
pravom kraju liste — jednak je s filterom i bez njega. Provjereno je rasudivanjem,
i to je zapisano u READMEu. Ako bilo koja matematička provjera iz Taska 1 padne, regresija je stvarna i mora se popraviti prije nastavka.

- [ ] **Step 3: Dopuni README**

U `README.md` dodaj odjeljak iza opisa igre, a odjeljak „Izmjene zadataka" prepiši tako da opisuje nove datoteke:

```markdown
## Predmeti

Stranica ima dva predmeta: **Matematiku** i **Hrvatski jezik**, oba gradivo 2. razreda.
Predmet se bira pri prvoj prijavi i mijenja prekidačem u zaglavlju. Nadimak i avatar su
zajednički, a napredak se pamti odvojeno po predmetu. Stranica se otvori na zadnje
biranom predmetu.

Zadaci stoje izvan `index.html`:

```
index.html             mehanika: razine, avatar, prijava, pamćenje, prekidač predmeta
zadaci-matematika.js   const ZADACI_MATEMATIKA = [...]
zadaci-hrvatski.js     const ZADACI_HRVATSKI = [...]
```

Dodavanje predmeta: nova stavka u `PREDMETI` u `index.html` i jedna datoteka sa zadacima.

### Tipovi zadataka

- `calc` → za svaki `[prikaz, odgovor]` polje za upis. Odgovor dulji od 14 znakova
  dobiva široko polje s oznakom nad njim.
- `izbor` → za svaki `[prikaz, [ponuđeno, …], odgovor]` red tipki za tap. Točan odgovor
  mora biti među ponuđenima. Tipke se premješaju pri iscrtavanju. Odabrana vrijednost
  ide u skriveno polje, pa razine, ključevi, kvačice i avatar rade isto kao kod upisa.
- `note` → zadatak za vježbenicu, bez polja.

### Provjera odgovora ovisi o predmetu

| | Matematika | Hrvatski |
|---|---|---|
| veliko/malo slovo | nevažno | bitno (`Ana` ≠ `ana`) |
| č ć š ž đ | — | bitno (`kuca` ≠ `kuća`) |
| `.` i `,` | isto (3.70 = 3,70) | različito |
| razmaci | ignorirani | višak se sabija u jedan |
| završni `. ? !` | — | bitno |

U hrvatskom, uz polja za upis stoji red tipki **č ć š ž đ**, jer se ta slova na
tabletu bez hrvatske tipkovnice ne mogu upisati.

## Provjere

```bash
python -m http.server 8765
```

Pa otvori `http://localhost:8765/provjere/pokreni.html`. Stranica vrti provjere nad
`index.html` u iframeu i u naslov kartice stavi `PASS (n)` ili `FAIL (n)`. Nema
dependencyja ni buildanja.
```

- [ ] **Step 4: Commit**

```bash
git add README.md provjere/provjere.js
git commit -m "Zadnja regresija i README za odabir predmeta"
```

---

## Self-review

**Pokrivenost spec-a**

| Zahtjev iz spec-a | Zadatak |
|---|---|
| Tri datoteke, `<script src>`, bez buildanja | 2, 4 |
| Registar `PREDMETI` | 3 |
| `<title>`, naslov, uvod, `<nav>`, traka postaju generirani | 3 |
| Provjera odgovora po predmetu | 5 |
| Tip `izbor` sa skrivenim poljem | 4 |
| Skrivena polja izuzeta iz skoka na Enter | 4 |
| Sidro avatara je odabrana tipka | 4 |
| Premješavanje tipki | 4 |
| Red hrvatskih slova č ć š ž đ | 6 |
| Duga polja za rečenice | 6 |
| 7 cjelina, 85 polja, 1 `note` | 4, 9 |
| Oblik `v: 2` i prijelaz sa starog zapisa | 7 |
| Prebacivanje predmeta, tiho vraćanje napretka | 7 |
| Prekidač u zaglavlju | 7 |
| Abecedna traka | 3 (funkcija), 4 (hrvatski ju koristi) |
| Odabir predmeta u prijavi | 8 |
| „Počni ispočetka" briše samo trenutni predmet | 7 |
| Matematika nepromijenjena: 85 polja, nav, `norm()` | 1 (mreža), 3, 5 |
| Jedinstveni ključevi | 1, 9 |
| `prefers-reduced-motion` | 10 |
| README | 10 |

**Bez rupa.** Svaki zahtjev iz spec-a ima zadatak.

**Imena kroz zadatke** — `izgradiPredmet`, `izgradiTraku`, `promijesaj`, `oznaciTipku`, `tocno`, `ocisti`, `prebaciPredmet`, `oznaciPredmet`, `predmet`, `PREDMETI`, `ABECEDA`, `HRVATSKA_SLOVA`, `profil.napredak`, `opt.sidro` — koriste se jednako u svim zadacima gdje se pojavljuju.

**Dvije zamke zapisane u korake, da ih izvođač ne otkriva sam**

1. `ucitajProfil()` čita `PREDMETI`, pa blok profila mora stajati nakon registra — u Tasku 7, Step 3.
2. `mousedown` i `touchstart` na traci slova moraju se zaustaviti, inače polje izgubi fokus, `focusout` provjeri odgovor usred tipkanja i označi ga netočnim — u Tasku 6, Step 5.
