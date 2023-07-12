import { FC, ReactNode } from 'react';
import { CSSProperties } from 'react';
import styles from '../table.module.sass';

interface TableContainerProps {
  children: ReactNode;
  style?: CSSProperties;
}

const TableContainer: FC<TableContainerProps> = ({ children, style }) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer} style={style}>
        {children}
      </div>
    </div>
  );
};
export default TableContainer;
