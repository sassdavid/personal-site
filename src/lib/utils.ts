/**
 * Shared utility functions and constants
 */

// Site configuration
export const SITE_URL = 'https://sasskovacs.dev';
export const AUTHOR_NAME = 'David Sass-Kovacs';
export const TWITTER_HANDLE = '@sassdavid14';
export const SITE_IMAGE_PATH = '/images/me.jpg';
export const SITE_IMAGE_DIMENSIONS = {
  width: 256,
  height: 256,
} as const;

// Canonical one-line bio, shared across page metadata, OpenGraph, and JSON-LD.
export const SITE_DESCRIPTION =
  'Senior DevOps Engineer specializing in cloud infrastructure and automation, currently at Loxon Solutions.';

// Image dimension constants
export const PROJECT_IMAGE = {
  width: 600,
  height: 400,
} as const;

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
