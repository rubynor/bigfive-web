// Kobalte RadioGroup wrapper styled for the survey answer rows and the
// demographics card. Options are plain { value, label } pairs, rendered as
// full-width clickable rows (radio circle + label) — the same shape as the
// upstream survey's labeled radio list.

import { RadioGroup } from '@kobalte/core/radio-group';
import { For } from 'solid-js';

export type RadioOption = { value: string; label: string };

type RadioCardsProps = {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  'aria-label'?: string;
};

// Kobalte only selects on clicks landing on the ItemControl circle or the
// ItemLabel text — the row padding in between is dead. Forward every click on
// the row to the hidden native input so the whole card is a target. (When the
// click came from the label this double-dispatches, but a second .click() on
// an already-checked radio is a no-op.)
const forwardClickToInput = (e: MouseEvent) => {
  if ((e.target as HTMLElement).closest('input')) return;
  (e.currentTarget as HTMLElement)
    .querySelector<HTMLInputElement>('input[type="radio"]')
    ?.click();
};

const itemClass =
  'group flex cursor-pointer items-center gap-3 rounded-lg border border-divider bg-content1 px-4 py-3 transition-colors hover:bg-content2 data-[checked]:border-primary data-[checked]:bg-primary/5';

export function RadioCards(props: RadioCardsProps) {
  return (
    <RadioGroup
      class='flex flex-col gap-2'
      value={props.value}
      onChange={props.onChange}
      aria-label={props['aria-label']}
    >
      <For each={props.options}>
        {(option) => (
          <RadioGroup.Item
            value={option.value}
            class={itemClass}
            onClick={forwardClickToInput}
          >
            <RadioGroup.ItemInput name={props.name} />
            <RadioGroup.ItemControl class='flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-default-400 transition-colors group-data-[checked]:border-primary'>
              <RadioGroup.ItemIndicator class='h-2.5 w-2.5 rounded-full bg-primary' />
            </RadioGroup.ItemControl>
            <RadioGroup.ItemLabel class='text-sm'>
              {option.label}
            </RadioGroup.ItemLabel>
          </RadioGroup.Item>
        )}
      </For>
    </RadioGroup>
  );
}
