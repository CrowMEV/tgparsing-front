import { FC } from 'react';
import ModalWindow from '../modal-window/ModalWindow';
import { ReactComponent as CheckMarkIcon } from '../../../assets/images/icons/check-mark-icon.svg';
import styles from './success-message.module.sass';

type SuccessMessageProps = {
  isActive: boolean;
  setActive: (modalIsActive: boolean) => void;
  message: string;
};

const SuccessMessage: FC<SuccessMessageProps> = ({
  isActive,
  setActive,
  message,
}) => {
  return (
    <ModalWindow isActive={isActive} setActive={setActive}>
      <div className={styles.wrapper}>
        <p className={styles.message}>{message}</p>
        <CheckMarkIcon width="60" height="60" />
      </div>
    </ModalWindow>
  );
};
export default SuccessMessage;
