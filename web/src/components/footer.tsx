import { A } from '@solidjs/router';
import { For } from 'solid-js';
import { GithubIcon, Logo } from '~/components/icons';
import { siteConfig } from '~/config/site';
import { useI18n, type MessageKey } from '~/lib/i18n';
import { localePath } from '~/lib/i18n/nav';

export function Footer() {
  const { t, locale } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer class='container mx-auto max-w-7xl px-12 py-24'>
      <div class='container mx-auto flex justify-between'>
        <div class='w-1/2'>
          <span class='text-center'>
            <Logo />
          </span>
        </div>
        <div class='flex w-1/2 justify-end'>
          <a
            href={siteConfig.links.github}
            target='_blank'
            rel='noreferrer'
            aria-label='Github'
          >
            <GithubIcon size={48} class='text-default-500' />
          </a>
        </div>
      </div>

      <div class='mt-12 flex w-full justify-center'>
        <ul class='mt-3 flex text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
          <For each={siteConfig.footerLinks}>
            {(item) => (
              <li>
                <A
                  href={localePath(locale(), item.href)}
                  class='me-4 hover:underline md:me-6'
                >
                  {t(`toolbar.${item.label}` as MessageKey)}
                </A>
              </li>
            )}
          </For>
        </ul>
      </div>

      <div class='mt-14 flex justify-center text-sm text-gray-500 sm:ml-4 sm:py-2 sm:pl-4'>
        © {year} — B5 Holding AS - all rights reserved.
      </div>
    </footer>
  );
}
