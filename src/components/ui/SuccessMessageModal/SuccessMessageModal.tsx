import { FC } from 'react';

import ModalWindow from '../modal-window/ModalWindow';

import { ReactComponent as CheckMarkIcon } from '../../../assets/images/icons/check-mark-icon.svg';

import styles from './success-message-modal.module.sass';

type SuccessMessageModalProps = {
  isActive: boolean;
  setActive: (modalIsActive: boolean) => void;
  message: string;
  className?: string;
};

const SuccessMessageModal: FC<SuccessMessageModalProps> = ({
  isActive,
  setActive,
  message,
  className,
}) => {
  return (
    <ModalWindow isActive={isActive} setActive={setActive}>
      <div className={`${styles.wrapper} ${className ? className : ''}`}>
        <p className={styles.message}>{message}</p>
        <CheckMarkIcon width="60" height="60" />
      </div>
    </ModalWindow>
  );
};
export default SuccessMessageModal;
