import clsx from 'clsx';
import { createSignal, onMount, Show } from 'solid-js';
import { MoonFilledIcon, SunFilledIcon } from '~/components/icons';
import { theme, toggleTheme } from '~/lib/theme';

/**
 * Sun/moon toggle driven by the theme signal in lib/theme (replaces the
 * NextUI Switch + next-themes combo). The icon only renders after mount so
 * the SSR HTML (always 'light') can't hydration-mismatch a dark preference.
 */
export function ThemeSwitch(props: { class?: string }) {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));
  return (
    <button
      type='button'
      aria-label={`Switch to ${theme() === 'dark' ? 'light' : 'dark'} mode`}
      class={clsx(
        'px-px transition-opacity hover:opacity-80 cursor-pointer text-default-500',
        props.class
      )}
      onClick={toggleTheme}
    >
      <Show
        when={mounted()}
        fallback={<span class='inline-block w-[22px] h-[22px]' />}
      >
        {theme() === 'dark' ? (
          <MoonFilledIcon size={22} />
        ) : (
          <SunFilledIcon size={22} />
        )}
      </Show>
    </button>
  );
}
