import { FC } from 'react';
import styles from '../table.module.sass';

type TableTextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const TableTextInput: FC<TableTextInputProps> = ({
  type = 'text',
  value,
  onChange,
}) => {
  return (
    <input
      className={styles.filterInput}
      type={type}
      value={value}
      onChange={(e) => onChange?.(e)}
    />
  );
};

export default TableTextInput;
