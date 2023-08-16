import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminBotCard from '../../../components/Admin/AdminBotCard/AdminBotCard';
import { api } from '../../../services/api';
import { User } from '../../../types/user';

const BotPage = () => {
  const { botId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [bot, setBot] = useState<User | undefined>();

  useEffect(() => {
    // setIsLoading(true);
    // api
    //   .get(`/bot/${botId}`)
    //   .then((response) => {
    //     setBot(response.data);
    //   })
    //   .catch((e) => console.error(e))
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  }, []);

  // if (isLoading) return <div>Loading...</div>;
  // if (!bot) return <div>Не удалось получить данные о пользователе</div>;
  // return <AdminBotCard bot={bots[0]} />;
};

export default BotPage;
