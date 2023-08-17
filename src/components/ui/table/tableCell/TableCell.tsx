import { FC, ReactNode } from 'react';
import styles from '../table.module.sass';

interface TableCellProps
  extends React.TableHTMLAttributes<HTMLTableCellElement> {
  variant?: 'head' | 'body';
  children: ReactNode;
  colSpan?: number;
}

const TableCell: FC<TableCellProps> = ({
  variant = 'body',
  className,
  style,
  children,
  onClick,
  colSpan = 1,
}) => {
  if (variant === 'head')
    return (
      <th
        className={`${styles.table__headCell} ${className ? className : ''}`}
        style={style}
        colSpan={colSpan}
      >
        {children}
      </th>
    );
  return (
    <td
      className={`${styles.table__cell} ${className ? className : ''}`}
      style={style}
      onClick={onClick}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};
export default TableCell;
