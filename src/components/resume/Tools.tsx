import React from 'react';
import Tool from '@/components/resume/tools/Tool';
import type { Tool as ToolType } from '@/data/resume/tools';

interface ToolProps {
  data: ToolType[];
}

const getRows = (tools: ToolType[]) =>
  tools
    .sort((a, b) => {
      let ret = 0;
      if (a.name > b.name) ret = 1;
      else if (a.name < b.name) ret = -1;
      else if (a.link > b.link) ret = 1;
      else if (a.link < b.link) ret = -1;
      return ret;
    })
    .map((tool, idx) => (
      <Tool data={tool} key={tool.name} last={idx === tools.length - 1} />
    ));

const Tools: React.FC<ToolProps> = ({ data }) => (
  <div className="tools">
    <div className="link-to" id="tools" />
    <div className="title">
      <h3>
        Throughout my career, I have leveraged a wide range of tools and
        technologies to help me succeed in my work.
      </h3>
    </div>
    <ul className="tool-list">{getRows(data)}</ul>
  </div>
);

export default Tools;
