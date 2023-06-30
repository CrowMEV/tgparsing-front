import { Link } from 'react-router-dom';
import styles from './nav.module.sass';

const Nav = () => {
  return (
    <ul className={styles.navList}>
      <li className={styles.navList__item}>
        <Link to="/" className={styles.navList__link}>
          Услуги
        </Link>
      </li>
      <li className={styles.navList__item}>
        <Link to="/" className={styles.navList__link}>
          О компании
        </Link>
      </li>
      <li className={styles.navList__item}>
        <Link to="/" className={styles.navList__link}>
          Контакты
        </Link>
      </li>
    </ul>
  );
};
export default Nav;
