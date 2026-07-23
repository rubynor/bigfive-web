import { type TemplateDomain } from '../../types'

const extraversion: TemplateDomain = {
  domain: 'E',
  title: 'Extraversion',
  shortDescription: 'Extraversion kännetecknas av ett uttalat engagemang i den yttre världen.',
  description: `Extraverta människor trivs i sällskap med andra, är fulla av
energi och upplever ofta positiva känslor. De tenderar att vara
entusiastiska, handlingsorienterade personer som sannolikt säger
"Ja!" eller "Kom, vi kör!" när det bjuds på spänning. I grupper
pratar de gärna, hävdar sig själva och drar uppmärksamheten till sig.
<br /><br />
Introverta saknar extravertas sprudlande humör, energi och
aktivitetsnivå. De tenderar att vara tystlåtna, lågmälda,
eftertänksamma och tillbakadragna från den sociala världen. Deras
brist på socialt engagemang bör inte tolkas som blyghet eller
depression; den introverta behöver helt enkelt mindre stimulans än en
extravert och föredrar att vara ensam. <br /><br />Den introvertas
självständighet och återhållsamhet misstas ibland för ovänlighet
eller arrogans. I verkligheten söker en introvert person med höga
poäng på vänlighetsdimensionen inte upp andra, men är mycket trevlig
när någon tar kontakt.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Ditt resultat på Extraversion är lågt, vilket tyder på att du är
introvert, reserverad och tystlåten. Du trivs i ensamhet och med
aktiviteter på egen hand. Ditt umgänge begränsar sig i regel till
några få nära vänner.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Ditt resultat på Extraversion är genomsnittligt, vilket tyder på
att du varken är en dämpad enstöring eller en glad pratmakare. Du
trivs både med tid tillsammans med andra och med tid för dig själv.`
    },
    {
      score: 'high', // do not translate this line
      text: `Ditt resultat på Extraversion är högt, vilket tyder på att du är
social, utåtriktad, energisk och livfull. Du föredrar att vara
omgiven av människor större delen av tiden.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Värme',
      text: `Varmhjärtade människor tycker genuint om andra
och visar öppet positiva känslor gentemot dem. De skaffar vänner
snabbt och det är lätt för dem att knyta nära, intima relationer.
Lågpoängare på Värme är inte nödvändigtvis kalla och fientliga, men
de sträcker sig inte efter andra och uppfattas som distanserade och
reserverade.`
    },
    {
      facet: 2,
      title: 'Sällskaplighet',
      text: `Sällskapliga människor finner andras sällskap
behagligt stimulerande och givande. De njuter av stämningen i en
folkmassa. Lågpoängare tenderar att känna sig överväldigade av stora
folksamlingar och undviker dem därför aktivt. De ogillar inte
nödvändigtvis att vara bland människor ibland, men deras behov av
privatliv och tid för sig själva är mycket större än hos personer
som får höga poäng på den här skalan.`
    },
    {
      facet: 3,
      title: 'Bestämdhet',
      text: `Personer med höga poäng på Bestämdhet gillar att
säga sin mening, ta befälet och styra andras aktiviteter. De
tenderar att vara ledare i grupper. Lågpoängare pratar i regel inte
så mycket och låter andra styra gruppens aktiviteter.`
    },
    {
      facet: 4,
      title: 'Aktivitetsnivå',
      text: `Aktiva människor lever ett liv i högt tempo med
mycket att göra. De rör sig snabbt, energiskt och kraftfullt och är
engagerade i många aktiviteter. Personer med låga poäng på den här
skalan håller ett lugnare, mer makligt och avslappnat tempo.`
    },
    {
      facet: 5,
      title: 'Spänningssökande',
      text: `Högpoängare på den här skalan blir lätt
uttråkade utan hög stimulansnivå. De älskar starka ljus och ett
livligt tempo. De är benägna att ta risker och söka kickar.
Lågpoängare överväldigas av oväsen och tumult och undviker
spänningssökande.`
    },
    {
      facet: 6,
      title: 'Glädje',
      text: `Den här skalan mäter positivt humör och positiva
känslor, inte negativa känslor (vilka hör till domänen
Neuroticism). Personer med höga poäng på den här skalan upplever
vanligtvis en rad positiva känslor, bland annat lycka, entusiasm,
optimism och glädje. Lågpoängare är inte lika benägna till sådant
energiskt gott humör.`
    }
  ]
}

export default extraversion
