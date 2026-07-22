// SonarPulse for the home page (Phase 4 step 7), ported from the fork's
// sonar-pulse.tsx. color2k is replaced by a tiny #RRGGBB parser (the only
// color used is '#7928CA'); the background fade uses our --background CSS
// var. Renders nothing during SSR (the fork did the same via useIsSSR) so the
// pulse never flashes unstyled.

import { createMemo, createSignal, For, onMount, type JSX } from 'solid-js';

function hexToRgb(hex: string): [number, number, number] {
  const value = parseInt(hex.replace('#', ''), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

export function SonarPulse(props: {
  color?: string;
  icon?: JSX.Element;
  size?: number;
  circlesCount?: number;
}) {
  const size = () => props.size ?? 80;
  const circlesCount = () => props.circlesCount ?? 3;
  const color = () => props.color ?? '#FF4ECD';
  const initialSizeFactor = 1.5;

  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  const rgbaColors = createMemo(() => {
    const [r, g, b] = hexToRgb(color());
    const alpha = 0.4;
    const factor = alpha / circlesCount();
    return Array.from(
      { length: circlesCount() },
      (_, i) => `${r}, ${g}, ${b}, ${alpha - i * factor}`
    );
  });

  const backgroundFade = 'rgb(var(--background))';

  return (
    <div class='relative inline-block'>
      <div
        class='relative flex items-center justify-center rounded-full bg-transparent text-center'
        style={{ width: `${size()}px`, height: `${size()}px` }}
      >
        {props.icon}
      </div>
      {mounted() && (
        <div class='absolute left-1/2 top-1/2 -z-10 overflow-visible'>
          <For each={Array.from({ length: circlesCount() }, (_, i) => i)}>
            {(i) => {
              const diameter = () => size() * (initialSizeFactor + i);
              return (
                <div
                  class='absolute animate-pulse rounded-full'
                  style={{
                    width: `${diameter()}px`,
                    height: `${diameter()}px`,
                    top: `calc(${diameter()}px / 2 * -1)`,
                    left: `calc(${diameter()}px / 2 * -1)`,
                    border: `1.5px solid rgba(${rgbaColors()[Math.min(i, rgbaColors().length - 1)]})`,
                    background: `linear-gradient(-180deg, rgba(${rgbaColors()[Math.min(i + 1, rgbaColors().length - 1)]}) 20%, ${backgroundFade} 100%)`,
                    'animation-delay': `${(i + 1) * 0.5}s`
                  }}
                />
              );
            }}
          </For>
        </div>
      )}
    </div>
  );
}
