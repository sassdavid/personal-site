export interface Skill {
  title: string;
  competency: number;
  category: string[];
}

export interface Category {
  name: string;
  color: string;
  /** Pre-computed text color for contrast - 'dark' for light backgrounds, 'light' for dark */
  textColor: 'dark' | 'light';
}

const skills: Skill[] = [
  // Languages
  {
    title: 'Python',
    competency: 6,
    category: ['Languages'],
  },
  {
    title: 'TypeScript',
    competency: 7,
    category: ['Languages', 'Web Development'],
  },
  {
    title: 'JavaScript',
    competency: 6,
    category: ['Languages', 'Web Development'],
  },
  {
    title: 'Java',
    competency: 9,
    category: ['Languages', 'Backend & Frameworks'],
  },
  {
    title: 'Kotlin',
    competency: 5,
    category: ['Languages'],
  },
  {
    title: 'Bash',
    competency: 7,
    category: ['Languages'],
  },
  {
    title: 'SQL',
    competency: 7,
    category: ['Languages', 'Databases'],
  },
  {
    title: 'HTML + SASS/SCSS/CSS',
    competency: 4,
    category: ['Web Development'],
  },
  {
    title: 'Node.js',
    competency: 6,
    category: ['Web Development', 'Backend & Frameworks'],
  },
  {
    title: 'Angular',
    competency: 6,
    category: ['Web Development'],
  },
  {
    title: 'Spring Framework',
    competency: 7,
    category: ['Backend & Frameworks'],
  },
  {
    title: 'Spring Boot',
    competency: 7,
    category: ['Backend & Frameworks'],
  },
  {
    title: 'MSSQL',
    competency: 4,
    category: ['Databases'],
  },
  {
    title: 'Oracle',
    competency: 7,
    category: ['Databases'],
  },
  {
    title: 'MySQL/MariaDB',
    competency: 6,
    category: ['Databases'],
  },
  {
    title: 'Redshift',
    competency: 6,
    category: ['Databases', 'Cloud & Infrastructure'],
  },
  {
    title: 'MongoDB',
    competency: 7,
    category: ['Databases'],
  },
  {
    title: 'Amazon Web Services',
    competency: 8,
    category: ['Cloud & Infrastructure'],
  },
  {
    title: 'Terraform',
    competency: 8,
    category: ['Cloud & Infrastructure', 'DevOps'],
  },
  {
    title: 'Terragrunt',
    competency: 7,
    category: ['Cloud & Infrastructure', 'DevOps'],
  },
  {
    title: 'CloudFormation',
    competency: 5,
    category: ['Cloud & Infrastructure'],
  },
  {
    title: 'Git/Bitbucket/Gerrit',
    competency: 9,
    category: ['DevOps'],
  },
  {
    title: 'Kubernetes',
    competency: 8,
    category: ['Cloud & Infrastructure', 'DevOps'],
  },
  {
    title: 'Helm',
    competency: 8,
    category: ['Cloud & Infrastructure', 'DevOps'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

/**
 * Category colors with pre-computed text contrast.
 * Uses CSS custom properties defined in colors.css for runtime styling,
 * with textColor pre-computed from the hex values for accessibility.
 *
 * Blue and purple theme with distinct shades - all use light text for good contrast
 * Categories are sorted alphabetically and assigned colors in order:
 * 1=Backend&Frameworks, 2=Cloud&Infrastructure, 3=Databases, 4=DevOps, 5=Languages, 6=Web Development
 *
 * Hex values from colors.css @theme block:
 * --color-skill-1: #6366f1 (Indigo)
 * --color-skill-2: #2563eb (Royal Blue)
 * --color-skill-3: #06b6d4 (Turquoise)
 * --color-skill-4: #a855f7 (Bright Purple)
 * --color-skill-5: #1e40af (Navy Blue)
 * --color-skill-6: #38bdf8 (Sky Blue)
 */
const CATEGORY_COLORS: { color: string; textColor: 'dark' | 'light' }[] = [
  { color: 'var(--color-skill-1)', textColor: 'light' }, // Indigo - Backend & Frameworks
  { color: 'var(--color-skill-2)', textColor: 'light' }, // Royal Blue - Cloud & Infrastructure
  { color: 'var(--color-skill-3)', textColor: 'light' }, // Turquoise - Databases
  { color: 'var(--color-skill-4)', textColor: 'light' }, // Bright Purple - DevOps
  { color: 'var(--color-skill-5)', textColor: 'light' }, // Navy Blue - Languages
  { color: 'var(--color-skill-6)', textColor: 'light' }, // Sky Blue - Web Development
];

// Fallback colors for categories beyond the predefined set (blue/purple theme)
const FALLBACK_COLORS: { color: string; textColor: 'dark' | 'light' }[] = [
  { color: '#60a5fa', textColor: 'light' }, // Light blue
  { color: '#818cf8', textColor: 'light' }, // Light indigo
  { color: '#a78bfa', textColor: 'light' }, // Light purple
  { color: '#06b6d4', textColor: 'light' }, // Cyan
  { color: '#3b82f6', textColor: 'light' }, // Blue
];

/**
 * Build categories from skills with type-safe color assignment.
 * Logs a warning in development if there are more categories than colors.
 */
function buildCategories(skillsList: Skill[]): Category[] {
  const uniqueCategories = Array.from(
    new Set(skillsList.flatMap(({ category }) => category)),
  ).sort();

  const allColors = [...CATEGORY_COLORS, ...FALLBACK_COLORS];

  if (
    process.env.NODE_ENV === 'development' &&
    uniqueCategories.length > allColors.length
  ) {
    console.warn(
      `[skills.ts] Warning: ${uniqueCategories.length} categories but only ${allColors.length} colors defined`,
    );
  }

  return uniqueCategories.map((category, index) => {
    const colorConfig = allColors[index] ?? {
      color: '#888888',
      textColor: 'light' as const,
    };
    return {
      name: category,
      color: colorConfig.color,
      textColor: colorConfig.textColor,
    };
  });
}

const categories: Category[] = buildCategories(skills);

export { categories, skills };
