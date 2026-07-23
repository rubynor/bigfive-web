import { type TemplateDomain } from '../../types'

const neuroticism: TemplateDomain = {
  domain: 'N',
  title: 'Neuroottisuus',
  shortDescription: 'Neuroottisuus viittaa taipumukseen kokea kielteisiä tunteita.',
  description: `Freud käytti alun perin termiä neuroosi kuvaamaan
tilaa, jolle on ominaista henkinen ahdinko, emotionaalinen kärsimys
ja kyvyttömyys selviytyä tehokkaasti elämän tavanomaisista
vaatimuksista. Hän esitti, että jokaisella on joitakin neuroosin
merkkejä, mutta että eroamme toisistamme kärsimyksemme määrässä
ja ahdinkomme erityisissä oireissa. Nykyään neuroottisuudella
tarkoitetaan taipumusta kokea kielteisiä tunteita. <br /><br />Ne, jotka
saavat korkeat pisteet neuroottisuudessa, voivat kokea ensisijaisesti
yhtä tiettyä kielteistä tunnetta, kuten ahdistusta, vihaa tai
masennusta, mutta kokevat todennäköisesti useita näistä tunteista.
<br /><br />Neuroottiset ihmiset ovat emotionaalisesti reaktiivisia. He
reagoivat emotionaalisesti tapahtumiin, jotka eivät vaikuttaisi
useimpiin ihmisiin, ja heidän reaktionsa ovat taipuvaisia olemaan
normaalia voimakkaampia. He todennäköisemmin tulkitsevat tavanomaiset
tilanteet uhkaavina ja pienet vastoinkäymiset toivottoman vaikeina.
<br /><br />Heidän negatiiviset tunnetilareaktionsa taipuvat kestämään
epätavallisen pitkiä aikoja, mikä tarkoittaa, että he ovat usein
huonolla tuulella. Nämä tunteiden säätelyn ongelmat voivat heikentää
neuroottisen ihmisen kykyä ajatella selkeästi, tehdä päätöksiä ja
selviytyä tehokkaasti stressistä.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Neuroottisuuspisteesi ovat matalat, mikä viittaa siihen, että olet
poikkeuksellisen rauhallinen, tasainen ja horjumaton. Et reagoi
voimakkailla tunteilla edes tilanteisiin, joita useimmat ihmiset
kuvailisivat stressaaviksi.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Neuroottisuuspisteesi ovat keskivertoa, mikä viittaa siihen, että
tunnetilareaktiivisuutesi on tyypillistä väestölle yleisesti.
Stressaavat ja turhauttavat tilanteet ovat sinulle jossain määrin
järkyttäviä, mutta pystyt yleensä pääsemään näiden tunteiden yli ja
selviytymään näistä tilanteista.`
    },
    {
      score: 'high', // do not translate this line
      text: `Neuroottisuuspisteesi ovat korkeat, mikä viittaa siihen, että
järkytyt helposti, jopa siitä, mitä useimmat ihmiset pitävät
elämän tavanomaisina vaatimuksina. Ihmiset pitävät sinua
herkkänä ja tunnepitoisena.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Ahdistuneisuus',
      text: `Ahdistuneiden ihmisten aivojen "taistele-tai-pakene"
-järjestelmä aktivoituu liian helposti ja liian usein. Siksi ihmiset,
joilla on paljon ahdistusta, tuntevat usein, että jotakin
vaarallista on tapahtumassa. He saattavat pelätä tiettyjä
tilanteita tai olla vain yleisesti pelokkaita. He tuntevat itsensä
jännittyneiksi, hermostuneiksi ja levottomiksi. Henkilöt, joilla on
vähän ahdistuneisuutta, ovat yleensä rauhallisia ja pelottomia.`
    },
    {
      facet: 2,
      title: 'Vihaisuus',
      text: `Henkilöt, jotka saavat korkeat pisteet vihaisuudessa,
raivostuvat, kun asiat eivät suju heidän tahtomallaan tavalla.
He ovat herkkiä sille, miten reilusti heitä kohdellaan, ja tuntevat
katkeruutta ja kaunaa, kun he kokevat joutuvansa petetyiksi.
Tämä asteikko mittaa taipumusta tuntea vihaa; se, ilmaiseeko ihminen
ärtymystään ja vihamielisyyttään, riippuu yksilön tasosta
sopeutuvuudessa. Matalat pisteet saaneet eivät suutu usein tai
helposti.`
    },
    {
      facet: 3,
      title: 'Masentuneisuus',
      text: `Tämä asteikko mittaa taipumusta tuntea surua, alakuloisuutta
ja lannistuneisuutta. Korkeat pisteet saaneilta puuttuu energiaa, ja
heidän on vaikea ryhtyä toimintaan. Matalat pisteet saaneet ovat
taipuvaisia olemaan vapaita näistä masentavista tunteista.`
    },
    {
      facet: 4,
      title: 'Vaivautuneisuus',
      text: `Vaivautuneet ihmiset ovat herkkiä sille, mitä muut heistä
ajattelevat. Heidän huolensa hylkäämisestä ja pilkkaamisesta saa
heidät tuntemaan itsensä ujoiksi ja kiusaantuneiksi muiden seurassa.
He nolostuvat helposti ja tuntevat usein häpeää. Heidän pelkonsa
siitä, että muut kritisoisivat tai pilkkaisivat heitä, ovat
liioiteltuja ja epärealistisia, mutta heidän kömpelyytensä ja
epämukavuutensa saattavat tehdä näistä peloista itsensä toteuttavan
ennustuksen. Matalat pisteet saaneet puolestaan eivät kärsi
harhaluulosta, että kaikki tarkkailisivat ja arvostelisivat heitä.
He eivät tunne hermostuneisuutta sosiaalisissa tilanteissa.`
    },
    {
      facet: 5,
      title: 'Maltittomuus',
      text: `Maltittomat ihmiset tuntevat voimakkaita himoja ja
haluja, joita heidän on vaikea vastustaa. He ovat taipuvaisia
suuntautumaan lyhyen aikavälin nautintoihin ja palkintoihin
pitkän aikavälin seurausten sijaan. Matalat pisteet saaneet eivät
koe voimakkaita, vastustamattomia himoja eivätkä sen vuoksi tunne
houkutusta ylilyönteihin.`
    },
    {
      facet: 6,
      title: 'Haavoittuvuus',
      text: `Korkeat pisteet haavoittuvuudessa saaneet kokevat
paniikkia, hämmennystä ja avuttomuutta paineen tai stressin alla.
Matalat pisteet saaneet tuntevat itsensä stressitilanteissa
itsevarmemmiksi, varmemmiksi ja selkeäjärjisemmiksi.`
    }
  ]
}

export default neuroticism
