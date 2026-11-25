/* Zadaci: Engleski jezik, gradivo 3. razreda -- odjeca (clothes).

   Provjera pravopisa: uz hrvatsku rijec (i emoji kad postoji) stoje cetiri
   verzije engleske rijeci, a samo je jedna ispravno napisana. Tip "izbor":
     items: [ [prikaz, [ponudeno, …], odgovor], … ]
   Tipke se pri iscrtavanju mijesaju, pa poredak ovdje nije bitan.

   Pravila za netocne verzije:
   - tipicne djecje greske: pisanje po izgovoru (glowes), udvajanje ili
     ispustanje slova (scarff, jaket), zamjena samoglasnika (trausers)
   - nijedna netocna verzija nije stvarna engleska ili hrvatska rijec
     (ne cup/cot/boats/shows/short, ne dres/kap) -- pitanje je "koja je
     rijec ispravno napisana", pa bi stvarna rijec bila dvojbena
   - nikad valjan drugi oblik iste rijeci: ne wooly (americki), trowsers
     (arhaicno), t-shirt, tshirt, tee shirt, sox, trainer -- dijete ne smije
     biti kaznjeno za ispravan oblik
   - bez znakova " i < (vrijednost ide u data-vrijednost atribut)

   Emoji 🩳 i 🩱 namjerno nisu koristeni: Unicode 12, na starijim tabletima
   se prikazu kao prazan kvadratic. Za woolly hat, jumper i skirt nema
   prikladnog emojija. Tim stavkama prikaz je samo hrvatska rijec.        */

const ZADACI_ENGLESKI_3 = [

{id:"e1", nav:"Zimska odjeća", title:"Winter clothes — zimska odjeća",
 lead:"Pročitaj hrvatsku riječ, pa dotakni englesku riječ koja je ispravno napisana.", tasks:[
  {t:"izbor", q:"Koja je riječ ispravno napisana?", items:[
    ["🧥 kaput",      ["coat", "coatt", "kout", "coet"],                     "coat"],
    ["🧣 šal",        ["scarf", "scarff", "skarf", "scaf"],                  "scarf"],
    ["🧤 rukavice",   ["gloves", "glovs", "glowes", "gluves"],               "gloves"],
    ["vunena kapa",   ["woolly hat", "wolly hat", "woolli hat", "woolly hatt"], "woolly hat"],
    ["👢 čizme",      ["boots", "bootz", "buuts", "bootts"],                  "boots"],
    ["džemper",       ["jumper", "jamper", "jumpper", "jumpa"],              "jumper"],
    ["🧥 jakna",      ["jacket", "jaket", "jackit", "jakett"],               "jacket"]]}
]},

{id:"e2", nav:"Ljetna odjeća", title:"Summer clothes — ljetna odjeća",
 lead:"Ljeti je toplo. Dotakni ispravno napisanu riječ.", tasks:[
  {t:"izbor", q:"Koja je riječ ispravno napisana?", items:[
    ["👕 majica",       ["T-shirt", "T-shert", "T-shrit", "T-shirtt"],       "T-shirt"],
    ["kratke hlače",    ["shorts", "shortz", "shorz", "shorst"],             "shorts"],
    ["👡 sandale",      ["sandals", "sandels", "sendals", "sandalls"],       "sandals"],
    ["🧢 šilterica",    ["cap", "capp", "caap", "kapp"],                     "cap"],
    ["👗 haljina",      ["dress", "dreas", "driss", "dresss"],               "dress"],
    ["kupaći kostim",   ["swimsuit", "swimsiut", "swimsoot", "swimmsuit"],   "swimsuit"]]}
]},

{id:"e3", nav:"Svakodnevna odjeća", title:"Everyday clothes — svakodnevna odjeća",
 lead:"Ovo nosimo svaki dan. Dotakni ispravno napisanu riječ.", tasks:[
  {t:"izbor", q:"Koja je riječ ispravno napisana?", items:[
    ["👖 traperice",  ["jeans", "jeens", "jiins", "jeanz"],                  "jeans"],
    ["👖 hlače",      ["trousers", "trausers", "truosers", "trousres"],      "trousers"],
    ["suknja",        ["skirt", "skert", "skirtt", "skyrt"],                 "skirt"],
    ["👔 košulja",    ["shirt", "shert", "shirtt", "shrit"],                 "shirt"],
    ["🧦 čarape",     ["socks", "sokcs", "sockz", "sokks"],                  "socks"],
    ["👞 cipele",     ["shoes", "shuus", "shoez", "shoess"],                 "shoes"],
    ["👟 tenisice",   ["trainers", "treiners", "trainars", "trainerz"],      "trainers"]]}
]}

];
