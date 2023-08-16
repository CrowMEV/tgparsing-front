import { CSSProperties, FC, ReactNode } from 'react';
import styles from './table.module.sass';

interface TableProps {
  children: ReactNode;
  style?: CSSProperties;
}

const Table: FC<TableProps> = ({ children, style }) => {
  return (
    <table style={style} className={styles.table}>
      {children}
    </table>
  );
};
export default Table;
