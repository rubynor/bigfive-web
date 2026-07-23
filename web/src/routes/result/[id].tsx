// /result/[id] — the scored report page (Phase 4 step 7, fork commit 544030f;
// redesigned 2026-07-23). Data comes from getTestResultQuery (Postgres, with
// the bigfive-test.com og-fallback for unknown ObjectId-shaped ids); scoring
// is derived at read time from the stored raw answers. ?lang= overrides the
// report-text language for shared deep links; ?showExpanded expands the long
// domain descriptions.
//
// Layout: typology hero (type string + role/strategy) → save-ID banner →
// Big Five overview (per-domain accent cards driving the detail filter +
// the raw-score bar chart + the reference-group control) → typology axis
// breakdown → composites → sticky-filtered domain detail cards.

import { Title } from '@solidjs/meta';
import { createAsync, useParams, useSearchParams, A } from '@solidjs/router';
import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show
} from 'solid-js';
import type { Demographics, Report } from '@bigfive-org/data';
import type { AgeBracket, DomainCode, Sex } from '@bigfive-org/score';
import clsx from 'clsx';
import { BarChart } from '~/components/charts';
import { CompositesView } from '~/components/composites-view';
import type { AgeChoice, SexChoice } from '~/components/demographics-fields';
import { DomainTabs } from '~/components/domain-tabs';
import { NormGroup } from '~/components/norm-group';
import { ShareBar } from '~/components/share-bar';
import {
  ROLE_KEYS,
  STRATEGY_KEYS,
  TypologyView
} from '~/components/typology-view';
import { Alert, Chip, Meter } from '~/components/ui';
import { Snippet } from '~/components/ui/snippet';
import { title } from '~/components/primitives';
import { supportEmail } from '~/config/site';
import { getTestResultQuery } from '~/lib/actions';
import { DOMAIN_ACCENTS } from '~/lib/domain-accents';
import { BAND_KEYS } from '~/lib/bands';
import { DETAIL_MODE_KEY, type DetailMode } from '~/lib/detail-mode';
import { useI18n } from '~/lib/i18n';
import { localePath } from '~/lib/i18n/nav';

// The score pipeline ships domains in N,E,O,A,C; the report presents OCEAN.
// This order also pins the chart's DOMAIN_PALETTE mapping (see
// lib/domain-accents.ts).
const OCEAN_ORDER = ['O', 'C', 'E', 'A', 'N'];

// ?sex=/?age= vocabulary for the reference-group override. 'none' is the
// URL spelling of the 'skip' pill: an explicit "score me against the
// combined group", as opposed to an absent param (use the stored value).
const SEX_VALUES: readonly string[] = ['male', 'female'];
const AGE_VALUES: readonly string[] = ['lt21', 'a21_40', 'a41_60', 'gt60'];

