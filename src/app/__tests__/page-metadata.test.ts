import { describe, expect, it, vi } from 'vitest';

import profile from '@/data/profile.json';
import { allRoutes } from '@/data/routes';
import { AUTHOR_NAME, SHARE_IMAGE_PATH, SITE_URL } from '@/lib/utils';

/**
 * One synthetic post stands in for `content/writing/`, so the blog-post cases
 * below describe the metadata rules rather than requiring this repository to
 * have published anything. The post deliberately carries no image, which is
 * what makes it exercise the fall back to the site share card.
 */
const { POST_SLUG } = vi.hoisted(() => ({ POST_SLUG: 'a-published-post' }));

vi.mock('@/lib/posts', () => {
  const post = {
    slug: POST_SLUG,
    title: 'A Published Post',
    date: '2026-03-10',
    description: 'A post used to pin blog-post metadata rules.',
    content: 'Body copy.',
  };

  return {
    getPostSlugs: () => [post.slug],
    getPostBySlug: (slug: string) => (slug === post.slug ? post : null),
    getAllPosts: () => [post],
  };
});

import { metadata as aboutMetadata } from '../about/page';
import { metadata as contactMetadata } from '../contact/page';
import { metadata as notFoundMetadata } from '../not-found';
import { metadata as projectsMetadata } from '../projects/page';
import { metadata as resumeMetadata } from '../resume/page';
import { metadata as statsMetadata } from '../stats/page';
import { generateMetadata as generatePostMetadata } from '../writing/[slug]/page';
import { metadata as writingMetadata } from '../writing/page';

describe('page metadata', () => {
  it('builds the contact description from the shared profile email', () => {
    expect(contactMetadata.description).toContain(profile.email);
  });

  it.each([
    ['about', aboutMetadata, `${SITE_URL}/about/`],
    ['contact', contactMetadata, `${SITE_URL}/contact/`],
    ['archive', projectsMetadata, `${SITE_URL}/projects/`],
    ['resume', resumeMetadata, `${SITE_URL}/resume/`],
    ['stats', statsMetadata, `${SITE_URL}/stats/`],
    ['writing', writingMetadata, `${SITE_URL}/writing/`],
  ])('sets page-specific open graph metadata for %s', (_, metadata, url) => {
    expect(metadata.openGraph?.url).toBe(url);
    expect(metadata.openGraph?.description).toBe(metadata.description);
    expect(metadata.openGraph?.title).toBe(
      `${metadata.title} | ${AUTHOR_NAME}`,
    );
  });

  it.each([
    ['about', aboutMetadata],
    ['contact', contactMetadata],
    ['archive', projectsMetadata],
    ['resume', resumeMetadata],
    ['stats', statsMetadata],
    ['writing', writingMetadata],
  ])('sets page-specific twitter metadata for %s', (_, metadata) => {
    expect(metadata.twitter?.description).toBe(metadata.description);
    expect(metadata.twitter?.title).toBe(`${metadata.title} | ${AUTHOR_NAME}`);
  });

  /**
   * A route-level `openGraph` object replaces the inherited one entirely, so
   * every page that declares one must repeat the share image. Blog posts
   * shipped without an og:image for exactly this reason.
   */
  it.each([
    ['about', aboutMetadata],
    ['contact', contactMetadata],
    ['archive', projectsMetadata],
    ['resume', resumeMetadata],
    ['stats', statsMetadata],
    ['writing', writingMetadata],
    ['404', notFoundMetadata],
  ])('declares the share card on %s', (_, metadata) => {
    const ogImages = metadata.openGraph?.images;
    expect(JSON.stringify(ogImages)).toContain(SHARE_IMAGE_PATH);
    expect(JSON.stringify(metadata.twitter?.images)).toContain(
      SHARE_IMAGE_PATH,
    );
  });

  /**
   * `alternates` carries the canonical, and like `openGraph` it is replaced
   * rather than merged — the writing index lost its canonical by declaring
   * RSS types on top of it.
   */
  it.each([
    ['about', aboutMetadata, `${SITE_URL}/about/`],
    ['contact', contactMetadata, `${SITE_URL}/contact/`],
    ['archive', projectsMetadata, `${SITE_URL}/projects/`],
    ['resume', resumeMetadata, `${SITE_URL}/resume/`],
    ['stats', statsMetadata, `${SITE_URL}/stats/`],
    ['writing', writingMetadata, `${SITE_URL}/writing/`],
  ])('declares a canonical url for %s', (_, metadata, url) => {
    expect(metadata.alternates?.canonical).toBe(url);
  });

  it('omits the canonical on 404, which has no stable url', () => {
    expect(notFoundMetadata.alternates?.canonical).toBeUndefined();
  });

  it('keeps the RSS alternate alongside the canonical on the writing index', () => {
    expect(writingMetadata.alternates?.types).toEqual({
      'application/rss+xml': '/feed.xml',
    });
  });

  it('declares a canonical url for blog posts', async () => {
    const metadata = await generatePostMetadata({
      params: Promise.resolve({ slug: POST_SLUG }),
    });

    expect(metadata.alternates?.canonical).toBe(
      `${SITE_URL}/writing/${POST_SLUG}/`,
    );
  });

  it('declares the share card on blog posts', async () => {
    const metadata = await generatePostMetadata({
      params: Promise.resolve({ slug: POST_SLUG }),
    });

    expect(JSON.stringify(metadata.openGraph?.images)).toContain(
      SHARE_IMAGE_PATH,
    );
    expect(JSON.stringify(metadata.twitter?.images)).toContain(
      SHARE_IMAGE_PATH,
    );
  });

  it('overrides 404 share metadata without inventing a canonical url', () => {
    expect(notFoundMetadata.openGraph?.url).toBeUndefined();
    expect(notFoundMetadata.openGraph?.description).toBe(
      notFoundMetadata.description,
    );
    expect(notFoundMetadata.openGraph?.title).toBe(
      `${notFoundMetadata.title} | ${AUTHOR_NAME}`,
    );
    expect(notFoundMetadata.twitter?.description).toBe(
      notFoundMetadata.description,
    );
    expect(notFoundMetadata.twitter?.title).toBe(
      `${notFoundMetadata.title} | ${AUTHOR_NAME}`,
    );
  });

  /**
   * `app/sitemap.ts` drops a disabled section by URL prefix, so its posts are
   * absent from the sitemap the moment one is published. Staying indexable
   * there is the exact inconsistency `verify-export` fails the build on.
   */
  it('declines indexing for posts under a section disabled for lack of content', async () => {
    const metadata = await generatePostMetadata({
      params: Promise.resolve({ slug: POST_SLUG }),
    });

    const writingIsDisabled = allRoutes.some(
      (route) => route.path === '/writing' && route.enabled === false,
    );

    expect(metadata.robots).toEqual(
      writingIsDisabled ? { index: false } : undefined,
    );
  });

  it('preserves the writing rss alternate', () => {
    expect(writingMetadata.alternates?.types?.['application/rss+xml']).toBe(
      '/feed.xml',
    );
  });
});
