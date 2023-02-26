/* eslint-disable react/prop-types,react/no-children-prop */
import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import raw from 'raw.macro';
import Main from '../layouts/Main';

const markdown = raw('../data/about.md');

const count = markdown.split(/\s+/)
  .map((s) => s.replace(/\W/g, ''))
  .filter((s) => s.length).length;

const LinkRenderer = (props) => (
  <a href={props.href} target="_blank" rel="noreferrer">
    {props.children}
  </a>
);

const About = () => (
  <Main title="About"
        description="Learn about David Sass">
    <article className="post markdown" id="about">
      <header>
        <div className="title">
          <h2 data-testid="heading"><Link to="/about">About Me</Link></h2>
          <p>(in about {count} words)</p>
        </div>
      </header>
      <ReactMarkdown children={markdown}
                     components={{
                       a: LinkRenderer,
                     }} />
    </article>
  </Main>
);

export default About;
