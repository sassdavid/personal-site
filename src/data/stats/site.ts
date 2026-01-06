import dayjs from 'dayjs';

import { StatData } from '../../components/Stats/types';

/* Keys match keys returned by the github api. Fields without keys are
 * mostly jokes. To see everything returned by the github api, run:
 curl https://api.github.com/repos/sassdavid/personal-site
 */
const data: StatData[] = [
  {
    label: 'Stars this repository has on GitHub',
    key: 'stargazers_count',
    link: 'https://github.com/sassdavid/personal-site/stargazers',
  },
  {
    label: 'Number of people watching this repository',
    key: 'subscribers_count',
    link: 'https://github.com/sassdavid/personal-site/watchers',
  },
  {
    label: 'Number of forks',
    key: 'forks',
    link: 'https://github.com/sassdavid/personal-site/forks',
  },
  {
    label: 'Number of spoons',
    value: '0',
  },
  {
    label: 'Number of linter warnings',
    value: '0', // enforced via github workflow
  },
  {
    label: 'Open GitHub issues',
    key: 'open_issues_count',
    link: 'https://github.com/sassdavid/personal-site/issues',
  },
  {
    label: 'Last updated at',
    key: 'pushed_at',
    link: 'https://github.com/sassdavid/personal-site/commits',
    format: (x: unknown) => dayjs(x as string).format('MMMM DD, YYYY'),
  },
  {
    label: 'Lines of TypeScript powering this website',
    key: 'lines_of_code',
    value: process.env.NEXT_PUBLIC_NUMBER_OF_LINES || 'No data available',
    link: 'https://github.com/sassdavid/personal-site',
  },
];

export default data;
