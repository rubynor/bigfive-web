import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import { fontSans } from '@/config/fonts';
import { Providers } from '../providers';
import { Navbar } from '@/components/navbar';
import clsx from 'clsx';
import Footer from '@/components/footer';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { GoogleAnalytics } from '@next/third-parties/google';
import { basePath, getNavItems, locales, siteConfig } from '@/config/site';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/react';
import useTextDirection from '@/hooks/use-text-direction';
import Script from 'next/script';
import CookieBanner from '@/components/cookie-consent';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'frontpage' });
  const s = await getTranslations({ locale, namespace: 'seo' });
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });
  const alternatesLang = locales.reduce((a, v) => ({ ...a, [v]: `/${v}` }), {});
  return {
    title: {
      default: t('seo.title'),
      template: `%s - ${t('seo.title')}`
    },
    description: t('seo.description'),
    keywords: s('keywords'),
    authors: [{ name: 'Jonas Enge', url: 'https://bigfive-test.com' }],
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png'
    },
    metadataBase: new URL('https://bigfive-test.com'),
    // alternates: {
    //   canonical: '/',
    //   languages: alternatesLang
    // },
    openGraph: {
      type: 'website',
      url: basePath,
      title: t('seo.title'),
      description: t('seo.description'),
      images: {
        url: `${basePath}/og-image.png`,
        alt: tMeta('ogImageAlt')
      }
    },
    twitter: {
      title: t('seo.title'),
      card: 'summary_large_image',
      description: t('seo.description'),
      site: basePath,
      creator: siteConfig.creator,
      images: {
        url: `${basePath}/og-image.png`,
        alt: tMeta('twitterImageAlt')
      }
    }
  };
}
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const gaId = process.env.NEXT_PUBLIC_ANALYTICS_ID || '';
  unstable_setRequestLocale(locale);
  const direction = useTextDirection(locale);

  const navItems = await getNavItems({ locale, linkType: 'navItems' });
  const navMenuItems = await getNavItems({ locale, linkType: 'navMenuItems' });
  const footerLinks = await getNavItems({ locale, linkType: 'footerLinks' });

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers
          themeProps={
            { attribute: 'class', defaultTheme: 'light' } as ThemeProviderProps
          }
        >
          <div className='relative flex flex-col h-screen'>
            <Navbar navItems={navItems} navMenuItems={navMenuItems} />
            <main className='container mx-auto max-w-7xl pt-16 px-6 flex-grow'>
              {children}
              <CookieBanner />
            </main>
            <Footer footerLinks={footerLinks} />
          </div>
        </Providers>
        <Script
          src='https://bigfive-test.com/sw.js'
          strategy='beforeInteractive'
        />
        <Analytics />
      </body>
      <GoogleAnalytics gaId={gaId} />
    </html>
  );
}
