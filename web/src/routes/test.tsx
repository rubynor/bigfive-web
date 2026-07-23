import { createAsync } from '@solidjs/router';
import { createMemo, Show } from 'solid-js';
import { getInfo } from '@bigfive-org/questions';
import { Survey } from '~/components/survey';
import { defaultInventoryLanguage, getItemsQuery } from '~/lib/items';
import { useI18n } from '~/lib/i18n';

const availableInventories = getInfo().languages.map((l) => l.code);

/**
 * /test — the 120-item survey. The inventory language follows the UI locale
 * (pt→pt-br, zh→zh-cn); answers restore across a language switch because
 * item ids are pinned across inventories.
 */
export default function Test() {
  const { locale } = useI18n();

  const language = createMemo(() =>
    defaultInventoryLanguage(locale(), availableInventories)
  );

  const items = createAsync(() => getItemsQuery(language()));

  return (
    <main class='mx-auto w-full max-w-3xl px-4 py-6'>
      <Show
        when={items()}
        fallback={<p class='mt-8 text-center text-default-500'>…</p>}
      >
        {(questions) => (
          <Survey questions={questions()} language={language()} />
        )}
      </Show>
    </main>
  );
}
