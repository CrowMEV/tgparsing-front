import { useCallback, useEffect, useState } from 'react';

import { Role, User } from '../../../types/user';
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
  const [staffList, setStaffList] = useState<Role[]>([]);

  useEffect(() => {
    api
      .get('/role/')
      .then((r) => setStaffList(r.data))
      .catch((e) => console.error(e));
  }, []);

  const handleSubmit = useCallback((field: string, value: string | Blob) => {
    const formData = new FormData();
    formData.append(field, value);
    if (adminId === user.id) {
      dispatch(patchUser(formData));
    } else {
      api
        .patch(`/user/${user.id}`, formData)
        .then((r) => setUser(r.data))
        .catch((e) => alert(e));
    }
  }, []);

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
            <p className={styles.balance}>{user.balance} ₽</p>
          </div>
          <PassData disabled={adminId !== user.id} />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.columnWrapper} />
        <div className={styles.columnWrapper}>
          <div>
            <h3 className={styles.header}>Тариф</h3>
            <TextInput
              temporaryDisabled
              value={user.subscribe ? user.subscribe.tariff_id : 'Без тарифа'}
            />
          </div>
          <div>
            <h3 className={styles.header}>Часовой пояс</h3>
            <TimezonePicker
              selectedTimezone={user.timezone}
              onChange={(timezone) =>
                handleSubmit('timezone', String(timezone))
              }
            />
          </div>
        </div>
        <div className={`${styles.columnWrapper} ${styles.toggleColumn}`}>
          <div>
            <h3 className={styles.header}>Роль</h3>
            <Dropdown
              disabled={user.id === adminId}
              options={staffList.map((staff) => staff.pretty_name)}
              selectedOption={user.role.pretty_name}
              onChange={(option) => {
                if (user.id === adminId) return;
                const newRole = staffList.find(
                  (staff) => staff.pretty_name === option,
                )?.name;
                if (!newRole) return;
                handleSubmit('role', newRole);
              }}
            />
          </div>
          <div>
            <Toggle
              className={`${styles.header} ${styles.toggleLabel}`}
              checked={user.is_banned}
              disabled={user.id === adminId}
              toggleHandler={(e) => {
                if (user.id === adminId) return;
                handleSubmit('is_banned', String(e.target.checked));
              }}
              title="Блокировка пользователя"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminUserCard;
