'use client';

import React, { useState } from 'react';
import CategoryButton from '@/components/resume/skills/CategoryButton';
import SkillBar from '@/components/resume/skills/SkillBar';
import { CategoryProps, SkillProps } from '@/lib/types';

const Skills = ({ skills = [], categories = [] }: { skills: SkillProps[]; categories: CategoryProps[] }) => {
  const initialButtons = Object.fromEntries([['All', false]].concat(categories.map(({ name }) => [name, false])));

  const [buttons, setButtons] = useState<Record<string, boolean>>(initialButtons);

  const handleChildClick = (label: string) => {
    const newButtons = Object.keys(buttons).reduce(
      (obj, key) => ({
        ...obj,
        [key]: label === key && !buttons[key],
      }),
      {} as Record<string, boolean>
    );
    newButtons.All = !Object.keys(buttons).some(key => newButtons[key]);
    setButtons(newButtons);
  };

  const getRows = () => {
    const actCat = Object.keys(buttons).reduce((cat, key) => (buttons[key] ? key : cat), 'All');

    const comparator = (a: SkillProps, b: SkillProps) => {
      let ret = 0;
      if (a.competency > b.competency) ret = -1;
      else if (a.competency < b.competency) ret = 1;
      else if (a.category[0] > b.category[0]) ret = -1;
      else if (a.category[0] < b.category[0]) ret = 1;
      else if (a.title > b.title) ret = 1;
      else if (a.title < b.title) ret = -1;
      return ret;
    };

    return skills
      .sort(comparator)
      .filter(skill => actCat === 'All' || skill.category.includes(actCat))
      .map(skill => <SkillBar key={skill.title} categories={categories} skill={skill} />);
  };

  const getButtons = () => Object.keys(buttons).map(key => <CategoryButton key={key} label={key} active={buttons} handleClick={handleChildClick} />);

  return (
    <div className="skills">
      <div className="link-to" id="skills" />
      <div className="title">
        <h3>Skills</h3>
        <p>
          Note: While I don&apos;t find these sections particularly necessary, it seems like a common addition to resumes. Below is an overview of my
          skills, with an attempt at honesty.
        </p>
      </div>
      <div className="skill-button-container">{getButtons()}</div>
      <div className="skill-row-container">{getRows()}</div>
    </div>
  );
};

export default Skills;
