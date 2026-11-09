import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SITE_URL } from '@/lib/utils';

/**
 * Fork: the sitemap is a pure function of two inputs: which routes are
 * enabled, and which posts are published. Both are mocked so these tests
 * describe the mapping itself rather than whatever happens to be in
 * `content/writing/` today, and they can exercise the disabled-route branch
 * without needing a section to actually be turned off in `src/data/routes.ts`.
 */
const state = vi.hoisted(() => ({
  posts: [] as { slug: string; date: string }[],
  writingEnabled: true,
}));

vi.mock('@/lib/posts', () => ({
  getAllPosts: () => state.posts,
}));

vi.mock('@/data/routes', () => {
  const all = () => [
    { index: true, label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Resume', path: '/resume' },
    { label: 'Writing', path: '/writing', enabled: state.writingEnabled },
    { label: 'Stats', path: '/stats' },
    { label: 'Contact', path: '/contact' },
    { label: 'Projects', path: '/projects', enabled: false },
  ];
  return {
    get allRoutes() {
      return all();
    },
    get default() {
      return all().filter((route) => route.enabled !== false);
    },
  };
});

import sitemap from '../sitemap';

describe('sitemap', () => {
  beforeEach(() => {
    state.posts = [];
    state.writingEnabled = true;
  });

  it('does not invent modification dates for static pages', () => {
    const staticEntries = sitemap().filter(
      (entry) => !entry.url.startsWith(`${SITE_URL}/writing/`),
    );

    expect(
      staticEntries.every((entry) => entry.lastModified === undefined),
    ).toBe(true);
  });

  // A disabled section is linked from nowhere, so listing it here would hand
  // search engines a page with no content on it.
  it('omits disabled routes', () => {
    expect(sitemap().map((entry) => entry.url)).not.toContain(
      `${SITE_URL}/projects/`,
    );
  });

  // Dropping the index while leaving its posts behind would orphan them.
  it('omits children of a disabled section, not just its index', () => {
    state.writingEnabled = false;
    state.posts = [{ slug: 'first-post', date: '2026-03-10' }];

    const urls = sitemap().map((entry) => entry.url);

    expect(urls).not.toContain(`${SITE_URL}/writing/`);
    expect(urls).not.toContain(`${SITE_URL}/writing/first-post/`);
    expect(urls).toContain(`${SITE_URL}/about/`);
  });
});
