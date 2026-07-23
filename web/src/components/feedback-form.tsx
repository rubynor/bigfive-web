// Feedback form (Phase 4 step 7), ported from the fork's about/feedback.tsx.
// Posts to saveFeedbackAction (Drizzle feedback table); a chip below the form
// reports success/error.

import { useAction } from '@solidjs/router';
import { createMemo, createSignal, Show } from 'solid-js';
import { Button, Chip } from '~/components/ui';
import { saveFeedbackAction } from '~/lib/actions';
import { useI18n } from '~/lib/i18n';

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const fieldClass =
  'w-full rounded-lg border border-divider bg-content1 px-3 py-2 text-sm outline-hidden focus:border-primary';

export function FeedbackForm() {
  const { t } = useI18n();
  // Bind at render time — calling the raw action() from an event handler
  // throws (no router context there); same fix as the survey submit.
  const saveFeedback = useAction(saveFeedbackAction);
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [message, setMessage] = createSignal('');
  const [pending, setPending] = createSignal(false);
  const [status, setStatus] = createSignal<'success' | 'danger' | null>(null);

  const isInvalidEmail = createMemo(
    () => email() !== '' && !EMAIL_RE.test(email())
  );
  const isInvalidForm = createMemo(
    () =>
      name() === '' || email() === '' || message() === '' || isInvalidEmail()
  );

  const submit = async () => {
    if (isInvalidForm()) return;
    setPending(true);
    setStatus(null);
    try {
      await saveFeedback({
        name: name(),
        email: email(),
        message: message()
      });
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('danger');
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      class='mx-auto mt-10 max-w-2xl'
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div class='flex flex-col gap-4 md:flex-row'>
        <label class='flex flex-1 flex-col gap-1 text-sm font-medium'>
          {t('feedback.name')}
          <input
            type='text'
            class={fieldClass}
            value={name()}
            onInput={(e) => setName(e.currentTarget.value)}
          />
        </label>
        <label class='flex flex-1 flex-col gap-1 text-sm font-medium'>
          {t('feedback.email')}
          <input
            type='email'
            class={fieldClass}
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
            aria-invalid={isInvalidEmail()}
          />
          <Show when={isInvalidEmail()}>
            <span class='text-xs text-danger'>
              {t('feedback.invalidEmail')}
            </span>
          </Show>
        </label>
      </div>
      <label class='mt-4 flex flex-col gap-1 text-sm font-medium'>
        {t('feedback.message')}
        <textarea
          class={fieldClass}
          rows={5}
          placeholder={t('feedback.messagePlaceholder')}
          value={message()}
          onInput={(e) => setMessage(e.currentTarget.value)}
        />
      </label>
      <Button
        type='submit'
        color='primary'
        class='mt-4'
        disabled={isInvalidForm() || pending()}
      >
        {t('feedback.submit')}
      </Button>
      <Show when={status()}>
        {(s) => (
          <div class='mt-4'>
            <Chip color={s() === 'success' ? 'success' : 'danger'}>
              {s() === 'success' ? t('feedback.success') : t('feedback.error')}
            </Chip>
          </div>
        )}
      </Show>
    </form>
  );
}
