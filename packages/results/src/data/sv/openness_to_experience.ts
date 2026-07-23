import { type TemplateDomain } from '../../types'

const openness: TemplateDomain = {
  domain: 'O',
  title: 'Öppenhet för upplevelser',
  shortDescription: 'Öppenhet för upplevelser beskriver en dimension av kognitiv stil som skiljer fantasifulla, kreativa människor från jordnära, konventionella.',
  description: `Öppna människor är intellektuellt nyfikna,
uppskattar konst och är mottagliga för skönhet. Jämfört med slutna
människor tenderar de att vara mer medvetna om sina känslor. De
tenderar att tänka och agera individualistiskt och
icke-konformistiskt. Intellektuella får vanligtvis höga poäng på
Öppenhet för upplevelser; faktorn har därför också kallats Kultur
eller Intellekt. <br /><br />Intellekt bör dock nog ses som en aspekt av
öppenhet för upplevelser. Poäng på Öppenhet för upplevelser hänger
bara måttligt samman med utbildningslängd och resultat på vanliga
intelligenstester.
<br /><br />
Ett annat kännetecken för den öppna kognitiva stilen är en fallenhet
för att tänka i symboler och abstraktioner långt bortom den konkreta
erfarenheten. Beroende på individens specifika intellektuella förmågor
kan detta symboliska tänkande ta formen av matematiskt, logiskt eller
geometriskt tänkande, konstnärligt och metaforiskt språkbruk,
musikkomposition eller musikframförande, eller någon av de många
visuella eller sceniska konstformerna.
<br /><br />
Människor med låga poäng på öppenhet för upplevelser tenderar att ha
smala, vanliga intressen. De föredrar det enkla, rättframma och
uppenbara framför det komplexa, mångtydiga och subtila. De kan se på
konst och vetenskap med misstänksamhet och betrakta dessa sysslor som
svårtillgängliga eller utan praktisk nytta. Slutna människor föredrar
det välbekanta framför det nya; de är konservativa och motsträviga
inför förändring.
<br /><br />
Öppenhet framställs ofta som hälsosammare eller mognare av psykologer,
som själva ofta är öppna för upplevelser. Öppna och slutna tankesätt
är dock användbara i olika miljöer. Den öppna personens intellektuella
stil kan passa en professor väl, men forskning har visat att slutet
tänkande hänger samman med bättre arbetsprestationer inom polisarbete,
försäljning och ett antal serviceyrken.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Ditt resultat på Öppenhet för upplevelser är lågt, vilket tyder
på att du gillar att tänka i enkla och okomplicerade termer. Andra
beskriver dig som jordnära, praktisk och konservativ.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Ditt resultat på Öppenhet för upplevelser är genomsnittligt,
vilket tyder på att du uppskattar traditioner men är villig att prova
nya saker. Ditt tänkande är varken enkelt eller komplext. För andra
framstår du som en välutbildad person men inte som en intellektuell.`
    },
    {
      score: 'high', // do not translate this line
      text: `Ditt resultat på Öppenhet för upplevelser är högt, vilket tyder
på att du uppskattar nya intryck, variation och förändring. Du är
nyfiken, fantasifull och kreativ.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Fantasi',
      text: `För fantasifulla människor är den verkliga världen
ofta för alldaglig och banal. Högpoängare på den här skalan använder
fantasin för att skapa en rikare, intressantare värld. Lågpoängare
på skalan är mer inriktade på fakta än på fantasi.`
    },
    {
      facet: 2,
      title: 'Konstnärliga intressen',
      text: `Högpoängare på den här skalan älskar skönhet, både i
konsten och i naturen. De engageras och fördjupas lätt i konstnärliga
och naturliga upplevelser. De är inte nödvändigtvis konstnärligt
utbildade eller begåvade, även om många är det. Skalans avgörande
drag är intresset för, och uppskattningen av, naturlig och konstgjord
skönhet. Lågpoängare saknar estetisk känslighet och intresse för
konsten.`
    },
    {
      facet: 3,
      title: 'Känslor',
      text: `Personer med höga poäng på Känslor har god tillgång
till och medvetenhet om sina egna känslor. Lågpoängare är mindre
medvetna om sina känslor och tenderar att inte uttrycka sina känslor
öppet.`
    },
    {
      facet: 4,
      title: 'Äventyrlighet',
      text: `Högpoängare på äventyrlighet är ivriga att
prova nya aktiviteter, resa till främmande länder och uppleva olika
saker. De tycker att det välbekanta och rutinerna är tråkiga och tar
gärna en ny väg hem bara för att den är annorlunda. Lågpoängare
tenderar att känna sig obekväma med förändringar och föredrar
bekanta rutiner.`
    },
    {
      facet: 5,
      title: 'Intellekt',
      text: `Intellekt och konstnärliga intressen är de två
viktigaste, mest centrala aspekterna av öppenhet för upplevelser.
Högpoängare på Intellekt älskar att leka med idéer. De är
öppensinnade för nya och ovanliga idéer och gillar att debattera
intellektuella frågor. De tycker om gåtor, pussel och klurigheter.
Lågpoängare på Intellekt föredrar att syssla med människor eller
saker hellre än idéer. De anser att intellektuella övningar är
slöseri med tid. Intellekt bör inte förväxlas med intelligens.
Intellekt är en intellektuell stil, inte en intellektuell förmåga,
även om högpoängare på Intellekt får något högre resultat än
lågpoängare på standardiserade intelligenstester.`
    },
    {
      facet: 6,
      title: 'Liberalism',
      text: `Psykologisk liberalism avser en beredskap att
ifrågasätta auktoritet, konventioner och traditionella värderingar.
I sin mest extrema form kan psykologisk liberalism till och med
innebära ren fientlighet mot regler, sympati för lagbrytare och
kärlek till tvetydighet, kaos och oordning. Psykologiskt konservativa
föredrar den trygghet och stabilitet som följer av att anpassa sig
till traditionen. Psykologisk liberalism och konservatism är inte
identiska med politisk tillhörighet, men gör visserligen individer
mer benägna att sympatisera med vissa politiska partier.`
    }
  ]
}

export default openness
