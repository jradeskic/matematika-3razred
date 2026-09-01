/* Zadaci: Matematika, gradivo 6. razreda.

   Cjeline slijede ishode iz Odluke o donosenju kurikuluma za nastavni predmet
   Matematika za osnovne skole i gimnazije, NN 7/2019. Oznaka ishoda stoji u
   komentaru uz svaku cjelinu.

   Pokriveno: A.6.1-A.6.9, B.6.1, C.6.1-C.6.3, D.6.1-D.6.5, E.6.1 -- dakle svi
   ishodi 6. razreda.
   Biljeska o D.6.3: ta oznaka u NN 7/2019 stoji u istoj celiji kao A.6.9, nad
   zajednickim tekstom ishoda "Primjenjuje racunanje postotnoga iznosa zadane
   osnovne vrijednosti". D.6.3 i A.6.9 su isti ishod naveden u dvjema domenama
   (isti uzorak kao A.7.1 + D.7.6), pa ga cjelina c6 pokriva.

   Polje "oblik" deklarira kako se odgovor provjerava:
     "broj"     cijeli ili decimalni broj, po vrijednosti (- i minus isti znak, , = .)
     "razlomak" po vrijednosti, egzaktnom racionalnom aritmetikom
     "popis"    razdvoji zarezom, svaki clan po pravilu broj, poredak bitan
     "tekst"    tocan zapis; koristi se kad je bitno da odgovor bude skracen
   Tipovi zadataka su opisani u READMEu.

   Negativni odgovori u podacima pisu se ASCII minusom (-5), a u tekstu zadatka
   stoji tipografski minus. Provjera izjednacuje obje varijante.
   Provjera broja ne prihvaca razmak kao razdjelnik tisucica, pa zadaci s
   cetverocifrenim odgovorom izricito trazu upis bez razmaka.                   */

