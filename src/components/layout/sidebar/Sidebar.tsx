import avatar from '../../../assets/images/default-avatar.png';
import { Link } from 'react-router-dom';
import { Routes } from '../../../router/routes';

import styles from './index.module.sass';

const Sidebar = () => {
  return (
    <div className={styles.nav}>
      <nav className={styles.nav__links}>
        <ul>
          <li>
            <Link to={Routes.Mailing} className={styles.nav__link}>
              <span className="material-icons-outlined">rocket</span>
              <p>Создать рассылку</p>
            </Link>
          </li>
          <li>
            <Link className={styles.nav__link} to="/">
              <span className="material-icons-outlined">lan</span>
              <p>Базы</p>
            </Link>
          </li>
          <li>
            <Link className={styles.nav__link} to="/">
              <span className="material-icons-outlined">menu_book</span>
              <p>Таргет</p>
            </Link>
          </li>
          <li>
            <Link className={styles.nav__link} to="/">
              <span className="material-icons-outlined">data_exploration</span>
              <p>Отчеты</p>
            </Link>
          </li>
          <li>
            <Link className={styles.nav__link} to="/">
              <span className="material-icons-outlined">description</span>
              <p>Шаблоны рассылок</p>
            </Link>
          </li>
          <li>
            <Link className={styles.nav__link} to="/">
              <span className="material-icons-outlined">
                account_balance_wallet
              </span>
              <p>Финансы</p>
            </Link>
          </li>
        </ul>
        <Link to="/">
          <div className={styles.nav__avatar}>
            <img src={avatar} alt="avatar" />
          </div>
          <p>Личный менеджер</p>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
