// 16Personalities-style typology on the result page. The route hero renders
// the type string + role/strategy chips (key maps exported below); this
// component renders the five-axis breakdown card. Borderline axes (within ±5
// of the midpoint) are marked as a coin flip, per ARCHITECTURE §4.

import { For, Show } from 'solid-js';
import type {
  RoleKey,
  StrategyKey,
  Typology,
  TypologyAxis
} from '@bigfive-org/typology';
import clsx from 'clsx';
import { Chip } from '~/components/ui';
import { useI18n, type MessageKey } from '~/lib/i18n';

export const ROLE_KEYS: Record<RoleKey, MessageKey> = {
  analyst: 'typology.roles.analyst',
  diplomat: 'typology.roles.diplomat',
  sentinel: 'typology.roles.sentinel',
  explorer: 'typology.roles.explorer'
};

export const STRATEGY_KEYS: Record<StrategyKey, MessageKey> = {
  confidentIndividualism: 'typology.strategies.confidentIndividualism',
  peopleMastery: 'typology.strategies.peopleMastery',
  constantImprovement: 'typology.strategies.constantImprovement',
  socialEngagement: 'typology.strategies.socialEngagement'
};

const AXIS_TITLE_KEYS: Record<TypologyAxis['key'], MessageKey> = {
  EI: 'typology.axes.EI',
  NS: 'typology.axes.NS',
  TF: 'typology.axes.TF',
  JP: 'typology.axes.JP',
  AT: 'typology.axes.AT'
};

// Plain-language names for the two poles of each axis, in low→high (left→
// right on the bar) order.
const AXIS_POLE_KEYS: Record<TypologyAxis['key'], MessageKey> = {
  EI: 'typology.poles.EI',
  NS: 'typology.poles.NS',
  TF: 'typology.poles.TF',
  JP: 'typology.poles.JP',
  AT: 'typology.poles.AT'
};

function AxisBar(props: { axis: TypologyAxis }) {
  const { t } = useI18n();
  const axis = () => props.axis;
  const chosenHigh = () => axis().letter === axis().highLetter;
  return (
    <div class='w-full'>
      <div class='mb-1.5 flex items-center justify-between gap-2'>
        <span class='text-sm'>
          <span class='font-medium'>{t(AXIS_TITLE_KEYS[axis().key])}</span>
          <span class='ml-2 text-xs text-default-400'>
            {t(AXIS_POLE_KEYS[axis().key])}
          </span>
        </span>
        <Show when={axis().borderline}>
          <Chip color='warning'>{t('typology.borderline')}</Chip>
        </Show>
      </div>
      <div class='flex items-center gap-3'>
        <span
          class={clsx(
            'w-6 text-center text-lg font-extrabold transition-colors',
            !chosenHigh() ? 'text-secondary' : 'text-default-300'
          )}
        >
          {axis().lowLetter}
        </span>
        <div class='relative h-2.5 flex-1 rounded-full bg-content3'>
          {/* midpoint tick */}
          <div class='absolute left-1/2 top-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-default-300' />
          <div
            role='img'
            aria-label={t('typology.percentileAria', {
              label: axis().basisLabel,
              percentile: Math.round(axis().basisPercentile)
            })}
            class='absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-content1 bg-secondary shadow'
            style={{ left: `${axis().basisPercentile}%` }}
          />
        </div>
        <span
          class={clsx(
            'w-6 text-center text-lg font-extrabold transition-colors',
            chosenHigh() ? 'text-secondary' : 'text-default-300'
          )}
        >
          {axis().highLetter}
        </span>
        <span class='w-12 text-right text-sm tabular-nums text-default-500'>
          {Math.round(axis().strengthTowardLetter)}%
        </span>
      </div>
    </div>
  );
}

export function TypologyView(props: { typology: Typology }) {
  const { t } = useI18n();

  return (
    <section class='mt-10 rounded-3xl border border-divider bg-content1 p-6 sm:p-10'>
      <h2 class='text-center text-2xl font-bold'>{t('typology.breakdown')}</h2>
      <p class='mx-auto mt-3 max-w-2xl text-center text-sm text-default-500'>
        {t('typology.breakdownIntro')}
      </p>
      <div class='mx-auto mt-8 flex max-w-2xl flex-col gap-7'>
        <For each={props.typology.axes}>
          {(axis) => <AxisBar axis={axis} />}
        </For>
      </div>
    </section>
  );
}
