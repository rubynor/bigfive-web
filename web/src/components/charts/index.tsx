// Chart entry points (Phase 4 step 6). ApexCharts is a client-only library
// (it measures the DOM), so both charts are wrapped in clientOnly — SSR
// renders nothing and the chart hydrates on the client. Import charts from
// here, never from the inner modules directly.

import { clientOnly } from '@solidjs/start';

export const BarChart = clientOnly(() => import('./bar-chart'));
export const BarChartCompare = clientOnly(() => import('./bar-chart-compare'));

export type { BarChartResult } from './bar-chart';
export type { CompareSeries } from './bar-chart-compare';
