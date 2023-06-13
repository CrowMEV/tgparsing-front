import Header from './header/Header';
import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './layout.module.sass';
import Navbar from './navbar/Navbar';
import { NAV_ITEMS } from './menu-items';
import { MENU_ITEMS } from './menu-items';

const Layout: FC = () => {
  const location = useLocation();
  const currentPage =
    NAV_ITEMS.find((item) => item.link === location.pathname) ||
    MENU_ITEMS.find((item) => item.link === location.pathname) ||
    MENU_ITEMS[0];

  return (
    <div className={styles.wrapper}>
      <Header menuItems={NAV_ITEMS} currentPage={currentPage} />
      <Navbar menuItems={MENU_ITEMS} currentPage={currentPage} />
      <svg></svg>
      <Outlet />
    </div>
  );
};

export default Layout;
