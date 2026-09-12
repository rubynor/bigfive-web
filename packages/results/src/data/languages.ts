export interface Language {
  code: string
  name: string
}

export type LanguageCode = 'de' | 'da' | 'el' | 'en' | 'es' | 'fr' | 'he' | 'is' | 'it' | 'nl' | 'no' | 'ar' | 'pt-br' | 'id' | 'ro' | 'ru'

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
    code: 'ru',
    name: 'Russian'
  }
]

export default languages
