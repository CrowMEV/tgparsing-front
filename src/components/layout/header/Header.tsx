import styles from './index.module.sass';
import { Link } from 'react-router-dom';
import Notification from '../../ui/notification/Notification';
import { Routes } from '../../../router/routes';
import NavTabs from '../../ui/navTabs/navTabs';

interface PropTypes {
  menuItems: { text: string; link: Routes }[];
  currentPage: { text: string; link: Routes };
}

const Header = ({ menuItems, currentPage }: PropTypes) => {
  const currentLinkIndex = menuItems.findIndex(
    (item) => item.link === currentPage.link,
  );

  return (
    <header className={styles.header}>
      <div className={styles.header__blocks}>
        <div className={styles.header__currentPage}>{currentPage.text}</div>
        <div className={styles.header__links}>
          <NavTabs currentElementIndex={currentLinkIndex}>
            {menuItems.map((item, index) => (
              <Link
                to={item.link}
                className={`${styles.header__link} ${
                  index === currentLinkIndex ? styles.header__link_active : ''
                }`}
                key={item.text}
              >
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
