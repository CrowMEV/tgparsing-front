import { FC, ReactNode } from 'react';
import styles from '../table.module.sass';

interface TableHeadProps {
  children: ReactNode;
}

const TableHead: FC<TableHeadProps> = ({ children }) => {
  return <thead className={styles.table__header}>{children}</thead>;
};

export default TableHead;
