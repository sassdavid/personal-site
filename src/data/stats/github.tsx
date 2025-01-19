import dayjs from 'dayjs';
import { TableRowProps } from '@/lib/types';
import { config } from '@/lib/config';

const gitHubStats: TableRowProps[] = [
  {
    tableKey: 'stargazers_count',
    label: 'Stars this repository has on GitHub',
    value: null,
    link: 'https://github.com/sassdavid/personal-site/stargazers',
  },
  {
    tableKey: 'subscribers_count',
    label: 'Number of people watching this repository',
    value: null,
    link: 'https://github.com/sassdavid/personal-site/watchers',
  },
  {
    tableKey: 'forks',
    label: 'Number of forks',
    value: null,
    link: 'https://github.com/sassdavid/personal-site/forks',
  },
  {
    tableKey: 'open_issues_count',
    label: 'Open GitHub issues',
    value: null,
    link: 'https://github.com/sassdavid/personal-site/issues',
  },
  {
    tableKey: 'pushed_at',
    label: 'Last updated at',
    value: null,
    link: 'https://github.com/sassdavid/personal-site/commits',
    format: (x: any) => dayjs(x).format('MMMM DD HH:mm:ss, YYYY'),
  },
  {
    tableKey: 'lines_of_code',
    label: 'Lines of TypeScript powering this website',
    value: config.nrOfLines,
    link: 'https://github.com/sassdavid/personal-site',
  },
];

export default gitHubStats;
