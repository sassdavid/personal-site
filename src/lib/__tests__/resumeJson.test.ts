import { describe, expect, it } from 'vitest';

import contact from '@/data/contact';
import profile from '@/data/profile.json';
import degrees from '@/data/resume/degrees';
import { categories, skills } from '@/data/resume/skills';
import tools from '@/data/resume/tools';
import work from '@/data/resume/work';
import { sortPositions } from '@/lib/career';
import {
  buildJsonResume,
  serializeJsonResume,
  TOOLS_SKILL_NAME,
  toPlainText,
} from '@/lib/resumeJson';
import { AUTHOR_NAME, SITE_URL } from '@/lib/utils';

/** Root properties JSON Resume v1.0.0 allows; the schema forbids the rest. */
const ROOT_KEYS =
  '$schema basics work volunteer education awards certificates publications skills languages interests references projects meta'.split(
    ' ',
  );

/** The schema's `iso8601` definition: YYYY, YYYY-MM, or YYYY-MM-DD. */
const ISO8601 =
  /^([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]|[1-2][0-9]{3}-[0-1][0-9]|[1-2][0-9]{3})$/;

const resume = buildJsonResume();

describe('toPlainText', () => {
  it.each([
    ["see <a href='https://example.com'>the docs</a>", 'see the docs'],
    [
      '[docs](https://example.com) **very** *good* `code`',
      'docs very good code',
    ],
    ['one\n    two\n\n  three ', 'one two three'],
    ['Trust &amp; Safety &#38; more', 'Trust & Safety & more'],
    // Scalar values at each side of the surrogate range.
    [
      '&#xD7FF;&#xE000;&#x10FFFF;',
      String.fromCodePoint(0xd7ff, 0xe000, 0x10ffff),
    ],
  ])('flattens %s', (input, expected) => {
    expect(toPlainText(input)).toBe(expected);
  });

  it.each([
    'the snake_case_name field',
    // The same literal is the positive case in
    // `scripts/__tests__/verify-export.test.ts`: what this conversion keeps, the
    // export gate has to accept.
    'latency < 50ms and throughput > 1k with Map<string, number>',
    // Invalid numeric entities must not throw or emit lone surrogates.
    'before &#1114112; after',
    'before &#x110000; after',
    'before &#99999999; after',
    'before &#xD800; after',
    'before &#xDFFF; after',
  ])('leaves alone: %s', (text) => {
    expect(toPlainText(text)).toBe(text);
  });
});

describe('json resume document', () => {
  it('declares the schema it conforms to and adds no root keys', () => {
    expect(resume.$schema).toBe(
      'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    );
    expect(ROOT_KEYS).toEqual(expect.arrayContaining(Object.keys(resume)));
  });

  it('builds basics from the shared profile facts', () => {
    expect(resume.basics).toMatchObject({
      name: AUTHOR_NAME,
      label: profile.role,
      email: profile.email,
      // The display city split at its comma, without asserting a country.
      location: { city: 'Budapest', region: 'HU' },
    });
  });

  it('lists every non-email contact as a profile with its handle', () => {
    expect(resume.basics.profiles).toHaveLength(
      contact.filter((item) => !item.link.startsWith('mailto:')).length,
    );
    expect(resume.basics.profiles).toContainEqual({
      network: 'GitHub',
      username: 'sassdavid',
      url: 'https://github.com/sassdavid',
    });
  });

  it('carries every position in résumé order, with no invented end date', () => {
    expect(resume.work.map((position) => position.name)).toEqual(
      sortPositions(work).map((position) => position.name),
    );
    expect(resume.work[0]).not.toHaveProperty('endDate');
    expect(resume.work[1].endDate).toBe('2025-06-30');
  });

  // Summaries are Markdown with inline anchors, so this reads the real prose.
  it('leaves no markup or uncollapsed whitespace anywhere in the prose', () => {
    const prose = resume.work.flatMap((position) => [
      position.summary ?? '',
      ...(position.highlights ?? []),
    ]);

    expect(prose.length).toBeGreaterThan(0);
    for (const text of prose) {
      expect(text).not.toMatch(/[<>]/);
      expect(text).not.toMatch(/\[[^\]]+\]\([^)]*\)/);
      expect(text).not.toMatch(/\s{2,}|[\n\r\t]/);
    }
  });

  it('uses schema-valid dates throughout', () => {
    for (const position of resume.work) {
      expect(position.startDate).toMatch(ISO8601);
      if (position.endDate) expect(position.endDate).toMatch(ISO8601);
    }
    for (const entry of resume.education) {
      expect(entry.endDate).toMatch(ISO8601);
    }
  });

  it('splits the degree string into studyType and area', () => {
    expect(resume.education).toHaveLength(degrees.length);
    expect(resume.education[0]).toMatchObject({
      institution: 'Széchenyi István Egyetem',
      area: 'Computer Science Engineer',
      endDate: '2019',
    });
    // No leading "M.S."-style abbreviation, so nothing is guessed at.
    expect(resume.education[0]).not.toHaveProperty('studyType');
  });

  // Fork: this résumé lists tools rather than coursework, so no degree
  // carries courses; tools are published as a final skill entry below.
  it('carries no coursework', () => {
    for (const entry of resume.education) {
      expect(entry).not.toHaveProperty('courses');
    }
  });

  it('groups skills by category with keywords ordered by competency', () => {
    const byCategory = resume.skills.filter(
      (skill) => skill.name !== TOOLS_SKILL_NAME,
    );

    expect(byCategory.map((skill) => skill.name)).toEqual(
      categories.map((category) => category.name),
    );

    for (const group of byCategory) {
      const expected = skills
        .filter((skill) => skill.category.includes(group.name))
        .map((skill) => skill.title);
      const competencies = group.keywords.map(
        (keyword) =>
          skills.find((skill) => skill.title === keyword)?.competency ?? 0,
      );

      expect([...group.keywords].sort()).toEqual([...expected].sort());
      expect(competencies).toEqual([...competencies].sort((a, b) => b - a));
    }
  });

  it('appends the tools section as one more skill entry, in data order', () => {
    expect(resume.skills.at(-1)).toEqual({
      name: TOOLS_SKILL_NAME,
      keywords: tools.map((tool) => tool.name),
    });
    expect(categories.map((category) => category.name)).not.toContain(
      TOOLS_SKILL_NAME,
    );
  });

  // Work dates describe employment, not edits to this document, and JSON Resume
  // makes `lastModified` optional.
  it('keeps the canonical file-like without inventing a modification date', () => {
    expect(resume.meta).toEqual({ canonical: `${SITE_URL}/resume.json` });
  });

  it('serializes to pretty-printed bytes that parse back', () => {
    const serialized = serializeJsonResume();

    expect(serialized).toMatch(/\n {2}"basics": \{[\s\S]*\n$/);
    expect(JSON.parse(serialized)).toEqual(resume);
  });
});
