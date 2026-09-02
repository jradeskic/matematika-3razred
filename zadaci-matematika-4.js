/* Zadaci: Matematika, gradivo 4. razreda.

   Cjeline slijede ishode iz Odluke o donosenju kurikuluma za nastavni predmet
   Matematika za osnovne skole i gimnazije, NN 7/2019. Oznaka ishoda stoji u
   komentaru uz svaku cjelinu. Pokriveni su svi ishodi 4. razreda:
   A.4.1-A.4.4, B.4.1, C.4.1-C.4.5, D.4.1, D.4.2, E.4.1, E.4.2.

   Ono cega ovdje NEMA namjerno: razlomci, decimalni brojevi i formule za opseg
   i povrsinu. To nisu ishodi 4. razreda -- povrsina se u D.4.2 mjeri
   prebrojavanjem jedinicnih kvadrata, a razlomci dolaze tek u 5. razredu.

   Polje "oblik" deklarira kako se odgovor provjerava:
     "broj"     cijeli ili decimalni broj, po vrijednosti (- i minus isti znak, , = .)
     "razlomak" po vrijednosti, egzaktnom racionalnom aritmetikom
     "popis"    razdvoji zarezom, svaki clan po pravilu broj, poredak bitan
     "tekst"    tocan zapis; dijakritika, veliko slovo i ² su bitni
   Tipovi zadataka su opisani u READMEu.

   Napomena o zapisu: provjera broja ne prihvaca razmak kao razdjelnik tisucica,
   pa zadaci s cetverocifrenim i vecim odgovorom izricito trazu upis bez razmaka.
   Zadatak je prikazan s razmakom (3 456), odgovor se upisuje bez njega (3456).  */

