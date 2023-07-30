import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { User } from '../../../types/user';
import { api } from '../../../services/api';

import AdminUserCard from '../../../components/Admin/AdminUserCard/AdminUserCard';

const UserPage = () => {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | undefined>();

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
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Не удалось получить данные о пользователе</div>;
  return <AdminUserCard user={user} />;
};

export default UserPage;
