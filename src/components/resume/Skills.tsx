'use client';

import React, { useReducer } from 'react';
import CategoryButton from '@/components/resume/skills/CategoryButton';
import SkillBar from '@/components/resume/skills/SkillBar';
import { CategoryProps, SkillProps } from '@/lib/types';

// React 19: Using useReducer for complex filter state management
type ButtonState = Record<string, boolean>;

type ButtonAction = {
  type: 'TOGGLE_CATEGORY';
  label: string;
};

const buttonReducer = (
  state: ButtonState,
  action: ButtonAction,
): ButtonState => {
  switch (action.type) {
    case 'TOGGLE_CATEGORY': {
      // Toggle button that was clicked. Turn all other buttons off.
      const newButtons = Object.keys(state).reduce(
        (obj, key) => ({
          ...obj,
          [key]: action.label === key && !state[key],
        }),
        {} as ButtonState,
      );
      // Turn on 'All' button if other buttons are off
      newButtons.All = !Object.keys(state).some((key) => newButtons[key]);
      return newButtons;
    }
    default:
      return state;
  }
};

const Skills = ({
  skills = [],
  categories = [],
}: {
  skills: SkillProps[];
  categories: CategoryProps[];
}) => {
  const initialButtons = Object.fromEntries(
    [['All', false]].concat(categories.map(({ name }) => [name, false])),
  );

  const [buttons, dispatch] = useReducer(buttonReducer, initialButtons);

  const handleChildClick = (label: string) => {
    dispatch({ type: 'TOGGLE_CATEGORY', label });
  };

  const getRows = () => {
    const actCat = Object.keys(buttons).reduce(
      (cat, key) => (buttons[key] ? key : cat),
      'All',
    );

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
      .filter((skill) => actCat === 'All' || skill.category.includes(actCat))
      .map((skill) => (
        <SkillBar key={skill.title} categories={categories} skill={skill} />
      ));
  };

  const getButtons = () =>
    Object.keys(buttons).map((key) => (
      <CategoryButton
        key={key}
        label={key}
        active={buttons}
        handleClick={handleChildClick}
      />
    ));

  return (
    <div className="skills">
      <div className="link-to" id="skills" />
      <div className="title">
        <h3>Skills</h3>
        <p>
          Note: While I don&apos;t find these sections particularly necessary,
          it seems like a common addition to resumes. Below is an overview of my
          skills, with an attempt at honesty.
        </p>
      </div>
      <div className="skill-button-container">{getButtons()}</div>
      <div className="skill-row-container">{getRows()}</div>
    </div>
  );
};

export default Skills;
