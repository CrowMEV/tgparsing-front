import { Link } from 'react-router-dom';
import styles from './index.module.sass';
import { ReactElement, useState } from 'react';
import ReplenishmentModal from '../../ReplenishmentModal/ReplenishmentModal';
import { useAppSelector } from '../../../hooks/redux';
import { getCurrentUser } from '../../../store/user-process/selectors';
import { Routes } from '../../../router/routes';
import NavTabs from '../../ui/navTabs/navTabs';
import { MenuCategory, MenuItem } from '../menu-items';

interface PropTypes {
  menuItems: { text: string; link: Routes; icon?: ReactElement }[];
  currentPage: MenuItem;
}

const Navbar = ({ menuItems, currentPage }: PropTypes) => {
  const [isReplenishmentOpen, setIsReplenishmentOpen] = useState(false);
  const userInfo = useAppSelector(getCurrentUser);

  const currentLinkPosition =
    currentPage.menuCategory === MenuCategory.Navbar
      ? currentPage.position
      : -1;

  return (
    <div className={styles.nav}>
      <ReplenishmentModal
        isOpen={isReplenishmentOpen}
        handleClose={() => setIsReplenishmentOpen(false)}
      />
      <nav className={styles.nav__links}>
        <div className={styles.nav__list}>
          <NavTabs currentElementIndex={currentLinkPosition}>
            {menuItems.map((item, index) => (
              <Link
                to={item.link}
                className={`${styles.nav__link} ${
                  index === currentLinkPosition ? styles.nav__link_active : ''
                }`}
                key={item.text}
              >
                {item.icon && (
                  <div className={styles.nav__icon}>{item.icon}</div>
                )}
                <span>{item.text}</span>
              </Link>
            ))}
          </NavTabs>
        </div>
        <div>
          <div className={styles.nav__links__balance}>
            <p className={styles.balance__title}>Ваш баланс:</p>
            <p className={styles.balance__value}>{userInfo.balance} &#8381;</p>
          </div>
          <button
            className={styles.nav__links__btn}
            onClick={() => setIsReplenishmentOpen(true)}
          >
            <span>Пополнить баланс</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
