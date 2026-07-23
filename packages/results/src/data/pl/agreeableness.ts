import { type TemplateDomain } from '../../types'

const agreeableness: TemplateDomain = {
  domain: 'A',
  title: 'Ugodowość',
  shortDescription: 'Ugodowość odzwierciedla indywidualne różnice w dbałości o współpracę i społeczną harmonię. Osoby ugodowe cenią dobre relacje z innymi.',
  description: `Są z tego powodu uczynne, przyjazne,
hojne, pomocne i gotowe iść na kompromis w sytuacjach konfliktu
własnych interesów z interesami innych. Osoby ugodowe mają także
optymistyczny obraz ludzkiej natury. Wierzą, że ludzie są w zasadzie
uczciwi, przyzwoici i godni zaufania. <br /><br />
Osoby o niskiej ugodowości stawiają własny interes ponad dobre relacje
z innymi. Zasadniczo nie przejmują się cudzym dobrem, dlatego mało
prawdopodobne, żeby poświęcali się dla innych. Czasem ich sceptycyzm
co do motywów innych sprawia, że bywają podejrzliwi, nieprzyjaźni
i niechętni do współpracy.
<br /><br />
Ugodowość jest oczywiście korzystna dla zdobycia i utrzymania
popularności. Osoby ugodowe są bardziej lubiane niż osoby nieugodowe.
Z drugiej strony ugodowość nie pomaga w sytuacjach wymagających twardych
lub bezwzględnie obiektywnych decyzji. Osoby o niskiej ugodowości mogą
być świetnymi naukowcami, krytykami lub żołnierzami.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Twój wynik w Ugodowości jest niski, co wskazuje, że mniej
troszczysz się o potrzeby innych niż o własne. Ludzie postrzegają
Cię jako osobę twardą, krytyczną i bezkompromisową.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Twój poziom Ugodowości jest przeciętny, co wskazuje na pewne
zainteresowanie potrzebami innych, ale zasadniczo na niechęć
do poświęcania się dla nich.`
    },
    {
      score: 'high', // do not translate this line
      text: `Twój wysoki poziom Ugodowości wskazuje na silne zainteresowanie
potrzebami i dobrem innych. Jesteś osobą miłą, współczującą
i chętną do współpracy.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Zaufanie',
      text: `Osoba o wysokim zaufaniu zakłada, że większość ludzi
jest uczciwa, szczera i ma dobre intencje. Osoby o niskim zaufaniu
postrzegają innych jako egoistycznych, podstępnych i potencjalnie
niebezpiecznych.`
    },
    {
      facet: 2,
      title: 'Prawość',
      text: `Osoby z wysokimi wynikami na tej skali nie widzą potrzeby
pozorów ani manipulacji w kontaktach z innymi, dlatego są szczere,
otwarte i bezpośrednie. Osoby z niskimi wynikami uważają, że pewna
ilość przemilczeń w relacjach społecznych jest konieczna. Ludziom
stosunkowo łatwo nawiązywać relacje z bezpośrednimi osobami
z wysokimi wynikami na tej skali. Zasadniczo trudniej jest im
nawiązać relację z mniej bezpośrednimi osobami z niskimi
wynikami. Należy jasno powiedzieć, że osoby z niskimi wynikami
nie są bez zasad ani niemoralne; są po prostu bardziej powściągliwe
i mniej skłonne do otwartego ujawniania całej prawdy.`
    },
    {
      facet: 3,
      title: 'Altruizm',
      text: `Osoby altruistyczne uważają pomaganie innym za
coś naprawdę satysfakcjonującego. W rezultacie są zazwyczaj gotowe
pomagać tym, którzy są w potrzebie. Dla osób altruistycznych działanie
na rzecz innych jest formą samorealizacji, a nie poświęcenia. Osoby
z niskimi wynikami na tej skali nie przepadają za pomaganiem osobom
w potrzebie. Prośby o pomoc odbierają raczej jako uciążliwość niż
jako szansę na samorealizację.`
    },
    {
      facet: 4,
      title: 'Współpraca',
      text: `Osoby z wysokimi wynikami na tej skali
nie lubią konfrontacji. Chętnie idą na kompromis lub ograniczają
własne potrzeby, by dobrze żyć z innymi. Osoby z niskimi wynikami
częściej zastraszają innych, by osiągnąć swoje cele.`
    },
    {
      facet: 5,
      title: 'Skromność',
      text: `Osoby z wysokimi wynikami na tej skali nie lubią twierdzić,
że są lepsze od innych. W niektórych przypadkach taka postawa może
wynikać z niskiej pewności siebie lub poczucia własnej wartości.
Niemniej niektórzy ludzie o wysokiej samoocenie uważają brak
skromności za nieodpowiedni. Osoby skłonne przedstawiać siebie
jako lepsze bywają postrzegane przez innych jako nieprzyjemnie
aroganckie.`
    },
    {
      facet: 6,
      title: 'Współczucie',
      text: `Osoby z wysokimi wynikami na tej skali są
czułe i pełne empatii. Odczuwają cudzy ból niemal wspólnie i łatwo
się wzruszają. Osoby z niskimi wynikami nie są silnie poruszane
ludzkim cierpieniem. Szczycą się formułowaniem obiektywnych sądów
opartych na rozumie. Bardziej troszczą się o prawdę i bezstronną
sprawiedliwość niż o litość.`
    }
  ]
}

export default agreeableness
