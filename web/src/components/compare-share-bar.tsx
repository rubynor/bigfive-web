// Compare result page share bar (fork commits e1c2ea6 + 4a0e042): a solid
// "Edit Comparison" button on the left (re-seeds the builder via ?people=,
// round-tripping whichever encoding the route param carries) and print/PDF +
// copy-link on the right. Privacy rule (ARCHITECTURE §5): no FB/X buttons.

import { createSignal, Show } from 'solid-js';
import { A } from '@solidjs/router';
import { CopyIcon, EditIcon, PDFIcon } from '~/components/icons';
import { button } from '~/components/ui';
import { useI18n } from '~/lib/i18n';
import { localePath } from '~/lib/i18n/nav';

const iconButtonClass =
  'cursor-pointer rounded-full p-1.5 text-default-500 transition-colors hover:bg-content2 hover:text-foreground';

export function CompareShareBar(props: { editId: string }) {
  const { t, locale } = useI18n();
  const [copied, setCopied] = createSignal(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable (insecure context) — leave uncopied
    }
  };

  return (
    <div class='flex items-center justify-between print:hidden'>
      <A
        href={`${localePath(locale(), '/compare')}?people=${encodeURIComponent(props.editId)}`}
        class={button({ color: 'primary' })}
      >
        <EditIcon size={18} />
        {t('compare.editComparison')}
      </A>
      <div class='flex gap-x-1'>
        <button
          type='button'
          onClick={() => window.print()}
          title={t('share.downloadPdf')}
          aria-label={t('share.downloadPdf')}
          class={iconButtonClass}
        >
          <PDFIcon size={28} />
        </button>
        <button
          type='button'
          onClick={copyLink}
          title={copied() ? t('share.copiedLink') : t('share.copyLink')}
          aria-label={t('share.copyLink')}
          class={iconButtonClass}
        >
          <Show when={copied()} fallback={<CopyIcon size={28} />}>
            <CopyIcon size={28} class='text-success' />
          </Show>
        </button>
      </div>
    </div>
  );
}
