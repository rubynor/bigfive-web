// Result page share bar (Phase 4 step 7), ported from the fork's
// share-bar.tsx. Privacy rule (ARCHITECTURE §5): no FB/X share buttons —
// GitHub source link, print/PDF and copy-link only. The copy URL is built at
// click time so SSR never touches window.

import { createSignal, Show } from 'solid-js';
import { CopyIcon, GithubIcon, PDFIcon } from '~/components/icons';
import { siteConfig } from '~/config/site';
import { useI18n } from '~/lib/i18n';

const iconButtonClass =
  'cursor-pointer rounded-full p-1.5 text-default-500 transition-colors hover:bg-content2 hover:text-foreground';

export function ShareBar() {
  const { t } = useI18n();
  const [copied, setCopied] = createSignal(false);

  const copyLink = async () => {
    try {
      // Copy the current URL verbatim (like CompareShareBar) so the locale
      // prefix and any ?lang= override survive — a link copied from
      // /de/result/x must not silently become the English page.
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable (insecure context) — leave uncopied
    }
  };

  return (
    <div class='flex justify-end gap-x-1 print:hidden'>
      <a
        href={siteConfig.links.github}
        target='_blank'
        rel='noopener noreferrer'
        title={t('share.viewSource')}
        aria-label={t('share.viewSource')}
        class={iconButtonClass}
      >
        <GithubIcon size={28} />
      </a>
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
  );
}
