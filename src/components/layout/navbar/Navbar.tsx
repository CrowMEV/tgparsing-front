import { ReactElement, useState } from 'react';
import { Routes } from '../../../router/routes';
import { MenuCategory, MenuItem } from '../menu-items';
import ReplenishmentWindow from '../../ReplenishmentWindow/ReplenishmentWindow';
import NavTabs from '../../ui/navTabs/navTabs';
import Button from '../../ui/button/Button';

import styles from './index.module.sass';
import NavLink from '../../ui/navLink/NavLink';

interface PropTypes {
  menuItems: { text: string; link: Routes; icon?: ReactElement }[];
  currentPage: MenuItem;
}

const Navbar = ({ menuItems, currentPage }: PropTypes) => {
  const [isReplenishmentOpen, setIsReplenishmentOpen] = useState(false);

  const currentLinkPosition =
    currentPage.menuCategory === MenuCategory.Navbar
      ? currentPage.position
      : -1;

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <ReplenishmentWindow
          isActive={isReplenishmentOpen}
          setActive={setIsReplenishmentOpen}
        />
        <nav className={styles.nav__links}>
          <div className={styles.nav__list}>
            <NavTabs
              currentElementIndex={currentLinkPosition}
              underlineClass={styles.nav__underline}
            >
              {menuItems.map((item, index) => (
                <NavLink
                  link={item.link}
                  text={item.text}
                  icon={item.icon}
                  isActive={index === currentLinkPosition}
                  key={item.text}
                />
              ))}
            </NavTabs>
          </div>
          <div>
            <div className={styles.nav__links__balance}>
              <p className={styles.balance__title}>Ваш баланс:</p>
              <p className={styles.balance__value}>2000.00 &#8381;</p>
            </div>
            <Button
              variant="small"
              onClick={() => setIsReplenishmentOpen(true)}
            >
              Пополнить
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
