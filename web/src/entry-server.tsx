// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';

/**
 * Applies the persisted (or OS-preferred) theme before first paint so a dark
 * preference never flashes light. Kept in sync with src/lib/theme.ts.
 */
const themeInitScript = `try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}`;

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang='en' class='h-full'>
        <head>
          <meta charset='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
          <script innerHTML={themeInitScript} />
          {assets}
        </head>
        <body class='min-h-full bg-background font-sans text-foreground antialiased'>
          <div id='app'>{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
