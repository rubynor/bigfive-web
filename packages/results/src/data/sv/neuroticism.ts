import { type TemplateDomain } from '../../types'

const neuroticism: TemplateDomain = {
  domain: 'N',
  title: 'Neuroticism',
  shortDescription: 'Neuroticism avser benägenheten att uppleva negativa känslor.',
  description: `Freud använde ursprungligen begreppet neuros för att beskriva
ett tillstånd präglat av psykisk nöd, känslomässigt lidande och
oförmåga att hantera livets normala krav på ett effektivt sätt. Han
menade att alla visar vissa tecken på neuros, men att vi skiljer oss
åt i graden av lidande och i våra specifika symtom. I dag avser
neuroticism benägenheten att uppleva negativa känslor. <br /><br />De som
får höga poäng på Neuroticism kan främst uppleva en specifik negativ
känsla, till exempel ångest, ilska eller nedstämdhet, men det är
sannolikt att de upplever flera av dessa känslor. <br /><br />Människor med
hög neuroticism är känslomässigt reaktiva. De reagerar känslomässigt
på händelser som inte skulle påverka de flesta, och deras reaktioner
brukar vara intensivare än normalt. De är mer benägna att tolka
vardagliga situationer som hotfulla och små motgångar som hopplöst
svåra. <br /><br />Deras negativa känslomässiga reaktioner tenderar att
bestå under ovanligt långa perioder, vilket innebär att de ofta är på
dåligt humör. Dessa problem med känsloregleringen kan försämra en
neurotisk persons förmåga att tänka klart, fatta beslut och hantera
stress effektivt.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Ditt resultat på Neuroticism är lågt, vilket tyder på att du är
exceptionellt lugn, samlad och orubblig. Du reagerar inte med
intensiva känslor, inte ens på situationer som de flesta skulle
beskriva som stressande.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Ditt resultat på Neuroticism är genomsnittligt, vilket tyder på
att din grad av känslomässig reaktivitet är typisk för befolkningen
i allmänhet. Stressande och frustrerande situationer är något
uppskakande för dig, men du klarar i allmänhet av att komma över
dessa känslor och hantera situationerna.`
    },
    {
      score: 'high', // do not translate this line
      text: `Ditt resultat på Neuroticism är högt, vilket tyder på att du
lätt blir upprörd, till och med av det som de flesta anser vara
livets normala krav. Andra upplever dig som känslig och emotionell.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Ångest',
      text: `Hos ångestfyllda personer aktiveras hjärnans
"kamp-eller-flykt"-system för lätt och för ofta. Därför känner
människor med hög ångest ofta att något farligt är på väg att hända.
De kan vara rädda för specifika situationer eller bara allmänt
ängsliga. De känner sig spända, nervösa och oroliga. Personer med
låg Ångest är i allmänhet lugna och orädda.`
    },
    {
      facet: 2,
      title: 'Ilska',
      text: `Personer med höga poäng på Ilska känner vrede när
saker inte går som de vill. De är känsliga för om de behandlas
rättvist och känner förbittring och bitterhet när de upplever att de
blir lurade. Skalan mäter benägenheten att känna ilska; huruvida
personen uttrycker irritation och fientlighet beror på individens
nivå av Vänlighet. Lågpoängare blir inte arga ofta eller lätt.`
    },
    {
      facet: 3,
      title: 'Nedstämdhet',
      text: `Den här skalan mäter benägenheten att känna sig ledsen,
modfälld och missmodig. Högpoängare saknar energi och har svårt att
sätta igång aktiviteter. Lågpoängare är i regel fria från dessa
depressiva känslor.`
    },
    {
      facet: 4,
      title: 'Självmedvetenhet',
      text: `Självmedvetna personer är känsliga för vad
andra tycker om dem. Deras oro för att bli avvisade och förlöjligade
får dem att känna sig blyga och obekväma i andras sällskap. De
generas lätt och känner ofta skam. Deras rädsla för att andra ska
kritisera eller driva med dem är överdriven och orealistisk, men
deras tafatthet och obehag kan göra rädslan till en självuppfyllande
profetia. Lågpoängare lider däremot inte av den felaktiga
föreställningen att alla iakttar och dömer dem. De känner sig inte
nervösa i sociala situationer.`
    },
    {
      facet: 5,
      title: 'Måttlöshet',
      text: `Måttlösa personer känner starka begär och
drifter som de har svårt att motstå. De tenderar att vara inriktade
på kortsiktiga nöjen och belöningar snarare än långsiktiga
konsekvenser. Lågpoängare upplever inte starka, oemotståndliga begär
och känner sig därför inte frestade till överdriven konsumtion.`
    },
    {
      facet: 6,
      title: 'Sårbarhet',
      text: `Personer med höga poäng på Sårbarhet upplever
panik, förvirring och hjälplöshet under press eller stress.
Lågpoängare känner sig mer balanserade, självsäkra och klartänkta
när de är stressade.`
    }
  ]
}

export default neuroticism
