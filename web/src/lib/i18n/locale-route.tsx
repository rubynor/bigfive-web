// Wraps a root-level page component so it also answers under /[locale]/...
// (as-needed prefix routing, og-compatible):
//   /en/... → redirect to the canonical unprefixed URL
//   /xx/... → unknown locale → 404
//   /de/... → render; the I18nProvider picks the locale up from the URL
//
// Redirects preserve the query string (fork lesson: locale navigation must
// never drop ?people= and friends).

import { Navigate, useLocation, useParams } from '@solidjs/router';
import { Show, type Component } from 'solid-js';
import { locales } from '~/config/site';

export function localeRoute(Page: Component): Component {
  return function LocaleRoute() {
    const params = useParams();
    const location = useLocation();
    const unprefixed = () => {
      const path = location.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
      return path + location.search;
    };
    return (
      <Show
        when={params.locale !== 'en'}
        fallback={<Navigate href={unprefixed()} />}
      >
        <Show
          when={locales.includes(params.locale ?? '')}
          fallback={<Navigate href='/404' />}
        >
          <Page />
        </Show>
      </Show>
    );
  };
}
