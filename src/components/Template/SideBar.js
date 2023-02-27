import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import dynamic from 'next/dynamic';
import ContactIcons from '../Contact/ContactIcons';
import Greetings from '../SideBar/Greetings';
import '../../static/css/main.scss';

const ThemeBtn = dynamic(
  (() => import('./ThemeButton').then(({ ThemeButton }) => ThemeButton)),
  { ssr: false },
);

const { PUBLIC_URL } = process.env;

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/me.jpg`} alt="" />
      </Link>
      <header>
        <h2>David Sass</h2>
        <p><a href="mailto:david.sass14@gmail.com">david.sass14@gmail.com</a></p>
      </header>
      <div>
        <ThemeBtn /><br />
        <p className="secret">
          I also hate burning my eyes out!
        </p>
      </div>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p><Greetings loopMessage /> I like building things.
        I have a degree in computer engineering, and I&apos;m currently working at
        <a href="https://www.loxon.eu/" target="_blank" rel="noreferrer"> Loxon Solutions</a>.
      </p>
      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume') ? <Link to="/resume" className="button">Learn More</Link>
            : <Link to="/about" className="button">About Me</Link>}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">&copy; David Sass <Link to="/">davidsass.eu</Link>.</p>
    </section>
  </section>
);

export default SideBar;
