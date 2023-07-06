import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Routes } from '../../../router/routes';
import NavTabs from '../../ui/navTabs/navTabs';

import styles from './parsers-layout.module.sass';
import { useEffect } from 'react';

const PARSERS_ITEMS = [
  {
    text: 'Участники групп/каналов',
    link: Routes.ParsersParticipants,
  },
  {
    text: 'Активность',
    link: Routes.ParsersActivities,
  },
  {
    text: 'Геолокация',
    link: Routes.ParsersGeolocation,
  },
];

const ParsersLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === Routes.Parsers) {
      navigate(Routes.ParsersParticipants);
    }
  }, [location]);

  const currentPageIndex = PARSERS_ITEMS.findIndex(
    (item) => item.link === location.pathname,
  );

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.header}>Поиск аудитории</h3>
      <div className={styles.tabs}>
        <NavTabs
          currentElementIndex={currentPageIndex}
          underlineClass={styles.underline}
        >
          {PARSERS_ITEMS.map((item, index) => (
            <Link
              className={`${styles.link} ${
                index === currentPageIndex ? styles.linkActive : ''
              }`}
              to={item.link}
              key={item.text}
            >
              {item.text}
            </Link>
          ))}
        </NavTabs>
      </div>
      <Outlet />
    </div>
  );
};
export default ParsersLayout;
