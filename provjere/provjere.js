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

/* ---------- ocekivanja po skupu ----------
   Jedino mjesto s apsolutnim brojkama. Specovi koji dodaju sadrzaj mijenjaju
   ovu tablicu i nista drugo u harnessu.
------------------------------------------------------------------------- */
const OCEKIVANJA = {
  "2/matematika": { cjelina: 7, polja: 85 },
  "2/hrvatski":   { cjelina: 7, polja: 85 },
  "4/matematika": { cjelina: 9, polja: 150 },
  "4/hrvatski":   { cjelina: 9, polja: 131 },
  "5/matematika": { cjelina: 8, polja: 134 },
  "5/hrvatski":   { cjelina: 8, polja: 106 },
  "6/matematika": { cjelina: 9, polja: 132 },
  "6/hrvatski":   { cjelina: 8, polja: 87 },
  "7/matematika": { cjelina: 10, polja: 188 },
  // 7/hrvatski ima 8 cjelina, ali h8 su sami "note" zadaci, pa ta cjelina nema
  // data-total i ne ulazi u brojku ispod
  "7/hrvatski":   { cjelina: 7, polja: 116 }
};

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

/* Gornja provjera postavlja zadaci = [] u runtimeu, pa nikad ne prolazi kroz
   ReferenceError putanju koju spec obecava preziviti: GRADIVO se gradi
   jednom, pri prvom parsiranju inline skripte u <head>/<body>, iz globalnih
   ZADACI_* varijabli koje postave <script src> tagovi prije toga. Do trenutka
   kad provjera dobije W (ucitaj() ceka na window.onload), sve je vec davno
   izgradeno -- globalnu varijablu vise nije moguce "zaboraviti" i ponovno
   pokrenuti tu granu bez potpunog ponovnog gradenja stranice iz izmijenjenog
   HTML-a (ruzan trik: pisanje cijele stranice u novi iframe). Umjesto toga
   provjeravamo da izvorni kod stvarno nosi typeof cuvar na svih sest mjesta
   -- to je upravo mehanizam koji sprjecava ReferenceError kad datoteka sa
   zadacima ne stigne. */
