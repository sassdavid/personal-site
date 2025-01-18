import React from 'react';
import { CategoryButtonProps } from '@/lib/types';

const CategoryButton = ({ handleClick, active, label }: CategoryButtonProps) => (
  <button className={`skillbutton ${active[label] ? 'skillbutton-active' : ''}`} type="button" onClick={() => handleClick(label)}>
    {label}
  </button>
);

export default CategoryButton;
