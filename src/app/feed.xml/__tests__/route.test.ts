import { describe, expect, it } from 'vitest';

import { SITE_URL } from '@/lib/utils';

import { GET } from '../route';

describe('feed.xml route', () => {
  it('points the channel at the canonical trailing-slash writing page', async () => {
    const response = await GET();
    const xml = await response.text();

    expect(xml).toContain(`${SITE_URL}/writing/`);
  });

  it('keeps the feed self link file-like', async () => {
    const response = await GET();
    const xml = await response.text();

    expect(xml).toContain(`${SITE_URL}/feed.xml`);
    expect(xml).not.toContain(`${SITE_URL}/feed.xml/`);
  });

  it('serves an RSS document', async () => {
    const response = await GET();
    const xml = await response.text();

    expect(response.headers.get('Content-Type')).toContain(
      'application/rss+xml',
    );
    expect(xml).toContain('<rss version="2.0"');
  });
});
