import styles from './index.module.sass';
import CompletedTasks from '../../components/CompletedTasks/CompletedTasks';
import ParserBar from '../../components/ParserBar/ParserBar';
import Tasks from '../../components/Tasks/Tasks';

const MainPage = () => {
  return (
    <main className={styles.wrapper}>
      <h2 className={styles.title}>Текущее состояние тарифа</h2>
      <ParserBar />
      <div className={styles.info}>
        <Tasks />
        <CompletedTasks />
      </div>
    </main>
  );
};

export default MainPage;
