export interface WritingItem {
  title: string;
  url: string;
  date: string;
  description: string;
}

// External articles surfaced on the /writing page alongside local Markdown
// posts (content/writing/*.md). Empty for now — add entries here, newest first,
// to populate the writing index. See AGENTS.md "Writing page" for the contract.
const data: WritingItem[] = [];

export default data;
