import { AUTHOR_NAME } from '@/lib/utils';

export interface Route {
  label: string;
  path: string;
  index?: boolean;
  primary?: boolean;
  /**
   * Set to `false` to keep a route defined but out of every menu.
   *
   * For sections whose page exists and builds but has no content yet: the
   * entry stays here so turning it back on is a one-word edit, rather than
   * having to reconstruct it. The page itself is still reachable by URL and
   * still listed in `app/sitemap.ts` — disabling only removes the links.
   */
  enabled?: boolean;
}

/** Every route the site knows about, including ones not currently surfaced. */
export const allRoutes: Route[] = [
  {
    index: true,
    label: AUTHOR_NAME,
    path: '/',
  },
  {
    label: 'About',
    path: '/about',
  },
  {
    label: 'Resume',
    path: '/resume',
  },
  {
    label: 'Writing',
    // No posts in content/writing/ and no entries in src/data/writing.ts yet.
    enabled: false,
    path: '/writing',
  },
  {
    label: 'Stats',
    path: '/stats',
  },
  {
    label: 'Contact',
    path: '/contact',
  },
  {
    label: 'Archive',
    // No entries in src/data/projects.ts yet.
    enabled: false,
    path: '/projects',
    primary: false,
  },
];

// Filtered once, here, rather than in Navigation, Hamburger and Footer
// separately — those three filters have drifted from each other before.
const routes: Route[] = allRoutes.filter((route) => route.enabled !== false);

export default routes;
