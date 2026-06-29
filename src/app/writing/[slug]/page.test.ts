import { describe, expect, it } from 'vitest';

import { generateMetadata } from './page';

describe('writing post metadata', () => {
  it('falls back to a not-found title for unknown slugs', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'does-not-exist' }),
    });

    expect(metadata.title).toBe('Post Not Found');
  });
});
