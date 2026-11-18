import { afterEach, expect, it, vi } from 'vitest';

import type { WritingEntry } from '@/data/writing';
import { SITE_URL } from '@/lib/utils';
import { getWritingItems } from '../writing';

const data = vi.hoisted(() => ({ entries: [] as WritingEntry[] }));
vi.mock('@/data/writing', () => ({
  get default() {
    return data.entries;
  },
}));

// Fork: content/writing/ is empty here, so one post is injected for the
// post-address case.
const POST_SLUG = 'a-published-post';
vi.mock('@/lib/posts', () => ({
  getAllPosts: () => [
    {
      slug: POST_SLUG,
      title: 'A published post',
      date: '2026-01-10',
      description: 'A description.',
    },
  ],
}));

const entry = (url: string, date = '2026-01-15'): WritingEntry => ({
  title: `Entry at ${url}`,
  url,
  date,
  description: 'A description.',
});

afterEach(() => {
  data.entries = [];
});

// Each would publish wrong: "Invalid Date", a date rolled into March, or two
// feed items with one guid.
it.each([
  [
    'a malformed date',
    () => [entry('https://a.example/', 'January 5')],
    /real YYYY-MM-DD/,
  ],
  [
    'an impossible date',
    () => [entry('https://a.example/', '2026-02-30')],
    /real YYYY-MM-DD/,
  ],
  [
    'one address twice',
    () => [
      entry('https://a.example/'),
      entry('https://a.example/', '2025-01-01'),
    ],
    /lists https:\/\/a\.example\/ twice/,
  ],
  [
    "a post's own address",
    () => [entry(`${SITE_URL}/writing/${POST_SLUG}/`)],
    /twice/,
  ],
])('stops the build on %s', (_, entries, message) => {
  data.entries = entries();

  expect(() => getWritingItems()).toThrow(message);
});
