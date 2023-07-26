import { MenuCategory, MenuItem } from '../menu-items';
import styles from './admin-bar.module.sass';
import NavLink from '../../ui/navLink/NavLink';
import { FC, ReactElement } from 'react';
import { Routes } from '../../../router/routes';

interface PropTypes {
  menuItems: { text: string; link: Routes; icon?: ReactElement }[];
  currentPage: MenuItem;
}

const AdminBar: FC<PropTypes> = ({ menuItems, currentPage }) => {
  const currentLinkPosition =
    currentPage.menuCategory === MenuCategory.Navbar
      ? currentPage.position
      : -1;

  return (
    <div className={styles.adminBar}>
      <nav className={styles.adminBar__links}>
        {menuItems.map((item, index) => (
          <div className={styles.adminBar__link} key={item.text}>
            <NavLink
              link={item.link}
              text={item.text}
              icon={item.icon}
              isActive={index === currentLinkPosition}
            />
            {index === currentLinkPosition && (
              <span className={styles.adminBar__underline} />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AdminBar;
