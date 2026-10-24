/* Zadaci: Povijest, gradivo 7. razreda.

   Cjeline slijede teme 7. razreda iz kurikuluma nastavnoga predmeta Povijest:
   doba prosvjetiteljstva, doba gradanskih revolucija (americki rat za
   nezavisnost), Francuska revolucija, osvajacki ratovi Napoleona Bonapartea,
   doba industrijskih revolucija, razvoj gradova i ideologije 19. stoljeca.
   Uz svaku temu ide i hrvatski primjer (Marija Terezija i Josip II., Ilirske
   pokrajine, prva zeljeznica, Zagreb, 1848. godina).

   Godine se namjerno pitaju kao "izbor", ne kao upis: hrvatski pravopis pise
   godinu s tockom (1789.), pa bi upis bez tocke ili s njom zbunio provjeru.
   Upis ("calc") trazi samo jednu rijec ili ime, bez dvojbe oko oblika.

   Povijest nema polje "oblik" -- provjera je po predmetu kao u hrvatskom:
   veliko i malo slovo i dijakritika su bitni. Zadnja cjelina su "note"
   zadaci (vremenska crta, rad s izvorom, usporedba) -- za vjezbenicu, bez
   ocjenjivanja. Tipovi zadataka su opisani u READMEu.                      */

