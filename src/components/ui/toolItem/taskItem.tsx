import { FC } from 'react';
import styles from './taskItem.module.sass';
import { ParsingTool } from '../../../types/parsing-tool';
import { ReactComponent as CalendarIcon } from '../../../assets/images/icons/calendar.svg';
import { ReactComponent as UsersIcon } from '../../../assets/images/icons/users.svg';
import { ReactComponent as TimeIcon } from '../../../assets/images/icons/time.svg';
import { ReactComponent as CheckIcon } from '../../../assets/images/icons/check.svg';
import { ReactComponent as StarIcon } from '../../../assets/images/icons/star.svg';
import { ReactComponent as SettingIcon } from '../../../assets/images/icons/settings.svg';
import { ReactComponent as RepeatIcon } from '../../../assets/images/icons/repeat.svg';
import { ReactComponent as TrashIcon } from '../../../assets/images/icons/trash.svg';
import { ReactComponent as DownloadIcon } from '../../../assets/images/icons/download.svg';

interface TaskItemProps {
  tool: ParsingTool;
}

const TaskItem: FC<TaskItemProps> = ({ tool }) => {
  return (
    <div className={styles.toolItem}>
      <h5 className={styles.toolName}>
        <CheckIcon />
        {tool.name}
      </h5>
      <div className={styles.toolCharacteristics}>
        <span className={styles.toolDate}>
          <CalendarIcon />
          <span>{tool.date}</span>
        </span>
        <span className={styles.toolMailings}>
          <UsersIcon />
          <span>{tool.mailings}</span>
        </span>
        <span className={styles.toolDuration}>
          <TimeIcon />
          <span>{tool.duration}</span>
        </span>
      </div>

      <div className={styles.toolsOptions}>
        <button className={styles.button}>
          <DownloadIcon />
          <span className="visually-hidden">Загрузить результат</span>
        </button>
        <button className={styles.button}>
          <StarIcon />
          <span className="visually-hidden">Добавить в избранное</span>
        </button>
        <button className={styles.button}>
          <SettingIcon />
          <span className="visually-hidden">Настройки</span>
        </button>
        <button className={styles.button}>
          <RepeatIcon />
          <span className="visually-hidden">Повторить</span>
        </button>
        <button className={styles.button}>
          <TrashIcon />
          <span className="visually-hidden">Удалить</span>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
