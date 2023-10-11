import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../layouts/Main';

const Index = () => (
  <Main description={"David Sass's personal website."}>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2><Link to="/">Hi! I&apos;m David</Link></h2>
          <p>
            As a developer, I&apos;m constantly tinkering with new tools and technologies
            to find better, more efficient ways to build great software.
          </p>
        </div>
      </header>
      <p>
        Welcome to my website! I&apos;m thrilled to have you here.
        Feel free to take a look around and explore the various pages,
        including <Link to="/resume">my resume</Link> and the <Link to="/about">about me</Link> section. You&apos;ll also find
        some interesting <Link to="/stats">statistics</Link> about me and my website.
        If you have any questions or would like to get in touch,
        please don&apos;t hesitate to use the <Link to="/contact">contact</Link> page. Thank you for visiting!
      </p>
    </article>
  </Main>
);

export default Index;
