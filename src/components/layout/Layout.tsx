import Header from './header/Header';
import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './layout.module.sass';
import Navbar from './navbar/Navbar';
import { Routes } from '../../router/routes';

const NAV_ITEMS = [
  {
    text: 'Профиль',
    link: Routes.Profile,
    icon: <span className="material-icons-outlined">account_circle</span>,
  },
  {
    text: 'Документы',
    link: Routes.Documents,
    icon: <span className="material-icons-outlined">description</span>,
  },
];

const MENU_ITEMS = [
  { text: 'Дашбоард', link: Routes.Home },
  { text: 'Парсинг', link: Routes.Parsers },
  { text: 'Создать рассылку', link: Routes.Mailing },
  { text: 'Инвайтинг', link: Routes.Inviting },
  { text: 'Базы', link: Routes.Base },
  { text: 'Отчеты', link: Routes.Reports },
  { text: 'Финансы', link: Routes.Finance },
  { text: 'Тарифы', link: Routes.Tariffs },
];

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
      <Outlet />
    </div>
  );
};

export default Layout;
