import React from 'react';
import YearCounter from '@/components/stats/YearCounter';
import { TableRowProps } from '@/lib/types';

const personalStats: TableRowProps[] = [
  {
    tableKey: 'age',
    label: 'Current age',
    value: <YearCounter fromDateString="1993-06-16T09:30:00" />,
  },
  {
    tableKey: 'currentjob',
    label: 'Years in my current job',
    value: <YearCounter fromDateString="2017-06-06T08:00:00" />,
    link: 'https://www.loxon.eu/',
  },
  {
    tableKey: 'coffe',
    label: 'Average cups of coffee per day',
    value: 4,
  },
  {
    tableKey: 'countries',
    label: 'Countries visited',
    value: 10,
  },
  {
    tableKey: 'location',
    label: 'Current location',
    value: 'Budapest, HU',
  },
];

export default personalStats;
