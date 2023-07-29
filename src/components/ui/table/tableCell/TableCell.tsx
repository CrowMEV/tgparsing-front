import { FC, ReactNode } from 'react';
import styles from '../table.module.sass';

interface TableCellProps
  extends React.TableHTMLAttributes<HTMLTableCellElement> {
  variant?: 'head' | 'body';
  children: ReactNode;
}

const TableCell: FC<TableCellProps> = ({
  variant = 'body',
  className,
  children,
  onClick,
}) => {
  if (variant === 'head') {
    return (
      <th className={`${styles.table__headCell} ${className ? className : ''}`}>
        {children}
      </th>
    );
  }
  return (
    <td
      className={`${styles.table__cell} ${className ? className : ''}`}
      onClick={onClick}
    >
      {children}
    </td>
  );
};
export default TableCell;
