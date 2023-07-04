import { FC } from 'react';
import styles from './index.module.sass';
import HistoryCard from './HistoryCard/HistoryCard';
import { Operation } from '../../../types/operation';

interface HistoryProps {
  operations: Operation[];
}

const History: FC<HistoryProps> = ({ operations }) => {
  return (
    <div className={styles.history}>
      <div className={styles.history__upper}>
        <label>История пополнений и списаний</label>
        <div className={styles.history__btn}>
          <span className="material-icons-outlined">more_vert</span>
          <button>Все операции</button>
        </div>
      </div>
      <div className={styles.history__blocks}>
        {operations.map((el, idx) => (
          <HistoryCard
            key={idx}
            date={el.date}
            reason={el.reason}
            write={el.write}
          />
        ))}
      </div>
    </div>
  );
};

export default History;
