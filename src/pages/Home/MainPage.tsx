import styles from './index.module.sass';
import Mailing from './MailingBlock/Mailing';
import History from './HistoryBlock/History';
import { useAppDispatch } from '../../hooks/redux';
import { logout } from '../../store/user-slice/apiActions';
import { historyCardMock } from '../../mocks/historyCard.mock';
const MainPage = () => {
  const disptach = useAppDispatch();

  return (
    <main>
      <button onClick={() => disptach(logout())}>Выйти</button>
      <aside className={styles.info}>
        <Mailing />
        <History operations={historyCardMock} />
      </aside>
    </main>
  );
};

export default MainPage;
