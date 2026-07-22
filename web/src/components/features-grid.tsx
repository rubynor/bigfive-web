// Home page features grid (Phase 4 step 7), ported from the fork's
// features-grid.tsx: four blurred cards. The translated card text contains an
// <a> tag by design (our own message bundle), rendered via innerHTML.

import type { JSX } from 'solid-js';
import {
  ExperimentIcon,
  LanguageIcon,
  LogosOpensource,
  MoneyIcon
} from '~/components/icons';
import { useI18n, type MessageKey } from '~/lib/i18n';

type Feature = {
  titleKey: MessageKey;
  textKey: MessageKey;
  icon: JSX.Element;
  html?: boolean;
};

export function FeaturesGrid() {
  const { t } = useI18n();

  const features = (): Feature[] => [
    {
      titleKey: 'frontpage.cards.open.title',
      textKey: 'frontpage.cards.open.text',
      icon: <LogosOpensource size={38} />
    },
    {
      titleKey: 'frontpage.cards.free.title',
      textKey: 'frontpage.cards.free.text',
      icon: <MoneyIcon size={38} class='text-default-600' />
    },
    {
      titleKey: 'frontpage.cards.scientific.title',
      textKey: 'frontpage.cards.scientific.text',
      icon: <ExperimentIcon size={38} class='text-default-600' />
    },
    {
      titleKey: 'frontpage.cards.translated.title',
      textKey: 'frontpage.cards.translated.text',
      icon: <LanguageIcon size={38} class='text-default-600' />,
      html: true
    }
  ];

  return (
    <div class='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {features().map((feature) => (
        <div class='flex flex-col gap-2 rounded-xl border border-divider bg-content1/60 p-4 backdrop-blur-md'>
          <div>{feature.icon}</div>
          <h3 class='text-lg font-semibold'>{t(feature.titleKey)}</h3>
          {feature.html ? (
            <p
              class='text-sm text-default-500 [&_a]:text-primary [&_a]:underline'
              innerHTML={t(feature.textKey)}
            />
          ) : (
            <p class='text-sm text-default-500'>{t(feature.textKey)}</p>
          )}
        </div>
      ))}
    </div>
  );
}
