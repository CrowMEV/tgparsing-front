import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { User } from '../../../types/user';
import { api } from '../../../services/api';

import PassData from '../../../components/Profile/PassData/PassData';
import TimezonePicker from '../../../components/TimezonePicker/TimezonePicker';
import MainData from '../../../components/Profile/MainData/MainData';
import Toggle from '../../../components/ui/toggle/toggle';
import Dropdown from '../../../components/ui/dropdown/Dropdown';

import styles from './user-page.module.sass';

const UserPage = () => {
  const STAFF_MEMBERS = useMemo(
    () => ['Бухгалтер', 'Технический специалист', 'HR-специалист'],
    [],
  );
  const TARIFFS = useMemo(() => ['Стандарт'], []);

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

  return (
    <main className={styles.profileWrapper}>
      <div className={styles.wrapper}>
        <MainData variant="admin" user={user} />
        <div className={styles.columnWrapper}>
          <div>
            <h3 className={`${styles.header} ${styles.balanceHeader}`}>
              Текущий баланс
            </h3>
            <p className={styles.balance}>250,00 ₽</p>
          </div>
          <PassData />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.columnWrapper} />
        <div className={styles.columnWrapper}>
          <div>
            <h3 className={styles.header}>Тариф</h3>
            <Dropdown
              options={TARIFFS}
              selectedOption={TARIFFS[0]}
              onChange={(option) => console.log(option)}
            />
          </div>
          <div>
            <h3 className={styles.header}>Часовой пояс</h3>
            <TimezonePicker
              selectedTimezone={user.timezone}
              onChange={async (timezone) => {
                console.log(timezone);
                // const formData = new FormData();
                // formData.append('timezone', String(timezone));
                // await dispatch(patchUser(formData));
              }}
            />
          </div>
        </div>
        <div className={`${styles.columnWrapper} ${styles.toggleColumn}`}>
          <div>
            <Toggle
              className={styles.header}
              toggleHandler={(e) => console.log(e)}
              title="Сотрудник компании"
            />
            <Dropdown
              options={STAFF_MEMBERS}
              selectedOption={STAFF_MEMBERS[0]}
              onChange={(option) => {
                console.log(option);
              }}
            />
          </div>
          <div>
            <Toggle
              className={`${styles.header} ${styles.toggleLabel}`}
              toggleHandler={(e) => console.log(e)}
              title="Блокировка пользователя"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserPage;
