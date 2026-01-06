/**
 * Shared utility functions and constants
 */

// Site configuration
export const SITE_URL = 'https://davidsass.eu';
export const AUTHOR_NAME = 'David Sass-Kovacs';
export const TWITTER_HANDLE = '@sassdavid14';

// Skill competency
export const MAX_COMPETENCY = 5;

/**
 * Formats a date string to a human-readable format.
 * Parses as UTC to avoid timezone shifts.
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  // Parse as UTC to avoid timezone shifts
  const date = new Date(`${dateStr}T12:00:00`);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
