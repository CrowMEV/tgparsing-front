import { Link, Outlet, useLocation } from 'react-router-dom';
import { Routes } from '../../router/routes';
import NavTabs from '../ui/navTabs/navTabs';
import styles from './auth-layout.module.sass';
import Logo from '../ui/logo/Logo';

const AUTH_ITEMS = [
  {
    text: 'Войти',
    link: Routes.Login,
  },
  {
    text: 'Зарегистрироваться',
    link: Routes.Registration,
  },
];

const AuthLayout = () => {
  const location = useLocation();
  const currentPageIndex = AUTH_ITEMS.findIndex(
    (item) => item.link === location.pathname,
  );

  return (
    <div className={styles.wrapper}>
      <Logo />
      <div className={styles.container}>
        <div className={styles.tabs}>
          <NavTabs currentElementIndex={currentPageIndex}>
            {AUTH_ITEMS.map((item, index) => (
              <Link
                className={`${styles.link} ${
                  index === currentPageIndex ? styles.link__active : ''
                }`}
                to={item.link}
                key={item.text}
              >
                {item.text}
              </Link>
            ))}
          </NavTabs>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default AuthLayout;
