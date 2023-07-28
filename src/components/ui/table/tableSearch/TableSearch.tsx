import { FC } from 'react';
import styles from '../table.module.sass';
import { ReactComponent as FilterIcon } from '../../../../assets/images/icons/filter-icon.svg';
import { ReactComponent as FilterClosedIcon } from '../../../../assets/images/icons/filter-icon-close.svg';

interface TableSearchProps {
  title: string;
  isActive: boolean;
  value: string;
  showSearchHandler: (value: boolean) => void;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableSearch: FC<TableSearchProps> = ({
  title,
  isActive,
  value,
  showSearchHandler,
  onChange,
}) => {
  return (
    <div className={styles.searchWrapper}>
      <div
        className={styles.searchLabel}
        onClick={() => showSearchHandler(!isActive)}
      >
        <span>{title}</span>
        <span>{isActive ? <FilterIcon /> : <FilterClosedIcon />}</span>
      </div>
      {isActive && (
        <input
          className={styles.searchInput}
          type="text"
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};
export default TableSearch;
