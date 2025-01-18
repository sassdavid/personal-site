import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Main from '@/components/main';
import Experience from '@/components/resume/Experience';
import Education from '@/components/resume/Education';
import Skills from '@/components/resume/Skills';
import References from '@/components/resume/References';
import Tools from '@/components/resume/Tools';
import tools from '@/data/resume/tools';
import degrees from '@/data/resume/degrees';
import work from '@/data/resume/work';
import { categories, skills } from '@/data/resume/skills';

export const metadata: Metadata = {
  title: 'Resume',
  description: "David Sass's Resume. Currently at Loxon.",
};

const sections = {
  Experience: () => <Experience data={work} />,
  Education: () => <Education data={degrees} />,
  Skills: () => <Skills skills={skills} categories={categories} />,
  Tools: () => <Tools data={tools} />,
  References: () => <References />,
};

const Resume = () => (
  <Main>
    <article className="post" id="resume">
      <header>
        <div className="title">
          <h2>
            <Link href="/resume">Resume</Link>
          </h2>
          <div className="link-container">
            {Object.keys(sections).map(sec => (
              <h4 key={sec}>
                <a href={`#${sec.toLowerCase()}`}>{sec}</a>
              </h4>
            ))}
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
