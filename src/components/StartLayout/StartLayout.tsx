import Footer from '../Start/Footer/Footer';
import { ReactComponent as LogoIcon } from '../../assets/images/logo.svg';
import styles from './start-layout.module.sass';
import AuthNav from '../Start/AuthNav/AuthNav';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Routes } from '../../router/routes';

const StartLayout = () => {
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <nav className={styles.nav}>
          {location.pathname === Routes.Home ? (
            <LogoIcon width="198" height="121" />
          ) : (
            <Link className={styles.linkHome} to={Routes.Home}>
              <LogoIcon width="198" height="121" />
            </Link>
          )}
          <AuthNav />
        </nav>
        <Outlet />
        <footer className={styles.footer}>
          <Footer />
        </footer>
      </div>
    </div>
  );
};
export default StartLayout;
