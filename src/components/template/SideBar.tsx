'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
          As a highly skilled and experienced Staff Software Engineer with a degree in Computer Engineering, I am passionate about utilizing my
          technical expertise to develop innovative solutions and drive impactful outcomes. Currently, I am thriving in my role at{' '}
          <a href="https://www.loxon.eu/" target="_blank" rel="nofollow noopener noreferrer">
            Loxon
          </a>
          , where I have the opportunity to tackle complex challenges and contribute to cutting-edge software development projects. My commitment to
          excellence and dedication to staying up-to-date with the latest industry advancements has enabled me to achieve significant success in my
          career, and I am excited to continue building on this momentum in future endeavors.
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
