import { FC } from 'react';
import styles from './checkbox.module.sass';

interface CheckboxTypes {
  title: string;
  isChecked: boolean;
  checkboxHandler: (value: boolean) => void;
}

const Checkbox: FC<CheckboxTypes> = ({ title, isChecked, checkboxHandler }) => {
  return (
    <label className={styles.checkBox}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => checkboxHandler(!isChecked)}
      />
      <span className={styles.checkBoxMark}>
        {isChecked && <span className="material-icons-outlined">check</span>}
      </span>
      <span>{title}</span>
    </label>
  );
};

export default Checkbox;
