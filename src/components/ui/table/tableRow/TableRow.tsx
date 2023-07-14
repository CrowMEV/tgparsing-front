import { FC, ReactNode } from 'react';
import styles from '../table.module.sass';

interface TableRow {
  children: ReactNode;
}

const TableRow: FC<TableRow> = ({ children }) => {
  return <tr className={styles.table__row}>{children}</tr>;
};
export default TableRow;
