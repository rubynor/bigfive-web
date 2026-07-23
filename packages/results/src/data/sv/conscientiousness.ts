import { type TemplateDomain } from '../../types'

const conscientiousness: TemplateDomain = {
  domain: 'C',
  title: 'Samvetsgrannhet',
  shortDescription: 'Samvetsgrannhet handlar om hur vi kontrollerar, reglerar och styr våra impulser.',
  description: `Impulser är inte i sig dåliga;
ibland kräver tidspress ett snabbt beslut, och att agera på sin
första ingivelse kan vara ett effektivt svar. Dessutom kan det, i
lek snarare än i arbete, vara roligt att agera spontant och
impulsivt. Impulsiva människor kan av andra uppfattas som
färgstarka, roliga att vara med och knäppa.
<br /><br />
Ändå kan det att agera på impuls leda till problem på flera sätt.
Vissa impulser är asociala. Okontrollerade asociala handlingar skadar
inte bara andra medlemmar av samhället, utan kan också leda till
vedergällning mot den som begått sådana impulsiva handlingar. Ett
annat problem med impulsiva handlingar är att de ofta ger omedelbara
belöningar men oönskade, långsiktiga konsekvenser. Exempel är
överdrivet umgänge som leder till att man blir avskedad från sitt
jobb, en kastad förolämpning som orsakar slutet på en viktig
relation, eller bruk av njutningsframkallande droger som till slut
förstör ens hälsa.
<br /><br />
Impulsivt beteende, även när det inte är allvarligt destruktivt,
minskar en persons effektivitet på betydande sätt. Att agera
impulsivt utesluter att överväga alternativa handlingsvägar, av
vilka vissa skulle ha varit klokare än det impulsiva valet.
Impulsivitet leder också människor bort från spåret under projekt
som kräver organiserade steg eller etapper. En impulsiv persons
prestationer blir därför små, spridda och ojämna.
<br /><br />
Ett kännetecken för intelligens, det som potentiellt skiljer
människan från tidigare livsformer, är förmågan att tänka på
framtida konsekvenser innan man agerar på en impuls. Intelligent
handlande innebär att överväga långsiktiga mål, att organisera och
planera vägarna till dessa mål och att hålla fast vid sina mål trots
kortlivade impulser i motsatt riktning. Tanken att intelligens
innebär impulskontroll fångas väl av begreppet omdömesgillhet, ett
alternativt namn på domänen Samvetsgrannhet. Att vara omdömesgill
betyder både att vara klok och att vara försiktig.
<br /><br/>
Personer som får höga poäng på
Samvetsgrannhetsskalan uppfattas faktiskt av andra som intelligenta.
Fördelarna med hög samvetsgrannhet är uppenbara. Samvetsgranna
människor undviker problem och når hög framgång genom målmedveten
planering och uthållighet. De uppskattas också av andra som
intelligenta och pålitliga. På minussidan kan de vara tvångsmässiga
perfektionister och arbetsnarkomaner. Dessutom kan extremt
samvetsgranna personer uppfattas som stela och tråkiga.
<br /><br />
Människor med låg samvetsgrannhet kan kritiseras för
sin opålitlighet, brist på ambition och ovilja att hålla sig inom
ramarna, men de kommer att uppleva många kortlivade nöjen, och de
kommer aldrig att kallas stela.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Ditt resultat på Samvetsgrannhet är lågt, vilket tyder på att du
gillar att leva i nuet och göra det som känns bra just nu. Ditt
arbete tenderar att vara slarvigt och oorganiserat.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Ditt resultat på Samvetsgrannhet är genomsnittligt. Det betyder
att du är rimligen pålitlig, organiserad och självkontrollerad.`
    },
    {
      score: 'high', // do not translate this line
      text: `Ditt resultat på Samvetsgrannhet är högt. Det betyder att du
sätter upp tydliga mål och strävar mot dem med beslutsamhet. Andra
ser dig som pålitlig och hårt arbetande.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Tilltro till egen förmåga',
      text: `Tilltro till egen förmåga beskriver tilliten till sin
förmåga att åstadkomma saker. Högpoängare tror att de har den
intelligens (det sunda förnuft), den drivkraft och den självkontroll
som krävs för att lyckas. Lågpoängare känner sig inte effektiva och
kan uppleva att de inte har kontroll över sina liv.`
    },
    {
      facet: 2,
      title: 'Ordning',
      text: `Personer med höga poäng på ordning är
välorganiserade. De gillar att leva efter rutiner och scheman. De
för listor och gör planer. Lågpoängare tenderar att vara
oorganiserade och splittrade.`
    },
    {
      facet: 3,
      title: 'Plikttrogenhet',
      text: `Den här skalan återspeglar styrkan i en persons
känsla av plikt och skyldighet. De som får höga poäng på skalan har
en stark känsla av moralisk förpliktelse. Lågpoängare tycker att
kontrakt, regler och bestämmelser är alltför begränsande. De
riskerar att ses som opålitliga eller till och med ansvarslösa.`
    },
    {
      facet: 4,
      title: 'Prestationssträvan',
      text: `Personer som får höga poäng på den här
skalan strävar hårt efter att nå excellens. Deras drivkraft att bli
erkända som framgångsrika håller dem på väg mot sina höga mål. De
har ofta en stark känsla av riktning i livet, men extremt höga poäng
kan innebära att man blir för enveten och besatt av sitt arbete.
Lågpoängare nöjer sig med att klara sig med en minimal arbetsinsats
och kan av andra uppfattas som lata.`
    },
    {
      facet: 5,
      title: 'Självdisciplin',
      text: `Självdisciplin – det många kallar
viljestyrka – avser förmågan att hålla ut i svåra eller obehagliga
uppgifter tills de är slutförda. Personer med hög självdisciplin kan
övervinna sin motvilja mot att sätta igång med uppgifter och håller
sig på spåret trots distraktioner. De med låg självdisciplin
skjuter upp saker och visar dålig uppföljning, och misslyckas ofta
med att slutföra uppgifter – till och med uppgifter de verkligen
vill slutföra.`
    },
    {
      facet: 6,
      title: 'Försiktighet',
      text: `Försiktighet beskriver benägenheten att
tänka igenom möjligheterna innan man handlar. Högpoängare på
Försiktighetsskalan tar sig tid när de fattar beslut. Lågpoängare
säger eller gör ofta det första som faller dem in, utan att överväga
alternativ och dessa alternativs sannolika konsekvenser.`
    }
  ]
}

export default conscientiousness
