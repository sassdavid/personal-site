import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../layouts/Main';
import Education from '../components/Resume/Education';
import Experience from '../components/Resume/Experience';
import Skills from '../components/Resume/Skills';
import References from '../components/Resume/References';
import Tools from '../components/Resume/Tools';
import tools from '../data/resume/tools';
import degrees from '../data/resume/degrees';
import work from '../data/resume/work';
import { categories, skills } from '../data/resume/skills';

const sections = {
  Experience: () => <Experience data={work} />,
  Education: () => <Education data={degrees} />,
  Skills: () => <Skills skills={skills} categories={categories} />,
  Tools: () => <Tools data={tools} />,
  References: () => <References />,
};

const Resume = () => (
  <Main title="Resume"
        description="David Sass's Resume. Currently at Loxon.">
    <article className="post" id="resume">
      <header>
        <div className="title">
          <h2><Link to="/resume">Resume</Link></h2>
          <div className="link-container">
            {Object.keys(sections).map((sec) => (
              <h4 key={sec}>
                <a href={`#${sec.toLowerCase()}`}>{sec}</a>
              </h4>))}
          </div>
        </div>
      </header>
      {Object.entries(sections).map(([name, Section]) => (
        <Section key={name} />
      ))}
    </article>
  </Main>
);

export default Resume;
