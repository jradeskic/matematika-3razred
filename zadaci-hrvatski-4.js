/* Zadaci: Hrvatski jezik, gradivo 4. razreda.

   Cjeline slijede ishode iz Odluke o donosenju kurikuluma nastavnoga predmeta
   Hrvatski jezik za osnovne skole i gimnazije, NN 10/2019. Oznaka ishoda stoji
   u komentaru uz svaku cjelinu.

   Jezgra je OS HJ A.4.5, ciji je tekst ishoda "oblikuje tekst primjenjujuci
   znanja o imenicama, glagolima i pridjevima uvazavajuci gramaticka i
   pravopisna pravila" -- ondje se odgovor tocno provjerava. A.4.6 (zavicajni
   govor i standardni jezik) i B.4.2 (obiljezja knjizevnoga teksta) idu kao
   "izbor", a produktivni ishodi (A.4.1 govorenje, A.4.2 slusanje, A.4.3
   citanje, A.4.4 pisanje) kao "note" -- zadaci za vjezbenicu, bez ocjenjivanja.

   Ono cega ovdje NEMA namjerno: padezi i sklonidba. To nisu sadrzaji 4.
   razreda -- padezi dolaze u predmetnoj nastavi.

   NEPOKRIVENO automatskom provjerom: domena C (Kultura i mediji, C.4.1, C.4.2)
   i stvaralacki ishodi B.4.1, B.4.3, B.4.4. Ti ishodi trazu razgovor, citanje
   lektire ili stvaralacki rad i ne svode se na polje za upis. Dio je zahvacen
   "note" zadacima u h9.

   Zadaci hrvatskoga ne koriste polje "oblik" -- provjera je po predmetu:
   veliko i malo slovo, dijakritika i zavrsni recenicni znak su bitni.
   Tipovi zadataka su opisani u READMEu.                                        */

