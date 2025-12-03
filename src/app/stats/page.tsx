import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import PageWrapper from '@/app/components/PageWrapper';
import Personal from '@/components/stats/Personal';
import Site from '@/components/stats/Site';

export const metadata: Metadata = {
  title: 'Stats',
  description: 'Some statistics about David Sass-Kovacs and davidsass.eu',
};

export default function StatsPage() {
  return (
    <PageWrapper>
      <article className="post" id="stats">
        <header>
          <div className="title">
            <h2>
              <Link href="/stats">Stats</Link>
            </h2>
          </div>
        </header>
        <Personal />
        <Site />
      </article>
    </PageWrapper>
  );
}
