/**
 * Public appearances: panels, talks, and demos with an organiser's own record.
 *
 * The record is credible only if a reader can check it, so every entry links
 * the organiser's own page or post for the session, and it should name me.
 * Where an organiser's published lineup is stale, the entry says so in a
 * comment rather than linking something unofficial.
 *
 * Empty for now, and `/speaking` is `enabled: false` in `src/data/routes.ts`
 * until the first entry lands here.
 */

/**
 * The format as the organiser billed it. An Arsenal Lab is a hands-on tool
 * demonstration, not a talk; extend this union rather than stretch a label.
 */
export type AppearanceFormat = 'Panel' | 'Arsenal Lab' | 'Tech session';

export interface Appearance {
  /**
   * The session's own title, or the event's name when the session was a demo
   * of a tool or its host published no title.
   */
  title: string;
  format: AppearanceFormat;
  /** First day of the appearance, or of its event when no day is published. */
  date: string;
  /** City, as a reader would place the event. */
  place: string;
  /** What the title and format leave out: the host, the event, who else. */
  desc: string;
  /** The organiser's own record of the session, naming me. */
  link: string;
}

const appearances: Appearance[] = [];

/**
 * Newest first. Derived rather than relying on source order, the way the
 * résumé orders roles; ISO dates compare correctly as strings.
 */
export function getAppearances(): Appearance[] {
  return [...appearances].sort((a, b) => b.date.localeCompare(a.date));
}
