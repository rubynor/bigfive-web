import { MetaProvider, Title } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import { I18nProvider } from '~/lib/i18n';
import { Navbar } from '~/components/navbar';
import { Footer } from '~/components/footer';
import '@fontsource-variable/inter';
import '@fontsource-variable/fira-code';
import './app.css';

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <I18nProvider>
            <Title>Big Five Personality Test</Title>
            <div class='relative flex min-h-screen flex-col'>
              <Navbar />
              <div class='flex-1'>
                <Suspense>{props.children}</Suspense>
              </div>
              <Footer />
            </div>
          </I18nProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
