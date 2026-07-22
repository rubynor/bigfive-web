import languages, { Language, LanguageCode } from './data/languages';

type RawItem = Omit<Question, 'num' | 'choices'>;

type QuestionsModule = { default: RawItem[] };
type ChoicesModule = { default: ChoiceKeyed };

// Static loader maps: bundlers (vite/vinxi) cannot resolve a fully dynamic
// import(`./data/${languageCode}/questions`) — every inventory must be a
// static specifier. Item text lives in the data modules; never edit it here.
const questionLoaders: Record<LanguageCode, () => Promise<QuestionsModule>> = {
  en: () => import('./data/en/questions'),
  'zh-cn': () => import('./data/zh-cn/questions'),
  'zh-hk': () => import('./data/zh-hk/questions'),
  hi: () => import('./data/hi/questions'),
  es: () => import('./data/es/questions'),
  fr: () => import('./data/fr/questions'),
  ru: () => import('./data/ru/questions'),
  id: () => import('./data/id/questions'),
  ur: () => import('./data/ur/questions'),
  de: () => import('./data/de/questions'),
  ja: () => import('./data/ja/questions'),
  it: () => import('./data/it/questions'),
  th: () => import('./data/th/questions'),
  uk: () => import('./data/uk/questions'),
  da: () => import('./data/da/questions'),
  no: () => import('./data/no/questions'),
  is: () => import('./data/is/questions'),
  fi: () => import('./data/fi/questions'),
  nl: () => import('./data/nl/questions'),
  ro: () => import('./data/ro/questions'),
  sq: () => import('./data/sq/questions'),
  sv: () => import('./data/sv/questions'),
  hr: () => import('./data/hr/questions'),
  et: () => import('./data/et/questions'),
  'pt-br': () => import('./data/pt-br/questions'),
  ar: () => import('./data/ar/questions'),
  he: () => import('./data/he/questions'),
  pl: () => import('./data/pl/questions'),
  ko: () => import('./data/ko/questions'),
  hu: () => import('./data/hu/questions'),
  fa: () => import('./data/fa/questions')
};

const choiceLoaders: Record<LanguageCode, () => Promise<ChoicesModule>> = {
  en: () => import('./data/en/choices'),
  'zh-cn': () => import('./data/zh-cn/choices'),
  'zh-hk': () => import('./data/zh-hk/choices'),
  hi: () => import('./data/hi/choices'),
  es: () => import('./data/es/choices'),
  fr: () => import('./data/fr/choices'),
  ru: () => import('./data/ru/choices'),
  id: () => import('./data/id/choices'),
  ur: () => import('./data/ur/choices'),
  de: () => import('./data/de/choices'),
  ja: () => import('./data/ja/choices'),
  it: () => import('./data/it/choices'),
  th: () => import('./data/th/choices'),
  uk: () => import('./data/uk/choices'),
  da: () => import('./data/da/choices'),
  no: () => import('./data/no/choices'),
  is: () => import('./data/is/choices'),
  fi: () => import('./data/fi/choices'),
  nl: () => import('./data/nl/choices'),
  ro: () => import('./data/ro/choices'),
  sq: () => import('./data/sq/choices'),
  sv: () => import('./data/sv/choices'),
  hr: () => import('./data/hr/choices'),
  et: () => import('./data/et/choices'),
  'pt-br': () => import('./data/pt-br/choices'),
  ar: () => import('./data/ar/choices'),
  he: () => import('./data/he/choices'),
  pl: () => import('./data/pl/choices'),
  ko: () => import('./data/ko/choices'),
  hu: () => import('./data/hu/choices'),
  fa: () => import('./data/fa/choices')
};

export async function getItems(languageCode: LanguageCode = 'en'): Promise<Question[]> {
  const questionLoader = questionLoaders[languageCode];
  const choiceLoader = choiceLoaders[languageCode];

  if (!questionLoader || !choiceLoader) {
    throw new Error(`Inventory ./data/${languageCode}/questions not found. Try another language input.`)
  }

  const [questions, choices] = await Promise.all([questionLoader(), choiceLoader()]);

  return questions.default.map((question, i) => ({
    ...question,
    num: ++i,
    choices: choices.default[question.keyed as keyof ChoiceKeyed]
  }))
}

export function getInfo(): Info {
  return {
    name: "Johnson's IPIP NEO-PI-R",
    id: 'johnson-120-ipip-neo-pi-r',
    shortId: 'b5-120',
    time: 10,
    questions: 120,
    languages
  }
}

export type Question = {
  domain: string;
  facet: number;
  id: string;
  keyed: string;
  num: number;
  text: string;
  choices: Choice[];
};

export type Choice = {
  color: number;
  score: number;
  text: string;
};

type ChoiceKeyed = {
  plus: Choice[];
  minus: Choice[];
}

export type Info = {
  name: string;
  id: string;
  shortId: string;
  time: number;
  questions: number;
  languages: Language[]
};
