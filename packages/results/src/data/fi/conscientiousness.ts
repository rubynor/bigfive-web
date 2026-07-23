import { type TemplateDomain } from '../../types'

const conscientiousness: TemplateDomain = {
  domain: 'C',
  title: 'Tunnollisuus',
  shortDescription: 'Tunnollisuus koskee tapaa, jolla hallitsemme, säännöstelemme ja ohjaamme impulssejamme.',
  description: `Impulssit eivät ole luonnostaan huonoja;
joskus aikarajoitteet vaativat pikaisen päätöksen, ja ensimmäisen
impulssin mukaan toimiminen voi olla tehokas reaktio. Myös leikin
eikä työn hetkinä spontaani ja impulsiivinen toiminta voi olla
hauskaa. Impulsiiviset ihmiset voivat näyttäytyä muiden silmissä
värikkäinä, hauskoina seuralaisina ja omalaatuisina.
<br /><br />
Impulssin varassa toimiminen voi kuitenkin johtaa ongelmiin monin
tavoin. Jotkin impulssit ovat epäsosiaalisia. Hillitsemättömät
epäsosiaaliset teot eivät ainoastaan vahingoita muita yhteiskunnan
jäseniä, vaan voivat myös johtaa rangaistuksiin tällaisen
impulsiivisen teon tekijää kohtaan. Toinen impulsiivisten tekojen
ongelma on, että ne tuottavat usein välittömiä palkintoja mutta
epätoivottuja pitkän aikavälin seurauksia. Esimerkkejä ovat
liiallinen seurustelu, joka johtaa potkuihin työstä, loukkauksen
huudahdus, joka aiheuttaa tärkeän ihmissuhteen päättymisen, tai
mielihyvää tuottavien huumeiden käyttö, joka lopulta tuhoaa
terveyden.
<br /><br />
Impulsiivinen käyttäytyminen, vaikka se ei olisi vakavasti
tuhoisaa, heikentää ihmisen tehokkuutta merkittävällä tavalla.
Impulsiivisesti toimiessa ei voi harkita vaihtoehtoisia
toimintatapoja, joista osa olisi ollut impulsiivista valintaa
viisaampia. Impulsiivisuus myös harhauttaa ihmisiä projekteissa,
jotka vaativat organisoituja vaiheita tai askelia. Impulsiivisen
ihmisen saavutukset ovat siksi pieniä, hajanaisia ja
epäjohdonmukaisia.
<br /><br />
Älykkyyden tunnusmerkki – se, mikä mahdollisesti erottaa ihmisen
aiemmista elämänmuodoista – on kyky ajatella tulevia seurauksia
ennen impulssin varassa toimimista. Älykäs toiminta sisältää
pitkän aikavälin tavoitteiden harkitsemista, näihin tavoitteisiin
johtavien reittien organisoimista ja suunnittelemista sekä
sinnikkyyttä tavoitteiden eteen lyhytaikaisten vastakkaisten
impulssien keskellä. Ajatus siitä, että älykkyyteen kuuluu
impulssien hallinta, kiteytyy kauniisti sanaan harkitsevaisuus, joka
on vaihtoehtoinen nimitys tunnollisuuden ulottuvuudelle.
Harkitsevainen tarkoittaa sekä viisasta että varovaista.
<br /><br/>
Henkilöt, jotka saavat korkeat pisteet
tunnollisuusasteikolla, näyttäytyvätkin muiden silmissä älykkäinä.
Korkean tunnollisuuden hyödyt ovat ilmeisiä. Tunnolliset ihmiset
välttävät ongelmat ja saavuttavat korkeaa menestystä
tavoitteellisen suunnittelun ja sinnikkyyden avulla. Muut myös
arvostavat heitä älykkäinä ja luotettavina. Varjopuolena he voivat
olla pakonomaisia perfektionisteja ja työholicceja.
Lisäksi äärimmäisen tunnollisia ihmisiä saatetaan pitää
tunkkaisina ja tylsinä.
<br /><br />
Vähän tunnollisia ihmisiä saatetaan kritisoida
heidän epäluotettavuudestaan, kunnianhimon puutteestaan ja
kyvyttömyydestään pysyä raameissa, mutta he tulevat kokemaan monia
lyhytaikaisia iloja eikä heitä koskaan kutsuta tunkkaisiksi.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Tunnollisuuspisteesi ovat matalat, mikä viittaa siihen, että
haluat elää hetkessä ja tehdä sitä, mikä nyt tuntuu hyvältä. Työsi
taipuu olemaan huolimatonta ja järjestelmätöntä.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Tunnollisuuspisteesi ovat keskivertoa. Tämä tarkoittaa, että olet
kohtalaisen luotettava, järjestelmällinen ja itsesi hallitseva.`
    },
    {
      score: 'high', // do not translate this line
      text: `Tunnollisuuspisteesi ovat korkeat. Tämä tarkoittaa, että asetat
selkeät tavoitteet ja tavoittelet niitä päättäväisesti. Muut pitävät
sinua luotettavana ja ahkeraana työntekijänä.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Minäpystyvyys',
      text: `Minäpystyvyys kuvaa luottamusta omaan kykyyn saada asioita
aikaan. Korkeat pisteet saaneet uskovat omaavansa menestykseen
tarvittavan älykkyyden (terveen järjen), toimintakyvyn ja
itsehallinnan. Matalat pisteet saaneet eivät tunne itseään
tehokkaiksi, ja heillä saattaa olla tunne, etteivät he hallitse
elämäänsä.`
    },
    {
      facet: 2,
      title: 'Järjestelmällisyys',
      text: `Henkilöt, jotka saavat korkeat pisteet järjestelmällisyydessä,
ovat hyvin organisoituja. He pitävät rutiinien ja aikataulujen
mukaan elämisestä. He pitävät listoja ja tekevät suunnitelmia.
Matalat pisteet saaneet taipuvat olemaan järjestelmättömiä ja
hajanaisia.`
    },
    {
      facet: 3,
      title: 'Velvollisuudentunto',
      text: `Tämä asteikko kuvastaa ihmisen velvollisuuden- ja
pakontunnon vahvuutta. Ne, jotka saavat tällä asteikolla korkeat
pisteet, kokevat voimakkaan moraalisen velvollisuuden. Matalat
pisteet saaneet kokevat sopimukset, säännöt ja määräykset liian
ahdistavina. Heitä saatetaan pitää epäluotettavina tai jopa
vastuuttomina.`
    },
    {
      facet: 4,
      title: 'Pyrkimys saavutuksiin',
      text: `Henkilöt, jotka saavat tällä asteikolla korkeat pisteet,
pyrkivät kovasti saavuttamaan huippusuorituksia. Halu tulla
tunnustetuksi menestyjänä pitää heidät korkeiden tavoitteidensa
polulla. Heillä on usein vahva suuntataju elämässä, mutta
äärimmäisen korkeat pisteet voivat tarkoittaa liian
yksitotista ja työhön pakkomielteisesti suhtautuvaa elämäntapaa.
Matalat pisteet saaneet tyytyvät pärjäämään minimaalisella työllä,
ja muut saattavat pitää heitä laiskoina.`
    },
    {
      facet: 5,
      title: 'Itsekuri',
      text: `Itsekuri – jota monet ihmiset kutsuvat tahdonvoimaksi –
viittaa kykyyn pysyä vaikeiden tai epämiellyttävien tehtävien
parissa, kunnes ne saadaan valmiiksi. Ihmiset, joilla on paljon
itsekuria, kykenevät voittamaan haluttomuutensa aloittaa tehtäviä
ja pysymään kurssissa häiriötekijöistä huolimatta. Ne, joilla on
vähän itsekuria, viivyttelevät ja saavat huonosti asioita
päätökseen, usein epäonnistuen tehtävien loppuun saattamisessa –
jopa sellaisten, jotka he kovasti haluaisivat saada valmiiksi.`
    },
    {
      facet: 6,
      title: 'Varovaisuus',
      text: `Varovaisuus kuvaa taipumusta miettiä mahdollisuudet läpi
ennen toimintaa. Korkeat pisteet varovaisuusasteikolla saaneet
käyttävät aikansa päätöksiä tehdessään. Matalat pisteet saaneet
usein sanovat tai tekevät ensimmäisen mieleen juolahtavan asian
harkitsematta vaihtoehtoja ja niiden todennäköisiä seurauksia.`
    }
  ]
}

export default conscientiousness
