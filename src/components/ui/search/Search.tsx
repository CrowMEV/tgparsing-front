import styles from './index.module.sass';
import { FC } from 'react';

type PropsType = {
  value: number;
  inputHandler: (amountReplenishment: number) => void;
};

const Search: FC<PropsType> = ({ value, inputHandler }) => {
  return (
    <div className={styles.search}>
      <input
        type="number"
        placeholder="Сумма пополнения"
        min="0"
        value={value === 0 ? '' : value}
        onChange={(evt) => inputHandler(Number(evt.target.value))}
      />
    </div>
  );
};

export default Search;
