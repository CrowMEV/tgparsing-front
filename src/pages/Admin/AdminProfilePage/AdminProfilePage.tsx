import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { User } from '../../../types/user';
import { api } from '../../../services/api';

import AdminUserCard from '../../../components/Admin/AdminUserCard/AdminUserCard';
import { useAppSelector } from '../../../hooks/redux';

const AdminProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | undefined>();
  const userId = useAppSelector((state) => state.UserData.user?.id);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/user/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Не удалось получить данные о пользователе</div>;
  return <AdminUserCard user={user} />;
};

export default AdminProfilePage;
