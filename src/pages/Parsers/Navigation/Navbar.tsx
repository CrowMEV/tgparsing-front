import { Link } from 'react-router-dom';
import styles from './navbar.module.sass';

const Navbar = () => {
  return (
    <aside>
      <ul className={styles.buttons}>
        <li>
          <Link className={styles.link} to="#">
            TELEGRAM
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="#">
            WHATSAPP
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="#">
            VKONTAKTE
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Navbar;
