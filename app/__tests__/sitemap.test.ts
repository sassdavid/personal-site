import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SITE_URL } from '@/lib/utils';

/**
 * The sitemap is a pure function of two inputs: which routes are enabled, and
 * which posts are published. Both are mocked so these tests describe the
 * mapping itself rather than whatever happens to be in `content/writing/`
 * today — they keep working through an empty repository and through a full
 * one, and they can exercise the disabled-route branch without needing a
 * section to actually be turned off in `src/data/routes.ts`.
 */
const state = vi.hoisted(() => ({
  posts: [] as { slug: string; date: string }[],
  writingEnabled: true,
}));

vi.mock('@/lib/posts', () => ({
  getAllPosts: () => state.posts,
}));

vi.mock('@/data/routes', () => ({
  get allRoutes() {
    return [
      { index: true, label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Resume', path: '/resume' },
      { label: 'Writing', path: '/writing', enabled: state.writingEnabled },
      { label: 'Stats', path: '/stats', primary: false },
      { label: 'Contact', path: '/contact' },
      { label: 'Archive', path: '/projects', primary: false, enabled: false },
    ];
  },
}));

import sitemap from '../sitemap';

describe('sitemap', () => {
  beforeEach(() => {
    state.posts = [];
    state.writingEnabled = true;
  });

  it('uses trailing slashes for exported page routes', () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const path of ['/', '/about/', '/resume/', '/stats/', '/contact/']) {
      expect(urls).toContain(`${SITE_URL}${path}`);
    }
  });

  it('does not invent modification dates for static pages', () => {
    const staticEntries = sitemap().filter(
      (entry) => !entry.url.startsWith(`${SITE_URL}/writing/`),
    );

    expect(
      staticEntries.every((entry) => entry.lastModified === undefined),
    ).toBe(true);
  });

  it('uses trailing slashes for post routes', () => {
    state.posts = [
      { slug: 'first-post', date: '2026-03-10' },
      { slug: 'second-post', date: '2026-01-02' },
    ];

    const postEntries = sitemap().filter(
      (entry) =>
        entry.url.startsWith(`${SITE_URL}/writing/`) &&
        entry.url !== `${SITE_URL}/writing/`,
    );

    expect(postEntries.map((entry) => entry.url)).toEqual([
      `${SITE_URL}/writing/first-post/`,
      `${SITE_URL}/writing/second-post/`,
    ]);
    expect(postEntries.every((entry) => entry.lastModified !== undefined)).toBe(
      true,
    );
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
