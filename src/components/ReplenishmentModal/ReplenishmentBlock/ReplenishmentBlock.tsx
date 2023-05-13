import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { getCurrentUser } from '../../../store/user-process/selectors';

import styles from './replenishmentBlock.module.sass';
import { api } from '../../../store';
import Radio from '../../ui/radio/Radio';

const replenishmentWays = ['Банковская карта', 'Онлайн кошелек'];

const ReplenishmentBlock = () => {
  const userInfo = useAppSelector(getCurrentUser);
  const [amountReplenishment, setAmountReplenishment] = useState('');
  const [activeWay, setActiveWay] = useState(replenishmentWays[0]);

  const submitButtonHandler = async () => {
    try {
      await api.post('/profile', {
        userId: userInfo.id,
        value: amountReplenishment,
        replenishWay: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.balance}>
        <label>{userInfo.balance} ₽</label>
        <span>Текущий баланс</span>
      </div>
      <input
        className={styles.input}
        placeholder="Сумма пополнения"
        value={amountReplenishment}
        onChange={(e) => setAmountReplenishment(e.target.value)}
      />
      <div className={styles.replenishmentForm}>
        <h3>Способ пополнения</h3>
        <div className={styles.replenishmentWay}>
          {replenishmentWays.map((way) => (
            <Radio
              key={way}
              title={way}
              name="replenishmentWay"
              value={way}
              currentValue={activeWay}
              radioHandler={(value) => {
                setActiveWay(value);
              }}
            />
          ))}
        </div>
        <div className={styles.replenishBtn} onClick={submitButtonHandler}>
          <span className="material-icons-outlined">
            account_balance_wallet
          </span>
          <button>Оплатить</button>
        </div>
      </div>
    </div>
  );
};

export default ReplenishmentBlock;
