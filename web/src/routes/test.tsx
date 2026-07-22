import { createAsync, useSearchParams } from '@solidjs/router';
import { createMemo, For, Show } from 'solid-js';
import { getInfo } from '@bigfive-org/questions';
import { Survey } from '~/components/survey';
import {
  defaultInventoryLanguage,
  getItemsQuery,
  inventoryLanguage
} from '~/lib/items';
import { useI18n } from '~/lib/i18n';

const inventories = getInfo().languages;
const availableInventories = inventories.map((l) => l.code);

/**
 * /test — the 120-item survey. The inventory language follows the UI locale
 * (pt→pt-br, zh→zh-cn) and can be overridden with ?lang=<code> via the
 * switcher; answers restore across a language switch because item ids are
 * pinned across inventories.
 */
export default function Test() {
  const { t, locale } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();

  const language = createMemo(() => {
    const param = Array.isArray(searchParams.lang)
      ? searchParams.lang[0]
      : searchParams.lang;
    if (param) return inventoryLanguage(param, availableInventories);
    return defaultInventoryLanguage(locale(), availableInventories);
  });

  const items = createAsync(() => getItemsQuery(language()));

  return (
    <main class='mx-auto w-full max-w-3xl px-4 py-6'>
      <div class='flex justify-end'>
        <label class='flex items-center gap-2 text-sm text-default-500'>
          {t('test.language')}
          <select
            class='cursor-pointer rounded-lg border border-divider bg-content1 px-2 py-1 text-sm text-foreground'
            value={language()}
            onChange={(e) => setSearchParams({ lang: e.currentTarget.value })}
          >
            <For each={inventories}>
              {(inventory) => (
                <option value={inventory.code}>{inventory.name}</option>
              )}
            </For>
          </select>
        </label>
      </div>
      <Show
        when={items()}
        fallback={<p class='mt-8 text-center text-default-500'>…</p>}
      >
        {(questions) => <Survey questions={questions()} language={language()} />}
      </Show>
    </main>
  );
}
