import React from 'react';
import TableRow from '@/components/stats/TableRow';
import { TableRowProps } from '@/lib/types';

const Table = ({ data }: { data: TableRowProps[] }) => (
  <table>
    <tbody>
      {data.map((tableRowData) => (
        <TableRow
          key={tableRowData.label}
          tableKey={tableRowData.tableKey}
          value={tableRowData.value}
          label={tableRowData.label}
          link={tableRowData.link}
          format={tableRowData.format}
        />
      ))}
    </tbody>
  </table>
);

export default Table;
