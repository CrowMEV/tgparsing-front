import AdminBots from '../../../components/Admin/AdminBots/AdminBots';
import Button from '../../../components/ui/button/Button';
import { bots } from '../../../mocks/bots';
import styles from './bots-admin-page.module.sass';

const BotsAdminPage = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Боты</h2>
      <div className={styles.tableWrapper}>
        <AdminBots bots={bots} />
      </div>
      <Button variant="accent">Создать нового бота</Button>
    </div>
  );
};
export default BotsAdminPage;
