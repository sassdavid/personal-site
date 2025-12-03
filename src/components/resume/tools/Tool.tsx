import React from 'react';

import type { Tool as ToolType } from '@/data/resume/tools';

interface ToolProps {
  data: ToolType;
  last?: boolean;
}

const Tool: React.FC<ToolProps> = ({ data, last = false }) => (
  <li className="tool-container">
    {(data.link && (
      <a href={data.link} target="_blank" rel="nofollow noopener noreferrer">
        <p className="tool-name">{data.name}</p>
      </a>
    )) ||
      (!data.link && <p className="tool-name">{data.name}</p>)}
    {!last && (
      <div className="tool-dot">
        <p className="tool-name"> &#8226;</p>
      </div>
    )}
  </li>
);

export default Tool;
