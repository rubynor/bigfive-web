// /compare/[id] — the comparison report (fork commits e1c2ea6 + 4a0e042).
// [id] is the encoded people list (og Name-id_Name-id, legacy base64url JSON
// also accepted). Every report resolves through getTestResultQuery, so
// upstream bigfive-test.com ids load via the og-fallback. Charts use the raw
// template domain order (no OCEAN sort — matches the og compare page).

import { Title } from '@solidjs/meta';
import { createAsync, useParams, A } from '@solidjs/router';
import { createMemo, For, Show } from 'solid-js';
import {
  decodeComparePeople,
  type ComparePerson
} from '@bigfive-org/data/compare-people';
import type { Report } from '@bigfive-org/data';
import { BarChartCompare, type CompareSeries } from '~/components/charts';
import { CompareShareBar } from '~/components/compare-share-bar';
import { heading, title } from '~/components/primitives';
import { Alert } from '~/components/ui';
import { supportEmail } from '~/config/site';
import { getTestResultQuery } from '~/lib/actions';
import { useI18n } from '~/lib/i18n';
import { localePath } from '~/lib/i18n/nav';

type Loaded = { person: ComparePerson; report: Report };

export default function CompareResultPage() {
  const params = useParams();
  const { t, locale } = useI18n();

  // null → invalid link; [] → valid but every fetch failed (rendered below).
  const people = createMemo(() => decodeComparePeople(params.id ?? ''));

  const loaded = createAsync(async (): Promise<Loaded[] | null> => {
    const list = people();
    if (!list) return null;
    try {
      return await Promise.all(
        list.map(async (person) => ({
          person,
          // Viewer locale, not each result's taken-language — otherwise the
          // chart categories (taken from the first report) label every
          // person's series in someone else's language.
          report: await getTestResultQuery(person.id, locale())
        }))
      );
    } catch {
      return null;
    }
  });

  const domainSeries = createMemo((): CompareSeries[] =>
    (loaded() ?? []).map(({ person, report }) => ({
      name: person.name,
      data: report.results.map((d) => d.score)
    }))
  );

  return (
    <main class='mx-auto w-full max-w-4xl px-4 py-6'>
      <Title>{t('getCompare.title')}</Title>
      <Show when={people() === null || loaded() === null}>
        <Alert
          color='danger'
          title={
            people() === null
              ? t('compare.invalidLinkTitle')
              : t('compare.loadErrorTitle')
          }
        >
          <p>
            {people() === null
              ? t('compare.invalidLinkBody', { email: supportEmail })
              : t('compare.loadErrorBody', { email: supportEmail })}
          </p>
          <A
            class='mt-2 inline-block text-primary underline'
            href={localePath(locale(), '/compare')}
          >
            {t('compare.buildNew')}
          </A>
        </Alert>
      </Show>
      <Show when={loaded() && loaded()!.length > 0 && loaded()}>
        {(items) => (
          <>
            <CompareShareBar editId={params.id ?? ''} />
            <h1 class={title({ class: 'mt-6 text-center', fullWidth: true })}>
              {t('compare.overview')}
            </h1>
            <BarChartCompare
              max={120}
              categories={items()[0].report.results.map((d) => d.title)}
              series={domainSeries()}
            />
            <For each={items()[0].report.results}>
              {(domain, domainIndex) => (
                <section id={domain.domain} class='mt-10'>
                  <h2 class={heading()}>{domain.title}</h2>
                  <p class='text-default-500'>{domain.shortDescription}</p>
                  <div class='mt-4'>
                    <BarChartCompare
                      max={20}
                      categories={domain.facets.map((f) => f.title)}
                      series={items().map(({ person, report }) => ({
                        name: person.name,
                        data: report.results[domainIndex()].facets.map(
                          (f) => f.score
                        )
                      }))}
                    />
                  </div>
                </section>
              )}
            </For>
          </>
        )}
      </Show>
    </main>
  );
}
