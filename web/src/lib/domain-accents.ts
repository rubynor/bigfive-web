// Per-domain accent colours for the result page. Pinned to the chart's
// DOMAIN_PALETTE (components/charts/options.ts): the overview BarChart is fed
// domains in O,C,E,A,N order and paints them with the palette in that order,
// so these accents keep cards/meters consistent with the chart bars.

import type { DomainCode } from '@bigfive-org/score';

export const DOMAIN_ACCENTS: Record<DomainCode, { hex: string }> = {
  O: { hex: '#9353d3' },
  C: { hex: '#006fee' },
  E: { hex: '#f31260' },
  A: { hex: '#f5a524' },
  N: { hex: '#17c964' }
};

// 15%-alpha soft fill (hex + alpha suffix) for chips/badges in the accent hue.
export const softAccent = (hex: string) => `${hex}26`;
