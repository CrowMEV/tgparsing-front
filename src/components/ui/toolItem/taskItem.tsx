import { FC } from 'react';

import { api } from '../../../services/api';
import { BASE_URL } from '../../../consts/consts';

import IconButton from '../iconButton/IconButton';

import { ReactComponent as CalendarIcon } from '../../../assets/images/icons/calendar.svg';
import { ReactComponent as UsersIcon } from '../../../assets/images/icons/users.svg';
import { ReactComponent as TimeIcon } from '../../../assets/images/icons/time.svg';
import { ReactComponent as CheckIcon } from '../../../assets/images/icons/check.svg';
import { ReactComponent as StarIcon } from '../../../assets/images/icons/star.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/images/icons/task-error-icon.svg';
import { ReactComponent as RepeatIcon } from '../../../assets/images/icons/repeat.svg';
import { ReactComponent as TrashIcon } from '../../../assets/images/icons/trash.svg';
import { ReactComponent as DownloadIcon } from '../../../assets/images/icons/download.svg';
import { ParserTask, WorkStatus } from '../../../types/parserTask';

import styles from './taskItem.module.sass';

interface TaskItemProps {
  task: ParserTask;
}

const StatusIcon = ({ status }: { status: WorkStatus }) => {
  switch (status) {
    case 'success':
      return <CheckIcon className={styles.iconSuccess} />;
    case 'in_waiting':
      return <CheckIcon />;
    case 'in_processing':
      return <CheckIcon />;
    case 'failed':
      return <ErrorIcon className={styles.iconFailed} />;
  }
};

const TaskItem: FC<TaskItemProps> = ({ task }) => {
  const deleteHandler = () => {
    api
      .delete(`/telegram/tasks/me?task_name=${task.title}`)
      .catch((e) => console.error(e));
  };

  return (
    <div className={styles.toolItem}>
      <h5 className={styles.toolName}>
        <StatusIcon status={task.work_status} />
        {task.title}
      </h5>
      <div className={styles.toolCharacteristics}>
        <span className={styles.toolDate}>
          <CalendarIcon />
          <span>{new Date(task.created_at).toLocaleTimeString('ru-Ru')}</span>
        </span>
        <span className={styles.toolMailings}>
          <UsersIcon />
          <span>{task.data_count}</span>
        </span>
        <span className={styles.toolDuration}>
          <TimeIcon />
          <span>{task.time_work}</span>
        </span>
      </div>

      <div className={styles.toolsOptions}>
        <IconButton
          onClick={() =>
            window.open(
              `${BASE_URL}/telegram/tasks/me/download?task_name=${task.title}`,
              '_blank',
            )
          }
          disabled={task.work_status === 'failed'}
        >
          <>
            <DownloadIcon />
            <span className="visually-hidden">Загрузить результат</span>
          </>
        </IconButton>
        <IconButton onClick={(e) => console.log(e)} disabled>
          <>
            <StarIcon />
            <span className="visually-hidden">Добавить в избранное</span>
          </>
        </IconButton>
        <IconButton onClick={(e) => console.log(e)} disabled>
          <>
            <RepeatIcon />
            <span className="visually-hidden">Повторить</span>
          </>
        </IconButton>
        <IconButton onClick={deleteHandler}>
          <>
            <TrashIcon />
            <span className="visually-hidden">Удалить</span>
          </>
        </IconButton>
      </div>
    </div>
  );
};

export default TaskItem;
