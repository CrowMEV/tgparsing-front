import { useEffect, useState } from 'react';
import AdminUsers from '../../../components/Admin/AdminUsers/AdminUsers';
import styles from './users-page.module.sass';
import { User } from '../../../types/user';
import { api } from '../../../services/api';
import Loader from '../../../components/ui/loader/loader';

const UsersAdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .get('/user/')
      .then((response) => setUsers(response.data))
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <h2 className={styles.title}>Список пользователей</h2>
        <button className={styles.csvLink}>Выгрузить в CSV</button>
      </div>
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <AdminUsers users={users} />
      )}
    </div>
  );
};
export default UsersAdminPage;
