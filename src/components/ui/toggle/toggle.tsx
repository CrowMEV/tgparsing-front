import { ChangeEvent, FC } from 'react';
import styles from './toggle.module.sass';

interface ToggleTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  toggleHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Toggle: FC<ToggleTypes> = ({
  title,
  className,
  checked,
  toggleHandler,
  ...rest
}) => {
  return (
    <label className={`${styles.label} ${className}`}>
      <input
        className={styles.toggleInput}
        type="checkbox"
        checked={checked}
        onChange={(evt) => toggleHandler(evt)}
        {...rest}
      />
      <span className={styles.toggle}></span>
      {title && <span>{title}</span>}
    </label>
  );
};

export default Toggle;
