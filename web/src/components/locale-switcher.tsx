import { Select } from '@kobalte/core/select';
import { useNavigate } from '@solidjs/router';
import clsx from 'clsx';
import { Show } from 'solid-js';
import { languages, type Language } from '~/config/site';
import { useI18n } from '~/lib/i18n';
import { useLocaleHref } from '~/lib/i18n/nav';
import { ChevronRightLinearIcon } from '~/components/icons';

function Flag(props: { lang: Language; size?: number }) {
  const size = () => props.size ?? 20;
  return (
    <Show
      when={props.lang.countryCode}
      fallback={
        <span
          class='flex items-center justify-center rounded-full bg-content3 text-[9px] font-semibold text-foreground'
          style={{ width: `${size()}px`, height: `${size()}px` }}
        >
          {props.lang.code.toUpperCase()}
        </span>
      }
    >
      <img
        alt={props.lang.name}
        class='rounded-full object-cover'
        style={{ width: `${size()}px`, height: `${size()}px` }}
        src={`/flags/${props.lang.countryCode}.svg`}
      />
    </Show>
  );
}

/**
 * Kobalte Select port of the NextUI locale switcher. 'compact' shows only the
 * flag in the trigger (mobile navbar); 'full' shows flag + language name.
 * Navigation keeps the current page + query string (see lib/i18n/nav).
 */
export function LocaleSwitcher(props: { variant?: 'compact' | 'full' }) {
  const { locale } = useI18n();
  const localeHref = useLocaleHref();
  const navigate = useNavigate();
  const current = () =>
    languages.find((lang) => lang.code === locale()) ?? languages[0];

  return (
    <Select<Language>
      options={languages}
      optionValue='code'
      optionTextValue='name'
      value={current()}
      onChange={(lang) => lang && navigate(localeHref(lang.code))}
      placement='bottom-end'
      gutter={4}
      itemComponent={(itemProps) => (
        <Select.Item
          item={itemProps.item}
          class='flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-hidden data-[highlighted]:bg-content2 data-[selected]:font-medium'
        >
          <Flag lang={itemProps.item.rawValue} />
          <Select.ItemLabel>{itemProps.item.rawValue.name}</Select.ItemLabel>
        </Select.Item>
      )}
    >
      <Select.Trigger
        aria-label='Select language'
        class={clsx(
          'flex items-center gap-2 rounded-lg border border-divider bg-content1 px-2 py-1.5 text-sm transition-colors hover:bg-content2',
          props.variant === 'full'
            ? 'w-40 justify-between'
            : 'w-14 justify-center'
        )}
      >
        <Select.Value<Language>>
          {(state) => (
            <span class='flex items-center gap-2'>
              <Flag lang={state.selectedOption()} />
              <Show when={props.variant === 'full'}>
                <span class='truncate'>{state.selectedOption().name}</span>
              </Show>
            </span>
          )}
        </Select.Value>
        <Select.Icon class='text-default-500'>
          <ChevronRightLinearIcon size={14} class='rotate-90' />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class='z-50 max-h-80 min-w-40 overflow-y-auto rounded-lg border border-divider bg-content1 p-1 shadow-lg'>
          <Select.Listbox />
        </Select.Content>
      </Select.Portal>
    </Select>
  );
}
