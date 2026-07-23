// Shared band -> message-key map (very low … very high). Used by the domain
// overview cards, domain detail headers and the composites grid.

import type { Band } from '@bigfive-org/score';
import type { MessageKey } from '~/lib/i18n';

export const BAND_KEYS: Record<Band, MessageKey> = {
  'very low': 'composites.bands.veryLow',
  low: 'composites.bands.low',
  average: 'composites.bands.average',
  high: 'composites.bands.high',
  'very high': 'composites.bands.veryHigh'
};
