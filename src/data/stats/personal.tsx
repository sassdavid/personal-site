import React from 'react';
import { StatData } from '@/components/stats/types';
import YearCounter from '@/components/stats/YearCounter';

const data: StatData[] = [
  {
    key: 'age',
    label: 'Current age',
    value: <YearCounter fromDateString="1993-06-16T09:30:00" />,
  },
  {
    key: 'currentjob',
    label: 'Years in my current job',
    value: <YearCounter fromDateString="2017-06-06T08:00:00" />,
    link: 'https://www.loxon.eu/',
  },
  {
    key: 'coffe',
    label: 'Average cups of coffee per day',
    value: 4,
  },
  {
    key: 'countries',
    label: 'Countries visited',
    value: 10,
  },
  {
    key: 'location',
    label: 'Current location',
    value: 'Budapest, HU',
  },
];

export default data;
