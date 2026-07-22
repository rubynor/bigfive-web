// Minimal rich-text renderer for the kept message bundles: a few templates
// contain markup-ish tags ('Over <green>{n}</green> people') which next-intl
// rendered via t.rich. Params are already interpolated by t(); this splits the
// result on known tags and wraps the inner text with the given renderer.
// Unknown tags are left as literal text.

import { createMemo, For, type JSX } from 'solid-js';

type Segment = string | { tag: string; children: string };

export function RichText(props: {
  text: string;
  tags: Record<string, (children: string) => JSX.Element>;
}) {
  const segments = createMemo((): Segment[] => {
    const out: Segment[] = [];
    const re = /<(\w+)>([^<]*)<\/\1>/g;
    let last = 0;
    for (const match of props.text.matchAll(re)) {
      if (match.index > last) out.push(props.text.slice(last, match.index));
      const [, tag, children] = match;
      if (props.tags[tag]) out.push({ tag, children });
      else out.push(match[0]);
      last = match.index + match[0].length;
    }
    if (last < props.text.length) out.push(props.text.slice(last));
    return out;
  });
  return (
    <For each={segments()}>
      {(segment) =>
        typeof segment === 'string'
          ? segment
          : props.tags[segment.tag](segment.children)
      }
    </For>
  );
}
