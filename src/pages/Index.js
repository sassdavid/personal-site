import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../layouts/Main';

const Index = () => (
  <Main description={"David Sass's personal website."}>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2 data-testid="heading"><Link to="/">Hi! I&apos;m David</Link></h2>
          <p> Welcome to my website. Please feel free to read more <Link to="/about">about me</Link>,
            or you can check out my {' '}
            <Link to="/resume">resume</Link>, {' '} view <Link to="/stats">site statistics</Link>, {' '} or <Link to="/contact">contact</Link> me.
          </p>
        </div>
      </header>
    </article>
  </Main>
);

export default Index;
