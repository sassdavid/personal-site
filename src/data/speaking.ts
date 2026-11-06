/**
 * Public appearances: panels, talks, and demos with an organiser's listing.
 *
 * The record is credible only if a reader can check it, so every entry links
 * the organiser's own page for the session, and that page should name me.
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
export type AppearanceFormat = 'Panel' | 'Arsenal Lab';

export interface Appearance {
  /**
   * The session's own title, or the event's name when the session was a demo
   * of a tool rather than a titled talk.
   */
  title: string;
  format: AppearanceFormat;
  /** First day of the appearance, `YYYY-MM-DD`. */
  date: string;
  /** City, as a reader would place the event. */
  place: string;
  /** What the title and format leave out: the host, the event, who else. */
  desc: string;
  /** The organiser's listing for the session, naming me. */
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
