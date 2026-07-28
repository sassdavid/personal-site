import { MetadataRoute } from 'next';

import { allRoutes } from '@/data/routes';
import { getAllPosts } from '@/lib/posts';
import { SITE_URL } from '@/lib/utils';

export const dynamic = 'force-static';

/**
 * URL prefixes belonging to routes disabled in `src/data/routes.ts`.
 *
 * A disabled section is linked from nowhere, so advertising it here would
 * invite search engines to index a page with no content on it. Matching by
 * prefix also drops that section's children — posts under a disabled
 * `/writing/`, say — rather than leaving them orphaned in the sitemap.
 */
function disabledPrefixes(): string[] {
  return allRoutes
    .filter((route) => route.enabled === false)
    .map((route) => `${SITE_URL}${route.path}/`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Generate entries for blog posts
  const posts = getAllPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/writing/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const excluded = disabledPrefixes();

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about/`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/resume/`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects/`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/writing/`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/stats/`,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact/`,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...postEntries,
  ];

  return entries.filter(
    (entry) => !excluded.some((prefix) => entry.url.startsWith(prefix)),
  );
}
