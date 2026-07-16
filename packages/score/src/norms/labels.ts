import type { AgeBracket, Sex } from '../types';

// Human-readable stratum labels. Kept in their own module (no dependency on the
// generated norm source) so the generator can import labelFor without triggering
// a load of the file it is about to write.
export const AGE_BRACKET_LABELS: Record<AgeBracket, string> = {
  lt21: 'under 21',
  a21_40: '21-40',
  a41_60: '41-60',
  gt60: 'over 60'
};

export function labelFor(sex: Sex | 'combined', ageBracket: AgeBracket): string {
  const who = sex === 'combined' ? 'Combined' : sex === 'male' ? 'Men' : 'Women';
  return `${who}, ${AGE_BRACKET_LABELS[ageBracket]}`;
}
