import { type TemplateDomain } from '../../types'

const extraversion: TemplateDomain = {
  domain: 'E',
  title: 'Ekstrawersja',
  shortDescription: 'Ekstrawersja przejawia się wyraźnym zaangażowaniem w świat zewnętrzny.',
  description: `Ekstrawertycy lubią przebywać z ludźmi, są pełni energii i
często doświadczają pozytywnych emocji. Są zwykle entuzjastyczni
i zorientowani na działanie — to osoby, które na możliwość przeżycia
czegoś ekscytującego zwykle odpowiadają „Tak!” albo „Chodźmy!”.
W grupach lubią rozmawiać, stawiać na swoim i przyciągać uwagę.
<br /><br />
Introwertycy nie mają ekscytacji, energii i poziomu aktywności
ekstrawertyków. Są zwykle cisi, stonowani, rozważni i mniej
zaangażowani w życie towarzyskie. Ich brak zaangażowania społecznego
nie powinien być interpretowany jako nieśmiałość czy depresja;
introwertyk po prostu potrzebuje mniej stymulacji niż ekstrawertyk
i woli być sam. <br /><br />Niezależność i powściągliwość introwertyka
bywają czasem mylone z nieprzyjaźnością lub arogancją. W rzeczywistości
introwertyk o wysokiej ugodowości nie będzie zabiegał o kontakt
z innymi, ale po zaczepieniu okaże się całkiem miły.`,
  results: [
    {
      score: 'low', // do not translate this line
      text: `Twój wynik w Ekstrawersji jest niski, co wskazuje, że jesteś
introwertyczny, powściągliwy i cichy. Lubisz samotność i zajęcia
wykonywane w pojedynkę. Twoje życie towarzyskie ogranicza się zwykle
do kilku bliskich przyjaciół.`
    },
    {
      score: 'neutral', // do not translate this line
      text: `Twój wynik w Ekstrawersji jest przeciętny, co wskazuje, że nie
jesteś ani wycofanym samotnikiem, ani wesołym gadułą. Lubisz czas
spędzany z innymi, ale też chwile w samotności.`
    },
    {
      score: 'high', // do not translate this line
      text: `Twój wynik w Ekstrawersji jest wysoki, co wskazuje, że jesteś
towarzyski, otwarty, energiczny i pełen życia. Przez większość
czasu wolisz przebywać wśród ludzi.`
    }
  ],
  facets: [
    {
      facet: 1,
      title: 'Serdeczność',
      text: `Osoby serdeczne naprawdę lubią innych ludzi
i otwarcie okazują im pozytywne uczucia. Szybko zawierają
przyjaźnie i łatwo nawiązują bliskie, intymne relacje. Osoby
z niskimi wynikami w Serdeczności nie są koniecznie zimne
i wrogie, ale nie wyciągają ręki do innych i są postrzegane
jako dystansowane i powściągliwe.`
    },
    {
      facet: 2,
      title: 'Towarzyskość',
      text: `Osoby towarzyskie uważają przebywanie
wśród ludzi za przyjemnie stymulujące i satysfakcjonujące. Lubią
ekscytację tłumu. Osoby z niskimi wynikami czują się przytłoczone
dużymi tłumami, a więc aktywnie ich unikają. Nie muszą w ogóle
nie lubić przebywania z ludźmi od czasu do czasu, ale ich potrzeba
prywatności i czasu dla siebie jest znacznie większa niż u osób
z wysokimi wynikami na tej skali.`
    },
    {
      facet: 3,
      title: 'Asertywność',
      text: `Osoby z wysokimi wynikami w Asertywności lubią
zabierać głos, przejmować dowodzenie i kierować działaniami innych.
Zwykle stają się liderami grup. Osoby z niskimi wynikami zwykle niewiele
mówią i pozwalają innym kierować działaniami grupy.`
    },
    {
      facet: 4,
      title: 'Poziom aktywności',
      text: `Osoby aktywne prowadzą szybkie, pełne
zajęć życie. Poruszają się szybko, energicznie i żwawo oraz angażują
się w wiele działań. Osoby z niskimi wynikami na tej skali żyją
w wolniejszym, spokojniejszym i bardziej zrelaksowanym tempie.`
    },
    {
      facet: 5,
      title: 'Poszukiwanie wrażeń',
      text: `Osoby z wysokimi wynikami na tej skali
łatwo się nudzą bez wysokiego poziomu stymulacji. Kochają jasne światła
i gwar. Są skłonne do ryzyka i poszukiwania dreszczyku emocji. Osoby
z niskimi wynikami są przytłoczone hałasem i zamętem oraz niechętne
poszukiwaniu wrażeń.`
    },
    {
      facet: 6,
      title: 'Pogodny nastrój',
      text: `Ta skala mierzy pozytywny nastrój i
uczucia, a nie emocje negatywne (które należą do wymiaru
Neurotyczności). Osoby z wysokimi wynikami na tej skali zwykle
doświadczają całej gamy pozytywnych uczuć, w tym szczęścia,
entuzjazmu, optymizmu i radości. Osoby z niskimi wynikami rzadziej
doświadczają tak energicznego, wysokiego nastroju.`
    }
  ]
}

export default extraversion
