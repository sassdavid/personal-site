import type { Metadata } from 'next';

import Cell from '@/components/Projects/Cell';
import Entry from '@/components/Projects/Entry';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import { archive, shipped } from '@/data/projects';
import { createPageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  collectionPageNode,
  HOME_URL,
  SITE_URL,
} from '@/lib/schema';
import { AUTHOR_NAME } from '@/lib/utils';

const PROJECTS_URL = `${SITE_URL}/projects/`;

const PAGE_TITLE = 'Projects';

/**
 * Built from the register itself, so the share text cannot claim a lineup the
 * page no longer has. Capped at three names to keep the description short
 * enough to survive a search result. An empty register names nothing rather
 * than leaving a gap between two dashes.
 */
const PROJECTS_DESCRIPTION =
  shipped.length > 0
    ? `Selected work from ${AUTHOR_NAME} — ${shipped
        .slice(0, 3)
        .map((project) => project.title)
        .join(', ')} — plus earlier projects and experiments.`
    : `Projects and experiments from ${AUTHOR_NAME}.`;

function projectCountLabel(count: number): string {
  return `${count} ${count === 1 ? 'project' : 'projects'}`;
}

export const metadata: Metadata = createPageMetadata({
  title: PAGE_TITLE,
  description: PROJECTS_DESCRIPTION,
  path: '/projects/',
});

export default function ProjectsPage() {
  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url: PROJECTS_URL,
            name: PAGE_TITLE,
            description: PROJECTS_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(PROJECTS_URL, [
            { name: 'Home', url: HOME_URL },
            { name: PAGE_TITLE, url: PROJECTS_URL },
          ]),
        ]}
      />
      <div className="projects-page">
        <header className="projects-header">
          <h1 className="page-title">{PAGE_TITLE}</h1>
          <p className="page-subtitle">
            Work I have built, led, and contributed to, plus earlier student
            projects.
          </p>
        </header>

        {/* Each group is omitted while it has nothing to list, rather than
            rendering a heading over an empty list and a "0 projects" count.
            Derived from the data, so a group returns with its first entry. */}
        {shipped.length > 0 && (
          <section
            className="projects-group"
            aria-labelledby="projects-selected"
          >
            <div className="projects-group-header">
              <h2 id="projects-selected" className="projects-section-title">
                Selected work
              </h2>
              {/* Counted, never typed. */}
              <span className="projects-section-count">
                {projectCountLabel(shipped.length)}
              </span>
            </div>
            <ol className="projects-register">
              {shipped.map((project) => (
                <li key={project.title}>
                  <Entry data={project} />
                </li>
              ))}
            </ol>
          </section>
        )}

        {archive.length > 0 && (
          <section
            className="projects-group"
            aria-labelledby="projects-archive"
          >
            <div className="projects-group-header">
              <h2 id="projects-archive" className="projects-section-title">
                Archive
              </h2>
              <span className="projects-section-count">
                {projectCountLabel(archive.length)}
              </span>
            </div>
            <p className="projects-group-note">
              Student projects, hackathons, and experiments, kept for the
              record.
            </p>
            <ol className="projects-grid">
              {archive.map((project) => (
                <li key={project.title}>
                  <Cell data={project} />
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </PageWrapper>
  );
}
