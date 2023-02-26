import dayjs from 'dayjs';

const data = [
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
    value: '1667',
    link: 'https://github.com/sassdavid/personal-site',
  },
];

export default data;
