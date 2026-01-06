import Tool from '@/components/Resume/Tools/Tool';

import type { Tool as ToolType } from '@/data/resume/tools';

interface ToolProps {
  data: ToolType[];
}

function getRows(tools: ToolType[]) {
  return tools
    .sort((a, b) => {
      let ret = 0;
      if (a.name > b.name) ret = 1;
      else if (a.name < b.name) ret = -1;
      else if (a.link > b.link) ret = 1;
      else if (a.link < b.link) ret = -1;
      return ret;
    })
    .map((tool) => <Tool data={tool} key={tool.name} />);
}

export default function Tools({ data }: ToolProps) {
  return (
    <div className="tools">
      <div className="link-to" id="tools" />
      <div className="title">
        <h3>Tools & Technologies</h3>
      </div>
      <div className="tool-tags">{getRows(data)}</div>
    </div>
  );
}