const ZADACI_HRVATSKI_4 = [

/* OS HJ A.4.5 (vrste rijeci) */
{id:"h1", nav:"Vrste riječi", title:"Vrste riječi",
 lead:"Imenice, glagoli, pridjevi, brojevi i zamjenice u rečenici.", tasks:[
  {t:"izbor", q:"Koja je vrsta riječi?", items:[
    ["knjiga",  ["imenica","glagol"],    "imenica"],
    ["trčati",  ["glagol","pridjev"],    "glagol"],
    ["zelen",   ["pridjev","imenica"],   "pridjev"],
    ["pet",     ["broj","pridjev"],      "broj"],
    ["ona",     ["zamjenica","imenica"], "zamjenica"],
    ["škola",   ["imenica","pridjev"],   "imenica"],
    ["pišemo",  ["glagol","imenica"],    "glagol"]]},
  {t:"calc", q:"Upiši imenicu iz rečenice.", items:[
    ["Sunce jarko sja.",       "Sunce"],
    ["Pas laje u dvorištu.",   "Pas"],
    ["Marko čita.",            "Marko"]]},
  {t:"calc", q:"Upiši glagol iz rečenice.", items:[
    ["Djeca se igraju.",       "igraju"],
    ["Baka peče kolače.",      "peče"],
    ["Sutra putujemo na more.","putujemo"]]},
  {t:"calc", q:"Upiši pridjev iz rečenice.", items:[
    ["Visoko drvo raste u vrtu.", "Visoko"],
    ["Kupili smo crvene jabuke.", "crvene"]]},
  {t:"note", q:"Napiši rečenicu u kojoj su barem jedna imenica, jedan glagol i jedan pridjev. Podcrtaj ih.",
   solution:"npr. Mali dječak čita knjigu. — pridjev, imenica, glagol, imenica"}
]},

/* OS HJ A.4.5 (imenice: rod, broj, opce i vlastite) */
{id:"h2", nav:"Imenice", title:"Imenice",
 lead:"Opće i vlastite imenice te rod i broj.", tasks:[
  {t:"izbor", q:"Je li imenica opća ili vlastita?", items:[
    ["grad",   ["opća","vlastita"], "opća"],
    ["Split",  ["vlastita","opća"], "vlastita"],
    ["rijeka", ["opća","vlastita"], "opća"],
    ["Drava",  ["vlastita","opća"], "vlastita"],
    ["učitelj",["opća","vlastita"], "opća"],
    ["Ivana",  ["vlastita","opća"], "vlastita"]]},
  {t:"izbor", q:"Kojega je roda imenica?", items:[
    ["stol",   ["muški","ženski"],   "muški"],
    ["kuća",   ["ženski","srednji"], "ženski"],
    ["dijete", ["srednji","muški"],  "srednji"],
    ["olovka", ["ženski","muški"],   "ženski"],
    ["selo",   ["srednji","ženski"], "srednji"]]},
  {t:"calc", q:"Upiši imenicu u množini.", items:[
    ["knjiga",  "knjige"],
    ["prozor",  "prozori"],
    ["dijete",  "djeca"],
    ["jabuka",  "jabuke"],
    ["stol",    "stolovi"]]},
  {t:"calc", q:"Upiši imenicu u jednini.", items:[
    ["ptice",   "ptica"],
    ["učenici", "učenik"],
    ["sela",    "selo"]]},
  {t:"note", q:"Napiši pet vlastitih imenica iz svojega mjesta i objasni zašto se pišu velikim slovom.",
   solution:"imena ljudi, mjesta, rijeka i ustanova pišu se velikim početnim slovom"}
]},

/* OS HJ A.4.5 (glagoli i glagolska vremena) */
{id:"h3", nav:"Glagoli", title:"Glagoli i glagolska vremena",
 lead:"Prošlo, sadašnje i buduće vrijeme te lice i broj.", tasks:[
  {t:"izbor", q:"U kojem je vremenu glagol?", items:[
    ["čitam",       ["sadašnje","prošlo"],   "sadašnje"],
    ["čitao sam",   ["prošlo","buduće"],     "prošlo"],
    ["čitat ću",    ["buduće","sadašnje"],   "buduće"],
    ["pjevali smo", ["prošlo","sadašnje"],   "prošlo"],
    ["doći ćemo",   ["buduće","prošlo"],     "buduće"]]},
  {t:"calc", q:"Napiši glagol pisati u sadašnjem vremenu, 1. lice jednine.", items:[
    ["", "pišem"]]},
  {t:"calc", q:"Prebaci u prošlo vrijeme, 1. lice jednine (muški rod).", items:[
    ["učim",   "učio sam"],
    ["radim",  "radio sam"],
    ["gledam", "gledao sam"]]},
  {t:"calc", q:"Prebaci u buduće vrijeme, 1. lice jednine.", items:[
    ["učim",   "učit ću"],
    ["pišem",  "pisat ću"],
    ["idem",   "ići ću"]]},
  {t:"izbor", q:"U kojem je licu i broju glagol?", items:[
    ["pjevaš",  ["2. lice jednine","1. lice množine"], "2. lice jednine"],
    ["pjevamo", ["1. lice množine","3. lice jednine"], "1. lice množine"],
    ["pjeva",   ["3. lice jednine","2. lice množine"], "3. lice jednine"]]},
  {t:"note", q:"Napiši istu rečenicu u sva tri vremena: prošlom, sadašnjem i budućem.",
   solution:"npr. Čitao sam knjigu. / Čitam knjigu. / Čitat ću knjigu."}
]},

/* OS HJ A.4.5 (pridjevi: opisni i posvojni, slaganje s imenicom) */
{id:"h4", nav:"Pridjevi", title:"Pridjevi",
 lead:"Opisni i posvojni pridjevi te slaganje s imenicom.", tasks:[
  {t:"izbor", q:"Koja je vrsta pridjeva?", items:[
    ["velika kuća",   ["opisni","posvojni"], "opisni"],
    ["Anin šal",      ["posvojni","opisni"], "posvojni"],
    ["hladna voda",   ["opisni","posvojni"], "opisni"],
    ["mamin auto",    ["posvojni","opisni"], "posvojni"]]},
  {t:"calc", q:"Od imenice napiši posvojni pridjev (muški rod jednine).", items:[
    ["Ivan",  "Ivanov"],
    ["baka",  "bakin"],
    ["Ana",   "Anin"]]},
  {t:"calc", q:"Prilagodi pridjev imenici — upiši samo pridjev.", items:[
    ["mali + kuća",   "mala"],
    ["nov + selo",    "novo"],
    ["dobar + djeca", "dobra"]]},
  {t:"izbor", q:"Kako se piše posvojni pridjev od vlastite imenice?", items:[
    ["", ["velikim početnim slovom","malim početnim slovom"], "velikim početnim slovom"]]},
  {t:"note", q:"Opiši svoju sobu s pet pridjeva.",
   solution:"npr. svijetla, uredna, mala, topla, moja soba"}
]},

/* OS HJ A.4.5 (recenica i srocnost) */
{id:"h5", nav:"Rečenica", title:"Rečenica",
 lead:"Vrste rečenica po priopćajnoj svrsi i sročnost riječi u rečenici.", tasks:[
  {t:"izbor", q:"Koja je to vrsta rečenice?", items:[
    ["Danas pada kiša.",    ["izjavna","upitna"],  "izjavna"],
    ["Kada dolaziš?",       ["upitna","uzvična"],  "upitna"],
    ["Kako je lijepo!",     ["uzvična","izjavna"], "uzvična"],
    ["Zatvori prozor.",     ["zapovjedna","upitna"], "zapovjedna"]]},
  {t:"calc", q:"Dopuni rečenicu odgovarajućim znakom — upiši cijelu rečenicu sa znakom.", items:[
    ["Gdje si bio",     "Gdje si bio?"],
    ["Volim ljeto",     "Volim ljeto."],
    ["Kako si narastao","Kako si narastao!"]]},
  {t:"calc", q:"Uskladi glagol s imenicom — upiši samo glagol.", items:[
    ["Djeca (trčati) po dvorištu.",   "trče"],
    ["Ptica (pjevati) na grani.",     "pjeva"],
    ["Učenici (pisati) zadaću.",      "pišu"]]},
  {t:"calc", q:"Uskladi pridjev s imenicom — upiši samo pridjev.", items:[
    ["(velik) kuća",   "velika"],
    ["(nov) selo",     "novo"],
    ["(mali) djeca",   "mala"]]},
  {t:"izbor", q:"Je li rečenica ispravno usklađena?", items:[
    ["Djeca se igra u parku.",  ["nije","jest"], "nije"],
    ["Djeca se igraju u parku.",["jest","nije"], "jest"]]},
  {t:"note", q:"Napiši po jednu izjavnu, upitnu, uzvičnu i zapovjednu rečenicu o školi.",
   solution:"svaka rečenica završava odgovarajućim znakom: . ? ! ."}
]},

/* OS HJ A.4.5 (pravopisna pravila: veliko pocetno slovo) */
{id:"h6", nav:"Veliko slovo", title:"Veliko početno slovo",
 lead:"Imena, nazivi, blagdani i pisanje rečenice.", tasks:[
  {t:"calc", q:"Prepiši ispravno, s velikim početnim slovima.", items:[
    ["moj prijatelj marko živi u osijeku.", "Moj prijatelj Marko živi u Osijeku."],
    ["rijeka sava teče kroz zagreb.",       "Rijeka Sava teče kroz Zagreb."],
    ["putujemo u republiku hrvatsku.",      "Putujemo u Republiku Hrvatsku."]]},
  {t:"izbor", q:"Piše li se velikim ili malim početnim slovom?", items:[
    ["ponedjeljak", ["malim","velikim"], "malim"],
    ["Božić",       ["velikim","malim"], "velikim"],
    ["listopad",    ["malim","velikim"], "malim"],
    ["Uskrs",       ["velikim","malim"], "velikim"],
    ["Jadransko more", ["velikim","malim"], "velikim"]]},
  {t:"calc", q:"Upiši ispravno napisan naziv.", items:[
    ["osnovna škola ivana gundulića", "Osnovna škola Ivana Gundulića"],
    ["grad dubrovnik",                "grad Dubrovnik"]]},
  {t:"note", q:"Napiši adresu svoje škole poštujući pravila o velikom slovu.",
   solution:"ime ustanove velikim slovom prve riječi i vlastitih imena"}
]},

/* OS HJ A.4.5 (pravopisna pravila: c i c, ije i je, glasovi i slova) */
{id:"h7", nav:"Č i Ć, IJE i JE", title:"Č i Ć, IJE i JE",
 lead:"Pisanje č i ć, ije i je te glasovi i slova.", tasks:[
  {t:"calc", q:"Dopuni s č ili ć — upiši cijelu riječ.", items:[
    ["u__enik",  "učenik"],
    ["no__",     "noć"],
    ["ku__a",    "kuća"],
    ["ma__ka",   "mačka"],
    ["djevoj__ica","djevojčica"],
    ["sre__a",   "sreća"]]},
  {t:"calc", q:"Dopuni s ije ili je — upiši cijelu riječ.", items:[
    ["l__po",    "lijepo"],
    ["d__te",    "dijete"],
    ["ml__ko",   "mlijeko"],
    ["v__tar",   "vjetar"],
    ["d__vojka", "djevojka"]]},
  {t:"calc", q:"Odgovori brojem.", items:[
    ["koliko slova ima riječ njiva",   "5"],
    ["koliko glasova ima riječ njiva", "4"],
    ["koliko slova ima riječ džep",    "4"],
    ["koliko glasova ima riječ džep",  "3"]]},
  {t:"izbor", q:"Je li glas samoglasnik ili suglasnik?", items:[
    ["a", ["samoglasnik","suglasnik"], "samoglasnik"],
    ["m", ["suglasnik","samoglasnik"], "suglasnik"],
    ["u", ["samoglasnik","suglasnik"], "samoglasnik"],
    ["r", ["suglasnik","samoglasnik"], "suglasnik"]]},
  {t:"calc", q:"Napiši niječni oblik — upiši cijelu rečenicu.", items:[
    ["Idem u školu.", "Ne idem u školu."],
    ["Imam knjigu.",  "Nemam knjigu."]]},
  {t:"note", q:"Napiši pet riječi s ć i pet riječi s č i pazi na izgovor.",
   solution:"npr. noć, sreća, kuća, voće, cvijeće / učenik, mačka, čitati, ključ, čizma"}
]},

/* OS HJ A.4.6 (zavicajni govor i hrvatski standardni jezik) */
{id:"h8", nav:"Zavičajni govor", title:"Zavičajni govor i standardni jezik",
 lead:"Razlika između mjesnoga govora i standardnoga jezika te hrvatska narječja.", tasks:[
  {t:"izbor", q:"Kojem narječju pripada riječ?", items:[
    ["kaj",  ["kajkavsko","čakavsko"],  "kajkavsko"],
    ["ča",   ["čakavsko","štokavsko"],  "čakavsko"],
    ["što",  ["štokavsko","kajkavsko"], "štokavsko"]]},
  {t:"calc", q:"Odgovori brojem.", items:[
    ["koliko hrvatskih narječja postoji", "3"]]},
  {t:"izbor", q:"Gdje se govori hrvatskim standardnim jezikom?", items:[
    ["u školi na satu i u vijestima",     ["standardni jezik","zavičajni govor"], "standardni jezik"],
    ["u razgovoru s bakom u svom mjestu", ["zavičajni govor","standardni jezik"], "zavičajni govor"]]},
  {t:"izbor", q:"Točno ili netočno?", items:[
    ["Zavičajni govor dio je naše jezične baštine.",       ["točno","netočno"], "točno"],
    ["Zavičajni govor je manje vrijedan od standarda.",    ["netočno","točno"], "netočno"],
    ["Standardnim jezikom služimo se u javnoj komunikaciji.", ["točno","netočno"], "točno"]]},
  {t:"calc", q:"Upiši riječ standardnoga jezika.", items:[
    ["kaj",   "što"],
    ["ča",    "što"]]},
  {t:"note", q:"Zapiši pet riječi iz svojega zavičajnog govora i njihove istoznačnice u standardnome jeziku.",
   solution:"usporedi kako istu stvar kažeš kod kuće, a kako u školi"}
]},

/* OS HJ B.4.2 (obiljezja knjizevnoga teksta) i produktivni ishodi A.4.1-A.4.4 */
{id:"h9", nav:"Književnost i vježbanje", title:"Književnost i vježbanje",
 lead:"Obilježja književnoga teksta i zadaci za vježbenicu.", tasks:[
  {t:"izbor", q:"Kojoj književnoj vrsti pripada tekst?", items:[
    ["kratka priča o životinjama s poukom",     ["basna","bajka"],        "basna"],
    ["priča s čarobnim likovima i događajima",  ["bajka","basna"],        "bajka"],
    ["tekst u stihovima",                        ["pjesma","pripovijetka"],"pjesma"],
    ["tekst za izvođenje na pozornici",          ["igrokaz","pjesma"],     "igrokaz"],
    ["opis nečijega života",                     ["biografija","zagonetka"], "biografija"]]},
  {t:"izbor", q:"Kako se zove taj književni pojam?", items:[
    ["red u pjesmi",                        ["stih","strofa"],        "stih"],
    ["skupina stihova",                     ["strofa","stih"],        "strofa"],
    ["ujednačeno ponavljanje u pjesmi",     ["ritam","strofa"],       "ritam"],
    ["osoba koja u priči nešto doživljava", ["lik","događaj"],        "lik"]]},
  {t:"izbor", q:"Koja je to pjesnička figura?", items:[
    ["Sunce se smije.",           ["personifikacija","onomatopeja"], "personifikacija"],
    ["Šuma šumi, potok žubori.",  ["onomatopeja","personifikacija"], "onomatopeja"],
    ["Vjetar pjeva kroz granje.", ["personifikacija","onomatopeja"], "personifikacija"]]},
  {t:"calc", q:"Upiši riječ koja se rimuje.", items:[
    ["cvijet — ",  "svijet"],
    ["kuća — ",    "vruća"]]},
  {t:"note", q:"Pročitaj naglas jedan odlomak iz lektire i pazi na izgovor i stanke.",
   solution:"čitaj razgovijetno, poštuj točku, zarez i upitnik"},
  {t:"note", q:"Ispričaj ukratko sadržaj knjige koju si zadnju pročitao ili pročitala.",
   solution:"tko, gdje, kada, što se dogodilo i kako je završilo"},
  {t:"note", q:"Napiši sastavak od deset rečenica o svojem najdražem danu.",
   solution:"uvod, glavni dio i završetak, svaka rečenica velikim slovom i završnim znakom"},
  {t:"note", q:"Poslušaj vijest ili priču i prepričaj je u tri rečenice.",
   solution:"izdvoji najvažnije: tko, što i kada"}
]}
];
