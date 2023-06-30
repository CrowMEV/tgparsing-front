import { Link } from 'react-router-dom';
import { Routes } from '../../../router/routes';
import styles from './auth-nav.module.sass';
import { ReactComponent as ProfileIcon } from '../../../assets/images/icons/profile.svg';

const AuthNav = () => {
  return (
    <div className={styles.navAuth}>
      <div className={styles.profileIcon}>
        <ProfileIcon />
      </div>
      <Link className={styles.authLink} to={Routes.Login}>
        Вход
      </Link>
      <span>|</span>
      <Link className={styles.authLink} to={Routes.Registration}>
        Регистрация
      </Link>
    </div>
  );
};
export default AuthNav;
