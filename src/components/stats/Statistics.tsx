import React from 'react';
import Table from '@/components/stats/Table';
import { TableRowProps } from '@/lib/types';

const Statistics = ({
  title,
  data,
}: {
  title: string;
  data: TableRowProps[];
}) => (
  <div>
    <h3>{title}</h3>
    <Table data={data} />
  </div>
);

export default Statistics;
