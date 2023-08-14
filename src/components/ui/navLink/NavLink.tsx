import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styles from './nav-link.module.sass';

interface NavLinkProps {
  text: string;
  link: string;
  isActive: boolean;
  icon?: ReactElement;
  isDisabled?: boolean;
}

const NavLink: FC<NavLinkProps> = ({
  text,
  link,
  isActive,
  icon,
  isDisabled = false,
}) => {
  return (
    <Link
      className={`${styles.navLink} ${isActive ? styles.navLink_active : ''} ${
        isDisabled ? styles.navLink_disabled : ''
      }`}
      to={link}
    >
      {icon && <div className={styles.navIcon}>{icon}</div>}
      <span>{text}</span>
    </Link>
  );
};

export default NavLink;
