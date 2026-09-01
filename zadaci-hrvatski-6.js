/* Zadaci: Hrvatski jezik, gradivo 6. razreda.

   Cjeline slijede ishode iz Odluke o donosenju kurikuluma za nastavni predmet
   Hrvatski jezik za osnovne skole i gimnazije, NN 10/2019. Oznaka ishoda stoji
   u komentaru uz svaku cjelinu.

   Jezgra su OS HJ A.6.5 (promjenjive vrste rijeci: zamjenice, brojevi, glagolski
   oblici) i A.6.6 (jezicna raznolikost kroz povijest), uz pravopis. Knjizevni
   pojmovi (B.6.2) idu kao "izbor", a produktivni ishodi (A.6.1 govorenje,
   A.6.2 slusanje, A.6.3 citanje, A.6.4 pisanje) kao "note".

   NEPOKRIVENO automatskom provjerom: domena C (Kultura i mediji, C.6.1-C.6.3) i
   B.6.1, B.6.3, B.6.4. Ti ishodi trazu razgovor, posjet ili stvaralacki rad i ne
   svode se na polje za upis. Knjizevni "note" zadatak je u h6, produktivni u h8.

   Zadaci hrvatskoga ne koriste polje "oblik" -- provjera je po predmetu:
   veliko i malo slovo, dijakritika i zavrsni recenicni znak su bitni.
   Tipovi zadataka su opisani u READMEu.                                        */

