import { FC } from 'react';
import styles from './toggle.module.sass';

interface ToggleTypes {
  title: string;
  supTitle?: string;
  isChecked: boolean;
  toggleHandler: (value: boolean) => void;
}

const Toggle: FC<ToggleTypes> = ({
  title,
  supTitle,
  isChecked,
  toggleHandler,
}) => {
  return (
    <label className={styles.label}>
      <input
        className={styles.input}
        type="checkbox"
        checked={isChecked}
        onChange={() => toggleHandler(!isChecked)}
      />
      <span className={styles.toggle}></span>
      <span className={styles.supTitle}>{supTitle}</span>
      <span className={styles.title}>{title}</span>
    </label>
  );
};

export default Toggle;
