// Single-result domain bar chart (Phase 4 step 6), ported from the fork's
// bar-chart.tsx. Client-only via the wrapper in ./index.tsx.

import { createMemo } from 'solid-js';
import { SolidApexCharts } from 'solid-apexcharts';
import type { ApexOptions } from 'apexcharts';
import {
  axisOptions,
  baseOptions,
  DOMAIN_PALETTE,
  labelColor
} from './options';

export type BarChartResult = {
  title: string;
  score: number;
};

export default function BarChart(props: {
  max: number;
  results: BarChartResult[];
}) {
  const options = createMemo((): ApexOptions => {
    const categories = props.results.map((result) => result.title);
    return {
      ...baseOptions(),
      legend: {
        show: false
      },
      chart: {
        ...baseOptions().chart,
        toolbar: {
          show: false
        }
      },
      ...axisOptions(props.max, categories),
      plotOptions: {
        bar: {
          distributed: true
        }
      },
      fill: {
        opacity: 1,
        colors: DOMAIN_PALETTE
      }
    };
  });

  const series = createMemo(() => [
    {
      name: 'You',
      data: props.results.map((result) => result.score)
    }
  ]);

  return (
    <SolidApexCharts
      type='bar'
      options={options()}
      series={series()}
      height={350}
      width='100%'
    />
  );
}
