// 16Personalities-style typology block for the result page (Phase 4 step 7,
// fork commit 544030f): centered type string, borderline honesty note, and
// five axis bars behind a collapsed-by-default "Breakdown" toggle.

import { createSignal, For, Show } from 'solid-js';
import type {
  RoleKey,
  StrategyKey,
  Typology,
  TypologyAxis
} from '@bigfive-org/typology';
import { ChevronRightLinearIcon } from '~/components/icons';
import { Chip } from '~/components/ui';
import { useI18n, type MessageKey } from '~/lib/i18n';
import clsx from 'clsx';

const ROLE_KEYS: Record<RoleKey, MessageKey> = {
  analyst: 'typology.roles.analyst',
  diplomat: 'typology.roles.diplomat',
  sentinel: 'typology.roles.sentinel',
  explorer: 'typology.roles.explorer'
};

const STRATEGY_KEYS: Record<StrategyKey, MessageKey> = {
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

function AxisBar(props: { axis: TypologyAxis }) {
  const { t } = useI18n();
  const axis = () => props.axis;
  const chosenHigh = () => axis().letter === axis().highLetter;
  return (
    <div class='w-full'>
      <div class='mb-1 flex items-center justify-between'>
        <span class='text-sm font-medium'>{t(AXIS_TITLE_KEYS[axis().key])}</span>
        <Show when={axis().borderline}>
          <Chip color='warning'>{t('typology.borderline')}</Chip>
        </Show>
      </div>
      <div class='flex items-center gap-2'>
        <span
          class={clsx(
            'w-6 text-lg font-bold',
            !chosenHigh() ? 'text-secondary' : 'text-default-300'
          )}
        >
          {axis().lowLetter}
        </span>
        <div class='relative h-3 flex-1 rounded-full bg-default-200 dark:bg-default-100'>
          <div
            role='img'
            aria-label={t('typology.percentileAria', {
              label: axis().basisLabel,
              percentile: Math.round(axis().basisPercentile)
            })}
            class='absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-secondary dark:border-black'
            style={{ left: `${axis().basisPercentile}%` }}
          />
        </div>
        <span
          class={clsx(
            'w-6 text-lg font-bold',
            chosenHigh() ? 'text-secondary' : 'text-default-300'
          )}
        >
          {axis().highLetter}
        </span>
        <span class='w-12 text-right text-sm text-default-500'>
          {Math.round(axis().strengthTowardLetter)}%
        </span>
      </div>
    </div>
  );
}

export function TypologyView(props: { typology: Typology }) {
  const { t } = useI18n();
  const [open, setOpen] = createSignal(false);

  return (
    <section class='mt-12 flex flex-col items-center text-center'>
      <h2 class='text-3xl font-bold'>{t('typology.yourType')}</h2>
      <p class='mt-2 text-4xl font-extrabold tracking-wide text-secondary'>
        {props.typology.type}
      </p>
      <div class='mt-3 flex flex-wrap justify-center gap-2'>
        <Chip color='secondary'>
          {t('typology.roleLabel')}: {t(ROLE_KEYS[props.typology.role])}
        </Chip>
        <Chip>
          {t('typology.strategyLabel')}:{' '}
          {t(STRATEGY_KEYS[props.typology.strategy])}
        </Chip>
      </div>
      <Show when={props.typology.borderline}>
        <p class='mt-2 max-w-xl text-sm text-warning-600 dark:text-warning'>
          {t('typology.borderlineNote', {
            radius: props.typology.meta.borderlineRadius
          })}
        </p>
      </Show>
      <button
        type='button'
        aria-expanded={open()}
        class='mt-4 inline-flex cursor-pointer items-center gap-1 rounded-lg border border-divider px-3 py-1.5 text-sm text-default-600 transition-colors hover:bg-content2'
        onClick={() => setOpen(!open())}
      >
        {t('typology.breakdown')}
        <ChevronRightLinearIcon
          size={14}
          class={clsx('transition-transform', open() && 'rotate-90')}
        />
      </button>
      <Show when={open()}>
        <div class='mt-5 flex w-full max-w-xl flex-col gap-5 text-left'>
          <For each={props.typology.axes}>
            {(axis) => <AxisBar axis={axis} />}
          </For>
        </div>
      </Show>
    </section>
  );
}
