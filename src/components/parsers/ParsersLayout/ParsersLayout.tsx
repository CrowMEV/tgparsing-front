import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Routes } from '../../../router/routes';
import NavTabs from '../../ui/navTabs/navTabs';

import styles from './parsers-layout.module.sass';
import { useEffect, useState } from 'react';
import CompletedTasks from '../CompletedTasks/CompletedTasks';
import TariffInfo from '../../TariffInfo/TariffInfo';
import { api } from '../../../services/api';
import { ParserTask } from '../../../types/parserTask';
import { useAppSelector } from '../../../hooks/redux';

const PARSERS_ITEMS = [
  {
    text: 'Участники групп/каналов',
    link: Routes.ParsersParticipants,
    name: 'members',
  },
  {
    text: 'Активность',
    link: Routes.ParsersActivities,
    name: 'activity',
  },
  {
    text: 'Геолокация',
    link: Routes.ParsersGeolocation,
    name: 'geo',
  },
] as const;

const ParsersLayout = () => {
  const location = useLocation();
  const subscribe = useAppSelector((state) => state.UserData.user?.subscribe);
  const [tasks, setTasks] = useState<ParserTask[] | null>(null);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

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

  if (location.pathname === Routes.Parsers)
    return <Navigate to={Routes.ParsersParticipants} />;

  return (
    <section className={styles.pageWrapper}>
      <TariffInfo />
      <div className={styles.wrapper}>
        <div className={styles.parsersWrapper}>
          <div className={styles.headerWrapper}>
            <h3 className={styles.header}>Поиск аудитории</h3>
            {!subscribe?.tariff_options[
              PARSERS_ITEMS[currentPageIndex].name
            ] && (
              <p className={styles.notAllowedParser}>
                (Недоступно для вашего тарифа)
              </p>
            )}
          </div>
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
          <Outlet
            context={
              !subscribe?.tariff_options[PARSERS_ITEMS[currentPageIndex].name]
            }
          />
        </div>
        <CompletedTasks tasks={tasks} isLoading={isLoadingTasks} />
      </div>
    </section>
  );
};
export default ParsersLayout;
