import { A, useLocation } from '@solidjs/router';
import clsx from 'clsx';
import { createSignal, For, Show } from 'solid-js';
import { GithubIcon, Logo } from '~/components/icons';
import { LocaleSwitcher } from '~/components/locale-switcher';
import { ThemeSwitch } from '~/components/theme-switch';
import { siteConfig } from '~/config/site';
import { useI18n, type MessageKey } from '~/lib/i18n';
import { localePath } from '~/lib/i18n/nav';

/**
 * Hand-rolled Tailwind port of the NextUI navbar: sticky header, brand, nav
 * links (active = danger), github/theme/locale controls, hamburger menu on
 * mobile. Nav labels come from the toolbar.* message keys.
 */
export function Navbar() {
  const { t, locale } = useI18n();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = createSignal(false);

  const basePath = () => {
    const segments = location.pathname.split('/');
    if (segments[1] === locale() && locale() !== 'en') segments.splice(1, 1);
    return segments.join('/') || '/';
  };
  const isCurrent = (href: string) =>
    href === '/' ? basePath() === '/' : basePath().startsWith(href);
  const linkClass = (href: string) =>
    clsx(
      'text-foreground transition-colors hover:text-foreground/70',
      isCurrent(href) && 'text-danger font-medium'
    );

  return (
    <header class='sticky top-0 z-40 w-full border-b border-divider bg-background/70 backdrop-blur-lg'>
      <nav class='mx-auto flex h-16 max-w-7xl items-center gap-4 px-6'>
        <A
          href={localePath(locale(), '/')}
          aria-label='Home'
          class='flex items-center gap-1'
        >
          <Logo />
        </A>

        <div class='ml-2 hidden gap-4 md:flex'>
          <For each={siteConfig.navItems}>
            {(item) => (
              <A
                class={linkClass(item.href)}
                href={localePath(locale(), item.href)}
              >
                {t(`toolbar.${item.label}` as MessageKey)}
              </A>
            )}
          </For>
        </div>

        <div class='ml-auto flex items-center gap-3'>
          <div class='hidden items-center gap-3 md:flex'>
            <LocaleSwitcher variant='full' />
          </div>
          <div class='md:hidden'>
            <LocaleSwitcher variant='compact' />
          </div>
          <a
            href={siteConfig.links.github}
            target='_blank'
            rel='noreferrer'
            aria-label='Github'
          >
            <GithubIcon class='text-default-500' />
          </a>
          <ThemeSwitch />
          <button
            type='button'
            class='md:hidden text-default-500'
            aria-label={menuOpen() ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen()}
            onClick={() => setMenuOpen(!menuOpen())}
          >
            <Show when={menuOpen()} fallback={<MenuIcon />}>
              <CloseIcon />
            </Show>
          </button>
        </div>
      </nav>

      <Show when={menuOpen()}>
        <div class='border-t border-divider bg-background md:hidden'>
          <div class='mx-4 mt-2 flex flex-col gap-2 pb-4'>
            <For each={siteConfig.navMenuItems}>
              {(item) => (
                <A
                  onClick={() => setMenuOpen(false)}
                  href={localePath(locale(), item.href)}
                  class={clsx(
                    'py-2 text-3xl text-foreground',
                    isCurrent(item.href) && 'text-danger font-medium'
                  )}
                >
                  {t(`toolbar.${item.label}` as MessageKey)}
                </A>
              )}
            </For>
          </div>
        </div>
      </Show>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <path
        d='M3 6h18M3 12h18M3 18h18'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <path
        d='M6 6l12 12M18 6L6 18'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
      />
    </svg>
  );
}
