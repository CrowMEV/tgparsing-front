import { useEffect, useState } from 'react';
import AdminBots from '../../../components/Admin/AdminBots/AdminBots';
import CreateBotModal from '../../../components/Admin/AdminBots/CreateBotModal/CreateBotModal';
import Button from '../../../components/ui/button/Button';
import styles from './bots-admin-page.module.sass';
import { api } from '../../../services/api';
import Loader from '../../../components/ui/loader/loader';

const BotsAdminPage = () => {
  const [isCreateFormActive, setIsCreateFormActive] = useState(false);
  const [bots, setBots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .get('/telegram/tgaccount/')
      .then((response) => setBots(response.data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <h2 className={styles.title}>Боты</h2>
        <Button
          className={styles.createButton}
          onClick={() => setIsCreateFormActive(true)}
          variant="accent"
        >
          Создать нового бота
        </Button>
        <button className={styles.csvLink}>Выгрузить в CSV</button>
      </div>
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <AdminBots bots={bots} />
        </div>
      )}
      <CreateBotModal
        isActive={isCreateFormActive}
        setIsActive={setIsCreateFormActive}
      />
    </div>
  );
};
export default BotsAdminPage;
