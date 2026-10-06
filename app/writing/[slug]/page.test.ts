import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  AUTHOR_NAME,
  SHARE_IMAGE_DIMENSIONS,
  SHARE_IMAGE_PATH,
  SITE_URL,
} from '@/lib/utils';

/**
 * Post lookup and image measurement are both injected, so these describe how
 * a post becomes metadata rather than depending on a particular article
 * existing in `content/writing/`. `readImageSize` is stubbed because the real
 * one reads a file from `public/` — the point here is the metadata shape, not
 * the decoder, which `lib/__tests__/imageSize.test.ts` covers. The stub
 * answers with card dimensions for generated post cards and screenshot
 * dimensions for everything else, so the two cannot be confused.
 *
 * `readPostImageSizes` stays real: the draft case below depends on it
 * tolerating an image that is deliberately absent from `public/`.
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
      content: string;
      draft?: boolean;
    }
  >,
}));

vi.mock('@/lib/posts', () => ({
  getPostBySlug: (slug: string) => state.posts[slug] ?? null,
  getPostSlugs: () =>
    Object.values(state.posts)
      .filter((post) => !post.draft)
      .map((post) => post.slug),
}));

vi.mock('@/lib/imageSize', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/imageSize')>();
  const { SHARE_IMAGE_DIMENSIONS: card } = await import('@/lib/utils');

  return {
    ...actual,
    readImageSize: (publicPath: string) =>
      publicPath.startsWith('/og/writing/')
        ? { width: card.width, height: card.height }
        : { width: 1117, height: 812 },
  };
});

import PostPage, { generateMetadata, generateStaticParams } from './page';

const DRAFT_SLUG = 'zz-draft-preview-fixture';
const DRAFT_TITLE = 'A Draft Held Back From Publication';

function post(slug: string, extra: Partial<(typeof state.posts)[string]> = {}) {
  return {
    slug,
    title: slug,
    date: '2026-03-10',
    description: 'd',
    content: 'Body copy.',
    ...extra,
  };
}

/** The BlogPosting node the rendered page publishes as JSON-LD. */
async function blogPostingFor(slug: string) {
  const markup = renderToStaticMarkup(
    await PostPage({ params: Promise.resolve({ slug }) }),
  );
  const graph = JSON.parse(
    markup.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    )?.[1] ?? '{}',
  );

  return graph['@graph']?.find(
    (node: { '@type': string }) => node['@type'] === 'BlogPosting',
  );
}

beforeEach(() => {
  state.posts = {};
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('writing post metadata', () => {
  it('uses a trailing-slash canonical URL for posts', async () => {
    state.posts = { 'a-post': post('a-post') };

    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'a-post' }),
    });

    expect(metadata.openGraph?.url).toBe(`${SITE_URL}/writing/a-post/`);
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/writing/a-post/`);
  });

  /**
   * The share image is the post's own generated card, even when the post names
   * an article image. `summary_large_image` wants 1200x630, and a screenshot is
   * whatever shape it happens to be.
   */
  it('uses the generated post card for social metadata', async () => {
    state.posts = {
      illustrated: post('illustrated', {
        title: 'Illustrated',
        image: '/images/writing/api-costs.png',
        imageAlt: 'API costs for the month',
      }),
    };

    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'illustrated' }),
    });

    expect(metadata.openGraph?.images).toEqual([
      {
        url: `${SITE_URL}/og/writing/illustrated.png`,
        width: SHARE_IMAGE_DIMENSIONS.width,
        height: SHARE_IMAGE_DIMENSIONS.height,
        alt: `Illustrated — ${AUTHOR_NAME}`,
      },
    ]);
    // The two cards are built from one object, so they cannot disagree.
    expect(metadata.twitter?.images).toEqual(metadata.openGraph?.images);
  });

  it('previews a draft without generating or referencing a public draft card', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    state.posts = {
      [DRAFT_SLUG]: post(DRAFT_SLUG, { title: DRAFT_TITLE, draft: true }),
    };

    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: DRAFT_SLUG }),
    });
    const serialized = JSON.stringify(metadata);

    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata.alternates).toBeUndefined();
    expect(metadata.openGraph?.url).toBeUndefined();
    expect(serialized).toContain(SHARE_IMAGE_PATH);
    expect(serialized).not.toContain(`/og/writing/${DRAFT_SLUG}.png`);
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
      first: post('first'),
      second: post('second', { date: '2026-01-02' }),
    };

    expect(generateStaticParams()).toEqual([
      { slug: 'first' },
      { slug: 'second' },
    ]);
  });
});

describe('writing post structured data', () => {
  /**
   * An explicitly selected article image is not thrown away by the card: it
   * moves to the JSON-LD `image`, which is where a representative screenshot
   * belongs and where its real dimensions are wanted.
   */
  it('keeps an explicitly selected article image in the BlogPosting', async () => {
    state.posts = {
      illustrated: post('illustrated', {
        image: '/images/writing/api-costs.png',
        imageAlt: 'API costs for the month',
      }),
    };

    const blogPosting = await blogPostingFor('illustrated');

    expect(blogPosting.image).toMatchObject({
      url: `${SITE_URL}/images/writing/api-costs.png`,
      width: 1117,
      height: 812,
      caption: 'API costs for the month',
    });
  });

  it('falls back to the post card for a post with no article image', async () => {
    state.posts = { plain: post('plain') };

    const blogPosting = await blogPostingFor('plain');

    expect(blogPosting.image).toMatchObject({
      url: `${SITE_URL}/og/writing/plain.png`,
      width: SHARE_IMAGE_DIMENSIONS.width,
      height: SHARE_IMAGE_DIMENSIONS.height,
    });
  });

  it('renders a draft in development when its private images are absent', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    state.posts = {
      [DRAFT_SLUG]: post(DRAFT_SLUG, {
        title: DRAFT_TITLE,
        draft: true,
        // Deliberately absent from `public/`: a draft may reference an image
        // that has not been committed yet, and the page must still render.
        content: `Body copy.\n\n![Screenshot](/images/writing/${DRAFT_SLUG}/absent.png)\n`,
      }),
    };

    const markup = renderToStaticMarkup(
      await PostPage({ params: Promise.resolve({ slug: DRAFT_SLUG }) }),
    );

    expect(markup).toContain(DRAFT_TITLE);
    expect(markup).toContain('width="1200"');
    expect(markup).toContain('height="675"');
    expect(markup).not.toContain(`/og/writing/${DRAFT_SLUG}.png`);
  });
});
