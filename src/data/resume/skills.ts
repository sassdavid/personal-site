export interface Skill {
  title: string;
  /**
   * Proficiency on a 1–`MAX_COMPETENCY` scale (see `src/lib/utils.ts`).
   *
   * This has to stay within that bound: `SkillTag` renders it verbatim as
   * "proficiency N out of 5" in `title` and `aria-label`, so an out-of-range
   * value is read aloud as nonsense rather than being clamped. Only 3, 4 and
   * 5 are meaningful — those are the three sizes `SkillTag` draws.
   */
  competency: number;
  category: string[];
}

export interface Category {
  name: string;
  color: string;
}

const skills: Skill[] = [
  // Languages
  {
    title: 'Python',
    competency: 3,
    category: ['Languages'],
  },
  {
    title: 'TypeScript',
    competency: 4,
    category: ['Languages', 'Web Development'],
  },
  {
    title: 'JavaScript',
    competency: 3,
    category: ['Languages', 'Web Development'],
  },
  {
    title: 'Java',
    competency: 5,
    category: ['Languages', 'Backend & Frameworks'],
  },
  {
    title: 'Kotlin',
    competency: 3,
    category: ['Languages'],
  },
  {
    title: 'Bash',
    competency: 4,
    category: ['Languages'],
  },
  {
    title: 'SQL',
    competency: 4,
    category: ['Languages', 'Databases'],
  },
  {
    title: 'HTML + SASS/SCSS/CSS',
    competency: 3,
    category: ['Web Development'],
  },
  {
    title: 'Node.js',
    competency: 3,
    category: ['Web Development', 'Backend & Frameworks'],
  },
  {
    title: 'Angular',
    competency: 3,
    category: ['Web Development'],
  },
  {
    title: 'Spring Framework',
    competency: 4,
    category: ['Backend & Frameworks'],
  },
  {
    title: 'Spring Boot',
    competency: 4,
    category: ['Backend & Frameworks'],
  },
  {
    title: 'MSSQL',
    competency: 3,
    category: ['Databases'],
  },
  {
    title: 'Oracle',
    competency: 4,
    category: ['Databases'],
  },
  {
    title: 'MySQL/MariaDB',
    competency: 3,
    category: ['Databases'],
  },
  {
    title: 'Redshift',
    competency: 3,
    category: ['Databases', 'Cloud & Infrastructure'],
  },
  {
    title: 'MongoDB',
    competency: 4,
    category: ['Databases'],
  },
  {
    title: 'Amazon Web Services',
    competency: 5,
    category: ['Cloud & Infrastructure'],
  },
  {
    title: 'Terraform',
    competency: 5,
    category: ['Cloud & Infrastructure', 'DevOps'],
  },
  {
    title: 'Terragrunt',
    competency: 4,
    category: ['Cloud & Infrastructure', 'DevOps'],
  },
  {
    title: 'CloudFormation',
    competency: 3,
    category: ['Cloud & Infrastructure'],
  },
  {
    title: 'Git/Bitbucket/Gerrit',
    competency: 5,
    category: ['DevOps'],
  },
  {
    title: 'Kubernetes',
    competency: 5,
    category: ['Cloud & Infrastructure', 'DevOps'],
  },
  {
    title: 'Helm',
    competency: 5,
    category: ['Cloud & Infrastructure', 'DevOps'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

/**
 * Build categories from skills, all using the accent color token.
 */
function buildCategories(skillsList: Skill[]): Category[] {
  const uniqueCategories = Array.from(
    new Set(skillsList.flatMap(({ category }) => category)),
  ).sort();

  return uniqueCategories.map((category) => ({
    name: category,
    color: 'var(--color-accent)',
  }));
}

const categories: Category[] = buildCategories(skills);

export { categories, skills };
