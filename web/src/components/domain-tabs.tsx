// Domain detail sections for the result page: a sticky filter bar (pills on
// desktop, Select on mobile) plus one card per domain — accent-coloured
// header with percentile + band, long description behind ReadMore, the
// domain result text as a quote, and the six facets as meter cards. The
// active filter signal is lifted to the route so the overview cards can
// drive it too.

import { For, Show, type Accessor, type Setter } from 'solid-js';
import type { ResultDomain } from '@bigfive-org/data';
import type { AssessmentResult, DomainCode } from '@bigfive-org/score';
import clsx from 'clsx';
import { ReadMore } from '~/components/read-more';
import { Chip, Meter } from '~/components/ui';
import { DOMAIN_ACCENTS } from '~/lib/domain-accents';
import { BAND_KEYS } from '~/lib/bands';
import type { DetailMode } from '~/lib/detail-mode';
import { useI18n } from '~/lib/i18n';

function DomainSection(props: {
  domain: ResultDomain;
  assessment: AssessmentResult;
  showExpanded?: boolean;
  mode: Accessor<DetailMode>;
}) {
  const { t } = useI18n();
  const domainScore = () =>
    props.assessment.domains[props.domain.domain as DomainCode];
  const accent = () => DOMAIN_ACCENTS[props.domain.domain as DomainCode];
  const percentile = () => Math.round(domainScore().percentile);
  const advanced = () => props.mode() === 'advanced';

  return (
    <section
      id={props.domain.domain}
      class='mt-6 scroll-mt-36 rounded-3xl border border-divider bg-content1 p-6 sm:p-8'
    >
      <div class='flex items-center gap-4'>
        <span
          aria-hidden
          class='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl font-extrabold text-white'
          style={{ 'background-color': accent().hex }}
        >
          {props.domain.domain}
        </span>
        <h2 class='min-w-0 flex-1 text-2xl font-bold'>
          {props.domain.title}
        </h2>
        <div class='shrink-0 text-right'>
          <p
            class='text-3xl font-extrabold tabular-nums'
            style={{ color: accent().hex }}
          >
            {percentile()}
          </p>
          <p class='max-w-36 text-xs text-default-500'>
            {advanced()
              ? t('results.percentileLabel')
              : t('results.higherThan', { percentile: percentile() })}
          </p>
        </div>
      </div>
      <p class='mt-2 text-sm text-default-500'>
        {props.domain.shortDescription}
      </p>
      <div class='mt-4 flex items-center gap-3'>
        <Meter
          class='flex-1'
          value={percentile()}
          hex={accent().hex}
          label={t('typology.percentileAria', {
            label: props.domain.title,
            percentile: percentile()
          })}
        />
        <Chip>{t(BAND_KEYS[domainScore().band])}</Chip>
      </div>
      <Show when={advanced()}>
        <p class='mt-1.5 text-xs tabular-nums text-default-500'>
          {t('results.rawScore', { score: domainScore().raw, max: 120 })}
          {' · '}
          {t('results.tScore', { t: domainScore().t.toFixed(1) })}
        </p>
      </Show>
      <div class='mt-4'>
        <ReadMore
          text={props.domain.description}
          expanded={props.showExpanded}
        />
      </div>
      <p
        class='mt-4 rounded-r-xl border-l-4 bg-content2/60 px-4 py-3 text-sm'
        style={{ 'border-color': accent().hex }}
      >
        {props.domain.text}
      </p>
      <div class='mt-6 grid gap-4 md:grid-cols-2'>
        <For each={props.domain.facets}>
          {(facet) => (
            <div
              id={`${props.domain.domain}${facet.facet}`}
              class='scroll-mt-36 rounded-2xl border border-divider bg-content2/40 p-4'
            >
              <div class='flex items-center justify-between gap-2'>
                <h3 class='font-semibold'>{facet.title}</h3>
                {/* Keys align today ('1'..'6' on both sides), but a missing
                    facet score must not hard-crash the whole report — skip
                    the percentile instead. */}
                <Show
                  when={advanced()}
                  fallback={
                    <span class='shrink-0 text-xs text-default-500'>
                      {facet.scoreText}
                    </span>
                  }
                >
                  <Show when={domainScore().facets[String(facet.facet)]}>
                    {(facetScore) => (
                      <span
                        class='shrink-0 text-sm font-bold tabular-nums'
                        style={{ color: accent().hex }}
                      >
                        {Math.round(facetScore().percentile)}
                      </span>
                    )}
                  </Show>
                </Show>
              </div>
              <Show when={domainScore().facets[String(facet.facet)]}>
                {(facetScore) => (
                  <Meter
                    class='mt-2'
                    value={Math.round(facetScore().percentile)}
                    hex={accent().hex}
                    label={t('typology.percentileAria', {
                      label: facet.title,
                      percentile: Math.round(facetScore().percentile)
                    })}
                  />
                )}
              </Show>
              <Show when={advanced()}>
                <p class='mt-2 text-xs tabular-nums text-default-500'>
                  {t('results.rawScore', { score: facet.score, max: 20 })}
                </p>
              </Show>
              <p class='mt-1.5 text-sm text-default-600 dark:text-default-500'>
                {facet.text}
              </p>
            </div>
          )}
        </For>
      </div>
    </section>
  );
}

