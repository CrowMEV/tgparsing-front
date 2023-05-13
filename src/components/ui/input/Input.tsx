import styles from './index.module.sass';
import { FC } from 'react';

const Input: FC<{ label: string }> = ({ label }) => {
  return (
    <div className={styles.input}>
      <div className={styles.input__field}>
        <input type="text" placeholder={label} />
      </div>
    </div>
  );
};

export default Input;
