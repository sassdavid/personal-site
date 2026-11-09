import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getWritingItems } from '@/lib/writing';

/**
 * Posts and external entries are injected so these assert the feed's own
 * rules — canonical link shape, the file-like self link, and a lastBuildDate
 * taken from content rather than the clock — without needing anything to be
 * published in this repository.
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

import { GET } from '../route';

async function feed(): Promise<string> {
  const response = await GET();
  return response.text();
}

describe('feed.xml route', () => {
  beforeEach(() => {
    state.posts = [];
    state.external = [];
  });

  it('derives lastBuildDate from content rather than the build clock', async () => {
    state.posts = [
      {
        slug: 'older',
        title: 'Older',
        date: '2026-01-02',
        description: '',
      },
      {
        slug: 'newest',
        title: 'Newest',
        date: '2026-03-10',
        description: '',
      },
    ];

    const xml = await feed();

    // Derived from the content, so publishing something newer cannot fail it.
    // The noon timestamp is what still excludes the build clock: the route
    // builds every date as `${date}T12:00:00Z`, so a wall-clock value would
    // have to land on exactly 12:00:00 GMT to pass.
    const newest = getWritingItems().find((item) => item.date);
    const expected = new Date(`${newest?.date}T12:00:00Z`).toUTCString();

    expect(xml).toContain(`<lastBuildDate>${expected}</lastBuildDate>`);
  });

  // With nothing published there is no content date to use. The epoch is a
  // deliberate, stable stand-in — reaching for `new Date()` here would make
  // every build emit a different feed and defeat the test above.
  it('falls back to a fixed date when nothing is published', async () => {
    const xml = await feed();

    expect(xml).toContain(
      '<lastBuildDate>Thu, 01 Jan 1970 00:00:00 GMT</lastBuildDate>',
    );
    expect(xml).not.toContain('<item>');
  });

  it('escapes XML-significant characters in titles', async () => {
    state.posts = [
      {
        slug: 'escaping',
        title: 'Tools & "Tricks" <hr>',
        date: '2026-03-10',
        description: '',
      },
    ];

    const xml = await feed();

    expect(xml).toContain(
      '<title>Tools &amp; &quot;Tricks&quot; &lt;hr&gt;</title>',
    );
  });

  it('orders items newest first regardless of source', async () => {
    state.posts = [
      { slug: 'local', title: 'Local', date: '2026-01-05', description: '' },
    ];
    state.external = [
      {
        title: 'External',
        url: 'https://example.com/post',
        date: '2026-02-01',
        description: '',
      },
    ];

    const xml = await feed();

    expect(xml.indexOf('<title>External</title>')).toBeLessThan(
      xml.indexOf('<title>Local</title>'),
    );
  });
});
