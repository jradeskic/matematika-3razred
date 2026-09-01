/* Zadaci: Matematika, gradivo 5. razreda.

   Cjeline slijede ishode iz Odluke o donosenju kurikuluma za nastavni predmet
   Matematika za osnovne skole i gimnazije, NN 7/2019. Oznaka ishoda stoji u
   komentaru uz svaku cjelinu.

   Polje "oblik" deklarira kako se odgovor provjerava:
     "broj"     cijeli ili decimalni broj, po vrijednosti (- i minus isti znak, , = .)
     "razlomak" po vrijednosti, egzaktnom racionalnom aritmetikom
     "popis"    razdvoji zarezom, svaki clan po pravilu broj, poredak bitan
     "tekst"    tocan zapis; dijakritika, veliko slovo i ² su bitni
   Tipovi zadataka su opisani u READMEu.

   Napomena o zapisu: provjera broja ne prihvaca razmak kao razdjelnik tisucica,
   pa zadaci s cetverocifrenim odgovorom izricito trazu upis bez razmaka.       */

const ZADACI_MATEMATIKA_5 = [

/* MAT OS A.5.1 (brojevni izraz, usporedivanje), A.5.6 (zaokruzivanje) */
{id:"c1", nav:"Prirodni brojevi", title:"Prirodni brojevi i zaokruživanje",
 lead:"Računanje, uspoređivanje, redoslijed operacija i zaokruživanje.", tasks:[
  {t:"calc", oblik:"broj", q:"Izračunaj.",
   items:[["120 + 380","500"],["950 − 275","675"],["25 · 12","300"],["840 : 7","120"]]},
  {t:"calc", oblik:"tekst", q:"Upiši znak <span aria-hidden=\"true\">&lt;</span>, <span aria-hidden=\"true\">&gt;</span> ili =",
   items:[["12 500 __ 12 050",">"],["7 · 8 __ 60","<"],["3 · 100 __ 300","="]]},
  {t:"calc", oblik:"broj", q:"Prvo izračunaj u zagradi.",
   items:[["(45 + 15) · 3","180"],["100 − (12 · 5)","40"],["(72 : 8) + 19","28"]]},
  {t:"calc", oblik:"broj", q:"Zaokruži na najbližu stoticu. Upiši broj bez razmaka.",
   items:[["2480","2500"],["3519","3500"],["948","900"]]},
  {t:"calc", oblik:"broj", q:"Zaokruži na najbližu tisućicu. Upiši broj bez razmaka.",
   items:[["4620","5000"],["8210","8000"]]},
  {t:"izbor", q:"Koliko iznosi potencija?", items:[
    ["10²", ["100","20"],   "100"],
    ["10³", ["1000","30"],  "1000"],
    ["10¹", ["10","1"],     "10"]]},
  {t:"note", q:"Napiši riječima broj 1 250 306.",
   solution:"milijun dvjesto pedeset tisuća tristo šest"}
]},

/* MAT OS A.5.2 (djeljivost, prosti faktori) */
{id:"c2", nav:"Djeljivost", title:"Djeljivost i prosti brojevi",
 lead:"Pravila djeljivosti, djelitelji, prosti i složeni brojevi.", tasks:[
  {t:"izbor", q:"Je li broj djeljiv s 3?", items:[
    ["123", ["da","ne"], "da"],
    ["241", ["da","ne"], "ne"],
    ["504", ["da","ne"], "da"]]},
  {t:"izbor", q:"Je li broj djeljiv s 9?", items:[
    ["108", ["da","ne"], "da"],
    ["235", ["da","ne"], "ne"]]},
  {t:"izbor", q:"Je li broj prost ili složen?", items:[
    ["17", ["prost","složen"], "prost"],
    ["21", ["prost","složen"], "složen"],
    ["29", ["prost","složen"], "prost"],
    ["51", ["prost","složen"], "složen"]]},
  {t:"calc", oblik:"popis", q:"Rastavi na proste faktore — upiši faktore odvojene zarezom, od najmanjeg.",
   items:[["12","2,2,3"],["18","2,3,3"],["45","3,3,5"],["100","2,2,5,5"]]},
  {t:"calc", oblik:"popis", q:"Upiši sve djelitelje broja, odvojene zarezom, od najmanjeg.",
   items:[["12","1,2,3,4,6,12"],["20","1,2,4,5,10,20"]]},
  {t:"calc", oblik:"broj", q:"Odgovori brojem.",
   items:[["najmanji broj veći od 50 koji je djeljiv s 9","54"],
          ["najveći broj manji od 100 koji je djeljiv s 7","98"]]},
  {t:"note", q:"Objasni po čemu odmah znaš da je broj 4 320 djeljiv s 2, s 5 i s 10.",
   solution:"završava nulom: djeljiv je s 2 jer je zadnja cifra parna, s 5 i s 10 jer završava nulom"}
]},

/* MAT OS A.5.3 (prikazi razlomaka) */
{id:"c3", nav:"Razlomci", title:"Razlomci",
 lead:"Zapis razlomka, mješoviti broj, dio cjeline i uspoređivanje.", tasks:[
  {t:"calc", oblik:"razlomak", q:"Koliki je to razlomak? Zapiši u obliku 2/7.",
   items:[["tri četvrtine","3/4"],["pet osmina","5/8"],["dvije trećine","2/3"]]},
  {t:"calc", oblik:"tekst", q:"Pretvori u mješoviti broj. Zapiši u obliku 2 1/3.",
   items:[["7/2","3 1/2"],["11/4","2 3/4"],["9/5","1 4/5"]]},
  {t:"calc", oblik:"tekst", q:"Pretvori u nepravi razlomak. Zapiši u obliku 8/3.",
   items:[["3 1/2","7/2"],["2 3/4","11/4"],["1 4/5","9/5"]]},
  {t:"calc", oblik:"broj", q:"Koliko je?",
   items:[["3/4 od 20","15"],["2/5 od 45","18"],["5/6 od 30","25"]]},
  {t:"izbor", q:"Koji je razlomak veći?", items:[
    ["1/2 ili 1/3", ["1/2","1/3"], "1/2"],
    ["3/4 ili 2/3", ["3/4","2/3"], "3/4"],
    ["5/8 ili 1/2", ["5/8","1/2"], "5/8"]]},
  {t:"izbor", q:"Kakav je razlomak?", items:[
    ["3/5",  ["pravi","nepravi"], "pravi"],
    ["7/4",  ["pravi","nepravi"], "nepravi"],
    ["9/9",  ["pravi","nepravi"], "nepravi"]]},
  {t:"note", q:"Nacrtaj kružnicu, podijeli je na 8 jednakih dijelova i oboji 5/8.",
   solution:"pet od osam isječaka je obojeno"}
]},

/* MAT OS A.5.4 (zapisi decimalnoga broja), A.5.5 (racunanje s decimalnim brojevima) */
{id:"c4", nav:"Decimalni brojevi", title:"Decimalni brojevi",
 lead:"Računanje, uspoređivanje i zaokruživanje decimalnih brojeva.", tasks:[
  {t:"calc", oblik:"broj", q:"Izračunaj.",
   items:[["2,5 + 1,75","4,25"],["6,4 − 2,9","3,5"],["1,2 · 3","3,6"],["4,5 : 5","0,9"]]},
  {t:"calc", oblik:"broj", q:"Izračunaj.",
   items:[["0,3 · 0,4","0,12"],["2,4 : 0,6","4"],["1 − 0,35","0,65"]]},
  {t:"izbor", q:"Kako se razlomak zapisuje decimalnim brojem?", items:[
    ["1/2", ["0,5","0,2"],   "0,5"],
    ["3/4", ["0,75","0,34"], "0,75"],
    ["1/4", ["0,25","0,14"], "0,25"],
    ["2/5", ["0,4","0,25"],  "0,4"]]},
  {t:"calc", oblik:"tekst", q:"Upiši znak <span aria-hidden=\"true\">&lt;</span>, <span aria-hidden=\"true\">&gt;</span> ili =",
   items:[["0,7 __ 0,65",">"],["1,20 __ 1,2","="],["3,09 __ 3,1","<"]]},
  {t:"calc", oblik:"broj", q:"Zaokruži na jednu decimalu.",
   items:[["3,47","3,5"],["12,82","12,8"],["0,96","1"]]},
  {t:"note", q:"Objasni zašto je 1,20 jednako 1,2, a 0,12 nije jednako 0,2.",
   solution:"nula na kraju decimalnog dijela ne mijenja vrijednost; 0,12 ima jednu desetinu i dvije stotinke, a 0,2 dvije desetine"}
]},

/* MAT OS B.5.1 (linearna jednadzba), B.5.2 (skupovi) */
{id:"c5", nav:"Jednadžbe i skupovi", title:"Jednadžbe i skupovi",
 lead:"Nepoznanica u jednadžbi, presjek i unija skupova.", tasks:[
  {t:"calc", oblik:"broj", q:"Riješi jednadžbu — upiši vrijednost x.",
   items:[["4x = 32","8"],["7x = 84","12"],["x + 15 = 40","25"],["x − 12 = 30","42"]]},
  {t:"calc", oblik:"broj", q:"Riješi jednadžbu — upiši vrijednost x.",
   items:[["2,5x = 10","4"],["x : 6 = 9","54"],["3x + 5 = 26","7"]]},
  {t:"calc", oblik:"broj", q:"Koliko elemenata ima skup?",
   items:[["A = {2, 4, 6, 8, 10}","5"],["B = {a, b, c}","3"],["prazan skup","0"]]},
  {t:"izbor", q:"A = {1, 2, 3, 4}, B = {3, 4, 5}. Odaberi točno.", items:[
    ["presjek A ∩ B", ["{3, 4}","{1, 2}"],                  "{3, 4}"],
    ["unija A ∪ B",   ["{1, 2, 3, 4, 5}","{3, 4}"],         "{1, 2, 3, 4, 5}"]]},
  {t:"calc", oblik:"broj", q:"Zapiši jednadžbom i riješi — upiši samo rezultat.",
   items:[["Ako broj pomnožim s 6, dobijem 54. Koji je broj?","9"],
          ["Zamislila sam broj, dodala 18 i dobila 45. Koji je broj?","27"]]},
  {t:"note", q:"Napiši jednadžbu za zadatak: bilježnica košta 8 €, a knjiga x €. Zajedno koštaju 23 €. Koliko košta knjiga?",
   solution:"8 + x = 23, x = 15"}
]},

/* MAT OS C.5.1, C.5.2, C.5.3 (skupovi tocaka, likovi, simetrija), D.5.1 (mjera kuta) */
{id:"c6", nav:"Geometrija i kutovi", title:"Geometrija i kutovi",
 lead:"Vrste kutova, susjedni i vršni kutovi, likovi, kružnica i simetrija.", tasks:[
  {t:"izbor", q:"Kako se zove kut te mjere?", items:[
    ["40°",  ["šiljasti","tupi"],     "šiljasti"],
    ["120°", ["tupi","šiljasti"],     "tupi"],
    ["90°",  ["pravi","puni"],        "pravi"],
    ["180°", ["ispruženi","puni"],    "ispruženi"],
    ["360°", ["puni","ispruženi"],    "puni"]]},
  {t:"calc", oblik:"broj", q:"Upiši mjeru kuta u stupnjevima, bez znaka °.",
   items:[["susjedni kut kutu od 65°","115"],
          ["vršni kut kutu od 65°","65"],
          ["kut koji s kutom od 30° daje pravi kut","60"],
          ["koliko minuta ima 1°","60"]]},
  {t:"izbor", q:"Kako se zove taj dio kružnice?", items:[
    ["dužina od središta do kružnice",                    ["polumjer","promjer"], "polumjer"],
    ["dužina kroz središte, od kružnice do kružnice",     ["promjer","tetiva"],   "promjer"],
    ["dužina koja spaja dvije točke kružnice",            ["tetiva","polumjer"],  "tetiva"]]},
  {t:"calc", oblik:"broj", q:"Kružnica ima polumjer 6 cm. Upiši samo broj.",
   items:[["promjer u centimetrima","12"]]},
  {t:"izbor", q:"Ima li lik os simetrije?", items:[
    ["kvadrat",              ["da","ne"], "da"],
    ["jednakokračni trokut", ["da","ne"], "da"],
    ["raznostranični trokut",["da","ne"], "ne"]]},
  {t:"izbor", q:"Ima li lik centar simetrije?", items:[
    ["kvadrat",              ["da","ne"], "da"],
    ["paralelogram",         ["da","ne"], "da"],
    ["jednakokračni trokut", ["da","ne"], "ne"]]},
  {t:"note", q:"Nacrtaj dužinu AB i njezinu os simetrije. Kakav kut os zatvara s dužinom?",
   solution:"pravi kut, 90°; os prolazi polovištem dužine"}
]},

/* MAT OS D.5.2 (mjerne jedinice), D.5.3 (novac), D.5.4 (opseg i povrsina), D.5.5 (volumen) */
{id:"c7", nav:"Mjerenje i površina", title:"Mjerenje, opseg, površina i volumen",
 lead:"Pretvaranje jedinica, novac, opseg i površina likova, volumen kocke i kvadra.", tasks:[
  {t:"calc", oblik:"broj", q:"Pretvori u centimetre. Upiši samo broj.",
   items:[["3 m","300"],["45 mm","4,5"],["2,5 dm","25"]]},
  {t:"calc", oblik:"broj", q:"Pretvori u grame. Upiši samo broj, bez razmaka.",
   items:[["2 kg","2000"],["5 dag","50"],["1,5 kg","1500"]]},
  {t:"calc", oblik:"broj", q:"Pretvori u minute. Upiši samo broj.",
   items:[["2 h","120"],["1 h 15 min","75"],["180 s","3"]]},
  {t:"calc", oblik:"broj", q:"Pretvori u litre. Upiši samo broj.",
   items:[["2 hl","200"],["5 dl","0,5"],["250 ml","0,25"]]},
  {t:"calc", oblik:"broj", q:"Opseg i površina — upiši samo broj.",
   items:[["opseg kvadrata stranice 7 cm","28"],
          ["površina kvadrata stranice 7 cm","49"],
          ["opseg pravokutnika stranica 8 cm i 3 cm","22"],
          ["površina pravokutnika stranica 8 cm i 3 cm","24"]]},
  {t:"calc", oblik:"broj", q:"Volumen — upiši samo broj.",
   items:[["volumen kocke ruba 4 cm","64"],
          ["volumen kvadra 5 cm, 3 cm i 2 cm","30"]]},
  {t:"calc", oblik:"broj", q:"Novac — upiši samo broj eura.",
   items:[["koliko koštaju 3 kruha po 1,20 €","3,6"],
          ["cijena 1 kg ako 2 kg košta 7,40 €","3,7"],
          ["koliko ostane od 20 € nakon računa od 13,50 €","6,5"]]},
  {t:"izbor", q:"Koja je mjerna jedinica za površinu?", items:[
    ["", ["cm²","cm"],  "cm²"],
    ["", ["m²","m³"],   "m²"]]},
  {t:"note", q:"Soba je 4 m dugačka i 3 m široka. Koliko m² parketa treba, a koliko metara letvica uz rub?",
   solution:"površina 12 m², opseg 14 m"}
]},

/* MAT OS E.5.1 (baratanje podacima) */
{id:"c8", nav:"Podaci", title:"Podaci i dijagrami",
 lead:"Čitanje podataka iz popisa i crtanje dijagrama.", tasks:[
  {t:"calc", oblik:"broj", q:"Ocjene iz matematike u skupini učenika: 5, 4, 4, 3, 5, 5, 2. Odgovori brojem.",
   items:[["koliko učenika ima ocjenu 5","3"],
          ["koliko ih je ukupno","7"],
          ["koja je ocjena najčešća","5"],
          ["koliko učenika ima ocjenu manju od 4","2"]]},
  {t:"calc", oblik:"broj", q:"U tjednu je pala ova količina kiše u mm: 4, 0, 12, 7, 0, 2, 3. Odgovori brojem.",
   items:[["koliko je dana bilo bez kiše","2"],
          ["koliko je ukupno palo mm kiše","28"],
          ["koliko mm je palo najviše u jednom danu","12"]]},
  {t:"izbor", q:"U uspravnome stupčastom dijagramu, što se nanosi na vodoravnu os?", items:[
    ["", ["obilježja podataka","broj elemenata"], "obilježja podataka"]]},
  {t:"note", q:"Nacrtaj stupčasti dijagram za ocjene 5, 4, 4, 3, 5, 5, 2.",
   solution:"stupci: ocjena 2 → 1, ocjena 3 → 1, ocjena 4 → 2, ocjena 5 → 3"}
]}
];
