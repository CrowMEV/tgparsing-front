import { FC } from 'react';
import styles from './checkbox.module.sass';

interface CheckboxTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  checkboxHandler: (value: any) => void;
  name: string;
  value: any;
}

const Checkbox: FC<CheckboxTypes> = ({ title, checkboxHandler, ...rest }) => {
  return (
    <label className={styles.checkBox}>
      <input
        type="checkbox"
        onChange={(evt) => checkboxHandler(evt)}
        {...rest}
      />
      <span className={styles.checkBoxMark}>
        {<span className="material-icons-outlined">check</span>}
      </span>
      <span>{title}</span>
    </label>
  );
};

export default Checkbox;
