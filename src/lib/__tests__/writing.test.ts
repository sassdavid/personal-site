import { beforeEach, describe, expect, it, vi } from 'vitest';

import { compareWritingItems, type WritingItem } from '../writing';

/**
 * Both inputs are mocked so these describe the merge itself — ordering,
 * URL shape, provenance — rather than asserting that this repository has
 * published anything. They pass with an empty `content/writing/` and keep
 * their meaning once it fills up.
 */
const state = vi.hoisted(() => ({
  posts: [] as {
    slug: string;
    title: string;
    date: string;
    description: string;
  }[],
  external: [] as {
    title: string;
    url: string;
    date: string;
    description: string;
  }[],
}));

vi.mock('@/lib/posts', () => ({
  getAllPosts: () => state.posts,
}));

vi.mock('@/data/writing', () => ({
  get default() {
    return state.external;
  },
}));

import { getWritingItems } from '../writing';

describe('getWritingItems', () => {
  beforeEach(() => {
    state.posts = [];
    state.external = [];
  });

  it('returns nothing when there is no writing at all', () => {
    expect(getWritingItems()).toEqual([]);
  });

  it('merges published local posts and external writing newest first', () => {
    state.posts = [
      {
        slug: 'local-older',
        title: 'Local Older',
        date: '2026-01-05',
        description: 'a',
      },
      {
        slug: 'local-newest',
        title: 'Local Newest',
        date: '2026-03-10',
        description: 'b',
      },
    ];
    state.external = [
      {
        title: 'External Middle',
        url: 'https://example.com/middle',
        date: '2026-02-01',
        description: 'c',
      },
    ];

    const items = getWritingItems();

    expect(items.some((item) => !item.isExternal)).toBe(true);
    expect(items.some((item) => item.isExternal)).toBe(true);
    expect(items.map((item) => item.title)).toEqual([
      'Local Newest',
      'External Middle',
      'Local Older',
    ]);
  });

  it('uses canonical trailing-slash URLs for local posts', () => {
    state.posts = [
      {
        slug: 'a-post',
        title: 'A Post',
        date: '2026-03-10',
        description: '',
      },
    ];

    const localItems = getWritingItems().filter((item) => !item.isExternal);

    expect(localItems.length).toBeGreaterThan(0);
    expect(localItems.every((item) => item.url.endsWith('/'))).toBe(true);
    expect(localItems.every((item) => item.url.startsWith('/writing/'))).toBe(
      true,
    );
    expect(localItems.every((item) => item.source === 'On this site')).toBe(
      true,
    );
  });

  it('derives a readable source from the external hostname', () => {
    state.external = [
      {
        title: 'Named Host',
        url: 'https://promptfoo.dev/blog/post',
        date: '2026-02-02',
        description: '',
      },
      {
        title: 'Bare Host',
        url: 'https://www.example.com/post',
        date: '2026-02-01',
        description: '',
      },
    ];

    expect(getWritingItems().map((item) => item.source)).toEqual([
      'Promptfoo',
      'example.com',
    ]);
  });

  it('sorts undated entries after dated ones', () => {
    state.external = [
      {
        title: 'Undated Guide',
        url: 'https://example.com/guide',
        date: '',
        description: '',
      },
      {
        title: 'Dated Article',
        url: 'https://example.com/article',
        date: '2026-02-01',
        description: '',
      },
    ];

    expect(getWritingItems().map((item) => item.title)).toEqual([
      'Dated Article',
      'Undated Guide',
    ]);
  });

  it('orders equal and undated entries deterministically', () => {
    const item = (
      title: string,
      date: string,
      url = `https://example.com/${title.toLowerCase()}`,
    ): WritingItem => ({
      title,
      date,
      url,
      description: '',
      isExternal: true,
      source: 'Example',
    });

    expect(
      [item('Zulu', ''), item('Alpha', '')].sort(compareWritingItems),
    ).toEqual([item('Alpha', ''), item('Zulu', '')]);
    expect(
      [item('Zulu', '2026-01-01'), item('Alpha', '2026-01-01')].sort(
        compareWritingItems,
      ),
    ).toEqual([item('Alpha', '2026-01-01'), item('Zulu', '2026-01-01')]);
  });
});
