// Kobalte RadioGroup wrappers, in two shapes:
//
// - `RadioCards`  — full-width clickable rows (radio circle + label), the
//   shape of the upstream survey's labeled radio list. Used for the 5-point
//   Likert answers, where every option is a long sentence.
// - `RadioChips`  — a wrapping row of pills. Used where the options are one
//   or two words (sex, age bracket): stacked rows waste a screenful and make
//   two side-by-side groups of unequal length look ragged.
//
// Options are plain { value, label } pairs in both.

import { RadioGroup } from '@kobalte/core/radio-group';
import { For } from 'solid-js';
import clsx from 'clsx';

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

// The pill has no radio circle — the filled state carries the selection — so
// the focus ring has to come from the (visually hidden) input via
// focus-within, or keyboard users get no indication at all.
const chipClass =
  'group cursor-pointer rounded-full border border-divider bg-content1 px-4 py-2 text-sm transition-colors hover:bg-content2 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary data-[checked]:border-primary data-[checked]:bg-primary/10 data-[checked]:font-medium data-[checked]:text-primary';

export function RadioChips(props: RadioCardsProps & { class?: string }) {
  return (
    <RadioGroup
      class={clsx('flex flex-wrap gap-2', props.class)}
      value={props.value}
      onChange={props.onChange}
      aria-label={props['aria-label']}
      orientation='horizontal'
    >
      <For each={props.options}>
        {(option) => (
          <RadioGroup.Item
            value={option.value}
            class={chipClass}
            onClick={forwardClickToInput}
          >
            <RadioGroup.ItemInput name={props.name} />
            <RadioGroup.ItemLabel class='block whitespace-nowrap'>
              {option.label}
            </RadioGroup.ItemLabel>
          </RadioGroup.Item>
        )}
      </For>
    </RadioGroup>
  );
}
