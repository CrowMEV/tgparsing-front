import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { patchUser } from '../../store/user-slice/apiActions';

import MainData from '../../components/Profile/MainData/MainData';
import PassData from '../../components/Profile/PassData/PassData';
import TextInput from '../../components/ui/input/TextInput';

import styles from './profilePage.module.sass';
import TimezonePicker from '../../components/TimezonePicker/TimezonePicker';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.UserData.user);

  if (!user) return null;

  return (
    <main className={styles.profileWrapper}>
      <div className={styles.wrapper}>
        <MainData
          onSubmit={(formData) => dispatch(patchUser(formData)).unwrap()}
          user={user}
        />
        <div className={styles.columnWrapper}>
          <PassData />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.columnWrapper}>
          <h3 className={styles.header}>Часовой пояс</h3>
          <TimezonePicker
            selectedTimezone={user.timezone}
            onChange={(timezone) => {
              const formData = new FormData();
              formData.append('timezone', String(timezone));
              dispatch(patchUser(formData));
            }}
          />
        </div>
        <div className={styles.columnWrapper}>
          <h3 className={styles.header}>Тариф</h3>
          <TextInput
            className={styles.pricing}
            temporaryDisabled
            value={user.subscribe ? user.subscribe.id : 'Без тарифа'}
          />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
