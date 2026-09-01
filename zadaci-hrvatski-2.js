/* Zadaci: Hrvatski jezik, gradivo 2. razreda.

   Uz "calc" (upis) i "note" (vjezbenica) koristi se i tip "izbor":
     items: [ [prikaz, [ponudeno, …], odgovor], … ]
   prikaz  ono sto stoji uz tipke; smije biti "" kad su tipke same rijeci
   Tocan odgovor mora biti medu ponudenima. Tipke se premjesaju pri
   iscrtavanju, pa poredak u podacima nista ne odaje.                       */

const ZADACI_HRVATSKI_2 = [

{id:"h1", nav:"Veliko slovo", title:"Veliko početno slovo",
 lead:"Imena i prezimena, mjesta, ulice i trgovi, kućni ljubimci, početak rečenice.", tasks:[
  {t:"izbor", q:"Odaberi kako se piše.", items:[
    ["____ ide u školu.",           ["Ana","ana"],             "Ana"],
    ["Moj brat ____ voli nogomet.", ["Ivan","ivan"],           "Ivan"],
    ["Stanujem u ____ ulici.",      ["Cvjetnoj","cvjetnoj"],   "Cvjetnoj"],
    ["Ljeti idemo u ____.",         ["Split","split"],         "Split"],
    ["Naša mačka zove se ____.",    ["Mica","mica"],           "Mica"],
    ["Živim u ____.",               ["Hrvatskoj","hrvatskoj"], "Hrvatskoj"],
    ["Vlak ide u ____.",            ["Rijeku","rijeku"],       "Rijeku"]]},
  {t:"izbor", q:"Koji je zapis točan?", items:[
    ["", ["Trg bana Jelačića","trg bana jelačića"],           "Trg bana Jelačića"],
    ["", ["Ulica kralja Tomislava","ulica Kralja Tomislava"], "Ulica kralja Tomislava"]]},
  {t:"calc", q:"Prepiši ispravno, s velikim početnim slovima.", items:[
    ["moj pas se zove rex.",        "Moj pas se zove Rex."],
    ["danas idemo u zagreb.",       "Danas idemo u Zagreb."],
    ["ana i marko žive u osijeku.", "Ana i Marko žive u Osijeku."]]}
]},

{id:"h2", nav:"Č ili Ć", title:"Č ili Ć",
 lead:"Izgovori riječ u sebi: ć je mekše, č je tvrđe. Na kraju i dž i đ.", tasks:[
  {t:"izbor", q:"Odaberi slovo koje pripada u riječ.", items:[
    ["ku_a (dom)",       ["ć","č"],  "ć"],
    ["_ovjek",           ["č","ć"],  "č"],
    ["no_",              ["ć","č"],  "ć"],
    ["klju_",            ["č","ć"],  "č"],
    ["cvije_e",          ["ć","č"],  "ć"],
    ["ru_nik",           ["č","ć"],  "č"],
    ["sre_a",            ["ć","č"],  "ć"],
    ["_okolada",         ["č","ć"],  "č"],
    ["ma_ka",            ["č","ć"],  "č"],
    ["vo_e",             ["ć","č"],  "ć"],
    ["_izma",            ["č","ć"],  "č"],
    ["pomo_",            ["ć","č"],  "ć"],
    ["ro_ak",            ["đ","dž"], "đ"],
    ["_ep (na hlačama)", ["dž","ž"], "dž"]]}
]},

{id:"h3", nav:"IJE ili JE", title:"IJE ili JE",
 lead:"Ista riječ, dva zapisa. Samo je jedan točan.", tasks:[
  {t:"izbor", q:"Koja je riječ napisana ispravno?", items:[
    ["", ["dijete","djete"],         "dijete"],
    ["", ["djeca","dijeca"],         "djeca"],
    ["", ["lijep","ljep"],           "lijep"],
    ["", ["mlijeko","mljeko"],       "mlijeko"],
    ["", ["cvijet","cvjet"],         "cvijet"],
    ["", ["vjetar","vijetar"],       "vjetar"],
    ["", ["snijeg","snjeg"],         "snijeg"],
    ["", ["vjeverica","vijeverica"], "vjeverica"],
    ["", ["rijeka","rjeka"],         "rijeka"],
    ["", ["mjesec","mijesec"],       "mjesec"],
    ["", ["bijel","bjel"],           "bijel"],
    ["", ["pjesma","pijesma"],       "pjesma"]]}
]},

{id:"h4", nav:"Glasovi i slova", title:"Glasovi i slova",
 lead:"Abeceda, slogovi, lj i nj.", tasks:[
  {t:"calc", q:"Koliko slogova ima riječ?", items:[
    ["lopata", "3"],
    ["škola",  "2"],
    ["olovka", "3"]]},
  {t:"calc", q:"Rastavi riječ na slogove, s crticom između.", items:[
    ["kuća", "ku-ća"],
    ["mama", "ma-ma"]]},
  {t:"izbor", q:"Abeceda.", items:[
    ["Koje je prvo slovo abecede?",        ["A","B"], "A"],
    ["Koje je zadnje slovo abecede?",      ["Ž","Z"], "Ž"],
    ["Koje je slovo u abecedi ispred Ć?",  ["Č","C"], "Č"],
    ["Koje je slovo u abecedi ispred Č?",  ["C","Ć"], "C"]]},
  {t:"izbor", q:"Odaberi lj ili nj.", items:[
    ["_ubav", ["lj","nj"], "lj"],
    ["ko_",   ["nj","lj"], "nj"],
    ["k_iga", ["nj","lj"], "nj"]]}
]},

{id:"h5", nav:"Rečenica", title:"Rečenica",
 lead:"Točka, upitnik i uskličnik; jesne i niječne rečenice.", tasks:[
  {t:"izbor", q:"Koji znak ide na kraj rečenice?", items:[
    ["Gdje si bio__",        ["?","."], "?"],
    ["Ura, pobijedili smo__", ["!","."], "!"],
    ["Marko čita knjigu__",  [".","?"], "."]]},
  {t:"izbor", q:"Jesna ili niječna rečenica?", items:[
    ["Ne volim kišu.", ["niječna","jesna"], "niječna"],
    ["Volim ljeto.",   ["jesna","niječna"], "jesna"]]},
  {t:"izbor", q:"Koji je zapis točan?", items:[
    ["", ["ne znam","neznam"],   "ne znam"],
    ["", ["ne volim","nevolim"], "ne volim"]]},
  {t:"calc", q:"Pretvori u niječnu rečenicu.", items:[
    ["Ivan čita.", "Ivan ne čita."],
    ["Ana pjeva.", "Ana ne pjeva."]]},
  {t:"calc", q:"Pretvori u jesnu rečenicu.", items:[
    ["Petar ne trči.", "Petar trči."]]},
  {t:"calc", q:"Odgovori.", items:[
    ["Koliko rečenica ima: Pada snijeg. Djeca se raduju.", "2"],
    ["Prepiši ispravno: ana ide u školu.",                 "Ana ide u školu."]]}
]},

{id:"h6", nav:"Vrste riječi", title:"Vrste riječi",
 lead:"Imenice, glagoli i pridjevi; jednina i množina.", tasks:[
  {t:"izbor", q:"Opća ili vlastita imenica?", items:[
    ["Zagreb", ["vlastita imenica","opća imenica"], "vlastita imenica"],
    ["grad",   ["opća imenica","vlastita imenica"], "opća imenica"],
    ["Sava",   ["vlastita imenica","opća imenica"], "vlastita imenica"]]},
  {t:"izbor", q:"Koja je riječ glagol?", items:[
    ["", ["trči","trava"],   "trči"],
    ["", ["pjeva","pjesma"], "pjeva"]]},
  {t:"izbor", q:"Koja je riječ pridjev?", items:[
    ["", ["visok","visina"],    "visok"],
    ["", ["hladan","hladnjak"], "hladan"]]},
  {t:"izbor", q:"Jednina ili množina?", items:[
    ["djeca", ["množina","jednina"], "množina"]]},
  {t:"calc", q:"Napiši množinu.", items:[
    ["kuća",   "kuće"],
    ["prozor", "prozori"]]},
  {t:"calc", q:"Napiši jedninu.", items:[
    ["olovke", "olovka"],
    ["djeca",  "dijete"]]}
]},

{id:"h7", nav:"Riječi i značenje", title:"Riječi i značenje",
 lead:"Protuznačnice, istoznačnice i redoslijed riječi u rečenici.", tasks:[
  {t:"izbor", q:"Odaberi protuznačnicu.", items:[
    ["velik", ["malen","ogroman"],   "malen"],
    ["dan",   ["noć","jutro"],       "noć"],
    ["visok", ["nizak","dugačak"],   "nizak"],
    ["mokro", ["suho","vlažno"],     "suho"]]},
  {t:"izbor", q:"Odaberi istoznačnicu.", items:[
    ["kuća",  ["dom","vrt"],           "dom"],
    ["velik", ["golem","malen"],       "golem"],
    ["auto",  ["automobil","kamion"],  "automobil"]]},
  {t:"calc", q:"Napiši protuznačnicu.", items:[
    ["vruće", "hladno"],
    ["dobro", "loše"]]},
  {t:"izbor", q:"Koja je rečenica složena ispravno?", items:[
    ["", ["Marko dolazi iz škole.", "Iz Marko škole dolazi."], "Marko dolazi iz škole."],
    ["", ["Ana je lijepa.", "Lijepa Ana je."],                 "Ana je lijepa."]]},
  {t:"note", q:"U vježbenicu napiši tri riječi koje počinju slovom Č.",
   solution:"npr. čaša, čokolada, čizma"}
]}

];
