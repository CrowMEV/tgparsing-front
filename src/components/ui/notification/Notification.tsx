import styles from './index.module.sass';
import { FC } from 'react';

const Notification: FC<{ count: number }> = ({ count }) => {
  return (
    <div className={styles.notification}>
      <div className={styles.notification__circle}>{count}</div>
      <span className="material-icons-outlined">notifications</span>
    </div>
  );
};

export default Notification;
