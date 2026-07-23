// Minimal NextUI-flavored UI kit for the SolidStart rebuild (Phase 4 step 4).
// Kobalte where interaction is non-trivial (radio, dialog, accordion),
// plain Tailwind + tailwind-variants elsewhere. Tokens come from
// tailwind.config.cjs (background/foreground/content1-4/divider/…).

import { tv, type VariantProps } from 'tailwind-variants';
import { splitProps, type JSX } from 'solid-js';
import clsx from 'clsx';

export const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium transition-opacity hover:opacity-80 active:opacity-60 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    color: {
      default: 'bg-default text-foreground',
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      danger: 'bg-danger text-danger-foreground'
    },
    variant: {
      solid: '',
      bordered: 'border-2 bg-transparent',
      ghost: 'bg-transparent',
      link: 'bg-transparent underline-offset-4 hover:underline'
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    }
  },
  compoundVariants: [
    { variant: 'bordered', color: 'default', class: 'border-default' },
    { variant: 'bordered', color: 'primary', class: 'border-primary text-primary' },
    { variant: 'bordered', color: 'secondary', class: 'border-secondary text-secondary' },
    { variant: 'bordered', color: 'danger', class: 'border-danger text-danger' },
    { variant: 'ghost', color: 'primary', class: 'text-primary' },
    { variant: 'ghost', color: 'danger', class: 'text-danger' },
    { variant: 'link', color: 'primary', class: 'text-primary' }
  ],
  defaultVariants: { color: 'default', variant: 'solid', size: 'md' }
});

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

export function Button(props: ButtonProps) {
  const [variants, rest] = splitProps(props, [
    'color',
    'variant',
    'size',
    'class'
  ]);
  return <button class={button({ ...variants, class: variants.class })} {...rest} />;
}

export const card = tv({
  base: 'rounded-xl border border-divider bg-content1 p-4 shadow-sm'
});

export const chip = tv({
  base: 'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
  variants: {
    color: {
      default: 'bg-content3 text-foreground',
      primary: 'bg-primary/15 text-primary',
      secondary: 'bg-secondary/15 text-secondary',
      success: 'bg-success/15 text-success-600 dark:text-success-400',
      warning: 'bg-warning/15 text-warning-600 dark:text-warning-400',
      danger: 'bg-danger/15 text-danger-600 dark:text-danger-400'
    }
  },
  defaultVariants: { color: 'default' }
});

export function Chip(
  props: JSX.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof chip>
) {
  const [variants, rest] = splitProps(props, ['color', 'class']);
  return <span class={chip({ ...variants, class: clsx(variants.class) })} {...rest} />;
}

export const alert = tv({
  base: 'rounded-lg border p-4 text-sm',
  variants: {
    color: {
      default: 'border-divider bg-content2 text-foreground',
      warning:
        'border-warning/40 bg-warning/10 text-warning-700 dark:text-warning-400',
      danger:
        'border-danger/40 bg-danger/10 text-danger-700 dark:text-danger-400',
      success:
        'border-success/40 bg-success/10 text-success-700 dark:text-success-400'
    }
  },
  defaultVariants: { color: 'default' }
});

export function Alert(
  props: JSX.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof alert> & { title?: string }
) {
  const [variants, rest] = splitProps(props, ['color', 'class', 'title']);
  return (
    <div role='alert' class={alert({ ...variants, class: clsx(variants.class) })} {...rest}>
      {variants.title && <p class='mb-1 font-semibold'>{variants.title}</p>}
      {rest.children}
    </div>
  );
}

// Lightweight CSS meter (0–100 fill). Used instead of chart widgets on the
// result page wherever a single percentile needs visualising.
export function Meter(props: {
  value: number; // 0..100
  hex?: string; // fill colour; defaults to the primary token
  label: string; // aria-label
  class?: string;
}) {
  return (
    <div
      role='img'
      aria-label={props.label}
      class={clsx(
        'h-2 overflow-hidden rounded-full bg-content3',
        props.class
      )}
    >
      <div
        class='h-full rounded-full transition-[width] duration-500'
        style={{
          width: `${Math.min(100, Math.max(0, props.value))}%`,
          ...(props.hex ? { 'background-color': props.hex } : {})
        }}
        classList={{ 'bg-primary': !props.hex }}
      />
    </div>
  );
}
