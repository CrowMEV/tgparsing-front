import { useEffect, useState } from 'react';
import AdminUsers from '../../../components/Admin/AdminUsers/AdminUsers';
import styles from './users-page.module.sass';
import { User } from '../../../types/user';
import { fetchUsers } from '../../../services/fetch-users';

const UsersAdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then((userData) => setUsers(userData));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <h2 className={styles.title}>Список пользователей</h2>
        <button className={styles.csvLink}>Выгрузить в CSV</button>
      </div>
      <AdminUsers users={users} />
    </div>
  );
};
export default UsersAdminPage;
