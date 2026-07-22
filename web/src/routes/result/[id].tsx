// /result/[id] — the scored report page (Phase 4 step 7, fork commit 544030f).
// Data comes from getTestResultQuery (Postgres, with the bigfive-test.com
// og-fallback for unknown ObjectId-shaped ids); scoring is derived at read
// time from the stored raw answers. ?lang= overrides the report-text language
// for shared deep links; ?showExpanded expands the long domain descriptions.

import { Title } from '@solidjs/meta';
import { createAsync, useParams, useSearchParams, A } from '@solidjs/router';
import { createMemo, createSignal, Show } from 'solid-js';
import type { Report } from '@bigfive-org/data';
import { BarChart } from '~/components/charts';
import { CompositesView } from '~/components/composites-view';
import { DomainTabs } from '~/components/domain-tabs';
import { ShareBar } from '~/components/share-bar';
import { TypologyView } from '~/components/typology-view';
import { Alert, Chip } from '~/components/ui';
import { Snippet } from '~/components/ui/snippet';
import { title } from '~/components/primitives';
import { supportEmail } from '~/config/site';
import { getTestResultQuery } from '~/lib/actions';
import { useI18n } from '~/lib/i18n';
import { localePath } from '~/lib/i18n/nav';

// The score pipeline ships domains in N,E,O,A,C; the report presents OCEAN.
const OCEAN_ORDER = ['O', 'C', 'E', 'A', 'N'];

export default function ResultPage() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { t, locale } = useI18n();

  const langParam = () => {
    const lang = searchParams.lang;
    return Array.isArray(lang) ? lang[0] : lang;
  };

  // A B5Error{NotFoundError} means "no such id" (bad link); anything else is
  // a technical failure (DB down, upstream unreachable) and must not be
  // reported as "check that the id is correct". The name check covers both
  // in-process SSR errors and RPC-serialized rejections.
  const isNotFound = (error: unknown) =>
    (error as { name?: unknown } | null)?.name === 'NotFoundError';

  const [loadError, setLoadError] = createSignal<unknown>(null);
  const report = createAsync(async (): Promise<Report | null> => {
    try {
      setLoadError(null);
      return await getTestResultQuery(params.id ?? '', langParam() ?? locale());
    } catch (error) {
      setLoadError(error);
      return null;
    }
  });

  const results = createMemo(() => {
    const r = report();
    if (!r) return [];
    return [...r.results].sort(
      (a, b) => OCEAN_ORDER.indexOf(a.domain) - OCEAN_ORDER.indexOf(b.domain)
    );
  });

  const showExpanded = () => Boolean(searchParams.showExpanded);

  return (
    <main class='mx-auto w-full max-w-4xl px-4 py-6'>
      <Title>{t('results.seo.title')}</Title>
      <Show when={report() === null && isNotFound(loadError())}>
        <Alert color='danger' title={t('results.notFoundTitle')}>
          <p class='font-mono'>{t('results.notFoundId', { id: params.id })}</p>
          <p class='mt-1'>
            {t('results.notFoundContact', { email: supportEmail })}
          </p>
        </Alert>
      </Show>
      <Show when={report() === null && loadError() && !isNotFound(loadError())}>
        <Alert color='danger' title={t('results.loadErrorTitle')}>
          <p>{t('results.loadErrorBody', { email: supportEmail })}</p>
        </Alert>
      </Show>
      <Show when={report()}>
        {(r) => (
          <>
            <div class='flex justify-end'>
              <Chip>
                {/* Pin UTC: toLocaleDateString otherwise renders the server's
                    TZ during SSR and the browser's on hydration — a mismatch
                    near midnight. */}
                {new Date(r().timestamp).toLocaleDateString(locale(), {
                  timeZone: 'UTC'
                })}
              </Chip>
            </div>
            <p class='mt-4 text-center'>
              <strong>{t('results.important')}</strong>{' '}
              {t('results.saveResults')}
              <A
                class='text-primary underline'
                href={localePath(locale(), `/compare?id=${r().id}`)}
              >
                {t('results.compare')}
              </A>{' '}
              {t('results.toOthers')}
            </p>
            <div class='mt-2 flex justify-center'>
              <Snippet text={r().id} class='w-full justify-center text-base' />
            </div>
            <div class='mt-4'>
              <ShareBar />
            </div>
            <h1 class={title({ class: 'mt-6 text-center', fullWidth: true })}>
              {t('results.theBigFive')}
            </h1>
            <BarChart max={120} results={results()} />
            <p class='mt-2 text-center text-sm text-default-500'>
              {t('results.normNote', { stratum: r().assessment.meta.stratum })}
              {/* Fork parity + fix: the hint belongs to BOTH approximation
                  paths — sex unknown (combinedDerived) and age unknown
                  (fallbackApplied). Either one means the reference group is
                  not the taker's exact stratum. */}
              <Show
                when={
                  r().assessment.meta.combinedDerived ||
                  r().assessment.meta.fallbackApplied
                }
              >
                {' '}
                {t('results.normApproxHint')}
              </Show>
            </p>
            <TypologyView typology={r().typology} />
            <CompositesView composites={r().composites} />
            <DomainTabs
              domains={results()}
              assessment={r().assessment}
              showExpanded={showExpanded()}
            />
          </>
        )}
      </Show>
    </main>
  );
}
