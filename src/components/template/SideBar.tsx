'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import ContactIcons from '@/components/contact/ContactIcons';
import ThemeSwitch from '@/components/template/ThemeSwitch';

const SideBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <section id="sidebar">
      <section id="intro">
        <Link href="/" className="logo">
          <Image src="/me.jpg" width={186.66} height={186.66} alt="" />
        </Link>
        <header>
          <h2>David Sass-Kovacs</h2>
          <p>
            <a href="mailto:david.sass14@gmail.com">david.sass14@gmail.com</a>
          </p>
        </header>
        <div>
          <ThemeSwitch />
          <br />
          <p className="secret">I also hate burning my eyes out!</p>
        </div>
      </section>

      <section className="blurb">
        <h2>About</h2>
        <p>
          DevOps Engineer with a Computer Engineering degree, specializing in
          cloud infrastructure and automation. Currently at{' '}
          <a
            href="https://www.loxon.eu/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Loxon
          </a>
          , building scalable solutions with Kubernetes, AWS, and modern DevOps
          tools. Passionate about optimizing systems and solving complex
          infrastructure challenges.
        </p>
        <ul className="actions">
          <li>
            {pathname && !pathname.includes('/resume') ? (
              <Link href="/resume" className="button">
                Learn More
              </Link>
            ) : (
              <Link href="/about" className="button">
                About Me
              </Link>
            )}
          </li>
        </ul>
      </section>

      <section id="footer">
        <ContactIcons />
        <p className="copyright">
          &copy; David Sass-Kovacs <Link href="/">davidsass.eu</Link>.
        </p>
      </section>
    </section>
  );
};

export default SideBar;
