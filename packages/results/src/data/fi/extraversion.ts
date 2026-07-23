import { type TemplateDomain } from '../../types'

const extraversion: TemplateDomain = {
  domain: 'E',
  title: 'Ekstroversio',
  shortDescription: 'Ekstroversiolle on ominaista voimakas suuntautuminen ulkoiseen maailmaan.',
  description: `Ekstrovertit nauttivat ihmisten seurasta, ovat täynnä energiaa
ja kokevat usein positiivisia tunteita. He ovat taipuvaisia olemaan
innostuneita ja toimintakeskeisiä, ihmisiä, jotka todennäköisesti
sanovat "Kyllä!" tai "Lähdetään!" jännitystä tarjoaviin
tilaisuuksiin. Ryhmissä he pitävät puhumisesta, esittävät
mielipiteensä ja keräävät huomiota itseensä.
<br /><br />
Introverteilta puuttuu ekstroverttien eloisa energisyys ja
aktiivisuus. He ovat taipuvaisia olemaan hiljaisia, matalaprofiilisia,
harkitsevaisia ja etääntyneitä sosiaalisesta maailmasta. Heidän
sosiaalisen osallistumisensa vähäisyyttä ei tulisi tulkita
ujoina tai masentuneina; introvertti yksinkertaisesti tarvitsee
vähemmän stimulaatiota kuin ekstrovertti ja pitää enemmän
yksinolosta. <br /><br />Introvertin itsenäisyys ja varautuneisuus tulkitaan
joskus virheellisesti epäystävällisyydeksi tai ylimielisyydeksi.
Todellisuudessa introvertti, joka saa korkeat pisteet
sopeutuvuusulottuvuudessa, ei hakeudu muiden seuraan mutta on
varsin miellyttävä, kun häntä lähestytään.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Ekstroversiopisteesi ovat matalat, mikä viittaa siihen, että olet
introvertti, varautunut ja hiljainen. Nautit yksinolosta ja yksin
tehtävistä asioista. Seurustelusi rajoittuu yleensä muutamaan
läheiseen ystävään.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Ekstroversiopisteesi ovat keskivertoa, mikä viittaa siihen, että
et ole lannistunut yksinäinen etkä iloinen juttutuuli. Nautit
ajasta muiden kanssa mutta myös ajasta yksin.`
    },
    {
      score: 'high', // do not translate this line
      text: `Ekstroversiopisteesi ovat korkeat, mikä viittaa siihen, että olet
seurallinen, ulospäin suuntautunut, energinen ja eloisa. Haluat
olla ihmisten ympäröimänä suurimman osan ajasta.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Ystävällisyys',
      text: `Ystävälliset ihmiset pitävät aidosti muista ihmisistä
ja osoittavat avoimesti myönteisiä tunteita heitä kohtaan. He
ystävystyvät nopeasti, ja heidän on helppo muodostaa läheisiä,
inttimejä ihmissuhteita. Matalat pisteet ystävällisyydessä saaneet
eivät ole välttämättä kylmiä ja vihamielisiä, mutta he eivät
otele muita ja näyttäytyvät etäisinä ja varautuneina.`
    },
    {
      facet: 2,
      title: 'Seurallisuus',
      text: `Seuralliset ihmiset kokevat muiden seuran miellyttävästi
virkistävänä ja palkitsevana. He nauttivat ihmisjoukkojen
vilinästä. Matalat pisteet saaneet tuntevat helposti itsensä
kuormittuneiksi suurista ihmisjoukoista ja välttelevät niitä siksi
aktiivisesti. He eivät välttämättä pidä satunnaista ihmisten kanssa
olemista vastenmielisenä, mutta heidän tarpeensa yksityisyyteen ja
omaan aikaan on paljon suurempi kuin ihmisillä, jotka saavat
tällä asteikolla korkeat pisteet.`
    },
    {
      facet: 3,
      title: 'Assertiivisuus',
      text: `Korkeat pisteet assertiivisuudessa saaneet pitävät
mielipiteidensä esille tuomisesta, ohjaksista tarttumisesta ja
muiden toiminnan johtamisesta. He ovat taipuvaisia olemaan ryhmien
johtajia. Matalat pisteet saaneet eivät yleensä puhu paljon ja
antavat muiden ohjata ryhmien toimintaa.`
    },
    {
      facet: 4,
      title: 'Aktiivisuus',
      text: `Aktiiviset ihmiset elävät nopeatempoista, kiireistä
elämää. He liikkuvat nopeasti, energisesti ja vauhdikkaasti ja
ovat mukana monissa toiminnoissa. Ihmiset, jotka saavat tällä
asteikolla matalat pisteet, elävät hitaampaan, leppoisampaan ja
rentoutuneempaan tahtiin.`
    },
    {
      facet: 5,
      title: 'Jännityksenhakuisuus',
      text: `Tällä asteikolla korkeat pisteet saaneet kyllästyvät
helposti ilman runsasta stimulaatiota. He rakastavat kirkkaita
valoja ja hälinää. He todennäköisesti ottavat riskejä ja hakevat
jännitystä. Matalat pisteet saaneet kokevat melun ja hälinän
kuormittavana ja karttavat jännityksen tavoittelua.`
    },
    {
      facet: 6,
      title: 'Iloisuus',
      text: `Tämä asteikko mittaa positiivista mielialaa ja tunteita,
ei negatiivisia tunteita (jotka kuuluvat neuroottisuuden
ulottuvuuteen). Henkilöt, jotka saavat tällä asteikolla korkeat
pisteet, kokevat tyypillisesti joukon positiivisia tunteita, kuten
onnellisuutta, innostusta, optimismia ja iloa. Matalat pisteet
saaneet eivät ole yhtä alttiita tällaiselle energiselle
hyväntuulisuudelle.`
    }
  ]
}

export default extraversion
