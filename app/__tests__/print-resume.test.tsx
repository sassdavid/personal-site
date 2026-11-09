import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import degrees from '@/data/resume/degrees';
import tools from '@/data/resume/tools';
import work from '@/data/resume/work';
import ResumePage from '../resume/page';

// Job and degree links are printed as text, and tool links remain PDF
// annotations, so all three need destinations that still mean something on paper.
describe('resume link data', () => {
  it('gives every company, school and tool a lasting absolute URL', () => {
    for (const link of [
      ...work.map((job) => job.url),
      ...degrees.map((degree) => degree.link),
      ...tools.map((tool) => tool.link),
    ]) {
      const url = new URL(link);

      expect(['http:', 'https:']).toContain(url.protocol);
      expect(url.hostname).not.toBe('');
      // A `jsessionid` is bound to a server session that has expired.
      expect(link.toLowerCase()).not.toContain('jsessionid');
    }
  });

  it('renders a link for every tool', () => {
    const { container } = render(<ResumePage />);

    expect(container.querySelectorAll('a.tool-tag[href]')).toHaveLength(
      tools.length,
    );
  });
});

describe('resume print control', () => {
  it('opens the print dialog', () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => {});
    render(<ResumePage />);

    fireEvent.click(screen.getByRole('button', { name: 'Print / PDF' }));

    expect(print).toHaveBeenCalledOnce();
    print.mockRestore();
  });
});
