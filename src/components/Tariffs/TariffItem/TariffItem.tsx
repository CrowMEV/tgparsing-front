import { FC } from 'react';
import { Tariff } from '../../../types/tariff';
import Button from '../../ui/button/Button';
import styles from './tariff-item.module.sass';
import { ParsersTitles } from '../../../consts/tariffs';
import { DAY_ENDINGS, getWordEnding } from '../../../utils/getWordEnding';

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
        <span className={styles.accent}>{tariff.name}</span>
      </h3>
      <div className={styles.info}>
        <h4 className={styles.subTitle}>Включает:</h4>
        <ul className={styles.infoList}>
          <li className={styles.infoItem}>
            одновременный парсинг - {tariff.options.simultaneous_parsing}
          </li>
          <li className={styles.infoItem}>
            количество парсингов в день - {tariff.options.parsers_per_day}
          </li>
        </ul>
        <div>
          <h5>Способы сбора аудитории:</h5>
          <ul className={styles.infoList}>
            {tariff.options.members && (
              <li className={styles.infoItem}>{ParsersTitles.members[0]}</li>
            )}
            {tariff.options.activity && (
              <li className={styles.infoItem}>
                {ParsersTitles.activemembers[0]}
              </li>
            )}
            {tariff.options.geo && (
              <li className={styles.infoItem}>{ParsersTitles.geomembers[0]}</li>
            )}
          </ul>
        </div>
      </div>
      <div className={styles.dealInfo}>
        <div className={styles.dealInfoItem}>
          <p className={styles.subTitle}>Срок действия</p>
          <p>
            <span className={styles.accent}>{tariff.limitation_days}</span>
            {getWordEnding(tariff.limitation_days, DAY_ENDINGS)}
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
