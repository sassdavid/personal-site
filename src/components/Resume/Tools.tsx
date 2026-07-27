import Tool from '@/components/Resume/Tools/Tool';

import type { Tool as ToolType } from '@/data/resume/tools';

interface ToolProps {
  data: ToolType[];
}

function getRows(tools: ToolType[]) {
  // Copy first: `sort` mutates in place, and this receives the imported
  // module array, so rendering was reordering shared data as a side effect.
  return [...tools]
    .sort(
      (a, b) => a.name.localeCompare(b.name) || a.link.localeCompare(b.link),
    )
    .map((tool) => <Tool data={tool} key={tool.name} />);
}

export default function Tools({ data }: ToolProps) {
  return (
    <div className="tools">
      {/* No `link-to` marker here: the page already wraps this in
          `<section id="tools">`, and emitting the id twice made `#tools`
          ambiguous. Sections are h2 so the page does not jump h1 → h3. */}
      <div className="title">
        <h2>Tools &amp; Technologies</h2>
      </div>
      <div className="tool-tags">{getRows(data)}</div>
    </div>
  );
}
