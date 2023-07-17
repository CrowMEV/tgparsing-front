import { FC, ReactNode } from 'react';
import styles from '../table.module.sass';

interface TableCeilProps {
  variant?: 'head' | 'body';
  children: ReactNode;
}

const TableCeil: FC<TableCeilProps> = ({ variant = 'body', children }) => {
  if (variant === 'head') {
    return <th className={styles.table__headCeil}>{children}</th>;
  }
  return <td className={styles.table__ceil}>{children}</td>;
};
export default TableCeil;
