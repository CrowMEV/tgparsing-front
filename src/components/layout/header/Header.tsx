import styles from './index.module.sass';
import { Link } from 'react-router-dom';
import { ReactComponent as NotificationIcon } from '../../../assets/images/icons/notification.svg';
import { ReactComponent as PowerIcon } from '../../../assets/images/icons/power-button.svg';
import { Routes } from '../../../router/routes';
import NavTabs from '../../ui/navTabs/navTabs';
import { ReactElement } from 'react';
import { MenuCategory, MenuItem } from '../menu-items';
import Logo from '../../ui/logo/Logo';
import { useAppDispatch } from '../../../hooks/redux';
import { logout } from '../../../store/user-slice/apiActions';

interface PropTypes {
  menuItems: { text: string; link: Routes; icon?: ReactElement }[];
  currentPage: MenuItem;
}

const Header = ({ menuItems, currentPage }: PropTypes) => {
  const currentLinkPosition =
    currentPage.menuCategory === MenuCategory.Profile
      ? currentPage.position
      : -1;

  const dispatch = useAppDispatch();

  return (
    <header className={styles.header}>
      <div className={styles.header__blocks}>
        <div className={styles.header__logoWrapper}>
          <Logo />
        </div>
        <div className={styles.header__currentPage}>{currentPage.text}</div>
        <div className={styles.header__links}>
          <NavTabs currentElementIndex={currentLinkPosition}>
            {menuItems.map((item, index) => (
              <Link
                to={item.link}
                className={`${styles.header__link} ${
                  index === currentLinkPosition
                    ? styles.header__link_active
                    : ''
                }`}
                key={item.text}
              >
                {item.icon && (
                  <div className={styles.header__icon}>{item.icon}</div>
                )}
                <span>{item.text}</span>
              </Link>
            ))}
          </NavTabs>
          <button className={styles.header__link}>
            <div className={styles.header__icon}>
              <NotificationIcon />
            </div>
            Уведомления
          </button>
          <button
            className={`${styles.header__link} ${styles.header__link_logout}`}
            onClick={() => dispatch(logout())}
          >
            <div
              className={`${styles.header__icon} ${styles.header__icon_logout}`}
            >
              <PowerIcon />
            </div>
            <span className="visually-hidden">Выйти</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
