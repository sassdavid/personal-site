import React from 'react';
import { Link } from 'react-router-dom';
import ThemeBtn from './ThemeButton';
import ContactIcons from '../Contact/ContactIcons';
import '../../static/css/main.scss';

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
      <p>
        As a highly skilled and experienced Staff Software Engineer
        with a degree in Computer Engineering, I am passionate about utilizing my technical
        expertise to develop innovative solutions and drive impactful outcomes. Currently,
        I am thriving in my role at <a href="https://www.loxon.eu/" target="_blank" rel="noreferrer">Loxon Solutions</a>, where I have the opportunity to tackle
        complex challenges and contribute to cutting-edge software development projects.
        My commitment to excellence and dedication to staying up-to-date with the latest
        industry advancements has enabled me to achieve significant success in my career,
        and I am excited to continue building on this momentum in future endeavors.
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
