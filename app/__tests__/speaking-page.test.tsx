import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { Appearance } from '@/data/speaking';

/**
 * `src/data/speaking.ts` is empty in this fork, so the register is injected:
 * the page is tested against fixture appearances (deliberately out of order,
 * with one description naming another row's event) and against an empty list.
 */
const FIXTURES: Appearance[] = [
  {
    title: 'Running Kubernetes Upgrades Without a Maintenance Window',
    format: 'Panel',
    date: '2025-03-12',
    place: 'Budapest',
    desc: 'With platform teams from two banks.',
    link: 'https://example.com/meetup/k8s-upgrades',
  },
  {
    title: 'Example Cloud Summit',
    format: 'Arsenal Lab',
    date: '2026-05-20',
    place: 'Vienna',
    desc: 'A follow-up to the Kubernetes upgrades panel.',
    link: 'https://example.com/summit/lab',
  },
];

const state = vi.hoisted(() => ({ appearances: [] as Appearance[] }));

vi.mock('@/data/speaking', () => ({
  getAppearances: () =>
    [...state.appearances].sort((a, b) => b.date.localeCompare(a.date)),
}));

import { getAppearances } from '@/data/speaking';
import SpeakingPage from '../speaking/page';

describe('speaking page', () => {
  let appearances: Appearance[];

  beforeEach(() => {
    state.appearances = FIXTURES;
    appearances = getAppearances();
  });

  it('renders no register while there is nothing to list', () => {
    state.appearances = [];
    const { container } = render(<SpeakingPage />);

    expect(
      screen.queryByRole('region', { name: 'Public sessions' }),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('.projects-register'),
    ).not.toBeInTheDocument();
  });

  it('lists every appearance, newest first', () => {
    render(<SpeakingPage />);
    const register = screen.getByRole('region', { name: 'Public sessions' });
    const titles = within(register)
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent?.replace('↗', ''));

    expect(titles).toEqual(appearances.map((appearance) => appearance.title));
  });

  it('states each format as the organiser billed it, beside the date', () => {
    const { container } = render(<SpeakingPage />);
    const rows = [...container.querySelectorAll('.project-entry')];

    expect(rows).toHaveLength(appearances.length);
    rows.forEach((row, index) => {
      const labels = [...row.querySelectorAll('.project-entry-role')].map(
        (label) => label.textContent,
      );

      expect(labels).toEqual([
        appearances[index].format,
        appearances[index].place,
      ]);
    });
  });

  /**
   * An `aria-label` would replace the row's whole accessible name and drop
   * the place and host; the warning is appended to the text instead.
   */
  it('opens each listing in a new tab and says so without hiding the row', () => {
    render(<SpeakingPage />);
    const register = screen.getByRole('region', { name: 'Public sessions' });
    // By position, not by name: one row's description names another's event.
    const links = within(register).getAllByRole('link');

    expect(links).toHaveLength(appearances.length);
    links.forEach((link, index) => {
      const appearance = appearances[index];

      expect(link).toHaveAttribute('href', appearance.link);
      expect(link).toHaveAccessibleName(
        expect.stringContaining(appearance.title),
      );
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).not.toHaveAttribute('aria-label');
      expect(link).toHaveAccessibleName(
        expect.stringContaining(appearance.place),
      );
      expect(link).toHaveAccessibleName(
        expect.stringContaining('(opens in a new tab)'),
      );
    });
  });

  it('links contact from the introduction', () => {
    render(<SpeakingPage />);

    // jsdom never applies `trailingSlash`, so compare without it.
    expect(
      screen
        .getByRole('link', { name: 'get in touch' })
        .getAttribute('href')
        ?.replace(/\/$/, ''),
    ).toBe('/contact');
  });
});
