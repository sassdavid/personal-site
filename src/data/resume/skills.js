const skills = [
  {
    title: 'Python',
    competency: 6,
    category: ['Languages'],
  },
  {
    title: 'C#',
    competency: 2,
    category: ['Languages'],
  },
  {
    title: 'Java',
    competency: 9,
    category: ['Languages', 'JDK'],
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
    category: ['Languages', 'SQL'],
  },
  {
    title: 'Javascript',
    competency: 6,
    category: ['Web Development', 'Languages', 'Javascript'],
  },
  {
    title: 'Typescript',
    competency: 6,
    category: ['Web Development', 'Languages', 'Javascript'],
  },
  {
    title: 'HTML + SASS/SCSS/CSS',
    competency: 4,
    category: ['Web Development', 'Languages'],
  },
  {
    title: 'Node.JS',
    competency: 6,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'Angular',
    competency: 6,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'Spring Framework',
    competency: 7,
    category: ['Framework', 'Spring'],
  },
  {
    title: 'Spring Boot',
    competency: 7,
    category: ['Framework', 'Spring'],
  },
  {
    title: 'MSSQL',
    competency: 4,
    category: ['Databases', 'SQL'],
  },
  {
    title: 'Oracle',
    competency: 7,
    category: ['Databases', 'SQL'],
  },
  {
    title: 'MySQL/MariaDB',
    competency: 6,
    category: ['Databases', 'SQL'],
  },
  {
    title: 'Redshift',
    competency: 6,
    category: ['Databases', 'SQL', 'AWS'],
  },
  {
    title: 'MongoDB',
    competency: 7,
    category: ['Databases', 'NoSQL'],
  },
  {
    title: 'Amazon Web Services',
    competency: 8,
    category: ['AWS', 'Tools'],
  },
  {
    title: 'Terraform',
    competency: 8,
    category: ['AWS', 'Tools'],
  },
  {
    title: 'Terragrunt',
    competency: 7,
    category: ['AWS', 'Tools'],
  },
  {
    title: 'CloudFormation',
    competency: 5,
    category: ['AWS', 'Tools'],
  },
  {
    title: 'Git/Bitbucket/Gerrit',
    competency: 9,
    category: ['Tools'],
  },
  {
    title: 'Kubernetes',
    competency: 8,
    category: ['Tools'],
  },
  {
    title: 'Helm',
    competency: 8,
    category: ['Tools'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

const colors = [
  '#16cdd2',
  '#37b1f5',
  '#2987b7',
  '#515dd4',
  '#5a6db9',
  '#43259d',
  '#27a7ce',
  '#3726cc',
  '#5643de',
  '#1b2494',
  '#1530e0',
  '#108ede',
];

const categories = [
  ...new Set(skills.flatMap(({ category }) => category)),
].sort().map((category, index) => ({
  name: category,
  color: colors[index],
}));

export { categories, skills };
