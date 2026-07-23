export interface Language {
  code: string
  name: string
}

export type LanguageCode = 'de' | 'da' | 'el' | 'en' | 'es' | 'fi' | 'fr' | 'he' | 'hi' | 'is' | 'it' | 'ja' | 'nl' | 'no' | 'pl' | 'ar' | 'pt' | 'pt-br' | 'id' | 'ro' | 'ru' | 'sv' | 'th' | 'uk' | 'zh'

const languages: Language[] = [
  {
    code: 'de',
    name: 'Deutsch'
  },
  {
    code: 'da',
    name: 'Danish'
  },
  {
    code: 'el',
    name: 'Greek'
  },
  {
    code: 'en',
    name: 'English'
  },
  {
    code: 'es',
    name: 'Spanish'
  },
  {
    code: 'fr',
    name: 'French'
  },
  {
    code: 'he',
    name: 'Hebrew'
  },
  {
    code: 'is',
    name: 'Icelandic'
  },
  {
    code: 'it',
    name: 'Italian'
  },
  {
    code: 'nl',
    name: 'Dutch'
  },
  {
    code: 'no',
    name: 'Norwegian'
  },
  {
    code: 'ar',
    name: 'Arabic'
  },
  {
    code: 'pt-br',
    name: 'Portuguese Brazilian'
  },
  {
    code: 'id',
    name: 'Indonesian'
  },
  {
    code: 'ro',
    name: 'Romanian'
  },
  {
    code: 'fi',
    name: 'Finnish'
  },
  {
    code: 'hi',
    name: 'Hindi'
  },
  {
    code: 'ja',
    name: 'Japanese'
  },
  {
    code: 'pl',
    name: 'Polish'
  },
  {
    code: 'pt',
    name: 'Portuguese'
  },
  {
    code: 'ru',
    name: 'Russian'
  },
  {
    code: 'sv',
    name: 'Swedish'
  },
  {
    code: 'th',
    name: 'Thai'
  },
  {
    code: 'uk',
    name: 'Ukrainian'
  },
  {
    code: 'zh',
    name: 'Chinese'
  }
]

export default languages
