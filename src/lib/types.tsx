import React from 'react';

export type ToolProps = {
  toolName: string;
  link: string;
  last?: boolean;
};

export type JobProps = {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
};

export type DegreeProps = {
  school: string;
  degree: string;
  link: string;
  year: number;
  thesis?: string;
};

export type SkillProps = {
  title: string;
  competency: number;
  category: string[];
};

export type CategoryProps = {
  name: string;
  color: string;
};

export type CategoryButtonProps = {
  label: string;
  handleClick: (label: string) => void;
  active: Record<string, boolean>;
};

export type TableRowProps = {
  tableKey: string | null;
  value: string | number | React.ReactElement | null;
  label: string;
  link?: string;
  format?: (value: string | number | React.ReactElement | null) => string;
};
