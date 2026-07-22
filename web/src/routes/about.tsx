// /about (Phase 4 step 7), ported from the fork's about page. Prose is
// English-only here, matching upstream/fork; contact address uses the
// deployment's supportEmail, not the hardcoded upstream one.

import { Title } from '@solidjs/meta';
import { A } from '@solidjs/router';
import { FeedbackForm } from '~/components/feedback-form';
import { HeartBoldIcon } from '~/components/icons';
import { title } from '~/components/primitives';
import { supportEmail } from '~/config/site';
import { useI18n } from '~/lib/i18n';
import { localePath } from '~/lib/i18n/nav';

export default function AboutPage() {
  const { t, locale } = useI18n();
  return (
    <main class='mx-auto w-full max-w-3xl px-4 py-10'>
      <Title>{t('about.seo.title')}</Title>
      <div class='mt-2 text-center'>
        <h1 class={title()}>About</h1>
      </div>
      <div class='mt-2 space-y-4 text-base lg:text-lg'>
        <p>
          Welcome, your premier destination for exploring personality traits
          using the scientifically acclaimed Big Five model. Our free,
          open-source test offers detailed insights into the five key
          dimensions of personality: Openness, Conscientiousness, Extraversion,
          Agreeableness, and Neuroticism.
        </p>
        <p>
          Each dimension is carefully analyzed to provide a comprehensive view
          of your traits and how they influence your behavior and interactions.
          Developed with precision and accessibility in mind, our test helps you
          understand yourself better and foster personal growth.
        </p>
        <p>
          If you have questions please read through the{' '}
          <A href={localePath(locale(), '/faq')} class='underline'>
            FAQ
          </A>{' '}
          first. If you can't find an answer there, feel free to contact us at{' '}
          {supportEmail}.
        </p>
      </div>
      <section class='mt-20 text-center'>
        <h2 class={title()}>{t('feedback.title')}</h2>
        <div class='mt-2 flex justify-center'>
          <HeartBoldIcon class='animate-pulse text-pink-500' size={50} />
        </div>
        <p class='mt-2 text-base lg:text-lg'>{t('feedback.intro')}</p>
        <FeedbackForm />
      </section>
    </main>
  );
}
