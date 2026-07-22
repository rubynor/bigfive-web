import { MetaProvider, Title } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import { I18nProvider } from '~/lib/i18n';
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
            <Suspense>{props.children}</Suspense>
          </I18nProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
