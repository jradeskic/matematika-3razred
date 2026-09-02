/* Zadaci: Matematika, gradivo 7. razreda.

   Cjeline slijede ishode iz Odluke o donosenju kurikuluma za nastavni predmet
   Matematika za osnovne skole i gimnazije, NN 7/2019. Oznaka ishoda stoji u
   komentaru uz svaku cjelinu. Pokriveni su svi ishodi 7. razreda:
   A.7.1 (= D.7.6), A.7.2-A.7.5, B.7.1-B.7.4, C.7.1-C.7.3, D.7.1-D.7.5, E.7.1.

   Ono cega ovdje NEMA namjerno: Pitagorin poucak, kvadriranje i korjenovanje te
   sukladnost trokuta -- to nisu ishodi 7. razreda. Trokut i cetverokut obradeni
   su u 6. razredu, pa se ovdje pojavljuju samo unutar mnogokuta i povrsina.

   Polje "oblik" deklarira kako se odgovor provjerava:
     "broj"     cijeli ili decimalni broj, po vrijednosti (- i minus isti znak, , = .)
     "razlomak" po vrijednosti, egzaktnom racionalnom aritmetikom
     "popis"    razdvoji zarezom, svaki clan po pravilu broj, poredak bitan
     "tekst"    tocan zapis; dijakritika, veliko slovo i ² su bitni
   Tipovi zadataka su opisani u READMEu.

   Napomena o pi: zadaci s kruznicom i krugom racunaju s pribliznom vrijednoscu
   3,14, jer zapis "10π" nijedan od oblika provjere ne moze usporediti po
   vrijednosti. Rezultati su birani tako da izlaze na konacan decimalan zapis.

   Napomena o znanstvenom zapisu: koeficijent i eksponent se upisuju u odvojene
   zadatke, jer bi "4,5 · 10⁴" u jednom polju mijesalo decimalni zarez s
   razdjelnikom popisa.

   Napomena o algebarskim izrazima: oblik "tekst" usporeduje doslovno -- ne
   izjednacuje tipografski minus (−) s ASCII crticom kao sto to radi oblik
   "broj". Zato ti zadaci izricito traze upis bez razmaka (8a, 2x+6) i ne
   sadrze oduzimanje unutar zagrade.                            */

