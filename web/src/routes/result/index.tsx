// /result — recover a result by pasting its ID (or a full result URL).
// Ported from the fork's get-result page. Accepts every id scheme this space
// has ever used (ObjectId, UUID, nanoid) via @bigfive-org/data/result-id; a
// previous result saved in localStorage by the test flow gets a shortcut link.

import { Title } from '@solidjs/meta';
import { useNavigate, A } from '@solidjs/router';
import { createMemo, createSignal, onMount, Show } from 'solid-js';
import { formatAndValidateId, formatId } from '@bigfive-org/data/result-id';
import { ResultIcon } from '~/components/icons';
import { Button } from '~/components/ui';
import { subtitle, title } from '~/components/primitives';
import { useI18n } from '~/lib/i18n';
import { localePath } from '~/lib/i18n/nav';

export default function GetResultPage() {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const [id, setId] = createSignal('');
  const [previousId, setPreviousId] = createSignal<string | null>(null);

  onMount(() => {
    setPreviousId(localStorage.getItem('resultId'));
  });

  const isInvalid = createMemo(
    () => id() !== '' && !formatAndValidateId(id())
  );

  const submit = () => {
    if (!formatAndValidateId(id())) return;
    navigate(localePath(locale(), `/result/${formatId(id())}`));
  };

  return (
    <main class='mx-auto flex h-[60vh] w-full max-w-2xl flex-col px-4 py-10'>
      <Title>{t('getResult.result')}</Title>
      <h1 class={title()}>{t('getResult.result')}</h1>
      <p class={subtitle()}>{t('getResult.explanation')}</p>
      <form
        class='mt-6 flex flex-col gap-4'
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label class='flex flex-col gap-1 text-sm font-medium'>
          ID
          <div class='relative'>
            <span class='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-default-400'>
              <ResultIcon size={20} />
            </span>
            <input
              type='text'
              class='w-full rounded-lg border border-divider bg-content1 py-2 pl-10 pr-3 font-mono text-sm outline-none focus:border-primary'
              placeholder='58a70606a835c400c8b38e84'
              value={id()}
              onInput={(e) => setId(e.currentTarget.value)}
              aria-invalid={isInvalid()}
              autofocus
            />
          </div>
          <Show when={isInvalid()}>
            <span class='text-xs text-danger'>{t('getResult.invalidId')}</span>
          </Show>
        </label>
        <div class='flex items-center gap-3'>
          <Show when={previousId()}>
            {(prev) => (
              <A
                href={localePath(locale(), `/result/${prev()}`)}
                class='text-sm text-danger underline underline-offset-4 hover:opacity-80'
              >
                {t('getResult.viewPrevious')}
              </A>
            )}
          </Show>
          <Button
            type='submit'
            color='primary'
            size='lg'
            disabled={id() === '' || isInvalid()}
          >
            {t('getResult.getResult')}
          </Button>
        </div>
      </form>
    </main>
  );
}