provjera("svih sest zadaci izraza u GRADIVU ima typeof cuvar", async ucitaj => {
  const izvor = await fetch("../index.html?nc=" + Date.now()).then(r => r.text());
  const imena = ["ZADACI_MATEMATIKA_2", "ZADACI_HRVATSKI_2", "ZADACI_MATEMATIKA_5",
                 "ZADACI_HRVATSKI_5", "ZADACI_MATEMATIKA_6", "ZADACI_HRVATSKI_6"];
  const nedostaje = imena.filter(ime =>
    !new RegExp(`zadaci:\\s*typeof ${ime} !== "undefined" \\? ${ime} : \\[\\]`).test(izvor));
  jednako(nedostaje, [], "zadaci izrazi bez typeof cuvara");
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

/* ---------- matematika: danasnje ponasanje, mreza za kasnije ---------- */

provjera("matematika: naslov stranice", async ucitaj => {
  const W = await ucitaj();
  jednako(W.document.title, "Matematika — gradivo 2. razreda", "naslov");
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
  W.izgradiPredmet("2", "matematika");
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

provjera("hrvatski je registriran i gradi svih 7 cjelina", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("2", "hrvatski");
  jednako(W.document.title, "Hrvatski jezik — gradivo 2. razreda", "naslov");
  jednako(W.document.querySelectorAll("#main section").length, 7, "cjelina");
  jednako(W.document.querySelector("#main section").id, "h1", "oznaka prve cjeline");
  jednako(polja(W).length, 85, "polja ukupno");
  jednako(vidljivaPolja(W).length, 19, "polja izbora su skrivena, calc polja nisu");
});

provjera("izbor: tipke su tap, svaka stavka ima svoje tipke", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("2", "hrvatski");
  const stavke = [...W.document.querySelectorAll(".izbor-item")];
  jednako(stavke.length, 66, "stavki izbora");
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
  W.izgradiPredmet("2", "hrvatski");
  const stavka = W.document.querySelector(".izbor-item");
  const inp = stavka.querySelector("input[type=text]");
  const tocnaTipka = [...stavka.querySelectorAll(".chip")]
    .find(t => t.dataset.vrijednost === inp.dataset.answer);
  tocnaTipka.click();
  await cekaj(120);
  istina(inp.classList.contains("ok"), "polje je oznaceno kao tocno");
  istina(tocnaTipka.classList.contains("odabrana"), "tipka je oznacena kao odabrana");
  jednako(W.document.querySelector(".lvlcount").textContent, "1 / 12", "brojac razine");
});

provjera("izbor: klik na krivu tipku daje kriz", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("2", "hrvatski");
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
  // je poklapanje sva tri puta na svih 66 stavki prakticki nemoguce.
  const snimke = [];
  for (let k = 0; k < 3; k++) {
    const W = await ucitaj();
    W.izgradiPredmet("2", "hrvatski");
    snimke.push(JSON.stringify([...W.document.querySelectorAll(".izbor-item")]
      .map(s => [...s.querySelectorAll(".chip")].map(t => t.dataset.vrijednost))));
  }
  istina(new Set(snimke).size > 1,
         "tri iscrtavanja dala su identican poredak tipki — premjesavanje ne radi");
});

provjera("izbor: promjena misljenja ostavlja tocno jednu odabranu tipku", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("2", "hrvatski");
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

/* ---------- provjera odgovora po predmetu ---------- */

provjera("hrvatski: veliko slovo je bitno", async ucitaj => {
  const W = await ucitaj();
  istina(typeof W.tocno === "function", "tocno() postoji");
  W.izgradiPredmet("2", "hrvatski");
  istina(W.tocno("Ana", "Ana"), '"Ana" je tocno za "Ana"');
  istina(!W.tocno("ana", "Ana"), '"ana" NIJE tocno za "Ana"');
});

provjera("hrvatski: dijakritika je bitna", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("2", "hrvatski");
  istina(W.tocno("kuća", "kuća"), '"kuća" je tocno');
  istina(!W.tocno("kuca", "kuća"), '"kuca" NIJE tocno za "kuća"');
  istina(!W.tocno("kuča", "kuća"), '"kuča" NIJE tocno za "kuća"');
});

provjera("hrvatski: zavrsna tocka je bitna, visak razmaka nije", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("2", "hrvatski");
  istina(!W.tocno("Ivan ne čita", "Ivan ne čita."), "bez tocke NIJE tocno");
  istina(W.tocno("  Ivan   ne  čita.  ", "Ivan ne čita."), "visak razmaka se tolerira");
});

provjera("hrvatski: tocka i zarez nisu isto", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("2", "hrvatski");
  istina(!W.tocno("ku,ća", "ku.ća"), "zarez nije zamjena za tocku");
});

provjera("matematika: tocno() se ponasa kao stari norm()", async ucitaj => {
  const W = await ucitaj();
  istina(W.tocno("3.70", "3,70"), "3.70 = 3,70");
  istina(W.tocno("iva", "Iva"), "veliko i malo slovo nevazni");
  istina(W.tocno(" 4 2 ", "42"), "razmaci nevazni");
  istina(!W.tocno("43", "42"), "razliciti brojevi nisu isto");
});

/* ---------- upis u hrvatskom ---------- */

provjera("matematika ne dobiva duga polja", async ucitaj => {
  const W = await ucitaj();
  jednako(polja(W).filter(i => i.classList.contains("duga")).length, 0,
          "matematika nema odgovor dulji od 14 znakova, pa ni duga polja");
});

provjera("traka znakova postoji i skrivena je i prazna na matematici 2. razreda", async ucitaj => {
  const W = await ucitaj();
  const slova = W.document.getElementById("slova");
  istina(!!slova, "#slova postoji");
  jednako([...slova.querySelectorAll(".slovo")].map(b => b.dataset.slovo),
          [], "2. razred matematike nema znakova, traka je prazna");
  istina(slova.hidden, "u matematici 2. razreda je traka skrivena");
});

