import type { Metadata } from 'next';
import { Raleway, Source_Sans_3 } from 'next/font/google';
import React from 'react';

import GoogleAnalytics from '@/components/template/GoogleAnalytics';
import Navigation from '@/components/template/Navigation';
import '@/assets/scss/main.scss';

import { ThemeProvider } from 'next-themes';

const sourceSans = Source_Sans_3({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
});

const raleway = Raleway({
  weight: ['400', '800', '900'],
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'David Sass-Kovacs',
    template: '%s | David Sass-Kovacs',
  },
  description: "David Sass-Kovacs's personal website.",
  keywords: ['David Sass-Kovacs', 'DevOps', 'Engineer', 'DevOps Engineer'],
  authors: [{ name: 'David Sass-Kovacs' }],
  creator: 'David Sass-Kovacs',
  metadataBase: new URL('https://davidsass.eu'),
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    url: 'https://davidsass.eu',
    siteName: 'David Sass-Kovacs',
    title: 'David Sass-Kovacs',
    description: "David Sass-Kovacs's personal website.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
    <html
      lang="en"
      className={`${sourceSans.variable} ${raleway.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableColorScheme
          enableSystem={false}
        >
          <div id="wrapper">
            <Navigation />
            {children}
          </div>
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
