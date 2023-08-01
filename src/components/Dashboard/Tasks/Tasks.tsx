import styles from './tasks.module.sass';
import Table from '../../ui/table/Table';
import TableHead from '../../ui/table/tableHead/TableHead';
import TableRow from '../../ui/table/tableRow/TableRow';
import TableBody from '../../ui/table/tableBody/TableBody';
import TableCell from '../../ui/table/tableCell/TableCell';
import TableContainer from '../../ui/table/tableContainer/TableContainer';
import { ParserTask } from '../../../types/tasks';
import { FC } from 'react';
import {
  getTaskOperationName,
  getTaskStatusName,
} from '../../../utils/getTaskFieldName';

interface TasksProps {
  tasks: ParserTask[];
}

const Tasks: FC<TasksProps> = ({ tasks }) => {
  return (
    <section>
      <h2 className={styles.title}>Текущие задачи</h2>
      <TableContainer style={{ height: '620px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell variant="head">Дата создания</TableCell>
              <TableCell variant="head">Дата запуска</TableCell>
              <TableCell variant="head">Название задачи</TableCell>
              <TableCell variant="head">Операция</TableCell>
              <TableCell variant="head">Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  {new Date(task.created_at).toLocaleDateString('ru-Ru')}
                </TableCell>
                <TableCell>
                  {new Date(task.job_start).toLocaleDateString('ru-Ru')}
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{getTaskOperationName(task.operation)}</TableCell>
                <TableCell
                  className={
                    task.work_status === 'failed'
                      ? styles.statusCell_failed
                      : ''
                  }
                >
                  {getTaskStatusName(task.work_status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
export default Tasks;
