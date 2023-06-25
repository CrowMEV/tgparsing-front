import styles from './tasks.module.sass';

const Tasks = () => {
  return (
    <section>
      <h2 className={styles.title}>Текущие задачи</h2>
      <div className={styles.tasksContainer}>
        <ul></ul>
      </div>
    </section>
  );
};
export default Tasks;
