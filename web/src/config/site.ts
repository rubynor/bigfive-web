export type SiteConfig = typeof siteConfig;

export const basePath = 'https://bigfive-test.com';

// Deliberately greppable sentinel: every deployment must override this via
// VITE_SUPPORT_EMAIL (fork decision — never ship the upstream address).
export const supportEmail =
  import.meta.env.VITE_SUPPORT_EMAIL || 'REPLACE_ME@example.com';

export type Language = {
  code: string;
  name: string;
  countryCode?: string;
  map?: string[];
};

export const languages: Language[] = [
  { code: 'en', name: 'English', countryCode: 'us', map: ['en-GB'] },
  { code: 'ar', name: 'Arabic', map: ['ar-sa'] },
  { code: 'de', name: 'German', countryCode: 'de', map: ['de-DE'] },
  {
    code: 'es',
    name: 'Spanish',
    countryCode: 'es',
    map: ['es-ES', 'es-US', 'es-MX', 'ca']
  },
  { code: 'fr', name: 'French', countryCode: 'fr', map: ['fr-FR', 'fr-CA'] },
  { code: 'id', name: 'Indonesian', countryCode: 'id' },
  { code: 'it', name: 'Italian', countryCode: 'it', map: ['it-IT'] },
  { code: 'no', name: 'Norwegian', countryCode: 'no', map: ['nb', 'nn'] },
  {
    code: 'pt',
    name: 'Portuguese',
    countryCode: 'pt',
    map: ['pt-BR', 'pt-PT']
  },
  { code: 'sv', name: 'Swedish', countryCode: 'se' },
  { code: 'uk', name: 'Ukrainian', countryCode: 'ua' },
  { code: 'da', name: 'Danish', countryCode: 'dk' },
  { code: 'fi', name: 'Finnish', countryCode: 'fi' },
  { code: 'hi', name: 'Hindi', countryCode: 'in' },
  { code: 'is', name: 'Icelandic', countryCode: 'is' },
  { code: 'ja', name: 'Japanese', countryCode: 'jp' },
  { code: 'pl', name: 'Polish', countryCode: 'pl' },
  { code: 'ru', name: 'Russian', countryCode: 'ru' },
  { code: 'th', name: 'Thai', countryCode: 'th' },
  {
    code: 'zh',
    name: 'Chinese',
    countryCode: 'cn',
    map: ['zh-CN', 'zh-Hans', 'zh-Hant']
  }
];

export const locales = languages.map((lang) => lang.code) as string[];

export const siteConfig = {
  name: 'Big Five Personality Test',
  creator: '@maccyber',
  description:
    'Learn to know yourself better with a free, open-source personality test.',
  navItems: [
    {
      label: 'home',
      href: '/'
    },
    {
      label: 'result',
      href: '/result'
    },
    {
      label: 'compare',
      href: '/compare'
    },
    {
      label: 'about',
      href: '/about'
    }
  ],
  navMenuItems: [
    {
      label: 'home',
      href: '/'
    },
    {
      label: 'see_results',
      href: '/result'
    },
    {
      label: 'compare_with',
      href: '/compare'
    },
    {
      label: 'privacy',
      href: '/privacy'
    },
    {
      label: 'about',
      href: '/about'
    },
    {
      label: 'faq',
      href: '/faq'
    }
  ],
  footerLinks: [
    {
      label: 'home',
      href: '/'
    },
    {
      label: 'privacy',
      href: '/privacy'
    },
    {
      label: 'about',
      href: '/about'
    },
    {
      label: 'faq',
      href: '/faq'
    }
  ],
  links: {
    github: 'https://github.com/rubynor/bigfive-web'
  }
};
