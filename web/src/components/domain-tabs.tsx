// Domain sections for the result page (Phase 4 step 7, fork commit 544030f):
// an "All" + per-domain tab bar (ButtonGroup on desktop, Select on mobile)
// filtering the domain detail sections. Charts plot raw scores; percentiles
// from the norm-based assessment are shown alongside.

import { createSignal, For, Show } from 'solid-js';
import type { ResultDomain } from '@bigfive-org/data';
import type { AssessmentResult } from '@bigfive-org/score';
import clsx from 'clsx';
import { BarChart } from '~/components/charts';
import { ReadMore } from '~/components/read-more';
import { heading } from '~/components/primitives';
import { useI18n } from '~/lib/i18n';

function DomainSection(props: {
  domain: ResultDomain;
  assessment: AssessmentResult;
  showExpanded?: boolean;
}) {
  const { t } = useI18n();
  const domainScore = () =>
    props.assessment.domains[props.domain.domain as 'N' | 'E' | 'O' | 'A' | 'C'];

  return (
    <section id={props.domain.domain} class='mt-10'>
      <h2 class={heading()}>{props.domain.title}</h2>
      <p class='text-default-500'>{props.domain.shortDescription}</p>
      <ReadMore
        text={props.domain.description}
        expanded={props.showExpanded}
      />
      <p class='mt-4'>{props.domain.text}</p>
      <p class='mt-1 text-sm text-default-500'>
        {t('results.score')}: {props.domain.score} ·{' '}
        {t('results.percentile', {
          percentile: Math.round(domainScore().percentile)
        })}
      </p>
      <div class='mt-4'>
        <BarChart max={20} results={props.domain.facets} />
      </div>
      <For each={props.domain.facets}>
        {(facet) => (
          <div class='mt-6' id={`${props.domain.domain}${facet.facet}`}>
            <h3 class='text-lg font-semibold'>{facet.title}</h3>
            <p class='text-sm text-default-500'>
              {t('results.score')}: {facet.score} ({facet.scoreText})
              {/* Keys align today ('1'..'6' on both sides), but a missing
                  facet score must not hard-crash the whole report — skip the
                  percentile instead. */}
              <Show when={domainScore().facets[String(facet.facet)]}>
                {(facetScore) => (
                  <>
                    {' · '}
                    {t('results.percentile', {
                      percentile: Math.round(facetScore().percentile)
                    })}
                  </>
                )}
              </Show>
            </p>
            <p class='mt-1'>{facet.text}</p>
          </div>
        )}
      </For>
    </section>
  );
}

export function DomainTabs(props: {
  domains: ResultDomain[];
  assessment: AssessmentResult;
  showExpanded?: boolean;
}) {
  const { t } = useI18n();
  const [active, setActive] = createSignal<string>('all');
  const visible = () =>
    active() === 'all'
      ? props.domains
      : props.domains.filter((d) => d.domain === active());

  return (
    <div class='mt-8'>
      {/* Desktop tab bar */}
      <div class='hidden gap-1 print:hidden md:flex'>
        <button
          type='button'
          class={clsx(
            'cursor-pointer rounded-lg px-3 py-1.5 text-sm transition-colors',
            active() === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'text-default-600 hover:bg-content2'
          )}
          onClick={() => setActive('all')}
        >
          {t('results.all')}
        </button>
        <For each={props.domains}>
          {(domain) => (
            <button
              type='button'
              class={clsx(
                'cursor-pointer rounded-lg px-3 py-1.5 text-sm transition-colors',
                active() === domain.domain
                  ? 'bg-primary text-primary-foreground'
                  : 'text-default-600 hover:bg-content2'
              )}
              onClick={() => setActive(domain.domain)}
            >
              {domain.title}
            </button>
          )}
        </For>
      </div>
      {/* Mobile domain select */}
      <label class='flex items-center gap-2 text-sm text-default-500 print:hidden md:hidden'>
        {t('results.selectDomain')}
        <select
          class='cursor-pointer rounded-lg border border-divider bg-content1 px-2 py-1 text-sm text-foreground'
          value={active()}
          onChange={(e) => setActive(e.currentTarget.value)}
        >
          <option value='all'>{t('results.all')}</option>
          <For each={props.domains}>
            {(domain) => (
              <option value={domain.domain}>{domain.title}</option>
            )}
          </For>
        </select>
      </label>
      <For each={visible()}>
        {(domain) => (
          <DomainSection
            domain={domain}
            assessment={props.assessment}
            showExpanded={props.showExpanded}
          />
        )}
      </For>
    </div>
  );
}
