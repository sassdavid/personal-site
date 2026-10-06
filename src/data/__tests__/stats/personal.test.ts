import { describe, expect, it } from 'vitest';

import { COUNTRIES_VISITED, CURRENT_CITY } from '@/lib/telemetry';

import data from '../../stats/personal';

describe('personal stats data', () => {
  it('exports an array of stats', () => {
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('each stat has required properties', () => {
    for (const stat of data) {
      expect(stat).toHaveProperty('key');
      expect(stat).toHaveProperty('label');
      expect(typeof stat.label).toBe('string');
    }
  });

  it('declares the age without holding the readout that renders it', () => {
    // This file used to carry `'use client'` and a live `<Age />` component as
    // the value, which made every consumer of the declarations a client module.
    // The reading the server can render depends on when the build ran, so only
    // the renderer can supply it: the declaration names a key and nothing else.
    const ageStat = data.find((s) => s.key === 'age');

    expect(ageStat).toBeDefined();
    expect(ageStat!.label).toBe('Current age');
    expect(ageStat!.value).toBeUndefined();
    expect(ageStat!.source).toBe('profile');
  });

  it('has a countries visited stat', () => {
    const countriesStat = data.find((s) => s.key === 'countries');

    expect(countriesStat).toBeDefined();
    expect(countriesStat!.label).toBe('Countries visited');
    // Read from the shared profile rather than repeating the figure: the
    // hardcoded copy silently went stale the first time a country was added.
    expect(countriesStat!.value).toBe(COUNTRIES_VISITED);
  });

  it('has a current location stat', () => {
    const locationStat = data.find((s) => s.key === 'location');

    expect(locationStat).toBeDefined();
    expect(locationStat!.label).toBe('Current city');
    expect(locationStat!.value).toBe(CURRENT_CITY);
  });

  it('stays a plain data module with no React in it', () => {
    // The point of moving the readout out. If a declaration holds an element
    // again, the whole table becomes a client component again with it.
    for (const stat of data) {
      expect(typeof stat.value, stat.label).not.toBe('object');
    }
  });

  it('names the source of every reading', () => {
    for (const stat of data) {
      expect(stat.source, stat.label).toBe('profile');
    }
  });
});
