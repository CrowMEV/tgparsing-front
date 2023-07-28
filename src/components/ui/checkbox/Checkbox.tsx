import { ChangeEvent, FC } from 'react';
import styles from './checkbox.module.sass';

interface CheckboxTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  checkboxHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<CheckboxTypes> = ({
  title,
  className,
  checkboxHandler,
  checked,
  ...rest
}) => {
  return (
    <label className={`${styles.checkbox} ${className ? className : ''}`}>
      <input
        className={styles.checkboxInput}
        type="checkbox"
        checked={checked}
        onChange={(evt) => checkboxHandler(evt)}
        {...rest}
      />
      <span className={styles.checkboxMark}></span>
      <span>{title}</span>
    </label>
  );
};

export default Checkbox;
