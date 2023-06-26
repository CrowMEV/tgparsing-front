import Button from '../ui/button/Button';
import styles from './parser-bar.module.sass';

const ParserBar = () => {
  return (
    <div className={styles.parserBar}>
      <ul className={styles.info}>
        <li>
          <div className={styles.info__title}>Название тарифа:</div>
          <div className={styles.info__value}>Стандарт</div>
        </li>
        <li>
          <div className={styles.info__title}>Действует до:</div>
          <div className={styles.info__value}>31.01.2024</div>
        </li>
        <li>
          <div className={styles.info__title}>Предусмотрено:</div>
          <div className={styles.info__value}>150 парсеров</div>
        </li>
        <li>
          <div className={styles.info__title}>Использовано:</div>
          <div className={styles.info__value}>30 парсеров</div>
        </li>
        <li>
          <div className={styles.info__title}>Доступно:</div>
          <div className={styles.info__value}>120 парсеров</div>
        </li>
      </ul>
      <Button variant="small" style={{ backgroundColor: '#2B3243' }}>
        Оплатить тариф
      </Button>
    </div>
  );
};
export default ParserBar;
