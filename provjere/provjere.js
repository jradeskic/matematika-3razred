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

provjera("Enter ne uskace u skriveno polje izbora", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("hrvatski");
  const skrivena = polja(W).filter(i => i.hidden);
  istina(skrivena.length === 14, "sva su polja h2 skrivena");
  // skok na Enter smije vidjeti samo vidljiva polja
  jednako(vidljivaPolja(W).length, 0, "nema vidljivih polja za skok");
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
