import styles from './index.module.sass';
import { FC } from 'react';

interface HistoryCardProps {
  date: number | string;
  write: number | string;
  reason: string;
}

const HistoryCard: FC<HistoryCardProps> = ({ date, write, reason }) => {
  return (
    <div className={styles.history_card}>
      <div className={styles.history_card__date}>
        <label>Дата</label>
        <span>{date}</span>
      </div>
      <div className={styles.history_card__write}>
        <label>Списание</label>
        <span>{write}</span>
      </div>
      <div className={styles.history_card__reason}>
        <label>Причина списания</label>
        <span>{reason}</span>
      </div>
    </div>
  );
};

export default HistoryCard;
