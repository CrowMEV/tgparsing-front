import styles from './index.module.sass';
import Mailing from './MailingBlock/Mailing';
import History from './HistoryBlock/History';
import { useAppSelector } from '../../hooks/redux';
import { getCurrentUser } from '../../store/user-process/selectors';

const MainPage = () => {
  const userInfo = useAppSelector(getCurrentUser);

  return (
    <main>
      <aside className={styles.info}>
        <Mailing />
        <History operations={userInfo.operations} />
      </aside>
    </main>
  );
};

export default MainPage;
