// Shared chart styling (Phase 4 step 6). Ported from the reference fork's
// bar-chart components; both charts read the app's theme signal so axis text
// and grid stay readable on first paint and follow live theme toggles.

import type { ApexOptions } from 'apexcharts';
import { theme } from '~/lib/theme';

export const isDark = () => theme() === 'dark';

export const labelColor = () => (isDark() ? '#e4e4e7' : '#3f3f46');
export const gridColor = () => (isDark() ? '#3f3f46' : '#e4e4e7');

// Single-result chart: one colour per *domain* (distributed bars) — the warm
// purple/blue/pink palette from the OG result page.
export const DOMAIN_PALETTE = [
  '#9353d3',
  '#006FEE',
  '#f31260',
  '#f5a524',
  '#17c964',
  '#E2711D'
];

// Compare chart: one colour per *person* (series), pinned to the classic
// ApexCharts 3 default palette — that is what the OG bigfive-test.com compare
// chart renders (it runs apexcharts 3.49). We can't rely on the default
// anymore: apexcharts ≥5 retuned palette1 for WCAG contrast, which changed
// every series colour (fork cde47b8).
export const COMPARE_PALETTE = [
  '#008FFB',
  '#00E396',
  '#FEB019',
  '#FF4560',
  '#775DD0'
];

export function baseOptions(): ApexOptions {
  return {
    theme: {
      mode: isDark() ? 'dark' : 'light'
    },
    fill: {
      // Pin to full opacity so bars render at the palette's true saturation —
      // ApexCharts otherwise dims bar fills (default 0.85), which read as
      // washed out on the dark background.
      opacity: 1
    },
    chart: {
      fontFamily: 'Inter Variable, Inter, sans-serif',
      background: 'transparent',
      foreColor: labelColor()
    },
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: 'Inter Variable, Inter, sans-serif',
        fontWeight: 600,
        colors: ['#ffffff']
      }
    },
    grid: {
      borderColor: gridColor()
    }
  };
}

export function axisOptions(
  max: number,
  categories?: string[]
): Pick<ApexOptions, 'xaxis' | 'yaxis'> {
  return {
    yaxis: {
      max,
      labels: {
        style: {
          colors: labelColor(),
          fontFamily: 'Inter Variable, Inter, sans-serif'
        }
      }
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: labelColor(),
          fontFamily: 'Inter Variable, Inter, sans-serif'
        }
      }
    }
  };
}
