import { type TemplateDomain } from '../../types'

const agreeableness: TemplateDomain = {
  domain: 'A',
  title: 'Vänlighet',
  shortDescription: 'Vänlighet speglar individuella skillnader i omsorg om samarbete och social harmoni. Vänliga människor värdesätter att komma överens med andra.',
  description: `De är därför hänsynsfulla, vänliga,
generösa, hjälpsamma och villiga att kompromissa om sina egna
intressen till förmån för andras. Vänliga människor har också en
optimistisk syn på människans natur. De tror att människor i grunden
är ärliga, anständiga och pålitliga. <br /><br />
Människor med låg vänlighet sätter sina egna intressen framför att
komma överens med andra. De bryr sig i allmänhet inte särskilt mycket
om andras välbefinnande och sträcker sig därför sällan till för andra
människor. Ibland gör deras skepsis mot andras motiv dem
misstänksamma, ovänliga och ovilliga att samarbeta.
<br /><br />
Vänlighet är uppenbarligen en fördel när det gäller att vinna och
behålla popularitet. Vänliga människor är mer omtyckta än ovänliga.
Å andra sidan är vänlighet inte till nytta i situationer som kräver
hårda eller helt objektiva beslut. Ovänliga människor kan vara
utmärkta forskare, kritiker eller soldater.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Ditt resultat på Vänlighet är lågt, vilket tyder på att du
bryr dig mindre om andras behov än om dina egna. Andra upplever dig
som hård, kritisk och kompromisslös.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Din nivå av Vänlighet är genomsnittlig, vilket tyder på en viss
omsorg om andras behov, men i allmänhet en ovilja att offra dig
själv för andra.`
    },
    {
      score: 'high', // do not translate this line
      text: `Din höga nivå av Vänlighet tyder på ett starkt intresse för
andras behov och välbefinnande. Du är trevlig, medkännande och
samarbetsvillig.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Tillit',
      text: `En person med hög tillit utgår ifrån att de flesta
människor är rättvisa, ärliga och har goda avsikter. Personer med låg
tillit ser andra som själviska, listiga och potentiellt farliga.`
    },
    {
      facet: 2,
      title: 'Rättframhet',
      text: `Personer med höga poäng på den här skalan ser inget
behov av att låtsas eller manipulera i kontakten med andra och är
därför uppriktiga, öppenhjärtiga och äkta. Personer med låga poäng
tror att en viss grad av oärlighet är nödvändig i sociala relationer.
De flesta tycker att det är relativt lätt att förhålla sig till de
rättframma personer som får höga poäng på skalan. De finner det i
allmänhet svårare att förhålla sig till de mindre rättframma
lågpoängarna. Det bör klargöras att lågpoängare inte är principlösa
eller omoraliska; de är helt enkelt mer reserverade och mindre
villiga att öppet avslöja hela sanningen.`
    },
    {
      facet: 3,
      title: 'Altruism',
      text: `Altruistiska människor finner det genuint givande
att hjälpa andra. De är därför i allmänhet villiga att bistå dem som
är i nöd. Altruistiska människor upplever att göra saker för andra är
en form av självförverkligande snarare än självuppoffring.
Lågpoängare på den här skalan tycker inte särskilt mycket om att
hjälpa människor i nöd. Förfrågningar om hjälp känns som en
betungande börda snarare än en möjlighet till självförverkligande.`
    },
    {
      facet: 4,
      title: 'Samarbetsvillighet',
      text: `Personer som får höga poäng på den här skalan
ogillar konfrontationer. De är fullt villiga att kompromissa eller
att frånsäga sig sina egna behov för att komma överens med andra. De
som får låga poäng är mer benägna att köra över andra för att få sin
vilja igenom.`
    },
    {
      facet: 5,
      title: 'Ödmjukhet',
      text: `Personer med höga poäng på den här skalan tycker
inte om att påstå att de är bättre än andra. I vissa fall kan den här
attityden bero på lågt självförtroende eller låg självkänsla. Ändå
finns det människor med hög självkänsla som tycker att oödmjukhet är
opassande. De som gärna beskriver sig själva som överlägsna brukar
uppfattas som obehagligt arroganta av andra.`
    },
    {
      facet: 6,
      title: 'Medkänsla',
      text: `Personer som får höga poäng på den här skalan är
ömhjärtade och medlidsamma. De känner andras smärta som om den vore
deras egen och rörs lätt till medlidande. Lågpoängare påverkas inte
starkt av mänskligt lidande. De är stolta över att fatta objektiva
bedömningar baserade på förnuft. De bryr sig mer om sanning och
opartisk rättvisa än om barmhärtighet.`
    }
  ]
}

export default agreeableness
