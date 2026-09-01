/* Zadaci: Hrvatski jezik, gradivo 6. razreda.

   SKELET. Prava sadrzajna cjelina dolazi u specu E. Jezgra su OS HJ A.6.5
   (promjenjive vrste rijeci) i A.6.6 (jezicna raznolikost), uz pravopis;
   B.6.2 ide kao "izbor", a produktivni ishodi kao "note".                */

const ZADACI_HRVATSKI_6 = [
{id:"h1", nav:"Glagolska vremena", title:"Glagolska vremena",
 lead:"Prepoznavanje vremena u kojem je glagol.", tasks:[
  {t:"izbor", q:"U kojem je vremenu glagol?", items:[
    ["Čitao sam knjigu.", ["perfekt","prezent"], "perfekt"],
    ["Čitam knjigu.",     ["prezent","futur"],   "prezent"],
    ["Čitat ću knjigu.",  ["futur","perfekt"],   "futur"]]}
]}
];
