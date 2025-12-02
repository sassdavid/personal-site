import React from 'react';
import Tool from '@/components/resume/tools/Tool';
import { ToolProps } from '@/lib/types';

const getRows = (tools: ToolProps[]) =>
  tools
    .sort((a, b) => {
      let ret = 0;
      if (a.toolName > b.toolName) ret = 1;
      else if (a.toolName < b.toolName) ret = -1;
      else if (a.link > b.link) ret = 1;
      else if (a.link < b.link) ret = -1;
      return ret;
    })
    .map((tool, idx) => (
      <Tool
        key={tool.toolName}
        toolName={tool.toolName}
        link={tool.link}
        last={idx === tools.length - 1}
      />
    ));

const Tools = ({ data = [] }: { data: ToolProps[] }) => (
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
