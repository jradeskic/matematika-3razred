/* Zadaci: Hrvatski jezik, gradivo 7. razreda.

   Cjeline slijede ishode iz Odluke o donosenju kurikuluma nastavnoga predmeta
   Hrvatski jezik za osnovne skole i gimnazije, NN 10/2019. Oznaka ishoda stoji
   u komentaru uz svaku cjelinu.

   Jezgra je OS HJ A.7.5, ciji su sadrzaji izricito: zamjenice, glasovne
   promjene i sintakticko ustrojstvo recenice (predikat, subjekt, objekt,
   prilozne oznake, atribut, apozicija), uz znacenje i sluzbu padeza, red rijeci
   i imenovanje naglasaka. Ondje se odgovor tocno provjerava. A.7.6 (povijest
   hrvatskoga jezika) i B.7.2 (knjizevni pojmovi) idu kao "izbor", a produktivni
   ishodi (A.7.1 govorenje, A.7.2 slusanje, A.7.3 citanje, A.7.4 pisanje) kao
   "note" -- zadaci za vjezbenicu, bez ocjenjivanja.

   Ono cega ovdje NEMA namjerno: nezavisnoslozene recenice i glagolski vid,
   nacin i vremena. To nisu sadrzaji 7. razreda -- glagoli se obraduju ranije,
   a slozena recenica dolazi u 8. razredu.

   NEPOKRIVENO automatskom provjerom: domena C (Kultura i mediji, C.7.1-C.7.3) i
   B.7.1, B.7.3, B.7.4. Ti ishodi trazu razgovor, posjet ili stvaralacki rad i ne
   svode se na polje za upis. Knjizevni "note" zadatak je u h7, produktivni u h8.

   Zadaci hrvatskoga ne koriste polje "oblik" -- provjera je po predmetu:
   veliko i malo slovo, dijakritika i zavrsni recenicni znak su bitni.
   Tipovi zadataka su opisani u READMEu.                                        */

