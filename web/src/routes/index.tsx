// Home page (Phase 4 step 7), ported from the fork's [locale]/page.tsx:
// hero with CTA, features grid, tests-taken band, compare section and the
// SonarPulse block. Articles/blog and the view counter are deferred
// (ARCHITECTURE §7), so the fork's latest-posts section and the article
// circle links are omitted; the compare demo link (legacy base64 encoding,
// which our decoder still accepts) resolves upstream ids via the og-fallback.

import { Title } from '@solidjs/meta';
import { A } from '@solidjs/router';
import { ArrowRightIcon, GithubIcon, PlusLinearIcon } from '~/components/icons';
import { FeaturesGrid } from '~/components/features-grid';
import { SonarPulse } from '~/components/sonar-pulse';
import { subtitle, title } from '~/components/primitives';
import { button } from '~/components/ui';
import { siteConfig } from '~/config/site';
import { useI18n } from '~/lib/i18n';
import { localePath } from '~/lib/i18n/nav';
import { RichText } from '~/lib/i18n/rich';

// The fork's demo comparison (Marvin / Arthur Dent / Ford Perfect /
// Slartibartfast) in the legacy base64url(JSON) encoding.
const DEMO_COMPARE =
  '/compare/W3sibmFtZSI6Ik1hcnZpbiIsImlkIjoiNThhNzA2MDZhODM1YzQwMGM4YjM4ZTg0In0seyJuYW1lIjoiQXJ0aHVyIERlbnQiLCJpZCI6IjVlNTZiYTdhYjA5NjEzMDAwN2Q1ZDZkOCJ9LHsibmFtZSI6IkZvcmQgUGVyZmVjdCIsImlkIjoiNWRlYTllODhlMTA4Y2IwMDYyMTgzYWYzIn0seyJuYW1lIjoiU2xhcnRpYmFydGZhc3QiLCJpZCI6IjVlNTZiNjUwYjA5NjEzMDAwN2Q1ZDZkMCJ9XQ';

export default function Home() {
  const { t, locale } = useI18n();

  return (
    <main class='mx-auto w-full max-w-5xl px-4'>
      <Title>{t('frontpage.seo.title')}</Title>

      {/* Hero */}
      <section class='flex flex-col items-center gap-4 py-8 text-center md:py-10'>
        <h1 class={title({ size: 'lg', fullWidth: true })}>
          <RichText
            text={t('frontpage.description.top')}
            tags={{
              violet: (children) => (
                <span class={title({ color: 'violet', size: 'lg' })}>
                  {children}
                </span>
              )
            }}
          />
        </h1>
        <h2 class={subtitle({ class: 'text-center' })}>
          {t('frontpage.description.info')}
        </h2>
        <div class='mt-4 flex gap-3'>
          <A
            href={localePath(locale(), '/test')}
            class={button({
              color: 'primary',
              size: 'lg',
              class: 'rounded-full shadow-lg'
            })}
          >
            {t('frontpage.call_to_action')}
            <ArrowRightIcon size={20} />
          </A>
          <a
            href={siteConfig.links.github}
            target='_blank'
            rel='noopener noreferrer'
            class={button({
              variant: 'bordered',
              size: 'lg',
              class: 'rounded-full'
            })}
          >
            <GithubIcon size={20} />
            GitHub
          </a>
        </div>
        <span class='mt-1 text-sm text-default-400 underline'>
          {t('frontpage.no_registration')}
        </span>
      </section>

      <FeaturesGrid />

      {/* Tests-taken band */}
      <section class='mt-12 border-y border-divider py-6 text-center'>
        <p class='text-lg'>
          <RichText
            text={t('frontpage.tests_taken', { n: '4.000.000' })}
            tags={{
              green: (children) => (
                <span class={title({ color: 'green' })}>{children}</span>
              )
            }}
          />
        </p>
      </section>

      {/* Compare section */}
      <section class='mt-12 text-center'>
        <h2 class={title({ fullWidth: true })}>
          {t('frontpage.compare.title')}
        </h2>
        <p class={subtitle({ class: 'mx-auto text-center' })}>
          {t('frontpage.compare.text1')} {t('frontpage.compare.text2')}
        </p>
        <A
          href={localePath(locale(), DEMO_COMPARE)}
          class='mt-2 inline-block text-primary underline underline-offset-4 hover:opacity-80'
        >
          {t('frontpage.compare.action')}
        </A>
      </section>

      {/* SonarPulse */}
      <section class='mt-24 flex h-64 items-center justify-center md:h-80'>
        <SonarPulse
          color='#7928CA'
          icon={
            <A
              href={localePath(locale(), '/test')}
              title={t('frontpage.call_to_action')}
              aria-label={t('frontpage.call_to_action')}
              class='flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#FF1CF7] to-[#7928CA] text-white shadow-lg transition-transform hover:scale-105'
            >
              <PlusLinearIcon size={54} />
            </A>
          }
        />
      </section>
    </main>
  );
}
