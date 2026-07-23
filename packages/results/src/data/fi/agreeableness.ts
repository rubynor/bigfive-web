import { type TemplateDomain } from '../../types'

const agreeableness: TemplateDomain = {
  domain: 'A',
  title: 'Sopeutuvuus',
  shortDescription: 'Sopeutuvuus kuvastaa yksilöllisiä eroja yhteistyöhön ja sosiaaliseen harmoniseen kanssakäymiseen liittyvässä huolehtivuudessa. Sopeutuvat ihmiset arvostavat tulemista toimeen muiden kanssa.',
  description: `He ovat siksi huomaavaisia, ystävällisiä,
anteliaita, avuliaita ja valmiita tinkimään omista eduistaan
muiden hyväksi. Sopeutuvilla ihmisillä on myös optimistinen
käsitys ihmisluonnosta. He uskovat, että ihmiset ovat pohjimmiltaan
rehellisiä, kunniallisia ja luotettavia. <br /><br />
Vähän sopeutuvat ihmiset asettavat omat etunsa muiden kanssa toimeen
tulemisen edelle. He eivät yleensä ole kovin huolissaan muiden
hyvinvoinnista, eivätkä siksi ole taipuvaisia uhrautumaan muiden
vuoksi. Joskus heidän skeptisyytensä muiden motiiveista saa
heidät olemaan epäluuloisia, epäystävällisiä ja yhteistyöhaluttomia.
<br /><br />
Sopeutuvuus on selvästi hyödyllistä suosion saavuttamisessa ja
ylläpitämisessä. Sopeutuvia ihmisiä pidetään enemmän kuin vähän
sopeutuvia. Toisaalta sopeutuvuudesta ei ole hyötyä tilanteissa,
jotka vaativat tiukkoja tai täysin objektiivisia päätöksiä. Vähän
sopeutuvista ihmisistä voi tulla erinomaisia tiedemiehiä, kriitikkoja
tai sotilaita.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Sopeutuvuuspisteesi ovat matalat, mikä viittaa siihen, että
olet vähemmän huolissasi muiden tarpeista kuin omistasi. Muut
näkevät sinut tiukkana, kriittisenä ja kompromissien suhteen
joustamattomana.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Sopeutuvuutesi on keskivertoa, mikä viittaa siihen, että välität
jonkin verran muiden tarpeista, mutta et yleensä ole halukas
uhrautumaan muiden vuoksi.`
    },
    {
      score: 'high', // do not translate this line
      text: `Korkea sopeutuvuutesi viittaa vahvaan kiinnostukseen muiden
tarpeita ja hyvinvointia kohtaan. Olet miellyttävä, myötätuntoinen
ja yhteistyökykyinen.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Luottamus',
      text: `Henkilö, jolla on paljon luottamusta, olettaa useimpien
ihmisten olevan reiluja, rehellisiä ja hyväntahtoisia. Vähän
luottavaiset ihmiset näkevät muut itsekkäinä, kieroina ja
mahdollisesti vaarallisina.`
    },
    {
      facet: 2,
      title: 'Suorasukaisuus',
      text: `Tällä asteikolla korkeat pisteet saaneet eivät näe
tarvetta teeskennelylle tai manipulaatiolle muiden kanssa
asioidessaan ja ovat siksi rehellisiä, suoria ja vilpittömiä.
Matalat pisteet saaneet uskovat, että tietty määrä petosta on
ihmissuhteissa välttämätöntä. Ihmisten on suhteellisen helppo
tulla toimeen suorasukaisesti korkeat pisteet saaneiden kanssa.
Heidän on yleensä vaikeampi tulla toimeen kieroilijamaisten,
matalat pisteet saaneiden kanssa. On
tärkeää painottaa, etteivät matalat pisteet saaneet ole
periaatteettomia tai moraalittomia; he ovat vain varautuneempia
eivätkä yhtä halukkaita paljastamaan avoimesti koko totuutta.`
    },
    {
      facet: 3,
      title: 'Altruismi',
      text: `Altruistiset ihmiset kokevat muiden auttamisen
aidosti palkitsevana. Tämän vuoksi he ovat yleensä valmiita
auttamaan avun tarpeessa olevia. Altruistiset ihmiset kokevat, että
asioiden tekeminen muiden hyväksi on itsensä toteuttamista pikemminkin
kuin itsensä uhraamista. Tällä asteikolla matalat pisteet saaneet
eivät erityisemmin pidä avun tarpeessa olevien auttamisesta.
Avunpyynnöt tuntuvat heistä rasitteelta pikemminkin kuin tilaisuudelta
itsensä toteuttamiseen.`
    },
    {
      facet: 4,
      title: 'Myöntyvyys',
      text: `Henkilöt, jotka saavat tällä asteikolla korkeat pisteet,
eivät pidä konflikteista. He ovat täysin valmiita tekemään
kompromisseja tai sivuuttamaan omat tarpeensa tullakseen toimeen
muiden kanssa. Ne, jotka saavat tällä asteikolla matalat pisteet,
puolestaan saattavat ennemmin pelotella muita saadakseen tahtonsa
läpi.`
    },
    {
      facet: 5,
      title: 'Vaatimattomuus',
      text: `Tällä asteikolla korkeat pisteet saaneet eivät pidä
siitä, että heidän väitetään olevan muita parempia. Joissakin
tapauksissa tämä asenne voi johtua alhaisesta itseluottamuksesta
tai itsetunnosta. Siitä huolimatta jotkut hyvästä itsetunnosta
nauttivat ihmiset pitävät vaatimattomuuden puutetta sopimattomana.
Ne, jotka ovat valmiita kuvaamaan itsensä ylempiarvoisiksi, näyttäytyvät
muiden silmissä helposti epämiellyttävän ylimielisinä.`
    },
    {
      facet: 6,
      title: 'Myötätunto',
      text: `Ihmiset, jotka saavat tällä asteikolla korkeat pisteet,
ovat helläsydämisiä ja myötätuntoisia. He kokevat muiden tuskan
samastuen ja liikuttuvat helposti sääliin. Matalat pisteet saaneet
eivät vaikutu voimakkaasti ihmisten kärsimyksestä. He ylpeilevät
järkeen perustuvilla objektiivisilla arvioillaan. Heitä huolettaa
totuus ja puolueeton oikeudenmukaisuus enemmän kuin armollisuus.`
    }
  ]
}

export default agreeableness
