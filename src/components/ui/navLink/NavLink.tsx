import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styles from './nav-link.module.sass';

interface NavLinkProps {
  text: string;
  link: string;
  isActive: boolean;
  icon?: ReactElement;
}

const NavLink: FC<NavLinkProps> = ({ text, link, isActive, icon }) => {
  return (
    <Link
      className={`${styles.navLink} ${isActive ? styles.navLink_active : ''}`}
      to={link}
    >
      {icon && <div className={styles.navIcon}>{icon}</div>}
      <span>{text}</span>
    </Link>
  );
};

export default NavLink;
