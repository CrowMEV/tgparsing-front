import styles from './index.module.sass';
import Mailing from './MailingBlock/Mailing';
import History from './HistoryBlock/History';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCurrentUser } from '../../store/user-process/selectors';
import { logout } from '../../store/user-slice/apiActions';

const MainPage = () => {
  const disptach = useAppDispatch();
  const userInfo = useAppSelector(getCurrentUser);

  return (
    <main>
      <button onClick={() => disptach(logout())}>Выйти</button>
      <aside className={styles.info}>
        <Mailing />
        <History operations={userInfo.operations} />
      </aside>
    </main>
  );
};

export default MainPage;
