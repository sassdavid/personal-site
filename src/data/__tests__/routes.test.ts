import { describe, expect, it } from 'vitest';

import routes, { allRoutes } from '../routes';

describe('routes', () => {
  it('has exactly one index route, at the root', () => {
    expect(routes.filter((route) => route.index)).toMatchObject([
      { path: '/' },
    ]);
  });

  it('has unique labels and unique paths that start at the root', () => {
    const paths = routes.map((route) => route.path);
    const labels = routes.map((route) => route.label);

    expect(paths.every((path) => path.startsWith('/'))).toBe(true);
    expect(new Set(paths).size).toBe(paths.length);
    expect(new Set(labels).size).toBe(labels.length);
  });

  // A secondary route is reachable only through the footer, which `/contact`
  // hides, so dropping one from the primary nav has to be a deliberate edit.
  it('pins which destinations are primary and which are not', () => {
    const paths = (primary: boolean) =>
      routes
        .filter(
          (route) => !route.index && (route.primary !== false) === primary,
        )
        .map((route) => route.path);

    // Fork: `/stats` is primary here, and the disabled sections below are
    // primary too but absent from the rendered set until they have content.
    expect(paths(true).join(' ')).toBe('/about /resume /stats /contact');
    expect(paths(false)).toEqual([]);
  });

  // Disabled entries stay in `allRoutes` so re-enabling them is a one-word
  // edit, but the default export is what every menu renders.
  it('keeps disabled routes defined but out of the rendered set', () => {
    const disabled = allRoutes
      .filter((route) => route.enabled === false)
      .map((route) => route.path);

    expect(disabled).toEqual(['/projects', '/writing', '/speaking']);
    for (const path of disabled) {
      expect(routes.map((route) => route.path)).not.toContain(path);
    }
  });
});
