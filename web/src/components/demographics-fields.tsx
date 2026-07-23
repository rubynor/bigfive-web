// The sex + age-bracket pickers, shared by the pre-test demographics card
// (survey.tsx) and the result page's norm-group control (norm-group.tsx) so
// both offer exactly the same options in the same order.
//
// Value vocabulary (see decision #5 in HANDOFF.md):
//   'male' | 'female' | 'lt21' | 'a21_40' | 'a41_60' | 'gt60'
//                                     — a real stratum coordinate
//   'skip'                            — explicitly declined; scores against
//                                       the combined / reference group
//   ''                                — never touched (no warning shown)
// Only the first kind reaches `Demographics`; 'skip' and '' both mean the
// field is absent.

import type { AgeBracket, Sex } from '@bigfive-org/score';
import { RadioChips } from '~/components/ui/radio';
import { useI18n } from '~/lib/i18n';

export type DemographicChoice = '' | 'skip';
export type SexChoice = Sex | DemographicChoice;
export type AgeChoice = AgeBracket | DemographicChoice;

export function toDemographics(sex: SexChoice, age: AgeChoice) {
  const d: { sex?: Sex; ageBracket?: AgeBracket } = {};
  if (sex === 'male' || sex === 'female') d.sex = sex;
  if (age !== '' && age !== 'skip') d.ageBracket = age;
  return d;
}

export function DemographicsFields(props: {
  sex: SexChoice;
  age: AgeChoice;
  onSex: (value: SexChoice) => void;
  onAge: (value: AgeChoice) => void;
  idPrefix?: string;
}) {
  const { t } = useI18n();
  // Two RadioGroups on the same page must not share a radio `name`, or the
  // browser treats them as one group — the result page renders a second copy
  // of these fields while the survey's may still be in the DOM.
  const name = (field: string) => `${props.idPrefix ?? ''}${field}`;

  return (
    <div class='flex flex-col gap-4'>
      <fieldset>
        <legend class='mb-2 text-xs font-semibold uppercase tracking-wider text-default-500'>
          {t('test.demographics.sex')}
        </legend>
        <RadioChips
          name={name('sex')}
          value={props.sex}
          onChange={(v) => props.onSex(v as SexChoice)}
          options={[
            { value: 'male', label: t('test.demographics.male') },
            { value: 'female', label: t('test.demographics.female') },
            { value: 'skip', label: t('test.demographics.preferNotToSay') }
          ]}
        />
      </fieldset>
      <fieldset>
        <legend class='mb-2 text-xs font-semibold uppercase tracking-wider text-default-500'>
          {t('test.demographics.age')}
        </legend>
        <RadioChips
          name={name('age')}
          value={props.age}
          onChange={(v) => props.onAge(v as AgeChoice)}
          options={[
            { value: 'lt21', label: t('test.demographics.under21') },
            { value: 'a21_40', label: t('test.demographics.age21to40') },
            { value: 'a41_60', label: t('test.demographics.age41to60') },
            { value: 'gt60', label: t('test.demographics.over60') },
            { value: 'skip', label: t('test.demographics.preferNotToSay') }
          ]}
        />
      </fieldset>
    </div>
  );
}
