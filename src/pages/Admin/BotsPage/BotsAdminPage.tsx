import { useState } from 'react';
import AdminBots from '../../../components/Admin/AdminBots/AdminBots';
import CreateBotModal from '../../../components/Admin/AdminBots/CreateBotModal/CreateBotModal';
import Button from '../../../components/ui/button/Button';
import { bots } from '../../../mocks/bots';
import styles from './bots-admin-page.module.sass';

const BotsAdminPage = () => {
  const [isCreateFormActive, setIsCreateFormActive] = useState(false);
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Боты</h2>
      <div className={styles.tableWrapper}>
        <AdminBots bots={bots} />
      </div>
      <Button onClick={() => setIsCreateFormActive(true)} variant="accent">
        Создать нового бота
      </Button>
      <CreateBotModal
        isActive={isCreateFormActive}
        setIsActive={setIsCreateFormActive}
      />
    </div>
  );
};
export default BotsAdminPage;
