import { Outlet, useLocation } from 'react-router-dom';
import Header from '../header/Header';
import Navbar from '../AdminBar/AdminBar';
import { ADMIN_ITEMS, ADMIN_NAV_ITEMS } from '../menu-items';
import styles from '../layout.module.sass';

const AdminLayout = () => {
  const location = useLocation();
  const path = `/admin/${location.pathname.split('/')[2]}`;
  const currentPage =
    ADMIN_NAV_ITEMS.find((item) => item.link === path) ||
    ADMIN_ITEMS.find((item) => item.link === path) ||
    ADMIN_ITEMS[0];

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.innerWrapper} ${styles.innerWrapper__admin}`}>
        <div className={styles.header}>
          <Header menuItems={ADMIN_NAV_ITEMS} currentPage={currentPage} />
        </div>
        <div className={styles.navbar}>
          <Navbar menuItems={ADMIN_ITEMS} currentPage={currentPage} />
        </div>
        <div className={styles.main}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
