import styles from './tasks.module.sass';
import { ReactComponent as RepeatIcon } from '../../../assets/images/icons/repeat.svg';
import { ReactComponent as BasketIcon } from '../../../assets/images/icons/trash.svg';
import { tasks } from '../../../mocks/tasks';
import Table from '../../ui/table/Table';
import TableHead from '../../ui/table/tableHead/TableHead';
import TableRow from '../../ui/table/tableRow/TableRow';
import TableBody from '../../ui/table/tableBody/TableBody';
import TableCeil from '../../ui/table/tableCell/TableCell';
import TableContainer from '../../ui/table/tableContainer/TableContainer';

const Tasks = () => {
  return (
    <section>
      <h2 className={styles.title}>Текущие задачи</h2>
      <TableContainer style={{ height: '620px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCeil variant="head">Дата создания</TableCeil>
              <TableCeil variant="head">Дата запуска</TableCeil>
              <TableCeil variant="head">Название задачи</TableCeil>
              <TableCeil variant="head">Операция</TableCeil>
              <TableCeil variant="head">Статус</TableCeil>
              <TableCeil variant="head">
                <span className="visually-hidden">Ссылка</span>
              </TableCeil>
              <TableCeil variant="head">
                <span className="visually-hidden">Панель управления</span>
              </TableCeil>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCeil>{task.creationDate}</TableCeil>
                <TableCeil>{task.startDate}</TableCeil>
                <TableCeil>{task.title}</TableCeil>
                <TableCeil>{task.operation}</TableCeil>
                <TableCeil>{task.status}</TableCeil>
                <TableCeil>
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
                </TableCeil>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
export default Tasks;
