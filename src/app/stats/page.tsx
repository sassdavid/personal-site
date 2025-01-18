import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Main from '@/components/main';
import Statistics from '@/components/stats/Statistics';
import personalStats from '@/data/stats/personal';
import gitHubStats from '@/data/stats/github';

export const metadata: Metadata = {
  title: 'Stats',
  description: 'Some statistics about David Sass and davidsass.eu',
};

export default async function Stats() {
  const res = await fetch('https://api.github.com/repos/sassdavid/personal-site');
  const resData = await res.json();

  let mergedGitHubStats = gitHubStats.map(field => ({
    ...field,
    value: field.tableKey && resData[field.tableKey] !== undefined ? resData[field.tableKey] : field.value,
  }));

  return (
    <Main>
      <article className="post" id="stats">
        <header>
          <div className="title">
            <h2>
              <Link href="/stats">Stats</Link>
            </h2>
          </div>
        </header>
        <Statistics title="Some stats about me and my work" data={personalStats} />
        <Statistics title="Some stats about this site" data={mergedGitHubStats} />
      </article>
    </Main>
  );
}
