export interface Skill {
  title: string;
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
