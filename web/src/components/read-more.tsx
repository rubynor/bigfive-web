// Read-more toggle for the long domain description HTML (ported from the
// fork's read-more.tsx). The description is template HTML from
// @bigfive-org/results (our own translation files), so innerHTML is fine.
// With `expanded` (?showExpanded) the button is hidden and the text is always
// shown — used for print/deep links.

import { createSignal, Show } from 'solid-js';
import { useI18n } from '~/lib/i18n';

export function ReadMore(props: { text: string; expanded?: boolean }) {
  const { t } = useI18n();
  const [open, setOpen] = createSignal(props.expanded ?? false);

  return (
    <div>
      <Show when={open()}>
        <div
          class='mt-2 text-default-600 [&_a]:text-primary [&_a]:underline'
          innerHTML={props.text}
        />
      </Show>
      <Show when={!props.expanded}>
        <button
          type='button'
          class='mt-2 cursor-pointer rounded-lg border border-divider px-3 py-1 text-sm text-default-600 transition-colors hover:bg-content2 print:hidden'
          onClick={() => setOpen(!open())}
        >
          {open() ? t('results.readLess') : t('results.readMore')}
        </button>
      </Show>
    </div>
  );
}
