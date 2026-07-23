// /faq (Phase 4 step 7), ported from the fork's faq page. Prose is
// English-only here, matching upstream/fork; the contact address uses the
// deployment's supportEmail.

import { Title } from '@solidjs/meta';
import { title } from '~/components/primitives';
import { FaqAccordion, type AccordionEntry } from '~/components/ui/overlays';
import { supportEmail } from '~/config/site';

export default function FaqPage() {
  const items = (): AccordionEntry[] => [
    {
      value: 'error',
      title: 'I got an error on this website',
      content: () => (
        <>Submit an issue at GitHub or send us an e-mail at {supportEmail}</>
      )
    },
    {
      value: 'code-commercial',
      title: 'Can I use the code for this website for Commercial Purposes?',
      content: () => <>Yes, this project is licensed under the MIT license.</>
    },
    {
      value: 'questions-commercial',
      title: 'Can I use the questions for Commercial Purposes?',
      content: () => (
        <>
          Yes, the questions and translations are licensed under the MIT
          license.
        </>
      )
    },
    {
      value: 'print',
      title: 'How do I print my test results?',
      content: () => (
        <>
          Try to print the results-page from your browser or save it as a
          PDF-document and print that instead.
        </>
      )
    },
    {
      value: 'translate-questions',
      title: 'I want to translate the questions to my language',
      content: () => (
        <>
          Use{' '}
          <a
            class='text-primary underline'
            href='https://b5.translations.alheimsins.net/'
            rel='noreferrer'
            target='_blank'
          >
            this website
          </a>{' '}
          to translate the questions, or open a pull request on GitHub. Send the
          result to {supportEmail} and tell us which language you have
          translated.
        </>
      )
    },
    {
      value: 'translate-results',
      title: 'I want to translate the result text to my language',
      content: () => (
        <>
          The result texts live in the repository under packages/results —
          translations are contributed via GitHub pull requests.
        </>
      )
    },
    {
      value: 'more-info',
      title:
        'Where can I find more information about the questions and the evaluation?',
      content: () => (
        <>
          See the{' '}
          <a
            class='text-primary underline'
            href='https://ipip.ori.org'
            rel='noopener noreferrer'
            target='_blank'
          >
            IPIP Website
          </a>{' '}
          for more information.
        </>
      )
    },
    {
      value: 'questions-location',
      title: 'Where can I find the questions?',
      content: () => (
        <>
          All questions and translations are in the repository under
          packages/questions. The questions and scoring are taken from
          ipip.ori.org.
        </>
      )
    },
    {
      value: 'code-location',
      title: 'Where can I find the code?',
      content: () => <>The code is found on GitHub (link in the footer).</>
    }
  ];

  return (
    <main class='mx-auto w-full max-w-3xl px-4 py-10'>
      <Title>FAQ</Title>
      <h1 class={title()}>Frequently asked questions.</h1>
      <div class='mt-10'>
        <FaqAccordion items={items()} />
      </div>
    </main>
  );
}
