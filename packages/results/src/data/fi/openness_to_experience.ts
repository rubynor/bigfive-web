import { type TemplateDomain } from '../../types'

const openness: TemplateDomain = {
  domain: 'O',
  title: 'Avoimuus kokemuksille',
  shortDescription: 'Avoimuus kokemuksille kuvaa kognitiivisen tyylin ulottuvuutta, joka erottaa mielikuvitukselliset, luovat ihmiset maanläheisistä, perinteisistä ihmisistä.',
  description: `Avoimet ihmiset ovat älyllisesti uteliaita,
arvostavat taidetta ja ovat herkkiä kauneudelle. He ovat
taipuvaisia olemaan sulkeutuneempiin ihmisiin verrattuna
tietoisempia tunteistaan. He taipuvat ajattelemaan ja
toimimaan individualistisilla ja ennakkoluulottomilla
tavoilla. Intellektuellit saavat tyypillisesti korkeat pisteet
avoimuudessa kokemuksille; sen vuoksi tätä tekijää on kutsuttu
myös Kulttuuriksi tai Älykkyydeksi. <br /><br />Älykkyyttä lienee
kuitenkin parasta pitää yhtenä avoimuuden kokemuksille puolena.
Pisteet avoimuudessa kokemuksille korreloivat vain vaatimattomasti
koulutusvuosien ja tavanomaisten älykkyystestien pistemäärien kanssa.
<br /><br />
Toinen avoimelle kognitiiviselle tyylille ominainen piirre on kyky
ajatella symbolein ja abstraktioin, jotka ovat kaukana konkreettisesta
kokemuksesta. Yksilön erityisistä älyllisistä kyvyistä riippuen tämä
symbolinen kognitio voi saada muodon matemaattisessa, loogisessa tai
geometrisessa ajattelussa, kielen taiteellisessa ja metaforisessa
käytössä, musiikin säveltämisessä tai esittämisessä tai jossakin
monista kuvataiteen tai esittävän taiteen muodoista.
<br /><br />
Ihmisillä, jotka saavat matalat pisteet avoimuudessa kokemuksille,
on taipumus olla suppeita, tavanomaisia kiinnostuksen kohteita.
He pitävät yksinkertaisesta, suoraviivaisesta ja ilmeisestä enemmän
kuin monimutkaisesta, monitulkintaisesta ja hienovaraisesta. He
saattavat suhtautua taiteisiin ja tieteisiin epäillen pitäen näitä
pyrkimyksiä käsittämättöminä tai käytännössä hyödyttöminä.
Sulkeutuneet ihmiset pitävät tuttuutta uutuutta parempana; he ovat
konservatiivisia ja muutoksille vastustuskykyisiä.
<br /><br />
Psykologit, jotka ovat usein itse avoimia kokemuksille, esittävät
avoimuuden usein terveempänä tai kypsämpänä. Avoimet ja sulkeutuneet
ajattelutavat ovat kuitenkin hyödyllisiä eri ympäristöissä. Avoimen
ihmisen älyllinen tyyli saattaa palvella professoria hyvin, mutta
tutkimus on osoittanut, että sulkeutunut ajattelu liittyy parempaan
työsuoritukseen poliisityössä, myynnissä ja useissa
palveluammateissa.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Avoimuuspisteesi kokemuksille ovat matalat, mikä viittaa siihen,
että haluat ajatella yksinkertaisin ja selkein termein. Muut
kuvaavat sinua maanläheiseksi, käytännönläheiseksi ja
konservatiiviseksi.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Avoimuuspisteesi kokemuksille ovat keskivertoa, mikä viittaa
siihen, että pidät perinteestä mutta olet valmis kokeilemaan uusia
asioita. Ajattelusi ei ole yksinkertaista eikä monimutkaista. Muiden
silmissä näytät sivistyneeltä ihmiseltä mutta et intellektuellilta.`
    },
    {
      score: 'high', // do not translate this line
      text: `Avoimuuspisteesi kokemuksille ovat korkeat, mikä viittaa siihen,
että nautit uutuudesta, vaihtelusta ja muutoksesta. Olet utelias,
mielikuvituksellinen ja luova.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Mielikuvitus',
      text: `Mielikuvituksellisille ihmisille todellinen maailma on
usein liian tavanomainen ja arkipäiväinen. Korkeat pisteet tällä
asteikolla saaneet käyttävät fantasiaa keinona luoda rikkaamman,
mielenkiintoisemman maailman. Matalat pisteet tällä asteikolla
saaneet ovat suuntautuneempia faktoihin kuin fantasiaan.`
    },
    {
      facet: 2,
      title: 'Taiteelliset kiinnostukset',
      text: `Tällä asteikolla korkeat pisteet saaneet rakastavat kauneutta
sekä taiteessa että luonnossa. He uppoutuvat helposti taiteellisiin
ja luonnollisiin kokemuksiin. He eivät välttämättä ole taiteellisesti
koulutettuja tai lahjakkaita, vaikka monet ovatkin. Tämän asteikon määrittävät piirteet ovat kiinnostus ja
luonnollisen ja ihmisen tekemän kauneuden arvostus. Matalat pisteet
saaneilta puuttuu esteettinen herkkyys ja kiinnostus taiteita kohtaan.`
    },
    {
      facet: 3,
      title: 'Tunnetietoisuus',
      text: `Henkilöillä, joilla on paljon tunnetietoisuutta, on hyvä
pääsy omiin tunteisiinsa ja hyvä tietoisuus niistä. Matalat pisteet
saaneet ovat vähemmän tietoisia tunteistaan eivätkä taipuvaisesti
ilmaise tunteitaan avoimesti.`
    },
    {
      facet: 4,
      title: 'Seikkailunhaluisuus',
      text: `Korkeat pisteet seikkailunhaluisuudessa saaneet ovat innokkaita
kokeilemaan uusia aktiviteetteja, matkustamaan vieraisiin maihin ja
kokemaan erilaisia asioita. He pitävät tuttuutta ja rutiinia tylsinä
ja ottavat uuden reitin kotiin vain siksi, että se on erilainen.
Matalat pisteet saaneet tuntevat olonsa epämukavaksi muutosten
edessä ja pitävät tutuista rutiineista.`
    },
    {
      facet: 5,
      title: 'Älyllinen uteliaisuus',
      text: `Älyllinen uteliaisuus ja taiteelliset kiinnostukset ovat
kaksi tärkeintä, keskeisintä avoimuuden kokemuksille puolta. Korkeat
pisteet älyllisessä uteliaisuudessa saaneet rakastavat ideoiden
kanssa leikkiä. He ovat avoimia uusille ja epätavanomaisille ideoille
ja pitävät älyllisistä väittelyistä. He nauttivat arvoituksista,
pulmista ja älypähkinöistä. Matalat pisteet älyllisessä
uteliaisuudessa saaneet pitävät enemmän ihmisten tai asioiden kuin
ideoiden parissa toimimisesta. He pitävät älyllisiä harjoituksia
ajanhaaskauksena. Älyllistä uteliaisuutta ei tulisi sekoittaa
älykkyyteen. Se on älyllinen tyyli, ei älyllinen kyky, vaikkakin
korkeat pisteet saaneet saavat hieman korkeammat pisteet kuin
matalat pisteet saaneet standardoiduissa älykkyystesteissä.`
    },
    {
      facet: 6,
      title: 'Liberalismi',
      text: `Psykologinen liberalismi viittaa valmiuteen haastaa auktoriteetti,
konventio ja perinteiset arvot. Äärimmäisimmässä muodossaan psykologinen
liberalismi voi jopa edustaa suoranaista vihamielisyyttä sääntöjä
kohtaan, sympatiaa lainrikkojille ja rakastetta monitulkintaisuutta,
käosta ja epäjärjestystä. Psykologiset konservatiivit pitävät
perinteisiin mukautumisen tuomasta turvallisuudesta ja vakaudesta.
Psykologinen liberalismi ja konservatismi eivät ole identtisiä
poliittisen vakaumuksen kanssa, mutta ne varmasti suuntaavat ihmisiä
kohti tiettyjä poliittisia puolueita.`
    }
  ]
}

export default openness
