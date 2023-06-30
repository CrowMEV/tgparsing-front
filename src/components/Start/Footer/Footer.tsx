import styles from './footer.module.sass';
import { ReactComponent as LogoIcon } from '../../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { Routes } from '../../../router/routes';

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <address className={styles.contacts}>
        <span>
          Email:{' '}
          <a className={styles.link} href="mailto:info@elect-assist.ru">
            info@elect-assist.ru
          </a>
        </span>
        <span>
          Телефон:{' '}
          <a className={styles.link} href="tel:+74951234567">
            +7 (495) 123-45-67
          </a>
        </span>
        <span> Москва, Кронштадский б-р, 7а, стр. 1</span>
      </address>
      <LogoIcon width="146" height="90" />
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link className={styles.link} to="/">
              Тарифы
            </Link>
          </li>
          <li>
            <Link className={styles.link} to={Routes.Registration}>
              Регистрация
            </Link>
          </li>
          <li>
            <Link className={styles.link} to={Routes.Login}>
              Вход в личный кабинет
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Footer;
