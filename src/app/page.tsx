import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

import PageWrapper from '@/app/components/PageWrapper';

export const metadata: Metadata = {
  description: "David Sass-Kovacs's personal website.",
};

export default function HomePage() {
  return (
    <PageWrapper>
      <article className="post" id="index">
        <header>
          <div className="title">
            <h2>
              <Link href="/about">Hi! I&apos;m David</Link>
            </h2>
            <p>
              I build reliable, scalable infrastructure using modern cloud
              technologies and automation. Focused on creating efficient
              workflows that drive technical excellence and operational success.
            </p>
          </div>
        </header>
        <p>
          {' '}
          Welcome to my website. Please feel free to read more{' '}
          <Link href="/about">about me</Link>, or you can check out my{' '}
          <Link href="/resume">resume</Link>,{' '}
          <Link href="/stats">site statistics</Link>, or{' '}
          <Link href="/contact">contact</Link> me.
        </p>
        <p>
          {' '}
          Source available{' '}
          <a href="https://github.com/sassdavid/personal-site">here</a>.
        </p>
      </article>
    </PageWrapper>
  );
}