const ZADACI_MATEMATIKA_7 = [

/* MAT OS A.7.3 (zapisi racionalnih brojeva), A.7.4 (usporedivanje), D.7.1 (brojevni pravac) */
{id:"c1", nav:"Racionalni brojevi", title:"Zapisi i uspoređivanje racionalnih brojeva",
 lead:"Razlomak, decimalni zapis i postotak te uspoređivanje na brojevnom pravcu.", tasks:[
  {t:"calc", oblik:"broj", q:"Zapiši razlomak decimalnim brojem.",
   items:[["1/4","0,25"],["3/5","0,6"],["7/8","0,875"],["−1/2","-0,5"]]},
  {t:"calc", oblik:"razlomak", q:"Zapiši decimalni broj razlomkom, npr. 3/4.",
   items:[["0,5","1/2"],["0,25","1/4"],["1,2","6/5"],["−0,75","-3/4"]]},
  {t:"calc", oblik:"broj", q:"Zapiši postotak decimalnim brojem.",
   items:[["25 %","0,25"],["8 %","0,08"],["150 %","1,5"],["4 %","0,04"]]},
  {t:"calc", oblik:"tekst", q:"Upiši znak <span aria-hidden=\"true\">&lt;</span>, <span aria-hidden=\"true\">&gt;</span> ili =",
   items:[["−3,5 __ −3,05","<"],["1/2 __ 0,5","="],["−2/3 __ −3/4",">"],["0,7 __ 3/4","<"]]},
  {t:"calc", oblik:"broj", q:"Koji je broj točno na sredini između zadanih brojeva?",
   items:[["−2 i 4","1"],["0,2 i 0,4","0,3"],["−1 i 0","-0,5"]]},
  {t:"calc", oblik:"broj", q:"Kolika je apsolutna vrijednost broja?",
   items:[["−7","7"],["3,5","3,5"],["−0,4","0,4"]]},
  {t:"note", q:"Nacrtaj brojevni pravac i na njega ucrtaj −1,5; −1/2; 0,75 i 2.",
   solution:"redoslijed slijeva nadesno: −1,5; −0,5; 0,75; 2"}
]},

/* MAT OS A.7.5 (racunanje s racionalnim brojevima) */
{id:"c2", nav:"Računanje", title:"Računanje s racionalnim brojevima",
 lead:"Zbrajanje, oduzimanje, množenje i dijeljenje pozitivnih i negativnih brojeva.", tasks:[
  {t:"calc", oblik:"broj", q:"Izračunaj.",
   items:[["−7 + 12","5"],["−8 − 5","-13"],["(−4) · (−6)","24"],["(−36) : 9","-4"],
          ["15 − (−7)","22"],["(−5) · 8","-40"]]},
  {t:"calc", oblik:"razlomak", q:"Izračunaj i upiši razlomak, npr. 3/4.",
   items:[["1/2 + 1/3","5/6"],["3/4 − 1/6","7/12"],["2/3 · 3/5","2/5"],["4/5 : 2/5","2"]]},
  {t:"calc", oblik:"razlomak", q:"Izračunaj. Negativan razlomak zapiši npr. -1/4.",
   items:[["−1/2 + 1/4","-1/4"],["−2/3 · 3/4","-1/2"],["1/3 − 5/6","-1/2"]]},
  {t:"calc", oblik:"broj", q:"Izračunaj s decimalnim brojevima.",
   items:[["2,5 + (−1,75)","0,75"],["−3,2 · 5","-16"],["−7,5 : (−2,5)","3"],["0,6 · 0,5","0,3"]]},
  {t:"calc", oblik:"broj", q:"Izračunaj poštujući redoslijed operacija.",
   items:[["−3 + 4 · (−2)","-11"],["(−2)·(−3) − 10","-4"],["12 : (−4) + 5","2"]]},
  {t:"note", q:"Objasni zašto je umnožak dvaju negativnih brojeva pozitivan, na primjeru (−2) · (−3).",
   solution:"to je suprotan broj od (−2) · 3 = −6, dakle 6"}
]},

/* MAT OS A.7.1 = D.7.6 (postotni racun) */
{id:"c3", nav:"Postotak", title:"Postotni račun",
 lead:"Postotni iznos, postotak i osnovna vrijednost te sniženje i poskupljenje.", tasks:[
  {t:"calc", oblik:"broj", q:"Izračunaj postotni iznos.",
   items:[["25 % od 80","20"],["40 % od 250","100"],["7 % od 400","28"],["120 % od 50","60"]]},
  {t:"calc", oblik:"broj", q:"Koliki je postotak? Odgovori brojem, bez znaka %.",
   items:[["15 od 60","25"],["9 od 36","25"],["30 od 40","75"],["8 od 200","4"]]},
  {t:"calc", oblik:"broj", q:"Odredi osnovnu vrijednost.",
   items:[["20 % nekog broja je 14","70"],["5 % nekog broja je 3","60"],
          ["150 % nekog broja je 45","30"]]},
  {t:"calc", oblik:"broj", q:"Riješi zadatak. Odgovori brojem eura.",
   items:[["Cijena je 200 €, sniženje je 15 %. Kolika je nova cijena?","170"],
          ["Cijena je 80 €, poskupljenje je 25 %. Kolika je nova cijena?","100"],
          ["Cijena je 60 €, sniženje je 50 %, pa još 10 % na sniženu cijenu. Kolika je konačna cijena?","27"]]},
  {t:"izbor", q:"Što je veće?", items:[
    ["10 % od 200 ili 20 % od 90", ["10 % od 200","20 % od 90"], "10 % od 200"],
    ["1 % od 1000 ili 50 % od 18", ["1 % od 1000","50 % od 18"], "1 % od 1000"]]},
  {t:"note", q:"Cijena je najprije poskupjela 20 %, pa je snižena 20 %. Je li se vratila na početnu?",
   solution:"nije — 100 → 120 → 96, jer se drugi postotak računa od veće vrijednosti"}
]},

/* MAT OS A.7.2 (znanstveni zapis broja) */
{id:"c4", nav:"Znanstveni zapis", title:"Znanstveni zapis broja",
 lead:"Potencije baze 10, predmetci mjernih jedinica i zapis a · 10ᵏ.", tasks:[
  {t:"calc", oblik:"broj", q:"Zapiši kao potenciju broja 10 — upiši samo eksponent.",
   items:[["1000","3"],["1 000 000","6"],["0,01","-2"],["0,001","-3"],["1","0"]]},
  {t:"calc", oblik:"broj", q:"U znanstvenom zapisu a · 10ᵏ upiši koeficijent a.",
   items:[["45 000","4,5"],["320","3,2"],["0,0072","7,2"],["6 100 000","6,1"]]},
  {t:"calc", oblik:"broj", q:"U znanstvenom zapisu a · 10ᵏ upiši eksponent k.",
   items:[["45 000","4"],["320","2"],["0,0072","-3"],["6 100 000","6"]]},
  {t:"calc", oblik:"broj", q:"Koji je eksponent baze 10 uz predmetak? Upiši broj.",
   items:[["kilo","3"],["mega","6"],["centi","-2"],["mili","-3"]]},
  {t:"calc", oblik:"broj", q:"Zapiši običnim brojem. Upiši bez razmaka.",
   items:[["2 · 10³","2000"],["5,1 · 10²","510"],["3 · 10⁻²","0,03"],["7 · 10⁻¹","0,7"]]},
  {t:"note", q:"Zapiši u znanstvenom zapisu udaljenost Zemlje od Sunca, oko 150 000 000 km.",
   solution:"1,5 · 10⁸ km"}
]},

/* MAT OS B.7.1 (algebarski izrazi u Q) */
{id:"c5", nav:"Algebarski izrazi", title:"Algebarski izrazi",
 lead:"Monom i binom, pojednostavnjivanje izraza i računanje vrijednosti.", tasks:[
  {t:"izbor", q:"Je li izraz monom ili binom?", items:[
    ["3a",      ["monom","binom"], "monom"],
    ["2x + 5",  ["binom","monom"], "binom"],
    ["−4xy",    ["monom","binom"], "monom"],
    ["a − b",   ["binom","monom"], "binom"]]},
  {t:"calc", oblik:"tekst", q:"Pojednostavni izraz. Upiši bez razmaka, npr. 8a.",
   items:[["3a + 5a","8a"],["7x − 2x","5x"],["4y + y","5y"],["2a · 3a","6a²"]]},
  {t:"calc", oblik:"tekst", q:"Pomnoži i pojednostavni. Upiši bez razmaka, npr. 2x+6.",
   items:[["2(x + 3)","2x+6"],["3(x + 4)","3x+12"],["a(a + 1)","a²+a"]]},
  {t:"calc", oblik:"broj", q:"Izračunaj vrijednost izraza za x = 2.",
   items:[["3x + 4","10"],["5 − 2x","1"],["2x + 3x","10"],["x · x − 1","3"]]},
  {t:"calc", oblik:"broj", q:"Za a = −1 i b = 3 izračunaj vrijednost izraza.",
   items:[["2a + b","1"],["a · b","-3"],["a · a + b","4"],["3b − 2a","11"]]},
  {t:"note", q:"Pomnoži binom binomom: (x + 2)(x + 3) i objasni svaki korak.",
   solution:"x² + 3x + 2x + 6 = x² + 5x + 6"}
]},

/* MAT OS B.7.2 (linearna jednadzba) */
{id:"c6", nav:"Jednadžbe", title:"Linearne jednadžbe",
 lead:"Rješavanje jednadžbi s jednom nepoznanicom i zadaci riječima.", tasks:[
  {t:"calc", oblik:"broj", q:"Riješi jednadžbu — upiši x.",
   items:[["3x + 5 = 20","5"],["4x − 7 = 13","5"],["2x + 3 = x + 9","6"],
          ["5(x − 2) = 15","5"],["7 − 2x = 1","3"]]},
  {t:"calc", oblik:"broj", q:"Riješi jednadžbu — upiši x.",
   items:[["−3x = 12","-4"],["x + 8 = 2","-6"],["4x + 10 = 2x − 4","-7"],["0,5x = 3","6"]]},
  {t:"calc", oblik:"razlomak", q:"Riješi jednadžbu — rješenje upiši kao razlomak.",
   items:[["6x = 4","2/3"],["2x = 5","5/2"],["3x + 1 = 3","2/3"]]},
  {t:"calc", oblik:"broj", q:"Postavi jednadžbu i riješi. Odgovori brojem.",
   items:[["Zamislio sam broj, uvećao ga za 8 i dobio 23. Koji je broj?","15"],
          ["Trostruki broj umanjen za 4 iznosi 20. Koji je broj?","8"],
          ["Otac ima 40 godina, sin 10. Za koliko će godina otac biti dvostruko stariji od sina?","20"]]},
  {t:"note", q:"Provjeri je li x = 5 rješenje jednadžbe 3x + 5 = 20 i zapiši provjeru.",
   solution:"3 · 5 + 5 = 20, lijeva i desna strana su jednake"}
]},

/* MAT OS B.7.3 (proporcionalnost), B.7.4 (linearna ovisnost), D.7.2 (koordinatni sustav) */
{id:"c7", nav:"Proporcionalnost", title:"Proporcionalnost i linearna ovisnost",
 lead:"Omjer i razmjer, upravna i obrnuta proporcionalnost te točke i grafovi.", tasks:[
  {t:"calc", oblik:"razlomak", q:"Skrati omjer i upiši ga kao razlomak, npr. 2/3.",
   items:[["12 : 18","2/3"],["25 : 15","5/3"],["40 : 100","2/5"],["36 : 24","3/2"]]},
  {t:"calc", oblik:"broj", q:"Odredi nepoznati član razmjera.",
   items:[["3 : 4 = x : 20","15"],["x : 6 = 10 : 12","5"],["5 : x = 15 : 9","3"],
          ["8 : 12 = 6 : x","9"]]},
  {t:"calc", oblik:"broj", q:"Riješi zadatak. Odgovori brojem.",
   items:[["4 bilježnice stoje 12 €. Koliko eura stoji 7 bilježnica?","21"],
          ["6 radnika posao završi za 10 dana. Za koliko dana ga završi 12 radnika?","5"],
          ["Auto na 100 km potroši 6 l. Koliko litara potroši na 250 km?","15"]]},
  {t:"izbor", q:"Jesu li veličine upravno ili obrnuto proporcionalne?", items:[
    ["broj bilježnica i ukupna cijena",  ["upravno","obrnuto"], "upravno"],
    ["brzina i vrijeme na istom putu",   ["obrnuto","upravno"], "obrnuto"],
    ["broj radnika i vrijeme rada",      ["obrnuto","upravno"], "obrnuto"]]},
  {t:"izbor", q:"U kojem je kvadrantu točka?", items:[
    ["T(3, 5)",     ["I.","II."],   "I."],
    ["T(−2, 4)",    ["II.","III."], "II."],
    ["T(−3, −1,5)", ["III.","IV."], "III."],
    ["T(5, −2)",    ["IV.","I."],   "IV."]]},
  {t:"calc", oblik:"broj", q:"Za y = 3x izračunaj y.",
   items:[["x = 4","12"],["x = −2","-6"],["x = 0,5","1,5"]]},
  {t:"calc", oblik:"broj", q:"Za y = 2x + 1 izračunaj traženu vrijednost.",
   items:[["y ako je x = 3","7"],["y ako je x = −1","-1"],["x ako je y = 9","4"]]},
  {t:"note", q:"Nacrtaj graf ovisnosti y = 2x za x od −2 do 2 i objasni zašto je to pravac kroz ishodište.",
   solution:"svakom x pripada dvostruko veći y, pa je ovisnost upravno proporcionalna"}
]},

/* MAT OS C.7.1 (mnogokuti), C.7.2 (vektori), C.7.3 (translacija) */
{id:"c8", nav:"Mnogokut i translacija", title:"Mnogokuti, vektori i translacija",
 lead:"Kutovi i dijagonale mnogokuta, svojstva vektora i pomak za zadani vektor.", tasks:[
  {t:"calc", oblik:"broj", q:"Koliki je zbroj unutarnjih kutova? Odgovori brojem stupnjeva.",
   items:[["trokut","180"],["četverokut","360"],["peterokut","540"],["šesterokut","720"]]},
  {t:"calc", oblik:"broj", q:"Koliko dijagonala ima mnogokut? Odgovori brojem.",
   items:[["četverokut","2"],["peterokut","5"],["šesterokut","9"],["osmerokut","20"]]},
  {t:"calc", oblik:"broj", q:"Koliki je unutarnji kut pravilnog mnogokuta? Odgovori brojem stupnjeva.",
   items:[["pravilni četverokut","90"],["pravilni peterokut","108"],["pravilni šesterokut","120"]]},
  {t:"izbor", q:"Kakvi su to vektori?", items:[
    ["iste duljine, istoga smjera i iste orijentacije",      ["jednaki","suprotni"],  "jednaki"],
    ["iste duljine i smjera, ali suprotne orijentacije",     ["suprotni","jednaki"],  "suprotni"],
    ["vektor kojemu je početak jednak kraju",                ["nulvektor","jedinični"], "nulvektor"]]},
  {t:"calc", oblik:"popis", q:"Translatiraj točku za zadani vektor — upiši nove koordinate, x pa y, odvojene zarezom.",
   items:[["T(2, 3) za vektor (4, −1)","6,2"],
          ["T(−1, 5) za vektor (3, 2)","2,7"],
          ["T(0, 0) za vektor (−2, −3)","-2,-3"]]},
  {t:"calc", oblik:"popis", q:"Zbroji vektore — upiši koordinate zbroja, x pa y, odvojene zarezom.",
   items:[["(2, 3) + (1, −1)","3,2"],["(−4, 0) + (4, 5)","0,5"]]},
  {t:"izbor", q:"Što translacija mijenja liku?", items:[
    ["", ["samo položaj","položaj i veličinu"], "samo položaj"]]},
  {t:"note", q:"Nacrtaj trokut ABC i translatiraj ga za vektor (3, 2). Usporedi stranice izvornika i slike.",
   solution:"stranice su jednake duljine — translacija čuva oblik i veličinu"}
]},

/* MAT OS D.7.3 (opseg i povrsina mnogokuta), D.7.4 (krug), D.7.5 (mjerne jedinice) */
{id:"c9", nav:"Opseg i površina", title:"Opseg, površina i mjerne jedinice",
 lead:"Površine mnogokuta, opseg i površina kruga te preračunavanje jedinica.", tasks:[
  {t:"calc", oblik:"broj", q:"Izračunaj površinu. Odgovori brojem kvadratnih centimetara.",
   items:[["pravokutnik a = 12 cm, b = 7 cm","84"],
          ["kvadrat a = 9 cm","81"],
          ["trokut a = 10 cm, v = 6 cm","30"],
          ["paralelogram a = 8 cm, v = 5 cm","40"]]},
  {t:"calc", oblik:"broj", q:"Izračunaj površinu trapeza. Odgovori brojem kvadratnih centimetara.",
   items:[["a = 10 cm, c = 6 cm, v = 4 cm","32"],["a = 12 cm, c = 8 cm, v = 5 cm","50"]]},
  {t:"calc", oblik:"broj", q:"Izračunaj opseg kruga za π ≈ 3,14. Odgovori brojem centimetara.",
   items:[["r = 5 cm","31,4"],["r = 10 cm","62,8"],["r = 2 cm","12,56"]]},
  {t:"calc", oblik:"broj", q:"Izračunaj površinu kruga za π ≈ 3,14. Odgovori brojem kvadratnih centimetara.",
   items:[["r = 5 cm","78,5"],["r = 2 cm","12,56"],["r = 10 cm","314"]]},
  {t:"calc", oblik:"broj", q:"Preračunaj. Odgovori brojem bez razmaka.",
   items:[["koliko cm² je 3 dm²","300"],["koliko m² je 25 000 cm²","2,5"],
          ["koliko cm³ je 2 dm³","2000"],["koliko minuta ima 2,5 sata","150"],
          ["koliko lučnih minuta ima kut od 2°","120"]]},
  {t:"izbor", q:"Što je dio kružnice, a što dio kruga?", items:[
    ["luk",     ["dio kružnice","dio kruga"], "dio kružnice"],
    ["isječak", ["dio kruga","dio kružnice"], "dio kruga"]]},
  {t:"note", q:"Objasni razliku između kružnice i kruga i navedi formulu za opseg i za površinu.",
   solution:"kružnica je linija (O = 2rπ), krug je linija s unutrašnjošću (P = r²π)"}
]},

/* MAT OS E.7.1 (dijagram relativnih frekvencija) */
{id:"c10", nav:"Podaci", title:"Podaci i relativne frekvencije",
 lead:"Frekvencija, relativna frekvencija i čitanje dijagrama.", tasks:[
  {t:"calc", oblik:"broj", q:"U razredu je 25 učenika: 10 dolazi biciklom, 10 pješice, 5 autobusom. Odgovori brojem.",
   items:[["frekvencija dolazaka biciklom","10"],
          ["relativna frekvencija bicikla kao decimalni broj","0,4"],
          ["relativna frekvencija autobusa u postotcima","20"],
          ["relativna frekvencija pješice u postotcima","40"]]},
  {t:"calc", oblik:"broj", q:"Od 200 ispitanika njih 50 voli ljeto. Odgovori brojem.",
   items:[["relativna frekvencija kao decimalni broj","0,25"],
          ["relativna frekvencija u postotcima","25"],
          ["koliko ih ne voli ljeto","150"]]},
  {t:"calc", oblik:"broj", q:"Ocjene su 5, 4, 4, 3, 5, 5, 2, 4. Odgovori brojem.",
   items:[["koliko je ukupno ocjena","8"],
          ["frekvencija ocjene 5","3"],
          ["relativna frekvencija ocjene 4 u postotcima","37,5"],
          ["kolika je prosječna ocjena","4"]]},
  {t:"izbor", q:"Koliki je zbroj svih relativnih frekvencija?", items:[
    ["", ["1 odnosno 100 %","ovisi o broju podataka"], "1 odnosno 100 %"]]},
  {t:"note", q:"Provedi anketu u razredu i prikaži rezultate stupčastim dijagramom relativnih frekvencija.",
   solution:"visina stupca je relativna frekvencija, zbroj svih stupaca je 100 %"}
]}
];
