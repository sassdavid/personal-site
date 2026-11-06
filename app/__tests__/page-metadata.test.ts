import { describe, expect, it, vi } from 'vitest';

import { allRoutes } from '@/data/routes';
import { sharedOpenGraph } from '@/lib/metadata';
import { getPostBySlug, getPostSlugs } from '@/lib/posts';
import { RESUME_JSON_URL } from '@/lib/resumeJson';
import {
  AUTHOR_NAME,
  SHARE_IMAGE_DIMENSIONS,
  SHARE_IMAGE_PATH,
  SITE_URL,
  TWITTER_HANDLE,
} from '@/lib/utils';
import { metadata as aboutMetadata } from '../about/page';
import { metadata as contactMetadata } from '../contact/page';
import { metadata as notFoundMetadata } from '../not-found';
import { metadata as projectsMetadata } from '../projects/page';
import { metadata as resumeMetadata } from '../resume/page';
import { metadata as speakingMetadata } from '../speaking/page';
import { metadata as statsMetadata } from '../stats/page';
import { generateMetadata as generatePostMetadata } from '../writing/[slug]/page';
import { metadata as writingMetadata } from '../writing/page';

/**
 * One synthetic post stands in for `content/writing/`, so the blog-post cases
 * below describe the metadata rules rather than requiring this repository to
 * have published anything.
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

/**
 * The synthetic post has no card in `public/og/writing/`, and the real reader
 * would fail the build over that — which is the guard in production. Here the
 * card is measured as the generator would have written it.
 */
vi.mock('@/lib/imageSize', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/imageSize')>();
  const { SHARE_IMAGE_DIMENSIONS: card } = await import('@/lib/utils');

  return {
    ...actual,
    readImageSize: (publicPath: string) =>
      publicPath.startsWith('/og/writing/')
        ? { width: card.width, height: card.height }
        : actual.readImageSize(publicPath),
  };
});

/**
 * Next replaces a route's `openGraph`, `twitter`, and `alternates` objects
 * rather than merging them, so anything a route omits vanishes from that page.
 */
const sharedFields = { siteName: sharedOpenGraph?.siteName, locale: 'hu_HU' };
const sharedTwitterFields = {
  card: 'summary_large_image',
  site: TWITTER_HANDLE,
  creator: TWITTER_HANDLE,
};

describe('page metadata', () => {
  it.each([
    ['about', aboutMetadata, '/about/'],
    ['contact', contactMetadata, '/contact/'],
    ['projects', projectsMetadata, '/projects/'],
    ['resume', resumeMetadata, '/resume/'],
    ['speaking', speakingMetadata, '/speaking/'],
    ['stats', statsMetadata, '/stats/'],
    ['writing', writingMetadata, '/writing/'],
    ['404', notFoundMetadata, undefined],
  ])('%s restates what a replacing object drops', (_, metadata, path) => {
    const url = path && `${SITE_URL}${path}`;
    const share = {
      title: `${metadata.title} | ${AUTHOR_NAME}`,
      description: metadata.description,
    };

    // The 404 has no stable canonical URL in a static export.
    expect(metadata.alternates?.canonical).toBe(url);
    expect(metadata.openGraph?.url).toBe(url);
    expect(metadata.openGraph).toMatchObject({ ...sharedFields, ...share });
    expect(metadata.twitter).toMatchObject({
      ...sharedTwitterFields,
      ...share,
    });
    expect(JSON.stringify(metadata.openGraph?.images)).toContain(
      SHARE_IMAGE_PATH,
    );
    expect(JSON.stringify(metadata.twitter?.images)).toContain(
      SHARE_IMAGE_PATH,
    );
  });

  it.each([
    ['writing', writingMetadata, { 'application/rss+xml': '/feed.xml' }],
    ['resume', resumeMetadata, { 'application/json': RESUME_JSON_URL }],
  ])('%s declares its alternate beside the canonical', (_, metadata, types) => {
    expect(metadata.alternates?.types).toEqual(types);
    expect(metadata.alternates?.canonical).toBeTruthy();
  });

  // A post declares the card generated for it rather than the site card, so a
  // shared essay does not look like a shared homepage. A post's own `image` is
  // for JSON-LD, because it is not the shape `summary_large_image` wants.
  it.each(getPostSlugs())('%s keeps a share card of its own', async (slug) => {
    const metadata = await generatePostMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/writing/${slug}/`);
    expect(metadata.openGraph).toMatchObject(sharedFields);
    expect(metadata.twitter).toMatchObject(sharedTwitterFields);
    expect(metadata.openGraph?.images).toEqual([
      {
        url: `${SITE_URL}/og/writing/${slug}.png`,
        width: SHARE_IMAGE_DIMENSIONS.width,
        height: SHARE_IMAGE_DIMENSIONS.height,
        alt: `${getPostBySlug(slug)?.title} — ${AUTHOR_NAME}`,
      },
    ]);
    expect(metadata.twitter?.images).toEqual(metadata.openGraph?.images);
  });

  /**
   * Fork: `/projects`, `/writing` and `/speaking` stay `enabled: false` until
   * they have content. `app/sitemap.ts` drops a disabled section by URL
   * prefix, so its pages and posts must decline indexing too, or they are the
   * exact inconsistency `verify-export` fails the build on.
   */
  it.each([
    ['/projects', projectsMetadata],
    ['/speaking', speakingMetadata],
    ['/writing', writingMetadata],
  ])('%s declines indexing only while disabled', (path, metadata) => {
    const disabled = allRoutes.some(
      (route) => route.path === path && route.enabled === false,
    );

    expect(metadata.robots).toEqual(disabled ? { index: false } : undefined);
  });

  it('declines indexing for posts under a disabled section', async () => {
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
});
