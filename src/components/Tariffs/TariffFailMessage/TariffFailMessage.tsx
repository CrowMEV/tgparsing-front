import { FC } from 'react';
import Button from '../../ui/button/Button';
import ModalWindow from '../../ui/modal-window/ModalWindow';
import styles from './tariff-fail-message.module.sass';

interface TariffFailMessageProps {
  isActive: boolean;
  setActive: (modalIsActive: boolean) => void;
}

const TariffFailMessage: FC<TariffFailMessageProps> = ({
  isActive,
  setActive,
}) => {
  return (
    <ModalWindow isActive={isActive} setActive={setActive}>
      <div className={styles.wrapper}>
        <p className={styles.message}>
          Недостаточно средств
          <br /> для оплаты тарифа
        </p>
        <Button
          style={{ color: '#ffffff' }}
          variant="small"
          onClick={() => setActive(false)}
        >
          Пополнить баланс
        </Button>
      </div>
    </ModalWindow>
  );
};
export default TariffFailMessage;
