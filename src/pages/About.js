import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import Main from '../layouts/Main';

const LinkRenderer = ({ ...props }) => (
  /* eslint-disable react/prop-types */
  <Link {...props} to={props.href} target="_blank" rel="nofollow noopener noreferrer" />
);

const About = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    import('../data/about.md')
      .then((res) => {
        fetch(res.default)
          .then((r) => r.text())
          .then(setMarkdown);
      }).catch(console.error);
  });

  const count = markdown.split(/\s+/)
    .map((s) => s.replace(/\W/g, ''))
    .filter((s) => s.length).length;

  return (
    <Main title="About"
          description="Learn about David Sass">
      <article className="post markdown" id="about">
        <header>
          <div className="title">
            <h2><Link to="/about">About Me</Link></h2>
            <p>(in about {count} words)</p>
          </div>
        </header>
        <Markdown options={{
          overrides: {
            a: {
              component: LinkRenderer,
            },
          },
        }}>
          {markdown}
        </Markdown>
      </article>
    </Main>
  );
};

export default About;
