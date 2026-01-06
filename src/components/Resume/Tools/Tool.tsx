import type { Tool as ToolType } from '@/data/resume/tools';

interface ToolProps {
  data: ToolType;
}

export default function Tool({ data }: ToolProps) {
  const content = <span className="tool-tag-name">{data.name}</span>;

  if (data.link) {
    return (
      <a
        href={data.link}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="tool-tag"
        title={`View ${data.name}`}
      >
        {content}
      </a>
    );
  }

  return <span className="tool-tag">{content}</span>;
}
