import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Routes } from '../../../router/routes';
import NavTabs from '../../ui/navTabs/navTabs';

import styles from './parsers-layout.module.sass';
import { useEffect, useState } from 'react';
import CompletedTasks from '../CompletedTasks/CompletedTasks';
import TariffInfo from '../../TariffInfo/TariffInfo';
import { api } from '../../../services/api';
import { ParserTask } from '../../../types/parserTask';

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
  const [tasks, setTasks] = useState<ParserTask[] | null>(null);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  useEffect(() => {
    if (location.pathname === Routes.Parsers) {
      navigate(Routes.ParsersParticipants);
    }
  }, [location]);

  useEffect(() => {
    setIsLoadingTasks(false);
    api
      .get('/telegram/tasks/me')
      .then((r) =>
        setTasks(
          r.data.filter(
            (task: ParserTask) =>
              task.work_status === 'failed' || task.work_status === 'success',
          ),
        ),
      )
      .catch((e) => console.error(e))
      .finally(() => setIsLoadingTasks(false));
  }, []);

  const currentPageIndex = PARSERS_ITEMS.findIndex(
    (item) => item.link === location.pathname,
  );

  return (
    <section className={styles.pageWrapper}>
      <TariffInfo />
      <div className={styles.wrapper}>
        <div className={styles.parsersWrapper}>
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
        <CompletedTasks tasks={tasks} isLoading={isLoadingTasks} />
      </div>
    </section>
  );
};
export default ParsersLayout;
