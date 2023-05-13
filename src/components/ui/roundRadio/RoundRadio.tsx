import { FC } from 'react';
import styles from './roundRadio.module.sass';

interface RadioTypes {
  title: string;
  name: string;
  value: string;
  currentValue: string;
  radioHandler: (value: string) => void;
}

const RoundRadio: FC<RadioTypes> = ({
  title,
  name,
  value,
  currentValue,
  radioHandler,
}) => {
  return (
    <label className={styles.roundRadio}>
      <input
        className={styles.radioInput}
        type="radio"
        name={name}
        value={value}
        checked={value === currentValue}
        onChange={(evt) => radioHandler(evt.target.value)}
      />
      <span className={styles.radioMark}></span>
      <span className={styles.radioTitle}>{title}</span>
    </label>
  );
};

export default RoundRadio;
