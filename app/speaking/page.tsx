import type { Metadata } from 'next';
import Link from 'next/link';

import { SchemaGraph } from '@/components/Schema';
import Entry from '@/components/Speaking/Entry';
import PageWrapper from '@/components/Template/PageWrapper';
import { getAppearances } from '@/data/speaking';
import { createPageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  collectionPageNode,
  HOME_URL,
  SITE_URL,
} from '@/lib/schema';
import { AUTHOR_NAME } from '@/lib/utils';

const SPEAKING_URL = `${SITE_URL}/speaking/`;

const PAGE_TITLE = 'Speaking';

const SPEAKING_DESCRIPTION = `Talks and panels on cloud infrastructure by ${AUTHOR_NAME}: AWS, Kubernetes, and automating platform operations.`;

export const metadata: Metadata = createPageMetadata({
  title: PAGE_TITLE,
  description: SPEAKING_DESCRIPTION,
  path: '/speaking/',
});

export default function SpeakingPage() {
  const appearances = getAppearances();

  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url: SPEAKING_URL,
            name: PAGE_TITLE,
            description: SPEAKING_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(SPEAKING_URL, [
            { name: 'Home', url: HOME_URL },
            { name: PAGE_TITLE, url: SPEAKING_URL },
          ]),
        ]}
      />
      {/* The register's layout classes are shared with /projects. */}
      <div className="projects-page">
        <header className="projects-header">
          <h1 className="page-title">{PAGE_TITLE}</h1>
          <p className="page-subtitle page-prose">
            I talk about cloud infrastructure: AWS, Kubernetes, and automating
            the operations work around them. If you&apos;re organizing an event
            or working on the same problems,{' '}
            <Link href="/contact/">get in touch</Link>.
          </p>
        </header>

        {/* Rendered only once there is something to list; the route stays
            disabled in src/data/routes.ts until then. */}
        {appearances.length > 0 && (
          <section className="projects-group" aria-labelledby="speaking-public">
            <div className="projects-group-header">
              <h2 id="speaking-public" className="projects-section-title">
                Public sessions
              </h2>
            </div>
            <ol className="projects-register">
              {appearances.map((appearance) => (
                <li key={appearance.link}>
                  <Entry data={appearance} />
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </PageWrapper>
  );
}
