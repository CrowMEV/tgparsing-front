import { FC, ReactNode } from 'react';
import styles from '../table.module.sass';

interface TableBodyProps {
  children: ReactNode;
}

const TableBody: FC<TableBodyProps> = ({ children }) => {
  return <tbody className={styles.table__body}>{children}</tbody>;
};

export default TableBody;
