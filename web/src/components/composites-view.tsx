// Derived-traits section for the result page: the composite scores computed by
// @bigfive-org/typology — empirically anchored projections (Smith 2019 /
// Tangney / Steel weights) plus the Phase 2 editorial heuristics. Honesty
// first: a section-level disclaimer states these are linear blends of Big Five
// percentiles, not administered scales, and each card discloses its exact
// formula + provenance behind a details toggle.

import { For } from 'solid-js';
import type { Band } from '@bigfive-org/score';
import type { CompositeKey, CompositeTrait } from '@bigfive-org/typology';
import { useI18n, type MessageKey } from '~/lib/i18n';

const NAME_KEYS: Record<CompositeKey, MessageKey> = {
  perfectionisticStrivings: 'composites.names.perfectionisticStrivings',
  perfectionisticConcerns: 'composites.names.perfectionisticConcerns',
  selfControl: 'composites.names.selfControl',
  procrastination: 'composites.names.procrastination',
  ambition: 'composites.names.ambition',
  motivation: 'composites.names.motivation',
  desireToLead: 'composites.names.desireToLead'
};

const BAND_KEYS: Record<Band, MessageKey> = {
  'very low': 'composites.bands.veryLow',
  low: 'composites.bands.low',
  average: 'composites.bands.average',
  high: 'composites.bands.high',
  'very high': 'composites.bands.veryHigh'
};

export function CompositesView(props: { composites: CompositeTrait[] }) {
  const { t } = useI18n();
  return (
    <section class='mt-12'>
      <h2 class='text-center text-3xl font-bold'>{t('composites.title')}</h2>
      <p class='mx-auto mt-2 max-w-2xl text-center text-sm text-default-500'>
        {t('composites.disclaimer')}
      </p>
      <div class='mt-6 grid gap-4 md:grid-cols-2'>
        <For each={props.composites}>
          {(trait) => (
            <div class='rounded-xl border border-divider bg-content1 p-4'>
              <div class='flex items-baseline justify-between gap-2'>
                <h3 class='font-semibold'>{t(NAME_KEYS[trait.key])}</h3>
                <span class='shrink-0 text-sm text-default-500'>
                  {Math.round(trait.score)} · {t(BAND_KEYS[trait.band])}
                </span>
              </div>
              <div
                role='img'
                aria-label={t('typology.percentileAria', {
                  label: t(NAME_KEYS[trait.key]),
                  percentile: Math.round(trait.score)
                })}
                class='mt-2 h-2 rounded-full bg-default-200 dark:bg-default-100'
              >
                <div
                  class='h-2 rounded-full bg-primary'
                  style={{ width: `${trait.score}%` }}
                />
              </div>
              <details class='mt-2 text-xs text-default-500'>
                <summary class='cursor-pointer select-none'>
                  {t('composites.details')}
                </summary>
                <p class='mt-1 font-mono'>
                  {t('composites.formulaLabel')}: {trait.formula}
                </p>
                <p class='mt-1'>
                  {t('composites.provenanceLabel')}: {trait.provenance}
                </p>
              </details>
            </div>
          )}
        </For>
      </div>
    </section>
  );
}
