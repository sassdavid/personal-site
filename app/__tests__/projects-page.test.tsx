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

import { smartQuotes } from '@/lib/typography';
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

/**
 * The two parts of the register, read through the mock so each test sees the
 * fixtures `beforeEach` installed rather than whatever was there at import.
 */
function sections(): [name: string, group: Project[]][] {
  return [
    ['Selected work', state.shipped],
    ['Archive', state.archive],
  ];
}

/** The rows of one part of the register, in the order the page draws them. */
function rowsIn(name: string): HTMLElement[] {
  const section = screen.getByRole('region', { name });

  return within(section)
    .getAllByRole('listitem')
    .map((item) => {
      // One row per list item, and nothing else beside it.
      expect(item.children).toHaveLength(1);
      return item.firstElementChild as HTMLElement;
    });
}

/** Each project in the data paired with the row the page drew for it. */
function projectRows(): [project: Project, row: HTMLElement][] {
  const projects = [...state.shipped, ...state.archive];
  const rows = sections().flatMap(([name]) => rowsIn(name));

  expect(rows).toHaveLength(projects.length);
  return projects.map((project, index) => [project, rows[index]]);
}

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

  /** One header for a section on every page: a heading, then its annotation. */
  it('opens each group with the shared section header', () => {
    render(<ProjectsPage />);

    for (const [name] of sections()) {
      const heading = screen.getByRole('heading', { level: 2, name });

      expect(heading).toHaveClass('section-heading');
      expect(heading.parentElement).toHaveClass('section-header');
    }
  });

  it('counts each group rather than stating a number', () => {
    const { container } = render(<ProjectsPage />);
    const counts = [...container.querySelectorAll('.section-header-meta')].map(
      (node) => node.textContent,
    );

    expect(counts).toEqual([
      `${SHIPPED.length} projects`,
      `${ARCHIVE.length} projects`,
    ]);
  });

  it.each([
    ['Selected work', SHIPPED],
    ['Archive', ARCHIVE],
  ] as const)('lists %s in the order the data gives', (name, group) => {
    render(<ProjectsPage />);
    const titles = rowsIn(name).map((row) =>
      within(row)
        .getByRole('heading', { level: 3 })
        .textContent?.replace('↗', ''),
    );

    // Compared in display form: the row sets its title with typographic
    // quotes, which `Entry`'s own tests pin against literals.
    expect(titles).toEqual(group.map((project) => smartQuotes(project.title)));
  });

  /**
   * The archive is the same list and the same row as the work above it, a size
   * step down, so student projects cannot out-weigh it.
   */
  it('draws the archive with the same row as the work above it', () => {
    const { container } = render(<ProjectsPage />);

    for (const [name] of sections()) {
      const section = screen.getByRole('region', { name });

      expect(within(section).getByRole('list')).toHaveClass(
        'projects-register',
      );
    }
    for (const row of rowsIn('Selected work')) {
      expect(row).toHaveClass('project-entry');
      expect(row).not.toHaveClass('project-entry--archive');
    }
    for (const row of rowsIn('Archive')) {
      expect(row).toHaveClass('project-entry', 'project-entry--archive');
    }
    // The cards are gone, not restyled.
    expect(
      container.querySelector('[class*="project-card"], .projects-grid'),
    ).not.toBeInTheDocument();
  });

  /**
   * No artwork is invented: a row shows a thumbnail only when its entry has a
   * committed screenshot, and then exactly that file.
   */
  it('renders an image only where one exists', () => {
    render(<ProjectsPage />);

    for (const [project, row] of projectRows()) {
      const images = row.querySelectorAll('img');

      expect(images, project.title).toHaveLength(project.image ? 1 : 0);
      if (project.image) {
        expect(images[0]).toHaveAttribute('src', project.image);
        expect(images[0]).toHaveAttribute('alt', '');
      }
    }
  });

  /**
   * An entry with nowhere to go is a plain record. It is told apart from a
   * linked one by what is missing — the link and its arrow — and by nothing
   * added.
   */
  it('links a row only where the project has a destination', () => {
    const { container } = render(<ProjectsPage />);

    for (const [project, row] of projectRows()) {
      const arrow = row.querySelector('.project-entry-external');

      if (project.link) {
        expect(row.tagName, project.title).toBe('A');
        expect(row).toHaveAttribute('href', project.link);
        expect(row).toHaveAttribute('target', '_blank');
        expect(row.getAttribute('aria-label')).toMatch(
          /\(opens in a new tab\)$/,
        );
        expect(arrow).toHaveTextContent('↗');
      } else {
        expect(row.tagName, project.title).toBe('DIV');
        expect(row.querySelector('a')).not.toBeInTheDocument();
        expect(arrow).not.toBeInTheDocument();
      }
    }
    expect(container).not.toHaveTextContent(/no public link/i);
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
    expect(container.querySelectorAll('.section-header-meta')).toHaveLength(1);
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
   * `/contact` hides the footer, so a page reachable only through the footer
   * would be reachable from nowhere there.
   * It is disabled until it has content, but once enabled it is primary.
   */
  it('is a primary navigation destination', () => {
    const route = allRoutes.find((entry) => entry.path === '/projects');

    expect(route?.label).toBe('Projects');
    expect(route?.primary).not.toBe(false);
  });
});
