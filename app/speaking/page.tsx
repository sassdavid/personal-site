import type { Metadata } from 'next';
import Link from 'next/link';

import { SchemaGraph } from '@/components/Schema';
import Entry from '@/components/Speaking/Entry';
import PageWrapper from '@/components/Template/PageWrapper';
import { getAppearances } from '@/data/speaking';
import { createPageMetadata } from '@/lib/metadata';
import { collectionPageNode, sectionPageNodes } from '@/lib/schema';
import { AUTHOR_NAME } from '@/lib/utils';

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
        nodes={sectionPageNodes(
          collectionPageNode,
          '/speaking/',
          PAGE_TITLE,
          SPEAKING_DESCRIPTION,
        )}
      />
      {/* The register's layout classes are shared with /projects. */}
      <div className="projects-page">
        <header className="projects-header">
          <h1 className="page-title">{PAGE_TITLE}</h1>
          <p className="page-subtitle page-prose">
            I talk about cloud infrastructure: AWS, Kubernetes, and automating
            the operations work around them. If you’re organizing an event or
            working on the same problems,{' '}
            <Link href="/contact/">get in touch</Link>.
          </p>
        </header>

        {/* Rendered only once there is something to list; the route stays
            disabled in src/data/routes.ts until then. */}
        {appearances.length > 0 && (
          <section className="projects-group" aria-labelledby="speaking-public">
            <div className="section-header">
              <h2 id="speaking-public" className="section-heading">
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