provjera("tipka slova ubacuje znak na mjesto kursora", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("2", "hrvatski");
  // izgradiPredmet ne iscrtava traku znakova (to rade prebaciRazred/
  // prebaciPredmet); izravan poziv izgradiPredmet u ovoj provjeri zato
  // sam osvjezava traku za novi predmet.
  W.iscrtajZnakove();
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

/* ---------- napredak po predmetu ---------- */

provjera("stari zapis se prevodi u v:3 i cuva matematicki napredak", async ucitaj => {
  localStorage.setItem("mat3-profil-v1", JSON.stringify({
    ime: "Luka", avatar: "jedi", odgovori: { "c1|63|0": "6D3J" }
  }));
  const W = await ucitaj();
  await cekaj(300);
  const zapis = JSON.parse(localStorage.getItem("mat3-profil-v1"));
  jednako(zapis.v, 3, "verzija zapisa");
  jednako(zapis.ime, "Luka", "ime je ocuvano");
  jednako(zapis.avatar, "jedi", "avatar je ocuvan");
  jednako(zapis.napredak["2/matematika"]["c1|63|0"], "6D3J", "matematicki odgovor je ocuvan");
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
  jednako(Object.keys(zapis.napredak["2/matematika"]).length, 1, "matematicki napredak je ostao");
  jednako(Object.keys(zapis.napredak["2/hrvatski"]).length, 1, "hrvatski napredak je zapisan");
  jednako(zapis.predmet, "hrvatski", "zadnje biran predmet");
  // natrag na matematiku: odgovor je tu
  W.document.querySelector('.predmet[data-predmet="matematika"]').click();
  await cekaj(200);
  jednako(W.document.querySelectorAll("#main input.ok").length, 1, "matematicki odgovor je vracen");
});

provjera("prebacivanje predmeta ne gubi jos nezapisane odgovore", async ucitaj => {
  localStorage.setItem("mat3-profil-v1", JSON.stringify({ v: 2, ime: "Luka", avatar: "jedi",
    predmet: "hrvatski", napredak: { matematika: {}, hrvatski: {} } }));
  const W = await ucitaj();
  // dijete tapka brze nego sto odgodeni upis stigne okinuti
  const stavke = [...W.document.querySelectorAll(".izbor-item")].slice(0, 5);
  for (const st of stavke) {
    const inp = st.querySelector("input[type=text]");
    [...st.querySelectorAll(".chip")].find(t => t.dataset.vrijednost === inp.dataset.answer).click();
    await cekaj(60);
  }
  jednako(W.document.querySelectorAll("#main input.ok").length, 5, "pet tocnih na ekranu");
  W.document.querySelector('.predmet[data-predmet="matematika"]').click();
  await cekaj(600);
  const disk = JSON.parse(localStorage.getItem("mat3-profil-v1"));
  jednako(Object.keys(disk.napredak["2/hrvatski"]).length, 5, "svih pet je zapisano");
});

provjera("Pocni ispocetka nije ponisten brzim prebacivanjem", async ucitaj => {
  const W = await ucitaj();
  const m = polja(W)[0];
  upisi(W, m, m.dataset.answer);
  await cekaj(300);
  W.document.getElementById("clear").click();
  W.document.querySelector('.predmet[data-predmet="hrvatski"]').click();   // odmah, bez pauze
  await cekaj(600);
  const disk = JSON.parse(localStorage.getItem("mat3-profil-v1"));
  jednako(Object.keys(disk.napredak["2/matematika"]).length, 0, "matematika je ostala obrisana");
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
  jednako(Object.keys(zapis.napredak["2/hrvatski"]).length, 0, "hrvatski je obrisan");
  jednako(Object.keys(zapis.napredak["2/matematika"]).length, 1, "matematika je ostala");
});

provjera("ustajala kartica ne brise napredak drugog predmeta", async ucitaj => {
  const W = await ucitaj();
  // dijete je u prvoj kartici na matematici
  const m = polja(W)[0];
  upisi(W, m, m.dataset.answer);
  await cekaj(300);
  // druga kartica u meduvremenu upisuje napredak hrvatskoga
  const zapis = JSON.parse(localStorage.getItem("mat3-profil-v1"));
  zapis.napredak["2/hrvatski"] = { "h2|ku_a (dom)|0": "ć" };
  localStorage.setItem("mat3-profil-v1", JSON.stringify(zapis));
  // prva kartica sada spremi jos jedan matematicki odgovor
  const m2 = polja(W)[1];
  upisi(W, m2, m2.dataset.answer);
  await cekaj(300);
  const nakon = JSON.parse(localStorage.getItem("mat3-profil-v1"));
  jednako(nakon.napredak["2/hrvatski"], { "h2|ku_a (dom)|0": "ć" },
          "napredak hrvatskoga je ocuvan");
  jednako(Object.keys(nakon.napredak["2/matematika"]).length, 2,
          "oba matematicka odgovora su zapisana");
});

provjera("pokvaren zapis na disku ne zaustavlja spremanje", async ucitaj => {
  const W = await ucitaj();
  localStorage.setItem("mat3-profil-v1", "{ovo nije JSON");
  const m = polja(W)[0];
  upisi(W, m, m.dataset.answer);
  await cekaj(300);
  const nakon = JSON.parse(localStorage.getItem("mat3-profil-v1"));
  jednako(nakon.v, 3, "zapis je prepisan ispravnim oblikom");
  jednako(Object.keys(nakon.napredak["2/matematika"]).length, 1, "odgovor je zapamcen");
});

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
  jednako(W.document.querySelector("#main section").id, "h1", "otvorena cjelina");
  const zapis = JSON.parse(localStorage.getItem("mat3-profil-v1"));
  jednako(zapis.predmet, "hrvatski", "predmet je zapamcen");
  jednako(zapis.ime, "Ana", "ime je zapamceno");
});

