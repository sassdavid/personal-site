import React from 'react';

import TableRow from '@/components/stats/TableRow';
import { TableProps } from '@/components/stats/types';

const Table: React.FC<TableProps> = ({ data }) => (
  <table>
    <tbody>
      {data.map((pair) => (
        <TableRow
          format={pair.format}
          key={pair.label}
          label={pair.label}
          link={pair.link}
          value={pair.value}
        />
      ))}
    </tbody>
  </table>
);

export default Table;
