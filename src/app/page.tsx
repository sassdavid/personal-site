import React from 'react';
import Link from 'next/link';
import Main from '@/components/main';

export const siteConfig = {
  name: 'David Sass',
  description: "David Sass's personal website.",
  url: 'https://davidsass.eu',
};

const Index = () => (
  <Main>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2>
            <Link href="/">Hi! I&apos;m David</Link>
          </h2>
          <p>
            I&apos;m constantly exploring innovative approaches and emerging technologies to improve system reliability, streamline processes, and
            deliver scalable solutions. My focus is on creating efficient, automated workflows that drive both technical excellence and operational
            success.
          </p>
        </div>
      </header>
      <p>
        Welcome to my website! I&apos;m thrilled to have you here. Feel free to take a look around and explore the various pages, including{' '}
        <Link href="/resume">my resume</Link> and the <Link href="/about">about me</Link> section. You&apos;ll also find some interesting{' '}
        <Link href="/stats">statistics</Link> about me and my website. If you have any questions or would like to get in touch, please don&apos;t
        hesitate to use the <Link href="/contact">contact</Link> page. Thank you for visiting!
      </p>
    </article>
  </Main>
);

export default Index;
