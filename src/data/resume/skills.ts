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
    category: ['Languages'],
  },
  {
    title: 'JavaScript',
    competency: 3,
    category: ['Languages'],
  },
  {
    title: 'Java',
    competency: 5,
    category: ['Languages'],
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
    category: ['Databases'],
  },
  {
    title: 'HTML + SASS/SCSS/CSS',
    competency: 3,
    category: ['Web Development'],
  },
  {
    title: 'Node.js',
    competency: 3,
    category: ['Backend & Frameworks'],
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
    category: ['Databases'],
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
    category: ['Cloud & Infrastructure'],
  },
  {
    title: 'Terragrunt',
    competency: 4,
    category: ['Cloud & Infrastructure'],
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
    category: ['DevOps'],
  },
  {
    title: 'Helm',
    competency: 5,
    category: ['DevOps'],
  },
];

export { skills };
