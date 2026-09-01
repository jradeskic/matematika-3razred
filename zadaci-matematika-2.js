/* Zadaci: Matematika, gradivo 2. razreda.

   Struktura cjeline:
     { id, nav, title, lead, tasks: [ … ] }
   id    oznaka za sidro i za kljuceve pamcenja (c1…c7)
   nav   tekst linka u navigaciji, krace od naslova
   title naslov cjeline
   lead  podnaslov
   Tipovi zadataka su opisani u READMEu.                                     */

const ZADACI_MATEMATIKA_2 = [
{id:"c1", nav:"Brojevi do 100", title:"Brojevi do 100", lead:"Desetice i jedinice, usporedivanje, nizovi, parni i neparni brojevi.", tasks:[
  {t:"calc", q:"Rastavi na desetice i jedinice — upiši koliko je desetica, a koliko jedinica (npr. 4D3J).",
   items:[["63","6D3J"],["90","9D0J"],["58","5D8J"],["47","4D7J"]]},
  {t:"calc", q:"Upiši znak <span aria-hidden=\"true\">&lt;</span>, <span aria-hidden=\"true\">&gt;</span> ili =",
   items:[["47 __ 74","<"],["39 __ 39","="],["80 __ 79",">"],["5 + 6 __ 12","<"]]},
  {t:"calc", q:"Nastavi niz — upiši sljedeća tri broja odvojena zarezom.",
   items:[["10, 20, 30, …","40,50,60"],["55, 60, 65, …","70,75,80"],["100, 90, 80, …","70,60,50"]]},
  {t:"calc", q:"Prethodnik i sljedbenik",
   items:[["prethodnik broja 70","69"],["sljedbenik broja 89","90"],["prethodnik broja 100","99"]]},
  {t:"calc", q:"Poredaj od najmanjeg do najvećeg (odvoji zarezom): 38, 83, 8, 80, 33",
   items:[["poredak","8,33,38,80,83"]]},
  {t:"calc", q:"Koji su od ovih brojeva parni? Upiši ih odvojene zarezom: 12, 15, 20, 27, 34, 41, 50",
   items:[["parni","12,20,34,50"]]},
  {t:"note", q:"Napiši riječima brojeve 47, 60, 89 i 100.",
   solution:"četrdeset sedam, šezdeset, osamdeset devet, sto"}
]},

{id:"c2", nav:"Zbrajanje i oduzimanje", title:"Zbrajanje i oduzimanje do 100", lead:"Prvo bez prelaska desetice, zatim s prelaskom. Pazi na zagrade.", tasks:[
  {t:"calc", q:"Bez prelaska desetice", items:[["34 + 25","59"],["71 + 18","89"],["56 − 23","33"],["98 − 47","51"]]},
  {t:"calc", q:"S prelaskom desetice", items:[["47 + 28","75"],["39 + 26","65"],["65 − 27","38"],["82 − 49","33"]]},
  {t:"calc", q:"Prvo izračunaj u zagradi", items:[["25 + (30 − 12)","43"],["(44 + 16) − 25","35"],["100 − (35 + 45)","20"]]},
  {t:"calc", q:"Koji broj nedostaje?", items:[["36 + ? = 50","14"],["? − 18 = 22","40"],["70 − ? = 45","25"]]},
  {t:"calc", q:"Izračunaj, a onda provjeri zbrajanjem: 63 − 29",
   items:[["63 − 29","34"],["provjera: 34 + ? = 63","29"]]}
]},

{id:"c3", nav:"Množenje i dijeljenje", title:"Tablica množenja i dijeljenja do 100", lead:"Najvažnija cjelina — na njoj se u 3. razredu gradi računanje do 1000.", tasks:[
  {t:"calc", q:"Množenje", items:[["3 · 7","21"],["6 · 8","48"],["9 · 4","36"],["7 · 7","49"],["5 · 9","45"],["8 · 8","64"]]},
  {t:"calc", q:"Dijeljenje", items:[["24 : 6","4"],["42 : 7","6"],["56 : 8","7"],["81 : 9","9"],["35 : 5","7"],["100 : 10","10"]]},
  {t:"calc", q:"Zapiši zbrajanje kao množenje: 6 + 6 + 6 + 6", items:[["koliko je","24"],["množitelj (? · 6)","4"]]},
  {t:"calc", q:"Koji broj nedostaje?", items:[["4 · ? = 32","8"],["? · 7 = 63","9"],["48 : ? = 6","8"],["? : 9 = 5","45"]]},
  {t:"calc", q:"Dvostruko, trostruko, polovina", items:[["dvostruko od 24","48"],["polovina od 36","18"],["trostruko od 9","27"]]},
  {t:"calc", q:"Množenje ima prednost pred zbrajanjem i oduzimanjem.",
   items:[["3 · 5 + 12","27"],["40 − 4 · 6","16"],["2 · 8 + 3 · 4","28"]]},
  {t:"note", q:"Iz 7 · 8 = 56 napiši dva zadatka s dijeljenjem.", solution:"56 : 8 = 7 i 56 : 7 = 8"}
]},

{id:"c4", nav:"Zadaci riječima", title:"Zadaci riječima", lead:"Pročitaj dva puta, pa zapiši račun. Upiši samo broj.", tasks:[
  {t:"calc", q:"U razredu je 14 djevojčica i 12 dječaka. Koliko je učenika u razredu?", items:[["učenika","26"]]},
  {t:"calc", q:"Mama je kupila 50 jaja, a potrošila 18. Koliko je jaja ostalo?", items:[["jaja","32"]]},
  {t:"calc", q:"U jednoj kutiji je 8 bombona. Koliko je bombona u 7 kutija?", items:[["bombona","56"]]},
  {t:"calc", q:"45 kolača dijelimo jednako na 9 tanjura. Koliko kolača ide na jedan tanjur?", items:[["kolača","5"]]},
  {t:"calc", q:"Ivan je imao 20 €. Kupio je knjigu za 8 € i olovku za 3 €. Koliko mu je ostalo?", items:[["eura","9"]]},
  {t:"calc", q:"Luka ima 7 godina, a sestra je 3 puta starija. Koliko godina ima sestra?", items:[["godina","21"]]},
  {t:"calc", q:"Autobus je krenuo u 8 sati i putovao 3 sata. U koliko je sati stigao?", items:[["sati","11"]]},
  {t:"calc", q:"Marko je pročitao 24 stranice, a Ana dvostruko manje. Koliko je stranica pročitala Ana?", items:[["stranica","12"]]}
]},

{id:"c5", nav:"Geometrija", title:"Geometrija", lead:"Ovi se zadaci rješavaju u vježbenici, ravnalom i olovkom.", tasks:[
  {t:"calc", q:"Koliko vrhova ima lik?", items:[["trokut","3"],["kvadrat","4"],["pravokutnik","4"]]},
  {t:"note", q:"Objasni i nacrtaj po jedan primjer: točka, dužina, pravac, polupravac.",
   solution:"Pravac je bez početka i kraja, polupravac ima početnu točku, dužina ima obje krajnje točke."},
  {t:"note", q:"Nacrtaj dužinu duljine 6 cm i označi je s AB. Zatim kvadrat stranice 4 cm i pravokutnik stranica 5 cm i 3 cm."},
  {t:"note", q:"Koja su od ovih geometrijska tijela, a koji likovi: kocka, krug, kvadar, trokut, kugla, valjak?",
   solution:"Tijela: kocka, kvadar, kugla, valjak. Likovi: krug, trokut."},
  {t:"note", q:"Nacrtaj dva pravca koja se sijeku pod pravim kutom i dva pravca koja se nikad ne sijeku."}
]},

{id:"c6", nav:"Mjerenje", title:"Mjerenje", lead:"Duljina, masa, tekućina, vrijeme i novac.", tasks:[
  {t:"calc", q:"Pretvori (upiši samo broj)", items:[["1 m = ? cm","100"],["3 dm = ? cm","30"],["200 cm = ? m","2"],["1 kg = ? g","1000"]]},
  {t:"calc", q:"Izračunaj (upiši samo broj)", items:[["45 cm + 25 cm = ? cm","70"],["2 m − 60 cm = ? cm","140"],["5 kg + 12 kg = ? kg","17"],["10 l − 4 l = ? l","6"]]},
  {t:"calc", q:"Vrijeme", items:[["1 sat = ? minuta","60"],["pola sata = ? minuta","30"],["tri četvrt sata = ? minuta","45"]]},
  {t:"calc", q:"Imaš kovanice 2 €, 1 €, 50 centi i 20 centi. Koliko ukupno imaš? (npr. 1,50)", items:[["ukupno €","3,70"]]},
  {t:"note", q:"Pročitaj vrijeme na dva načina: 07:30, 12:15, 18:45.",
   solution:"pola osam ujutro; dvanaest i petnaest; petnaest do sedam poslijepodne"},
  {t:"note", q:"Danas je srijeda. Koji je dan bio prekjučer, a koji će biti za 4 dana?",
   solution:"prekjučer ponedjeljak, za 4 dana nedjelja"}
]},

{id:"c7", nav:"Podaci i logika", title:"Podaci i logika", lead:"Čitanje tablice i zadaci „mislim broj“.", tasks:[
  {t:"calc", q:"Pročitane knjige:", table:[["Ime","Knjige"],["Ana","8"],["Marko","5"],["Iva","11"],["Luka","5"]],
   items:[["ukupno knjiga","29"],["Iva ima više od Marka za","6"],["najviše je pročitala (ime)","Iva"]]},
  {t:"calc", q:"Mislim broj. Kad mu dodam 15, dobijem 42. Koji je broj?", items:[["broj","27"]]},
  {t:"calc", q:"Mislim broj. Kad ga pomnožim sa 6, dobijem 54. Koji je broj?", items:[["broj","9"]]},
  {t:"calc", q:"Nastavi uzorak: 2, 4, 8, 16, …", items:[["sljedeći broj","32"]]}
]}
];
