import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import Main from '@/components/main';
import AboutMardown from '@/data/about/about.mdx';
import { config } from '@/lib/config';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about David Sass',
};

function CustomLink({
  href,
  children,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="nofollow noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

const overrideComponents = {
  a: CustomLink,
};

const About = () => {
  return (
    <Main>
      <article className="post markdown" id="about">
        <header>
          <div className="title">
            <h2>
              <Link href="/about">About Me</Link>
            </h2>
            {config.mdxDetailsAbout ? (
              <p>(in about {config.mdxDetailsAbout})</p>
            ) : (
              <p>(No data available)</p>
            )}
          </div>
        </header>
        <AboutMardown components={overrideComponents} />
      </article>
    </Main>
  );
};

export default About;
