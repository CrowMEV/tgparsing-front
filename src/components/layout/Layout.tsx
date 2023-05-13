import Header from './header/Header';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import styles from './layout.module.sass';

const Layout: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <main className={styles.main}>
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