export function DomainTabs(props: {
  domains: ResultDomain[];
  assessment: AssessmentResult;
  showExpanded?: boolean;
  active: Accessor<string>;
  setActive: Setter<string>;
  mode: Accessor<DetailMode>;
}) {
  const { t } = useI18n();
  const visible = () =>
    props.active() === 'all'
      ? props.domains
      : props.domains.filter((d) => d.domain === props.active());

  return (
    <div class='mt-10'>
      <h2 class='text-center text-2xl font-bold'>
        {t('results.domainDetails')}
      </h2>
      {/* Sticky filter bar, tucked under the sticky navbar */}
      <div class='sticky top-16 z-30 -mx-4 mt-4 border-y border-divider bg-background/80 px-4 py-2.5 backdrop-blur-lg print:hidden'>
        {/* Desktop pills */}
        <div class='hidden justify-center gap-1.5 md:flex'>
          <button
            type='button'
            class={clsx(
              'cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
              props.active() === 'all'
                ? 'bg-foreground text-background'
                : 'text-default-600 hover:bg-content2'
            )}
            onClick={() => props.setActive('all')}
          >
            {t('results.all')}
          </button>
          <For each={props.domains}>
            {(domain) => {
              const accent = () => DOMAIN_ACCENTS[domain.domain as DomainCode];
              const isActive = () => props.active() === domain.domain;
              return (
                <button
                  type='button'
                  class={clsx(
                    'cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                    isActive()
                      ? 'text-white'
                      : 'text-default-600 hover:bg-content2'
                  )}
                  style={
                    isActive() ? { 'background-color': accent().hex } : {}
                  }
                  onClick={() => props.setActive(domain.domain)}
                >
                  {domain.title}
                </button>
              );
            }}
          </For>
        </div>
        {/* Mobile domain select */}
        <label class='flex items-center justify-center gap-2 text-sm text-default-500 md:hidden'>
          {t('results.selectDomain')}
          <select
            class='cursor-pointer rounded-lg border border-divider bg-content1 px-2 py-1 text-sm text-foreground'
            value={props.active()}
            onChange={(e) => props.setActive(e.currentTarget.value)}
          >
            <option value='all'>{t('results.all')}</option>
            <For each={props.domains}>
              {(domain) => (
                <option value={domain.domain}>{domain.title}</option>
              )}
            </For>
          </select>
        </label>
      </div>
      <For each={visible()}>
        {(domain) => (
          <DomainSection
            domain={domain}
            assessment={props.assessment}
            showExpanded={props.showExpanded}
            mode={props.mode}
          />
        )}
      </For>
    </div>
  );
}
