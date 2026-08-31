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
