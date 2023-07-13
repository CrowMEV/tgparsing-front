import { ChangeEvent, FC } from 'react';
import styles from './roundRadio.module.sass';

interface RadioTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  currentValue: string;
  radioHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RoundRadio: FC<RadioTypes> = ({
  title,
  className,
  name,
  value,
  currentValue,
  radioHandler,
  ...rest
}) => {
  return (
    <label className={`${styles.roundRadio} ${className}`}>
      <input
        className={styles.radioInput}
        type="radio"
        name={name}
        value={value}
        checked={value === currentValue}
        onChange={(evt) => radioHandler(evt)}
        {...rest}
      />
      <span className={styles.radioMark}></span>
      <span>{title}</span>
    </label>
  );
};

export default RoundRadio;
