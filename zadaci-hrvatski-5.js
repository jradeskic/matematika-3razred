/* Zadaci: Hrvatski jezik, gradivo 5. razreda.

   Cjeline slijede ishode iz Odluke o donosenju kurikuluma za nastavni predmet
   Hrvatski jezik za osnovne skole i gimnazije, NN 10/2019. Oznaka ishoda stoji
   u komentaru uz svaku cjelinu.

   Jezgra su OS HJ A.5.5 (promjenjive i nepromjenjive rijeci) i pravopis, jer se
   ondje odgovor tocno provjerava. Knjizevni pojmovi (B.5.2) idu kao "izbor", a
   produktivni ishodi (A.5.1 govorenje, A.5.2 slusanje, A.5.3 citanje,
   A.5.4 pisanje) kao "note" -- zadaci za vjezbenicu, bez ocjenjivanja.

   NEPOKRIVENO automatskom provjerom: domena C (Kultura i mediji, C.5.1-C.5.3) i
   B.5.1, B.5.3, B.5.4. Ti ishodi trazu razgovor, posjet ili stvaralacki rad i ne
   svode se na polje za upis. Dio ih je zahvacen kroz "note" zadatke u h8.

   Zadaci hrvatskoga ne koriste polje "oblik" -- provjera je po predmetu:
   veliko i malo slovo, dijakritika i zavrsni recenicni znak su bitni.
   Tipovi zadataka su opisani u READMEu.                                        */

