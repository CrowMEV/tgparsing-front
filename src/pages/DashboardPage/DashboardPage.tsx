import styles from './dashboard-page.module.sass';
import Tasks from '../../components/Dashboard/Tasks/Tasks';
import TariffInfo from '../../components/TariffInfo/TariffInfo';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { ParserTask } from '../../types/parserTask';
import Loader from '../../components/ui/loader/loader';

const MainPage = () => {
  const [tasks, setTasks] = useState<ParserTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .get('/telegram/tasks/me')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className={styles.wrapper}>
      <h2 className="visually-hidden">Текущее состояние тарифа</h2>
      <TariffInfo />
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <div className={styles.info}>
          <Tasks tasks={tasks} />
        </div>
      )}
    </main>
  );
};

export default MainPage;
