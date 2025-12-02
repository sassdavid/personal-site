'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import ContactIcons from '@/components/contact/ContactIcons';
import ThemeSwitch from '@/components/template/ThemeSwitch';
import profilePic from '../../../public/me.jpg';

const SideBar = () => {
  const pathname = usePathname();

  return (
    <section id="sidebar">
      <section id="intro">
        <Link href="/" className="logo">
          <Image src={profilePic} width={186.66} height={186.66} alt="" />
        </Link>
        <header>
          <h2>David Sass</h2>
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
          As a highly skilled and experienced DevOps Engineer with a degree in
          Computer Engineering, I am passionate about leveraging my technical
          expertise to design, optimize, and maintain robust infrastructure
          solutions that drive impactful outcomes. Currently, I am thriving in
          my role at{' '}
          <a
            href="https://www.loxon.eu/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Loxon
          </a>
          , where I tackle complex challenges and contribute to cutting-edge
          infrastructure and deployment projects. My commitment to excellence
          and dedication to staying up-to-date with the latest industry
          advancements have enabled me to achieve significant success in my
          career, and I am excited to continue building on this momentum in
          future endeavors.
        </p>
        <ul className="actions">
          <li>
            {!pathname.includes('/resume') ? (
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
          &copy; David Sass <Link href="/">davidsass.eu</Link>.
        </p>
      </section>
    </section>
  );
};

export default SideBar;
