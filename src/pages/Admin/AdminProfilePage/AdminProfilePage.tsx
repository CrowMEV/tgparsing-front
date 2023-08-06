import AdminUserCard from '../../../components/Admin/AdminUserCard/AdminUserCard';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { editUser } from '../../../store/user-slice/userSlice';

const AdminProfilePage = () => {
  const user = useAppSelector((state) => state.UserData.user);

  const dispatch = useAppDispatch();

  if (!user) return <div>Не удалось получить данные о пользователе</div>;
  return (
    <AdminUserCard
      user={user}
      setUser={(newUser) => dispatch(editUser(newUser))}
    />
  );
};

export default AdminProfilePage;
