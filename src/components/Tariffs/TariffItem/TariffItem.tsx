import { FC } from 'react';
import { Tariff } from '../../../mocks/tariffs';
import Button from '../../ui/button/Button';
import styles from './tariff-item.module.sass';

interface TariffItemProps {
  tariff: Tariff;
  buttonHandler: () => void;
}

const TariffItem: FC<TariffItemProps> = ({ tariff, buttonHandler }) => {
  return (
    <article className={styles.wrapper}>
      <h3 className={styles.title}>
        Тариф
        <br />
        <span className={styles.accent}>{tariff.title}</span>
      </h3>
      <div className={styles.info}>
        <h4 className={styles.subTitle}>Включает:</h4>
        <ul className={styles.infoList}>
          <li className={styles.infoItem}>
            одновременный парсинг - {tariff.simultaneousParsing}
          </li>
          <li className={styles.infoItem}>
            количество парсингов в день - {tariff.parsersPerDay}
          </li>
        </ul>
        <div>
          <h5>Способы сбора аудитории:</h5>
          <ul className={styles.infoList}>
            {tariff.parsingMethods.map((method) => (
              <li className={styles.infoItem} key={method}>
                {method}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.dealInfo}>
        <div className={styles.dealInfoItem}>
          <p className={styles.subTitle}>Срок действия</p>
          <p>
            <span className={styles.accent}>{tariff.period}</span>месяц
          </p>
        </div>
        <div className={styles.dealInfoItem}>
          <p className={styles.subTitle}>Стоимость</p>
          <p>
            <span className={styles.accent}>{tariff.price}</span>рублей
          </p>
        </div>
        <Button variant="accent" onClick={buttonHandler}>
          Оплатить тариф
        </Button>
      </div>
    </article>
  );
};
export default TariffItem;
