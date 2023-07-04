import styles from './tasks.module.sass';
import { ReactComponent as RepeatIcon } from '../../../assets/images/icons/repeat.svg';
import { ReactComponent as BasketIcon } from '../../../assets/images/icons/trash.svg';
import { tasks } from '../../../mocks/tasks';
import { Link } from 'react-router-dom';

const Tasks = () => {
  return (
    <section>
      <h2 className={styles.title}>Текущие задачи</h2>
      <div className={styles.container}>
        <div className={styles.tasksContainer}>
          <table className={styles.tasksTable}>
            <thead className={styles.tasksTable__header}>
              <tr>
                <th>Дата</th>
                <th>Название </th>
                <th>Статус</th>
                <th>
                  <span className="visually-hidden">Ссылка</span>
                </th>
                <th>
                  <span className="visually-hidden">Панель управления</span>
                </th>
              </tr>
            </thead>
            <tbody className={styles.tasksTable__body}>
              {tasks.map((task) => (
                <tr className={styles.taskItem} key={task.id}>
                  <td>{task.date}</td>
                  <td>{task.title}</td>
                  <td>{task.status}</td>
                  <td>
                    <Link className={styles.taskDetailLink} to="">
                      Подробнее
                    </Link>
                  </td>
                  <td>
                    <div className={styles.taskControls}>
                      <button
                        className={`${styles.taskButton} ${styles.taskButton__repeat}`}
                      >
                        <RepeatIcon />
                        <span className="visually-hidden">Повторить</span>
                      </button>
                      <button className={styles.taskButton}>
                        <BasketIcon />
                        <span className="visually-hidden">Удалить</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
export default Tasks;
