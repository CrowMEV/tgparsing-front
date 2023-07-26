import Header from './header/Header';
import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './layout.module.sass';
import Navbar from './navbar/Navbar';
import { NAV_ITEMS } from './menu-items';
import { MENU_ITEMS } from './menu-items';

const UserLayout: FC = () => {
  const location = useLocation();
  const path = `/${location.pathname.split('/')[1]}`;
  const currentPage =
    NAV_ITEMS.find((item) => item.link === path) ||
    MENU_ITEMS.find((item) => item.link === path) ||
    MENU_ITEMS[0];

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <Header menuItems={NAV_ITEMS} currentPage={currentPage} />
      </div>
      <Navbar menuItems={MENU_ITEMS} currentPage={currentPage} />
      <div className={styles.innerWrapper}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
