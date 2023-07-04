import { useState } from 'react';
import ModalWindow from '../../ui/modal-window/ModalWindow';
import styles from './tariff-info.module.sass';
import Button from '../../ui/button/Button';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../router/routes';

const TariffInfo = () => {
  const [tariffDetailIsOpened, setTariffDetailIsOpened] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <p className={styles.info}>
        Вам доступно: <span className={styles.infoAccent}>120</span> парсеров
      </p>
      <button
        className={styles.infoButton}
        onClick={() => setTariffDetailIsOpened(true)}
      >
        Подробнее о текущем состоянии тарифа
      </button>
      <ModalWindow
        isActive={tariffDetailIsOpened}
        setActive={setTariffDetailIsOpened}
      >
        <div className={styles.tariffDetails}>
          <h3 className={styles.tariffTitle}>Текущее состояние тарифа</h3>
          <div className={styles.tariffCharacteristics}>
            <p className={styles.tariffField}>
              Название тарифа:
              <span className={styles.tariffValue}>Стандарт</span>
            </p>
            <p className={styles.tariffField}>
              Действует до:
              <span className={styles.tariffValue}>31.01.2024</span>
            </p>
            <p className={styles.tariffField}>
              Предусмотрено:
              <span className={styles.tariffValue}>150 парсеров</span>
            </p>
            <p className={styles.tariffField}>
              Использовано:
              <span className={styles.tariffValue}>30 парсеров</span>
            </p>
            <p className={styles.tariffField}>
              Доступно: <span className={styles.tariffValue}>120 парсеров</span>
            </p>
          </div>
          <Button
            variant="accent"
            onClick={() => {
              navigate(Routes.Tariffs);
            }}
          >
            Выбрать и оплатить тариф
          </Button>
        </div>
      </ModalWindow>
    </div>
  );
};
export default TariffInfo;
