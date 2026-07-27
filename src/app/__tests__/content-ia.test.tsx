import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * The homepage and writing index are driven entirely by `getWritingItems`, so
 * it is injected here. That lets these tests describe the information
 * architecture — how many items surface, how they group, which one is
 * featured — against a fixed set, instead of re-deriving the expectation from
 * the same function the page uses and asserting nothing. It also lets the
 * empty case be tested, which is the state this repository is actually in.
 */
const state = vi.hoisted(() => ({
  items: [] as {
    title: string;
    url: string;
    date: string;
    description: string;
    isExternal: boolean;
    source: string;
  }[],
}));

vi.mock('@/lib/writing', () => ({
  getWritingItems: () => state.items,
}));

import HomePage from '../page';
import WritingPage from '../writing/page';

const local = (title: string, slug: string, date: string) => ({
  title,
  url: `/writing/${slug}/`,
  date,
  description: `${title} description`,
  isExternal: false,
  source: 'On this site',
});

const external = (title: string, date: string, source = 'Example') => ({
  title,
  url: `https://example.com/${title.toLowerCase().replace(/\s+/g, '-')}`,
  date,
  description: `${title} description`,
  isExternal: true,
  source,
});

const guide = (title: string) => ({ ...external(title, ''), source: 'Guides' });

describe('writing information architecture', () => {
  beforeEach(() => {
    state.items = [];
  });

  it('surfaces the three newest dated items on the homepage', () => {
    state.items = [
      local('Newest', 'newest', '2026-03-10'),
      external('Second', '2026-02-01'),
      local('Third', 'third', '2026-01-05'),
      local('Fourth', 'fourth', '2025-12-01'),
    ];

    const { container } = render(<HomePage />);
    const section = screen.getByRole('region', { name: 'Latest writing' });
    const cards = container.querySelectorAll('.home-writing-item');

    expect(cards).toHaveLength(3);
    expect(
      [...cards].map((card) => card.querySelector('h3')?.textContent),
    ).toEqual(['Newest', 'Second', 'Third']);
    expect(
      within(section).getByRole('link', { name: 'View all' }),
    ).toHaveAttribute('href', '/writing');
  });

  // The section is gated on having something to list: a "Latest writing"
  // heading over an empty list, above a "View all" link to an empty page, is
  // worse than no section at all.
  it('omits the homepage writing section entirely when nothing is published', () => {
    const { container } = render(<HomePage />);

    expect(
      screen.queryByRole('region', { name: 'Latest writing' }),
    ).not.toBeInTheDocument();
    expect(container.querySelectorAll('.home-writing-item')).toHaveLength(0);
  });

  it('groups owned essays, external articles, and guides under real headings', () => {
    state.items = [
      local('An Essay', 'an-essay', '2026-03-10'),
      external('An Article', '2026-02-01'),
      guide('A Guide'),
    ];

    const { container } = render(<WritingPage />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Essays on this site' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Selected writing elsewhere',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Guides' }),
    ).toBeInTheDocument();

    expect(container.querySelectorAll('.writing-item h3')).toHaveLength(3);
  });

  it('features exactly the newest dated item, wherever it is grouped', () => {
    state.items = [
      external('Newest Is External', '2026-03-10'),
      local('An Essay', 'an-essay', '2026-01-05'),
    ];

    const { container } = render(<WritingPage />);
    const featured = container.querySelectorAll('.writing-item--featured');

    expect(featured).toHaveLength(1);
    expect(featured[0]).toHaveAttribute(
      'href',
      'https://example.com/newest-is-external',
    );
  });

  it('features nothing when no item carries a date', () => {
    state.items = [guide('A Guide'), guide('Another Guide')];

    const { container } = render(<WritingPage />);

    expect(container.querySelectorAll('.writing-item--featured')).toHaveLength(
      0,
    );
  });

  it('shows provenance beside every external-link arrow', () => {
    state.items = [
      external('An Article', '2026-02-01', 'Promptfoo'),
      local('An Essay', 'an-essay', '2026-01-05'),
    ];

    const { container } = render(<WritingPage />);
    const externalLinks = [
      ...container.querySelectorAll('a.writing-item[target="_blank"]'),
    ];

    expect(externalLinks).toHaveLength(1);
    externalLinks.forEach((link) => {
      expect(link.querySelector('.writing-source')).toHaveTextContent(
        'Promptfoo',
      );
      expect(link.querySelector('.writing-external')).toHaveTextContent('↗');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link.querySelector('.sr-only')).toHaveTextContent(
        'opens in a new tab',
      );
    });
  });
});
