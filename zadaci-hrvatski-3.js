/* Zadaci: Hrvatski jezik, gradivo 3. razreda -- glagoli.

   Tip "glagol" ima dva koraka po recenici:
     items: [ [recenica, glagol, vrsta], … ]
   recenica  ispisuje se rijec po rijec, svaka rijec je tipka
   glagol    rijec iz recenice koju treba dotaknuti, bez recenicnog znaka,
             tocno kako pise u recenici (i veliko slovo na pocetku)
   vrsta     "radnje", "stanja" ili "zbivanja" -- pita se tek kad je glagol naden

   Pravila za recenice: tocno jedan glagol, u prezentu, bez pomocnih glagola
   (je, ce, bi) i bez povratnih glagola (se), i nijedna rijec se ne ponavlja
   u istoj recenici -- inace tap ne bi bio jednoznacan.                      */

const ZADACI_HRVATSKI_3 = [

{id:"g1", nav:"Kratke rečenice", title:"Glagoli u kratkim rečenicama",
 lead:"Glagol radnje kaže što tko radi (crta, trči). Glagol stanja kaže u kakvom je tko stanju (spava, sjedi). Glagol zbivanja kaže što se događa u prirodi (kiši, cvjeta).", tasks:[
  {t:"glagol", q:"Dotakni glagol u rečenici, a zatim odaberi što on izriče.", items:[
    ["Maja crta cvijet.",          "crta",    "radnje"],
    ["Djed spava u naslonjaču.",   "spava",   "stanja"],
    ["Vani kiši.",                 "kiši",    "zbivanja"],
    ["Luka trči po igralištu.",    "trči",    "radnje"],
    ["Mačka leži na kauču.",       "leži",    "stanja"],
    ["Zimi sniježi.",              "sniježi", "zbivanja"],
    ["Mama kuha ručak.",           "kuha",    "radnje"],
    ["Baka sjedi na klupi.",       "sjedi",   "stanja"],
    ["Ruža cvjeta u vrtu.",        "cvjeta",  "zbivanja"],
    ["Ivan piše zadaću.",          "piše",    "radnje"]]}
]},

{id:"g2", nav:"Dulje rečenice", title:"Glagoli u duljim rečenicama",
 lead:"Rečenice su dulje, ali glagol je i dalje samo jedan. Pitaj se: što tko radi, u kakvom je stanju ili što se zbiva?", tasks:[
  {t:"glagol", q:"Dotakni glagol u rečenici, a zatim odaberi što on izriče.", items:[
    ["Moj mlađi brat svako jutro pere zube.",          "pere",   "radnje"],
    ["Stari pas mirno drijema ispred kuće.",           "drijema","stanja"],
    ["Iznad visokih planina snažno grmi.",             "grmi",   "zbivanja"],
    ["Učiteljica djeci čita zanimljivu priču.",        "čita",   "radnje"],
    ["Visoki vojnik nepomično stoji pred vratima.",    "stoji",  "stanja"],
    ["Hladan vjetar puše s mora.",                     "puše",   "zbivanja"],
    ["Vrijedni pekar rano ujutro mijesi tijesto.",     "mijesi", "radnje"],
    ["Šareni kaput visi na vješalici.",                "visi",   "stanja"],
    ["U proljeće trava brzo raste.",                   "raste",  "zbivanja"],
    ["Dječaci na livadi veselo skaču.",                "skaču",  "radnje"]]}
]},

{id:"g3", nav:"Glagol se skriva", title:"Glagol se skriva",
 lead:"Glagol ne stoji uvijek na istome mjestu. Može biti prva ili zadnja riječ u rečenici.", tasks:[
  {t:"glagol", q:"Dotakni glagol u rečenici, a zatim odaberi što on izriče.", items:[
    ["Šuti cijeli razred.",                        "Šuti",     "stanja"],
    ["Sijeva nad dalekim brdima.",                 "Sijeva",   "zbivanja"],
    ["Na grani dvije ptice glasno pjevaju.",       "pjevaju",  "radnje"],
    ["Umorni planinari leže u hladu.",             "leže",     "stanja"],
    ["Bez vode cvijeće u vazi vene.",              "vene",     "zbivanja"],
    ["Tata i Marko u dvorištu grade kućicu.",      "grade",    "radnje"],
    ["Mala žaba čuči na lopoču.",                  "čuči",     "stanja"],
    ["Na istoku polako sviće.",                    "sviće",    "zbivanja"],
    ["Vrtlar svake večeri zalijeva rajčice.",      "zalijeva", "radnje"],
    ["Djeca tiho sjede u kinu.",                   "sjede",    "stanja"],
    ["U voćnjaku trešnje već zriju.",              "zriju",    "zbivanja"],
    ["Ljeti sunce jako sja.",                      "sja",      "zbivanja"]]}
]}

];
