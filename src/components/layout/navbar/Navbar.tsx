import { useState } from 'react';

import { MenuCategory, MenuItem } from '../menu-items';
import { useAppSelector } from '../../../hooks/redux';

import ReplenishmentWindow from '../../ReplenishmentWindow/ReplenishmentWindow';
import NavLink from '../../ui/navLink/NavLink';
import NavTabs from '../../ui/navTabs/navTabs';
import Button from '../../ui/button/Button';

import styles from './index.module.sass';

interface PropTypes {
  menuItems: MenuItem[];
  currentPage: MenuItem;
}

const Navbar = ({ menuItems, currentPage }: PropTypes) => {
  const userBalance = useAppSelector((state) => state.UserData.user?.balance);
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
                  isDisabled={item.disabled}
                  key={item.text}
                />
              ))}
            </NavTabs>
          </div>
          <div>
            <div className={styles.nav__links__balance}>
              <p className={styles.balance__title}>Ваш баланс:</p>
              <p className={styles.balance__value}>{userBalance} &#8381;</p>
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
