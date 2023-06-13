import styles from './index.module.sass';
import { Link } from 'react-router-dom';
import Notification from '../../ui/notification/Notification';
import { Routes } from '../../../router/routes';
import NavTabs from '../../ui/navTabs/navTabs';
import { ReactElement } from 'react';
import { MenuCategory, MenuItem } from '../menu-items';

interface PropTypes {
  menuItems: { text: string; link: Routes; icon?: ReactElement }[];
  currentPage: MenuItem;
}

const Header = ({ menuItems, currentPage }: PropTypes) => {
  const currentLinkPosition =
    currentPage.menuCategory === MenuCategory.Profile
      ? currentPage.position
      : -1;

  return (
    <header className={styles.header}>
      <div className={styles.header__blocks}>
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
          <button className={styles.header__link}>Уведомления</button>
          <Notification count={4} />
        </div>
      </div>
    </header>
  );
};

export default Header;
