// Locale-aware URL helper: builds the href for the same page in another
// locale (as-needed prefix — en unprefixed). Query string and hash are
// preserved (fork lesson: language switches must never drop ?people= etc.).

import { useLocation } from '@solidjs/router';
import { locales } from '~/config/site';

export function useLocaleHref() {
  const location = useLocation();
  return (targetLocale: string): string => {
    const segments = location.pathname.split('/');
    if (locales.includes(segments[1] ?? '')) segments.splice(1, 1);
    const base = segments.join('/') || '/';
    const path =
      targetLocale === 'en'
        ? base
        : `/${targetLocale}${base === '/' ? '' : base}`;
    return path + location.search + location.hash;
  };
}

// Prefix a path with the current locale (for links inside the app).
export function localePath(locale: string, path: string): string {
  return locale === 'en' ? path : `/${locale}${path}`;
}
