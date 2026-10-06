import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { Project } from '@/data/projects';
import { allRoutes } from '@/data/routes';

/**
 * The register is injected, so these describe how the page presents whatever
 * `src/data/projects.ts` holds rather than requiring it to hold anything. That
 * file is empty in this fork, and the empty state is tested here too.
 */
const state = vi.hoisted(() => ({
  shipped: [] as Project[],
  archive: [] as Project[],
}));

vi.mock('@/data/projects', () => ({
  get default() {
    return [...state.shipped, ...state.archive];
  },
  get shipped() {
    return state.shipped;
  },
  get archive() {
    return state.archive;
  },
}));

import ProjectsPage from '../projects/page';

const SHIPPED: Project[] = [
  {
    title: 'Live Platform',
    subtitle: 'Platform lead',
    link: 'https://example.com/platform',
    sourceWork: 'Example Co',
    date: '2024-07-01',
    ongoing: true,
    desc: 'Still running.',
    status: 'shipped',
  },
  {
    title: 'Finished Migration',
    subtitle: 'Engineer',
    sourceWork: 'Example Co',
    date: '2021-01-01',
    endDate: '2022-01-01',
    desc: 'Done, with nothing public to link to.',
    status: 'shipped',
  },
];

const ARCHIVE: Project[] = [
  {
    title: 'Hackathon Entry',
    link: 'https://example.com/hackathon',
    image: '/images/me.jpg',
    date: '2016-05-01',
    desc: 'A weekend build.',
    status: 'archive',
  },
  {
    title: 'Student Experiment',
    date: '2015-03-01',
    desc: 'Kept for the record.',
    status: 'archive',
  },
];

describe('projects page', () => {
  beforeEach(() => {
    state.shipped = SHIPPED;
    state.archive = ARCHIVE;
  });

  it('presents selected work and the archive as separate, labelled groups', () => {
    render(<ProjectsPage />);

    const shippedSection = screen.getByRole('region', {
      name: 'Selected work',
    });
    const archiveSection = screen.getByRole('region', { name: 'Archive' });

    expect(
      within(shippedSection).getAllByRole('heading', { level: 3 }),
    ).toHaveLength(SHIPPED.length);
    expect(within(shippedSection).getByRole('list')).toBeInTheDocument();
    expect(within(shippedSection).getAllByRole('listitem')).toHaveLength(
      SHIPPED.length,
    );
    expect(
      within(archiveSection).getAllByRole('heading', { level: 3 }),
    ).toHaveLength(ARCHIVE.length);
    expect(within(archiveSection).getByRole('list')).toBeInTheDocument();
    expect(within(archiveSection).getAllByRole('listitem')).toHaveLength(
      ARCHIVE.length,
    );
  });

  it('counts each group rather than stating a number', () => {
    const { container } = render(<ProjectsPage />);
    const counts = [
      ...container.querySelectorAll('.projects-section-count'),
    ].map((node) => node.textContent);

    expect(counts).toEqual([
      `${SHIPPED.length} projects`,
      `${ARCHIVE.length} projects`,
    ]);
  });

  it('leads with the newest shipped work', () => {
    const { container } = render(<ProjectsPage />);
    const titles = [...container.querySelectorAll('.project-entry-title')].map(
      (node) => node.textContent?.replace('↗', ''),
    );

    expect(titles).toEqual(SHIPPED.map((project) => project.title));
  });

  /**
   * The register has no artwork, and inventing some would be worse than going
   * without: only archive entries that actually have a committed screenshot
   * may render an image.
   */
  it('renders an image only where one exists', () => {
    const { container } = render(<ProjectsPage />);

    expect(container.querySelectorAll('.project-entry img')).toHaveLength(0);
    expect(container.querySelectorAll('.project-card img')).toHaveLength(
      ARCHIVE.filter((project) => project.image).length,
    );
  });

  it('never renders a card that looks clickable but is not', () => {
    const { container } = render(<ProjectsPage />);

    for (const card of container.querySelectorAll(
      '.project-card, .project-entry',
    )) {
      const linked = card.matches('a') || card.querySelector('a') !== null;

      expect(card.classList.contains('project-card--linked')).toBe(
        linked && card.classList.contains('project-card'),
      );
      expect(
        card.querySelector('.project-note') !== null,
        `${card.querySelector('h3')?.textContent}: inert cards must say so`,
      ).toBe(!linked);
    }
  });

  // An empty group is omitted rather than rendering a heading over an empty
  // list with a "0 projects" count — the state this fork is actually in.
  it('omits a group that has nothing to list', () => {
    state.shipped = [];

    const { container } = render(<ProjectsPage />);

    expect(
      screen.queryByRole('region', { name: 'Selected work' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Archive' })).toBeInTheDocument();
    expect(container.querySelectorAll('.projects-section-count')).toHaveLength(
      1,
    );
  });

  it('renders only the header when the register is empty', () => {
    state.shipped = [];
    state.archive = [];

    const { container } = render(<ProjectsPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Projects' }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll('.projects-group')).toHaveLength(0);
  });

  /**
   * The page used to be reachable only through the footer, and `/contact`
   * hides the footer — so from there it was reachable from nowhere at all.
   * It is disabled until it has content, but once enabled it is primary.
   */
  it('is a primary navigation destination', () => {
    const route = allRoutes.find((entry) => entry.path === '/projects');

    expect(route?.label).toBe('Projects');
    expect(route?.primary).not.toBe(false);
  });
});
