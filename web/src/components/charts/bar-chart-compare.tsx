// Compare bar chart — one series per person (Phase 4 step 6), ported from the
// fork's bar-chart-generic.tsx. Client-only via the wrapper in ./index.tsx.

import { createMemo } from 'solid-js';
import { SolidApexCharts } from 'solid-apexcharts';
import type { ApexOptions } from 'apexcharts';
import {
  axisOptions,
  baseOptions,
  COMPARE_PALETTE,
  labelColor
} from './options';

export type CompareSeries = {
  name: string;
  data: number[];
};

export default function BarChartCompare(props: {
  max: number;
  categories: string[];
  series: CompareSeries[];
}) {
  const options = createMemo((): ApexOptions => ({
    ...baseOptions(),
    colors: COMPARE_PALETTE,
    legend: {
      show: true,
      labels: {
        colors: labelColor()
      }
    },
    chart: {
      ...baseOptions().chart,
      // Match the OG compare chart: show only the download (hamburger) menu —
      // no zoom/pan/selection tools, which don't apply to a categorical bar
      // chart.
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      }
    },
    ...axisOptions(props.max, props.categories),
    plotOptions: {
      bar: {
        distributed: false
      }
    }
  }));

  return (
    <SolidApexCharts
      type='bar'
      options={options()}
      series={props.series}
      height={350}
      width='100%'
    />
  );
}
