import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/button/Button';
import Logo from '../../components/ui/logo/Logo';
import styles from './not-found-page.module.sass';
import { Routes } from '../../router/routes';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <Logo />
        <div className={styles.textWrapper}>
          <h2 className={styles.title}>Страница не найдена</h2>
          <div className={styles.error}>
            <span>4</span>
            <span>4</span>
          </div>
          <Button
            className={styles.button}
            variant="accent"
            onClick={() => navigate(Routes.Home)}
          >
            Вернуться на главную
          </Button>
        </div>
      </div>
    </div>
  );
};
export default NotFoundPage;
