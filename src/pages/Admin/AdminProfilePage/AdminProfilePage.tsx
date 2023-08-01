import AdminUserCard from '../../../components/Admin/AdminUserCard/AdminUserCard';
import { useAppSelector } from '../../../hooks/redux';

const AdminProfilePage = () => {
  const user = useAppSelector((state) => state.UserData.user);

  if (!user) return <div>Не удалось получить данные о пользователе</div>;
  return <AdminUserCard user={user} />;
};

export default AdminProfilePage;
