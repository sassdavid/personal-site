import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SITE_URL } from '@/lib/utils';

/**
 * Post lookup and image measurement are both injected, so these describe how
 * a post becomes metadata rather than depending on a particular article
 * existing in `content/writing/`. `readImageSize` is stubbed because the real
 * one reads a file from `public/` — the point here is the metadata shape, not
 * the decoder, which `lib/__tests__/imageSize.test.ts` covers.
 */
const state = vi.hoisted(() => ({
  posts: {} as Record<
    string,
    {
      slug: string;
      title: string;
      date: string;
      description: string;
      image?: string;
      imageAlt?: string;
      content?: string;
    }
  >,
}));

vi.mock('@/lib/posts', () => ({
  getPostBySlug: (slug: string) => state.posts[slug] ?? null,
  getPostSlugs: () => Object.keys(state.posts),
}));

vi.mock('@/lib/imageSize', () => ({
  readImageSize: () => ({ width: 1117, height: 812 }),
  readPostImageSizes: () => ({}),
}));

import { generateMetadata, generateStaticParams } from './page';

describe('writing post metadata', () => {
  beforeEach(() => {
    state.posts = {};
  });

  it('uses a trailing-slash canonical URL for posts', async () => {
    state.posts = {
      'a-post': {
        slug: 'a-post',
        title: 'A Post',
        date: '2026-03-10',
        description: 'd',
      },
    };

    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'a-post' }),
    });

    expect(metadata.openGraph?.url).toBe(`${SITE_URL}/writing/a-post/`);
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/writing/a-post/`);
  });

  it('uses an explicitly selected article image for social metadata', async () => {
    state.posts = {
      illustrated: {
        slug: 'illustrated',
        title: 'Illustrated',
        date: '2026-03-10',
        description: 'd',
        image: '/images/writing/api-costs.png',
        imageAlt: 'API costs for the month',
      },
    };

    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'illustrated' }),
    });

    expect(metadata.openGraph?.images).toEqual([
      {
        url: `${SITE_URL}/images/writing/api-costs.png`,
        width: 1117,
        height: 812,
        alt: 'API costs for the month',
      },
    ]);
    // The two cards are built from one object, so they cannot disagree.
    expect(metadata.twitter?.images).toEqual(metadata.openGraph?.images);
  });

  // An image without alt text is not usable as a share card, so the post
  // falls back to the site card rather than shipping an unlabelled image.
  it('falls back to the site share card when a post has no usable image', async () => {
    state.posts = {
      plain: {
        slug: 'plain',
        title: 'Plain',
        date: '2026-03-10',
        description: 'd',
        image: '/images/writing/no-alt.png',
      },
    };

    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'plain' }),
    });

    // The two cards describe the same file in different shapes: openGraph
    // carries dimensions, twitter takes a bare URL.
    expect(JSON.stringify(metadata.openGraph?.images)).toContain('/og.png');
    expect(JSON.stringify(metadata.twitter?.images)).toContain('/og.png');
  });

  it('reports a missing post rather than inventing metadata', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'does-not-exist' }),
    });

    expect(metadata.title).toBe('Post Not Found');
    expect(metadata.openGraph?.url).toBeUndefined();
  });

  // `output: 'export'` refuses to build a dynamic route with no params, so an
  // empty repository still has to emit one placeholder path.
  it('emits a placeholder param when nothing is published', () => {
    expect(generateStaticParams()).toEqual([{ slug: 'coming-soon' }]);
  });

  it('emits one param per published post', () => {
    state.posts = {
      first: {
        slug: 'first',
        title: 'First',
        date: '2026-03-10',
        description: '',
      },
      second: {
        slug: 'second',
        title: 'Second',
        date: '2026-01-02',
        description: '',
      },
    };

    expect(generateStaticParams()).toEqual([
      { slug: 'first' },
      { slug: 'second' },
    ]);
  });
});
