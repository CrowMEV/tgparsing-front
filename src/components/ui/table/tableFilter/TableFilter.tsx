import { FC, ReactNode } from 'react';
import styles from '../table.module.sass';
import { ReactComponent as FilterIcon } from '../../../../assets/images/icons/filter-icon.svg';
import { ReactComponent as FilterClosedIcon } from '../../../../assets/images/icons/filter-icon-close.svg';

interface TableFilterProps {
  title: string;
  isActive: boolean;
  setActive: (value: boolean) => void;
  children: ReactNode;
}

const TableFilter: FC<TableFilterProps> = ({
  title,
  isActive,
  setActive,
  children,
}) => {
  return (
    <div className={styles.filterWrapper}>
      <div className={styles.filterLabel} onClick={() => setActive(!isActive)}>
        <span>{title}</span>
        <span>{isActive ? <FilterIcon /> : <FilterClosedIcon />}</span>
      </div>
      {isActive && children}
    </div>
  );
};

export default TableFilter;
