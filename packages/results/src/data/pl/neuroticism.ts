import { type TemplateDomain } from '../../types'

const neuroticism: TemplateDomain = {
  domain: 'N',
  title: 'Neurotyczność',
  shortDescription: 'Neurotyczność oznacza skłonność do doświadczania negatywnych uczuć.',
  description: `Freud pierwotnie używał terminu neuroza na określenie
stanu, któremu towarzyszy cierpienie psychiczne, emocjonalna męka
i niezdolność do skutecznego radzenia sobie z normalnymi wymogami
życia. Sugerował, że każdy przejawia pewne oznaki neurozy, ale
różnimy się stopniem cierpienia i konkretnymi objawami dyskomfortu.
Dziś neurotyczność oznacza skłonność do doświadczania negatywnych
uczuć. <br /><br />Osoby z wysokimi wynikami w Neurotyczności mogą
doświadczać przede wszystkim jednego konkretnego negatywnego uczucia,
takiego jak niepokój, złość czy depresja, ale prawdopodobnie
doświadczają kilku z tych emocji. <br /><br />Osoby o wysokiej
neurotyczności reagują emocjonalnie. Reagują emocjami na wydarzenia,
które nie ruszyłyby większości ludzi, a ich reakcje są zwykle
bardziej intensywne niż przeciętne. Częściej interpretują zwykłe
sytuacje jako zagrażające, a drobne frustracje jako beznadziejnie
trudne. <br /><br />Ich negatywne reakcje emocjonalne utrzymują się
niezwykle długo, co oznacza, że często są w złym nastroju. Te
problemy z regulacją emocji mogą osłabiać zdolność neurotyka do
jasnego myślenia, podejmowania decyzji i skutecznego radzenia
sobie ze stresem.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Twój wynik w Neurotyczności jest niski, co wskazuje, że jesteś
wyjątkowo spokojny, opanowany i niezachwiany. Nie reagujesz
intensywnymi emocjami nawet na sytuacje, które większość ludzi
uznałaby za stresujące.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Twój wynik w Neurotyczności jest przeciętny, co wskazuje, że
Twój poziom reaktywności emocjonalnej jest typowy dla populacji
ogólnej. Stresujące i frustrujące sytuacje wywołują u Ciebie pewne
rozstrojenie, ale zasadniczo potrafisz poradzić sobie z tymi uczuciami
i zmagać się z tymi sytuacjami.`
    },
    {
      score: 'high', // do not translate this line
      text: `Twój wynik w Neurotyczności jest wysoki, co wskazuje, że łatwo
się denerwujesz, nawet tym, co większość ludzi uważa za normalne
wymogi życia. Ludzie postrzegają Cię jako osobę wrażliwą
i emocjonalną.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Lęk',
      text: `Układ „walcz lub uciekaj” w mózgu osób lękowych
uruchamia się zbyt łatwo i zbyt często. Dlatego osoby o wysokim lęku
często czują, że zaraz stanie się coś niebezpiecznego. Mogą bać się
konkretnych sytuacji albo po prostu odczuwać ogólny strach. Czują
napięcie, drżenie i nerwowość. Osoby o niskim Lęku są zazwyczaj
spokojne i nieustraszone.`
    },
    {
      facet: 2,
      title: 'Gniew',
      text: `Osoby z wysokimi wynikami w Gniewie czują furię,
gdy sprawy nie idą po ich myśli. Są wrażliwe na sprawiedliwe
traktowanie i odczuwają żal oraz gorycz, gdy czują się oszukane.
Ta skala mierzy skłonność do odczuwania złości; to, czy osoba
wyraża irytację i wrogość, zależy od jej poziomu Ugodowości.
Osoby z niskimi wynikami nie złością się często ani łatwo.`
    },
    {
      facet: 3,
      title: 'Depresja',
      text: `Ta skala mierzy skłonność do odczuwania smutku,
przygnębienia i zniechęcenia. Osoby z wysokimi wynikami brakuje
energii i mają trudności z podejmowaniem działań. Osoby z niskimi
wynikami są zwykle wolne od tych depresyjnych uczuć.`
    },
    {
      facet: 4,
      title: 'Nieśmiałość',
      text: `Osoby nieśmiałe są wrażliwe na to, co inni
o nich myślą. Ich obawa przed odrzuceniem i wyśmianiem sprawia, że
w towarzystwie czują się nieśmiale i niekomfortowo. Łatwo wpadają
w zakłopotanie i często odczuwają wstyd. Ich obawy, że inni będą ich
krytykować lub z nich drwić, są przesadzone i nierealistyczne, ale
ich niezgrabność i dyskomfort mogą sprawić, że te obawy staną się
samospełniającą się przepowiednią. Osoby z niskimi wynikami,
przeciwnie, nie cierpią z powodu błędnego wrażenia, że wszyscy je
obserwują i oceniają. Nie czują się nerwowo w sytuacjach
towarzyskich.`
    },
    {
      facet: 5,
      title: 'Niepowściągliwość',
      text: `Osoby niepowściągliwe odczuwają silne pragnienia
i popędy, którym trudno im się oprzeć. Skłaniają się ku krótkoterminowym
przyjemnościom i nagrodom, a nie ku konsekwencjom długoterminowym.
Osoby z niskimi wynikami nie doświadczają silnych, nieodpartych
pragnień, dlatego nie są kuszone do nadmiernego oddawania się
przyjemnościom.`
    },
    {
      facet: 6,
      title: 'Bezradność',
      text: `Osoby z wysokimi wynikami w Bezradności
doświadczają paniki, dezorientacji i poczucia niemocy pod presją
lub w stresie. Osoby z niskimi wynikami w stresie czują się bardziej
opanowane, pewne siebie i myślą jaśniej.`
    }
  ]
}

export default neuroticism
