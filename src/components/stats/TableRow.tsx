import React from 'react';
import { TableRowProps } from '@/lib/types';

const TableRow = ({ value, label, link, format }: TableRowProps) => (
  <tr>
    <td width="70%">{label}</td>
    <td>
      {link ? (
        <a href={link} target="_blank" rel="nofollow noopener noreferrer">
          {format ? format(value) : value}
        </a>
      ) : format ? (
        format(value)
      ) : (
        value
      )}
    </td>
  </tr>
);

export default TableRow;
