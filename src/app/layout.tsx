import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { siteConfig } from '@/app/page';
import { config } from '@/lib/config';
import '@/assets/scss/main.scss';

export const metadata: Metadata = {
  metadataBase: new URL('https://davidsass.eu'),
  title: {
    default: siteConfig.name,
    template: `${siteConfig.name} | %s`,
  },
  description: siteConfig.description,
  authors: [
    {
      name: 'David Sass',
      url: 'https://github.com/sassdavid',
    },
  ],
  creator: 'David Sass',

  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: 'David Sass',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableColorScheme
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
      {config.gaId && <GoogleAnalytics gaId={config.gaId} />}
    </html>
  );
}
