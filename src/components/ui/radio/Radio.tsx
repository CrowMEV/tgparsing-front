import { FC } from 'react';
import styles from './radio.module.sass';

interface RadioTypes {
  title: string;
  name: string;
  value: string;
  currentValue: string;
  radioHandler: (value: string) => void;
}

const Radio: FC<RadioTypes> = ({
  title,
  name,
  value,
  currentValue,
  radioHandler,
}) => {
  return (
    <>
      <input
        id={`${value}-radio`}
        className={styles.radioInput}
        type="radio"
        name={name}
        checked={value === currentValue}
        value={value}
        onChange={(evt) => radioHandler(evt.target.value)}
      />
      <label className={styles.radioLabel} htmlFor={`${value}-radio`}>
        {title}
      </label>
    </>
  );
};

export default Radio;
