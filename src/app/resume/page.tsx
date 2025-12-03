import type { Metadata } from 'next';
import React from 'react';
import Education from '@/components/resume/Education';
import Experience from '@/components/resume/Experience';
import References from '@/components/resume/References';
import Skills from '@/components/resume/Skills';
import Tools from '@/components/resume/Tools';
import degrees from '@/data/resume/degrees';
import { categories, skills } from '@/data/resume/skills';
import tools from '@/data/resume/tools';
import work from '@/data/resume/work';

export const metadata: Metadata = {
  title: 'Resume',
  description: "David Sass-Kovacs's Resume. Currently at Loxon.",
};

const sections = [
  { name: 'Education', id: 'education' },
  { name: 'Experience', id: 'experience' },
  { name: 'Skills', id: 'skills' },
  { name: 'Tools', id: 'tools' },
  { name: 'References', id: 'references' },
];

export default function ResumePage() {
  return (
    <article className="post" id="resume">
      <header>
        <div className="title">
          <h2>Resume</h2>
          <div className="link-container">
            {sections.map((section) => (
              <h4 key={section.id}>
                <a href={`#${section.id}`}>{section.name}</a>
              </h4>
            ))}
          </div>
        </div>
      </header>

      <section id="education" className="education">
        <div className="link-to" />
        <Education data={degrees} />
      </section>

      <section id="experience" className="experience">
        <div className="link-to" />
        <Experience data={work} />
      </section>

      <section id="skills" className="skills">
        <div className="link-to" />
        <Skills skills={skills} categories={categories} />
      </section>

      <section id="tools" className="tools">
        <div className="link-to" />
        <Tools data={tools} />
      </section>

      <section id="references" className="references">
        <div className="link-to" />
        <References />
      </section>
    </article>
  );
}
