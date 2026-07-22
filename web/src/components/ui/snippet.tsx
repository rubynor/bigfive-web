// Copyable monospace box for result ids (NextUI Snippet replacement).

import { createSignal, Show } from 'solid-js';
import { CopyIcon } from '~/components/icons';

function CheckIcon(props: { size?: number; class?: string }) {
  return (
    <svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox='0 0 24 24'
      fill='none'
      class={props.class}
    >
      <path
        d='M4 12.5l5 5L20 6.5'
        stroke='currentColor'
        stroke-width='2.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}

export function Snippet(props: { text: string; class?: string }) {
  const [copied, setCopied] = createSignal(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(props.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable (insecure context) — leave uncopied
    }
  };

  return (
    <span
      class={`inline-flex items-center gap-2 rounded-lg border border-divider bg-content2 px-3 py-1.5 font-mono text-sm ${props.class ?? ''}`}
    >
      <span class='select-all'>{props.text}</span>
      <button
        type='button'
        aria-label={copied() ? 'Copied' : 'Copy to clipboard'}
        class='cursor-pointer text-default-500 transition-opacity hover:opacity-70'
        onClick={copy}
      >
        <Show when={copied()} fallback={<CopyIcon size={16} />}>
          <CheckIcon size={16} class='text-success' />
        </Show>
      </button>
    </span>
  );
}
