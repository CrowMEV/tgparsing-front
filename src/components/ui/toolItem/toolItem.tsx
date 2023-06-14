import { FC } from 'react';
import styles from './toolItem.module.sass';
import { ParsingTool } from '../../../types/parsing-tool';

interface ToolItemProps {
  tool: ParsingTool;
}

const ToolItem: FC<ToolItemProps> = ({ tool }) => {
  return (
    <div className={styles.toolItem}>
      <div className={styles.toolCharacteristics}>
        <h5 className={styles.toolName}>{tool.name}</h5>
        <span className={styles.toolDate}>
          <span className="material-icons">calendar_month</span>
          <span>{tool.date}</span>
        </span>
        <span className={styles.toolMailings}>
          <span className="material-icons-outlined">file_copy</span>
          <span>{tool.mailings}</span>
        </span>
        <span className={styles.toolDuration}>
          <span className="material-icons">loop</span>
          <span>{tool.duration}</span>
        </span>
      </div>

      <div className={styles.toolsOptions}>
        <button className={styles.button}>
          <span className="material-icons">star_border</span>
          <span className="visually-hidden">Добавить в избранное</span>
        </button>
        <button className={styles.button}>
          <span className="material-icons">settings</span>
          <span className="visually-hidden">Настройки</span>
        </button>
        <button className={styles.button}>
          <span className="material-icons">loop</span>
          <span className="visually-hidden">Повторить</span>
        </button>
        <button className={styles.button}>
          <span className="material-icons">delete_outline</span>
          <span className="visually-hidden">Удалить</span>
        </button>
      </div>
    </div>
  );
};

export default ToolItem;
