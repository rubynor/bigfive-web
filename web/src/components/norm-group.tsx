// Reference-group panel under the Big Five bar chart.
//
// Percentiles are only meaningful relative to a norm stratum, so the result
// page states which one was used — and lets the reader re-score the same
// answers against a different one. That is an EVALUATION AID ONLY: the
// override lives in the URL (?sex=&age=) and is passed to getTestResultQuery
// at read time. The stored row is never updated; raw answers[] remain the
// sole persisted truth (CLAUDE.md), and reloading without the params gives
// the taker's own group back.

import { createSignal, Show } from 'solid-js';
import type { ScoreMeta } from '@bigfive-org/score';
import {
  DemographicsFields,
  type AgeChoice,
  type SexChoice
} from '~/components/demographics-fields';
import { Alert, Chip } from '~/components/ui';
import { useI18n } from '~/lib/i18n';

export function NormGroup(props: {
  meta: ScoreMeta;
  overridden: boolean;
  onChange: (sex: SexChoice, age: AgeChoice) => void;
  onReset: () => void;
}) {
  const { t } = useI18n();
  // Landing on a preview link (?sex=&age=) means someone is already looking
  // at a non-default group — open the control so the swap is visible and
  // reversible without hunting for the toggle.
  const [open, setOpen] = createSignal(props.overridden);

  // `meta.demographics` is what actually fed the scoring, so it reflects the
  // override when one is active. An absent field means "no group given" —
  // which is exactly what the 'skip' pill stands for.
  const sex = (): SexChoice => props.meta.demographics.sex ?? 'skip';
  const age = (): AgeChoice => props.meta.demographics.ageBracket ?? 'skip';

  return (
    <div class='mt-4 border-t border-divider pt-4'>
      <div class='flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-sm text-default-500'>
        <span>
          {t('results.normNote', { stratum: props.meta.stratum })}
          {/* Fork parity + fix: the hint belongs to BOTH approximation paths
              — sex unknown (combinedDerived) and age unknown
              (fallbackApplied). Either one means the reference group is not
              the taker's exact stratum. */}
          <Show when={props.meta.combinedDerived || props.meta.fallbackApplied}>
            {' '}
            {t('results.normApproxHint')}
          </Show>
        </span>
        <Show when={props.overridden}>
          <Chip color='warning'>{t('results.normPreviewBadge')}</Chip>
        </Show>
        <button
          type='button'
          aria-expanded={open()}
          class='cursor-pointer rounded-lg px-2 py-0.5 text-sm font-medium text-primary underline underline-offset-4 transition-opacity hover:opacity-80 print:hidden'
          onClick={() => setOpen((v) => !v)}
        >
          {open() ? t('results.normGroupClose') : t('results.normGroupChange')}
        </button>
      </div>

      <Show when={open()}>
        <div class='mt-4 rounded-2xl border border-divider bg-content2/40 p-4 print:hidden'>
          <p class='text-sm text-default-500'>
            {t('results.normGroupExplainer')}
          </p>
          <div class='mt-4'>
            <DemographicsFields
              idPrefix='norm-'
              sex={sex()}
              age={age()}
              onSex={(value) => props.onChange(value, age())}
              onAge={(value) => props.onChange(sex(), value)}
            />
          </div>
          <Show when={props.overridden}>
            <Alert color='warning' class='mt-4'>
              <div class='flex flex-wrap items-center justify-between gap-2'>
                <span>{t('results.normGroupPreviewNote')}</span>
                <button
                  type='button'
                  class='shrink-0 cursor-pointer font-medium underline underline-offset-4'
                  onClick={props.onReset}
                >
                  {t('results.normGroupReset')}
                </button>
              </div>
            </Alert>
          </Show>
        </div>
      </Show>
    </div>
  );
}
