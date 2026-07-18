import { createSignal } from 'solid-js';
import { isServer } from 'solid-js/web';

export type Theme = 'light' | 'dark';

/**
 * Replaces next-themes. The <html> class is set before hydration by the
 * no-FOUC script in entry-server.tsx; this signal picks up that state and
 * keeps <html> + localStorage in sync on toggle. Server-side it renders
 * 'light' — theme is a client-only concern and nothing themed is SSR-critical.
 */
const initialTheme = (): Theme =>
  !isServer && document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light';

const [theme, setThemeSignal] = createSignal<Theme>(initialTheme());

export { theme };

export function setTheme(next: Theme) {
  setThemeSignal(next);
  if (isServer) return;
  document.documentElement.classList.toggle('dark', next === 'dark');
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* private mode etc. — theme just won't persist */
  }
}

export function toggleTheme() {
  setTheme(theme() === 'dark' ? 'light' : 'dark');
}