const ZADACI_POVIJEST_7 = [

/* doba prosvjetiteljstva */
{id:"p1", nav:"Prosvjetiteljstvo", title:"Doba prosvjetiteljstva",
 lead:"Razum, prosvjetitelji i njihova djela, prosvijećeni apsolutizam.", tasks:[
  {t:"izbor", q:"Tko je autor djela?", items:[
    ["O duhu zakona",     ["Montesquieu","Rousseau"],      "Montesquieu"],
    ["Društveni ugovor",  ["Rousseau","Voltaire"],         "Rousseau"],
    ["Kandid",            ["Voltaire","Montesquieu"],      "Voltaire"],
    ["Bogatstvo naroda",  ["Adam Smith","John Locke"],     "Adam Smith"]]},
  {t:"izbor", q:"Na kojega se prosvjetitelja odnosi opis?", items:[
    ["predložio diobu vlasti na zakonodavnu, izvršnu i sudsku", ["Montesquieu","Voltaire"],   "Montesquieu"],
    ["uređivao Enciklopediju",                                   ["Diderot","Rousseau"],       "Diderot"],
    ["pisao o prirodnim pravima na život, slobodu i vlasništvo",  ["John Locke","Adam Smith"],  "John Locke"],
    ["autor misli Mislim, dakle jesam",                           ["Descartes","Montesquieu"],  "Descartes"]]},
  {t:"izbor", q:"Je li tvrdnja točna?", items:[
    ["Prosvjetitelji su vjerovali da je razum najvažniji izvor spoznaje.", ["točno","netočno"], "točno"],
    ["Prosvjetiteljstvo je vrhunac doživjelo u 18. stoljeću.",            ["točno","netočno"], "točno"],
    ["Enciklopedija je objavljena u Engleskoj.",                          ["netočno","točno"], "netočno"],
    ["Prosvjetitelji su podržavali neograničenu vlast vladara.",          ["netočno","točno"], "netočno"]]},
  {t:"izbor", q:"Koji je vladar proveo reformu?", items:[
    ["uvela obvezno osnovno školovanje (1774.)",   ["Marija Terezija","Katarina II."], "Marija Terezija"],
    ["izdao Patent o vjerskoj toleranciji (1781.)", ["Josip II.","Friedrich II."],      "Josip II."],
    ["pruski kralj, govorio da je prvi sluga svoje države", ["Friedrich II.","Josip II."], "Friedrich II."],
    ["uveo njemački kao službeni jezik Monarhije",  ["Josip II.","Marija Terezija"],    "Josip II."]]},
  {t:"izbor", q:"Kako se zove pojam?", items:[
    ["vladar provodi reforme u duhu prosvjetiteljstva, ali zadržava svu vlast", ["prosvijećeni apsolutizam","parlamentarna monarhija"], "prosvijećeni apsolutizam"],
    ["gospodarska misao da je država bogata kad više izvozi nego uvozi",        ["merkantilizam","liberalizam"], "merkantilizam"],
    ["gospodarska misao da država ne treba upravljati tržištem",               ["liberalizam","merkantilizam"], "liberalizam"]]},
  {t:"calc", q:"Dopuni rečenicu jednom riječju.", items:[
    ["Prosvjetitelji su vjerovali u snagu ljudskoga ____.", "razuma"],
    ["Montesquieu je vlast podijelio na zakonodavnu, izvršnu i ____.", "sudsku"]]},
  {t:"note", q:"Objasni vlastitim riječima zašto je dioba vlasti važna za slobodu građana.",
   solution:"kad zakone donosi jedno tijelo, provodi drugo, a sudi treće, nitko nema svu vlast i ne može je zloupotrijebiti"}
]},

/* doba gradanskih revolucija: americki rat za nezavisnost */
{id:"p2", nav:"Američka revolucija", title:"Američki rat za nezavisnost",
 lead:"Trinaest kolonija, Deklaracija neovisnosti i Ustav SAD-a.", tasks:[
  {t:"izbor", q:"Koje se godine dogodilo?", items:[
    ["Bostonska čajanka",                         ["1773.","1776."], "1773."],
    ["Deklaracija neovisnosti",                  ["1776.","1789."], "1776."],
    ["mir u Parizu i priznanje nezavisnosti SAD-a",["1783.","1776."], "1783."],
    ["donesen Ustav SAD-a",                       ["1787.","1773."], "1787."]]},
  {t:"izbor", q:"Na koga se odnosi opis?", items:[
    ["glavni autor Deklaracije neovisnosti",       ["Thomas Jefferson","George Washington"],  "Thomas Jefferson"],
    ["zapovjednik vojske i prvi predsjednik SAD-a", ["George Washington","Benjamin Franklin"], "George Washington"],
    ["diplomat u Francuskoj i izumitelj gromobrana",["Benjamin Franklin","Thomas Jefferson"],  "Benjamin Franklin"]]},
  {t:"izbor", q:"Odaberi točan odgovor.", items:[
    ["Protiv koje su se države borile kolonije?",       ["Velike Britanije","Francuske"], "Velike Britanije"],
    ["Koja je europska država pomogla kolonijama?",     ["Francuska","Rusija"],           "Francuska"],
    ["Koliko je kolonija proglasilo nezavisnost?",      ["13","50"],                      "13"],
    ["Što su kolonisti odbijali?",                      ["poreze bez zastupnika u parlamentu","trgovinu s Europom"], "poreze bez zastupnika u parlamentu"]]},
  {t:"izbor", q:"Koja vlast u SAD-u pripada tijelu?", items:[
    ["Kongres",       ["zakonodavna","izvršna"], "zakonodavna"],
    ["predsjednik",   ["izvršna","sudska"],      "izvršna"],
    ["Vrhovni sud",   ["sudska","zakonodavna"],  "sudska"]]},
  {t:"izbor", q:"Je li tvrdnja točna?", items:[
    ["SAD su postale republika.",                                  ["točno","netočno"], "točno"],
    ["Ustav SAD-a ostvaruje Montesquieuovu diobu vlasti.",         ["točno","netočno"], "točno"],
    ["Deklaracija neovisnosti odmah je ukinula ropstvo.",        ["netočno","točno"], "netočno"]]},
  {t:"calc", q:"Dopuni rečenicu jednom riječju.", items:[
    ["Prvi predsjednik SAD-a bio je George ____.", "Washington"],
    ["Deklaraciju neovisnosti napisao je Thomas ____.", "Jefferson"]]},
  {t:"note", q:"Navedi dva uzroka i dvije posljedice američkoga rata za nezavisnost.",
   solution:"uzroci: novi porezi i carine, kolonije nemaju zastupnike u britanskom parlamentu; posljedice: nastanak SAD-a, prvi pisani ustav i poticaj revolucijama u Europi"}
]},

/* Francuska revolucija */
{id:"p3", nav:"Francuska revolucija", title:"Francuska revolucija",
 lead:"Staleži, pad Bastilje, Deklaracija o pravima čovjeka i građanina, republika i teror.", tasks:[
  {t:"izbor", q:"Koji je to stalež?", items:[
    ["svećenstvo",                 ["prvi","drugi"],  "prvi"],
    ["plemstvo",                   ["drugi","treći"], "drugi"],
    ["građanstvo, obrtnici i seljaci", ["treći","prvi"], "treći"]]},
  {t:"izbor", q:"Koje se godine dogodilo?", items:[
    ["pad Bastilje",                                     ["1789.","1793."], "1789."],
    ["Deklaracija o pravima čovjeka i građanina",        ["1789.","1799."], "1789."],
    ["proglašenje republike",                            ["1792.","1789."], "1792."],
    ["pogubljenje kralja Luja XVI.",                     ["1793.","1799."], "1793."]]},
  {t:"izbor", q:"Na koga ili na što se odnosi opis?", items:[
    ["francuski kralj na početku revolucije",       ["Luj XVI.","Luj XIV."],              "Luj XVI."],
    ["vođa jakobinaca u doba terora",               ["Robespierre","Napoleon Bonaparte"], "Robespierre"],
    ["sprava za izvršenje smrtne kazne",            ["giljotina","Bastille"],             "giljotina"],
    ["skupština koju je kralj sazvao 1789.",        ["Državni staleži","Kongres"],        "Državni staleži"]]},
  {t:"izbor", q:"Je li tvrdnja točna?", items:[
    ["Treći stalež plaćao je gotovo sve poreze.",                ["točno","netočno"], "točno"],
    ["Plemstvo i svećenstvo plaćali su najviše poreza.",          ["netočno","točno"], "netočno"],
    ["Revolucija je počela zbog financijske krize države.",       ["točno","netočno"], "točno"],
    ["Za vrijeme terora pogubljeno je samo nekoliko ljudi.",      ["netočno","točno"], "netočno"]]},
  {t:"calc", q:"Dopuni jednom riječju.", items:[
    ["Geslo revolucije: Sloboda, jednakost, ____.", "bratstvo"],
    ["Skupština predstavnika svih staleža zvala se Državni ____.", "staleži"],
    ["Žena Luja XVI., kraljica Marija ____.", "Antoaneta"]]},
  {t:"izbor", q:"Kako se zove?", items:[
    ["ime koje su si zastupnici dali 17. lipnja 1789.",          ["Narodna skupština","Direktorij"], "Narodna skupština"],
    ["skupina koja je pravo glasa ostavila samo bogatijima",     ["žirondinci","jakobinci"],         "žirondinci"],
    ["peteročlano tijelo koje je vladalo nakon jakobinaca",      ["Direktorij","Narodna skupština"], "Direktorij"],
    ["autorica Povelje o pravima žene i građanke",               ["Olympe de Gouges","Marija Antoaneta"], "Olympe de Gouges"]]},
  {t:"izbor", q:"Poredaj: što je bilo prije?", items:[
    ["pad Bastilje ili proglašenje republike",        ["pad Bastilje","proglašenje republike"], "pad Bastilje"],
    ["jakobinski teror ili Direktorij",               ["jakobinski teror","Direktorij"],        "jakobinski teror"]]},
  {t:"note", q:"Pročitaj prvi članak Deklaracije o pravima čovjeka i građanina i objasni što je u njemu novo u odnosu na staleško društvo.",
   solution:"ljudi se rađaju i ostaju slobodni i jednaki u pravima — nema više povlastica po rođenju"}
]},

/* osvajacki ratovi Napoleona Bonapartea */
{id:"p4", nav:"Napoleon", title:"Napoleon Bonaparte i osvajački ratovi",
 lead:"Od generala do cara, ratovi, Ilirske pokrajine i Bečki kongres.", tasks:[
  {t:"izbor", q:"Koje se godine dogodilo?", items:[
    ["Napoleon se proglasio carem",       ["1804.","1799."], "1804."],
    ["bitka kod Austerlitza",             ["1805.","1815."], "1805."],
    ["pohod na Rusiju",                   ["1812.","1805."], "1812."],
    ["bitka kod Waterlooa",               ["1815.","1812."], "1815."]]},
  {t:"izbor", q:"Odaberi točan odgovor.", items:[
    ["Na kojem je otoku Napoleon rođen?",               ["Korzika","Elba"],              "Korzika"],
    ["Kamo je prvi put prognan 1814.?",                 ["Elba","Sveta Helena"],         "Elba"],
    ["Gdje je umro u progonstvu?",                      ["Sveta Helena","Korzika"],      "Sveta Helena"],
    ["Kojim je zakonikom uredio pravo u Francuskoj?",   ["Građanskim zakonikom","Deklaracijom neovisnosti"], "Građanskim zakonikom"]]},
  {t:"izbor", q:"Kako se zove?", items:[
    ["zabrana trgovine s Velikom Britanijom na kontinentu", ["kontinentalna blokada","Sveta alijansa"], "kontinentalna blokada"],
    ["savez vladara Rusije, Austrije i Pruske nakon 1815.", ["Sveta alijansa","kontinentalna blokada"], "Sveta alijansa"],
    ["bitka kod Leipziga 1813.",                            ["Bitka naroda","bitka triju careva"],      "Bitka naroda"],
    ["bitka kod Austerlitza 1805.",                         ["bitka triju careva","Bitka naroda"],      "bitka triju careva"]]},
  {t:"izbor", q:"Napoleon i hrvatski krajevi", items:[
    ["godina osnivanja Ilirskih pokrajina",               ["1809.","1815."],                   "1809."],
    ["Napoleonov general koji ih je upravljao",           ["Marmont","Metternich"],            "Marmont"],
    ["država koju su Francuzi ukinuli 1808.",             ["Dubrovačka Republika","Mletačka Republika"], "Dubrovačka Republika"],
    ["prve novine na hrvatskom jeziku (Zadar, 1806.)",    ["Kraljski Dalmatin","Danica"],      "Kraljski Dalmatin"]]},
  {t:"calc", q:"Dopuni jednom riječju.", items:[
    ["Glavni grad Ilirskih pokrajina bio je ____.", "Ljubljana"],
    ["Napoleon je umro na otoku Sveta ____.", "Helena"],
    ["Nakon Napoleonova pada vladari su se sastali na kongresu u gradu ____.", "Beču"]]},
  {t:"note", q:"Nacrtaj vremensku crtu Napoleonova života od 1769. do 1821. i upiši pet važnih događaja.",
   solution:"1769. rođen, 1799. preuzima vlast, 1804. car, 1812. pohod na Rusiju, 1815. Waterloo, 1821. umire"}
]},

/* doba industrijskih revolucija */
{id:"p5", nav:"Industrijska revolucija", title:"Doba industrijskih revolucija",
 lead:"Para i ugljen, a zatim elektricitet, nafta i čelik.", tasks:[
  {t:"izbor", q:"Odaberi točan odgovor.", items:[
    ["U kojoj je zemlji počela industrijska revolucija?",      ["u Velikoj Britaniji","u Francuskoj"], "u Velikoj Britaniji"],
    ["U kojem je stoljeću počela?",                             ["u 18. stoljeću","u 16. stoljeću"],   "u 18. stoljeću"],
    ["Koja se industrija prva razvila?",                        ["tekstilna","automobilska"],          "tekstilna"],
    ["Koja je sirovina pokretala parne strojeve?",              ["ugljen","nafta"],                    "ugljen"]]},
  {t:"izbor", q:"Tko je izumio ili usavršio?", items:[
    ["parni stroj",                 ["James Watt","Thomas Edison"],         "James Watt"],
    ["parnu lokomotivu",            ["George Stephenson","Samuel Morse"],   "George Stephenson"],
    ["parobrod",                    ["Robert Fulton","James Watt"],         "Robert Fulton"],
    ["telefon",                     ["Alexander Graham Bell","Robert Fulton"], "Alexander Graham Bell"],
    ["sustav izmjenične struje",    ["Nikola Tesla","George Stephenson"],   "Nikola Tesla"]]},
  {t:"izbor", q:"Pripada li to prvoj ili drugoj industrijskoj revoluciji?", items:[
    ["parni stroj i ugljen",            ["prvoj","drugoj"], "prvoj"],
    ["elektricitet i žarulja",          ["drugoj","prvoj"], "drugoj"],
    ["motor s unutarnjim izgaranjem",   ["drugoj","prvoj"], "drugoj"],
    ["mehanički tkalački stan",         ["prvoj","drugoj"], "prvoj"]]},
  {t:"izbor", q:"Kako se zove pojam?", items:[
    ["radnici koji su razbijali strojeve jer su im oduzimali posao", ["ludisti","jakobinci"],   "ludisti"],
    ["vlasnici tvornica i kapitala",                                 ["kapitalisti","radnici"], "kapitalisti"],
    ["radnici koji žive samo od svoje plaće",                        ["proletarijat","plemstvo"], "proletarijat"]]},
  {t:"izbor", q:"Je li tvrdnja točna?", items:[
    ["U tvornicama su radila i djeca.",                                ["točno","netočno"], "točno"],
    ["Radni dan u ranim tvornicama trajao je 6 sati.",                 ["netočno","točno"], "netočno"],
    ["Prva željeznica u hrvatskim zemljama povezala je Zidani Most, Zagreb i Sisak (1862.).", ["točno","netočno"], "točno"]]},
  {t:"calc", q:"Dopuni jednom riječju.", items:[
    ["James Watt usavršio je parni ____.", "stroj"],
    ["Najvažnija sirovina prve industrijske revolucije bio je ____.", "ugljen"]]},
  {t:"note", q:"Usporedi život seljaka na selu i radnika u tvornici u 19. stoljeću — navedi po dvije razlike.",
   solution:"radnik ima plaću, ali dug radni dan, loše stanove i nesiguran posao; seljak ovisi o zemlji i vremenu, živi u obitelji i zajednici sela"}
]},

/* razvoj gradova */
{id:"p6", nav:"Razvoj gradova", title:"Razvoj gradova",
 lead:"Urbanizacija, problemi velikih gradova i moderni Zagreb.", tasks:[
  {t:"izbor", q:"Kako se zove pojam?", items:[
    ["rast gradova i preseljenje stanovništva sa sela u grad", ["urbanizacija","industrijalizacija"], "urbanizacija"],
    ["širenje tvornica i strojne proizvodnje",                  ["industrijalizacija","urbanizacija"], "industrijalizacija"],
    ["dio grada u kojem žive radnici",                          ["radnička četvrt","gradska jezgra"],  "radnička četvrt"]]},
  {t:"izbor", q:"Odaberi točan odgovor.", items:[
    ["Koji je grad u 19. stoljeću bio najveći na svijetu?",  ["London","Rim"],                   "London"],
    ["Koja se bolest širila prljavom vodom u gradovima?",    ["kolera","dijabetes"],           "kolera"],
    ["Što je poboljšalo higijenu u gradovima?",              ["vodovod i kanalizacija","veći zidovi"], "vodovod i kanalizacija"],
    ["Kojim su se javnim prijevozom ljudi vozili gradom?",   ["tramvajem","zrakoplovom"],        "tramvajem"]]},
  {t:"izbor", q:"Zagreb u 19. stoljeću", items:[
    ["godina ujedinjenja Gradeca i Kaptola u jedan grad", ["1850.","1910."], "1850."],
    ["prvi tramvaj u Zagrebu (konjski)",                  ["1891.","1850."], "1891."],
    ["prvi električni tramvaj u Zagrebu",                 ["1910.","1891."], "1910."],
    ["niz trgova i parkova u Donjem gradu",               ["Zelena potkova","Gornji grad"], "Zelena potkova"]]},
  {t:"izbor", q:"Je li tvrdnja točna?", items:[
    ["U 19. stoljeću gradovi su naglo rasli.",                         ["točno","netočno"], "točno"],
    ["Gradove je u 19. stoljeću noću osvjetljavala plinska, a zatim električna rasvjeta.", ["točno","netočno"], "točno"],
    ["Radnici su u gradovima živjeli u prostranim i zdravim stanovima.", ["netočno","točno"], "netočno"]]},
  {t:"calc", q:"Dopuni jednom riječju.", items:[
    ["Rast gradova i preseljenje sa sela u grad zove se ____.", "urbanizacija"],
    ["Bolest koja se širila prljavom vodom u gradovima bila je ____.", "kolera"]]},
  {t:"note", q:"Prošeći svojim mjestom ili pogledaj stare fotografije i pronađi zgradu ili ulicu nastalu u 19. stoljeću.",
   solution:"zapiši čemu je služila, kada je nastala i kako izgleda danas"}
]},

/* ideologije 19. stoljeca */
{id:"p7", nav:"Ideologije", title:"Ideologije 19. stoljeća",
 lead:"Liberalizam, konzervativizam, nacionalizam, socijalizam i revolucije 1848.", tasks:[
  {t:"izbor", q:"Koja je to ideologija?", items:[
    ["zalaže se za slobodu pojedinca, ustav i slobodno tržište", ["liberalizam","konzervativizam"], "liberalizam"],
    ["želi očuvati tradiciju, monarhiju i postojeći poredak",   ["konzervativizam","socijalizam"], "konzervativizam"],
    ["ističe pripadnost naciji i pravo naroda na svoju državu", ["nacionalizam","liberalizam"],    "nacionalizam"],
    ["traži društvenu jednakost i prava radnika",               ["socijalizam","konzervativizam"], "socijalizam"],
    ["želi ukinuti svaku državnu vlast",                        ["anarhizam","nacionalizam"],      "anarhizam"]]},
  {t:"izbor", q:"Odaberi točan odgovor.", items:[
    ["autori Komunističkoga manifesta",          ["Karl Marx i Friedrich Engels","Adam Smith i John Locke"], "Karl Marx i Friedrich Engels"],
    ["godina Komunističkoga manifesta",          ["1848.","1789."],                    "1848."],
    ["austrijski kancelar, simbol konzervativizma", ["Metternich","Robespierre"],     "Metternich"],
    ["naziv za revolucije u Europi 1848.",        ["proljeće naroda","doba terora"],  "proljeće naroda"]]},
  {t:"izbor", q:"Hrvatska 1848. godine", items:[
    ["hrvatski ban 1848.",                       ["Josip Jelačić","Ljudevit Gaj"],   "Josip Jelačić"],
    ["što je Hrvatski sabor ukinuo 1848.",       ["kmetstvo","Ilirske pokrajine"],   "kmetstvo"]]},
  {t:"izbor", q:"Je li tvrdnja točna?", items:[
    ["Liberali su tražili da vladar vlada prema ustavu.",           ["točno","netočno"], "točno"],
    ["Konzervativci su željeli brze i velike promjene.",            ["netočno","točno"], "netočno"],
    ["Nacionalizam je pomogao ujedinjenju Italije i Njemačke.",     ["točno","netočno"], "točno"]]},
  {t:"calc", q:"Upiši naziv ideologije jednom riječju.", items:[
    ["čuva tradiciju i postojeći poredak",  "konzervativizam"],
    ["ističe pripadnost naciji",            "nacionalizam"],
    ["ističe slobodu pojedinca",            "liberalizam"]]},
  {t:"note", q:"Odaberi jednu ideologiju 19. stoljeća i potraži koje njezine ideje postoje i danas.",
   solution:"npr. liberalizam: ustav, izbori i slobodno tržište; socijalizam: osmosatni radni dan i prava radnika"}
]},

/* rad s izvorima, vremenska crta i usporedba -- bez ocjenjivanja */
{id:"p8", nav:"Vježbanje", title:"Zadaci za vježbenicu",
 lead:"Vremenska crta, rad s povijesnim izvorima i usporedba — bez ocjenjivanja.", tasks:[
  {t:"note", q:"Nacrtaj vremensku crtu od 1750. do 1850. i upiši: Deklaraciju neovisnosti, pad Bastilje, Napoleonovu krunidbu, Waterloo i revolucije 1848.",
   solution:"1776., 1789., 1804., 1815., 1848."},
  {t:"note", q:"Usporedi američku i francusku revoluciju: što im je zajedničko, a po čemu se razlikuju?",
   solution:"zajedničko: ideje prosvjetiteljstva, prava čovjeka, ustav; razlika: američka je rat za odvajanje od Britanije, francuska ruši staleško društvo i kralja"},
  {t:"note", q:"Pronađi sliku ili karikaturu iz doba Francuske revolucije i opiši što prikazuje i koju poruku šalje.",
   solution:"tko je prikazan, što se događa, kada je nastala i za koga je napravljena"},
  {t:"note", q:"Na karti Europe pokaži najveće širenje Napoleonova Carstva i Ilirske pokrajine.",
   solution:"usporedi kartu iz udžbenika s današnjim granicama"}
]}
];