const ZADACI_HRVATSKI_6 = [

/* OS HJ A.6.5 (zamjenice) */
{id:"h1", nav:"Zamjenice", title:"Zamjenice",
 lead:"Osobne, posvojne, povratna, povratno-posvojna, pokazne i upitne.", tasks:[
  {t:"izbor", q:"Koja je vrsta zamjenice?", items:[
    ["ja",    ["osobna","posvojna"],               "osobna"],
    ["moj",   ["posvojna","pokazna"],              "posvojna"],
    ["svoj",  ["povratno-posvojna","posvojna"],    "povratno-posvojna"],
    ["se",    ["povratna","osobna"],               "povratna"],
    ["ovaj",  ["pokazna","upitna"],                "pokazna"],
    ["koji",  ["upitna","pokazna"],                "upitna"]]},
  {t:"calc", q:"Upiši osobnu zamjenicu, malim slovom.", items:[
    ["prva osoba jednine",                  "ja"],
    ["druga osoba množine",                 "vi"],
    ["treća osoba množine, muški rod",      "oni"]]},
  {t:"izbor", q:"Koja zamjenica ispravno dopunjuje rečenicu?", items:[
    ["Ana je uzela ____ knjigu. (svoju vlastitu)",   ["svoju","njezinu"],  "svoju"],
    ["Ana je uzela ____ knjigu. (knjigu druge)",     ["njezinu","svoju"],  "njezinu"]]},
  {t:"note", q:"Napiši dvije rečenice: u prvoj upotrijebi posvojnu zamjenicu, u drugoj povratno-posvojnu. Objasni razliku.",
   solution:"posvojna kazuje čije je nešto, povratno-posvojna da pripada subjektu rečenice"}
]},

/* OS HJ A.6.5 (glavni i redni brojevi) */
{id:"h2", nav:"Brojevi", title:"Brojevi",
 lead:"Glavni i redni brojevi u govoru i pismu.", tasks:[
  {t:"izbor", q:"Je li broj glavni ili redni?", items:[
    ["pet",       ["glavni","redni"], "glavni"],
    ["peti",      ["redni","glavni"], "redni"],
    ["dvadeset",  ["glavni","redni"], "glavni"],
    ["treći",     ["redni","glavni"], "redni"]]},
  {t:"calc", q:"Upiši redni broj riječima, muški rod, malim slovom.", items:[
    ["3.",   "treći"],
    ["7.",   "sedmi"],
    ["12.",  "dvanaesti"]]},
  {t:"calc", q:"Upiši glavni broj riječima, malim slovom.", items:[
    ["15",  "petnaest"],
    ["40",  "četrdeset"],
    ["100", "sto"]]},
  {t:"note", q:"Napiši datum svojega rođenja tako da brojeve zapišeš riječima.",
   solution:"npr. dvanaesti svibnja dvije tisuće trinaeste"}
]},

/* OS HJ A.6.5 (glagolski oblici za vrijeme i nacin) */
{id:"h3", nav:"Glagolski oblici", title:"Glagolska vremena i načini",
 lead:"Aorist, imperfekt, pluskvamperfekt, futur II., imperativ i kondicional.", tasks:[
  {t:"izbor", q:"Koji je glagolski oblik?", items:[
    ["Pisaše pismo.",            ["imperfekt","aorist"],           "imperfekt"],
    ["Napisa pismo.",            ["aorist","imperfekt"],           "aorist"],
    ["Bio sam napisao pismo.",   ["pluskvamperfekt","perfekt"],    "pluskvamperfekt"],
    ["Piši!",                    ["imperativ","kondicional"],      "imperativ"],
    ["Pisao bih.",               ["kondicional","imperativ"],      "kondicional"]]},
  {t:"izbor", q:"Je li to glagolsko vrijeme ili glagolski način?", items:[
    ["perfekt",         ["vrijeme","način"], "vrijeme"],
    ["imperativ",       ["način","vrijeme"], "način"],
    ["futur I.",        ["vrijeme","način"], "vrijeme"],
    ["kondicional I.",  ["način","vrijeme"], "način"]]},
  {t:"calc", q:"Upiši imperativ, druga osoba jednine, malim slovom.", items:[
    ["pisati",  "piši"],
    ["čitati",  "čitaj"],
    ["doći",    "dođi"]]},
  {t:"izbor", q:"Koji je kondicional I., prva osoba jednine, muški rod?", items:[
    ["pisati",  ["pisao bih","pisat ću"], "pisao bih"],
    ["čitati",  ["čitao bih","čitat ću"], "čitao bih"]]},
  {t:"note", q:"Napiši istu rečenicu u imperativu i u kondicionalu I.: „Otvoriti prozor.”",
   solution:"Otvori prozor! / Otvorio bih prozor."}
]},

/* OS HJ A.6.5 (glagolska imenica, glagolski pridjev trpni, povratnost, prijelaznost) */
{id:"h4", nav:"Glagolski oblici II", title:"Glagolska imenica i glagolski pridjev trpni",
 lead:"Tvorba glagolske imenice i trpnoga pridjeva, povratni i prijelazni glagoli.", tasks:[
  {t:"calc", q:"Upiši glagolsku imenicu, malim slovom.", items:[
    ["pisati",  "pisanje"],
    ["čitati",  "čitanje"],
    ["učiti",   "učenje"]]},
  {t:"izbor", q:"Koji je glagolski pridjev trpni, muški rod jednine?", items:[
    ["pisati",  ["pisan","pisao"],     "pisan"],
    ["čitati",  ["čitan","čitao"],     "čitan"],
    ["kupiti",  ["kupljen","kupio"],   "kupljen"]]},
  {t:"izbor", q:"Je li glagol povratan?", items:[
    ["smijati se",  ["da","ne"], "da"],
    ["čitati",      ["ne","da"], "ne"],
    ["umivati se",  ["da","ne"], "da"]]},
  {t:"izbor", q:"Je li glagol prijelazan?", items:[
    ["čitati knjigu",  ["prijelazan","neprijelazan"], "prijelazan"],
    ["spavati",        ["neprijelazan","prijelazan"], "neprijelazan"]]},
  {t:"note", q:"Od glagola graditi napravi glagolsku imenicu i trpni pridjev, pa svaki upotrijebi u rečenici.",
   solution:"građenje, građen — npr. Građenje je trajalo godinu. Most je građen kamenom."}
]},

/* OS HJ A.6.5 (glasovne promjene i njihovo biljezenje), pravopis */
{id:"h5", nav:"Glasovi i pravopis", title:"Glasovne promjene i pravopis",
 lead:"Jotacija, jednačenja, vokalizacija i pravopisna pravila.", tasks:[
  {t:"izbor", q:"Koja je glasovna promjena provedena?", items:[
    ["nositi → nošenje",         ["jotacija","sibilarizacija"],                        "jotacija"],
    ["svatba → svadba",          ["jednačenje po zvučnosti","jotacija"],               "jednačenje po zvučnosti"],
    ["stanbeni → stambeni",      ["jednačenje po mjestu tvorbe","jednačenje po zvučnosti"], "jednačenje po mjestu tvorbe"],
    ["posal → posao",            ["vokalizacija","jotacija"],                          "vokalizacija"]]},
  {t:"izbor", q:"Koji je zapis točan?", items:[
    ["", ["je li","jeli"],                    "je li"],
    ["", ["Nova godina","nova Godina"],       "Nova godina"],
    ["", ["u redu","uredu"],                  "u redu"],
    ["", ["s njome","snjome"],                "s njome"]]},
  {t:"izbor", q:"Kako se piše?", items:[
    ["gra__evina",  ["građevina","gradjevina"], "građevina"],
    ["sre__a",      ["sreća","sreča"],          "sreća"],
    ["ma__ka",      ["mačka","maćka"],          "mačka"]]},
  {t:"calc", q:"Prepiši ispravno, s velikim početnim slovima.", items:[
    ["idemo na božić k baki.",              "Idemo na Božić k baki."],
    ["u petak putujemo u zadar.",           "U petak putujemo u Zadar."],
    ["čitam roman anđela vukovića.",        "Čitam roman Anđela Vukovića."]]},
  {t:"izbor", q:"Koji interpunkcijski znak tu stoji?", items:[
    ["nabrajanje se najavljuje ovim znakom: Kupili smo __ kruh, mlijeko i sir.",
     ["dvotočka","trotočka"],            "dvotočka"],
    ["izostavljeni dio rečenice označuje se ovim znakom",
     ["trotočka","dvotočka"],            "trotočka"],
    ["dva dijela rečenice koja su već puna zareza odvaja ovaj znak",
     ["točka sa zarezom","dvotočka"],    "točka sa zarezom"],
    ["dodatno objašnjenje u rečenici stavlja se u ovo",
     ["zagradu","navodnike"],            "zagradu"]]},
  {t:"izbor", q:"Kako se piše redni broj brojkom?", items:[
    ["treći dan",   ["3. dan","3 dan"],     "3. dan"],
    ["peti razred", ["5. razred","5 razred"], "5. razred"]]},
  {t:"note", q:"Napiši po jedan primjer za jotaciju i za jednačenje po zvučnosti i objasni što se u riječi promijenilo.",
   solution:"jotacija spaja suglasnik i j u novi glas; jednačenje po zvučnosti izjednačuje suglasnike po zvučnosti"}
]},

/* OS HJ B.6.2 (znacenje knjizevnoga teksta, pripovjedac, stih i strofa, dramski sukob) */
{id:"h6", nav:"Književni pojmovi", title:"Književni pojmovi",
 lead:"Pripovjedač, stih i strofa, ponavljanje glasova i dramski sukob.", tasks:[
  {t:"izbor", q:"U kojem je licu pripovjedač?", items:[
    ["Sjedio sam na klupi i gledao more.",  ["prvom","trećem"], "prvom"],
    ["Sjedio je na klupi i gledao more.",   ["trećem","prvom"], "trećem"]]},
  {t:"izbor", q:"Koji je to pojam?", items:[
    ["ponavljanje samoglasnika u stihu",              ["asonanca","aliteracija"],           "asonanca"],
    ["ponavljanje suglasnika u stihu",                ["aliteracija","asonanca"],           "aliteracija"],
    ["sukob koji nosi dramsku radnju",                ["dramski sukob","monolog"],          "dramski sukob"],
    ["ono o čemu tekst govori",                       ["tema","motiv"],                     "tema"],
    ["najmanja slika ili detalj u tekstu",            ["motiv","tema"],                     "motiv"]]},
  {t:"izbor", q:"Kojoj vrsti pripada tekst?", items:[
    ["pustolovni roman",  ["prozni","lirski"],   "prozni"],
    ["lirska pjesma",     ["lirski","dramski"],  "lirski"],
    ["dramski tekst",     ["dramski","prozni"],  "dramski"]]},
  {t:"calc", q:"Upiši broj riječima, malim slovom.", items:[
    ["koliko stihova ima dvostih",  "dva"],
    ["koliko stihova ima tercet",   "tri"]]},
  {t:"note", q:"Pročitaj kratku priču po izboru i zapiši: u kojem je licu pripovjedač, gdje i kada se radnja zbiva, i koji je glavni sukob.",
   solution:"odgovor ovisi o odabranoj priči"}
]},

/* OS HJ A.6.6 (jezicna raznolikost kroz hrvatsku povijest) */
{id:"h7", nav:"Jezik kroz povijest", title:"Hrvatski jezik kroz povijest",
 lead:"Trojezičnost, tropismenost i spomenici hrvatske pismenosti.", tasks:[
  {t:"izbor", q:"Odaberi točno.", items:[
    ["najstarije pismo hrvatske pismenosti",          ["glagoljica","latinica"],   "glagoljica"],
    ["pismo kojim danas pišemo hrvatski",             ["latinica","glagoljica"],   "latinica"]]},
  {t:"izbor", q:"Što je Bašćanska ploča?", items:[
    ["", ["spomenik pisan glagoljicom","prva hrvatska tiskana knjiga"], "spomenik pisan glagoljicom"]]},
  {t:"izbor", q:"Što je Prvotisak?", items:[
    ["", ["prva hrvatska tiskana knjiga, Misal iz 1483.","najstariji hrvatski kameni spomenik"],
         "prva hrvatska tiskana knjiga, Misal iz 1483."]]},
  {t:"izbor", q:"Koji jezici čine hrvatsku srednjovjekovnu trojezičnost?", items:[
    ["", ["staroslavenski, starohrvatski i latinski","hrvatski, njemački i talijanski"],
         "staroslavenski, starohrvatski i latinski"]]},
  {t:"izbor", q:"Koja pisma čine hrvatsku tropismenost?", items:[
    ["", ["glagoljica, hrvatska ćirilica i latinica","glagoljica, grčko i latinsko pismo"],
         "glagoljica, hrvatska ćirilica i latinica"]]},
  {t:"calc", q:"Upiši broj riječima, malim slovom.", items:[
    ["koliko pisama ima hrvatska tropismenost",  "tri"],
    ["koliko narječja ima hrvatski jezik",       "tri"]]},
  {t:"note", q:"Pronađi jedan spomenik hrvatske pismenosti i zapiši gdje je nastao, kojim je pismom pisan i iz kojega je stoljeća.",
   solution:"npr. Bašćanska ploča, otok Krk, glagoljica, oko 1100. godine"}
]},

/* OS HJ A.6.1 (govorenje), A.6.2 (slusanje), A.6.3 (citanje), A.6.4 (pisanje) --
   produktivni ishodi, za vjezbenicu i razgovor, bez automatske provjere */
{id:"h8", nav:"Govorenje i pisanje", title:"Govorenje, čitanje i pisanje",
 lead:"Uglavnom zadaci za vježbenicu i razgovor — ovdje se piše, ne ocjenjuje.", tasks:[
  {t:"calc", q:"Dopuni jednom riječju, malim slovom.", items:[
    ["Prije pisanja teksta izrađujemo __ pisanja.",  "plan"]]},
  {t:"note", q:"Izradi plan pisanja za opis osobe: što ćeš reći u uvodu, što u razradi, što u zaključku. Pa napiši tekst prema tom planu.",
   solution:"plan određuje redoslijed; opis ide od cjeline prema detalju"},
  {t:"note", q:"Pročitaj dva teksta o istoj temi iz različitih izvora, pa zapiši dva podatka koji se razlikuju i procijeni koji je izvor pouzdaniji.",
   solution:"usporedba podataka prema važnosti i pouzdanosti izvora"},
  {t:"note", q:"Poslušaj vijest na radiju ili televiziji, pa je sažmi u tri bilješke i objasni koja je glavna poruka.",
   solution:"bilješke nose ključne podatke, poruka je glavni smisao"},
  {t:"note", q:"Kratko izloži pred kućnima na temu koja te zanima, u tri do pet minuta. Pripremi tri točke o kojima ćeš govoriti.",
   solution:"izlaganje ima uvod, glavni dio i zaključak"}
]}
];
