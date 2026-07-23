// Derived-traits section for the result page: the composite scores computed by
// @bigfive-org/typology — empirically anchored projections (Smith 2019 /
// Tangney / Steel weights) plus the Phase 2 editorial heuristics. Honesty
// first: a section-level disclaimer states these are linear blends of Big Five
// percentiles, not administered scales, and each card discloses its exact
// formula + provenance behind a details toggle.

import { For } from 'solid-js';
import type { CompositeKey, CompositeTrait } from '@bigfive-org/typology';
import { Chip, Meter } from '~/components/ui';
import { BAND_KEYS } from '~/lib/bands';
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

export function CompositesView(props: { composites: CompositeTrait[] }) {
  const { t } = useI18n();
  return (
    <section class='mt-10'>
      <h2 class='text-center text-2xl font-bold'>{t('composites.title')}</h2>
      <p class='mx-auto mt-2 max-w-2xl text-center text-sm text-default-500'>
        {t('composites.disclaimer')}
      </p>
      <div class='mt-6 grid gap-4 md:grid-cols-2'>
        <For each={props.composites}>
          {(trait) => (
            <div class='rounded-2xl border border-divider bg-content1 p-5 transition-shadow hover:shadow-md'>
              <div class='flex items-center justify-between gap-2'>
                <h3 class='font-semibold'>{t(NAME_KEYS[trait.key])}</h3>
                <Chip>{t(BAND_KEYS[trait.band])}</Chip>
              </div>
              <div class='mt-3 flex items-center gap-3'>
                <Meter
                  class='flex-1'
                  value={trait.score}
                  label={t('typology.percentileAria', {
                    label: t(NAME_KEYS[trait.key]),
                    percentile: Math.round(trait.score)
                  })}
                />
                <span class='w-10 text-right text-lg font-bold tabular-nums'>
                  {Math.round(trait.score)}
                </span>
              </div>
              <details class='mt-3 text-xs text-default-500'>
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
