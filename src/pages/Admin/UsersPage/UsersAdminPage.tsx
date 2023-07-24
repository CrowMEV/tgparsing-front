import { useEffect } from 'react';
import AdminUsers from '../../../components/AdminUsers/AdminUsers';
import { useAppDispatch } from '../../../hooks/redux';
import { getAllUsers } from '../../../store/user-slice/apiActions';
import styles from './users-page.module.sass';

const UsersAdminPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <h2 className={styles.title}>Список пользователей</h2>
        <button className={styles.csvLink}>Выгрузить в CSV</button>
      </div>
      <AdminUsers />
    </div>
  );
};
export default UsersAdminPage;
