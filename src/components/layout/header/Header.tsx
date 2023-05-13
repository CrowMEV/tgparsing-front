import { useState } from 'react';
import styles from './index.module.sass';
import { Link, useLocation } from 'react-router-dom';
import { Routes } from '../../../router/routes';
import { useAppSelector } from '../../../hooks/redux';
import { getCurrentUser } from '../../../store/user-process/selectors';
import ReplenishmentModal from '../../ReplenishmentModal/ReplenishmentModal';
import Notification from '../../ui/notification/Notification';

const NAV_ITEMS = [
  { text: 'РАССЫЛКИ', link: Routes.Home },
  { text: 'ПАРСЕРЫ', link: Routes.Parsers },
];

const Header = () => {
  const { pathname } = useLocation();
  const [isReplenishmentOpen, setIsReplenishmentOpen] = useState(false);
  const userInfo = useAppSelector(getCurrentUser);

  return (
    <header className={styles.header}>
      <ReplenishmentModal
        isOpen={isReplenishmentOpen}
        handleClose={() => setIsReplenishmentOpen(false)}
      />
      <div className={styles.header__blocks}>
        <ul className={styles.header__buttons}>
          {NAV_ITEMS.map((item) => (
            <li key={item.text}>
              <Link
                className={`${styles.header__link} ${
                  item.link === pathname ? styles.header__link__active : ''
                }`}
                to={item.link}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
        <ul className={styles.header__links}>
          <li>
            <span className="material-icons-outlined">description</span>
            <Link to="/">Документы</Link>
          </li>
          <li>
            <span className="material-icons-outlined">account_circle</span>
            <Link to="/">Профиль</Link>
          </li>
          <li>
            <span className="material-icons-outlined">monetization_on</span>
            <Link to="/">Тарифы</Link>
          </li>
          <li className={styles.header__links__balance}>
            <label>Ваш баланс:</label>
            <label>{userInfo.balance} Р</label>
          </li>
          <li
            className={styles.header__links__btn}
            onClick={() => setIsReplenishmentOpen(true)}
          >
            <span className="material-icons-outlined">
              account_balance_wallet
            </span>
            <button>Пополнить баланс</button>
          </li>
          <li>
            <Notification count={4} />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
