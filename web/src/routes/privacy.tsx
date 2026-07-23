// /privacy (Phase 4 step 7). Adapted from the fork's privacy page: the
// Google Analytics and cookie sections are dropped because this deployment
// runs no analytics or tracking cookies — the page must only promise what we
// actually do.

import { Title } from '@solidjs/meta';
import { title } from '~/components/primitives';
import { supportEmail } from '~/config/site';

export default function PrivacyPage() {
  return (
    <main class='mx-auto w-full max-w-3xl px-4 py-10'>
      <Title>Privacy</Title>
      <div class='text-center'>
        <h1 class={title()}>Privacy</h1>
        <h5 class='text-lg text-default-500'>Our privacy policy</h5>
      </div>
      <div class='mt-10 space-y-4'>
        <p>
          This privacy policy explains how we use the personal data we collect
          from you when you use our website.
        </p>
        <h2 class='pt-2 text-xl font-semibold'>What data do we collect?</h2>
        <p>We collect the following data:</p>
        <ul class='list-disc pl-6'>
          <li>Chosen test language</li>
          <li>Test answers</li>
          <li>Date and time of the submitted test</li>
          <li>
            Optionally provided demographics (sex and age bracket), if you
            choose to share them
          </li>
        </ul>
        <p>
          We do not use analytics software and we do not set tracking cookies.
          Test progress is stored only in your own browser (localStorage) so a
          test in progress can survive a reload.
        </p>
        <h2 class='pt-2 text-xl font-semibold'>How do we collect your data?</h2>
        <p>
          When you submit the test, the information you provide (described
          above) is stored in our database. Your web browser also automatically
          sends information to our hosting provider — this can be information
          about which browser and version you are using and your Internet
          address (IP address). For each page that is displayed, the date and
          time, which page you came from, and which page you are on may be
          logged by the hosting provider.
        </p>
        <h2 class='pt-2 text-xl font-semibold'>How will we use your data?</h2>
        <p>
          We create statistical, aggregated data from the test results for
          analytical purposes (for example to improve the norm groups results
          are compared against). Aggregated data cannot be traced back to you.
        </p>
        <h2 class='pt-2 text-xl font-semibold'>How to contact us?</h2>
        <p>
          If you have any questions about this privacy policy, please contact us
          at{' '}
          <a class='text-primary underline' href={`mailto:${supportEmail}`}>
            {supportEmail}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
