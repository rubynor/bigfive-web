import { title, subtitle } from '~/components/primitives';
import { toggleTheme } from '~/lib/theme';
import { useI18n } from '~/lib/i18n';

/**
 * Placeholder home route proving the Phase 4 foundation (Tailwind tokens,
 * tailwind-variants, fonts, theme toggle) + step 3 i18n. Replaced by the real
 * home page (SonarPulse etc.) in step 7.
 */
export default function Home() {
  const { t } = useI18n();
  return (
    <main class='flex min-h-screen flex-col items-center justify-center gap-4 p-8'>
      <h1>
        <span class={title()}>{t('frontpage.title')}&nbsp;</span>
      </h1>
      <p class={subtitle({ class: 'text-center md:w-full' })}>
        SolidStart rebuild in progress — Phase 4 foundation.
      </p>
      <button
        type='button'
        class='rounded-lg border border-divider bg-content2 px-4 py-2 text-sm hover:bg-content3'
        onClick={toggleTheme}
      >
        Toggle theme
      </button>
    </main>
  );
}
