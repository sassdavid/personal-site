import { describe, expect, it } from 'vitest';

import { aboutMarkdown } from '../about';

describe('about data', () => {
  it('exports aboutMarkdown as a string', () => {
    expect(typeof aboutMarkdown).toBe('string');
    expect(aboutMarkdown.length).toBeGreaterThan(0);
  });

  it('contains the intro section', () => {
    expect(aboutMarkdown).toContain('# Intro');
    expect(aboutMarkdown).toContain('Loxon');
  });

  it('contains the likes section', () => {
    expect(aboutMarkdown).toContain('# I Like');
    expect(aboutMarkdown).toContain('Baking');
    expect(aboutMarkdown).toContain('Cooking');
  });

  it('contains the travel section', () => {
    expect(aboutMarkdown).toContain('# Travel / Geography');
    expect(aboutMarkdown).toContain('Eger');
  });

  it('contains the fun facts section', () => {
    expect(aboutMarkdown).toContain('# Fun Facts');
  });

  it('contains the dreams section', () => {
    expect(aboutMarkdown).toContain('# I Dream Of');
    expect(aboutMarkdown).toContain('Building infrastructure');
  });

  it('contains valid markdown links', () => {
    // Check for markdown link format [text](url)
    const linkRegex = /\[.+?\]\(.+?\)/g;
    const links = aboutMarkdown.match(linkRegex);

    expect(links).not.toBeNull();
    expect(links!.length).toBeGreaterThan(10);
  });

  /**
   * Links are plain markdown, so the safety attributes an outbound link needs
   * are applied by the `a` override in `components/About/Sections.tsx` rather
   * than written out here. What this file has to guarantee is that every link
   * is absolute and well-formed, since the override keys off the scheme.
   */
  it('writes outbound links as absolute urls', () => {
    const urls = [...aboutMarkdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(
      (match) => match[1],
    );

    expect(urls.length).toBeGreaterThan(0);

    for (const url of urls) {
      expect(url).toMatch(/^https?:\/\//);
      expect(() => new URL(url)).not.toThrow();
    }
  });

  it('contains properly formatted headers', () => {
    // Check for markdown headers
    const headerRegex = /^#+ .+$/gm;
    const headers = aboutMarkdown.match(headerRegex);

    expect(headers).not.toBeNull();
    expect(headers!.length).toBeGreaterThan(5);
  });
});
