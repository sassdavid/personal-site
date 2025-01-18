import React from 'react';
import { ToolProps } from '@/lib/types';

const Tool = ({ toolName, link, last = false }: ToolProps) => (
  <li className="tool-container">
    {(link && (
      <a href={link} target="_blank" rel="nofollow noopener noreferrer">
        <p className="tool-name">{toolName}</p>
      </a>
    )) ||
      (!link && <p className="tool-name">{toolName}</p>)}
    {!last && (
      <div className="tool-dot">
        <p className="tool-name"> &#8226;</p>
      </div>
    )}
  </li>
);

export default Tool;