export default function ResultPage() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, locale } = useI18n();

  const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const langParam = () => first(searchParams.lang);

  const sexParam = () => first(searchParams.sex);
  const ageParam = () => first(searchParams.age);

  // An override is in play as soon as either param carries a value we
  // recognise; junk in the URL is ignored rather than silently re-scoring
  // against the reference stratum.
  const normOverridden = () => {
    const sex = sexParam();
    const age = ageParam();
    return (
      sex === 'none' ||
      age === 'none' ||
      (!!sex && SEX_VALUES.includes(sex)) ||
      (!!age && AGE_VALUES.includes(age))
    );
  };

  // `undefined` → the server falls back to the stored demographics. `{}` is a
  // real override meaning "combined reference group".
  const normOverride = (): Demographics | undefined => {
    if (!normOverridden()) return undefined;
    const sex = sexParam();
    const age = ageParam();
    const d: Demographics = {};
    if (sex && SEX_VALUES.includes(sex)) d.sex = sex as Sex;
    if (age && AGE_VALUES.includes(age)) d.ageBracket = age as AgeBracket;
    return d;
  };

  // Both params are always written together: the panel's chips show the
  // stratum that was actually used, so changing one field must carry the
  // other one over or the stored value silently drops out of the override.
  const setNormGroup = (sex: SexChoice, age: AgeChoice) => {
    setSearchParams(
      {
        sex: sex === '' || sex === 'skip' ? 'none' : sex,
        age: age === '' || age === 'skip' ? 'none' : age
      },
      { replace: true, scroll: false }
    );
  };

  const resetNormGroup = () => {
    setSearchParams({ sex: undefined, age: undefined }, { scroll: false });
  };

  // A B5Error{NotFoundError} means "no such id" (bad link); anything else is
  // a technical failure (DB down, upstream unreachable) and must not be
  // reported as "check that the id is correct". The name check covers both
  // in-process SSR errors and RPC-serialized rejections.
  const isNotFound = (error: unknown) =>
    (error as { name?: unknown } | null)?.name === 'NotFoundError';

  const [loadError, setLoadError] = createSignal<unknown>(null);
  const report = createAsync(async (): Promise<Report | null> => {
    try {
      setLoadError(null);
      return await getTestResultQuery(
        params.id ?? '',
        langParam() ?? locale(),
        normOverride()
      );
    } catch (error) {
      setLoadError(error);
      return null;
    }
  });

  const results = createMemo(() => {
    const r = report();
    if (!r) return [];
    return [...r.results].sort(
      (a, b) => OCEAN_ORDER.indexOf(a.domain) - OCEAN_ORDER.indexOf(b.domain)
    );
  });

  // Lifted domain filter: the overview cards set it (and anchor-scroll into
  // the detail sections); the sticky bar in DomainTabs renders it.
  const [activeDomain, setActiveDomain] = createSignal<string>('all');

  // ── Transient #domain fragment ──────────────────────────────────────
  // The fragment is a one-shot navigation aid, not page state. Left alone it
  // sticks around for the rest of the visit: it survives scrolling, ends up
  // in reloads and in anything the reader copies out of the address bar, and
  // re-jumps them to a mid-page section they long scrolled past. So: write
  // it with replaceState (no history entry per card click) and drop it again
  // the moment the section it points at leaves the viewport.
  const stripHash = () => {
    if (!window.location.hash) return;
    history.replaceState(
      history.state,
      '',
      window.location.pathname + window.location.search
    );
  };

  let hashWatcher: IntersectionObserver | undefined;
  const watchHash = (id: string) => {
    hashWatcher?.disconnect();
    const el = document.getElementById(id);
    if (!el || typeof IntersectionObserver === 'undefined') return;
    // The observer fires once immediately with the element's current state.
    // Ignore everything until it has actually been seen on screen, or a
    // fragment that arrives before the scroll lands clears itself instantly.
    let wasVisible = false;
    hashWatcher = new IntersectionObserver((entries) => {
      const entry = entries[entries.length - 1];
      if (!entry) return;
      if (entry.isIntersecting) {
        wasVisible = true;
      } else if (wasVisible) {
        stripHash();
        hashWatcher?.disconnect();
        hashWatcher = undefined;
      }
    });
    hashWatcher.observe(el);
  };
  onCleanup(() => hashWatcher?.disconnect());

  const focusDomain = (domain: string, event?: MouseEvent) => {
    // Let modified clicks (new tab/window) keep the plain anchor behaviour.
    if (event?.metaKey || event?.ctrlKey || event?.shiftKey || event?.button) {
      return;
    }
    event?.preventDefault();
    setActiveDomain(domain);
    // The filter change re-renders the detail list; wait for that before
    // measuring or scrolling to the section.
    requestAnimationFrame(() => {
      const el = document.getElementById(domain);
      if (!el) return;
      history.replaceState(
        history.state,
        '',
        `${window.location.pathname}${window.location.search}#${domain}`
      );
      el.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        block: 'start'
      });
      watchHash(domain);
    });
  };

  const applyHash = () => {
    const target = window.location.hash.slice(1);
    if (!target) return;
    // Domain fragments also drive the filter, so a shared link opens on the
    // same view a click produces. Facet fragments (#C3) only get scrolled to
    // — and only reach the DOM at all when their domain is on screen.
    if (OCEAN_ORDER.includes(target)) setActiveDomain(target);
    requestAnimationFrame(() => {
      document
        .getElementById(target)
        ?.scrollIntoView({ behavior: 'auto', block: 'start' });
      watchHash(target);
    });
  };

  // A deep link (…/result/<id>#C) lands before the report resolves, so the
  // browser has nothing to scroll to. Apply it once the sections exist.
  let deepLinkApplied = false;
  createEffect(() => {
    if (!report() || deepLinkApplied) return;
    deepLinkApplied = true;
    applyHash();
  });

  // Fragment navigations that don't reload the document — an in-page link, or
  // Back onto a fragment we stripped — bypass the effect above, and the
  // browser's own anchor scrolling misses any section the filter has hidden.
  // (replaceState, which is all focusDomain/stripHash use, fires nothing.)
  onMount(() => {
    window.addEventListener('hashchange', applyHash);
    onCleanup(() => window.removeEventListener('hashchange', applyHash));
  });

  // Detail level: 'simple' explains scores in plain language; 'advanced'
  // adds percentile/raw/T-score numbers. SSR always renders 'simple'; a
  // stored preference upgrades on mount (same pattern as the theme signal).
  const [detailMode, setDetailMode] = createSignal<DetailMode>('simple');
  onMount(() => {
    try {
      if (localStorage.getItem(DETAIL_MODE_KEY) === 'advanced') {
        setDetailMode('advanced');
      }
    } catch {
      // storage unavailable — stay simple
    }
  });
  const chooseDetailMode = (mode: DetailMode) => {
    setDetailMode(mode);
    try {
      localStorage.setItem(DETAIL_MODE_KEY, mode);
    } catch {
      // storage unavailable — session-only
    }
  };

  const showExpanded = () => Boolean(searchParams.showExpanded);

  return (
    <main class='mx-auto w-full max-w-5xl px-4 py-8'>
      <Title>{t('results.seo.title')}</Title>
      <Show when={report() === null && isNotFound(loadError())}>
        <Alert color='danger' title={t('results.notFoundTitle')}>
          <p class='font-mono'>{t('results.notFoundId', { id: params.id })}</p>
          <p class='mt-1'>
            {t('results.notFoundContact', { email: supportEmail })}
          </p>
        </Alert>
      </Show>
      <Show when={report() === null && loadError() && !isNotFound(loadError())}>
        <Alert color='danger' title={t('results.loadErrorTitle')}>
          <p>{t('results.loadErrorBody', { email: supportEmail })}</p>
        </Alert>
      </Show>
      <Show when={report()}>
        {(r) => (
          <>
            {/* ── Hero: type identity ─────────────────────────────── */}
            <section class='relative overflow-hidden rounded-3xl border border-divider bg-content1 px-6 py-8 text-center sm:px-10 sm:py-10'>
              <div
                aria-hidden
                class='pointer-events-none absolute inset-0 bg-linear-to-br from-secondary/10 via-transparent to-primary/10'
              />
              <div class='relative'>
                <div class='flex items-center justify-between'>
                  <Chip>
                    {/* Pin UTC: toLocaleDateString otherwise renders the
                        server's TZ during SSR and the browser's on hydration
                        — a mismatch near midnight. */}
                    {new Date(r().timestamp).toLocaleDateString(locale(), {
                      timeZone: 'UTC'
                    })}
                  </Chip>
                  <ShareBar />
                </div>
                <p class='mt-8 text-sm font-medium uppercase tracking-widest text-default-500'>
                  {t('results.heroEyebrow')}
                </p>
                <h1
                  class={title({
                    color: 'violet',
                    size: 'lg',
                    fullWidth: true,
                    class: 'mt-2'
                  })}
                >
                  {r().typology.type}
                </h1>
                <div class='mt-4 flex flex-wrap justify-center gap-2'>
                  <Chip color='secondary'>
                    {t('typology.roleLabel')}: {t(ROLE_KEYS[r().typology.role])}
                  </Chip>
                  <Chip>
                    {t('typology.strategyLabel')}:{' '}
                    {t(STRATEGY_KEYS[r().typology.strategy])}
                  </Chip>
                </div>
                <Show when={r().typology.borderline}>
                  <p class='mx-auto mt-3 max-w-xl text-sm text-warning-600 dark:text-warning'>
                    {t('typology.borderlineNote', {
                      radius: r().typology.meta.borderlineRadius
                    })}
                  </p>
                </Show>
              </div>
            </section>

            {/* ── Save banner ─────────────────────────────────────── */}
            <Alert color='warning' class='mt-6'>
              <p class='text-center'>
                <strong>{t('results.important')}</strong>{' '}
                {t('results.saveResults')}{' '}
                <A
                  class='text-primary underline'
                  href={localePath(locale(), `/compare?id=${r().id}`)}
                >
                  {t('results.compare')}
                </A>{' '}
                {t('results.toOthers')}
              </p>
              <div class='mt-2 flex justify-center'>
                <Snippet
                  text={r().id}
                  class='w-full justify-center text-base'
                />
              </div>
            </Alert>

            {/* ── Big Five overview ───────────────────────────────── */}
            <section class='mt-12'>
              <h2 class='text-center text-2xl font-bold'>
                {t('results.theBigFive')}
              </h2>
              <div class='mt-4 flex justify-end print:hidden'>
                <div
                  role='group'
                  aria-label={t('results.modeLabel')}
                  class='inline-flex rounded-full border border-divider bg-content1 p-1 text-sm'
                >
                  <For each={['simple', 'advanced'] as const}>
                    {(mode) => (
                      <button
                        type='button'
                        aria-pressed={detailMode() === mode}
                        class={clsx(
                          'cursor-pointer rounded-full px-3 py-1 transition-colors',
                          detailMode() === mode
                            ? 'bg-foreground text-background'
                            : 'text-default-500 hover:text-foreground'
                        )}
                        onClick={() => chooseDetailMode(mode)}
                      >
                        {t(
                          mode === 'simple'
                            ? 'results.modeSimple'
                            : 'results.modeAdvanced'
                        )}
                      </button>
                    )}
                  </For>
                </div>
              </div>
              <div class='mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5'>
                <For each={results()}>
                  {(domain) => {
                    const accent = () =>
                      DOMAIN_ACCENTS[domain.domain as DomainCode];
                    const score = () =>
                      r().assessment.domains[domain.domain as DomainCode];
                    const percentile = () => Math.round(score().percentile);
                    return (
                      <a
                        href={`#${domain.domain}`}
                        onClick={(event) =>
                          focusDomain(domain.domain, event)
                        }
                        class='group rounded-2xl border border-divider bg-content1 p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg'
                      >
                        <div class='flex items-center gap-2.5'>
                          <span
                            aria-hidden
                            class='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-white'
                            style={{ 'background-color': accent().hex }}
                          >
                            {domain.domain}
                          </span>
                          <span class='min-w-0 hyphens-auto break-words text-sm font-semibold leading-tight'>
                            {domain.title}
                          </span>
                        </div>
                        <div class='mt-4 flex items-baseline gap-1.5'>
                          <span class='text-3xl font-extrabold tabular-nums'>
                            {percentile()}
                          </span>
                          <Show when={detailMode() === 'advanced'}>
                            <span class='text-xs text-default-500'>
                              {t('results.percentileLabel')}
                            </span>
                          </Show>
                        </div>
                        <Meter
                          class='mt-2'
                          value={percentile()}
                          hex={accent().hex}
                          label={t('typology.percentileAria', {
                            label: domain.title,
                            percentile: percentile()
                          })}
                        />
                        <p class='mt-2 text-xs text-default-500'>
                          {detailMode() === 'advanced'
                            ? t('results.rawScore', {
                                score: score().raw,
                                max: 120
                              })
                            : t('results.higherThan', {
                                percentile: percentile()
                              })}
                        </p>
                        <div class='mt-2'>
                          <Chip>{t(BAND_KEYS[score().band])}</Chip>
                        </div>
                      </a>
                    );
                  }}
                </For>
              </div>
              <div class='mt-6 rounded-3xl border border-divider bg-content1 p-4 sm:p-6'>
                <BarChart max={120} results={results()} />
                <NormGroup
                  meta={r().assessment.meta}
                  overridden={normOverridden()}
                  onChange={setNormGroup}
                  onReset={resetNormGroup}
                />
              </div>
            </section>

            <TypologyView typology={r().typology} />
            <CompositesView composites={r().composites} />
            <DomainTabs
              domains={results()}
              assessment={r().assessment}
              showExpanded={showExpanded()}
              active={activeDomain}
              setActive={setActiveDomain}
              mode={detailMode}
            />
          </>
        )}
      </Show>
    </main>
  );
}
