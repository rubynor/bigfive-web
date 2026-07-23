import { Dialog } from '@kobalte/core/dialog';
import { Progress } from '@kobalte/core/progress';
import { Accordion } from '@kobalte/core/accordion';
import clsx from 'clsx';
import { Show, For, type JSX, type ParentProps } from 'solid-js';
import { ChevronRightLinearIcon, CloseIcon } from '~/components/icons';

// --- Progress (survey progress bar) ---

export function ProgressBar(props: {
  value: number;
  max?: number;
  label?: string;
  class?: string;
}) {
  return (
    <Progress
      value={props.value}
      maxValue={props.max ?? 100}
      class={clsx('flex w-full flex-col gap-1', props.class)}
    >
      <Show when={props.label}>
        <Progress.Label class='text-sm text-default-500'>
          {props.label}
        </Progress.Label>
      </Show>
      <Progress.Track class='h-2 w-full overflow-hidden rounded-full bg-content3'>
        <Progress.Fill
          class='h-full rounded-full bg-primary transition-[width] duration-300'
          style={{
            width: `${Math.min(100, (props.value / (props.max ?? 100)) * 100)}%`
          }}
        />
      </Progress.Track>
    </Progress>
  );
}

// --- Dialog (modal) ---

export function Modal(
  props: ParentProps<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    size?: 'sm' | 'md' | 'lg';
  }>
) {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay class='fixed inset-0 z-50 bg-black/50 backdrop-blur-xs data-[expanded]:animate-in data-[expanded]:fade-in' />
        <div class='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <Dialog.Content
            class={clsx(
              'w-full rounded-xl border border-divider bg-content1 p-6 shadow-xl outline-hidden data-[expanded]:animate-in data-[expanded]:zoom-in-95',
              props.size === 'lg'
                ? 'max-w-2xl'
                : props.size === 'sm'
                  ? 'max-w-sm'
                  : 'max-w-md'
            )}
          >
            <div class='mb-4 flex items-start justify-between gap-4'>
              <Show when={props.title}>
                <Dialog.Title class='text-lg font-semibold'>
                  {props.title}
                </Dialog.Title>
              </Show>
              <Dialog.CloseButton
                aria-label='Close'
                class='ml-auto cursor-pointer text-default-500 transition-opacity hover:opacity-70'
              >
                <CloseIcon size={20} />
              </Dialog.CloseButton>
            </div>
            {props.children}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog>
  );
}

// --- Accordion (faq) ---

// `content` is a thunk, not a ready-made JSX.Element: Kobalte does not render
// a collapsed item's content during SSR, so eagerly-built JSX would try to
// claim hydration keys that aren't in the server markup ("Hydration Mismatch.
// Unable to find DOM nodes for hydration key"). Deferring construction to
// inside <Accordion.Content> keeps creation and rendering in the same place.
export type AccordionEntry = {
  value: string;
  title: string;
  content: () => JSX.Element;
};

export function FaqAccordion(props: { items: AccordionEntry[] }) {
  return (
    <Accordion collapsible class='flex w-full flex-col gap-2'>
      <For each={props.items}>
        {(item) => (
          <Accordion.Item
            value={item.value}
            class='rounded-lg border border-divider bg-content1 px-4'
          >
            <Accordion.Header>
              <Accordion.Trigger class='flex w-full cursor-pointer items-center justify-between gap-2 py-3 text-left text-sm font-medium [&[data-expanded]>svg]:rotate-90'>
                {item.title}
                <ChevronRightLinearIcon
                  size={16}
                  class='shrink-0 transition-transform'
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class='pb-3 text-sm text-default-600'>
              {item.content()}
            </Accordion.Content>
          </Accordion.Item>
        )}
      </For>
    </Accordion>
  );
}
