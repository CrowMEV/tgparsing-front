import { useNavigate } from 'react-router-dom';
import Button from '../../ui/button/Button';
import ModalWindow from '../../ui/modal-window/ModalWindow';
import { ReactComponent as CheckMarkIcon } from '../../../assets/images/icons/check-mark-icon.svg';
import { Routes } from '../../../router/routes';
import styles from '../registration-form.module.sass';

type SuccessMessageProps = {
  isActive: boolean;
  setActive: (modalIsActive: boolean) => void;
};

const SuccessMessage = ({ isActive, setActive }: SuccessMessageProps) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    setActive(false);
    navigate(Routes.Login);
  };
  return (
    <ModalWindow isActive={isActive} setActive={onClickHandler}>
      <div className={styles.successMessage}>
        <div>Вы успешно зарегистрировались!</div>
        <CheckMarkIcon width="60" height="60" />
        <Button variant="accent" onClick={onClickHandler}>
          Продолжить
        </Button>
      </div>
    </ModalWindow>
  );
};
export default SuccessMessage;