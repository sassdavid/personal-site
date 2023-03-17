import dayjs from 'dayjs';

const data = [
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
    label: 'Open GitHub issues',
    key: 'open_issues_count',
    link: 'https://github.com/sassdavid/personal-site/issues',
  },
  {
    label: 'Last updated at',
    key: 'pushed_at',
    link: 'https://github.com/sassdavid/personal-site/commits',
    format: (x) => dayjs(x).format('MMMM DD HH:mm:ss, YYYY'),
  },
  {
    // TODO update this with a pre-commit hook
    /* find . | grep ".js" | grep -vE ".min.js|node_modules|.git|.json" |
    xargs -I file cat file | wc -l */
    label: 'Lines of Javascript powering this website',
    value: '1752',
    link: 'https://github.com/sassdavid/personal-site',
  },
];

export default data;