/* ---------- puni sadrzaj hrvatskoga ---------- */

provjera("hrvatski: cjeline su po redu, recenicni odgovori dobivaju siroko polje", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("2", "hrvatski");
  jednako([...W.document.querySelectorAll("#main section")].map(s => s.id),
          ["h1", "h2", "h3", "h4", "h5", "h6", "h7"], "oznake cjelina");
  jednako(W.document.querySelectorAll("nav a").length,
          W.document.querySelectorAll("#main section").length, "linkova koliko i cjelina");
  // recenicni odgovori moraju dobiti siroko polje; u podacima ih je tocno cetiri
  const duga = polja(W).filter(i => i.classList.contains("duga"));
  jednako(duga.length, 4, "polja s razredom duga");
  duga.forEach(i => istina(i.dataset.answer.length > 14,
    `polje s razredom duga ima kratak odgovor: "${i.dataset.answer}"`));
});

provjera("hrvatski: svi kljucevi su jedinstveni", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("2", "hrvatski");
  const kljucevi = polja(W).map(i => i.dataset.key);
  jednako(kljucevi.filter(k => !k).length, 0, "polja bez kljuca");
  jednako(new Set(kljucevi).size, 85, "jedinstvenih kljuceva");
});

provjera("hrvatski: tocan odgovor je uvijek medu ponudenim tipkama", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("2", "hrvatski");
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
  W.izgradiPredmet("2", "hrvatski");
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
  W.izgradiPredmet("2", "hrvatski");
  jednako(W.document.querySelectorAll("#main .paper-task").length, 1, "zadataka za vjezbenicu");
});

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
    W.izgradiPredmet("2", p);
    W.prompt = () => "1234";
    W.document.getElementById("reveal").click();
    await cekaj(200);
    istina(W.document.querySelectorAll(".solution.show").length > 0, `rjesenja u ${p}`);
    W.document.getElementById("reveal").click();
    await cekaj(100);
  }
  istina(!!W.document.getElementById("buddy"), "avatar postoji");
});

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

provjera("prebacivanje predmeta ne ostavlja polja drugog predmeta", async ucitaj => {
  const W = await ucitaj();
  W.izgradiPredmet("2", "hrvatski");
  jednako(polja(W).length, 85, "hrvatski");
  W.izgradiPredmet("2", "matematika");
  jednako(polja(W).length, 85, "matematika nakon prebacivanja");
  jednako([...W.document.querySelectorAll("#main section")].map(s => s.id),
          ["c1", "c2", "c3", "c4", "c5", "c6", "c7"], "cjeline su matematicke");
});

/* ---------- razredi i gradivo ---------- */

provjera("GRADIVO ima 2. razred za oba predmeta", async ucitaj => {
  const W = await ucitaj();
  istina(!!W.GRADIVO["2"].matematika.zadaci.length, "matematika 2. ima zadatke");
  istina(!!W.GRADIVO["2"].hrvatski.zadaci.length, "hrvatski 2. ima zadatke");
  jednako(W.stanje().razred, "2", "aktivni razred");
});