const ZADACI_MATEMATIKA_4 = [

/* MAT OS A.4.1 (sluzi se prirodnim brojevima do milijun) */
{id:"c1", nav:"Brojevi do milijun", title:"Prirodni brojevi do milijun",
 lead:"Čitanje, zapisivanje, uspoređivanje i zaokruživanje velikih brojeva.", tasks:[
  {t:"calc", oblik:"broj", q:"Upiši broj znamenkama, bez razmaka.",
   items:[["dvadeset tri tisuće petsto četrdeset","23540"],
          ["četiristo dvije tisuće šezdeset","402060"],
          ["sto tisuća pet","100005"],
          ["osamdeset tisuća dvjesto","80200"]]},
  {t:"calc", oblik:"broj", q:"Koliko vrijedi znamenka 7 u broju? Odgovori brojem bez razmaka.",
   items:[["3 725","700"],["7 480","7000"],["27 000","7000"],["170","70"]]},
  {t:"calc", oblik:"tekst", q:"Upiši znak <span aria-hidden=\"true\">&lt;</span>, <span aria-hidden=\"true\">&gt;</span> ili =",
   items:[["45 300 __ 45 030",">"],["9 999 __ 10 000","<"],["12 · 1000 __ 12 000","="],
          ["604 000 __ 640 000","<"]]},
  {t:"calc", oblik:"broj", q:"Zaokruži na najbližu stoticu. Upiši broj bez razmaka.",
   items:[["2 748","2700"],["5 962","6000"],["350","400"]]},
  {t:"calc", oblik:"broj", q:"Zaokruži na najbližu tisućicu. Upiši broj bez razmaka.",
   items:[["4 380","4000"],["7 650","8000"],["23 499","23000"]]},
  {t:"calc", oblik:"popis", q:"Nastavi niz — upiši sljedeća tri broja, odvojena zarezom, bez razmaka unutar broja.",
   items:[["1 000, 2 000, 3 000","4000,5000,6000"],
          ["9 700, 9 800, 9 900","10000,10100,10200"]]},
  {t:"calc", oblik:"broj", q:"Odgovori brojem bez razmaka.",
   items:[["prethodnik broja 30 000","29999"],
          ["sljedbenik broja 99 999","100000"],
          ["najveći šesteroznamenkasti broj","999999"]]},
  {t:"izbor", q:"Je li broj paran ili neparan?", items:[
    ["3 456",  ["paran","neparan"], "paran"],
    ["7 821",  ["neparan","paran"], "neparan"],
    ["10 000", ["paran","neparan"], "paran"]]},
  {t:"note", q:"Napiši riječima broj 305 070.",
   solution:"tristo pet tisuća sedamdeset"}
]},

/* MAT OS A.4.2 (pisano zbrajanje i oduzimanje do milijun) */
{id:"c2", nav:"Zbrajanje i oduzimanje", title:"Pisano zbrajanje i oduzimanje",
 lead:"Zbrajanje i oduzimanje do milijun te provjera rezultata.", tasks:[
  {t:"calc", oblik:"broj", q:"Izračunaj. Upiši rezultat bez razmaka.",
   items:[["2 340 + 1 250","3590"],["4 806 + 3 197","8003"],
          ["7 500 − 2 460","5040"],["10 000 − 3 725","6275"]]},
  {t:"calc", oblik:"broj", q:"Izračunaj. Upiši rezultat bez razmaka.",
   items:[["45 300 + 12 700","58000"],["83 000 − 27 500","55500"],
          ["120 000 + 45 000","165000"],["500 000 − 125 000","375000"]]},
  {t:"calc", oblik:"broj", q:"Odredi nepoznati broj.",
   items:[["x + 250 = 700","450"],["x − 320 = 180","500"],["900 − x = 355","545"]]},
  {t:"calc", oblik:"broj", q:"Riješi zadatak. Odgovori brojem bez razmaka.",
   items:[["U knjižnici je 3 250 knjiga, a stigne još 1 480. Koliko ih je ukupno?","4730"],
          ["Kino ima 1 200 mjesta, prodano je 875 ulaznica. Koliko je mjesta slobodno?","325"],
          ["Škola je skupila 2 400 €, a potrošila 1 675 €. Koliko je ostalo?","725"]]},
  {t:"note", q:"Procijeni koliko je otprilike 4 870 + 3 120, pa provjeri točnim računom.",
   solution:"procjena 4 900 + 3 100 = 8 000, točno 7 990"}
]},

/* MAT OS A.4.3 (pisano mnozenje i dijeljenje dvoznamenkastim brojem) */
{id:"c3", nav:"Množenje i dijeljenje", title:"Pisano množenje i dijeljenje",
 lead:"Množenje i dijeljenje jednoznamenkastim i dvoznamenkastim brojem.", tasks:[
  {t:"calc", oblik:"broj", q:"Izračunaj. Upiši rezultat bez razmaka.",
   items:[["24 · 10","240"],["135 · 100","13500"],["4 600 : 10","460"],["8 000 : 100","80"]]},
  {t:"calc", oblik:"broj", q:"Pomnoži pismeno. Upiši rezultat bez razmaka.",
   items:[["213 · 4","852"],["156 · 7","1092"],["48 · 25","1200"],["324 · 12","3888"],
          ["207 · 34","7038"]]},
  {t:"calc", oblik:"broj", q:"Podijeli pismeno. Upiši rezultat bez razmaka.",
   items:[["936 : 4","234"],["728 : 8","91"],["1 250 : 5","250"],["4 900 : 7","700"],
          ["546 : 13","42"]]},
  {t:"calc", oblik:"popis", q:"Podijeli s ostatkom — upiši količnik i ostatak, odvojene zarezom.",
   items:[["47 : 5","9,2"],["100 : 7","14,2"],["83 : 6","13,5"]]},
  {t:"calc", oblik:"broj", q:"Riješi zadatak. Odgovori brojem bez razmaka.",
   items:[["Bicikl stoji 245 €. Koliko eura stoje 3 bicikla?","735"],
          ["6 razreda dijeli 174 knjige na jednake dijelove. Koliko knjiga dobije svaki razred?","29"],
          ["U kutiji je 12 bombona. Koliko bombona ima u 25 kutija?","300"]]},
  {t:"note", q:"Objasni kako provjeriš je li 936 : 4 = 234 točno.",
   solution:"množenjem: 234 · 4 = 936"}
]},

/* MAT OS A.4.4 (cetiri racunske operacije u problemskim situacijama) */
{id:"c4", nav:"Problemski zadaci", title:"Četiri operacije u zadacima",
 lead:"Redoslijed računskih operacija i zadaci iz svakodnevice.", tasks:[
  {t:"calc", oblik:"broj", q:"Izračunaj poštujući redoslijed operacija.",
   items:[["12 + 5 · 4","32"],["(12 + 5) · 4","68"],["100 − 36 : 6","94"],
          ["(100 − 36) : 8","8"],["3 · 8 + 4 · 5","44"],["2 · (30 − 12) : 4","9"]]},
  {t:"izbor", q:"Što se računa prvo?", items:[
    ["8 + 2 · 5",     ["množenje","zbrajanje"],       "množenje"],
    ["(8 + 2) · 5",   ["zagrada","množenje"],         "zagrada"],
    ["20 − 12 : 4",   ["dijeljenje","oduzimanje"],    "dijeljenje"]]},
  {t:"calc", oblik:"broj", q:"Riješi zadatak. Odgovori brojem bez razmaka.",
   items:[["Ulaznica stoji 8 €. Koliko eura plati 27 učenika?","216"],
          ["U 4 jednaka paketa je 1 200 listova papira. Koliko listova ima jedan paket?","300"],
          ["Marko ima 350 €, kupi bicikl za 245 € i kacigu za 35 €. Koliko mu ostane?","70"],
          ["Autobus vozi 65 km na sat. Koliko kilometara prijeđe za 4 sata?","260"]]},
  {t:"calc", oblik:"broj", q:"Koliko je puta veći? Odgovori brojem.",
   items:[["koliko je puta 240 veće od 6","40"],
          ["koliko je puta 1 000 veće od 25","40"],
          ["za koliko je 480 veće od 95","385"]]},
  {t:"note", q:"Napiši dva različita izraza od brojeva 4, 6 i 10 koji daju isti rezultat.",
   solution:"npr. 4 · 6 − 10 = 14 i 4 + 10 = 14"}
]},

/* MAT OS B.4.1 (nepoznata velicina u jednakostima i nejednakostima) */
{id:"c5", nav:"Jednakosti", title:"Jednakosti i nejednakosti",
 lead:"Traženje nepoznate veličine i uspoređivanje izraza.", tasks:[
  {t:"calc", oblik:"broj", q:"Odredi nepoznati broj.",
   items:[["x · 6 = 54","9"],["x : 4 = 12","48"],["72 : x = 8","9"],["x + 145 = 300","155"],
          ["x − 60 = 240","300"]]},
  {t:"calc", oblik:"broj", q:"Odredi nepoznati broj.",
   items:[["3 · x + 5 = 20","5"],["2 · x − 8 = 10","9"],["100 − 4 · x = 60","10"]]},
  {t:"calc", oblik:"tekst", q:"Upiši znak <span aria-hidden=\"true\">&lt;</span>, <span aria-hidden=\"true\">&gt;</span> ili =",
   items:[["7 · 8 __ 60","<"],["120 : 4 __ 30","="],["25 + 25 __ 5 · 9",">"]]},
  {t:"calc", oblik:"broj", q:"Upiši najveći prirodni broj koji zadovoljava nejednakost.",
   items:[["x < 7","6"],["x · 5 < 40","7"],["x + 12 < 20","7"]]},
  {t:"calc", oblik:"broj", q:"Riješi zadatak. Odgovori brojem.",
   items:[["Zamislila sam broj, pomnožila ga sa 7 i dobila 84. Koji je broj?","12"],
          ["Broj uvećan za 125 daje 400. Koji je broj?","275"]]},
  {t:"note", q:"Napiši nejednakost koju zadovoljavaju brojevi 1, 2 i 3, a ne zadovoljava 4.",
   solution:"npr. x < 4"}
]},

/* MAT OS C.4.1 (odreduje i crta kut), C.4.2 (trokuti prema stranicama) */
{id:"c6", nav:"Kut i trokut", title:"Kut i vrste trokuta",
 lead:"Vrste kutova, mjerenje kutova i podjela trokuta prema stranicama.", tasks:[
  {t:"izbor", q:"Koja je vrsta kuta?", items:[
    ["kut od 90°",            ["pravi","šiljasti"],  "pravi"],
    ["kut manji od 90°",      ["šiljasti","tupi"],   "šiljasti"],
    ["kut između 90° i 180°", ["tupi","pravi"],      "tupi"],
    ["kut od 180°",           ["ispruženi","puni"],  "ispruženi"]]},
  {t:"calc", oblik:"broj", q:"Odgovori brojem stupnjeva.",
   items:[["koliki je pravi kut","90"],["koliki je ispruženi kut","180"],
          ["koliki je puni kut","360"],["koliki je zbroj dvaju pravih kutova","180"]]},
  {t:"izbor", q:"Kako se zove dio kuta?", items:[
    ["točka iz koje izlaze dvije polupravke", ["vrh","krak"],   "vrh"],
    ["polupravka koja omeđuje kut",           ["krak","vrh"],   "krak"]]},
  {t:"izbor", q:"Kakav je to trokut prema duljinama stranica?", items:[
    ["stranice 5 cm, 5 cm, 5 cm", ["jednakostraničan","jednakokračan"], "jednakostraničan"],
    ["stranice 6 cm, 6 cm, 4 cm", ["jednakokračan","raznostraničan"],   "jednakokračan"],
    ["stranice 3 cm, 4 cm, 5 cm", ["raznostraničan","jednakostraničan"],"raznostraničan"]]},
  {t:"izbor", q:"Ima li trokut pravi kut?", items:[
    ["trokut s kutom od 90°", ["da","ne"], "da"],
    ["trokut s kutovima 60°, 60°, 60°", ["ne","da"], "ne"]]},
  {t:"calc", oblik:"tekst", q:"Kojim se mjernim instrumentom mjeri kut? Upiši jednu riječ.",
   items:[["", "kutomjer"]]},
  {t:"note", q:"Nacrtaj kutomjerom kut od 45° i kut od 120° pa ih imenuj.",
   solution:"45° je šiljasti kut, 120° je tupi kut"}
]},

/* MAT OS C.4.3 (krug i njegovi elementi), C.4.4 (crtanje likova), C.4.5 (povezivanje pojmova) */
{id:"c7", nav:"Krug i likovi", title:"Krug i geometrijski likovi",
 lead:"Elementi kruga te vrhovi, stranice i bridovi likova i tijela.", tasks:[
  {t:"izbor", q:"Kako se zove taj dio kruga?", items:[
    ["točka u sredini kruga",                        ["središte","polumjer"], "središte"],
    ["dužina od središta do kružnice",               ["polumjer","promjer"],  "polumjer"],
    ["dužina kroz središte, od kružnice do kružnice",["promjer","polumjer"],  "promjer"]]},
  {t:"calc", oblik:"broj", q:"Odgovori brojem centimetara.",
   items:[["promjer kruga ako je polumjer 4 cm","8"],
          ["polumjer kruga ako je promjer 10 cm","5"],
          ["promjer kruga ako je polumjer 7 cm","14"]]},
  {t:"calc", oblik:"broj", q:"Odgovori brojem.",
   items:[["koliko vrhova ima trokut","3"],["koliko stranica ima pravokutnik","4"],
          ["koliko vrhova ima kocka","8"],["koliko bridova ima kocka","12"],
          ["koliko strana ima kvadar","6"]]},
  {t:"izbor", q:"Koji je lik u pitanju?", items:[
    ["četverokut sa svim stranicama jednakim i svim kutovima pravim", ["kvadrat","pravokutnik"], "kvadrat"],
    ["četverokut sa svim kutovima pravim i nasuprotnim stranicama jednakim", ["pravokutnik","kvadrat"], "pravokutnik"]]},
  {t:"izbor", q:"Kako se simbolima zapisuje trokut s vrhovima A, B i C?", items:[
    ["", ["∆ABC","ABC∆"], "∆ABC"]]},
  {t:"note", q:"Konstruiraj šestarom kružnicu polumjera 3 cm i označi središte, polumjer i promjer.",
   solution:"promjer je dvostruki polumjer, dakle 6 cm"}
]},

/* MAT OS D.4.1 (volumen tekucine), D.4.2 (povrsina jedinicnim kvadratima) */
{id:"c8", nav:"Mjerenje", title:"Volumen tekućine i površina",
 lead:"Litre i mililitri te mjerenje površine jediničnim kvadratima.", tasks:[
  {t:"calc", oblik:"broj", q:"Pretvori. Odgovori brojem bez razmaka.",
   items:[["koliko ml je 1 l","1000"],["koliko dl je 1 l","10"],
          ["koliko ml je 3 l","3000"],["koliko ml je 5 dl","500"]]},
  {t:"calc", oblik:"broj", q:"Riješi zadatak. Odgovori brojem.",
   items:[["Boca ima 2 l soka. Koliko čaša od 250 ml se može napuniti?","8"],
          ["Kanta prima 8 l vode. Koliko litara je u tri takve kante?","24"],
          ["Iz bačve od 50 l istočeno je 18 l. Koliko litara je ostalo?","32"]]},
  {t:"calc", oblik:"broj", q:"Lik je nacrtan u kvadratnoj mreži. Odgovori brojem jediničnih kvadrata.",
   items:[["pravokutnik širok 4 i visok 3 kvadratića","12"],
          ["kvadrat sa stranicom od 5 kvadratića","25"],
          ["pravokutnik širok 6 i visok 2 kvadratića","12"]]},
  {t:"calc", oblik:"tekst", q:"Upiši mjernu jedinicu za površinu.",
   items:[["jedinica površine, u centimetrima","cm²"],
          ["jedinica površine, u metrima","m²"]]},
  {t:"calc", oblik:"broj", q:"Odgovori brojem.",
   items:[["koliko cm² stane u 1 dm²","100"],["koliko dm² stane u 1 m²","100"]]},
  {t:"note", q:"Nacrtaj u kvadratnoj mreži dva različita lika koji imaju površinu 12 jediničnih kvadrata.",
   solution:"npr. pravokutnik 3 × 4 i pravokutnik 2 × 6"}
]},

/* MAT OS E.4.1 (istrazivanje i analiza podataka), E.4.2 (vjerojatnost dogadaja) */
{id:"c9", nav:"Podaci", title:"Podaci i vjerojatnost",
 lead:"Čitanje podataka iz tablice i dijagrama te siguran, moguć i nemoguć događaj.", tasks:[
  {t:"calc", oblik:"broj", q:"Broj sunčanih dana po mjesecima: 8, 12, 15, 20, 25, 28. Odgovori brojem.",
   items:[["koliko je mjeseci prikazano","6"],
          ["koliki je najveći broj sunčanih dana","28"],
          ["koliki je najmanji broj sunčanih dana","8"],
          ["kolika je razlika najvećeg i najmanjeg","20"]]},
  {t:"calc", oblik:"broj", q:"U razredu je 9 učenika izabralo nogomet, 6 košarku i 5 plivanje. Odgovori brojem.",
   items:[["koliko je učenika ukupno","20"],
          ["koliko ih je više izabralo nogomet nego plivanje","4"],
          ["koliko je učenika izabralo sport koji je izabralo najmanje njih","5"]]},
  {t:"izbor", q:"Što se nanosi na vodoravnu os stupčastog dijagrama?", items:[
    ["", ["obilježja podataka","broj elemenata"], "obilježja podataka"]]},
  {t:"izbor", q:"Je li događaj siguran, moguć ili nemoguć?", items:[
    ["Sutra će biti ponedjeljak ili neki drugi dan.", ["siguran","moguć"],   "siguran"],
    ["Kockicom ću baciti šesticu.",                   ["moguć","siguran"],   "moguć"],
    ["Kockicom ću baciti sedmicu.",                   ["nemoguć","moguć"],   "nemoguć"],
    ["Iz vrećice sa samo crvenim kuglicama izvući ću plavu.", ["nemoguć","moguć"], "nemoguć"]]},
  {t:"izbor", q:"Koji je ishod vjerojatniji?", items:[
    ["u vrećici je 8 crvenih i 2 plave kuglice — izvučem", ["crvenu","plavu"], "crvenu"],
    ["bacanjem kockice dobijem broj manji od 5 ili broj 6", ["broj manji od 5","broj 6"], "broj manji od 5"]]},
  {t:"note", q:"Prebroji koliko je u tvom razredu dječaka, a koliko djevojčica, i nacrtaj stupčasti dijagram.",
   solution:"dva stupca, visina svakog je broj djece; os obilježja i os broja"}
]}
];
