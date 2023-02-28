import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../layouts/Main';
import Education from '../components/Resume/Education';
import Experience from '../components/Resume/Experience';
import Tools from '../components/Resume/Tools';
import References from '../components/Resume/References';
import tools from '../data/resume/tools';
import degrees from '../data/resume/degrees';
import positions from '../data/resume/positions';
import { categories, skills } from '../data/resume/skills';
import Skills from '../components/Resume/Skills';

const sections = [
  'Education',
  'Experience',
  'Skills',
  'Tools',
  'References',
];

const Resume = () => (
  <Main title="Resume"
        description="David Sass's Resume. Currently at Loxon.">
    <article className="post" id="resume">
      <header>
        <div className="title">
          <h2 data-testid="heading"><Link to="/resume">Resume</Link></h2>
          <div className="link-container">
            {sections.map((sec) => (
              <h4 key={sec}>
                <a href={`#${sec.toLowerCase()}`}>{sec}</a>
              </h4>))}
          </div>
        </div>
      </header>
      <Experience data={positions} />
      <Education data={degrees} />
      <Skills skills={skills} categories={categories} />
      <Tools data={tools} />
      <References />
    </article>
  </Main>
);

export default Resume;
