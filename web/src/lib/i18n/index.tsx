// i18n for the SolidStart app (Phase 4 step 3), replacing next-intl.
//
// - 20 locale bundles in src/messages (kept from the Next app); non-en bundles
//   may be partial, missing keys fall back to English.
// - As-needed locale prefix routing (og-compatible): English is unprefixed
//   (/test), every other locale is prefixed (/de/test). /en/... redirects to
//   the canonical unprefixed URL — see locale-route.tsx.
// - RTL via rtl-detect (only 'ar' among our locales), applied to <html dir>
//   together with <html lang> on the client.

import {
  createContext,
  createEffect,
  createMemo,
  createResource,
  useContext,
  type Accessor,
  type ParentProps
} from 'solid-js';
import { useLocation } from '@solidjs/router';
import { flatten, type Flatten } from '@solid-primitives/i18n';
import rtlDetect from 'rtl-detect';
import { locales } from '~/config/site';
import en from '~/messages/en';

export type RawDictionary = typeof en;
export type Dictionary = Flatten<RawDictionary>;
export type MessageKey = keyof Dictionary & string;

// Non-en bundles are allowed to be partial at any nesting depth — missing
// keys fall back to English at lookup time.
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// Static loader map: a fully dynamic import(`~/messages/${locale}`) is
// unbundleable by vite (same lesson as packages/results getTemplate).
const dictionaryLoaders: Record<
  string,
  () => Promise<{ default: DeepPartial<RawDictionary> }>
> = {
  ar: () => import('~/messages/ar'),
  da: () => import('~/messages/da'),
  de: () => import('~/messages/de'),
  es: () => import('~/messages/es'),
  fi: () => import('~/messages/fi'),
  fr: () => import('~/messages/fr'),
  hi: () => import('~/messages/hi'),
  id: () => import('~/messages/id'),
  is: () => import('~/messages/is'),
  it: () => import('~/messages/it'),
  ja: () => import('~/messages/ja'),
  no: () => import('~/messages/no'),
  pl: () => import('~/messages/pl'),
  pt: () => import('~/messages/pt'),
  ru: () => import('~/messages/ru'),
  sv: () => import('~/messages/sv'),
  th: () => import('~/messages/th'),
  uk: () => import('~/messages/uk'),
  zh: () => import('~/messages/zh')
};

const enDict = flatten(en);

const fetchDictionary = async (locale: string): Promise<Partial<Dictionary>> =>
  locale === 'en'
    ? {}
    : flatten(
        (await dictionaryLoaders[locale]()).default as RawDictionary
      );

// next-intl-style single-brace interpolation from the kept message bundles:
// 'Over {n} people' + { n: 3000 }. Unknown params stay as-is.
const interpolate = (
  template: string,
  params?: Record<string, unknown>
): string =>
  params
    ? template.replace(/\{(\w+)\}/g, (match, key: string) =>
        params[key] === undefined ? match : String(params[key])
      )
    : template;

export type I18nContextValue = {
  locale: Accessor<string>;
  dir: Accessor<'ltr' | 'rtl'>;
  t: (key: MessageKey, params?: Record<string, unknown>) => string;
};

const I18nContext = createContext<I18nContextValue>();

export function I18nProvider(props: ParentProps) {
  const location = useLocation();
  // The locale is the first path segment when it is a known, non-en locale
  // (en stays unprefixed). Unknown segments are rejected by the [locale]
  // route guard; here they simply fall back to English.
  const locale = createMemo(() => {
    const segment = location.pathname.split('/')[1] ?? '';
    return segment !== 'en' && locales.includes(segment) ? segment : 'en';
  });
  const [dict] = createResource(locale, fetchDictionary);
  const dir = (): 'ltr' | 'rtl' => rtlDetect.getLangDir(locale());

  // Effects don't run during SSR, so this only touches the client document.
  createEffect(() => {
    document.documentElement.lang = locale();
    document.documentElement.dir = dir();
  });

  const t = (key: MessageKey, params?: Record<string, unknown>): string => {
    const local = dict()?.[key];
    const template =
      typeof local === 'string' ? local : (enDict[key] as string);
    return interpolate(template, params);
  };

  return (
    <I18nContext.Provider value={{ locale, dir, t }}>
      {props.children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within <I18nProvider>');
  return ctx;
}