provjera("RAZREDI ima 2., 4., 5., 6. i 7. razred", async ucitaj => {
  const W = await ucitaj();
  jednako(Object.keys(W.RAZREDI), ["2", "4", "5", "6", "7"], "kljucevi razreda");
});

provjera("GRADIVO ima svih deset skupova i ni jedan nije prazan", async ucitaj => {
  const W = await ucitaj();
  const parovi = [];
  for (const r of Object.keys(W.RAZREDI))
    for (const p of Object.keys(W.PREDMETI))
      parovi.push([r + "/" + p, (W.GRADIVO[r] && W.GRADIVO[r][p] || {}).zadaci]);
  const prazni = parovi.filter(([, z]) => !z || !z.length).map(([k]) => k);
  jednako(prazni, [], "skupovi bez zadataka");
});

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

/* ---------- prekidac razreda ---------- */

provjera("prekidac razreda ima pilulu za svaki razred", async ucitaj => {
  const W = await ucitaj();
  const pilule = [...W.document.querySelectorAll("#razredi .razred")];
  jednako(pilule.map(p => p.dataset.razred), ["2", "4", "5", "6", "7"], "pilule");
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

provjera("prebacivanje razreda ne gubi jos nezapisan odgovor", async ucitaj => {
  localStorage.setItem("mat3-profil-v1", JSON.stringify({
    v: 3, ime: "", avatar: "patuljak", razred: "2", predmet: "matematika",
    napredak: { "2/matematika": {}, "6/matematika": {} }
  }));
  const W = await ucitaj();
  const m = polja(W)[0];
  // upisi() salje sinteticki "focusout", a on sam po sebi vec zove
  // zapamtiOdgovore() (main ima focusout slusac) -- to bi maskiralo bas onu
  // regresiju koju ovdje zelimo uhvatiti. Zato ovdje samo mijenjamo
  // vrijednost i saljemo "input" (kao dijete koje jos tipka), bez izlaska iz
  // polja -- jedini poziv zapamtiOdgovore() koji moze zabiljeziti ovaj
  // odgovor prije prebacivanja razreda je onaj unutar prebaciRazred().
  m.value = m.dataset.answer;
  m.dispatchEvent(new W.Event("input", { bubbles: true }));
  // odmah, bez cekaj(): sve tri gornje provjere razreda cekaju cekaj(300)
  // izmedju klikova, pa nikad ne gadjaju ovaj prozor -- upis vec okine prije
  // klika. Ovdje je isti scenarij kao "prebacivanje predmeta ne gubi jos
  // nezapisane odgovore", ali za pilulu razreda.
  W.document.querySelector("#razredi .razred[data-razred='6']").click();
  await cekaj(600);
  const zapis = JSON.parse(localStorage.getItem("mat3-profil-v1"));
  jednako(Object.keys(zapis.napredak["2/matematika"]).length, 1, "odgovor 2. razreda nije izgubljen");
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
  const r = W.razloziBroj("0,1");
  const s = W.razloziBroj("0,2");
  // zbroj 0,1 + 0,2 je tocno 3/10 (kao 15/50, bez binarne pogreske);
  // krizna usporedba umjesto izravne provjere brojnika/nazivnika, jer
  // razloziBroj vraca svaki broj vec skracen na najmanje zajednicke
  // razlomke pa produkt nazivnika nije nuzno bas 10
  jednako((r.a * s.b + s.a * r.b) * 10, 3 * (r.b * s.b), "0,1 + 0,2 je tocno 3/10");
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

/* Pokrivenost stvarne putanje pokvarenog polja (Important 1-3 iz recenzije Taska 5):
   pokvaren zadatak se privremeno ubaci u stvarno gradivo 6. razreda, izgradiPredmet
   se pozove izravno (bez klikova po sucelju), pa se provjeri da pokvareno polje ne
   rusi ni iscrtavanje ni vracanje spremljenog napretka za preostala polja.        */
provjera("pokvareno polje u stvarnim podacima ne rusi ostatak stranice", async ucitaj => {
  const W = await ucitaj();
  const izvorni = W.GRADIVO["6"].matematika.zadaci;
  try {
    W.GRADIVO["6"].matematika.zadaci = [
      ...izvorni,
      { id: "testpokvareno", nav: "Test", title: "Test", lead: "Test.", tasks: [
        { t: "calc", oblik: "razlomak", q: "Test.", items: [["3/4 =", "tri četvrtine"]] }
      ] }
    ];
    W.izgradiPredmet("6", "matematika");

    const secPokvareno = W.document.getElementById("testpokvareno");
    const inpPokvareno = secPokvareno.querySelector("input[type=text]");
    istina(inpPokvareno.disabled, "pokvareno polje je disabled");
    istina(inpPokvareno.classList.contains("pokvaren"), "pokvareno polje ima klasu pokvaren");
    istina(!inpPokvareno.hasAttribute("data-answer"), "pokvareno polje nema data-answer");
    istina(!secPokvareno.hasAttribute("data-total"),
      "cjelina bez ijednog valjanog polja ne dobiva data-total (total je 0, pa se traka ne iscrtava)");

    // spremljen napredak: kljuc pokvarenog polja iz vremena kad je zadatak bio valjan,
    // plus stvarno polje iz c1 koje mora ostati vraceno unatoc pokvarenom polju.
    // "profil" je const objekt i ne dolazi na window (isto ogranicenje kao
    // kljucNapretka/imaGradivo), pa napredak upisujemo na disk pa ga ucitajProfil()
    // (deklaracija funkcije, dolazi na window) vrati u zivi "profil" u memoriji.
    const secDobro = W.document.getElementById("c1");
    const inpDobro = secDobro.querySelector("input[data-answer]");
    const st = W.stanje();
    const kljuc = st.razred + "/" + st.predmet;
    W.localStorage.setItem("mat3-profil-v1", JSON.stringify({
      v: 3, ime: "", avatar: "patuljak", razred: st.razred, predmet: st.predmet,
      napredak: {
        [kljuc]: {
          [inpPokvareno.dataset.key]: "3/4",
          [inpDobro.dataset.key]: inpDobro.dataset.answer
        }
      }
    }));
    W.ucitajProfil();

    let bacilo = false;
    try { W.vratiNapredak(); } catch (e) { bacilo = true; }
    istina(!bacilo, "vratiNapredak ne baca kad spremljeni kljuc pogodi pokvareno polje");
    istina(inpDobro.classList.contains("ok"), "preostalo (valjano) polje se i dalje vraca");
  } finally {
    W.GRADIVO["6"].matematika.zadaci = izvorni;
    W.izgradiPredmet("2", "matematika");
  }
});

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
  // focus() sam ne pali focusin kad prozor s harnessom nema OS fokus (npr. u
  // pozadinskom tabu automatizacije), pa focusin odasiljemo izravno -- isti
  // obrazac kao "tipka slova ubacuje znak na mjesto kursora".
  inp.focus();
  inp.dispatchEvent(new W.FocusEvent("focusin", { bubbles: true }));
  await cekaj(60);
  W.document.querySelector("#slova .slovo[data-slovo='/']").click();
  jednako(inp.value, "/", "znak je upisan");
});

provjera("prebacivanje predmeta iscrtava traku znakova u DOM-u", async ucitaj => {
  const W = await ucitaj();
  const slova = () => [...W.document.querySelectorAll("#slova .slovo")].map(b => b.dataset.slovo);
  jednako(slova(), [], "matematika 2. razred nema tipki u #slova");
  W.document.querySelector("#predmeti .predmet[data-predmet='hrvatski']").click();
  await cekaj(300);
  jednako(slova(), ["č", "ć", "š", "ž", "đ"], "hrvatski iscrtava tipke u #slova");
  W.document.querySelector("#razredi .razred[data-razred='6']").click();
  await cekaj(300);
  jednako(slova(), ["č", "ć", "š", "ž", "đ"], "hrvatski 6. razred i dalje ima iste tipke u #slova");
  W.document.querySelector("#predmeti .predmet[data-predmet='matematika']").click();
  await cekaj(300);
  jednako(slova(), ["-", "/", ",", "²", "³"], "matematika 6. razred iscrtava svoje tipke u #slova");
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