const ZADACI_HRVATSKI_7 = [

/* OS HJ A.7.5 (zamjenice) */
{id:"h1", nav:"Zamjenice", title:"Zamjenice",
 lead:"Osobne, posvojne, povratna, pokazne, upitne, odnosne i neodređene zamjenice.", tasks:[
  {t:"izbor", q:"Koja je vrsta zamjenice?", items:[
    ["ja",    ["osobna","posvojna"],            "osobna"],
    ["moj",   ["posvojna","pokazna"],           "posvojna"],
    ["sebe",  ["povratna","osobna"],            "povratna"],
    ["svoj",  ["povratno-posvojna","posvojna"], "povratno-posvojna"],
    ["ovaj",  ["pokazna","upitna"],             "pokazna"],
    ["tko",   ["upitna","odnosna"],             "upitna"],
    ["netko", ["neodređena","upitna"],          "neodređena"],
    ["nitko", ["niječna","neodređena"],         "niječna"]]},
  {t:"calc", q:"Upiši zamjenicu iz rečenice.", items:[
    ["On dolazi sutra.",       "On"],
    ["To je moja knjiga.",     "To"],
    ["Uzeo je svoju torbu.",   "svoju"],
    ["Tko je to rekao?",       "Tko"]]},
  {t:"calc", q:"Zamijeni imenicu osobnom zamjenicom — upiši samo zamjenicu.", items:[
    ["Ana čita.",         "Ona"],
    ["Marko i ja idemo.", "Mi"],
    ["Dječaci trče.",     "Oni"]]},
  {t:"izbor", q:"Koja je zamjenica ispravna u rečenici?", items:[
    ["Marko je uzeo ___ knjigu (Markovu).",  ["svoju","njegovu"], "svoju"],
    ["Vidio sam ___ brata (Markova brata).", ["njegova","svoga"], "njegova"]]},
  {t:"calc", q:"Upiši osobnu zamjenicu ja u traženom padežu.", items:[
    ["genitiv",      "mene"],
    ["dativ",        "meni"],
    ["instrumental", "mnom"]]},
  {t:"note", q:"Napiši tri rečenice u kojima upotrijebiš povratno-posvojnu zamjenicu svoj.",
   solution:"svoj se uvijek odnosi na subjekt rečenice: Uzela je svoju bilježnicu."}
]},

/* OS HJ A.7.5 (glasovne promjene) */
{id:"h2", nav:"Glasovne promjene", title:"Glasovne promjene",
 lead:"Sibilarizacija, palatalizacija, jotacija i nepostojani a.", tasks:[
  {t:"izbor", q:"Koja je glasovna promjena provedena?", items:[
    ["junak → junaci",  ["sibilarizacija","palatalizacija"], "sibilarizacija"],
    ["junak → junače",  ["palatalizacija","sibilarizacija"], "palatalizacija"],
    ["brat → braća",    ["jotacija","sibilarizacija"],       "jotacija"],
    ["pas → psa",       ["nepostojani a","jotacija"],        "nepostojani a"],
    ["noga → nozi",     ["sibilarizacija","palatalizacija"], "sibilarizacija"],
    ["bog → bože",      ["palatalizacija","jotacija"],       "palatalizacija"]]},
  {t:"izbor", q:"U koje se glasove mijenjaju k, g, h?", items:[
    ["sibilarizacijom",  ["c, z, s","č, ž, š"], "c, z, s"],
    ["palatalizacijom",  ["č, ž, š","c, z, s"], "č, ž, š"]]},
  {t:"calc", q:"Upiši imenicu u množini i provedi sibilarizaciju.", items:[
    ["vojnik",  "vojnici"],
    ["đak",     "đaci"],
    ["oblak",   "oblaci"]]},
  {t:"calc", q:"Upiši imenicu u vokativu jednine i provedi palatalizaciju.", items:[
    ["junak",   "junače"],
    ["vuk",     "vuče"],
    ["Bog",     "Bože"]]},
  {t:"calc", q:"Upiši imenicu u genitivu jednine — pazi na nepostojano a.", items:[
    ["borac",   "borca"],
    ["momak",   "momka"],
    ["pas",     "psa"],
    ["vjetar",  "vjetra"]]},
  {t:"izbor", q:"Ispred kojega se glasa provodi sibilarizacija?", items:[
    ["", ["ispred i","ispred e"], "ispred i"]]},
  {t:"note", q:"Pronađi u tekstu koji čitaš pet riječi s provedenom glasovnom promjenom i imenuj promjenu.",
   solution:"zapiši osnovni oblik, promijenjeni oblik i naziv promjene"}
]},

/* OS HJ A.7.5 (sintakticko ustrojstvo recenice) */
{id:"h3", nav:"Ustrojstvo rečenice", title:"Sintaktičko ustrojstvo rečenice",
 lead:"Predikat, subjekt, objekt, priložne oznake, atribut i apozicija.", tasks:[
  {t:"calc", q:"Upiši predikat rečenice.", items:[
    ["Djeca se igraju u parku.",    "igraju"],
    ["Vlak kasni pola sata.",       "kasni"],
    ["Moja sestra pjeva u zboru.",  "pjeva"]]},
  {t:"calc", q:"Upiši subjekt rečenice.", items:[
    ["Djeca se igraju u parku.",    "Djeca"],
    ["Vlak kasni pola sata.",       "Vlak"],
    ["Visoko drvo raste u vrtu.",   "drvo"]]},
  {t:"calc", q:"Upiši objekt iz rečenice.", items:[
    ["Ana čita knjigu.",            "knjigu"],
    ["Napisao je pismo.",           "pismo"],
    ["Sjećam se ljeta.",            "ljeta"]]},
  {t:"izbor", q:"Koja je to priložna oznaka?", items:[
    ["Igraju se u parku.",          ["mjesta","vremena"],  "mjesta"],
    ["Došli su jučer.",             ["vremena","načina"],  "vremena"],
    ["Govorio je tiho.",            ["načina","uzroka"],   "načina"],
    ["Ostao je kod kuće zbog kiše.",["uzroka","mjesta"],   "uzroka"]]},
  {t:"izbor", q:"Je li istaknuta riječ atribut ili apozicija?", items:[
    ["visoko drvo",           ["atribut","apozicija"],  "atribut"],
    ["grad Zagreb",           ["apozicija","atribut"],  "apozicija"],
    ["moj prijatelj Marko",   ["apozicija","atribut"],  "apozicija"],
    ["crvena jabuka",         ["atribut","apozicija"],  "atribut"]]},
  {t:"calc", q:"Upiši atribut iz rečenice.", items:[
    ["Kupili smo crvene jabuke.",   "crvene"],
    ["Stara kuća je obnovljena.",   "Stara"]]},
  {t:"note", q:"Rastavi rečenicu Moja sestra Ana rado čita knjige u knjižnici na sve rečenične dijelove.",
   solution:"subjekt sestra, atribut Moja, apozicija Ana, predikat čita, priložna oznaka načina rado, objekt knjige, priložna oznaka mjesta u knjižnici"}
]},

/* OS HJ A.7.5 (znacenje i sluzba padeza) */
{id:"h4", nav:"Padeži", title:"Padeži — značenje i služba",
 lead:"Padežna pitanja, oblici imenica i služba padeža u rečenici.", tasks:[
  {t:"izbor", q:"Na koje pitanje odgovara padež?", items:[
    ["nominativ",    ["tko? što?","koga? čega?"],       "tko? što?"],
    ["genitiv",      ["koga? čega?","komu? čemu?"],     "koga? čega?"],
    ["dativ",        ["komu? čemu?","koga? što?"],      "komu? čemu?"],
    ["akuzativ",     ["koga? što?","o kome? o čemu?"],  "koga? što?"],
    ["lokativ",      ["o kome? o čemu?","s kim? čim?"], "o kome? o čemu?"],
    ["instrumental", ["s kim? čim?","tko? što?"],       "s kim? čim?"]]},
  {t:"calc", q:"Upiši imenicu knjiga u traženom padežu jednine.", items:[
    ["genitiv",      "knjige"],
    ["dativ",        "knjizi"],
    ["akuzativ",     "knjigu"],
    ["instrumental", "knjigom"]]},
  {t:"calc", q:"Upiši imenicu učenik u traženom padežu jednine.", items:[
    ["genitiv",  "učenika"],
    ["dativ",    "učeniku"],
    ["vokativ",  "učeniče"]]},
  {t:"izbor", q:"U kojem je padežu istaknuta riječ?", items:[
    ["Dao sam knjigu bratu.", ["dativ","akuzativ"],   "dativ"],
    ["Vidio sam brata.",      ["akuzativ","genitiv"], "akuzativ"],
    ["Govorimo o bratu.",     ["lokativ","dativ"],    "lokativ"],
    ["Putujem s bratom.",     ["instrumental","dativ"], "instrumental"]]},
  {t:"izbor", q:"Koju službu u rečenici ima riječ u tom padežu?", items:[
    ["nominativ u rečenici Ana čita.",        ["subjekt","objekt"],  "subjekt"],
    ["akuzativ u rečenici Ana čita knjigu.",  ["objekt","subjekt"],  "objekt"]]},
  {t:"note", q:"Sklanjaj imenicu prijatelj kroz svih sedam padeža jednine.",
   solution:"prijatelj, prijatelja, prijatelju, prijatelja, prijatelju, prijatelju, prijateljem"}
]},

/* OS HJ A.7.5 (red rijeci i naglasci) */
{id:"h5", nav:"Red riječi i naglasci", title:"Red riječi i naglasci",
 lead:"Stilski neobilježen i obilježen red riječi te četiri naglaska.", tasks:[
  {t:"izbor", q:"Je li red riječi stilski neobilježen ili obilježen?", items:[
    ["Ana čita knjigu.",   ["neobilježen","obilježen"], "neobilježen"],
    ["Knjigu Ana čita.",   ["obilježen","neobilježen"], "obilježen"],
    ["Djeca se igraju.",   ["neobilježen","obilježen"], "neobilježen"]]},
  {t:"calc", q:"Odgovori brojem.", items:[
    ["koliko naglasaka ima hrvatski standardni jezik", "4"]]},
  {t:"izbor", q:"Koji je to naglasak?", items:[
    ["kratak i silazan",  ["kratkosilazni","kratkouzlazni"], "kratkosilazni"],
    ["dug i silazan",     ["dugosilazni","dugouzlazni"],     "dugosilazni"],
    ["kratak i uzlazan",  ["kratkouzlazni","kratkosilazni"], "kratkouzlazni"],
    ["dug i uzlazan",     ["dugouzlazni","dugosilazni"],     "dugouzlazni"]]},
  {t:"izbor", q:"Gdje u riječi mogu stajati silazni naglasci u standardnome jeziku?", items:[
    ["", ["samo na prvome slogu","na bilo kojem slogu"], "samo na prvome slogu"]]},
  {t:"izbor", q:"Može li naglasak stajati na zadnjem slogu višesložne riječi?", items:[
    ["", ["ne može","može uvijek"], "ne može"]]},
  {t:"note", q:"Izgovori naglas riječi kuća, sunce, planina i vojnik i pokušaj odrediti naglasak.",
   solution:"provjeri u rječniku ili pravopisu — naglasak je zabilježen uz natuknicu"}
]},

/* OS HJ A.7.6 (tekstovi i dogadaji vazni za razvoj hrvatskoga jezika) */
{id:"h6", nav:"Povijest jezika", title:"Povijest hrvatskoga jezika",
 lead:"Prvi rječnik, prva gramatika, ilirski pokret i jezični priručnici.", tasks:[
  {t:"izbor", q:"Tko je autor djela?", items:[
    ["prvi hrvatski rječnik (1595.)",   ["Faust Vrančić","Bartol Kašić"], "Faust Vrančić"],
    ["prva hrvatska gramatika (1604.)", ["Bartol Kašić","Ljudevit Gaj"],  "Bartol Kašić"],
    ["vođa ilirskoga pokreta",          ["Ljudevit Gaj","Faust Vrančić"], "Ljudevit Gaj"]]},
  {t:"izbor", q:"Što je od navedenoga točno?", items:[
    ["Ilirski pokret djelovao je u 19. stoljeću.",       ["točno","netočno"], "točno"],
    ["Prva hrvatska gramatika napisana je na latinskom.",["točno","netočno"], "točno"],
    ["Prvi hrvatski rječnik bio je jednojezičan.",       ["netočno","točno"], "netočno"]]},
  {t:"calc", q:"Upiši ime i prezime.", items:[
    ["autor prvoga hrvatskog rječnika",   "Faust Vrančić"],
    ["autor prve hrvatske gramatike",     "Bartol Kašić"],
    ["pokretač ilirskoga pokreta",        "Ljudevit Gaj"]]},
  {t:"izbor", q:"Koji je to jezični priručnik?", items:[
    ["objašnjava značenja riječi",              ["rječnik","pravopis"],   "rječnik"],
    ["propisuje pisanje riječi",                ["pravopis","gramatika"], "pravopis"],
    ["opisuje glasove, oblike i rečenicu",      ["gramatika","rječnik"],  "gramatika"],
    ["daje savjete o boljem izboru riječi",     ["jezični savjetnik","pravopis"], "jezični savjetnik"]]},
  {t:"note", q:"Istraži koji se pravopis i koja gramatika danas rabe u tvojoj školi i tko su im autori.",
   solution:"potraži u školskoj knjižnici ili u digitalnim izdanjima"}
]},

/* OS HJ B.7.2 (tumacenje knjizevnoga teksta i znanja o knjizevnosti) */
{id:"h7", nav:"Književnost", title:"Književnost",
 lead:"Fabula i kompozicija, pripovjedač te hiperbola, retoričko pitanje i metafora.", tasks:[
  {t:"izbor", q:"Kako se zove taj književni pojam?", items:[
    ["slijed događaja u pripovjednome tekstu", ["fabula","kompozicija"], "fabula"],
    ["raspored dijelova književnoga djela",    ["kompozicija","fabula"], "kompozicija"],
    ["red u pjesmi",                            ["stih","strofa"],       "stih"],
    ["skupina stihova",                         ["strofa","stih"],       "strofa"]]},
  {t:"izbor", q:"U kojem licu pripovijeda pripovjedač?", items:[
    ["Šetao sam gradom i razmišljao.", ["u 1. licu","u 3. licu"], "u 1. licu"],
    ["Šetao je gradom i razmišljao.",  ["u 3. licu","u 1. licu"], "u 3. licu"]]},
  {t:"izbor", q:"Jesu li pripovjedač i pisac ista osoba?", items:[
    ["", ["nisu","jesu"], "nisu"]]},
  {t:"izbor", q:"Koja je to stilska figura?", items:[
    ["Rekao sam ti tisuću puta.",        ["hiperbola","metafora"],        "hiperbola"],
    ["Tko to ne bi razumio?",            ["retoričko pitanje","hiperbola"],"retoričko pitanje"],
    ["More je zrcalo.",                  ["metafora","retoričko pitanje"], "metafora"],
    ["Umirem od gladi.",                 ["hiperbola","metafora"],         "hiperbola"]]},
  {t:"izbor", q:"Kojoj književnoj vrsti pripada djelo?", items:[
    ["kraća prozna vrsta s jednim događajem i obratom", ["novela","roman"],        "novela"],
    ["roman o istrazi zločina",                          ["kriminalistički roman","novela"], "kriminalistički roman"],
    ["djelo u kojem pisac piše o vlastitome životu",     ["autobiografija","romansirana biografija"], "autobiografija"],
    ["dramsko djelo s vedrim završetkom",                ["komedija","tragedija"],  "komedija"],
    ["priča ispričana slikom i tekstom u okvirima",      ["strip","novela"],        "strip"]]},
  {t:"note", q:"Izdvoji iz teksta koji čitate na satu tri stilske figure, imenuj ih i objasni što dočaravaju.",
   solution:"navedi rečenicu ili stih, ime figure i njezino značenje"}
]},

/* produktivni ishodi OS HJ A.7.1 (govorenje), A.7.2 (slusanje), A.7.3 (citanje),
   A.7.4 (pisanje), B.7.4 (stvaralastvo) i domena C (kultura i mediji) */
{id:"h8", nav:"Vježbanje", title:"Zadaci za vježbenicu",
 lead:"Govorenje, slušanje, čitanje, pisanje i mediji — bez ocjenjivanja.", tasks:[
  {t:"note", q:"Pripremi i izloži govor od dvije minute prema planu, pa razlikuj svrhu: osobnu i javnu.",
   solution:"uvod, dva do tri glavna podatka i zaključak; govori razgovijetno"},
  {t:"note", q:"Sudjeluj u raspravi u skupini i primijeni jednu vještinu: uvjeravanje, nagovaranje ili pregovaranje.",
   solution:"iznesi tvrdnju, potkrijepi je razlogom i saslušaj sugovornika"},
  {t:"note", q:"Poslušaj tekst i zapiši koji su podatci bitni, a koji nebitni.",
   solution:"bitno je ono bez čega se poruka ne razumije"},
  {t:"note", q:"Pročitaj članak i opiši njegovu grafičku strukturu: naslov, međunaslovi, slike i potpisi.",
   solution:"objasni čemu služi svaki dio i kako pomaže razumijevanju"},
  {t:"note", q:"Napiši objektivan pripovjedni tekst o događaju iz škole: tko, što, gdje, kada i kako.",
   solution:"pripovijedaj činjenično, bez vlastitih ocjena"},
  {t:"note", q:"Usporedi kako dva različita medija izvještavaju o istome događaju.",
   solution:"usporedi naslov, izbor podataka i dojam koji ostavljaju"}
]}
];
