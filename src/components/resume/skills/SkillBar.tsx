import React from 'react';
import { CategoryProps, SkillProps } from '@/lib/types';

const SkillBar = ({ skill, categories }: { skill: SkillProps; categories: CategoryProps[] }) => {
  const { category, competency, title } = skill;

  const titleStyle = {
    background: categories.filter(cat => category.includes(cat.name)).map(cat => cat.color)[0],
  };

  const barStyle = {
    ...titleStyle,
    width: `${String(Math.min(100, Math.max((competency / 10.0) * 100.0, 0)))}%`,
  };

  return (
    <div className="skillbar clearfix">
      <div className="skillbar-title" style={titleStyle}>
        <span>{title}</span>
      </div>
      <div className="skillbar-bar" style={barStyle} />
      <div className="skill-bar-percent">{competency} / 10</div>
    </div>
  );
};

export default SkillBar;
