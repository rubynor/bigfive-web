// Kobalte RadioGroup wrapper styled for the survey Likert scale and the
// demographics card. Options are plain { value, label } pairs.

import { RadioGroup } from '@kobalte/core/radio-group';
import clsx from 'clsx';
import { For } from 'solid-js';

export type RadioOption = { value: string; label: string };

export function RadioCards(props: {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  'aria-label'?: string;
}) {
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
            class='group flex cursor-pointer items-center gap-3 rounded-lg border border-divider bg-content1 px-4 py-3 transition-colors hover:bg-content2 data-[checked]:border-primary data-[checked]:bg-primary/5'
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

// Circular Likert buttons (1-5) as used by the og survey: unlabeled circles
// between the "disagree"/"agree" anchors, sized towards the poles.
export function LikertScale(props: {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  'aria-label'?: string;
}) {
  return (
    <RadioGroup
      class='flex items-center justify-center gap-3 sm:gap-6'
      value={props.value}
      onChange={props.onChange}
      aria-label={props['aria-label']}
    >
      <For each={props.options}>
        {(option, index) => (
          <RadioGroup.Item
            value={option.value}
            title={option.label}
            aria-label={option.label}
            class={clsx(
              'group cursor-pointer rounded-full border-2 border-divider bg-content1 transition-all hover:border-primary data-[checked]:border-primary data-[checked]:bg-primary',
              index() === 0 || index() === props.options.length - 1
                ? 'h-12 w-12'
                : index() === 1 || index() === props.options.length - 2
                  ? 'h-10 w-10'
                  : 'h-8 w-8'
            )}
          >
            <RadioGroup.ItemInput name={props.name} />
          </RadioGroup.Item>
        )}
      </For>
    </RadioGroup>
  );
}
