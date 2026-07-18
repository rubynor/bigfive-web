import { HttpStatusCode } from '@solidjs/start';
import { title, subtitle } from '~/components/primitives';

export default function NotFound() {
  return (
    <main class='flex min-h-screen flex-col items-center justify-center gap-4 p-8'>
      <HttpStatusCode code={404} />
      <h1 class={title()}>404</h1>
      <p class={subtitle({ class: 'text-center md:w-full' })}>
        This page could not be found.
      </p>
      <a href='/' class='text-primary underline'>
        Back to the front page
      </a>
    </main>
  );
}
