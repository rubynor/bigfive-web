// Survey state machine (Phase 4 step 5), ported from the reference fork's
// Next.js survey.tsx to Solid signals. Flow: optional demographics card on the
// first page (decision #5: Skip exists and shows an accuracy warning;
// skipping → combined norms at read time) → 120 Likert items (auto-advance on
// mobile single-column) → saveTestAction → redirect to /result/[id].
// Progress survives reloads via localStorage ('inProgress' + 'b5data').

import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show
} from 'solid-js';
import { useAction, useNavigate } from '@solidjs/router';
import type { Question } from '@bigfive-org/questions';
import type { Answer, SaveTestInput } from '@bigfive-org/data';
import type { AgeBracket, Demographics, Sex } from '@bigfive-org/score';
import { saveTestAction } from '~/lib/actions';
import { localePath } from '~/lib/i18n/nav';
import { useI18n } from '~/lib/i18n';
import { Alert, Button, card } from '~/components/ui';
import { RadioCards } from '~/components/ui/radio';
import { ProgressBar } from '~/components/ui/overlays';
import { CloseIcon } from '~/components/icons';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function formatTimer(seconds: number): string {
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`;
}

// 'skip' is an explicit UI choice (shows the accuracy warning); '' means the
// card was never touched (no warning). Both persist as absent demographics.
type DemographicChoice = '' | 'skip';
type SexChoice = Sex | DemographicChoice;
type AgeChoice = AgeBracket | DemographicChoice;

export function Survey(props: { questions: Question[]; language: string }) {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  // Router actions must be bound with useAction at render time — calling the
  // raw action() from an event handler throws (no router context there).
  const saveTest = useAction(saveTestAction);

  const [currentQuestionIndex, setCurrentQuestionIndex] = createSignal(0);
  const [questionsPerPage, setQuestionsPerPage] = createSignal(1);
  const [answers, setAnswers] = createSignal<Answer[]>([]);
  const [sexChoice, setSexChoice] = createSignal<SexChoice>('');
  const [ageChoice, setAgeChoice] = createSignal<AgeChoice>('');
  const [loading, setLoading] = createSignal(false);
  const [failed, setFailed] = createSignal(false);
  const [restored, setRestored] = createSignal(false);
  const [autoAdvancing, setAutoAdvancing] = createSignal(false);
  const [seconds, setSeconds] = createSignal(0);

  const demographics = (): Demographics => {
    const d: Demographics = {};
    const sex = sexChoice();
    const age = ageChoice();
    if (sex === 'male' || sex === 'female') d.sex = sex;
    if (age !== '' && age !== 'skip') d.ageBracket = age;
    return d;
  };

  const persist = (nextAnswers: Answer[], nextIndex: number) => {
    localStorage.setItem('inProgress', 'true');
    localStorage.setItem(
      'b5data',
      JSON.stringify({
        answers: nextAnswers,
        currentQuestionIndex: nextIndex,
        demographics: demographics()
      })
    );
  };

  onMount(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    onCleanup(() => clearInterval(timer));

    const handleResize = () =>
      setQuestionsPerPage(window.innerWidth > 768 ? 3 : 1);
    handleResize();
    window.addEventListener('resize', handleResize);
    onCleanup(() => window.removeEventListener('resize', handleResize));

    if (localStorage.getItem('inProgress')) {
      const data = localStorage.getItem('b5data');
      if (data) {
        try {
          const parsed = JSON.parse(data) as {
            answers?: Answer[];
            currentQuestionIndex?: number;
            demographics?: Demographics;
          };
          setAnswers(parsed.answers ?? []);
          setCurrentQuestionIndex(parsed.currentQuestionIndex ?? 0);
          if (parsed.demographics?.sex) setSexChoice(parsed.demographics.sex);
          if (parsed.demographics?.ageBracket)
            setAgeChoice(parsed.demographics.ageBracket);
          setRestored(true);
        } catch {
          localStorage.removeItem('inProgress');
          localStorage.removeItem('b5data');
        }
      }
    }
  });

  // Persist demographics selections too: choosing sex/age already starts the
  // session, and they restore together with the answers.
  createEffect(() => {
    const sex = sexChoice();
    const age = ageChoice();
    if (sex !== '' || age !== '' || localStorage.getItem('inProgress')) {
      persist(answers(), currentQuestionIndex());
    }
  });

  const currentQuestions = createMemo(() =>
    props.questions.slice(
      currentQuestionIndex(),
      currentQuestionIndex() + questionsPerPage()
    )
  );

  const isTestDone = () => props.questions.length === answers().length;

  const progress = () =>
    Math.round((answers().length / props.questions.length) * 100);

  const nextDisabled = () =>
    autoAdvancing() ||
    currentQuestionIndex() + questionsPerPage() > answers().length ||
    (isTestDone() &&
      currentQuestionIndex() === props.questions.length - questionsPerPage()) ||
    loading();

  const backDisabled = () => currentQuestionIndex() === 0 || loading();

  async function handleAnswer(id: string, value: string) {
    const question = props.questions.find((q) => q.id === id);
    if (!question) return;

    const previousLatestId = answers().at(-1)?.id;
    const nextAnswers = [
      ...answers().filter((a) => a.id !== id),
      { id, score: Number(value), domain: question.domain, facet: question.facet }
    ];
    setAnswers(nextAnswers);
    persist(nextAnswers, currentQuestionIndex());

    // Auto-advance on single-column (mobile) after a fresh answer; changing a
    // previous answer (it was the latest one) stays put.
    if (
      questionsPerPage() === 1 &&
      props.questions.length !== nextAnswers.length &&
      id !== previousLatestId
    ) {
      setAutoAdvancing(true);
      await sleep(700);
      setCurrentQuestionIndex((i) => i + 1);
      window.scrollTo(0, 0);
      setAutoAdvancing(false);
    }
  }

  function handlePrevious() {
    setCurrentQuestionIndex((i) => i - questionsPerPage());
    window.scrollTo(0, 0);
  }

  function handleNext() {
    if (autoAdvancing()) return;
    setCurrentQuestionIndex((i) => i + questionsPerPage());
    window.scrollTo(0, 0);
    if (restored()) setRestored(false);
  }

  function clearProgress() {
    localStorage.removeItem('inProgress');
    localStorage.removeItem('b5data');
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setSexChoice('');
    setAgeChoice('');
    setRestored(false);
    window.scrollTo(0, 0);
  }

  async function submitTest() {
    setLoading(true);
    setFailed(false);
    try {
      const d = demographics();
      const input: SaveTestInput = {
        lang: props.language,
        answers: answers(),
        ...(Object.keys(d).length > 0 ? { demographics: d } : {})
      };
      const result = await saveTest(input);
      localStorage.removeItem('inProgress');
      localStorage.removeItem('b5data');
      localStorage.setItem('resultId', result.id);
      navigate(localePath(locale(), `/result/${result.id}`));
    } catch (error) {
      // Surface the cause in the console — the alert itself stays generic.
      console.error('saveTest failed:', error);
      setFailed(true);
      setLoading(false);
    }
  }

  // Dev-only: random-fill all but the last item to test the submit flow.
  function skipToEnd() {
    const randomAnswers = props.questions
      .slice(0, props.questions.length - 1)
      .map((q) => ({
        id: q.id,
        score: Math.floor(Math.random() * 5) + 1,
        domain: q.domain,
        facet: q.facet
      }));
    setAnswers(randomAnswers);
    setCurrentQuestionIndex(props.questions.length - 1);
  }

  const answerFor = (id: string) =>
    answers()
      .find((a) => a.id === id)
      ?.score.toString();

  const likertOptions = (question: Question) =>
    question.choices.map((choice) => ({
      value: choice.score.toString(),
      label: choice.text
    }));

  const skipWarningShown = () => sexChoice() === 'skip' || ageChoice() === 'skip';

  return (
    <div class='mt-2'>
      <div class='flex items-center gap-4'>
        <ProgressBar
          value={progress()}
          label={formatTimer(seconds())}
          class='flex-1'
        />
        <span class='text-sm text-default-500'>{progress()}%</span>
      </div>

      <Show when={currentQuestionIndex() === 0}>
        <div class={card({ class: 'mt-4 flex flex-col gap-4' })}>
          <div>
            <p class='font-semibold'>{t('test.demographics.title')}</p>
            <p class='text-sm text-default-500'>
              {t('test.demographics.description')}
            </p>
          </div>
          <div class='flex flex-col gap-4 sm:flex-row sm:gap-8'>
            <fieldset>
              <legend class='mb-2 text-sm font-medium'>
                {t('test.demographics.sex')}
              </legend>
              <RadioCards
                name='sex'
                value={sexChoice()}
                onChange={(v) => setSexChoice(v as SexChoice)}
                options={[
                  { value: 'male', label: t('test.demographics.male') },
                  { value: 'female', label: t('test.demographics.female') },
                  {
                    value: 'skip',
                    label: t('test.demographics.preferNotToSay')
                  }
                ]}
              />
            </fieldset>
            <fieldset>
              <legend class='mb-2 text-sm font-medium'>
                {t('test.demographics.age')}
              </legend>
              <RadioCards
                name='age'
                value={ageChoice()}
                onChange={(v) => setAgeChoice(v as AgeChoice)}
                options={[
                  { value: 'lt21', label: t('test.demographics.under21') },
                  { value: 'a21_40', label: t('test.demographics.age21to40') },
                  { value: 'a41_60', label: t('test.demographics.age41to60') },
                  { value: 'gt60', label: t('test.demographics.over60') },
                  {
                    value: 'skip',
                    label: t('test.demographics.preferNotToSay')
                  }
                ]}
              />
            </fieldset>
          </div>
          <div>
            <Button
              variant='ghost'
              color='default'
              size='sm'
              onClick={() => {
                setSexChoice('skip');
                setAgeChoice('skip');
              }}
            >
              {t('test.demographics.skip')}
            </Button>
          </div>
          <Show when={skipWarningShown()}>
            <Alert color='warning'>{t('test.demographics.skipWarning')}</Alert>
          </Show>
        </div>
      </Show>

      <Show when={restored()}>
        <Alert color='warning' class='mt-4 flex items-center justify-between'>
          <p>
            {t('test.restored.message')}{' '}
            <button
              type='button'
              class='cursor-pointer underline'
              onClick={clearProgress}
            >
              {t('test.restored.startNew')}
            </button>
          </p>
          <button
            type='button'
            aria-label='Close'
            class='cursor-pointer'
            onClick={() => setRestored(false)}
          >
            <CloseIcon size={18} />
          </button>
        </Alert>
      </Show>

      <Show when={failed()}>
        <Alert color='danger' class='mt-4'>
          {t('test.saveError')}
        </Alert>
      </Show>

      <For each={currentQuestions()}>
        {(question) => (
          <div>
            <h2 class='my-4 text-2xl'>{question.text}</h2>
            <RadioCards
              name={`q${question.num}`}
              options={likertOptions(question)}
              value={answerFor(question.id)}
              onChange={(value) => void handleAnswer(question.id, value)}
              aria-label={question.text}
            />
          </div>
        )}
      </For>

      <div class='my-12 inline-flex space-x-4'>
        <Button color='primary' disabled={backDisabled()} onClick={handlePrevious}>
          {t('test.back').toUpperCase()}
        </Button>
        <Button color='primary' disabled={nextDisabled()} onClick={handleNext}>
          {t('test.next').toUpperCase()}
        </Button>
        <Show when={isTestDone()}>
          <Button color='secondary' disabled={loading()} onClick={submitTest}>
            {t('test.seeResults').toUpperCase()}
          </Button>
        </Show>
        <Show when={import.meta.env.DEV && !isTestDone()}>
          <Button color='default' variant='bordered' onClick={skipToEnd}>
            {t('test.devSkip')}
          </Button>
        </Show>
      </div>
    </div>
  );
}
