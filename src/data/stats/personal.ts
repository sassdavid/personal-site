import type { StatDeclaration } from '@/lib/readings';
import { COUNTRIES_VISITED, CURRENT_CITY } from '@/lib/telemetry';

/**
 * All three are `source: 'profile'`: they are facts typed into
 * `src/data/profile.json`, not counted from anything. The age readout is
 * computed rather than typed, but the datum it is computed from — the birth
 * instant — is still a profile entry, and that is what the mark is telling the
 * reader.
 *
 * `age` declares a key and no value. This file used to carry a `'use client'`
 * directive so it could hold the live readout as a React element, which dragged
 * the declarations, `resolveReadings`, `Table`, and `TableRow` into the client
 * bundle behind it. The element is supplied by
 * `src/components/Stats/Personal.tsx` now, because the reading the server can
 * render depends on when the build ran and only the renderer knows that.
 *
 * No `unit` on the countries count: `13 countries` beside `Countries visited`
 * says nothing the label has not already said.
 */
const data: StatDeclaration[] = [
  {
    key: 'age',
    label: 'Current age',
    source: 'profile',
  },
  {
    key: 'countries',
    label: 'Countries visited',
    value: COUNTRIES_VISITED,
    source: 'profile',
  },
  {
    key: 'location',
    label: 'Current city',
    value: CURRENT_CITY,
    source: 'profile',
  },
];

export default data;
