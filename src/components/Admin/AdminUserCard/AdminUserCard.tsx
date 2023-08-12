import { useMemo } from 'react';

import { User } from '../../../types/user';
import { api } from '../../../services/api';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { patchUser } from '../../../store/user-slice/apiActions';

import PassData from '../../../components/Profile/PassData/PassData';
import TimezonePicker from '../../../components/TimezonePicker/TimezonePicker';
import MainData from '../../../components/Profile/MainData/MainData';
import Toggle from '../../../components/ui/toggle/toggle';
import Dropdown from '../../../components/ui/dropdown/Dropdown';

import styles from './admin-user-card.module.sass';
import TextInput from '../../ui/input/TextInput';

interface AdminUserCardProps {
  user: User;
  setUser: (user: User) => void;
}

const AdminUserCard = ({ user, setUser }: AdminUserCardProps) => {
  const dispatch = useAppDispatch();
  const adminId = useAppSelector((state) => state.UserData.user?.id);

  const STAFF_MEMBERS = useMemo(
    () => ['Бухгалтер', 'Технический специалист', 'HR-специалист'],
    [],
  );

  return (
    <main className={styles.profileWrapper}>
      <div className={styles.wrapper}>
        <MainData
          onSubmit={(formData) => {
            if (adminId === user.id) {
              return dispatch(patchUser(formData)).unwrap();
            } else {
              return api
                .patch(`/user/${user.id}`, formData)
                .then((response) => {
                  setUser(response.data);
                  return response.data;
                });
            }
          }}
          variant="admin"
          user={user}
        />
        <div className={styles.columnWrapper}>
          <div>
            <h3 className={`${styles.header} ${styles.balanceHeader}`}>
              Текущий баланс
            </h3>
            <p className={styles.balance}>250,00 ₽</p>
          </div>
          <PassData disabled={adminId !== user.id} />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.columnWrapper} />
        <div className={styles.columnWrapper}>
          <div>
            <h3 className={styles.header}>Тариф</h3>
            <TextInput temporaryDisabled placeholder="Тариф" />
          </div>
          <div>
            <h3 className={styles.header}>Часовой пояс</h3>
            <TimezonePicker
              selectedTimezone={user.timezone}
              onChange={async (timezone) => {
                const formData = new FormData();
                formData.append('timezone', String(timezone));
                if (adminId === user.id) {
                  dispatch(patchUser(formData));
                } else {
                  api
                    .patch(`/user/${user.id}`, formData)
                    .then((r) =>
                      setUser({ ...user, timezone: r.data.timezone }),
                    )
                    .catch((e) => console.error(e));
                }
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

export default AdminUserCard;