const ZADACI_MATEMATIKA_6 = [

/* MAT OS A.6.1 (NZD, NZV, djeljivost umnoska) */
{id:"c1", nav:"NZD i NZV", title:"Djeljivost, NZD i NZV",
 lead:"Zajednički djelitelji i višekratnici dvaju brojeva.", tasks:[
  {t:"calc", oblik:"broj", q:"Koliki je najveći zajednički djelitelj (NZD)?",
   items:[["12 i 18","6"],["24 i 36","12"],["15 i 28","1"],["30 i 45","15"]]},
  {t:"calc", oblik:"broj", q:"Koliki je najmanji zajednički višekratnik (NZV)?",
   items:[["4 i 6","12"],["6 i 9","18"],["8 i 12","24"],["5 i 7","35"]]},
  {t:"calc", oblik:"popis", q:"Upiši prva tri višekratnika broja, odvojena zarezom.",
   items:[["7","7,14,21"],["12","12,24,36"]]},
  {t:"izbor", q:"Je li umnožak djeljiv zadanim brojem?", items:[
    ["6 · 5 djeljivo s 3",   ["da","ne"], "da"],
    ["7 · 4 djeljivo s 2",   ["da","ne"], "da"],
    ["5 · 7 djeljivo s 4",   ["da","ne"], "ne"]]},
  {t:"izbor", q:"Jesu li brojevi relativno prosti, to jest je li njihov NZD jednak 1?", items:[
    ["9 i 16",  ["da","ne"], "da"],
    ["12 i 18", ["da","ne"], "ne"],
    ["8 i 15",  ["da","ne"], "da"]]},
  {t:"note", q:"Dvije žice duge 24 m i 36 m treba razrezati na jednake dijelove, najdulje moguće, bez ostatka. Koliko je dug jedan dio?",
   solution:"NZD(24, 36) = 12, dakle 12 m"}
]},

/* MAT OS A.6.2 (prosirivanje, skracivanje, zajednicki nazivnik) */
{id:"c2", nav:"Razlomci", title:"Proširivanje i skraćivanje razlomaka",
 lead:"Skraćivanje do neskrativoga razlomka i svođenje na zajednički nazivnik.", tasks:[
  {t:"calc", oblik:"tekst", q:"Skrati razlomak do neskrativoga. Zapiši u obliku 2/5.",
   items:[["6/8","3/4"],["10/15","2/3"],["24/36","2/3"],["45/60","3/4"]]},
  {t:"calc", oblik:"tekst", q:"Proširi razlomak brojem 3. Zapiši u obliku 4/9.",
   items:[["2/5","6/15"],["3/4","9/12"],["1/6","3/18"]]},
  {t:"calc", oblik:"broj", q:"Koliki je najmanji zajednički nazivnik?",
   items:[["1/4 i 1/6","12"],["2/3 i 3/5","15"],["1/2 i 5/8","8"]]},
  {t:"izbor", q:"Jesu li razlomci jednaki?", items:[
    ["1/2 i 3/6",  ["jednaki","različiti"], "jednaki"],
    ["2/3 i 3/4",  ["jednaki","različiti"], "različiti"],
    ["4/10 i 2/5", ["jednaki","različiti"], "jednaki"]]},
  {t:"note", q:"Objasni zašto se vrijednost razlomka ne mijenja kad ga proširimo ili skratimo.",
   solution:"brojnik i nazivnik množimo ili dijelimo istim brojem, pa se odnos dijela i cjeline ne mijenja"}
]},

/* MAT OS A.6.3 (zapisi nenegativnih racionalnih brojeva), A.6.4 (usporedivanje) */
{id:"c3", nav:"Racionalni brojevi", title:"Zapisi i uspoređivanje racionalnih brojeva",
 lead:"Razlomak, decimalni broj, postotak i promil — isti broj, drugi zapis.", tasks:[
  {t:"calc", oblik:"tekst", q:"Upiši znak <span aria-hidden=\"true\">&lt;</span>, <span aria-hidden=\"true\">&gt;</span> ili =",
   items:[["2/3 __ 3/4","<"],["0,6 __ 3/5","="],["7/2 __ 3,4",">"],["1/4 __ 25 %","="]]},
  {t:"izbor", q:"Kako se to zapisuje kao postotak?", items:[
    ["1/2", ["50 %","20 %"], "50 %"],
    ["1/4", ["25 %","14 %"], "25 %"],
    ["3/4", ["75 %","34 %"], "75 %"],
    ["0,2", ["20 %","2 %"],  "20 %"]]},
  {t:"izbor", q:"Kako se to zapisuje decimalnim brojem?", items:[
    ["1/8", ["0,125","0,18"], "0,125"],
    ["3/5", ["0,6","0,35"],   "0,6"],
    ["7/4", ["1,75","1,34"],  "1,75"]]},
  {t:"izbor", q:"Koji je broj najmanji?", items:[
    ["0,3 ili 1/4 ili 0,8", ["1/4","0,3"], "1/4"],
    ["2/3 ili 0,7 ili 3/5", ["3/5","2/3"], "3/5"]]},
  {t:"calc", oblik:"broj", q:"U razredu je 12 djevojčica i 18 dječaka. Upiši samo broj.",
   items:[["koliko je ukupno učenika","30"],
          ["koliko posto razreda su djevojčice, bez znaka %","40"],
          ["koliko posto razreda su dječaci, bez znaka %","60"]]},
  {t:"note", q:"Zapiši broj 0,45 kao razlomak i kao postotak.",
   solution:"45/100 = 9/20, to jest 45 %"}
]},

/* MAT OS A.6.5 (racunanje s nenegativnim racionalnim brojevima) */
{id:"c4", nav:"Računanje s razlomcima", title:"Računanje s razlomcima",
 lead:"Zbrajanje, oduzimanje, množenje i dijeljenje razlomaka.", tasks:[
  {t:"calc", oblik:"tekst", q:"Izračunaj i skrati do kraja. Zapiši u obliku 2/5.",
   items:[["1/4 + 1/4","1/2"],["2/3 + 1/6","5/6"],["3/4 − 1/2","1/4"],["1/2 · 2/3","1/3"]]},
  {t:"calc", oblik:"tekst", q:"Izračunaj i skrati do kraja.",
   items:[["5/6 · 3/10","1/4"],["7/8 − 3/8","1/2"],["2/5 + 3/10","7/10"]]},
  {t:"calc", oblik:"broj", q:"Izračunaj.",
   items:[["2/3 : 1/6","4"],["3/4 : 1/8","6"],["1/2 + 0,25","0,75"],["2 · 1,5","3"]]},
  {t:"izbor", q:"Koja je recipročna vrijednost?", items:[
    ["2/3", ["3/2","2/3"], "3/2"],
    ["5",   ["1/5","5"],   "1/5"],
    ["1/4", ["4","1/4"],   "4"]]},
  {t:"note", q:"Od 3/4 kg jabuka pojeli smo 1/3. Koliko je kilograma ostalo?",
   solution:"pojedeno 1/4 kg, ostalo 1/2 kg"}
]},

/* MAT OS A.6.6 (prikaz cijelih brojeva), A.6.7 (racunanje s cijelim brojevima) */
{id:"c5", nav:"Cijeli brojevi", title:"Cijeli brojevi",
 lead:"Negativni brojevi, suprotni broj, apsolutna vrijednost i računanje.", tasks:[
  {t:"calc", oblik:"broj", q:"Izračunaj.",
   items:[["−3 + 8","5"],["4 − 9","-5"],["−6 − 2","-8"],["−7 + (−3)","-10"]]},
  {t:"calc", oblik:"broj", q:"Izračunaj.",
   items:[["(−4) · 3","-12"],["(−5) · (−4)","20"],["(−18) : 6","-3"],["(−20) : (−5)","4"]]},
  {t:"calc", oblik:"broj", q:"Upiši broj.",
   items:[["suprotni broj broju −7","7"],
          ["apsolutna vrijednost broja −9","9"],
          ["apsolutna vrijednost broja 4","4"]]},
  {t:"calc", oblik:"tekst", q:"Upiši znak <span aria-hidden=\"true\">&lt;</span>, <span aria-hidden=\"true\">&gt;</span> ili =",
   items:[["−5 __ −2","<"],["0 __ −3",">"],["−7 __ 7","<"],["−4 __ −4","="]]},
  {t:"calc", oblik:"broj", q:"Izračunaj kvadrat.",
   items:[["(−3)²","9"],["(−5)²","25"],["(−1)²","1"]]},
  {t:"note", q:"Temperatura je bila −6 °C, pa je porasla za 9 °C. Kolika je sada? Zapiši računom.",
   solution:"−6 + 9 = 3, dakle 3 °C"}
]},

/* MAT OS A.6.8 (potencija baze 10), A.6.9 (postotni iznos) */
{id:"c6", nav:"Potencije i postoci", title:"Potencije baze 10 i postoci",
 lead:"Dekadske jedinice kao potencije i računanje postotnoga iznosa.", tasks:[
  {t:"calc", oblik:"broj", q:"Koliko iznosi? Upiši broj bez razmaka.",
   items:[["10⁴","10000"],["10⁰","1"],["10² · 10³","100000"]]},
  {t:"izbor", q:"Kako se dekadska jedinica zapisuje kao potencija baze 10?", items:[
    ["100",   ["10²","10³"], "10²"],
    ["1 000", ["10³","10²"], "10³"],
    ["1",     ["10⁰","10¹"], "10⁰"]]},
  {t:"calc", oblik:"broj", q:"Izračunaj postotni iznos. Upiši samo broj.",
   items:[["10 % od 250","25"],["25 % od 80","20"],["50 % od 46","23"],["20 % od 150","30"]]},
  {t:"calc", oblik:"broj", q:"Upiši samo broj eura.",
   items:[["cijena 40 € snižena za 25 %, nova cijena","30"],
          ["cijena 60 € povećana za 10 %, nova cijena","66"],
          ["koliko je 15 % od 200 €","30"]]},
  {t:"izbor", q:"Koliko je to kao razlomak?", items:[
    ["1 %", ["1/100","1/10"],   "1/100"],
    ["1 ‰", ["1/1000","1/100"], "1/1000"]]},
  {t:"note", q:"U trgovini je majica od 24 € snižena za 25 %. Koliko sada košta i koliko si uštedio?",
   solution:"sniženje 6 €, nova cijena 18 €"}
]},

/* MAT OS B.6.1 (linearna jednadzba u Q+ i Z); omjeri pripadaju A.6.3
   ("Povezuje omjer dviju velicina s razlomkom"), a ne B.6.1. */
{id:"c7", nav:"Jednadžbe i omjeri", title:"Jednadžbe i omjeri",
 lead:"Jednadžbe s cijelim i racionalnim brojevima, omjer dviju veličina.", tasks:[
  {t:"calc", oblik:"broj", q:"Riješi jednadžbu — upiši vrijednost x.",
   items:[["5x = −20","-4"],["x + 7 = 2","-5"],["x − 4 = −9","-5"],["−3x = 12","-4"]]},
  {t:"calc", oblik:"broj", q:"Riješi jednadžbu — upiši vrijednost x.",
   items:[["2x + 3 = 11","4"],["0,5x = 7","14"],["x : 4 = −3","-12"]]},
  {t:"calc", oblik:"tekst", q:"Riješi jednadžbu — upiši x kao skraćeni razlomak.",
   items:[["4x = 3","3/4"],["6x = 4","2/3"]]},
  {t:"calc", oblik:"broj", q:"Omjer je 2 : 3. Upiši samo broj.",
   items:[["ako je prvi broj 8, koliki je drugi","12"],
          ["ako je drugi broj 21, koliki je prvi","14"]]},
  {t:"note", q:"Sok i voda pomiješani su u omjeru 1 : 4. Koliko vode treba na 3 dl soka?",
   solution:"12 dl vode"}
]},

/* MAT OS C.6.1 (kut i simetrala), C.6.2 (trokut), C.6.3 (cetverokut),
   D.6.1 (mjerne jedinice), D.6.2 (opseg, povrsina, mjera kuta) */
{id:"c8", nav:"Trokut i četverokut", title:"Kutovi, trokut i četverokut",
 lead:"Zbroj kutova, vrste trokuta i četverokuta, opseg i površina.", tasks:[
  {t:"calc", oblik:"broj", q:"Upiši mjeru kuta u stupnjevima, bez znaka °.",
   items:[["zbroj mjera kutova u trokutu","180"],
          ["zbroj mjera kutova u četverokutu","360"],
          ["treći kut trokuta ako su dva 50° i 60°","70"],
          ["svaki kut jednakostraničnoga trokuta","60"]]},
  {t:"izbor", q:"Kakav je trokut po kutovima?", items:[
    ["kutovi 50°, 60°, 70°",  ["šiljastokutni","tupokutni"], "šiljastokutni"],
    ["kutovi 90°, 60°, 30°",  ["pravokutni","tupokutni"],    "pravokutni"],
    ["kutovi 120°, 40°, 20°", ["tupokutni","pravokutni"],    "tupokutni"]]},
  {t:"izbor", q:"Koji je to četverokut?", items:[
    ["sve stranice jednake, svi kutovi pravi",                    ["kvadrat","romb"],          "kvadrat"],
    ["sve stranice jednake, kutovi nisu pravi",                   ["romb","pravokutnik"],      "romb"],
    ["nasuprotne stranice paralelne i jednake, kutovi nisu pravi",["paralelogram","kvadrat"],  "paralelogram"]]},
  {t:"calc", oblik:"broj", q:"Opseg i površina — upiši samo broj.",
   items:[["opseg trokuta stranica 5 cm, 6 cm i 7 cm","18"],
          ["površina trokuta osnovice 8 cm i visine 5 cm","20"],
          ["površina paralelograma osnovice 9 cm i visine 4 cm","36"]]},
  {t:"calc", oblik:"broj", q:"Pretvori u kvadratne centimetre. Upiši samo broj.",
   items:[["1 dm²","100"],["2,5 dm²","250"]]},
  {t:"izbor", q:"Koliko stupnjeva ima kut koji nastane kad simetrala prepolovi pravi kut?", items:[
    ["", ["45°","90°"], "45°"]]},
  {t:"note", q:"Konstruiraj trokut sa stranicama 5 cm, 6 cm i 7 cm, pa mu nacrtaj sve tri visine.",
   solution:"visine se sijeku u jednoj točki"},
  {t:"note", q:"Konstruiraj kut od 60° i nacrtaj mu simetralu. Koliko iznosi svaki dobiveni kut?",
   solution:"simetrala dijeli kut na dva kuta od 30°"}
]},

/* MAT OS D.6.4 (brojevni pravac), D.6.5 (koordinatni sustav), E.6.1 (podaci) */
{id:"c9", nav:"Koordinate i podaci", title:"Brojevni pravac, koordinatni sustav i podaci",
 lead:"Koordinate točaka, kvadranti i frekvencije podataka.", tasks:[
  {t:"calc", oblik:"broj", q:"Brojevni pravac — upiši koordinatu točke.",
   items:[["točka je 3 jedinice lijevo od nule","-3"],
          ["točka je na polovištu između −2 i 4","1"],
          ["točka je 5 jedinica desno od −2","3"]]},
  {t:"calc", oblik:"broj", q:"Točka T(−3, 5). Upiši broj.",
   items:[["prva koordinata, x","-3"],["druga koordinata, y","5"]]},
  {t:"izbor", q:"U kojem je kvadrantu točka?", items:[
    ["(3, 5)",   ["prvom","drugom"],    "prvom"],
    ["(−3, 5)",  ["drugom","trećem"],   "drugom"],
    ["(−3, −5)", ["trećem","četvrtom"], "trećem"],
    ["(3, −5)",  ["četvrtom","prvom"],  "četvrtom"]]},
  {t:"calc", oblik:"broj", q:"Podaci: 3, 5, 3, 7, 2, 3, 5. Odgovori brojem.",
   items:[["frekvencija broja 3","3"],
          ["koliko je podataka ukupno","7"],
          ["najveći podatak","7"],
          ["frekvencija broja 5","2"]]},
  {t:"note", q:"Nacrtaj koordinatni sustav i ucrtaj točke A(2, 3), B(−2, 3) i C(0, −4).",
   solution:"A u prvom kvadrantu, B u drugom, C na okomitoj osi ispod ishodišta"},
  {t:"note", q:"Za podatke 3, 5, 3, 7, 2, 3, 5 napravi tablicu frekvencija, pa nacrtaj stupčasti dijagram.",
   solution:"2 → 1, 3 → 3, 5 → 2, 7 → 1; četiri stupca tih visina"}
]}
];
