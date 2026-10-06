/**
 * The register of things I have built.
 *
 * Two groups, both kept deliberately:
 *
 * - `shipped` — selected production work I built, led, or contributed
 *   to, and can be pointed at.
 * - `archive` — student-era experiments. A register that deletes its own
 *   history is a brochure, so these stay, stepped down rather than removed.
 *
 * Every shipped entry declares the role in `src/data/resume/work.ts` that
 * backs its dates and numeric claims. Archive entries are maintained here
 * directly. Those checks establish internal consistency; factual claims and
 * public destinations still need primary-source and live-link review.
 */
export type ProjectStatus = 'shipped' | 'archive';

export interface Project {
  title: string;
  /** Role, venue, or one-line positioning. Rendered as a mono label. */
  subtitle?: string;
  /**
   * Public destination for the work. Entries without one are rendered as
   * visibly inert rather than as cards that look clickable and are not.
   */
  link?: string;
  /** Résumé role that backs a shipped entry's dates and numeric claims. */
  sourceWork?: string;
  /**
   * Screenshot, where one exists. Optional: the card and the register row are
   * both designed to read on type and rules alone, so a new entry does not
   * need art invented for it.
   */
  image?: string;
  /**
   * ISO date my work on the project started, or a one-off shipped.
   * This is project activity, not necessarily a public launch date.
   */
  date: string;
  /** ISO date project activity ended. Omitted on one-offs and live work. */
  endDate?: string;
  /**
   * The project is still active. This is deliberately independent of the
   * historical role named by `subtitle`: a project can continue after an
   * acquisition or employment transition. Drives the amber `Present` reading
   * and is mutually exclusive with `endDate`.
   */
  ongoing?: boolean;
  desc: string;
  /** Technologies the résumé names for this work. Omitted when it names none. */
  tech?: string[];
  status: ProjectStatus;
}

// Empty for now. Add entries (and drop any images under public/images/projects/)
// and set `enabled` back on for `/projects` in src/data/routes.ts.
//
// Hand-ordered, most recent activity first within each group. Live work leads,
// then sorts by its own start date; finished work sorts by its end (or one-off)
// date. `projects.test.ts` pins the complete comparator, including ties.
const data: Project[] = [];

export default data;

/** The register: production work, most recent first. */
export const shipped = data.filter((project) => project.status === 'shipped');

/** Student-era history, most recent first. */
export const archive = data.filter((project) => project.status === 'archive');
