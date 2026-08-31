/* Zadaci: Hrvatski jezik, gradivo 2. razreda.

   Uz "calc" (upis) i "note" (vjezbenica) koristi se i tip "izbor":
     items: [ [prikaz, [ponudeno, …], odgovor], … ]
   prikaz  ono sto stoji uz tipke; smije biti "" kad su tipke same rijeci
   Tocan odgovor mora biti medu ponudenima. Tipke se premjesaju pri
   iscrtavanju, pa poredak u podacima nista ne odaje.                       */

const ZADACI_HRVATSKI = [

{id:"h2", nav:"Č ili Ć", title:"Č ili Ć",
 lead:"Izgovori riječ u sebi: ć je mekše, č je tvrđe. Na kraju i dž i đ.", tasks:[
  {t:"izbor", q:"Odaberi slovo koje pripada u riječ.", items:[
    ["ku_a (dom)",      ["ć","č"],  "ć"],
    ["_ovjek",          ["č","ć"],  "č"],
    ["no_",             ["ć","č"],  "ć"],
    ["klju_",           ["č","ć"],  "č"],
    ["cvije_e",         ["ć","č"],  "ć"],
    ["ru_nik",          ["č","ć"],  "č"],
    ["sre_a",           ["ć","č"],  "ć"],
    ["_okolada",        ["č","ć"],  "č"],
    ["ma_ka",           ["č","ć"],  "č"],
    ["vo_e",            ["ć","č"],  "ć"],
    ["_izma",           ["č","ć"],  "č"],
    ["pomo_",           ["ć","č"],  "ć"],
    ["ro_ak",           ["đ","dž"], "đ"],
    ["_ep (na hlačama)", ["dž","ž"], "dž"]]}
]}

];
