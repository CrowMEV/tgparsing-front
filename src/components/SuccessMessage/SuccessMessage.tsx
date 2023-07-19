import ModalWindow from '../ui/modal-window/ModalWindow';

import { ReactComponent as CheckMarkIcon } from '../../assets/images/icons/check-mark-icon.svg';

import styles from './success-message.module.sass';

type SuccessMessageProps = {
  isActive: boolean;
  setActive: (modalIsActive: boolean) => void;
  text: string;
};

const SuccessMessage = ({ isActive, setActive, text }: SuccessMessageProps) => {
  return (
    <ModalWindow isActive={isActive} setActive={() => setActive(false)}>
      <div className={styles.successMessage}>
        <div>{text}</div>
        <CheckMarkIcon width="60" height="60" />
      </div>
    </ModalWindow>
  );
};

export default SuccessMessage;
