// Reference-group panel under the Big Five bar chart.
//
// Percentiles are only meaningful relative to a norm stratum, so the result
// page states which one was used — and lets the reader score the same answers
// against a different one. That is an EVALUATION AID ONLY: the selection
// lives in the URL (?sex=&age=) and is passed to getTestResultQuery at read
// time. The stored row is never updated; raw answers[] remain the sole
// persisted truth (CLAUDE.md), and dropping the params restores the report as
// stored.
//
// Two framings, because the honest wording differs:
//   provided  — the row carries the taker's own group. The control CHANGES it,
//               and the swap is a labelled preview you can return from.
//   !provided — nothing was recorded (a result pulled from upstream, or a
//               taker who skipped the demographics card). There is nothing to
//               change or return to: the control PICKS a group, and the panel
//               opens on its own so the combined-average scoring visible above
//               it is not mistaken for a personal match.

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
  provided: boolean;
  overridden: boolean;
  onChange: (sex: SexChoice, age: AgeChoice) => void;
  onReset: () => void;
}) {
  const { t } = useI18n();
  // Open when there is something to act on: a group still to be picked, or a
  // selection already in the URL that should be visible and reversible
  // without hunting for the toggle.
  const [open, setOpen] = createSignal(props.overridden || !props.provided);

  // A change to a stored group is a preview of someone else's yardstick. With
  // nothing stored there is no baseline to deviate from, so no preview badge.
  const previewing = () => props.overridden && props.provided;

  // `meta.demographics` is what actually fed the scoring, so it reflects the
  // selection when one is active. An absent field means "no group given" —
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
              the taker's exact stratum. With nothing stored it is dropped:
              it repeats the explainer below, and its advice ("give sex & age
              when taking the test") is no use to someone reading a result
              they did not take. */}
          <Show
            when={
              props.provided &&
              (props.meta.combinedDerived || props.meta.fallbackApplied)
            }
          >
            {' '}
            {t('results.normApproxHint')}
          </Show>
        </span>
        <Show when={previewing()}>
          <Chip color='warning'>{t('results.normPreviewBadge')}</Chip>
        </Show>
        <button
          type='button'
          aria-expanded={open()}
          class='cursor-pointer rounded-lg px-2 py-0.5 text-sm font-medium text-primary underline underline-offset-4 transition-opacity hover:opacity-80 print:hidden'
          onClick={() => setOpen((v) => !v)}
        >
          {open()
            ? t('results.normGroupClose')
            : props.provided
              ? t('results.normGroupChange')
              : t('results.normGroupChoose')}
        </button>
      </div>

      <Show when={open()}>
        <div class='mt-4 rounded-2xl border border-divider bg-content2/40 p-4 print:hidden'>
          <p class='text-sm text-default-500'>
            {props.provided
              ? t('results.normGroupExplainer')
              : t('results.normGroupMissing')}
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
                <span>
                  {previewing()
                    ? t('results.normGroupPreviewNote')
                    : t('results.normGroupPickedNote')}
                </span>
                <button
                  type='button'
                  class='shrink-0 cursor-pointer font-medium underline underline-offset-4'
                  onClick={props.onReset}
                >
                  {previewing()
                    ? t('results.normGroupReset')
                    : t('results.normGroupClear')}
                </button>
              </div>
            </Alert>
          </Show>
        </div>
      </Show>
    </div>
  );
}
