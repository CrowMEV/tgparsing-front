import { Link } from 'react-router-dom';
import styles from './start-page.module.sass';
import { Routes } from '../../router/routes';
import { ReactComponent as LogoIcon } from '../../assets/images/logo.svg';
import { ReactComponent as ProfileIcon } from '../../assets/images/icons/profile.svg';

const StartPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.gradientWrapper}>
        <div className={styles.innerWrapper}>
          <nav className={styles.nav}>
            <LogoIcon width="198" height="121" />
            <div className={styles.navWrapper}>
              <div className={styles.navAuth}>
                <div className={styles.profileIcon}>
                  <ProfileIcon />
                </div>
                <Link className={styles.authLink} to={Routes.Login}>
                  Вход
                </Link>
                <span>|</span>
                <Link className={styles.authLink} to={Routes.Registration}>
                  Регистрация
                </Link>
              </div>
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
            </div>
          </nav>
          <main className={styles.promo}>
            <div>
              <h1 className="visually-hidden">Парсинг и рассылка</h1>
              <p className={styles.promoText}>
                Самый большой выбор парсеров
                <br />
                для поиска вашей
              </p>
              <p className={styles.accentPromoText}>горячей аудитории</p>
              <div className={styles.promo__wrapper}>
                <p className={styles.promoText}>в Телеграм</p>
                <button className={styles.parsingButton}>
                  Найти аудиторию
                </button>
              </div>
            </div>
            <div className={styles.tariffsWrapper}>
              <p className={styles.tariffsText}>Тарифы</p>
              <div className={styles.tariffs__innerWrapper}>
                <p className={styles.tariffsText}>от</p>
                <p className={styles.accentTariffsText}>99₽</p>
              </div>
              <Link className={styles.infoLink} to="/">
                Подробнее
              </Link>
            </div>
          </main>
          <footer className={styles.footer}>
            <LogoIcon width="146" height="90" />
          </footer>
        </div>
      </div>
    </div>
  );
};
export default StartPage;