const ZADACI_HRVATSKI_5 = [

/* OS HJ A.5.5 (vrste rijeci, promjenjivost) */
{id:"h1", nav:"Vrste riječi", title:"Vrste riječi",
 lead:"Promjenjive i nepromjenjive riječi u rečenici.", tasks:[
  {t:"izbor", q:"Koja je vrsta riječi?", items:[
    ["knjiga", ["imenica","glagol"],     "imenica"],
    ["čitati", ["glagol","pridjev"],     "glagol"],
    ["velik",  ["pridjev","prilog"],     "pridjev"],
    ["brzo",   ["prilog","imenica"],     "prilog"],
    ["ispod",  ["prijedlog","veznik"],   "prijedlog"],
    ["ali",    ["veznik","prijedlog"],   "veznik"],
    ["ja",     ["zamjenica","imenica"],  "zamjenica"],
    ["tri",    ["broj","pridjev"],       "broj"]]},
  {t:"izbor", q:"Je li riječ promjenjiva ili nepromjenjiva?", items:[
    ["kuća",   ["promjenjiva","nepromjenjiva"], "promjenjiva"],
    ["jučer",  ["nepromjenjiva","promjenjiva"], "nepromjenjiva"],
    ["pisati", ["promjenjiva","nepromjenjiva"], "promjenjiva"],
    ["i",      ["nepromjenjiva","promjenjiva"], "nepromjenjiva"]]},
  {t:"calc", q:"Upiši glagol iz rečenice.", items:[
    ["Marko čita knjigu.",    "čita"],
    ["Djeca trče po parku.",  "trče"],
    ["Vlak polazi u osam.",   "polazi"]]},
  {t:"note", q:"Napiši rečenicu u kojoj su barem jedna imenica, jedan glagol, jedan pridjev i jedan prilog. Označi ih.",
   solution:"npr. Mala djevojčica pažljivo čita knjigu. — pridjev, imenica, prilog, glagol, imenica"}
]},

/* OS HJ A.5.5 (imenice, pridjevi, stupnjevanje, rod) */
{id:"h2", nav:"Imenice i pridjevi", title:"Imenice i pridjevi",
 lead:"Opće i vlastite imenice, vrste pridjeva i stupnjevanje.", tasks:[
  {t:"izbor", q:"Je li imenica opća ili vlastita?", items:[
    ["grad",   ["opća","vlastita"], "opća"],
    ["Zagreb", ["vlastita","opća"], "vlastita"],
    ["rijeka", ["opća","vlastita"], "opća"],
    ["Sava",   ["vlastita","opća"], "vlastita"]]},
  {t:"izbor", q:"Koja je vrsta pridjeva?", items:[
    ["drveni stol",    ["gradivni","opisni"],     "gradivni"],
    ["Anin šal",       ["posvojni","opisni"],     "posvojni"],
    ["visoka kuća",    ["opisni","gradivni"],     "opisni"],
    ["zlatni prsten",  ["gradivni","posvojni"],   "gradivni"]]},
  {t:"izbor", q:"Koji je rod imenice?", items:[
    ["stol",   ["muški","ženski"],   "muški"],
    ["knjiga", ["ženski","srednji"], "ženski"],
    ["selo",   ["srednji","muški"],  "srednji"]]},
  {t:"calc", q:"Upiši komparativ pridjeva.", items:[
    ["visok",  "viši"],
    ["jak",    "jači"],
    ["lijep",  "ljepši"]]},
  {t:"calc", q:"Upiši superlativ pridjeva.", items:[
    ["visok",  "najviši"],
    ["dobar",  "najbolji"],
    ["mali",   "najmanji"]]},
  {t:"note", q:"Napiši tri imenice iz svoje sobe i uz svaku jedan opisni pridjev.",
   solution:"npr. drveni stol, mekana deka, velik prozor"}
]},

/* OS HJ A.5.5 (glagolska vremena, infinitiv, pomocni glagoli) */
{id:"h3", nav:"Glagolska vremena", title:"Glagolska vremena",
 lead:"Prezent, perfekt i futur I., infinitiv i pomoćni glagoli.", tasks:[
  {t:"izbor", q:"U kojem je vremenu glagol?", items:[
    ["Čitao sam knjigu.",   ["perfekt","prezent"],  "perfekt"],
    ["Čitam knjigu.",       ["prezent","futur"],    "prezent"],
    ["Čitat ću knjigu.",    ["futur","perfekt"],    "futur"],
    ["Pisali smo zadaću.",  ["perfekt","prezent"],  "perfekt"],
    ["Doći ćemo sutra.",    ["futur","prezent"],    "futur"]]},
  {t:"calc", q:"Upiši glagol u prezentu, prva osoba jednine (ja …).", items:[
    ["pisati",  "pišem"],
    ["trčati",  "trčim"],
    ["čitati",  "čitam"]]},
  {t:"calc", q:"Upiši infinitiv glagola.", items:[
    ["pišem",  "pisati"],
    ["trčim",  "trčati"],
    ["radim",  "raditi"]]},
  {t:"izbor", q:"Koji je pomoćni glagol u rečenici?", items:[
    ["Ana je pjevala.",   ["je","pjevala"],   "je"],
    ["Mi ćemo doći.",     ["ćemo","doći"],    "ćemo"],
    ["Oni su otišli.",    ["su","otišli"],    "su"]]},
  {t:"calc", q:"Upiši glagolski pridjev radni (muški rod jednine).", items:[
    ["pisati",  "pisao"],
    ["čitati",  "čitao"],
    ["doći",    "došao"]]},
  {t:"note", q:"Napiši istu rečenicu u prezentu, perfektu i futuru I.: „Idem u knjižnicu.”",
   solution:"Idem u knjižnicu. / Išao sam u knjižnicu. / Ići ću u knjižnicu."}
]},

/* OS HJ A.5.5 (padezi kao razliciti oblici iste rijeci) */
{id:"h4", nav:"Padeži", title:"Padeži",
 lead:"Padeži kao različiti oblici iste riječi i pitanja na koja odgovaraju.", tasks:[
  {t:"izbor", q:"U kojem je padežu riječ u zagradi?", items:[
    ["Ovo je kuća. (kuća)",         ["nominativ","genitiv"],       "nominativ"],
    ["Nema kuće. (kuće)",           ["genitiv","dativ"],           "genitiv"],
    ["Idem kući. (kući)",           ["dativ","lokativ"],           "dativ"],
    ["Vidim kuću. (kuću)",          ["akuzativ","nominativ"],      "akuzativ"],
    ["Govorim o kući. (kući)",      ["lokativ","instrumental"],    "lokativ"],
    ["Idem s Anom. (Anom)",         ["instrumental","dativ"],      "instrumental"]]},
  {t:"calc", q:"Upiši ime padeža koji odgovara na ta pitanja.", items:[
    ["Koga? Čega?",   "genitiv"],
    ["Komu? Čemu?",   "dativ"],
    ["Koga? Što?",    "akuzativ"],
    ["Kim? Čim?",     "instrumental"]]},
  {t:"calc", q:"Upiši imenicu knjiga u zadanom padežu jednine.", items:[
    ["genitiv",       "knjige"],
    ["dativ",         "knjizi"],
    ["akuzativ",      "knjigu"]]},
  {t:"note", q:"Sklanjaj imenicu prijatelj kroz svih sedam padeža jednine.",
   solution:"prijatelj, prijatelja, prijatelju, prijatelja, prijatelju, prijatelju, prijateljem"}
]},

/* OS HJ A.5.5 (glasovne promjene i njihovo biljezenje), pravopis */
{id:"h5", nav:"Glasovi i pravopis", title:"Glasovne promjene i pravopis",
 lead:"Ije i je, č i ć, glasovne promjene, veliko početno slovo.", tasks:[
  {t:"izbor", q:"Kako se piše?", items:[
    ["ml__ko",  ["mlijeko","mljeko"], "mlijeko"],
    ["l__po",   ["lijepo","ljepo"],   "lijepo"],
    ["cv__t",   ["cvijet","cvjet"],   "cvijet"],
    ["dj__ca",  ["djeca","dijeca"],   "djeca"]]},
  {t:"izbor", q:"Č ili Ć?", items:[
    ["u__enik",  ["učenik","ućenik"], "učenik"],
    ["no__",     ["noć","noč"],       "noć"],
    ["pla__a",   ["plaća","plača"],   "plaća"],
    ["klju__",   ["ključ","kljuć"],   "ključ"]]},
  {t:"izbor", q:"Koja je glasovna promjena provedena?", items:[
    ["ruka → ruci",     ["sibilarizacija","palatalizacija"], "sibilarizacija"],
    ["junak → junače",  ["palatalizacija","sibilarizacija"], "palatalizacija"]]},
  {t:"izbor", q:"Koji je zapis točan?", items:[
    ["", ["neću","ne ću"],       "neću"],
    ["", ["ne znam","neznam"],   "ne znam"],
    ["", ["s njim","snjim"],     "s njim"]]},
  {t:"calc", q:"Prepiši ispravno, s velikim početnim slovima.", items:[
    ["u zagrebu smo bili prošlo ljeto.",      "U Zagrebu smo bili prošlo ljeto."],
    ["moj prijatelj marko živi u splitu.",    "Moj prijatelj Marko živi u Splitu."],
    ["čitamo roman ivane brlić-mažuranić.",   "Čitamo roman Ivane Brlić-Mažuranić."]]},
  {t:"note", q:"Napiši tri riječi s ije i tri riječi s je, pa objasni razliku.",
   solution:"ije je dugi odraz jata (mlijeko, cvijet, lijep), je kratki (djeca, mjesto, vjera)"}
]},

/* OS HJ B.5.2 (temeljna zanrovska obiljezja knjizevnoga teksta) */
{id:"h6", nav:"Književni pojmovi", title:"Književni pojmovi",
 lead:"Lirsko, prozno i dramsko; stih, strofa, rima i stilska sredstva.", tasks:[
  {t:"izbor", q:"Kojoj vrsti teksta to pripada?", items:[
    ["pjesma u stihovima i strofama",                     ["lirski","dramski"],  "lirski"],
    ["tekst s dijalozima i didaskalijama, za izvedbu",    ["dramski","prozni"],  "dramski"],
    ["pripovijedanje o događajima u odlomcima",           ["prozni","lirski"],   "prozni"]]},
  {t:"izbor", q:"Koji je to pojam?", items:[
    ["red u pjesmi",                              ["stih","strofa"],          "stih"],
    ["skupina stihova",                           ["strofa","rima"],          "strofa"],
    ["podudaranje glasova na kraju stihova",      ["rima","ritam"],           "rima"],
    ["razgovor dvaju ili više likova",            ["dijalog","monolog"],      "dijalog"],
    ["govor jednoga lika",                        ["monolog","dijalog"],      "monolog"],
    ["upute za izvedbu u dramskome tekstu",       ["didaskalije","dijalog"],  "didaskalije"]]},
  {t:"izbor", q:"Koje je jezično-stilsko sredstvo?", items:[
    ["bijeli snijeg",   ["epitet","usporedba"],  "epitet"],
    ["brz kao vjetar",  ["usporedba","epitet"],  "usporedba"]]},
  {t:"calc", q:"Upiši broj riječima.", items:[
    ["koliko stihova ima strofa od četiri reda",  "četiri"]]},
  {t:"note", q:"Pročitaj pjesmu po izboru i zapiši: koliko ima strofa, koliko stihova u prvoj strofi i pronađi jedan epitet.",
   solution:"odgovor ovisi o odabranoj pjesmi"}
]},

/* OS HJ A.5.6 (jezicna raznolikost hrvatskoga jezika) */
{id:"h7", nav:"Jezična raznolikost", title:"Jezična raznolikost",
 lead:"Standardni jezik, narječja i mjesni govor.", tasks:[
  {t:"izbor", q:"Kojemu narječju pripada rečenica?", items:[
    ["Kaj delaš?",    ["kajkavskomu","čakavskomu"],   "kajkavskomu"],
    ["Ča je to?",     ["čakavskomu","štokavskomu"],   "čakavskomu"],
    ["Što radiš?",    ["štokavskomu","kajkavskomu"],  "štokavskomu"]]},
  {t:"izbor", q:"Je li rečenica na hrvatskome standardnom jeziku?", items:[
    ["Idem u školu.",   ["da","ne"], "da"],
    ["Kam greš?",       ["ne","da"], "ne"],
    ["Danas je lijepo.",["da","ne"], "da"]]},
  {t:"calc", q:"Odgovori jednom riječju.", items:[
    ["koje je pismo službeno u Republici Hrvatskoj",  "latinica"],
    ["koliko hrvatski jezik ima narječja",            "tri"]]},
  {t:"note", q:"Zapiši tri riječi iz svojega mjesnoga govora i uz svaku napiši riječ hrvatskoga standardnog jezika.",
   solution:"odgovor ovisi o mjestu"}
]},

/* OS HJ A.5.1 (govorenje), A.5.2 (slusanje), A.5.3 (citanje), A.5.4 (pisanje) --
   produktivni ishodi, za vjezbenicu i razgovor, bez automatske provjere */
{id:"h8", nav:"Govorenje i pisanje", title:"Govorenje, čitanje i pisanje",
 lead:"Zadaci za vježbenicu i razgovor — ovdje se ne ocjenjuje, ovdje se piše.", tasks:[
  {t:"calc", q:"Dopuni.", items:[
    ["Tekst trodijelne strukture ima uvod, razradu i __",  "zaključak"]]},
  {t:"note", q:"Napiši sastavak trodijelne strukture na temu „Dan koji ću pamtiti”. Uvod, razrada, zaključak — svaki dio u svojem odlomku.",
   solution:"uvod uvodi u temu, razrada nosi događaje, zaključak zaokružuje"},
  {t:"note", q:"Pročitaj kratak članak iz novina ili s interneta, pa napiši tri ključne riječi i jednu rečenicu koja sažima o čemu je tekst.",
   solution:"ključne riječi nose glavni sadržaj, sažetak je jedna rečenica"},
  {t:"note", q:"Opiši svoju ulicu tako da je može zamisliti i onaj tko je nikad nije vidio. Piši u tri do pet rečenica.",
   solution:"opis ide redom promatranja, od cjeline prema detalju"},
  {t:"note", q:"Naglas ispričaj ukućanima što se dogodilo u školi, kronološki: prvo, zatim, na kraju.",
   solution:"pripovijedanje niže događaje po redu kojim su se zbili"}
]}
];
