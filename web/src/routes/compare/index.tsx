// /compare — the comparison builder. ?people= re-seeds the list (og
// Name-id_Name-id links and legacy base64 both decode), ?id= pre-fills the ID
// input (entry point from the result page's "compare" link).

import { Title } from '@solidjs/meta';
import { useSearchParams } from '@solidjs/router';
import { createMemo } from 'solid-js';
import { decodeComparePeople } from '@bigfive-org/data/compare-people';
import { ComparePeople } from '~/components/compare-people';
import { subtitle, title } from '~/components/primitives';
import { useI18n } from '~/lib/i18n';

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default function ComparePage() {
  const { t } = useI18n();
  const [searchParams] = useSearchParams();

  const initialRows = createMemo(() => {
    const people = first(searchParams.people);
    return people ? (decodeComparePeople(people) ?? []) : [];
  });
  const initialId = () => first(searchParams.id) ?? '';

  return (
    <main class='mx-auto w-full max-w-3xl px-4 py-10'>
      <Title>{t('getCompare.title')}</Title>
      <h1 class={title()}>{t('getCompare.title')}</h1>
      <p class={subtitle()}>{t('getCompare.description1')}</p>
      {/* Seeding happens on mount: the builder mirrors its own state with
          history.replaceState (no router navigation), so any reactive change
          to ?people= means an external navigation that remounts this route. */}
      <ComparePeople
        initialRows={initialRows()}
        initialId={initialId()}
      />
    </main>
  );
}
