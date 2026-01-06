import { describe, expect, it } from 'vitest';

import tools from '../resume/tools';

describe('tools data', () => {
  it('exports an array of tools', () => {
    expect(Array.isArray(tools)).toBe(true);
    expect(tools.length).toBeGreaterThan(0);
  });

  it('each tool has required properties', () => {
    for (const tool of tools) {
      expect(tool).toHaveProperty('name');
      expect(tool).toHaveProperty('link');

      expect(typeof tool.name).toBe('string');
      expect(typeof tool.link).toBe('string');
    }
  });

  it('tool links are non-empty', () => {
    for (const tool of tools) {
      expect(tool.link.trim().length).toBeGreaterThan(0);
    }
  });

  it('tool names are non-empty', () => {
    for (const tool of tools) {
      expect(tool.name.trim().length).toBeGreaterThan(0);
    }
  });

  it('links are valid URLs', () => {
    const urlRegex = /^https?:\/\/.+/;

    for (const tool of tools) {
      expect(tool.link).toMatch(urlRegex);
    }
  });

  it('has unique tool name', () => {
    const names = tools.map((c) => c.name);
    const uniqueNames = new Set(names);

    expect(uniqueNames.size).toBe(names.length);
  });
});
