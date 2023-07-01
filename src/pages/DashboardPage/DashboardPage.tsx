import styles from './dashboard-page.module.sass';
import CompletedTasks from '../../components/Dashboard/CompletedTasks/CompletedTasks';
import Tasks from '../../components/Dashboard/Tasks/Tasks';
import TariffInfo from '../../components/Dashboard/TariffInfo/TariffInfo';

const MainPage = () => {
  return (
    <main className={styles.wrapper}>
      <h2 className="visually-hidden">Текущее состояние тарифа</h2>
      <TariffInfo />
      <div className={styles.info}>
        <Tasks />
        <CompletedTasks />
      </div>
    </main>
  );
};

export default MainPage;
