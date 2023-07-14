import { FC, ReactNode } from 'react';
import styles from './table.module.sass';

interface TableProps {
  children: ReactNode;
}

const Table: FC<TableProps> = ({ children }) => {
  return <table className={styles.table}>{children}</table>;
};
export default Table;
